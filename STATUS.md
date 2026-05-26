# Wohlstandsmarketing Relaunch — Projekt-Stand

> **Stand: 26. Mai 2026 (abends)**
> **Status: ✅ LIVE auf https://wohlstandsmarketing.de**
> Projektpfad: `~/.claude/Wohlstandsmarketing/Webseite/relaunch-next/`

---

## 🟢 LIVE-Stand

| Was | Status |
|---|---|
| Domain `wohlstandsmarketing.de` | ✅ HTTP 200, alle Routes erreichbar |
| Vercel-Projekt | `albertipgefers-projects/wohlstandsmarketing` |
| Git-Repo | `github.com/albertipgefer/Wohlstandsmarketing` (main) |
| Letzter Production-Deploy | `dpl_...ddj2p243r` (26.05. abends) |
| Legacy-HTML-Backup | Branch `legacy-html` (SHA `17ffad4`) — Rollback-Option |
| Kontaktformular | ✅ Resend-API aktiv, schickt an `info@wohlstandsmarketing.de` |
| **Lead-Magnet-Funnel** | ✅ Double-Opt-In live, 7-Mail-Drip via Vercel-Cron |
| Google Search Console | ✅ Property + Sitemap eingereicht |
| Bing Webmaster Tools | ✅ via GSC importiert |

---

## 🧭 Tech-Stack

- Next.js 16.2.6 (App Router, Turbopack), React 19, TypeScript, Tailwind 4
- Framer Motion, next/image, next/font/google
- Deploy: Vercel (CLI-Deploy via `vercel deploy --prod --yes`)
- E-Mail: Resend API (Welcome + Drip via Vercel-Cron)
- Booking: TidyCal — `tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2`
- WhatsApp: `+49 176 227 87 559` (kontextuelle Pre-Filled-Nachrichten)

---

## 📦 Was alles drinsteckt

### Startseite (`/`) — Reihenfolge
Hero · Paradigmenwechsel · Problem · Angebot · Methode · VorherNachher · WasDuBekommst · ÜberAlbert · **Testimonials (compact, 3 Reviews)** · Vergleich · CTABlock · KiCheckCTA · StandorteSektion · BlogTeaser · **LeadMagnetSection** · **FAQ (vorletzt)** · **PreFooterCTA** · Footer

### Blog (`/blog` + 50 Artikel `/blog/[slug]`)
50 Artikel in 5 Kategorien (KI-Sichtbarkeit 11 · Tech SEO 11 · Lokales SEO 9 · Webdesign 10 · Conversion 9).

**Pro Blog-Artikel:** TOC, Body, **Inline-CTA Erstgespräch (mittendrin)**, Author-Box, **Inline-Lead-Magnet-Form (Anmelde-Box)**, Related Posts (4 keyword-matched), RegionLinks, **FAQ (vorletzt)**, **PreFooterCTA**, Footer

### Stadt-Pages (`/webdesign/[stadt]`) — 6 Städte
Bad Ems · Koblenz · Montabaur · Frankfurt · Bonn · Köln

**Pro Stadt-Page:** Breadcrumbs, Hero, Lokaler Bezug, Branchen-Cards, WSM-Methode, **Inline-CTA**, Nachbar-Städte, Internal-Linking zu Blog-Cluster, **FAQ (vorletzt)**, **PreFooterCTA**, Footer

### Conversion-Hub & Trust
- **`/bewertungen`** — alle Google-Reviews ungekürzt mit Expand/Collapse + PreFooterCTA
- **`/lead-magnet/danke`** — Danke-Seite nach Double-Opt-In-Bestätigung mit Direkt-Download und Next-Steps
- **`/standorte`** — 6-Städte-Grid + PreFooterCTA
- **`/sichtbarkeits-check`** — Free Tool (KI-Sichtbarkeit), bestehend
- **`/preise`** — Preise + Strategiegespräch-CTA
- `/impressum` (USt-IdNr 3007543765), `/datenschutz`, Cookie-Banner, 404-Seite, PWA-Manifest

