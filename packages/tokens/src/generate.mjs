#!/usr/bin/env node
/* Token generator — translate, never redesign.
   Input  : design/RC02.5-FC/02-Source/np-tokens.css (canonical, only)
   Outputs: dist/tokens.css · dist/np_tokens.dart · dist/tokens.ts
   Light AND dark semantic themes are emitted from the one source; nothing is
   hand-written and no unresolved expression may leak into Flutter. */
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseTokens, resolveScope, scopesOf } from './parse-tokens.mjs';
import { parseHex } from './color.mjs';

export const GENERATOR_VERSION = '1.1.0';
/* Measured on the sealed RC02.5-FC source (NP-IMP-01-R1 §2).
   357 declarations · 300 distinct names · 7 scopes. 302 was the pre-execution expectation. */
export const EXPECTED = { declarations: 357, distinct: 300, scopes: 7 };
export const LIGHT_SCOPE = ':root';
export const DARK_SCOPE = '[data-scheme="dark"]';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..', '..', '..');
const INPUT = process.env.NP_TOKENS_INPUT || join(REPO, 'design/RC02.5-FC/02-Source/np-tokens.css');
const DIST = join(HERE, '..', 'dist');
const stop = (m) => {
  console.error('STOP — ' + m);
  process.exit(1);
};

const dartName = (n) => n.replace(/^--np-/, '').replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const isColor = (v) => typeof v === 'string' && /^#[0-9A-F]{6}([0-9A-F]{2})?$/.test(v);
const dartColor = (hex) => {
  const c = parseHex(hex);
  const a = Math.round(c.a * 255).toString(16).padStart(2, '0').toUpperCase();
  return `Color(0x${a}${hex.replace('#', '').slice(0, 6)})`;
};

export async function build(inputPath = INPUT) {
  const src = await readFile(inputPath);
  const inputHash = createHash('sha256').update(src).digest('hex');
  const { tokens, problems } = parseTokens(src.toString('utf8'));
  if (problems.length) stop(`unclassifiable declarations: ${JSON.stringify(problems)}`);

  const distinct = new Set(tokens.map((t) => t.name));
  const scopes = scopesOf(tokens);
  const measured = { declarations: tokens.length, distinct: distinct.size, scopes: scopes.length };
  const resolved = new Map();
  for (const s of scopes) resolved.set(s, resolveScope(tokens, s)); // throws with token/scope/expression/reason

  const light = resolved.get(LIGHT_SCOPE);
  const dark = resolved.get(DARK_SCOPE);
  if (!light) stop(`light scope ${LIGHT_SCOPE} not found in the source`);
  if (!dark) stop(`dark scope ${DARK_SCOPE} not found in the source`);

  /* a colour in one scheme must be a colour in the other — no raw string may pose as a colour */
  const colorNames = [...light.keys()].filter((n) => isColor(light.get(n))).sort();
  for (const n of colorNames)
    if (!isColor(dark.get(n))) stop(`token ${n} resolves to a colour in light but not in dark: ${dark.get(n)}`);

  return { src, inputHash, tokens, scopes, measured, resolved, light, dark, colorNames };
}

function banner(kind, inputHash) {
  return [
    'GENERATED — DO NOT EDIT',
    'source      design/RC02.5-FC/02-Source/np-tokens.css',
    `source sha  ${inputHash}`,
    `generator   @nile-petro/tokens ${GENERATOR_VERSION} (${kind})`,
    'baseline    RC02.5-FC — frozen, read-only',
  ];
}

