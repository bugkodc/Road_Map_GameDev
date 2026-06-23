import { useMemo, useState } from 'react';
import { Blocks, BookOpen, Box, ChevronDown, ChevronRight, Hexagon, Home, Map, Route } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../App';
import {
  countArticles,
  getTrackCategories,
  getTrackForPath,
  learningTracks,
  localizeTrack
} from '../utils/learningTracks';

const trackIcons = {
  blocks: Blocks,
  box: Box,
  hexagon: Hexagon,
  book: BookOpen
};

const Sidebar = ({ currentPath, isOpen, onClose }) => {
  const { isArticleCompleted } = useProgress();
  const { language, navTitle } = useLanguage();
  const activeTrack = currentPath.startsWith('roadmap/')
    ? learningTracks.find((track) => track.id === currentPath.split('/')[1]) || learningTracks[0]
    : getTrackForPath(currentPath);
  const [selectedTrackId, setSelectedTrackId] = useState(activeTrack.id);
  const [expandedGroups, setExpandedGroups] = useState({});
  const selectedTrack = currentPath === 'home'
    ? learningTracks.find((track) => track.id === selectedTrackId) || activeTrack
    : activeTrack;
  const categories = useMemo(() => getTrackCategories(selectedTrack.id), [selectedTrack.id]);

  const containsPath = (items, path) => items.some((item) =>
    item.path === path || (item.children && containsPath(item.children, path))
  );

  const toggleGroup = (id, defaultExpanded) => setExpandedGroups((current) => ({
    ...current,
    [id]: !(current[id] ?? defaultExpanded)
  }));

  const renderItems = (items, depth = 0) => (
    <ul className="sidebar-list" data-depth={depth}>
      {items.map((item) => {
        const isBranch = Boolean(item.children?.length);
        const isActiveBranch = isBranch && containsPath(item.children, currentPath);
        const defaultExpanded = isActiveBranch || depth === 0;
        const isExpanded = expandedGroups[item.id] ?? defaultExpanded;

        if (isBranch) {
          return (
            <li key={item.id} className="sidebar-tree-group">
              <button
                type="button"
                className="sidebar-group-title"
                onClick={() => toggleGroup(item.id, defaultExpanded)}
                aria-expanded={isExpanded}
              >
                <span>{navTitle(item)}</span>
                {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </button>
              {isExpanded && renderItems(item.children, depth + 1)}
            </li>
          );
        }

        const isActive = currentPath === item.path;
        const isCompleted = isArticleCompleted(item.id);
        return (
          <li key={item.id}>
            <Link
              to={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={onClose}
            >
              <span className="lesson-dot" aria-hidden="true" />
              <span className="link-text">{navTitle(item)}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar-nav ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="home" className="sidebar-brand" onClick={onClose}>
            <span className="brand-logo">GR</span>
            <div className="brand-info">
              <h3>GameDev Roadmap</h3>
              <span>{language === 'vi' ? 'Learning workspace' : 'Learning workspace'}</span>
            </div>
          </Link>
        </div>

        <nav className="sidebar-menu-wrapper">
          <div className="sidebar-primary-nav">
            <Link to="home" className={`sidebar-link root-link ${currentPath === 'home' ? 'active' : ''}`} onClick={onClose}>
              <Home size={17} /><span>{language === 'vi' ? 'Tổng quan' : 'Overview'}</span>
            </Link>
            <Link to="map" className={`sidebar-link root-link ${currentPath === 'map' ? 'active' : ''}`} onClick={onClose}>
              <Map size={17} /><span>{language === 'vi' ? 'Bản đồ' : 'World map'}</span>
            </Link>
            <Link to={`roadmap/${selectedTrack.id}`} className={`sidebar-link root-link ${currentPath.startsWith('roadmap/') ? 'active' : ''}`} onClick={onClose}>
              <Route size={17} /><span>{language === 'vi' ? 'Lộ trình' : 'Roadmap'}</span>
            </Link>
          </div>

          <div className="sidebar-section-label">{language === 'vi' ? 'LỘ TRÌNH HỌC' : 'LEARNING TRACKS'}</div>
          <div className="track-switcher">
            {learningTracks.map((track) => {
              const Icon = trackIcons[track.icon];
              const localized = localizeTrack(track, language);
              return (
                <button
                  key={track.id}
                  className={`track-switch ${selectedTrack.id === track.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTrackId(track.id);
                    if (currentPath !== 'home') window.location.hash = `roadmap/${track.id}`;
                  }}
                  title={localized.title}
                >
                  <Icon size={17} />
                  <span>{localized.shortTitle}</span>
                </button>
              );
            })}
          </div>

          <div className="sidebar-doc-header">
            <span><BookOpen size={15} /> {localizeTrack(selectedTrack, language).shortTitle}</span>
            <span>{categories.reduce((sum, category) => sum + countArticles(category.items), 0)}</span>
          </div>

          <div className="sidebar-document-tree">
            {categories.map((category) => (
              <section key={category.id} className="sidebar-category-group">
                {categories.length > 1 && <h4>{navTitle(category)}</h4>}
                {renderItems(category.items)}
              </section>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
