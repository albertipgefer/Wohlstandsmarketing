import type { Metadata } from "next";
import Link from "next/link";
import { getSeoPosts } from "@/content/blog";
import BlogNav from "@/components/blog/BlogNav";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";
import ReviewBadges from "@/components/ReviewBadges";

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  title: "SEO selbst machen oder Agentur? Der ehrliche Vergleich",
  description:
    "SEO inhouse vs. Agentur: Selbst machen und Kosten sparen — oder an Profis abgeben und Zeit & Lehrgeld sparen? Der ehrliche Make-or-Buy-Vergleich mit klarer Entscheidungshilfe.",
  alternates: { canonical: "/vergleich/agentur-vs-inhouse-seo" },
  openGraph: {
    title: "SEO selbst machen oder Agentur? Der ehrliche Vergleich",
    description:
      "Inhouse-SEO oder Agentur — was lohnt sich für dein Unternehmen wirklich? Vergleich, Entscheidungshilfe und ehrliches Fazit.",
    type: "article",
  },
};

export default function AgenturVsInhousePage() {
  const relatedPosts = getSeoPosts(4);

  const rows = [
    {
      kriterium: "Was es ist",
      a: "Du oder dein Team macht SEO selbst.",
      b: "Externe Profis übernehmen Strategie und Umsetzung.",
    },
    {
      kriterium: "Kosten",
      a: "Keine Agenturkosten, aber Tools (50–300 €/Monat) plus Arbeitszeit.",
      b: "Honorar — dafür kein eigener Zeitaufwand und kein Lehrgeld.",
    },
    {
      kriterium: "Know-how",
      a: "Du baust es dir selbst auf — Lernkurve von Monaten.",
      b: "Erfahrung aus vielen Projekten, ab Tag 1 verfügbar.",
    },
    {
      kriterium: "Zeitaufwand",
      a: "Hoch und laufend — neben dem Tagesgeschäft.",
      b: "Minimal — du stimmst ab, statt selbst umzusetzen.",
    },
    {
      kriterium: "Tools",
      a: "Musst du selbst lizenzieren und bedienen lernen.",
      b: "Profi-Tools sind inklusive.",
    },
    {
      kriterium: "Geschwindigkeit",
      a: "Langsamer Start — erst Wissen aufbauen.",
      b: "Schnellerer, strukturierter Start.",
    },
    {
      kriterium: "Risiko",
      a: "Fehler kosten Zeit und Rankings — Lehrgeld.",
      b: "Bewährte Prozesse, weniger Fehlversuche.",
    },
    {
      kriterium: "Ideal für",
      a: "Wer Zeit, Lust und jemanden im Team hat.",
      b: "Wer planbar Ergebnisse will, ohne selbst Experte zu werden.",
    },
  ];

  const faqs = [
    {
      q: "Kann ich SEO wirklich selbst machen?",
      a: "Grundsätzlich ja — die Basics (saubere Titles, Meta-Descriptions, interne Verlinkung, Google Business Profile) sind lernbar. Anspruchsvoller wird es bei technischem SEO, Content-Strategie, Wettbewerbsanalyse und der Verzahnung mit KI-Sichtbarkeit. Die ehrliche Frage ist nicht 'ob', sondern ob du die Zeit und Kontinuität dafür hast.",
    },
    {
      q: "Was kostet SEO inhouse vs. Agentur wirklich?",
      a: "Inhouse wirkt günstiger, weil keine Agenturrechnung kommt — aber Tools (50–300 €/Monat) und vor allem deine Arbeitszeit sind reale Kosten. Wer 5–10 Stunden pro Woche bindet, zahlt mit Opportunitätskosten. Eine Agentur kostet Honorar, dafür fließt deine Zeit ins Kerngeschäft. Welche Rechnung günstiger ist, hängt davon ab, was deine Zeit wert ist.",
    },
    {
      q: "Wie lange dauert es, SEO selbst zu lernen?",
      a: "Die Grundlagen in einigen Wochen, solides Praxiswissen eher in Monaten — und SEO verändert sich laufend (Google-Updates, jetzt zusätzlich KI-Sichtbarkeit). Inhouse lohnt sich vor allem, wenn jemand SEO langfristig als Kernkompetenz aufbauen soll, nicht für einmalige Projekte.",
    },
    {
      q: "Woran erkenne ich eine gute SEO-Agentur?",
      a: "An Transparenz und Ehrlichkeit: klare Methodik, nachvollziehbares Reporting mit echten Zahlen, keine Garantien für 'Platz 1 in 4 Wochen', keine Black-Hat-Tricks. Eine gute Agentur sagt dir auch, wenn etwas nicht sinnvoll ist — und baut Substanz auf, die auch nach Google-Updates hält.",
    },
    {
      q: "Kann man Inhouse und Agentur kombinieren?",
      a: "Ja, das ist sogar oft der beste Weg: Eine Agentur baut das Fundament und das Tempo auf, während intern Wissen mitwächst. Mit der Zeit kann dein Team mehr selbst übernehmen, während die Agentur die strategisch anspruchsvollen Teile begleitet.",
    },
    {
      q: "Was kostet SEO bei euch?",
      a: "Wir bieten SEO einmalig oder als Retainer über 6, 9 oder 12 Monate an — ab zwei Leistungen mit 5 % Bundle-Rabatt. Die konkrete Investition hängt von Wettbewerb, bestehender Substanz und Zielsetzung ab. Komplette Übersicht im Konfigurator auf der Preise-Seite, die ehrliche Einschätzung im 15-Minuten-Erstgespräch.",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Vergleich", item: `${SITE}/vergleich/agentur-vs-inhouse-seo` },
      { "@type": "ListItem", position: 3, name: "SEO-Agentur vs. Inhouse", item: `${SITE}/vergleich/agentur-vs-inhouse-seo` },
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
    headline: "SEO selbst machen oder Agentur? Der ehrliche Vergleich",
    description:
      "SEO inhouse vs. Agentur: selbst machen und Kosten sparen — oder an Profis abgeben und Zeit & Lehrgeld sparen?",
    author: { "@id": `${SITE}#person-albert` },
    publisher: { "@id": `${SITE}#organization` },
    inLanguage: "de-DE",
    mainEntityOfPage: `${SITE}/vergleich/agentur-vs-inhouse-seo`,
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
            SEO selbst machen oder{" "}
            <span className="relative inline-block">
              <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Agentur</span>
              <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none" aria-hidden>
                <path d="M2 8C 50 2, 100 10, 150 5 S 195 7, 198 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
              </svg>
            </span>?
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Selbst machen und Agenturkosten sparen — oder an Profis abgeben und Zeit &amp; Lehrgeld sparen? Die ehrliche{" "}
            <span className="font-semibold text-[var(--text)]">Make-or-Buy-Entscheidung</span> für deinen Mittelstand.
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
              <strong className="font-semibold">Inhouse-SEO</strong>{" "}gibt dir volle Kontrolle und spart Agenturkosten — kostet aber Zeit, Lernkurve und Tools.
              Eine <strong className="font-semibold">Agentur</strong>{" "}bringt Erfahrung, Tools und Tempo — gegen Honorar.
              Faustregel: Zeit, Lust und jemand im Team → inhouse möglich; planbare Ergebnisse{" "}
              <span className="font-semibold text-[var(--accent)]">ohne eigenes Lehrgeld</span> → Agentur.
            </p>
          </div>
        </div>
      </section>

      {/* ── VERGLEICHSTABELLE ───────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Direkt gegenübergestellt</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Inhouse vs. Agentur im Vergleich
          </h2>

          <div className="mt-10 hidden overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] md:block">
            <div className="grid grid-cols-[1.05fr_1fr_1fr]">
              <div className="border-b border-[var(--border)] p-5" />
              <div className="border-b border-l border-[var(--border)] p-5">
                <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--text)]">Inhouse</span>
                <p className="mt-1 text-[12px] text-[var(--text-subtle)]">Selbst machen</p>
              </div>
              <div className="border-b border-l border-[var(--border)] bg-[var(--accent)]/[0.04] p-5">
                <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--accent)]">Agentur</span>
                <p className="mt-1 text-[12px] text-[var(--text-subtle)]">An Profis abgeben</p>
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
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--text)]">Inhouse</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-muted)]">{r.a}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--accent)]/[0.05] p-4">
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Agentur</p>
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
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--text)]">Inhouse, wenn …</h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-[var(--text)] sm:text-[15px]">
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span>du jemanden mit <strong className="font-semibold">Zeit und Interesse</strong> im Team hast.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span>das <strong className="font-semibold">Budget knapp und Zeit reichlich</strong> ist.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span>du SEO langfristig als <strong className="font-semibold">eigene Kernkompetenz</strong> aufbauen willst.</span></li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent)]/[0.04] p-7 shadow-[0_10px_40px_-20px_rgba(22,99,222,0.18)] sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--accent)]">Agentur, wenn …</h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-[var(--text)] sm:text-[15px]">
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[12px] font-bold text-[var(--accent)]">✓</span><span>dein Team im <strong className="font-semibold">Tagesgeschäft ausgelastet</strong> ist.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[12px] font-bold text-[var(--accent)]">✓</span><span>du <strong className="font-semibold">schnell und planbar Ergebnisse</strong> willst.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[12px] font-bold text-[var(--accent)]">✓</span><span>du dir das <strong className="font-semibold">Lehrgeld sparen</strong> willst.</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-2)]/50 p-7 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">Die ehrliche Antwort</p>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-[16px]">
              Es ist kein Dogma — viele starten mit einer Agentur für Tempo und Fundament und bauen parallel internes Wissen auf. Ehrlich gerechnet: Wenn niemand im Team realistisch <span className="font-semibold text-[var(--text)]">5–10 Stunden pro Woche</span> für SEO frei hat, ist eine Agentur über die Opportunitätskosten fast immer die günstigere Rechnung. Wir sagen dir im Erstgespräch ehrlich, was in deiner Situation Sinn macht.
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
            headline={<>Selbst machen oder <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">abgeben</span>?</>}
            subline="15-Min-Erstgespräch mit Albert — wir rechnen ehrlich durch, ob sich Inhouse-SEO für dich lohnt oder die Agentur die günstigere Rechnung ist. Auch wenn wir nicht zusammenarbeiten."
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
            <Link href="/seo" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">SEO-Optimierung<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/ki-sichtbarkeit" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">KI-Sichtbarkeit<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/vergleich/seo-vs-ki-sichtbarkeit" className="group inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/[0.06] px-5 py-2.5 text-[14px] font-semibold text-[var(--gold-text)] transition hover:border-transparent hover:bg-[var(--gold-text)] hover:text-white">SEO oder KI-Sichtbarkeit?<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/preise" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Preise &amp; Pakete<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── BLOG-CLUSTER ────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-[var(--border)] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Wissensbasis</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">Mehr zu SEO</h2>
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
            Inhouse vs. Agentur — was du wissen willst
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
        headline={<>Selbst machen oder <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">abgeben</span>?</>}
        subline="15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Make-or-Buy-Rechnung für deine Situation — auch wenn wir nicht zusammenarbeiten."
      />

      <Footer />
    </main>
  );
}
