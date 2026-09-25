/* Drawing primitives. Every primitive is a pure function of its inputs (including progress p), so any frame is reproducible. */
(function (global) {
  'use strict';
  const { color, type, stroke, radius } = global.Theme;
  const { ease, clamp01, range } = global.Motion;

  function setFont(ctx, s) {
    ctx.font = `${s.weight || 400} ${s.size}px ${s.family}`;
    if ('letterSpacing' in ctx) ctx.letterSpacing = s.tracking ? `${s.tracking * s.size}px` : '0px';
  }

  function withAlpha(ctx, a, fn) {
    if (a <= 0.001) return;
    ctx.save();
    ctx.globalAlpha *= Math.min(1, a);
    fn();
    ctx.restore();
  }

  function measure(ctx, str, s) {
    setFont(ctx, s);
    return ctx.measureText(s.upper ? str.toUpperCase() : str).width;
  }

  // Entrance: opacity + small rise. p is already eased by the caller or raw 0..1.
  function text(ctx, str, x, y, opts = {}) {
    const s = opts.style || type.body;
    const p = opts.p === undefined ? 1 : opts.p;
    const e = ease.out(clamp01(p));
    withAlpha(ctx, e * (opts.alpha === undefined ? 1 : opts.alpha), () => {
      setFont(ctx, s);
      ctx.fillStyle = opts.color || color.ink;
      ctx.textAlign = opts.align || 'left';
      ctx.textBaseline = opts.baseline || 'alphabetic';
      ctx.fillText(s.upper ? str.toUpperCase() : str, x, y + (1 - e) * (opts.rise === undefined ? 6 : opts.rise));
    });
  }

  function wrap(ctx, str, maxWidth, s) {
    setFont(ctx, s);
    const words = str.split(/\s+/);
    const lines = [];
    let line = '';
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = w;
      } else line = test;
    }
    if (line) lines.push(line);
    return lines;
  }

  // Lines stagger in by `stagger` fraction of p each.
  function paragraph(ctx, lines, x, y, opts = {}) {
    const s = opts.style || type.body;
    const p = opts.p === undefined ? 1 : opts.p;
    const st = opts.stagger || 0;
    lines.forEach((ln, i) => {
      const lp = st ? range(p, i * st, 1 - (lines.length - 1 - i) * st) : p;
      text(ctx, ln, x, y + i * s.lh, { ...opts, style: s, p: lp });
    });
    return lines.length * s.lh;
  }

  function rectPath(ctx, x, y, w, h, r = radius) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  // Card: outline draws on (like a pen), then the fill settles in behind it.
  function box(ctx, b, role, p, opts = {}) {
    if (p <= 0) return;
    const sp = ease.inOut(range(p, 0, 0.75));
    const fp = ease.out(range(p, 0.3, 1));
    const lw = opts.width || stroke.card;
    withAlpha(ctx, fp, () => {
      rectPath(ctx, b.x, b.y, b.w, b.h);
      ctx.fillStyle = opts.fill || role.fill;
      ctx.fill();
    });
    ctx.save();
    const per = 2 * (b.w + b.h);
    rectPath(ctx, b.x, b.y, b.w, b.h);
    ctx.setLineDash(sp >= 1 ? [] : [per * sp, per]);
    ctx.lineWidth = lw;
    ctx.strokeStyle = opts.stroke || role.stroke;
    ctx.stroke();
    ctx.restore();
  }

  function polyLen(pts) {
    let L = 0;
    for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    return L;
  }

  function pointAt(pts, p) {
    const L = polyLen(pts);
    let target = clamp01(p) * L;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      const seg = Math.hypot(x1 - x0, y1 - y0);
      if (target <= seg || i === pts.length - 1) {
        const t = seg ? Math.min(1, target / seg) : 0;
        return { x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t, angle: Math.atan2(y1 - y0, x1 - x0) };
      }
      target -= seg;
    }
    const [x, y] = pts[pts.length - 1];
    return { x, y, angle: 0 };
  }

  function arrowHead(ctx, x, y, angle, size, col, alpha = 1) {
    withAlpha(ctx, alpha, () => {
      ctx.beginPath();
      ctx.moveTo(x - size * Math.cos(angle - 0.45), y - size * Math.sin(angle - 0.45));
      ctx.lineTo(x, y);
      ctx.lineTo(x - size * Math.cos(angle + 0.45), y - size * Math.sin(angle + 0.45));
      ctx.strokeStyle = col;
      ctx.lineWidth = stroke.line;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();
    });
  }

  // Connector drawn progressively from start to end; end arrow rides the pen tip.
  function line(ctx, pts, p, opts = {}) {
    if (p <= 0) return;
    const e = ease.inOut(clamp01(p));
    const col = opts.color || color.muted;
    const Lp = polyLen(pts) * e;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    let acc = 0;
    for (let i = 1; i < pts.length; i++) {
      const seg = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      if (acc + seg >= Lp) {
        const t = seg ? (Lp - acc) / seg : 0;
        ctx.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t);
        break;
      }
      ctx.lineTo(pts[i][0], pts[i][1]);
      acc += seg;
    }
    if (opts.dash) ctx.setLineDash(opts.dash);
    ctx.lineWidth = opts.width || stroke.line;
    ctx.strokeStyle = col;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.restore();
    const size = opts.arrowSize || 10;
    if (opts.arrowEnd) {
      const tip = pointAt(pts, e);
      arrowHead(ctx, tip.x, tip.y, tip.angle, size, col, range(e, 0, 0.08));
    }
    if (opts.arrowStart) {
      const a = pointAt([pts[1], pts[0]], 1);
      arrowHead(ctx, pts[0][0], pts[0][1], a.angle, size, col, range(e, 0.85, 1));
    }
  }

  // A moving packet with a short fading trail. Invisible outside 0<p<1, so end states stay clean.
  // opts.glyph(ctx, x, y, angle) replaces the dot (e.g. a paper sheet from Objects).
  function token(ctx, pts, p, label, col, opts = {}) {
    if (p <= 0 || p >= 1) return;
    const e = ease.inOut(p);
    const vis = Math.min(range(p, 0, 0.08), 1 - range(p, 0.92, 1));
    for (let i = 6; i >= 1; i--) {
      const q = pointAt(pts, Math.max(0, e - i * 0.014));
      withAlpha(ctx, vis * (0.35 - i * 0.05), () => {
        ctx.beginPath();
        ctx.arc(q.x, q.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
      });
    }
    const at = pointAt(pts, e);
    withAlpha(ctx, vis, () => {
      if (label) {
        const s = type.monoSm;
        setFont(ctx, s);
        const tw = ctx.measureText(label).width;
        const w = tw + 22, h = 32;
        const ox = opts.side === 'left' ? -(w + 14) : opts.offsetX === undefined ? 14 : opts.offsetX;
        const oy = opts.offsetY === undefined ? -h / 2 : opts.offsetY;
        rectPath(ctx, at.x + ox, at.y + oy, w, h, h / 2);
        ctx.fillStyle = color.white;
        ctx.fill();
        ctx.lineWidth = stroke.line;
        ctx.strokeStyle = col;
        ctx.stroke();
        ctx.fillStyle = color.ink;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, at.x + ox + 11, at.y + oy + h / 2 + 1);
      }
      if (opts.glyph) { opts.glyph(ctx, at.x, at.y, at.angle); return; }
      ctx.beginPath();
      ctx.arc(at.x, at.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(at.x, at.y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = color.white;
      ctx.fill();
    });
  }

  // Emphasis ring around a card. amount 0..1 (use Motion.pulse for one-shot).
  function glow(ctx, b, amount, col, pad = 6) {
    withAlpha(ctx, amount, () => {
      rectPath(ctx, b.x - pad, b.y - pad, b.w + pad * 2, b.h + pad * 2, radius + pad / 2);
      ctx.lineWidth = stroke.emphasis;
      ctx.strokeStyle = col;
      ctx.stroke();
    });
  }

  // Highlight behind one line of text (e.g. a filename row).
  function rowHighlight(ctx, x, y, w, h, amount, col) {
    withAlpha(ctx, amount, () => {
      rectPath(ctx, x, y, w, h, 3);
      ctx.fillStyle = color.white;
      ctx.fill();
      ctx.lineWidth = stroke.card;
      ctx.strokeStyle = col;
      ctx.stroke();
    });
  }

  function check(ctx, x, y, size, p, col) {
    if (p <= 0) return;
    line(ctx, [[x, y], [x + size * 0.38, y + size * 0.36], [x + size, y - size * 0.4]], p, { color: col, width: 3 });
  }

  function personGlyph(ctx, x, y, s, col, alpha = 1) {
    withAlpha(ctx, alpha, () => {
      ctx.strokeStyle = col;
      ctx.lineWidth = stroke.line;
      ctx.beginPath();
      ctx.arc(x, y - s * 0.28, s * 0.22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y + s * 0.5, s * 0.42, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
    });
  }

  function chip(ctx, x, y, label, col, p = 1) {
    const s = type.monoSm;
    const w = measure(ctx, label, s) + 20;
    const h = 30;
    withAlpha(ctx, ease.out(clamp01(p)), () => {
      rectPath(ctx, x, y, w, h, 3);
      ctx.fillStyle = color.white;
      ctx.fill();
      ctx.lineWidth = stroke.hair + 0.5;
      ctx.strokeStyle = col;
      ctx.stroke();
      setFont(ctx, s);
      ctx.fillStyle = color.ink;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x + 10, y + h / 2 + 1);
    });
    return w;
  }

  function swatch(ctx, x, y, role, label, p) {
    if (p <= 0) return;
    box(ctx, { x, y, w: 26, h: 26 }, role, Math.min(1, p * 1.4));
    text(ctx, label, x + 42, y + 21, { p, style: type.body });
  }

  function badge(ctx, n, x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 17, 0, Math.PI * 2);
    ctx.fillStyle = color.ink;
    ctx.fill();
    setFont(ctx, { family: global.Theme.font.sans, size: 20, weight: 600 });
    ctx.fillStyle = color.white;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(n), x, y + 1);
    ctx.restore();
  }

  // Smooth connector: a sampled cubic whose end tangents are horizontal ('h') or vertical ('v').
  // Returns plain points, so line(), token() and pointAt() treat it like any polyline.
  function curve(a, b, opts = {}) {
    const from = opts.from || 'h', to = opts.to || from, k = opts.bend ?? 0.55, n = opts.n || 40;
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const c1 = from === 'h' ? [a[0] + dx * k, a[1]] : [a[0], a[1] + dy * k];
    const c2 = to === 'h' ? [b[0] - dx * k, b[1]] : [b[0], b[1] - dy * k];
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      const w0 = u * u * u, w1 = 3 * u * u * t, w2 = 3 * u * t * t, w3 = t * t * t;
      pts.push([w0 * a[0] + w1 * c1[0] + w2 * c2[0] + w3 * b[0], w0 * a[1] + w1 * c1[1] + w2 * c2[1] + w3 * b[1]]);
    }
    return pts;
  }

  // Concatenate paths, dropping the duplicated joint point.
  function joinPaths(...paths) {
    const out = [];
    paths.forEach((p) => p.forEach((pt) => {
      const last = out[out.length - 1];
      if (!last || last[0] !== pt[0] || last[1] !== pt[1]) out.push(pt);
    }));
    return out;
  }

  global.Draw = {
    setFont, withAlpha, measure, text, wrap, paragraph, rectPath, box, polyLen, pointAt, curve, joinPaths,
    arrowHead, line, token, glow, rowHighlight, check, personGlyph, chip, swatch, badge,
  };
})(window);
