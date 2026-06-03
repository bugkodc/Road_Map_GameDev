import navData from '../utils/navigation.json';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../App';

const RoadmapPage = () => {
  const { isArticleCompleted, toggleArticleCompleted, getProgressStats } = useProgress();
  const { t, navTitle } = useLanguage();
  const { completed, total, percentage } = getProgressStats();

  // Helper to flat-map all articles belonging to a specific category
  const getCategoryStats = (category) => {
    const list = [];
    const traverse = (item) => {
      if (item.path && !item.placeholder) {
        list.push(item);
      }
      if (item.children) {
        item.children.forEach(traverse);
      }
    };
    category.items.forEach(traverse);
    
    const count = list.length;
    const finished = list.filter(item => isArticleCompleted(item.id)).length;
    const pct = count > 0 ? Math.round((finished / count) * 100) : 0;
    
    return { count, finished, pct, list };
  };

  return (
    <div className="roadmap-page">
      <div className="roadmap-header">
        <span className="roadmap-header-icon" aria-hidden="true">RM</span>
        <h1>{t('roadmapTitle')}</h1>
        <p>{t('roadmapIntro')}</p>
        
        {total > 0 && (
          <div className="roadmap-overall-progress-card">
            <div className="progress-details">
              <span>{t('roadmapOverall')}:</span>
              <strong>{percentage}% ({t('lessonsCount', completed, total)})</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="roadmap-timeline">
        {navData.categories.map((category, index) => {
          const { count, finished, pct, list } = getCategoryStats(category);
          const isUnderConstruction = count === 0;

          return (
            <div key={category.id} className={`roadmap-step-node ${isUnderConstruction ? 'under-construction' : ''}`}>
              <div className="step-number-badge">0{index + 1}</div>
              
              <div className="step-card">
                <div className="step-card-header">
                  <h3 className="step-card-title">{navTitle(category)}</h3>
                  {!isUnderConstruction && (
                    <span className="step-progress-badge">
                      {t('roadmapBadge', finished, count, pct)}
                    </span>
                  )}
                  {isUnderConstruction && (
                    <span className="step-construction-badge">{t('constructionBadge')}</span>
                  )}
                </div>

                {!isUnderConstruction ? (
                  <div className="step-card-body">
                    <p className="step-description">
                      {t('stepDescription', navTitle(category))}
                    </p>
                    
                    <div className="roadmap-checklist-grid">
                      {list.map(item => {
                        const checked = isArticleCompleted(item.id);
                        return (
                          <div key={item.id} className={`roadmap-checkbox-item ${checked ? 'checked' : ''}`}>
                            <label className="checkbox-container">
                              <input 
                                type="checkbox" 
                                checked={checked} 
                                onChange={() => toggleArticleCompleted(item.id)}
                              />
                              <span className="checkmark"></span>
                            </label>
                            
                            <Link to={item.path} className="roadmap-item-link">
                              {navTitle(item)}
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="step-card-body">
                    <p className="construction-text">
                      {t('constructionText')}
                    </p>
                    
                    {category.items.length > 0 && (
                      <div className="construction-link-wrapper">
                        <Link to={category.items[0].path} className="btn-secondary">
                          {t('overviewSummary')}
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapPage;
