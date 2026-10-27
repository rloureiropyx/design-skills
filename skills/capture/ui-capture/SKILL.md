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

1. **Check the toolchain** — run `node <skill-path>/scripts/ui-capture.mjs doctor`. Stop unless Node, the exact `agent-browser` version and `ffmpeg` pass.
2. **Confirm scope before opening the app** — inspect project stories, acceptance criteria, source, Figma context and `.ui-capture/` first. Prepare the Capture Brief, then have the user confirm it. Read `references/capture-brief.md` before this step.
3. **Choose safe access** — full exploration requires an exact host entry in the consuming project's `.ui-capture/config`. Without one, allow navigation and reversible open/cancel actions only. Read `references/pitfalls.md` before interacting.
4. **Capture states** — `area` uses a deterministic breadth-first crawl within URL scope and node budget; `flow` selects from numbered, pre-filtered semantic candidates; `quick` saves an Orphan Node. The model labels evidence only, never writes selectors. Read `references/exploration.md` and `references/flow-map-format.md`.
5. **Add requested evidence** — default to one desktop viewport and as-found state. Take clean stills outside recording; crop changed regions, transient UI and user targets. Read `references/presets.md` only when variants or simulated conditions are requested.
6. **Replay and render** — replay `flow.yaml` with semantic locators; stop and flag an ambiguous locator, do not re-explore. Read `references/video.md` before recording. Generate the local viewer and run `verify`.
7. **Publish only if asked** — FigJam publishing is optional. Read `references/figjam-publish.md`; disclose that image placement has not been verified if it remains untested. Warn that v1 does not mask PII before any sharing.
8. **Hand off** — report reached and unreached Expected States, the node budget and any remaining queue, simulated states, and blocked replay steps.

The CLI returns one compact JSON object per command: `{ok, progress, node, candidates?, next}`. Never infer success from a command starting; confirm it with `verify`.

## Output

Save each run in the consuming project at `captures/<flow>/<YYYY-MM-DD-HHmm>/` with a `latest` link. The required outputs are `capture-brief.json`, `map.json`, `map.mmd`, `manifest` data in the map, accessibility snapshots, evidence assets and `viewer.html`; flow runs also save replayable `flow.yaml`. The Flow Map JSON is the source of truth. No run output or authentication state belongs in the installed plugin directory.

## Anti-patterns

- Exploring before the user confirms the Capture Brief.
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

`vercel-labs/agent-browser` provides browser sessions, semantic locators, state, cursor recording and diffs. `ref-skills/ui-sweep` informs the inventory and manifest fields. Figma's video-interaction-mapper informs normalized annotation coordinates and storyboard fallback. This skill adds the Capture Brief, Flow Map and deterministic low-cost orchestration.
