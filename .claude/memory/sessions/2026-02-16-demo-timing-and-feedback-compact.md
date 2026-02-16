# Demo Timing Fixes & FeedbackCard Compact

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** session, demo-runner, timing, feedback-card, ui, bug-fixes

## Summary
Fixed demo runner timing issues causing 20-30s dead time between vignettes, and compacted FeedbackCard layout to save vertical space.

## Work Completed

### 1. Demo Runner Timing Fix
**Problem:** Both `zone-demo-runner.ts` and `demo-runner.ts` used `estimateDuration()` with formula `baseTime * 2.5 + 3000`, vastly overestimating actual vignette playback time (estimated 32s, actual 16s).

**Solution (three parts):**
1. **Completion signal pattern:** Added `signalVignetteComplete()` / `signalShowcaseVignetteComplete()` functions that call `interruptSleep()` when ScenePlayer3D finishes
2. **Fixed formula:** Changed to `delayAfter * 500 + 800` per step (accounts for VIGNETTE_GAP_SPEED=2), removed 2.5x multiplier
3. **Reduced pauses:** Zone runner 5s → 2s, showcase runner 10s → 2s between vignettes

**Files:**
- `frontend/src/utils/zone-demo-runner.ts`
- `frontend/src/utils/demo-runner.ts`
- `frontend/src/App.tsx` (wired `onComplete` to both signal functions)

**Result:** Vignettes now transition smoothly with minimal dead time, ideal for video recording.

### 2. FeedbackCard Compact Layout
**Changes:**
- Single-row header: score badge (🔥 CHAOS!), discovery count (1/37), title (POT ROCKET)
- Reduced padding: `p-5` → `px-4 py-3`
- Smaller text: `text-base` → `text-sm` (message), `text-sm` → `text-xs` (tip)
- Compact buttons: `py-2.5` → `py-1.5`

**Files:**
- `frontend/src/components/FeedbackCard.tsx`

**Result:** Saved ~40px vertical space, prevents card from pushing game canvas up.

## Memory Entries Created
1. **Bug:** [Demo Runner estimateDuration Overestimate](../bugs/demo-runner-estimate-duration-overestimate.md)
2. **Pattern:** [Demo Runner Wake-up Signal](../patterns/demo-runner-wakeup-signal.md)
3. **Decision:** [FeedbackCard Compact Layout](../decisions/feedback-card-compact-layout.md)

## Context
- Part of final polish before hackathon submission (Feb 16)
- Demo runner improvements enable smooth video recording for submission
- FeedbackCard compact aligns with Brand Brief v2 principle: "Game is the star, UI is the wrapper"

## Related Sessions
- [Demo Runner & Logo Processing](2026-02-16-demo-runner-and-logos.md) — Initial demo runner implementation
- [Vignette Timing Fixes](2026-02-16-vignette-timing-fixes.md) — Scene-level timing fixes
