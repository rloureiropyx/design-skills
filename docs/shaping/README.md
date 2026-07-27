# Explainer — Shaping

**Status:** written explainer. No scrollytelling article yet.

## What the skill is for

You have a framed problem. Now someone has to decide *what to build* — and the two usual failure modes are equally expensive. Either the team argues about solutions until the loudest preference wins, or someone hands down a solution and the requirements get reverse-engineered afterwards to justify it.

Shaping replaces the argument with a table.

## The one idea

Write down what the solution has to be true of. Sketch two or three genuinely different ways of doing it. Check each one against the list, in public, with two possible answers.

That is the whole method. Everything else is discipline around it.

## Why binary

The fit check allows `✅` and `❌`. No "partially", no "mostly", no "yes, with some work".

A three-value scale looks more honest and does the opposite: every option scores respectably, nothing is ever ruled out, and the group ends up choosing on preference while feeling rigorous. Two values force the disagreement into the open, where it can only be resolved one way — by naming the requirement nobody had written down.

That is the most useful thing the fit check produces. When a shape passes everything and still feels wrong, the discomfort is real and the matrix is incomplete. Say what is uncomfortable, turn it into a requirement, re-run.

## Why a flag is not a risk

A part marked `⚠️` means the team can describe *what* it does but not *how* it works. That is not a risk — risks can be accepted and priced. It is an absence.

So a flagged part is automatically `❌`. You cannot claim a requirement is satisfied by something nobody can describe. It is a blunt rule and it exists because the alternative — a confident shape with a hole in it — is exactly what a shaping phase is supposed to prevent.

Absences get resolved by a spike, and a spike's acceptance criteria are always phrased *"we can describe how…"*, never *"we can decide if…"*. A spike buys understanding. The decision comes afterwards, back in the table.

## Why scope is the thing that moves

The appetite comes from the framed problem: the amount of time the business has chosen to spend. It is a constraint on the solution, not an estimate of it.

So when a shape does not fit, the shape changes. Move a requirement to `Nice-to-have`. Swap in a cheaper alternative for one component. Cut a part. Every cut is written down with what it costs, because six weeks later "we decided not to" and "we forgot" look identical.

A shape that "just needs another week" is a shape that failed and has not been told.

## What we added to Singer's method

The method is Ryan Singer's, from [`rjs/shaping-skills`](https://github.com/rjs/shaping-skills) and *Shape Up*. It assumes a small autonomous team that owns its whole stack.

Enterprise B2B work does not get that. So step 2 walks a fixed list before any shape is drawn: roles and permissions, workflow ownership, compliance and auditability, integrations, data volume, operational complexity, and accessibility. Each one either produces a requirement or is marked not applicable with a reason — never skipped silently.

These are the requirements that arrive late and invalidate a shape *after* someone has committed to it. Accessibility discovered during Design is a scope change; accessibility written as an `R` is a constraint the shape had to satisfy from the start.

## Where it stops

Input: `FRAMED_PROBLEM.md`. Output: `SHAPING.md` — requirements, shapes, the fit check, one selection, and the cuts.

It does not re-open the problem: contradicting evidence goes back to `problem-framing`. It does not write the proposal: that is `design-package`. And it does not do detailed design — layouts, copy, component choices and edge cases are decisions the builders need to keep.

- Skill: [`skills/process/shaping/SKILL.md`](../../skills/process/shaping/SKILL.md)
