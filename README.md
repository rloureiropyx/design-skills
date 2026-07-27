# Design Skills

A library of the product design skills I use with GitHub Copilot, packaged as an installable plugin.

Every skill has two legs:

| Store | Explain |
| --- | --- |
| The skill lives in `skills/<skill>/SKILL.md` and ships to anyone who installs the plugin. | An explainer in `docs/<skill>/` makes the method understandable to someone who will never read the skill file. |

A skill is only "done" when both exist.

## Install

```sh
copilot plugin marketplace add rloureiro_paychex/design-skills
copilot plugin install design-skills@rolo
```

The repository is private, so this works for anyone with access to it.

```sh
copilot skill list                    # confirm both skills appear under "Plugin skills"
copilot plugin update design-skills   # pull a newer version later
```

Updates are pulled only when `version` changes, so an in-flight commit never surprises anyone who has it installed.

> Installing straight from a repo — `copilot plugin install owner/repo` — still works but prints a deprecation warning: *"Only plugin@marketplace installs will be supported in a future release."* That is why this repo carries its own one-plugin catalog at [`.github/plugin/marketplace.json`](.github/plugin/marketplace.json) and the two-step form above is the documented route.

## Skills

### Problem Framing

Turns a fuzzy initiative—or a project already in progress—into a clear, evidence-backed **Framed Problem**.

It separates observations from interpretations and assumptions, compares alternative problem frames, requests targeted research or metrics only when evidence can change the decision, and defines a problem north star for the rest of the project. Its primary output is `FRAMED_PROBLEM.md`, a persistent project document that Shape, Pitch, and Design keep referencing.

- Skill: [`skills/problem-framing/SKILL.md`](skills/problem-framing/SKILL.md)
- Explainer: **shipped** — [`frame-before-you-design.html`](docs/problem-framing/frame-before-you-design.html) · [script](docs/problem-framing/frame-before-you-design.script.md)

### Scrollytelling

Creates interactive long-form articles whose narrative and diagrams unfold as the reader scrolls. It first develops and confirms a scene-by-scene narrative and visual script, then implements the approved story as an accessible, responsive standalone HTML article.

- Skill: [`skills/scrollytelling/SKILL.md`](skills/scrollytelling/SKILL.md)
- Explainer: **script only** — [`scroll-is-not-a-story.script.md`](docs/scrollytelling/scroll-is-not-a-story.script.md). The article is not built; the skill's own approval gate applies to its own explainer.

## Repository layout

```
plugin.json                 the manifest — name, version, and what ships
skills/<skill>/             the skill itself — SKILL.md plus optional references/ and templates/
docs/<skill>/               explainers: articles, scripts, diagrams
templates/                  the starting point for a new skill
scripts/check-skills.mjs    the structural check
```

Skills sit in `skills/` at the root because that is where `copilot plugin install` reads them. That is deliberately **not** `.github/skills/`, which is where an installed skill lands in a *consuming* project. Authoring location and consumption location are different things.

`SKILL.md` holds decision logic and is loaded in full on every invocation, so anything that is only needed at one step—a document template, a format specification, a taxonomy, a code recipe—lives in `references/` or `templates/` inside the skill folder, with an explicit "read X before step N" pointer. A step's completion criterion never moves out of `SKILL.md`.

Those sibling files are also why this ships as a plugin rather than as a link to a file: `copilot skill add <url>` fetches a single `SKILL.md` and would silently drop everything the skill points at.

## Routing

Copilot routes to a skill using the `name` and `description` in its YAML frontmatter. Those two fields are the routing contract and the most carefully written part of any skill.

Once installed, a skill competes in a **flat global namespace** with every other skill the user has — personal, project, and plugin. Names are not prefixed automatically. Every `description` therefore ends with an explicit non-trigger clause, stating what must *not* route to it, because a skill with no stated boundary claims prompts it should decline.

## Working on the skills

The skills here do **not** auto-load while you work in this repo — `skills/` is a plugin path, not a project path. Register it once:

```sh
copilot skill add ./skills
```

That registers the directory rather than copying it, so your edits apply immediately.

To check the repo:

```sh
node scripts/check-skills.mjs
```

No dependencies; it runs on a clean clone. It asserts the invariants this README claims: `plugin.json` parses with a kebab-case `name` and a semver `version`, its skills paths exist, every skill's frontmatter parses, `name` matches the folder, `description` is within Copilot's 1024-character limit and carries a non-trigger clause, every skill has an `## Anti-patterns` section and a `docs/<skill>/` explainer, every `references/`/`templates/` pointer resolves, no `SKILL.md` is stranded where the manifest would not ship it, and every relative markdown link resolves. It runs on every push and pull request.

It checks structure, not judgement. Nothing automated can tell you whether a skill holds its boundary, asks one question at a time, or produces an artifact that stands on its own—the authoring guidance for that is in [`templates/SKILL.template.md`](templates/SKILL.template.md), and the record of how each skill fails in practice is its `## Anti-patterns` section.

There is deliberately no scenario suite. There was one, and it was never run; an unperformed ritual that advertises rigor is worse than no ritual. The cost is real and worth stating: routing and boundary regressions are now found by using a skill and noticing, not by a test. When a skill starts behaving badly, re-read its `description` and its `## Anti-patterns` first, then fix both.

## Adding a skill

1. Copy [`templates/SKILL.template.md`](templates/SKILL.template.md) to `skills/<skill>/SKILL.md` and write it, including the `## Anti-patterns` section and the description's non-trigger clause.
2. Start the explainer in `docs/<skill>/`.
3. Add the skill to the list above.
4. Run `node scripts/check-skills.mjs`.
5. Bump `version` in `plugin.json` when you want installed users to get it.

To keep an unfinished skill in the repo without shipping it, park it under `skills/drafts/`, `skills/in-progress/`, `skills/wip/`, or `skills/deprecated/`. The check reports those as parked instead of failing.
