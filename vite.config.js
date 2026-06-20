import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set VITE_BASE_PATH in the GitHub Actions workflow to your repo name,
// e.g. "/portfolio/" for a project page, or "/" if this repo IS
// <username>.github.io (a user/org root site).
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
});
