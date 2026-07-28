# DIRECTIONS.md structure

Read this at step 8, when writing the document. Use the top-level headings below exactly, so `proposal` — or a person — can read the file without parsing prose.

Write in the user's language. Save it beside `FRAMED_PROBLEM.md`: the project's documentation directory when one exists, the project root otherwise. Update this same file on later passes — one current source of truth, never a second copy.

```markdown
# Directions: <working title>

## Status
`direction-selected | spike-needed | budget-undefined | no-viable-direction | reframe`

## Frame carried forward
The problem, desired outcome, primary user, boundaries, exclusions, and any `Less about / More about` guardrail — copied from `FRAMED_PROBLEM.md`, not rewritten. Link the source file. If no framed problem exists, say so here and mark this section `provisional — unverified`.

## Time budget
The fixed build time the business has chosen to invest, and where that number came from. If undefined, say so and state that no direction below can be evaluated as a bounded commitment.

## Requirements
| # | Requirement | Status | Source |
| --- | --- | --- | --- |

Status is one of `Core goal`, `Must-have`, `Nice-to-have`, `Leaning yes`, `Leaning no`, `Undecided`, `Out`. Source is where it came from: a line in the frame, a spike finding, a stated constraint, or an enterprise class. Nine or fewer at the top level; group beyond that as `R3.1`, `R3.2`.

## Enterprise classes considered
One line each for roles and permissions, workflow ownership, compliance and auditability, integrations, data volume, operational complexity, and accessibility: the requirement it produced, or why it does not apply here. Never omit a class silently.

## Directions
One `###` section per direction (`A`, `B`, `C`…). For each, in this order:

1. The mechanism in two or three sentences.
2. The **version lineage table** — every version left to right, superseded ones struck through with the reason, the current one in bold. Format in `references/version-lineage.md`.
3. The **breadboard** of the current version, or a link to it, and a note if the direction deliberately has none.
4. The parts table for the current version.

| Part | What it does for whom | Flag |
| --- | --- | --- |

Parts are vertical mechanisms, never layers. `⚠️` in the flag column means the part is described but not understood.

Discarded directions keep their `###` section, struck through in the heading, with why they lost and what would revive them.

## Fit check
The complete matrix — requirements as rows, current versions as columns, `✅` or `❌` only — followed by one note per failure. Column headers carry the version number. Print it in full; never abbreviate.

## Open unknowns
Every `⚠️` still standing, the direction, version, and part it sits on, and its disposition: a spike file, or an explicit decision to carry it as a known risk.

## Selected direction
Which direction, at which version, the decisive requirement that separated it from the runner-up, and what would make the team reverse this decision.

## Cuts made to fit the time budget
What was moved to `Nice-to-have` or `Out`, which version each cut produced, what it costs, and what would justify restoring it. An empty section means no cutting was needed — say so rather than omitting the heading.

## Handoff
What `proposal` may treat as settled, what stays deliberately open for Design to decide, and which risks the proposal must state to the people deciding.
```

## Why the structure is fixed

`DIRECTIONS.md` is the working record of a decision. Its value is that someone who was not in the room can see *why* one direction won — the requirements, the failures, the versions it went through, and the cuts, not just the conclusion.

`proposal` reads this file plus `FRAMED_PROBLEM.md` and writes neither's content again from scratch. When new evidence changes the selected direction, update this document before the proposal or any dependent design work continues.
