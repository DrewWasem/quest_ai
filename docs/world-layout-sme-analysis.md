# Prompt Quest World Layout — SME Analysis v2

**Date**: 2026-02-12
**Scope**: Complete layout analysis with measured object sizes, full object catalog, zone findability focus
**SMEs**: child-game-design (v2.0), 3d-game-development (v1.0), 3d-scale-tester (v1.0)
**Data source**: `window.__measureScene()` live measurements + VillageWorld.tsx code audit

---

## 1. Measured Object Sizes (from running game)

### Player Character
| Object | Height | Width | Depth |
|--------|--------|-------|-------|
| Knight (Rig_Medium) | **2.56u** | 1.24u | 1.33u |

### Village Center Buildings (scale 7.0)
| Building | Height | Width | Depth | Char Ratio |
|----------|--------|-------|-------|:----------:|
| Townhall | 14.52u | 12.04u | 11.05u | 5.7x |
| Church | 12.67u | 8.89u | 7.92u | 4.9x |
| Windmill | 11.23u | 10.56u | 9.63u | 4.4x |
| Tavern | 9.78u | 12.39u | 12.39u | 3.8x |
| Home_B | 8.06u | 8.23u | 8.75u | 3.1x |
| Watchtower | 7.79u | 10.34u | 10.34u | 3.0x |
| Blacksmith | 6.90u | 8.72u | 9.01u | 2.7x |
| Market | 6.87u | 14.27u | 15.51u | 2.7x |
| Home_A | 5.86u | 7.01u | 7.15u | 2.3x |
| Well | 5.78u | 4.56u | 5.26u | 2.3x |
| Stables | 4.28u | 13.01u | 14.92u | 1.7x |
| Stage | 2.00u | 7.33u | 6.13u | 0.8x |

### Zone Landmarks (scale 8.0)
| Landmark | Height | Width | Zone |
|----------|--------|-------|------|
| Castle (red) | 31.83u | 15.80u | skeleton-birthday |
| Tower_B (red) | 19.88u | 9.58u | barbarian-school |
| Tower_B (green) | 19.88u | 9.58u | mage-kitchen |
| Tower_A (blue) | 17.53u | 7.95u | knight-space |
| Tower_A (yellow) | 17.53u | 7.95u | dungeon-concert |
| Watchtower (green) | 8.90u | 8.36u | adventurers-picnic |
| Shrine (yellow) | 6.83u | 9.24u | skeleton-pizza |

### Props (scale 7.0)
| Prop | Height | Width |
|------|--------|-------|
| Street lantern | 4.50u | 0.94u |
| Tent | 3.61u | 3.61u |
| Target | 2.11u | 1.68u |
| Flag (all colors) | 1.94u | 1.85u |
| Weaponrack | 1.68u | 1.40u |
| Bucket arrows | 1.62u | 0.98u |
| Barrel | 1.48u | 1.41u |
| Crate_A | 1.47u | 1.47u |
| Wheelbarrow | 1.32u | 1.67u |
| Haybale | 1.26u | 2.80u |
| Crate_B | 0.98u | 0.98u |
| Bucket water | 0.74u | 0.98u |
| Trough | 0.74u | 1.40u |
| Sack | 0.45u | 0.75u |

### Nature (at scale 7-8)
| Nature | Height | Width | Notes |
|--------|--------|-------|-------|
| Mountain_A | 23.94u | 29.02u | Largest background |
| Mountain_C | 21.12u | 26.31u | |
| Mountain_B | 20.20u | 28.60u | |
| Trees_B_medium | 11.27u | 24.46u | Widest tree cluster |
| Trees_A_medium | 10.36u | 19.95u | |
| Trees_B_large | 10.34u | 19.57u | |
| Trees_A_large | 8.89u | 20.25u | |
| Bridge_A | 8.75u | 13.47u | |
| Hills_B_trees | 7.53u | 8.10u | |
| Hills_A_trees | 6.66u | 8.78u | |
| Trees_A_small | 6.21u | 7.99u | |
| Trees_B_small | 6.91u | 11.95u | |
| Hills_C_trees | 5.83u | 7.63u | |
| Hill_C | 3.24u | 8.89u | |
| Hill_B | 1.88u | 4.48u | |
| Hill_A | 1.54u | 5.55u | |
| Rock_E | 1.07u | 2.68u | |
| Rock_B | 0.87u | 1.86u | |
| Rock_C | 0.78u | 1.88u | |
| Rock_D | 0.73u | 1.29u | |
| Rock_A | 0.28u | 1.64u | |

