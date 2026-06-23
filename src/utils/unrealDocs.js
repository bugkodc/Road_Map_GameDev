import DOMPurify from 'dompurify';
import { UNREAL_DOC_VERSION } from '../config/docVersions';

export { UNREAL_DOC_VERSION };
const UNREAL_CACHE_PREFIX = `unreal-docs:${UNREAL_DOC_VERSION}:`;

const getCacheKey = (language, slug) => `${UNREAL_CACHE_PREFIX}${language}:${slug}`;

export const clearUnrealDocCache = (slug, language = 'vi') => {
  if (!slug) return;
  localStorage.removeItem(getCacheKey(language, slug));
};

const readCachedUnrealDoc = (language, slug) => {
  try {
    const cached = localStorage.getItem(getCacheKey(language, slug));
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const writeCachedUnrealDoc = (language, slug, payload) => {
  try {
    localStorage.setItem(getCacheKey(language, slug), JSON.stringify(payload));
  } catch {
    // Cache is best-effort
  }
};

const resizeEpicImage = (source, { thumbnail = false } = {}) => {
  try {
    const url = new URL(source, window.location.origin);
    if (!url.hostname.endsWith('epicgames.com') || !url.pathname.includes('/community/api/documentation/image/')) {
      return source;
    }

    const currentWidth = Number(url.searchParams.get('width')) || 0;
    const currentHeight = Number(url.searchParams.get('height')) || 0;
    const targetWidth = thumbnail ? 320 : 1280;

    if (!currentWidth || currentWidth > targetWidth) {
      if (currentWidth && currentHeight) {
        url.searchParams.set('height', String(Math.max(1, Math.round(currentHeight * targetWidth / currentWidth))));
      }
      url.searchParams.set('width', String(targetWidth));
    }

    return url.toString();
  } catch {
    return source;
  }
};

const optimizeUnrealImages = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div id="unreal-root">${html}</div>`, 'text/html');
  const root = doc.querySelector('#unreal-root');
  const images = [...root.querySelectorAll('img')];

  images.forEach((image, index) => {
    const isThumbnail = Boolean(image.closest('.thumbnail-container, .document-list-card'));
    const isPriority = index < 5 || Boolean(image.closest('.b-img'));
    const source = image.getAttribute('src');

    image.classList.add('unreal-doc-img');
    image.removeAttribute('srcset');
    image.setAttribute('decoding', 'async');
    image.setAttribute('loading', isPriority ? 'eager' : 'lazy');
    image.setAttribute('fetchpriority', isPriority ? 'high' : 'low');

    if (source) image.setAttribute('src', resizeEpicImage(source, { thumbnail: isThumbnail }));
  });

  return root.innerHTML;
};

export const fetchUnrealDoc = async (slug, { language = 'vi', force = false } = {}) => {
  if (!force) {
    const cached = readCachedUnrealDoc(language, slug);
    if (cached?.html) return { ...cached, fromCache: true };
  }

  // Load from local static JSON served by Vite
  const response = await fetch(`./unreal-docs/${language}/${slug}.json`);
  if (!response.ok) {
    // Fallback to English if Vietnamese is missing
    if (language === 'vi') {
      const fallbackResponse = await fetch(`./unreal-docs/en/${slug}.json`);
      if (fallbackResponse.ok) {
        const payload = await fallbackResponse.json();
        writeCachedUnrealDoc(language, slug, payload);
        return { ...payload, fromCache: false };
      }
    }
    throw new Error(`Không tải được tài nguyên Unreal Engine cho: ${slug}`);
  }

  const payload = await response.json();
  writeCachedUnrealDoc(language, slug, payload);
  return { ...payload, fromCache: false };
};

export const parseUnrealDocHtml = ({ html, title, sourceUrl, fetchedAt, fromCache }, labels = {}) => {
  const safeLabels = {
    cacheHit: labels.cacheHit || 'Using local cache',
    freshFetch: labels.freshFetch || 'Updated from Local JSON',
    updatedAt: labels.updatedAt || 'Updated',
    openSource: labels.openSource || 'Open source page'
  };

  const cleanHtml = DOMPurify.sanitize(optimizeUnrealImages(html), {
    ADD_ATTR: ['target']
  });

  const fetchedDate = fetchedAt ? new Date(fetchedAt).toLocaleString('vi-VN') : '';
  const sourceBadge = `
<div class="unreal-doc-meta">
  <span>Unreal Engine ${UNREAL_DOC_VERSION}</span>
  <span>${fromCache ? safeLabels.cacheHit : safeLabels.freshFetch}</span>
  ${fetchedDate ? `<span>${safeLabels.updatedAt}: ${fetchedDate}</span>` : ''}
  <a href="${sourceUrl}" target="_blank" rel="noreferrer">${safeLabels.openSource}</a>
</div>`;

  return {
    title: title || 'Unreal Engine 5.7 Documentation',
    html: `${sourceBadge}<div class="unreal-doc-body">${cleanHtml}</div>`
  };
};
