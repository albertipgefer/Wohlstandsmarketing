import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import BlogNav from "@/components/blog/BlogNav";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  title: "Webdesign & KI-Sichtbarkeit nach Branche · Wohlstandsmarketing",
  description:
    "Webseite, SEO und KI-Sichtbarkeit — zugeschnitten auf deine Branche: Handwerk, Steuerberater, Arztpraxen, Maschinenbau, Immobilienmakler. In 90 Tagen sichtbar.",
  keywords: [
    "Webdesign nach Branche",
    "Webseite für Mittelstand",
    "Branchen-Webdesign",
    "KI-Sichtbarkeit Branche",
    "SEO für Mittelstand",
  ],
  alternates: { canonical: "/branchen" },
  openGraph: {
    title: "Webdesign & KI-Sichtbarkeit nach Branche",
    description:
      "Webseite, SEO und KI-Sichtbarkeit — zugeschnitten auf deine Branche. In 90 Tagen sichtbar auf Google und in der KI.",
    type: "website",
  },
};

export default function BranchenOverviewPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Branchen", item: `${SITE}/branchen` },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Branchen, für die Wohlstandsmarketing baut",
    itemListElement: industries.map((i, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `Webseite für ${i.name}`,
      url: `${SITE}/branchen/${i.slug}`,
    })),
  };

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <BlogNav />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--border)] pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]" />
        <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[12px] text-[var(--text-subtle)]">
            <Link href="/" className="hover:text-[var(--text)]">Startseite</Link>
            <span>/</span>
            <span className="text-[var(--text)]">Branchen</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-semibold text-[var(--accent)]">Branchen</span>
          </div>

          <h1
            className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.04] tracking-[-0.04em] text-[var(--text)]"
            style={{ fontSize: "clamp(2rem, 5.2vw, 3.5rem)" }}
          >
            Webseite, SEO & KI-Sichtbarkeit für{" "}
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              deine Branche
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Jede Branche hat eigene Kunden, eigene Suchanfragen und eigene Hürden. Wir bauen deinen Auftritt genau darauf zugeschnitten — und machen dich in 90 Tagen auf Google, ChatGPT, Perplexity und Claude sichtbar.
          </p>
        </div>
      </section>

      {/* ── BRANCHEN-GRID ──────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {industries.map((i) => (
              <div
                key={i.slug}
                className="flex flex-col rounded-3xl border border-[var(--border)] bg-white p-7 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.12)] sm:p-8"
              >
                <Link href={`/branchen/${i.slug}`} className="group">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] transition group-hover:text-[var(--accent)]">
                    {i.name}
                  </h2>
                </Link>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
                  {i.heroSubline}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/branchen/${i.slug}/${s.slug}`}
                      className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)]/50 px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--text-muted)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
                    >
                      {s.shortName}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/branchen/${i.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] transition hover:gap-2.5"
                >
                  Alles für {i.name} ansehen →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRE-FOOTER-CTA ─────────────────────────────────────── */}
      <PreFooterCTA
        variant="erstgespraech"
        headline={
          <>
            Deine Branche nicht dabei? <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Sprich mit uns.</span>
          </>
        }
        subline="Wir arbeiten mit Mittelstand aus allen Branchen. 15-Minuten-Erstgespräch mit Albert — kostenfrei und mit ehrlicher Einschätzung für dein Vorhaben."
      />

      <Footer />
    </main>
  );
}
