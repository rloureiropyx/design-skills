// Renders mid-beat and end-of-beat frames for review. Usage: node snapshots.mjs [--out dir] [--query static]
import fs from 'node:fs';
import path from 'node:path';
import { openDeck, arg } from './lib.mjs';

const out = path.resolve(arg('out', '../out/snapshots'));
const query = arg('query', '');
fs.mkdirSync(out, { recursive: true });
const { browser, segs, shot, errors } = await openDeck(query);
for (const s of segs) {
  const id = `s${s.si + 1}-b${s.bi + 1}-${s.name.replace(/\W+/g, '-')}`;
  if (!query) {
    for (const f of [0.35, 0.7]) await shot(s.start + s.anim * f, path.join(out, `${id}-mid${Math.round(f * 100)}.png`));
  }
  await shot(s.start + s.anim + 50, path.join(out, `${id}-end.png`));
}
await browser.close();
if (errors.length) { console.error('Page errors:\n' + errors.join('\n')); process.exit(1); }
console.log(`Wrote ${fs.readdirSync(out).length} frames to ${out}`);
