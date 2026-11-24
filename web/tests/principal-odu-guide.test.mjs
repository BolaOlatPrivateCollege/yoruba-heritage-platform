import test from 'node:test';
import assert from 'node:assert/strict';
import {principalGuides} from '../src/lib/principal-odu-guide.ts';
import {principalOdu} from '../src/lib/odu-library.ts';
test('all 16 principal entries have attributed editorial content',()=>{
 assert.deepEqual(Object.keys(principalGuides).sort(),principalOdu.map(o=>o.slug).sort());
 for(const g of Object.values(principalGuides))for(const key of ['theme','narrative','reflection','ire','ibi','associations','aliases'])assert.ok(g[key].length>5,key);
 assert.ok(!('verse' in principalGuides.ogbe));
 assert.ok(!principalGuides.oyeku.aliases.includes('Logbè'));
});