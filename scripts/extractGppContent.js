// Translation helper (NOT committed output): extracts the clean .content body from each English
// GPP json into scripts/.gpp-src/<slug>.html so it can be translated into Vietnamese.
// The Vietnamese result is saved by hand as public/gpp-docs/vi/<slug>.json with the shape:
//   { "html": "<div class=\"content\"><h1>..</h1> ..translated.. </div>", "sourceUrl": "..", "fetchedAt": ".." }
//
// Run: node scripts/extractGppContent.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, '../public/gpp-docs');
const outDir = path.resolve(__dirname, '.gpp-src');
fs.mkdirSync(outDir, { recursive: true });

// Depth-scan from `<div class="content">` to its matching </div>.
const extractContent = (html) => {
  const start = html.search(/<div\s+class="content"\s*>/i);
  if (start === -1) return null;
  const openTagEnd = html.indexOf('>', start) + 1;
  let depth = 1;
  const re = /<div\b[^>]*>|<\/div>/gi;
  re.lastIndex = openTagEnd;
  let m;
  while ((m = re.exec(html))) {
    depth += m[0].toLowerCase().startsWith('</div') ? -1 : 1;
    if (depth === 0) return html.slice(openTagEnd, m.index);
  }
  return null;
};

const slugs = fs
  .readdirSync(srcDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''));

const report = [];
for (const slug of slugs) {
  const json = JSON.parse(fs.readFileSync(path.join(srcDir, `${slug}.json`), 'utf8'));
  let content = extractContent(json.html);
  if (!content) {
    report.push(`${slug}: NO .content found`);
    continue;
  }
  // Mirror parseGppDocHtml cleanup so the translation source matches what users see.
  content = content
    .replace(/<nav\s+class="top"[\s\S]*?<\/nav>/i, '')
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, '')
    .replace(/<h1\s+class="book"[\s\S]*?<\/h1>/i, '')
    .trim();

  fs.writeFileSync(path.join(outDir, `${slug}.html`), content, 'utf8');
  const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  report.push(`${slug}: ${content.length} chars, ~${words} words`);
}

report.sort((a, b) => parseInt(a.split('~')[1] || '0') - parseInt(b.split('~')[1] || '0'));
console.log('Extracted GPP content to scripts/.gpp-src/\n' + report.join('\n'));
