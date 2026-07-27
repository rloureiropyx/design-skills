# Scene Script — Draw What Was Decided

**Opening tension:** "Draw me a flow" is four unanswered questions wearing one sentence.

**Top identification:** Present `tldraw-skill` immediately as a canvas renderer, before the tension.

**Final payoff:** The reader understands that a renderer executes decisions rather than making them. Content, audience, artifact type and fidelity belong to a discipline skill; coordinates, bindings, contrast and export belong here. They also understand the two practical facts that decide whether this skill is usable at all: it keeps the work on the local machine, and it needs a running app to work.

**Audience:** Product designers who want an agent to draw flows, maps and wireframes on a canvas. They have used Figma, Miro or Excalidraw. They have not used tldraw's API and do not want to.

**Estimated reading time:** 4 minutes.

**Proposed pattern:** Sticky graphic + discrete steps throughout. Full-viewport compositions for the opening and closing.

| # | VISUAL — diagram state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 1 · The tension | **One sentence, four questions.** The request at the centre; four question chips radiate out — which flow, for whom, covering what, at what fidelity. | "Draw me a flow for the payroll blockers thing." Which flow — a user flow, a task flow, a cross-actor service flow? Read by an engineer or a compliance reviewer? Happy path, or errors and recovery? At what fidelity? Draw first and you get a tidy picture of an undecided idea. | Opens the sequence. |
| 2 · The split | **Two columns of ownership.** Left: intention, audience, artifact type, structure, fidelity. Right: shape records, layout math, arrows and bindings, linting, screenshots, export. | A discipline skill owns intention, audience, artifact type, structure, and fidelity. This one owns shape records, layout math, arrows and bindings, linting, screenshots, and export. When the decisions are missing, the correct move is to ask for them — not to fill the gap with plausible content. | The four questions sort themselves into two columns. |
| 3 · Why this renderer | **Local disk versus cloud.** A file on a machine; a crossed-out cloud with an account prompt beside it. | Not a cloud workspace, not a shared team board, not a link that needs an account. tldraw offline writes a file you own. That is the reason to pick it: unreleased roadmaps, salary bands, customer names, org charts before they are announced. | The two columns recede; the machine and the cloud face off. |
| 4 · The catch | **The dependency.** Copilot on one side, the tldraw desktop app on the other, a local API between them. The app is dark and the path is broken. | This is the only skill in the library that depends on something running outside Copilot: the tldraw desktop app on this machine, exposing its local API. There is no hosted fallback. If it is not running, the skill says so and stops. | The file becomes an app window; the connection to it breaks. |
| 5 · The economics | **One call, small return.** A single JavaScript payload in; `{ nodes: 24, arrows: 31 }` out. Beside it, a rejected alternative — thirty JSON round-trips and a wall of returned shape records. | You send JavaScript, not per-element JSON, and only what you `return` comes back. That single property makes a thirty-shape diagram cheap: build the whole thing in loops in one file, post it once, and echo the counts. | The connection reconnects; a payload travels the wire once. |
| 6 · Craft | **Layout math on paper.** A grid with column pitch, row pitch and node size annotated before any shape lands; a sticky note is marked as a fixed 200 × 200 square. | Column pitch, row pitch, node size — decided before the canvas gets a say, because a canvas will happily place things where they fit rather than where they mean something. And some numbers are not yours to choose: a sticky note is a fixed 200 × 200 square. | The payload lands and resolves into a measured grid. |
| 7 · Craft | **Bound versus drawn arrows.** Two identical-looking diagrams; one node is dragged, and half the arrows detach. | An arrow built from two points looks identical to a bound one and detaches the instant anyone moves a node. Since the whole value of a canvas artifact is that the reader rearranges it while thinking, a diagram of friendless arrows falls apart on first contact with its audience. | The grid's connections animate; one set holds, the other snaps free. |
| 8 · The check | **Three lint rules, then eyes.** Unsized shapes · overlapping text · unbound arrows, all passing — beside three problems the linter cannot see. | The linter checks exactly three things: unsized shapes, overlapping text, and unbound arrows. It says nothing about arrows crossing nodes, ragged columns, or labels too small to read at the zoom anyone will actually use. A clean lint is a starting condition, not a finish line. | The repaired diagram passes through a three-rule filter. |
| 9 · Hand off | **`saveDoc()` or nothing.** The canvas shows the finished work; the file on disk is stale until the call runs. Then the path and document name are handed over. | Nothing persists until `saveDoc()` runs. Skip it and the canvas shows the work while the file on disk stays stale — and the user has been told it is saved. The hand-off is the file path and the document name. | The filter output writes itself to disk. |

## Static prose bridges

- **Before scene 1:** what a renderer is in this library, and why the distinction between deciding and drawing is the whole design of the skill.
- **After scene 4:** how to install and start the tldraw app, and what the skill does when it cannot reach it.
- **After scene 7:** the shape vocabulary worth knowing — frames, geo shapes, sticky notes, arrows, text — and which properties are fixed by tldraw rather than chosen by you.
- **Before the closing:** what this renderer is *not* for, and which artifact should be produced in prose or in a scrollytelling article instead.

## Diagram system

Native SVG, no decorative imagery. Every diagram has a text equivalent in the scene copy.

1. **The ambiguous ask:** one request, four unanswered questions.
2. **Ownership split:** discipline decisions versus rendering mechanics.
3. **Local versus cloud:** where the file lives.
4. **The dependency:** Copilot, the local API, and the app that must be running.
5. **One exec:** a single call in, counts out.
6. **Layout grid:** pitch and node size annotated before placement.
7. **Bound versus drawn:** what happens on the first drag.
8. **Lint filter:** three rules, and the problems they miss.
9. **Save:** canvas state versus disk state.

## Art direction

- **Central visual metaphor:** a hand-off. Everything upstream is a decision; everything here is execution.
- **Graphic language:** editorial systems diagrams matching the rest of the library.
- **Colour semantics:** decisions in blue, rendering mechanics in green, the runtime dependency in amber, failure and detachment in coral.
- **Motion:** discrete 0.4–0.8 second transitions on transform and opacity only.
- **Mobile:** compact diagram pinned above each text card, opaque, active state preserved at 375px.
- **Accessibility:** the bound/unbound distinction is stated in text, not carried by the illustration alone.

## Beat validation

- Every scene introduces one concept and changes the diagram state.
- The opening states the tension: a tidy picture of an undecided idea.
- The closing pays it off: the deliverable is the saved file, not the screenshot.
- Every scene stays at or below four sentences.
- All reader-facing copy, labels, and diagram annotations are in English.

## Source section

The article closes with method provenance:

- [tldraw](https://tldraw.dev/) — the shape model, the arrow binding behaviour, and the fixed dimensions of a sticky note.
- The skill's own `references/canvas-api.md` and `references/craft.md` — the exec contract, the linter rules, and the layout constants quoted here.

## Delivery matrix

Verified across nine viewports from 320×568 to 1280×800. Least clearance: 27px at 667×375 (scene 4).
