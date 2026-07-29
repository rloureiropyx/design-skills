# Scene Script — Draw What Was Decided

**Goal:** G1 · Explain how something works
**Tone:** T1 · Plain and direct
**Opening tension:** A request to "draw me a flow" leaves four questions unanswered, and drawing before they are answered produces a picture of an idea nobody has decided.
**Top identification:** Name `tldraw-skill` as a renderer in the hero, before scene 1. It draws decisions; it does not make them.
**Final payoff:** The reader can describe the split the skill runs on. A discipline skill decides what to draw; this one places, binds, checks, and saves it. They also carry the two facts that decide whether it works at all: the work stays on the machine, and it needs the desktop app running.
**Audience:** Product designers who want an agent to draw flows, maps, and wireframes on a canvas. They have used Figma, Miro, or Excalidraw. They have not touched tldraw's API and do not want to.
**Estimated reading time:** About 4 minutes.
**Proposed pattern:** Sticky graphic + discrete steps throughout, with static prose bridges between runs of scenes.

| # | VISUAL — diagram state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 1 · The ask | One request chip at the centre (blue), four question chips around it in amber: which flow, for whom, covering what, at what fidelity. | Someone asks for a flow for the payroll blockers. Which flow, a single user's path or a service flow across several actors? Read by an engineer or by a compliance reviewer, showing the happy path or the errors too? Draw before those are answered and you get a tidy picture of an idea nobody has decided. | Opens the sequence. |
| 2 · The split | The four questions sort into two labelled columns. Left, violet: intention, audience, artifact type, structure, fidelity. Right, green: coordinates, bindings, lint, export. A slate divider runs between them. | Two skills share the work. A discipline skill decides intention, audience, artifact type, structure, and fidelity. This one places the coordinates, binds the arrows, runs the lint, and exports the file. When those decisions are missing it asks for them instead of inventing a plausible answer. | The amber question chips slide left and right and settle into the two columns. |
| 3 · It has to be running | A Copilot node and a tldraw desktop-app node with a local-API link between them. The app node is unlit and the link is broken in coral. | Here tldraw is the offline desktop app, and the skill talks to its local API on the same machine. There is no hosted fallback. If the app is not running, the skill says so and stops rather than drawing somewhere else. | The right-hand column recedes; the two runtime nodes and the broken link come forward. |
| 4 · Yours, on disk | A `.tldraw` file glyph on a machine outline in green. Beside it, a cloud with a login prompt, struck through in coral. | The reason to pick tldraw is that the work stays on the machine. It writes a real `.tldraw` file you own instead of a cloud workspace or a shared board behind a login. That fits unreleased roadmaps, salary bands, and org charts before anyone announces them. | The app node lights up and resolves into the file-on-a-machine glyph; the crossed-out cloud fades in beside it. |
| 5 · One call in, counts out | A single JavaScript payload travels the wire once into the canvas; a small green chip returns reading `{ nodes: 24, arrows: 31 }`. A muted stack of thirty JSON round-trips sits behind it, greyed. | You send JavaScript, not per-element JSON, and only what you return comes back. One call can build a thirty-shape diagram from a loop and echo back the counts. So the working style is to build in loops and return numbers, never to drip-feed shapes across separate calls. | The file glyph opens into the canvas; the payload flies in and the count chip flies back. |
| 6 · Plan the grid first | A measured grid with column pitch, row pitch, and node size annotated in slate before any node lands. One sticky note is tagged "200 wide, fixed" in amber. | The grid gets planned on paper before any shape exists. Column pitch, row pitch, and node size are set to real numbers, because a canvas places things where they fit rather than where they mean something. Some numbers are not yours to choose. A sticky note is 200 units wide and that width is fixed. | The returned counts resolve into an empty measured grid. |
| 7 · Bind the arrows | Two connected nodes. One is dragged aside: the bound arrow (green) follows its node, the hand-built arrow (coral) detaches and dangles. | An arrow built from two loose points looks identical to a bound one on screen. The difference shows the moment someone drags a node, when the loose arrow detaches and the bound one follows. A canvas artifact exists to be rearranged while people think, so every arrow is bound to the shapes at its ends. | Nodes drop onto the grid and connect; then one node slides and the two arrows behave differently. |
| 8 · Annotate from the near gutter | A frame with two marked targets. Each has a numbered amber badge; its sticky sits in the gutter on the same side. One short connector is drawn; a second is dropped where it would cross the frame. | Notes about the drawing sit in the margin, each on the same side as the thing it describes. A number goes on the target and the same number opens its note, so the two read as a pair without a line between them. When a connector would cross the drawing to reach its note, it gets dropped. An arrow reaching over a wireframe ends up louder than the wireframe. | The nodes recede into a single framed screen; badges and gutter stickies fade in around it. |
| 9 · Done means saved | The finished diagram passes a three-rule filter (green), then a save-to-disk glyph writes it out. The output is a file path and a document name, in green. | A clean lint is a starting condition, not the finish. It says nothing about arrows crossing nodes or labels too small to read, so the loop ends with a screenshot and a look. Nothing reaches disk until `saveDoc()` runs, and skipping it leaves the canvas updated while the file stays stale. The hand-off is the path to the `.tldraw` file and the name of the document. | The framed screen shrinks through the filter and writes itself to disk. |

