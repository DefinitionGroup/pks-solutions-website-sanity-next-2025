import { stegaClean } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";

// Plain text of a Portable Text block, without Sanity's invisible preview markers
export function blockText(block: PortableTextBlock): string {
  const children = (block.children ?? []) as { text?: string }[];
  return stegaClean(children.map((child) => child.text ?? "").join("")).trim();
}

// Stable anchor id for a heading; shared by the table of contents and the rendered heading
export function headingId(text: string): string {
  return stegaClean(text)
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function articleHeadings(content: PortableTextBlock[] = []) {
  return content
    .filter((block) => block._type === "block" && block.style === "h2")
    .map((block) => ({ id: headingId(blockText(block)), title: blockText(block) }))
    .filter((heading) => heading.title.length > 0);
}

// About 200 words per minute for German technical text, never below one minute
export function readingMinutes(wordCount?: number): number | null {
  if (!wordCount || wordCount < 1) return null;
  return Math.max(1, Math.round(wordCount / 200));
}

export function formatDateDe(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
}
