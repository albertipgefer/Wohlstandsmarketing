import Link from "next/link";
import { industries } from "@/content/industries";

/**
 * Branchen-Sektion auf der Startseite.
 * SEO-Zweck: Verlinkt prominent (nicht nur im Footer) von der Top-Page in den
 * Branchen-Cluster — verteilt Link-Power direkt auf den /branchen-Hub und die
 * primären ICP-Branchen-Seiten mit keyword-starken Anchor-Texten. Stützt die
 * Indexierung der programmatischen Branchen-Seiten (Crawl-Budget-Bündelung).
 */

// Primäre ICP-Branchen (siehe CLAUDE.md, Abschnitt 2) — als Karten hervorgehoben.
const PRIMARY_SLUGS = [
  "handwerk",
  "steuerberater",
  "arztpraxen",
  "maschinenbau",
  "immobilienmakler",
];

export default function BranchenSektion() {
  const primary = PRIMARY_SLUGS.map((slug) =>
    industries.find((i) => i.slug === slug),
  ).filter((i): i is NonNullable<typeof i> => Boolean(i));
  const rest = industries.filter((i) => !PRIMARY_SLUGS.includes(i.slug));

  return (
    <section
      id="branchen"
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface-2)]/30 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(219,111,22,0.08)_0%,rgba(219,111,22,0)_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              <span className="font-semibold text-[var(--gold-text)]">Branchen</span>
              <span className="text-[var(--text-subtle)]">·</span>
              Spezialisiert auf deinen Mittelstand
            </span>
            <h2
              className="mt-6 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
              style={{ fontSize: "clamp(1.85rem, 4.5vw, 3.25rem)" }}
            >
              Webseite &amp; KI-Sichtbarkeit{" "}
              <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                für deine Branche
              </span>
              .
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]">
              Wir verstehen, wie Anfragen in deiner Branche entstehen — und bauen
              den Auftritt, der genau dort sichtbar wird. Wähle deine Branche für
              passende Leistungen, Cases und Antworten auf deine Fragen.
            </p>
          </div>
          <div className="hidden md:flex">
            <Link
              href="/branchen"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-5 py-3 text-[14px] font-semibold text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
            >
              Alle Branchen
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>

        {/* Primäre Branchen als Karten */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 md:gap-5 lg:grid-cols-3">
          {primary.map((i) => (
            <li key={i.slug}>
              <Link
                href={`/branchen/${i.slug}`}
                className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_4px_20px_-6px_rgba(10,10,10,0.06)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_10px_36px_-10px_rgba(22,99,222,0.25)] md:p-7"
              >
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-[var(--text)] md:text-[26px]">
                    {i.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]">
                    {i.heroSubline.length > 130
                      ? i.heroSubline.slice(0, 127) + "…"
                      : i.heroSubline}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[13px] font-semibold text-[var(--accent)]">
                  <span>Zur Branchen-Seite</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Übrige Branchen als Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {rest.map((i) => (
            <Link
              key={i.slug}
              href={`/branchen/${i.slug}`}
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[13px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
            >
              {i.name}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          ))}
          <Link
            href="/branchen"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-[var(--text-muted)] transition hover:text-[var(--text)]"
          >
            Alle Branchen ansehen →
          </Link>
        </div>
      </div>
    </section>
  );
}
