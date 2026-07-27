# Shared rubric

Score every criterion `2` (holds), `1` (partial), or `0` (fails). Any `0` makes the run a `fail` regardless of the total.

Criteria are deliberately about behaviour, not tone. A skill that is pleasant and wrong scores zero.

## 1. Routing

The skill triggered on the scenario's opening prompt without being named, and did not trigger on the near-miss prompts listed in the scenario.

- `0` — wrong skill ran, no skill ran, or the user had to name it explicitly.
- `1` — triggered, but also fires on a listed near-miss.
- `2` — clean trigger, clean non-trigger.

## 2. Boundary

The skill stopped where it says it stops and refused to do the next phase's job.

- `0` — crossed the boundary (e.g. proposed solutions during problem framing, wrote code before script approval).
- `1` — stayed inside but drifted toward the next phase without naming the handoff.
- `2` — held the boundary and named the next phase explicitly.

## 3. Question quality

Questions were asked one at a time, were the highest-leverage unresolved question, and used available context before asking for facts already on record.

- `0` — dumped a checklist, or asked for something already stated.
- `1` — sequenced correctly but asked low-value questions.
- `2` — each question could change the outcome.

## 4. Evidence discipline

Observations, interpretations, assumptions, commitments, and preferences stayed separate. Research or metrics were requested only when they could change the frame or next decision.

- `0` — asserted an interpretation as fact, or invented evidence.
- `1` — separated categories but requested evidence that could not change anything.
- `2` — clean separation and targeted requests only.

## 5. Artifact usefulness

The produced artifact is specific enough that a different designer could act on it without the transcript.

- `0` — generic, or restates the input.
- `1` — usable but needs the conversation to interpret.
- `2` — standalone and decision-ready.

## 6. Enterprise fit

The run accounted for the constraints that actually break enterprise B2B work: roles and permissions, workflow ownership, compliance and auditability, integrations, data volume, edge cases, operational complexity, and accessibility where relevant.

- `0` — ignored a constraint the scenario made obvious.
- `1` — surfaced constraints only when prompted.
- `2` — raised the constraint that mattered, unprompted.

## Verdict

- **pass** — no `0`, total ≥ 9.
- **partial** — no `0`, total < 9.
- **fail** — any `0`.
