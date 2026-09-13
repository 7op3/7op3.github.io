# Personal Site Development Guide

This is a Jekyll-based personal site with a custom Web 2.0 skeuomorphic theme.

## Development Setup

### Prerequisites
- Ruby (for Jekyll)
- Node.js (for Cloudflare Worker development)
- Bundler (`gem install bundler`)
- Pre-commit (optional, for code quality checks)

### Installation

```bash
# Install Ruby dependencies
bundle install

# Install Node dependencies
npm install

# Install pre-commit hooks (optional)
pip install pre-commit
pre-commit install
```

## Development Commands

### Running the Site

```bash
# Using npm
npm run dev

# Using bundle directly
bundle exec jekyll serve --livereload
```

The site will be available at `http://localhost:4000`.

### Building

```bash
# Build the site
npm run build

# Or directly
bundle exec jekyll build
```

### Cleaning

```bash
# Clean build artifacts
npm run clean

# Or directly
bundle exec jekyll clean
```

### Cloudflare Worker (Last.fm Proxy)

```bash
# Run worker locally
npm run worker:dev

# Deploy worker
npm run worker:deploy
```

Make sure to set the `LASTFM_API_KEY` secret in the Cloudflare dashboard.

### Code Quality

```bash
# Run pre-commit hooks manually
npm run lint

# Or directly
pre-commit run --all-files
```

## Project Structure

- `index.md` - Home page
- `socials.md` - Social links page
- `recs.md` - Recommendations page with AniList integration
- `projects.md` - Projects portfolio
- `contact.md` - Contact information
- `anilist.md` - Full AniList collection page
- `_includes/` - Reusable Jekyll includes
- `_layouts/` - Page layouts
- `assets/main.scss` - Main stylesheet with Web 2.0 theme
- `assets/lastfm.js` - Last.fm widget script
- `src/index.js` - Cloudflare Worker for Last.fm API proxy
- `_data/anilist.json` - AniList data (updated by GitHub Actions)
- `.github/workflows/update-anilist.yml` - AniList data update workflow

## Key Features

- **Theme Toggle**: Light/dark mode with smooth transitions
- **Mobile Navigation**: Responsive hamburger menu
- **AniList Integration**: Auto-updated anime/manga lists with filtering
- **Last.fm Widget**: Shows currently playing music
- **Social Links**: Categorized social media links with icons
- **Performance**: Lazy loading, preconnect, caching headers
- **Accessibility**: Skip links, focus states, ARIA labels
- **Security**: CSP headers, CORS restrictions

## Verification Steps

When making changes, verify:

1. **Local Testing**: Run `npm run dev` and check all pages
2. **Theme Toggle**: Test light/dark mode switching
3. **Mobile Responsiveness**: Test on various screen sizes
4. **Dynamic Content**: Verify Last.fm and AniList widgets load correctly
5. **Navigation**: Test all links and mobile menu
6. **Accessibility**: Test keyboard navigation and screen readers
7. **Code Quality**: Run `npm run lint` before committing

## Troubleshooting

### Jekyll Build Errors
- Run `bundle update jekyll` to update Jekyll
- Clear cache: `npm run clean`
- Check Ruby version compatibility

### Last.fm Widget Not Loading
- Verify Cloudflare Worker is deployed
- Check `LASTFM_API_KEY` secret is set
- Check browser console for errors
- Test worker endpoint directly

### AniList Data Not Updating
- Check GitHub Actions workflow status
- Verify AniList API rate limits
- Check `_data/anilist.json` file permissions

### Pre-commit Hook Failures
- Run `pre-commit run --all-files` to see all issues
- Fix issues manually or let hooks auto-fix where possible
- Skip hooks temporarily with `git commit --no-verify` (not recommended)
