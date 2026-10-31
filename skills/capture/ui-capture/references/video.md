# Replay, viewports and video

`replay` walks every branch from the start page, once per viewport, in a fresh browser each time:

- **Viewports** (uxagent ADR 0006): 1440 (exploration width), 1024, 768, 360 with video; 320 as stills only for WCAG 1.4.10 reflow. Override with `--viewports 1440,768`.
- **Stills pass** (non-primary widths): screenshots each screen of the branch at that width into `assets/w<width>/`. Exploration stills cover 1440.
- **Video pass**: records `video/w<width>/<NN>-<branch>.mp4` (H.264, so it plays in Safari/WebKit as well as Chrome) with the skill's own cursor overlay (`templates/cursor-overlay.js`, injected into every page), a caption per step ("Create a new Payroll Journal · 2/5: Click "Create report""), chapters for the viewer, and a 2.5 s hold on the result screen.
- **Steps that create data are not repeated.** The video stops before them with a caption saying so; the exploration still shows the result. `--repeat-mutations primary` repeats them once at the exploration width; `all` at every width.
- **Breaks are evidence.** If a control is not reachable at a width (e.g. navigation collapses into a menu), the branch is marked broken at that width and the reason is shown in the viewer. Do not work around it.
- A step that opens a new tab ends the video on the original tab with a caption; the still from exploration shows the new tab.

Clicks use exact role + accessible-name matching and wait up to 15 s for slow screens. Review videos before sharing: v1 does not mask personal data.

## Cursor

agent-browser's built-in cursor follows only real pointer events and jumps to each click, so the skill draws its own:

- **Travel**: from the last position to the target's centre along a slight arc, ease-out quart, 350–900 ms by distance (slower than a live mouse on purpose, so viewers can follow). Position persists across page loads.
- **Trail**: at most three small ghosts, only while moving fast; they fade in 300 ms.
- **Click**: ~200 ms dwell on the target, press-scale 0.85 that springs back in 150 ms, and a 64 px two-tone ring (dark outer, light inner, light blue fill) that fades in 380 ms. Then the real click.
- **Typing**: the cursor travels to the field, clicks, and types key by key.
- **Touch widths (≤ 480 px)**: a 40 px tap circle instead of the arrow.

Based on Cap's cursor renderer, agent-browser's recording cursor, Screen Studio and Camtasia cursor effects. Avoided on purpose: long comet trails, auto-zoom (fights fixed viewports) and sound.

## Dead time

Enterprise apps can take 20–30 s to settle after a click. After each recording the CLI finds frozen stretches (ffmpeg `freezedetect`), keeps the first 1.2 s of each pause so the screen can be read, plays the rest at 4×, and never touches the final hold on the result. The page caption says "loading… (long waits are sped up)" during those waits, so the speed-up is disclosed. Chapters are remapped. `ui-capture tighten` applies the same to an existing run.
