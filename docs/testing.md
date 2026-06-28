# Testing Status

Canonical testing status artifact for KOYASH, following
[Repository_Requirements](Repository_Requirements.md#quality-automation-and-ci).
Cross-reference: [quality-requirements.md](quality-requirements.md),
[quality-requirement-tests.md](quality-requirement-tests.md),
[user-acceptance-tests.md](user-acceptance-tests.md).

**CI workflow:** [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)
**Latest protected-default-branch (`main`) CI run:**
[CI workflow run](https://github.com/Koyash-team/koyash/actions/runs/28328682771) ·
[Lychee run](https://github.com/Koyash-team/koyash/actions/runs/28328682766)
**Branch protection / rules evidence:** [ruleset `main`](https://github.com/Koyash-team/koyash/rules/17644441)
(non-fast-forward, 1 required approving review, required review-thread resolution,
required status checks on all 11 jobs below — 6 backend/Lychee + 5 frontend added for PBI-209)

## Critical Modules and Coverage

| Critical module | Why critical | Required line coverage | Current line coverage | Evidence |
|---|---|---:|---:|---|
| `backend/app/api/recommend.py` | Owns the core product value: hard filtering (vegan/cruelty-free/allergens), segment fallback, skin-type preference, basket assembly, and per-product justification (US-04, US-05, US-08, US-09). | 30% | 100% | [Backend tests + QRTs + coverage run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978389) |
| `frontend/src/pages/Quiz/quizConfig.js` (`buildRequest`) | Assembles the questionnaire answers into the `/recommend` request payload; shared by both the storytelling (`Quiz`) and short (`Quick`) flows — a defect here silently breaks every recommendation request. | 30% | 100% | [Frontend tests + coverage run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978392) |
| `frontend/src/pages/Quiz/Loading.jsx` | Calls `POST /recommend`, branches on success/422 (`NO_PRODUCTS_AVAILABLE`)/error, and navigates to the results screen with the right state — the only place the frontend talks to the recommendation API. | 30% | 96% | [Frontend tests + coverage run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978392) |

Global repository coverage is lower than the critical-module figures above: no other
backend module (`app/api/products.py`, `app/core/database.py`, `app/models/product.py`,
`app/core/active_translations.py`) and no other frontend code (screen components, styling,
`Quick`/`Results` UI) has automated tests yet. These are not currently classified as
critical modules — they are thin wrappers around MongoDB/FastAPI, static translation
tables, or presentational screens, not the product's core decision logic — but they are
untested.

## Automated Test Status

| Test type | Scope | Command or CI check | Latest result | Evidence |
|---|---|---|---|---|
| Backend unit tests | Recommendation/matching logic: segment fallback, hard filters, skin-type preference, justification, ranking (`backend/tests/test_recommend_unit.py`) | `cd backend && python -m pytest tests/test_recommend_unit.py` | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978389) |
| Backend integration tests | `POST /recommend` end-to-end via FastAPI `TestClient` against an in-memory catalog, plus the QRT suite below | `cd backend && python -m pytest` | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978389) |
| Backend automated QRTs | QR-001 (allergen exclusion), QR-002 (input-space robustness), QR-003 (`/recommend` latency) | `cd backend && python -m pytest -m qrt` | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978389) |
| Frontend unit tests | `buildRequest` request-shape logic (`frontend/src/pages/Quiz/quizConfig.test.js`, 11 tests) | `cd frontend && npx vitest run src/pages/Quiz/quizConfig.test.js` | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978392) |
| Frontend integration tests | `Loading` <-> `/recommend` boundary: success, 422 (`NO_PRODUCTS_AVAILABLE`), and network-error paths, with `fetch`/`useNavigate` mocked (`frontend/src/pages/Quiz/Loading.test.jsx`, 4 tests) | `cd frontend && npx vitest run src/pages/Quiz/Loading.test.jsx` | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978392) |

322 backend tests, 100% line coverage on `backend/app/api/recommend.py` (required ≥30%).
15 frontend tests, 100%/96% line coverage on `quizConfig.js`/`Loading.jsx` (required ≥30%
per file). No automated frontend quality-requirement test exists separately — see the note
below the next table.

