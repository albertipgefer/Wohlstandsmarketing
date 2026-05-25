"use client";

import { useState, useMemo } from "react";
import type { PostMeta } from "@/content/blog/types";
import PostCard from "./PostCard";

type SortKey = "Neueste" | "Beliebteste" | "Lesedauer";
const SORT_KEYS: SortKey[] = ["Neueste", "Beliebteste", "Lesedauer"];

export default function CategoryFilter({
  posts,
  categories,
}: {
  posts: PostMeta[];
  categories: readonly string[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0] ?? "Alle"
  );
  const [sort, setSort] = useState<SortKey>("Neueste");
  const [query, setQuery] = useState("");

  // Counts per category for the badge numbers
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    categories.forEach((c) =>
      map.set(
        c,
        c === "Alle"
          ? posts.length
          : posts.filter((p) => p.category === c).length
      )
    );
    return map;
  }, [posts, categories]);

  // Filter + sort pipeline
  const filtered = useMemo(() => {
    let list = posts;
    if (activeCategory !== "Alle") {
      list = list.filter((p) => p.category === activeCategory);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const haystack = [
          p.title,
          p.excerpt,
          p.description,
          p.category,
          ...(p.keywords ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }
    // Apply sort
    const sorted = [...list];
    if (sort === "Neueste") {
      sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sort === "Beliebteste") {
      sorted.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
    } else if (sort === "Lesedauer") {
      sorted.sort((a, b) => {
        const aMin = parseInt(a.readingTime) || 0;
        const bMin = parseInt(b.readingTime) || 0;
        return aMin - bMin;
      });
    }
    return sorted;
  }, [posts, activeCategory, query, sort]);

  const [featured, ...rest] = filtered;
  const hasQuery = query.trim().length > 0;

  return (
    <>
      {/* Search Bar */}
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
            placeholder="Suche nach Themen, Keywords, Branchen …"
            aria-label="Blog durchsuchen"
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
        {hasQuery && (
          <p className="mt-3 text-[12px] text-[var(--text-muted)]">
            {filtered.length}{" "}
            {filtered.length === 1 ? "Treffer" : "Treffer"} für „{query}"
          </p>
        )}
      </div>

      {/* Category Pills + Sort */}
      <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            const count = counts.get(cat) ?? 0;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition ${
                  isActive
                    ? "border-transparent bg-[var(--text)] text-white"
                    : "border-[var(--border)] bg-white text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                }`}
              >
                {cat}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[var(--surface-2)] text-[var(--text-subtle)]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort dropdown */}
        <label className="flex items-center gap-2 text-[12px] font-medium text-[var(--text-muted)]">
          <span className="uppercase tracking-[0.18em]">Sortieren</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-base font-medium text-[var(--text)] outline-none transition focus:border-[var(--accent)] sm:text-[13px]"
          >
            {SORT_KEYS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="rounded-3xl border border-[var(--border)] bg-white p-10 text-center">
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text)]">
            Keine Artikel gefunden.
          </p>
          <p className="mt-2 text-[14px] text-[var(--text-muted)]">
            Versuch andere Begriffe oder eine andere Kategorie.
          </p>
          {(query || activeCategory !== "Alle") && (
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("Alle");
              }}
              className="mt-5 rounded-full border border-[var(--border-strong)] bg-white px-5 py-2.5 text-[13px] font-semibold text-[var(--text)] transition hover:bg-[var(--text)] hover:text-white"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>
      )}

      {/* Featured + rest — only show featured if no query (otherwise normal grid) */}
      {featured && !hasQuery && (
        <div className="mb-10 md:mb-14">
          <PostCard meta={featured} featured />
        </div>
      )}
      {!hasQuery && rest.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {rest.map((p) => (
            <PostCard key={p.slug} meta={p} />
          ))}
        </div>
      )}
      {hasQuery && filtered.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {filtered.map((p) => (
            <PostCard key={p.slug} meta={p} />
          ))}
        </div>
      )}
    </>
  );
}
