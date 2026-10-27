# Replay, viewports and video

`replay` walks every branch from the start page, once per viewport, in a fresh browser each time:

- **Viewports** (uxagent ADR 0006): 1440 (exploration width), 1024, 768, 360 with video; 320 as stills only for WCAG 1.4.10 reflow. Override with `--viewports 1440,768`.
- **Stills pass** (non-primary widths): screenshots each screen of the branch at that width into `assets/w<width>/`. Exploration stills cover 1440.
- **Video pass**: records `video/w<width>/<NN>-<branch>.mp4` (H.264, so it plays in Safari/WebKit as well as Chrome) with agent-browser's cursor and click ripple, a caption per step ("Create a new Payroll Journal · 2/5: Click "Create report""), chapters for the viewer, and a 2.5 s hold on the result screen.
- **Steps that create data are not repeated.** The video stops before them with a caption saying so; the exploration still shows the result. `--repeat-mutations primary` repeats them once at the exploration width; `all` at every width.
- **Breaks are evidence.** If a control is not reachable at a width (e.g. navigation collapses into a menu), the branch is marked broken at that width and the reason is shown in the viewer. Do not work around it.
- A step that opens a new tab ends the video on the original tab with a caption; the still from exploration shows the new tab.

Clicks use exact role + accessible-name matching and wait up to 15 s for slow screens. Review videos before sharing: v1 does not mask personal data.