async function main() {
  const b = await build();
  console.log('method       parse + resolve every --np-* declaration with the :root → scope cascade');
  console.log(`population   ${b.measured.declarations} declarations · ${b.measured.scopes} scopes`);
  console.log(`count        ${b.measured.distinct} distinct --np-* token names`);
  for (const k of Object.keys(EXPECTED))
    if (b.measured[k] !== EXPECTED[k]) {
      console.error(`MEASURED ${k} = ${b.measured[k]}, recorded expectation ${EXPECTED[k]} — measurement wins, explain before continuing.`);
      if (!process.env.NP_TOKENS_ACCEPT_COUNT) stop(`${k} differs from the recorded measurement`);
    }

  /* ---- CSS: canonical declarations, verbatim, source order per scope ---- */
  let css = '/*\n' + banner('css', b.inputHash).map((l) => ' * ' + l).join('\n') + '\n */\n';
  for (const scope of b.scopes) {
    css += `\n${scope} {\n`;
    for (const t of b.tokens.filter((x) => x.scope === scope)) css += `  ${t.name}: ${t.value};\n`;
    css += '}\n';
  }

  /* ---- Dart: light + dark semantic themes + shared primitives ---- */
  const prim = [...b.light.keys()].filter((n) => !b.colorNames.includes(n)).sort();
  const cmt = (kind) => banner(kind, b.inputHash).map((l) => '// ' + l).join('\n');
  let dart = cmt('dart') + "\n\nimport 'package:flutter/material.dart';\n\n";
  dart += '@immutable\nclass NpColors extends ThemeExtension<NpColors> {\n  const NpColors({\n';
  for (const n of b.colorNames) dart += `    required this.${dartName(n)},\n`;
  dart += '  });\n\n';
  for (const n of b.colorNames) dart += `  final Color ${dartName(n)};\n`;
  const family = (map) =>
    b.colorNames.map((n) => `        ${dartName(n)}: const ${dartColor(map.get(n))},`).join('\n');
  dart += `\n  static const NpColors light = NpColors(\n${b.colorNames.map((n) => `    ${dartName(n)}: ${dartColor(b.light.get(n))},`).join('\n')}\n  );\n`;
  dart += `\n  static const NpColors dark = NpColors(\n${b.colorNames.map((n) => `    ${dartName(n)}: ${dartColor(b.dark.get(n))},`).join('\n')}\n  );\n`;
  dart += '\n  @override\n  NpColors copyWith() => this;\n\n  @override\n  NpColors lerp(ThemeExtension<NpColors>? other, double t) => this;\n}\n\n';
  dart += 'class NpPrimitives {\n  const NpPrimitives._();\n\n';
  for (const n of prim) {
    const v = b.light.get(n);
    if (/^-?\d*\.?\d+px$/.test(v)) dart += `  static const double ${dartName(n)} = ${parseFloat(v)};\n`;
    else if (/^-?\d*\.?\d+$/.test(v)) dart += `  static const double ${dartName(n)} = ${parseFloat(v)};\n`;
    else if (/^-?\d*\.?\d+m?s$/.test(v))
      dart += `  static const Duration ${dartName(n)} = Duration(milliseconds: ${Math.round(v.endsWith('ms') ? parseFloat(v) : parseFloat(v) * 1000)});\n`;
    else dart += `  static const String ${dartName(n)} = r'${v}'; // non-colour composite, carried verbatim\n`;
  }
  dart += '}\n';
  void family;

  /* ---- TS ---- */
  let ts = cmt('ts') + '\n\n';
  const obj = (map, keys) =>
    '{\n' + keys.map((n) => `  '${n}': '${String(map.get(n)).replace(/'/g, "\\'")}',`).join('\n') + '\n} as const;\n';
  ts += 'export const light = ' + obj(b.light, [...b.light.keys()].sort());
  ts += '\nexport const dark = ' + obj(b.dark, [...b.dark.keys()].sort());
  ts += '\nexport const colorTokens = [\n' + b.colorNames.map((n) => `  '${n}',`).join('\n') + '\n] as const;\n';
  ts += '\nexport type TokenName = keyof typeof light;\n';

  await mkdir(DIST, { recursive: true });
  await writeFile(join(DIST, 'tokens.css'), css, 'utf8');
  await writeFile(join(DIST, 'np_tokens.dart'), dart, 'utf8');
  await writeFile(join(DIST, 'tokens.ts'), ts, 'utf8');
  console.log(`colours      ${b.colorNames.length} semantic colour tokens × 2 schemes · primitives ${prim.length}`);
  console.log('written      dist/tokens.css · dist/np_tokens.dart · dist/tokens.ts');
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
