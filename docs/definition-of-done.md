# Definition of Done

A PBI may be marked **Done** only when **both** its issue-specific acceptance
criteria **and** every applicable item below are satisfied.

## Applies to every PBI

- [ ] All issue acceptance criteria are satisfied.
- [ ] The work is reviewed and approved by another team member (not the implementer).
- [ ] At least one meaningful review comment was addressed or resolved.
- [ ] Required tests/checks pass (CI green, including link checking where it applies).
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
