// This creates a NEW review artifact. It never replaces the approved baseline.
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadArchive } from './load-archive.mjs';
import { ROOT, BASE_COMMIT, canonical, makeManifest, verifyFiles, readManifest } from './preservation.mjs';
assert.deepEqual(process.argv.slice(2), ['--candidate-for-review', BASE_COMMIT], 'Explicit baseline provenance acknowledgement required');
verifyFiles(readManifest());
writeFileSync(resolve(ROOT, 'preservation/baseline.candidate.json'), canonical(makeManifest(loadArchive(ROOT))) + '\n', {flag:'wx'});
console.log('Candidate only: compare with baseline.json; never auto-approve changes.');
