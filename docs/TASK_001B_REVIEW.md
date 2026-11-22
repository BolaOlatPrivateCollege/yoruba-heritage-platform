# Task 001B — Astro reading foundation handoff

Repository: BolaOlatPrivateCollege/yoruba-heritage-platform. Issue #6; PR #7.
Branch: `codex/001b-astro-reading-foundation`.
Approved starting main: `6bf53e8af6dd28703b046f63b155230635c0fe9f`.

## Delivered interface

Separate static-output Astro 7.4.13 app in web/, strict TypeScript 5.9.3,
Zod-validated importer adapter, pinned dependencies and npm lockfile. Node
22.23.4+ is required for the web app; the existing root workflow is unchanged.
The final reading workflow uses npm ci, never an automatic lockfile refresh.

There are 113 full-text article routes and 128 source-detail routes, a complete
library, six browse sections, six community-history leads, 24 Sacred World
profiles, ten research pathways, pronunciation/Ifá/glossary overviews, a compact
lazy search index, explicit editorial limits and a real 404 page. Original
canonical strings are escaped into static HTML, not executed as MDX or JavaScript.
No unreviewed images/audio are added. Dark green/bronze styling uses system fonts.

Native mobile navigation and collapsible article contents work with keyboard
input; Escape returns focus from the mobile section menu. A skip link targets
the focusable main region, links have visible focus, controls are labelled, and
search announces results. Full document navigation avoids SPA route-focus issues.

Search covers titles/decks/categories/section headings, accepts plain letters
without Yoruba diacritics, and ranks title matches ahead of incidental matches.
Display text remains original. Full paragraph search is not claimed. No raw
supplementary developer source or complete archive dump is shipped to clients.

Learning interactions (alphabet, quiz, atlas, timeline, saved readings, illustrative
256-cell model) are legacy-only and explicitly labelled. The new site supplies
original reading/guidance and links rather than pretending those tools are done.
No verses, source records, pronunciations or historical claims were generated.

## Exact preservation evidence

The approved importer is the sole preparation path. The typed adapter retains all
20 archive properties and their original arrays/fields; test comparisons include
all ordered IDs, not counts alone. Static DOM parity compares every article title,
deck, evidence classification/limit, ordered section heading/paragraph and citation.
Every source page retains its title, type, detail and original external URL. Every
generated internal href and section anchor resolves. No prose normalization,
trimming, Markdown parsing or HTML compression is applied to canonical material.

| Preserved inventory | Count |
| --- | ---: |
| Articles / source records / community leads / Sacred World profiles | 113 / 128 / 6 / 24 |
| Timeline / places / people / glossary / quiz | 24 / 11 / 12 / 30 / 15 |
| Research pathways / principal Odù labels / pronunciation entries | 10 / 16 / 15 |
| Deep research / name studies / author dossiers | 16 / 2 / 3 |

The full archive hash remains
`89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2`.
The original manifest and SEC-01 revision are byte-identical; server.py remains at
its approved SEC-01 hash. The remote original-file comparison finds only
.gitignore changed, for narrowly scoped web generated/test/screenshot exclusions.
Original root HTML, CSS, JS, importer/verifier, baseline tests and security fix are
untouched. All additions are web/, its separate CI workflow and this handoff.

## Executed tests and evidence

Implementation checkpoint `0e3d4fc5d6d37f493754eca193e85bc85b45ab0e` passed:

| Gate | Actual result |
| --- | --- |
| Original archive/security workflow | 12 legacy + 24 preservation + 9 revision + 13 real Python HTTP security tests pass |
| Locked web install | Pass; npm reports zero vulnerabilities |
| Astro strict check | Pass; no TypeScript errors |
| Static build | Pass; 113 article and 128 source routes generated |
| Web schema/parity/security tests | 8 pass; no failures/skips |
| Chromium browser smoke/keyboard tests | 6 pass; no failures/skips |
| Screenshots | Five desktop/mobile PNGs uploaded as private repository CI artifact |

Checkpoint workflow/log evidence:
- [Reading workflow](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45001799148)
- [Reading job logs](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45001799148/job/137144755967)
- [Original archive/security workflow](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45001799161)
- [Desktop/mobile screenshots](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45001799148/artifacts/14746785104)

This document is added after that checkpoint. Final PR-head runs and screenshot
artifact links are separately checked and recorded in the PR description before
handoff; a historic green run does not stand in for a later head check.

Screenshots: desktop-home.png and desktop-article.png (1440px viewport), plus
mobile-home.png, mobile-navigation.png and mobile-article.png (390px viewport).
Full-page captures are evidence from headless Chromium. Artifact retention is
14 days, with GitHub account/repository access required. No site build or raw
archive dump is uploaded; no public preview is created.

Local Windows checks: approved importer preparation, all 45 existing Node tests,
tracked-file exclusions, preservation verification and Python compilation pass.
Local registry access fails ENOTFOUND; local Node is 22.23.1, below this Astro
version's minimum. Web dependency install/typecheck/build/browser execution was
therefore performed and verified on GitHub Linux rather than claimed locally.
The initial pinned lock was resolved in GitHub during development and retrieved
for review; the temporary lock-generation step is absent from the final workflow.
No network or execution restrictions were weakened.

## Compatibility, rollback and remaining work

`/legacy-map.json` records every original #article/id and /section-N suffix as a
new /articles/id/ URL and #section-N fragment. The human-readable /legacy-links/
page explains it. No redirect is installed and no original link/bookmark/draft is
rewritten. The unchanged root index.html remains the offline/local rollback.
Stop the web preview and reopen that file to roll back; no SQL or data migration
is required. Reverting the scoped web/config/docs commits also removes the preview.

This is not WCAG certification, a screen-reader audit, a production performance
benchmark, a broad browser/device matrix or an independent historical review.
Specialists still need to review native-font Yoruba tone rendering and community
scope/rights. Search is metadata/headings only. Origin-root URLs need a separate
base-path review before subpath hosting. Current pinned Actions emit non-failing
runner deprecation warnings; dependency maintenance is ongoing work.

Source access limits, Samuel Johnson exclusion and indirect-dependency warnings,
unknown rights and unreviewed claims remain visible and unchanged. No Supabase,
live submissions, public accounts, production service, domain change, hosting,
deployment or merge is part of this task. SEC-01's broader pilot readiness limits
still apply; a static reader does not authorize public community intake.

Recommended Task 001C: one scoped interactive learning-parity slice and a deeper
keyboard/screen-reader review, keeping native-audio rights and editorial approval
as separate gates. Owner approval is required before merge or deployment.

See web/README.md for all reproducible commands, data-flow rationale and limits.
