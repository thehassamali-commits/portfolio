# Your Name — Portfolio

A personal portfolio site for showcasing your Data Analytics / Data Science / AI-ML
journey: skills, timeline, projects, resume, notes, certifications, and career goals.

Built with React + Vite. Hosted free on GitHub Pages. Content is editable two ways:
by editing files directly (great with GitHub Desktop), or through a visual admin
panel at `/admin` that commits changes to GitHub for you — no code required.

---

## 1. One-time setup

### 1.1 Push this folder to GitHub
1. Create a new **public** repository on GitHub, e.g. `portfolio`.
2. In GitHub Desktop: *Add Local Repository* -> select this folder -> publish to that repo.

### 1.2 Set the base path to match your repo name
Open `.github/workflows/deploy.yml` and `public/404.html`, and replace
`/portfolio/` (and `/portfolio` in 404.html) with your actual repo name, e.g.
`/my-portfolio/`.

> Exception: if your repo is literally named `<your-github-username>.github.io`,
> set this to `/` instead -- that special repo name serves from the domain root.

### 1.3 Turn on GitHub Pages
In your repo: **Settings -> Pages -> Source -> GitHub Actions**. That's it -- the
included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically
on every push to `main`. Your site will appear at:
`https://<username>.github.io/<repo-name>/`

### 1.4 Connect the admin panel (Decap CMS)
The admin panel at `/admin` needs permission to commit to your repo on your behalf.

1. Go to `public/admin/config.yml` and replace `yourusername/portfolio` with your
   actual `username/repo-name`.
2. Set up the free GitHub OAuth backend following Decap's guide:
   https://decapcms.org/docs/github-backend/
   (a 5-minute one-time setup using a small free OAuth helper app)
3. Once configured, visit `https://<username>.github.io/<repo>/admin/`,
   log in with GitHub, and you'll see editable forms for every section.

If you'd rather skip OAuth setup for now: **you don't need it to use the site.**
Just edit the JSON files directly (next section) -- the admin panel is a
nice-to-have, not a requirement.

---

## 2. Editing content (the file-based way)

Everything on the site reads from plain files. Add, edit, or delete a file, push
to GitHub (via GitHub Desktop), and the site rebuilds and updates automatically
within about a minute.

| What to change                  | Where |
|---|---|
| Name, bio, socials, resume link | `src/data/profile.json` |
| Skills                          | `src/data/skills.json` |
| Timeline / journey              | `src/data/journey.json` |
| Career goals                    | `src/data/career.json` |
| Certifications                  | `src/data/certifications.json` |
| Add a project                   | new file in `src/data/projects/your-slug.json` (copy an existing one as a template) |
| Add a notes/blog post           | new file in `src/data/blog/your-slug.json` |
| Resume PDF                      | replace `public/resume/resume.pdf` |
| Project thumbnails / photos     | drop images into `public/content/...` and reference the path in the JSON |

You never need to touch any `.jsx` or `.css` file to add new content -- dropping a
correctly-shaped JSON file into `src/data/projects/` or `src/data/blog/` is enough;
the site automatically picks it up and lists it.

---

## 3. Local development

```bash
npm install
npm run dev
```

Open the printed localhost URL. Changes hot-reload instantly.

To test a production build locally:
```bash
npm run build
npm run preview
```

---

## 4. Folder structure

```
src/
  components/   # Sidebar, ProjectCard, layout
  pages/        # one file per route/tab
  data/         # ALL editable content lives here as JSON
  context/      # theme (dark/light) state
public/
  admin/        # Decap CMS config -- the no-code editor
  content/      # images, certificates, uploads
  resume/       # resume.pdf lives here
.github/workflows/deploy.yml   # auto build + deploy on every push
```
