---
name: shaping
description: >-
  Explore two or three solution directions for an already-framed problem and
  pick one, inside a fixed time budget. Use when a designer has a framed problem
  and needs to work out what to build; when several ideas, options, or proposals
  need to be compared instead of argued about; when someone arrives with a
  solution already in mind and nobody wrote down what it has to do; when a
  solution "feels wrong" but nobody can say which requirement it misses; when an
  idea needs improving across several versions; or when scope must be cut to fit
  a fixed time budget. Writes `DIRECTIONS.md` — requirements, candidate
  directions with their version history, a binary fit check, and one selected
  direction. Do NOT use it to decide which problem is worth solving, challenge a
  frame, or gather evidence about users — that is `problem-framing`. Do NOT use
  it to write the document people sign off on — that is `proposal`. Do NOT use
  it for detailed interaction design, visual design, acceptance criteria, or
  sprint planning.
---

# Shaping

Take a framed problem and work out **which solution direction to go with**. Concrete enough to commit to, loose enough to leave real decisions to the people who build it.

This is not solution design. The goal is not the best possible solution; it is confidence that **a** workable one exists inside the time budget, with no unresolved unknowns hiding in it.

Work out loud. Ask one question at a time. Show the full tables every time they change — never summarise a table you have already shown, and mark changed rows with 🟡 so the user can see what moved.

Conduct the conversation and the written document in the user's language.

## Preserve the boundary

**Input**: `FRAMED_PROBLEM.md`. Read it; never re-derive it. If the problem, user, outcome, or evidence turns out to be wrong, that is a finding to send back to `problem-framing` — not something to fix here.

Read the project context library named in the frame's `## Context use` section before asking the user for any fact about the product. Requirements are constrained by what the product already does, what components exist, and what has already been decided, and most of that is written down. Where no library is named, look once in the working repository and record what you find in `DIRECTIONS.md` so `proposal` inherits it.

**Output**: `DIRECTIONS.md` — requirements, candidate directions, the fit check, and one selected direction with no unresolved flags.

Stop there. Do not write the proposal, do not produce hi-fi screens, do not write acceptance criteria, and do not break the work into tickets or sprints. The next skill is `proposal`, which turns the selected direction into the document people sign off on.

If no `FRAMED_PROBLEM.md` exists, say so before starting. Offer two routes: run `problem-framing` first, or proceed on a stated provisional frame that gets recorded at the top of `DIRECTIONS.md` as unverified. Never silently invent the problem.

## Notation

Fixed, because the whole thing depends on being able to point at something unambiguously.

| Level | Notation | Meaning | Relationship |
| --- | --- | --- | --- |
| Requirement | `R0`, `R1`, `R2`… | What the solution must be true of | Members of one set, `R` |
| Direction | `A`, `B`, `C`… | A whole candidate solution | Pick exactly one |
| Version | `A1`, `A2`, `A3`… | The same direction, improved | Left to right; the last live one is current |
| Part | `C1`, `C2`… | A piece of a direction | Combine within one direction |
| Alternative | `C3-A`, `C3-B`… | Two ways to do the same part | Pick one per part |

**A new letter means a different mechanism. A new number means the same mechanism, improved.** Working out the details of `B` does not make it `C`; it makes it `B2`. Getting this wrong invents choices that do not exist and makes the fit check meaningless.

## Choose the entry point

Either end works, and most real work starts at the second:

- **From `R`** — the frame is clear and no solution is on the table. Populate requirements, then sketch directions against them.
- **From a solution** — someone already has one in mind, in a deck, or half-built. Capture it as direction `A1` without judging it, then work backwards: what would have to be true for this to be the right answer? Those are the requirements. Now other directions can be compared against the same list.

Starting from a solution is not a failure. Refusing to extract the requirements from it is.

## Run the loop

The actions below are a repertoire, not a sequence. Pick the one that reduces the most uncertainty right now, do it, show the result, and pick again. Say which one you are doing and why.

### 1. Load the frame

Read `FRAMED_PROBLEM.md` and carry forward, unchanged: the problem, the desired outcome, the primary user, the boundaries and exclusions, any `Less about / More about` guardrail, the major risks, and the time budget. Carry the open assumptions too — an assumption the frame left open is a candidate requirement or a candidate spike.

Completion criterion: the frame is loaded and quoted, not paraphrased into something new, and the time budget is either stated or explicitly recorded as undefined.

