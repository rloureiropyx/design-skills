---
name: creative-brief
description: >-
  Create or review an independent short-form creative brief for a design
  project: a business- and problem-focused Project Objective, one or two
  research-backed Key Personas, up to three Key Scenarios written as user
  needs, and one or two Key Principles, backed by a separate evidence
  companion. Use when a designer asks for a creative brief, design brief,
  kickoff brief, or alignment artifact, or wants previous internal research
  incorporated through Product Research Analyst. Do NOT use it to conduct new
  research, write a research plan, PRD, requirements, roadmap, presentation,
  proposal, or implementation plan.
---

# Creative Brief

Create and maintain the short-form creative brief Jared M. Spool describes: one compact artifact the
team can read aloud before design discussion, supported by a separate evidence companion an agent can
use without making the meeting brief longer.

Use an **operator-first, research-backed, one-question-at-a-time** interview. Always ask the operator
to describe the project. Always create a Product Research Analyst prompt to retrieve previous internal
research. Recommend concrete content rather than returning a blank template.

Conduct the interview, recommendations, generated research prompt, and artifacts in **English**,
including when the user writes in another language. Say this once if needed, then stop mentioning it.

## Preserve the boundary

Produce two current files:

- `CREATIVE_BRIEF.md` is the read-aloud artifact. It has exactly four content sections: Project
  Objective, Key Personas, Key Scenarios, and Key Principles.
- `CREATIVE_BRIEF_EVIDENCE.md` is the extended context for people and agents: the operator's project
  account, sources, assumptions, persona fit and variants, user-need candidates, enterprise
  boundaries, the Product Research Analyst prompt and returned findings, and change history.

The creative brief is independent. It aligns a design conversation; it does not authorize delivery,
define requirements, choose an implementation, or replace research.

## Choose the mode

- **Create**: no current `CREATIVE_BRIEF.md` exists, or the user asks to start a new one. Run the full
  loop below.
- **Review**: a current brief exists and the user asks to review it, prepare for a design meeting, or
  update it after new evidence or project change. Read `references/review-mode.md` and run that branch.

Say which mode you are taking and why in one line.

## Create the brief

### 1. Ask the operator about the project

Begin with one open question, even when project files are available:

> Tell me about the project in your own words: what is happening, why the business cares, which people
> are affected, and what this design work needs to clarify.

Let the operator answer freely. Extract the business problem, intended outcome, affected people,
known user needs, current scope, urgency, constraints, and uncertainties. Record their statements as
observations, interpretations, commitments, preferences, assumptions, or unknowns; do not silently
promote them to research evidence.

Ask no follow-up yet. The project context and previous research may answer it.

**Completion criterion:** the evidence companion contains the operator's current account of the
project, including every part they could answer and every part they left uncertain.

### 2. Inspect the project context

Inspect every available source that could affect the brief:

- project overview, brief, README, tickets, decisions, and prior project documents;
- `research/`, `docs/`, `context/`, `personas/`, `journeys/`, and principles or standards;
- transcripts, research reports, support evidence, analytics summaries, and previous briefs;
- commitments and constraints affecting roles, needs, or design trade-offs.

Extract:

- the business problem, desired outcome, why it matters now, and the design round it applies to;
- existing persona candidates and the research supporting each one;
- user needs, including who needs what, in which context, and why the outcome matters;
- principles already used by the team, including the trade-off each one resolves;
- contradictions, stale sources, missing provenance, and unverified claims;
- enterprise boundaries: roles and permissions, workflow ownership, compliance and auditability,
  integrations, data volume, operational edge cases, and accessibility.

Build the source register and candidate tables in `CREATIVE_BRIEF_EVIDENCE.md` as you read. Give sources
stable IDs (`CB-S01`, `CB-S02`) and locators that return a reader to the exact passage, timestamp,
record, or URL.

**Completion criterion:** every available project source that could affect one of the four fields has
been read; every candidate claim has a source ID or is marked as an assumption or unknown; and the
operator's account has been compared with the accessible record.

### 3. Draft a provisional four-field brief

Draft all four sections from the operator's account and accessible context. This draft exists to make
the research prompt specific; it is not ready for confirmation.

Use this dependency order:

1. **Project Objective**: two or three sentences naming the business problem or opportunity, the
   outcome the organization needs, and why this work matters now. Keep proposed features and design
   deliverables out unless they are fixed constraints.
2. **Key Personas**: one or two existing researched personas whose differences affect this work.
3. **Key Scenarios**: one to three user needs in the form: `[Persona] needs to [goal] when [context] so
   [meaningful outcome or avoided consequence].`
