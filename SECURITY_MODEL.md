# Security model — seven.oops.wtf (7op3/7op3.github.io)

_Threat model used by Devin security scans. Facts marked **(user)** come from
the site owner._

## System overview and trust boundaries

Personal static site built with Eleventy + Liquid, deployed by **Cloudflare
Pages** (project `sevens`) on every push to `main`. No user accounts, no
server-side state, no forms. Trust boundaries:

1. **Third-party data → build**: GitHub Actions fetch Last.fm (`user.*` APIs for
   `ropeburns`) and AniList (GraphQL, user `warps`) every 6 h, commit
   `site/_data/lastfm.json` / `anilist.json` to `main`, which triggers a
   production deploy. The content of those fields (track/artist/album names,
   URLs, image URLs, AniList titles/descriptions/cover URLs) is controlled by
   Last.fm/AniList and partly by anyone who can edit their metadata (e.g.
   scrobbled track names, AniList entries).
2. **Browser ↔ Last.fm proxy Worker**: `lastfm-proxy.unkwngly28.workers.dev`
   (`src/index.js`) is public and holds `LASTFM_API_KEY`.
3. **GitHub repo/Actions**: workflows run with `contents: write` and push to
   `main` (= production).

## Components

- **Site templates**: `site/*.md`, `site/feed.liquid`, `site/_layouts/`,
  `site/_includes/`, `eleventy.config.mjs`
- **Client scripts**: `site/assets/lastfm.js`, `site/assets/pagination.js`,
  inline `<script>` blocks in `site/anilist.md`, `site/lastfm.md`,
  `site/_includes/head.liquid`
- **Last.fm proxy Worker**: `src/index.js`, `wrangler.toml`
- **Data workflows**: `.github/workflows/update-anilist.yml`,
  `.github/workflows/update-lastfm.yml`
- **Dev tooling**: `.opencode/`, `.entire/`, `.agents/`,
  `.pre-commit-config.yaml`, `package.json`

## Entry points and who can reach them

- Every page on `seven.oops.wtf` (and Pages preview deployments) — anyone on the
  internet.
- Worker `GET /api/lastfm` (any path) — anyone; CORS reflects an allow-list
  including localhost origins, default `https://seven.oops.wtf`.
- Third-party metadata flowing through the data workflows into rendered HTML and
  inline JS (`{{ anilist | jsonify }}`, `{{ lastfm | jsonify }}` inside
  `<script>`; `item.url`/`item.image` into `href`/`src`).
- GitHub: `workflow_dispatch` (repo writers only), scheduled runs.

## Assets and data sensitivity

- Integrity of the published site (no injected script / defacement).
- `LASTFM_API_KEY` (Worker secret + Actions secret) — low-value key, quota
  abuse.
- GitHub repo write access / `GITHUB_TOKEN` with `contents: write` (push to
  `main` = deploy).
- No personal data beyond what is already public on Last.fm/AniList.
- **(user)** All of the above matter equally: site integrity, the
  `LASTFM_API_KEY`, and GitHub repo/Actions write access.

## Attacker profiles

- **(user)** Every attacker below matters; none is ruled out.
- Anonymous internet visitor (no login exists anywhere — settled by the code).
- Party controlling third-party metadata returned by Last.fm/AniList.
- Abuser of the public Worker (quota exhaustion, using it as a proxy).
- Supply chain: npm devDependencies, GitHub Actions (`actions/checkout@v4`,
  `actions/github-script@v7`, by tag), pre-commit hooks.

## Existing controls

- CSP meta tag in `site/_includes/head.liquid`: `script-src` allows
  `'unsafe-inline'`, so it does not stop inline-script injection.
- Liquid `escape` on most text outputs; `lastfm.js` uses `textContent`/DOM APIs,
  not `innerHTML`.
- Worker: GET/OPTIONS only, fixed upstream URL/user, generic error responses.
- AniList `strip_html` + `truncate` on descriptions.

## Out of scope / accepted risk

- **(user)** Nothing is out of scope or accepted risk (Worker quota abuse,
  localhost CORS origins and dev tooling included).

## Open questions

- **(user)** No infrastructure repository exists; Cloudflare Pages/Worker
  settings live in the Cloudflare dashboard and are not modelled (custom
  headers, WAF/rate-limit rules unknown).
