**Codex first run:** After importing this complete repository into a private GitHub repository, begin with `docs/CODEX_TASK_000.md`. This is a non-destructive baseline audit; only proceed to task 001 after review.

# Àṣà & Ìtàn — Yoruba Heritage Platform

**Latest author-library update (22 November 2026):** 113 chapters, 128 source records, three new author profiles (Olúwọlé, Ẹlẹ́buìbọn, Abímbọ́lá), 10 Research Centre pathways. See [`docs/OLUWOLE_ELEBUIBON_ABIMBOLA_RESEARCH_GUIDE.md`](docs/OLUWOLE_ELEBUIBON_ABIMBOLA_RESEARCH_GUIDE.md) and [`docs/CODEX_TASK_004.md`](docs/CODEX_TASK_004.md). 2017 Olúwọlé text was partially inspected; other books were checked primarily through bibliographic records. These are not full reviews or publication approvals.

**Engineering foundation (pre-Astro migration, pre-deployment).** This repository preserves the source-transparent, community-centred 68-chapter prototype and establishes the Codex engineering workflow. Its historical claims have **not** all been independently verified.


## Latest integration — Deep Research + Sacred Names (22 November 2026)

The `#research` hub now includes **18 standalone source-linked research studies**, organised into nine pathways. New topics: creation myths and oral storytelling; pronunciation (audio-ready, no fabricated native voice); indigenous spirituality alongside Christianity and Islam; church and mosque history; ancient DNA; Ihò Eléérú; Ifá study and 256 mathematical sign pairings; Ge’ez; traditional governance; linguistic personal names; Ẹlẹ́yẹ; Ọbàtálá; and modern practice.

Two dedicated nine-section chapters cover **Olódùmarè** and **Òrìṣà** and carefully distinguish sacred meaning from unsettled historical etymology. The new total is **110 chapters and 113 source entries**. Refer to [`docs/RESEARCH_INTEGRATION_AUDIT.md`](docs/RESEARCH_INTEGRATION_AUDIT.md) and [`docs/CODEX_TASK_003.md`](docs/CODEX_TASK_003.md).

**Limitations:** The 16×16 Odù grid is a mathematical teaching representation, not a full set of 256 authenticated literary interpretations. Voice lab entries are text and tone guidance; genuine audio must be recorded by approved native speakers with permission (see `assets/pronunciation/README.md`). Community participation still uses local-only moderation until a production backend is developed. Chrom(e/ium) browser access was blocked in the build container; only syntax/integrity tests ran.

## Quick start
- Open `index.html` in a browser to inspect the original prototype (some actions are local-demo only).
- Install Node.js 22 or later, then run `npm ci` and `npm run verify`.
- `server.py` is an experimental local-pilot service; **never deploy it publicly as-is**.
- Read [`START_HERE_TECH_LEAD.md`](START_HERE_TECH_LEAD.md) and [`AGENTS.md`](AGENTS.md) before implementation.

## Engineering status
- Project setup and baseline tests: implemented.
- Astro conversion: planned in [`docs/CODEX_TASK_001.md`](docs/CODEX_TASK_001.md).
- Hosting, Supabase, live accounts and production discussions: **not configured**.
- One-time GitHub repository setup: [`docs/REPOSITORY_SETUP.md`](docs/REPOSITORY_SETUP.md).

## Policy
Preserve named regional traditions, evidence categories and Yoruba diacritics; respect rights and consent for recordings and community material. Do not source facts from Samuel Johnson's books. See [`EDITORIAL_POLICY.md`](EDITORIAL_POLICY.md).

---

# Àṣà & Ìtàn — The Yorùbá Heritage Encyclopaedia

**Expanded prototype — 22 November 2026**

An interactive, community-centred educational website built from the original Yoruba History Atlas. It now combines the existing history atlas and community-voice material with **50 new source-linked thematic readings** in **12 subject collections**. Total: **68 chapters**, including **18 original history chapters**. Some entries are research introductions rather than definitive exhaustive treatments. The website is **not peer reviewed**, does not represent an official statement by every Yoruba community and must not be described as fully authenticated oral history.

