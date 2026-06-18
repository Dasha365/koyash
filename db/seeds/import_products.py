# Import the "Products" sheet into MongoDB as the `products` collection.

import os
import re
import sys
from pathlib import Path

import openpyxl
from dotenv import load_dotenv
from pymongo import MongoClient

DB_DIR = Path(__file__).resolve().parent.parent  # .../db
load_dotenv(dotenv_path=DB_DIR / ".env")

# Make Cyrillic print correctly even if the terminal is in a Windows codepage.
sys.stdout.reconfigure(encoding="utf-8")

SEGMENT_MAP = {"бюджет": "low", "мидл": "mid", "люкс": "high"}
VEGAN_MAP = {"Да": True, "Нет": False}
CRUELTY_FREE_MAP = {"Да": "yes", "Нет": "no", "Неизвестно": "unknown"}


def to_number(value):
    """'force numeric' (plan B rows 4/16/17): turn a cell into a float, or
    None when that's impossible — e.g. Excel error text like '#VALUE!' or
    the note 'N/A (одна маска)' found in volume_ml for the single-use mask."""
    if isinstance(value, (int, float)):
        return float(value)
    if isinstance(value, str):
        try:
            return float(value.strip())
        except ValueError:
            return None
    return None


def derive_routine_step(category_raw):
    text = (category_raw or "").lower()

    # DEVIATION approved by Daria (2026-06-08): rule 2's literal "маска"
    # substring check would also fire on "(не маска)" = "(NOT a mask)" —
    # e.g. product_042 'Успокаивающий гель (не маска)'. We skip the mask
    # match when the text explicitly negates it, so that product instead
    # falls through to the remaining rules (and lands in needs_review for
    # a human to classify) rather than being silently tagged the opposite
    # of what its own name says.
    negates_mask = "не маска" in text

    if "spf" in text:                                            # rule 1
        return "spf", "core", 5
    if "маска" in text and not negates_mask:                     # rule 2
        return "mask", "occasional", None
    if "пилинг" in text or "эксфолиант" in text:                 # rule 3
        return "exfoliant", "occasional", None
    if "крем" in text or "гель-крем" in text or "эмульс" in text:  # rule 4
        return "moisturize", "core", 4

    mentions_format = any(w in text for w in ("тоник", "тонер", "сыворотк", "эссенц"))
    mentions_acid = any(w in text for w in ("aha", "bha", "pha", "кислот"))
    if mentions_format and mentions_acid:                        # rule 5
        return "exfoliant", "occasional", None

    if "очищ" in text or "пенка" in text or "мицелляр" in text:  # rule 6
        return "cleanse", "core", 1
    if "сыворотк" in text or "эссенц" in text:                   # rule 7
        return "serum", "core", 3
    if "тонер" in text or "тоник" in text:                       # rule 8
        return "tone", "core", 2

    return "needs_review", "occasional", None                    # rule 9


#   - product_008 'Увлажняющий гель для умывания': category_raw alone
#     ('Увлажняющий гель') is too generic to match any rule, but the
#     product's own name says "для умывания" (= "for washing") — it's a
#     cleanser.
#   - product_042 'Mugwort Calming Soothing гель' (category_raw
#     'Успокаивающий гель (не маска)'): classified as a moisturizer.
MANUAL_ROUTINE_STEP_OVERRIDES = {
    "product_008": ("cleanse", "core", 1),
    "product_042": ("moisturize", "core", 4),
}


# ---------------------------------------------------------------------------
# allergens_norm — plan B row 51: "tokenize allergens_raw, strip parentheticals"
# Provisional list for exclusion (plan A.4) — not authoritative, used with care.
# ---------------------------------------------------------------------------
PARENTHETICAL = re.compile(r"\([^)]*\)")
_CYRILLIC = re.compile(r"[Ѐ-ӿ]")

# "Parfum" is the INCI name for fragrance blend — identical allergen risk as
# "Fragrance". Map to one canonical token so a single filter catches both.
_ALLERGEN_ALIASES: dict[str, str] = {
    "parfum": "Fragrance",
}


def _clean_token(token: str) -> str:
    """Return a cleaned ingredient token, or '' if the token is a note, not an ingredient.

    Handles two noise patterns found in allergens_raw:
    - Pure-Cyrillic tokens: prose notes like "нет парабенов" — discarded entirely.
    - Latin name + Cyrillic tail: "Fragrance не обнаружено" — Cyrillic part stripped.
    """
    if not token:
        return ""
    if not token[0].isascii():
        return ""
    m = _CYRILLIC.search(token)
    if m:
        token = token[: m.start()].strip()
    return token


