// One frame for review: node at.mjs out.png <slide> <beat> [static|reduced|anim] [ms-into-beat]. Slide and beat are 1-based.
import { openDeck } from './lib.mjs';
const argv = process.argv.slice(2);
const pos = argv.filter((a, i) => !a.startsWith('--') && !(argv[i - 1] || '').startsWith('--'));
const [out, si, bi, q = 'static', ms] = pos;
const { browser, segs, shot, errors } = await openDeck(q === 'anim' ? '' : q);
const seg = segs.find((x) => x.si === +si - 1 && x.bi === +bi - 1);
await shot(seg.start + (ms ? +ms : seg.anim + 50), out);
await browser.close();
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
