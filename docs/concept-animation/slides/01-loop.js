/* Slide 1: the loop. A source page is split into a beat table, each beat is laid out as an end state, then every frame is looked at. */
(function (global) {
  'use strict';
  const { color, role, type } = global.Theme;
  const { pulse, ease } = global.Motion;
  const D = global.Draw;
  const O = global.Objects;

  const src = role.external, skill = role.action, out = role.core, ok = role.actor;
  const src_ = { x: 170, y: 420, w: 200, h: 250 };
  const table = { x: 640, y: 400, w: 440, h: 290 };
  const stage = { x: 1330, y: 410, w: 480, h: 270 };
  const Y = 545;
  const w1 = D.curve([src_.x + src_.w + 10, Y], [table.x - 10, Y]);
  const w2 = D.curve([table.x + table.w + 10, Y], [stage.x - 10, Y]);
  const ROWS = ['pieces', 'ask', 'gate', 'answer'];
  const CHECKS = ['mid', 'end', 'smoke: ok'];

  const heading = (ctx, str, x, p, col = color.muted) => D.text(ctx, str, x, 372, { style: type.heading, color: col, p });
  const verb = (ctx, str, x, p) => D.text(ctx, str, x, Y - 22, { style: type.heading, color: skill.stroke, align: 'center', p });

  function render(ctx, s) {
    const tw = s.tw.bind(s);
    D.text(ctx, 'An explainer is one idea per click.', 112, 190, { style: type.title, p: tw(0, 0, 450) });
    D.text(ctx, 'Split the source into beats, draw each end state, then look at every frame.', 112, 240, { style: type.subtitle, color: color.muted, p: tw(0, 120, 450) });

    // Beat 0: the source of truth.
    heading(ctx, 'Source of truth', src_.x, tw(0, 250, 400));
    O.doc(ctx, src_.x, src_.y, src_.w, src_.h, src.stroke, tw(0, 300, 700), { lines: 9 });
    D.text(ctx, 'PITCH.md', src_.x + src_.w / 2, src_.y + src_.h + 44, { style: type.mono, align: 'center', p: tw(0, 600, 400) });

    // Beat 1: split into beats; the table rows arrive one per idea.
    D.line(ctx, w1, tw(1, 0, 600), { arrowEnd: true, color: skill.stroke, width: 2 });
    verb(ctx, 'Split', (w1[0][0] + w1[w1.length - 1][0]) / 2, tw(1, 200, 400));
    D.token(ctx, w1, tw(1, 250, 800), null, src.stroke, { glyph: O.scrapGlyph(src.stroke, { w: 22 }) });
    heading(ctx, 'Beat table', table.x, tw(1, 700, 400));
    O.shape(ctx, () => D.rectPath(ctx, table.x, table.y, table.w, table.h, 6), 2 * (table.w + table.h), tw(1, 800, 600), { fill: color.white, stroke: skill.stroke, width: 2 });
    ROWS.forEach((r, i) => {
      const y = table.y + 58 + i * 60;
      const p = tw(1, 1000 + i * 140, 400);
      D.text(ctx, String(i + 1), table.x + 30, y, { style: type.mono, color: skill.stroke, p });
      D.text(ctx, r, table.x + 70, y, { style: type.mono, p });
      O.answerBars(ctx, table.x + 210, y - 16, [200 - (i % 2) * 50], p);
      if (i) D.withAlpha(ctx, ease.out(p) * 0.5, () => { ctx.fillStyle = skill.stroke; ctx.fillRect(table.x + 20, y - 40, table.w - 40, 1); });
    });

    // Beat 2: lay out each beat's end state on the stage.
    D.line(ctx, w2, tw(2, 0, 600), { arrowEnd: true, color: skill.stroke, width: 2 });
    verb(ctx, 'Lay out', (w2[0][0] + w2[w2.length - 1][0]) / 2, tw(2, 200, 400));
    D.token(ctx, w2, tw(2, 250, 800), null, skill.stroke, { glyph: O.sheetGlyph(skill.stroke) });
    heading(ctx, 'End state, per beat', stage.x, tw(2, 700, 400));
    O.shape(ctx, () => D.rectPath(ctx, stage.x, stage.y, stage.w, stage.h, 4), 2 * (stage.w + stage.h), tw(2, 800, 600), { fill: color.white, stroke: out.stroke, width: 2 });
    const mid = stage.y + stage.h / 2;
    O.avatar(ctx, stage.x + 80, mid, 30, out, tw(2, 1000, 450));
    const mini = D.curve([stage.x + 124, mid], [stage.x + 330, mid - 10]);
    D.line(ctx, mini, tw(2, 1150, 500), { arrowEnd: true, color: out.stroke, width: 2 });
    O.folder(ctx, stage.x + 340, mid - 60, 100, 90, out.stroke, tw(2, 1250, 500), { fill: out.fill, sheets: 2 * ease.out(tw(2, 1450, 400)) });

    // Beat 3: verify by looking.
    D.glow(ctx, stage, pulse(tw(3, 0, 700)), ok.stroke, 10);
    O.eyeIcon(ctx, stage.x + 34, 776, 60, ok.stroke, tw(3, 100, 500));
    let x = stage.x + 84;
    CHECKS.forEach((c, i) => {
      const p = tw(3, 400 + i * 220, 400);
      D.check(ctx, x, 778, 18, p, ok.stroke);
      x += 30;
      x += D.chip(ctx, x, 762, c, ok.stroke, p) + 22;
    });
    D.text(ctx, 'Every beat, the middle and the end.', stage.x, 850, { style: type.body, color: color.muted, p: tw(3, 1100, 400) });

    if (s.isStatic) {
      D.badge(ctx, 1, src_.x, src_.y);
      D.badge(ctx, 2, table.x, table.y);
      D.badge(ctx, 3, stage.x, stage.y);
      D.badge(ctx, 4, stage.x - 22, 776);
    }
  }

  global.Deck.register({
    id: 'loop',
    label: '01 - One idea per click',
    title: 'An explainer is one idea per click.',
    notes: 'The skill draws an explanation someone already settled. It starts from that source, splits it into beats, lays out the finished state of each beat, and only then adds motion. It is not done until every frame has been looked at.',
    beats: [
      { name: 'source', dur: 1100, caption: 'Start from the source of truth, such as a PITCH.md. Every label on the slide must trace to a line in it.' },
      { name: 'beats', dur: 1800, caption: 'Split it into a beat table: one idea per click, in causal order, each with a caption that doubles as the screen-reader text.' },
      { name: 'end state', dur: 1800, caption: 'Lay out each beat as a finished diagram first. Static mode, reduced motion and going back show only end states.' },
      { name: 'verify', dur: 1600, caption: 'Then look. Render the middle and end of every beat, view each frame, and run the smoke test.' },
    ],
    render,
  });
})(window);
