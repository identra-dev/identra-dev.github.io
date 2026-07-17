# Identra Landing Page — Section Design & Motion Specification

This document defines **how each landing page section is designed, animated, and composed**.

It acts as a single source of truth for layout, motion behavior, and visual intent.

The landing page is treated as a **continuous experience**, not a set of stacked blocks.

---

## Rule zero: every claim on this page must be true

This page previously shipped a product that does not exist — "the OS that remembers", a
"confidential AI operating layer", "encrypted cloud reasoning", AES-256 across a "global edge
network", a TEE, a Ghost Overlay, a Deep Work Console, and a download button with no release
behind it. None of it was real, and the cloud/encryption claims directly contradicted Identra's
one promise: nothing leaves your machine.

So, before writing a word of copy or a section spec:

- **The product is** a local desktop canvas that runs your existing coding-agent CLIs as live
  nodes, with a memory layer that compounds across agents and sessions.
- **Sources of truth, in this order:** the `identra` repo README and `docs/`, then
  `identra-ops/PRD.md`, `YC-APPLICATION.md` §2 (positioning), `DESIGN.md` (Yaru tokens, node
  anatomy, the recall banner), `PLATFORMS.md` and `DISTRIBUTION.md` (what ships where).
- **Identra has no server, no accounts, and no telemetry.** There is no transport layer, no
  enclave, and no cloud step to describe. Do not invent one to fill a section.
- **Do not ship a claim ahead of the code.** If it is not on the recall path yet, the Status
  section says so.
- **No download button until a GitHub Release exists.** Build-from-source is the honest ask.

If a section needs a feature that does not exist to be interesting, the section is wrong, not
the product.

## Global Design Rules

These rules apply to **every section**:

### Brand

- Ubuntu / Yaru, per `identra-ops/DESIGN.md` §1. Warm, confident, distinctly not-macOS.
- Orange `#E95420` for CTAs and running/attention state; aubergine `#77216F` for selection and
  the recall banner; canvas `#1e1a1d`; surface `#2c2226`; node radius 10px.
- Ubuntu for display, Inter for body, Ubuntu Mono for technical labels.
- Never drift back to neutral-grey + teal SaaS defaults. The tokens live in `app/globals.css`.

### Motion

- Motion communicates **state change**, never decoration
- Only GPU-safe properties:
  - `opacity`
  - `transform`
  - very subtle `scale`
- Animation duration: `300–600ms`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Never animate more than **3 elements at once**
- Respect `prefers-reduced-motion` — including the 3D scene, which is a rAF loop the CSS media
  query cannot reach (see `components/ui/BackgroundScene.tsx`)

### Layout

- No repeated layouts back-to-back
- Avoid card grids unless explicitly stated
- Use whitespace aggressively
- Sections may visually merge via motion instead of dividers

### Backgrounds

- Dark base tones only
- Subtle grain/noise overlay
- Soft radial lighting (low opacity)
- No bright gradients, no pure white sections
- The dotted canvas grid (`.canvas-grid`) ties the page to the product surface

---

## 1. Hero Section — Immersive Entry

### Purpose

Establish authority, seriousness, and curiosity within the first 5 seconds.

### Layout

- Full viewport height
- Center-left aligned content
- No visible section boundary below

### Content

Leads with the YC positioning, not the category. "Your agents stop forgetting." — the canvas is
how, not what. A status pill states the real maturity (early, Linux today, macOS in progress)
rather than hiding it.

### Typography

- Display font for headline
- Body font for subtext
- Monospace font for micro cues

### Motion

- On load:
  - Headline fades in + slight upward motion
  - Subtext follows with short delay
- Background node graph drifts and rotates subtly on scroll

### Visual Notes

- Minimal UI
- Hero must feel calm and deliberate

---

## 2. Problem → Insight Section (Editorial Morph)

### Purpose

Align with user pain, then reframe the problem without selling.

### Content

Agent amnesia, per PRD §1 — the pain the product actually addresses. Not cloud-security fear.
Resolves on: agents don't need more context, they need memory.

### Layout

- Single column, wide margins
- Appears as a continuation of the hero

### Content Behavior

- Statements replace each other as user scrolls
- No stacked paragraphs
- One idea per viewport moment

### Motion

- Scroll-driven text replacement
- Fade-out → fade-in only

