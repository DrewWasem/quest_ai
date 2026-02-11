# Village World Architecture Decision

**Created:** 2026-02-11
**Last Updated:** 2026-02-11
**Source:** session
**Confidence:** high
**Tags:** architecture, village, zones, navigation, 3d, camera

## Summary

Replaced isolated per-task 3D scenes with a persistent medieval village world. The village is always rendered with hex terrain, buildings, and zone markers. Quest zones (dungeon, park) are areas within the village that the camera flies to when clicked.

## Decision

### Before
- Each of 7 tasks had its own isolated scene (SceneEnvironment3D + TaskAtmosphere + TaskIntro)
- Selecting a task swapped the entire 3D environment
- No sense of place or continuity between tasks

### After
- Single persistent `VillageWorld.tsx` renders the entire village always
- Zones are defined areas within the village at offset positions:
  - Village center: [0, 0, 0]
  - Dungeon (skeleton-birthday): [0, 0, -16]
  - Park (adventurers-picnic): [0, 0, 16]
- `VillageCamera.tsx` handles smooth camera transitions (2s ease-out cubic)
- Clicking a zone marker → camera flies to zone → prompt input appears
- `ScenePlayer3D` offsets all actor positions by zone center via `zonePosition()`

### Key State (gameStore.ts)
- `currentZone: string | null` — null = village center
- `cameraTarget: [number, number, number]` — where camera is heading
- `isTransitioning: boolean` — true during camera fly
- `enterZone(zoneId)` / `exitZone()` actions

### Files Changed
- `VillageWorld.tsx` — NEW, hex terrain + buildings + zones + atmosphere
- `VillageCamera.tsx` — NEW, camera transitions
- `R3FGame.tsx` — stripped to Canvas + VillageCamera + VillageWorld + children
- `App.tsx` — removed task grid, village loads directly
- `ScenePlayer3D.tsx` — added zonePosition() offset helper
- `gameStore.ts` — added zone navigation state

### What Was Removed
- `TaskAtmosphere.tsx` — replaced by VillageAtmosphere in VillageWorld
- `SceneEnvironment3D.tsx` — replaced by zone-specific content in VillageWorld
- `TaskIntro.tsx` — replaced by camera fly transition
- Task selection grid in App.tsx — replaced by zone markers

## Related
- `frontend/src/game/VillageWorld.tsx`
- `frontend/src/game/VillageCamera.tsx`
- `frontend/src/stores/gameStore.ts` — ZONE_CENTERS, VILLAGE_CENTER exports
- `.claude/memory/context/kaykit-scale-reference.md`
