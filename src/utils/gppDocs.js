import DOMPurify from 'dompurify';

const GPP_CACHE_PREFIX = 'gpp-docs:1.0:';

const getCacheKey = (slug, language) => `${GPP_CACHE_PREFIX}${language}:${slug}`;

export const clearGppDocCache = (slug, language = 'en') => {
  if (!slug) return;
  localStorage.removeItem(getCacheKey(slug, language));
};

const readCachedGppDoc = (slug, language) => {
  try {
    const cached = localStorage.getItem(getCacheKey(slug, language));
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const writeCachedGppDoc = (slug, language, payload) => {
  try {
    localStorage.setItem(getCacheKey(slug, language), JSON.stringify(payload));
  } catch {
    // Cache is best-effort
  }
};

// GPP is authored in English (base files at ./gpp-docs/<slug>.json). Vietnamese translations,
// when available, live at ./gpp-docs/vi/<slug>.json. Falls back to English with a flag so the
// reader can show a consistent "translation in progress" badge.
export const fetchGppDoc = async (slug, { force = false, language = 'en' } = {}) => {
  if (!force) {
    const cached = readCachedGppDoc(slug, language);
    if (cached?.html) return { ...cached, fromCache: true };
  }

  const primaryUrl = language === 'en' ? `./gpp-docs/${slug}.json` : `./gpp-docs/${language}/${slug}.json`;
  let shown = language;
  let response = await fetch(primaryUrl);

  if (!response.ok && language !== 'en') {
    // Translation not available yet — fall back to the English base copy.
    response = await fetch(`./gpp-docs/${slug}.json`);
    shown = 'en';
  }

  if (!response.ok) {
    throw new Error(`Không tải được tài liệu Game Programming Patterns cho: ${slug}`);
  }

  const payload = await response.json();
  const result = { ...payload, lang: shown };
  writeCachedGppDoc(slug, language, result);
  return { ...result, fromCache: false };
};

export const parseGppDocHtml = ({ html, sourceUrl, fetchedAt, fromCache }, labels = {}) => {
  const safeLabels = {
    cacheHit: labels.cacheHit || 'Using local cache',
    freshFetch: labels.freshFetch || 'Freshly fetched from GPP website',
    updatedAt: labels.updatedAt || 'Updated',
    openSource: labels.openSource || 'Open source page'
  };

  // Parse HTML to extract only the main content
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // GPP content is wrapped in <div class="content">
  const contentDiv = doc.querySelector('.content');
  if (!contentDiv) {
    throw new Error('Không tìm thấy cấu trúc thẻ .content trên trang nguồn GPP.');
  }

  // Remove top and bottom nav menus inside .content
  const topNav = contentDiv.querySelector('nav.top');
  if (topNav) topNav.remove();
  
  const bottomNav = contentDiv.querySelector('nav:not(.top)');
  if (bottomNav) bottomNav.remove();

  // Remove the <h1 class="book"> which contains book name and section category links
  const bookHeader = contentDiv.querySelector('h1.book');
  if (bookHeader) bookHeader.remove();

  // Get the main chapter title (first <h1> inside .content)
  const h1 = contentDiv.querySelector('h1');
  const chapterTitle = h1 ? h1.textContent.trim() : 'Game Programming Patterns';
  if (h1) h1.remove(); // Remove since it is displayed by reader header

  // Rewrite image paths to be absolute from gameprogrammingpatterns.com
  const images = [...contentDiv.querySelectorAll('img')];
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http')) {
      img.setAttribute('src', `https://gameprogrammingpatterns.com/${src}`);
    }
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
  });

  // Rewrite internal page links: e.g. <a href="flyweight.html"> -> <a href="#gpp-doc:flyweight">
  const links = [...contentDiv.querySelectorAll('a')];
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && href.endsWith('.html')) {
      const pageSlug = href.replace('.html', '');
      link.setAttribute('href', `#gpp-doc:${pageSlug}`);
    }
  });

  const cleanHtml = DOMPurify.sanitize(contentDiv.innerHTML, {
    ADD_ATTR: ['target']
  });

  const fetchedDate = fetchedAt ? new Date(fetchedAt).toLocaleString('vi-VN') : '';
  const sourceBadge = `
<div class="unity-doc-meta" style="margin-bottom: 24px;">
  <span>Game Programming Patterns</span>
  <span>${fromCache ? safeLabels.cacheHit : safeLabels.freshFetch}</span>
  ${fetchedDate ? `<span>${safeLabels.updatedAt}: ${fetchedDate}</span>` : ''}
  <a href="${sourceUrl}" target="_blank" rel="noreferrer">${safeLabels.openSource}</a>
</div>`;

  return {
    title: chapterTitle,
    html: `${sourceBadge}<div class="gpp-doc-body">${cleanHtml}</div>`
  };
};
