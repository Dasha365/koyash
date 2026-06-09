# KOYASH — Data Transformation Plan (APPROVED)

*Status: approved by Daria (DB owner). This is the authoritative spec for importing `Koyash.xlsx` into MongoDB Atlas. Implementation must follow it exactly; deviations require Daria's sign-off. All facts come from direct inspection of the file.*

**Source:** `Koyash.xlsx` — `Products` (69 rows x 20 cols), `Koyash`/consultations (55 rows x 14 cols).
**Target:** MongoDB Atlas. Database: `koyash`. Collections (MVP): `products`, `consultations`. **Do NOT create `users` or `history`.**

**Action legend:** COPY (unchanged) · CONVERT (type/format fixed) · DERIVE (new computed field; original always kept) · HOLD (copied, not trusted/used yet).

---

## A. Confirmed decisions

1. **`_id` = original id.** `product_id` -> `_id` (products); `consultation_id` -> `_id` (consultations). Enables exact, idempotent upserts.
2. **Budget vocabulary = `low / mid / high`.** Products `бюджет/мидл/люкс` -> `low/mid/high`; consultations `low/medium/high` -> `low/mid/high`.
3. **Two-tier routine model** (see D/E): a **core** daily spine (cleanse -> tone -> serum -> moisturize -> spf, ordered) plus an **occasional** treatment tier (exfoliant, mask, other). Routing is by *function*, not by the product's name.
4. **`allergens_norm`** = provisional derived list parsed from prose; used for exclusion with care, not treated as authoritative.
5. **`pH` is never a filter** (corrupted values, incl. an Excel date serial `46148`).
6. **`status` = HOLD** (undocumented). **`total_price` = thousands-separator assumption**: keep raw, derive `total_price_rub = round(raw x 1000)` (e.g. `3.957 -> 3957`); flag as an assumption pending customer confirmation. Lives only on reference data, so it can't affect the MVP demo.
7. **Originals are never destroyed** — every derived/converted field keeps its raw source alongside it.

---

## B. Products — field-by-field

| # | Excel field | Action | Target · type | Cleaning / conversion | Why | Filter? |
|---|---|---|---|---|---|---|
| 1 | `product_id` | CONVERT | `_id` · string | used as key | unique readable identity | lookup |
| 2 | `name` | COPY | `name` · string | — | card display | no |
| 3 | `brand` | COPY | `brand` · string | — | card display | no |
| 4 | `price_rub` | CONVERT | `price_rub` · number | force numeric | budget filter/sort | **yes (strict)** |
| 5 | `segment` | CONVERT | `segment` · enum | `бюджет->low, мидл->mid, люкс->high` | aligns catalog with questionnaire | **yes (strict)** |
| 6 | `category` | COPY | `category_raw` · string | preserved | source for routing; traceability | no directly |
| 7 | `link` | COPY | `link` · string | — | card display | no |
| 8 | `ingredients_raw` | COPY | `ingredients_raw` · string | — | internal only | no |
| 9 | `main_actives` | COPY | `main_actives` · string | — | internal; **not shown to user** | no |
| 10 | `functional_category` | COPY | `functional_category` · string | — | context, too verbose to query | no |
| 11 | `pH` | COPY | `pH` · string | untouched, **never-filter flag** | corrupted; loose context only | **forbidden** |
| 12 | `allergens` | COPY | `allergens_raw` · string | preserved | source for token list | no directly |
| 13 | `vegan` | CONVERT | `vegan` · boolean | `Да->true, Нет->false` | filterable flag (weak: only 2/69 false) | **yes (strict, weak)** |
| 14 | `cruelty_free` | CONVERT | `cruelty_free` · enum | `Да->yes, Нет->no, Неизвестно->unknown` | preserves the real third state | **yes (strict)** |
| 15 | `format` | COPY | `format` · string | — | context | no |
| 16 | `volume_ml` | CONVERT | `volume_ml` · number | force numeric | context | no |
| 17 | `price_per_ml` | CONVERT | `price_per_ml` · number | force numeric | context / future ranking | no (MVP) |
| 18 | `issues` | COPY | `issues` · string | — | internal notes; **not user-facing** | no |
| 19 | `skintype` | DERIVE->empty | `skintype` · string[] | empty array (no data) | column empty for all 69; future update path in F | **no (post-MVP)** |
| 20 | `status` | HOLD | `status` · raw | copied, unused | undocumented (all False) | no |
| — | *(new)* | DERIVE | `routine_step` · enum | see D | groups/orders the routine | **yes (grouping)** |
| — | *(new)* | DERIVE | `tier` · enum | `core` / `occasional` (from `routine_step`) | fill the spine first, add treatments optionally | **yes (grouping)** |
| — | *(new)* | DERIVE | `order_index` · number\|null | 1–5 for core, null for occasional | sorts the spine without runtime string-matching | **yes (ordering)** |
| — | *(new)* | DERIVE | `allergens_norm` · string[] | tokenize `allergens_raw`, strip parentheticals | makes exclusion possible — **provisional** | **yes (exclusion, provisional)** |

