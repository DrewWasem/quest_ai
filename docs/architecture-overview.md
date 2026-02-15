# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (React + R3F)                     │
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌───────────────────┐  │
│  │  Mad Libs     │    │  Free Text   │    │   Voice Input     │  │
│  │  Input        │    │  Input       │    │   (Web Speech)    │  │
│  │  (Levels 1-3) │    │  (Levels 4-5)│    │                   │  │
│  └──────┬───────┘    └──────┬───────┘    └────────┬──────────┘  │
│         └──────────────┬────┘─────────────────────┘              │
│                        ▼                                         │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                   gameStore.submitInput()                    │ │
│  │                   (Zustand state manager)                   │ │
│  └──────────────────────────┬──────────────────────────────────┘ │
│                             ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │              THREE-TIER RESPONSE SYSTEM                     │ │
│  │                                                             │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐ │ │
│  │  │ Tier 1      │  │ Tier 2      │  │ Tier 3             │ │ │
│  │  │ CACHE       │→ │ LIVE API    │→ │ FALLBACK           │ │ │
│  │  │ 166 golden  │  │ Opus 4.6    │  │ 13 pre-written     │ │ │
│  │  │ responses   │  │ 6s timeout  │  │ scripts            │ │ │
│  │  │ (instant)   │  │ (1-8s)      │  │ (instant)          │ │ │
│  │  └─────────────┘  └─────────────┘  └────────────────────┘ │ │
│  └──────────────────────────┬──────────────────────────────────┘ │
│                             ▼                                    │
│                      Scene Script (JSON)                         │
│                             │                                    │
│  ┌──────────────────────────┴──────────────────────────────────┐ │
│  │                   ScenePlayer3D                             │ │
│  │                   (~4,500 lines)                            │ │
│  │                                                             │ │
│  │  Actions:  spawn │ move │ animate │ emote │ react │ sfx    │ │
│  │                                                             │ │
│  │  ┌────────────┐ ┌────────────┐ ┌──────────────────────┐   │ │
│  │  │ Character  │ │ Prop3D     │ │ Particle Effects     │   │ │
│  │  │ 3D (28     │ │ (2,186     │ │ (confetti, hearts,   │   │ │
│  │  │ models,    │ │ registered │ │  explosions, etc.)   │   │ │
│  │  │ 139 anims) │ │ props)     │ │                      │   │ │
│  │  └────────────┘ └────────────┘ └──────────────────────┘   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                             │                                    │
│  ┌──────────────────────────┴──────────────────────────────────┐ │
│  │                   R3F Canvas                                │ │
│  │  ┌─────────────────────────────────────────────────────┐   │ │
│  │  │              VillageWorld                            │   │ │
│  │  │  ┌───────────────────────────────────────────────┐  │   │ │
│  │  │  │  Hex Terrain (~1000 tiles)                    │  │   │ │
│  │  │  │  Village Center (buildings, road, decorations)│  │   │ │
│  │  │  │  Zone Markers (clickable glowing pillars)     │  │   │ │
│  │  │  │  Mountain Perimeter (backdrop)                │  │   │ │
│  │  │  └───────────────────────────────────────────────┘  │   │ │
│  │  │                                                      │   │ │
│  │  │  ┌──────────────────┐  ┌──────────────────────────┐ │   │ │
│  │  │  │ Dungeon Zone     │  │ Park Zone                │ │   │ │
│  │  │  │ Z = -16          │  │ Z = +16                  │ │   │ │
│  │  │  │ skeleton-birthday│  │ adventurers-picnic        │ │   │ │
│  │  │  └──────────────────┘  └──────────────────────────┘ │   │ │
│  │  │                                                      │   │ │
│  │  │  VillageCamera (smooth zone transitions, 2s cubic)  │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  │                                                             │ │
│  │  Atmosphere: fog, hemisphere light, sparkles, shadows,      │ │
│  │              bloom, vignette, contact shadows                │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Audio: SoundManager3D                                      │ │
│  │  665 OGG files + synthesized fallbacks                      │ │
│  │  Per-zone background music (loop + crossfade)               │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘

         ┌─────────────────────────────────┐
         │   Claude API (Opus 4.6)         │
         │                                 │
         │   System Prompt includes:       │
         │   - Task context + hook         │
         │   - Vocabulary contract         │
         │     (characters, props,         │
         │      animations, effects)       │
         │   - JSON schema                 │
         │   - Comedy calibration rules    │
         │                                 │
         │   Returns: SceneScript JSON     │
         └─────────────────────────────────┘
