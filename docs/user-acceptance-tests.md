# User Acceptance Tests

End-user-facing UAT scenarios for KOYASH, following
[Process Requirements](Process_Requirements.md#user-acceptance-tests) (stable
`UAT-NNN` IDs, status, execution history).

## UAT-001: Complete the questionnaire and receive a personalized cosmetic bag

**Status:** Active

**User goal:** As a new user, I want to answer the guided questionnaire and receive a
structured, justified cosmetic bag, so that I can trust the recommendation enough to
act on it.

**Preconditions:** The deployed app (frontend + backend) is reachable; no account is
required.

**Steps:**
1. Open the deployed app.
2. Go through the questionnaire: skin type, concerns, budget, allergies, values (vegan,
   cruelty-free, minimalism).
3. Submit and view the results screen.

**Expected outcome:** The user receives an ordered cosmetic bag (cleanse → tone → serum
→ moisturize → spf, plus any occasional steps such as exfoliant/mask) with a
justification shown for each product and the total price.

**Execution results (2026-06-26, in-person customer session):** Passed. Executed via
the short (non-storytelling) questionnaire variant — the storytelling variant
intermittently failed (blank screen) partway through the flow during this session, so
the team switched to the short variant for the remainder of the demo. Both variants
share identical questions and matching logic, so this is valid evidence for the
underlying recommendation engine regardless of which questionnaire UI was used.

**Customer comments / observed issues:** Raised a product question on how precisely
the assembled bag should match the selected budget (fill close to the budget ceiling
vs. prioritize full category coverage); no defect, a product decision still pending.
Also surfaced a catalog gap: no low-budget product for the "toning" step, correctly
reported as an empty step rather than filled incorrectly.

**Resulting PBIs or issues:** Budget-matching-precision and toning catalog-gap
decisions are tracked as open action items (see
[reports/week4/customer-review-summary.md](../reports/week4/customer-review-summary.md),
action point A2) pending a product decision before being filed as a PBI.

## UAT-002: Declared allergens are never recommended

**Status:** Active

**User goal:** As a user with an allergy, I want products containing my declared
allergen to be excluded, so that nothing recommended can harm my skin.

**Preconditions:** Same as UAT-001; the tester knows at least one allergen present in
the catalog (e.g. Fragrance).

**Steps:**
1. Complete the questionnaire, declaring a specific allergen (e.g. Fragrance) in the
   allergens step.
2. Submit and review the resulting bag.

**Expected outcome:** None of the recommended products are associated with the declared
allergen. If a step has no safe candidate, that step is dropped from the bag rather than
filled with an unsafe product — the omission is reflected in the results note (e.g. "Нет
товаров для шагов: …"), without naming the allergen as the cause. 

**Execution results (2026-06-26, in-person customer session):** Passed. Executed via
the short questionnaire variant for the same reason noted under UAT-001 (the
storytelling variant was intermittently failing during this session); the allergen
hard-filter logic is shared between both variants.

**Customer comments / observed issues:** None specific to allergen handling.

**Resulting PBIs or issues:** None — no defect found in this scenario.

## UAT-003: Recommendations reflect declared skin concerns

**Status:** Active

**User goal:** As a user with specific skin concerns (e.g. acne, dryness), I want the
recommended products to address those concerns where possible, so that the routine
feels tailored rather than generic.

**Preconditions:** Same as UAT-001; the tester selects two or more concerns during the
questionnaire.

**Steps:**
1. Complete the questionnaire, declaring two or more skin concerns.
2. Review the justification text for each recommended product.

**Expected outcome:** Each step's chosen product's justification mentions addressing at
least one declared concern where a matching candidate existed for that step. Steps with
no concern-matching candidate still return a product chosen by routine role and price,
not an empty result without explanation.

**Execution results (2026-06-26, in-person customer session):** Passed. Confirmed
working during the same multi-pass questionnaire walkthrough as UAT-001/UAT-002.

**Customer comments / observed issues:** None specific to concern-matching.

**Resulting PBIs or issues:** None — no defect found in this scenario.
