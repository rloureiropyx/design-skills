---
name: proposal
description: >-
  Write the document people read once and then decide on: problem, time budget,
  chosen direction, rabbit holes, and what is deliberately out.
  Use when a solution direction has been chosen and needs sign-off; when
  someone asks for a proposal, a "propuesta", a one-pager, or a project brief for
  work that is already shaped; or when a stakeholder asks what they are being
  asked to commit to. Reads a Framed Problem and a Directions
  document, writes `PROPOSAL.md`. Do NOT use it to decide which problem is worth
  solving or to challenge a frame — that is `problem-framing`. Do NOT use it to
  explore or compare solution options, run a fit check, or resolve unknowns —
  that is `shaping`. Do NOT use it to re-voice, de-slop, or line-edit a proposal
  that already exists — that is `slop-check`. Do NOT use it to narrate a decision
  already made, or to write a talk, an article, or a deck — that is `pitch`. Do
  NOT use it for a PRD, a requirements specification, acceptance criteria, a
  roadmap, a status report, or a retrospective.
---

# Proposal

Write the document people read once and then decide on. It puts five things in one place: the problem, the time the business is willing to spend, the direction chosen to fit that time, the parts deliberately left out, and what could still go wrong.

This is assembly work, not new thinking. If the case has to be sold, the framing was weak, and better writing here will not fix that. Write it so someone who was in none of the conversations can decide, and so a builder six weeks later can tell what was promised.

Conduct the conversation and the written document in the user's language.

## Preserve the boundary

**Inputs**: `FRAMED_PROBLEM.md` and `DIRECTIONS.md`.

**Output**: `PROPOSAL.md`.

Everything here is **carried, never re-derived**. The problem and outcome come from the frame. The direction, requirements, and cuts come from the directions document. The work is selection, compression, and honesty about what is not settled.

The project context library named in the frame's `## Context use` section is a third input, read-only. Use it to check that what the proposal says about the product is still true, and to cite something a reader can verify. Do not use it to add a fact the frame and the directions document do not already carry.

Stop before detailed interaction design, wireframes, visual design, acceptance criteria, implementation planning, or tickets. Those come after the decision.

## Refuse to write over gaps

Check these before writing anything. Each has a specific consequence:

| Missing | Why it blocks the proposal |
| --- | --- |
| `FRAMED_PROBLEM.md` | There is no agreed problem. The reader is asked to approve a solution without being told what it is for. |
| `DIRECTIONS.md` with a selected direction | There is nothing to decide on. Go back to `shaping`. |
| A time budget | Without one the reader cannot judge the trade. "As long as it takes" is not a commitment. |
| An unresolved `⚠️` on the selected direction | The team cannot describe how part of it works. Writing it up turns an absence into a promise. Send it back for a spike, or move that part out of scope and say so. |

When something is missing, say which one, what it costs, and which skill resolves it. Do not write a partial proposal "so there is something to react to" — a document that looks decision-ready gets treated as decision-ready.

## Assemble it

### 1. Carry the frame

Copy the problem, the desired outcome, and the primary user from `FRAMED_PROBLEM.md`. Compress; do not restate in new words. If a sentence cannot be traced to a line in the frame or the directions document, it does not belong.

Keep the evidence thin but present, so the reader knows this came from something real. One or two attributed observations beat a page of them.

Completion criterion: every claim about the problem traces to `FRAMED_PROBLEM.md`.

### 2. Put the time budget above the solution

The time budget is the frame the reader judges the solution inside: *this much time, spent on this*. Put it early and say where the number came from. Mentioned after the solution, it reads as an estimate of it, and the trade disappears.

Completion criterion: the reader knows the size of the commitment before they read what it buys.

### 3. Present the direction

Describe the selected direction at the resolution it was worked out at: the mechanism, the parts as things a person can experience, and how they relate. Include a breadboard, sketch, or diagram only if one already exists — do not produce new design work to illustrate the document.

Be concrete about what it does and deliberately vague about how it looks. The people who build it need room for the hundreds of decisions this document does not contain.

Completion criterion: a reader can say what the thing does, and a builder still has real decisions to make.

### 4. Name the rabbit holes

The technical or design details that could swallow the time, and the decision already taken about each. A rabbit hole is worth listing only with its patch: *"we are not doing X; if it turns out to be required, that is a separate decision"*.

Rabbit holes that a spike resolved are listed as resolved, with what was learned. A reader who can see the team went and looked trusts the rest of the document more.

Completion criterion: every known way this could overrun is named with the decision that contains it.

### 5. Name what is out

Take these from the frame's exclusions and the cuts made while shaping, and write each as a decision with a reason rather than an omission.

Write *"not this time, because …"* rather than "we are not doing that". A document that rules something out permanently stops it being reconsidered when the evidence changes.

Completion criterion: everything a reasonable reader would assume is included, and is not, is listed.

### 6. Say what is still open

The risks the frame flagged, the assumptions still unverified, and the parts left for Design to decide. A reader who later finds a surprise that was known now will discount every future proposal.

Completion criterion: nothing known to be uncertain is presented as settled.

### 7. Write and confirm

Write `PROPOSAL.md` using the structure in `templates/proposal.md`. Read that file before writing; it also says where to save the document. Read `references/prose.md` as well: here the AI-slop patterns are a traceability problem, not a style one — puffery, unattributed claims, and invented consequences are exactly the sentences that trace back to nothing.

