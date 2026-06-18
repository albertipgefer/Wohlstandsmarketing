import type { Metadata } from "next";
import Link from "next/link";
import { getSeoPosts, getKiVisibilityPosts } from "@/content/blog";
import BlogNav from "@/components/blog/BlogNav";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";
import ReviewBadges from "@/components/ReviewBadges";

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  title: "KI-Optimierung vs. KI-Sichtbarkeit: Der Unterschied",
  description:
    "KI-Optimierung vs. KI-Sichtbarkeit: Die zwei werden ständig verwechselt. KI-Optimierung bringt KI in deine Prozesse (spart Zeit), KI-Sichtbarkeit (GEO) macht dich in ChatGPT & Perplexity empfehlbar (bringt Anfragen). Hier der klare Unterschied.",
  alternates: { canonical: "/vergleich/ki-optimierung-vs-ki-sichtbarkeit" },
  openGraph: {
    title: "KI-Optimierung vs. KI-Sichtbarkeit: Der Unterschied",
    description:
      "Werden oft verwechselt: KI-Optimierung bringt KI in deine Prozesse (wirkt nach innen). KI-Sichtbarkeit macht dich in ChatGPT & Co. empfehlbar (wirkt nach außen). Der klare Vergleich.",
    type: "article",
  },
};

