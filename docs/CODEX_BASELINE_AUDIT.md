# CODEX TASK 000 — Baseline audit and engineering readiness

Date: 22 November 2026. Repository: `BolaOlatPrivateCollege/yoruba-heritage-platform`.
Baseline main commit: `587d9969b43a1cf302381568fb9e3aa3f5c1afe9`.
Audit branch: `codex/000-baseline-audit`.
Scope: audit document only; no application/content changes, migration, deployment, production connections or merge.

## Decision

The expected content baseline is intact and existing checks pass. Proceed to task 001 only after owner review, with preservation and CI work first. This is a viable prototype, not a production-ready community service. The pilot static-file handler has a reproduced encoded-path disclosure flaw. Keep it local and never deploy it as the managed backend.

This audit establishes engineering preservation, not historical authentication, a penetration-test certification, an accessibility conformance statement, or a complete full-text review of the cited scholarship.

## Method and execution environment

Read AGENTS.md, README.md, EDITORIAL_POLICY.md and docs/CODEX_TASK_000.md completely before writing audit work. Also read SECURITY.md, ARCHITECTURE, ROADMAP, BASELINE, tasks 001/004, EDITORIAL_WORKFLOW, DATA_MODEL, ADR-001 and the author provenance guide. Inspected the complete tracked file inventory, module composition, rendering/routing, pilot request handling, archive loader and all existing tests.

The cloud GitHub connection supplied the pinned repository snapshot and branch operations. Commands actually ran in the available Windows PowerShell workspace, with Node v22.23.1, npm 10.9.8 and Python 3.12.10; these are not cloud CI results. Local gh authentication was invalid and git transport failed DNS/thread initialization; neither was repaired or bypassed with credentials. The authenticated GitHub connector remained operational.

All 47 tracked blobs were retrieved at the pinned commit and reconciled against their Git blob SHA-1 values before the final test run (0 mismatches). Temporary extraction newlines were removed only in the disposable test copy to match Git bytes. No upstream original was changed. No database was opened and no server listener was started. No existing private submissions were retrieved.

## Architecture and complete inventory

The prototype is a deferred-script, hash-routed browser application. Seven data scripts mutate the shared `window.HISTORY_DATA` in a required order; UI modules then consume that global. The VM loader executes only those seven trusted local data scripts, with a timeout and without browser/network globals. It must never be treated as a security sandbox for arbitrary contributor JavaScript.

| Files | Responsibility |
| --- | --- |
| index.html; styles.css; assets/favicon.svg | Document shell, navigation, search dialog, responsive green/bronze presentation, icon; CSS imports remote Google fonts |
| content.js | Original 18 articles, source base, timeline, places, people, glossary, quizzes, six community-history leads |
| knowledge.js; extended-sacred-arts.js | 43 plus seven thematic articles and source additions |
| sacred-atlas.js | 24 profiles and their 24 article records, taxonomy, misconceptions and regional evidence limits |
| deep-heritage.js | 16 research articles, learning paths, illustrative Odù data, pronunciation guidance |
| names-etymology.js | Two nine-section studies, extra references, pronunciation entries and pathway |
| research-authors.js | Three author dossiers, 15 references and author reading pathway |
| app.js | Central hash router; article sections, references, atlas, timeline, people, search, learning and bookmarks |
| sacred-atlas-ui.js; deep-heritage-ui.js | Filtered Sacred World/research directories, illustrative matrix, approved-audio gate |
| community.js | Library/alphabet/innovation tools, API discovery, discussion/comment/intake forms, private local drafts/export |
| server.py | Local-only ThreadingHTTPServer, SQLite schema, pending intake, public approved-only lists, Basic-auth moderator dashboard |
| scripts/load-archive.mjs; tests/content.test.mjs | Archive assembly and 12 baseline assertions |
| package.json; package-lock.json | Dependency-free Node verification commands; no Astro app yet |
| assets/pronunciation/README.md | Native-audio rights/review requirements; no recordings in snapshot |
| AGENTS.md; README.md; SECURITY.md; START_HERE_TECH_LEAD.md | Engineering, use and security instructions |
| EDITORIAL_POLICY.md; OGUNDIRAN_READING_GUIDE.md; SACRED_NAMES_RESEARCH_NOTE.md; SACRED_WORLD_RESEARCH_GUIDE.md | Evidence, attribution and research restrictions |
| TEST_REPORT.md; TEST_REPORT_2026-11-22.md | Prior validation records, not substituted for this run |
| docs/ARCHITECTURE.md; docs/decisions/ADR-001-architecture.md; docs/DATA_MODEL.md | Proposed technology, trust boundaries and relational model |
| docs/ROADMAP.md; docs/STATUS.md; docs/BASELINE.md; docs/REPOSITORY_SETUP.md; docs/DEPLOYMENT_CHECKLIST.md | Planning, setup and release gates; several stale assertions |
| docs/CODEX_TASK_000.md through docs/CODEX_TASK_004.md | Scoped audit/import/research work instructions |
| docs/EDITORIAL_WORKFLOW.md; docs/RESEARCH_INTEGRATION_AUDIT.md; docs/OLUWOLE_ELEBUIBON_ABIMBOLA_RESEARCH_GUIDE.md; docs/AUTHORS_INTEGRATION_TEST_LOG.txt | Editorial model and prior research-integration evidence |

