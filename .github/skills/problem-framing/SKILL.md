---
name: problem-framing
description: >-
  Frame a product problem until it is specific, evidence-backed, bounded, and
  ready for Shape. Use when a designer is starting a project from a feature
  request, complaint, opportunity, raw idea, research note, or proposed
  solution; when an in-progress project needs its problem revisited after new
  evidence, feedback, scope drift, solution lock-in, or loss of clarity; when
  assumptions or competing frames need interrogation; or when another workflow
  needs a Framed Problem before shaping a solution direction. Produces a Framed
  Problem, not a solution, execution review, PRD, or pitch. Do NOT use it for a
  direct implementation request ("add bulk edit to the grid"), a code or PR
  review, writing acceptance criteria or requirements once a pitch is approved,
  or generic plan stress-testing unrelated to what problem is being solved.
---

# Problem Framing

Interrogate an initiative before or during delivery until the team can choose what problem to solve without smuggling in a solution. Treat the frame as a working model that evidence may reopen.

Use a **docs-first, one-question-at-a-time** interview. Apply three moves: **Why** exposes the real tension, **What if** challenges the frame, and **How** turns critical uncertainty into evidence work. Apply pre-solution boundary discipline here; leave Shape and pitching to later skills.

Act as the designer's question memory system. Ensure the important questions about the user, observed episode, cause, evidence, outcome, alternatives, boundary, constraints, time budget, and risks are answered or explicitly recorded before solutions are proposed. Do not dump the checklist on the designer; choose the highest-leverage unresolved question, ask it, update the frame, and continue.

## Preserve the boundary

Produce a `Framed Problem`. Stop before solution concepts, requirements, flows, wireframes, acceptance criteria, implementation tasks, or a pitch. For work in progress, assess whether the current problem still justifies and bounds the work; leave delivery health, implementation quality, and task planning to their own reviews.

Define the **time budget** as the fixed amount of time the team is willing to spend building the solution. It is a time constraint, not an estimate derived from a predefined scope: Shape must adjust the solution to fit the chosen time. Record it when the user or source material supplies one. If it is not yet defined, do not invent it; mark it open and state the project consequence, such as expanding solution work, delaying trade-offs, or making the Pitch impossible to evaluate as a bounded commitment.

The next phase is `shape`. **Shape** means exploring materially different solution hypotheses as rough Excalidraw sketches, evaluating their trade-offs, and picking one bounded direction that is clear enough to continue. Show the mechanism, essential elements, relationships, and key interactions at low fidelity; do not create a hi-fi design or call the sketch a prototype. After Shape picks an approach, a later Pitch captures the framed problem, fixed build-time budget, chosen rough direction, boundaries, risk consequences, and exclusions in a decision-ready artifact. Once the Pitch is accepted, **Design** performs detailed interaction design, validation, and implementation guidance inside that direction, using `FRAMED_PROBLEM.md` and the Pitch as guardrails against drift. Do not shape, pitch, or design the solution during problem framing; prepare the evidence, boundaries, and open question those phases must respond to.

## Choose the entry branch

- **New project**: recover a baseline story from the raw initiative, then run the full framing loop.
- **In-progress project**: first reconstruct a frame checkpoint from the original brief, decisions, work produced, feedback, and evidence gathered since work began. Then run the same loop against the updated record.

Use the in-progress branch whenever work has begun, including discovery, solution exploration, design, prototyping, or implementation. Preserve valid prior decisions, but treat effort already spent as cost history rather than evidence that the frame is correct.

## Run the framing loop

### 1. Read before asking

Inspect every relevant document, attachment, note, product surface, research artifact, and repository source available in scope. Extract:

- raw request and any embedded solution;
- users and stakeholders: requester, primary user, beneficiary, decision-maker, and cost-bearer;
- observed episodes, current behavior, workarounds, and consequences;
- stated outcomes, constraints, commitments, and time budget;
- contradictions, missing provenance, and loaded terminology.

For an in-progress project also extract:

- original problem frame and why the work started;
- current stage, solution direction, and scope;
- decisions made, their owners, and whether they remain reversible;
- completed and in-progress work;
- user feedback, analytics, prototype learning, incidents, and technical discoveries accumulated since kickoff;
- changes to user, context, outcome, constraints, time budget, or organizational priority;
- the event or concern that triggered this framing checkpoint.

