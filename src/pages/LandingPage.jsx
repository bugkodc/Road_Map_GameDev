import { ArrowRight, Map, Sprout } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../App';
import { getTrackArticles, learningTracks, localizeTrack } from '../utils/learningTracks';

// Cozy "growth stage" label derived from completion percentage.
const growthStage = (pct, language) => {
  const vi = language === 'vi';
  if (pct >= 80) return vi ? 'Thu hoạch' : 'Harvest';
  if (pct >= 50) return vi ? 'Đơm hoa' : 'Blooming';
  if (pct >= 20) return vi ? 'Nảy mầm' : 'Sprouting';
  if (pct > 0) return vi ? 'Mới gieo' : 'Seedling';
  return vi ? 'Hạt giống' : 'Not planted';
};

// Simple sprout that "grows" with progress (more leaves as the bar fills).
const CropSprout = ({ pct }) => {
  const leaves = pct >= 50 ? 2 : pct > 0 ? 1 : 0;
  const stemTop = pct >= 50 ? 18 : pct >= 20 ? 24 : 30;
  return (
    <svg width="40" height="46" viewBox="0 0 40 46" fill="none" aria-hidden="true">
      <path d={`M20 44V${stemTop}`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {leaves >= 1 && <path d="M20 30c-6.5 0-10.5-3.6-10.5-9.2 6.5 0 10.5 3.6 10.5 9.2Z" fill="currentColor" />}
      {leaves >= 2 && <path d="M20 26c5.6 0 9.4-3.2 9.4-8.4-5.6 0-9.4 3.2-9.4 8.4Z" fill="currentColor" opacity="0.72" />}
      <ellipse cx="20" cy="44" rx="11" ry="2.6" fill="currentColor" opacity="0.18" />
    </svg>
  );
};

const LandingPage = () => {
  const { isArticleCompleted } = useProgress();
  const { language } = useLanguage();

  const getStats = (trackId) => {
    const articles = getTrackArticles(trackId);
    const completed = articles.filter((item) => isArticleCompleted(item.id)).length;
    return {
      total: articles.length,
      completed,
      percentage: articles.length ? Math.round((completed / articles.length) * 100) : 0
    };
  };

  const totalLessons = learningTracks.reduce((sum, track) => sum + getStats(track.id).total, 0);
  const vi = language === 'vi';

  return (
    <div className="cozy-home landing-page">
      {/* ===== HERO ===== */}
      <section className="cozy-hero">
        <div className="cozy-sun" aria-hidden="true" />
        <div className="cozy-badge">
          <span className="pix">SEASON 01</span>
          {' · '}
          {vi ? 'Nền tảng kỹ thuật' : 'Engineering Foundations'}
        </div>
        <h1>
          {vi ? 'Gieo trồng kỹ năng ' : 'Grow your '}
          <span className="leaf">{vi ? 'làm game' : 'game-dev'}</span>
          {vi ? ', từng bước thong thả.' : ' skills, one cozy step at a time.'}
        </h1>
        <p className="cozy-lead">
          {vi
            ? 'Bắt rễ với Clean Code, Refactoring và Design Patterns — rồi thong dong theo lối đi Unity hoặc Unreal. Được tuyển chọn, có cấu trúc, miễn phí khám phá.'
            : 'Plant your roots with Clean Code, Refactoring and Design Patterns — then wander down a Unity or Unreal trail. Curated, structured, and free to roam.'}
        </p>
        <div className="cozy-chips">
          <div className="cozy-chip"><b>{totalLessons}</b><span>{vi ? 'bài học' : 'lessons'}</span></div>
          <div className="cozy-chip"><b>{learningTracks.length}</b><span>{vi ? 'lối đi' : 'trails'}</span></div>
          <div className="cozy-chip"><b>2</b><span>engines</span></div>
          <div className="cozy-chip"><b>VI·EN</b><span>{vi ? 'song ngữ' : 'bilingual'}</span></div>
        </div>
        <div className="cozy-cta">
          <Link to="01-Refactoring/00-refactoring-overview.md" className="btn-primary">
            {vi ? 'Bắt đầu hành trình' : 'Start your journey'} <ArrowRight size={18} />
          </Link>
          <Link to="roadmap/foundations" className="btn-secondary">
            <Map size={17} /> {vi ? 'Mở bản đồ' : 'Open the map'}
          </Link>
        </div>
      </section>

      {/* ===== SEARCH ===== */}
      <section className="cozy-search">
        <SearchBar />
      </section>

      {/* ===== TRAIL ===== */}
      <section className="cozy-trail">
        <div className="cozy-sec-title">
          <div className="eyebrow">{vi ? 'LỘ TRÌNH CỦA BẠN' : 'YOUR ROADMAP'}</div>
          <h2>{vi ? 'Theo dấu con đường' : 'Follow the trail'}</h2>
          <p>{vi ? 'Bốn chặng từ nền tảng đến engine bạn yêu thích.' : 'Four stops from foundations to your favourite engine.'}</p>
        </div>

        <div className="cozy-tracks">
          {learningTracks.map((track, index) => {
            const localized = localizeTrack(track, language);
            const stats = getStats(track.id);
            return (
              <article key={track.id} className={`cozy-card track-${track.accent}`}>
                <div className="cozy-node">LV<br />{String(index + 1).padStart(2, '0')}</div>
                <div className="cozy-crop"><CropSprout pct={stats.percentage} /></div>
                <h3>{localized.title}</h3>
                <p className="desc">{localized.description}</p>
                <div className="cozy-growth">
                  <div className="cozy-growth-top">
                    <span className="stage"><Sprout size={14} /> {growthStage(stats.percentage, language)}</span>
                    <span className="pct">{stats.percentage}%</span>
                  </div>
                  <div className="ptrack"><div className="pfill" style={{ width: `${stats.percentage}%` }} /></div>
                </div>
                <div className="cozy-go">
                  <Link to={track.startPath} className="start">
                    {stats.completed ? (vi ? 'Học tiếp' : 'Continue') : (vi ? 'Bắt đầu' : 'Start')} <ArrowRight size={16} />
                  </Link>
                  <span className="meta">{stats.total} {vi ? 'bài' : 'lessons'}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ===== SOURCES ===== */}
      <section className="cozy-sources">
        <span className="lab"><Sprout size={18} /> {vi ? 'Hạt giống tuyển chọn từ' : 'Curated seeds from'}</span>
        <span className="src">Refactoring.Guru</span><span className="sep">•</span>
        <span className="src">Unity Documentation</span><span className="sep">•</span>
        <span className="src">Epic Games Docs</span><span className="sep">•</span>
        <span className="src">Game Programming Patterns</span>
      </section>
    </div>
  );
};

export default LandingPage;
