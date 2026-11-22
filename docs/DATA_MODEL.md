# Relational data model draft (design input, not an executed migration)

## Core tables
- `profiles` (auth user ID, public display name, private contact separated, created_at)
- `staff_roles` (user ID, role, granted_by, reason, expiry, audit fields) — no user-controlled role assignments
- `communities` (name, geographical scope, alternate names, ambiguity notes)
- `articles` (stable ID, slug, collection ID, public status, current version ID)
- `article_versions` (article ID, version, language, title, body, author/editor, change note, submitted_at)
- `sources` (bibliographic information, source type, first-hand/second-hand, evidence limits, inspected status)
- `article_claims` (specific claim text, article version ID, evidence class, verification status)
- `claim_sources` (claim ID, source ID, exact passage/page when verified, strength, context)
- `oral_testimonies` (submitted_by, community ID, account, interview metadata, visibility, permission ID, embargo)
- `permissions` (source/person/asset ID, consent scope, restrictions, expiry, revocation and audit)
- `media_assets` (private key, owner/rights, safe derivative key, moderation status, checksum)
- `threads`, `replies`, `comments` (authors, target IDs, statuses, timestamps, report count)
- `reports` (reporter, content reference, reason, status, action taken)
- `moderation_actions` (actor, object, previous/new state, reason, immutable date)
- `audit_events` (actor, action, entity, timestamp; restrict read access)

## Security invariants
- No public SELECT on pending comments, private source submissions, narrator private contact or restricted media.
- Published content only through approved editorial path; user cannot approve their own posting.
- Browser cannot write review status or staff role; authorization enforced in database and backend.
- Article source citations cannot refer to nonexistent source IDs.
- Claims cannot become 'verified' because a comment reaches 'approved'.
- Deletes/withdrawals preserve appropriate audit records while respecting legally valid erasure requests.
- Public search indexes include only published, rights-cleared data.

## Data migration
Map legacy `content.js`, `knowledge.js`, `extended-sacred-arts.js` into structured collections with a reversible export, ID map and count assertions. Do not migrate private SQLite records without a separate explicit consent/ownership review.
