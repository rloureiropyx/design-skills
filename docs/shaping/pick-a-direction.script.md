# Scene Script — Pick a Direction

**Opening tension:** Two people agree on the problem, hold two different solutions, and have no shared standard to choose between them.

**Top identification:** Present `shaping` immediately as a product design skill, before the tension.

**Final payoff:** The reader understands that shaping is a decision method, not a drawing phase. Requirements are numbered before directions are drawn, directions are scored against them in a binary fit check, unknowns are flagged rather than assumed away, and time budget is fixed while scope moves. It ends with one direction and an honest status.

**Audience:** Product designers, product managers, and engineering leads in enterprise B2B. They may know Shape Up by reputation. They do not know this skill, and they work under constraints — roles, auditability, integrations, data volume — that the original method never addressed.

**Estimated reading time:** 4–5 minutes.

**Proposed pattern:** Sticky graphic + discrete steps throughout, because each beat is one rule with its own diagram state. Full-viewport compositions for the opening and closing. Simple reveals for the prose bridges.

| # | VISUAL — diagram state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 1 · The tension | **Two answers, no test.** A designer node and an engineer node both point into an empty dashed box labelled "which one is right?". Nothing occupies it. | A designer wants a guided wizard. An engineer wants a batch endpoint. Both are describing a real solution to the same agreed problem, and there is no shared standard either one can be held against. This argument is not resolved by seniority; it is resolved by writing the standard down. | Opens the sequence. |
| 2 · Entry | **Frame in, direction out.** `FRAMED_PROBLEM.md` flows into shaping unchanged; a return arrow marked "contradicts the frame" goes back to framing. | Shaping reads `FRAMED_PROBLEM.md` and carries it forward. It does not re-derive the user, the tension, or the outcome in new words. When shaping finds evidence that genuinely contradicts the frame, it stops and sends that back. | The two solution nodes fall away; the framed problem slides in from the left. |
| 3 · Step 1 | **Numbered requirement list.** `R0`–`R5` as rows, each with a status pill: OPEN, STRETCH, OUT. | What must a solution do to count? Each answer gets a number and a status: **OPEN** must be met, **STRETCH** is welcome but optional, **OUT** is deliberately excluded and named so it stops resurfacing. Nine top-level requirements is the ceiling. | The document unfolds into a numbered list. |
| 4 · Step 1, continued | **The enterprise layer.** Five additional requirement rows appear below the first set — permissions, audit trail, system of record, data volume, accessibility. | Roles and permissions. Auditability. The integration whose system of record always wins. Forty thousand rows instead of forty. Keyboard and screen-reader behaviour. Each becomes a numbered requirement or an explicit non-requirement — silence about these is a decision, just an unrecorded one. | The list extends; the new rows arrive in a distinct colour. |
| 5 · Step 2 | **Two directions, side by side.** Direction A and Direction B, each with a one-line "gives up" caption. | One direction is not a choice, it is a proposal wearing a process. The directions must differ *in kind*: fix the run at the moment it breaks, or move the work earlier so the run opens clean. A reader should be able to say in one sentence what each direction gives up. | The requirement list shrinks to a rail; two direction cards deal out beside it. |
| 6 · Step 2, continued | **Layers versus mechanisms.** Left: three horizontal bands (UI, API, database) with a crossed-out cut line. Right: three vertical parts, one lifted out while the rest stand. | "UI, API, database" is not a set of parts — nothing works until all three land, so nothing can be cut. "Detect a blocker, resolve one inline, gate the close" is: each is something a person can do, and removing one leaves the rest standing. Vertical parts are what makes scope adjustable later. | The selected direction explodes into a before/after comparison. |
| 7 · Step 3 | **A flagged part.** One part carries a warning triangle; a callout reads "we know what, not how". | For every part, one question: can we describe *how* this works? Not whether it is possible — whether we can say how. A part that fails that test gets a warning flag, and a flagged part counts as an outright failure in the check that follows. | The vertical parts re-form; one of them lights amber. |
| 8 · Step 4 | **The fit check.** Requirements as rows, directions as columns, filled with pass and fail marks only. The flagged part's requirement reads as a failure. | Each direction is scored against each requirement as pass or fail. There is no "partially", and the absence of that option is the whole point. The matrix does not make the decision; it makes the disagreement visible enough to have. | The parts and the requirement rail converge into a matrix; marks resolve column by column. |
| 9 · Step 5 | **Fixed time budget.** A time bar with a hard boundary; the "as drawn" scope bar visibly overruns it, then a STRETCH requirement is dropped and the bar fits. | Time budget is not an estimate; it is a decision about how much this problem is worth. When the selected direction does not fit, the move available is cutting scope — not extending the deadline. A direction that only fits by moving the date has not been worked out. | The matrix recedes; the time budget bar draws in and the overrun becomes visible. |
| 10 · Step 6 | **Five exit statuses.** `direction-selected`, `spike-needed`, `budget-undefined`, `no-viable-direction`, `reframe` — one highlighted, the others live options. | Shaping ends with a selection and a status. A selected direction with a live spike attached is a real answer. A selected direction with an unknown quietly folded in is not. | The time budget bar collapses into a status list; one entry lights. |

