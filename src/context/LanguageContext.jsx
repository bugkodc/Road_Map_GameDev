/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  vi: {
    languageName: 'Tiếng Việt',
    switchLanguage: 'Chuyển ngôn ngữ',
    menuToggle: 'Mở menu',
    brandSubtitle: 'Nguồn học liệu chuẩn hóa',
    navHome: 'Trang chủ',
    navRoadmap: 'Lộ trình tương tác',
    progress: 'Tiến trình',
    progressTitle: (completed, total) => `${completed}/${total} bài học đã hoàn thành`,
    themeTitle: (theme) => theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng',
    heroBadge: 'HỌC GAME DEV BÀI BẢN',
    heroTitle: 'Road Map Game Development',
    heroSubtitle: 'Học lập trình game chuyên nghiệp từ nền tảng. Lộ trình này gom kiến thức cốt lõi về Clean Code, Refactoring, Design Patterns và các game engine phổ biến vào một trải nghiệm học rõ ràng, dễ theo dõi.',
    searchPlaceholder: "Tìm nhanh bài viết, ví dụ: 'Clean Code', 'Long Method'...",
    searchNoResults: (query) => `Không tìm thấy bài viết phù hợp với "${query}"`,
    pathsTitle: 'Các phân hệ học tập',
    learningProgress: 'Tiến độ học',
    articlesCount: (completed, total) => `${completed} / ${total} bài viết`,
    startLearning: 'Bắt đầu học ngay',
    readOverview: 'Đọc tổng quan',
    viewOverview: 'Xem tổng quan',
    drafting: 'Đang soạn thảo',
    comingSoon: 'Sắp ra mắt',
    pathRefactoringDesc: 'Học cách làm sạch code, xử lý nợ kỹ thuật, nhận diện code smells và áp dụng các kỹ thuật cải tiến an toàn.',
    pathPatternsDesc: 'Mẫu thiết kế Creational, Structural và Behavioral. Bộ giải pháp nền tảng cho kiến trúc game có thể mở rộng.',
    pathUnityDesc: 'Lộ trình làm chủ Unity: scripting, physics, shader, ScriptableObject, UI và tối ưu hiệu năng.',
    pathUnrealDesc: 'Lộ trình chinh phục Unreal Engine: Gameplay Framework, C++, Blueprint Visual Scripting và multiplayer.',
    visionTitle: 'Triết lý của Road Map',
    visionText: 'Nhiều lập trình viên bắt đầu học game bằng cách lao ngay vào kéo thả asset hoặc viết script chạy được trước mắt. Cách đó hữu ích khi thử nghiệm, nhưng dễ đổ vỡ khi dự án lớn lên. Road Map này giúp bạn xây nền tảng kỹ thuật vững hơn, viết code dễ bảo trì hơn và phát triển sản phẩm bền vững hơn.',
    roadmapTitle: 'Bản đồ lộ trình tương tác',
    roadmapIntro: 'Theo dõi tiến trình học tập của bạn theo thời gian. Đánh dấu các bài đã học để lưu lại tiến độ trên toàn bộ roadmap.',
    roadmapOverall: 'Tiến độ hoàn thành lộ trình',
    lessonsCount: (completed, total) => `${completed} / ${total} bài học`,
    roadmapBadge: (finished, count, pct) => `${finished} / ${count} bài học (${pct}%)`,
    stepDescription: (category) => `Hoàn thành các bài viết bên dưới để nắm chắc nền tảng về ${category}:`,
    constructionBadge: 'Đang biên soạn',
    constructionText: 'Nội dung cho phần này đang được biên soạn và rà soát. Các bài học mới sẽ xuất hiện tại đây khi hoàn tất.',
    overviewSummary: 'Xem tóm tắt tổng quan',
    alertNote: 'LƯU Ý',
    alertTip: 'MẸO NHỎ',
    alertWarning: 'CẢNH BÁO',
    alertImportant: 'QUAN TRỌNG',
    alertCaution: 'CẨN TRỌNG',
    loadErrorTitle: 'Đã xảy ra lỗi tải bài học',
    loadError: (path) => `Không thể tìm thấy file bài viết: ${path}`,
    unityDocsLive: 'Tài liệu Unity trực tiếp',
    unityDocsRefresh: 'Cập nhật từ Unity',
    unityDocsCacheHit: 'Đang dùng cache local',
    unityDocsFreshFetch: 'Vừa cập nhật từ Unity',
    unityDocsUpdatedAt: 'Cập nhật',
    unityDocsOpenSource: 'Mở trang gốc',
    unityDocsLoadError: (message) => `${message} Bạn có thể thử cập nhật lại cache hoặc mở trang gốc Unity.`,
    backHome: 'Về trang chủ',
    placeholderBadge: 'Đang biên tập',
    updating: 'Đang cập nhật',
    placeholderNote: 'Nội dung đang được biên soạn chọn lọc từ các nguồn chất lượng cao. Hãy quay lại sau.',
    completedTitle: 'Bạn đã hoàn thành bài viết này!',
    incompleteTitle: 'Đã đọc xong bài học này?',
    completionText: 'Đánh dấu hoàn thành giúp bạn lưu lại tiến trình trên Roadmap GameDev.',
    completedButton: 'Đã hoàn thành',
    markCompletedButton: 'Đánh dấu đã học',
    previousArticle: 'BÀI TRƯỚC',
    nextArticle: 'BÀI TIẾP THEO',
    placeholderUnity: 'Nội dung lộ trình tự học Unity đang được biên soạn chi tiết dựa trên tài liệu chính thống. Sẽ sớm ra mắt!',
    placeholderUnreal: 'Nội dung lộ trình tự học Unreal Engine đang được tổng hợp từ Epic Games. Sẽ sớm ra mắt!',
  },
  en: {
    languageName: 'English',
    switchLanguage: 'Switch language',
    menuToggle: 'Open menu',
    brandSubtitle: 'Curated learning resources',
    navHome: 'Home',
    navRoadmap: 'Interactive roadmap',
    progress: 'Progress',
    progressTitle: (completed, total) => `${completed}/${total} lessons completed`,
    themeTitle: (theme) => theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode',
    heroBadge: 'STRUCTURED GAME DEV LEARNING',
    heroTitle: 'Road Map Game Development',
    heroSubtitle: 'Learn professional game development from the ground up. This roadmap brings core knowledge about Clean Code, Refactoring, Design Patterns, and popular game engines into one clear learning experience.',
    searchPlaceholder: "Quickly find lessons, e.g. 'Clean Code', 'Long Method'...",
    searchNoResults: (query) => `No matching lessons found for "${query}"`,
    pathsTitle: 'Learning tracks',
    learningProgress: 'Learning progress',
    articlesCount: (completed, total) => `${completed} / ${total} articles`,
    startLearning: 'Start learning',
    readOverview: 'Read overview',
    viewOverview: 'View overview',
    drafting: 'In progress',
    comingSoon: 'Coming soon',
    pathRefactoringDesc: 'Learn how to clean up code, manage technical debt, spot code smells, and apply safe improvement techniques.',
    pathPatternsDesc: 'Creational, Structural, and Behavioral design patterns. Core solutions for scalable game architecture.',
    pathUnityDesc: 'A Unity mastery path covering scripting, physics, shaders, ScriptableObject, UI, and performance optimization.',
    pathUnrealDesc: 'A path through Unreal Engine covering Gameplay Framework, C++, Blueprint Visual Scripting, and multiplayer.',
    visionTitle: 'Road Map Philosophy',
    visionText: 'Many developers start learning game development by jumping straight into assets or quick scripts. That is useful for prototypes, but it can collapse as a project grows. This roadmap helps you build stronger engineering foundations, write more maintainable code, and ship more sustainable products.',
    roadmapTitle: 'Interactive roadmap',
    roadmapIntro: 'Track your learning progress over time. Mark completed lessons to keep your progress across the entire roadmap.',
    roadmapOverall: 'Overall roadmap progress',
    lessonsCount: (completed, total) => `${completed} / ${total} lessons`,
    roadmapBadge: (finished, count, pct) => `${finished} / ${count} lessons (${pct}%)`,
    stepDescription: (category) => `Complete the lessons below to build a strong foundation in ${category}:`,
    constructionBadge: 'In progress',
    constructionText: 'This section is being written and reviewed. New lessons will appear here when they are ready.',
    overviewSummary: 'View overview summary',
    alertNote: 'NOTE',
    alertTip: 'TIP',
    alertWarning: 'WARNING',
    alertImportant: 'IMPORTANT',
    alertCaution: 'CAUTION',
    loadErrorTitle: 'Lesson loading failed',
    loadError: (path) => `Could not find the lesson file: ${path}`,
    unityDocsLive: 'Live Unity Docs',
    unityDocsRefresh: 'Refresh from Unity',
    unityDocsCacheHit: 'Using local cache',
    unityDocsFreshFetch: 'Updated from Unity',
    unityDocsUpdatedAt: 'Updated',
    unityDocsOpenSource: 'Open source page',
    unityDocsLoadError: (message) => `${message} Try refreshing the cache or open the original Unity source page.`,
    backHome: 'Back home',
    placeholderBadge: 'Being edited',
    updating: 'Updating',
    placeholderNote: 'This content is being curated from high-quality sources. Please check back later.',
    completedTitle: 'You completed this article!',
    incompleteTitle: 'Finished this lesson?',
    completionText: 'Marking lessons complete helps save your progress on the GameDev Roadmap.',
    completedButton: 'Completed',
    markCompletedButton: 'Mark as learned',
    previousArticle: 'PREVIOUS',
    nextArticle: 'NEXT',
    placeholderUnity: 'The self-study Unity roadmap is being prepared in detail from official documentation. Coming soon!',
    placeholderUnreal: 'The Unreal Engine self-study roadmap is being compiled from Epic Games resources. Coming soon!',
  },
};

