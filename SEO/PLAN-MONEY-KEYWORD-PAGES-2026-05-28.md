# Money-Keyword-Pages — Umsetzungsplan

**Stand:** 28.05.2026 · **Status:** Hebel 1 + Hebel 2 + Hebel 3 + Schema-Cleanup ALLE LIVE
**Basis:** Service-Portfolio Stand 28.05.2026 (Webseite + KI-Sichtbarkeit + SEO — keine Meta-/Google-Ads mehr)

---

## Hebel 1 — KI-Sichtbarkeit × Stadt (13 Pages) — START

**Route:** `/ki-sichtbarkeit/[stadt]`
**Money-Keywords:** „ChatGPT-Optimierung Koblenz", „KI-SEO Frankfurt", „KI-Sichtbarkeit Düsseldorf" …
**Städte (13):** Bad Ems, Bonn, Düsseldorf, Frankfurt, Koblenz, Köln, Mainz, Mannheim, Montabaur, Saarbrücken, Trier, Wiesbaden, Aachen

**Page-Struktur (analog `/webdesign/[stadt]`):**
1. BlogNav
2. Breadcrumbs
3. Hero mit lokalem Bezug + Eyebrow
4. Was KI-Sichtbarkeit für [Stadt] bedeutet (lokaler Search-Intent)
5. WSM-Methode für KI-Sichtbarkeit (verkürzte Version)
6. Was du bekommst (5–7 konkrete Deliverables)
7. Inline-CTA (Erstgespräch)
8. Nachbar-Städte
9. Verwandte Blog-Artikel (KI-Sichtbarkeits-Cluster)
10. FAQ (6–8 Items mit Schema)
11. PreFooterCTA
12. Footer

**Verlinkung („neuronales Netz"):**
- ↔ `/webdesign/[stadt]` (gleiche Stadt → andere Service)
- ↔ Nachbar `/ki-sichtbarkeit/[andere-stadt]`
- ↔ Blog-Artikel: `ki-sichtbarkeit-chatgpt-2026`, `chatgpt-optimierung-agentur`, `ki-sichtbarkeit-agentur-vergleich`, `aeo-agentur-deutschland`, `perplexity-seo-2026`
- ↔ `/sichtbarkeits-check` (KI-Check-Tool)
- ↔ `/preise` (Pricing-Anker für KI-Sichtbarkeit)
- Zurück-Links: bestehende `/webdesign/[stadt]`-Pages erhalten Link zur neuen `/ki-sichtbarkeit/[stadt]`

**Schema:**
- Service-Schema (KI-Sichtbarkeit, areaServed: Stadt)
- BreadcrumbList
- FAQPage
- LocalBusiness-Verknüpfung

---

## Hebel 2 — SEO × Stadt (13 Pages)

**Route:** `/seo/[stadt]`
**Money-Keywords:** „SEO Agentur Koblenz", „SEO-Optimierung Frankfurt"
**Städte:** identisch zu Hebel 1
**Struktur:** analog Hebel 1, Service-spezifisch SEO
**Verlinkung:** + Zurück-Links von Hebel-1-Pages

---

## Hebel 3 — Service-Hub-Pages (4 Pages)

**Routen:**
- `/webdesign` — Hub für 13 Webdesign-Stadt-Pages + Unternehmenswebsite + Landingpage + Relaunch
- `/ki-sichtbarkeit` — Hub für 13 KI-Sichtbarkeit-Stadt-Pages
- `/seo` — Hub für 13 SEO-Stadt-Pages
- `/relaunch` — Service-Page Webseiten-Relaunch

**Aufbau pro Hub:**
1. Hero (Service-Erklärung + USP)
2. Methode-Section (WSM-Methode-Auszug)
3. „Was du bekommst" (Service-Deliverables)
4. Städte-Grid (alle Stadt-Pages dieses Services)
5. Verwandte Blog-Artikel (Cluster für den Service)
6. Pricing-Anker (`/preise`)
7. FAQ (8–10 Items)
8. PreFooterCTA
9. Footer

**Verlinkung:** Hub linkt zu allen Stadt-Pages + alle Stadt-Pages linken zurück zum Hub.

---

## Gesamtoutput

**30 neue Money-Keyword-Pages**, vollständig vernetzt:
- 13 × KI-Sichtbarkeit-Stadt
- 13 × SEO-Stadt
- 4 × Service-Hubs (inkl. Webdesign-Hub und Relaunch-Page)

**Backlink-Aufbau zwischen eigenen Pages:** Jede Stadt-Page linkt zu 3 anderen (Nachbar-Stadt + andere Service-Variante derselben Stadt + Hub). Hubs linken zu allen 13 Stadt-Pages des jeweiligen Services. Bestehende Webdesign-Stadt-Pages erhalten Links zu den neuen KI-Sichtbarkeit- + SEO-Pages der gleichen Stadt.

---

## Verbindliche Bau-Regeln

Siehe `~/.claude/projects/-Users-albertipgefer/memory/feedback_wsm_page_building_rules.md` — Pflichtregeln für JEDE Page:
- Design-System strikt wiederverwenden
- Du-Form, WSM-Wording, keine Ads-Sprache
- Vollverlinkung („neuronales Netz")
- Mobil + iPad + Desktop optimiert
- Schema.org (Service, BreadcrumbList, FAQPage)
- Build muss grün sein, Selbst-Review am Ende