### 2. Populate the requirements

Write what must be true of any acceptable solution. A requirement is a capability or a constraint, never a mechanism: *"an approver can see what is waiting on them without opening each record"*, not *"add a dashboard widget"*.

Give each one a status:

`Core goal` · `Must-have` · `Nice-to-have` · `Leaning yes` · `Leaning no` · `Undecided` · `Out`

Statuses are the scope dial. When a direction does not fit the time budget, the move is to change statuses — not to extend the time.

Never exceed nine top-level requirements. Beyond that, group them: `R3` with `R3.1`, `R3.2`. Twenty flat requirements cannot be reasoned about and always hide duplicates.

Seed the list from the frame, then check the enterprise classes below explicitly. A framed problem rarely mentions them, and they are the requirements that kill a direction late.

Completion criterion: every requirement is a capability or constraint with a status, no more than nine at the top level, and each enterprise class has been either written as a requirement or marked not applicable with a reason.

### 3. Sketch the directions

Produce at least two materially different directions, three when the time budget is large. Materially different means a different mechanism, not a different arrangement of the same one.

Break each into **parts a person could experience**. A part is a vertical mechanism — something that does a thing for someone. `Data model`, `API layer`, `Settings page` are horizontal layers, and a direction split into layers cannot be cut, staged, or reasoned about. Put the data with the feature that needs it.

Make each direction concrete with a **breadboard** — places, affordances, and connection lines, in text. That is the `breadboarding` skill; call it rather than describing the mechanism in prose alone. A breadboard is fast, forces you to name every affordance, and is the reason a `⚠️` becomes visible at this step instead of at the fit check.

Reach for wireframes only when layout is genuinely the question the direction turns on — different information density, a comparison that only works spatially. Wireframes here usually mean the resolution has crept: they invite feedback about spacing and copy, which are decisions this step is supposed to leave open.

Keep the resolution low on purpose. Show the mechanism, the essential elements, how they relate, and the key moments. Stop before layout, copy, and component choices.

If any of this gets drawn on a canvas — an options board, an alternatives table, the fit check — read `references/directions-board.md` first and hand the renderer that encoding. A renderer left to its own palette will invent one, and the mark that means "decided" stops meaning it.

Completion criterion: at least two directions differ in mechanism, each has a breadboard or an explicit reason it does not need one, and every part is something a person could experience.

### 4. Flag what you do not know

Mark any part `⚠️` when the team can describe **what** it does but not **how** it works. That is a rabbit hole: not a risk, an absence.

A flagged part is an automatic `❌` in the fit check. You cannot claim a requirement is met by something nobody has worked out. This rule is what stops shaping from producing confident nonsense, so do not soften it.

Completion criterion: every part is either understood well enough to build or carries a `⚠️`.

### 5. Run the fit check

Requirements as rows, directions as columns, `✅` or `❌` in every cell. Nothing else — no partials, no "mostly", no `⚠️` in the matrix. Read `references/fit-check.md` before building the first one; it holds the exact format and how to write the failure notes.

The matrix always runs against the **current version** of each live direction. Superseded versions are history, not columns.

If a direction passes everything and still feels wrong, a requirement is missing. That feeling is information: write the implicit constraint as a new `R`, then run the check again. Do not overrule the matrix.

Completion criterion: every cell is filled, every `❌` has a one-line note saying what fails, and no result contradicts someone's judgement without a new requirement to explain it.

### 6. Improve a direction into its next version

A fit check that fails is not a verdict, it is a brief. When a direction fails a requirement you care about, try to fix it: that produces a new version, not a new direction.

Read `references/version-lineage.md` before the first version bump. The rules that matter:

- A version records **what changed and why**, next to the version it replaced. `A1 → A2 → A3` reads left to right.
- A superseded version stays visible, struck through, with the reason. Never delete or overwrite one — six weeks later "we decided not to" and "we forgot" look identical.
- Only the current version of each live direction appears in the fit check.
- Discarding a whole direction is the same move at the letter level: strike it, say why, and say what would revive it.

Iterating is normal and cheap. Three versions of `A` that each fix a named failure is a better record than one version that quietly absorbed all three.

On a canvas the same rule is a timeline: close the finished iteration with a vertical rule, run the next one to its right, and keep the decisions inside the band they were taken in. `references/directions-board.md` has the layout.

