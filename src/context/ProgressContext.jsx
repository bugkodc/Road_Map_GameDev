/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import navData from '../utils/navigation.json';

const ProgressContext = createContext();

// Helper function to extract all articles with a valid path (excluding placeholders)
const extractAllArticles = (categories) => {
  const articles = [];
  
  const processItem = (item) => {
    if (item.path && !item.placeholder) {
      articles.push({
        id: item.id,
        title: item.title,
        path: item.path
      });
    }
    if (item.children) {
      item.children.forEach(processItem);
    }
  };

  categories.forEach(category => {
    category.items.forEach(processItem);
  });

  return articles;
};

export const ProgressProvider = ({ children }) => {
  const [completedArticles, setCompletedArticles] = useState(() => {
    const saved = localStorage.getItem('gamedev_progress');
    return saved ? JSON.parse(saved) : [];
  });

  const allArticles = useMemo(() => extractAllArticles(navData.categories), []);

  useEffect(() => {
    localStorage.setItem('gamedev_progress', JSON.stringify(completedArticles));
  }, [completedArticles]);

  const toggleArticleCompleted = (id) => {
    setCompletedArticles(prev => {
      if (prev.includes(id)) {
        return prev.filter(articleId => articleId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isArticleCompleted = (id) => {
    return completedArticles.includes(id);
  };

  const getProgressStats = () => {
    const total = allArticles.length;
    const completed = completedArticles.filter(id => 
      allArticles.some(article => article.id === id)
    ).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      total,
      completed,
      percentage
    };
  };

  return (
    <ProgressContext.Provider value={{
      completedArticles,
      allArticles,
      toggleArticleCompleted,
      isArticleCompleted,
      getProgressStats
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
