# Three.js 3D Migration Plan — Prompt Quest

**Created:** 2026-02-10
**Last Updated:** 2026-02-11
**Status:** PHASES 0-2 + VILLAGE WORLD COMPLETE — Scale fix needed, then Phase 3+
**Goal:** Migrate from Phaser 2D to Three.js 3D using KayKit + Tiny Treats assets
**Deadline:** Feb 16 (4 build days remaining)
**Asset Investment:** KayKit Complete ($99) + Tiny Treats ($19.95) = $119

---

## Situation Assessment

### What We Have (Working 2D Game)
- 6 playable tasks with 2D Phaser scenes (cartoon characters as colored rectangles/simple PNGs)
- 96 golden cache responses, 3-tier response resolver, Claude API integration
- 209 passing tests, 0 TypeScript errors, production build ready
- React + Zustand UI layer (engine-agnostic — survives migration)
- **Three.js + R3F + Drei already installed** in package.json
- **R3F proof-of-concept** working (test-r3f.tsx with 187 living room models)

### What We're Building (3D Game per Docs)
- 7 outrageous comedy tasks using KayKit Adventurers, Skeletons, and 700+ props
- 161 skeletal animations with crossfade transitions
- 3D environments assembled from modular asset packs
- Lottie reaction overlays on HTML div over canvas
- Branded splash screen with progressive loading
- Camera moves, lighting, shadows

### Available Assets (EXTRACTED — Phase 0 Complete)
- **28 character GLBs** in `assets/3d/kaykit/characters/` (11MB)
  - 9 Adventurers: Knight, Barbarian, Mage, Ranger, Rogue, Druid, Engineer, Rogue_Hooded, Barbarian_Large
  - 6 Skeletons: Skeleton_Warrior, Skeleton_Mage, Skeleton_Rogue, Skeleton_Minion, Skeleton_Golem, Necromancer
  - 13 Bonus: SpaceRanger, Ninja, Clown, Robot_One, Robot_Two, Witch, Vampire, BlackKnight, Superhero, Caveman, FrostGolem, Survivalist, SpaceRanger_FlightMode
- **8 animation GLBs** in `assets/3d/kaykit/animations/` (7.2MB) — 139 clips total (Rig_Medium shared)
- **12 KayKit prop packs** in `assets/3d/kaykit/packs/` — 3,336 models
  - dungeon(283), forest_nature(1588), platformer(525), restaurant(225), holiday(138), resource(132), halloween(102), furniture(74), city_builder(73), rpg_tools(69), space_base(69), block(58)
- **10 Tiny Treats packs** in `assets/3d/tiny-treats/` — 719 models
  - playful-bedroom(149), charming-kitchen(118), bakery-interior(114), house-plants(113), bakery-building(50), fun-playground(47), pleasant-picnic(41), baked-goods(32), pretty-park(28), homely-house(27)
- **Living Room** in `assets/3d/living-room/` — 187 GLTF models (previously extracted)
- **Restaurant pack has actual pizza models**: food_pizza_pepperoni_plated.gltf, food_pizza_cheese_plated.gltf
- **Total: ~128MB on disk, 4,270+ models**
- **R3F character test PROVEN**: Knight, Skeleton_Warrior, Mage all animate with 42 shared clips

### What Stays Unchanged (Engine-Agnostic Layer)
| Component | File | Reason |
|-----------|------|--------|
| Vocabulary contract types | `types/scene-script.ts` | Will be EXPANDED (new actors/props), not replaced |
| Cache service | `services/cache.ts` | Rendering-agnostic |
| Claude API client | `services/claude.ts` | Rendering-agnostic |
| Response resolver | `services/resolver.ts` | Rendering-agnostic |
| Zustand store | `stores/gameStore.ts` | Rendering-agnostic |
| Demo cache | `data/demo-cache.json` | Will be regenerated for new tasks |
| Fallback scripts | `data/fallback-scripts.ts` | Will be rewritten for new tasks |
| UI components | `components/*.tsx` | Minor tweaks only |
| CSS/Tailwind theme | `index.css`, `tailwind.config.js` | Keep brand |

---

## Architecture: React Three Fiber (Not Raw Three.js)

