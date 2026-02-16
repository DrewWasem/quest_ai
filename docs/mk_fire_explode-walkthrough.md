# mk_fire_explode — "Pot Rocket Launch" Walkthrough

**File:** `frontend/src/data/vignettes/mage-kitchen.ts` (line 101)
**Demo URL:** `http://localhost:5175/?demo=mage-kitchen&start=2`
**Console:** `window.__runZone('mage-kitchen', 2)`

---

## Overview

| Field | Value |
|-------|-------|
| ID | `mk_fire_explode` |
| Description | Pot launches like a rocket, food rains from sky while cat dodges |
| Trigger | `{ spell: 'fire_spell', appliance: '*', result: 'explode' }` |
| Tier | spectacular |
| Prompt Score | chaotic |
| Total Steps | 31 |
| Estimated Runtime | ~16s (with `VIGNETTE_GAP_SPEED=2`) |

## Speed Constants

| Constant | Value | Used By |
|----------|-------|---------|
| `GAP_SPEED` | 6 | Raw script playback (Claude API responses) |
| `VIGNETTE_GAP_SPEED` | 2 | Vignette playback (authored `delayAfter` values) |

All `delayAfter` values below are **authored** seconds. Runtime = authored / `VIGNETTE_GAP_SPEED` (2).

---

## ACT 1: SETUP — Narrator + Scene + Props

### Step 1 — `NARRATOR("The mage casts fire on a bubbling pot...")`

| Action | Detail |
|--------|--------|
| `text_popup` | "The mage casts fire on a bubbling pot..." at center, large |
| **delayAfter** | 1.5s authored → **750ms** runtime |

### Steps 2-3 — `OBJECT_SPIN_IN('stove', 'cs-center')`

| Step | Actions | delayAfter (authored → runtime) |
|------|---------|------|
| 2 | `spawn` stove at off-left + `sfx` whoosh | 0.1s → 50ms |
| 3 | `move` stove to cs-center (arc) + `react` sparkle-magic at cs-center | 0.8s → 400ms |

### Steps 4-5 — `OBJECT_DROP('pot', 'cs-center')`

| Step | Actions | delayAfter |
|------|---------|------|
| 4 | `spawn` pot at cs-center (drop style) + `sfx` thud | 0.5s → 250ms |
| 5 | `react` dust at cs-center | 0.3s → 150ms |

### Steps 6-8 — `TELEPORT_IN('mage', 'ds-left')`

| Step | Actions | delayAfter |
|------|---------|------|
| 6 | `screen_flash` white 0.15s + `sfx` magic | 0.2s → 100ms |
| 7 | `spawn_character` mage at ds-left + `react` sparkle-magic | 0.5s → 250ms |
| 8 | `animate` mage → Idle_A | 0.3s → 150ms |

---

## ACT 2: INTENT — Character Speaks + Casts Spell

### Steps 9-10 — `CHARACTER_EXCLAIM('mage', 'nervous', 'Maximum heat!')`

| Step | Actions | delayAfter |
|------|---------|------|
| 9 | `animate` mage Cheering + `emote` nervous / "Maximum heat!" + `camera_shake` 0.2/0.3s | 2.0s → 1000ms |
| 10 | `animate` mage → Idle_A | 0.3s → 150ms |

### Steps 11-13 — `SPELL_CAST('mage', 'cs-center')`

| Step | Actions | delayAfter |
|------|---------|------|
| 11 | `animate` mage Casting_Long + `sfx` magic | 0.5s → 250ms |
| 12 | `react` sparkle-magic + `react` magic_circle at cs-center + `screen_flash` purple | 0.8s → 400ms |
| 13 | `animate` mage → Idle_A | 0.3s → 150ms |

---

## ACT 3: EXPLOSION SEQUENCE

### Step 14 — `ANNOUNCE('FIRE OVERLOAD!')`

| Action | Detail |
|--------|--------|
| `text_popup` | "FIRE OVERLOAD!" at center, huge |
| `sfx` | react |
| **delayAfter** | 1.5s → **750ms** |

### Step 15 — `DRAMATIC_PAUSE()`

| Action | Detail |
|--------|--------|
| `delay` | 1500ms engine action (÷ VIGNETTE_GAP_SPEED=2 → **750ms** wait) |
| **delayAfter** | 1.5s → **750ms** |
| **Total pause** | ~**1500ms** of silence before the boom |

### Step 16 — Pot Launch (custom parallel block)