Articles use stable IDs and section-level sourceIds. Article rendering resolves those references into the catalogue. Menus route via hashes; the root HTML contains no prerendered article body. Search scans normalized data while canonical text retains diacritics. Bookmarks and offline contribution drafts use localStorage.

Community records are published research leads, not six newly authenticated interviews. Live pilot submissions default to pending. Only approved threads/comments are publicly selected; testimony submissions never become public merely through approval. Admin review updates status/reviewed_at, but has no immutable decision history. Direct media upload is absent. Static hosting alone cannot supply the pilot API.

## Verified preservation

| Dataset | Expected | Actual |
| --- | ---: | ---: |
| Chapters | 113 | 113 |
| Source records | 128 | 128 |
| Community-history records | 6 | 6 |
| Sacred World profiles / articles | 24 / 24 | 24 / 24 |
| Deep research articles | 16 | 16 |
| Sacred-name studies | 2 | 2 |
| Author dossiers | 3 | 3 |

Composition: 18 original + 43 thematic + 7 extension + 24 Sacred World + 16 research + 2 names + 3 authors = 113. The shared knowledgeChapters array contains 95; it is a subset/index, not another 95 independent chapters. Additional inventories: 24 timeline events, 11 places, 12 people, 30 glossary entries, 15 quiz questions, 10 research pathways, 16 principal Odù labels and 15 pronunciation entries.

Preserved community IDs: ibadan-oriki, ibadan-local, oyo-local, ijebu-interviews, ibadan-audiovisual, palace-heritage.
Preserved author IDs: author-sophie-oluwole, author-ifayemi-elebuibon, author-wande-abimbola.
Name study IDs: deep-name-olodumare, deep-name-orisa.

Existing tests confirm unique nonempty article/source IDs, registered article/section/community citations, linked timeline/atlas/people records, Sacred World taxonomy and seven-section profiles, research links and nine-section name studies. Git-byte reconciliation adds stronger preservation evidence than the existing Unicode test, which only checks representative letters; future imports need per-record text/Unicode equality.

## Commands and observed results

| Command/check | Result |
| --- | --- |
| npm ci --ignore-scripts | Exit 0; audited one package; zero reported vulnerabilities; no third-party runtime dependencies |
| npm run verify | Exit 0; 11 JavaScript syntax checks and 12/12 content tests passed |
| python -m py_compile server.py | Exit 0; syntax compiled; does not test runtime API behavior |
| Git blob reconciliation, all tracked files | 47/47 match; final rerun had zero mismatches |
| Repeated npm run verify after byte reconciliation | Exit 0; 12 passed, 0 failed/skipped |
| Offline synthetic HTTP handler probe | Normal GET /server.py -> 404; GET /%73erver%2epy -> 200 and source body; HEAD /server.py -> 200 metadata |
| Lint/typecheck/build/migration integration | No configured scripts, TypeScript project, Astro build or migration implementation in baseline |
| Browser E2E / visual / keyboard / contrast / screen-reader | Not executed; no browser test harness exists in repository |
| Live API / RLS / external link availability / load tests | Not executed; no services connected, no production traffic generated |
| Cloud GitHub Actions | Workflow absent from pinned tree; no green CI claim |

