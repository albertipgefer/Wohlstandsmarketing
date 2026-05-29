# SEO-Aktionsplan Wohlstandsmarketing — 28.05.2026

**Quelle:** Seobility-Check + eigener Sichtbarkeits-Check + PageSpeed Insights (Desktop & Mobil)
**Ziel:** Sichtbarkeit pushen — Technik fixen, Content-Substanz aufbauen, Trust + Backlinks ausbauen.

**Detail-Rohdaten:**
- `audits/2026-05-28-seobility.md`
- `audits/2026-05-28-eigener-check.md`
- `audits/2026-05-28-pagespeed.md`

---

## Ampel-Übersicht

| Bereich | Status | Stärkster Hebel |
|---|---|---|
| KI-Crawler / Schema | 🟢 sehr stark | bereits Top — nur halten |
| SEO-Fundament Meta | 🟡 fast vollständig | 2 Descriptions, 1 Title |
| Performance Desktop | 🟢 93 | Feintuning |
| Performance Mobil | 🔴 73 (LCP 6,6 s) | **größter Tech-Hebel** |
| Barrierefreiheit | 🟡 88 | Viewport + Kontrast + ARIA |
| Server/Redirects | 🔴 0 % | www-Redirect kritisch |
| Content-Substanz | 🟡 | Pillar-Cluster aufbauen |
| Backlinks/E-E-A-T | 🔴 9 % | Outreach starten |
| Newsletter/Owned | 🔴 fehlt | Lead-Magnet + Liste |

---

## Phase 1 — Quick Wins (diese Woche, 2–4 h)

Fokus: harte Fehler beseitigen, sofort messbare Score-Sprünge.

### 1.1 www → non-www Redirect (Seobility Critical)
- Vercel: `vercel.json` Redirect oder Domain-Config: `www.wohlstandsmarketing.de` → `wohlstandsmarketing.de` (301)
- Verifikation: `curl -I https://www.wohlstandsmarketing.de/`

### 1.2 Meta-Title kürzen
- Aktuell 632 px, Soll < 580 px
- Vorschlag: **„Wohlstandsmarketing — In 90 Tagen auf Google & ChatGPT"** (ohne „gefunden")
- Datei: `relaunch-next/app/layout.tsx` oder Seiten-Metadata

### 1.3 Meta-Descriptions Impressum + Datenschutz
- Beide aktuell 103 Zeichen → auf 120–170 ausbauen
- Datei: `app/impressum/page.tsx`, `app/datenschutz/page.tsx`

### 1.4 H1 ↔ Body-Text alignen
- H1: „Von unsichtbar zu Nummer 1 innerhalb von 90 Tagen"
- Schlüsselbegriffe (unsichtbar, Nummer 1, 90 Tagen) im ersten Body-Absatz explizit verwenden
- Datei: Startseite-Hero-Sektion

### 1.5 Viewport-Tag fixen (Accessibility)
- `maximum-scale=1, user-scalable=no` entfernen
- Neu: `<meta name="viewport" content="width=device-width, initial-scale=1">`

### 1.6 Apple Touch Icon
- `public/apple-touch-icon.png` (180×180) hinzufügen, `<link rel="apple-touch-icon">` in `<head>`

---

## Phase 2 — Performance Mobil (nächste 1–2 Wochen)

Ziel: Mobil-LCP von **6,6 s → < 2,5 s**, Score 73 → 90+.

### 2.1 Hero-Bild Albert optimieren (größter Einzelhebel)
- `priority` + `fetchPriority="high"` auf das `<Image>` der Startseite
- `sizes`-Attribut präziser: aktuell `(max-width: 768px) 100vw, 540px` → auf reale Mobile-Anzeigegröße (380×403) zuschneiden
- Preload-Hint `<link rel="preload" as="image" fetchpriority="high">` im `<head>` (Next 16 Metadata API)
- AVIF/WebP-Variante prüfen
- **Erwartete Ersparnis:** 33 KiB + ~1,6 s LCP-Rendering-Delay

