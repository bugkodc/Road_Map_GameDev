// Copies the Doc/ markdown tree into dist/Doc after the Vite build.
//
// Locally this is served through a `public/Doc` symlink, but that symlink is gitignored and
// does NOT exist on a fresh CI checkout (GitHub Actions). Without this step the deployed site
// would be missing all of its local markdown (Refactoring, Design Patterns, Unity VI pages).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(__dirname, '../Doc');
const dest = path.resolve(__dirname, '../dist/Doc');

if (!fs.existsSync(src)) {
  throw new Error(`[copyDocToDist] Source not found: ${src}`);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });
console.log(`[copyDocToDist] Copied Doc/ -> dist/Doc`);
