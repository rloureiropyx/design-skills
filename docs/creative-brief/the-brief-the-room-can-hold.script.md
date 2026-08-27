# Scene Script - The Brief the Room Can Hold

**Goal:** G1 - explain how `creative-brief` turns project context and previous research into a short
alignment artifact without discarding the evidence behind it.

**Tone:** T1 - plain and direct. Short sentences. No framework theater.

**Opening tension:** A design meeting starts with a project everyone can name and a different version
of the user, scenario, and priority in each person's head.

**Top identification:** The hero names `creative-brief` as a product design skill and identifies its
two outputs before the first scene: `CREATIVE_BRIEF.md` for the room and
`CREATIVE_BRIEF_EVIDENCE.md` for the record.

**Final payoff:** The reader can describe the full mechanism: inspect the project, draft four capped
fields, separate evidence from assumptions, generate one prompt for Product Research Analyst when
previous research could change the brief, wait for the human copy/paste return, confirm the brief
aloud, and reopen only what changed at the next review.

**Audience:** Product designers and product managers starting enterprise design work. They know
research reports, personas, and project briefs. They do not need to know agent skills.

**Estimated reading time:** 4 minutes.

**Proposed pattern:** Sticky graphic with discrete states. One briefing table stays pinned while
context cards move into an evidence companion and four selected cards settle into the short brief.
Static prose bridges explain the artifact boundary and the Product Research Analyst prompt.

| # | VISUAL - diagram state | COPY - 2-4 short sentences | TRANSITION |
| --- | --- | --- | --- |
| 0 - Different briefs in one room | **Meeting table.** Four participant cards surround a blank center. Each holds a different label: `fast correction`, `payroll specialist`, `manager approval`, `audit trail`. No two connect. | The meeting is called “off-cycle payroll correction,” but the name is the only shared part. One person is designing for speed, another for approval, and another for audit. The team can discuss the same project while making different designs. | Opening state. The four cards appear around the empty center with no shared boundary. |
| 1 - Two files, two jobs | **Split artifact.** A compact four-row card labelled `CREATIVE_BRIEF.md` sits above a deeper evidence drawer labelled `CREATIVE_BRIEF_EVIDENCE.md`. A two-minute badge attaches to the short card. | The skill creates two files because one document cannot stay short and hold the whole record. `CREATIVE_BRIEF.md` is read aloud in about two minutes. Its evidence companion carries the sources, assumptions, candidate sets, and history an agent needs. | The blank center becomes the short card; the evidence drawer opens beneath it. |
| 2 - Four fields, hard caps | **Four-row brief.** Objective, Personas, Scenarios, and Principles appear as rows with counters: `1`, `1-2`, `1-3`, `1-2`. Extra cards queue outside the brief. | The short brief has four fields and no fifth one. One objective says what this design round will accomplish. One or two personas, up to three scenarios, and one or two principles select what matters now; everything else stays outside the meeting brief. | The artifact expands into four rows. Counters lock and overflow cards move toward the evidence drawer. |
| 3 - Read before asking | **Context intake.** Research reports, support cases, workflow notes, a role matrix, policy, and an earlier brief flow toward candidate lanes. Each source receives a `CB-S##` tag. | Before asking the designer for facts, the skill reads what the project already holds. It looks for the objective, researched roles, concrete situations, design principles, and the enterprise constraints that affect the selection. Each usable source gets an ID and a locator back to the exact record. | Source cards enter from the left, receive IDs, and sort beneath the four fields. |
| 4 - A draft to argue with | **Candidate-to-selection view.** Three persona cards, five scenario cards, and four principle cards appear in the companion. Selected cards rise into the capped brief; one unresolved card remains amber. | The skill writes a complete first draft instead of returning a template. It recommends the objective, personas, scenarios, and principles the current record supports, then asks one decision at a time. The designer reacts to a selection rather than doing the sorting alone. | Candidate cards fan out in the companion; the recommended set rises into the short brief. |
| 5 - Evidence stays behind the words | **Evidence-state overlay.** Candidate cards carry `supported`, `assumption`, `unknown`, or `contradicted`. The short brief stays clean while lines connect each selected item to its state below. | A short sentence can hide a weak basis. The companion keeps supported findings separate from assumptions, unknowns, commitments, and preferences. A persona does not become researched because the brief describes it confidently. | Status chips appear on candidate cards; trace lines draw from selected brief rows to their evidence. |
| 6 - One targeted research prompt | **Research gate.** Two unresolved amber cards pass through a gate labelled `Could internal research answer this?` and `Would it change the brief?` They become one prompt card with `RQ01` and `RQ02`. | Not every gap earns more research. The skill includes a question only when previous internal research could answer it and the result could change one of the four fields. All qualifying gaps become one Product Research Analyst prompt, with the source and locator required for every answer. | The two amber cards pass both checks and merge into one prompt; non-qualifying gaps remain in the companion. |
| 7 - The human carries the handoff | **Copy-paste loop.** `creative-brief` hands the prompt to a human card, which carries it to `Product Research Analyst`; a cited response returns through the same human. The brief is marked `awaiting-research`. | The skill never calls the analyst. The designer copies the prompt, pastes the cited response back, and the skill waits in between. `No evidence found` is a useful answer; an unsourced summary remains an assumption. | The prompt moves out through the human; the artifact pauses, then a response table returns with source tags. |
| 8 - Revise only what changed | **Field-level update.** A returned finding connects to Key Scenarios, replacing one scenario card. The objective, persona, and principles remain fixed; the companion records the prior scenario in history. | Returned research does not restart the interview. Each finding maps to the question it answers, and only the affected brief field reopens. The previous assumption stays in the change history instead of disappearing. | One scenario card moves to history and its supported replacement rises into the short brief; the other rows do not move. |
| 9 - Read, agree, review | **Meeting alignment.** The four participant cards now connect to the same completed brief. A `ready v1` badge appears, followed by a review loop that can update one row to `v2`. | The team reads the completed brief and asks whether it still describes what they are designing today. Agreement makes it ready for the meeting, not approval to build. At the next review, no change keeps the version; a confirmed field change updates both files together. | The connections close around the brief, the ready badge sets, and a small loop returns from review to one editable row. |

