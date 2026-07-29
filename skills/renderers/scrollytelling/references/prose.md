# Prose pass — what is different about scene text

Read this in Phase 1 step 2, alongside the `slop-check` pass, before you present the draft script.

**The pattern list lives in `slop-check`**, in English and Spanish, and that is the pass that runs.
This file is the scrollytelling-specific part: why scene text attracts these shapes, where they land
hardest in a script, and what to check before the table is presented. It does not restate the
patterns.

## Why a script attracts them

Every scene is a beat, a beat feels like it wants a punchline, and 2–4 sentences is exactly the length
at which a writer reaches for a dramatic reveal instead of a sentence.

The scroll already supplies the drama. The copy does not have to, and copy that tries competes with
the graphic it is supposed to accompany.

## Where they land hardest in a script

| Pattern | Where it shows up |
| --- | --- |
| Throat-clearing, rhetorical setups, faux-insight | Scene 1, where it costs the tension the scene exists to state |
| Fake-profound kicker | The closing scene, reaching for a metaphor instead of paying off scene 1 |
| Summary-recap ending | A final scene that restates the previous six the reader just scrolled through |
| Synonym cycling | The graphic, then the visual, then the diagram. The reader is watching *one* object change state; a second name makes them look for a second object |
| Formatting slop | The visual carries the emphasis here, so bold mid-sentence and emoji in headings compete with the graphic |
| Colon reveals, binary contrasts | Anywhere in a TEXTO cell. At this length they are almost always the sentence that could not be written plainly |

**Em dashes in scene text: none.** In a static prose bridge between scroll sequences, one or two when
they clearly beat a comma or a period. This is the one place the scene format is stricter than the
shared list, which allows one or two in short copy.

The exception, as everywhere: a pattern named in the voice profile's `## Slop-rule overrides` is this
writer's voice, and it stays.

## Do not fight the tone

T4 takes a side, T6 runs on restraint, T2 hedges as the point. Those are choices from
`references/tone-and-goal.md`, not slop. The test is whether the pattern is doing work in this scene
or standing in for work not done.

Nor is the pass licence to add a claim. If a scene reads as puffery because the concrete fact is
missing, ask the user for the number. Do not invent one to make the sentence land.

## The check before presenting

Run this over the scene table, not over the finished HTML — copy is cheap to fix in a table and
expensive to fix in a built article, where a wording change means editing markup and re-running the
viewport matrix.

- [ ] No scene opens with throat-clearing, a rhetorical setup, or a faux-insight frame.
- [ ] No colon reveals or binary contrasts in any TEXTO cell.
- [ ] The closing scene ends on a concrete sentence, not a metaphor or a recap.
- [ ] One name per recurring object across all scenes.
- [ ] No em dashes in scene text.
- [ ] Every number, date, and name in the script came from the user's material.
- [ ] Nothing the voice profile protects was removed.
