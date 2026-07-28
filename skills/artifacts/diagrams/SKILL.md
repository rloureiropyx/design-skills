---
name: diagrams
description: >-
  Decide what a diagram should show and why, then hand it to a renderer to draw.
  Use when someone wants a diagram, flowchart, org chart, hierarchy, swim lane,
  Gantt, quadrant, Venn, concept map, block diagram, schematic, causal loop or
  continuum, asks to "visualise X", or says diagrama, flujo, mapa or esquema.
  Also use to critique or repair an existing diagram. Owns the diagramming
  discipline — intention, audience, scope, scale, type choice, craft bar — and
  stays render-agnostic, handing the drawing to `tldraw-skill`. Do NOT use it to
  decide what problem is worth solving (`problem-framing`), to choose between
  solution directions (`shaping`), to sketch a mechanism in words
  (`breadboarding`), to lay out a screen (`wireframes` — a wireframe is a
  screen, not a diagram), to write the document someone approves (`proposal`),
  or to build a scroll-driven article (`scrollytelling`). Do NOT use it for
  quantitative charts, for canvas drawing mechanics, or to illustrate a decision
  nobody has made yet.
---

# Diagrams

A diagram is **"a visual representation that helps someone."** Two questions must both be YES, or it is not (yet) a diagram:

1. **Does it help someone?** (Even if that someone is you.)
2. **Is it visually represented?**

The hard, valuable work happens *before* any shape is drawn. Most bad diagrams fail not on rendering but on **intention, audience, and scope** — decisions invisible in the final picture but felt by everyone who reads it. This skill makes those decisions on purpose.

Two complementary sources:
- **Abby Covert (*Stuck? Diagrams Help*)** — the discipline core: intention → audience → scope → scale → shapes → lines → labels → key, plus the 12 recipes and craft principles.
- **Dan Brown (*Communicating Design*)** — web/product-design specifics: the three "layers" of a diagram, a rough drawing process, state conventions, and presenting to stakeholders. See `references/brown-diagrams.md`.

> Creed: **"There is no right or wrong in diagramming; there is only *better and on purpose*."** Progress, not perfection. Every choice traceable to *this intention* for *this audience*.

Conduct the conversation and the diagram in the user's language.

## Before you ask anything

If a `FRAMED_PROBLEM.md`, `DIRECTIONS.md` or `PROPOSAL.md` exists in the project, read it first. The audience, the scope and often the intention are already written down there. Carry what they say rather than deriving them again — and when the diagram exposes something that contradicts them, report it instead of quietly redrawing the problem.

Then ask one question at a time, and only when the answer would change the diagram.

## This skill is render-agnostic

`diagrams` owns **what to draw and why**. It contains no tool mechanics. When it is time to materialise:

- **Default renderer: `tldraw-skill`** — a local `.tldraw` file, fast to iterate on, nothing leaving the machine. Vocabulary→primitive mapping is in `tldraw-skill/references/craft.md`. It needs the tldraw offline desktop app running; if it is not, say so rather than drawing somewhere else.
- **A shared canvas instead.** If the diagram has to be co-edited and a renderer for that tool is installed — Miro, Excalidraw, FigJam — hand the same vocabulary to it. The vocabulary does not change; only the renderer does.
- **No renderer available.** Markdown plus a Mermaid block is an honest fallback for a flow or a hierarchy. Say that is what you are doing and why.

The abstract vocabulary this skill produces — shapes, containers/nesting, connectors (direction/weight), brackets, axes, zones/lanes, overlaps, labels, key — is Covert's "shapes and lines." A renderer translates it into concrete primitives.

Do the in-visual work first; do not jump to a renderer for Steps 1–4.

## When a specialised skill exists

Some diagram types carry enough domain discipline to be skills of their own — flows, sitemaps, concept models, journey maps, service blueprints, mental model diagrams, ecosystem maps. **If one of those is installed, use it**: it inherits this craft and adds the domain specifics. If it is not installed, the matching recipe in `references/recipes.md` is enough for a standalone diagram — build it here and say which recipe you used, rather than stalling on a skill that is not there.

