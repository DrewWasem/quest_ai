# Prompt Quest — World Layout v2 (NEW DESIGN)

**Status**: BUILT — implemented in VillageWorld.tsx
**Previous layout**: saved as `VillageWorld.backup.tsx`

---

## Design Goals
1. **Zones are king** — every design decision serves zone findability
2. **Larger world** — more exploration, each zone journey feels like a mini-adventure
3. **Cobblestone walkways** — wide, clear paths that kids naturally follow
4. **Themed corridors** — the approach to each zone builds anticipation with themed props
5. **Points of interest** — terrain features between zones reward exploration
6. **Distinct zones** — each zone looks unique from a distance (silhouette + color + ground)

---

## World Dimensions

| Constant | Old Value | New Value |
|----------|-----------|-----------|
| Player bounds X | [-40, 40] | **[-55, 55]** |
| Player bounds Z | [-65, 45] | **[-80, 55]** |
| World size | 80 × 110u | **110 × 135u** |
| Walk speed | 8 u/s | 8 u/s (unchanged) |
| Run speed | 14 u/s | 14 u/s (unchanged) |
| Player spawn | [0, 0, 0] | [0, 0, 0] (unchanged) |
| Zone trigger | 3.0u | 3.0u (unchanged) |

---

## Zone Positions (NEW)

| Zone | Old Position | New Position | Direction | Distance | Run Time |
|------|-------------|-------------|-----------|----------|----------|
| skeleton-birthday | [0, 0, -55] | **[0, 0, -70]** | North | 70u | **5.0s** |
| knight-space | [25, 0, -25] | **[38, 0, -38]** | NE | 53.7u | **3.8s** |
| barbarian-school | [35, 0, 0] | **[48, 0, 5]** | East | 48.3u | **3.5s** |
| skeleton-pizza | [25, 0, 25] | **[38, 0, 38]** | SE | 53.7u | **3.8s** |
| adventurers-picnic | [0, 0, 35] | **[0, 0, 48]** | South | 48u | **3.4s** |
| dungeon-concert | [-25, 0, 25] | **[-38, 0, 38]** | SW | 53.7u | **3.8s** |
| mage-kitchen | [-35, 0, 0] | **[-48, 0, 5]** | West | 48.3u | **3.5s** |

All ring zones: 3.4–3.8s running (sweet spot). Dungeon: 5.0s (epic journey).

---

## Master Map