### Zone-Specific Objects
| Zone Object | Height | Width | Depth |
|-------------|--------|-------|-------|
| **Dungeon** | | | |
| Pillar decorated | 5.20u | 2.90u | 2.22u |
| Wall half | 4.00u | 2.00u | 1.00u |
| Wall doorway | 4.00u | 4.00u | 0.50u |
| Banner | 2.24u | 1.05u | 0.22u |
| Torch lit | 1.13u | 0.55u | 0.55u |
| Barrel large | 0.80u | 0.72u | 0.72u |
| Chest gold | 0.52u | 0.68u | 0.58u |
| **Park** | | | |
| Tree large | 4.23u | 2.48u | 2.48u |
| Tree | 2.89u | 1.98u | 1.89u |
| Hedge | 1.50u | 1.50u | 4.00u |
| Bench | 1.41u | 2.35u | 2.35u |
| Fountain | 1.28u | 3.20u | 3.20u |
| **School** | | | |
| Slide | 4.00u | 2.76u | 5.91u |
| Swing | 3.94u | 6.00u | 3.06u |
| Merry-go-round | 2.50u | 4.00u | 4.00u |
| Fence | 2.00u | 2.40u | 0.40u |
| **Space** | | | |
| Dropship | 1.30u | 3.00u | 2.30u |
| Base modules | 1.00u | 2.25u | 2.18u |
| Dome | 1.00u | 1.90u | 1.90u |
| Landing pad | 0.50u | 2.50u | 2.50u |
| **Kitchen** | | | |
| Wall tiles | 4.00u | 2.00u | 0.50u |
| Fridge | 3.00u | 2.04u | 1.62u |
| Stove | 1.30u | 2.00u | 1.68u |
| Counter | 1.00u | 2.00u | 1.50u |
| **Pizza** | | | |
| Wall | 4.00u | 4.00u | 0.50u |
| Counter decorated | 1.91u | 2.00u | 2.04u |
| Crate cheese/tomatoes | 0.95u | 2.00u | 2.00u |
| **Concert** | | | |
| Stage_A | 5.60u | 12.90u | 6.23u |

---

## 2. World Layout — Current State

### Coordinate System
- **Player bounds**: X [-40, 40], Z [-65, 45] (80 × 110 units)
- **Walk speed**: 8 u/s, **Run speed**: 14 u/s
- **Player spawn**: [0, 0, 0]
- **Zone trigger**: 3.0 unit proximity

### Zone Positions (from gameStore.ts)
| Zone | Position | Direction | Distance from Origin | Run Time |
|------|----------|-----------|---------------------|----------|
| skeleton-birthday | [0, 0, -55] | North | 55u | ~3.9s |
| knight-space | [25, 0, -25] | NE | 35.4u | ~2.5s |
| barbarian-school | [35, 0, 0] | East | 35u | ~2.5s |
| skeleton-pizza | [25, 0, 25] | SE | 35.4u | ~2.5s |
| adventurers-picnic | [0, 0, 35] | South | 35u | ~2.5s |
| dungeon-concert | [-25, 0, 25] | SW | 35.4u | ~2.5s |
| mage-kitchen | [-35, 0, 0] | West | 35u | ~2.5s |

### Roads
- **Main N-S road**: Cobblestone, 3 hex columns wide (cols -1 to +1), Z range -36 to 18, scale 1.8
- **Spoke roads**: 5 spokes from origin to NE/E/SE/SW/W zones, half-width 2.0
- **Ring road**: Circle at radius ~30, half-width 2.0 (skips Z < -35 for dungeon area)

### Boundary Layers (outside → inside)
1. **Tree Border** (3 rows): X ±55-63, Z 60-68 / Z -80 to -88
2. **Cliff/Mountain Perimeter**: X ±44-55, Z 48-65 / Z -70 to -85
3. **Impenetrable Forest** (3 rings): R = 38-62
4. **Player bounds**: X ±40, Z -65 to 45

---

## 3. Complete Object Catalog by Component

