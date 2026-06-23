import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SLUGS = [
  'unreal-engine-5-7-documentation',
  'whats-new',
  'understanding-the-basics-of-unreal-engine',
  'working-with-content-in-unreal-engine',
  'building-virtual-worlds-in-unreal-engine',
  'designing-visuals-rendering-and-graphics-with-unreal-engine',
  'creating-visual-effects-in-niagara-for-unreal-engine',
  'gameplay-tutorials-for-unreal-engine',
  'blueprints-visual-scripting-in-unreal-engine',
  'programming-with-cplusplus-in-unreal-engine',
  'gameplay-systems-in-unreal-engine',
  'getting-started-with-mobile-development-in-unreal-engine',
  'animating-characters-and-objects-in-unreal-engine',
  'motion-design-in-unreal-engine',
  'creating-user-interfaces-with-umg-and-slate-in-unreal-engine',
  'working-with-audio-in-unreal-engine',
  'working-with-media-in-unreal-engine',
  'setting-up-your-production-pipeline-in-unreal-engine',
  'testing-and-optimizing-your-content',
  'sharing-and-releasing-projects-for-unreal-engine',
  'samples-and-tutorials-for-unreal-engine'
];

// Simple sleep helper to avoid spamming the translation API
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function translateText(text, targetLang = 'vi') {
  const trimmed = text.trim();
  if (!trimmed || /^[\d\s\W]+$/.test(trimmed)) {
    return text; // Skip empty, whitespace, numbers or symbols
  }

  // Handle HTML entities or special char representations
  if (trimmed.startsWith('&') && trimmed.endsWith(';')) {
    return text;
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    if (!res.ok) return text;
    const json = await res.json();
    if (json && json[0]) {
      const translated = json[0].map(item => item[0]).join('');
      return translated || text;
    }
  } catch (err) {
    console.error(`Failed to translate "${trimmed}":`, err);
  }
  return text;
}

// Safely translate HTML text nodes without touching HTML tags
async function translateHtml(html) {
  // Split HTML into tag parts and text parts
  const parts = html.split(/(<[^>]+>)/g);
  let result = '';

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('<') && part.endsWith('>')) {
      // It's a tag, keep it as is
      result += part;
    } else {
      // It's text, translate it
      if (part.trim()) {
        const translated = await translateText(part, 'vi');
        result += translated;
        // Small delay to be polite to the translation API
        await sleep(50);
      } else {
        result += part;
      }
    }
  }
  return result;
}

