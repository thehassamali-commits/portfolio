import { useState } from "react";
import { projects, projectCategories } from "../data/projectsLoader";
import ProjectCard from "../components/ProjectCard";
import "./Projects.css";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = projects.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesQuery =
      query.trim() === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Projects</span>
        <h1>Projects</h1>
        <p style={{ color: "var(--color-text-muted)", maxWidth: "60ch" }}>
          A running collection of data analytics, machine learning, and AI projects.
          New ones get added as I complete them.
        </p>
      </header>

      <div className="projects-controls">
        <div className="filter-pills">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="project-search"
          placeholder="Search by name or tech..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search projects"
        />
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "var(--color-text-muted)" }}>
          No projects match that search yet.
        </p>
      ) : (
        <div className="project-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
