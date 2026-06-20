import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page" style={{ textAlign: "center", padding: "var(--space-6) 0" }}>
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p style={{ color: "var(--color-text-muted)" }}>
        That page doesn't exist. It may have moved or been removed.
      </p>
      <Link className="btn btn-primary" to="/">Back to home</Link>
    </div>
  );
}
