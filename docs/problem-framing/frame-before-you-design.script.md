# Scene Script — Frame Before You Design

**Goal:** G1 — explain how something works. The reader ends up able to describe the mechanism `problem-framing` runs.

**Tone:** T1 — plain and direct. Short sentences, no metaphor unless it does real work.

**Opening tension:** A request arrives already phrased as a solution. What does `problem-framing` do to keep a team from designing a good answer to a problem no one has confirmed?

**Top identification:** The hero identifies `problem-framing` as a product design skill and names its one output, `FRAMED_PROBLEM.md`, before the first scene.

**Final payoff:** The reader can describe the loop end to end: read the record, sort the evidence, recover an episode, test the cause, compare frames, gate the evidence, draw the boundary, and hand `FRAMED_PROBLEM.md` to `shaping`. The skill produces a framed problem, not a solution, and framing buys time to explore rather than approval to build.

**Audience:** Product designers and product managers. They know briefs, research, and metrics. They do not need prior knowledge of Shape Up or agent skills.

**Estimated reading time:** 4–5 minutes.

**Proposed pattern:** Sticky graphic + discrete steps. One inline SVG system diagram builds part by part as the reader scrolls; each scene switches it to one new state. Static prose bridges carry the longer explanation between scroll beats.

| # | VISUAL — diagram state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 0 · The stakes | **Straight-line diagram.** A request card, `AI payroll-readiness dashboard`, flows by a single arrow into a finished solution block. The block rests on a base labelled `Problem?` drawn in coral. | A request arrives asking for an AI payroll-readiness dashboard. You could design it well and still solve a problem no one confirmed. The further the work goes, the more a wrong problem costs to correct. Problem framing tests the problem before design starts. | — (opening state) |
| 1 · Two ways in | **Pipeline map.** Three entry nodes, `New project`, `In-progress project`, and `Quick frame`, converge on one framing loop. A single output node, `FRAMED_PROBLEM.md`, sits on the far side. | The skill starts a new project from a raw request, or picks up a project already underway. A third path, the quick frame, fits small solo work that still needs its problem stated. Every path runs the same loop and ends in one file, `FRAMED_PROBLEM.md`. | The request card shrinks into one input; the three routes draw themselves toward the loop and the output appears. |
| 2 · Read before asking | **Evidence ledger.** Briefs, notes, metrics, and past decisions flow into five colour-coded lanes: observation, interpretation, assumption, commitment, and preference. Observation quotes are boxed as source material. | Before asking the designer anything, the skill reads the briefs, notes, metrics, and prior decisions already on record. It sorts each claim into five lanes: observation, interpretation, assumption, commitment, and preference. A quote from a real person is the ground truth, and every other line is read as an interpretation of it. | The loop opens; project documents enter and sort into the five lanes. |
| 3 · Frame drift | **Timeline compare.** Three stacked bars, `Original brief`, `Work since`, and `New evidence`, align on one axis. Coral markers flag the gaps between them. | When work is already underway, the skill lines up the original brief, the work done since, and the evidence gathered along the way. It names each gap as drift: the problem changed, scope crept, or the statement now exists to justify a solution already chosen. Eight weeks of screens are sunk cost, not evidence the frame was right. | The ledger folds into a timeline; the drift markers light along the gaps. |
| 4 · One real episode | **Baseline-story flow.** Five stages in a row: `HR admin finalizes payroll` → `changes missing` → `chases managers` → `approval slips` → `outcome`. The outcome node is drawn in green. | The skill replaces the feature label with one concrete episode. An SMB HR admin finalizes payroll, finds employee changes missing, chases managers, and approval slips a day. It then fixes the outcome the frame is measured by, an observable change someone outside the team could notice. | The timeline resolves into a single left-to-right story; the outcome node settles into place. |
| 5 · Test the cause | **Causal map.** A symptom node, `approval delayed`, links up to two candidate causes: `needs better visibility` and `changes arrive late`. The visibility link thins as the other thickens. | The first explanation is usually the one that matches what the team already wanted to build. The skill offers a hypothesis, then asks what makes anyone think it is the cause. The dashboard would show the summary, but the delay comes from changes that arrive late. The weaker link gives way to the stronger one. | The story lifts into a two-branch cause map; one link fades while the other strengthens. |
| 6 · Compare the frames | **Frame-comparison matrix.** Four candidate problems form rows; `evidence`, `leverage`, `ownership`, and `boundary` form columns. The recommended row is outlined in violet. | One payroll delay can support several different problems, and each points to a different design space. The skill writes three to five and compares them on evidence, leverage, ownership, and boundary. It recommends the one the observations support and keeps the rejected ones with the evidence that would revive them. | The single cause map fans into four rows; the chosen row gains its violet outline. |
| 7 · Gate the evidence | **Decision gate.** An assumption token passes through four checks, then branches to two request cards, `Metrics` and `Research library`. A third branch, `Accept as risk`, drawn in amber, loops back. | The skill asks for research or metrics only when the answer could change the chosen frame. An assumption has to pass four tests: it matters, the evidence is weak, more evidence is reachable, and the result would move the decision. Only then does it request one exact query, in metrics or in the research library. Otherwise it records the risk and moves on. | The chosen row exposes one assumption; the assumption runs the four checks and the branches appear. |
| 8 · Draw the boundary | **Scope box.** An inner box holds `user`, `moment`, `slice now`, `time budget`; an outer band holds `out of scope` and `major risks`. A working question sits below in green. | The team may not be able to solve the whole problem at once. The skill draws the boundary: the user, the moment, the slice handled now, and what stays out. It records the time budget as fixed build time, alongside the risks that could destabilize the work. From that boundary comes one working question, open to several answers. | The gate expands into a boundary box; included parts move inside, excluded parts move to the band, and the question forms beneath. |
| 9 · Hand it off | **Status handoff.** The boundary box becomes a `FRAMED_PROBLEM.md` document tagged with one of seven statuses. An arrow carries it to a `shaping` node, which shows two or three direction sketches. | The confirmed frame is written to `FRAMED_PROBLEM.md` and tagged with one of seven statuses. Ready-for-directions hands the file to `shaping`, which explores two or three solution directions and picks one. Framing buys the team time to explore solutions, not approval to build. The file stays the reference every later decision is checked against. | The boundary box becomes the document; the status tag sets and the handoff arrow reaches `shaping`. |