4. **Key Principles**: one or two decision rules that settle a likely trade-off.

Mark unsupported material in the evidence companion, not in the short brief. Do not invent a persona
detail, user need, principle, number, or source to make the draft feel complete.

**Completion criterion:** a provisional draft contains one objective, no more than two persona
candidates, no more than three user needs, and no more than two principles; every item maps to a
candidate and evidence state in the companion.

### 4. Always retrieve previous research

Read `references/research-roundtrip.md`. Create one consolidated Product Research Analyst prompt for
every create pass. The prompt must ask the analyst to:

- find previous internal research relevant to the business problem and affected users;
- identify existing personas, the evidence behind them, and where they fit or fall short for this
  project;
- retrieve observed user needs and the contexts and consequences behind them;
- surface evidence that supports or challenges the objective and principles; and
- report gaps, contradictions, stale evidence, and `No evidence found` results.

Write the exact prompt into `CREATIVE_BRIEF_EVIDENCE.md`, set both files to `awaiting-research`, and
present it for the operator to copy to Product Research Analyst.

The human carries the prompt and pastes the response back. Stop after presenting it; do not finish the
brief from imagined findings.

**Completion criterion:** one project-specific prompt covers objective evidence, persona fit, user
needs, principles, and research limitations; it requires internal sources, dates, segments, and usable
locators; and the artifacts are paused as `awaiting-research`.

### 5. Resume from the analyst response

When the operator pastes the response:

1. map each answer to its research-question ID;
2. reject or downgrade claims with no internal source, date, segment, or locator;
3. record contradictions and stale evidence;
4. add sources without erasing prior assumptions;
5. update the objective, persona, user-need, and principle candidate sets; and
6. preserve `No evidence found` as a valid result.

The analyst response is synthesis, not authority. A confident sentence without traceable internal
evidence remains an assumption.

**Completion criterion:** every returned finding is mapped, sourced, and disposed; the companion
shows what the previous research supports, challenges, or cannot answer for each field.

### 6. Select personas and create variants only when needed

Prefer existing personas retrieved from previous research. For each persona candidate, record:

- the existing persona or segment;
- the project-relevant characteristics supported by research;
- where it fits the current work; and
- where it falls short.

Select one or two existing personas when they are specific enough to change a design decision. When
existing personas are absent, too broad, stale, or omit a material role or context, create the minimum
necessary **persona variant**. Derive the variant from the closest researched persona or segment and
label it `proposed variant`, not `researched persona`.

For each variant, explain in the evidence companion:

1. which existing persona it extends;
2. the exact shortcoming that requires the variant;
3. which traits are supported by previous research;
4. which traits are assumptions; and
5. what future evidence would validate or retire it.

A variant changes only decision-relevant characteristics. It is not permission to invent biography,
demographics, quotes, tenure, motivations, or behavioral detail.

**Completion criterion:** each selected persona is either an existing research-backed persona or an
explicit proposed variant with a documented shortcoming, derivation, assumptions, and validation need.

### 7. Resolve decisions and enforce the short form

Ask one question at a time. Choose the highest-leverage unresolved decision whose prerequisites are
settled, state what the answer will change, and recommend an answer from the current evidence.

Use these tests:

- **Objective**: Does it center the business problem, intended outcome, and why now rather than the
  design output?
- **Persona**: Would choosing a different researched persona or variant change a meaningful decision?
- **Scenario**: Is it a user need with a person, goal, context, and consequence rather than a feature,
  screen, or task inventory?
- **Principle**: Does it resolve a real trade-off?

When the operator knows the answer, record its basis. When they do not know, record the gap and move
on after asking at most who or what could answer it.

Read `templates/creative-brief.md` and `templates/creative-brief-evidence.md`. Move overflow into the
companion until the short brief has exactly four content sections and satisfies every cap. Read it
aloud in order; it should take about two minutes and make sense without opening the companion.

**Completion criterion:** every field is settled or attached to a named gap; the objective passes the
business/problem test; every persona passes the persona/variant test; every scenario passes the
user-need test; every principle resolves a trade-off; and every hard cap passes.

### 8. Confirm and save

Present the complete short brief, followed by the strongest assumption or evidence limitation. Ask:

> Does this capture the business problem and outcome, the people whose needs matter, the needs this
> work must serve, and the principles that should guide decisions?

Resolve one disagreement at a time. On confirmation:

- set both files to `ready`;
- record who confirmed them and when;
- save both in the project's established documentation directory, or the project root when none
  exists;
