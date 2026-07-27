# FRAMED_PROBLEM.md structure

Read this at step 8, when writing the artifact. Use the exact top-level headings below so a future `shape` workflow and other project work can consume the file without parsing prose.

Write in the user's language. Save it inside the project, using the project's established documentation directory when one exists and the project root otherwise. Update this same file on later framing passes — one current source of truth, never a second copy.

```markdown
# Framed Problem: <working title>

## Status
`ready-for-shape | revisit-shape | continue-current-frame | evidence-needed | needs-reframing | split | stop`

## Source request
The raw initiative and any proposed solution, kept as source context.

## Project checkpoint
For in-progress work: current stage, original frame, solution direction, work produced, decisions and reversibility, new evidence, trigger for review, and sunk-cost boundary. Use `Not applicable — new project` otherwise.

## What changed
For in-progress work: what changed since kickoff, why it matters, and which prior decisions remain valid or need reopening. Use `Not applicable — new project` otherwise.

## Baseline story
User, goal, context, current limitation, workaround or failure, and consequence.

## Chosen problem frame
A concise statement of the tension worth solving.

## Users and outcomes
Primary user, other stakeholders, current behavior, and observable desired outcome.

## Evidence ledger
Observations with provenance; interpretations kept distinct.

## Assumption ledger
Assumption, impact if false, confidence, current support, and disposition.

## Alternative frames considered
Material alternatives, trade-offs, rejection reason, and evidence that could revive each.

## Working question
The open, actionable question Shape will answer.

## Boundaries
In scope, out of scope, constraints, commitments, fixed build-time budget if given, explicit exclusions, and any undefined optional boundary with its concrete project consequence and decision deadline.

## Major risks
Risks that could invalidate or destabilize the frame during solution exploration. State what each risk could cause in Shape, Pitch, or Design rather than naming the risk alone.

## Evidence requests
Targeted inputs still required from the research library, metrics tool, or another source. Include the exact query or filter, the decision informed, the signal sought, and the stopping condition.

## Shape handoff
What the future `shape` workflow may treat as settled, what remains flexible, which existing solution decisions are preserved or reopened, and which uncertainties its rough Excalidraw hypothesis sketches must address.

## Context use
Where this file lives in the project, how it serves as the problem north star, which workflows must reference it, and which evidence or decision would require it to be updated.

## Confirmation
Who confirmed the frame, when, and any explicit risk accepted.
```

## Why the structure is fixed

`FRAMED_PROBLEM.md` is durable project context and the project's **problem north star**: the shared reference for deciding whether later solution sketches, scope changes, and implementation decisions still address the chosen problem. Later solution exploration, research, design, implementation, and review work read it before making decisions that depend on the problem, audience, outcome, evidence, or boundary. When new evidence changes the frame, update this document before dependent work continues.
