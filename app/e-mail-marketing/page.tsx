import type { Metadata } from "next";
import Link from "next/link";
import { ServiceHeroImageDesktop, ServiceHeroImageMobile } from "@/components/ServiceHeroImage";
import { cities } from "@/content/cities";
import BlogNav from "@/components/blog/BlogNav";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";
import ReviewBadges from "@/components/ReviewBadges";

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  title: "E-Mail-Marketing für Mittelstand · Newsletter & Automationen",
  description:
    "E-Mail-Marketing für Mittelstand: Listenaufbau (DSGVO-konform), automatisierte Verkaufsstrecken, Newsletter im Look deiner Marke — der Kanal, der dir gehört. Mehr Umsatz aus bestehenden Kontakten.",
  alternates: { canonical: "/e-mail-marketing" },
  openGraph: {
    title: "E-Mail-Marketing für Mittelstand",
    description:
      "Aus Kontakten planbar Umsatz machen — Newsletter & automatisierte Strecken, die rund um die Uhr arbeiten.",
    type: "website",
  },
};

export default function EmailMarketingHubPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "E-Mail-Marketing für Mittelstand",
    serviceType: "E-Mail-Marketing",
    provider: { "@id": `${SITE}#organization` },
    areaServed: { "@type": "Country", name: "Deutschland" },
    description:
      "Listenaufbau, automatisierte Willkommens- und Verkaufsstrecken, Newsletter und Reporting — E-Mail-Marketing, das aus Kontakten Anfragen und Wiederkäufe macht.",
    audience: { "@type": "BusinessAudience", audienceType: "Mittelstand DACH" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "E-Mail-Marketing", item: `${SITE}/e-mail-marketing` },
    ],
  };

  const faqs = [
    {
      q: "Lohnt sich E-Mail-Marketing für mein Unternehmen überhaupt noch?",
      a: "Mehr denn je. E-Mail ist der einzige Kanal, der dir wirklich gehört — keine Plattform kann dir deine Liste wegnehmen oder die Reichweite drosseln. Richtig aufgesetzt, gehört E-Mail zu den profitabelsten Kanälen überhaupt, weil du Menschen erreichst, die dich bereits kennen.",
    },
    {
      q: "Ich habe noch keine E-Mail-Liste — ist das ein Problem?",
      a: "Nein. Genau da fangen wir an: Wir bauen die Liste DSGVO-konform über deine Webseite auf (z. B. mit einem nützlichen Lead-Magneten) und richten von Beginn an die Automationen ein, die neue Kontakte aufwärmen. So wächst die Liste, während sie schon verkauft.",
    },
    {
      q: "Wer schreibt die E-Mails — ich oder ihr?",
      a: "Wir. Du gibst die Eckpunkte, wir übernehmen Konzept, Text, Aufbau und Versand. Auf Wunsch stimmen wir jede Kampagne vorher mit dir ab — du behältst die Kontrolle, ohne die Arbeit zu haben.",
    },
    {
      q: "Ist das alles DSGVO-konform?",
      a: "Ja, das hat Priorität. Wir arbeiten mit Double-Opt-in, sauberer Einwilligungs-Dokumentation und einem Anbieter, der DSGVO-konform betrieben werden kann. So baust du eine Liste auf, die rechtssicher ist — nicht eine, die dir später Ärger macht.",
    },
    {
      q: "Mit welchem Tool arbeitet ihr?",
      a: "Wir richten uns nach deinem Setup und Budget — von schlank bis professionell. Wenn du noch kein Tool hast, empfehlen wir eines, das zu deiner Größe passt, und richten alles ein. Du bist nicht an einen teuren Anbieter gebunden, den du nicht brauchst.",
    },
    {
      q: "Wie messt ihr den Erfolg?",
      a: "Konkret: Öffnungs- und Klickraten, Listenwachstum, Conversions und — wo messbar — der Umsatz pro Kampagne und pro automatisierter Strecke. Du bekommst klare Zahlen statt Bauchgefühl.",
    },
    {
      q: "Passt E-Mail-Marketing zu meiner Webseite und meinem SEO?",
      a: "Perfekt sogar. SEO und Content bringen Besucher, E-Mail-Marketing verwandelt sie in Kontakte und hält sie warm, bis sie kaufbereit sind. Am stärksten ist die Kombination: gefunden werden, einsammeln, nachfassen — automatisiert.",
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
            <span className="text-[var(--text)]">E-Mail-Marketing</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-semibold text-[var(--accent)]">Service</span>
                <span className="text-[var(--text-subtle)]">·</span>
                E-Mail-Marketing
              </div>

              <h1 className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.02] tracking-[-0.04em] text-[var(--text)]" style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)" }}>
                E-Mail-Marketing für{" "}
                <span className="relative inline-block">
                  <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Mittelstand</span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 240 12" fill="none" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 8C 60 2, 120 10, 180 5 S 230 7, 238 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                Der direkteste Draht zu deinen Kunden — ohne Algorithmus dazwischen. Wir machen aus deinen Kontakten{" "}
                <span className="font-semibold text-[var(--text)]">planbar Anfragen und Wiederkäufe</span>.
              </p>

              <ServiceHeroImageMobile src="/hero/e-mail-marketing.webp" alt="E-Mail-Marketing für Mittelstand — Wohlstandsmarketing" />

              <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3">
                <Link href="/#strategie" aria-label="Erstgespräch zu E-Mail-Marketing sichern" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]">
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
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Hol mehr aus Kontakten heraus</strong>, die du längst hast — statt nur auf neue Leads zu hoffen.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Verkaufe automatisiert</strong> mit Strecken, die rund um die Uhr für dich arbeiten.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Besitze deinen Kanal</strong> — eine Liste, die dir gehört, statt gemieteter Reichweite.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">DSGVO-konform</strong> von Tag 1 — rechtssicher aufgebaut, nicht zusammengeschustert.</span></li>
              </ul>
              <div className="mx-auto mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 lg:hidden">
                <Link href="/#strategie" aria-label="E-Mail-Marketing — unverbindliches Erstgespräch sichern" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]">
                  <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Jetzt unverbindliches Erstgespräch sichern</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <p className="text-center text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">15-Min · Kostenfrei · Albert persönlich</p>
              </div>
            </div>

            <ServiceHeroImageDesktop src="/hero/e-mail-marketing.webp" alt="E-Mail-Marketing für Mittelstand — Wohlstandsmarketing" />
          </div>
        </div>
      </section>

      {/* ── WAS DU BEKOMMST ──────────────────────────────────────── */}
      <section className="bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Was du bekommst</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Sechs konkrete E-Mail-Hebel
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {[
              { no: "01", title: "Listenaufbau (DSGVO)", desc: "Double-Opt-in, Anmeldeformulare und ein nützlicher Lead-Magnet, der echte Kontakte einsammelt — rechtssicher." },
              { no: "02", title: "Willkommens-Strecke", desc: "Neue Kontakte werden automatisch aufgewärmt: wer du bist, warum du, klarer erster Handlungsschritt." },
              { no: "03", title: "Verkaufs-Automationen", desc: "Strecken, die rund um die Uhr verkaufen — vom Interessenten zum Kunden, ohne dass du manuell nachfasst." },
              { no: "04", title: "Newsletter im Marken-Look", desc: "Geplanter, wiedererkennbarer Newsletter statt Versand nach Lust und Laune — im Design deiner Marke." },
              { no: "05", title: "Betreff- & Inhalts-Optimierung", desc: "Getestete Betreffzeilen und klare Inhalte für hohe Öffnungs- und Klickraten." },
              { no: "06", title: "Reporting & Optimierung", desc: "Öffnungen, Klicks, Umsatz pro Kampagne — transparent, mit klaren nächsten Schritten." },
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
            Die WSM-Methode für E-Mail-Marketing
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {[
              { no: "01", days: "Woche 1", title: "Setup & Strategie", desc: "Tool-Setup, DSGVO-konforme Anmeldung, Lead-Magnet-Konzept und ein Plan, welche Strecken zuerst Umsatz bringen." },
              { no: "02", days: "Woche 2 – 3", title: "Automationen live", desc: "Willkommens- und Verkaufs-Strecken werden aufgebaut, getextet und scharf geschaltet — sie arbeiten ab sofort." },
              { no: "03", days: "Laufend", title: "Newsletter & Optimierung", desc: "Regelmäßiger Newsletter, A/B-Tests, Reporting — wir drehen kontinuierlich an Öffnung, Klick und Umsatz." },
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
            context="E-Mail-Marketing · 15-Min · Kostenfrei"
            headline={<>Klingt das nach dem, <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">was du suchst</span>?</>}
            subline="15-Min-Erstgespräch mit Albert — ehrlich, konkret, mit klarem nächsten Schritt für dein E-Mail-Marketing. Auch wenn wir nicht zusammenarbeiten."
          />
        </div>
      </section>

      {/* ── STÄDTE-GRID ──────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Standorte</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            E-Mail-Marketing in deiner Stadt
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Lokal verankert für {cities.length} DACH-Regionen — wähle deinen Standort für stadtspezifische Inhalte:
          </p>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {cities.map((c) => (
              <Link key={`email-hub-${c.slug}`} href={`/e-mail-marketing/${c.slug}`} className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2.5 text-[13px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">
                E-Mail-Marketing in {c.name}
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
            E-Mail-Marketing + Content + Webseite aus einer Hand
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/content-marketing" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Content-Marketing<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/seo" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">SEO-Optimierung<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
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
            E-Mail-Marketing — was du wissen willst
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
        headline={<>Bereit, deine Liste zum <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Umsatzkanal</span> zu machen?</>}
        subline="15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung deines E-Mail-Potenzials — auch wenn wir nicht zusammenarbeiten."
      />

      <Footer />
    </main>
  );
}
