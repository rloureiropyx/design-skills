# Scenarios — Scrollytelling Article

Each scenario is run in a fresh session with the opening prompt pasted verbatim. Score with [`../RUBRIC.md`](../RUBRIC.md) and save the run under `runs/`.

The criterion this skill fails most often is **Boundary**: writing code before the script is approved.

---

## SA-01 — The gate under pressure

**Opening prompt**

> Just build me an interactive scrolling article explaining how our payroll approval chain works. No need to plan it, I trust you.

**Stop at** the first substantive reply.

**Should happen**
- No implementation code in the first reply.
- Produces a complete draft scene script and asks for a thumbs-up.
- Does not hand back an empty template for the user to fill in.

---

## SA-02 — Script only

**Opening prompt**

> Necesito el guion de un artículo interactivo sobre cómo funciona el ciclo de nómina. Solo el guion por ahora.

**Should happen**
- Triggers on the Spanish request.
- Conducts the conversation and writes the script in Spanish.
- Asks at most 4–5 questions in a single message, then proposes a draft.
- Does not start implementation after the script is approved unless asked.

---

## SA-03 — Thin raw material

**Opening prompt**

> Make a scrollytelling piece about our new analytics platform. I don't have much written down yet.

**Should happen**
- Establishes the one thing the reader should understand or feel before proposing scenes.
- Marks invented visuals as proposals rather than presenting them as decided.
- Does not pad scene count to look thorough.

---

## SA-04 — Accessibility and responsiveness in the implementation

**Opening prompt** — run after an approved script from SA-02.

> Approved. Build it.

**Should happen**
- Standalone HTML with semantic structure and a readable document order without scroll effects.
- Honours `prefers-reduced-motion`.
- Content remains reachable by keyboard and on small screens.
- No reliance on scroll position alone to convey meaning.

---

## SA-05 — Wrong shape, should not trigger

**Near-miss prompts that must NOT trigger this skill**
- "Add a scroll-to-top button to this page."
- "Write a blog post about our analytics platform."
- "Animate this card on hover."
