"use client";
/**
 * Ebenen-Umschalter im /traffic-Cockpit:
 *   🔍 Google-Suche  (Search Console, verzögert)
 *   📡 Live & Verhalten (PostHog, live)
 */
import { useState } from "react";
import type { GscDashboard } from "@/lib/gsc";
import TrafficDashboard from "./TrafficDashboard";
import LiveDashboard from "./LiveDashboard";

export default function TrafficTabs({ gsc }: { gsc: GscDashboard | null }) {
  const [tab, setTab] = useState<"suche" | "live">("suche");

  return (
    <div>
      <div style={S.tabBar}>
        <button
          onClick={() => setTab("suche")}
          style={{ ...S.tab, ...(tab === "suche" ? S.tabOn : {}) }}
        >
          🔍 Google-Suche
        </button>
        <button
          onClick={() => setTab("live")}
          style={{ ...S.tab, ...(tab === "live" ? S.tabOn : {}) }}
        >
          📡 Live &amp; Verhalten
        </button>
      </div>

      {tab === "suche" ? (
        gsc ? (
          <TrafficDashboard initial={gsc} />
        ) : (
          <div style={S.note}>
            <strong>Keine Search-Console-Daten verfügbar.</strong>
            <div style={{ marginTop: 6, fontSize: 14 }}>
              Die Verbindung (GSC_OAUTH_* / GSC_SITE_URL) ist nicht erreichbar.
            </div>
          </div>
        )
      ) : (
        <LiveDashboard />
      )}
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  tabBar: {
    display: "inline-flex",
    gap: 4,
    background: "#f4f4f5",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  tab: {
    border: "none",
    background: "transparent",
    borderRadius: 9,
    padding: "9px 16px",
    fontSize: 14,
    fontWeight: 700,
    color: "#71717a",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  tabOn: {
    background: "#fff",
    color: "#0a0a0a",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  note: {
    background: "#fff",
    border: "1px solid #ececf0",
    borderRadius: 16,
    padding: "24px 20px",
    color: "#71717a",
  },
};
