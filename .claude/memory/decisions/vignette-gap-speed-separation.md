# VIGNETTE_GAP_SPEED Separation from GAP_SPEED

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** decision, vignette, timing, scene-player, playback-speed

## Summary

Introduced `VIGNETTE_GAP_SPEED = 2` constant separate from `GAP_SPEED = 6` to give authored vignettes 3x more breathing room than raw Claude API scripts. This fixes the fundamental timing mismatch where move tweens played at full duration but delayAfter values were divided by 6.

## Details

### The Problem

- **Move tweens** play at full duration (600-2500ms, distance-based) — NOT scaled
- **delayAfter** values divided by GAP_SPEED=6 (authored 0.5s -> 83ms, authored 1.5s -> 250ms)
- **Auto-remove timers** (text 2000ms, emote 6500ms, rain 3500ms) — NOT scaled
- Result: Non-move steps flash by in 33-250ms. Dramatic pauses aren't dramatic.

### The Fix

```ts
const GAP_SPEED = 6       // Raw script paths (Claude API responses) — fast playback
const VIGNETTE_GAP_SPEED = 2  // Vignettes — authored delays / 2 (3x more breathing room)
```

Applied to 3 locations:
1. Delay action duration: `duration_ms / VIGNETTE_GAP_SPEED`
2. Vignette delayAfter: `delayAfter / VIGNETTE_GAP_SPEED`
3. Rain stagger timing: `stagger / VIGNETTE_GAP_SPEED`

Raw script paths at 2 locations keep `GAP_SPEED = 6`.

### Timing Impact (mk_fire_explode example)

| Metric | GAP_SPEED=6 (before) | VIGNETTE_GAP_SPEED=2 (after) |
|--------|---------------------|------------------------------|
| DRAMATIC_PAUSE total | 500ms | 1500ms |
| Non-move step gaps | 33-250ms | 100-750ms |
| Cat idle at cs-right | 33ms | 100ms |
| OBJECT_RAIN wait | 333ms | 1000ms |
| Total scene time | ~9.8s | ~16s |

## Related
- `frontend/src/game/ScenePlayer3D.tsx` — GAP_SPEED and VIGNETTE_GAP_SPEED constants
- `docs/mk_fire_explode-walkthrough.md` — Detailed timing walkthrough
