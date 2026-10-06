import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..', '..', '..');
const GEN = join(HERE, '..', 'src', 'generate.mjs');
const DIST = join(HERE, '..', 'dist');
const OUTS = ['tokens.css', 'np_tokens.dart', 'tokens.ts'];
const skip = !existsSync(join(REPO, 'design/RC02.5-FC/02-Source/np-tokens.css')) && 'design tree not imported';
const generate = () => execFileSync(process.execPath, [GEN], { stdio: 'pipe' });
const dartName = (n) => n.replace(/^--np-/, '').replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

test('two clean runs are byte-identical', { skip }, () => {
  generate();
  const a = OUTS.map((f) => readFileSync(join(DIST, f)));
  generate();
  OUTS.forEach((f, i) => assert.equal(Buffer.compare(a[i], readFileSync(join(DIST, f))), 0, `${f} byte diff`));
  for (const f of OUTS) {
    const text = readFileSync(join(DIST, f), 'utf8');
    assert.match(text, /GENERATED — DO NOT EDIT/);
    assert.doesNotMatch(text, /\d{4}-\d{2}-\d{2}T/, 'timestamp leaked');
    assert.doesNotMatch(text, /\/(Users|home)\//, 'machine path leaked');
  }
});

test('CSS ↔ Dart ↔ TS parity on every colour token, light and dark', { skip }, () => {
  generate();
  const ts = readFileSync(join(DIST, 'tokens.ts'), 'utf8');
  const dart = readFileSync(join(DIST, 'np_tokens.dart'), 'utf8');
  const css = readFileSync(join(DIST, 'tokens.css'), 'utf8');
  assert.ok(css.includes('--np-canvas'), 'css emitted');

  const names = [...ts.matchAll(/^  '(--np-[a-z0-9-]+)',$/gm)].map((m) => m[1]);
  assert.ok(names.length > 50, `only ${names.length} colour tokens found — parity would be weak`);
  const section = (label) => {
    const start = ts.indexOf(`export const ${label} = {`);
    return ts.slice(start, ts.indexOf('} as const;', start));
  };
  const valueOf = (label, name) => section(label).match(new RegExp(`'${name}': '([^']+)'`))?.[1];
  const dartBlock = (label) => {
    const start = dart.indexOf(`static const NpColors ${label} = NpColors(`);
    return dart.slice(start, dart.indexOf(');', start));
  };
  let compared = 0;
  for (const scheme of ['light', 'dark']) {
    const block = dartBlock(scheme);
    for (const name of names) {
      const web = valueOf(scheme, name);
      const m = block.match(new RegExp(`${dartName(name)}: Color\\(0x([0-9A-F]{8})\\)`));
      assert.ok(m, `${name} missing from Dart ${scheme}`);
      const argb = m[1];
      const expected = web.replace('#', '');
      const rgb = expected.slice(0, 6);
      const alpha = expected.length === 8 ? expected.slice(6, 8) : 'FF';
      assert.equal(argb, alpha + rgb, `${scheme} ${name}: dart ${argb} vs css ${expected}`);
      compared++;
    }
  }
  assert.ok(compared >= names.length * 2, 'both schemes must be compared');
});
