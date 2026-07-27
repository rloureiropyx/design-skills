# FRAMED_PROBLEM.md structure

Read this at step 8, when writing the artifact. Use the exact top-level headings below so whoever runs Shape next — a person, or a later workflow — can consume the file without parsing prose.

Write in the user's language. Save it inside the project, using the project's established documentation directory when one exists and the project root otherwise. Update this same file on later framing passes — one current source of truth, never a second copy.

```markdown
# Framed Problem: <working title>

## Status
`ready-for-shape | revisit-shape | continue-current-frame | evidence-needed | needs-reframing | split | stop`

## Source request
The raw initiative and any proposed solution, kept as source context.

## Source material
Quoted, attributed evidence: who said it, when, and where. This is ground truth; every other section of this document is an interpretation of it. Mark anything paraphrased as paraphrased, and anything implied as implied with the reasoning shown.

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

## Options landscape
Every option, request, or idea that surfaced, as a table of `Option | What it addresses | Who benefits | Signal strength`, followed by the case for the one chosen now. Each option not chosen carries a *why not now*, never a *why not ever*.

## Working question
The open, actionable question Shape will answer.

## Boundaries
In scope, out of scope, constraints, commitments, fixed build-time budget if given, explicit exclusions, and any undefined optional boundary with its concrete project consequence and decision deadline.

## Less about / More about
Optional. Two symmetric lists constraining the *kind* of solution the evidence supports. Include it only when there is an obvious-but-wrong direction a correct reading of the problem could still lead to. Never names a mechanism. Omit the section entirely when no such misunderstanding exists.

## Major risks
Risks that could invalidate or destabilize the frame during solution exploration. State what each risk could cause in Shape, the design package, or Design rather than naming the risk alone.

## Evidence requests
Targeted inputs still required from the research library, metrics tool, or another source. Include the exact query or filter, the decision informed, the signal sought, and the stopping condition.

## Shape handoff
What Shape may treat as settled, what remains flexible, which existing solution decisions are preserved or reopened, and which uncertainties its rough hypothesis sketches must address. State explicitly that this frame commits the business to *shaping time*, not to building. Write it for a reader who has not seen this framing conversation and has no tooling beyond a sketching surface.

## Context use
Where this file lives in the project, how it serves as the problem north star, which workflows must reference it, and which evidence or decision would require it to be updated.

## Confirmation
Who confirmed the frame, when, and any explicit risk accepted.
```

## Why the structure is fixed

`FRAMED_PROBLEM.md` is durable project context and the project's **problem north star**: the shared reference for deciding whether later solution sketches, scope changes, and implementation decisions still address the chosen problem. Later solution exploration, research, design, implementation, and review work read it before making decisions that depend on the problem, audience, outcome, evidence, or boundary. When new evidence changes the frame, update this document before dependent work continues.
