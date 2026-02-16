# DRAMATIC_PAUSE Double Millisecond Conversion

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** bug, vignette, timing, scene-player, dramatic-pause, delay

## Summary

DRAMATIC_PAUSE macro creates `{ action: 'delay', duration: 1500 }` (already in ms). The `vignetteActionToEngineAction` converter multiplied by 1000 again, creating a 1,500,000ms (25-minute) delay that hung the scene. Same bug existed in `vignette-resolver.ts` flat converter.

## Details

### The Bug

In `movement-templates.ts`:
```ts
export function DRAMATIC_PAUSE(seconds = 1.5): VignetteStep[] {
  return [{ parallel: [{ action: 'delay', duration: seconds * 1000 }], delayAfter: seconds }]
}
```

In `ScenePlayer3D.tsx` vignetteActionToEngineAction:
```ts
case 'delay':
  return { type: 'delay', duration_ms: (va.duration ?? 1) * 1000 }  // BUG: 1500 * 1000 = 1,500,000ms
```

In `vignette-resolver.ts` flat converter:
```ts
case 'delay':
  return { type: 'wait', duration_ms: (va.duration ?? 1) * 1000, delay_ms }  // Same bug
```

### The Fix

Remove the `* 1000` multiplication in both converters since duration is already in ms:

```ts
// ScenePlayer3D.tsx
case 'delay':
  return { type: 'delay' as any, duration_ms: va.duration ?? 1000 }

// vignette-resolver.ts
case 'delay':
  return { type: 'wait', duration_ms: va.duration ?? 1000, delay_ms }
```

### Impact

14 vignettes across 4 zones use DRAMATIC_PAUSE — ALL were affected. Runtime: `1,500,000 / VIGNETTE_GAP_SPEED(2) = 750,000ms = 12.5 minutes` of apparent hang.

### Symptoms

Scene plays normally until DRAMATIC_PAUSE, then appears to freeze. No error in console — just an extremely long wait.

## Related
- `frontend/src/game/ScenePlayer3D.tsx` — vignetteActionToEngineAction delay case
- `frontend/src/services/vignette-resolver.ts` — flat converter delay case
- `frontend/src/data/movement-templates.ts` — DRAMATIC_PAUSE macro
