# Notes — Proposal

```
one-read-one-decision.script.md    the scene-by-scene script
one-read-one-decision.html         the article — standalone, no build step
```

Open [`one-read-one-decision.html`](one-read-one-decision.html) in a browser. No dependencies, no build step. The notes below are the short written version.

## What it does

Assembles the document people read once and then decide on: the problem, the time budget, the chosen direction, the rabbit holes, what is deliberately out, and what is still uncertain.

Everything in it comes from `FRAMED_PROBLEM.md` and `DIRECTIONS.md`. If a sentence cannot be traced to one of those two, it does not belong. Output: `PROPOSAL.md`.

## Who it is not for

- Nothing has been decided yet. Go to `shaping`.
- The problem itself is still in question. Go to `problem-framing`.
- You need wireframes, acceptance criteria, or tickets. Those come after the decision, not before it.

## Why "proposal"

*Shape Up* called this a pitch in 2019. Singer has since moved off the word; the raw ask that arrives *before* framing is the request, and what comes out of shaping is a package.

Neither term travels well outside that method. "Pitch" invites selling, which is the failure mode this document is most prone to — if the case has to be sold, the framing was weak. "Package" means nothing to most readers. **Proposal** is the word people already use for a document that asks for a decision.

The word is not idle in this library. `pitch` is a separate skill here, and it does the opposite job: a proposal goes to one reader who can decline it, and a pitch goes to everyone who was not in the room, after the decision. If you are writing to persuade, you are past this document.

## The parts worth keeping

**The time budget goes above the direction, not below it.** Stated after the solution, it reads as an estimate *of* the solution and the reader judges the solution on its own merits. Stated first, it frames the document as a trade: this much time, spent on this. That is the decision being asked for.

**A rabbit hole is only useful with the decision that contains it.** "This might get complicated" is not a rabbit hole. "We are not doing X; if X turns out to be required, that is a new decision" is.

**"Not this time" is not "never".** Something a reasonable reader would assume is included and is not, written as *"not this time, because…"*. "We are not doing that" ends the conversation and gets quietly reversed later with no record.

**`Still open` is what makes it worth reading.** The risks carried from the frame, the assumptions not yet verified, the parts left for the design phase to decide. A reader who later discovers a surprise that was known now will discount everything the same team writes afterwards. The uncomfortable one is the one worth including.

## What it refuses

The skill will not write a proposal when any of these is missing, and it says which:

| Missing | Why it blocks |
| --- | --- |
| A framed problem | People would commit to a solution without an agreed problem. |
| A selected direction | There is nothing to decide on. |
| A defined time budget | "As long as it takes" is not a decision anyone can make. |
| An unresolved `⚠️` | Writing up an absence turns it into a promise. |

A document that looks decision-ready gets treated as decision-ready, which is why there is no partial version "just to react to".

## Voice, and the prose pass

Step 7 applies the voice profile and then runs one slop pass over the finished prose.

The profile governs sentences only — never a section, an order, or a claim. When a profile rule would
make the document read as advocacy, the document wins. This is the one artifact in the library whose
job is to be un-sold, and voice is the door selling comes back through.

The slop pass earns its place here for the same reason. In most writing an AI-slop pass is a style
concern; here it is a traceability one. "Marks a pivotal moment", "research shows", "significantly
faster", and trailing clauses like "reducing friction across the experience" are sentences that trace
back to neither the frame nor the directions document. They are also how a proposal starts selling
without anyone deciding to sell — a concrete version of what the skill's anti-patterns already forbid
in the abstract.

The pass does not make the writing tidy. "From four screens to one" survives it unchanged; "improves
the approval experience" is what that sentence becomes if it is edited for tone instead. Where a line
reads as puffery because the number is missing, the number goes back to the frame or into `Still
open` — it does not get invented.

Neither pass may add, remove, or soften a claim. When one wants to, that is a finding about the
proposal, not about the prose.

The patterns live in the [`slop-check`](../slop-check/) utility, so `proposal`, `scrollytelling`, and
anything added later edit against one list and one set of profile overrides. The skill keeps a short
addendum of its own for what this document is stricter about: vague quantities, urgency language,
unattributed claims, and calling the same thing four names. The list is condensed from Peter Yang's
[`no-ai-slop`](https://github.com/petergyang/no-ai-slop) (MIT).

## Where it stops

Inputs: `FRAMED_PROBLEM.md` and `DIRECTIONS.md`. Output: `PROPOSAL.md`.

- Skill: [`skills/artifacts/proposal/SKILL.md`](../../skills/artifacts/proposal/SKILL.md)

---

**Rendering.** Checked at nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled. Least clearance: 47px at 667×375.