## What's included

- **Knowledge library:** language and alphabets; religions and belief; òrìṣà and sacred beings; education; maths and observational knowledge; traditional medicine and health; mysticism and philosophy; marriage and family; traditions; arts and technology; innovation today; diaspora.
- **Alphabet lab:** all 25 Standard Nigerian Yorùbá letters, 7 oral vowels, 18 consonants, tone marks, and written-vs-spoken distinctions.
- **Heritage × Innovation:** eight researched links to modern knowledge with prominent limits on unsupported claims of invention.
- **The original history atlas:** maps, 24 timeline entries, 12 figure and scholar profiles, a 30-term glossary, quizzes, book-marking and community research leads.
- **Community room:** moderated discussion threads, threaded replies to topics, article comments, and contributions describing oral histories, videos, photographs and family records (via text and external links).
- **Local draft mode:** if opened as a simple file, forms display a privacy warning and store drafts only on the user's current browser; nothing is publicly published or uploaded.
- **Live community server:** `server.py` is a dependency-free Python SQLite backend with an authenticated editorial dashboard. Published comments and discussions appear only after moderator approval. Source submissions are never automatically public.

## Option A: Read the site offline

Extract the ZIP, keep all source files together and open `index.html` in a web browser. Text, data and interactive tools are built in. Fonts and a few optional historical photographs are remote and may not load offline. The community remains a clearly labelled **private browser preview** when no server is running.

## Option B: Run the shared community website locally

Requires **Python 3.10+**. Do not expose the local development server directly to the open Internet without the deployment safeguards below.

**Windows PowerShell:**

```powershell
cd path\to\yoruba-heritage-encyclopedia
$env:ADMIN_PASSWORD = 'replace-with-a-unique-long-random-secret'
$env:RATE_LIMIT_SALT = 'replace-with-a-second-long-random-secret'
python server.py
```

**macOS / Linux:**

```bash
cd path/to/yoruba-heritage-encyclopedia
export ADMIN_PASSWORD='replace-with-a-unique-long-random-secret'
export RATE_LIMIT_SALT='replace-with-a-second-long-random-secret'
python3 server.py
```

Open **http://127.0.0.1:8765** for the site and **http://127.0.0.1:8765/admin** for the moderation dashboard. Use username **`editor`** and the secret `ADMIN_PASSWORD` you configured (the ZIP does not contain a password).

Submit a test discussion from the Community room. It remains **pending**. Approve it in `/admin`, then refresh the Community room; readers can see it. The same approval flow applies to comments. Submissions remain private editorial material even if marked approved: an editor must verify the source, rights and context and prepare a public article manually.

The database is created at `private_data/community.sqlite3` by default. It is excluded from the provided ZIP. To use a different location, set `YORUBA_DB_PATH` to an absolute file path. Set `PORT` if 8765 is occupied; `HOST` defaults to `127.0.0.1` for safety.

### Moderation workflow

1. Contributors submit without accounts; all new posts, comments and testimonies are pending.
2. A local rate limiter and hidden anti-bot field reduce basic spam, but a real public launch also needs a reverse-proxy/WAF rate limit and a CAPTCHA or other anti-abuse protection.
3. The editor visits `/admin`, reads the account and source links, checks consent and evidence, then **approves** or **rejects**. Approval is **not** scholarly fact-check certification.
4. Approved discussions and comments become public. Contributors' email addresses are **never exposed** in the public API. Contact emails from source submissions appear only inside the protected editor view.
5. Direct file uploads are **not yet supported**; submissions include descriptions and external source URLs only. This avoids handling sensitive media before rights, malware and privacy controls are established.
6. Private offline drafts can be exported as JSON from the Discussion tab. They are not sent to the server automatically.

## Public deployment requirements

