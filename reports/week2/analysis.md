# Analysis - Week 2

## Learning points

- **User stories: separate the action from the value.** Our first draft tied the questionnaire's narrative format to recommendation quality ("so that I provide data for a good recommendation"). The customer pointed out these are unrelated — a good recommendation is owned by the filtering logic, while the narrative only serves the *experience* of not feeling pressured. We rewrote US-02, US-05, and US-07 to keep the user value clean and honest.
- **Personas are not one-size-fits-all.** We had defaulted most stories to the "overwhelmed chooser." The ethics story (US-07) is really a values motivation, not a choice-overload one, so it got its own persona.
- **MoSCoW is project-level; task-level needs a different tool.** MoSCoW fits the whole-course product scope, but for prioritizing day-to-day tasks the customer recommended ICE / RICE. We learned these operate at different granularities and shouldn't be conflated.
- **A rough prototype is enough to unblock design.** A low-fidelity, clickable prototype was sufficient to get concrete, actionable feedback. We did not need a polished design to validate direction.
- **A foundational brand choice cascades through the whole design.** We built the prototype around one logo; when the customer saw the handwritten-logo variant she preferred it and asked us to redo the design under it, so we reworked the visual design entirely. The lesson is to confirm the foundational brand element before building the full design on top of it, and to bring intermediate versions for early sign-off rather than polishing one direction.

## Validated assumptions

- **Photos are not needed; icons work — confirmed.** The assumption that product photos add value was rejected: photo quality across ~70 products is inconsistent, and the customer endorsed category icons. US-10 stays Could Have.
- **Landing page is not required for the first working version — confirmed.** This rejected our initial scope assumption and led to dropping US-01 from the MVP v1 scope.
- **Logo direction — confirmed.** The handwriting-based logo got a strong positive reaction and was selected; the team-designed wordmark was dropped.

## Needs clarification

- **Final customer approval pending.** The updated stories and trimmed MVP v1 scope still need explicit customer approval.
- **Redesigned prototype not yet reviewed by the customer.** Following the logo change, the visual design was fully redone under the selected logo. The redesigned prototype is being sent to the customer for review, but with only a few hours before submission she is unlikely to review it in time, so design feedback and approval remain open. 
- **Per-product reasoning text format.** The structural reasoning shown on each card (built from dataset fields, no LLM) still needs a defined format spec.
- **Backend↔frontend API contract.** The contract between the recommendation backend and the frontend needs to be finalized before MVP v1 build.

## Planned response

- **Story edits applied.** Several user stories reworded — see [US-02](user-stories.md#us-02-complete-a-step-by-step-questionnaire-in-a-storytelling-format), [US-03](user-stories.md#us-03-enter-budget-through-a-controlled-input), [US-04](user-stories.md#us-04-receive-a-personal-cosmetic-bag-with-real-products), [US-05](user-stories.md#us-05-see-a-clear-justification-for-every-recommended-product), and [US-07](user-stories.md#us-07-express-my-ethical-principles-and-values); [US-09](user-stories.md#us-09-account-for-my-skin-type) moved to Should Have, with team-owned skin-type markup keeping it deliverable.
- **MVP v1 scope trimmed.** Scope is [US-02–US-08](user-stories.md#initial-proposed-mvp-v1-scope) (questionnaire → controlled budget → ordered, justified bag from the real catalog).
- **Prioritization for Assignment 3.** Adopt a task tracker used daily, and apply ICE / RICE at the task level when the scope is estimated and finalized.
- **Skin-type markup scheduled** as a parallel team task so [US-09](user-stories.md#us-09-account-for-my-skin-type) remains deliverable despite moving to Should Have.
- **Resolve technical seams before building MVP v1:** deployment architecture, the backend↔frontend API contract, and the per-product reasoning format ([US-05](user-stories.md#us-05-see-a-clear-justification-for-every-recommended-product)).
- **Design review.** Send the redesigned prototype to the customer ([Figma prototype](https://www.figma.com/design/oaSIM2azCmAmEcFY6MZWq9/KOYASH-team-11-prototype?node-id=0-1&t=TtDNm8oalI0rfTHt-1)).
- **Book a customer slot** to obtain final approval of the updated stories, scope, and design.