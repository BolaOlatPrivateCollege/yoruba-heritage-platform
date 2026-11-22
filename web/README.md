# Àṣà & Ìtàn — static reading foundation

Task 001B / Issue #6. This separate `web/` application does not replace the root
prototype, start the Python pilot, publish a preview or provision a service.

## Run locally

Requires Node **22.23.4+** (Astro 7.4.13 requirement), npm and the pinned lockfile.
The original root tests continue to use their own pinned runtime and commands.

```sh
# repository root
npm ci --ignore-scripts
npm test
# then web/
cd web
npm ci --ignore-scripts
npm run check
npm run build
npm test
npx playwright install chromium
npm run test:browser
npm run preview -- --port 4321
```

For development: `npm run dev`. Both dev/preview bind to 127.0.0.1. Do not serve
the repository or `.generated` directory as public assets. Do not deploy without
separate approval. `npm run build` alone builds; run `check` separately to enforce
strict TypeScript diagnostics, as CI does. Browser tests require local TCP and
Chromium; Linux CI installs its system dependencies explicitly.

## Data flow and boundaries

`scripts/prepare.mjs` calls the **approved root importer**. It writes only the
verified archive object into ignored `web/.generated/archive.json`. It does not copy full `supplementarySourceText` into the new app. Task 001C also
extracts only the verified alphabet literals into ignored `.generated/alphabet.json`;
see ../docs/TASK_001C_REVIEW.md for extraction boundaries and exact provenance. The canonical raw archive
includes all supplementary arrays unchanged and remains outside `public/`.

`src/lib/archive.ts` is a server/build-only typed Zod adapter. This is an intentional
alternative to converting prose into Markdown/content collections: the legacy
data already has ordered structured sections, and a second parser would add
unnecessary transformation risk. The schemas retain unknown original fields,
validate required display fields/IDs/URLs, and resolve article/source/pathway
references. No schema trims, normalizes or rewrites canonical text. Tests compare
the whole parsed object and per-property/ID sets to the approved importer, then
compare every static section and source presentation to its original string.
HTML compression is disabled to retain prose whitespace. Astro escapes all text;
there is no set:html, contributed MDX/JavaScript, unvetted media or TTS.

The app creates 113 `/articles/<legacy-id>/` routes and 128 source-detail routes.
Browse sections expose original History, Language, Sacred World, Deep Research,
Sacred Names and author-study records. History is the original 18-article subset;
Language is a derived title/category filter and may overlap other collections.
Sacred profiles keep their original taxonomy and community scope. Ten research
pathways, six community leads, glossary and 15 pronunciation entries are visible.
Alphabet/tone learning and text pronunciation references are available at
/learning/alphabet/ and /learning/pronunciation/. Task 001D adds the full original
15-question knowledge review at /learning/quiz/. Map/timeline/bookmark interactions remain legacy-only. Task 001E adds the illustrative
16×16 Ifá mathematical explorer at /learning/ifa-matrix/. No verses or audio are added.

The search index contains only article IDs, titles, decks, categories and derived
normalized title/deck/section-heading keys. It is fetched lazily on the search
page; it contains no full paragraph bodies, source scripts or private data. Search
keys use Unicode decomposition plus mark removal; displayed spelling stays exact.
Search covers metadata/headings, not paragraph-level full-text search. Rendering
uses textContent and element creation, not interpolated user HTML.

## Compatibility and rollback

The root HTML/CSS/JS, server.py, original manifest and SEC-01 revision are unchanged.
Open root index.html locally/offline to use the original application. The new
`/legacy-map.json` maps all original `#article/<id>` and `/section-N` hash suffixes
to the new article/section routes. `/legacy-links/` explains and displays this map.
No redirects are installed; fragments are browser-side and cannot be handled by
server redirects alone. No existing links, bookmarks or drafts are migrated.

Rollback: stop the web preview and reopen root index.html, or revert this task's
web/config/docs changes. There is no database/schema/domain migration to reverse.

