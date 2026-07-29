# Design Skills

The product design skills I use with GitHub Copilot, packaged as an installable plugin.

Most of them follow one short recipe:

**Work out what the problem actually is → try two or three directions and pick one → write it up so people can decide.**

That is it. Three documents — `FRAMED_PROBLEM.md`, `DIRECTIONS.md`, `PROPOSAL.md` — each one written by a skill that reads the one before it. Two more skills draw or publish the result once something has been decided, and two utilities the others call so what gets written sounds like you rather than like a model.

The recipe is not new and it is not mine. It is mostly Ryan Singer's, with the bits added that enterprise B2B work needs and a small-team method does not cover: roles, permissions, audit, integrations, data volume, accessibility.

Every skill has two parts:

| The skill | The explainer |
| --- | --- |
| `skills/<group>/<skill>/SKILL.md` — what ships to anyone who installs the plugin. | `docs/<skill>/` — the same method, written for someone who will never open the skill file. |

Both have to exist. All the explainers are indexed in [`docs/index.html`](docs/index.html) — open it in a browser.

## Install

```sh
copilot plugin marketplace add rloureiro_paychex/design-skills
copilot plugin install design-skills@rolo
```

The repository is private, so this works for anyone with access to it.

```sh
copilot skill list                    # the skills appear under "Plugin skills"
copilot plugin update design-skills   # pull a newer version later
```

Updates arrive only when `version` changes, so an in-flight commit never surprises anyone who has it installed.

> Installing straight from a repo — `copilot plugin install owner/repo` — still works but prints a deprecation warning: *"Only plugin@marketplace installs will be supported in a future release."* That is why this repo carries its own one-plugin catalog at [`.github/plugin/marketplace.json`](.github/plugin/marketplace.json) and the two-step form above is the documented route.

## The skills

Grouped by what they own. The grouping is for people — Copilot routes on `name` and `description` alone and does not know which folder a skill sits in.

Each one reads what the last one wrote and does not re-decide it. When a later skill finds something that contradicts an earlier document, it says so instead of quietly rewriting it. There is one explainer about how the handoff works, rather than about any single skill:

- [`the-handoff-is-the-interface.html`](docs/the-chain/the-handoff-is-the-interface.html) · [script](docs/the-chain/the-handoff-is-the-interface.script.md) · [notes](docs/the-chain/README.md) — why each step is a document, what skipping one costs, and why renderers decide nothing.

### Process — decide something

#### Problem Framing

Turns a fuzzy request — or a project already underway — into a written problem, with the evidence it rests on.

It keeps what people actually said as quotes, and keeps that separate from interpretations and assumptions. It compares a few different explanations of the same behaviour rather than taking the first one. It records what was set aside, so it can be reconsidered. It asks for research or metrics only when the answer could change the decision. Output: `FRAMED_PROBLEM.md`, which the rest of the project keeps referring back to.

There is a **quick mode** for small solo work — five questions, one page — with a written rule for when the small version stops being honest and the full pass is needed.

Framing buys time to explore solutions. It does not buy approval to build.

- Skill: [`skills/process/problem-framing/SKILL.md`](skills/process/problem-framing/SKILL.md)
- Explainer: [`frame-before-you-design.html`](docs/problem-framing/frame-before-you-design.html) · [script](docs/problem-framing/frame-before-you-design.script.md)

#### Shaping

Takes a framed problem and works out which solution direction to go with, inside a fixed time budget.

Numbered requirements with statuses, two or three materially different directions, and a fit check that is deliberately **binary** — `✅` or `❌`, never "partially". Parts nobody can describe carry a `⚠️` and count as failures until someone goes and finds out. Directions improve across versions (`A1 → A2 → A3`), each version says what changed and why, and discarded ones stay visible with the reason. When a direction does not fit the time budget, the scope moves, not the time. Output: `DIRECTIONS.md`.

- Skill: [`skills/process/shaping/SKILL.md`](skills/process/shaping/SKILL.md)
- Explainer: [`pick-a-direction.html`](docs/shaping/pick-a-direction.html) · [script](docs/shaping/pick-a-direction.script.md)

### Artifacts — produce the thing people react to

#### Breadboarding

Sketches a solution in words instead of pixels: the places a person can be, what they can do or see in each one, and which action takes them where.

It is deliberately too coarse to express layout, which is what makes it useful — the mechanism can be argued about before the visual design is. Shaping calls it to make each direction concrete; wireframes come later, if layout turns out to be the real question.

