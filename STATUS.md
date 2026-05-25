# Wohlstandsmarketing Relaunch — Projekt-Stand

> Stand: 25. Mai 2026
> Projektpfad: `~/.claude/Wohlstandsmarketing/Webseite/relaunch-next/`
> Dev-Server: `npm run dev` → `localhost:3001` (Port 3000 belegt)

---

## 🧭 Wo wir gerade stehen

**Tech-Stack**
- Next.js 16.2.6 (App Router, Turbopack)
- React 19, TypeScript, Tailwind 4
- Framer Motion (Animationen)
- next/image, next/font/google
- Deploy-ready für Vercel + GitHub

**Anzahl Routen**
- **78 Routen total** (76 statisch pre-rendered + 2 dynamische OG-Images)
  - 1 Startseite (`/`)
  - 50 Blog-Posts (`/blog/[slug]`)
  - 1 Blog-Liste (`/blog`)
  - 6 Stadt-Pages (`/webdesign/[stadt]`)
  - 1 Standorte-Hub (`/standorte`)
  - `/impressum`, `/datenschutz`
  - `/robots.txt`, `/sitemap.xml`, `/icon.svg`, `/apple-icon.svg`, `/opengraph-image`, `/blog/.../opengraph-image`

---

## 🚀 Was alles drinsteckt

### Startseite (`/`)
12 Sektionen im einheitlichen Design-System:
1. Hero — Split-Layout (Text + Albert-Portrait), 4-Seiten-Fade auf Desktop, Mobile: Foto zwischen Sub+CTA
2. Paradigmenwechsel — Google-2020 vs ChatGPT-2026
3. Problem — 6 Pain-Cards (KI-Sichtbarkeits-Schmerzpunkte)
4. Angebot — 2 Säulen × WSM-Methode-Film (4-Akte-Loop)
5. WSM-Methode — 3 Phasen (Fundament/Auftritt/KI-Indexierung) + Timeline 90 Tage
6. Cases — 2 Live-Screenshots: Fahrtendienst Weber + verkauf.holzmann-immobilien.de
7. Lieferumfang — 3 Spalten (Webdesign · KI-Sichtbarkeit · Begleitung)
8. Über Albert — Foto + Story + 10+ / DACH-Fokus / WSM-2025
9. Klassisch vs WSM — Vergleichstabelle (6 Punkte)
10. FAQ — 7 Akkordeon-Items mit FAQPage-Schema
11. CTABlock — 3 Step-Cards + Cal.com-Link + Kontaktformular (Web3Forms)
12. BlogTeaser — 3 neueste Artikel
13. Footer — 5 Spalten (Brand · Seite · Kontakt · Standorte · Recht)

### Blog (`/blog`)
- **50 SEO/AEO-optimierte Artikel** über 5 Kategorien:
  - KI-Sichtbarkeit (11)
  - Technisches SEO (11)
  - Lokales SEO (9)
  - Webdesign (10)
  - Conversion (9)
- **Live-Suche** (Title + Excerpt + Description + Keywords)
- **Kategorien-Filter** mit Count-Badges
- **Sort**: Neueste / Beliebteste / Lesedauer
- **Featured-Card** + Grid (1 col mobile → 2 col md → 3 col lg)
- Pro Artikel: TOC sticky desktop / collapsible mobile, FAQ-Block, Related-Posts, Final-CTA, BlogPosting + FAQPage JSON-LD

### Stadt-Landing-Pages (`/webdesign/[stadt]`)
**6 Städte:** Bad Ems · Koblenz · Montabaur · Frankfurt · Bonn · Köln

Pro Stadt-Page enthalten:
- Breadcrumbs (sichtbar + Schema)
- Hero mit Stadt-spezifischer H1 + Albert-Portrait
- Lokaler Bezug (Wahrzeichen, Branchen)
- „Für wen wir bauen" — lokale Branchen-Cards
- WSM-Methode kondensiert (3 Säulen)
- Stadt-spezifische FAQ (5 Fragen)
- CTA-Block
- Nachbar-Städte als Pills (interne Verlinkung)
- 4 JSON-LD Schemas: ProfessionalService + Service + BreadcrumbList + FAQPage

### Hub-Seite (`/standorte`)
Grid aller 6 Städte mit Hauptsitz-Badge für Bad Ems.

