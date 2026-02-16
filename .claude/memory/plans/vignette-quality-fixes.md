# Plan: Vignette Quality & Progression Fixes

**Created:** 2026-02-15
**Status:** DRAFT — awaiting approval
**Estimated Phases:** 5 (each 2-5 min)

## Problem Summary

1. **Creative combos punished as "chaos"**: In mage-kitchen, `result: 'multiply'/'explode'/'go_wild'` are ALL tagged `chaotic` — that's 18/47 vignettes (38%). A kid who picks "Levitate + Multiply" and imagines a pot tornado gets "CHAOS!" instead of a reward. This teaches the OPPOSITE of what we want — it punishes creative thinking.
2. **Progression too hard**: Only `promptScore: 'perfect'` unlocks stages. In mage-kitchen only `cook_perfectly` and `calm_down` are 'perfect'. Kids who pick fun dramatic results can NEVER progress.
3. **Duplicate prop IDs cause disappearing props**: Pot Tornado spawns `{ asset: 'pot' }` 4 times — but `handleSpawn` REPLACES actors with the same ID (line 3684-3687: `prev.filter(a => a.id !== actorId)`). So each new pot DELETES the previous one. Only the LAST pot survives. The code already supports `_\d+$` suffix stripping (line 3632: `actorId.replace(/_\d+$/, '')`), so vignettes should use `pot_1`, `pot_2`, etc.
4. **Props don't move around**: User expected pots to orbit/move around the stage dynamically. Current vignette spawns pots at fixed positions with no sustained movement. Need continuous motion (orbit style moves, spawn_rain for dramatic filling).
5. **Text popups not visible**: White text + white glow on bright sky-blue background. No background.
6. **Effects underwhelming**: 7 particles in 140x140px container, removal at 2000ms cuts off staggered particles.
7. **Short vignettes feel empty**: Some have only 2-3 actions. With GAP_SPEED=6, these play in under 2 seconds.

### User's Exact Feedback (Mage Kitchen — Levitate + Multiply)
> "What I expect is for this to be perfect, and I expect to see the whole stage filled with pots moving around except where the witch is"
> "when the next pot loaded the original disappeared, it would also be cool if they moved around the stage"

Got: `promptScore: 'chaotic'` → FUNNY_FAIL, only 1 pot visible (others replaced), no movement, no stage progression.

---

## Phase 1: Re-tag Spectacular Vignettes as Perfect (P0 — HIGHEST IMPACT)

**Files:** All 7 vignette data files in `frontend/src/data/vignettes/`

### Rationale
The current design treats dramatic results (explode, multiply, go_wild) as "chaotic." But from a kid's perspective, these are the MOST creative combos — they're imagining spectacular outcomes! The game should reward this creativity, not punish it.

The comedy is in the CONTENT (funny narrations, ridiculous props), not in a "CHAOS!" label that blocks progression.

### Task 1.1: Mass re-tag `chaotic` → `perfect` for all non-default vignettes
- **All 7 zone files** — change ALL `promptScore: 'chaotic'` → `promptScore: 'perfect'`
- Keep the funny narrations, sound effects, and comedy content — just change the score label
- This turns the CHAOS! banner into a SUCCESS! banner, and unlocks stage progression
- **Impact**: 92 vignettes flipped from chaos to success across all zones
- **Command**: `replace_all` on each file: `promptScore: 'chaotic'` → `promptScore: 'perfect'`

### Task 1.2: Accept any non-default vignette for stage completion
- **File:** `MadLibsInput.tsx:162`
- **Change:** `vignette.promptScore === 'perfect'` → `vignette.promptScore !== 'funny_fail' && vignette.id !== stage.defaultVignette.id`
- **Why:** ANY non-default, non-funny_fail vignette should count as completion.

### Verification
- `npm run build` — 0 errors
- Manual: mage-kitchen Levitate+Multiply → FULL_SUCCESS, stage completes

---

## Phase 2: Fix Duplicate Prop IDs & Add Movement (P1 — CRITICAL BUG)

