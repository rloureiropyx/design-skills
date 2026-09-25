# Briefing another model

Use this when another model or tool drafts the explainer. A one-line style prompt ("cute robot, pastel, 40s, pure JS") produces decoration without an argument. This brief fixes the argument first, then the idiom, then the engineering contract. Fill in every `<…>`.

```text
Build a click-driven animated explainer for: <concept, one sentence>.
Audience: <who>, who should leave believing: <the payoff, one sentence>.
Source of truth: <paste or link>. Draw only labels that trace to it. List anything you leave out.

Beats (one idea each, in causal order; each end state must read as a finished diagram):
| # | name | viewer understands | draws / moves | caption (1-2 sentences) | ms |
<fill 4-9 rows>

Visual idiom: technical drawing on a warm off-white grid; a thin frame with registration ticks;
mono labels; outlines that draw themselves; connectors with arrowheads; small tokens that travel
along connectors with a short trail; a stage label and progress ring in the corner.
Colour roles (one meaning each, shown in a legend as each first appears):
<role: fill / stroke / meaning>. Text >= 4.5:1, strokes >= 3:1.
Draw things as the objects they are: files as pages, folders with sheets, LLM sessions as chat
windows, people as avatars, approvals as stamps, commands as /chips; boxes only for groupings.
Actions (capture, retrieve) are the connectors themselves: a verb on the wire, the tool in the middle.
The diagram is the only character.

Motion: entrances are opacity plus a 6px rise, ease-out cubic-bezier(0.23,1,0.32,1), about 420ms;
draw-on and travel use ease-in-out cubic-bezier(0.77,0,0.175,1), 650-900ms; staggers of 70-200ms;
one-shot emphasis only; nothing loops; no scaling from zero.

Engineering: a single HTML page with a <canvas>, zero dependencies, classic <script> tags so it
runs from file://. Every frame is a pure function of (beat, t). A click or the right arrow advances
a beat; a click mid-beat completes it; the left arrow shows the previous end state. Include
reduced-motion (end states only, 150ms fade), ?static (all end states with numbered reading order),
an aria-live caption per beat, and a notes panel listing every caption.
```

With this skill available, give the filled beat table to the skill directly. The template already satisfies the engineering paragraph.
