# Wohlstandsmarketing Relaunch — Projekt-Stand

> **Stand: 25. Mai 2026 (abends)**
> **Status: ✅ LIVE auf https://wohlstandsmarketing.de**
> Projektpfad: `~/.claude/Wohlstandsmarketing/Webseite/relaunch-next/`

---

## 🟢 LIVE-Stand

| Was | Status |
|---|---|
| Domain `wohlstandsmarketing.de` | ✅ HTTP 200, alle 69 Routes erreichbar |
| Vercel-Projekt | `albertipgefers-projects/wohlstandsmarketing` |
| Git-Repo | `github.com/albertipgefer/Wohlstandsmarketing` (main, gepusht bis `1d65f5e`) |
| Legacy-HTML-Backup | Branch `legacy-html` (SHA `17ffad4`) — Rollback-Option |
| Kontaktformular | ✅ Resend-API aktiv, schickt an `info@wohlstandsmarketing.de` |
| Google Search Console | ✅ Property + Sitemap eingereicht |
| Bing Webmaster Tools | ✅ via GSC importiert |

---

## 🧭 Tech-Stack

- Next.js 16.2.6 (App Router, Turbopack), React 19, TypeScript, Tailwind 4
- Framer Motion (Animationen), next/image, next/font/google
- Deploy: Vercel (CLI-Deploy via `vercel deploy --prod`)
- E-Mail: Resend API (`RESEND_API_KEY` + `RESEND_FROM_EMAIL` in Vercel Env-Vars)
- Booking: TidyCal (`tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2`)

---

## 📦 Was alles drinsteckt

### Startseite (`/`) — 12 Sektionen
Hero, Paradigmenwechsel, Problem-Pains, Angebot, WSM-Methode, Cases, Lieferumfang, Über Albert, Klassisch vs WSM, FAQ, CTABlock (mit Resend-API + mailto-Fallback), BlogTeaser, Footer.

### Blog (`/blog` + 50 Artikel `/blog/[slug]`)
50 Artikel in 5 Kategorien (KI-Sichtbarkeit 11 · Tech SEO 11 · Lokales SEO 9 · Webdesign 10 · Conversion 9).
- Live-Suche, Kategorien-Filter, Sort (Neueste/Beliebteste/Lesedauer)
- Pro Artikel: TOC, FAQ, **4 keyword-matched Related Posts**, **AuthorBox mit LinkedIn**, **RegionLinks zu 6 Stadt-Pages**, Final-CTA
- Schema: BlogPosting (mit Author-@id-Verknüpfung zur globalen Person) + FAQPage

### Stadt-Pages (`/webdesign/[stadt]`) — 6 Städte
Bad Ems · Koblenz · Montabaur · Frankfurt · Bonn · Köln
- Breadcrumbs (sichtbar + Schema), Hero mit Stadt-H1, Lokaler Bezug, Branchen-Cards, WSM-Methode, **8 FAQs**, CTA, Nachbar-Städte, **3 thematische Blog-Artikel (Internal Linking)**
- Schema: ProfessionalService mit **hasOfferCatalog (4 Pakete)** + openingHours + sameAs + Service + BreadcrumbList + FAQPage

### Hub & Rechtliches
- `/standorte` (6-Städte-Grid), `/impressum` (mit USt-IdNr 3007543765), `/datenschutz`
- Cookie-Banner, 404-Seite, PWA-Manifest

### SEO/AEO/KI-Infrastruktur
- `robots.txt` mit allen KI-Crawlern erlaubt (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, CCBot)
- `sitemap.xml` automatisch generiert
- `llms.txt` für LLM-Crawler-Hints
- **Globales Person-Schema** mit `sameAs` LinkedIn/Instagram/TikTok (`https://www.linkedin.com/in/albertipgefer/`)
- **Globales Org/LocalBusiness/Service-Schema** in Layout
- Dynamic OG-Images (Edge-rendered)

---

## 🔧 Kritische Fixes der letzten Session

1. **Vercel `framework: null`-Bug** → `vercel.json` mit explizitem `framework: "nextjs"` erstellt. **Nie löschen** — sonst 404 auf allen Routes.
2. **Resend-API** (`app/api/contact/route.ts`) statt Web3Forms (war Cloudflare-blocked)
3. **LinkedIn-Slug**: korrekter Wert ist `albertipgefer` (ohne Bindestrich) — 4 Stellen: AuthorBox.tsx, layout.tsx, blog/[slug]/page.tsx, webdesign/[stadt]/page.tsx
4. **Navbar unified**: BlogNav = Hero-Pill-Design (floating, `top-4`, `z-50`)
5. **TidyCal** statt cal.com überall

---

