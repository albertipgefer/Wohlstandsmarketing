# Branchen×Service-Indexierung Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Branchen×Service-Seiten so umbauen, dass jede Kombination einzigartigen Inhalt trägt und nur kuratierte, content-vollständige Seiten in die Sitemap kommen — damit Google sie crawlt und indexiert.

**Architecture:** Neues `serviceSlugs`-Feld pro Branche kuratiert die Kombis (Ende von blind 30×9). Ein neues Content-Modul `content/industry-service/` liefert je-Kombination einzigartigen Inhalt (Angle-Absatz, Deliverables, FAQs). Template und Sitemap koppeln an dieses Modul: nur Kombis mit Unique-Content werden eingereicht/indexiert. Technische Altlasten (`/?s=`) werden ausgeschlossen.

**Tech Stack:** Next.js 16.2.6 (App Router), React 19, TypeScript, statisch generiert (`generateStaticParams`). Keine Test-Suite → Verifikation via `npm run build`, grep auf Build-Output und Live-Stichproben.

## Global Constraints

- Sprache: Deutsch, echte Umlaute (ä/ö/ü/ß), niemals ae/oe/ue als Ersatz.
- Domain-Konstante: `const SITE = "https://wohlstandsmarketing.de"` (bereits in Templates).
- `lastModified` NIE auf `new Date()` setzen — nutzt `CONTENT_REVISED` (Crawl-Signal nicht entwerten).
- Next.js 16: vor API-Nutzung ggf. `node_modules/next/dist/docs/` prüfen (siehe AGENTS.md).
- Kein generischer KI-Füll-Text. Kombi-Content muss branchennah-konkret sein.
- Jede Task endet mit grünem `npm run build` und einem Commit.
- Deploy/Live-Schaltung NICHT autonom — Albert gibt vor jedem Deploy frei.

---

## Phase 0 — Technik-Fundament (kein Content-Risiko)

### Task 1: Service-Kuratierung pro Branche

**Files:**
- Modify: `content/industries/types.ts` (Industry-Typ um `serviceSlugs` erweitern)
- Modify: `content/industries/index.ts` (Feld bei allen 30 Branchen ergänzen)
- Modify: `app/branchen/[branche]/[service]/page.tsx:20-24` (generateStaticParams kuratieren) und `:64-72` (404 für nicht-kuratierte Kombi)
- Modify: `app/branchen/[branche]/page.tsx:258` (Hub listet nur kuratierte Services)

**Interfaces:**
- Produces: `Industry.serviceSlugs: string[]` — Liste der für diese Branche angebotenen Service-Slugs (Teilmenge der 9 Service-Slugs).

- [ ] **Step 1: Typ erweitern**

In `content/industries/types.ts` im `Industry`-Type ergänzen (nach `faqs`):

```ts
  /** Welche Service-Slugs für diese Branche angeboten werden (kuratiert, nicht alle 9) */
  serviceSlugs: string[];
```

- [ ] **Step 2: serviceSlugs bei allen Branchen setzen**

Jede der 30 Branchen in `content/industries/index.ts` bekommt ein `serviceSlugs`-Array. Standard für die meisten Branchen (B2C-Dienstleister):

```ts
    serviceSlugs: ["unternehmenswebsite", "landingpage", "relaunch", "seo", "ki-sichtbarkeit"],
```

B2B/Industrie (maschinenbau, logistik, ingenieurbuero) ohne Landingpage-Fokus:

```ts
    serviceSlugs: ["unternehmenswebsite", "relaunch", "seo", "ki-sichtbarkeit", "content-marketing"],
```

onlineshop (kein klassisches lokales seo, dafür web-apps):

```ts
    serviceSlugs: ["unternehmenswebsite", "landingpage", "relaunch", "ki-sichtbarkeit", "web-apps"],
```

