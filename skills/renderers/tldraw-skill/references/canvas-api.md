# tldraw offline — canvas API contract

Everything here was read off the live API (`GET /`, `api.recipes`, `api.members`) and the app bundle of **tldraw offline v1.12.0**. Re-check `GET /readme` after an app update.

---

## 1. Connect

**Discovery file** (written on launch, removed on a clean quit):

| Platform | Path |
|---|---|
| macOS | `~/Library/Application Support/tldraw/server.json` |
| Windows | `%APPDATA%\tldraw\server.json` |
| Linux | `$XDG_CONFIG_HOME/tldraw/server.json` (usually `~/.config/tldraw`) |

```json
{ "port": 7236, "token": "<64 hex chars>", "pid": 23402, "startedAt": 1785173751008,
  "requestLogPath": ".../logs/canvas-api-requests-<date>.jsonl" }
```

- Default port `7236`. **The token rotates on every app launch.**
- Every request except `GET /` and `GET /readme` needs `authorization: Bearer <token>` → otherwise `401`.
- File present but requests fail = stale (uncrashed quit). The app is **not** running.
- Every request is appended to `requestLogPath`. Assume the user can audit what you did.

**Each Bash call is a fresh shell.** `export TLDRAW_TOKEN=…` in one call is empty in the next and you will silently send `Bearer` with no token. Use the bundled `tq` helper, or re-read inline:

```bash
PORT=$(jq -r .port "$HOME/Library/Application Support/tldraw/server.json")
TOKEN=$(jq -r .token "$HOME/Library/Application Support/tldraw/server.json")
curl -s -X POST "http://localhost:$PORT/api/doc/$DOC/exec" \
  -H "authorization: Bearer $TOKEN" -H 'content-type: text/plain' --data-binary @build.js
```

---

## 2. Endpoints

