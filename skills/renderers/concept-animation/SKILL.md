---
name: concept-animation
description: >-
  Builds click-driven animated concept explainers: a technical-drawing diagram
  drawn frame by frame on a zero-dependency JavaScript canvas, one idea revealed
  per click, with reduced-motion and static modes, speaker notes and a text
  equivalent for every step. Use when asked to animate a slide, a diagram or a
  concept, to explain how a system works with motion ("like the how browsers
  work video", "animated explainer", "click-through diagram"), to turn an agreed
  explanation or beat list into an animated canvas deck, or to add or fix a
  slide in an existing canvas deck. It draws an explanation that has already
  been decided. Do not use it for UI component motion, transitions or
  micro-interactions (use animate), for static diagrams (use diagrams), for
  Figma Slides decks (use slides), for scroll-driven web articles (use
  scrollytelling), or to work out what the explanation should say to an
  audience (use pitch).
---

# Concept animation

An explainer is a sequence of **beats**. Each beat adds one idea to a diagram, and each click advances one beat. Every frame is a pure function of `(slide, beat, t)`, drawn by the zero-dependency Canvas 2D engine in `templates/deck/`. That determinism is what makes back navigation, reduced motion and static handouts work from the same code.

The diagram is the protagonist. Meaning is carried by position, by colour role and by the order things appear in. Motion only answers "what happens next, and because of what".

## Preserve the boundary

**Produces**: a deck folder (`index.html`, `engine/`, `slides/`, `fonts/`, `tools/`) that opens from `file://`, plus a `README.md` for presenting and extending it.

**Owns**: the beat table (how an agreed explanation splits into clicks), layout, the objects each concept is drawn as, motion, captions as text equivalents, and verification.

**Does not own** what the explanation claims. The content comes from a source of truth someone else settled: `PITCH.md`, `DECK.md`, a spec, a proposal, a doc outline. If there is no such source, say so and offer `pitch`'s fast path; do not invent the argument to have something to animate. When animating exposes a gap or contradiction in the source, report it back rather than quietly fixing the story on the slide.

**Does not own** the visual system. If `VISUAL_STYLE.md` exists (documentation directory, then project root), map its palette roles onto `engine/theme.js`. The grid, frame, stroke weights and type scale are the engine's idiom and stay. If there is none, keep the template theme and do not ask.

## Run the loop

### 1. Pin the source

Find the content's source of truth and read it in full. If a visual already exists, compare it line by line with the source and write down the **drift**: every element the visual drops, adds or contradicts. The source wins; tell the user what you restored.

Done when every label you plan to draw traces to a source line and the drift list is written.

### 2. Write the beat table

Before any code, write the table and show it to the user. Wait for approval; in autopilot, state it and continue.

| # | name | viewer understands | draws / moves | caption (text equivalent) | ms |
| --- | --- | --- | --- | --- | --- |

- One idea per beat, in **causal order**: a thing appears before anything that depends on it, even if the source lists them differently. Say so when you reorder.
- The caption states the beat's idea in one or two sentences. It is the screen-reader text and the notes text. If you cannot caption a beat, it is two beats.
- Each beat's end state must read as a finished diagram on its own, because reduced, static and back navigation show only end states.
- Use only these verbs: _draw on_ (outlines and connectors), _settle_ (opacity plus a 6px rise), _travel_ (a token along a path), _emphasise_ (a one-shot glow), _carry_ (an emphasis held to the end of beat b, faded at the start of b+1), _persist_ (a result chip that stays), _zoom_ (one camera move into a detail view, at most once per slide). Nothing loops.
- For each concept, name the **object** it will be drawn as and, for each process, the **verb on the connector** that carries it (see step 4). Confirm any metaphor's placement with the user before drawing it: which object carries it, and which does not.
- **Problem before solution.** When a sequence sets up a problem, keep those slides neutral and let the solution's colour enter with the solution. Mark hypothetical scenarios and illustrative quantities on the slide. Reuse one scenario and one recurring diagram across the sequence rather than a new picture per slide.
- Timing: 700–1500ms for most beats; up to about 5s for a beat that staggers several parallel travels 150–200ms apart.

Done when every source element appears in some beat, every beat has a caption, and every concept has a named object.

### 3. Scaffold

`scaffold.sh` sits next to this file. Use this skill's folder if you know it; otherwise resolve it:

```sh
SCAFFOLD=$(find ~/.copilot/installed-plugins ~/.copilot/skills ./skills ./.github/skills -path '*concept-animation/scaffold.sh' 2>/dev/null | head -1)
"$SCAFFOLD" <repo>/deck "<Deck title>"
cd <repo>/deck/tools && npm install && npm run contrast
```

- Map colour roles in `engine/theme.js`: one meaning per colour, for the whole deck. Keep `npm run contrast` green; darken a stroke rather than dropping the role.
- The scaffold ships a `.gitignore` for `out/` and `tools/node_modules/`. Delete `slides/01-example.js` once it has served as the pattern.
- To add a slide to an existing deck, skip the script: create `slides/NN-name.js` and add a `<script>` tag to `index.html`.

Done when the contrast check passes and the deck opens with the example removed or replaced.

### 4. Lay out the end state

Read `references/primitives.md` before writing a slide, and `references/idioms.md` before drawing connectors, a merge, or a zoom.

Write `render` for the finished diagram first and view it with `?static`. Put layout constants at the top of the slide file. Keep the 1920×1080 stage, text at 20px or larger, and clear lanes where tokens will travel. Then add timing with `s.tw(beat, startMs, durMs)`.

- **Draw things as the objects they are.** A file is a page, a folder holds sheets, an LLM session is a chat window, a person is an avatar, an approval is a stamp, a command is a `/chip`. Plain boxes are for groupings and abstractions with no real-world form.
- **Actions live on the connectors.** A process (capture, retrieve, route) is the wire itself, labelled with a verb, with the tool that performs it sitting mid-wire and the token changing form as it passes through.
- **Wires flow.** Route connectors with `Draw.curve`; several wires into one target merge tangentially into a shared stream.
- Keep one visual per meaning across slides. Never invent content inside an object: use `answerBars`, not made-up answers, and no numbers unless the source has them.

Done when every beat's end state renders under `?static` with no page errors and every label fits its object.

### 5. Verify by looking

```sh
npm run snapshots                          # 35%, 70% and end frame of every beat -> out/snapshots
node snapshots.mjs --query static --out ../out/static
node snapshots.mjs --query reduced --out ../out/reduced
npm run smoke                              # keys, click, hash, mid-beat completion, R, notes, reduced, pacing
```

`references/tools.md` covers single-frame renders and contact sheets. View every frame. Hunt for:

- tokens or labels crossing text, and text crossing text during slide transitions
- clipped or missing glyphs (tofu)
- a colour doing a second job it did not have on an earlier slide
- a chart or quantity that reads as data when it is illustrative
- an end state that needs the animation to make sense

Fix, then re-render the specific frames.

Done when every end frame and mid frame has been viewed, the smoke test prints `smoke: ok`, and there are zero page errors.

### 6. Document

Write `deck/README.md`: how to present, keys, modes, the slide list, and how to add a slide. Point to it from the repo's document index and from the source's motion notes. MP4 export is optional and described in `references/tools.md`; run it only when someone asks for a video.

Done when the README exists and the source links to the deck.

## Constraints that bite

- **Fonts.** The bundled IBM Plex fonts are a latin subset: no arrows (`→`, `↳`) and no Greek letters. Draw arrows with `Draw.line` and write "update:" rather than "Δ". Swapping fonts means new `@font-face` rules and preloading in `deck.js start()`.
- **Loading.** Classic `<script>` tags, not ES modules, so `file://` works with no server. Keep every HTML page in the deck root: in-app previewers serve only the opened file's folder, so `../engine` fails. Archived versions go in `versions-*.html` next to `index.html`, pointing at `versions/vN-name/` slide folders.
- **Determinism.** Never keep state between frames or read `Date.now()` inside `render`. Derive everything from `s.beat` and `s.t`.
- **Circles under a camera.** Sweep arcs from `0` to `2π` for fills, or `-π/2` to `3π/2` for a draw-on outline. Never start past `π` (`arc(x, y, r, π, 3π)`): under a scale transform it fills half the circle.
- **Tokens.** A token is invisible at p≤0 and p≥1, so an end state never shows a packet mid-flight. Anything that must remain gets a persisting chip.
- **Interruption.** A click mid-beat completes the beat; a click during a transition completes the transition. Never skip content.
- **Accessibility.** The canvas stays `aria-hidden`. The live region announces "Slide X of Y, step N of M" plus the caption, and `N` opens notes listing every beat. The smoke test fails if any beat lacks a caption. Colour is never the only carrier: each role is also an object with a label.

## Briefing another model

To have a different model or tool draft an explainer, use `references/briefing-another-model.md` instead of a one-line style prompt.

## Anti-patterns

- **Placing a metaphor without confirming where it goes.** A protective coating that belonged on the branches of a graph was drawn on the connectors between them; the slide read as a different mechanism. Name the object that carries a metaphor in the beat table and confirm it before drawing.
- **Numbers that imply data.** A step-down chart with percentages reads as a measurement. Label it "Illustrative, not measured", or drop the numbers and keep the shape.
- **A colour with two meanings.** A role colour that starts as "the proposal" drifts into "anything important" three slides later. One meaning per colour for the whole deck; check it on the contact sheet.
- **Tokens and labels crossing text.** A travelling packet or a verb label passing over a heading. Leave lanes for travel in the layout, and look at the mid frames, not only the end frames.
- **Half-filled circles under zoom.** `ctx.arc(x, y, r, π, 3π)` looked right at scale 1 and filled half a disc inside the camera move. Use `0..2π`.
- **Unicode the fonts do not have.** `→`, `↳`, `Δ`, Greek letters render as tofu in the latin subset. Draw arrows; spell words.
- **`../engine` in an archived page.** A versions page inside a subfolder loaded fine in a browser and blank in the in-app previewer. All HTML in the deck root.
- **Straight rigid wires.** Right-angle buses and single convergence points bundle into a braid and read as a circuit. Curves, merging tangentially.
- **Plain boxes where a real object exists.** A box labelled "file" or "chat" needs reading; a page or a chat window is recognised first. Boxes plus a colour key is the first draft, not the result.
- **Actions drawn as boxes.** "Capture" as a box between two boxes turns a verb into a place. Put the verb on the wire and the tool mid-wire.
- **Animating an undecided explanation.** Drawing before the source says what the claim is produces motion without an argument. Stop at step 1 and ask for the source, or offer `pitch`.

## Sources

- The idiom — a technical drawing built piece by piece, tokens travelling along connectors, one click per idea — comes from systems-explainer videos of the "how browsers work" kind. The engine was written for one real deck and generalised from it.
- The two easing curves and the interruptible, nothing-loops, reduced-motion-first rules follow Emil Kowalski's motion guidance.
- The beat table and caption-as-text-equivalent discipline mirror `scrollytelling`'s scene table in this plugin.