**Safe filters after import:** `price_rub`, `segment`, `vegan`, `cruelty_free`, `routine_step`, `tier`, `order_index`. **Provisional:** `allergens_norm`. **Never:** `pH`. **Post-MVP:** `skintype`.

---

## C. Consultations — field-by-field

*Reference/seed data: format models for the cosmetic bag and material for the post-MVP LLM stage. The rule engine never queries this collection.*

| # | Excel field | Action | Target · type | Cleaning | Why | Filter? |
|---|---|---|---|---|---|---|
| 1 | `consultation_id` | CONVERT | `_id` · string | key | identity | no |
| 2 | `age` | CONVERT | `age` · number | numeric | reference | no |
| 3 | `skin_type` | COPY | `skin_type` · string | free text kept | rich values, not an enum | no |
| 4 | `concerns` | DERIVE | `concerns` · string[] | split on commas | lists are iterable | no |
| 5 | `budget` | CONVERT | `budget` · enum | `low->low, medium->mid, high->high` | canonical vocabulary | no |
| 6 | `allergies` | COPY | `allergies` · string\|null | blank -> null | reference | no |
| 7 | `values` | COPY | `values` · string | free text kept | many variants | no |
| 8 | `experience` | COPY | `experience` · string | free text kept | many variants | no |
| 9 | `products_recommended` | DERIVE | `products_recommended` · string[] | split into product_id list (refs into `products`) | real links | indirectly |
| 10 | `total_price` | HOLD+DERIVE | `total_price_raw` (raw) + `total_price_rub` · number | `round(raw x 1000)`; flag assumption | usable price under stated assumption | no |
| 11 | `reasoning` | COPY | `reasoning` · string | — | short rationale model | no |
| 12 | `warning_notes` | COPY | `warning_notes` · string | — | usage-caution model | no |
| 13 | `full_reasoning` | COPY | `full_reasoning` · string | — | **the format model** for a finished bag | no |
| 14 | `status` | HOLD | `status` · raw | copied, unused | undocumented (all True) | no |

---

## D. `routine_step` derivation — function over name (first match wins)

Match `category_raw` case-insensitively, top to bottom; the **first** rule that matches decides the step. Order is deliberate — it protects against products whose *name* misleads (e.g. an acid "tonic" is functionally an exfoliant; a lactic-acid *cream* is still a moisturizer).

| Order | If `category_raw` contains... | -> `routine_step` | `tier` | `order_index` |
|---|---|---|---|---|
| 1 | `SPF` | `spf` | core | 5 |
| 2 | `маска` | `mask` | occasional | null |
| 3 | `пилинг` OR `эксфолиант` | `exfoliant` | occasional | null |
| 4 | `крем` OR `гель-крем` OR `эмульс` | `moisturize` | core | 4 |
| 5 | (`тоник` OR `тонер` OR `сыворотк` OR `эссенц`) **AND** (`AHA` OR `BHA` OR `PHA` OR `кислот`) | `exfoliant` | occasional | null |
| 6 | `очищ` OR `пенка` OR `мицелляр` | `cleanse` | core | 1 |
| 7 | `сыворотк` OR `эссенц` | `serum` | core | 3 |
| 8 | `тонер` OR `тоник` | `tone` | core | 2 |
| 9 | *(none of the above)* | `needs_review` | occasional | null |

**Why this order:** SPF and masks are unambiguous, so they go first. Explicit peels (`пилинг`/`эксфолиант`) are caught before anything else can mis-claim them. Creams are matched **before** the acid rule so a mild lactic-acid cream isn't misread as a peel. The compound rule (5) is what reclassifies acid *tonics/serums* as exfoliants by function. Plain hydrating toners and treatment serums fall through to their core steps. Anything unmatched lands in `needs_review` so it can never silently vanish from a bag.

