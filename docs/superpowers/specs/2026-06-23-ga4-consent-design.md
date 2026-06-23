# GA4 + Consent-Gating — Design

**Datum:** 2026-06-23
**Projekt:** relaunch-next (wohlstandsmarketing.de)
**Status:** Abgestimmt, bereit für Implementierungsplan

---

## Ziel

Google Analytics 4 auf wohlstandsmarketing.de einbinden — primär als Bindeglied
ins Google-Ökosystem (Search Console, später Google-Ads-Conversion-Tracking für
Bestandskunden). Gleichzeitig die bestehende, aktuell **nicht funktionierende**
Consent-Architektur scharfschalten, sodass GA4, PostHog und Clarity DSGVO-konform
über den Cookie-Banner gesteuert werden.

KPIs und A/B-Tests laufen bewusst weiter über **PostHog** (nativ stärker als GA4);
GA4 ergänzt nur die Google-Datenebene.

## Ausgangslage (Ist-Zustand)

- **PostHog** (`components/PostHogProvider.tsx`): voll integriert, lädt aber
  **ohne** Consent-Prüfung.
- **Microsoft Clarity** (`components/ClarityAnalytics.tsx`): lädt ebenfalls ohne
  Consent-Prüfung.
- **CookieBanner** (`components/CookieBanner.tsx`): speichert die Entscheidung
  nur in `localStorage` (`wsm-cookie-consent`) — **niemand liest sie aus**. Der
  Banner ist damit reine Deko → bestehender TDDDG-§25-Verstoß.
- Kein Widerruf-Mechanismus (Consent ist nicht erneut aufrufbar).
- GA4 bisher nicht vorhanden.

## Entscheidungen (mit Begründung)

1. **GA4 wird ergänzt** — Grund: Google-Ökosystem (Search Console / Google Ads).
   KPIs + A/B-Tests bleiben bei PostHog.
2. **Voller Consent-Umbau** statt Insellösung — die Seite ist Agentur-Referenz
   und muss vorzeigbar sauber sein.
