# Accelerated Roadmap — Quest AI

**Created:** 2026-02-10
**Last Updated:** 2026-02-10
**Status:** PHASES 1-5 COMPLETE — remaining: cache, stress test, demo prep
**Scope:** Assets + 4 new tasks + game juice + SFX + polish

---

## Current State

- 6 tasks fully playable (Monster Party, Robot Pizza, Wizard Kitchen, Dinosaur School, Dog Space, Octopus Band)
- 53/53 vocabulary contract assets organized and wired into scenes via shared AssetLoader
- SoundManager with mute toggle, auto-SFX on spawn/react, explicit `sfx` action type
- Typewriter narration (35ms/char) in all 6 scenes
- Card grid task selector (2x3 with emoji, title, description)
- prefers-reduced-motion: tweens apply final values instantly
- 18 SaaS template leftover files deleted
- 209 tests passing, 0 TypeScript errors
- Production build: ~1.7MB JS + 21KB CSS
- UI polish: animations (fade-in, scale-in, slide-up, bounce-gentle, glow-pulse), card-lift hover, "Choose Your Quest!" header
- Deployment deferred (Vercel config ready but not deploying for now)

## Architecture for Adding a New Task

Each new task requires exactly 7 file changes:
1. `types/scene-script.ts` — Add actors/props to vocabulary (if new)
2. `prompts/{task-name}.ts` — System prompt (clone existing, ~55 lines)
3. `game/scenes/{TaskName}Scene.ts` — Phaser scene (clone existing, ~150 lines)
4. `stores/gameStore.ts` — Add to SYSTEM_PROMPTS dictionary (1 line)
5. `data/fallback-scripts.ts` — Add Tier 3 fallback (12 lines)
6. `App.tsx` — Add to TASKS dictionary (1 line)
7. `game/PhaserGame.tsx` — Register scene in config (1 line + 1 import)

SceneScriptPlayer, AssetLoader, SoundManager, and resolver need ZERO changes — they're task-agnostic.

---

## Phase 1: Asset Pipeline — COMPLETE

- [x] 9 actor PNGs extracted and organized
- [x] 28 props (18 PNG + 10 SVG) extracted and organized
- [x] 6 backdrops (1 PNG + 5 SVG) created
- [x] 19 SFX OGG files organized
- [x] Shared `AssetLoader.ts` created — all scenes call `preloadGameAssets(this)`
- [x] SVG props loaded at 128x128, SVG backdrops at 1024x576
- [x] Both existing scenes wired to real assets with fallback placeholders

---

## Phase 2: Game Juice — COMPLETE

- [x] `SoundManager.ts` — wraps Phaser.Sound, reads `isMuted` from Zustand
- [x] Auto-SFX: `pop` on spawn, `celebration` on confetti-burst
- [x] Explicit `sfx` action type now functional (was no-op)
- [x] Typewriter narration: 35ms/char via `scene.time.addEvent` in all 6 scenes
- [x] Loading messages already existed (LOADING_MESSAGES array + loadingMsgRef)
- [x] `isMuted` toggle in Zustand store
- [x] Mute button in header (🔊/🔇)

---

## Phase 3: Wizard Kitchen + Dinosaur School — COMPLETE

- [x] `prompts/wizard-kitchen.ts` — plates, soup-bowl, toaster, fridge chaos
- [x] `WizardKitchenScene.ts` — kitchen background, persistent wizard
- [x] `prompts/dinosaur-school.ts` — desk, pencil, chair, lunchbox problems
- [x] `DinosaurSchoolScene.ts` — classroom background, persistent T-Rex
- [x] Fallback scripts for both tasks
- [x] Registered in gameStore, App.tsx, PhaserGame.tsx

---

## Phase 4: Dog Space + Octopus Band + Card Grid — COMPLETE

- [x] `prompts/dog-space.ts` — rocket, spacesuit, moon, flag, bone
- [x] `DogSpaceScene.ts` — starfield background, persistent dog
- [x] `prompts/octopus-band.ts` — guitar, drums, keyboard, microphone
- [x] `OctopusBandScene.ts` — underwater stage, persistent octopus
- [x] Card grid task selector (2x3, emoji + title + description)
- [x] "All Tasks" button + Quest AI title return to grid
- [x] Fallback scripts for both tasks
- [x] Per-task placeholders in PromptInput for all 6 tasks