### Conversion-UI (immer sichtbar)
- **StickyKiCheckCTA** rechts unten (alle Seiten außer `/sichtbarkeits-check*`, `/preise`)
- **WhatsAppButton** rechts unten direkt über KI-Check, identische Breite/Höhe, gleicher Scroll-Trigger (600 px) — kontextuelle Pre-Filled-Nachrichten je Seitentyp (Startseite/Blog-Artikel mit Titel/Stadt-Page mit Stadt/Preise/KI-Check/Standorte/Bewertungen/Fallback). **Ausgeblendet** auf `/sichtbarkeits-check` und `/preise`.
- **KiCheckTeaserPopup** nach 10 s Verweildauer (1× pro Session, blockt bei Form-Focus)
- **ExitIntentPopup** mit Lead-Magnet-Form bei Mouseleave-Top (Desktop) / Scroll-Up-nach-50 %-Tiefe (Mobile), frühestens nach 30 s (1× pro Session, blockt bei Form-Focus)

### SEO/AEO/KI-Infrastruktur
- `robots.txt` mit allen KI-Crawlern erlaubt
- `sitemap.xml` automatisch generiert
- `llms.txt` für LLM-Crawler-Hints
- Globales Person-Schema mit `sameAs` LinkedIn/Instagram/TikTok
- Globales Org/LocalBusiness/Service-Schema
- Dynamic OG-Images (Edge-rendered)
- Hydration-sicher (Math-Werte in PostCover gerundet)

---

## 🎁 Lead-Magnet-Funnel

**Asset:** „Die 11 teuersten Marketing-Fehler im deutschen Mittelstand" — 12-Seiten-PDF (A4, WSM-CI), generiert via `scripts/lead-magnet-pdf.mjs` (Chrome Headless), liegt unter `public/lead-magnet/11-marketing-fehler-mittelstand.pdf`.

**Inhalts-Pfad:** `content/lead-magnet/11-marketing-fehler-mittelstand.md` (Quell-Markdown).

**Form-Flow (DSGVO-konform Double-Opt-In):**
1. User füllt Form (Vorname + E-Mail + **Pflicht-Newsletter-Checkbox**, no-brainer formuliert) → POST `/api/lead-magnet`
2. Bestätigungs-Mail mit HMAC-signiertem Token (7 Tage gültig)
3. User klickt Bestätigen → GET `/api/lead-magnet/confirm?token=…`
4. Welcome-Mail mit PDF-Link + Audience-Push + Internal Notification
5. Redirect auf `/lead-magnet/danke`

**Komponenten:**
- `components/LeadMagnetForm.tsx` — Inline-Form (in Blog-Artikel, Lead-Magnet-Section, Exit-Intent-Popup)
- `components/sections/LeadMagnetSection.tsx` — Vollbreite-Sektion auf Startseite
- `lib/lead-magnet-token.ts` — HMAC-SHA256 Token-Mechanik (kein Storage nötig)

**7-Mail-Drip-Sequenz (Baulig-Stil, Mittelstand-generisch):**
- Texte in `content/lead-magnet/sequence-v2.md` (lesefreundlich)
- Templates in `app/api/cron/lead-magnet-drip/route.ts` (inline HTML)
- Schedule: Vercel-Cron `0 9 * * *` (täglich 10:00 MEZ)
- Tage: 1, 3, 5, 7, 10, 14 nach Audience-Subscribe
- Dedup: Resend `Idempotency-Key` pro (step, email)
- Mails werden **nur** an Audience-Member geschickt = nur Leads mit Newsletter-Opt-In

---

## 🔧 Wichtige Env-Vars (alle in Vercel hinterlegt)

