# Aakif Shaikh — Portfolio

An interactive personal portfolio: a quiet typographic hero, scroll-driven
reveals throughout, a draggable horizontal rail for the work, and a reactive
2D canvas layer of drifting light behind the whole page.

Built with **no build step**. Plain ES modules, plain CSS, libraries vendored
locally. There is no `npm install`, no bundler and no Node requirement.

---

## Running it

The site uses ES modules, which browsers refuse to load over `file://`. It has
to be served over HTTP. A one-file Python server is included:

```bash
python serve.py
```

Then open <http://localhost:5173>. Pass a port to use a different one
(`python serve.py 8080`). On Windows you can also double-click `start.bat`.

---

## Editing the content

**Everything the site says lives in one file: [`src/data/content.js`](src/data/content.js).**

Change the text there and reload — no other file needs touching. It covers your
name and title, the rotating hero roles, the about copy, the animated metric
counters, every job, every project card, certifications,
education, languages, the contact block, the marquee keywords and the nav.

### A note on the removed Capabilities section

The standalone skills/Capabilities section was removed — the same
technologies already appear as tags on every job and project card. The data
is still in `content.js` under `skills`, with a comment explaining exactly
what to restore if you want it back.

### Two things to fill in before publishing

1. **`meta.email`** is currently `hello@example.com`. Replace it with the
   address you actually want shown. It is deliberately not your work address —
   putting an email on a public page invites scraping, so pick one you are
   happy to publish.
2. **`meta.resumeUrl`** is empty. Drop a PDF into `assets/` and set this to
   e.g. `'assets/Aakif_Shaikh_Resume.pdf'` — a Résumé tile then appears in the
   contact grid automatically.

Your phone number is intentionally not on the site anywhere.

---

## Project layout

```
index.html              markup shell — section scaffolding only, no copy
serve.py                zero-dependency static server
start.bat               Windows convenience launcher

src/data/content.js     ← ALL site content lives here
src/css/
  base.css              design tokens, reset, cursor, preloader, grain
  layout.css            shell, header, menu, ticker, buttons, footer
  sections.css          hero, metrics, work rail, certs, timeline, contact
src/js/
  main.js               boot sequence
  render.js             builds the DOM from content.js
  canvasFx.js           2D background: light fields, pointer trail, dot grid
  scroll.js             Lenis smooth scroll + every ScrollTrigger animation
  ui.js                 preloader, custom cursor, magnetic buttons, menu, clock

vendor/                 GSAP, ScrollTrigger, Lenis (pinned copies)
assets/                 drop your résumé PDF / images here
```

---

## The removed 3D hero

The site originally opened with a WebGL particle field that morphed between a
sphere, a torus knot and a cube lattice. It was removed because it was tiring
to look at — a large additive particle field on a dark page glares, and no
amount of desaturation fully fixed it.

The hero is now purely typographic. The only motion behind it is the soft
drifting light in `canvasFx.js`, which is deliberately low contrast.

The code for it (`src/js/hero3d.js` and `vendor/three.module.js`) was deleted
in a later commit. If you ever want it back, it is recoverable from this
repository's history.

---

## Design tokens

Colours, fonts and spacing are CSS custom properties at the top of
`src/css/base.css`. Changing `--cyan` / `--violet` / `--mint` / `--amber`
re-themes the whole site, including the project card accents. `--text-dim`
and `--text-faint` carry all the supporting copy and are tuned for contrast on
the near-black ground — check contrast before darkening either.

---

## Accessibility and fallbacks

- `prefers-reduced-motion: reduce` disables the 2D canvas and turns off smooth
  scrolling and the reveal animations. All content still appears, immediately.
- The Selected Work rail is a real horizontal scroller, not a scroll-jack:
  drag it, swipe it, use the arrows, press the left/right arrow keys once it
  has focus, or use a trackpad. Nothing hijacks your vertical scrolling.
- The custom cursor is suppressed on touch and coarse-pointer devices.
- The page is fully responsive down to ~320px, with a safe-area-aware header
  and footer.

---

## Deploying

It is a static site — no build output to generate.

- **Netlify:** drag the whole folder onto the Netlify drop page.
- **Vercel:** `vercel --prod` from this directory, or import the repo and set
  the framework preset to "Other" with no build command.
- **GitHub Pages:** this repository is named `akcloudx.github.io`, so GitHub
  serves it automatically at <https://akcloudx.github.io> from the root of the
  `main` branch. Enable it once under Settings → Pages → Source → "Deploy from
  a branch" → `main` / `/ (root)`.
- **Any static host:** upload the folder as-is.

Only the Google Fonts stylesheet is fetched at runtime; everything else is
local, so the site works offline apart from the webfont (which falls back to a
system stack).
