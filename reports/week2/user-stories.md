# User Stories

**Priority scope:** MoSCoW priorities reflect priority across the whole course product. The small subset selected to build first is listed under *Initial proposed MVP v1 scope*; post-MVP stories keep their product-level priority and are flagged as post-MVP in their notes.

## Personas
 
- **Overwhelmed chooser** — primary audience (women ~22–35, mid-to-high income) who value science and evidence, are tired of marketing promises, and want a trustworthy expert. Suffers from information overload and fear of choosing wrong.
- **Problem-solver** — a user with a specific skin concern (e.g. acne) who wants to solve it rather than buy another ineffective product.
- **Ethically-driven user** — a user with clear ethical principles (vegan / cruelty-free) who wants recommendations to lean toward what matters to them.
- **Returning user** — a user who comes back to revisit a saved cosmetic bag and track how their skin responded over time.
---
 
## US-01: Build trust on the landing page
 
**Requirement Status:** Active

**MoSCoW priority:** Must Have
 
As an overwhelmed chooser,
I want to quickly understand on the landing page what KOYASH is and why I can trust it,
so that I feel confident enough to start the selection.
 
### Notes and constraints
 
The landing page is a selling page, not an intro story; price is not shown there. Trust is built on independence from manufacturers and a verifiable, science-grounded approach. Deprioritized for the first working version after customer review, so it is not part of the initial proposed MVP v1 scope, though it remains a Must Have for the full course product.
 
---
 
## US-02: Complete a step-by-step questionnaire in a storytelling format
 
**Requirement Status:** Active

**MoSCoW priority:** Must Have
 
As an overwhelmed chooser,
I want to answer questions about my skin, budget, allergies, and preferences in a warm, narrative flow rather than a dry form,
so that I do not feel interrogated or under pressure.
 
### Notes and constraints
 
Reworded after customer review: the narrative flow serves the experience (not feeling pressured) and is decoupled from recommendation quality, which is owned by the filtering logic. Step-by-step, one decision per screen. The questionnaire should briefly explain why a question is asked.
 
---
 
## US-03: Enter budget through a controlled input
 
**Requirement Status:** Active

**MoSCoW priority:** Must Have
 
As an overwhelmed chooser,
I want to set my budget by choosing a segment (or a stepped slider) rather than entering an arbitrary amount,
so that the system can filter according to my needs.
 
### Notes and constraints
 
Three segments — budget / mid / high — or a stepped slider; no free-form amount. At the meeting the customer leaned toward a simple numeric input validated to digits-only on the backend. If no products match the budget, fall back to the minimum available price and inform the user. The high segment has only 3 products, so demos run on the budget and mid segments.
 
---
 
## US-04: Receive a personal cosmetic bag with real products
 
**Requirement Status:** Active

**MoSCoW priority:** Must Have
 
As an overwhelmed chooser,
I want to receive a cosmetic bag of matching products selected from a real, existing catalog,
so that I get a concrete, ready-to-use set instead of a vague list of advice.
 
### Notes and constraints
 
Reinforced after customer review to emphasize selection from the real 69-item catalog, avoiding hallucinated or non-existent products. Rule-based filtering only; no LLM in MVP. Returns 5–10 products (~7).
 
---
 
## US-05: See a clear justification for every recommended product
 
**Requirement Status:** Active

**MoSCoW priority:** Must Have
 
As an overwhelmed chooser,
I want each recommended product to come with a short justification of why it was chosen for me,
so that I can make an informed decision and trust the service's expertise, without feeling pushed to buy.
 
### Notes and constraints
 
The justification is mandatory — it is the core value of the product; a bag without per-product reasoning is not acceptable. The justification must reference the user's own profile — e.g. "suits your dry skin and your budget," not a generic "this is a good cream." In MVP the reasoning is structural, built from dataset fields; richer LLM-based reasoning comes later (US-14).
 
---
 
## US-06: See the cosmetic bag grouped by order of use
 
**Requirement Status:** Active

**MoSCoW priority:** Must Have
 
As an overwhelmed chooser,
I want the products grouped and ordered by the order of application (cleansing → … → SPF),
so that I know how to actually carry out the care routine.
 
### Notes and constraints
 
Application order: cleansing → toner → serum → moisturizer → SPF. Backed by derived data fields (`routine_step`, `order_index`).
 
---
 
## US-07: Express my ethical principles and values
 
**Requirement Status:** Active

**MoSCoW priority:** Must Have
 
As an ethically-driven user,
I want to express values such as vegan / cruelty-free,
so that recommendations lean toward what matters to me where possible.
 
