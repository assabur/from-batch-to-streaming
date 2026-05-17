import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { modules } from './modules.mjs'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = resolve(rootDir, 'dist')
const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx'

rmSync(distDir, { recursive: true, force: true })
mkdirSync(distDir, { recursive: true })

for (const module of modules) {
  const outDir = resolve(distDir, module.slug)
  execFileSync(
    npxCmd,
    [
      'slidev',
      'build',
      module.entry,
      '--out',
      outDir,
      '--base',
      `/${module.slug}/`,
    ],
    {
      cwd: rootDir,
      stdio: 'inherit',
    },
  )
}

const cards = modules
  .map(
    (module) => `
      <a class="card" href="./${module.slug}/">
        <div class="eyebrow">Module</div>
        <h2>${module.title}</h2>
        <p class="subtitle">${module.subtitle}</p>
        <p class="description">${module.description}</p>
        <span class="cta">Open module</span>
      </a>`,
  )
  .join('\n')

const indexHtml = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Big Data Frameworks Courses</title>
    <style>
      :root {
        --ink: #18324b;
        --teal: #0f766e;
        --amber: #d97706;
        --paper: rgba(255, 255, 255, 0.84);
        --line: rgba(24, 50, 75, 0.14);
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        color: #243443;
        background:
          radial-gradient(circle at top left, rgba(217, 119, 6, 0.16), transparent 24%),
          radial-gradient(circle at top right, rgba(15, 118, 110, 0.16), transparent 28%),
          linear-gradient(180deg, #fcf8f1 0%, #f4edde 100%);
      }
      main {
        max-width: 1080px;
        margin: 0 auto;
        padding: 72px 24px 88px;
      }
      .pill {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.78);
        border: 1px solid rgba(15, 118, 110, 0.16);
        color: var(--teal);
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.03em;
        text-transform: uppercase;
      }
      h1 {
        margin: 18px 0 8px;
        font-size: clamp(2.6rem, 5vw, 4.8rem);
        line-height: 0.98;
        color: var(--ink);
      }
      .intro {
        max-width: 720px;
        font-size: 1.15rem;
        line-height: 1.65;
      }
      .grid {
        margin-top: 36px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
      }
      .card {
        display: block;
        text-decoration: none;
        color: inherit;
        background: var(--paper);
        border: 1px solid var(--line);
        border-radius: 24px;
        padding: 22px;
        box-shadow: 0 18px 40px rgba(24, 50, 75, 0.08);
        transition: transform 150ms ease, box-shadow 150ms ease;
      }
      .card:hover {
        transform: translateY(-3px);
        box-shadow: 0 24px 48px rgba(24, 50, 75, 0.12);
      }
      .eyebrow {
        font-size: 0.78rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(24, 50, 75, 0.64);
        font-weight: 700;
      }
      h2 {
        margin: 10px 0 10px;
        font-size: 1.7rem;
        line-height: 1.15;
        color: var(--ink);
      }
      .subtitle {
        margin: 0 0 14px;
        color: var(--teal);
        font-weight: 700;
      }
      .description {
        margin: 0;
        line-height: 1.6;
      }
      .cta {
        display: inline-block;
        margin-top: 18px;
        color: var(--amber);
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <main>
      <div class="pill">One project, multiple modules</div>
      <h1>Big Data Frameworks Courses</h1>
      <p class="intro">
        Cette page d'accueil regroupe les presentations du cours. Chaque module
        est deploye comme un sous-site Slidev dans le meme projet Netlify.
      </p>
      <section class="grid">
        ${cards}
      </section>
    </main>
  </body>
</html>
`

const redirects = [
  '/.well-known/* /.well-known/:splat 200',
  ...modules.map(
    (module) => `/${module.slug}/* /${module.slug}/index.html 200`,
  ),
  '/* /index.html 200',
].join('\n')

writeFileSync(resolve(distDir, 'index.html'), indexHtml)
writeFileSync(resolve(distDir, '404.html'), indexHtml)
writeFileSync(resolve(distDir, '_redirects'), redirects)
