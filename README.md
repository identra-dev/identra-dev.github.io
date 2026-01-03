# Identra Landing Page

Premium, motion-aware landing page for **Identra — The OS That Remembers**.

This repository contains the source code for Identra’s public-facing landing experience.  
The landing page is designed as a **calm, engineered, security-grade interface** that reflects the same principles as the Identra desktop application and backend architecture.

This is **not** a marketing-heavy SaaS site.  
It is a **product credibility surface**.

---

 Purpose

The landing page exists to:

- Clearly explain what Identra is (and what it is not)
- Establish trust with security-conscious users
- Showcase the product experience without gimmicks
- Provide a clean download path for the desktop app
- Align visually and philosophically with Identra’s OS-level design

---

 Page Architecture (UX Strategy)

The page is treated as a **single continuous experience**, not stacked static sections.

High-level flow:
1. Immersive Hero (authority + curiosity)
2. Problem → Insight (editorial morph, scroll-driven)
3. How Identra Works (pinned scroll walkthrough)
4. Product Experience (dynamic UI evolution)
5. Security & Trust (low-motion, high-clarity)
6. Differentiation (positioning reset)
7. Download & Platform Support
8. Minimal Footer

Layout patterns, typography roles, and motion intensity vary intentionally across sections to avoid fatigue and repetition.

---

 Design System Summary

### Color Philosophy
- Dark, muted base tones
- Single restrained accent color
- No pure white sections
- Subtle grain and depth layers
- Security-grade contrast ratios

### Typography System
A **three-role system**, used intentionally:

- **Display font**  
  Used only for hero headlines, section openers, and vision statements.

- **UI / Body font**  
  Used for all long-form text, navigation, and buttons.

- **Monospace font**  
  Used sparingly for shortcuts, commands, and technical cues (`⌘ K`, architecture hints).

Typography usage varies by section to signal context and hierarchy.

### Motion Principles
- Motion communicates **state change**, not decoration
- Scroll-based transitions only
- GPU-friendly properties (`opacity`, `transform`)
- No infinite loops, no heavy parallax
- Reduced-motion preferences respected

---

 Tech Stack (Aligned with Identra Core)

This landing page intentionally uses the **modernized frontend philosophy** of the Identra ecosystem.

### Core Framework
- **Next.js 16+ (Turbopack)**
  - App Router
  - Static export compatible (`output: 'export'`)
  - Server Components by default

### Styling
- **Tailwind CSS v4**
  - High-performance, compile-time engine
  - Utility-first architecture
- **GSAP (GreenSock Animation Platform)**
  - Powered the "How Identra Works" horizontal scroll experience
  - Pinned scroll triggers and timeline sequencing
- **Framer Motion**
  - Component-level entry/exit animations
  - Gestural interactions (hover, tap)

### 3D & visual Effects
- **React Three Fiber (R3F)**
  - "Secure Core" hero visualization
  - WebGL-powered ethereal effects

### Fonts
- **Display**: `Space Grotesk` (High-tech, editorial)
- **Body**: `Inter` (Legible, standard)
- **Mono**: `JetBrains Mono` (Code & technical data)

### Icons
- **Lucide React**
  - Clean, consistent, OS-friendly iconography

---

