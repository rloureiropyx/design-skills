# Presets

Viewports are handled by `replay` (see `video.md`). Exploration runs at one 1440×900 desktop viewport, as found.

Opt-in presets: `dark`, `light`, `forced-colors`, `reduced-motion`, `zoom` (200% CSS zoom) and `viewport`. Dark/light use agent-browser media emulation; forced colors and reduced motion use a CDP media override; zoom applies CSS zoom, which is not identical to browser zoom. Capture each preset as a separately named variant and say it is emulated, not a real user preference.

Loading, error and empty states may be induced with `simulate --url URL --body JSON`. Label them `reachability: simulated` and never mix them with live evidence unmarked. Never use a preset to bypass access controls or cause a destructive change.
