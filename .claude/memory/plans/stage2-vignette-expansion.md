# Plan: Stage 2 Vignette Expansion

## Goal
Expand barbarian-school and mage-kitchen Stage 2 vignettes to match the 25-vignette standard of well-covered zones.

## Coverage Math

### Target: 25 vignettes per zone (24 specific + 1 default)
This matches dungeon-concert (25), skeleton-pizza (26), knight-space (25), skeleton-birthday (25), adventurers-picnic (25).

### Barbarian-School Stage 2
- **New slots:** ENERGY(4: sleepy, normal, hyper, MEGA_hyper) + WEATHER(4: sunny, rainy, snowy, windy)
- **Currently:** 0 specific vignettes (just re-spreads Stage 1)
- **Need:** 24 new specific vignettes
- **Strategy:** Cover all ENERGY×WEATHER cross-combos (16) + 8 character/activity-specific combos

### Mage-Kitchen Stage 2
- **New slots:** INTENSITY(4: tiny, medium, mega, unstable) + QUANTITY(4: one, a_few, a_dozen, way_too_many)
- **Currently:** 8 specific (2 INTENSITY-focused + 6 RESULT-only)
- **Need:** 16 new specific vignettes
- **Strategy:** Add INTENSITY×QUANTITY combos + SPELL-specific INTENSITY variants

---

## Phase 1: Barbarian-School Stage 2 — 24 New Vignettes (~15 min)

**File:** `frontend/src/data/vignettes/barbarian-school.ts`

Replace the `...BARBARIAN_SCHOOL_STAGE_1` spread with 24 dedicated S2 vignettes.

### Trigger Grid (24 vignettes)

**Block A: ENERGY-focused (4 vignettes) — one per energy level, wildcarded activity/equipment/weather**
| # | ID | Trigger | Score | Theme |
|---|-----|---------|-------|-------|
| 1 | bs2_sleepy_any | sleepy + * + * + * + * | partial | Monster barely moves, yawning through games |
| 2 | bs2_normal_any | normal + * + * + * + * | partial | Normal day at recess, nothing special |
| 3 | bs2_hyper_any | hyper + * + * + * + * | partial | Monster bouncing off walls, can't sit still |
| 4 | bs2_mega_hyper_any | MEGA_hyper + * + * + * + * | partial | Absolute chaos, everything destroyed |

**Block B: WEATHER-focused (4 vignettes) — one per weather, wildcarded energy/activity/equipment**
| # | ID | Trigger | Score | Theme |
|---|-----|---------|-------|-------|
| 5 | bs2_any_sunny | * + * + * + * + sunny | partial | Playground is blazing hot, everyone melting |
| 6 | bs2_any_rainy | * + * + * + * + rainy | partial | Mud everywhere, sliding around |
| 7 | bs2_any_snowy | * + * + * + * + snowy | partial | Snowball fights replace regular games |
| 8 | bs2_any_windy | * + * + * + * + windy | partial | Everything blowing away, kites and chaos |

**Block C: ENERGY × WEATHER combos (8 vignettes) — the "sweet spot" 2-slot matches**
| # | ID | Trigger | Score | Theme |
|---|-----|---------|-------|-------|
| 9 | bs2_sleepy_rainy | sleepy + * + * + * + rainy | perfect | Everyone falls asleep in the rain |
| 10 | bs2_sleepy_sunny | sleepy + * + * + * + sunny | perfect | Too warm to move, nap time |
| 11 | bs2_hyper_snowy | hyper + * + * + * + snowy | perfect | Insane snowball war |
| 12 | bs2_hyper_windy | hyper + * + * + * + windy | perfect | Wind-powered chaos, flying everywhere |
| 13 | bs2_mega_rainy | MEGA_hyper + * + * + * + rainy | perfect | Mud tsunami, playground destroyed |
| 14 | bs2_mega_snowy | MEGA_hyper + * + * + * + snowy | perfect | Avalanche of energy + snow |
| 15 | bs2_normal_sunny | normal + * + * + * + sunny | perfect | Perfect playground day |
| 16 | bs2_normal_snowy | normal + * + * + * + snowy | perfect | Classic snow day at recess |

**Block D: ENERGY × MONSTER specifics (4 vignettes) — character-driven comedy**
| # | ID | Trigger | Score | Theme |
|---|-----|---------|-------|-------|
| 17 | bs2_mega_barbarian | MEGA_hyper + barbarian + * + * + * | perfect | Barbarian demolishes everything |
| 18 | bs2_sleepy_robot | sleepy + robot + * + * + * | funny_fail | Robot runs out of battery |
| 19 | bs2_hyper_clown | hyper + clown + * + * + * | perfect | Clown bouncing off everything, pranks |
| 20 | bs2_sleepy_ninja | sleepy + ninja + * + * + * | funny_fail | Ninja tries stealth but keeps falling asleep |

**Block E: WEATHER × ACTIVITY specifics (4 vignettes) — environmental comedy**
| # | ID | Trigger | Score | Theme |
|---|-----|---------|-------|-------|
| 21 | bs2_snowy_tag | * + * + tag + * + snowy | perfect | Ice tag — frozen when tagged |
| 22 | bs2_rainy_hide_seek | * + * + hide_seek + * + rainy | perfect | Puddles reveal hiding spots |
| 23 | bs2_windy_race | * + * + race + * + windy | perfect | Wind-boosted racing |
| 24 | bs2_rainy_climbing | * + * + climbing + * + rainy | funny_fail | Slippery climbing disaster |

