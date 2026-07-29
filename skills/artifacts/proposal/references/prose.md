# Prose pass — the sentences a proposal cannot afford

Read this at step 7, with `templates/proposal.md`, before writing `PROPOSAL.md`.

**The pattern list lives in `slop-check`**, in English and Spanish, and that is the pass that runs.
This file is the proposal-specific part: why the same patterns are a different kind of problem here,
what this document adds to the list, and what to check before presenting. It does not restate the
patterns.

## Here it is a traceability problem, not a style one

This document carries decisions someone else made, and every sentence is supposed to trace to a line
in `FRAMED_PROBLEM.md` or `DIRECTIONS.md`. The named patterns are how a sentence stops tracing to
anything: puffery instead of a fact, an attribution instead of a source, a consequence invented to
make a paragraph land.

They are also how a proposal starts selling without anyone deciding to sell. That is the failure this
document exists to avoid, which is why the pass runs even when the prose reads fine.

Apply it to the document, the section headings, and the message you present it with.

## What this document adds to the shared list

**Vague quantities.** "significantly faster", "a large number of customers", "most of the time".
Every one of these had a number upstream or it did not. If it did, use it. If it did not, say what is
unknown and put it under `Still open`.

**Urgency language.** "critical", "urgent", "must-have", "we cannot afford to wait". It belongs to the
frame's evidence or nowhere. Written here it is the selling this document is most prone to.

**Unattributed claims about users, the market, or the business.** The frame carries attributed
observations. Use those, with who said it, or cut the claim. An unattributed claim in a proposal is a
fact that was never framed.

**Vocabulary drift.** The direction, then the approach, then the solution, then the concept. A reader
deciding on one thing will assume four names mean four things, and will ask which one they are
approving. Use the repo's words — *direction*, *version*, *time budget* — and repeat them.

**Em dashes: one or two in the whole document**, and only where they clearly beat a comma or a period.
Stricter than the shared list, unless the voice profile says otherwise.

## Three things the pass must not do here

**Do not flatten the honesty.** "We do not know whether the export volume holds at 50k rows" is a good
sentence. Hedges that mark real uncertainty stay; hedges that avoid committing to something already
decided go.

**Do not smooth a specific fact into a general one.** "Cuts the approval step from four screens to
one" survives the pass unchanged. "Improves the approval experience" is what it becomes if you edit
for tone instead of for slop.

**Do not add a claim to fix a flat sentence.** If a line reads as puffery because the number is
missing, go back to the frame or the directions document. If it is not there, it was never
established and it does not go in.

## The check before presenting

- [ ] Every sentence traces to `FRAMED_PROBLEM.md`, `DIRECTIONS.md`, or a decision made while
      assembling. No sentence exists only to make a paragraph land.
- [ ] No unattributed claim about users, the market, or the business.
- [ ] Every quantity is a number or is named as unknown under `Still open`.
- [ ] One name per recurring thing, using the repo's vocabulary.
- [ ] No urgency language, no superlatives, nothing from the banned list.
- [ ] The document ends on the decision being asked for.