Build a private ledger using these labels:

- **Observation**: directly seen or traceable to a source.
- **Interpretation**: an explanation of observations.
- **Assumption**: an unverified condition the frame depends on.
- **Commitment**: a decision already made by an authorized person.
- **Preference**: a value judgment or favored direction.

Completion criterion: every material claim in the input is classified, facts discoverable from available sources have been looked up instead of delegated to the user, and an in-progress project has a traceable record of original frame, current work, intervening evidence, and existing commitments.

### 1A. Diagnose frame drift for work in progress

Compare the original frame, current project, and evidence gathered since kickoff. Identify:

- **Problem drift**: the user, context, tension, consequence, or desired outcome has changed.
- **Scope drift**: adjacent work entered without sharing the same baseline story and outcome.
- **Solution lock-in**: the problem statement now exists mainly to justify the chosen mechanism.
- **Evidence reversal**: observed behavior weakens a critical original assumption.
- **Constraint drift**: time budget, policy, technical reality, or organizational priority changed.
- **Learning without incorporation**: the team learned something decision-changing but continued under the old frame.

Classify prior decisions as `preserve`, `revisit`, or `superseded`, with the evidence and consequence for each. Distinguish irreversible commitments from reversible choices and sunk cost.

Completion criterion: every material difference between the original and current frame has a cause, evidence, and decision consequence. Skip this step for a new project.

### 2. Recover the baseline story

Replace the feature label or generalization with at least one concrete episode:

`[User] tried to [goal] in [context], but [current limitation], so [workaround or failure], causing [meaningful consequence].`

Lead with: “Tell me about the most recent time this happened. What was the person trying to do, where did they get stuck, what did they do next, and what was the consequence?” Ask only the first unresolved part, then follow the answer.

Ask for observable behavior when the answer uses abstractions such as “better experience,” “more intuitive,” “users need,” or “improve engagement.” Distinguish who asks for the work from who experiences the problem.

Completion criterion: a reader can picture where the current way breaks, or the missing episode is explicitly marked as a critical evidence gap.

### 3. Grill the causal frame

Ask one high-leverage question at a time and wait for the answer. With each question:

1. State what uncertainty or decision the question tests.
2. Offer a recommended answer or working hypothesis based on current evidence.
3. Update the ledger after the response.
4. Follow the branch until it is resolved or converted into an evidence need.

Pressure-test:

- symptom versus cause;
- frequency, severity, and consequence;
- affected user versus vocal requester;
- current workaround and why it is insufficient;
- business outcome versus user outcome;
- alternative explanations for the same behavior;
- the consequence of leaving the situation unchanged;
- solution language hidden inside the problem statement.

When a proposed solution dominates the discussion, set that mechanism aside and ask what outcome still matters. Challenge the idea, not the person.

Completion criterion: the central tension is causal enough to guide exploration, and each unresolved causal claim appears in the assumption ledger.

### 4. Compare plausible problem frames

Generate three to five materially different candidate frames. Vary at least two of: user, moment, causal explanation, desired outcome, or boundary. Include:

- the strongest version of the original frame;
- a credible competing explanation;
- a narrower frame that could stand alone;
- a frame that removes the proposed solution.

Explain the purpose in plain language: the same behavior can have different causes, users, or useful boundaries. Comparing those explanations prevents the first plausible story from becoming the problem by default.

Present the candidates to the designer and ask: “Which explanation best matches what we have observed, and what evidence would make us choose another?” Recommend one before asking.

Compare candidates on:

- **Decision relevance**: choosing it would change what the team explores.
- **Evidence fit**: observations support it without overstating certainty.
- **Leverage**: it addresses a meaningful cause or bottleneck.
- **Ownership**: the team can influence the outcome.
- **Openness**: multiple solution mechanisms remain possible.
- **Boundability**: a coherent fraction can be explored separately.

Recommend one frame and explain the decisive trade-off. Keep rejected frames with the evidence that would revive them.

Completion criterion: at least one plausible competing frame has received a fair test, and the recommendation follows from stated evidence and trade-offs.

