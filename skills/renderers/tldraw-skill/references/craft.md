# tldraw craft — how to make it look designed

The canvas API will happily draw something ugly. This file is the difference between "the shapes exist" and "this is presentable." Everything below was measured in the running editor (tldraw offline v1.12.0, `font: 'sans'`).

---

## 1. Coordinate system and the grid

`(0,0)` is the page origin; **x grows right, y grows down**. A shape's `x,y` is its **top-left corner**. Plan the whole grid numerically before you write a single `createShape`.

**Default grid — use it unless the artifact demands otherwise:**

| Token | Value | Why |
|---|---|---|
| Node | `320 × 180` | Fits ~32 chars/line at `size:'s'`, 3–4 lines |
| Column pitch | `480` | 320 node + **160 gutter** — enough for a labelled arrow |
| Row pitch | `320` | 180 node + **140 gutter** — arrows and their labels clear the boxes |
| Title baseline | `nodeTopY − 220` | `text` size `xl` |
| Subtitle | `nodeTopY − 150` | `text` size `s`, `grey` |
| Frame padding | `48` inside on all sides | Frame name renders *above* the body |
| Sticky (`note`) | **200 wide, 200 tall minimum** | Width is fixed and not settable; height *grows* with the text via `growY`. Column pitch `296`, row pitch `240` — but stack off measured bounds, not the nominal 200 |
| Legend / footnote | `size:'s'`, `grey`, below the last row + 120 | |

```js
const COL = (i) => 80 + i * 480
const ROW = (j) => 400 + j * 320
```

Two rules that do most of the work:

- **Everything on the grid.** If a node is at `x: 563`, you guessed. Ragged columns are the single most visible amateur tell.
- **Never let a gutter carry two things.** A gutter holds arrows *or* it holds a label — not both. If a labelled arrow needs room, widen that gutter to 200+ rather than shrinking the label.

---

## 2. Sizing labels so text never overflows

### Measured metrics (`font: 'sans'`)

| `size` | line height | usable px per char | horizontal padding | 1-line label height |
|---|---|---|---|---|
| `s` | 24 | **8.8** | 42 | 56 |
| `m` | 32 | **10.4** | 44 | 62 |
| `l` | 49 | **13.3** | 27 | 67 |
| `xl` | 59 | **16.5** | 19 | 75 |

**Max characters on one line inside a `geo`** (lowercase-heavy text; Title Case runs ~10% wider):

| `size` | w=200 | 240 | 280 | 320 | 360 | 400 | 480 |
|---|---|---|---|---|---|---|---|
| `s` | 18 | 23 | 27 | **32** | 36 | 42 | 50 |
| `m` | 15 | 19 | 23 | 26 | 29 | 33 | 42 |
| `l` | 13 | 16 | 19 | 22 | 25 | 28 | 34 |
| `xl` | 11 | 13 | 15 | 17 | 21 | 23 | 28 |

Formula, if you need a width for known text:

```js
const CHAR = { s: 9.5, m: 11.5, l: 14.5, xl: 18 }   // includes a Title Case safety margin
const PAD  = { s: 48,  m: 48,  l: 32,  xl: 24 }
const widthFor = (longestLine, size = 's') =>
	Math.min(480, Math.max(240, Math.ceil(longestLine.length * CHAR[size] + PAD[size])))
```

### The `growY` pass — the part you must not skip

`geo` and `note` shapes expose `props.growY`: the number of pixels the text overflows its box. **Estimates get you close; this makes it exact.** Run it as the last step of the build exec, or as its own call:

```js
const overflow = editor.getCurrentPageShapes()
	.filter((s) => s.props?.growY > 0)
	.map((s) => ({ id: s.id, type: s.type, props: { h: s.props.h + s.props.growY } }))
if (overflow.length) editor.updateShapes(overflow)
await helpers.saveDoc()
return { resized: overflow.length }
```

The linter will **not** save you here: `growY-on-shape` only fires when the overflowing shape *also overlaps another geo*. An isolated box with clipped text is lint-clean and visibly broken.

If resizing would break the grid (a row of boxes must stay equal height), do the opposite: shorten the copy, or step the label down a size — don't let one box grow taller than its row.

**Run the pass once per shape, and never twice.** `growY` is **not** recalculated after you apply it: a shape resized from `h:48` to `h:56` still reports `growY: 8`, so a second pass over the same shape grows it to 64, a third to 72, and the filter never empties. Measured 2026-07-28. If a build needs the pass at two moments — once to settle a screen before laying out an annotation layer against it (§10.2), once for the stickies you added afterwards — scope the second pass to the new shape ids, never to `getCurrentPageShapes()`.

