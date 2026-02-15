# Prompt Quest — Judge's Guide

> Built solo in 7 days for the Claude Code Hackathon (Feb 10-16, 2026)
> Live demo: [quest-ai-smoky.vercel.app](https://quest-ai-smoky.vercel.app/)

---

## What This Is

Prompt Quest is an AI-powered 3D game that teaches kids (ages 7-11) descriptive thinking through play. A child types a description — *"the skeleton juggles birthday cakes while riding a unicycle"* — and Claude Opus 4.6 generates a 3D animated scene that plays out in the browser with characters, props, animations, sound effects, and a funny narration.

Vague descriptions produce hilarious failures. Specific descriptions produce celebrations. Kids retry not because they're told to, but because they want to see what happens next.

No chatbot. No text walls. Just a medieval village, 27 animated characters, and 1,686 props waiting to be described into existence.

---

## Why Opus 4.6

This project couldn't exist with a lesser model. Here's what Opus 4.6 specifically enables:

**Vocabulary-constrained generation.** Every system prompt includes the full vocabulary contract — all valid character names, prop names, animation clips, and effects. Opus 4.6 reliably generates valid JSON scene scripts that reference only assets that actually exist as loaded GLTF models. Smaller models hallucinate asset names; Opus doesn't.

**Comedy calibration.** The system prompt instructs Claude to make failures *funnier* than successes — physical comedy, slapstick timing, character personality. Opus 4.6 consistently produces genuinely funny scenes that land with kids, not generic "something went wrong" responses.

**Contextual feedback.** After each scene, Opus generates concrete, game-specific hints: *"Skeletons love pizza, but birthdays need cake! Try adding candles and presents."* Never "Great job!" Never "Try again." Always specific to what the child described and what would make it better.

**SME orchestration.** The Claude Code setup uses Opus 4.6 as the backbone for 7 domain-expert AI personas (see [Claude Code as a Development Platform](#claude-code-as-a-development-platform)). The model's instruction-following precision made it possible to create isolated specialist agents that maintain character voice, enforce brand rules, and review content for age-appropriateness — all within the same development tool.

---

## How It Works

### The Three-Tier Response System

The game never shows an error screen. Every input gets a response:

1. **Tier 1 — Cache** (instant): 166 pre-computed "golden" responses. During demos, every prompt hits the cache. Fuzzy matching handles minor variations.

2. **Tier 2 — Live API** (1-8s): For novel inputs, Opus 4.6 generates a fresh scene script. The response is validated (JSON parse, schema check, asset name verification) and cached for future use. 6-second timeout.

3. **Tier 3 — Fallback** (instant): If the API times out or returns invalid JSON, a pre-written generic script plays. The demo never breaks.

### The Vocabulary Contract

The biggest challenge connecting an LLM to a 3D renderer: Claude might reference assets that don't exist. "Spawn a dragon" breaks the scene if there's no dragon model.

Every system prompt includes an exhaustive list of exactly which assets are available — characters, props, animations, effects. Claude physically cannot reference an asset outside the contract. This is dynamically generated per quest zone from the game's asset manifest.

**Result:** 1,686 registered props, 27 characters, 139 animation clips — all addressable by name, all guaranteed to exist.

### Scene Script Format

Claude doesn't write 3D code. It generates a simple JSON scene script:

```json
{
  "success_level": "FULL_SUCCESS",
  "narration": "The skeleton opens a present and cake launches into space!",
  "actions": [
    { "type": "spawn", "target": "skeleton_warrior", "position": "center" },
    { "type": "spawn", "target": "cake", "position": "right" },
    { "type": "animate", "target": "skeleton_warrior", "anim": "Cheering" },
    { "type": "move", "target": "cake", "to": "up-center", "style": "arc" },
    { "type": "react", "effect": "confetti-burst", "position": "center" }
  ],
  "prompt_feedback": "You nailed the birthday theme! Try adding WHO is invited."
}
```

The ScenePlayer3D component (~4,500 lines) executes these actions sequentially with proper timing, tween animations, particle effects, and spatial audio.

---

## The 7-Day Journey

### Day 1 (Feb 10) — Foundation

Started with a Phaser 2D scaffold. Built the Claude API client, Zustand game store, three-tier resolver, and first scene player. 0 TypeScript errors and 71 tests passing within the first session.

**Key decision:** Direct `fetch()` instead of the Anthropic SDK to avoid Node polyfill issues in the browser.

### Day 2 (Feb 11) — The 3D Pivot

**The biggest risk of the project.** Re-read the hackathon docs, realized the game needed to be 3D. Made the call to abandon Phaser and migrate to React Three Fiber with 4 build days left.

**Why it was worth it:** KayKit + Tiny Treats = 4,270 pre-built GLTF models with a shared skeleton rig and 139 animation clips. Professional 3D assets instead of colored rectangles.

Built the persistent village world in one session — ~1,000 hex tiles, 12 buildings, zone markers, camera fly-through transitions.

**Scale bug discovered:** KayKit hex buildings are 0.5-2.1 units tall (strategy-game scale). Characters are 2.61 units tall. Buildings appeared doll-house-sized. Created a `3d-scale-tester` SME and SceneMeasurer component to fix proportions. Buildings scaled to 3.0x.

### Days 3-4 (Feb 12-13) — Asset Integration

Deployed 665 OGG audio files with a smart fallback system: first play uses synthesized audio (instant), real OGG loads asynchronously for next time. Registered 1,686 props in ScenePlayer3D from 7 asset packs.

### Day 5 (Feb 14) — The Vignette Revolution

**Discovery:** The engine used less than 15% of available assets. 665 audio files on disk, only 10 used. 1,686 props registered, only ~175 appeared in scenes.

**Response:** A 13-phase vignette overhaul completed in a single session via parallel agent dispatch. Every vignette rewritten to a 5-beat comic strip structure (SETUP, INTENT, ACTION, CONSEQUENCE, RESOLUTION). 53 reusable movement templates created. Scene complexity now scales with prompt quality — vague descriptions get simple scenes, specific descriptions get spectacular ones.

**Mad Libs pivot:** Free-text input was too hard for younger kids. Added a Mad Libs scaffold (Stages 1-3) that progressively removes training wheels until kids write free-form descriptions (Stages 4-5).

### Day 6 (Feb 15) — Quality Uplift

Parallel agent audit scored all vignettes. 100% correlation between movement template adoption and quality. Migrated every zone to 100% template adoption. ECE Professor review caught 14 instances of violent/military language — all fixed (deadly→unstoppable, nuclear→SUPER MEGA KABOOM, assassination→silent victory).

### Day 7 (Feb 16) — Ship It

Added the 8th zone (Creative Playground — sandbox unlocked after 3 quests). Deployed to Vercel with a serverless API proxy to keep the API key server-side. Open source compliance audit: replaced all non-CC0 assets with CC0 alternatives. MIT license added.

---

## Educational Design

### Why Comedy-First Works

Most educational software punishes mistakes. Prompt Quest makes them the best part.

When a kid types "have a party," the skeleton doesn't just stand there — it taunts the camera, pizza emojis rain from the sky, and laugh-tears float around. The narration reads: *"The skeleton starts a party... for one. It's awkward."*

This is grounded in educational psychology:

- **Growth mindset (Dweck, 2006):** When failure is funny instead of punitive, kids see it as information, not judgment. They try again because they're curious, not because they're corrected.
- **Intrinsic motivation:** The comedy IS the reward. Kids don't need points or badges — they want to see what happens with a better description.
- **Zone of proximal development (Vygotsky):** The Mad Libs scaffold (Stages 1-3) provides structure. Free text (Stages 4-5) removes training wheels. Kids advance at their own pace.
- **Concrete operational stage (Piaget):** Ages 7-11 think in concrete terms. Showing a 3D scene is more effective than explaining "your description lacked specificity." The scene IS the feedback.

### The Progressive Scaffold

| Stage | Input Type | What It Teaches |
|-------|-----------|----------------|
| 1-3 | Mad Libs (fill-in-the-blank) | Vocabulary, categories, basic structure |
| 4 | Hybrid free text | Combining ideas into sentences |
| 5 | Full open prompt | Creative description, detail, specificity |

Each stage builds on the last. Stage 1 might ask: "The skeleton _____ (verb) the _____ (object)." Stage 5 is a blank canvas.

### Content Safety

- ECE Professor SME reviews all kid-facing text
- No words like "wrong," "failed," "error," or "learning" appear anywhere
- Failure is always comedy, never judgment
- No user accounts, no data collection, no personal information stored
- API key stays server-side via Vercel serverless proxy
- All text follows the brand voice: "Would a funny, encouraging older sibling say this?"

---

## Brand & Design

### Voice

Every piece of kid-facing text passes a simple test: *"Would a funny, encouraging older sibling say this?"*

**Never say:** "prompt," "Great job!", "skills," "learning," "wrong," "failed," "error"
**Say instead:** "description" or "plan" (not "prompt"), concrete game-specific feedback

Narrations: max 20 words, present tense, 1 exclamation mark maximum.

### Visual Design

- **Primary palette:** Purple (#7C3AED), Orange (#FF8C42), Green (#22C55E), Yellow (#FBBF24), Blue (#38BDF8)
- **Never red for failure** — funny fails use Yellow (#FBBF24) and Orange (#FF8C42)
- Glow effects over flat fills. Max 3 accent colors per screen. WCAG AA contrast.
- Fonts: Fredoka (headings — playful, rounded) + Nunito (body — clean, readable)
- UI wrapper: Light lavender (#FAF7FF) surrounding the atmospheric game canvas

### 3D World

- Persistent medieval hex-tile village (not isolated screens)
- 8 quest zones arranged in a circle around the village center
- Smooth 2-second camera fly-through transitions between village and zones
- Each zone has its own atmosphere: fog color, lighting, sparkles, music
- KayKit buildings scaled to 3.0x for adventure-game proportions
- Mountain perimeter at 22-36 units for backdrop depth

---

## Claude Code as a Development Platform

The most unusual aspect of this project isn't the game — it's how it was built. The `.claude/` directory contains an orchestration layer that turns Claude Code from a coding assistant into a development platform.

### 7 Domain-Expert SMEs

Isolated AI specialist personas, each with their own system prompt, knowledge files, and constraints:

| SME | Role | Example |
|-----|------|---------|
| `story-writer` | Narrative design | "Design the story arc for skeleton's birthday" |
| `character-director` | Casting + animation | "Which characters work for a space mission?" |
| `ece-professor` | Age-appropriateness | "Flag 'deadly' — replace with 'unstoppable'" |
| `prompt-writer` | Claude API prompts | "Engineer the vocabulary contract for this zone" |
| `child-game-design` | Kid-facing UX | "Never say 'prompt' — say 'description'" |
| `3d-game-development` | R3F architecture | "How should zone transitions work?" |
| `3d-scale-tester` | Model proportions | "Measure building height vs character height" |

### Conductor Workflow

Complex tasks follow a structured pipeline: **Research → Plan → Implement → Validate**. Anti-rationalization rules prevent shortcuts ("If it touches 3+ files, orchestrate. Don't just wing it.").

### Persistent Memory

60+ memory files organized across 10 domains (decisions, patterns, bugs, preferences, context, sessions, plans, research). Critical memories auto-load into every conversation. Session summaries bridge multi-day work.

### Lifecycle Hooks

6 shell scripts run automatically: session start (load memories), pre-compaction (save state), post-compaction (re-inject context), post-edit (TypeScript type checking), session end (log status).

### Custom Commands

15 commands reduce complex workflows to single invocations. `/compose-task` orchestrates 7 SMEs to go from a one-line concept to a fully implemented quest zone. `/pre-demo` runs build verification, cache check, and content audit.

---

## Technical Challenges Overcome

### Scale Mismatch (Day 2)

KayKit hex buildings are designed for strategy games (0.5-2.1 units tall). Characters are 2.61 units. Buildings appeared tiny. Built a SceneMeasurer component and 3d-scale-tester SME to diagnose and fix — buildings scaled to 3.0x.

### Vignette Blandness (Day 5)

476 vignettes used less than 15% of available assets. Created a 13-phase overhaul system with 53 movement templates and 4-tier complexity scaling. Completed the entire rewrite in one session using parallel agent dispatch.

### Content Safety (Day 6)

ECE Professor review flagged 14 instances of violent language in kid-facing text. All fixed: deadly→unstoppable, nuclear→SUPER MEGA KABOOM, assassination→silent victory. Zero flagged terms remaining.

### API Key Exposure (Day 7)

`VITE_ANTHROPIC_API_KEY` in the browser bundle would be publicly visible. Built a Vercel serverless proxy at `/api/generate-scene` with model allowlisting and token caps.

### Audio Latency (Day 3)

Loading 665 OGG files at startup would be slow. Built a smart fallback: first play uses Web Audio API synthesis (instant), real OGG loads asynchronously for subsequent plays. Seamless transition, zero perceived latency.

---

## What Shipped

| Metric | Value |
|--------|-------|
| Quest zones | 8 (7 themed + 1 sandbox) |
| Animated characters | 27 with shared skeleton rig |
| Animation clips | 139 across 8 packs |
| Registered props | 1,686 with fuzzy name resolution |
| 3D models on disk | 4,270+ GLTF assets (all CC0/CC-BY) |
| Audio files | 665 OGGs + synthesized fallbacks |
| Vignettes | 421 hand-crafted across 7 zones |
| Movement templates | 53 reusable choreography patterns |
| Golden cache entries | 166 instant demo responses |
| Fallback scripts | 8 (every zone covered) |
| Named emotions | 61 semantic mappings to pixel-art emotes |
| TypeScript errors | 0 |
| Development time | 7 days, solo developer |
| Build size | ~494 kB gzipped |

---

## Compliance & Licensing

### Open Source

- **Code:** MIT License
- **3D Assets:** CC0 (KayKit, Kenney, Tiny Treats, Quaternius, FoodMegaPack) and CC-BY (Poly Pizza, with attribution in README)
- **Audio:** CC0 (Kenney)
- **Emotes:** CC0 (Kenney Emotes Pack, 30 pixel-art emotes)
- Non-open-source assets were identified and replaced during compliance audit (Feb 15)

### Kid Safety

- No user accounts or login
- No personal data collection
- No cookies or tracking
- API key stays server-side via Vercel serverless function
- All content reviewed by ECE Professor SME for age-appropriateness
- No red for failure (avoids negative associations)
- Brand voice rules enforced: never "wrong," "failed," "error" in kid-facing text

---

## Roadmap: What's Next

### Near-Term (Post-Hackathon)

- **Performance:** Bundle optimization, lazy-loading asset packs, mobile responsive layout
- **More zones:** The `/compose-task` command can generate a complete new zone in one session — story arc, characters, system prompt, cache entries, environment config
- **Multiplayer viewing:** Multiple kids watch the same scene play out, take turns describing
- **Progress persistence:** Local storage for stage completion, discovered vignettes, badges

### How Opus 4.6 Continues to Help

- **New zone creation:** 7-SME pipeline (story-writer → character-director → prompt-writer → ece-professor → child-game-design → 3d-game-development → 3d-scale-tester) generates a complete zone from a one-line concept
- **Cache generation:** Automated golden response generation for new zones ensures instant demos
- **Content review at scale:** ECE Professor + child-game-design SMEs audit all kid-facing text as the game grows
- **Vocabulary expansion:** As new asset packs are added, the vocabulary contract updates automatically and Claude can reference the new props immediately

The `.claude/` orchestration system means expanding the game is a conversation, not a rewrite. Each new zone follows the same proven pipeline that built the first seven.

---

<p align="center">
  Built solo by Drew for the <strong>Built with Opus 4.6 — Claude Code Hackathon</strong> (Feb 10-16, 2026)<br/>
  <a href="https://github.com/DrewWasem/kids_ai_game">GitHub</a> · <a href="https://quest-ai-smoky.vercel.app/">Live Demo</a>
</p>
