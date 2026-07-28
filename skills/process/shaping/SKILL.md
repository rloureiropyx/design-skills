---
name: shaping
description: >-
  Explore and choose one solution shape for an already-framed problem, inside a
  fixed appetite. Use when a designer has a framed problem or a decided
  direction and needs to work out what to build; when several solution ideas
  need to be compared instead of argued about; when someone arrives with a
  solution already in mind and its requirements were never written down; when a
  solution "feels wrong" but nobody can say which requirement it misses; when
  scope must be cut to fit a fixed time budget; or when solution unknowns need
  flagging and investigating before anyone commits. Produces a Shaping document
  with numbered requirements, candidate shapes, a binary fit check, and one
  selected shape. Do NOT use it to decide what problem is worth solving,
  challenge a frame, or gather evidence about users — that is
  `problem-framing`. Do NOT use it to write the artifact a betting table reads
  — that is `design-package`. Do NOT use it for detailed interaction design,
  wireframes, visual design, acceptance criteria, or sprints.
---

# Shaping

Take a framed problem and work out **which solution shape to bet on**, at a level of detail that is concrete enough to commit to and loose enough to leave real decisions to the people who build it.

Shaping is not solution design. The goal is not the best possible solution; it is confidence that **a** viable solution exists inside the appetite, with no unresolved unknowns hiding in it. Cap the downside; leave the upside to the build.

Work collaboratively and out loud. Ask one question at a time. Show the full tables every time they change — never summarise a table you have already shown, and mark changed rows with 🟡 so the user can see what moved.

Conduct the conversation and the written artifact in the user's language.

## Preserve the boundary

**Input**: `FRAMED_PROBLEM.md`. Read it; never re-derive it. If the problem, user, outcome, or evidence turns out to be wrong, that is a finding to send back to `problem-framing` — not something to fix here.

Read the project context library named in the frame's `## Context use` section before asking the user for any fact about the product. Requirements are constrained by what the product already does, what components already exist, and what has already been decided; most of that is written down there. Where no library is named, look once for one in the working repository, and record what you find in `SHAPING.md` so `design-package` inherits it.

**Output**: `SHAPING.md` — requirements, candidate shapes, the fit check, and one selected shape with no unresolved flags.

Stop there. Do not write the design package, do not produce wireframes or hi-fi screens, do not write acceptance criteria, do not decompose the work into tickets or sprints, and do not map the system's places and affordances in detail. The next skill is `design-package`, which turns the selected shape into the artifact a stakeholder decides on.

If no `FRAMED_PROBLEM.md` exists, say so before starting. Offer two routes: run `problem-framing` first, or proceed on a stated provisional frame that must be recorded at the top of `SHAPING.md` as unverified. Never silently invent the problem.

## Notation

Fixed, because the whole method depends on being able to point at things unambiguously.

| Level | Notation | Meaning | Relationship |
| --- | --- | --- | --- |
| Requirement | `R0`, `R1`, `R2`… | What the solution must be true of | Members of one set, `R` |
| Shape | `A`, `B`, `C`… | A whole candidate solution | Pick exactly one from `S` |
| Component | `C1`, `C2`… | A part of a shape | Combine within one shape |
| Alternative | `C3-A`, `C3-B`… | Two ways to do the same component | Pick one per component |

Detailing a shape is **not** a new letter. `B` with its components worked out is still `B`. A new letter means a genuinely different approach the team could pick *instead*. Alternatives are a choice; expansion is not.

## Choose the entry point

Either end is legitimate, and most real work starts at the second:

- **From `R`** — the frame is clear and no solution is on the table yet. Populate requirements, then sketch shapes against them.
- **From `S`** — someone already has a solution in mind, in a deck, or half-built. Capture it as shape `A` without judging it, then work backwards: what would have to be true for this to be the right answer? Those are the requirements. Now other shapes can be compared against the same list.

Starting from `S` is not a failure. Refusing to extract the requirements from it is.

## Run the shaping loop

The actions below are a repertoire, not a sequence. Choose the one that reduces the most uncertainty right now, do it, show the result, and choose again. Say which action you are taking and why.

### 1. Load the frame

Read `FRAMED_PROBLEM.md` and carry forward, unchanged: the problem, the desired outcome, the primary user, the boundaries and exclusions, any `Less about / More about` guardrail, the major risks, and the time budget. Carry the open assumptions too — an assumption the frame left open is a candidate requirement or a candidate spike.

Completion criterion: the frame is loaded and quoted, not paraphrased into something new, and the appetite is either stated or explicitly recorded as undefined.

### 2. Populate the requirements

Write what must be true of any acceptable solution. A requirement is a capability or constraint, never a mechanism: *"an approver can see what is waiting on them without opening each record"*, not *"add a dashboard widget"*.

Give each one a status:

`Core goal` · `Must-have` · `Nice-to-have` · `Leaning yes` · `Leaning no` · `Undecided` · `Out`

