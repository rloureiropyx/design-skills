# Explainer — Problem Framing

**Status:** shipped.

```
frame-before-you-design.script.md    the scene-by-scene script
frame-before-you-design.html         the article — standalone, no build step
```

Open the `.html` file directly in a browser. It has no dependencies and no build step.

The script was produced by running `scrollytelling-article` on `problem-framing`, so the
two skills document each other: the article explains the framing method, and the fact that
it exists at all is the scrollytelling skill's own output.

**Verified against the scrollytelling-article delivery matrix.** Nine viewports from
320×568 to 1280×800, plus reduced-motion and JavaScript disabled. Checked: no horizontal
overflow, every scene reachable scrolling down and back up, one active scene at a time,
each card readable without overlapping the pinned graphic, one `<main>`, one `<h1>`, an
`<html lang>`, and no heading-level skips.

The tightest case is 667×375 — a narrow phone in landscape, where the longest card is
369px tall in a 375px viewport. It fits, with very little margin. Any future edit that
lengthens scene 9's copy will break that viewport first.
