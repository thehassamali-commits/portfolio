import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { projects, getProjectBySlug } from "../data/projectsLoader";
import { asset } from "../utils/asset";
import TechIcon from "../components/TechIcon";
import "./ProjectDetail.css";

const STORY_STEPS = [
  { key: "problem", num: "01", label: "The Problem" },
  { key: "approach", num: "02", label: "The Approach" },
  { key: "results", num: "03", label: "The Results" },
];

// Reads a meaningful fill % out of a highlight value where one exists
// ("35.5%" -> 35.5, "r = 0.767" -> 76.7). Falls back to a full ring for
// plain counts/labels where a percentage wouldn't be meaningful.
function highlightFillPercent(value) {
  if (typeof value !== "string") return 100;
  const pct = value.match(/(\d+(\.\d+)?)\s*%/);
  if (pct) return Math.min(100, parseFloat(pct[1]));
  const corr = value.match(/r\s*=\s*(0?\.\d+)/i);
  if (corr) return Math.min(100, parseFloat(corr[1]) * 100);
  return 100;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const rootRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Reading progress bar, tied to overall page scroll
  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  // Scroll-reveal for below-the-fold sections (respects prefers-reduced-motion globally)
  useEffect(() => {
    window.scrollTo(0, 0);
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  if (!project) return <Navigate to="/projects" replace />;

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = idx > 0 ? projects[idx - 1] : null;
  const nextProject = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <div className="page" ref={rootRef}>
      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <Link to="/projects" className="back-link">← All projects</Link>

      <header className="page-header">
        <span className="eyebrow">{project.category} · {project.date}</span>
        <h1>{project.title}</h1>
        {project.summary && (
          <p className="project-detail-summary">{project.summary}</p>
        )}
        <div className="project-detail-tags">
          {project.tech.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
        <div className="project-detail-links">
          {project.githubUrl && (
            <a className="btn" href={project.githubUrl} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          )}
          {project.demoUrl && (
            <a className="btn btn-primary" href={project.demoUrl} target="_blank" rel="noreferrer">
              Live demo
            </a>
          )}
        </div>
      </header>

      <div className="project-detail-thumb reveal">
        <img src={asset(project.thumbnail)} alt="" onError={(e) => (e.target.style.display = "none")} />
      </div>

      {Array.isArray(project.highlights) && project.highlights.length > 0 && (
        <div className="project-highlights">
          {project.highlights.map((h, i) => (
            <div
              className="project-highlight-card reveal"
              key={i}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="project-highlight-value">{h.value}</div>
              <div className="project-highlight-label">{h.label}</div>
              <div className="project-highlight-meter">
                <div
                  className="project-highlight-meter-fill"
                  style={{ "--fill": `${highlightFillPercent(h.value)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="project-tech-stack reveal">
        {project.tech.map((t) => (
          <span className="tech-chip" key={t}>
            <TechIcon name={t} />
            <span>{t}</span>
          </span>
        ))}
      </div>

      <div className="project-story">
        {STORY_STEPS.map((step, i) => (
          project[step.key] && (
            <div
              className="project-story-item reveal"
              key={step.key}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="project-story-marker">
                <div className="project-story-number">{step.num}</div>
                {i < STORY_STEPS.length - 1 && <div className="project-story-line" />}
              </div>
              <div className="project-story-body">
                <span className="project-story-kicker">{step.label}</span>
                <p>{project[step.key]}</p>
              </div>
            </div>
          )
        ))}
      </div>

      {(prevProject || nextProject) && (
        <nav className="project-nav-footer reveal" aria-label="More projects">
          {prevProject ? (
            <Link to={`/projects/${prevProject.slug}`} className="project-nav-link project-nav-prev">
              <span className="project-nav-dir">← Previous</span>
              <span className="project-nav-title">{prevProject.title}</span>
            </Link>
          ) : <span />}
          {nextProject ? (
            <Link to={`/projects/${nextProject.slug}`} className="project-nav-link project-nav-next">
              <span className="project-nav-dir">Next →</span>
              <span className="project-nav-title">{nextProject.title}</span>
            </Link>
          ) : <span />}
        </nav>
      )}
    </div>
  );
}
