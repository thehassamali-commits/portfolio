import { useParams, Link, Navigate } from "react-router-dom";
import { getProjectBySlug } from "../data/projectsLoader";
import { asset } from "../utils/asset";
import "./ProjectDetail.css";

const STORY_STEPS = [
  { key: "problem", num: "01", label: "The Problem" },
  { key: "approach", num: "02", label: "The Approach" },
  { key: "results", num: "03", label: "The Results" },
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="page">
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

      <div className="project-detail-thumb">
        <img src={asset(project.thumbnail)} alt="" onError={(e) => (e.target.style.display = "none")} />
      </div>

      {Array.isArray(project.highlights) && project.highlights.length > 0 && (
        <div className="project-highlights">
          {project.highlights.map((h, i) => (
            <div className="project-highlight-card" key={i}>
              <div className="project-highlight-value">{h.value}</div>
              <div className="project-highlight-label">{h.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="project-story">
        {STORY_STEPS.map((step, i) => (
          project[step.key] && (
            <div className="project-story-item" key={step.key}>
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
    </div>
  );
}
