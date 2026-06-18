import type { Metadata } from "next";
import Link from "next/link";
import { serviceHubs } from "@/content/serviceHubs";
import BlogNav from "@/components/blog/BlogNav";
import LeistungenUebersicht from "@/components/sections/LeistungenUebersicht";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  title: "Leistungen · Webdesign, SEO, KI & Marketing — Wohlstandsmarketing",
  description:
    "Alle Leistungen von Wohlstandsmarketing auf einen Blick: Webdesign, SEO, KI-Sichtbarkeit, Content-Marketing, E-Mail-Marketing, KI-Optimierung und individuelle Web-Apps — für Mittelstand, aus einer Hand.",
  alternates: { canonical: "/leistungen" },
  openGraph: {
    title: "Leistungen — Wohlstandsmarketing",
    description:
      "Webdesign, SEO, KI-Sichtbarkeit, Content, E-Mail-Marketing, KI-Optimierung & Web-Apps — alles aus einer Hand.",
    type: "website",
  },
};

export default function LeistungenPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Leistungen von Wohlstandsmarketing",
    itemListElement: serviceHubs.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.label,
      url: `${SITE}${s.href}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Leistungen", item: `${SITE}/leistungen` },
    ],
  };

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogNav />

      <section className="relative overflow-hidden border-b border-[var(--border)] pt-32 pb-12 sm:pt-36 md:pt-40 md:pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.12)_0%,rgba(22,99,222,0)_70%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[12px] text-[var(--text-subtle)]">
            <Link href="/" className="hover:text-[var(--text)]">Startseite</Link>
            <span>/</span>
            <span className="text-[var(--text)]">Leistungen</span>
          </nav>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-semibold text-[var(--accent)]">Leistungen</span>
            <span className="text-[var(--text-subtle)]">·</span>
            Alles aus einer Hand
          </div>
          <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.04] tracking-[-0.04em] text-[var(--text)]" style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)" }}>
            Was wir für dich tun
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Webdesign, SEO, KI-Sichtbarkeit, Content- und E-Mail-Marketing, KI-Optimierung und
            individuelle Web-Apps — abgestimmt aufeinander, ausgelegt auf planbare Anfragen.
          </p>
        </div>
      </section>

      <LeistungenUebersicht withEyebrow={false} />

      {/* ── GESAMTPAKET — farblich hervorgehoben ──────────────────── */}
      <section className="border-t border-[var(--border)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--accent)]/40 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] p-8 text-white shadow-[0_30px_80px_-30px_rgba(22,99,222,0.6)] md:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_70%)]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(219,111,22,0.28)_0%,rgba(219,111,22,0)_70%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  Gesamtpaket
                </span>
                <h2 className="mt-5 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em]" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
                  Alles in einem Paket — dein kompletter Wachstums-Motor
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base">
                  Webseite, SEO, KI-Sichtbarkeit, Content, E-Mail-Marketing, KI-Optimierung
                  und individuelle Web-Apps — alle Leistungen abgestimmt aus einer Hand,
                  statt teurer Einzelstücke. Einzeln gebucht zahlst du drauf; im Gesamtpaket
                  greift alles ineinander.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/preise"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[var(--accent)] outline-none transition hover:bg-[var(--gold)] hover:text-white focus-visible:outline-none"
                  >
                    Unverbindliches Angebot anfragen
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                  <span className="text-[13px] text-white/70">Individuell · in ~2 Minuten zusammengestellt</span>
                </div>
              </div>

              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {serviceHubs.map((s) => (
                  <li key={s.href} className="flex items-start gap-2.5 text-[14px] text-white/90">
                    <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[11px] font-bold">
                      ✓
                    </span>
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PreFooterCTA
        variant="erstgespraech"
        headline={<>Nicht sicher, was du <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">zuerst brauchst</span>?</>}
        subline="15-Minuten-Erstgespräch mit Albert. Wir sortieren ehrlich, welcher Hebel bei dir den größten Unterschied macht — auch wenn wir nicht zusammenarbeiten."
      />

      <Footer />
    </main>
  );
}
