# Notes — Shaping

```
pick-a-shape.script.md    the scene-by-scene script
pick-a-shape.html         the article — standalone, no build step
```

Open [`pick-a-shape.html`](pick-a-shape.html) in a browser. No dependencies, no build step. The notes below are the short written version.

## What it does

Takes a framed problem and works out which solution direction to go with, inside a fixed amount of time.

Write down what a solution has to be true of. Sketch two or three genuinely different ways of doing it. Check each one against the list, in the open, with two possible answers. Improve the promising ones until one of them fits. Output: `DIRECTIONS.md`.

## Who it is not for

- The problem is not settled yet. Go to `problem-framing` — shaping a solution to an unagreed problem is the expensive version of this mistake.
- You have already picked a direction and need it written up. That is `proposal`.
- You need layouts, copy, component choices, and edge cases. Shaping stops before those on purpose; they are decisions the people building it should keep.

## A note on the name

The skill is called `shaping` for routing reasons — renaming it would risk breaking how Copilot finds it. Nothing you read says "shape". A candidate solution is a **direction**, and the amount of time is a **time budget**.

## The parts worth keeping

**The fit check is binary.** `✅` or `❌`. No "partially", no "mostly", no "yes, with some work".

A three-value scale looks more honest and does the opposite: every option scores respectably, nothing gets ruled out, and the group chooses on preference while feeling rigorous. Two values force the disagreement out where it can only be settled one way — by naming the requirement nobody had written down. When a direction passes everything and still feels wrong, the matrix is missing a row. Say what is uncomfortable, add it, re-run.

**A `⚠️` is an absence, not a risk.** It means the team can say *what* a part does but not *how* it works. Risks can be priced and accepted; an absence cannot. So a flagged part counts as `❌` — you cannot claim a requirement is met by something nobody can describe. It gets resolved with a spike, and a spike's acceptance criteria are always *"we can describe how…"*, never *"we can decide if…"*. A spike buys understanding; the decision happens afterwards, back in the table.

**Directions have versions.** `A1 → A2 → A3`. A new letter means a different mechanism; a new number means the same mechanism improved. Each version records what changed and why. Discarded versions stay in the document, struck through, with the reason.

This is for the conversation you actually have — you sketch a direction, someone points at the part that will not work, you change it. Without versions, either the change is silently overwritten and nobody can tell what was tried, or the earlier version is quietly reintroduced two weeks later by someone who was not there.

**Scope moves, time does not.** The time budget comes from the framed problem: what the business chose to spend, not an estimate of the work. When a direction does not fit, the direction changes — move a requirement to nice-to-have, swap in a cheaper component, cut a part. Every cut is written down with what it costs, because six weeks later "we decided not to" and "we forgot" look the same.

A direction that "just needs another week" is a direction that failed and has not been told.

## Enterprise requirements

The method is Ryan Singer's, from [`rjs/shaping-skills`](https://github.com/rjs/shaping-skills) and *Shape Up*. It assumes a small autonomous team that owns its whole stack.

Enterprise B2B work does not get that, so step 2 walks a fixed list before any direction is drawn: roles and permissions, workflow ownership, compliance and auditability, integrations, data volume, operational complexity, accessibility. Each one produces a requirement or is marked not applicable with a reason. None is skipped silently.

These are the requirements that show up late and invalidate a direction after someone has committed to it. Accessibility found during design is a scope change; accessibility written as a requirement is a constraint the direction had to satisfy from the start.

## Where it stops

Input: `FRAMED_PROBLEM.md`. Output: `DIRECTIONS.md` — requirements, directions and their versions, the fit check, one selection, the cuts.

Contradicting evidence goes back to `problem-framing` rather than getting fixed here. The write-up for other people is `proposal`.

- Skill: [`skills/process/shaping/SKILL.md`](../../skills/process/shaping/SKILL.md)
- Breadboards: [`breadboarding`](../breadboarding/README.md) — step 3 uses it to make each direction concrete before the fit check.

---

**Rendering.** Checked at nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled. Least clearance: 27px at 667×375.