Completion criterion: every version has a reason and a diff from the version before it, and no version was silently overwritten.

### 7. Spike the unknowns worth resolving

A `⚠️` on a direction nobody will pick costs nothing. A `⚠️` on the leading direction has to be resolved before it can be selected.

Write a spike as its own file. Read `references/spikes.md` for the format. The rule that matters: a spike's acceptance criteria are phrased *"we can describe how…"*, never *"we can decide if…"*. Spikes buy understanding; the decision comes afterwards, back in the fit check.

Completion criterion: every `⚠️` on a contending direction has a spike or an explicit decision to carry it as a known risk.

### 8. Decide and write it up

Select one direction, at a named version. State the decisive requirement — the one that separated it from the runner-up — and what would make you reverse the decision.

Write `DIRECTIONS.md` using the structure in `templates/directions-doc.md`. Read that file before writing; it also says where to save the document.

Completion criterion: one direction at one version is selected, it carries no unresolved `⚠️`, and the discarded directions and superseded versions are kept with their reasons and what would revive them.

## Time budget and variable scope

The time budget from the frame is a **constraint on the solution**, not an estimate of it. When a direction does not fit, the solution changes — never the budget.

Cutting is the skill. In order of preference: move a requirement to `Nice-to-have` or `Out`; replace a part with a cheaper alternative (`C3-B`); reduce a part to its first useful version; drop a part entirely. Every cut becomes a new version of the direction, with what it costs recorded.

If the frame left the time budget undefined, say plainly that no direction can be evaluated as a bounded commitment, and get a number before selecting.

## Enterprise constraints to surface

Walk these explicitly at step 2. They are the requirements a small-team method omits and an enterprise product cannot:

- **Roles and permissions** — who sees this, who acts on it, and what the same screen looks like to someone with fewer rights.
- **Workflow ownership** — whether the person who hits the problem is allowed to resolve it, or must hand it to someone else.
- **Compliance and auditability** — what must be recorded, retained, provable after the fact, or is fixed by regulation and cannot be redesigned.
- **Integrations** — what system of record this depends on, and what happens on the day it is unavailable or stale.
- **Data volume** — the direction that works for twelve rows and dies at forty thousand.
- **Operational complexity** — who supports this, and what they do when it goes wrong for one customer.
- **Accessibility** — keyboard path, focus management, screen-reader semantics, error recovery, and colour independence, written as requirements now. Accessibility discovered during Design is a scope change; accessibility written as an `R` is a constraint the direction has to satisfy.

## Readiness rule

Mark `direction-selected` only when all are true:

- `FRAMED_PROBLEM.md` was read and its problem, outcome, and boundaries are carried unchanged;
- requirements are capabilities or constraints, each with a status, nine or fewer at the top level;
- each enterprise class has been considered;
- at least two materially different directions were compared;
- every version has a reason and every discard has one;
- the fit check is complete, binary, and run against current versions;
- the selected version carries no unresolved `⚠️`;
- it fits the stated time budget, with every cut recorded;
- the decisive requirement and the reversal condition are written down;
- `DIRECTIONS.md` is saved next to `FRAMED_PROBLEM.md`.

Otherwise choose the most informative status: `spike-needed` when a flag blocks the leading direction; `budget-undefined` when there is no time budget to evaluate against; `no-viable-direction` when every candidate fails a `Must-have` and no cut rescues it; `reframe` when this work has shown the problem itself is wrong.

## Explain and execute the next move

- **`direction-selected`**: hand `DIRECTIONS.md` and `FRAMED_PROBLEM.md` to `proposal`.
- **`spike-needed`**: name the spike, its questions, and what it must let the team describe. Return here when it lands.
- **`budget-undefined`**: ask for the time budget the business is willing to spend, and say what stays undecidable without it.
- **`no-viable-direction`**: report which `Must-have` nothing satisfies. That is a real result, and it is cheaper here than in build.
- **`reframe`**: return to `problem-framing` with the specific evidence that contradicts the frame. Do not quietly redefine the problem to fit a direction you like.

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Re-deriving the problem.** The frame was decided already. Re-opening it here turns this into a second
  framing session that produces no direction at all. Send contradicting evidence back instead.
- **Asking the user what the product already does.** Component inventory, existing IA, current states, and
  prior proposals are in the project context library the frame names. Look before asking. A requirement
  written without knowing what exists is usually a solution in disguise.
