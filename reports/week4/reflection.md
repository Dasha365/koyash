# Week 4 Reflection

## Learning points

- Quality requirements anchored in real product risk are more defensible than ones that piggyback on gates we had to build anyway. QR-001 (allergen exclusion correctness), QR-002 (fault tolerance / input-space robustness), and QR-003 (`/recommend` latency) each map to a concrete way a real user could be hurt or blocked, rather than to a metric — such as coverage or type-checking — that the team had to produce for other reasons regardless. 322 backend tests and 100% coverage on `recommend.py` took real effort to build, but the result is far easier to justify to the customer than "we measured something."

- A CI gate earns its place in the Definition of Done by what it actually catches, not by being configured. The new `pip-audit` dependency-vulnerability scan found 9 real CVEs in `fastapi`/`python-dotenv` (transitively `starlette`) the very first time it ran, and the team fixed them the same PR — concrete proof this gate is worth keeping permanently, not just as Assignment 4 evidence.

- In-person UAT catches classes of defects that backend tests, by construction, cannot. The recommendation engine itself was already well covered by automated tests by the time of the customer session, but the storytelling-questionnaire-specific frontend path had no coverage of its own — and it was exactly that path that went to a blank screen live, repeatedly, right after the budget/price step, while the short variant kept working throughout. Since both variants share the same matching logic, this confirmed the defect was scoped to one frontend flow, not the recommendation engine — and the team built the missing frontend test coverage (`quizConfig.js`, `Loading.jsx`) right after, specifically by analogy with how the backend's critical module was already tested.

- Vague design feedback costs more round-trips than specific feedback. Shrinking headers and trimming text were quick, low-risk changes the customer approved on sight. The gradient/background request, by contrast, went through several live back-and-forth attempts ("too strong," "too sharp a border," "looks dirty") before converging — and only really landed once the customer sent an actual reference image afterward.

## Validated assumptions

- Skin type as a filtering criterion was worth building now, not deferring — confirmed. Database markup, `RecommendRequest.skin_type`, and segment-aware preference logic all shipped this Sprint, and the customer's only follow-up question was about budget-matching precision in general, not about skin type specifically.

- Rule-based filtering plus the three quality requirements is the right rigor level for this stage of the product — confirmed. The customer approved the Sprint 2 increment at review, and the recommendation-engine UAT scenarios (allergen exclusion, concern-matching) passed clean with no defects found.

- A new CI gate is only worth adding if it's likely to catch something real — confirmed twice over this Sprint: the dependency scan found live CVEs, and frontend lint (newly enabled for the first time) immediately caught 2 real bugs (`process`/`global` undefined in config and test files) that had been sitting in the codebase uncaught simply because frontend lint had never run in CI before.

- A short, non-storytelling questionnaire variant earns its place as a permanent option, not just a fallback — reconfirmed live. When the storytelling flow kept crashing during UAT, switching to `/quick` let the demo continue without losing the session, and the customer didn't perceive this as a downgrade.

## Friction and gaps

- The team walked into the customer session with the frontend openly described as "not yet matching Figma," because the bulk of the week's frontend work (landing page, both questionnaire redesigns, frontend CI) landed in the days immediately after the meeting rather than before it. That ordering meant real, fixable bugs were demoed live instead of caught beforehand — defensible given the Sprint's scope, but worth tightening: front-load the frontend work earlier in the week relative to the review date next time, not after it.

- The landing-page trust copy still repeats the same point twice ("Koyash doesn't create cosmetics" / "we don't produce cosmetics") — the customer flagged this directly in the meeting and offered to send a clearer formulation, but as of the Sprint's end we're still waiting on that reference text.

- We still don't have a shared decision on whether the recommendation engine should fill the bag as close to the budget ceiling as possible, or prioritize full category coverage even under budget — this came up directly from the low-budget "toning" gap the customer hit live, and the customer herself was unsure of the right tradeoff ("I need it to match all the filters... I'm really interested in how you'll approach this").

- The LLM API key and base prompt handoff from the customer (the precondition for starting US-14 / Sprint 3) still has no committed date.

## Planned response

- Sequence frontend delivery earlier in the Sprint relative to the customer-review date, so the team demos work that's already stable rather than work still mid-flight — and if something is still unfinished going into a review, say so up front (as we did) rather than presenting it as done.

- Apply the gradient/background fix using the customer's reference image once it arrives, rather than iterating blind on "softer, more minimalist" again.

- Rework the landing-page trust-copy block as soon as the customer's reference formulation arrives, since this was the one piece of feedback she called "one hundred percent to change."

- Decide on the budget-matching policy (ceiling-proximity vs. category coverage) as a team, document it against the low-budget "toning" gap specifically, and bring a concrete proposal back to the customer rather than leaving the boundary open.

- Ask the customer for a committed date for the LLM API key and base prompt, so Sprint 3 has a real, trackable start condition instead of an open dependency.

- Carry the three QR/QRT pairs, both dependency-vulnerability scans (backend `pip-audit`, frontend `npm audit`), and the 11-job CI ruleset forward as permanent Definition of Done items, not one-time Assignment 4 evidence — and extend the "test the critical module first" pattern used for `recommend.py` and `quizConfig.js`/`Loading.jsx` to the remaining untested frontend screens next.