The handler probe instantiated Handler with an in-memory fake socket, a localhost request and BytesIO output. It did not start HTTPServer, call init/connect, create SQL tables or contact a service. The sensitive-file inference below follows the same raw-path-vs-decoded-path mismatch; no private database was accessed. These temporary probes are not application changes and are not included in this document-only PR.

## Findings and prioritized risks

| ID / priority | Evidence and impact | Recommended treatment and acceptance |
| --- | --- | --- |
| SEC-01 High; public exposure blocker | server.py:154–183 filters a raw parsed URL path then delegates to SimpleHTTPRequestHandler, which decodes it. Encoded source path reproducibly returns code; encoded private directory/suffix paths could evade the same filter. Inherited HEAD bypasses do_GET filtering; directory listing and non-allowlisted repository files remain reachable. | Keep pilot local. Separate follow-up: canonicalize path once, enforce an explicit public-file allowlist/root, deny private/symlink escapes and directory listing for GET and HEAD; regression tests for encoded/mixed paths. This is a conditional disclosure risk for files present under the serving root, not evidence of a production breach. |
| SEC-02 High before public intake | server.py:126 origin validation compares netloc to request Host, allows absent Origin/Referer, and has no fixed trusted-host policy or CSRF token. Basic-auth editor has no login throttle or individual identities. | Replace pilot with managed Auth and trusted server authorization; if pilot retained, fixed loopback/trusted hosts, scheme-aware origin policy, CSRF protections and auth throttling. Test hostile Host/Origin combinations and denied moderator mutations. |
| SEC-03 Medium | server.py:220 accepts any truthy consent (e.g. text 'false'); submissions lack consent version/scope/revocation metadata. Article target validation at 209–217 is largely a prefix/length heuristic, not an archive membership check. | Require consent === true at intake, explicit scoped rights records and canonical target membership. Test wrong JSON types, unknown IDs and revoked permissions. |
| SEC-04 Medium | server.py:195 overwrites review status/timestamp; no actor/reason/history. One shared editor credential cannot establish individual accountability. | Separate immutable moderation actions and editorial publication approval; test that contributors cannot self-approve or alter audit history. |
| SEC-05 Medium | server.py:87 delegates access logging, including request URL/query, despite a no-private-data logging intention. CSP permits inline script and broad https/data resources. Rate limiting trusts peer IP, lacks auth throttling and has no explicit socket/body-read timeout. | Minimize/redact logs; narrow CSP after inline-handler removal, enforce edge/app throttles and request timeouts. No claim that current CSP prevents all XSS. |
| PRIV-01 Medium | community.js:20–28 persists contribution bodies/contact data in unencrypted browser storage; parseable wrong-shaped cached JSON can break draft operations. Deletion/export controls exist but storage is not confidential on shared machines. | Schema-check draft storage and provide deliberate save/expiry UX. Keep testimony/consent/contact outside public content and search. Retention/deletion/backup restoration need approved operational design before intake. |
| ENG-01 High readiness gap | .github/workflows/quality.yml and PR template are documented as implemented but absent from all 47 tracked files. No tracked .gitignore is present; pilot private_data and future .env files risk accidental staging. | Task 001 begins with CI and private/generated-file exclusions; test from clean checkout. GitHub protection settings were not verified, so do not assume enforced review. |
| ENG-02 Medium | Global mutable data, ordered side-effect scripts, repeated escaping/search logic, large template strings and no type/lint/API tests. Existing count/source tests cannot detect all content rewrites or broken click behavior. | Add typed, pure extraction with per-record hashes, ID map, schema/FK gates and meaningful browser/API tests; retain baseline tests. |
| BUG-01 Medium, code-confirmed edge case | app.js:97 calls decodeURIComponent on location.hash without guarding malformed escapes; a link containing #article/% can throw before routing. | Catch URI errors and render safe not-found; smoke-test malformed hashes and all 113 valid article routes. |
| A11Y-01 Medium, static-review finding | Search dialog has focus entry/restore and Escape but no focus trap or inert background; route replaces main without moving focus to content. Interactive/filter results lack comprehensive announcement handling. | Browser keyboard and screen-reader checks, modal containment and route focus handling. Existing skip link, semantic controls and reduced-motion CSS are strengths; no WCAG pass asserted. |
| PERF-01 Medium | 555,694 uncompressed JavaScript bytes load for every route, including all content; global search normalizes/scans full sections on each input. Remote font @import and images add third-party requests/offline limitations. | Static article output, interaction islands and prebuilt search index; measure compressed transfer and device performance before setting budgets; confirm font/image rights and local options. |
| DOC-01 Medium | BASELINE still says 68/64; README preserves 68/92/110 milestones; STATUS still says repository creation blocked. Task 004 goal mentions 110 while acceptance says 113. | Reconcile current versus historical milestones in a later scoped docs change; authoritative observed baseline is this pinned 113/128 inventory. |

