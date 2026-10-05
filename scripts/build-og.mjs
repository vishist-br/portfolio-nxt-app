// Renders public/og.png (1200x630), the image shown when the site is shared.
// Usage: npm run og        Needs a local Chrome; see scripts/chrome.mjs.
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { findChrome } from "./chrome.mjs";

const html = `<!doctype html><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #0b0c0a; color: #f2f3ee; padding: 72px 80px;
         font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; position: relative; overflow: hidden; }
  .grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px); background-size: 56px 56px; }
  .glow { position: absolute; right: -160px; top: -160px; width: 560px; height: 560px; border-radius: 50%;
          background: #c8f542; opacity: .22; filter: blur(120px); }
  .in { position: relative; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
  .eyebrow { font: 500 22px ui-monospace, Menlo, monospace; letter-spacing: .14em; text-transform: uppercase; color: #a6a99e; }
  h1 { font-size: 92px; line-height: .98; letter-spacing: -.035em; font-weight: 700; }
  h1 b { color: #c8f542; font-weight: 700; }
  .foot { display: flex; justify-content: space-between; font-size: 26px; color: #a6a99e; }
</style>
<div class="grid"></div><div class="glow"></div>
<div class="in">
  <div class="eyebrow">BR Vishist · Bengaluru</div>
  <h1>Senior engineer<br>building <b>AI products,</b><br>end to end.</h1>
  <div class="foot"><span>Senior Software Engineer — AI and Full-Stack</span><span>vishist-br.github.io</span></div>
</div>`;

const dir = mkdtempSync(join(tmpdir(), "og-"));
const page = join(dir, "og.html");
const out = join(import.meta.dirname, "..", "public", "og.png");
writeFileSync(page, html);
execFileSync(findChrome(), [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
  "--window-size=1200,630", `--screenshot=${out}`, pathToFileURL(page).href,
], { stdio: "ignore" });
console.log(`Wrote ${out}`);
