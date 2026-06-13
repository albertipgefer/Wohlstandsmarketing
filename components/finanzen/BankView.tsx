"use client";
/**
 * Bank-Ansicht: Konto verbinden (N26 via GoCardless), synchronisieren, Umsätze
 * klassifizieren und mit Rechnungen/Ausgaben abgleichen.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";

export type KontoLite = { id: string; iban: string | null; name: string | null; status: string; last_sync: string | null; consent_expires_at: string | null };
export type TxLite = { id: string; datum: string | null; betrag: number; gegenname: string | null; verwendungszweck: string | null; richtung: string | null; klassifiziert_als: string | null };
export type OffeneRechnung = { id: string; nummer: string | null; kunde: string; brutto: number };

const eur = (n: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n || 0);
const deDate = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("de-DE") : "—");

export default function BankView({ gcReady, konten, transaktionen, offene }: { gcReady: boolean; konten: KontoLite[]; transaktionen: TxLite[]; offene: OffeneRechnung[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [matchSel, setMatchSel] = useState<Record<string, string>>({});

  async function verbinden() {
    setBusy(true); setMsg("");
    try {
      const r = await fetch("/api/finanzen/bank/connect", { method: "POST" });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok && data.link) { window.location.href = data.link; return; }
      setMsg(data.error === "gocardless_keys_fehlen" ? "GoCardless-Keys fehlen noch (GOCARDLESS_SECRET_ID/_KEY)." : (data.error || "Verbinden fehlgeschlagen."));
    } catch { setMsg("Netzwerkfehler."); }
    setBusy(false);
  }

  async function sync(kontoId: string) {
    setBusy(true); setMsg("");
    try {
      const r = await fetch("/api/finanzen/bank/sync", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kontoId }) });
      const data = await r.json().catch(() => ({}));
      setMsg(data.ok ? `Synchronisiert: ${data.neu ?? 0} Umsätze geprüft.` : `Sync-Problem: ${data.fehler || "unbekannt"}`);
      router.refresh();
    } catch { setMsg("Netzwerkfehler."); }
    setBusy(false);
  }

  async function classify(txId: string, als: string, rechnungId?: string) {
    setBusy(true); setMsg("");
    try {
      await fetch("/api/finanzen/bank/classify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ txId, als, rechnungId }) });
      router.refresh();
    } catch { setMsg("Netzwerkfehler."); }
    setBusy(false);
  }

  const konto = konten[0];

  return (
    <>
      {!gcReady && (
        <div style={S.warn}>
          ⚠️ Bank-Anbindung noch nicht aktiv: Hinterlege <code>GOCARDLESS_SECRET_ID</code> und <code>GOCARDLESS_SECRET_KEY</code> in den Vercel-Env-Vars,
          dann kannst du dein N26-Konto verbinden.
        </div>
      )}

      {!konto ? (
        <div style={S.connectCard}>
          <div style={{ fontSize: 30, marginBottom: 8 }}>🏦</div>
          <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>N26-Konto verbinden</div>
          <p style={{ fontSize: 14, color: "#71717a", maxWidth: 460, margin: "0 auto 16px", lineHeight: 1.55 }}>
            Verbinde dein N26-Konto sicher über GoCardless (PSD2). Danach erscheinen deine Umsätze hier und du gleichst sie
            mit Rechnungen und Ausgaben ab. Die Freigabe gilt 90 Tage.
          </p>
          <button onClick={verbinden} disabled={busy || !gcReady} style={btnPrimary}>{busy ? "…" : "Konto verbinden"}</button>
        </div>
      ) : (
        <div style={S.kontoBar}>
          <div>
            <div style={{ fontWeight: 700 }}>{konto.name || "N26"} {konto.iban ? `· ${konto.iban}` : ""}</div>
            <div style={{ fontSize: 12.5, color: "#a1a1aa" }}>
              Status: {konto.status} · Letzter Sync: {konto.last_sync ? deDate(konto.last_sync) : "—"}
              {konto.consent_expires_at ? ` · Freigabe bis ${deDate(konto.consent_expires_at)}` : ""}
            </div>
          </div>
          <button onClick={() => sync(konto.id)} disabled={busy} style={btnPrimary}>{busy ? "…" : "↻ Jetzt synchronisieren"}</button>
        </div>
      )}

      {msg && <div style={{ fontSize: 13.5, color: "#3f3f46", margin: "12px 0" }}>{msg}</div>}

      {transaktionen.length > 0 && (
        <div className="fin-table-wrap" style={{ marginTop: 16 }}>
          <table style={S.table}>
            <thead><tr>{["Datum", "Gegenseite", "Verwendungszweck", "Betrag", "Status / Aktion"].map((h) => (<th key={h} style={S.th}>{h}</th>))}</tr></thead>
            <tbody>
              {transaktionen.map((t) => {
                const eingang = t.betrag >= 0;
                const offenStatus = !t.klassifiziert_als || t.klassifiziert_als === "offen";
                return (
                  <tr key={t.id} style={S.tr}>
                    <td style={S.td}>{deDate(t.datum)}</td>
                    <td style={S.td}>{t.gegenname || "—"}</td>
                    <td style={{ ...S.td, maxWidth: 260, color: "#71717a", fontSize: 13 }}>{t.verwendungszweck || "—"}</td>
                    <td style={{ ...S.td, fontWeight: 700, color: eingang ? "#027a48" : "#b42318", whiteSpace: "nowrap" }}>{eingang ? "+" : ""}{eur(t.betrag)}</td>
                    <td style={S.td}>
                      {!offenStatus ? (
                        <span style={{ ...S.badge, background: "#ecfdf3", color: "#027a48" }}>{labelOf(t.klassifiziert_als!)}</span>
                      ) : eingang ? (
                        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                          <select value={matchSel[t.id] || ""} onChange={(e) => setMatchSel((m) => ({ ...m, [t.id]: e.target.value }))} style={S.select}>
                            <option value="">Rechnung zuordnen …</option>
                            {offene.map((o) => <option key={o.id} value={o.id}>{o.nummer || "Entwurf"} · {o.kunde} · {eur(o.brutto)}</option>)}
                          </select>
                          <button onClick={() => classify(t.id, "einnahme", matchSel[t.id])} disabled={busy || !matchSel[t.id]} style={S.miniBtn}>✓ bezahlt</button>
                          <button onClick={() => classify(t.id, "privat")} disabled={busy} style={S.miniGhost}>privat</button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          <button onClick={() => classify(t.id, "ausgabe")} disabled={busy} style={S.miniBtn}>→ als Ausgabe</button>
                          <button onClick={() => classify(t.id, "privat")} disabled={busy} style={S.miniGhost}>privat</button>
                          <button onClick={() => classify(t.id, "ignoriert")} disabled={busy} style={S.miniGhost}>ignorieren</button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function labelOf(k: string): string {
  return ({ einnahme: "Einnahme ✓", ausgabe: "Ausgabe ✓", privat: "Privat", ignoriert: "Ignoriert" } as Record<string, string>)[k] || k;
}

const S: Record<string, React.CSSProperties> = {
  warn: { background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", borderRadius: 10, padding: "12px 16px", fontSize: 13.5, marginBottom: 18, lineHeight: 1.5 },
  connectCard: { background: "#fff", border: "1px solid #ececf0", borderRadius: 16, padding: "44px 28px", textAlign: "center" },
  kontoBar: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#737373", background: "#f9fafb", borderBottom: "1px solid #f0f0f0" },
  tr: { borderBottom: "1px solid #f4f4f5" },
  td: { padding: "13px 16px", fontSize: 14, verticalAlign: "middle" },
  badge: { display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 },
  select: { border: "1px solid #d4d4d8", borderRadius: 8, padding: "6px 9px", fontSize: 13, fontFamily: "inherit", maxWidth: 220 },
  miniBtn: { background: "#1663de", color: "#fff", border: "none", borderRadius: 8, padding: "6px 11px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" },
  miniGhost: { background: "#fff", border: "1px solid #d4d4d8", borderRadius: 8, padding: "6px 11px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: "#52525b" },
};
const btnPrimary: React.CSSProperties = { background: "#1663de", color: "#fff", border: "none", borderRadius: 9, padding: "11px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" };
