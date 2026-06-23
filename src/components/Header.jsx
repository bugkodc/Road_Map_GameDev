import { Menu, Moon, Search, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../App';

const Header = ({ onMenuToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const { getProgressStats } = useProgress();
  const { language, toggleLanguage, t } = useLanguage();
  const { completed, total, percentage } = getProgressStats();

  const openSearch = () => {
    window.location.hash = 'home';
    window.setTimeout(() => document.querySelector('.search-input')?.focus(), 80);
  };

  return (
    <header className="site-header">
      <div className="header-left">
        <button className="icon-button menu-toggle-btn" onClick={onMenuToggle} aria-label={t('menuToggle')}>
          <Menu size={20} />
        </button>
        <Link to="home" className="header-logo">
          <span className="logo-mark" aria-hidden="true">GR</span>
          <span className="logo-text">GameDev Roadmap</span>
        </Link>
      </div>

      <div className="header-right">
        <button className="header-search-button" onClick={openSearch}>
          <Search size={17} />
          <span>{language === 'vi' ? 'Tìm tài liệu' : 'Search docs'}</span>
          <kbd>/</kbd>
        </button>

        {total > 0 && (
          <Link to="roadmap/foundations" className="global-progress" title={t('progressTitle', completed, total)}>
            <span className="progress-label">{percentage}%</span>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${percentage}%` }} /></div>
          </Link>
        )}

        <button className="language-toggle" onClick={toggleLanguage} aria-label={t('switchLanguage')}>
          <span className={language === 'vi' ? 'active' : ''}>VI</span>
          <span className={language === 'en' ? 'active' : ''}>EN</span>
        </button>

        <button className="icon-button theme-toggle" onClick={toggleTheme} title={t('themeTitle', theme)}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
