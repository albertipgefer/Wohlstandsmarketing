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
  title: "KI-Optimierung & Automatisierung für Mittelstand",
  description:
    "KI-Optimierung für Mittelstand: KI direkt in deine Abläufe bringen — Chatbots, KI-Assistenten und automatisierte Workflows, die wiederkehrende Aufgaben übernehmen und dir echte Zeit und Kosten sparen.",
  alternates: { canonical: "/ki-optimierung" },
  openGraph: {
    title: "KI-Optimierung & Automatisierung für Mittelstand",
    description:
      "KI, die in deinen Abläufen arbeitet — Chatbots, Assistenten und automatisierte Workflows, die dir echte Zeit sparen.",
    type: "website",
  },
};

export default function KiOptimierungHubPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "KI-Optimierung für Mittelstand",
    serviceType: "KI-Beratung & Prozessautomatisierung",
    provider: { "@id": `${SITE}#organization` },
    areaServed: { "@type": "Country", name: "Deutschland" },
    description:
      "KI in die internen Abläufe bringen: Prozess-Analyse, KI-Chatbots, KI-Assistenten, Workflow-Automatisierung, Einbindung in bestehende Tools und Team-Schulung — KI, die wiederkehrende Aufgaben übernimmt und Zeit spart.",
    audience: { "@type": "BusinessAudience", audienceType: "Mittelstand DACH" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "KI-Optimierung", item: `${SITE}/ki-optimierung` },
    ],
  };

  const faqs = [
    {
      q: "Was ist der Unterschied zwischen KI-Optimierung und KI-Sichtbarkeit?",
      a: "Zwei völlig verschiedene Dinge. KI-Optimierung bringt KI in deine internen Abläufe (nach innen) — sie automatisiert Aufgaben, beantwortet Anfragen, pflegt Daten und spart dir so Zeit und Geld. KI-Sichtbarkeit sorgt dafür, dass dein Unternehmen von ChatGPT, Perplexity & Co. empfohlen wird (nach außen), damit du gefunden wirst. Das eine bringt Effizienz, das andere Anfragen. Verwechsle die beiden nicht — wir bieten beides, aber es sind getrennte Hebel.",
    },
    {
      q: "Ist KI nicht zu kompliziert für ein kleines Unternehmen?",
      a: "Genau deshalb begleiten wir dich. Du brauchst kein technisches Wissen — wir analysieren deine Abläufe, setzen die passende Lösung um und schulen dein Team. Der Maßstab ist immer: Spart es dir spürbar Zeit oder Geld? Wenn nicht, machen wir es nicht. Gerade kleine Betriebe profitieren am meisten, weil sie wenige Hände auf viele Aufgaben verteilen.",
    },
    {
      q: "Was kann KI in meinem Betrieb konkret übernehmen?",
      a: "Typische Beispiele: Anfragen automatisch beantworten und qualifizieren, Angebote vorbereiten, Daten zwischen Tools synchronisieren, Texte und Reportings erstellen, einen Chatbot auf der Webseite betreiben oder einen internen Assistenten für wiederkehrende Aufgaben. Wir starten immer dort, wo der Hebel am größten ist — nicht dort, wo es am meisten glänzt.",
    },
    {
      q: "Wie steht es um Datenschutz und Datensicherheit?",
      a: "Das hat Priorität. Wir wählen Modelle und Setups, die DSGVO-konform betrieben werden können, und arbeiten — wo nötig — mit Anbietern, die in der EU hosten oder Auftragsverarbeitung anbieten. Sensible Daten bleiben dort, wo sie hingehören. Wir klären vorab, welche Daten die KI sehen darf und welche nicht, statt blind alles in ein fremdes Tool zu kippen.",
    },
    {
      q: "Welche Tools und Modelle nutzt ihr?",
      a: "Wir sind nicht an einen Anbieter gebunden, sondern wählen das passende Werkzeug zur Aufgabe — von den großen Sprachmodellen (z. B. GPT, Claude) bis zu schlanken Automatisierungs-Plattformen, die deine bestehenden Tools verbinden. Wo möglich binden wir die Lösung in dein vorhandenes Setup ein, statt eine teure Insellösung danebenzustellen.",
    },
    {
      q: "Wie messt ihr den Nutzen?",
      a: "Konkret und nüchtern: eingesparte Stunden pro Woche, Reaktionszeit auf Anfragen, Durchlaufzeit von Prozessen und — wo messbar — eingesparte Kosten. Vor dem Start schätzen wir den Hebel realistisch ein, danach prüfen wir, ob die Automation hält, was sie verspricht. Bringt sie nichts, bauen wir sie nicht weiter aus.",
    },
    {
      q: "Wie schnell ist eine erste KI-Lösung einsatzbereit?",
      a: "Oft schneller, als du denkst. Nach einer kurzen Analyse-Woche steht in vielen Fällen schon innerhalb von zwei bis vier Wochen die erste Automation live — bewusst klein gestartet, damit du früh einen echten Nutzen siehst, statt monatelang ins Blaue zu entwickeln. Danach bauen wir Schritt für Schritt aus.",
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
            <span className="text-[var(--text)]">KI-Optimierung</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-semibold text-[var(--accent)]">Service</span>
                <span className="text-[var(--text-subtle)]">·</span>
                KI-Optimierung
              </div>

              <h1 className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.02] tracking-[-0.04em] text-[var(--text)]" style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)" }}>
                KI-Optimierung für{" "}
                <span className="relative inline-block">
                  <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Mittelstand</span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 240 12" fill="none" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 8C 60 2, 120 10, 180 5 S 230 7, 238 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                KI, die in deinen Abläufen arbeitet — Chatbots, Assistenten und automatisierte Workflows, die dir{" "}
                <span className="font-semibold text-[var(--text)]">echte Zeit sparen</span>. Nicht zu verwechseln mit KI-Sichtbarkeit (nach außen): hier bringen wir KI nach innen, in deinen Betrieb.
              </p>

              <div className="mx-auto mt-8 w-full max-w-md overflow-hidden rounded-3xl lg:hidden">
                <Image src="/albert-portrait.jpg" alt="Albert Ipgefer — KI-Optimierung für Mittelstand" width={1226} height={1300} priority fetchPriority="high" quality={75} sizes="(max-width: 640px) 360px, 480px" className="h-auto w-full" />
              </div>

              <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3">
                <Link href="/#strategie" aria-label="Erstgespräch zu KI-Optimierung sichern" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]">
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
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Gewinne Zeit zurück</strong> — KI übernimmt wiederkehrende Aufgaben, die heute deinen Tag fressen.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Automatisiere Abläufe</strong> wie Anfragen, Angebote und Datenpflege — rund um die Uhr.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Bleib bei deinen Tools</strong> — KI wird eingebunden, statt teure Insellösungen danebenzustellen.</span></li>
                <li className="flex items-start gap-2.5"><span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span><span><strong className="font-semibold">Datenschutz von Anfang an</strong> — DSGVO-konforme Setups, keine Blackbox.</span></li>
              </ul>
              <div className="mx-auto mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 lg:hidden">
                <Link href="/#strategie" aria-label="KI-Optimierung — unverbindliches Erstgespräch sichern" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]">
                  <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Jetzt unverbindliches Erstgespräch sichern</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <p className="text-center text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">15-Min · Kostenfrei · Albert persönlich</p>
              </div>
            </div>

            <div className="relative order-2 mx-auto hidden aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-3xl lg:block">
              <Image src="/albert-portrait.jpg" alt="Albert Ipgefer — KI-Optimierung für Mittelstand" fill priority fetchPriority="high" quality={85} sizes="440px" className="object-cover object-[50%_35%]" />
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
            Sechs konkrete KI-Hebel
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {[
              { no: "01", title: "Prozess-Analyse", desc: "Wir schauen uns deine Abläufe an und finden die Stellen, an denen KI dir echte Zeit und Kosten spart — nicht dort, wo es nur glänzt." },
              { no: "02", title: "KI-Chatbots", desc: "Ein Chatbot auf deiner Webseite oder im Support, der Anfragen rund um die Uhr beantwortet, qualifiziert und entlastet — im Ton deiner Marke." },
              { no: "03", title: "KI-Assistenten", desc: "Interne Assistenten, die wiederkehrende Aufgaben übernehmen: Texte, Reportings, Recherche, Vorbereitung — dein Team bekommt Rückenwind." },
              { no: "04", title: "Workflow-Automatisierung", desc: "Anfragen, Angebote und Datenpflege laufen automatisch — wiederkehrende Handgriffe verschwinden aus deinem Tag." },
              { no: "05", title: "Einbindung in deine Tools", desc: "KI wird in dein bestehendes Setup integriert, statt eine teure Insellösung danebenzustellen — sauber verbunden mit dem, was du schon nutzt." },
              { no: "06", title: "Team-Schulung", desc: "Damit die KI im Alltag wirklich genutzt wird: Wir schulen dein Team, sicher und souverän damit zu arbeiten." },
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
            Die WSM-Methode für KI-Optimierung
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {[
              { no: "01", days: "Woche 1", title: "Analyse & Potenzial", desc: "Wir durchleuchten deine Abläufe und finden die Stellen mit dem größten Hebel — wo KI dir spürbar Zeit oder Geld spart." },
              { no: "02", days: "Woche 2 – 4", title: "Erste Automation live", desc: "Bewusst klein gestartet: Die erste KI-Lösung geht scharf — ein Chatbot, ein Assistent oder ein automatisierter Workflow, der ab sofort arbeitet." },
              { no: "03", days: "Laufend", title: "Ausbauen & optimieren", desc: "Schritt für Schritt weitere Abläufe automatisieren, nachjustieren und das Team schulen — wir bauen aus, was nachweislich Nutzen bringt." },
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
            context="KI-Optimierung · 15-Min · Kostenfrei"
            headline={<>Klingt das nach dem, <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">was du suchst</span>?</>}
            subline="15-Min-Erstgespräch mit Albert — ehrlich, konkret, mit klarem nächsten Schritt für deine KI-Optimierung. Auch wenn wir nicht zusammenarbeiten."
          />
        </div>
      </section>

      {/* ── STÄDTE-GRID ──────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Standorte</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            KI-Optimierung in deiner Stadt
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Lokal verankert für {cities.length} DACH-Regionen — wähle deinen Standort für stadtspezifische Inhalte:
          </p>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {cities.map((c) => (
              <Link key={`kiopt-hub-${c.slug}`} href={`/ki-optimierung/${c.slug}`} className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2.5 text-[13px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">
                KI-Optimierung in {c.name}
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
            KI-Optimierung + Web-Apps + Sichtbarkeit aus einer Hand
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/ki-sichtbarkeit" className="group inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/[0.06] px-5 py-2.5 text-[14px] font-semibold text-[var(--gold-text)] transition hover:border-transparent hover:bg-[var(--gold-text)] hover:text-white">KI-Optimierung ≠ KI-Sichtbarkeit?<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/web-apps" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Web-Apps & Automatisierung<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/e-mail-marketing" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">E-Mail-Marketing<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/seo" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">SEO-Optimierung<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
            <Link href="/preise" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">Angebot<span className="transition-transform group-hover:translate-x-0.5">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Häufige Fragen</p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            KI-Optimierung — was du wissen willst
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
        headline={<>Bereit, deine <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Zeit</span> zurückzugewinnen?</>}
        subline="15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung deines KI-Potenzials — auch wenn wir nicht zusammenarbeiten."
      />

      <Footer />
    </main>
  );
}
