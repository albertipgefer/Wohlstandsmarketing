import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { cities } from "@/content/cities";
import BlogNav from "@/components/blog/BlogNav";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";
import ReviewBadges from "@/components/ReviewBadges";

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  title: "Content-Marketing für Mittelstand · SEO- & KI-optimierter Content",
  description:
    "Content-Marketing für Mittelstand: Themen- & Keyword-Strategie, redaktionell hochwertige Artikel (SEO- & GEO-optimiert), interne Verlinkung und Themen-Cluster — Inhalte, die bei Google ranken und von ChatGPT, Perplexity & Co. zitiert werden.",
  alternates: { canonical: "/content-marketing" },
  openGraph: {
    title: "Content-Marketing für Mittelstand",
    description:
      "Inhalte, die ranken und zitiert werden — und dich zur Autorität in deinem Markt machen.",
    type: "website",
  },
};

export default function ContentMarketingHubPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Content-Marketing für Mittelstand",
    serviceType: "Content-Marketing",
    provider: { "@id": `${SITE}#organization` },
    areaServed: { "@type": "Country", name: "Deutschland" },
    description:
      "Themen- und Keyword-Strategie, SEO- und GEO-optimierte Artikel, interne Verlinkung auf Money-Pages, Themen-Cluster und Redaktionsplan — Content, der bei Google rankt und von KI-Systemen zitiert wird.",
    audience: { "@type": "BusinessAudience", audienceType: "Mittelstand DACH" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Content-Marketing", item: `${SITE}/content-marketing` },
    ],
  };

  const faqs = [
    {
      q: "Wie schnell bringt Content-Marketing Ergebnisse?",
      a: "Content ist ein Vermögenswert, kein Strohfeuer: Erste Rankings siehst du oft nach einigen Wochen, die volle Wirkung baut sich über Monate auf. Dafür arbeitet ein einmal geschriebener Artikel danach dauerhaft für dich — ohne dass du pro Klick zahlst.",
    },
    {
      q: "Was ist der Unterschied zu klassischem SEO?",
      a: "SEO ist das Fundament (Technik, Struktur, Keywords), Content-Marketing ist der Inhalt, der darauf rankt und Vertrauen aufbaut. Beides greift ineinander — wir denken Content von Anfang an SEO- und KI-optimiert, damit er nicht nur gut klingt, sondern auch gefunden und zitiert wird.",
    },
    {
      q: "Schreibt ihr den Content mit KI?",
      a: "Wir nutzen KI als Werkzeug für Tempo und Recherche, aber jeder Artikel wird redaktionell geprüft, mit echtem Fachwissen angereichert und auf deine Marke abgestimmt. Reiner KI-Massentext rankt nicht und schadet dem Vertrauen — Qualität bleibt die Grundlage.",
    },
    {
      q: "Wie wählt ihr die Themen aus?",
      a: "Wir bauen eine Themen- und Keyword-Strategie entlang der Customer Journey (ToFu / MoFu / BoFu): von Inhalten, die Reichweite und Vertrauen schaffen, bis zu Artikeln, die direkt auf deine kaufstärksten Money-Pages einzahlen. So entsteht kein zufälliger Content, sondern ein System mit klarem Ziel.",
    },
    {
      q: "Wie messt ihr den Erfolg?",
      a: "Konkret: Rankings für die abgedeckten Keywords, organischer Traffic in der Search Console, Sichtbarkeit der Themen-Cluster, KI-Zitierungen — und wo messbar, die Anfragen, die über die Inhalte entstehen. Du bekommst klare Zahlen statt Bauchgefühl.",
    },
    {
      q: "Passt Content-Marketing zu meinem SEO und E-Mail-Marketing?",
      a: "Perfekt sogar. SEO liefert das technische Fundament, Content ist das, was darauf rankt und zitiert wird, und E-Mail-Marketing verwandelt die so gewonnenen Besucher in Kontakte und hält sie warm. Am stärksten ist die Kombination: gefunden werden, Vertrauen aufbauen, nachfassen.",
    },
    {
      q: "Übernehmt ihr die komplette Produktion oder muss ich selbst schreiben?",
      a: "Wir übernehmen die komplette Produktion — Strategie, Recherche, Text, Struktur und Schema. Du gibst dein Fachwissen und die Freigaben, wir machen daraus ranking- und zitierfähige Inhalte. Auf Wunsch stimmen wir jeden Artikel vorab mit dir ab, ohne dass du selbst schreiben musst.",
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
            <span className="text-[var(--text)]">Content-Marketing</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-semibold text-[var(--accent)]">Service</span>
                <span className="text-[var(--text-subtle)]">·</span>
                Content-Marketing
              </div>

              <h1 className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.02] tracking-[-0.04em] text-[var(--text)]" style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)" }}>
                Content-Marketing für{" "}
                <span className="relative inline-block">
                  <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Mittelstand</span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 240 12" fill="none" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 8C 60 2, 120 10, 180 5 S 230 7, 238 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                Inhalte, die bei Google ranken und von ChatGPT, Perplexity &amp; Co. zitiert werden — und dich{" "}
                <span className="font-semibold text-[var(--text)]">zur Autorität in deinem Markt</span> machen.
              </p>

              <div className="mx-auto mt-8 w-full max-w-md overflow-hidden rounded-3xl lg:hidden">
                <Image src="/albert-portrait.jpg" alt="Albert Ipgefer — Content-Marketing für Mittelstand" width={1226} height={1300} priority fetchPriority="high" quality={75} sizes="(max-width: 640px) 360px, 480px" className="h-auto w-full" />
              </div>

              <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3">
                <Link href="/#strategie" aria-label="Erstgespräch zu Content-Marketing sichern" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]">
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

              <div className="mt-5 w-full lg:hidden">
                <ReviewBadges variant="pill" centerOnMobile />
              </div>
              <ul className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 text-left text-[13.5px] leading-relaxed text-[var(--text)] sm:text-[14.5px] lg:hidden">
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Werde gefunden</strong> für die Fragen, die deine Kunden wirklich stellen — bei Google und in der KI-Suche.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Bau Autorität auf</strong> mit Inhalten, die Vertrauen schaffen — statt nur zu werben.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Bekomme planbaren Traffic</strong>, der nicht versiegt — jeder Artikel arbeitet dauerhaft für dich.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Werde zitiert</strong> von ChatGPT, Perplexity &amp; Co. — SEO- und GEO-optimiert von Tag 1.</span></li>
              </ul>
              <div className="mx-auto mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 lg:hidden">
                <Link href="/#strategie" aria-label="Content-Marketing — unverbindliches Erstgespräch sichern" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]">
                  <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Jetzt unverbindliches Erstgespräch sichern</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <p className="text-center text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">15-Min · Kostenfrei · Albert persönlich</p>
              </div>
            </div>

            <div className="relative order-2 mx-auto hidden aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-3xl lg:block">
              <Image src="/albert-portrait.jpg" alt="Albert Ipgefer — Content-Marketing für Mittelstand" fill priority fetchPriority="high" quality={85} sizes="440px" className="object-cover object-[50%_35%]" />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[var(--bg)] to-transparent" />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[var(--bg)] to-transparent" />
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--bg)] to-transparent" />
              <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--bg)] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WAS DU BEKOMMST ──────────────────────────────────────── */}
      <section className="bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Was du bekommst</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Sechs konkrete Content-Hebel
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {[
              { no: "01", title: "Themen- & Keyword-Strategie", desc: "Themen entlang der Customer Journey (ToFu / MoFu / BoFu) — von Reichweite bis Kaufintention, kein Content nach Zufall." },
              { no: "02", title: "Redaktionell hochwertige Artikel", desc: "SEO- und GEO-optimierte Texte mit echtem Fachwissen — geschrieben, um zu ranken und zitiert zu werden, nicht um Wörter zu füllen." },
              { no: "03", title: "Interne Verlinkung auf Money-Pages", desc: "Saubere Verlinkung, die Autorität gezielt auf deine kaufstärksten Seiten lenkt — Content, der auf Umsatz einzahlt." },
              { no: "04", title: "Schema.org & klare Struktur", desc: "Strukturierte Daten und sauberer Aufbau, damit Google und KI-Systeme deine Inhalte zweifelsfrei verstehen." },
              { no: "05", title: "Themen-Cluster / Topical Authority", desc: "Pillar + Cluster zu deinen Kernthemen — so wirst du als Autorität in deinem Markt erkannt, nicht als Einzelartikel." },
              { no: "06", title: "Redaktionsplan & Reporting", desc: "Planbarer Rhythmus statt Content nach Lust und Laune — mit Reporting zu Rankings, Traffic und Cluster-Sichtbarkeit." },
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
            Die WSM-Methode für Content-Marketing
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {[
              { no: "01", days: "Woche 1", title: "Strategie & Themenplan", desc: "Keyword- und Themen-Cluster entlang der Customer Journey, Wettbewerbsanalyse, Redaktionsplan — die Basis, auf der alles aufbaut." },
              { no: "02", days: "Woche 2 – 4", title: "Produktion (erste Artikel live)", desc: "Wir recherchieren, schreiben und veröffentlichen die ersten SEO- und GEO-optimierten Artikel — sauber verlinkt und mit Schema." },
              { no: "03", days: "Laufend", title: "Cluster ausbauen & messen", desc: "Wir bauen die Themen-Cluster kontinuierlich aus, messen Rankings und KI-Zitierungen und schärfen entlang der Daten nach." },
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
            context="Content-Marketing · 15-Min · Kostenfrei"
            headline={<>Klingt das nach dem, <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">was du suchst</span>?</>}
            subline="15-Min-Erstgespräch mit Albert — ehrlich, konkret, mit klarem nächsten Schritt für dein Content-Marketing. Auch wenn wir nicht zusammenarbeiten."
          />
        </div>
      </section>

      {/* ── STÄDTE-GRID ──────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Standorte</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Content-Marketing in deiner Stadt
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Lokal verankert für {cities.length} DACH-Regionen — wähle deinen Standort für stadtspezifische Inhalte:
          </p>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {cities.map((c) => (
              <Link key={`content-hub-${c.slug}`} href={`/content-marketing/${c.slug}`} className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2.5 text-[13px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">
                Content-Marketing in {c.name}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CROSS-LINK ───────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">Weitere Services</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            Content + SEO + Webseite aus einer Hand
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/blog" className="group inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/[0.06] px-5 py-2.5 text-[14px] font-semibold text-[var(--gold-text)] transition hover:border-transparent hover:bg-[var(--gold-text)] hover:text-white">Zum Blog<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/seo" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">SEO-Optimierung<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/e-mail-marketing" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">E-Mail-Marketing<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/ki-optimierung" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">KI-Optimierung<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/webdesign" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Webdesign<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/preise" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Angebot<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Häufige Fragen</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Content-Marketing — was du wissen willst
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
        headline={<>Bereit, zur <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Autorität</span> in deinem Markt zu werden?</>}
        subline="15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung deines Content-Potenzials — auch wenn wir nicht zusammenarbeiten."
      />

      <Footer />
    </main>
  );
}