```
              X=-70     X=-55       X=-30      X=0       X=+30      X=+55      X=+70
              :         |           :          :         :           |          :
 Z=-95  🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲  TREE BORDER (3 rows)
              :         |           :          :         :           |          :
 Z=-88  ⛰ ⛰ ⛰ ⛰ ⛰ · ⛰ ⛰ ⛰ · ⛰ ⛰ ⛰ ⛰ ⛰ ⛰ ⛰ · ⛰ ⛰ ⛰ · ⛰ ⛰ ⛰  PERIMETER MOUNTAINS
              :         |           :          :         :           |          :
 Z=-83  ·  ·  ·  ·  ·  ⛰  ·  ⛰🌲·  🌲  ·  ·  ·  🌲 ·🌲⛰  ·  ⛰·  ·  ·  · FAR NORTH CLIFFS
              :         |        ⛰  ·  ·  ·  ⛰       :           |          :
 Z=-78  ·  ·  ·  ·  ·  ⛰  · ⛰⛰ · · · · · · ⛰⛰ · ⛰·  ·  ·  · DUNGEON CLIFF BOWL
              :         |     ⛰ ·  ·  ·  ·  ·  ⛰    :           |          :
 Z=-75  ·  ·  ·  ·  ·  · 🏰⛰  ·  ·  ·  ·  ·  ⛰   ·  ·  ·  · 🏰 Castle (31.8u)
              :         | [-12,  :          :         :           |          :
 Z=-73  ─ ─ ─ ─ ─ ─ ─ ─│─-75]─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│─ ─ ─ ─ ─ ─
              :         |        :          :         :           |          :
 Z=-70  ·  ·  ·  ·  ·  ·  ⛰ ╔══💀DUNGEON══╗ ⛰  ·  ·  ·  ·  · ZONE [0,0,-70]
              :         |     ⛰ ║ walls+torch║ ⛰     :           |          :
 Z=-67  ·  ·  ·  ·  ·  ·  ⛰ ╚═════════════╝ ⛰ ·  ·  ·  ·  ·  ·
              :         |      ⛰  ·🪨  🪨·  ⛰        :           |          :
 Z=-63  ·  ·  ·  ·  ·  ·  · ⛰ · · · · · ⛰ ·  ·  ·  ·  ·  ·  · ENTRANCE
              :         |       🪨  ║   ║  🪨          :           |          :
 Z=-58  ·  ·  ·  ·  ·  ·  ·  🪨  ║   ║  🪨 ·  ·  ·  ·  ·  ·  · APPROACH CLIFFS
              :         |       ⛰  ║   ║  ⛰           :           |          :
 Z=-53  ·  ·  ·  ·  ·  ·  ·  ⛰  ║   ║  ⛰  ·  ·  ·  ·  ·  ·  ·
              :         |          ║N-S║               :           |          :
 Z=-48  ·  ·  ·  ·  ·  🌲  ·  🪨 ║   ║ 🪨  ·  🌲  ·  ·  ·  ·  · ROCKY PASS
              :         |   🌲     ║   ║      🌲      :           |          :
 Z=-43  ·  ·  ·  ·  🌲  🌲  ·  · ║   ║  ·  ·  🌲  🌲 ·  ·  ·  · FOREST THICKENS
              :         | 🌲   ╔═══╬NE ╬═══╗  🌲     :           |          :
 Z=-38  ·  ·  ·  ·  🌲  ·  · ╔╝  ║   ║  ╚╗·  ·  🗼🚀·  ·  ·  · ← SPACE [38,0,-38]
              :         |  🌲╔╝   ║   ║   ╚╗🌲      :           |          : 🗼 Tower_A_blue
 Z=-33  ·  ·  ·  ·  ·  · ╔╝ ·   ║   ║   · ╚╗ ·  ·  ·  ·  ·  ·
              :         |╔╝       ║   ║      ╚╗      :           |          :
 Z=-28  ·  ·  ·  ·  ·  ╔╝  ·  ⛰ ║   ║ ⛰  · ╚╗ ·  ·  ·  ·  · STARGAZER HILL
              :         ╔╝        ║   ║        ╚╗     :           |          :
 Z=-23  ·  ·  ·  ·  · ╔╝  ·  ·  ║   ║  ·  ·  ╚╗·  ·  ·  ·  ·
              :       ╔╝  🌲      ║   ║      🌲  ╚╗   :           |          :
 Z=-18  ·  ·  ·  · ╔═╝  ·  ·  · ║   ║  ·  ·  · ╚═╗·  ·  ·  ·
              :    ╔╝             ║   ║              ╚╗ :           |          :
 Z=-13  ·  ·  · ╔╝  ·  ·  [STB]·║   ║·[HmA] ·  ·  ╚╗  ·  ·  ·
              : ╔╝      [HmB]    ║   ║              ╚╗:           |          :
 Z=-8   · · ·╔╝· ·[TAV]· · [STG]║   ║· ·[WCT]· · · ╚╗· · · · ·
              ╔╝                  ║   ║                ╚╗          |          :
 Z=-5   ·  ·╔╝  ·  ·  · [TWN]·  ║   ║  ·  ·  ·  ·  · ╚╗ ·  ·  ·
             ║W  ·  ·  ·  ·  ·  ·║   ║·  ·  ·  ·  ·  ·  ║E      :
════════🧙══╬════════════════════╬═══╬════════════════════╬══📚═══════ Z=0
             ║  ·  ·  ·  ·  ·  ·║   ║·  ·  ·  ·  ·  ·   ║        :
 Z=5    🗼  ·╚╗[WM]·[BK]·[WL]· ║   ║·[MKT]·[CH]·  ·  ╔╝·  🗼  · 🗼=Tower_B_green / Tower_B_red
   [-48,5]   ╚╗  ·  ·  ·  ·  ·  ║   ║  ·  ·  ·  ·  · ╔╝  [48,5] :
              :╚╗ [HmA]  ·  ·  ·║   ║· ☆POND ·[HmB]╔╝:           |          :
 Z=12   ·  ·  ·╚╗ ·  ·  ·  ·  ·║   ║·  ·  ·  ·  ╔╝·  ·  ·  ·  ·
              :  ╚╗     🌺MEADOW ║   ║  ·  ·  · ╔╝   :           |          :
 Z=17   ·  ·  ·  ╚╗ ·🌺·  ·  · ║   ║  ·  ·  ╔╝ ·  ·  ·  ·  ·  · MEADOW & POND
              :    ╚╗  ·  ·  ·  ·║   ║· ·  · ╔╝      :           |          :
 Z=22   ·  ·  ·  · ╚═╗ ·  ⛰  · ║   ║  ⛰ ·╔═╝·  ·  ·  ·  ·  ·
              :       ╚╗         ║   ║     ╔╝         :           |          :
 Z=27   ·  ·  ·  ·  · ╚╗  ·  · ║   ║ · ╔╝·  ·  ·  ·  ·  ·  ·  ·
              :         ╚╗       ║   ║  ╔╝            :           |          :
 Z=32   ·  ·  ·  ·  ·  ·╚═╗·  ·║   ║╔═╝·  ·  ·  ·  ·  ·  ·  ·  · RING ROAD
              :         | ╚═╬SW══╬═══╬══SE╬═╗         :           |          :
 Z=35   ·  ·  ·  ·  ·  · ╚╗·  ·║   ║·  ·╔╝ ·  ·  ·  ·  ·  ·  ·
              :         |  ╚╗   ·║   ║·   ╔╝          :           |          :
 Z=38   ·  ·  ·  ·  🗼🎸  ╚╗· ·║   ║·  ╔╝  ·  🍕🏛 ·  ·  ·  · ← CONCERT [-38,0,38]
              :   [-38,  |  ╚╗   ║   ║  ╔╝           :           |          :     PIZZA [38,0,38]
              :    38]   |   ╚═══╬═══╬═══╝            :           |          :
 Z=42   ·  ·  ·  ·  ·  🌲  ·  ·║   ║·  ·  🌲  ·  ·  ·  ·  ·  ·
              :         | 🌲     ║   ║       🌲       :           |          :
 Z=45   ·  ·  ·  ·  🌲  🌲  ·  ║   ║  ·  🌲  🌲·  ·  ·  ·  ·  ·
              :         |  🌲    ║   ║     🌲          :           |          :
 Z=48   ·  ·  ·  ·  ·  ·  🌲 · 🏛🧺 · 🌲·  ·  ·  ·  ·  ·  ·  · ← PARK [0,0,48]
              :         |        [0,0,48]              :           |          :
 Z=52   ·  ·  ·  ·  ·  🌲  ·  ·  ·  ·  ·  · 🌲·  ·  ·  ·  ·  ·
              :         |           :          :         :           |          :
 Z=55   ═══════════════════════════════════════════════════════════════ PLAYER BOUND (south)
              :         |           :          :         :           |          :
 Z=58   ⛰  ⛰  ⛰  · ⛰  ⛰  · ⛰  ⛰  ⛰  · ⛰  ⛰  · ⛰  ⛰  ⛰  ·  PERIMETER
 Z=65   🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲  TREE BORDER
              X=-55                X=0                  X=+55
```

