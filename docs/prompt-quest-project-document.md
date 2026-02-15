# Prompt Quest — Project Document

**Builder:** Drew (solo)
**Hackathon:** Built with Claude Opus 4.6 (Feb 10-16, 2026)
**Status:** Phases 1-3 Complete — Free Play Zone Next

---

## 1. What Is Prompt Quest?

Prompt Quest is a 3D game that teaches kids (ages 8-10) prompt engineering through play. Kids explore a medieval village, enter quest zones, and solve comedy puzzles by describing what should happen. Claude interprets their description and brings it to life with 3D characters, props, and animations. Better prompts produce richer, funnier scenes.

The AI is invisible. Kids think they're playing a game. They're actually learning specificity, completeness, sequencing, and creativity — the core skills of effective AI communication.

```
Kid types: "Throw a giant birthday cake with balloons, presents, and a dance party"
  → Claude Opus 4.6 evaluates the prompt against a vocabulary contract
  → 3D scene assembles: cake spawns, balloons float in, skeleton dances, confetti bursts
  → Feedback: "Amazing! You described the cake, decorations, AND a celebration!"
```

**The Goal:** One perfect interaction that makes a kid smile. They type something creative, Claude interprets it, a 3D scene comes alive, and the kid laughs. Everything else is in service of that moment.

---

## 2. How Does It Work?

### The Game Loop

