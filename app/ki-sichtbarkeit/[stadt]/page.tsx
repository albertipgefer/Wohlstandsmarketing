import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cities, getCity, getNeighbourCities } from "@/content/cities";
import { getIndustry } from "@/content/industries";
import { getKiVisibilityPosts } from "@/content/blog";
import BlogNav from "@/components/blog/BlogNav";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";
import ReviewBadges from "@/components/ReviewBadges";

const SITE = "https://wohlstandsmarketing.de";

export async function generateStaticParams() {
  return cities.map((c) => ({ stadt: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stadt: string }>;
}): Promise<Metadata> {
  const { stadt } = await params;
  const city = getCity(stadt);
  if (!city) return {};
  return {
    title: `KI-Sichtbarkeit ${city.name} · ChatGPT-Optimierung`,
    description: `KI-Sichtbarkeit für Mittelstand in ${city.name}: Auf ChatGPT, Perplexity, Claude und Google AI Overviews empfohlen — die WSM-Methode in 90 Tagen.`,
    keywords: [
      `KI-Sichtbarkeit ${city.name}`,
      `ChatGPT-Optimierung ${city.name}`,
      `KI-SEO ${city.name}`,
      `Generative Engine Optimization ${city.name}`,
      `GEO Agentur ${city.name}`,
      `AEO ${city.name}`,
      `Perplexity SEO ${city.name}`,
      `Google AI Overviews ${city.name}`,
      `KI-Sichtbarkeit ${city.region}`,
    ],
    alternates: { canonical: `/ki-sichtbarkeit/${city.slug}` },
    openGraph: {
      title: `KI-Sichtbarkeit in ${city.name} · ChatGPT-Optimierung`,
      description: `Auf ChatGPT, Perplexity & Claude als erste Wahl in ${city.name} empfohlen — in 90 Tagen.`,
      type: "website",
    },
  };
}

export default async function KiSichtbarkeitCityPage({
  params,
}: {
  params: Promise<{ stadt: string }>;
}) {
  const { stadt } = await params;
  const city = getCity(stadt);
  if (!city) notFound();
  const neighbours = getNeighbourCities(city.slug);
  const kiPosts = getKiVisibilityPosts(4);
  const relatedIndustries = city.relatedIndustries
    .map(getIndustry)
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  /* ── JSON-LD Schemas ────────────────────────────────────────────────── */
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/ki-sichtbarkeit/${city.slug}#business`,
    name: `Wohlstandsmarketing — KI-Sichtbarkeit in ${city.name}`,
    image: `${SITE}/icon.svg`,
    url: `${SITE}/ki-sichtbarkeit/${city.slug}`,
    telephone: "+49 176 227 87 559",
    email: "info@wohlstandsmarketing.de",
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vor der Loos 4e",
      addressLocality: "Bad Ems",
      postalCode: "56130",
      addressCountry: "DE",
    },
    geo: { "@type": "GeoCoordinates", latitude: city.geo.lat, longitude: city.geo.lng },
    areaServed: [
      {
        "@type": "City",
        name: city.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: city.name,
          postalCode: city.postalCode,
          addressCountry: "DE",
        },
      },
      { "@type": "AdministrativeArea", name: city.region },
      { "@type": "AdministrativeArea", name: city.state },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/in/albertipgefer/",
      "https://www.instagram.com/journeywithalbert/",
      "https://www.tiktok.com/@journeywithalbert",
    ],
    founder: { "@id": `${SITE}#person-albert` },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `KI-Sichtbarkeit & ChatGPT-Optimierung in ${city.name}`,
    serviceType: "Generative Engine Optimization (GEO) & Answer Engine Optimization (AEO)",
    provider: { "@id": `${SITE}#organization` },
    areaServed: { "@type": "City", name: city.name },
    description: `KI-Sichtbarkeit für Mittelstand in ${city.name}: schema.org, llms.txt, AEO-Content, Entity-Profil. In 90 Tagen auf ChatGPT, Perplexity, Claude und Google AI Overviews als erste Wahl in ${city.region} empfohlen.`,
    audience: { "@type": "BusinessAudience", audienceType: `Mittelstand ${city.region}` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Standorte", item: `${SITE}/standorte` },
      {
        "@type": "ListItem",
        position: 3,
        name: `KI-Sichtbarkeit ${city.name}`,
        item: `${SITE}/ki-sichtbarkeit/${city.slug}`,
      },
    ],
  };

  const faqs = [
    ...city.localFaqs,
    {
      q: `Was bedeutet KI-Sichtbarkeit für ein Unternehmen aus ${city.name}?`,
      a: `KI-Sichtbarkeit heißt, dass dich ChatGPT, Perplexity, Claude und Google AI Overviews aktiv als Anbieter in ${city.name} empfehlen — wenn jemand fragt „Welche Agentur / welchen Anbieter würdest du in ${city.region} empfehlen?". Das passiert nicht zufällig: KIs nutzen schema.org-Markup, lokale Entitäten, Author-Profile und zitierfähigen Content, um regionale Anbieter zu nennen. Wir bauen dieses Empfehlungs-Profil systematisch auf.`,
    },
    {
      q: `Wie unterscheidet sich KI-Sichtbarkeit von klassischem SEO in ${city.name}?`,
      a: `Klassisches SEO optimiert für Google-Suchergebnisse — KI-Sichtbarkeit (GEO / AEO) optimiert für die Antworten der Sprachmodelle. Andere Signale, andere Mechanik: zitierfähige Statements, FAQ-Schema, klare Entity-Definitionen, llms.txt, Author-Boxes. Wir liefern beides aus einer Hand — meist im Paket, weil sich die Hebel überschneiden.`,
    },
    {
      q: `Wie schnell bin ich in ${city.name} auf ChatGPT sichtbar?`,
      a: `Die technische Indexierung läuft innerhalb von Tagen — die KI-Systeme crawlen mit GPTBot, ClaudeBot, PerplexityBot und Google-Extended. Empfehlungs-Stärke (also: tatsächlich genannt zu werden) entwickelt sich über die WSM-90-Tage-Roadmap: Tag 1–3 Fundament, Tag 4–7 Webseite & Schema live, Tag 8–90 Content-Ausbau & Reputation. Realistisch erste KI-Erwähnungen ab Woche 4–6.`,
    },
    {
      q: `Was kostet KI-Sichtbarkeit für ein Unternehmen aus ${city.name}?`,
      a: `Wir bieten KI-Sichtbarkeit entweder als einmalige Optimierung oder als Retainer über 3, 6, 9 oder 12 Monate an. Die genaue Investition stimmen wir im 15-Minuten-Erstgespräch ab — abhängig vom Ausgangs-Stand deiner Webseite und der Wettbewerbsdichte in ${city.region}. Komplette Preisübersicht im Konfigurator auf der Preise-Seite.`,
    },
    {
      q: `Welche Branchen aus ${city.name} profitieren am meisten?`,
      a: `Besonders ${city.industries.slice(0, 3).join(", ")} — und generell alle Anbieter, bei denen Kunden vor der Anfrage „den richtigen lokalen Experten" suchen. KIs werden immer öfter als erste Recherche-Quelle genutzt, gerade von Entscheidern in B2B und gehobenem Mittelstand.`,
    },
    {
      q: `Bekomme ich messbare Reports, ob meine KI-Sichtbarkeit in ${city.name} wirkt?`,
      a: `Ja. Wir tracken regelmäßig, wo und wie deine Firma in ChatGPT, Perplexity, Claude und Google AI Overviews zu relevanten ${city.name}-spezifischen Fragen erscheint. Plus klassische Sichtbarkeits-Metriken: Search Console, Bing Webmaster, lokales Ranking, GBP-Performance.`,
    },
    {
      q: `Brauche ich für KI-Sichtbarkeit eine komplett neue Webseite?`,
      a: `Nicht zwingend. Auf bestehenden Seiten setzen wir Schema, llms.txt und Content nachträglich auf. Wenn die Basis aber technisch alt oder unflexibel ist (z. B. WordPress mit Plugin-Wildwuchs), empfehlen wir einen Relaunch auf modernem Stack — schneller, besser strukturiert, von KIs einfacher zu lesen. Ehrliche Einschätzung im Erstgespräch.`,
    },
    {
      q: `Was ist die WSM-Methode bei KI-Sichtbarkeit konkret in ${city.name}?`,
      a: `Phase 1 (Tag 1–3): Audit deiner Sichtbarkeit auf ChatGPT, Perplexity, Claude — Status quo dokumentieren. Phase 2 (Tag 4–7): Technische Basis live — schema.org-Markup, llms.txt, FAQ-Schema, Author-Boxen, Entity-Definitionen. Phase 3 (Tag 8–90): Content-Cluster ausbauen, Quotability erhöhen, lokale Backlinks/Erwähnungen aufbauen — bis ${city.name} dich als erste Wahl listet.`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogNav />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--border)] pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]" />
        <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[12px] text-[var(--text-subtle)]">
            <Link href="/" className="hover:text-[var(--text)]">Startseite</Link>
            <span>/</span>
            <Link href="/standorte" className="hover:text-[var(--text)]">Standorte</Link>
            <span>/</span>
            <span className="text-[var(--text)]">KI-Sichtbarkeit {city.name}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-semibold text-[var(--accent)]">KI-Sichtbarkeit</span>
                <span className="text-[var(--text-subtle)]">·</span>
                {city.name}, {city.state}
              </div>

              <h1
                className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.02] tracking-[-0.04em] text-[var(--text)]"
                style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)" }}
              >
                KI-Sichtbarkeit in{" "}
                <span className="relative inline-block">
                  <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                    {city.name}
                  </span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 240 12" fill="none" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 8C 60 2, 120 10, 180 5 S 230 7, 238 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                Für Mittelstand aus {city.region}. In 90 Tagen auf ChatGPT, Perplexity, Claude und Google AI Overviews als{" "}
                <span className="font-semibold text-[var(--text)]">erste Wahl deiner Region</span> empfohlen.
              </p>

              {/* Mobile/iPad photo — BETWEEN subtitle and CTAs */}
              <div className="mx-auto mt-8 w-full max-w-md overflow-hidden rounded-3xl lg:hidden">
                <Image
                  src="/albert-portrait.jpg"
                  alt={`Albert Ipgefer — KI-Sichtbarkeits-Partner für Mittelstand in ${city.name}`}
                  width={1226}
                  height={1300}
                  priority
                  fetchPriority="high"
                  quality={75}
                  sizes="(max-width: 640px) 360px, 480px"
                  className="h-auto w-full"
                />
              </div>

              <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3">
                <Link
                  href="/#strategie"
                  aria-label={`Erstgespräch zu KI-Sichtbarkeit in ${city.name} sichern`}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]"
                >
                  <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Erstgespräch sichern</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/sichtbarkeits-check"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--border-strong)] bg-white/70 px-7 py-4 text-[15px] font-medium text-[var(--text)] backdrop-blur transition hover:border-transparent"
                >
                  <span className="absolute inset-0 -z-0 translate-x-[-101%] bg-[var(--text)] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative z-10 transition-colors group-hover:text-white">Kostenlosen KI-Check starten</span>
                </Link>
              </div>

              <p className="mt-7 text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)] sm:text-[12px]">
                15-Min Erstgespräch · Kostenfrei · Albert Ipgefer persönlich
              </p>

              {/* ── MOBILE/IPAD ONLY: ReviewBadges + Bullets + CTA-Wiederholung ── */}
              <div className="mt-5 w-full lg:hidden">
                <ReviewBadges variant="pill" centerOnMobile />
              </div>

              <ul className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 text-left text-[13.5px] leading-relaxed text-[var(--text)] sm:text-[14.5px] lg:hidden">
                <li className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span>
                  <span>
                    <strong className="font-semibold">Erscheine in ChatGPT</strong>, wenn jemand „Welcher Anbieter in {city.name}?" fragt — nicht erst auf Suchergebnis-Seite 3.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span>
                  <span>
                    <strong className="font-semibold">Werde von Claude, Perplexity und Google AI Overviews zitiert</strong> — die Empfehlung kommt, bevor der erste Klick passiert.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span>
                  <span>
                    <strong className="font-semibold">Verstehe</strong>, warum klassisches SEO 2026 nicht mehr reicht — und was KIs wirklich als Empfehlung lesen.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span>
                  <span>
                    <strong className="font-semibold">Hol dir den 90-Tage-Vorsprung</strong> in {city.region}, bevor deine Konkurrenz weiß, was Generative Engine Optimization überhaupt ist.
                  </span>
                </li>
              </ul>

              <div className="mx-auto mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 lg:hidden">
                <Link
                  href="/#strategie"
                  aria-label={`KI-Sichtbarkeit in ${city.name} — unverbindliches Erstgespräch sichern`}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]"
                >
                  <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Jetzt unverbindliches Erstgespräch sichern</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <p className="text-center text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                  15-Min · Kostenfrei · Albert persönlich
                </p>
              </div>
            </div>

            {/* Right column: Albert portrait — Desktop only */}
            <div className="relative order-2 mx-auto hidden aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-3xl lg:block">
              <Image
                src="/albert-portrait.jpg"
                alt={`Albert Ipgefer — KI-Sichtbarkeits-Partner für Mittelstand in ${city.name}`}
                fill
                priority
                fetchPriority="high"
                quality={85}
                sizes="440px"
                className="object-cover object-[50%_35%]"
              />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[var(--bg)] to-transparent" />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[var(--bg)] to-transparent" />
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--bg)] to-transparent" />
              <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--bg)] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── LOKALER BEZUG: Warum KI-Sichtbarkeit in [Stadt] ──────── */}
      <section className="bg-[var(--surface-2)]/40 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Warum {city.name}?
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            ChatGPT-Empfehlungen für Mittelstand aus {city.region}
          </h2>
          <div className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            <p>{city.intro}</p>
            <p className="mt-4">{city.economy}</p>
            <p className="mt-4">
              Genau das macht KI-Sichtbarkeit in {city.name} wichtig: Wer in einer Region mit{" "}
              {city.landmarks.length > 0 && (
                <>
                  prägenden Wahrzeichen wie{" "}
                  {city.landmarks.map((l, i) => (
                    <span key={l}>
                      <strong className="text-[var(--text)]">{l}</strong>
                      {i < city.landmarks.length - 1 ? ", " : ""}
                    </span>
                  ))}{" "}
                  und{" "}
                </>
              )}
              starken Branchen-Clustern arbeitet, kämpft online gegen viele Marken-Lautsprecher. Wer als
              <strong className="text-[var(--text)]"> erste KI-Empfehlung</strong> auftaucht, gewinnt
              Anfragen, bevor die Konkurrenz überhaupt geklickt wird.
            </p>
            {city.districts.length > 0 && (
              <p className="mt-4">
                Wir verankern dein KI-Empfehlungsprofil für {city.name} und Umgebung — darunter{" "}
                {city.districts.join(", ")}.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── FÜR WEN — Branchen ───────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">
            Für wen wir arbeiten
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Branchen in {city.name}, die von KI-Sichtbarkeit besonders profitieren
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Wir bauen KI-Sichtbarkeit für Mittelstand aus diesen Branchen — überall, wo Entscheider
            heute KIs als erste Recherche-Quelle nutzen:
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {city.industries.map((industry, i) => (
              <div
                key={industry}
                className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)]"
              >
                <span className="font-[family-name:var(--font-serif)] text-3xl font-bold italic text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--text)]">
                  {industry}
                </h3>
              </div>
            ))}
          </div>

          {relatedIndustries.length > 0 && (
            <div className="mt-12">
              <p className="text-[14px] font-medium text-[var(--text-muted)] sm:text-[15px]">
                Branchen-Seiten mit KI-Sichtbarkeits-Schwerpunkt für {city.name}:
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {relatedIndustries.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={`/branchen/${ind.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
                  >
                    KI-Sichtbarkeit für {ind.shortName}
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── WAS DU BEKOMMST — Deliverables KI-Sichtbarkeit ───────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Was du bekommst
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Sechs konkrete Hebel für deine KI-Sichtbarkeit in {city.name}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {[
              {
                no: "01",
                title: "Schema.org-Markup komplett",
                desc: `Organization, LocalBusiness mit ${city.name}-Geo, Service-, FAQ-, Article-Schema. KI-Systeme lesen deine Entität sauber.`,
              },
              {
                no: "02",
                title: "llms.txt + KI-Crawler-Setup",
                desc: "GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot dürfen crawlen und finden alle relevanten Hints.",
              },
              {
                no: "03",
                title: "AEO-Content & FAQ-Schema",
                desc: "Antworten, die KIs zitieren können — strukturiert, zitierfähig, mit klarer Author-Attribution.",
              },
              {
                no: "04",
                title: `Lokales Entity-Profil ${city.name}`,
                desc: `Konsistente Nennung in Verzeichnissen, Google Business Profile und lokalen Plattformen. KIs verbinden dich mit ${city.name}.`,
              },
              {
                no: "05",
                title: "Monitoring deiner KI-Erwähnungen",
                desc: "Regelmäßige Checks: Wo erscheinst du in ChatGPT, Perplexity, Claude, Google AI Overviews? Was sagen die Modelle über deine Firma?",
              },
              {
                no: "06",
                title: "Verzahnung mit klassischem SEO",
                desc: `Page Experience, internes Linking, Core Web Vitals — damit Google AI Overviews dich genauso gerne zieht wie ChatGPT.`,
              },
            ].map((d) => (
              <div
                key={d.no}
                className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] sm:p-8"
              >
                <span className="font-[family-name:var(--font-serif)] text-4xl font-bold italic text-[var(--accent)] sm:text-5xl">
                  {d.no}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--text)] sm:text-xl">
                  {d.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WSM-METHODE in 90 Tagen ──────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            So arbeiten wir
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Die WSM-Methode für KI-Sichtbarkeit
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {[
              {
                no: "01",
                days: "Tag 1 – 3",
                title: "Audit & Fundament",
                desc: `Wo erscheint deine Firma heute auf ChatGPT, Perplexity, Claude? Was sagen die Modelle über deinen Markt in ${city.name}? Klarer Status-quo.`,
              },
              {
                no: "02",
                days: "Tag 4 – 7",
                title: "Technische Basis live",
                desc: "Schema, llms.txt, FAQ, Author-Boxen, Entity-Definitionen. Alle KI-Crawler erlaubt, alle Hints gesetzt — saubere Lese-Grundlage.",
              },
              {
                no: "03",
                days: "Tag 8 – 90",
                title: "KI-Indexierung & Empfehlbarkeit",
                desc: `Content-Cluster ausbauen, zitierfähige Statements, lokale Erwähnungen in ${city.region}. Bis ${city.name} dich als erste Wahl listet.`,
              },
            ].map((s) => (
              <div
                key={s.no}
                className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.12)] sm:p-8"
              >
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <span className="font-[family-name:var(--font-serif)] text-5xl font-bold italic text-[var(--accent)] sm:text-6xl">
                    {s.no}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                    {s.days}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MITTEL-CTA: Erstgespräch ─────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <InlineCTA
            variant="erstgespraech"
            context={`KI-Sichtbarkeit in ${city.name} · 15-Min · Kostenfrei`}
            headline={
              <>
                Klingt das nach dem,{" "}
                <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                  was du suchst
                </span>
                ?
              </>
            }
            subline={`15-Min-Erstgespräch mit Albert — ehrlich, konkret, mit klarem nächsten Schritt für KI-Sichtbarkeit in ${city.name}. Auch wenn wir nicht zusammenarbeiten.`}
          />
        </div>
      </section>

      {/* ── CROSS-LINK: Andere Services in derselben Stadt ───────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">
            Weitere Services in {city.name}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            Komplettpaket aus einer Hand
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
            KI-Sichtbarkeit zündet am stärksten, wenn deine Webseite technisch passt und SEO mitläuft.
            Beides bauen wir aus einer Hand:
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/webdesign/${city.slug}`}
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
            >
              Webdesign in {city.name}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href={`/seo/${city.slug}`}
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
            >
              SEO in {city.name}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/preise"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
            >
              Angebot
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/sichtbarkeits-check"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
            >
              Kostenlosen KI-Check starten
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── NACHBAR-STÄDTE (KI-Sichtbarkeit) ─────────────────────── */}
      {neighbours.length > 0 && (
        <section className="border-t border-[var(--border)] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Auch aktiv in
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {neighbours.map((n) => (
                <Link
                  key={n.slug}
                  href={`/ki-sichtbarkeit/${n.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
                >
                  KI-Sichtbarkeit in {n.name}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              ))}
              <Link
                href="/standorte"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                Alle Standorte →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── BLOG-CLUSTER: KI-Sichtbarkeits-Wissensbasis ──────────── */}
      {kiPosts.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Wissensbasis
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
              Tiefer einsteigen in KI-Sichtbarkeit
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
              Wie GEO, AEO, ChatGPT-Empfehlungen und Google AI Overviews wirklich
              funktionieren — für lokalen Mittelstand in {city.region}:
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kiPosts.map((p) => (
                <Link
                  key={p.meta.slug}
                  href={`/blog/${p.meta.slug}`}
                  className="group rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-20px_rgba(22,99,222,0.25)]"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                    {p.meta.category}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-[var(--text)] sm:text-[17px]">
                    {p.meta.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)] transition group-hover:gap-2">
                    Artikel lesen →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] hover:underline"
              >
                Alle Artikel im Blog →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Häufige Fragen
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            KI-Sichtbarkeit in {city.name} — was du wissen willst
          </h2>
          <div className="mt-10 divide-y divide-[var(--border)] overflow-hidden rounded-3xl border border-[var(--border)] bg-white">
            {faqs.map((f, i) => (
              <details key={f.q} className="group p-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[16px] font-semibold tracking-tight text-[var(--text)] sm:text-lg">
                    {f.q}
                  </span>
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[12px] text-[var(--text)] transition group-open:rotate-45 group-open:bg-[var(--text)] group-open:text-white">
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-10 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRE-FOOTER-CTA ───────────────────────────────────────── */}
      <PreFooterCTA
        variant="erstgespraech"
        headline={
          <>
            Bereit, in {city.name} <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">erste Wahl</span> der KIs zu werden?
          </>
        }
        subline={`15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung deiner KI-Sichtbarkeit in ${city.name} — auch wenn wir nicht zusammenarbeiten.`}
      />

      <Footer />
    </main>
  );
}
