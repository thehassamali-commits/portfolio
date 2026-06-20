import certifications from "../data/certifications.json";
import "./Certifications.css";

export default function Certifications() {
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Certifications</span>
        <h1>Certifications</h1>
      </header>

      <div className="cert-grid">
        {certifications.map((cert) => (
          <div className="cert-card card" key={cert.title}>
            <div className="cert-thumb">
              <img src={cert.image} alt="" onError={(e) => (e.target.style.display = "none")} />
            </div>
            <div className="cert-body">
              <h3>{cert.title}</h3>
              <p>{cert.issuer} · {cert.date}</p>
              {cert.credentialUrl && (
                <a href={cert.credentialUrl} target="_blank" rel="noreferrer">
                  View credential →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
