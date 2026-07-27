# Design Skills

A personal library of the product design skills I use with GitHub Copilot.

Every skill in this repo goes through the same loop:

| Store | Test | Explain |
| --- | --- | --- |
| The skill lives in `.github/skills/<skill>/SKILL.md` and is loaded automatically by Copilot. | Scenarios in `tests/<skill>/` exercise the skill against realistic enterprise cases, scored with a shared rubric. | An explainer in `docs/<skill>/` makes the method understandable to someone who will never read the skill file. |

A skill is only "done" when all three exist.

## Skills

### Problem Framing

Turns a fuzzy initiative—or a project already in progress—into a clear, evidence-backed **Framed Problem**.

It separates observations from interpretations and assumptions, compares alternative problem frames, requests targeted research or metrics only when evidence can change the decision, and defines a problem north star for the rest of the project. Its primary output is `FRAMED_PROBLEM.md`, a persistent project document that Shape, Pitch, and Design keep referencing.

- Skill: [`.github/skills/problem-framing/SKILL.md`](.github/skills/problem-framing/SKILL.md)
- Tests: [`tests/problem-framing/scenarios.md`](tests/problem-framing/scenarios.md)
- Explainer: [`docs/problem-framing/frame-before-you-design.html`](docs/problem-framing/frame-before-you-design.html) · [script](docs/problem-framing/frame-before-you-design.script.md)

### Scrollytelling Article

Creates interactive long-form articles whose narrative and diagrams unfold as the reader scrolls. It first develops and confirms a scene-by-scene narrative and visual script, then implements the approved story as an accessible, responsive standalone HTML article.

- Skill: [`.github/skills/scrollytelling-article/SKILL.md`](.github/skills/scrollytelling-article/SKILL.md)
- Tests: [`tests/scrollytelling-article/scenarios.md`](tests/scrollytelling-article/scenarios.md)
- Explainer: [`docs/scrollytelling-article/scroll-is-not-a-story.script.md`](docs/scrollytelling-article/scroll-is-not-a-story.script.md) — script written, article pending approval

## Repository layout

```
.github/skills/<skill>/     the skill itself — SKILL.md plus optional references/ and templates/
docs/<skill>/               explainers: articles, scripts, diagrams
tests/                      shared rubric and how to run a test pass
tests/<skill>/              scenarios, and saved runs under runs/
templates/                  starting points for a new skill and its scenarios
```

Tests deliberately live **outside** `.github/skills/` so scenario text never leaks into the context Copilot loads when it invokes a skill.

## Using a skill

The skills are repository-scoped. Work inside this repo, or copy a skill folder into another project's `.github/skills/`. Copilot routes to a skill using the `name` and `description` in its YAML frontmatter—those two fields are the routing contract, so treat them as the most carefully written part of any skill.

## Testing a skill

See [`tests/README.md`](tests/README.md). In short: pick a scenario, run it in a fresh session, score the transcript against [`tests/RUBRIC.md`](tests/RUBRIC.md), and save the run under `tests/<skill>/runs/`. Failed runs are the backlog for the next skill revision.

## Adding a skill

1. Copy [`templates/SKILL.template.md`](templates/SKILL.template.md) to `.github/skills/<skill>/SKILL.md` and write it.
2. Copy [`templates/scenarios.template.md`](templates/scenarios.template.md) to `tests/<skill>/scenarios.md` and write at least one happy path, one wrong-shape input, and one boundary case.
3. Run the scenarios and save the first transcript.
4. Add a routing line to [`.github/copilot-instructions.md`](.github/copilot-instructions.md).
5. Add the skill to the list above and start its explainer in `docs/<skill>/`.
