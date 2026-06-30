# ADR-001: Rule-based selection engine with the LLM as a justification-only layer

**Status:** Accepted

**Quality requirements addressed:**
[QR-001](../../quality-requirements.md#qr-001-allergen-safe-recommendations),
[QR-003](../../quality-requirements.md#qr-003-recommendation-response-time)

## Context

The product value is a cosmetic bag of real products that respects the user's
budget, ethical preferences, allergens, skin concerns, and skin type. Two
properties are non-negotiable: the allergen exclusion must be exact
([QR-001](../../quality-requirements.md#qr-001-allergen-safe-recommendations)),
and the questionnaire-to-bag transition must feel immediate
([QR-003](../../quality-requirements.md#qr-003-recommendation-response-time)).

For MVP v2 the customer provided an LLM (gpt-4o-mini) to improve the
explanations. The customer's brief is explicit: the LLM **only puts the
already-made decision into words** — it must not analyze composition or decide
whether a product fits. Expanding the LLM's role to judge ingredients requires a
separate discussion with the customer first.

## Decision

Keep all selection logic deterministic and rule-based in
`backend/app/api/recommend.py` (hard filters, segment-priority selection,
skin-type preference, basket assembly). Introduce the LLM strictly as an
**optional justification layer** that rewords the justification for products the
rule-based engine has already selected. If the LLM is unavailable, not
configured, or errors, the response falls back to the existing rule-based
justification text. The LLM never changes which products are recommended.

## Consequences and tradeoffs

- **Positive:** selection stays fully testable and reproducible — the allergen
  filter and fallback behaviour can be verified in CI (supports QR-001), and the
  variable-latency external call is kept off the critical selection path
  (protects QR-003).
- **Positive:** the LLM can be enabled, disabled, or swapped through
  configuration without touching selection logic or the deployment topology.
- **Negative / tradeoff:** the LLM cannot improve *what* is recommended, only how
  it is explained; any future "let the model reason about ingredients" capability
  is explicitly out of scope until agreed with the customer.
- **Operational:** the LLM API key is budget-limited and must be supplied as a
  secret (environment variable), never committed.
