/**
 * /outreach — geschütztes KPI-Dashboard für die Cold-Outreach-Engine.
 * Zugriff: ?pw=<OUTREACH_DASHBOARD_PASSWORD>. Liest live aus Supabase.
 *
 * Strategie v3 (reply-only): kein Tracking-Pixel, kein Link in Mail 1, kein A/B.
 * Gemessen wird, was zählt: Versand, Zustellung, Antworten und der Befund-Freigabe-Loop.
 */
import {
  eventCounts, statusCounts,
  getRepliesWithDetails, eventsByDay, bucketBreakdown, enrichStatusCounts,
  pendingReplyStats, sequenceDistribution,
} from "@/lib/outreach-db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const pct = (n: number, d: number) => (d > 0 ? `${((n / d) * 100).toFixed(1)} %` : "—");

function Card({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 14, padding: "18px 20px" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#737373", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: "#0A0A0A", margin: "6px 0 2px" }}>{value}</div>
      {sub && <div style={{ fontSize: 13, color: "#a3a3a3" }}>{sub}</div>}
    </div>
  );
}

export default async function OutreachDashboard({
  searchParams,
}: {
  searchParams: Promise<{ pw?: string }>;
}) {
  const { pw } = await searchParams;
  const expected = process.env.OUTREACH_DASHBOARD_PASSWORD;
  const shell = (inner: React.ReactNode) => (
    <main style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif", color: "#0A0A0A", padding: "40px 24px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>{inner}</div>
    </main>
  );

  if (!expected || pw !== expected) {
    return shell(<p style={{ fontSize: 15, color: "#525252" }}>🔒 Geschützt. Zugriff über <code>?pw=…</code></p>);
  }

  const { byType } = await eventCounts();
  const status = await statusCounts();
  const sent = byType.sent || 0;
  const bounce = byType.bounce || 0;
  const delivered = Math.max(0, sent - bounce);
  const reply = byType.reply || 0;
  const unsub = byType.unsubscribe || 0;
  const totalProspects = Object.values(status).reduce((a, b) => a + b, 0);

  const replies = await getRepliesWithDetails(20);
  const timeline = await eventsByDay(14);
  const buckets = await bucketBreakdown();
  const enrich = await enrichStatusCounts();
  const pending = await pendingReplyStats();
  const seq = await sequenceDistribution();

  const readyToSend = enrich.ready_v3 || 0;
  const befundSent = pending.sent || 0;
  const befundAwaiting = pending.awaiting || 0;
  const befundApproved = pending.approved || 0;
  const befundRejected = pending.rejected || 0;
  const befundDecided = befundSent + befundRejected;

  const BUCKET_LABEL: Record<string, string> = {
    A: "A · Seite langsam", B: "B · keine Verkäufer-Strecke", C: "C · keine Bewertungen",
    D: "D · KI unsichtbar (kein Schema)", E: "E · veraltete Seite", F: "F · sauber (Markt-Aufhänger)",
    G: "G · SEO / Meta-Description", "—": "ohne Bucket",
  };
  const SEQ_LABEL: Record<string, string> = {
    "0": "Erstkontakt (Mail 1)", "1": "Nachfass 1 (Mail 2)", "2": "Nachfass 2 (Mail 3)",
    "3": "Nachfass 3 (Mail 4)", "4": "Break-up (Mail 5)",
  };
  const funnel: [string, number][] = [
    ["Versendet", sent], ["Zugestellt", delivered], ["Antworten", reply], ["Befund raus", befundSent],
  ];

  return shell(
    <>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px" }}>Cold-Outreach — Dashboard</h1>
      <p style={{ fontSize: 14, color: "#737373", margin: "0 0 28px" }}>
        {totalProspects} Prospects · {readyToSend} versandfähig (v3-Copy) · live aus Supabase · reply-only, kein Pixel/Link in Mail 1
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 14 }}>
        <Card label="Versendet" value={String(sent)} />
        <Card label="Zugestellt" value={String(delivered)} sub={`Bounce ${pct(bounce, sent)}`} />
        <Card label="Antworten" value={String(reply)} sub={`${pct(reply, delivered)} Reply-Rate`} />
        <Card label="Befund raus" value={String(befundSent)} sub={`aus ${reply} Antworten`} />
        <Card label="Abmeldungen" value={String(unsub)} sub={`${pct(unsub, delivered)}`} />
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "28px 0 12px" }}>Befund-Freigabe-Loop</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 }}>
        <Card label="Wartet auf Freigabe" value={String(befundAwaiting)} sub="im Telegram-Loop" />
        <Card label="Genehmigt (geht raus)" value={String(befundApproved)} />
        <Card label="Versendet" value={String(befundSent)} />
        <Card label="Abgelehnt" value={String(befundRejected)} sub={`Freigabequote ${pct(befundSent, befundDecided)}`} />
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "28px 0 12px" }}>Funnel</h2>
      <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 14, padding: "16px 20px" }}>
        {funnel.map(([label, n]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0" }}>
            <div style={{ width: 110, fontSize: 13, color: "#737373" }}>{label}</div>
            <div style={{ flex: 1, background: "#f0f0f0", borderRadius: 8, height: 22, overflow: "hidden" }}>
              <div style={{ width: `${sent > 0 ? Math.max(2, (n / sent) * 100) : 0}%`, background: "#1663DE", height: "100%" }} />
            </div>
            <div style={{ width: 90, textAlign: "right", fontWeight: 700, fontSize: 14 }}>{n} <span style={{ color: "#a3a3a3", fontWeight: 400 }}>{pct(n, sent)}</span></div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "28px 0 12px" }}>Sequenz-Fortschritt (versandfähige Leads)</h2>
      <table style={tableStyle}>
        <thead><tr style={{ background: "#f5f5f5" }}>{["Schritt", "Leads"].map((h) => (
          <th key={h} style={{ ...td, fontWeight: 700, fontSize: 12, textTransform: "uppercase", color: "#737373" }}>{h}</th>
        ))}</tr></thead>
        <tbody>
          {["0", "1", "2", "3", "4"].map((s) => (
            <tr key={s}>
              <td style={td}>{SEQ_LABEL[s]}</td>
              <td style={{ ...td, fontWeight: 700 }}>{seq[s] || 0}</td>
            </tr>
          ))}
          {Object.keys(seq).length === 0 && <tr><td style={td} colSpan={2}>Noch keine versandfähigen Leads.</td></tr>}
        </tbody>
      </table>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "28px 0 12px" }}>Buckets (welcher Befund antwortet)</h2>
      <table style={tableStyle}>
        <thead><tr style={{ background: "#f5f5f5" }}>{["Bucket", "Leads", "Antworten", "Conversions", "Antwortrate"].map((h) => (
          <th key={h} style={{ ...td, fontWeight: 700, fontSize: 12, textTransform: "uppercase", color: "#737373" }}>{h}</th>
        ))}</tr></thead>
        <tbody>
          {Object.entries(buckets).sort((a, b) => b[1].total - a[1].total).map(([b, v]) => (
            <tr key={b}>
              <td style={td}>{BUCKET_LABEL[b] || b}</td>
              <td style={td}>{v.total}</td>
              <td style={td}>{v.replied}</td>
              <td style={td}>{v.converted}</td>
              <td style={{ ...td, fontWeight: 700, color: "#1663DE" }}>{pct(v.replied, v.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "28px 0 12px" }}>Anreicherung & Status</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 6 }}>
        {Object.entries(enrich).sort((a, b) => b[1] - a[1]).map(([s, n]) => (
          <span key={s} style={chip}><strong>{n}</strong> <span style={{ color: "#737373" }}>{s === "ready_v3" ? "Spiegel-Copy (v3)" : s === "unreachable" ? "ausgeschlossen (nicht erreichbar)" : s}</span></span>
        ))}
        {Object.entries(status).sort((a, b) => b[1] - a[1]).map(([s, n]) => (
          <span key={s} style={chip}><strong>{n}</strong> <span style={{ color: "#737373" }}>{s}</span></span>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "28px 0 12px" }}>Letzte 14 Tage</h2>
      <table style={tableStyle}>
        <thead><tr style={{ background: "#f5f5f5" }}>{["Tag", "Versendet", "Antworten", "Bounces"].map((h) => (
          <th key={h} style={{ ...td, fontWeight: 700, fontSize: 12, textTransform: "uppercase", color: "#737373" }}>{h}</th>
        ))}</tr></thead>
        <tbody>
          {Object.entries(timeline).sort((a, b) => b[0].localeCompare(a[0])).map(([day, t]) => (
            <tr key={day}>
              <td style={td}>{day}</td>
              <td style={td}>{t.sent || 0}</td>
              <td style={td}>{t.reply || 0}</td>
              <td style={td}>{t.bounce || 0}</td>
            </tr>
          ))}
          {Object.keys(timeline).length === 0 && <tr><td style={td} colSpan={4}>Noch keine Events.</td></tr>}
        </tbody>
      </table>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "28px 0 12px" }}>Antworten</h2>
      <table style={tableStyle}>
        <thead><tr style={{ background: "#f5f5f5" }}>{["Wann", "Firma", "E-Mail", "Telefon", "Bucket"].map((h) => (
          <th key={h} style={{ ...td, fontWeight: 700, fontSize: 12, textTransform: "uppercase", color: "#737373" }}>{h}</th>
        ))}</tr></thead>
        <tbody>
          {replies.map((r, i) => (
            <tr key={i}>
              <td style={td}>{r.created_at?.slice(0, 16).replace("T", " ")}</td>
              <td style={td}>{r.company || "—"}</td>
              <td style={td}>{r.email || "—"}</td>
              <td style={td}>{r.phone || "—"}</td>
              <td style={td}>{r.bucket || "—"}</td>
            </tr>
          ))}
          {replies.length === 0 && <tr><td style={td} colSpan={5}>Noch keine Antworten.</td></tr>}
        </tbody>
      </table>
    </>,
  );
}

const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse", background: "#fff", border: "1px solid #ececec", borderRadius: 14, overflow: "hidden" };
const chip: React.CSSProperties = { background: "#fff", border: "1px solid #ececec", borderRadius: 999, padding: "6px 14px", fontSize: 14 };

const td: React.CSSProperties = { padding: "10px 14px", textAlign: "left", borderBottom: "1px solid #f0f0f0", fontSize: 14 };
