/* ============================================================================
   SCROLL — Lenis smooth scrolling wired into GSAP ScrollTrigger, plus every
            scroll-driven animation on the page.
   ========================================================================== */

const { gsap, ScrollTrigger, Lenis } = window;
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ══════════════════════════════════════════════════════════════ lenis ════ */

export function initSmoothScroll() {
  if (reduced || !Lenis) return null;

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // in-page anchors go through Lenis so they inherit the easing
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -10, duration: 1.4 });
  });

  return lenis;
}

/* ═══════════════════════════════════════════════════════ hero entrance ═══ */

/**
 * GSAP parks its ticker while the document is hidden. If the page is opened in
 * a background tab the ticker can stay asleep even after the tab is brought
 * forward, which freezes every tween mid-flight — so wake it explicitly.
 */
export function keepTickerAwake() {
  const wake = () => { if (!document.hidden) gsap.ticker.wake(); };
  document.addEventListener('visibilitychange', wake);
  window.addEventListener('focus', wake);
  window.addEventListener('pageshow', wake);
  wake();
}

/**
 * NOTE: the eyebrow / tagline / actions carry [data-reveal], whose CSS base
 * state is opacity 0. A gsap .from() would read that 0 as the END value and
 * animate 0 → 0, so every step below is an explicit .fromTo().
 */
export function playHeroIntro(heroChars) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  const settled = ['.hero__role', '.hero__tagline',
                   '.hero__actions', '.hero__scroll'];

  if (reduced) {
    gsap.set(heroChars, { yPercent: 0, opacity: 1, rotateX: 0, clearProps: 'transform' });
    gsap.set(settled, { opacity: 1, y: 0 });
    return tl;
  }

  keepTickerAwake();

  tl.fromTo(heroChars,
      { yPercent: 118, opacity: 0, rotateX: -55 },
      { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.035,
        clearProps: 'transform' })
    .fromTo('.hero__role',    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.45)
    .fromTo('.hero__tagline', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.55')
    .fromTo('.hero__actions', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.55')
    .fromTo('.hero__scroll',  { opacity: 0 },        { opacity: 1, duration: 0.6 }, '-=0.4');

  // last-resort guarantee: the hero must never be left invisible
  setTimeout(() => { if (tl.progress() < 1) tl.progress(1); }, 6000);

  return tl;
}

/* ═════════════════════════════════════════════════════ generic reveals ═══ */

function initReveals() {
  if (reduced) {
    gsap.set('[data-reveal]', { opacity: 1, y: 0 });
    gsap.set('.word__in', { yPercent: 0, y: 0 });
    return;
  }

  // Masked word headings.
  //
  // The CSS base state is translateY(105%). GSAP parses that computed matrix
  // into a PIXEL `y` offset (105% already resolved), so animating yPercent
  // alone would leave those pixels behind and the word would never arrive.
  // Both axes of the transform have to be stated explicitly.
  $$('[data-split]').forEach((heading) => {
    const words = heading.querySelectorAll('.word__in');
    gsap.fromTo(words,
      { yPercent: 105, y: 0 },
      {
        yPercent: 0,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.045,
        scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
      });
  });

  // simple fade-ups — skip anything inside the hero, handled by the intro
  $$('[data-reveal]').forEach((el) => {
    if (el.closest('.hero')) return;
    gsap.fromTo(el,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
  });

  // staggered blocks that were not marked individually
  const groups = [
    { sel: '.metric',      from: { y: 34 } },
    { sel: '.cert',        from: { x: -18 } },
    { sel: '.edu',         from: { y: 26 } },
    { sel: '.job',         from: { y: 32 } },
  ];

  groups.forEach(({ sel, from }) => {
    const items = $$(sel);
    if (!items.length) return;
    gsap.from(items, {
      ...from,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: items[0].parentElement, start: 'top 85%', once: true },
    });
  });
}

/* ════════════════════════════════════════════════════════════ counters ═══ */

function initCounters() {
  $$('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const proxy = { v: 0 };

    const write = () => {
      el.textContent = `${prefix}${proxy.v.toFixed(decimals)}${suffix}`;
    };

    if (reduced) { proxy.v = target; write(); return; }

    gsap.to(proxy, {
      v: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: write,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });
}

/* ════════════════════════════════════════════════ horizontal work rail ═══ */

function initGallery() {
  const gallery = $('#gallery');
  const track = $('#galleryTrack');
  const counter = $('#galleryCounter');
  const prevBtn = $('#galleryPrev');
  const nextBtn = $('#galleryNext');
  const cards = $$('.card');
  if (!gallery || !track || !cards.length) return;

  const total = String(cards.length).padStart(2, '0');
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /** distance from one card to the next, in rail pixels */
  const cardStep = () => {
    const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0;
    return cards[0].offsetWidth + gap;
  };

  /* Without trailing space the rail stops as soon as the last card is fully on
     screen, so that card can never reach the front and the counter skips from
     02 straight to 04. Pad the end by one empty slot. */
  const setTrailingSpace = () => {
    const gutter = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const pad = Math.max(gutter, gallery.clientWidth - gutter - cards[0].offsetWidth);
    track.style.paddingRight = `${pad}px`;
  };
  setTrailingSpace();

  const maxScroll = () => Math.max(0, gallery.scrollWidth - gallery.clientWidth);
  const atStart = () => gallery.scrollLeft <= 2;
  const atEnd = () => gallery.scrollLeft >= maxScroll() - 2;

  /**
   * Which card is "the one you are on" — the one whose left edge sits closest
   * to the gutter. At the far end the last card can never reach the gutter
   * (it is already fully on screen), so that position is reported directly.
   */
  const currentCardIndex = () => {
    if (atEnd()) return cards.length - 1;
    const origin = gallery.getBoundingClientRect().left
      + (parseFloat(getComputedStyle(track).paddingLeft) || 0);
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - origin);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    return best;
  };

  const update = () => {
    const n = Math.min(cards.length, currentCardIndex() + 1);
    counter.textContent = `${String(n).padStart(2, '0')} / ${total}`;
    if (prevBtn) prevBtn.disabled = atStart();
    if (nextBtn) nextBtn.disabled = atEnd();
  };

  gallery.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', () => { setTrailingSpace(); update(); });
  update();

  /* ── arrows ─────────────────────────────────────────────────────────────── */
  const slide = (dir) => gallery.scrollBy({
    left: dir * cardStep(),
    behavior: reduced ? 'auto' : 'smooth',
  });
  const onPrev = () => slide(-1);
  const onNext = () => slide(1);
  prevBtn?.addEventListener('click', onPrev);
  nextBtn?.addEventListener('click', onNext);

  /* ── keyboard, once the rail has focus ──────────────────────────────────── */
  gallery.tabIndex = 0;
  gallery.setAttribute('role', 'region');
  gallery.setAttribute('aria-label', 'Selected work, horizontally scrollable');
  gallery.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); slide(1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); slide(-1); }
  });

  /* ── click-and-drag to pan ──────────────────────────────────────────────── */
  let dragging = false;
  let startX = 0;
  let startLeft = 0;
  let moved = 0;

  const onDown = (e) => {
    if (!finePointer || e.button !== 0) return;
    dragging = true;
    moved = 0;
    startX = e.clientX;
    startLeft = gallery.scrollLeft;
    gallery.classList.add('is-dragging');
  };
  const onMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    gallery.scrollLeft = startLeft - dx;
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    gallery.classList.remove('is-dragging');
  };
  // a drag that finishes over a link must not also activate that link
  const onClickCapture = (e) => {
    if (moved > 5) { e.preventDefault(); e.stopPropagation(); moved = 0; }
  };

  gallery.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  gallery.addEventListener('click', onClickCapture, true);
  if (finePointer) gallery.classList.add('is-grabbable');
}

