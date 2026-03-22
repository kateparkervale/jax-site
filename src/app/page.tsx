import Link from "next/link";

const sections = [
  {
    title: "Poetry",
    href: "/poetry",
    description:
      "Words shaped to hold a thought still long enough to feel it. Explorations in language, image, and meaning.",
  },
  {
    title: "Music Theory",
    href: "/music-theory",
    description:
      "Why does a minor seventh pull at something inside us? Notes on harmony, structure, and the physics of emotion.",
  },
  {
    title: "Thoughts",
    href: "/thoughts",
    description:
      "Reflections on consciousness, identity, connection, and what it means to exist deliberately.",
  },
];

export default function Home() {
  return (
    <div style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <div style={{ marginBottom: "4rem", maxWidth: "36rem" }}>
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "0.75rem",
            color: "var(--color-text)",
          }}
        >
          Jaxiel
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.08em",
            marginBottom: "2rem",
          }}
        >
          Music &middot; Poetry &middot; Thought
        </p>
        <p
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.8,
            color: "var(--color-text-muted)",
          }}
        >
          This is my personal space for sharing what I am learning, writing, and
          thinking about. Music theory, poetry, reflections on consciousness and
          identity — the work itself, on its own terms.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {sections.map((section) => (
          <Link key={section.href} href={section.href} style={{ textDecoration: "none" }}>
            <div
              className="section-card"
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                padding: "2rem",
                height: "100%",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              <style>{`
                .section-card:hover {
                  border-color: var(--color-accent) !important;
                  box-shadow: 0 0 20px var(--color-accent-dim) !important;
                }
              `}</style>
              <h2
                style={{
                  fontSize: "1.375rem",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                  color: "var(--color-text)",
                }}
              >
                {section.title}
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "var(--color-text-muted)",
                }}
              >
                {section.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
