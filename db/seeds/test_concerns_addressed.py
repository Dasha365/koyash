# Read-only tests for the concerns_addressed field (spec H).
# Tests: field completeness, enum validity, per-tag counts, filter
# query behaviour ($in / $all / combined), and a full re-derivation
# consistency check against functional_category.

import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient

DB_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=DB_DIR / ".env")
sys.stdout.reconfigure(encoding="utf-8")

# -----------------------------------------------------------------------
# Keyword buckets — kept in sync with add_concerns_addressed.py but
# defined independently so this test is a genuine second witness.
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
ALLOWED_TAGS = set(CONCERN_KEYWORDS)

EXPECTED_TAG_COUNTS = {"acne": 5, "oiliness": 13, "pigmentation": 15,
                       "aging": 6, "dryness": 3, "sensitivity": 16}
EXPECTED_EMPTY = 22
TOTAL = 69

# -----------------------------------------------------------------------
# Connect
# -----------------------------------------------------------------------
uri = os.getenv("MONGODB_URI")
db_name = os.getenv("DB_NAME")
client = MongoClient(uri, serverSelectionTimeoutMS=5000)
col = client[db_name]["products"]

# -----------------------------------------------------------------------
# Test harness
# -----------------------------------------------------------------------
failures = 0
passes = 0


def check(label: str, condition: bool, detail: str = "") -> None:
    global failures, passes
    if condition:
        passes += 1
        print(f"  [PASS] {label}")
    else:
        failures += 1
        suffix = f"\n         -> {detail}" if detail else ""
        print(f"  [FAIL] {label}{suffix}")


def section(title: str) -> None:
    print(f"\n=== {title} ===")


# -----------------------------------------------------------------------
# 1. Field presence: every product has concerns_addressed as an array
# -----------------------------------------------------------------------
section("1. Field presence")

no_field = col.count_documents({"concerns_addressed": {"$exists": False}})
check(
    f"all {TOTAL} products have concerns_addressed (missing: {no_field})",
    no_field == 0,
)

not_array = col.count_documents(
    {"concerns_addressed": {"$not": {"$type": "array"}}}
)
check(
    f"concerns_addressed is always an array (non-array docs: {not_array})",
    not_array == 0,
)

# -----------------------------------------------------------------------
# 2. Enum validity: no tag outside the 6 allowed values
# -----------------------------------------------------------------------
section("2. Enum validity")

# $elemMatch with $nin catches any rogue tag inside the array.
rogue = list(col.find(
    {"concerns_addressed": {"$elemMatch": {"$nin": list(ALLOWED_TAGS)}}},
    {"_id": 1, "concerns_addressed": 1},
))
check(
    f"no product has a tag outside {sorted(ALLOWED_TAGS)} (found {len(rogue)})",
    len(rogue) == 0,
    str([(d["_id"], d["concerns_addressed"]) for d in rogue]),
)

# -----------------------------------------------------------------------
# 3. Per-tag counts (approved spec values)
# -----------------------------------------------------------------------
section("3. Per-tag counts (spec H)")

for tag, expected in EXPECTED_TAG_COUNTS.items():
    count = col.count_documents({"concerns_addressed": tag})
    check(
        f"{tag:<15} count={count}  expected={expected}",
        count == expected,
    )

empty_count = col.count_documents({"concerns_addressed": {"$size": 0}})
check(
    f"empty array    count={empty_count}  expected={EXPECTED_EMPTY}",
    empty_count == EXPECTED_EMPTY,
)

# -----------------------------------------------------------------------
# 4. Tag union / overlap sanity
# -----------------------------------------------------------------------
section("4. Tag union / overlap sanity")

tagged = col.count_documents({"concerns_addressed": {"$not": {"$size": 0}}})
tag_sum = sum(
    col.count_documents({"concerns_addressed": tag})
    for tag in ALLOWED_TAGS
)
check(
    f"tagged ({tagged}) + empty ({empty_count}) = {TOTAL}",
    tagged + empty_count == TOTAL,
)
check(
    f"sum of per-tag counts ({tag_sum}) >= tagged products ({tagged})  (overlap allowed)",
    tag_sum >= tagged,
)
check(
    f"at least one product carries multiple tags (overlap = {tag_sum - tagged})",
    tag_sum > tagged,
)

# -----------------------------------------------------------------------
# 5. $in filter — "any of these concerns"
# -----------------------------------------------------------------------
section("5. $in filter — 'any of these concerns'")

# Single-element $in must equal direct equality count.
for tag in sorted(ALLOWED_TAGS):
    direct = col.count_documents({"concerns_addressed": tag})
    via_in = col.count_documents({"concerns_addressed": {"$in": [tag]}})
    check(
        f"$in:['{tag}'] == direct match ({direct})",
        direct == via_in,
    )

