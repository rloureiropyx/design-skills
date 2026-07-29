# Notes — Wireframes

```
what-a-wireframe-settles-before-drawing.script.md    the scene-by-scene script
what-a-wireframe-settles-before-drawing.html         the article — standalone, no build step
```

Open [`what-a-wireframe-settles-before-drawing.html`](what-a-wireframe-settles-before-drawing.html) in a browser. No dependencies, no build step.

## What it does

Decides what a screen must do, what goes on it, and how priority reads — then hands that to a renderer to draw. The thinking happens before anything is drawn:

- **the one thing** this screen must do;
- the **page contents** — a plain inventory of the information and functions it carries, written before anyone worries about arrangement;
- **relative priority** among them;
- the **rules and behaviour** that govern them;
- one **realistic scenario**, and how it changes the display.

Layout is a proxy for priority and structure. It is not a commitment to visual styling, and a wireframe is not automatically a prototype or an implementation spec.

## Who it is not for

- Deciding whether something is worth building. That is `problem-framing`.
- Choosing between solution directions, or running a fit check. That is `shaping`.
- Sketching a mechanism before layout is the real question. That is `breadboarding`, and most of the time that is where the work should stop.
- Writing the document someone approves. That is `proposal`.
- Flows, journey maps, sitemaps. A wireframe is a screen, not a diagram.
- Visual design, production UI code, or a clickable prototype.

## The four things it decides before drawing

These are **independent axes**, not one ladder, and collapsing them is the most common way a wireframe goes wrong.

- **Scale** — complete screen, single component, state set, or responsive set.
- **Fidelity** — lo, mid, or hi, chosen from purpose, consumers, and project context. Neither extreme is better. Hi-fi is the right answer for usability testing, where participants need something believable, and for a team with a mature design system, where real components are the cheapest thing to place.
- **Annotation weight** — none, light, or heavy. Adding behaviour notes, rules, and states does not make a wireframe higher fidelity; it makes it more annotated. When someone asks for "more detail," they usually want content, states, rules, or annotations, not polish.
- **Abstraction** — placeholders, representative content, or boundary content.

## Content that tests the layout

Content shapes layout, so the sample content is a design decision rather than filler. Symbolic values (`999-999-9999`, `MM/DD/YYYY`, `$9,999.00`) read as their type at a glance. Bracket labels (`[headline — 60 chars]`) name the field and its limit. Boundary content — long, short, missing, localized, sensitive — goes in when the edge case is what drives the decision. Lorem ipsum only when the words genuinely do not matter.

## Colour means something or it is not there

Grayscale by default; functional colour only. Red means error or validation. Blue means text link, and nothing else — a button is a button because of its shape, not because it is blue. Because in-screen red already means an error state, reviewer conflict marks go **outside** the screen boundary, where the two reds cannot collide.

Annotations live outside the boundary too, in the margin nearest the thing they describe, numbered at both ends. A note about something on the left of the screen goes to the left of the screen — one column down one side would send half the pointers across the UI, where they end up louder than the drawing. The number carries the link, so a pointer that would cross something is simply left out.

## One scenario per screen

A single realistic moment per screen boundary. The failure this prevents has a name — the **every-case scenario**: one composite trying to show empty, loading, error, and populated at once, which ends up depicting no real moment at all. Meaningful states become separate variants or a linked flow, created when a decision needs them.

## Where it sits

After `shaping` has selected a direction and after `breadboarding` has made the mechanism concrete. A breadboard's affordances *are* the page-contents inventory and its connection lines *are* the screen's exits — the skill is told to carry them rather than invent a second set. When the screen contradicts `FRAMED_PROBLEM.md` or the selected direction, it says so instead of quietly restating the problem in layout.

Most projects never need this step. Reach for it when layout turns out to be the real question.

## Drawing it

`tldraw-skill` renders it, using the wireframe recipes in §10 of its craft reference. That needs the tldraw offline desktop app running on the same machine; without it the skill stops rather than drawing somewhere else.

## Reviewing it

Hosting a wireframe review is a working session, not a presentation, and it falls into the same two rabbit holes every time — copy and visual design. The skill carries a review recipe: state up front what will and will not be discussed, walk one path rather than starting from exceptions, ask operational questions instead of "what do you think," and read silence as confusion rather than assent.

It also names four signs that the requirements, not the drawing, are what is unstable: endless reversals, settled decisions re-litigated, review sprawl with no decision, and stakeholders talking past each other. When those show up, more wireframe iterations do not help.

## Source

A working synthesis of wireframe practice, drawing on Dan M. Brown, *Communicating Design* (2nd edition), chapter 7 — the page-contents inventory, the Page Description Diagram, the content-area model, and the review-depth ladder are his. The enterprise pass, the carry-don't-re-derive rule, and the renderer split are additions.

- Skill: [`skills/artifacts/wireframes/SKILL.md`](../../skills/artifacts/wireframes/SKILL.md)

---

**Rendering.** Checked at nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled. Least clearance: 24px at 812×375.
