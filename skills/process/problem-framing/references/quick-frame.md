# The quick frame

Read this before running the quick branch.

Same purpose as the full loop — say what problem is being solved without smuggling in a solution — at a size that fits a small piece of work. It exists because running the full interview on a two-day fix costs more than the fix and teaches people that framing is bureaucracy.

## When to use it

All five, not most of them:

- one person, or a pair, will do the work;
- the time budget is days, not weeks;
- one user and one moment — no competing populations to reconcile;
- nothing regulated, no permission model change, no system of record involved;
- being wrong is cheap and reversible.

If you are unsure, run quick. The upgrade conditions below will catch it, and they are cheap to hit early.

## The short loop

Five questions. Ask them one at a time, recommend an answer from what you can already see, and stop as soon as the frame holds together.

### 1. What happened?

One concrete episode, not a category:

`[Someone] tried to [do a thing] and [what got in the way], so [what they did instead], which cost [something].`

If the answer is a generalisation — "users find it confusing" — ask for the most recent time it happened. If nobody can name one, that is the finding, and it usually means the work is speculative rather than small.

### 2. What do they do today?

The current way, without any new solution, and where it stops working. A problem with no current workaround is usually either not happening or not being described.

### 3. What would be different if this worked?

Something observable. Not "a better experience" — something you could notice from the outside: they stop asking support, the second step disappears, the number they hand-copy is already there.

This is the one question a quick frame cannot skip. Without it, nothing later can reject a bad solution, and the pass has bought nothing.

### 4. What is out?

The nearest adjacent thing that would be reasonable to fix at the same time, and which is not being fixed. One line. This is what stops a two-day job becoming a two-week one.

### 5. What are you assuming?

The one thing that, if wrong, makes this work pointless. Name it, say whether it can be checked in under an hour, and either check it or write it down as accepted risk.

One assumption. If there are three, this is not a small problem, and that is an upgrade condition.

## The output

One page. Use `templates/quick-frame.md`. It goes in the same place a full `FRAMED_PROBLEM.md` would, under the same name, so `shaping` reads it without knowing which branch produced it — and so it can be grown into a full frame later rather than replaced.

It is marked at the top as a quick pass, with the conditions under which it stops being adequate. That marking is what stops a one-page frame being cited months later as if a full pass had happened.

## Upgrade conditions

Stop the quick pass and move to the full loop when any one of these appears. State which one, and why, rather than quietly continuing.

| Condition | Why it ends the quick pass |
| --- | --- |
| A second plausible explanation of the same behaviour survives one round of questioning | Comparing frames is what the full loop is for, and picking the wrong one here is not cheap to reverse. |
| A second user population appears with a different version of the problem | Two users, two moments, two outcomes. The frame is a grab bag, and grab bags need splitting. |
| Roles, permissions, audit, retention, or a regulated surface is involved | These are the constraints that invalidate work after it is done, and they need the full boundary section. |
| The time budget grows past a week, or more than one person is now on it | The cost of being wrong has changed. Frame it properly. |

There is also a fifth, quieter one: you have asked more than about eight questions and the frame still will not settle. That is the full loop happening badly. Switch to it deliberately.

## What quick does not skip

The reductions are in breadth, not honesty. Even in a quick pass:

- an episode nobody can name stays marked as missing, and is not replaced with a plausible one;
- a number nobody measured is not invented;
- a proposed solution in the request is still separated from the problem underneath it;
- the observable outcome is still required;
- what was set aside is still written down, so it can be reconsidered.

What quick actually drops: the full ledger of observations and interpretations, the three-to-five candidate frames, the options landscape table, the formal evidence gate, and the long boundary section. Those are the parts whose value scales with the size of the commitment.

## What to say at the end

Two sentences, not a status block:

> Quick frame. This is what breaks, for whom, and what would be different if it worked.
> It assumes X, and if the work grows past a week or a second role turns up, it needs a full pass.

Then hand it to `shaping`, or to the person doing the work, and stop.
