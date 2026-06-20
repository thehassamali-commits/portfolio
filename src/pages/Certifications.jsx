import { useEffect, useState } from "react";
import certifications from "../data/certifications.json";
import { asset } from "../utils/asset";
import "./Certifications.css";

export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setActiveCert(null);
    }
    if (activeCert) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeCert]);

  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Certifications</span>
        <h1>Certifications</h1>
        <p style={{ color: "var(--color-text-muted)", maxWidth: "60ch" }}>
          Click any certificate to view it full-size.
        </p>
      </header>

      <div className="cert-grid">
        {certifications.map((cert) => (
          <button
            className="cert-card card"
            key={cert.title}
            onClick={() => setActiveCert(cert)}
            aria-label={`View ${cert.title} certificate full-size`}
          >
            <div className="cert-thumb">
              <img src={asset(cert.image)} alt="" onError={(e) => (e.target.style.display = "none")} />
              <span className="cert-thumb-overlay">View certificate</span>
            </div>
            <div className="cert-body">
              <h3>{cert.title}</h3>
              <p>{cert.issuer} · {cert.date}</p>
              {cert.credentialUrl && (
                <span className="cert-link">View credential &rarr;</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {activeCert && (
        <div className="cert-lightbox" onClick={() => setActiveCert(null)}>
          <button
            className="cert-lightbox-close"
            onClick={() => setActiveCert(null)}
            aria-label="Close"
          >
            &times;
          </button>
          <img
            src={asset(activeCert.image)}
            alt={activeCert.title}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="cert-lightbox-caption" onClick={(e) => e.stopPropagation()}>
            <h3>{activeCert.title}</h3>
            <p>{activeCert.issuer} · {activeCert.date}</p>
            {activeCert.credentialUrl && (
              <a href={activeCert.credentialUrl} target="_blank" rel="noreferrer">
                View credential &rarr;
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