1. **Explore** — Kids walk through a 3D medieval village (WASD/arrow keys, Shift to run)
2. **Enter a Quest Zone** — Walk to a glowing zone marker, camera flies in, intro plays
3. **Fill in the Prompt** — Stages 1-3 use mad-lib dropdowns; Stage 4 is hybrid free text; Stage 5 is full open prompt
4. **Watch the Scene** — 3D characters and props come to life based on the kid's input
5. **Get Feedback** — Concrete game advice explaining why the scene worked (or didn't)
6. **Progress** — Complete stages to unlock harder ones, eventually graduating to full prompt mode

### The Response System

Every kid input flows through a multi-tier resolver:

| Tier | Method | Speed | When Used |
|------|--------|-------|-----------|
| **Vignette** | Pre-built scene matched by mad-lib tags | <1ms | Stages 1-3 (mad-libs) |
| **Live API** | Claude Opus 4.6 generates scene script | 1-8s | Stages 4-5 (free text/full prompt) |
| **Fallback** | Pre-written safe default | Instant | API timeout or error |

For Stages 1-3, the system never calls the API. Every tag combination maps to a hand-authored vignette — a pre-built sequence of spawn, move, animate, emote, and SFX actions. The kid sees an instant result every time.

For Stages 4-5, Claude generates a scene script in real-time. The system prompt includes an exhaustive whitelist of every character, prop, animation, and effect the game can render. Claude never hallucinates assets that don't exist.

### Scene Script Format

Claude (or the vignette system) returns a JSON scene script:

```json
{
  "success_level": "FULL_SUCCESS",
  "narration": "The skeleton's birthday party explodes with joy!",
  "actions": [
    { "type": "spawn", "actor": "skeleton_warrior", "position": "center" },
    { "type": "spawn", "actor": "cake_birthday", "position": "left" },
    { "type": "move", "actor": "cake_birthday", "to": "center", "style": "arc" },
    { "type": "animate", "actor": "skeleton_warrior", "anim": "Cheering" },
    { "type": "react", "effect": "confetti-burst", "position": "center" },
    { "type": "sfx", "sound": "bell" }
  ],
  "prompt_feedback": "You described the cake AND the celebration — great specificity!"
}
```

ScenePlayer3D executes these actions sequentially, loading GLTF models, applying skeletal animations, spawning particle effects, and playing audio — all in real-time 3D.

---

## 3. Core Architecture

### Tech Stack

| Layer | Technology | Role |
|-------|-----------|------|
| UI | React 18 + TypeScript + Tailwind CSS | Components, styling, layout |
| 3D Engine | React Three Fiber + Drei + Three.js | 3D rendering, GLTF loading, animations |
| Post-Processing | @react-three/postprocessing | Bloom, vignette, visual effects |
| State | Zustand | Game state, zone navigation, progression |
| AI | Claude Opus 4.6 | Scene script generation (Stages 4-5) |
| Assets | KayKit + Tiny Treats + FoodMegaPack + JoyQuest | 4,270+ GLTF models, 254 emojis, 665 audio files |
| Audio | Web Audio API + SpeechSynthesis | Synthesized SFX, TTS narration, background music |
| Build | Vite 5 | Dev server, production bundling |
| Deploy | Vercel | Hosting |

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        App.tsx                           │
│   TitleScreen → LoadingScreen → R3FGame + UI Panels     │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
┌────────v────────┐ ┌────v─────┐ ┌───────v────────┐
│  VillageWorld   │ │ScenePlayer│ │   UI Layer     │
│  (Hex terrain,  │ │    3D     │ │ MadLibsInput   │
│   7 zones,      │ │ (Actions, │ │ Level4Input    │
│   buildings,    │ │  actors,  │ │ Level5Input    │
│   decorations)  │ │  props,   │ │ FeedbackCard   │
│                 │ │  effects) │ │ BadgeToast     │
└────────┬────────┘ └────┬─────┘ └───────┬────────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
              ┌──────────v──────────┐
              │    Zustand Store    │
              │ (gameStore.ts)      │
              │ Zone nav, stages,   │
              │ progression, badges │
              └──────────┬──────────┘
                         │
              ┌──────────v──────────┐
              │  Response Resolver  │
              │ Vignette → API →    │
              │ Fallback            │
              └─────────────────────┘
```

### Key Files

| File | Lines | Purpose |
|------|-------|---------|
| `game/ScenePlayer3D.tsx` | 4,455 | 3D scene renderer, action executor, position system |
| `game/VillageWorld.tsx` | 2,020 | Hex terrain, 7 quest zones, buildings, decorations |
| `data/quest-stages.ts` | 2,120 | All 5 stage types across 7 zones |
| `data/movement-templates.ts` | 598 | 53 reusable choreography patterns |
| `data/blocking-templates.ts` | 594 | Theater-style staging functions |
| `data/asset-manifest.ts` | 546 | Character roster, animation packs, prop paths |
| `stores/gameStore.ts` | 416 | Zustand state: zones, progression, badges, camera |
| `services/vignette-resolver.ts` | 321 | 5-priority tag matching for mad-lib combos |
| `data/zone-props.ts` | 200+ | Zone-specific prop palettes (588 props across 7 zones) |
| `game/SoundManager3D.ts` | 200+ | 24 SFX categories, 8 zone music tracks, synthesis fallback |
| `game/AnimationController.ts` | 168 | 139 shared skeletal animations across 8 packs |
| `data/vignettes/*.ts` | 23,334 | ~476 pre-built vignettes across 7 zone files |

### The Village World

The game takes place in a persistent 3D medieval village built on a hex-tile grid. Seven quest zones are arranged in a ring around a central village area with a tavern, market, and well.

```
Village Circle (top-down):
  North:     Skeleton's Birthday  [0, 0, -70]
  NE:        Knight's Space       [38, 0, -38]
  East:      Barbarian School     [48, 0, 5]
  SE:        Skeleton Pizza       [38, 0, 38]
  South:     Adventurers' Picnic  [0, 0, 48]
  SW:        Dungeon Concert      [-35, 0, 35]
  West:      Mage Kitchen         [-48, 0, 5]
  NW:        (Empty — future Free Play zone)
  Center:    Village (tavern, market, well)
```

Each zone has themed buildings (castle, tower, shrine), colored landmarks, and environmental decorations. When a player walks into a zone, the camera flies in, an intro script plays, and the quest UI appears.

### Character System — 28 Characters, 139 Animations

All characters share the KayKit Rig_Medium skeleton. Character GLB files contain only mesh and skeleton — no embedded animations. Animations are loaded separately from 8 shared packs:

| Pack | Clips | Examples |
|------|-------|---------|
| General | 15 | Idle_A, Idle_B, Death_A, Interact, Spawn, Throw |
| Movement Basic | 11 | Walking_A/B/C, Running_A/B, Jump variants |
| Movement Advanced | 13 | Crawling, Crouching, Climbing |
| Combat Melee | ~15 | Slash, Block, Kick |
| Combat Ranged | ~10 | Shoot, Aim |
| Simulation | ~15 | Sitting, Waving, Cheering, Dancing |
| Special | ~10 | Skeletons_Awaken, Skeletons_Taunt |
| Tools | ~10 | Chop, Dig, Hammer, Fishing |

Character roster includes: 8 core adventurers (knight, barbarian, mage, ranger, rogue, druid, engineer, rogue_hooded), 6 skeletons (warrior, mage, rogue, minion, golem, necromancer), and 14 bonus characters (space_ranger, ninja, clown, robot, witch, vampire, superhero, caveman, and more).

### Sound System

Dual audio strategy:
- **Kenney audio packs** (665 OGG files) for high-quality SFX and background music
- **Web Audio API synthesis** as fallback if files fail to load

24 SFX categories (spawn, move, react, footstep, impact, magic, cooking, explosion, laser, etc.), 8 zone-specific background music tracks, and volume controls for SFX/music independently.

### Position System

A 15-mark theater grid provides consistent stage positioning across all zones:

```
Upstage (far):    us-far-left  us-left  us-center  us-right  us-far-right
Center stage:     cs-far-left  cs-left  cs-center  cs-right  cs-far-right
Downstage (near): ds-far-left  ds-left  ds-center  ds-right  ds-far-right
```

All positions are zone-relative — rotated by zone angle to face the village center. This means the same vignette choreography works at any zone position in the world.

---

## 4. The 7 Quests — Educational Design

### Zone Overview

| Zone | Theme | Skill Taught | Vignettes | Grade |
|------|-------|-------------|-----------|-------|
| Skeleton's Birthday | Birthday party planning | Specificity | 72 | A- |
| Knight's Space Mission | Space station emergency | Sequencing | 64 | A+ |
| Mage vs. Kitchen | Cooking catastrophe | Cause & Effect | 42 | A |
| Barbarian's School Day | Monster recess | Audience/Characters | 41 | A |
| Dungeon Rock Concert | Dungeon escape comedy | Completeness | 69 | A |
| Skeleton Pizza Delivery | Pizza kitchen chaos | Constraints | 64 | B+ |
| Adventurers' Picnic | Forest mystery | Creativity | 69 | A+ |

### 5-Stage Progression System

Each zone follows the same 5-stage progression, scaffolding from structured selection to full creative freedom:

**Stage 1 — Basic Mad Libs (3 slots)**
- Template: "Plan a party with {FOOD} and {ENTERTAINMENT} for a {VIBE} birthday"
- 3 dropdown slots, each with 6 options
- Goal: Learn WHO + WHAT = good prompt
- Result: Instant vignette playback

**Stage 2 — Advanced Mad Libs (5 slots)**
- Adds SIZE and MOOD modifiers
- Goal: Learn that detail (modifiers) changes the outcome
- Includes vague vs. specific comparison in feedback

**Stage 3 — Combo Discovery (4 slots)**
- Goal: Discover N unique vignettes through creative combinations
- Progressive hints unlock: "What happens when magic meets explosions?"
- Secret combos reward exploration

**Stage 4 — Hybrid Free Text**
- Character dropdown + free text field (50 char max)
- Input sent to Haiku for tag parsing, matched to closest vignette
- 3 successes unlock Level 5
- Goal: Transition from selection to writing

**Stage 5 — Full Prompt Graduation**
- Open text field, no constraints
- Input sent to Claude Opus 4.6 with zone-specific vocabulary contract
- Claude returns scene script + prompt analysis + feedback
- Goal: Full creative freedom with live AI feedback

### Educational Pipeline: Novice to Expert

The progression is designed around Piaget's Concrete Operational stage (ages 8-10):

| Stage | Input | Cognitive Skill | Prompt Skill |
|-------|-------|----------------|-------------|
| 1 | 3 dropdowns | Selection | WHO + WHAT + VIBE |
| 2 | 5 dropdowns | Multi-dimensional thinking | Add SIZE + MOOD (precision) |
| 3 | 4 dropdowns | Combinatorial creativity | Discover secret combos |
| 4 | Dropdown + text | Prose composition | Describe in own words |
| 5 | Full text | Open-ended creation | Full prompt from scratch |

### Feedback System

Every vignette includes structured feedback:

```typescript
feedback: {
  title: 'PERFECT PARTY!',
  message: "You planned an amazing birthday! You said WHAT food and WHAT entertainment.",
  skillTaught: 'Specificity',
  tip: 'Great prompts answer WHO, WHAT, WHERE, and HOW — you nailed it!',
  vagueComparison: {
    vagueInput: 'Have food and entertainment',
    vagueResult: 'Generic party with no specific details'
  }
}
```

Pedagogical pattern:
1. **Celebrate** — "You planned an amazing birthday!"
2. **Explain what worked** — "You said WHAT food and WHAT entertainment"
3. **Teach the principle** — "When you're specific, everything comes together"
4. **Concrete tip** — "Great prompts answer WHO, WHAT, WHERE, and HOW"

All feedback stays concrete, never abstract. "Your shelter didn't have walls" (good) vs. "Good prompts cover the whole problem" (too abstract for 8-year-olds).

### Vocabulary Contract — Preventing AI Hallucination

A 3-layer system ensures Claude never references assets that don't exist:

1. **World Config Whitelist** — Each zone defines exact asset names in `characters`, `props`, `animations`, `effects` arrays
2. **System Prompt Instruction** — "ONLY use assets from the lists above — NEVER invent asset names"
3. **Runtime Validation** — ScenePlayer3D checks if asset exists before loading; unknown assets are skipped gracefully

### Vignette Architecture

Each vignette follows a 5-beat story structure:

```
Beat 1: SETUP     — Narrator introduction + character entrances
Beat 2: INTENT    — Character dialogue with pixel-art emotes
Beat 3: ACTION    — Movement, prop interactions, zone SFX
Beat 4: CONSEQUENCE — Emotional reactions, outcome reveals
Beat 5: RESOLUTION — Celebration/disappointment + narrator tip
```

Scene complexity scales with prompt quality:

| Quality | Characters | Props | Movement | Effects | Duration |
|---------|-----------|-------|----------|---------|----------|
| Default/vague | 1-2 | 1-2 | Spawn in place | 1 basic | ~5s |
| Partial match | 2-3 | 2-4 | Walk on + 1 move | 2-3 | ~8s |
| Perfect match | 3-4 | 3-6 | Full entrances + dialogue | 4+ with impact | ~12s |
| Secret combo | 4+ | 5+ | Chase + scatter + flee | 5+ cascading | ~15s |

Kids SEE the difference — vague prompts produce boring scenes, specific prompts produce spectacular ones. The learning is visceral, not text-based.

---

## 5. Assets

### Asset Sources

| Source | License | Assets | Used For |
|--------|---------|--------|----------|
| KayKit (Kenney.nl) | CC0 (Public Domain) | 4,270+ GLTF models | Characters, buildings, terrain, props |
| Tiny Treats | CC0 | 200+ food models | Birthday cakes, pizza, bakery items |
| FoodMegaPack | CC0 | 173 GLB models | Expanded food variety across 14 categories |
| JoyQuest 2.0 | Licensed | 254 PNGs | Pixel-art emoji emotes (127 outline + 127 bubble) |
| Kenney Audio | CC0 | 665 OGG files | SFX, background music, UI sounds |
| Medieval Hexagon Pack | CC0 | 100+ hex tiles | Village terrain (grass, road, water, coast) |

### Asset Utilization

From the Day 5 audit:
- **7,834 total asset files** on disk
- **2,186 props registered** in asset-manifest.ts
- **588 zone-specific props** mapped in zone-props.ts
- **61 named emotions** mapped to JoyQuest emoji PNGs
- **24 SFX categories** registered in SoundManager3D

### Movement Templates

53 reusable choreography building blocks that compose into vignettes:

| Template | Purpose |
|----------|---------|
| `ENTER_FROM_LEFT(char, pos)` | Character walks in from left wing |
| `ENTER_FROM_RIGHT(char, pos)` | Character walks in from right wing |
| `CHARGE_IN_LEFT(char, pos)` | Running entrance from left |
| `DROP_IN(char, pos)` | Teleport from above |
| `CHARACTER_SPEAK(char, emote, text)` | Dialogue with pixel-art emote |
| `NARRATOR(text)` | Narration text popup |
| `CELEBRATION(chars, pos)` | Group cheer sequence |
| `OBJECT_GROW_REVEAL(asset, pos)` | Dramatic prop reveal |
| `EMOTIONAL_REACT(char, emotion)` | Character emotional reaction |

The wow-factor audit found a **100% correlation** between movement template adoption and vignette quality: zones using templates averaged 4.2/5, those without averaged 3.2/5.

---

## 6. Journey to MVP — Pivots and Decisions

### Day 1 (Feb 10) — Foundation

**What was built:**
- React + TypeScript + Vite project scaffold
- Phaser 3 game engine embedded in React via EventBus bridge
- Claude API client with 6-second timeout
- First system prompt with vocabulary contract
- Golden Response Cache with fuzzy keyword matching
- Monster Birthday Party as the first playable scene
- 13 Kenney asset packs downloaded (5,161 PNG files)

**Key decision:** Used direct `fetch()` for Claude API instead of `@anthropic-ai/sdk` to avoid Node.js polyfill issues in the browser.

### Day 2 (Feb 11) — The 3D Pivot

**MAJOR ARCHITECTURAL SHIFT: Phaser 2D → React Three Fiber 3D**

This was the biggest pivot of the project. The original plan was a 2D Phaser game with sprite-based scenes. On Day 2, the decision was made to go full 3D with React Three Fiber.

**Why the pivot:**
- KayKit's 4,270+ GLTF models provided a massive free 3D asset library
- 28 character models with 139 shared skeletal animations offered far richer scene possibilities
- R3F integrates natively with React (no EventBus bridge needed)
- A persistent 3D village world creates more immersive exploration than a 2D card grid

**What changed:**
- Replaced Phaser canvas with R3F Canvas
- Created VillageWorld.tsx — persistent medieval village with 1,000+ hex tiles and 12 buildings
- Created ScenePlayer3D.tsx — 3D scene executor replacing Phaser's SceneScriptPlayer
- Created AnimationController.ts — shared skeletal animation system
- Created VillageCamera.tsx — smooth camera transitions (2s ease-out cubic)

**Critical bug encountered:** KayKit buildings at default scale were too small (0.4-1x character height instead of 2-8x). Created measurement tools (`tests/measure-assets.mjs`, `tests/generate-scales.mjs`) and a 3D Scale Tester SME to systematically fix proportions.

**Outcome:** 28 character GLBs, 8 animation packs, 4,270+ prop models deployed. Village renders with zones, camera navigation works. Build: 655 modules, 1,295 kB JS.

### Day 2 (continued) — The Village World Decision

**Before:** Isolated per-task 3D scenes. Each quest was its own disconnected environment.

**After:** Persistent medieval village world. The village is always rendered with hex terrain, buildings, and zone markers. Quest zones are areas within the village that the camera flies to.

**Why:** Persistent world creates spatial memory — kids remember where things are. Walking between zones builds anticipation. The village itself tells a story.

### Days 3-4 — Game Juice and Atmosphere

Added per-quest atmospheric effects (fog, sky color, sparkle particles, bloom, contact shadows), fog walk-through intro on quest entry, TTS narration, voice input, synthesized SFX via Web Audio API, and the zone intro system with hero character reveals.

### Day 5 (Feb 14) — The Content Explosion

This was the most productive day — six distinct sessions running in a single day:

**Session 1: Mad-Libs Pivot**

**MAJOR EDUCATIONAL SHIFT: Free text → Mad-libs scaffolding**

The original design had kids typing free text at all levels. The research found this was too hard for 8-year-olds — they'd stare at a blank text field, not knowing what to write. The mad-libs system (dropdown slots with pre-set options) was introduced as scaffolding:

- Stages 1-3 use mad-lib templates with dropdown options
- Each tag combination maps to a hand-authored vignette
- No API call needed — instant playback
- Progressive complexity: 3 slots → 5 slots → combo discovery

This pivot solved two problems: (1) kids always know what to do, and (2) the demo never depends on API availability.

**Session 2: Asset Mega-Integration**

Deployed FoodMegaPack (173 GLB models), JoyQuest 2.0 emoji pack (254 PNGs), and expanded PROP_PATHS from 152 to 455+ entries. Upgraded emote rendering from Unicode emoji to pixel-art bubble images. Created semantic emotion mapping (61 named emotions like "proud", "mischievous", "confused" mapped to specific pixel-art PNGs).

**Session 3: Level 4/5 Implementation**

Implemented the hybrid free-text (Stage 4) and full prompt graduation (Stage 5) systems. Created the text parser that sends free text to Haiku for tag extraction, and the Level 5 system prompt with zone-specific vocabulary contracts.

**Model strategy:** Haiku for Level 4 parsing (fast, cheap), Sonnet for Level 5 scene generation (not Opus — cost management for live API calls).

**Session 4: Vignette Overhaul**

The 13-phase vignette overhaul:
1. Emotion expansion (41 → 61 named emotions)
2. Sound expansion (9 → 24 SFX categories)
3. Movement template library (37 new reusable patterns)
4. 5-beat story structure design
5. Zone prop mapping (588 props across 7 zones)
6-12. All 7 zone vignette files rewritten using parallel agents
13. Build verification

**8 parallel agents** dispatched to rewrite all 476 vignettes simultaneously. Fixed 58 type errors from agent mistakes (composeBlocking misuse, wrong function signatures, unused imports).

### Day 6 (Feb 15) — Quality Audit and Roadmap

Conducted comprehensive wow-factor audit of all ~476 vignettes using 7 parallel agents. Key finding: **100% correlation between movement template adoption and wow factor** (4.2/5 vs 3.2/5). Created new post-hackathon roadmap focused on closing the quality gap.

---

## 7. How Claude Opus 4.6 Built This

### The Development Model

This entire project was built by one person (Drew) using Claude Opus 4.6 as the primary development partner. Claude didn't just answer questions — it was the architect, implementer, tester, and content creator.

### The Claude Code Infrastructure

Drew built a meta-workflow system — using Claude to build tooling that makes Claude more effective at building the actual game:

#### Skills (32 total)

Skills are reusable capabilities that Claude can invoke:

| Skill | Purpose |
|-------|---------|
| **Conductor** | Orchestration engine — routes tasks through Research → Plan → Implement |
| **Research** | Coordinate parallel agents to investigate codebase |
| **Remember/Recall** | Persistent cross-session memory |
| **Planning** | Transform research into executable implementation plans |
| **SME** | Dispatch domain expert sub-agents |
| **Compose-Task** | Full SME pipeline for creating new game content |
| **Review-Content** | Educational and brand SME review |
| + 20 R3F/Three.js skills | Domain-specific 3D development capabilities |

#### Agents (11 total)

Agents run in isolated contexts to preserve the parent context window:

| Agent | Role |
|-------|------|
| **Codebase Researcher** | Find files and component structure (read-only) |
| **Codebase Analyzer** | Trace code paths and data flow in depth |
| **Memory Locator** | Fast search of the memory tree |
| **Memory Writer** | Write/update memory entries with dedup |
| **Plan Architect** | Design implementation plans with verification criteria |
| **Implementer** | Execute plan tasks precisely, stop on mismatches |
| **Reviewer** | Two-pass review: spec compliance then code quality |
| **Content Auditor** | Validate brand voice and asset references |
| **Context Session Auditor** | Analyze context usage, recommend transfers |
| **Session Transfer** | Extract knowledge for session handoffs |
| **Session Transfer Auditor** | Post-transfer verification |

#### Subject Matter Experts (7 SMEs)

SMEs are domain specialists with full knowledge bases:

| SME | Domain | Purpose |
|-----|--------|---------|
| **Child Game Design** | Games for ages 7-11 | Review kid-facing text, UI, brand voice |
| **Story Writer** | Narrative, humor, age-appropriate writing | Write narration, task intros |
| **Character Director** | Character casting, animations, personality | Assign characters to vignettes |
| **ECE Professor** | Early childhood education (ages 7-11) | Final review gate for kid-facing content |
| **Prompt Writer** | Claude API prompts, system prompts | Review system prompts |
| **3D Game Development** | 3D scenes, models, camera, lighting | Architecture guidance |
| **3D Scale Tester** | Measuring/adjusting 3D model proportions | Scale verification |

Each SME has a YAML config, system prompt, and knowledge directory with domain-specific constraints, heuristics, ontology, and examples.

#### Hooks (5 automated triggers)

| Hook | Trigger | Purpose |
|------|---------|---------|
| Session Start Recall | New session | Auto-inject last session context, preferences, decisions |
| Pre-Compact Remember | Before compaction | Save structured state before context compression |
| Post-Compact Recall | After compaction | Re-inject key context after compression |
| Stop Remember Nudge | Every response | Nudge memory save every 30 messages |
| Context Guardian | Before new work | Block at ~65% context, auto-save state |

#### Persistent Memory System

A hierarchical knowledge tree at `.claude/memory/` with 53 entries across 8 domains:

```
.claude/memory/
├── decisions/     — Architecture choices (village world, asset sourcing)
├── patterns/      — Reusable solutions (auto-spread, movement templates)
├── bugs/          — Root causes and fixes
├── preferences/   — User workflow preferences
├── context/       — Project architecture, domain knowledge (9 entries)
├── sessions/      — Auto-generated session summaries (13 entries)
├── research/      — Codebase research documents (3 entries)
└── plans/         — Implementation plans (18 entries, 1 completed)
```

Memory persists across sessions. Each new session starts by reading the memory tree to recover context from previous work.

### The Conductor Protocol

The conductor skill is the orchestration engine. Before any non-trivial task, it runs an assessment:

**Orchestrate when ANY of these are true:**
- Task touches 3+ files
- Multiple valid approaches exist
- Task involves architectural decisions
- More than ~50 lines of new code

**Workflow:**
1. **Research** — Parallel agents investigate codebase and memory
2. **Plan** — Design phased approach with atomic tasks and verification
3. **Implement** — Execute one phase at a time, verify each task
4. **Validate** — Independent verification of all success criteria
5. **Remember** — Persist decisions, patterns, bugs

**Anti-rationalization check:** The conductor includes a table of common shortcuts ("This is simple, I'll just...") with the reality check ("If it touches 3+ files, it's not simple. Orchestrate.").

### Parallel Agent Orchestration

The most powerful pattern: dispatching multiple agents simultaneously. Examples from this project:

- **Vignette rewrite:** 8 agents rewrote all 7 zone vignette files in parallel (~23,000 lines of content)
- **Quality audit:** 7 agents audited all 476 vignettes in parallel
- **Research:** 4 agents researched architecture, journey, tooling, and education simultaneously

Agents run in isolated context windows. Only final results enter the parent context. This prevents context window overflow while enabling massive parallel work.

### How Opus 4.6 Accomplished the MVP

1. **Architecture:** Designed the 3D village world, scene script format, vignette system, and stage progression
2. **Implementation:** Wrote the core game engine (ScenePlayer3D, VillageWorld, AnimationController, SoundManager3D)
3. **Content:** Authored 476 vignettes across 7 zones with educational feedback
4. **Testing:** Created stress tests, visual regression tests, edge case coverage
5. **Iteration:** Performed quality audits and identified improvement priorities
6. **Infrastructure:** Built the skill/agent/SME/hook/memory framework for sustainable development
7. **Documentation:** Generated analysis reports, roadmaps, and project documentation

---

## 8. What Was Accomplished

### By the Numbers

| Metric | Count |
|--------|-------|
| Quest zones | 7 |
| Vignettes | 476 |
| Characters | 28 |
| Skeletal animations | 139 |
| 3D prop models | 4,270+ |
| Registered props | 2,186 |
| Zone-specific props | 588 |
| Movement templates | 53 |
| Named emotions | 61 |
| SFX categories | 24 |
| Audio files | 665 |
| Emoji assets | 254 |
| Lines of vignette content | 23,334 |
| TypeScript errors | 0 |
| Build modules | 679 |
| Bundle size (gzip) | ~769 kB |

### Feature Completeness

- 7 playable 3D quest zones with themed environments
- 5-stage progression per zone (mad-libs → free text → full prompt)
- Persistent 3D village world with hex terrain and zone navigation
- 28 animated characters with crossfade animation system
- Pre-built vignette system with instant playback
- Live Claude API integration for Stages 4-5
- Vocabulary contract preventing AI hallucination
- Synthesized SFX + background music per zone
- TTS narration with kid-friendly pacing
- Voice input (Chrome)
- Badge system for skill mastery
- Kid-friendly feedback with concrete game advice
- Error-tolerant scene player (bad assets never crash)
- Fallback scripts (demo never shows an error)

---

## 9. Constraints and Issues

### Constraints

| Constraint | Impact |
|-----------|--------|
| Solo developer | Every system designed, built, and tested by one person |
| 7-day hackathon | Forced prioritization — cut Magic Mode (5-7), Builder Mode (11-13), trophy room |
| Browser-only | No backend server — API calls from client, no database |
| CC0 assets only | All 3D models must be public domain (Kenney, KayKit) |
| Age 8-10 target | Feedback must be concrete, never abstract; no failure states |
| Demo reliability | Response system must work without API — vignettes + fallbacks |

### Issues Encountered

**1. 3D Model Scale Mismatches**
- KayKit buildings at default scale were comically small next to characters
- Solution: Created measurement tools and scale reference database; systematic scale audit per asset pack

**2. Asset Overlap in 3D Scenes**
- Characters and props spawning on top of each other
- Solution: Auto-spread occupancy system that detects overlaps and repositions entities

**3. Parallel Agent Type Errors**
- 8 agents rewrote 476 vignettes simultaneously — agents don't verify function signatures
- 58 type errors from misusing movement template APIs (wrong arg counts, missing parameters)
- Solution: Always run `npx tsc --noEmit` after parallel agent work; documented pitfalls in memory

**4. Movement Template Adoption Gap**
- Zones without movement templates scored 3.2/5; zones with them scored 4.2/5
- Root cause: Some zones were written before templates existed
- Solution: Systematic template migration across all zones (COMPLETE — 100% adoption)

**5. Context Window Management**
- Large sessions exhaust Claude's context window mid-task
- Solution: Built context guardian hook (blocks at 65%), session transfer system, memory persistence, and post-compaction recall

**6. Free Text Too Hard for 8-Year-Olds**
- Original design: free text input at all levels
- Kids stare at blank text fields, not knowing what to write
- Solution: Mad-libs scaffolding (Stages 1-3) before free text (Stage 4-5)

---

## 10. Key Takeaways

### About Building with Opus 4.6

1. **Context is the bottleneck.** Every component of the Claude Code infrastructure (agents, memory, hooks, SMEs) optimizes for context preservation. Sub-agents isolate costs, memory persists knowledge, hooks automate injection, and the conductor prevents waste.

2. **Parallel agents are extremely powerful but need guardrails.** Dispatching 8 agents to rewrite 23,000 lines simultaneously is fast, but agents don't verify function signatures. Always run type checking after parallel work.

3. **The conductor discipline pays for itself.** The 5-minute planning step saves 30-minute redos. The anti-rationalization patterns catch real shortcuts.

4. **Persistent memory changes the game.** Session 12 knows what session 1 decided. Patterns documented on Day 2 prevent bugs on Day 5. Memory makes Claude a continuously improving development partner.

5. **SMEs add domain depth without context cost.** A story writer reviewing narration, an ECE professor validating age-appropriateness, a 3D specialist checking scale — all running as isolated subagents that return focused results.

### About the Game Design

1. **Mad-libs before free text.** Scaffolded input (dropdowns → free text → full prompt) matches cognitive development. Kids need structure before freedom.

2. **Show, don't tell.** Kids learn prompt engineering by seeing the difference between vague and specific prompts in a 3D scene — not by reading tips about prompting.

3. **Concrete feedback, never abstract.** "Your shelter didn't have walls" beats "Good prompts cover the whole problem" for 8-year-olds.

4. **Comedy covers failure.** FUNNY_FAIL means the kid's bad prompt produces a hilarious scene, not an error. The skeleton trips over a tiny cake. The barbarian accidentally breaks the desk. Failure is funnier than success.

5. **Movement templates = wow factor.** Characters entering from offstage, speaking with pixel-art emotes, chasing each other, and celebrating together — this choreography is what makes scenes feel alive. Static spawns feel dead.

---

## 11. Roadmap — What's Next

> Full roadmap at `docs/ROADMAP.md`

### Phase 1: Vignette Wow Factor — COMPLETE

All 7 zones migrated to 53 movement templates with 100% adoption. 12 new template types added, 1,500+ template spreads across all vignettes. Quality gap closed: all zones now A- or above.

### Phase 2: Asset Utilization — COMPLETE

- Emotion expansion: 41 → 61 named emotions, 151 Unicode emojis migrated to semantic names
- Prop diversification: ~200 → ~380 unique props used in vignettes (+90%)
- Auto-trigger SFX: engine-level sounds for walk, magic, cooking, impact, attack animations

### Phase 3: Stage Verification — COMPLETE

- All 5 stages verified working for all 7 zones (code-level analysis)
- Text parser stop-word bug fixed
- ECE Professor review: 14 content safety fixes applied (zero flagged terms remaining)
- All fallback scripts and system prompts verified present

### Phase 4: Free Play Zone (Priority: Medium) — NEXT

Add an 8th zone at the empty Northwest position on the village circle.

| Aspect | Design |
|--------|--------|
| Zone ID | `free-play` |
| Theme | Creative Playground — all characters, all props, no wrong answers |
| Unlock | Available after completing any 3 zones |
| Stages | None — pure sandbox, always Level 5 style |
| Characters | All 28 character models available |
| Props | Full prop library (all 588+ zone props) |
| Scoring | No success/fail — everything is FULL_SUCCESS |
| Purpose | Reward for progression, unlimited creative expression |

### Phase 5: Final Polish (Priority: Low)

- Performance audit (bundle size, load times, memory)
- Mobile layout check (touch controls, responsive canvas)
- Accessibility pass (screen reader labels, color contrast)

### How Opus 4.6 Continues to Expand the Game

The infrastructure built during the hackathon — skills, agents, SMEs, memory, hooks — isn't just hackathon tooling. It's a **development platform** that makes every future session faster than the last:

1. **New zones** use `/compose-task` — the full SME pipeline (story-writer → character-director → prompt-writer → ece-professor) creates a complete zone with vignettes, feedback, and system prompts

2. **Quality improvements** use parallel agent dispatch — 7 agents can audit and rewrite all zones simultaneously, then validate with the reviewer agent

3. **New features** use the conductor workflow — research → plan → implement → validate, with memory persisting decisions and patterns across sessions

4. **Content review** uses SME experts — every kid-facing change goes through the child-game-design SME and ece-professor for age-appropriateness

5. **Session continuity** uses the memory tree — new sessions start by reading what previous sessions learned, maintaining a growing understanding of the codebase

The game will keep growing. The infrastructure ensures each session builds on the last, Claude gets smarter about this specific project over time, and the quality bar only goes up.

---

## 12. Success Metric

**Every zone scores 4.0+ wow factor. Every stage works end-to-end. Kids can free-play after beating 3 zones.**

And underneath it all: one kid types something creative, a 3D scene comes alive, and they laugh.

---

*Built solo in 6 days with Claude Opus 4.6. Daughter as inspiration and wife as advisor. 476 vignettes. 28 characters. 4,270 models. 23,334 lines of content. Zero TypeScript errors.*
