import type { Metadata } from "next";
import Link from "next/link";
import { ServiceHeroImageDesktop, ServiceHeroImageMobile } from "@/components/ServiceHeroImage";
import { cities } from "@/content/cities";
import { getWebdesignPosts } from "@/content/blog";
import BlogNav from "@/components/blog/BlogNav";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";
import ReviewBadges from "@/components/ReviewBadges";

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  title: "Webdesign-Agentur für Mittelstand · Webseite & Landingpage",
  description:
    "Webdesign für Mittelstand: Unternehmenswebsite, Landingpage und Webseiten-Relaunch — konvertierend, KI-empfehlbar, in 7 Tagen live. Die WSM-Methode.",
  alternates: { canonical: "/webdesign" },
  openGraph: {
    title: "Webdesign-Agentur für Mittelstand",
    description:
      "Unternehmenswebsite, Landingpage und Relaunch — konvertierend und KI-empfehlbar.",
    type: "website",
  },
};

export default function WebdesignHubPage() {
  const wdPosts = getWebdesignPosts(4);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Webdesign für Mittelstand",
    serviceType: "Webdesign & Webentwicklung",
    provider: { "@id": `${SITE}#organization` },
    areaServed: { "@type": "Country", name: "Deutschland" },
    description:
      "Unternehmenswebsite, Landingpage und Webseiten-Relaunch für Mittelstand — Next.js, KI-empfehlbar, mit Schema.org, live in 7 Tagen.",
    audience: { "@type": "BusinessAudience", audienceType: "Mittelstand DACH" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Webdesign", item: `${SITE}/webdesign` },
    ],
  };

  const faqs = [
    {
      q: "Was unterscheidet eine Unternehmenswebsite von einer Landingpage?",
      a: "Eine Unternehmenswebsite hat mehrere Unterseiten (Startseite, Über uns, Leistungen, Kontakt, …) — sie repräsentiert dich vollständig im Netz. Eine Landingpage ist eine einzelne Seite mit einem klaren Ziel (Anfrage, Buchung, Download). Für die meisten Mittelständler ist eine Unternehmenswebsite die richtige Basis, eine Landingpage ergänzt sie für Kampagnen.",
    },
    {
      q: "Wann brauche ich einen Webseiten-Relaunch?",
      a: "Wenn deine bestehende Seite langsam ist, mobil nicht funktioniert, sich technisch nicht mehr warten lässt (typisch alte WordPress-Setups mit Plugin-Wildwuchs) oder optisch nicht mehr zu dir passt. Ein Relaunch ist oft effizienter als endloses Flickwerk — wir sagen ehrlich im Erstgespräch, ob du wirklich einen brauchst.",
    },
    {
      q: "Wie lange dauert eine neue Webseite?",
      a: "Die WSM-Methode hat einen festen Rhythmus: Tag 1–3 Fundament (Positionierung, Audit), Tag 4–7 Webseite live. Danach läuft die KI-Indexierung über Tag 8–90. Insgesamt 90 Tage bis zu spürbarer Sichtbarkeit auf Google und KIs.",
    },
    {
      q: "Was kostet eine Webseite bei euch?",
      a: "Wir bieten Unternehmenswebsite, Landingpage und Relaunch als einmalige Leistungen. Komplette Preisübersicht im Konfigurator auf der Preise-Seite. Die konkrete Investition stimmen wir transparent im 15-Minuten-Erstgespräch ab.",
    },
    {
      q: "Welche Technologie nutzt ihr?",
      a: "Next.js (React) und Vercel — aktueller Stand der Technik für schnelle, KI-empfehlbare Webseiten. Plus: vollständiges Schema.org-Markup, llms.txt für KI-Crawler, Core Web Vitals grün, mobile-first.",
    },
    {
      q: "Gibt es eine Garantie auf das Ergebnis?",
      a: "Ja. Wenn die vereinbarten Ziele nach 90 Tagen nicht erreicht sind, arbeiten wir ohne Mehrkosten weiter, bis sie erreicht sind. Voraussetzung: du hältst dich an die strategischen Empfehlungen und das im Erstgespräch vereinbarte Setup.",
    },
    {
      q: "Macht ihr auch Wartung?",
      a: "Ja. Wir bieten laufende Webseiten-Wartung — Sicherheit, Updates, Backups, kleine Content-Anpassungen. Sinnvoll, wenn du dich nicht selbst um Technik kümmern willst und auf eine zuverlässig laufende Seite zählen musst.",
    },
    {
      q: "Was, wenn ich nur die Webseite ohne KI-Sichtbarkeit will?",
      a: "Geht — wir bauen die Webseite trotzdem auf KI-empfehlbarem Standard (Schema.org, sauberes Markup, llms.txt). Wenn du später KI-Sichtbarkeit oder SEO als Service dazu nimmst, ist die technische Basis schon da.",
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
            <span className="text-[var(--text)]">Webdesign</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-semibold text-[var(--accent)]">Service</span>
                <span className="text-[var(--text-subtle)]">·</span>
                Webseite, Landingpage, Relaunch
              </div>

              <h1 className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.02] tracking-[-0.04em] text-[var(--text)]" style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)" }}>
                Webdesign für{" "}
                <span className="relative inline-block">
                  <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Mittelstand</span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 240 12" fill="none" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 8C 60 2, 120 10, 180 5 S 230 7, 238 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                Unternehmenswebsite, Landingpage und Relaunch —{" "}
                <span className="font-semibold text-[var(--text)]">konvertierend, KI-empfehlbar, in 7 Tagen live</span>.
              </p>

              <ServiceHeroImageMobile src="/hero/webdesign.webp" alt="Webdesign für Mittelstand — Wohlstandsmarketing" />

              <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3">
                <Link href="/#strategie" aria-label="Erstgespräch zu Webdesign sichern" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]">
                  <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Erstgespräch sichern</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link href="/preise" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--border-strong)] bg-white/70 px-7 py-4 text-[15px] font-medium text-[var(--text)] backdrop-blur transition hover:border-transparent">
                  <span className="absolute inset-0 -z-0 translate-x-[-101%] bg-[var(--text)] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative z-10 transition-colors group-hover:text-white">Angebot ansehen</span>
                </Link>
              </div>

              <p className="mt-7 text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)] sm:text-[12px]">15-Min Erstgespräch · Kostenfrei · Albert Ipgefer persönlich</p>

              {/* Mobile/iPad Hero-Erweiterung */}
              <div className="mt-5 w-full lg:hidden">
                <ReviewBadges variant="pill" centerOnMobile />
              </div>
              <ul className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 text-left text-[13.5px] leading-relaxed text-[var(--text)] sm:text-[14.5px] lg:hidden">
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Bekomme eine Webseite</strong>, die in 7 Tagen live geht — keine Agentur-Hängepartien.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Werde lokal gefunden</strong> und in KI-Antworten empfohlen — nicht nur „hübsch“, sondern strukturell richtig gebaut.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Erfahre</strong>, wie deine Webseite zur Lead-Maschine wird — statt teurer digitaler Visitenkarte.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Spare dir das Lehrgeld</strong>, das andere bei falschen Agenturen oder Selbst-Basteln zahlen.</span></li>
              </ul>
              <div className="mx-auto mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 lg:hidden">
                <Link href="/#strategie" aria-label="Webdesign — unverbindliches Erstgespräch sichern" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]">
                  <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Jetzt unverbindliches Erstgespräch sichern</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <p className="text-center text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">15-Min · Kostenfrei · Albert persönlich</p>
              </div>
            </div>

            <ServiceHeroImageDesktop src="/hero/webdesign.webp" alt="Webdesign für Mittelstand — Wohlstandsmarketing" />
          </div>
        </div>
      </section>

      {/* ── DREI WEBSEITEN-ANGEBOTE ──────────────────────────────── */}
      <section className="bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Drei Wege zur richtigen Webseite</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Unternehmenswebsite, Landingpage, Relaunch
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {[
              { title: "Unternehmenswebsite", desc: "Vollständige Webseite mit mehreren Unterseiten — Startseite, Über uns, Leistungen, Kontakt und mehr. Die Basis deiner gesamten Online-Sichtbarkeit.", cta: "Mehr erfahren", href: "/preise" },
              { title: "Landingpage", desc: "Konvertierende OnePage für ein klares Ziel: Anfrage, Buchung, Download. Live in 7 Tagen — perfekt für Kampagnen oder den schnellen Marktstart.", cta: "Mehr erfahren", href: "/preise" },
              { title: "Webseiten-Relaunch", desc: "Vollständiger Neubau deiner bestehenden Webseite — auf modernem Stack, mobile-first, KI-empfehlbar. Wenn deine alte Seite nicht mehr passt.", cta: "Zum Relaunch-Service", href: "/relaunch" },
            ].map((s) => (
              <div key={s.title} className="flex flex-col rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] sm:p-8">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--text)] sm:text-2xl">{s.title}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">{s.desc}</p>
                <Link href={s.href} className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] hover:underline">
                  {s.cta} →
                </Link>
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
            Die WSM-Methode in 90 Tagen
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {[
              { no: "01", days: "Tag 1 – 3", title: "Fundament", desc: "Positionierung, Audit, Money-Keyword-Cluster — wir verstehen, gegen wen du antrittst." },
              { no: "02", days: "Tag 4 – 7", title: "Auftritt", desc: "Design, Copy, Development. Deine neue Webseite ist nach 7 Tagen live." },
              { no: "03", days: "Tag 8 – 90", title: "KI-Indexierung", desc: "Schema, AEO-Content, Quotability. Du wirst auf Google, ChatGPT, Perplexity und Claude empfohlen." },
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
            context="Webdesign · 15-Min · Kostenfrei"
            headline={<>Klingt das nach dem, <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">was du suchst</span>?</>}
            subline="15-Min-Erstgespräch mit Albert — ehrlich, konkret, mit klarem nächsten Schritt. Auch wenn wir nicht zusammenarbeiten."
          />
        </div>
      </section>

      {/* ── STÄDTE-GRID ──────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Standorte</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Webdesign in deiner Stadt
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Lokal verankert für {cities.length} DACH-Regionen:
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/webdesign/${c.slug}`} className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_4px_20px_-6px_rgba(10,10,10,0.06)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_10px_36px_-10px_rgba(22,99,222,0.25)] md:p-7">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--text-subtle)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      {c.region}
                    </div>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-[var(--text)] md:text-[26px]">
                      Webdesign {c.name}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]">
                      {c.intro.length > 130 ? c.intro.slice(0, 127) + "…" : c.intro}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[13px] font-semibold text-[var(--accent)]">
                    <span>Zur Stadt-Seite</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CROSS-LINK ───────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">Weitere Services</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            Webseite + KI-Sichtbarkeit + SEO aus einer Hand
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/vergleich/landingpage-vs-unternehmenswebsite" className="group inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/[0.06] px-5 py-2.5 text-[14px] font-semibold text-[var(--gold-text)] transition hover:border-transparent hover:bg-[var(--gold-text)] hover:text-white">Landingpage oder Website?<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/vergleich/relaunch-vs-neue-webseite" className="group inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/[0.06] px-5 py-2.5 text-[14px] font-semibold text-[var(--gold-text)] transition hover:border-transparent hover:bg-[var(--gold-text)] hover:text-white">Relaunch oder neu bauen?<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/ki-sichtbarkeit" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">KI-Sichtbarkeit<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/seo" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">SEO-Optimierung<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/relaunch" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Webseiten-Relaunch<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/preise" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Angebot<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── BLOG-CLUSTER ─────────────────────────────────────────── */}
      {wdPosts.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Wissensbasis</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">Tiefer einsteigen ins Thema Webdesign</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {wdPosts.map((p) => (
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
            Webdesign — was du wissen willst
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
        headline={<>Bereit für deine <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">neue Webseite</span>?</>}
        subline="15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung deines Vorhabens — auch wenn wir nicht zusammenarbeiten."
      />

      <Footer />
    </main>
  );
}
