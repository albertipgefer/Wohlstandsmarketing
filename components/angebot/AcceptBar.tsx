"use client";

import { useState } from "react";

export default function AcceptBar({
  token,
  accepted,
  acceptName,
}: {
  token: string;
  accepted: boolean;
  acceptName?: string | null;
}) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(accepted);
  const [doneName, setDoneName] = useState(acceptName || "");
  const [err, setErr] = useState("");

  async function accept() {
    if (name.trim().length < 2) return setErr("Bitte Ihren Namen eintragen.");
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/angebot/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, name: name.trim() }),
      });
      const j = await r.json();
      if (r.ok && j.ok) {
        setDoneName(name.trim());
        setDone(true);
      } else {
        setErr("Das hat nicht geklappt. Bitte später erneut versuchen.");
        setBusy(false);
      }
    } catch {
      setErr("Verbindungsfehler. Bitte erneut versuchen.");
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div style={{ ...S.card, borderColor: "#a6f4c5", background: "#f6fef9" }}>
        <div style={S.okTitle}>✓ Angebot angenommen</div>
        <p style={S.okText}>
          Vielen Dank{doneName ? `, ${doneName}` : ""}! Wir haben Ihre Zusage erhalten und melden uns
          in Kürze mit den nächsten Schritten. Eine Bestätigung ist per E-Mail unterwegs.
        </p>
      </div>
    );
  }

  return (
    <div style={S.card}>
      <div style={S.title}>Angebot annehmen</div>
      <p style={S.text}>
        Mit Klick auf „Angebot verbindlich annehmen" bestätigen Sie die Annahme dieses Angebots zu den
        genannten Konditionen.
      </p>
      <div style={S.row}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ihr vollständiger Name"
          style={S.input}
        />
        <button onClick={accept} disabled={busy} style={S.btn}>
          {busy ? "…" : "Angebot verbindlich annehmen"}
        </button>
      </div>
      {err && <div style={S.err}>{err}</div>}
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  card: { background: "#fff", border: "1px solid #e4e4e7", borderRadius: 16, padding: "22px 24px", maxWidth: "210mm", width: "100%", margin: "18px auto 0", boxShadow: "0 6px 30px rgba(0,0,0,0.06)" },
  title: { fontSize: 18, fontWeight: 800, marginBottom: 6 },
  text: { fontSize: 14, color: "#52525b", lineHeight: 1.5, margin: "0 0 14px" },
  row: { display: "flex", gap: 10, flexWrap: "wrap" },
  input: { flex: "1 1 240px", border: "1px solid #d4d4d8", borderRadius: 9, padding: "12px 14px", fontSize: 15, fontFamily: "inherit" },
  btn: { background: "#1663de", color: "#fff", border: "none", borderRadius: 9, padding: "12px 22px", fontSize: 15, fontWeight: 700, cursor: "pointer" },
  err: { color: "#b42318", fontSize: 13, marginTop: 10 },
  okTitle: { fontSize: 18, fontWeight: 800, color: "#027a48" },
  okText: { fontSize: 14, color: "#3f3f46", lineHeight: 1.55, margin: "8px 0 0" },
};
