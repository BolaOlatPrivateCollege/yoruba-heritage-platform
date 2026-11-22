# Native Yorùbá pronunciation recordings (not yet collected)

The research-centre pronunciation explorer uses `window.YorubaAudioManifest`, if supplied, as an optional **approved recording manifest**. There are no recordings in this distribution. The interface does not falsely simulate Yoruba with an English voice.

To add a public recording during a future moderated editorial task:

1. Obtain informed permission for publication from a native Yoruba speaker, including permission to display their chosen credit and the reuse terms.
2. Record the precise word as displayed, including a note on local variety, the original orthographic form, and the tone marks reviewed by a Yoruba language specialist.
3. Retain the date, community, speaker consent record, rights holder, recording equipment and transcription in a protected editorial system.
4. Have an independent language reviewer check the pronunciation, tone, and audio quality.
5. Place the licensed recording under `assets/pronunciation/` and add a manifest entry. Example format for the optional *future* `audio-manifest.js`:

```js
window.YorubaAudioManifest = {
  'Èṣù': {url:'assets/pronunciation/esu-verified.ogg',approved:true,credit:'Speaker name or approved attribution · dialect · licence'}
};
```

No demonstrative `approved:true` entries are shipped; do not copy the example into the live manifest without real evidence and rights. Do not upload sacred or restricted recordings without explicit approval from relevant custodians.

Current fallback: University of Texas COERLL Yoruba pronunciation learning resources, linked in the website. No synthetic voice or browser TTS is labelled “native”.
