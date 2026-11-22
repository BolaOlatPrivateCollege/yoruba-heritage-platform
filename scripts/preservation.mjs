import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadArchive, ORIGINAL_MODULES } from './load-archive.mjs';

export const ROOT = fileURLToPath(new URL('../', import.meta.url));
export const BASE_COMMIT = '587d9969b43a1cf302381568fb9e3aa3f5c1afe9';
export const MANIFEST = resolve(ROOT, 'preservation/baseline.json');
export const PROTECTED_FILES = Object.freeze([...ORIGINAL_MODULES,
  'index.html', 'styles.css', 'app.js', 'community.js', 'sacred-atlas-ui.js',
  'deep-heritage-ui.js', 'server.py', 'assets/favicon.svg', 'assets/pronunciation/README.md']);

// Sort object keys only. Never trim, normalize Unicode, reorder arrays or omit values.
export function canonical(value) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number' && Number.isFinite(value)) return JSON.stringify(value);
  if (Array.isArray(value)) {
    assert.equal(Object.keys(value).length, value.length, 'Sparse or decorated array');
    return '[' + value.map(canonical).join(',') + ']';
  }
  if (typeof value === 'object') {
    assert.equal(Object.prototype.toString.call(value), '[object Object]', 'Unsupported non-JSON object');
    return '{' + Object.keys(value).sort().map(k => JSON.stringify(k) + ':' + canonical(value[k])).join(',') + '}';
  }
  throw new Error('Non-JSON value: refuse lossy conversion');
}
export const sha256 = value => createHash('sha256').update(value).digest('hex');
export const digest = value => sha256(Buffer.from(canonical(value), 'utf8'));

export function validateArchive(a) {
  for (const [key, items] of Object.entries(a)) if (Array.isArray(items)) {
    const ids = items.filter(x => x && typeof x === 'object' && Object.hasOwn(x, 'id')).map(x => x.id);
    assert.ok(ids.every(id => typeof id === 'string' && id.length > 0), `${key}: empty/non-string ID`);
    assert.equal(new Set(ids).size, ids.length, `${key}: duplicate ID`);
  }
  const sources = new Set(a.sources.map(x => x.id));
  const articles = new Map(a.articles.map(x => [x.id, x]));
  function visit(v) {
    if (!v || typeof v !== 'object') return;
    if (Object.hasOwn(v, 'sourceIds')) {
      assert.ok(Array.isArray(v.sourceIds), 'sourceIds must be an array');
      for (const id of v.sourceIds) assert.ok(sources.has(id), `Dangling sourceIds: ${id}`);
    }
    for (const child of Object.values(v)) visit(child);
  }
  visit(a);
  for (const t of a.timeline) assert.ok(sources.has(t.source), 'Dangling timeline source');
  for (const x of [...a.places, ...a.people]) if (x.article) assert.ok(articles.has(x.article), 'Dangling article');
  for (const t of a.deepTracks) for (const id of t.ids) assert.ok(articles.has(id), 'Dangling pathway');
  for (const p of a.sacredProfiles) assert.ok(articles.has(p.articleId), 'Dangling sacred article');
  for (const key of ['knowledgeChapters','sacredArticles','deepHeritageArticles','nameOriginArticles','researchAuthorArticles']) {
    for (const record of a[key]) assert.equal(digest(record), digest(articles.get(record.id)), `${key}: inconsistent article alias`);
  }
  for (const s of a.sources) {
    assert.match(s.url, /^https:\/\//, 'Non-HTTPS source');
    assert.doesNotMatch(`${s.institution} ${s.title}`, /samuel\s+johnson|johnson[,\s]+samuel/i, 'Excluded factual authority');
  }
}

export function describeArchive(a) {
  validateArchive(a);
  const collections = {};
  for (const [key, value] of Object.entries(a)) {
    collections[key] = Array.isArray(value) ? {
      count: value.length,
      records: value.map((record, index) => ({
        index,
        // No invented IDs for legacy unkeyed learning records: retain exact position.
        originalId: record && typeof record === 'object' && Object.hasOwn(record, 'id') ? record.id : null,
        sha256: digest(record),
      })),
      sha256: digest(value),
    } : { sha256: digest(value) };
  }
  return { archiveSha256: digest(a), collections };
}
export function sourceFiles(root = ROOT) {
  return PROTECTED_FILES.map(path => ({ path, sha256: sha256(readFileSync(resolve(root, path))) }));
}
export function makeManifest(a, root = ROOT) {
  return { formatVersion: 1, sourceCommit: BASE_COMMIT, algorithm: 'SHA-256',
    canonicalization: 'Sorted object keys; original array order and UTF-8 strings; no Unicode normalization',
    files: sourceFiles(root), ...describeArchive(a) };
}
export function readManifest() { return JSON.parse(readFileSync(MANIFEST, 'utf8')); }
export function verifyFiles(manifest, root = ROOT) {
  assert.deepEqual(sourceFiles(root), manifest.files, 'Protected legacy bytes changed');
}
export function verifyArchive(a, manifest) {
  assert.ok(canonical(describeArchive(a)) === canonical({
    archiveSha256: manifest.archiveSha256, collections: manifest.collections,
  }), 'Archive differs from reviewed baseline (IDs, wording, fields, order or Unicode)');
}
export function loadPreservedArchive() {
  const manifest = readManifest();
  assert.equal(manifest.formatVersion, 1);
  assert.equal(manifest.sourceCommit, BASE_COMMIT);
  verifyFiles(manifest); // Fail BEFORE executing any trusted module if bytes differ.
  const a = loadArchive(ROOT);
  verifyArchive(a, manifest);
  return a;
}
