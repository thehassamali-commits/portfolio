import { useState } from "react";
import profile from "../data/profile.json";
import "./Contact.css";

// Replace YOUR_FORM_ID with a real Formspree form id (free tier) once you create one at formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Contact</span>
        <h1>Get in touch</h1>
      </header>

      <div className="contact-grid">
        <div>
          <h3>Find me elsewhere</h3>
          <ul className="contact-links">
            <li><a href={profile.socials.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={profile.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={profile.socials.kaggle} target="_blank" rel="noreferrer">Kaggle</a></li>
            <li><a href={profile.socials.email}>{profile.email}</a></li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send a message</h3>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Message
            <textarea name="message" rows={5} required />
          </label>
          <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
          {status === "sent" && <p className="form-status success">Message sent — thanks, I'll reply soon.</p>}
          {status === "error" && <p className="form-status error">Something went wrong. Try emailing me directly instead.</p>}
        </form>
      </div>
    </div>
  );
}
