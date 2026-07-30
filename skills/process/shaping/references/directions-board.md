# The directions board

Read this before drawing any of this skill's work on a canvas — an options board, an alternatives table, or a fit check.

The renderer owns the drawing. This file owns what the marks mean. Left to itself a canvas skill applies its own generic palette, and the usual casualty is violet: in a generic palette violet reads as *insight or opportunity*, so a supporting note gets drawn in the one colour this method reserves for the decision. Hand the renderer this encoding; do not let it improvise one.

## Colour

Four colours, one meaning each, across the whole board.

| Colour | Means | Used on |
| --- | --- | --- |
| green | this supports the option — it holds up, it is cheaper, it already exists | notes beside an option, `✅` cells |
| red | this costs you something — it fails, it is slower, it adds a moving part | notes beside an option, `❌` cells |
| amber | pending or not understood — a `⚠️` part, an `Undecided` status | flags, statuses |
| violet | the decision, and nothing else | the `★` on a selected cell, the selection column, the selected direction |

A positive note is **green**, never violet. Violet on a board that also uses it for positives stops marking the decision, which is the one thing a reader looks for first.

Colour is never the only carrier. Every green note reads as a benefit from its text alone, every red one as a cost, and every selection is marked with `★` as well as violet — the same colour-independence rule this skill writes as a requirement at step 2 applies to its own artifacts.

## Rows

Draw a hairline rule between rows, full width, in the structural grey. Without it a reader tracks across a row by eye alignment alone and picks up a note that belongs to the row above — the failure gets worse with every option column added.

The rule is structure, not content: keep it thinner and lighter than any node stroke, and do not let it carry a colour from the table above.

## The selection column

Every row ends in the same column, and that column holds the option selected for that row, marked `★`. Reading straight down it gives the assembled answer in one pass, without tracing a different horizontal position on every row.

Beside or beneath it, collect the picks in one block: one line per row, naming the option chosen and the criterion that decided it. That block is the thing people quote in the next meeting.

**This only applies where rows have per-row winners** — parts with alternatives (`C3-A` / `C3-B`, pick one per part), or dimensions with candidate treatments. The collected `★` set is then a version of one direction, and it gets a version number (`C4`) like any other.

**Never put a `★` on a fit-check row.** There, rows are requirements and columns are whole directions; the best cell per requirement is not a thing you can build, and starring one produces a composite nobody has costed. The fit check stays binary, and the selection happens once, at the column level, on a whole direction. If a board tempts you to star per row, check which board you are on before you draw it.

## Iterations run left to right

The board is never redrawn. When an iteration is finished, close it with a full-height vertical rule at its right edge, then start the next one to the right of that rule. The board grows sideways as a timeline.

Each closed band keeps, inside it: the options as they stood, their notes, the `★` selections, and — at the foot of the band — the decisions taken in that iteration and what they were fixing. That is the same record `references/version-lineage.md` requires in the document, drawn.

```
│  iteration 1        │  iteration 2        │  iteration 3
│  ─────────────────  │  ─────────────────  │  ─────────────────
│  row A   ★ A-2      │  row A   ★ A-2      │  row A   ★ A-4
│  ─────────────────  │  ─────────────────  │  ─────────────────
│  row B   ★ B-1      │  row B   ★ B-3      │  row B   ★ B-3
│  ─────────────────  │  ─────────────────  │  ─────────────────
│  decided: …         │  decided: …         │  decided: …
│  because: …         │  because: …         │  because: …
```

A superseded band is dimmed, never deleted, and never edited in place. Six weeks later "we decided against it" and "we forgot" look identical on a board that only shows its current state.

If the board runs out of horizontal room, that is information: three iterations that each fixed a named failure is a healthy record, nine is a sign the requirements are moving under the work. Say so rather than shrinking the bands.

## Before you hand it to a renderer

- Every note is green or red, and reads as a benefit or a cost without its colour.
- Rows are separated by a rule.
- Selections are `★`, violet, and all in the same column.
- The picks are collected in one block with the criterion for each.
- Iteration bands are closed with a vertical rule and run left to right, with decisions recorded in each.
- Nothing from an earlier iteration was moved, edited, or removed.
