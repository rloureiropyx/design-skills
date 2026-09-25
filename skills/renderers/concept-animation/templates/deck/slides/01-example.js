/* Example slide: a request travels to a shared core, waits at a human gate, then returns with a citation.
   Delete or replace it. It exists to show every idiom once: draw-on boxes, a connector, a travelling token,
   a one-shot emphasis, a carried highlight, a check mark, legend swatches, and static-mode reading-order badges. */
(function (global) {
  'use strict';
  const { color, role, type } = global.Theme;
  const { pulse, range } = global.Motion;
  const D = global.Draw;

  const asker = { x: 160, y: 470, w: 360, h: 120 };
  const core = { x: 780, y: 430, w: 360, h: 200 };
  const gate = { x: 1400, y: 470, w: 360, h: 120 };
  const outbound = [[asker.x + asker.w + 6, 510], [core.x - 6, 510]];
  const toGate = [[core.x + core.w + 6, 530], [gate.x - 6, 530]];
  const back = [[core.x - 6, 570], [asker.x + asker.w + 6, 570]];

  // Keeps an emphasis visible at the end of beat b and fades it as beat b+1 starts.
  const carry = (s, b, start) => (s.beat === b ? range(s.t, start, start + 300) : s.beat === b + 1 ? 1 - range(s.t, 0, 300) : 0);

  function render(ctx, s) {
    const tw = s.tw.bind(s);

    D.text(ctx, 'Answers are grounded, gated, and cited.', 112, 190, { style: type.title, p: tw(0, 0, 450) });
    D.text(ctx, 'One question, followed end to end.', 112, 240, { style: type.subtitle, color: color.muted, p: tw(0, 120, 450) });

    // Beat 0: the pieces.
    [[asker, role.actor, 'Person', 'asks a question'], [core, role.core, 'Shared core', 'governed sources'], [gate, role.gate, 'Human approval', 'named steward']]
      .forEach(([b, r, h, sub], i) => {
        D.box(ctx, b, r, tw(0, 250 + i * 90, 500));
        D.text(ctx, h, b.x + 24, b.y + 48, { style: type.heading, p: tw(0, 450 + i * 90, 400) });
        D.text(ctx, sub, b.x + 24, b.y + 84, { style: type.body, color: color.muted, p: tw(0, 520 + i * 90, 400) });
      });
    [role.actor, role.core, role.gate].forEach((r, i) => D.swatch(ctx, 112, 820 + i * 36, r, r.label, tw(0, 600 + i * 70, 400)));

    // Beat 1: the question travels to the core, the core responds once.
    D.line(ctx, outbound, tw(1, 0, 650), { arrowEnd: true, color: role.actor.stroke });
    D.token(ctx, outbound, tw(1, 300, 900), 'question', role.actor.stroke);
    D.glow(ctx, core, pulse(tw(1, 1100, 700)), role.core.stroke, 8);

    // Beat 2: a consequential change waits for the gate.
    D.line(ctx, toGate, tw(2, 0, 650), { arrowEnd: true, color: role.gate.stroke, dash: [8, 6] });
    D.glow(ctx, gate, carry(s, 2, 700), role.gate.stroke, 8);
    D.check(ctx, gate.x + gate.w - 56, gate.y + 64, 26, tw(2, 900, 500), role.gate.stroke);

    // Beat 3: the answer returns with its citation, which persists.
    D.line(ctx, back, tw(3, 0, 650), { arrowEnd: true, color: role.core.stroke });
    D.token(ctx, back, tw(3, 250, 900), 'answer', role.core.stroke, { side: 'left' });
    D.chip(ctx, asker.x + 24, asker.y + asker.h + 16, 'cites: DECISIONS/007', role.core.stroke, tw(3, 1000, 400));

    if (s.isStatic) {
      D.badge(ctx, 1, asker.x, asker.y);
      D.badge(ctx, 2, core.x, core.y);
      D.badge(ctx, 3, gate.x, gate.y);
    }
  }

  global.Deck.register({
    id: 'example',
    label: '01 — Example',
    title: 'Answers are grounded, gated, and cited.',
    notes: 'Speaker notes go here. Say what the audience should conclude, not what is drawn.',
    beats: [
      { name: 'pieces', dur: 1100, caption: 'Three parts: a person asking, a shared governed core, and a named human approver.' },
      { name: 'ask', dur: 1800, caption: 'The question travels to the shared core, which is the only source the answer may use.' },
      { name: 'gate', dur: 1400, caption: 'A consequential change waits for the named steward and proceeds only once approved.' },
      { name: 'answer', dur: 1500, caption: 'The answer returns to the person with its citation attached: DECISIONS/007.' },
    ],
    render,
  });
})(window);