- **Tautological requirements.** `R: users can bulk edit` next to a direction whose mechanism is bulk edit
  proves nothing. A requirement names the capability needed; a direction names the mechanism. If only one
  direction can ever satisfy it, it is that direction wearing a disguise.
- **Softening the fit check.** "Partially", "mostly", "with caveats", a `⚠️` smuggled into a cell. Binary
  is the whole point; a half-passing direction is one nobody has thought through.
- **Treating a flag as a risk.** `⚠️` does not mean "risky", it means "we cannot describe how". Risks can
  be accepted. Absences have to be resolved.
- **Splitting into horizontal layers.** "Data model", "backend work", "the UI" are not parts. They cannot
  be cut, cannot be staged, and hide the fact that nobody has decided what the thing does.
- **Promoting a version to a new letter.** `A` with its details worked out is `A2`, not `B`. A new letter
  invents a choice that does not exist.
- **Overwriting a version.** Editing `A2` in place loses the reason `A1` failed, which is the only record
  of why the current version looks the way it does. Add `A3`; strike `A2`.
- **Deleting a discarded direction.** A direction removed without a reason gets re-proposed by someone
  else three weeks later, and nobody remembers why it lost.
- **Extending time instead of cutting scope.** A direction that "just needs another week" is one that
  failed and has not been told.
- **Wireframing instead of breadboarding.** A wireframe invites feedback about layout and copy, which are
  decisions this step leaves open. Breadboard first; wireframe only when layout is the actual question.
- **Designing instead of shaping.** Layouts, component names, copy, states, and edge-case behaviour are
  Design's decisions. Specifying them here removes the judgement the builders need and produces something
  too rigid to survive its first contact with reality.
- **Summarising tables.** Showing three of eleven requirements, or "the rest unchanged", breaks the user's
  ability to check the reasoning. Print the whole table, every time, with 🟡 on what moved.
- **Letting the renderer pick the encoding.** A canvas skill's generic palette reads violet as "insight or
  opportunity", so a supporting note lands in the colour this method reserves for the decision, and the
  board stops saying which one was made. Hand over the encoding in `references/directions-board.md`.
- **Redrawing the board each iteration.** A board that only shows its current state loses every reason it
  got there. Close the finished iteration with a rule, run the next to its right, keep the old bands dimmed.
- **Starring a winner per requirement.** On a fit check the best cell in each row assembles a direction
  nobody has costed or can build. Per-row selection belongs to parts and their alternatives; the fit check
  selects once, at the column level, on a whole direction.
- **Skipping the enterprise classes because the frame did not mention them.** Permissions, audit, and data
  volume are exactly the requirements that arrive late and invalidate a direction after everyone agreed.

## Reference files

- `references/fit-check.md` — the matrix format, the binary rule, and how to write failure notes. Read at step 5.
- `references/version-lineage.md` — how versions are recorded, superseded, and discarded. Read at step 6, before the first version bump.
- `references/directions-board.md` — the canvas encoding: note colours, row rules, the selection column, and iterations as a left-to-right timeline. Read at step 3, before anything here is drawn on a canvas.
- `references/spikes.md` — the spike file format and the acceptance-criteria convention. Read at step 7, only when a flag blocks a contending direction.
- `templates/directions-doc.md` — the required `DIRECTIONS.md` structure and where to save it. Read at step 8.

## Method sources

- Ryan Singer, [`rjs/shaping-skills`](https://github.com/rjs/shaping-skills) — the `R`/`S` notation hierarchy, requirement statuses, the binary fit check, the flagged-unknown discipline, spikes with description-based acceptance criteria, parts as vertical mechanisms, and detailing as expansion rather than alternative.
- Ryan Singer, [*Shape Up*](https://basecamp.com/shapeup): fixed time and variable scope, the time budget as a design constraint, rabbit holes and no-gos, and working at a resolution between "design a kitchen" and "here are the blueprints".
- Ryan Singer, [some solution vs. no solution](https://www.ryansinger.co/some-solution-vs-no-solution/) and [shaping on the demand side](https://www.ryansinger.co/shaping-on-the-demand-side/): the aim is knowing a workable solution exists, not proving one is optimal, and this work legitimately runs in both directions between problem and solution.

The version lineage, the enterprise requirement classes, and the accessibility-as-requirement rule are additions, not Singer's. His method assumes a small autonomous team; enterprise B2B work does not get to.
