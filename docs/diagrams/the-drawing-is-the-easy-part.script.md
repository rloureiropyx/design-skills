# Scene Script — The Drawing Is the Easy Part

**Goal:** G2 — argue a position. The claim: a diagram fails before anything is drawn, so the tool was never the variable.

**Tone:** T1 — plain and direct. Short sentences, no metaphor that isn't working, says "this is hard" when it is.

**Opening tension:** A diagram everyone approved in the meeting and nobody opened again. The drawing was fine.

**Top identification:** The intro prose names `diagrams` as the skill that decides what a diagram shows before anything is drawn, so scene 1 can open straight on the claim.

**Final payoff:** The reader accepts that intention, audience, scope and scale decide whether a diagram works, and that the render is the last and cheapest step. They leave with the eight moves and one test they can run today.

**Audience:** Product designers, PMs and engineers who already make diagrams and assume the hard part is the tool. They have Figma, Miro, Mermaid and a whiteboard. They have never written down who a diagram was for.

**Estimated reading time:** 3 minutes.

**Proposed pattern:** Sticky graphic + discrete steps throughout, with static prose bridges between sequences. Full-viewport composition for scene 1 and scene 7.

| # | VISUAL — diagram state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 1 · The claim | A finished, tidy diagram sits centred, boxes aligned, stamped approved in violet. It desaturates to coral, and four empty slots surface beneath it: who is it for, what should they do after, what is left out, how will they read it. | Everyone approved the diagram in the meeting. A week later nobody had opened it again. The lines were straight, the boxes aligned, the labels legible. It had already failed four decisions before anyone drew a box. | Opens the sequence, full viewport. |
| 2 · The definition | The approved drawing slides into a row of candidates — an org chart, a photographed whiteboard, a slide of boxes — moving toward two gates. Gate one reads *does it help someone* in blue; gate two reads *is it visually represented* in structural line. Most candidates stop at gate one and turn coral. | A diagram is a visual representation that helps someone. Both conditions have to hold, and the first one is where diagrams fail. A tidy drawing that helps no one still clears the easy gate. It was never going to work, and the rendering had nothing to do with it. | The approved diagram shrinks into the queue and meets the two gates. |
| 3 · Intention | The gates dissolve into one sentence with two blank slots, drawn in blue: *the diagram helps ___ to ___.* Three alternatives light up green beside it — a table, an email, one sentence. | Write one sentence before anything else. The diagram helps this audience to do or decide this thing. If you cannot fill the blanks, you are not ready to draw. Sometimes the finished sentence shows that an email would do the job better. | The gates collapse into the sentence; the alternatives fade in beside it. |
| 4 · Audience | The sentence splits down the middle into two reader columns in blue. One is shallow and uses everyday words; one is deeper and uses system names and states. Neither column contains the other. | A diagram is only good to the person reading it. Someone who lives a process and someone who builds it need different words and different depth. Two readers means two diagrams. Pick one reader and every later choice has an answer. | The sentence divides into the two readers. |
| 5 · Scope | A boundary line is drawn between the two readers, with items sorted onto either side. Behind it, three bands stack up: essentials in green, elaboration and context muted to amber. | Say what the diagram covers and what it leaves out, before drawing. Then build in importance order. The essentials come first, the elaboration second, the context last. When you are unsure, ship the essentials and stop. | The readers recede; the boundary line and the three layers appear. |
| 6 · The render | The layers collapse into one vocabulary block — shapes, containers, connectors, labels, a key. Three arrows run from it to a local canvas, a shared board, and a fenced Mermaid block. All three draw the identical diagram in green; the tool names stay in muted line. | By now the decisions have produced a small vocabulary of shapes, containers, connectors, labels, and a key. A local canvas, a shared board, or a Mermaid block all draw the same diagram from it. Picking the tool first picks the one part that was never the variable. | The layer bands feed into the single vocabulary and its three outputs. |
| 7 · The payoff | Eight moves stand in a row. Four are unlit — intention, audience, scope, scale — and four are lit green — shapes, lines, labels, key. An arrow loops from the last move back to a single blue reader holding the finished diagram. | Four decisions come before any drawing, and four come with it. The order decides whether the diagram works, and the tool does not. There is no right or wrong in diagramming, only better and on purpose. So show it to the person it was for and watch whether they use it. | The three outputs converge into one diagram, handed to the reader. |