---

## Road Network (NEW)

```
                              NORTH
                                │
                           ║════║════║════║════║  Grand Boulevard (5 tiles wide)
                           ║    ║    ║    ║    ║  Z = -50 to +40
                           ║    ║    ║    ║    ║
                     ╔═════╬════╬════╬════╬════╬═════╗
                   ╔═╝     ║    ║    ║    ║    ║     ╚═╗    NE spoke (3 wide)
                 ╔═╝       ║    ║    ║    ║    ║       ╚═╗
    W spoke ═══╬═╝    ╔════╬════╬════╬════╬════╬════╗    ╚═╬═══ E spoke
   [-48,5] ═══╬═╗    ║    ║    ║    ║    ║    ║    ║    ╔═╬═══ [48,5]
                 ╚═╗  ║Ring║    ║    ║    ║    ║Ring║  ╔═╝      (3 wide each)
                   ╚═╗║Road║    ║ ORIGIN ║    ║Road║╔═╝
        SW spoke ══╗ ╚╬════╬════╬════╬════╬════╬════╬╝ ╔══ SE spoke
       [-38,38] ═══╬══╝    ║    ║    ║    ║    ║    ╚══╬═══ [38,38]
                            ║    ║    ║    ║    ║
                            ║    ║    ║    ║    ║
                            ╚════╬════╬════╬════╝
                                 ║    ║    ║          S spoke → [0,48]
                                 ║    ║    ║
                              SOUTH

    Grand Boulevard: 5 hex columns wide (-2 to +2), Z = -50 to +40
    Spoke Roads:     3 hex columns wide, from village center to each zone
    Ring Road:       At R ≈ 42, 3 hex columns wide (skips Z < -45 for dungeon)
    Junction Plazas: 5×5 cobblestone squares where spokes meet ring road
```