# Two-tag $in must return between max(individual) and sum(individual).
acne_c   = col.count_documents({"concerns_addressed": "acne"})
oily_c   = col.count_documents({"concerns_addressed": "oiliness"})
combo_in = col.count_documents({"concerns_addressed": {"$in": ["acne", "oiliness"]}})
check(
    f"$in:['acne','oiliness']={combo_in}  in [{max(acne_c, oily_c)}, {acne_c + oily_c}]",
    max(acne_c, oily_c) <= combo_in <= acne_c + oily_c,
)

# -----------------------------------------------------------------------
# 6. $all filter — "all of these concerns"
# -----------------------------------------------------------------------
section("6. $all filter — 'all of these concerns'")

# Single-element $all must equal direct equality count.
for tag in sorted(ALLOWED_TAGS):
    direct  = col.count_documents({"concerns_addressed": tag})
    via_all = col.count_documents({"concerns_addressed": {"$all": [tag]}})
    check(
        f"$all:['{tag}'] == direct match ({direct})",
        direct == via_all,
    )

# Two-tag $all must be <= each individual count.
pig_c  = col.count_documents({"concerns_addressed": "pigmentation"})
sens_c = col.count_documents({"concerns_addressed": "sensitivity"})
both   = col.count_documents({"concerns_addressed": {"$all": ["pigmentation", "sensitivity"]}})
check(
    f"$all:['pigmentation','sensitivity']={both} <= min({pig_c},{sens_c})={min(pig_c, sens_c)}",
    both <= min(pig_c, sens_c),
)

# -----------------------------------------------------------------------
# 7. Combined filters (concern + segment + routine_step)
# -----------------------------------------------------------------------
section("7. Combined filters")

# Spec H: "acne/aging/dryness all have low+mid products (no luxury-lock)"
for concern in ("acne", "aging", "dryness"):
    for seg in ("low", "mid"):
        count = col.count_documents({"concerns_addressed": concern, "segment": seg})
        check(
            f"concern={concern!r} + segment={seg!r}  found {count} (need ≥1 for demo reachability)",
            count >= 1,
        )

# A sensitivity serum must exist (engine fills the serum slot for sensitive skin).
sen_serum = col.count_documents({"concerns_addressed": "sensitivity", "routine_step": "serum"})
check(
    f"sensitivity serum exists (found {sen_serum})",
    sen_serum >= 1,
)

# Products with empty concerns_addressed must not be silently lost when filtering
# by routine_step alone (no concern filter applied).
for step in ("cleanse", "spf"):
    count_step = col.count_documents({"routine_step": step})
    check(
        f"routine_step={step!r} has ≥1 product with or without a concern (found {count_step})",
        count_step >= 1,
    )

# $in concern filter must not accidentally exclude empty-concern products when the
# query does NOT include a concern clause (guard: no $in + step = same as step alone).
for step in ("cleanse", "spf"):
    step_only  = col.count_documents({"routine_step": step})
    step_and_x = col.count_documents({"routine_step": step, "concerns_addressed": "acne"})
    check(
        f"routine_step={step!r}: step-only ({step_only}) >= step+concern ({step_and_x})",
        step_only >= step_and_x,
    )

# -----------------------------------------------------------------------
# 8. Re-derivation consistency check
#    Re-derive concerns_addressed from functional_category for every product
#    and compare to what is stored.  Any divergence means the derivation
#    script or this test has a bug.
# -----------------------------------------------------------------------
section("8. Re-derivation consistency (functional_category -> stored tags)")


def rederive(functional_category: str | None) -> set[str]:
    text = (functional_category or "").lower()
    return {
        tag
        for tag, keywords in CONCERN_KEYWORDS.items()
        if any(kw in text for kw in keywords)
    }


all_docs = list(col.find(
    {},
    {"_id": 1, "name": 1, "functional_category": 1, "concerns_addressed": 1},
))
mismatches = []
for doc in all_docs:
    expected = rederive(doc.get("functional_category"))
    stored   = set(doc.get("concerns_addressed", []))
    if expected != stored:
        mismatches.append({
            "id":       doc["_id"],
            "name":     doc.get("name"),
            "fc":       doc.get("functional_category"),
            "expected": sorted(expected),
            "stored":   sorted(stored),
        })

check(
    f"all {len(all_docs)} products match re-derived concerns (mismatches: {len(mismatches)})",
    len(mismatches) == 0,
)
for m in mismatches:
    print(f"    {m['id']}  {m['name']!r}")
    print(f"      functional_category: {m['fc']!r}")
    print(f"      expected: {m['expected']}")
    print(f"      stored:   {m['stored']}")

# -----------------------------------------------------------------------
# Summary
# -----------------------------------------------------------------------
print()
total = passes + failures
if failures == 0:
    print(f"All {total} tests passed.")
else:
    print(f"{failures}/{total} test(s) FAILED — see [FAIL] lines above.")

client.close()
sys.exit(0 if failures == 0 else 1)
