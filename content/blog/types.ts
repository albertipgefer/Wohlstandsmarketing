import type { ReactNode } from "react";

export type FAQ = { q: string; a: string };

export type TOCEntry = { id: string; label: string };

export type PostMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  /** Highlight word inside the title (Playfair italic + orange underline) */
  highlight?: string;
  excerpt: string;
  /** ISO date string */
  date: string;
  readingTime: string;
  category: string;
  /** Cover gradient direction + colors for SVG-generated cover */
  cover: {
    from: string;
    to: string;
    label: string;
  };
  /** Keywords used for meta + AEO */
  keywords: string[];
  toc: TOCEntry[];
  faq: FAQ[];
  /** SEO description (max ~160 chars) */
  description: string;
  /** Popularity score 0-100 — used for the "Beliebteste"-Sort filter */
  popularity?: number;
};

export type Post = {
  meta: PostMeta;
  default: () => ReactNode;
};
