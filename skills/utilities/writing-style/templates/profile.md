# `WRITING_STYLE.md` structure

Read this before saving, at step 5.

**Where it goes.** Default to `~/.copilot/writing-style/WRITING_STYLE.md` — the user's own voice,
available in every project, and untouched by `copilot plugin update`. Save to the project instead
only when the user asked for a project or client voice: the documentation directory when one exists,
the project root otherwise, beside `FRAMED_PROBLEM.md`.

Never write it inside the installed skill directory. That directory is replaced on update.

**How long.** About 120 lines. Instruction files past roughly 200 lines reduce adherence, so a longer
profile produces less consistent voice, not more. Adding a rule to a full profile means replacing
one.

---

## The structure

````markdown
# Writing style — [name or "project/client name"]

Derived from [N] samples on [date]. [One line: what the samples were.]

## Voice

One paragraph. What this writing sounds like, written so someone who has never read it could
recognise it. Name the stance and the register, not the aspirations.

## What the writing is for

Two or three lines, from the three setup questions. What a reader should think, feel, or do — and
what the writer would hate a reader to think. Concrete enough to arbitrate a sentence.

## Signature moves

Three to five. Each one is a rule that can be applied and can be broken, with a line from a sample
under it.

1. **[The move, stated as a rule.]**
   > "[quoted line from a sample]"

2. **[…]**
   > "[…]"

## Do

- [Written as an instruction to whoever is drafting.]
- […]

## Don't

- [Including the absences: what this writer never does.]
- […]

## Measurable defaults

| Feature | Default |
| --- | --- |
| Sentence length | [band, e.g. 8-18 words; how longer ones are built] |
| Person | [first / second / third; when it changes] |
| Contractions | [yes / no / by register] |
| Hedging | [how much, and whether it carries real uncertainty] |
| Em dashes | [none / sparing / frequent and deliberate] |
| Headings | [how many, what case, or none] |
| Bullets | [when prose is better] |
| Concreteness | [where numbers, names, examples are expected] |

## Slop-rule overrides

Patterns a generic editing pass would flag that are, here, the voice. `slop-check` must not report
or remove these.

- [pattern] — [why it is deliberate]
- […]

Or, if there are none: *No overrides. Standard editing rules apply.*

## Language coverage

Samples were in [languages]. For those, apply everything above.

For any other language, apply rhythm, person, hedging, and concreteness; do not carry vocabulary or
idiom across. Say so once in the draft rather than pretending the profile covers it.

## Asserted, not observed

What the writer said they do that the samples do not show. Kept separate on purpose — often this is
where their intent lives, ahead of their current habits, and a later reader needs to know which rules
came from evidence.

- [assertion] — not visible in the samples; [what the samples showed instead, if anything]
- […]

## Revisions

- [date] — [what changed, and what it replaced]
````

---

## Notes on filling it in

- **The `Voice` paragraph is what gets read most.** If a drafting skill loads only one section, it is
  this one. Make it stand alone.
- **`Measurable defaults` is what makes the profile checkable.** "Direct" cannot be verified in a
  draft; "8-18 words" can. Fill in every row or delete it — a row saying "varies" is noise.
- **`Slop-rule overrides` is the load-bearing section.** It is the only thing standing between the
  writer's tics and a pass that removes them.
- **`Asserted, not observed` is never merged upward.** When a later sample shows an assertion is now a
  habit, move it up with its quoted line and note the move under `Revisions`.
- **`Revisions` records replacements, not additions.** It is how the cap holds.
