import journey from "../../data/journey.json";
import { useReveal } from "../../hooks/useReveal";
import "./JourneySection.css";

function TimelineItem({ entry, delay }) {
  const [ref, visible] = useReveal();
  return (
    <li
      ref={ref}
      className={`timeline-item reveal${visible ? " is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="timeline-marker" aria-hidden="true" />
      <div className="timeline-content">
        <span className="timeline-date">{entry.date}</span>
        <h3>{entry.title}</h3>
        <p className="timeline-org">
          {entry.org} <span className="tag">{entry.type}</span>
        </p>
        <p>{entry.description}</p>
      </div>
    </li>
  );
}

export default function JourneySection() {
  return (
    <ol className="timeline">
      {journey.map((entry, i) => (
        <TimelineItem entry={entry} key={i} delay={i * 80} />
      ))}
    </ol>
  );
}