Two neighbours are not children. A **wireframe** is a screen, not a diagram — that is `wireframes`. A **breadboard** is places and affordances in words, deliberately too coarse to draw — that is `breadboarding`.

## The workflow (Covert's 8 moves)

First four are **in-visual** (no drawing yet); last four are **visual**. Shapes↔lines is a loop.

**1. Set an intention.** *"The diagram helps [audience] to [do/understand/decide X]."* Test: could a diagram deliver this, and could something else (a table, a sentence, an email) do it better? "Make a diagram" is not an intention. Frames: reflecting, considering, instructing, identifying, planning.

**2. Know the audience.** A diagram is only good *in the eye of the beholder*. What do they know? What vocabulary is safe? Distinguish **users** (who live the thing) from **stakeholders** (who build it). If the person stuck is *you*, that is valid.

**3. Choose scope.** *"The diagram will cover ___ and will not cover ___."* Guard against **too much** (cognitive load — diagrams need to breathe), **too little** (missing sources/timeframes, unexplained icons), **not the right information** (wrong register).

**4. Determine scale.** Scale = **size × interaction mode** (active/passive). Poster ≠ worksheet ≠ slide ≠ wall. On a canvas the default is large-active; confirm the delivery medium.

**5. Set shapes** (objects: people, places, things). **6. Add lines** (relationships). Move shapes into arrangements and *imagine* the lines before committing them. See **Choosing the type** and `references/recipes.md`.

**7. Refine labels.** Early: "labels to get by." At delivery: labels must **speak for themselves** and **match the intention**. Aim < 25 chars; consistent casing.

**8. Add a key — only what's needed.** Every element should be self-evident. A key legitimately holds: (a) visual vocabulary, (b) citations/timeframes/methods, (c) a note of intention. It must **never** become a decoder ring for overloaded color, cryptic labels, or dumped research.

Then **loop back and test.** "The only way to know is to test the diagram with your audience." For an agent: render, critique against the checklist, iterate, and show the user for real feedback.

## Brown's three layers (scope discipline)

Overlay this on Steps 3–5. Build in order of importance and stop when the intention is met:
- **Layer 1 — Essentials.** Without these it isn't that kind of diagram at all.
- **Layer 2 — Elaboration.** Detail that adds meaning; the diagram is still valid without it.
- **Layer 3 — Context & connection.** Ties it to the wider project (dates, status, links to other artifacts).

"When in doubt, do Layer 1 only, then add one or two Layer-2 elements as confidence grows." Full detail + Brown's 10-step rough process and state conventions (as-is / to-be / to-be-eventually) in `references/brown-diagrams.md`.

## Choosing the type (which recipe?)

Pick by **what is at the center** of the reader's stuck-ness. Full recipes in `references/recipes.md` — load before building.

**Center = TIME** ("when/how"): parallel tasks across teams → **Gantt** · hand-offs across teams → **Swim Lane** · one actor + emotion/experience over time → **Journey** · one actor + logic/data → **Flow**

**Center = ARRANGEMENT** ("what/where"): levels/ownership → **Hierarchy** · physical interface → **Schematic** · concrete assembly → **Block** · abstract labeled relationships → **Concept**

**Center = CONTEXT** ("which/why"): cause & effect (couplets with +/−) → **Sign** · opposing views along one axis → **Continuum** · compare on two axes → **Quadrant** · combinations/overlaps → **Venn**

**Recipe or specialised skill?** The recipe here is enough for a standalone diagram. When a Swim Lane, Flow, Hierarchy, Concept or Journey becomes a deliverable somebody maintains — states, rules, errors, recovery, hand-offs — use the specialised skill for it *if one is installed* (`flows`, `sitemaps`, `concept-models`, `journey-maps` and the wider experience-mapping family). Otherwise say the recipe is doing that job and keep it Layer 1.

**None fit?** The 12 are a grammar, not a closed set — adapt the nearest. For a timeline or roadmap, adapt Gantt. For a **quantitative chart** — funnel, bar, pie, line, distribution — stop: that is a chart, not a diagram. Hand it to a charting skill if one is installed; otherwise say plainly which chart the data wants and why, rather than drawing a diagram of numbers.

