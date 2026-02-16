# Vignette Timing Fixes & mk_fire_explode Debugging

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** session, vignette, timing, debugging, scene-player, bug-fixes, scale

## Summary

Major debugging session fixing vignette playback issues. Started with implementing a planned VIGNETTE_GAP_SPEED fix, then iteratively fixed 6+ bugs discovered through user testing of mk_fire_explode vignette.

## Key Outcomes

### Bugs Fixed (10 total)
1. **VIGNETTE_GAP_SPEED = 2** — Separated vignette timing from raw script GAP_SPEED=6
2. **Pot/stove `remove` steps** — Added cleanup for objects after explosions
3. **Dual pipeline race fix** — Script effect yields when vignetteSteps present
4. **`remove` action missing** — Added to vignetteActionToEngineAction and flat converter
5. **`spawn_rain` not awaited** — Was fire-and-forget, errors swallowed
6. **DRAMATIC_PAUSE double ms conversion** — `duration * 1000` on already-ms value = 25 min hang
7. **Stale closure fallback extended** — Now handles animals and props, not just characters
8. **Pot/stove overlap** — Added `cs-center-high` position at Y=1.5
9. **Animal scale hardcoded** — Replaced `0.8` with `resolvePropScale()` everywhere
10. **Rain scale reduction** — Removed arbitrary `* 0.6` multiplier

### Files Modified
- `frontend/src/game/ScenePlayer3D.tsx` — All system-level fixes
- `frontend/src/data/vignettes/mage-kitchen.ts` — Persistence fixes + pot position
- `frontend/src/services/vignette-resolver.ts` — Remove case + delay fix
- `docs/mk_fire_explode-walkthrough.md` — Created timing walkthrough doc

### Debugging Approach
Iterative: implement fix -> user tests -> reports symptom -> trace root cause -> fix.
Added comprehensive step-by-step logging to `executeVignetteSteps` for future debugging.

### Build Status
- 0 TS errors, 679 modules, production build passes
- Scale fixes pending user visual confirmation

## Related
- `bugs/dramatic-pause-double-ms-conversion.md` — The blocking 25-min hang bug
- `bugs/dual-pipeline-race-condition.md` — Demo runner pipeline conflict
- `bugs/react-stale-closure-in-scene-player.md` — Extended for all actor types
- `decisions/vignette-gap-speed-separation.md` — GAP_SPEED vs VIGNETTE_GAP_SPEED
- `patterns/animal-rain-scale-consistency.md` — Scale system fix