### HexTerrain
- ~9,600 grass tiles (cols -45 to 45, rows -55 to 50)
- ~200+ cobblestone road tiles (main road + spoke roads + ring road) at scale 1.8
- All have `noCollision`

### VillageCenter (14 buildings + 13 props + 5 trees)
| # | Object | Position | Scale |
|---|--------|----------|-------|
| 1 | Townhall | [18, 0, -5] | 7.7 |
| 2 | Tavern | [-18, 0, -7] | 7.0 |
| 3 | Market | [14, 0, 9] | 7.0 |
| 4 | Well | [-8, 0, 2] | 7.0 |
| 5 | Blacksmith | [-24, 0, 7] | 7.0 |
| 6 | Home_A | [24, 0, -12] | 7.0 |
| 7 | Home_B | [-15, 0, -14] | 7.0 |
| 8 | Home_A | [-28, 0, 14] | 6.3 |
| 9 | Home_B | [28, 0, 12] | 6.3 |
| 10 | Church | [28, 0, 2] | 7.7 |
| 11 | Windmill | [-30, 0, 0] | 7.7 |
| 12 | Stables | [10, 0, -12] | 7.0 |
| 13 | Watchtower | [32, 0, -8] | 7.0 |
| 14 | Stage | [-6, 0, -10] | 5.6 |
| + | 8 decoration props | various | 7.0 |
| + | 5 trees around edges | various | 5.6-7.0 |

### VillagePerimeter (~75 pieces)
- **East wall**: 15 pieces (X 44-52, Z -55 to 46)
- **West wall**: 15 pieces (X -44 to -52, Z -55 to 46)
- **South wall**: 10 + 5 background row
- **North wall**: 5 large mountains + 6 gap-fillers
- **Corners**: 8 pieces (NE/NW/SE/SW)

### ImpenetrableForest (~50 procedural trees)
- Inner ring: R=38-42, 14 positions
- Middle ring: R=38-48, 20 positions + doubles
- Outer ring: R=52-60, 16 positions
- Skips corridors (7 directions) and zone clearance (15u)

### TreeBorder (~240 procedural trees)
- 3 rows × 4 edges, spacing 5u
- East: X=55/59/63, West: X=-55/-59/-63
- South: Z=60/64/68, North: Z=-80/-84/-88
- Scale 8.0-9.4

### DungeonCliffs (~40 pieces)
- Back wall: 7 mountains/hills/rocks (Z=-67 to -72)
- Left/Right walls: 6 each (X=±18-28)
- Approach cliffs: 7+7 (Z=-27 to -45)
- Entrance boulders: 2
- Cliff-top trees: 7

### ZoneLandmarks (7 tall buildings)
- One per zone, positioned near each zone center, scale 8.0
- Tallest: Castle (31.8u), shortest: Shrine (6.8u)

### RoadDecoration (~30 pieces)
- 3 flags along main road
- 4 props along road
- 2 road-side trees
- ~20 lanterns (along all spoke roads, scale 1.5)
- 12 zone-colored flags near entrances (2 per non-dungeon zone)

### TerrainScatter (~37 pieces)
- 32 procedural (rocks, hills, small trees at R=18-32)
- 5 strategic hills for vertical interest

### VillagePond (12 pieces)
- Center: [12, 0, 18]
- 3 water tiles + 5 coast tiles + 2 lilies + 2 plants + 1 bridge

### ZoneApproachDecor (12 pieces)
- 2 themed props per zone approach

### Quest Zones (7 zones, ~100 pieces total)
- **DungeonZone**: 9 walls + 6 pillars + 35 floor tiles + 6 torches + 8 props + 4 banners + 4 lights + 4 entrance markers
- **ParkZone**: 9 trees/bushes + 2 flowers + 2 benches + 1 fountain + 2 lanterns + 2 hedges
- **SpaceZone**: 1 landing pad + 2 modules + 1 tunnel + 1 dropship + 2 cargo + 1 solar + 1 dome + 2 lights
- **SchoolZone**: 1 swing + 1 slide + 1 merry-go-round + 1 seesaw + 1 sandbox + 2 trees + 4 fences + 1 table
- **PizzaZone**: walls + counters + crates + chairs + plates
- **ConcertZone**: stage + dungeon walls/pillars/torches/props
- **KitchenZone**: walls + counters + stove + fridge + table + chairs + pots

