# Community Voices — private product, consent and moderation design

**Task 001M / issue #32. Phase A + B only. Private engineering preview, no live intake.**

## Purpose
Collect living Yorùbá cultural accounts **in the narrator's voice**: alternate tellings, family memories, first-hand recollections, explanations of names and sacred beliefs, respectful additions and open questions. Do not adjudicate supernatural truth or suppress a local account because it disagrees with a university paper. Academic evidence and claims analysis belong solely under Research.

## Current Phase A/B deliverable
The site serves a read-only contribution walkthrough at /community/contribute/ with five paths and prompts. It collects **zero** data. There is no HTML form, text input, hidden upload field, account/login requirement, client-side storage, API request, database, queue, or publish action.

## Future data contract — requires separate approval
Server-only record, *not* bundled into frontend:
- Private random contribution ID; optional related story/figure/region slug
- Contribution type: another telling, family memory, first-hand, sacred name/belief, question/addition
- Narrator-supplied title, language, optional dialect, broad community (no student address)
- Attribution: 'I experienced this', 'My family/elder told me', 'Our community tells this', 'I saw/heard/read this elsewhere', or 'Original fiction'
- For another person's story: actual permission to represent or quote them; name or chosen pseudonym only where permitted
- Story text and optional approximate time/place. No requirement to establish scholarly truth.
- Age band used privately solely to enforce an appropriate pathway; school/guardian review where required
- Contributor-selected safe public credit: pseudonym, anonymous, or agreed name; contact and identity proof **private to staff**
- Explicit rights to display and reproduce the particular submission; separate consent for audio, image, performance, or sacred material
- Backend version history, moderation status, consent change/withdrawal status, and audit history with staff identity stored privately

### Staff state machine
Draft (private) -> Submitted (private) -> Needs consent or safeguarding check -> In review -> Approved for publication -> Published account. Any pending item may become Rejected/Withdrawn. A published item may be hidden immediately upon credible rights/privacy/child-safety report while staff review is conducted. All transitions require authenticated authorised staff; publishing is not a direct contributor action.

### Approval and rejection standard
Staff checks contributor consent, rights, danger of identifying a child, privacy, threats/harassment, unsubstantiated damaging allegations about living people, prohibited or restricted sacred information, and potential impersonation. Staff **must not** demand that a sacred belief is proven true by scientific research. Alternative interpretations are welcome with the speaker's context. No auto-publication, AI-only approval, visible reviewer notes or public contact details.

### Participant experience
- Readers freely browse without signing in.
- A user chooses a path, can write in Yorùbá with tone marks, states whether it is their own memory or something heard, selects what credit (if any) may be shown.
- The service verifies permission in private; for child/student contributors, use guardian/school-supervised submission rather than collecting a public child's contact details. No precise home address requested.
- Real assets are held outside the public/static directory, scanned for type/size/scripts/malware, rights-checked, and served only after moderation and necessary transformations.
- Once approved, show a separately labelled contribution card next to the parent story or on the Community page: narrator credit choice, broad community, account type and date; allow side-by-side versions with a reply invitation.
- Reports, correction requests, consent changes and withdrawal requests are routed privately to authorised staff.
- Do not reward a belief with a 'verified/false' badge or publish a leaderboard ranking living spiritual accounts.

### Security gates for separately scoped Phase C
Threat model and data-flow review; approved deployment architecture; authentication/authorisation for private staff; CSRF protection; rate limiting, anti-spam and abuse handling; server-side validation and encoding; sanitised presentation; safe uploads and scanning; strict CORS and content policy; private encrypted storage with access control; data retention/deletion/withdrawal policy; consent/guardian approvals; reports and audit log; accessibility and keyboard tests; moderation trial; rights review; penetration review. Only then allow user input and storage. Child-safe UX, privacy policy and right-to-withdraw workflow must pass human review.

### Phase D: First real cultural content
Invite willing elders, storytellers, practitioners and families in more than one community through consent-cleared channels. Record their chosen credit and exact wording. The website may say 'as shared by ...' **only** after actual communication and permission; generic descriptive copy must never pretend to be first-hand testimony.

### Existing repository invariants
Retain preserved 113 articles / 128 source records, archive hashes, original five Fola documentary audio drafts, noindex and SEC-01 controls. PR #39 and ancestors #37/#33 remain independent drafts. No merges, deploys, index changes or live data collection in Phase A/B.
