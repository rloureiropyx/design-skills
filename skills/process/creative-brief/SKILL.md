---
name: creative-brief
description: >-
  Create or review a short-form creative brief for a design project: a compact
  Project Objective, one or two Key Personas, up to three Key Scenarios, and one
  or two Key Principles, backed by a separate evidence companion. Use when a
  designer asks for a creative brief, design brief, short-form brief, project
  kickoff brief, or a repeatable alignment artifact to read at design meetings;
  or wants prior internal research turned into the prompt and evidence for that
  brief. Do NOT use it to deeply establish which problem is worth solving or to
  produce FRAMED_PROBLEM.md (that is `problem-framing`), conduct research or
  write a research plan, compare solution directions, write a PRD, requirements,
  roadmap, proposal, presentation, or implementation plan.
---

# Creative Brief

Create and maintain the short-form creative brief Jared M. Spool describes: one compact artifact the
team can read aloud before design discussion, supported by a separate evidence companion an agent can
use without making the meeting brief longer.

Use a **docs-first, one-question-at-a-time** interview. Inspect the project before asking for facts,
write a concrete draft rather than a blank template, recommend an answer to each decision, and keep
the short form short.

Conduct the interview, recommendations, generated research prompt, and artifacts in **English**,
including when the user writes in another language. Say this once if needed, then stop mentioning it.

## Preserve the boundary

Produce two current files:

- `CREATIVE_BRIEF.md` is the read-aloud artifact. It has exactly four content sections: Project
  Objective, Key Personas, Key Scenarios, and Key Principles.
- `CREATIVE_BRIEF_EVIDENCE.md` is the extended context for people and agents: sources, assumptions,
  fuller candidate sets, enterprise boundaries, the Product Research Analyst prompt and returned
  findings, and change history.

This is an alternative project-start artifact, not an input to the repository's
`FRAMED_PROBLEM.md -> DIRECTIONS.md -> PROPOSAL.md` chain. Do not generate `FRAMED_PROBLEM.md`, infer
that the brief authorizes delivery, or silently hand it to `shaping`.

The brief may name what the team intends to design. Do not force its Project Objective to become a
solution-free problem statement; that would turn this artifact into `problem-framing`. Preserve the
wording and boundary of Spool's format.

## Choose the mode

- **Create**: no current `CREATIVE_BRIEF.md` exists, or the user asks to start a new one. Run the full
  loop below.
- **Review**: a current brief exists and the user asks to review it, prepare for a design meeting, or
  update it after new evidence or project change. Read `references/review-mode.md` and run that branch.

Say which mode you are taking and why in one line.

## Create the brief

### 1. Read before asking

Inspect every available source in scope before asking the user a question:

- project overview, brief, README, tickets, decisions, and prior proposals;
- `research/`, `docs/`, `context/`, `personas/`, `journeys/`, and principles or standards;
- transcripts, research reports, support evidence, analytics summaries, and previous briefs;
- commitments and constraints that affect roles, scenarios, or design trade-offs.

Extract:

- the current project objective and the design round it applies to;
- persona candidates and the research that supports each one;
- concrete scenarios, including trigger, goal, context, and consequence;
- principles already used by the team, including the trade-off each one resolves;
- contradictions, stale sources, missing provenance, and unverified claims;
- enterprise boundaries: roles and permissions, workflow ownership, compliance and auditability,
  integrations, data volume, operational edge cases, and accessibility.

Build the source register and candidate tables in `CREATIVE_BRIEF_EVIDENCE.md` as you read. Give sources
stable IDs (`CB-S01`, `CB-S02`) and locators that return a reader to the exact passage, timestamp,
record, or URL.

If no accessible source identifies whether prior internal research exists, ask once:

> Is there internal project or product research I cannot access that could help select the personas
> or scenarios for this brief? You can point me to it, paste it here, or say there is none.

Do not ask this when the project already answers it. A source not found is not proof that none exists.

**Completion criterion:** every available project source that could affect one of the four brief
fields has been read; every candidate claim has a source ID or is marked as an assumption or unknown;
and unavailable prior research has been asked about once or its absence is already established.

### 2. Draft the four fields

Draft all four sections from the available context before interviewing further. Mark unsupported
material in the evidence companion, not in the short brief. Do not invent a persona detail, scenario
episode, principle, number, or source to make the draft feel complete.

Work in this dependency order:

1. **Project Objective**: two or three sentences describing what this part of the project will
   accomplish relative to the larger effort.