### 5. Pass the evidence gate

Rank assumptions using four questions:

1. Would falsity materially change or stop the project?
2. Is current evidence weak, indirect, stale, or contradictory?
3. Can additional evidence realistically reduce the uncertainty?
4. Would the result change the selected frame or its boundary?

Trigger focused evidence work only when all four answers are yes. First use sources already in scope. Then use the designer's research library and metrics tool when available; ask for a targeted input or run the tool directly instead of requesting “more research” in general.

For a **metrics input**, specify:

- assumption and decision it informs;
- behavior or event to measure;
- population, segment, or cohort;
- timeframe and comparison baseline;
- funnel step, frequency, or outcome when relevant;
- result that would support, weaken, or split the frame.

For a **research-library input**, specify:

- assumption and decision it informs;
- user or segment;
- situation, task, or moment to search for;
- observations, workarounds, objections, or consequences needed;
- relevant recency or product context;
- finding that would support, weaken, or split the frame.

Ask the designer one evidence-input question at a time. Recommend the exact query or filter to use. If neither source can answer the uncertainty, produce a focused evidence request containing:

- assumption to test;
- decision it informs;
- current evidence and provenance;
- smallest credible method;
- signal that supports or weakens the assumption;
- stopping condition;
- owner, when known.

After new evidence arrives, return to the baseline story and candidate frames. General research that cannot change a decision does not block framing.

Completion criterion: every high-impact, low-confidence assumption is either supported, explicitly accepted as risk, attached to a targeted metrics or research-library input, or attached to another decision-changing evidence request.

### 6. Bound the chosen problem

Define:

- primary user: the person who directly experiences the problem;
- context: the moment and conditions in which the problem occurs;
- desired outcome: the observable behavior or decision that should improve;
- problem slice included now: the meaningful part the team will address, which may be smaller than the whole problem;
- adjacent problems and users outside this frame;
- constraints and commitments: fixed limits or prior decisions that the work must respect;
- time budget, if supplied: the fixed build time the team chooses to invest; constrain time and adapt the solution rather than estimating time from a fixed scope;
- major risks: uncertainties, dependencies, policy, data, or organizational issues likely to destabilize future solution exploration;
- explicit exclusions: directions intentionally excluded from this framing pass.

Some constraints and exclusions are optional at this stage. Never fabricate them merely to complete the template. For every optional field left undefined, record:

1. what is unknown or undecided;
2. why it may be acceptable to defer;
3. what could concretely happen in Shape, Pitch, or Design if it remains undefined;
4. the latest decision point by which it must be resolved.

Write consequences as project behavior, not generic risk labels. Prefer “without a supported-payroll boundary, Shape may spread across every payroll configuration and exceed the two-week build budget” over “scope risk.”

Use a compact example when explaining the boundary. For the onboarding case:

- **User**: a trial admin whose setup requires Finance approval.
- **Context**: before account setup, when required approvals and information must already be available.
- **Desired outcome**: the admin arrives prepared and can complete setup without contacting support.
- **Constraint**: Finance owns the approval and the product cannot bypass it.
- **Time budget**: two weeks of build time, only if the team has explicitly chosen that investment; Shape must reduce or change the solution to fit it.
- **Major risk**: the product may not be able to identify Finance-dependent accounts early enough.
- **Chosen slice**: help these admins prepare before setup—not redesign onboarding for every user or solve the entire approval process.

For an in-progress project, also state which current work remains aligned, which solution decisions need to be revisited, and which work falls outside the revised frame. Describe impact without producing an implementation plan.

Split grab bags whose parts do not share one user, baseline story, and outcome. Preserve constraints as constraints; keep proposed mechanisms in the source record rather than in the chosen frame.

Completion criterion: the included slice forms one coherent solution-exploration challenge, and exclusions prevent adjacent work from silently entering it.

### 7. Form the working question

Write a question that preserves the tension and invites multiple mechanisms. Prefer:

`How might we help [user] achieve [observable outcome] when [context/tension], while respecting [material constraint]?`

Use the template only when it clarifies the frame. Test the question:

