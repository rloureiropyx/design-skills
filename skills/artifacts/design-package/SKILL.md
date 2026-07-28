---
name: design-package
description: >-
  Write the decision-ready document that asks a stakeholder or betting table to
  commit to a shaped piece of work — problem, appetite, chosen shape, rabbit
  holes, and no-gos in one place. Use when a shape has been selected and needs
  to be proposed, when someone asks for a pitch, a proposal, a bet, a
  one-pager, a "propuesta" or a project brief for an already-shaped solution,
  when work needs sign-off before a build cycle, or when a stakeholder asks
  "what exactly are we committing to?". Consumes a Framed Problem and a Shaping
  document and produces `DESIGN_PACKAGE.md`. Do NOT use it to decide what
  problem to solve or to challenge a frame — that is `problem-framing`. Do NOT
  use it to explore or compare solution options, run a fit check, or resolve
  solution unknowns — that is `shaping`. Do NOT use it for a PRD, a
  requirements specification, acceptance criteria, a roadmap, a status report,
  a retrospective, or slides summarising work already approved.
---

# Design Package

Assemble the artifact a group of people reads once and then decides on. A design package brings together everything a bet needs — the problem, the time the business is willing to spend, the shape chosen to fit that time, the parts deliberately left out, and the things that could still go wrong.

It is a **synthesis, not an argument**. If the case has to be sold, the framing was weak and no amount of writing here fixes it. Write it so a reader who was in none of the conversations can decide, and so a builder six weeks later can tell what was promised.

Conduct the conversation and the written artifact in the user's language.

## Preserve the boundary

**Inputs**: `FRAMED_PROBLEM.md` and `SHAPING.md`.

**Output**: `DESIGN_PACKAGE.md`.

Everything in the package is **carried, never re-derived**. The problem and outcome come from the frame. The shape, requirements, and cuts come from the shaping document. This skill's work is selection, compression, and honesty about what is not settled — not new thinking about the problem or the solution.

The project context library named in the frame's `## Context use` section is a third input, and a read-only one. Use it to check that the package's description of the product still matches the product, and to cite provenance a stakeholder can verify. Never use it to introduce a fact the frame and the shaping document do not already carry.

Stop before detailed interaction design, wireframes, visual design, acceptance criteria, implementation planning, or breaking the work into tickets. Those belong to Design and to delivery, after the bet is made.

## Refuse to package incomplete work

Check these before writing anything. Each one has a specific consequence, and none is a formality:

| Missing | Why it blocks the package |
| --- | --- |
| `FRAMED_PROBLEM.md` | There is no agreed problem. A package built on an unstated problem asks people to commit to a solution and hides what it is for. |
| `SHAPING.md` with a selected shape | There is nothing to commit to. Return to `shaping`. |
| A defined appetite | Without a fixed time budget the reader cannot judge the trade. "As long as it takes" is not a bet. |
| An unresolved `⚠️` on the selected shape | The team cannot describe how part of the thing works. Packaging it converts an absence into a promise. Send it back for a spike, or move the flagged part out of scope and say so. |

When something is missing, say which one, what it costs, and which skill resolves it. Do not write a partial package "to have something to react to" — a document that looks decision-ready is treated as decision-ready.

## Assemble the package

### 1. Carry the frame

Copy the problem, the desired outcome, and the primary user from `FRAMED_PROBLEM.md`. Compress; do not restate in new words. If a sentence in the package cannot be traced to a line in the frame or the shaping document, it does not belong.

Keep the evidence thin but present: enough that the reader knows this came from something real, not enough to turn the package into a research report. One or two attributed observations beat a page of them.

Completion criterion: every claim about the problem is traceable to `FRAMED_PROBLEM.md`.

### 2. State the appetite before the solution

The appetite goes above the shape, not below it. It is the frame the reader judges the solution inside: *this much time, spent on this*. Put it early and state where the number came from.

Completion criterion: the reader knows the size of the commitment before they read what it buys.

### 3. Present the shape

Describe the selected shape at the resolution it was shaped at: the mechanism, the parts as things a person can experience, and how they relate. Include a rough sketch or diagram only if one already exists — do not produce new design work to illustrate the package.

Be concrete about what it does and deliberately vague about how it looks. The people who build it need room to make the hundreds of decisions the package does not contain, and a package that specifies layout has taken those decisions away without having thought them through.

Completion criterion: a reader can say what the thing does, and a builder still has real decisions to make.

### 4. Name the rabbit holes

