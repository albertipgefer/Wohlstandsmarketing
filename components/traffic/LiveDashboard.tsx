"use client";
/**
 * /traffic — Ebene „Live & Verhalten" (Datenquelle: PostHog, EU).
 * Lädt seine Daten lazy über GET /api/traffic/posthog?range= und zeigt
 * Live-Besucher, Trend, Conversions, Top-Seiten, Quellen und Geräte.
 * Reine SVG-Charts (TrafficChart), keine externe Lib.
 */
import { useEffect, useState } from "react";
import type { PosthogDashboard } from "@/lib/posthog";
import TrafficChart from "./TrafficChart";

const RANGES = [7, 28, 90] as const;
type Range = (typeof RANGES)[number];

function nf(n: number): string {
  return new Intl.NumberFormat("de-DE").format(n);
}

// Event-Name → lesbares Label fürs Cockpit
const EVENT_LABEL: Record<string, string> = {
  erstgespraech_geklickt: "Erstgespräch geklickt",
  kontaktformular_gesendet: "Kontaktformular gesendet",
  ki_check_gestartet: "KI-Check gestartet",
  ki_check_abgeschlossen: "KI-Check abgeschlossen",
  lead_magnet_download: "PDF-Download (Lead-Magnet)",
  anruf_klick: "Anruf-Klick",
  email_klick: "E-Mail-Klick",
  preise_konfiguriert: "Preise konfiguriert",
};

function Delta({ cur, prev }: { cur: number; prev: number }) {
  if (!prev) return <span style={{ color: "#a1a1aa", fontSize: 12 }}>—</span>;
  const change = (cur - prev) / prev;
  const up = change >= 0;
  const color =
    Math.abs(change) < 0.001 ? "#a1a1aa" : up ? "#16834a" : "#b42318";
  return (
    <span style={{ color, fontSize: 12, fontWeight: 600 }}>
      {up ? "▲" : "▼"} {Math.abs(change * 100).toFixed(0)} %
    </span>
  );
}

function Card({
  label,
  value,
  delta,
  accent,
}: {
  label: string;
  value: string;
  delta?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div style={{ ...S.card, ...(accent ? S.cardAccent : {}) }}>
      <div style={S.cardLabel}>{label}</div>
      <div style={{ ...S.cardValue, ...(accent ? { color: "#16834a" } : {}) }}>
        {value}
      </div>
      {delta && <div style={{ marginTop: 4 }}>{delta}</div>}
    </div>
  );
}

