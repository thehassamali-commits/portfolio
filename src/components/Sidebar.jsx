import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import profile from "../data/profile.json";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/journey", label: "Journey" },
  { to: "/projects", label: "Projects" },
  { to: "/notes", label: "Notes" },
  { to: "/certifications", label: "Certifications" },
  { to: "/resume", label: "Resume" },
  { to: "/career", label: "Career" },
  { to: "/contact", label: "Contact" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="topbar">
        <span className="topbar-name">{profile.name}</span>
        <div className="topbar-actions">
          <button
            className="topbar-theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button
            className="hamburger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav className={`sidebar ${open ? "sidebar-open" : ""}`} aria-label="Main navigation">
        <div className="sidebar-brand">
          <span className="sidebar-eyebrow">Portfolio</span>
          <h2 className="sidebar-name">{profile.name}</h2>
          <p className="sidebar-title">{profile.title}</p>
        </div>

        <ul className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  "sidebar-link" + (isActive ? " active" : "")
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
          <span style={{ display: "block", marginTop: "8px", fontSize: "10px", opacity: 0.4, textAlign: "center" }}>
            build v6-responsive-fix
          </span>
        </div>
      </nav>

      {open && <div className="sidebar-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}
