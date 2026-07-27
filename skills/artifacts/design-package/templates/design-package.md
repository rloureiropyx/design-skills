# DESIGN_PACKAGE.md structure

Read this at step 7, when writing the artifact. Use the exact top-level headings below so a reader can find the same thing in the same place across every package the team produces.

Write in the user's language. Save it beside `FRAMED_PROBLEM.md` and `SHAPING.md`: the project's documentation directory when one exists, the project root otherwise. Update this same file if the bet is revised — one current source of truth, never a second copy.

```markdown
# Design Package: <working title>

## The decision being asked for
One sentence: bet this appetite on this shape, or do not. Name who decides.

## Appetite
The fixed build time the business has chosen to invest, and where the number came from. This is a constraint on the solution, not an estimate of it.

## Problem
Carried from `FRAMED_PROBLEM.md`. What breaks, for whom, in what moment, and what it costs. Two or three attributed observations, not a research summary. Link the frame.

## Outcome
Carried from the frame: the observable change that means this worked.

## Shape
The selected shape at the resolution it was shaped at — the mechanism, and its parts as things a person can experience. Include an existing sketch or diagram if one exists; do not create new design work here.

| Part | What it does for whom |
| --- | --- |

## Rabbit holes
Each known way this could overrun, and the decision that contains it. Resolved ones say what the spike found.

| Rabbit hole | Decision that contains it |
| --- | --- |

## No-gos
What is explicitly out of this bet, each with its reason. Phrased "not in this bet, because …" — never "not ever".

## Still open
Risks carried from the frame, assumptions not yet verified, and the decisions deliberately left to Design. Nothing known to be uncertain may appear as settled anywhere above.

## Enterprise checks
Where they apply: roles and permission changes, what becomes auditable, systems of record depended on, operational load, accessibility commitments included in the bet, and who outside the team must agree before this ships.

## Sources
Links to `FRAMED_PROBLEM.md`, `SHAPING.md`, and any spike files. State that the problem and shape are carried from those documents, not re-decided here.

## Decision
Filled in after the meeting: what was decided, by whom, when, and any condition attached.
```

## Why the structure is fixed

The order is the argument. Appetite before shape, so the reader judges a trade rather than a wish list. Rabbit holes and no-gos before "still open", so the boundaries are visible before the uncertainties. `Still open` near the end, where a reader who has understood the bet can weigh it — not buried where it reads as a disclaimer.

`DESIGN_PACKAGE.md` is the record of what was promised. When the build discovers that the shape was wrong, this is the document that says what everyone thought they were agreeing to, which is what makes the correction a decision instead of an argument.
