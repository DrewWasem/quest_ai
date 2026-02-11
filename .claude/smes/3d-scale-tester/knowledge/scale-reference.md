# Real-World Proportion Reference

## Character Baseline
- KayKit characters (Rig_Medium): **2.61 units tall** at scale 1.0
- This represents a person/character in the game world

## Real-World Height Ratios (object height / person height)

### Buildings
| Building Type | Real Ratio | Target Height (units) | Notes |
|--------------|-----------|----------------------|-------|
| Cottage/Home | 2.5-3.0x | 6.5-7.8 | Single story with roof |
| Two-story home | 3.5-4.0x | 9.1-10.4 | |
| Tavern/Inn | 3.0-4.0x | 7.8-10.4 | Usually 2 stories |
| Town Hall | 4.0-6.0x | 10.4-15.7 | Grand public building |
| Church | 4.0-5.0x | 10.4-13.1 | Body only |
| Church steeple | 8.0-12.0x | 20.9-31.3 | With steeple |
| Windmill | 4.0-5.0x | 10.4-13.1 | To blade tip |
| Market stall | 1.5-2.0x | 3.9-5.2 | Open-air structure |
| Well | 0.5-0.7x | 1.3-1.8 | Waist height |
| Stables | 2.0-2.5x | 5.2-6.5 | Low roof |
| Blacksmith | 2.5-3.0x | 6.5-7.8 | |
| Watchtower | 5.0-8.0x | 13.1-20.9 | |

### Props
| Prop Type | Real Ratio | Target Height (units) |
|-----------|-----------|----------------------|
| Barrel | 0.3-0.5x | 0.8-1.3 |
| Crate (small) | 0.2-0.3x | 0.5-0.8 |
| Crate (large) | 0.3-0.5x | 0.8-1.3 |
| Hay bale | 0.3-0.5x | 0.8-1.3 |
| Wheelbarrow | 0.3-0.4x | 0.8-1.0 |
| Bucket | 0.15-0.2x | 0.4-0.5 |
| Flag/Banner pole | 1.5-2.5x | 3.9-6.5 |
| Weapon rack | 0.7-0.9x | 1.8-2.3 |
| Torch (wall) | 0.3-0.5x | 0.8-1.3 |

### Nature
| Nature Type | Real Ratio | Target Height (units) |
|-------------|-----------|----------------------|
| Small tree | 2.0-3.0x | 5.2-7.8 |
| Large tree | 4.0-8.0x | 10.4-20.9 |
| Bush | 0.3-0.7x | 0.8-1.8 |
| Flower | 0.1-0.2x | 0.3-0.5 |
| Rock (small) | 0.1-0.3x | 0.3-0.8 |
| Rock (large) | 0.5-1.5x | 1.3-3.9 |
| Mountain | 20-100x | 52-261 | Background only |
| Fence | 0.4-0.6x | 1.0-1.6 |

### Dungeon/Interior
| Dungeon Type | Real Ratio | Target Height (units) |
|-------------|-----------|----------------------|
| Wall | 1.5-2.0x | 3.9-5.2 |
| Doorway | 1.2-1.5x | 3.1-3.9 |
| Pillar | 1.5-2.5x | 3.9-6.5 |
| Chest | 0.2-0.3x | 0.5-0.8 |
| Barrel | 0.3-0.5x | 0.8-1.3 |

## KayKit Asset Pack Scale Notes

### Medieval Hex Pack (strategy-game scale)
- Buildings are natively ~1-2 units tall (designed for top-down overview)
- Need scale **3.0-4.0x** to match character proportions
- At 3.0x, buildings width grows proportionally — spread positions 8-12 units apart

### Dungeon Pack (character-game scale)
- Walls are natively 4 units tall — close to 1.5x character, which is OK
- Barrels/chests are oversized (barrel_large = 2.0) — need scale 0.5x
- Pillars at 4.0 tall = 1.5x character — OK for dramatic pillars

### Tiny Treats Park Pack (character-game scale)
- Trees at 3-4 units tall — reasonable (1.1-1.5x character)
- Props (bench, fountain) are character-scale — OK as-is
