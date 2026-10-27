# FigJam publish

Publish only when asked. Finish exploration, `replay`, `render` and `verify` first. Name the plan's organisation, not a personal team, for internal data, and warn that v1 does not mask personal data. Load `figma-use` (and `figma-use-figjam`) before any `use_figma` call.

## What the board contains

- The flow map (human labels only, no URLs or IDs), with a title, a capture note and the list of actions not explored or skipped on purpose.
- One FigJam section per viewport (1440, 1024, 768, 360, 320). Inside it, one row per branch: the branch name, where it forks, any break at that width, the named screenshots left to right with the click between them, and the branch recording as an **animated GIF** at the end (FigJam does not play MP4/WebM; the full videos stay in the run's `video/` folder). 320 is stills only.

## Steps (all prepared locally; the model only relays)

1. `ui-capture publish-prep` → writes `publish/diagram.mmd`, `publish/board-*.js`, JPEG thumbnails, GIFs (≤ 9.5 MB each, fps and size reduced automatically) and `publish/plan.json`.
2. `generate_diagram` with the contents of `publish/diagram.mmd` (and `planKey`). Keep the returned board URL; its `fileKey` is in it.
3. For each `publish/board-*.js` in order (usually two: header, then all viewport sections): `use_figma` with the file's code on that `fileKey`. Each returns `{ targets: [{key, id}] }`; save it to `publish/targets-<n>.json`. Scripts place content below whatever is already on the board, so order matters.
4. For each targets file with ids: `upload_assets` with `fileKey`, `count` = number of ids (≤ 60 per call), `nodeIds` = those ids in order, `scaleMode: "FILL"`. Save the result to `publish/urls-<n>.json`.
5. `ui-capture publish-upload --targets publish/targets-<n>.json --urls publish/urls-<n>.json` within 10 minutes of step 4. It POSTs each JPEG/GIF to its URL and logs image hashes in `publish/uploads.json`.
6. Verify: `get_screenshot` of the page (`0:1`) and look at it. Report the board URL.

If an upload fails, rerun `upload_assets` for the failed node ids and `publish-upload` again. Never paste URLs with tokens into the board.

Verified on 2026-10-27 (demo run, 5 viewports, 48 uploads in one batch). Figma's server-side screenshot shows GIF cards blank; open the board in FigJam to confirm the GIFs animate before reporting that they do.
