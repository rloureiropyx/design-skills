/* Objects: drawn representations of real things (files, folders, chat windows, people, stamps).
   Built on Draw; same entrance grammar: outlines draw on, fills settle, text rises in. Pure functions of p. */
(function (global) {
  'use strict';
  const { color, type, stroke, font } = global.Theme;
  const { ease, clamp01, range } = global.Motion;
  const D = global.Draw;

  const paper = color.white;
  const faint = '#d9d3c6';

  // Any closed path: outline draws on like a pen, then the fill settles behind it.
  function shape(ctx, path, len, p, o = {}) {
    if (p <= 0) return;
    const sp = ease.inOut(range(p, 0, 0.75));
    const fp = ease.out(range(p, 0.3, 1));
    if (o.fill) D.withAlpha(ctx, fp * (o.alpha ?? 1), () => { path(); ctx.fillStyle = o.fill; ctx.fill(); });
    if (!o.stroke) return;
    D.withAlpha(ctx, o.alpha ?? 1, () => {
      path();
      ctx.setLineDash(sp >= 1 ? [] : [len * sp, len]);
      ctx.lineWidth = o.width || stroke.card;
      ctx.lineJoin = 'round';
      ctx.strokeStyle = o.stroke;
      ctx.stroke();
    });
  }

  function roundRect(ctx, x, y, w, h, r) { D.rectPath(ctx, x, y, w, h, r); }

  // ---------- Paper ----------

  // A page with a folded corner and a few ruled lines.
  function doc(ctx, x, y, w, h, col, p, o = {}) {
    const f = Math.min(w, h) * 0.3;
    const path = () => {
      ctx.beginPath();
      ctx.moveTo(x, y); ctx.lineTo(x + w - f, y); ctx.lineTo(x + w, y + f);
      ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath();
    };
    shape(ctx, path, 2 * (w + h), p, { fill: o.fill || paper, stroke: col, width: o.width || 1.5, alpha: o.alpha });
    const fp = ease.out(range(p, 0.45, 1)) * (o.alpha ?? 1);
    D.withAlpha(ctx, fp, () => {
      ctx.beginPath();
      ctx.moveTo(x + w - f, y); ctx.lineTo(x + w - f, y + f); ctx.lineTo(x + w, y + f);
      ctx.strokeStyle = col; ctx.lineWidth = o.width || 1.5; ctx.lineJoin = 'round'; ctx.stroke();
      const n = o.lines ?? Math.max(0, Math.floor((h - f - 6) / 6));
      ctx.strokeStyle = o.lineColor || col;
      ctx.globalAlpha *= 0.55;
      ctx.lineWidth = Math.max(1, h / 18);
      for (let i = 0; i < n; i++) {
        const ly = y + f + 4 + i * ((h - f - 8) / Math.max(1, n));
        const lw = (w - 10) * (i === n - 1 ? 0.55 : 0.85 - (i % 2) * 0.12);
        ctx.beginPath(); ctx.moveTo(x + 5, ly); ctx.lineTo(x + 5 + lw * range(p, 0.5 + i * 0.08, 0.9 + i * 0.03), ly); ctx.stroke();
      }
    });
  }

  // A folder with a tab; `sheets` pages peek out above the pocket.
  function folder(ctx, x, y, w, h, col, p, o = {}) {
    const t = Math.max(4, h * 0.22), tw = w * 0.42;
    const sheets = o.sheets || 0;
    for (let k = Math.ceil(sheets) - 1; k >= 0; k--) {
      const a = clamp01(sheets - k);
      D.withAlpha(ctx, ease.out(range(p, 0.4, 1)) * a * (o.alpha ?? 1), () => {
        const sy = y + t - 3 - (k + 1) * Math.max(2, h * 0.09) + (1 - ease.out(a)) * 6;
        roundRect(ctx, x + w * 0.18 + k * 2, sy, w * 0.66, h * 0.6, 1.5);
        ctx.fillStyle = paper; ctx.fill();
        ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.stroke();
      });
    }
    const path = () => {
      ctx.beginPath();
      ctx.moveTo(x, y + h); ctx.lineTo(x, y + 2); ctx.quadraticCurveTo(x, y, x + 2, y);
      ctx.lineTo(x + tw, y); ctx.lineTo(x + tw + t, y + t); ctx.lineTo(x + w - 2, y + t);
      ctx.quadraticCurveTo(x + w, y + t, x + w, y + t + 2); ctx.lineTo(x + w, y + h); ctx.closePath();
    };
    shape(ctx, path, 2 * (w + h), p, { fill: o.fill, stroke: col, width: o.width || 1.5, alpha: o.alpha });
  }

  // A small paper sheet used as a travelling token glyph.
  const sheetGlyph = (col, o = {}) => (ctx, x, y) => {
    const w = o.w || 22, h = o.h || 28;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(o.tilt ?? -0.08);
    doc(ctx, -w / 2, -h / 2, w, h, col, 1, { lines: 3, width: 1.8 });
    if (o.stamp) {
      ctx.beginPath(); ctx.arc(w * 0.12, h * 0.18, w * 0.26, 0, Math.PI * 2);
      ctx.strokeStyle = o.stamp; ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.restore();
  };

  // A file row as in a file explorer: icon + mono name. Folders when the name ends in '/'.
  function fileRow(ctx, name, x, baseline, col, p, o = {}) {
    const isDir = name.endsWith('/');
    const ip = range(p, 0, 0.8);
    if (isDir) folder(ctx, x, baseline - 19, 24, 19, col, ip, { fill: o.iconFill, sheets: o.sheets });
    else doc(ctx, x + 3, baseline - 22, 18, 23, col, ip, { lines: 3, width: 1.4 });
    D.text(ctx, name, x + 34, baseline, { style: o.style || type.mono, p: range(p, 0.2, 1), color: o.color });
  }

  // ---------- People ----------

  function avatar(ctx, cx, cy, r, role, p) {
    if (p <= 0) return;
    const len = Math.PI * 2 * r;
    shape(ctx, () => { ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI * 1.5); }, len, p, { fill: role.fill, stroke: role.stroke, width: 2 });
    D.withAlpha(ctx, ease.out(range(p, 0.45, 1)), () => {
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, r - 1, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = role.stroke;
      ctx.beginPath(); ctx.arc(cx, cy - r * 0.16, r * 0.33, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx, cy + r * 0.8, r * 0.66, r * 0.5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });
  }

  // ---------- Chat ----------

  // An app window. Returns the body rect.
  function chatWindow(ctx, b, app, role, p, o = {}) {
    const hh = o.header || 36;
    shape(ctx, () => roundRect(ctx, b.x, b.y, b.w, b.h, 8), 2 * (b.w + b.h), p, { fill: paper, stroke: role.stroke });
    const hp = ease.out(range(p, 0.35, 1));
    D.withAlpha(ctx, hp, () => {
      ctx.save();
      roundRect(ctx, b.x, b.y, b.w, b.h, 8); ctx.clip();
      ctx.fillStyle = role.fill; ctx.fillRect(b.x, b.y, b.w, hh);
      ctx.strokeStyle = role.stroke; ctx.lineWidth = 1; ctx.globalAlpha *= 0.6;
      ctx.beginPath(); ctx.moveTo(b.x, b.y + hh + 0.5); ctx.lineTo(b.x + b.w, b.y + hh + 0.5); ctx.stroke();
      ctx.restore();
      [0, 1, 2].forEach((i) => {
        ctx.beginPath(); ctx.arc(b.x + 18 + i * 15, b.y + hh / 2, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = faint; ctx.fill();
      });
    });
    D.text(ctx, app, b.x + 70, b.y + hh / 2 + 7, { style: o.appStyle || { family: font.sans, size: 20, weight: 600, lh: 26 }, p: range(p, 0.45, 1), rise: 3 });
    return { x: b.x + 12, y: b.y + hh + 10, w: b.w - 24, h: b.h - hh - 20 };
  }

  // Right-aligned user bubble with wrapped text. Returns its rect.
  // Raw content in flight: a loose, tilted scrap with a scribble (contrast with sheetGlyph's ruled page).
  const scrapGlyph = (col, o = {}) => (ctx, x, y) => {
    const w = o.w || 20;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(o.tilt ?? 0.18);
    roundRect(ctx, -w / 2, -w / 2, w, w, 2);
    ctx.fillStyle = paper; ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.stroke();
    ctx.beginPath();
    for (let i = 0; i <= 6; i++) {
      const px = -w / 2 + 4 + i * (w - 8) / 6, py = (i % 2 ? -3 : 3);
      i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.lineWidth = 1.4; ctx.stroke();
    ctx.restore();
  };

  // A file attached to a chat answer: card with icon and name. Returns its width.
  function attachment(ctx, x, y, name, col, p, o = {}) {
    const s = type.monoSm;
    const w = D.measure(ctx, name, s) + 54, h = 36;
    shape(ctx, () => roundRect(ctx, x, y, w, h, 8), 2 * (w + h), p, { fill: o.fill || paper, stroke: col, width: 1.4 });
    const ip = range(p, 0.25, 1);
    if (name.endsWith('/')) folder(ctx, x + 11, y + 9, 22, 18, col, ip, { fill: o.iconFill, sheets: 2 });
    else doc(ctx, x + 13, y + 7, 17, 22, col, ip, { lines: 3, width: 1.3 });
    D.text(ctx, name, x + 42, y + 25, { style: s, p: range(p, 0.35, 1), rise: 3 });
    return w;
  }

  // Small chat-app window icon.
  function chatIcon(ctx, x, y, sz, role, p) {
    const h = sz * 0.8;
    shape(ctx, () => roundRect(ctx, x, y, sz, h, 4), 2 * (sz + h), p, { fill: paper, stroke: role.stroke, width: 1.6 });
    D.withAlpha(ctx, ease.out(range(p, 0.4, 1)), () => {
      ctx.save(); roundRect(ctx, x, y, sz, h, 4); ctx.clip();
      ctx.fillStyle = role.fill; ctx.fillRect(x, y, sz, h * 0.28);
      ctx.restore();
      roundRect(ctx, x + sz * 0.42, y + h * 0.42, sz * 0.46, h * 0.24, 3);
      ctx.fillStyle = role.fill; ctx.fill(); ctx.strokeStyle = role.stroke; ctx.lineWidth = 1; ctx.stroke();
    });
  }

  function userBubble(ctx, right, y, maxW, text, role, p, style) {
    const s = style || { family: font.sans, size: 20, weight: 400, lh: 26 };
    const lines = D.wrap(ctx, text, maxW - 28, s);
    const w = Math.min(maxW, Math.max(...lines.map((l) => D.measure(ctx, l, s))) + 28);
    const h = lines.length * s.lh + 18;
    const x = right - w;
    const e = ease.out(clamp01(p));
    D.withAlpha(ctx, e, () => {
      ctx.save();
      ctx.translate(0, (1 - e) * 8);
      roundRect(ctx, x, y, w, h, 14);
      ctx.fillStyle = role.fill; ctx.fill();
      ctx.strokeStyle = role.stroke; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.restore();
    });
    D.paragraph(ctx, lines, x + 14, y + 9 + s.size, { style: s, p: range(p, 0.2, 1), rise: 8 });
    return { x, y, w, h };
  }

  // Three waiting dots. Only visible while `a` > 0; motion is driven by t (bounded by the caller).
  function typing(ctx, x, y, a, t, col) {
    D.withAlpha(ctx, a, () => {
      const ga = ctx.globalAlpha;
      for (let i = 0; i < 3; i++) {
        const k = 0.5 + 0.5 * Math.sin(t / 150 - i * 0.9);
        ctx.beginPath(); ctx.arc(x + i * 14, y - k * 4, 4, 0, Math.PI * 2);
        ctx.fillStyle = col; ctx.globalAlpha = ga * (0.45 + 0.55 * k); ctx.fill();
      }
    });
  }

  // Assistant answer: grey text bars that draw on (content is not invented).
  function answerBars(ctx, x, y, widths, p, col = faint) {
    widths.forEach((w, i) => D.line(ctx, [[x, y + i * 14], [x + w, y + i * 14]], range(p, i * 0.2, 0.6 + i * 0.2), { color: col, width: 6 }));
  }

  // ---------- Input sources ----------

  function calendarIcon(ctx, x, y, s, col, p) {
    shape(ctx, () => roundRect(ctx, x, y + 4, s, s, 3), 4 * s, p, { fill: paper, stroke: col, width: 1.6 });
    D.withAlpha(ctx, ease.out(range(p, 0.4, 1)), () => {
      const ga = ctx.globalAlpha;
      ctx.fillStyle = col; ctx.globalAlpha = ga * 0.85; ctx.fillRect(x + 1, y + 5, s - 2, s * 0.24);
      ctx.globalAlpha = ga;
      ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
      [0.3, 0.7].forEach((f) => { ctx.beginPath(); ctx.moveTo(x + s * f, y); ctx.lineTo(x + s * f, y + 9); ctx.stroke(); });
      for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) {
        ctx.fillStyle = r === 1 && c === 1 ? col : faint;
        ctx.fillRect(x + 6 + c * (s - 12) / 3, y + s * 0.44 + r * s * 0.24, (s - 12) / 3 - 4, s * 0.16);
      }
    });
  }

  function sessionIcon(ctx, x, y, s, col, p) {
    shape(ctx, () => roundRect(ctx, x, y + 2, s * 0.72, s * 0.4, 7), 2 * s, p, { fill: paper, stroke: col, width: 1.6 });
    shape(ctx, () => roundRect(ctx, x + s * 0.28, y + s * 0.54, s * 0.72, s * 0.4, 7), 2 * s, range(p, 0.2, 1), { fill: col, stroke: col, width: 1.6 });
    D.withAlpha(ctx, ease.out(range(p, 0.5, 1)), () => {
      ctx.fillStyle = paper;
      [0, 1, 2].forEach((i) => { ctx.beginPath(); ctx.arc(x + s * 0.5 + i * 8, y + s * 0.74, 2, 0, Math.PI * 2); ctx.fill(); });
    });
  }

  const WAVE = [0.3, 0.6, 0.9, 0.5, 0.75, 0.35, 0.8, 0.55, 0.25];
  function transcriptIcon(ctx, x, y, s, col, p) {
    doc(ctx, x + s * 0.1, y, s * 0.8, s, col, p, { lines: 0, width: 1.6 });
    D.withAlpha(ctx, ease.out(range(p, 0.4, 1)), () => {
      ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
      const cx = x + s * 0.5, cy = y + s * 0.62, n = 7;
      for (let i = 0; i < n; i++) {
        const hgt = s * 0.36 * WAVE[i] * range(p, 0.4 + i * 0.05, 0.8 + i * 0.03);
        const bx = cx - (n - 1) * 2.8 + i * 5.6;
        ctx.beginPath(); ctx.moveTo(bx, cy - hgt / 2); ctx.lineTo(bx, cy + hgt / 2); ctx.stroke();
      }
    });
  }

  // Distils many inputs into one document.
  function funnelIcon(ctx, x, y, s, col, p) {
    const path = () => {
      ctx.beginPath();
      ctx.moveTo(x, y); ctx.lineTo(x + s, y); ctx.lineTo(x + s * 0.62, y + s * 0.55);
      ctx.lineTo(x + s * 0.62, y + s * 0.9); ctx.lineTo(x + s * 0.38, y + s); ctx.lineTo(x + s * 0.38, y + s * 0.55); ctx.closePath();
    };
    shape(ctx, path, 3.4 * s, p, { fill: paper, stroke: col, width: 1.8 });
    D.withAlpha(ctx, ease.out(range(p, 0.5, 1)), () => {
      ctx.fillStyle = col;
      [0.25, 0.5, 0.75].forEach((f, i) => { ctx.beginPath(); ctx.arc(x + s * f, y + s * 0.16 + (i % 2) * 4, 3, 0, Math.PI * 2); ctx.fill(); });
    });
  }

  function searchIcon(ctx, cx, cy, r, col, p) {
    shape(ctx, () => { ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 4, Math.PI * 1.75); }, 2 * Math.PI * r, p, { stroke: col, width: 2.4 });
    D.line(ctx, [[cx + r * 0.72, cy + r * 0.72], [cx + r * 1.6, cy + r * 1.6]], range(p, 0.5, 1), { color: col, width: 3 });
  }

  // A slash command as typed into a chat or palette.
  function command(ctx, x, y, name, col, p) {
    const s = type.monoSm;
    const w = D.measure(ctx, '/' + name, s) + 22, h = 32;
    D.withAlpha(ctx, ease.out(clamp01(p)), () => {
      roundRect(ctx, x, y, w, h, 6);
      ctx.fillStyle = paper; ctx.fill();
      ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke();
    });
    D.setFont(ctx, s);
    D.withAlpha(ctx, ease.out(clamp01(p)), () => {
      ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
      ctx.fillStyle = col; ctx.fillText('/', x + 11, y + h / 2 + 1);
      ctx.fillStyle = color.ink; ctx.fillText(name, x + 11 + D.measure(ctx, '/', s), y + h / 2 + 1);
    });
    return w;
  }

  // ---------- Governance ----------

  // A rubber stamp that lands: settles from 1.25x with opacity, then holds. Never from zero.
  function stamp(ctx, cx, cy, text, col, p, o = {}) {
    if (p <= 0) return;
    const e = ease.out(clamp01(p));
    const sc = 1 + 0.25 * (1 - e);
    const s = { family: font.mono, size: o.size || 20, weight: 500, lh: 24, tracking: 0.12 };
    const w = D.measure(ctx, text, s) + 30, h = s.size + 22;
    ctx.save();
    ctx.translate(cx, cy); ctx.rotate(o.angle ?? -0.12); ctx.scale(sc, sc);
    ctx.globalAlpha *= range(p, 0, 0.35);
    roundRect(ctx, -w / 2, -h / 2, w, h, 5);
    ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.stroke();
    roundRect(ctx, -w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 3);
    ctx.lineWidth = 1; ctx.stroke();
    D.setFont(ctx, s);
    ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, 1, 1);
    ctx.restore();
  }

  function signature(ctx, x, y, w, col, p) {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const f = i / 40;
      pts.push([x + f * w, y - Math.sin(f * Math.PI * 5) * 7 * (1 - f * 0.6) - Math.sin(f * Math.PI) * 4]);
    }
    D.line(ctx, pts, p, { color: col, width: 2 });
  }

  // ---------- Timelines and groups ----------

  // A decision milestone: a diamond on a timeline or branch.
  function diamond(ctx, cx, cy, r, col, p, o = {}) {
    const path = () => { ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx + r, cy); ctx.lineTo(cx, cy + r); ctx.lineTo(cx - r, cy); ctx.closePath(); };
    shape(ctx, path, 5.7 * r, p, { fill: o.fill || paper, stroke: col, width: o.width || 2 });
  }

  // A group of people as a dot grid. `mask[i]` marks who is counted; `hl` (0..1) fades the counted dots in,
  // so the same group can first appear neutral and then show one person's reading of it.
  function peopleGrid(ctx, x, y, cols, rows, mask, col, p, o = {}) {
    const g = o.gap || 20, r = o.r || 6, n = cols * rows, hl = o.hl ?? 1;
    for (let i = 0; i < n; i++) {
      const cx = x + (i % cols) * g, cy = y + Math.floor(i / cols) * g;
      const a = ease.out(range(p, (i / n) * 0.5, 0.5 + (i / n) * 0.5));
      D.withAlpha(ctx, a, () => {
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = paper; ctx.fill();
        ctx.strokeStyle = o.empty || '#a9a496'; ctx.lineWidth = 1.5; ctx.stroke();
        if (mask[i] && hl > 0) {
          ctx.globalAlpha *= ease.out(clamp01(hl));
          ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fillStyle = col; ctx.fill();
        }
      });
    }
  }

  // A product dashboard window: a KPI tile (label + value bar, no invented number) and a small bar chart.
  function dashboard(ctx, b, name, role, p, o = {}) {
    const body = chatWindow(ctx, b, name, role, p, o);
    const kw = Math.round(body.w * 0.46);
    const k = { x: o.kpiRight ? body.x + body.w - kw : body.x, y: body.y, w: kw, h: body.h };
    const kp = range(p, 0.35, 1);
    shape(ctx, () => roundRect(ctx, k.x, k.y, k.w, k.h, 6), 2 * (k.w + k.h), kp, { fill: role.fill, stroke: role.stroke, width: 1.4 });
    D.text(ctx, o.kpi || 'KPI', k.x + 16, k.y + 34, { style: { family: font.sans, size: 20, weight: 600, lh: 26 }, p: range(p, 0.45, 1), rise: 3 });
    D.line(ctx, [[k.x + 16, k.y + 76], [k.x + 16 + k.w * 0.42, k.y + 76]], range(p, 0.55, 0.95), { color: color.ink, width: 16 });
    D.line(ctx, [[k.x + 16, k.y + 110], [k.x + 16 + k.w * 0.6, k.y + 110]], range(p, 0.6, 1), { color: faint, width: 6 });
    const cx0 = o.kpiRight ? body.x + 14 : k.x + k.w + 24, cw = o.kpiRight ? k.x - 24 - cx0 : body.x + body.w - cx0, base = body.y + body.h - 4;
    const hs = [0.45, 0.7, 0.55, 0.9, 0.65, 0.8];
    const bw = cw / hs.length - 10;
    D.line(ctx, [[cx0, base + 0.5], [cx0 + cw, base + 0.5]], range(p, 0.45, 0.8), { color: role.stroke, width: 1 });
    hs.forEach((h, i) => {
      const bh = (body.h - 16) * h * ease.out(range(p, 0.55 + i * 0.05, 0.85 + i * 0.025));
      if (bh <= 0) return;
      ctx.fillStyle = role.stroke;
      D.withAlpha(ctx, 0.75, () => ctx.fillRect(cx0 + i * (bw + 10), base - bh, bw, bh));
    });
    return { body, kpi: k };
  }

  // A pinned note (an assumption, a caveat): paper card with a pin.
  function note(ctx, b, text, col, p, o = {}) {
    shape(ctx, () => roundRect(ctx, b.x, b.y, b.w, b.h, 4), 2 * (b.w + b.h), p, { fill: o.fill || paper, stroke: col, width: 1.6 });
    D.withAlpha(ctx, ease.out(range(p, 0.4, 1)), () => {
      ctx.beginPath(); ctx.arc(b.x + b.w / 2, b.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = col; ctx.fill();
    });
    const s = o.style || type.body;
    const lines = D.wrap(ctx, text, b.w - 32, s);
    D.paragraph(ctx, lines, b.x + 16, b.y + (b.h - lines.length * s.lh) / 2 + s.size - 2, { style: s, p: range(p, 0.35, 1) });
  }

  function crossMark(ctx, cx, cy, sz, col, p) {
    const h = sz / 2;
    D.line(ctx, [[cx - h, cy - h], [cx + h, cy + h]], range(p, 0, 0.6), { color: col, width: 3 });
    D.line(ctx, [[cx + h, cy - h], [cx - h, cy + h]], range(p, 0.4, 1), { color: col, width: 3 });
  }

  function clockIcon(ctx, cx, cy, r, col, p) {
    shape(ctx, () => { ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI * 1.5); }, 2 * Math.PI * r, p, { fill: paper, stroke: col, width: 2 });
    D.line(ctx, [[cx, cy], [cx, cy - r * 0.62]], range(p, 0.5, 0.8), { color: col, width: 2.2 });
    D.line(ctx, [[cx, cy], [cx + r * 0.48, cy + r * 0.2]], range(p, 0.6, 0.95), { color: col, width: 2.2 });
  }

  // Building: a code window with angle brackets.
  function codeIcon(ctx, x, y, s, col, p) {
    const h = s * 0.8;
    shape(ctx, () => roundRect(ctx, x, y + (s - h) / 2, s, h, 4), 2 * (s + h), p, { fill: paper, stroke: col, width: 1.6 });
    const cy = y + s / 2 + 2, q = s * 0.14;
    const lp = range(p, 0.45, 1);
    D.line(ctx, [[x + s * 0.36, cy - q], [x + s * 0.22, cy], [x + s * 0.36, cy + q]], lp, { color: col, width: 2.2 });
    D.line(ctx, [[x + s * 0.64, cy - q], [x + s * 0.78, cy], [x + s * 0.64, cy + q]], lp, { color: col, width: 2.2 });
    D.line(ctx, [[x + s * 0.55, cy - q * 1.3], [x + s * 0.45, cy + q * 1.3]], lp, { color: col, width: 2 });
  }

  // Visibility: an eye.
  function eyeIcon(ctx, cx, cy, w, col, p) {
    const h = w * 0.34;
    shape(ctx, () => {
      ctx.beginPath(); ctx.moveTo(cx - w / 2, cy);
      ctx.quadraticCurveTo(cx, cy - h * 1.6, cx + w / 2, cy); ctx.quadraticCurveTo(cx, cy + h * 1.6, cx - w / 2, cy); ctx.closePath();
    }, 2.3 * w, p, { fill: paper, stroke: col, width: 2 });
    D.withAlpha(ctx, ease.out(range(p, 0.5, 1)), () => { ctx.beginPath(); ctx.arc(cx, cy, h * 0.62, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); });
  }

  global.Objects = {
    shape, doc, folder, sheetGlyph, scrapGlyph, attachment, chatIcon, fileRow, avatar, chatWindow, userBubble, typing, answerBars,
    calendarIcon, sessionIcon, transcriptIcon, funnelIcon, searchIcon, command, stamp, signature, faint,
    diamond, peopleGrid, dashboard, note, crossMark, clockIcon, codeIcon, eyeIcon,
  };
})(window);
