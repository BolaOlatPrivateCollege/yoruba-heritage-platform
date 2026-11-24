# Upload owner-approved original heritage art to the figure reader

## Current scope
Six image binaries were generated and approved by the owner in the design conversation. This GitHub branch has the **page integrations and captions but does NOT yet contain the six images**. Until they are uploaded, the reader deliberately hides image elements rather than displaying broken links.

## Folder
Upload the six optimised `.webp` files into `web/public/images/` on branch `codex/deep-osun-living-profile` (the folder now exists). The downloadable ZIP supplied in the conversation contains an `images/` directory with the precise names. **Extract it first**; GitHub's Add file → Upload files does not unpack a ZIP.

- `orunmila-ifa-tray.webp`
- `obatala-artistic-portrait.webp`
- `oduduwa-artistic-statue.webp`
- `ogun-artistic-portrait.webp`
- `sango-thunder-artistic-portrait.webp`
- `osun-riverside-illustration.webp`

## Validation
After upload, the next GitHub Actions build should generate individual figures with native width and height, responsive max-width CSS, a descriptive alt, and a caption that clearly says **AI-generated**, not authentic historic photography. All links are absolute in the source and rewritten for the GitHub Pages project subpath in its build artifact.

Open each generated profile `/figures/{slug}/` and check visual quality, portrait crop, page length, caption readability and URL correctness. No source reference photographs are included in this upload.

Do **not** change the pinned public GitHub Pages commit or merge the stacked PRs without reviewing the completed build. The new artistic illustrations are approved; the related historical text and full source tree remain subject to their separate gates.