## CI and QA Check Status

| Gate or check | Required for Done? | Latest protected-branch status | Evidence |
|---|---|---|---|
| Backend linting (ruff) | Yes | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978400) |
| Backend type checking (mypy) | Yes | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978485) |
| Backend build (Docker image) | Yes | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978397) |
| Backend unit + integration tests + coverage gate | Yes | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978389) |
| Backend automated QRTs | Yes | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978389) |
| Backend additional QA check (dependency vulnerability scan) | Yes | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978449) |
| Link checking (Lychee) | Yes | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682766) |
| Frontend linting (eslint) | Yes | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978383) |
| Frontend format check (prettier) | Yes | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978419) |
| Frontend build (vite build) | Yes | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978396) |
| Frontend unit + integration tests + coverage gate | Yes | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978392) |
| Frontend additional QA check (dependency vulnerability scan) | Yes | Passing | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978406) |

**Note on frontend quality requirement tests:** `ci.yml` has no path filters, so the
backend QRT job (QR-001/002/003) already runs on every PR, including frontend-only ones.
This satisfies the pipeline-level "automated quality requirement tests" gate; there is no
separate frontend-specific QRT (e.g. accessibility or performance) at this time.

## Additional QA Check Rationale

| QA objective or risk | Additional QA check | Scope | Latest result | Evidence | Limitations or follow-up |
|---|---|---|---|---|---|
| Dependencies with known vulnerabilities may expose the deployed API to avoidable risk. | Automated dependency vulnerability scan (`pip-audit`). | `backend/requirements.txt` (runtime dependencies). | Passing — 0 known vulnerabilities. | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978449) | First run found 9 known CVEs (`fastapi`/`python-dotenv`, transitively `starlette`); fixed by upgrading `fastapi` to 0.138.1 and `python-dotenv` to 1.2.2 (PR #87). |
| Dependencies with known vulnerabilities may expose deployed frontend users to avoidable risk. | Automated dependency vulnerability scan (`npm audit --omit=dev`). | `frontend/package-lock.json` (runtime dependencies). | Passing — 0 known vulnerabilities. | [CI run](https://github.com/Koyash-team/koyash/actions/runs/28328682771/job/83922978406) | New CVEs disclosed after a dependency is pinned will still require manual triage when the scan next reports them. |

## Manual Evidence That Does Not Count as QRT

| Evidence | Scope | Result | Follow-up PBI or issue |
|---|---|---|---|
| UAT-001: questionnaire -> personalized cosmetic bag (in-person customer session, 2026-06-26) | End-to-end happy path via the short questionnaire variant (storytelling variant intermittently failed during this session; both variants share the same matching logic) | Passed. Customer raised an open product question on budget-matching precision and a catalog gap (no low-budget toning product), both correctly handled as an empty step rather than an unsafe substitution. | [reports/week4/customer-review-summary.md](../reports/week4/customer-review-summary.md) action point A2 |
| UAT-002: declared allergens are never recommended (same session) | Allergen hard-filter, shared between both questionnaire variants | Passed. No defect found. | — |
| UAT-003: recommendations reflect declared skin concerns (same session) | Concern-matching justification text | Passed. No defect found. | — |

Full scenario definitions and execution detail: [user-acceptance-tests.md](user-acceptance-tests.md).

## Gates That Continue Into Later Project Work

The lint, type-check, build, unit/integration/QRT test, coverage, and dependency-audit
gates introduced in Assignment 4 for the backend
([PBI-206](https://github.com/Koyash-team/koyash/issues/75),
[PBI-207](https://github.com/Koyash-team/koyash/issues/76),
[PBI-208](https://github.com/Koyash-team/koyash/issues/77)) and for the frontend
([PBI-209](https://github.com/Koyash-team/koyash/issues/78)) are maintained repository
requirements per [Repository_Requirements](Repository_Requirements.md#quality-automation-and-ci).
They are enforced by the `main` branch ruleset (required status checks on all 11 jobs
above) and must keep passing or be replaced with a documented equivalent or stronger
check as the product changes — not disabled or narrowed after submission.
