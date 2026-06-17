"use client";
/**
 * /traffic — Client-Dashboard für den organischen Google-Traffic (Search Console).
 * Bekommt Initialdaten serverseitig, lädt bei Zeitraumwechsel über
 * GET /api/traffic/data?range= nach. Reine SVG-Charts, keine externe Lib.
 */
import { useState } from "react";
import type { GscDashboard, GscRow } from "@/lib/gsc";
import TrafficChart from "./TrafficChart";

const RANGES = [7, 28, 90] as const;
type Range = (typeof RANGES)[number];

function nf(n: number): string {
  return new Intl.NumberFormat("de-DE").format(n);
}
function pct(n: number): string {
  return `${(n * 100).toFixed(1).replace(".", ",")} %`;
}
function pos(n: number): string {
  return n > 0 ? n.toFixed(1).replace(".", ",") : "—";
}

/** Veränderung in % gegenüber Vorperiode. higherIsBetter steuert die Farbe. */
function Delta({
  cur,
  prev,
  higherIsBetter = true,
}: {
  cur: number;
  prev: number;
  higherIsBetter?: boolean;
}) {
  if (!prev) return <span style={{ color: "#a1a1aa", fontSize: 12 }}>—</span>;
  const change = (cur - prev) / prev;
  const up = change >= 0;
  const good = higherIsBetter ? up : !up;
  const color = Math.abs(change) < 0.001 ? "#a1a1aa" : good ? "#16834a" : "#b42318";
  const arrow = up ? "▲" : "▼";
  return (
    <span style={{ color, fontSize: 12, fontWeight: 600 }}>
      {arrow} {Math.abs(change * 100).toFixed(0)} %
    </span>
  );
}

function Card({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: React.ReactNode;
}) {
  return (
    <div style={S.card}>
      <div style={S.cardLabel}>{label}</div>
      <div style={S.cardValue}>{value}</div>
      {delta && <div style={{ marginTop: 4 }}>{delta}</div>}
    </div>
  );
}

