# The fit check

Read this at step 6, before building the first matrix.

The fit check is the only place where requirements and directions meet. Everything else is preparation for it.

## Format

Requirements are rows. Directions are columns, at their **current version**. Every cell is `✅` or `❌`. The matrix is stamped with the requirement-set version it ran against.

```markdown
**Fit check — R-set v2**

| # | Requirement | Status | A3 | B2 | C1 |
| --- | --- | --- | --- | --- | --- |
| R0 | Approver knows what is waiting on them without opening each record | Core goal | ✅ | ✅ | ❌ |
| R1 | Works for a delegate acting on someone else's behalf | Must-have | ❌ | ✅ | ✅ |
| R2 | Every approval action is attributable after the fact | Must-have | ✅ | ✅ | ✅ |
| R3 | Usable at 40k open items without pagination becoming the task | Must-have | ✅ | ❌ | ✅ |
| R4 | Full keyboard path from queue to decision | Must-have | ✅ | ✅ | ✅ |
| R5 | Does not modify the vendor navigation rail (Fixed — vendor-owned) | Must-have | ✅ | ✅ | ❌ |
| R6 | No new permission model | Nice-to-have | ✅ | ❌ | ✅ |
```

Then, and only for the failures:

```markdown
**Notes**

- `A3 / R1` — the queue is scoped to the signed-in user; a delegate would see an empty queue.
- `B2 / R3` — the grouped view loads every open item to compute the groups.
- `B2 / R6` — delegation needs a new grant type.
- `C1 / R0` — surfaces the count, not what is waiting, so the approver still opens records to triage.
- `C1 / R5` — adds an item to the vendor's rail. The team does not own that surface.
```

Notes explain failures. They never explain passes, and they never soften a failure into a partial.

Column headers carry the version number. A matrix whose columns say `A`, `B`, `C` cannot be read six weeks later, because nobody knows which version of `A` was checked. The same is true of the R-set stamp: a matrix that does not say which requirements it ran against cannot be told apart from a stale one.

## The binary rule

Two values. No third.

- No `⚠️` in the matrix. `⚠️` marks a part as not understood; in the fit check that part's requirement is `❌`. You cannot claim a requirement is met by something nobody can describe.
- **A direction that changes a `Fixed` surface is `❌` on that row.** Not "with vendor agreement", not "if the other team says yes". Same logic as the flag: you cannot claim a requirement is met by something the team is not allowed to do. A `Preferred` surface is different — changing one passes, and the cost goes in the direction's notes.
- No "partial", "mostly", "with work", "yes but". Each of those is a `❌` with a note, or a missing requirement that would let you write `✅` honestly.
- No blank cells. A blank means the check has not been run for that pair, and an unfinished matrix cannot support a decision.

The reason is not tidiness. A three-value scale lets every direction score respectably and lets the group choose on preference while feeling rigorous. Binary forces the disagreement into the open, where naming a requirement can settle it.

## When the matrix and your judgement disagree

If a direction passes every check and still feels wrong, **a requirement is missing**. This is the most useful signal the fit check produces, and the one people most often override.

Do this instead:

1. Say out loud what is uncomfortable about it.
2. Turn it into a requirement: what would have to be true for that discomfort to disappear?
3. Add it as a new `R` with a status.
4. Re-run the whole check, including directions you had already dismissed — a new requirement can revive one.

The reverse also happens: a direction fails and everyone still wants it. Same move. Either the requirement it fails is not really a `Must-have` — change the status, and say so — or it is genuinely out.

## Failing is a brief, not a verdict

A `❌` on the direction you like is the input to step 7. Ask what would have to change for that cell to flip, make the change, and record it as a new version. Then re-run the matrix against the new version.

That loop is the normal case. A fit check that produces a winner on the first pass usually means the directions were not materially different.

## Re-running it

The matrix is not a one-time artifact. Re-run it after any of these:

- a requirement is added, retired, or changes status — which bumps the R-set, so the old matrix is marked stale and kept;
- a direction gains a new version;
- a direction is discarded;
- a spike resolves a `⚠️`;
- a surface changes tier in the fixed-surfaces ledger;
- a cut is made to fit the time budget.

Always print the whole table again, with 🟡 on the rows that moved, updated version numbers in the headers, and the current R-set in the stamp. Never post a diff or say "the rest is unchanged" — the reader cannot verify a decision they cannot see. Keep the superseded matrix, marked stale; never edit one in place to match a requirement that changed after it ran.

## Reading the result

- **One direction passes every `Core goal` and `Must-have`** — that is the selection. State the decisive requirement (the one the runner-up fails) and what would reverse the decision.
- **Several pass everything** — good news, not a problem. Pick on cost, reversibility, or how much of the time budget it leaves for the unexpected. Do not invent tie-breakers you do not believe in.
- **Nothing passes** — first try a version bump on the closest one, then a cut: a `Must-have` that is really a `Nice-to-have`, or a cheaper alternative for the failing part. If nothing rescues it, the status is `no-viable-direction`, and reporting that is the useful outcome.
