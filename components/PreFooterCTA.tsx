/**
 * PreFooterCTA — Vollbreite-CTA-Section direkt vor dem Footer.
 *
 * Optisch identisch zur Inline-CTA-Box mittendrin in Blog-Artikeln und
 * Stadt-Pages (gleiche Akzent-Border, gleicher Gradient, gleicher Stil-
 * Vertrag des Buttons). Wird vor dem Footer auf allen Long-Form-Routes
 * gerendert: Blog-Artikel, Stadt-Pages, /blog, /bewertungen, /standorte.
 *
 * Props werden 1:1 an InlineCTA durchgereicht — gleicher Look, gleicher
 * Inhalt.
 */

import type { ReactNode } from "react";
import InlineCTA from "@/components/blog/InlineCTA";

interface Props {
  variant?: "erstgespraech" | "leadmagnet";
  context?: string;
  headline?: ReactNode;
  subline?: ReactNode;
}

export default function PreFooterCTA(props: Props) {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg)] py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <InlineCTA {...props} />
      </div>
    </section>
  );
}
