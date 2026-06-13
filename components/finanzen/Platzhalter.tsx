/** Schlichte "kommt bald"-Karte für noch nicht ausgebaute Finanz-Bereiche. */
export default function Platzhalter({ titel, text }: { titel: string; text: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "44px 28px", textAlign: "center" }}>
      <div style={{ fontSize: 30, marginBottom: 10 }}>🛠️</div>
      <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>{titel}</div>
      <p style={{ fontSize: 14.5, color: "#71717a", margin: "0 auto", maxWidth: 460, lineHeight: 1.55 }}>{text}</p>
    </div>
  );
}
