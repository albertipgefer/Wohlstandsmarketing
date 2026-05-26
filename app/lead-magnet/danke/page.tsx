import type { Metadata } from "next";
import Link from "next/link";
import BlogNav from "@/components/blog/BlogNav";
import Footer from "@/components/sections/Footer";

const PDF_PATH = "/lead-magnet/11-marketing-fehler-mittelstand.pdf";
const BOOK_LINK =
  "https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2";

export const metadata: Metadata = {
  title: "PDF bestätigt · Wohlstandsmarketing",
  description: "Deine PDF ist freigeschaltet — danke fürs Bestätigen.",
  robots: { index: false, follow: false },
};

export default async function LeadMagnetDanke({
  searchParams,
}: {
  searchParams: Promise<{ nl?: string; err?: string }>;
}) {
  const sp = await searchParams;
  const err = sp.err;
  const newsletter = sp.nl === "1";

  if (err) {
    return (
      <main className="bg-[var(--bg)] text-[var(--text)]">
        <BlogNav />
        <section className="mx-auto max-w-2xl px-4 pt-40 pb-24 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-700">
            Bestätigung fehlgeschlagen
          </span>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black leading-tight tracking-tight">
            Das hat leider nicht geklappt.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            {err === "invalid" || err === "missing"
              ? "Der Bestätigungs-Link ist ungültig oder abgelaufen. Bestätigungs-Links sind 7 Tage gültig — bitte fordere die PDF einfach erneut an."
              : "Da ist etwas schiefgelaufen. Bitte versuch es später erneut oder schreib mir direkt an info@wohlstandsmarketing.de."}
          </p>
          <Link
            href="/#leadmagnet"
            className="group relative mt-10 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] !text-white px-8 py-4 text-[15px] font-semibold no-underline shadow-[0_10px_30px_-12px_rgba(10,10,10,0.4)]"
          >
            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative z-10 !text-white">PDF erneut anfordern</span>
            <span className="relative z-10 !text-white">→</span>
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <BlogNav />
      <section className="mx-auto max-w-2xl px-4 pt-40 pb-12 text-center sm:px-6">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-3xl text-white shadow-[0_10px_30px_-8px_rgba(22,99,222,0.45)]">
          ✓
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          E-Mail bestätigt
        </span>
        <h1
          className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.025em] text-[var(--text)]"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
        >
          Deine PDF ist{" "}
          <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
            freigeschaltet
          </span>
          .
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
          Du bekommst sie gleich auch nochmal in deinem Posteingang. Hier ist der Direkt-Link — speicher ihn dir gerne lokal ab.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3">
          <a
            href={PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-full max-w-md items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] !text-white px-9 py-5 text-base font-semibold no-underline shadow-[0_14px_40px_-10px_rgba(22,99,222,0.55)] transition hover:shadow-[0_18px_50px_-10px_rgba(22,99,222,0.8)] sm:w-auto"
          >
            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative z-10 !text-white">PDF jetzt herunterladen</span>
            <span className="relative z-10 !text-white transition-transform group-hover:translate-x-1">→</span>
          </a>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)] sm:text-[12px]">
            12 Seiten · A4 · Sofort-Download
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-black tracking-tight sm:text-2xl">
            Was als Nächstes?
          </h2>
          <ul className="mt-4 space-y-3 text-[14.5px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">1</span>
              <span>Geh die 11 Fehler einmal in Ruhe durch — unterstreich die, die dich persönlich treffen. Das sind erfahrungsgemäß 3–5.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">2</span>
              <span>Setz EINE der Maßnahmen aus der Profi-Checkliste am Ende diese Woche um. Nicht fünf — eine.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">3</span>
              <span>
                {newsletter
                  ? "In den nächsten Tagen bekommst du Mails von mir mit Vertiefungen, Beispielen und konkreten Hebeln — du hast den Newsletter ja angekreuzt."
                  : "Falls du möchtest, dass ich dir in den nächsten Tagen noch konkrete Vertiefungen und Beispiele schicke, gibt's den Newsletter beim nächsten Mal als Checkbox unter dem Form."}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">4</span>
              <span>Wenn du Lust auf einen direkten Sparringspartner hast, buch dir gerne ein kostenloses 15-Minuten-Erstgespräch.</span>
            </li>
          </ul>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={BOOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] !text-white px-7 py-4 text-[14px] font-semibold no-underline transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.55)] sm:flex-1"
            >
              <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative z-10 !text-white">15-Min-Erstgespräch buchen</span>
              <span className="relative z-10 !text-white">→</span>
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-7 py-4 text-[14px] font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:flex-1"
            >
              Oder: Blog durchstöbern
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
