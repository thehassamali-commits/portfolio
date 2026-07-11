import skills from "../../data/skills.json";
import { useReveal } from "../../hooks/useReveal";
import "./SkillsSection.css";

const LEVELS = {
  Proficient: 100,
  Familiar: 65,
  Learning: 35,
};

function SkillBar({ name, level, delay }) {
  const [ref, visible] = useReveal();
  const pct = LEVELS[level] ?? 50;

  return (
    <div ref={ref} className={`skill-bar reveal${visible ? " is-visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="skill-bar-top">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-level">{level}</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: visible ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <div className="skills-groups">
      {skills.map((group) => (
        <div className="skill-group" key={group.category}>
          <h3>{group.category}</h3>
          <div className="skill-bars">
            {group.items.map((item, i) => (
              <SkillBar key={item.name} name={item.name} level={item.level} delay={i * 60} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
