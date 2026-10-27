# Optional FigJam publish

Use `map.json` as the sole source of truth. When the Figma tools are available and publishing was requested, create a diagram skeleton, upload selected screenshot thumbnails and place them beside the corresponding nodes. Keep local work complete before contacting Figma.

The uploaded-thumbnail placement approach has not been verified in this implementation. Test it against a real FigJam file before claiming that images were embedded. If placement is unavailable, create a storyboard of state cards with links to evidence, and retain the local viewer as the complete fallback.

Publishing is a consequential share: ask before sending captures that may contain personal or confidential data. Version 1 does not mask PII. Keep the publish manifest resumable with Figma node IDs, image hashes and fill status.
