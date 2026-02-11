# KayKit Asset Pack Scale Reference

**Created:** 2026-02-11
**Last Updated:** 2026-02-11
**Source:** session — measured via SceneMeasurer
**Confidence:** high
**Tags:** 3d, scale, kaykit, characters, buildings, proportions, CANONICAL

## Summary

KayKit Medieval Hex Pack buildings are strategy-game scale (1-2 units tall natively), while KayKit characters are adventure-game scale (~2.6 units tall). These packs were never designed to coexist at the same scale. Buildings need 3.0x multiplier, hex decoration props need 3.0x, dungeon pack props need 0.4-0.5x.

## Measured Native Heights (scale 1.0)

### Characters
- Rig_Medium (any KayKit character): **2.61 units** tall

### Medieval Hex Pack Buildings (strategy-game scale)
| Model | Native Height | At 3.0x | Char Ratio |
|-------|--------------|---------|-----------|
| townhall | 2.08 | 6.22 | 2.7x |
| church | 1.81 | 5.43 | 2.4x |
| windmill | 1.60 | 4.81 | 2.1x |
| tavern | 1.40 | 4.19 | 1.8x |
| home_B | 1.15 | 3.46 | 1.5x |
| market | 0.98 | 2.94 | 1.3x |
| blacksmith | 0.98 | 2.96 | 1.3x |
| home_A | 0.84 | 2.51 | 1.1x |
| well | 0.82 | 2.48 | 1.1x |
| stables | 0.61 | 1.83 | 0.8x |

### Medieval Hex Pack Decorations (strategy-game scale)
| Model | Native Height | Notes |
|-------|--------------|-------|
| tree_single_A/B | ~1.08 | At 3.0x = 3.24 |
| barrel | 0.21 | At 3.0x = 0.64 |
| flag | 0.28 | At 3.0x = 0.83 |
| haybale | 0.18 | At 3.0x = 0.54 |
| mountain_A | ~2.0 | Scale 4.0-4.5 for backdrop |

### Dungeon Pack (adventure-game scale — matches characters)
| Model | Native Height | Recommended Scale | Result |
|-------|--------------|------------------|--------|
| wall_half | 4.0 | 1.0 (keep) | 1.5x char |
| wall_doorway | 4.0 | 1.0 (keep) | 1.5x char |
| pillar_decorated | 4.0 | 1.0 (keep) | 1.5x char |
| barrel_large | 2.0 | 0.4 | 0.8 → 0.35x char |
| barrel_small | 1.02 | 0.5 | 0.51 → 0.22x char |
| chest_large_gold | 1.3 | 0.35 | 0.46 → 0.20x char |
| banner | 3.2 | 0.7 | 2.24 → 1.0x char |

### Tiny Treats Park Pack (adventure-game scale)
| Model | Native Height | Recommended Scale | Notes |
|-------|--------------|------------------|-------|
| tree_large | ~5.0 | 0.8 (keep) | 3.98 → 1.7x char |
| tree | ~3.6 | 0.8 (keep) | 2.89 → 1.2x char |
| fountain | 1.28 | 1.0 (keep) | 0.5x char |
| bench | 1.41 | 1.0 (keep) | 0.6x char |
| street_lantern | 4.50 | 1.0 (keep) | 1.9x char |

## Scale Rules (UPDATED 2026-02-11)

**Previous scale (3.0x) was too small — buildings looked like dollhouses next to characters.**

1. **Hex buildings → multiply by 7.0** (strategy icons → real-world proportions)
2. **Hex decorations → multiply by 7.0** (same reason)
3. **Dungeon pack walls/pillars → keep at 1.0** (designed for characters)
4. **Dungeon pack props (barrels/chests) → multiply by 0.35-0.5** (oversized for drama)
5. **Tiny Treats park → keep at 0.8-1.0** (designed for characters)
6. **When scaling buildings at 7.0x, spread positions 18-32 units apart** to prevent overlap
7. **Perimeter mountains → scale 8.0-10.0** (backdrop ring for larger village)
8. **Camera distances double** — village overview ~(0, 40, 60), zone ~(0, 18, 28)

### Ratios at 7.0x vs Character (2.61u)
| Building | At 7.0x | Ratio | Real-World Match |
|----------|---------|-------|-----------------|
| Townhall | 14.56u | 5.6x | 2-3 story building ✓ |
| Church | 12.67u | 4.9x | Church without tall spire ✓ |
| Windmill | 11.20u | 4.3x | Windmill ✓ |
| Tavern | 9.80u | 3.8x | Large single-story ✓ |
| Home_A | 5.88u | 2.3x | Small cottage ✓ |
| Stables | 4.27u | 1.6x | Low open structure ✓ |

## Related
- `frontend/src/game/VillageWorld.tsx` — where all scales are applied
- `.claude/smes/3d-scale-tester/` — the measurement SME tool
- `frontend/src/game/R3FGame.tsx` — SceneMeasurer component
