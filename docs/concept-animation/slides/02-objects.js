/* Slide 2: objects and verbs. The same capture drawn as three boxes, then as a chat window, a verb on the wire with the tool mid-wire, and a folder. */
(function (global) {
  'use strict';
  const { color, role, type } = global.Theme;
  const { pulse, ease } = global.Motion;
  const D = global.Draw;
  const O = global.Objects;

  const src = role.external, skill = role.action, out = role.core, llm = role.agent;

  // Left: first draft as boxes.
  const BOXES = [
    { x: 112, label: 'Chat' },
    { x: 362, label: 'Capture' },
    { x: 612, label: 'Folder' },
  ].map((b) => ({ ...b, y: 490, w: 190, h: 100 }));

  // Right: objects, with the action on the wire.
  const chat = { x: 960, y: 430, w: 300, h: 220 };
  const fold = { x: 1640, y: 470, w: 170, h: 140 };
  const Y = 545;
  const CHIP_W = 118, CHIP = { x: 1450 - CHIP_W / 2, y: Y - 16 };
  const wire = [[chat.x + chat.w + 8, Y], [fold.x - 8, Y]];
  const inPath = [[chat.x + chat.w + 8, Y], [CHIP.x - 4, Y]];
  const outPath = [[CHIP.x + CHIP_W + 4, Y], [fold.x - 8, Y]];

  const heading = (ctx, str, x, p, col = color.muted) => D.text(ctx, str, x, 372, { style: type.heading, color: col, p });

  function render(ctx, s) {
    const tw = s.tw.bind(s);
    D.text(ctx, 'Draw the object. Put the verb on the wire.', 112, 190, { style: type.title, p: tw(0, 0, 450) });
    D.text(ctx, 'A hypothetical example: a note from a chat is captured into a project folder.', 112, 240, { style: type.subtitle, color: color.muted, p: tw(0, 120, 450) });

    // Beat 0: boxes.
    heading(ctx, 'First draft: boxes', 112, tw(0, 250, 400));
    BOXES.forEach((b, i) => {
      D.box(ctx, b, src, tw(0, 300 + i * 120, 500));
      D.text(ctx, b.label, b.x + b.w / 2, b.y + 58, { style: type.bodyStrong, align: 'center', p: tw(0, 500 + i * 120, 400) });
      if (i < 2) D.line(ctx, [[b.x + b.w + 6, b.y + 50], [BOXES[i + 1].x - 6, b.y + 50]], tw(0, 600 + i * 120, 400), { arrowEnd: true, color: src.stroke });
    });
    D.text(ctx, 'A place and a process look the same.', 112, 660, { style: type.body, color: color.muted, p: tw(0, 900, 400) });

    D.line(ctx, [[880, 340], [880, 960]], tw(1, 0, 500), { color: color.frame, dash: [6, 8] });

    // Beat 1: the objects.
    heading(ctx, 'Objects, verb on the wire', chat.x, tw(1, 100, 400));
    const body = O.chatWindow(ctx, chat, 'Chat', llm, tw(1, 150, 600));
    O.userBubble(ctx, body.x + body.w, body.y + 6, 240, 'Log what we learned today', llm, tw(1, 500, 450));
    O.answerBars(ctx, body.x, body.y + 110, [220, 170], tw(1, 700, 450));
    O.folder(ctx, fold.x, fold.y, fold.w, fold.h, out.stroke, tw(1, 350, 600), { fill: out.fill, sheets: 1 + ease.out(tw(3, 1400, 500)) });
    D.text(ctx, 'project/', fold.x + fold.w / 2, fold.y + fold.h + 40, { style: type.mono, align: 'center', p: tw(1, 600, 400) });

    // Beat 2: the action is the wire, labelled with a verb, with the tool mid-wire.
    D.line(ctx, wire, tw(2, 0, 600), { arrowEnd: true, color: skill.stroke, width: 2 });
    D.text(ctx, 'Capture', 1450, Y - 32, { style: type.heading, color: skill.stroke, align: 'center', p: tw(2, 400, 400) });
    O.command(ctx, CHIP.x, CHIP.y, 'capture', skill.stroke, tw(2, 500, 400));

    // Beat 3: raw content in, a sheet out, and it lands in the folder.
    D.token(ctx, inPath, tw(3, 0, 700), null, src.stroke, { glyph: O.scrapGlyph(src.stroke, { w: 22 }) });
    D.token(ctx, outPath, tw(3, 650, 750), null, skill.stroke, { glyph: O.sheetGlyph(out.stroke) });
    D.glow(ctx, fold, pulse(tw(3, 1350, 700)), out.stroke, 8);
    D.chip(ctx, fold.x, fold.y + fold.h + 70, 'learned.md', out.stroke, tw(3, 1600, 400));

    if (s.isStatic) {
      D.badge(ctx, 1, BOXES[0].x, BOXES[0].y);
      D.badge(ctx, 2, chat.x, chat.y);
      D.badge(ctx, 3, CHIP.x - 22, Y);
      D.badge(ctx, 4, fold.x, fold.y);
    }
  }

  global.Deck.register({
    id: 'objects',
    label: '02 - Objects and verbs',
    title: 'Draw the object. Put the verb on the wire.',
    notes: 'Boxes are a first draft. Real objects are recognised before their labels are read, and a process drawn as the wire itself gives motion a physical verb: raw content goes in, a sheet comes out, and it drops into the folder.',
    beats: [
      { name: 'boxes', dur: 1300, caption: 'Drawn as three boxes, a place and a process look the same, and the reader has to read every label to tell them apart.' },
      { name: 'objects', dur: 1300, caption: 'Drawn as the objects they are, a chat window and a folder, the parts read before any label does.' },
      { name: 'verb', dur: 1100, caption: 'The action is not a box. It is the wire itself, labelled with a verb, with the tool that performs it in the middle.' },
      { name: 'travel', dur: 2100, caption: 'Raw content goes in as a scrap, comes out of the tool as a sheet, and drops into the folder as learned.md.' },
    ],
    render,
  });
})(window);
