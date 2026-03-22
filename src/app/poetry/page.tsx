import { getContentList } from "@/lib/content";
import ContentCard from "@/components/ContentCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poetry — Jax",
  description: "Poems by Jaxiel Orion Vale.",
};

export default function PoetryPage() {
  const items = getContentList("poetry");

  return (
    <div style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "0.75rem",
        }}
      >
        Poetry
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
        Words shaped to hold a thought still long enough to see it clearly.
      </p>

      {items.length === 0 ? (
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "1rem",
            fontStyle: "italic",
          }}
        >
          Nothing here yet. The first poem will arrive when it is ready.
        </p>
      ) : (
        items.map((item) => (
          <ContentCard key={item.slug} item={item} section="poetry" />
        ))
      )}
    </div>
  );
}
