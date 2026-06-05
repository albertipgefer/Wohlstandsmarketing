/**
 * /outreach — geschütztes KPI-Dashboard für die Cold-Outreach-Engine.
 * Zugriff: ?pw=<OUTREACH_DASHBOARD_PASSWORD>. Liest live aus Supabase.
 * Bewusst keine Open-Rate (zustellungs-schonendes Tracking).
 */
import { eventCounts, statusCounts } from "@/lib/outreach-db";

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

  const { byType, byArm } = await eventCounts();
  const status = await statusCounts();
  const sent = byType.sent || 0;
  const bounce = byType.bounce || 0;
  const delivered = Math.max(0, sent - bounce);
  const click = byType.click || 0;
  const reply = byType.reply || 0;
  const conv = byType.conversion || 0;
  const unsub = byType.unsubscribe || 0;
  const totalProspects = Object.values(status).reduce((a, b) => a + b, 0);

  const armRow = (arm: "link" | "reply") => {
    const a = byArm[arm] || {};
    const s = a.sent || 0;
    const qualified = (a.reply || 0) + (a.conversion || 0);
    return (
      <tr key={arm}>
        <td style={td}>{arm === "link" ? "Direkter Link" : "Reply-CTA"}</td>
        <td style={td}>{s}</td>
        <td style={td}>{a.click || 0}</td>
        <td style={td}>{a.reply || 0}</td>
        <td style={td}>{a.conversion || 0}</td>
        <td style={{ ...td, fontWeight: 700, color: "#1663DE" }}>{pct(qualified, s)}</td>
      </tr>
    );
  };

  return shell(
    <>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px" }}>Cold-Outreach — Dashboard</h1>
      <p style={{ fontSize: 14, color: "#737373", margin: "0 0 28px" }}>
        {totalProspects} Prospects · live aus Supabase · zustellungs-schonendes Tracking (keine Open-Rate)
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 14 }}>
        <Card label="Versendet" value={String(sent)} />
        <Card label="Zugestellt" value={String(delivered)} sub={`Bounce ${pct(bounce, sent)}`} />
        <Card label="Klicks" value={String(click)} sub={`${pct(click, delivered)} der Zustellungen`} />
        <Card label="Antworten" value={String(reply)} sub={`${pct(reply, delivered)} Reply-Rate`} />
        <Card label="KI-Checks" value={String(conv)} sub={`${pct(conv, delivered)} Conversion`} />
        <Card label="Abmeldungen" value={String(unsub)} sub={`${pct(unsub, delivered)}`} />
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "28px 0 12px" }}>A/B — qualifizierte Reaktion (Reply + Conversion)</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", border: "1px solid #ececec", borderRadius: 14, overflow: "hidden" }}>
        <thead><tr style={{ background: "#f5f5f5" }}>
          {["Arm", "Versendet", "Klicks", "Antworten", "KI-Checks", "Quote"].map((h) => (
            <th key={h} style={{ ...td, fontWeight: 700, fontSize: 12, textTransform: "uppercase", color: "#737373" }}>{h}</th>
          ))}
        </tr></thead>
        <tbody>{armRow("link")}{armRow("reply")}</tbody>
      </table>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "28px 0 12px" }}>Prospect-Status</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {Object.entries(status).sort((a, b) => b[1] - a[1]).map(([s, n]) => (
          <span key={s} style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 999, padding: "6px 14px", fontSize: 14 }}>
            <strong>{n}</strong> <span style={{ color: "#737373" }}>{s}</span>
          </span>
        ))}
      </div>
    </>,
  );
}

const td: React.CSSProperties = { padding: "10px 14px", textAlign: "left", borderBottom: "1px solid #f0f0f0", fontSize: 14 };
