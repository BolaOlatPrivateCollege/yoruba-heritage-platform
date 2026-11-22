# Task 001F — rich storytelling and discovery pilot

Issue #15; feature branch `codex/001f-editorial-stories-discovery`; verified main
`7253a6af6a2face9b0304fa6935aa460bc8b0ad1`. Main and all tracked baseline bytes were
verified against connected GitHub records before branching. No open PRs or local
uncommitted/unrelated work were found. Local Git transport remains blocked; the
exact signed main commit and tree were retrieved through the connected service.

## Content and reading experience

Four substantial original stories form an optional layer at `/stories/`, with
5–8 thematic sections, a documented opening, close-looking feature, evidence
distinctions, open questions, a scoped glossary, original archive-section links
and a next reading. All pages prominently state **Editorial research draft · not
reviewed for public release**; claims unreviewed, rights unknown and publication
approval not granted. These are editorial drafts, not official histories.

| Feature | Focus | Bounded evidence and important exclusions |
| --- | --- | --- |
| `ile-ife-art-city-evidence` | A face, a city, a thousand questions | Specific object/find records, material-context discussion, ownership versus excavation provenance, present Nigerian institutional role; no genealogical or origin narrative adopted |
| `adire-indigo-design` | The part the blue cannot reach | Resist process, collection/maker limits, locally led teaching and commercial self-description; no invented artisan speech, motif translation or universal origin date |
| `gelede-performance-knowledge` | A carved face is only the beginning | Named carver/object details, localities and an inspected Nigerian scholarly argument with interview provenance; no copied verse, generated ritual sequence or universal symbolic code |
| `osun-osogbo-living-landscape` | A landscape kept alive | Public Nigerian/conservation organisation accounts, named collaborators, repairs and dated digital documentation; no invented conversation, ceremony or sacred access route |

Current word counts and reading estimates are computed from `storyText()` at
200 whitespace-separated words/minute (rounded upward). They include narrative,
reflections, questions, voice invitation and glossary; exclude navigation and
the source register. Exact final counts are reported in the PR. The stories
are approximately 900–1,100 words each; no placeholder paragraphs are used.

The home page foregrounds the four features and four five-reading journeys.
`/stories/` presents both discovery and context. Journeys connect actual article
and story IDs with explanations and reading times. Archive links remain marked
as preserved drafts rather than newly verified readings. Original article routes,
section order, body wording and source catalogue are unchanged. The three home
archive suggestions are now selected explicitly rather than taking the first
three records. Existing overview heading and library access are preserved. The
original homepage is retained byte-for-byte as the internal reference
`docs/editorial/001e-home-reference.astro.txt`, with a Git-blob hash test. A new
illustrated Àdìrẹ cover links directly to the featured story from the hero.

## Claim-to-passage provenance

`web/src/data/story-content.ts` contains original prose with stable paragraph
IDs. Every factual paragraph cites a source ID and passage ID. The page links
these to a source register containing publisher/author, URL, material, access
date, locality, actual inspected locator, support, limits, rights and a bounded
Johnson-dependency assessment. A paragraph labelled editorial reflection is an
analytical question/reading approach, not an extra historical source assertion.

`web/src/data/story-sources.ts` registers 25 sources separately from the frozen
128. The types/validator reject missing factual citations, unresolved passages,
unchecked dependencies, unsafe source schemes, excluded-author authority and
invalid original archive-section links. These controls establish traceability,
not the truth of a source or the correctness of every editorial interpretation.

