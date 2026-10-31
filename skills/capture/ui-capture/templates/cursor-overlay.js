// ui-capture cursor overlay, injected into every page during replay video passes (agent-browser --init-script).
// Draws a visible cursor that travels (eased arc + short fading trail), presses, and shows a click ring.
// Position persists across navigations via sessionStorage so movement continues from the last click.
(() => {
  if (window.__uic) return;
  const KEY = "__uic_cursor";
  // Re-evaluated on every draw: the viewport is often resized after the first page loads.
  const isTouch = () => innerWidth <= 480;
  let pos = (() => { try { return JSON.parse(sessionStorage.getItem(KEY)) || null; } catch { return null; } })() || { x: innerWidth * 0.5, y: innerHeight * 0.55 };
  let el = null;
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(pos)); } catch { /* storage blocked */ } };
  const layer = () => {
    const touch = isTouch();
    if (el && el.isConnected && el.dataset.touch === String(touch)) return el;
    if (el) el.remove();
    el = document.createElement("div");
    el.dataset.touch = String(touch);
    el.id = "__uic_cursor";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = touch
      ? '<div style="width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:50%;background:rgba(17,17,17,.28);border:2.5px solid #fff;box-shadow:0 0 0 1.5px rgba(17,17,17,.75),0 2px 6px rgba(0,0,0,.35)"></div>'
      : '<svg width="30" height="30" viewBox="0 0 24 24" style="display:block;filter:drop-shadow(0 1.5px 2px rgba(0,0,0,.4))"><path d="M4 2.5l6.6 18 2.6-7.3 7.3-2.6z" fill="#111" stroke="#fff" stroke-width="1.7" stroke-linejoin="round"/></svg>';
    Object.assign(el.style, { position: "fixed", left: "0", top: "0", zIndex: "2147483647", pointerEvents: "none", willChange: "transform", transition: "transform 0s", transformOrigin: touch ? "0 0" : "4px 2.5px" });
    (document.body || document.documentElement).appendChild(el);
    place(1);
    return el;
  };
  const place = (scale) => { if (el) el.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`; };
  // At most three ghosts, only while moving fast: enough to read direction without a comet tail.
  const ghosts = [];
  const ghost = (x, y) => {
    while (ghosts.length >= 3) ghosts.shift().remove();
    const g = document.createElement("div");
    g.setAttribute("aria-hidden", "true");
    const size = isTouch() ? 20 : 10;
    Object.assign(g.style, { position: "fixed", left: `${x - size / 2}px`, top: `${y - size / 2}px`, width: `${size}px`, height: `${size}px`, borderRadius: "50%", background: "rgba(17,17,17,.5)", boxShadow: "0 0 0 1px rgba(255,255,255,.8)", zIndex: "2147483646", pointerEvents: "none", transition: "opacity 300ms ease-out, transform 300ms ease-out" });
    document.documentElement.appendChild(g);
    ghosts.push(g);
    requestAnimationFrame(() => { g.style.opacity = "0"; g.style.transform = "scale(.35)"; });
    setTimeout(() => { g.remove(); const i = ghosts.indexOf(g); if (i >= 0) ghosts.splice(i, 1); }, 340);
  };
  const ease = (t) => 1 - Math.pow(1 - t, 4); // ease-out quart (≈ cubic-bezier(.22,1,.36,1)): quick start, soft landing
  window.__uic = {
    show() { layer(); },
    // Travel to (x, y) along a slight arc. Duration grows with distance so long moves stay readable.
    moveTo(x, y) {
      layer();
      const from = { ...pos };
      const dist = Math.hypot(x - from.x, y - from.y);
      // Slower than a live mouse on purpose: documentation viewers need to follow the movement.
      const duration = Math.max(350, Math.min(900, 300 + dist * 0.4));
      const bend = Math.min(80, dist * 0.12);
      const nx = -(y - from.y) / (dist || 1), ny = (x - from.x) / (dist || 1);
      const cx = (from.x + x) / 2 + nx * bend, cy = (from.y + y) / 2 + ny * bend;
      const start = performance.now();
      let last = { ...from }, frame = 0;
      return new Promise((resolve) => {
        const step = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const k = ease(t);
          pos = { x: (1 - k) * (1 - k) * from.x + 2 * (1 - k) * k * cx + k * k * x, y: (1 - k) * (1 - k) * from.y + 2 * (1 - k) * k * cy + k * k * y };
          place(1);
          const speed = Math.hypot(pos.x - last.x, pos.y - last.y);
          last = { ...pos };
          if (speed > 6 && t < 0.9 && frame++ % 4 === 0) ghost(pos.x, pos.y);
          if (t < 1) requestAnimationFrame(step); else { save(); resolve(Math.round(duration)); }
        };
        requestAnimationFrame(step);
      });
    },
    // Press feedback: cursor dips, then a two-tone ring expands from the click point.
    press() {
      layer();
      el.style.transition = "transform 150ms cubic-bezier(.3,1.4,.5,1)";
      place(0.85);
      setTimeout(() => { place(1); setTimeout(() => { el.style.transition = "transform 0s"; }, 160); }, 120);
      const r = document.createElement("div");
      r.setAttribute("aria-hidden", "true");
      const touch = isTouch();
      const size = touch ? 44 : 22;
      Object.assign(r.style, { position: "fixed", left: `${pos.x - size / 2}px`, top: `${pos.y - size / 2}px`, width: `${size}px`, height: `${size}px`, borderRadius: "50%", border: "2px solid rgba(0,0,0,.4)", boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.85), 0 0 0 1.5px rgba(255,255,255,.85)", background: "rgba(59,130,246,.25)", opacity: ".9", zIndex: "2147483646", pointerEvents: "none", transition: "transform 380ms cubic-bezier(.2,.8,.3,1), opacity 380ms ease-out" });
      document.documentElement.appendChild(r);
      requestAnimationFrame(() => { r.style.transform = `scale(${touch ? 1.6 : 2.9})`; r.style.opacity = "0"; });
      setTimeout(() => r.remove(), 440);
      save();
      return true;
    },
  };
  const ready = () => layer();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready, { once: true }); else ready();
})();