function BarList({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: number }[];
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div style={S.tableCard}>
      <div style={S.cardTitle}>{title}</div>
      {rows.length === 0 && (
        <div style={{ color: "#a1a1aa", fontSize: 13, padding: "6px 2px" }}>
          Noch keine Daten im Zeitraum.
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map((r, i) => (
          <div key={i}>
            <div style={S.barRow}>
              <span style={S.barLabel} title={r.label}>
                {r.label}
              </span>
              <span style={S.barVal}>{nf(r.value)}</span>
            </div>
            <div style={S.barTrack}>
              <div style={{ ...S.barFill, width: `${(r.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LiveDashboard() {
  const [data, setData] = useState<PosthogDashboard | null>(null);
  const [range, setRange] = useState<Range>(28);
  const [metric, setMetric] = useState<"visitors" | "views">("visitors");
  const [state, setState] = useState<"loading" | "ready" | "error" | "empty">(
    "loading",
  );

  useEffect(() => {
    let alive = true;
    setState("loading");
    fetch(`/api/traffic/posthog?range=${range}`)
      .then((r) => r.json())
      .then((json) => {
        if (!alive) return;
        if (json.ok) {
          setData(json.data);
          setState("ready");
        } else {
          setState(json.error === "posthog_not_configured" ? "empty" : "error");
        }
      })
      .catch(() => alive && setState("error"));
    return () => {
      alive = false;
    };
  }, [range]);

  return (
    <div>
      {/* Zeitraum-Umschalter */}
      <div style={S.toolbar}>
        <div style={S.switch}>
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{ ...S.switchBtn, ...(r === range ? S.switchOn : {}) }}
            >
              {r} Tage
            </button>
          ))}
        </div>
        <span style={{ fontSize: 12, color: "#71717a" }}>
          Quelle: PostHog (EU) · live
        </span>
      </div>

      {state === "loading" && <div style={S.note}>Lade Live-Daten …</div>}
      {state === "error" && (
        <div style={S.note}>Live-Daten konnten nicht geladen werden.</div>
      )}
      {state === "empty" && (
        <div style={S.note}>
          PostHog ist noch nicht verbunden (Keys fehlen in dieser Umgebung).
        </div>
      )}

      {state === "ready" && data && (
        <>
          {/* Kennzahlen */}
          <div style={S.cards}>
            <Card label="Live (jetzt aktiv)" value={nf(data.liveVisitors)} accent />
            <Card
              label={`Besucher (${range} T)`}
              value={nf(data.visitors)}
              delta={<Delta cur={data.visitors} prev={data.prevVisitors} />}
            />
            <Card
              label={`Seitenaufrufe (${range} T)`}
              value={nf(data.pageviews)}
              delta={<Delta cur={data.pageviews} prev={data.prevPageviews} />}
            />
            <Card
              label="Ø Seiten / Besucher"
              value={
                data.visitors > 0
                  ? (data.pageviews / data.visitors).toFixed(1).replace(".", ",")
                  : "—"
              }
            />
          </div>

          {/* Trend mit Metrik-Umschalter */}
          <div style={{ marginTop: 16 }}>
            <div style={{ ...S.switch, marginBottom: 8, display: "inline-flex" }}>
              <button
                onClick={() => setMetric("visitors")}
                style={{
                  ...S.switchBtn,
                  ...(metric === "visitors" ? S.switchOn : {}),
                }}
              >
                Besucher
              </button>
              <button
                onClick={() => setMetric("views")}
                style={{ ...S.switchBtn, ...(metric === "views" ? S.switchOn : {}) }}
              >
                Seitenaufrufe
              </button>
            </div>
            <TrafficChart
              dates={data.series.map((p) => p.date)}
              values={data.series.map((p) => p[metric])}
              label={metric === "visitors" ? "Besucher" : "Seitenaufrufe"}
              color={metric === "visitors" ? "#0d9488" : "#1663de"}
            />
          </div>

          {/* Conversions */}
          <div style={{ marginTop: 16 }}>
            <BarList
              title="🎯 Conversions & wichtige Aktionen"
              rows={data.conversions.map((c) => ({
                label: EVENT_LABEL[c.event] || c.event,
                value: c.count,
              }))}
            />
          </div>

          {/* Top-Seiten + Quellen + Geräte */}
          <div style={S.grid3}>
            <BarList
              title="📄 Top-Seiten"
              rows={data.topPages
                .slice(0, 12)
                .map((p) => ({ label: p.path, value: p.views }))}
            />
            <BarList
              title="🌐 Quellen"
              rows={data.sources.map((s) => ({
                label: s.source,
                value: s.count,
              }))}
            />
            <BarList
              title="📱 Geräte"
              rows={data.devices.map((d) => ({
                label: d.device,
                value: d.count,
              }))}
            />
          </div>

          {/* Verweis zu Clarity */}
          <a
            href="https://clarity.microsoft.com/projects/view/wwyiou5vrl/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            style={S.clarity}
          >
            🔍 Heatmaps & Session-Aufnahmen in Microsoft Clarity öffnen ↗
          </a>
        </>
      )}
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
  note: {
    background: "#fff",
    border: "1px solid #ececf0",
    borderRadius: 14,
    padding: "18px 16px",
    color: "#71717a",
    fontSize: 14,
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
  cardAccent: { borderColor: "#16834a33", background: "#16834a08" },
  cardLabel: { fontSize: 12, color: "#71717a", fontWeight: 600 },
  cardValue: { fontSize: 24, fontWeight: 800, marginTop: 4, color: "#18181b" },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 16,
    marginTop: 16,
  },
  tableCard: {
    background: "#fff",
    border: "1px solid #ececf0",
    borderRadius: 16,
    padding: 18,
  },
  cardTitle: { fontSize: 14, fontWeight: 700, color: "#27272a", marginBottom: 12 },
  barRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    fontSize: 13,
    marginBottom: 3,
  },
  barLabel: {
    color: "#3f3f46",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  barVal: { color: "#18181b", fontWeight: 700, whiteSpace: "nowrap" },
  barTrack: {
    height: 6,
    background: "#f4f4f5",
    borderRadius: 99,
    overflow: "hidden",
  },
  barFill: { height: "100%", background: "#1663de", borderRadius: 99 },
  clarity: {
    display: "block",
    marginTop: 16,
    textAlign: "center",
    background: "#fff",
    border: "1px solid #ececf0",
    borderRadius: 14,
    padding: "14px 16px",
    color: "#1663de",
    fontWeight: 600,
    fontSize: 14,
    textDecoration: "none",
  },
};