### Road Widths
| Road | Old Width | New Width |
|------|-----------|-----------|
| Grand Boulevard (N-S) | 3 cols | **5 cols** |
| Spoke roads | halfWidth 2.0 | **halfWidth 3.5** (≈3 cols) |
| Ring road | halfWidth 2.0 | **halfWidth 3.5** |

---

## Village Center (NEW — tighter, square-focused)

The village is a compact town square with buildings facing inward, centered at origin.
Buildings arranged in a rough square from X[-25, 25] × Z[-12, 12].

```
    X=-30    X=-22    X=-14    X=-8    X=0     X=+8    X=+14    X=+22   X=+30
      |        |        |       |      ║        |        |        |       |
Z=-12 ·  ·  · │ ·  · [HmB]·  ·│·  ·  ║  · [STB]│·  · [HmA]·  ·│·  ·  ·│
      ·       │       │  7.0   │      ║   7.0  │       │   7.0  │       │
Z=-10 ·  ·  · │ ·  · [STG]·  ·│·  ·  ║  ·  ·  ·│·  ·  ·│·  ·  ·│·  ·  ·│
      ·       │       │  5.6   │      ║        │       │        │       │
Z=-7  ·  ·  · │ · [TAV]  ·  ·│·  ·  ║  ·  ·  ·│·  ·  ·│·  ·  ·│·  ·  ·│
      ·       │       │  7.0   │      ║        │       │        │       │
Z=-5  ·  ·  · │ ·  ·  ·│·  ·  │[TWN] ║  ·  ·  ·│·  ·  ·│·  ·  ·│·  ·  ·│
      ·       │       │       │  7.7  ║        │       │        │       │
Z=-3  ·  ·  · │ ·  ·  ·│·  ·  │·  ·  ║  ·  ·  ·│·  ·  ·│·  ·  ·│[WCT]·│
      ·       │       │       │      ║        │       │        │  7.0  │
      ·       │       │       │   ═══╬════════╬═══    │        │       │
══════╬═══════╬═══════╬═══════╬══════╬   WELL ╬══════╬═══════╬═══════╬════ Z=0
      ·       │       │       │   ═══╬════════╬═══    │        │       │
Z=3   ·  ·  · │ ·  ·  ·│·  ·  │·  ·  ║  ·  ·  ·│·  ·  ·│·  ·  ·│·  ·  ·│
      ·       │       │       │      ║        │       │        │       │
Z=5   ·  [WM] │ · [BK] ·│·  ·  │·  ·  ║  ·  ·  ·│ [MKT] ·│·  · [CH]│·  ·  ·│
      ·  7.7  │       │  7.0   │      ║        │   7.0  │        │  7.7  │
Z=8   ·  ·  · │ ·  ·  ·│·  ·  │·  ·  ║  ·  ·  ·│·  ·  ·│·  ·  ·│·  ·  ·│
      ·       │       │       │      ║        │       │        │       │
Z=10  · [HmA] │ ·  ·  ·│·  ·  │·  ·  ║  ☆POND ·│·  ·  ·│·  · [HmB]│·  ·  ·│
      ·  6.3  │       │       │      ║ [12,0,14]│      │   6.3  │       │
Z=12  ·  ·  · │ ·  ·  ·│·  ·  │·  ·  ║  ·  ·  ·│·  ·  ·│·  ·  ·│·  ·  ·│

BUILDING KEY:
  TWN  = Townhall       7.7  [12, 0, -5]      (village focal point, faces south)
  TAV  = Tavern         7.0  [-16, 0, -7]      (left of main road)
  MKT  = Market         7.0  [16, 0, 5]        (right of main road, faces road)
  WL   = Well           2.5  [0, 0, 0]         (exact center, properly scaled!)
  BK   = Blacksmith     7.0  [-14, 0, 5]       (left side)
  HmA  = Home_A         7.0  [20, 0, -12]      (NE corner) + 6.3 [-22, 0, 10] (SW)
  HmB  = Home_B         7.0  [-10, 0, -12]     (NW area) + 6.3 [22, 0, 10] (SE)
  CH   = Church         7.7  [24, 0, 5]        (right side, tall spire)
  WM   = Windmill       7.7  [-24, 0, 5]       (left side, tall blades)
  STB  = Stables        7.0  [8, 0, -12]       (near road, N side)
  WCT  = Watchtower     7.0  [26, 0, -3]       (guard post, NE)
  STG  = Stage          5.6  [-8, 0, -10]      (performance area)
```

