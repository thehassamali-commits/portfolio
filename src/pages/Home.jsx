import { Link } from "react-router-dom";
import profile from "../data/profile.json";
import { featuredProjects } from "../data/projectsLoader";
import ProjectCard from "../components/ProjectCard";
import { asset } from "../utils/asset";
import "./Home.css";

export default function Home() {
  return (
    <div className="page page-bleed">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-eyebrow">{profile.availability}</span>
            <h1>{profile.name}</h1>
            <p className="hero-title">{profile.title}</p>
            <p className="hero-tagline">{profile.tagline}</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/projects">View projects</Link>
              <Link className="resume-btn" to="/resume">View resume</Link>
            </div>
            <div className="hero-socials">
              <a href={profile.socials.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={profile.socials.kaggle} target="_blank" rel="noreferrer">Kaggle</a>
              <a href={profile.socials.email}>Email</a>
            </div>
          </div>
          <div className="hero-photo">
            <div className="hero-photo-frame">
              <img
                src={asset(profile.photo)}
                alt={profile.name}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="hero-photo-placeholder" aria-hidden="true">
                <span>Add your portrait at<br /><code>{profile.photo}</code></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {featuredProjects.length > 0 && (
          <section className="home-section">
            <div className="section-heading">
              <h2>Featured work</h2>
              <Link to="/projects">All projects &rarr;</Link>
            </div>
            <div className="project-grid">
              {featuredProjects.slice(0, 2).map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
