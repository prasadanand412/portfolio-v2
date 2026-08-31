# prasad-anand-portfolio

## Project Overview
- **Name**: Prasad Anand — Portfolio ("Blueprint" direction)
- **Goal**: A personal single-page portfolio for Prasad Anand, a computer-engineering student and AI/ML intern in Pune, IN. Presents identity, background, skills, work history, and selected projects, with a way to get in touch.
- **Source**: Recreated from a Genspark Design handoff (SB-Git repo `designer2-20c40100-f553-43ec-a5cd-7831ee521685`, `design_handoff_portfolio_redesign`). Two directions were explored in the handoff ("Blueprint" and "Whitepaper") — **only Blueprint was built**, per explicit instruction.
- **Aesthetic**: Dark-first "engineer's notebook" look — grid-paper background, muted rust accent, JetBrains Mono + Fraunces typography, Jupyter-notebook-style hero with a live-typing terminal cell and inline SVG loss chart, CLI marquee strips between sections. Includes a light theme toggle.

## Architecture / Tech Stack (Vercel static build)

This project was originally scaffolded on Hono + Cloudflare Pages, then **converted to a plain static Vite site for deployment on Vercel**. On inspection, the Hono layer had no actual server-side logic: it only did `serveStatic` for `/static/*` and returned one static HTML string from `GET /`. There were no API routes, no request-time data, and no Cloudflare bindings (D1/KV/R2) in use — so it was converted to a **standard static site** rather than a Vercel serverless-function project.

- **Framework**: Vite (static build only, no SSR/framework plugin)
- **Entry point**: `index.html` at the project root (standard Vite convention)
- **Static assets**: `public/static/style.css`, `public/static/app.js`, `public/static/fonts/*.woff2` (copied verbatim into `dist/static/` on build)
- **No backend / no API routes / no serverless functions** — this is a 100% static site
- **Output**: `npm run build` → `dist/` (`dist/index.html`, `dist/static/style.css`, `dist/static/app.js`)

## URLs
- **Local dev / sandbox preview**: served on port 3000 via `vite preview` (after `npm run build`)
- **Production**: not yet deployed — ready to deploy to Vercel (see Deployment below)

## Data Architecture
- **Data Models**: None — fully static content, no database. All copy, skills, experience entries, and project data live directly in `index.html`.
- **Storage Services**: None. No backend, no database, no cloud bindings of any kind.
- **Data Flow**: Static HTML file served as-is; a small vanilla JS file (`static/app.js`) handles all client-side interactivity (theme toggle, typing animation, project filter, scroll-based nav highlighting, contact-form UI stub).

## Sections (single long-scroll page, anchor nav)
1. **Top bar** (`.topbar`) — sticky, brand mark, nav links, status pill, theme toggle
2. **Hero** (`#work`) — name, role blurb, CTAs, interactive notebook-cell widget (bio code cell, loss-curve chart, live-typing command cell), coords strip
3. **About** (`#about`) — prose bio + inline SVG confusion-matrix figure
4. **Skills** (`#skills`) — 4 tiers of tech chips (daily driver / comfortable / exploring / foundations)
5. **Experience** (`#experience`) — 3 internship entries, reverse chronological
6. **Projects** (`#projects`) — filterable project grid (all / ml-nlp / systems / web): DocuSense, OilTrace, WellnessPlus, Blood Bank Management
7. **Contact** (`#contact`) — contact info (email/LinkedIn/GitHub/LeetCode/Codeforces) + a client-side-only contact form stub
8. **Footer** — quick links

CLI strips act as section dividers throughout, matching the "engineer's notebook" aesthetic.

## User Guide
Visit `/` — that's the entire site (no other routes). Use the top nav or scroll to move between sections; the active nav link highlights based on scroll position. The theme follows the OS setting (`prefers-color-scheme`) on first visit and keeps tracking OS changes until an explicit choice is made. Click the theme toggle (top-right) to override dark/light — the choice persists via `localStorage`. In the Projects section, use the filter buttons to narrow the grid by tag. The contact form has **no backend by design**: submitting composes a prefilled `mailto:` draft and hands it to the visitor's mail client, so nothing is stored or transmitted by this site.

