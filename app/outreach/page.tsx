/**
 * /outreach — geschütztes KPI-Dashboard für die Cold-Outreach-Engine.
 * Zugriff: ?pw=<OUTREACH_DASHBOARD_PASSWORD> (Login-Maske im WSM-Stil).
 *
 * Strategie v3 (reply-only): kein Tracking-Pixel, kein Link in Mail 1, kein A/B.
 * Gemessen wird, was zählt: Versand, Zustellung, Antworten und der Befund-Freigabe-Loop.
 */
import {
  eventCounts, statusCounts,
  getRepliesWithDetails, eventsByDay, bucketBreakdown, enrichStatusCounts,
  pendingReplyStats, sequenceDistribution, sentTodayByInbox, recentBounceRate,
} from "@/lib/outreach-db";
import { loadInboxes, effectiveCap } from "@/lib/outreach-inboxes";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const C = {
  bg: "#FAFAFA", card: "#FFFFFF", border: "#0A0A0A14", borderStrong: "#0A0A0A29",
  text: "#0A0A0A", muted: "#52525B", subtle: "#71717A",
  blue: "#1663DE", blueSoft: "#1663DE14", gold: "#DB6F16", goldSoft: "#DB6F1614", goldText: "#A85108",
  green: "#15803D", red: "#B42318",
};
const FONT = "var(--font-inter), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif";
const pct = (n: number, d: number) => (d > 0 ? `${((n / d) * 100).toFixed(1)} %` : "—");

function Stat({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: "0 1px 3px rgba(10,10,10,0.03)" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: C.subtle, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: accent || C.text, margin: "8px 0 2px", letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 13, color: C.subtle }}>{sub}</div>}
    </div>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 34 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "0 0 14px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>{title}</h2>
        {hint && <span style={{ fontSize: 13, color: C.subtle }}>{hint}</span>}
      </div>
      {children}
    </section>
  );
}

