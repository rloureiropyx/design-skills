# Version lineage

Read this at step 6, before the first version bump.

Directions get better by being fixed, not by being replaced. This is how that gets recorded so the record still makes sense to someone who was not in the conversation.

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

## What never happens

- **Editing a version in place.** `A2` is a fact about what the team thought at a moment. Changing it loses why `A1` failed, which is the only explanation for why the current version looks the way it does.
- **Deleting a superseded version.** Then the lineage is just the current state with extra formatting.
- **Putting a superseded version in the fit check.** Only current versions are columns.
- **Renaming a version to a new letter.** `B3` is not `E`. See the rule above.
- **Bumping a version with no stated reason.** A version whose "why" column is empty is a change nobody can evaluate.

## Why keep the losers visible

Two reasons, both practical.

Six weeks into the build, someone asks "why didn't we just do X?" — and X is `B1`. The lineage answers it in one line instead of an argument.

And a direction discarded early is often the right one after a requirement changes status. The lineage says exactly what would have to change, so reviving it is a decision rather than a rediscovery.