| Method | Path | Use |
|---|---|---|
| POST | `/api/search` | Run JS against an `api` object: list docs, read shapes/bindings, screenshots, API reference |
| POST | `/api/docs/create` | `{"name":"My Artifact"[,"directory":"/abs/path"]}` → creates + opens + saves `<name>.tldraw`. `409` if it exists, `400` for `.tldr` |
| POST | `/api/doc/:id/exec` | Run JS with the live `editor` for one document. **This is where drawing happens.** |
| POST | `/api/doc/:id/script-workspace` | Reveal `script/main.js` paths for durable behavior (out of a renderer's remit) |
| GET | `/api/doc/:id/script-status` | Watcher state; `state` is `applied` / `pending` / `error` |

Code-taking endpoints accept raw JS (`content-type: text/plain`, preferred) or `{"code":"…"}` JSON. The code is wrapped in an async function, so top-level `await` works. **The response is only what you `return`.**

### `api` object (inside `/api/search`)

```js
api.getDocs({name?})   // open docs, most-recently-focused first:
                       // {id, filePath, name, unsavedChanges, windowId, focusOrder, lastActive, shapeCount, pageCount, hasScript}
api.getFocusedDoc()    // === (await api.getDocs())[0] ?? null
api.getShapes(docId)   // {page, viewport, shapes:[raw records]} — CURRENT PAGE ONLY. Map it down before returning.
api.getBindings(docId) // raw binding records. "near enough" is not a connection; this is.
api.getScreenshot(docId, {mode:'canvas'|'window', size:'small'|'medium'|'large'|'full', bounds:{x,y,w,h}})
                       // writes a JPEG to a temp file, returns {filePath, width, height, bounds, ...}
api.getScriptStatus(docId)
api.members            // 397 Editor/ShapeUtil members. Search only when a snippet failed.
api.recipes            // 9 worked recipes, keyed by id (see §7)
api.imports            // 816 importable `tldraw` symbols
api.categories         // camera, shapes, selection, pages, history, viewport, zoom, transform, tools, styles, export, bindings, …
```

### Inside `/exec`

Available as bare identifiers: `editor` (live `Editor`), `helpers`, `signal` (AbortSignal), `app`.
SDK primitives come from a **dynamic** import — static `import` is invalid in a snippet:

```js
const { createShapeId, toRichText } = await import('tldraw')
```

---

## 3. `helpers`

| Helper | Signature / note |
|---|---|
| `helpers.createArrowBetweenShapes(fromId, toId, opts?)` | **Always use this for arrows.** Creates the arrow *and* both bindings. `opts: {bend, arrowheadStart, arrowheadEnd, richText}`. Returns the arrow's `TLShapeId`. |
| `helpers.boxShapes(idsOrShapes, opts?)` | Draws a rectangle around a group with margin. `opts: {shapeId, color, fill, text, note}`. Cheap way to make a zone. |
| `helpers.richTextToPlainText(value)` | Read a shape's visible label without parsing the rich-text doc. Use it to match shapes by text. |
| `helpers.createShapeIfMissing(...)` / `createShapesIfMissing(...)` | Idempotent creation — makes a rerun safe. |
| `helpers.translateShapes(...)` / `onShapeTranslate(...)` | Move shapes / react to moves. |
| `helpers.getLints()` | `{lints: [...]}` — see §6. |
| `helpers.saveDoc()` | **Writes to disk.** Last mutating step of an `/exec` snippet. Never call it from a document script. |

---

## 4. Shape records

Raw tldraw SDK records — the same `TLShapePartial` you'd write in app code.

```js
const { createShapeId, toRichText } = await import('tldraw')
editor.createShape({
  id: createShapeId('node-1'),          // -> 'shape:node-1'
  type: 'geo',
  x: 100, y: 100,                        // top-left, page coords; x→right, y→down
  props: { geo:'rectangle', w:320, h:180, color:'blue', fill:'solid',
           size:'s', font:'sans', align:'start', verticalAlign:'start',
           richText: toRichText('Label\nsecond line') },
  meta: { role: 'step' },                // free-form; survives save. Use it to tag your own shapes.
})
```

`editor.createShapes([...])` takes an array — one call for the whole diagram.

**Text is rich text.** `toRichText(string)` for creation; `helpers.richTextToPlainText(shape.props.richText)` to read. `\n` works inside `toRichText`. There is no inline styling from a snippet — one shape, one text style.

### Types you actually need

| `type` | Key props | Notes |
|---|---|---|
| `geo` | `geo, w, h, richText, color, fill, dash, size, font, align, verticalAlign, growY` | The workhorse node. |
| `text` | `richText, size, font, color, textAlign, autoSize, w, scale` | Titles, captions, free labels. Auto-sizes to content unless `autoSize:false`. |
| `note` | `richText, color, size, font, align, verticalAlign, growY` | Sticky. Width fixed at 200; height grows with the text. Keep it short. |
| `arrow` | `start, end, bend, arrowheadStart, arrowheadEnd, kind, richText, labelPosition` | Create via `helpers.createArrowBetweenShapes`, not by hand. |
| `frame` | `w, h, name` | A named region. **The name renders in a header outside the body** — the correct way to label a zone. Children move with it. |
| `line`, `draw`, `highlight`, `image`, `embed`, `bookmark` | — | Rarely needed for artifacts. |

### Style enums (exact, v1.12.0)

```
color        black grey light-violet violet blue light-blue yellow orange
             green light-green light-red red white
fill         none semi solid pattern fill lined-fill
dash         draw solid dashed dotted none
size         s m l xl
font         draw sans serif mono
align (h)    start middle end
verticalAlign start middle end
geo          rectangle ellipse oval triangle diamond rhombus rhombus-2 trapezoid
             pentagon hexagon octagon star heart cloud x-box check-box
             arrow-right arrow-left arrow-up arrow-down
arrow kind   arc | elbow
arrowhead    arrow triangle square dot pipe diamond inverted bar none
```

`dash:'draw'` and `font:'draw'` are the hand-drawn defaults. For a professional artifact use `dash:'solid'` + `font:'sans'` explicitly on every shape — see `craft.md`.

---

### Images (verified v1.12.0)

`asset.props.src` **rejects `file://`** — only `http(s):` or a `data:` URL. So to place a local screenshot you inline it as base64 (which is what tldraw does for pasted images anyway; it lands inside the `.tldraw` archive).

```js
const { AssetRecordType, createShapeId, getHashForString } = await import('tldraw')
const assetId = AssetRecordType.createId(getHashForString('unique-key'))
editor.createAssets([{ id: assetId, type: 'image', typeName: 'asset', meta: {},
  props: { name: 'shot.png', src: 'data:image/png;base64,...', w: 1440, h: 900, mimeType: 'image/png', isAnimated: false } }])
editor.createShape({ id: createShapeId(), type: 'image', x, y, props: { assetId, w: 720, h: 450 } })
```

Post the base64 in the `/exec` body — don't try to read the file from JS, there is no `fs` in the renderer. Keep displayed `w`/`h` at half the natural size for retina screenshots. Big images bloat the file; downscale before encoding.

---

## 5. Bindings

An arrow is *connected* only when binding records exist. `helpers.createArrowBetweenShapes` writes them for you; a hand-rolled arrow with `{start:{x,y}, end:{x,y}}` is visually identical and functionally detached — it will not follow the node and will fail the linter.

Read them with `api.getBindings(docId)`. Proximity is never a connection.

For a genuinely decorative unbound arrow, suppress only that lint:
```js
meta: { lintIgnore: ['friendless-arrow'] }
```
Never use that opt-out on a semantic connection.

---

## 6. The linter — and what it misses

`helpers.getLints()` runs exactly three heuristics over the current page:

| Rule | Fires when |
|---|---|
| `growY-on-shape` | a shape's text overflows its bounds **and that shape overlaps another geo shape** |
| `overlapping-text` | two or more non-arrow, non-frame shapes with text overlap each other |
| `friendless-arrow` | an arrow is missing a binding at `start`, `end`, or both |

**The gap that matters:** an isolated box with overflowing text passes the linter. So does a box that is comically oversized for its label, a column that is 3px out of alignment, and an arrow that runs straight through a third node. **`{lints: []}` is a floor, not a finish.** Always run the `growY` autosize pass and always look at a screenshot.

Suppress per shape with `meta: { lintIgnore: ['rule-name'] }`.

---

## 7. `api.recipes` (9, by id)

Static drawing needs none of these. They exist for **durable behavior**, which is not a renderer's job — read one only if the user explicitly asks for interaction.

`stack-existing-boxes` · `add-durable-behavior-with-a-document-script` · `editable-furniture-with-anchored-internals` · `clickable-card-or-button-ui` · `connection-dependent-behavior` · `animation-simulation-loop` · `custom-shape-config-js` · `custom-binding-config-js` · `custom-overlay-config-js`

```bash
sh tq POST /api/search '{"code":"return api.recipes[\"clickable-card-or-button-ui\"].body"}'
```

---

## 8. Persistence & gotchas

- **`/exec` mutations are live but not saved.** `await helpers.saveDoc()` writes the `.tldraw` file. A leading `•` on the document title means unsaved.
- **Runtime JS from `/exec` is ephemeral** — listeners, timers, globals and monkey-patches die when the doc or app closes. Durable behavior belongs in `script/main.js`.
- **Never edit a `.tldraw` archive from the filesystem while it is open.** The app does not merge external changes and a later save overwrites them.
- **`api.getShapes` is current page only.** Multi-page docs need `editor.setCurrentPage(...)` inside `/exec`.
- **No export endpoint.** `getScreenshot` returns a JPEG for your own verification. Real deliverables come from the app UI: `File → Export → PNG / SVG / .tldr`.
- **`getScreenshot` `opts.bounds` is broken in v1.12.0** — passing it silently returns a **window** capture (`captureMode:'window'`, `bounds:null`) instead of the region you asked for. To inspect one area: `editor.select(ids); editor.zoomToSelection()` inside `/exec`, then screenshot without `bounds`. Verified 2026-07-27.
- **Frame membership is explicit, and it controls clipping.** Creating a shape at coordinates inside a frame does *not* parent it — it stays a page child, unclipped, and does not move with the frame. Pass `parentId: frameId` to adopt it; `x`/`y` then become **frame-relative**, and anything past the frame edge is **clipped**. Measured in v1.12.0.
- **`editor.selectAll()` is a NO-OP unless the select tool is active.** If any earlier step ran `editor.setCurrentTool('hand')` (a common "deselect before screenshot" move), `selectAll()` silently selects nothing and the usual `selectAll(); deleteShapes(getSelectedShapeIds())` wipe does nothing — so a "rebuild" *stacks on top of* the previous build instead of replacing it. **Always clear unconditionally:** `editor.deleteShapes(editor.getCurrentPageShapes().map(s => s.id))`. Verified 2026-07-27.
- **Deleting a frame DOES cascade to its children** (verified) — so the wipe above is enough; you don't need to enumerate descendants.
- **`editor.groupShapes(ids, { groupId })`** — options-object form. Members must already be siblings, so create all shapes flat under the frame first and group bottom-up. Nesting works: the inner group's `parentId` becomes the outer group, and the **outermost group stays frame-parented**, preserving clipping and move-with-frame. Set `meta` in a separate `updateShape` call. See `craft.md` §11.
- **`note` shapes are 200 wide and 200 tall at minimum** — `w` is not settable, and `h` grows with the text via `growY`. Measured capacity in the 200 × 200 square: ~130 chars at `size:'s'`, ~70 at `'m'`. Lay out around those numbers, and stack columns off measured bounds rather than a nominal pitch.
- **`props.growY` is not recalculated after you apply it.** A shape resized from `h:48` to `h:56` still reports `growY: 8`, so re-running the autosize pass grows it to 64, then 72, and the `growY > 0` filter never empties. Run the pass once per shape; scope any later pass to newly created ids. Measured v1.12.0, 2026-07-28.
- **Complex live records serialize to `null`.** Return ids, counts and booleans — verify with a follow-up `api.getShapes` read if you must.
- **Undo:** agent edits land in the user's history; they can `Cmd+Z` them like their own.
- **Security posture:** the token sits in a user-readable file and `/exec` is arbitrary JS in the renderer. Fine locally; worth saying out loud if the user asks about risk.