---

## Exploration Areas (NEW — between village and zones)

These fill the R=18–38 ring with interesting terrain:

### Stargazer Hill (NE quadrant, X=15-25, Z=-25 to -15)
- 2 large hills with trees (`hills_A_trees`, `hills_B_trees` at scale 6-7)
- 3 rocks scattered around
- Elevated viewpoint toward space zone

### Rocky Pass (N corridor, X=-10 to 10, Z=-30 to -48)
- Flanking cliffs grow from small rocks to large boulders approaching dungeon
- 6-8 rocks + 4 hills, increasing scale northward
- Creates a dramatic narrowing path

### Flower Meadow (W quadrant, X=-25 to -15, Z=5 to 20)
- 4-5 flower patches (`flower_A`, `flower_B` at scale 7)
- 2 small trees, 1 hill for variety
- Gentle, inviting path toward kitchen

### Pond & Bridge (center-south, X=8-18, Z=12-20)
- Expanded pond: 5 water tiles, 7 coast tiles
- Bridge crossing
- Water lilies and plants
- Natural landmark between village and southern zones

### Training Grounds (E quadrant, X=25-35, Z=-5 to 10)
- Haybales, targets, weapon racks
- Practice area near school spoke road
- 4-5 props creating a mini-area

### Market Road (SE quadrant, X=15-25, Z=20-30)
- Barrels, crates, sacks along the spoke to pizza zone
- Wheelbarrow, trough — delivery theme
- 4-5 props suggesting a supply route

---

