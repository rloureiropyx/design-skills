# Scene Script — Pick a Direction

**Goal:** G1 — explain how something works.
**Tone:** T1 — plain and direct.
**Opening tension:** A team agrees on the problem but holds two different solutions, and nothing written down says which one the solution has to satisfy.
**Top identification:** Name `shaping` as a product design skill in the hero, before scene 1.
**Final payoff:** The reader can describe the method. Requirements are written as capabilities and numbered, directions are scored against them in a binary fit check, unknowns are flagged instead of assumed, and the time budget stays fixed while scope moves. It ends with one direction at one version and an honest status.
**Audience:** Product designers, PMs, and engineering leads in enterprise B2B. Some know Shape Up by reputation. None know this skill, and they work under constraints the original method never covered: roles, auditability, integrations, data volume.
**Estimated reading time:** 4–5 minutes.
**Proposed pattern:** Sticky graphic + discrete steps throughout, since each beat is one rule with its own diagram state. Static prose bridges carry the longer detail between beats.

| # | VISUAL — diagram state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 1 · The tension | **Two answers, no test.** A settled problem box in blue at the top. Two solution nodes in slate branch from it, each labelled (guided wizard, batch endpoint). Between them an empty slate box with no marks in it. | A team agrees on the problem. One person wants a guided wizard, another wants a batch endpoint. Both are real answers to it, and nothing written down says which one the solution has to satisfy. | Opens the sequence. |
| 2 · Carries the frame | **In and out.** `FRAMED_PROBLEM.md` in blue flows into a shaping box. `DIRECTIONS.md` flows out the other side. A coral return arrow labelled "contradicts the frame" loops back toward problem-framing. | Shaping starts from `FRAMED_PROBLEM.md` and carries it forward word for word. It does not re-open the problem, the user, or the outcome. If the work turns up evidence that the frame is wrong, that goes back to `problem-framing`. What comes out is one file, `DIRECTIONS.md`. | The two solution nodes fall away and the frame slides in from the left. |
| 3 · Requirements | **A numbered list.** Rows `R0`–`R5` in slate, each carrying a status pill: Core goal, Must-have, Nice-to-have, Out. | The first move is writing down what any solution has to be true of. Each one is a capability or a constraint, never a mechanism, and it gets a number. Each also gets a status, from Core goal down to Out, and that status is the scope dial. Nine at the top level is the ceiling. | The frame unfolds into a numbered list. |
| 4 · Enterprise classes | **The list extends.** Five more rows arrive below the first set in amber: roles and permissions, audit trail, system of record, data volume, accessibility. | A framed problem rarely mentions who is allowed to act, what has to be logged, or how a direction behaves at forty thousand rows. Shaping walks a fixed list of these before any direction is drawn. Each one becomes a requirement or a recorded non-requirement. These are the constraints that invalidate a direction late, after everyone has agreed. | The list grows downward and the new rows arrive in amber. |
| 5 · Two directions | **Different mechanisms.** The requirement list shrinks to a rail on the left. Two slate cards deal out beside it, Direction A and Direction B, each with a one-line "gives up" caption. | Now come the directions, and there have to be at least two that differ in mechanism. Fixing the run at the moment it breaks is one mechanism. Moving the work earlier so the run opens clean is another. A rearrangement of the same idea is not a second direction. | The list collapses to a rail and two cards deal out beside it. |
| 6 · Parts, not layers | **Vertical against horizontal.** Left: three horizontal bands (UI, API, database) with a coral cut line struck through them. Right: three vertical parts, one lifted clear while the other two keep standing. | Each direction breaks into parts, and how you split it decides whether it can be cut later. UI, API, and database are layers, and nothing works until all three ship. Split into things a person can do, like detect a blocker or gate the close, and one part can be dropped while the rest still stand. | Direction A opens into the two-sided comparison. |
| 7 · Flag the unknown | **One part lights amber.** The vertical parts re-form; one carries a warning flag and a callout reading "what, not how". | Every part gets one test. Can the team describe how it works, not just what it does? A part that fails gets a flag, and a flag counts as a failure in the check that follows. It marks missing work, so it cannot be accepted the way a risk can. | The comparison resolves back to one direction's parts and one turns amber. |
| 8 · The fit check | **Binary matrix.** Requirements as rows, directions as columns, every cell a green pass mark or a coral fail mark. The flagged part's row reads as a fail. | The fit check scores every direction against every requirement. Each cell is a pass or a fail, and there is no third value. That constraint is the point, because a three-way scale lets every direction look respectable and settles nothing. When a direction passes everything and still feels wrong, a requirement is missing, so name it and run the check again. | The parts and the requirement rail converge into a grid; marks fill column by column. |
| 9 · Time and scope | **Fixed bar, moving scope.** A time bar with a hard boundary. A scope bar overruns it in coral, one requirement drops to Out, and the scope bar settles inside the boundary in green. The version label ticks from `A2` to `A3`. | The time budget comes from the frame. It is the spend the business committed to, set before anyone estimated the work. When the chosen direction does not fit, scope moves and the deadline holds. Each cut becomes a new version, so the reason it was made survives. | The matrix recedes and the time bar draws in with its overrun showing. |
| 10 · The exit | **Five statuses.** A short list: `direction-selected`, `spike-needed`, `budget-undefined`, `no-viable-direction`, `reframe`. One entry lights violet; the rest stay live. | Shaping ends by selecting one direction at one version, and by naming the requirement that separated it from the runner-up. When an unknown still blocks the leading direction, the honest exit is `spike-needed`, not a selection. When every candidate fails a Must-have, that result is worth more than a forced pick. The file that records all of it is `DIRECTIONS.md`. | The time bar collapses into the status list and one entry lights. |

