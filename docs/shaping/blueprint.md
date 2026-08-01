# Blueprint — `shaping`

How the skill actually runs: every step, what it needs, what it produces, and when it is allowed to
move on. For the plain-language version, read [`README.md`](README.md). For the skill itself, read
[`skills/process/shaping/SKILL.md`](../../skills/process/shaping/SKILL.md).

## The two entry points

| You arrive with | Where you start | What happens |
| --- | --- | --- |
| A framed problem and no solution | Step 1 | Load the frame, populate requirements, sketch directions against them |
| A solution somebody already has | Step 4, then back to 3 | Capture it as `A1` without judging it, then work backwards: what would have to be true for this to be the right answer? Those are the requirements |

Starting from a solution is normal. Refusing to extract the requirements from it is the failure.

If no `FRAMED_PROBLEM.md` exists, the skill says so before starting and offers two routes: run
`problem-framing` first, or proceed on a stated provisional frame recorded as unverified at the top of
`DIRECTIONS.md`. It never silently invents the problem.

## The steps

| # | Step | Input | Question it answers | Output | Completion criterion | Reference |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Load the frame | `FRAMED_PROBLEM.md` | What was already decided about the problem? | Frame carried forward, quoted | The frame is quoted not paraphrased, and the time budget is stated or explicitly undefined | — |
| 2 | Load the product surface | Context library, screenshots, the frame's boundaries, a constraint registry if one exists | Where does this live, and what is not up for change? | `## Product surface`, `## Fixed surfaces` | Seven topics recorded or marked unknown; every source cited; no `Fixed` surface without an owner and a reason | `references/ui-context.md` |
| 3 | Populate the requirements | The frame, the fixed surfaces, the enterprise classes | What must be true of any acceptable solution? | `## Requirements`, stamped `R-set v1` | Capabilities or constraints only, each with a status, ≤9 at the top level; one constraint requirement per `Fixed` surface; every enterprise class written or marked N/A | — |
| 4 | Sketch the directions | The requirements, the product surface | What are two or three genuinely different ways of doing this? | Directions with parts, a breadboard each, a wireframe each | ≥2 differ in mechanism; every part is something a person could experience; every direction has a breadboard **and** an L1/L2 wireframe | `references/directions-board.md`, `references/ui-context.md` |
| 5 | Flag what you do not know | The directions | Which parts can we name but not describe? | `⚠️` on parts | Every part is either understood well enough to build or flagged | — |
| 6 | Run the fit check | Requirements × current versions | Which directions actually satisfy the list? | A binary matrix, stamped `R-set vN` | Every cell filled; every `❌` has a note; the matrix carries its R-set version | `references/fit-check.md` |
| 7 | Improve a direction | A failed cell you care about | What would have to change for this to pass? | `A1 → A2`, with the reason | Every version has a reason and a diff; nothing overwritten | `references/version-lineage.md` |
| 8 | Revise the requirement set | A requirement that is missing, wrong, or a direction in disguise | Was the list itself right? | `R-set v1 → v2` + `## Requirement changelog` | Every change has a reason **and a trigger**; nothing silently edited; every live fit check runs against the current set | `references/version-lineage.md` |
| 9 | Spike the unknowns | A `⚠️` on a contending direction | What would let us describe how this works? | A spike file | Every `⚠️` on a contender has a spike or an explicit decision to carry it as a known risk | `references/spikes.md` |
| 10 | Decide and write it up | Everything above | Which direction, at which version, and why not the runner-up? | `DIRECTIONS.md` | One direction at one version; no unresolved `⚠️`; no `Fixed` surface changed; discards, superseded versions and retired requirements all kept with reasons | `templates/directions-doc.md` |
| 11 | Choose what to render | `DIRECTIONS.md` | What becomes the shareable artifact? | A board, wireframes, breadboards, all three, or nothing | The question was asked and the answer — including "not rendered" — is recorded under `## Artifacts` | `references/directions-board.md` |

