# Codex task 002 — Sacred World content migration and editorial controls

**Starting point:** Scope-preserving baseline + the new `sacred-atlas.js` dataset (24 profiles). Original 68 chapters must stay identical; do not delete or overwrite.

## Work
1. Migrate the 24 profiles into typed Astro content collections with stable IDs, correct Yoruba spelling, kind taxonomy, source links, regional scope, review status and misconception/correction structured fields.
2. Use the UI at `#sacred` as a visual/interaction reference. Make pages indexable on a static build with persistent paths; preserve old hash routes as redirects during transition.
3. Add editorial reviewer workflow: draft -> source-checked -> native/community reviewed -> published. Store reviewer, timestamp and explicit unresolved differences; never mark all existing profiles peer-reviewed.
4. Allow approved, consented native voices as separate attributed viewpoints, not direct overwrite of the base article or automatic publication of user-submitted material.
5. Build differential tests preserving the 68+24 record counts and all 64+28 sources, verify source IDs, render links, a11y, and exclusions. Add a link check that distinguishes unreachable URLs from unsupported factual content.
6. Keep Supabase as a proposal only; no live credentials, production schema migration, deployment or database changes without owner approval.

## Acceptance criteria
- All 92 articles render with proper diacritics and referential integrity.
- Filtering by category and searching unaccented names returns correct records.
- Published pages state evidentiary limitations and source scope.
- At least Èṣù, Olódùmarè and Ọ̀rúnmìlà pages retain separate categories; no false equivalence to Satan, absolute universal pantheon or direct computing invention.
- Existing community prototype remains unchanged until a separate approved backend PR.