function Table({
  title,
  rows,
  keyLabel,
  isUrl,
}: {
  title: string;
  rows: GscRow[];
  keyLabel: string;
  isUrl?: boolean;
}) {
  return (
    <div style={S.tableCard}>
      <div style={S.title}>{title}</div>
      <div style={{ overflowX: "auto" }}>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>{keyLabel}</th>
              <th style={S.thNum}>Klicks</th>
              <th style={S.thNum}>Impr.</th>
              <th style={S.thNum}>CTR</th>
              <th style={S.thNum}>Pos.</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 25).map((r, i) => (
              <tr key={i}>
                <td style={S.td} title={r.key}>
                  {isUrl ? prettyUrl(r.key) : r.key}
                </td>
                <td style={S.tdNum}>{nf(r.clicks)}</td>
                <td style={S.tdNum}>{nf(r.impressions)}</td>
                <td style={S.tdNum}>{pct(r.ctr)}</td>
                <td style={S.tdNum}>{pos(r.position)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td style={{ ...S.td, color: "#a1a1aa" }} colSpan={5}>
                  Keine Daten im Zeitraum.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function prettyUrl(u: string): string {
  try {
    const p = new URL(u).pathname;
    return p === "" ? "/" : p;
  } catch {
    return u;
  }
}

export default function TrafficDashboard({
  initial,
}: {
  initial: GscDashboard;
}) {
  const [data, setData] = useState<GscDashboard>(initial);
  const [range, setRange] = useState<Range>(
    (RANGES as readonly number[]).includes(initial.rangeDays)
      ? (initial.rangeDays as Range)
      : 28,
  );
  const [metric, setMetric] = useState<"clicks" | "impressions">("clicks");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function changeRange(r: Range) {
    if (r === range && !err) return;
    setBusy(true);
    setErr("");
    try {
      const res = await fetch(`/api/traffic/data?range=${r}`);
      const json = await res.json();
      if (json.ok) {
        setData(json.data);
        setRange(r);
      } else {
        setErr("Daten konnten nicht geladen werden.");
      }
    } catch {
      setErr("Netzwerkfehler.");
    } finally {
      setBusy(false);
    }
  }

  const c = data.current;
  const p = data.previous;

  return (
    <div style={{ opacity: busy ? 0.55 : 1, transition: "opacity 0.15s" }}>
      {/* Zeitraum-Umschalter */}
      <div style={S.toolbar}>
        <div style={S.switch}>
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => changeRange(r)}
              disabled={busy}
              style={{ ...S.switchBtn, ...(r === range ? S.switchOn : {}) }}
            >
              {r} Tage
            </button>
          ))}
        </div>
        {err && <span style={{ color: "#b42318", fontSize: 13 }}>{err}</span>}
      </div>

      {/* Kennzahlen-Karten */}
      <div style={S.cards}>
        <Card
          label="Klicks"
          value={nf(c.clicks)}
          delta={<Delta cur={c.clicks} prev={p.clicks} />}
        />
        <Card
          label="Impressionen"
          value={nf(c.impressions)}
          delta={<Delta cur={c.impressions} prev={p.impressions} />}
        />
        <Card
          label="CTR"
          value={pct(c.ctr)}
          delta={<Delta cur={c.ctr} prev={p.ctr} />}
        />
        <Card
          label="Ø-Position"
          value={pos(c.position)}
          delta={
            <Delta cur={c.position} prev={p.position} higherIsBetter={false} />
          }
        />
        <Card
          label="Indexierte Seiten"
          value={data.indexedPages != null ? nf(data.indexedPages) : "—"}
        />
      </div>

      {/* Trend-Chart mit Metrik-Umschalter */}
      <div style={{ marginTop: 16 }}>
        <div style={{ ...S.switch, marginBottom: 8, display: "inline-flex" }}>
          <button
            onClick={() => setMetric("clicks")}
            style={{ ...S.switchBtn, ...(metric === "clicks" ? S.switchOn : {}) }}
          >
            Klicks
          </button>
          <button
            onClick={() => setMetric("impressions")}
            style={{
              ...S.switchBtn,
              ...(metric === "impressions" ? S.switchOn : {}),
            }}
          >
            Impressionen
          </button>
        </div>
        <TrafficChart
          dates={data.series.map((p) => p.date)}
          values={data.series.map((p) => p[metric])}
          label={metric === "clicks" ? "Klicks" : "Impressionen"}
          color={metric === "clicks" ? "#1663de" : "#db6f16"}
        />
      </div>

      {/* Tabellen */}
      <div style={S.tables}>
        <Table title="🔍 Top-Suchanfragen" rows={data.topQueries} keyLabel="Suchanfrage" />
        <Table title="📄 Top-Seiten" rows={data.topPages} keyLabel="Seite" isUrl />
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  switch: {
    display: "inline-flex",
    gap: 2,
    background: "#f4f4f5",
    borderRadius: 9,
    padding: 2,
  },
  switchBtn: {
    border: "none",
    background: "transparent",
    borderRadius: 7,
    padding: "6px 12px",
    fontSize: 13,
    fontWeight: 600,
    color: "#71717a",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  switchOn: {
    background: "#fff",
    color: "#0a0a0a",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 12,
  },
  card: {
    background: "#fff",
    border: "1px solid #ececf0",
    borderRadius: 14,
    padding: "14px 16px",
  },
  cardLabel: { fontSize: 12, color: "#71717a", fontWeight: 600 },
  cardValue: { fontSize: 24, fontWeight: 800, marginTop: 4, color: "#18181b" },
  tables: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 16,
    marginTop: 16,
  },
  tableCard: {
    background: "#fff",
    border: "1px solid #ececf0",
    borderRadius: 16,
    padding: 18,
  },
  title: { fontSize: 14, fontWeight: 700, color: "#27272a", marginBottom: 10 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: {
    textAlign: "left",
    padding: "6px 8px",
    color: "#a1a1aa",
    fontWeight: 600,
    borderBottom: "1px solid #ececf0",
  },
  thNum: {
    textAlign: "right",
    padding: "6px 8px",
    color: "#a1a1aa",
    fontWeight: 600,
    borderBottom: "1px solid #ececf0",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "7px 8px",
    borderBottom: "1px solid #f4f4f5",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    verticalAlign: "top",
    lineHeight: 1.35,
    minWidth: 120,
  },
  tdNum: {
    padding: "7px 8px",
    borderBottom: "1px solid #f4f4f5",
    textAlign: "right",
    whiteSpace: "nowrap",
    color: "#3f3f46",
  },
};
