import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
}

export interface ContentPiece extends ContentMeta {
  contentHtml: string;
}

export function getContentList(section: string): ContentMeta[] {
  const sectionDir = path.join(contentDirectory, section);

  if (!fs.existsSync(sectionDir)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(sectionDir)
    .filter((name) => name.endsWith(".md"));

  const items: ContentMeta[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(sectionDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      description: data.description || "",
      tags: data.tags || undefined,
    };
  });

  return items.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getContentBySlug(
  section: string,
  slug: string
): Promise<ContentPiece | null> {
  const fullPath = path.join(contentDirectory, section, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    tags: data.tags || undefined,
    contentHtml,
  };
}

export function getAllSlugs(section: string): string[] {
  const sectionDir = path.join(contentDirectory, section);

  if (!fs.existsSync(sectionDir)) {
    return [];
  }

  return fs
    .readdirSync(sectionDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}