---

## 4. SME Analysis

### Child Game Design SME Assessment

**Zone Findability — Grade: B+**

The zones ARE findable. Here's why:

1. **Walk times are excellent**: 2.5s running to any ring zone, 3.9s to dungeon. All within the 3-8s sweet spot.
2. **Cobblestone roads point directly to zones**: Main N-S road + spoke roads + ring road form clear pathways. Kids can follow the cobblestones.
3. **Zone landmarks work**: Each zone has a tall colored building (17-32u) visible above village buildings (5-15u). The castle, towers, and shrine create distinct silhouettes.
4. **Glowing quest circles**: Ground-level glowing rings at each zone center provide the final wayfinding signal.
5. **Zone-colored flags**: Paired flags near each zone approach reinforce "something is here."

**What could improve zone findability further:**
- The **space zone** objects are tiny (dropship 1.3u, modules 1.0u) — from the village center camera distance, they're barely visible. Consider scaling up or adding a taller landmark element.
- The **pizza zone** and **kitchen zone** share similar wall/counter objects — from a distance they look identical. Different visual signatures would help.
- Zone approach corridors are bare grass with just 2 props each — more themed decoration along the spoke road approaching each zone would build anticipation.

**World Size — Grade: A**

The world size is appropriate. Key data:
- 6 of 7 zones reachable in 2.5s running
- Village center is dense with 14 buildings filling the core
- Exploration between village and zones has scatter objects, hills, roads
- The dungeon at 55u north is the "special" destination with a dramatic cliff approach — the longer journey IS the design

### 3D Game Development SME Assessment

**Object Scale Ratios — Grade: B+**

Comparing measured heights to scale-reference.md targets:

| Object | Measured | Target Range | Status |
|--------|----------|-------------|--------|
| Home_A | 5.86u (2.3x char) | 6.5-7.8u (2.5-3x) | Slightly short |
| Tavern | 9.78u (3.8x char) | 7.8-10.4u (3-4x) | Good |
| Townhall | 14.52u (5.7x char) | 10.4-15.7u (4-6x) | Good |
| Church | 12.67u (4.9x char) | 10.4-13.1u (4-5x) | Good |
| Windmill | 11.23u (4.4x char) | 10.4-13.1u (4-5x) | Good |
| Stables | 4.28u (1.7x char) | 5.2-6.5u (2-2.5x) | Slightly short |
| Well | 5.78u (2.3x char) | 1.3-1.8u (0.5-0.7x) | **Way too tall** |
| Barrel | 1.48u (0.6x char) | 0.8-1.3u (0.3-0.5x) | Slightly tall |
| Flag | 1.94u (0.8x char) | 3.9-6.5u (1.5-2.5x) | Too short |

The well at 5.78u is a known issue — at scale 7.0 it's character height when it should be waist-high. Flags are too short to serve as wayfinding. Most buildings are in range.

**Performance Concerns:**
- ~9,600 hex tiles + ~400 placed objects + ~290 procedural trees/border = high draw call count
- 4 point lights in dungeon + 2 in space + 4 concert = 10 point lights (at budget limit)
- Shadow map covers [-100, 100] which is tight for the 80×110 world

---

## 5. Layout Improvement Recommendations

### Priority 1: Make Zones Pop

**1A. Scale up zone-specific objects**
The space zone is especially tiny. Scale zone objects up so they're visible from the village:
- Space: scale dropship, modules, dome to 2.0-3.0 (currently 1.0)
- Pizza/Kitchen: add a unique tall prop to differentiate them

**1B. Thicken zone approach corridors**
Currently just 2 props each. Add 4-6 themed props along each spoke road in the last 10-15u approaching each zone. The cobblestones lead you there — decoration confirms you're arriving.

**1C. Add zone-specific ground material**
Replace grass hex tiles near each zone with themed tiles:
- Dungeon: use `hex_transition` tiles (darker)
- Space: use metallic/grey appearance (via custom material tint or different tile)
- Others: tint or pattern variation

### Priority 2: Enhance Cobblestone Walkways

**2A. Widen spoke roads**
Currently half-width 2.0 on spoke roads vs 3 hex columns on main road. Widen spokes to match the main road width so all paths feel deliberate.

