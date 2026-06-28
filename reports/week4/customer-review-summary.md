# Customer Review Summary — Sprint 2 (Assignment 4)

**Date:** 2026-06-26
**Participants (roles):** Customer; Team — Team Lead, Backend, Frontend (×2), UX/UI.
**Related evidence:** [customer-review-transcript.md](customer-review-transcript.md)
· [docs/user-acceptance-tests.md](../../docs/user-acceptance-tests.md)
· [docs/roadmap.md](../../docs/roadmap.md)

---

## Sprint Goal reviewed

Polish the MVP for real customer use: apply the customer's requested design and copy
changes on the frontend, add automated tests for the product-recommendation logic and
fix any defects they surface, and extend the recommendation engine with skin type as a
new filtering criterion.

## Delivered increment discussed

- MVP finalized with the customer's prior design/copy feedback, shown locally on the
  frontend (not yet committed/deployed).
- Automated tests added for the product-filtering/recommendation logic.
- Skin type added to the product catalog and taken into account during filtering.
- The new short, non-storytelling questionnaire variant (alongside the existing
  storytelling flow), sharing identical questions and matching logic with the
  storytelling version.

## UAT results

The meeting was held in person. The customer executed the three active UAT scenarios live during the meeting.

- **Questionnaire → personalized cosmetic bag** and **allergen exclusion**: confirmed
  working, completed via the short (non-storytelling) questionnaire variant. Since the
  short and storytelling variants share identical questions and matching logic, this
  exercises the same underlying recommendation engine — the core acceptance criteria are
  verified independent of which questionnaire UI was used.
- **Storytelling variant — isolated frontend defect found:** the storytelling
  (long-form) questionnaire intermittently failed (blank screen) partway through the
  flow, after the budget/price step, on repeated attempts. The short variant was
  unaffected throughout. Because the matching logic is shared between variants, this
  defect is scoped to the storytelling UI flow specifically, not the recommendation
  engine. Workaround used during the meeting: continued the demo on the short variant.
- A product-catalog gap was also found: the low-budget segment has no product for the
  "toning" step, so that step is correctly reported as empty rather than filled
  incorrectly — confirmed as expected behavior, not a defect, but flagged for catalog
  follow-up (see Action points).
- The customer also raised how closely the assembled bag should match the selected
  budget: whether the engine should aim to fill it as close to the budget ceiling as
  possible, or prioritize full category coverage even if that means staying further
  under budget. No decision was made; the team needs to think through where to set
  these boundaries.

## Quality evidence discussed

Briefly — in the opening recap, the team told the customer that automated tests had
been added for the product-filtering/recommendation logic this Sprint. This was not
discussed in further technical depth (no QR/QRT/coverage specifics were walked
through).

## Approvals

- Overall Sprint progress and direction: positively received; no scope rejected.
- Short-variant UI direction (logo placement, reduced on-screen text) and the
  short-questionnaire concept overall: approved, with refinement notes (see below).

## Requested changes (design and copy)

- Landing page trust-copy repeats the same point twice ("Koyash doesn't create
  cosmetics" / "we don't produce cosmetics"); customer will send a clearer reference
  formulation for why the user should trust Koyash.
- Gradient/background: current version too strong/sharp with a visible border; customer
  prefers a softer, borderless, more minimalist treatment and shared a reference image.
- Brushstroke graphic style does not feel cohesive with the "Enter History" element;
  consider redoing or removing it.
- Story slides: reduce text per slide (currently feels dense); keep the tips. Decide
  between logo-on-top vs. no-logo (customer leans toward keeping a small logo for
  screenshot-sharing) and shrink the top banner area regardless.
- Short questionnaire: remove extra text/solid block, keep just the question and answer
  options, shrink the top area, no need to keep it static — fine for it to disappear on
  scroll.
- Cosmetic-bag results section: also reduce/shrink top area; consider adding an
  account-login button there since the space otherwise feels empty.
- Tone of voice: open question on formal vs. informal address ("you" forms); customer
  will research this rather than decide from personal preference alone. Also suggested
  asking the user's gender up front, since current copy assumes a feminine address.
- Possible future scope: an account system was discussed (customer prefers data stored
  in a database; explicitly do not use Outlook for authentication) — not yet a committed
  PBI, needs backlog refinement.

## Action points

| ID | Action | Owner | Target |
| :-: | :-- | :-- | :-- |
| A1 | Fix the storytelling-variant blank-screen defect (after the budget/price step) — **Fixed** same day, following the meeting | Frontend | Done |
| A2 | Review the low-budget "toning" catalog gap and the budget-matching-precision question; decide whether to expand catalog coverage, adjust matching boundaries, or keep current behavior | Backend / Product | TBD |
| A3 | Rework landing-page trust copy once the customer sends a reference formulation | UX / copy | Sprint 2 (this week) |
| A4 | Iterate the landing-page gradient/background toward a softer, borderless, minimalist version | UX / Frontend | Sprint 3 (next week) |
| A5 | Revisit the brushstroke graphic style for cohesion with "Enter History" | UX | Sprint 3 (next week) |
| A6 | Reduce text density on story slides; resolve logo-on-top vs. no-logo and shrink the top banner | Frontend / UX | Sprint 3 (next week) |
| A7 | Finish trimming the short questionnaire UI (remove extra text/solid block, shrink top area) | Frontend | Sprint 3 (next week) |
| A8 | Adjust cosmetic-bag results section (shrink top area, consider account-login button placement) | Frontend / UX | Sprint 3 (next week) |
| A9 | Research formal/informal tone of voice and gender-assumption question | UX / copy (customer to share research) | Sprint 3 (next week) |

## Risks

- Budget-matching boundaries (precision vs. category coverage) are not yet decided —
  could affect both the recommendation engine and customer expectations if left
  ambiguous.
- Account-system scope (if pursued) is a non-trivial new feature area, not yet sized or
  refined in the backlog.

## Resulting Product Backlog / scope changes

- Design/copy follow-ups (A3–A9) feed into the existing design-feedback track
  ([PBI-204](https://github.com/Koyash-team/koyash/issues/73)) or need new linked PBIs
  where they go beyond its current scope.
- Catalog gap and budget-matching-precision question (A2) need a decision before they
  become a tracked PBI.
- Account system (mentioned, not committed): candidate for future backlog refinement,
  not added to Sprint 2 scope.
