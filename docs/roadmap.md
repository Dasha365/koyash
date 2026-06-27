# Roadmap

Sprint-by-Sprint delivery plan. For story-level detail, current status, and acceptance criteria, see the issue tracker and [docs/user-stories.md](user-stories.md) — this file only summarizes intent and links out.

## Sprint 1 — Core recommendation happy path

- **Milestone:** [Sprint 1](https://github.com/Dasha365/koyash/milestone/1)
- **Dates:** 2026-06-15 – 2026-06-21
- **Sprint Goal:** Deliver the core recommendation happy path — a guided questionnaire (budget, ethical preferences, allergen exclusion, skin concerns) producing a structured cosmetic bag of real products with per-item justification, deployed and ready for customer review. This is the MVP v1 increment.
- **Focus:** Ship the `/recommend` backend end-to-end, then build the questionnaire and results frontend on top of it.
- **Planned items:**
  - User stories: [US-02](https://github.com/Koyash-team/koyash/issues/6), [US-03](https://github.com/Koyash-team/koyash/issues/7), [US-04](https://github.com/Koyash-team/koyash/issues/8), [US-05](https://github.com/Koyash-team/koyash/issues/9), [US-06](https://github.com/Koyash-team/koyash/issues/10), [US-07](https://github.com/Koyash-team/koyash/issues/11), [US-08](https://github.com/Koyash-team/koyash/issues/12), [US-17](https://github.com/Koyash-team/koyash/issues/21)
  - Backend: [PBI-101](https://github.com/Koyash-team/koyash/issues/24), [PBI-102](https://github.com/Koyash-team/koyash/issues/25), [PBI-103](https://github.com/Koyash-team/koyash/issues/30), [PBI-104](https://github.com/Koyash-team/koyash/issues/32)
  - Frontend: [PBI-107](https://github.com/Koyash-team/koyash/issues/38) (decomposed into [PBI-110](https://github.com/Koyash-team/koyash/issues/44)–[PBI-117](https://github.com/Koyash-team/koyash/issues/51)), [PBI-108](https://github.com/Koyash-team/koyash/issues/39), [PBI-116](https://github.com/Koyash-team/koyash/issues/50)
  - Docs & process: [PBI-105](https://github.com/Koyash-team/koyash/issues/34), [PBI-106](https://github.com/Koyash-team/koyash/issues/35), [PBI-109](https://github.com/Koyash-team/koyash/issues/41)

## Sprint 2 — Polish the MVP, personalize by skin type, raise quality and automation

- **Milestone:** [Sprint 2](https://github.com/Dasha365/koyash/milestone/2)
- **Dates:** 2026-06-22 – 2026-06-28 (Mon–Sun)
- **Sprint Goal:** Polish the MVP for real customer use: apply the customer's requested design and copy changes on the frontend, add automated tests for the product-recommendation (matching) logic and fix any defects they surface, and extend the recommendation engine with skin type as a new filtering criterion (database markup, questionnaire step, and matching logic).
- **Focus:** Customer-feedback-driven design/copy fixes, skin-type personalization, a short non-storytelling questionnaire variant, automated testing of the recommendation engine, and the Assignment 4 quality/automation baseline (Quality Requirements, QRTs, CI gates, Definition of Done, testing and UAT docs).
- **Planned items:**
  - User stories: [US-01](https://github.com/Koyash-team/koyash/issues/5) (landing page), [US-09](https://github.com/Koyash-team/koyash/issues/13) (skin type), [US-18](https://github.com/Koyash-team/koyash/issues/69) (short questionnaire variant)
  - Skin type: [PBI-201](https://github.com/Koyash-team/koyash/issues/70), [PBI-202](https://github.com/Koyash-team/koyash/issues/71)
  - Design/frontend: [PBI-203](https://github.com/Koyash-team/koyash/issues/72), [PBI-204](https://github.com/Koyash-team/koyash/issues/73), [PBI-205](https://github.com/Koyash-team/koyash/issues/74)
  - Testing and quality automation: [PBI-206](https://github.com/Koyash-team/koyash/issues/75), [PBI-207](https://github.com/Koyash-team/koyash/issues/76), [PBI-208](https://github.com/Koyash-team/koyash/issues/77), [PBI-209](https://github.com/Koyash-team/koyash/issues/78), [PBI-210](https://github.com/Koyash-team/koyash/issues/79), [PBI-211](https://github.com/Koyash-team/koyash/issues/80), [PBI-212](https://github.com/Koyash-team/koyash/issues/81)

## Sprint 3 — LLM-based reasoning (direction)

- **Milestone:** *(milestone to be created)*
- **Dates:** 2026-06-29 – 2026-07-05 *(tentative)*
- **Sprint Goal:** Replace structural justifications with LLM-generated reasoning and ingredient analysis over the already-filtered candidates, improving explanation depth without changing the rule-based selection. *(direction — to be refined)*
- **Focus:** Introduce the LLM phase on top of the existing rule-based engine; the customer provides the model and prompt at the start of this stage.
- **Planned items (directional):** [US-14](https://github.com/Koyash-team/koyash/issues/18) (deeper LLM justification & ingredient analysis), [US-11](https://github.com/Koyash-team/koyash/issues/15) (irritant warning — flagged as an LLM story).

## Beyond Sprint 3 (direction, not yet scheduled)

Full authentication, saved cosmetic-bag history with lightweight "worked / didn't work" feedback ([US-12](https://github.com/Koyash-team/koyash/issues/16), [US-13](https://github.com/Koyash-team/koyash/issues/17)), and a mobile version. These keep their product-level priority in the backlog and will be scheduled into a Sprint as capacity allows.
