# Wohlstandsmarketing — Traffic- & Ausbau-Roadmap

> **Stand: 26. Mai 2026**
> Beschlossene Maßnahmen nach Go-Live von wohlstandsmarketing.de.
> Reihenfolge ist von Albert festgelegt.

---

## 🟦 Block 1 — Off-Page (Albert selbst, parallel zum Code)

- [ ] **Google Business Profile optimieren**
  - Adresse: Vor der Loos 4e, 56130 Bad Ems · +49 176 227 87 559
  - Kategorie „Werbeagentur", 10+ Fotos, 5 erste Reviews einsammeln
  - GBP mit allen Stadt-Pages verknüpfen (NAP-Konsistenz)
- [ ] **GBP-Posts** — 1×/Woche mit Foto + Link zu Blog/Stadt-Page

> Bewusst gestrichen (vorerst nicht relevant): LinkedIn, Meta Ads auf Top-3-Blogartikel, Meta Retargeting auf Website-Besucher.

---

## 🟦 Block 2 — Tracking & Analytics

- [x] **Microsoft Clarity einbauen** — Heatmaps + Session-Recordings (gratis) ✅ 26.05.2026
- [ ] **Google Search Console** — laufendes Monitoring, Auswertung Impressionen/Klicks/Queries
- [x] **Internal Link Audit** — ✅ 26.05.2026 (Commit `55e2c71`): Hero-Logo-Fix, neue StandorteSektion auf Startseite mit 6 Stadt-Links, Nachbar-Städte auf allen 5 erweitert, BlogTeaser auf 6 Posts

---

## 🟦 Block 3 — Neue Routes & Bereiche (Code-Arbeit)

- [x] **KI-Sichtbarkeits-Check (Free Tool)** ✅ 26.05.2026 (Commit `00d0ee0`)
  - Live unter `/sichtbarkeits-check`
  - Echter URL-Crawler mit 4 Säulen (KI-Crawler, Schema, SEO, Performance/Trust)
  - 3-Step Wizard (URL/Stadt/Ziel), Score-Ring, Inline-Bericht, harter CTA
  - Soft-Gate Lead-Capture mit Resend-HTML-Mail (Bericht an User + Lead-Notif an Albert)
  - Navbar-Punkt + eigene CTA-Sektion auf Startseite eingebaut
- [x] **Lead Magnet prominent auf der Seite platzieren** ✅ 26.05.2026 (Commit `c79340f`)
  - StickyKiCheckCTA global (floating bottom-right, dismissable, erscheint nach 600px Scroll)
  - In-Article-Banner im Blog (zwischen AuthorBox und Related-Posts)
  - Sekundärer CTA im Hero unter den Haupt-Buttons
- [ ] **5–10 weitere Stadt-Pages** — Mainz, Wiesbaden, Düsseldorf, Trier, Saarbrücken, Mannheim, Aachen …
- [ ] **Pricing-Page** als eigene Route (`/preise`)
- [ ] **Über-mich-Seite** als eigene Route (`/ueber-albert` o. ä.)
  - Ziel: Vertrauen aufbauen, dem Namen Albert Ipgefer einen guten Ruf geben, Expertise sichtbar machen
  - Inhalte: Werdegang, Werte, Methodik, Kunden-Logos, Cases, Zertifikate/Auszeichnungen, persönliche Story
  - Schema: Person + ProfilePage, mit sameAs zu LinkedIn/IG/TikTok
  - Wird **am Ende** umgesetzt, nachdem die anderen Items durch sind
- [ ] **Google-Bewertungen einbauen**
  - **Sterne im Hero** der Startseite (z. B. „4,9 ★ aus X Google-Bewertungen") — Trust-Signal direkt above the fold
  - **Eigene Bewertungs-Sektion** auf der Startseite (und ggf. Stadt-Pages) mit Original-Texten der Google-Reviews
  - Quelle: echte Bewertungen aus Google Business Profile, per Copy-Paste übernommen (kein API-Fetch nötig)
  - Schema: `AggregateRating` + `Review`-Schemas für Rich Snippets in den SERPs
  - Voraussetzung: GBP optimiert + erste 5 Reviews vorhanden (siehe Block 1)

---

## 🟦 Block 4 — Internationalisierung / i18n

- [ ] **Mehrsprachigkeit einbauen** — Sprachen-Umschalter
  - Next.js 16 i18n-Setup
  - Mindestens DE + EN, ggf. weitere Sprachen
  - SEO-konform (hreflang, eigene URLs pro Locale)
  - Auswirkung auf Schemas + Sitemap + robots beachten

---

## 📌 Bearbeitungs-Reihenfolge (Code-Arbeit)

0. ✅ **Microsoft Clarity einbauen** — erledigt 26.05.2026 (Commit `bf2f084`, ID `wwyiou5vrl`)
1. ~~Microsoft Clarity einbauen~~ ✅
2. **Google Search Console — laufendes Monitoring-Setup**
3. **Internal Link Audit**
4. **KI-Sichtbarkeits-Check (Free Tool)**
5. **Lead Magnet platzieren**
6. **5–10 weitere Stadt-Pages**
7. **Pricing-Page**
8. **i18n / Mehrsprachigkeit**
9. **Über-mich-Seite**
10. **Google-Bewertungen einbauen** (am Ende — braucht erst Reviews aus Block 1)

> Pro Session **ein** Item — nicht parallel. GBP (Block 1) macht Albert eigenständig parallel.

---

**Bei Wiedereinstieg:** Diese Datei + `STATUS.md` lesen, dann nächstes Item starten.
