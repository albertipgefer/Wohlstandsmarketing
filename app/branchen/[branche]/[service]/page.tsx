import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { industries, getIndustry } from "@/content/industries";
import { services, getService } from "@/content/services";
import { getIndustryServiceContent } from "@/content/industry-service";
import {
  getWebdesignPosts,
  getRelaunchPosts,
  getSeoPosts,
  getKiVisibilityPosts,
} from "@/content/blog";
import BlogNav from "@/components/blog/BlogNav";
import BranchenHero from "@/components/branchen/BranchenHero";
import InlineCTA from "@/components/blog/InlineCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";

const SITE = "https://wohlstandsmarketing.de";

export async function generateStaticParams() {
  return industries.flatMap((i) =>
    i.serviceSlugs.map((slug) => ({ branche: i.slug, service: slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branche: string; service: string }>;
}): Promise<Metadata> {
  const { branche, service } = await params;
  const industry = getIndustry(branche);
  const svc = getService(service);
  if (!industry || !svc) return {};
  const title = `${svc.name} für ${industry.name} · Wohlstandsmarketing`;
  const description = `${svc.name} für ${industry.name}: ${svc.metaLead} mit KI-Sichtbarkeit — mehr Anfragen über Google und ChatGPT. In 90 Tagen live.`;
  return {
    title,
    description,
    keywords: [
      `${svc.name} ${industry.shortName}`,
      `${svc.shortName} für ${industry.name}`,
      `${svc.name} ${industry.name}`,
      ...industry.keywords.slice(0, 3),
    ],
    alternates: { canonical: `/branchen/${industry.slug}/${svc.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

function getServicePosts(serviceSlug: string) {
  switch (serviceSlug) {
    case "relaunch":
      return getRelaunchPosts(3);
    case "ki-sichtbarkeit":
      return getKiVisibilityPosts(3);
    case "seo":
      return getSeoPosts(3);
    default:
      return getWebdesignPosts(3);
  }
}

export default async function IndustryServicePage({
  params,
}: {
  params: Promise<{ branche: string; service: string }>;
}) {
  const { branche, service } = await params;
  const industry = getIndustry(branche);
  const svc = getService(service);
  if (!industry || !svc) notFound();
  if (!industry.serviceSlugs.includes(svc.slug)) notFound();

  const combo = getIndustryServiceContent(industry.slug, svc.slug);

  const otherServices = services.filter((s) => s.slug !== svc.slug);
  const otherIndustries = industries.filter((i) => i.slug !== industry.slug);
  const relevantPosts = getServicePosts(svc.slug);
  const deliverables = combo
    ? [...combo.deliverables, ...svc.deliverables]
    : svc.deliverables;
  const faqs = combo
    ? [...combo.faqs, ...svc.faqs, ...industry.faqs.slice(0, 2)]
    : [...svc.faqs, ...industry.faqs.slice(0, 3)];

  /* ── JSON-LD Schemas ────────────────────────────────────────────────── */
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/branchen/${industry.slug}/${svc.slug}#business`,
    name: `Wohlstandsmarketing — ${svc.name} für ${industry.name}`,
    image: `${SITE}/icon.svg`,
    url: `${SITE}/branchen/${industry.slug}/${svc.slug}`,
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
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${svc.name} für ${industry.name}`,
    serviceType: svc.name,
    provider: { "@type": "Organization", name: "Wohlstandsmarketing" },
    areaServed: { "@type": "Country", name: "Deutschland" },
    audience: { "@type": "BusinessAudience", audienceType: industry.name },
    description: svc.intro,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Branchen", item: `${SITE}/branchen` },
      { "@type": "ListItem", position: 3, name: industry.name, item: `${SITE}/branchen/${industry.slug}` },
      { "@type": "ListItem", position: 4, name: svc.name, item: `${SITE}/branchen/${industry.slug}/${svc.slug}` },
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
          { label: industry.name, href: `/branchen/${industry.slug}` },
          { label: svc.name },
        ]}
        eyebrowAccent={industry.shortName}
        eyebrowRest={svc.name}
        h1Lead={`${svc.name} für`}
        h1Accent={industry.name}
        h1Tail={`— ${svc.h1Tail}`}
        subline={svc.intro}
        secondaryHref={svc.hub}
        secondaryLabel={`Mehr zu ${svc.shortName}`}
      />

      {/* ── WARUM (Branchen-Pain) ──────────────────────────────── */}
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

      {combo && (
        <section className="border-t border-[var(--border)] py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              {svc.shortName} für {industry.shortName} — im Detail
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[var(--text)]">
              {combo.uniqueAngle}
            </p>
          </div>
        </section>
      )}

      {/* ── WAS BEI DIESER BRANCHE ANDERS IST (Branchen-USPs) ──── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">
            Was für {industry.name} zählt
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            {svc.shortName} für {industry.name} — worauf es ankommt
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Jede Branche tickt anders. Deshalb richten wir deine {svc.name} auf
            genau die Punkte aus, die bei {industry.name} über Anfragen entscheiden:
          </p>
          <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
            {industry.usps.map((u, idx) => (
              <div
                key={u.title}
                className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.12)] sm:p-8"
              >
                <span className="font-[family-name:var(--font-serif)] text-4xl font-bold italic text-[var(--accent)] sm:text-5xl">
                  {String(idx + 1).padStart(2, "0")}
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
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {industry.bullets.map((b) => (
              <li
                key={b.strong}
                className="flex items-start gap-3 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]"
              >
                <span aria-hidden className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/12 text-[12px] font-bold text-[var(--accent)]">›</span>
                <span>
                  <strong className="font-semibold text-[var(--text)]">{b.strong}</strong>
                  {b.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WAS DU BEKOMMST (Service-Deliverables) ─────────────── */}
      <section className="border-t border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">
            Was du bekommst
          </p>
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            {svc.name} für {industry.name} — konkret
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {deliverables.map((d) => (
              <li
                key={d}
                className="flex items-start gap-3 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)]"
              >
                <span aria-hidden className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[13px] font-bold text-emerald-600">✓</span>
                <span className="text-[14px] leading-relaxed text-[var(--text)] sm:text-[15px]">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WSM-METHODE ────────────────────────────────────────── */}
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
              { no: "02", days: "Tag 4 – 7", title: "Auftritt", desc: `Umsetzung deiner ${svc.name} — nach 7 Tagen live. Klar positioniert und konversionsstark.` },
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
            context={`${svc.name} für ${industry.name} · 15-Min · Kostenfrei`}
            headline={
              <>
                Klingt das nach dem,{" "}
                <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                  was du suchst
                </span>
                ?
              </>
            }
            subline={`15-Min-Erstgespräch mit Albert — ehrlich, konkret, mit klarem nächsten Schritt zu deiner ${svc.name}. Auch wenn wir nicht zusammenarbeiten.`}
          />
        </div>
      </section>

      {/* ── CROSS-LINK: Weitere Services für DIESE Branche ─────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">
            Weitere Leistungen für {industry.name}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            Alles aus einer Hand
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {otherServices.map((o) => (
              <Link
                key={o.slug}
                href={`/branchen/${industry.slug}/${o.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
              >
                {o.name} für {industry.shortName}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            ))}
            <Link href={`/branchen/${industry.slug}`} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--text)]">
              Übersicht {industry.name} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CROSS-LINK: Dieser Service für andere Branchen ─────── */}
      <section className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">
            {svc.name} für andere Branchen
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {otherIndustries.map((o) => (
              <Link
                key={o.slug}
                href={`/branchen/${o.slug}/${svc.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
              >
                {o.name}
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
        <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Wissensbasis
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
              Mehr zu {svc.shortName} lesen
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
            {svc.name} für {industry.name} — was du wissen willst
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

      {/* ── PRE-FOOTER-CTA ─────────────────────────────────────── */}
      <PreFooterCTA
        variant="erstgespraech"
        headline={
          <>
            Bereit für deine <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">{svc.name}</span>?
          </>
        }
        subline={`15-Minuten-Erstgespräch mit Albert. Kostenfrei, mit ehrlicher Einschätzung zu ${svc.name} für ${industry.name} — auch wenn wir nicht zusammenarbeiten.`}
      />

      <Footer />
    </main>
  );
}
