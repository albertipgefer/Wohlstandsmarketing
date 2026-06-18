# Portfolio-Erweiterung — Status & Handoff

> Stand: 18.06.2026 · Branch: **`feat/portfolio-erweiterung`** (von `origin/main`, **uncommitted**, Build grün)
> Plan: `~/.claude/plans/glimmering-humming-lecun.md` · Blog-Plan: `BLOG-THEMENPLAN.md`

## ➡️ Nächster Schritt (Session-Start)
**Albert gibt zuerst Feedback / Review** zu allem Umgesetzten — danach ggf. Anpassungen, dann weiter.
Nichts ist committet; warten auf Albert-Entscheidung zu Commit/PR/Deploy.

## ✅ Fertig & verifiziert (Build grün, Smoke-Test 200)
- **AP1 Daten:** 4 neue Leistungen in `content/services/index.ts` + `content/pricing.ts`; neue pricing-Kategorien `marketing` + `automatisierung`; Feld `onRequest`; **alle 4 neuen Leistungen vorerst „auf Anfrage" (KEINE Preise)**. 4 neue Icons in `components/preise/ServiceIcon.tsx`.
- **AP2 Hubs:** `app/{e-mail-marketing,content-marketing,ki-optimierung,web-apps}/page.tsx` (Stil wie `/seo`). KI-Optimierung klar von KI-Sichtbarkeit abgegrenzt.
- **AP3 Branchen:** automatisch — 5 Branchen × 8 Services (z. B. `/branchen/handwerk/ki-optimierung`).
- **AP4 Sichtbarkeit:** Footer (`components/sections/Footer.tsx`), Homepage-Sektion `components/sections/LeistungenUebersicht.tsx` (Quelle: `content/serviceHubs.ts`), Nav-Dropdown (`components/blog/BlogNav.tsx`, auch Homepage), neue Seite `app/leistungen/page.tsx`, Sitemap-Hub-Routen (`app/sitemap.ts`).
- **AP4b Standorte:** geteilte Komponente `components/standort/ServiceStadtPage.tsx` + Configs `content/standortServices.ts` + 4 `app/<svc>/[stadt]/page.tsx`. Stadt-Routen per Flag `INCLUDE_NEW_SERVICE_CITY_ROUTES=false` noch AUS der Sitemap (Crawl-Budget).
- **AP5 KI-Check:** 4 Säulen → **2×2** mit Icons/Tiefe/Hover + Trust-Subline (`components/ki-check/KiCheckTool.tsx`); Headline „von der **KI** empfohlen" (`app/sichtbarkeits-check/page.tsx`).
- **AP7 Blog:** Themenplan `BLOG-THEMENPLAN.md` (30 Titel, 10/10/10) — **wartet auf Review**.

## ⏳ Offen / als Nächstes
1. **Feedback einarbeiten** (Schritt 1).
2. **Commit + PR** (`main` ist PR-geschützt) — nach Albert-Freigabe.
3. **Blog:** Themenplan freigeben → Charge 1 bauen (Vorschlag T1, T5, M1, M7, B1, B5, B8) → dabei Kategorie **„KI & Automatisierung"** in `content/blog/index.ts` mit dem 1. Artikel anlegen → Review → restliche 23.
4. **AP6 internes Verkaufssystem** (Leistungen in `/finanzen/preisliste` + `/angebot`) — **separat planen**.
5. **GANZ ZUM SCHLUSS — Preise:** gemeinsam festlegen & **anheben**, **Produkttreppe** (Einzelpreise vs. Gesamtpaket), dann Preise ÜBERALL eintragen (Konfigurator, `/angebot`, interne Preisliste). ⏰ **Albert aktiv erinnern.**

## Resume-Befehle
```bash
cd ~/.claude/Wohlstandsmarketing/Webseite/relaunch-next
git checkout feat/portfolio-erweiterung
npm run build
PORT=3137 npm run start   # lokal durchklicken
```