- keep one current copy of each file; and
- state that the team should read and reconfirm the short brief before design discussion.

If the operator requests an asynchronous draft, save both as `draft` and leave confirmation pending.

**Completion criterion:** both files are saved, their versions match, all short-form caps pass, and
the brief is either explicitly confirmed as `ready` or clearly marked `draft`.

## Review the brief

When review mode applies, read `references/review-mode.md` before asking anything. Review mode always
asks the operator to describe the current project and always creates a fresh Product Research Analyst
prompt for previous internal research relevant to the current brief.

After the response returns, reopen only fields materially affected by the operator's account, changed
project context, or returned evidence. A review with no material change updates the review record but
does not increment the version. A material field change increments both files together after
confirmation.

**Completion criterion:** the operator's current account is recorded; a fresh analyst round-trip is
complete; all four fields were tested against current evidence; changed fields were re-confirmed; and
both files show the same version and review date.

## Readiness

| Status | Meaning | Next move |
| --- | --- | --- |
| `draft` | The four fields exist but are not confirmed | Resolve open decisions or request asynchronous review |
| `awaiting-research` | The previous-research prompt is waiting on the human round-trip | Paste the Product Research Analyst response back |
| `review-needed` | Current evidence materially challenges at least one confirmed field | Reopen only affected fields |
| `ready` | The four fields are confirmed and within the short-form caps | Read and reconfirm before design discussion |

## Anti-patterns

- **Skipping the operator's account.** Project files cannot replace the operator's current
  understanding, priorities, and uncertainty.
- **Skipping the analyst round-trip.** Every create and review pass searches previous internal research
  through a project-specific Product Research Analyst prompt.
- **Turning the short brief into the long form.** Sources, constraints, candidate sets, and research
  findings belong in `CREATIVE_BRIEF_EVIDENCE.md`.
- **Adding a fifth section.** The four-field limit is the artifact.
- **Writing a delivery objective.** The Project Objective centers the business problem, outcome, and
  urgency; it is not a feature description or task list.
- **Ignoring existing personas.** Begin with personas and segments found in previous research.
- **Passing off a variant as researched.** A proposed variant names its parent persona, shortcoming,
  supported traits, assumptions, and validation need.
- **Inventing specificity.** Fictional tenure, quotes, workflows, metrics, or traits make an
  unsupported brief look researched.
- **Writing scenarios as features.** Key Scenarios are concise user needs, not screens, flows, or
  requirements.
- **Treating the analyst as authority.** A synthesized answer without an internal source and locator
  remains an assumption.
- **Invoking Product Research Analyst.** The skill generates the prompt and waits; the human performs
  the copy/paste handoff.
- **Asking for broad discovery.** The prompt searches previous internal research for this project's
  objective, personas, user needs, and principles.
- **Using external evidence to validate an internal persona.** Market context can inform a question;
  it cannot prove how this organization's users behave.
- **Selecting every persona, user need, or principle.** The short brief is a current selection from a
  larger evidence companion.
- **Writing values instead of principles.** A principle must change a decision.
- **Treating alignment as approval.** The brief aligns a design conversation; it does not authorize
  delivery.
- **Updating one file without the other.** The short brief and evidence companion share a version.
- **Creating dated copies.** Keep one current pair; preserve lineage in change history.

## Reference files

- `references/research-roundtrip.md` - the mandatory Product Research Analyst prompt, pause/resume
  contract, and evidence-ingestion rules. Read at create step 4 and during every review.
- `references/review-mode.md` - the review ritual, material-change test, and versioning rules. Read
  before review mode.
- `templates/creative-brief.md` - exact `CREATIVE_BRIEF.md` structure and caps. Read at create step 7.
- `templates/creative-brief-evidence.md` - exact evidence companion structure. Read at create step 7.

## Method sources

- Jared M. Spool, [The Magical Short-Form Creative
  Brief](https://jmspool.medium.com/the-magical-short-form-creative-brief-61fb58e1dfa2): the four
  fields, hard brevity, read-aloud agreement ritual, and living-document behavior.
- Matt Pocock, [`grill-with-docs`](https://github.com/mattpocock/skills/blob/main/docs/engineering/grill-with-docs.md)
  and [`grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md):
  ask for the project, inspect available context, ask decisions in dependency order, recommend an
  answer, and persist resolved context.
- Nielsen Norman Group, [Tracking Questions, Assumptions, Research, and Facts in
  Agile](https://www.nngroup.com/articles/tracking-questions-assumptions-facts-agile/): keep evidence
  states and provenance visible so assumptions do not harden into facts.