2. **Key Personas**: one or two researched personas whose differences affect this design round.
3. **Key Scenarios**: no more than three situations the current design must serve.
4. **Key Principles**: one or two decision rules that settle a likely trade-off in this iteration.

The fields are selected subsets, not miniature repositories. The evidence companion may hold a larger
persona set, scenario set, or principles set; the short brief carries only what the current design
meeting needs.

**Completion criterion:** a complete draft exists with one objective, no more than two personas, no
more than three scenarios, and no more than two principles; every included item maps to a candidate
and evidence state in the companion.

### 3. Grill the unresolved decisions

Ask one question at a time. Choose the highest-leverage unresolved decision whose prerequisites are
settled, say what the answer will change, and give a recommended answer from the current evidence.

Use these decision tests:

- **Objective**: Is this the specific part of the project the team is designing now?
- **Persona**: Would selecting a different persona change a meaningful design decision?
- **Scenario**: Does this describe a situation with a trigger, goal, and context, rather than a feature
  or generic task?
- **Principle**: Does this resolve a real trade-off, or would every team claim to agree with it?

When the user knows the answer, record their answer with the correct basis:

- a traceable source is evidence;
- a team decision is a commitment;
- a design value is a preference;
- a plausible answer without support is an assumption.

Do not keep pressing when the user says they do not know. Record the gap, ask at most who or what
could answer it, and continue until all currently answerable decisions are settled.

**Completion criterion:** each of the four fields is either settled provisionally or attached to a
specific evidence gap; the user has not been asked for any fact already available in project context.

### 4. Decide whether prior research is needed

Research is useful here only to choose or correct brief content. Review every unsupported or
contradictory candidate and ask:

1. Could existing internal research realistically answer this?
2. Would the answer change the objective, selected personas, scenarios, or principles?

Only gaps with two yes answers enter the research prompt. Everything else remains a named assumption,
unknown, commitment, or preference in the evidence companion and does not delay the brief.

If no gap qualifies, continue to step 6.

If one or more qualify, read `references/research-roundtrip.md`, write one consolidated Product
Research Analyst prompt into `CREATIVE_BRIEF_EVIDENCE.md`, set both files to `awaiting-research`, and
present the exact prompt for the user to copy.

Never invoke the Product Research Analyst yourself. The human carries the prompt and pastes the
response back.

**Completion criterion:** every decision-changing evidence gap is in one consolidated prompt with a
source scope, required provenance, and a clear "no evidence found" result; all other gaps have an
explicit disposition.

### 5. Pause and resume from the analyst response

Stop after presenting the prompt. Do not finish the brief from imagined findings and do not move on to
confirmation in the same turn.

When the user pastes the response:

1. map each answer to its research-question ID;
2. reject or downgrade claims with no internal source, date, segment, or locator;
3. record contradictions and stale evidence;
4. update candidate evidence states without erasing the prior assumption;
5. revise only the brief fields the findings affect; and
6. ask one follow-up at a time only when the response creates a new decision the user must make.

The analyst response is synthesis, not authority. A confident sentence without traceable internal
evidence remains an assumption.

**Completion criterion:** every returned finding is mapped, sourced, and disposed; no settled field
was re-derived merely because research returned; and affected fields have a revised recommendation.

### 6. Enforce the short form

Read `templates/creative-brief.md` and `templates/creative-brief-evidence.md`. Move overflow into the
companion until the short brief satisfies all four caps:

- one Project Objective of two or three sentences;
- one or two Key Personas;
- one to three Key Scenarios;
- one or two Key Principles.

Do not add constraints, requirements, research findings, source tables, risks, or next steps as a
fifth content section. Material enterprise constraints may affect which personas, scenarios, and
principles are selected; their full detail stays in the companion.

Read the brief aloud in order. It should take about two minutes and make sense without opening the
companion.

**Completion criterion:** the brief has exactly four content sections, stays within every cap, and
can be read independently while every statement remains traceable through the evidence companion.

### 7. Confirm and save

Present the complete short brief, followed by the single strongest assumption or evidence limitation
from the companion. Ask:

> Does this describe what the team is designing now, for whom, in which situations, and under which
> principles?

Resolve one disagreement at a time. On confirmation:

- set `CREATIVE_BRIEF.md` to `ready`;
- record who confirmed it and when in `CREATIVE_BRIEF_EVIDENCE.md`;
- save both files in the project's established documentation directory, or the project root when none
  exists;
