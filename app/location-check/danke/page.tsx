import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Geschafft — dein Location-Check ist unterwegs",
  robots: { index: false, follow: false },
};

const TIDYCAL_URL =
  "https://tidycal.com/albertipgefer/kostenloses-strategiegespraech-eventlocations-30min";

const BOOKING_POINTS = [
  "Wir analysieren kurz, wie sichtbar deine Location heute ist, wenn Unternehmen online oder über KI wie ChatGPT nach einem Ort für ihre Firmenfeier suchen, und wo deine größten Hebel liegen.",
  "Gemeinsam schauen wir uns deinen fertigen Webseiten-Prototyp an, den ich vorab für deine Location erstellt habe, und ich zeige dir, was ihn von deiner aktuellen Seite unterscheidet.",
  "Du bekommst konkrete, umsetzbare Empfehlungen, mit denen du mehr qualifizierte Firmenanfragen gewinnst, unabhängig davon, ob wir danach zusammenarbeiten.",
  "Am Ende weißt du klar, wo deine Location steht, welche nächsten Schritte sinnvoll sind und ob eine Zusammenarbeit für dich Mehrwert bringt.",
];

export default async function LocationCheckDankePage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; fit?: string }>;
}) {
  const { name, fit } = await searchParams;
  const firstName = (name || "").trim().slice(0, 40);
  const isFit = fit === "1";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
      <section className="relative overflow-hidden px-4 pt-16 pb-10 sm:px-6 md:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[480px] bg-[radial-gradient(55%_55%_at_50%_0%,rgba(22,99,222,0.13)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Eingegangen
          </span>
          <h1
            className="mt-5 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.9rem, 4.8vw, 3rem)" }}
          >
            {firstName ? `Geschafft, ${firstName}.` : "Geschafft."}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]">
            Dein KI-Sichtbarkeits-Check ist unterwegs und landet gleich in deinem Postfach.
            {isFit
              ? " Deinen persönlichen Webseiten-Prototyp deiner Location erstellen wir vorab."
              : " Schau gerne in dein Postfach für deine Auswertung."}
          </p>

          {isFit && (
            <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent)]/[0.06] p-5 text-left">
              <p className="text-[14px] leading-relaxed text-[var(--text)] md:text-[15px]">
                <strong>Deinen fertigen Prototyp zeigen wir dir live im Gespräch.</strong> Wir gehen ihn
                gemeinsam Schritt für Schritt durch, du siehst genau, wie deine Location online wirken
                kann. Buch dir dafür unten deinen Termin.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Booking */}
      <section className="relative px-4 pb-20 sm:px-6 md:pb-28">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.12)] md:p-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-black leading-tight tracking-tight md:text-3xl">
            Sichere dir jetzt deinen Termin
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
            In unserem 30-minütigen Gespräch schauen wir uns gemeinsam an, wie deine Location
            planbar an mehr hochwertige Firmenanfragen kommt und was dich aktuell davon abhält.
          </p>

          <ul className="mt-5 space-y-3">
            {BOOKING_POINTS.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-[var(--text)]">
                <span className="mt-0.5 text-emerald-500">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[14px] font-medium text-[var(--text)]">Ich freue mich auf unser Gespräch.</p>

          {/* TidyCal-Einbettung mit Button-Fallback */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)]">
            <iframe
              src={TIDYCAL_URL}
              title="Termin buchen"
              className="h-[640px] w-full"
              loading="lazy"
            />
          </div>
          <a
            href={TIDYCAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-4 text-[15px] font-semibold text-white transition hover:opacity-90"
          >
            Termin direkt buchen →
          </a>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-4 py-8 text-center text-[12px] text-[var(--text-subtle)]">
        <p>Wohlstandsmarketing · Albert Ipgefer · Vor der Loos 4e, 56130 Bad Ems</p>
        <p className="mt-2 flex items-center justify-center gap-4">
          <a href="/impressum" className="hover:text-[var(--text)]">Impressum</a>
          <a href="/datenschutz" className="hover:text-[var(--text)]">Datenschutz</a>
        </p>
      </footer>
    </main>
  );
}
