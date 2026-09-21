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
assets/img/                 clinic photos + SVG art (see "Swapping in real photos" below)
.github/workflows/pages.yml GitHub Pages deploy
```

## Running it locally

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Swapping in real photos

The clinic tiles in `index.html` already use real photos
(`assets/img/clinic-photo-1.webp`, `clinic-photo-2.webp`). The hero
background still stands in with an original SVG illustration
(`.hero-media img` in `index.html`, currently `assets/img/hero-court.svg`),
noted inside that file as a placeholder pending a real photo:

```html
<img src="assets/img/hero-court.svg" alt="" />
```

To use a real photo there, drop the file into `assets/img/` and change the
`src` (and `alt` text) on that `<img>` tag — wide landscape, ≥1920px,
platform tennis court at dusk/night in winter. No other changes needed.

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
