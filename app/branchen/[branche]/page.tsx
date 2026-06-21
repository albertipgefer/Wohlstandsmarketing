import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { industries, getIndustry } from "@/content/industries";
import { services } from "@/content/services";
import { getWebdesignPosts } from "@/content/blog";
import BlogNav from "@/components/blog/BlogNav";
import BranchenHero from "@/components/branchen/BranchenHero";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";

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
      itemListElement: services.filter((s) => industry.serviceSlugs.includes(s.slug)).map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${s.name} für ${industry.name}`,
          description: s.intro,
          url: `${SITE}/branchen/${industry.slug}/${s.slug}`,
        },
      })),
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

      <BranchenHero
        breadcrumb={[
          { label: "Startseite", href: "/" },
          { label: "Branchen", href: "/branchen" },
          { label: industry.name },
        ]}
        eyebrowAccent="Branche"
        eyebrowRest={industry.shortName}
        h1Lead={industry.h1Lead}
        h1Accent={industry.h1Accent}
        h1Tail={industry.h1Tail}
        subline={industry.heroSubline}
        secondaryHref="/#methode"
        secondaryLabel="So funktioniert die WSM-Methode"
      />

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
            {services.filter((s) => industry.serviceSlugs.includes(s.slug)).map((s) => (
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
              Angebot
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
