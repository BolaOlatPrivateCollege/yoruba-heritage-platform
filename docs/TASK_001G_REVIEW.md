# Task 001G — Beyond the Written Record

Issue #17; branch `codex/001g-traditions-claims-context`.
Verified approved main: `fad66f78a98aee4b0c159f93ab344fad49108c98`.
Both post-merge main workflows passed; no open PRs and no uncommitted/unrelated
changes existed before work. Native Git fetch failed with a getaddrinfo error.
The connected GitHub service retrieved the signed merge commit, history, refs
and workflow records; its tree matched the complete local tracked tree exactly.
The exact signed commit was reconstructed and SHA-verified before branching.

Read AGENTS, Issue #17 and comments (none), editorial policy/workflow,
Sacred World guide, architecture/roadmap, article adapter/template,
Task 001F review, complete audit structure/recommendations and expansion plan,
preservation/security scripts and existing web verification conventions.

## Reader experience and content boundaries

The optional **Beyond the Written Record** module follows the original article
bibliography. It uses native `details`/`summary`, ordered headings, a visible
private-draft notice, provenance, exact inspected source locations, known/unknown
evidence, fair weighting, dated review status and correction history. It works
without JavaScript. Distinct category headings and card labels use text rather
than colour alone. There are no empty modules on the other 111 article pages.
All original 113 titles, decks, paragraphs, section source links and bibliographies
remain unchanged. No Task 001F story mutation was needed.

Two modest pilot entries are available for the owner-requested **private PR
review**, not public publication:

| Article | Category and actual scope | Important limitation |
| --- | --- | --- |
| `ile-ife` | Attributed alternative readings of object perforations | One curatorial source proposes alternatives; this is not two independently corroborating sources, two opposing schools, or a newly invented historical dispute. No ritual explanation or origin narrative is adopted. |
| `know-adire` | A museum-mediated account of a purchase-time fashion judgement | Speaker, original words and language are unknown. This is an indirect oral record, not authenticated direct testimony or universal community consensus. |

The second entry deliberately preserves an anonymous source gap rather than
inventing the maker, trader or elder. Its identity/provenance caveats remain
visible. It must not be advertised as a consented community interview.

The private-preview decision records **Codex — source and safety assessment for
this private PR only**. This is transparent automated-agent editorial work under
the task instruction, not a fabricated human review, professional qualification,
community endorsement, signed consent or independent approval. Both entries still
need independent editorial and technical review. Local contributors and qualified
Yorùbá language/object specialists should review future public wording.

The Òṣogbo research candidate remains **internal**, entirely absent from rendered
HTML, JavaScript, search indexes and public assets. A public organisational story
does not establish independent custodial authority, its full upstream history,
language clearance or permission for a sacred retelling. No circulating claim
has been populated or released. The missing folklore and circulating-claim tabs
are intentional, rather than an invitation to manufacture content.

## Source-by-source examination — 22 November 2026

All URLs were opened, not inferred from search snippets. New source IDs are
separate from the frozen original 128 and Task 001F's 25-source register.

| Source | Actually inspected | Dependency / rights boundary |
| --- | --- | --- |
| Art Institute of Chicago, archived Head record, NCMM 1999.2.3 | Object description, last sentence of first commentary paragraph and following paragraph: attachment hypotheses | Exclude its preceding origin/kingship account. No broader history derived from Johnson. The underlying excavation corpus was not re-examined. Original short paraphrase; no photo or quotation copied. |
| V&A, Àdìrẹ essay | Creating pattern purchase-account paragraph and Circ.591-1965 caption | Collection-specific reported speech only; exclude broad origin dates. The page does not identify its informant. Original short paraphrase; no photograph, recording, transcript or translated quote reused. |
| Adunni Olorisha Trust / Adunni Osun Foundation public exhibit | Section explicitly headed as a story about the grove | Attestation of this published variant only; not proof of narrated events. Custodial/source-of-source/rights gaps remain. Entire candidate withheld, not used to substantiate a new public historical account. |

Registered canonical URLs, passage locators, authorship, source type, access date,
support and limits are in `web/src/data/article-context.ts`.
The modern Harvard-hosted Blier PDF timed out twice; its search excerpts were
not substituted for full passage inspection. The first Chicago live URL failed;
the institution's archived object page was opened successfully. Broader Met
origin summaries were examined as leads and rejected for this narrow pilot;
they were not turned into an origin narrative. No assertion of blanket
Johnson-independence for a museum's entire corpus or its upstream literature is
made. No Samuel Johnson work is an authority here.

## Structured states and hard display gates

`web/src/lib/traditions.ts` validates a separate noncanonical collection keyed
to existing article IDs. Strict schemas reject unknown fields, unsafe source
schemes, excluded authorities, unresolved passages, duplicate IDs and invalid
revision histories. Each item records community/geography, attribution and
collection context, language/translation state, period, evidence/uncertainty,
status, sensitivity, source/provenance review, consent/rights, reviewer/date,
release, version, correction history and withdrawal.

Claim status is distinct from release, consent and source safety:

| Claim status | Meaning |
| --- | --- |
| `recorded-tradition` | The attributed account is recorded; its narrated events are not thereby independently corroborated. |
| `contested` | Sourced interpretations differ or alternatives remain unresolved; weigh evidence and do not invent a dispute. |
| `uncorroborated` | Available evidence cannot corroborate the stated claim; not a judgement on a community's worth. |
| `contradicted` | Cite the evidence against this version and the scope of the conclusion. |
| `reviewed` | Reviewed only within explicitly recorded scope; not universal historical or scientific certainty. |

