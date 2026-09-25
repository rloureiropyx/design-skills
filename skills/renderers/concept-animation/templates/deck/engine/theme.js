/* Visual tokens: warm off-white surface, meaning-bearing colour roles, technical-drawing idiom. */
(function (global) {
  'use strict';

  const W = 1920, H = 1080;

  const color = {
    surface: '#f7f5f0',
    grid: '#ece8df',
    gridMajor: '#e0dbcf',
    frame: '#c9c2b3',
    ink: '#1d2026',
    muted: '#595d66',
    white: '#fffdf9',
  };

  // Colour roles: every colour carries one meaning, named in the slide legend. Replace with the project's visual system;
  // keep the shape { fill, stroke, label } and re-run tools/contrast.mjs.
  const role = {
    core:     { fill: '#f7e4d8', stroke: '#c4632c', label: 'Shared core' },
    actor:    { fill: '#dcece4', stroke: '#3f8a67', label: 'Person' },
    agent:    { fill: '#e1e3f8', stroke: '#4a56c8', label: 'Agent / LLM' },
    action:   { fill: '#e2edf9', stroke: '#3a7cc0', label: 'Action' },
    gate:     { fill: '#fbf1df', stroke: '#a8791f', label: 'Human approval' },
    external: { fill: '#eceded', stroke: '#7a8088', label: 'External source' },
  };
  const accent = role.core.stroke;

  const font = {
    sans: '"IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace',
  };

  // Minimum on-slide text is 22px at 1080p (chrome labels); body text is 24px+.
  const type = {
    title:    { family: font.sans, size: 46, weight: 600, lh: 56 },
    subtitle: { family: font.sans, size: 30, weight: 600, lh: 38 },
    heading:  { family: font.sans, size: 22, weight: 600, lh: 28, tracking: 0.04, upper: true },
    body:     { family: font.sans, size: 24, weight: 400, lh: 31 },
    bodyStrong: { family: font.sans, size: 24, weight: 600, lh: 31 },
    mono:     { family: font.mono, size: 24, weight: 400, lh: 31 },
    monoSm:   { family: font.mono, size: 20, weight: 500, lh: 26 },
    chrome:   { family: font.mono, size: 22, weight: 400, lh: 28 },
  };

  const stroke = { hair: 1, line: 1.5, card: 2, emphasis: 3 };
  const radius = 3;

  global.Theme = { W, H, color, role, accent, font, type, stroke, radius };
})(window);
