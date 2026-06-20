import { Link } from "react-router-dom";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="project-card card">
      <div className="project-card-thumb">
        <img
          src={project.thumbnail}
          alt=""
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>
      <div className="project-card-body">
        <span className="eyebrow">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-card-tags">
          {project.tech.slice(0, 4).map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
