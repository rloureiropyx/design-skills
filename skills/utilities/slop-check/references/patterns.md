# Patterns

Read this at edit step 3, and before detect mode.

Every rule here is subordinate to the voice profile's `## Slop-rule overrides` section. A pattern
listed there is this writer's voice and is not a finding. When no profile loaded, the voice-signal
note you wrote at step 2 plays the same role.

---

## Named patterns

Seventeen. Each one is a shape, not a word — which is why a banned-word list alone never catches
them, and why they survive translation. A Spanish draft produces the same shapes with different
words, so the common Spanish forms are listed alongside the English ones.

### 1. Binary contrast

*"This isn't a reporting problem. It's a trust problem."* *"No es un problema de reportes, es un
problema de confianza."* The setup exists to make the payoff sound earned. Say the payoff.

**Fix:** state the second half directly. Keep the contrast only when both halves carry information
the reader needs.

### 2. Throat-clearing opener

*"Here's the thing."* *"Let me be clear."* *"Vamos por partes."* *"Empecemos por el principio."*
Words spent announcing that words are coming.

**Fix:** delete, and start at the next sentence.

### 3. Faux-insight setup

*"What most people get wrong about X…"* *"Here's what nobody tells you."* *"Lo que casi nadie te
cuenta."* It promises an insight before delivering one, and flatters the reader for reading on.

**Fix:** delete the setup. If what follows is genuinely counter-intuitive, it does not need the
announcement.

### 4. Colon reveal

*"The best part: it learns."* *"Lo que nadie mira: el z-index."* The colon is doing the dramatic
work the sentence could not.

**Fix:** one plain sentence. Keep colons that introduce a list or a genuine definition.

### 5. Superficial `-ing` analysis

Trailing clauses that assert significance without adding a fact: *"…highlighting the team's
commitment"*, *"…underscoring the need for governance"*, *"…reflejando un cambio más amplio"*,
*"…demostrando el compromiso con…"*.

**Fix:** cut the clause. When the significance is real, state it as its own sentence with the evidence
under it.

### 6. Importance puffery

*"marks a pivotal moment"*, *"stands as a testament to"*, *"marca un antes y un después"*, *"juega un
papel fundamental"*. Weight asserted rather than shown.

**Fix:** cut, or replace with what actually happened.

### 7. Weasel attribution

*"Experts agree."* *"Studies show."* *"Está demostrado que."* An unnamed source cannot be checked, so
it is not a source.

**Fix:** name it, or cut the claim. In this repo's terms it is an assertion, and it belongs where
assertions belong.

### 8. Fake-strong verb

*"serves as a centralized hub for"*, *"acts as a bridge between"*, *"funciona como un eje central"*.
Three words doing the job of "is".

**Fix:** `is`, `has`, `does`, `connects`, `stores`.

### 9. Synonym cycling

The same thing named three ways in four sentences — the agent, then the assistant, then the tool —
because repetition felt inelegant. In technical writing it costs the reader the thread.

**Fix:** pick the clearest name and repeat it. Repetition of a term is not a flaw.

### 10. Negative listing

*"Not a dashboard. Not a report. A decision surface."* *"No es un gráfico. No es un tablero."* Two
false starts to make the third land.

**Fix:** say the third thing.

### 11. Dramatic fragmentation

*"That's it. That's the whole feature."* *"Nada más. Eso es todo."* Fragments used as percussion
rather than as emphasis.

**Fix:** one complete sentence. Keep a single fragment where it genuinely emphasises; cut the stack.

### 12. Robotic rhythm

Not one sentence but the shape of many: the same construction repeated, paragraphs of near-identical
length, every section opening the same way, punchy fragments stacked in threes.

**Fix:** vary the sentence shapes. This is the pattern most likely to survive a pass that fixes
everything else, because no single line is wrong.

### 13. Rhetorical setup

*"What if I told you…"* *"Plot twist:"* *"¿Y si te dijera que…?"* A question that expects no answer,
staged to buy attention.

**Fix:** delete. Ask a real question or make the statement.

