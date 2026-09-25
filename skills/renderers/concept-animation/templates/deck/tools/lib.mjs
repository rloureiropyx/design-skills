import { chromium } from 'playwright-core';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
// --page other.html renders another page in the deck root (an archived version, an explainer) instead of the current deck.
export const deckUrl = (query = '') => `${pathToFileURL(path.join(here, '..', arg('page', 'index.html'))).href}?export${query ? '&' + query : ''}`;

export function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
}

// Uses the locally installed Chrome so no browser download is needed.
export async function openDeck(query = '') {
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(deckUrl(query));
  await page.waitForFunction(() => window.__deck && window.__deck.ready, null, { timeout: 15000 });
  const segs = await page.evaluate(() => {
    const out = [];
    let at = 0;
    Deck.slides.forEach((s, si) => s.beats.forEach((b, bi) => {
      const last = si === Deck.slides.length - 1 && bi === s.beats.length - 1;
      const d = b.dur + (b.hold || (last ? 4000 : 2400));
      out.push({ si, bi, name: b.name, start: at, dur: d, anim: b.dur });
      at += d;
    }));
    return out;
  });
  const total = await page.evaluate(() => window.__deck.total);
  const canvas = page.locator('#stage');
  const shot = async (ms, file) => {
    await page.evaluate((t) => window.__deck.renderAt(t), ms);
    return canvas.screenshot({ path: file, type: 'png' });
  };
  return { browser, page, segs, total, shot, errors };
}