3. **Verhalten ohne Einwilligung (bewusste Risiko-Entscheidung des Inhabers):**
   - **GA4:** Google **Consent Mode v2 (advanced)**. gtag lädt immer, Default =
     `denied` → cookielose Pings auch ohne Einwilligung. Bei „Alle akzeptieren"
     → `update` auf `granted` (volle Messung inkl. Cookies).
   - **PostHog & Clarity:** laden **erst nach Einwilligung** (kein sauberer
     Cookieless-Modus vorhanden).
   - ⚠️ **Dokumentiertes Restrisiko:** Cookielose GA4-Pings übertragen weiterhin
     die IP-Adresse an Google (USA). Das ist personenbezogen und in DE rechtlich
     eine Grauzone — nicht garantiert abmahnsicher. Der Inhaber hat dies nach
     ausdrücklichem Hinweis bewusst gewählt (Option „B"), um mehr GA4-Daten zu
     erhalten. Alternative „kein Tracking ohne Consent" wurde verworfen.
4. **Keine granulare Kategorie-Auswahl** (YAGNI). Die bestehende
   Zwei-Button-Logik „Nur notwendige / Alle akzeptieren" ist rechtlich
   ausreichend und einfacher.

## Architektur

### Single Source of Truth: `lib/consent.ts`
Zentrales Consent-Modul (Framework-agnostisch, ohne React-Abhängigkeit im Kern):
- Liest/schreibt die Entscheidung im bestehenden Key `wsm-cookie-consent`
  (Format beibehalten: `{ decision: "accept" | "decline", at: ISOString }`).
- `getConsent(): "accept" | "decline" | null`
- `setConsent(decision)` — schreibt + benachrichtigt Abonnenten.
- `subscribe(cb)` / Event-Mechanismus (z. B. `CustomEvent` auf `window`), damit
  GA4, PostHog und Clarity auf Änderungen reagieren, ohne dass ein Reload nötig ist.
- `openCookieSettings()` — öffnet den Banner erneut (Widerruf/Änderung).

### `components/GoogleAnalytics.tsx` (neu)
- Lädt `gtag.js` für `G-Z8TF8WM9MF` (Measurement-ID via
  `process.env.NEXT_PUBLIC_GA_ID`).
- Setzt **vor** dem GA-Config Consent Mode v2 Defaults auf `denied`
  (`ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`).
- Bei vorhandener Einwilligung (`getConsent() === "accept"`) → `gtag('consent',
  'update', { ...granted })`. Reagiert auf Consent-Änderungen über das
  zentrale Modul.
- **Pageviews** bei jedem Routenwechsel (App Router, analog PostHog —
  `usePathname`, manuelles `page_view`-Event, da `gtag` mit SPA-Navigation
  sonst nichts mitbekommt).
- **Interne Routen ausgenommen** — gleiche Prefix-Liste wie PostHog
  (`/tools`, `/rechner`, `/outreach`, `/analytics`, `/finanzen`, `/angebot`).
  Prefix-Liste wird in ein gemeinsames Modul ausgelagert (z. B.
  `lib/tracking-routes.ts`), damit GA4 und PostHog dieselbe Quelle nutzen (DRY).

### `components/PostHogProvider.tsx` (Umbau)
- Init erst, wenn `getConsent() === "accept"`.
- Abonniert Consent-Änderungen → initialisiert nach nachträglicher Einwilligung,
  ohne Reload.
- Bestehende Event-Logik (Pageviews, Klick-/Scroll-Events) unverändert.

### `components/ClarityAnalytics.tsx` (Umbau)
- Lädt das Clarity-Script erst nach Einwilligung (analog).

### `components/CookieBanner.tsx` (Umbau)
- Buttons rufen `setConsent("accept" | "decline")` aus `lib/consent.ts`.
- Reagiert auf `openCookieSettings()` (erneutes Einblenden bei Widerruf).
- Bestehende UX (zwei Buttons, Link zur Datenschutzerklärung) bleibt.

### Widerruf-Einstieg
- Ein dezenter Link **„Cookie-Einstellungen"** im Footer und/oder auf
  `/datenschutz`, der `openCookieSettings()` auslöst. (Footer-Komponente beim
  Umsetzen lokalisieren.)

### `/datenschutz` (Text-Ergänzung)
- Neuer Abschnitt zu GA4: Anbieter (Google Ireland Ltd. / Google LLC, USA),
  Zweck, Rechtsgrundlage Art. 6 (1) a DSGVO (Einwilligung) bzw. Consent Mode,
  Datentransfer USA, Widerrufsmöglichkeit.
- **Entwurf durch Claude; finaler Rechtstext muss vom DPO/Anwalt geprüft werden.**

### Konfiguration / Env
- `NEXT_PUBLIC_GA_ID=G-Z8TF8WM9MF` in `.env.local` und in Vercel (Production +
  Preview). Eintrag in Vercel erfolgt durch den Inhaber oder per CLI nach
  Rückfrage.

## Komponenten-Übersicht

| Datei | Art | Aufgabe |
|---|---|---|
| `lib/consent.ts` | neu | zentraler Consent-Status + Pub/Sub + `openCookieSettings()` |
| `lib/tracking-routes.ts` | neu | gemeinsame Liste interner Routen (DRY) |
| `components/GoogleAnalytics.tsx` | neu | GA4 + Consent Mode v2 + Pageviews |
| `components/PostHogProvider.tsx` | Umbau | Init erst nach Consent |
| `components/ClarityAnalytics.tsx` | Umbau | Laden erst nach Consent |
| `components/CookieBanner.tsx` | Umbau | Buttons an Consent-Modul, Widerruf |
| Footer / `/datenschutz` | Umbau | „Cookie-Einstellungen"-Link |
| `app/layout.tsx` | Umbau | `<GoogleAnalytics />` einhängen |
| `app/datenschutz/page.tsx` | Umbau | GA4-Abschnitt (Entwurf) |
| `.env.local` | Umbau | `NEXT_PUBLIC_GA_ID` |

## Datenfluss

1. Seitenaufruf → `app/layout.tsx` rendert GA4 + PostHog + Clarity + Banner.
2. GA4 setzt Consent Mode Default `denied`, sendet cookielose Pings.
3. PostHog/Clarity warten auf Consent.
4. Besucher klickt im Banner:
   - **„Alle akzeptieren"** → `setConsent("accept")` → GA4 `consent update
     granted`, PostHog + Clarity initialisieren.
   - **„Nur notwendige"** → `setConsent("decline")` → Status bleibt; GA4 weiter
     cookieless, PostHog/Clarity bleiben aus.
5. Späterer Widerruf über „Cookie-Einstellungen" → Banner erneut. Erteilen
   („accept") greift live ohne Reload (Tools initialisieren via Pub/Sub).
   Echter Widerruf („accept" → „decline") löst einen Reload aus, da PostHog
   und Clarity kein sauberes Unload-API haben — danach lädt nichts mehr ohne
   Einwilligung, GA4 fällt auf cookieless zurück.

## Fehlerfälle / Edge Cases

- `localStorage` blockiert → wie bisher: Banner-Logik degradiert defensiv
  (kein Crash; Tools laden nicht / GA bleibt cookieless).
- `NEXT_PUBLIC_GA_ID` fehlt → GoogleAnalytics-Komponente rendert nichts (no-op),
  kein Fehler.
- Interne Routen → kein GA4/PostHog (bestehende Regel beibehalten).
- Doppel-Init verhindern (`gtag`/`posthog.__loaded`/Clarity-Guard).

## Testkriterien (manuell, da Tracking-Integration)

- Frischer Browser, keine Einwilligung: GA4-Requests sind cookieless (keine
  `_ga`-Cookies gesetzt); keine PostHog-/Clarity-Requests.
- Nach „Alle akzeptieren": `_ga`-Cookie vorhanden, GA4 Realtime zeigt Zugriff,
  PostHog + Clarity laden.
- Nach „Nur notwendige": keine `_ga`-Cookies, kein PostHog/Clarity.
- „Cookie-Einstellungen" öffnet Banner erneut; neue Entscheidung wirkt sofort.
- Interne Seiten (`/analytics`, `/finanzen` …): kein GA4/PostHog.
- GA4 Realtime/DebugView bestätigt Pageviews bei Client-Side-Navigation.

## Out of Scope

- Granulare Consent-Kategorien (einzelne Toggles).
- Google-Ads-Conversion-Events / Search-Console-Verknüpfung (separater Schritt,
  sobald GA4 Daten sammelt).
- Server-Side Tagging.
