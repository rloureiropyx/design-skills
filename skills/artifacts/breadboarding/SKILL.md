---
name: breadboarding
description: >-
  Sketch a solution in words instead of pixels: the places a person can be, the
  things they can do or see in each one, and the lines that connect them. Use
  when a solution direction, idea, or option needs to be made concrete enough to
  argue about before anyone opens a design tool; when someone asks for a
  breadboard, a "breadboarding" pass, or a low-fidelity structural sketch; when
  a feature description is too vague to tell what a person actually does; or
  when comparing two ideas that sound different but may be the same mechanism.
  Writes a breadboard as text that a wireframe, a proposal, or a canvas drawing
  can be built from. Do NOT use it
  to choose between directions, write requirements, or run a fit check — that is
  `shaping`. Do NOT use it to decide what problem is worth solving — that is
  `problem-framing`. Do NOT use it for wireframes, hi-fi screens, visual design,
  component specs, layout or copywriting, nor to draw a process, structure or
  journey as a diagram — that is `diagrams`.
---

# Breadboarding

Sketch a solution in words. A breadboard names three things and nothing else:

- **Places** — anywhere a person can be: a screen, a dialog, a panel, an email, a menu.
- **Affordances** — anything a person can act on or read in that place: a control, a field, a piece of information.
- **Connection lines** — which affordance takes them to which place.

That is the whole notation. It is deliberately too coarse to express layout, which is the point: it makes the mechanism arguable without making the visual design arguable at the same time.

Conduct the conversation and the breadboard in the user's language.

## What this is for

A description like "a queue where approvers can see what's waiting" sounds like a solution and is not one. Breadboarding it forces four questions that sentence hides: where does the approver *start*, what do they *see* there, what can they *do*, and where does each of those take them.

Most of the time, one of those four has no answer. Finding that out costs ten minutes here and a week after a wireframe.

Use it:

- to make a solution direction concrete before comparing it with another one;
- to check whether two ideas that sound different are actually the same mechanism with different words;
- to find the place, state, or affordance nobody has thought about — the one that becomes a `⚠️` in shaping;
- as the input to a wireframe, so the wireframe is about layout rather than about what the thing does.

## Preserve the boundary

**Output**: a breadboard, in markdown, using the notation in `references/notation.md`.

Stop before: layout, screen real estate, component choices, copy, typography, spacing, visual hierarchy, and interaction micro-detail. If the answer to a question is "it depends where you put it on the screen", that question is not for this skill.

Also stop before deciding anything. Breadboarding makes an idea legible; it does not say whether it is the right idea. Comparing directions and picking one is `shaping`. When a breadboard shows a direction cannot work, report that as a finding rather than quietly redesigning it.

If a `FRAMED_PROBLEM.md` or `DIRECTIONS.md` exists, read it first and breadboard what it says, not a new idea. If neither exists, ask for one sentence about who this is for and what they are trying to get done, then proceed — a breadboard with no user is a site map.

## Build it

### 1. Find the starting place

Where is the person when this begins? Not "the dashboard" as a guess — the place they are actually in when the problem happens.

The starting place is the most commonly skipped part and the most commonly wrong. A solution that begins somewhere nobody visits is a solution nobody uses.

Completion criterion: the first place is somewhere the user already goes, or the breadboard says explicitly how they get there.

### 2. List the affordances in each place

For every place, write what the person can **do** and what they can **see**. Both. A place with only actions has no information to act on; a place with only information is a dead end.

Name affordances the way a user would say them, not the way a component library would: "approve without leaving the list", not "inline action button".

Mark each affordance as an action or as information. Read `references/notation.md` for the exact format before writing the first one.

Completion criterion: every place has at least one thing to see and one thing to do, or an explicit note saying why not.

### 3. Draw the connection lines

Every action goes somewhere: to another place, back to this one, or nowhere visible (a system effect). Write the destination for each.

An action with no destination is the most useful thing a breadboard finds. It usually means one of three things, and each is worth saying out loud:

- the place it should lead to does not exist yet;
- the action does not actually do anything a person can observe;
- there is a step nobody has decided.

Completion criterion: every action has a destination, or is flagged as a gap with which of the three it is.

