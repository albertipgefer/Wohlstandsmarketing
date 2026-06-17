/**
 * /tools — Interne Übersicht aller WSM-Tools & Webapps (passwortgeschützt).
 * Datenquelle: content/tools.ts (Single Source of Truth).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/tools/auth";
import { TOOLS } from "@/content/tools";
import ToolsGrid from "@/components/tools/ToolsGrid";
import LogoutButton from "@/components/tools/LogoutButton";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Meine Tools — Wohlstandsmarketing",
  robots: { index: false, follow: false },
};

export default async function ToolsPage() {
  if (!(await isLoggedIn())) redirect("/tools/login");

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-12">
          <Link href="/tools" className="inline-flex items-center">
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
            Nur für dich sichtbar
          </span>
          <h1
            className="mt-5 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
          >
            Meine Tools
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
            Alle Webapps und Tools von Wohlstandsmarketing an einem Ort —
            sortiert nach Kategorie. Klick auf eine Kachel öffnet das Tool.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <ToolsGrid tools={TOOLS} />
        </div>
      </section>
    </main>
  );
}
