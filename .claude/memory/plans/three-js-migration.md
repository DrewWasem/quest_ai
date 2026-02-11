# Three.js 3D Migration Plan — Prompt Quest

**Created:** 2026-02-10
**Status:** PHASE 0 COMPLETE — Phase 1 ready
**Goal:** Migrate from Phaser 2D to Three.js 3D using KayKit + Tiny Treats assets
**Deadline:** Feb 16 (6 build days remaining)
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

## Phase 1: Three.js Engine Foundation (Day 1-2 — Mon-Tue)
**Goal:** R3F canvas rendering with character + animation + basic scene
**Gate:** One character model with Idle animation visible on screen

### Tasks

- [ ] **1.1** Create `src/game/R3FGame.tsx` — Main Three.js canvas component
  - `<Canvas>` with: 45° FOV camera, antialias, shadows, sRGB encoding
  - Camera at (0, 4, 8) looking at (0, 1, 0)
  - Warm lighting: AmbientLight(0xffeedd, 0.6) + DirectionalLight(0xffffff, 1.0)
  - Resize handler (responsive)
  - Matches current canvas area in the UI layout

- [ ] **1.2** Create `src/game/AssetLoader3D.ts` — GLTF preloading system
  - `useGLTF.preload()` calls for all assets needed by current task
  - `preloadTask(taskId)` loads characters + props + environment from manifest
  - Clone-on-use pattern: `SkeletonUtils.clone()` for animated models
  - Progress callback for loading bar

- [ ] **1.3** Create `src/game/AnimationController.ts` — Skeletal animation system
  - Load 161 clips from shared animation GLB
  - `useAnimations()` hook wrapper with crossFadeTo transitions
  - `play(clipName, fadeIn=0.25)` method
  - Fallback to Idle if clip not found (never crash)
  - Special handling for Skeleton-specific clips (Idle_Skeleton, etc.)

- [ ] **1.4** Wire into App.tsx — Replace `<PhaserGame>` with `<R3FGame>`
  - Keep PhaserGame temporarily (feature flag or route toggle)
  - R3FGame receives task ID and SceneScript from Zustand store
  - EventBus bridge for React ↔ 3D communication

- [ ] **1.5** Branded splash/loading screen
  - Show while assets preload
  - Fun messages: "Sharpening the Knight's sword...", "Reassembling the Skeleton..."
  - Progress bar with percentage
  - Dismiss after Phase 1 of progressive load (first task ready)

### Verification
- R3F canvas renders at correct size in the layout
- One KayKit character visible with Idle animation playing
- Loading screen shows during asset load
- No console errors

---

## Phase 2: SceneScriptPlayer3D (Day 2-3 — Tue-Wed)
**Goal:** Execute scene scripts in 3D — the heart of the engine
**Gate:** Hardcoded scene script plays: character walks in, waves, sits, confetti

### Tasks

- [ ] **2.1** Create `src/game/SceneScriptPlayer3D.tsx` — 3D script executor
  - React component that takes `SceneScript` prop
  - Manages a `Map<string, Object3D>` of active actors
  - Executes actions sequentially with `delay_ms` timing
  - Emits "script-complete" event when done

- [ ] **2.2** Implement `spawn` action
  - Load GLB from asset manifest → clone → add to scene at named position
  - Named positions map to 3D coords: `left(-3,0,0)`, `center(0,0,0)`, `right(3,0,0)`, etc.
  - Pop-in scale animation (0 → 1.0 over 300ms)
  - Play `pop` SFX on spawn

- [ ] **2.3** Implement `animate` action
  - Look up clip name in AnimationController
  - Play with crossFadeTo from current clip
  - Wait for duration_ms or clip length

- [ ] **2.4** Implement `move` action
  - Tween position from current to target over `duration_ms`
  - Support styles: `linear`, `arc` (parabolic Y curve), `bounce`
  - Use `@react-spring/three` or manual tween in animation loop

- [ ] **2.5** Implement `react` action
  - Trigger Lottie overlay on HTML div positioned over 3D canvas
  - Effects: confetti-burst, explosion-cartoon, hearts-float, sparkle-magic, etc.
  - Position overlay based on 3D→screen projection

- [ ] **2.6** Implement `sound` action
  - Play named SFX (reuse existing OGG files or add new from Kenney packs)
  - Respect `isMuted` from Zustand

- [ ] **2.7** Implement `camera` action
  - Tween camera position and lookAt target
  - Smooth easing over duration_ms
  - Support presets: "zoom-in", "pan-left", "overview"

- [ ] **2.8** Implement `remove` action
  - Scale-down animation (1.0 → 0 over 200ms)
  - Remove from scene and actors map

### Verification
- A hardcoded test script plays all 7 action types without errors
- Timing/sequencing works (delay_ms respected)
- Animations crossfade smoothly
- Lottie overlays position correctly over 3D scene