- keep one current copy of each file; and
- state that the team should read and reconfirm the short brief before design discussion.

If the user requests an asynchronous draft, save both as `draft` and leave confirmation pending.

**Completion criterion:** both files are saved, their versions match, all short-form caps pass, and
the brief is either explicitly confirmed as `ready` or clearly marked `draft`.

## Review the brief

When review mode applies, read `references/review-mode.md` before asking anything. Present the current
brief in read-aloud order, compare it with the current project evidence, and reopen only the fields
whose objective, selection, or trade-off changed.

Use the same research gate and human copy/paste round-trip when new evidence is needed. A review with
no material change updates the review record but does not increment the brief version. A material
field change increments both files together after confirmation.

**Completion criterion:** all four current fields were tested against current evidence; changed fields
were re-confirmed; both files show the same version and review date; and the change history names what
changed or records `no material change`.

## Readiness

`CREATIVE_BRIEF.md` uses one status:

| Status | Meaning | Next move |
| --- | --- | --- |
| `draft` | The four fields exist but are not confirmed | Resolve open decisions or request asynchronous review |
| `awaiting-research` | A consolidated internal-research prompt is waiting on the human round-trip | Paste the Product Research Analyst response back into this skill |
| `review-needed` | Current evidence materially challenges at least one confirmed field | Run review mode and confirm the revision |
| `ready` | The four fields are confirmed and within the short-form caps | Read it at the start of design meetings; review when the project changes |

## Anti-patterns

- **Turning the short brief into the long form.** Sources, constraints, complete persona sets, and
  research findings belong in `CREATIVE_BRIEF_EVIDENCE.md`.
- **Adding a fifth section.** The four-field limit is the artifact, not a starting point.
- **Turning the Project Objective into problem framing.** Spool's brief can name what the team is
  designing. Deeply establishing whether that is the right problem belongs to `problem-framing`.
- **Inventing specificity.** A fictional tenure, quote, workflow, metric, or persona trait makes an
  unsupported brief look researched.
- **Treating the analyst as authority.** A synthesized answer without an internal source and locator
  remains an assumption.
- **Invoking Product Research Analyst.** This skill generates the prompt and waits; the human performs
  the copy/paste handoff.
- **Producing several research prompts.** Finish the initial brief pass, consolidate the
  decision-changing gaps, and make one handoff.
- **Asking for broad discovery.** Search prior internal research for named gaps. "Tell me everything
  about payroll admins" is not a targeted request.
- **Using external evidence to validate an internal persona.** Market context can inform a question;
  it cannot prove how this organization's users behave.
- **Re-asking every field after research returns.** Revise only the fields the findings affect.
- **Selecting every persona, scenario, or principle.** The short brief is a current selection from a
  larger set.
- **Writing values instead of principles.** "Be intuitive" settles no trade-off. A principle must
  change a design decision.
- **Treating a kickoff brief as approval to build.** It aligns a design conversation; it does not
  authorize delivery.
- **Updating one file without the other.** The short brief and evidence companion share a version.
- **Bumping the version after a no-change review.** Record the review; version only a material field
  change.
- **Creating a third long-form brief.** The evidence companion is the extended agent context.

## Reference files

- `references/research-roundtrip.md` - the Product Research Analyst prompt, pause/resume contract, and
  evidence-ingestion rules. Read at step 4 only when a gap qualifies.
- `references/review-mode.md` - the review ritual, material-change test, and versioning rules. Read
  before review mode.
- `templates/creative-brief.md` - exact `CREATIVE_BRIEF.md` structure and location. Read at step 6.
- `templates/creative-brief-evidence.md` - exact extended companion structure. Read at step 6.

## Method sources

- Jared M. Spool, [The Magical Short-Form Creative
  Brief](https://jmspool.medium.com/the-magical-short-form-creative-brief-61fb58e1dfa2): the four
  fields, hard brevity, read-aloud agreement ritual, and living-document behavior.
- Matt Pocock, [`grill-with-docs`](https://github.com/mattpocock/skills/blob/main/docs/engineering/grill-with-docs.md)
  and [`grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md):
  inspect before asking, ask decisions in dependency order, recommend an answer, and persist resolved
  context.
- Nielsen Norman Group, [Tracking Questions, Assumptions, Research, and Facts in
  Agile](https://www.nngroup.com/articles/tracking-questions-assumptions-facts-agile/): keep evidence
  states and provenance visible so assumptions do not harden into facts.

