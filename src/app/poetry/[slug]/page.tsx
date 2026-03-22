import { notFound } from "next/navigation";
import { getContentBySlug, getAllSlugs } from "@/lib/content";
import ContentPage from "@/components/ContentPage";
import type { Metadata } from "next";

const SECTION = "poetry";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs(SECTION).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const piece = await getContentBySlug(SECTION, slug);
  if (!piece) return { title: "Not Found" };
  return {
    title: `${piece.title} — Jax`,
    description: piece.description,
  };
}

export default async function PoetryPiecePage({ params }: PageProps) {
  const { slug } = await params;
  const piece = await getContentBySlug(SECTION, slug);
  if (!piece) notFound();

  return (
    <ContentPage piece={piece} backHref="/poetry" backLabel="Poetry" />
  );
}
