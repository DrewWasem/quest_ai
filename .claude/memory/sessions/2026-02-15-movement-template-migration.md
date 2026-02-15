# Movement Template Migration — Full Audit + Migration

**Created:** 2026-02-15
**Last Updated:** 2026-02-15
**Source:** session
**Confidence:** high
**Tags:** vignettes, migration, movement-templates, parallel-agents

## Summary

Audited all 7 vignette files for movement template adoption, then dispatched 7 parallel implementer agents to migrate ALL raw vignettes to use movement template spreads.

## Audit Results (Corrected)

| Zone | Vignettes | Template % Before | Status |
|------|-----------|-------------------|--------|
| barbarian-school | 66 | 0% | Migration agent dispatched |
| dungeon-concert | ~65 | 0% | Migration agent dispatched |
| knight-space | ~65 | ~1% (1 composeBlocking) | Migration agent dispatched |
| skeleton-pizza | ~64 | 0% | Migration agent dispatched |
| mage-kitchen | ~39 | ~5% (2 gold standard) | Migration agent dispatched |
| skeleton-birthday | 79 | 67% (48 done, 31 raw) | Migration agent dispatched |
| adventurers-picnic | ~36 | ~50% (RANGER done, DRUID raw) | Migration agent dispatched |

## Key Findings
- Previous claims of skeleton-pizza and mage-kitchen being "100% modernized" were WRONG
- Only skeleton-birthday's CAKE/PIZZA/FEAST categories were properly migrated
- ~345 vignettes across 7 files need migration total

## Agent IDs (for resume if needed)
- barbarian-school: ab9bee1
- dungeon-concert: a1cf30f
- knight-space: a4cbf2a
- skeleton-pizza: a3c2add
- mage-kitchen: a82733d
- skeleton-birthday: ae3fdee
- adventurers-picnic: a3925b4

## Next Steps
- Wait for all 7 agents to complete
- Run `cd frontend && npm run build` to verify TypeScript passes
- Fix any signature errors (agents commonly get CHARACTER_THINK, EMOTIONAL_REACT wrong)
- After build passes, mark all tasks complete

## Related
- `frontend/src/data/movement-templates.ts` — 30+ template functions
- `frontend/src/data/vignettes/*.ts` — 7 zone files
- `.claude/memory/plans/vignette-story-overhaul.md` — original plan
