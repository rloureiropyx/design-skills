# Scene Script — The Drawing Is the Easy Part

**Goal:** G2 — argue a position. The claim: a diagram fails before anything is drawn, so the tool was never the variable.

**Tone:** T1 — plain and direct. Short sentences, no metaphor that isn't doing work, says "this is hard" when it is.

**Opening tension:** A diagram everyone approved in the meeting and nobody used afterwards. The drawing was fine.

**Top identification:** Present `diagrams` immediately as the skill that decides what a diagram shows, before the tension.

**Final payoff:** The reader accepts that intention, audience, scope and scale are the diagram, and that the render is the last and cheapest step. They leave with the eight moves and one usable test: show it to the person it was for.

**Audience:** Product designers, PMs and engineers who already make diagrams and assume the hard part is the tool. They have Figma, Miro, Mermaid and a whiteboard. They have never written down who a diagram was for.

**Estimated reading time:** 4 minutes.

**Proposed pattern:** Sticky graphic + discrete steps throughout. Full-viewport composition for the opening and the closing.

| # | VISUAL — diagram state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 1 · The claim | **A good drawing that did nothing.** A finished, tidy diagram sits centred and approved. It desaturates, and four unanswered questions surface beneath it: who is this for · what should they be able to do afterwards · what is deliberately out · how will they read it. | Everyone nodded at the diagram in the meeting. A week later nobody had used it. The drawing was fine — aligned, legible, spaced. It failed four decisions earlier, before anything was drawn. | Opens the sequence. |
| 2 · The definition | **Two gates.** Candidates approach from the left — an org chart, a photographed whiteboard, a slide of boxes and arrows. Gate one asks *does it help someone?* Gate two asks *is it visually represented?* Most stall at the first. | A diagram is a visual representation that helps someone. Two conditions, both required, and the first one is where things fail. It has to help someone — even if that someone is you. Passing the second gate and failing the first is not a rendering problem. | The approved diagram shrinks into the queue of candidates. |
| 3 · Intention | **One sentence with two blanks.** *The diagram helps [audience] to [do or understand or decide X].* The blanks fill in. Beside it, three alternatives light up and stay lit: a table, an email, one sentence. | Write that sentence before anything else. "Make a diagram" is a request for a medium, not an intention. The sentence has a second job: it tells you when a table, an email or a single sentence would do the job better. Sometimes the right answer is not a diagram. | The gates dissolve into the sentence. |
| 4 · Audience | **The same subject, twice.** One version for the people who live the process — their words, their steps, shallow. One for the people who build it — system names, states, deeper. Neither is the reduced version of the other. | A diagram is only good in the eye of the beholder. Someone who lives a process and someone who builds it need different vocabulary and different depth. That is two diagrams, not one diagram at two zoom levels. Picking one audience is what makes every later decision decidable. | The sentence splits down the middle into two readers. |
| 5 · Scope | **Covers / does not cover, then three layers.** A boundary line with items sorted either side. Behind it, three stacked bands — essentials, elaboration, context. Bands two and three dim to half. | Say what it covers and what it does not, out loud, before drawing. Then build in importance order: essentials first, then elaboration, then context. Detail earns its place by serving the intention, not by being known. When in doubt, ship the essentials and add one thing. | The two readers recede; the boundary line is drawn between them. |
| 6 · The type | **One word breaking into twelve.** The word *flowchart* fractures; the pieces sort themselves into three columns — time, arrangement, context — with the twelve recipes landing under them. | People say "flowchart" for anything with a box in it. Pick the type from what the reader is stuck on instead: time, arrangement, or context. Twelve recipes cover almost everything, and they are a grammar rather than templates. When none of them fit, adapt the nearest one and say which. | The layer bands rotate into three columns. |
| 7 · The key | **A key that outgrows itself.** Three rows stay: visual vocabulary, sources and timeframe, a note of intention. Rows four to nine — colour meanings, abbreviations, leftover research — arrive and turn coral. | A key holds three things. The visual vocabulary, the sources and timeframe, and a note of intention. When it starts explaining what a colour means or decoding an abbreviation, it has become a decoder ring — and that is evidence the diagram is underlabelled, not a fix for it. The same goes for colour: anything meaningful needs a second cue behind it. | One column collapses into a legend box in the corner. |
| 8 · The render | **One vocabulary, three outputs.** Shapes, containers, connectors, brackets, axes, lanes, overlaps, labels, key — feeding a local canvas, a shared board, and a fenced Mermaid block. The three results read identically. | Those nine things are what the earlier decisions produce, and they do not change when the tool does. A local canvas, a shared board, or a Mermaid block in a markdown file all render the same diagram. Picking the tool first is picking the only part that was never the variable. | The legend fans back out into the full vocabulary. |
| 9 · The payoff | **Eight moves and a loop.** Four unlit — intention, audience, scope, scale. Four lit — shapes, lines, labels, key. An arrow returns from the end to a single reader holding it. | Four decisions with no drawing in them, then four with drawing, then a loop. There is no right or wrong in diagramming; there is only better, and on purpose. Which means the test is not whether you like it, and not whether it passes a checklist. Show it to the person it was for and watch what they do. | The three outputs converge into one diagram, handed over. |

