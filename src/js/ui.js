/* ============================================================================
   UI — the interface layer: preloader, custom cursor, magnetic buttons,
        mobile menu, header behaviour, the hero role rotator and the clock.
   ========================================================================== */

import { content as C, splitChars } from './render.js';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ══════════════════════════════════════════════════════════ preloader ════ */

const LOADING_STEPS = [
  'initialising',
  'loading typefaces',
  'laying out sections',
  'almost there',
  'ready',
];

export function runPreloader() {
  const root = $('#preloader');
  const nameEl = $('#preloaderName');
  const countEl = $('#preloaderCount');
  const statusEl = $('#preloaderStatus');
  const barEl = $('#preloaderBar');

  // stagger the name characters
  const chars = splitChars(nameEl, C.meta.name);
  chars.forEach((ch, i) => { ch.style.animationDelay = `${i * 0.035}s`; });

  return new Promise((resolve) => {
    if (reduced()) {
      root.classList.add('is-done');
      resolve();
      return;
    }

    let value = 0;
    const started = performance.now();
    const MIN_MS = 1400;

    const timer = setInterval(() => {
      // ease toward 100 with a little irregularity so it feels real
      const remaining = 100 - value;
      value += Math.max(0.6, remaining * (0.04 + Math.random() * 0.05));
      if (value > 100) value = 100;

      countEl.textContent = String(Math.floor(value)).padStart(3, '0');
      barEl.style.width = `${value}%`;

      const step = Math.min(
        LOADING_STEPS.length - 1,
        Math.floor((value / 100) * LOADING_STEPS.length)
      );
      statusEl.textContent = LOADING_STEPS[step];

      const elapsed = performance.now() - started;
      if (value >= 99.5 && elapsed > MIN_MS) {
        clearInterval(timer);
        countEl.textContent = '100';
        statusEl.textContent = 'ready';
        setTimeout(() => {
          root.classList.add('is-done');
          setTimeout(resolve, 250);
        }, 320);
      }
    }, 55);
  });
}

/* ═════════════════════════════════════════════════════════════ cursor ════ */

export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches || reduced()) return;

  const cursor = $('#cursor');
  const dot = cursor.querySelector('.cursor__dot');
  const ring = cursor.querySelector('.cursor__ring');
  const label = $('#cursorLabel');

  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const ringPos = { ...pos };
  let raf = 0;

  window.addEventListener('pointermove', (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }, { passive: true });

  function frame() {
    raf = requestAnimationFrame(frame);
    ringPos.x += (pos.x - ringPos.x) * 0.16;
    ringPos.y += (pos.y - ringPos.y) * 0.16;
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
  }
  frame();

  // enlarge + label over anything interactive
  const INTERACTIVE = 'a, button, [data-cursor], .chip, .card, .cert';

  document.addEventListener('pointerover', (e) => {
    const target = e.target.closest(INTERACTIVE);
    if (!target) return;
    cursor.classList.add('is-active');
    label.textContent = target.dataset.cursor || '';
  });

  document.addEventListener('pointerout', (e) => {
    if (!e.target.closest(INTERACTIVE)) return;
    if (e.relatedTarget && e.relatedTarget.closest?.(INTERACTIVE)) return;
    cursor.classList.remove('is-active');
    label.textContent = '';
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else frame();
  });
}

/* ══════════════════════════════════════════════════ magnetic elements ════ */

export function initMagnetic() {
  if (window.matchMedia('(pointer: coarse)').matches || reduced()) return;

  $$('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic) || 0.32;
    let hovering = false;

    el.addEventListener('pointerenter', () => { hovering = true; });

    el.addEventListener('pointermove', (e) => {
      if (!hovering) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });

    el.addEventListener('pointerleave', () => {
      hovering = false;
      el.style.transform = '';
    });
  });
}

/* ═══════════════════════════════════════════════════════ card pointer ════ */
/** Feeds --mx / --my to each project card so its glow tracks the pointer. */
export function initCardGlow() {
  $$('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });
}

/* ═══════════════════════════════════════════════════════════════ menu ════ */

export function initMenu(lenis) {
  const toggle = $('#menuToggle');
  const menu = $('#menu');
  let open = false;

  function setOpen(next) {
    open = next;
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('is-locked', open);
    if (lenis) open ? lenis.stop() : lenis.start();
  }

  toggle.addEventListener('click', () => setOpen(!open));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) setOpen(false); });
}

/* ═════════════════════════════════════════════════════════════ header ════ */

export function initHeader() {
  const header = $('#header');
  let lastY = 0;

  return function onScroll(y) {
    header.classList.toggle('is-stuck', y > 40);
    // hide on the way down, reveal on the way up — but never over the hero
    header.classList.toggle('is-hidden', y > lastY && y > 420);
    lastY = y;
  };
}

/* ══════════════════════════════════════════════════════ role rotator ════ */

export function initRoleRotator() {
  const el = $('#heroRotator');
  const roles = C.meta.roles;
  if (!roles?.length) return;

  if (reduced()) {
    el.textContent = roles[0];
    return;
  }

  let index = 0;

  function show(text) {
    const chars = splitChars(el, text);
    chars.forEach((ch, i) => {
      ch.animate(
        [
          { opacity: 0, transform: 'translateY(.45em) rotateX(-70deg)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 460, delay: i * 22, fill: 'forwards', easing: 'cubic-bezier(.22,1,.36,1)' }
      );
    });
    return chars;
  }

  function hide(chars, done) {
    let pending = chars.length;
    if (!pending) return done();
    chars.forEach((ch, i) => {
      const a = ch.animate(
        [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-.4em)' }],
        { duration: 300, delay: i * 14, fill: 'forwards', easing: 'cubic-bezier(.4,0,.2,1)' }
      );
      a.onfinish = () => { if (--pending === 0) done(); };
    });
  }

  let chars = show(roles[0]);

  setInterval(() => {
    hide(chars, () => {
      index = (index + 1) % roles.length;
      chars = show(roles[index]);
    });
  }, 3400);
}

/* ══════════════════════════════════════════════════════════════ clock ════ */

export function initClock() {
  const el = $('#footerClock');
  if (!el) return;

  function tick() {
    const time = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    }).format(new Date());
    el.textContent = `${time} IST`;
  }

  tick();
  setInterval(tick, 30_000);
}

/* ═══════════════════════════════════════════════════════════ back to top ═ */

export function initBackToTop(lenis) {
  $('#backToTop')?.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.5 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
