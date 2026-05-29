# TODO nach Digistore-Go-Live

Stellen, die nach Anlage der 5 Digistore-Produkte angefasst werden müssen,
damit die komplette Treppe sauber kaufbar ist.

## 1. Digistore-URLs einsetzen

Datei: `lib/products.ts` — Feld `digistoreUrl` (aktuell `null`) pro Produkt setzen.

| Produkt | Slug | Preis | Digistore-URL |
|---|---|---|---|
| Wohlstands-Guide | `wohlstands-guide` | 5 € | TODO |
| Erste KI-Webseite | `ki-webseite` | 19 € | TODO |
| Erste 3 Testkunden | `3-testkunden` | 27 € | TODO |
| Erster 1.000-€-Kunde | `1000-euro-kunde` | 49 € | TODO |
| Onboarding & Delivery | `onboarding-delivery` | 97 € | TODO |
| **Komplettpaket (Bundle)** | `komplettpaket` | **197 €** | TODO |

Sobald gesetzt → alle CTAs (Bio-Page Bundle-Card, /komplettpaket Hero+Mid+Final, 5 Einzel-Produktseiten) gehen automatisch live.

**Komplettpaket-spezifisch:**
- Digistore-Verkaufstext: `../../Personal Brand/monetization/digistore-verkaufstexte.md` → Sektion „Produkt 6"
- Digistore-Auto-Mail: `../../Personal Brand/monetization/digistore-auto-mails.md` → Sektion „Produkt 6"
- Cover (OG): `digistore-covers/cover-bundle-komplettpaket.png` (1280×720)
- Mockup (Hero): `digistore-covers/mockup-bundle-komplettpaket.png` (1600×1200)
- PDF-Anhänge: alle 5 Phase-PDFs aus den jeweiligen `phase-X-*/`-Ordnern

## 2. Phase 1 PDF: Folgeprodukte-Links umstellen

Datei: `../../Personal Brand/monetization/phase-1-online-fahrplan/wohlstands-guide-2026.pdf`

Aktuell zeigen die 3 „Folgeprodukte"-Links direkt auf die Notion-Workspaces (= gratis lesbar).
Umstellen auf `https://start.wohlstandsmarketing.de/{slug}` (Verkaufsseiten).

PDF neu rendern via `phase-1-online-fahrplan/render-pdf.mjs`.

## 3. Notion-PDFs in Phase 3 + 4 austauschen

Aktuelle Versionen liegen lokal in den Phase-Ordnern:
- Phase 3: `deine-ersten-3-referenzen.pdf` + `referenz-vereinbarung.pdf`
- Phase 4: `dein-erster-1000-euro-kunde.pdf` + `angebot-beispiel.pdf`

Albert manuell in Notion via `/file` ersetzen.

## 4. Phase 4 Notion: Phase-5-Link nachtragen

Aktuell Platzhalter „Link folgt". Sobald Phase 5 Notion live →
echten Public-Link einsetzen + Phase 4 PDF neu rendern + in Notion austauschen.

## 5. Cross-Phase Pitch-Links umstellen (KRITISCH)

Heute zeigen alle „nächste Phase"-Pitches in den PDFs + Notion-Workspaces
**direkt auf die Notion-Workspaces** (gratis lesbar). Müssen auf Verkaufsseiten zeigen.

Betroffen:
- Phase 1 PDF — „Folgeprodukte"-Sektion
- Phase 2 Notion-Parent — Pitch auf Phase 3
- Phase 3 Notion-Parent + PDF — Pitch auf Phase 4
- Phase 4 Notion-Parent + PDF — Pitch auf Phase 5

→ jeweils auf `start.wohlstandsmarketing.de/{slug}`

## 6. Bio-Link in Social-Profile eintragen

- TikTok Profil-URL → `https://start.wohlstandsmarketing.de`
- Instagram Profil-URL → `https://start.wohlstandsmarketing.de`

## 7. Test-Kauf End-to-End

Wohlstands-Guide (5 €) selbst kaufen → prüfen ob:
- Digistore-Checkout läuft
- Auto-Mail mit PDF-Download ankommt
- Cover-Bild + Mockup wie erwartet
- PDF-Inhalt aktuell ist
