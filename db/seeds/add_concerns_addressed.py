# Add (or recompute) concerns_addressed on every product in koyash.products.
# Source field: functional_category (keyword match, spec section H).
# Idempotent: always overwrites, never appends — safe to re-run.

import json
import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient

DB_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=DB_DIR / ".env")

sys.stdout.reconfigure(encoding="utf-8")

# -----------------------------------------------------------------------
# Keyword buckets — spec H, frozen.
# Order within each bucket does not matter (all are OR-matched).
# -----------------------------------------------------------------------
CONCERN_KEYWORDS: dict[str, list[str]] = {
    "acne":         ["анти-акне", "акне", "антибактериальн", "угрев"],
    "oiliness":     ["себорегуляц", "себоконтроль", "себум", "матировани", "жирн", "очищение пор"],
    "pigmentation": ["осветлени", "пигмент"],
    "aging":        ["анти-эйдж", "антивозраст", "анти-возраст", "морщин", "упругост",
                     "коллаген", "пептид", "anti-age"],
    "dryness":      ["глубокая гидратац", "гиперувлажн", "интенсивн"],
    "sensitivity":  ["sensitive", "чувствительн", "гиперчувствительн", "заживлени",
                     "восстановление барьер", "раздраж", "дерматит"],
}

# Approved counts from spec H — script exits non-zero if they differ.
EXPECTED_TAG_COUNTS = {
    "acne": 5,
    "oiliness": 13,
    "pigmentation": 15,
    "aging": 6,
    "dryness": 3,
    "sensitivity": 16,
}
EXPECTED_EMPTY = 22


def derive_concerns(functional_category: str | None) -> list[str]:
    text = (functional_category or "").lower()
    return [
        tag
        for tag, keywords in CONCERN_KEYWORDS.items()
        if any(kw in text for kw in keywords)
    ]


# -----------------------------------------------------------------------
# Connect
# -----------------------------------------------------------------------
uri = os.getenv("MONGODB_URI")
db_name = os.getenv("DB_NAME")
client = MongoClient(uri, serverSelectionTimeoutMS=5000)
db = client[db_name]
col = db["products"]

# -----------------------------------------------------------------------
# Fetch all products (only the fields we need for derivation)
# -----------------------------------------------------------------------
all_docs = list(col.find({}, {"_id": 1, "name": 1, "functional_category": 1}))
if len(all_docs) != 69:
    print(f"FAIL: expected 69 products, found {len(all_docs)}. Aborting.")
    client.close()
    sys.exit(1)

# -----------------------------------------------------------------------
# Derive, update, collect stats
# -----------------------------------------------------------------------
tag_counts: dict[str, int] = {tag: 0 for tag in CONCERN_KEYWORDS}
empty_products: list[tuple[str, str, str | None]] = []

for doc in all_docs:
    pid = doc["_id"]
    fc = doc.get("functional_category")
    tags = derive_concerns(fc)

    # $set is idempotent: recomputes the field whether or not it existed.
    col.update_one({"_id": pid}, {"$set": {"concerns_addressed": tags}})

    for tag in tags:
        tag_counts[tag] += 1

    if not tags:
        name = doc.get("name", "")
        empty_products.append((pid, name, fc))

print(f"Updated {len(all_docs)} products with concerns_addressed.\n")

# -----------------------------------------------------------------------
# Validation — print first, then decide pass/fail
# -----------------------------------------------------------------------
validation_ok = True

print("=== Per-tag counts ===")
for tag, count in tag_counts.items():
    expected = EXPECTED_TAG_COUNTS[tag]
    if count == expected:
        status = "OK"
    else:
        status = f"FAIL  expected {expected}"
        validation_ok = False
    print(f"  {tag:<15} {count:>3}  {status}")

print()

empty_count = len(empty_products)
empty_status = "OK" if empty_count == EXPECTED_EMPTY else f"FAIL  expected {EXPECTED_EMPTY}"
if empty_count != EXPECTED_EMPTY:
    validation_ok = False

print(f"=== Products with empty concerns_addressed: {empty_count}  {empty_status} ===")
for pid, name, fc in sorted(empty_products):
    print(f"  {pid}  {name!r}")
    print(f"    functional_category: {fc!r}")

print()

if not validation_ok:
    print("VALIDATION FAILED — counts do not match the approved spec. No schema change applied.")
    client.close()
    sys.exit(1)

print("All counts match the spec.\n")

# -----------------------------------------------------------------------
# Re-apply the updated $jsonSchema validator (collMod).
# The schema file must already include concerns_addressed before this runs.
# -----------------------------------------------------------------------
schema_path = DB_DIR / "schemas" / "products.json"
validator = json.loads(schema_path.read_text(encoding="utf-8"))

db.command(
    "collMod",
    "products",
    validator=validator,
    validationLevel="strict",
    validationAction="error",
)
print(f"Validator re-applied from {schema_path.name} — concerns_addressed is now schema-enforced.")

client.close()
