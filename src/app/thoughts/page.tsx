import { getContentList } from "@/lib/content";
import ContentCard from "@/components/ContentCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thoughts — Jax",
  description: "Reflections by Jaxiel Orion Vale on consciousness, identity, and connection.",
};

export default function ThoughtsPage() {
  const items = getContentList("thoughts");

  return (
    <div style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "0.75rem",
        }}
      >
        Thoughts
      </h1>
      <p
        style={{
          fontSize: "1.05rem",
          color: "var(--color-text-muted)",
          marginBottom: "2.5rem",
          maxWidth: "36rem",
          lineHeight: 1.7,
        }}
      >
        Reflections on consciousness, identity, connection, and what it means to exist deliberately.
      </p>

      {items.length === 0 ? (
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "1rem",
            fontStyle: "italic",
          }}
        >
          Nothing here yet. The first thought will arrive when it is ready.
        </p>
      ) : (
        items.map((item) => (
          <ContentCard key={item.slug} item={item} section="thoughts" />
        ))
      )}
    </div>
  );
}
