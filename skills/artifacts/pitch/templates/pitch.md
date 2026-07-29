# `PITCH.md` structure

Read this at step 2, for the beat table, and again at step 5 before saving.

**Where it goes.** Into the project: the documentation directory when one exists, the project root
otherwise, beside `FRAMED_PROBLEM.md`. Renderers read it from there.

**When not to write it at all.** On the fast path — a renderer called this skill inline because no
pitch existed — offer the file in one line and take no for an answer. A project with one article does
not need one. A project where a deck and an article tell the same story does.

---

## The structure

````markdown
# Pitch — [what this communicates]

**Audience:** [a role, and what they already know]
**Deliverable:** [article | deck | both | undecided] — beat budget [N–N], evidence density [on the page | speaker-supported]
**Goal:** [G# name]
**Tone:** [T# name]
**Voice profile:** [path, or "none — drafted without one"]

## Carried from

- `PROPOSAL.md` — [what is being carried: the chosen direction, the time budget, the no-gos]
- `DIRECTIONS.md` — [the discarded directions and why, if the pitch mentions them]
- `FRAMED_PROBLEM.md` — [the problem statement, verbatim reference not a paraphrase]

Nothing in the beats contradicts these. If something does, it goes back to the source document
rather than being resolved here.

## The spine

Three or four lines. The tension the piece opens on, the turn in the middle, and what the reader is
left holding. This is what the beats are judged against — a beat that does not move along the spine
is decoration.

## Beats

| # | CLAIM | EVIDENCE | SHOW | WHY HERE |
| --- | --- | --- | --- | --- |
| B1 | One complete sentence asserting something. | What backs it. | What must be visible. | What breaks if this is cut. |
| B2 | … | … | … | … |

## Deliberately out

What a reader will expect and not get, and why. One line each.

- [thing] — [why it is out]

A renderer that does not know what was excluded will helpfully reintroduce it.

## Open

Anything still unverified, unmarked, or waiting on someone. Beats carrying `[propuesta]` material are
listed here so they are not rendered as settled.

## Revisions

- [date] — [what changed and why]
````

---

## Rules for filling it in

**The CLAIM field is a sentence, always.** "Adoption" is not a claim. "Three of the five teams stopped
using the exports within a month" is. A claim you cannot disagree with is throat-clearing; cut it.

**The EVIDENCE field names something that exists.** A number, a quote with an attribution, a
screenshot, a link, a demo. When it does not exist yet, write what it would be and mark the beat
`[propuesta]` — then list the beat under `## Open`.

**The SHOW field says what, never how.** "The approval chain, with the second reviewer removed" is
usable by both renderers. "A sticky SVG that fades the second node out on scroll" has already decided
the medium and is wrong here.

**The WHY HERE field is the padding test.** If you cannot write it, the beat is decoration and it
should be cut before anyone renders it. This is the single field most likely to be quietly skipped
and the one that keeps a strong six from becoming a weak twelve.

**Renumber nothing.** Beats keep their IDs when others are cut, so a renderer's plan and a review
comment still point at the same thing. `B1, B2, B4, B5` is fine and informative.

**Carried facts are referenced, not restated.** Point at the source document. A paraphrase creates a
second version of a fact that will drift.
