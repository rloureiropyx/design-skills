# Design Skills

A library of the product design skills I use with GitHub Copilot, packaged as an installable plugin.

Every skill has two legs:

| Store | Explain |
| --- | --- |
| The skill lives in `skills/<group>/<skill>/SKILL.md` and ships to anyone who installs the plugin. | An explainer in `docs/<skill>/` makes the method understandable to someone who will never read the skill file. |

A skill is only "done" when both exist.

All five explainers are indexed in one page: [`docs/index.html`](docs/index.html) — open it in a browser.

## Install

```sh
copilot plugin marketplace add rloureiro_paychex/design-skills
copilot plugin install design-skills@rolo
```

The repository is private, so this works for anyone with access to it.

```sh
copilot skill list                    # confirm all five skills appear under "Plugin skills"
copilot plugin update design-skills   # pull a newer version later
```

Updates are pulled only when `version` changes, so an in-flight commit never surprises anyone who has it installed.

> Installing straight from a repo — `copilot plugin install owner/repo` — still works but prints a deprecation warning: *"Only plugin@marketplace installs will be supported in a future release."* That is why this repo carries its own one-plugin catalog at [`.github/plugin/marketplace.json`](.github/plugin/marketplace.json) and the two-step form above is the documented route.

## Skills

Skills are grouped by what they own. The grouping is for humans — Copilot still routes on `name` and `description` alone.

### Process — decide something

#### Problem Framing

Turns a fuzzy initiative—or a project already in progress—into a clear, evidence-backed **Framed Problem**.

It keeps quoted source material as ground truth and separates it from interpretations and assumptions, compares alternative problem frames, records the options landscape so what was set aside is visible, requests targeted research or metrics only when evidence can change the decision, and defines a problem north star for the rest of the project. Its primary output is `FRAMED_PROBLEM.md`, a persistent project document that Shaping, the design package, and Design keep referencing.

Framing earns a commitment to spend *shaping time*, not a commitment to build.

- Skill: [`skills/process/problem-framing/SKILL.md`](skills/process/problem-framing/SKILL.md)
- Explainer: **shipped** — [`frame-before-you-design.html`](docs/problem-framing/frame-before-you-design.html) · [script](docs/problem-framing/frame-before-you-design.script.md)

#### Shaping

Takes a framed problem and works out **which solution shape to bet on**, inside a fixed appetite.

Numbered requirements with statuses, two or three materially different shapes, and a deliberately **binary fit check** — `✅` or `❌`, never "partially". Parts nobody can describe carry a `⚠️` and count as failures until a spike resolves them. When a shape does not fit the appetite, the scope moves, not the time. Output: `SHAPING.md`.

- Skill: [`skills/process/shaping/SKILL.md`](skills/process/shaping/SKILL.md)
- Explainer: **shipped** — [`pick-a-shape.html`](docs/shaping/pick-a-shape.html) · [script](docs/shaping/pick-a-shape.script.md)

### Artifacts — produce the thing someone decides on

#### Design Package

Assembles the document a stakeholder or betting table reads once and then decides on: problem, appetite, chosen shape, rabbit holes, no-gos, and what is still open.

Everything is carried from `FRAMED_PROBLEM.md` and `SHAPING.md`, never re-derived. It refuses to write while the appetite is undefined or an unresolved `⚠️` is still on the selected shape. Output: `DESIGN_PACKAGE.md`.

- Skill: [`skills/artifacts/design-package/SKILL.md`](skills/artifacts/design-package/SKILL.md)
- Explainer: **shipped** — [`one-read-one-decision.html`](docs/design-package/one-read-one-decision.html) · [script](docs/design-package/one-read-one-decision.script.md)

### Renderers — materialise a decision

#### Scrollytelling

Creates interactive long-form articles whose narrative and diagrams unfold as the reader scrolls. It first develops and confirms a scene-by-scene narrative and visual script, then implements the approved story as an accessible, responsive standalone HTML article.

- Skill: [`skills/renderers/scrollytelling/SKILL.md`](skills/renderers/scrollytelling/SKILL.md)
- Explainer: **shipped** — [`scroll-is-not-a-story.html`](docs/scrollytelling/scroll-is-not-a-story.html) · [script](docs/scrollytelling/scroll-is-not-a-story.script.md). Written script first, approved, then built — the skill's own gate applied to its own explainer.

#### tldraw

Draws a decided artifact — flow, journey map, service blueprint, concept model, sitemap, wireframes — on a local tldraw canvas that saves to a `.tldraw` file.

> **Runtime dependency.** This is the only skill here that needs something running outside Copilot: the **tldraw offline desktop app** on the same machine, whose local HTTP API it drives. There is no hosted fallback and no collaborative mode; without the app the skill stops rather than drawing elsewhere.

- Skill: [`skills/renderers/tldraw-skill/SKILL.md`](skills/renderers/tldraw-skill/SKILL.md)
- Explainer: **shipped** — [`draw-what-was-decided.html`](docs/tldraw-skill/draw-what-was-decided.html) · [script](docs/tldraw-skill/draw-what-was-decided.script.md)

## Repository layout