SQL values are parameterized and the dynamic moderation table name is allowlisted. HTML escaping is present in community/admin render paths, public queries omit private contact fields, body sizes are bounded and bind defaults to loopback. These are useful controls but do not neutralize the disclosure finding or establish production readiness.

## Editorial and provenance audit

No source-register title/institution matches an authored Samuel Johnson work under the current automated exclusion rule. Mentions of Johnson in safeguards are policy warnings, not permission to use his books. The regex does not inspect third-party bibliographies or establish historical independence.

Concrete review queue, without rewriting content:
- authors-oluw-book / author-sophie-oluwole: the recorded 2017 edition bibliography includes Johnson. Attribute Olúwọlé's own philosophy; isolate chronology and claims about Ọ̀rúnmìlà until independent evidence and exact inspected passages are recorded. Keep 2014/2017 editions distinct.
- ogundiran2020: publication/reception lead, not a full-text/page-verified authority for every chapter. Audit each attached historical assertion before raising verification status.
- ibadan-oriki: original performer/date absent; ibadan-local and oyo-local: original texts not reviewed; ijebu-interviews: abstract only; ibadan-audiovisual: preservation project, no inspected recording; palace-heritage: programme, not an individual authenticated testimony.
- Sacred profiles and both name studies: regional/custodian review is outstanding; historical etymologies remain contested. Museum objects do not prove supernatural events.
- deep-ghost/deep-cave and historical periodization: distinguish model/inference, dated material and population-level interpretation; no narrative about a named modern community follows automatically from genetic or archaeological evidence.
- Ifá grid is an illustrative mathematical comparison; fifteen pronunciation entries are guidance/audio-ready records, not authenticated native recordings.

Current evidenceType/evidenceNote strings are helpful but do not enforce claim-level sources, inspected pages, community scope, rights, revision history or reviewer approval. A linked catalogue is not passage evidence. External full texts and all URLs were not individually verified in this engineering audit; source validity checks here establish internal ID resolution and HTTPS syntax.

## Proposed architecture evaluation

Recommendation: retain ADR-001 direction, stage the work and defer live services. Astro content collections and TypeScript fit the read-heavy archive; static HTML removes the all-content JavaScript requirement and islands retain learning tools. Start with lossless structured JSON section records rather than immediately converting prose to MDX, which can interpret angle brackets/braces or execute components. Contributor text must never become executable MDX.

Supabase is a reasonable later managed backend, conditional on default-deny RLS, private storage, trusted staff roles, audited publication functions, controlled exports, and positive/negative role tests. Auth alone is not authorization. Secret/service-role credentials bypass RLS and must never enter browser bundles or static builds. Separate the private intake store from Git publication records and approve the publication path before implementing it.

Cloudflare Pages is compatible with the proposed static output; no SSR adapter is needed for a purely static reading site. Defer platform-specific server work; confirm the chosen supported Astro/adapter versions when implementation begins. Public previews must not contain restricted testimony or secrets. Cloudflare Workers is an alternative for future runtime needs, not a reason to replace the approved static plan now. No provider resource or deployment is created by this audit.

Official documentation consulted 22 November 2026:
- https://docs.astro.build/en/guides/content-collections/ — schemas, local loaders and static routes.
- https://supabase.com/docs/guides/database/postgres/row-level-security — database authorization and bypass-role boundaries.
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/ — Pages Astro delivery/build integration.

## First proposed Astro schema (design only)

Use web/src/content.config.ts with defineCollection, file/glob loaders and Zod schemas. Pin supported versions in task 001. Preserve legacy field names/text in a raw import fixture and map explicitly into the normalized publication model.

