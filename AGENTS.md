# Personal Site Development Guide

This is an Eleventy-based personal site with a hand-authored CSS theme
("modern with retro anchors"). Node only — no Ruby, no build step for CSS.

## Development Setup

### Prerequisites
- Node.js (for Eleventy and the Cloudflare Worker)
- Pre-commit (optional, for code quality checks)

### Installation

```bash
npm install

# Install pre-commit hooks (optional)
pip install pre-commit
pre-commit install
```

## Development Commands

```bash
npm run dev          # build + dev server (watch mode)
npm run build        # build to _site/
npm run clean        # remove _site/
npm run lint         # pre-commit hooks across all files
```

## Project Structure

- `site/` — the website input directory
  - `index.md`, `socials.md`, `recs.md`, `projects.md`, `contact.md`, `anilist.md` — content pages
  - `404.md` — not-found page, `feed.liquid` — Atom feed at `/feed.xml`
  - `_layouts/` — `base.liquid` (shell), `home.liquid`, `page.liquid`
  - `_includes/` — head, header, footer, sidebar, AniList partials
  - `_data/anilist.json` — AniList data (updated by GitHub Actions)
  - `assets/` — `main.css` (single hand-authored stylesheet), `lastfm.js`, favicons
- `eleventy.config.mjs` — config, global site data, Liquid filter shims
  (`relativeUrl`, `first_where` replaces Jekyll's `where_exp`, `jsonify`)
- `src/index.js` — Cloudflare Worker for the Last.fm API proxy
- `.github/workflows/deploy.yml` — Eleventy build → GitHub Pages deploy
- `.github/workflows/update-anilist.yml` — refreshes AniList data every 6 hours

## Key Features

- **Theme Toggle**: light/dark via CSS custom properties, persisted in
  `localStorage`, falls back to OS preference, no flash of wrong theme
- **Mobile Navigation**: hamburger menu below 760px
- **AniList Integration**: auto-updated data with client-side filtering
- **Last.fm Widget**: currently playing / last scrobbled track, with retry
- **Retro anchors**: glossy header bar, tactile round theme toggle,
  glossy pressable buttons, 88×31 sidebar buttons
- **Accessibility**: skip link, focus states, ARIA labels, reduced-motion support
- **Security**: CSP meta tag whitelisting the worker and AniList CDNs

## Templates notes (Eleventy + Liquid)

- Includes use `{% include "file.liquid", var: value %}` — LiquidJS includes
  share the parent scope, so `site.*` / `build.*` globals are visible inside
  them. `{% render %}` does NOT share scope; prefer `include`.
- Site-wide values (title, description, socials, url) live in
  `eleventy.config.mjs` under `addGlobalData("site", ...)`, not a data file.
- To add a nav page: create `site/<name>.md` with front matter
  (`layout: page.liquid`, `title`, `permalink`), then add the link in
  `site/_includes/header.liquid`.

## Verification Steps

1. `npm run dev` and check all pages
2. Theme toggle: light/dark switch, persistence, no flash
3. Mobile: hamburger menu opens/closes, layout collapses
4. Last.fm and AniList widgets load (check console for CSP errors)
5. All nav links and in-page links work; `/404.html` renders for unknown paths
6. `npm run lint` before committing

## Troubleshooting

- **Build fails with "duplicated else"** — an unclosed `{% if %}` in a Liquid
  template; check nesting of if/else/endif.
- **Assets 404 locally** — `site/assets` is copied via
  `addPassthroughCopy({ "site/assets": "assets" })`; don't remove it.
- **Last.fm widget not loading** — verify the worker is deployed and
  `LASTFM_API_KEY` is set; test the worker endpoint directly.
- **AniList data stale** — check the `update-anilist.yml` workflow runs;
  it writes to `site/_data/anilist.json`.