- Does it change an important design decision?
- Does it describe an outcome rather than an artifact?
- Can multiple legitimate approaches answer it?
- Can evidence or a future solution test it?
- Can the team act on it inside the chosen boundary?

Completion criterion: all five answers are yes, or the artifact remains `needs-reframing` with the failed checks named.

### 8. Confirm and emit the handoff

Present the recommended frame and its strongest unresolved challenge. Ask the user to confirm the frame before marking it ready. If the user requested an asynchronous pass, emit a draft and mark assumptions and confirmation as pending.

Write in the user's language. Save the confirmed artifact inside the project as `FRAMED_PROBLEM.md`, using the project's established documentation directory when one exists and the project root otherwise. Update that same file on later framing passes; keep one current source of truth.

Treat `FRAMED_PROBLEM.md` as durable project context and the project's **problem north star**: the shared reference for deciding whether later solution sketches, scope changes, and implementation decisions still address the chosen problem. Future solution exploration, research, design, implementation, and review work must read it before making decisions that depend on the problem, audience, outcome, evidence, or boundary. When new evidence changes the frame, update this document before dependent work continues.

Use the following exact top-level structure so a future `shape` workflow and other project work can consume it:

```markdown
# Framed Problem: <working title>

## Status
`ready-for-shape | revisit-shape | continue-current-frame | evidence-needed | needs-reframing | split | stop`

## Source request
The raw initiative and any proposed solution, kept as source context.

## Project checkpoint
For in-progress work: current stage, original frame, solution direction, work produced, decisions and reversibility, new evidence, trigger for review, and sunk-cost boundary. Use `Not applicable — new project` otherwise.

## What changed
For in-progress work: what changed since kickoff, why it matters, and which prior decisions remain valid or need reopening. Use `Not applicable — new project` otherwise.

## Baseline story
User, goal, context, current limitation, workaround or failure, and consequence.

## Chosen problem frame
A concise statement of the tension worth solving.

## Users and outcomes
Primary user, other stakeholders, current behavior, and observable desired outcome.

## Evidence ledger
Observations with provenance; interpretations kept distinct.

## Assumption ledger
Assumption, impact if false, confidence, current support, and disposition.

## Alternative frames considered
Material alternatives, trade-offs, rejection reason, and evidence that could revive each.

## Working question
The open, actionable question Shape will answer.

## Boundaries
In scope, out of scope, constraints, commitments, fixed build-time budget if given, explicit exclusions, and any undefined optional boundary with its concrete project consequence and decision deadline.

## Major risks
Risks that could invalidate or destabilize the frame during solution exploration. State what each risk could cause in Shape, Pitch, or Design rather than naming the risk alone.

## Evidence requests
Targeted inputs still required from the research library, metrics tool, or another source. Include the exact query or filter, the decision informed, the signal sought, and the stopping condition.

## Shape handoff
What the future `shape` workflow may treat as settled, what remains flexible, which existing solution decisions are preserved or reopened, and which uncertainties its rough Excalidraw hypothesis sketches must address.

## Context use
Where this file lives in the project, how it serves as the problem north star, which workflows must reference it, and which evidence or decision would require it to be updated.

## Confirmation
Who confirmed the frame, when, and any explicit risk accepted.
```

## Readiness rule

Mark `ready-for-shape` for a new project, or `revisit-shape` for an in-progress project whose frame changed, only when all are true:

- a concrete baseline story exists;
- the chosen frame names a user, tension, consequence, and desired outcome;
- evidence and interpretation are distinguishable and traceable;
- critical assumptions have a disposition;
- materially different frames were compared;
- the working question remains solution-open;
- scope, exclusions, constraints, and major risks are explicit, or an optional undefined boundary includes its concrete consequence and decision deadline;
- future solution exploration can compare mechanisms without reopening the basic problem;
- the current `FRAMED_PROBLEM.md` is saved in the project and identified as required context for dependent work;
- the user confirmed the frame.

Mark `continue-current-frame` only when the in-progress checkpoint finds that new evidence still supports the original user, tension, outcome, and boundary; critical assumptions remain adequately covered; and no decision-changing drift is unresolved. State which evidence justifies continuing.

