"use client";
/**
 * Trend-Chart für /traffic — Tages-Zeitreihe aus der Search Console als
 * gefüllte SVG-Fläche (Muster wie components/finanzen/GewinnChart.tsx).
 * Zeigt die übergebene Metrik (Klicks oder Impressionen).
 *
 * Interaktiv: Maus-Hover bzw. Touch (iPad/Handy) zeigt einen Tooltip mit
 * Datum + Wert und hebt den Punkt samt vertikaler Linie hervor.
 */
import { useState } from "react";

type Point = { date: string; clicks: number; impressions: number };

function nf(n: number): string {
  return new Intl.NumberFormat("de-DE").format(n);
}

/** "2026-06-15" → "15.06." */
function shortDate(iso: string): string {
  const [, m, d] = iso.split("-");
  return d && m ? `${d}.${m}.` : iso;
}

/** "2026-06-15" → "So, 15.06.2026" (für den Tooltip) */
function longDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}.${m}.${y}`;
}

export default function TrafficChart({
  series,
  metric,
}: {
  series: Point[];
  metric: "clicks" | "impressions";
}) {
  const [hover, setHover] = useState<number | null>(null);
  const color = metric === "clicks" ? "#1663de" : "#db6f16";
  const vals = series.map((p) => p[metric]);

  const W = 720,
    H = 220,
    padL = 8,
    padR = 8,
    padT = 16,
    padB = 24;
  const innerW = W - padL - padR,
    innerH = H - padT - padB;
  const max = Math.max(1, ...vals);
  const n = vals.length;
  const x = (i: number) =>
    padL + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const y = (v: number) => padT + innerH - (v / max) * innerH;
  const xPct = (i: number) => (x(i) / W) * 100;

  const line = vals
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");
  const area =
    n > 0
      ? `${line} L${x(n - 1).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`
      : "";

  const step = Math.max(1, Math.ceil(n / 8));
  const hv = hover != null ? vals[hover] : null;

  return (
    <div style={S.card}>
      <div style={S.titleRow}>
        <span style={S.title}>
          {metric === "clicks" ? "🖱️ Klicks" : "👁️ Impressionen"} pro Tag
        </span>
        <span style={{ fontWeight: 800, color }}>
          Σ {nf(vals.reduce((a, b) => a + b, 0))}
        </span>
      </div>

      <div
        style={{ position: "relative", width: "100%", touchAction: "pan-y" }}
        onMouseLeave={() => setHover(null)}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", height: "auto", display: "block" }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`tg-${metric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.26" />
              <stop offset="100%" stopColor={color} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <line
            x1={padL}
            y1={y(0)}
            x2={W - padR}
            y2={y(0)}
            stroke="#ececf0"
            strokeWidth="1"
          />
          {n > 0 && (
            <>
              <path d={area} fill={`url(#tg-${metric})`} />
              <path d={line} fill="none" stroke={color} strokeWidth="2.5" />
              {/* Hover-Markierung: vertikale Linie + Punkt */}
              {hover != null && (
                <>
                  <line
                    x1={x(hover)}
                    y1={padT}
                    x2={x(hover)}
                    y2={H - padB}
                    stroke={color}
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.5"
                  />
                  <circle cx={x(hover)} cy={y(vals[hover])} r="5" fill={color} />
                </>
              )}
              {hover == null && (
                <circle cx={x(n - 1)} cy={y(vals[n - 1])} r="4" fill={color} />
              )}
            </>
          )}
          {series.map((p, i) =>
            i % step === 0 ? (
              <text
                key={p.date}
                x={x(i)}
                y={H - 6}
                fontSize="10"
                fill="#a1a1aa"
                textAnchor="middle"
              >
                {shortDate(p.date)}
              </text>
            ) : null,
          )}
        </svg>

        {/* Unsichtbare Hover-/Touch-Zonen (eine pro Tag) */}
        <div style={S.zones}>
          {series.map((p, i) => (
            <div
              key={p.date}
              style={{ flex: 1, height: "100%", cursor: "crosshair" }}
              onMouseEnter={() => setHover(i)}
              onTouchStart={() => setHover(i)}
              onTouchMove={() => setHover(i)}
            />
          ))}
        </div>

        {/* Tooltip */}
        {hover != null && hv != null && (
          <div
            style={{
              ...S.tooltip,
              left: `${xPct(hover)}%`,
              transform:
                xPct(hover) > 70
                  ? "translateX(-100%)"
                  : xPct(hover) < 30
                    ? "translateX(0)"
                    : "translateX(-50%)",
            }}
          >
            <div style={S.tooltipDate}>{longDate(series[hover].date)}</div>
            <div style={{ ...S.tooltipVal, color }}>
              {nf(hv)} {metric === "clicks" ? "Klicks" : "Impressionen"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  card: {
    background: "#fff",
    border: "1px solid #ececf0",
    borderRadius: 16,
    padding: 18,
  },
  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  title: { fontSize: 14, fontWeight: 700, color: "#27272a" },
  zones: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
  },
  tooltip: {
    position: "absolute",
    top: -6,
    background: "#18181b",
    color: "#fff",
    borderRadius: 8,
    padding: "6px 10px",
    fontSize: 12,
    pointerEvents: "none",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    zIndex: 2,
  },
  tooltipDate: { color: "#a1a1aa", fontSize: 11, marginBottom: 2 },
  tooltipVal: { fontWeight: 800 },
};