### Rechtliches
- `/impressum` mit echten Daten (Vor der Loos 4e, 56130 Bad Ems, +49 176 227 87 559)
- `/datenschutz` (aus wohlstandsmarketing.de/datenschutz.html abgeleitet)
- **Cookie-Banner** mit Accept/Decline + localStorage

### SEO/AEO/KI
- **robots.txt** mit allen KI-Crawlern erlaubt (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, CCBot)
- **sitemap.xml** automatisch mit allen 76 Routes
- **JSON-LD Schemas global** im Layout: Organization + LocalBusiness + ProfessionalService + WebSite + Service
- **Pro Blog-Post**: BlogPosting + FAQPage
- **Pro Stadt-Page**: ProfessionalService mit Geo + Service + BreadcrumbList + FAQPage
- **Dynamic OG-Images** (Edge-rendered) für Startseite + jeden Blog-Post

### Kontakt
- **Web3Forms-Integration** im Kontaktformular (Key: `6d875870-24bd-4aae-bbd0-04cc44eb3104`)
- Anfragen landen direkt in `info@wohlstandsmarketing.de`

---

## ✅ Was du heute Abend prüfen solltest

### Auf Handy/iPad
- [ ] **Startseite** scrollt komplett durch (Lenis ist raus, Scroll-Bug sollte weg sein)
- [ ] **Hero** auf Mobile: Foto zwischen Subtitle und CTA sichtbar
- [ ] **Burger-Menu** auf Mobile öffnet/schließt sauber (Hero + Blog-Seiten + Stadt-Pages)
- [ ] **Blog-Liste** (`/blog`): Suche tippen, Filter klicken, Sort wechseln
- [ ] **Ein Blog-Artikel**: TOC oben als collapsible, FAQ-Accordion am Ende
- [ ] **Stadt-Page** (z.B. `/webdesign/koblenz`): alle Sektionen sichtbar, Nachbar-Pills funktionieren
- [ ] **Standorte-Hub** (`/standorte`): 6 Karten, klick auf eine → Stadt-Page
- [ ] **Footer** mit 5 Spalten auf Desktop, gestapelt auf Mobile

### Auf Desktop
- [ ] **Hero**: Albert-Foto rechts mit 4-Seiten-Fade
- [ ] **Cursor-Glow** folgt der Maus (subtil blauer Glow)
- [ ] **Hover-Effekte** auf Buttons (Wipe-Animation)
- [ ] **Cal.com-Link** im CTA-Block (`cal.com/albertipgefer/15min`) → funktioniert?
- [ ] **Kontaktformular** absenden → Mail kommt an?

### Technisch
- [ ] `/sitemap.xml` öffnen → alle 76 Routes drin
- [ ] `/robots.txt` öffnen → alle KI-Crawler erlaubt
- [ ] In ChatGPT/Perplexity testen: „Welcher Webdesigner in Koblenz arbeitet mit KI-SEO?" → über die Wochen die Erwähnungen tracken

---

## ⏳ Was du selbst noch tun musst

### Inhaltlich
- [ ] **`public/albert.jpg`** ist Albert in NYC-Setting — falls du ein anderes Foto willst, einfach ersetzen
- [ ] **`public/albert-portrait.jpg`** ist der Closeup-Crop (genutzt für Stadt-Pages + Mobile-Hero + Blog-Autor)
- [ ] **Cal.com-Link** prüfen: `cal.com/albertipgefer/15min` — falls anders, in `CTABlock.tsx` + `Footer.tsx` + Stadt-Pages anpassen
- [ ] **Cases-Screenshots** in `public/cases/holzmann.png` + `public/cases/weber.png` — bei Bedarf neu erstellen
- [ ] **Impressum**: USt-IdNr. ist Platzhalter (`[DE…]`) — bitte real ergänzen, falls vorhanden

### Externe Setups
- [ ] **Vercel-Deploy** via GitHub-Push einrichten (aktuell läuft nur lokal)
- [ ] **Domain `wohlstandsmarketing.de`** auf das neue Vercel-Projekt routen
- [ ] **Web3Forms-Dashboard** kurz prüfen, dass der Key aktiv ist
- [ ] **Google Search Console**: neue Sitemap einreichen sobald live
- [ ] **Bing Webmaster Tools**: sitemap einreichen, IndexNow aktivieren
- [ ] **Google Business Profile**: NAP-Daten mit Webseite abgleichen

