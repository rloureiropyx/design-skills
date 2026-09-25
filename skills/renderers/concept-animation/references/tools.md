# Deck tools

Everything in `deck/tools/` runs against the deck through `playwright-core` and your installed Google Chrome, so no browser download is needed. Set `PW_CHANNEL` to use another channel. Run from `deck/tools` after `npm install`.

## Verify (step 5)

| Command | Output |
| --- | --- |
| `npm run smoke` | Keys, click, hash, mid-beat completion, Home/End/R, notes, reduced motion, frame pacing. Prints `smoke: ok`. |
| `npm run contrast` | WCAG contrast of every role in `engine/theme.js`: text 4.5:1, strokes 3:1. |
| `npm run snapshots` | The 35%, 70% and end frame of every beat in `out/snapshots`. |
| `node snapshots.mjs --query static --out ../out/static` | End states with reading-order badges. |
| `node snapshots.mjs --query reduced --out ../out/reduced` | End states as reduced motion shows them. |
| `node snapshots.mjs --page versions-v1.html --out ../out/v1` | Frames of an archived version page. |
| `node at.mjs /tmp/f.png 2 3` | One frame: slide 2, beat 3, end state. `node at.mjs /tmp/f.png 2 3 anim 800` renders 800ms into the beat. |

Contact sheets make a whole deck reviewable at once (needs `ffmpeg`):

```sh
cd ../out/snapshots && ffmpeg -y -loglevel error -pattern_type glob -i '*-end.png' -vf "scale=640:-1,tile=3x4" ../sheet-%02d.png
```

View every sheet, then re-render the frames you fixed with `at.mjs`.

## Optional: MP4 export

Only when someone asks for a video. Needs `ffmpeg`.

```sh
npm run export                 # out/deck.mp4, 1920x1080 at 30 fps; each beat plays, then holds 2.4s (the last holds 4s)
node export.mjs --fps 60 --out ../out/deck-60.mp4
node export.mjs --query reduced
```

A beat's `hold` field overrides its pause in the export. Sample the transitions and view them before sending the file:

```sh
ffmpeg -ss 12 -i ../out/deck.mp4 -frames:v 1 -vf "fps=10,tile=3x2" /tmp/transition.png
```
