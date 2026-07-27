# Repository instructions

This repository is a **plugin**: a source of truth for product design skills, authored here and installed elsewhere. It is not a project that consumes its own skills.

```
plugin.json                        the manifest — name, version, what ships
.github/plugin/marketplace.json    the catalog consumers register and install from
skills/<skill>/                    the skill itself: SKILL.md plus optional references/ and templates/
docs/<skill>/                      the explainer, for someone who will never read the skill file
```

Skills live in `skills/` at the root because that is the path `copilot plugin install` reads. They are deliberately **not** in `.github/skills/`, which is where an installed skill lands in a consuming project. Authoring location and consumption location are different things; do not move them back.

Because of that, the skills here do not auto-load while you work in this repo. To exercise one, register the directory once with `copilot skill add ./skills` — it registers rather than copies, so edits apply immediately.

## Working on a skill

Treat a skill's YAML frontmatter as its routing contract — it is the only thing that decides whether the skill is ever invoked, and after installation it competes in a flat global namespace with every other skill the user has. When changing `name` or `description`, change as little as possible and keep the non-trigger clause: every `description` must state, in plain language, what must *not* route to this skill.

Every `SKILL.md` carries an `## Anti-patterns` section. It is the repo's only written record of how the skill fails in practice. When you discover a new failure mode by using a skill, add it there in the same change.

A skill change is incomplete until `SKILL.md` and the explainer in `docs/<skill>/` agree. If a workflow, phase, boundary, or term changes in the skill, update the explainer that describes it in the same change.

Keep the top-level `SKILL.md` to decision logic. Move reference material — templates, format specifications, taxonomies, code recipes — into `references/` or `templates/` inside the skill folder, and point to it with an explicit "read X before step N". Never move a step's completion criterion out of `SKILL.md`.

Those sibling files are the reason this repo ships as a plugin rather than as shared links: `copilot skill add <url>` fetches a single `SKILL.md` and would silently drop everything a skill points at.

Do not put evaluation material—scenarios, rubrics, or run transcripts—inside `skills/`. That directory is loaded as skill context, and evaluation text there would contaminate real runs.

Keep skills platform-neutral. Do not introduce vendor-specific metadata or references unrelated to GitHub Copilot repository conventions.

Run `node scripts/check-skills.mjs` after changing any skill, manifest, or link. It needs no dependencies.

## Releasing

Consumers get changes only when the version changes — bump it deliberately, then they run `copilot plugin update design-skills`. If `version` were omitted the CLI would fall back to the commit SHA and every push would look like a release, which is why the check requires it.

The version lives in two files: `plugin.json` and the plugin's entry in `.github/plugin/marketplace.json`. Bump both together; the check fails if they disagree, because a stale catalog version means `plugin update` silently does nothing. The same applies to `description`, which appears in both.

Direct `copilot plugin install owner/repo` is deprecated in favour of `plugin@marketplace`, which is why the catalog exists and is the documented install route.

## Method conventions shared by the skills

Treat `FRAMED_PROBLEM.md` as the problem-framing skill's primary output and as persistent project context.

Do not collapse observations, interpretations, assumptions, commitments, and preferences into a single category. Ask one high-leverage question at a time, inspect available project context before asking for facts, and request research-library or metrics inputs only when they can change the frame or next decision.

## Adding a skill

Start from `templates/SKILL.template.md`. A new skill is not finished until it has an `## Anti-patterns` section, a `description` with a non-trigger clause, a `docs/<skill>/` explainer, an entry in the README, and a passing `node scripts/check-skills.mjs`.

To keep a skill in the repo without shipping it, park it under `skills/drafts/`, `skills/in-progress/`, `skills/wip/` or `skills/deprecated/`. The check reports those as parked rather than failing, and they are not installed. A `SKILL.md` anywhere else that `plugin.json` does not cover is treated as a mistake, because silently not shipping is the failure this replaced the old routing check to catch.

To ship a curated subset instead, set an explicit `skills` array in `plugin.json`. Each entry may be a folder of skills or a single skill folder.
