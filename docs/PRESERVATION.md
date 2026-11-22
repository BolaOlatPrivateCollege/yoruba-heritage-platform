# Task 001A — exact baseline and offline import

## SEC-01 follow-up: versioned code-only revision

The original `preservation/baseline.json` remains byte-identical. The separate
`preservation/security-revisions/sec-01-v1.json` proposes one reviewed exception
for server.py only, with exact old/new hashes, original-manifest hash and the
unchanged archive hash. Verification pins both the historical manifest and this
specific revised server hash. Content files and every archive record still match
the original baseline; no wording, source link, rights or review state changes.

The rest of this document records Task 001A's original implementation. After
SEC-01, the original-manifest candidate command intentionally refuses current
server bytes; it cannot fold a security revision into the original baseline.
Any further server change requires a new separately reviewed version, not editing
SEC-01-v1 in place or regenerating baseline.json. See docs/SEC_01_REVIEW.md for
the effective preservation contract, tests, security limits and rollback.

Issue #3; branch `codex/001a-ci-preservation-import`. The starting main commit is
`587d9969b43a1cf302381568fb9e3aa3f5c1afe9`. Audit PR #1 remains separate;
its report was read from `codex/000-baseline-audit` without assuming it was merged.

## Reproduce from a clean checkout

Use Node 22.23.1 and Python 3.12.10 (CI pins both on ubuntu-24.04):

```sh
npm ci --ignore-scripts
npm run verify
npm run verify:preservation
python -m py_compile server.py
```

The original verify command still executes the original 12 tests. The new gate
verifies the frozen manifest, runs preservation/negative tests, runs the offline
import CLI, and checks tracked files against private/generated exclusions.
No third-party dependencies were introduced. No server or database is needed.
`npm test` runs both legacy and new gates. The new modules are parsed by these
tests; a TypeScript compiler, Astro build and browser UI tests are outside 001A.

## Preservation contract

`preservation/baseline.json` is checked in. It records the source commit, SHA-256
of 16 protected original files, a complete archive hash, every top-level field,
array inventory and each ordered record's original ID (if present) and full-data
SHA-256. Records without a legacy ID retain their original index; no historical
ID, claim, citation, consent or rights status is invented.

| Dataset | Count |
| --- | ---: |
| Articles / sources / community leads / sacred profiles | 113 / 128 / 6 / 24 |
| Timeline / places / people / glossary / quiz | 24 / 11 / 12 / 30 / 15 |
| Research paths / principal Odù labels / pronunciation | 10 / 16 / 15 |
| Knowledge categories / knowledgeChapters / categories | 12 / 95 / 29 |
| Sacred articles / deep studies / name studies / author dossiers | 24 / 16 / 2 / 3 |

The 585 array entries include shared indexes/subcollections, not 585 independent
chapters. All 20 archive properties, including review metadata, are covered.
Original module bytes are verified BEFORE the legacy loader executes its seven
hardcoded trusted scripts. The VM is not a sandbox for untrusted submissions.
The importer does not discover arbitrary JavaScript, accept source paths, load
private_data, read environment secrets, call a network or open a database.

Canonical JSON sorts object keys, retains array/section order, and preserves
every string code point, internal whitespace and URL. It does not trim, remove
tone marks, normalize NFC/NFD, translate or rewrite anything. UTF-8 with LF and a
single final newline is used for the artifact encoding; this does not change
the whitespace within article strings. Non-JSON values fail rather than being
silently dropped. The original script hashes also detect code comments and
whitespace changes; `.gitattributes` disables checkout line-ending conversion.

Source references and article/pathway/profile relations are independently
validated. Subcollection article records must equal their canonical article.
The existing authored-work exclusion remains; indirect Johnson dependence is
still a human provenance-review question, never automatically cleared.

## Generated artifact and sensitivity

`npm run archive:import` writes ONLY `generated/archive/archive.json`:

- `archive`: complete lossless legacy data, with no dropped fields.
- `supplementarySourceText`: exact inert community.js and deep-heritage-ui.js
  text, preserving alphabet/innovation/tool material outside HISTORY_DATA.
- provenance and separate conservative defaults: claims unreviewed, rights
  unknown, publication approval not granted. Existing evidence labels remain
  untouched, and no native-audio permission or source verification is inferred.

This JSON duplicates repository-visible research drafts and tool source. It is
not a publication approval or a private-submission export. It is ignored, not
committed, not an Actions upload and not part of a public build. No real
testimony/contact/consent database or recording is included. Do not serve the
repository root with the pilot: Issue #2 remains an unresolved deployment blocker
and could expose generated files as well as other filesystem material.

Identical reruns leave identical bytes. A differing existing artifact is refused;
inspect it and delete only `generated/archive/archive.json` if appropriate, then
regenerate. Directory/file symlinks at output locations are rejected. No CLI
source, destination or refresh flags are accepted.

## Manifest update and review procedure

Normal import, verification and CI NEVER update baseline.json. For a reproduction
candidate from this unchanged baseline, explicitly run:

```sh
node scripts/manifest-candidate.mjs --candidate-for-review 587d9969b43a1cf302381568fb9e3aa3f5c1afe9
```

This verifies protected bytes and creates a new exclusive-create
`preservation/baseline.candidate.json`. It refuses to overwrite an existing
candidate and never replaces baseline.json. Compare it byte-for-byte with the
approved manifest; a reproduction must be identical. Candidate files are ignored.

For an intentional future content change, stop on verification failure. Open a
separate editorial/preservation issue with original/proposed record diffs, IDs,
rights/provenance reasons and owner approval. Revise the pinned source commit,
explicit file hashes and affected expectations in a reviewed branch; generate a
separate candidate from the explicitly approved source. This initial generator
deliberately cannot bless modified source bytes. Do not add an automatic refresh
or bypass flag. Review record changes, exact Unicode/wording and source/rights
impact before manually replacing the manifest. CI cannot establish human approval;
require review/branch protection administratively (main currently reports unprotected).
No approval is implied by a hash match or a passing test.

## CI and exclusions

`.github/workflows/quality.yml` runs on PRs and pushes to main, with read-only
contents permission, pinned action commit SHAs, fixed runtimes, timeout and no
persisted checkout credential. No deploy, infrastructure, artifacts or secrets.
`.gitignore` excludes private_data, env files, databases/WAL, backups, private-key
files, dependencies, caches, generated imports and build output. Ordinary research
PDF/ZIP/JSON files remain eligible. Ignore rules are not encryption or a substitute
for review; the tracked-file gate catches even force-added ignored paths, but is
not a complete credential-content scanner. Never commit private records.

## Results and limits

Implementation results and the GitHub run are recorded in the PR. No legacy
frontend/source/server wording changed. No Astro interface, migration, hosting,
production connection, SQL operation or deployment occurred. Security Issue #2
is unchanged and must remain a public-deployment blocker. Browser, full-text
historical, linguistic expert and media-rights validation remain separate work.

Rollback: revert this task's CI/config/scripts/tests/docs/manifest commit. The
root site requires no rollback or data migration because it was not modified.
