# Optional FigJam publish

Use `map.json` as the sole source of truth. Finish and `verify` the run locally before contacting Figma. Publishing is a share: v1 does not mask PII, so say what the screenshots contain and pick the organisation's Figma plan, not a personal team, for internal data.

Verified on 2026-10-27 against a real FigJam board (N2A, 4 states). Load `figma-use` before any `use_figma` call.

1. **Prepare labels and images.** Write the Mermaid by hand from `map.json` using the human node labels: no node IDs, no URLs. Map-generated `map.mmd` labels may contain URLs; never publish them as-is. Convert each node's main screenshot to JPEG (`sips -s format jpeg -s formatOptions 75 -Z 1440`, or ffmpeg); keep each file under 10 MB.
2. **Skeleton.** `generate_diagram` with `flowchart LR` and quoted labels. It creates the board and returns its URL.
3. **Read positions.** One `use_figma` call returns `figma.currentPage.children` as `{id, type, x, y, width, height, text}`. Diagram nodes are `SHAPE_WITH_TEXT` (text in `.text.characters`); edges are `CONNECTOR`. Match shapes to Flow Map nodes by label.
4. **Placeholders.** In one `use_figma` call, create one `$fig.rectangle` per node centred under its shape (440×275 for 16:10 desktop captures with the default 480 px node spacing), named `ui-capture <node-id>`, plus a caption text, a title, and a capture note (date, environment, role, counts, simulated vs live, PII warning). Return the rectangle IDs.
5. **Fill.** `upload_assets` with `count` = N, `nodeIds` = rectangle IDs and `scaleMode: "FILL"`. POST each JPEG as multipart `file=@path;type=image/jpeg` to its `submitUrl` within 10 minutes. Each response returns `imageHash` and `placedOnNodeId`; no separate fill pass was needed.
6. **Verify.** Read the rectangles' `fills` (expect `IMAGE`), then `get_screenshot` on page `0:1` and look at it. Record the board URL, rectangle IDs and image hashes in `publish-manifest.json`.

Video cannot play in FigJam. Link the local viewer or the clip files in the capture note instead.
