import assert from 'node:assert/strict';
import { existsSync, lstatSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { BASE_COMMIT, ROOT, canonical, loadPreservedArchive } from './preservation.mjs';

export function importDocument() {
  const archive = loadPreservedArchive();
  return { formatVersion: 1, sourceCommit: BASE_COMMIT,
    reviewDefaults: { claimsVerification: 'unreviewed', rights: 'unknown', publicationApproval: 'not-granted' },
    // Tool prose/constants outside HISTORY_DATA remain exact inert source text.
    // These are never executed by the importer or published as MDX.
    supplementarySourceText: Object.fromEntries(['community.js','deep-heritage-ui.js'].map(path =>
      [path, readFileSync(resolve(ROOT,path),'utf8')])),
    archive };
}
export function writeImport() {
  const text = canonical(importDocument()) + '\n';
  // Fixed output only, no user-controlled source, modules or destination.
  for (const part of ['generated', 'generated/archive']) {
    const dir = resolve(ROOT, part);
    if (existsSync(dir)) assert.ok(lstatSync(dir).isDirectory() && !lstatSync(dir).isSymbolicLink(), 'Unsafe output directory');
    else mkdirSync(dir);
  }
  const out = resolve(ROOT, 'generated/archive/archive.json');
  if (existsSync(out)) {
    assert.ok(lstatSync(out).isFile() && !lstatSync(out).isSymbolicLink(), 'Unsafe output file');
    assert.ok(readFileSync(out, 'utf8') === text, 'Existing import differs: inspect/remove only that generated artifact before retrying');
  } else writeFileSync(out, text, { encoding: 'utf8', flag: 'wx' });
  return out;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  assert.equal(process.argv.length, 2, 'No source/output/refresh arguments accepted');
  writeImport(); console.log('Verified lossless import: generated/archive/archive.json');
}