## Not Yet Implemented
- **Contact form backend**: the form hands off to the visitor's mail client via `mailto:` rather than posting anywhere. Server-side delivery would need a Vercel Function or a form service (Formspree, Resend) - the only feature that would justify server-side code here.
- **Analytics**: none wired.
- **OG image**: meta tags reference title/description only; no static Open Graph image generated yet.

## Recommended Next Steps
1. Deploy to Vercel (see below).
2. If a real contact-form backend is wanted, add a single Vercel Function (`api/contact.ts`) or wire to Formspree/Resend — this is the only feature that would justify any server-side code in this project.
3. Decide on final favicon / OG image and add them.
4. Optional: revisit the "Whitepaper" direction later if a second design is wanted — not built in this pass per explicit request.

## Design Tokens (Blueprint)
- **Colors (dark, default)**: `--bg #0d0e10` · `--bg-elev #131518` · `--ink #e8e6df` · `--ink-strong #ffffff` · `--muted #7a7873` · `--accent #c26a3a` (muted rust)
- **Colors (light theme)**: `--bg #f2efe8` · `--ink #17181a` · `--accent #a54e22`
- **Type**: JetBrains Mono (body/mono), Fraunces (headings/serif, italic accents)
- **Radii**: none — all rectangles, by design
- **Shadows**: none — depth via 1px rules and elevation tokens only

## Fonts (self-hosted)

JetBrains Mono and Fraunces are vendored as woff2 in `public/static/fonts/` (latin +
latin-ext subsets, variable weight ranges), with the `@font-face` rules at the top of
`public/static/style.css`. No visitor request reaches `fonts.googleapis.com` or
`fonts.gstatic.com`, which removes a third-party dependency that cannot carry SRI and stops
disclosing every visitor's IP to Google.

`latin-ext` files only download if the page actually renders those codepoints, so a normal
English visit fetches ~200 KB of fonts and then caches them; two faces are preloaded in
`<head>`. Filenames are **not** content-hashed: if you regenerate them from the Google css2
API, rename them so caches cannot serve stale glyphs.

## Security headers & CSP

`vercel.json` sets response headers on every path: a strict `Content-Security-Policy` plus
HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Cross-Origin-Opener-Policy` and `Permissions-Policy`. The CSP is tight, so before editing:

- **`script-src` pins a sha256 of the one inline `<script>`** in `index.html` (the pre-paint
  theme resolver). Editing that block, including its whitespace, silently breaks theming in
  production. Run `npm run csp-hash` afterwards and paste the output into `script-src`.
- **`style-src` needs `'unsafe-inline'`** because the page uses `style="..."` attributes and
  `<style>` blocks inside the inline SVG figures. Removing those is the only way to drop it.
- **`img-src 'self'`** deliberately omits `data:` since nothing uses data-URI images today.
  Add it back if that changes.
- **`connect-src`** allows `https://api.github.com` for the hero's last-commit stamp.
- **`form-action 'self' mailto:`** allows the contact form's `mailto:` handoff.
- On **Vercel preview deployments** the injected Vercel toolbar may be blocked by
  `script-src 'self'`. Production is unaffected.

## Deployment


### Vercel (current target)
- **Platform**: Vercel — static build, zero serverless functions
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Config**: `vercel.json` sets `buildCommand`, `outputDirectory`, clean URLs, and the security headers described above; no `functions`/`rewrites` for an API are configured since there is no backend.
- **Deploy steps**:
  ```bash
  npm install -g vercel   # if not already installed
  vercel                  # first-time link + preview deploy
  vercel --prod           # production deploy
  ```
  Or connect the GitHub repo directly in the Vercel dashboard — it will auto-detect the Vite static build.
- **Status**: ❌ Not yet deployed to production — ready to deploy.

### Local preview
```bash
npm install
npm run build
npm run preview   # vite preview on localhost:4173
```

- **Last Updated**: 2026-08-31 (self-hosted fonts, OS-aware theme with pre-paint resolve, CSP + security headers, mailto contact handoff, real last-commit stamp, dead/duplicate assets removed)