| Evidence group | Passages actually inspected | Remaining provenance/review limit |
| --- | --- | --- |
| British Museum via Google Arts & Culture | Af1939,34.1 description/find, uncertainty and Details | Underlying dynastic narratives excluded; catalogue dating attributed; cultural/photo rights not cleared |
| Met Ifẹ̀ overview and Alice Apley essay | Artistic-period paragraph; material/context and final maker hypotheses | No direct reading of every archaeological dataset; genesis, hamlet origins and universal kingship statements excluded |
| Met horse/Female Head and Art Institute head | Object details, ear ornament/provenance, small/neck-hole hypotheses | Identity and original use uncertain; collection trail is not excavation context |
| NCMM/Met announcement and ICOM | 21 September 2026 agreement/documentation passages; Red List category | Contemporary institutional accounts; no audit of implementation or object-specific illicit removal claim |
| V&A textile essays and Met wrapper | Process/signature/name passages; Àdìrẹ subsection; 2004.347 fields | Unknown maker/origins retained; no universal design dictionary or copied photographs |
| Nike Art Foundation and Adirelounge | Mission/teaching; selected biography/work titles; public artisan process | First-party organisational/commercial perspectives, not audited impact or individual artisan consent |
| Met Gẹ̀lẹ̀dẹ́ records, Cleveland and UMMA | 1990.336 composition/locality; 1978.412.514 fields; Duga training/jointed tails; TC2008.2 physical description | Interpretation attributed; no origin chronology, universal animal meanings or copyrighted sculpture reproduction |
| Adeola Seleem Olaniyan PDF | Printed pp.52–54 (PDF pp.14–16), conclusion discussion and pp.57–58 references | Author-mediated Ìgbóòrà interview context; no verses or translations copied; broad historical introduction excluded |
| UNESCO World Heritage and Nigerian Ministry | Landscape/use/conservation sections and government site paragraphs | Religious claims attributed; no current-condition/legal/clinical certification |
| Adunni Olorisha Trust / Adunni Osun Foundation | Welcome, New Sacred Art and Art of Restoration public exhibits | Named organisation perspective; public text does not establish every custodian's consent |
| CyArk | Project's About the site, September 2019 documentation paragraph | Models and interview recordings not independently examined; record describes a dated condition |

All inspected access dates are **22 November 2026**. Source pages themselves,
not just search snippets, supplied the paragraphs used. Boundaries are recorded
per source: primary contemporary activity/object metadata or explicitly attributed
interpretation is distinguished from remote historical narrative in the same
page. No blanket clearance of all upstream sources or all Johnson dependence is
claimed. Unchecked historical retellings are not introduced as facts.

The direct UNESCO Gẹ̀lẹ̀dẹ́ inscription/project pages returned a human-verification
page. Their indexed summaries are retained as research leads only. The pilot
does not convert them into a new ritual description or inscription-date claim.
Benin/Togo practitioner voices and authorised Yoruba-Nago accounts are explicitly
open work. A stale Brooklyn object link returned 404 despite an indexed licence;
no photo or permission was taken from it. These access gaps are in `researchGaps`.

## Images and visual integrity

The user's follow-up requested relevant images. This pilot includes four original
educational SVGs and an original AI-generated indigo textile illustration. They
have descriptive alternatives, fixed dimensions and captions making their status
explicit. The source PNG is transformed by Astro's existing image pipeline to
responsive WebP; no new dependency, remote image request or tracking is added.

The SVGs distinguish object-record questions, a simplified resist principle,
performance context and a conceptual river landscape. They are **not** photographs,
historic objects, named authentic cloth patterns, ritual charts, reconstructions
or maps of sacred access routes. The generated image was created as a gouache /
cut-paper textile study with no people, words, borrowed motif or attested object.
No museum photo, sacred performance photo or identifiable person is reproduced.
Rights-uncertain/copyrighted source images were omitted rather than copied.

`web/src/data/story-media.json` records creation method, exact file SHA-256/size,
non-documentary status and pending publication approval. Original creation does
not represent independent cultural review or licence clearance for public release.

## Audit and next 109 topics

`scripts/editorial-audit.mjs` reads the approved importer output and does not
mutate it. Topic-specific recommendations in `scripts/editorial-notes.json`
cover all 113 IDs. Generated [JSON](editorial/001f-article-audit.json) and
[Markdown](editorial/001f-article-audit.md) record every article hash, section,
estimated prose length, source IDs/type/declared access, evidence note, unknown
rights/review, community lead status, sensitivities, geographical mention leads,
questions, reading-flow recommendations and six-factor prioritisation.

Findings: 77 below 250 prose words; median 216; range 142–780. All lack explicit
region metadata. String-matched places are leads only, not a verified ethnic or
geographical coverage map. Existing era strings are not independent chronology.
No article field establishes an individually authenticated/consented transcript;
the six existing community entries remain research leads with their own caveats.
No claim that all 113 are fact-checked, rights-cleared or publishable is made.

Canonical source access classifications reflect frozen metadata, not a new audit
of all external pages. Every canonical `accessVerifiedThisTask` is false; new
pilot passage inspection is separately traceable. Source-of-source uncertainty
is retained and known metadata warnings are flagged, not automatically resolved.

The [staged expansion plan](editorial/001f-expansion-plan.md) assigns the remaining
109 topics to 15 evidence-led cases, 8 regional cases, 81 conservatively flagged
specialist/custodial-gated records and 5 edition/language records. Small reviewed
batches, consent, specialist roles, source gates, writing quality, media provenance,
correction and separate publication authorisation are specified.

