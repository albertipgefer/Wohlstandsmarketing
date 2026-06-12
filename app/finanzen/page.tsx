/**
 * /finanzen — Finanz-Übersicht (login-geschützt, gleiche Auth wie /angebot).
 * Accountable-Stil: Umsatz-KPIs, Forecast ("nächster Umsatz"), Monats-Chart,
 * Handlungs-Listen (offene Rechnungen, angenommene Angebote ohne Rechnung).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listAngebote } from "@/lib/angebot/db";
import { listRechnungen } from "@/lib/finanzen/db";
import { computeKpis } from "@/lib/finanzen/forecast";
import { eur, deDate } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Übersicht",
  robots: { index: false, follow: false },
};

const MONATE = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

export default async function FinanzUebersicht() {
  if (!(await isLoggedIn())) redirect("/angebot/login");

  const now = new Date();
  const [angebote, rechnungen] = await Promise.all([listAngebote(), listRechnungen()]);
  const k = computeKpis(angebote, rechnungen, now);
  const jahr = now.getFullYear();

  const maxMonat = Math.max(1, ...k.monatlichNetto);

  // Handlungs-Listen
  const offeneRechnungen = rechnungen
    .filter((r) => r.status === "offen" || r.status === "ueberfaellig" || r.status === "entwurf")
    .slice(0, 8);
  const angebotIdsMitRechnung = new Set(rechnungen.map((r) => r.angebot_id).filter(Boolean));
  const angenommeneOhneRechnung = angebote
    .filter((a) => a.status === "angenommen" && !angebotIdsMitRechnung.has(a.id))
    .slice(0, 8);

  return (
    <FinanzShell active="uebersicht" title={`Übersicht ${jahr}`}>
      {/* KPI-Karten */}
      <div className="fin-kpis">
        <Kpi label={`Umsatz ${jahr} (netto)`} value={eur(k.umsatzJahrNetto)} sub="bezahlte Rechnungen" />
        <Kpi label="Aktuelles Quartal" value={eur(k.umsatzQuartalNetto)} sub="bezahlt, netto" />
        <Kpi
          label="Nächster Umsatz"
          value={eur(k.naechsterUmsatzNetto)}
          sub="Pipeline: offen + Entwürfe + angenommene Angebote"
          accent
        />
        <Kpi
          label="Offen"
          value={eur(k.offenNetto)}
          sub={k.ueberfaelligNetto > 0 ? `davon überfällig: ${eur(k.ueberfaelligNetto)}` : `${k.offeneAnzahl} Rechnung(en)`}
          warn={k.ueberfaelligNetto > 0}
        />
      </div>

      {/* Monats-Chart */}
      <div style={S.card}>
        <div style={S.cardTitle}>Bezahlter Umsatz {jahr} — pro Monat (netto)</div>
        <div style={S.chart}>
          {k.monatlichNetto.map((v, i) => (
            <div key={i} style={S.chartCol}>
              <div style={S.chartBarWrap}>
                <div
                  style={{
                    ...S.chartBar,
                    height: `${Math.round((v / maxMonat) * 100)}%`,
                    background: i === now.getMonth() ? "#1663de" : "#cdddfa",
                  }}
                  title={eur(v)}
                />
              </div>
              <div style={S.chartLabel}>{MONATE[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Zwei Handlungs-Listen */}
      <div className="fin-twocol">
        <div style={S.card}>
          <div style={S.cardTitleRow}>
            <span style={S.cardTitle}>Offene & Entwurfs-Rechnungen</span>
            <Link href="/finanzen/rechnungen" style={S.cardLink}>alle →</Link>
          </div>
          {offeneRechnungen.length === 0 ? (
            <p style={S.empty}>Keine offenen Rechnungen.</p>
          ) : (
            <ul style={S.list}>
              {offeneRechnungen.map((r) => (
                <li key={r.id} style={S.listItem}>
                  <div>
                    <div style={S.itemMain}>{r.kunde_firma || r.kunde_email || "—"}</div>
                    <div style={S.itemSub}>
                      {r.nummer || "ohne Nr."} · fällig {r.faellig_am ? deDate(r.faellig_am) : "—"}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={S.itemAmount}>{eur(r.brutto)}</div>
                    <StatusBadge status={r.status} faellig={r.faellig_am} now={now} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={S.card}>
          <div style={S.cardTitleRow}>
            <span style={S.cardTitle}>Angenommen — Rechnung offen</span>
            <Link href="/angebot" style={S.cardLink}>Angebote →</Link>
          </div>
          {angenommeneOhneRechnung.length === 0 ? (
            <p style={S.empty}>Alles abgerechnet. 🎉</p>
          ) : (
            <ul style={S.list}>
              {angenommeneOhneRechnung.map((a) => (
                <li key={a.id} style={S.listItem}>
                  <div>
                    <div style={S.itemMain}>{a.kunde_firma || a.kunde_email || "—"}</div>
                    <div style={S.itemSub}>Angebot {a.nummer || "—"}</div>
                  </div>
                  <div style={S.itemAmount}>{eur(a.brutto)}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </FinanzShell>
  );
}

function Kpi({
  label,
  value,
  sub,
  accent,
  warn,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  warn?: boolean;
}) {
  return (
    <div style={{ ...S.kpi, ...(accent ? S.kpiAccent : {}) }}>
      <div style={{ ...S.kpiLabel, color: accent ? "rgba(255,255,255,0.8)" : "#71717a" }}>{label}</div>
      <div style={{ ...S.kpiValue, color: accent ? "#fff" : warn ? "#b42318" : "#0a0a0a" }}>{value}</div>
      {sub ? (
        <div style={{ ...S.kpiSub, color: accent ? "rgba(255,255,255,0.85)" : warn ? "#b42318" : "#a1a1aa" }}>{sub}</div>
      ) : null}
    </div>
  );
}

function StatusBadge({
  status,
  faellig,
  now,
}: {
  status: string;
  faellig: string | null;
  now: Date;
}) {
  const heute = now.toISOString().slice(0, 10);
  const past = faellig !== null && faellig < heute;
  let label = status;
  let bg = "#f4f4f5";
  let fg = "#52525b";
  if (status === "entwurf") { label = "Entwurf"; }
  else if (status === "bezahlt") { label = "Bezahlt"; bg = "#ecfdf3"; fg = "#027a48"; }
  else if (status === "ueberfaellig" || (status === "offen" && past)) { label = "Überfällig"; bg = "#fef3f2"; fg = "#b42318"; }
  else if (status === "offen") { label = "Offen"; bg = "#eff6ff"; fg = "#1663de"; }
  return <span style={{ ...S.badge, background: bg, color: fg }}>{label}</span>;
}

const S: Record<string, React.CSSProperties> = {
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 18 },
  kpi: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "16px 18px" },
  kpiAccent: { background: "linear-gradient(135deg,#1663de,#0f4fb0)", border: "none" },
  kpiLabel: { fontSize: 12.5, fontWeight: 600 },
  kpiValue: { fontSize: 24, fontWeight: 800, margin: "6px 0 2px", letterSpacing: "-0.5px" },
  kpiSub: { fontSize: 12, fontWeight: 500 },
  card: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "18px 20px", marginBottom: 16 },
  cardTitle: { fontSize: 14, fontWeight: 700, color: "#27272a" },
  cardTitleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardLink: { fontSize: 13, fontWeight: 600, color: "#1663de", textDecoration: "none" },
  chart: { display: "flex", alignItems: "flex-end", gap: 8, height: 160, marginTop: 16 },
  chartCol: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%" },
  chartBarWrap: { flex: 1, width: "100%", display: "flex", alignItems: "flex-end" },
  chartBar: { width: "100%", borderRadius: "6px 6px 0 0", minHeight: 2, transition: "height .3s" },
  chartLabel: { fontSize: 11, color: "#a1a1aa" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  list: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 },
  listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f4f4f5", gap: 12 },
  itemMain: { fontSize: 14, fontWeight: 600 },
  itemSub: { fontSize: 12, color: "#a1a1aa", marginTop: 2 },
  itemAmount: { fontSize: 14, fontWeight: 700 },
  badge: { display: "inline-block", marginTop: 4, padding: "2px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700 },
  empty: { fontSize: 13.5, color: "#71717a", margin: "6px 0" },
};
