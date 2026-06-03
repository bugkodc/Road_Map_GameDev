import { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import navData from '../utils/navigation.json';
import { Link } from '../App';

// Custom Markdown preprocessor to handle GitHub-style alert boxes and image paths
const preprocessMarkdown = (markdown, currentPath, t) => {
  if (!markdown) return '';

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

const ContentReader = ({ path, placeholder }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isArticleCompleted, toggleArticleCompleted } = useProgress();
  const { t, navTitle } = useLanguage();
  const { prev, next, currentItem } = getPagination(path);

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

    // Fetch the markdown file from our public directory junction
    fetch(`./Doc/${path}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(t('loadError', path));
        }
        return res.text();
      })
      .then(text => {
        const preprocessed = preprocessMarkdown(text, path, t);
        const html = marked.parse(preprocessed);
        let cleanHtml = DOMPurify.sanitize(html);
        
        // Convert language-mermaid blocks to <div class="mermaid">
        cleanHtml = cleanHtml.replace(
          /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
          (match, code) => {
            // We keep the HTML entities (like &lt; and &gt;) intact so the browser's HTML parser
            // does not interpret them as tags. When the browser renders, it automatically
            // decodes them into text content, which Mermaid will read correctly.
            return `<div class="mermaid">${code}</div>`;
          }
        );

        setContent(cleanHtml);
        setLoading(false);
        
        // Scroll to top of reading pane
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [path, placeholder, t]);

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
      {/* Article HTML Content */}
      <div 
        className="markdown-body" 
        dangerouslySetInnerHTML={{ __html: content }} 
      />

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
