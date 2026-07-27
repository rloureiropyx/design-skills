# Repository instructions

This repository is a library of product design skills for GitHub Copilot. Each skill is **stored** in `.github/skills/<skill>/`, **tested** by scenarios in `tests/<skill>/`, and **explained** by material in `docs/<skill>/`.

Two things happen here: using the skills, and working on the skills themselves.

## Routing to a skill

When a user asks to define, challenge, review, or reframe a product problem—either before solution work or while a project is already in progress—use the workflow in @.github/skills/problem-framing/SKILL.md.

When a user asks for an interactive article, scrollytelling experience, scroll-triggered explainer, narrative script, or a long-form page whose visuals change with the story, use @.github/skills/scrollytelling-article/SKILL.md. Preserve its approval gate: agree on the narrative and visual script before implementing the article.

Add one routing paragraph here for every new skill.

## Working on the skills

Treat a skill's YAML frontmatter as its routing contract. Keep it valid, and when changing `name` or `description`, check the near-miss prompts in that skill's scenarios file still hold.

A skill change is incomplete until three things agree: `SKILL.md`, `tests/<skill>/scenarios.md`, and the explainer in `docs/<skill>/`. If a workflow, phase, boundary, or term changes in the skill, update the scenarios that assert it and the explainer that describes it in the same change.

Do not put test scenarios, rubrics, or run transcripts inside `.github/skills/`. That directory is loaded as skill context; scenario text there would contaminate real runs.

Keep skills platform-neutral. Do not introduce vendor-specific metadata or references unrelated to GitHub Copilot repository conventions.

## Method conventions shared by the skills

Treat `FRAMED_PROBLEM.md` as the problem-framing skill's primary output and as persistent project context.

Do not collapse observations, interpretations, assumptions, commitments, and preferences into a single category. Ask one high-leverage question at a time, inspect available project context before asking for facts, and request research-library or metrics inputs only when they can change the frame or next decision.

## Adding a skill

Start from `templates/SKILL.template.md` and `templates/scenarios.template.md`. A new skill is not finished until it has a routing paragraph above, at least one scenario including a wrong-shape input it must decline, and an entry in the README.
