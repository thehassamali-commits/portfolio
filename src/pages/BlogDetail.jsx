import { useParams, Link, Navigate } from "react-router-dom";
import { getPostBySlug, estimateReadingTime } from "../data/blogLoader";
import "./BlogDetail.css";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/notes" replace />;

  const minutes = estimateReadingTime(post.body);

  return (
    <div className="page">
      <Link to="/notes" className="back-link">← All notes</Link>

      <header className="page-header">
        <span className="eyebrow">
          {post.date} · {minutes} min read
        </span>
        <h1>{post.title}</h1>
        <div className="blog-tags">
          {post.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      </header>

      <div className="blog-body">
        {post.body.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}
