# ADR-003: Budget as discrete segments with nearest-segment fallback

**Status:** Accepted

**Quality requirements addressed:**
[QR-002](../../quality-requirements.md#qr-002-robust-recommendation-across-the-valid-input-space)

## Context

Users choose a budget, presented on the frontend as ranges (≤ 3500 / 3500–8000 /
8000+ ₽). Internally each product has a `segment` of `low`, `mid`, or `high`.
The catalog is small and uneven — some routine steps have no product in a given
segment (for example, the high segment has very few products). An earlier design
that forced the basket total into a hard price band made `budget=high` fail
outright when a segment could not be filled, and the customer's intent (per the
project brief) is that budget should act as a soft preference with a graceful
fallback, not a hard gate — catalog prices also drift over time, so exact price
bands are not a durable constraint.

## Decision

Treat budget as **discrete segments with nearest-segment fallback**, not as
free-form price optimization. For each routine step the engine searches the
user's own segment first, then the nearest neighbour(s) on the `low < mid < high`
scale (the explicit `SEGMENT_PRIORITY` table in `recommend.py`). A step is left
empty only when no segment has a candidate. When a product is taken from a
segment other than the requested one, the response notes the substitution. Price
bands are informational labels, not load-bearing constraints on the assembled
total.

## Consequences and tradeoffs

- **Positive
  ([QR-002](../../quality-requirements.md#qr-002-robust-recommendation-across-the-valid-input-space)):**
  the engine degrades gracefully across the whole valid input space instead of
  failing on sparse combinations — `budget=high` now falls back per step rather
  than returning a blanket error, and a genuinely empty result surfaces as a
  structured `422 NO_PRODUCTS_AVAILABLE`.
- **Positive:** the fallback only relaxes the *segment*; it never relaxes the
  hard filters (vegan, cruelty-free, allergens), which are applied before
  selection.
- **Negative / tradeoff (known, tracked):** because price bands are not
  enforced, the assembled total may not land tightly inside the budget range the
  frontend showed the user. Tightening this is the explicit subject of
  **PBI-302** (budget precision), which will measure real totals against the
  displayed ranges and decide whether to recalibrate the boundaries or target the
  range during assembly. This ADR will be revisited (and superseded if the
  decision changes materially) based on that work.