| Action | Detail |
|--------|--------|
| `move` pot → off-top (arc) | Pot rockets upward out of frame |
| `react` smoke at cs-center | Smoke cloud where pot was |
| `sfx` explosion | Boom sound |
| `camera_shake` 0.7 intensity, 1s | Heavy screen shake |
| **delayAfter** | 0.5s → **250ms** |

### Step 17 — `remove` pot (persistence fix)

| Action | Detail |
|--------|--------|
| `remove` pot | Cleans up pot entity (was floating at Y=5 indefinitely) |
| **delayAfter** | 0.1s → 50ms |

### Step 18 — `FLASH('orange', 0.3)`

| Action | Detail |
|--------|--------|
| `screen_flash` orange 0.3s + `sfx` impact | Orange explosion flash |
| **delayAfter** | 0.3s → **150ms** |

### Step 19 — `IMPACT()`

| Action | Detail |
|--------|--------|
| `screen_flash` white 0.2s + `camera_shake` 0.5/0.5s + `sfx` impact | Secondary shockwave |
| **delayAfter** | 0.6s → **300ms** |

### Step 20 — `remove` stove (persistence fix)

| Action | Detail |
|--------|--------|
| `remove` stove | Stove blown up — clean it off stage |
| **delayAfter** | 0.1s → 50ms |

### Step 21 — `OBJECT_RAIN('burger', 6, 'wide')`

| Action | Detail |
|--------|--------|
| `spawn_rain` 6x burgers, wide spread | Burgers fall from sky with bounce, staggered 40ms apart |
| **delayAfter** | 2.0s → **1000ms** — time for burgers to visibly land |

---

## ACT 4: CONSEQUENCE — Panic Reactions

### Step 22 — `CROWD_GASP([])`

| Action | Detail |
|--------|--------|
| `crowd_react` all characters → Hit_A + `sfx` react | Everyone recoils in shock |
| **delayAfter** | 0.8s → **400ms** |

### Steps 23-25 — `CHARGE_IN_RIGHT('cat', 'cs-right')`

| Step | Actions | delayAfter |
|------|---------|------|
| 23 | `spawn_character` cat at off-right + `animate` Running_A + `sfx` whoosh | 0.2s → 100ms |
| 24 | `move` cat → cs-right (linear) | 0.8s → 400ms |
| 25 | `animate` cat → Idle_A | 0.2s → **100ms** — cat visible for a beat |

### Steps 26-27 — `FLEE_LEFT('cat')`

| Step | Actions | delayAfter |
|------|---------|------|
| 26 | `animate` cat Running_A + `react` scared + `sfx` whoosh | 0.2s → 100ms |
| 27 | `move` cat → off-left + `emote` scared / "AHHHH!" | 1.0s → 500ms |

### Step 28 — `EMOTIONAL_REACT('mage', 'shock-lines', 'ds-left')`

| Action | Detail |
|--------|--------|
| `react` shock-lines at ds-left + `animate` mage Hit_A | Mage recoils in shock |
| **delayAfter** | 0.8s → **400ms** |

---

## ACT 5: RESOLUTION — Disappointment + Narrator

### Steps 29-30 — `DISAPPOINTMENT(['mage'])`

| Step | Actions | delayAfter |
|------|---------|------|
| 29 | `animate` mage Hit_A + `react` sad-cloud + `sfx` fail | 0.5s → 250ms |
| 30 | `react` question-marks at cs-center | 1.0s → 500ms |

### Step 31 — `NARRATOR("Fire + explode = KABOOM! Too much heat caused chaos!")`

| Action | Detail |
|--------|--------|
| `text_popup` | "Fire + explode = KABOOM! Too much heat caused chaos!" at center, large |
| **delayAfter** | 1.5s → **750ms** |

---

## Feedback Card

| Field | Value |
|-------|-------|
| Title | POT ROCKET |
| Message | Fire + explode = the pot launched into orbit! At least the cat escaped. |
| Skill Taught | Consequence |
| Tip | Think about what happens when you combine fire with "explode" — boom! |

---

## Timing Comparison: Before vs After

| Metric | GAP_SPEED=6 (before) | VIGNETTE_GAP_SPEED=2 (after) |
|--------|---------------------|------------------------------|
| DRAMATIC_PAUSE total | 500ms | 1500ms |
| Non-move step gaps | 33-250ms | 100-750ms |
| Cat idle at cs-right | 33ms | 100ms |
| OBJECT_RAIN wait | 333ms | 1000ms |
| Total scene time | ~9.8s | ~16s |

## Persistence Fixes

| Issue | Before | After |
|-------|--------|-------|
| Pot at Y=5 | Floated indefinitely after arc to off-top | Removed at step 17 |
| Stove at cs-center | Lingered after "exploding" | Removed at step 20 |
