# seven.is-a.dev

My personal website, built with [Jekyll](https://jekyllrb.com/) with a custom
hand-rolled layout (brushed metal + glass skeuomorphic theme), hosted on GitHub
Pages.

Quick warning, this site has been made with the assistance of ai, so there are probable errors and the like.

## Editing

Pages are written in Markdown at the repo root:

- `index.md` — home page
- `socials.md` — links to my socials
- `recs.md` — recommendations

To add a page to the top nav, create a new `.md` file and add it to
`header_pages` in `_config.yml`.

Styling lives in `assets/main.scss`; page structure is in `_layouts/` and
`_includes/`.

## Running locally

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

## Last.fm widget

A Cloudflare Worker proxies the Last.fm API at `/api/lastfm`. The sidebar
loads track data client-side via that endpoint. Add your Last.fm API key as
the `LASTFM_API_KEY` Worker secret in the Cloudflare dashboard.
