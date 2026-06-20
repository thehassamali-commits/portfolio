import journey from "../data/journey.json";
import "./Journey.css";

export default function Journey() {
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Journey</span>
        <h1>How I got here</h1>
      </header>

      <ol className="timeline">
        {journey.map((entry, i) => (
          <li className="timeline-item" key={i}>
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
        ))}
      </ol>
    </div>
  );
}
