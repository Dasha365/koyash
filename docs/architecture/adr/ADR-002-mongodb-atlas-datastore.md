# ADR-002: MongoDB Atlas as the product datastore

**Status:** Accepted

**Quality requirements addressed:**
[QR-002](../../quality-requirements.md#qr-002-robust-recommendation-across-the-valid-input-space)

## Context

KOYASH needs to store and query a catalog of skincare products. Each product is
document-shaped: alongside scalar fields (name, brand, price, segment, routine
step) it carries several arrays — `concerns_addressed`, `allergens_norm`,
`skintype`, and `main_actives_short`. The recommendation engine reads the
catalog on every `/recommend` call and filters it by these fields. The team is
small and wants a managed datastore rather than self-hosted database operations.

## Decision

Use **MongoDB Atlas** (managed cloud) as the product datastore, accessed from
the FastAPI backend through the async **Motor** driver. The document model maps
directly to the product shape; JSON-schema validators in
[`db/schemas/`](../../../db/schemas/) and pydantic models on the backend enforce
structure. The database-side hard filters (`vegan`, `cruelty_free`) run as
MongoDB queries, while the **allergen filter runs in application code**
(case-insensitive) rather than in the query.

## Consequences and tradeoffs

- **Positive:** managed backups, TLS, and availability; the connection string is
  just one secret in the backend environment. The flexible document model fits
  the array-heavy product shape without join logic.
- **Positive:** keeping the allergen filter in Python makes that safety-critical
  rule directly verifiable and independent of query semantics (this supports
  [QR-001](../../quality-requirements.md#qr-001-allergen-safe-recommendations),
  even though correctness there is owned by ADR-001's engine).
- **Robustness ([QR-002](../../quality-requirements.md#qr-002-robust-recommendation-across-the-valid-input-space)):**
  the catalog is small and uneven (e.g. few high-segment products), so the
  engine must tolerate sparse query results without failing — the datastore
  choice makes the full catalog cheap to load per request and filter in memory,
  which the robustness handling (ADR-003) builds on.
- **Negative / tradeoff:** no relational integrity or server-side joins;
  structural guarantees depend on the schema validators and pydantic models.
  Atlas is an off-platform network hop, so its latency/availability sit outside
  Railway (see the deployment view).