// Extract content and clean HTML (matching unrealDocs.js logic)
function cleanHtmlContent(rawHtml, slug) {
  // Simple regex to extract <main> or <article> element from the raw document
  const mainMatch = rawHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let contentHtml = mainMatch ? mainMatch[0] : '';
  
  if (!contentHtml) {
    const articleMatch = rawHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    contentHtml = articleMatch ? articleMatch[0] : rawHtml;
  }

  // Extract title
  const h1Match = contentHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let title = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : '';
  if (!title) {
    const titleMatch = rawHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    title = titleMatch ? titleMatch[1].replace(/\s*\|\s*Epic Developer Community/i, '').trim() : slug;
  }

  // Clean tags
  const tagsToRemove = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi,
    /<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi,
    /<input\b[^>]*>/gi,
    /<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/gi,
    /<textarea\b[^<]*(?:(?!<\/textarea>)<[^<]*)*<\/textarea>/gi,
    /<site-header\b[^<]*(?:(?!<\/site-header>)<[^<]*)*<\/site-header>/gi,
    /<side-panel\b[^<]*(?:(?!<\/side-panel>)<[^<]*)*<\/side-panel>/gi,
    /<site-nav\b[^<]*(?:(?!<\/site-nav>)<[^<]*)*<\/site-nav>/gi,
    /<site-footer\b[^<]*(?:(?!<\/site-footer>)<[^<]*)*<\/site-footer>/gi,
    /<site-modal\b[^<]*(?:(?!<\/site-modal>)<[^<]*)*<\/site-modal>/gi,
    /<notify-component\b[^<]*(?:(?!<\/notify-component>)<[^<]*)*<\/notify-component>/gi,
    /<spinner\b[^<]*(?:(?!<\/spinner>)<[^<]*)*<\/spinner>/gi,
    /<content-sidebar\b[^<]*(?:(?!<\/content-sidebar>)<[^<]*)*<\/content-sidebar>/gi,
    /<btn-favorite\b[^<]*(?:(?!<\/btn-favorite>)<[^<]*)*<\/btn-favorite>/gi
  ];

  for (const tagPattern of tagsToRemove) {
    contentHtml = contentHtml.replace(tagPattern, '');
  }

  // Remove elements by class names or tag names via string replace (since we don't have JSDOM here)
  contentHtml = contentHtml.replace(/<div class="explore-more[\s\S]*?<\/div>\s*<\/div>/gi, '');
  contentHtml = contentHtml.replace(/<div class="document-btn-bar[\s\S]*?<\/div>/gi, '');
  contentHtml = contentHtml.replace(/<div class="document-header[\s\S]*?<\/content-nav>\s*<\/header>/gi, '');

  // Rewrite links
  contentHtml = contentHtml.replace(/href="([^"]*)"/gi, (match, href) => {
    const unrealMatch = href.match(/^(?:https:\/\/dev\.epicgames\.com)?\/documentation\/(?:[a-zA-Z]{2}-[a-zA-Z]{2}\/)?unreal-engine\/([\w./-]+)/i);
    if (unrealMatch) {
      return `href="#unreal-doc:${encodeURIComponent(unrealMatch[1])}"`;
    }
    if (href.startsWith('http')) {
      return `href="${href}" target="_blank" rel="noreferrer"`;
    }
    return match;
  });

  // Rewrite relative images to absolute Epic developer community URLs
  contentHtml = contentHtml.replace(/src="\/([^"]*)"/gi, (match, src) => {
    return `src="https://dev.epicgames.com/${src}"`;
  });

  // Add img class for styling
  contentHtml = contentHtml.replace(/<img /gi, '<img class="unreal-doc-img" ');

  return { title, html: contentHtml };
}

async function run() {
  console.log('Starting Unreal Engine 5.7 documentation scrape and translation...');
  
  const publicDir = path.resolve(__dirname, '../public/unreal-docs');
  const enDir = path.join(publicDir, 'en');
  const viDir = path.join(publicDir, 'vi');

  fs.mkdirSync(enDir, { recursive: true });
  fs.mkdirSync(viDir, { recursive: true });

  for (let index = 0; index < SLUGS.length; index++) {
    const slug = SLUGS[index];
    console.log(`[${index + 1}/${SLUGS.length}] Scraping slug: ${slug}...`);
    
    const url = `https://dev.epicgames.com/documentation/en-us/unreal-engine/${slug}`;
    try {
      const resp = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });

      if (!resp.ok) {
        console.error(`  Failed to fetch ${slug}: Status ${resp.status}`);
        continue;
      }

      const rawHtml = await resp.text();
      const cleaned = cleanHtmlContent(rawHtml, slug);
      
      const payloadEn = {
        title: cleaned.title,
        html: cleaned.html,
        sourceUrl: url,
        fetchedAt: new Date().toISOString()
      };

      // Save English JSON
      fs.writeFileSync(path.join(enDir, `${slug}.json`), JSON.stringify(payloadEn, null, 2), 'utf8');
      console.log(`  Saved English version.`);

      // Translate title and html body to Vietnamese
      console.log(`  Translating to Vietnamese...`);
      const viTitle = await translateText(cleaned.title, 'vi');
      const viHtml = await translateHtml(cleaned.html);

      const payloadVi = {
        title: viTitle,
        html: viHtml,
        sourceUrl: url,
        fetchedAt: new Date().toISOString()
      };

      // Save Vietnamese JSON
      fs.writeFileSync(path.join(viDir, `${slug}.json`), JSON.stringify(payloadVi, null, 2), 'utf8');
      console.log(`  Saved Vietnamese version.`);

      // Politely sleep to avoid API rate limits
      await sleep(500);

    } catch (error) {
      console.error(`  Error processing ${slug}:`, error.message);
    }
  }

  console.log('Finished updating all Unreal Engine documentation files!');
}

run();
