# Replay and video

Exploration captures clean stills only. Replay `flow.yaml` in a separate pass with the cursor enabled, a concise caption for each action and a trace for the replay. Record timestamps against each edge; use ffmpeg to extract per-edge clips and an optional contact sheet.

Replay uses semantic locators only: role plus accessible name. When a locator is missing, ambiguous or fails, stop and flag that step. Keep the partial recording and trace; do not silently search for a different control or re-explore the application.

Start recording around the replay, not around setup or still captures. The CLI writes per-edge start/end times and extracts short MP4 clips. A contact sheet is optional with `replay --contact-sheet`. Captures can expose personal or confidential data. Review clips and the contact sheet before publishing.
