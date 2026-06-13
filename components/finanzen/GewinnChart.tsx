"use client";
/**
 * "Gewinn vor Steuern"-Chart im Accountable-Stil: aktuelles Jahr als gefüllte
 * Fläche, Vorjahr gestrichelt zum Vergleich. Mit Umschalter Jahr / Q1–Q4.
 */
import { useState } from "react";

const MONATE = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

function eurK(n: number): string {
  if (Math.abs(n) >= 1000) return `${Math.round(n / 1000)}k €`;
  return `${Math.round(n)} €`;
}

type Bereich = "jahr" | "q1" | "q2" | "q3" | "q4";
const RANGES: Record<Bereich, [number, number]> = { jahr: [0, 12], q1: [0, 3], q2: [3, 6], q3: [6, 9], q4: [9, 12] };

export default function GewinnChart({
  jahr,
  aktuell,
  vorjahr,
}: {
  jahr: number;
  aktuell: number[]; // 12 Monatswerte (Gewinn netto)
  vorjahr: number[];
}) {
  const [bereich, setBereich] = useState<Bereich>("jahr");
  const [von, bis] = RANGES[bereich];

  const aCut = kumuliert(aktuell).slice(von, bis);
  const vCut = kumuliert(vorjahr).slice(von, bis);
  const labels = MONATE.slice(von, bis);

  const W = 520, H = 200, padL = 8, padR = 8, padT = 16, padB = 24;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const all = [...aCut, ...vCut, 0];
  const max = Math.max(1, ...all), min = Math.min(0, ...all);
  const span = max - min || 1;
  const n = aCut.length;
  const x = (i: number) => padL + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const y = (v: number) => padT + innerH - ((v - min) / span) * innerH;

  const line = (arr: number[]) => arr.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = (arr: number[]) => `${line(arr)} L${x(n - 1).toFixed(1)},${y(min).toFixed(1)} L${x(0).toFixed(1)},${y(min).toFixed(1)} Z`;

  const letzter = aCut[aCut.length - 1] ?? 0;

  return (
    <div style={S.card}>
      <div style={S.titleRow}>
        <span style={S.title}>📈 Gewinn vor Steuern</span>
        <div style={S.switch}>
          {(["jahr", "q1", "q2", "q3", "q4"] as Bereich[]).map((b) => (
            <button key={b} onClick={() => setBereich(b)} style={{ ...S.switchBtn, ...(b === bereich ? S.switchOn : {}) }}>
              {b === "jahr" ? "Jahr" : b.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={S.legend}>
        <Leg color="#7c3aed" label={String(jahr)} />
        <Leg color="#c4b5fd" label={String(jahr - 1)} dashed />
        <span style={{ marginLeft: "auto", fontWeight: 800, color: "#7c3aed" }}>{eurK(letzter)}</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="gw" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Nulllinie */}
        <line x1={padL} y1={y(0)} x2={W - padR} y2={y(0)} stroke="#ececf0" strokeWidth="1" />
        {n > 0 && (
          <>
            <path d={area(aCut)} fill="url(#gw)" />
            <path d={line(vCut)} fill="none" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="4 4" />
            <path d={line(aCut)} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
            <circle cx={x(n - 1)} cy={y(letzter)} r="4" fill="#7c3aed" />
          </>
        )}
        {labels.map((m, i) => (
          <text key={m} x={x(i)} y={H - 6} fontSize="10" fill="#a1a1aa" textAnchor="middle">{m}</text>
        ))}
      </svg>
    </div>
  );
}

function kumuliert(arr: number[]): number[] {
  let s = 0;
  return arr.map((v) => (s += v));
}

function Leg({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "#71717a" }}>
      <span style={{ width: 14, height: 0, borderTop: `2px ${dashed ? "dashed" : "solid"} ${color}` }} />
      {label}
    </span>
  );
}

const S: Record<string, React.CSSProperties> = {
  card: { background: "#fff", border: "1px solid #ececf0", borderRadius: 16, padding: 18 },
  titleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" },
  title: { fontSize: 14, fontWeight: 700, color: "#27272a" },
  switch: { display: "inline-flex", gap: 2, background: "#f4f4f5", borderRadius: 9, padding: 2 },
  switchBtn: { border: "none", background: "transparent", borderRadius: 7, padding: "5px 9px", fontSize: 12, fontWeight: 600, color: "#71717a", cursor: "pointer" },
  switchOn: { background: "#fff", color: "#0a0a0a", boxShadow: "0 1px 2px rgba(0,0,0,0.06)" },
  legend: { display: "flex", alignItems: "center", gap: 14, margin: "12px 0 6px" },
};