| Collection | Required fields / validation |
| --- | --- |
| articles | legacyId, slug, title, deck, language, collection, ordered sections[{heading, paragraph, sourceIds}], sourceIds, evidenceBasis[], evidenceNote, verificationStatus, editorialStatus, regions[], communityScope, rightsStatus, revisionHistory[], importOrigin{commit,module,recordHash} |
| sources | legacyId, institution, title, kind, url (HTTP(S), canonical public baseline HTTPS), detail, authors[], workId/editionId nullable, inspectionStatus, inspectedLocators[], evidenceLimits, johnsonDependency{status,reviewNote}, rightsStatus |
| communityLeads | legacyId, community, type, title, summary, context, originalStatus, sourceIds, readUrl, testimonyStatus; no inferred consent or narrator |
| sacredProfiles | legacyId, name, articleId, kind, scope, confidence, misconceptions[], communityNeeded, sourceIds; preserve exact original fields plus import hash |
| people/works/editions | stable IDs, authors/editors, edition/year, catalogue identifiers, inspected status and source IDs; distinguish biography from sacred narrative |
| claims | article/section locator, exact claim, source/edition/passage links, evidence class, community scope, review status and excluded-source-dependency check |
| learning data | stable IDs, glossary/timeline/place/quiz/Odù/pronunciation data, valid article/source references and permissioned audio metadata |

Do not default imported records to verified/published/rights-cleared. Use explicit unreviewed/unknown states while retaining original evidence wording. Empty region or unknown permission must remain a visible review issue. Publication status and academic verification are independent. A source bibliography exclusion check is supplemented by human dependency review.

Cross-collection checks: unique stable IDs/slugs; source/article FK resolution; exact section ordering and Unicode/text equality; baseline ID-set equality; no source loss; all 24 profiles mapped; 6 community leads remain leads; author edition distinctions; reviewed audio rights; section-specific references; no private fields in static output. Preserve original strings without normalizing canonical display; search-only normalization is separate.

## Prioritized implementation plan and gates

| Order | Task / scope | Exit gate |
| --- | --- | --- |
| P0 | Review this audit; retain pilot-only restriction; separate security fix if pilot continues to be used | SEC-01 regression cases denied for GET/HEAD; no original content change |
| P1: CODEX_TASK_001 | Separate web/ Astro + strict TypeScript; CI/exclusion rules; lossless importer, source schema and preservation manifest first | Existing 12 tests plus clean install/build/type/lint checks; exact 113/128/6/24 IDs and per-record text hashes; zero unintended root diff |
| P2 within task 001 | Reading list/detail and design parity; source/evidence badges; compatibility mapping; browser harness | Every article route/source link resolves; representative desktop/mobile screenshots, keyboard/modal/search/quiz checks; malformed route handled |
| P3 | Structured claim/edition provenance and source-of-source review | Unknown dependencies stay unresolved; no catalog-only claim upgraded; community review and rights traceable |
| P4 after separate authorization | Isolated non-production backend design/implementation and role matrix | Anonymous/author/reviewer/editor/admin allowed-and-denied RLS tests; no self-approval, private leakage or service key exposure |
| P5 | Operational/public-release review, not authorized in this task | Retention/consent, incident response, restore tests, abuse controls, accessibility and performance acceptance, explicit owner deployment approval |

No automatic task 001 implementation follows this PR. The recommended next assignment is its preservation/CI/importer foundation, with pilot hardening handled separately if ongoing pilot use is needed.

## Availability, compatibility and rollback

Leave every root website file and hash ID intact. Build web/ separately with no DNS/domain changes. Keep the legacy shell accessible for offline/local use and as the rollback artifact while new routes are tested. Hash fragments are not sent to servers: old #article/<id> links require a client compatibility resolver or a retained legacy entry, not server redirects alone. Keep section fragment IDs and bookmarks mapped explicitly. Do not silently transfer localStorage drafts into a shared backend.

Future cutover needs independently approved routing and hosting steps, an immutable artifact of this pinned version, parity tests and a rollback rehearsal. During that future cutover the original site remains selectable until acceptance; this PR performs no cutover. Document-only rollback is simply reverting this report commit.

## Handoff and limits

Only docs/CODEX_BASELINE_AUDIT.md is proposed for change. Content wording, citations, diacritics, source/community policy, root site and research references remain unchanged. No production services, SQL migrations, deployment, secrets or private records are involved. No merge is authorized.

The audit is ready for engineering review; public service readiness is blocked by the security/operational gaps. Browser interaction parity, comprehensive historical validation and managed-backend security remain unverified work.