### Notes and constraints
 
Persona changed after customer review from "overwhelmed chooser" to "ethically-driven user," since this is a values motivation, not a choice-overload one. Backed by the `vegan` and `cruelty_free` fields.
 
---
 
## US-08: Exclude my allergens as a strict filter
 
**Requirement Status:** Active

**MoSCoW priority:** Must Have
 
As a problem-solver,
I want products containing my declared allergens to be strictly excluded,
so that nothing that could harm my skin is recommended to me.
 
### Notes and constraints
 
Strict exclusion. Backed by the `allergens` field.
 
---
 
## US-09: Account for my skin type
 
**Requirement Status:** Active

**MoSCoW priority:** Should Have
 
As a problem-solver,
I want my skin type to be taken into account during selection,
so that products fit how my skin actually behaves.
 
### Notes and constraints
 
`skintype` is empty across all 69 products. The customer confirmed US-09 stays Should Have until the `skintype` markup is completed; the team may populate it. Not part of the initial proposed MVP v1 scope.
 
---
 
## US-10: See a product photo on each card
 
**Requirement Status:** Active

**MoSCoW priority:** Could Have
 
As an overwhelmed chooser,
I want to see a photo of each recommended product,
so that I can recognize it.
 
### Notes and constraints
 
The customer was ambivalent: photo quality across ~70 products is inconsistent. Optional and low priority.
 
---
 
## US-11: Get a warning about a potential irritant in a suitable product
 
**Requirement Status:** Active

**MoSCoW priority:** Should Have
 
As a problem-solver,
I want a warning when a recommended product fits my needs but contains a potential irritant I did not declare,
so that I can make an informed choice rather than being exposed blindly.
 
### Notes and constraints
 
The customer agreed it is better to flag this on the card, but noted it is "more of an LLM story," so it most likely lands in the LLM phase rather than MVP.
 
---
 
## US-12: Save my cosmetic bag to history
 
**Requirement Status:** Active

**MoSCoW priority:** Should Have
 
As a returning user,
I want to save the cosmetic bag I received,
so that I can return to it later instead of filling out the questionnaire again.
 
### Notes and constraints
 
Post-MVP. A real database is kept already in MVP, but history and personal-account storage come after MVP.
 
---
 
## US-13: Leave "worked / didn't work" feedback on products

**Requirement Status:** Active

**MoSCoW priority:** Should Have

As a returning user,
I want to mark whether the recommended products worked or did not work for me,
so that my next cosmetic bag is improved based on that feedback.

### Notes and constraints

Reworded after customer review. ТЗ 7.4 forbids progress mechanics, counters, and streaks (to avoid a "duolingo trap"), so this is lightweight "worked / didn't work" feedback that improves the next recommendation — not a progress dashboard. Post-MVP.
 
---
 
## US-14: Get deeper LLM-based justification and ingredient analysis
 
**Requirement Status:** Active

**MoSCoW priority:** Should Have
 
As an overwhelmed chooser,
I want a deeper explanation that analyzes ingredients and incompatibilities,
so that I get expert reasoning beyond the structural justification.
 
### Notes and constraints
 
Post-MVP LLM phase. The customer will provide the model and prompt at the start of the LLM stage.
 
---
 
## US-15: Pay for premium features / paid expert consultations
 
**Requirement Status:** Active

**MoSCoW priority:** Won't Have
 
As an overwhelmed chooser,
I want to pay for premium features or a paid consultation,
so that I can get deeper help.
 
### Notes and constraints
 
Excluded from the course scope: payments and subscriptions are explicitly out of project scope. Kept as a valid future requirement.
 
---
 
## US-16: Get product recommendations from a photo of my skin
 
**Requirement Status:** Active

**MoSCoW priority:** Won't Have
 
As a problem-solver,
I want to upload a photo of my skin and get recommendations from it,
so that I don't have to describe my skin myself.
 
### Notes and constraints
 
Excluded from the course scope: photo-based skin analysis is explicitly out of project scope. Kept as a valid future requirement.
 
---
 
## Initial proposed MVP v1 scope
 
US-02, US-03, US-04, US-05, US-06, US-07, US-08
 
All selected stories are Must Have. The scope was narrowed after the customer review by dropping US-01 (landing page), which the customer deprioritized for the first working version. It represents the core recommendation happy path: a guided questionnaire (US-02) with controlled budget input (US-03), strict allergen exclusion (US-08) and soft ethical preferences (US-07), producing an ordered cosmetic bag of real products (US-04, US-06), each with a justification (US-05).

