import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import type { ContentPiece } from "@/lib/content";

interface ContentPageProps {
  piece: ContentPiece;
  backHref: string;
  backLabel: string;
}

export default function ContentPage({
  piece,
  backHref,
  backLabel,
}: ContentPageProps) {
  return (
    <article style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <Link
        href={backHref}
        style={{
          fontSize: "0.95rem",
          color: "var(--color-text-muted)",
          display: "inline-block",
          marginBottom: "2rem",
          transition: "color 0.2s ease",
        }}
        className="nav-link"
      >
        <style>{`
          .nav-link:hover { color: var(--color-accent) !important; }
        `}</style>
        &larr; {backLabel}
      </Link>

      <header style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: "0.75rem",
            color: "var(--color-text)",
          }}
        >
          {piece.title}
        </h1>
        {piece.date && (
          <time
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.9rem",
              color: "var(--color-text-muted)",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            {piece.date}
          </time>
        )}
        {piece.tags && piece.tags.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {piece.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-accent)",
                  background: "var(--color-accent-dim)",
                  padding: "0.15rem 0.6rem",
                  borderRadius: "4px",
                  fontFamily: "var(--font-mono), monospace",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(piece.contentHtml) }}
      />
    </article>
  );
}
