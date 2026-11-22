# Product and engineering roadmap — Àṣà & Ìtàn

Status: technical proposal; not a promise of launch dates. Each milestone needs a tested acceptance gate.

## M0: Repository foundation and source freeze
- Import existing prototype, take an immutable baseline, record article/source counts.
- Put docs and source policies under version control, set up GitHub branch protection and code review.
- Configure code formatting, type/lint tests and CI; publish no live database.
Acceptance: identical public experience on local preview; article/source IDs validate; private files excluded from the repository.

## M1: Content-first Astro migration
- Typed article and source schemas; clean topic hierarchy, citations, evidence badges and preserved URLs.
- SEO metadata, sitemap, accessible navigation, mobile responsiveness, offline/language readiness.
- Rebuild glossary, timeline, alphabet lab, quizzes and heritage/innovation explorer.
Acceptance: no lost chapters, no dead internal references, major tools remain usable by keyboard and on mobile.

## M2: Secure identity and publishing
- Supabase staging project, versioned SQL migrations, access tests, staff and contributor roles.
- Content drafts, source registry, claims with source references, review states, revision diff, corrections and approvals.
Acceptance: anonymous users cannot see private records; only authorised editors can publish; immutable audit events are retained.

## M3: Community and oral testimony
- Registered comments, discussions, reports, submitted testimony with consent, rights and geographic provenance.
- Abuse prevention, moderator queue, takedown workflow, deleted-data handling, contributor dashboard.
- Multimedia intake only after private storage and legal/security review.
Acceptance: no unreviewed testimony or comments visible; submitted personal details remain private; successful moderation and deletion tests.

## M4: Deeper scholarship and language
- Full English/Yoruba localisation, phonetic examples with permitted recordings, alphabet/tones and speech learning.
- Regional pages, specialist review process, glossary linked to source history, comparative diagrams and bibliographies.
Acceptance: expert-reviewed samples; diacritics accurate; bilingual linking and search pass tests.

## M5: Public learning and research archive
- Student learning tracks, assessments, verifiable source citations, primary source collections, event timeline and archive filters.
- Accessible audio, educational downloads and curated 'heritage × innovation' exhibits.
Acceptance: claims audit, inclusive accessibility tests, source rights complete, rollback exercised.

## M6: Scale and governance
- Editorial board, community partnerships, contributor training, response protocol, analytics/monitoring, disaster recovery.
- Performance/load testing; cost and privacy audits; backups and incident response.
Acceptance: tested restoration, documented moderation service levels and responsible ownership.

## Default rules
No 'everybody can post instantly' switch, no unsourced claims added to article metadata, no deployment to production from Codex without explicit approval, no mass rewrites of culturally sensitive narratives.
