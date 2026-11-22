import { mkdirSync, writeFileSync } from 'node:fs';
import { importDocument } from '../../scripts/import-archive.mjs';
import { canonical } from '../../scripts/preservation.mjs';
import { extractAlphabet } from './alphabet.mjs';
// The approved importer performs every frozen-file/record check before export.
// Developer source text stays in the root importer, never in this app's input.
const { archive, supplementarySourceText } = importDocument();
mkdirSync(new URL('../.generated/',import.meta.url),{recursive:true});
writeFileSync(new URL('../.generated/archive.json',import.meta.url),canonical(archive)+'\n');
writeFileSync(new URL('../.generated/alphabet.json',import.meta.url),canonical(extractAlphabet(supplementarySourceText['community.js']))+'\n');
console.log('Verified canonical archive prepared offline; no publication approval granted.');
