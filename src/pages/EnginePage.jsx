import { useEffect, useRef } from 'react';
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

const EsTree = ({ w, h, vb, children }) => (
  <svg className="es-tree" width={w} height={h} viewBox={vb}>{children}</svg>
);

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

  // Mouse parallax on the hero scenery layers.
  const heroRef = useRef(null);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const layers = hero.querySelectorAll('.es-layer');
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach((ly) => {
        const dp = parseFloat(ly.getAttribute('data-depth')) || 0;
        ly.style.transform = `translate(${-dx * dp}px, ${-dy * dp * 0.5}px)`;
      });
    };
    const onLeave = () => layers.forEach((ly) => { ly.style.transform = 'translate(0,0)'; });
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => { hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave); };
  }, [trackId]);

  return (
    <div className={`engine-page eng-${track.accent}`}>
      <header className="engine-hero" ref={heroRef}>
        <div className="eng-scene" aria-hidden="true">
          <div className="es-layer es-sky" data-depth="5"><div className="es-sun" /></div>
          <div className="es-layer es-hills" data-depth="14">
            <svg viewBox="0 0 1200 300" preserveAspectRatio="none"><path d="M0 160 Q220 90 440 140 T880 120 T1200 150 V300 H0 Z" fill="var(--es-hill-far)" /></svg>
          </div>
          <div className="es-layer es-hills" data-depth="26">
            <svg viewBox="0 0 1200 300" preserveAspectRatio="none"><path d="M0 200 Q280 130 560 180 T1120 165 T1200 190 V300 H0 Z" fill="var(--es-hill-mid)" /></svg>
          </div>
          <div className="es-layer es-trees" data-depth="40">
            <EsTree w="38" h="68" vb="0 0 40 70"><rect x="17" y="40" width="5" height="26" rx="2.5" fill="var(--es-wood)" /><circle cx="20" cy="26" r="17" fill="var(--es-near)" /><circle cx="11" cy="33" r="11" fill="var(--es-ground2)" /></EsTree>
            <EsTree w="30" h="56" vb="0 0 32 58"><rect x="13" y="34" width="4" height="20" rx="2" fill="var(--es-wood)" /><circle cx="15" cy="22" r="14" fill="var(--es-near)" /></EsTree>
            <EsTree w="42" h="74" vb="0 0 44 76"><rect x="19" y="44" width="6" height="28" rx="3" fill="var(--es-wood)" /><circle cx="22" cy="28" r="19" fill="var(--es-near)" /><circle cx="33" cy="34" r="11" fill="var(--es-ground2)" /></EsTree>
            <EsTree w="28" h="52" vb="0 0 30 54"><rect x="12" y="32" width="4" height="18" rx="2" fill="var(--es-wood)" /><circle cx="14" cy="21" r="13" fill="var(--es-near)" /></EsTree>
            <EsTree w="36" h="64" vb="0 0 38 66"><rect x="16" y="38" width="5" height="24" rx="2.5" fill="var(--es-wood)" /><circle cx="18" cy="24" r="16" fill="var(--es-near)" /><circle cx="28" cy="30" r="9" fill="var(--es-ground2)" /></EsTree>
          </div>
          <div className="es-layer es-ground" data-depth="52" />
          <div className="es-scrim" />
        </div>

        <div className="eng-hero-content">
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