**Files:** All 7 vignette data files in `frontend/src/data/vignettes/`

### Root Cause
`ScenePlayer3D.tsx:3684-3687` replaces actors with matching IDs:
```typescript
const filtered = prev.filter((a) => a.id !== actorId)
return [...filtered, newActor]
```
Line 3632 already strips `_\d+$` suffixes for model resolution (`pot_1` → `pot`), so the fix is in the VIGNETTE DATA, not the engine.

### Task 2.1: Audit all vignettes for duplicate spawn IDs
- Search all 7 vignette files for patterns where the same asset is spawned multiple times without unique suffixes
- Common pattern: `{ action: 'spawn', asset: 'pot', position: 'X' }` repeated — each needs unique ID
- Fix: `pot` → `pot_1`, `pot_2`, `pot_3`, etc.
- Also fix corresponding `move` actions to reference the correct unique ID

### Task 2.2: Enhance Pot Tornado vignette as exemplar
- **File:** `mage-kitchen.ts:1078-1115` — `mk_lev_multiply`
- Current: spawns 4 pots (but only 1 survives due to ID collision), minimal movement
- **New version** — fill the stage with 8+ pots using unique IDs, add orbit movements:
  ```typescript
  steps: [
    ...NARRATOR("Floating pots multiply into a tornado!"),
    ...TELEPORT_IN('mage', 'ds-center'),
    ...CHARACTER_SPEAK('mage', 'excited', 'Float and multiply!'),
    ...SPELL_CAST('mage', 'cs-center'),
    ...ANNOUNCE('POT TORNADO!'),
    // Wave 1: 4 pots spawn at corners with unique IDs
    { parallel: [
      { action: 'spawn', asset: 'pot_1', position: 'cs-left' },
      { action: 'spawn', asset: 'pot_2', position: 'cs-right' },
      { action: 'spawn', asset: 'pot_3', position: 'us-left' },
      { action: 'spawn', asset: 'pot_4', position: 'us-right' },
      { action: 'sfx', sound: 'spawn' },
    ], delayAfter: 0.5 },
    // Wave 2: 4 more pots
    { parallel: [
      { action: 'spawn', asset: 'pot_5', position: 'ds-left' },
      { action: 'spawn', asset: 'pot_6', position: 'ds-right' },
      { action: 'spawn', asset: 'pot_7', position: 'us-center' },
      { action: 'spawn', asset: 'pot_8', position: 'wing-left' },
      { action: 'sfx', sound: 'spawn' },
    ], delayAfter: 0.3 },
    // Orbit: all pots move around the stage
    { parallel: [
      { action: 'move', asset: 'pot_1', to: 'us-right', style: 'arc' },
      { action: 'move', asset: 'pot_2', to: 'ds-left', style: 'arc' },
      { action: 'move', asset: 'pot_3', to: 'cs-right', style: 'arc' },
      { action: 'move', asset: 'pot_4', to: 'cs-left', style: 'arc' },
      { action: 'camera_shake', intensity: 0.4, duration: 1.5 },
    ], delayAfter: 0.5 },
    { parallel: [
      { action: 'move', asset: 'pot_5', to: 'us-left', style: 'arc' },
      { action: 'move', asset: 'pot_6', to: 'us-right', style: 'arc' },
      { action: 'move', asset: 'pot_7', to: 'ds-right', style: 'arc' },
      { action: 'move', asset: 'pot_8', to: 'ds-left', style: 'arc' },
    ], delayAfter: 0.5 },
    ...CHARACTER_EXCLAIM('mage', 'panic', 'Too many pots!'),
    { parallel: [
      { action: 'react', effect: 'tornado-swirl', position: 'center' },
      { action: 'react', effect: 'confetti-burst', position: 'us-center' },
      { action: 'sfx', sound: 'react' },
    ], delayAfter: 1.0 },
    // Final orbit pass
    { parallel: [
      { action: 'move', asset: 'pot_1', to: 'ds-right', style: 'arc' },
      { action: 'move', asset: 'pot_3', to: 'us-left', style: 'arc' },
      { action: 'move', asset: 'pot_5', to: 'cs-center', style: 'arc' },
      { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
    ], delayAfter: 1.5 },
  ]
  ```
