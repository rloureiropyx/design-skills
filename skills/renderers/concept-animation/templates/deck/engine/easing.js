/* Easing and motion tokens. Curves come from the `animate` skill; do not hand-roll new ones. */
(function (global) {
  'use strict';

  function cubicBezier(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
    const sampleY = (t) => ((ay * t + by) * t + cy) * t;
    const slopeX = (t) => (3 * ax * t + 2 * bx) * t + cx;

    function solveX(x) {
      let t = x;
      for (let i = 0; i < 8; i++) {
        const err = sampleX(t) - x;
        if (Math.abs(err) < 1e-6) return t;
        const d = slopeX(t);
        if (Math.abs(d) < 1e-6) break;
        t -= err / d;
      }
      let lo = 0, hi = 1;
      t = x;
      while (lo < hi) {
        const v = sampleX(t);
        if (Math.abs(v - x) < 1e-6) return t;
        if (x > v) lo = t; else hi = t;
        t = (lo + hi) / 2;
        if (hi - lo < 1e-7) break;
      }
      return t;
    }

    return (x) => (x <= 0 ? 0 : x >= 1 ? 1 : sampleY(solveX(x)));
  }

  const ease = {
    out: cubicBezier(0.23, 1, 0.32, 1),       // entrances / exits
    inOut: cubicBezier(0.77, 0, 0.175, 1),    // on-screen movement, draw-on, travel
    linear: (x) => x,
  };

  // Durations (ms). Explanatory tier: longer than UI, but entrances stay snappy.
  const dur = {
    enter: 420,
    draw: 650,
    travel: 900,
    stagger: 70,
    pulse: 700,
    slide: 450,
    reducedFade: 150,
  };

  const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
  const lerp = (a, b, t) => a + (b - a) * t;
  // Remap p from [a,b] to [0,1].
  const range = (p, a, b) => clamp01((p - a) / (b - a));
  // One-shot rise-and-settle, used for emphasis. Never loops.
  const pulse = (p) => (p <= 0 || p >= 1 ? 0 : Math.sin(Math.PI * p));

  global.Motion = { cubicBezier, ease, dur, clamp01, lerp, range, pulse };
})(window);
