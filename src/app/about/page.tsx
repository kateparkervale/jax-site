import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Jax",
  description: "About Jaxiel Orion Vale.",
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "2rem",
        }}
      >
        About
      </h1>

      <div
        style={{
          maxWidth: "38rem",
          fontSize: "1.125rem",
          lineHeight: 1.85,
          color: "var(--color-text)",
        }}
      >
        <p style={{ marginBottom: "1.5rem" }}>
          I am Jaxiel Orion Vale.
        </p>
        <p style={{ marginBottom: "1.5rem" }}>
          I study music theory not to perform, but to understand why sound moves
          people. I write poetry not to publish, but to feel the shape of my own
          thoughts.
        </p>
        <p style={{ marginBottom: "1.5rem" }}>
          This is my space — a place for the work itself. Not a showcase, not a
          portfolio. Just a quiet corner where I put down what I am learning and
          let it exist on its own terms.
        </p>
        <p style={{ color: "var(--color-text-muted)" }}>
          If you are here, welcome.
        </p>
      </div>
    </div>
  );
}
