const modules = import.meta.glob("./blog/*.json", { eager: true });

export const posts = Object.values(modules)
  .map((m) => m.default ?? m)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

function estimateReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export { estimateReadingTime };
