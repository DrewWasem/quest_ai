# Brand Brief v2 — Quick Reference

**Source:** `docs/quest-ai-brand-brief-v2.html`
**Status:** CANONICAL — use this for ALL scripts, UI elements, and design decisions

---

## Core Identity

- **Name:** Quest AI
- **Tagline:** "Your words are your superpower."
- **Game loop:** "Type it. Watch it. Laugh."
- **Philosophy:** "The funnier the fail, the better the lesson."
- **Target age:** 7-11 (Piaget's Concrete Operational)
- **Voice test:** "Would a funny, encouraging older sibling say this?"
- **Emotional north star:** "I want to try something weird and see what happens."
- **Core pattern:** Failure must be funnier than success

---

## Color System

### Primary Brand
| Name | Hex | Role |
|------|-----|------|
| Magic Purple | #7C3AED | Brand anchor, buttons, magic |
| Adventure Orange | #FF8C42 | CTAs, highlights, warmth |
| Victory Green | #22C55E | Success, celebrations |
| Giggle Yellow | #FBBF24 | Stars, comedy, funny fails |
| Cosmic Blue | #38BDF8 | Tips, info, discovery |

### Supporting
| Name | Hex | Role |
|------|-----|------|
| Sparkle Pink | #EC4899 | Confetti, magic bursts |
| Soft Violet | #A78BFA | Secondary UI, glows |
| Warm Peach | #FDBA74 | Hover states, warmth |
| Mint | #86EFAC | Success glow, badges |
| Sunshine | #FDE68A | Star fills, highlights |

### UI Backgrounds (Light Base)
| Name | Hex | Role |
|------|-----|------|
| Lavender Mist | #FAF7FF | Page BG |
| White | #FFFFFF | Cards |
| Soft Lilac | #F3EEFF | Tinted panels |
| Lavender | #E9DFFF | Borders |

### Game Canvas (Dark Magic)
| Name | Hex | Role |
|------|-----|------|
| Void | #0F0A1A | Deepest BG |
| Night | #1A0F2E | Canvas BG |
| Card Dark | #231546 | Panels |
| Surface | #2D1B69 | Active |
| Border | #3D2B7A | Dividers |
| Canvas BG | #1A0533 | 3D viewport |

### Text Colors
| Name | Hex | Role |
|------|-----|------|
| Deep Night | #1E1337 | Headlines |
| Twilight | #4A3D6B | Body text |
| Light | #7B6FA0 | Secondary text |
| Muted | #A99CC8 | Disabled/hints |

### Game State Colors
| State | Color | Hex |
|-------|-------|-----|
| Thinking | Cosmic Blue | #38BDF8 |
| Animating | Magic Purple | #7C3AED |
| Full Success | Victory Green | #22C55E |
| Funny Fail | Giggle Yellow | #FBBF24 |
| Try Again | Adventure Orange | #FF8C42 |

### Color Rules
1. **NEVER use red for failure** — red triggers anxiety in kids. Use yellow/orange for funny fails. Red only for system-level warnings (connection lost).
2. **Glow effects, not flat fills** — interactive elements get subtle colored glows (box-shadow 0.15 alpha). Think fireflies, not neon.
3. **3 accent colors max per screen** — let the 3D scene be the color explosion, surrounding UI stays calm.
4. **WCAG AA on all backgrounds** — 4.5:1 contrast ratio for all text.

---

## Typography

### Fonts
- **Display/Headlines:** Fredoka SemiBold/Bold (600-700)
  - Font stack: `'Fredoka', 'Nunito', system-ui, sans-serif`
- **Body/UI:** Nunito Regular/SemiBold/Bold (400-700)
  - Font stack: `'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Sizes
| Element | Size |
|---------|------|
| Game title | 48-56px |
| Task titles | 28-34px |
| Section headers | 22-26px |
| Button labels | 16-18px |
| Body text | 16px minimum |
| Narration | 18-20px |
| Feedback | 14-16px |
| **FLOOR** | **14px — never below this** |

### Rules for Kids (7-11)
- Line height: 1.6-1.8
- Short lines: 45-65 chars, max-width 540px
- Weight over size for hierarchy (use 400, 600, 700)
- NO ALL CAPS for content (OK for tiny labels/badges)
- Reading level: Grade 3-4

---

## Voice & Tone

### Four Pillars
1. **Playfully Encouraging** — celebrate every attempt, never judge
2. **Genuinely Funny** — humor through absurd situations, never mockery
3. **Concretely Helpful** — feedback about the GAME, not abstract theory
4. **Never Condescending** — 8-year-olds KNOW when they're being talked down to

### Writing Rules
- Narrations: max 20 words, present tense, one exclamation mark max
- Feedback: max 2 sentences, always game-specific ("the monster" not "your prompt")
- Use "you" rarely — describe what happens in the scene
- One idea per sentence, active voice, concrete nouns

### NEVER Say
- "Great job!" / "Well done!" / "Good try!" (empty calories)
- "prompt" in kid-facing text — say "description" or "plan"
- Edu-jargon: "skills", "learning", "practice", "challenge"
- Scary words: "wrong", "failed", "error", "mistake"

### Voice Examples
| Context | Good | Bad |
|---------|------|-----|
| Success narration | "The monster catches the giant cake and does a happy dance! Confetti everywhere!" | "Wonderful work! You successfully completed the task." |
| Funny fail | "The robot walks straight into the river. Pizza's soggy. Robot starts doing the robot dance." | "Oops! That didn't work. Don't worry, mistakes are how we learn!" |
| Giving a tip | "The robot didn't know how to cross the river! Try telling it what to use — a bridge? A jetpack? A really long pizza?" | "Remember, good prompts should address all aspects of the problem." |
| Task intro | "A monster is having its first-ever birthday party. It's 30 feet tall, breathes fire, and has never seen a cake before. What could possibly go wrong?" | "Welcome to the Monster Birthday Party challenge! In this exercise, you will practice writing detailed prompts." |

---

## 3D Visual Identity

### Art Direction
- Style: **Miniature diorama** — Crossy Road meets Untitled Goose Game
- Assets: KayKit + Tiny Treats (CC0, ~1000 tris each, gradient atlas)
- Aesthetic: Simple, charming, immediately readable

### Three.js Rendering
- **Lighting:** AmbientLight(0xffeedd, 0.6) + DirectionalLight(0xffffff, 1.0) with soft shadows
- **Camera:** 45° FOV, slightly isometric toy-world perspective
- **Performance:** Max 10 models per scene, frustum culling, 60fps target
- **Animation:** AnimationMixer per character, crossFadeTo(0.25s) transitions
- **Canvas:** 1024x576px (16:9), antialias, SRGB color space, #1A0533 background

---

## UI Design Principles

1. **Light UI wraps Dark Game** — React UI uses light lavender palette, 3D viewport is dark/magical. Creates "window into another world."
2. **Touch targets: 48px minimum** with 12px+ gaps. Submit button 56px tall.
3. **One action per screen** — each screen has ONE obvious thing to do.
4. **Border radius: 14-22px** — buttons 14px, cards 22px. Avoid perfect circles on rectangles (reads as "toy").

---

## Emotional Design

| Moment | Target Emotion | Design Goal |
|--------|---------------|-------------|
| Before Submit | Curious + Excited | Input feels like a launchpad |
| During Animation | Surprise + Anticipation | Build slowly for wonder |
| After Funny Fail | Laughter + "Again!" | Fail SO funny they show a friend |
| After Full Success | Pride + "Look what I did!" | Confetti, characters cheering |
| Reading Feedback | "Oh! I should have..." | Tip sparks an idea (clue, not grade) |
| Trying Again | Confidence + Purpose | Retry = power-up |

---

## Accessibility (Non-Negotiable)

### Visual
- WCAG AA (4.5:1) contrast for all text
- Color + shape + text — never color alone for meaning
- No flashing >3x/second
- `prefers-reduced-motion` respected

### Motor & Input
- 48px minimum touch targets, 12px gaps
- Tab navigation through all elements
- No drag-and-drop, no precision clicks
- No time pressure (no timers, no countdowns)

### Cognitive
- One task at a time, sequential clear flow
- Grade 3-4 reading level
- Consistent layout (input always same place)
- Unlimited attempts, no lives, no game over
- Spelling doesn't matter (Claude handles misspellings)
- Visible mute button, fully playable with audio off

---

## Logo

### Concept
Speech bubble transforming into a portal — sparkles and stars escaping. "Your words open worlds."

### Lockups
- **Light BG:** "Prompt" in #1E1337 + "Quest" in #FF8C42 (Adventure Orange)
- **Dark BG:** "Prompt" in #FFFFFF + "Quest" in #FDE68A (Sunshine Yellow)
- Font: Fredoka Bold, 38px in SVG lockup
- Brand mark: Purple gradient speech bubble with yellow/orange/pink/blue star sparkles
