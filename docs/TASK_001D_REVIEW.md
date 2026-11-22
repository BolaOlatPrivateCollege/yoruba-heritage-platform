# Task 001D — source-linked knowledge quizzes

Issue #10. Branch `codex/001d-knowledge-quizzes`, from approved main
`a41266cf482b641e743ed3f8039dfb5eb9195fc6` (PR #9 merged). Main's two workflows
passed before branching. Every tracked local source matched that main tree.
This is a technical-review preview: no merge, deployment, production service,
database, account, audio or interactive Ifá model is part of this change.

## Data provenance and exact identity

The unchanged root `scripts/import-archive.mjs` verifies protected original bytes
and all archive hashes before export. Existing `web/scripts/prepare.mjs` writes
the verified archive into ignored build-only `.generated/archive.json`.
`web/src/lib/archive.ts` now explicitly parses `archive.quiz` through `QuizSet`
in `web/src/lib/quiz.ts`, and validates each original article reference.

Exactly 15 `content.js` quiz records retain their five original fields:

| Original field | Display/use | Preservation rule |
| --- | --- | --- |
| `q` | Question heading and answer-group label | Exact original Unicode string |
| `a` | Ordered answer buttons | Exact strings and original option order |
| `correct` | Archived zero-based answer index | Integer, within original option list |
| `why` | Immediate explanation | Exact original Unicode string |
| `link` | Related static article | Original ID; validated `/articles/<id>/` target |

The records have no original IDs. `quiz-01` through `quiz-15` are **display-only**
IDs mapped to original zero-based positions 0–14; no ID is inserted into canonical
records. All 15 questions are offered once, in original order. The legacy UI
used ten questions and a biased random-sort restart; this slice deliberately uses
the full deterministic review, without sampling or randomization.

The new strict schema rejects missing/extra fields, blank text, short/duplicate
option lists, duplicate questions, unsafe article IDs, wrong record counts and
noninteger/out-of-bounds keys. Reference validation rejects nonexistent targets.
No parser trims or normalizes stored strings; whitespace is only inspected when
rejecting blank fields. No question, answer, explanation or source is authored.

The frozen canonical quiz SHA-256 is unchanged:

`66101365bf1d6d7d662b13b5f7a435ef843fcbd2fdde5e591ea750bbac75e2be`

Tests compare the complete typed quiz and each rendered record against the
approved importer, the frozen array hash and all 15 original per-record hashes.
The existing whole-archive parity assertion remains unchanged.

## Interface, accessibility and privacy

`/learning/quiz/` offers a start button, one question at a time, visibly labelled
answer choices, answered/total progress, archive-key score, immediate right/wrong
feedback with the exact explanation, original article link, Next, end summary and
Restart. Both desktop/mobile section navigation and the learning hub link it.
Only the outdated quiz legacy-only statement changes; atlas, timeline, bookmarks,
innovation explorer and the interactive Ifá matrix stay legacy-only.

The visible editorial caveat distinguishes agreement with archived answers from
independently verified historical facts. Related articles retain their original
citations, evidence limits, community variations, unreviewed claims and unknown
rights. The quiz is an educational draft, not scholarly/publication approval or
an examination certifying expertise. No Johnson-based factual authority is added.

Answers use native buttons grouped under the question heading. `aria-pressed`
identifies the selected option. After answering, `aria-disabled` and visible
“Your choice” / “Archive key” labels communicate the locked state without removing
the focused button. The guarded pure state transition prevents changes/double
scoring, including repeated Enter/Space. Next cannot advance an unanswered
question. One persistent atomic polite status region announces feedback and
the original explanation; the score/progress are not competing live regions.
Start, advance, completion and restart move focus to the relevant heading.
Restart clears all answers and score and returns to question one.

The green/bronze theme, visible focus and minimum 44px controls are retained.
Layouts are checked at 320px, 390px and 1024px; no animation is added. Existing
contrast diagnostics remain in force. Browser diagnostics check labels, group
names, status semantics, unique IDs, target height, landmarks, focus and overflow.
These limited checks are not axe, a full accessibility audit or WCAG certification.
Manual screen-reader, zoom, high-contrast, font/tone placement and wider browser
testing remain required, as does qualified historical/community source review.

All progress is **in-memory on this document only**: no localStorage, sessionStorage,
cookies, analytics, submissions, accounts, leaderboard or backend. Reloading or
normal full-document navigation starts a new review; this is not cross-page or
tab-restoration persistence. There is no consented media, audio, TTS or microphone.

Astro escapes the quiz into hidden static question markup. Client code reads only
those quiz fields, uses textContent, and imports no raw archive/developer source.
There are no inline JSON/script payloads or untrusted HTML sinks. Inspectable
answer indices are expected in a static educational quiz; no anti-cheat claim.
Malformed/missing markup fails closed to a labelled error and usable readings.

Without JavaScript the introduction and related article links work, with an honest
interaction-required notice; the start button and question controls stay hidden.
The fallback does not claim to offer a playable quiz. No new dependency or lockfile
change is required, and neither the original root website nor server is started.

## Reproduce and evidence

```sh
# root: pinned Node 22.23.1, Python 3.12.10
npm ci --ignore-scripts
npm test
python -m py_compile server.py tests/test_fileserving.py
# web: Node 22.23.4+ required by the locked Astro version
cd web
npm ci --ignore-scripts
npm run check
npm run build
npm test
npx playwright install --with-deps chromium
npm run test:browser
```

The existing workflows discover the new test files automatically:

- [Archive/security workflow](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/workflows/quality.yml)
- [Reading/browser workflow](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/workflows/web.yml)
- [Feature branch runs](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions?query=branch%3Acodex%2F001d-knowledge-quizzes)

Exact final-head commit, completed run/job links, results and private screenshot
artifact link are recorded in this feature's PR. A prior passing head is not the
acceptance evidence for subsequent changes.

The baseline 84 tests remain: 12 legacy, 24 preservation, nine security-revision,
13 real HTTP, 14 web unit/parity and 12 Chromium. This task adds seven unit/static
tests (payload/per-record hashes, schema negatives, references, DOM parity/fallback,
answer guards, completion/restart scoring and output boundaries) and seven browser
tests (keyboard/source links, all 15/end/restart, mobile/semantics, no-JS, malformed
markup, hostile-text rendering and memory/network/privacy). Expected total: **98**.

New private screenshot artifact entries (14-day retention):
`desktop-quiz-feedback.png`, `desktop-quiz-summary.png`, `mobile-320-quiz.png`,
`mobile-390-quiz.png`. Prior reader/learning captures remain in the artifact.
No compiled website, generated archive, raw source or identifying data is uploaded.
Reviewer visual inspection is still needed; screenshot capture and automated
layout checks do not constitute manual visual approval.

Local Windows has Node 22.23.1, below Astro's minimum; npm DNS and TCP restrictions
prevent local dependency installation/web/browser execution. Local preservation
and Node logic checks run independently; only actual pinned Linux GitHub CI may
be reported as full build/browser and real loopback HTTP success. No security
setting, dependency pin or test expectation is weakened to overcome restrictions.

## Protected content and rollback

All 113 articles, 128 sources, six community leads, 24 Sacred World profiles,
15 pronunciation entries and all supplementary records retain their original
wording, IDs, source references and Yoruba code points. No root content, original
HTML/CSS/JS, server.py, editorial policy, protected manifest or SEC-01 revision
changes. Existing private-file exclusions and both CI workflows stay intact.

| Protected baseline | Unchanged SHA-256 |
| --- | --- |
| Complete archive | `89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2` |
| Original manifest | `80dd12a96f7ed804bb2602f85edbaef5c3371fa9799dc97633d8349297571a33` |
| SEC-01 server.py | `6bcaa826444a7ab81b141636510f5fb94487ca79d9cc7e3f579f2b7ad142ad10` |

Rollback: stop the local web preview and reopen unchanged root `index.html`
offline. Revert this task's web/docs changes together if reverting the new
interface. No database, schema, domain, hosted service or content migration needs
reversal. Keep SEC-01 intact and the Python pilot non-public; its documented
broader public-service limitations still apply. No deployment or merge is implied.

Recommended Task 001E: a separately reviewed illustrative Ifá 16×16 mathematical
model only, with explicit cultural/evidence boundaries, no invented verses or
religious authentication claims. It is not implemented or automatically authorised
by this quiz work.
