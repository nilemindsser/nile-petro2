#!/usr/bin/env node
/* Icon generator — export, never redraw.
   Inputs : design/RC02.5-FC/02-Source/np-icons.js · np-sprite.js
   Outputs: dist/svg/<id>.svg · dist/icons.json · dist/icons.dart · dist/icons.ts
            dist/assets/fingerprint/ (asset-backed exception, copied byte-for-byte) */
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAliasTable, loadIconRegistry } from './load-registry.mjs';

export const GENERATOR_VERSION = '1.0.0';
/* Measured on sealed RC02.5-FC: 101 canonical entries = 100 geometry icons + 1 asset-backed
   fingerprint exception. 101 SVG files is NOT the target — forcing it would redraw the exception. */
export const EXPECTED = { canonical: 101, geometry: 100, mirrored: 9, aliases: 108, assetBacked: 1 };
export const FINGERPRINT_DENSITIES = [
  ['np-fingerprint-1x.png', 44],
  ['np-fingerprint-2x.png', 88],
  ['np-fingerprint-3x.png', 132],
];

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..', '..', '..');
const DESIGN = process.env.NP_DESIGN_ROOT || join(REPO, 'design/RC02.5-FC');
const SRC = join(DESIGN, '02-Source');
const DIST = join(HERE, '..', 'dist');
const stop = (m) => {
  console.error('STOP — ' + m);
  process.exit(1);
};

