# The directions board

Read this before drawing any of this skill's work on a canvas — an options board, a set of direction wireframes, an alternatives table, or a fit check.

The renderer owns the drawing. This file owns two things it must not improvise: **what the marks mean** and **where things go**.

## Colour

Four colours, one meaning each, across the whole board.

| Colour | Means | Used on |
| --- | --- | --- |
| green | this supports the option — it holds up, it is cheaper, it already exists | notes beside an option, `✅` cells |
| red | this costs you something — it fails, it is slower, it adds a moving part | notes beside an option, `❌` cells |
| amber | pending or not understood — a `⚠️` part, an `Undecided` status | flags, statuses |
| violet | the decision, and nothing else | the `★` on a selected cell, the selection column, the selected direction |

A positive note is **green**, never violet. Violet on a board that also uses it for positives stops marking the decision, which is the one thing a reader looks for first.

Left to itself a canvas skill applies its own generic palette, where violet reads as *insight or opportunity* — so a supporting note gets drawn in the one colour this method reserves for the decision. Hand the renderer this encoding; do not let it improvise one.

**Annotation markers are grey.** This is where the rule actually breaks in practice: a board with numbered violet circles beside every screen has violet on forty elements and on one selection, and the reader can no longer find the decision by looking. Markers and their badges take the structural grey.

Colour is never the only carrier. Every green note reads as a benefit from its text alone, every red one as a cost, and every selection is marked with `★` as well as violet — the same colour-independence rule this skill writes as a requirement at step 3 applies to its own artifacts.

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

## Layout

Where things go. This is the arrangement that survives a meeting: someone who arrives late can read the frame titles at zoom-out and get the answer, then zoom into one row for the reasoning.

```
 rationale column      row title      the frames                    annotation gutter
┌──────────────┐   ROW 0 — today  ┌─────────────┐  ①  note      ┌─────────────┐  ①  note
│ How to read  │                  │  current    │  ②  note      │  vendor UI  │  ②  note
│ this board   │                  │  product    │               │  as shipped │
├──────────────┤   ROW 1 — …      ├─────────────┤               ├─────────────┤
│ Requirements │                  │  A2  ★      │  ①  note      │  B1  ✗ R4   │  ①  note
└──────────────┘                  └─────────────┘               └─────────────┘

                   FIT CHECK — R-set v2
```

### Row bands, one per decision

Most shaping work carries more than one decision, and they are usually independent — any entry point works with any shell. Bundling them is how the conversation goes wrong, so give each decision its own row and **say in the row title that they are independent**.

The row title sits on the far left, outside the frames, at the largest type size on the board, in structural grey. It names the decision and the outcome: `ROW 2 — Arrival mode: tab vs window`.

### Row 0 is evidence, never proposal

The top row is always **what exists today**: the current product, and — when the work sits on top of one — the vendor's UI exactly as the vendor ships it. Nothing in row 0 is a proposal, and the row title says so.

This row does three jobs at once, which is why it is not optional:

- it makes the fixed surfaces visible instead of asserted;
- it is the baseline every direction below is read against;
- it is what stops a reader mistaking existing chrome for something being proposed.

### The frame grid

Frames at real viewport size, from the product surface recorded at step 2 — not a convenient size.

| Case | Frame | Column pitch | Row pitch |
| --- | --- | --- | --- |
| Desktop | 1440 × 900 | 2100 | 1200 |
| Wide desktop | 1920 × 900 | 2580 | 1200 |
| Tablet | 768 × 1024 | 1428 | 1324 |
| Mobile | 390 × 844 | 1050 | 1144 |

The pitch is frame width **+ 660**: 380 for the annotation gutter, 48 to hold it off the frame edge, and the rest as separation so two adjacent screens never read as one. Row pitch is frame height + 300, which leaves room for the row title and keeps annotation columns from colliding vertically.

### The verdict goes in the frame name

A frame name carries four things, in this order: the direction letter and version, a one-line mechanism, and the verdict.

```
DEPARTURE A2 — launch card, entitled          ★ SELECTED
DEPARTURE B1 — app, not tab                   ✗ fails R1, R6
SHELL G1 — vendor rail + our identity + cap   ★ SELECTED
```

At zoom-out the frame titles alone are the summary. A board whose titles read `Option 1`, `Option 2`, `Option 3` forces every reader to zoom into every frame to find out what happened.

### The annotation gutter

380px wide, 48px off the frame edge, on the side the target is already on. Numbered badge on the element, same number opening the note, **both in grey**.

This deliberately overrides `tldraw-skill/references/craft.md` §10.2, which sizes annotations as 200px stickies in a 120px gutter. That recipe is for one-line notes. A directions board's notes are design rationale in sentences — *"a delegate sees an empty queue here, because the scope is the signed-in user"* — and 200px is unreadable for a paragraph. Take the width and the colour from here; take the badge placement slots, the connector rule, and the "a note goes on the side its target is on" rule from §10.2, which owns them.

The column pitch above assumes annotations on **one** side. When both gutters are in use, take §10.2's wider pitch instead.

Notes carry the behaviour the drawing cannot: what a role with fewer rights sees, what happens when the upstream system is stale, which requirement this element exists to satisfy.

### The rationale column

Left of the whole board, before row 0. Cards ~724px wide with a text measure around 660. Two cards, always, in this order.

**1 · How to read this board.** Five things, and the board is misread without any one of them:

- the fidelity, and what it therefore is not — *"L2 wireframes for a shaping conversation. Structural arguments about where things go, not a visual spec. Argue with the structure, not the pixels."*
- what row 0 is, in those words: evidence, not proposal;
- which decisions are independent, and the warning that deciding them as a bundle is how this goes wrong;
- the lo-fi grammar legend — solid grey bar = a line of copy, outlined rectangle = an interactive control, crossed box = chart or media, one accent = the primary action;
- the frame's confidence caveat, quoted from `FRAMED_PROBLEM.md`. If the central assumption has no user evidence under it, that sentence belongs on the board, because a room full of drawings will otherwise treat it as settled.

**2 · The requirements the screens are judged against.** The full list with its `R-set` version, in the same numbering the frame titles cite.

### The fit check sits below everything

One matrix per decision, beneath the last row, each stamped with the R-set version it ran against. A superseded matrix stays, dimmed and marked stale, beside the current one.

### Legibility

The complaint that produces a rebuild is always the same one: the lines are too long.

- **No text column past a ~660px measure.** Wider is unreadable regardless of the size.
- **Compute the wrap, do not eyeball it.** Derive characters-per-line from the column width and the renderer's measured character width, then set the height from the resulting line count. `tldraw-skill/references/craft.md` §2 has the measured metrics and the `growY` pass.
- **A card's height comes from its content**, never from a round number someone picked. A fixed height is how text ends up clipped at the one zoom level nobody checked.

## Before you hand it to a renderer

- Every note is green or red, and reads as a benefit or a cost without its colour.
- Annotation markers and badges are grey. Violet appears only on the selection.
- Rows are separated by a rule; each row is one decision, and independent decisions say so.
- Row 0 is what exists today, labelled as evidence.
- Frames are at real viewport size, on the pitch above, with the verdict in the name.
- The rationale column leads with how to read the board and the requirement list.
- The fit check carries its R-set version, and superseded matrices are dimmed rather than deleted.
- Selections are `★`, violet, and all in the same column.
- The picks are collected in one block with the criterion for each.
- Iteration bands are closed with a vertical rule and run left to right, with decisions recorded in each.
- Nothing from an earlier iteration was moved, edited, or removed.
- No text column runs past a ~660px measure, and no height was guessed.
