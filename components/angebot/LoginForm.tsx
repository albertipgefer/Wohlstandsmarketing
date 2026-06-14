"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function LoginForm() {
  const router = useRouter();
  const [stage, setStage] = useState<"pw" | "code">("pw");
  const [pw, setPw] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submitPw(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/angebot/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok) {
        router.replace("/finanzen");
        router.refresh();
        return;
      }
      if (data.twofa) {
        setStage("code");
        setBusy(false);
        return;
      }
      setErr(data.error === "twofa_send_failed" ? "2FA-Code konnte nicht gesendet werden. Bitte erneut versuchen." : "Falsches Passwort.");
      setBusy(false);
    } catch {
      setErr("Fehler. Bitte erneut versuchen.");
      setBusy(false);
    }
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/angebot/login/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok) {
        router.replace("/finanzen");
        router.refresh();
        return;
      }
      if (data.error === "expired" || data.error === "too_many") {
        setErr("Code abgelaufen oder zu viele Versuche. Bitte neu einloggen.");
        setStage("pw");
        setCode("");
        setBusy(false);
        return;
      }
      setErr("Falscher Code.");
      setBusy(false);
    } catch {
      setErr("Fehler. Bitte erneut versuchen.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={stage === "pw" ? submitPw : submitCode} style={S.form}>
      <Logo size={48} withWordmark={false} />
      <h1 style={S.h1}>Finanzen</h1>
      {stage === "pw" ? (
        <>
          <p style={S.sub}>Interner Bereich — bitte einloggen.</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Passwort"
            autoFocus
            style={S.input}
          />
          {err && <div style={S.err}>{err}</div>}
          <button type="submit" disabled={busy || !pw} style={S.btn}>
            {busy ? "…" : "Einloggen"}
          </button>
        </>
      ) : (
        <>
          <p style={S.sub}>Wir haben dir einen 8-stelligen Code per Telegram geschickt. Gültig 5 Minuten.</p>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
            placeholder="Code aus Telegram"
            autoFocus
            style={{ ...S.input, letterSpacing: "0.3em", textAlign: "center", fontSize: 20 }}
          />
          {err && <div style={S.err}>{err}</div>}
          <button type="submit" disabled={busy || code.length < 8} style={S.btn}>
            {busy ? "…" : "Bestätigen"}
          </button>
          <button
            type="button"
            onClick={() => { setStage("pw"); setCode(""); setErr(""); }}
            style={S.back}
          >
            ← Zurück
          </button>
        </>
      )}
    </form>
  );
}

const S: Record<string, React.CSSProperties> = {
  form: {
    width: "100%",
    maxWidth: 360,
    background: "#fff",
    border: "1px solid #e4e4e7",
    borderRadius: 16,
    padding: "32px 28px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
  },
  brand: { fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px" },
  h1: { fontSize: 26, fontWeight: 800, margin: "18px 0 4px" },
  sub: { fontSize: 14, color: "#71717a", margin: "0 0 20px" },
  input: {
    width: "100%",
    border: "1px solid #d4d4d8",
    borderRadius: 9,
    padding: "12px 14px",
    fontSize: 15,
    fontFamily: "inherit",
  },
  err: { color: "#b42318", fontSize: 13, marginTop: 10 },
  btn: {
    width: "100%",
    marginTop: 16,
    background: "#1663de",
    color: "#fff",
    border: "none",
    borderRadius: 9,
    padding: "12px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  back: {
    width: "100%",
    marginTop: 10,
    background: "none",
    color: "#71717a",
    border: "none",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
};
