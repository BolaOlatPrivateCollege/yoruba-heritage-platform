# Task 001M — Community Voices: security, consent and moderation gate

**Status: design + inert prototype only. This is not a live submission service.**

Owner-approved editorial intent: share community accounts **as the tellers understand them**, even when variants differ. Do not demand scholarly approval of a sacred belief or oral memory. Research and verification debates remain within the separate Research tab.

## Implemented in this draft

- One visible path from Community, the full Èṣù/Olódùmarè profiles and existing fictional episodes into **/community/share/**, a guided practice page.
- Types: another version, correction/addition, first-hand memory, inherited elder/family account, local folktale, belief explanation, question and self-authored fiction.
- Broad origin, how learned, language, age band, future attribution preference and a permission reminder.
- A preview of the text as a story card, rendered with **textContent**, not HTML injection.
- A clear distinction between public credit and private contact: the prototype collects neither contact details nor a saved credit identity.
- No API, no form submission, no upload, no database, no storage, no clipboard, no background network calls and no retained draft.
- All routes retain noindex/nofollow; demo prompts discourage entry of real personal or sensitive details.

**The demo check-box is not real consent. Do not use it to publish anything.**

## Future service design — independent PR and security review required

### Trust boundaries

1. **Public browser:** can create a draft but cannot create an approved story, read any pending item, set moderator roles or directly access files. Do not trust client flags for rights, age or moderation.
2. **Private intake API:** authenticated or anti-abuse controlled, same-origin, CSRF protected, per-identity/per-IP throttled, request size-limited and schema validated. Reject all unexpected fields. Uploads disabled in first live iteration. Review Nigeria-specific privacy/child-protection obligations and hosting data residency before release.
3. **Private database:** server-only storage for raw drafts, private contact and consent receipts; separate record and data access policies; encrypted at rest and in transit; explicit retention schedule; staff access and exports logged. Never embed pending accounts in static build artefacts, public JSON, sitemap, search index or client JS.
4. **Staff queue:** authenticated individual staff identities with MFA and least-privilege roles. Separate contributors from reviewers. Human review with an auditable decision and reason. Review rights, child safety, private identifying details, living-person allegations, restricted/sacred material, harassment and risk to the teller.
5. **Approved public projection:** render only expressly approved, consented fields (story type, agreed public credit, broad place/language/era when approved, body and version). No private contact, precise location, guardian identity, staff note, IP, abuse signal or unreviewed media. A withdrawn or blocked contribution must disappear from public feeds, static search and caches.

### Proposed private record fields

A server record should keep distinct:
- Stable internal ID, linked story ID (optional), contribution type, story title and body, language/dialect, broad place, approximate era, how learned.
- Teller/source relation and **private consent evidence**, including guardian/school mediation where required.
- Contributor age band; private contact only where necessary, with retention/deletion terms.
- Chosen public credit preference, specific display name if separately approved and publication-permission scope.
- Internal current status and status/event history, reviewer identity, moderation reason, timestamps.
- Public version ID and a separate explicit approval event; optional links to approved related tellings.
- Withdrawal, correction, rights concern and data-access request records.
- Any media as separately quarantined encrypted assets with owner permission, MIME/size verification, scanning, nonpublic access and stripped metadata; **not enabled in the first service PR**.

### Moderation lifecycle

- **Draft** (local or private) → **Pending private review**.
- Human moderator can move Pending → **Needs clarification**, **Held for privacy/consent/safety**, or **Rejected**. Those states never appear in public.
- **Approved for publication** only following an identifiable human review, explicit permission and a safe redacted public projection.
- **Published community telling** can coexist with an alternative account and keeps an editorial version history. Corrections never silently delete a previous contributor's distinct account.
- **Withdrawn** immediately removes the public projection, while internal legal retention and deletion obligations are handled separately. Public caches, search and media references need invalidation.
- No change may be made to another person's account simply to make it conform to a scholar or other teller. A moderator may refuse unsafe publication regardless of belief type.

### Youth, dignity and rights

- Students should **read freely without an account**. Real submissions by minors require an authorised guardian or school-supervised channel with verified approval; don't invite public contact details or direct adult-minor messaging.
- No exact addresses, phone numbers, email addresses, school IDs, location coordinates or identifying allegations in public story fields.
- Contributors must have a way to request edits, attribution changes, withdrawal or deletion. Never promise unconditional deletion when legal retention requirements may apply; explain the retention terms in the live service.
- Sacred/private knowledge and chants may require specific community authorisation; public availability elsewhere is not a reuse licence.
- Stories should be labelled by type and consented provenance—**Original fiction**, **Family telling**, **First-hand recollection**, **Community version**, **Sacred belief**—without a true/false badge or vote.
- AI illustrations must be visibly labelled and licensed for the intended use. Audio/photographs need independently cleared rights. The original Fola documentary tracks are unaffected.

### Required security evidence before a real intake service is authorised

- Threat model covering spam, CSRF, SSRF, XSS, exfiltration, public pending-data leaks, staff account takeover, unauthorised approval, replay, uploads, enumeration, re-identification and deletion failures.
- Data privacy/retention assessment, guardian/school approval design, public credit consent and rights/withdrawal UX review.
- Tests proving an unauthenticated user cannot query pending stories, approve/publish, inspect contact details or force public indexing.
- Negative tests for forged staff role, tampered approval, oversize payloads, ID enumeration, unsafe URLs, scripts/HTML, repeated submissions and inaccessible consent flows.
- Demonstrated staff-only approval queue, operational reviewer assignment, backups, withdrawal procedure, monitoring and incident response.
- The owner separately approves a production hosting approach, rollout, public privacy notice and actual collection. PR review alone does not start a service.

## Operational hand-off

**Phase A (this PR):** guided inert browser preview, explanatory design, automated no-network/no-persistence tests. School and community readers can review wording and flow without providing real data.

**Phase B (separate security PR):** server-side authenticated intake with text only, private queue and consent. Must not enable without a security reviewer and owner release decision.

**Phase C (separate editorial PR):** first permission-cleared stories from more than one community, approved variants, corrections, public credits and withdrawal routes. Never invent a first-hand account as a seed.

Existing Story, Research, archive, SEC-01 and five Fola recordings are not replaced. All branches remain private/draft until explicit subsequent approval.
