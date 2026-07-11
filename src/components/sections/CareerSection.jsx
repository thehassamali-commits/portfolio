import career from "../../data/career.json";
import "./CareerSection.css";

export default function CareerSection() {
  return (
    <>
      {career.openToWork && (
        <div className="open-to-work">
          <span className="status-dot" /> Currently open to opportunities
        </div>
      )}

      <p style={{ maxWidth: "64ch" }}>{career.objective}</p>

      <div className="career-columns">
        <div>
          <h3>Target roles</h3>
          <ul>
            {career.targetRoles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Areas of interest</h3>
          <ul>
            {career.interests.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
