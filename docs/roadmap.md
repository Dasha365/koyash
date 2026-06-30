# Roadmap

Sprint-by-Sprint delivery plan. For story-level detail, current status, and acceptance criteria, see the issue tracker and [docs/user-stories.md](user-stories.md) — this file only summarizes intent and links out.

## Sprint 1 — Core recommendation happy path

- **Milestone:** [Sprint 1](https://github.com/Koyash-team/koyash/milestone/1)
- **Dates:** 2026-06-15 – 2026-06-21
- **Sprint Goal:** Deliver the core recommendation happy path — a guided questionnaire (budget, ethical preferences, allergen exclusion, skin concerns) producing a structured cosmetic bag of real products with per-item justification, deployed and ready for customer review. This is the MVP v1 increment.
- **Focus:** Ship the `/recommend` backend end-to-end, then build the questionnaire and results frontend on top of it.
- **Planned items:**
  - User stories: [US-02](https://github.com/Koyash-team/koyash/issues/6), [US-03](https://github.com/Koyash-team/koyash/issues/7), [US-04](https://github.com/Koyash-team/koyash/issues/8), [US-05](https://github.com/Koyash-team/koyash/issues/9), [US-06](https://github.com/Koyash-team/koyash/issues/10), [US-07](https://github.com/Koyash-team/koyash/issues/11), [US-08](https://github.com/Koyash-team/koyash/issues/12), [US-17](https://github.com/Koyash-team/koyash/issues/21)
  - Backend: [PBI-101](https://github.com/Koyash-team/koyash/issues/24), [PBI-102](https://github.com/Koyash-team/koyash/issues/25), [PBI-103](https://github.com/Koyash-team/koyash/issues/30), [PBI-104](https://github.com/Koyash-team/koyash/issues/32)
  - Frontend: [PBI-107](https://github.com/Koyash-team/koyash/issues/38) (decomposed into [PBI-110](https://github.com/Koyash-team/koyash/issues/44)–[PBI-117](https://github.com/Koyash-team/koyash/issues/51)), [PBI-108](https://github.com/Koyash-team/koyash/issues/39), [PBI-116](https://github.com/Koyash-team/koyash/issues/50)
  - Docs & process: [PBI-105](https://github.com/Koyash-team/koyash/issues/34), [PBI-106](https://github.com/Koyash-team/koyash/issues/35), [PBI-109](https://github.com/Koyash-team/koyash/issues/41)

## Sprint 2 — Polish the MVP, personalize by skin type, raise quality and automation

- **Milestone:** [Sprint 2](https://github.com/Koyash-team/koyash/milestone/2)
- **Dates:** 2026-06-22 – 2026-06-28 (Mon–Sun)
- **Sprint Goal:** Polish the MVP for real customer use: apply the customer's requested design and copy changes on the frontend, add automated tests for the product-recommendation (matching) logic and fix any defects they surface, and extend the recommendation engine with skin type as a new filtering criterion (database markup, questionnaire step, and matching logic).
- **Focus:** Customer-feedback-driven design/copy fixes, skin-type personalization, a short non-storytelling questionnaire variant, automated testing of the recommendation engine, and the Assignment 4 quality/automation baseline (Quality Requirements, QRTs, CI gates, Definition of Done, testing and UAT docs).
- **Planned items:**
  - User stories: [US-01](https://github.com/Koyash-team/koyash/issues/5) (landing page), [US-09](https://github.com/Koyash-team/koyash/issues/13) (skin type), [US-18](https://github.com/Koyash-team/koyash/issues/69) (short questionnaire variant)
  - Skin type: [PBI-201](https://github.com/Koyash-team/koyash/issues/70), [PBI-202](https://github.com/Koyash-team/koyash/issues/71)
  - Design/frontend: [PBI-203](https://github.com/Koyash-team/koyash/issues/72), [PBI-204](https://github.com/Koyash-team/koyash/issues/73), [PBI-205](https://github.com/Koyash-team/koyash/issues/74)
  - Testing and quality automation: [PBI-206](https://github.com/Koyash-team/koyash/issues/75), [PBI-207](https://github.com/Koyash-team/koyash/issues/76), [PBI-208](https://github.com/Koyash-team/koyash/issues/77), [PBI-209](https://github.com/Koyash-team/koyash/issues/78), [PBI-210](https://github.com/Koyash-team/koyash/issues/79), [PBI-211](https://github.com/Koyash-team/koyash/issues/80), [PBI-212](https://github.com/Koyash-team/koyash/issues/81)

## Sprint 3 — MVP v2: more accurate, more personal, better explained

- **Milestone:** [Sprint 3](https://github.com/Koyash-team/koyash/milestone/3)
- **Dates:** 2026-06-29 – 2026-07-05 (Mon–Sun)
- **Sprint Goal:** Make the assembled cosmetic bag reliably fall within the user's selected budget range; let users who don't know their skin type get a personalized result through a short skin-type mini-quiz; integrate LLM-generated justifications for the recommended products; and apply the customer's design and copy feedback. In parallel, document the product architecture (static/dynamic/deployment views and ADRs) and the development process.
- **Focus:** Customer-feedback-driven product improvements (budget precision, design/copy), the skin-type mini-quiz, LLM justifications (justification-only — model and prompt provided by the customer), and the Assignment 5 maintained documentation (architecture, ADRs, development process, hosted docs).
- **Delivered increment:** MVP v2, mapped to release `v1.2.0`.
- **Planned items:**
  - User stories: [US-19](https://github.com/Koyash-team/koyash/issues/101) (skin-type mini-quiz), [US-14](https://github.com/Koyash-team/koyash/issues/18) (LLM justification)
  - Product: [PBI-301](https://github.com/Koyash-team/koyash/issues/102) (mini-quiz), [PBI-302](https://github.com/Koyash-team/koyash/issues/103) (budget precision), [PBI-303](https://github.com/Koyash-team/koyash/issues/104) (LLM justifications), [PBI-304](https://github.com/Koyash-team/koyash/issues/105) (design/copy polish)
  - Architecture & process: [PBI-305](https://github.com/Koyash-team/koyash/issues/106)–[PBI-308](https://github.com/Koyash-team/koyash/issues/109) (static/dynamic/deployment views, ADRs), [PBI-309](https://github.com/Koyash-team/koyash/issues/110) (development process), [PBI-310](https://github.com/Koyash-team/koyash/issues/111) (hosted docs), [PBI-311](https://github.com/Koyash-team/koyash/issues/112) (tests, UATs, Definition of Done)

## Sprint 4 and beyond (direction, not yet scheduled)

- **Sprint 4 (next):** personal account, authentication, and saved cosmetic-bag history with lightweight "worked / didn't work" feedback ([US-12](https://github.com/Koyash-team/koyash/issues/16), [US-13](https://github.com/Koyash-team/koyash/issues/17)) — deferred from Sprint 3 to keep MVP v2 focused. The customer prefers account data stored in a database and explicitly not Outlook for authentication.
- **Backlog / later:** product photo on each card ([US-10](https://github.com/Koyash-team/koyash/issues/14)); irritant warning ([US-11](https://github.com/Koyash-team/koyash/issues/15)) — deferred pending a separate customer decision about letting the LLM reason about ingredients (out of scope for the current justification-only LLM); a mobile version.

## Continuing work (maintained across Sprints)

The architecture documentation and ADRs, quality requirements and quality requirement tests, CI quality gates, Definition of Done, and the hosted documentation site introduced or maintained in Assignments 4–5 are maintained assets. Later Sprints must keep them current as product scope, architecture, deployment model, or workflow change.
