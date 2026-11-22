# Codex Task 003 — Deep Heritage and Sacred Names production migration

**Scope:** Preserve 110 chapters and 113 source records from the source-controlled prototype; integrate the new research centre into Astro alongside the existing Sacred World, without modifying production infrastructure.

## Deliverables

1. Migrate `deep-heritage.js` (16 articles) and `names-etymology.js` (2 articles) into typed, publicly indexable Astro content records. Preserve all Yoruba diacritics, stable IDs, section-level source IDs, review caveats and crosslinks.
2. Build an accessible `Research Centre` with filters, 9 curated pathways, source badges and named account / community provenance fields. Preserve `#research` and `#article/deep-*` hash links as redirects when migrating.
3. Create a versioned 256-cell educational Odù grid: show the two independent 4-bit columns and its mathematical interpretation, with clear **not-liturgical-order** labelling. Distinguish 256 odù signs from unverified verses. Do not generate sacred ẹsẹ̀ using a language model.
4. Add a pronunciation recording workflow (rights, attribution, speaker variety, pronunciation reviewer and consent) and approved-native-audio playback. Do not silently fall back to unrelated language TTS. Do not ship placeholder recordings as genuine.
5. Add a field for competing etymologies with `claimed_by`, `source_id`, `source_access`, `linguistic_review_status`, `community_variant`, `last_reviewed_at`; mark Olódùmarè and Òrìṣà historical derivations unresolved.
6. Extend content tests and do desktop/mobile keyboard/screenreader checks including focus order, scroll, source links and static rendering without JS.
7. Audit all source URLs for existence and content correspondence, with a separate report for unexamined books and sources relying indirectly on the excluded author. Do not imply source citations validate entire articles.
8. Do not deploy, commit secrets, provision a database or publish user testimony without explicit owner approval.

## Acceptance gates

- `npm run verify` passes; original 92 chapters, original 92 sources and six community records remain preserved; final source count at least 113.
- Full keyboard and responsive checks pass in a real browser.
- No fake Yoruba audio or false Ifá = invention of computers claim.
- Both sacred-name pages display competing analyses with explicit confidence/provenance labels and no fabricated primary quotations.
- Existing comments/discussions/submission prototype retains pending-only moderation behaviour.
