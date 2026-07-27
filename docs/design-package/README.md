# Explainer — Design Package

**Status:** written explainer. No scrollytelling article yet.

## What the skill is for

A shape has been selected. Now a group of people has to decide whether to spend the time. The design package is the document they read once and then decide on.

It is one document with five things in it: the problem, the appetite, the shape, the rabbit holes, and the no-gos — plus an honest section on what is still open.

## Why it is not called a pitch

Ryan Singer's 2019 *Shape Up* called this a pitch. He has since moved the word: in his current vocabulary a **pitch** is the raw request that arrives *before* framing — somebody's idea, unexamined — and the output of shaping is a **package**, because by then the problem, the ingredients of a solution, and the time to spend have all been brought together in one place.

The rename does real work. "Pitch" invites selling, and selling is the failure mode this document is most prone to. If the case has to be sold, the framing was weak, and no amount of writing here fixes it.

We call it a *design package* to keep that distinction while making it obvious, in an enterprise setting, which discipline produced it.

## Why the appetite goes first

The appetite is stated above the shape, not below it.

An appetite mentioned after the solution reads as an estimate *of* the solution, and the reader judges the solution on its merits. An appetite stated first frames the whole document as a trade: this much time, spent on this. That is the decision actually being asked for.

## Rabbit holes and no-gos

A **rabbit hole** is a detail that could swallow the time — and it is only worth listing when it comes with the decision that contains it. "This might get complicated" is not useful. "We are not doing X; if X turns out to be required, that is a new bet" is.

A **no-go** is something a reasonable reader would assume is included and is not. Each one is written as *"not in this bet, because …"* — never as a permanent verdict. "We are not doing that" ends the conversation and gets quietly reversed later without a record.

## The section that makes it trustworthy

`Still open` — the risks carried from the frame, the assumptions not yet verified, and the parts deliberately left for Design to decide.

This is what separates a package from a sales pitch. A reader who discovers a surprise later that was known now will discount every future package from the same team. The uncomfortable risk is the one worth writing; everything else is decoration.

## The refusals

The skill will not write a package when any of these is missing, and it says which one:

| Missing | Why it blocks |
| --- | --- |
| A framed problem | People would commit to a solution without an agreed problem. |
| A selected shape | There is nothing to commit to. |
| A defined appetite | "As long as it takes" is not a bet. |
| An unresolved `⚠️` | Packaging an absence converts it into a promise. |

A document that looks decision-ready gets treated as decision-ready, which is why there is no such thing as a partial package "just to react to".

## Where it stops

Inputs: `FRAMED_PROBLEM.md` and `SHAPING.md`. Output: `DESIGN_PACKAGE.md`.

Everything in it is carried, never re-derived — if a sentence cannot be traced to one of the two inputs, it does not belong. And it stops before wireframes, acceptance criteria, and tickets: those commit the team to decisions the bet was supposed to leave open until Design.

- Skill: [`skills/artifacts/design-package/SKILL.md`](../../skills/artifacts/design-package/SKILL.md)
