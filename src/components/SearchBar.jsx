import { useState, useEffect, useMemo, useRef } from 'react';
import { BookOpen, Search, X } from 'lucide-react';
import navData from '../utils/navigation.json';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../App';

// Extract all searchable articles
const getSearchableItems = (categories) => {
  const list = [];
  
  const processItem = (item, category) => {
    if (item.path) {
      list.push({
        id: item.id,
        title: item.title,
        path: item.path,
        category: category.title,
        categoryId: category.id,
        isPlaceholder: !!item.placeholder
      });
    }
    if (item.children) {
      item.children.forEach(child => processItem(child, category));
    }
  };

  categories.forEach(category => {
    category.items.forEach(item => processItem(item, category));
  });

  return list;
};

const SearchBar = ({ onResultClick }) => {
  const { t, navTitle } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const allItems = useMemo(() => getSearchableItems(navData.categories), []);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Handle click outside to close results dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    
    if (val.trim() === '') {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filtered = allItems.filter(item => 
      navTitle(item).toLowerCase().includes(val.toLowerCase()) ||
      navTitle(item.categoryId).toLowerCase().includes(val.toLowerCase())
    ).slice(0, 8); // Limit to 8 search results for clean UI

    setResults(filtered);
    setIsOpen(true);
  };

  const handleItemClick = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    if (onResultClick) onResultClick();
  };

  return (
    <div className="search-bar-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={handleSearchChange}
          onFocus={() => query.trim() !== '' && setIsOpen(true)}
        />
        {query && (
          <button className="search-clear-btn" onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }}>
            <X size={17} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="search-results-dropdown">
          {results.length > 0 ? (
            <ul className="search-results-list">
              {results.map(item => (
                <li key={item.id} className="search-result-item">
                  <Link 
                    to={item.path} 
                    className="search-result-link"
                    onClick={handleItemClick}
                  >
                    <div className="result-main">
                      <span className="result-icon"><BookOpen size={15} /></span>
                      <span className="result-title">{navTitle(item)}</span>
                    </div>
                    <span className="result-category">{navTitle(item.categoryId)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="search-no-results">
              {t('searchNoResults', query)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
