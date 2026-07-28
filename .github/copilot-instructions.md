# Repository instructions

This repository is a **plugin**: a source of truth for product design skills, authored here and installed elsewhere. It is not a project that consumes its own skills.

```
plugin.json                        the manifest — name, version, what ships
.github/plugin/marketplace.json    the catalog consumers register and install from
skills/process/<skill>/            skills that decide something
skills/artifacts/<skill>/          skills that produce the thing someone decides on
skills/renderers/<skill>/          skills that materialise a decision made elsewhere
docs/<skill>/                      the explainer, for someone who will never read the skill file
```

Skills live in `skills/` at the root because that is the path `copilot plugin install` reads. They are deliberately **not** in `.github/skills/`, which is where an installed skill lands in a consuming project. Authoring location and consumption location are different things; do not move them back.

The three groups are declared explicitly in `plugin.json`'s `skills` array. Without that array, both the installer and the check assume `skills/` holds skill folders directly and read `process/` as a skill with no `SKILL.md`. If you add a group, add it to the array in the same change.

The grouping is for humans. Copilot routes on `name` and `description` alone and knows nothing about the folder a skill sits in, so never rely on the group to keep two skills apart — that is the non-trigger clause's job.

`docs/` stays flat: `docs/<skill>/`, named after the skill folder and never after the group. The check resolves the explainer by skill name.

Because of that, the skills here do not auto-load while you work in this repo. To exercise one, register the directory once with `copilot skill add ./skills` — it registers rather than copies, so edits apply immediately.

## Working on a skill

Treat a skill's YAML frontmatter as its routing contract — it is the only thing that decides whether the skill is ever invoked, and after installation it competes in a flat global namespace with every other skill the user has. When changing `name` or `description`, change as little as possible and keep the non-trigger clause: every `description` must state, in plain language, what must *not* route to this skill.

Every `SKILL.md` carries an `## Anti-patterns` section. It is the repo's only written record of how the skill fails in practice. When you discover a new failure mode by using a skill, add it there in the same change.

A skill change is incomplete until `SKILL.md` and the explainer in `docs/<skill>/` agree. If a workflow, phase, boundary, or term changes in the skill, update the explainer that describes it in the same change.

Keep the top-level `SKILL.md` to decision logic. Move reference material — templates, format specifications, taxonomies, code recipes — into `references/` or `templates/` inside the skill folder, and point to it with an explicit "read X before step N". Never move a step's completion criterion out of `SKILL.md`.

Those sibling files are the reason this repo ships as a plugin rather than as shared links: `copilot skill add <url>` fetches a single `SKILL.md` and would silently drop everything a skill points at.

Do not put evaluation material—scenarios, rubrics, or run transcripts—inside `skills/`. That directory is loaded as skill context, and evaluation text there would contaminate real runs.

Keep skills platform-neutral. Do not introduce vendor-specific metadata or references unrelated to GitHub Copilot repository conventions.

Run `node scripts/check-skills.mjs` after changing any skill, manifest, or link. It needs no dependencies. Run it locally and do not wait for CI: this organization has hosted runners disabled, so `.github/workflows/skills.yml` fails before it reaches the check. The red X on a pull request is the runner, not the repo.

## Releasing

Consumers get changes only when the version changes — bump it deliberately, then they run `copilot plugin update design-skills`. If `version` were omitted the CLI would fall back to the commit SHA and every push would look like a release, which is why the check requires it.

The version lives in two files: `plugin.json` and the plugin's entry in `.github/plugin/marketplace.json`. Bump both together; the check fails if they disagree, because a stale catalog version means `plugin update` silently does nothing. The same applies to `description`, which appears in both.

Direct `copilot plugin install owner/repo` is deprecated in favour of `plugin@marketplace`, which is why the catalog exists and is the documented install route.

## Method conventions shared by the skills

The skills form one chain, and each link is a document: `problem-framing` writes `FRAMED_PROBLEM.md`, `shaping` reads it and writes `DIRECTIONS.md`, `proposal` reads both and writes `PROPOSAL.md`. Treat all three as persistent project context.

A downstream skill **carries** what an upstream one decided; it never re-derives it. When a downstream skill finds evidence that contradicts the frame, it sends that back rather than quietly restating the problem in new words.

Keep the vocabulary generic. The library is not a branded methodology, and the words a reader sees should be ones they already use:

- The document people decide on is a **proposal**, not a pitch and not a design package. "Pitch" names the raw request that arrives *before* framing — do not reintroduce it for the output.
- A candidate solution is a **direction**, not a shape. Directions improve across **versions** (`A1 → A2 → A3`); a new letter means a different mechanism, a new number means the same one improved.
- The fixed amount of build time is a **time budget**, not an appetite.
- The `shaping` skill keeps its name for routing reasons, but nothing a reader sees should say "shape".

Do not collapse observations, interpretations, assumptions, commitments, and preferences into a single category. Ask one high-leverage question at a time, inspect available project context before asking for facts, and request research-library or metrics inputs only when they can change the frame or next decision.

## Writing tone

The explainers and the README are not marketing. Apply these when writing or revising any prose here:

- Lead with what the thing does, in one sentence, in words someone would use out loud.
- No superlatives, no "the entire value of", no "non-negotiable", no "this is what separates X from Y".
- Say what a skill costs and where it does not help. Every explainer should say who it is *not* for.
- Keep the concrete rules — the binary fit check, one question at a time, carry-don't-re-derive. Cut the sentences that argue for them at length.
- Credit the sources plainly and do not oversell the additions.


## Adding a skill

Start from `templates/SKILL.template.md`. A new skill is not finished until it has an `## Anti-patterns` section, a `description` with a non-trigger clause, a `docs/<skill>/` explainer, an entry in the README, and a passing `node scripts/check-skills.mjs`.

To keep a skill in the repo without shipping it, park it under `skills/drafts/`, `skills/in-progress/`, `skills/wip/` or `skills/deprecated/`. The check reports those as parked rather than failing, and they are not installed. A `SKILL.md` anywhere else that `plugin.json` does not cover is treated as a mistake, because silently not shipping is the failure this replaced the old routing check to catch.

To ship a curated subset instead, set an explicit `skills` array in `plugin.json`. Each entry may be a folder of skills or a single skill folder.
