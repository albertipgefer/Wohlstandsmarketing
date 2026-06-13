"use client";
/**
 * KI-Assistent-Karte auf dem Start-Dashboard (Accountable-Stil "KI Steuerberater").
 * Phase 1: vollständige UI + Chat-Verlauf gegen /api/finanzen/ki. Solange das
 * Backend (Phase 4) bzw. der ANTHROPIC_API_KEY fehlt, zeigt die Karte eine
 * freundliche "bald verfügbar"-Antwort statt eines Fehlers.
 */
import { useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const VORSCHLAEGE = [
  "Wie viel Umsatz habe ich dieses Jahr schon gemacht?",
  "Welche Rechnungen sind überfällig?",
  "Wer ist mein umsatzstärkster Kunde?",
  "Wie viel sollte ich für Steuern zurücklegen?",
];

export default function KiAssistentCard() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    const frage = text.trim();
    if (!frage || busy) return;
    setInput("");
    const next = [...msgs, { role: "user" as const, content: frage }];
    setMsgs(next);
    setBusy(true);
    try {
      const res = await fetch("/api/finanzen/ki", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setMsgs((m) => [...m, { role: "assistant", content: data.reply || "—" }]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Der KI-Assistent wird in Kürze freigeschaltet (Anbindung in Arbeit). Dann beantworte ich dir alles über deine Zahlen, Rechnungen, Ausgaben und Steuern.",
        },
      ]);
    } finally {
      setBusy(false);
      requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: 9e9 }));
    }
  }

  return (
    <div style={S.card}>
      <div style={S.head}>
        <span style={S.headTitle}>✨ KI-Assistent</span>
      </div>

      <div ref={scrollRef} style={S.body}>
        {msgs.length === 0 ? (
          <div style={S.intro}>
            <div style={S.introTitle}>Ich bin deine Finanz-KI!</div>
            <p style={S.introText}>
              Frag mich alles. Ich kenne deine Rechnungen, Ausgaben, Kunden und Zahlen —
              und helfe dir, den Überblick zu behalten.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={m.role === "user" ? S.bubbleUser : S.bubbleAi}>
                {m.content}
              </div>
            ))}
            {busy && <div style={S.bubbleAi}>…</div>}
          </div>
        )}
      </div>

      {msgs.length === 0 && (
        <div style={S.chips}>
          {VORSCHLAEGE.slice(0, 2).map((v) => (
            <button key={v} onClick={() => send(v)} style={S.chip}>{v}</button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        style={S.inputRow}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Stelle eine Frage zu deinen Zahlen …"
          style={S.input}
          disabled={busy}
        />
        <button type="submit" disabled={busy || !input.trim()} style={S.sendBtn} aria-label="Senden">↑</button>
      </form>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  card: { background: "#fff", border: "1px solid #ececf0", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", minHeight: 420, height: "100%" },
  head: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  headTitle: { fontSize: 14, fontWeight: 700, color: "#27272a" },
  body: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 4px" },
  intro: { textAlign: "center", padding: "12px 8px" },
  introTitle: { fontSize: 18, fontWeight: 800, background: "linear-gradient(90deg,#6d28d9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 },
  introText: { fontSize: 13.5, color: "#71717a", lineHeight: 1.5, margin: 0 },
  bubbleUser: { alignSelf: "flex-end", maxWidth: "85%", background: "#1663de", color: "#fff", padding: "8px 12px", borderRadius: "12px 12px 2px 12px", fontSize: 13.5, lineHeight: 1.45, whiteSpace: "pre-wrap" },
  bubbleAi: { alignSelf: "flex-start", maxWidth: "90%", background: "#f4f4f5", color: "#27272a", padding: "8px 12px", borderRadius: "12px 12px 12px 2px", fontSize: 13.5, lineHeight: 1.45, whiteSpace: "pre-wrap" },
  chips: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 },
  chip: { textAlign: "left", background: "#faf5ff", border: "1px solid #f0e6ff", borderRadius: 10, padding: "8px 11px", fontSize: 12.5, color: "#6d28d9", cursor: "pointer", fontWeight: 500 },
  inputRow: { display: "flex", gap: 8, alignItems: "center", borderTop: "1px solid #f0f0f2", paddingTop: 12 },
  input: { flex: 1, border: "1px solid #e4e4e7", borderRadius: 10, padding: "10px 12px", fontSize: 13.5, outline: "none" },
  sendBtn: { width: 38, height: 38, borderRadius: 10, border: "none", background: "#1663de", color: "#fff", fontSize: 17, fontWeight: 700, cursor: "pointer", flexShrink: 0 },
};
