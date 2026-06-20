import profile from "../data/profile.json";
import { asset } from "../utils/asset";
import "./Resume.css";

export default function Resume() {
  const resumeUrl = asset(profile.resumeFile);

  return (
    <div className="page">
      <header className="page-header resume-header">
        <div>
          <span className="eyebrow">Resume</span>
          <h1>My resume</h1>
        </div>
        <a className="btn btn-primary" href={resumeUrl} download>
          Download PDF
        </a>
      </header>

      <div className="resume-viewer card">
        <iframe
          src={resumeUrl}
          title="Resume"
          width="100%"
          height="100%"
        />
      </div>
      <p className="resume-fallback">
        Viewer not loading?{" "}
        <a href={resumeUrl} target="_blank" rel="noreferrer">
          Open the resume in a new tab
        </a>
        .
      </p>
    </div>
  );
}
