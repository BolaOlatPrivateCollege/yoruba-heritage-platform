# Task 001A validation record

Date: 22 November 2026. Issue #3; PR #4.
Branch: `codex/001a-ci-preservation-import`.
Starting main: `587d9969b43a1cf302381568fb9e3aa3f5c1afe9`.
Audit PR #1 was read separately and is not included in this branch.

## Executed checks

| Check | Result |
| --- | --- |
| npm ci --ignore-scripts | Pass; one package audited; zero reported dependency vulnerabilities (no third-party packages) |
| npm run verify | Pass; 11 original JavaScript syntax checks; all 12 original content tests unchanged |
| npm run verify:preservation | Pass; frozen-file/archive gate; all 24 preservation tests; deterministic JSON CLI; tracked-file exclusion gate |
| npm test | Pass; executes both verification gates |
| python -m py_compile server.py | Pass; compilation only; no listener, database or service execution |
| Candidate reproduction | Exact same bytes as checked baseline; second creation correctly fails EEXIST, approved file untouched |
| Remote Git blob comparison | Only package.json, docs/BASELINE.md and docs/STATUS.md differ among 47 original files; 44 unchanged |
| GitHub Linux workflow | Initial implementation run completed successfully; see run/job links below |
| Post-review test refinement | All 24 tests pass locally after strengthening the protected-file mutation fixture |

Local environment: Windows PowerShell, Node 22.23.1, npm 10.9.8, Python 3.12.10.
Cloud CI: ubuntu-24.04, pinned Node 22.23.1 and Python 3.12.10.

GitHub evidence for implementation commit `8b57a061bfab0af6f9e07fca74e3deacb4d7b979`:
- [Successful workflow run](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/44996409063)
- [Job and step log](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/44996409063/job/137128279820)

This record is added after that run. The PR Checks tab supplies the separately verified final-head run, including this document and the strengthened test fixture. A historic green run must not substitute for checking a later head.

## Preservation evidence

Complete archive canonical SHA-256:
`89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2`.

Deterministic generated JSON SHA-256 (including inert supplemental tool source text):
`49d0e679f5137f4551eefa8812d4bc4a2738f5cd51a413229a79153db5fd828e`.

Manifest freezes 16 original file-byte hashes, all 20 archive properties and 585 ordered array entries (including shared subcollections). Counts: 113 chapters, 128 sources, six community leads, 24 Sacred World profiles; 24 timeline entries, 11 places, 12 people, 30 glossary terms, 15 quiz items, ten research pathways, 16 Odù labels, 15 pronunciation entries; 16 deep studies, two name studies, three author dossiers, 24 sacred articles and 95 knowledge-index articles. No record or wording was edited.

Negative tests reject wording changes, NFD normalization, missing underdots, extra whitespace, reordered sections, dropped/added fields, duplicate/replaced IDs, lost records, broken source/article links, altered learning material, review metadata changes and excluded authored source records. Full importer equality verifies original fields and ordered ID sets, not counts alone. Protected-file tests first validate a complete copied fixture then alter source bytes. Additional checks exercise output overwrite refusal, unsupported CLI paths and private/generated exclusions while keeping ordinary research artifacts eligible.

Development checks caught a cross-VM object-prototype comparison issue and an initially ineffective underdot mutation fixture; both were corrected. Adding supplementary inert source text intentionally made a previous generated artifact stale; the importer correctly refused it, and only that disposable JSON artifact was removed before regeneration. No legacy file was changed to make a test pass.

## Files and artifacts

Added: .github/workflows/quality.yml; .gitignore; .gitattributes; preservation/baseline.json; scripts/preservation.mjs, import-archive.mjs, manifest-candidate.mjs, verify-preservation.mjs, check-tracked-files.mjs; tests/preservation.test.mjs; docs/PRESERVATION.md; this record.

Updated only: package.json scripts and docs/BASELINE.md / docs/STATUS.md current-status statements.

Ignored local artifacts: generated/archive/archive.json (repository-visible research draft data plus tool text, not publication-approved); preservation/baseline.candidate.json (hashes/IDs only); Python bytecode. No artifact contains a database export, new recording or private submission. Nothing is uploaded as a workflow artifact or public build.

## Remaining limits and rollback

Issue #2 is unchanged and remains a public-deployment blocker. No server was started. A Git ignore rule does not secure an HTTP-serving root or scan every possible embedded secret. Main currently has no branch protection; owner-enforced required reviews/checks remain necessary.

No Astro UI, TypeScript application, browser E2E, full academic verification, new media-rights clearance, production service, SQL migration, hosting or deployment is included. Samuel Johnson dependency checks do not establish independence of external scholarship. Rights remain unknown and claims unreviewed in import defaults.

Rollback is reverting this scoped commit series; the existing site and content have no migration to reverse. Do not merge/deploy without explicit owner approval.