Regel: keine unsinnigen Kombis (z. B. `web-apps/bestatter`). Im Zweifel die 5 klassischen Services nehmen. Verbindlich für die 5 Pilot-Branchen:
- handwerk: `["unternehmenswebsite", "landingpage", "relaunch", "seo", "ki-sichtbarkeit"]`
- steuerberater: `["unternehmenswebsite", "relaunch", "seo", "ki-sichtbarkeit", "content-marketing"]`
- arztpraxen: `["unternehmenswebsite", "landingpage", "relaunch", "seo", "ki-sichtbarkeit"]`
- maschinenbau: `["unternehmenswebsite", "relaunch", "seo", "ki-sichtbarkeit", "content-marketing"]`
- immobilienmakler: `["unternehmenswebsite", "landingpage", "relaunch", "seo", "ki-sichtbarkeit"]`

- [ ] **Step 3: generateStaticParams kuratieren**

In `app/branchen/[branche]/[service]/page.tsx` ersetzen:

```ts
export async function generateStaticParams() {
  return industries.flatMap((i) =>
    i.serviceSlugs.map((slug) => ({ branche: i.slug, service: slug })),
  );
}
```

- [ ] **Step 4: 404 für nicht-kuratierte Kombis**

In derselben Datei in `IndustryServicePage`, nach `if (!industry || !svc) notFound();` ergänzen:

```ts
  if (!industry.serviceSlugs.includes(svc.slug)) notFound();
```

- [ ] **Step 5: Hub-Seite filtert Services**

In `app/branchen/[branche]/page.tsx` an der Stelle, wo `services.map(...)` die Service-Kacheln rendert (um Zeile 258), auf die kuratierten Services umstellen:

```ts
{services.filter((s) => industry.serviceSlugs.includes(s.slug)).map((s) => (
```

Ebenso das `itemListElement: services.map(...)` (um Zeile 75) auf die gefilterte Liste umstellen, damit das Breadcrumb/ItemList-Schema nur kuratierte Services listet.

- [ ] **Step 6: Build verifizieren**

Run: `npm run build`
Expected: Build erfolgreich. Im Output erscheinen weniger `/branchen/[branche]/[service]`-Routen als zuvor (kuratiert statt 30×9).

- [ ] **Step 7: Commit**

```bash
git add content/industries/ "app/branchen/"
git commit -m "feat(branchen): Service-Kuratierung pro Branche (serviceSlugs) statt blind 30x9

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Kombi-Content-Modul

**Files:**
- Create: `content/industry-service/types.ts`
- Create: `content/industry-service/index.ts`

**Interfaces:**
- Produces: `IndustryServiceContent` type; `getIndustryServiceContent(branche: string, service: string): IndustryServiceContent | undefined`.

- [ ] **Step 1: Typ anlegen**

`content/industry-service/types.ts`:

```ts
export type IndustryServiceContent = {
  /** Ein einzigartiger Problem→Lösung-Absatz für genau diese Branche×Service-Kombi (3-5 Sätze) */
  uniqueAngle: string;
  /** 2-3 kombinations-spezifische, branchenkonkrete Deliverables */
  deliverables: string[];
  /** 2 kombinations-spezifische FAQ-Items */
  faqs: { q: string; a: string }[];
};
```

- [ ] **Step 2: Index mit Getter anlegen (zunächst leer)**

`content/industry-service/index.ts`:

```ts
import type { IndustryServiceContent } from "./types";

export type { IndustryServiceContent } from "./types";

/**
 * Kombi-einzigartiger Content je Branche×Service.
 * Key-Format: "{brancheSlug}/{serviceSlug}".
 *
 * Nur Kombis, die hier einen Eintrag haben, gelten als "content-vollständig"
 * und werden in die Sitemap aufgenommen (siehe app/sitemap.ts). Kombis ohne
 * Eintrag rendern den generischen Fallback und bleiben aus dem Index.
 */
const industryServiceContent: Record<string, IndustryServiceContent> = {
  // Pilot-Inhalte folgen in Phase 1.
};

export const getIndustryServiceContent = (
  branche: string,
  service: string,
): IndustryServiceContent | undefined =>
  industryServiceContent[`${branche}/${service}`];

/** True, wenn die Kombi einen einzigartigen Content-Eintrag hat. */
export const hasIndustryServiceContent = (
  branche: string,
  service: string,
): boolean => Boolean(getIndustryServiceContent(branche, service));
```

- [ ] **Step 3: Build verifizieren**

Run: `npm run build`
Expected: Build erfolgreich (Modul wird noch nicht konsumiert).

- [ ] **Step 4: Commit**

```bash
git add content/industry-service/
git commit -m "feat(content): Datenmodul für kombi-einzigartigen Branchen-Service-Content

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Template konsumiert Kombi-Content

