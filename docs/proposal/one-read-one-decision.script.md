# Scene Script — One Read, One Decision

**Opening tension:** The third meeting about the same work, which again ends without a decision.

**Top identification:** Present `proposal` immediately as a product design skill, before the tension.

**Final payoff:** The reader understands that a proposal is an assembly job, not an authoring job. It carries the frame and the direction forward without rewriting them, leads with time budget, names rabbit holes with their patches and exclusions with their reasons, states what is still open, and refuses to be written at all while a required input is missing. Its test is decidability in one read.

**Audience:** Product designers and product managers in enterprise B2B who have to get a group of stakeholders to a decision. They have written decks, briefs, and one-pagers. They have not read Shape Up's pitch chapter, and they do not need to.

**Estimated reading time:** 4 minutes.

**Proposed pattern:** Sticky graphic + discrete steps throughout. Full-viewport compositions for the opening and closing.

| # | VISUAL — diagram state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 1 · The tension | **A meeting with no decision.** Four unanswered question chips float above a table; the exit arrow loops back to "meet again". | The questions in the room are all reasonable: how long, what is excluded, does it cover contractors, what else was considered. Every answer exists somewhere. None of them are in the thing being presented, so the meeting ends the way the last two did. | Opens the sequence. |
| 2 · Inputs | **Two documents in.** `FRAMED_PROBLEM.md` and `DIRECTIONS.md` feed one proposal; a "rewritten here" path is crossed out. | The proposal takes two documents: the framed problem for the problem, the evidence, and the boundaries, and the shaping doc for the direction, the time budget, and the fit check that selected it. Both are carried forward, not paraphrased. | The meeting dissolves; the two source documents slide in. |
| 3 · The gate | **Four refusal conditions.** No frame · no selected direction · no time budget · unresolved flag. Each one stops the writer. | No framed problem, no selected direction, no time budget, or an unresolved flag on the chosen direction — any one of these stops the skill. The refusal is the useful part. A proposal written over a missing input does not solve the gap; it transfers it to whoever approves the work. | The inputs meet a closed gate; the four conditions light in sequence. |
| 4 · Structure | **The proposal outline, time budget raised.** Section blocks in order, with Time budget pulled near the top and highlighted. | A reader who meets the solution before its cost has already formed an opinion by the time the number arrives. Put the time budget early and every paragraph after it is read as the only question that matters: *is this worth six weeks?* Time budget is not a schedule — it is the size of the commitment. | The gate opens; the outline assembles top to bottom. |
| 5 · The solution | **Direction as parts, pixels withheld.** Three named parts and a "gives up" line; a greyed-out wireframe panel is marked "not here". | The proposal presents the direction as its parts, plus one honest sentence about what it gives up. Layout, copy, states, and components are deliberately absent — pre-empting Design here is how a proposal becomes a specification nobody agreed to. | The outline zooms into its solution section. |
| 6 · The traps | **Rabbit hole and patch, paired.** Two specific traps, each with the decision that closes it; two vague ones ("scope creep", "technical complexity") are rejected. | A rabbit hole is a specific place this work could disappear into, paired with the specific decision that prevents it. "Retro-fitting the sweep to legacy pay groups" is one; the patch is "current-generation groups only, this cycle". | The parts recede; paired trap/patch rows slide in. |
| 7 · The exclusions | **Not this time with reasons.** Three named exclusions, each tagged "not this cycle" rather than "never". | Every exclusion was somebody's real request. Naming them closes them for *this* cycle without closing them forever. Why not now, never why not ever: an exclusion written as a permanent verdict turns the proposal into a judgement on other people's ideas. | The pairs re-form as an exclusion list. |
| 8 · The honesty | **What is still open.** Four columns: carried risks, unverified assumptions, the spike not yet run, what is left for Design. | Risks carried from the frame, assumptions not yet verified, the spike that has not run, and what is deliberately left for Design. A reader who discovers later something that was known now will discount every future proposal from the same team. | The exclusions fan out into four open-item columns. |
| 9 · The payoff | **Four exits.** Approve · approve smaller · send back · decline. All four marked as successful outcomes. | Approve. Approve with a smaller time budget. Send it back to close a stated open item. Decline. All four are successful outcomes of a good proposal — a document that can only be approved was written to be sold. | The columns collapse into four decision routes. |

## Static prose bridges

- **Before scene 1:** what a proposal is — the document a group of people can act on without another meeting, and the last artifact before Design starts.
- **After scene 4 — why "proposal" and not "pitch":** a pitch implies persuasion and a buyer. A proposal implies assembly and a reader. The word change is the method change: the writer's job is to make the decision possible, not to win it.
- **After scene 7:** how the proposal survives contact with enterprise review — traceability back to the frame, and the fact that every claim in it has a stated source.
- **Before the closing:** a visible example of a rabbit-hole/patch pair, so the reader sees the artifact this method produces.

## Diagram system

Native SVG, no decorative imagery. Every diagram has a text equivalent in the scene copy.

1. **The undecided meeting:** the opening tension, questions with no home.
2. **Two-input assembly:** framed problem and shaping doc feeding one proposal.
3. **Refusal gate:** the four conditions that stop the writer.
4. **Proposal outline:** the recurring motif, with time budget raised.
5. **Direction as parts:** mechanisms shown, pixels withheld.
6. **Trap and patch:** paired rows, with the vague ones rejected.
7. **Not this time list:** exclusions tagged by cycle, not by verdict.
8. **Open items:** four columns of honest unfinished business.
9. **Four exits:** the decision routes, all of them valid.

## Art direction

- **Central visual metaphor:** an assembly. Nothing in the proposal is new; everything in it was decided somewhere upstream.
- **Graphic language:** editorial systems diagrams matching `problem-framing` and `shaping`.
- **Colour semantics:** the frame in blue, the direction in green, time budget and traps in amber, refusal and exclusions in coral, the decision in violet.
- **Motion:** discrete 0.4–0.8 second transitions on transform and opacity only.
- **Mobile:** compact diagram pinned above each text card, opaque, active state preserved at 375px.
- **Accessibility:** refusal and approval states carry text labels, not colour alone.

## Beat validation

- Every scene introduces one concept and changes the diagram state.
- The opening states the tension: a meeting that cannot decide.
- The closing pays it off: one read, four possible answers, all of them decisions.
- Every scene stays at or below four sentences.
- All reader-facing copy, labels, and diagram annotations are in English.

## Source section

The article closes with method provenance:

- [Shape Up](https://basecamp.com/shapeup) — the pitch structure this proposal descends from: problem, time budget, solution, rabbit holes, exclusions.
- [rjs/shaping-skills](https://github.com/rjs/shaping-skills) — Ryan Singer's kickoff-doc skill, and the discipline of carrying the frame forward rather than re-deriving it.
- The refusal conditions and the enterprise-review notes are this library's addition.

## Delivery matrix

Verified across nine viewports from 320×568 to 1280×800. Least clearance: 47px at 667×375 (scene 2).