export default async function OutreachDashboard({
  searchParams,
}: {
  searchParams: Promise<{ pw?: string }>;
}) {
  const { pw } = await searchParams;
  const expected = process.env.OUTREACH_DASHBOARD_PASSWORD;

  // ---------- Login (Stil wie /angebot/login) ----------
  if (!expected || pw !== expected) {
    const wrong = pw !== undefined && pw !== "";
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#e9eaee", padding: "40px 20px", fontFamily: FONT }}>
        <form method="GET" action="/outreach" style={{ width: "100%", maxWidth: 360, background: "#fff", border: "1px solid #e4e4e7", borderRadius: 16, padding: "32px 28px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
          <Logo size={48} withWordmark={false} />
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: "18px 0 4px" }}>Cold-Outreach</h1>
          <p style={{ fontSize: 14, color: "#71717a", margin: "0 0 20px" }}>Interner Bereich — bitte einloggen.</p>
          <input type="password" name="pw" placeholder="Passwort" autoFocus style={{ width: "100%", boxSizing: "border-box", border: "1px solid #d4d4d8", borderRadius: 9, padding: "12px 14px", fontSize: 15, fontFamily: "inherit" }} />
          {wrong && <div style={{ color: "#b42318", fontSize: 13, marginTop: 10 }}>Falsches Passwort.</div>}
          <button type="submit" style={{ width: "100%", marginTop: 16, background: "#1663de", color: "#fff", border: "none", borderRadius: 9, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Einloggen</button>
        </form>
      </main>
    );
  }

  // ---------- Daten ----------
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

  // Heute & Versand-Status
  const sendEnabled = process.env.OUTREACH_SEND_ENABLED === "1";
  const byInbox = await sentTodayByInbox();
  const sentToday = Object.values(byInbox).reduce((a, b) => a + b, 0);
  const inboxes = loadInboxes();
  const capToday = inboxes.reduce((a, ib) => a + effectiveCap(ib), 0);
  const bounceRate = await recentBounceRate();

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

  const handlungsbedarf = befundAwaiting > 0 || replies.length > 0;

  return (
    <main style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT, color: C.text, padding: "36px 24px 80px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Logo size={36} withWordmark={false} />
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>Cold-Outreach</h1>
              <div style={{ fontSize: 13, color: C.subtle }}>{totalProspects} Prospects · {readyToSend} versandfähig · live aus Supabase</div>
            </div>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, padding: "7px 14px", borderRadius: 999, background: sendEnabled ? "#15803D14" : C.goldSoft, color: sendEnabled ? C.green : C.goldText, border: `1px solid ${sendEnabled ? "#15803D29" : "#DB6F1629"}` }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: sendEnabled ? C.green : C.gold, display: "inline-block" }} />
            {sendEnabled ? "Versand aktiv" : "Versand pausiert"}
          </span>
        </div>

        {/* Heute */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginTop: 24 }}>
          <Stat label="Heute gesendet" value={`${sentToday}`} sub={`von ${capToday} Kapazität`} accent={C.blue} />
          <Stat label="Antworten gesamt" value={`${reply}`} sub={`${pct(reply, delivered)} Reply-Rate`} />
          <Stat label="Wartet auf Freigabe" value={`${befundAwaiting}`} sub="Befunde im Telegram-Loop" accent={befundAwaiting > 0 ? C.gold : undefined} />
          <Stat label="Bounce-Quote" value={pct(bounce, sent)} sub={`Kill-Switch bei 10 %`} accent={bounceRate > 0.05 ? C.red : undefined} />
        </div>

        {/* Handlungsbedarf */}
        {handlungsbedarf && (
          <Section title="Handlungsbedarf" hint="das brauchst du jetzt">
            <div style={{ display: "grid", gap: 12 }}>
              {befundAwaiting > 0 && (
                <div style={{ background: C.goldSoft, border: `1px solid #DB6F1629`, borderRadius: 14, padding: "16px 18px", fontSize: 14, color: C.goldText }}>
                  <strong>{befundAwaiting} Befund{befundAwaiting > 1 ? "e" : ""} warte{befundAwaiting > 1 ? "n" : "t"} auf deine Freigabe</strong> — im Telegram-Bot mit Genehmigen / Anpassen / Ablehnen entscheiden.
                </div>
              )}
              {replies.length > 0 && (
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                  <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: C.muted, borderBottom: `1px solid ${C.border}` }}>
                    Neue Antworten — anrufen ({replies.length})
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      {replies.slice(0, 8).map((r, i) => (
                        <tr key={i}>
                          <td style={tdFirst}>{r.created_at?.slice(0, 16).replace("T", " ")}</td>
                          <td style={{ ...td, fontWeight: 600 }}>{r.company || "—"}</td>
                          <td style={td}><a href={`tel:${r.phone || ""}`} style={{ color: C.blue, fontWeight: 700, textDecoration: "none" }}>{r.phone || "—"}</a></td>
                          <td style={{ ...td, color: C.subtle }}>{r.email || "—"}</td>
                          <td style={{ ...td, color: C.subtle }}>{r.bucket || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Funnel */}
        <Section title="Funnel" hint="vom Versand zur Antwort">
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px 22px" }}>
            {funnel.map(([label, n]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 14, margin: "10px 0" }}>
                <div style={{ width: 110, fontSize: 13, color: C.muted, fontWeight: 600 }}>{label}</div>
                <div style={{ flex: 1, background: "#f1f1f3", borderRadius: 999, height: 24, overflow: "hidden" }}>
                  <div style={{ width: `${sent > 0 ? Math.max(2, (n / sent) * 100) : 0}%`, background: `linear-gradient(90deg, ${C.blue}, #4D8EF5)`, height: "100%", borderRadius: 999 }} />
                </div>
                <div style={{ width: 96, textAlign: "right", fontWeight: 800, fontSize: 15 }}>{n} <span style={{ color: C.subtle, fontWeight: 500, fontSize: 13 }}>{pct(n, sent)}</span></div>
              </div>
            ))}
          </div>
        </Section>

        {/* Details in 2 Spalten */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 22, marginTop: 0 }}>
          <Section title="Sequenz-Fortschritt">
            <table style={tableStyle}>
              <tbody>
                {["0", "1", "2", "3", "4"].map((s) => (
                  <tr key={s}>
                    <td style={tdFirst}>{SEQ_LABEL[s]}</td>
                    <td style={{ ...td, textAlign: "right", fontWeight: 800 }}>{seq[s] || 0}</td>
                  </tr>
                ))}
                {Object.keys(seq).length === 0 && <tr><td style={tdFirst} colSpan={2}>Noch keine versandfähigen Leads.</td></tr>}
              </tbody>
            </table>
          </Section>

          <Section title="Befund-Freigabe-Loop">
            <table style={tableStyle}>
              <tbody>
                <tr><td style={tdFirst}>Wartet auf Freigabe</td><td style={{ ...td, textAlign: "right", fontWeight: 800, color: befundAwaiting > 0 ? C.gold : C.text }}>{befundAwaiting}</td></tr>
                <tr><td style={tdFirst}>Genehmigt (geht raus)</td><td style={{ ...td, textAlign: "right", fontWeight: 800 }}>{befundApproved}</td></tr>
                <tr><td style={tdFirst}>Versendet</td><td style={{ ...td, textAlign: "right", fontWeight: 800 }}>{befundSent}</td></tr>
                <tr><td style={tdFirst}>Abgelehnt</td><td style={{ ...td, textAlign: "right", fontWeight: 800 }}>{befundRejected} <span style={{ color: C.subtle, fontWeight: 500, fontSize: 12 }}>({pct(befundSent, befundDecided)} Quote)</span></td></tr>
              </tbody>
            </table>
          </Section>
        </div>

        {/* Buckets */}
        <Section title="Buckets" hint="welcher Befund am besten antwortet">
          <table style={tableStyle}>
            <thead><tr style={{ background: "#f7f7f8" }}>{["Bucket", "Leads", "Antworten", "Conv.", "Rate"].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}</tr></thead>
            <tbody>
              {Object.entries(buckets).sort((a, b) => b[1].total - a[1].total).map(([b, v]) => (
                <tr key={b}>
                  <td style={tdFirst}>{BUCKET_LABEL[b] || b}</td>
                  <td style={td}>{v.total}</td>
                  <td style={td}>{v.replied}</td>
                  <td style={td}>{v.converted}</td>
                  <td style={{ ...td, fontWeight: 800, color: C.blue }}>{pct(v.replied, v.total)}</td>
                </tr>
              ))}
              {Object.keys(buckets).length === 0 && <tr><td style={tdFirst} colSpan={5}>Noch keine Daten.</td></tr>}
            </tbody>
          </table>
        </Section>

        {/* Verlauf */}
        <Section title="Letzte 14 Tage">
          <table style={tableStyle}>
            <thead><tr style={{ background: "#f7f7f8" }}>{["Tag", "Versendet", "Antworten", "Bounces"].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}</tr></thead>
            <tbody>
              {Object.entries(timeline).sort((a, b) => b[0].localeCompare(a[0])).map(([day, t]) => (
                <tr key={day}>
                  <td style={tdFirst}>{day}</td>
                  <td style={td}>{t.sent || 0}</td>
                  <td style={td}>{t.reply || 0}</td>
                  <td style={td}>{t.bounce || 0}</td>
                </tr>
              ))}
              {Object.keys(timeline).length === 0 && <tr><td style={tdFirst} colSpan={4}>Noch keine Events.</td></tr>}
            </tbody>
          </table>
        </Section>

        {/* Anreicherung & Status */}
        <Section title="Anreicherung & Status">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
            {Object.entries(enrich).sort((a, b) => b[1] - a[1]).map(([s, n]) => (
              <span key={s} style={chip}><strong>{n}</strong> <span style={{ color: C.subtle }}>{s === "ready_v3" ? "versandfähig (v3)" : s === "unreachable" ? "ausgeschlossen" : s}</span></span>
            ))}
            {Object.entries(status).sort((a, b) => b[1] - a[1]).map(([s, n]) => (
              <span key={s} style={chip}><strong>{n}</strong> <span style={{ color: C.subtle }}>{s}</span></span>
            ))}
          </div>
        </Section>

      </div>
    </main>
  );
}

const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse", background: "#fff", border: "1px solid #0A0A0A14", borderRadius: 14, overflow: "hidden" };
const chip: React.CSSProperties = { background: "#fff", border: "1px solid #0A0A0A14", borderRadius: 999, padding: "6px 14px", fontSize: 14 };
const th: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "#71717A" };
const td: React.CSSProperties = { padding: "11px 14px", textAlign: "left", borderTop: "1px solid #f0f0f0", fontSize: 14 };
const tdFirst: React.CSSProperties = { ...td, color: "#52525B" };
