import ContentReader from '../components/ContentReader';
import navData from '../utils/navigation.json';
import { useLanguage } from '../context/LanguageContext';

const ReaderPage = ({ path }) => {
  const { placeholderText: getPlaceholderText } = useLanguage();
  // Find current item recursively in our nav tree to check for custom placeholders
  const findItemByPath = (items, targetPath) => {
    for (const item of items) {
      if (item.path === targetPath) return item;
      if (item.children) {
        const found = findItemByPath(item.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  };

  let placeholder = null;

  for (const category of navData.categories) {
    const item = findItemByPath(category.items, path);
    if (item) {
      placeholder = getPlaceholderText(item);
      break;
    }
  }

  return (
    <div className="reader-page-container">
      <ContentReader path={path} placeholder={placeholder} />
    </div>
  );
};

export default ReaderPage;
