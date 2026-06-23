import { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './App.css';
import './workspace.css';
import './cozy.css';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const ReaderPage = lazy(() => import('./pages/ReaderPage'));
const WorldMapPage = lazy(() => import('./pages/WorldMapPage'));
const EnginePage = lazy(() => import('./pages/EnginePage'));

// Export a lightweight navigation Link component that handles state-based Hash Routing
export const Link = ({ to, children, className, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();

    if (className && className.includes('btn-disabled')) {
      return;
    }

    if (onClick) onClick();

    const nextHash = `#${to}`;
    if (window.location.hash === nextHash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.location.hash = to;
  };

  return (
    <a href={`#${to}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

const MainApp = () => {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    if (!hash || hash === '#/' || hash === '#home') return 'home';
    if (hash === '#roadmap') return 'roadmap/foundations';
    return hash.substring(1); // Remove the '#'
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#/' || hash === '#home') {
        setCurrentRoute('home');
      } else if (hash === '#roadmap') {
        setCurrentRoute('roadmap/foundations');
      } else {
        setCurrentRoute(hash.substring(1));
      }
      
      // Auto scroll to top on page change
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentRoute={currentRoute} 
        currentPath={currentRoute} 
        isOpen={sidebarOpen} 
        onClose={closeSidebar} 
      />

      <div className="main-content">
        {/* Header Bar */}
        <Header onMenuToggle={toggleSidebar} />

        {/* Dynamic Page Router */}
        {(() => {
          const isMap = currentRoute === 'map';
          const isEngine = currentRoute.startsWith('engine/');
          const isRoadmap = currentRoute.startsWith('roadmap/');
          const isReader = !isMap && !isEngine && !isRoadmap && currentRoute !== 'home';
          const wrapperClass = isMap
            ? 'map-wrapper'
            : (currentRoute === 'home' || isRoadmap || isEngine ? 'full-width' : '');
          return (
            <main className={`page-wrapper ${wrapperClass}`}>
              <Suspense fallback={<div className="route-loader" aria-label="Loading"><span /></div>}>
                {currentRoute === 'home' && <LandingPage />}
                {isMap && <WorldMapPage />}
                {isEngine && <EnginePage trackId={currentRoute.split('/')[1] || 'unity'} />}
                {isRoadmap && <RoadmapPage trackId={currentRoute.split('/')[1] || 'foundations'} />}
                {isReader && <ReaderPage path={currentRoute} />}
              </Suspense>
            </main>
          );
        })()}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProgressProvider>
          <MainApp />
        </ProgressProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
