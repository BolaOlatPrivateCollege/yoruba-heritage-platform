# Reader publication inventory and release decision record
**Àṣà & Ìtàn Yorùbá · prepared 23 November 2026 · status: NOT AUTHORISED FOR DEPLOYMENT**

This document prepares the **reader and approved collections** for an eventual explicit owner-approved public release. It neither approves a merge nor authorises enabling production. The platform collects **what is told**, from community traditions and varying perspectives to original literary retellings. It is **not an arbiter** certifying one telling as the single historical truth.

## Release units

### A. Reader content — drafted and under editorial review
| Reader slug | Work | Type | Chapters | Artwork | Narration | Final owner sign-off |
|---|---|---|---:|---|---|---|
| `/tales/laughing-mask/` | Who Was the Laughing Mask Talking About? | Original Gẹ̀lẹ̀dẹ́-inspired fiction | 6 | Existing reader artwork subject to review | Not assumed approved | Pending |
| `/tales/esu-hat-two-views/` | The Hat That Divided the Road | Original retelling of a traditional motif | 6 | Current reader treatment | Not yet recorded for this manuscript | Pending |
| `/tales/olodumare-many-meanings/` | The Name That Would Not Fit Into One Answer | Original educational fiction | 6 | Current reader treatment | Not yet recorded for this manuscript | Pending |
| `/tales/ijapa-feast-nobody-could-finish/` | Ìjàpá and the Feast Nobody Could Finish | Original trickster fiction | 6 | Concept only; not in repository | Not produced | Pending |
| `/tales/moremi-fire-in-the-reeds/` | Mọ́remí and the Fire in the Reeds | Original literary telling of Ifẹ̀ traditions | 6 | Concept only; not in repository | Not produced | Pending |
| `/tales/lisabi-farmers-promise/` | Lísàbí and the Farmers' Promise | Original literary telling of Ẹ̀gbá traditions | 6 | Concept only; not in repository | Not produced | Pending |
| `/tales/sango-when-thunder-answered/` | Ṣàngó: When Thunder Answered | Original framed fiction; living sacred tradition context | 6 | Concept only; not in repository | Not produced | Pending |
| `/tales/timi-gbonka-two-champions/` | Tìmì and Gbónká: The Duel That Would Not End | Original rivalry-motif literary telling | 6 | Concept only; not in repository | Not produced | Pending |

The reader also includes a **30-entry Warriors, Heroines & Legendary Mysteries discovery collection**, linked to the four complete hero/rivalry manuscripts. Its remaining entries are *story leads*, not 30 more complete tales.

### B. Earlier archives, documentary assets and site sections
- **113 archived articles and 128 source records:** maintain unchanged archive content/hashes and existing evidence navigation; editorial audit before deciding which draft materials are intended for public exposure.
- **Five preserved Google AI Studio Fola documentary recordings:** retain original files, transcript hashes, credits and source links. Do not attach them to the newly written manuscripts merely because their subject overlaps. Verify individual audio licensing and accurate subject-to-script matching before release.
- **Beliefs & Figures, Places, Learning, Research, Stories and Community preview:** release read-only pages only after editorial and security acceptance. Preserve meaningful separation of reader tellings and independent documentary evidence in Research.
- **Community Voices preview:** intentionally local or private demonstration; no collection of personal data, comments, attachments or contributions. No public-facing submit, login or moderation action may become active at launch.

### C. Private CMS — NOT included in a public-reader launch
- PR #42 is a **non-operational CMS foundation**: contracts, PostgreSQL schema, mock/real test adapters and local preview only. It is not a secure production application with login, sessions, ownership, backups or actual publish-service orchestration.
- If a static public-reader launch is authorised ahead of CMS readiness, the editorial process remains **Git-based private drafts + explicit owner approval for each release**. The CMS must be deployed independently **only after** its own security, consent, owner-MFA, backups and staging checks.
- Never deploy `cms/admin-preview`, local draft adapters, test endpoints, credentials, or internal editorial manuscripts to an openly reachable service.

