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
- **Static assets**: `public/static/style.css`, `public/static/app.js` — copied verbatim into `dist/static/` on build
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
Visit `/` — that's the entire site (no other routes). Use the top nav or scroll to move between sections; the active nav link highlights based on scroll position. Click the theme toggle (top-right) to switch dark/light — the choice persists via `localStorage`. In the Projects section, use the filter buttons to narrow the grid by tag. The contact form is a **front-end stub only** — submitting it just changes the button label to "queued ✓"; no message is actually sent (see Not Yet Implemented below).

## Not Yet Implemented
- **Contact form backend**: currently `event.preventDefault()` + a client-side "queued ✓" label swap. No email is sent. If a real backend is wanted, this would need a small serverless function (Vercel Function) or a third-party form service (Formspree, Resend, etc.) — reintroducing minimal server-side code only for this feature, if desired.
- **Analytics**: none wired.
- **OG image**: meta tags reference title/description only; no static Open Graph image generated yet.
- **Self-hosted fonts**: currently loaded from Google Fonts CDN (JetBrains Mono + Fraunces). Could be self-hosted to remove the third-party dependency / FOUT.

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

## Deployment

### Vercel (current target)
- **Platform**: Vercel — static build, zero serverless functions
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Config**: `vercel.json` sets `buildCommand`, `outputDirectory`, and clean URLs; no `functions`/`rewrites` for an API are configured since there is no backend.
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
npm run preview   # vite preview --host 0.0.0.0 --port 3000 (via PM2/ecosystem.config.cjs in this sandbox)
```

- **Last Updated**: 2026-08-29 (converted from Cloudflare Pages/Hono to a static Vite build for Vercel)
