import { ArrowRight, Blocks, BookOpen, Box, CheckCircle2, Hexagon, Map, Sparkles } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../App';
import { getTrackArticles, learningTracks, localizeTrack } from '../utils/learningTracks';

const trackIcons = { blocks: Blocks, box: Box, hexagon: Hexagon, book: BookOpen };

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

  return (
    <div className="landing-page workspace-home">
      <section className="workspace-intro">
        <div>
          <div className="eyebrow"><Sparkles size={15} /> {language === 'vi' ? 'LỘ TRÌNH GAME DEV MỞ' : 'OPEN GAME DEV ROADMAP'}</div>
          <h1>{language === 'vi' ? 'Học game development theo một cấu trúc rõ ràng.' : 'Learn game development through a clear structure.'}</h1>
          <p>
            {language === 'vi'
              ? 'Bắt đầu từ nền tảng kỹ thuật, sau đó đi sâu vào roadmap riêng của Unity hoặc Unreal Engine.'
              : 'Build your engineering foundations, then follow a dedicated Unity or Unreal Engine roadmap.'}
          </p>
        </div>
        <div className="workspace-summary">
          <div><strong>{totalLessons}</strong><span>{language === 'vi' ? 'tài liệu' : 'documents'}</span></div>
          <div><strong>{learningTracks.length}</strong><span>{language === 'vi' ? 'lộ trình' : 'tracks'}</span></div>
          <div><strong>2</strong><span>engines</span></div>
        </div>
      </section>

      <section className="workspace-search">
        <SearchBar />
      </section>

      <section className="track-section">
        <div className="section-heading">
          <div>
            <span>{language === 'vi' ? 'CHỌN HƯỚNG HỌC' : 'CHOOSE A PATH'}</span>
            <h2>{language === 'vi' ? 'Roadmap theo mục tiêu' : 'Roadmaps by goal'}</h2>
          </div>
          <Link to="roadmap/foundations" className="text-link">
            <Map size={17} /> {language === 'vi' ? 'Xem roadmap' : 'View roadmap'}
          </Link>
        </div>

        <div className="track-grid">
          {learningTracks.map((track) => {
            const Icon = trackIcons[track.icon];
            const localized = localizeTrack(track, language);
            const stats = getStats(track.id);
            return (
              <article key={track.id} className={`track-card track-${track.accent}`}>
                <div className="track-card-top">
                  <span className="track-icon"><Icon size={23} /></span>
                  <span className="track-count">{stats.total} {language === 'vi' ? 'bài' : 'docs'}</span>
                </div>
                <div className="track-card-content">
                  <h3>{localized.title}</h3>
                  <p>{localized.description}</p>
                </div>
                <div className="track-progress-row">
                  <div className="progress-track"><div className="progress-fill" style={{ width: `${stats.percentage}%` }} /></div>
                  <span>{stats.percentage}%</span>
                </div>
                <div className="track-card-actions">
                  <Link to={track.startPath} className="btn-primary">
                    <BookOpen size={17} /> {stats.completed ? (language === 'vi' ? 'Học tiếp' : 'Continue') : (language === 'vi' ? 'Bắt đầu' : 'Start')}
                  </Link>
                  <Link to={`roadmap/${track.id}`} className="icon-button track-roadmap-link" title="Roadmap">
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="source-strip">
        <div><CheckCircle2 size={19} /><span>{language === 'vi' ? 'Nguồn nội dung được tuyển chọn' : 'Curated source material'}</span></div>
        <span>Refactoring.Guru</span>
        <span>Unity Documentation</span>
        <span>Epic Games Documentation</span>
      </section>
    </div>
  );
};

export default LandingPage;