The docs specify "Three.js + GLTFLoader" but we already have R3F installed and a working POC. R3F is the correct choice because:
1. **React integration** — Components, hooks, Suspense for loading
2. **Drei helpers** — `useGLTF`, `useAnimations`, `OrbitControls`, `Environment`
3. **Already proven** — test-r3f.tsx loads 187 models successfully
4. **Declarative** — Scene composition via JSX, not imperative Three.js code

### Core Modules (Mapping from Docs → R3F)

| Doc Module | R3F Equivalent | Notes |
|------------|----------------|-------|
| `SceneManager.ts` | `<Canvas>` + scene config components | Camera, lighting, renderer config via R3F props |
| `AssetLoader.ts` | `useGLTF.preload()` + `<Suspense>` | Automatic caching, clone-on-use via `.clone()` |
| `AnimationController.ts` | `useAnimations()` hook from Drei | Per-model AnimationMixer, crossfade via `actions[name].play()` |
| `SceneScriptPlayer.ts` | New `SceneScriptPlayer3D.tsx` | R3F component managing 3D action execution |

### System Flow (Updated for 3D)

```
Child types prompt
  → React captures input (unchanged)
  → ResponseResolver: cache → API → fallback (unchanged)
  → SceneScript JSON → SceneScriptPlayer3D:
    → spawn: clone GLB model, add to scene at position
    → animate: AnimationMixer.clipAction(name).crossFadeTo()
    → move: useSpring/tween position over duration_ms
    → react: trigger Lottie overlay (HTML layer above canvas)
    → sound: play audio buffer (Howler.js or HTML5 Audio)
    → camera: tween camera position/lookAt
  → Display narration + stars → Update Zustand
```

---

## The 7 Tasks (New — Per Docs)

| # | Task | Characters | Key Packs | Mode |
|---|------|-----------|-----------|------|
| T1 | Skeleton's Surprise Birthday | Skeleton, Adventurers | Dungeon, Holiday, Halloween, Baked Goods, Furniture | Magic 5yo |
| T2 | Knight's Accidental Space Mission | Knight, Space Ranger | Space Base, Platformer, RPG Tools | Magic 5yo |
| T3 | Mage vs. The Cute Kitchen | Mage, Witch, Skeleton | Charming Kitchen, Bakery, Restaurant, Baked Goods | Explorer 8yo |
| T4 | Barbarian's First Day of School | Barbarian, All Adventurers | Fun Playground, Homely House, Furniture, Forest Nature | Explorer 8yo |
| T5 | Dungeon Rock Concert | All 5 Adventurers, Skeleton, Clown | Dungeon Remastered, Block, Resource | Magic 5yo |
| T6 | Skeleton Pizza Delivery | Skeleton, Adventurers | City Builder, Pretty Park, Homely House, Restaurant | Explorer 8yo |
| T7 | Adventurers' Disastrous Picnic | All 5 Adventurers | Pleasant Picnic, Pretty Park, Forest Nature, Baked Goods | Magic 5yo |

---

## Phase 0: Asset Pipeline (Day 1 — Mon Feb 10) — COMPLETE
**Goal:** Extract, organize, and audit all 3D assets
**Gate:** Asset manifest created, at least one character visible in R3F ✅

### Tasks

- [x] **0.1** Extract `The Complete KayKit Collection v3.zip` → `frontend/public/assets/3d/kaykit/`
  - Organize by pack: `adventurers/`, `skeletons/`, `animations/`, `dungeon/`, `space-base/`, etc.
  - Find and catalog GLB/GLTF exports (prefer GLB for single-file convenience)

- [x] **0.2** Extract `Tiny_Treats_Collection_1_1.0.zip` → `frontend/public/assets/3d/tiny-treats/`
  - Organize by pack: `charming-kitchen/`, `pleasant-picnic/`, `pretty-park/`, `fun-playground/`, etc.

- [x] **0.3** Create asset manifest (`src/data/asset-manifest.ts`)
  - Map every character, prop, and environment piece to its GLB path
  - Per-task asset lists (which GLBs each task needs)
  - Total file count and estimated sizes

