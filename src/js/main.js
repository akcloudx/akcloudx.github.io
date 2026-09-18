/* ============================================================================
   MAIN — boot order:
     1. render the DOM from content.js
     2. start the background canvas layer
     3. run the preloader, then play the hero intro
     4. wire up smooth scrolling and every scroll-driven animation
   ========================================================================== */

import { renderAll } from './render.js';
import { createCanvasFx } from './canvasFx.js';
import { initSmoothScroll, initScrollAnimations, playHeroIntro } from './scroll.js';
import {
  runPreloader, initCursor, initMagnetic, initCardGlow,
  initMenu, initHeader, initRoleRotator, initClock, initBackToTop,
} from './ui.js';

async function boot() {
  /* 1 ── content ──────────────────────────────────────────────────────── */
  const { heroChars } = renderAll();

  /* 2 ── background canvas ─────────────────────────────────────────────── */
  const fx = createCanvasFx(document.getElementById('fxCanvas'));

  /* 3 ── interface ────────────────────────────────────────────────────── */
  initCursor();
  initMagnetic();
  initCardGlow();
  initClock();

  const onScroll = initHeader();

  /* 4 ── preloader, then the reveal ───────────────────────────────────── */
  await runPreloader();

  const lenis = initSmoothScroll();
  initMenu(lenis);
  initBackToTop(lenis);

  playHeroIntro(heroChars);
  initRoleRotator();

  initScrollAnimations({ onScroll, lenis });

  // expose a small handle for debugging in the console
  window.__portfolio = { fx, lenis };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
