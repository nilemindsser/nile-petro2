import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deriveBrandDark, hexToOklch } from '../src/oklch.mjs';
import { oklchToHex, parseHex, round } from '../src/color.mjs';
import { parseTokens, resolveScope } from '../src/parse-tokens.mjs';
import { DARK_SCOPE } from '../src/generate.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const INPUT = join(REPO, 'design/RC02.5-FC/02-Source/np-tokens.css');
const skip = !existsSync(INPUT) && 'design tree not imported';

/* Frozen reference outputs — 04-Contracts/flutter-implementation.md §D.
   Tenant A's input (theme.brand.deep) is the registered primitive #1A237E, so A is an
   exact-equality fixture. B and C publish outputs without inputs, so they are checked for
   conformance to the SAME algorithm: the ladder re-derived from each published canvas must
   reproduce the published rungs within 8-bit quantisation (≤ 1/255 per channel). */
const REFERENCE = {
  A: { deep: '#1A237E', ladder: ['#0E1530', '#161E3B', '#202845', '#293250'] },
  B: { deep: null, ladder: ['#051C18', '#0E2521', '#182F2B', '#223935'] },
  C: { deep: null, ladder: ['#280B1D', '#321527', '#3D1E31', '#48283B'] },
};
const RUNGS = ['canvas', 'surface', 'raised', 'elevated'];
const LADDER_L = [0.205, 0.245, 0.285, 0.325];
const near = (a, b, tol = 1) => {
  const x = parseHex(a);
  const y = parseHex(b);
  return Math.abs(x.r - y.r) <= tol && Math.abs(x.g - y.g) <= tol && Math.abs(x.b - y.b) <= tol;
};

test('Tenant A — exact reproduction of the frozen reference ladder', () => {
  const dark = deriveBrandDark(REFERENCE.A.deep);
  RUNGS.forEach((k, i) => assert.equal(dark[k], REFERENCE.A.ladder[i], `rung ${k}`));
  assert.equal(dark.onAction, '#0A1020');
  for (const k of ['border', 'textPrimary', 'textBody', 'textMuted', 'action', 'focus'])
    assert.match(dark[k], /^#[0-9A-F]{6}$/, k);
  const L = (h) => hexToOklch(h).L;
  assert.ok(L(dark.canvas) < L(dark.surface) && L(dark.surface) < L(dark.raised) && L(dark.raised) < L(dark.elevated));
  assert.ok(L(dark.canvas) >= 0.18, 'lightness floor');
});

for (const t of ['B', 'C']) {
  test(`Tenant ${t} — reference ladder conforms to the one algorithm`, () => {
    const c0 = hexToOklch(REFERENCE[t].ladder[0]);
    const H = round(c0.H, 1);
    const C = round(c0.C, 3);
    LADDER_L.forEach((L, i) => {
      const hex = oklchToHex({ L: round(L, 3), C, H });
      assert.ok(near(hex, REFERENCE[t].ladder[i]), `${t} ${RUNGS[i]}: ${hex} vs ${REFERENCE[t].ladder[i]}`);
    });
  });
}

test('the CSS dark scope IS the algorithm output, not a hand-written table', { skip }, async () => {
  const { tokens } = parseTokens(await readFile(INPUT, 'utf8'));
  const dark = resolveScope(tokens, DARK_SCOPE);
  const derived = deriveBrandDark(REFERENCE.A.deep);
  assert.equal(dark.get('--np-dark-canvas'), derived.canvas);
  assert.equal(dark.get('--np-dark-surface'), derived.surface);
  assert.equal(dark.get('--np-dark-raised'), derived.raised);
  assert.equal(dark.get('--np-dark-elevated'), derived.elevated);
  assert.equal(dark.get('--np-canvas'), derived.canvas, 'semantic canvas must read the derived rung');
});
