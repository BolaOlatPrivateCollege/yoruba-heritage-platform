# Task 001F — controlled expansion of the remaining 109 topics

Internal editorial plan, 22 November 2026. No authority to publish, merge,
commission private testimony or change the frozen archive is implied.

## What the audit establishes

The [machine inventory](001f-article-audit.json) and [human inventory](001f-article-audit.md)
cover all 113 canonical IDs, with their complete record hashes. Estimated counts
use whitespace-separated section prose, excluding titles, headings and citations.
The median is 216 words; 77 articles have fewer than 250. This is a depth signal,
not a verdict on accuracy or value. All 113 lack an explicit `regions` field.
Place mentions in prose are separately flagged as search leads, not verified
geographical coverage. Era labels are retained as authored, not fact-checked.

Every entry records section-specific source IDs, declared source-access classes,
rights/review unknowns, sensitivities, source-of-source uncertainty, community
lead status, a topic-specific recommendation and a six-factor priority judgement.
The old sources' full texts were not all opened for this task. A source described
as full text in the old catalogue is **not** silently upgraded to newly verified.
The 25 newly examined draft sources have their own separate passage register.

## Ranking and batch selection

Priority uses thinness, reader interest, significance, metadata-based evidence
readiness, textual regional coverage and community-review urgency. The formula
and scores are visible in each record. Scores reflect editorial judgement, not
an empirical measure of interest, an approval or a popularity ranking. The
classification is deliberately conservative: a sensitive-topic flag in a short
overview can place the whole article behind a specialist gate.

Four canonical topics receive parallel pilot stories here: `ile-ife`,
`know-adire`, `know-gelede`, `heritage`. Their original articles remain unchanged.
The other 109 records are assigned to four queues:

| Queue | Records | First review objective | Representative starting points |
| --- | ---: | --- | --- |
| P1 · evidence-led readable cases | 15 | Inspect a concrete source/object; develop a worked reading rather than generic background | Follow the inventory's P1 IDs and their source/section references |
| P2 · local and regional cases | 8 | Address weakly represented place contexts with an identifiable local source | Review place-mention leads before choosing a case; a string match is not a community inventory |
| P3 · specialist and custodial gate | 81 | Establish appropriate clinical/scientific, sacred, harm-aware or custodial review before drafting more claims | Use each record's sensitivity list; do not treat a high score as permission to expand |
| P4 · editions and language | 5 | Obtain original editions/passages, linguistic review and quotation rights | `author-sophie-oluwole`, `author-ifayemi-elebuibon`, `author-wande-abimbola`, `deep-name-olodumare`, `deep-name-orisa` |
| Remaining total | 109 | Each ID appears in exactly one queue | The JSON inventory is authoritative for membership |

Use small review batches of three to five related records. Each batch should
include a material/process case where possible and a regional question, rather
than expanding only the best-known centres. Textual mentions currently identify
few records for Ilọrin, Ìlọbú, Ketu and Togo, and none for Kogi in this matching
list. These are **audit leads**, not proof that people or histories are absent.
Compare exact spellings and article context before commissioning new coverage.

## A repeatable story brief

1. Select a canonical ID and section. Preserve its exact record hash and wording.
2. Define one question, locality and time scope. List what would change the
   editorial conclusion; do not begin with a headline that promises a discovery.
3. Open each proposed source. Register author/publisher, URL/edition, access date,
   exact inspected passage, material type, locality, limits and source-of-source
   assessment. A catalogue can establish metadata, not the contents of a book.
4. Audit dependence on excluded Johnson material at claim level. Exclude an
   uncertain historical retelling until independent evidence is inspected. Keep
   philosophical argument, contemporary testimony and material observations
   distinct from any unverified remote history in the same publication.
5. Invite local contributors only through a separately authorised process.
   Establish narrator preference, language/dialect, locality, consent, rights,
   restrictions and translation review. Public source access is not new consent.
6. Draft an object-, process-, place- or attested-event opening. Do not invent
   dialogue, weather, sensory eyewitness detail, a first inventor or a named elder.
   Use five to eight purposeful sections, a close-looking feature, evidence
   distinctions, open questions, terms, original archive links and a next reading.
7. Map every factual paragraph/claim to an inspected source passage. Label
   analytical questions as editorial reflection. Obtain specialist review of
   technical, medical, linguistic or sacred interpretations where relevant.
8. Create a media brief. Prefer permission-cleared documentary images with exact
   photographer/object attribution. If none are cleared, use clearly labelled
   original educational illustrations; never present them as historical evidence.
9. Review narrative quality: does the story develop an idea, return to a concrete
   detail, show human choices where documented and reward further reading? Remove
   repetitive disclaimers from prose where a clear evidence label can carry them,
   without hiding source limitations. Do not add words to meet a quota.
10. Keep the story a visible research draft. Record scholarly/custodial review,
    correction history and media permission separately. Technical tests and an
    owner-approved merge do not constitute editorial release or public deployment.

## Required review roles and stop conditions

| Material | Required human input before authoritative release | Stop when |
| --- | --- | --- |
| Archaeology, royal or local history | Appropriate historian/archaeologist and relevant community review | Provenance, date or origin narrative cannot be independently supported |
| Language, names and translation | Yoruba linguist and relevant dialect/community speaker | A word split or translation is being presented as settled without evidence |
| Sacred performance or belief | Authorised public custodians/practitioners; regional scope | Restricted knowledge, invented verses or presumed permission would be needed |
| Health, plants and genetics | Relevant scientific/clinical specialist, ethics/knowledge-owner review | A cultural account is being converted into a treatment or genetic identity claim |
| Identifiable people or family records | Consent/rights and harm-aware editorial review | Disclosure, allegation, stigma or attribution conflicts remain unresolved |

## Technical and preservation gate for every batch

Retain frozen content and SEC-01-v1; use a separate typed editorial layer. Verify
all canonical output, source/anchor resolution, source status, exact displayed
Unicode, word counts/reading times, safe rendering, media provenance, no private
data publication, mobile/no-JS reading and keyboard navigation. Capture 1440,
390 and 320px evidence; rerun complete CI on the final PR head. Keep the source
register, claims, review status and media permission traceable through revision.

Rollback a batch by reverting only its optional story, discovery, tests and
documentation changes. No canonical rewrite or database migration is required.
The original archive and local prototype remain available. Public publication
requires a separate explicit decision after editorial and technical gates.
