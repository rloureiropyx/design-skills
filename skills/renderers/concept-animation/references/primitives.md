# Engine API

Read before step 4, before writing a slide. The engine consists of five globals, loaded in this order: `Motion`, `Theme`, `Draw`, `Objects`, `Deck`. All coordinates are on a 1920×1080 stage; the engine handles DPR and letterboxing.

## Slide

```js
Deck.register({
  id: 'lifecycle',                  // unique
  label: '06 — Lifecycle rules',    // top-left chrome
  title: '…',                       // announced as the page heading
  notes: '…',                       // speaker notes (N)
  beats: [{ name: 'route', dur: 1400, caption: '…' }],  // optional hold: ms to pause after the beat in an MP4 export
  render(ctx, s) { … },
});
```

`s` is the frame state handed to `render`:

| Field | Meaning |
| --- | --- |
| `s.beat`, `s.t` | Current beat index and ms since it started. `t = Infinity` means complete. |
| `s.tw(b, start, dur)` | Raw progress 0..1 of an interval inside beat `b`. It returns 1 once past `b` and 0 before it. This is the only timing call most slides need. |
| `s.within(b)` | Progress through beat `b`'s whole `dur`. |
| `s.isStatic`, `s.reduced` | Mode flags. Draw reading-order `Draw.badge`s when `isStatic`. |

Pass the raw `tw` value to primitives; each one applies its own curve.

## Draw

| Call | Draws |
| --- | --- |
| `text(ctx, str, x, y, {style, p, color, alpha, align, baseline, rise})` | Text that settles in (opacity plus a `rise`, default 6px). `style` is a `Theme.type` entry. |
| `wrap(ctx, str, maxW, style)` | Returns an array of lines. |
| `paragraph(ctx, lines, x, y, {style, p, stagger, color})` | Lines staggered by the `stagger` fraction of `p`. Returns the height. |
| `measure(ctx, str, style)` | Width in px. Use it to shrink a label until it fits. |
| `box(ctx, {x,y,w,h}, role, p, {fill, stroke, width})` | A card whose outline draws on, then its fill settles. |
| `line(ctx, pts, p, {color, width, dash, arrowEnd, arrowStart, arrowSize})` | A polyline connector that draws from `pts[0]`. The end arrow rides the pen tip. |
| `token(ctx, pts, p, label, color, {side:'left', offsetX, offsetY, glyph})` | A packet with a trail and an optional pill label. Invisible outside 0<p<1. `glyph(ctx, x, y, angle)` replaces the dot, e.g. `Objects.sheetGlyph(col)` so a document travels as a page. |
| `glow(ctx, {x,y,w,h}, amount, color, pad)` | Emphasis ring. Use `Motion.pulse(p)` for a one-shot, or a carry helper to hold it. |
| `rowHighlight(ctx, x, y, w, h, amount, color)` | Highlights one line inside a card (for example, the file being updated). |
| `check(ctx, x, y, size, p, color)` | A check mark that draws on. |
| `chip(ctx, x, y, label, color, p)` | A mono pill for results that persist, such as citations and file names. |
| `swatch(ctx, x, y, role, label, p)` | Legend entry. Reveal each one when its role first appears. |
| `personGlyph(ctx, x, y, size, color, alpha)` | Outline person icon. |
| `badge(ctx, n, x, y)` | Numbered reading-order disc for static mode. |
| `curve(a, b, {from, to, bend, n})` | Returns the points of a smooth cubic from `a` to `b`; `from`/`to` set each end's tangent to `'h'` or `'v'`. Feed it to `line` and `token` like any polyline. |
| `joinPaths(...paths)` | Concatenates paths into one, dropping duplicated joints, so a token can travel drop → curve → trunk in one move. |
| `pointAt(pts, p)`, `polyLen(pts)`, `withAlpha(ctx, a, fn)`, `rectPath(...)`, `setFont(ctx, style)` | Helpers for custom drawing. |

## Objects

Drawn representations of the real things a concept is made of. Same entrance grammar as `Draw` (outline draws on, fill settles, text rises); pass raw `tw` values. Colours come in as a role (`{fill, stroke}`) or a stroke colour, so Objects is theme-agnostic.