Before saving, run two passes over the prose:

1. **Voice.** Load `WRITING_STYLE.md` if one exists — the project's documentation directory, then the root — and apply its observed rules to the sentences. If there is none, say so in one line and offer `writing-style`; do not block the proposal on it. The profile governs sentence-level voice only. It never changes a section, an order, or a claim. When a profile rule would make the document read as advocacy, the document wins: this one is supposed to be un-sold, and voice is the door selling comes back through.
2. **Slop.** Run the `slop-check` edit pass once, and close it on the checklist at the end of `references/prose.md`. `slop-check` owns the pattern list and the voice-profile precedence; `references/prose.md` adds what this document is stricter about — vague quantities, urgency language, unattributed claims, and vocabulary drift. One pass, both files. The taxonomy is a concrete version of what the anti-patterns below already forbid in the abstract: puffery, fake-strong verbs, faux-insight setups and unnamed attribution are what "selling" looks like sentence by sentence.

Neither pass may add, remove, or soften a claim. If either wants to, that is a finding about the proposal, not about the prose — say so and leave the sentence.

Present it and ask for one thing: the decision. Go ahead, do not go ahead, or send it back with a named reason.

Completion criterion: the document is saved, both passes have run, no sentence in it exists only to make a paragraph land, and the decision asked for is explicit.

## Enterprise constraints to surface

The people deciding carry risks the shaping conversation may not have voiced. Check that the proposal states, where they apply:

- which **roles** are affected and whether any permission model changes;
- what becomes **auditable**, what is retained, and what a regulator or auditor would see;
- which **systems of record** this depends on, and who owns them;
- what **operational** load this adds — support, configuration, migration, customer communication;
- which **accessibility** commitments are part of this work rather than a later remediation;
- who outside the team must **agree** before this can ship, and whether they have.

Any of these arriving after the decision is how a bounded project quietly becomes a bigger one.

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Selling.** Superlatives, urgency language, and a business case that grows to fill the page mean the
  framing did not do its job. State the problem, the time budget, and the direction, and let people decide.
- **Re-deriving the problem.** Rewriting the problem in fresh words quietly changes it, and the version
  people approve stops matching the version that was framed and evidenced.
- **Mining the context library for new facts.** The library is there to verify what the proposal claims
  about the product, not to top it up. A fact appearing here for the first time was never framed, never
  explored, and never fit-checked.
- **Writing over an unresolved flag.** A `⚠️` that survives into the proposal becomes a promise the team
  cannot keep. Send it back for a spike, or cut the part and list it as out.
- **Adding solution detail nobody worked out.** Layouts, copy, component choices, and edge-case behaviour
  invented while writing have had none of the scrutiny the rest of the direction had.
- **Burying the time budget.** Below the solution it reads as an estimate. Put it first.
- **Omitting the uncomfortable risk.** The one that would change the decision is the one worth writing.
  Anything else is decoration.
- **Turning exclusions into permanent verdicts.** "Not this time, because …" survives new evidence.
  "We are not doing that" ends the conversation and gets quietly reversed later without a record.
- **Producing acceptance criteria or tickets.** They read as helpful and they commit the team to
  decisions this document was supposed to leave open.
- **Letting the voice profile change what the document says.** It governs how a sentence sounds.
  A rule that would make this read as advocacy loses to the document, and a pass that softens or
  strengthens a claim has stopped editing and started deciding.
- **Puffery standing in for a fact.** "Marks a pivotal moment", "significantly faster", "research
  shows" — each is a sentence that traces to nothing, and each one that survives makes the
  traceable sentences around it look the same. Go back for the number or move it to `Still open`.
- **Rotating the vocabulary.** Direction, then approach, then solution, then concept. A reader
  deciding on one thing assumes four names mean four things, and asks which one they are
  approving. Pick the word and repeat it.
- **Smoothing a specific fact while editing.** "From four screens to one" becoming "improves the
  approval experience" is what happens when the prose pass is run for tone instead of for slop.
  The pass removes patterns; it does not make paragraphs tidy.

## Reference files

- `templates/proposal.md` — the required `PROPOSAL.md` structure and where to save it. Read at step 7.
- `references/prose.md` — why the slop patterns are a traceability problem here, what this document is stricter about than the shared list, and the checklist to run before presenting. The pattern list itself lives in `slop-check`. Read at step 7, with the template.

## Method sources

- Ryan Singer, [*Shape Up*](https://basecamp.com/shapeup): the structure this document descends from — problem, appetite, solution, rabbit holes, no-gos — and the idea that time is fixed and scope moves.
- Ryan Singer, [framing](https://www.ryansinger.co/framing/): the reason this document is written to be declined rather than won. In his usage the raw ask that arrives *before* framing is the request, and what comes out the other side is something people read and decide on. In this library, `pitch` covers the separate job of communicating a decision once it has been made.
- Ryan Singer, [`rjs/shaping-skills`](https://github.com/rjs/shaping-skills) — `framing-doc` and `kickoff-doc`: carrying the frame forward instead of re-deriving it, and the test that every sentence should be traceable to something someone actually said or decided.
- Peter Yang, [`no-ai-slop`](https://github.com/petergyang/no-ai-slop) (MIT): the pattern list behind `slop-check`, which `references/prose.md` re-cuts for a document that has to be traceable rather than persuasive.

The enterprise sign-off, audit, and accessibility checks are additions, not Singer's.