## Zone Approach Corridors (NEW — 6-8 props each in last 15u)

Each spoke road gets themed decoration in the final stretch before the zone.
Props placed every 4-5u, alternating sides of the road.

### To Space Zone (NE spoke, X=25-38, Z=-25 to -38)
| Distance from zone | Left side | Right side |
|---|---|---|
| 15u out | crate_A (7.0) | target (7.0) |
| 10u out | barrel (7.0) | bucket_arrows (7.0) |
| 5u out | flag_blue (15.0) | flag_blue (15.0) |

### To School Zone (E spoke, X=35-48, Z=0 to 5)
| Distance from zone | Left side | Right side |
|---|---|---|
| 15u out | haybale (7.0) | target (7.0) |
| 10u out | bucket_arrows (7.0) | crate_B (7.0) |
| 5u out | flag_red (15.0) | flag_red (15.0) |

### To Pizza Zone (SE spoke, X=25-38, Z=25 to 38)
| Distance from zone | Left side | Right side |
|---|---|---|
| 15u out | barrel (7.0) | crate_A (7.0) |
| 10u out | sack (7.0) | wheelbarrow (7.0) |
| 5u out | flag_yellow (15.0) | flag_yellow (15.0) |

### To Park Zone (S spoke, X=-3 to 3, Z=35 to 48)
| Distance from zone | Left side | Right side |
|---|---|---|
| 15u out | flower_A (7.0) | flower_B (7.0) |
| 10u out | trees_small (5.0) | rock_B (5.0) |
| 5u out | flag_green (15.0) | flag_green (15.0) |

### To Concert Zone (SW spoke, X=-25 to -38, Z=25 to 38)
| Distance from zone | Left side | Right side |
|---|---|---|
| 15u out | tent (7.0) | weaponrack (7.0) |
| 10u out | barrel (7.0) | crate_B (7.0) |
| 5u out | flag_red (15.0) | flag_red (15.0) |

### To Kitchen Zone (W spoke, X=-35 to -48, Z=0 to 5)
| Distance from zone | Left side | Right side |
|---|---|---|
| 15u out | sack (7.0) | bucket_water (7.0) |
| 10u out | barrel (7.0) | crate_A (7.0) |
| 5u out | flag_green (15.0) | flag_green (15.0) |

### To Dungeon (N boulevard, X=-3 to 3, Z=-50 to -63)
Dungeon approach is special — handled by DungeonCliffs approach corridor.
Additional props along the boulevard:
| Distance from zone | Left side | Right side |
|---|---|---|
| 20u out | rock_C (5.0) | rock_D (5.0) |
| 15u out | hill_A (5.5) | hill_B (5.5) |
| 10u out | rock_E (6.0) | rock_A (6.0) |
| 5u out | flag_red (15.0) | flag_red (15.0) |

---

## Junction Plazas (NEW — 5 intersections where spokes meet ring road)

At each spoke-ring intersection (R≈42), place a 5×5 cobblestone plaza with:
- 1 zone-colored flag (scale 15.0) in the center
- 2 lanterns flanking
- 1 barrel or crate for detail

| Junction | Position (approx) | Flag Color |
|---|---|---|
| NE junction | [30, 0, -30] | blue |
| E junction | [42, 0, 3] | red |
| SE junction | [30, 0, 30] | yellow |
| SW junction | [-30, 0, 30] | red |
| W junction | [-42, 0, 3] | green |

---

## Zone Ground Material (NEW)

Hex tiles within 10u of each zone center use `TILES.transition` instead of grass.
This creates a visible darker ground area approaching each zone.

```
           Grass ░░░░░░░ Transition ▓▓▓▓ Zone ████
                 ░░░░░░░░░▓▓▓▓▓▓▓▓████████
                 ░░░░░░░░░▓▓▓▓▓▓▓▓████████
                 ░░░░░░░░░▓▓▓▓▓▓▓▓████████
                            10u     trigger
```

