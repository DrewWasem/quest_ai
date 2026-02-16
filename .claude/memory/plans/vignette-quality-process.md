# Plan: Vignette Quality Process & Systematic Fixes

**Created:** 2026-02-15
**Status:** DRAFT — awaiting approval
**Estimated Phases:** 5 (each 2-5 min)

## Problem Summary

User played mage-kitchen Stage 2 with Tiny Spark + Fireball + Explode! and encountered:
1. **Nonsensical description**: "your Wild Stove suddenly sprouts WAY Too Many dancing feet and Explode!!" — caused by Haiku generating bad sentence templates on mount
2. **Stove overlaps witch/mage**: Both spawn at center, stove is 2.0x scale (too large)
3. **Too short, not exciting**: Default vignette has no fireballs or explosions despite user selecting those options
4. **Wrong vignette matched**: Got "Gentle Cook!" when user picked "Explode!" — only 2 of 144 combos have authored vignettes
5. **Emote text too short**: 2000ms auto-remove — text disappears before kids can read it

User played mage-kitchen Stage 3 (Combo Master) with Fireball + Ice Blast + Wild! + Haunted Oven:
6. **Combo counter broken**: Got "PERFECT!" and "STEAM EXPLOSION!" (correct vignette) but shows **0/4** Secret Combos Discovered and "Try Again"
   - **Root cause:** `FeedbackCard.tsx:149` — formula `discoveredCount - 1` assumes the default vignette is always in the discovered set. But if the user's first play is a NON-default (Steam Explosion), `discoveredIds.size` = 1, and `1 - 1 = 0`.
   - **Fix:** Pass non-default count directly from MadLibsInput instead of subtracting in FeedbackCard.

Separate observation: "text was not in the chat bubble" on a different vignette.

---

## Phase 1: Fix Systemic Engine Issues (P0 — QUICK FIXES)

**Files:** `ScenePlayer3D.tsx`, `sentence-generator.ts`, `MadLibsInput.tsx`

### Task 1.1: Disable AI sentence generator — use hardcoded templates only
- **File:** `frontend/src/components/MadLibsInput.tsx:73-86`
- **Change:** Remove the `useEffect` that calls `generateSentenceTemplate` on mount
- **Also remove:** The refresh button that calls `handleRefreshSentence` (lines 114-123)
- **Why:** Haiku generates sentences with irrelevant filler ("dancing feet") that make no sense with many option combos. The hardcoded templates are well-crafted and always coherent.
- **Impact:** No more nonsensical "dancing feet" type descriptions

### Task 1.2: Increase emote text duration
- **File:** `frontend/src/game/ScenePlayer3D.tsx:3910`
- **Change:** Emote auto-remove `2000` → `3500` ms
- **Why:** Text in speech bubbles disappears too fast for kids to read

### Task 1.3: Fix Level 3 combo counter
- **File:** `frontend/src/components/MadLibsInput.tsx:222`
- **Change:** Instead of `discoveredCount={discoveredIds.size}`, pass:
  `discoveredCount={[...discoveredIds].filter(id => id !== stage.defaultVignette.id).length}`
- **File:** `frontend/src/components/FeedbackCard.tsx:149`
- **Change:** Remove the `-1` subtraction: `{discoveredCount}/{comboRequired}` (no longer needed since count already excludes default)
- **Also fix line 155:** progress bar width calculation — remove the `discoveredCount - 1`
- **Why:** The current formula assumes default is always discovered first. When a non-default combo is found first, count shows 0 instead of 1.

### Task 1.4: Reduce stove and kitchen appliance prop scales
- **File:** `frontend/src/game/ScenePlayer3D.tsx` — PROP_SCALE map
- **Change:** `stove: 2.0` → `stove: 1.0`, and `fridge: 2.0` → `fridge: 1.2`, `oven: 2.0` → `oven: 1.0`
- **Why:** At 2.0x, stove is massive and overlaps characters. Kitchen appliances should be roughly character-height.

### Verification
- Build passes
- Mad Libs shows hardcoded template (no AI generation)
- Emotes visible for 3.5s
- Stove ~character height

---

## Phase 2: Fix Mage-Kitchen Vignette Coverage (P1 — SPECIFIC FIX)

**Files:** `frontend/src/data/vignettes/mage-kitchen.ts`

### Root Cause
Stage 2 has 5 slots × 4-6 options each = **144 combinations** but only **2 authored vignettes**:
- `mk2_tiny_fire_cook` (tiny + fire_spell + cook_perfectly)
- `mk2_mega_fire_explode` (mega + fire_spell + explode)

98.6% of valid inputs hit fallback/pair-match. The resolver picks the closest partial match, which often produces wrong scene content (e.g., "Gentle Cook" when user expects "Explode!").