Statuses are the scope dial. When a shape does not fit the appetite, the move is to change statuses — not to extend the time.

Never exceed nine top-level requirements. Beyond that, group them: `R3` with `R3.1`, `R3.2`. A list of twenty flat requirements cannot be reasoned about and always hides duplicates.

Seed the list from the frame, then check the enterprise classes below explicitly, because a framed problem rarely mentions them and they are the requirements that kill a shape late.

Completion criterion: every requirement is a capability or constraint with a status, no more than nine sit at the top level, and the enterprise classes have each been considered and either written as a requirement or marked not applicable with a reason.

### 3. Sketch the shapes

Produce at least two materially different shapes, three when the appetite is large. Materially different means a different mechanism, not a different arrangement of the same one.

Break each shape into **parts that a user could experience**. A part is a vertical mechanism — something that does a thing for someone. `Data model`, `API layer`, `Settings page` are horizontal layers, and a shape decomposed into layers cannot be cut, staged, or reasoned about: put the data with the feature that needs it.

Keep the resolution low deliberately. Show the mechanism, the essential elements, how they relate, and the key moments. Stop before layout, copy, and component choices — those are decisions worth leaving to Design, and specifying them here is how a shape becomes both wrong and demotivating.

Completion criterion: at least two shapes differ in mechanism, and every shape's parts are things a person could experience.

### 4. Flag what you do not know

Mark any part `⚠️` when the team can describe **what** it does but not **how** it works. That is the definition of a rabbit hole: not a risk, an absence.

A flagged part is an automatic `❌` in the fit check. You cannot claim a requirement is met by something you have not worked out. This rule is what stops shaping from producing confident nonsense, so do not soften it.

Completion criterion: every part is either understood well enough to build or carries a `⚠️`.

### 5. Run the fit check

Requirements as rows, shapes as columns, `✅` or `❌` in every cell. Nothing else — no partials, no "mostly", no `⚠️` in the matrix. Read `references/fit-check.md` before building the first one; it holds the exact format and how to write the failure notes.

If a shape passes every check and still feels wrong, a requirement is missing. That feeling is information: articulate the implicit constraint as a new `R`, then run the check again. Do not overrule the matrix.

Completion criterion: every cell is filled, every `❌` has a one-line note saying what fails, and no result contradicts anyone's judgement without a new requirement to explain it.

### 6. Spike the unknowns worth resolving

A `⚠️` on a part of a shape nobody will pick costs nothing. A `⚠️` on the leading shape has to be resolved before the shape can be selected.

Write a spike as its own file. Read `references/spikes.md` for the format. The rule that matters: a spike's acceptance criteria are phrased *"we can describe how…"*, never *"we can decide if…"*. Spikes buy understanding; the decision comes afterwards, back in the fit check.

Completion criterion: every `⚠️` on a contending shape has a spike or an explicit decision to accept it as a known risk of the bet.

### 7. Decide and emit

Select one shape. State the decisive requirement — the one that separated it from the runner-up — and what would make you reverse the decision.

Write `SHAPING.md` using the exact structure in `templates/shaping-doc.md`. Read that file before writing; it also says where to save the document.

Completion criterion: one shape is selected, it carries no unresolved `⚠️`, and the rejected shapes are kept with the reason and the evidence that would revive them.

## Appetite and variable scope

The time budget from the frame is a **constraint on the solution**, not an estimate of it. When a shape does not fit, the solution changes — never the budget.

Cutting is the skill. In order of preference: move a requirement to `Nice-to-have` or `Out`; replace a component with a cheaper alternative (`C3-B`); reduce a part to its first useful version; drop a part entirely. Record every cut in the document with what it costs, because "we decided not to" and "we forgot" look identical six weeks later.

If the frame left the appetite undefined, say plainly that no shape can be evaluated as a bounded commitment, and get a number before selecting.

## Enterprise constraints to surface

Walk these explicitly at step 2. They are the requirements a small-team method omits and an enterprise product cannot:

- **Roles and permissions** — who sees this, who acts on it, and what the same screen looks like to someone with fewer rights.
- **Workflow ownership** — whether the person who hits the problem is allowed to resolve it, or must hand it to someone else.
- **Compliance and auditability** — what must be recorded, retained, provable after the fact, or is fixed by regulation and cannot be redesigned.
- **Integrations** — what system of record this depends on, and what happens on the day it is unavailable or stale.
- **Data volume** — the shape that works for twelve rows and dies at forty thousand.
- **Operational complexity** — who supports this, and what they do when it goes wrong for one customer.
- **Accessibility** — keyboard path, focus management, screen-reader semantics, error recovery, and colour independence, written as requirements now. Accessibility discovered during Design is a scope change; accessibility written as an `R` is a constraint the shape has to satisfy.

## Readiness rule

Mark `shape-selected` only when all are true:

