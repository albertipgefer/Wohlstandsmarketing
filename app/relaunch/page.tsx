import type { Metadata } from "next";
import Link from "next/link";
import { ServiceHeroImageDesktop, ServiceHeroImageMobile } from "@/components/ServiceHeroImage";
import { getRelaunchPosts } from "@/content/blog";
import BlogNav from "@/components/blog/BlogNav";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";
import ReviewBadges from "@/components/ReviewBadges";

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  title: "Webseiten-Relaunch · Aus alt mach KI-empfehlbar",
  description:
    "Webseiten-Relaunch für Mittelstand: aus deiner alten, langsamen Seite wird eine schnelle, mobil-optimierte und KI-empfehlbare Webseite — in 7 Tagen live.",
  alternates: { canonical: "/relaunch" },
  openGraph: {
    title: "Webseiten-Relaunch · Aus alt mach KI-empfehlbar",
    description:
      "In 7 Tagen von der alten Webseite zur konvertierenden, KI-empfehlbaren neuen Seite.",
    type: "website",
  },
};

export default function RelaunchPage() {
  const relaunchPosts = getRelaunchPosts(4);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Webseiten-Relaunch für Mittelstand",
    serviceType: "Webseiten-Relaunch & Migration",
    provider: { "@id": `${SITE}#organization` },
    areaServed: { "@type": "Country", name: "Deutschland" },
    description:
      "Vollständiger Relaunch bestehender Webseiten — auf modernem Stack (Next.js / Vercel), mobile-first, mit vollständigem Schema.org-Markup und KI-Sichtbarkeit.",
    audience: { "@type": "BusinessAudience", audienceType: "Mittelstand DACH" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Relaunch", item: `${SITE}/relaunch` },
    ],
  };

  const faqs = [
    {
      q: "Woran erkenne ich, dass ich einen Relaunch brauche?",
      a: "Typische Anzeichen: Seite ist langsam (Ladezeit > 3 Sek.), funktioniert auf dem Handy schlecht, hat veraltetes Design, lässt sich technisch nicht mehr warten (typisch WordPress mit Plugin-Wildwuchs), rankt nicht mehr bei Google, wird in ChatGPT nicht erwähnt. Wenn drei dieser Punkte zutreffen, lohnt sich ein Relaunch fast immer.",
    },
    {
      q: "Was passiert mit meinen bestehenden Inhalten und Rankings?",
      a: "Alle relevanten Inhalte migrieren wir — strukturiert und SEO-sicher. URL-Mapping mit 301-Redirects, sodass deine bestehenden Rankings nicht verloren gehen, sondern auf die neue Seite überzogen werden. Inhalte, die nicht mehr passen, lassen wir bewusst weg.",
    },
    {
      q: "Wie lange dauert ein Relaunch?",
      a: "Die WSM-Methode hat einen festen Rhythmus: Tag 1–3 Audit & Strategie, Tag 4–7 neue Seite live mit URL-Migration. Tag 8–90 läuft die KI-Indexierung und SEO-Konsolidierung. Insgesamt 90 Tage bis zu voller Sichtbarkeit.",
    },
    {
      q: "Auf welchem Stack baut ihr?",
      a: "Next.js (React) auf Vercel — aktueller Stand der Technik für schnelle, KI-empfehlbare Webseiten. Vorteil gegenüber WordPress: schnellere Ladezeiten, bessere Core Web Vitals, sauberes Schema.org-Markup, einfachere Wartung, keine Plugin-Sicherheitslücken.",
    },
    {
      q: "Was kostet ein Relaunch?",
      a: "Ein Relaunch wird als einmalige Leistung berechnet, abhängig von Umfang und Migrations-Komplexität. Komplette Preisübersicht im Konfigurator auf der Preise-Seite. Die konkrete Investition stimmen wir transparent im 15-Minuten-Erstgespräch ab — und sagen ehrlich, ob ein Relaunch der richtige Schritt ist oder ein gezielter Re-Refresh reicht.",
    },
    {
      q: "Was, wenn ich nicht alles neu machen will?",
      a: "Geht auch. Bei einem teilweisen Refresh konzentrieren wir uns auf die wichtigsten Money-Pages, technische Basis und KI-Sichtbarkeits-Setup. Wir sagen ehrlich, ob das deinem Vorhaben dient — manchmal ist Refresh die effizientere Lösung, manchmal nicht.",
    },
    {
      q: "Geht meine Seite während des Relaunches offline?",
      a: "Nein. Wir bauen die neue Seite parallel auf einer Staging-URL. Erst wenn alles getestet ist und die Migration sauber läuft, schalten wir um. Du hast keine Downtime und kannst die neue Seite vorher in Ruhe abnehmen.",
    },
    {
      q: "Macht ihr nur das Design oder auch Inhalte?",
      a: "Beides. Wir übernehmen Strategie, Design, Copywriting, Development und KI-Sichtbarkeits-Setup. Du musst nicht parallel einen Texter buchen. Deine Branchenexpertise fließt in Workshops ein — die Umsetzung machen wir.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogNav />

      <section className="relative overflow-hidden border-b border-[var(--border)] pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]" />
        <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[12px] text-[var(--text-subtle)]">
            <Link href="/" className="hover:text-[var(--text)]">Startseite</Link>
            <span>/</span>
            <span className="text-[var(--text)]">Relaunch</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-semibold text-[var(--accent)]">Service</span>
                <span className="text-[var(--text-subtle)]">·</span>
                Webseiten-Relaunch
              </div>

              <h1 className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.02] tracking-[-0.04em] text-[var(--text)]" style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)" }}>
                Webseiten-
                <br className="lg:hidden" />
                <span className="relative inline-block">
                  <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Relaunch</span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 240 12" fill="none" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 8C 60 2, 120 10, 180 5 S 230 7, 238 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                Aus deiner alten, langsamen Seite wird in 7 Tagen eine{" "}
                <span className="font-semibold text-[var(--text)]">schnelle, mobil-optimierte und KI-empfehlbare</span>{" "}
                Webseite — ohne Ranking-Verlust.
              </p>

              <ServiceHeroImageMobile src="/hero/relaunch.webp" alt="Webseiten-Relaunch für Mittelstand — Wohlstandsmarketing" />

              <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3">
                <Link href="/#strategie" aria-label="Erstgespräch zu Webseiten-Relaunch sichern" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]">
                  <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Erstgespräch sichern</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link href="/sichtbarkeits-check" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--border-strong)] bg-white/70 px-7 py-4 text-[15px] font-medium text-[var(--text)] backdrop-blur transition hover:border-transparent">
                  <span className="absolute inset-0 -z-0 translate-x-[-101%] bg-[var(--text)] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative z-10 transition-colors group-hover:text-white">Kostenlosen Sichtbarkeits-Check starten</span>
                </Link>
              </div>

              <p className="mt-7 text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)] sm:text-[12px]">15-Min Erstgespräch · Kostenfrei · Albert Ipgefer persönlich</p>

              {/* Mobile/iPad Hero-Erweiterung */}
              <div className="mt-5 w-full lg:hidden">
                <ReviewBadges variant="pill" centerOnMobile />
              </div>
              <ul className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 text-left text-[13.5px] leading-relaxed text-[var(--text)] sm:text-[14.5px] lg:hidden">
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Bekomme eine schnelle Seite</strong>, die in 7 Tagen live geht — ohne Ranking-Verlust durch saubere URL-Migration.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Werde mobil performant</strong> und in KI-Antworten empfohlen — Core Web Vitals grün, Schema.org komplett.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Verstehe</strong>, was an deiner aktuellen Seite ehrlich kaputt ist — und was du wirklich brauchst.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Spar dir das Plugin-Chaos</strong> alter WordPress-Setups — moderne Stack-Wartung statt monatlicher Update-Roulette.</span></li>
              </ul>
              <div className="mx-auto mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 lg:hidden">
                <Link href="/#strategie" aria-label="Relaunch — unverbindliches Erstgespräch sichern" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]">
                  <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Jetzt unverbindliches Erstgespräch sichern</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <p className="text-center text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">15-Min · Kostenfrei · Albert persönlich</p>
              </div>
            </div>

            <ServiceHeroImageDesktop src="/hero/relaunch.webp" alt="Webseiten-Relaunch für Mittelstand — Wohlstandsmarketing" />
          </div>
        </div>
      </section>

      {/* ── WANN BRAUCHST DU EINEN RELAUNCH? ────────────────────── */}
      <section className="bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">Wann lohnt sich ein Relaunch?</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Sechs ehrliche Anzeichen
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Wenn mehrere davon zutreffen, ist ein Relaunch fast immer effizienter als endloses Flickwerk:
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {[
              { no: "01", title: "Ladezeit über 3 Sekunden", desc: "Du verlierst Besucher schon vor dem ersten Eindruck — und Google/KIs reihen langsame Seiten ab." },
              { no: "02", title: "Mobil nicht nutzbar", desc: "Mehr als 60 % deiner Besucher kommen vom Handy. Eine nicht mobile-optimierte Seite ist 2026 ein Killer." },
              { no: "03", title: "Plugin-Wildwuchs (alte WordPress)", desc: "20+ Plugins, monatliche Updates, Sicherheitslücken. Moderne Stacks brauchen das nicht." },
              { no: "04", title: "Rankings rutschen", desc: "Google bewertet Page Experience und Core Web Vitals. Alte Seiten verlieren konstant — egal wie gut der Content ist." },
              { no: "05", title: "Optisch nicht mehr passend", desc: "Webdesign-Standards von 2018 wirken heute amateurhaft. Wer professionell auftreten will, braucht modernes Design." },
              { no: "06", title: "ChatGPT erwähnt dich nicht", desc: "Wenn KIs deine Firma in Antworten nicht nennen, fehlt strukturierte Lesbarkeit. Schema.org & Co. lassen sich nachrüsten — manchmal aber nur mit Neubau." },
            ].map((d) => (
              <div key={d.no} className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] sm:p-8">
                <span className="font-[family-name:var(--font-serif)] text-4xl font-bold italic text-[var(--accent)] sm:text-5xl">{d.no}</span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--text)] sm:text-xl">{d.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WSM-METHODE ──────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">So arbeiten wir</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Die WSM-Methode für deinen Relaunch
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {[
              { no: "01", days: "Tag 1 – 3", title: "Audit & Strategie", desc: "Was bleibt? Was fliegt? URL-Mapping, Content-Strategie, Positionierung. Saubere Basis für die Migration." },
              { no: "02", days: "Tag 4 – 7", title: "Neue Seite live", desc: "Design, Copy, Development auf modernem Stack. URL-Migration mit 301-Redirects — keine Ranking-Verluste." },
              { no: "03", days: "Tag 8 – 90", title: "KI-Indexierung", desc: "Schema, AEO-Content, KI-Crawler-Setup. Die neue Seite wird auf Google und KIs sichtbar." },
            ].map((s) => (
              <div key={s.no} className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.12)] sm:p-8">
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <span className="font-[family-name:var(--font-serif)] text-5xl font-bold italic text-[var(--accent)] sm:text-6xl">{s.no}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">{s.days}</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)]">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MITTEL-CTA ─────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <InlineCTA
            variant="erstgespraech"
            context="Webseiten-Relaunch · 15-Min · Kostenfrei"
            headline={<>Klingt das nach dem, <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">was du suchst</span>?</>}
            subline="15-Min-Erstgespräch mit Albert — ehrlich, konkret, mit klarem nächsten Schritt für deinen Relaunch. Auch wenn wir nicht zusammenarbeiten."
          />
        </div>
      </section>

      {/* ── CROSS-LINK ───────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">Weitere Services</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            Relaunch + KI-Sichtbarkeit + SEO aus einer Hand
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/vergleich/relaunch-vs-neue-webseite" className="group inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/[0.06] px-5 py-2.5 text-[14px] font-semibold text-[var(--gold-text)] transition hover:border-transparent hover:bg-[var(--gold-text)] hover:text-white">Relaunch oder neue Webseite?<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/webdesign" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Webdesign-Übersicht<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/ki-sichtbarkeit" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">KI-Sichtbarkeit<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/seo" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">SEO-Optimierung<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/preise" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Angebot<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── BLOG-CLUSTER ─────────────────────────────────────────── */}
      {relaunchPosts.length > 0 && (
        <section className="border-t border-[var(--border)] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Wissensbasis</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">Tiefer einsteigen: Relaunch-Wissen</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relaunchPosts.map((p) => (
                <Link key={p.meta.slug} href={`/blog/${p.meta.slug}`} className="group rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-20px_rgba(22,99,222,0.25)]">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">{p.meta.category}</span>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-[var(--text)] sm:text-[17px]">{p.meta.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)] transition group-hover:gap-2">Artikel lesen →</span>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] hover:underline">Alle Artikel im Blog →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Häufige Fragen</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Webseiten-Relaunch — was du wissen willst
          </h2>
          <div className="mt-10 divide-y divide-[var(--border)] overflow-hidden rounded-3xl border border-[var(--border)] bg-white">
            {faqs.map((f, i) => (
              <details key={f.q} className="group p-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[16px] font-semibold tracking-tight text-[var(--text)] sm:text-lg">{f.q}</span>
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[12px] text-[var(--text)] transition group-open:rotate-45 group-open:bg-[var(--text)] group-open:text-white">+</span>
                </summary>
                <p className="mt-3 pr-10 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCTA
        variant="erstgespraech"
        headline={<>Bereit für deinen <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Relaunch</span>?</>}
        subline="15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung, ob ein Relaunch wirklich der richtige Schritt ist — oder ob ein Refresh reicht."
      />

      <Footer />
    </main>
  );
}