- [x] **0.4** Character audit — verify the 5 Adventurers + Skeleton GLBs:
  - Knight, Barbarian, Mage, Archer, Rogue (KayKit Adventurers pack)
  - Skeleton (KayKit Skeletons pack)
  - All must be rigged and compatible with the 161 animation pack

- [x] **0.5** Animation audit — find the shared animation GLB:
  - Should contain 161 skeletal clips
  - Test: load one character + animation GLB in test-r3f, play "Idle"

### Verification
- Asset manifest lists all GLB paths by task
- One character renders in the existing R3F test page
- Animation pack identified and clip names cataloged

---

## Phase 1: Three.js Engine Foundation (Day 1-2 — Mon-Tue) — COMPLETE
**Goal:** R3F canvas rendering with character + animation + basic scene
**Gate:** One character model with Idle animation visible on screen ✅

### Tasks

- [x] **1.1** Create `src/game/R3FGame.tsx` — Main Three.js canvas component
  - Canvas with VillageCamera (45° FOV), shadows, dpr=[1,2]
  - SceneMeasurer dev tool for debugging 3D sizes
  - VillageWorld + VillageCamera composed inside Canvas

- [x] **1.2** Asset loading via `useGLTF` + manifest — `src/data/asset-manifest.ts`
  - 28 character GLBs, 8 animation packs (139 clips), 4,270+ prop models
  - Per-task asset lists (TASK_ASSETS) for preloading
  - Clone-on-use via `SkeletonUtils.clone()`

- [x] **1.3** Create `src/game/AnimationController.ts` — Skeletal animation system
  - Loads all 8 animation packs, caches clips
  - `useAnimationClips()` hook returns combined clips
  - `preloadAllAnimations()` for upfront loading
  - Fallback to Idle_A if clip not found

- [x] **1.4** Create `src/game/Character3D.tsx` — Reusable animated character
  - SkeletonUtils.clone for independent instances
  - Crossfade transitions (0.25s default)
  - Idle breathing effect (subtle scale pulse)
  - Imperative ref API: `play()`, `getPosition()`

- [x] **1.5** Wire into App.tsx + LoadingScreen
  - R3FGame replaces PhaserGame as main renderer
  - LoadingScreen with 2s timer during animation preload
  - Zone-based navigation replaces task grid

---

## Phase 2: SceneScriptPlayer3D + Village World (Day 2 — Tue) — COMPLETE
**Goal:** Execute scene scripts in 3D + persistent village world
**Gate:** Village renders with buildings, zones, and character spawning ✅

### Tasks

- [x] **2.1** Create `src/game/ScenePlayer3D.tsx` — 3D script executor
  - Manages active actors (characters + props) as R3F components
  - Executes spawn/animate/move/remove/react/sound actions
  - Zone-aware positioning via `zonePosition()` offset

- [x] **2.2** Create `src/game/VillageWorld.tsx` — Persistent medieval village
  - Hex terrain grid (29x33 tiles) using KayKit Medieval Hex Pack
  - 12+ buildings (townhall, tavern, market, well, blacksmith, homes, church, windmill, stables)
  - 2 quest zones: Dungeon (north, Z=-16) + Park (south, Z=+16)
  - VillagePerimeter (mountains, hills, trees, rocks)
  - VillageAtmosphere (Sky, fog, hemisphere+directional lights, clouds)
  - Zone markers (glowing purple pillars + HTML labels)

- [x] **2.3** Create `src/game/VillageCamera.tsx` — Camera transitions
  - Smooth 2s ease-out cubic camera fly between zones
  - Village overview: offset (0, 18, 28)
  - Zone close-up: offset (0, 9, 14)
  - Orbit controls with polar angle + distance limits

- [x] **2.4** Create `src/game/Prop3D.tsx` — Reusable prop component
- [x] **2.5** Create `src/game/SoundManager3D.ts` — Audio for 3D scenes
- [x] **2.6** Create `src/game/SceneEnvironment3D.tsx` — Environment setup
- [x] **2.7** Create `src/game/TaskAtmosphere.tsx` — Per-task mood lighting
- [x] **2.8** Create `src/game/TaskIntro.tsx` — Task introduction transitions