### Visual Notes

- Feels editorial, not SaaS
- No cards, no icons

---

## 3. How Identra Works — Architecture Walkthrough

### Purpose

Explain complexity without overwhelming.

### Layout

- Pinned horizontal scroll section
- Text changes per scroll segment

### Content Structure

Three conceptual steps, all local:

1. **Full fidelity** — the real CLI in a real PTY, with your env, config and login
2. **It persists** — canvas saves to `.identra/canvas.json`, debounced atomic write
3. **It remembers** — extraction, dedupe by content hash, local fastembed, local SQLite

There is no fourth cloud step. There never was.

### Typography

- Body font dominant
- Monospace font for technical labels only

### Visual Notes

- This section signals engineering depth
- Should feel "explained", not "marketed"

---

## 4. Product Experience — The Canvas

### Purpose

Make the product tangible without overwhelming detail.

### Layout

- Split layout: evolving canvas representation on one side, concise explanations on the other

### Content

Four scroll beats, each mapping to a real screen in `identra-ops/DESIGN.md` §2:

1. Empty canvas + dock (the empty state is a feature)
2. An agent node running a real CLI
3. Two nodes wired by an edge over the MCP bus
4. **The memory moment** — the recall banner, per ops `DESIGN.md` §4

Beat 4 is the payoff and the single most important visual on the page. Calm and earned, not a
popup. Node anatomy and status-dot states follow ops `DESIGN.md` §3.

### Motion

- Scroll-driven evolution; elements appear/disappear instead of stacking
- No carousel behavior

### Visual Notes

- UI visuals should feel OS-native (Yaru)
- No heavy shadows or glassmorphism
- Every element must map to something that exists. Do not invent UI.

---

## 5. Local-first — Anchor Section

### Purpose

Convert skepticism into confidence, using only checkable facts.

### Content

Three claims, all verifiable in the repo:

- **No phone-home** — no server, no accounts, no telemetry
- **Credentials** — agent keys stay in the agent's own CLI config; Identra never stores them
- **Local memory** — fastembed locally into one SQLite file; degrades to verbatim, never blocks

### Layout

- Centered, narrow content
- Increased vertical spacing

### Visual Notes

- This section intentionally slows the user
- Calm, grounded, precise

---

## 6. Differentiation — Positioning Reset

### Purpose

Prevent mental comparison with generic AI tools.

### Content

The three defensible points from `YC-APPLICATION.md` §2, in order: fidelity, compounding
memory, every-agent-on-one-board.

### Layout

- Contrast-driven layout
- Clean comparison rows

### Visual Notes

- Clinical, not emotional
- Feels analytical and confident

---

## 7. Status — Where This Is Today

### Purpose

Earn trust by being straight about maturity. Developers reward this and punish its absence.

### Content

Mirrors the README "Status" section and `PLATFORMS.md`: what works now, what is in progress.
**When the repo's status changes, change this section in the same commit.**

### Visual Notes

- Plain, scannable, no drama

---

## 8. Run it — Conversion Point

### Purpose

Allow action without pressure.

### Content

Build-from-source quick start, copyable, matching the README verbatim (`lib/site.ts`), plus real
requirements. **When a GitHub Release exists** (see `identra-ops/DISTRIBUTION.md`), swap the
primary CTA to real download buttons and update the copy.

### Layout

- Simple, focused
- No competing elements

### Visual Notes

- Calm confidence
- Reinforce privacy and ownership

---

## 9. Footer — Quiet Exit

### Purpose

End the experience without distraction.

### Content

Links that resolve: GitHub, architecture docs, license, issues. No dead links, no "Enterprise",
no "Sign In" — none of those exist.

### Motion

- None or near-zero

---

## Design Quality Bar

A section is considered **done** only if:

- Every claim in it is true and traceable to the repo or an ops doc
- It does not feel static
- It does not feel flashy
- It does not feel generic
- It matches Identra's local-first, OS-level identity

If a section draws attention to itself instead of the product, it needs to be simplified.

---

## Final Note

This landing page is part of the **Identra platform**, not a marketing experiment.

Design decisions here must:

- Scale with the product
- Align with the desktop UI
- Maintain trust with technical users

The audience is developers who will read the source. Overclaiming is not a growth tactic here;
it is the fastest way to lose them.