## Static prose bridges

- **Before scene 0:** define the short-form creative brief as an alignment artifact for design
  meetings, not a PRD or a replacement for research. Credit Jared M. Spool and say the skill is based
  on a practice he observed with a client team.
- **Between scenes 1 and 2:** show the HCM example in its final short form:
  - Objective: design a guided off-cycle correction flow that helps payroll specialists resolve a
    retroactive employee change before the corrected payroll is submitted.
  - Persona: a multi-state payroll specialist responsible for final validation and audit response.
  - Scenarios: a retroactive termination arrives after payroll close; a corrected tax setup changes
    the recalculation; an approver asks why a prior result changed.
  - Principle: audit trail over invisible automation.
- **After scene 3:** explain that enterprise boundaries remain in the evidence companion. Roles,
  permissions, policy, integrations, data volume, operational failures, and accessibility can change
  which items are selected without becoming a fifth short-brief field.
- **After scene 5:** include a compact evidence-companion excerpt: one supported scenario, one
  assumption, one principle recorded as a commitment, and their source IDs.
- **After scene 7:** show the exact shape of the analyst response table and the required `No evidence
  found` state.
- **Before scene 9:** show the complete one-page `CREATIVE_BRIEF.md`, then place the longer companion
  behind it as the source an agent reads before updating the brief.
- **Closing:** place `creative-brief` beside `problem-framing`, not inside the existing chain.
  `creative-brief` aligns a design round that may already name what is being designed.
  `problem-framing` establishes an evidence-backed, solution-open problem and feeds `shaping`.

## Diagram system

Use one native inline SVG with a stable coordinate system and one `<g class="diagram-state">` per
scene. The visual language is a briefing table:

1. **Meeting table** - participant cards with conflicting mental models.
2. **Split artifact** - short card above evidence drawer.
3. **Four-row brief** - hard counters and visible overflow.
4. **Context intake** - sources gaining IDs and locators.
5. **Candidate selection** - larger candidate sets beneath a capped current selection.
6. **Evidence overlay** - statuses and trace lines.
7. **Research gate** - two binary checks combining gaps into one prompt.
8. **Copy-paste loop** - human-mediated analyst handoff and pause.
9. **Field-level update** - one row changes while three remain fixed.
10. **Meeting alignment** - shared brief and review/version loop.

Every visual claim is repeated in the scene copy. The SVG can be `aria-hidden`; the article remains
complete with JavaScript disabled.

## Art direction

- **Visual style:** Paper. Warm surface, dark diagram panel, restrained cards, no decorative
  illustration.
- **Color semantics:** green for supported or ready; blue for project context; amber for assumptions
  and waiting; coral for contradictions; violet for selection and confirmation; slate for structure.
- **Motion:** 0.35-0.7 second transform and opacity transitions. No scrolljacking. Reduced motion
  changes states instantly.
- **Desktop:** sticky diagram and narrative cards in two columns.
- **Portrait mobile:** diagram pins above the cards with an opaque surface.
- **Short landscape:** return to two columns; very short narrow screens use an inline non-pinned
  diagram.
- **Accessibility:** semantic prose carries every concept; color is paired with labels; source IDs and
  status text remain legible at the smallest viewport.

## Beat validation

- Scene 0 opens on the cost of a missing shared brief, not on a definition.
- Scene 1 names both persistent outputs before explaining the method.
- Scene 2 states the exact four fields and hard caps.
- Scenes 3-5 show docs-first drafting and evidence discipline.
- Scenes 6-8 explain one consolidated prompt, the human copy/paste boundary, and selective
  reincorporation.
- Scene 9 pays off the opening by showing one shared brief and makes the review ritual visible.
- Every scene changes the graphic state; no adjacent scenes should merge.
- The enterprise example stays consistent through the article.
- The article never implies that `CREATIVE_BRIEF.md` feeds `shaping` or authorizes a build.
- All reader-facing copy is in English.

## Sources

- Jared M. Spool, [The Magical Short-Form Creative
  Brief](https://jmspool.medium.com/the-magical-short-form-creative-brief-61fb58e1dfa2) - four fields,
  brevity, read-aloud agreement, and revision when the project changes.
- Matt Pocock, [`grill-with-docs`](https://github.com/mattpocock/skills/blob/main/docs/engineering/grill-with-docs.md)
  and [`grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md)
  - context inspection, decision-order questioning, recommendations, and persistent shared context.
- Nielsen Norman Group, [Tracking Questions, Assumptions, Research, and Facts in
  Agile](https://www.nngroup.com/articles/tracking-questions-assumptions-facts-agile/) - evidence
  states and the risk of remembering assumptions as facts.