### 2.2 Polyfills abschalten
- Next.js 16: Browserslist auf moderne Targets (`> 0.5%, not dead, not op_mini all, supports es6-module`) setzen
- Datei: `.browserslistrc` oder `package.json`
- **Ersparnis:** 14 KiB JS

### 2.3 Ungenutztes JavaScript reduzieren
- Bundle-Analyzer (`@next/bundle-analyzer`) gegen Chunks `0m_p1bxtorv5i.js` (70 KiB) + `0xs_b5zgzw8-r.js` (48 KiB)
- Dynamic Imports für Below-the-Fold-Komponenten (Sticky-CTA, WhatsApp-Bubble, Footer-Slider)
- **Ersparnis:** ~47 KiB

### 2.4 Microsoft Clarity entschärfen
- `<link rel="preconnect" href="https://scripts.clarity.ms">` in `<head>` → spart 170 ms LCP
- Clarity-Script erst nach User-Interaction oder `requestIdleCallback` laden
- Alternative: in Production prüfen, ob Clarity überhaupt noch nötig (Doppelung mit Google Analytics?)

### 2.5 Render-Blocking CSS
- Critical CSS inlinen (Next 16 macht das teils automatisch — prüfen `experimental.optimizeCss`)
- CSS-Chunk `08o8ebtzst~-~.css` ist 14,5 KiB → ggf. Tailwind-Purge prüfen

---

## Phase 3 — Barrierefreiheit & Saubere Markup (1 Woche)

Ziel: A11y 88 → 95+.

### 3.1 Sticky-CTAs ARIA fixen
- `aria-hidden="true"` darf keine fokussierbaren Elemente enthalten
- Lösung: entweder `aria-hidden` weg + Element wirklich verstecken (`tabindex="-1"`, `inert`), oder Markup-Struktur entkoppeln
- Betroffen: KI-Check-Sticky + WhatsApp-Sticky

### 3.2 Duplikate-Anchor-Text-Probleme
- 3× „Erstgespräch sichern →" mit verschiedenen Zielen
- Lösung: Anchor-Text variieren oder per `aria-label` differenzieren („Erstgespräch online buchen", „Zur Strategie-Sektion springen")

