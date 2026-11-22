import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createContext, runInContext } from 'node:vm';

// Existing source modules were designed for browsers. Load in a sandboxed VM to
// inspect content without executing browser UI code or making network requests.
const originalModules = ['content.js', 'knowledge.js', 'extended-sacred-arts.js', 'sacred-atlas.js', 'deep-heritage.js', 'names-etymology.js', 'research-authors.js'];
export const ORIGINAL_MODULES = Object.freeze(originalModules);

export function loadArchive(root = process.cwd()) {
  const window = {};
  const context = createContext({ window });
  for (const file of originalModules) {
    runInContext(readFileSync(resolve(root, file), 'utf8'), context, { filename: file, timeout: 3000 });
  }
  return window.HISTORY_DATA;
}