export default function KiOptimierungVsKiSichtbarkeitPage() {
  // Verwandte Artikel aus beiden Clustern, dedupliziert
  const seoPosts = getSeoPosts(3);
  const kiPosts = getKiVisibilityPosts(3);
  const seenSlugs = new Set<string>();
  const relatedPosts = [...kiPosts, ...seoPosts]
    .filter((p) => {
      if (seenSlugs.has(p.meta.slug)) return false;
      seenSlugs.add(p.meta.slug);
      return true;
    })
    .slice(0, 4);

  // Vergleichs-Matrix (ehrlich, beide Seiten)
  const rows = [
    {
      kriterium: "Was es ist",
      opt: "KI in deine eigenen Prozesse bringen — Automatisierung, Chatbots, Assistenten, die für dich arbeiten.",
      sicht: "Dafür sorgen, dass ChatGPT, Perplexity, Claude & Google dich in ihren Antworten empfehlen (GEO/AEO).",
    },
    {
      kriterium: "Ziel",
      opt: "Effizienter arbeiten — Zeit und Geld sparen, repetitive Aufgaben automatisieren.",
      sicht: "Gefunden und empfohlen werden — neue Anfragen über die KI-Suche gewinnen.",
    },
    {
      kriterium: "Wirkung",
      opt: "Wirkt nach innen — in deinem Betrieb, deinen Abläufen, deinem Team.",
      sicht: "Wirkt nach außen — bei deinen potenziellen Kunden, bevor sie dich überhaupt kennen.",
    },
    {
      kriterium: "Typische Maßnahmen",
      opt: "Chatbots, KI-Assistenten, automatisierte Workflows (z. B. n8n), KI-gestützte Datenauswertung.",
      sicht: "Strukturierte Daten (Schema), klare Fakten, E-E-A-T, Erwähnungen, llms.txt, robots.txt für KI-Crawler.",
    },
    {
      kriterium: "Ergebnis",
      opt: "Geringere Kosten, schnellere Abläufe, mehr Kapazität für das Wesentliche.",
      sicht: "Mehr qualifizierte Anfragen, weil dich KI-Systeme als Lösung nennen.",
    },
    {
      kriterium: "Für wen",
      opt: "Wer intern Zeit verliert und repetitive Prozesse smarter machen will.",
      sicht: "Wer neue Kunden über ChatGPT & Co. gewinnen und früh sichtbar sein will.",
    },
  ];

  const faqs = [
    {
      q: "Ist KI-Optimierung dasselbe wie KI-Sichtbarkeit?",
      a: "Nein — und genau das wird ständig verwechselt. KI-Optimierung bedeutet, KI in deine eigenen Prozesse zu bringen: Automatisierungen, Chatbots, Assistenten, die dir Arbeit abnehmen. Das wirkt nach innen und spart Zeit und Geld. KI-Sichtbarkeit (GEO) bedeutet, dass ChatGPT, Perplexity, Claude und Google dich in ihren Antworten empfehlen. Das wirkt nach außen und bringt dir neue Anfragen. Zwei völlig verschiedene Ziele.",
    },
    {
      q: "Was ist KI-Optimierung genau?",
      a: "KI-Optimierung heißt, künstliche Intelligenz in deine internen Abläufe zu integrieren, um effizienter zu arbeiten. Das reicht von einem Chatbot, der Standardanfragen beantwortet, über KI-Assistenten für dein Team bis zu automatisierten Workflows, die repetitive Aufgaben übernehmen. Ziel ist immer dasselbe: weniger manuelle Arbeit, geringere Kosten, mehr Kapazität für das Wesentliche.",
    },
    {
      q: "Was ist KI-Sichtbarkeit (GEO)?",
      a: "KI-Sichtbarkeit — auch Generative Engine Optimization (GEO) bzw. Answer Engine Optimization (AEO) — sorgt dafür, dass generative KI-Systeme wie ChatGPT, Perplexity und Claude dich in ihren Antworten zitieren und empfehlen. Statt dass dein Kunde sich durch zehn Google-Treffer klickt, stellt er der KI eine Frage und bekommt eine fertige Empfehlung — idealerweise dich. Die Hebel: sauberes Schema-Markup, klare Fakten, Trust-Signale (E-E-A-T) und Erwähnungen.",
    },
    {
      q: "Was brauche ich — KI-Optimierung oder KI-Sichtbarkeit?",
      a: "Faustregel: Verlierst du intern Zeit mit repetitiven Aufgaben und willst Prozesse smarter machen, ist KI-Optimierung dein Hebel. Willst du dagegen neue Kunden gewinnen und über die KI-Suche gefunden werden, ist KI-Sichtbarkeit der richtige Weg. Das eine spart dir Geld, das andere bringt dir Anfragen. Im 15-Minuten-Erstgespräch sagen wir dir ehrlich, was in deiner Situation zuerst zieht.",
    },
    {
      q: "Kann man beides kombinieren?",
      a: "Ja, und in vielen Unternehmen ist genau das sinnvoll. KI-Sichtbarkeit bringt dir die Anfragen herein, KI-Optimierung sorgt dafür, dass du sie effizient abarbeitest. Der eine Kanal füllt den Funnel, der andere macht deinen Betrieb dahinter schlanker. Wir schauen im Erstgespräch, welcher Hebel bei dir den größten Effekt hat — und ob die Kombination Sinn ergibt.",
    },
    {
      q: "Bietet Wohlstandsmarketing beides an?",
      a: "Der klare Fokus von Wohlstandsmarketing liegt auf KI-Sichtbarkeit — als untrennbares Paket aus Webdesign, GEO und SEO. Dazu beraten wir, wo KI-Optimierung in deinen Prozessen echten Mehrwert bringt. Die konkrete Kombination und Investition stimmen wir transparent im Erstgespräch ab.",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Vergleich", item: `${SITE}/vergleich/ki-optimierung-vs-ki-sichtbarkeit` },
      { "@type": "ListItem", position: 3, name: "KI-Optimierung vs. KI-Sichtbarkeit", item: `${SITE}/vergleich/ki-optimierung-vs-ki-sichtbarkeit` },
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
    headline: "KI-Optimierung vs. KI-Sichtbarkeit: Der Unterschied",
    description:
      "KI-Optimierung bringt KI in deine Prozesse (wirkt nach innen, spart Zeit). KI-Sichtbarkeit (GEO) macht dich in ChatGPT & Perplexity empfehlbar (wirkt nach außen, bringt Anfragen).",
    author: { "@id": `${SITE}#person-albert` },
    publisher: { "@id": `${SITE}#organization` },
    inLanguage: "de-DE",
    mainEntityOfPage: `${SITE}/vergleich/ki-optimierung-vs-ki-sichtbarkeit`,
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
            Oft verwechselt
          </div>

          <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}>
            KI-Optimierung oder{" "}
            <span className="relative inline-block">
              <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">KI-Sichtbarkeit</span>
              <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 360 12" fill="none" preserveAspectRatio="none" aria-hidden>
                <path d="M2 8C 90 2, 180 10, 270 5 S 350 7, 358 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
              </svg>
            </span>?
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Die beiden klingen ähnlich — meinen aber etwas völlig{" "}
            <span className="font-semibold text-[var(--text)]">Verschiedenes</span>. Das eine bringt KI in deine Prozesse, das andere bringt dich in die Antworten der KI. Hier der klare Unterschied.
          </p>

          {/* Trust-Row */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-[var(--text-muted)] lg:justify-start">
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Klar abgegrenzt</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Klare Empfehlung</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Ohne Sales-Druck</span>
          </div>

          <div className="mt-5 w-full">
            <ReviewBadges variant="pill" centerOnMobile />
          </div>
        </div>
      </section>

      {/* ── TL;DR — die kurze Antwort (KI-/Snippet-optimiert) ────── */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/25 bg-gradient-to-br from-white via-white to-[var(--accent-glow-soft)] p-8 shadow-[0_18px_50px_-22px_rgba(22,99,222,0.28)] ring-1 ring-[var(--accent)]/5 sm:p-10">
            <div aria-hidden className="pointer-events-none absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-[var(--gold)] opacity-80" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Die kurze Antwort</p>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-[var(--text)] sm:text-[17px]">
              <strong className="font-semibold">KI-Optimierung</strong> bringt KI in deine eigenen Prozesse — Automatisierung, Chatbots, Assistenten. Das wirkt{" "}
              <span className="font-semibold text-[var(--accent)]">nach innen</span> und spart dir Zeit und Geld.{" "}
              <strong className="font-semibold">KI-Sichtbarkeit (GEO)</strong> sorgt dafür, dass ChatGPT, Perplexity &amp; Co. dich empfehlen. Das wirkt{" "}
              <span className="font-semibold text-[var(--accent)]">nach außen</span> und bringt dir neue Anfragen. Das eine spart Geld, das andere bringt Kunden.
            </p>
          </div>
        </div>
      </section>

      {/* ── VERGLEICHSTABELLE ───────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Direkt gegenübergestellt</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            KI-Optimierung vs. KI-Sichtbarkeit im Vergleich
          </h2>

          {/* Desktop / Tablet: 3-Spalten-Raster */}
          <div className="mt-10 hidden overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] md:block">
            <div className="grid grid-cols-[1.05fr_1fr_1fr]">
              <div className="border-b border-[var(--border)] p-5" />
              <div className="border-b border-l border-[var(--border)] p-5">
                <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--text)]">KI-Optimierung</span>
                <p className="mt-1 text-[12px] text-[var(--text-subtle)]">KI in deine Prozesse</p>
              </div>
              <div className="border-b border-l border-[var(--border)] bg-[var(--accent)]/[0.04] p-5">
                <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--accent)]">KI-Sichtbarkeit</span>
                <p className="mt-1 text-[12px] text-[var(--text-subtle)]">Empfohlen von ChatGPT &amp; Co.</p>
              </div>

              {rows.map((r) => (
                <div key={r.kriterium} className="contents">
                  <div className="border-b border-[var(--border)] p-5 last:border-b-0">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gold-text)]">{r.kriterium}</span>
                  </div>
                  <div className="border-b border-l border-[var(--border)] p-5 text-[14px] leading-relaxed text-[var(--text-muted)]">{r.opt}</div>
                  <div className="border-b border-l border-[var(--border)] bg-[var(--accent)]/[0.04] p-5 text-[14px] leading-relaxed text-[var(--text-muted)]">{r.sicht}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Karten pro Kriterium */}
          <div className="mt-8 grid gap-4 md:hidden">
            {rows.map((r) => (
              <div key={r.kriterium} className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gold-text)]">{r.kriterium}</span>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--text)]">KI-Optimierung</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-muted)]">{r.opt}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--accent)]/[0.05] p-4">
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">KI-Sichtbarkeit</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-muted)]">{r.sicht}</p>
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
            Wann brauchst du was?
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            <div className="rounded-3xl border border-[var(--border)] bg-white p-7 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--text)]">KI-Optimierung, wenn …</h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-[var(--text)] sm:text-[15px]">
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span>du intern <strong className="font-semibold">Zeit verlierst</strong> mit repetitiven Aufgaben, die ein System übernehmen könnte.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span>du <strong className="font-semibold">Kosten senken</strong> und Abläufe schlanker machen willst.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span>dein Team mit <strong className="font-semibold">Chatbots oder Assistenten</strong> entlastet werden soll.</span></li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent)]/[0.04] p-7 shadow-[0_10px_40px_-20px_rgba(22,99,222,0.18)] sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--accent)]">KI-Sichtbarkeit, wenn …</h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-[var(--text)] sm:text-[15px]">
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[12px] font-bold text-[var(--accent)]">✓</span><span>du <strong className="font-semibold">neue Anfragen</strong> gewinnen willst, statt nur Bestehendes zu verwalten.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[12px] font-bold text-[var(--accent)]">✓</span><span>deine Zielgruppe zunehmend <strong className="font-semibold">ChatGPT &amp; Perplexity</strong> statt Google fragt.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[12px] font-bold text-[var(--accent)]">✓</span><span>du dich <strong className="font-semibold">früh als Experte</strong> positionieren willst, bevor es der Wettbewerb tut.</span></li>
              </ul>
            </div>
          </div>

          {/* Fazit — beides kombiniert */}
          <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-2)]/50 p-7 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">Beides kombiniert</p>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-[16px]">
              In vielen Unternehmen greift beides ineinander: KI-Sichtbarkeit bringt die Anfragen{" "}
              <span className="font-semibold text-[var(--text)]">herein</span>, KI-Optimierung sorgt dafür, dass du sie effizient{" "}
              <span className="font-semibold text-[var(--text)]">abarbeitest</span>. Der eine Kanal füllt den Funnel, der andere macht den Betrieb dahinter schlanker. Der klare Fokus bei Wohlstandsmarketing liegt auf KI-Sichtbarkeit — als untrennbares Paket aus Webdesign, GEO und SEO.
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
            headline={<>Was ist für dich <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">der richtige Hebel</span>?</>}
            subline="15-Min-Erstgespräch mit Albert — wir schauen auf deine Situation und sagen dir ehrlich, ob KI-Optimierung, KI-Sichtbarkeit oder die Kombination zuerst zieht. Auch wenn wir nicht zusammenarbeiten."
          />
        </div>
      </section>

      {/* ── CROSS-LINK ──────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">Tiefer einsteigen</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            Beide Themen im Detail
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/ki-optimierung" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">KI-Optimierung<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/ki-sichtbarkeit" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">KI-Sichtbarkeit<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/sichtbarkeits-check" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Kostenloser KI-Check<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/preise" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Angebot<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── BLOG-CLUSTER ────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-[var(--border)] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Wissensbasis</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">Mehr zu KI-Sichtbarkeit &amp; SEO</h2>
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
            KI-Optimierung vs. KI-Sichtbarkeit — was du wissen willst
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
        headline={<>Welcher Hebel zieht <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">bei dir</span>?</>}
        subline="15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung, ob KI-Optimierung, KI-Sichtbarkeit oder die Kombination dein nächster Schritt ist."
      />

      <Footer />
    </main>
  );
}
