/* Loads the frozen icon sources WITHOUT redrawing anything.
   np-icons.js publishes window.NPIcons (registry + viewBox) — evaluated in a
   minimal DOM shim, so geometry comes from the canonical file verbatim.
   np-sprite.js keeps its ALIAS table inside an IIFE — the explicit object
   literal is extracted by brace matching and evaluated on its own.
   No heuristics, no nearest-icon guessing, no fallback geometry. */
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

export async function loadIconRegistry(iconsPath) {
  const code = await readFile(iconsPath, 'utf8');
  const win = {};
  const sandbox = {
    window: win,
    document: { readyState: 'complete', addEventListener() {}, querySelectorAll: () => [] },
    customElements: { get: () => undefined, define() {} },
    HTMLElement: class {},
    console,
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: iconsPath });
  const api = win.NPIcons;
  if (!api || !api.registry) throw new Error('STOP: np-icons.js did not publish window.NPIcons.registry');
  return { registry: api.registry, viewBox: api.viewBox, names: Object.keys(api.registry) };
}

export async function loadAliasTable(spritePath) {
  const code = await readFile(spritePath, 'utf8');
  const start = code.indexOf('var ALIAS = {');
  if (start === -1) throw new Error('STOP: explicit ALIAS table not found in np-sprite.js');
  const open = code.indexOf('{', start);
  let depth = 0;
  let end = -1;
  for (let i = open; i < code.length; i++) {
    if (code[i] === '{') depth++;
    else if (code[i] === '}') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end === -1) throw new Error('STOP: ALIAS table is not a closed object literal');
  const table = vm.runInNewContext('(' + code.slice(open, end) + ')');
  if (!table || typeof table !== 'object') throw new Error('STOP: ALIAS table did not evaluate to an object');
  return table;
}
