# Scene Script — One Read, One Decision

**Goal:** G2 · Argue a position — the reader ends up persuaded, or clear about where they disagree.
**Tone:** T1 · Plain and direct — short sentences, no metaphor unless it does real work.

**Opening tension:** A proposal is judged on whether it produces a decision, and the sentences that stop it from doing so are the ones written to persuade. The article argues that a proposal exists to produce a decision, and that every sentence in it has to trace back to the frame or the directions document.

**Top identification:** The hero names `proposal` as a product design skill before the argument begins, so the reader knows this is a claim about one skill, not about writing in general.

**Final payoff:** The reader accepts that a proposal is assembly, not authoring. It carries the frame and the direction forward instead of rewriting them, refuses to be written while a required input is missing, puts the time budget above the direction, gives enough of the direction to decide and no more, names rabbit holes and exclusions as decisions with reasons, and passes every sentence through a traceability check. A finished one can be answered four ways in a single read.

**Audience:** Product designers and product managers in enterprise B2B who have to move a group of stakeholders to a decision. They have written decks, briefs, and one-pagers. They have not read Shape Up's pitch chapter and do not need to.

**Estimated reading time:** 4 minutes.

**Proposed pattern:** Sticky graphic + discrete steps throughout, with static prose bridges between beats. Full-viewport compositions for the hero and the closing.

| # | VISUAL — diagram state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 1 · The claim | **One document, one decision.** `PROPOSAL.md` in the centre, thin trace lines running back to `FRAMED_PROBLEM.md` and `DIRECTIONS.md`, one arrow leaving toward a decision node in violet. | A proposal exists to produce a decision. Someone reads it once and says go ahead, go ahead with less, send it back, or no. Every sentence in it traces back to the frame or to the directions document. A sentence that traces to neither is the writer starting to sell. | Opens the sequence at full viewport. |
| 2 · Carried, not rewritten | **Two inputs feed one proposal.** `FRAMED_PROBLEM.md` and `DIRECTIONS.md` flow into `PROPOSAL.md`; a second path labelled "rewrite in new words" is struck through. | The proposal reads two documents. The frame supplies the problem, the evidence, and the boundaries; the directions document supplies the chosen direction and the time budget. Both are compressed and carried forward. Rewriting the problem in fresh words changes it, and the version people approve stops matching the one that was evidenced. | The trace lines from scene 1 thicken into two labelled input flows. |
| 3 · The gate | **Four conditions that stop the writing.** A closed gate in front of the proposal; four blocking cards light one by one — no frame, no selected direction, no time budget, an open warning flag. | Four things stop the proposal before a word is written. No framed problem, no selected direction, no time budget, or a warning flag still open on the chosen direction. Each gap means the reader would be asked to decide something no one has settled. Writing over it does not close the gap; it moves the gap to whoever approves the work. | The proposal slides up to a closed gate; the four cards illuminate in sequence. |
| 4 · Time budget first | **The outline, time budget raised.** The section blocks assemble top to bottom, with the Time budget block lifted near the top and held in amber. | The time budget goes above the direction. A reader who meets the solution first has formed an opinion before the cost arrives. Put the number early, say where it came from, and every later paragraph is read against whether the work is worth that time. The time budget is the size of the commitment the business is choosing. | The gate opens; the outline builds downward, then the time budget block rises and holds. |
| 5 · Enough to decide | **The direction as parts.** Three named parts, each a thing a person can experience, beside a greyed wireframe panel stamped "not here". | The direction appears as its parts, each one something a person can experience, with one honest line about what it gives up. Layout, copy, states, and component choices stay out. A builder weeks later needs room for the many decisions this document does not hold. Settling them here turns the proposal into a specification no one agreed to. | The outline zooms into its direction section; the parts resolve and the wireframe panel greys out. |
| 6 · Named with their reasons | **Traps and cuts, each paired.** Rabbit-hole rows each joined to the decision that contains them; below, exclusions tagged "this cycle"; two vague traps struck out. | A rabbit hole is a specific place the work could vanish into, written with the decision that keeps it out. Naming the trap and pairing it with "not that part, this cycle" is what makes it a boundary. Exclusions work the same way, each with its reason and scoped to this cycle. An exclusion written as a permanent verdict gets reversed later with no record of why. | The direction section recedes; paired trap-and-decision rows slide in, then the exclusion tags. |
| 7 · The traceability check | **One sentence, no source.** A proposal line highlighted; its trace line back to the two documents is broken; puffery phrases peel off and fall away in coral. | Before it is presented, the draft runs through a slop pass that works as a traceability check. "Significantly faster" and "marks a pivotal moment" trace back to neither document, and each one that survives makes the traceable sentences around it look invented too. Puffery is also where a proposal starts selling without anyone choosing to sell. When a line reads thin because a number is missing, the number comes from the frame, or the line moves to what is still open. | The paired rows fade; a single sentence lifts out of the document and its broken trace line shows. |
| 8 · One read, four answers | **Four decision routes.** The proposal resolves into four exits in violet — approve, approve with less time, send back, decline — all marked valid. | A finished proposal can be answered four ways. It can be approved, approved with a smaller time budget, sent back to close one named open item, or declined. All four are outcomes a good proposal is built for. One read is enough to choose any of them. | The document collapses into four routes, each lighting as a valid exit. |

