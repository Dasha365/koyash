# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Skin-type preference in `POST /recommend`: within the user's budget segment, products matching the
  stated `skin_type` (or tagged `any`) are preferred over mismatched ones. If a step has no product of
  the user's skin type, the engine falls back to `any`-type products in the same segment; if neither
  exists the step is left empty instead of taking a mismatched product. `RecommendRequest` accepts an
  optional `skin_type` (normal / dry / oily / combination / sensitive); `Product` carries the `skintype`
  tags. Hard filters (vegan, cruelty-free, allergens) run first and are never relaxed by skin-type matching.
- The storytelling questionnaire now sends the user's `skin_type` answer to `POST /recommend`
  (the question existed on screen already; the request payload didn't include it before).
- Short, non-storytelling questionnaire variant at `/quick`: same questions as the
  storytelling flow (including skin type), without the narrative framing; shares the
  same `/recommend` request-building and results screen, so identical answers produce
  an identical cosmetic bag regardless of which variant the user takes.
- Landing page (`/`): full build per the Figma design — hero, problem/solution section,
  "smart selection" and "why trust Koyash" sections, how-it-works steps, and entry points
  into the storytelling and short questionnaire flows.

### Changed

- Storytelling questionnaire and results screen: consolidated the per-screen quiz
  components into a single generic step component, reworked button and heart-icon
  styling, and fixed budget-screen copy ("аптечном" → "обычном") per customer review
  feedback.

## [1.0.0] - 2026-06-21

### Added

- Questionnaire + results frontend (React + Vite): intro, concerns, budget, allergens, and
  values screens, wired end-to-end to the deployed `POST /recommend` backend; results screen
  renders the ordered cosmetic bag with per-product justification and frequency.
- `POST /recommend` — recommendation engine that assembles a personalised cosmetic bag from the quiz result.
  Accepts `budget` (low / mid / high), `concerns`, `vegan`, `cruelty_free`, `minimalism`, `allergens`.
  Returns an ordered `bag` of products with `meta.total_price_rub`.
- Per-step segment fallback: each routine step is matched against the user's own budget segment first; if that
  segment has no candidate for the step, the engine falls back to the nearest segment via the explicit
  `SEGMENT_PRIORITY` table (`low → mid → high`, `mid → low → high`, `high → mid → low`). Hard filters
  (vegan, cruelty-free, allergens) are applied before the segment search and are never relaxed by the fallback.
  Substituted steps are reported in `meta.note` ("Шаги без точного совпадения по бюджету: …").
- `justification` block in each `BagItem`: `role` (localised step name + index), `what_it_does` (up to 3 phrases from `functional_category`), `key_actives` (up to 3 from `main_actives_short`), `why_for_you` (matched concern phrases + vegan/CF/allergen flags).
- `frequency` field in `ProductOut`: human-readable usage frequency in Russian (e.g. "Ежедневно", "2–3 раза в неделю").
- `image_url` (nullable) in `Product` and `ProductOut`.
- `empty_steps` list in `meta`: core steps with zero candidates in any segment, after hard filters.
- `db/seeds/patch_image_url.py` — idempotent script for manually patching `image_url` per product ID. Dry-runs when `IMAGE_URLS` dict is empty.
- `backend/app/core/active_translations.py`: `ACTIVE_NAME_RU` map + `translate_active()`. `main_actives_short` mixes Russian phrasing with raw Latin INCI names depending on how the source row was filled in; `ProductOut.main_actives_short` and `justification.key_actives` are now translated to Russian before leaving the API, since there's no frontend yet to do that transformation.
- `justification.summary_ru`: `why_for_you` joined into a single ready-to-display Russian sentence, for consumers that want one string instead of a list.

### Changed

- `POST /recommend` request schema: replaced `segment` filter with `budget` + `concerns` + `minimalism` fields.
- `ProductOut` response model: exposes `main_actives_short` and `concerns_addressed`; hides `allergens_norm` and other internal fields.
- `BagItem` no longer contains `routine_step` or `order_index` — those fields live in `BagItem.product` (`ProductOut`) only, eliminating duplicate keys in the response.
- Dockerfile `CMD` updated to `${PORT:-8000}` for Railway `$PORT` compatibility.

### Fixed

- `justification.why_for_you` no longer contains the English literal `"Cruelty-free"` — now «Не тестируется на животных».
