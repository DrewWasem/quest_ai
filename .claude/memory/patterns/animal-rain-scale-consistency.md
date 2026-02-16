# Animal & Rain Scale Consistency via resolvePropScale

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** pattern, scale, animals, rain, scene-player, prop-scale, consistency

## Summary

Animals were hardcoded to `scale: 0.8` in 3 locations, ignoring the PROP_SCALE lookup table. Rain props had an arbitrary `* 0.6` reduction. Fixed by using `resolvePropScale()` consistently everywhere and bumping Quaternius animal scale values.

## Details

### The Bug

Three separate places set animal scale to 0.8:
1. `handleSpawn` animal branch
2. `handleSpawnCharacter` animal branch
3. Stale closure fallback animal reconstruction

Rain items in `handleSpawnRain` applied `resolvePropScale(asset) * 0.6`.

### The Fix

1. **Bumped PROP_SCALE for Quaternius animals:**
   ```ts
   cat: 2.5, dog: 2.5, horse: 2.0, chicken: 2.5, deer: 2.0, penguin: 2.5, tiger: 2.0
   ```
   (Were all 0.8-1.0)

2. **Replaced all 3 hardcoded 0.8 with:**
   ```ts
   scale: resolvePropScale(actorId) || resolvePropScale(baseId) || 2.0
   ```

3. **Removed rain * 0.6:**
   ```ts
   scale: resolvePropScale(asset)  // was: resolvePropScale(asset) * 0.6
   ```

4. **Updated AnimalCharacter3D render fallback:**
   ```ts
   scale={actor.scale || 2.0}  // was: 0.8
   ```

### Rule

**Never hardcode scale for any actor type.** Always use `resolvePropScale()` which checks the PROP_SCALE table with fuzzy matching. The 2.0 fallback is appropriate for Quaternius animals at character scale.

## Related
- `frontend/src/game/ScenePlayer3D.tsx` — PROP_SCALE table, handleSpawn, handleSpawnRain
- `patterns/food-mega-pack-integration.md` — Similar scale consistency pattern
