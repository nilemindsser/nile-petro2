import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { parseTokens, resolveScope, scopesOf, effectiveTable, resolveToken, TokenResolveError } from '../src/parse-tokens.mjs';
import { EXPECTED, LIGHT_SCOPE, DARK_SCOPE } from '../src/generate.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const INPUT = join(REPO, 'design/RC02.5-FC/02-Source/np-tokens.css');
const skip = !existsSync(INPUT) && 'design tree not imported';
const load = async () => parseTokens(await readFile(INPUT, 'utf8'));

test('measured inventory: 357 declarations · 300 distinct · 7 scopes', { skip }, async () => {
  const { tokens, problems } = await load();
  assert.equal(problems.length, 0);
  assert.equal(tokens.length, EXPECTED.declarations);
  assert.equal(new Set(tokens.map((t) => t.name)).size, EXPECTED.distinct);
  assert.equal(scopesOf(tokens).length, EXPECTED.scopes);
});

test('every frozen scope resolves with zero unresolved references', { skip }, async () => {
  const { tokens } = await load();
  for (const scope of scopesOf(tokens)) {
    const resolved = resolveScope(tokens, scope);
    assert.ok(resolved.size > 0, scope);
    for (const [name, value] of resolved)
      assert.doesNotMatch(String(value), /var\(/, `${name} unresolved in ${scope}`);
  }
});

test('cross-scope inheritance: a scoped token reads a :root primitive', { skip }, async () => {
  const { tokens } = await load();
  const dark = resolveScope(tokens, DARK_SCOPE);
  const light = resolveScope(tokens, LIGHT_SCOPE);
  assert.match(dark.get('--np-canvas'), /^#[0-9A-F]{6}$/);
  assert.notEqual(dark.get('--np-canvas'), light.get('--np-canvas'));
  assert.equal(dark.get('--np-canvas'), dark.get('--np-dark-canvas'));
});

test('unknown reference fails loudly', () => {
  const { tokens } = parseTokens(':root { --np-a: var(--np-missing); }');
  assert.throws(() => resolveScope(tokens, ':root'), TokenResolveError);
});

test('circular reference fails loudly', () => {
  const { tokens } = parseTokens(':root { --np-a: var(--np-b); --np-b: var(--np-a); }');
  assert.throws(() => resolveScope(tokens, ':root'), TokenResolveError);
});

test('unsupported colour construct fails loudly — no guessed conversion', () => {
  const { tokens } = parseTokens(':root { --np-a: hsl(210 50% 40%); }');
  assert.throws(() => resolveScope(tokens, ':root'), /unsupported colour construct/);
});

test('calc, oklch and color-mix resolve to canonical values', () => {
  const { tokens } = parseTokens(
    ':root { --np-h: 270.3; --np-c: 0.055; --np-x: oklch(0.205 var(--np-c) var(--np-h));' +
      ' --np-y: oklch(0.590 calc(var(--np-c) * 0.85) var(--np-h)); --np-w: #FFFFFF;' +
      ' --np-m: color-mix(in srgb, var(--np-w) 50%, #000000); --np-t: color-mix(in srgb, #0E1116 45%, transparent); }',
  );
  const r = resolveScope(tokens, ':root');
  assert.equal(r.get('--np-x'), '#0E1530');
  assert.match(r.get('--np-y'), /^#[0-9A-F]{6}$/);
  assert.equal(r.get('--np-m'), '#808080');
  assert.equal(r.get('--np-t'), '#0E111673');
  const table = effectiveTable(tokens, ':root');
  assert.equal(resolveToken('--np-x', table, ':root'), '#0E1530');
});
