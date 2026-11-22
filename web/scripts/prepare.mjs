import { mkdirSync, writeFileSync } from 'node:fs';
import { importDocument } from '../../scripts/import-archive.mjs';
import { canonical } from '../../scripts/preservation.mjs';
// The approved importer performs every frozen-file/record check before export.
// Developer source text stays in the root importer, never in this app's input.
const { archive } = importDocument();
mkdirSync(new URL('../.generated/',import.meta.url),{recursive:true});
writeFileSync(new URL('../.generated/archive.json',import.meta.url),canonical(archive)+'\n');
console.log('Verified canonical archive prepared offline; no publication approval granted.');
