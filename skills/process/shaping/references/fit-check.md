# The fit check

Read this at step 5, before building the first matrix.

The fit check is the only place where requirements and shapes meet. Everything else in shaping is preparation for it.

## Format

Requirements are rows. Shapes are columns. Every cell is `✅` or `❌`.

```markdown
| # | Requirement | Status | A | B | C |
| --- | --- | --- | --- | --- | --- |
| R0 | Approver knows what is waiting on them without opening each record | Core goal | ✅ | ✅ | ❌ |
| R1 | Works for a delegate acting on someone else's behalf | Must-have | ❌ | ✅ | ✅ |
| R2 | Every approval action is attributable after the fact | Must-have | ✅ | ✅ | ✅ |
| R3 | Usable at 40k open items without pagination becoming the task | Must-have | ✅ | ❌ | ✅ |
| R4 | Full keyboard path from queue to decision | Must-have | ✅ | ✅ | ✅ |
| R5 | No new permission model | Nice-to-have | ✅ | ❌ | ✅ |
```

Then, and only for the failures:

```markdown
**Notes**

- `A / R1` — the queue is scoped to the signed-in user; a delegate would see an empty queue.
- `B / R3` — the grouped view loads every open item to compute the groups.
- `B / R5` — delegation needs a new grant type.
- `C / R0` — surfaces the count, not what is waiting, so the approver still opens records to triage.
```

Notes explain failures. They never explain passes, and they never soften a failure into a partial.

## The binary rule

Two values. No third.

- No `⚠️` in the matrix. `⚠️` marks a part of a shape as not understood; in the fit check that part's requirement is `❌`. You cannot claim a requirement is met by something nobody can describe.
- No "partial", "mostly", "with work", "yes but". Each of those is a `❌` with a note, or a missing requirement that would let you write `✅` honestly.
- No blank cells. A blank means the check has not been run for that pair, and an unfinished matrix cannot support a decision.

The reason is not tidiness. A three-value scale lets every shape score respectably and lets the group choose on preference while feeling rigorous. Binary forces the disagreement into the open, where it can be resolved by naming a requirement.

## When the matrix and your judgement disagree

If a shape passes every check and still feels wrong, **a requirement is missing**. This is the most useful signal the fit check produces, and it is the one people most often override.

Do this instead:

1. Say out loud what is uncomfortable about the shape.
2. Turn it into a requirement: what would have to be true for that discomfort to disappear?
3. Add it as a new `R` with a status.
4. Re-run the whole check, including the shapes you had already dismissed — a new requirement can revive one.

The reverse also happens: a shape fails and everyone still wants it. Same move. Either the requirement it fails is not really a `Must-have` — change the status, and say so — or the shape is genuinely out.

## Re-running it

The matrix is not a one-time artifact. Re-run it after any of these:

- a requirement is added, removed, or changes status;
- a shape gains, loses, or changes a part;
- a spike resolves a `⚠️`;
- a cut is made to fit the appetite.

Always print the whole table again, with 🟡 on the rows that moved. Never post a diff or say "the rest is unchanged" — the reader cannot verify a decision they cannot see.

## Reading the result

- **One shape passes every `Core goal` and `Must-have`** — that is the selection. State the decisive requirement (the one the runner-up fails) and what would reverse the decision.
- **Several shapes pass everything** — good news, not a problem. Pick on cost, reversibility, or how much of the appetite it leaves for the unexpected. Do not invent tie-breaker requirements you do not believe in.
- **Nothing passes** — check whether a cut rescues one: a `Must-have` that is really a `Nice-to-have`, or a cheaper alternative for the failing component. If nothing rescues it, the status is `no-viable-shape`, and reporting that is the useful outcome.
