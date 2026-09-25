# Notes — Concept animation

```
one-idea-per-click.html          the explainer — a two-slide deck built with the skill's own engine
one-idea-per-click.script.md     its beat table, written before the slides
engine/  slides/  fonts/         what the deck loads; a snapshot of the skill's template
```

Open [`one-idea-per-click.html`](one-idea-per-click.html) in a browser and click, or press the right arrow. No build step, no server, no dependencies. `?static` shows every end state at once with reading-order numbers; `N` opens the text of every step.

## What it does

Builds an animated explainer for a concept that has already been worked out: a technical drawing on a canvas that gains one idea per click. Each click is a **beat**. A beat has a caption, which is both the screen-reader text and the speaker note, and an end state that reads as a finished diagram without the animation.

It comes with a small JavaScript engine and a folder of tools. The engine draws; the tools render frames and run a smoke test in your installed Chrome.

## Who it is not for

- Deciding what the explanation says. Bring a source: `PITCH.md`, `DECK.md`, a spec. Without one the skill asks for it or points at `pitch`.
- Motion inside a product UI — a button, a sheet, a page transition. That is the `animate` skill, which this plugin does not ship.
- A static diagram. That is `diagrams`, drawn by a renderer.
- A Figma Slides deck (`slides`) or an article that changes as you scroll (`scrollytelling`).
- Anyone who needs to edit the result without touching code. Every slide is a JavaScript file.

## How it runs

1. **Pin the source.** Every label drawn traces to a line in it. If an older visual exists, list what it dropped or added, and restore the source.
2. **Write the beat table.** One idea per row, in causal order, each with a caption and a named object. Approve it before any code.
3. **Scaffold** a deck folder from the template.
4. **Lay out the end state** of every beat, then add timing.
5. **Verify by looking.** Render the middle and end of every beat, view each frame, and run the smoke test until it says `smoke: ok`.
6. **Document** how to present and extend the deck.

## Two drawing rules that do most of the work

**Draw the object.** A file is a page, a folder holds sheets, an LLM session is a chat window, a person is an avatar, an approval is a stamp. People recognise those before they read a label. Boxes are for groupings with no real form.

**Put the verb on the wire.** A process such as "capture" is the connector itself, labelled with the verb, with the tool that performs it in the middle of the wire. The travelling token changes form as it passes the tool — a scrap goes in, a sheet comes out — which gives the motion a physical meaning.

Slide 2 of the explainer shows both, against a first draft made of boxes.

## What it costs

- A deck is code. Changing a label means editing a slide file and looking at the frames again.
- The verify step is slow on purpose: two mid frames and an end frame per beat, all viewed. A nine-slide deck is a few hundred images.
- The tools need Node and Google Chrome. `ffmpeg` is needed only for contact sheets and the optional MP4 export.
- The bundled fonts are a latin subset. No arrow characters, no Greek letters.

## Where it came from

It was written for one real explainer deck and moved into the plugin once the method held up. The anti-patterns in `SKILL.md` are the mistakes made in that deck: a metaphor drawn on the wrong object, an illustrative chart with numbers that read as data, a colour that took on a second meaning, an archived page that loaded `../engine` and showed blank in a previewer.

Changes when it moved in:

- `PRIMITIVES.md` and `PROMPT.md` became `references/primitives.md` and `references/briefing-another-model.md`; the drawing idioms and tool commands moved out of `SKILL.md` into `references/idioms.md` and `references/tools.md`.
- The engine moved to `templates/deck/`, and `scaffold.sh` resolves it next to itself instead of from a hardcoded home-directory path.
- MP4 export stayed in the tools but is optional and no longer part of the loop.
- A `## Preserve the boundary` section and an `## Anti-patterns` section were added.

## Files

```
SKILL.md                               the loop, the constraints, the anti-patterns
references/primitives.md               the engine API — read before writing a slide
references/idioms.md                   objects, verbs on wires, merges, zoom — read before drawing connectors
references/tools.md                    snapshots, single frames, contact sheets, optional MP4
references/briefing-another-model.md   a brief for when a different model drafts the explainer
templates/deck/                        the engine, an example slide, fonts, tools
scaffold.sh                            copies templates/deck into a new folder and sets the title
```

- Skill: [`skills/renderers/concept-animation/SKILL.md`](../../skills/renderers/concept-animation/SKILL.md)

---

**Rendering.** Checked with the skill's own smoke test (`smoke: ok`, p95 frame 16.8ms), and every mid and end frame viewed in motion, static and reduced modes.
