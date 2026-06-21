# Design: Indexierung der Branchen×Service-Seiten lösen

**Datum:** 2026-06-21
**Status:** Entwurf zur Freigabe
**Kontext:** GSC meldet 264 URLs „Gefunden – zurzeit nicht indexiert" und 3 „Gecrawlt – nicht indexiert". Ziel: alle strategisch sinnvollen Branchen×Service-Seiten indexierbar machen.

---

## 1. Diagnose (datenbelegt)

### Was die GSC-Daten wirklich sagen
| Status | Seiten | Bedeutung |
|---|---|---|
| Gefunden – nicht indexiert | 264 | Crawl-Datum `1970-01-01` → **noch nie gecrawlt**. Crawl-Budget-/Discovery-Problem, kein Duplicate-Urteil. |
| Gecrawlt – nicht indexiert | 3 | `/webdesign`, `/seo/frankfurt`, `/?s={search_term_string}` |
| noindex | 2 | gewollt |
| Seite mit Weiterleitung | 1 | `http→https`, korrekt |

**Trend:** Sprung am 30.05. von 100 → 263 nicht-indexierte Seiten (Veröffentlichung der pSEO-Struktur). Indexiert stagniert bei ~45-48. Ursache: junge Domain + ~270 Seiten auf einen Schlag → Google rationiert Crawl-Budget.

**Wichtig:** Die GSC-Exporte enden am 12.06. Die Fixes #65 (Sitemap-Welle, lastModified) und #68 (lokale Optimierung) gingen erst am 16.06. live → der Bericht zeigt den Zustand *vor* den bisherigen Maßnahmen.

### Die technische Wurzel
Im Datenmodell existiert **kein Feld, das pro Kombination (Branche × Service) einzigartig ist**:
- Branchen-Block (`intro`, `usps`, `bullets`, branchen-`faqs`) ist identisch über alle Service-Seiten derselben Branche.
- Service-Block (`intro`, `deliverables`, service-`faqs`) ist identisch über alle Branchen desselben Service.
- Jede Kombi-Seite ist nur eine Rekombination zweier vorhandener Blöcke → für Google near-duplicate.

Zusätzlich: `generateStaticParams` erzeugt blind **30 Branchen × 9 Services = 270 Routen**, inkl. unsinniger Kombis (z. B. `web-apps/bestatter`). Keine Kuratierung.

---

## 2. Lösungsdesign — 3 Säulen

### Säule 1 — Kombi-einzigartiger Content (Haupthebel)
Neues Datenmodell für je-Kombination einzigartigen Inhalt. Pro Branche×Service-Seite mindestens:
- **1 einzigartiger Problem→Lösung-Absatz** — konkret über „dieser Service für genau diese Branche" (z. B. „Wie lokales SEO einem Friseursalon Termine bringt"), nicht generisch.
- **2-3 kombinations-spezifische Deliverables** — branchenkonkret.
- **2 kombinations-spezifische FAQs**.

Umsetzung als neues Feld, z. B. `content/industry-service/index.ts` mit Map-Key `"{branche}/{service}"`. Template fällt auf generischen Block zurück, solange kein Unique-Content existiert (→ solche Seiten bleiben aus Sitemap/Index, siehe Säule 2).

**Qualitätsregel:** Kein generischer KI-Füll-Text. Inhalte basieren auf den vorhandenen reichen Branchen-/Service-Daten und sind branchennah-konkret. Albert gibt jeden Batch frei.

### Säule 2 — Service-Kuratierung + content-gekoppelte Sitemap
1. **Service-Availability pro Branche:** neues Feld an `Industry` (z. B. `serviceSlugs: string[]`). Nur sinnvolle Kombis werden in `generateStaticParams` erzeugt. Reduziert thin-page-Flut und erhöht Relevanz je Seite.
2. **Sitemap koppelt an Content:** Eine Kombi kommt nur in die Sitemap, wenn sie (a) kuratiert ist UND (b) Unique-Content hat. Ersetzt die reine `WAVE_INDUSTRY_SERVICE_SLUGS`-Logik durch ein Content-Gate. Verhindert Wiederholung des Mai-Fehlers (Masse statt Klasse).
3. **Interne Verlinkung härten:** Jede indexierbare Kombi braucht echte eingehende Links von bereits indexierten Hubs (`/branchen`, `/branchen/[branche]`, Service-Hubs).
4. **IndexNow/Indexierung:** bestehenden IndexNow-Cron (#20) verifizieren; für Pilot-Seiten gezielt Indexierung in GSC anfordern.

### Säule 3 — Technische Quick-Wins
- `/?s={search_term_string}`: WordPress-Altlast aus dem alten Index. Quelle im Code prüfen; falls keine echte Route → in `robots.ts` ausschließen bzw. 410. (Kein eigener Schaden, aber Crawl-Budget-Müll.)
- `/seo/frankfurt`: gecrawlt-nicht-indexiert trotz Stadt-Route — Content-Tiefe/Canonical prüfen.
- `/webdesign`: Hub gecrawlt-nicht-indexiert — Canonical/Content prüfen.
- Canonicals & `lastModified`-Hygiene über alle Templates verifizieren (teils erledigt).

---

## 3. Vorgehen: Pilot zuerst

**Phase 0 — Technik (ohne Content-Risiko)**
- Datenmodell: `serviceSlugs` pro Branche + neues `industry-service`-Content-Modul.
- `generateStaticParams` + Template auf kuratierte Kombis + Unique-Content umstellen (mit Fallback).
- Sitemap-Logik auf Content-Gate umstellen.
- Säule-3-Quick-Wins.

**Phase 1 — Pilot (5 ICP-Branchen)**
- Handwerk, Steuerberater, Arztpraxen, Maschinenbau, Immobilienmakler vollständig mit Unique-Content befüllen (~25-30 Seiten).
- Albert prüft Qualität. Deploy. Indexierung in GSC anfordern.
- **2-4 Wochen Indexierung beobachten.**

**Phase 2 — Rollout**
- Funktioniert der Pilot (Seiten werden indexiert), restliche Branchen in Batches (je Branche freigeben) ausrollen.

---

## 4. Erfolgskriterien
- Pilot-Seiten wechseln in GSC von „Gefunden/Gecrawlt – nicht indexiert" zu „Indexiert" (Messung nach 2-4 Wochen).
- Keine neuen „Duplicate"-Meldungen für die Kombi-Seiten.
- Die 3 „gecrawlt-nicht-indexiert"-Altlasten verschwinden.

## 5. Bewusste Nicht-Ziele (YAGNI)
- Keine sofortige Befüllung aller 170+ Seiten (Pilot-Lerneffekt zuerst).
- Keine unsinnigen Kombis erzwingen (Kuratierung statt 30×9).
- Keine `lastModified`-Spielereien (würde Crawl-Signal entwerten).

## 6. Ehrliche Erwartung
Auch mit perfektem Content braucht Google bei junger Domain **mehrere Wochen** pro Welle. Dies baut die korrekte Basis — keine Sofort-Indexierung über Nacht.
