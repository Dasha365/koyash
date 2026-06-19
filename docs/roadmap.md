# Roadmap

Sprint-by-Sprint delivery plan. For story-level detail, current status, and acceptance criteria, see the issue tracker and [docs/user-stories.md](user-stories.md) — this file only summarizes intent and links out.

## Sprint 1 — Core recommendation happy path

- **Milestone:** [Sprint 1](https://github.com/Dasha365/koyash/milestone/1)
- **Dates:** 2026-06-15 – 2026-06-21
- **Sprint Goal:** Deliver the core recommendation happy path — a guided questionnaire (budget, ethical preferences, allergen exclusion, skin concerns) producing a structured cosmetic bag of real products with per-item justification, deployed and ready for customer review. This is the MVP v1 increment.
- **Focus:** Ship the `/recommend` backend end-to-end, then build the questionnaire and results frontend on top of it.
- **Planned items:**
  - User stories: [US-02](https://github.com/Dasha365/koyash/issues/6), [US-03](https://github.com/Dasha365/koyash/issues/7), [US-04](https://github.com/Dasha365/koyash/issues/8), [US-05](https://github.com/Dasha365/koyash/issues/9), [US-06](https://github.com/Dasha365/koyash/issues/10), [US-07](https://github.com/Dasha365/koyash/issues/11), [US-08](https://github.com/Dasha365/koyash/issues/12), [US-17](https://github.com/Dasha365/koyash/issues/21)
  - Backend: [PBI-101](https://github.com/Dasha365/koyash/issues/24), [PBI-102](https://github.com/Dasha365/koyash/issues/25), [PBI-103](https://github.com/Dasha365/koyash/issues/30), [PBI-104](https://github.com/Dasha365/koyash/issues/32)
  - Frontend: [PBI-107](https://github.com/Dasha365/koyash/issues/38) (decomposed into [PBI-110](https://github.com/Dasha365/koyash/issues/44)–[PBI-117](https://github.com/Dasha365/koyash/issues/51)), [PBI-108](https://github.com/Dasha365/koyash/issues/39), [PBI-116](https://github.com/Dasha365/koyash/issues/50)
  - Docs & process: [PBI-105](https://github.com/Dasha365/koyash/issues/34), [PBI-106](https://github.com/Dasha365/koyash/issues/35), [PBI-109](https://github.com/Dasha365/koyash/issues/41)

## Sprint 2 — Complete the MVP and personalize by skin type

- **Milestone:** Sprint 2 *(milestone to be created)*
- **Dates:** 2026-06-22 – 2026-06-28 *(planned, Mon–Sun cadence)*
- **Sprint Goal:** Make the MVP v1 flow robust for live use, personalize recommendations by skin type once the `skintype` data is populated, and deliver the selling landing page that brings users into the selection. *(draft — confirm at Sprint Planning)*
- **Focus:** Harden the rule-based flow against edge cases, extend personalization with skin type, and add the deferred landing page.
- **Planned items** *(issue links to be added when assigned to the milestone)*:
  - User stories: [US-09](https://github.com/Dasha365/koyash/issues/13) (account for skin type), [US-01](https://github.com/Dasha365/koyash/issues/5) (landing page)
  - Supporting PBIs (to refine): populate `skintype` markup for the 69 products (DB task); integrate skin-type as a selection signal; frozen allergen controlled vocabulary + checklist UI + patch-test disclaimer; edge-case handling (empty core step, high-segment fallback).

## Sprint 3 — LLM-based reasoning (direction)

- **Milestone:** *(milestone to be created)*
- **Dates:** 2026-06-29 – 2026-07-05 *(tentative)*
- **Sprint Goal:** Replace structural justifications with LLM-generated reasoning and ingredient analysis over the already-filtered candidates, improving explanation depth without changing the rule-based selection. *(direction — to be refined)*
- **Focus:** Introduce the LLM phase on top of the existing rule-based engine; the customer provides the model and prompt at the start of this stage.
- **Planned items (directional):** [US-14](https://github.com/Dasha365/koyash/issues/18) (deeper LLM justification & ingredient analysis), [US-11](https://github.com/Dasha365/koyash/issues/15) (irritant warning — flagged as an LLM story).

## Beyond Sprint 3 (direction, not yet scheduled)

Full authentication, saved cosmetic-bag history with lightweight "worked / didn't work" feedback ([US-12](https://github.com/Dasha365/koyash/issues/16), [US-13](https://github.com/Dasha365/koyash/issues/17)), and a mobile version. These keep their product-level priority in the backlog and will be scheduled into a Sprint as capacity allows.