def derive_allergens_norm(allergens_raw: str) -> list[str]:
    if not allergens_raw:
        return []
    # Strip parenthetical notes: "(fragrance blend)" etc.
    without_notes = PARENTHETICAL.sub("", allergens_raw)
    # Split on comma, then split each piece on " + " to atomize compound entries
    # like "Benzoic Acid + Dehydroacetic Acid". Note: "AHA+BHA" (no spaces) is
    # intentionally kept as one token — it's a category label, not two compounds.
    atoms: list[str] = []
    for piece in without_notes.split(","):
        atoms.extend(part.strip() for part in piece.split(" + "))
    # Clean, apply aliases, deduplicate (preserve first-seen order).
    seen: set[str] = set()
    result: list[str] = []
    for atom in atoms:
        cleaned = _clean_token(atom)
        if not cleaned:
            continue
        canonical = _ALLERGEN_ALIASES.get(cleaned.lower(), cleaned)
        key = canonical.lower()
        if key not in seen:
            seen.add(key)
            result.append(canonical)
    return result


# ---------------------------------------------------------------------------
# Connect
# ---------------------------------------------------------------------------
uri = os.getenv("MONGODB_URI")
db_name = os.getenv("DB_NAME")
client = MongoClient(uri, serverSelectionTimeoutMS=5000)
db = client[db_name]
products = db["products"]

# ---------------------------------------------------------------------------
# Read the sheet
# ---------------------------------------------------------------------------
xlsx_path = DB_DIR / "data" / "Koyash.xlsx"
workbook = openpyxl.load_workbook(xlsx_path, data_only=True)
sheet = workbook["Products"]
headers = [cell.value for cell in sheet[1]]

needs_review = []
upserted = 0

for row in sheet.iter_rows(min_row=2):
    raw = {headers[i]: row[i].value for i in range(len(headers))}

    routine_step, tier, order_index = derive_routine_step(raw["category"])
    if raw["product_id"] in MANUAL_ROUTINE_STEP_OVERRIDES:
        routine_step, tier, order_index = MANUAL_ROUTINE_STEP_OVERRIDES[raw["product_id"]]

    doc = {
        "_id": raw["product_id"],

        # --- COPY: unchanged -------------------------------------------------
        "name": raw["name"],
        "brand": raw["brand"],
        "link": raw["link"],
        "ingredients_raw": raw["ingredients_raw"],
        "main_actives": raw["main_actives"],
        "functional_category": raw["functional_category"],
        "pH": raw["pH"],              # untouched on purpose: never a filter (plan A.5)
        "format": raw["format"],
        "issues": raw["issues"],
        "status": raw["status"],      # HOLD: undocumented, not used (plan A.6)

        # --- COPY, renamed to "*_raw" because they also feed a derived field --
        "category_raw": raw["category"],
        "allergens_raw": raw["allergens"],

        # --- CONVERT: type / vocabulary fixes --------------------------------
        "price_rub": to_number(raw["price_rub"]),
        "segment": SEGMENT_MAP[raw["segment"]],
        "vegan": VEGAN_MAP[raw["vegan"]],
        "cruelty_free": CRUELTY_FREE_MAP[raw["cruelty_free"]],
        "volume_ml": to_number(raw["volume_ml"]),
        "price_per_ml": to_number(raw["price_per_ml"]),

        # --- DERIVE: brand new fields -----------------------------------------
        "skintype": [],                                  # empty for now (plan B-19, F)
        "routine_step": routine_step,
        "tier": tier,
        "order_index": order_index,
        "allergens_norm": derive_allergens_norm(raw["allergens"]),
    }

    # Upsert by _id: if product_001 already exists, this overwrites it in place
    # instead of inserting a second copy — safe to run this script many times.
    products.replace_one({"_id": doc["_id"]}, doc, upsert=True)
    upserted += 1

    if routine_step == "needs_review":
        needs_review.append(doc)

print(f"Upserted {upserted} products into '{db_name}.products'.")
print()
print(f"=== {len(needs_review)} product(s) need a manual routine_step review ===")
for doc in needs_review:
    print(f"  {doc['_id']}  {doc['name']!r}")
    print(f"    category_raw: {doc['category_raw']!r}")

client.close()
