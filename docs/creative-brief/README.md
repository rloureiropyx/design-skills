# Notes - Creative Brief

```
README.md                                      this explainer
blueprint.md                                   steps, states, files, and boundaries
the-brief-the-room-can-hold.script.md          the scene script - implementation source
the-brief-the-room-can-hold.html               the standalone scrollytelling article
```

## What it does

Creates a short brief a team can read aloud before discussing a design:

1. a Project Objective in two or three sentences;
2. one or two Key Personas;
3. up to three Key Scenarios; and
4. one or two Key Principles.

The format comes from Jared M. Spool's [short-form creative
brief](https://jmspool.medium.com/the-magical-short-form-creative-brief-61fb58e1dfa2). The skill also
keeps an evidence companion, because a meeting brief and the context an agent needs are different
documents.

## The two files

| File | Job |
| --- | --- |
| `CREATIVE_BRIEF.md` | The current brief. Under a page, roughly two minutes aloud, exactly four content sections. |
| `CREATIVE_BRIEF_EVIDENCE.md` | The extended context: sources, assumptions, candidate personas and scenarios, enterprise boundaries, research questions and findings, and change history. |

The second file is the long-form creative brief. It is written for people and agents who need to know
why the current selections were made. It is not read at every meeting.

Keeping them separate avoids two common failures. A short brief with all the evidence stops being
short. A short brief with no evidence trail eventually turns an assumption into something everyone
remembers as research.

## How a create pass works

The skill reads the project before asking anything. It looks for existing briefs, research, personas,
journeys, principles, decisions, and enterprise constraints. If the accessible context does not say
whether previous research exists elsewhere, it asks once.

Then it drafts the four fields itself. The designer reacts to something concrete instead of filling
an empty template. Questions are asked one at a time, with a recommended answer and the decision that
answer changes.

The short form is a selection:

- not every persona, only the one or two that affect this design round;
- not every workflow, only the one to three scenarios being designed now;
- not every design value, only the one or two principles that settle a likely trade-off.

Everything considered but not selected stays in the evidence companion.

## The Product Research Analyst round-trip

The skill does not call Product Research Analyst. It identifies the gaps that could change one of the
four fields, combines them into one prompt, saves that prompt in the evidence companion, and waits.

The designer copies the prompt to the analyst and pastes the response back. The prompt searches
internal previous research only and asks for a source, date, relevant participant or segment, and an
exact locator for every finding. `No evidence found` is a valid answer.

When the response returns, the skill maps each finding to the question it answers. A confident
summary without traceable internal evidence remains an assumption. Confirmed fields that the findings
do not affect are not reopened.

This is evidence retrieval, not a research plan. The analyst is not asked to recruit participants,
choose a method, or conduct a new study.

## Review mode

The brief is a living document. Review mode presents the four fields in read-aloud order and asks
whether they still describe the current design work.

A review with no material change updates the review record and keeps the version. A confirmed change
to the objective, selected personas, scenarios, or principles increments both files together. The
evidence companion keeps the previous value and the source or decision that changed it.

The short brief has one current copy. There is no folder of dated meeting briefs.

## Enterprise work

The four fields do not expand for enterprise projects. The skill still inspects roles, permissions,
workflow ownership, compliance, auditability, integrations, data volume, operational edge cases, and
accessibility. Those details help select the right persona, scenario, or principle and remain in the
evidence companion.

For example, a payroll project may contain ten administrator roles and thirty workflows. The short
brief might select:

- the payroll specialist who owns final validation;
- the off-cycle run started after a retroactive adjustment; and
- auditability over silent automation.

The role matrix, policy source, integration limits, and other scenarios remain available to an agent
without being read aloud at every design review.

## What it costs

A create pass takes one focused conversation plus whatever time is needed for the optional research
copy/paste round-trip. Review mode should take a few minutes when nothing changed.

The method costs more than writing four plausible paragraphs because it keeps source quality and
selection visible. It costs less than full problem framing because it does not compare causal frames,
establish a solution-open problem, or prepare the existing delivery chain.

## Who it is not for

- Deeply deciding which problem is worth solving. Use [`problem-framing`](../problem-framing/).
- Conducting research or writing a research plan. This skill searches previous internal research for
  named gaps.
- A PRD, requirements list, roadmap, solution specification, or implementation plan.
- Comparing solution mechanisms. Use [`shaping`](../shaping/).
- Writing the document a decision-maker approves or declines. Use [`proposal`](../proposal/).
- A general meeting agenda. The four fields align a design discussion; they do not organize every
  project meeting.

## Where it sits

`creative-brief` is listed beside `problem-framing` because both can start design work, but they do
different jobs.

| `creative-brief` | `problem-framing` |
| --- | --- |
| Aligns a design meeting around a selected objective, personas, scenarios, and principles | Establishes an evidence-backed, bounded problem |
| May name what the team intends to design | Keeps the frame solution-open |
| Writes `CREATIVE_BRIEF.md` and its evidence companion | Writes `FRAMED_PROBLEM.md` |
| Remains isolated | Feeds `shaping` and `proposal` |

- Skill: [`skills/process/creative-brief/SKILL.md`](../../skills/process/creative-brief/SKILL.md)
- Blueprint: [`blueprint.md`](blueprint.md)

## Sources

- Jared M. Spool, [The Magical Short-Form Creative
  Brief](https://jmspool.medium.com/the-magical-short-form-creative-brief-61fb58e1dfa2) - the four
  fields, the short read-aloud format, and the review ritual.
- Matt Pocock, [`grill-with-docs`](https://github.com/mattpocock/skills/blob/main/docs/engineering/grill-with-docs.md)
  and [`grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md)
  - inspect before asking, ask decisions in dependency order, recommend an answer, and persist what
  resolves.
- Nielsen Norman Group, [Tracking Questions, Assumptions, Research, and Facts in
  Agile](https://www.nngroup.com/articles/tracking-questions-assumptions-facts-agile/) - the evidence
  states used by the companion.

---

**Rendering.** The article has ten scenes. Checked at nine viewports from 320x568 to 1280x800, plus
reduced motion and JavaScript disabled. Every scene is reachable scrolling in both directions, with
no horizontal overflow. Least settled card clearance: 17px at 320x568 and 667x375.
