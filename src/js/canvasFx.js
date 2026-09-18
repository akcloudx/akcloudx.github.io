/* ============================================================================
   CANVAS FX — the 2D layer that sits behind every section.

   Three cheap ingredients, all drawn additively:
     1. slow-drifting light fields (pre-rendered gradient sprites)
     2. a dot grid that only lights up near the pointer
     3. a fading pointer trail

   Gradients are rasterised once into offscreen canvases and then blitted, so
   the per-frame cost stays close to a handful of drawImage calls.
   ========================================================================== */

function makeRadialSprite(size, rgb, innerAlpha) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0,    `rgba(${rgb}, ${innerAlpha})`);
  g.addColorStop(0.45, `rgba(${rgb}, ${innerAlpha * 0.28})`);
  g.addColorStop(1,    `rgba(${rgb}, 0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}

export function createCanvasFx(canvas) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    canvas.style.display = 'none';
    return { destroy() {} };
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return { destroy() {} };

  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  const coarse = window.matchMedia('(pointer: coarse)').matches;

  let W = 0, H = 0;

  /* ── pre-rendered sprites ──────────────────────────────────────────────── */
  const fieldSprites = [
    makeRadialSprite(512, '82, 213, 255', 0.30),   // cyan
    makeRadialSprite(512, '139, 108, 255', 0.28),  // violet
    makeRadialSprite(512, '69, 231, 176', 0.18),   // mint
  ];
  const trailSprite = makeRadialSprite(128, '150, 220, 255', 0.5);

  /* ── drifting light fields ─────────────────────────────────────────────── */
  const fields = [
    { sprite: 0, x: 0.18, y: 0.22, r: 0.55, sx: 0.000035, sy: 0.000021, px: 0.0, py: 0.0 },
    { sprite: 1, x: 0.82, y: 0.35, r: 0.62, sx: -0.000027, sy: 0.000033, px: 0.0, py: 0.0 },
    { sprite: 2, x: 0.52, y: 0.82, r: 0.48, sx: 0.000019, sy: -0.000029, px: 0.0, py: 0.0 },
  ];

  /* ── pointer ───────────────────────────────────────────────────────────── */
  const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
  const trail = [];
  const TRAIL_MAX = 18;

  function onMove(e) {
    pointer.tx = e.clientX * DPR;
    pointer.ty = e.clientY * DPR;
    pointer.active = true;
  }
  function onLeave() { pointer.active = false; }

  if (!coarse) {
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
  }

  /* ── sizing ────────────────────────────────────────────────────────────── */
  function resize() {
    W = Math.floor(window.innerWidth * DPR);
    H = Math.floor(window.innerHeight * DPR);
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ── grid ──────────────────────────────────────────────────────────────── */
  const GRID = 46 * DPR;
  const GRID_RADIUS = 180 * DPR;

  function drawGrid() {
    if (!pointer.active) return;
    const r = GRID_RADIUS;
    const x0 = Math.max(0, Math.floor((pointer.x - r) / GRID)) * GRID;
    const x1 = Math.min(W, pointer.x + r);
    const y0 = Math.max(0, Math.floor((pointer.y - r) / GRID)) * GRID;
    const y1 = Math.min(H, pointer.y + r);

    for (let x = x0; x <= x1; x += GRID) {
      for (let y = y0; y <= y1; y += GRID) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const d = Math.hypot(dx, dy);
        if (d > r) continue;
        const t = 1 - d / r;
        const alpha = t * t * 0.55;
        const size = (1 + t * 1.8) * DPR;
        ctx.fillStyle = `rgba(150, 215, 255, ${alpha})`;
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }
    }
  }

  /* ── loop ──────────────────────────────────────────────────────────────── */
  let raf = 0;
  let running = true;
  let t0 = performance.now();

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!running) return;

    const t = now;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    /* light fields */
    for (const f of fields) {
      const cx = (f.x + Math.sin(t * f.sx) * 0.13) * W;
      const cy = (f.y + Math.cos(t * f.sy) * 0.13) * H;
      const size = f.r * Math.max(W, H);
      ctx.drawImage(fieldSprites[f.sprite], cx - size / 2, cy - size / 2, size, size);
    }

    /* pointer easing + trail */
    if (pointer.active) {
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      trail.push({ x: pointer.x, y: pointer.y, life: 1 });
      if (trail.length > TRAIL_MAX) trail.shift();
    }

    for (let i = trail.length - 1; i >= 0; i--) {
      const p = trail[i];
      p.life -= 0.045;
      if (p.life <= 0) { trail.splice(i, 1); continue; }
      const size = (36 + (1 - p.life) * 90) * DPR;
      ctx.globalAlpha = p.life * 0.5;
      ctx.drawImage(trailSprite, p.x - size / 2, p.y - size / 2, size, size);
    }
    ctx.globalAlpha = 1;

    drawGrid();

    ctx.globalCompositeOperation = 'source-over';
  }

  raf = requestAnimationFrame(frame);

  document.addEventListener('visibilitychange', () => { running = !document.hidden; });

  return {
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    },
  };
}
