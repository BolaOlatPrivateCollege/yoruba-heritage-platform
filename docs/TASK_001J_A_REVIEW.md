# Task 001J-A — English narration pilot and integration preparation

Issue #29 and all five comments read. This is a staged production task, **not
audio-complete**. The owner requires review of the first full-story recording
before generation of the remaining four. No approval is inferred from CI.

## Verified baseline and preservation

Main at kickoff: `c1bb00dcce2e15ce716bc19859dee43aa84fc245`, merged reviewed PR #27.
Both exact post-merge workflows passed: Archive quality45073002902 and Reading
interface45073003065. No open PRs or uncommitted/unrelated changes. Local prior
branch was 001J. The connected repository supplied five reviewed file updates
and the signed merge commit; complete tree and commit SHA were verified before
creating `codex/001j-a-recorded-english-narration`. Baseline has222 tests.

No historical prose, original source metadata, reference book/guide, pronunciation
entry, browser narrator, recording gate, security revision or site route changed.
Archive SHA256 remains
`89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2`;
ordered Odù SHA256 remains
`92b877e266d6d66cc9a62dc9b00ed9c257ef65c175e0d055f30aaa18b0887ddb`.
SEC-01-v1, existing noindex/nofollow and all previous features remain intact.

## Exact transcript preparation

`recorded-narration-text.ts` derives title, opening, section headings and complete
section prose, Look closely and Tradition and evidence from existing records.
It preserves Unicode/code-point spelling and punctuation without normalisation,
rewriting, summarisation or pronunciation substitutions. Blank lines separate
the original strings. It excludes promotional subtitle/deck, source registers,
citations, glossary, navigation, private notices and optional questions/research
voices prompts. These boundaries are explicit and consistent across five stories;
the pre-existing device reader retains its own wider optional-reading scope.

| Existing story ID | Words | Prepared text SHA256 |
| --- | ---: | --- |
| ile-ife-art-city-evidence | 962 | 9960736123caef4a361d930a738814c7964568a55cf11ece42d8fa53f22bce75 |
| adire-indigo-design | 877 | 9d565159c58645dd22e728268a18af397584ffabc1b5e92c3e2ee198563c92b4 |
| gelede-performance-knowledge | 977 | b4cba18e218258530bd431d975e7e88aeff644415e2604fd75f39ea887f0d159 |
| osun-osogbo-living-landscape | 990 | 94b93906bcf93d414c98c12a8813c89dc590687199c481f0da767a8e2ce58c4e |
| abeokuta-tax-and-representation | 930 | b2746e8efb9fa5546e98d109b5bb2ea59b76fa769ca342565b72f9ccf33654bd |

Offline export, from web/:

```sh
node --experimental-strip-types scripts/export-recorded-narration.mjs
```

The approved archive importer runs before export. Five UTF-8 transcripts and an
index with story revision, exact text/block/source-file hashes, word counts and
omissions are written to ignored `.generated/narration-review/`, outside public/
and dist/. No provider is called. An exported transcript does not approve a
recording. Three added tests check exact baseline hashes/words/diacritics,
boundaries and real offline export. All222 original tests remain unchanged;
expected total225, with final actual CI evidence on the draft PR.

## Pilot generation: actual UI result, export blocked

Pilot: **A face, a city, a thousand questions** (Ilé-Ifẹ̀), revision
`2026-11-22-v1`,962 words,6248 characters. The owner's latest prompt expressly
authorised transmitting this unpublished narrative to Google AI Studio for
English speech generation. No source book text, consent document, private
testimony or contributor information was transmitted.

Used the existing signed-in account in the cloud/in-app browser at
https://aistudio.google.com/generate-speech. UI confirmed:

- Model: **Gemini 3.8 Flash TTS**, `gemini-3.8-flash-tts`.
- Voice: **Fola**; no substitute or voice clone.
- Custom style: "Warm, mature, calm documentary narration. Natural pace with
  thoughtful pauses. Read the supplied text exactly, preserving wording and
  sequence. Do not add an introduction, summary, commentary, music or sound
  effects."
- Submitted field matched the prepared6248-character pilot text exactly.
- One Run completed and displayed a playable **7:09** result and enabled Download.
  A player position of0:33 was observed before pausing. This is UI playback
  evidence, **not a claim of human listening, full decoded duration or fidelity**.
- No API key was selected, paid API called, credits purchased, subscription
  changed or extra provider configured. Existing web account/quota was used.

**Export blocker:** the enabled Download action did not produce a browser
download event or a local audio file. A semantic and a visible-control download
attempt had the same result. The browser's media-download helper reported that
the button exposes no downloadable URL. No save dialog appeared; no newly
downloaded WAV/MP3 was found. The rendered audio element represented only a
0.04-second streaming chunk; it was deliberately not passed off as a complete
recording. No internal application state, private RPC, hidden model response or
authentication token was used to bypass the supported export flow.

