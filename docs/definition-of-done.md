# Definition of Done

A PBI may be marked **Done** only when **both** its issue-specific acceptance
criteria **and** every applicable item below are satisfied.

## Applies to every PBI

- [ ] All issue acceptance criteria are satisfied.
- [ ] The work is reviewed and approved by another team member (not the implementer).
- [ ] At least one meaningful review comment was addressed or resolved.
- [ ] Required tests/checks pass (CI green, including link checking where it applies).
- [ ] Relevant [quality requirements and quality requirement tests](quality-requirements.md)
      are satisfied, or the PBI explicitly documents why none apply.
- [ ] Relevant architecture documentation is satisfied, or explicitly documented as not
      applicable — not yet required; architecture documentation and ADRs start in
      Assignment 5.
- [ ] CI quality gates configured for the repository (lint, type-check, build, unit and
      integration tests, coverage, quality requirement tests, and the additional QA
      check) pass before merge, when that CI is configured.
- [ ] `CHANGELOG.md` is updated for every user-visible change.
- [ ] Verification evidence is preserved in the normal workflow artifacts
      (linked PR/MR, and where relevant a deployment, screenshot, or doc artifact).

## Additional, for supporting / implementation PBIs

- [ ] An issue-linked branch named `<issue-number>-short-description` was used.
- [ ] The issue-linked PR/MR is merged into the protected default branch (`main`)
      via the agreed merge-commit workflow.

## Additional, for user stories

- [ ] The story's acceptance criteria are satisfied.
- [ ] All linked supporting PBIs required to satisfy those acceptance criteria
      are reviewed, merged, verified, and marked Done.

## Maintained since Assignment 4

The quality requirements, quality requirement tests, CI quality gates, and coverage
expectations introduced in Assignment 4
([PBI-207](https://github.com/Koyash-team/koyash/issues/76),
[PBI-208](https://github.com/Koyash-team/koyash/issues/77),
[PBI-209](https://github.com/Koyash-team/koyash/issues/78)) are maintained project assets.
Later PBIs must keep them passing or replace them with a documented equivalent or
stronger check — they are not one-time submission evidence.