### Verification
- [ ] 24 specific vignettes + 1 existing default = 25 total
- [ ] Each uses 2-3 of the 5 trigger slots (wildcards for the rest)
- [ ] Score distribution: ~12 perfect, ~8 partial, ~4 funny_fail
- [ ] All use movement templates (NARRATOR, ENTER_FROM_*, CHARACTER_SPEAK, CELEBRATION/DISAPPOINTMENT)
- [ ] vagueComparison on all partial-score vignettes
- [ ] Build passes: 0 TS errors

---

## Phase 2: Mage-Kitchen Stage 2 — 16 New Vignettes (~12 min)

**File:** `frontend/src/data/vignettes/mage-kitchen.ts`

Add 16 new vignettes to the existing 8. Keep existing mk2_* vignettes intact.

### Trigger Grid (16 new vignettes)

**Block A: INTENSITY-focused (2 new — medium and unstable missing)**
| # | ID | Trigger | Score | Theme |
|---|-----|---------|-------|-------|
| 1 | mk2_medium_any | medium + * + * + * + * | partial | Moderate spell — predictable but boring |
| 2 | mk2_unstable_any | unstable + * + * + * + * | partial | Spell backfires unpredictably |

**Block B: QUANTITY-focused (4 new — all quantity values)**
| # | ID | Trigger | Score | Theme |
|---|-----|---------|-------|-------|
| 3 | mk2_any_one | * + * + * + * + one | partial | Just one tiny result |
| 4 | mk2_any_few | * + * + * + * + a_few | partial | A few results — manageable |
| 5 | mk2_any_dozen | * + * + * + * + a_dozen | partial | A dozen — kitchen getting crowded |
| 6 | mk2_any_too_many | * + * + * + * + way_too_many | partial | WAY too many — total overflow |

**Block C: INTENSITY × QUANTITY combos (4 new)**
| # | ID | Trigger | Score | Theme |
|---|-----|---------|-------|-------|
| 7 | mk2_mega_too_many | mega + * + * + * + way_too_many | perfect | MEGA spell × WAY too many = apocalypse |
| 8 | mk2_tiny_one | tiny + * + * + * + one | perfect | Tiny spell × one = cute miniature result |
| 9 | mk2_unstable_dozen | unstable + * + * + * + a_dozen | perfect | Unstable × dozen = random chaos |
| 10 | mk2_medium_few | medium + * + * + * + a_few | perfect | Medium × few = reliable, safe result |

**Block D: INTENSITY × SPELL specifics (4 new)**
| # | ID | Trigger | Score | Theme |
|---|-----|---------|-------|-------|
| 11 | mk2_mega_ice | mega + ice_spell + * + * + * | perfect | MEGA ice = entire kitchen frozen solid |
| 12 | mk2_unstable_grow | unstable + grow_spell + * + * + * | perfect | Unstable grow = everything grows randomly |
| 13 | mk2_tiny_levitate | tiny + levitate + * + * + * | perfect | Tiny levitate = things barely hover |
| 14 | mk2_mega_transform | mega + transform + * + * + * | perfect | MEGA transform = everything transforms |

**Block E: INTENSITY × RESULT cross-combos (2 new)**
| # | ID | Trigger | Score | Theme |
|---|-----|---------|-------|-------|
| 15 | mk2_unstable_explode | unstable + * + * + explode + * | perfect | Unstable + explode = chain reaction |
| 16 | mk2_tiny_wild | tiny + * + * + go_wild + * | funny_fail | Tiny wild = adorably small chaos |

### Verification
- [ ] 8 existing + 16 new = 24 specific + 1 default = 25 total
- [ ] New vignettes use INTENSITY and QUANTITY slots (the previously ignored slots)
- [ ] Score distribution: ~10 perfect, ~8 partial, ~1 funny_fail (new vignettes)
- [ ] vagueComparison on all partial-score vignettes
- [ ] No duplicate triggers with existing vignettes
- [ ] Build passes: 0 TS errors

---

## Phase 3: Verify Build + Trigger Deconfliction (~2 min)

- [ ] `cd frontend && npm run build` — 0 TS errors
- [ ] No duplicate vignette IDs across all files
- [ ] Trigger priority is correct (most specific first, wildcards last)
- [ ] Default vignettes remain at the end of their arrays
- [ ] Updated stage-coverage-audit.md with new numbers

---

## Files Modified
| File | Action |
|------|--------|
| `frontend/src/data/vignettes/barbarian-school.ts` | Replace Stage 2 spread with 24 new vignettes |
| `frontend/src/data/vignettes/mage-kitchen.ts` | Add 16 new vignettes to Stage 2 array |
| `docs/stage-coverage-audit.md` | Update coverage numbers |

## Result
After this plan:
- **Barbarian-school S2:** 0 → 24 specific vignettes (+ 1 default = 25)
- **Mage-kitchen S2:** 8 → 24 specific vignettes (+ 1 default = 25)
- **All 7 zones:** 24-26 specific S2 vignettes each — full coverage
- **Total vignettes:** 437 → 477 (+40 new)
