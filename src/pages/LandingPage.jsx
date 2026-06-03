import SearchBar from '../components/SearchBar';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../App';
import heroImage from '../assets/hero.png';

const LandingPage = () => {
  const { getProgressStats } = useProgress();
  const { t } = useLanguage();
  const { completed, total, percentage } = getProgressStats();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content">
          <div className="hero-badge">{t('heroBadge')}</div>
          <h1>{t('heroTitle')}</h1>
          <p className="hero-subtitle">{t('heroSubtitle')}</p>
        </div>
        <div className="hero-image-wrapper">
          <img src={heroImage} alt="" className="hero-illustration" />
        </div>
      </section>

      {/* Instant Search Bar */}
      <section className="search-section">
        <SearchBar />
      </section>

      {/* Main Learning Paths Grid */}
      <section className="paths-section">
        <h2 className="section-title">{t('pathsTitle')}</h2>
        <div className="paths-grid">
          
          {/* Path 1: Refactoring */}
          <div className="path-card active-path">
            <div className="path-icon" aria-hidden="true">01</div>
            <div className="path-body">
              <h3>Refactoring</h3>
              <p>{t('pathRefactoringDesc')}</p>
              
              <div className="path-progress-box">
                <div className="progress-text-row">
                  <span>{t('learningProgress')}:</span>
                  <strong>{t('articlesCount', completed, total)}</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
              
              <Link to="01-Refactoring/00-refactoring-overview.md" className="btn-path">
                {t('startLearning')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Path 2: Design Patterns */}
          <div className="path-card placeholder-path">
            <div className="path-badge">{t('drafting')}</div>
            <div className="path-icon" aria-hidden="true">02</div>
            <div className="path-body">
              <h3>Design Patterns</h3>
              <p>{t('pathPatternsDesc')}</p>
              <Link to="02-Design-Patterns/00-design-patterns-overview.md" className="btn-path btn-disabled">
                {t('readOverview')}
              </Link>
            </div>
          </div>

          {/* Path 3: Unity Roadmap */}
          <div className="path-card placeholder-path">
            <div className="path-badge">{t('drafting')}</div>
            <div className="path-icon" aria-hidden="true">03</div>
            <div className="path-body">
              <h3>Unity Roadmap</h3>
              <p>{t('pathUnityDesc')}</p>
              <Link to="03-Unity/00-unity-overview.md" className="btn-path btn-disabled">
                {t('readOverview')}
              </Link>
            </div>
          </div>

          {/* Path 4: Unreal Roadmap */}
          <div className="path-card placeholder-path">
            <div className="path-badge">{t('comingSoon')}</div>
            <div className="path-icon" aria-hidden="true">04</div>
            <div className="path-body">
              <h3>Unreal Engine</h3>
              <p>{t('pathUnrealDesc')}</p>
              <Link to="04-Unreal/00-unreal-overview.md" className="btn-path btn-disabled">
                {t('viewOverview')}
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Project Vision section */}
      <section className="vision-section">
        <div className="vision-card">
          <span className="vision-icon" aria-hidden="true">!</span>
          <div className="vision-content">
            <h3>{t('visionTitle')}</h3>
            <p>{t('visionText')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