**A pass that runs after you have measured invalidates the measurement.** Anything positioned by collision test, edge alignment or stacking must be computed against **post-`growY` bounds**. Settle the geometry first, then place against it.

---

### The width table above is for `font:'sans'` — `draw` is wider

Wireframes keep `font:'draw'` (§10), and `draw` runs materially wider. Measured in the live editor, mixed-case prose:

| size | line height | `sans` px/char | `draw` px/char | draw penalty |
|---|---|---|---|---|
| s | 24 | 8.8 | **9.7** | +10 % |
| m | 32 | 10.4 | **12.9** | +24 % |
| l | 49 | 13.3 | **19.3** | +45 % |

**Short strings run wider still.** Per-char cost rises as strings shorten (fewer narrow glyphs to average out): 23 chars → 9.65, 19 → 9.6, 13 → 10.6, 6 → ~11, and an all-caps run like `MMMMMMMMMM` → 17.5. Use a length-aware estimate:

```js
const CH = { s: 9.7, m: 12.9, l: 19.3 }                        // draw font, long strings
const wid = (t, z = 's') => Math.ceil(t.length * CH[z] * (t.length < 14 ? 1.18 : 1)) + 4
```

Then **never hand-place an x that has to clear a text shape** — derive it. Right-align chart category labels against the axis (`txt(axisX - 8 - wid(label), y, label)`) instead of guessing a left edge; that single change fixed a label/axis collision the linter could not see.

**Minimum height for a labelled `geo` is line-height-driven, not font-driven:** 56 at size `s`, 62 at size `m`. A geo shorter than that with a label will `growY` to it. So **a pill/tag/badge cannot be a labelled geo** — draw it as an outlined rect plus a separate `text` shape.

---

## 3. Palette

Use the **named tldraw colors**, never hex. They are theme-aware: the same artifact stays legible when the user flips to dark mode. Pair every node with `fill: 'solid'` — the default `fill: 'none'` reads as a wireframe, not a diagram.

| Meaning | color |
|---|---|
| Neutral / infrastructure / "givens" | `grey` |
| Primary actor, user, entry point | `blue` |
| Process step, system, backstage | `light-blue` |
| Decision, attention, moment of truth | `yellow` |
| Outcome, success, value delivered | `green` / `light-green` |
| Pain point, failure, risk | `red` / `light-red` |
| Insight, opportunity, hypothesis | `violet` / `light-violet` |
| Data, artifact, document | `orange` |
| Canvas zone / container | `frame`, or `white` + `dash:'solid'` |

**One hue = one meaning across the whole artifact.** If `red` means "fail point" in one lane it cannot mean "high priority" in another. Cap it at **5 hues plus grey**; more and the encoding stops reading as an encoding.

`black` and `white` are text/stroke colors — avoid them as node fills except for deliberate contrast.

---

## 4. Type scale

| Role | Shape | Props |
|---|---|---|
| Artifact title | `text` | `size:'xl'`, `color:'black'` |
| Subtitle / framing question | `text` | `size:'s'`, `color:'grey'` |
| Zone / phase name | `frame` `name` | renders in the frame header — no shape needed |
| Node label (rectangle) | `geo` | `size:'s'`, `font:'sans'`, `align:'start'`, `verticalAlign:'start'` |
| Node label (any other geo) | `geo` | `size:'s'`, `font:'sans'`, `align:'middle'`, `verticalAlign:'middle'` — see §4.1 |
| Sticky content | `note` | `size:'s'`, ≤ 60 chars — **fixed 200×200 footprint**, `w`/`h` are not settable |
| Arrow label | arrow `richText` | `size:'s'`, ≤ 14 chars |
| Legend / source note | `text` | `size:'s'`, `color:'grey'` |

**Always set `font:'sans'` and `dash:'solid'` explicitly.** The tldraw defaults are `draw` — the hand-drawn look. Charming for a whiteboard, wrong for a deliverable, and inconsistent if half your shapes inherit it.

### 4.1 Alignment depends on the shape — this one bites

A `geo` label is laid out inside the shape's **bounding box**, not inside the drawn outline. On a `rectangle` those are the same thing, so `align:'start'` gives a clean document-style block. On an **`ellipse`, `diamond`, `triangle`, `hexagon`, `star`, `cloud` or `trapezoid` the top-left of the bounding box is outside the drawn shape** — a start-aligned label floats in empty canvas next to it, or half-clipped by the outline. It is lint-clean and obviously broken.

```js
const RECTISH = new Set(['rectangle', 'oval', 'rhombus', 'rhombus-2', 'x-box', 'check-box'])
const align = RECTISH.has(geo) ? 'start' : 'middle'
const verticalAlign = RECTISH.has(geo) ? 'start' : 'middle'
```

