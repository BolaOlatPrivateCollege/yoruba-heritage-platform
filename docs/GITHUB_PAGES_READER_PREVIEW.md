# GitHub Pages reader preview — setup guide (not yet online)

**Repository:** `BolaOlatPrivateCollege/yoruba-heritage-platform` (private, November 2026).
**Development branch:** `codex/github-pages-reader-preview`, stacked on private stories PR #43.

## Important privacy/plan facts
1. GitHub Pages is for **publicly reachable static content** on ordinary GitHub plans. A private source repository does not make the published website private.
2. GitHub Pages from private-source repositories requires an eligible paid GitHub plan. GitHub Free typically requires making the repository public. **Do not make this repository public** just to enable Pages: it holds editorial drafts, staging code and unpublished research materials.
3. A `noindex,nofollow` robots tag discourages indexing; it is **not access control**. Treat every deployed HTML page, audio file or illustration as readable by people who know the URL.
4. The existing GitHub account's subscription and its Pages configuration have not been verified here. This setup does not create an active URL.

## Prepared files
- `.github/workflows/github-pages-reader-preview.yml`: build and run checks; package the static site; **manual-only deployment** with exact `PUBLISH_PUBLIC` confirmation on `main`. Pull requests may build/test but cannot deploy.
- `web/scripts/prepare-pages-base.mjs`: rewrite generated internal root-relative links to `/yoruba-heritage-platform/`, including HTML/CSS and JS path references. Source files and archived records remain unchanged.

## Before activating Pages
1. Complete owner editorial review, remove any unacceptable internal page and ensure public output is limited to intentionally approved content. The static reader includes Research and community-facing pages even if a user never clicks them. Do not mistake unpublished story leads for approved articles.
2. Check repository Pages eligibility, status and plan in **GitHub → repository → Settings → Pages**.
3. Never switch the existing source repository to public to unlock a free plan without a separate explicit source-visibility decision.
4. Approve an exact commit and merge the selected story changes and Pages workflow in dependency order, not PR #43 alone (PR #43 depends on PR #41 and the others). CMS PR #42 is independent and must stay private.
5. On an eligible account set Pages **Build and deployment → Source: GitHub Actions**.
6. Use **Actions → GitHub Pages reader preview → Run workflow**, with `BUILD_ONLY` first. Download `reader-pages-build` artifact and inspect it.
7. Only when all included content has been approved, intentionally run with `PUBLISH_PUBLIC` from `main`. This step may make the static website publicly accessible.
8. Inspect the URL reported by GitHub's successful Pages deployment. For a project repository, it is generally `https://bolaolatprivatecollege.github.io/yoruba-heritage-platform/` unless using a custom domain or GitHub-assigned alternative. **Do not claim this URL is live until the provider confirms deployment.**
9. Check every link, figures, archival article, PDF/asset and static search result in a browser, including the new story chapter route `/tales/moremi-fire-in-the-reeds/`. Review mobile sizes and archive preservation. If anything fails, stop deployment and roll back the deployment from the GitHub Pages dashboard.
10. Because this version uses a nested project path, navigation and links must be smoke-tested against the actual deployed Pages URL; a green local root-path test alone is insufficient.

## What this preview cannot do
- Provide private/password-only access to visitors on ordinary GitHub Pages.
- Host a live PostgreSQL database, secure authenticated CMS or real moderated submissions. Those features require separate services.
- Make newly generated concept images visible until their approved binary files are uploaded.
- Supply narration to new literary manuscripts until a separate reviewed recording exists.

## Recommended path for current goal
The user wants **convenient browser access**, not an urgent public launch. Keep the current repository private and use the manual build artifacts now. Use GitHub Pages **only if the user accepts a publicly accessible version and the account supports private-source Pages**. Otherwise a separate access-controlled preview host is the secure alternative.
