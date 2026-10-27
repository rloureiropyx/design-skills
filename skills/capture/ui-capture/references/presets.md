# Presets

Default to one 1440×900 desktop viewport and the application as found. Each requested variant is a separately labeled node; record its settings and do not imply it is a real user preference.

Available opt-in CLI presets are `dark`, `light`, `forced-colors`, `reduced-motion`, `zoom` (200% CSS zoom) and `viewport`. Dark/light use `agent-browser` media emulation; forced colors and reduced motion use a CDP media override; zoom applies CSS zoom, which is not identical to browser zoom. Set viewport width and height explicitly. Mark the selected preset on the Capture Brief and capture it as a separate node. Note the distinction between an emulated condition and an actual user preference.

Loading, error and empty states may be induced with an explicit `network route --body` override. Label all such nodes and edges `reachability: simulated`, including the route and fixture. Do not mix simulated screenshots with live evidence without marking them. Never use a preset to bypass access controls or cause a destructive change.
