# Demo Runner Wake-up Signal Pattern

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** pattern, demo-runner, signal, interruptible-sleep, vignette-completion

## Summary
Both demo runners use an `interruptSleep()` pattern with module-level `sleepResolve` callback. Export a signal function that calls `interruptSleep()` when vignette completes, allowing React to wake the runner instead of relying on duration estimates.

## Details

### Pattern Structure

**1. Module-Level Sleep Controller**
```typescript
let sleepResolve: (() => void) | null = null;

function interruptSleep() {
  if (sleepResolve) {
    sleepResolve();
    sleepResolve = null;
  }
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    sleepResolve = resolve;
    setTimeout(() => {
      sleepResolve = null;
      resolve();
    }, ms);
  });
}
```

**2. Export Signal Functions**
```typescript
// zone-demo-runner.ts
export function signalVignetteComplete() {
  if (running) {
    console.log('[ZoneDemoRunner] Vignette complete signal received');
    interruptSleep();
  }
}

// demo-runner.ts
export function signalShowcaseVignetteComplete() {
  if (running) {
    console.log('[DemoRunner] Showcase vignette complete signal');
    interruptSleep();
  }
}
```

**3. Wire in React**
```typescript
// App.tsx
import { signalVignetteComplete } from './utils/zone-demo-runner';
import { signalShowcaseVignetteComplete } from './utils/demo-runner';

<ScenePlayer3D
  onComplete={() => {
    signalVignetteComplete();
    signalShowcaseVignetteComplete();
  }}
/>
```

**4. Window Exposure (Dev Tools)**
```typescript
window.__signalVignetteComplete = signalVignetteComplete;
window.__signalShowcaseComplete = signalShowcaseVignetteComplete;
```

### Benefits
- **Accurate timing:** No need to estimate vignette duration
- **Early wake:** Runner wakes immediately when ScenePlayer3D finishes
- **Safety net:** `estimateDuration()` still caps max wait time
- **Testable:** Can manually trigger from dev console

### Use Cases
- Video recording automation (minimize dead time between vignettes)
- Zone demo playback (`?demo=zone-name`)
- Showcase demo playback (`?demo=showcase`)

## Related
- `/Users/LuffyDMonkey/claude_projects/kids_ai_game/frontend/src/utils/zone-demo-runner.ts`
- `/Users/LuffyDMonkey/claude_projects/kids_ai_game/frontend/src/utils/demo-runner.ts`
- `/Users/LuffyDMonkey/claude_projects/kids_ai_game/frontend/src/App.tsx`
- Bug: [Demo Runner estimateDuration Overestimate](../bugs/demo-runner-estimate-duration-overestimate.md)
