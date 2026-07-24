# seven.is-a.dev

My personal website, built with [Jekyll](https://jekyllrb.com/) and the
[minima](https://github.com/jekyll/minima) theme, hosted on GitHub Pages.

Quick warning, this site has been made with the assistance of ai, so there are probable errors and the like.

## Editing

Pages are written in Markdown at the repo root:

- `index.md` — home page
- `socials.md` — links to my socials
- `recs.md` — recommendations

To add a page to the top nav, create a new `.md` file and add it to
`header_pages` in `_config.yml`.

## Running locally

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.
