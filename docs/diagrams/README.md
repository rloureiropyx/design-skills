# Notes — Diagrams

No article yet. These notes are the explainer.

## What it does

Decides what a diagram should show and why, then hands it to a renderer to draw. A diagram here has a working definition with two conditions, and both have to be true:

1. it helps someone — even if that someone is you;
2. it is visually represented.

Most bad diagrams do not fail at the drawing. They fail at intention, audience and scope: decisions that are invisible in the finished picture and felt by everyone who reads it. This skill makes those decisions on purpose and writes them down before anything is drawn.

## Who it is not for

- Deciding what problem is worth solving. That is `problem-framing`.
- Choosing between solution directions. That is `shaping`.
- Sketching a mechanism in words — places, affordances, connections. That is `breadboarding`.
- Laying out a screen. That is `wireframes`. A wireframe is a screen, not a diagram.
- Writing the document someone approves. That is `proposal`.
- Building a scroll-driven article. That is `scrollytelling`.
- Quantitative charts. A funnel, a bar chart or a distribution is a chart, not a diagram, and the skill is told to say so rather than draw a diagram of numbers.
- Illustrating a decision nobody has made yet. Three options drawn side by side is a `shaping` job wearing a picture.

## Eight moves, and the first four have no drawing in them

1. **Set an intention** — *"the diagram helps [audience] to [do or understand or decide X]."* "Make a diagram" is not an intention. The test is whether a diagram could deliver this at all, and whether a table, a sentence or an email would do it better.
2. **Know the audience** — what they know, what vocabulary is safe, and whether they live the thing or build it. If the person who is stuck is you, that is a valid audience.
3. **Choose scope** — *"it will cover ___ and will not cover ___."* Three ways this goes wrong: too much, too little, and the wrong register.
4. **Determine scale** — size times interaction mode. A poster, a worksheet, a slide and a wall are four different diagrams of the same thing.
5. **Set shapes** — the objects: people, places, things.
6. **Add lines** — the relationships. Arrange the shapes and imagine the lines before committing them; shapes and lines are a loop, not two steps.
7. **Refine labels** — early ones are "labels to get by"; delivered ones have to speak for themselves and match the intention. Under about 25 characters, consistent casing.
8. **Add a key, and only what is needed** — the visual vocabulary, the sources and timeframe, a note of intention. Nothing else.

Then loop back and test it. Critique is not the test; a reader is.

## The key is the tell

A key legitimately holds three things. When it starts explaining what a colour means, or decoding an abbreviation, or carrying research nobody could fit anywhere else, it has become a decoder ring — and that is a symptom of an underlabelled diagram, not a fix for one.

The same logic applies to colour. Contrast has to survive colour-blindness, so every colour that carries meaning is backed up by a second cue.

## Build in importance order, and stop

Brown's three layers overlap the scope steps and give a stopping rule:

- **Layer 1 — essentials.** Without these it is not that kind of diagram at all. A sitemap without pages is not a sitemap.
- **Layer 2 — elaboration.** Detail that adds meaning. The diagram is still valid without it.
- **Layer 3 — context.** Dates, status, links to the rest of the project.

When in doubt, ship Layer 1 and add one or two Layer 2 elements as confidence grows. Detail earns its place by serving the intention, not by being known.

## Choosing the type

Not from the words someone used — people say "flowchart" for anything with a box in it — but from what is at the centre of their stuck-ness:

- **Time** — Gantt, swim lane, journey, flow.
- **Arrangement** — hierarchy, schematic, block, concept.
- **Context** — sign (cause and effect), continuum, quadrant, Venn.

Twelve recipes, each with when to use it, its anatomy, how to build it, and what to watch out for. They are a grammar rather than a closed set: when none fit, adapt the nearest and say which one.

Some of these types have enough discipline of their own to be separate skills — flows, sitemaps, concept models, journey maps. If one of those is installed it takes over; if not, the recipe here is enough, and the skill names which one it used rather than stalling on a skill that is not there.

## Where it sits

It reads `FRAMED_PROBLEM.md`, `DIRECTIONS.md` or `PROPOSAL.md` when they exist, because the audience and the scope are usually already written there. It carries them instead of deriving them again, and when the diagram exposes something that contradicts them it reports that rather than quietly redrawing the problem.

Unlike the rest of the chain it has no fixed slot. A diagram is useful at any point where someone is stuck on how a thing is arranged, and it is equally useful for critiquing a diagram that already exists.

## Drawing it

`tldraw-skill` renders it. The vocabulary this skill produces — shapes, containers, connectors with direction and weight, brackets, axes, lanes, overlaps, labels, key — maps onto tldraw primitives without changing; only the renderer changes if the diagram has to be shared elsewhere. tldraw needs its offline desktop app running on the same machine. With no renderer available, a Mermaid block is an honest fallback for a flow or a hierarchy, and the skill is told to say that is what it is doing.

## Source

Abby Covert, *Stuck? Diagrams Help* — the eight moves, the twelve recipes, the craft principles, and the creed the skill runs on: *"there is no right or wrong in diagramming; there is only better and on purpose."* Dan Brown, *Communicating Design*, chapters 1–2 — the three layers, the state conventions, and the meeting recipe for walking a group through one. The additions are the render-agnostic split, the carry-don't-re-derive rule, and the boundaries against the other skills here.

- Skill: [`skills/artifacts/diagrams/SKILL.md`](../../skills/artifacts/diagrams/SKILL.md)
