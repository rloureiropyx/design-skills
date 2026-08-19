# Version lineage

Read this at step 7, before the first direction version bump, and again at step 8 for the requirement set.

Directions get better by being fixed, not by being replaced. So does the list they are judged against. This is how both get recorded so the record still makes sense to someone who was not in the conversation.

## The rule

**A new letter means a different mechanism. A new number means the same mechanism, improved.**

| You did this | It becomes |
| --- | --- |
| Worked out the details of `B` | `B2` |
| Cut a part of `B2` to fit the time budget | `B3` |
| Replaced a part of `B3` with a cheaper alternative | `B4` |
| Solved `B4`'s failure on `R3` a different way | `B5` |
| Thought of an entirely different mechanism | `D1` |

If you cannot say which requirement the new version is trying to fix, it is probably not a new version — it is either a different mechanism (new letter) or fiddling (do not record it).

## The lineage table

One per direction, in `DIRECTIONS.md`, read left to right:

```markdown
### Direction B — grouped approval queue

| Version | What changed | Why | State |
| --- | --- | --- | --- |
| ~~B1~~ | Original: one flat queue per approver | — | Superseded — failed `R3` at 40k items |
| ~~B2~~ | Groups computed server-side, paged | Fix `R3` | Superseded — introduced a new grant type, failed `R5` |
| **B3** | Groups derived from existing role scopes | Fix `R5` without losing `R3` | **Current** |
```

Struck through and superseded, or bold and current. Nothing in between, and nothing deleted.

## Discarding

Discarding a whole direction is the same move one level up. Strike the letter, say why, and say what would bring it back:

```markdown
### ~~Direction C — per-record notifications~~

Discarded at C1. Failed `R0`: it tells the approver something arrived, not what is waiting,
so they still open records to triage. Would come back if `R0` were downgraded from `Core goal`,
or if a digest could carry enough context to make triage unnecessary.
```

"What would bring it back" is the part people skip and the part that matters. A direction discarded without one gets re-proposed by someone else three weeks later, and nobody remembers the reason it lost.

## The requirement set has versions too

The requirements are a working hypothesis. Sketching directions and drawing them is what tests them, and the set that survives contact is rarely the set you started with. That is the method working — but only if the change is recorded, because a requirement quietly edited to match a direction someone likes is indistinguishable from a requirement that was always there.

The set carries a version: `R-set v1 → v2 → v3`. Bump it whenever a requirement is added, changed, or retired.

### The three ways the set turns out to be wrong

| What happened | The move |
| --- | --- |
| A direction passes everything and still feels wrong | A requirement is **missing**. Write the implicit constraint, add it |
| Only one candidate can ever satisfy a requirement | It is a **direction in disguise**. Retire it, write the capability it stood in for |
| A wireframe, breadboard, or spike showed the constraint does not hold | It is **wrong**. Change it, and say what showed you |

### The changelog

One table in `DIRECTIONS.md`, under the requirements:

```markdown
## Requirement changelog

| R-set | Requirement | Change | Why | Trigger |
| --- | --- | --- | --- | --- |
| v2 | `R7` | Added | Nothing said what an approver with read-only rights sees | Drawing `B2` — the queue was empty for the role that hits this most |
| v2 | ~~`R4`~~ | Retired | Only `A` could ever satisfy it — it was `A` wearing a requirement | Fit check v1: the row had one `✅` and it was always the same column |
| v3 | `R2` | Changed | 40k was the wrong ceiling; the real one is per-company and lower | Spike `S1` |
```

**The trigger column is the point.** A requirement discovered by drawing a direction is a good outcome, and the record should show what exposed it rather than just the conclusion. Without it, six weeks later the set looks like it arrived fully formed and nobody can tell which parts were tested.

Retired requirements stay in the requirements table, struck through, with the reason. Same rule as a discarded direction, same reason.

### Bumping the set invalidates the fit check

A matrix is a result about one set of requirements. When the set changes:

- mark every matrix stamped with the old version **stale**, and keep it;
- re-run the live columns against the new set;
- never edit an old matrix to match the new requirements. That is how a board ends up showing a result nobody produced.

A matrix stamped `R-set v1` sitting under a `v2` table reads as current and is not. If the change was small enough that re-running is trivial, re-run it — that is cheaper than the argument about whether it still holds.

## What never happens

- **Editing a version in place.** `A2` is a fact about what the team thought at a moment. Changing it loses why `A1` failed, which is the only explanation for why the current version looks the way it does.
- **Deleting a superseded version.** Then the lineage is just the current state with extra formatting.
- **Putting a superseded version in the fit check.** Only current versions are columns.
- **Renaming a version to a new letter.** `B3` is not `E`. See the rule above.
- **Bumping a version with no stated reason.** A version whose "why" column is empty is a change nobody can evaluate.
- **Editing a requirement in place.** Same failure one level up, and worse: it changes what every direction was judged against, retroactively, with no record.
- **Bumping the R-set with no trigger.** A requirement that appeared for no stated reason cannot be challenged, and the next person assumes it was always true.

## Why keep the losers visible

Two reasons, both practical.

Six weeks into the build, someone asks "why didn't we just do X?" — and X is `B1`. The lineage answers it in one line instead of an argument.

And a direction discarded early is often the right one after a requirement changes status. The lineage says exactly what would have to change, so reviving it is a decision rather than a rediscovery.