### Known Issue: Building Scale (BLOCKING)
- Buildings at 3.0x scale are too small relative to characters (2.61u tall)
- Home_A at 3.0x = 2.51u (barely taller than character)
- Townhall at 3.0x = 6.22u (only 2.7x character — should be 6-8x)
- Stables at 3.0x = 1.83u (SHORTER than character)
- **Fix: Scale buildings to ~7x** and spread positions further apart
- Test page: `test-scale.html` (interactive slider comparison)

---

## Phase 2.5: Building Scale Fix (PRIORITY — Next)
**Goal:** Buildings proportional to characters — village looks like a real place
**Gate:** Knight stands next to townhall and looks appropriately small (person-to-building ratio)

### The Problem
KayKit Medieval Hex buildings are strategy-game miniatures (designed for overhead view), not adventure-game scale. Characters are 2.61u tall. At the current 3.0x, buildings are dollhouse-sized:

| Building | At 3.0x | Char Ratio | Real-World Target |
|----------|---------|-----------|-------------------|
| Townhall | 6.22u | 2.7x | 6-8x (~17u) |
| Church | 5.43u | 2.1x | 8-11x (~23u) |
| Windmill | 4.81u | 1.8x | 5-8x (~17u) |
| Tavern | 4.19u | 1.6x | 2-3x (~7u) |
| Home_A | 2.51u | 1.1x | 2.5-3.5x (~8u) |
| Stables | 1.83u | 0.8x | 1.5-2x (~5u) |

### Tasks

- [ ] **2.5.1** Update VillageWorld.tsx building scale from 3.0 to 7.0
  - All hex buildings and hex decorations: `s = 7.0`, `d = 7.0`
  - Perimeter mountains: scale proportionally (~8-10x)

- [ ] **2.5.2** Reposition all buildings to prevent overlap
  - At 7.0x, buildings are ~2.3x wider — spread positions by same factor
  - Current positions: 8-14 units apart → need 18-32 units apart
  - Village area expands from ~28u to ~65u wide

- [ ] **2.5.3** Update hex terrain grid to cover larger village area
  - Expand from col -14..+14 to col -32..+32 (or use larger hex tiles)
  - Consider instanced rendering if tile count > 2000

- [ ] **2.5.4** Update camera distances for larger village
  - Village overview offset: (0, 18, 28) → (0, 40, 60) approx
  - Zone camera offset: (0, 9, 14) → (0, 18, 28) approx
  - Max orbit distance: 50 → 100
  - Fog push: near 40→80, far 180→350

- [ ] **2.5.5** Update zone center positions
  - Dungeon: [0, 0, -16] → [0, 0, -35] approx
  - Park: [0, 0, 16] → [0, 0, 35] approx

- [ ] **2.5.6** Update dungeon zone — keep dungeon pack at 1.0 (adventure-scale)
  - Dungeon walls/pillars stay at 1.0 (already character-scale)
  - But zone approach decoration (hex flags, weaponracks) scale from 3.0 to 7.0

- [ ] **2.5.7** Update park zone — tiny-treats props at 0.8-1.0 (adventure-scale)
  - Park trees, benches, fountain stay at 0.8-1.0
  - But hex stone fences scale from 2.0 to ~4.5

- [ ] **2.5.8** Verify with test-scale.html — compare at final scale
  - All buildings visually taller than character at correct ratios
  - No buildings overlapping
  - Camera overview shows full village
  - Zone fly-to still works smoothly

### Verification
- Knight stands next to townhall → character is small relative to building (6-8x ratio)
- No building overlaps or z-fighting
- Camera can still see full village in overview
- Zone transitions still smooth
- Performance acceptable (FPS > 30)

---

## Phase 3: End-to-End Loop — Prompt → 3D Scene (Day 3 — Wed)
**Goal:** Full gameplay loop: type prompt → Claude → 3D scene plays → feedback shown
**Gate:** Type "have a picnic" → funny 3D scene plays in the park zone

### Completed
- [x] System prompts written for all 7 tasks (`prompts/*.ts`)
- [x] Asset manifest with per-task character + prop lists (`data/asset-manifest.ts`)
- [x] ScenePlayer3D executes scene scripts with zone offset
- [x] Vocabulary contract types (`types/scene-script.ts`)
- [x] Village zone navigation (click marker → camera fly → ready)

### Remaining Tasks

