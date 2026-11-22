# Codex task 001 — Preserve, test, and scaffold the next generation

**Goal:** Create a tested Astro + TypeScript foundation that can eventually replace the public reading experience without losing the 113 existing chapters, including the original 68 and later Sacred World, Deep Research, sacred names and author studies, or breaking the prototype. Do not connect live infrastructure yet.

## Input files
Read `AGENTS.md`, `README.md`, `EDITORIAL_POLICY.md`, `TEST_REPORT.md`, `docs/ARCHITECTURE.md`, `docs/EDITORIAL_WORKFLOW.md`, `docs/ROADMAP.md` and the existing frontend assets.

## Scope
1. Create a separate `web/` Astro app with TypeScript, content collections and reusable site layout while leaving the existing root site untouched.
2. Write an importer/normaliser for all existing content modules, including the community, Sacred World, deep research, name-etymology and author data. Preserve original article/source IDs, Yoruba tone marks, attribution, and chapter wording. Log any ambiguous transforms for human review.
3. Provide typed schemas for articles and sources, evidence/verification labels, and an accessible list/detail reading interface.
4. Reproduce the existing dark-green/bronze visual direction; add mobile navigation and clear source links.
5. Add validation scripts checking current 113 article count and 128 source records (verify by actually running the baseline checks), source-ID resolution, unique slugs, correct diacritics preservation, and the ban on citing Samuel Johnson books.
6. Add basic automated smoke tests and GitHub Actions CI. Include explicit commands to run locally.
7. Include migration docs and a rollback path to the original site; do not remove `index.html`, original JS, or `server.py`.

## Out of scope
- No Supabase production project, no public hosting deployment, no live secret keys.
- No externally visible comments or unmoderated submissions.
- No automatic rewriting of the historical material or automatic claim validation.
- No new media copied from websites without verified rights.

## Acceptance criteria
- Old site remains openable as before.
- New Astro build succeeds and article sources reconcile with original data.
- No article count regression (current baseline: 113 articles, 128 sources; preserve six community records).
- Responsive, navigable article pages pass keyboard and basic accessibility tests.
- CI checks pass from clean checkout.
- Document any missing, contested or incomplete source records; never silently invent a citation.

## Handoff format
Summarise branch/commits, changed files, tests actually executed, compatibility risk, screenshots when applicable, and the next engineering task. Open a PR for review; do not merge/deploy without approval.

## Already implemented in the foundation
- Baseline integrity and source-register tests: `tests/content.test.mjs`.
- Legacy syntax and integrity scripts: `npm run verify`.
- Proposed CI workflow: `.github/workflows/quality.yml`.
- Code review and editorial guardrails: `.github/pull_request_template.md`, `AGENTS.md`.
Codex should extend these checks for `web/`, not delete the baseline checks or change historical claims silently.