export function svgFor(id, entry, viewBox) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="${viewBox}" ` +
    `fill="currentColor" stroke="none" aria-hidden="true" focusable="false"` +
    (entry.mirror ? ' data-mirror="true"' : '') +
    `>${entry.path}</svg>\n`
  );
}

async function main() {
  const iconsPath = join(SRC, 'np-icons.js');
  const spritePath = join(SRC, 'np-sprite.js');
  if (!existsSync(iconsPath)) stop(`canonical icon registry not found: ${iconsPath}`);
  const hash = async (p) => createHash('sha256').update(await readFile(p)).digest('hex');
  const iconsHash = await hash(iconsPath);
  const spriteHash = await hash(spritePath);

  const { registry, viewBox, names } = await loadIconRegistry(iconsPath);
  const aliases = await loadAliasTable(spritePath);
  if (viewBox !== '0 0 20 20') stop(`viewBox contract broken: ${viewBox}`);

  const geometry = names.filter((n) => !registry[n].brandArtwork);
  const artwork = names.filter((n) => registry[n].brandArtwork);
  const mirrored = names.filter((n) => registry[n].mirror);
  const empty = geometry.filter((n) => !registry[n].path || !registry[n].path.trim());
  const unknownAliases = Object.entries(aliases).filter(([, canon]) => !registry[canon]);

  console.log('method      evaluate the canonical registry + explicit alias table, no heuristics');
  console.log(`canonical   ${names.length} (expected ${EXPECTED.canonical})`);
  console.log(`mirrored    ${mirrored.length} (expected ${EXPECTED.mirrored})`);
  console.log(`aliases     ${Object.keys(aliases).length} (expected ${EXPECTED.aliases})`);
  console.log(`geometry svg ${geometry.length} (expected ${EXPECTED.geometry}) · asset-backed ${artwork.length} · empty geometry ${empty.length} · unknown aliases ${unknownAliases.length}`);
  if (empty.length) stop(`empty geometry: ${empty.join(', ')}`);
  if (unknownAliases.length) stop(`alias points at a missing canonical id: ${JSON.stringify(unknownAliases)}`);
  const measuredBy = {
    canonical: names.length,
    geometry: geometry.length,
    mirrored: mirrored.length,
    aliases: Object.keys(aliases).length,
    assetBacked: artwork.length,
  };
  for (const [k, v] of Object.entries(EXPECTED)) {
    const measured = measuredBy[k];
    if (measured !== v) {
      console.error(`MEASURED ${k} = ${measured}, frozen expectation ${v}. Measurement wins; explain before continuing.`);
      if (!process.env.NP_ICONS_ACCEPT_COUNT) stop(`${k} count differs from the frozen expectation`);
    }
  }

  await mkdir(join(DIST, 'svg'), { recursive: true });
  await mkdir(join(DIST, 'assets', 'fingerprint'), { recursive: true });
  for (const id of geometry.slice().sort())
    await writeFile(join(DIST, 'svg', `${id}.svg`), svgFor(id, registry[id], viewBox), 'utf8');

  for (const [file] of FINGERPRINT_DENSITIES) {
    const from = join(DESIGN, '03-Assets/biometric/flutter', file);
    if (!existsSync(from)) stop(`fingerprint density missing in the frozen package: ${file}`);
    await copyFile(from, join(DIST, 'assets', 'fingerprint', file)); // byte copy — never recoloured, never redrawn
  }

  const json = {
    generated: 'GENERATED — DO NOT EDIT',
    generator: `@nile-petro/icons ${GENERATOR_VERSION}`,
    baseline: 'RC02.5-FC',
    sources: { 'np-icons.js': iconsHash, 'np-sprite.js': spriteHash },
    viewBox,
    counts: {
      canonical: names.length,
      geometry: geometry.length,
      mirrored: mirrored.length,
      aliases: Object.keys(aliases).length,
      assetBacked: artwork.length,
    },
    icons: Object.fromEntries(
      names.slice().sort().map((id) => [
        id,
        {
          mirror: !!registry[id].mirror,
          assetBacked: !!registry[id].brandArtwork,
          currentColor: !registry[id].brandArtwork,
          file: registry[id].brandArtwork ? null : `svg/${id}.svg`,
        },
      ]),
    ),
    aliases: Object.fromEntries(Object.entries(aliases).sort(([a], [b]) => (a < b ? -1 : 1))),
    fingerprint: {
      exception: 'canonical asset-backed icon — not a currentColor geometry icon',
      darkVariantPolicy: 'SAME_AS_LIGHT_WITH_MEDALLION',
      densities: Object.fromEntries(FINGERPRINT_DENSITIES.map(([f, px]) => [f, { logical: 44, pixels: px }])),
    },
  };
  await writeFile(join(DIST, 'icons.json'), JSON.stringify(json, null, 2) + '\n', 'utf8');

  const banner = (lang) =>
    `${lang === 'dart' ? '//' : '//'} GENERATED — DO NOT EDIT\n` +
    `// sources np-icons.js ${iconsHash}\n// sources np-sprite.js ${spriteHash}\n` +
    `// generator @nile-petro/icons ${GENERATOR_VERSION} · baseline RC02.5-FC\n\n`;
  const dartId = (id) => id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
  let dart = banner('dart') + 'class NpIcons {\n  const NpIcons._();\n\n';
  for (const id of names.slice().sort())
    dart += `  static const String ${dartId(id)} = '${id}';\n`;
  dart += '\n  static const Set<String> mirrored = {\n' + mirrored.slice().sort().map((i) => `    '${i}',`).join('\n') + '\n  };\n}\n';
  await writeFile(join(DIST, 'icons.dart'), dart, 'utf8');

  let ts = banner('ts') + 'export const NP_ICONS = [\n' + names.slice().sort().map((i) => `  '${i}',`).join('\n') + '\n] as const;\n\n';
  ts += 'export const NP_ICON_MIRRORED = new Set<string>([\n' + mirrored.slice().sort().map((i) => `  '${i}',`).join('\n') + '\n]);\n\n';
  ts += 'export const NP_ICON_ALIASES: Record<string, string> = ' + JSON.stringify(json.aliases, null, 2) + ';\n';
  await writeFile(join(DIST, 'icons.ts'), ts, 'utf8');
  console.log(`written     ${geometry.length} svg · icons.json · icons.dart · icons.ts · ${FINGERPRINT_DENSITIES.length} fingerprint assets`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
