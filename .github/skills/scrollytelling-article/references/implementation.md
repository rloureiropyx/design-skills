# Implementation reference — standalone HTML + GSAP

One self-contained `.html`. Inline `<style>` and `<script>`. GSAP from CDN — that is the whole dependency list for a discrete-scene article:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

ScrollTrigger is **not** part of the default build. Add it only if the approved script contains a scrubbed sequence, and see that section below for the tag.

## Page skeleton (sticky graphic + steps)

Keep all scene text in the markup, in reading order, grouped and commented — never injected by JS. This is both the no-JS fallback and where the user edits copy.

```html
<article>
  <header class="hero">…</header>

  <section class="scrolly">
    <div class="graphic" aria-hidden="true">
      <!-- one layer per visual state; JS toggles/tweens them -->
      <svg id="state-svg">…</svg>
    </div>
    <div class="steps">
      <!-- SCENE 1: [nombre de la escena] -->
      <div class="step" data-state="1">
        <h2>…</h2><p>…</p>
      </div>
      <!-- SCENE 2: … -->
      <div class="step" data-state="2">…</div>
    </div>
  </section>

  <section class="prose">…static prose bridge…</section>
</article>
```

```css
.scrolly { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.graphic { position: sticky; top: 0; height: 100svh; /* svh, not vh: mobile URL bar */
           display: flex; align-items: center; }
.step { min-height: 90svh; display: flex; align-items: center; } /* one step ≈ one viewport */
.step > * { max-width: 32rem; }

/* Mobile: the graphic pins to the TOP and stays ABOVE the text.
   Never put it behind the cards (z-index: -1) — phone cards are tall enough
   to cover the whole graphic, and the reader ends up seeing no visual at all. */
@media (max-width: 900px) {
  .scrolly { --band: clamp(196px, 38svh, 330px); grid-template-columns: 1fr; gap: 0; }

  .graphic { z-index: 3; height: var(--band);
             background: var(--bg);   /* opaque: cards must not show through */
             pointer-events: none; }

  .steps { z-index: 1; }
  .step  { min-height: calc(100svh - var(--band));   /* card fits the readable band */
           align-items: flex-end; padding-bottom: 4svh; }
  .step > * { background: color-mix(in srgb, var(--bg) 96%, transparent);
              padding: 1rem; border-radius: .5rem; }
}

/* Landscape phones: wide but short. Stacking wastes the width and a pinned band
   leaves no room to read — go back to two columns at a compact scale. */
@media (min-width: 640px) and (max-height: 560px) {
  .scrolly { grid-template-columns: minmax(0, 1.1fr) minmax(260px, .9fr); gap: 1.5rem; }
  .graphic { position: sticky; top: 0; height: 100svh; align-items: center; background: none; }
  .step { min-height: 100svh; align-items: center; }
}

/* Narrow and short at once: nothing works pinned. Stack everything inline. */
@media (max-width: 639px) and (max-height: 520px) {
  .graphic { position: static; height: 66svh; background: none; }
  .step { min-height: 0; align-items: flex-start; padding-bottom: 2.5rem; }
}
```

Size `--band` and the mobile type scale together so the **tallest** card fits inside `100svh - band`. Measure real card heights at 320/360/375px rather than guessing.

## Scene state selection (default)

Per-step `ScrollTrigger.create({ start: 'top 60%' })` looks fine and silently skips scenes: when a card is much shorter than its scene block (common on tablets), two adjacent step ranges are active at once and the callback order decides the winner. Select the state deterministically instead — pick the card that occupies most of the readable zone:

```js
const cards = [...document.querySelectorAll('.step[data-state]')]
  .map(step => ({ step, card: step.querySelector('.step-card') || step }));

function setState(n) { /* tween the graphic to state n — transform/opacity only */ }

// The graphic only obstructs reading when it is stacked above the text (mobile).
function readingZoneTop() {
  const g = document.querySelector('.graphic');
  const s = document.querySelector('.steps');
  if (getComputedStyle(g).position !== 'sticky') return 0;
  const gr = g.getBoundingClientRect(), sr = s.getBoundingClientRect();
  const stacked = Math.min(gr.right, sr.right) - Math.max(gr.left, sr.left) > 0;
  const pinned = gr.top <= 1 && gr.bottom > 0;
  return stacked && pinned ? Math.min(gr.bottom, innerHeight * 0.7) : 0;
}

let active = 1;
function pick() {
  const top = readingZoneTop();
  let best = null, bestArea = 0;
  for (const { step, card } of cards) {
    const r = card.getBoundingClientRect();
    const area = Math.min(r.bottom, innerHeight) - Math.max(r.top, top);
    if (area >= bestArea) { bestArea = area; best = step; }   // >= biases to the later card
  }
  if (bestArea > 0 && best && +best.dataset.state !== active) setState(active = +best.dataset.state);
}

let queued = false;
const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; pick(); }); } };
addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', schedule);
addEventListener('orientationchange', schedule);
schedule();
```

