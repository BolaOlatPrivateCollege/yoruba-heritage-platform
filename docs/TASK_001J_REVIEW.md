# Task 001J — Voice narration and reviewed Yorùbá pronunciation

Issue #22 and both comments read before development, including the UGA lead and
explicit prerequisite clearance. Approved main at kickoff:
`1755e93de82b41dd49470e65317973f39de4a42a`. Exact-commit post-merge push runs
[Archive quality 45068605039](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45068605039)
and [Reading interface 45068604968](https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/actions/runs/45068604968)
passed. No open PRs, uncommitted or unrelated local work. Prior branch was 001I.
Native Git fetch failed with getaddrinfo; the connected repository supplied the
signed main commit. Reconstructed commit bytes, signature SHA and complete local
tree matched the approved remote tree before creating
`codex/001j-voice-pronunciation`. All 195 baseline tests are retained unchanged.

## Implemented experience and truthful limits

Four existing `/stories/[id]/` pages and
`/places/abeokuta-tax-and-representation/` share an opt-in story narrator.
Actual browser `SpeechSynthesis` and `SpeechSynthesisUtterance` calls implement
Play, Pause, Resume, Stop and 0.75/1/1.25/1.5 speed. There is no fabricated audio
track. The reader chooses a starting section and a browser-reported local English
voice. Only `localService === true` voices with an English language tag qualify;
we never silently fall back to a remote, default-language or Yorùbá-labelled TTS
voice. This conservative choice may make narration unavailable on devices with
only remote voices. Install/check a local English device voice and use Check
voices. Late voice lists refresh without autoplay. No installed voice inventory
is sent, stored or logged by the page.

This is **English device-generated narration of an unreviewed research draft**,
not a human performance, elder testimony or verified Yorùbá speech. Embedded names
retain their exact diacritics but can sound wrong in an English voice. The UI
explains that limitation and links pronunciation guidance. The page makes no
claim of universal offline synthesis: it relies on the browser's local-voice
classification and cannot audit an operating system's implementation or quality.
No cloud API, key, analytics, service, account or browser recognition is used.

The actual visible narrative is collected at Play time from explicit existing
section IDs: opening, narrative sections, Look closely, Tradition and evidence,
questions and (for 001F) research voices needed. Headings and paragraphs remain in
their on-page order. Short word-boundary chunks avoid a whole-story utterance;
only whitespace is normalised. Original text/diacritics are not rewritten.
Source registers, provenance labels, consent/publication notices, bibliography,
glossary and navigation are not implicitly narrated. The chosen-section link
keeps ordinary reading available. Selection, voice or speed changes stop playback
and require Play; the screen-reader status explains the restart.

One utterance is retained at a time; generations discard late cancelled events.
Rapid Play cannot duplicate a running queue. Device errors, missing APIs, missing
local voices and empty text have honest fallback states. An eight-second start
deadline and bounded completion watchdog stop unresponsive synthesis. Pause and
Resume use the native APIs; device support varies. Cancelling does not reset the
browser's paused state, so a fresh start explicitly resumes before speaking.
Page hiding/leaving stops narration. Native media playback stops narration, and
the recording coordinator pauses other native media. No progress persists.

## Pronunciation inventory: zero approved recordings

All **15 original pronunciation references** retain exact spelling, meaning,
note, order and existing Native recording pending label. Each now has a disabled,
described Listen unavailable button. There are **zero approved recordings**, zero
audio files supplied, zero imported UGA recordings and no simulated native audio.
The empty manifest is not presented as a collection. No sacred verses, chants,
voice impersonation or invented pronunciation examples are introduced.

`PronunciationAudio.astro` supports native `audio controls preload="none"` only
for an eligible first-party recording, with its exact transcript and public credit,
variety/community, licence and review credit/date. A compact glossary slot on the
five stories renders **nothing** unless an exact matching reviewed word exists;
it does not attach an unavailable button to every research term. Correct
pronunciation would still not authenticate an etymology or historical claim.

### UGA / ÀKỌ́YẸ and other external references

