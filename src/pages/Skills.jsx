import skills from "../data/skills.json";
import "./Skills.css";

const LEVEL_ORDER = { "Proficient": 3, "Familiar": 2, "Learning": 1 };

export default function Skills() {
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Skills</span>
        <h1>What I work with</h1>
      </header>

      <div className="skills-groups">
        {skills.map((group) => (
          <div className="skills-group" key={group.category}>
            <h3>{group.category}</h3>
            <ul className="skills-list">
              {group.items.map((item) => (
                <li key={item.name} className="skill-item">
                  <span className="skill-name">{item.name}</span>
                  <span
                    className={`skill-level skill-level-${LEVEL_ORDER[item.level] ?? 1}`}
                  >
                    {item.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
