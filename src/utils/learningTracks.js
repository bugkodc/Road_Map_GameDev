import navData from './navigation.json';

export const learningTracks = [
  {
    id: 'foundations',
    categoryIds: ['refactoring', 'design-patterns'],
    title: { vi: 'Nền tảng kỹ thuật', en: 'Engineering foundations' },
    shortTitle: { vi: 'Nền tảng', en: 'Foundations' },
    description: {
      vi: 'Clean code, refactoring và design patterns dùng chung cho mọi game engine.',
      en: 'Clean code, refactoring, and design patterns shared by every game engine.'
    },
    accent: 'foundation',
    icon: 'blocks',
    startPath: '01-Refactoring/00-refactoring-overview.md'
  },
  {
    id: 'unity',
    categoryIds: ['unity'],
    title: { vi: 'Unity', en: 'Unity' },
    shortTitle: { vi: 'Unity', en: 'Unity' },
    description: {
      vi: 'Lộ trình Unity từ Editor, C# API đến physics, UI và tối ưu hiệu năng.',
      en: 'A Unity path from the Editor and C# APIs to physics, UI, and performance.'
    },
    accent: 'unity',
    icon: 'box',
    startPath: '03-Unity/00-unity-overview.md'
  },
  {
    id: 'unreal',
    categoryIds: ['unreal'],
    title: { vi: 'Unreal Engine', en: 'Unreal Engine' },
    shortTitle: { vi: 'Unreal', en: 'Unreal' },
    description: {
      vi: 'Tài liệu Unreal 5.7 về C++, Blueprint, gameplay systems, rendering và phát hành.',
      en: 'Unreal 5.7 docs covering C++, Blueprints, gameplay systems, rendering, and shipping.'
    },
    accent: 'unreal',
    icon: 'hexagon',
    startPath: 'unreal-doc:unreal-engine-5-7-documentation'
  },
  {
    id: 'resources',
    categoryIds: ['resources'],
    title: { vi: 'Sách & Tài nguyên', en: 'Books & Resources' },
    shortTitle: { vi: 'Tài nguyên', en: 'Resources' },
    description: {
      vi: 'Tuyển tập sách, trang web, blog kỹ thuật, video và podcast chất lượng cao về kiến trúc game và hệ thống lớn.',
      en: 'Curated collection of high-quality books, websites, engineering blogs, videos, and podcasts on game architecture and large-scale systems.'
    },
    accent: 'resources',
    icon: 'book',
    startPath: 'books/game-engine-architecture.pdf'
  }
];

export const countArticles = (items = []) => items.reduce((count, item) => {
  const ownCount = item.path && !item.placeholder ? 1 : 0;
  return count + ownCount + countArticles(item.children);
}, 0);

export const flattenArticles = (items = [], result = []) => {
  items.forEach((item) => {
    if (item.path && !item.placeholder) result.push(item);
    if (item.children) flattenArticles(item.children, result);
  });
  return result;
};

export const getTrackCategories = (trackId) => {
  const track = learningTracks.find((item) => item.id === trackId);
  if (!track) return [];
  return navData.categories.filter((category) => track.categoryIds.includes(category.id));
};

export const getTrackArticles = (trackId) =>
  getTrackCategories(trackId).flatMap((category) => flattenArticles(category.items, []));

export const getTrackForPath = (path = '') => learningTracks.find((track) =>
  getTrackCategories(track.id).some((category) =>
    flattenArticles(category.items, []).some((item) => item.path === path)
  )
) || learningTracks[0];

export const localizeTrack = (track, language) => ({
  ...track,
  title: track.title[language] || track.title.en,
  shortTitle: track.shortTitle[language] || track.shortTitle.en,
  description: track.description[language] || track.description.en
});
