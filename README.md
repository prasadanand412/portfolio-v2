# prasad-anand-portfolio

## Project Overview
- **Name**: Prasad Anand — Portfolio ("Blueprint" direction)
- **Goal**: A personal single-page portfolio for Prasad Anand, a computer-engineering student and AI/ML intern in Pune, IN. Presents identity, background, skills, work history, and selected projects, with a way to get in touch.
- **Source**: Recreated from a Genspark Design handoff (SB-Git repo `designer2-20c40100-f553-43ec-a5cd-7831ee521685`, `design_handoff_portfolio_redesign`). Two directions were explored in the handoff ("Blueprint" and "Whitepaper") — **only Blueprint was built**, per explicit instruction.
- **Aesthetic**: Dark-first "engineer's notebook" look — grid-paper background, muted rust accent, JetBrains Mono + Fraunces typography, Jupyter-notebook-style hero with a live-typing terminal cell and inline SVG loss chart, CLI marquee strips between sections. Includes a light theme toggle.

## URLs
- **Local dev / sandbox preview**: served on port 3000 via `wrangler pages dev`
- **Production**: not yet deployed (see Deployment below)

## Data Architecture
- **Data Models**: None — fully static content, no database. All copy, skills, experience entries, and project data live directly in `src/index.tsx` as plain HTML.
- **Storage Services**: None required. No D1/KV/R2 bindings.
- **Data Flow**: Single Hono route (`GET /`) returns the full static HTML page. Static assets (`style.css`, `app.js`) are served from `public/static/` via `serveStatic`.

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
- **Contact form backend**: currently `event.preventDefault()` + a client-side "queued ✓" label swap. No email is sent. Needs wiring to a real endpoint (e.g. Formspree, Resend via a Hono API route, or a Supabase Edge Function).
- **Analytics**: none wired.
- **OG image**: meta tags reference title/description only; no static Open Graph image generated yet.
- **Self-hosted fonts**: currently loaded from Google Fonts CDN (JetBrains Mono + Fraunces). Could be self-hosted to remove the third-party dependency / FOUT.

## Recommended Next Steps
1. Wire the contact form to a real backend (Hono `/api/contact` route + email provider, or Supabase).
2. Decide on final favicon / OG image and add them.
3. Deploy to Cloudflare Pages (see below) and attach a custom domain if desired.
4. Optional: revisit the "Whitepaper" direction later if a second design is wanted — not built in this pass per explicit request.

## Design Tokens (Blueprint)
- **Colors (dark, default)**: `--bg #0d0e10` · `--bg-elev #131518` · `--ink #e8e6df` · `--ink-strong #ffffff` · `--muted #7a7873` · `--accent #c26a3a` (muted rust)
- **Colors (light theme)**: `--bg #f2efe8` · `--ink #17181a` · `--accent #a54e22`
- **Type**: JetBrains Mono (body/mono), Fraunces (headings/serif, italic accents)
- **Radii**: none — all rectangles, by design
- **Shadows**: none — depth via 1px rules and elevation tokens only
- Full token table in the original design handoff README.

## Deployment
- **Platform**: Cloudflare Pages (via Hono + Wrangler)
- **Status**: ❌ Not yet deployed to production — currently running in local/sandbox preview only
- **Tech Stack**: Hono (backend routing + static serving) + TypeScript + Vite + Wrangler, vanilla CSS/JS on the frontend (no framework, no build-time CSS pipeline)
- **Static assets**: `public/static/style.css`, `public/static/app.js`
- **Last Updated**: 2026-08-29
