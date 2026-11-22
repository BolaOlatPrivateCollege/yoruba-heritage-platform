# Task 001H — bounded regional histories pilot

Issue #19, branch `codex/001h-regional-history-perspectives`.
Baseline verified: `20e666aec812cbcb822c14ca3dc495eb5a7cc9df`.

## Prerequisite and scope

PR #18 was already merged by the owner account. Its post-merge Archive quality
45030193963 and Reading interface 45030193962 both passed. The owner’s separate
[prerequisite-clearance comment](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/issues/19#issuecomment-7080236070)
explicitly authorised Task 001H implementation. This agent did not merge PR #18.
No open PRs or unrelated/uncommitted changes existed at kickoff. Native Git
fetch failed with getaddrinfo; the connected service supplied the exact signed
merge commit and verified tree, which matched the complete local tracked tree.
The reconstructed local commit hash was checked before creating the branch.

Issue #19 and its comments, AGENTS, editorial policy/workflow, architecture,
roadmap, preservation/security contract, Sacred World safeguards, previous
story/source patterns, Task 001F audit/expansion plan and Task 001G review/schema
informed this work. The approved baseline has 158 tests.

Deliver **one** regional documentary story, not a quota of three: Abẹ́òkúta
taxation and representation, 1946–1953. A two-place discovery page links this
story and separate original Abẹ́òkúta and Ìbàdàn archive anchors. Ìbàdàn is
explicitly a preserved reading, not a new authenticated town history. The market
and council material belongs within the Abẹ́òkúta case; it is not repackaged as
a third supposedly independent case study.

## Internal dossier A — Ìbàdàn

INTERNAL-001H-DOSSIER. Research voices needed: internal regional queue.
Canonical lead: `ibadan-abeokuta`, section 1. No canonical wording adopted as a
newly verified statement. Keep this brief separate from the Abẹ́òkúta brief.

| Examined lead | Result and permitted use | Missing evidence / decision |
| --- | --- | --- |
| S. A. Akintoye, Revolution and Power Politics, NLN item 85515b27-a2b7-468d-a038-411124bee33c | Opened repository record; author, 1971 metadata and chapter topics available | Full relevant chapters and source dependencies not examined. Do not derive war dates, origins or local motives from the abstract. Retain as a priority Nigerian-authored lead. |
| Oxford warfare DOI 10.1093/acrefore/9780190277734.013.277 | Redirect to inaccessible publisher/CDN endpoint | No full-text historical claims used. |
| Western House of Assembly, 14/16/18 December 1948, NILDS scan | Opening printed p.1 identifies a meeting at Mapo Hall; later searches repeatedly timed out | This narrow record is not a complete town history. No claim about the hall’s origins, architecture or royal ceremonies used. |
| University of Lagos-hosted civic-ceremonies PDF, bitstream 14c6de87-ac88-482f-affb-28048e1d4a76 | Opened as 24-page PDF with no readable text lines | Search snippets not substituted for inspected pages. No ceremony narrative written. |
| Mapo Hall web search and catalogued student thesis | Discovery leads only | Unverified dates, demolished-family accounts, rights and upstream origin histories excluded. No historical photograph copied. |

Before a future story: inspect Akintoye’s actual passages and notes, an identified
local archive series, and appropriately consented town voices. Confirm periods,
districts, terminology, oral transmission and any restricted material. Do not
carry the local council model in the Abẹ́òkúta story over to Ìbàdàn. No hollow
reader-facing story or research-placeholder route created for this dossier.

## Internal dossier B — Abẹ́òkúta

Canonical lead: `ibadan-abeokuta`, section 2; contextual `women`, sections 1–2.
Feasible focus: public money and representation through selected 1946–1953
records, with an attested 1952 proposed amount as the narrative opening.
No nineteenth-century town origin, genealogy, royal legitimacy or sacred account
is needed to answer this bounded question.

The story makes source roles visible: administrative record, attributed scholarly
interpretation, mediated report and editorial reading. It includes six sections,
Look closely, Tradition & evidence, open questions, scoped place terminology,
source passage links, original archive anchors and another reading. It does not
claim direct interviews, authenticated oral transmission or public release.

### Inspected-passage register — accessed 22 November 2026

Canonical URLs and complete structured records are in
`web/src/data/regional-content.ts`, separate from all previous source registers.
Every factual paragraph resolves to a source ID and exact locator. No original
source paragraph, image, interview, letter or song is copied.

| New source ID | Actually inspected passage | Scope / dependency judgement |
| --- | --- | --- |
| `region-rate-1952` | Hansard, 30 April 1952, vol.499 c83W, Q44 and answer | Contemporary proposal/approval distinction. The record supports what the minister reported; not collection receipts, council minutes or lived experience. Modern and historical Hansard URLs are the same source, not independent confirmation. |
| `region-council-1949` | Hansard, 2 March 1949, vol.462 c44W, Q63 and answer | Dated administrative account of temporary authority and budget. Ministerial assessment of support is attributed, not accepted as a poll or general political truth. |
| `region-rate-1953` | Hansard, 29 April 1953, vol.514 cc2134–2135, Q29 and supplementary exchange | Explicitly distinguish a question from a ministerial response. No independent case-file or exact punishment-count claim. No named private allegation reproduced. |
| `region-women-biography` | Johnson-Odim / Mba, For Women and the Nation, printed pp.73–75,78 (PDF pp.101–103,106) and notes 21,22,31 p.95; preface p.x | Inspected scan identifies 1997 Illinois publication and 1998 Nigerian reprint. Used constitution, representation and budget discussion; note21 identifies AWU Constitution, note22 Analysis of the Audit, note31 Charter Rules in FRK Papers. Petition paragraph identifies Daily Service, 8 July 1946. The original papers/newspaper were not independently read. Author-mediated material, not newly authenticated testimony. |
| `region-abba` | Immaculata Abba, Time and the 1947 Abeokuta Women’s Revolt, opening interpretation and Visions of the Future | Nigerian researcher’s attributed analytical argument only. Exclude broad chronology, sexualised song, unexamined pamphlet quotations and identifying allegations. Her Walter Johnson reference is not Samuel Johnson. |
| `region-byfield-report` | Linda B. Glaser, Cornell report, 23 March 2017, main paragraphs on Judith Byfield’s research | Mediated report of scholarship, not the original article. Broad wealth/tax generalisations excluded. Abba also draws on Byfield; these reports cannot become independent corroboration by appearing on different websites. |

Book PDF page numbers in the source record are one-based; screenshots inspected
zero-based pages 105 (printed78; one-based PDF106) and122 (printed95). Text from zero-based PDF pages100–105
and121–124 was opened; a requested screenshot of page100 timed out. The scan has
OCR defects and some reading-order problems. Used claims were restricted to
clearly readable paragraphs and notes. Broad historical background, private
family discussion, allegations and ritual material encountered elsewhere in the
book were excluded. Cheryl Johnson-Odim is not Samuel Johnson. No blanket
clearance of the whole book or every upstream work is asserted.

The monograph’s interview/research context was inspected, but no signed consent,
original transcript or recording was reviewed. Do not represent these as project
interviews or as permission to copy testimony. Future direct archival consultation
and appropriately qualified Abẹ́òkúta reviewers remain priorities.

### Related leads withheld

UNESCO’s former biography URL returned404; its pedagogical page was disabled.
The UN catalogue returned403. The IDS/Eldis overview was read but is a summary,
not the full UNESCO educational unit. Its full-report link resolved to an
unreadable UNESCO landing page; direct PDF access failed. The shop record was
read for publication context only; it is not a substitute for the educational
book. The Cornell-linked original Byfield article at Project MUSE was restricted.
These are research gaps, not invented page-level verification.

No UNESCO comic panel is reproduced, and no reconstructed dialogue from it or a
memoir enters the story. Published independence interpretations are attributed;
they do not establish what every historical participant thought.

## Internal dossier C — market / governance institution

Canonical leads: `women` sections1–2 and `know-governance` sections1–3. Chosen
bounded institution: the Egba Central Council as described in the dated 1949
record, together with the AWU’s representation question. The 1952 record uses
Egba Native Authority wording; do not silently treat names across dates as a
single unchanged constitution. A governance link is a reading suggestion, not a
claim that the original generic overview is independently verified.

Bolanle Awe’s Ìyálóde work: Smithsonian record opened; it supplies catalogue
metadata, not the article text. Oxford precolonial-states endpoint was inaccessible.
Robin Law’s Ọ̀yọ́ title and Biobaku’s Sources volume remain frozen-catalogue leads
not newly read texts. Do not import an Ọ̀yọ́ institution into Ẹ̀gbá history.
The Efunsetan and Tinubu leads were not used to fill a biography quota: literary
accounts, named-family allegations and unexamined source chains require separate
research and safety review. No new historical claim is drawn from those entries.

## Presentation, rights and release

Routes: `/places/` and `/places/abeokuta-tax-and-representation/`. Scoped links
from the existing homepage and Stories page; original four stories and all
Task001G modules untouched. Existing dark-green/bronze system, native disclosure,
static reading and ordinary links; no new client JavaScript or dependencies.
The existing global noindex,nofollow remains in force.

Only one original conceptual SVG was created: three reading questions, not a
historic administrative flowchart, person, building, map or sacred reconstruction.
`regional-media.json` records exact bytes/SHA256, origin, non-documentary status,
caption requirement and no public approval. Images have alternatives, dimensions
and explanatory prose; a full-size link helps narrow-screen reading. No third-party
photo, copyrighted illustration or runtime external media request.

Strict source/story schemas and selectors require resolved passages, locality
agreement, version history, safe source links, bounded dependency review and
private-review eligibility. Internal, withdrawn, unknown-rights, pending-safety
or flagged-sensitive material is excluded. Source groups prevent related pages
being miscounted as independent corroboration. Metadata cannot certify historical
truth: independent human source, community, language and rights review is still
needed. No public-release state is available.

## Correction and withdrawal

Edit only this parallel layer. Increment version and append a dated correction;
recheck every affected source/anchor, scope, safety and permission. Record actual
reviewers and scope rather than inventing endorsement. For a rights/safety concern,
withdraw the story with a dated reason; the static-path selector removes it.
Remove its discovery story link in the same PR so a removed route cannot remain
linked. Do not echo sensitive text in a correction. Use the project owner’s
existing private editorial process; no new collection of testimony or contacts.
Public release remains a separate decision, with qualified linguistic, community,
scholarly and rights review; technical CI is not cultural approval.

## Verification and evidence

Retain all 158 baseline tests. Add ten unit/static and six Chromium tests:
expected174 total (64 web unit/static,52 Chromium,58 root/security). Coverage:
source/region/anchor validation, dependency and rights gates, unsafe links,
withdrawn/internal exclusion, original archive/body/bibliography parity, unchanged
four stories/corrected modules, source relationships, media hashes/captions,
Unicode, no-JavaScript reading, keyboard source navigation, 1440/320/390 overflow,
image loading, text enlargement and no external browsing requests/storage.

Commands: root locked install and `npm test`; web locked install,
`npm run check`, `npm run build`, `npm test`, Chromium installation and
`npm run test:browser`. Local Windows Node22.23.1/incomplete web dependencies
prevent full local web verification (Astro requires22.23.4+). Full existing Linux
Actions must pass. Exact final-head SHA, suite totals, CI links and fresh real
browser screenshot artifact go on the PR, avoiding self-referential head changes.

Screenshot tests capture discovery/story at1440/320/390, evidence-detail viewports
and narrow navigation. Captures are actual browser output, not mockups. Automated
captures/tests are not manual visual, screen-reader, actual-browser zoom or full
WCAG/cross-browser certification. Manual reviews remain outstanding.

## Preservation and rollback

Full archive SHA256 unchanged:
`89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2`.
Ordered Odù SHA256 unchanged:
`92b877e266d6d66cc9a62dc9b00ed9c257ef65c175e0d055f30aaa18b0887ddb`.
All113 articles,128 original sources,6 community leads,24 sacred profiles,
15 quizzes,15 pronunciation entries,16 labels, protected manifests/prototype and
SEC-01-v1 remain intact. Task001F stories and Task001G modules remain unchanged.

Before merge, close the PR to leave main unchanged. After separately authorised
integration, revert only Task001H additions and two discovery links, preserving
unrelated subsequent work. No migration, database, auth, service or dependency
change. Cloudflare, DNS, Codespaces, hosting and deployment workflows untouched.
**Nothing merged, deployed or publicly published.**

## Bibliography locator correction for re-review

Addresses independent review #6014077589 on PR #20. The petition paragraph
referencing Daily Service, 8 July 1946 is on **printed page78, one-based PDF
page106 (zero-based screenshot105)**. Printed page77 is not the petition
locator. Corrected `region-women-biography` to printed pp.73–75 and78,
PDF pp.101–103,106; source revision is now2. The source URL, supported claims,
provenance boundaries, story and other five source records remain unchanged.

An exact regression checks this source locator, its reference from the petition
paragraph and its rendered evidence detail; preservation fingerprints freeze the
story and other source records. All174 existing tests are retained, with one
added regression (expected175 total). Full final-head CI and fresh evidence,
story, discovery and mobile screenshots are recorded on PR #20. No merge,
deployment, public release or new editorial clearance is authorised.