### Task 2.1: Add wildcard vignettes for each RESULT type in Stage 2
For Stage 2, the RESULT slot is the most impactful. Add 4 new wildcard vignettes:
- `mk2_any_explode`: trigger `{ intensity: '*', spell: '*', result: 'explode' }` — EXPLOSION scene with fireballs, camera shake, smoke
- `mk2_any_dance`: trigger `{ intensity: '*', spell: '*', result: 'dance' }` — DANCE scene with characters dancing
- `mk2_any_multiply`: trigger `{ intensity: '*', spell: '*', result: 'multiply' }` — MULTIPLY scene with multiple props
- `mk2_any_go_wild`: trigger `{ intensity: '*', spell: '*', result: 'go_wild' }` — GO WILD scene with chaos

Each vignette should:
- Spawn the mage + witch at separated positions (NOT both at center)
- Use movement templates for dynamic action
- Have 10+ steps with effects, camera shakes, sound
- Match the RESULT expectation (explosions for explode, dancing for dance, etc.)
- Use `promptScore: 'perfect'` so any selection progresses

### Task 2.2: Fix Stage 2 default vignette position overlap
- **Current:** Mage spawns at `off-left` → moves to `ds-center`; stove at `cs-center` (only 1.5u apart)
- **Fix:** Mage to `cs-left`, stove/appliance to `cs-right` — clear separation

### Task 2.3: Apply same wildcard pattern to Stage 1
Stage 1 has 36 vignettes (SPELL×RESULT pairs), which is better coverage but still misses some combos. Check default vignette has proper position spread.

### Verification
- Tiny Spark + Fireball + Explode! → plays explosion scene with fireballs, NOT "Gentle Cook"
- Stove and mage don't overlap
- All 6 RESULT options have dedicated vignettes
- Build passes

---

## Phase 3: Audit & Fix All Other Zones (P2 — SYSTEMATIC)

**Files:** All 7 vignette files + quest-stages.ts

### The Process (apply to each zone):

**Step 1: Coverage Check**
- Count unique vignettes vs possible combinations per stage
- Ensure every high-impact slot value (RESULT, ENTERTAINMENT, FOOD) has at least one wildcard vignette
- Default vignettes should feel fun, not punitive ("you were vague" when user WAS specific)

**Step 2: Position Overlap Check**
- Characters and props should NOT spawn at the same position
- Minimum 2 units between character and nearest prop
- Default positions: characters at ds/cs-left, props at cs-right/us-center

**Step 3: Step Count Check**
- Already handled by VIGNETTE_OUTRO auto-pad (<6 steps get outro appended)
- Spot-check that key vignettes have 8+ steps with variety

**Step 4: Content Coherence Check**
- Default vignette feedback should NOT say "you were vague" when the kid selected all options
- Feedback should be encouraging, not critical
- Ensure feedback title matches what actually happens on screen

### Task 3.1: Audit all 7 zones
Run the 4-step process above on each zone. Flag issues in a checklist.

### Task 3.2: Fix flagged issues
- Add missing wildcard vignettes where needed
- Fix position overlaps in default vignettes
- Rewrite punitive default feedback to be encouraging

### Verification
- Each stage has wildcard vignettes covering all high-impact slot values
- No position overlaps in default vignettes
- Default feedback is encouraging
- Build passes

---

## Phase 4: Fix Emote Text Rendering (P3 — POLISH)

**Files:** `frontend/src/game/ScenePlayer3D.tsx`

### Task 4.1: Ensure emote text wraps properly
- Check the emote bubble container allows text wrapping
- Currently `whitespace-nowrap` may be set — if so, change to allow wrapping
- Long emote text should wrap within the bubble, not overflow

### Task 4.2: Add max-width to emote bubbles
- Add `maxWidth: '200px'` to emote container
- This ensures long text wraps within a reasonable bubble size

### Verification
- Emote text visible and readable for 3.5s
- Long text wraps within bubble
- Build passes

---

## Success Criteria

- [ ] No AI-generated sentence templates — always use hardcoded
- [ ] Emote text lasts 3.5s (was 2s)
- [ ] Level 3 combo counter: shows 1/4 after first non-default combo found (was 0/4)
- [ ] Stove/kitchen props at ~character height (scale 1.0-1.2x)
- [ ] Mage-kitchen Stage 2: all 6 RESULT types have wildcard vignettes
- [ ] No position overlaps in default vignettes (characters ≥2u from props)
- [ ] Default feedback encouraging, not punitive
- [ ] All zones audited with 4-step process
- [ ] Emote text wraps properly in bubbles
- [ ] Build passes with 0 TS errors
