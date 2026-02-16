# Plan: Show Mad Libs Combo + Feedback During Demo Playback

## Context

Demo runners play vignettes directly by setting `lastScript` + `vignetteSteps` in the gameStore, bypassing the MadLibsInput UI. The user wants demos to show **which Mad Libs combo** triggered each vignette (filled slots visible in the template sentence) and show the **feedback card** after playback — making demos look like real gameplay.

## Problem

- Demo runners extract trigger tags (lowercase: `{ spell: 'fire_spell', result: 'cook_perfectly' }`) but never pass them to the UI
- MadLibsInput's `selectedTags` is local component state, invisible to demo runners
- FeedbackCard only shows when MadLibsInput's `handleGo` flow runs (which demos skip)
- Wildcard triggers (`*`) leave slots unfilled

## Approach

Add `demoTags` to gameStore as the bridge. Demo runners populate it, MadLibsInput reads it.

## Changes

### 1. gameStore.ts — Add `demoTags` field

```ts
// In GameState interface:
demoTags: Record<string, string> | null;  // Pre-filled tags for demo mode
setDemoTags: (tags: Record<string, string> | null) => void;
```

Initialize to `null`, setter just does `set({ demoTags: tags })`.

### 2. demo-runner.ts — Populate demoTags before each vignette

Before setting `lastScript`/`vignetteSteps`, also set `demoTags` with UPPERCASE keys:

```ts
// Build demo tags (uppercase keys for MadLibsInput compatibility)
const demoTags: Record<string, string> = {};
if (vignette.trigger) {
  for (const [key, val] of Object.entries(vignette.trigger)) {
    demoTags[key.toUpperCase()] = val === '*' ? '_random_' : val;
  }
}
setState({ demoTags });
```

Also clear `demoTags: null` when clearing between vignettes.

### 3. zone-demo-runner.ts — Same demoTags population

Identical change as demo-runner.ts.

### 4. MadLibsInput.tsx — Auto-fill from demoTags

Add a `useEffect` that watches `demoTags` from gameStore:

```ts
const demoTags = useGameStore(s => s.demoTags);

useEffect(() => {
  if (!demoTags) return;

  const filled: Record<string, string> = {};
  for (const slot of stage.template.slots) {
    const val = demoTags[slot.id];
    if (val && val !== '_random_') {
      filled[slot.id] = val;
    } else {
      // Wildcard: pick random option
      const options = slotOptions[slot.id] ?? slot.defaultOptions;
      filled[slot.id] = options[Math.floor(Math.random() * options.length)].tag;
    }
  }
  setSelectedTags(filled);

  // Auto-trigger GO after a short delay (let slots animate in)
  setTimeout(() => {
    // Resolve vignette + set feedback
    const vignette = resolveVignette(filled, stage);
    let filledSentence = currentSentence;
    for (const slot of stage.template.slots) {
      const option = (slotOptions[slot.id] ?? slot.defaultOptions).find(o => o.tag === filled[slot.id]);
      filledSentence = filledSentence.replace(`{${slot.id}}`, `**${option?.label ?? filled[slot.id]}**`);
    }
    setFeedback({ vignette, filledSentence, matchExplanation: 'Demo playback' });
    setIsPlaying(true);
  }, 1500);
}, [demoTags]);
```

### 5. MadLibsInput.tsx — Disable interaction during demo

When `demoTags` is set, disable the slot pickers and GO/Randomize buttons:

```ts
const isDemoPlayback = !!demoTags;
```

Add `pointer-events-none opacity-60` to buttons when `isDemoPlayback` is true, but keep the filled template sentence visible.

## Files Modified

| File | Change |
|------|--------|
| `frontend/src/stores/gameStore.ts` | Add `demoTags` + `setDemoTags` |
| `frontend/src/utils/demo-runner.ts` | Set `demoTags` (uppercase keys) before each vignette, clear between |
| `frontend/src/utils/zone-demo-runner.ts` | Same demoTags changes |
| `frontend/src/components/MadLibsInput.tsx` | useEffect to auto-fill from demoTags, show feedback, disable pickers |

## Verification

1. `npm run build` — 0 TS errors
2. `http://localhost:5175/?demo=mage-kitchen&start=2` — mk_fire_explode
   - Mad Libs slots should fill in (SPELL=fire_spell, APPLIANCE=random, RESULT=explode)
   - Template sentence shows filled values with purple highlight
   - After vignette plays, FeedbackCard appears with "POT ROCKET" title
3. `http://localhost:5175/?demo=showcase` — full showcase
   - Each vignette shows its matching combo in the Mad Libs bar
   - Feedback card shows after each one
4. Normal gameplay (no `?demo=`) unchanged — demoTags is null, MadLibsInput works normally
