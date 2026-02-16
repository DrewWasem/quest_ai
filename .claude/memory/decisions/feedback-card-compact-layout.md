# FeedbackCard Compact Layout

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** decision, ui, feedback-card, layout, compact, vertical-space

## Summary
Compacted FeedbackCard to single-row header (score badge, discovery count, title) with reduced padding/text sizes to prevent pushing the game canvas up on screen.

## Details

### Problem
Original FeedbackCard layout used:
- Two-row header (score on one line, title + discovery on another)
- Large padding (`p-5`)
- Standard text sizes (`text-base`, `text-sm`)
- Result: Card took ~200px vertical space, pushing canvas up

### Solution
**Single-row header layout:**
```tsx
<div className="flex items-center gap-2">
  {/* Score badge */}
  <div className="px-2 py-0.5 rounded text-xs font-bold...">
    🔥 CHAOS!
  </div>

  {/* Discovery count */}
  <div className="text-xs text-purple-600">1/37</div>

  {/* Title */}
  <div className="text-sm font-bold flex-1">POT ROCKET</div>
</div>
```

**Size reductions:**
- Padding: `p-5` → `px-4 py-3`
- Message text: `text-base` → `text-sm`
- Tip text: `text-sm` → `text-xs`
- Button padding: `py-2.5` → `py-1.5`
- Net savings: ~40px vertical space

### Rationale
- Game canvas is the star — minimize UI chrome
- Score badge is most important visual signal (kept prominent with emoji)
- Discovery count is secondary metadata (de-emphasized)
- Compact buttons faster to reach (less mouse travel)

### Visual Hierarchy
1. **Score badge** (color + emoji) — immediate feedback
2. **Title** (bold) — what happened
3. **Message** (text-sm) — narrative
4. **Tip** (text-xs, muted) — guidance
5. **Buttons** — action

## Related
- `/Users/LuffyDMonkey/claude_projects/kids_ai_game/frontend/src/components/FeedbackCard.tsx`
- Context: [Brand Brief v2](../context/brand-brief-v2.md) — "Game is the star, UI is the wrapper"
