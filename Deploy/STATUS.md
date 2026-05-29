# start-wsm — Mini-App für die Wohlstandsmarketing-Treppe

**Subdomain:** `start.wohlstandsmarketing.de`
**Letzte Aktualisierung:** 2026-05-28 (Session-Ende)

## Was das ist

Mobile-First Next-16-Mini-App mit **Bio-Landing-Page** + **5 Produkt-Verkaufsseiten** für die Wohlstandsmarketing-Treppe (Phase 1–5). Wird via TikTok/Instagram-Bio verlinkt, jeder CTA führt später auf die Digistore-Checkouts der jeweiligen Produkte.

## Stack

- Next.js 16.2.6 (App Router, gleiche Version wie WSM-Relaunch)
- Tailwind v4 (1:1 globals.css aus `Webseite/relaunch-next/`)
- Framer-Motion 12 (Fade-Up + Stagger Animationen)
- WSM-CI: Inter + Playfair, `#1663de` (Accent) + `#db6f16` (Gold), Light-Mode

## Routes (alle prerendered, statisch)

| Route | Inhalt |
|---|---|
| `/` | Bio-Page: Hero (Foto + Tagline) → 5 Produkt-Karten → Strategiegespräch-CTA (49 €) → Footer |
| `/wohlstands-guide` | Phase 1 · 5 € · Dein Wohlstands-Guide 2026 |
| `/ki-webseite` | Phase 2 · 19 € · Deine erste KI-Webseite |
| `/3-testkunden` | Phase 3 · 27 € · Deine ersten 3 Testkunden |
| `/1000-euro-kunde` | Phase 4 · 49 € · Dein erster 1.000-€-Kunde |
| `/onboarding-delivery` | Phase 5 · 97 € · Onboarding, Umsetzung & Delivery |

## Produkt-Page Aufbau (Pattern, gleich für alle 5)

1. Back-Link → `/`
2. Eyebrow (nur „Phase X")
3. Headline (lang, ohne Italic-Akzent)
4. Subheadline
5. Google + Trustpilot Bewertungs-Badges
6. Hero-Mockup-Bild (4:3, PDF + Notion-Laptop)
7. **CTA #1** — „Jetzt zum Einführungspreis sichern!" (im Hero)
8. „Was du bekommst" mit Baulig-Bullets (✓-Häkchen, Stil: „Erhalte X" / „Wie du Y")
9. **CTA #2** — mitten im Content (kompakt)
10. „Wie es abläuft" (nummerierte Schritte 1–4)
11. „Für wen ist das?" (✓-Häkchen)
12. FAQ (5 Akkordeons)
13. **CTA #3** — Final-CTA „Bereit zu starten?"
14. Footer

## Wichtige Dateien

- `app/page.tsx` — Bio-Landing-Page
- `components/ProductPage.tsx` — Wiederverwendbares Template
- `lib/products.ts` — **Zentrale Produkt-Daten** (Texte, Preise, Bullets, FAQ, Steps, **`digistoreUrl`-Feld**)
- `components/ReviewBadges.tsx` — Google + Trustpilot Pills
- `app/globals.css` — 1:1 von wohlstandsmarketing.de
- `app/icon.svg`, `icon.png`, `apple-icon.svg` — Favicons (aus WSM kopiert)
- `public/images/` — 5 Cover-PNGs (OG) + 5 Mockup-PNGs (Hero) + Albert-Foto

## Lokal testen

```bash
cd /Users/albertipgefer/.claude/Wohlstandsmarketing/start-wsm
npm run dev          # → http://localhost:3000 (oder anderer freier Port)
npm run build && npm start
```

## ⚠️ Wichtiger Build-Fix

- **Next 16.0.0 hatte Turbopack-Build-Crash.** Auf 16.2.6 hochgezogen (gleich wie WSM-Relaunch) — alles grün.
- **Framer-Motion v12 Easing-Type:** Cubic-Bezier-Array funktioniert nicht mehr, muss String-Literal sein (`"easeOut" as const`).

## 📋 Offene Punkte (für morgen)

### 1. Deploy
- GitHub-Repo anlegen (Vorschlag: `albertipgefer/start-wsm` oder als Sub-Repo)
- `git init`, commit, push
- Vercel-Projekt importieren → automatischer Deploy
- Domain `start.wohlstandsmarketing.de` in Vercel Settings → Domains hinzufügen
- Im Cloudflare/Domain-Provider von wohlstandsmarketing.de: CNAME `start` → `cname.vercel-dns.com`

### 2. Digistore-Produkte anlegen (5 Stück)
- Quelle: `../Personal Brand/monetization/digistore-verkaufstexte.md` (Verkaufstexte)
- Quelle: `../Personal Brand/monetization/digistore-auto-mails.md` (Auto-Mails)
- Quelle: `../Personal Brand/monetization/digistore-covers/cover-phase-*.png` (Cover-Bilder, 1280×720, für OG-Sharing)
- Quelle: `../Personal Brand/monetization/digistore-covers/mockup-phase-*.png` (Mockup-Bilder, 1600×1200, für Digistore-Hero)
- PDFs anhängen aus:
  - Phase 1: `../Personal Brand/monetization/phase-1-online-fahrplan/wohlstands-guide-2026.pdf`
  - Phase 2: kein PDF (nur Notion-Workspace)
  - Phase 3: `../Personal Brand/monetization/phase-3-erste-referenzen/deine-ersten-3-referenzen.pdf` + `referenz-vereinbarung.pdf`
  - Phase 4: `../Personal Brand/monetization/phase-4-erster-kunde/dein-erster-1000-euro-kunde.pdf` + `angebot-beispiel.pdf`
  - Phase 5: `../Personal Brand/monetization/phase-5-onboarding-umsetzung/onboarding-umsetzung-delivery.pdf` + `aufstockung-ki-sichtbarkeit-seo.pdf`

### 3. Digistore-URLs in lib/products.ts einsetzen
- Sobald Verkaufslinks da: `digistoreUrl` pro Produkt setzen → CTA-Buttons werden automatisch aktiv

### 4. Phase 1 PDF auf start.wohlstandsmarketing.de umstellen
- „Folgeprodukte"-Sektion zeigt aktuell direkt auf Notion-Workspaces
- Soll auf start.wohlstandsmarketing.de/{slug} zeigen

### 5. Alte PDFs in Phase-3 + Phase-4 Notion austauschen
- Aktuelle PDF-Versionen liegen lokal in den Phase-Ordnern
- Albert per `/file` manuell ersetzen

### 6. Test-Kauf
- Wenn alles live: 1× durch den kompletten Flow gehen (Bio-Page → Produkt-Page → Digistore → Mail empfangen)
