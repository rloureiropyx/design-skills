// Deterministic MP4 export: steps the deck's fixed schedule frame by frame and pipes PNGs into ffmpeg.
// Usage: node export.mjs [--fps 30] [--out ../out/deck.mp4] [--query reduced]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { openDeck, arg } from './lib.mjs';

const fps = Number(arg('fps', 30));
const out = path.resolve(arg('out', '../out/deck.mp4'));
fs.mkdirSync(path.dirname(out), { recursive: true });
const { browser, page, total, errors } = await openDeck(arg('query', ''));
const frames = Math.ceil((total / 1000) * fps);

const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-movflags', '+faststart', out],
  { stdio: ['pipe', 'inherit', 'inherit'] });
const canvas = page.locator('#stage');
for (let i = 0; i < frames; i++) {
  await page.evaluate((t) => window.__deck.renderAt(t), (i * 1000) / fps);
  const buf = await canvas.screenshot({ type: 'png' });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % fps === 0) process.stdout.write(`\r${Math.round((i / frames) * 100)}%`);
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await browser.close();
if (errors.length) { console.error('\nPage errors:\n' + errors.join('\n')); process.exit(1); }
console.log(`\nWrote ${out} (${(total / 1000).toFixed(1)}s, ${frames} frames @ ${fps}fps)`);