```
RESEND_API_KEY        = re_...
RESEND_FROM_EMAIL     = hello@wohlstandsmarketing.de
RESEND_AUDIENCE_ID    = dacd5603-a1ac-444f-82df-8053fbbe7b33   # WSM Lead-Magnet
LEAD_MAGNET_SECRET    = (32-byte hex — für HMAC-Token-Signing)
CRON_SECRET           = (32-byte hex — Auth für Vercel-Cron)
```

---

## 📂 Wichtige Dateien

```
Startseite-Sektionen     → components/sections/*.tsx
Blog-Posts               → content/blog/posts/*.tsx (+ content/blog/index.ts)
Stadt-Pages              → content/cities/index.ts + app/webdesign/[stadt]/page.tsx
Testimonials             → content/testimonials.ts + components/sections/Testimonials.tsx
Inline-CTA (Blog/Stadt)  → components/blog/InlineCTA.tsx
PreFooter-CTA            → components/PreFooterCTA.tsx
WhatsApp-Floating        → components/WhatsAppButton.tsx
KI-Check Sticky          → components/StickyKiCheckCTA.tsx
KI-Check Teaser-Popup    → components/KiCheckTeaserPopup.tsx
Exit-Intent-Popup        → components/ExitIntentPopup.tsx
Popup-Wrapper            → components/PopupModal.tsx
Form-Focus-Detection     → lib/form-active.ts
Lead-Magnet-Form         → components/LeadMagnetForm.tsx
Lead-Magnet-Section      → components/sections/LeadMagnetSection.tsx
Lead-Magnet Token-Lib    → lib/lead-magnet-token.ts
Lead-Magnet PDF-Render   → scripts/lead-magnet-pdf.mjs
Lead-Magnet Inhalt       → content/lead-magnet/*.md (PDF-Quelle, Sequenz, DOI-Texte)
PDF                      → public/lead-magnet/11-marketing-fehler-mittelstand.pdf
API: Form-Submit         → app/api/lead-magnet/route.ts
API: Confirm-Endpoint    → app/api/lead-magnet/confirm/route.ts
API: Cron-Drip           → app/api/cron/lead-magnet-drip/route.ts
Danke-Seite              → app/lead-magnet/danke/page.tsx
Bewertungs-Seite         → app/bewertungen/page.tsx
Layout + Schemas         → app/layout.tsx (Org + Person + Service + Website + alle Sticky/Popup-Globals)
Vercel-Config + Cron     → vercel.json (framework=nextjs + crons-Array — NICHT LÖSCHEN)
robots/sitemap           → app/robots.ts, app/sitemap.ts
LLM-Hints                → public/llms.txt
```

---

## 🎨 Design-System (CI)

- **Farben:** `--accent` #1663DE (Blau) · `--gold` #DB6F16 (Orange) · `--bg` #FAFAFA · `--text` #0A0A0A
- **Fonts:** Inter (Display + Body), Playfair Display Italic (Akzent-Wörter)
- **Headline-Stil:** Inter Black + 1 Highlight-Wort in Playfair Italic Blau + orangene SVG-Underline
- **Buttons:** rounded-full, schwarz mit Hover-Gradient-Wipe zu Blau, Text bleibt weiß (defensiv mit `!text-white` + `no-underline` gegen `prose-blog`)
- **Cards:** rounded-3xl, border, subtle shadow
- **Container:** max-w-6xl
- **CTA-Boxen:** vertikaler Akzent-Streifen links (Blau→Orange-Verlauf), Pulse-Dot-Eyebrow, Akzent-Border (`border-[var(--accent)]/25`), Glow-Backdrops

---

## 🚦 Routine-Befehle

```bash
# Dev
cd "/Users/albertipgefer/.claude/Wohlstandsmarketing/Webseite/relaunch-next"
npm run dev              # localhost:3001 (Port 3000 oft belegt)

# Build-Test
npx next build

# Production-Deploy (umgeht Git, direkt vom lokalen Code)
npx vercel@latest deploy --prod --yes

# Git-Push (Auto-Classifier blockt main-direct-push — Albert pusht selbst)
git push origin main

# Lead-Magnet PDF neu rendern
node scripts/lead-magnet-pdf.mjs

# Cron lokal manuell triggern (Test)
curl -H "Authorization: Bearer ${CRON_SECRET}" \
  https://wohlstandsmarketing.de/api/cron/lead-magnet-drip
```