### 3.3 Kontrast-Audit
- `var(--gold)` auf hellem BG (Section-Labels „03·DAS PROBLEM", „08·ÜBER MICH", „Neu") → WCAG-AA 4,5:1 testen
- `var(--text-subtle)` in Tags, Datumsangaben, Footer-Labels
- Region-Tags `RHEIN-LAHN-KREIS` etc. auf hellem Hintergrund
- Tool: Chrome DevTools Lighthouse → Accessibility → Contrast oder Stark-Plugin
- Voraussichtlich: 1 Token-Anpassung in `globals.css` löst die meisten Fälle gleichzeitig

---

## Phase 4 — Content-Cluster (laufend, 4–8 Wochen)

Ziel: Sichtbarkeit organisch steigern, Top-Hebel laut eigenem Tool.

### 4.1 Pillar-Page-Strategie
Pro Money-Keyword aus `MONEY-KEYWORD-CLUSTER.md`:
- 1 Pillar-Artikel (2.500–4.000 Wörter, alles abdeckend)
- 5–10 Cluster-Artikel (800–1.500 Wörter, spezifische Long-Tails)
- Interne Verlinkung: Pillar ↔ alle Cluster, Cluster ↔ relevante andere Cluster

### 4.2 Vorhandene 14 Blog-Artikel zu Clustern verdichten
- Stand: 50 Blog-Routen geplant (laut Memory) — aktuell 14+ live
- Themen-Cluster bilden: Webdesign, KI-Sichtbarkeit, SEO, Branchen (Coaches/Caterer/Eventlocations/Hochzeitsfotografen)
- Jeden bestehenden Artikel: 3–5 interne Links zu thematisch nahen Artikeln

### 4.3 Standort-Pages stärker mit Blog verlinken
- 6 Stadt-Pages (Bad Ems, Koblenz, Montabaur, Frankfurt, Bonn, Köln) → je 2–3 thematisch passende Blog-Links

### 4.4 H1-Heading-Ratio optimieren
- 44 Headings auf 2.090 Wörter ist viel — auf der Startseite weniger H2/H3-Sprünge, mehr Fließtext zwischen den Sektionen

---

## Phase 5 — Newsletter-Funnel (2 Wochen Setup, dann laufend)

Ziel: Owned Channel aufbauen (einziger Kanal, der dir gehört).

### 5.1 Lead-Magnet
- Vorschlag-Optionen:
  - „Der 5-Minuten-KI-Sichtbarkeits-Check" (PDF mit Checkliste)
  - „90-Tage-Roadmap: Vom unsichtbaren zum gefundenen Unternehmen"
  - „Webdesign-Kosten 2026 — der ehrliche Preis-Guide" (aus Blog destilliert)

### 5.2 Infrastruktur
- Resend (bereits live für Customer Portal) → Mailing-Liste
- Double-Opt-In-Flow + Datenschutzkonformität
- Landing-Page `/newsletter` oder Inline-Form im Blog-Footer

### 5.3 Content-Rhythmus
- 1× pro Woche kurze Mail (max. 5 Min Lesezeit)
- Verteilung: 60 % Tipps, 30 % neue Blog-Artikel, 10 % Angebot

---

## Phase 6 — Backlink-Outreach (laufend, je Quartal)

Ziel: 5–10 hochwertige Backlinks/Quartal aus Branche oder lokal.

### 6.1 Lokale Verzeichnisse (Quick Wins)
- IHK Koblenz, Wirtschaftsförderung Rhein-Lahn-Kreis, Stadt Bad Ems Unternehmensliste
- Branchenverzeichnisse: handwerk.de (für die Handwerker-Zielgruppe), gelbe Seiten, Cylex

### 6.2 Gastartikel-Outreach
- B2B-Marketing-Blogs (OMR, t3n-Pioneer, hubspot.de) — Pitch zu „KI-Sichtbarkeit für lokalen Mittelstand"
- Branchen-Magazine je ICP (Hochzeitsmagazine, Coaching-Plattformen, Eventlocation-Verbände)

### 6.3 Kunden-Backlinks
- Bestandskunden (Holzmann, Weber, Bull & Bear, Noma Beach) → Case-Studies auf wohlstandsmarketing.de, Kunde verlinkt im Footer/Impressum zurück

### 6.4 Podcast-Pitches
- Lokale + Branchen-Podcasts: Albert als Gast → Shownotes-Link

---

## Phase 7 — Monitoring & Hygiene (laufend)

- **PageSpeed Insights** wöchentlich (Mobil-Score + LCP)
- **Search Console** wöchentlich (Impressions, CTR, neue Queries, Crawl-Fehler)
- **Eigener Sichtbarkeits-Check** monatlich gegen sich selbst
- **Seobility** monatlich Re-Check der To-Do-Liste
- **Backlink-Tracking** (z. B. Ubersuggest Free oder ahrefs-Webmaster-Tools) monatlich

---

## Reihenfolge der Umsetzung (Empfehlung)

1. **Heute/morgen:** Phase 1 (Quick Wins) — alle 6 Items, 2–4 h Arbeit
2. **KW 22–23:** Phase 2 (Performance Mobil) — größter Score-Sprung
3. **KW 23–24:** Phase 3 (Barrierefreiheit)
4. **KW 23 startend, laufend:** Phase 4 (Content) + Phase 6 (Backlinks)
5. **KW 24–25:** Phase 5 (Newsletter-Setup)
6. **Ab KW 25:** Phase 7 (Monitoring-Rhythmus etablieren)

---

## Realistische Score-Prognose nach Phase 1 + 2

| Metrik | Vorher | Nach P1+P2 |
|---|---|---|
| Seobility On-page | 63 % | 80–85 % |
| PageSpeed Mobil | 73 | 90+ |
| LCP Mobil | 6,6 s | < 2,5 s |
| Eigener Check Performance | 15/25 | 22/25 |
| Eigener Check SEO-Fundament | 20/25 | 24/25 |
