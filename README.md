# Paddle for Purpose

A one-page site telling the story of a youth platform tennis philanthropy
project: three clinics for over 120 middle schoolers, co-run with the #1
ranked platform tennis player in the country, that raised $7,000 — reinvested
through Kiva into 17 microloans for sustainable, low-plastic farming, and
ultimately donated to [water.org](https://water.org).

No build step, no dependencies. It's plain HTML/CSS/JS.

```
index.html                  the whole page
assets/css/styles.css       design tokens + all styles
assets/js/main.js           nav state, scroll reveals, count-up stats
assets/img/                 original SVG art (see "Swapping in real photos" below)
.github/workflows/pages.yml GitHub Pages deploy
```

## Running it locally

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Swapping in real photos

Every illustration stands in for a real photo and is marked with an HTML
comment right above it, e.g.:

```html
<!-- PHOTO SLOT: replace with a real clinic photo, assets/img/clinic-photo-1.jpg -->
<img src="assets/img/clinic-1.svg" alt="..." />
```

To use a real photo, drop the file into `assets/img/` and change the `src`
(and the `alt` text) on that one `<img>` tag. No other changes needed.

- **Hero background** (`.hero-media img` in `index.html`): wide landscape,
  ≥1920px, platform tennis court at dusk/night in winter.
- **Clinic tiles**: 4:3, ≥1200px wide, showing the clinics in action.

## Editing the numbers / copy

All stats live directly in `index.html` as plain text plus a
`data-count-to` attribute (e.g. `data-count-to="50"`), so the page reads
correctly with JavaScript off, and animates the same value up on scroll
when JS is on. Update both the visible number and the attribute together.

The Kiva section intentionally doesn't name specific countries or partner
farms — swap the three `.region-chip` entries in the Investment section for
real region/borrower details whenever that data is available.

## Deploying

A GitHub Actions workflow (`.github/workflows/pages.yml`) is already
wired up to deploy on push to `main` or
`claude/platform-tennis-impact-site-roaez4`. One-time setup: in the repo's
**Settings → Pages**, set **Source** to **GitHub Actions**. After that,
every push deploys automatically.