---

## 📊 Wo siehst du was?

| Was | Wo |
|---|---|
| Versendete Mails + Status + Uhrzeit | https://resend.com/emails (Filter: `tag=funnel:lead-magnet`) |
| Audience (alle Leads) | https://resend.com/audiences/dacd5603-a1ac-444f-82df-8053fbbe7b33 |
| Cron-Job-Läufe | Vercel → Project → Observability → Crons / Logs |
| Production-Deployments | https://vercel.com/albertipgefers-projects/wohlstandsmarketing |

---

## 🎯 Erwartete Organic-Traffic-Timeline

| Zeitpunkt | Was zu erwarten |
|---|---|
| Woche 1–4 | Indexierung läuft, erste GSC-Impressionen |
| Monat 2–3 | 100–300 Impressionen/Tag, erste Long-Tail-Klicks |
| Monat 3–6 | Spürbarer Traffic (>50 Besucher/Monat Organic) |
| Monat 6–12 | Erste Leads über Organic + Lead-Magnet, KI-Erwähnungen häufiger |
| Monat 12+ | Organic als zweiter Kanal neben Meta Ads |

**KI-Sichtbarkeit** (ChatGPT/Perplexity) reagiert oft schneller als Google: 2–8 Wochen für erste Erwähnungen.

---

## ✅ Erledigt im Sprint 26.05.2026

1. Testimonial-Sektion (Startseite compact + `/bewertungen` voll)
2. WhatsApp-Floating-Button mit kontextuellen Pre-Filled-Nachrichten, gestapelt über KI-Check-Sticky
3. Inline-CTA-Box (Blog + Stadt-Pages) + PreFooter-CTA überall
4. Lead-Magnet PDF gerendert + auf `/public` ausgeliefert
5. Lead-Capture-Form + `/api/lead-magnet` + Confirm-Endpoint + Audience-Push
6. Double-Opt-In mit HMAC-Token, DSGVO-konform, Pflicht-Checkbox
7. 7-Mail-Drip-Sequenz V2 (Baulig-Stil) — Mittelstand-generisch, keine Branchen, keine Werbeanzeigen-Erwähnung, polarisierender Ton
8. Vercel-Cron-Job aktiviert (`0 9 * * *`)
9. Exit-Intent-Popup mit Lead-Magnet-Form
10. KI-Check-Teaser-Popup nach 10 s Verweildauer
11. PopupModal (zentriert auf allen Geräten, Backdrop, ESC, Body-Lock)
12. Form-Focus-Detection — Popups blocken automatisch, solange User in Form tippt
13. FAQ überall als vorletzte Sektion vor PreFooterCTA + Footer
14. Lead-Magnet-Section auf Startseite + Footer-Spalte „Assets" (KI-Check, PDF, Blog)
15. Bewertungen-Link nur im Footer (raus aus Nav)
16. Hydration-Bug in PostCover gefixt (`KiSichtbarkeitMotif` Math-Werte gerundet)
17. PDF-Render-Pipeline via Chrome Headless

---

## 🔮 Optional / später (nicht im aktuellen Plan)

- ~~Money-Keyword-Pages~~ — aus dem Plan gestrichen (26.05.)
- ~~Vertical-Pages~~ — aus dem Plan gestrichen (26.05.)
- Optional: ProvenExpert-Widget oder GBP-Live-Pull der Reviews
- Optional: Live-Cron-Test mit komprimierter Zeitachse (Mail 1–6 in 5 Min für Demo)
- Optional: WSM-Methode als eigene Landing-Page

---

**Bei Wiedereinstieg: erst diese Datei lesen, dann legen wir los.**
