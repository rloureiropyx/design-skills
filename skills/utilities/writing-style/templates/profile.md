# `WRITING_STYLE.md` structure

Read this before saving, at step 5.

**Where it goes.** Into the project: the documentation directory when one exists, the project root
otherwise, beside `FRAMED_PROBLEM.md`. That is the file every consumer reads.

Then offer to keep a personal copy at `~/.copilot/writing-style/WRITING_STYLE.md`. Its only job is to
save the next project's setup — it is a copy, not a link, and nothing reads it while a project profile
exists. Outside a project, write the personal copy alone.

Never write it inside the installed skill directory. That directory is replaced on update.

**How long.** About 120 lines. Instruction files past roughly 200 lines reduce adherence, so a longer
profile produces less consistent voice, not more. Adding a rule to a full profile means replacing one.

---

## The structure

````markdown
# Writing style — [name or "project/client name"]

Derived from [N samples / a transcript / a two-prompt exercise] on [date]. [One line: what they were.]
[If from a transcript: "Spoken, so no punctuation or formatting rules are observed."]

## Voice

One paragraph. What this writing sounds like, written so someone who has never read it could
recognise it. Describe what the evidence shows, not what the writer is aiming for — that is the next
section.

## Intent

What the writer wants to come across as. Aspiration, not observation. Never applied as a rule unless a
decision below says so.

- **Aiming for:** [adjective] as against [what it was contrasted with]; [adjective] as against […]
- **Would hate a reader to think:** […]
- **A reader should:** [think / feel / do what, from the three questions]

**Where this differs from the evidence.** Each divergence carries the decision the writer made, or a
note that they did not make one.

- [intent] vs [what the samples show] — **drafting rule:** [which one wins] / *no decision; the
  observed habit governs.*

## Signature moves

Three to five. Each one is a rule that can be applied and can be broken, with a line from the evidence
under it.

1. **[The move, stated as a rule.]**
   > "[quoted line]"

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
| Em dashes | [none / sparing / frequent and deliberate — *omit if derived from speech*] |
| Headings | [how many, what case, or none — *omit if derived from speech*] |
| Bullets | [when prose is better — *omit if derived from speech*] |
| Concreteness | [where numbers, names, examples are expected] |

## Slop-rule overrides

Patterns a generic editing pass would flag that are, here, the voice. `slop-check` must not report
or remove these.

- [pattern] — [why it is deliberate]
- […]

Or, if there are none: *No overrides. Standard editing rules apply.*

## Language coverage

Evidence was in [languages]. For those, apply everything above.

For any other language, apply rhythm, person, hedging, and concreteness; do not carry vocabulary or
idiom across. Say so once in the draft rather than pretending the profile covers it.

## Revisions

- [date] — [what changed, and what it replaced]
````

---

## Notes on filling it in

- **The `Voice` paragraph is what gets read most.** If a drafting skill loads only one section, it is
  this one. Make it stand alone, and keep the intent out of it.
- **`Intent` is not applied by default.** It exists so a later reader can see the gap between what the
  writer wants and what they do. Only the drafting rules under *Where this differs* change a draft.
- **`Measurable defaults` is what makes the profile checkable.** "Direct" cannot be verified in a
  draft; "8-18 words" can. Fill in every row or delete it — a row saying "varies" is noise. Delete the
  punctuation, heading, and bullet rows outright when the evidence was spoken: speech has no
  formatting to observe.
- **`Slop-rule overrides` is the load-bearing section.** It is the only thing standing between the
  writer's tics and a pass that removes them.
- **Intent is never merged upward.** When later evidence shows the writer now does what they were
  aiming for, move it into the observed rules with its quoted line and note the move under
  `Revisions`.
- **`Revisions` records replacements, not additions.** It is how the cap holds.
