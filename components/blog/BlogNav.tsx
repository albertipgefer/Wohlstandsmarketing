"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

const TOP_NAV = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Branchen", href: "/branchen" },
  { label: "KI-Check", href: "/sichtbarkeits-check" },
  { label: "Angebot", href: "/preise" },
  { label: "Blog", href: "/blog" },
] as const;

/**
 * SiteNav für alle Unterseiten. Gleicher Look wie die Homepage-Hero-Nav.
 * "Leistungen" führt direkt auf die /leistungen-Übersichtsseite (kein Dropdown).
 */
export default function BlogNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-2 rounded-full border border-[var(--border)] bg-white/80 px-3 py-2.5 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.18)] backdrop-blur-xl sm:px-4 sm:py-3">
            <Link href="/" className="flex items-center pl-1">
              <Logo size={36} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {TOP_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-[13px] font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="https://kundenbereich.wohlstandsmarketing.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full px-3 py-2 text-[13px] font-medium text-[var(--text-muted)] transition hover:text-[var(--text)] md:inline-flex"
              >
                Kundenbereich ↗
              </a>
              <Link
                href="/#strategie"
                className="group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-[var(--text)] px-5 py-2.5 text-[13px] font-semibold text-white md:inline-flex"
              >
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative z-10">Erstgespräch</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--text)] text-white md:hidden"
              >
                <span className={`absolute h-[1.5px] w-4 bg-white transition-transform ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
                <span className={`absolute h-[1.5px] w-4 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`absolute h-[1.5px] w-4 bg-white transition-transform ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex min-h-full flex-col items-center justify-start gap-4 px-6 pb-12 pt-24">
              {TOP_NAV.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                  className="w-full max-w-sm"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-center font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--text)]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.a
                href="https://kundenbereich.wohlstandsmarketing.de/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base font-medium text-[var(--text-muted)]"
              >
                Kundenbereich ↗
              </motion.a>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                className="mt-2"
              >
                <Link
                  href="/#strategie"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-8 py-4 text-base font-semibold text-white shadow-[0_14px_40px_-10px_rgba(22,99,222,0.5)]"
                >
                  Erstgespräch sichern →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