- [ ] **3.1** Verify end-to-end loop: PromptInput → resolver → ScenePlayer3D → narration
  - Ensure Zustand store pipes SceneScript to ScenePlayer3D correctly
  - Test with hardcoded script first, then live API

- [ ] **3.2** Test skeleton-birthday zone (dungeon) — primary demo task
  - Spawn skeletons + adventurers in dungeon courtyard
  - Animations play correctly (Skeletons_Awaken_Floor, Cheering, etc.)
  - Props spawn at correct positions within zone

- [ ] **3.3** Test adventurers-picnic zone (park) — secondary demo task
  - Spawn 5 adventurers in park area
  - Picnic props (blanket, basket, food) spawn correctly
  - Park environment visible around actors

- [ ] **3.4** Build golden cache for demo tasks (25 entries each)
  - skeleton-birthday: 25 cached responses
  - adventurers-picnic: 25 cached responses
  - Distribution: FUNNY_FAIL / PARTIAL_SUCCESS / FULL_SUCCESS

- [ ] **3.5** Narration + feedback display in 3D context
  - Typewriter narration overlaid on 3D scene
  - Star rating visible
  - Feedback panel readable

### Verification
- Type prompt in dungeon zone → skeletons animate → narration plays
- Type prompt in park zone → adventurers react → narration plays
- Cache hit rate > 80% for test prompts
- No console errors during full loop

---

## Phase 4: Additional Zones + Tasks (Day 4 — Thu)
**Goal:** More village zones playable beyond the initial 2
**Gate:** At least 4 of 7 tasks playable via zone markers

### Architecture Change
Original plan had per-task isolated scenes. Actual implementation uses a persistent village with quest zones. Only 2 zones exist (dungeon + park). Additional tasks need either:
- **New zones** in VillageWorld (requires zone area design + zone marker)
- **Reuse existing zones** with different props/characters per task

### Tasks

- [ ] **4.1** Add 2-3 more zone areas to VillageWorld
  - Options: Kitchen (mage-kitchen), School (barbarian-school), Stage (dungeon-concert)
  - Each zone needs: position, environment props, zone marker, ZONE_CENTERS entry

- [ ] **4.2** Build golden cache for remaining tasks (25 entries each)
  - knight-space, mage-kitchen, barbarian-school, dungeon-concert, skeleton-pizza
  - System prompts already exist — just need cached responses

- [ ] **4.3** Test all tasks end-to-end
  - Each zone spawns correct characters + props
  - Claude responses reference only valid assets per task
  - Fallback scripts work for each task

### Verification
- 4+ tasks playable via zone navigation
- Each has cached responses validated against vocabulary contract
- No console errors

---

## Phase 5: Polish & Resilience (Day 5 — Fri)
**Goal:** Production quality, every failure has a fallback
**Gate:** Game runs on airplane mode, every fail is funny

### Tasks

- [ ] **5.1** Lottie reaction overlay system
  - 12 Lottie JSON animations (download from LottieFiles)
  - HTML div layer above Canvas
  - Position reactions using 3D→2D projection

- [ ] **5.2** Sound system (non-Phaser)
  - Port SoundManager to use Howler.js or Web Audio API
  - Load Kenney SFX packs (UI Audio, Impact, RPG, Digital)
  - Auto-SFX on spawn (pop), success (celebration), fail (sad trombone)

- [ ] **5.3** Progressive preloading
  - Phase 1: Demo task (T7 Picnic) → dismiss splash, start demo
  - Phase 2: Shared characters + animations
  - Phase 3: Second demo task (T2 Knight in Space)
  - Phase 4: All remaining tasks (background)

- [ ] **5.4** GLB optimization
  - Draco compression: `gltf-transform optimize --compress draco`
  - Texture downscale to 512x512 where possible
  - Only ship models actually used per task
  - Target: 10-15 MB total payload

- [ ] **5.5** Error tolerance in SceneScriptPlayer3D
  - Unknown actor → skip action, log warning
  - Unknown animation → fallback to Idle
  - Missing GLB → skip, never crash
  - Invalid JSON from Claude → regex fallback → generic funny fail

- [ ] **5.6** Service Worker for offline demo
  - VitePWA plugin: pre-cache all assets on first visit
  - Demo can run on airplane mode
  - Cache + assets = zero network needed

