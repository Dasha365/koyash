# Re-derive allergens_norm for all products using the updated normalization logic.
# Uses $set so it never touches other fields (concerns_addressed, etc.).
# Idempotent: safe to re-run.

import os
import re
import sys
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient

DB_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=DB_DIR / ".env")

sys.stdout.reconfigure(encoding="utf-8")

# ---------------------------------------------------------------------------
# Normalization logic (kept in sync with import_products.py)
# ---------------------------------------------------------------------------
PARENTHETICAL = re.compile(r"\([^)]*\)")
_CYRILLIC = re.compile(r"[Ѐ-ӿ]")
_LEADING_DECORATION = re.compile(r"^[^\w]+")
_SPECIFIC_ABSENCE = re.compile(
    r"^[A-Za-z][A-Za-z0-9/+\- ]*\s+(отсутству(?:ет|ют)|не\s+обнаружен\w*|не\s+содержится)\s*$",
)
_QUALIFIER_PREFIXES = ("только ",)

_ALLERGEN_ALIASES: dict[str, str] = {
    "parfum": "Fragrance",
    "бензиловый спирт": "Benzyl Alcohol",
    "парабены": "Paraben",
    "пропиленгликоль": "Propylene Glycol",
    "диethylamino hydroxybenzoyl hexyl benzoate": "Diethylamino Hydroxybenzoyl Hexyl Benzoate",
}


def _strip_qualifier_prefix(token: str) -> str:
    lowered = token.lower()
    for prefix in _QUALIFIER_PREFIXES:
        if lowered.startswith(prefix):
            return token[len(prefix):].strip()
    return token


def _clean_token(token: str) -> str:
    if not token[0].isascii():
        return ""
    m = _CYRILLIC.search(token)
    if m:
        token = token[: m.start()].strip()
    return token.rstrip(" —-")


def derive_allergens_norm(allergens_raw: str) -> list[str]:
    if not allergens_raw:
        return []
    without_notes = PARENTHETICAL.sub("", allergens_raw)
    atoms: list[str] = []
    for piece in without_notes.split(","):
        atoms.extend(part.strip() for part in piece.split(" + "))
    seen: set[str] = set()
    result: list[str] = []
    for atom in atoms:
        atom = _LEADING_DECORATION.sub("", atom).strip()
        if not atom or _SPECIFIC_ABSENCE.match(atom):
            continue
        atom = _strip_qualifier_prefix(atom)
        if not atom:
            continue
        alias_key = atom.lower()
        if alias_key in _ALLERGEN_ALIASES:
            canonical = _ALLERGEN_ALIASES[alias_key]
        else:
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
col = db["products"]

# ---------------------------------------------------------------------------
# Re-derive and patch
# ---------------------------------------------------------------------------
all_docs = list(col.find({}, {"_id": 1, "allergens_raw": 1}))
if len(all_docs) != 69:
    print(f"FAIL: expected 69 products, found {len(all_docs)}. Aborting.")
    client.close()
    sys.exit(1)

updated = 0
for doc in all_docs:
    new_norm = derive_allergens_norm(doc.get("allergens_raw") or "")
    col.update_one({"_id": doc["_id"]}, {"$set": {"allergens_norm": new_norm}})
    updated += 1

print(f"Patched allergens_norm on {updated} products.\n")

# ---------------------------------------------------------------------------
# Stats: unique tokens and their counts after patching
# ---------------------------------------------------------------------------
all_tokens = sorted(col.distinct("allergens_norm"), key=str.lower)
print(f"Unique allergen tokens after normalization: {len(all_tokens)}\n")
for token in all_tokens:
    count = col.count_documents({"allergens_norm": token})
    print(f"  {count:2d}x  {token}")

client.close()
