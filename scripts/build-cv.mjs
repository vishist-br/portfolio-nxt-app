// Renders cv/cv.md to public/cv.pdf, the file behind every "Download CV" button.
// Usage: npm run cv        Needs a local Chrome; see scripts/chrome.mjs.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { marked } from "marked";
import { findChrome } from "./chrome.mjs";

const root = join(import.meta.dirname, "..");
const markdown = readFileSync(join(root, "cv", "cv.md"), "utf8");
const title = markdown.match(/^# (.+)$/m)?.[1] ?? "CV";

const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>${title} — CV</title><style>
  @page { size: A4; margin: 13mm 15mm; }
  * { box-sizing: border-box; }
  body { font: 9.6pt/1.42 "Helvetica Neue", Helvetica, Arial, sans-serif; color: #16170f; margin: 0; }
  h1 { font-size: 23pt; letter-spacing: -0.02em; margin: 0 0 2pt; }
  h1 + p { font-size: 11pt; margin: 0 0 3pt; }
  h1 + p + p { color: #44463c; margin: 0 0 8pt; }
  h2 { font-size: 9pt; letter-spacing: 0.12em; text-transform: uppercase; color: #3f6212;
       border-bottom: 0.6pt solid #c9cbbf; padding-bottom: 2.5pt; margin: 11pt 0 5pt; break-after: avoid; }
  h3 { font-size: 10.6pt; margin: 8pt 0 0; break-after: avoid; }
  h3 + p { color: #44463c; margin: 1pt 0 4pt; }
  p { margin: 0 0 4pt; }
  ul { margin: 2pt 0 5pt; padding-left: 13pt; }
  li { margin-bottom: 2.5pt; break-inside: avoid; }
  a { color: inherit; text-decoration: underline; text-decoration-color: #a3a69b; text-underline-offset: 1.5pt; }
  table { width: 100%; border-collapse: collapse; }
  thead { display: none; }
  td { vertical-align: top; padding: 1.5pt 0; }
  td:first-child { width: 31mm; font-weight: 600; padding-right: 8pt; }
</style><body>${marked.parse(markdown)}</body></html>`;

const dir = mkdtempSync(join(tmpdir(), "cv-"));
const page = join(dir, "cv.html");
const out = join(root, "public", "cv.pdf");
writeFileSync(page, html);
execFileSync(findChrome(), [
  "--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${out}`, pathToFileURL(page).href,
], { stdio: "ignore" });
console.log(`Wrote ${out}`);