---

## Phase 5: Polish — COMPLETE

- [x] `prefers-reduced-motion` in SceneScriptPlayer (tweens apply final values instantly)
- [x] SaaS template cleanup: 18 files deleted (components, pages, contexts, hooks, services, types, root docs)
- [x] Build verified: 209 tests, 0 TS errors, CSS reduced 29KB → 21KB
- [ ] ~~Deploy to Vercel~~ — DEFERRED (keeping local for now)

---

## Remaining Work

### Cache Generation — COMPLETE
- [x] Generate golden cache entries for wizard-kitchen (14 entries)
- [x] Generate golden cache entries for dinosaur-school (14 entries)
- [x] Generate golden cache entries for dog-space (14 entries)
- [x] Generate golden cache entries for octopus-band (14 entries)
- Total cache: 96 entries (24 monster-party + 16 robot-pizza + 14×4 new tasks)
- Distribution: 34 FULL_SUCCESS, 33 PARTIAL_SUCCESS, 29 FUNNY_FAIL
- All 96 entries pass vocabulary contract validation

### Stress Testing
- [ ] Test all 6 tasks with edge cases: empty, 500 chars, gibberish, non-English, unrelated
- [ ] Verify every failure → Tier 3 fallback (never error screen)
- [ ] Test voice input on Chrome
- [ ] 30 minutes free-play testing

### Demo Prep
- [ ] Record backup demo video
- [ ] Write 2-minute pitch script (6 tasks, 3-tier system, prompt engineering pedagogy)
- [ ] Practice 3x
- [ ] Run pre-demo checklist

---

## File Summary (Final)

### New Files Created (12)
| File | Purpose |
|------|---------|
| `game/AssetLoader.ts` | Shared preloader for all 53 assets |
| `game/SoundManager.ts` | SFX playback with mute support |
| `prompts/wizard-kitchen.ts` | Wizard Kitchen system prompt |
| `prompts/dinosaur-school.ts` | Dinosaur School system prompt |
| `prompts/dog-space.ts` | Dog Space system prompt |
| `prompts/octopus-band.ts` | Octopus Band system prompt |
| `game/scenes/WizardKitchenScene.ts` | Wizard Kitchen Phaser scene |
| `game/scenes/DinosaurSchoolScene.ts` | Dinosaur School Phaser scene |
| `game/scenes/DogSpaceScene.ts` | Dog Space Phaser scene |
| `game/scenes/OctopusBandScene.ts` | Octopus Band Phaser scene |

### Modified Files (8)
| File | Changes |
|------|---------|
| `stores/gameStore.ts` | +4 SYSTEM_PROMPTS, +isMuted, +toggleMute |
| `data/fallback-scripts.ts` | +4 fallback entries (6 total) |
| `App.tsx` | Card grid selector, 6 tasks, mute button, UI animations |
| `game/PhaserGame.tsx` | +4 scene imports + registrations (6 total) |
| `game/SceneScriptPlayer.ts` | SoundManager, auto-SFX, reduced-motion, asset scaling |
| `game/scenes/MonsterPartyScene.ts` | AssetLoader preload, backdrop, typewriter |
| `game/scenes/RobotPizzaScene.ts` | AssetLoader preload, backdrop, typewriter |
| `components/PromptInput.tsx` | +4 task placeholders, UI animations |

### Deleted Files (18)
SaaS template leftovers: Layout, DataTable, Modal, Toast, FileUploader, Pagination, authApi, itemsApi, auth.ts, items.ts, 4 pages, 3 contexts, useAuth hook, test-utils, factories, CHECKLIST.md, IMPLEMENTATION_SUMMARY.md

---

## Success Criteria

- [x] 6 tasks playable with real assets (not placeholders)
- [x] Sound effects on spawn/success with mute toggle
- [x] Typewriter narration in all scenes
- [x] Funny loading messages during API calls
- [x] 96 cached responses across all 6 tasks
- [x] Task selector card grid with animations
- [ ] ~~Deployed to Vercel~~ — DEFERRED
- [ ] 30 minutes of stress testing finds no crashes
- [x] prefers-reduced-motion support
- [x] Mute button works