## Static prose bridges

- **Before scene 1:** what this skill is — the discipline that decides what a diagram shows and writes it down, sitting one step upstream of anything that draws.
- **After scene 3:** scale, the fourth decision the scenes compress. Scale is size times interaction mode, and a poster, a worksheet, a slide and a wall are four different diagrams of the same subject.
- **After scene 5:** choosing the type from what the reader is stuck on rather than the word they used — time, arrangement, or context, across twelve recipes that behave as a grammar. Some of those types (flows, sitemaps, concept models, journey maps) run deep enough to be skills of their own.
- **After scene 5:** the key as the tell. A key holds the visual vocabulary, the sources and timeframe, and a note of intention. When it starts explaining what a colour means or decoding an abbreviation it has become a decoder ring, which is a sign the diagram is underlabelled. Any colour that carries meaning needs a second cue behind it, because contrast has to survive colour-blindness.
- **Before scene 7:** where this sits against the neighbours — not `problem-framing`, not `shaping`, not `wireframes`, not `breadboarding` — and what it declines to draw, including a chart of numbers and a decision nobody has made yet.

## Diagram system

Native inline SVG, editorial systems-diagram language, no decorative imagery. Every state has a text equivalent in the scene copy.

1. **The approved diagram:** a finished, approved drawing that desaturates, with four unanswered questions under it.
2. **Two gates:** helps someone · is visually represented, with a queue of candidates stalling at the first.
3. **The intention sentence:** two blanks, three green alternatives beside it.
4. **Two readers:** the same subject rendered for people who live it and people who build it.
5. **Scope boundary and three layers:** in / out, then essentials · elaboration · context.
6. **One vocabulary, three renderers:** identical output from a local canvas, a shared board, and a Mermaid block.
7. **The eight moves:** four unlit, four lit, and a loop back to a single reader.

## Art direction

- **Central visual idea:** the invisible decisions made visible. Everything a reader cannot see in a finished diagram is what this article draws.
- **Graphic language:** editorial systems diagrams matching the rest of the library.
- **Colour semantics (house brief):** blue for input, the intention sentence and the reader; green for a valid or settled state and the alternatives worth taking; violet for the approval stamp; amber for the pending, lower-priority layers; coral for the failure being argued against; structural line for boundaries and tool names.
- **Motion:** discrete 0.4–0.8 second transitions on transform and opacity only.
- **Mobile:** compact diagram pinned above each text card, opaque, active state preserved at 375px. Scene 6's three renderers reduce to three labelled rows; scene 7's eight moves reduce to a four-plus-four split with the loop implied.
- **Accessibility:** the coral failure state is always named in the copy, never carried by colour alone. Scene 2's two gates are stated as two conditions in the text.

## Beat validation

- Every scene introduces one concept and changes the diagram state.
- The opening states the claim, as G2 requires: a well-drawn diagram nobody used, failed before it was drawn.
- The evidence sits in the middle: definition, intention, audience, scope, render.
- The closing states the consequence: the order of the decisions decides the outcome, and the test is a real reader.
- Every scene stays at or below four sentences.
- All reader-facing copy, labels, and diagram annotations are in English.

## Source section

The article closes with method provenance, real links only.

- Abby Covert, *Stuck? Diagrams Help* — the definition, the eight moves, the twelve recipes, the craft principles, and the creed quoted in scene 7.
- Dan Brown, *Communicating Design*, chapters 1–2 — the three layers and the stopping rule in scene 5.
- [`skills/artifacts/diagrams/SKILL.md`](../../skills/artifacts/diagrams/SKILL.md) — the eight moves and the type-selection logic.
- [`skills/artifacts/diagrams/references/recipes.md`](../../skills/artifacts/diagrams/references/recipes.md) — the twelve recipes named in the type bridge.
- [`skills/artifacts/diagrams/references/craft.md`](../../skills/artifacts/diagrams/references/craft.md) — the key rules and the colour-backup rule quoted in the bridges.
