# Architecture decision record (ADR-001) — Àṣà & Ìtàn

Status: proposed baseline, not deployed. Product owner approval required before external accounts are created or billed.

## Goals
Create a high-trust Yoruba knowledge portal with a public encyclopedia, language learning, research references, community and editorial controls. Prioritize preservation of source attribution and contributor rights over growth metrics.

## Components
| Concern | Decision | Rationale |
| --- | --- | --- |
| Public reading pages | Astro static-generated pages and versioned MDX/content collections | Great speed and SEO, stable archival article URLs, easy offline review |
| Styling | Retain dark-green/bronze design and responsive patterns | Protect existing work and visual identity |
| Interactive learning | TypeScript client components/islands | Keep most pages low-JS; alphabet lab, quiz and maps remain interactive |
| Comments, threads, submissions | Supabase PostgreSQL through scoped APIs | Durable persistence and queryable moderation queue |
| Identity | Supabase Auth; anonymous read, registered contributions once public | Account recovery, role boundaries, rate-limited intake |
| Roles | Reader, contributor, reviewer, editor, curator, administrator | Editor approval != verified historical accuracy |
| Media | Private storage first; public derivative only with clear release | Respect rights, sacred material, third-party personal data |
| Hosting | Cloudflare Pages CDN + DNS | Git-based previews, HTTPS, scalability for static content |
| Search | Prebuilt index initially; PostgreSQL search for contributed materials later | Work quickly without a search cluster |
| Analytics | Privacy-preserving essential measurements | Avoid unnecessary tracking |

## Trust boundaries
- Published articles are versioned and editorially checked. Drafts and oral interviews are PRIVATE by default.
- Browser-facing anonymous keys MUST NOT bypass RLS. Admin/service keys stay on restricted server functions, never frontend bundles.
- Claims of identity or editor role are validated by a trusted role store; don't authorize from user-editable metadata.
- RLS tests must demonstrate that ordinary users cannot view submissions, personal contact details, unpublished content or edit a review decision.
- Uploaded files undergo size/type limits, malware/unsafe-content scanning where feasible, licensing and consent checks, and controlled release.
- Public comments are displayed only after moderation, and are escaped/sanitised against XSS.
- Add abuse reporting, spam controls, throttling, notifications and moderation audit events before opening the community publicly.
- Backups must be automated and restoration-tested. Production domains require HTTPS and a published privacy/retention/deletion policy.
- For Nigerian data subjects, assess obligations under Nigeria Data Protection Act, 2023; get local legal review before public intake.

## Content pipeline
Research note / community testimony -> provenance + consent -> private submission -> triage -> source examination -> cultural custodian or academic review as relevant -> editor approval -> versioned publication -> correction/withdrawal workflow. Publication status and verification status must be separate fields.

## Migration strategy
1. Snapshot untouched prototype with Git tag `prototype-2026-11-22` after first import.
2. Export current chapter/source data into typed JSON, count and cross-reference validate.
3. Implement new Astro routes behind preview, preserving legacy site and its styling.
4. Move publication content into content collections; maintain old slugs via redirects.
5. Build authentication and moderation in isolated staging database, applying SQL migrations and RLS tests.
6. Deploy public read-only site first. Enable submission features only after end-to-end security and privacy review.

## Non-goals for MVP
No cryptocurrency/NFTs, unmoderated chat, collection of users' genealogy without consent, public medical advice marketplace, or artificial 'validation' of sacred knowledge.
