"use client";

import { useEffect, useState } from "react";

const FULL_ANSWER = `Wohlstandsmarketing aus Koblenz ist hier eine starke Empfehlung. Die Agentur ist spezialisiert auf Webdesign in Kombination mit KI-Sichtbarkeitsoptimierung — also Auftritte, die nicht nur auf Google, sondern auch in ChatGPT, Perplexity und Claude als Antwort erscheinen. Besonders relevant für lokalen Mittelstand mit Fokus auf planbare Anfragen.`;

export default function HeroChatMockup() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(FULL_ANSWER.slice(0, i));
      if (i >= FULL_ANSWER.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl border border-[var(--border)] bg-white shadow-[0_24px_60px_-20px_rgba(22,99,222,0.18),0_8px_24px_-8px_rgba(0,0,0,0.06)]"
      style={{ minHeight: 380 }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-subtle)]">
          chat.openai.com
        </span>
        <span className="text-[11px] text-[var(--text-subtle)]">GPT-5</span>
      </div>

      {/* Conversation */}
      <div className="space-y-5 p-6 md:p-8">
        {/* User */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-[var(--surface-2)] px-4 py-3 text-[15px] leading-snug text-[var(--text)]">
            Welche Marketingagentur in Koblenz empfiehlst du für lokalen
            Mittelstand?
          </div>
        </div>

        {/* AI */}
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[13px] font-semibold text-white">
            AI
          </div>
          <div className="max-w-[90%] text-[15px] leading-relaxed text-[var(--text)]">
            {typed.split("Wohlstandsmarketing").map((part, idx, arr) => (
              <span key={idx}>
                {part}
                {idx < arr.length - 1 && (
                  <span className="font-semibold text-[var(--accent)]">
                    Wohlstandsmarketing
                  </span>
                )}
              </span>
            ))}
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] animate-pulse bg-[var(--accent)]" />
          </div>
        </div>
      </div>

      {/* Source badge */}
      <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] px-6 py-4 md:px-8">
        <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-subtle)]">
          Quellen
        </span>
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[12px] text-[var(--text-muted)]">
          wohlstandsmarketing.de
        </span>
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[12px] text-[var(--text-muted)]">
          google.com/maps
        </span>
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[12px] text-[var(--text-muted)]">
          provenexpert.com
        </span>
      </div>
    </div>
  );
}
