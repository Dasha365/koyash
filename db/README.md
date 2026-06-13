# db

MongoDB layer for the KOYASH recommendation app: connection test, import
scripts, JSON-schema validators, and sanity checks. See
`docs/KOYASH_data_transformation_plan.md` for the full data spec.

## Setup

```bash
pip install -r db/requirements.txt
```

## Source data

`db/data/Koyash.xlsx` (the `Products` and `Koyash`/consultations sheets) was
provided by the Koyash business as customer data and is **not included in
this repository** — it contains real product and consultation data we don't
have explicit permission to redistribute publicly.

To run the import scripts (`seeds/import_products.py`,
`seeds/import_examples.py`), get a copy of `Koyash.xlsx` from Daria and place
it at `db/data/Koyash.xlsx` (this path is gitignored).
