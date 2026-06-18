# Derive and patch main_actives_short on all products in koyash.products.
# Source field: main_actives (string | null).
# Algorithm (spec §12): split by comma -> take part before first '(' -> strip -> drop empty.
# Stores ALL names; backend picks first 2-3 when building justification (spec §9).
# Idempotent: $set always overwrites, never appends. Safe to re-run.

import json
import os
import re
import sys
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient

DB_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=DB_DIR / ".env")

sys.stdout.reconfigure(encoding="utf-8")

# Matches digits, %, ~, ± that shouldn't survive a clean ingredient name
_SUSPICIOUS = re.compile(r"[%~±\d]")


def _split_outside_parens(text: str) -> list[str]:
    """Split on commas that are not inside parentheses.

    Naive split("," ) breaks on data like:
        "Ceramides (NP + AP + EOP, комплекс, ~1.5-2%), Cholesterol..."
    which has commas inside the parenthetical description. This function
    ignores those inner commas and only splits at depth-0 commas.
    """
    result, depth, current = [], 0, []
    for ch in text:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth = max(0, depth - 1)
        elif ch == "," and depth == 0:
            result.append("".join(current))
            current = []
            continue
        current.append(ch)
    if current:
        result.append("".join(current))
    return result


def derive_main_actives_short(main_actives: str | None) -> list[str]:
    if not main_actives:
        return []
    result = []
    for piece in _split_outside_parens(main_actives):
        # Take everything before the first '(' (strips concentration/description)
        name = piece.split("(")[0].strip()
        if name:
            result.append(name)
    return result


# ---------------------------------------------------------------------------
# Connect
# ---------------------------------------------------------------------------
uri = os.getenv("MONGODB_URI")
db_name = os.getenv("DB_NAME")
client = MongoClient(uri, serverSelectionTimeoutMS=5000)
db = client[db_name]
col = db["products"]

# ---------------------------------------------------------------------------
# Fetch, derive, patch
# ---------------------------------------------------------------------------
all_docs = list(col.find({}, {"_id": 1, "name": 1, "main_actives": 1}))
if len(all_docs) != 69:
    print(f"FAIL: expected 69 products, found {len(all_docs)}. Aborting.")
    client.close()
    sys.exit(1)

non_empty = []
empty = []

for doc in all_docs:
    short = derive_main_actives_short(doc.get("main_actives"))
    col.update_one({"_id": doc["_id"]}, {"$set": {"main_actives_short": short}})
    if short:
        non_empty.append((doc["_id"], doc.get("name", ""), doc.get("main_actives", ""), short))
    else:
        empty.append((doc["_id"], doc.get("name", ""), doc.get("main_actives")))

# ---------------------------------------------------------------------------
# Stats
# ---------------------------------------------------------------------------
print(f"Patched {len(all_docs)} products.")
print(f"  Non-empty main_actives_short: {len(non_empty)}")
print(f"  Empty     main_actives_short: {len(empty)}")
if empty:
    print()
    print("=== Products with empty main_actives_short ===")
    for pid, name, raw in empty:
        print(f"  {pid}  {name!r}  (main_actives={raw!r})")

# ---------------------------------------------------------------------------
# 5 examples (first 5 non-empty, spread across the list)
# ---------------------------------------------------------------------------
print()
print("=== 5 parse examples (main_actives → main_actives_short) ===")
step = max(1, len(non_empty) // 5)
samples = [non_empty[i] for i in range(0, min(len(non_empty), 5 * step), step)][:5]
for pid, name, raw, short in samples:
    print(f"  [{pid}] {name}")
    print(f"    IN:  {raw}")
    print(f"    OUT: {short}")
    print()

# ---------------------------------------------------------------------------
# Suspicious names: digits / % / ~ survived the parse
# (signals the '(' was not the outermost bracket, or no bracket at all)
# ---------------------------------------------------------------------------
print("=== Names with digits / % / ~ (may need manual review) ===")
flagged: list[tuple[str, str, list[str], list[str]]] = []
for pid, name, raw, short in non_empty:
    bad = [n for n in short if _SUSPICIOUS.search(n)]
    if bad:
        flagged.append((pid, name, bad, short))

if flagged:
    for pid, name, bad, short in flagged:
        print(f"  [{pid}] {name}")
        print(f"    Flagged names: {bad}")
        print(f"    Full short:    {short}")
        print()
else:
    print("  None — all names look clean.")

# ---------------------------------------------------------------------------
# Re-apply schema validator (adds main_actives_short to collMod)
# ---------------------------------------------------------------------------
print()
schema_path = DB_DIR / "schemas" / "products.json"
validator = json.loads(schema_path.read_text(encoding="utf-8"))
db.command(
    "collMod",
    "products",
    validator=validator,
    validationLevel="strict",
    validationAction="error",
)
print(f"Validator re-applied from {schema_path.name} — main_actives_short is now schema-recognised.")

client.close()
