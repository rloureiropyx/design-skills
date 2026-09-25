# Drawing idioms

Read before step 4, when a slide needs connectors, a merge, a tool on a wire, or a zoom into a detail. The API for every call named here is in `primitives.md`.

## Objects before labels

Pick the object from what the thing is, not from what it does:

| Concept | Draw it as | Call |
| --- | --- | --- |
| A file or document | A page with a folded corner | `Objects.doc`, `Objects.fileRow` |
| A collection of files, a repo | A folder with sheets peeking out | `Objects.folder` |
| An LLM session or chat tool | A chat window with a question bubble | `Objects.chatWindow`, `Objects.userBubble`, `Objects.answerBars` |
| A person or role | An avatar | `Objects.avatar`, `Draw.personGlyph` |
| A group of people counted | A grid of dots with a mask | `Objects.peopleGrid` |
| A human approval | A stamp that lands | `Objects.stamp`, `Objects.signature` |
| A command or skill | A `/chip` | `Objects.command` |
| A decision point in time | A diamond on a timeline | `Objects.diamond` |
| An assumption or caveat | A pinned note | `Objects.note` |
| A missed path | A drawn X | `Objects.crossMark` |
| A grouping or abstraction | A box | `Draw.box` |

When no object fits, build one with `Objects.shape(ctx, pathFn, len, p, …)` so it keeps the draw-on grammar. Once objects carry the meaning, drop the colour key.

## Actions on the connectors

A process is the wire, not a box between wires:

1. Draw the wire with `Draw.line` over a `Draw.curve` path.
2. Put the verb above it as a heading-style label in the tool's colour ("Capture", "Retrieve").
3. Put the tool that performs it mid-wire: `Objects.command(ctx, x, y, 'skill-name', col, p)`.
4. Let the token change form as it passes the tool: `Objects.scrapGlyph` on the way in, `Objects.sheetGlyph` on the way out. Split the path at the chip and run two tokens, the second starting as the first arrives.
5. Let the result land physically: animate a folder's `sheets` up by one as the sheet arrives, or persist a `Draw.chip` naming the file.

## Wires flow

- `Draw.curve(a, b, {from: 'h', to: 'h', bend})` for most connectors. Use `'v'` at an end that leaves or enters vertically.
- When several wires feed one target, merge them tangentially into a shared trunk (on-ramp curves ending horizontal at the trunk's y) and join with `Draw.joinPaths` so a token can travel drop, curve and trunk in one move. A rigid bus or a single convergence point bundles into a braid.
- Arrowheads only on the last segment into the target (`arrowEnd: true`).

## Zoom into a detail

Use when a connector or layer hides a process worth explaining. At most once per slide.

1. On the overview, mark a section line ("A–A") across the element and draw a small callout with its cross-section.
2. In one beat, move the camera: translate, scale exponentially, and rotate only if the detail should read left to right. Clip below the header.
3. Crossfade the overview out and the enlarged detail in as the callout becomes the full stage.
4. Leave a thumbnail inset of the overview with the section marked, so the end state still says where you are.
5. Make the overview's texture the seed of the detail (a honeycomb coating whose cells become the checks in the ring) so the zoom reads as continuous.
6. Spend one beat per step inside the detail.

Under a camera transform, sweep filled circles `0..2π`. See the arc constraint in `SKILL.md`.

## Problem before solution

- Problem slides use `color.ink`, `color.muted` and the `external` role only. The solution's role colour enters on the first solution slide.
- Label hypothetical scenarios ("A hypothetical example") and illustrative quantities ("Illustrative, not measured") on the stage, not only in the notes.
- Reuse one scenario and one recurring diagram (a timeline, a branch graph) across the sequence. Put shared builders in a non-slide file such as `slides/kit.js`, loaded before the slides.
