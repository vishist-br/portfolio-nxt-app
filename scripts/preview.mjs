// Serves the static export the way GitHub Pages does: under /portfolio-nxt-app.
// Usage: npm run build && npm run preview
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { createGzip } from "node:zlib";

const BASE = "/portfolio-nxt-app";
const ROOT = join(import.meta.dirname, "..", "out");
const PORT = Number(process.env.PORT ?? 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path === "/") {
    res.writeHead(302, { Location: `${BASE}/` }).end();
    return;
  }
  if (!path.startsWith(BASE)) {
    res.writeHead(404).end("Not found");
    return;
  }
  let file = join(ROOT, normalize(path.slice(BASE.length)));
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) {
    res.writeHead(404, { "Content-Type": TYPES[".html"] });
    createReadStream(join(ROOT, "404.html")).pipe(res);
    return;
  }
  const type = TYPES[extname(file)] ?? "application/octet-stream";
  // GitHub Pages gzips text responses; do the same so local measurements are comparable.
  if (/text|javascript|json|xml/.test(type) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
    res.writeHead(200, { "Content-Type": type, "Content-Encoding": "gzip" });
    createReadStream(file).pipe(createGzip()).pipe(res);
    return;
  }
  res.writeHead(200, { "Content-Type": type });
  createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Preview: http://localhost:${PORT}${BASE}/`));