- This gives: 8 unique pots, 3 movement waves, effects, ~15 steps vs old 11

### Task 2.3: Fix other "multiply" vignettes across all zones
- Any vignette whose description mentions "multiply", "rain", "swarm", "flood", or "many" likely spawns duplicates
- Grep for patterns: multiple `{ action: 'spawn', asset: 'SAME_NAME'` within one vignette
- Apply unique ID suffixes and add movement actions

### Verification
- Pot Tornado: 8 pots visible simultaneously, moving around stage
- No props disappear when new ones spawn
- Build passes

---

## Phase 3: Improve Text & Emote Visibility (P2)

**Files:** `frontend/src/game/ScenePlayer3D.tsx`

### Task 3.1: Add background pill to text popups
- **Location:** ScenePlayer3D.tsx text popup JSX (~line 4461)
- Add semi-transparent dark background:
  ```
  background: 'rgba(30, 19, 55, 0.8)',
  padding: '10px 24px',
  borderRadius: '16px',
  border: '2px solid rgba(124, 58, 237, 0.4)',
  ```

### Task 3.2: Make emote bubbles larger
- **Location:** ScenePlayer3D.tsx emote JSX (~line 4421)
- Emoji image: 48x48 → 64x64
- Bubble padding: px-3 py-2 → px-4 py-3
- Add purple border: `border: 2px solid rgba(124, 58, 237, 0.3)`
- Text size: text-base → text-lg font-bold

### Task 3.3: Fix particle removal timing
- **Location:** ScenePlayer3D.tsx effect removal (~line 3884)
- `2000` → `2500` (animation = 1.8s + 0.49s stagger = 2.29s > 2s removal)

### Verification
- Text popups: dark pill, clearly readable against sky
- Emotes: larger, bordered, visible
- Particles: no cutoff at end of animation

---

## Phase 4: Boost Effects Impact (P3)

**Files:** `frontend/src/game/ScenePlayer3D.tsx`

### Task 4.1: Double particle count
- **Location:** `getEffectParticles()` (~line 2971)
- Duplicate particle arrays: 7 → 14 particles per burst

### Task 4.2: Increase effect container and spread
- Container: 140x140 → 200x200
- Particle spread distance: 35-60 → 50-85
- Particle size: 28x28 → 36x36

### Verification
- Effects feel "juicy" — more particles, bigger spread
- Performance still fine (<30 CSS-animated particles)

---

## Phase 5: Pad Short Vignettes (P4)

**Files:** `frontend/src/services/vignette-resolver.ts`, `frontend/src/data/movement-templates.ts`

### Task 5.1: Create VIGNETTE_OUTRO template
- **File:** `movement-templates.ts`
- Celebration outro: confetti + crowd cheer

### Task 5.2: Auto-pad short vignettes in buildVignetteScript
- **File:** `vignette-resolver.ts:170`
- If `vignette.steps.length < 6`, append VIGNETTE_OUTRO() steps

### Verification
- Default vignettes feel complete, not abrupt
- Long vignettes unchanged
- Build passes

---

## Success Criteria

- [ ] ALL `chaotic` vignettes re-tagged to `perfect` (92 vignettes)
- [ ] Stage completion accepts any non-default, non-funny_fail vignette
- [ ] Duplicate prop spawns use unique IDs (`pot_1`, `pot_2`, etc.)
- [ ] Pot Tornado: 8 pots visible + orbiting around stage
- [ ] Other "multiply" vignettes fixed with unique IDs + movement
- [ ] Text popups have dark background pill, clearly visible
- [ ] Emote bubbles are larger (64x64 emoji, bordered)
- [ ] Particle effects have 14 particles, bigger spread, no cutoff
- [ ] Short vignettes auto-padded to 6+ steps
- [ ] Build passes with 0 TS errors
- [ ] Manual test: mage-kitchen Levitate+Multiply → 8 pots orbiting, FULL_SUCCESS
