// Finds a local Chrome or Chromium for the scripts that render a PDF or PNG.
import { existsSync } from "node:fs";

const CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];

export function findChrome() {
  const found = CANDIDATES.find((p) => p && existsSync(p));
  if (!found) {
    console.error("Chrome not found. Set CHROME_PATH to a Chrome or Chromium binary.");
    process.exit(1);
  }
  return found;
}
