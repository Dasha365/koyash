# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- `POST /recommend` — recommendation engine that assembles a personalised cosmetic bag from the quiz result.
  Accepts `budget` (low / mid / high), `concerns`, `vegan`, `cruelty_free`, `minimalism`, `allergens`.
  Returns an ordered `bag` of products with `meta.total_price_rub` and `meta.budget_range`.
- Budget-range logic: `low` ≤ 3 000 ₽, `mid` ≤ 7 000 ₽, `high` ≥ 7 000 ₽ (total basket sum, not per-product segment).
- Greedy downgrade pass for low/mid: swaps products to fit the ceiling while preserving concern relevance.
- Greedy upgrade pass for high: swaps to high-segment products to reach the floor.
- Fallback: if the ceiling is unreachable, returns the cheapest available basket with a note in `meta.note`.
- `INSUFFICIENT_HIGH_SEGMENT_DATA` (HTTP 422): returned for `high` budget when premium inventory is insufficient.
  Threshold `MIN_HIGH_PRODUCTS` is env-configurable (default 8); with the current 3 high-segment products the error always fires.
- `MIN_HIGH_PRODUCTS` setting in `app/core/config.py` — no code changes needed when the catalog grows.

### Changed

- `POST /recommend` request schema: replaced `segment` filter with `budget` + `concerns` + `minimalism` fields.
- Segment floor filter applied after allergen filter: `low` → all segments, `mid` → mid + high only, `high` → high only. Ensures mid/high budgets never include low-segment products.
- `_try_drop_step` redesigned: drops the most expensive product by tier priority (occasional first, then core) without checking the budget target per call. The caller loops until `total ≤ hi`, correctly removing both occasional steps when needed (e.g. mid + full routine with mid/high pool only).
- `ProductOut` response model: exposes `main_actives_short` and `concerns_addressed`; hides `segment`, `allergens_norm`, and other internal fields.
- `BagItem` no longer contains `routine_step` or `order_index` — those fields live in `BagItem.product` (`ProductOut`) only, eliminating duplicate keys in the response.
- Dockerfile `CMD` updated to `${PORT:-8000}` for Railway `$PORT` compatibility.

### Added

- `justification` block in each `BagItem`: `role` (localised step name + index), `what_it_does` (up to 3 phrases from `functional_category`), `key_actives` (up to 3 from `main_actives_short`), `why_for_you` (matched concern phrases + vegan/CF/allergen flags).
- `frequency` field in `ProductOut`: human-readable usage frequency in Russian (e.g. "Ежедневно", "2–3 раза в неделю").
- `image_url` (nullable) in `Product` and `ProductOut`.
- `empty_steps` list in `meta`: steps skipped due to no pool candidates or dropped by the budget fallback.
- `db/seeds/patch_image_url.py` — idempotent script for manually patching `image_url` per product ID. Dry-runs when `IMAGE_URLS` dict is empty.
