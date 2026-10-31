# Repository instructions

This repository is a **plugin**: a source of truth for product design skills, authored here and installed elsewhere. It is not a project that consumes its own skills.

```
plugin.json                        the manifest — name, version, what ships
.github/plugin/marketplace.json    the catalog consumers register and install from
skills/process/<skill>/            skills that decide something
skills/artifacts/<skill>/          skills that produce the thing someone decides on
skills/renderers/<skill>/          skills that materialise a decision made elsewhere
skills/utilities/<skill>/          skills the others call while drafting
skills/capture/<skill>/            tools that record live interface evidence
docs/<skill>/                      the explainer, for someone who will never read the skill file
```

Skills live in `skills/` at the root because that is the path `copilot plugin install` reads. They are deliberately **not** in `.github/skills/`, which is where an installed skill lands in a consuming project. Authoring location and consumption location are different things; do not move them back.

The five groups are declared explicitly in `plugin.json`'s `skills` array. Without that array, both the installer and the check assume `skills/` holds skill folders directly and read `process/` as a skill with no `SKILL.md`. If you add a group, add it to the array in the same change.

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

A fourth document sits beside the chain rather than inside it. `writing-style` writes `WRITING_STYLE.md` — how one person writes — and `slop-check`, `scrollytelling`, and `proposal` read it. It lives **in the project**, beside `FRAMED_PROBLEM.md`, and exactly one profile applies at a time: there is no merging and no precedence chain. `~/.copilot/writing-style/WRITING_STYLE.md` is a personal copy whose only job is to save repeating setup in the next project, read at setup time and when there is no project at all. Never write either inside the installed plugin directory, which `plugin update` replaces.

That document separates what the writer **does** from what they are **going for**. Rules come from evidence — samples, a short exercise, or a transcript — and each quotes a line. The `## Intent` section holds the adjectives and aspirations and is not applied to a draft unless the profile records a decision saying so. When intent and habit disagree the skill surfaces it and the user chooses; averaging them produces a voice nobody has.

A consumer that finds no profile asks once, offers a fast path, and proceeds without one if declined. It never blocks the artifact on setup.

That document governs sentence-level voice and nothing else. It never changes a structure, an argument, or a claim — least of all in `proposal`, whose whole job is to be un-sold. When a voice rule and a document's structure conflict, the document wins and the skill says so rather than averaging them.

The two utilities have a fixed precedence between them: a pattern listed in the profile's `## Slop-rule overrides` section is not a `slop-check` finding, in either mode. Without that ordering every editing pass converges on the same anonymous prose, which is the failure the pair exists to prevent.

Keep the vocabulary generic. The library is not a branded methodology, and the words a reader sees should be ones they already use:

- The document people decide on is a **proposal**, not a design package. The raw ask that arrives *before* framing is **the request** — never call it a pitch, and never call the proposal one either.
- A **pitch** is the content for communicating a decision that has already been made, to people who were not in the room. `proposal` is one reader and one decision, written to be declined; `pitch` is many readers and a narrative, written to be understood and remembered. The two compete harder in the flat namespace than any other pair here, so each `description` names the other.
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

Pick the group by what the skill owns: `process/` if it decides something, `artifacts/` if it produces the thing someone decides on, `renderers/` if it materialises a decision made elsewhere, `utilities/` if other skills call it while they draft, or `capture/` if it records evidence from a live interface.

To keep a skill in the repo without shipping it, park it under `skills/drafts/`, `skills/in-progress/`, `skills/wip/` or `skills/deprecated/`. The check reports those as parked rather than failing, and they are not installed. A `SKILL.md` anywhere else that `plugin.json` does not cover is treated as a mistake, because silently not shipping is the failure this replaced the old routing check to catch.

To ship a curated subset instead, set an explicit `skills` array in `plugin.json`. Each entry may be a folder of skills or a single skill folder.
