# Read-only sanity checks for the koyash database.

import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient

DB_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=DB_DIR / ".env")
sys.stdout.reconfigure(encoding="utf-8")

uri = os.getenv("MONGODB_URI")
db_name = os.getenv("DB_NAME")
client = MongoClient(uri, serverSelectionTimeoutMS=5000)
db = client[db_name]
products = db["products"]
consultations = db["consultations"]

checks_failed = 0


def check(label, condition, detail=""):
    """Print PASS or FAIL for one check and remember if anything failed."""
    global checks_failed
    if condition:
        print(f"[PASS] {label}")
    else:
        checks_failed += 1
        suffix = f"  -> {detail}" if detail else ""
        print(f"[FAIL] {label}{suffix}")


# ---------------------------------------------------------------------------
# 1. Document counts
# ---------------------------------------------------------------------------
print("=== 1. Document counts ===")
products_count = products.count_documents({})
consultations_count = consultations.count_documents({})
check(f"products has 69 documents (found {products_count})", products_count == 69)
check(f"consultations has 55 documents (found {consultations_count})", consultations_count == 55)

# ---------------------------------------------------------------------------
# 2. Every product has a non-null routine_step
# ---------------------------------------------------------------------------
print()
print("=== 2. Every product has a non-null routine_step ===")
missing_step = products.count_documents({"routine_step": None})
check(
    f"no product has a null routine_step (found {missing_step})",
    missing_step == 0,
    "derive_routine_step() in import_products.py should never return None",
)

# ---------------------------------------------------------------------------
# 3. The core routine spine is fillable: cleanse / moisturize / spf each
#    need at least one real product, or the recommendation engine would have
#    nothing to suggest for that step.
# ---------------------------------------------------------------------------
print()
print("=== 3. Each core routine step has at least one product ===")
for step in ("cleanse", "moisturize", "spf"):
    count = products.count_documents({"routine_step": step})
    check(f"at least one '{step}' product (found {count})", count >= 1)

# ---------------------------------------------------------------------------
# 4. Counts per segment / routine_step / tier — eyeball that the spread of
#    values looks sensible (no surprise category swallowing everything else).
# ---------------------------------------------------------------------------
print()
print("=== 4. Counts per segment / routine_step / tier ===")
for field in ("segment", "routine_step", "tier"):
    print(f"-- {field} --")
    for value in sorted(products.distinct(field)):
        count = products.count_documents({field: value})
        print(f"   {value!r:>15}: {count}")

# ---------------------------------------------------------------------------
# 5. vegan / cruelty_free breakdowns — same idea, for the ethics filters.
# ---------------------------------------------------------------------------
print()
print("=== 5. vegan / cruelty_free breakdowns ===")
for field in ("vegan", "cruelty_free"):
    print(f"-- {field} --")
    for value in sorted(products.distinct(field), key=str):
        count = products.count_documents({field: value})
        print(f"   {value!r:>15}: {count}")

# ---------------------------------------------------------------------------
# 6. allergens_norm exclusion spot-check.
#
# 'Fragrance' is one of the most common entries in allergens_norm (17 of the
# 69 products list it), which makes it a good real-world stand-in for "a user
# says they're allergic to fragrance — show me everything else." We check
# that the "contains it" group and the "$nin excludes it" group are a clean
# split of the whole collection (no product silently lost or double-counted),
# which is exactly the property the recommendation engine will rely on.
# ---------------------------------------------------------------------------
print()
print("=== 6. allergens_norm exclusion spot-check ===")
sample_allergen = "Fragrance"
contains = products.count_documents({"allergens_norm": sample_allergen})
excludes = products.count_documents({"allergens_norm": {"$nin": [sample_allergen]}})
check(
    f"'{sample_allergen}': {contains} contain it + {excludes} excluded by $nin = {products_count} total",
    contains + excludes == products_count,
)
example = products.find_one(
    {"allergens_norm": {"$nin": [sample_allergen]}},
    {"name": 1, "allergens_norm": 1},
)
if example:
    print(f"   example from the excluded-safe set: {example['name']!r}")
    print(f"     allergens_norm: {example['allergens_norm']}")

# ---------------------------------------------------------------------------
print()
if checks_failed == 0:
    print("All sanity checks passed.")
else:
    print(f"{checks_failed} check(s) FAILED — see the [FAIL] lines above.")

client.close()
