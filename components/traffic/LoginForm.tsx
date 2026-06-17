"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function LoginForm() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/analytics/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (r.ok) {
        router.replace("/analytics");
        router.refresh();
      } else {
        setErr("Falsches Passwort.");
        setBusy(false);
      }
    } catch {
      setErr("Fehler. Bitte erneut versuchen.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} style={S.form}>
      <Logo size={48} withWordmark={false} />
      <h1 style={S.h1}>WSM Traffic</h1>
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
};
