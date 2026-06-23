// Packages hand-translated Vietnamese GPP content into the static JSON the app loads.
// Reads translated bodies from scripts/.gpp-src/vi/<slug>.html (inner content only — chapter
// <h1> + body, NO outer .content wrapper) and writes public/gpp-docs/vi/<slug>.json with the
// same shape as the English base, so parseGppDocHtml renders it identically.
//
// Run: node scripts/buildGppVi.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viSrcDir = path.resolve(__dirname, '.gpp-src/vi');
const enDir = path.resolve(__dirname, '../public/gpp-docs');
const outDir = path.join(enDir, 'vi');
fs.mkdirSync(outDir, { recursive: true });

if (!fs.existsSync(viSrcDir)) {
  throw new Error(`No translations found at ${viSrcDir}`);
}

const files = fs.readdirSync(viSrcDir).filter((f) => f.endsWith('.html'));
let written = 0;
for (const file of files) {
  const slug = file.replace(/\.html$/, '');
  const enPath = path.join(enDir, `${slug}.json`);
  if (!fs.existsSync(enPath)) {
    console.warn(`  [skip] no English base for ${slug}`);
    continue;
  }
  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const body = fs.readFileSync(path.join(viSrcDir, file), 'utf8').trim();

  const payload = {
    html: `<div class="content">${body}</div>`,
    sourceUrl: en.sourceUrl,
    fetchedAt: en.fetchedAt,
    lang: 'vi',
  };
  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(payload), 'utf8');
  written += 1;
  console.log(`  [ok] vi/${slug}.json`);
}
console.log(`\nDone: ${written} Vietnamese GPP file(s) built.`);