## Static prose bridges

- **Before scene 1:** what shaping is, exactly — the phase between knowing what problem to solve and knowing what to build. It ends with one solution direction and the reasoning that selected it, not with wireframes.
- **After scene 3:** requirements are written as tests, not as features. "Users can see blockers" is a feature; "a payroll admin can tell, before the run starts, whether it will fail" is a test a direction can pass or fail.
- **After scene 5:** each direction gets a breadboard — places, affordances, connection lines, in text — so the fit check runs against a mechanism rather than a paragraph. That is the `breadboarding` skill.
- **After scene 8:** version lineage — a failed check is a brief, not a verdict. Fixing what failed produces `A2`, not a new direction; superseded versions stay visible with the reason, and only the current version appears in the matrix.
- **After scene 7:** the spike convention — acceptance criteria phrased as *"we can describe how…"*, never *"we can decide if…"*. Spikes buy understanding; decisions come after.
- **Before the closing:** what shaping hands to `proposal`, and what it deliberately does not resolve.

## Diagram system

Native SVG, no decorative imagery. Every diagram has a text equivalent in the scene copy.

1. **Two-answer standoff:** the opening tension, an empty test at the centre.
2. **Frame handoff:** the document in, the contradiction path back out.
3. **Requirement list:** the recurring motif, numbered rows with status pills.
4. **Enterprise extension:** the same list, extended in a second colour.
5. **Direction cards:** two candidates with their trade-offs stated.
6. **Layers versus mechanisms:** the horizontal/vertical comparison.
7. **Flagged part:** the warning triangle and its callout.
8. **Fit check matrix:** requirements × directions, binary marks only.
9. **Time budget bar:** fixed boundary, variable scope.
10. **Status list:** the five honest exits.

## Art direction

- **Central visual metaphor:** a test. Everything before it is opinion; everything after it is evidence.
- **Graphic language:** editorial systems diagrams, clear labels, visible connections — matching the `problem-framing` article so the library reads as one thing.
- **Colour semantics:** requirements in green, directions in blue, unknowns and time budget in amber, failure in coral, structure in slate.
- **Motion:** discrete 0.4–0.8 second transitions on transform and opacity only.
- **Mobile:** compact diagram pinned above each text card, opaque, active state preserved at 375px.
- **Accessibility:** pass/fail marks carry direction as well as colour; diagrams reinforce information already present in the copy.

## Beat validation

- Every scene introduces one concept and changes the diagram state.
- The opening states the tension: two defensible answers, no shared test.
- The closing pays it off: one direction, one status, and the reasoning that produced both.
- Every scene stays at or below four sentences.
- All reader-facing copy, labels, and diagram annotations are in English.

## Source section

The article closes with method provenance:

- [rjs/shaping-skills](https://github.com/rjs/shaping-skills) — Ryan Singer's own agent skills, the source of the requirement/direction notation, the binary fit check, the flagged-unknown discipline, and parts as vertical mechanisms.
- [Shape Up](https://basecamp.com/shapeup) — time budget as a fixed budget with variable scope.
- The enterprise requirement classes — roles and permissions, auditability, integrations, data volume, accessibility — are this library's addition, not Singer's.

## Delivery matrix

Verified across nine viewports from 320×568 to 1280×800. Least clearance: 27px at 667×375 (scene 4).
