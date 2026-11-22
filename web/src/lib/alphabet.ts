import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {z} from 'zod';
const Letter=z.object({letter:z.string().min(1),kind:z.enum(['vowel','consonant']),guidance:z.string().min(1)}).strict();
export const alphabet=z.array(Letter).length(25).parse(JSON.parse(readFileSync(resolve(process.cwd(),'.generated/alphabet.json'),'utf8')));
