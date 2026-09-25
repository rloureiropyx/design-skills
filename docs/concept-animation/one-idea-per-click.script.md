# Beat Table — One Idea per Click

**Goal:** Explain how the skill works
**Source of truth:** `skills/renderers/concept-animation/SKILL.md` — steps 1 to 5, and the two drawing rules in step 4.
**Audience:** Product designers who want an animated explainer and have not seen this engine.
**Payoff:** The reader can name the loop (source, beats, end state, look) and the two drawing rules (draw the object, put the verb on the wire).
**Length:** Two slides, eight beats, about 12 seconds of motion.
**Left out:** scaffolding, the engine API, zoom into a detail, MP4 export. They are in the skill's references, and none of them changes how a reader judges an explainer.

## Slide 1 — An explainer is one idea per click.

| # | name | viewer understands | draws / moves | caption (text equivalent) | ms |
| --- | --- | --- | --- | --- | --- |
| 1 | source | It starts from something already decided. | A page draws on, labelled `PITCH.md`. | Start from the source of truth, such as a PITCH.md. Every label on the slide must trace to a line in it. | 1100 |
| 2 | beats | The source is split into ordered ideas. | A wire draws on with the verb "Split"; a scrap travels; a table settles and its four rows arrive one at a time. | Split it into a beat table: one idea per click, in causal order, each with a caption that doubles as the screen-reader text. | 1800 |
| 3 | end state | Each beat is drawn finished before it is animated. | A second wire, "Lay out"; a sheet travels; a 16:9 stage draws on with a small avatar, a curve and a folder. | Lay out each beat as a finished diagram first. Static mode, reduced motion and going back show only end states. | 1800 |
| 4 | verify | It is not done until someone has looked. | The stage glows once; an eye settles; three checks draw on beside `mid`, `end`, `smoke: ok`. | Then look. Render the middle and end of every beat, view each frame, and run the smoke test. | 1600 |

## Slide 2 — Draw the object. Put the verb on the wire.

Marked on the slide as a hypothetical example.

| # | name | viewer understands | draws / moves | caption (text equivalent) | ms |
| --- | --- | --- | --- | --- | --- |
| 1 | boxes | Boxes flatten places and processes into one shape. | Three grey boxes — Chat, Capture, Folder — with arrows between them. | Drawn as three boxes, a place and a process look the same, and the reader has to read every label to tell them apart. | 1300 |
| 2 | objects | Real objects read before their labels. | A dashed divider; a chat window with a question bubble and grey answer bars; a folder labelled `project/`. | Drawn as the objects they are, a chat window and a folder, the parts read before any label does. | 1300 |
| 3 | verb | The action is the connector. | A wire draws from chat to folder; the verb "Capture" settles above it and the `/capture` chip sits mid-wire. | The action is not a box. It is the wire itself, labelled with a verb, with the tool that performs it in the middle. | 1100 |
| 4 | travel | Motion has a physical meaning. | A scrap travels to the chip; a sheet leaves it and drops into the folder, which gains a sheet and glows once; `learned.md` persists below. | Raw content goes in as a scrap, comes out of the tool as a sheet, and drops into the folder as learned.md. | 2100 |

## Colour roles

One meaning each, for both slides. No key: the objects carry the meaning.

| Role | Meaning here |
| --- | --- |
| grey (`external`) | the source, raw content, the first draft |
| blue (`action`) | the skill's work and the tool on the wire |
| indigo (`agent`) | the LLM chat |
| orange (`core`) | the result: the stage and what is drawn on it, the folder |
| green (`actor`) | a check that passed |

## Checks

- Every beat has a caption; the smoke test fails otherwise.
- Every end state was viewed in motion, `?static` and `?reduced`.
- No invented content inside objects: answer text is grey bars.
- No characters outside the latin font subset.
