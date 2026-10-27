# UI Capture

UI Capture records what a live web interface shows and how a person moves through it, starting at sign-in. It produces a branching flow map, a named screenshot of every screen at each viewport, and a cursor-visible video for every branch.

## What it produces

Each run is saved under `captures/<flow>/<YYYY-MM-DD-HHmm>/` in the consuming project. The run includes:

- A confirmed Capture Brief with the start URL, scope, strategy, role and state budget.
- `map.json` and generated `map.mmd`. The JSON Flow Map is canonical; its nodes are observed interface states and its edges are captured interactions.
- Accessibility snapshots and screenshots connected to nodes or edges by a manifest.
- A `flow.yaml` with the main path and each branch, replayable from the start page.
- Screens at 1440, 1024, 768, 360 and 320 px, and a cursor-visible video per branch at every width except 320 (stills only, for reflow).
- A self-contained HTML viewer: the flow map rendered with Pele (with a Copy flow map button that copies the Mermaid source), a viewport switcher, and one section per branch with its named screens and its video at the end.

Expected States can be seeded from acceptance criteria, a story, a design file or a user-provided list. The run marks each expected state reached, simulated or not reached; it does not invent an absent screen.

## How to run it

The skill is a thin orchestrator for `agent-browser` 0.39.4. Run `doctor` first; it checks Node, the exact browser CLI version and `ffmpeg`. The browser CLI is the only module that talks to the external browser process. The rest of the scripts handle brief validation, identity, manifest, map rendering and verification with Node's built-ins.

`area` performs a deterministic breadth-first crawl within explicit URL prefixes and a node budget. `flow` offers a numbered list of accessible controls; the model chooses a number and names the screen it leads to, while the script uses the control's exact role and accessible name. After the main path, `explore status` ranks screens by unexplored actions and `explore branch` replays to a screen and forks from there, so the map covers alternatives such as creating, managing or filtering, not just the shortest path. `quick` saves an unconnected state as an Orphan Node. The model labels evidence but never invents selectors or decides whether something was reached.

The workflow has a runtime cost: Node and the pinned browser tool are required for all captures, `ffmpeg` for video, and Pele 1.12.0 is downloaded once to `~/.cache/ui-capture/` and included in each viewer so it works offline. Replay is slow on enterprise apps: every branch is walked once per viewport in a fresh session. Steps that create data are not repeated in replay. FigJam publishing is optional and verified: the diagram plus a screenshot under each screen.

## Safety and evidence limits

Full exploration is available only for exact hosts listed under `allowed_hosts` in `.ui-capture/config` in the consuming project. Without that entry, the run is limited to safe navigation and reversible UI such as opening or cancelling a panel. Authentication is a headed, human-completed step, and one role is captured per run. Before saving, add `.ui-capture/` or `.ui-capture/*.json` to the consuming project's `.gitignore`; the CLI stops otherwise.

The map describes observable states and transitions. It does not report UX findings, accessibility judgments, expected-versus-actual defects, or implementation intent. Console errors, failed requests and accessibility snapshots are evidence, not diagnoses.

Screenshots and video can contain employee or customer data. Version 1 does not mask personal information, so inspect media before publishing. Do not commit authentication state under `.ui-capture/`.

## Who it is not for

This is not a UX review, flow critique, or accessibility audit. Use `diagrams` for a flow that has not been built, `wireframes` for proposed screen layouts, and Figma's video-interaction-mapper when the input is an existing recording. It does not generate narrated demos or capture native apps.

## Sources

The CLI mechanics use `vercel-labs/agent-browser`; the inventory and manifest approach borrows from `ref-skills/ui-sweep`. Replayable interaction evidence follows patterns from Figma's video-interaction-mapper. The output structure and verification contract are specific to this skill.
