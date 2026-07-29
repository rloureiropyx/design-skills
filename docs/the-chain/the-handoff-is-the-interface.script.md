# Scene Script — The Handoff Is the Interface

**Goal:** G6 · orient a newcomer — the reader ends knowing the landscape and where to start.

**Tone:** T1 · plain and direct.

**Opening tension:** The library lists eight skills as eight separate tools, and a newcomer cannot tell which one to open first.

**Top identification:** Present the eight skills as one chain — three ordered stages, three optional detours, and two renderers at the end — before the tension resolves.

**Final payoff:** Most of the skills are steps in one recipe. Each step reads the file the last one wrote, so the three main stages run in order and the rest hang off them. You can join wherever the earlier documents already exist. You cannot skip one, because the next skill asks for it and stops. Where to start is the first missing document.

**Audience:** Product designers and product managers in enterprise B2B who see eight skills in the index and no picture of how they fit. They will never open a `SKILL.md`, and they have not read Shape Up.

**Estimated reading time:** 3 minutes.

**Proposed pattern:** Sticky graphic + discrete steps throughout. The recurring graphic is **the chain**: it starts as eight loose nodes and gains structure as the reader scrolls — the spine forms, filenames land on the arrows, detours branch off, renderers attach at the end.

| # | VISUAL — the chain's state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 1 · Eight tools | Eight loose nodes scattered on the canvas, each labelled with a skill name, no connections between them. | The library has eight skills, and the index lists them as eight separate tools. A newcomer cannot tell which one to open first, or whether they are meant to be used together. They are used together. Most of them are steps in one recipe. | Opens the sequence. |
| 2 · The three stages | Three of the nodes — `problem-framing`, `shaping`, `proposal` — slide into a left-to-right spine and connect with plain arrows; the other five fade back. | The recipe has three stages. Work out what the problem actually is, try two or three directions and pick one, then write it up so people can decide. `problem-framing`, `shaping`, and `proposal` are those three stages, in that order. | The scattered nodes settle; three of them line up and join. |
| 3 · Files on the arrows | The filenames appear *on* the arrows: `FRAMED_PROBLEM.md`, then `DIRECTIONS.md`, then `PROPOSAL.md`, one per edge. | What passes from one stage to the next is a file. `problem-framing` writes `FRAMED_PROBLEM.md`, `shaping` reads it and writes `DIRECTIONS.md`, `proposal` reads both and writes `PROPOSAL.md`. Nothing else crosses between them, so the decision survives after the conversation is gone. | Labels drop onto the three edges of the spine. |
| 4 · Carry and reopen | A quoted line copies forward along an edge in green; a coral return arrow runs backward from `shaping` to `problem-framing`, labelled "reopen". | Each stage carries the decision the last one made instead of restating it in new words. When a later stage finds evidence that contradicts the problem, it sends that back to be reframed. Rewriting the problem quietly in a later file is the failure the chain is built to catch. | The forward quote animates along the first edge; the return arrow draws backward over the spine. |
| 5 · The detours | Three nodes — `breadboarding`, `wireframes`, `diagrams` — branch off the spine on dotted, optional connectors. | Three more skills are detours, not stages. `breadboarding` sketches a direction in words, `wireframes` works out a single screen when layout is the real question, and `diagrams` decides what a picture should show. You reach for them when a stage needs one, and skip them when it does not. | The return arrow settles; three side nodes branch off the spine on dotted lines. |
| 6 · Renderers last | Two nodes — `scrollytelling` and `tldraw-skill` — attach after `proposal`; an article and a canvas icon come out of them. | Two skills come last. `scrollytelling` builds a scrolling article and `tldraw-skill` draws on a local canvas. They render a decision that was already made, and they are not allowed to make one. Hand a renderer an undecided idea and it returns a polished version of the confusion. | The detours dim; two renderer nodes attach at the end of the spine and emit their outputs. |
| 7 · Where to start | The full chain is assembled. Entry arrows drop onto three different nodes; a coral stop marker sits on an edge where a document is missing. | You can join the chain wherever the earlier documents already exist. Start at `shaping` when the problem is settled, or at `proposal` when the direction was chosen last quarter. The one thing you cannot do is skip a document, because the next skill asks for it and stops. Start by writing the first one that is missing. | Everything reassembles into the full chain; entry arrows and one stop marker resolve. |

## Static prose bridges

- **Before scene 1:** what this library is — a set of skills that look independent in the index and are mostly steps in one recipe. A per-skill explainer can describe a step; it cannot show the order.
- **After scene 3 — why a file and not a conversation:** the person who approves the spend was not in the room, the person who inherits the project joins in month three, and the auditor arrives after everyone has moved on. A file has a version and a reader six weeks later; a conversation has neither.
- **After scene 4 — the three groups:** the skills sit in three folders. Process decides something, artifacts produce the thing people react to, renderers materialise a decision made elsewhere. The grouping is for people reading the repository; Copilot picks a skill by its name and description and never sees the folder.
- **Before the closing:** joining a project already underway. Most real work has these documents already, in a thread or a slide or someone's head. Writing the missing one down is the work that was already happening, made inspectable.

## Diagram system

Native inline SVG, no decorative imagery. One recurring chain motif that gains structure scene by scene; every state has a text equivalent in the scene copy.

1. **Eight loose nodes:** the opening landscape, no connections.
2. **The spine:** three stages line up and join in order.
3. **Files on the arrows:** the three filenames land on the edges.
4. **Carry and reopen:** a quoted line forward, a reframe arrow backward.
5. **The detours:** three optional skills branch off the spine.
6. **Renderers last:** two renderers attach at the end and emit outputs.
7. **Entry points:** many ways in, a stop marker where a document is missing.

## Art direction

- **Central visual metaphor:** the chain, assembling as the reader scrolls. The arrows between the nodes carry the meaning; the boxes are just the skills.
- **Graphic language:** editorial systems diagrams matching the other explainers in the library.
- **Colour semantics (from the house brief):** input and narrative in blue, a settled or valid state in green, a decision or approval in violet, caution and optional detours in amber, failure and the reframe path in coral, structure in slate/line. No colour is used decoratively.
- **Motion:** discrete 0.4–0.8 second transitions on transform and opacity only.
- **Mobile:** the compact chain pins above each text card, opaque, with the active state preserved at 375px.
- **Accessibility:** the reopen path, the stop marker, and the dotted detours carry text labels, never colour alone.

## Beat validation

- Every scene introduces one concept and changes the chain's state.
- The opening states the tension: eight skills in the index, no way to tell which comes first.
- The closing pays it off: join anywhere, skip nothing, start with the first missing document.
- Every scene stays at or below four sentences.
- All reader-facing copy, labels, and diagram annotations are in English.

## Source section

The article closes with method provenance:

- [Shape Up](https://basecamp.com/shapeup) — a fixed time budget, deciding a direction before building, and ending at the people who decide.
- [rjs/shaping-skills](https://github.com/rjs/shaping-skills) — Ryan Singer's discipline of carrying the frame forward rather than re-deriving it.
- The optional detours, the reframe-don't-rewrite rule, and the renderers that decide nothing are this library's addition.