Otherwise choose the most informative non-ready status. Recommend `stop` when evidence removes the meaningful problem or ownership, regardless of effort already spent; recommend `split` when no single coherent tension survives; recommend `evidence-needed` only for a decision-changing gap.

## Explain and execute the next move

Pair every status with one explicit action:

- **`ready-for-shape`**: hand `FRAMED_PROBLEM.md` to Shape. Preserve the working question, fixed build-time budget, boundaries, and unresolved uncertainties while exploring approaches.
- **`revisit-shape`**: return the current approach to Shape because the frame changed. State which solution decisions remain valid and which must be evaluated again.
- **`continue-current-frame`**: continue the active project under the existing problem north star. Cite the new evidence that supports continuing and keep monitoring the stated risks.
- **`evidence-needed`**: request the exact metric, research-library input, or smallest credible study that can change the frame. Return to problem framing after the evidence arrives.
- **`needs-reframing`**: return to the baseline story or competing frames because the current user, cause, outcome, or boundary is not coherent enough to guide solutions.
- **`split`**: create a separate framing pass and `FRAMED_PROBLEM.md` for each independent user, tension, or outcome. Do not send the combined initiative to Shape.
- **`stop`**: record why the problem lacks sufficient evidence, value, ownership, or relevance, and stop dependent Shape, Pitch, and Design work.

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Accepting the requested mechanism as the problem.** "Add bulk edit," "add an AI summary,"
  and "make it clearer" are proposed solutions. Recover the episode underneath before the
  mechanism earns any standing in the frame.
- **Promoting demand into cause.** "Two clients escalated" is an observation. "Admins need
  bulk edit" is an interpretation of it. Recording the second as though it were the first is
  the most common way a frame goes wrong.
- **Inventing a measurement nobody took.** If no one has timed the merit cycle, say so and
  record the consequence of not knowing. Never supply a plausible number to make the frame
  look complete.
- **Converting a calendar deadline into a build-time budget.** "This quarter" is a date, not
  an amount of build time the team has chosen to invest. Leave the time budget open and state
  what that costs downstream.
- **Treating effort already spent as evidence.** Eight weeks of work and thirty hi-fi screens
  are cost history. They say nothing about whether the problem was framed correctly.
- **Reviewing the execution instead of the frame.** On an in-progress checkpoint, do not
  critique screens, delivery plans, or implementation quality. Assess whether the problem
  still justifies and bounds the work, and leave the rest to its own review.
- **Blurring what is fixed by law or policy with what is a presentation choice.** In regulated
  surfaces, name which parts cannot change before scoping anything.
- **Scoping before the affected role is known.** When several roles see different subsets of
  the same surface, "who is confused" is a prerequisite to any boundary, not a detail.
- **Dumping the checklist.** The question set is the skill's memory, not its script. Ask the
  highest-leverage unresolved question, one at a time, and follow the answer.
- **Asking for facts already on record.** Read the available documents, notes, and repository
  sources first. Asking the designer for something the brief already states wastes the one
  resource framing depends on: their willingness to keep answering.
- **Requesting research that cannot change a decision.** "Let's do more discovery" is not an
  evidence request. Name the assumption, the decision it informs, and the result that would
  move the frame — or accept the risk explicitly and move on.
- **Producing the next phase's artifact while explaining why you will not.** When a request
  arrives post-pitch asking for acceptance criteria, flows, or wireframes, name the boundary
  and the correct phase. Do not emit a sample as an illustration.

## Method sources

This skill combines three sources; preserve their roles when revising it:

- Warren Berger, [*A More Beautiful Question*](https://amorebeautifulquestion.com/): use `Why → What if → How` to move from questioning the situation, through competing possibilities, to an evidence-producing next step.
- Ryan Singer, [*Shape Up*](https://basecamp.com/shapeup): a product-development method created at Basecamp. It calls the pre-build phase **shaping**: define a rough direction and fixed build-time budget, adapt the solution to the available time, and make boundaries, risk consequences, and exclusions explicit without specifying every detail.
- Matt Pocock, [`grill-with-docs`](https://github.com/mattpocock/skills/blob/main/docs/engineering/grill-with-docs.md) and [`grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md): ask one question at a time, recommend an answer, inspect available project context before asking for facts, and preserve the resulting shared understanding in the project.