## Static prose bridges

- **Before scene 1:** what a renderer is in this library, and why the line between deciding and drawing is the whole design of the skill.
- **After scene 4:** how to install and start the tldraw offline app, and what the skill does when it cannot reach it. The no-collaboration consequence lives here too: no sharing, no comments, no co-editing.
- **After scene 7:** the shape vocabulary worth knowing — frames, geo nodes, sticky notes, bound arrows, text — and which properties tldraw fixes rather than letting you choose.
- **Before scene 9:** what this renderer is not for, and which artifact should be produced in prose or in a scrollytelling article instead.

## Diagram system

Native inline SVG, editorial systems-diagram language, no decorative imagery. Every diagram has a text equivalent in the scene copy.

1. **The ask** — one request, four unanswered questions.
2. **The split** — discipline decisions versus rendering mechanics, two columns and a divider.
3. **The dependency** — Copilot, the local API, and the app that must be running.
4. **Local versus cloud** — where the file lives.
5. **One exec** — a single call in, counts out; the JSON round-trip stack rejected behind it.
6. **The grid** — pitch and node size annotated before placement; the fixed sticky width.
7. **Bound versus loose** — what happens on the first drag.
8. **The annotation layer** — near-gutter stickies, numbered both ends, the dropped connector.
9. **Finishing** — the three-rule filter, then the save that reaches disk.

## Art direction

- **Central idea:** a hand-off. Everything upstream is a decision; everything here is execution.
- **Colour semantics (house brief):** blue for the incoming request, violet for the discipline decisions, green for settled and valid states, amber for a pending or fixed constraint, coral for failure and detachment, slate for structure.
- **Motion:** discrete 0.4–0.8s transitions on transform and opacity only. One state visible at a time.
- **Mobile:** the compact diagram pins above each text card, opaque, with the active state preserved at 375px.
- **Accessibility:** the bound-versus-loose distinction and the annotation rule are stated in the copy, not carried by the illustration alone.

## Beat validation

- Nine scenes; every scene introduces one concept and changes the diagram state.
- The opening states the tension: drawing before the decisions are made produces a picture of an undecided idea.
- The closing pays it off: the deliverable is the saved file, and it means something only because the decisions were made upstream.
- Every scene stays at or below four sentences.
- Prose pass run over every COPY cell twice: no colon reveals, no "not X, it's Y", no throat-clearing or faux-insight openers, no stacked fragments, no negative listing, no puffery, no weasel attribution, no synonym cycling (the drawn object is "the diagram" or "the canvas" throughout), no rhetorical setups, no em dashes in scene text, no banned words, no mid-sentence bold. The closing ends on a concrete sentence.
- All reader-facing copy, labels, and annotations are in English.

## Source section

The article closes with method provenance, real links only:

- [tldraw](https://tldraw.dev/) — the offline canvas, the arrow-binding behaviour, and the fixed sticky-note width quoted here.
- The skill itself: [`skills/renderers/tldraw-skill/SKILL.md`](../../skills/renderers/tldraw-skill/SKILL.md) — the golden rules, the build loop, and the anti-patterns.
- Its references: [`references/canvas-api.md`](../../skills/renderers/tldraw-skill/references/canvas-api.md) and [`references/craft.md`](../../skills/renderers/tldraw-skill/references/craft.md) — the exec contract, the three lint rules, the layout constants, and the annotation-layer recipe (§10.2).
