import type { Metadata } from "next";
import Link from "next/link";
import { getWebdesignPosts } from "@/content/blog";
import BlogNav from "@/components/blog/BlogNav";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";
import ReviewBadges from "@/components/ReviewBadges";

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  title: "Landingpage oder Unternehmenswebsite? Der ehrliche Vergleich",
  description:
    "Landingpage vs. Unternehmenswebsite: Was braucht dein Business — eine fokussierte Funnel-Seite oder einen vollständigen Auftritt? Der ehrliche Vergleich mit klarer Entscheidungshilfe für Mittelstand.",
  alternates: { canonical: "/vergleich/landingpage-vs-unternehmenswebsite" },
  openGraph: {
    title: "Landingpage oder Unternehmenswebsite? Der ehrliche Vergleich",
    description:
      "Eine fokussierte Landingpage oder ein vollständiger Webauftritt — was lohnt sich für dein Unternehmen? Vergleich, Entscheidungshilfe und ehrliches Fazit.",
    type: "article",
  },
};

export default function LandingpageVsWebsitePage() {
  const relatedPosts = getWebdesignPosts(4);

  const rows = [
    {
      kriterium: "Was es ist",
      a: "Eine einzelne, fokussierte Seite mit genau einem Ziel.",
      b: "Ein mehrseitiger Auftritt, der dein gesamtes Unternehmen abbildet.",
    },
    {
      kriterium: "Das Ziel",
      a: "Eine konkrete Aktion: Anfrage, Buchung, Download oder Kauf.",
      b: "Überblick, Vertrauen und Sichtbarkeit über viele Themen.",
    },
    {
      kriterium: "Umfang",
      a: "Eine Seite, klarer Funnel, keine Ablenkung.",
      b: "Startseite, Leistungen, Über uns, Blog, Kontakt und mehr.",
    },
    {
      kriterium: "Typischer Einsatz",
      a: "Kampagnen, Aktionen, einzelne Angebote, Lead-Magnete.",
      b: "Dauerhafte digitale Präsenz, Marke und SEO-Fundament.",
    },
    {
      kriterium: "SEO",
      a: "Auf ein Keyword bzw. Angebot optimiert, wenig Themenbreite.",
      b: "Breites Keyword-Set, Content-Cluster, lokale Pages.",
    },
    {
      kriterium: "Conversion",
      a: "Höhere Conversion-Rate für das eine Ziel — keine Ablenkung.",
      b: "Mehrere Pfade, dafür deutlich mehr Informationstiefe.",
    },
    {
      kriterium: "Aufwand & Pflege",
      a: "Schnell live, klar umrissen, wenig laufende Pflege.",
      b: "Mehr Struktur, mehr Inhalte, mehr laufende Pflege.",
    },
    {
      kriterium: "Ideal für",
      a: "Wer eine konkrete Aktion pushen will — Angebot, Event, Funnel.",
      b: "Wer dauerhaft als Unternehmen gefunden werden und Vertrauen aufbauen will.",
    },
  ];

  const faqs = [
    {
      q: "Was ist der Hauptunterschied zwischen Landingpage und Unternehmenswebsite?",
      a: "Eine Landingpage verfolgt genau ein Ziel auf einer einzigen Seite — eine konkrete Aktion wie Anfrage, Buchung oder Download, ohne Ablenkung. Eine Unternehmenswebsite bildet dein gesamtes Unternehmen über mehrere Seiten ab (Leistungen, Über uns, Blog, Kontakt) und baut dauerhaft Sichtbarkeit und Vertrauen auf.",
    },
    {
      q: "Brauche ich beides?",
      a: "Oft ja — und das ist kein Widerspruch. Die Unternehmenswebsite ist dein Fundament (Vertrauen, SEO, dauerhafte Präsenz), Landingpages sind die Spezialwerkzeuge für gezielte Aktionen und Kampagnen. Wer regelmäßig Angebote oder Funnels fährt, fährt mit beidem am besten.",
    },
    {
      q: "Was konvertiert besser?",
      a: "Für ein einzelnes, klar definiertes Ziel konvertiert eine Landingpage in der Regel besser, weil sie keine Ablenkung bietet und den Besucher gezielt führt. Eine Website konvertiert über mehrere Pfade und punktet mit Informationstiefe und Vertrauensaufbau — andere Aufgabe, andere Stärke.",
    },
    {
      q: "Ist eine Landingpage günstiger als eine Website?",
      a: "In der Regel ja, weil der Umfang kleiner ist — eine Seite statt vieler. Entscheidend ist aber nicht der Preis, sondern was du erreichen willst: Eine günstige Landingpage ersetzt keine fehlende Unternehmensbasis, und eine Website ersetzt keinen fokussierten Kampagnen-Funnel.",
    },
    {
      q: "Kann eine Landingpage auch bei Google ranken?",
      a: "Ja, wenn sie sauber auf ein Keyword optimiert ist. Allerdings ist die thematische Breite begrenzt — für nachhaltige organische Sichtbarkeit über viele Suchbegriffe ist eine Website mit Content-Clustern klar im Vorteil. Landingpages spielen ihre Stärke eher bei gezielten Aktionen aus.",
    },
    {
      q: "Was empfehlt ihr für den Anfang?",
      a: "Hängt von deinem Ziel ab. Hast du noch keine professionelle Basis, ist die Unternehmenswebsite der erste Schritt — sie ist dein digitales Fundament. Hast du eine konkrete Aktion oder einen Funnel, kann eine Landingpage der schnellere Hebel sein. Im 15-Minuten-Erstgespräch sagen wir dir ehrlich, was in deiner Situation zuerst zieht.",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Vergleich", item: `${SITE}/vergleich/landingpage-vs-unternehmenswebsite` },
      { "@type": "ListItem", position: 3, name: "Landingpage vs. Unternehmenswebsite", item: `${SITE}/vergleich/landingpage-vs-unternehmenswebsite` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Landingpage oder Unternehmenswebsite? Der ehrliche Vergleich",
    description:
      "Landingpage vs. Unternehmenswebsite: Was braucht Mittelstand — eine fokussierte Funnel-Seite oder einen vollständigen Auftritt?",
    author: { "@id": `${SITE}#person-albert` },
    publisher: { "@id": `${SITE}#organization` },
    inLanguage: "de-DE",
    mainEntityOfPage: `${SITE}/vergleich/landingpage-vs-unternehmenswebsite`,
  };

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <BlogNav />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--border)] pt-32 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]" />
        <div aria-hidden className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(219,111,22,0.08)_0%,rgba(219,111,22,0)_70%)]" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6 md:px-12 lg:items-start lg:text-left">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[12px] text-[var(--text-subtle)]">
            <Link href="/" className="hover:text-[var(--text)]">Startseite</Link>
            <span>/</span>
            <span className="text-[var(--text)]">Vergleich</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            <span className="font-semibold text-[var(--gold-text)]">Vergleich</span>
            <span className="text-[var(--text-subtle)]">·</span>
            Entscheidungshilfe 2026
          </div>

          <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}>
            Landingpage oder{" "}
            <span className="relative inline-block">
              <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Unternehmenswebsite</span>
              <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 360 12" fill="none" preserveAspectRatio="none" aria-hidden>
                <path d="M2 8C 90 2, 180 10, 270 5 S 350 7, 358 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
              </svg>
            </span>?
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Eine fokussierte Seite für genau ein Ziel — oder ein vollständiger Auftritt für dein ganzes Unternehmen? Was{" "}
            <span className="font-semibold text-[var(--text)]">dein Business wirklich braucht</span>, hier ehrlich gegenübergestellt.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-[var(--text-muted)] lg:justify-start">
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Beide Seiten ehrlich</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Klare Empfehlung</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Ohne Sales-Druck</span>
          </div>

          <div className="mt-5 w-full">
            <ReviewBadges variant="pill" centerOnMobile />
          </div>
        </div>
      </section>

      {/* ── TL;DR ───────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/25 bg-gradient-to-br from-white via-white to-[var(--accent-glow-soft)] p-8 shadow-[0_18px_50px_-22px_rgba(22,99,222,0.28)] ring-1 ring-[var(--accent)]/5 sm:p-10">
            <div aria-hidden className="pointer-events-none absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-[var(--gold)] opacity-80" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Die kurze Antwort</p>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-[var(--text)] sm:text-[17px]">
              Eine <strong className="font-semibold">Landingpage</strong>{" "}hat genau ein Ziel — ideal für Kampagnen, Angebote und Funnels.
              Eine <strong className="font-semibold">Unternehmenswebsite</strong>{" "}bildet dein ganzes Unternehmen ab — ideal für dauerhafte Sichtbarkeit und Vertrauen.
              Meist brauchst du beides: die <span className="font-semibold text-[var(--accent)]">Website als Fundament</span>, Landingpages für gezielte Aktionen.
            </p>
          </div>
        </div>
      </section>

      {/* ── VERGLEICHSTABELLE ───────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Direkt gegenübergestellt</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Landingpage vs. Unternehmenswebsite im Vergleich
          </h2>

          <div className="mt-10 hidden overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] md:block">
            <div className="grid grid-cols-[1.05fr_1fr_1fr]">
              <div className="border-b border-[var(--border)] p-5" />
              <div className="border-b border-l border-[var(--border)] p-5">
                <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--text)]">Landingpage</span>
                <p className="mt-1 text-[12px] text-[var(--text-subtle)]">Ein Ziel, ein Funnel</p>
              </div>
              <div className="border-b border-l border-[var(--border)] bg-[var(--accent)]/[0.04] p-5">
                <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--accent)]">Unternehmenswebsite</span>
                <p className="mt-1 text-[12px] text-[var(--text-subtle)]">Vollständiger Auftritt</p>
              </div>

              {rows.map((r) => (
                <div key={r.kriterium} className="contents">
                  <div className="border-b border-[var(--border)] p-5 last:border-b-0">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gold-text)]">{r.kriterium}</span>
                  </div>
                  <div className="border-b border-l border-[var(--border)] p-5 text-[14px] leading-relaxed text-[var(--text-muted)]">{r.a}</div>
                  <div className="border-b border-l border-[var(--border)] bg-[var(--accent)]/[0.04] p-5 text-[14px] leading-relaxed text-[var(--text-muted)]">{r.b}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:hidden">
            {rows.map((r) => (
              <div key={r.kriterium} className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gold-text)]">{r.kriterium}</span>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--text)]">Landingpage</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-muted)]">{r.a}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--accent)]/[0.05] p-4">
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Unternehmenswebsite</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-muted)]">{r.b}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WANN PASST WAS? ─────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Entscheidungshilfe</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Wann passt was?
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            <div className="rounded-3xl border border-[var(--border)] bg-white p-7 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--text)]">Landingpage, wenn …</h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-[var(--text)] sm:text-[15px]">
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span>du eine <strong className="font-semibold">konkrete Kampagne oder ein Angebot</strong> pushen willst.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span>du schnell <strong className="font-semibold">Leads für ein einziges Ziel</strong> brauchst.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span>du einen <strong className="font-semibold">Funnel oder Lead-Magnet</strong> betreibst.</span></li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent)]/[0.04] p-7 shadow-[0_10px_40px_-20px_rgba(22,99,222,0.18)] sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--accent)]">Unternehmenswebsite, wenn …</h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-[var(--text)] sm:text-[15px]">
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[12px] font-bold text-[var(--accent)]">✓</span><span>du noch <strong className="font-semibold">keine professionelle Basis</strong> hast.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[12px] font-bold text-[var(--accent)]">✓</span><span>du über <strong className="font-semibold">mehrere Leistungen und Zielgruppen</strong> gefunden werden willst.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[12px] font-bold text-[var(--accent)]">✓</span><span>du langfristig <strong className="font-semibold">SEO und Vertrauen</strong> aufbauen willst.</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-2)]/50 p-7 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">Die ehrliche Antwort</p>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-[16px]">
              Meist ist es kein Entweder-oder. Die <span className="font-semibold text-[var(--text)]">Unternehmenswebsite ist dein Fundament</span> — Vertrauen, Marke und SEO. Landingpages sind die Spezialwerkzeuge für gezielte Aktionen. Wir bauen beides auf demselben modernen Stack, sodass alles zusammenpasst — und sagen dir ehrlich, womit du in deiner Situation startest.
            </p>
          </div>
        </div>
      </section>

      {/* ── MITTEL-CTA ──────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <InlineCTA
            variant="erstgespraech"
            context="Unsicher? · 15-Min · Kostenfrei"
            headline={<>Was passt zu <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">deinem Ziel</span>?</>}
            subline="15-Min-Erstgespräch mit Albert — wir schauen auf dein Vorhaben und sagen dir ehrlich, ob eine Landingpage, eine Website oder die Kombination der richtige Start ist. Auch wenn wir nicht zusammenarbeiten."
          />
        </div>
      </section>

      {/* ── CROSS-LINK ──────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">Tiefer einsteigen</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            Passende Services im Detail
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/webdesign" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Webdesign-Übersicht<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/relaunch" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Webseiten-Relaunch<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/vergleich/relaunch-vs-neue-webseite" className="group inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/[0.06] px-5 py-2.5 text-[14px] font-semibold text-[var(--gold-text)] transition hover:border-transparent hover:bg-[var(--gold-text)] hover:text-white">Relaunch oder neu bauen?<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/preise" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Angebot<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── BLOG-CLUSTER ────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-[var(--border)] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Wissensbasis</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">Mehr zu Webdesign &amp; Webseiten</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPosts.map((p) => (
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
            Landingpage vs. Website — was du wissen willst
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
        headline={<>Landingpage, Website — oder <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">beides</span>?</>}
        subline="15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung, was dein Unternehmen als Nächstes wirklich braucht."
      />

      <Footer />
    </main>
  );
}
