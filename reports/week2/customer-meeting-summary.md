# Customer Meeting Summary - Week 2

**Date:** 11.06.2026
**Participants (roles):** Customer / product owner; Team 11 — Team Lead, Backend, Frontend (×2), UX/UI. 
**Related evidence:** [customer-meeting-transcript.md](customer-meeting-transcript.md) · [user-stories.md](user-stories.md) · design prototype: [Figma prototype](https://www.figma.com/design/oaSIM2azCmAmEcFY6MZWq9/KOYASH-team-11-prototype?node-id=0-1&t=TtDNm8oalI0rfTHt-1)

---

## Artifacts demonstrated

- User stories with MoSCoW priorities.
- Initial proposed MVP v1 scope.
- Interactive design prototype.
- Logo concepts.

## Discussion points
 
1. **Public MIT-licensed development model.** Team requested the customer's written consent to develop openly in a public MIT-licensed repository. 
2. **User stories.** Reviewed story by story. The customer confirmed the overall direction but requested rewordings on several stories.
3. **MVP v1 scope.** Customer assessed the proposed scope as too broad for a two-week first version and recommended trimming to one basic but high-quality flow.
4. **Logo.** Customer reviewed both concepts and selected one.
5. **Cosmetic bag composition.** Discussed the required product categories and how many products to return.
6. **Design prototype.** Reviewed interactively; feedback on contrast, minimalism, typography, and card content.
7. **Process recommendations (advisory).** The customer recommended adopting a task tracker used daily, and using ICE / RICE for task-level prioritization. 
8. **Working cadence.** Customer offered short (~15–30 min) consultations during the week, preferring scheduled meetings over messages.
   
## Decisions
 
| # | Decision |
|---|----------|
| D1 | Adopt the **grandmother's-handwriting logo**; update brand contacts/assets to match. |
| D2 | **Cosmetic bag:** five mandatory categories — cleansing, toning, serum, moisturizing, SPF — plus optional extras (mask, peeling-tonic); multiple products per category are allowed. |
| D3 | **Budget input** simplified to a validated numeric/segment input. |
| D4 | **Skin-type filtering** moves to *Should Have*: the `skintype` data is not yet present; the team may populate the 69 reference entries if capacity allows. |
| D5 | **Trim MVP v1**: landing page is not required for the first version; focus on basic filtering, basic output, and the questionnaire. |
 
## Action points
 
| ID | Action | Affected artifact |
|----|--------|-------------------|
| A1 | Apply the agreed story edits: reword US-02, US-03, US-04, US-05, US-07; move US-09 to Must.| [user-stories.md](user-stories.md) |
| A2 | Trim MVP v1 to the basic flow (filtering + output + questionnaire). | user-stories.md `## Initial proposed MVP v1 scope` |
| A3 | Apply the chosen handwriting logo and update all brand contacts. | brandbook |
| A4 | Iterate the prototype per feedback and bring an intermediate version to a consultation. | [Figma prototype](https://www.figma.com/design/oaSIM2azCmAmEcFY6MZWq9/KOYASH-team-11-prototype?node-id=0-1&t=TtDNm8oalI0rfTHt-1) |
| A5 | Share the user-stories table with the customer for comments. | [user-stories.md](user-stories.md) |
 
## Risks
 
- **Skin-type data dependency.** US-09 depends on skin-type markup that does not yet exist and must be populated by the team. If the markup is not completed, US-09 cannot be delivered.
## Feedback
 
- **Stories:** direction approved; phrasing on several stories needs to separate the user *action* from the user *value*, and to re-anchor value on understanding/trust and (for the ethics story) on values rather than choice overload.
- **Logo:** strong positive reaction to the handwriting variant; selected.
- **Prototype:** must be changed to match the style of the selected logo.
- **Cosmetic bag:** offering several products per category is welcome.
## Customer approvals
 
- **MIT-licensed public development model:** explicitly consented. The customer sent a written message confirming she consents to the product code being publicly available on GitHub during the course; the screenshot is retained as evidence. The repository was kept private until consent was given and made public only afterward, so no public MIT-licensed development occurred before consent.
- **User stories & MoSCoW priorities:** **approved with requested changes**. Final approval of the updated stories and priorities is pending.
- **Initial proposed MVP v1 scope:**  the customer requested it be trimmed. Revised scope to be confirmed in follow-up.
- **Prototype & interface artifacts:** customer feedback obtained; explicit approval is not required.
- **Sanitized transcript publication:** the customer approved publishing the sanitized English transcript ([customer-meeting-transcript.md](customer-meeting-transcript.md)) in this repository.
## Resulting changes
 
- **US-02:** reworded so the narrative flow serves the experience (*not feeling interrogated/pressured*), decoupled from recommendation quality.
- **US-03:** "reliable filtering" replaced with "filter according to my needs."
- **US-04:** reinforced to emphasize selection from the *real catalog*, avoiding hallucinated/non-existent products.
- **US-05:** re-anchored on making an informed decision and trusting the service's expertise, rather than an instruction to buy.
- **US-07:** persona changed from "overwhelmed chooser" to "ethically-driven user"; reframed around a values-based motivation.
- **US-09:** move to Should Have; the team will populate the missing skin-type markup itself.
- **MVP v1 scope:** narrowed by dropping US-01 (landing); scope is US-02–US-08 (questionnaire + filtering + ordered, justified bag).
- **Design:** changed to match the style of the selected logo.
- **Brand:** handwriting logo adopted; contacts/assets updated.
 