# Deck structure

Read before writing the slide table in Phase 1 step 2.

`pitch` decided what is claimed and in what order. This file is about the second question only: how
many slides a beat earns, what shape each one takes, and how much fits on it.

---

## Mapping beats onto slides

**A deck splits where a scroll article merges.** That is the difference between the two renderers and
it comes from how each is consumed. A scroll reader gets one continuous surface, so a beat without a
visual change wastes a scroll. A deck audience gets a fresh surface every time, so a build on the same
visual is a perfectly good second slide — it costs nothing and it controls when each piece lands.

| Beat shape | Slides it earns |
| --- | --- |
| One claim, one piece of evidence | 1 |
| One claim, evidence that arrives in stages | 1 per stage, same layout, same title |
| One claim, three independent pieces of evidence | 3, each with its own sub-claim title |
| A comparison of two or three options | 1 if the table fits, otherwise 1 per option plus 1 summary |
| A transition in the spine ("and then it broke") | 1, minimal, no body |

**Never merge two beats into one slide.** In a scroll article that is the merge rule; here it produces
the crowded slide this skill exists to prevent. If two beats really are the same idea, that is a
finding for `pitch`, not something to fix by stacking them.

**The build rule.** When a beat earns several slides for the same visual, the title stays identical
across them and only the body advances. A changing title on an unchanging visual reads as three
unrelated claims.

---

## The deck skeleton

Six positions. Not all decks use all of them, and the middle is where the beats go.

| Position | What it does | Slides |
| --- | --- | --- |
| **Title** | Names the piece and the presenter. Nothing else. | 1 |
| **The tension** | The pitch's first beat. The question the deck answers, or the problem as it stands. | 1–2 |
| **The turn** | What changed, was found, or was decided. Usually the pitch's spine turn. | 1 |
| **The evidence** | The bulk of the beats, in pitch order. | 5–20 |
| **The payoff** | What is now true, or what is being asked for. The pitch's last beat. | 1 |
| **Backup** | Detail someone will ask for. After the payoff, not before it. | 0–n |

**The tension goes near the front, not after the context.** A deck that opens with fifteen slides of
background loses the room before it makes its point. Background that is genuinely needed goes in
backup, or in one slide immediately after the tension.

**Backup slides are not padding and are not hidden.** They exist so the main line can stay short.
Mark them in the table; the presenter should know they are there.

---

## Slide archetypes

Pick one per slide and record it in the table. The archetype decides what the renderer builds and how
much text is allowed.

| Archetype | Body | Title still asserts | Notes |
| --- | --- | --- | --- |
| **Statement** | Nothing, or one supporting line | Yes | The turn, the payoff, a section break |
| **Chart** | One chart | Yes — the title says what the chart shows, not what it is | Direct labels, no legend where avoidable |
| **Table** | One table, ≤ 5 rows visible | Yes | More than 5 rows is a handout, not a slide |
| **Image / screenshot** | One image, cropped to the point | Yes | Callout on the part that matters |
| **Diagram** | One diagram, one state | Yes | If it needs a build, use several slides |
| **List** | 3–5 short items, no sub-bullets | Yes | The archetype most likely to be the wrong choice |
| **Quote** | One quote, attributed | Yes — the title says why it matters | For research readouts |
| **Comparison** | 2–3 columns, same rows | Yes — the title states the verdict | Not a neutral matrix; say which one wins |

**The list archetype is the default failure.** When a slide comes out as a list, check whether it is
really three slides, or a table, or one sentence. Lists are correct for genuinely parallel short items
and wrong for almost everything else.

---

## The density budget

Per content slide, at 1920×1080:

- **Title:** one sentence, ideally under 12 words, never wrapping past two lines.
- **Body text:** about 30 words total. A slide over 50 is a document page.
- **List items:** 3–5, one line each, no nesting. Sub-bullets are a sign the slide is two slides.
- **Charts:** one per slide. Two small charts side by side is one comparison, not two charts.
- **Type floor:** 18pt body. If the content only fits below that, the content does not fit.

A deck **sent to be read** gets roughly 50% more body text, because the notes will not be read. It
does not get more slides per beat — it gets denser evidence on the same slides.

**Slide count against the slot:** about one slide per minute talked, two to three per minute for a
fast walkthrough of builds. Report the estimate when presenting the table.

---

## The speaker-notes contract

Notes are written with the slide, in the same table row. Three things go in them:

1. **What the presenter says that the slide does not show.** The reasoning, the caveat, the story
   behind the number.
2. **The transition into the next claim.** One sentence. This is what makes a deck sound like an
   argument rather than a list of slides.
3. **The source for every number on the slide.** Where it came from, and as of when.

Notes are not a script to read aloud and not a transcript of the slide. If the notes repeat the slide,
one of the two is unnecessary.

**Text equivalents live here too.** Every chart, diagram and image gets a sentence in the notes saying
what it shows. That sentence is the accessible alternative and it survives PDF export.

---

## Marking what is not decided

Same convention as the rest of the library:

- `[propuesta]` — a visual or a layout this skill invented because the pitch did not specify it.
- `[falta]` — evidence the pitch listed as open. It renders as a placeholder, never as a number.
- `[redactar]` — a screenshot or figure that has to be scrubbed of real data before rendering.

Nothing marked `[falta]` gets rendered as if it were real. An invented number set in 44pt type
survives every check after this one.
