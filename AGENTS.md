# Codex engineering rules — Àṣà & Ìtàn

This repository contains a working Yoruba heritage encyclopaedia prototype. Preserve its content and interface during migration. Our objective is an evidence-conscious, accessible, secure and maintainable educational publication, not a generic social network.

## Non-negotiable domain requirements
1. Centre properly attributed Yoruba community voices, living traditions and regional diversity. Neither outsider academic literature nor any single elder may be presented as universally authoritative.
2. **Do not use books by Samuel Johnson as factual sources**. Do not cite or copy them into site articles, source tables, or generated content. Check whether secondary claims merely repeat those books; flag uncertain provenance for review instead of claiming independence.
3. Treat Akinwumi Ogundiran's *The Yoruba: A New History* (2020) as a reading lead, not proof of specific page claims that have not been checked in the full text.
4. Every historical/medical/linguistic factual article must have source metadata, evidence category, verification status, geographic/community scope, and revision history. Distinguish oral tradition, scholarly interpretation, archaeological material, and modern scientific evidence.
5. Do not claim that oral or sacred accounts are experimentally validated facts. Do not make unsubstantiated claims that Yoruba ancestors invented modern digital computing, modern medicine or specific technologies. Explain defensible conceptual parallels with care.
6. Do not publish sacred/restricted testimony, private recordings, photos of identifiable people, or medical advice from contributors without suitable review and rights/consent.
7. Yoruba orthography and diacritics must be retained in canonical content. Search may offer diacritic-insensitive matching, but display must preserve proper spelling.

## Existing prototype
- `index.html`, `styles.css`, `app.js`, `content.js`, `knowledge.js`, `extended-sacred-arts.js`, `sacred-atlas.js`, `sacred-atlas-ui.js`, `community.js` form the prototype.
- `server.py` + SQLite are **local-pilot only**. Never deploy that Python HTTP server directly to the public Internet.
- The original signed-off prototype contained 68 chapters (18 history, 50 thematic); later editions expanded to 92, 110 and now **113 chapters and 128 source records** (2026-11-22 author-library edition). The current baseline includes 24 Sacred World profiles, 16 deep research articles, two sacred-name studies, three author dossiers, and six community-source entries. Preserve every current record and its IDs. Article counts are regression checks, not proof of historical accuracy. If tests establish a different count, stop and document the discrepancy before any migration.
- Keep the original UI working until replacement paths pass comparable interaction and accessibility checks.

## Technology decision (ADR-001)
- Frontend: Astro with content collections, TypeScript, Markdown/MDX, progressive islands for interactive tools.
- Frontend delivery: Cloudflare Pages static deployment, with preview deployments.
- Backend: managed Supabase PostgreSQL, Auth, private Storage and tightly controlled Edge Functions for mutation/moderation where necessary.
- GitHub for pull requests and CI. Separate development/staging/production environments and credentials.
- Migration must not depend on loading production secrets at build time.

## Code workflow
1. Inspect existing files/tests, explain the affected components and make a scoped plan before implementing.
2. One issue = one feature branch = one PR. Avoid rewriting unrelated code or content.
3. Add tests for changed logic. Do not replace assertions with snapshots alone.
4. Maintain strict type checks, input validation, output encoding, content sanitisation and security-sensitive authorization on the server/database, not just UI.
5. Validate SQL RLS explicitly for anonymous, authenticated author, moderator, and administrator roles; assert both allowed and denied operations.
6. Do not log private testimony, email addresses, token contents or uploaded media. Never commit secrets, credentials or production databases.
7. Keep public article publication a distinct editorial operation from user forum approval. Maintain immutable audit history and a correction process.
8. Default to accessibility, mobile-first layout, keyboard navigation, semantic HTML and readable contrast. Make English/Yoruba localisation possible from the beginning.
9. Before a PR: execute lint, typecheck, unit tests, import/migration integrity tests, and relevant end-to-end checks. Report exactly which tests ran and limitations.
10. **Never deploy production, migrate production data, delete content, or change external services without explicit owner approval.**

## Deliverables for each PR
Implementation summary, tests and commands, screenshot comparisons where UI changes, migration/rollback instructions for schema changes, and a content/source impact note.

First job: `docs/CODEX_TASK_000.md` (read-only baseline inspection and planning). The first implementation assignment follows as `docs/CODEX_TASK_001.md` after owner review. Follow `docs/ARCHITECTURE.md`, `docs/EDITORIAL_WORKFLOW.md`, and `docs/ROADMAP.md`.

## Foundation verification (2026-11-22)
- Use Node.js 22+ to run `npm ci --ignore-scripts && npm run verify` from repository root.
- CI workflow at `.github/workflows/quality.yml` performs syntax, archive data integrity and Python pilot syntax validation.
- Keep `tests/content.test.mjs` passing while moving content into Astro. Article count is a migration regression check, not independent historical fact-checking.
- GitHub repository creation itself is **not** supported by the currently connected GitHub action; see `docs/REPOSITORY_SETUP.md`. Do not claim remote GitHub setup or checks have completed until verifiable.

## Research Centre extension — November 2026
- A previous expansion added 16 deep research studies plus 2 contested sacred-name etymology studies (`deep-heritage.js`, `names-etymology.js`), resulting in a historical **110-chapter / 113-reference** milestone; the current authoritative source baseline is **113 chapters / 128 references** after the three author dossiers and fifteen additional reference records. See `docs/RESEARCH_INTEGRATION_AUDIT.md` and `docs/CODEX_TASK_003.md`.
- Treat Olódùmarè and Òrìṣà etymologies as unresolved; attribute individual word-split proposals and do not claim the first named speaker, date or inventor of a sacred term without independent evidence.
- Ifá 16×16 binary patterns are an *illustrative educational mathematical model*, not a claimed authentic full chart of 256 verses or proof of digital computer invention.
- Do not call English TTS an authentic Yoruba voice. Only approved native-speaker recordings with documented rights, dialect and linguistic review may carry that label.
- Browser end-to-end tests are mandatory before production deployment; container Chromium access was blocked during this prototype release.


## Author and book provenance
Read `docs/OLUWOLE_ELEBUIBON_ABIMBOLA_RESEARCH_GUIDE.md` before writing about Sophie Olúwọlé, Ifáyẹmí Ẹlẹ́buìbọn or Wándé Abímbọ́lá. Track editions and inspected-page status; do not infer religious content from catalogue metadata. Do not use Samuel Johnson directly or through an unchecked secondary retelling to substantiate historical claims. Preserve original Yoruba and rights metadata in any collected verses or audio.
