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
- Hard filters no longer include a segment filter; the full product pool (all segments) is used and budget is enforced on the total basket sum.
- `ProductOut` response model: exposes `main_actives_short` and `concerns_addressed`; hides `segment`, `allergens_norm`, and other internal fields.
- Dockerfile `CMD` updated to `${PORT:-8000}` for Railway `$PORT` compatibility.
