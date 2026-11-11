# 7op3.github.io

Personal site of Amelia — [seven.oops.wtf](https://seven.oops.wtf).

Built with [Eleventy](https://www.11ty.dev/) and a hand-authored CSS theme
("modern with retro anchors": glossy header, tactile buttons, 88×31s).
Integrations: live Last.fm scrobbles (via a Cloudflare Worker proxy) and
auto-updating AniList data (via a scheduled GitHub Action).

## Development

```bash
npm install        # install dependencies (Node only — no Ruby anymore)
npm run dev        # build + local dev server with watch
npm run build      # build the site to _site/
npm run clean      # remove _site/
npm run lint       # run pre-commit hooks across all files
```

## Structure

- `site/` — everything that becomes the website
  - `*.md` — content pages (home, socials, recs, projects, contact, anilist, 404)
  - `feed.liquid` — Atom feed (available at `/feed.xml`, currently empty until posts exist)
  - `_layouts/` — base, home and page layouts
  - `_includes/` — head, header, footer, sidebar, AniList item partials
  - `_data/anilist.json` — AniList data, refreshed every 6 hours by GitHub Actions
  - `assets/` — `main.css` (the single stylesheet, hand-authored),
    `lastfm.js` (sidebar Listening widget), favicons
- `src/index.js` — Cloudflare Worker proxying Last.fm for the Listening widget
- `eleventy.config.mjs` — Eleventy config, global site data, Liquid filter shims
- `.github/workflows/update-anilist.yml` — refreshes `site/_data/anilist.json`

## Deploy

The site is deployed with **Cloudflare Pages** (project `sevens`):

- Pushes to `main` build and deploy automatically (build command
  `npx @11ty/eleventy`, output `_site`)
- Other branches get preview deployments; PR comments are enabled
- The custom domain `seven.oops.wtf` is attached to the Pages project
- The AniList data bot pushes to `main` every 6 hours, which also triggers
  a production redeploy

GitHub Actions is only used for the AniList data refresh, not deploys.

## Cloudflare Worker (Last.fm proxy)

```bash
npm run worker:dev      # run locally
npm run worker:deploy   # deploy
```

The `LASTFM_API_KEY` secret must be set in the Cloudflare dashboard. The worker's
CORS allowlist includes `https://seven.oops.wtf` and `http://localhost:4173` for
local dev.

## Notes

- The theme uses CSS custom properties for light/dark; `[data-theme="dark"]`
  in `site/assets/main.css` is the only place colors change. The toggle button
  persists the choice in `localStorage` and falls back to the OS preference.
- To add a nav page: create a page in `site/`, then add a link in
  `site/_includes/header.liquid`.
