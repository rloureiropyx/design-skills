---
name: wireframes
description: >-
  Design a genuinely useful wireframe — decide what a screen must do, what goes on
  it, and how priority reads — then hand it to a renderer to draw. Use for screen or
  component structure, content and function inventory, relative priority, behaviour,
  states, rules, scenarios, responsive variants, annotations, and wireframe reviews.
  Triggers on wireframe, mockup, screen layout, UI sketch, boceto, pantalla, or
  maqueta. Owns the wireframing discipline — intention, priority, fidelity, sample
  content, annotation, facilitation — and renders through `tldraw-skill`. Do NOT use
  it to decide whether something is worth building (`problem-framing`), to pick
  between solution directions (`shaping`), to sketch a mechanism in words before
  layout is the real question (`breadboarding`), or to write the document someone
  approves (`proposal`). Do NOT use it for flows, journey maps or sitemaps — a
  wireframe is a screen, not a diagram — nor for visual design, production UI code,
  or a clickable prototype.
---

# Wireframes

A wireframe is **rectangles and lines that plant a stake in the ground for _What Goes Here_.** It is a structural argument about a screen, not a picture of one. Done well it communicates:

- **the one thing this screen must do** — its purpose;
- which information and functions appear, and their **relative priority**;
- the **rules and behavior** that govern them;
- how a **realistic scenario** changes the display.

Layout is a proxy for priority and structure, not a commitment to final visual styling. A wireframe is not automatically a prototype or an implementation spec. **Most wireframes are templates** — page *types* (a product page, a search result), not one specific page — so design for the pattern, then prove it with a real instance.

## Materialization

This skill is **render-agnostic**: it owns the wireframing discipline — deciding *what to draw and why* — not drawing mechanics. It renders through **`tldraw-skill`**, the only canvas renderer in this plugin.

- **Render on a canvas:** hand off to `tldraw-skill`. Wireframe-specific mechanics — lo-fi look, element recipes, viewport frame sizes, annotation placement, state variants — are in `tldraw-skill/references/craft.md` §10; general canvas mechanics are in the rest of that file. `tldraw-skill` needs the tldraw offline desktop app running on the same machine; if it is not, say so rather than drawing somewhere else.
- **Present or review:** read `references/facilitation.md`.

Do the thinking work — purpose, contents, priority, scenario, fidelity — before touching a renderer.

Read `references/method.md` for the full discipline (axes, three-layer anatomy, priority devices, sample content, component docs, review depth).

## Carry, don't re-derive

If this project already has upstream documents, read them before asking anything:

- `FRAMED_PROBLEM.md` — the problem this screen serves, and the evidence under it.
- `DIRECTIONS.md` — the selected direction, its requirements, and its time budget.
- A **breadboard** — a place's affordances *are* the page-contents inventory, and the connection lines *are* the screen's exits. Take them; do not invent a second set.

A wireframe elaborates a decision someone already made. When the screen you are drawing contradicts the frame or the selected direction, say so and send it back — do not quietly restate the problem in layout.

## Pre-work (before any shape)

1. **Name the one thing.** "What is the ONE thing this screen must do?" Everything else on the screen is subordinate to it.
2. **List the page contents** — a plain inventory of information and functions this screen carries, before worrying about arrangement.
3. **Sketch first.** Rough the arrangement (paper or a quick text outline of regions and order) before committing to a renderer. Cheap sketches keep the conversation on structure.

## The communication contract

Before drawing, state these — they are **independent axes**, not a single ladder:

```text
Decision or question:
Audience / consumers:
Scenario and screen purpose (the ONE thing):
Scale:        complete screen | component | state set | responsive set
Fidelity:     lo | mid | hi     (chosen by purpose + consumers + project context)
Annotation:   none | light | heavy      (a SEPARATE axis from fidelity)
Abstraction:  placeholders | representative content | boundary content
Depth:        concept | requirements discussion | implementation handoff
Feedback needed:
```

A lo-fi wireframe can carry heavy annotation; a hi-fi one can carry none. A component-level wireframe can hold deep behavioral detail. Keep the axes uncoupled.

## Fidelity: choose it, don't default to a rung

Pick fidelity from **Purpose, Consumers, and Project context** — **neither extreme is inherently better.**

- **Lo-fi** (grayscale, boxes, placeholders) keeps the conversation on structure and priority, and signals "draft, not final." The safe default when the question is *what goes here and why*.
- **Hi-fi** is legitimate — not a failure — for **usability testing** (participants need something believable) and for teams with a **mature design system** (real components are the cheapest thing to place).

