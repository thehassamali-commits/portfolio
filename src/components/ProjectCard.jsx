import { Link } from "react-router-dom";
import { asset } from "../utils/asset";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="project-card">
      <div className="project-card-image">
        <img
          src={asset(project.thumbnail)}
          alt=""
          onError={(e) => (e.target.style.display = "none")}
        />
        <span className="project-card-category">{project.category}</span>
      </div>
      <div className="project-card-content">
        <div className="project-card-top">
          <span className="project-card-date">{project.date}</span>
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-summary">{project.summary}</p>
        </div>
        <div className="project-card-bottom">
          <div className="project-card-tags">
            {project.tech.slice(0, 4).map((t) => (
              <span className="project-tag" key={t}>{t}</span>
            ))}
          </div>
          <span className="project-card-cta">View project →</span>
        </div>
      </div>
    </Link>
  );
}