## Static prose bridges

- **Before scene 1:** what a proposal is in this library — the document a group can act on without another meeting, and the last artifact written before Design starts. It names `proposal` as a skill and states that it reads `FRAMED_PROBLEM.md` and `DIRECTIONS.md` and writes `PROPOSAL.md`.
- **After scene 2 — why "proposal" and not "pitch":** Shape Up called this a pitch in 2019; Ryan Singer has since moved off the word, and the raw ask that arrives before framing is the request. "Pitch" invites persuasion and a buyer. "Proposal" is the word people already use for a document that asks for a decision, and it names the reader's job rather than the writer's. In this library `pitch` is a separate skill doing the opposite job — communicating a decision after it has been made, to people who were not in the room.
- **After scene 6:** how the proposal survives enterprise review — the roles it touches, what becomes auditable, the systems of record it depends on, and who outside the team has to agree before it ships. Any of these arriving after the decision is how a bounded project quietly becomes a bigger one.
- **After scene 7:** a worked rabbit-hole-and-patch pair shown in full, so the reader sees the shape the method produces on the page rather than only in the diagram.

## Diagram system

Native inline SVG, editorial systems-diagram language, no decorative imagery. One `<g class="diagram-state" data-state="k">` per scene, exactly one visible at a time. Every diagram has a full text equivalent in the scene copy, so the meaning stands without the graphic.

1. **Trace map:** `PROPOSAL.md` centred, thin lines back to the two source documents, one arrow out to the decision.
2. **Two-input assembly:** framed problem and directions document feeding the proposal; the rewrite path struck through.
3. **Refusal gate:** four blocking conditions in front of a closed gate.
4. **Outline, time budget raised:** the section order, with the time budget block lifted and held.
5. **Direction as parts:** three named parts shown, the wireframe panel withheld.
6. **Traps and cuts:** rabbit-hole rows paired with their decisions; exclusions tagged by cycle; vague traps struck out.
7. **Broken trace:** one untraceable sentence lifted from the document, its source line broken, puffery falling away.
8. **Four exits:** the four decision routes, all marked valid.

## Art direction

- **Central visual metaphor:** assembly. Nothing in the proposal is new; each part was decided upstream and is placed, not authored.
- **Graphic language:** the editorial systems diagrams shared with `problem-framing` and `shaping`, so a reader who opens two articles sees one publication.
- **Colour semantics (house brief):** the frame and inputs in blue, settled parts and valid traces in green, the time budget and pending states in amber, refusals, struck traps, and untraceable copy in coral, the decision and its four exits in violet, structure in slate and line.
- **Motion:** discrete 0.4–0.8 second transitions, transform and opacity only.
- **Mobile:** the diagram pins above each text card, opaque, with the active state preserved at 375px; if a label cannot survive the mobile scale the diagram is marked `aria-hidden` and the copy carries the meaning.
- **Accessibility:** refusal, validity, and approval are carried by text labels, never by colour alone.

## Beat validation

- The claim lands in scene 1; scenes 2 through 7 are evidence for it; scene 8 pays it off. This is the G2 shape.
- Eight scenes, each introducing one concept and changing the diagram state. No scene repeats another's state.
- Every scene stays at or below four short sentences, in the T1 plain register.
- Recurring things keep one name: the frame, the directions document, the proposal, the time budget, the direction.
- The closing ends on a concrete sentence about the reader, not a metaphor or a recap.
- All reader-facing copy, labels, and diagram annotations are in English.
- Prose checklist run over every COPY cell twice: no colon reveals, no "not X, it's Y", no throat-clearing or faux-insight openers, no stacked fragments, no negative listing, no importance puffery, no weasel attribution, no synonym cycling, no rhetorical setups, no em dashes, no banned words, no mid-sentence bold.

## Source section

The article closes with method provenance, real links only:

- [Shape Up](https://basecamp.com/shapeup) — the structure this document descends from: problem, appetite, solution, rabbit holes, no-gos, and the idea that time is fixed and scope moves.
- [Framing](https://www.ryansinger.co/framing/) — Ryan Singer's later vocabulary, where the raw ask before framing is the request, which is why the output here is called a proposal.
- [rjs/shaping-skills](https://github.com/rjs/shaping-skills) — carrying the frame forward instead of re-deriving it, and the test that every sentence trace to something someone said or decided.
- [no-ai-slop](https://github.com/petergyang/no-ai-slop) — the pattern list behind the traceability pass, re-cut for a document that has to be traceable rather than persuasive.

The refusal conditions and the enterprise-review checks are this library's addition, not Singer's.
