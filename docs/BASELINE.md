# 2026-11-22 preserved heritage encyclopaedia baseline

The current prototype contains 68 article records, 64 bibliographic records, 6 community history entries, 24 timeline events, 11 geographical markers, 12 people profiles and 15 learning quiz questions. Counts describe existing content, **not proof that every historical claim has been verified**.

Canonical material is spread across `content.js`, `knowledge.js` and `extended-sacred-arts.js`. The original frontend remains untouched until the scoped Astro migration has been built and reviewed. In the interim run `npm run verify` before and after edits.

Editorial requirements:
- Original source IDs must resolve and historical/medical knowledge evidence notes remain present.
- Oral-history testimony must be attributed and permissioned, not silently presented as independently proven facts.
- Source register must not contain books authored by Samuel Johnson.
- Diacritics and local names must be preserved.
- Source verification status must not be upgraded by code changes alone.

Neither the repository foundation nor CI publishes the website or enables live discussions.
