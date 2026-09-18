/* ============================================================================
   RENDER — turns src/data/content.js into DOM.

   Nothing here knows about animation; it only produces markup with the hooks
   (data-reveal, data-split, data-magnetic, data-cursor) that scroll.js and
   ui.js later pick up.
   ========================================================================== */

import { content as C } from '../data/content.js';

const $ = (sel) => document.querySelector(sel);

/** Split a string into per-character spans (for the hero name). */
function splitChars(el, text, className = 'ch') {
  el.textContent = '';
  const frag = document.createDocumentFragment();
  [...text].forEach((chr, i) => {
    const span = document.createElement('span');
    if (chr === ' ') {
      span.className = `${className} ${className}--space`;
      span.innerHTML = '&nbsp;';
    } else {
      span.className = className;
      span.textContent = chr;
    }
    span.style.setProperty('--i', i);
    frag.appendChild(span);
  });
  el.appendChild(frag);
  return [...el.children];
}

/** Wrap every word in a masked span so it can slide up from a hidden line. */
function splitWords(el) {
  const text = el.textContent.trim();
  el.textContent = '';
  const frag = document.createDocumentFragment();
  text.split(/\s+/).forEach((word, i, arr) => {
    const outer = document.createElement('span');
    outer.className = 'word';
    const inner = document.createElement('span');
    inner.className = 'word__in';
    inner.textContent = word;
    outer.appendChild(inner);
    frag.appendChild(outer);
    if (i < arr.length - 1) {
      const space = document.createElement('span');
      space.className = 'word word--space';
      space.innerHTML = '&nbsp;';
      frag.appendChild(space);
    }
  });
  el.appendChild(frag);
  return [...el.querySelectorAll('.word__in')];
}

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/* ════════════════════════════════════════════════════════════ sections ═══ */

