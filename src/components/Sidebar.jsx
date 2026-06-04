import { useState } from 'react';
import navData from '../utils/navigation.json';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../App';

const Sidebar = ({ currentPath, isOpen, onClose }) => {
  const { isArticleCompleted } = useProgress();
  const { t, navTitle } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState({
    refactoring: false,
    'design-patterns': false,
    unity: false,
    unreal: false
  });
  const [expandedGroups, setExpandedGroups] = useState({
    'what-is-refactoring': true,
    'code-smells': true,
    'refactoring-techniques': true,
    'bloaters': false,
    'oo-abusers': false,
    'change-preventers': false,
    'dispensables': false,
    'couplers': false,
    'composing-methods': false
  });

  const containsPath = (items, path) => items.some((item) => (
    item.path === path || (item.children && containsPath(item.children, path))
  ));

  const findAncestorGroupIds = (items, path, ancestors = []) => {
    for (const item of items) {
      const nextAncestors = item.isHeader || item.isGroup ? [...ancestors, item.id] : ancestors;

      if (item.path === path) {
        return ancestors;
      }

      if (item.children) {
        const found = findAncestorGroupIds(item.children, path, nextAncestors);
        if (found.length) return found;
      }
    }

    return [];
  };

  const countArticles = (items) => items.reduce((count, item) => {
    const ownCount = item.path && !item.placeholder ? 1 : 0;
    return count + ownCount + (item.children ? countArticles(item.children) : 0);
  }, 0);

  const activeCategory = navData.categories.find((category) => containsPath(category.items, currentPath));
  const activeAncestorGroupIds = activeCategory ? findAncestorGroupIds(activeCategory.items, currentPath) : [];

  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleGroup = (id) => {
    setExpandedGroups(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderNavList = (items) => {
    return (
      <ul className="sidebar-list">
        {items.map(item => {
          if (item.isHeader) {
            const isExpanded = expandedGroups[item.id] || activeAncestorGroupIds.includes(item.id);
            return (
              <li key={item.id} className={`sidebar-header-node ${isExpanded ? 'expanded' : ''}`}>
                <div className="sidebar-group-title" onClick={() => toggleGroup(item.id)}>
                  <span>{navTitle(item)}</span>
                  <span className="arrow">{isExpanded ? '▼' : '▶'}</span>
                </div>
                {isExpanded && item.children && renderNavList(item.children)}
              </li>
            );
          }

          if (item.isGroup) {
            const isExpanded = expandedGroups[item.id] || activeAncestorGroupIds.includes(item.id);
            return (
              <li key={item.id} className={`sidebar-group-node ${isExpanded ? 'expanded' : ''}`}>
                <div className="sidebar-subgroup-title" onClick={() => toggleGroup(item.id)}>
                  <span>{navTitle(item)}</span>
                  <span className="arrow">{isExpanded ? '▼' : '▶'}</span>
                </div>
                {isExpanded && item.children && renderNavList(item.children)}
              </li>
            );
          }

          // Regular Leaf Node
          const isCompleted = isArticleCompleted(item.id);
          const isActive = currentPath === item.path;

          return (
            <li key={item.id} className="sidebar-item-node">
              <Link 
                to={item.path} 
                className={`sidebar-link ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={onClose}
              >
                <span className="link-status-icon">{isCompleted ? '✓' : '•'}</span>
                <span className="link-text">{navTitle(item)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      <aside className={`sidebar-nav ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="home" className="sidebar-brand" onClick={onClose}>
            <span className="brand-logo" aria-hidden="true">RM</span>
            <div className="brand-info">
              <h3>GameDev Roadmap</h3>
              <span>{t('brandSubtitle')}</span>
            </div>
          </Link>
        </div>

        <nav className="sidebar-menu-wrapper">
          <div className="sidebar-menu-section">
            <Link 
              to="home" 
              className={`sidebar-link root-link ${currentPath === 'home' ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="link-status-icon">⌂</span>
              <span className="link-text font-bold">{t('navHome')}</span>
            </Link>
            
            <Link 
              to="roadmap" 
              className={`sidebar-link root-link ${currentPath === 'roadmap' ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="link-status-icon">◇</span>
              <span className="link-text font-bold">{t('navRoadmap')}</span>
            </Link>
          </div>

          {navData.categories.map(category => {
            const isActive = activeCategory?.id === category.id;
            const isExpanded = expandedCategories[category.id] || isActive;

            return (
            <div key={category.id} className={`sidebar-category-group ${isExpanded ? 'expanded' : ''} ${isActive ? 'active' : ''}`}>
              <button
                type="button"
                className="sidebar-category-title"
                onClick={() => toggleCategory(category.id)}
                aria-expanded={isExpanded}
              >
                <span>{navTitle(category)}</span>
                <span className="sidebar-category-meta">
                  <span className="sidebar-category-count">{countArticles(category.items)}</span>
                  <span className="arrow">{isExpanded ? '▼' : '▶'}</span>
                </span>
              </button>
              {isExpanded && (
                <div className="sidebar-category-content">
                  {renderNavList(category.items)}
                </div>
              )}
            </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