- `FRAMED_PROBLEM.md` was read and its problem, outcome, and boundaries are carried unchanged;
- requirements are capabilities or constraints, each with a status, nine or fewer at the top level;
- the enterprise classes have each been considered;
- at least two materially different shapes were compared;
- the fit check is complete and binary;
- the selected shape carries no unresolved `⚠️`;
- the shape fits the stated appetite, with every cut recorded;
- the decisive requirement and the reversal condition are written down;
- `SHAPING.md` is saved in the project next to `FRAMED_PROBLEM.md`.

Otherwise choose the most informative status: `spike-needed` when a flag blocks the leading shape; `appetite-undefined` when no time budget exists to evaluate against; `no-viable-shape` when every candidate fails a `Must-have` and no cut rescues it; `reframe` when shaping has shown the problem itself is wrong.

## Explain and execute the next move

- **`shape-selected`**: hand `SHAPING.md` and `FRAMED_PROBLEM.md` to `design-package`.
- **`spike-needed`**: name the spike, its questions, and what it must let the team describe. Return here when it lands.
- **`appetite-undefined`**: ask for the time budget the business is willing to spend, and say what stays undecidable without it.
- **`no-viable-shape`**: report which `Must-have` nothing satisfies. That is a real result, and it is cheaper here than in build.
- **`reframe`**: return to `problem-framing` with the specific evidence that contradicts the frame. Do not quietly redefine the problem to fit a shape you like.

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Re-deriving the problem.** The frame was decided already. Re-opening it here is how shaping turns
  into a second framing session that produces no shape at all. Send contradicting evidence back.
- **Asking the user what the product already does.** Component inventory, existing IA, current
  states, and prior proposals are in the project context library the frame names. Look before
  asking. A requirement written without knowing what already exists is usually a shape in disguise.
- **Tautological requirements.** `R: users can bulk edit` next to a shape whose mechanism is bulk edit
  proves nothing. A requirement names the capability needed; a shape names the mechanism. If the
  requirement can only be satisfied by one shape, it is that shape wearing a disguise.
- **Softening the fit check.** "Partially", "mostly", "with caveats", a `⚠️` smuggled into a cell.
  Binary is the entire value of the matrix; a half-passing shape is a shape nobody has thought through.
- **Treating a flag as a risk.** `⚠️` does not mean "risky", it means "we cannot describe how". Risks
  can be accepted. Absences have to be resolved or the bet is not a bet.
- **Decomposing into horizontal layers.** "Data model", "backend work", "the UI" are not parts. They
  cannot be cut, cannot be staged, and hide the fact that nobody has decided what the thing does.
- **Detailing a shape and calling it a new one.** `B` with components is `B`. Promoting it to `C`
  invents a choice that does not exist and makes the fit check meaningless.
- **Extending time instead of cutting scope.** The appetite is the constraint being designed against.
  A shape that "just needs another week" is a shape that failed and has not been told.
- **Designing instead of shaping.** Layouts, component names, copy, states, and edge-case behaviour
  are Design's decisions. Specifying them here removes the judgement the builders need and produces a
  shape too rigid to survive its first contact with reality.
- **Summarising tables.** Showing three of eleven requirements, or "the rest unchanged", breaks the
  user's ability to check the reasoning. Print the whole table, every time, with 🟡 on what moved.
- **Skipping the enterprise classes because the frame did not mention them.** Permissions, audit, and
  data volume are exactly the requirements that arrive late and invalidate a shape after commitment.

## Reference files

- `references/fit-check.md` — the fit-check matrix format, the binary rule, and how to write failure notes. Read at step 5.
- `references/spikes.md` — the spike file format and the acceptance-criteria convention. Read at step 6, only when a flag blocks a contending shape.
- `templates/shaping-doc.md` — the required `SHAPING.md` structure and where to save it. Read at step 7.

## Method sources

- Ryan Singer, [`rjs/shaping-skills`](https://github.com/rjs/shaping-skills) — the `shaping` skill: the `R`/`S` notation hierarchy, requirement statuses, the binary fit check, the flagged-unknown discipline, spikes with description-based acceptance criteria, parts as vertical mechanisms, and detailing as expansion rather than alternative.
- Ryan Singer, [*Shape Up*](https://basecamp.com/shapeup): fixed time and variable scope, appetite as a design constraint, rabbit holes and no-gos, and shaping at a resolution between "design a kitchen" and "here are the blueprints".
- Ryan Singer, [some solution vs. no solution](https://www.ryansinger.co/some-solution-vs-no-solution/) and [shaping on the demand side](https://www.ryansinger.co/shaping-on-the-demand-side/): the aim is knowing that a viable solution exists, not proving one is optimal, and shaping legitimately runs in both directions between problem and solution.

The enterprise requirement classes and the accessibility-as-requirement rule are additions, not Singer's. His method assumes a small autonomous team; enterprise B2B work does not get to.
