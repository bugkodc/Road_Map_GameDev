import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import RoadmapPage from './pages/RoadmapPage';
import ReaderPage from './pages/ReaderPage';
import './App.css';

// Export a lightweight navigation Link component that handles state-based Hash Routing
export const Link = ({ to, children, className, onClick }) => {
  const handleClick = (e) => {
    // If it's a disabled button/link, prevent navigation
    if (className && className.includes('btn-disabled')) {
      e.preventDefault();
      return;
    }
    
    // Smooth transition between hash change
    window.location.hash = to;
    if (onClick) onClick();
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
    if (hash === '#roadmap') return 'roadmap';
    return hash.substring(1); // Remove the '#'
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#/' || hash === '#home') {
        setCurrentRoute('home');
      } else if (hash === '#roadmap') {
        setCurrentRoute('roadmap');
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
        <main className={`page-wrapper ${currentRoute === 'home' ? 'full-width' : ''}`}>
          {currentRoute === 'home' && <LandingPage />}
          {currentRoute === 'roadmap' && <RoadmapPage />}
          {currentRoute !== 'home' && currentRoute !== 'roadmap' && (
            <ReaderPage path={currentRoute} />
          )}
        </main>
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
