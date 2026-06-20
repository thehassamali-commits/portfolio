import { Link } from "react-router-dom";
import { posts } from "../data/blogLoader";
import "./Blog.css";

export default function Blog() {
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Notes</span>
        <h1>Notes &amp; write-ups</h1>
        <p style={{ color: "var(--color-text-muted)", maxWidth: "60ch" }}>
          Short write-ups from courses and projects — mostly for my own clarity, shared in case they help someone else too.
        </p>
      </header>

      {posts.length === 0 ? (
        <p style={{ color: "var(--color-text-muted)" }}>No posts yet — check back soon.</p>
      ) : (
        <ul className="blog-list">
          {posts.map((post) => (
            <li key={post.slug} className="blog-list-item">
              <Link to={`/notes/${post.slug}`}>
                <span className="blog-date">{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <div className="blog-tags">
                  {post.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
