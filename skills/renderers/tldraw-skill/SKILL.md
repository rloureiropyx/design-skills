---
name: tldraw-skill
description: >-
  Render a design artifact on a tldraw offline canvas — the local, private,
  infinite canvas that saves to a .tldraw file on disk. This is a RENDERER
  (mechanics): it draws what a discipline skill has already decided. Use
  whenever the user wants a diagram or artifact "in tldraw", on a tldraw
  canvas, in the tldraw desktop/offline app, or references a .tldraw or .tldr
  file; when materializing a flow, journey map, service blueprint, concept
  model, ecosystem map, sitemap or wireframe that must stay local and private;
  or when an orchestrating skill picks tldraw as the renderer. Owns tldraw
  drawing mechanics — canvas API, shape records, layout math, arrows and
  bindings, frames, linting, screenshots, export. Do NOT use it to decide WHAT
  to draw or pick a diagram type; bring it a decided artifact. Do NOT use it
  for cloud or collaborative canvases, for a scroll-driven interactive article
  (that is `scrollytelling`), for building app UI, or for adding durable
  behavior — clickable prototypes, animation, custom shapes.
---

# tldraw Skill (renderer)

Draw on a tldraw offline canvas what an **artifact skill** has decided. tldraw is the **local, private, file-based** canvas — the renderer to pick when the work must not leave the machine, when the user is already in the desktop app, or when they want a real `.tldraw` file they own. It is a pure *mechanics* skill: it materializes decisions, it does not make them.

> **Discipline first.** Do the artifact's thinking in its own skill (intention, audience, scope, structure, per-facet syntax, research-grounding) *before* touching the canvas. This skill is "how to draw it well in tldraw," not "what to draw."
> Full endpoint/shape/enum contract: **`references/canvas-api.md`**. Layout math, palette and per-artifact recipes: **`references/craft.md`**. Read both before drawing anything non-trivial.

## Why this renderer is cheap

You write **JavaScript, not per-element JSON**, and the response is **only what you `return`**. One `/exec` call can build an entire 30-shape diagram from a loop, and echo back `{nodes: 12, arrows: 14}`. There is no per-element echo to pay for. Treat that as the defining constraint: **build in loops, return counts.**

## Connect (do this first, every shell call)

**This skill needs the tldraw offline desktop app running on this machine.** It talks to that app's local HTTP API; there is no hosted fallback. If the app is not running, say so and stop — do not draw somewhere else instead.

Each Bash call is a fresh shell — exported vars do not survive, and the skill's own location depends on how it was installed. Resolve the bundled `tq` helper once per shell call, then use it:

```bash
TQ=$(find ~/.copilot ~/.claude ./.github/skills -name tq -path '*tldraw-skill*' 2>/dev/null | head -1)
sh "$TQ" POST /api/search '{"code":"return await api.getDocs()"}'
sh "$TQ" POST /api/doc/DOC_ID/exec @/tmp/diagram.js
```

`tq` re-reads the port and token itself, so it needs no environment set up.
`@file` sends a file as raw JS. A body starting with `{` is sent as JSON; anything else as `text/plain`.
If `tq` cannot be found, fall back to raw curl — see `references/canvas-api.md`.

**Target the right document.** `api.getDocs()` returns open docs, most-recently-focused first. Never write into a document the user did not point you at. For a new artifact use `POST /api/docs/create` with `{"name":"..."}` — it creates, opens and saves a real `.tldraw` file (409 if the name exists).

## Golden rules

0. **`editor.user.updateUserPreferences({ colorScheme: 'light' })` as the first line of every build.** Everything you render, screenshot and export inherits the app theme; in dark mode the artifact reads inverted.

- **One exec per artifact.** Write the whole build as a single JS file (`/tmp/<slug>.js`), post it once. Don't drip-feed shapes across calls.
- **Return small.** `return { nodes: n, arrows: m }` — never return shape records; live editor records serialize badly and cost tokens for nothing.
- **Read narrow.** `api.getShapes(docId)` returns raw records for the whole page. Map it down in the snippet (`.map(s => ({id, type, x, y}))`) instead of dumping it into your context.
- **Nothing persists until `await helpers.saveDoc()`** — the last mutating step of the snippet. Without it the canvas shows the edit but the file on disk is stale and the doc is marked unsaved.
- **Arrows must be bound.** Always `helpers.createArrowBetweenShapes(fromId, toId, opts)`. A hand-built arrow with point terminals is a "friendless arrow": it fails the linter and detaches when the user moves a node.
- **Autosize is not optional.** After creating labelled shapes, run the `growY` pass (below). The linter will *not* catch overflowing text on an isolated shape.
- **Group as you build.** Loose shapes make an artifact unusable — the reviewer drags a card and gets one rectangle. Wrap atoms (icon+label) and units (a card, the sidebar, the top bar) in groups with `meta:{component}`, **exactly two levels deep**, never the whole frame. See `craft.md` §11.
- **Wipe unconditionally when rebuilding.** `editor.deleteShapes(editor.getCurrentPageShapes().map(s => s.id))`. `selectAll()` is a no-op unless the select tool is active, so the usual select-all-and-delete silently stacks the new build on top of the old one.
- **Screenshot once, at the end.** `api.getScreenshot(docId, {size:'small'})`. Use `size:'large'` to read small text and `mode:'window'` to see app UI — but **never pass `opts.bounds`**: in v1.12.0 it silently returns a window capture instead of the region. To zoom on one area, `editor.select(ids); editor.zoomToSelection()` first.
- **Don't search `api.members`** (397 entries) unless a snippet actually failed. The recipes in `api.recipes` and this skill's references cover normal drawing.
- **Don't touch document scripts** for a static artifact. `script/main.js` is for *durable behavior* (clickable UI, animation, custom shapes) — a different job, out of a renderer's remit. See `api.recipes` if the user explicitly asks for behavior.

