import type { Metadata } from "next";
import Link from "next/link";
import BlogNav from "@/components/blog/BlogNav";
import Footer from "@/components/sections/Footer";
import PricingConfigurator from "@/components/preise/PricingConfigurator";
import GoogleReviewsBadge from "@/components/GoogleReviewsBadge";
import { services, BUNDLE_DISCOUNT } from "@/content/pricing";

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  title: "Preise & Pakete — Webdesign, SEO und KI-Sichtbarkeit",
  description:
    "Transparente Preise für Webdesign, Landingpages, SEO, KI-Sichtbarkeit und Wartung. Stelle dir dein Paket selbst zusammen — mit 5 % Bundle-Rabatt.",
  alternates: { canonical: "/preise" },
};

const FAQS = [
  {
    q: "Warum gibt es 5 % Bundle-Rabatt?",
    a: "Sobald du zwei oder mehr Leistungen kombinierst, sparen wir auf der gemeinsamen Abstimmung und können effizienter arbeiten. Den Effizienzgewinn geben wir 1:1 an dich weiter — automatisch 5 % auf alle ausgewählten Leistungen.",
  },
  {
    q: "Gibt es eine Mindestlaufzeit?",
    a: "Bei den laufenden Leistungen (SEO-Betreuung, KI-Sichtbarkeit) liegt die Mindestlaufzeit bei 3 Monaten. Bei der Webseiten-Wartung sind es 12 Monate. Einmalige Leistungen (Webseite, Landingpage, Relaunch, einmalige Optimierung) haben keine Bindung.",
  },
  {
    q: "Sind das die Endpreise oder kommt etwas dazu?",
    a: "Die angezeigten Preise sind Netto-Preise zzgl. der gesetzlichen MwSt. Es kommen keine versteckten Kosten dazu. Was du im Konfigurator siehst, steht im Angebot.",
  },
  {
    q: "Was passiert nach dem Erstgespräch?",
    a: "Nach dem 15-minütigen Erstgespräch erhältst du innerhalb von 24 Stunden ein konkretes Angebot mit deinen ausgewählten Leistungen, Zeitplan und Liefer-Definition. Erst dann entscheidest du.",
  },
  {
    q: "Brauche ich zusätzlich ein Werbebudget?",
    a: "Für SEO und KI-Sichtbarkeit nein — das ist organisches Wachstum. Falls du zusätzlich Meta- oder Google-Ads schalten willst, brauchst du ein eigenes Werbebudget (typisch 500–1.500 €/Monat). Das Budget bleibt komplett bei dir und wird direkt an Meta/Google gezahlt.",
  },
  {
    q: "Was, wenn die Ergebnisse nicht stimmen?",
    a: "Für die laufenden Betreuungs-Pakete gilt unsere Ergebnis-Garantie: Bei Nicht-Erreichen vereinbarter Ziele arbeiten wir ohne Mehrkosten weiter, bis sie erreicht sind.",
  },
];

// Schema.org Service-Schemas + FAQ
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const offerCatalog = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Wohlstandsmarketing — Leistungen",
  itemListElement: services.map((s, i) => ({
    "@type": "Offer",
    position: i + 1,
    name: s.name,
    description: s.short,
    price: s.monthly ?? s.oneTime,
    priceCurrency: "EUR",
    priceSpecification: s.monthly
      ? {
          "@type": "UnitPriceSpecification",
          price: s.monthly,
          priceCurrency: "EUR",
          unitText: "MONTH",
        }
      : undefined,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
    { "@type": "ListItem", position: 2, name: "Preise", item: `${SITE}/preise` },
  ],
};

export default function PreisePage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalog) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <BlogNav />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--border)] pt-32 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(219,111,22,0.08)_0%,rgba(219,111,22,0)_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-[12px] text-[var(--text-subtle)]"
          >
            <Link href="/" className="hover:text-[var(--text)]">
              Startseite
            </Link>
            <span>/</span>
            <span className="text-[var(--text)]">Preise</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            <span className="font-semibold text-[var(--gold)]">Preise</span>
            <span className="text-[var(--text-subtle)]">·</span>
            Transparent · Modular · {Math.round(BUNDLE_DISCOUNT * 100)} % Bundle-Rabatt
          </div>

          <h1
            className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
          >
            Stell dir dein{" "}
            <span className="relative inline-block">
              <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                Paket
              </span>
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="12"
                viewBox="0 0 360 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 8C 90 2, 180 10, 270 5 S 350 7, 358 4"
                  stroke="#db6f16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </svg>
            </span>{" "}
            selbst zusammen.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Wähle die Leistungen, die du wirklich brauchst — Webdesign, SEO,
            KI-Sichtbarkeit oder Wartung. Ab 2 Leistungen automatisch{" "}
            <strong className="text-[var(--text)]">
              {Math.round(BUNDLE_DISCOUNT * 100)} % Bundle-Rabatt
            </strong>
            . Kein Vertragsknoten, kein Sales-Druck.
          </p>

          {/* Trust-Row */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> Transparente Preise
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> {Math.round(BUNDLE_DISCOUNT * 100)} % Bundle-Rabatt
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> Ergebnis-Garantie
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> Albert persönlich
            </span>
          </div>

          <div className="mt-5">
            <GoogleReviewsBadge variant="pill" />
          </div>
        </div>
      </section>

      {/* ── KONFIGURATOR ───────────────────────────────────────── */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <PricingConfigurator />
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-12">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Häufige Fragen
            </p>
            <h2
              className="mt-3 font-[family-name:var(--font-display)] font-black tracking-tight"
              style={{ fontSize: "clamp(1.85rem, 4vw, 2.75rem)" }}
            >
              Antworten zu Preisen &amp; Paketen
            </h2>
          </div>
          <div className="mt-10 divide-y divide-[var(--border)] overflow-hidden rounded-3xl border border-[var(--border)] bg-white">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-6">
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

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Noch unsicher, was du brauchst?
          </p>
          <h2
            className="mt-4 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            15 Minuten,{" "}
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              ehrlich
            </span>{" "}
            beraten.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Du musst nicht selbst zusammenstellen. Buche dir ein kostenfreies
            Erstgespräch — wir besprechen deine Situation und ich sage dir
            ehrlich, was Sinn macht und was nicht.
          </p>
          <a
            href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-8 inline-flex w-full max-w-md items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-9 py-5 text-base font-semibold text-white shadow-[0_14px_40px_-10px_rgba(22,99,222,0.55)] transition hover:shadow-[0_18px_50px_-10px_rgba(22,99,222,0.8)] sm:w-auto"
          >
            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative z-10">Erstgespräch sichern</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
            Kostenfrei · 15 Min · Albert persönlich
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
