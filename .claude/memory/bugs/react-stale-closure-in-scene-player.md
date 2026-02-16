# React Stale Closure in ScenePlayer3D

**Created:** 2026-02-15
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** react, stale-closure, refs, state, scene-player, movement-templates, vignette, animals, props

## Summary

Movement templates that auto-spawn characters failed because `handleMove` used closure-captured `actors` state (async/batched) while `spawnedIds.current` ref was already updated (synchronous). This created a race where the actor was marked as spawned but not yet visible in the closure state, causing moves to silently abort.

## Details

### The Bug Pattern

In `ScenePlayer3D.tsx`:
1. `handleSpawn` updates **two** sources:
   - `spawnedIds.current.add(id)` — ref, **synchronous**
   - `setActors(prev => [...prev, newActor])` — state, **async/batched**
2. Movement templates call `handleMove` shortly after via `setTimeout(..., 100)`
3. `handleMove` checks `if (!spawnedIds.current.has(target))` → auto-spawn path
4. But it also does `const actor = actors.find(a => a.id === target)`
5. **Race condition:** `spawnedIds.current.has(target)` returns `true` (ref already updated) but `actor` is `null` (closure state hasn't caught up)
6. Result: skips auto-spawn path (already in spawnedIds) → but actor is null → move silently aborted
7. Character like "barbarian" spawned via CHARGE_IN_RIGHT template never appears

### Why handleAnimate Doesn't Have This Bug

`handleAnimate` uses a **functional updater**:
```ts
setActors(prev => prev.map(a =>
  a.id === target ? { ...a, currentAnim } : a
))
```
This reads the latest state at the time of execution, not closure-captured state.

### The Fix

Added a fallback in `handleMove`:
```ts
let actor = actors.find(a => a.id === target);

// Fallback for race: spawned (ref updated) but not yet in closure state
if (!actor && spawnedIds.current.has(target) && actorPositionsRef.current.has(target)) {
  const pos = actorPositionsRef.current.get(target)!;
  actor = { id: target, position: pos, currentAnim: 'Idle' };
}
```

Since `actorPositionsRef.current` is **also a ref** (updated synchronously in `handleSpawn`), it's safe to read immediately after `spawnedIds` check.

### Root Cause Analysis

**React state updates are batched and async.** When you call `setActors`, the closure-captured `actors` variable doesn't update until the next render. But refs (`.current`) update immediately.

**When to use refs vs state:**
- Use **refs** for synchronous reads after writes (like `spawnedIds`, `actorPositionsRef`)
- Use **state** for UI rendering and triggering re-renders
- When mixing both, **always prefer refs for synchronous coordination** between actions

**Functional updaters** (`setState(prev => ...)`) are the safe alternative when you need latest state without refs.

## The Pattern (Reusable)

If you have:
- A ref tracking IDs (e.g., `spawnedIds.current`)
- A state array (e.g., `actors`)
- A function that reads from the state array based on the ref

**You have a stale closure risk.**

Fix: either use functional updaters OR maintain a parallel ref for the data you need to read synchronously.

## Extension: All Actor Types (2026-02-16)

The original fix only reconstructed **characters** in the fallback. Vignettes that move props (stove) or animals (cat) hit the same stale closure — `actors.find()` returns null, but the fallback didn't know how to reconstruct non-character actors.

### Extended Fallback

```ts
if (!currentActor && spawnedIds.current.has(target)) {
  const refPos = actorPositionsRef.current.get(target) || zonePosition(currentZone, [0, 0, 0])
  const characterId = resolveCharacterId(target)
  if (characterId) {
    // Character reconstruction (original fix)
    currentActor = { id: target, type: 'character', characterId, position: refPos, animation: 'Idle_A' }
  } else if (isAnimalModel(target) || isAnimalModel(target.replace(/_\d+$/, ''))) {
    // Animal reconstruction (NEW)
    const baseId = target.replace(/_\d+$/, '')
    currentActor = { id: target, type: 'animal', modelPath: ANIMAL_MODELS[target] ?? ANIMAL_MODELS[baseId], position: refPos, scale: resolvePropScale(target) || 2.0 }
  } else {
    // Prop reconstruction (NEW)
    const propPath = resolvePropPath(target) ?? resolvePropPath(target.replace(/_\d+$/, ''))
    if (propPath) {
      currentActor = { id: target, type: 'prop', modelPath: propPath, position: refPos, scale: resolvePropScale(target) || 1 }
    }
  }
}
```

## Related
- `frontend/src/game/ScenePlayer3D.tsx` — `handleSpawn`, `handleMove`, `handleAnimate`
- `patterns/movement-template-library.md` — Movement templates that triggered this bug
- `patterns/movement-template-pitfalls.md` — CHARGE_IN_RIGHT and similar templates
- `sessions/2026-02-15-docs-update-and-bugfixes.md` — Session where bug was first fixed
- `sessions/2026-02-16-vignette-timing-fixes.md` — Session where fallback was extended