## The build loop

1. **Plan coordinates on paper first.** Column pitch, row pitch, node size — see `references/craft.md`. Never let the canvas decide layout for you.
2. **Create** — one exec: title/subtitle text, then nodes from a data array, then arrows, then `zoomToFit`, then `saveDoc`.
3. **Autosize** — same or next exec:
   ```js
   const fixed = editor.getCurrentPageShapes()
     .filter(s => s.props?.growY > 0)
     .map(s => ({ id: s.id, type: s.type, props: { h: s.props.h + s.props.growY } }))
   if (fixed.length) editor.updateShapes(fixed)
   ```
4. **Lint** — `return helpers.getLints()`. Expect `{lints: []}`. Three rules only: `growY-on-shape`, `overlapping-text`, `friendless-arrow`.
5. **Look at it** — one screenshot, then critique against the checklist in `references/craft.md`. The structural check passes long before the pixels are right: overflowing labels, arrows crossing nodes, ragged columns and unreadable label sizes only show up visually.
6. **Fix and save**, then tell the user the file path and the doc name.

## Pick the mechanism (by artifact)

| Artifact | tldraw mechanism |
|---|---|
| **flows** (user/task/service) | `geo` nodes (`rectangle` step, `diamond` decision, `ellipse` start/end) + bound arrows, `kind:'elbow'` for orthogonal routing |
| **journey-maps / experience-maps** | `frame` per phase column, `note` (sticky) rows inside, emotion curve as small `ellipse` nodes joined by `arc` arrows |
| **service-blueprints** | one `frame` per lane; lines of interaction/visibility as full-width `dashed` rectangles of ~2px height; fail points as `red` `star` |
| **concept-models** | `ellipse`/`oval` nodes (plural nouns) + labelled bound arrows for relationships |
| **mental-model-diagrams** | `note` towers stacked under `text` mental-space headers, `frame` per space, a thin divider rectangle as the center line |
| **ecosystem-maps** | `geo` actor nodes positioned by meaning + labelled arrows for value exchange (`arrowheadStart:'arrow'` for two-way) |
| **sitemaps** | `geo` rectangles in tiers + elbow arrows; `frame` per section |
| **wireframes** | Lo-fi mode — **keep** the sketchy `draw` defaults, greyscale + one accent, one `frame` per screen at a real viewport size, elements `parentId`-ed to it. Pick the rung (zoning / lo-fi / mid-fi) before drawing. Full recipe: `references/craft.md` §10 |
| **zones / grouping** | `frame` (its name renders in the header — no overlapping-label trap) or `helpers.boxShapes(ids, {text, color})` |

## Verify & hand off

- Lint clean **and** eyeballed. Both.
- Report the file path (`~/Documents/<name>.tldraw`), and say plainly that the doc is saved.
- Export for sharing is a UI action: `File → Export → PNG/SVG`, or `.tldr` for tldraw.com / VS Code / Obsidian. There is no export endpoint; `getScreenshot` is a JPEG for *your* verification, not a deliverable.
- Agent edits are treated like the user's own edits — they can undo them.

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Deciding what to draw.** This is a renderer. If nobody has decided the artifact's intention,
  audience, and structure, drawing produces a tidy picture of an undecided idea. Ask for the decision,
  or route to the skill that owns it.
- **Drip-feeding shapes across calls.** One artifact, one exec. Per-shape calls are slow, cost tokens
  for nothing, and leave the canvas half-built when one of them fails.
- **Returning shape records.** Live editor records serialize badly and fill the context with noise.
  Return counts.
- **Declaring done on a clean lint.** The linter has three rules. Ragged columns, arrows crossing
  nodes, unreadable label sizes and overflowing text all pass it. Look at the screenshot, every time.
- **Hand-built arrows.** Point terminals detach the moment the user moves a node. Always bind.
- **Rebuilding on top of the old build.** `selectAll()` is a no-op unless the select tool is active.
  Delete unconditionally, or the second version stacks invisibly on the first.
- **Forgetting `saveDoc()`.** The canvas shows the edit, the file on disk does not, and the user is
  told the work is saved when it is not.
- **Adding durable behavior.** Clickable cards, animation and custom shape types are document scripts —
  a different job with different risks, outside a renderer's remit. Read `api.recipes` before agreeing.
- **Drawing somewhere else when the app is not running.** The reason to pick tldraw is that the work
  stays on this machine. Silently substituting another canvas breaks the one guarantee it makes.

## Source boundary

Built from the live tldraw offline canvas API (`GET /` readme + `api.recipes` + `api.members`, v1.12.0), the app bundle's linter implementation, and typography measured directly in the running editor on 2026-07-27. Screened, not canonical — re-check `GET /readme` when the app updates.

This skill is vendored into this plugin from a standalone personal skill. Its peers in the original library — a cloud canvas renderer and a browser-based one — are not part of this plugin, so a request for a shared or collaborative canvas has no renderer here: say so rather than substituting one.
