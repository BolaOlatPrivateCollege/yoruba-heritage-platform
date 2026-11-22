# Task 001C — alphabet, tone marks and text pronunciation

Issue #8; branch `codex/001c-yoruba-alphabet-tone-learning` starts at approved
main `53119aff041152b665a3a813598c95f44083250d`. Technical preview only; no merge,
hosting, production connection or deployment is part of this work.

## Implementation and provenance

- `/learning/alphabet/`: 25 Standard Nigerian Yoruba letters; GB is one letter;
  all/7-vowel/18-consonant filters, stable selection, original sound guidance.
  E/Ẹ, O/Ọ, S/Ṣ and G/GB remain distinct display strings.
- Tone comparison and a three-character visual recognition activity use exactly
  the existing `á`, `a`, `à` examples and high/mid/low labels in the original
  `community.js` lesson and `know-alphabet` article. No new word meaning or
  phonetic transcription is invented. The practice is explicitly illustrative,
  has no scoring and is separate from the preserved general quiz.
- `/learning/pronunciation/`: all 15 original text/meaning/note triples, original
  order and code points, with diacritic-insensitive filtering and reset. Each
  entry says “Native recording pending”. No playback, recording, synthetic
  voice, microphone API, remote font/media or tracking is introduced.
- Main/mobile navigation and the learning overview link to the working pages.
  Quiz, Ifá matrix, map, timeline, bookmarks and innovation interactions stay
  legacy-only. The original prototype remains unchanged.

`web/scripts/prepare.mjs` first calls the existing verified importer. The new
`web/scripts/alphabet.mjs` extracts only three known, inert literal declarations
from its hash-verified `community.js` supplementary text. It never evaluates
that UI source, accepts arbitrary source paths or normalizes text. Ambiguous or
unexpected literal syntax/count/classification fails closed. A small ignored
`.generated/alphabet.json` holds only letters, classifications and exact guidance;
the full supplementary JavaScript is never copied to build/client assets.
The build-only strict Zod adapter parses the generated rows. Astro escapes all
reference content; client code reads static DOM text and writes `textContent`.
No new dependencies or lockfile changes are needed.

The teaching text links to preserved `know-alphabet` and `know-tones` readings
and the existing `orthography` (Wisconsin) and `texas` source records. These are
the original educational references, not a new claim of external full-text
verification. Guidance remains an approximation requiring qualified Yoruba
speaker/educator and dialect review. Research drafts, rights unknown and claims
unreviewed stay unchanged. Johnson's books are not introduced as authority.

## Accessibility and privacy

Native buttons support Tab/Shift+Tab, Enter and Space; filters/selection expose
`aria-pressed`, use persistent DOM nodes, and retain focus. Each operation has
one polite atomic status region; static selection details are not a second live
region. Practice next/reset retain button focus and announce the current step.
Feedback is text, not color alone. Yoruba character/name spans carry `lang="yo"`.
All 25 cards/guidance, tone comparison and all 15 references render without JS;
inactive interactive controls remain hidden until client initialization.

Controls have visible focus and at least 44px height. Responsive grids support
320px and 390px layouts, use the existing system fonts/green/bronze palette and
introduce no motion. There is no persistent learner state, score, account or
submission. Automated diagnostics cover duplicate IDs, named buttons, landmarks,
heading count, target height, keyboard focus and layout overflow. A unit check
calculates sRGB contrast for the actual theme text/background variables (4.5:1).
This limited diagnostic set is not axe, a complete accessibility audit, or WCAG
certification. Manual screen-reader, zoom/high-contrast and broader browser/font
checks and specialist tone-mark placement review remain work for human review.

## Reproduce and review evidence

```sh
# root: Node 22.23.1 and Python 3.12.10
npm ci --ignore-scripts
npm test
python -m py_compile server.py tests/test_fileserving.py
# web: Node 22.23.4+ and locked dependencies
cd web
npm ci --ignore-scripts
npm run check
npm run build
npm test
npx playwright install --with-deps chromium
npm run test:browser
```

The unchanged reading workflow automatically discovers the new tests. The
existing 72 checks comprise 58 root tests, eight web parity tests and six
Chromium tests. Six new unit/static tests cover exact letter/gloss parity,
extraction negatives, no-JS markup, all 15 reference triples, tone feedback and
contrast. Six new Chromium tests cover keyboard filters/selection, practice,
reference filtering/reset/hostile input, mobile/semantics, network/media/storage
boundaries and the actual no-JavaScript browser fallback. Total: 84 tests.

PNG evidence is captured for desktop alphabet/pronunciation and both pages at
320px/390px in the private `reading-screenshots` Actions artifact (14-day retention),
alongside the prior reading screenshots. No compiled site or archive is uploaded.
Exact final-head commit/run/artifact links and results belong in the PR.

Local Windows: the 45 Node legacy/preservation/revision tests and verified data
preparation pass. Local Node is 22.23.1, below Astro's minimum; npm DNS and TCP
restrictions prevent a local web/browser execution. GitHub's pinned Linux
workflow must provide actual type/build/browser and real HTTP security results.
No restriction or security check is weakened to make local execution succeed.
Screenshots produced remotely require reviewer visual inspection; automated
layout assertions are not a claim of manual visual review.

## Preservation and rollback

No protected original file, `server.py`, source article, source metadata,
preservation manifest, SEC-01 revision or root security suite is changed.
The approved verifier still checks all 20 archive fields, 585 array entries,
113 articles, 128 source records, six community leads, 24 sacred profiles and
all supplementary material, IDs, citations and original wording. The full
archive hash remains:

`89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2`

Original manifest SHA-256 remains:

`80dd12a96f7ed804bb2602f85edbaef5c3371fa9799dc97633d8349297571a33`

SEC-01 server SHA-256 remains:

`6bcaa826444a7ab81b141636510f5fb94487ca79d9cc7e3f579f2b7ad142ad10`

Rollback: stop the local web preview and use root `index.html` offline, or revert
this task's web/docs changes together. No database, domain, production service or
content migration needs reversal. Never restore/expose the vulnerable original
Python server. SEC-01's documented public-deployment limitations still apply.

Next: owner-reviewed general quiz parity and interactive Ifá mathematical model
are separate tasks, not implicit continuation. Native recordings need their own
rights, consent, speaker/dialect attribution and linguistic review process.
