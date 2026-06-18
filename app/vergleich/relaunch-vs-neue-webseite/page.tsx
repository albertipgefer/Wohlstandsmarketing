import type { Metadata } from "next";
import Link from "next/link";
import { getRelaunchPosts } from "@/content/blog";
import BlogNav from "@/components/blog/BlogNav";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";
import ReviewBadges from "@/components/ReviewBadges";

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  title: "Relaunch oder neue Webseite? Der ehrliche Vergleich 2026",
  description:
    "Relaunch vs. komplett neue Webseite: Bestehende Rankings retten oder auf der grünen Wiese neu starten? Der ehrliche Vergleich mit klarer Entscheidungshilfe für Mittelstand.",
  alternates: { canonical: "/vergleich/relaunch-vs-neue-webseite" },
  openGraph: {
    title: "Relaunch oder neue Webseite? Der ehrliche Vergleich",
    description:
      "Bestehende Seite modernisieren oder von Grund auf neu bauen — was lohnt sich für dich? Vergleich, Entscheidungshilfe und ehrliches Fazit.",
    type: "article",
  },
};

export default function RelaunchVsNeuPage() {
  const relatedPosts = getRelaunchPosts(4);

  const rows = [
    {
      kriterium: "Was es ist",
      a: "Deine bestehende Seite wird modernisiert — Inhalte und URLs migrieren mit.",
      b: "Ein komplett neuer Aufbau von Grund auf, ohne Altlasten.",
    },
    {
      kriterium: "Bestehende Rankings",
      a: "Bleiben erhalten — saubere 301-Weiterleitungen sichern den SEO-Wert.",
      b: "Starten meist neu — Rankings müssen neu aufgebaut werden.",
    },
    {
      kriterium: "Inhalte",
      a: "Bestehende Inhalte werden übernommen und verbessert.",
      b: "Inhalte werden komplett neu konzipiert und geschrieben.",
    },
    {
      kriterium: "Positionierung",
      a: "Marke und Ausrichtung bleiben im Kern bestehen.",
      b: "Idealer Moment für eine komplette Neupositionierung.",
    },
    {
      kriterium: "Aufwand",
      a: "Migration plus Modernisierung — klar planbar.",
      b: "Mehr konzeptionelle Arbeit, dafür keine Kompromisse.",
    },
    {
      kriterium: "Risiko",
      a: "Gering — auf Staging getestet, keine Downtime.",
      b: "Etwas höher (Rankings, Domain), aber maximale Freiheit.",
    },
    {
      kriterium: "Zeit bis live",
      a: "Mit der WSM-Methode in 7 Tagen live.",
      b: "Je nach Umfang — ähnlich planbar, mit mehr Konzeptphase.",
    },
    {
      kriterium: "Ideal für",
      a: "Wer Substanz und Rankings hat, die er nicht verlieren will.",
      b: "Wer neu startet, sich neu positioniert oder bei null anfängt.",
    },
  ];

  const faqs = [
    {
      q: "Verliere ich beim Relaunch meine Google-Rankings?",
      a: "Nein — wenn der Relaunch sauber gemacht wird. Mit URL-Mapping und 301-Weiterleitungen wird der bestehende SEO-Wert auf die neue Seite überzogen. Genau das ist der größte Vorteil eines Relaunches gegenüber einem kompletten Neustart: Du behältst, was du dir an Sichtbarkeit aufgebaut hast.",
    },
    {
      q: "Wann lohnt sich ein kompletter Neubau statt eines Relaunches?",
      a: "Wenn deine Domain oder Marke ohnehin neu ist, du dich komplett neu positionierst, oder die alte Basis technisch und inhaltlich nichts Erhaltenswertes bietet. In diesen Fällen wäre das Migrieren von Altlasten mehr Ballast als Nutzen — dann ist die grüne Wiese der bessere Weg.",
    },
    {
      q: "Ist ein Relaunch günstiger als eine komplett neue Seite?",
      a: "Häufig ja, weil bestehende Inhalte und Struktur als Basis dienen. Entscheidend ist aber der Umfang: Ein Relaunch mit großer Migration kann ähnlich aufwändig sein wie ein Neubau. Die konkrete Investition hängt von Komplexität und Zielsetzung ab — das stimmen wir transparent im Erstgespräch ab.",
    },
    {
      q: "Geht meine Seite während des Relaunches offline?",
      a: "Nein. Wir bauen die neue Version parallel auf einer Staging-Umgebung. Erst wenn alles getestet ist und die Migration sauber läuft, schalten wir um. Du hast keine Downtime und kannst die neue Seite vorher in Ruhe abnehmen.",
    },
    {
      q: "Was passiert mit meinen alten Inhalten?",
      a: "Beim Relaunch übernehmen und verbessern wir, was funktioniert — und lassen bewusst weg, was nicht mehr passt. Bei einem Neubau werden Inhalte von Grund auf neu konzipiert. In beiden Fällen sorgen wir dafür, dass relevante Inhalte SEO-sicher erhalten bleiben.",
    },
    {
      q: "Wie schnell ist die neue Seite live?",
      a: "Die WSM-Methode hat einen festen Rhythmus: Tag 1–3 Audit und Strategie, Tag 4–7 neue Seite live (beim Relaunch inkl. URL-Migration). Danach läuft die KI-Indexierung und SEO-Konsolidierung über 90 Tage. Ob Relaunch oder Neubau — der Live-Gang ist in beiden Fällen planbar.",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Vergleich", item: `${SITE}/vergleich/relaunch-vs-neue-webseite` },
      { "@type": "ListItem", position: 3, name: "Relaunch vs. neue Webseite", item: `${SITE}/vergleich/relaunch-vs-neue-webseite` },
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
    headline: "Relaunch oder neue Webseite? Der ehrliche Vergleich 2026",
    description:
      "Relaunch vs. komplett neue Webseite: bestehende Rankings retten oder auf der grünen Wiese neu starten?",
    author: { "@id": `${SITE}#person-albert` },
    publisher: { "@id": `${SITE}#organization` },
    inLanguage: "de-DE",
    mainEntityOfPage: `${SITE}/vergleich/relaunch-vs-neue-webseite`,
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
            Relaunch oder{" "}
            <span className="relative inline-block">
              <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">neue Webseite</span>
              <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 360 12" fill="none" preserveAspectRatio="none" aria-hidden>
                <path d="M2 8C 90 2, 180 10, 270 5 S 350 7, 358 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
              </svg>
            </span>?
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Deine bestehende Seite modernisieren und Rankings retten — oder komplett neu starten? Was sich für dich{" "}
            <span className="font-semibold text-[var(--text)]">wirklich lohnt</span>, hier ehrlich gegenübergestellt.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-[var(--text-muted)] lg:justify-start">
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Beide Wege ehrlich</span>
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
              Ein <strong className="font-semibold">Relaunch</strong>{" "}baut auf deiner bestehenden Seite auf — Inhalte, URLs und Rankings bleiben erhalten und werden modernisiert.
              Eine <strong className="font-semibold">neue Webseite</strong>{" "}startet auf der grünen Wiese, ohne Altlasten.
              Faustregel: Substanz und Rankings vorhanden →{" "}
              <span className="font-semibold text-[var(--accent)]">Relaunch</span>; Neupositionierung oder kein Fundament → Neubau.
            </p>
          </div>
        </div>
      </section>

      {/* ── VERGLEICHSTABELLE ───────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Direkt gegenübergestellt</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Relaunch vs. Neubau im Vergleich
          </h2>

          <div className="mt-10 hidden overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] md:block">
            <div className="grid grid-cols-[1.05fr_1fr_1fr]">
              <div className="border-b border-[var(--border)] p-5" />
              <div className="border-b border-l border-[var(--border)] p-5">
                <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--text)]">Relaunch</span>
                <p className="mt-1 text-[12px] text-[var(--text-subtle)]">Modernisieren & migrieren</p>
              </div>
              <div className="border-b border-l border-[var(--border)] bg-[var(--accent)]/[0.04] p-5">
                <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--accent)]">Neue Webseite</span>
                <p className="mt-1 text-[12px] text-[var(--text-subtle)]">Neustart ohne Altlasten</p>
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
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--text)]">Relaunch</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-muted)]">{r.a}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--accent)]/[0.05] p-4">
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Neue Webseite</p>
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
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--text)]">Relaunch, wenn …</h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-[var(--text)] sm:text-[15px]">
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span>du bereits <strong className="font-semibold">Google-Rankings oder Traffic</strong> hast, die du nicht verlieren willst.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span>deine Inhalte grundsätzlich <strong className="font-semibold">passen und erhaltenswert</strong> sind.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span>du <strong className="font-semibold">keine komplette Neupositionierung</strong> brauchst.</span></li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent)]/[0.04] p-7 shadow-[0_10px_40px_-20px_rgba(22,99,222,0.18)] sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--accent)]">Neue Webseite, wenn …</h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-[var(--text)] sm:text-[15px]">
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[12px] font-bold text-[var(--accent)]">✓</span><span>deine <strong className="font-semibold">Domain oder Marke neu</strong> ist.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[12px] font-bold text-[var(--accent)]">✓</span><span>du dich <strong className="font-semibold">komplett neu positionierst</strong>.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[12px] font-bold text-[var(--accent)]">✓</span><span>die alte Basis <strong className="font-semibold">technisch und inhaltlich nichts Erhaltenswertes</strong> bietet.</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-2)]/50 p-7 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">Die ehrliche Antwort</p>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-[16px]">
              In den meisten Fällen ist der <span className="font-semibold text-[var(--text)]">Relaunch der klügere Weg</span> — du behältst deinen SEO-Wert und sparst dir den kompletten Neuaufbau. Nur bei echter Neupositionierung oder fehlendem Fundament lohnt der Neubau. Wir sagen dir im Erstgespräch ehrlich, was in deinem Fall mehr Sinn macht.
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
            headline={<>Relaunch oder Neubau — <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">was ist klüger</span>?</>}
            subline="15-Min-Erstgespräch mit Albert — wir schauen auf deine bestehende Seite und sagen dir ehrlich, ob ein Relaunch oder ein Neubau der bessere Weg ist. Auch wenn wir nicht zusammenarbeiten."
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
            <Link href="/relaunch" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Webseiten-Relaunch<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/webdesign" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Webdesign-Übersicht<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/vergleich/landingpage-vs-unternehmenswebsite" className="group inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/[0.06] px-5 py-2.5 text-[14px] font-semibold text-[var(--gold-text)] transition hover:border-transparent hover:bg-[var(--gold-text)] hover:text-white">Landingpage oder Website?<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/preise" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Angebot<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── BLOG-CLUSTER ────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-[var(--border)] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Wissensbasis</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">Mehr zu Relaunch &amp; Webseiten</h2>
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
            Relaunch vs. Neubau — was du wissen willst
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
        headline={<>Relaunch oder <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Neustart</span>?</>}
        subline="15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung, ob sich für deine Seite ein Relaunch lohnt — oder ein Neubau der sauberere Weg ist."
      />

      <Footer />
    </main>
  );
}