Inspected the accessible UGA
[pronunciation page](https://africa.uga.edu/Yoruba/pronunciation.html) and
[tone page](https://africa.uga.edu/Yoruba/tones.html) on 22 November 2026, plus the
[UT Austin COERLL Yorùbá Yé Mi page](https://coerll.utexas.edu/yemi/).
UGA's pages link alphabet/tone audio and show institutional copyright; legacy
text extraction visibly corrupts some characters. **No recording was downloaded,
auditioned, quality-reviewed, copied, transcoded, streamed inline or cleared.**
UGA affiliation and a playable link are not permission or a tone/dialect review.
The new annotated external resource box states these limitations. Ordinary links
remain opt-in; no third-party media/iframe/runtime request is added. We did not
scrape source spellings or change the original 15 entries.

Technical reference inspected:
[Web Speech API specification](https://webaudio.github.io/web-speech-api/),
sections 4.2.2–4.2.8: cancel/pause/resume, delayed voice lists, speech events and
localService. Implementation uses synthesis only, never microphone recognition.

## Audio model, rights and future acquisition

`audio-manifest.ts` is deliberately empty. `audio-recordings.ts` is build-only;
no private approval material is imported into a browser bundle. Strict, versioned
metadata distinguishes pronunciation from optional future produced English
narration. Fields cover:

- Stable target, exact transcript, text SHA-256 and current content revision.
- Language, labelled variety/community, preferred public or anonymous credit,
  narrator category and licensed provider/voice where applicable.
- Recording date, explicit licence and private-review usage scope; marker that
  underlying rights documentation is held in a private editorial register.
- Publicly approved linguistic reviewer credit/date, audio QC credit/date and
  editorial approval for private review only. These must describe real reviews.
- Owned same-origin filename, MIME, byte SHA-256, duration, content class and no
  sensitive flags; version, dated history and withdrawal. Public release is not
  granted by this model.

Unknown fields, unsafe/external/traversal paths, unknown licensing, mismatched
target/spelling/diacritics, stale text/revision/hash, missing language review,
inappropriate content and malformed histories fail validation. Native Yorùbá
pronunciation cannot be relabelled from English or licensed generic TTS.

A manifest's own approval labels are **insufficient**. Eligibility additionally
requires a separate, current private editorial approval attestation bound to
recording ID, version, file hash and text hash, with granted/non-revoked consent
and completed linguistic, audio and editorial review. **No such attestations are
supplied by this task.** The production selection therefore remains empty.
Do not fill this list with invented consent, reviewer names or sample approvals.

An authorised future audio acquisition task must:

1. Obtain precise speaker/provider and rights-holder consent/licensing, intended
   private/public scopes and preferred public credit; retain actual consent
   references, signed forms, contact information and raw material outside Git and
   static output. Metadata here contains only the fixed private-register marker.
2. Have competent independent Yorùbá reviewers verify exact Unicode transcript,
   tone, intended variety, context and cultural suitability; independently QC the
   audio. Retain actual reviewer evidence privately with permitted public credit.
3. Add the approved final file through code review. Initial supported file format
   is a conventional 44-byte-header, mono 16-bit PCM WAV, 8–96kHz. Other formats
   require a reviewed decoder/gate. Filename must match ID/version. Build checks
   real path containment (including symlinks), magic/structure, actual duration
   and file SHA, not merely suffix or asserted MIME.
4. Bind the separately resolved private approval to the exact version and hashes;
   wire the trusted private editorial attestation through a reviewed change.
   Never put consent documents, private keys/identities or raw recordings into
   the manifest/browser. No upload form, server or rights system is created here.
5. Test actual output on intended devices and seek technical, linguistic,
   accessibility and editorial review before even private integration. Public
   audio release requires separate rights/cultural and express owner approval.

Optional produced English narration uses the same schema and exact ordered prose
transcripts for the five current stories, with revision/hash binding. No produced
track is supplied or exposed. Timing alignment is not known, so no invented
timestamp map is provided. Licensed TTS would require real commercial voice usage
rights; no celebrity, elder or cloned voice is supported by this task.

For correction, increment recording version, update immutable filename/hash and
append dated history; recheck text and private approvals. For withdrawal, add a
dated withdrawal event and editor reason, or revoke the independent consent
attestation. Selection immediately becomes ineligible for the next private build.
Removing already distributed media also requires operational deletion/cache
handling in a future authorised release process; static Git cannot recall copies.
No deployment or media distribution happens here.

## Verification and limitations

All original 195 tests remain unchanged. Add 13 unit/static and 12 Chromium
tests: expected **220 total**, comprising 58 root/preservation/security,
90 web unit/static and 72 Chromium. Final observed counts, exact head, run links
and screenshot artifact are recorded on the PR after full CI.

Tests cover native API call order/state and late events, no autoplay, voices and
failure handling, timeouts, actual visible ordered narration on all five stories,
section/speed selection, keyboard controls, empty text, lifecycle, media takeover,
no-JS reading, all 15 unavailable entries, exact spelling, rights/consent/review
gates, file hash/type/duration/containment, stale content, withdrawals, no runtime
external/media/mutation requests or storage, and 1440/390/320px layout. Synthetic
silence exists only in temporary unit fixtures with explicit synthetic metadata;
it is not shipped or presented as reviewed speech. Linux CI exercises symlink
escape validation (local Windows can lack symlink privileges).

Browser tests use deterministic synthesis events and verify actual controller/API
calls. **CI does not hear an OS voice**, guarantee real audible quality, certify
Yorùbá speech or establish rights. Manual listening on devices with local English
voices, Pause/Resume interoperability, assistive-technology testing, actual 200%
browser zoom, full WCAG/cross-browser, linguistic, practitioner/community and
rights review remain outstanding. Enlarged text and keyboard semantics are
automated checks, not a complete accessibility certification.

Screenshots from real Chromium show narrator state/controls and unavailable
pronunciation/resource panels at 1440, 390 and 320px; device audio is mocked and
labelled as a test adapter, not represented as a real voice review. Existing
dark green/bronze, focus/reduced-motion styling and ordinary reading remain.
No heavy dependency, image, external player, CSS animation or new service.

Full Linux workflows are the gate: root locked install, syntax/preservation,
SEC-01/security tests; web locked install, Astro strict check/build, unit and
Chromium. Local Windows Node 22.23.1 and incomplete web dependencies still prevent
full local Astro execution. Local native-API adapter smoke test and preservation
checks pass; this is not substituted for CI.

## Preservation and rollback

No historical prose, source register, reading guide or canonical record changed.
All 113 articles, 128 sources, six community leads, 24 Sacred World profiles,
15 quizzes, 15 pronunciation references, 16 principal Odù labels, original
prototype, four 001F stories, two corrected 001G pilots, 001H regional draft,
001I Research Library and SEC-01-v1 remain intact. Samuel Johnson exclusion,
authentic attributable community priorities and noindex/nofollow stay in force.
Archive SHA-256:
`89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2`.
Ordered Odù SHA-256:
`92b877e266d6d66cc9a62dc9b00ed9c257ef65c175e0d055f30aaa18b0887ddb`.

Before merge, close this PR: main remains unchanged. After separately authorised
integration, revert only 001J's narration/audio components, adapters, empty
manifest, styling, page integrations, tests and review notes, preserving later
unrelated work. No database migration, hosting, Codespaces, Cloudflare, DNS,
production service or deployment configuration changes.

**Nothing merged, deployed, indexed or publicly published. No audio rights or
linguistic approval have been fabricated.**

## Review remediation — mobile controls and live narration state

Independent review of PR #27 identified two UI/accessibility corrections: at a
390px viewport the Resume control wrapped inside the word, and the original
speech controller announced Start/Playing for each 300-character chunk even when
the reader was still within the same section.

- The narrator's mobile action controls now use a predictable two-column grid
  at widths through 800px, smaller mobile side padding and nonwrapping button
  labels; all action targets retain the existing 48px minimum height. Responsive
  tests assert intact action labels and no inner horizontal overflow at
  1440px, 390px and 320px.
- The controller continues its existing asynchronous chunk queue and silence
  watchdog but only announces Starting/Playing at the first chunk or the start
  of a different section. Between chunks in the same section it updates
  internal state without repeating ARIA live-region text. Pause, Resume,
  Stop, finished, and error announcements remain accessible. Resume after an
  utterance ended while paused now announces the restart before the next chunk.
  Added deterministic unit and browser coverage to prove that multiple chunks
  in one section do not flood the live region.

These changes do not imply actual screen-reader certification or audible voice
quality approval. All earlier rights, pronunciation, source and publication
restrictions continue unchanged.