Default release is internal in the editing protocol; new records must explicitly
choose a state. Reader selection requires `approved-for-private-preview`, a
bounded source check, reviewed-for-safety state, permitted original paraphrase
or recorded permission, adequate consent basis, nonpending translation state,
no sensitive flags and no withdrawal. The component applies the selector again;
it cannot accept arbitrary record props. Unknown rights/consent remain blocked.

Published-nonidentifying-source-summary is a narrow consent basis for an original
summary of a public source, not permission to copy a contributor's words or
publish private testimony. No new testimony was collected. Public access is
not blanket rights clearance; separate public publication remains unapproved.

Contested items require at least two passage-cited perspectives and explicit
evidence weights. Folklore requires a named attested variant, scoped cultural
meaning and recorded community review before private display. A circulating
claim additionally needs independently documented circulation with citations,
independent review, community review, a dated specific editorial decision and a
fact-check outcome. Missing any one blocks display. **There is no public release
state** in this phase. The existing `noindex,nofollow` remains unchanged.

All restricted-sacred, identifying-allegation, witchcraft-identification,
medical, ethnic-tension, children, property, sexual, criminal or private-testimony
flags block reader output, regardless of a release label. These are structural
gates, not an automatic rumour classifier: human review must detect harm and
cannot mark harmful material safe to circumvent the flags.

## Editing, correction and withdrawal protocol

1. Begin internally with one canonical article ID and a narrow research question.
   Do not invent a tradition, speaker or circulation history to fill a category.
2. Open the source and register the exact passage and source-of-source limits.
   A bibliographic lead alone cannot support an account. Keep town/variant scope.
3. Record what was witnessed versus inherited, language/dialect and the state
   of translation. Use `unknown` openly where justified. Never use a fabricated
   date or universalised lineage. Preserve original Yorùbá marks.
4. Assess identifiability, allegations, protected knowledge, welfare and media
   rights. Keep personal contact details, signed consent, private recordings and
   restricted narratives outside Git and the static data collection. Store only
   a safe decision reference if a later separately authorised intake exists.
5. Obtain appropriate independent scholarly, community, language and rights
   review. Record the real reviewer, date and scope; do not invent approval.
   New private testimony or sacred retellings need documented permission and
   custodial review. Unknown permissions mean no reader output.
6. Make a specific private-preview decision only after the gates pass. Public
   publication is a separate owner/editorial operation outside this task.
   A future public pipeline must not silently treat this state as permission.
7. For corrections: increment version, append a dated `corrected` event and
   explain precisely what changed. Preserve the previous Git version. Recheck
   source, harms, consent and all affected paragraphs before another PR.
8. For a credible rights/safety objection: set `release: withdrawn`, add a dated
   withdrawal reason, increment version and append `withdrawn` history. The
   selector removes the whole entry. Remove the entire module if nothing remains.
   Do not echo a harmful allegation in a public correction notice. Escalate via
   the project owner's existing private editorial process; no contact invented.
9. Do not restore withdrawn text by relabelling. A future reinstatement requires
   a reviewed new record/version and preserved withdrawal history, with explicit
   renewed source/rights/community/safety decisions. Review caches and any
   separately authorised deployment if one exists; this task deploys nothing.

## Automated verification and limitations

All original 135 tests are retained. Added 12 unit/static tests and seven
Chromium tests: expected **154 total**. Tests cover schema negatives, category
semantics, consent/source/release gates, every sensitive flag, independent
circulation gates, correction/withdrawal, exact parity for all 113 articles and
bibliographies, no empty modules, static internal-data exclusion, safe native
rendering/no HTML sinks, Unicode and no private fields. Chromium covers native
keyboard/focus, no-JavaScript, 1440/320/390px screenshot/overflow checks, no empty
sections, 200% text sizing and local stateless browsing.

Commands: root `npm ci --ignore-scripts`, `npm test`,
`node scripts/editorial-audit.mjs --check`; web `npm ci --ignore-scripts`,
`npm run check`, `npm run build`, `npm test`,
`npx playwright install --with-deps chromium`, `npm run test:browser`.
Existing workflows/dependencies are unchanged. Final-head SHA, actual suite
counts, workflow run links and screenshot artifact are recorded on the PR,
avoiding a self-referential documentation-only head update.

Local web tests cannot execute with the incomplete locked dependency install
and Node 22.23.1 (Astro requires 22.23.4+); missing Cheerio was reported as a local
failure, not counted as a pass. Linux CI must pass before review handover.
Automated captures are not a manual visual audit, screen-reader certification,
cross-browser audit or full WCAG claim. Native details expose the open state;
text and ordinary links remain usable without scripts. A 200% text test is not
a manual browser zoom test. Public language/cultural/rights clearance remains
outstanding and is not established by tests.

## Preservation and rollback

Archive SHA-256 unchanged:
`89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2`.
Ordered Odù SHA-256 unchanged:
`92b877e266d6d66cc9a62dc9b00ed9c257ef65c175e0d055f30aaa18b0887ddb`.
113 articles, 128 original sources, six community leads, 24 Sacred World profiles,
15 quizzes, 15 pronunciation references and 16 labels are intact. Protected
files/manifests, root prototype and SEC-01-v1 are unchanged.

Before merge: close the PR and main stays unchanged. After any separately
authorised later merge: revert only Task 001G's optional component/import,
typed collection/schema, stylesheet, tests and documentation changes. No database,
schema, data migration, infrastructure or dependencies added. No Cloudflare,
DNS, hosting, Codespaces, workflow or deployment change. Nothing merged or deployed.
