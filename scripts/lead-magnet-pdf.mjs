#!/usr/bin/env node
/**
 * Lead-Magnet PDF-Renderer.
 *
 * Liest den Markdown-Inhalt unter content/lead-magnet/11-marketing-fehler-mittelstand.md,
 * verpackt ihn in ein WSM-CI-HTML-Template und rendert via Chrome Headless als PDF.
 *
 * Output: public/lead-magnet/11-marketing-fehler-mittelstand.pdf
 *
 * Aufruf:  node scripts/lead-magnet-pdf.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import os from "node:os";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "content/lead-magnet/11-marketing-fehler-mittelstand.md");
const OUT_DIR = path.join(ROOT, "public/lead-magnet");
const OUT_PDF = path.join(OUT_DIR, "11-marketing-fehler-mittelstand.pdf");

const CHROME = process.env.CHROME_BIN
  || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// ─── Sehr leichter Markdown-Parser (für diesen einen Inhalt — kein Edge-Case-Festival) ──
function mdToHtml(md) {
  // Inline-Helper
  const inline = (s) =>
    s
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");

  const lines = md.split("\n");
  const out = [];
  let inList = false;
  let inCheck = false;

  function closeLists() {
    if (inList) { out.push("</ul>"); inList = false; }
    if (inCheck) { out.push("</ul>"); inCheck = false; }
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.replace(/\s+$/g, "");

    if (!line.trim()) { closeLists(); continue; }

    if (line.startsWith("# ")) {
      closeLists();
      out.push(`<h1>${inline(line.slice(2))}</h1>`);
    } else if (line.startsWith("## ")) {
      closeLists();
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith("### ")) {
      closeLists();
      out.push(`<h3>${inline(line.slice(4))}</h3>`);
    } else if (line.startsWith("---")) {
      closeLists();
      out.push("<hr/>");
    } else if (line.startsWith("> ")) {
      closeLists();
      out.push(`<blockquote>${inline(line.slice(2))}</blockquote>`);
    } else if (line.startsWith("- [ ] ")) {
      if (inList) { out.push("</ul>"); inList = false; }
      if (!inCheck) { out.push('<ul class="checklist">'); inCheck = true; }
      out.push(`<li><span class="cb"></span>${inline(line.slice(6))}</li>`);
    } else if (line.startsWith("- ")) {
      if (inCheck) { out.push("</ul>"); inCheck = false; }
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push(`<li>${inline(line.slice(2))}</li>`);
    } else if (line.startsWith("*") && line.endsWith("*") && line.length > 2) {
      closeLists();
      out.push(`<p class="italic-meta">${inline(line.slice(1, -1))}</p>`);
    } else {
      closeLists();
      out.push(`<p>${inline(line)}</p>`);
    }
  }
  closeLists();
  return out.join("\n");
}

const CSS = `
* { box-sizing: border-box; }
@page { size: A4; margin: 18mm 16mm 18mm 16mm; }
html, body { padding: 0; margin: 0; }
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 10.5pt;
  line-height: 1.55;
  color: #0a0a0a;
  background: #ffffff;
}

/* Cover */
.cover {
  display: flex; flex-direction: column; justify-content: space-between;
  height: 260mm; padding: 4mm 0;
  page-break-after: always;
}
.cover .top-row { display: flex; align-items: center; gap: 14px; }
.cover .logo {
  width: 56px; height: 56px; border-radius: 12px;
  background: #1663de;
  position: relative;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Inter', sans-serif; font-weight: 900; color: white; font-size: 30px;
  letter-spacing: -1.5px;
}
.cover .logo::after {
  content: ''; position: absolute; right: 7px; bottom: 7px;
  width: 9px; height: 9px; border-radius: 50%; background: #db6f16;
}
.cover .brand { font-size: 14pt; font-weight: 700; letter-spacing: -0.3px; }
.cover .brand small {
  display: block; font-size: 8.5pt; font-weight: 500; color: #71717a;
  text-transform: uppercase; letter-spacing: 2.2px; margin-top: 2px;
}

