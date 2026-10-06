#!/usr/bin/env node
/* Unicode-safe import of the sealed artifact.
   A platform `unzip` may transcode or decompose non-ASCII filenames (the frozen
   package uses "·"), which silently breaks the content digest. This extractor
   decodes every entry name as UTF-8 from the archive bytes and writes it verbatim.
   Usage: node tools/import-design.mjs [path/to/Nile-Petro-Developer-Handoff-RC02.5-FC.zip] */
import { createHash } from 'node:crypto';
import { inflateRawSync } from 'node:zlib';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const ZIP = process.argv[2] || 'Nile-Petro-Developer-Handoff-RC02.5-FC.zip';
const EXPECTED_ZIP = '25ef2cfb637f405082052f0bd8d28ba0fd73bc81b29c5f1530f64a33a1e3b911';
const EXPECTED_DIGEST = 'c079d1a25ff5518dd8db701f8e99cf6661d9a8de9ea175dc5eecc771539d4395';
const DEST = 'design/RC02.5-FC';
const PKG_PREFIX = 'Nile-Petro-Developer-Handoff-RC02.5-FC/';
const stop = (m) => {
  console.error('STOP — ' + m);
  process.exit(1);
};

const buf = await readFile(ZIP);
const zipHash = createHash('sha256').update(buf).digest('hex');
console.log('zip           ', ZIP, buf.length, 'bytes');
console.log('zip sha-256   ', zipHash, zipHash === EXPECTED_ZIP ? 'MATCH' : 'MISMATCH');
if (zipHash !== EXPECTED_ZIP) stop('sealed artifact hash does not match the frozen baseline');

/* locate End Of Central Directory */
let eocd = -1;
for (let i = buf.length - 22; i >= 0; i--) if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
if (eocd < 0) stop('EOCD not found — not a zip');
const count = buf.readUInt16LE(eocd + 10);
let p = buf.readUInt32LE(eocd + 16);

const rows = [];
let nonAscii = 0;
for (let i = 0; i < count; i++) {
  if (buf.readUInt32LE(p) !== 0x02014b50) stop(`central directory entry ${i} corrupt`);
  const flags = buf.readUInt16LE(p + 8);
  const method = buf.readUInt16LE(p + 10);
  const crc = buf.readUInt32LE(p + 16);
  const csize = buf.readUInt32LE(p + 20);
  const usize = buf.readUInt32LE(p + 24);
  const nlen = buf.readUInt16LE(p + 28);
  const elen = buf.readUInt16LE(p + 30);
  const clen = buf.readUInt16LE(p + 32);
  const local = buf.readUInt32LE(p + 42);
  const name = buf.slice(p + 46, p + 46 + nlen).toString('utf8'); // always UTF-8, never OS-transcoded
  if (!(flags & 0x0800) && /[^\x00-\x7F]/.test(name)) stop(`entry ${name} is non-ASCII without the UTF-8 flag`);
  if (/[^\x00-\x7F]/.test(name)) nonAscii++;
  const lnlen = buf.readUInt16LE(local + 26);
  const lelen = buf.readUInt16LE(local + 28);
  const start = local + 30 + lnlen + lelen;
  const raw = buf.slice(start, start + csize);
  const data = method === 0 ? raw : method === 8 ? inflateRawSync(raw) : stop(`unsupported compression method ${method} in ${name}`);
  if (data.length !== usize) stop(`size mismatch in ${name}`);
  const rel = name.startsWith(PKG_PREFIX) ? name.slice(PKG_PREFIX.length) : name;
  if (rel) {
    const out = join(DEST, rel);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, data);
    rows.push(`${rel}|${data.length}|${createHash('sha256').update(data).digest('hex')}`);
  }
  p += 46 + nlen + elen + clen;
  void crc;
}

const included = rows.filter((r) => !r.startsWith('DELIVERY-MANIFEST.md|')).sort();
const digest = createHash('sha256').update(included.join('\n') + '\n', 'utf8').digest('hex');
console.log('entries       ', count, '· non-ASCII names', nonAscii);
console.log('extracted to  ', DEST);
console.log('content digest', digest, digest === EXPECTED_DIGEST ? 'MATCH' : 'MISMATCH');
if (digest !== EXPECTED_DIGEST) stop('extracted tree does not reproduce the frozen content digest');
console.log('import        PASS');
