import { useState } from "react";
import profile from "../data/profile.json";
import { asset } from "../utils/asset";
import "./Resume.css";

function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

export default function Resume() {
  const resumeUrl = asset(profile.resumeFile);
  const [isMobile] = useState(isMobileDevice);

  // Mobile browsers generally can't render a PDF inside an <iframe> and
  // instead force a download. Google's viewer renders it as an image-based
  // preview inside the iframe instead, which works everywhere.
  const absoluteResumeUrl =
    typeof window !== "undefined"
      ? new URL(resumeUrl, window.location.href).href
      : resumeUrl;
  const mobileViewerUrl = `https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(
    absoluteResumeUrl
  )}`;

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
          src={isMobile ? mobileViewerUrl : resumeUrl}
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