Rules:
- Exactly one scene active at any scroll position; every scene reachable scrolling **down and up**.
- Recompute on `resize` and `orientationchange` — the readable zone changes with the breakpoint.
- `setState` must be idempotent and interruptible: kill running tweens on the same targets (`gsap.killTweensOf`) or use `overwrite: 'auto'`.
- Tween durations 0.4–0.8s; animate only `transform` and `opacity`.
- This needs GSAP only for the tween. Do not load ScrollTrigger at all unless a scrubbed sequence actually uses it.

## Scrubbed sequence (only if the script calls for it)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

```js
gsap.timeline({
  scrollTrigger: { trigger: '.scrub-section', start: 'top top', end: '+=200%',
                   scrub: 0.5, pin: true }
})
.to('#piece', { x: 300 })
.to('#piece', { rotation: 90 }, '<50%');
```

Pinning caveat: pin only direct children of the body flow; pinning inside transformed/overflow-hidden ancestors breaks. Prefer CSS `position: sticky` over ScrollTrigger `pin` when possible — cheaper and more robust.

## Reduced motion + no-JS (mandatory)

```js
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
// If reduced: keep the SAME triggers, but setState applies changes with duration 0.
// Content and state changes remain; motion goes away.
```

```html
<noscript><style>
  .graphic { position: static; height: auto; }
  .step { min-height: 0; }
  /* if states are layered, reveal a meaningful default state */
</style></noscript>
```

- All meaning must exist in the text; the graphic is `aria-hidden` **only** if fully redundant with the text. If the graphic carries information, give it a text alternative instead.
- Test keyboard scroll (space/arrows) — never hijack the wheel, never `scroll-behavior` traps, no scrolljacking.

## Checklist before delivery

Verify in a headless browser at `320×568, 375×667, 375×812, 414×896, 768×1024, 812×375, 667×375, 1024×600, 1280×800` — not by eyeballing one desktop window. Branch on viewport **height** as well as width.

- [ ] Works with JS disabled (readable top to bottom)
- [ ] `prefers-reduced-motion` honored
- [ ] Every scene activates scrolling down, and reverses scrolling up
- [ ] `document.documentElement.scrollWidth === innerWidth` at every size — no horizontal overflow
- [ ] At each scene's settled position, its card does not overlap the pinned graphic
- [ ] Active graphic and its scene text are on screen together
- [ ] Landscape phone (`812×375`) uses the two-column layout, not the portrait band
- [ ] Only transform/opacity animated; no layout thrash
- [ ] Scene copy grouped + commented in markup for easy editing
- [ ] Headings hierarchy + landmarks valid; contrast ≥ 4.5:1

## How to measure "settled position" without lying to yourself

The overlap check is the one that produces false results, in both directions. Get it wrong and you either chase phantom bugs or ship a broken landscape phone.

**Do not use `scrollIntoView({ block: 'center' })` to define the settled position.** Centering a card in the viewport is not where the reader lands; it is one arbitrary scroll offset out of hundreds, and on short viewports it is frequently the *worst* one. Using it as the definition reports failures on layouts that are fine.

The honest question is existential, not positional: **is there any scroll offset at which this scene is active, its card is fully inside the viewport, and the card's rect does not intersect the graphic's rect?** If yes, the reader can read it. Scan the scene's scroll range and look for one such offset.

Two rules for the scan:

1. **Step small.** When a card nearly fills the viewport — a 369px card in a 375px window — exactly one narrow band of offsets works, and a 24px step walks straight past it. Step 4px or less, or you will report a failure that does not exist.
2. **Pair the scan with a deterministic assertion**, so you can tell a real failure from a sampling artifact. Compare the card's height against the readable zone (viewport height minus the graphic's band, or the full height in two-column layouts). If the card is taller than its zone, it genuinely cannot be read without overlap, and no scroll offset will save it — that is a CSS bug, and the fix is a smaller type scale or less padding in the height-constrained media query. If the card fits but the scan found nothing, your scan is too coarse.

Report the matrix honestly, including which viewport had the least margin. "Passes at 667×375 with 6px to spare" is useful to whoever edits the copy next; "all green" is not.
