# Demo Runner estimateDuration Overestimate

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** bug, demo-runner, timing, vignette, zone-demo-runner, estimate-duration

## Summary
Both `zone-demo-runner.ts` and `demo-runner.ts` used `estimateDuration()` with formula `baseTime * 2.5 + 3000` (capped at 45s), causing 20-30s dead time after each vignette since actual playback with VIGNETTE_GAP_SPEED=2 finishes in ~16-20s.

## Details

### Root Cause
The `estimateDuration()` function in both demo runners calculated:
```typescript
const baseTime = script.actions.length * 1000 + (script.delayAfter ?? 0) * 1000;
return Math.min(baseTime * 2.5 + 3000, 45000);
```

This assumed:
- 1000ms per action (but VIGNETTE_GAP_SPEED=2 means 500ms gaps)
- `delayAfter` in seconds (but it's actually in multiples of 500ms when VIGNETTE_GAP_SPEED=2)
- 2.5x safety margin + 3s buffer

**Result:** For a 10-action vignette with delayAfter=6, estimated 32.5s but actually took ~16s.

### Symptoms
- Long pauses between vignettes during `?demo=showcase` and `?demo=zone-name`
- Runners slept for full estimated duration even after vignette completed
- Video recordings had 20-30s of dead time per vignette

### Fix (Three Parts)

**1. Completion Signal Pattern**
Added `signalVignetteComplete()` / `signalShowcaseVignetteComplete()` functions that call `interruptSleep()` when ScenePlayer3D finishes:

```typescript
// zone-demo-runner.ts
export function signalVignetteComplete() {
  if (running) {
    console.log('[ZoneDemoRunner] Vignette complete signal received');
    interruptSleep();
  }
}

// App.tsx wires onComplete
onComplete={() => {
  signalVignetteComplete();
  signalShowcaseVignetteComplete();
}}
```

**2. Fixed Formula**
```typescript
// NEW: Account for VIGNETTE_GAP_SPEED=2 (500ms gaps)
const baseTime = script.actions.length * 500 + (script.delayAfter ?? 0) * 500 + 800;
return baseTime; // No 2.5x multiplier
```

Now serves as max timeout safety net, not primary timing.

**3. Reduced Inter-Vignette Pauses**
- Zone runner: 5s → 2s
- Showcase runner: 10s → 2s

## Related
- `/Users/LuffyDMonkey/claude_projects/kids_ai_game/frontend/src/utils/zone-demo-runner.ts`
- `/Users/LuffyDMonkey/claude_projects/kids_ai_game/frontend/src/utils/demo-runner.ts`
- `/Users/LuffyDMonkey/claude_projects/kids_ai_game/frontend/src/App.tsx`
- Pattern: [Demo Runner Wake-up Signal Pattern](../patterns/demo-runner-wakeup-signal.md)
