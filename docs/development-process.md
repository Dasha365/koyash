# Development Process

This document describes how the KOYASH team actually develops the product in
this repository: the boards we manage work on, the git and review workflow, how
we handle configuration and secrets, the reproducible development setup, and our
CI and deployment. It reflects current practice, not an aspirational process.

## Work management boards

We manage work on a single GitHub Projects (v2) board, **"Koyash Product
Backlog"**, which serves as both the Product Backlog and the per-Sprint Sprint
Backlog (filtered by the Sprint milestone).

Each item on the board carries:

- **Status** — workflow state (see below).
- **Story Points** — Modified Fibonacci estimate.
- **MVP version** — `MVP v1`, `MVP v2`, … to track which increment an item
  belongs to.
- **MoSCoW** — Must / Should / Could / Won't.
- **Reviewers** — the team member who reviews the work (different from the
  implementer/assignee).

The **Sprint Backlog** is the same board scoped to the current **Sprint
milestone** (e.g. *Sprint 3*). The milestone holds the Sprint Goal, dates, and
the selected items; issues assigned to it are the Sprint Backlog.

### Workflow states and entry criteria

| Status | An item enters this state when… |
|--------|----------------------------------|
| **To Do** | It is in the Product Backlog and not yet ready to start. |
| **Ready** | It is selected for the current Sprint, assigned, estimated, and has a clear description and acceptance criteria — startable without major open questions. |
| **In Progress** | A developer has started the work (branch created from the issue). |
| **Review** | The implementation is ready; the issue-linked PR is open and review is happening. |
| **Done** | Acceptance criteria and the [Definition of Done](definition-of-done.md) are satisfied and the issue-linked PR is merged into `main`. |

## Git and review workflow

We use a trunk-based, short-lived-branch workflow around a protected `main`.

1. **Issues.** Every change starts from an issue created with one of the
   templates in [`.github/ISSUE_TEMPLATE/`](../.github/ISSUE_TEMPLATE/)
   (User Story, Other PBI, Bug Report, Course Task). Blank issues are disabled.
   Issues carry the description, acceptance criteria, and the reviewer.
2. **Branches.** We create a branch from the issue, named
   `<issue-number>-short-description` (for example `106-architecture-static-view`).
   `main` is never committed to directly.
3. **Pull requests.** Changes are submitted as a PR using the
   [PR template](../.github/pull_request_template.md), which prompts for a
   summary, the related issue, acceptance-criteria verification, testing
   performed, a reviewer checklist, and a changelog selection. PRs link their
   issue and close it on merge with `Closes #<n>` when the PR completes the PBI.
4. **Review.** At least one other team member (the assigned reviewer) reviews and
   approves. Authors cannot approve their own PR. Review threads must be resolved
   before merge.
5. **Merge.** We merge with **merge commits** — squash and rebase merging are not
   allowed into `main`. CI must be green first.
6. **Closing.** Merging the issue-linked PR closes the issue; the board item
   moves to **Done**.

`main` is protected by a repository **ruleset** that enforces this workflow:

- direct pushes and force-pushes are blocked (`main` only changes via PR);
- at least **1 approving review** is required, stale approvals are dismissed on
  new pushes, and review threads must be resolved;
- only **merge commits** are allowed;
- all CI status checks must pass — backend (ruff, mypy, Docker build, tests +
  QRTs + coverage, dependency audit), frontend (eslint, prettier, vite build,
  tests + coverage, dependency audit), and Lychee link checking.

### Git workflow diagram

```mermaid
gitGraph
   commit id: "setup"
   branch static-view
   commit id: "component diagram"
   checkout main
   merge static-view tag: "PR #114"
   branch dynamic-view
   commit id: "sequence diagram"
   checkout main
   merge dynamic-view tag: "PR #115"
   branch mini-quiz
   commit id: "implement"
   commit id: "review fixes"
   checkout main
   merge mini-quiz tag: "PR"
```

The branch names are shortened here for readability; in practice each branch is
prefixed with its issue number (`<issue-number>-short-description`, e.g.
`106-architecture-static-view`). The diagram shows how we actually work: `main`
is the single integration branch and always stays releasable. For each issue we
cut a short-lived branch named after that issue, do the work in one or more
commits, open a PR, and merge it back into `main` with a **merge commit** (the
labelled merge points) once it is
reviewed and CI is green. Branches are focused on one issue and do not live long
or accumulate unrelated work; `main` only ever advances through reviewed merges,
never through direct commits.

## Configuration and secrets management

- **Secrets are never committed.** `.gitignore` ignores `.env`, `*.env`, and
  `.env.*`, while explicitly allowing the sanitized example templates
  ([`backend/.env.example`](../backend/.env.example),
  [`db/.env.example`](../db/.env.example)).
- **Runtime configuration is supplied via environment variables.** The backend
  reads them through a pydantic `Settings` object
  ([`backend/app/core/config.py`](../backend/app/core/config.py)) — `MONGODB_URI`,
  `MONGO_DB_NAME`, and `APP_*`. The MVP v2 LLM API key is supplied the same way
  (environment variable), never committed. The frontend reads `VITE_API_URL` at
  build time to point at the backend.
- **Sanitized examples are committed.** `backend/.env.example` and
  `db/.env.example` document the required variable names with placeholder values.
- **CI/deployment configuration.** CI is defined in
  [`.github/workflows/`](../.github/workflows/). Secrets used by deployment live
  in the Railway project environment (and CI secrets in GitHub Actions), not in
  the repository.
- **Non-redistributable data is excluded.** The customer-provided source dataset
  (`db/data/Koyash.xlsx`) is git-ignored because it is not ours to redistribute
  (see [`db/README.md`](../db/README.md)).

## Reproducible development environment

- **Backend** runs on Python 3.12. Dependencies are pinned in
  [`backend/requirements.txt`](../backend/requirements.txt) (runtime) and
  [`backend/requirements-dev.txt`](../backend/requirements-dev.txt) (lint, type
  check, tests). A [`backend/Dockerfile`](../backend/Dockerfile) and a root
  [`docker-compose.yml`](../docker-compose.yml) provide a containerized run that
  matches CI and deployment.
- **Frontend** runs on Node with npm; dependencies are locked in
  [`frontend/package-lock.json`](../frontend/package-lock.json) and installed
  with `npm ci` for reproducible builds.
- **Database** scripts under [`db/`](../db/) have their own
  [`requirements.txt`](../db/requirements.txt) for the offline import/validation
  tooling.

We do not currently use Nix or `devenv`; Docker Compose plus the pinned
manifests are our reproducible-setup path.

## Continuous integration and deployment

CI runs on every pull request and on every push to `main`, defined in
[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) and
[`.github/workflows/lychee.yml`](../.github/workflows/lychee.yml). It includes,
as separate jobs:

- backend: lint (ruff), type check (mypy), Docker image build, tests + quality
  requirement tests + coverage gate, and a dependency vulnerability scan
  (pip-audit);
- frontend: lint (eslint), format check (prettier), build (vite), tests +
  coverage (vitest), and a dependency vulnerability scan;
- repository: Lychee link checking across all Markdown.

All of these are required status checks on `main`, so they must pass before any
PR can merge. See [`docs/testing.md`](testing.md) for the testing and CI status
overview.

**Deployment.** The product is deployed on **Railway** as two services — the
frontend (Vite build served via `vite preview`) and the backend (FastAPI in
Docker) — with MongoDB Atlas as the datastore (see the
[deployment view](architecture/README.md#deployment-view)). Railway is connected
to the GitHub repository and redeploys from `main`, so a merge to the protected
default branch is what ships a change to the customer-facing environment.
