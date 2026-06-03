import { useState } from 'react';
import navData from '../utils/navigation.json';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../App';

const Sidebar = ({ currentPath, isOpen, onClose }) => {
  const { isArticleCompleted } = useProgress();
  const { t, navTitle } = useLanguage();
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
            const isExpanded = expandedGroups[item.id];
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
            const isExpanded = expandedGroups[item.id];
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

          {navData.categories.map(category => (
            <div key={category.id} className="sidebar-category-group">
              <h4 className="sidebar-category-title">{navTitle(category)}</h4>
              {renderNavList(category.items)}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