## Verification and remaining work

CI retains all existing legacy/preservation/SEC-01 checks and separately runs
locked web install, strict Astro diagnostics, static build, eight schema/parity/
security tests, and six Chromium smoke/keyboard tests. Static tests cover every
article paragraph/evidence/citation, all 128 source routes, all internal hrefs and
anchors, legacy mappings, negative schema/FK cases and public-output exclusions.

Browser tests cover skip-link focus, desktop and mobile navigation, Escape focus
return, diacritic-insensitive search, keyboard citation navigation, narrow-screen
overflow, 404 status and hostile search input. They capture desktop and mobile PNGs
as the private-repository `reading-screenshots` Actions artifact (14-day retention).
No compiled site or archive dump is uploaded. See the PR for exact final-head
workflow/job/artifact links and actual results. Screenshots are engineering
evidence, not approved public publicity.

No screen-reader/manual WCAG certification is claimed. No automated contrast
scanner, broad device/browser matrix, external reference availability audit or
performance benchmark is implied by the smoke suite. System fonts avoid remote
font requests, but native-font rendering and Yoruba tone placement need specialist
review. Layout assumes origin-root routes; deployment under a subpath needs a
separate base-path review. No production base URL or canonical-domain claim is set.

Claims remain unreviewed and rights unknown in this reading preview. Source access
notes, author/edition limits, Samuel Johnson exclusion, regional voices and
community permission restrictions are preserved. No Supabase, live submissions,
accounts, private testimony, uploaded recordings or hosting are introduced.

Task 001C adds six unit/static and six browser tests, including 320/390px screenshots,
no-JavaScript fallback and text-only media/network boundaries. The existing workflow
automatically runs them. See ../docs/TASK_001C_REVIEW.md and the Task 001C PR for
final-head results, remaining manual accessibility/linguistic review and rollback.
Task 001D adds seven quiz unit/static and seven browser tests, retaining all 84
existing tests. See ../docs/TASK_001D_REVIEW.md for exact quiz provenance/hash,
validation, keyboard/session behavior, no-JS fallback, CI links and rollback.
Quiz progress is page-memory only, with no storage or backend; the archived key
is not independent historical verification. The separately scoped Ifá model is implemented in Task 001E. No automatic continuation, merge or deployment is authorized.


Task 001E adds the illustrative 256-pair classroom explorer, linked from Learning
and desktop/mobile navigation. Exact original labels/order come only from the
approved build-time archive adapter. Binary codes encode zero-based positions,
not authenticated sacred signs, liturgical ranking or computer-invention priority.
The semantic table has native buttons, roving focus, arrow/Home/End navigation,
Enter/Space selection, a polite live region and visible non-colour feedback.
Native row/column selectors expose every pair on narrow screens without scrolling.
With JavaScript unavailable, inactive controls stay hidden and the labels, maths,
cultural limits and source links remain readable. Selection is page-memory only.
No new dependency, storage, media, external request, API or infrastructure is added.

Eight unit/static and ten browser tests extend the original 98 to 116, all passing
with no failures or skips on the verified implementation head.
The unchanged workflows run locked installs, strict Astro/TypeScript checks, build,
unit tests, preservation/security checks and Chromium; screenshots at 1440/320/390px
are in the private reading-screenshots artifact. See ../docs/TASK_001E_REVIEW.md
and the PR for actual final-head CI results, commands, evidence and limitations.
Verified implementation CI: [Archive quality](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45019125150),
[Reading interface](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45019125261),
and [1440/320/390px screenshots](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45019125261/artifacts/14752369029).
See [PR #14 checks](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/pull/14/checks)
for the complete rerun on the final documentation head.
Manual screen-reader/zoom/RTL and cultural/practitioner review remain outstanding;
no WCAG or ritual authenticity certification is claimed. Rollback: revert only
001E changes or reopen the untouched root prototype locally. Nothing is merged
or deployed; hosting and automatic deployment are unchanged.
