# Wohlstandsmarketing Relaunch — Projekt-Stand

> **Stand: 28. Mai 2026 (abends)**
> **Status: ✅ LIVE auf https://wohlstandsmarketing.de**
> Projektpfad: `~/.claude/Wohlstandsmarketing/Webseite/relaunch-next/`
> **Wichtig:** Service-Portfolio seit 28.05. ohne Meta-Ads/Google-Ads. Aktuelle Services: Unternehmenswebsite · Landingpage · Webseiten-Relaunch · KI-Sichtbarkeit (3/6/9/12 Mon. oder einmalig) · SEO-Optimierung (6/9/12 Mon. oder einmalig) · Webseiten-Wartung. Komplette Doku: `~/.claude/Wohlstandsmarketing/CLAUDE.md`.

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

### Blog (`/blog` + 64 Artikel `/blog/[slug]`)
64 Artikel in 5 Kategorien (KI-Sichtbarkeit · Tech SEO · Lokales SEO · Webdesign · Conversion) — inkl. 15 transaktionale Money-Keyword-Artikel.

**Pro Blog-Artikel:** TOC, Body, **Inline-CTA Erstgespräch (mittendrin)**, Author-Box, **Inline-Lead-Magnet-Form (Anmelde-Box)**, Related Posts (4 keyword-matched), RegionLinks, **FAQ (vorletzt)**, **PreFooterCTA**, Footer

### Service-Hubs (4 Pages) — NEU 28.05.
- **`/webdesign`** — Hub für die 13 Webdesign-Stadt-Pages + 3 Webseiten-Angebote (Unternehmenswebsite, Landingpage, Relaunch) + WSM-Methode + Blog-Cluster + FAQ
- **`/ki-sichtbarkeit`** — Hub mit 13 Stadt-Pills, 6 Deliverables, WSM-Methode, KI-Cluster-Blog, FAQ
- **`/seo`** — Hub mit 13 Stadt-Pills, 6 SEO-Hebel, WSM-Methode, SEO-Cluster-Blog, FAQ
- **`/relaunch`** — Service-Page „Wann lohnt sich ein Relaunch?", 6 Anzeichen, Methode, Relaunch-Cluster-Blog, FAQ

### Stadt-Pages — 13 Städte × 3 Services = 39 Pages
**Städte:** Bad Ems · Koblenz · Montabaur · Frankfurt · Bonn · Köln · Mainz · Wiesbaden · Düsseldorf · Trier · Saarbrücken · Mannheim · Aachen

- **`/webdesign/[stadt]`** × 13 — Webdesign-Stadt-Pages (Schema bereinigt 28.05.: kein Meta-/Google-Ads-Catalog mehr)
- **`/ki-sichtbarkeit/[stadt]`** × 13 — KI-Sichtbarkeit × Stadt (NEU)
- **`/seo/[stadt]`** × 13 — SEO × Stadt (NEU)

**Pro Stadt-Page:** Breadcrumbs, Hero, Lokaler Bezug, Branchen-Cards, „Was du bekommst" (Service-Deliverables), WSM-Methode, **Inline-CTA**, **Cross-Link zu anderen Services derselben Stadt** + Nachbar-Städte, Service-Cluster-Blog (4 Posts), **FAQ (vorletzt)**, **PreFooterCTA**, Footer. Mobile/iPad-Hero hat Baulig-Bullets (4 themen-spezifische ✓-Punkte) + ReviewBadges + zweiten CTA.

### Conversion-Hub & Trust
- **`/bewertungen`** — alle Google-Reviews ungekürzt mit Expand/Collapse + PreFooterCTA
- **`/lead-magnet/danke`** — Danke-Seite nach Double-Opt-In-Bestätigung mit Direkt-Download und Next-Steps
- **`/standorte`** — 13-Städte-Grid + Cross-Link-Cluster (KI-Sichtbarkeit + SEO Pills) + PreFooterCTA
- **`/sichtbarkeits-check`** — Free Tool (KI-Sichtbarkeit), bestehend
- **`/preise`** — Preise + Strategiegespräch-CTA
- `/impressum` (USt-IdNr 3007543765), `/datenschutz`, Cookie-Banner, 404-Seite, PWA-Manifest

