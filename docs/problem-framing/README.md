# Explainer — Problem Framing

**Status:** shipped.

```
frame-before-you-design.script.md    the scene-by-scene script
frame-before-you-design.html         the article — standalone, no build step
```

Open [`frame-before-you-design.html`](frame-before-you-design.html) directly in a browser. It has no dependencies and no build step.

The script was produced by running `scrollytelling` on `problem-framing`, so the
two skills document each other: the article explains the framing method, and the fact that
it exists at all is the scrollytelling skill's own output.

**Verified against the scrollytelling delivery matrix.** Nine viewports from
320×568 to 1280×800, plus reduced-motion and JavaScript disabled. Checked: no horizontal
overflow, every scene reachable scrolling down and back up, one active scene at a time,
each card readable without overlapping the pinned graphic, one `<main>`, one `<h1>`, an
`<html lang>`, and no heading-level skips.

The tightest case is 667×375 — a narrow phone in landscape, where the longest card is
369px tall in a 375px viewport. It fits, with very little margin. Any future edit that
lengthens scene 9's copy will break that viewport first.

## Project context libraries

The article covers the method. One thing it does not cover, because it postdates the
script, is where the skill gets its facts from before it starts asking.

Step 1 now looks for a **project context library** — a repository or directory, kept
outside the codebase, holding product overviews, IA maps, interaction notes, design-system
observations, prior proposals and decision records. `references/project-context.md`
specifies how to find one, how to classify what it holds, and the two things it is most
often misused for: treating a colleague's product walkthrough note as user evidence, and
reversing a previously recorded direction without saying so.

The frame records the library it used under `## Context use`, which is how `shaping` and
`design-package` read the same source rather than asking the designer the same questions
again. That makes the library part of the chain's interface, not a per-skill convenience.

