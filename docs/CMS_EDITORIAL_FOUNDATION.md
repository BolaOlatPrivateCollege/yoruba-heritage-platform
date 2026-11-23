# Àṣà & Ìtàn Yorùbá — Editorial CMS foundation (private design)

**Status:** Non-operational, private engineering foundation. **No admin login, backend, database, uploads, publication, deployment or community intake is enabled by this work.**

## Product decision

This is a **public cultural heritage website for everyone**, not a school portal. The creator needs an owner-controlled private dashboard to add and edit content without editing source files. Future collaborators may include culturally competent editors, translators, community custodians and rights reviewers. Protect original community accounts and permit distinct local versions to coexist without scholarly truth/falsity scoring. Research claims continue to live under Research. Retain Yorùbá tone marks and orthography end to end.

### Recommended deployment architecture (subject to security/hosting approval)

- Keep the existing Astro reader as a **statically generated, cacheable public site**.
- Add a **separate private editorial API/CMS**, PostgreSQL database and protected object storage. Evaluate mature self-hosted headless CMS products (e.g. Directus) against a minimal custom service before deciding; do not assume a provider, purchase, deploy or lock in credentials at this stage.
- Build immutable, sanitised **approved public snapshots** through a controlled build/revalidation pipeline. Public pages must never query unpublished private records directly.
- Admin interface on a restricted origin, HTTPS only, MFA-capable named accounts, role-based server checks and audited actions. Never ship admin secrets in Astro static assets.
- Separate content editorial roles and trusted community moderation. **Community Voices' future public contributor intake is a distinct security project**, not a shortcut through the editorial CMS.

## Dashboard modules

1. **Overview** — drafts, pending editorial approvals, scheduled publications, media needing rights checks, recent revisions.
2. **Stories & folktales** — chapters, story type, narrative series, narrator/community attribution and local variants.
3. **Beliefs & figures** — òrìṣà, names, heroes, community explanations, distinct variants and protected sacred context.
4. **Places & memories** — broad community association, community-approved place names, local histories without unnecessary precise locations.
5. **Research** — source-linked research records and provenance only in the Research section; do not overwrite the preserved source archive.
6. **Media library** — licensed images/audio, attribution, consent, alt text, transcripts, checksum and rights status; no public access before rights approval.
7. **Languages** — Yorùbá and English editions of the same entry, without silently overwriting the source telling.
8. **Community moderation (later)** — private submission review, rights clearance, withdrawal and age/guardian safeguards; disabled for the initial admin release.
9. **Settings and editors** — accounts/roles, audit history, site navigation and limited public copy settings.

## Authoring contract (Phase 0 only)

`web/src/lib/editorial-content-contract.ts` defines **validation only**, with no persistence or permissions. Content records include:

- Immutable internal ID and canonical stable slug; type: story, belief, figure, place, research, learning, editorial-page.
- Titles and bodies, with mandatory primary language and optional translations; support original Yorùbá Unicode.
- Genre (e.g. original fiction / community telling / first-hand recollection / research) and a *provenance note*. Never invent elder names, endorsements, field interviews or first-hand attribution.
- A revision number, editor metadata IDs (private), and editorial state. The schema does **not** grant publication rights.
- Contributor consent status and display-credit decision, which are not proof of actual consent; permission evidence must be verified server-side and stored in a protected private table.
- Optional media identifiers and rights status; no file uploads in this phase.

### Required lifecycle

`draft → in_review → approved → published` (with documented rollback, correction and withdrawal pathways). Enforce legal state changes and role permissions **server-side in a future independently reviewed implementation**. Do not let an API client set `published` directly just by passing a valid schema.

Required editorial safeguards:
- Save draft, auto/manual versioning, diff, preview, reversible publication, scheduled release, a strong "publish" confirmation and an owner-controlled workflow.
- Two-person clearance for community-derived contributions and sensitive sacred material when appropriate; otherwise owner approval by a privileged editor.
- Authenticated approvals signed/audited with server timestamps; short-lived sessions, CSRF protections, rate limits, security logging, robust backups and restore drills.
- Revision history and public-content rollback; do not silently edit archived primary source documents.
- Separate public and private projections so private identifiers, contact, consent evidence, moderator notes, IPs and draft text never enter site builds or generated JSON.
- Moderation must focus on privacy, permission, safety and editorial fit, not academic grading of sacred beliefs.
- Provide an actionable contributor correction/withdrawal path. Public withdrawal needs cache/search invalidation and a documented retention/deletion policy.

## Legacy data strategy: NO automatic migration

