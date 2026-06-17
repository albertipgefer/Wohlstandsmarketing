/**
 * /traffic — Dashboard für den organischen Google-Traffic (Search Console).
 * Passwortgeschützt (isLoggedIn), Daten live aus lib/gsc.ts (getGscDashboard).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/traffic/auth";
import { getGscDashboard } from "@/lib/gsc";
import TrafficDashboard from "@/components/traffic/TrafficDashboard";
import LogoutButton from "@/components/traffic/LogoutButton";
import Logo from "@/components/Logo";
import Footer from "@/components/sections/Footer";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Google-Traffic — Wohlstandsmarketing",
  robots: { index: false, follow: false },
};

export default async function TrafficPage() {
  if (!(await isLoggedIn())) redirect("/traffic/login");

  const data = await getGscDashboard(28);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-12">
          <Link href="/traffic" className="inline-flex items-center">
            <Logo size={32} withWordmark={false} />
          </Link>
          <LogoutButton />
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)] pt-12 pb-10 sm:pt-16 sm:pb-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.12)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            <span className="font-semibold text-[var(--gold-text)]">Intern</span>
            <span className="text-[var(--text-subtle)]">·</span>
            Google Search Console
          </span>
          <h1
            className="mt-5 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
          >
            Google-Traffic
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
            Wie viel organischen Suchverkehr deine Website über Google bekommt —
            Klicks, Impressionen, Klickrate und Position, mit Trend und deinen
            stärksten Keywords und Seiten.
          </p>
        </div>
      </section>

      {/* Inhalt */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          {data ? (
            <TrafficDashboard initial={data} />
          ) : (
            <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-[var(--text-muted)]">
              <p className="font-semibold text-[var(--text)]">
                Keine Search-Console-Daten verfügbar.
              </p>
              <p className="mt-2 text-sm">
                Die Verbindung (GSC_OAUTH_* / GSC_SITE_URL) ist nicht erreichbar.
                Lokal: <code>vercel env pull</code>. Auf Vercel: Env prüfen.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