This is a functional **editorial and community prototype**, not a production-audited social network. For public deployment, host behind **HTTPS/TLS**, an established reverse proxy (e.g. Caddy or Nginx), firewall, application logging/monitoring, secure backups and anti-spam protections. Do not bind the built-in server publicly without an appropriate review. Provide an official site privacy notice and retention/deletion process, an incident-response plan and clear editor identities. Establish a community editorial board and a policy for right-to-reply, takedown and culturally restricted knowledge. For substantial traffic, migrate the SQLite community database to a professionally maintained application/database stack.

Do **not** host the static-only files on GitHub Pages or Netlify and expect the shared forum to function. Those hosts can serve the interactive encyclopaedia, but the shared comment service requires a live backend. The server in this package is suitable for demonstration and a carefully controlled pilot.

## Accuracy, research and attribution

The new research references include the University of Wisconsin and University of Texas Yoruba language materials; UNESCO's Ifá and Gẹ̀lẹ̀dẹ́ heritage records; the Metropolitan Museum and V&A collections; peer-reviewed linguistic and ethnobotanical studies; and WHO guidance on the limits and safety of herbal products. Reference links appear within each new chapter and in the full Sources catalogue.

**Source policy:** Samuel Johnson’s books are **not** used as evidentiary sources. Akinwumi Ogundiran’s *The Yorùbá: A New History* (2020) has been added as a recommended multidisciplinary research lead; only publisher metadata and independently available reviews were consulted at this stage. A future rigorous edition should verify the full relevant pages and distinguish secondary authors’ independent evidence from unverified retellings.

**Editorial rules:**
- Distinguish a community's own testimony from archaeologically or independently corroborated historical claims.
- Distinguish sacred tradition and the social importance of a belief from controlled scientific evidence.
- Do not turn 256 Ifá signs into an unsupported claim that electronic computers were historically invented in Yorubaland.
- Do not present a documented traditional remedy as clinically safe/effective without appropriate evidence.
- Distinguish Yoruba regional variations; cite the town, community and narrator when possible.
- A publisher catalogue or academic abstract can confirm the publication exists; it is not full-text verification of every sentence.
- Verify museum image rights, contributor permissions and quotations before public editorial use.

See **EDITORIAL_POLICY.md** for a submission intake rubric, evidence levels, medical/sacred content safeguards and publication checklist.

## Technical files

```
index.html                     Semantic navigation and routes
styles.css                     Responsive dark green/bronze/gold design
content.js                     Original source-linked history and voice data
knowledge.js                   43 first-wave new subject chapters
extended-sacred-arts.js        7 additional, individually sourced chapters
community.js                   Learning tools and community browser frontend
app.js                         Existing atlas, search and book-marking app
server.py                      Moderated SQLite discussion and submission API
assets/favicon.svg             Site favicon
EDITORIAL_POLICY.md            Content, privacy and evidence standards
TEST_REPORT.md                 Static/API validation and feature limitations
```

### Recommended next phase

Commission region-specific expert and custodian reviews, then add public-source recordings with negotiated rights, an English–Yorùbá language switch, dedicated glossary for individual òrìṣà, legally authorised media uploads, a multilingual search index, member accounts if desired, and a production hosting/migration plan.


## Sacred World expansion — research draft, 22 November 2026
- `sacred-atlas.js`: 24 structured public educational profiles, each with seven article sections and a misconception/correction field.
- `sacred-atlas-ui.js`: keyboard-accessible filter/searchable Sacred World directory at `#sacred`.
- 28 new checked research leads were registered, bringing this iteration to 92 total source records; these citations are leads and do not certify every sentence.
- Existing 68 articles remain unchanged; there are now 92 articles total. Historic, regional and oral material still requires editorial/custodian review.
- This is not a complete list of all Yoruba local òrìṣà. A responsible archive adds verified local profiles with precise provenance rather than inventing a single fixed pantheon.
- Comments/submissions remain local-preview or pilot-server features; do not expose the Python test server on the open internet.