const navTitles = {
  vi: {
    refactoring: 'Refactoring',
    'refactoring-overview': 'Tổng quan Refactoring',
    'what-is-refactoring': 'Khái niệm cơ bản',
    'technical-debt': 'Technical Debt (Nợ kỹ thuật)',
    'code-smells': 'Nhận diện Code Smells',
    'code-smells-overview': 'Tổng quan Code Smells',
    bloaters: 'Bloaters (Phình to)',
    'bloaters-overview': 'Tổng quan Bloaters',
    'oo-abusers': 'OO Abusers (Lạm dụng OOP)',
    'oo-abusers-overview': 'Tổng quan OO Abusers',
    'change-preventers': 'Change Preventers (Cản trở thay đổi)',
    'change-preventers-overview': 'Tổng quan Change Preventers',
    dispensables: 'Dispensables (Thừa thãi)',
    'dispensables-overview': 'Tổng quan Dispensables',
    couplers: 'Couplers (Kết nối chặt)',
    'couplers-overview': 'Tổng quan Couplers',
    'refactoring-techniques': 'Kỹ thuật Refactoring',
    'techniques-overview': 'Tổng quan Kỹ thuật',
    'composing-methods': 'Composing Methods (Tổ chức Method)',
    'composing-methods-overview': 'Tổng quan Composing',
    'moving-features': 'Moving Features (Di chuyển)',
    'organizing-data': 'Organizing Data (Dữ liệu)',
    'simplifying-conditional': 'Simplifying Conditional (Điều kiện)',
    'simplifying-method-calls': 'Simplifying Method Calls (Hàm)',
    'dealing-with-generalization': 'Dealing with Generalization (Kế thừa)',
    'design-patterns': 'Design Patterns',
    'design-patterns-overview': 'Tổng quan Design Patterns',
    'what-is-a-pattern-header': 'Design Pattern là gì?',
    'whats-a-design-pattern': 'Design pattern là gì?',
    'history-of-patterns': 'Lịch sử của Design Patterns',
    'why-should-i-learn-patterns': 'Vì sao nên học Design Patterns?',
    'criticism-of-patterns': 'Những phê bình về Design Patterns',
    'classification-of-patterns': 'Phân loại Design Patterns',
    'catalog-header': 'Danh mục mẫu thiết kế',
    'creational-patterns': 'Creational Patterns',
    'creational-overview': 'Tổng quan Creational',
    'structural-patterns': 'Structural Patterns',
    'structural-overview': 'Tổng quan Structural',
    'behavioral-patterns': 'Behavioral Patterns',
    'behavioral-overview': 'Tổng quan Behavioral',
    unity: 'Unity Roadmap',
    'unity-overview': 'Tổng quan lộ trình Unity',
    unreal: 'Unreal Roadmap',
    'unreal-overview': 'Tổng quan lộ trình Unreal',
  },
  en: {
    refactoring: 'Refactoring',
    'refactoring-overview': 'Refactoring Overview',
    'what-is-refactoring': 'Core Concepts',
    'technical-debt': 'Technical Debt',
    'when-to-refactor': 'When to Refactor',
    'how-to-refactor': 'How to Refactor',
    'code-smells': 'Recognizing Code Smells',
    'code-smells-overview': 'Code Smells Overview',
    bloaters: 'Bloaters',
    'bloaters-overview': 'Bloaters Overview',
    'oo-abusers': 'OO Abusers',
    'oo-abusers-overview': 'OO Abusers Overview',
    'change-preventers': 'Change Preventers',
    'change-preventers-overview': 'Change Preventers Overview',
    dispensables: 'Dispensables',
    'dispensables-overview': 'Dispensables Overview',
    couplers: 'Couplers',
    'couplers-overview': 'Couplers Overview',
    'refactoring-techniques': 'Refactoring Techniques',
    'techniques-overview': 'Techniques Overview',
    'composing-methods': 'Composing Methods',
    'composing-methods-overview': 'Composing Methods Overview',
    'moving-features': 'Moving Features',
    'organizing-data': 'Organizing Data',
    'simplifying-conditional': 'Simplifying Conditional',
    'simplifying-method-calls': 'Simplifying Method Calls',
    'dealing-with-generalization': 'Dealing with Generalization',
    'design-patterns': 'Design Patterns',
    'design-patterns-overview': 'Design Patterns Overview',
    'what-is-a-pattern-header': 'What is a Pattern?',
    'catalog-header': 'Catalog',
    'creational-overview': 'Creational Overview',
    'structural-overview': 'Structural Overview',
    'behavioral-overview': 'Behavioral Overview',
    unity: 'Unity Roadmap',
    'unity-overview': 'Unity Roadmap Overview',
    unreal: 'Unreal Roadmap',
    'unreal-overview': 'Unreal Roadmap Overview',
  },
};

const normalizeTitle = (title = '') => title.replace(/^[^\p{L}\p{N}]+/u, '').trim();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('gamedev_language') || 'vi');

  useEffect(() => {
    localStorage.setItem('gamedev_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => {
    const dictionary = translations[language];

    const t = (key, ...args) => {
      const entry = dictionary[key] ?? translations.vi[key] ?? key;
      return typeof entry === 'function' ? entry(...args) : entry;
    };

    const navTitle = (itemOrId) => {
      const id = typeof itemOrId === 'string' ? itemOrId : itemOrId?.id;
      const fallback = typeof itemOrId === 'string' ? itemOrId : itemOrId?.title;
      return navTitles[language][id] || navTitles.vi[id] || normalizeTitle(fallback);
    };

    const placeholderText = (item) => {
      if (!item) return null;
      if (item.id === 'unity-overview') return t('placeholderUnity');
      if (item.id === 'unreal-overview') return t('placeholderUnreal');
      return item.placeholder;
    };

    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => current === 'vi' ? 'en' : 'vi'),
      t,
      navTitle,
      placeholderText,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
