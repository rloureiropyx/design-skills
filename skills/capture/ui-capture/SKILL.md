---
name: ui-capture
description: >-
  Capture a live web interface as a state map, annotated screenshots, or a
  replayable interaction video. Use when someone asks to map an existing UI or
  flow exhaustively, document screen states, capture full screens or relevant
  regions, or show interactions with a visible cursor. Run the bundled
  `scripts/ui-capture.mjs` with Node; use compact JSON responses and load only
  the reference needed for the current phase. Do not use this for UX reviews or
  findings, diagrams of designed rather than live flows (`diagrams`), wireframes,
  narrated demos, or analysis of an existing recording.
---

# UI Capture

Record a live web interface without evaluating its quality. Keep evidence, map and replay connected; let scripts make deterministic choices and keep model decisions to selecting numbered candidates and labeling observed states.

## Preserve the boundary

Produce a Capture Brief, Expected States when supplied, a Flow Map, a manifest, screenshots and an accessible local viewer; add replay video only when requested. Record observations, not UX findings, judgments, or redesign recommendations. Interpretations belong to the next step chosen by the user.

## Run the loop

1. **Check the toolchain** — `node <skill-path>/scripts/ui-capture.mjs doctor`. Stop unless Node, the exact `agent-browser` version and `ffmpeg` pass.
2. **Confirm the brief before opening the app** — read `references/capture-brief.md` and `references/naming.md`. Start every flow at sign-in: `--signin-url` plus `--url` for the first signed-in page and `--start-name`. For test environments, set up a login hook with credentials in the project's `.env` (see `references/exploration.md`) so expired sessions re-login without a human; credentials never go in the plugin or any output. Name the goal and the main path. Have the user confirm, then `brief --confirm`.
3. **Choose safe access** — full exploration needs an exact host in `.ui-capture/config`; otherwise only navigation and open/cancel. Read `references/pitfalls.md`.
4. **Capture the main path** — `explore step`, then `explore step --pick N --name "<Screen> · <state>"`. Every screen gets a human name. Read `references/exploration.md`.
5. **Explore the branches** — `explore status` lists unexplored actions ranked by closeness to the goal. For each alternative that serves the goal (create, manage, filter, details…), `explore branch --at NODE --name "<Verb> <object>"` and continue with `explore step`. Fill fields with `--fill`; tag created data (`UXA-<date> <purpose>`); never confirm destructive actions. Stop at the node budget and report what is left.
6. **Replay at every viewport** — `replay` records one cursor video per branch at 1440, 1024, 768 and 360 and stills at 320. Breaks at a width are evidence; never work around them. Read `references/video.md`.
7. **Render and verify** — `render` builds `viewer.html` (Pele diagram, Copy flow map, viewport switcher, a section per branch with named screens and its video at the end). `verify` must pass; fix every naming warning.
8. **Publish only if asked** — FigJam: follow `references/figjam-publish.md`, human labels only. Warn that v1 does not mask PII.
9. **Hand off** — list branches, screens per branch, breaks per viewport, data created (with tags), unreached Expected States and unexplored actions.

The CLI returns one compact JSON object per command: `{ok, progress, node, candidates?, next}`. Follow `next`. Never infer success from a command starting; confirm with `verify`.

## Output

Each run lives in the consuming project at `captures/<flow>/<YYYY-MM-DD-HHmm>/` with a `latest` link: `capture-brief.json`, `map.json` (canonical), `map.mmd`, `flow.yaml` (branches), `assets/` (screens named `NN-<screen>.png`, other widths under `assets/w<width>/`), `video/w<width>/` and `viewer.html`. No run output or login state belongs in the installed plugin directory.

## Anti-patterns

- Exploring before the user confirms the Capture Brief.
- Writing credentials into the plugin, a hook, a capture, a report or a board instead of the project's gitignored `.env`.
- Starting a flow mid-app instead of at sign-in, or recording the human login.
- Leaving screens with generic names ("Before interaction", page titles, client numbers) or naming branches after the control instead of the intent.
- Mapping only the main path when the screen offers other ways to reach or extend the goal.
- Clicking run/submit/create with an empty name field; creating untagged data on a shared account.
- Repeating data-creating steps in replay across viewports.
- Treating a replay break at a narrow viewport as a bug to work around instead of evidence.
- Treating a node budget as proof of coverage or silently dropping the remaining queue.
- Letting the model write CSS selectors, invent states, or claim an Expected State was reached without evidence.
- Interacting with a non-allowlisted host beyond safe navigation and reversible open/cancel controls.
- Capturing multiple roles in one map, or storing authentication state outside the consuming project's gitignored `.ui-capture/`.
- Calling a simulated loading, error or empty state live evidence.
- Recording video during exploration; cursor overlays belong only in the replay pass.
- Continuing after a missing or ambiguous semantic replay locator.
- Treating console errors or an accessibility snapshot as findings.
- Sharing screenshots or video without reviewing for PII; v1 does not mask it.
- Using this for UX critique, proposed flows, wireframes, narrated demos or analysis of an existing recording.

## Sources

`vercel-labs/agent-browser` provides browser sessions, semantic locators, state, cursor recording and diffs. `ref-skills/ui-sweep` informs the inventory and manifest fields. Figma's video-interaction-mapper informs normalized annotation coordinates and storyboard fallback. Pele (pele.run, Obsidian) renders the Flow Map in the viewer. The viewport set follows uxagent ADR 0006. This skill adds the Capture Brief, branching Flow Map and deterministic low-cost orchestration.
