# Prose pass — what is different about a beat

Read this before step 2, and again alongside the `slop-check` pass in step 4.

**The pattern list lives in `slop-check`**, in English and Spanish, and that is the pass that runs.
This file is the beat-specific part: why a one-sentence claim attracts these shapes, where they land
hardest, and what to check before the table is presented. It does not restate the patterns.

## Why a beat attracts them

Every beat is a claim, a claim feels like it wants a punchline, and one to three sentences is exactly
the length at which a writer reaches for a dramatic reveal instead of a sentence.

The medium already supplies the drama — the scroll, the build, the speaker's pause. The copy does not
have to, and copy that tries competes with the thing it is supposed to accompany.

The other pressure is specific to this format: a claim that has no evidence behind it will reach for
a rhetorical shape to sound like it does. Puffery is usually a missing number wearing a costume.

## Where they land hardest

| Pattern | Where it shows up |
| --- | --- |
| Throat-clearing, rhetorical setups, faux-insight | Beat 1, where it costs the tension the beat exists to state |
| Fake-profound kicker | The closing beat, reaching for a metaphor instead of paying off beat 1 |
| Summary-recap ending | A final beat that restates the previous six |
| Importance puffery | Any beat whose EVIDENCE field is thin. The sentence inflates to cover the gap |
| Synonym cycling | The graphic, then the visual, then the diagram. The reader is tracking *one* object; a second name makes them look for a second object |
| Formatting slop | The visual carries the emphasis in every renderer here, so bold mid-sentence and emoji compete with it |
| Colon reveals, binary contrasts | Any CLAIM. At this length they are almost always the sentence that could not be written plainly |
| Topic labels | Not a slop pattern, but caught by the same read: "Background", "Our approach". A label is a beat that has not been written |

**Em dashes in a claim: none.** In the EVIDENCE field, one or two when they clearly beat a comma or a
period. This is the one place the format is stricter than the shared list, which allows one or two in
short copy.

The exception, as everywhere: a pattern named in the voice profile's `## Slop-rule overrides` is this
writer's voice, and it stays.

## Do not fight the tone

T4 takes a side, T6 runs on restraint, T2 hedges as the point. Those are choices from
`references/tone-and-goal.md`, not slop. The test is whether the pattern is doing work in this beat or
standing in for work not done.

Nor is the pass licence to add a claim. If a beat reads as puffery because the concrete fact is
missing, ask the user for the number. Do not invent one to make the sentence land — a fabricated
figure survives every downstream check, because nothing downstream knows it was invented.

## The check before presenting

Run this over the beat table, not over a rendered article or deck. Copy is cheap to fix in a table
and expensive to fix in built output, where a wording change means editing markup or a Figma node and
re-running that renderer's checks.

- [ ] Every CLAIM is a complete sentence that asserts something, not a topic label.
- [ ] Every CLAIM is falsifiable — someone could disagree with it.
- [ ] No beat opens with throat-clearing, a rhetorical setup, or a faux-insight frame.
- [ ] No colon reveals or binary contrasts in any CLAIM.
- [ ] The closing beat ends on a concrete sentence, not a metaphor or a recap.
- [ ] One name per recurring object across all beats.
- [ ] No em dashes in a CLAIM.
- [ ] Every number, date, and name came from the user's material or a carried document, or is marked `[propuesta]`.
- [ ] Nothing the voice profile protects was removed.
