import { ArrowLeft, ArrowRight, Blocks, BookOpen, Box, Hexagon, Map as MapIcon } from 'lucide-react';
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

const engineVersion = { unity: 'UNITY 6.4 LTS', unreal: 'UNREAL ENGINE 5.7' };

// Walk a track's nav tree into meaningful "section" stops: descend through
// header-of-headers, stop at the first node that directly holds lessons.
const collectSections = (items, acc) => {
  items.forEach((it) => {
    if (it.children?.length) {
      const hasGroups = it.children.some((k) => k.children?.length);
      const hasLessons = it.children.some((k) => k.path && !k.placeholder);
      if (hasGroups && !hasLessons) {
        collectSections(it.children, acc);
      } else {
        acc.push({ id: it.id, item: it, lessons: flattenArticles(it.children, []) });
      }
    } else if (it.path && !it.placeholder) {
      acc.push({ id: it.id, item: it, lessons: [{ id: it.id, path: it.path }], standalone: true });
    }
  });
};

const EnginePage = ({ trackId }) => {
  const { isArticleCompleted } = useProgress();
  const { language, navTitle } = useLanguage();
  const vi = language === 'vi';

  const track = learningTracks.find((item) => item.id === trackId) || learningTracks[1];
  const localized = localizeTrack(track, language);
  const Icon = trackIcons[track.icon];
  const categories = getTrackCategories(track.id);

  const sections = [];
  categories.forEach((category) => collectSections(category.items, sections));

  const allLessons = categories.flatMap((category) => flattenArticles(category.items, []));
  const completed = allLessons.filter((item) => isArticleCompleted(item.id)).length;
  const percentage = allLessons.length ? Math.round((completed / allLessons.length) * 100) : 0;

  return (
    <div className={`engine-page eng-${track.accent}`}>
      <header className="engine-hero">
        <div className="eng-orb" aria-hidden="true" />
        <div className="eng-orb two" aria-hidden="true" />
        <div className="eng-back">
          <Link to="map"><ArrowLeft size={15} /> {vi ? 'Bản đồ thế giới' : 'World map'}</Link>
        </div>
        <span className="eng-badge">{engineVersion[track.id] || (vi ? 'LỘ TRÌNH' : 'ROADMAP')}</span>
        <h1>
          <span className="eng-icon"><Icon size={28} /></span>
          {localized.title}
        </h1>
        <p className="eng-lead">{localized.description}</p>
        <div className="eng-stats">
          <div className="eng-progress">
            <div className="epc"><b>{percentage}%</b><span>{completed} / {allLessons.length} {vi ? 'bài học hoàn thành' : 'lessons completed'}</span></div>
            <div className="ptrack"><div className="pfill" style={{ width: `${percentage}%` }} /></div>
          </div>
          <div className="eng-cta">
            <Link to={track.startPath} className="btn-primary">
              {completed ? (vi ? 'Học tiếp' : 'Continue') : (vi ? 'Bắt đầu' : 'Start')} <ArrowRight size={17} />
            </Link>
            <Link to={`roadmap/${track.id}`} className="btn-secondary">
              <MapIcon size={16} /> {vi ? 'Xem lộ trình' : 'Roadmap view'}
            </Link>
          </div>
        </div>
      </header>

      <div className="eng-sec-title">
        <h2>{vi ? 'Các chặng trong thế giới này' : 'Stops in this world'}</h2>
        <span className="count">{sections.length} {vi ? 'CHẶNG' : 'STOPS'}</span>
      </div>

      <div className="eng-grid">
        {sections.map((section, index) => {
          const total = section.lessons.length;
          const done = section.lessons.filter((item) => isArticleCompleted(item.id)).length;
          const pct = total ? Math.round((done / total) * 100) : 0;
          const target = section.lessons[0]?.path || track.startPath;
          return (
            <Link key={section.id} to={target} className="eng-card">
              <div className="ec-top">
                <span className="ec-no">{String(index + 1).padStart(2, '0')}</span>
                <span className="ec-count">{done}/{total}</span>
              </div>
              <h3>{navTitle(section.item)}</h3>
              <div className="ec-bar"><div className="ec-fill" style={{ width: `${pct}%` }} /></div>
              <span className="ec-go">{vi ? 'Khám phá' : 'Explore'} <ArrowRight size={14} /></span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default EnginePage;
