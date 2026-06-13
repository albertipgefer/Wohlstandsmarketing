"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  CATEGORY_ORDER,
  type Tool,
  type ToolCategory,
} from "@/content/tools";
import ToolCard from "./ToolCard";

type Filter = "alle" | ToolCategory;

export default function ToolsGrid({ tools }: { tools: Tool[] }) {
  const [active, setActive] = useState<Filter>("alle");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map = new Map<Filter, number>();
    map.set("alle", tools.length);
    CATEGORY_ORDER.forEach((c) =>
      map.set(c, tools.filter((t) => t.category === c).length)
    );
    return map;
  }, [tools]);

  const filtered = useMemo(() => {
    let list = tools;
    if (active !== "alle") list = list.filter((t) => t.category === active);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((t) =>
        [t.name, t.description, CATEGORIES[t.category].label]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    return list;
  }, [tools, active, query]);

  const pills: Filter[] = ["alle", ...CATEGORY_ORDER];

  return (
    <>
      {/* Suche */}
      <div className="mb-6 md:mb-8">
        <div className="relative max-w-2xl">
          <span
            aria-hidden
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-subtle)]"
          >
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tool suchen — Name, Beschreibung, Kategorie …"
            aria-label="Tools durchsuchen"
            className="w-full rounded-full border border-[var(--border)] bg-white py-3 pl-11 pr-12 text-base text-[var(--text)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-glow-soft)] sm:text-[14px]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Suche löschen"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[12px] text-[var(--text-muted)] transition hover:text-[var(--text)]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Kategorie-Pills */}
      <div className="mb-10 flex flex-wrap gap-2 md:mb-12">
        {pills.map((p) => {
          const isActive = p === active;
          const label = p === "alle" ? "Alle" : CATEGORIES[p].label;
          const color = p === "alle" ? "var(--text)" : CATEGORIES[p].color;
          return (
            <button
              key={p}
              onClick={() => setActive(p)}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition"
              style={
                isActive
                  ? { background: color, borderColor: "transparent", color: "#fff" }
                  : {
                      background: "#fff",
                      borderColor: "var(--border)",
                      color: "var(--text-muted)",
                    }
              }
            >
              {p !== "alle" && (
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: isActive ? "#fff" : CATEGORIES[p].color }}
                />
              )}
              {label}
              <span
                className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                style={
                  isActive
                    ? { background: "rgba(255,255,255,0.22)", color: "#fff" }
                    : { background: "var(--surface-2)", color: "var(--text-subtle)" }
                }
              >
                {counts.get(p) ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-[var(--border)] bg-white p-10 text-center">
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text)]">
            Kein Tool gefunden.
          </p>
          <p className="mt-2 text-[14px] text-[var(--text-muted)]">
            Versuch andere Begriffe oder eine andere Kategorie.
          </p>
          {(query || active !== "alle") && (
            <button
              onClick={() => {
                setQuery("");
                setActive("alle");
              }}
              className="mt-5 rounded-full border border-[var(--border-strong)] bg-white px-5 py-2.5 text-[13px] font-semibold text-[var(--text)] transition hover:bg-[var(--text)] hover:text-white"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {filtered.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      )}
    </>
  );
}
