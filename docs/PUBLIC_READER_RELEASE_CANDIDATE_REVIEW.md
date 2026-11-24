# Public reader candidate — editorial, privacy and technical acceptance register
**Àṣà & Ìtàn Yorùbá · 23 November 2026**
**Status: HOLD FOR EDITORIAL APPROVAL — NO DEPLOYMENT**

This file describes a **release candidate**, not permission to publish every repository file. The user chose a public GitHub repository and a GitHub Pages reader, but explicitly requested **checks before deployment**. On GitHub Pages, `noindex` does not restrict who can read a URL. Source code and repository history are already visible because the repository is now public.

## Scope
- Static public-readable pages: homepage, eight complete six-chapter tales (seven `livingEpisodes` and the existing Gẹ̀lẹ̀dẹ́ tale), 30-entry **story-lead** discovery section, read-only Beliefs & Figures, Places, Community overview, Learning, and Research/archives.
- Existing 113 article records and 128 source records remain unchanged. These are **archive records**, not 113 newly reviewed/community-verified oral histories.
- Excluded from Pages output: the locally interactive `/community/share/` form, private editing/admin/CMS services, file uploads, any new community submissions, and local review/source documents. Links to the private walkthrough redirect to the read-only `/community/` page.
- Existing documentary audio is not retroactively assigned to newly written literary tales. The five new visual cover concepts remain outside the repository until separately reviewed and explicitly selected.

## Editorial manuscript sampling actually completed
Reviewed the **first chapter excerpt, introductory provenance line, six chapter headings and concluding passage** in each of the following repository originals:

| Tale | Introductory disclosure exists | Six chapter structure | Sampled editorial observation | Human review still required |
|---|---|---|---|---|
| Ìjàpá and the Feast Nobody Could Finish | Yes; plot and cast openly invented | Yes | Original trickster tale; no named real elder impersonated | Yorùbá folktale register and àlọ́ terms |
| Mọ́remí and the Fire in the Reeds | Yes; not a custodian transcript | Yes | Invented Adúnní viewpoint and emotional final chapter differentiated from commemorative source | Ilé-Ifẹ̀ / Ẹ̀dì tradition depiction, river vow variation and tone marks |
| Lísàbí and the Farmers' Promise | Yes; invented Yẹ́mí and Bàbá Láyí | Yes | Local Ẹ̀gbá historical-memory label rather than a documented battle sequence | Ẹ̀gbá names, chronology and tribute account |
| Ṣàngó: When Thunder Answered | Yes; no diviner's words or sacred verse claimed | Yes | Living practitioner traditions noted; royal conversations are literary | Sacred emblems, exact relationships and practitioner consent/cultural sensitivity |
| Tìmì and Gbónká: The Duel That Would Not End | Yes; invented Aṣàkẹ́ and ending | Yes | Different ending traditions explicitly acknowledged | Local spelling, narrative version, king's role and contest accounts |

**Sampling limits:** The above is NOT a complete line-by-line Yorùbá language edit, formal clearance by community representatives, provenance verification of every motif or permission to treat imagined dialogue as eyewitness evidence. The website is a **collection of tellings**, not an historical certification body, but it must still differentiate actual attributed testimonies from fiction. Do not derive historical facts from Samuel Johnson's books or their derivative summaries; preserve old archived references as archive metadata, not as editorial authority for new stories.

## Privacy checks — package gates
The Pages packaging workflow runs `npm run check`, a static build, unit tests, project subpath conversion and a final artifact audit.
- Required static reader routes must exist.
- `community/share` is removed from the **generated artifact** (underlying development source remains in the public GitHub repository).
- Any internal compiled HTML links into that private demo redirect to read-only Community.
- `search/` and `sources/` contain client-side search/filter forms and are allowed; all other unexpected forms, textareas and upload fields fail packaging.
- Unprefixed root links, missing `noindex,nofollow`, admin/API/CMS routes, and common sensitive/source file formats fail packaging.
- No username/password, public moderation endpoint, new upload API or PostgreSQL backend is introduced by this candidate.
- This is **artifact-level** inspection, not a credential leak audit over the complete Git history. An independent repository/history secrets review is still a blocker because the source repository is now public.

## Technical checks still needed after CI
1. Inspect final action results, including `GitHub Pages reader preview`, `Reading interface` and `Archive quality`, on the **same candidate SHA**.
2. Download the `reader-pages-build` ZIP and inspect/read static HTML, links and image fetches using the **`/yoruba-heritage-platform/` base** rather than root-local URLs. Verify `/search/` and article links after conversion.
3. Test Chrome and mobile viewport links, keyboard navigation, skip links, screen reader landmarks, image alt text, CSP expectations and `404.html` behaviour.
4. Verify fonts, images, audio/codec support and rights notices. New concept covers and new tale audio are not yet integrated and are **not required** for an initial text-only launch unless separately approved as launch scope.
5. Review metadata: the site retains a **private engineering preview** banner and `noindex,nofollow` everywhere. Decide whether to update copy and indexing only in a final, specifically approved release commit. For an unpromoted preview, keep the noindex marker.
6. Review all Research/archives for copyrighted text and links as well as any addresses, personal data or unapproved third-party material. Preserve archived hashes; do not secretly alter records.
7. Check GitHub repository public commit history with a secret scanner and revoke exposed credentials if discovered. Making a repository private again does not erase clones.

## Deployment controls
- Dependency order: #41 (community reader prototype) → #43 (story expansion) → #44 (Pages build) → #45 (release-candidate privacy package); #42 (CMS foundation) remains **excluded**.
- All changes remain **draft PRs**. No unattended deployment: workflow requires explicit `PUBLISH_PUBLIC` on `main` after owner authorises the exact SHA and scope.
- Pages URL is only confirmed after a successful Actions deployment; a successful build artifact is not a live site.
- If the owner wants access without public exposure, **GitHub Pages is not an access-controlled private preview** on ordinary plans.

## Release decision
**NOT APPROVED TO DEPLOY** until unresolved rights, language/cultural review, source/history security review and end-to-end path inspection are complete, and the owner explicitly approves the exact release SHA and public scope. Keep CMS, community intake and any unreviewed archival private material out of the deployed artifact.
