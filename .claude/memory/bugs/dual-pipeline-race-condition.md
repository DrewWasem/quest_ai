# Dual Pipeline Race Condition (Script vs Vignette)

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** bug, vignette, scene-player, race-condition, pipeline, demo-runner

## Summary

ScenePlayer3D has two useEffects — one for raw `script` (flat sequential actions) and one for `vignetteSteps` (parallel step-based). Zone demo runner sets BOTH simultaneously, causing the script effect to fire first, grab the `playingRef` lock, and block the vignette effect from ever executing.

## Details

### The Bug

Zone demo runner (`zone-demo-runner.ts`) sets both `lastScript` and `vignetteSteps` in the game store simultaneously when triggering a vignette. In ScenePlayer3D:

1. **Script useEffect** (watches `lastScript`) fires first, acquires `playingRef`
2. **Vignette useEffect** (watches `vignetteSteps`) fires next, sees `playingRef` is locked, bails out
3. Result: raw script pipeline runs (wrong format), vignette pipeline never executes

### The Fix

Added early return at the top of the script effect when vignette steps are present:

```ts
// In the script useEffect:
if (vignetteSteps && vignetteSteps.length > 0) {
  return  // Let the vignette pipeline handle playback
}
```

### Why This Only Affects Demo Runner

Normal gameplay only sets one pipeline at a time. The zone demo runner's `buildVignetteScript` function sets both for compatibility, creating this race.

## Related
- `frontend/src/game/ScenePlayer3D.tsx` — both useEffects (~line 3318)
- `frontend/src/services/zone-demo-runner.ts` — sets both lastScript and vignetteSteps
- `bugs/react-stale-closure-in-scene-player.md` — related async state bug
