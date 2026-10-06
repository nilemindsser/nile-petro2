import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXPECTED, FINGERPRINT_DENSITIES } from '../src/generate.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const GEN = join(HERE, '..', 'src', 'generate.mjs');
const DIST = join(HERE, '..', 'dist');
const skip = !existsSync(join(HERE, '..', '..', '..', 'design')) && 'design tree not imported';

test('icon generator is byte-deterministic', { skip }, () => {
  execFileSync(process.execPath, [GEN], { stdio: 'pipe' });
  const snap = () =>
    readdirSync(join(DIST, 'svg')).sort().map((f) => readFileSync(join(DIST, 'svg', f)).toString('hex')).join('|') +
    ['icons.json', 'icons.dart', 'icons.ts'].map((f) => readFileSync(join(DIST, f)).toString('hex')).join('|');
  const a = snap();
  execFileSync(process.execPath, [GEN], { stdio: 'pipe' });
  assert.equal(snap(), a, 'icon outputs differ between runs');
});

test('every generated icon satisfies the frozen contract', { skip }, () => {
  const meta = JSON.parse(readFileSync(join(DIST, 'icons.json'), 'utf8'));
  const files = readdirSync(join(DIST, 'svg'));
  assert.equal(meta.counts.mirrored, EXPECTED.mirrored);
  assert.equal(meta.counts.aliases, EXPECTED.aliases);
  assert.equal(Object.keys(meta.icons).length, EXPECTED.canonical);
  assert.equal(files.length, EXPECTED.geometry, '100 geometry SVGs + 1 asset-backed exception = 101 entries');
  assert.equal(meta.counts.assetBacked, EXPECTED.assetBacked);
  for (const f of files) {
    const svg = readFileSync(join(DIST, 'svg', f), 'utf8');
    assert.match(svg, /viewBox="0 0 20 20"/, `${f} viewBox`);
    assert.match(svg, /fill="currentColor"/, `${f} currentColor`);
    assert.ok(/<(path|circle|rect|g)\b/.test(svg), `${f} empty geometry`);
    assert.doesNotMatch(svg, /#[0-9a-fA-F]{3,8}/, `${f} contains a colour literal`);
  }
  for (const [, canon] of Object.entries(meta.aliases)) assert.ok(meta.icons[canon], `alias -> ${canon} unresolved`);
  assert.equal(meta.fingerprint.darkVariantPolicy, 'SAME_AS_LIGHT_WITH_MEDALLION');
  for (const [file] of FINGERPRINT_DENSITIES)
    assert.ok(existsSync(join(DIST, 'assets', 'fingerprint', file)), `missing ${file}`);
});