/* ═══════════════════════════════════════════════════════ timeline spine ══ */

function initTimeline() {
  const fill = $('#timelineFill');
  const timeline = $('#timeline');
  if (!fill || !timeline) return;

  if (reduced) { fill.style.height = '100%'; return; }

  gsap.to(fill, {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: timeline,
      start: 'top 70%',
      end: 'bottom 75%',
      scrub: 0.6,
    },
  });
}

/* ═══════════════════════════════════════════════════════════════ ticker ══ */

function initTicker() {
  const track = $('#tickerTrack');
  if (!track || reduced) return;

  // the list is duplicated in render.js, so -50% is exactly one seamless loop
  const loop = gsap.to(track, {
    xPercent: -50,
    duration: 38,
    ease: 'none',
    repeat: -1,
  });

  // the marquee speeds up while you scroll
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate(self) {
      const boost = 1 + Math.min(3, Math.abs(self.getVelocity()) / 900);
      gsap.to(loop, { timeScale: boost, duration: 0.4, overwrite: true });
    },
  });
}

/* ════════════════════════════════════════════════════════ nav highlight ══ */

function initNavHighlight() {
  const links = $$('[data-nav]');
  if (!links.length) return;

  links.forEach((link) => {
    const section = document.getElementById(link.dataset.nav);
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle(self) { link.classList.toggle('is-active', self.isActive); },
    });
  });
}

/* ════════════════════════════════════════════════ section parallax drift ═ */

function initSectionDrift() {
  if (reduced) return;
  $$('.section__head').forEach((head) => {
    gsap.to(head, {
      y: -38,
      ease: 'none',
      scrollTrigger: { trigger: head, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

/* ══════════════════════════════════════════════════════════════ wire-up ══ */

export function initScrollAnimations({ onScroll } = {}) {
  gsap.registerPlugin(ScrollTrigger);
  keepTickerAwake();

  initReveals();
  initCounters();
  initGallery();
  initTimeline();
  initTicker();
  initNavHighlight();
  initSectionDrift();

  // progress bar + header state
  const bar = $('#progressBar');
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      if (bar) bar.style.width = `${self.progress * 100}%`;
      onScroll?.(self.scroll());
    },
  });

  // fonts can shift layout after first paint
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
