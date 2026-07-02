# User Story Index

| ID | Short title | MoSCoW priority | Issue | Requirement status | Work Status | Sprint |
|---|---|---|---|---|---|---|
| US-02 | Complete a step-by-step questionnaire in a storytelling format | Must Have | [#6](https://github.com/Koyash-team/koyash/issues/6) | Active | Done | [Sprint 1](https://github.com/Koyash-team/koyash/milestone/1) |
| US-03 | Enter budget through a controlled input | Must Have | [#7](https://github.com/Koyash-team/koyash/issues/7) | Active | Done | [Sprint 1](https://github.com/Koyash-team/koyash/milestone/1) |
| US-04 | Receive a personal cosmetic bag with real products | Must Have | [#8](https://github.com/Koyash-team/koyash/issues/8) | Active | Done | [Sprint 1](https://github.com/Koyash-team/koyash/milestone/1) |
| US-05 | See a clear justification for every recommended product | Must Have | [#9](https://github.com/Koyash-team/koyash/issues/9) | Active | Done | [Sprint 1](https://github.com/Koyash-team/koyash/milestone/1) |
| US-06 | See the cosmetic bag grouped by order of use | Must Have | [#10](https://github.com/Koyash-team/koyash/issues/10) | Active | Done | [Sprint 1](https://github.com/Koyash-team/koyash/milestone/1) |
| US-07 | Express my ethical principles and values | Must Have | [#11](https://github.com/Koyash-team/koyash/issues/11) | Active | Done | [Sprint 1](https://github.com/Koyash-team/koyash/milestone/1) |
| US-08 | Exclude my allergens as a strict filter | Must Have | [#12](https://github.com/Koyash-team/koyash/issues/12) | Active | Done | [Sprint 1](https://github.com/Koyash-team/koyash/milestone/1) |
| US-17 | Address my specific skin concerns in the recommendation | Must Have | [#21](https://github.com/Koyash-team/koyash/issues/21) | Active | Done | [Sprint 1](https://github.com/Koyash-team/koyash/milestone/1) |
| US-01 | Build trust on the landing page | Must Have | [#5](https://github.com/Koyash-team/koyash/issues/5) | Active | Done | [Sprint 2](https://github.com/Koyash-team/koyash/milestone/2) |
| US-09 | Account for my skin type | Should Have | [#13](https://github.com/Koyash-team/koyash/issues/13) | Active | Done | [Sprint 2](https://github.com/Koyash-team/koyash/milestone/2) |
| US-11 | Get a warning about a potential irritant in a suitable product | Should Have | [#15](https://github.com/Koyash-team/koyash/issues/15) | Active | To Do | — |
| US-12 | Save my cosmetic bag to history | Should Have | [#16](https://github.com/Koyash-team/koyash/issues/16) | Active | To Do | — |
| US-13 | Leave "worked / didn't work" feedback on products | Should Have | [#17](https://github.com/Koyash-team/koyash/issues/17) | Active | To Do | — |
| US-14 | Get deeper LLM-based justification and ingredient analysis | Must Have | [#18](https://github.com/Koyash-team/koyash/issues/18) | Active | To Do | [Sprint 3](https://github.com/Koyash-team/koyash/milestone/3) |
| US-10 | See a product photo on each card | Could Have | [#14](https://github.com/Koyash-team/koyash/issues/14) | Active | To Do | — |
| US-15 | Pay for premium features / paid expert consultations | Won't Have | [#19](https://github.com/Koyash-team/koyash/issues/19) | Active | To Do | — |
| US-16 | Get product recommendations from a photo of my skin | Won't Have | [#20](https://github.com/Koyash-team/koyash/issues/20) | Active | To Do | — |
| US-18 | Complete a short, non-storytelling version of the questionnaire | Should Have | [#69](https://github.com/Koyash-team/koyash/issues/69) | Active | Done | [Sprint 2](https://github.com/Koyash-team/koyash/milestone/2) |
| US-19 | Get my skin type inferred from a short mini-quiz when I don't know it | Should Have | [#101](https://github.com/Koyash-team/koyash/issues/101) | Active | To Do | [Sprint 3](https://github.com/Koyash-team/koyash/milestone/3) |
| US-20 | Have my special condition (pregnancy, dermatitis, rosacea) taken into account | Should Have | [#124](https://github.com/Koyash-team/koyash/issues/124) | Active | To Do | [Sprint 3](https://github.com/Koyash-team/koyash/milestone/3) |

## Change log

- **2026-06-24:** Added US-18 (short questionnaire variant) during Sprint 2 planning — the team decided to offer a faster, non-narrative path through the same questions, alongside the existing storytelling flow (US-02). See [#69](https://github.com/Koyash-team/koyash/issues/69).
- **2026-06-30:** Sprint 3 planning. Added US-19 (skin-type mini-quiz for users who don't know their type, [#101](https://github.com/Koyash-team/koyash/issues/101)). Pulled US-14 (LLM justification & ingredient analysis, [#18](https://github.com/Koyash-team/koyash/issues/18)) into Sprint 3 and raised it to Must Have, and US-11 (irritant warning, [#15](https://github.com/Koyash-team/koyash/issues/15)) into Sprint 3, now that the LLM phase is committed for MVP v2. Repointed stale Sprint milestone links from the old `Dasha365` org to `Koyash-team`. Marked US-01 ([#5](https://github.com/Koyash-team/koyash/issues/5)), US-09 ([#13](https://github.com/Koyash-team/koyash/issues/13)), and US-18 ([#69](https://github.com/Koyash-team/koyash/issues/69)) `Done` — all delivered in Sprint 2 (landing page, skin-type matching, short questionnaire) and their issues closed.
- **2026-07-02:** Added US-20 (account for special conditions — pregnancy/dermatitis/rosacea, [#124](https://github.com/Koyash-team/koyash/issues/124)) to Sprint 3, with supporting [PBI-312](https://github.com/Koyash-team/koyash/issues/125). The questionnaire already collects these conditions but they were unused; they will be handled deterministically in the engine (like allergens), not by the LLM. Approach (exclude vs. warn, disclaimer) pending customer input. Not the same as US-11.
- **2026-06-30:** Removed US-11 (irritant warning, [#15](https://github.com/Koyash-team/koyash/issues/15)) from Sprint 3. The customer's LLM brief scopes the LLM to verbalizing the already-made recommendation only — it must not analyze composition or judge ingredients. An irritant warning requires judging an ingredient, so it is out of scope this sprint. Kept in the backlog for later, pending a separate customer discussion about expanding ingredient analysis (or a non-LLM irritant data source).