- [ ] **5.7** Voice input (Web Speech API)
  - Chrome speech recognition
  - Text always available as fallback
  - Display transcript in input field

- [ ] **5.8** TTS narration
  - Browser-native SpeechSynthesis for narration text
  - Clear, paced delivery
  - Respects mute toggle

### Verification
- Disconnect wifi → reload → game works (offline mode)
- Every demo-script prompt returns exact expected response
- Voice input works in Chrome
- TTS reads narrations clearly
- All Lottie reactions fire correctly

---

## Phase 6: Demo Prep (Day 6 — Sat)
**Goal:** Bug-free demo with scripted beats
**Gate:** 3 full run-throughs without issues

### Tasks

- [ ] **6.1** Demo script creation
  - T7 (Picnic) first: vague → specific → detailed prompt arc
  - T2 (Knight in Space) second: different environment, same architecture
  - Badge/star progress showcase
  - Exact prompts rehearsed

- [ ] **6.2** Full bug bash
  - Every task, both modes
  - Cache hit rate > 80%
  - Test mobile
  - Test offline fallback

- [ ] **6.3** Pre-flight checklist
  - Vercel deployment live
  - Service Worker cache populated
  - API key working
  - All 7 tasks error-free

- [ ] **6.4** Submission materials
  - Demo video recording (backup)
  - Submission description
  - Pitch: Opus 4.6 as core mechanic, educational impact, production quality, novel architecture

---

## Schedule Summary (Updated)

| Day | Date | Phase | Status |
|-----|------|-------|--------|
| 1 | Mon Feb 10 | Phase 0: Asset Pipeline | ✅ COMPLETE |
| 2 | Tue Feb 11 | Phase 1 + 2: Engine + Village World | ✅ COMPLETE (scale issue found) |
| 3 | Wed Feb 12 | **Phase 2.5: Scale Fix** + Phase 3: E2E Loop | **← TODAY's PRIORITY** |
| 4 | Thu Feb 13 | Phase 4: Additional Zones | |
| 5 | Fri Feb 14 | Phase 5: Polish & Resilience | |
| 6 | Sat Feb 15 | Phase 6: Demo Prep | |
| 7 | Sun Feb 16 | Submit | Demo day |

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| KayKit GLBs don't load in R3F | Test immediately in Phase 0. GLTF format is standard. |
| Animation clips don't match character rigs | KayKit guarantees compatibility. Test Day 1. |
| 3D performance issues | Low-poly models (~1000 tris). Max 10 models/scene. Disable shadows on mobile. |
| Too much work for 6 days solo | Phase 3 (one task E2E) is the minimum viable demo. Phases 4-6 are incremental. |
| Asset files too large | Draco compression. Only ship what's used per task. Vercel gzip. |
| Phaser removal breaks tests | Keep engine-agnostic tests. Only Phaser-specific scene tests need rewrite. |

---

## Critical Decision: Keep or Remove Phaser?

**Recommendation: Remove Phaser on Day 2** after R3F canvas is working.

Rationale:
- Keeping both engines doubles complexity
- The 2D game is a stepping stone, not the final product
- All engine-agnostic code (services, store, cache, types) survives
- The 6 Phaser scenes will be replaced by 7 R3F scene components
- PhaserGame.tsx → R3FGame.tsx (direct replacement in App.tsx)

What we lose: 6 working 2D scenes, 209 tests (some Phaser-specific)
What we gain: 3D game with 700+ professional models, 161 animations, massive visual upgrade

---

## File Changes Summary

