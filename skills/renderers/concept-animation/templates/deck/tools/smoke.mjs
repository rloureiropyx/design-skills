// Interaction smoke test for the live deck, derived from the registered slides:
// hash sync, next/prev, mid-beat completion, Home/End/R, notes, reduced motion, frame pacing.
import { chromium } from 'playwright-core';
import { deckUrl } from './lib.mjs';
import assert from 'node:assert/strict';

const live = deckUrl().replace('?export', '');
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'chrome' });
const errors = [];

async function open(url, opts = {}) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, ...opts });
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(url);
  await page.waitForFunction(() => document.getElementById('caption').textContent.length > 0);
  return page;
}
const hash = (p) => p.evaluate(() => location.hash);

let page = await open(live);
const shape = await page.evaluate(() => Deck.slides.map((s) => s.beats.map((b) => b.dur)));
const positions = shape.flatMap((beats, si) => beats.map((d, bi) => ({ h: `#${si + 1}.${bi + 1}`, d })));
const last = positions[positions.length - 1].h;

assert.equal(await hash(page), '#1.1', 'hash is written on load');
if (positions.length > 1) {
  await page.waitForTimeout(positions[0].d + 300);
  await page.keyboard.press('ArrowRight');
  assert.equal(await hash(page), positions[1].h, 'next advances once the beat has finished');
  if (positions[1].d > 300) {
    await page.keyboard.press('ArrowRight');
    assert.equal(await hash(page), positions[1].h, 'pressing mid-beat completes it instead of skipping');
  }
  await page.keyboard.press('ArrowLeft');
  assert.equal(await hash(page), '#1.1', 'prev returns to the previous beat');
  await page.waitForTimeout(300); // a click during the 150ms back-fade completes the fade instead of advancing
  await page.mouse.click(800, 450);
  assert.equal(await hash(page), positions[1].h, 'click advances');
  await page.keyboard.press('End');
  assert.equal(await hash(page), last, 'End jumps to the last beat');
  await page.keyboard.press('Home');
  assert.equal(await hash(page), '#1.1', 'Home jumps to the first beat');
  await page.keyboard.press('End');
  await page.keyboard.press('r');
  assert.equal(await hash(page), '#1.1', 'R restarts at the first slide');
}
const caption = await page.textContent('#caption');
assert.match(caption, new RegExp(`^Slide 1 of ${shape.length}, step 1 of ${shape[0].length}\\. \\S`), 'live region announces position and caption');
for (const [si, beats] of shape.entries()) assert.ok(beats.length, `slide ${si + 1} has beats`);
const missing = await page.evaluate(() => Deck.slides.flatMap((s, si) => s.beats.filter((b) => !b.caption).map((b) => `${si + 1}:${b.name}`)));
assert.deepEqual(missing, [], 'every beat has a caption (text equivalent)');

await page.keyboard.press('n');
assert.equal(await page.isVisible('#notes'), true, 'N opens notes');
await page.keyboard.press('n');

// Frame pacing during the longest beat.
const longest = positions.reduce((a, b) => (b.d > a.d ? b : a));
await page.goto(live + longest.h);
await page.waitForTimeout(200);
const ts = await page.evaluate(() => new Promise((res) => {
  const out = []; const f = (t) => { out.push(t); out.length < 120 ? requestAnimationFrame(f) : res(out); };
  requestAnimationFrame(f);
}));
const deltas = ts.slice(1).map((t, i) => t - ts[i]).sort((a, b) => a - b);
const p95 = deltas[Math.floor(deltas.length * 0.95)];
console.log(`pacing on ${longest.h}: median ${deltas[deltas.length >> 1].toFixed(1)}ms, p95 ${p95.toFixed(1)}ms`);
if (p95 > 34) errors.push(`frame pacing p95 ${p95.toFixed(1)}ms exceeds 34ms`);
await page.close();

page = await open(live + last, { reducedMotion: 'reduce' });
assert.equal(await page.evaluate(() => Deck.mode.reduced), true, 'honours prefers-reduced-motion');
assert.equal(await hash(page), last, 'deep link works');
await page.close();

await browser.close();
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('smoke: ok');