### 4. Walk it as the user

Read the breadboard from the starting place to the outcome, out loud, as one continuous path. Then walk the paths where things go wrong: nothing to show, too much to show, the person lacks permission, the action fails, the data is stale.

This is where breadboards earn their time. A path that reads fine forwards frequently has no way back.

Completion criterion: the main path and at least the empty, permission, and failure paths have been walked and either resolved or flagged.

### 5. Flag what is not worked out

Mark `⚠️` on any affordance or connection the team can name but not describe. That is the same flag `shaping` uses, and it means the same thing: not a risk, an absence.

Do not fill a gap with a plausible invention to make the breadboard look complete. An invented affordance is indistinguishable from a decided one a week later.

Completion criterion: every gap is marked rather than smoothed over.

### 6. Write it out

Use the structure in `templates/breadboard.md`. Read that file before writing; it also says where to save it and how it gets referenced from `DIRECTIONS.md`.

Then say what the breadboard found — the missing place, the action with no destination, the path with no way back. That summary is the actual deliverable; the notation is the working.

Completion criterion: the file is saved, and what it revealed is stated in words rather than left for the reader to spot.

## Enterprise constraints to surface

Walk these before calling a breadboard done. Each adds places and affordances that consumer-product breadboards do not have:

- **Roles** — breadboard the place as the *least* privileged role who reaches it. That version usually has fewer affordances and sometimes has none, which is a finding.
- **Delegation** — someone acting on behalf of someone else. Frequently a whole extra place.
- **Approval and hand-off** — when the person who reaches the place cannot complete the action, name where it goes and who sees it there.
- **Audit** — what gets written down when an action is taken, and where a person goes to read it later. That "where" is a place.
- **Bulk and volume** — the same place with forty thousand rows. The affordances usually change; sometimes it is a different place.
- **System of record** — what the place shows on the day the upstream system is unavailable or stale.
- **Keyboard path** — whether every affordance is reachable and operable without a pointer, and where focus goes after each connection line.

## Rendering it

The text breadboard is the artifact. Everything else is a copy of it.

When a visual version helps — a workshop, a proposal, a wall — hand the finished breadboard to `tldraw-skill` to draw. Do not draw first and write the text afterwards: the drawing invites layout decisions, and layout is what this skill exists to defer.

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Drawing a UI.** Boxes in the right positions, columns, a sidebar, a header. The moment a breadboard
  looks like a screen, feedback becomes about the screen and the mechanism stops being examined.
- **Naming components instead of affordances.** "Data grid", "modal", "toast" describe what would be
  built. "See what is waiting", "approve without leaving the list" describe what a person does. The
  second can be built several ways; the first has already chosen.
- **Inventing an affordance to close a gap.** The gap is the finding. Filling it with something plausible
  converts an open question into a decision nobody made.
- **Skipping the failure and permission paths.** That is where the missing places are. A breadboard of
  only the happy path is a slide, not a sketch.
- **Working a breadboard for a direction that has already lost.** `shaping` breadboards every direction
  it is comparing — that is how you find out two of them are the same mechanism. What wastes time is
  continuing to elaborate one after the fit check ruled it out. Breadboard all the contenders once;
  stop the moment one stops contending.
- **Turning it into a flowchart.** Connection lines join affordances to places. Decision diamonds, swim
  lanes, and process steps are a different artifact for a different question.
- **Deciding while breadboarding.** "This one is obviously better" is `shaping`'s call, made against
  requirements. Report what the breadboard revealed and let the fit check settle it.
- **One breadboard for two directions.** If two directions share a breadboard, they are one direction.
  Say so rather than papering over it.

## Reference files

- `references/notation.md` — the exact place, affordance, and connection notation, with worked enterprise examples. Read before step 2.
- `templates/breadboard.md` — the breadboard file structure, where to save it, and how `DIRECTIONS.md` references it. Read at step 6.

## Method sources

- Ryan Singer, [*Shape Up*](https://basecamp.com/shapeup), chapter 4 — places, affordances, and connection lines, and the argument for sketching at a fidelity too coarse to express layout.

The enterprise classes, the failure-path walk, and the keyboard check are additions, not Singer's.
