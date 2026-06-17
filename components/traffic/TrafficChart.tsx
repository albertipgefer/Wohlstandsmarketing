"use client";
/**
 * Trend-Chart für /traffic — Tages-Zeitreihe aus der Search Console als
 * gefüllte SVG-Fläche (Muster wie components/finanzen/GewinnChart.tsx).
 * Zeigt die übergebene Metrik (Klicks oder Impressionen).
 */

type Point = { date: string; clicks: number; impressions: number };

function nf(n: number): string {
  return new Intl.NumberFormat("de-DE").format(n);
}

/** "2026-06-15" → "15.06." */
function shortDate(iso: string): string {
  const [, m, d] = iso.split("-");
  return d && m ? `${d}.${m}.` : iso;
}

export default function TrafficChart({
  series,
  metric,
}: {
  series: Point[];
  metric: "clicks" | "impressions";
}) {
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

  const line = vals
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");
  const area =
    n > 0
      ? `${line} L${x(n - 1).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`
      : "";

  // höchstens ~8 X-Labels, gleichmäßig verteilt
  const step = Math.max(1, Math.ceil(n / 8));

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

      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto" }}
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
            <circle
              cx={x(n - 1)}
              cy={y(vals[n - 1])}
              r="4"
              fill={color}
            />
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
};