- Skill: [`skills/artifacts/breadboarding/SKILL.md`](skills/artifacts/breadboarding/SKILL.md)
- Explainer: [`breadboard-before-you-draw-it.html`](docs/breadboarding/breadboard-before-you-draw-it.html) · [script](docs/breadboarding/breadboard-before-you-draw-it.script.md) · [notes](docs/breadboarding/README.md)

#### Wireframes

Decides what a screen must do, what goes on it, and how priority reads — then hands that to a renderer to draw.

Scale, fidelity, annotation weight and abstraction are set as four independent axes rather than one ladder, so asking for "more detail" adds content, states and rules before it adds polish. Colour is functional only: red means error, blue means link, and reviewer marks go outside the screen boundary so the two reds never collide. One realistic scenario per screen, never a composite showing every state at once. Page contents and exits are carried from the breadboard rather than invented again.

Most projects never need this step. It is for when layout is the real question.

- Skill: [`skills/artifacts/wireframes/SKILL.md`](skills/artifacts/wireframes/SKILL.md)
- Explainer: [`what-a-wireframe-settles-before-drawing.html`](docs/wireframes/what-a-wireframe-settles-before-drawing.html) · [script](docs/wireframes/what-a-wireframe-settles-before-drawing.script.md) · [notes](docs/wireframes/README.md)

#### Diagrams

Decides what a diagram should show and why — intention, audience, scope, scale — before anything is drawn, then hands the vocabulary to a renderer.

The type is chosen from what the reader is stuck on (time, arrangement, or context), not from the word they happened to use, because people say "flowchart" for anything with a box in it. Twelve recipes, treated as a grammar rather than templates. Detail is added in importance order with a stopping rule, so a diagram ships at Layer 1 rather than carrying everything anyone knows. The key is allowed to hold the visual vocabulary, the sources and the intention, and nothing else — the moment it starts decoding a colour, the diagram is underlabelled.

It has no fixed slot in the chain. It reads `FRAMED_PROBLEM.md` and the rest when they exist and carries the audience and scope from them, and it is equally useful for critiquing a diagram that already exists.

- Skill: [`skills/artifacts/diagrams/SKILL.md`](skills/artifacts/diagrams/SKILL.md)
- Explainer: [The drawing is the easy part](docs/diagrams/the-drawing-is-the-easy-part.html) · [notes](docs/diagrams/README.md)

#### Proposal

Assembles the document people read once and then decide on: problem, time budget, chosen direction, rabbit holes, what is deliberately out, and what is still uncertain.

Everything is carried from `FRAMED_PROBLEM.md` and `DIRECTIONS.md`, never rewritten. It refuses to write while the time budget is undefined or an unresolved `⚠️` is still on the selected direction. Before presenting, it runs an AI-slop pass over its own draft — here that is a traceability check, since puffery and unattributed claims are the sentences that trace to nothing. Output: `PROPOSAL.md`.

- Skill: [`skills/artifacts/proposal/SKILL.md`](skills/artifacts/proposal/SKILL.md)
- Explainer: [`one-read-one-decision.html`](docs/proposal/one-read-one-decision.html) · [script](docs/proposal/one-read-one-decision.script.md)

### Renderers — materialise a decision

#### Scrollytelling

Builds long-form web articles whose diagrams change as the reader scrolls. It settles the goal and tone first, writes a scene-by-scene script, runs an AI-slop pass over the scene text, gets the script approved, and only then builds the article as a standalone accessible HTML file.

- Skill: [`skills/renderers/scrollytelling/SKILL.md`](skills/renderers/scrollytelling/SKILL.md)
- Explainer: [`how-a-scrollytelling-article-gets-made.html`](docs/scrollytelling/how-a-scrollytelling-article-gets-made.html) · [script](docs/scrollytelling/how-a-scrollytelling-article-gets-made.script.md). Script written first, approved, then built — the skill's own gate applied to its own explainer.

#### tldraw

Draws a decided artifact — flow, journey map, service blueprint, concept model, sitemap, breadboard, wireframe — on a local tldraw canvas that saves to a `.tldraw` file. `wireframes` and `diagrams` are the skills in this plugin that hand it work.

> **Runtime dependency.** This is the only skill here that needs something running outside Copilot: the **tldraw offline desktop app** on the same machine, whose local HTTP API it drives. There is no hosted fallback and no collaborative mode; without the app the skill stops rather than drawing somewhere else.

