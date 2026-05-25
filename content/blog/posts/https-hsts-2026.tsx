import type { Post } from "../types";

export const meta: Post["meta"] = {
  slug: "https-hsts-fortgeschritten-2026",
  title: "HTTPS-Fortgeschritten 2026: HSTS, Certificate Transparency, HTTP/3",
  highlight: "HTTPS",
  excerpt:
    "HTTPS ist Standard. Aber HSTS, Certificate Transparency und HTTP/3 sind 2026 die fortgeschrittenen Hebel für Performance und Sicherheit.",
  description:
    "HTTPS-Fortgeschritten 2026: HSTS, Certificate Transparency, HTTP/3 für Mittelstand. Mit Setup-Anleitungen.",
  date: "2026-02-10",
  readingTime: "6 min",
  category: "Technisches SEO",
  popularity: 45,
  cover: { from: "#0f4cb3", to: "#1663de", label: "HTTPS" },
  keywords: [
    "HTTPS",
    "HSTS",
    "Certificate Transparency",
    "HTTP3",
    "TLS 1.3",
    "Web Security SEO",
    "HSTS Preload",
  ],
  toc: [
    { id: "hsts", label: "HSTS — Erzwungenes HTTPS" },
    { id: "ct", label: "Certificate Transparency" },
    { id: "http3", label: "HTTP/3 — Schneller per Default" },
    { id: "fazit", label: "Fazit" },
  ],
  faq: [
    {
      q: "Brauche ich HSTS wenn ich schon HTTPS habe?",
      a: "Ja. HTTPS allein verhindert keine Downgrade-Angriffe oder SSL-Stripping. HSTS macht den Browser zwangsweise nur HTTPS nutzen — auch beim ersten Besuch nach HSTS-Preload.",
    },
    {
      q: "Was ist HSTS-Preload?",
      a: "Eine Liste im Browser, die deine Domain als HTTPS-only markiert — schon vor dem ersten Besuch. Submission über hstspreload.org. Achtung: schwer reversibel, sollte erst nach 3-6 Monaten stabilem HSTS-Header gemacht werden.",
    },
    {
      q: "Bringt HTTP/3 wirklich Performance?",
      a: "Ja, vor allem auf mobilen Netzen. HTTP/3 nutzt QUIC statt TCP — schnellerer Verbindungsaufbau, bessere Performance bei Paketverlust. 100-300ms Verbesserung im realistischen Mobile-Szenario.",
    },
    {
      q: "Wer bietet HTTP/3?",
      a: "Vercel, Cloudflare, Fastly, Netlify — alle modernen CDN/Edge-Anbieter. Bei klassischem Shared-Hosting selten. Plus-Punkt für moderne Hosting-Stacks.",
    },
  ],
};

export default function Content() {
  return (
    <>
      <p className="lead">
        HTTPS ist 2026 Pflicht-Basis. Aber HSTS, Certificate Transparency
        und HTTP/3 sind die fortgeschrittenen Hebel, die echte Performance-
        und Sicherheitsvorteile bringen. Hier ist, was du wissen musst.
      </p>

      <h2 id="hsts">HSTS — Erzwungenes HTTPS</h2>
      <p>
        HTTP Strict Transport Security (HSTS) sagt dem Browser: „Diese
        Domain ist nur über HTTPS erreichbar". Auch wenn jemand
        versucht, http:// einzugeben, leitet der Browser direkt zu
        https:// um.
      </p>
      <p>
        Header-Setup:
      </p>
      <pre>
        <code>{`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`}</code>
      </pre>
      <p>
        Nach 3-6 Monaten stabilem Header: Preload-Submission über
        hstspreload.org für maximale Sicherheit.
      </p>

      <h2 id="ct">Certificate Transparency</h2>
      <p>
        Certificate Transparency (CT) ist ein öffentliches Log aller
        ausgestellten SSL-Zertifikate. Browser prüfen automatisch, ob
        dein Zertifikat dort gelistet ist.
      </p>
      <p>
        Vorteil: Du erfährst sofort, wenn jemand ein Zertifikat für
        deine Domain ausstellt. Tools wie crt.sh erlauben Monitoring.
        Bei modernen CAs (Let's Encrypt, Cloudflare) automatisch.
      </p>

      <h2 id="http3">HTTP/3 — Schneller per Default</h2>
      <p>
        HTTP/3 nutzt QUIC statt TCP — schnellerer Verbindungsaufbau,
        weniger Latenz, robuster bei Paketverlust (vor allem mobil).
      </p>
      <p>
        Aktivierung: bei modernen CDNs (Cloudflare, Vercel, Fastly) per
        Default oder Toggle aktivierbar. Bei klassischem Hosting oft
        nicht verfügbar.
      </p>

      <h2 id="fazit">Fazit</h2>
      <p>
        HTTPS allein ist 2026 nicht mehr genug. HSTS, Certificate
        Transparency Monitoring und HTTP/3 sind die fortgeschrittenen
        Hebel, die Mittelstand mit modernem Stack automatisch bekommt —
        und die echte Performance- und Sicherheitsvorteile bringen.
      </p>
    </>
  );
}
