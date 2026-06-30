# Quality Requirements

This document defines the measurable quality requirements (non-functional
requirements) for KOYASH, structured with the ISO/IEC 25010 quality model.
Each requirement names one sub-characteristic, states why it matters for this
product and its stakeholders, specifies a measurable scenario, and links the
automated quality requirement test(s) that verify it.

Quality requirements and their tests are **maintained project assets** (see
[Process Requirements](Process_Requirements.md#architecture-quality-requirements-and-quality-requirement-tests)).
Later project work must keep them current, extend them when scope or risk
changes, and preserve history when a requirement is replaced.

**Critical product module:** the rule-based recommendation engine
`backend/app/api/recommend.py` (hard filtering, segment fallback, basket
assembly, per-product justification, empty-result handling). It owns the core
product value (US-04, US-05, US-08) and is the focus of the requirements below.

| QR | Title | ISO/IEC 25010 sub-characteristic | QRT |
|----|-------|----------------------------------|-----|
| QR-001 | Allergen-safe recommendations | Functional correctness | [QRT-001](quality-requirement-tests.md#qrt-001-allergen-exclusion) |
| QR-002 | Robust recommendation across the valid input space | Fault tolerance | [QRT-002](quality-requirement-tests.md#qrt-002-recommendation-input-space-robustness) |
| QR-003 | Recommendation response time | Time behaviour | [QRT-003](quality-requirement-tests.md#qrt-003-recommend-latency) |

-----

## QR-001: Allergen-safe recommendations

**ISO/IEC 25010 sub-characteristic:** Functional correctness (Functional
suitability)

**Scenario:** When an end user submits a `/recommend` request declaring one or
more allergens under the standard service configuration, the recommendation
endpoint shall return a cosmetic bag in which **0 products** contain any
declared allergen (case-insensitive match of the declared values against each
product's normalized `allergens_norm` tokens), for **100%** of requests.

**Why this matters:** Strict allergen exclusion (US-08) is the one filter that
protects user safety. The product positions itself as a trustworthy independent
expert; a single leaked allergen breaks both the safety guarantee and the trust
the brand is built on. Because the allergen filter runs in application code
(case-insensitive, in Python) rather than in the database query, it must be
verified directly and continuously, not assumed.

**Linked quality requirement tests:** [QRT-001](quality-requirement-tests.md#qrt-001-allergen-exclusion)

**Related ADRs:** [ADR-001](architecture/adr/ADR-001-rule-based-engine-llm-justification-only.md) — deterministic rule-based selection keeps the allergen exclusion in testable application code, with the LLM unable to alter selection.

-----

## QR-002: Robust recommendation across the valid input space

**ISO/IEC 25010 sub-characteristic:** Fault tolerance (Reliability)

**Scenario:** When an end user submits any syntactically valid `/recommend`
request — any combination of `budget` ∈ {low, mid, high}, ethical flags
(`vegan`, `cruelty_free`), `concerns` subset, `allergens` subset, and
`minimalism` — under the standard service configuration, the endpoint shall
respond with **either** HTTP 200 and a body that validates against the
`RecommendResponse` schema, **or** HTTP 422 with `detail.error.code ==
"NO_PRODUCTS_AVAILABLE"`. It shall **never** return a 5xx response and **never**
return a 200 with a schema-invalid body, for **100%** of an enumerated input
grid of at least 200 valid combinations, plus the empty-catalog boundary case.

**Why this matters:** The acceptance criteria require the demo to run the core
scenario without failures (ТЗ §12). The high budget segment has only 3 products,
and combining strict ethics flags with allergen exclusion can shrink the
candidate pool to nothing. The system must degrade gracefully — a partial bag or
a documented, structured error — instead of crashing or returning malformed data
that the frontend cannot render.

**Linked quality requirement tests:** [QRT-002](quality-requirement-tests.md#qrt-002-recommendation-input-space-robustness)

**Related ADRs:** [ADR-002](architecture/adr/ADR-002-mongodb-atlas-datastore.md) — the full catalog is cheap to load and filter in memory; [ADR-003](architecture/adr/ADR-003-discrete-budget-segments-nearest-fallback.md) — segment-priority fallback degrades gracefully across the input space instead of failing on sparse combinations.

-----

## QR-003: Recommendation response time

**ISO/IEC 25010 sub-characteristic:** Time behaviour (Performance efficiency)

**Scenario:** When an end user submits a `/recommend` request under the CI test
environment (in-process ASGI test client, fixed catalog, excluding network and
Atlas round-trips), the endpoint shall return a complete response within
**300 ms** for at least **95%** of **100** sequential requests.

**Why this matters:** The recommendation is the moment of value in the user
journey; the questionnaire-to-bag transition must feel immediate so the
experience reads as effortless care rather than a slow form. This requirement
fixes a measurable upper bound on the engine's own computation cost
(filtering + assembly + justification + serialization), isolated from
deployment/network variance, so that performance regressions in the selection
logic are caught in CI before they reach the customer-facing deployment.

**Linked quality requirement tests:** [QRT-003](quality-requirement-tests.md#qrt-003-recommend-latency)

**Related ADRs:** [ADR-001](architecture/adr/ADR-001-rule-based-engine-llm-justification-only.md) — keeping selection deterministic and the variable-latency LLM call optional and off the critical path bounds the engine's own computation cost.