---

## Zone Landmarks (NEW positions — match new zone centers)

| Zone | Landmark | Position | Scale | Height |
|------|----------|----------|-------|--------|
| skeleton-birthday | Castle_red | [-12, 0, -75] | 8.0 | 31.8u |
| knight-space | Tower_A_blue | [44, 0, -42] | 8.0 | 17.5u |
| barbarian-school | Tower_B_red | [54, 0, 1] | 8.0 | 19.9u |
| skeleton-pizza | Shrine_yellow | [44, 0, 42] | **12.0** | 10.2u |
| adventurers-picnic | Watchtower_green | [6, 0, 53] | **10.0** | 11.1u |
| dungeon-concert | Tower_A_yellow | [-44, 0, 42] | 8.0 | 17.5u |
| mage-kitchen | Tower_B_green | [-54, 0, 1] | 8.0 | 19.9u |

---

## Zone Detail (mostly unchanged internally, NEW positions)

Each zone keeps its internal layout (walls, props, furniture) but moves to its new center.
Space zone uses scale 2.5 for all objects (already implemented).

### Pizza Zone — NEW distinguishing features
- Add `DECORATION.tent` at [0, 0, -6] scale 7.0 — visible red/warm canopy from distance
- Warm orange accent pointLight at [0, 5, 0] visible from afar

### Kitchen Zone — NEW distinguishing features
- Add a tall `DECORATION.barrel` stack: 3 barrels at [4, 0, -4], [4, 0.8, -4], [4, 1.6, -4]
- Green/purple accent pointLight at [0, 5, 0] — magical kitchen glow

---

## Perimeter (adjusted for larger world)

### Mountain/Cliff Wall
| Edge | Old X/Z | New X/Z |
|------|---------|---------|
| East wall | X = 44-52 | **X = 58-68** |
| West wall | X = -44 to -52 | **X = -58 to -68** |
| South wall | Z = 48-60 | **Z = 58-72** |
| North wall | Z = -70 to -85 | **Z = -85 to -95** |

### Impenetrable Forest Ring
| Ring | Old Radius | New Radius |
|------|-----------|-----------|
| Inner ring | R = 38-42 | **R = 52-56** |
| Middle ring | R = 38-48 | **R = 52-62** |
| Outer ring | R = 52-60 | **R = 65-75** |

### Tree Border (3 rows)
| Edge | Old Position | New Position |
|------|-------------|-------------|
| East | X = 55-63 | **X = 70-78** |
| West | X = -55 to -63 | **X = -70 to -78** |
| South | Z = 60-68 | **Z = 70-78** |
| North | Z = -80 to -88 | **Z = -92 to -100** |

### Dungeon Cliffs (adjusted)
| Section | Old Z | New Z |
|---------|-------|-------|
| Back wall | Z = -68 to -72 | **Z = -78 to -82** |
| Left/Right walls | X = ±18-28 | **X = ±18-30** |
| Approach cliffs | Z = -27 to -45 | **Z = -50 to -63** |
| Entrance boulders | Z = -45 | **Z = -63** |

---

## Key Numbers Reference

| Constant | Value |
|----------|-------|
| Character height | 2.56u |
| Village building scale | 7.0 |
| Zone landmark scale | 8.0-12.0 |
| Flag scale | 15.0 |
| Well scale | 2.5 |
| Space zone scale | 2.5 |
| Walk speed | 8 u/s |
| Run speed | 14 u/s |
| Player bounds | X[-55,55] Z[-80,55] |
| Zone trigger distance | 3.0u |
| Hex tile size | 2.0u wide |
| Cobblestone scale | 1.8 |
| Grand Boulevard width | 5 hex cols |
| Spoke/Ring road width | halfWidth 3.5 |
| Zone ground radius | 10u (transition tiles) |
| Forest inner ring | R = 52-56 |
| Zone approach props | 6-8 per zone, last 15u |
