# Notes — tldraw

```
draw-what-was-decided.script.md    the scene-by-scene script
draw-what-was-decided.html         the article — standalone, no build step
```

Open [`draw-what-was-decided.html`](draw-what-was-decided.html) in a browser. No dependencies, no build step. The notes below are the short written version.

## What it does

Draws, on a local tldraw canvas, an artifact someone has already decided on: a flow, a journey map, a service blueprint, a concept model, a sitemap, a breadboard, a set of wireframes.

Deciding *what* to draw and drawing it *well* are different jobs. This skill does the second one. Bring it a decision.

## Who it is not for

- Deciding what the diagram should say. Give it something already worked out.
- Deciding what goes in a breadboard — that is `breadboarding`. This skill draws the finished one.
- Anything collaborative. See below.

## It needs the tldraw offline app running

The only skill here with an external runtime dependency. It talks to the local HTTP API of the **tldraw offline desktop app** on the same machine. No hosted fallback, no cloud mode.

If the app is not running, the skill says so and stops rather than drawing somewhere else. The reason to pick tldraw is that the work never leaves the machine, and substituting another canvas breaks the only guarantee it makes.

That also means no sharing, no comments, no co-editing. A request for a collaborative canvas has no renderer in this plugin.

## Why it is cheap to run

You send JavaScript, not per-element JSON, and get back only what you `return`. One `/exec` call can build a thirty-shape diagram from a loop and echo back `{nodes: 12, arrows: 14}`. There is no per-element response to pay for.

The whole working style follows from that: build in loops, return counts. Never drip-feed shapes across calls, never return shape records.

## A clean lint is not done

The linter has three rules: overflowing text, overlapping text, unbound arrows. Ragged columns, arrows crossing nodes, unreadable label sizes, and a layout that simply reads badly all pass it.

So the loop ends with a screenshot and a look, not with a green result.

## Notes go next to what they describe

Annotations are stickies in the margin, and each one sits on the side its target is already on. Both ends carry the same number, which means the arrow between them is optional — and it gets dropped whenever it would cross the drawing. An arrow reaching across a wireframe to reach a note ends up louder than the wireframe.

The numbers behind it — gutter widths, marker size, when a connector is short enough to draw — are measured, and they are in `references/craft.md` §10.2.

## What changed when it was vendored

It came from a standalone personal skill. Four adjustments to fit this repo:

- a non-trigger clause in the description, so it declines requests that belong elsewhere;
- `## Not this` became `## Anti-patterns`, expanded from three routing notes into the failure modes it actually has;
- the hardcoded `~/.copilot/skills/tldraw-skill/tq` path became a lookup, since that path stops existing once the skill ships inside a plugin;
- references to sibling skills this plugin does not contain were removed rather than left dangling.

## Files

```
SKILL.md                    the loop, the golden rules, the anti-patterns
references/canvas-api.md    endpoints, shape records, style enums — read before drawing
references/craft.md         layout math, palette, per-artifact recipes, the fidelity ladder
tq                          shell helper; re-reads the app's port and token itself
```

- Skill: [`skills/renderers/tldraw-skill/SKILL.md`](../../skills/renderers/tldraw-skill/SKILL.md)

---

**Rendering.** Checked at nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled. Least clearance: 27px at 667×375.
