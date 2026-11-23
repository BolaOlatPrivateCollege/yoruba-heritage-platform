# Illustration standard — Stories & Living Memories

**Owner approval:** AI-generated images may be used to make story chapters engaging **when clearly labelled**. This policy addresses images, not the final approval of a particular story, media licence, public release or ritual representation.

## Core rule

**Every AI-generated visual must be visibly identified as generated/illustrative, never passed off as an archival photograph, a traditional source object, an actual interview, a verified scene from an historical event, or an authentic depiction of a specific sacred performance.**

Recommended reusable reader-facing captions:
- **Original fiction:** `AI-generated illustration of an imaginary scene. Characters and events in this story are fictional.`
- **Folktale / oral tradition:** `AI-generated artistic interpretation of a traditional tale as told in [named permitted version]. Not a historical photograph or authenticated ritual depiction.`
- **Historical learning scene:** `AI-generated imagined scene to support this story. Clothing, people and setting are illustrative, not documentary evidence.`
- **Sacred or restricted tradition:** Art pending culturally competent review. If approved: `AI-generated conceptual illustration, not a depiction of an actual ceremony or sacred object.` Avoid suggesting that the art depicts an authoritative visage of Olódùmarè, Èṣù, Ifá or a living custodian. **No caricature borrowed from unrelated Christian devil imagery.**
- **Real artefact or place:** use a properly licensed/documented real image when accuracy matters; do not generate a “replica” and claim it is a real photograph of the site or object.

Labels should be **adjacent to every visual**, not hidden only in About or metadata. Do not obscure or remove provenance; avoid misleading filenames/alt text/captions. Screen reader alt text should describe **what is seen**, with fictitious status in the surrounding caption (unless necessary to prevent ambiguity). On story cards, give a short `AI illustration` label; on the full story page include the longer caption.

## Art direction for the initial pilot

- Mood: joyful, captivating, sophisticated painterly graphic-novel aesthetic—not scary propaganda, not generic textbook clip-art, not photorealistic reconstruction masquerading as documentary.
- First story **“Who Was the Laughing Mask Talking About?”**: focus on a contemporary fictional student Kẹ́mi and her friend Sẹ́gun, a short rumour video, lively market colour and the puzzle of how an edited caption changes a story. Masked performance may only be visualised with restraint and additional cultural review; no fictional design should be implied to be a verified specific Gẹ̀lẹ̀dẹ́ sacred image.
- Other visual series can use distinct palettes: indigo/maker's mystery, moonlit àlọ́ folktales, river and forest in living-heritage tales, city-pattern town legends, and contemporary diaspora memories.
- All images must support **real story text and the actual intended level**; no stock “African village” generalisation, fabricated historical uniforms or stereotyped supernatural evil iconography.
- Avoid identifiable real people, age-inappropriate imagery, sacred secrets, real children's names and unwanted cultural conflations.
- Do not prompt an image model to reproduce photographs from the Smithsonian, UNESCO, a named living artist, a specified copyrighted image, or an unlicensed oral storyteller's likeness. Reference sources explain cultural context to the editorial team, **not a tracing target**.

## Asset-level approval and technical safeguards

Maintain a **private** asset manifest:
`id, story_id, story_revision, filename, category, created_on, generated_with, prompt_summary, prompt_hash?, output_hash_sha256, exact_source_license_terms_review, generator_rights_review, owner_signoff, cultural_review_if_sensitive, approved_context, caption, alt, approved_placement, withdrawal_version`.

No user photo uploads to an external image generator without that user's explicit consent. Before publication, check the generator's terms for rights to host images and whether AI-generated media labels/metadata are required.

- For cards, output a responsive **WebP/AVIF** derivative after review; keep original master separately, optimise size and cap resolution. Avoid layout shift by providing explicit width/height. Low-bandwidth delivery and text-first fallback.
- Escaping/sanitisation: do not render user-supplied captions as arbitrary HTML. Keep media under whitelisted static paths and never allow unreviewed image uploads directly into a public folder.
- Every image should have sufficient contrast for adjacent text, be keyboard-independent and not substitute for educational information only contained in pixels.
- If a community contributor provides a real photo, preserve the owner's credit and permission **separately** from the AI illustration pipeline. Do not erase meaningful real testimony through an attractive AI replacement.

## First generated cover concept — 23 November 2026

One **original AI image concept was generated for the fictional Gẹ̀lẹ̀dẹ́ mystery** using ChatGPT image generation. It depicts a fictional modern-market learning situation involving two students; it is **not** an image of a particular actual Gẹ̀lẹ̀dẹ́ event, nor a model of an authenticated mask.

- Chat private review image: `gelede-story-art-concept-private.jpg` (1200×675, approx. 322 KB).
- Preview derivative SHA-256: `6dfd5f0dcef2dbb5a2ac38bcb9f91930d6a68f96fc04c56339a5976a20e04a61`.
- Original generated PNG 1672×941, SHA-256 `dee1854e3f9032696349ba1d66d042095a1159137c27fae912b9e55a0c335662`.
- **The image file is not in the GitHub repository and is not yet approved for public use**. This metadata is for traceability; no screenshot is evidence of a real Yorùbá ceremony.
- Caption if the owner later approves embedding: `AI-generated illustration for an original fictional Yorùbá-inspired mystery. Not a photograph of a real performance, person or historical event.`

## Review gate

Owner approves story and illustration pairing **separately**. A culturally knowledgeable reviewer checks visuals involving living spiritual traditions and specific community dress/objects. No image is published, deployed or added to indexed pages through this document alone. Existing documentary artworks and sacred data remain unchanged.
