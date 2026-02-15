# Visual "Wow" Overhaul — Implementation Plan

**Created:** 2026-02-10
**Status:** DRAFT — awaiting approval
**Goal:** Transform Prompt Quest from "colored blocks on a purple screen" to a visually delightful kids' game that wows 8-year-olds

---

## Problem Summary

1. **Characters are colored rectangles** — 8 of 9 actor PNGs are <1KB placeholders (only robot.png has real art)
2. **Effects are emoji text objects** — Real Kenney particle textures exist on disk but aren't used
3. **Animations are basic tweens** — Functional but not expressive (just scale/rotate/position)
4. **UI is polished but static** — Stars don't twinkle, cards don't idle-animate
5. **Celebrations are underwhelming** — FULL_SUCCESS just rains emoji from the top

---

## Phase 1: Character Art — Replace All 9 Actors with SVG Illustrations

**Impact: EXTREME — This is THE #1 improvement**
**Files:** 9 new SVG files + 1 edit to AssetLoader.ts

The green block problem exists because actor PNGs contain placeholder graphics. Solution: create detailed SVG character illustrations (cartoon-style, colorful, expressive, big eyes, friendly).

### Characters to Create

| Actor | Description | Key Features | Size |
|-------|-------------|--------------|------|
| `monster.svg` | Friendly round green monster | Big googly eyes, tiny horns, wide smile with teeth, spotted belly, stubby arms/legs | 256x256 |
| `dog.svg` | Excited golden retriever | Floppy ears, big brown eyes, pink tongue out, wagging tail, collar with tag | 256x256 |
| `trex.svg` | Cute cartoon T-Rex | Green/teal, tiny adorable arms, big head, wide grin, small tail, expressive eyes | 256x256 |
| `octopus.svg` | Purple/pink octopus | 8 curly tentacles, big sparkly eyes, rosy cheeks, suction cups visible | 256x256 |
| `robot.svg` | Friendly boxy robot | (Already has real art — evaluate if replacement needed) | 256x256 |
| `wizard.svg` | Classic wizard | Purple robe, star-covered pointy hat, long white beard, magic wand, twinkling eyes | 256x256 |
| `kid.svg` | Excited child | Bright clothes, backpack, big smile, messy hair, waving hand | 256x256 |
| `fish.svg` | Tropical fish | Bright orange/blue stripes, big round eye, flowing fins, bubble trail | 256x256 |
| `squirrel.svg` | Fluffy squirrel | Big bushy tail, acorn in paws, bright eyes, round ears | 256x256 |

### Technical Changes

1. Create 9 SVG files in `frontend/public/assets/actors/`
2. Update `AssetLoader.ts` line 12-15: Change `load.image()` to `load.svg()` with `{ width: 256, height: 256 }`
3. Remove old placeholder PNGs
4. Update scene `spawnMonster()`/`spawnRobot()`/etc. to remove fallback graphics code (no longer needed with real SVGs)

### Verification
- [ ] All 9 SVG files render at correct size in browser
- [ ] AssetLoader loads all actors via `load.svg()`
- [ ] Each scene displays the real character instead of a colored block
- [ ] SceneScriptPlayer spawns display real characters during script playback

---

## Phase 2: Enhanced Scene Celebrations & Effects

**Impact: HIGH — Makes success feel amazing**
**Files:** SceneScriptPlayer.ts, all 6 scene files

### 2A: Upgrade Post-Script Celebrations

Current FULL_SUCCESS: 30 emoji rain from top. New approach:

**FULL_SUCCESS celebration sequence:**
1. Brief screen flash (white overlay, 100ms fade)
2. Camera zoom-in 5% then back (200ms)
3. Confetti burst from center (using real confetti-burst.png texture, not emoji)
4. Character does a victory dance (extended happy animation)
5. Play `jingle-success` or `jingle-celebrate` SFX
6. Gold sparkle ring expands outward from character

**PARTIAL_SUCCESS:**
1. Character does encouraging gesture (wave)
2. Small sparkle effect
3. Play `partial` SFX