- Skill: [`skills/renderers/tldraw-skill/SKILL.md`](skills/renderers/tldraw-skill/SKILL.md)
- Explainer: [`draw-what-was-decided.html`](docs/tldraw-skill/draw-what-was-decided.html) · [script](docs/tldraw-skill/draw-what-was-decided.script.md)

### Utilities — serve whoever is drafting

These two own neither a decision nor an artifact. They are called by the skills that write prose someone will read — `scrollytelling` today, `proposal` today, slides later — and they share one document between them.

#### Writing Style

Turns evidence of how you write into `WRITING_STYLE.md`: voice in a paragraph, three to five signature moves each with a quoted line under it, measurable defaults you can check a draft against, and the list of tics an editing pass must not remove.

It records two things separately — what you **do**, from evidence, and what you are **going for**, from a few contrasted adjectives. Self-description is a weak input, since personal style is mostly implicit and "difficult to specify through prompts", so rules only come from something you actually wrote or said. Intent is filed as intent. Where the two disagree you decide once, and the decision is recorded; the skill will not average them.

Three ways in, for people with different amounts of writing behind them: samples you already have, a two-prompt exercise, or a voice note when you would rather talk than type. The evidence has to cover *different subjects*, not only different places, or the profile learns the subject instead of the writer.

Set up once per project, and saved there beside `FRAMED_PROBLEM.md`. A personal copy at `~/.copilot/writing-style/WRITING_STYLE.md` is offered so the next project does not repeat the interview. Neither path is inside the plugin directory, which `plugin update` replaces.

Capped at about 120 lines, because instruction files past roughly 200 lines measurably reduce adherence — a profile that grows every session produces *less* consistent voice.

- Skill: [`skills/utilities/writing-style/SKILL.md`](skills/utilities/writing-style/SKILL.md)
- Explainer: [`docs/writing-style/README.md`](docs/writing-style/README.md)

#### Slop Check

Edits a draft to remove seventeen named patterns — throat-clearing openers, binary contrasts, colon reveals, importance puffery, fake-profound endings — plus a banned-word list and an empty-phrase list. Or, asked what is wrong instead of asked for a fix, it names each pattern and quotes the line without rewriting anything.

Detect mode will not score writing and will not claim a text was written by AI. Detectors guess; a named pattern with the line quoted is evidence you can check.

One rule out-ranks everything else: **a pattern in your voice profile's overrides section is not a finding.** If your writing is em dashes and fragments, they stay. Without that precedence a generic pass converges on the same clean prose whoever wrote the draft, which is the failure the pair exists to prevent.

It runs in `scrollytelling` Phase 1 over the scene text before approval — never over built HTML, because Phase 2 implements approved copy verbatim — and in `proposal` at step 7 before saving.

The patterns are re-authored from Peter Yang's [`no-ai-slop`](https://github.com/petergyang/no-ai-slop) (MIT), which is also where the minimum-effective-edit doctrine and the self-run eval come from. The profile-override precedence is an addition.

- Skill: [`skills/utilities/slop-check/SKILL.md`](skills/utilities/slop-check/SKILL.md)
- Explainer: [`docs/slop-check/README.md`](docs/slop-check/README.md)

## Repository layout

```
plugin.json                 the manifest — name, version, and what ships
skills/process/<skill>/     skills that decide something
skills/artifacts/<skill>/   skills that produce the thing people react to
skills/renderers/<skill>/   skills that materialise a decision someone else made
skills/utilities/<skill>/   skills the others call while drafting
docs/index.html             the library index — a card grid linking every explainer
docs/<skill>/               explainers: articles, scripts, notes — flat, never nested
docs/the-chain/             the one explainer about the handoff rather than a single skill
templates/                  the starting point for a new skill
scripts/check-skills.mjs    the structural check
```

Skills sit in `skills/` at the root because that is where `copilot plugin install` reads them. That is deliberately **not** `.github/skills/`, which is where an installed skill lands in a *consuming* project. Authoring location and consumption location are different things.

The four roots are declared in `plugin.json`'s `skills` array. Without that array the installer and the check both assume `skills/` contains skill folders directly, and `process/` would be read as a skill with no `SKILL.md`.

`docs/` stays **flat**: one folder per skill, named after the skill folder, whichever root the skill lives in. The check resolves `docs/<skill>` by name; mirroring the grouping there would break it for no benefit. A folder there without a matching skill is a library-level explainer — currently only [`docs/the-chain/`](docs/the-chain/README.md). The check tolerates it: it asserts every skill has a folder, not that every folder is a skill.

