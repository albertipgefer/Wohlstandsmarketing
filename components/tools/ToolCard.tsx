import Link from "next/link";
import { CATEGORIES, type Tool } from "@/content/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const cat = CATEGORIES[tool.category];
  const isExternal = tool.href.startsWith("http");

  return (
    <Link
      href={tool.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(22,99,222,0.25)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Icon-Badge in Kategoriefarbe */}
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
          style={{ background: `${cat.color}1a` }}
          aria-hidden
        >
          {tool.icon}
        </span>
        {/* Kategorie-Label */}
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ background: `${cat.color}14`, color: cat.color }}
        >
          {cat.label}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold leading-tight tracking-tight text-[var(--text)]">
          {tool.name}
        </h3>
        <p className="text-[14px] leading-snug text-[var(--text-muted)]">
          {tool.description}
        </p>
      </div>

      {/* Badges + Pfeil */}
      <div className="mt-auto flex items-center gap-2 pt-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            tool.status === "live"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              tool.status === "live" ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          {tool.status === "live" ? "Live" : "In Arbeit"}
        </span>
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-subtle)]">
          {tool.internal ? "Intern" : "Öffentlich"}
        </span>
        {tool.access === "geschützt" && (
          <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-subtle)]">
            🔒 Zugang geschützt
          </span>
        )}
        <span className="ml-auto text-[var(--accent)] transition group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </Link>
  );
}
