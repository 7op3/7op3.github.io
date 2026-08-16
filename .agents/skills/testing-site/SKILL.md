---
name: testing-site
description: Build, serve, and test the Jekyll (minima) personal site end-to-end. Use when verifying page rendering, nav, or link changes on 7op3.github.io (seven.is-a.dev).
---

# Testing the personal site (Jekyll, custom layout)

Static site built with Jekyll with a custom hand-rolled layout (Web 2.0 gloss,
2007–2010 era) — no theme gem. Content lives as Markdown at the repo root
(`index.md`, `socials.md`, `recs.md`); nav order is set by `header_pages` in
`_config.yml`.

## Setup / local run

Ruby may not be preinstalled. If `ruby`/`bundle` are missing:

```bash
sudo apt-get update -qq && sudo apt-get install -y ruby-full build-essential zlib1g-dev
sudo gem install bundler
```

Then from the repo root:

```bash
bundle config set --local path 'vendor/bundle'
bundle install
bundle exec jekyll build            # sanity check the build
bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

Open http://localhost:4000. The local build closely matches GitHub Pages
because the `Gemfile` pins the `github-pages` gem. A Cloudflare Pages preview
also builds per-PR (shows up as a CI check).

Note: backgrounding `jekyll serve` inside a one-shot shell can kill it when the
shell exits. Launch it in a detached subshell, e.g.
`(bundle exec jekyll serve ... > /tmp/jekyll.log 2>&1 &)`, then `curl` the port
to confirm it's up.

## What to verify (golden path)

- **Home `/`**: Web 2.0 styling applied (glossy gradient header top, nav pills
  top-right, white rounded content panel), not bare unstyled HTML. Tab title
  `Home | Seven`.
- **Nav + pages**: `/socials/` and `/recs/` load with their headings.
- **External links** on `/socials/`: check hrefs in the DOM, not just text —
  YouTube `https://youtube.com/@7op3`, Twitter `https://twitter.com/shockhorrors`.
- **Images**: `/recs/` embeds `imgs/whoag.png`; confirm it renders (not a broken
  icon).
- Use the annotated DOM from the browser tool to read `href`/`src` attributes
  precisely rather than eyeballing the screenshot.

## Devin Secrets Needed

None — the site is public and testing is entirely local.