**Known items to validate with the team/customer (carry-over D-1):**
- Hydrating *essences* (`эссенц`) currently route to `serum` — could be `tone`. Decide.
- Whether `mask` items belong in the recommended routine at all for MVP.
- Review the `needs_review` list by hand after the first import (we'll print it).

---

## E. How the routine is assembled (data -> engine contract)

This is the contract Arthur's recommendation engine relies on; the DB guarantees the shape, the engine consumes it:

- **Core spine:** for each `order_index` 1->5 among `tier: core` products passing the user's filters, pick **one** best match. Default one product per step. *Exception:* the `serum` step may hold up to **2** products when the user has two genuinely distinct concerns.
- **Occasional tier:** optionally add `tier: occasional` products (`exfoliant`/`mask`) only when relevant to the user's concerns, capped low, presented as labeled add-ons with frequency guidance — not woven into the daily sequence.
- **Target size:** 5 core + ~2 occasional ~= 7 (within the required 5–10).
- **Empty core step:** present the steps that can be filled; do **not** auto-relax budget/filters to force a fill. *(Sparse-results behavior is still an open contradiction — TS 7.1 vs interview — to be locked with the team before demo.)*

**Frozen vs flexible:** the **set of `routine_step` / `tier` names and the `order_index` scheme** must be agreed with Arthur and frozen (his grouping code depends on them). **Which product maps into which step** stays freely editable — it re-derives from `category_raw` in seconds, in place, no schema change.

---

## F. Future-proofing (confirmed safe)

- **Remapping `routine_step`:** edit D rules, re-run the derivation over 69 docs, done. No re-read of Excel, no data loss, no schema change. Safe to run repeatedly (`_id` upsert).
- **Adding `skintype` later:** the field already exists (empty array). When the customer provides annotation, it's an `_id`-keyed update — a ~5-minute operation, no migration, no impact on the other fields. Keep it an **array** (a product can suit several skin types).

---

## G. Implementation order (one step at a time in Claude Code)

1. Connect to Atlas safely via `.env` (`MONGODB_URI`); prove the connection.
2. Import `products`: copy + convert + derive per B/D; idempotent upsert on `_id`; print the `needs_review` list.
3. Import `consultations` per C.
4. Add schema validation for `products` (required fields + types).
5. Run sanity checks (below).

**Sanity checks to pass:** 69 products / 55 consultations loaded; every product has a non-null `routine_step`; `needs_review` list reviewed; at least one fillable product exists for `cleanse`, `moisturize`, `spf`; budget/vegan/cruelty_free filters return sensible counts; a spot-check of `allergens_norm` exclusion.

---

## H. `concerns_addressed` derivation (validated)

New derived field on `products`. Source: `functional_category` (keyword match). Same discipline as `routine_step`/`allergens_norm`: keep raw, idempotent re-derive, **provisional**, log empties.

- Field: `concerns_addressed` · string[] · **soft signal, never a hard filter**.
- `issues` is NOT used here and is NOT user-facing.

**Canonical vocabulary — frozen, shared with questionnaire + Arthur**
- 6 product-capability tags: `acne, oiliness, pigmentation, aging, dryness, sensitivity`.
- 7 user-facing concerns: the 6 above + `enlarged_pores`, which maps to `oiliness` (one documented synonym; pores are driven by sebum). The user concern list and product-tag list are intentionally not 1:1.

**Keyword buckets (match `functional_category`, case-insensitive)**

| Tag | Keywords | Count /69 |
|---|---|---|
| acne | анти-акне, акне, антибактериальн, угрев | 5 |
| oiliness | себорегуляц, себоконтроль, себум, матировани, жирн, очищение пор | 13 |
| pigmentation | осветлени, пигмент | 15 |
| aging | анти-эйдж, антивозраст, анти-возраст, морщин, упругост, коллаген, пептид, anti-age | 6 |
| dryness | глубокая гидратац, гиперувлажн, интенсивн | 3 |
| sensitivity | sensitive, чувствительн, гиперчувствительн, заживлени, восстановление барьер, раздраж, дерматит | 16 |

- **Excluded from `sensitivity`** on purpose: `успокаивани`, `противовоспал`, `буферизир` (too universal — 30/15 hits — match-everything). Soothing may still appear in reasoning text, not as a selector.
- **Excluded from `dryness`** on purpose: plain `гидратация`/`увлажнение` (universal). Baseline dryness is covered by the moisturizer step.
- Empty array = expected for gentle cleansers/basic hydrators/plain SPFs (22 products); selected by routine role, not concern. Log them.
- Demo reachability confirmed: acne/aging/dryness all have low+mid products (no luxury-lock).

**Usage (DB guarantees field on every product; engine consumes):** core steps → concern overlap is a *tie-breaker*; serum + occasional → concern is the *primary* selector. Derived for ALL products (incl. cleansers) so any step can be concern-ranked.