## Static prose bridges

- **Before scene 1:** what shaping is and where it sits. It runs between knowing which problem to solve and knowing what to build, and it ends with one solution direction and the reasoning that picked it, not with wireframes.
- **After scene 3:** requirements read as tests, not features. "Users can see blockers" is a feature. "A payroll admin can tell, before the run starts, whether it will fail" is a test a direction either passes or fails.
- **After scene 5:** each direction is made concrete with a breadboard — places, affordances, and connection lines, written in text — so the fit check runs against a mechanism instead of a paragraph. That is the `breadboarding` skill.
- **After scene 8:** version lineage. A failed check is a brief, not a verdict. Fixing the failing part produces `A2`, then `A3`; a new letter is kept for a genuinely different mechanism. Superseded versions stay in the document, struck through with the reason, and only the current version appears in the matrix.
- **After scene 9:** spikes. A flagged unknown on a leading direction gets one bounded investigation, with acceptance criteria phrased as *"we can describe how…"* rather than *"we can decide if…"*. The spike buys understanding; the decision happens afterwards, back in the fit check.
- **Before the closing:** the handoff. Shaping passes `DIRECTIONS.md` and `FRAMED_PROBLEM.md` to `proposal`, and leaves layout, copy, component choices, and edge cases open for Design to decide.

## Diagram system

Native inline SVG, editorial systems-diagram language, no decorative imagery. Every state has a text equivalent in the scene copy.

1. **Two-answer standoff** — settled problem, two solutions, an empty test between them.
2. **Frame handoff** — the frame in, the document out, the contradiction path back.
3. **Requirement list** — the recurring motif, numbered rows with status pills.
4. **Enterprise extension** — the same list, extended in amber.
5. **Direction cards** — two candidates, each with what it gives up.
6. **Layers versus parts** — horizontal bands cut through, vertical parts one lifted clear.
7. **Flagged part** — the warning flag and its callout.
8. **Fit-check matrix** — requirements by directions, pass and fail marks only.
9. **Time and scope bars** — fixed boundary, scope moving inside it, version ticking up.
10. **Status list** — the five exits, one selected.

## Art direction

- **Graphic language:** editorial systems diagrams with clear labels and visible connections, matching the `problem-framing` article so the library reads as one publication.
- **Colour semantics (house brief):** blue is input and narrative (the frame), green is a settled or valid state (a pass), coral is failure and the thing being argued against (a fail, a cut line), violet is the decision (the selected direction), amber is caution or a pending state (enterprise rows, a flagged part), slate and line are structure (requirements, directions, parts). No colour is used decoratively.
- **Motion:** discrete 0.4–0.8 second transitions on transform and opacity only.
- **Mobile:** a compact diagram pinned above each text card, opaque, active state preserved at 375px.
- **Accessibility:** pass and fail marks carry shape as well as colour; every diagram reinforces meaning the copy already states.

## Beat validation

- Every scene introduces one concept and changes the diagram state.
- The opening states the tension: two defensible answers, no shared test.
- The closing pays it off: one direction at one version, the decisive requirement, and an honest status.
- Every scene stays at or below four sentences.
- Vocabulary holds throughout: direction, version (`A1 → A2 → A3`), time budget, `DIRECTIONS.md`. Nothing reader-facing says "shape" or "appetite".
- All reader-facing copy, labels, and annotations are in English.

## Source section

The article closes with method provenance, real links only:

- [rjs/shaping-skills](https://github.com/rjs/shaping-skills) — Ryan Singer's own agent skills: the requirement and direction notation, the binary fit check, the flagged-unknown discipline, spikes with description-based acceptance criteria, and parts as vertical mechanisms.
- [Shape Up](https://basecamp.com/shapeup) — fixed time and variable scope, the time budget as a design constraint, rabbit holes and no-gos.
- [Some solution vs. no solution](https://www.ryansinger.co/some-solution-vs-no-solution/) and [shaping on the demand side](https://www.ryansinger.co/shaping-on-the-demand-side/) — the aim is confidence that a workable solution exists, and this work runs in both directions between problem and solution.
- The enterprise requirement classes — roles and permissions, auditability, integrations, data volume, accessibility — are this library's addition, not Singer's.