## The five arrangements & their lines

| Relationship | Arrangement | Line |
|---|---|---|
| part of | nest inside a larger shape | container / zone |
| type of | indent under a parent | bracket (horizontal ≤2 levels; vertical at 3+) |
| leads to | sequence | one-way arrow |
| relates to | adjacency | plain line — **almost always labeled** |
| same as | overlap | overlap / two-way line |

## Craft bar — critique before you ship

Good diagrams are **Accessible · Content-driven · Visually supported**, delivering **S**tability **T**ransparency **U**nderstanding **C**larity **K**indness. Quick check (full 9 principles + 25-point BINGO in `references/craft.md`):

- **Obvious starting place** and **strong reading order** matching the audience's culture. No tour guide needed.
- **Neat & tidy:** grid-aligned, lines touch their shapes, consistent casing, same-role shapes same size. Rearrange to avoid crossing lines.
- **Contrast-aware:** legible and meaningful; survives color-blindness. **Back up color with another cue.**
- **Tone & timescale clear:** Then / Now / When. Don't get stuck between timescales.
- **Appropriately dense & precise:** breathing room; short labels; readable type.
- **Encoding backed up, embellishment earns its place:** every icon labeled; no decoder-ring key.

## Presenting & collaborating

Walking a group through a diagram is its own move, in this order: set the **context** → explain the **conventions** you used → tell the **core story** the diagram exists to tell → name the **decisions** it records → name the **constraints** it had to respect → draw out the **implications** → ask for feedback on **specific things**, not "thoughts?" → **close the loop** on what you heard. *"You are a journalist, not a joke-teller."* If a `communicate-design` skill is installed, the same recipe lives there in more detail. Facilitation moves for diagramming *with* a person or group are in `references/collaboration.md`.

## Anti-patterns

- **Drawing before the intention is written.** Steps 1–4 produce a sentence — "the diagram helps [audience] to [do X]" — that every later choice is checked against. Skipping to shapes means nothing can be judged, only preferred.
- **Treating "make me a diagram" as an intention.** It is a request for a medium. Ask what the reader has to be able to do afterwards, once.
- **Picking the type from the user's words.** Someone says "flowchart" for anything with a box. Pick from what is at the centre of their stuck-ness — time, arrangement, or context — then tell them what you picked and why.
- **Re-deriving the audience and scope that `FRAMED_PROBLEM.md` already states.** Carry them. If the diagram contradicts them, that is a finding to report, not a licence to reframe.
- **One diagram doing two jobs.** Two audiences, or "and also show the timeline", is two diagrams. The tell is a key that keeps growing.
- **The key as a decoder ring.** A key holds the visual vocabulary, the sources and timeframe, and a note of intention. When it starts explaining what a colour or an abbreviation means, the diagram is underlabelled.
- **Adding Layer 2 and 3 detail because it is known.** Detail earns its place by serving the intention. When in doubt, ship Layer 1.
- **Illustrating a decision nobody has made.** A diagram of three unchosen options is a `shaping` job wearing a picture. Say so instead of drawing it.
- **Calling it done without testing it.** Render it, critique it against the craft bar, then show it to a real reader. The critique is not the test.
- **Letting the renderer lead.** If the tool cannot draw something, that is a rendering constraint to state, not a reason to change what the diagram says.

## Reference files

- `references/recipes.md` — the 12 recipes (when/anatomy/build/pitfalls). **Load before building any specific type.**
- `references/craft.md` — the 9 principles + accessibility + the 25-point Critique BINGO.
- `references/process.md` — the 8-step process in depth, the Exploring→Modeling→Delivering arc, and research methods.
- `references/brown-diagrams.md` — Brown's three layers, 10-step process, state conventions, and a Covert↔Brown reconciliation.
- `references/collaboration.md` — facilitation moves for diagramming with a person or group.
- **Rendering:** `tldraw-skill` (canvas mechanics) + `tldraw-skill/references/craft.md` (layout math, palette, vocabulary→primitive mapping).
