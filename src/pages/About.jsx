import { Link } from "react-router-dom";
import profile from "../data/profile.json";
import skills from "../data/skills.json";
import journey from "../data/journey.json";
import "./About.css";

export default function About() {
  const latestMilestone = journey[0];
  const topSkillCategories = skills.slice(0, 3);

  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">About</span>
        <h1>A bit about me</h1>
      </header>

      <div className="about-layout">
        <div className="about-bio">
          {profile.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          {latestMilestone && (
            <div className="about-current-callout">
              <span className="about-current-label">Right now</span>
              <p>
                <strong>{latestMilestone.title}</strong> — {latestMilestone.description}
              </p>
            </div>
          )}
        </div>

        <aside className="about-facts card">
          <h3>Quick facts</h3>
          <dl className="about-facts-list">
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Studying</dt>
              <dd>BS Computer Science</dd>
            </div>
            <div>
              <dt>Focus areas</dt>
              <dd>Data Analytics, AI/ML</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{profile.availability}</dd>
            </div>
          </dl>

          <h3>Working with</h3>
          <div className="about-skill-tags">
            {topSkillCategories.flatMap((group) =>
              group.items.slice(0, 2).map((item) => (
                <span className="tag" key={item.name}>{item.name}</span>
              ))
            )}
          </div>

          <Link to="/skills" className="about-facts-link">
            See full skill set &rarr;
          </Link>
        </aside>
      </div>
    </div>
  );
}
