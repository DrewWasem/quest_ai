# CLAUDE.md

## Project

Prompt Quest: AI-powered 3D game teaching kids (ages 7-11) descriptive thinking through play.
Built with Opus 4.6 for the Claude Code Hackathon (Feb 10-16, 2026).
Solo developer: Drew.

## Tech Stack

- React + TypeScript + Vite (UI layer)
- React Three Fiber + Drei (3D game engine)
- Three.js (rendering, animation, post-processing)
- Zustand (state management)
- Claude API via Opus 4.6 (scene script generation)
- Tailwind CSS (styling)
- Fredoka + Nunito (Google Fonts for kid-friendly typography)
- Vercel (deployment)

## Architecture

React owns UI state (Zustand). R3F Canvas renders the 3D village world. ScenePlayer3D executes scene scripts.
Claude API returns scene scripts referencing ONLY assets in the vocabulary contract.
Pre-built 3D asset library (KayKit, Kenney, Tiny Treats) — R3F assembles pre-loaded GLTFs, never generates at runtime.
Golden Response Cache: 166 pre-computed Opus responses served instantly during demo.

### Village World
- Persistent hex-tile medieval village with quest zones
- 2 quest zones: skeleton-birthday (Z=-16), adventurers-picnic (Z=+16)
- Village center with buildings, road, decorations
- Zone markers (glowing pillars) for navigation
- Smooth camera transitions between village and zones

### Three-Tier Response System
1. **Tier 1 — Cache** (instant): exact or fuzzy match from 166 pre-generated responses
2. **Tier 2 — Live API** (1-8s): call Claude with 6s timeout, cache the result
3. **Tier 3 — Fallback** (instant): pre-written generic response, demo never errors

### Input Modes
- **Mad Libs** (Levels 1-3): structured fill-in-the-blank per quest stage
- **Free Text** (Levels 4-5): open-ended description input
- **Voice Input**: optional speech-to-text via Web Speech API

## 7 Quest Tasks

| # | Task | Characters | Zone |
|---|------|-----------|------|
| T1 | Skeleton's Surprise Birthday | Skeleton + Adventurers | skeleton-birthday |
| T2 | Knight's Space Mission | Knight, SpaceRanger | — |
| T3 | Mage vs. Kitchen | Mage, Witch | — |
| T4 | Barbarian's School | Barbarian + all | — |
| T5 | Dungeon Rock Concert | All + Skeleton + Clown | — |
| T6 | Skeleton Pizza Delivery | Skeletons | — |
| T7 | Adventurers' Picnic | All 5 Adventurers | adventurers-picnic |

## Commands

```bash
cd frontend && npm run dev    # Start dev server on port 5175
cd frontend && npm run build  # Production build (0 TS errors)
npm run preview               # Preview production build
vercel --prod                 # Deploy to Vercel
```

## Key Files

- `frontend/src/App.tsx` — Main app with header, canvas, input panel
- `frontend/src/game/VillageWorld.tsx` — Persistent hex village with zones
- `frontend/src/game/VillageCamera.tsx` — Camera controller with zone transitions
- `frontend/src/game/ScenePlayer3D.tsx` — 3D action executor (~1000 lines)
- `frontend/src/game/Character3D.tsx` — KayKit character with SkeletonUtils clone
- `frontend/src/game/Prop3D.tsx` — GLTF prop component with bounce entrance
- `frontend/src/game/AnimationController.ts` — Shared animation system (139 clips)
- `frontend/src/game/SoundManager3D.ts` — OGG audio + synthesized fallbacks (470 lines)
- `frontend/src/game/R3FGame.tsx` — R3F canvas with VillageCamera + VillageWorld
- `frontend/src/components/PromptInput.tsx` — Free-text input + TTS + result display
- `frontend/src/components/MadLibsInput.tsx` — Structured Mad Libs input
- `frontend/src/stores/gameStore.ts` — Zustand store (zones, tasks, badges, stages)
- `frontend/src/data/demo-cache.json` — 166 golden cache entries
- `frontend/src/data/quest-stages.ts` — Quest stage definitions (5 levels per zone)
- `frontend/src/prompts/*.ts` — System prompts per task

## Assets

- **3D Models**: 4,270+ GLTFs (KayKit, Kenney, Tiny Treats, Poly Pizza, FoodMegaPack)
- **Characters**: 28 GLBs with shared Rig_Medium skeleton
- **Animations**: 8 GLBs containing 139 clips
- **Audio**: 665 OGGs (Kenney) + synthesized fallbacks
- **PROP_PATHS**: 2,186 registered entries in ScenePlayer3D.tsx
- **Location**: `frontend/public/assets/3d/` and `frontend/public/assets/audio/`

## Scene Script Format

```json
{
  "success_level": "FULL_SUCCESS | PARTIAL_SUCCESS | FUNNY_FAIL",
  "narration": "One fun sentence (under 20 words)",
  "actions": [
    { "type": "spawn", "actor": "skeleton", "position": "left" },
    { "type": "move", "actor": "skeleton", "to": "center", "style": "arc" },
    { "type": "animate", "actor": "skeleton", "anim": "Cheering" },
    { "type": "emote", "actor": "skeleton", "emoji": "happy" },
    { "type": "react", "effect": "confetti-burst", "position": "center" }
  ],
  "prompt_feedback": "Concrete game advice for the child"
}
```

## Rules

- NEVER reference an asset not in the vocabulary contract
- Scene scripts max 8 actions
- All Claude API calls use model: `claude-opus-4-6`
- NEVER use "prompt" in kid-facing text — say "description" or "plan"
- NEVER use red for failure — use yellow/orange for funny fails
- Narrations: max 20 words, present tense, 1 exclamation max
- Failure = comedy — funny fails must be funnier than success
- Every failure mode must have a fallback — demo never shows an error screen
- TypeScript strict mode

## Commit Convention

All commits must use a prefix: FEAT, FIX, ENH, PERF, REFACTOR, TEST, DOC, STYLE, CHORE, WIP

## Environment

- `VITE_ANTHROPIC_API_KEY` — Claude API key (set in .env, never commit)

See `.env.example` for all variables.
