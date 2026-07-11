// Small colored monogram badges for tech-stack chips. Curated for the tools
// used across current projects, with a deterministic fallback (color + initials)
// so any new tech added later still renders a sensible badge with zero edits.
const TECH_STYLES = {
  python: { bg: "#306998", fg: "#ffe873", label: "Py" },
  pandas: { bg: "#150458", fg: "#e70488", label: "pd" },
  numpy: { bg: "#013243", fg: "#4dabcf", label: "np" },
  matplotlib: { bg: "#11557c", fg: "#ffffff", label: "plt" },
  seaborn: { bg: "#4c72b0", fg: "#ffffff", label: "sb" },
  r: { bg: "#276dc3", fg: "#ffffff", label: "R" },
  tidyverse: { bg: "#1a162d", fg: "#ffffff", label: "tv" },
  dplyr: { bg: "#7f52ff", fg: "#ffffff", label: "dp" },
  lubridate: { bg: "#ff5252", fg: "#ffffff", label: "lb" },
  ggplot2: { bg: "#276dc3", fg: "#ffffff", label: "gg" },
  sql: { bg: "#00618a", fg: "#ffffff", label: "SQL" },
  tableau: { bg: "#e97627", fg: "#ffffff", label: "Tb" },
  excel: { bg: "#1d6f42", fg: "#ffffff", label: "Xl" },
  javascript: { bg: "#f0db4f", fg: "#323330", label: "JS" },
  typescript: { bg: "#3178c6", fg: "#ffffff", label: "TS" },
  react: { bg: "#0b1220", fg: "#61dafb", label: "R" },
  electron: { bg: "#2b2e3a", fg: "#9feaf9", label: "El" },
  sqlite: { bg: "#0f80cc", fg: "#ffffff", label: "lite" },
  zustand: { bg: "#443e38", fg: "#ffcc66", label: "Zu" },
  tailwind: { bg: "#0891b2", fg: "#ffffff", label: "Tw" },
  git: { bg: "#f1502f", fg: "#ffffff", label: "Git" },
  github: { bg: "#161b22", fg: "#ffffff", label: "GH" },
  html: { bg: "#e34f26", fg: "#ffffff", label: "H" },
  css: { bg: "#1572b6", fg: "#ffffff", label: "C" },
  "node.js": { bg: "#3c873a", fg: "#ffffff", label: "Nd" },
};

const FALLBACK_PALETTE = [
  "#0a66c2", "#7c3aed", "#dc2626", "#059669",
  "#d97706", "#0891b2", "#db2777", "#4338ca",
];

function hashColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_PALETTE[Math.abs(hash) % FALLBACK_PALETTE.length];
}

function initials(name) {
  const words = name.replace(/[^a-zA-Z0-9 ]/g, " ").trim().split(/\s+/);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2);
}

export default function TechIcon({ name }) {
  const preset = TECH_STYLES[name.toLowerCase()];
  const bg = preset?.bg ?? hashColor(name);
  const fg = preset?.fg ?? "#ffffff";
  const label = preset?.label ?? initials(name);

  return (
    <span className="tech-icon-badge" style={{ background: bg, color: fg }} aria-hidden="true">
      {label}
    </span>
  );
}