**Annotation weight is its own axis.** Adding behavior notes, rules, and states does not make a wireframe higher fidelity; it makes it more *annotated*. Don't smuggle visual polish in under the banner of "more detail" — when someone asks for more detail, add content, states, rules, scenarios, or annotations first. Move to visual fidelity only on an explicit request.

## Color policy — functional, never aesthetic

**Grayscale by default. Functional color only; never aesthetic or brand color.** Color must carry meaning a reader can decode without a swatch:

- a **distinct color per content-area _type_** (e.g. one hue for structural chrome, another for a reusable module) when type distinctions must read at a glance;
- **red = error / validation** state;
- **blue = text link** only; a button/icon affordance is carried by shape, not color — do not color every interactive element blue.

Because **red inside the screen boundary means an error state**, reviewer "conflict / problem" marks go **OUTSIDE** the screen boundary (see annotations). That keeps the two reds from colliding. If a color is only there to look finished, it does not belong in a wireframe.

## Content-area model

Label every major region by function; classify when it clarifies:

- **Structural** — persistent framework: navigation, global header/footer.
- **Reusable** — a component or content pattern used in multiple contexts.
- **Unique** — content or function specific to this screen's purpose.

Relative size, position, contrast, and grouping communicate priority. Don't let conventional top-of-page placement imply that global chrome is the screen's main purpose.

### Priority devices (make importance explicit)

Visual dominance ≠ functional priority — a hero image can own the eye while the primary action sits elsewhere. Use a priority device to *state* the ranking rather than relying on size. When "bigger = more important" isn't enough, reach for a named device:

- **Ordered list** — number the contents by importance, straight from your page-contents inventory.
- **Page Description Diagram (PDD)** (Brown) — three columns, **high / medium / low** priority, listing what each holds; decouples priority from layout so you can argue it directly.
- **Page regions** — name the zones (header, primary, secondary, utility) and assign contents to them.

## Anatomy — three layers

Build in order of importance; stop when the decision is served:

- **Layer 1 — Essentials.** Screen ID, scenario, the one purpose, labeled structural/reusable/unique content areas, and priority. Without these it isn't a wireframe of this screen.
- **Layer 2 — Elaboration.** Layout, representative content, controls, interaction states, functional distinctions.
- **Layer 3 — Context.** Annotations, responsive behavior, content/data rules, edge cases, traceability, and limited polish only where it clarifies function or hierarchy.

"When in doubt, do Layer 1, then add Layer-2 detail as the conversation demands it."

## Sample content — never lorem ipsum by default

Content shapes layout, so use content that tests the layout:

- **Symbolic** placeholders that read as their type: `999-999-9999`, `MM/DD/YYYY`, `$9,999.00`.
- **Bracket labels** naming the field and its limit: `[firstname — 30]`, `[headline — 60 chars]`.
- **Dummy / representative** copy — realistic values that expose ordinary density.
- **Greek/Latin** (lorem ipsum) only when the *words* genuinely don't matter and you want the eye off them.
- **Squiggle** where line-weight equals content-weight — a scribble stands in for text whose exact wording is irrelevant but whose amount matters.
- **Boundary content** — long, short, missing, localized, or sensitive values — when the edge case drives the decision.

## Single scenario per screen

Show **one realistic scenario per screen boundary.** Do not try to depict every state at once — that "every-case scenario" collapses into an unreadable composite that describes no real moment. Meaningful states (empty, error, loading) are **separate screen variants** or a linked flow, created when the decision needs them.

## Annotations — outside the boundary, on the side of what they describe

Annotations carry the behavior the picture can't: content sources and variability, controls and resulting state, permissions and business rules, empty/loading/validation/error/success/cancellation/recovery, responsive behavior, and links to flow/requirement/evidence IDs.

- Place annotations **outside the screen boundary**, in the margin **on the same side as their target**. A note about something on the left of the screen goes to the left of the screen. One column down one side forces half the pointers to travel across the UI, and a pointer crossing the drawing is louder than the drawing.
- **Number both ends.** A marker on the element and the same number opening the note. The number is what carries the link, which is why a pointer that would cross the UI can simply be left out.
- **A pointer is optional and quiet.** Draw it only when it crosses nothing; keep it visually lighter than the wireframe's own lines. Never let it cross another element, another pointer, or a different screen.
- Keep overview, behavior rules, and content rules distinguishable.
- **A screen that needs more than a handful of notes is turning into a spec.** Merge them, cut them, or split the screen — do not stack a taller column.
- Prefer plain language. The artifact and its walkthrough are one communication system.

