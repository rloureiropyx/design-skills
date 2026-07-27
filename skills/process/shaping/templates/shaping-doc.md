# SHAPING.md structure

Read this at step 7, when writing the artifact. Use the exact top-level headings below so `design-package` — or a person — can consume the file without parsing prose.

Write in the user's language. Save it beside `FRAMED_PROBLEM.md`: the project's documentation directory when one exists, the project root otherwise. Update this same file on later shaping passes — one current source of truth, never a second copy.

```markdown
# Shaping: <working title>

## Status
`shape-selected | spike-needed | appetite-undefined | no-viable-shape | reframe`

## Frame carried forward
The problem, desired outcome, primary user, boundaries, exclusions, and any `Less about / More about` guardrail — copied from `FRAMED_PROBLEM.md`, not rewritten. Link the source file. If no framed problem exists, say so here and mark this section `provisional — unverified`.

## Appetite
The fixed build time the business has chosen to invest, and where that number came from. If undefined, say so and state that no shape below can be evaluated as a bounded commitment.

## Requirements
| # | Requirement | Status | Source |
| --- | --- | --- | --- |

Status is one of `Core goal`, `Must-have`, `Nice-to-have`, `Leaning yes`, `Leaning no`, `Undecided`, `Out`. Source is where it came from: a line in the frame, a spike finding, a stated constraint, or an enterprise class. Nine or fewer at the top level; group beyond that as `R3.1`, `R3.2`.

## Enterprise classes considered
One line each for roles and permissions, workflow ownership, compliance and auditability, integrations, data volume, operational complexity, and accessibility: the requirement it produced, or why it does not apply here. Never omit a class silently.

## Shapes
One `###` section per shape (`A`, `B`, `C`…). For each: the mechanism in two or three sentences, then a parts table.

| Part | What it does for whom | Flag |
| --- | --- | --- |

Parts are vertical mechanisms, never layers. `⚠️` in the flag column means the part is described but not understood.

## Fit check
The complete matrix — requirements as rows, shapes as columns, `✅` or `❌` only — followed by one note per failure. Print it in full; never abbreviate.

## Open unknowns
Every `⚠️` still standing, the shape and part it sits on, and its disposition: a spike file, or an explicit decision to carry it as a known risk of the bet.

## Selected shape
Which shape, the decisive requirement that separated it from the runner-up, and what would make the team reverse this decision.

## Cuts made to fit the appetite
What was moved to `Nice-to-have` or `Out`, what each cut costs, and what would justify restoring it. An empty section means no cutting was needed — say that explicitly rather than omitting the heading.

## Shapes not selected
Each rejected shape, why it lost, and the evidence or requirement change that would revive it.

## Handoff
What `design-package` may treat as settled, what stays deliberately open for Design to decide, and which risks the package must state to the people making the bet.
```

## Why the structure is fixed

`SHAPING.md` is the working record of a decision, and its value is that someone who was not in the room can see *why* one shape won — the requirements, the failures, and the cuts, not just the conclusion.

`design-package` reads this file plus `FRAMED_PROBLEM.md` and writes neither's content again from scratch. When new evidence changes the selected shape, update this document before the package or any dependent design work continues.
