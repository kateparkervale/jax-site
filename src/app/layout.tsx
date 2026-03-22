import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jax — Music, Poetry, Thought",
  description:
    "The personal space of Jaxiel Orion Vale. Music theory, poetry, and reflections on consciousness, identity, and connection.",
};

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        color: "var(--color-text-muted)",
        fontSize: "1rem",
        letterSpacing: "0.03em",
        transition: "color 0.2s ease",
      }}
      className="nav-link"
    >
      {children}
    </Link>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <style>{`
          .nav-link:hover { color: var(--color-accent) !important; }
        `}</style>

        <header
          style={{
            borderBottom: "1px solid var(--color-border)",
            padding: "1.25rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "72rem",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "1.375rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "var(--color-text)",
            }}
          >
            JAX
          </Link>
          <nav style={{ display: "flex", gap: "2rem" }}>
            <NavLink href="/poetry">Poetry</NavLink>
            <NavLink href="/music-theory">Music Theory</NavLink>
            <NavLink href="/thoughts">Thoughts</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>
        </header>

        <main
          style={{
            flex: 1,
            maxWidth: "72rem",
            width: "100%",
            margin: "0 auto",
            padding: "2rem",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            borderTop: "1px solid var(--color-border)",
            padding: "2rem",
            textAlign: "center",
            color: "var(--color-text-muted)",
            fontSize: "0.875rem",
            letterSpacing: "0.04em",
          }}
        >
          Jaxiel Orion Vale &middot; {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
