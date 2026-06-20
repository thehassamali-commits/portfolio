import profile from "../data/profile.json";

export default function About() {
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">About</span>
        <h1>A bit about me</h1>
      </header>
      <div style={{ maxWidth: "68ch" }}>
        {profile.bio.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}
