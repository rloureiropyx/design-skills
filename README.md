# Design Skills

A personal library of the product design skills I use with GitHub Copilot.

Every skill has two legs:

| Store | Explain |
| --- | --- |
| The skill lives in `.github/skills/<skill>/SKILL.md` and is loaded automatically by Copilot. | An explainer in `docs/<skill>/` makes the method understandable to someone who will never read the skill file. |

A skill is only "done" when both exist.

## Skills

### Problem Framing

Turns a fuzzy initiative—or a project already in progress—into a clear, evidence-backed **Framed Problem**.

It separates observations from interpretations and assumptions, compares alternative problem frames, requests targeted research or metrics only when evidence can change the decision, and defines a problem north star for the rest of the project. Its primary output is `FRAMED_PROBLEM.md`, a persistent project document that Shape, Pitch, and Design keep referencing.

- Skill: [`.github/skills/problem-framing/SKILL.md`](.github/skills/problem-framing/SKILL.md)
- Explainer: **shipped** — [`frame-before-you-design.html`](docs/problem-framing/frame-before-you-design.html) · [script](docs/problem-framing/frame-before-you-design.script.md)

### Scrollytelling Article

Creates interactive long-form articles whose narrative and diagrams unfold as the reader scrolls. It first develops and confirms a scene-by-scene narrative and visual script, then implements the approved story as an accessible, responsive standalone HTML article.

- Skill: [`.github/skills/scrollytelling-article/SKILL.md`](.github/skills/scrollytelling-article/SKILL.md)
- Explainer: **script only** — [`scroll-is-not-a-story.script.md`](docs/scrollytelling-article/scroll-is-not-a-story.script.md). The article is not built; the skill's own approval gate applies to its own explainer.

## Repository layout

```
.github/skills/<skill>/     the skill itself — SKILL.md plus optional references/ and templates/
.github/copilot-instructions.md   one routing paragraph per skill, plus the rules for editing skills
docs/<skill>/               explainers: articles, scripts, diagrams
templates/                  the starting point for a new skill
scripts/check-skills.mjs    the structural check
```

`SKILL.md` holds decision logic and is loaded in full on every invocation, so anything that is only needed at one step—a document template, a format specification, a taxonomy, a code recipe—lives in `references/` or `templates/` inside the skill folder, with an explicit "read X before step N" pointer. A step's completion criterion never moves out of `SKILL.md`.

## Using a skill

The skills are repository-scoped. Work inside this repo, or copy a skill folder into another project's `.github/skills/`.

Copilot routes to a skill using the `name` and `description` in its YAML frontmatter. Those two fields are the routing contract and the most carefully written part of any skill. Every `description` ends with an explicit non-trigger clause—what must *not* route here—because a skill with no stated boundary competes for prompts it should decline.

## Checking a skill

```sh
node scripts/check-skills.mjs
```

No dependencies; it runs on a clean clone. It asserts the invariants this README claims: frontmatter parses, `name` matches the folder, `description` is within Copilot's 1024-character limit and carries a non-trigger clause, every skill has an `## Anti-patterns` section and a `docs/<skill>/` explainer and a routing paragraph, every `references/`/`templates/` pointer resolves, and every relative markdown link resolves. It runs on every push and pull request.

It checks structure, not judgement. Nothing automated can tell you whether a skill holds its boundary, asks one question at a time, or produces an artifact that stands on its own—the authoring guidance for that is in [`templates/SKILL.template.md`](templates/SKILL.template.md), and the record of how each skill fails in practice is its `## Anti-patterns` section.

There is deliberately no scenario suite. There was one, and it was never run; an unperformed ritual that advertises rigor is worse than no ritual. The cost is real and worth stating: routing and boundary regressions are now found by using a skill and noticing, not by a test. When a skill starts behaving badly, re-read its `description` and its `## Anti-patterns` first, then fix both.

## Adding a skill

1. Copy [`templates/SKILL.template.md`](templates/SKILL.template.md) to `.github/skills/<skill>/SKILL.md` and write it, including the `## Anti-patterns` section and the description's non-trigger clause.
2. Add a routing paragraph to [`.github/copilot-instructions.md`](.github/copilot-instructions.md).
3. Start the explainer in `docs/<skill>/`.
4. Add the skill to the list above.
5. Run `node scripts/check-skills.mjs`.
