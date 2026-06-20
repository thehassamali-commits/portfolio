import { useParams, Link, Navigate } from "react-router-dom";
import { getProjectBySlug } from "../data/projectsLoader";
import { asset } from "../utils/asset";
import "./ProjectDetail.css";

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

      <section className="project-detail-section">
        <h3>Problem</h3>
        <p>{project.problem}</p>
      </section>
      <section className="project-detail-section">
        <h3>Approach</h3>
        <p>{project.approach}</p>
      </section>
      <section className="project-detail-section">
        <h3>Results</h3>
        <p>{project.results}</p>
      </section>
    </div>
  );
}
