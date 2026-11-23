# Owner decisions and provider evaluation — 23 November 2026

**Project:** Àṣà & Ìtàn Yorùbá — cultural heritage platform for everyone (not a school portal).

## Decisions expressly confirmed by owner
- **Hosting:** choose a separate hosting provider; do not reuse the existing VPS by default.
- **Initial administrators:** one owner only. No invitation, account or additional administrator should be provisioned automatically.
- **Publication:** only the owner may expressly approve *and initiate* publication; nothing auto-publishes because a reviewer marked material approved.
- **Release authority:** do not deploy, merge, publish or activate collection until the owner separately approves release.

## Proposed independent hosting (not purchased or selected by account connection)

**Recommended first evaluation: Render**, using a production paid **private web/API service** and managed **PostgreSQL**, with the static Astro site deployed as a distinct static service only upon explicit release approval. This limits the number of operational providers and aligns with the existing PostgreSQL SQL migration and separate server architecture.

Verify pricing, region availability, backup retention and recovery, staging separation, security controls, media storage, DNS/custom domains, and service-to-database private networking before committing. Do **not** use temporary free databases for production cultural archives. Render services can have ephemeral local filesystems; CMS media and durable content must reside in managed storage/database, **never** process-local uploads.

**Alternative:** Cloudflare Pages for the static reader, with a separately hosted protected editor API and managed PostgreSQL (e.g. Supabase/Render). This may improve global delivery but adds cross-provider operational complexity, private asset and build orchestration decisions.

**Independent sources checked 23 November 2026:**
- https://render.com/pricing
- https://render.com/docs/postgresql-creating-connecting
- https://render.com/docs/faq
- https://developers.cloudflare.com/pages/
- https://supabase.com/pricing

Costs and availability are subject to provider changes. No payment, account, DNS, app deployment or external provider connection is made here.

## Minimum secure owner account
- Owner account bootstrapped only through a controlled, out-of-band administrative process; never an openly accessible create-admin/signup route.
- Strong password or passkey, MFA (mandatory for owner publish), verified account recovery, email notifications on suspicious logins, credential rotation and short-lived sessions.
- Authenticated server derives account ID/role; no trust in JavaScript-side role, account or consent fields.
- Strict origin-based CSRF checks, session cookie flags, login throttling, content security policy, audited owner actions and secret management.
- Initially no editor invitation function and no default administrator password.
- No production database credentials checked into GitHub or shipped to the static Astro bundle.

## Manual owner publishing contract
1. Owner edits or creates a **draft** in a private editorial application.
2. The system saves immutable **revision snapshots** and audited events in a transactional database.
3. Owner previews the proposed reader page and checks narrator, credit, rights, Yorùbá diacritics and sensitive community information.
4. A distinct **approve** action records approval/consent checks (separate reviewer where required).
5. A distinct **Publish this approved revision** action requires fresh owner MFA, human confirmation and the exact revision; the server re-verifies rights and permissions.
6. Only a controlled publisher builds a sanitised *public projection* and atomically updates the static reader. Log resulting build ID and allow withdrawal/rollback. Failed publishing never silently advances public content.
7. Publication of archived 113 original articles, 128 sources, or documentary Fola audio is not part of an automatic CMS migration.

### Code delivered in this step
- `web/src/lib/editorial-release-gate.ts` is a **pure, fail-closed policy validator** for owner-only manual release, exact revision and mandatory clearance. It is not authenticated by itself, does not persist or publish, and must run only with server-derived context.
- `web/tests/editorial-release-gate.test.mjs` checks owners versus nonowners, MFA, approvals, revisions, explicit confirmation and media/contributor clearance.

## Gates remaining before real implementation or launch
1. Owner agrees to actual provider account, costs and data region **before creating any paid resource**.
2. Security design for authentication, DB isolation, account recovery, immutable audit logging and backups.
3. Implement private admin HTTP application, transactional PostgreSQL repositories, protected media storage and owner-only publication service.
4. Run threat-model tests, independent privacy/consent review, restore drill, actual manual visual tests and release plan.
5. Obtain explicit deployment/merge/publication approval. Until then, all services stay non-operational private development artifacts.

**This memo is not authorisation to deploy.**
