# Codex Task 000 — Verify and protect the 2026-11-22 baseline

## Purpose
This is the **first** Codex assignment for Àṣà & Ìtàn. Before implementation, independently inspect the complete imported repository and establish a reliable baseline. Do not begin a framework migration or connect live infrastructure in this task.

## Required reading
1. `AGENTS.md`, `README.md`, `EDITORIAL_POLICY.md`, `SECURITY.md`.
2. `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, `docs/BASELINE.md`, `docs/CODEX_TASK_001.md`, `docs/CODEX_TASK_004.md`.
3. Examine all existing app/content modules and `tests/content.test.mjs`.

## Scope
1. Create a dedicated branch named `codex/000-baseline-audit` from `main`.
2. Inventory file structure and explain how articles, references, oral testimonies, menus, sacred profiles, the local pilot server, and moderation work.
3. Run `npm ci --ignore-scripts` and `npm run verify` using Node.js 22+. If Python is available, compile `server.py` without deploying it. Report exact commands and results.
4. Establish the baseline: **113 chapters, 128 source records, six community-source entries, 24 Sacred World profiles**, including Olódùmarè and Òrìṣà name studies and the three author dossiers. These expected totals are regression indicators, not historical validation. If actual data differs, stop and explain rather than altering data to fit expectations.
5. Identify security, privacy, accessibility, performance, and source-provenance risks. Flag historical claims without adequate primary evidence and potential indirect reliance on excluded Samuel Johnson books. Do not rewrite factual claims during this initial audit.
6. Create `docs/CODEX_BASELINE_AUDIT.md` containing findings, risks, a priority-ordered migration plan, tests, and a first proposed Astro content schema. Specify how the original site can remain available throughout migration.
7. Open a pull request for the **audit document only**. Do not merge it or deploy anything.

## Non-negotiable constraints
- Do not delete, rename, rewrite, or move the root website files.
- Do not modify article wording, citations or Yoruba tone marks.
- Do not run SQL migrations, create public infrastructure, add paid services or publish private submissions.
- Never commit API tokens, `.env` values, database records, unpublished oral testimony or recording assets without documented permission.
- Do not treat a passing test as academic peer review.

## Handoff
Report branch name, PR link if created, files changed, tests and failures, content counts, blocking issues and a short recommendation for task 001. If permissions prevent opening a PR, say so and leave the work in an isolated branch.
