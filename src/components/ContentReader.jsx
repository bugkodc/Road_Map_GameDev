import { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import navData from '../utils/navigation.json';
import { Link } from '../App';
import {
  fetchUnityDoc,
  getUnityDocTarget,
  isUnityScriptingPath,
  parseUnityDocHtml,
  clearUnityDocCache
} from '../utils/unityDocs';
import {
  fetchUnrealDoc,
  parseUnrealDocHtml,
  clearUnrealDocCache
} from '../utils/unrealDocs';
import {
  fetchGppDoc,
  parseGppDocHtml,
  clearGppDocCache
} from '../utils/gppDocs';

// Custom Markdown preprocessor to handle GitHub-style alert boxes and image paths
const preprocessMarkdown = (markdown, currentPath, t) => {
  if (!markdown) return '';

  const resolveMarkdownPath = (href) => {
    if (!href || /^(https?:|mailto:|#|\/)/i.test(href) || !href.includes('.md')) {
      return href;
    }

    const [rawPath, hash = ''] = href.split('#');
    const currentDir = currentPath.split('/').slice(0, -1);
    const parts = rawPath.split('/');

    parts.forEach((part) => {
      if (!part || part === '.') return;
      if (part === '..') {
        currentDir.pop();
      } else {
        currentDir.push(part);
      }
    });

    return `#${currentDir.join('/')}${hash ? `#${hash}` : ''}`;
  };

  // 1. Rewrite relative image paths to absolute public paths:
  // e.g. `../../images/refactoring/clean-code.png` -> `./Doc/images/refactoring/clean-code.png`
  let processed = markdown.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    (match, alt, src) => {
      if (src.includes('images/')) {
        const imagePathIndex = src.indexOf('images/');
        const newSrc = `./Doc/${src.substring(imagePathIndex)}`;
        return `![${alt}](${newSrc})`;
      }
      return match;
    }
  );

  processed = processed.replace(
    /(?<!!)\[([^\]]+)\]\(([^)]+\.md(?:#[^)]+)?)\)/g,
    (match, label, href) => `[${label}](${resolveMarkdownPath(href)})`
  );

  // 2. Parse GitHub style alerts:
  // > [!NOTE]
  // > ... text ...
  // We parse blockquotes starting with alert markers.
  const lines = processed.split('\n');
  const resultLines = [];
  let inAlert = false;
  let alertType = '';
  let alertContent = [];

  const alertMap = {
    'NOTE': { class: 'alert-note', icon: 'i', title: t('alertNote') },
    'TIP': { class: 'alert-tip', icon: '!', title: t('alertTip') },
    'WARNING': { class: 'alert-warning', icon: '!', title: t('alertWarning') },
    'IMPORTANT': { class: 'alert-important', icon: '!', title: t('alertImportant') },
    'CAUTION': { class: 'alert-important', icon: '!', title: t('alertCaution') }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line starts a blockquote with alert marker
    const alertStartMatch = line.match(/^>\s+\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);
    
    if (alertStartMatch) {
      inAlert = true;
      alertType = alertStartMatch[1].toUpperCase();
      alertContent = [];
      continue;
    }

    if (inAlert) {
      if (line.startsWith('>')) {
        // Remove the leading '>' and add to alert content
        const content = line.substring(1).trim();
        alertContent.push(content);
      } else {
        // End of alert block because blockquote ended
        inAlert = false;
        const config = alertMap[alertType] || alertMap['NOTE'];
        const parsedContent = marked.parse(alertContent.join('\n'));
        const alertHtml = `
<div class="custom-alert ${config.class}">
  <div class="custom-alert-icon">${config.icon}</div>
  <div class="custom-alert-content">
    <h4>${config.title}</h4>
    <div>${parsedContent}</div>
  </div>
</div>`;
        resultLines.push(alertHtml);
        resultLines.push(line); // push the current non-blockquote line
      }
    } else {
      resultLines.push(line);
    }
  }

  // Handle case where file ends while still in an alert block
  if (inAlert) {
    const config = alertMap[alertType] || alertMap['NOTE'];
    const parsedContent = marked.parse(alertContent.join('\n'));
    const alertHtml = `
<div class="custom-alert ${config.class}">
  <div class="custom-alert-icon">${config.icon}</div>
  <div class="custom-alert-content">
    <h4>${config.title}</h4>
    <div>${parsedContent}</div>
  </div>
</div>`;
    resultLines.push(alertHtml);
  }

  return resultLines.join('\n');
};

// Helper to find the previous and next articles in nav tree for pagination
const getPagination = (currentPath) => {
  const flatList = [];
  
  const traverse = (item) => {
    if (item.path && !item.placeholder) {
      flatList.push(item);
    }
    if (item.children) {
      item.children.forEach(traverse);
    }
  };

  navData.categories.forEach(cat => {
    cat.items.forEach(traverse);
  });

  const currentIndex = flatList.findIndex(item => item.path === currentPath);
  return {
    prev: currentIndex > 0 ? flatList[currentIndex - 1] : null,
    next: currentIndex < flatList.length - 1 ? flatList[currentIndex + 1] : null,
    currentItem: currentIndex !== -1 ? flatList[currentIndex] : null
  };
};

// Unified, consistent indicator of which language the article body is actually shown in.
// When the requested language differs from what is shown (translation not ready yet) it becomes
// a clearer "translation in progress" notice instead of silently showing the other language.
const ContentLanguageBadge = ({ meta, t }) => {
  if (!meta) return null;
  const { shown, requested } = meta;
  const shownName = shown === 'vi' ? t('langNameVi') : t('langNameEn');

  if (shown === requested) {
    return (
      <div className="content-lang-badge" role="note">
        <span className="cl-dot" aria-hidden="true" />
        <span>{t('contentLangNotice', shownName)}</span>
      </div>
    );
  }

  return (
    <div className="content-lang-badge fallback" role="note">
      <span className="cl-icon" aria-hidden="true">🌐</span>
      <span>{t('contentLangFallback', shownName)}</span>
    </div>
  );
};

const ContentReader = ({ path, placeholder }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unityRefreshToken, setUnityRefreshToken] = useState(0);
  const [unrealRefreshToken, setUnrealRefreshToken] = useState(0);
  const [gppRefreshToken, setGppRefreshToken] = useState(0);
  const [pdfExists, setPdfExists] = useState(true);
  const [contentMeta, setContentMeta] = useState(null);

  const { isArticleCompleted, toggleArticleCompleted } = useProgress();
  const { language, t, navTitle } = useLanguage();
  const { prev, next, currentItem } = getPagination(path);
  const isDirectUnityDoc = path.startsWith('unity-doc:');
  const isUnityManualPath = (p) => p.startsWith('03-Unity/01-Manual/');
  const shouldUseLiveUnityDoc = isDirectUnityDoc || (language === 'en' && (isUnityScriptingPath(path) || isUnityManualPath(path)));
  
  const isDirectUnrealDoc = path.startsWith('unreal-doc:');
  const shouldUseLiveUnrealDoc = isDirectUnrealDoc;
  const isGppDoc = path.startsWith('gpp-doc:');
  const gppDocSlug = isGppDoc ? decodeURIComponent(path.replace('gpp-doc:', '')) : null;
  const isPdfDoc = path.endsWith('.pdf');
  const pdfName = isPdfDoc ? path.split('/').pop() : null;
  const unrealDocTarget = shouldUseLiveUnrealDoc
    ? (() => {
        const rawUrl = path.replace('unreal-doc:', '');
        const [slugEncoded] = rawUrl.split('?');
        const slug = decodeURIComponent(slugEncoded);
        return {
          title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          slug
        };
      })()
    : null;
  const unrealDocSlug = unrealDocTarget?.slug;
  const unityDocTarget = shouldUseLiveUnityDoc
    ? isDirectUnityDoc
      ? (() => {
          const rawUrl = path.replace('unity-doc:', '');
          const [docPathEncoded, queryStr = ''] = rawUrl.split('?');
          const docPath = decodeURIComponent(docPathEncoded);
          const isManualLink = queryStr.includes('isManual=true');
          return {
            title: docPath.replace(/\.html$/i, ''),
            docPath,
            sourceKind: 'direct',
            isManual: isManualLink
          };
        })()
      : (() => {
          if (isUnityManualPath(path)) {
            // Map local manual pages to live Unity manual html files.
            // E.g., '03-Unity/01-Manual/01-Get-Started/00-get-started-overview.md' -> 'GettingStarted.html'
            const fileName = path.split('/').pop();
            const manualMapping = {
              '00-get-started-overview.md': 'get-started.html',
              '00-editor-interface-overview.md': 'unity-editor.html',
              '00-packages-management-overview.md': 'Packages.html',
              '00-assets-media-overview.md': 'AssetWorkflow.html',
              '00-2d-game-dev-overview.md': 'Unity2D.html',
              '00-ai-overview.md': 'com.unity.ai.navigation.html',
              '00-xr-overview.md': 'XR.html',
              '00-multiplayer-overview.md': 'multiplayer.html',
              '00-platform-dev-overview.md': 'PlatformSpecific.html',
              '00-gameobjects-overview.md': 'GameObjects.html',
              '00-scenes-overview.md': 'CreatingScenes.html',
              '00-cameras-overview.md': 'CamerasOverview.html',
              '00-world-building-overview.md': 'CreatingEnvironments.html',
              '00-physics-overview.md': 'PhysicsSection.html',
              '01-introduction-to-input.md': 'Input.html'
            };
            const docPath = manualMapping[fileName] || 'index.html';
            const title = currentItem?.title || 'Unity Manual';
            return { title, docPath, sourceKind: 'manual', isManual: true };
          }
          return getUnityDocTarget(path, currentItem);
        })()
    : null;
  const unityDocPath = unityDocTarget?.docPath;
  const unityDocIsManual = Boolean(unityDocTarget?.isManual);

  // Initialize Mermaid once on mount
  useEffect(() => {
    if (window.mermaid) {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        flowchart: { useMaxWidth: true, htmlLabels: true, nodeSpacing: 26, rankSpacing: 32 },
        class: { useMaxWidth: true }
      });
    }
  }, []);

  // Run Mermaid render when content has changed and finished loading
  useEffect(() => {
    if (!loading && content && window.mermaid) {
      // Small timeout to allow DOM to commit changes before running mermaid
      const timer = setTimeout(() => {
        try {
          window.mermaid.run({
            querySelector: '.mermaid'
          });
        } catch (err) {
          console.error("Mermaid run error:", err);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [content, loading]);

  useEffect(() => {
    // If it's a placeholder page (e.g. Design Patterns, Unity which are not yet fully compiled)
    if (placeholder) {
      return;
    }

    queueMicrotask(() => {
      setLoading(true);
      setError(null);
    });

    if (isPdfDoc) {
      queueMicrotask(() => {
        setLoading(true);
        setError(null);
      });
      fetch(`./books/${pdfName}`, { method: 'HEAD' })
        .then((res) => {
          if (res.ok) {
            setPdfExists(true);
          } else {
            setPdfExists(false);
          }
          setLoading(false);
        })
        .catch(() => {
          setPdfExists(false);
          setLoading(false);
        });
      return;
    }

    if (isGppDoc) {
      queueMicrotask(() => {
        setLoading(true);
        setError(null);
      });
      fetchGppDoc(gppDocSlug, { force: gppRefreshToken > 0, language })
        .then((payload) => {
          const parsed = parseGppDocHtml(payload, {
            cacheHit: t('unityDocsCacheHit'),
            freshFetch: t('unityDocsFreshFetch'),
            updatedAt: t('unityDocsUpdatedAt'),
            openSource: t('unityDocsOpenSource')
          });
          setContent(parsed.html);
          setContentMeta({ shown: payload.lang || 'en', requested: language });
          setLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
      return;
    }

    if (shouldUseLiveUnrealDoc) {
      fetchUnrealDoc(unrealDocSlug, { language, force: unrealRefreshToken > 0 })
        .then((payload) => {
          const parsed = parseUnrealDocHtml(payload, {
            cacheHit: t('unrealDocsCacheHit'),
            freshFetch: t('unrealDocsFreshFetch'),
            updatedAt: t('unrealDocsUpdatedAt'),
            openSource: t('unrealDocsOpenSource')
          });
          setContent(parsed.html);
          setContentMeta({ shown: payload.lang || language, requested: language });
          setLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(err => {
          console.error(err);
          setError(t('unrealDocsLoadError', err.message));
          setLoading(false);
        });
      return;
    }

    if (shouldUseLiveUnityDoc) {
      fetchUnityDoc(unityDocPath, { force: unityRefreshToken > 0, isManual: unityDocIsManual })
        .then((payload) => {
          const parsed = parseUnityDocHtml(payload, {
            cacheHit: t('unityDocsCacheHit'),
            freshFetch: t('unityDocsFreshFetch'),
            updatedAt: t('unityDocsUpdatedAt'),
            openSource: t('unityDocsOpenSource')
          }, { isManual: unityDocIsManual });
          setContent(parsed.html);
          setContentMeta({ shown: 'en', requested: language });
          setLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(err => {
          console.error(err);
          setError(t('unityDocsLoadError', err.message));
          setLoading(false);
        });
      return;
    }

    // Markdown content. Base files are Vietnamese at ./Doc/<path>; English translations, when
    // available, live at ./Doc/en/<path>. Falls back to the base copy with a flag so the reader
    // can show a consistent "translation in progress" badge.
    (async () => {
      try {
        let shown = 'vi';
        let res;
        if (language === 'en') {
          res = await fetch(`./Doc/en/${path}`);
          if (res.ok) {
            shown = 'en';
          } else {
            res = await fetch(`./Doc/${path}`);
            shown = 'vi';
          }
        } else {
          res = await fetch(`./Doc/${path}`);
          shown = 'vi';
        }

        if (!res.ok) {
          throw new Error(t('loadError', path));
        }

        const text = await res.text();
        if (/^\s*<!doctype html/i.test(text) || text.includes('/@vite/client')) {
          throw new Error(t('loadError', path));
        }

        const preprocessed = preprocessMarkdown(text, path, t);
        const html = marked.parse(preprocessed);
        let cleanHtml = DOMPurify.sanitize(html);

        // Convert language-mermaid blocks to <div class="mermaid">.
        // We keep the HTML entities (like &lt; and &gt;) intact so the browser's HTML parser
        // does not interpret them as tags. When the browser renders, it automatically
        // decodes them into text content, which Mermaid will read correctly.
        cleanHtml = cleanHtml.replace(
          /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
          (match, code) => `<div class="mermaid">${code}</div>`
        );

        setContent(cleanHtml);
        setContentMeta({ shown, requested: language });
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    })();
  }, [path, placeholder, t, language, shouldUseLiveUnityDoc, unityDocPath, unityDocIsManual, unityRefreshToken, shouldUseLiveUnrealDoc, unrealDocSlug, unrealRefreshToken, isPdfDoc, pdfName, isGppDoc, gppDocSlug, gppRefreshToken]);

  if (placeholder) {
    return (
      <div className="placeholder-container">
        <div className="placeholder-badge">{t('placeholderBadge')}</div>
        <h2>{currentItem ? navTitle(currentItem) : t('updating')}</h2>
        <div className="placeholder-illustration" aria-hidden="true">...</div>
        <p className="placeholder-text">{placeholder}</p>
        <blockquote>
          {t('placeholderNote')}
        </blockquote>
        <div className="placeholder-footer">
          <Link to="home" className="btn-secondary">← {t('backHome')}</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="reader-loader">
        <div className="skeleton-title"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-image"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reader-error">
        <div className="error-icon" aria-hidden="true">!</div>
        <h3>{t('loadErrorTitle')}</h3>
        <p>{error}</p>
        <Link to="home" className="btn-primary">{t('backHome')}</Link>
      </div>
    );
  }

  const isCompleted = currentItem ? isArticleCompleted(currentItem.id) : false;

  return (
    <article className="reading-pane">
      {!isPdfDoc && <ContentLanguageBadge meta={contentMeta} t={t} />}

      {unityDocTarget && (
        <div className="unity-doc-toolbar">
          <div>
            <span className="unity-doc-kicker">{t('unityDocsLive')}</span>
            <strong>{unityDocTarget.title}</strong>
          </div>
          <button
            className="btn-secondary unity-doc-refresh"
            onClick={() => {
              clearUnityDocCache(unityDocTarget.docPath, unityDocIsManual);
              setUnityRefreshToken((value) => value + 1);
            }}
          >
            {t('unityDocsRefresh')}
          </button>
        </div>
      )}

      {unrealDocTarget && (
        <div className="unity-doc-toolbar unreal-doc-toolbar">
          <div>
            <span className="unity-doc-kicker unreal-doc-kicker">{t('unrealDocsLive')}</span>
            <strong>{unrealDocTarget.title}</strong>
          </div>
          <button
            className="btn-secondary unity-doc-refresh unreal-doc-refresh"
            onClick={() => {
              clearUnrealDocCache(unrealDocTarget.slug, language);
              setUnrealRefreshToken((value) => value + 1);
            }}
          >
            {t('unrealDocsRefresh')}
          </button>
        </div>
      )}

      {isGppDoc && (
        <div className="unity-doc-toolbar" style={{ borderLeftColor: 'var(--resources)' }}>
          <div>
            <span className="unity-doc-kicker" style={{ color: 'var(--resources)' }}>Game Programming Patterns</span>
            <strong>{currentItem ? navTitle(currentItem) : 'GPP'}</strong>
          </div>
          <button
            className="btn-secondary unity-doc-refresh"
            onClick={() => {
              clearGppDocCache(gppDocSlug, language);
              setGppRefreshToken((value) => value + 1);
            }}
          >
            {t('unityDocsRefresh')}
          </button>
        </div>
      )}
 
       {/* Article HTML Content or PDF Viewer */}
       {isPdfDoc ? (
         !pdfExists ? (
           <div className="pdf-not-found-card">
             <span className="pdf-not-found-icon">📂</span>
             <h3>{t('pdfNotFoundTitle')}</h3>
             <p>{t('pdfNotFoundText', currentItem?.title || pdfName, `public/books/${pdfName}`)}</p>
             <div className="pdf-path-box">{`public/books/${pdfName}`}</div>
           </div>
         ) : (
           <div className="pdf-viewer-container">
             <div className="pdf-viewer-header">
               <h3>{currentItem?.title || pdfName}</h3>
               <a href={`./books/${pdfName}`} target="_blank" rel="noreferrer" className="btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
                 {t('unityDocsOpenSource') || 'Open PDF'}
               </a>
             </div>
             <iframe
               src={`./books/${pdfName}`}
               className="pdf-viewer-iframe"
               title={currentItem?.title || pdfName}
             />
           </div>
         )
       ) : (
         <div 
           className="markdown-body" 
           dangerouslySetInnerHTML={{ __html: content }} 
         />
       )}

      {/* Progress Checker box at end of reading */}
      {currentItem && (
        <div className={`article-completion-box ${isCompleted ? 'completed' : ''}`}>
          <div className="completion-info">
            <h4>{isCompleted ? t('completedTitle') : t('incompleteTitle')}</h4>
            <p>{t('completionText')}</p>
          </div>
          <button 
            className={`btn-complete-toggle ${isCompleted ? 'active' : ''}`}
            onClick={() => toggleArticleCompleted(currentItem.id)}
          >
            {isCompleted ? `✓ ${t('completedButton')}` : t('markCompletedButton')}
          </button>
        </div>
      )}

      {/* Pagination Footer */}
      <footer className="article-pagination-footer">
        {prev ? (
          <Link to={prev.path} className="page-link prev">
            <span className="arrow">←</span>
            <div className="link-details">
              <span className="link-nav-tag">{t('previousArticle')}</span>
              <span className="link-title">{navTitle(prev)}</span>
            </div>
          </Link>
        ) : (
          <div className="page-link-spacer"></div>
        )}

        {next ? (
          <Link to={next.path} className="page-link next">
            <div className="link-details">
              <span className="link-nav-tag">{t('nextArticle')}</span>
              <span className="link-title">{navTitle(next)}</span>
            </div>
            <span className="arrow">→</span>
          </Link>
        ) : (
          <div className="page-link-spacer"></div>
        )}
      </footer>
    </article>
  );
};

export default ContentReader;
