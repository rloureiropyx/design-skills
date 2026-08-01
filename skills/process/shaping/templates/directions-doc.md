# DIRECTIONS.md structure

Read this at step 10, when writing the document. Use the top-level headings below exactly, so `proposal` — or a person — can read the file without parsing prose.

Write in the user's language. Save it beside `FRAMED_PROBLEM.md`: the project's documentation directory when one exists, the project root otherwise. Update this same file on later passes — one current source of truth, never a second copy.

```markdown
# Directions: <working title>

## Status
`direction-selected | spike-needed | budget-undefined | no-viable-direction | reframe`

## Frame carried forward
The problem, desired outcome, primary user, boundaries, exclusions, and any `Less about / More about` guardrail — copied from `FRAMED_PROBLEM.md`, not rewritten. Link the source file. If no framed problem exists, say so here and mark this section `provisional — unverified`.

## Time budget
The fixed build time the business has chosen to invest, and where that number came from. If undefined, say so and state that no direction below can be evaluated as a bounded commitment.

## Product surface
Where this lives, in one line each: host application and shell, arrival (embedded, own tab, own window, mobile), viewport targets and which is primary, navigation model, design system and whether new components are allowed, third-party or vendor surfaces. Anything not established says `unknown` — never a guess. End with the sources: every context file, screenshot, and URL used, cited by path.

## Fixed surfaces
What is not up for change, and what somebody would rather we did not touch.

| Surface | Tier | Owner | Why | Source |
| --- | --- | --- | --- | --- |

Tier is `Fixed`, `Preferred`, or `Open`. `Open` is the default; `Fixed` and `Preferred` need an owner and a reason or they cannot be challenged. Every `Fixed` surface has a matching constraint requirement below. If a tier changed during this work, say which, when, and who reopened it.

## Requirements
**R-set v1**

| # | Requirement | Status | Source |
| --- | --- | --- | --- |

Status is one of `Core goal`, `Must-have`, `Nice-to-have`, `Leaning yes`, `Leaning no`, `Undecided`, `Out`. Source is where it came from: a line in the frame, a spike finding, a stated constraint, a `Fixed` surface, or an enterprise class. Nine or fewer at the top level; group beyond that as `R3.1`, `R3.2`. Retired requirements stay in this table, struck through.

## Requirement changelog

| R-set | Requirement | Change | Why | Trigger |
| --- | --- | --- | --- | --- |

One row per `Added`, `Changed`, or `Retired`. The trigger names what exposed it — a direction and version, a wireframe, a fit-check row, a spike. An empty section means the set never moved; say so rather than omitting the heading. Format in `references/version-lineage.md`.

## Enterprise classes considered
One line each for roles and permissions, workflow ownership, compliance and auditability, integrations, data volume, operational complexity, and accessibility: the requirement it produced, or why it does not apply here. Never omit a class silently.

## Directions
One `###` section per direction (`A`, `B`, `C`…). For each, in this order:

1. The mechanism in two or three sentences.
2. The **version lineage table** — every version left to right, superseded ones struck through with the reason, the current one in bold. Format in `references/version-lineage.md`.
3. The **breadboard** of the current version, or a link to it.
4. The **wireframe** of the current version, or a link to it, at L1 or L2. Say which viewport it was drawn at and which parts differ from the evidence row.
5. Any `Preferred` surface this direction moves, and what that costs.
6. The parts table for the current version.

| Part | What it does for whom | Flag |
| --- | --- | --- |

Parts are vertical mechanisms, never layers. `⚠️` in the flag column means the part is described but not understood.

Discarded directions keep their `###` section, struck through in the heading, with why they lost and what would revive them. They keep one wireframe frame carrying the verdict, not a working set.

## Fit check
**R-set vN.** The complete matrix — requirements as rows, current versions as columns, `✅` or `❌` only — followed by one note per failure. Column headers carry the version number. Print it in full; never abbreviate.

Superseded matrices stay below the current one, marked stale with the R-set they ran against. Never edit one to match a requirement that changed after it ran.

## Open unknowns
Every `⚠️` still standing, the direction, version, and part it sits on, and its disposition: a spike file, or an explicit decision to carry it as a known risk.

## Selected direction
Which direction, at which version, the decisive requirement that separated it from the runner-up, and what would make the team reverse this decision.

## Cuts made to fit the time budget
What was moved to `Nice-to-have` or `Out`, which version each cut produced, what it costs, and what would justify restoring it. An empty section means no cutting was needed — say so rather than omitting the heading.

## Handoff
What `proposal` may treat as settled, what stays deliberately open for Design to decide, which surfaces the proposal must state as fixed and never in play, the cost of any `Preferred` surface the selected direction moves and who has to agree to it, and which risks the proposal must state to the people deciding.

## Artifacts
Where the board, the wireframes, and the breadboards were rendered, with paths or links — or an explicit line saying they were not rendered and why. `Not rendered — the document is the artifact` is a valid entry; an omitted section is not.
```

## Why the structure is fixed

`DIRECTIONS.md` is the working record of a decision. Its value is that someone who was not in the room can see *why* one direction won — the surfaces that were never in play, the requirements and how they changed, the failures, the versions it went through, and the cuts, not just the conclusion.

`proposal` reads this file plus `FRAMED_PROBLEM.md` and writes neither's content again from scratch. When new evidence changes the selected direction, update this document before the proposal or any dependent design work continues.
