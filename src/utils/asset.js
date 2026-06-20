// Resolves a root-relative content path (e.g. "/content/uploads/photo.jpg")
// against the site's actual deployed base path (e.g. "/portfolio/").
// Without this, paths starting with "/" break whenever the site is hosted
// at a subpath instead of a domain root - which is exactly GitHub Pages'
// default setup for project repos.
export function asset(path) {
  if (!path) return path;
  const base = import.meta.env.BASE_URL || "/";
  // Avoid double slashes when joining base ("/portfolio/") and path ("/content/...")
  return base.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
}
