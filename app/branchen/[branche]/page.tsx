import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { industries, getIndustry } from "@/content/industries";
import { services } from "@/content/services";
import { getWebdesignPosts } from "@/content/blog";
import BlogNav from "@/components/blog/BlogNav";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";
import ReviewBadges from "@/components/ReviewBadges";

const SITE = "https://wohlstandsmarketing.de";

export async function generateStaticParams() {
  return industries.map((i) => ({ branche: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branche: string }>;
}): Promise<Metadata> {
  const { branche } = await params;
  const industry = getIndustry(branche);
  if (!industry) return {};
  return {
    title: industry.title,
    description: industry.description,
    keywords: industry.keywords,
    alternates: { canonical: `/branchen/${industry.slug}` },
    openGraph: {
      title: industry.title,
      description: industry.description,
      type: "website",
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ branche: string }>;
}) {
  const { branche } = await params;
  const industry = getIndustry(branche);
  if (!industry) notFound();
  const otherIndustries = industries.filter((i) => i.slug !== industry.slug);
  const relevantPosts = getWebdesignPosts(3);

  /* ── JSON-LD Schemas ────────────────────────────────────────────────── */
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/branchen/${industry.slug}#business`,
    name: `Wohlstandsmarketing — Webseite für ${industry.name}`,
    image: `${SITE}/icon.svg`,
    url: `${SITE}/branchen/${industry.slug}`,
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
    areaServed: { "@type": "Country", name: "Deutschland" },
    founder: { "@id": `${SITE}#person-albert` },
    parentOrganization: { "@id": `${SITE}#organization` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Webseite + KI-Sichtbarkeit für ${industry.name}`,
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Unternehmenswebsite", description: `Vollständige Unternehmenswebsite mit KI-Sichtbarkeit für ${industry.name}.` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landingpage", description: `Konvertierende Landingpage für ${industry.name} — live in 7 Tagen.` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Webseiten-Relaunch", description: `Vollständiger Relaunch bestehender Webseiten für ${industry.name}.` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "KI-Sichtbarkeit (Generative Engine Optimization)", description: `Auf ChatGPT, Perplexity, Claude und Google AI Overviews als erste Wahl empfohlen — einmalig oder als Retainer.` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO-Optimierung", description: `Technisches, lokales und On-Page-SEO für ${industry.name} — einmalig oder als Retainer.` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Webseiten-Wartung", description: `Laufende technische Wartung, Sicherheit und Inhalts-Updates.` } },
      ],
    },
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Webseite + KI-Sichtbarkeit für ${industry.name}`,
    serviceType: "Webdesign & KI-Sichtbarkeitsoptimierung",
    provider: { "@type": "Organization", name: "Wohlstandsmarketing" },
    areaServed: { "@type": "Country", name: "Deutschland" },
    audience: { "@type": "BusinessAudience", audienceType: industry.name },
    description: industry.description,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Branchen", item: `${SITE}/branchen` },
      { "@type": "ListItem", position: 3, name: industry.name, item: `${SITE}/branchen/${industry.slug}` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
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
            <Link href="/branchen" className="hover:text-[var(--text)]">Branchen</Link>
            <span>/</span>
            <span className="text-[var(--text)]">{industry.name}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-semibold text-[var(--accent)]">Branche</span>
                <span className="text-[var(--text-subtle)]">·</span>
                {industry.shortName}
              </div>

              <h1
                className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.04] tracking-[-0.04em] text-[var(--text)]"
                style={{ fontSize: "clamp(2rem, 5.2vw, 3.5rem)" }}
              >
                {industry.h1Lead}{" "}
                <span className="relative inline-block">
                  <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                    {industry.h1Accent}
                  </span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 240 12" fill="none" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 8C 60 2, 120 10, 180 5 S 230 7, 238 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </span>{" "}
                {industry.h1Tail}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                {industry.heroSubline}
              </p>

              {/* Mobile/iPad photo — BETWEEN subtitle and CTAs, full image, no fade */}
              <div className="mx-auto mt-8 w-full max-w-md overflow-hidden rounded-3xl lg:hidden">
                <Image
                  src="/albert-portrait.jpg"
                  alt={`Albert Ipgefer — Webdesign-Partner für ${industry.name}`}
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

              {/* ── MOBILE/IPAD ONLY: ReviewBadges + Bullets + CTA-Wiederholung ── */}
              <div className="mt-5 w-full lg:hidden">
                <ReviewBadges variant="pill" centerOnMobile />
              </div>

              <ul className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 text-left text-[13.5px] leading-relaxed text-[var(--text)] sm:text-[14.5px] lg:hidden">
                {industry.bullets.map((b) => (
                  <li key={b.strong} className="flex items-start gap-2.5">
                    <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span>
                    <span>
                      <strong className="font-semibold">{b.strong}</strong>{b.rest}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mx-auto mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 lg:hidden">
                <Link
                  href="/#strategie"
                  aria-label={`Webseite für ${industry.name} — unverbindliches Erstgespräch sichern`}
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
                alt={`Albert Ipgefer — Webdesign-Partner für ${industry.name}`}
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

      {/* ── WARUM (Pain / Intro) ───────────────────────────────── */}
      <section className="bg-[var(--surface-2)]/40 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Die Ausgangslage
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Warum {industry.name} jetzt sichtbar werden müssen
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            {industry.intro}
          </p>
        </div>
      </section>

      {/* ── WAS ANDERS IST (USPs) ──────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">
            Was wir für dich anders machen
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Webseite + KI-Sichtbarkeit für {industry.name}
          </h2>
          <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
            {industry.usps.map((u, i) => (
              <div
                key={u.title}
                className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.12)] sm:p-8"
              >
                <span className="font-[family-name:var(--font-serif)] text-4xl font-bold italic text-[var(--accent)] sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--text)]">
                  {u.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]">
                  {u.desc}
                </p>
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
              { no: "01", days: "Tag 1 – 3", title: "Fundament", desc: `Positionierung und Audit für ${industry.name}. Wir verstehen, gegen wen du antrittst — lokal und in der KI.` },
              { no: "02", days: "Tag 4 – 7", title: "Auftritt", desc: `Design, Copy, Development — deine neue Webseite ist nach 7 Tagen live. Klar positioniert und konversionsstark.` },
              { no: "03", days: "Tag 8 – 90", title: "KI-Indexierung", desc: `Schema, AEO-Content, Quotability. Du wirst auf Google, ChatGPT, Perplexity und Claude empfohlen — für die Anfragen, die wirklich Umsatz bringen.` },
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

      {/* ── MITTELSTUFEN-CTA ───────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <InlineCTA
            variant="erstgespraech"
            context={`Webseite für ${industry.name} · 15-Min · Kostenfrei`}
            headline={
              <>
                Klingt das nach dem,{" "}
                <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                  was du suchst
                </span>
                ?
              </>
            }
            subline={`15-Min-Erstgespräch mit Albert — ehrlich, konkret, mit klarem nächsten Schritt für ${industry.name}. Auch wenn wir nicht zusammenarbeiten.`}
          />
        </div>
      </section>

      {/* ── LEISTUNGEN FÜR DIESE BRANCHE (Service-Detailseiten) ── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">
            Unsere Leistungen für {industry.name}
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
          >
            Jede Leistung — zugeschnitten auf {industry.name}
          </h2>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
            Eine neue Webseite ohne KI-Sichtbarkeit ist halbes Geschäft. Wir verzahnen alle Leistungen direkt ab Tag 1 — hier im Detail für deine Branche:
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/branchen/${industry.slug}/${s.slug}`}
                className="group flex flex-col rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-20px_rgba(22,99,222,0.28)]"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--text)]">
                  {s.name}
                </h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-[var(--text-muted)]">
                  {s.name} für {industry.name} — {s.h1Tail}.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)] transition group-hover:gap-2">
                  Mehr erfahren →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/preise" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">
              Preise & Pakete
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link href="/sichtbarkeits-check" className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white">
              Kostenlosen KI-Check starten
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WEITERE BRANCHEN ───────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">
            Weitere Branchen
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {otherIndustries.map((o) => (
              <Link
                key={o.slug}
                href={`/branchen/${o.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
              >
                Webseite für {o.name}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            ))}
            <Link href="/branchen" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--text)]">
              Alle Branchen →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BLOG-CLUSTER ───────────────────────────────────────── */}
      {relevantPosts.length > 0 && (
        <section className="border-t border-[var(--border)] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Wissensbasis
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
              Mehr zu Webseite & Sichtbarkeit lesen
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {relevantPosts.map((p) => (
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
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] hover:underline">
                Alle Artikel im Blog →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Häufige Fragen
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Webseite für {industry.name} — was du wissen willst
          </h2>
          <div className="mt-10 divide-y divide-[var(--border)] overflow-hidden rounded-3xl border border-[var(--border)] bg-white">
            {industry.faqs.map((f, i) => (
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

      {/* ── PRE-FOOTER-CTA ─────────────────────────────────────── */}
      <PreFooterCTA
        variant="erstgespraech"
        headline={
          <>
            Bereit für <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Sichtbarkeit</span>?
          </>
        }
        subline={`15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung für ${industry.name} — auch wenn wir nicht zusammenarbeiten.`}
      />

      <Footer />
    </main>
  );
}