## Static prose bridges

- Before scene 0, in `section.intro`: a plain-prose definition of an agent skill and of a `Framed Problem`, for a reader who will never open `SKILL.md`. It states that the skill is the designer's memory for the questions that have to be answered before anyone designs, and that its only output is a written problem with the evidence under it.
- Between scenes 2 and 3: a short note that the same SMB HCM payroll-readiness example runs through scenes 4–9, so each question changes one visible part of the same problem.
- After scene 3: one sentence marking scene 3 as the in-progress path only; a new project skips the drift check and goes straight to the episode.
- After scene 7: a seven-card guide naming the action attached to each status — ready-for-directions, revisit-directions, continue-current-frame, evidence-needed, needs-reframing, split, and stop.
- Before scene 9's payoff: a document-style example that consolidates the SMB HCM case into a full `FRAMED_PROBLEM.md`, showing status, source request, baseline story, chosen frame, users and outcome, evidence, working question, boundaries, major risks, and the handoff line.
- In `section.whole-picture`, after the closing: a compact non-linear diagram placing `problem-framing` before `shaping` and `proposal`, with an approved proposal flowing into Design. It states that these earlier steps keep later work from drifting rather than doing the detailed design themselves, and links the sibling articles.

## Diagram system

Native inline SVG only, one `<g class="diagram-state">` per scene, exactly one visible at a time. Editorial systems-diagram language: labelled boxes, visible connections, restrained depth, no decorative gradients. Every diagram has its full meaning carried in the scene copy, so the graphic can be marked `aria-hidden` if a label cannot survive the mobile scale.