- Record and hash the current preservation baseline (113 canonical articles; 128 source records; stable source keys; original documentary URLs and five Fola audio recordings).
- Keep existing archived documents **read-only** in the first integration. Let the CMS create **new additions** and separately reviewed edited editions, linked to the historical ID without modifying source text.
- No overwriting archive IDs, sources, or existing Fola transcripts in a CMS import.
- Use a fixture-only dry-run migration and archive-parity tests before any live data import.
- Do not automatically turn existing fictional narratives into named community testimony.

## Phase 0 continuation — review workflow prototype

The pure module `web/src/lib/editorial-workflow.ts` now plans a restricted subset of content changes: draft revision, submission for review, return to draft, and independent approval of content whose rights are cleared. Each operation requires an exact revision and emits an **audit intent**; it performs no database write. Reviewers cannot author drafts, editors cannot approve them, and a reviewer cannot approve the revision they authored. Pending rights or uncleared media prevent approval. Oral/community testimony is specifically blocked until verified, separately stored consent is available.

**This is NOT security enforcement yet:** a future server must identify actors from secure sessions, persist records and audit events in one atomic transaction, enforce permissions against server-resolved roles, and prohibit client-supplied audit/approval metadata. The prototype deliberately has no publish, withdraw, admin login, API route or user-facing editor.

## Phase 1 private draft storage prototype (development only)

A single-process **local storage adapter** now exists at `cms/private-draft-repository.mjs`, with regression tests at `web/tests/private-draft-repository.test.mjs`. It persists a private JSON state (draft records and audit events together) with temporary-file replacement, restricts file/directory permissions, rejects public build paths, validates records, rejects duplicate IDs/slugs, enforces exact revision checks, and provides an independent-review process. It preserves Yorùbá Unicode and returns cloned record values so callers cannot mutate stored records directly.

The repository contains **NO web route, login, administrator page, database service, hosted URL or public publishing operation**. This adapter is **not production-ready**: it accepts actor identities provided by its caller, has only in-process serialisation (not multi-process database transactions), stores local files without a verified encryption/backup regime, and lacks production-grade recovery/security controls. Do not expose it behind HTTP before a real identity provider, RBAC, atomic database transactions and security assessment are implemented.

For local development only, storage should live outside the public web tree (for example `private_data/cms/`, which is ignored by Git). Private draft content must never be copied to `web/public`, `dist`, screenshots, static build artefacts, public search, sitemap, or browser bundles. **Do not use this local JSON store as a deployed CMS database**. PostgreSQL or another appropriately managed transactional database should replace it for multi-editor production use.

## Design preview — separate administrator interface

The standalone files in `cms/admin-preview/` provide a **responsive, in-memory dashboard design** for the future content manager. Categories include stories, beliefs, figures, places, Research, language and website pages. The demonstration supports editing a fictional sample's title, slug, introduction and body, switching primary language, viewing a safely text-rendered preview, and resetting to the sample. Its interface explicitly labels persistent save as disabled.

**Do not add this directory to the static Astro build or expose it as an admin website.** It is not an authenticated dashboard: no real login, server, session, database connection, uploads, actual draft save, audit persistence, approval or publication. It does not call `fetch` or browser storage and loses edits when the page closes. Do not enter real confidential information or community testimony.

The next major phase is to select a production identity provider, transactional database and deployment isolation, implement server-authorised content editing and private/public projection boundaries, and security-test those components *before* connecting the dashboard to real data. That phase is not authorised for deployment merely by approving this visual prototype.

## Security and operational gates

**Phase 0 — this branch:** documentation, pure data-contract validation/tests, no runtime endpoints or accounts.

**Phase 1:** choose hosting/provider with owner, threat model, production-grade authentication, database migrations, private RBAC, admin read/write endpoints and audit history. Must be tested privately before launch.

**Phase 2:** content editing GUI, previews, rights-aware media management, revision/approval workflow, publishing to public static snapshots and rollback. Requires independent security + privacy + Yoruba editorial review and explicit release approval.

**Phase 3:** optional moderated community contribution intake as a *separate* safety milestone, age-appropriate guardian channels, withdrawals and training for moderators. No public user uploads or messaging by default.

## Acceptance tests before any real backend release

- An unauthenticated user can read only approved public content and cannot access/admin search for draft details.
- Contributor/editor roles cannot self-approve or escalate privileges; role forged in request body is ignored.
- Drafts cannot be published by merely setting state in a client request; publication is a server-side audited action.
- Cross-site request forgery, XSS, ID enumeration, file upload attacks, private-source leakage, rate-limit bypass, session replay and cache disclosure are covered.
- Undo/withdrawal removes public projection and cached copies with tested recovery.
- Yorùbá marks survive create/edit/preview/publish/search/export; distinct community variants remain distinct.
- No noindex removal or public deployment until expressly authorised.

**Owner's approval to continue backend development does not imply approval to deploy or start a public data-collection service.**