```

## Data Flow

```
1. INPUT
   Kid types: "skeleton juggles three birthday cakes"
              │
2. RESOLVE    ▼
   gameStore.submitInput() → resolveResponse(task, input)
              │
3. CACHE      ▼
   Check demo-cache.json (166 entries, exact + fuzzy match)
   Hit? → return cached script
   Miss? ↓
              │
4. API        ▼
   Build system prompt from worlds.ts (vocabulary contract)
   Call Claude Opus 4.6 with 6s timeout
   Parse JSON, validate schema, verify asset names
   Cache result for future use
   Timeout? ↓
              │
5. FALLBACK   ▼
   Return pre-written fallback script for this task
              │
6. EXECUTE    ▼
   ScenePlayer3D receives SceneScript
   For each action (sequentially with timing):
     spawn  → load GLTF, place at position, play entrance anim
     move   → tween interpolation (linear/arc/bounce)
     animate → set skeletal animation clip on character
     emote  → show Kenney pixel-art bubble above character
     react  → spawn particle system at position
     sfx    → play OGG audio (or synthesized fallback)
              │
7. FEEDBACK   ▼
   Display narration (TTS optional)
   Show prompt_feedback (concrete, game-specific)
   Update badge progress
   Kid tries again → goto 1
```

## Key Components

| Component | File | Lines | Purpose |
|-----------|------|-------|---------|
| ScenePlayer3D | `game/ScenePlayer3D.tsx` | ~4,500 | Action executor, prop/character resolution, tweening |
| VillageWorld | `game/VillageWorld.tsx` | ~800 | Hex terrain, buildings, zone markers, decorations |
| VillageCamera | `game/VillageCamera.tsx` | ~200 | Camera controller, zone transitions |
| Character3D | `game/Character3D.tsx` | ~300 | KayKit character with SkeletonUtils clone |
| Prop3D | `game/Prop3D.tsx` | ~150 | GLTF prop with bounce entrance animation |
| AnimationController | `game/AnimationController.ts` | ~200 | Shared animation system (139 clips) |
| SoundManager3D | `game/SoundManager3D.ts` | ~470 | OGG playback + synthesized fallbacks |
| gameStore | `stores/gameStore.ts` | ~300 | Zustand state (zones, tasks, badges, history) |
| PromptInput | `components/PromptInput.tsx` | ~250 | Free text input + TTS + result display |
| MadLibsInput | `components/MadLibsInput.tsx` | ~200 | Structured fill-in-the-blank input |
| worlds.ts | `data/worlds.ts` | ~300 | Per-zone asset manifests (vocabulary contracts) |
| demo-cache.json | `data/demo-cache.json` | ~5,000 | 166 pre-computed golden responses |

## Quest Zones

| Zone | Location | Theme | Characters |
|------|----------|-------|------------|
| Skeleton's Birthday | Z = -16 | Dungeon party | Skeleton, Knight, Mage, Clown |
| Knight's Space Mission | — | Space station | Knight, SpaceRanger, Robot |
| Mage vs Kitchen | — | Cooking chaos | Mage, Witch |
| Barbarian's School | — | Monster recess | Barbarian, Clown, Ninja |
| Dungeon Rock Concert | — | Underground music | All characters + Skeleton |
| Skeleton Pizza Delivery | — | Restaurant | Skeletons |
| Adventurers' Picnic | Z = +16 | Park outing | All 5 Adventurers |

## Tech Stack

```
Frontend:    React 18 + TypeScript (strict)
3D Engine:   React Three Fiber + Drei
Rendering:   Three.js (WebGL)
State:       Zustand
Build:       Vite
Styling:     Tailwind CSS
Fonts:       Fredoka + Nunito (Google Fonts)
AI:          Claude Opus 4.6 (via API)
Audio:       Web Audio API + HTMLAudioElement
Assets:      GLTF/GLB (CC0 licensed)
Deployment:  Vercel
```
