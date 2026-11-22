# Task 001E — illustrative Ifá mathematical explorer

Issue #13; branch `codex/001e-ifa-illustrative-matrix`; base main
`92c5afb54c424f36c4cdc1e6aa8803926b920660`. Implementation only: no merge,
publication approval, deployment, hosting or external infrastructure change.

## Scope and provenance

Adds `/learning/ifa-matrix/` to the existing Astro app. Uses only the build-time
`archive.oduMainNames` adapter, preserving the exact 16 original strings and order.
The legacy `deep-heritage-ui.js` prototype supplies the teaching semantics:
zero-based indices, four-bit positional codes, pair `row*16+column+1`.
Only labels and derived pair addresses enter the page; no full archive enters
the browser script. No new dependencies, media, verses, translations, sign diagrams,
spiritual readings, source assertions or historical claims are introduced.

The pair numbers and binary codes are arbitrary modern classroom encodings.
They establish neither ritual authenticity nor liturgical ranking, a sacred
sign-to-binary correspondence, complete verse texts or computer-invention priority.
The existing `/articles/deep-ifa-odu-binary/` and `/articles/deep-ifa-tradition/`
chapters retain their evidence categories and review/source limits unchanged.
Actual sign patterns, lineage ordering, interpretation and translation require
separate competent practitioner/custodian and scholarly editorial review with
provenance and rights. No reading of new source pages is claimed.

## Interaction and accessibility

Native buttons in a semantic labelled table use `aria-pressed`, one roving Tab
stop, a visible check mark, selected border/colour and a visible focus outline.
Arrow keys move focus only, preserving selection. Enter/Space select. Home/End
reach row edges; Control+Home/End reach the whole matrix's edges. Boundaries clamp.
Tab leaves the matrix. The scroll region is separately keyboard-focusable.
Its sticky row labels remain visible during horizontal scrolling. The table has
column/row headers, a caption and associated instructions/cultural limits.

Two labelled native selectors expose all 256 choices without matrix scrolling.
Selectors update details without stealing focus. Selection resets all roving
indices, including after navigation away from the selected button. Details
announce the pair, both Yoruba names (`lang="yo"`) and codes in a polite atomic
live region. Reload resets selection; no cookies, storage, network or backend.
Astro escapes static strings; the client uses textContent and text nodes only.

All matrix targets are at least 44×44px; selectors are at least 48px tall. Narrow
layouts stack the workbench and contain horizontal scrolling within the matrix.
Reduced motion uses immediate scrolling. Forced-colour selection retains a border
and check mark. Tests calculate theme text contrast and exercise a 200% text-size
layout with reduced motion; that is not a manual browser zoom certification.

Initial HTML hides all inactive controls and displays an honest JavaScript-required
notice. The complete label list, mathematics, cultural limits and research links
remain readable with scripts disabled or unavailable. No misleading active grid.

Not WCAG certification: manual screen-reader/browser combinations, native select
pronunciation, Yoruba diacritic placement, full-page contrast audit, manual zoom,
RTL embedding and broader devices remain unverified. Yoruba is displayed in its
natural left-to-right order; no RTL localisation is claimed.

## Preservation and content impact

| Protected inventory | Count / SHA-256 |
| --- | --- |
| Articles / sources / community histories / sacred profiles | 113 / 128 / 6 / 24 |
| Original quiz / pronunciation / principal teaching labels | 15 / 15 / 16 |
| Complete archive | `89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2` |
| Exact ordered Odù labels | `92b877e266d6d66cc9a62dc9b00ed9c257ef65c175e0d055f30aaa18b0887ddb` |

All protected source files, `preservation/baseline.json`, SEC-01-v1 and `server.py`
remain byte-identical. No canonical content, review state or source rights changed.
One existing browser assertion is updated solely because the 256-cell model is
now linked from learning. All other legacy-only tools retain their status.

## Verification

Commands used by the unchanged CI workflows:

```sh
npm ci --ignore-scripts
npm run verify
npm run verify:preservation
python -m py_compile server.py
npm run test:security-revision
npm run test:security
cd web
npm ci --ignore-scripts
npm run check
npm run build
npm test
npx playwright install --with-deps chromium
npm run test:browser
```

Verified suite: 116 tests = 12 legacy + 24 preservation + 9 security revision +
13 HTTP security + 29 web unit/static + 29 Chromium tests. All original 98 tests
are retained; 8 unit/static and 10 browser tests are added. New checks cover every
pair through buttons and mobile selectors, exact Unicode/per-record/full hashes,
all navigation boundaries, invalid inputs, safe hostile text, no-JS content,
source URLs, no archive leak, storage/network limits and narrow layouts.

Screenshot evidence is captured by Chromium at 1440, 320 and 390px as
`ifa-1440.png`, `ifa-320.png`, `ifa-390.png` in the existing private Actions
`reading-screenshots` artifact (14-day retention). Final-head workflow links,
actual counts and artifact evidence are recorded on the PR after checks finish.

Verified implementation head: `f9d6eb7a40350c9310b87745f81cc11a4a4323a9`.
All 116 tests passed with zero failures/skips; Astro reported zero errors,
warnings or hints. Both locked installs, the static build and all Chromium tests
passed. The exhaustive 256-click test took 36.1 seconds; it has a bounded 90-second
budget without retries or reduced assertions. All 256 mobile selector combinations
also passed. The three widths had no document-level horizontal overflow.

- [Archive quality — passed](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45019125150)
- [Reading interface — passed](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45019125261)
- [Desktop/mobile screenshot artifact](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45019125261/artifacts/14752369029)
- [PR #14 and current final-head checks](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/pull/14/checks)

The linked run evidence precedes this documentation-only update. Final-head runs
and its exact SHA are reported on PR #14 after the complete checks rerun. The
artifact contains `ifa-1440.png`, `ifa-320.png` and `ifa-390.png` alongside existing
feature screenshots; it expires 6 December 2026 under the unchanged retention
policy. Screenshot capture is automated; no manual visual or screen-reader audit
is claimed. No tests or required workflow gates are disabled or silently skipped.

Local checkout note: the existing downloaded copy was not a Git checkout and had
trailing-byte differences. It and the earlier drafts were preserved. A separate
checkout was materialised from verified GitHub blob hashes, the exact tree and
the original signed main commit; no synthetic baseline commit was substituted.
Git transport/DNS and HTTP sockets are blocked in this Windows sandbox. Root
non-network checks can run; HTTP tests fail with WinError 10013 and three platform
symlink cases skip locally. The web locked install fails and local Node 22.23.1
is below Astro's 22.23.4 requirement. Linux CI is required for the complete gate;
no local failure or skip is treated as a pass.

## Rollback

Before merge, close the PR to leave main unchanged. If separately approved and
merged later, revert this task's commit(s), removing the route/client/styles/tests
and restoring its navigation/status changes. No data or schema migration exists.
The untouched root `index.html` and `deep-heritage-ui.js` remain the original local
prototype fallback. Do not roll back SEC-01, alter protected manifests or deploy.

Technical PR review and explicit owner authorisation are required before any
merge. Deployment requires its own separate decision. Nothing is merged or deployed.
