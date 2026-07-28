# PROPOSAL.md structure

Read this at step 7, when writing the document. Use the top-level headings below exactly, so a reader finds the same thing in the same place across every proposal the team writes.

Write in the user's language. Save it beside `FRAMED_PROBLEM.md` and `DIRECTIONS.md`: the project's documentation directory when one exists, the project root otherwise. Update this same file if the decision is revised — one current source of truth, never a second copy.

```markdown
# Proposal: <working title>

## The decision being asked for
One sentence: spend this much time on this direction, or do not. Name who decides.

## Time budget
The fixed build time the business has chosen to invest, and where the number came from. This is a constraint on the solution, not an estimate of it.

## Problem
Carried from `FRAMED_PROBLEM.md`. What breaks, for whom, in what moment, and what it costs. Two or three attributed observations, not a research summary. Link the frame.

## Outcome
Carried from the frame: the observable change that means this worked.

## Direction
The selected direction at the resolution it was worked out at — the mechanism, and its parts as things a person can experience. Include an existing breadboard, sketch, or diagram if there is one; do not create new design work here.

| Part | What it does for whom |
| --- | --- |

## Rabbit holes
Each known way this could overrun, and the decision that contains it. Resolved ones say what the spike found.

| Rabbit hole | Decision that contains it |
| --- | --- |

## Not this time
What is explicitly out, each with its reason. Phrased "not this time, because …" — never "not ever".

## Still open
Risks carried from the frame, assumptions not yet verified, and the decisions deliberately left to Design. Nothing known to be uncertain may appear as settled anywhere above.

## Enterprise checks
Where they apply: roles and permission changes, what becomes auditable, systems of record depended on, operational load, accessibility commitments included in this work, and who outside the team must agree before it ships.

## Sources
Links to `FRAMED_PROBLEM.md`, `DIRECTIONS.md`, and any spike files. State that the problem and the direction are carried from those documents, not re-decided here.

## Decision
Filled in afterwards: what was decided, by whom, when, and any condition attached.
```

## Why the order is fixed

The order is the argument. Time budget before direction, so the reader judges a trade rather than a wish list. Rabbit holes and exclusions before "still open", so the boundaries are visible before the uncertainties. "Still open" near the end, where someone who has understood the proposal can weigh it — not buried where it reads as a disclaimer.

`PROPOSAL.md` is the record of what was promised. When the build discovers the direction was wrong, this is the document that says what everyone thought they were agreeing to, which is what makes the correction a decision instead of an argument.
