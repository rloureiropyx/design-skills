# Product Design Skills

This repository contains reusable product design skills for GitHub Copilot, together with an interactive example of how they can be used.

## Skills

### Problem Framing

Turns a fuzzy initiative—or a project already in progress—into a clear, evidence-backed **Framed Problem**.

The skill helps designers remember and answer the important questions before proposing solutions. It separates observations from interpretations and assumptions, compares alternative problem frames, requests targeted research or metrics when evidence can change the decision, and defines a problem north star for the rest of the project.

### Scrollytelling Article

Creates interactive long-form articles whose narrative and diagrams unfold as the reader scrolls. It first develops and confirms a scene-by-scene narrative and visual script, then implements the approved story as an accessible, responsive standalone HTML article.

## Repository contents

- [`.github/skills/problem-framing/SKILL.md`](.github/skills/problem-framing/SKILL.md) — the agent skill used by GitHub Copilot.
- [`.github/skills/scrollytelling-article/SKILL.md`](.github/skills/scrollytelling-article/SKILL.md) — the scrollytelling narrative and implementation skill.
- [`docs/problem-framing-scrollytelling.html`](docs/problem-framing-scrollytelling.html) — an interactive explanation of how the skill works.
- [`docs/problem-framing-scrollytelling-script.md`](docs/problem-framing-scrollytelling-script.md) — the editable narrative and visual script behind the article.

## What the skill produces

The primary output is `FRAMED_PROBLEM.md`, a persistent project document that records:

- the user and concrete situation;
- the observed tension and desired outcome;
- evidence, interpretations, and assumptions;
- alternative problem frames;
- the chosen problem slice and working question;
- boundaries, fixed build-time budget, constraints, and their consequences;
- major risks and targeted evidence requests;
- the explicit next move for the project.

The document remains in the project as its problem north star. Shape, Pitch, Design, and later project decisions should continue to reference it.

## Typical requests

- “Help me frame this new product initiative before I explore solutions.”
- “Review the problem framing for this project already in progress.”
- “We have research and metrics, but I’m not sure which problem we should solve.”
- “Check whether this initiative is ready for Shape.”

## Method sources

The skill combines ideas from Warren Berger’s *A More Beautiful Question*, Ryan Singer’s *Shape Up*, and Matt Pocock’s `grill-with-docs` and `grilling` workflows. The complete attribution and the role of each source are documented in the skill and scrollytelling.