.cover .hero { margin-top: 38mm; }
.cover .eyebrow {
  display: inline-block; font-size: 9pt; font-weight: 700;
  text-transform: uppercase; letter-spacing: 2.5px; color: #1663de;
  border: 1px solid rgba(22, 99, 222, 0.3);
  padding: 6px 14px; border-radius: 999px;
  background: rgba(22, 99, 222, 0.06);
}
.cover h1 {
  font-size: 34pt; line-height: 1.05; letter-spacing: -1.2px;
  font-weight: 900; margin: 24px 0 14px 0; max-width: 95%;
}
.cover h1 .italic {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic; font-weight: 400; color: #1663de;
}
.cover .subtitle {
  font-size: 14pt; color: #52525b; max-width: 78%;
  line-height: 1.4; font-weight: 400;
}
.cover .lead-pitch {
  font-size: 10.5pt; color: #71717a; max-width: 78%; margin-top: 18mm;
  line-height: 1.6;
}

.cover .footer-block {
  border-top: 1px solid #e4e4e7;
  padding-top: 12px;
  display: flex; justify-content: space-between; align-items: flex-end;
  font-size: 9pt; color: #71717a;
}
.cover .footer-block .author { font-size: 10pt; font-weight: 600; color: #0a0a0a; }
.cover .footer-block .author small {
  display: block; font-weight: 500; color: #71717a; margin-top: 2px;
}

/* Content */
.content { padding-top: 4mm; }
.content h1 { display: none; }   /* Cover-Titel doppelt unterdrücken */
.content h2 {
  font-size: 18pt; line-height: 1.2; letter-spacing: -0.5px;
  margin: 24px 0 8px 0; font-weight: 900;
  page-break-after: avoid;
}
.content h2 + p { margin-top: 4px; }
.content h3 {
  font-size: 12.5pt; margin: 16px 0 6px 0; font-weight: 700;
  letter-spacing: -0.2px; color: #0a0a0a;
  page-break-after: avoid;
}
.content p { margin: 8px 0; color: #27272a; }
.content p strong { color: #0a0a0a; font-weight: 700; }
.content .italic-meta {
  font-style: italic; color: #71717a; font-size: 10pt;
  margin-top: -4px;
}
.content blockquote {
  border-left: 3px solid #1663de;
  background: #f4f7fc;
  padding: 10px 14px; margin: 14px 0;
  font-size: 10.5pt; color: #27272a;
  border-radius: 0 6px 6px 0;
}
.content ul {
  padding-left: 20px; margin: 8px 0;
}
.content ul li { margin: 4px 0; }
.content ul.checklist { list-style: none; padding-left: 4px; }
.content ul.checklist li {
  position: relative; padding-left: 26px; margin: 6px 0;
  font-size: 10.5pt;
}
.content ul.checklist .cb {
  position: absolute; left: 0; top: 3px;
  width: 14px; height: 14px;
  border: 1.5px solid #1663de; border-radius: 4px;
  background: white;
}
.content a {
  color: #1663de; text-decoration: underline;
  text-decoration-thickness: 1.2px; text-underline-offset: 2px;
  font-weight: 500;
}
.content code {
  background: #f4f4f5; border-radius: 4px; padding: 1px 5px;
  font-family: 'SF Mono', Menlo, monospace; font-size: 9.5pt;
}
.content hr {
  border: none; border-top: 1px solid #e4e4e7;
  margin: 26px 0 18px 0;
}

/* Fehler-Sektionen: H2 hervorheben */
.content h2 {
  color: #0a0a0a;
}
.content h2::before {
  content: ''; display: inline-block; width: 4px; height: 22px;
  background: linear-gradient(180deg, #1663de 0%, #db6f16 100%);
  vertical-align: -4px; margin-right: 10px; border-radius: 2px;
}

/* Checklist-Sektionen-Header (### Woche X) */
.content h3 {
  margin-top: 22px; color: #1663de;
  border-bottom: 1px solid #e4e4e7;
  padding-bottom: 4px;
}

/* Footer-Block am Ende */
.content .footer-end {
  margin-top: 30px; padding-top: 16px;
  border-top: 2px solid #0a0a0a;
  font-size: 9pt; color: #71717a;
}
`;

function htmlDocument(bodyHtml) {
  // Trenne Cover (alles bis erstes "---") vom Content
  const splitMarker = "</h1>\n<h2>Vorwort</h2>";
  // Pragmatischer Split: Wir nehmen die ersten paar Tags als Cover, danach Content
  // Stattdessen bauen wir das Cover hier komplett als Static-HTML.

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>Die 11 teuersten Marketing-Fehler im deutschen Mittelstand</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,400;1,700&display=swap" rel="stylesheet">
  <style>${CSS}</style>
</head>
<body>

  <!-- COVER -->
  <section class="cover">
    <div>
      <div class="top-row">
        <div class="logo">W</div>
        <div class="brand">
          Wohlstandsmarketing
          <small>Webdesign + KI-Sichtbarkeit · DACH</small>
        </div>
      </div>

      <div class="hero">
        <span class="eyebrow">Praktischer Leitfaden · 2026</span>
        <h1>
          Die <span class="italic">11 teuersten</span> Marketing-Fehler im deutschen Mittelstand
        </h1>
        <p class="subtitle">
          Was Geschäftsführer:innen und Marketing-Verantwortliche jeden Monat unnötig Geld kostet — und wie du es in 30 Tagen behebst.
        </p>
        <p class="lead-pitch">
          Ein Leitfaden für alle, die mehr planbare Anfragen wollen, ohne weiteres Budget zu verbrennen. 11 Fehler, 11 Lösungen, eine 30-Tage-Profi-Checkliste am Ende. Nichts aus dem Lehrbuch — alles aus der Praxis von dutzenden Mittelstands-Mandaten.
        </p>
      </div>
    </div>

    <div class="footer-block">
      <div>
        <div class="author">Albert Ipgefer</div>
        <small>Gründer · Wohlstandsmarketing</small>
      </div>
      <div>wohlstandsmarketing.de</div>
    </div>
  </section>

  <!-- CONTENT -->
  <section class="content">
    ${bodyHtml}
    <div class="footer-end">
      <strong>Wohlstandsmarketing</strong><br/>
      Vor der Loos 4e · 56130 Bad Ems · info@wohlstandsmarketing.de · wohlstandsmarketing.de<br/>
      © 2026 Wohlstandsmarketing — Alle Inhalte sorgfältig recherchiert. Keine Rechtsberatung.
    </div>
  </section>

</body>
</html>`;
}

async function renderToPdf(htmlPath, pdfPath) {
  return new Promise((resolve, reject) => {
    const args = [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--no-sandbox",
      "--virtual-time-budget=8000",
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ];
    const child = spawn(CHROME, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (d) => (stderr += d.toString()));
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Chrome exit ${code}: ${stderr}`));
    });
  });
}

(async () => {
  const md = await fs.readFile(SRC, "utf-8");

  // Erste H1 + Vorwort aus dem Markdown entfernen, weil wir das Cover separat bauen.
  // Wir behalten "## Vorwort" und alles danach.
  const idxVorwort = md.indexOf("## Vorwort");
  const contentMd = idxVorwort >= 0 ? md.slice(idxVorwort) : md;

  const bodyHtml = mdToHtml(contentMd);
  const html = htmlDocument(bodyHtml);

  const tmp = path.join(os.tmpdir(), `wsm-leadmagnet-${Date.now()}.html`);
  await fs.writeFile(tmp, html, "utf-8");
  await fs.mkdir(OUT_DIR, { recursive: true });

  console.log(`→ Rendering PDF via Chrome Headless …`);
  console.log(`  HTML:  ${tmp}`);
  console.log(`  PDF:   ${OUT_PDF}`);

  await renderToPdf(tmp, OUT_PDF);

  const stat = await fs.stat(OUT_PDF);
  console.log(`\n✓ PDF fertig (${(stat.size / 1024).toFixed(1)} kB)`);
  console.log(`  → ${OUT_PDF}`);
})();