Non-rectangular shapes also have a **smaller usable area than their box**: a diamond's label only gets about half the width at mid-height. Budget for it — multiply the width from §2 by **1.4** for `diamond`/`triangle`/`star`, **1.2** for `ellipse`, and keep those labels to **≤ 20 characters**. If the copy won't shrink, use a rectangle and encode the meaning with color instead of silhouette.

Inside a node label, lead with a short **ALL-CAPS role line**, then the name, then detail — it gives the box a hierarchy without needing multiple text shapes:

```
③ CANVAS API SERVER
http://localhost:7236
Electron main process
```

---

## 5. Arrows

```js
helpers.createArrowBetweenShapes(fromId, toId, {
	richText: toRichText('validates'),   // ≤ 14 chars, omit when position already says it
	bend: 0,                             // px of arc; use to dodge a shape
	arrowheadStart: 'none',              // 'arrow' for a two-way relationship
	arrowheadEnd: 'arrow',
})
```

- **Always this helper.** It writes the two binding records, so the arrow follows the nodes when the user drags them and it passes the `friendless-arrow` lint. A hand-built arrow with `{start:{x,y}, end:{x,y}}` looks identical and is dead.
- `kind:'elbow'` (set via `editor.updateShapes` on the arrow's props) for hierarchies, sitemaps and anything that should read orthogonally. Default `arc` for organic relationships.
- **Never route an arrow through a third node.** Widen the gutter, reorder the columns, or `bend` around it. A crossing is a defect, not a style.
- **Label sparingly.** If every arrow has a label you have written a sentence, not drawn a diagram. Label only when the relation is genuinely ambiguous — protocol, condition, direction of value.
- `dash:'dashed'` on the arrow reads as async, indirect, or "sometimes".

---

## 6. Zones and grouping

**Use a `frame`.** Its `name` renders in a header *outside* the body, which sidesteps the classic trap: a labelled background rectangle centres its text in the middle of the zone, right on top of the contents, and you cannot move it.

```js
editor.createShape({ id: frameId, type: 'frame', x: 40, y: 340, props: { w: 1160, h: 620, name: 'Discovery' } })
```

**Parenting is explicit, and it decides clipping** (measured, v1.12.0). A shape you `createShapes` at coordinates *inside* a frame does **not** join the frame — it stays a page child, is **not clipped**, and does **not** move when the frame moves. To make it belong to the frame you must pass `parentId: frameId`, and then **`x`/`y` become frame-relative** (frame at page `1000,0` + child `x:20` → page `1020`). A frame-parented shape that extends past the edge is **clipped exactly at the frame border**, so anything that must stay visible has to fit inside `w`/`h`.

```js
editor.createShapes([
  { id: a, type: 'geo', parentId: frameId, x: 48, y: 48, props: {...} },  // clipped, moves with frame
  { id: b, type: 'geo',                    x: 88, y: 388, props: {...} },  // page coords, never clipped
])
```

Rule of thumb: **content inside a screen/phase/lane → parent it** (you want it to travel and to reveal overflow). **Annotations, callouts and legends about the frame → leave on the page**, outside the frame bounds, or they get clipped.

The frame's `name` renders as small grey text just above its top-left corner — **do not also add a title `text` shape inside**, you'll have two headings.

**Sizing a frame around stickies.** A `note` is **200 wide** — that width is not settable — and **200 tall as a floor**, growing with its text. So a one-column phase frame is `200 + 2×48 = 296` wide, a two-column one is `200×2 + 48×3 = 544`. A 480-wide frame holding a single 200px sticky column looks half-empty — that is the most common sticky-layout mistake. Nominal row pitch `240` (200 + 40), but stack off **measured** bounds when the text may overflow.

**Sticky text capacity, measured** (`font:'sans'`, 2026-07-28): `size:'s'` holds **~130 characters** in the 200 × 200 square; `size:'m'` holds **~70**. Past that the note grows taller, which is fine on its own but silently breaks any column stacked at a fixed 240 pitch.

Note colors render at **full saturation**, much louder than a `geo` with `fill:'solid'`. Three sticky hues on a board is plenty; a fourth starts to shout.

`helpers.boxShapes(ids, { text: 'Group A', color: 'blue' })` is the quick alternative when you just need a ring around existing shapes — but it produces a labelled rectangle, so keep the label short and expect it centred.

---

## 7. Anti-patterns

1. **Hand-built arrows.** See above. Always the helper.
2. **A label on a big background rectangle.** Use a `frame`, or a free-standing `text` at the zone's top-left.
3. **Trusting `{lints: []}`.** Three heuristics. They do not check alignment, spacing, crossings, contrast or copy length.
4. **Leaving `dash:'draw'` / `font:'draw'`.** Sketchy by default. Set them.
5. **Long text in a `note`.** A sticky is 200 wide and grows downward. Past ~130 chars at `size:'s'` (~70 at `'m'`) it stops being a note. Use a `geo` if it needs a paragraph.
5b. **Sizing a sticky column like a text column.** A 480-wide frame around one 200px sticky reads as half-empty. See §6.
6. **Drip-feeding shapes across many exec calls.** Slow, and a failure mid-way leaves a half-built canvas. Build in one file, post once.
7. **Returning shape records.** Live editor records serialize to `null` and cost tokens. Return ids and counts.
8. **Forgetting `await helpers.saveDoc()`.** The canvas looks right and the file on disk is stale.
9. **Writing into `getDocs()[0]` by reflex.** That is "most recently focused", not "the one the user meant". Confirm by name.
10. **Emoji as icons.** Renders inconsistently across platforms. Use a `geo` glyph (`star`, `check-box`, `x-box`, `heart`) or a colored dot.
11. **More than ~40 shapes on one screen.** Split into frames, or pages (`editor.createPage`), and give each a title.
12. **One annotation column for the whole artifact.** Notes stacked down the right-hand side means half of them are pointing across the UI. Assign each note to the gutter on its target's side — §10.2.
13. **An arrow where a number would do.** If the pointer has to cross the thing it is pointing at, it is now the loudest object in the drawing. Number it and drop the arrow.
14. **Running the `growY` pass twice.** `growY` is not recalculated after you apply it, so the second pass grows every shape again. Once per shape, scoped — §2.

---

## 8. Worked template — a flow

```js
const { createShapeId, toRichText } = await import('tldraw')

const COL = (i) => 80 + i * 480
const ROW = (j) => 400 + j * 320
const NODE = { w: 320, h: 180 }
const RECTISH = new Set(['rectangle', 'oval', 'rhombus', 'rhombus-2', 'x-box', 'check-box'])

const NODES = [
	{ key: 'start',  col: 0, row: 0, geo: 'ellipse',   color: 'blue',       text: 'START\nUser opens payroll' },
	{ key: 'check',  col: 1, row: 0, geo: 'diamond',   color: 'yellow',     text: 'Approval\nrequired?' },
	{ key: 'submit', col: 2, row: 0, geo: 'rectangle', color: 'light-blue', text: 'SYSTEM\nQueue for approval' },
	{ key: 'done',   col: 2, row: 1, geo: 'ellipse',   color: 'green',      text: 'END\nPayroll submitted' },
]

editor.createShapes([
	{ id: createShapeId('title'), type: 'text', x: COL(0), y: ROW(0) - 220,
	  props: { size: 'xl', font: 'sans', color: 'black', richText: toRichText('Payroll submission — happy path') } },
	{ id: createShapeId('sub'), type: 'text', x: COL(0), y: ROW(0) - 150,
	  props: { size: 's', font: 'sans', color: 'grey', richText: toRichText('Scope: single-company admin. Excludes off-cycle runs.') } },
	...NODES.map((n) => {
		const rectish = RECTISH.has(n.geo)
		return {
			id: createShapeId(n.key), type: 'geo', x: COL(n.col), y: ROW(n.row),
			props: { geo: n.geo, w: NODE.w, h: NODE.h, color: n.color, fill: 'solid',
			         dash: 'solid', size: 's', font: 'sans',
			         align: rectish ? 'start' : 'middle',
			         verticalAlign: rectish ? 'start' : 'middle',
			         richText: toRichText(n.text) },
			meta: { role: 'flow-node' },
		}
	}),
])

const A = (a, b, label) =>
	helpers.createArrowBetweenShapes(createShapeId(a), createShapeId(b),
		label ? { richText: toRichText(label), size: 's' } : {})

A('start', 'check')
A('check', 'submit', 'yes')
A('submit', 'done')

// autosize, then persist
const overflow = editor.getCurrentPageShapes().filter((s) => s.props?.growY > 0)
	.map((s) => ({ id: s.id, type: s.type, props: { h: s.props.h + s.props.growY } }))
if (overflow.length) editor.updateShapes(overflow)

editor.zoomToFit({ animation: { duration: 300 } })
await helpers.saveDoc()
return { nodes: NODES.length, resized: overflow.length, lints: helpers.getLints().lints.length }
```

### Adapting the template

| Artifact | Change |
|---|---|
| **journey / experience map** | one `frame` per phase across `COL(i)`; `note` rows inside; emotion curve = small `ellipse` nodes joined by `arc` arrows, y-position encodes sentiment |
| **service blueprint** | one `frame` per lane stacked on `ROW(j)`; lines of interaction/visibility = full-width `geo` `rectangle`, `h: 2`, `dash:'dashed'`, `grey`; fail points = `red` `star` |
| **concept model** | `geo:'oval'` nodes with plural-noun labels; every arrow labelled with the verb; radial layout instead of columns |
| **mental model diagram** | `note` towers stacked upward under `text` headers; a thin `grey` rectangle as the horizontal centre line, support below it |
| **ecosystem map** | position encodes meaning, not sequence — no COL/ROW grid; two-way exchanges get `arrowheadStart:'arrow'` |
| **sitemap** | tiers on `ROW(j)`, elbow arrows, `frame` per section |
| **wireframe** | `fill:'none'`, `grey`, `size:'s'` throughout; one named `frame` per screen; only functional color |

---

## 8.1 Set the theme before you build

```js
editor.user.updateUserPreferences({ colorScheme: 'light' })
```

**Screenshots and exports inherit the app's theme.** If the user has tldraw in dark mode, `fill:'semi'` bars render near-black and the whole artifact reads inverted — it looks broken and it is not what they will hand to anyone. Set light explicitly as the first line of every build. (This is a user preference, so it changes their app; say so if it matters.)

## 8.2 Screenshots: `canvas` vs `window`

| | `mode:'canvas'` | `mode:'window'` |
|---|---|---|
| Captures | **all page content**, ignores the viewport | exactly what's on screen |
| `zoomToSelection` first | **no effect** | works — this is how you inspect one frame |
| Includes app chrome | no — clean | yes: toolbar, style panel, selection handles |

So: `canvas` for the whole board, `window` for one frame. Before a `window` capture, `editor.selectNone()` — otherwise selection handles and the style panel sit on top of your work. `opts.bounds` is broken either way (see `canvas-api.md` §8).

---

## 9. Verify before you claim it's done

Run `helpers.getLints()`, then take **one** screenshot and check it against this list. The lint pass is the floor.

**Structure**
1. `{lints: []}` — no friendless arrows, no overlapping text, no flagged overflow.
2. `growY` pass ran; no box has clipped text.
3. Every arrow is bound (it moves when you drag a node).

**Layout**
4. All nodes land on the COL/ROW grid — no stray coordinates.
5. Equal gutters; rows of peers share a height.
6. No arrow crosses a node; crossings between arrows minimised.
7. Nothing touches or overlaps a frame edge.

**Legibility**
8. Title present, `xl`, and it names the artifact — not "Diagram".
9. Subtitle states scope or the question the artifact answers.
10. Labels readable at fit-zoom; no box is >80% empty space.
11. `font:'sans'` and `dash:'solid'` set on every shape (no stray sketchy defaults).

**Encoding**
12. ≤ 5 hues + grey; one hue = one meaning, consistently.
13. A legend exists if the color/shape encoding isn't self-evident.
14. Arrow labels ≤ 14 chars, and only where they earn their place.

**Hand-off**
15. `await helpers.saveDoc()` called; the title has no unsaved `•`.
16. You told the user the document name and file path.
17. The screenshot you judged it by was taken **without** `opts.bounds` (that option silently returns a window capture — see `canvas-api.md` §8).

**Annotations** (if the artifact has any — §10.2)
18. Every sticky sits in the gutter on the **same side** as the element it describes.
19. No connector crosses the screen, another element, or another connector; none reaches into a different frame.
20. Every annotation has a numbered badge on its target and the same number opening its sticky.
21. No sticky extends past its own screen's vertical band.
22. Connectors are hairline grey at reduced opacity — you notice the stickies before you notice the arrows.

If the screenshot shows a defect the lints missed, fix it **and** consider whether it belongs in this file as a new rule.

---

### The overlap the linter cannot see

`overlapping-text` compares **text to text only**. A label sitting on an axis, a bar, a divider or a card edge is lint-clean and visibly broken. Run this before you claim done — it flags text that *partially* overlaps a non-text shape (full containment is skipped, since that's just a label inside its own card):

```js
const all = editor.getCurrentPageShapes().filter(s => s.type !== 'frame')
const B = new Map(all.map(s => [s.id, editor.getShapePageBounds(s.id)]))
const hits = []
for (const t of all.filter(s => s.type === 'text')) {
  const a = B.get(t.id)
  for (const o of all) {
    if (o.id === t.id || o.type === 'text') continue
    const b = B.get(o.id)
    const overlaps = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h
    const contained = a.x >= b.x && a.y >= b.y && a.x + a.w <= b.x + b.w && a.y + a.h <= b.y + b.h
    if (overlaps && !contained) hits.push({ text: helpers.richTextToPlainText(t.props.richText), over: o.props.geo || o.type })
  }
}
return hits
```

**`getLints()` returns bare ids, not `TLShapeId`s.** `editor.getShape(l.shapeIds[0])` returns `undefined`; you must prefix: `editor.getShape('shape:' + id)`. Without this, every lint you try to diagnose looks like a missing shape.

---

## 10. Wireframe mode (lo-fi)

Wireframes invert §3/§4. Everything else in this file still applies; these override.

**Keep the sketchy defaults.** `dash:'draw'` + `font:'draw'` is tldraw's hand-drawn rendering — for a wireframe that *is* the lo-fi signal, and it buys "this is a draft, argue with the structure not the pixels" for free. Do **not** switch to `solid`/`sans` here. That switch is for deliverable diagrams.

**Greyscale, one accent.** `black` and `grey` strokes, `fill:'none'` for containers, `fill:'semi'` only to show a filled/selected state. Exactly one non-grey shape per screen: the primary action. Color must not be the only carrier of meaning — label the state too.

**Screen = a frame at a real viewport size**, named for the screen, not the component:

| Target | frame `w` × `h` |
|---|---|
| Desktop | 1440 × 900 |
| Tablet | 768 × 1024 |
| Mobile | 390 × 844 |

Parent every element of the screen to that frame (§6) — content that overflows the viewport then visibly clips, which is exactly the feedback you want. Place screens on the 480/320 grid of §1 by moving the frame; children follow.

**Inside a screen, switch to an 8px sub-grid** (the 480/320 diagram grid is for node graphs, not UI). Working defaults:

| Element | Recipe |
|---|---|
| Field | `geo` rectangle `h:56`, full column width; label as `text` size `s` **above** it, 8px gap |
| Button | `geo` rectangle `160 × 56`; primary `fill:'semi'` + accent, secondary `fill:'none'` |
| Card | `geo` rectangle, 24px inner padding, label `align:'start' verticalAlign:'start'` |
| Image / media | `geo` with `geo:'x-box'` — the crossed box is the universal placeholder |
| Avatar | `geo:'ellipse'`, 40 × 40 |
| Table | one `geo` per row (`h:56`), not a grid of cells; header row `fill:'semi'` |
| Text block | `text` shape size `s`, **real content nouns**, never lorem ipsum |

**56, not 48.** A labelled `geo` at `size:'s'` needs `h ≥ 56` (§2) — the line box, not the font, sets the floor. Draw a control at 48 and every one of them arrives with `growY: 8`, which then either clips or silently resizes your whole layout out from under a collision test.

**Copy is part of the wireframe.** "Employee name", "Run payroll", "3 exceptions need review" — placeholder Latin hides the fact that the layout doesn't fit the real strings.

**Annotations live outside the frame, on the side of the thing they describe.** They are a layer of their own with its own geometry — sticky, badge, and a connector you usually don't draw. Full recipe: **§10.2**. Keep them page-parented (§6) or the frame clips them.

**States, not just the happy path.** A wireframe that only shows the loaded, populated, permitted case is half a spec. Duplicate the screen frame and show empty, loading, error, and no-permission where they change the layout. Name the frames `Screen — empty`, `Screen — error`.

**Do not** render a wireframe with `solid` strokes, brand colors, real logos, or drop shadows. High fidelity invites feedback on the visuals and shuts down feedback on the structure.

### The fidelity ladder — build the rung that was asked for

Wireframing has three rungs: **lo | mid | hi**, chosen by purpose, consumers and project context — and annotation weight is a *separate* axis (`wireframes/SKILL.md` owns that call). Here is what each rung means in tldraw. When the ask is vague, build **L1 + L2 side by side** on one page (frames all `1440 × 900`, pitch `1560` — `x: 0`, `1560`, `3120`) and let the comparison force the choice. **Annotated screens need a wider pitch** — see §10.2.

| | **L1 · Zoning** | **L2 · Lo-fi** | **L3 · Mid-fi** |
|---|---|---|---|
| Answers | What is the page anatomy and what carries weight? | What components go where, in what order? | Does the real content fit? |
| Shapes | ~15 | ~70 | ~140 |
| Regions | outlined boxes with a role label + one-line note | real containers | real containers |
| Copy | region roles only | real structural labels (nav, tabs, tile names); **no data** | real copy and real values |
| Metrics | — | solid grey bar | the actual number |
| Charts | — | `geo:'x-box'` labelled `Chart`, label in the **top-left corner, not on the X** | real bars at real proportions |
| Emphasis | `fill:'semi'` on the primary region | one accent on current location | same |

**Lo-fi grammar — make placeholders and controls look different.** This is the failure mode that makes an L2 unreadable: if a text placeholder and a text input are both outlined rects, everything looks like a form.

- **Solid-filled grey bar (`fill:'solid'`, h 10–14) = a line of copy.** Longer bar = longer string. A 20–22px one = a headline.
- **Outlined rect (`fill:'none'`) = an interactive control** — field, button, tile, nav item.
- Never mix the two for the same purpose in one screen.

**Going *down* a rung is a real request.** "Less fidelity" almost never means "make it uglier" — it means *remove content commitments* so the conversation returns to structure and priority. Strip data first, then copy, then components. Keep the structure.

---

## 10.2 The annotation layer — stickies in the near gutter, numbers instead of arrows

An annotated wireframe is **two layers**: the screen (inside the frame) and the annotation layer (outside it). The annotation layer's job is to be readable *and* to leave the screen readable. One long arrow reaching across a UI to a note destroys the second half of that, and a column of nine notes down the right-hand side guarantees long arrows.

Written for wireframes, where it bites hardest, but it applies to **any framed artifact** you annotate — a journey map phase, a blueprint lane, a breadboard.

**Three rules do the work.**

1. **A note goes on the side its target is already on.** Split the frame at its midline. A target whose centre is left of the midline gets a sticky in the **left** gutter; right of it, the **right** gutter. Never assign by convenience, reading order, or "there was room over there".
2. **The number is the reference. The connector is optional.** Every annotation gets a numbered badge on the target *and* the same number as the first token of the sticky. Because the number already carries the link, a connector that would cross the UI can simply be dropped.
3. **A connector that crosses anything is a defect, not a style.** It is hairline grey at 40% opacity, and it exists to shorten a glance — not to prove a relationship.

### Geometry

| Token | Value |
|---|---|
| Sticky column width | `200` (fixed, §1) |
| Gutter — frame edge to sticky | `120` |
| Sticky x, left | `frameX − 120 − 200` |
| Sticky x, right | `frameX + frameW + 120` |
| Vertical stack gap | `40` **below the note's measured bottom**, never a fixed 240 pitch |
| Badge | `geo:'ellipse'` `56 × 56`, `fill:'solid'`, `color:'yellow'`, `size:'s'` |
| Screen pitch, annotated | `2240` (1440 frame + two 320 gutter-plus-sticky bands + 160 between neighbouring columns) |

**56 is the floor for the badge**, not a preference: a labelled `geo` needs `h ≥ 56` at `size:'s'` (§2), so a 32px or 40px numbered circle arrives with `growY` and renders as an egg.

**A sticky must stay inside its own screen's vertical band.** The moment a column runs past `frameY + frameH`, its notes start pointing at the screen below and the connectors cross frames. At 900px tall a side holds **three** stickies. If a screen needs more than six annotations, that is the artifact telling you it has become a spec: merge them, cut them, or split the screen.

### Badge placement — first slot with 8px clearance

Test candidates against every *other* shape in the screen (never against the target itself — a badge sitting on its own element is the point) and inflate the test rect by an 8px margin, because the linter treats touching as overlapping:

1. Outside the target's gutter-side edge, vertically centred.
2. Above the target's gutter-side corner.
3. Below that same corner.
4. Straddling the target's gutter-side edge — the terminating fallback. Give it `meta: { lintIgnore: ['overlapping-text'] }`, since it deliberately sits on its own target's label.

Reaching slot 4 is a signal worth reading: the control is too small or too crowded to carry a badge, and the honest fix is usually to annotate **the row or the component it belongs to** rather than the control.

### Draw the connector only when it is short and level

```js
const inset   = side === 'left' ? (b.x - FX) : (FX + FW - (b.x + b.w))
const dy      = Math.abs(noteCentreY - badgeCentreY)
const connect = inset <= 0.25 * FW && dy <= 160
```

A target more than a quarter of the frame in from its near edge, or a sticky pushed more than 160px off its target's row, gets **no connector** — the number does the work. When you do draw one:

```js
helpers.createArrowBetweenShapes(noteId, badgeId, { arrowheadEnd: 'dot', arrowheadStart: 'none' })
// then, on the arrow: opacity 0.4, props { color: 'grey', size: 's', dash: 'solid' }
```

Bind it to the **badge**, not to the element. The badge is the annotation layer's own anchor, it is always on the near side, and binding there keeps the arrow out of the UI.

### Order of operations

The whole thing collapses if you compute annotation geometry against bounds that are about to change:

1. Build the screen layer at correct sizes (`h:56` for labelled controls).
2. **Run the `growY` pass over the screen layer, once** (§2).
3. Read `getShapePageBounds` for every annotation target. Assign sides. Place stickies, badges, connectors.
4. Run a second `growY` pass **scoped to the sticky ids only** — never over the whole page, or step 2's shapes grow a second time.

### Layers, colour and grouping

- **Stickies and connectors are page-parented; badges are frame-parented.** A frame clips its children, so a sticky in the gutter must stay on the page — while a badge sits on the screen and should travel and clip with it. That also fixes the movable unit: `sticky + connector` group together, the badge belongs to the screen (§11).
- The annotation layer sits **outside the wireframe's colour budget**. Yellow stickies and yellow badges do not spend the screen's one accent, and they are not in-screen red. Say so in the legend if the screen also uses yellow.
- Three sticky hues maximum if you are encoding annotation categories (behaviour / content rule / open question) — and label the category, since colour cannot be the only carrier.

---

## 11. Grouping — make the output *movable*, not just correct

A wireframe made of 140 loose shapes is unusable: the reviewer drags a card and gets one rectangle.
**Group as you build.** Grouping is not decoration — it is what makes the artifact editable by a human.

### The rule: exactly two levels
| Level | Is | Examples |
|---|---|---|
| **L1 · atom** | The smallest thing you'd never move alone | icon + label nav item · tile header (title + kebab) · a chart (axis + bars + ticks) · card header + subhead · a badge |
| **L2 · unit** | What a reviewer actually drags | a card/tile · the sidebar · the top bar · a rail section · a modal |

**Never group a third level up.** No "whole rail", no "whole content column", no "everything in the frame".
A group you can't get out of in one click is worse than no group. Leave page-level dividers, section
rules and background wash **loose** — they're scenery, not components.

### Builder pattern (use this — it's the whole trick)
Collect ids while you draw, then group bottom-up *after* `createShapes`:

```js
const shapes = [], stack = [{ kids: [] }]
const node = () => stack[stack.length - 1]
const push = id => { node().kids.push(id); return id }
const comp = (name, fn) => {                       // opens a group scope
  const n = { name, kids: [] }; node().kids.push(n)
  stack.push(n); fn(); stack.pop()
}
const box = (x, y, w, h, p = {}) => { const id = createShapeId(); push(id)
  shapes.push({ id, type: 'geo', parentId: F, x, y, props: { geo: 'rectangle', w, h, fill: 'none', ...p } }); return id }
const txt = (x, y, t, p = {}) => { const id = createShapeId(); push(id)
  shapes.push({ id, type: 'text', parentId: F, x, y, props: { richText: toRichText(t), ...p } }); return id }

editor.createShapes(shapes)                        // create everything first

const apply = n => {                               // then group depth-first
  const ids = n.kids.map(k => (typeof k === 'string' ? k : apply(k)))
  if (!n.name) return null                         // root: leave children loose
  const gid = createShapeId()
  editor.groupShapes(ids, { groupId: gid })
  editor.updateShape({ id: gid, type: 'group', meta: { component: n.name } })
  return gid
}
apply(stack[0])
```

Why bottom-up: `groupShapes` needs its members to already be siblings. Creating all shapes flat under
the frame first guarantees that, and the recursion re-parents inward one level at a time.

### Verified behaviour
- `editor.groupShapes(ids, { groupId })` — **options-object form**, not a bare second arg.
- **Nesting works.** Inner group's `parentId` becomes the outer group.
- **The outermost group stays frame-parented**, so frame clipping and move-with-frame survive grouping.
  (Confirmed: a member's page bounds shift by exactly the frame delta.)
- Grouping **does not change rendering at all** — screenshot before/after is byte-identical in intent.
- Tag every group: `meta: { component: 'Tile — Retention Insights' }`. It's free, it makes the layer
  panel readable, and it lets a later pass find and restyle "all tiles" without geometry guessing.

### Verify grouping actually works
```js
const f = editor.getCurrentPageShapes().find(s => s.type === 'frame')
const g = editor.getSortedChildIdsForParent(f.id).map(i => editor.getShape(i)).find(s => s.type === 'group')
const members = editor.getSortedChildIdsForParent(g.id)
const before = members.map(i => editor.getShapePageBounds(i).x)
editor.updateShape({ id: g.id, type: 'group', x: g.x + 40 })
const ok = members.map(i => editor.getShapePageBounds(i).x).every((v, i) => v - before[i] === 40)
editor.updateShape({ id: g.id, type: 'group', x: g.x })     // put it back
return ok
```
Also report the shape: `{ topLevelItems, groups, loose, maxDepth }` per frame.
Healthy numbers for a 1440×900 dashboard: **~16 groups + ~2 loose, max depth 2.**
If `loose` is high you under-grouped. If `maxDepth > 2` you over-nested.

### Floating elements are a legitimate overlap
The §9 text-over-geo audit will flag a help FAB, a toast, a dropdown or a tooltip sitting on top of a
card. That's correct-by-design. **Allowlist them explicitly** rather than moving them — but never
allowlist a whole class blindly; check each hit.