function renderChrome() {
  $('#headerMark').textContent = C.meta.initials;
  $('#headerName').textContent = C.meta.name;
  $('#footerName').textContent = `© ${new Date().getFullYear()} ${C.meta.name}`;

  const navHtml = C.nav
    .map((n) => `<a class="header__link" href="#${n.id}" data-nav="${n.id}"><span>${esc(n.label)}</span></a>`)
    .join('');
  $('#headerNav').innerHTML = navHtml;

  $('#menuNav').innerHTML = C.nav
    .map((n, i) => `<a class="menu__link" href="#${n.id}" style="transition-delay:${0.06 * i + 0.1}s">${esc(n.label)}</a>`)
    .join('');

  const { linkedin, github } = C.meta.links;
  $('#menuFoot').innerHTML = [
    `<a href="${esc(linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
    `<a href="${esc(github)}" target="_blank" rel="noopener">GitHub</a>`,
  ].join('');
}

function renderHero() {
  $('#heroTitle').textContent = C.meta.title;
  $('#heroTagline').textContent = C.meta.tagline;
  return splitChars($('#heroName'), C.meta.name);
}

function renderTicker() {
  const items = C.ticker.map((w) => `<span class="ticker__item">${esc(w)}</span>`).join('');
  // duplicated twice so the marquee can loop seamlessly
  $('#tickerTrack').innerHTML = items + items;
}

function renderAbout() {
  $('#aboutLabel').textContent = C.about.label;
  $('#aboutHeading').textContent = C.about.heading;
  $('#aboutLead').textContent = C.about.lead;
  $('#aboutBody').innerHTML = C.about.body.map((p) => `<p>${esc(p)}</p>`).join('');

  $('#metrics').innerHTML = C.metrics.map((m) => `
    <div class="metric">
      <div class="metric__value">
        <span data-count="${m.value}" data-prefix="${esc(m.prefix)}" data-suffix="${esc(m.suffix)}"
              data-decimals="${String(m.value).includes('.') ? 1 : 0}">${esc(m.prefix)}0${esc(m.suffix)}</span>
      </div>
      ${m.unit ? `<div class="metric__unit">${esc(m.unit)}</div>` : ''}
      <div class="metric__label">${esc(m.label)}</div>
    </div>
  `).join('');
}

function renderWork() {
  $('#workLabel').textContent = C.projects.label;
  $('#workHeading').textContent = C.projects.heading;

  const accents = {
    cyan: 'var(--cyan)', violet: 'var(--violet)',
    mint: 'var(--mint)', amber: 'var(--amber)',
  };

  $('#galleryTrack').innerHTML = C.projects.items.map((p) => `
    <article class="card" style="--card-accent:${accents[p.accent] || 'var(--cyan)'}">
      <div class="card__glow"></div>
      <div class="card__top">
        <span class="card__index">${esc(p.index)}</span>
        <span class="card__meta">
          <span class="card__kind">${esc(p.kind)}</span>
          <span>${esc(p.year)}</span>
        </span>
      </div>
      <h3 class="card__title">${esc(p.title)}</h3>
      <p class="card__summary">${esc(p.summary)}</p>
      <ul class="card__points">
        ${p.points.map((pt) => `<li>${esc(pt)}</li>`).join('')}
      </ul>
      <div class="card__foot">
        ${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
        ${p.link ? `<a class="card__link" href="${esc(p.link)}" target="_blank" rel="noopener"
                       data-cursor="open">${esc(p.linkLabel || 'View')} <span aria-hidden="true">→</span></a>` : ''}
      </div>
    </article>
  `).join('');

  $('#galleryCounter').textContent = `01 / ${String(C.projects.items.length).padStart(2, '0')}`;
}

function renderCerts() {
  $('#certsLabel').textContent = C.certifications.label;
  $('#certsHeading').textContent = C.certifications.heading;

  $('#certsGrid').innerHTML = C.certifications.groups.map((g) => `
    <div class="cert-group">
      <h3 class="cert-group__vendor">${esc(g.vendor)}</h3>
      <div class="cert-group__items">
        ${g.items.map((c) => `
          <div class="cert">
            <span class="cert__name">${esc(c.name)}</span>
            <span class="cert__code">${esc(c.code)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderExperience() {
  $('#expLabel').textContent = C.experience.label;
  $('#expHeading').textContent = C.experience.heading;

  $('#timelineItems').innerHTML = C.experience.roles.map((r) => `
    <article class="job${r.current ? ' job--current' : ''}">
      <span class="job__node" aria-hidden="true"></span>
      <div class="job__head">
        <h3 class="job__role">${esc(r.role)}</h3>
        <span class="job__period">${esc(r.period)}</span>
      </div>
      <div class="job__company">
        ${esc(r.company)}
        <span>· ${esc(r.place)}</span>
        ${r.current ? '<span class="job__badge">Current</span>' : ''}
      </div>
      <ul class="job__points">
        ${r.points.map((p) => `<li>${esc(p)}</li>`).join('')}
      </ul>
      <div class="job__tags">
        ${r.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
      </div>
    </article>
  `).join('');
}

function renderEducation() {
  $('#eduLabel').textContent = C.education.label;
  $('#eduHeading').textContent = C.education.heading;

  $('#educationList').innerHTML = C.education.items.map((e) => `
    <div class="edu">
      <span class="edu__period">${esc(e.period)}</span>
      <h3 class="edu__degree">${esc(e.degree)}</h3>
      <span class="edu__school">${esc(e.school)}</span>
      <span class="edu__place">${esc(e.place)}</span>
      ${e.note ? `<span class="edu__note">${esc(e.note)}</span>` : ''}
    </div>
  `).join('');

  $('#languages').innerHTML = C.languages.map((l) => `
    <span class="lang"><b>${esc(l.name)}</b><span>${esc(l.level)}</span></span>
  `).join('');
}

function renderContact() {
  $('#contactLabel').textContent = C.contact.label;
  $('#contactHeading').textContent = C.contact.heading;
  $('#contactBody').textContent = C.contact.body;

  const links = [
    { label: 'LinkedIn', value: 'aakif-shaikh-ascloudx', href: C.meta.links.linkedin },
    { label: 'GitHub',   value: 'akcloudx',              href: C.meta.links.github },
    { label: 'Email',    value: C.meta.email,            href: `mailto:${C.meta.email}` },
  ];

  if (C.meta.resumeUrl) {
    links.push({ label: 'Résumé', value: 'Download PDF', href: C.meta.resumeUrl });
  }

  $('#contactLinks').innerHTML = links.map((l) => `
    <a class="contact-link" href="${esc(l.href)}"
       ${l.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}
       data-cursor="${esc(l.label.toLowerCase())}" data-reveal>
      <span class="contact-link__label">${esc(l.label)}</span>
      <span class="contact-link__value">${esc(l.value)}</span>
    </a>
  `).join('');
}

/* ══════════════════════════════════════════════════════════════ exports ══ */

export function renderAll() {
  renderChrome();
  const heroChars = renderHero();
  renderTicker();
  renderAbout();
  renderWork();
  renderCerts();
  renderExperience();
  renderEducation();
  renderContact();

  // prepare every [data-split] heading for the word-mask animation
  document.querySelectorAll('[data-split]').forEach((el) => splitWords(el));

  return { heroChars };
}

export { splitChars, splitWords, C as content };