**Files:**
- Modify: `app/branchen/[branche]/[service]/page.tsx` (Import, Deliverables-Merge, FAQ-Merge, neue Angle-Section)

**Interfaces:**
- Consumes: `getIndustryServiceContent` aus Task 2; `Industry.serviceSlugs` aus Task 1.

- [ ] **Step 1: Import + Daten laden**

In `app/branchen/[branche]/[service]/page.tsx` Import ergänzen:

```ts
import { getIndustryServiceContent } from "@/content/industry-service";
```

In `IndustryServicePage` nach `const svc = getService(service);` und den notFound-Checks:

```ts
  const combo = getIndustryServiceContent(industry.slug, svc.slug);
```

- [ ] **Step 2: Deliverables & FAQs mergen**

Vorhandene Zeile `const faqs = [...svc.faqs, ...industry.faqs.slice(0, 3)];` ersetzen durch:

```ts
  const deliverables = combo
    ? [...combo.deliverables, ...svc.deliverables]
    : svc.deliverables;
  const faqs = combo
    ? [...combo.faqs, ...svc.faqs, ...industry.faqs.slice(0, 2)]
    : [...svc.faqs, ...industry.faqs.slice(0, 3)];
```

Im Deliverables-Rendering (`svc.deliverables.map(...)`, um Zeile 239) `svc.deliverables` durch `deliverables` ersetzen.

- [ ] **Step 3: Unique-Angle-Section rendern**

Direkt nach dem schließenden `</section>` des „WARUM (Branchen-Pain)"-Blocks (um Zeile 173) eine neue Section einfügen, die nur erscheint, wenn `combo` existiert:

```tsx
      {combo && (
        <section className="border-t border-[var(--border)] py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              {svc.shortName} für {industry.shortName} — im Detail
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[var(--text)]">
              {combo.uniqueAngle}
            </p>
          </div>
        </section>
      )}
```

- [ ] **Step 4: Build verifizieren**

Run: `npm run build`
Expected: Build erfolgreich. Da noch keine Kombi-Inhalte existieren, rendert jede Seite den Fallback (combo === undefined) — kein visueller Unterschied.

- [ ] **Step 5: Commit**