**FUNNY_FAIL (keep fun, make funnier):**
1. Camera shake (already exists)
2. Character does confused animation
3. Funny sound effect (`funny-fail` SFX exists)
4. Comic-style "POW" or "?!" text pop

### 2B: Use Real Particle Textures for React Effects

The Kenney particle textures already exist on disk but aren't loaded. Wire them in:

- `confetti-burst.png` (90KB) — Use as particle texture instead of emoji 🎉
- `explosion-cartoon.png` (109KB) — Use as explosion effect instead of emoji 💥
- `hearts-float` — Load heart particle PNG instead of emoji ❤️
- `sparkle-magic` — Load sparkle particle PNG instead of emoji ✨

**Technical approach:**
1. Add particle texture loads to AssetLoader
2. In `doReact()`, replace `this.scene.add.text()` emoji approach with `this.scene.add.particles()` using loaded textures
3. Keep emoji fallback for any missing textures

### 2C: Add Trail Effects During Move Actions

When actors move (especially `arc` and `bounce` styles), add a subtle sparkle trail behind them using small star particles that fade out.

### Verification
- [ ] FULL_SUCCESS triggers dramatic multi-step celebration
- [ ] FUNNY_FAIL is funny (not just camera shake)
- [ ] Particle textures load and display instead of emoji
- [ ] Move actions leave subtle trails
- [ ] All SFX play at appropriate moments

---

## Phase 3: Richer Character Animations

**Impact: MEDIUM-HIGH — Characters feel alive**
**Files:** SceneScriptPlayer.ts

### 3A: Compound Animations

Replace simple single-property tweens with multi-part animation sequences:

| Animation | Current | Enhanced |
|-----------|---------|----------|
| `happy/dance` | 4 Y-bounces + tilt | Y-bounce + arm-wave + sparkle particles + scale pulse |
| `eat` | 3 horizontal squash | Lean forward + chomp motion + crumb particles + satisfied wobble |
| `confused` | Tilt left-right | Tilt + question mark emote auto-spawn + body shrink-grow |
| `wave` | 3 bounces + tilt | Arm-like tilt sequence + friendly sparkles |
| `laugh` | 6 horizontal shakes | Shakes + scale pulses + tears emoji auto-spawn + bounce |
| `sad` | Droop down | Droop + slight shrink + rain cloud emote + blue tint |

### 3B: Idle Animation for Persistent Characters

Scene characters (monster, robot, wizard, etc.) currently stand perfectly still. Add:
- Gentle breathing effect (scale 1.0 → 1.02 → 1.0, 2s cycle)
- Subtle floating motion (y ±3px, 3s cycle)
- Occasional blink (scale Y briefly to 0.95 then back, random 3-6s interval)

### 3C: Entrance Animation for Persistent Characters

When a scene loads, the main character should enter dramatically:
- Bounce in from off-screen with `Back.easeOut`
- Small sparkle burst on landing
- Play `boing` SFX

### Verification
- [ ] Enhanced animations show visible difference from current
- [ ] Persistent characters have idle breathing/floating
- [ ] Scene load shows character entrance animation
- [ ] No animation breaks or visual glitches

---

## Phase 4: UI Micro-Animations & Polish

**Impact: MEDIUM — Background magic**
**Files:** index.css, tailwind.config.js, App.tsx, PromptInput.tsx

### 4A: Twinkling Star Background

Replace static `.stars-bg` with animated twinkling:
- Add 20-30 small star elements (or CSS pseudo-elements) with randomized `animation-delay`
- Each star: opacity pulse (0 → 0.7 → 0) over 2-4s
- Different sizes (1px, 2px, 3px)
- Scattered across the viewport

### 4B: Card Grid Idle Animations

- Task card emoji: apply `animate-float` (gentle Y-bounce) when card is NOT hovered
- Stagger the float animation delays so cards bob at different times
- Add `animate-sparkle` to the emoji of the currently-selected task card

### 4C: Result Panel Enhancements

- Success badge: continue pulsing after entrance (`animate-bounce-gentle` infinite)
- FULL_SUCCESS result: add gold border glow animation
- Missing elements pills: stagger entrance with `animate-scale-in`

### 4D: Switch to Fredoka for Headings