### Optional (Traffic-Hebel — separat besprochen)
- [ ] Newsletter-Funnel + Lead Magnet (PDF „KI-Sichtbarkeits-Checkliste 2026")
- [ ] Free Tool „KI-Sichtbarkeits-Check" als Subroute
- [ ] LinkedIn Personal Brand für Albert (3 Posts/Woche)
- [ ] Reddit/Quora-Engagement
- [ ] Gastbeiträge auf t3n, OMR, Branchen-Blogs
- [ ] Glossar-Seite (50–80 SEO/AEO-Begriffe)
- [ ] Case-Detail-Pages pro Kunde

---

## 📂 Wichtige Dateien für späteres Editieren

```
Startseite-Sektionen   → components/sections/*.tsx
Blog-Posts             → content/blog/posts/*.tsx (+ content/blog/index.ts)
Stadt-Pages            → content/cities/index.ts (Daten) + app/webdesign/[stadt]/page.tsx
Hub-Page               → app/standorte/page.tsx
Layout + globale       → app/layout.tsx, app/globals.css
Logo + CookieBanner    → components/Logo.tsx, components/CookieBanner.tsx
Kontaktformular        → components/ContactForm.tsx
Footer                 → components/sections/Footer.tsx
Nav (Hero)             → components/sections/Hero.tsx (NAV_ITEMS Array)
Nav (Blog/Standorte)   → components/blog/BlogNav.tsx (NAV_ITEMS Array)
robots.txt + sitemap   → app/robots.ts, app/sitemap.ts
```

---

## 🎨 Design-System (CI)

- **Farben**: `--accent` #1663DE (Blau), `--gold` #DB6F16 (Orange), `--bg` #FAFAFA (Off-White), `--text` #0A0A0A
- **Fonts**: Inter (Display + Body), Playfair Display Italic (Akzent-Wörter in Headlines)
- **Headline-Stil**: Inter Black + 1 Highlight-Wort in Playfair Italic Blau mit orangenem Strich-Underline (SVG)
- **Buttons**: rounded-full, schwarz mit Hover-Wipe zu Blau
- **Cards**: rounded-3xl, border, subtle shadow
- **Sections**: py-20 md:py-24 oder py-24 md:py-32
- **Container**: max-w-6xl überall

---

## 🐛 Behobene Bugs (zur Doku)

1. **Lenis Smooth-Scroll**: rechnete Seitenhöhe falsch → Scroll blockierte bei Sektion 3. Komplett entfernt.
2. **Body-Layout (`h-full flex-col`)**: blockierte natürliches Scrolling. Entfernt.
3. **Article-Layout zu schmal** (max-w-4xl): jetzt durchgängig max-w-6xl wie Navbar.
4. **MeshTransmissionMaterial-Flash** im Hero: 3D-Komponente komplett ersetzt durch Albert-Foto.
5. **Quote-Bug in Blog-Posts**: typografische deutsche Quotes in JS-Strings haben Parser gebrochen. Mit perl-Script global gefixt.
6. **iOS Auto-Zoom auf Inputs**: Search + Sort waren <16px → jetzt text-base auf Mobile.
7. **BlogNav hatte kein Burger-Menü**: jetzt vollständiges Mobile-Overlay.
8. **Foto-Rotation**: HEIC mit EXIF orientation → sharp rotate(90) + EXIF strip.

---

## 🚦 Nächste Phasen (zur Auswahl, sobald du wieder da bist)

### Option A — Mehr Traffic (priorisiert)
1. Newsletter-Funnel mit Lead Magnet
2. Free Tool „KI-Sichtbarkeits-Check"
3. 5–10 weitere Stadt-Landing-Pages (Mainz, Wiesbaden, Düsseldorf, Trier, Saarbrücken, …)
4. LinkedIn-Content-Plan für Albert
5. Glossar-Seite

### Option B — Conversion-Tuning
1. A/B-Test-Setup mit Vercel Edge Config
2. Heatmap-Tool (Microsoft Clarity) einbauen
3. Pricing-Page als eigene Route
4. Comparison-Page „WSM vs Standard-Agentur"

### Option C — Live gehen
1. Vercel-Deploy einrichten (GitHub → Vercel)
2. Domain umroutet
3. Search Console + Bing Webmaster einrichten
4. Erste Performance-Messung

---

**Fragen? → Sag mir was du zuerst willst, ich hab den Kontext.**
