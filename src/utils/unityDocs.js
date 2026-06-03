import DOMPurify from 'dompurify';

export const UNITY_DOC_VERSION = '6000.4';
const UNITY_CACHE_PREFIX = `unity-docs:${UNITY_DOC_VERSION}:`;
const UNITY_SCRIPTING_PREFIX = '03-Unity/02-ScriptingAPI/';

const TOPIC_DOCS = {
  '01-core-api.md': 'GameObject.html',
  '02-monobehaviour-lifecycle.md': 'MonoBehaviour.html',
  '03-inputsystem-api.md': 'Input.html',
  '04-physics-api.md': 'Physics.html',
  '05-scene-management-api.md': 'SceneManagement.SceneManager.html',
  '06-events-api.md': 'Events.UnityEvent.html',
  '07-audio-api.md': 'AudioSource.html',
  '08-ai-api.md': 'AI.NavMeshAgent.html',
  '09-animations-api.md': 'Animation.html',
  '10-rendering-api.md': 'Renderer.html',
  '11-ui-api.md': 'UIElements.VisualElement.html',
  '12-device-platforms-api.md': 'Device.Application.html',
  '01-editor-core.md': 'Editor.html',
  '02-editor-scene-management.md': 'SceneManagement.EditorSceneManager.html',
  '03-asset-database.md': 'AssetDatabase.html',
  '01-mathematics.md': 'Unity.Mathematics.math.html',
  '02-collections.md': 'Unity.Collections.NativeArray_1.html',
  '03-profiling.md': 'Profiling.Profiler.html',
  '01-visual-scripting.md': 'Unity.VisualScripting.GraphReference.html',
  '02-assemblies-packages.md': 'AssemblyDefinitionAsset.html',
  'classes.md': 'index.html',
  'structs.md': 'index.html',
  'enumerations.md': 'index.html'
};

const cleanTitle = (title = '') =>
  title
    .replace(/[^\w\s.&]/g, '')
    .replace(/\s+API$/i, '')
    .trim();

const toPascalSegment = (value) =>
  value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

export const isUnityScriptingPath = (path = '') => path.startsWith(UNITY_SCRIPTING_PREFIX);

export const getUnityDocTarget = (path, currentItem) => {
  const fileName = path.split('/').pop();
  const title = cleanTitle(currentItem?.title || fileName?.replace(/\.md$/, '') || 'Unity Scripting API');

  if (TOPIC_DOCS[fileName]) {
    return { title, docPath: TOPIC_DOCS[fileName], sourceKind: 'topic' };
  }

  if (/^(UnityEngine|UnityEditor|Unity)\./.test(title)) {
    return { title, docPath: 'index.html', sourceKind: 'namespace', query: title };
  }

  const folder = path.includes('/01-UnityEngine/')
    ? 'UnityEngine'
    : path.includes('/02-UnityEditor/')
      ? 'UnityEditor'
      : path.includes('/03-Unity/')
        ? 'Unity'
        : '';
  const slug = fileName?.replace(/\.md$/, '') || '';
  const docPath = folder && slug ? 'index.html' : 'index.html';

  return { title, docPath, sourceKind: 'generated', query: folder ? `${folder}.${toPascalSegment(slug)}` : title };
};

const getCacheKey = (docPath) => `${UNITY_CACHE_PREFIX}${docPath}`;

export const clearUnityDocCache = (docPath) => {
  if (!docPath) return;
  localStorage.removeItem(getCacheKey(docPath));
};

const readCachedUnityDoc = (docPath) => {
  try {
    const cached = localStorage.getItem(getCacheKey(docPath));
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const writeCachedUnityDoc = (docPath, payload) => {
  try {
    localStorage.setItem(getCacheKey(docPath), JSON.stringify(payload));
  } catch {
    // Cache is best-effort. Private browsing or full storage should not break reading.
  }
};

export const fetchUnityDoc = async (docPath, { force = false } = {}) => {
  if (!force) {
    const cached = readCachedUnityDoc(docPath);
    if (cached?.html) return { ...cached, fromCache: true };
  }

  const params = new URLSearchParams({ path: docPath, version: UNITY_DOC_VERSION });
  const response = await fetch(`/api/unity-docs?${params.toString()}`);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || 'Không tải được Unity Scripting API.');
  }

  writeCachedUnityDoc(docPath, payload);
  return { ...payload, fromCache: false };
};

const rewriteUnityLinks = (root) => {
  root.querySelectorAll('a[href]').forEach((anchor) => {
    const href = anchor.getAttribute('href') || '';

    if (/^https?:\/\//i.test(href)) {
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('rel', 'noreferrer');
      return;
    }

    if (href.endsWith('.html') && !href.startsWith('../Manual/')) {
      const docPath = href.split('/').pop();
      anchor.setAttribute('href', `#unity-doc:${encodeURIComponent(docPath)}`);
      return;
    }

    anchor.setAttribute('target', '_blank');
    anchor.setAttribute('rel', 'noreferrer');
  });
};

export const parseUnityDocHtml = ({ html, sourceUrl, fetchedAt, fromCache }, labels = {}) => {
  const safeLabels = {
    cacheHit: labels.cacheHit || 'Using local cache',
    freshFetch: labels.freshFetch || 'Updated from Unity',
    updatedAt: labels.updatedAt || 'Updated',
    openSource: labels.openSource || 'Open source page'
  };
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const title = doc.querySelector('h1.heading')?.textContent?.trim()
    || doc.querySelector('h1')?.textContent?.trim()
    || doc.title.replace(/^Unity\s*-\s*Scripting API:\s*/i, '').trim()
    || 'Unity Scripting API';
  const mainSection = [...doc.querySelectorAll('div.section')]
    .find((section) => section.querySelector('h1.heading'))
    || doc.querySelector('main')
    || doc.body;

  const working = mainSection.cloneNode(true);
  working.querySelectorAll([
    'script',
    'style',
    'iframe',
    'nav',
    'form',
    'input',
    'button',
    'textarea',
    '.feedback',
    '.nextprev',
    '.scrollToFeedback',
    '.suggest',
    '.suggest-wrap',
    '.suggest-form',
    '.suggest-success',
    '.suggest-failed'
  ].join(', ')).forEach((node) => {
    node.remove();
  });
  working.querySelectorAll('a').forEach((anchor) => {
    const text = anchor.textContent?.trim().toLowerCase();
    if (text === 'leave feedback' || text === 'suggest a change' || text === 'submit suggestion') {
      anchor.remove();
    }
  });
  rewriteUnityLinks(working);

  const cleanHtml = DOMPurify.sanitize(working.innerHTML, {
    ADD_ATTR: ['target']
  });
  const fetchedDate = fetchedAt ? new Date(fetchedAt).toLocaleString('vi-VN') : '';
  const sourceBadge = `
<div class="unity-doc-meta">
  <span>Unity Scripting API ${UNITY_DOC_VERSION}</span>
  <span>${fromCache ? safeLabels.cacheHit : safeLabels.freshFetch}</span>
  ${fetchedDate ? `<span>${safeLabels.updatedAt}: ${fetchedDate}</span>` : ''}
  <a href="${sourceUrl}" target="_blank" rel="noreferrer">${safeLabels.openSource}</a>
</div>`;

  return {
    title,
    html: `${sourceBadge}<div class="unity-doc-body">${cleanHtml}</div>`
  };
};
