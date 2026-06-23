// Build-time prefetch of the Game Programming Patterns chapters linked in the roadmap.
// Saves raw upstream HTML into public/gpp-docs/<slug>.json so the site works on a static host.
// The client (src/utils/gppDocs.js -> parseGppDocHtml) extracts the .content div and sanitises.
//
// Run: npm run update:gpp   (or npm run update:docs)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORIGIN = 'https://gameprogrammingpatterns.com';

// Must stay in sync with the gpp-doc: slugs in src/utils/navigation.json
const SLUGS = [
  'introduction',
  'architecture-performance-and-games',
  'command',
  'flyweight',
  'observer',
  'prototype',
  'singleton',
  'state',
  'double-buffer',
  'game-loop',
  'update-method',
  'bytecode',
  'subclass-sandbox',
  'type-object',
  'component',
  'event-queue',
  'spatial-partition'
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const run = async () => {
  console.log('Prefetching Game Programming Patterns chapters...');
  const outDir = path.resolve(__dirname, '../public/gpp-docs');
  fs.mkdirSync(outDir, { recursive: true });

  let ok = 0;
  const failed = [];

  for (const slug of SLUGS) {
    const sourceUrl = `${ORIGIN}/${slug}.html`;
    try {
      const res = await fetch(sourceUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      const payload = { html, sourceUrl, fetchedAt: new Date().toISOString() };
      fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(payload), 'utf8');
      ok += 1;
      console.log(`  [ok] ${slug}`);
    } catch (error) {
      failed.push(`${slug} (${error.message})`);
      console.error(`  [FAIL] ${slug}: ${error.message}`);
    }
    await sleep(300);
  }

  console.log(`\nGPP docs done: ${ok} saved, ${failed.length} failed.`);
  if (failed.length) failed.forEach((f) => console.log(`  - ${f}`));
};

run();