## Static prose bridges

- **Before scene 1:** what this skill is — the discipline that decides what a diagram shows, sitting one step upstream of anything that draws.
- **After scene 3:** scale, the fourth in-visual decision, which the scenes skip: size times interaction mode, and why a poster, a worksheet, a slide and a wall are four different diagrams of the same thing.
- **After scene 6:** the twelve recipes named, one line each, grouped by centre of stuck-ness — and the note that some of them (flows, sitemaps, concept models, journey maps) are deep enough to be skills of their own.
- **After scene 7:** the rest of the craft bar — obvious starting place, reading order, neatness, contrast that survives colour-blindness, and the fact that a chart is not a diagram.
- **Before the closing:** where this sits against the other skills — not `problem-framing`, not `wireframes`, not `breadboarding` — and what it will decline to draw.

## Diagram system

Native SVG, no decorative imagery. Every diagram has a text equivalent in the scene copy.

1. **The approved diagram:** a finished drawing with four unanswered questions under it.
2. **Two gates:** helps someone · is visually represented.
3. **The intention sentence:** two blanks, three alternatives beside it.
4. **Two readers:** the same subject rendered for people who live it and people who build it.
5. **Scope boundary and three layers:** in / out, then essentials · elaboration · context.
6. **Twelve recipes in three columns:** time · arrangement · context.
7. **The key that outgrows itself:** three legitimate rows, six illegitimate ones.
8. **One vocabulary, three renderers:** identical output from a local canvas, a shared board, and Mermaid.
9. **The eight moves:** four unlit, four lit, and a loop back to a reader.

## Art direction

- **Central visual metaphor:** the invisible decisions surfacing. Everything the reader cannot see in a finished diagram is what the article draws.
- **Graphic language:** editorial systems diagrams matching the rest of the library.
- **Colour semantics:** in-visual decisions in blue, drawn elements in olive, the reader and audience in teal, symptoms and failures in coral.
- **Motion:** discrete 0.4–0.8 second transitions on transform and opacity only.
- **Mobile:** compact diagram pinned above each text card, opaque, active state preserved at 375px. Scene 6's twelve items reduce to three labelled columns with counts.
- **Accessibility:** the coral "symptom" state is always named in the copy, never carried by colour alone. Scene 2's two gates are stated as two conditions in the text.

## Beat validation

- Every scene introduces one concept and changes the diagram state.
- The opening states the tension: a well-drawn diagram nobody used.
- The closing pays it off: four decisions before drawing, and a test that involves a real reader.
- Every scene stays at or below four sentences.
- Scene 1 opens on a claim, as G2 requires — not on a mechanism and not on a story.
- All reader-facing copy, labels, and diagram annotations are in English.

## Source section

The article closes with method provenance:

- Abby Covert, *Stuck? Diagrams Help* — the definition, the eight moves, the twelve recipes, the craft principles, and the creed quoted in scene 9.
- Dan Brown, *Communicating Design*, chapters 1–2 — the three layers and the stopping rule in scene 5.
- The skill's own `references/recipes.md` and `references/craft.md` — the recipe groupings and the key rules quoted here.

## Delivery matrix

To be filled after implementation: nine viewports from 320×568 to 1280×800, recording the least clearance and the scene it occurs in.
