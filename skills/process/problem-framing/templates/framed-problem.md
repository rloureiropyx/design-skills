# FRAMED_PROBLEM.md structure

Read this at step 8, when writing the artifact. Use the exact top-level headings below so whoever explores solutions next — a person, or a later workflow — can read the file without parsing prose.

Write in English, always — including when the user ran the interview in another language. Save it inside the project, using the project's established documentation directory when one exists and the project root otherwise. Update this same file on later framing passes — one current source of truth, never a second copy.

```markdown
# Framed Problem: <working title>

## Status
`ready-for-directions | revisit-directions | continue-current-frame | evidence-needed | needs-reframing | split | stop`

## Source request
The raw initiative and any proposed solution, kept as source context.

## Source register
Every piece of raw material the frame rests on, with a stable ID the rest of this document cites.

| ID | Date | Speaker or source | Type | Quote or observation | Locator |
| --- | --- | --- | --- | --- | --- |
| S01 | 2026-01-14 | A. Chen, admin interview | Observation | "I copy it into a spreadsheet every Monday because the export drops the approver column." | `interviews/chen-2026-01-14.vtt` 00:14:22 |
| S02 | 2026-02 | Product analytics | Observation | Completion rate fell from 68% to 54% after the November release. | `analytics/funnel-q4.md#completion` |
| S03 | 2026-01-20 | B. Patel, product walkthrough | Interpretation | "It feels like two products." Internal reading of the IA, not a user statement. | `context/walkthrough-notes.md#navigation` |
| S04 | 2025-Q4 | Approval policy, v3 | Commitment | Finance approval cannot be bypassed. Owner: CFO. | `policies/approvals-v3.pdf` p. 4 |

`Type` uses the same five labels as the ledger: `Observation` · `Interpretation` · `Assumption` · `Commitment` · `Preference`. `Locator` is whatever gets a reader back to the exact moment — a timestamp, a line, a path and heading, a ticket URL. Mark paraphrases as paraphrased and implied claims as implied, with the reasoning shown.

Quotes are ground truth; every other section of this document is an interpretation of them. Cite the IDs inline wherever a claim rests on one: `(→ S01, S03)`.

## Source material
Optional. The longer passages worth preserving in full — a paragraph of a transcript, a policy clause — when the register's one-line quote loses something that matters. Omit the section when the register carries everything.

## Project checkpoint
For in-progress work: current stage, original frame, solution direction, work produced, decisions and reversibility, new evidence, trigger for review, and sunk-cost boundary. Use `Not applicable — new project` otherwise.

## What changed
For in-progress work: what changed since kickoff, why it matters, and which prior decisions remain valid or need reopening. Use `Not applicable — new project` otherwise.

## Business frame
The business problem statement — what changed in the world, what it did to the business, and the How Might We it opens — plus the business outcome as a behaviour change with a number. Cite the source IDs behind both, or mark either as missing with its consequence. Never an output.

## Baseline story
User, goal, context, current limitation, workaround or failure, and consequence. Cite the source IDs it rests on.

## System context
The actor map (`Actor | Experiences it | Decides | Holds the information`) with its mismatches named, and the iceberg (event, pattern, structure, mental model) with source IDs. Include the object map only for problems about a system of record, shared data, or entity relationships; include the causal loop only when a prior fix did not hold. Omit a subsection rather than filling it thinly.

## Chosen problem frame
A concise statement of the tension worth solving.

## Users and outcomes
Primary user, other stakeholders, current behavior, the observable desired outcome, and the user's own outcome and benefit in their own terms — kept distinct from the business outcome above.

## Evidence ledger
Observations with provenance, each citing its source ID; interpretations kept distinct and labelled as interpretations of specific IDs.

## Assumption ledger
Assumption, impact if false, confidence, current support (source IDs, or `none`), and disposition.

## Alternative frames considered
Material alternatives, trade-offs, rejection reason, and evidence that could revive each.