### New Files (~20)
| File | Purpose |
|------|---------|
| `game/R3FGame.tsx` | R3F canvas wrapper |
| `game/SceneScriptPlayer3D.tsx` | 3D script executor |
| `game/AnimationController.ts` | Skeletal animation system |
| `game/AssetLoader3D.ts` | GLTF preloading |
| `game/scenes/PicnicScene.tsx` | T7 Adventurers' Picnic |
| `game/scenes/SkeletonBirthdayScene.tsx` | T1 |
| `game/scenes/KnightSpaceScene.tsx` | T2 |
| `game/scenes/MageKitchenScene.tsx` | T3 |
| `game/scenes/BarbarianSchoolScene.tsx` | T4 |
| `game/scenes/DungeonConcertScene.tsx` | T5 |
| `game/scenes/SkeletonPizzaScene.tsx` | T6 |
| `prompts/adventurers-picnic.ts` | T7 system prompt |
| `prompts/skeleton-birthday.ts` | T1 system prompt |
| `prompts/knight-space.ts` | T2 system prompt |
| `prompts/mage-kitchen-3d.ts` | T3 system prompt |
| `prompts/barbarian-school.ts` | T4 system prompt |
| `prompts/dungeon-concert.ts` | T5 system prompt |
| `prompts/skeleton-pizza.ts` | T6 system prompt |
| `data/asset-manifest.ts` | GLB path registry |
| `ui/SplashScreen.tsx` | Loading screen |

### Modified Files
| File | Change |
|------|--------|
| `types/scene-script.ts` | Expanded vocabulary (new actors, props, animations) |
| `stores/gameStore.ts` | 7 new task prompts, remove old 6 |
| `App.tsx` | Swap PhaserGame → R3FGame, 7 task cards |
| `data/demo-cache.json` | Regenerated for 7 new tasks (175 entries) |
| `data/fallback-scripts.ts` | 7 new fallbacks |
| `components/PromptInput.tsx` | 7 new task placeholders |

### Removed Files
| File | Reason |
|------|--------|
| `game/PhaserGame.tsx` | Replaced by R3FGame |
| `game/SceneScriptPlayer.ts` | Replaced by SceneScriptPlayer3D |
| `game/AssetLoader.ts` | Replaced by AssetLoader3D |
| `game/SoundManager.ts` | Replaced by new audio system |
| `game/EventBus.ts` | R3F uses React refs, no need for EventBus |
| `game/scenes/MonsterPartyScene.ts` | Old 2D scene |
| `game/scenes/RobotPizzaScene.ts` | Old 2D scene |
| `game/scenes/WizardKitchenScene.ts` | Old 2D scene |
| `game/scenes/DinosaurSchoolScene.ts` | Old 2D scene |
| `game/scenes/DogSpaceScene.ts` | Old 2D scene |
| `game/scenes/OctopusBandScene.ts` | Old 2D scene |
| `prompts/monster-party.ts` | Old task prompt |
| `prompts/robot-pizza.ts` | Old task prompt |
| `prompts/wizard-kitchen.ts` | Old task prompt |
| `prompts/dinosaur-school.ts` | Old task prompt |
| `prompts/dog-space.ts` | Old task prompt |
| `prompts/octopus-band.ts` | Old task prompt |

---

## Scene Script Schema (Updated for 3D)

```typescript
interface SceneScript {
  success_level: "FULL_SUCCESS" | "PARTIAL_SUCCESS" | "FUNNY_FAIL";
  narration: string;          // ≤25 words, funny
  stars: 1 | 2 | 3;
  actions: SceneAction[];     // max 8 per response
}

interface SceneAction {
  type: "spawn" | "animate" | "move" | "remove" | "react" | "sound" | "camera" | "light";
  actor?: string;      // must exist in VocabularyContract
  anim?: string;       // one of 161 named clips
  position?: string;   // "left" | "center" | "right" | "back-left" | [x,y,z]
  effect?: string;     // Lottie reaction name
  delay_ms?: number;
  duration_ms?: number;
}
```

Key differences from current 2D schema:
- `actor` field (not `target`) per the docs
- `stars` field added (Claude rates quality)
- `camera` and `light` action types added
- Position can be named OR explicit [x,y,z] coordinates
- `anim` references 161 skeletal clip names (not simple tween names)

---

## Minimum Viable Demo (If Time Runs Short)

If we can't finish all 7 tasks, the minimum demo is:
1. **T7 Picnic** — All 5 Adventurers, Pleasant Picnic environment, 3 demo beats
2. **T2 Knight in Space** — Different environment, proves architecture generality
3. **25 cached responses per task** — Demo never fails
4. **Loading screen** — Professional first impression
5. **Stars + narration** — Educational feedback loop visible

This minimum can be achieved by end of Day 3 (Phase 3 complete).
