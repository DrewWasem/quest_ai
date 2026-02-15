# Vignette Migration Completion

**Created:** 2026-02-15
**Last Updated:** 2026-02-15
**Source:** session
**Confidence:** high
**Tags:** vignettes, migration, movement-templates, blocking-templates, completion, parallel-agents

## Summary
Completed the full migration of ALL ~470 vignettes across all 7 zones from the legacy `blocking-templates` API to movement template spreads. All TypeScript errors resolved, all blocking-templates imports removed from vignette files.

## Details

### Accomplishments

#### 1. Skeleton-Birthday Migration (Agent ad3d601)
- Migrated all 22 remaining `composeBlocking()` calls to movement template spreads
- Cleaned unused imports: removed `GATHER`, `OBJECT_DROP`, `OBJECT_SPIN_IN`
- TypeScript clean — 0 errors

#### 2. Skeleton-Pizza Blocking-Templates Dependency Fix
- Replaced 15 `setupProps()` calls with inline parallel spawn steps
  - Pattern: `setupProps([{ asset, mark: MARK.X }])` → `{ parallel: [{ action: 'spawn', asset, position: 'x' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 }`
- Replaced 1 `crossStage(char, 'left-to-right', { stopAt, midAction })` call with 4 inline steps
  - Pattern: spawn off-left → move to center → midAction → move to destination
- Replaced 28 `MARK.X` references with string literals (`'cs-center'`, `'left'`, `'right'`, etc.)
- Removed `import { setupProps, crossStage, MARK } from '../blocking-templates'`
- Deleted .bak2 backup file

#### 3. Mage-Kitchen Blocking-Templates Dependency Fix
- Replaced 2 remaining `MARK.CS_CENTER` references with `'cs-center'` string literals
- Removed `import { MARK } from '../blocking-templates'`

#### 4. Full Verification
- 0 TypeScript errors (verified with `npx tsc --noEmit`)
- 7/7 zones import `movement-templates` correctly
- 0/7 zones import `blocking-templates` — API completely decoupled
- All ~470 vignettes across all zones use movement template spreads exclusively

### Files Modified This Session
1. `frontend/src/data/vignettes/skeleton-birthday.ts` — 22 composeBlocking → template spreads
2. `frontend/src/data/vignettes/skeleton-pizza.ts` — 15 setupProps + 1 crossStage → inline steps, 28 MARK refs → literals
3. `frontend/src/data/vignettes/mage-kitchen.ts` — 2 MARK refs → string literals, removed import
4. `frontend/src/data/vignettes/barbarian-school.ts` — Full rewrite by agent ab9bee1 (prior in session)

### Migration Patterns Confirmed

**Pattern 1: setupProps → inline spawn**
```typescript
// Old (blocking-templates)
setupProps([{ asset: 'torch', mark: MARK.CS_CENTER }])

// New (movement-templates spread)
{
  parallel: [
    { action: 'spawn', asset: 'torch', position: 'cs-center' },
    { action: 'sfx', sound: 'spawn' }
  ],
  delayAfter: 0.5
}
```

**Pattern 2: crossStage → 4 inline steps**
```typescript
// Old (blocking-templates)
crossStage('barbarian', 'left-to-right', {
  stopAt: 'cs-center',
  midAction: { action: 'animate', actor: 'barbarian', anim: 'swing' }
})

// New (movement-templates spread)
{ action: 'spawn', actor: 'barbarian', position: 'off-left' },
{ action: 'move', actor: 'barbarian', to: 'cs-center', style: 'walk' },
{ action: 'animate', actor: 'barbarian', anim: 'swing' },
{ action: 'move', actor: 'barbarian', to: 'off-right', style: 'walk' }
```

**Pattern 3: MARK references → string literals**
```typescript
// Old
mark: MARK.CS_CENTER, MARK.LEFT, MARK.RIGHT

// New
position: 'cs-center', 'left', 'right'
```

### Build Status
- Clean TypeScript compilation
- All 7 zones passing
- No remaining references to blocking-templates API in vignette files

## Related
- `frontend/src/data/vignettes/` (all 7 zone directories)
- `frontend/src/data/movement-templates.ts` (the API all vignettes now use)
- `.claude/memory/plans/vignette-story-overhaul.md` (full overhaul plan — all 13 phases complete)
- `.claude/memory/patterns/movement-template-library.md` (API reference)
- `.claude/memory/patterns/movement-template-pitfalls.md` (common mistakes)
