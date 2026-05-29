import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cities, getCity, getNeighbourCities } from "@/content/cities";
import { getSeoPosts } from "@/content/blog";
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
    title: `SEO-Agentur ${city.name} · Lokales SEO für Mittelstand`,
    description: `SEO für Mittelstand in ${city.name}: technisches SEO, lokales SEO, Google Business Profile und Content-Cluster. Sichtbar auf Google in ${city.region} — die WSM-Methode in 90 Tagen.`,
    keywords: [
      `SEO Agentur ${city.name}`,
      `SEO-Optimierung ${city.name}`,
      `Suchmaschinenoptimierung ${city.name}`,
      `Lokales SEO ${city.name}`,
      `Google Ranking ${city.name}`,
      `SEO Mittelstand ${city.name}`,
      `SEO ${city.region}`,
    ],
    alternates: { canonical: `/seo/${city.slug}` },
    openGraph: {
      title: `SEO-Agentur ${city.name} · Lokales SEO für Mittelstand`,
      description: `Sichtbar auf Google in ${city.name} — die WSM-Methode in 90 Tagen.`,
      type: "website",
    },
  };
}

export default async function SeoCityPage({
  params,
}: {
  params: Promise<{ stadt: string }>;
}) {
  const { stadt } = await params;
  const city = getCity(stadt);
  if (!city) notFound();
  const neighbours = getNeighbourCities(city.slug);
  const seoPosts = getSeoPosts(4);

  /* ── JSON-LD Schemas ────────────────────────────────────────────────── */
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/seo/${city.slug}#business`,
    name: `Wohlstandsmarketing — SEO-Agentur in ${city.name}`,
    image: `${SITE}/icon.svg`,
    url: `${SITE}/seo/${city.slug}`,
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
    name: `SEO-Optimierung in ${city.name}`,
    serviceType: "Search Engine Optimization (SEO) — technisch, lokal, on-page",
    provider: { "@id": `${SITE}#organization` },
    areaServed: { "@type": "City", name: city.name },
    description: `SEO für Mittelstand in ${city.name}: technisches SEO, lokales SEO, Google Business Profile, Content-Cluster, lokale Backlinks. In 90 Tagen auf Google für die richtigen Keywords in ${city.region} ranken.`,
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
        name: `SEO ${city.name}`,
        item: `${SITE}/seo/${city.slug}`,
      },
    ],
  };

  const faqs = [
    {
      q: `Was ist der Unterschied zwischen lokalem SEO in ${city.name} und überregionalem SEO?`,
      a: `Lokales SEO in ${city.name} zielt auf Suchanfragen mit Ortsbezug — „Steuerberater Koblenz", „Handwerker in der Nähe". Hebel: Google Business Profile, lokale Backlinks aus ${city.region}, NAP-Konsistenz (Name, Adresse, Telefon), lokale Schema. Überregionales SEO zielt auf informationelle / generische Keywords. Für Mittelstand mit lokalem Kundenstamm ist lokal fast immer der härtere Hebel.`,
    },
    {
      q: `Wie lange dauert es, bis ich in ${city.name} bei Google ranke?`,
      a: `Technisch sind erste Verbesserungen nach 2–4 Wochen sichtbar (Indexierung, Core Web Vitals, On-Page). Erste echte Rankings auf Money-Keywords typischerweise nach 8–12 Wochen — abhängig von Wettbewerb in ${city.region}, Domain-Alter und bestehender Substanz. Stabile Top-3-Positionen brauchen meist 4–6 Monate. Wir sind ehrlich: niemand kann seriös Tag-1-Rankings versprechen.`,
    },
    {
      q: `Was kostet SEO für ein Unternehmen aus ${city.name}?`,
      a: `Wir bieten SEO entweder als einmalige Optimierung oder als Retainer über 6, 9 oder 12 Monate an — je nach Wettbewerbslage und Ziel-Setup. Die genaue Investition stimmen wir im 15-Minuten-Erstgespräch ab. Vollständige Preisübersicht im Konfigurator auf der Preise-Seite.`,
    },
    {
      q: `Brauche ich für SEO in ${city.name} eine neue Webseite?`,
      a: `Nicht zwingend. Auf bestehenden Seiten setzen wir SEO nachträglich auf — technisches Audit, On-Page-Optimierung, lokales Setup. Wenn die technische Basis aber zu langsam, zu schlecht crawlbar oder zu unflexibel ist (typisch bei alten WordPress-Setups), empfehlen wir einen Relaunch. Ehrliche Einschätzung im Erstgespräch — manchmal ist ein Relaunch der effizientere Weg, manchmal nicht.`,
    },
    {
      q: `Welche Branchen aus ${city.name} profitieren am meisten von SEO?`,
      a: `Besonders ${city.industries.slice(0, 3).join(", ")} und alle Branchen, in denen Kunden vor der Anfrage „den richtigen lokalen Anbieter" googeln. Faustregel: je höher der Auftragswert und je länger die Recherche-Phase, desto stärker zieht SEO.`,
    },
    {
      q: `Was tut ihr, was eine durchschnittliche SEO-Agentur in ${city.region} nicht tut?`,
      a: `Drei Sachen: 1) Wir verzahnen klassisches SEO mit KI-Sichtbarkeit (Generative Engine Optimization) — die nächste Suchgeneration läuft schon. 2) Wir sind transparent in Reporting und Methodik — du siehst monatlich, was passiert ist und warum. 3) Wir bauen Substanz auf statt Black-Hat-Tricks: was wir aufbauen, hält auch nach Google-Updates.`,
    },
    {
      q: `Wie messt ihr den Erfolg in ${city.name}?`,
      a: `Konkret: Rankings für deine wichtigsten Money-Keywords (lokal + überregional), organischer Traffic in Search Console, Conversion-Pfade in Analytics, Google Business Profile Performance (Aufrufe, Anrufe, Wegbeschreibungen), lokale Ranking-Pakete für ${city.name} und Umgebung. Monatlicher Report mit klaren Zahlen — kein Bullshit-Bingo.`,
    },
    {
      q: `Wie unterscheidet sich SEO von KI-Sichtbarkeit in ${city.name}?`,
      a: `SEO optimiert für Google-Suchergebnisse — KI-Sichtbarkeit (GEO/AEO) optimiert für die Antworten von ChatGPT, Perplexity, Claude und Google AI Overviews. Andere Mechanik, andere Signale. Wir bieten beides — und meistens lohnt sich die Kombination, weil sich die Hebel überschneiden (gute Schema-Struktur hilft sowohl Google als auch ChatGPT).`,
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
            <span className="text-[var(--text)]">SEO {city.name}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-semibold text-[var(--accent)]">SEO-Optimierung</span>
                <span className="text-[var(--text-subtle)]">·</span>
                {city.name}, {city.state}
              </div>

              <h1
                className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.02] tracking-[-0.04em] text-[var(--text)]"
                style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)" }}
              >
                SEO-Agentur in{" "}
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
                Für Mittelstand aus {city.region}. In 90 Tagen sichtbar auf Google für die{" "}
                <span className="font-semibold text-[var(--text)]">Money-Keywords deiner Region</span> — technisch sauber, lokal verankert.
              </p>

              {/* Mobile/iPad photo */}
              <div className="mx-auto mt-8 w-full max-w-md overflow-hidden rounded-3xl lg:hidden">
                <Image
                  src="/albert-portrait.jpg"
                  alt={`Albert Ipgefer — SEO-Partner für Mittelstand in ${city.name}`}
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
                  aria-label={`Erstgespräch zu SEO in ${city.name} sichern`}
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
                  <span className="relative z-10 transition-colors group-hover:text-white">Kostenlosen Sichtbarkeits-Check starten</span>
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
                    <strong className="font-semibold">Werde gefunden</strong> in {city.name}, wenn jemand nach deinem Service sucht — Position 1–3 statt Seite 2.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span>
                  <span>
                    <strong className="font-semibold">Bekomme planbaren Traffic</strong>, der wirklich kauft — nicht zufällige Klicks, sondern lokale Kauf-Intention aus {city.region}.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span>
                  <span>
                    <strong className="font-semibold">Verstehe</strong>, welche SEO-Hebel 2026 wirklich wirken — und welche reine Geldverschwendung sind.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span>
                  <span>
                    <strong className="font-semibold">Spare dir das Lehrgeld</strong>, das andere bei No-Name-SEO-Agenturen lassen — wir zeigen vorab transparent, was wir konkret tun.
                  </span>
                </li>
              </ul>

              <div className="mx-auto mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 lg:hidden">
                <Link
                  href="/#strategie"
                  aria-label={`SEO in ${city.name} — unverbindliches Erstgespräch sichern`}
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
                alt={`Albert Ipgefer — SEO-Partner für Mittelstand in ${city.name}`}
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

      {/* ── LOKALER BEZUG ──────────────────────────────────────── */}
      <section className="bg-[var(--surface-2)]/40 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Warum {city.name}?
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Lokales SEO für Mittelstand aus {city.region}
          </h2>
          <div className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            <p>{city.intro}</p>
            <p className="mt-4">
              Genau deshalb ist SEO in {city.name} ein echter Hebel: Wer in einer Region
              {city.landmarks.length > 0 && (
                <>
                  {" "}rund um{" "}
                  {city.landmarks.map((l, i) => (
                    <span key={l}>
                      <strong className="text-[var(--text)]">{l}</strong>
                      {i < city.landmarks.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </>
              )}
              {" "}arbeitet, gewinnt mit klaren Rankings auf lokale Money-Keywords sofort
              <strong className="text-[var(--text)]"> kaufstarke Anfragen</strong> —
              ohne Werbebudget jeden Monat neu in den Markt blasen zu müssen.
            </p>
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
            Branchen in {city.name}, die von SEO besonders profitieren
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Wir bauen SEO für Mittelstand aus diesen Branchen — überall, wo Kunden vor
            der Anfrage googeln und der Auftragswert die Investition rechtfertigt:
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
        </div>
      </section>

      {/* ── WAS DU BEKOMMST — Deliverables SEO ──────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Was du bekommst
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Sechs konkrete SEO-Hebel für {city.name}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {[
              {
                no: "01",
                title: "Technisches SEO",
                desc: "Core Web Vitals, Crawl-Hygiene, Internal Linking, Sitemap, robots.txt. Die Basis, ohne die alles andere wackelt.",
              },
              {
                no: "02",
                title: `Lokales SEO ${city.name}`,
                desc: `Google Business Profile-Optimierung, lokale Schema, NAP-Konsistenz, Verzeichnis-Einträge in ${city.region}.`,
              },
              {
                no: "03",
                title: "On-Page-Optimierung",
                desc: "Money-Keywords sauber gemappt, Title- und Description-Optimierung, H1-Struktur, FAQ-Schema.",
              },
              {
                no: "04",
                title: "Content-Cluster",
                desc: `Pillar + Cluster, interne Verlinkung, themenrelevante Inhalte für ${city.name} und Umgebung.`,
              },
              {
                no: "05",
                title: "Off-Page-SEO",
                desc: `Lokale Backlinks aus ${city.region}, Branchen-Verzeichnisse, Erwähnungen in vertrauenswürdigen Quellen.`,
              },
              {
                no: "06",
                title: "Monitoring & Reporting",
                desc: "Search Console, Bing Webmaster, lokales Ranking-Tracking, monatlicher Report mit klaren Zahlen — kein Bullshit-Bingo.",
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
            Die WSM-Methode für SEO
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {[
              {
                no: "01",
                days: "Tag 1 – 3",
                title: "Audit & Fundament",
                desc: `Technisches SEO-Audit, Keyword-Cluster für ${city.name}, Wettbewerbsanalyse, Status-quo-Rankings — klare Basis.`,
              },
              {
                no: "02",
                days: "Tag 4 – 7",
                title: "Technische Basis live",
                desc: "Core Web Vitals, Schema, Internal Linking, On-Page-Optimierung der wichtigsten Money-Pages — Fundament sitzt.",
              },
              {
                no: "03",
                days: "Tag 8 – 90",
                title: "Rankings aufbauen",
                desc: `Content-Ausbau, lokale Backlinks aus ${city.region}, GBP-Optimierung, kontinuierliches Tracking — Rankings konsolidieren.`,
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

      {/* ── MITTEL-CTA ─────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <InlineCTA
            variant="erstgespraech"
            context={`SEO in ${city.name} · 15-Min · Kostenfrei`}
            headline={
              <>
                Klingt das nach dem,{" "}
                <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                  was du suchst
                </span>
                ?
              </>
            }
            subline={`15-Min-Erstgespräch mit Albert — ehrlich, konkret, mit klarem nächsten Schritt für SEO in ${city.name}. Auch wenn wir nicht zusammenarbeiten.`}
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
            SEO + KI-Sichtbarkeit + Webseite aus einer Hand
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
            SEO entfaltet sich am stärksten, wenn deine Webseite technisch passt und
            KI-Sichtbarkeit mitläuft. Alle drei Hebel bauen wir aus einer Hand:
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
              href={`/ki-sichtbarkeit/${city.slug}`}
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
            >
              KI-Sichtbarkeit in {city.name}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/preise"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
            >
              Preise & Pakete
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/sichtbarkeits-check"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
            >
              Kostenlosen Sichtbarkeits-Check starten
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── NACHBAR-STÄDTE (SEO) ─────────────────────────────────── */}
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
                  href={`/seo/${n.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
                >
                  SEO in {n.name}
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

      {/* ── BLOG-CLUSTER: SEO-Wissensbasis ────────────────────────── */}
      {seoPosts.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Wissensbasis
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
              Tiefer einsteigen in SEO
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
              Wie technisches und lokales SEO für Mittelstand in {city.region} wirklich
              funktionieren:
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {seoPosts.map((p) => (
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
            SEO in {city.name} — was du wissen willst
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
            Bereit für <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Top-Rankings</span> in {city.name}?
          </>
        }
        subline={`15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung deines SEO-Potenzials in ${city.name} — auch wenn wir nicht zusammenarbeiten.`}
      />

      <Footer />
    </main>
  );
}
