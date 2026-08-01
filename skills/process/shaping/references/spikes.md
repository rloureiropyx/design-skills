# Spikes

Read this at step 9, when a `⚠️` blocks a direction that is still in contention.

A spike is a bounded investigation that converts *"we cannot describe how this works"* into *"we can"*. It is not a prototype, not a proof of concept, and not a decision.

## When to write one

Only for a `⚠️` on a direction that could still win. A flag on a direction nobody will pick costs nothing and does not deserve anyone's time.

Before writing it, check that the unknown is real. Three things get mistaken for spikes:

- **A risk** — "this might be slow" is a risk you can accept or design around. A spike answers "how does this behave at 40k rows", which is a question.
- **A decision** — "should we support delegation" is not an investigation. Someone has to decide.
- **A preference** — "which library is nicer" resolves in five minutes of reading, not a spike.

## File

One spike, one file, next to `DIRECTIONS.md`: `spike-<topic>.md`.

```markdown
# Spike: <topic>

## Context
Which direction, which version, and which part this blocks, and what happens to the fit check if it stays unresolved.

## Goal
The single thing this spike must make describable. One sentence.

## Questions
| # | Question | Why it blocks the direction |
| --- | --- | --- |
| Q1 | … | … |
| Q2 | … | … |

## Acceptance criteria
- We can describe how …
- We can describe what happens when …

## Timebox
The amount of time worth spending before we stop and report what we found.

## Findings
Written after the work. What is now describable, what is still not, and what it changes in the fit check.
```

## The acceptance-criteria convention

This is the rule that makes spikes work, and it is easy to lose:

- ✅ **"We can describe how the delegate's queue is scoped."**
- ❌ **"We can decide whether to support delegation."**

A spike buys *understanding*. The decision happens afterwards, back in the fit check, with the new understanding in hand. Acceptance criteria written as decisions produce a spike that ends in an argument instead of an answer — and they let the investigation drift until someone feels ready to commit, which is unbounded by construction.

Write every criterion as something the team will be able to *describe*, *demonstrate*, or *point at* when the spike is done.

## Timebox

Every spike gets one, and it is honoured. When the timebox runs out with the question unanswered, that is a finding: the unknown is deeper than the time budget can absorb, and the direction that depends on it is probably the wrong one. Report it that way rather than quietly extending.

## After the spike

1. Write the findings in the spike file.
2. Remove the `⚠️` if the part is now describable, or keep it and say what remains unknown.
3. Re-run the fit check in full and print it with 🟡 on the rows that changed.
4. If the finding changes what the solution must be true of, add or restate the requirement rather than bending the direction around the discovery in silence. If the finding changes the direction itself, that is a new version — record it in the lineage.