| Call | Draws |
| --- | --- |
| `doc(ctx, x, y, w, h, col, p, {lines, fill, width})` | A page with a folded corner and ruled lines. |
| `folder(ctx, x, y, w, h, col, p, {fill, sheets})` | A folder; `sheets` (fractional, animatable) peek out of the top. Animate `sheets` to show something being filed. |
| `fileRow(ctx, name, x, baseline, col, p, {style, iconFill, sheets, color})` | Icon plus mono name. A name ending in `/` gets a folder icon, otherwise a doc. |
| `sheetGlyph(col, {w, h, tilt, stamp})` | A `token` glyph: a small page in flight; `stamp` adds an approval mark. |
| `scrapGlyph(col, {w, tilt})` | A `token` glyph for raw content: a loose scrap with a scribble. Pair with `sheetGlyph` on the far side of a skill to show raw becoming structured. |
| `avatar(ctx, cx, cy, r, role, p)` | A person disc. |
| `chatWindow(ctx, {x,y,w,h}, app, role, p, {header})` | A chat app window with traffic-light dots and the app name. Returns the body rect. |
| `userBubble(ctx, right, y, maxW, text, role, p, style)` | A right-aligned question bubble that wraps. Returns its rect. |
| `typing(ctx, x, y, alpha, t, col)` | Three waiting dots. Bound it to the live beat (`alpha = 0` once complete) so nothing loops. |
| `answerBars(ctx, x, y, widths, p, col)` | Grey text bars for an answer, so no content is invented. |
| `attachment(ctx, x, y, name, col, p, {fill, iconFill})` | A file attached to a chat answer (card with icon and name). Returns its width, so a row is `x += attachment(...) + 10`. |
| `chatIcon(ctx, x, y, size, role, p)` | A small chat-window icon, e.g. to mark a claim in a summary. |
| `calendarIcon`, `sessionIcon`, `transcriptIcon`, `funnelIcon` `(ctx, x, y, size, col, p)`; `searchIcon(ctx, cx, cy, r, col, p)` | Source and action icons. |
| `command(ctx, x, y, name, col, p)` | A slash-command chip (`/name`). Returns its width. |
| `stamp(ctx, cx, cy, text, col, p, {angle, size})` | A rubber stamp that lands from 1.25x. Use for human approval. |
| `signature(ctx, x, y, w, col, p)` | A hand-drawn signature stroke. |
| `diamond(ctx, cx, cy, r, col, p, {fill, width})` | A decision milestone on a timeline or branch. |
| `peopleGrid(ctx, x, y, cols, rows, mask, col, p, {gap, r, hl, empty})` | A group of people as dots; `mask[i]` marks who is counted and `hl` (0..1) fades them in, so one group can show different readings. |
| `dashboard(ctx, {x,y,w,h}, name, role, p, {kpi, kpiRight})` | A product dashboard window: a KPI tile (label, no invented number) and a bar chart. Returns `{body, kpi}`. |
| `note(ctx, {x,y,w,h}, text, col, p, {style, fill})` | A pinned card for an assumption or caveat; text wraps. |
| `crossMark(ctx, cx, cy, size, col, p)` | A drawn X for a missed or skipped path. |
| `clockIcon(ctx, cx, cy, r, col, p)`, `eyeIcon(ctx, cx, cy, w, col, p)`; `codeIcon(ctx, x, y, size, col, p)` | Time, visibility, and building icons. |
| `shape(ctx, pathFn, len, p, {fill, stroke, width, alpha})` | Any closed path with the draw-on grammar, for new objects. |

## Motion

| Token | Use |
| --- | --- |
| `ease.out` `(0.23, 1, 0.32, 1)` | Entrances and settling. |
| `ease.inOut` `(0.77, 0, 0.175, 1)` | Draw-on and travel. |
| `dur` | `enter` 420, `draw` 650, `travel` 900, `stagger` 70, `pulse` 700, `slide` 450, `reducedFade` 150. |
| `range(p, a, b)` | Remaps a sub-interval to 0..1. |
| `lerp`, `clamp01` | Interpolation and clamping helpers. |
| `pulse(p)` | One-shot rise and fall that is 0 at both ends. |

Carry pattern: the emphasis is held at the end of beat `b` and fades as `b+1` starts.

```js
const carry = (s, b, start) => (s.beat === b ? range(s.t, start, start + 300) : s.beat === b + 1 ? 1 - range(s.t, 0, 300) : 0);
```

## Theme

- `color`: `surface`, `grid`, `gridMajor`, `frame`, `ink`, `muted`, `white`.
- `role[name]`: `{fill, stroke, label}`.
- `accent`: the progress-ring dot.
- `type`: `title` 46, `subtitle` 30, `heading` 22 (uppercase), `body`/`bodyStrong` 24, `mono` 24, `monoSm` 20, `chrome` 22.
- `stroke`: `hair` 1, `line` 1.5, `card` 2, `emphasis` 3.

## Runtime

**Query modes**

| Query | Behaviour |
| --- | --- |
| `?static` | End states plus badges. |
| `?reduced` | Motion off. |
| `?motion` | Forces motion on. |
| `?export` | Exposes `window.__deck = {total, renderAt(ms), ready}` for the tools in `tools.md`. |

The URL hash `#slide.beat` (1-based) stays in sync.

**Keys**

| Key | Action |
| --- | --- |
| → ↓ Space PageDown Enter, click | Next |
| ← ↑ PageUp Backspace, Shift+click | Previous |
| Home / End | First / last beat |
| R | Restart: back to the first slide |
| N | Notes |
| F | Fullscreen |
| M | Toggle motion |

**Transitions**

- Content crossfades between two offscreen layers.
- Chrome text fades out, then in, so labels never overlap.
- The progress ring interpolates between positions.