```bash
git add "app/branchen/[branche]/[service]/page.tsx"
git commit -m "feat(branchen): Template rendert kombi-einzigartigen Content mit Fallback

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Sitemap an Content koppeln

**Files:**
- Modify: `app/sitemap.ts:38-44` (WAVE-Set entfernen/ersetzen) und `:130-140` (industryServiceRoutes)

**Interfaces:**
- Consumes: `hasIndustryServiceContent` aus Task 2; `Industry.serviceSlugs` aus Task 1.

- [ ] **Step 1: Import + Content-Gate**

In `app/sitemap.ts` Import ergänzen:

```ts
import { hasIndustryServiceContent } from "@/content/industry-service";
```

Den Block `WAVE_INDUSTRY_SERVICE_SLUGS` (Zeilen 38-44) entfernen. Den Kommentar darüber kürzen auf den Hinweis, dass das Content-Gate jetzt steuert.

- [ ] **Step 2: industryServiceRoutes auf Content-Gate umstellen**

Den `industryServiceRoutes`-Block (um Zeile 131) ersetzen:

```ts
  // Nur Kombis mit einzigartigem Content kommen in die Sitemap (Content-Gate).
  // Verhindert das Einreichen dünner Seiten (Crawl-Budget bündeln).
  const industryServiceRoutes: MetadataRoute.Sitemap = industries.flatMap((i) =>
    i.serviceSlugs
      .filter((slug) => hasIndustryServiceContent(i.slug, slug))
      .map((slug) => ({
        url: `${SITE}/branchen/${i.slug}/${slug}`,
        lastModified: CONTENT_REVISED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  );
```

- [ ] **Step 3: Build + Sitemap-Inhalt verifizieren**

Run: `npm run build`
Dann lokal die generierte Sitemap prüfen (oder nach `npm start`):

Run: `grep -c "<loc>" .next/server/app/sitemap.xml.body 2>/dev/null || echo "via npm start prüfen"`
Expected: Build erfolgreich. Da noch kein Kombi-Content existiert, enthält die Sitemap **0** Branchen×Service-URLs (Content-Gate greift). Das ist korrekt — sie füllt sich in Phase 1.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(sitemap): Branchen-Service-URLs an Content-Gate koppeln statt fixe Welle

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Technische Quick-Wins

**Files:**
- Modify: `app/robots.ts` (Such-Query ausschließen)
- Verify only: Homepage-Canonical, `/seo/frankfurt`, `/webdesign`

- [ ] **Step 1: `/?s=`-Altlast in robots ausschließen**

In `app/robots.ts` die erste Regel ergänzen, sodass Such-Query-URLs (WordPress-Relikt) nicht gecrawlt werden:

```ts
      { userAgent: "*", allow: "/", disallow: ["/tools", "/*?s="] },
```

- [ ] **Step 2: Homepage-Canonical verifizieren**

Run: `grep -rn "canonical" app/page.tsx app/layout.tsx`
Expected: Die Startseite definiert einen self-canonical auf `/` (bzw. `metadataBase` + canonical). Falls nicht vorhanden, in der Startseiten-`metadata` ergänzen: `alternates: { canonical: "/" }`. Damit ist `/?s=...` eindeutig ein Alias der Homepage.

- [ ] **Step 3: /seo/frankfurt und /webdesign diagnostizieren (keine blinde Änderung)**

Run:
```bash
curl -s "https://wohlstandsmarketing.de/webdesign" | grep -io 'rel="canonical" href="[^"]*"'
curl -s "https://wohlstandsmarketing.de/seo/frankfurt" | grep -io 'rel="canonical" href="[^"]*"'
```
Expected: Beide zeigen einen self-canonical. Wenn ja → Ursache ist Crawl-Budget/junge Domain (keine Code-Änderung nötig, nur in GSC Indexierung anfordern). Wenn der Canonical auf eine andere URL zeigt → im Befund notieren und mit Albert klären. Ergebnis als Kommentar in den Commit-Body schreiben.

- [ ] **Step 4: Build + Commit**

Run: `npm run build`
Expected: erfolgreich.

```bash
git add app/robots.ts app/page.tsx
git commit -m "fix(seo): /?s=-Suchquery in robots ausschliessen + Homepage-Canonical

Diagnose /webdesign + /seo/frankfurt: <Ergebnis aus Step 3 eintragen>

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Phase 1 — Pilot-Content (5 ICP-Branchen)

> **Gate:** Phase 1 startet erst, wenn Phase 0 gebaut und von Albert freigegeben ist. Jede Branche wird einzeln von Albert inhaltlich freigegeben, bevor sie live geht.

### Task 6: Muster-Kombi als Qualitäts-Referenz (handwerk/seo)

**Files:**
- Modify: `content/industry-service/index.ts` (ersten Eintrag hinzufügen)

**Interfaces:**
- Consumes: `IndustryServiceContent` aus Task 2.

- [ ] **Step 1: Referenz-Eintrag schreiben**

In `content/industry-service/index.ts` in `industryServiceContent` einfügen. Dies ist die **Qualitäts-Messlatte** für alle weiteren Einträge — konkret, branchennah, kein generischer Marketing-Sprech:

```ts
  "handwerk/seo": {
    uniqueAngle:
      "Wer einen Handwerker braucht, sucht selten nach Markennamen — sondern nach „Heizung reparieren [Stadt]“ oder „Dachdecker in der Nähe“. Genau diese lokalen Suchanfragen entscheiden über volle Auftragsbücher. Wir bringen deinen Betrieb für die Leistungen und Orte nach vorn, die wirklich Aufträge bringen, statt für allgemeine Begriffe ohne Kaufabsicht. So kommen Anfragen von Kunden, die jetzt einen Handwerker suchen — nicht erst in einem halben Jahr.",
    deliverables: [
      "Keyword-Recherche nach Gewerk + Einzugsgebiet (z. B. „Badsanierung [Landkreis]“) statt generischer Begriffe",
      "Optimiertes Google Business Profile mit Leistungen, Fotos und Bewertungsstrategie für lokale Sichtbarkeit",
      "Lokale Landingpages für deine wichtigsten Gewerke und Orte",
    ],
    faqs: [
      {
        q: "Wie schnell ranke ich als Handwerker lokal bei Google?",
        a: "Für weniger umkämpfte Orts-Leistungs-Kombinationen sind erste Bewegungen oft in wenigen Wochen sichtbar. Stark umkämpfte Begriffe in Großstädten brauchen länger. Wir starten bewusst mit den Suchanfragen, bei denen du am schnellsten Aufträge gewinnst.",
      },
      {
        q: "Lohnt sich SEO, wenn ich ohnehin über Empfehlungen Aufträge bekomme?",
        a: "Empfehlungen schwanken und sind nicht planbar. Lokale SEO macht dich unabhängig: Wer dich empfohlen bekommt, googelt dich trotzdem — und wer ohne Empfehlung sucht, findet dich überhaupt erst. Beides zusammen füllt das Auftragsbuch verlässlicher.",
      },
    ],
  },
```

- [ ] **Step 2: Build + Render-Stichprobe**

Run: `npm run build`
Dann nach `npm start` (oder im Dev-Server):

Run: `curl -s "http://localhost:3000/branchen/handwerk/seo" | grep -o "Wer einen Handwerker braucht" | head -1`
Expected: Treffer — der Unique-Angle wird gerendert. Sitemap enthält jetzt genau diese eine Kombi-URL.

- [ ] **Step 3: Albert-Freigabe der Qualität**

Albert prüft `/branchen/handwerk/seo` visuell. Erst nach „passt" weiter.

- [ ] **Step 4: Commit**

```bash
git add content/industry-service/index.ts
git commit -m "content(handwerk): Unique-Content handwerk/seo als Qualitaets-Referenz

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 7: handwerk — restliche Services befüllen

**Files:**
- Modify: `content/industry-service/index.ts`

- [ ] **Step 1: Einträge für die übrigen handwerk-Kombis schreiben**

Für `handwerk/unternehmenswebsite`, `handwerk/landingpage`, `handwerk/relaunch`, `handwerk/ki-sichtbarkeit` je einen Eintrag nach dem Muster aus Task 6 — `uniqueAngle` (3-5 Sätze, spezifisch für Handwerk + diesen Service), 2-3 branchenkonkrete `deliverables`, 2 `faqs`. Keine Wiederholung des `seo`-Texts.

- [ ] **Step 2: Build + Stichprobe**

Run: `npm run build`
Expected: erfolgreich. Sitemap enthält jetzt 5 handwerk-Kombis.

- [ ] **Step 3: Albert-Freigabe + Commit**

```bash
git add content/industry-service/index.ts
git commit -m "content(handwerk): Unique-Content fuer alle Handwerk-Services

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 8: steuerberater — alle Services befüllen

**Files:**
- Modify: `content/industry-service/index.ts`

- [ ] **Step 1:** Einträge für `steuerberater/{unternehmenswebsite,relaunch,seo,ki-sichtbarkeit,content-marketing}` nach dem Muster. Branchenkontext: Mandantengewinnung, Vertrauen/Seriosität, Fachkräftemangel, Erklärungsbedürftigkeit der Leistungen.
- [ ] **Step 2:** `npm run build` (erfolgreich, Sitemap +5).
- [ ] **Step 3:** Albert-Freigabe + Commit `content(steuerberater): Unique-Content fuer alle Services`.

---

### Task 9: arztpraxen — alle Services befüllen

**Files:**
- Modify: `content/industry-service/index.ts`

- [ ] **Step 1:** Einträge für `arztpraxen/{unternehmenswebsite,landingpage,relaunch,seo,ki-sichtbarkeit}`. Branchenkontext: Online-Terminbuchung, Patientengewinnung, Heilmittelwerbegesetz-Sensibilität (keine Heilversprechen), Barrierefreiheit.
- [ ] **Step 2:** `npm run build` (erfolgreich, Sitemap +5).
- [ ] **Step 3:** Albert-Freigabe + Commit `content(arztpraxen): Unique-Content fuer alle Services`.

---

### Task 10: maschinenbau — alle Services befüllen

**Files:**
- Modify: `content/industry-service/index.ts`

- [ ] **Step 1:** Einträge für `maschinenbau/{unternehmenswebsite,relaunch,seo,ki-sichtbarkeit,content-marketing}`. Branchenkontext: B2B-Leadgenerierung, lange Sales-Zyklen, internationale Sichtbarkeit, technische Tiefe/Referenzen, Fachkräfte-Recruiting.
- [ ] **Step 2:** `npm run build` (erfolgreich, Sitemap +5).
- [ ] **Step 3:** Albert-Freigabe + Commit `content(maschinenbau): Unique-Content fuer alle Services`.

---

### Task 11: immobilienmakler — alle Services befüllen

**Files:**
- Modify: `content/industry-service/index.ts`

- [ ] **Step 1:** Einträge für `immobilienmakler/{unternehmenswebsite,landingpage,relaunch,seo,ki-sichtbarkeit}`. Branchenkontext: Eigentümer-Akquise (Verkäufer-Leads), Bewertungs-Landingpages, lokale Marktautorität, Provisionswert pro Lead.
- [ ] **Step 2:** `npm run build` (erfolgreich, Sitemap +5).
- [ ] **Step 3:** Albert-Freigabe + Commit `content(immobilienmakler): Unique-Content fuer alle Services`.

---

### Task 12: Pilot abschließen — Deploy & Indexierung anstoßen

**Files:** keine (Betrieb).

- [ ] **Step 1:** Finaler `npm run build` über den gesamten Pilot. Erwartung: ~25 Branchen×Service-URLs in der Sitemap, alle mit Unique-Content.
- [ ] **Step 2:** `git push` + PR nach `main`. Albert gibt Deploy frei (Vercel).
- [ ] **Step 3:** Nach Live-Schaltung: in GSC für die ~25 Pilot-URLs Indexierung anfordern (URL-Prüftool) bzw. IndexNow-Cron-Lauf verifizieren. Aktualisierte Sitemap in GSC neu einreichen.
- [ ] **Step 4:** Beobachtungsfenster 2-4 Wochen notieren. Erfolgskriterium: Pilot-URLs wechseln zu „Indexiert".

---

## Phase 2 — Rollout (separate Session)

Nach erfolgreichem Pilot: restliche 25 Branchen in Batches (je Branche: `serviceSlugs` final setzen → Kombi-Content schreiben → Build → Albert-Freigabe → Sitemap füllt sich automatisch via Content-Gate). Nicht Teil dieses Plans — eigener Plan, wenn der Pilot indexiert ist.

---

## Self-Review

**Spec-Abdeckung:**
- Säule 1 (Unique-Content) → Tasks 2, 3, 6-11 ✓
- Säule 2 (Kuratierung + content-gekoppelte Sitemap) → Tasks 1, 4 ✓
- Säule 2 (interne Verlinkung) → bestehende Cross-Links im Template bleiben; Hub-Filter Task 1 ✓
- Säule 3 (technische Quick-Wins, /?s=, Canonicals, /seo/frankfurt, /webdesign) → Task 5 ✓
- Pilot-first mit 5 ICP-Branchen → Phase 1, Tasks 6-12 ✓
- IndexNow/Indexierung anfordern → Task 12 ✓

**Placeholder-Scan:** Content-Tasks 8-11 geben Branchenkontext + Muster (Task 6) statt vollständigem Text vor — bewusst, da Content Albert-Freigabe je Branche braucht und Massentext im Plan gegen die „kein generischer Füll-Text"-Regel liefe. Technik-Tasks 1-5 enthalten vollständigen Code.

**Typ-Konsistenz:** `serviceSlugs` (Task 1) konsistent in 3, 4 genutzt. `getIndustryServiceContent`/`hasIndustryServiceContent` (Task 2) konsistent in 3, 4. `combo`-Variable konsistent in Task 3. ✓
