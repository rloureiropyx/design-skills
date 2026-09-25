/* Deck runtime: click/keyboard beats, deterministic rendering, crossfade transitions, reduced motion, static and export modes. */
(function (global) {
  'use strict';
  const { W, H, color, type } = global.Theme;
  const { dur, clamp01, range, lerp, ease } = global.Motion;
  const D = global.Draw;

  const slides = [];
  const params = new URLSearchParams(location.search);
  const mode = {
    isStatic: params.has('static'),
    isExport: params.has('export'),
    reduced: params.has('reduced') || (!params.has('motion') && matchMedia('(prefers-reduced-motion: reduce)').matches),
  };

  let canvas, ctx, layerA, layerB, scale = 1;
  let cur = { slide: 0, beat: 0, start: 0 };
  let transition = null; // { from: {slide, beat, t}, start, dur }
  let raf = 0;

  function register(slide) { slides.push(slide); }

  // Progress helper handed to slides: raw 0..1 for an interval inside a beat.
  function makeState(slideIdx, beat, t) {
    return {
      beat, t,
      reduced: mode.reduced,
      isStatic: mode.isStatic,
      tw(b, start, d) {
        if (beat > b) return 1;
        if (beat < b) return 0;
        return clamp01((t - start) / d);
      },
      // Progress through a beat's full duration.
      within(b) { return this.tw(b, 0, slides[slideIdx].beats[b].dur); },
    };
  }

  function drawBackground(c) {
    c.fillStyle = color.surface;
    c.fillRect(0, 0, W, H);
    c.lineWidth = 1;
    for (let x = 0; x <= W; x += 40) {
      c.strokeStyle = x % 200 === 0 ? color.gridMajor : color.grid;
      c.beginPath(); c.moveTo(x + 0.5, 0); c.lineTo(x + 0.5, H); c.stroke();
    }
    for (let y = 0; y <= H; y += 40) {
      c.strokeStyle = y % 200 === 0 ? color.gridMajor : color.grid;
      c.beginPath(); c.moveTo(0, y + 0.5); c.lineTo(W, y + 0.5); c.stroke();
    }
    // Drawing frame with registration ticks.
    const f = { x: 48, y: 96, w: W - 96, h: H - 136 };
    c.fillStyle = 'rgba(247,245,240,0.82)';
    c.fillRect(f.x, f.y, f.w, f.h);
    c.strokeStyle = color.frame;
    c.lineWidth = 1.5;
    c.strokeRect(f.x, f.y, f.w, f.h);
    c.strokeStyle = color.muted;
    const tick = 14;
    for (const [x, y] of [[f.x, f.y], [f.x + f.w, f.y], [f.x, f.y + f.h], [f.x + f.w, f.y + f.h]]) {
      c.beginPath();
      c.moveTo(x - tick, y); c.lineTo(x + tick, y);
      c.moveTo(x, y - tick); c.lineTo(x, y + tick);
      c.stroke();
    }
  }

  const RING = { cx: W - 64, cy: 62, r: 16 };
  const beatProgress = (si, bi) => { const n = slides[si].beats.length; return n > 1 ? bi / (n - 1) : 1; };

  // Chrome text never crossfades in place (overlapping labels read as garbage): old fades out, then new fades in.
  function drawChrome(c, slide, beat, a = { label: 1, step: 1 }) {
    D.text(c, slide.label, 48, 72, { style: type.chrome, color: color.muted, alpha: a.label });
    const step = `${beat + 1}/${slide.beats.length} · ${slide.beats[beat].name}`;
    D.text(c, step, RING.cx - RING.r - 16, 70, { style: type.chrome, color: color.muted, align: 'right', alpha: a.step });
  }

  // Progress ring (slide-level orientation, as in the reference): one ring, progress interpolates.
  function drawRing(c, progress) {
    const { cx, cy, r } = RING;
    c.save();
    c.lineWidth = 3;
    c.strokeStyle = color.gridMajor;
    c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.stroke();
    c.strokeStyle = color.ink;
    c.lineCap = 'round';
    c.beginPath(); c.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(0.02, progress)); c.stroke();
    c.fillStyle = global.Theme.accent;
    c.beginPath(); c.arc(cx, cy, 4.5, 0, Math.PI * 2); c.fill();
    c.restore();
  }

  function renderLayer(target, slideIdx, beat, t) {
    const c = target.getContext('2d');
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, target.width, target.height);
    c.setTransform(scale, 0, 0, scale, 0, 0);
    slides[slideIdx].render(c, makeState(slideIdx, beat, t));
  }

  function compose(now) {
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    drawBackground(ctx);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const t = mode.reduced || mode.isStatic ? Infinity : now - cur.start;
    renderLayer(layerB, cur.slide, cur.beat, t);
    if (transition) {
      const m = clamp01((now - transition.start) / transition.dur);
      const f = transition.from;
      renderLayer(layerA, f.slide, f.beat, f.t);
      // Old content clears early so the two states barely overlap.
      ctx.globalAlpha = 1 - range(m, 0, 0.6);
      ctx.drawImage(layerA, 0, 0);
      ctx.globalAlpha = range(m, 0.25, 1);
      ctx.drawImage(layerB, 0, 0);
      ctx.globalAlpha = 1;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      const same = f.slide === cur.slide;
      const out = 1 - range(m, 0, 0.5), inn = range(m, 0.5, 1);
      drawChrome(ctx, slides[f.slide], f.beat, { label: same ? 0 : out, step: out });
      drawChrome(ctx, slides[cur.slide], cur.beat, { label: same ? 1 : inn, step: inn });
      drawRing(ctx, lerp(beatProgress(f.slide, f.beat), beatProgress(cur.slide, cur.beat), ease.inOut(m)));
      if (m >= 1) transition = null;
    } else {
      ctx.drawImage(layerB, 0, 0);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      drawChrome(ctx, slides[cur.slide], cur.beat);
      drawRing(ctx, beatProgress(cur.slide, cur.beat));
    }
  }

  function isAnimating(now) {
    if (transition) return true;
    if (mode.reduced || mode.isStatic) return false;
    return now - cur.start < slides[cur.slide].beats[cur.beat].dur;
  }

  function tick() {
    raf = 0;
    const now = performance.now();
    compose(now);
    if (isAnimating(now)) request();
  }

  function request() { if (!raf && !mode.isExport) raf = requestAnimationFrame(tick); }

  function snapshot(now) {
    const t = mode.reduced || mode.isStatic ? Infinity : now - cur.start;
    return { slide: cur.slide, beat: cur.beat, t };
  }

  function go(slide, beat, { play = true, fade = 0 } = {}) {
    const now = performance.now();
    if (fade) transition = { from: snapshot(now), start: now, dur: fade };
    cur = { slide, beat, start: play ? now : -Infinity };
    announce();
    syncHash();
    request();
  }

  function next() {
    const now = performance.now();
    const s = slides[cur.slide];
    if (isAnimating(now)) {
      // Interruptible: a click mid-beat completes it instead of skipping content.
      cur.start = -Infinity;
      transition = null;
      request();
      return;
    }
    if (mode.isStatic) {
      if (cur.slide < slides.length - 1) go(cur.slide + 1, slides[cur.slide + 1].beats.length - 1, { fade: dur.slide });
      return;
    }
    if (cur.beat < s.beats.length - 1) go(cur.slide, cur.beat + 1, { fade: mode.reduced ? dur.reducedFade : 0 });
    else if (cur.slide < slides.length - 1) go(cur.slide + 1, 0, { fade: mode.reduced ? dur.reducedFade : dur.slide });
  }

  function prev() {
    if (mode.isStatic) {
      if (cur.slide > 0) go(cur.slide - 1, slides[cur.slide - 1].beats.length - 1, { fade: dur.slide });
      return;
    }
    if (cur.beat > 0) go(cur.slide, cur.beat - 1, { play: false, fade: dur.reducedFade });
    else if (cur.slide > 0) go(cur.slide - 1, slides[cur.slide - 1].beats.length - 1, { play: false, fade: dur.slide });
  }

  function announce() {
    const s = slides[cur.slide];
    const b = s.beats[cur.beat];
    const live = document.getElementById('caption');
    if (live) live.textContent = `Slide ${cur.slide + 1} of ${slides.length}, step ${cur.beat + 1} of ${s.beats.length}. ${b.caption}`;
    const title = document.getElementById('slide-title');
    if (title) title.textContent = s.title;
    renderNotes();
  }

  function renderNotes() {
    const el = document.getElementById('notes');
    if (!el || el.hidden) return;
    const s = slides[cur.slide];
    el.innerHTML = '';
    const h = document.createElement('h2');
    h.textContent = `${s.label} — step ${cur.beat + 1} of ${s.beats.length}`;
    el.appendChild(h);
    const ol = document.createElement('ol');
    s.beats.forEach((b, i) => {
      const li = document.createElement('li');
      li.textContent = `${b.name}: ${b.caption}`;
      if (i === cur.beat) li.setAttribute('aria-current', 'step');
      ol.appendChild(li);
    });
    el.appendChild(ol);
    if (s.notes) {
      const p = document.createElement('p');
      p.textContent = s.notes;
      el.appendChild(p);
    }
  }

  function syncHash() {
    if (mode.isExport) return;
    history.replaceState(null, '', `${location.pathname}${location.search}#${cur.slide + 1}.${cur.beat + 1}`);
  }

  function readHash() {
    const m = /^#(\d+)(?:\.(\d+))?$/.exec(location.hash);
    if (!m) return null;
    const si = Math.min(slides.length, Math.max(1, +m[1])) - 1;
    const bi = Math.min(slides[si].beats.length, Math.max(1, +(m[2] || 1))) - 1;
    return { si, bi };
  }

  function resize() {
    const vw = innerWidth, vh = innerHeight;
    const cssW = mode.isExport ? W : Math.min(vw, (vh * W) / H);
    const cssH = (cssW * H) / W;
    const dpr = mode.isExport ? 1 : Math.max(1, devicePixelRatio || 1);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    canvas.width = layerA.width = layerB.width = Math.round(cssW * dpr);
    canvas.height = layerA.height = layerB.height = Math.round(cssH * dpr);
    scale = canvas.width / W;
    if (!mode.isExport) compose(performance.now());
  }

  function onKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'Enter'].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home' || k === 'r' || k === 'R') { e.preventDefault(); go(0, 0, { fade: dur.slide }); }
    else if (k === 'End') { e.preventDefault(); const l = slides.length - 1; go(l, slides[l].beats.length - 1, { play: false, fade: dur.slide }); }
    else if (k === 'n' || k === 'N') { const el = document.getElementById('notes'); el.hidden = !el.hidden; renderNotes(); }
    else if (k === 'f' || k === 'F') { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); }
    else if (k === 'm' || k === 'M') { mode.reduced = !mode.reduced; cur.start = -Infinity; announce(); request(); }
  }

  // Export: a fixed schedule of beats + holds, rendered frame by frame.
  function buildSchedule() {
    const segs = [];
    let at = 0;
    slides.forEach((s, si) => {
      s.beats.forEach((b, bi) => {
        const last = si === slides.length - 1 && bi === s.beats.length - 1;
        const d = b.dur + (b.hold || (last ? 4000 : 2400));
        segs.push({ si, bi, start: at, dur: d, animDur: b.dur });
        at += d;
      });
    });
    return { segs, total: at };
  }

  function renderAt(ms) {
    const { segs } = buildSchedule();
    let i = segs.findIndex((s) => ms < s.start + s.dur);
    if (i < 0) i = segs.length - 1;
    const seg = segs[i];
    const t = ms - seg.start;
    cur = { slide: seg.si, beat: seg.bi, start: 0 };
    transition = null;
    if (seg.bi === 0 && seg.si > 0 && t < dur.slide) {
      const p = segs[i - 1];
      transition = { from: { slide: p.si, beat: p.bi, t: Infinity }, start: 0, dur: dur.slide };
    } else if (mode.reduced && i > 0 && t < dur.reducedFade) {
      const p = segs[i - 1];
      transition = { from: { slide: p.si, beat: p.bi, t: Infinity }, start: 0, dur: dur.reducedFade };
    }
    compose(t);
  }

  async function start() {
    canvas = document.getElementById('stage');
    ctx = canvas.getContext('2d');
    layerA = document.createElement('canvas');
    layerB = document.createElement('canvas');
    const f = global.Theme.font;
    await Promise.all([
      document.fonts.load(`400 24px ${f.sans}`), document.fonts.load(`600 24px ${f.sans}`),
      document.fonts.load(`400 24px ${f.mono}`), document.fonts.load(`500 24px ${f.mono}`),
    ]).catch(() => {});
    const h = readHash();
    if (h) cur = { slide: h.si, beat: h.bi, start: performance.now() };
    if (mode.isStatic && !h) cur.beat = slides[0].beats.length - 1;
    resize();
    addEventListener('resize', resize);
    if (mode.isExport) {
      const sched = buildSchedule();
      global.__deck = { total: sched.total, renderAt, ready: true };
      return;
    }
    addEventListener('keydown', onKey);
    canvas.addEventListener('click', (e) => (e.shiftKey ? prev() : next()));
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      if (!params.has('reduced') && !params.has('motion')) { mode.reduced = e.matches; request(); }
    });
    addEventListener('hashchange', () => {
      const h = readHash();
      if (h && (h.si !== cur.slide || h.bi !== cur.beat)) go(h.si, h.bi, { fade: dur.reducedFade });
    });
    announce();
    syncHash();
    request();
  }

  global.Deck = { register, start, mode, slides };
})(window);
