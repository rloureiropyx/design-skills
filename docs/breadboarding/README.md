# Notes — Breadboarding

```
breadboard-before-you-draw-it.script.md    the scene-by-scene script
breadboard-before-you-draw-it.html         the article — standalone, no build step
```

Open [`breadboard-before-you-draw-it.html`](breadboard-before-you-draw-it.html) in a browser. No dependencies, no build step.

## What it does

Sketches a solution in words instead of pixels. Three things and nothing else:

- **Places** — anywhere a person can be: a screen, a dialog, a panel, an email, a menu.
- **Affordances** — anything they can act on or read there: a control, a field, a piece of information.
- **Connection lines** — which affordance takes them to which place.

That is the whole notation. It cannot express layout, and that is the point: you can argue about the mechanism without arguing about the visual design at the same time.

## Who it is not for

- Choosing between directions, writing requirements, running a fit check. That is `shaping`.
- Deciding what is worth solving. That is `problem-framing`.
- Wireframes, screens, visual design, component specs, copy. All of those come later, and a breadboard is a good input to them.
- Journey maps and process flows. Different artifact, different question.

## Why it is worth ten minutes

Take a sentence like *"a queue where approvers can see what's waiting"*. It sounds like a solution. Breadboarding it forces four questions the sentence hides: where does the approver start, what do they see there, what can they do, and where does each of those take them.

Usually one of the four has no answer. Finding that out costs ten minutes at this stage and a week after someone has drawn a wireframe.

## Where it sits

`shaping` calls it at step 3, once each direction has been sketched but before the fit check. A direction that has been breadboarded gets checked against requirements as a mechanism; one that has not gets checked as a paragraph, and paragraphs pass everything.

Wireframes come after, and only when layout turns out to be the real question. Most of the time it is not.

## What it finds

- **The starting place.** Most commonly skipped, most commonly wrong. A solution that begins somewhere nobody goes is a solution nobody uses.
- **Actions with no destination.** Either the place they lead to does not exist, or the action does nothing observable, or there is a step nobody has decided. All three are worth saying out loud.
- **Paths with no way back.** A breadboard reads fine forwards and frequently has no return path.
- **Gaps.** Anything the team can name but not describe gets a `⚠️` — the same flag `shaping` uses, meaning the same thing: an absence, not a risk. Gaps do not get filled with something plausible; a week later an invented affordance and a decided one look identical.

## The enterprise pass

Before a breadboard is done, a fixed list gets walked, because each item adds places that consumer-product breadboards do not have: roles (breadboard as the *least* privileged person who reaches the place), delegation, approval and hand-off, audit (where someone reads what happened — that "where" is a place), bulk and volume, what shows when the upstream system is stale, and the keyboard path including where focus lands after each connection.

## Drawing it

The text breadboard is the artifact. If a picture helps — a workshop, a proposal, a wall — hand the finished text to `tldraw-skill`. Not the other way round: drawing first invites layout decisions, and deferring those is the whole reason to breadboard.

## Source

Ryan Singer, [*Shape Up*](https://basecamp.com/shapeup), chapter 4. The enterprise list, the failure-path walk, and the keyboard check are additions.

- Skill: [`skills/artifacts/breadboarding/SKILL.md`](../../skills/artifacts/breadboarding/SKILL.md)

---

**Rendering.** Checked at nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled. Least clearance: 24px at 812×375.