## Options landscape
Every option, request, or idea that surfaced, as a table of `Option | What it addresses | Who benefits | Signal strength`, followed by the case for the one chosen now. Each option not chosen carries a *why not now*, never a *why not ever*.

## Working question
The open, actionable question the solution has to answer. Several answers should be possible.

## Hypothesis
`We believe [business outcome] will be achieved if [user] achieves [user outcome].` The `using [direction]` clause is deliberately absent — `shaping` appends it once a direction is selected. Say so, so the gap does not read as an omission. Mark any clause the frame could not fill.

## Boundaries
In scope, out of scope, fixed build-time budget if given, explicit exclusions, and any undefined optional boundary with its concrete project consequence and decision deadline.

## Constraint registry
What the work must respect, and how firmly. A table of `ID | Constraint | Owner | Authority source | Reversibility | Review or expiry`, with `C` rows for hard constraints and `P` rows for preferences and tenets. Cite the source ID establishing each row. When the interview surfaced none, say so in one line and record it as an assumption — it is a strong one.

## Less about / More about
Optional. Two symmetric lists constraining the *kind* of solution the evidence supports. Include it only when there is an obvious-but-wrong direction a correct reading of the problem could still lead to. Never names a mechanism. Omit the section entirely when no such misunderstanding exists.

## Open questions
Questions asked during framing that nobody could answer, as a table of `ID | Question | Decision it informs | Who could answer | Why unanswered | Consequence if it stays open`, each with its routing decision: `evidence request`, `reframe trigger`, or `accepted risk`. Omit the section only when every question asked was answered.

## Major risks
Risks that could invalidate or destabilize the frame during solution exploration. State what each risk could cause while exploring directions, writing the proposal, or designing, rather than naming the risk alone. Include every open question routed to `accepted risk`, carrying its `Q` ID, who accepted it, and when.

## Evidence requests
Targeted inputs still required from the research library, metrics tool, or another source. Include the exact query or filter, the decision informed, the signal sought, and the stopping condition.

## Handoff
What the next step may treat as settled, what remains flexible, which existing solution decisions are preserved or reopened, and which uncertainties the candidate directions must address. Pass the open-questions register forward: `shaping` inherits each accepted risk as an open assumption, which usually becomes a candidate requirement or a candidate spike. State explicitly that this frame commits the business to *time spent exploring solutions*, not to building. Write it for a reader who has not seen this framing conversation and has no tooling beyond a sketching surface.

## Context use
Where this file lives in the project, how it serves as the problem north star, which workflows must reference it, and which evidence or decision would require it to be updated. Name the project context library this frame drew on, if one exists, and the specific files used — downstream work reads the same source instead of asking again.

## Confirmation
Who confirmed the frame, when, and any explicit risk accepted.

## Lean Product Canvas
Optional. Include it when the user asks for the canvas or when stakeholders already work in that
format. Six boxes filled from the sections above; boxes 5 and 6 are not this document's to fill.

| Box | Content |
| --- | --- |
| 1. Business problem | From `## Business frame` |
| 2. Business outcomes | From `## Business frame` |
| 3. Users | From `## System context` — actor map |
| 4. User outcomes and benefits | From `## Users and outcomes` |
| 5. Solutions | `Owned by shaping` — framing stops before mechanisms |
| 6. Hypotheses | From `## Hypothesis`, with the `using [direction]` clause left to `shaping` |
| 7. Riskiest assumption | From `## Assumption ledger` — the single riskiest one right now |
| 8. Least work to learn it | From `## Evidence requests` |

It is a view of this document, not a second source of truth. When the two disagree, this document
is right and the canvas is stale.
```

## Why the structure is fixed

`FRAMED_PROBLEM.md` is durable project context and the project's **problem north star**: the shared reference for deciding whether later solution sketches, scope changes, and implementation decisions still address the chosen problem. Later solution exploration, research, design, implementation, and review work read it before making decisions that depend on the problem, audience, outcome, evidence, or boundary. When new evidence changes the frame, update this document before dependent work continues.
