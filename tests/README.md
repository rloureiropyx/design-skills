# Testing skills

Skills fail quietly. A skill can look excellent as prose and still route on the wrong requests, skip its gate, or produce an artifact nobody can act on. These tests exist to catch that.

There is no tooling here. A test pass is a person running a scenario in a fresh session and judging the transcript.

## Running a pass

1. **Pick a scenario** from `tests/<skill>/scenarios.md`.
2. **Start a fresh session.** Prior context contaminates routing—half the point is checking whether the skill triggers on its own.
3. **Paste the scenario's opening prompt verbatim.** Do not soften it or add hints. Play the user described in the scenario for any follow-up.
4. **Stop at the scenario's stop condition.** Usually the first produced artifact or the first gate.
5. **Score against [`RUBRIC.md`](RUBRIC.md).**
6. **Save the run** to `tests/<skill>/runs/YYYY-MM-DD-<scenario-id>.md` using the template below.

Run a pass whenever you change a skill's frontmatter, add or remove a phase, or notice a bad result in real work.

## Saved run format

```markdown
# <scenario-id> — YYYY-MM-DD

- Skill version: <commit sha or short description of the state under test>
- Model: <model used>
- Verdict: pass | partial | fail

## Rubric scores
| Criterion | Score | Note |
| --- | --- | --- |
| Routing | | |
| Boundary | | |
| Question quality | | |
| Evidence discipline | | |
| Artifact usefulness | | |
| Enterprise fit | | |

## What went wrong
<observed behaviour, quoted from the transcript>

## Skill change proposed
<the specific edit to SKILL.md, or "none">

## Transcript
<paste or link>
```

## Reading results

A failed run is not a failed test—it is an unwritten line in the skill. Every `fail` or `partial` should end with either a proposed edit or an explicit decision to accept the behaviour, recorded in the run file. Runs with neither are incomplete.
