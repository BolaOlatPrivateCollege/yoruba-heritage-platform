# Àṣà & Ìtàn — Codex-ready engineering handoff

This ZIP includes the **existing 68-chapter website** plus a technical direction package. This is **not** a completed Astro or Supabase migration and **has not been deployed**.

## Read in order
1. `AGENTS.md` — the standing project rules Codex must obey.
2. `docs/CODEX_TASK_001.md` — the first scoped coding assignment.
3. `docs/ARCHITECTURE.md` — stack and security boundaries.
4. `docs/ROADMAP.md` — milestones with acceptance criteria.
5. `docs/EDITORIAL_WORKFLOW.md` — content organisation and trust.
6. `docs/DATA_MODEL.md` — proposed entities and security invariants.
7. `docs/DEPLOYMENT_CHECKLIST.md` — production gate.

## Start with GitHub + Codex
Create a **private GitHub repository** under an account you control and commit the unpacked project files. In the Codex environment, select that repository and give it the text of `docs/CODEX_TASK_001.md` as the first task. Request a feature branch and pull request, not a production deploy. Confirm the resulting diff and CI tests before merging. The site can continue to run locally from `index.html` during migration.

## Important
The existing Python/SQLite service in `server.py` is a local pilot backend, not the recommended public production backend. Do not expose it directly to the open Internet. All historical articles still require community/academic source verification as described in the accompanying policy. Samuel Johnson's books are excluded from factual sourcing.
