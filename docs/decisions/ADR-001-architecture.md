# ADR-001 — Heritage platform application architecture

- Status: **Proposed, not deployed**
- Date: 2026-11-22
- Decision owner: Project owner, with ChatGPT assisting as technical lead

## Context
The project currently consists of a browser-rendered, static reading experience and an illustrative Python/SQLite moderation service. The public encyclopaedia must remain available and all historical content preserved while a maintainable application is developed.

## Decision
- Keep the original root HTML/CSS/JavaScript experience as the rollback baseline.
- Establish `web/` as a separate Astro/TypeScript project in Codex task 001.
- Use content collections with explicit article IDs, source provenance, community scope, revision fields and historical verification status.
- Proposed public delivery: Cloudflare Pages. Proposed managed community backend: Supabase PostgreSQL + Auth + private Storage + authorised mutation endpoints.
- Deploy neither infrastructure nor the pilot Python server until security and owner review.
- CI must run syntax and archive-integrity checks on every PR. Add new application build and accessibility tests when the `web/` app exists.

## Alternatives considered
- All-in-one CMS: easier editing but more operational/dependency risk without safeguards for source trust.
- Keep static HTML permanently: insufficient for governed multi-author publishing.
- Deploy current Python/SQLite prototype: rejected as public production configuration.

## Future review
Revisit after first Astro import and working author/moderator permission prototype. No paid services or production environments have been provisioned under this ADR.