### Conversion-UI (immer sichtbar)
- **StickyKiCheckCTA** rechts unten (alle Seiten außer `/sichtbarkeits-check*`, `/preise`). **X-Button auf Mobile + iPad sichtbar** (seit 28.05.) — `inert` statt `aria-hidden` für A11y.
- **WhatsAppButton** rechts unten direkt über KI-Check, identische Breite/Höhe, gleicher Scroll-Trigger (600 px) — kontextuelle Pre-Filled-Nachrichten je Seitentyp (Startseite/Blog-Artikel mit Titel/Stadt-Page mit Stadt/Preise/KI-Check/Standorte/Bewertungen/Fallback). **Ausgeblendet** auf `/sichtbarkeits-check` und `/preise`. **X-Button auf Mobile + iPad sichtbar**.
- **KiCheckTeaserPopup** nach 35 s Verweildauer (1× pro Session, blockt bei Form-Focus, respektiert Popup-Coordinator)
- **ExitIntentPopup** mit Lead-Magnet-Form bei Mouseleave-Top (Desktop) / Scroll-Up-nach-50 %-Tiefe (Mobile), frühestens nach 60 s (1× pro Session, blockt bei Form-Focus, respektiert Popup-Coordinator)
- **LeadMagnetTrigger** im Footer („11 Marketing-Fehler PDF") — öffnet PopupModal mit LeadMagnetForm statt direktem PDF-Link (Double-Opt-In-Pflicht)

### Popup-Coordinator (NEU 28.05.)
`lib/popupCoordinator.ts` garantiert: **niemals 2 Popups gleichzeitig** + **mindestens 15 Sek Pause** zwischen zwei Popup-Anzeigen (Anti-Spam-Regel). Cookie-Banner ist ausgenommen (DSGVO-Pflicht).
- `tryOpenPopup(id)` → false wenn anderer offen oder Cooldown läuft
- `markPopupClosed(id)` → startet 15-Sek-Cooldown
- KiCheck-Teaser: bei Block → Auto-Retry nach Cooldown
- ExitIntent: bei Block → unterdrückt (Trigger einmalig)
- LeadMagnetTrigger (User-Click): überschreibt Cooldown (User-Intent gewinnt)

### SEO/AEO/KI-Infrastruktur
- `robots.txt` mit allen KI-Crawlern erlaubt
- `sitemap.xml` automatisch generiert — **114 URLs** (Stand 28.05.): 7 statisch + 4 Hubs + 39 Stadt-Pages + 64 Blog-Artikel
- `llms.txt` für LLM-Crawler-Hints
- Globales Person-Schema mit `sameAs` LinkedIn/Instagram/TikTok
- Globales Org/LocalBusiness/Service-Schema
- Pro Stadt-/Hub-Page: ProfessionalService + Service + Breadcrumb + FAQPage (4 Schemas)
- Dynamic OG-Images (Edge-rendered)
- Hydration-sicher (Math-Werte in PostCover gerundet)
- **www → non-www-Redirect** via vercel.json (host-basiert)
- **Browserslist** in `.browserslistrc` (versucht moderne Targets — Turbopack ignoriert teilweise)
- **Preconnect** zu `scripts.clarity.ms` im HEAD

### Nav-Architektur (NEU 28.05.)
**Single source of truth:** `components/blog/BlogNav.tsx` — wird auch von Hero.tsx über `<BlogNav />` referenziert (kein duplizierter Nav-Code mehr).

**Desktop:**
```
Leistungen ▼ (Hover-Dropdown) · KI-Check · Preise · Blog
```
Dropdown enthält: Webdesign · KI-Sichtbarkeit · SEO-Optimierung · Webseiten-Relaunch (jeweils mit Beschreibung)

**Mobile/iPad:** Burger → Akkordeon „Leistungen" (zentriert) + die 3 Top-Level-Items

### Logo-Architektur (NEU 28.05.) — Single Source of Truth
- **Eine Quelle:** `app/icon.png` (512×512, transparente Ecken)
- **Nav-Bar:** `components/Logo.tsx` rendert `<img src="/icon.png">` — KEIN Inline-SVG mehr
- **Favicon:** `app/icon.svg` enthält `<image href="data:image/png;base64,...">` mit dem identischen PNG
- **PWA-Icons:** `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png` (180×180) — alle aus derselben PNG-Quelle per `sips` abgeleitet
- **Apple-Touch-Icon:** `app/apple-icon.svg` analog mit base64-Embed
- **Bei Logo-Wechsel:** NUR `app/icon.png` austauschen, transparente Ecken sicherstellen (PIL-Floodfill — siehe Memory `feedback_wsm_favicon_navbar_logo.md`), dann SVG + andere Größen neu generieren. Logo.tsx **NICHT** anfassen.

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
Stadt-Definition         → content/cities/index.ts + types.ts (13 Städte)
Webdesign-Stadt-Pages    → app/webdesign/[stadt]/page.tsx
KI-Sichtbarkeit-Pages    → app/ki-sichtbarkeit/[stadt]/page.tsx (+ Hub: app/ki-sichtbarkeit/page.tsx)
SEO-Stadt-Pages          → app/seo/[stadt]/page.tsx (+ Hub: app/seo/page.tsx)
Webdesign-Hub            → app/webdesign/page.tsx
Relaunch-Service-Page    → app/relaunch/page.tsx
Blog-Helper              → content/blog/index.ts (getWebdesignPosts, getKiVisibilityPosts, getSeoPosts, getRelaunchPosts, getCityRelevantPosts)
Testimonials             → content/testimonials.ts + components/sections/Testimonials.tsx
Inline-CTA (Blog/Stadt)  → components/blog/InlineCTA.tsx
PreFooter-CTA            → components/PreFooterCTA.tsx
Nav (Desktop+Mobile)     → components/blog/BlogNav.tsx — Single Source (auch in Hero.tsx via <BlogNav />)
Logo                     → components/Logo.tsx (lädt /icon.png — NICHT anfassen bei Logo-Wechsel)
WhatsApp-Floating        → components/WhatsAppButton.tsx (X-Button mobile-sichtbar)
KI-Check Sticky          → components/StickyKiCheckCTA.tsx (X-Button mobile-sichtbar)
KI-Check Teaser-Popup    → components/KiCheckTeaserPopup.tsx
Exit-Intent-Popup        → components/ExitIntentPopup.tsx
Popup-Wrapper            → components/PopupModal.tsx
Popup-Coordinator        → lib/popupCoordinator.ts (15-Sek-Cooldown, nie 2 gleichzeitig)
Footer Lead-Magnet-Btn   → components/LeadMagnetTrigger.tsx (öffnet Popup statt PDF-Direkt-Link)
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
Layout + Schemas         → app/layout.tsx (Org + Person + Service + Website + alle Sticky/Popup-Globals + icons-metadata)
Vercel-Config + Cron     → vercel.json (framework=nextjs + crons-Array + www-redirect — NICHT LÖSCHEN)
robots/sitemap           → app/robots.ts, app/sitemap.ts (Hubs + 39 Stadt-Pages aufgenommen)
Browserslist             → .browserslistrc (moderne Targets gegen Polyfills)
LLM-Hints                → public/llms.txt
Logo-Quellen             → app/icon.png · app/icon.svg · app/apple-icon.svg · public/icon-192.png · public/icon-512.png · public/apple-touch-icon.png
SEO-Workspace            → SEO/ (AKTIONSPLAN-…, PLAN-MONEY-KEYWORD-PAGES-…, audits/, GBP-OPTIMIERUNG-PROZESS.md, MONEY-KEYWORD-CLUSTER.md)
```

---

## 🎨 Design-System (CI)

- **Farben:** `--accent` #1663DE (Blau) · `--gold` #DB6F16 (Orange, für Backgrounds/Pulse-Dots) · `--gold-text` #A85108 (dunklere Gold-Variante für Text, WCAG-AA-konform — seit 28.05.) · `--bg` #FAFAFA · `--text` #0A0A0A · `--text-muted` #52525B · `--text-subtle` #71717A (seit 28.05. von #A1A1AA angehoben für 4,5:1-Kontrast)
- **Fonts:** Inter (Display + Body), Playfair Display Italic (Akzent-Wörter)
- **Headline-Stil:** Inter Black + 1 Highlight-Wort in Playfair Italic Blau + orangene SVG-Underline
- **Buttons:** rounded-full, schwarz mit Hover-Gradient-Wipe zu Blau, Text bleibt weiß (defensiv mit `!text-white` + `no-underline` gegen `prose-blog`)
- **Cards:** rounded-3xl, border, subtle shadow
- **Container:** max-w-6xl
- **CTA-Boxen:** vertikaler Akzent-Streifen links (Blau→Orange-Verlauf), Pulse-Dot-Eyebrow, Akzent-Border (`border-[var(--accent)]/25`), Glow-Backdrops
- **Wording:** Du-Form, WSM-Methode, „In 90 Tagen", keine Meta-/Google-Ads-Sales mehr (seit 28.05.)
- **Mobile-Hero-Pattern auf Sub-Pages** (außer Preise/Standorte/KI-Check/Blog): Eyebrow → H1 → Subtitle → Foto → 2 CTAs → Trust-Hint → ReviewBadges → 4 Baulig-Bullets (themen-spezifisch) → 2. CTA-Wdh → 2. Trust-Hint (alles `lg:hidden`)
- **Bau-Regeln für neue Pages:** siehe Memory `feedback_wsm_page_building_rules.md` (Pflicht-Checkliste)

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

## ✅ Erledigt im Sprint 28.05.2026 (Major Money-Keyword-Expansion + Audit-Fixes)

**SEO-Audits + Quick Wins (Phase 1–3 aus AKTIONSPLAN):**
1. Drei externe Audits extrahiert (Seobility, eigener KI-Check, PageSpeed) → `SEO/audits/2026-05-28-*.md` + Master-Plan
2. Meta-Title gekürzt auf 54 Zeichen, Viewport-Tag korrigiert (Zoom wieder möglich)
3. Impressum + Datenschutz Descriptions auf 120–170 Zeichen
4. H1↔Body-Alignment im Hero
5. Hero-Bild: `fetchPriority="high"`, `quality=75`, engere `sizes`
6. `.browserslistrc` für moderne Targets
7. ARIA-Fix Sticky-CTAs (`inert` statt `aria-hidden`)
8. aria-labels auf alle „Erstgespräch sichern"-Anchors
9. Kontrast-Tokens (`--text-subtle` von #A1A1AA auf #71717A, neuer `--gold-text` #A85108)
10. Preconnect zu Clarity
11. **vercel.json: 301 www→non-www-Redirect** (host-basiert, DNS auf Vercel umgestellt)
12. **Resultat: Seobility 63% → 86%, Accessibility 88 → 100**

**Service-Portfolio-Cleanup:**
13. CLAUDE.md + Memory aktualisiert: Meta-/Google-Ads raus, aktuelles Service-Portfolio dokumentiert
14. Webdesign-Stadt-Pages: `hasOfferCatalog`-Schema bereinigt, FAQ-Antworten von Werbebudget-Aussagen befreit

**Money-Keyword-Expansion (3 Hebel):**
15. **Hebel 1** — Route `/ki-sichtbarkeit/[stadt]` × 13 Stadt-Pages (KI-Sichtbarkeit-Money-Keywords)
16. **Hebel 2** — Route `/seo/[stadt]` × 13 Stadt-Pages (SEO-Money-Keywords)
17. **Hebel 3** — 4 Service-Hub-Pages: `/webdesign`, `/ki-sichtbarkeit`, `/seo`, `/relaunch`
18. Sitemap erweitert auf 114 URLs
19. Mobile-Hero-Baulig-Pattern auf alle 39 Stadt-Pages + 4 Hubs

**Neuronale Verlinkung:**
20. StandorteSektion auf Startseite: 3 Cluster (Webdesign-Cards + KI-Pills + SEO-Pills) + 3 „Zur Service-Seite"-CTAs
21. Standorte-Hub: 3 Cluster
22. Cross-Links zwischen Webdesign-/KI-/SEO-Stadt-Pages derselben Stadt
23. Nav-Bar restrukturiert: Leistungen-Dropdown (Desktop) + Akkordeon (Mobile/iPad zentriert)
24. Hero.tsx: eigene Nav entfernt, nutzt jetzt `<BlogNav />` (eine Quelle)
25. Footer-Spalte „Leistungen" mit 6 Service-Hub-Links

**UX-Polish:**
26. Sticky-CTAs (KI-Check + WhatsApp): X-Button auf Mobile + iPad sichtbar
27. Popup-Coordinator (`lib/popupCoordinator.ts`): 15-Sek-Cooldown, nie 2 Popups gleichzeitig
28. Footer „11 Marketing-Fehler PDF" als Popup statt Direkt-Link (LeadMagnetTrigger)

**Logo-Architektur konsolidiert:**
29. Logo.tsx von Inline-SVG auf `<img src="/icon.png">` umgestellt — Single Source
30. `app/icon.svg`/`apple-icon.svg` mit base64-Embed des PNG (pixelgenau identisch zur Nav-Bar)
31. PIL-Floodfill für transparente Ecken
32. Memory-Regel `feedback_wsm_favicon_navbar_logo.md` mit Code-Snippet hinterlegt

**Bug-Fix Nebenwirkung:**
33. `getCityRelevantPosts` in `content/blog/index.ts` hatte 3 falsche Slugs — gefixt

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

## 🔮 Offen / nächste Hebel

**Aus AKTIONSPLAN-SEO-2026-05-28 noch offen (Phasen 4–7):**
- **Phase 4 Content-Cluster** — Pillar + Cluster verstärken, interne Verlinkung der 64 Blog-Artikel verdichten (3–5 Links pro Artikel zu thematisch nahen Posts)
- **Phase 6 Backlinks** — Lokale Verzeichnisse (IHK Koblenz, Rhein-Lahn-Wirtschaftsförderung, Stadt Bad Ems), Kunden-Backlinks (Holzmann, Weber, Bull&Bear, Noma Beach), Gastartikel-Pitches, Podcast-Pitches → braucht Albert (manuell, externe Akteure)
- **Phase 7 Monitoring-Rhythmus** — wöchentlich PageSpeed + Search Console; monatlich Seobility + eigener Sichtbarkeits-Check

**Aus PLAN-MONEY-KEYWORD-PAGES-2026-05-28 noch offen:**
- 4 Vergleichs-Pages (Bottom-of-Funnel): `/vergleich/seo-vs-ki-sichtbarkeit`, `/vergleich/landingpage-vs-unternehmenswebsite`, `/vergleich/relaunch-vs-neue-webseite`, `/vergleich/agentur-vs-inhouse-seo`

**Optional / strategisch:**
- GBP-Optimierung — Master-Doc liegt in `SEO/GBP-OPTIMIERUNG-PROZESS.md`, Trigger „GBP optimieren"
- ProvenExpert-Widget oder GBP-Live-Pull der Reviews
- WSM-Methode als eigene Landing-Page

---

**Bei Wiedereinstieg: erst diese Datei lesen, dann legen wir los.**
