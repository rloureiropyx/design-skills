# Explainer — tldraw Skill (renderer)

**Status:** shipped. Vendored into this plugin from a standalone personal skill, adapted to
this repo's rules.

```
draw-what-was-decided.script.md    the scene-by-scene script
draw-what-was-decided.html         the article — standalone, no build step
```

Open [`draw-what-was-decided.html`](draw-what-was-decided.html) directly in a browser. It has
no dependencies and no build step. **Verified against the scrollytelling delivery matrix** —
nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled. Least
clearance: 27px at 667×375.

The notes below are the short written version of the same argument.

## What it is

A **renderer**. It draws, on a tldraw offline canvas, an artifact that someone else has already decided on — a flow, a journey map, a service blueprint, a concept model, a sitemap, a set of wireframes.

The split matters: deciding *what* to draw and drawing it *well* are different jobs with different failure modes. This skill owns the second one only. Bring it a decision; it will not make one for you.

## Requires the tldraw offline app

This is the one skill in the library with an external runtime dependency. It talks to the local HTTP API of the **tldraw offline desktop app**, running on the same machine. There is no hosted fallback and no cloud mode.

If the app is not running, the skill says so and stops. It does not quietly draw somewhere else — the reason to choose tldraw is that the work never leaves the machine, and substituting another canvas breaks the only guarantee it makes.

That also means: no sharing, no comments, no co-editing. A request for a collaborative canvas has no renderer in this plugin.

## Why it is cheap to run

You send JavaScript, not per-element JSON, and you get back only what you `return`.

One `/exec` call can build a thirty-shape diagram from a loop and echo back `{nodes: 12, arrows: 14}`. There is no per-element response to pay for. The whole working style follows from that: **build in loops, return counts** — never drip-feed shapes across calls, never return shape records.

## The rule that catches people

A clean lint is not done.

The linter has three rules — overflowing text, overlapping text, unbound arrows. Ragged columns, arrows crossing nodes, unreadable label sizes and a layout that simply reads badly all pass it. So the loop always ends with a screenshot and a look, not with a green result.

## What changed when it was vendored

Four things, to make it conform to this library:

- a non-trigger clause in the description, so it declines the requests that belong elsewhere;
- `## Not this` became `## Anti-patterns`, expanded from three routing notes into the failure modes it actually has;
- the hardcoded `~/.copilot/skills/tldraw-skill/tq` path became a lookup, because that path stops existing the moment the skill ships inside a plugin;
- references to sibling skills this plugin does not contain were removed rather than left dangling.

## Files

```
SKILL.md                    the loop, the golden rules, the anti-patterns
references/canvas-api.md    endpoints, shape records, style enums — read before drawing
references/craft.md         layout math, palette, per-artifact recipes, the fidelity ladder
tq                          shell helper; re-reads the app's port and token itself
```

- Skill: [`skills/renderers/tldraw-skill/SKILL.md`](../../skills/renderers/tldraw-skill/SKILL.md)