`SKILL.md` is loaded in full on every invocation, so anything needed at only one step — a document template, a format specification, a taxonomy, a code recipe — lives in `references/` or `templates/` inside the skill folder, with an explicit "read X before step N" pointer. A step's completion criterion never moves out of `SKILL.md`.

Those sibling files are also why this ships as a plugin rather than as a link to a file: `copilot skill add <url>` fetches a single `SKILL.md` and would silently drop everything the skill points at.

## Routing

Copilot picks a skill using the `name` and `description` in its YAML frontmatter. Those two fields decide whether a skill is ever used, and they are the most carefully written part of any skill here.

Once installed, a skill competes in a **flat global namespace** with every other skill the user has — personal, project, and plugin. Names are not prefixed, and the `process` / `artifacts` / `renderers` / `utilities` grouping is invisible to the router. So every `description` ends by saying what must *not* route to it. A skill with no stated boundary claims prompts it should decline.

`problem-framing`, `shaping`, and `proposal` are the sharpest case: all three talk about problems, requirements, and solutions, and each names the other two in its non-trigger clause. When one starts answering a prompt that belongs to another, that is the first place to look.

`breadboarding`, `wireframes`, and `diagrams` are the second sharpest, because all three answer "draw me the thing." A breadboard is places and affordances in words, a wireframe is one screen, a diagram is a relationship between things — and each says so in the other two's terms.

`writing-style` and `slop-check` both answer "fix how this reads", and each names the other. One builds a profile and never edits a draft; the other edits a draft and never builds a profile. `slop-check` is also the only skill here that refuses a whole category of request on principle: it will not guess whether a text was written by AI, in either mode.

## Working on the skills

The skills here do **not** auto-load while you work in this repo — `skills/` is a plugin path, not a project path. Register it once:

```sh
copilot skill add ./skills
```

That registers the directory rather than copying it, so edits apply immediately. It walks the group folders, so every skill appears under **Custom skills** in `copilot skill list`. Remove it with `copilot skill remove ./skills` when you are done, or a deleted worktree leaves a dangling registration behind.

To check the repo:

```sh
node scripts/check-skills.mjs
```

No dependencies; it runs on a clean clone. It asserts the invariants this README claims: `plugin.json` parses with a kebab-case `name` and a semver `version`, its skills paths exist, every skill's frontmatter parses, `name` matches the folder, `description` is within Copilot's 1024-character limit and carries a non-trigger clause, every skill has an `## Anti-patterns` section and a `docs/<skill>/` explainer, every `references/`/`templates/` pointer resolves, no `SKILL.md` is stranded where the manifest would not ship it, and every relative markdown link resolves.

**Run it yourself; CI cannot.** [`.github/workflows/skills.yml`](.github/workflows/skills.yml) is wired to pull requests and pushes to `main`, but this organization has GitHub-hosted runners disabled and no self-hosted runners, so the job fails immediately with `GitHub Actions hosted runners are disabled for this repository` and never reaches the check. Until an administrator enables runners, a red X on a pull request means the runner, not the repo — run the command locally before you push and read the CI signal as absent rather than failing.

It checks structure, not judgement. Nothing automated can tell you whether a skill holds its boundary, asks one question at a time, or produces something that stands on its own. The guidance for that is in [`templates/SKILL.template.md`](templates/SKILL.template.md), and the record of how each skill fails in practice is its `## Anti-patterns` section.

There is no scenario suite. There was one and it was never run, which is worse than not having one. The cost is real and worth stating: routing and boundary problems are found by using a skill and noticing, not by a test. When a skill starts behaving badly, re-read its `description` and its `## Anti-patterns` first, then fix both.

## Adding a skill

1. Copy [`templates/SKILL.template.md`](templates/SKILL.template.md) to `skills/<group>/<skill>/SKILL.md` — `process/` if it decides something, `artifacts/` if it produces the thing people react to, `renderers/` if it materialises a decision made elsewhere, `utilities/` if other skills call it while drafting. Write it, including the `## Anti-patterns` section and the description's non-trigger clause.
2. Start the explainer in `docs/<skill>/` — flat, named after the skill folder, not the group.
3. Add the skill to the list above.
4. Add a new group to `plugin.json`'s `skills` array if you created one.
5. Run `node scripts/check-skills.mjs`.
6. Bump `version` in `plugin.json` **and** `.github/plugin/marketplace.json` when you want installed users to get it.

To keep an unfinished skill in the repo without shipping it, park it under `skills/drafts/`, `skills/in-progress/`, `skills/wip/`, or `skills/deprecated/`. The check reports those as parked instead of failing.