The technical or design details that could swallow the time, and the decision already taken about each. A rabbit hole is only worth listing when it comes with its patch: *"we are not doing X; if it turns out to be required, that is a new bet"*.

Rabbit holes the shaping work resolved with a spike are listed as resolved, with what was learned. Do not hide them — a reader who knows the team went and looked trusts the rest of the document more.

Completion criterion: every known way this could overrun is named with the decision that contains it.

### 5. Name the no-gos

What is explicitly out. Take these from the frame's exclusions and the shaping cuts, and write each one as a decision with a reason, not as an omission.

A no-go is not a promise never to do it. Write *"not in this bet, because …"* — a package that rules things out forever stops being reconsidered when the evidence changes.

Completion criterion: everything a reasonable reader would assume is included, and is not, is listed.

### 6. State what is still open

The risks the frame flagged, the assumptions still unverified, and the parts of the shape deliberately left for Design to decide. This section is what separates a package from a sales pitch. A reader who finds a surprise later that was known now will discount every future package.

Completion criterion: nothing known to be uncertain is presented as settled.

### 7. Write and confirm

Write `DESIGN_PACKAGE.md` using the exact structure in `templates/design-package.md`. Read that file before writing; it also says where to save the document.

Present it and ask for one thing: the decision. Bet, do not bet, or send back with a named reason.

Completion criterion: the package is saved, and the decision asked for is explicit.

## Enterprise constraints to surface

An enterprise bet is decided by people who carry risks the shaping conversation may not have voiced. Check that the package states, where they apply:

- which **roles** are affected and whether any permission model changes;
- what becomes **auditable**, what is retained, and what a regulator or auditor would see;
- which **systems of record** this depends on, and who owns them;
- what **operational** load this adds — support, configuration, migration, customer communication;
- which **accessibility** commitments are part of the bet rather than a later remediation;
- who outside the team must **agree** before this can ship, and whether they have.

Any of these arriving after the bet is made is how a shaped project quietly becomes a bigger one.

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Selling.** Superlatives, urgency language, and a business case that grows to fill the page mean the
  frame did not do its job. State the problem, the appetite, and the shape, and let the group decide.
- **Re-deriving the problem.** Rewriting the problem in fresh words during packaging quietly changes it,
  and the version people commit to stops matching the version that was framed and evidenced.
- **Mining the context library for new facts.** The library is there to verify what the package claims
  about the product, not to top the package up. A fact that appears for the first time in the package
  was never framed, never shaped, and never fit-checked — it is unbet work arriving disguised as detail.
- **Packaging over an unresolved flag.** A `⚠️` that survives into the package becomes a promise the
  team cannot keep. Send it back for a spike, or cut the part and list it as a no-go.
- **Adding solution detail nobody shaped.** Layouts, copy, component choices, and edge-case behaviour
  invented while writing the package have had none of the fit-check scrutiny the rest of the shape had.
- **Burying the appetite.** An appetite mentioned after the solution is read as an estimate of it. Put
  it first, or the reader judges the solution on merit alone and the trade disappears.
- **Omitting the uncomfortable risk.** The one that would change the decision is the one worth writing.
  Anything else is decoration.
- **Turning no-gos into permanent verdicts.** "Not in this bet, because …" survives new evidence.
  "We are not doing that" ends the conversation and gets quietly reversed later without a record.
- **Producing acceptance criteria or tickets.** They read as helpful and they commit the team to
  decisions the bet was supposed to leave open until Design.

## Reference files

- `templates/design-package.md` — the required `DESIGN_PACKAGE.md` structure and where to save it. Read at step 7.

## Method sources

- Ryan Singer, [*Shape Up*](https://basecamp.com/shapeup): the pitch structure this document descends from — problem, appetite, solution, rabbit holes, no-gos — and the principle that scope is variable and time is fixed.
- Ryan Singer, [framing](https://www.ryansinger.co/framing/): the reason this artifact is called a **package** rather than a pitch. Singer now uses "package" for the output of shaping — the point at which the problem, the ingredients of a solution, and the time to spend have all been brought together — and reserves "pitch" for the raw request that arrives *before* framing. The rename matters because "pitch" invites selling, and a package is meant to be read and decided on, not won.
- Ryan Singer, [`rjs/shaping-skills`](https://github.com/rjs/shaping-skills) — `framing-doc` and `kickoff-doc`: carrying the frame forward instead of re-deriving it, and the traceability test that every sentence should be attributable to something someone actually said or decided.

The enterprise sign-off, audit, and accessibility checks are additions, not Singer's.