1. **Straight-line diagram** — request to finished solution on an unverified base.
2. **Pipeline map** — three entry paths through the framing loop to one `FRAMED_PROBLEM.md`.
3. **Evidence ledger** — five semantic lanes for observation, interpretation, assumption, commitment, and preference.
4. **Timeline compare** — original brief, work since, and new evidence with drift gaps flagged.
5. **Baseline-story flow** — a single concrete episode from stuck point to outcome.
6. **Causal map** — one symptom against two competing causes.
7. **Frame-comparison matrix** — candidate problems scored across decision criteria.
8. **Decision gate** — four assumption checks branching to metrics, research, or accepted risk.
9. **Scope box** — included slice, exclusions, time budget, risks, and the working question.
10. **Status handoff** — `FRAMED_PROBLEM.md`, its status, and the arrow to `shaping`.

## Art direction

- **Graphic language:** one persistent system diagram that builds part by part, not a set of separate illustrations. Labels stay in the reader's own terms.
- **Colour semantics (shared across the library):** blue for narrative and input, green for a settled or valid state, violet for a decision or approval, coral for failure and drift, amber for a caution or pending state, and line/slate for structure. No colour used decoratively when it carries one of these meanings.
- **Lane colours in scene 2:** observation green, interpretation blue, assumption amber, commitment violet, preference coral — the bias the method guards against.
- **Motion:** discrete 0.4–0.8s transitions on transform and opacity only. No scrolljacking. Reduced motion switches states instantly.
- **Mobile:** a compact diagram pins above each text card and preserves the active state at ~375px width; the text scrolls underneath it.
- **Accessibility:** the diagram reinforces what the copy already says; nothing is conveyed by motion alone.

## Beat validation

- Scene 0 states the tension on the mechanism's stakes, matching G1 (it opens on what the skill is for, not on a claim to argue).
- Every scene introduces one concept and changes the diagram to one new state; no two adjacent scenes share a state.
- Scene 9 pays off scene 0 and ends on a concrete sentence about the file, not a metaphor or a recap.
- Both entry branches are covered: new-project flow in scenes 4–9, in-progress drift in scene 3.
- Current vocabulary throughout: `directions` and `shaping`, `time budget` as fixed build time, `proposal` as the sign-off document. No "shape", "appetite", "pitch", or "Direction phase".
- Every scene stays at four sentences or fewer. All reader-facing copy, labels, and annotations are in English.
- The prose checklist in `references/prose.md` was run over every COPY cell: no colon reveals, no dramatic fragmentation, no throat-clearing or faux-insight openers, no importance puffery, no weasel attribution, one name per recurring object (`the skill`, `the frame`, `FRAMED_PROBLEM.md`), no em dashes in scene text, no banned words, and no mid-sentence bold.

## Source section

The article closes with method provenance, real links only:

- Warren Berger, [*A More Beautiful Question*](https://amorebeautifulquestion.com/) — `Why → What if → How` as a path from questioning a situation to an evidence-producing next step.
- Ryan Singer, [*Shape Up*](https://basecamp.com/shapeup) — the pre-build phase that sets a rough direction and a fixed build-time budget, adapts the solution to the time, and makes boundaries, risks, and exclusions explicit.
- Ryan Singer, [`rjs/shaping-skills`](https://github.com/rjs/shaping-skills) and his writing on [framing](https://www.ryansinger.co/framing/), [what research is for](https://www.ryansinger.co/research-gives-us-the-problem-not-the-answer/), [deciding between options](https://www.ryansinger.co/discovery-how-to-decide/), and [business imperatives](https://www.ryansinger.co/matching-problems-to-business-imperatives/) — quoted source material as ground truth, the *who said this and where* test, the options landscape, and framing as a commitment to spend exploration time rather than to build.
- Matt Pocock, [`grill-with-docs`](https://github.com/mattpocock/skills/blob/main/docs/engineering/grill-with-docs.md) — one question at a time, a recommended answer, project-context inspection before asking, and shared understanding kept in the project.
