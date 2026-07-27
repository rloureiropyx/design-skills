# Repository instructions

This repository is a library of product design skills for GitHub Copilot. Each skill is **stored** in `.github/skills/<skill>/` and **explained** by material in `docs/<skill>/`.

Two things happen here: using the skills, and working on the skills themselves.

## Routing to a skill

When a user asks to define, challenge, review, or reframe a product problem—either before solution work or while a project is already in progress—use the workflow in @.github/skills/problem-framing/SKILL.md.

When a user asks for an interactive article, scrollytelling experience, scroll-triggered explainer, narrative script, or a long-form page whose visuals change with the story, use @.github/skills/scrollytelling-article/SKILL.md. Preserve its approval gate: agree on the narrative and visual script before implementing the article.

Add one routing paragraph here for every new skill. `scripts/check-skills.mjs` fails if a skill has no paragraph here.

## Working on the skills

Treat a skill's YAML frontmatter as its routing contract — it is the only thing that decides whether the skill is ever invoked. When changing `name` or `description`, change as little as possible and keep the non-trigger clause: every `description` must state, in plain language, what must *not* route to this skill.

Every `SKILL.md` carries an `## Anti-patterns` section. It is the repo's only written record of how the skill fails in practice. When you discover a new failure mode by using a skill, add it there in the same change.

A skill change is incomplete until `SKILL.md` and the explainer in `docs/<skill>/` agree. If a workflow, phase, boundary, or term changes in the skill, update the explainer that describes it in the same change.

Keep the top-level `SKILL.md` to decision logic. Move reference material — templates, format specifications, taxonomies, code recipes — into `references/` or `templates/` inside the skill folder, and point to it with an explicit "read X before step N". Never move a step's completion criterion out of `SKILL.md`.

Do not put evaluation material—scenarios, rubrics, or run transcripts—inside `.github/skills/`. That directory is loaded as skill context, and evaluation text there would contaminate real runs.

Keep skills platform-neutral. Do not introduce vendor-specific metadata or references unrelated to GitHub Copilot repository conventions.

Run `node scripts/check-skills.mjs` after changing any skill, template, or link. It needs no dependencies.

## Method conventions shared by the skills

Treat `FRAMED_PROBLEM.md` as the problem-framing skill's primary output and as persistent project context.

Do not collapse observations, interpretations, assumptions, commitments, and preferences into a single category. Ask one high-leverage question at a time, inspect available project context before asking for facts, and request research-library or metrics inputs only when they can change the frame or next decision.

## Adding a skill

Start from `templates/SKILL.template.md`. A new skill is not finished until it has a routing paragraph above, an `## Anti-patterns` section, a `docs/<skill>/` explainer, an entry in the README, and a passing `node scripts/check-skills.mjs`.
