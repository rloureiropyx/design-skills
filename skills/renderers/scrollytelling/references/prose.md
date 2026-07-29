# Prose pass — cutting AI slop from scene text

Read this in Phase 1 step 2, before you present the draft script, and again after any
re-voicing. It applies to the TEXTO column, the headings, and the delivery note.

Scrollytelling attracts these patterns more than ordinary prose does. Every scene is a beat, a
beat feels like it wants a punchline, and 2–4 sentences is exactly the length at which a writer
reaches for a dramatic reveal instead of a sentence. The scroll already supplies the drama. The
copy does not have to.

The patterns below are language-independent. Spanish drafts produce the same shapes with
different words, so both are listed.

## The patterns to cut

**Binary contrasts.** "No es X. Es Y." / "The question isn't X, it's Y." State Y. *"Esto no es
una animación, es una explicación"* → *"La animación explica el mecanismo."*

**Colon reveals.** A noun phrase, a colon, a lowercase reveal: "The detail that makes it work:
the state is derived, not stored." / *"Lo que nadie mira: el z-index."* Write it as a sentence.
Colons are for lists, labels, and quotes.

**Throat-clearing openers.** "Here's the thing", "Let me be clear", *"Vamos por partes"*,
*"Empecemos por el principio"*. In scene 1 this costs the tension the scene exists to state.

**Faux-insight setups.** "What most people get wrong", "Here's what nobody tells you",
*"Lo que casi nadie te cuenta"*. Cut the setup; the claim stands on its own or it does not.

**Dramatic fragmentation.** "That's it. That's the whole thing." / *"Nada más. Eso es todo."*
Stacked fragments read as a scroll beat pretending to be a thought.

**Negative listing.** "Not a chart. Not a dashboard. A story." / *"No es un gráfico. No es un
tablero."* Say the last one.

**Importance puffery.** "marks a turning point", "plays a vital role", *"marca un antes y un
después"*, *"juega un papel fundamental"*. State the fact; the reader decides if it matters.

**Superficial analysis.** Trailing `-ing` clauses that pretend to explain: "highlighting",
"underscoring", *"reflejando"*, *"demostrando el compromiso con…"*. Replace with the actual
consequence for the reader.

**Weasel attribution.** "studies show", "experts agree", *"está demostrado que"*. Name the source
or cut the claim. Do not invent one; ask the user.

**Fake-strong verbs.** "serves as a centralized hub", *"funciona como un eje central"*. Prefer
"is" and "has" when they are clearer, then say what it actually does.

**Synonym cycling.** The graphic, then the visual, then the diagram, then the illustration. In a
piece where the reader is watching one object change state, rotating its name makes them look for
a second object. Pick the word and repeat it.

**Rhetorical setups.** "What if I told you…", "Think about it:", *"¿Y si te dijera que…?"*, and
self-answered question-answer pairs.

**Fake-profound kickers.** The closing scene is where this lands hardest: a metaphor,
an aphorism, a mic-drop line. Do not rewrite it into a better metaphor. Delete it and close on
the clearest concrete sentence the script already has. The closing scene pays off the tension
stated in scene 1; that is closure enough.

**Summary-recap endings.** "In conclusion", "Ultimately", *"En resumen"*, or a final scene that
restates the previous six. The reader just scrolled through them.

**Formatting slop.** Emoji in headings, bold sprinkled mid-sentence, and bullets where two
sentences read better. In a scrollytelling article the visual carries the emphasis, so decorated
text competes with the graphic.

**Em dashes.** In scene text, none. In a static prose bridge, one or two if they clearly beat a
comma or a period.

## Words to cut

Banned: delve, foster, leverage, utilize, facilitate, empower, streamline, robust, cutting-edge,
paradigm shift, game changer, tapestry, realm, multifaceted, transformative, elevate, embark,
harness, ever-evolving. In Spanish: *potenciar*, *robusto*, *disruptivo*, *revolucionario*,
*empoderar*, *ecosistema* (unless it is literally one), *hoja de ruta* as decoration.

Often-empty phrases: it's worth noting, at the end of the day, when it comes to, at its core, in
today's world, let's dive in; *cabe destacar*, *en el mundo actual*, *a fin de cuentas*, *en
términos de*.

Keep an adverb or a hedge when it carries real uncertainty, contrast, or the writer's spoken
rhythm. Cut it when it delays the point.

## What not to do with this pass

**Do not flatten the voice.** The point is to remove the patterns, not to make every scene the
same tidy shape. A rough sentence with a real voice survives the pass unchanged.

**Do not fight the tone.** T4 (opinionated) takes a side, T6 (dry) runs on restraint, T2
(reflective) hedges as the point. Those are choices from `references/tone-and-goal.md`, not slop.
The test is whether the pattern is doing work in this scene or standing in for work not done.

**Do not add claims.** If a scene reads as puffery because the concrete fact is missing, ask the
user for the number. Do not invent one to make the sentence land.

## The check before presenting

Run this over the scene table, not over the finished HTML — copy is cheap to fix in a table and
expensive to fix in a built article.

- [ ] No scene opens with throat-clearing, a rhetorical setup, or a faux-insight frame.
- [ ] No colon reveals or binary contrasts in any TEXTO cell.
- [ ] The closing scene ends on a concrete sentence, not a metaphor or a recap.
- [ ] One name per recurring object across all scenes.
- [ ] Every number, date, and name in the script came from the user's material.
- [ ] Nothing in the banned list survives.

## Source

Condensed from Peter Yang's [`no-ai-slop`](https://github.com/petergyang/no-ai-slop) (MIT), with
the pattern list adapted to scene text, Spanish equivalents, and the tone menu in
`tone-and-goal.md`. The full skill is worth installing separately for editing long drafts.