Fredoka is already loaded but unused. It's rounder, more playful, more kid-appropriate:
- Change `font-heading` from Nunito to Fredoka in tailwind.config.js
- Keep Nunito for body text (still readable)

### 4E: Canvas Border Enhancement

- Add animated glow to the Phaser canvas container
- Glow color matches the current task's success level after a script plays

### Verification
- [ ] Stars twinkle in the background
- [ ] Card emoji float gently when idle
- [ ] Fredoka headings look good across all views
- [ ] Result badges pulse continuously
- [ ] Canvas border glows

---

## Phase 5: Scene Environment Polish

**Impact: MEDIUM — Immersive worlds**
**Files:** All 6 scene files

### 5A: Animated Scene Elements

Add subtle animated details to each scene's `create()` method:

| Scene | Animated Element |
|-------|-----------------|
| MonsterPartyScene | Floating balloons that drift up, sparkle particles in air |
| RobotPizzaScene | Moving clouds in sky, blinking building lights |
| WizardKitchenScene | Floating sparkles, flickering candle glow, steam from soup |
| DinosaurSchoolScene | Swaying trees outside window, ticking clock |
| DogSpaceScene | Twinkling stars, orbiting small asteroids, pulsing moon glow |
| OctopusBandScene | Floating bubbles rising, swaying seaweed, flickering stage lights |

### 5B: Better Narration Text

- Add text stroke (2px dark outline) for readability over backgrounds
- Add drop shadow
- Scale-in entrance animation for narration text (not just typewriter)

### Verification
- [ ] Each scene has at least 2 animated background elements
- [ ] Narration text is readable over all backdrops
- [ ] Animated elements don't distract from script playback

---

## Implementation Order & Priority

| Phase | Priority | Est. Effort | Dependencies |
|-------|----------|-------------|--------------|
| Phase 1 (Character Art) | **P0 — Do First** | High (9 SVGs) | None |
| Phase 2 (Celebrations) | **P1** | Medium | Phase 1 (looks better with real characters) |
| Phase 3 (Animations) | **P1** | Medium | Phase 1 |
| Phase 4 (UI Polish) | **P2** | Low-Medium | None (can parallel) |
| Phase 5 (Scene Polish) | **P2** | Medium | Phase 1 |

**Recommended execution:** Phase 1 → Phase 4 (parallel) → Phase 2 → Phase 3 → Phase 5

---

## Files Modified Summary

| File | Changes |
|------|---------|
| `assets/actors/*.svg` | 9 new SVG character illustrations |
| `AssetLoader.ts` | Change actor loading from PNG to SVG |
| `SceneScriptPlayer.ts` | Enhanced animations, particle effects, trail effects |
| `MonsterPartyScene.ts` | Remove placeholder graphics, add idle/entrance anims, scene elements |
| `RobotPizzaScene.ts` | Same as above |
| `WizardKitchenScene.ts` | Same as above |
| `DinosaurSchoolScene.ts` | Same as above |
| `DogSpaceScene.ts` | Same as above |
| `OctopusBandScene.ts` | Same as above |
| `index.css` | Twinkling stars, enhanced animations |
| `tailwind.config.js` | Fredoka heading, new animation keyframes |
| `App.tsx` | Card idle animations, canvas glow |
| `PromptInput.tsx` | Result badge continuous pulse |

---

## What "Wow" Looks Like When Done

1. **Open the app** → Stars twinkle across a deep purple sky, card emoji float gently
2. **Click Monster Party** → Monster bounces in from off-screen with a sparkle burst and "boing!" sound
3. **Monster idles** → Gentle breathing, occasional blink, subtle float
4. **Type "big cake, balloons, and dancing"** → Loading with animated spinner
5. **FULL_SUCCESS plays** → Screen flashes, cake spawns with particle pop, balloons float in with trails, monster dances with sparkles, confetti EXPLODES everywhere (real particle textures!), victory jingle plays
6. **Result panel** → Gold-glowing "Amazing!" badge pulses, narration types out in emerald
7. **FUNNY_FAIL plays** → Camera shakes, monster looks confused with question marks, comic "POW" text, funny sound effect, orange "Oops!" badge bounces