```
plugin.json                 the manifest — name, version, and what ships
skills/process/<skill>/     skills that decide something
skills/artifacts/<skill>/   skills that produce the thing someone decides on
skills/renderers/<skill>/   skills that materialise a decision someone else made
docs/index.html             the library index — a card grid linking every explainer
docs/<skill>/               explainers: articles, scripts, diagrams — flat, never nested
templates/                  the starting point for a new skill
scripts/check-skills.mjs    the structural check
```

Skills sit in `skills/` at the root because that is where `copilot plugin install` reads them. That is deliberately **not** `.github/skills/`, which is where an installed skill lands in a *consuming* project. Authoring location and consumption location are different things.

The three roots are declared explicitly in `plugin.json`'s `skills` array. Without that array the installer and the check both assume `skills/` contains skill folders directly, and `process/` would be read as a skill with no `SKILL.md`.

`docs/` stays **flat**: one folder per skill, named after the skill folder, regardless of which root the skill lives in. The check resolves `docs/<skill>` by name; mirroring the taxonomy there would break it for no benefit.

`SKILL.md` holds decision logic and is loaded in full on every invocation, so anything that is only needed at one step—a document template, a format specification, a taxonomy, a code recipe—lives in `references/` or `templates/` inside the skill folder, with an explicit "read X before step N" pointer. A step's completion criterion never moves out of `SKILL.md`.

Those sibling files are also why this ships as a plugin rather than as a link to a file: `copilot skill add <url>` fetches a single `SKILL.md` and would silently drop everything the skill points at.

## Routing

Copilot routes to a skill using the `name` and `description` in its YAML frontmatter. Those two fields are the routing contract and the most carefully written part of any skill.

Once installed, a skill competes in a **flat global namespace** with every other skill the user has — personal, project, and plugin. Names are not prefixed automatically, and the `process/artifacts/renderers` grouping is invisible to the router: it organises the repo for people, not prompts for Copilot. Every `description` therefore ends with an explicit non-trigger clause, stating what must *not* route to it, because a skill with no stated boundary claims prompts it should decline.

The three problem-and-solution skills are the sharpest case. `problem-framing`, `shaping`, and `design-package` all discuss problems, requirements, and solutions, and each one names the other two in its non-trigger clause. When one of them starts answering a prompt that belongs to another, that is the first place to look.

## Working on the skills

The skills here do **not** auto-load while you work in this repo — `skills/` is a plugin path, not a project path. Register it once:

```sh
copilot skill add ./skills
```

That registers the directory rather than copying it, so your edits apply immediately. It walks the group folders, so all five skills appear under **Custom skills** in `copilot skill list` — remove it with `copilot skill remove ./skills` when you are done, or a deleted worktree leaves a dangling registration behind.

To check the repo:

```sh
node scripts/check-skills.mjs
```

No dependencies; it runs on a clean clone. It asserts the invariants this README claims: `plugin.json` parses with a kebab-case `name` and a semver `version`, its skills paths exist, every skill's frontmatter parses, `name` matches the folder, `description` is within Copilot's 1024-character limit and carries a non-trigger clause, every skill has an `## Anti-patterns` section and a `docs/<skill>/` explainer, every `references/`/`templates/` pointer resolves, no `SKILL.md` is stranded where the manifest would not ship it, and every relative markdown link resolves.

**Run it yourself; CI cannot.** [`.github/workflows/skills.yml`](.github/workflows/skills.yml) is wired to pull requests and pushes to `main`, but this organization has GitHub-hosted runners disabled and no self-hosted runners registered, so the job fails immediately with `GitHub Actions hosted runners are disabled for this repository` and never reaches the check. Until an enterprise administrator enables runners, a red X on a pull request means the runner, not the repo—so run the command locally before you push and read the CI signal as absent rather than failing.

It checks structure, not judgement. Nothing automated can tell you whether a skill holds its boundary, asks one question at a time, or produces an artifact that stands on its own—the authoring guidance for that is in [`templates/SKILL.template.md`](templates/SKILL.template.md), and the record of how each skill fails in practice is its `## Anti-patterns` section.

There is deliberately no scenario suite. There was one, and it was never run; an unperformed ritual that advertises rigor is worse than no ritual. The cost is real and worth stating: routing and boundary regressions are now found by using a skill and noticing, not by a test. When a skill starts behaving badly, re-read its `description` and its `## Anti-patterns` first, then fix both.

## Adding a skill

1. Copy [`templates/SKILL.template.md`](templates/SKILL.template.md) to `skills/<group>/<skill>/SKILL.md` — `process/` if it decides something, `artifacts/` if it produces the thing someone decides on, `renderers/` if it materialises a decision made elsewhere. Write it, including the `## Anti-patterns` section and the description's non-trigger clause.
2. Start the explainer in `docs/<skill>/` — flat, named after the skill folder, not the group.
3. Add the skill to the list above.
4. Add a new group to `plugin.json`'s `skills` array if you created one.
5. Run `node scripts/check-skills.mjs`.
6. Bump `version` in `plugin.json` **and** `.github/plugin/marketplace.json` when you want installed users to get it.

To keep an unfinished skill in the repo without shipping it, park it under `skills/drafts/`, `skills/in-progress/`, `skills/wip/`, or `skills/deprecated/`. The check reports those as parked instead of failing.
