import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Wohlstandsmarketing — In 90 Tagen auf Google & ChatGPT gefunden";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #fafafa 0%, #ffffff 60%, #eef4ff 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#1663de",
              color: "white",
              fontSize: 32,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 -4px 8px rgba(0,0,0,0.18)",
            }}
          >
            W
          </div>
          <span
            style={{ fontSize: 22, fontWeight: 600, color: "#0a0a0a" }}
          >
            Wohlstandsmarketing
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#1663de",
              marginBottom: 18,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Die WSM-Methode
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: "#0a0a0a",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            Von unsichtbar zu Nummer 1 — innerhalb von 90 Tagen.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 22, color: "#52525b" }}>
            Webdesign + KI-Sichtbarkeit für DACH-Mittelstand
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "white",
              background: "#0a0a0a",
              padding: "12px 24px",
              borderRadius: 999,
            }}
          >
            Erstgespräch sichern →
          </span>
        </div>
      </div>
    ),
    size
  );
}
