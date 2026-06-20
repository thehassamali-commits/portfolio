import profile from "../data/profile.json";
import "./Resume.css";

export default function Resume() {
  return (
    <div className="page">
      <header className="page-header resume-header">
        <div>
          <span className="eyebrow">Resume</span>
          <h1>My resume</h1>
        </div>
        <a className="btn btn-primary" href={profile.resumeFile} download>
          Download PDF
        </a>
      </header>

      <div className="resume-viewer card">
        <iframe
          src={profile.resumeFile}
          title="Resume"
          width="100%"
          height="100%"
        />
      </div>
      <p className="resume-fallback">
        Viewer not loading?{" "}
        <a href={profile.resumeFile} target="_blank" rel="noreferrer">
          Open the resume in a new tab
        </a>
        .
      </p>
    </div>
  );
}
