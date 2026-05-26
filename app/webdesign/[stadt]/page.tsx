import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cities, getCity, getNeighbourCities } from "@/content/cities";
import { getCityRelevantPosts } from "@/content/blog";
import BlogNav from "@/components/blog/BlogNav";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";

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
    title: `Webdesign in ${city.name} + KI-Sichtbarkeit · Wohlstandsmarketing`,
    description: city.description,
    keywords: [
      `Webdesign ${city.name}`,
      `Webdesigner ${city.name}`,
      `Webagentur ${city.name}`,
      `Webseite erstellen ${city.name}`,
      `KI SEO ${city.name}`,
      `ChatGPT SEO ${city.name}`,
      `Webdesign Mittelstand ${city.name}`,
      `Webdesign ${city.region}`,
    ],
    alternates: { canonical: `/webdesign/${city.slug}` },
    openGraph: {
      title: `Webdesign in ${city.name} + KI-Sichtbarkeit`,
      description: city.description,
      type: "website",
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ stadt: string }>;
}) {
  const { stadt } = await params;
  const city = getCity(stadt);
  if (!city) notFound();
  const neighbours = getNeighbourCities(city.slug);
  const cityRelevantPosts = getCityRelevantPosts(3);

  /* ── JSON-LD Schemas ────────────────────────────────────────────────── */
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/webdesign/${city.slug}#business`,
    name: `Wohlstandsmarketing — Webdesign in ${city.name}`,
    image: `${SITE}/icon.svg`,
    url: `${SITE}/webdesign/${city.slug}`,
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
        address: { "@type": "PostalAddress", addressLocality: city.name, postalCode: city.postalCode, addressCountry: "DE" },
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Webdesign + KI-Sichtbarkeit Pakete — ${city.name}`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landingpage (OnePage)",
            description: `Konvertierende Landingpage für Mittelstand in ${city.name} — live in 7 Tagen.`,
          },
          price: "1500",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Unternehmenswebseite (bis 3 Unterseiten)",
            description: `Vollständige Unternehmenswebseite mit KI-Sichtbarkeit für ${city.name}.`,
          },
          price: "3000",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Google Search Ads Betreuung",
            description: `Performance-Marketing für Kunden in ${city.region}.`,
          },
          price: "1500",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "1500",
            priceCurrency: "EUR",
            unitText: "MONTH",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Meta Ads Betreuung",
            description: `Meta Ads (Facebook + Instagram) für planbare Anfragen in ${city.name}.`,
          },
          price: "1500",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "1500",
            priceCurrency: "EUR",
            unitText: "MONTH",
          },
        },
      ],
    },
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Webdesign + KI-Sichtbarkeit in ${city.name}`,
    serviceType: "Webdesign & KI-Sichtbarkeitsoptimierung",
    provider: { "@type": "Organization", name: "Wohlstandsmarketing" },
    areaServed: { "@type": "City", name: city.name },
    description: city.description,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Standorte", item: `${SITE}/standorte` },
      { "@type": "ListItem", position: 3, name: city.name, item: `${SITE}/webdesign/${city.slug}` },
    ],
  };
  const faqs = [
    {
      q: `Bist du auch in ${city.name} aktiv?`,
      a: `Ja. Wir betreuen Kunden in ${city.name} und ${city.region} regelmäßig — Termine vor Ort oder remote, je nach Projekt.`,
    },
    {
      q: `Wie lange dauert ein Projekt für Kunden aus ${city.name}?`,
      a: `Die WSM-Methode hat eine feste 90-Tage-Roadmap: Tag 1–3 Fundament, Tag 4–7 Webseite live, Tag 8–90 KI-Indexierung. Unabhängig vom Standort.`,
    },
    {
      q: `Was kostet Webdesign in ${city.name}?`,
      a: `Eine Landingpage startet bei 1.500 € einmalig, eine vollständige Unternehmenswebseite bei 3.000 €. Laufende KI-Sichtbarkeit + Performance-Marketing ab 1.500 €/Monat (Mindestlaufzeit 3 Monate). Wir nennen die genaue Investition transparent im 15-Minuten-Erstgespräch — und sagen ehrlich, ob es sich für dich rechnet.`,
    },
    {
      q: `Welche Branchen aus ${city.name} passen besonders zur WSM-Methode?`,
      a: `Wir arbeiten besonders gut mit lokalem Mittelstand aus ${city.industries.slice(0, 3).join(", ")} und ähnlichen Branchen — alle Bereiche, in denen lokale Sichtbarkeit über Anfragen entscheidet.`,
    },
    {
      q: `Treffen wir uns vor Ort in ${city.name} oder remote?`,
      a: `Beides möglich. Kickoff und Strategie-Workshop gerne vor Ort in ${city.name}, laufende Abstimmung meist remote über Google Meet und WhatsApp — spart Zeit auf beiden Seiten.`,
    },
    {
      q: `Wie schafft ihr es, dass ChatGPT meine Firma in ${city.name} empfiehlt?`,
      a: `KI-Sichtbarkeit wird nicht zufällig — wir setzen schema.org-Markup, Answer Engine Optimization (AEO), zitierfähige Inhalte und ein lokales Entity-Profil. Die KIs (ChatGPT, Perplexity, Claude, Google AI Overviews) nutzen diese Signale, um regionale Anbieter zu nennen. Plus: optimiertes Google Business Profile für Maps-Sichtbarkeit.`,
    },
    {
      q: `Gibt es eine Garantie auf die Ergebnisse?`,
      a: `Ja. Wenn die vereinbarten Ziele nach 90 Tagen nicht erreicht sind, arbeiten wir ohne Mehrkosten weiter, bis sie erreicht sind. Voraussetzung: du hältst dich an die strategischen Empfehlungen und das vereinbarte Werbebudget (typisch 1.000 €/Monat zusätzlich zum Retainer).`,
    },
    {
      q: `Welche Tools nutzt ihr für das Webdesign?`,
      a: `Wir bauen mit Next.js (React) und Vercel — dem aktuellen Stand der Technik für schnelle, KI-empfehlbare Webseiten. Plus: schema.org-Strukturierung, llms.txt für KI-Crawler, automatisierte Sitemap und LocalBusiness-Markup für ${city.name}. Im Resultat: deine Webseite ist nicht nur hübsch, sondern wird von Suchmaschinen und KI-Systemen verstanden.`,
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
            <span className="text-[var(--text)]">{city.name}</span>
          </nav>

          {/* Eyebrow + H1 + Subtitle + CTA */}
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-semibold text-[var(--accent)]">Standort</span>
                <span className="text-[var(--text-subtle)]">·</span>
                {city.name}, {city.state}
              </div>

              <h1
                className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.02] tracking-[-0.04em] text-[var(--text)]"
                style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)" }}
              >
                Webdesign in{" "}
                <span className="relative inline-block">
                  <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                    {city.name}
                  </span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 240 12" fill="none" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 8C 60 2, 120 10, 180 5 S 230 7, 238 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </span>
                {" "}+ KI-Sichtbarkeit
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                Für lokalen Mittelstand aus {city.region}. In 90 Tagen auf Google, ChatGPT, Perplexity und Claude als{" "}
                <span className="font-semibold text-[var(--text)]">erste Wahl in deiner Region</span> empfohlen.
              </p>

              {/* Mobile/iPad photo — BETWEEN subtitle and CTAs, full image, no fade */}
              <div className="mx-auto mt-8 w-full max-w-md overflow-hidden rounded-3xl lg:hidden">
                <Image
                  src="/albert-portrait.jpg"
                  alt={`Albert Ipgefer — Webdesign-Partner für Mittelstand in ${city.name}`}
                  width={1226}
                  height={1300}
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 540px"
                  className="h-auto w-full"
                />
              </div>

              <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3">
                <Link
                  href="/#strategie"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]"
                >
                  <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Erstgespräch sichern</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/#methode"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--border-strong)] bg-white/70 px-7 py-4 text-[15px] font-medium text-[var(--text)] backdrop-blur transition hover:border-transparent"
                >
                  <span className="absolute inset-0 -z-0 translate-x-[-101%] bg-[var(--text)] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative z-10 transition-colors group-hover:text-white">So funktioniert die WSM-Methode</span>
                </Link>
              </div>

              <p className="mt-7 text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)] sm:text-[12px]">
                15-Min Erstgespräch · Kostenfrei · Albert Ipgefer persönlich
              </p>
            </div>

            {/* Right column: Albert portrait — Desktop only */}
            <div className="relative order-2 mx-auto hidden aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-3xl lg:block">
              <Image
                src="/albert-portrait.jpg"
                alt={`Albert Ipgefer — Webdesign-Partner für Mittelstand in ${city.name}`}
                fill
                priority
                quality={88}
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
            Lokaler Bezug
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Warum {city.name}?
          </h2>
          <div className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            <p>{city.intro}</p>
            {city.landmarks.length > 0 && (
              <p className="mt-4">
                Bekannt für{" "}
                {city.landmarks.map((l, i) => (
                  <span key={l}>
                    <strong className="text-[var(--text)]">{l}</strong>
                    {i < city.landmarks.length - 1 ? ", " : "."}
                  </span>
                ))}{" "}
                Wir kennen die Region und die typischen Anforderungen des lokalen Mittelstands.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── FÜR WEN WIR BAUEN (Lokale Branchen) ───────────────── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
            Für wen wir bauen
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Mittelstand in {city.name} und {city.region}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Wir arbeiten besonders gut mit Unternehmern aus diesen Branchen — überall, wo lokale Sichtbarkeit und planbare Anfragen über den Geschäftserfolg entscheiden:
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

      {/* ── WSM-METHODE KONDENSIERT ────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            So arbeiten wir
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Die WSM-Methode in 90 Tagen
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {[
              { no: "01", days: "Tag 1 – 3", title: "Fundament", desc: `Positionierung und Audit für deinen Auftritt in ${city.name}. Wir verstehen, gegen wen du antrittst — lokal und in der KI.` },
              { no: "02", days: "Tag 4 – 7", title: "Auftritt", desc: `Design, Copy, Development — deine neue Webseite ist nach 7 Tagen live. Lokal verankert, konversionsstark.` },
              { no: "03", days: "Tag 8 – 90", title: "KI-Indexierung", desc: `Schema, AEO-Content, Quotability. Du wirst auf Google, ChatGPT, Perplexity und Claude empfohlen — für die Anfragen, die in ${city.name} wirklich Umsatz bringen.` },
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

      {/* ── MITTELSTUFEN-CTA: 15-Min-Erstgespräch ─────────────── */}
      <section className="border-t border-[var(--border)] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <InlineCTA
            variant="erstgespraech"
            context={`Webdesign in ${city.name} · 15-Min · Kostenfrei`}
            headline={
              <>
                Klingt das nach dem,{" "}
                <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                  was du suchst
                </span>
                ?
              </>
            }
            subline={`15-Min-Erstgespräch mit Albert — ehrlich, konkret, mit klarem nächsten Schritt für dein Vorhaben in ${city.name}. Auch wenn wir nicht zusammenarbeiten.`}
          />
        </div>
      </section>

      {/* ── NACHBAR-STÄDTE ────────────────────────────────────── */}
      {neighbours.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
              Auch aktiv in
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {neighbours.map((n) => (
                <Link
                  key={n.slug}
                  href={`/webdesign/${n.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
                >
                  Webdesign in {n.name}
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

      {/* ── INTERNAL LINKING: STADT → BLOG-CLUSTER ────────────── */}
      {cityRelevantPosts.length > 0 && (
        <section className="border-t border-[var(--border)] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Wissensbasis
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
              Mehr lesen zu Sichtbarkeit in {city.name}
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
              Tiefer einsteigen — wie lokales SEO und KI-Empfehlbarkeit für
              regionalen Mittelstand wirklich funktionieren:
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {cityRelevantPosts.map((p) => (
                <Link
                  key={p.meta.slug}
                  href={`/blog/${p.meta.slug}`}
                  className="group rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-20px_rgba(22,99,222,0.25)]"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                    {p.meta.category}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-[var(--text)] sm:text-lg">
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

      {/* ── FAQ als vorletzte Sektion vor PreFooterCTA + Footer ── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Häufige Fragen
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Webdesign in {city.name} — was du wissen willst
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

      {/* ── PRE-FOOTER-CTA — konsistent mit Inline-CTA-Stil ────── */}
      <PreFooterCTA
        variant="erstgespraech"
        headline={
          <>
            Bereit für <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Sichtbarkeit</span> in {city.name}?
          </>
        }
        subline={`15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung für dein Vorhaben in ${city.name} — auch wenn wir nicht zusammenarbeiten.`}
      />

      <Footer />
    </main>
  );
}