(Gutter widths, marker size, and the stacking math live in the renderer: `tldraw-skill/references/craft.md` §10.2.)

## Group cohesive components

Every **cohesive or repeated component** is one movable unit: each metric/KPI card, each content card, each nav item (icon + label + badge), each form field (label + input + placeholder), each annotation (note + pointer), and each logical section (a whole sidebar, a whole row).

- **Group the units, not the collection** — group each card individually so it can move alone; nest the row only if the row itself is a meaningful unit.
- **Never bind the screen boundary to its contents** — it must resize independently.

(Grouping *mechanics* — commands, IDs, re-grouping on iteration — live in the renderer: `tldraw-skill/references/craft.md` §6 and §11.)

## Workflow

1. **Scope.** If ambiguous, ask at most one focused question (which screens? desktop or mobile?). Otherwise state assumptions in one line and proceed.
2. **Plan.** Name the one thing, list page contents, sketch the arrangement (a quick text outline of regions and order). (Coordinate/grid planning is a rendering concern — see `tldraw-skill/references/craft.md` §1 and §10.)
3. **Build in layers** — Layer 1 first; group each cohesive component as you go. See `tldraw-skill/references/craft.md` §10 for how to render a wireframe efficiently.
4. **Self-check by vision** against the checklist below, then fix and repeat (cap the rounds; then show the best version and name what remains).
5. **Present** the artifact + a 2–4 line summary of the structural decisions and any open questions.

## Self-check

- Answers "what is this screen for" at a glance; the one thing is unmistakable in priority (size, position, OR a named device).
- Content-area functions labeled; priority reads without narration.
- Color is functional only (grayscale + meaning-bearing hues); no aesthetic/brand color; in-screen red = error only.
- One scenario per boundary; meaningful states are separate variants, linked, or explicitly out of scope.
- Real or boundary content used wherever content length/meaning changes the decision.
- Annotations sit outside the boundary, numbered, each on the side of the element it describes; no pointer crosses the screen or another pointer.
- Cohesive/repeated components move as a unit; the boundary is independent.
- Fidelity and annotation weight match what was requested and were chosen on purpose.
- Scenario, fidelity, abstraction, and intended feedback are explicit.

## Facilitation

You **host a working session**, you don't present. Read `references/facilitation.md` before a review — the two lists, the two rabbit holes, silence ≠ assent, APU per region, and the four warning signs that the requirements rather than the drawing are what is unstable.

## Iteration (the user edited the file)

1. Load the user's edited version and read current state (IDs, positions, labels) before changing anything. Identify elements by **ID or label text — never by x/y** (coordinates move).
2. Diff against your last known state (moved/added/removed, user notes).
3. Treat user-added annotations as instructions: apply them, then remove the annotation.
4. Make **targeted edits only** — never rewrite untouched elements.
5. Re-export, self-check, present; say what you changed and what you left alone.

(Concrete build/inspect/update commands live in `tldraw-skill/references/canvas-api.md`.)

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- Aesthetic or brand color, gradients, shadows, real photography, or icon sets used for polish rather than meaning.
- The **"every-case scenario"** — cramming every state onto one screen so it depicts no real moment.
- Lorem ipsum where sample content would test the layout; fake 20-row data tables (3 rows + a "…" row).
- Detail added as drawing when it belongs in an annotation.
- Reviewer conflict marks *inside* the screen boundary (they collide with error-state red — put them outside).
- **All annotations in one column down one side.** Half of them then point across the UI, and the pointers become the loudest thing in the artifact. Annotate from the near side and let the numbers carry the link.
- Regenerating the whole artifact to make a small change (make targeted edits).
- Presenting a wireframe you haven't visually verified (or, if you couldn't, without saying so).
- **Wireframing before the direction is decided.** A wireframe elaborates a choice; it is not a way to make one. If nobody has picked a direction, that is `shaping`'s job, and drawing first buys a layout argument instead of a solution.
- **Re-deriving upstream work.** Inventing page contents when a breadboard already lists the affordances, or restating the problem in layout when `FRAMED_PROBLEM.md` says something different. Carry it, or send the contradiction back.

## Source boundary

The method is a modernized working synthesis of wireframe practice, drawing on Dan M. Brown's *Communicating Design* (2e), chapter 7. The source is not canonical judgement.

This skill is vendored into this plugin from a standalone personal skill. Its peers in the original library — a cloud canvas renderer, a browser-based one, and the orchestrator that used to select the artifact — are not part of this plugin. A request for a shared or collaborative canvas has no renderer here: say so rather than substituting one.