**2B. Add road-edge decoration along spokes**
Lanterns already exist along spokes. Add small props (flowers, rocks, haybales) every 8-10u along spoke road edges for visual richness.

### Priority 3: Polish

**3A. Fix well scale**
Reduce well scale from 7.0 to ~2.5 (target: ~1.5u tall, waist-height)

**3B. Increase flag scale**
Increase zone approach flags from 7.0 to ~15-20 (target: ~4-6u, visible from distance)

**3C. Add signpost-like objects at road junctions**
Where spoke roads meet the ring road, place a flag + prop cluster so kids recognize the intersection.

---

## 6. Available Unused Assets (from asset-inventory.md)

### High-Value Unused Packs for World Enhancement
| Pack | Models | Potential Use |
|------|--------|---------------|
| forest_nature | 1,580 unused | Dense natural decoration, different tree styles |
| platformer | 525 | Colorful platforms, could mark zone entrances |
| resource | 132 | Rocks, gems — path decoration |
| city_builder | 73 | Modern buildings for contrast zones |
| Quaternius Nature (zip) | thousands | More tree/bush/rock variety |
| Cartoon City (zip) | ~50 | Signboards, billboards for wayfinding |

### Character Assets Available (28 deployed, 16 in zip)
All 28 deployed characters use Rig_Medium skeleton. Could be placed as stationary NPCs at zone entrances or along roads for wayfinding ("talk to the skeleton to find the party!").

---

## 7. ASCII Map — Current Layout

```
                    NORTH (-Z)
                        |
   Z=-65 ┌──────────────────────────────────────────┐ Player bound
         │     ▓▓▓▓ DUNGEON CLIFFS ▓▓▓▓            │
   Z=-55 │      ╔══ DUNGEON 💀 ══╗  🏰Castle       │ [0,0,-55]
         │   ▓▓ ║  walls+torches ║ ▓▓              │
   Z=-45 │   ▓▓ ╚════════════════╝ ▓▓              │
         │      ⌐ Approach Cliffs ¬                 │
         │🌲🌲🌲   ║ COBBLE  ║   🌲🌲🌲           │ Forest ring
   Z=-25 │  🌲    🗼Space🚀        🌲               │ [25,0,-25]
         │       [25,0,-25]                          │
         │                                           │
   Z=-5  │    ┌──── VILLAGE CENTER ────┐             │
         │🧙  │ Townhall Church Wind- │    📚       │ Kitchen[-35] School[35]
   Z=0   │🗼  │ mill  Tavern Market   │   🗼        │
         │[-35]│ Blacksmith Stables   │  [35]        │
   Z=10  │    └────────────────────────┘             │
         │                                           │
   Z=25  │  🗼Concert🎸        🍕Pizza🏛            │ [-25,0,25] [25,0,25]
         │  [-25,0,25]    ☆Pond   [25,0,25]         │
         │🌲🌲🌲   ║ COBBLE  ║   🌲🌲🌲           │
   Z=35  │         🏛Park🧺                         │ [0,0,35]
         │         [0,0,35]                          │
   Z=45  │ 🏔🏔🌲🌲🌲🌲🌲🌲🌲🌲🏔🏔             │ Player bound
         └──────────────────────────────────────────┘
        X=-40              0                     X=+40
```

Key: 🗼=Zone landmark tower  🏰=Castle  🏛=Shrine/watchtower  🌲=Forest  🏔=Mountain  ☆=Feature

---

## 8. Key Numbers Reference

| Constant | Value | Source |
|----------|-------|--------|
| Character height | 2.56u | Measured |
| Village building scale | 7.0 (props: 7.0) | VillageWorld.tsx |
| Zone landmark scale | 8.0 | VillageWorld.tsx |
| Walk speed | 8 u/s | PlayerCharacter.tsx |
| Run speed | 14 u/s | PlayerCharacter.tsx |
| Player bounds | X[-40,40] Z[-65,45] | PlayerCharacter.tsx |
| Zone trigger distance | 3.0u | gameStore.ts |
| Hex tile size | 2.0u wide | VillageWorld.tsx |
| Cobblestone road scale | 1.8 | VillageWorld.tsx |
| Forest corridor N half-width | 0.50 rad | ImpenetrableForest |
| Zone clearance (forest) | 15u | ImpenetrableForest |
| Collision box shrink | 0.7× (30% reduction) | Piece component |