### 14. Fake-profound kicker

The last line reaching for meaning the piece did not earn: *"And that changes everything."* *"Because
in the end, the tool was never the point."*

**Fix:** **delete it.** Do not rewrite it into a better closing line — that keeps the pattern and adds
your voice to it. The piece ends on its last real sentence.

### 15. Summary-recap ending

*"In conclusion,"* *"Ultimately,"* *"En resumen,"* *"A fin de cuentas,"* followed by a restatement of
what the reader just read.

**Fix:** cut. A short piece does not need a recap; a long one needs a section, not a sentence.

### 16. Formatting slop

Emoji in headings. Bold applied mid-sentence for emphasis rather than to a term. Bullets where three
sentences of prose would read better. A heading above a two-sentence section. Tables with one column
of real content.

**Fix:** prose by default; structure when the content is genuinely structured. Bold names a term, it
does not raise a voice.

### 17. Em-dash clusters

Not the em dash — several in one paragraph, or a sentence with two pairs, so the prose reads as
perpetually interrupted.

**Fix:** in short copy, none. In longer prose, one or two. Break the rest into sentences or use commas.

**Check the overrides section before touching a single one.** For plenty of writers this is the voice,
and it is the most frequently destroyed habit in editing.

---

## Words to cut

Not banned everywhere — banned as the default reach. Each one is usually a more specific word wearing
a suit.

`delve` · `foster` · `leverage` · `utilize` · `facilitate` · `empower` · `streamline` · `robust` ·
`cutting-edge` · `paradigm shift` · `game changer` · `this changes everything` · `tapestry` · `realm` ·
`beacon` · `multifaceted` · `meticulous` · `intricate` · `paramount` · `transformative` · `elevate` ·
`embark` · `supercharge` · `harness` · `ever-evolving` · `seamless` · `unlock` · `deep dive`

In Spanish: `potenciar` · `robusto` · `disruptivo` · `revolucionario` · `empoderar` · `ecosistema`
(unless it is literally one) · `hoja de ruta` as decoration · `clave` as a modifier · `sinergia`

**Fix:** the specific verb. `leverage` is almost always `use`. `utilize` is always `use`. `facilitate`
is `run`, `host`, `let`, or `cause`. `robust` is a measurement the writer has not taken.

Keep any of these where it is the technical term — `leverage` in finance, `robust` in statistics.

## Adverbs that are usually empty

`just` · `literally` · `honestly` · `simply` · `actually` · `truly` · `fundamentally` · `importantly` ·
`crucially` · `inherently` · `inevitably` · `arguably`

Cut when the sentence means the same without them, which is most of the time. Keep when the word marks
a real contrast: *"it actually shipped"* after a paragraph about it not shipping.

## Phrases that are usually empty

`it's worth noting` · `it's important to note` · `at the end of the day` · `when it comes to` ·
`at its core` · `in today's world` · `in the age of` · `in the world of` · `the reality is` ·
`the truth is` · `in terms of` · `with regard to` · `going forward` · `in this article` ·
`let's dive in` · `needless to say` · `that said` (as a paragraph opener, repeatedly)

In Spanish: `cabe destacar` · `es importante mencionar` · `en el mundo actual` · `a fin de cuentas` ·
`en términos de` · `en lo que respecta a` · `no está de más decir`

**Fix:** delete and start at the content. *"It's worth noting that latency doubled"* is *"latency
doubled"*, and it is a stronger sentence.

---

## What good looks like

The fixes are not only removals. Four positives worth applying while you are in there:

- **Lead with the point** when the setup adds nothing. Not always — some ideas need their setup.
- **Active voice with a human or system subject.** "The team cut the step" over "the step was
  eliminated". Passive is fine when the actor is genuinely unknown or irrelevant.
- **Make the verb do the work.** "made a decision" → "decided". "performed an analysis" → "analysed".
- **Prefer the number.** "cut deploy time from 40 minutes to 4" over "significantly faster" — but only
  when the number is already in the draft. Inventing one is fabrication, not editing.
