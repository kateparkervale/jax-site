import Link from "next/link";
import type { ContentMeta } from "@/lib/content";

interface ContentCardProps {
  item: ContentMeta;
  section: string;
}

export default function ContentCard({ item, section }: ContentCardProps) {
  return (
    <Link
      href={`/${section}/${item.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <article
        className="content-card"
        style={{
          background: "var(--color-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "10px",
          padding: "1.75rem",
          marginBottom: "1.25rem",
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        <style>{`
          .content-card:hover {
            border-color: var(--color-accent) !important;
            box-shadow: 0 0 16px var(--color-accent-dim) !important;
          }
        `}</style>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "0.5rem",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--color-text)",
            }}
          >
            {item.title}
          </h3>
          {item.date && (
            <time
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.85rem",
                color: "var(--color-text-muted)",
                flexShrink: 0,
              }}
            >
              {item.date}
            </time>
          )}
        </div>
        {item.description && (
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--color-text-muted)",
              marginBottom: item.tags ? "0.75rem" : 0,
            }}
          >
            {item.description}
          </p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {item.tags.map((tag) => (
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
      </article>
    </Link>
  );
}