Reproduce internal audit: `node scripts/editorial-audit.mjs`.
Read-only verification: `node scripts/editorial-audit.mjs --check`.
Neither internal audit is imported into the web app or copied to public output.

## Verification, accessibility and rollback

Retain all 116 existing tests. Add ten unit/static tests and nine Chromium tests
(expected total 135). Existing unchanged parity tests compare every original
article/source string; new tests check bounded passage resolution, negative
schemas/references, computed reading time, draft labels, every audit ID/hash,
reproducibility, media hashes/local images, image captions, source exclusions,
journey links, no-JS, keyboard, mobile, text zoom, storage/network boundaries
and screenshots. Tests cannot establish scholarly or custodial verification.

Commands: root locked install, `npm run verify`, `npm run verify:preservation`,
`npm run test:security-revision`, `python -m py_compile server.py`,
`npm run test:security`; web locked install, `npm run check`, `npm run build`,
`npm test`, `npx playwright install --with-deps chromium`, `npm run test:browser`.
Existing read-only Actions workflows and screenshot retention are unchanged.
Final-head CI runs, exact test counts and screenshot artifact links go in the PR.

Local Windows Git/DNS/socket restrictions and Node 22.23.1 block full local web
execution (Astro requires 22.23.4+); locked web install fails. These limits are
reported, not counted as passes. Linux CI is the complete gate. Screenshot
capture is automated; no manual visual, screen-reader, full contrast or cross-
browser/RTL certification is implied. Text alternatives and core content work
without scripts; a 200% text-size test is not a manual browser zoom audit.

Full archive SHA-256 remains
`89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2`;
ordered Odù labels remain
`92b877e266d6d66cc9a62dc9b00ed9c257ef65c175e0d055f30aaa18b0887ddb`.
All 113 articles, 128 sources, six community leads, 24 sacred profiles, 15 quiz
questions, 15 pronunciation records, 16 labels, protected manifests, original
prototype and SEC-01-v1 bytes remain unchanged.

Before merge: close the PR to leave main unchanged. After any separately
authorised later merge: revert only Task 001F additions/home/nav/docs changes.
No schema, database or data migration. Original article routes and the untouched
root prototype remain available. No Cloudflare, DNS, Codespaces, production
service, hosting or deployment setting changed. **Nothing merged or deployed.**
Technical review, explicit owner merge authorisation and public editorial release
are separate gates; public deployment requires its own decision.


## Verified implementation evidence

Implementation head `902b9416ce48c8c69416486b91dfa517021251b9` passed both
workflows: 135 tests, zero failures/skips; Astro/TypeScript reported zero errors,
warnings or hints. Totals: 12 legacy + 24 preservation + 9 security revision +
13 HTTP security + 39 web unit/static + 38 Chromium. Both locked installs, the
static build, canonical output parity and audit reproducibility passed.

| Story | Estimated reading words | At 200 words/minute |
| --- | ---: | ---: |
| Ilé-Ifẹ̀ | 986 | 5 min |
| Àdìrẹ | 920 | 5 min |
| Gẹ̀lẹ̀dẹ́ | 1,010 | 6 min |
| Ọ̀ṣun–Òṣogbo | 1,042 | 6 min |

- [Archive quality — passed](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45024622154)
- [Reading interface — passed](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45024622159)
- [Desktop/mobile screenshot artifact](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45024622159/artifacts/14754734117)
- [PR #16 current final-head checks](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/pull/16/checks)

These run links record the initial verified implementation. The final homepage
cover/reference-test and documentation update is fully rerun; exact final-head
SHA, workflow links and artifact evidence are recorded on PR #16. No tests or
workflow steps are disabled. This avoids a self-referential documentation commit
while retaining verifiable final-head results on the PR.

Screenshots include home, Stories index and Àdìrẹ at 1440/320/390px, Ilé-Ifẹ̀ at
1440px, and Gẹ̀lẹ̀dẹ́ / Ọ̀ṣun–Òṣogbo at 390px, alongside all existing feature
evidence. The private screenshot artifact has the unchanged 14-day retention,
expiring 6 December 2026. Capture is automated, not a claim of manual visual audit.
Astro generated responsive indigo WebP variants of approximately 8/28/57/105 KB
from the source illustration in this run; the final homepage adds another
appropriately sized variant through the same existing pipeline.
