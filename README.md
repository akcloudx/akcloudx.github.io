# akcloudx.github.io

Personal portfolio of **Aakif Shaikh** — Cloud Solutions Architect working in
multi-cloud architecture, FinOps and security design.

**→ [akcloudx.github.io](https://akcloudx.github.io)**

[![Pages](https://img.shields.io/badge/GitHub%20Pages-live-45e7b0?style=flat-square)](https://akcloudx.github.io)
![No build step](https://img.shields.io/badge/build%20step-none-52d5ff?style=flat-square)
![Dependencies](https://img.shields.io/badge/npm%20dependencies-0-8b6cff?style=flat-square)

---

## About this build

A static site with **no build step at all**. No `npm install`, no bundler, no
Node requirement — just ES modules, plain CSS and three animation libraries
vendored into the repository. Clone it and open it over any HTTP server and it
runs.

That constraint was deliberate. A portfolio should still build and deploy
years from now without a toolchain to resurrect first.

## Features

- **Typographic hero** with a per-character intro and a rotating role line
- **Smooth scrolling** (Lenis) driving masked heading reveals, animated metric
  counters, a filling timeline spine and a velocity-reactive marquee
- **Horizontally scrollable work rail** — drag, swipe, arrow buttons, arrow
  keys or trackpad, with scroll-snap. No scroll hijacking
- **Verifiable certifications** — each badge links to its issuer's public
  verification page (Credly for AWS, Microsoft Learn for Azure)
- **Reactive canvas layer** of drifting light, a custom cursor and magnetic
  buttons
- **Content-driven** — every word on the page comes from a single data file
- Full `prefers-reduced-motion` support, responsive down to ~320px

## Built with

| | |
|---|---|
| **Markup / styles** | Hand-written HTML, CSS custom properties, no framework |
| **Animation** | [GSAP](https://gsap.com) + ScrollTrigger |
| **Smooth scroll** | [Lenis](https://github.com/darkroomengineering/lenis) |
| **Type** | Space Grotesk, Inter, JetBrains Mono (Google Fonts) |
| **Hosting** | GitHub Pages |

Libraries are pinned and committed under `vendor/` rather than fetched from a
CDN, so the site has no third-party runtime dependency except the webfont —
which falls back to a system stack if it fails to load.

---

## Running locally

ES modules will not load over `file://`, so the site needs to be served over
HTTP. A dependency-free Python server is included:

```bash
python serve.py
```

Then open <http://localhost:5173>. Pass a port to use a different one
(`python serve.py 8080`). On Windows, `start.bat` starts the server and opens
a browser in one step.

Any static server works just as well — `npx serve`, `php -S`, whatever is to
hand.

## Project structure

```
index.html              section scaffolding — no copy lives here
serve.py                dependency-free static server for local development
start.bat               Windows launcher

src/data/content.js     ← every word on the site
src/css/
  base.css              design tokens, reset, cursor, preloader, grain
  layout.css            shell, header, menu, ticker, buttons, footer
  sections.css          hero, metrics, work rail, certifications, timeline
src/js/
  main.js               boot sequence
  render.js             builds the DOM from content.js
  scroll.js             Lenis + every scroll-driven animation
  ui.js                 preloader, cursor, magnetic buttons, menu, clock
  canvasFx.js           background canvas: light fields, pointer trail, grid

vendor/                 GSAP, ScrollTrigger, Lenis (pinned)
assets/                 certification badges
```

## Editing the content

All copy lives in [`src/data/content.js`](src/data/content.js) — name and
title, hero roles, about text, metric counters, every role and project,
certifications, education, contact details and navigation. Nothing else needs
touching to change what the site says.

Two fields progressively enable extra UI rather than requiring it:

| Field | Effect when set |
|---|---|
| `certifications[].items[].image` | Row renders as a badge card instead of a text line |
| `certifications[].items[].url` | Row becomes a link with a "Verify" affordance |
| `meta.resumeUrl` | A Résumé tile appears in the contact grid |

Leave any of them empty and that feature simply does not render — the site
never points at a missing file or a dead link.

## Design notes

Colours, type and spacing are CSS custom properties at the top of
`src/css/base.css`. Changing `--cyan` / `--violet` / `--mint` / `--amber`
re-themes the site including the project card accents.

`--text-dim` and `--text-faint` carry all supporting copy and are tuned for
contrast against the near-black background — worth re-checking contrast before
darkening either.

Certification badges sit in identical tiles. Vendors style badges by
credential level (AWS Foundational is slate where Associate is blue; Microsoft
Fundamentals has a white crown where Associate has grey), and a uniform frame
lets that difference read as information rather than inconsistency.

## Accessibility

- `prefers-reduced-motion: reduce` disables the background canvas and turns
  off smooth scrolling and reveal animations. All content appears immediately
- The work rail is a real scroller, operable by drag, swipe, buttons, arrow
  keys and trackpad — vertical scrolling is never hijacked
- The custom cursor is suppressed on touch and coarse-pointer devices
- Badge links carry descriptive `aria-label`s, and the "Verify" hint is shown
  permanently where hover is unavailable
- Layout is safe-area aware and responsive to ~320px

## Deploying

A static site with no build output to generate — deploying is uploading the
folder.

This repository is named `akcloudx.github.io`, so GitHub Pages serves it from
the root of `main` automatically. It works unchanged on Netlify, Vercel,
Cloudflare Pages or any static host.

---

## Credits

Certification badges are the property of Amazon Web Services and Microsoft,
shown here for credentials held by the site's author and linked to their
official verification pages.

GSAP is used under the [GSAP standard license](https://gsap.com/licensing/).
Lenis is MIT. The AWS vendor glyph comes from
[Simple Icons](https://simpleicons.org) (CC0).
