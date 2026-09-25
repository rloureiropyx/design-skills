// WCAG contrast check for engine/theme.js. Text >= 4.5:1 (1.4.3); role strokes >= 3:1 against surface and fill (1.4.11).
import fs from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const src = fs.readFileSync(fileURLToPath(new URL('../engine/theme.js', import.meta.url)), 'utf8');
const window = {};
vm.runInNewContext(src, { window });
const { color, role } = window.Theme;

const lum = (hex) => {
  const c = hex.replace('#', '').match(/../g).map((h) => parseInt(h, 16) / 255)
    .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

const checks = [
  ['ink on surface', color.ink, color.surface, 4.5],
  ['muted on surface', color.muted, color.surface, 4.5],
];
for (const [k, r] of Object.entries(role)) {
  checks.push([`ink on ${k} fill`, color.ink, r.fill, 4.5]);
  checks.push([`${k} stroke on surface`, r.stroke, color.surface, 3]);
  checks.push([`${k} stroke on ${k} fill`, r.stroke, r.fill, 3]);
}
let fail = 0;
for (const [name, fg, bg, min] of checks) {
  const v = ratio(fg, bg);
  const ok = v >= min;
  if (!ok) fail++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name.padEnd(28)} ${v.toFixed(2)}:1 (min ${min})`);
}
process.exit(fail ? 1 : 0);
