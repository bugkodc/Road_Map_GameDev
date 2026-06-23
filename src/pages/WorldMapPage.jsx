import { useEffect, useRef } from 'react';
import { ArrowRight, Home } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../App';
import { getTrackArticles, learningTracks, localizeTrack } from '../utils/learningTracks';
import '../worldmap.css';

// Fixed stops along the winding trail (matches the trail-svg path below).
const STOPS = [
  { left: 8, top: 88 },
  { left: 38, top: 64 },
  { left: 62, top: 42 },
  { left: 90, top: 19 }
];

const lerp = (a, b, t) => a + (b - a) * t;

const TreeSvg = ({ w, h, vb, children }) => (
  <svg className="tree" width={w} height={h} viewBox={vb}>{children}</svg>
);

const WorldMapPage = () => {
  const { isArticleCompleted, getProgressStats } = useProgress();
  const { language } = useLanguage();
  const stageRef = useRef(null);
  const vi = language === 'vi';
  const overall = getProgressStats();

  const trackStats = learningTracks.map((track) => {
    const articles = getTrackArticles(track.id);
    const completed = articles.filter((item) => isArticleCompleted(item.id)).length;
    const pct = articles.length ? Math.round((completed / articles.length) * 100) : 0;
    const target = track.id === 'unity' || track.id === 'unreal' ? `engine/${track.id}` : `roadmap/${track.id}`;
    return { track, pct, total: articles.length, target };
  });

  // Avatar sits between the last finished stop and the current one.
  let current = trackStats.findIndex((s) => s.pct < 100);
  if (current === -1) current = STOPS.length - 1;
  const a = current <= 0 ? STOPS[0] : STOPS[current - 1];
  const b = current <= 0 ? STOPS[1] : STOPS[current];
  const avatar = { left: lerp(a.left, b.left, 0.45), top: lerp(a.top, b.top, 0.45) };

  // Lightweight mouse parallax on the scene layers.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const layers = stage.querySelectorAll('.layer');
    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach((ly) => {
        const dp = parseFloat(ly.getAttribute('data-depth')) || 0;
        ly.style.transform = `translate(${-dx * dp}px, ${-dy * dp * 0.5}px)`;
      });
    };
    const onLeave = () => layers.forEach((ly) => { ly.style.transform = 'translate(0,0)'; });
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    return () => { stage.removeEventListener('pointermove', onMove); stage.removeEventListener('pointerleave', onLeave); };
  }, []);

  return (
    <div className="worldmap" ref={stageRef}>
      {/* parallax layers */}
      <div className="layer sky" data-depth="6">
        <div className="stars" />
        <div className="sun" />
        <div className="cloud c1" /><div className="cloud c2" /><div className="cloud c3" />
      </div>
      <div className="layer hills" data-depth="16">
        <svg viewBox="0 0 1200 360" preserveAspectRatio="none"><path d="M0 200 Q200 120 420 180 T840 150 T1200 180 V360 H0 Z" fill="var(--hill-far)" /></svg>
      </div>
      <div className="layer hills" data-depth="30">
        <svg viewBox="0 0 1200 360" preserveAspectRatio="none"><path d="M0 250 Q260 170 520 230 T1040 210 T1200 240 V360 H0 Z" fill="var(--hill-mid)" /></svg>
      </div>
      <div className="layer trees" data-depth="46">
        <TreeSvg w="44" h="78" vb="0 0 46 80"><rect x="20" y="46" width="6" height="30" rx="3" fill="var(--wood-dark)" /><circle cx="23" cy="30" r="20" fill="var(--hill-near)" /><circle cx="12" cy="38" r="13" fill="var(--ground-2)" /><circle cx="34" cy="38" r="13" fill="var(--ground)" /></TreeSvg>
        <TreeSvg w="34" h="64" vb="0 0 36 66"><rect x="15" y="40" width="5" height="24" rx="2.5" fill="var(--wood-dark)" /><circle cx="18" cy="26" r="16" fill="var(--hill-near)" /><circle cx="28" cy="32" r="10" fill="var(--ground)" /></TreeSvg>
        <TreeSvg w="48" h="84" vb="0 0 50 86"><rect x="22" y="50" width="6" height="32" rx="3" fill="var(--wood-dark)" /><circle cx="25" cy="32" r="22" fill="var(--hill-near)" /><circle cx="13" cy="40" r="13" fill="var(--ground-2)" /><circle cx="37" cy="40" r="13" fill="var(--ground)" /></TreeSvg>
        <TreeSvg w="32" h="60" vb="0 0 34 62"><rect x="14" y="38" width="5" height="22" rx="2.5" fill="var(--wood-dark)" /><circle cx="17" cy="24" r="15" fill="var(--hill-near)" /></TreeSvg>
        <TreeSvg w="42" h="76" vb="0 0 44 78"><rect x="19" y="46" width="6" height="28" rx="3" fill="var(--wood-dark)" /><circle cx="22" cy="30" r="19" fill="var(--hill-near)" /><circle cx="33" cy="36" r="11" fill="var(--ground)" /></TreeSvg>
      </div>
      <div className="layer ground" data-depth="60" />

      {/* HUD */}
      <div className="hud">
        <div className="h-lab">{vi ? 'TIẾN ĐỘ CỦA BẠN' : 'YOUR PROGRESS'}</div>
        <div className="h-big">{overall.percentage}% {vi ? 'khám phá' : 'explored'}</div>
        <div className="h-track"><div className="h-fill" style={{ width: `${overall.percentage}%` }} /></div>
        <div className="h-sub">{overall.completed} / {overall.total} {vi ? 'bài · cố lên!' : 'lessons · keep going!'}</div>
      </div>

      {/* trail + nodes */}
      <div className="scene-content">
        <svg className="trail-svg" viewBox="0 0 1000 640" preserveAspectRatio="none">
          <path className="trail-base" d="M80 560 C 230 540 300 440 430 410 S 640 350 700 270 S 870 150 960 120" />
        </svg>

        {trackStats.map(({ track, pct, target }, i) => {
          const localized = localizeTrack(track, language);
          const stop = STOPS[i];
          const done = pct >= 100;
          return (
            <div key={track.id} className={`node t-${track.accent} ${done ? 'done' : ''}`} style={{ left: `${stop.left}%`, top: `${stop.top}%` }}>
              <div className="node-flag" />
              <div className="node-dot"><span className="lv">LV<br />{String(i + 1).padStart(2, '0')}</span></div>
              <div className="node-name">{localized.shortTitle}</div>
              <div className="tip">
                <div className="t-top"><span className="t-tag">{(track.id === 'unity' || track.id === 'unreal') ? 'ENGINE' : 'FOUNDATION'}</span><span className="t-pct">{pct}%</span></div>
                <h4>{localized.title}</h4>
                <p>{localized.description}</p>
                <div className="t-track"><div className="t-fill" style={{ width: `${pct}%` }} /></div>
                <Link to={target} className="t-btn">{vi ? 'Vào lối đi' : 'Enter trail'} <ArrowRight size={15} /></Link>
              </div>
            </div>
          );
        })}

        <div className="avatar" style={{ left: `${avatar.left}%`, top: `${avatar.top}%` }}>
          <div className="you">{vi ? 'BẠN' : 'YOU'}</div>
          <div className="pin" />
        </div>
      </div>

      <Link to="home" className="btn-secondary" style={{ position: 'absolute', top: '22px', right: '22px', zIndex: 40 }}>
        <Home size={16} /> {vi ? 'Trang chủ' : 'Home'}
      </Link>
    </div>
  );
};

export default WorldMapPage;
