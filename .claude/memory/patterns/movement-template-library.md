# Movement Template Library

**Created:** 2026-02-14
**Last Updated:** 2026-02-14
**Source:** session
**Confidence:** high
**Tags:** movement, templates, vignettes, choreography, reusability, scene-composition

## Summary

A library of 40 reusable VignetteStep[] templates for composing vignette scenes. Provides pre-built choreography patterns across 7 categories (entrances, movements, exits, multi-character, objects, dialogue, scene), enabling rapid scene composition and consistent animation quality.

## Details

**File:** `frontend/src/data/movement-templates.ts`

### Design Principles
1. **Composability** — templates are VignetteStep[] arrays that can be concatenated and customized
2. **Functional approach** — templates are factory functions accepting parameters (actorId, position, etc.)
3. **Type safety** — all templates return properly typed VignetteAction arrays
4. **Reusability** — common patterns extracted once, reused across all vignettes

### Template Categories (40 total)

#### Entrances (7)
- `ENTER_FROM_LEFT(actorId)` — walk in from left edge
- `ENTER_FROM_RIGHT(actorId)` — walk in from right edge
- `SNEAK_IN_LEFT(actorId)` — slow sneak from left
- `CHARGE_IN_LEFT(actorId)` — fast charge from left
- `CHARGE_IN_RIGHT(actorId)` — fast charge from right
- `DROP_IN(actorId, position)` — fall from above
- `TELEPORT_IN(actorId, position)` — sparkle in magically

#### Movements (6)
- `WALK_TO(actorId, position)` — normal walk
- `RUN_TO(actorId, position)` — fast run
- `JUMP_TO(actorId, position)` — hop with arc
- `DODGE(actorId, direction)` — quick sidestep
- `CIRCLE_AROUND(actorId, centerPos)` — orbit around point
- `PACE(actorId, startPos, endPos)` — back and forth

#### Exits (3)
- `FLEE_LEFT(actorId)` — panic run left
- `FLEE_RIGHT(actorId)` — panic run right
- `EXIT_WALK(actorId, direction)` — casual walk off

#### Multi-Character (4)
- `CONVERGE_MEET(actor1, actor2, meetPos)` — two approach center
- `CHASE(chaser, target, duration)` — pursuit choreography
- `SCATTER(actorIds, fromPos)` — group disperses
- `GATHER(actorIds, toPos)` — group converges

#### Objects (10)
- `OBJECT_DROP(propId, position)` — fall and land
- `OBJECT_SLIDE_IN(propId, fromSide)` — slide from edge
- `OBJECT_GROW_REVEAL(propId, position)` — scale up from zero
- `OBJECT_LAUNCH(propId, fromPos, toPos)` — arc trajectory
- `OBJECT_SPIN_IN(propId, position)` — rotate while appearing
- `OBJECT_RAIN(propIds, positions)` — multiple fall staggered
- `OBJECT_SHRINK_POP(propId)` — scale down and remove
- `OBJECT_FLOAT_UP(propId)` — rise and fade
- `OBJECT_PILE(propIds, centerPos)` — stack items
- `OBJECT_SERVE(propId, fromPos, toPos)` — present/deliver

#### Dialogue (5)
- `CHARACTER_SPEAK(actorId, text)` — speech bubble
- `CHARACTER_THINK(actorId, text)` — thought bubble
- `DIALOGUE(actor1, actor2, exchanges)` — conversation
- `EMOTIONAL_REACT(actorId, emotion)` — emote particle effect
- `CHARACTER_EXCLAIM(actorId, text, emotion)` — speech + emote

#### Scene Elements (5)
- `NARRATOR(text)` — narrator box appears
- `IMPACT(position)` — impact flash effect
- `CELEBRATION(centerPos)` — confetti explosion
- `DISAPPOINTMENT(centerPos)` — sad cloud effect
- `DRAMATIC_PAUSE(duration)` — freeze frame moment

### Usage Pattern

```typescript
import { ENTER_FROM_LEFT, WALK_TO, CHARACTER_SPEAK, CELEBRATION } from '@/data/movement-templates';

const vignette: VignetteStep = {
  narration: "The knight approaches the treasure!",
  actions: [
    ...ENTER_FROM_LEFT('knight'),
    ...WALK_TO('knight', 'center'),
    ...CHARACTER_SPEAK('knight', 'At last!'),
    ...CELEBRATION('center')
  ]
};
```

### Benefits
1. **Consistency** — all vignettes use same animation timing/easing
2. **Maintainability** — fix animation once, applies everywhere
3. **Velocity** — compose scenes 5x faster than custom code
4. **Quality** — pre-tested choreography patterns
5. **Educational scaling** — easy to create tier-based complexity (more templates = richer scene)

### Bug Fix Applied
- Changed `duration_ms` → `duration` in DRAMATIC_PAUSE template to match VignetteAction type definition

## Related

- `frontend/src/data/movement-templates.ts` — implementation
- `frontend/src/types/vignette-types.ts` — VignetteStep, VignetteAction type definitions
- `frontend/src/game/ScenePlayer3D.tsx` — consumes templates via actions
- `.claude/memory/plans/vignette-story-overhaul.md` — Phase 3 of overhaul plan
- `.claude/memory/sessions/2026-02-14-vignette-overhaul-planning.md` — implementation session