The generated result is retained in the open AI Studio tab for owner review and
manual export. **No downloaded pilot file, decoded duration, audio SHA256,
peak/clipping measure, end-of-track verification or word-for-word listening
audit can yet be reported.** The generic22.8s sample from the issue is not this
story and was not substituted. Remaining four stories have not been generated.

Next unblock step: owner downloads the7:09 result from the retained Studio page
or supplies that exact exported file. Then decode/measure/hash it, verify the
beginning and final sentence and all sections, compare transcription with the
prepared source, and audition it. Automated transcription is supporting evidence,
not a substitute for competent Yorùbá-name and human audio review.

## Rights and review status

Inspected Google's official terms and pricing on22 November2026:

- https://ai.google.dev/gemini-api/terms (redirects to AI Studio docs; effective
  March23,2026). Generated-content section says Google does not claim ownership;
  it does not certify third-party rights, exclusivity or cultural authenticity.
  Unpaid-services section describes product-improvement/human-review data use.
- https://ai.google.dev/gemini-api/docs/pricing (redirects to Studio pricing),
  Gemini3.8 Flash TTS standard free-tier input/output listed free within quota.

This documents the provider research, **not legal clearance for public media
distribution**. Owner permission to generate the pilot is distinct from acceptance
of audio quality, private-site eligibility and permission to publish/redistribute.
Retain provider/voice/date/terms evidence and approved attribution; separately
resolve output retention/download/redistribution/transcoding rights before a
recording becomes eligible. No signed rights or reviewer evidence is fabricated.

All historical stories remain unreviewed research drafts. English TTS is not
authenticated native Yorùbá pronunciation or elder testimony. Names requiring
competent listening include Ilé-Ifẹ̀, Ifẹ̀, Wunmonije and Ọ̀wọ̀. Catalogue numbers,
date ranges, NCMM/ICOM and Barbier-Mueller also need word-for-word QC.

## Integration plan after pilot review

1. Export and audit the pilot; give owner an actual playable/downloadable file
   with transcript, measured duration/hash and a truthful review checklist.
   Obtain explicit pilot feedback/approval before the remaining four generations.
2. Generate each remaining exact transcript with the same model/voice/style.
   Split only at existing section boundaries if needed. Preserve sequence and
   original takes; reject omissions, summaries, repeats, damaged endings and
   material name errors. Never silently edit historical wording to fix a voice.
3. Decode and inspect every take; measure complete runtime and PCM peaks/clipping,
   verify all sections against text and listen. Produce low-bandwidth mono
   MP3/Opus (about64–128kbps where adequate) with a rights-cleared lossless master
   retained outside the static/public tree. No backing music.
4. Introduce a **separate purpose-specific English recorded-narration gate**.
   Do not relax the strict native Yorùbá PCM pronunciation gate or empty approval
   list. Bind track to this recorded-narrative text hash, story revision,
   actual decoded media/hash/MIME/bitrate/duration, provider/Fola rights evidence,
   permitted scope, independent audio QC and withdrawal/version history.
   A manifest must not self-authorise media or permit unknown/revoked rights.
5. In the existing narrator panel prefer only an actually approved same-origin
   track, native controls, accessible labels/transcript and speed, no autoplay,
   preload none/metadata. Preserve the existing browser-generated speech flow as
   a distinct optional fallback. Cancel speech when media plays and stop/pause
   other media on takeover/navigation. No runtime Google/TTS request or tracking.
6. Do not advertise exact section seeking until section times have been measured
   and checked. Native timeline scrubbing can work without a claimed timestamp
   map. Keep reading and no-JS player/transcript usable.
7. Add per-file decoding, rights/revision/hash/withdrawal and player browser tests;
   retain all prior tests, responsive1440/390/320 screenshots, final-head full CI
   and independent technical, linguistic, editorial and accessibility review.
   Only five real complete, audibly reviewed, permission-cleared tracks can satisfy
   Issue29's audio-complete acceptance. No merge/deployment/publication is implied.

## Rollback and current scope

This preparation changes only a pure transcript helper, offline export script,
three regression tests and these notes. No audio file, new player, build export,
runtime setting, dependency, workflow or historical content changes. Close the
draft PR to leave main unchanged; after separately authorised integration revert
only these preparation files, preserving unrelated work. Subsequent integration
must have its own reviewed asset withdrawal and rollback instructions.

**No merge, deployment, indexing or public publication. Pilot generation exists
in Studio; downloadable-media acceptance is blocked until a real file is obtained
and reviewed. Remaining four generations await owner pilot review.**