## Five illustration concept files (editorial preview only)

An illustration concept bundle was created in the conversation and remains outside this GitHub branch. These filenames describe the local files, **not references to deployed website assets**:

| Manuscript slug | Concept filename | Alt text draft |
|---|---|---|
| `ijapa-feast-nobody-could-finish` | `ijapa-feast-concept.webp` | An illustrated tortoise hides covered bowls while animals gather for a village feast |
| `moremi-fire-in-the-reeds` | `moremi-forest-concept.webp` | An illustrated woman moves through dark reeds towards a distant settlement |
| `lisabi-farmers-promise` | `lisabi-farmers-concept.webp` | An illustrated speaker addresses a gathering beside baskets of produce |
| `sango-when-thunder-answered` | `sango-thunder-concept.webp` | A storytelling gathering watches storm clouds around a ceremonial double-axe motif |
| `timi-gbonka-two-champions` | `timi-gbonka-duel-concept.webp` | Two illustrated champions face each other in front of a gathered crowd |

**Artwork limitations:** these five files are derived from a collage and may show seams, cropping, imaginative costumes and visual anachronisms. Check actual pixels, accessible crops, rights and cultural presentation. They should not be labelled historic photographs, original oral testimony, religious artefacts or factual visual reconstructions. They are **not yet part of the website**. No reader code may point to a file until its approved bytes are actually committed and served.

## Must-pass public-release gates

1. **Owner's exact scope approval** for named site sections, archival records, and each reader work. Approval of the story manuscripts is not implicit approval of all archives or unverified submissions.
2. **Editorial acceptance:** independent Yorùbá spelling/tone/grammar check; culturally informed reading of sacred figures, Mọ́remí/Ẹ̀dì, Lísàbí/Ẹ̀gbá and Tìmì–Gbónká variants; no invented quotations impersonating palace or elder testimony. Source-led text and original fiction identified as such.
3. **Rights:** manuscript provenance, illustration generation/licence terms, image/voice model rights, any attributed teller consent, contributor-age safeguarding and documentary audio rights logged; no copyrighted modern retelling copied.
4. **Asset quality:** confirm five approved individual artworks, alt text, crops, mobile performance and no historical-authenticity implication; upload them to version-controlled or approved asset hosting **only after review**. Newly narrated scripts must match every spoken line and final chapter.
5. **Technical:** passing pinned-build archive quality, type/lint, unit and Playwright 320px/390px/desktop tests on the **exact candidate SHA**; privacy boundaries, content security, no public admin endpoints, no collecting user data. Review site noindex policy before launch; **never remove it automatically**.
6. **Infrastructure:** select independent hosting provider, data region, cost and DNS; protected staging with owner review; HTTPS, secrets, backups/restore, rollback, monitoring and deployment privilege separation.
7. **Release rehearsal:** preproduction screenshots, link audit, accessibility and screen-reader review, proofread copy, check asset hashes, verify static public build contents include no private CMS or unpublished community material.
8. **Final explicit deployment authority:** owner approves the exact release SHA, selected hosting/domain, which sections are public, search-indexing decision and rollback plan. A general “proceed” during drafting is **not** this approval.
9. **Postrelease:** verify site availability, mobile links, archive hashes, privacy controls and analytics consent if any. Preserve an immediate owner-authorised rollback path.

## Blocking decisions / work as of this revision
- No independently provisioned hosting, domain or production environment.
- No working single-owner CMS authentication, MFA, staging, backup/restore or secure publish pipeline.
- No completed rights/linguistic/community editorial reviews.
- Artwork exists as local **concept files**, not verified, uploaded web assets.
- Newly written manuscripts have **no verified matching audio**; the five preserved Fola tracks belong to earlier documentary material.
- Owner has asked to **prepare** publication, but has **not authorised an exact deployment** or opening indexing/real submissions.

**Result: PREPARATION IN PROGRESS — NOT READY TO DEPLOY.** The static story pages can be staged for review independently of later CMS development, but all listed gates remain applicable.