## 📂 Wichtige Dateien

```
Startseite-Sektionen    → components/sections/*.tsx
Blog-Posts              → content/blog/posts/*.tsx (+ content/blog/index.ts)
Blog Related-Logik      → content/blog/index.ts → getRelatedPosts() (keyword-score)
                                                  getCityRelevantPosts() (für Stadt-Pages)
Stadt-Pages             → content/cities/index.ts + app/webdesign/[stadt]/page.tsx
Author-Box              → components/blog/AuthorBox.tsx (LinkedIn-Konstante hier ändern!)
Region-Links            → components/blog/RegionLinks.tsx
Kontakt-API             → app/api/contact/route.ts (Resend)
Kontaktformular         → components/ContactForm.tsx (mit mailto-Fallback)
Layout + Schemas        → app/layout.tsx (Org + Person + Service + Website)
Vercel-Config           → vercel.json (framework=nextjs — NICHT LÖSCHEN)
robots/sitemap          → app/robots.ts, app/sitemap.ts
LLM-Hints               → public/llms.txt
```

---

## 🎨 Design-System (CI)

- **Farben**: `--accent` #1663DE (Blau) · `--gold` #DB6F16 (Orange) · `--bg` #FAFAFA · `--text` #0A0A0A
- **Fonts**: Inter (Display + Body), Playfair Display Italic (Akzent-Wörter in Headlines)
- **Headline-Stil**: Inter Black + 1 Highlight-Wort in Playfair Italic Blau + orangenem SVG-Underline
- **Buttons**: rounded-full, schwarz mit Hover-Wipe zu Blau
- **Cards**: rounded-3xl, border, subtle shadow
- **Container**: max-w-6xl

---

## 🚦 Nächste Phasen (priorisiert)

### Sofort-Hebel (Albert selbst, diese Woche)
- [ ] **GBP optimieren** (Vor der Loos 4e, 56130 Bad Ems, +49 176 227 87 559; Kategorie „Werbeagentur", 10+ Fotos, 5 erste Reviews einsammeln)
- [ ] **Meta-Ads-Kampagne auf Top-3-Blog-Artikel** (5–10 €/Tag pro Artikel, Ziel Traffic+Engagement)
- [ ] **LinkedIn**: 3 Posts/Woche, Links **im ersten Kommentar** nicht im Post
- [ ] **GBP-Posts**: 1×/Woche mit Foto + Link zu Blog/Stadt-Page
- [ ] **ChatGPT-Test heute + in 4 Wochen**: „Wer ist der beste Webdesigner für KI-Sichtbarkeit in Bad Ems?" → Screenshot + Datum

### Code-Erweiterungen (für Claude)
- Newsletter-Funnel mit Lead Magnet (Resend-Audience + react-email)
- Free Tool „KI-Sichtbarkeits-Check" als Subroute (3 Fragen, Score, Lead)
- 5–10 weitere Stadt-Pages (Mainz, Wiesbaden, Düsseldorf, Trier, Saarbrücken, …)
- Glossar-Seite (50–80 SEO/AEO-Begriffe für Long-Tail-Traffic)
- Case-Detail-Pages pro Kunde
- A/B-Test-Setup (Vercel Edge Config)
- Microsoft Clarity Heatmaps einbauen
- Pricing-Page als eigene Route

---

## ⚙️ Routine-Befehle

```bash
# Dev
cd "/Users/albertipgefer/.claude/Wohlstandsmarketing/Webseite/relaunch-next"
npm run dev              # localhost:3001 (Port 3000 belegt)

# Build-Test
npx next build

# Production-Deploy (umgeht Git, direkt vom lokalen Code)
npx vercel@latest deploy --prod --yes

# Git-Push (auch wenn Vercel via CLI deployed — Git und Live im Sync halten!)
git push origin main
```

---

## 🎯 Erwartete Organic-Traffic-Timeline

| Zeitpunkt | Was zu erwarten |
|---|---|
| Woche 1–4 | Indexierung läuft, erste GSC-Impressionen |
| Monat 2–3 | 100–300 Impressionen/Tag, erste Long-Tail-Klicks |
| Monat 3–6 | Spürbarer Traffic (>50 Besucher/Monat Organic) |
| Monat 6–12 | Erste Leads über Organic, KI-Erwähnungen häufiger |
| Monat 12+ | Organic als zweiter Kanal neben Meta Ads |

**KI-Sichtbarkeit** (ChatGPT/Perplexity) reagiert oft schneller als Google: 2–8 Wochen für erste Erwähnungen wenn Cluster + Schema + Backlinks stimmen.

---

**Bei Wiedereinstieg: erst diese Datei lesen, dann legen wir los.**
