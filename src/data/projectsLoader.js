// Auto-loads every JSON file in /data/projects so that adding a new file
// (via GitHub Desktop, the CMS, or by hand) automatically appears on the site
// with zero code changes.
const modules = import.meta.glob("./projects/*.json", { eager: true });

export const projects = Object.values(modules)
  .map((m) => m.default ?? m)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const featuredProjects = projects.filter((p) => p.featured);

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