---

## Phase 3: First Complete Task — T7 Picnic (Day 3 — Wed)
**Goal:** End-to-end: prompt → Claude → 3D scene → narration
**Gate:** Type "have a picnic" → funny 3D scene plays → feedback displayed

### Tasks

- [ ] **3.1** Create picnic environment scene
  - Load Pleasant Picnic assets (blankets, baskets, food)
  - Load Pretty Park assets (trees, benches, fountain)
  - Compose ground plane + environment props
  - Set camera preset for picnic viewing angle

- [ ] **3.2** Load 5 Adventurer characters
  - Knight, Barbarian, Mage, Archer, Rogue — all with Idle animation
  - Position at scene start positions

- [ ] **3.3** Write system prompt (`prompts/adventurers-picnic.ts`)
  - Per-task available characters, props, animations, reactions
  - Comedy formula: Wrong character + wrong place + wrong tools
  - Evaluation rubric for FUNNY_FAIL / PARTIAL_SUCCESS / FULL_SUCCESS

- [ ] **3.4** Update vocabulary contract (`types/scene-script.ts`)
  - Add new ActorKeys: `knight`, `barbarian`, `mage`, `archer`, `rogue`, `skeleton`
  - Add new PropKeys for KayKit props (basket, blanket, bow, sword, etc.)
  - Add new animation names matching the 161 clip catalog

- [ ] **3.5** Connect full loop: prompt → resolver → SceneScriptPlayer3D → narration
  - Wire Zustand store to R3FGame
  - PromptInput submits → resolveResponse → 3D playback
  - Narration typewriter display
  - Star rating display

- [ ] **3.6** Build golden cache for T7 (25 entries)
  - 5 FUNNY_FAIL (vague), 5 FUNNY_FAIL (wrong approach)
  - 5 PARTIAL_SUCCESS, 3 FULL_SUCCESS
  - 5 edge cases, 2 demo-scripted exact matches

### Verification
- Type "have a picnic" → FUNNY_FAIL plays in 3D (Barbarian axe-chops basket)
- Type detailed prompt → FULL_SUCCESS plays with confetti
- Narration displays with typewriter effect
- Star rating shows correctly
- Cache hit rate for test prompts > 80%

---

## Phase 4: Remaining 6 Tasks (Day 3-4 — Wed-Thu)
**Goal:** All 7 tasks playable in 3D
**Gate:** Every task selector card leads to a working 3D scene

### Tasks (Repeat pattern from Phase 3 for each task)

- [ ] **4.1** T1: Skeleton's Surprise Birthday
  - Environment: Dungeon + Holiday + Halloween props
  - Characters: Skeleton, Adventurers as party guests
  - System prompt + cache (25 entries)

- [ ] **4.2** T2: Knight's Accidental Space Mission
  - Environment: Space Base modules
  - Characters: Knight, Space Ranger (bonus)
  - System prompt + cache (25 entries)

- [ ] **4.3** T3: Mage vs. The Cute Kitchen
  - Environment: Charming Kitchen + Bakery Interior
  - Characters: Mage, Witch (bonus), Skeleton
  - System prompt + cache (25 entries)

- [ ] **4.4** T4: Barbarian's First Day of School
  - Environment: Fun Playground + Homely House + Furniture
  - Characters: Barbarian, all Adventurers
  - System prompt + cache (25 entries)

- [ ] **4.5** T5: Dungeon Rock Concert
  - Environment: Dungeon Remastered
  - Characters: All 5 Adventurers, Skeleton, Clown (bonus)
  - System prompt + cache (25 entries)

- [ ] **4.6** T6: Skeleton Pizza Delivery
  - Environment: City Builder + Pretty Park
  - Characters: Skeleton, Adventurers
  - System prompt + cache (25 entries)

- [ ] **4.7** Update task selector UI
  - 7 task cards (new emoji + titles + descriptions)
  - Update App.tsx TASKS dictionary
  - Wire scene switching to load correct 3D environment

### Verification
- All 7 tasks selectable and playable
- Each task loads correct environment and characters
- Each has 25 cached responses validated
- No console errors on any task

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

## Schedule Summary

| Day | Date | Phase | Critical Gate |
|-----|------|-------|---------------|
| 1 | Mon Feb 10 | Phase 0 + Phase 1 start | ONE character model rotating on screen |
| 2 | Tue Feb 11 | Phase 1 complete + Phase 2 start | Animation system + SceneScriptPlayer3D |
| 3 | Wed Feb 12 | Phase 2 + Phase 3 | Full loop: prompt → Claude → 3D scene → narration |
| 4 | Thu Feb 13 | Phase 4 | All 7 tasks playable |
| 5 | Fri Feb 14 | Phase 5 | Polish, voice, offline, optimization |
| 6 | Sat Feb 15 | Phase 6 | Bug-free demo, submission ready |
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
