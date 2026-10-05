# Portfolio

The portfolio of BR Vishist, live at <https://vishist-br.github.io/portfolio-nxt-app/>.

Next.js (App Router, static export), TypeScript, Tailwind CSS and Framer Motion,
deployed to GitHub Pages by GitHub Actions.

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000/portfolio-nxt-app/>. The site lives under the
`/portfolio-nxt-app` base path locally too, so it behaves the same as on GitHub Pages.

To check the exact files that get deployed:

```bash
npm run build
npm run preview
```

## Edit the content

Every word on the site is in [`src/content/site.ts`](src/content/site.ts): hero, pillars,
case studies (including their diagrams), experience, skills and contact. The file is typed,
so a missing field fails the build instead of rendering a broken page.

Search that file for `todo:` to see the facts each case study is still missing. Those
notes are never rendered.

## Update the CV

Every "Download CV" button points at one file, `public/cv.pdf`. To publish a new
version, replace that file and push to `main`. Nothing else needs to change.

There are two ways to produce it:

1. **Drop in a PDF.** Export the CV from wherever you keep it and save it as
   `public/cv.pdf`.
2. **Edit the text and regenerate.** Change [`cv/cv.md`](cv/cv.md), then run
   `npm run cv`. This renders the Markdown to `public/cv.pdf` using your local Chrome.

The build in CI fails if `cv.pdf` is missing.

## Deploy

[`deploy.yml`](.github/workflows/deploy.yml) builds on every pull request and deploys on
every push to `main`. In the repository settings, Pages must have **Source: GitHub Actions**.

The base path is set in [`next.config.ts`](next.config.ts). If the site moves to a custom
domain, build with `NEXT_PUBLIC_BASE_PATH=""` and update `site.url` in the content file.

## Other scripts

| Command | What it does |
| --- | --- |
| `npm run typecheck` | Type-checks without building. |
| `npm run og` | Regenerates `public/og.png`, the link-preview image. |
