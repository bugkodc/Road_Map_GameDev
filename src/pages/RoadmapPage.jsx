import { ArrowRight, Blocks, BookOpen, Box, Check, ChevronRight, Hexagon } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../App';
import {
  flattenArticles,
  getTrackCategories,
  learningTracks,
  localizeTrack
} from '../utils/learningTracks';

const trackIcons = { blocks: Blocks, box: Box, hexagon: Hexagon, book: BookOpen };

const RoadmapPage = ({ trackId }) => {
  const { isArticleCompleted, toggleArticleCompleted } = useProgress();
  const { language, navTitle } = useLanguage();
  const track = learningTracks.find((item) => item.id === trackId) || learningTracks[0];
  const localized = localizeTrack(track, language);
  const categories = getTrackCategories(track.id);
  const allArticles = categories.flatMap((category) => flattenArticles(category.items, []));
  const completed = allArticles.filter((item) => isArticleCompleted(item.id)).length;
  const percentage = allArticles.length ? Math.round((completed / allArticles.length) * 100) : 0;
  const TrackIcon = trackIcons[track.icon];

  const getRoadmapGroups = () => categories.flatMap((category) => {
    const branchGroups = category.items.filter((item) => item.children?.length);
    const standalone = category.items.filter((item) => item.path);
    const result = [];
    if (standalone.length) result.push({ id: `${category.id}-start`, title: navTitle(category), children: standalone });
    branchGroups.forEach((group) => result.push({ ...group, children: flattenArticles(group.children, []) }));
    return result;
  });

  return (
    <div className={`roadmap-page roadmap-${track.accent}`}>
      <div className="roadmap-track-tabs">
        {learningTracks.map((item) => {
          const Icon = trackIcons[item.icon];
          return (
            <Link key={item.id} to={`roadmap/${item.id}`} className={item.id === track.id ? 'active' : ''}>
              <Icon size={17} /> {localizeTrack(item, language).shortTitle}
            </Link>
          );
        })}
      </div>

      <header className="roadmap-hero">
        <div className="roadmap-title-block">
          <span className="roadmap-icon"><TrackIcon size={25} /></span>
          <div>
            <span>{language === 'vi' ? 'LEARNING ROADMAP' : 'LEARNING ROADMAP'}</span>
            <h1>{localized.title}</h1>
            <p>{localized.description}</p>
          </div>
        </div>
        <div className="roadmap-progress-panel">
          <strong>{percentage}%</strong>
          <span>{completed}/{allArticles.length} {language === 'vi' ? 'bài hoàn thành' : 'completed'}</span>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${percentage}%` }} /></div>
        </div>
      </header>

      <div className="roadmap-sequence">
        {getRoadmapGroups().map((group, index) => {
          const lessons = group.children || [];
          const groupCompleted = lessons.filter((item) => isArticleCompleted(item.id)).length;
          return (
            <section key={group.id} className="roadmap-stage">
              <div className="stage-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="stage-content">
                <div className="stage-header">
                  <div>
                    <span>{language === 'vi' ? 'CHẶNG' : 'STAGE'} {index + 1}</span>
                    <h2>{navTitle(group)}</h2>
                  </div>
                  <span className="stage-count">{groupCompleted}/{lessons.length}</span>
                </div>
                <div className="stage-lessons">
                  {lessons.map((item) => {
                    const done = isArticleCompleted(item.id);
                    return (
                      <div key={item.id} className={`stage-lesson ${done ? 'completed' : ''}`}>
                        <button onClick={() => toggleArticleCompleted(item.id)} aria-label={navTitle(item)}>
                          {done && <Check size={14} />}
                        </button>
                        <Link to={item.path}><span>{navTitle(item)}</span><ChevronRight size={16} /></Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <div className="roadmap-next">
        <span>{language === 'vi' ? 'Bắt đầu lộ trình này' : 'Start this roadmap'}</span>
        <Link to={track.startPath} className="btn-primary">{language === 'vi' ? 'Mở bài đầu tiên' : 'Open first lesson'} <ArrowRight size={17} /></Link>
      </div>
    </div>
  );
};

export default RoadmapPage;
