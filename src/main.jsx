import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/base.css";

// Restore the real path after the 404.html redirect trick (see public/404.html).
// This runs once on load and rewrites the URL back to what the user actually visited.
(function restoreRouteFromRedirect() {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.pathname) {
    history.replaceState(null, "", redirect);
  }
})();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
