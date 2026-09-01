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

The skill always begins by asking the operator to describe the project in their own words: what is
happening, why the business cares, who is affected, and what the design work needs to clarify. It
records that account without treating it as research evidence.

It then reads the available project context and drafts the four fields. The Project Objective centers
the business problem, intended outcome, and urgency. Personas begin with the personas or segments
already available in research. Key Scenarios are concise user needs: who needs what, in which context,
and why the outcome matters.

The provisional draft makes the mandatory Product Research Analyst prompt specific. Once previous
research returns, the operator reacts to concrete selections rather than filling an empty template.
Remaining decisions are asked one at a time, with a recommendation and the decision that answer
changes.

The short form is a selection:

- not every persona, only the one or two that affect this design round;
- not every workflow, only the one to three user needs that matter now;
- not every design value, only the one or two principles that settle a likely trade-off.

Everything considered but not selected stays in the evidence companion.

## The Product Research Analyst round-trip

Every create and review pass generates a Product Research Analyst prompt after the operator's account
and accessible context have been inspected. The skill does not call the analyst. It saves the prompt
in the evidence companion and waits.

The operator copies the prompt to the analyst and pastes the response back. The prompt searches
internal previous research for evidence about the business problem, existing persona fit, observed
user needs, and recurring trade-offs. It asks for a source, date, relevant participant or segment,
and exact locator for every finding. `No evidence found` is a valid answer.

When the response returns, the skill maps each finding to the question it answers. A confident
summary without traceable internal evidence remains an assumption.

This is evidence retrieval, not a research plan. The analyst is not asked to recruit participants,
choose a method, conduct a new study, select the final persona, or create a persona variant.

## Persona variants

Existing researched personas are the starting point. The evidence companion records how each persona
fits the project and where it falls short.

If existing personas are absent, too broad, stale, or miss a material role or context, the skill may
create the minimum necessary proposed variant. The variant names the persona or researched segment it
extends, the exact shortcoming it addresses, which traits are supported, which are assumptions, and
what future evidence would validate or retire it. It does not invent biography or decorative detail.

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

A create pass takes one focused conversation plus the mandatory research copy/paste round-trip.
Review mode repeats that retrieval so the brief is tested against the current internal record.

The method costs more than writing four plausible paragraphs because it keeps source quality and
selection visible.

## Who it is not for

- Conducting research or writing a research plan. This skill searches previous internal research for
  project-relevant evidence.
- A PRD, requirements list, roadmap, solution specification, or implementation plan.
- Choosing a solution mechanism or authorizing delivery.
- A general meeting agenda. The four fields align a design discussion; they do not organize every
  project meeting.

## Independent by design

`creative-brief` creates and maintains its own two-file artifact. It can use any project context the
operator provides, but no upstream document is required and no downstream workflow is implied. Its
job ends when the short brief and evidence companion are current, traceable, and confirmed.

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
