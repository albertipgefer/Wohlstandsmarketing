# PageSpeed Insights — 28.05.2026, 13:40

**URL:** https://wohlstandsmarketing.de/
**Lighthouse:** 13.3.0

## Scores

| Kategorie | Desktop | Mobil |
|---|---|---|
| Leistung | **93** | **73** ⚠️ |
| Barrierefreiheit | 88 | 88 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

## Core Web Vitals

| Messwert | Desktop | Mobil |
|---|---|---|
| FCP | 0,5 s | 1,1 s |
| LCP | 1,5 s | **6,6 s** ❌ |
| TBT | 50 ms | 30 ms |
| CLS | 0 | 0 |
| Speed Index | 1,7 s | 5,0 s |

## Diagnose — wichtigste Befunde

### Mobile (kritisch wegen LCP 6,6 s)
- **LCP-Element:** Hero-Foto „albert-portrait.jpg" (Next/Image, w=750)
  - Verzögerung beim Rendering: **1.610 ms**
  - Verzögerung beim Laden: 650 ms
  - **fetchpriority="high" fehlt** auf Preload-Request
- **Bildgröße zu groß** — geliefert 750×795, angezeigt 380×403 → Einsparung 33 KiB
- **Veraltetes JavaScript** — 13,7 KiB Polyfills (Array.at, flat, flatMap, Object.fromEntries, Object.hasOwn, String.trimEnd/trimStart) unnötig für moderne Browser
- **Ungenutztes JavaScript** — 47 KiB (chunks 0m_p1bxtorv5i.js + 0xs_b5zgzw8-r.js)
- **Cache-TTL zu kurz** — Microsoft Clarity (1 Tag) → 10 KiB Einsparung
- **Render-blocking CSS** — chunks/08o8ebtzst~-~.css (14,5 KiB, 190 ms)
- **Hauptthread 2,2 s** belastet (Script Evaluation 898 ms)
- **Vorverbindungen fehlen** — `scripts.clarity.ms` (170 ms LCP-Ersparnis möglich)

### Desktop
- Gleiche Polyfill-/Unused-JS-Themen
- LCP-Element-Rendering-Verzögerung 2.170 ms

## Barrierefreiheit (88) — Fehler

1. **`user-scalable=no` im Viewport** — sperrt Zoom für sehbehinderte Nutzer
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
   ```
2. **Identische Links, unterschiedliche Ziele** — 3× „Erstgespräch sichern →" (Anker #strategie vs. zwei tidycal-Links)
3. **`aria-hidden="true"` mit fokussierbaren Kindern** — Sticky-CTA-Badges (KI-Check + WhatsApp): Hülle ist aria-hidden, enthält aber klickbare `<a>` und `<button>`
4. **Kontrastprobleme** — viele Stellen: Gold-Akzent (`var(--gold)` auf hellem BG), `text-[var(--text-subtle)]` in Tags/Footer, Region-Tags (`RHEIN-LAHN-KREIS`, `MITTELRHEIN` etc.), Blog-Card-Pills (`WEBDESIGN`, `KI-SICHTBARKEIT`), Footer-Sektions-Labels (`SEITE`, `ASSETS`, `KONTAKT`...)

## Best Practices: 100 ✓
## SEO: 100 ✓
