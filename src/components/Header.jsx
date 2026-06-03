import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../App'; // We will build a lightweight router in App.jsx

const Header = ({ onMenuToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const { getProgressStats } = useProgress();
  const { language, toggleLanguage, t } = useLanguage();
  const { completed, total, percentage } = getProgressStats();

  return (
    <header className="site-header">
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={onMenuToggle} aria-label={t('menuToggle')}>
          <span aria-hidden="true">☰</span>
        </button>
        <Link to="home" className="header-logo">
          <span className="logo-mark" aria-hidden="true">RM</span>
          <span className="logo-text">GameDev Roadmap</span>
        </Link>
      </div>

      <div className="header-right">
        {total > 0 && (
          <div className="global-progress" title={t('progressTitle', completed, total)}>
            <span className="progress-label">{t('progress')}: {percentage}%</span>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          className="language-toggle"
          onClick={toggleLanguage}
          title={t('switchLanguage')}
          aria-label={t('switchLanguage')}
        >
          <span className={language === 'vi' ? 'active' : ''}>VI</span>
          <span className={language === 'en' ? 'active' : ''}>EN</span>
        </button>

        <button 
          className="theme-toggle" 
          onClick={toggleTheme} 
          title={t('themeTitle', theme)}
        >
          <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