Steps 4 to 9 are a loop. The arrows back to the fit check are the normal case: a direction that passes
on the first pass usually means the directions were not materially different.

## The two automatic failures

Both exist to stop the fit check producing confident nonsense, and neither is negotiable.

| Condition | Result | Why |
| --- | --- | --- |
| The part carries a `⚠️` | `❌` | A requirement cannot be met by something nobody can describe. An absence is not a risk; risks can be priced and accepted |
| The direction changes a `Fixed` surface | `❌` | A requirement cannot be met by something the team is not allowed to do. "With vendor agreement" is a request to people who are not in the room |

A `Preferred` surface is the deliberate middle: changing one **passes**, and the cost travels with it
into the direction's notes, the handoff, and the proposal.

## Reference load order

```
step 2   references/ui-context.md          seven intake topics · fidelity from evidence · the ledger
step 4   references/directions-board.md    colour · layout · rows · the evidence row · frame naming
step 6   references/fit-check.md           the matrix format · the binary rule · failure notes
step 7   references/version-lineage.md     direction versions · discarding
step 8   references/version-lineage.md     R-set versions · the changelog · stale matrices
step 9   references/spikes.md              only when a flag blocks a contender
step 10  templates/directions-doc.md       the DIRECTIONS.md structure and where to save it
step 11  references/directions-board.md    re-read for the layout before rendering
```

Nothing in `references/` is loaded speculatively. Each one has a step and a reason.

## Status, and what to do about it

| Status | Means | Next move |
| --- | --- | --- |
| `direction-selected` | One direction at one version, no unresolved flags, fits the budget | Ask what to render, then hand `DIRECTIONS.md` and `FRAMED_PROBLEM.md` to `proposal` |
| `spike-needed` | A `⚠️` blocks the leading direction | Name the spike, its questions, and what it must let the team describe. Return here when it lands |
| `budget-undefined` | No time budget to evaluate against | Ask what the business is willing to spend, and say what stays undecidable without it |
| `no-viable-direction` | Every candidate fails a `Must-have` and no cut rescues it | Report which requirement nothing satisfies. That is a real result, and it is cheaper here than in build |
| `reframe` | This work showed the problem itself is wrong | Return to `problem-framing` with the specific contradicting evidence. Do not quietly redefine the problem to fit a direction you like |

## Where the boundaries are

| Against | The line |
| --- | --- |
| `problem-framing` | It decides which problem is worth solving and what the evidence is. Shaping carries that unchanged; contradicting evidence goes back rather than being fixed here |
| `breadboarding` | It makes a mechanism legible in words. Shaping calls it once per direction and decides between the results; breadboarding never decides |
| `wireframes` | It owns the wireframing discipline. Shaping calls it at a hard L1/L2 cap, for comparison. Detailed interaction design, states, and copy come after the decision |
| `proposal` | It writes the document people sign off on. Shaping stops at the selected direction and the record of why |
| `tldraw-skill` | It draws. Shaping hands it the encoding and the layout so the marks keep their meaning |

Shaping does not write acceptance criteria, produce hi-fi screens, or break work into tickets and
sprints. Those remove the judgement the people building it need.

## What the loop costs

Worth being honest about, because two rules here buy their value with time.

**A wireframe for every direction is slower than a breadboard for every direction.** It is the right
trade when the direction turns on layout — which shell, which entry point, which density — and that is
most enterprise work. Three things keep the cost down: the breadboard comes first, so the drawing has
nothing to invent; the evidence row is drawn once and inherited; and a discarded direction gets one
frame, not a working set.

**The L1/L2 cap is the whole safeguard.** A mandatory wireframe is a standing invitation to polish it,
and polish moves the conversation onto spacing and wording — the decisions this skill exists to leave
open. The cap is a completion criterion and an anti-pattern rather than advice, for that reason.
