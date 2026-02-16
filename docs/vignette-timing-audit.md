# Vignette Timing Audit

**Generated:** 2026-02-15
**Total vignettes:** 437 across 7 quest zones
**Source files:** `frontend/src/data/vignettes/*.ts`
**Amplification logic:** `frontend/src/services/vignette-resolver.ts` `amplifyVignetteSteps()`

## Methodology

**Pre-amplification time** = sum of all `delayAfter` values across all steps in the vignette. Where `delayAfter` is missing, a default of 0.5s is used.

**Post-amplification estimate** uses the actual `amplifyVignetteSteps` algorithm:
1. Each original step's `delayAfter` is multiplied by 1.5x
2. After most steps, a contextual reaction step is inserted (~0.3-0.4s, averaging 0.35s)
3. A 3-step celebration outro is appended: 0.6 + 0.8 + 1.0 = 2.4s

Formula: `post_amp = (pre_amp * 1.5) + (amplified_step_count * 0.35) + 2.4`

Approximately 85% of original steps receive an amplification step (sfx-only and crowd-react steps are skipped).

**Action count** = total number of VignetteAction objects across all `step.parallel` arrays, including actions inside spread template calls.

---

## T1 — Skeleton's Surprise Birthday

**File:** `frontend/src/data/vignettes/skeleton-birthday.ts`
**Total vignettes:** 72 (Stage 1: 40, Stage 2: 25, Stage 3: 7)

```
zone | vignette_id | promptScore | actions | pre_amp_s | post_amp_s | trigger
---- | ----------- | ----------- | ------- | --------- | ---------- | -------

--- STAGE 1 (Mad Libs L1) (40 vignettes) ---
skeleton-birthday | sb_cake_magic_show | perfect | 58 | 23.3 | 45.8 | cake + magic_show + *
skeleton-birthday | sb_cake_fireworks | perfect | 55 | 23.9 | 45.6 | cake + fireworks + *
skeleton-birthday | sb_cake_music | perfect | 59 | 27.3 | 53.1 | cake + music + *
skeleton-birthday | sb_cake_combat | perfect | 59 | 25.3 | 48.8 | cake + combat + *
skeleton-birthday | sb_cake_dance | perfect | 47 | 24.8 | 47.3 | cake + dance + *
skeleton-birthday | sb_cake_games | perfect | 51 | 21.3 | 41.7 | cake + games + *
skeleton-birthday | sb_pizza_magic_show | perfect | 44 | 21.5 | 40.9 | pizza + magic_show + *
skeleton-birthday | sb_pizza_fireworks | perfect | 53 | 24.4 | 46.7 | pizza + fireworks + *
skeleton-birthday | sb_pizza_music | perfect | 64 | 31.2 | 58.6 | pizza + music + *
skeleton-birthday | sb_pizza_combat | perfect | 61 | 24.2 | 46.4 | pizza + combat + *
skeleton-birthday | sb_pizza_dance | perfect | 50 | 22.4 | 44.0 | pizza + dance + *
skeleton-birthday | sb_pizza_games | perfect | 36 | 17.9 | 35.2 | pizza + games + *
skeleton-birthday | sb_feast_magic_show | perfect | 72 | 32.9 | 62.6 | feast + magic_show + *
skeleton-birthday | sb_feast_fireworks | perfect | 93 | 33.2 | 65.2 | feast + fireworks + *
skeleton-birthday | sb_feast_music | perfect | 55 | 25.6 | 49.2 | feast + music + *
skeleton-birthday | sb_feast_combat | perfect | 43 | 19 | 36.9 | feast + combat + *
skeleton-birthday | sb_feast_dance | perfect | 53 | 27.7 | 53.0 | feast + dance + *
skeleton-birthday | sb_feast_games | perfect | 55 | 24.5 | 47.9 | feast + games + *
skeleton-birthday | sb_fruit_magic_show | perfect | 56 | 20 | 39.8 | fruit + magic_show + *
skeleton-birthday | sb_fruit_fireworks | perfect | 45 | 16.7 | 34.1 | fruit + fireworks + *
skeleton-birthday | sb_fruit_music | perfect | 35 | 12.2 | 25.9 | fruit + music + *
skeleton-birthday | sb_fruit_combat | perfect | 34 | 12.3 | 25.4 | fruit + combat + *
skeleton-birthday | sb_fruit_dance | perfect | 51 | 18.6 | 38.4 | fruit + dance + *
skeleton-birthday | sb_fruit_games | perfect | 35 | 11.2 | 24.1 | fruit + games + *
skeleton-birthday | sb_candy_magic_show | perfect | 40 | 13.2 | 27.4 | candy + magic_show + *
skeleton-birthday | sb_candy_fireworks | perfect | 45 | 14.3 | 29.5 | candy + fireworks + *
skeleton-birthday | sb_candy_music | perfect | 43 | 12.7 | 27.4 | candy + music + *
skeleton-birthday | sb_candy_combat | perfect | 34 | 10.4 | 22.6 | candy + combat + *
skeleton-birthday | sb_candy_dance | perfect | 58 | 23.4 | 46.6 | candy + dance + *
skeleton-birthday | sb_candy_games | perfect | 37 | 13.1 | 27.3 | candy + games + *
skeleton-birthday | sb_soup_magic_show | perfect | 41 | 13.7 | 28.5 | soup + magic_show + *
skeleton-birthday | sb_soup_fireworks | perfect | 47 | 14.9 | 30.7 | soup + fireworks + *
skeleton-birthday | sb_soup_music | perfect | 38 | 11.7 | 25.2 | soup + music + *
skeleton-birthday | sb_soup_combat | perfect | 34 | 9.8 | 21.3 | soup + combat + *
skeleton-birthday | sb_soup_dance | perfect | 50 | 17.6 | 36.1 | soup + dance + *
skeleton-birthday | sb_soup_games | perfect | 32 | 10.4 | 22.6 | soup + games + *
skeleton-birthday | skel_bday_1_vibe_spooky | partial | 34 | 13.1 | 26.9 | * + * + spooky
skeleton-birthday | skel_bday_1_vibe_fancy | partial | 33 | 12.1 | 25.4 | * + * + fancy
skeleton-birthday | skel_bday_1_cat_magic | partial | 25 | 8.3 | 18.4 | * + magic_show + *
skeleton-birthday | skel_bday_default | partial | 31 | 9.7 | 21.8 | * + * + *

--- STAGE 2 (Mad Libs L2) (25 vignettes) ---
skeleton-birthday | sb2_tiny_cake_magic | perfect | 15 | 3.8 | 9.8 | tiny + cake + magic_show + * + *
skeleton-birthday | sb2_tiny_candy_silly | perfect | 15 | 2.9 | 7.8 | tiny + candy + * + silly + *
skeleton-birthday | sb2_tiny_pizza_music | perfect | 11 | 3.1 | 8.1 | tiny + pizza + music + * + *
skeleton-birthday | sb2_giant_cake_magic | perfect | 22 | 4.4 | 10.8 | giant + cake + magic_show + * + *
skeleton-birthday | sb2_enormous_fireworks_epic | perfect | 19 | 4.5 | 10.6 | enormous + * + fireworks + epic + *
skeleton-birthday | sb2_giant_feast_wild | perfect | 19 | 3.9 | 9.7 | giant + feast + * + wild + *
skeleton-birthday | sb2_excited_fireworks | perfect | 13 | 2.9 | 8.2 | * + * + fireworks + * + excited
skeleton-birthday | sb2_shy_music | perfect | 10 | 3.4 | 8.5 | * + * + music + * + shy
skeleton-birthday | sb2_chaotic_dance | perfect | 16 | 3.4 | 8.5 | * + * + dance + * + chaotic
skeleton-birthday | sb2_mysterious_magic | perfect | 17 | 3.9 | 9.7 | * + * + magic_show + * + mysterious
skeleton-birthday | sb2_giant_pizza | perfect | 13 | 3.1 | 8.1 | giant + pizza + * + * + *
skeleton-birthday | sb2_tiny_pizza | funny_fail | 9 | 3.1 | 8.1 | tiny + pizza + * + * + *
skeleton-birthday | sb2_enormous_cake | perfect | 15 | 4.1 | 9.9 | enormous + cake + * + * + *
skeleton-birthday | sb2_normal_excited_games | perfect | 13 | 3.1 | 8.1 | normal + * + games + excited + *
skeleton-birthday | sb2_tiny_mysterious_combat | perfect | 14 | 3.1 | 8.1 | tiny + * + combat + mysterious + *
skeleton-birthday | sb2_giant_shy_music | perfect | 9 | 3.4 | 8.5 | giant + * + music + shy + *
skeleton-birthday | sb2_normal_soup_dance | perfect | 12 | 3 | 7.9 | normal + soup + dance + * + *
skeleton-birthday | sb2_tiny_fruit_excited | perfect | 12 | 2.9 | 7.8 | tiny + fruit + excited + * + *
skeleton-birthday | sb2_enormous_chaotic_combat | perfect | 18 | 3.9 | 9.7 | enormous + * + combat + chaotic + *
skeleton-birthday | sb2_normal_candy_mysterious | perfect | 15 | 3.6 | 9.2 | normal + candy + * + mysterious + *
skeleton-birthday | sb2_giant_feast_excited | perfect | 17 | 3.5 | 9.1 | giant + feast + excited + * + *
skeleton-birthday | sb2_tiny_combat_shy | funny_fail | 11 | 3.1 | 8.1 | tiny + * + combat + shy + *
skeleton-birthday | sb2_enormous_candy_chaotic | perfect | 20 | 3.6 | 9.2 | enormous + candy + chaotic + * + *
skeleton-birthday | sb2_normal_combat_excited | perfect | 14 | 3.5 | 9.1 | normal + * + combat + excited + *
skeleton-birthday | skel_bday_default_2 | partial | 12 | 5.4 | 12.6 | * + * + * + * + *

--- STAGE 3 (Mad Libs L3 — Combo) (7 vignettes) ---
skeleton-birthday | sb3_magic_fireworks | perfect | 23 | 4.3 | 10.9 | magic_show + fireworks + * + *
skeleton-birthday | sb3_combat_dance | perfect | 18 | 4.3 | 10.6 | combat + dance + * + *
skeleton-birthday | sb3_dance_combat | perfect | 18 | 4.3 | 10.6 | dance + combat + * + *
skeleton-birthday | sb3_music_magic | perfect | 20 | 4.3 | 10.6 | music + magic_show + * + *
skeleton-birthday | sb3_fireworks_games | perfect | 18 | 4 | 10.2 | fireworks + games + * + *
skeleton-birthday | sb3_games_music | perfect | 14 | 4.2 | 10.5 | games + music + * + *
skeleton-birthday | skel_bday_default_3 | partial | 20 | 6.1 | 14.0 | * + * + * + *
```

**Zone Summary:**
| Metric | Value |
|--------|-------|
| Total vignettes | 72 |
| Avg actions/vignette | 33.0 |
| Avg pre-amp time | 12.1s |
| Avg post-amp time | 25.0s |
| Longest (pre-amp) | sb_feast_fireworks (33.2s pre / 65.2s post) |
| Shortest (pre-amp) | sb2_tiny_candy_silly (2.9s pre / 7.8s post) |
| Most actions | sb_feast_fireworks (93 actions) |
| Fewest actions | sb2_tiny_pizza (9 actions) |
| Score distribution | perfect: 64, partial: 6, funny_fail: 2 |

---

## T2 — Knight's Space Mission

**File:** `frontend/src/data/vignettes/knight-space.ts`
**Total vignettes:** 64 (Stage 1: 32, Stage 2: 25, Stage 3: 7)

```
zone | vignette_id | promptScore | actions | pre_amp_s | post_amp_s | trigger
---- | ----------- | ----------- | ------- | --------- | ---------- | -------

--- STAGE 1 (Mad Libs L1) (32 vignettes) ---
knight-space | ks_ranger_repair | perfect | 54 | 16.7 | 33.4 | ranger + repair + *
knight-space | ks_ranger_launch | perfect | 50 | 17 | 33.5 | ranger + launch + *
knight-space | ks_ranger_build | perfect | 35 | 13.5 | 26.8 | ranger + build + *
knight-space | ks_ranger_rescue | perfect | 51 | 14.9 | 29.6 | ranger + rescue + *
knight-space | ks_ranger_explore | perfect | 34 | 13.5 | 26.8 | ranger + explore + *
knight-space | ks_ranger_defend | perfect | 72 | 21.8 | 43.1 | ranger + defend + *
knight-space | ks_robot_repair | perfect | 35 | 13.5 | 26.8 | robot + repair + *
knight-space | ks_robot_launch | perfect | 52 | 17.1 | 34.0 | robot + launch + *
knight-space | ks_robot_build | perfect | 53 | 17.3 | 35.0 | robot + build + *
knight-space | ks_robot_rescue | perfect | 51 | 14.2 | 28.6 | robot + rescue + *
knight-space | ks_robot_explore | perfect | 40 | 14.8 | 29.5 | robot + explore + *
knight-space | ks_robot_defend | perfect | 67 | 19.2 | 38.2 | robot + defend + *
knight-space | ks_engineer_repair | perfect | 57 | 16.5 | 34.1 | engineer + repair + *
knight-space | ks_engineer_launch | perfect | 50 | 16.8 | 33.2 | engineer + launch + *
knight-space | ks_engineer_build | perfect | 38 | 13.5 | 26.8 | engineer + build + *
knight-space | ks_engineer_rescue | perfect | 57 | 14.7 | 29.7 | engineer + rescue + *
knight-space | ks_engineer_explore | perfect | 50 | 17.6 | 34.8 | engineer + explore + *
knight-space | ks_engineer_defend | perfect | 62 | 16.5 | 33.5 | engineer + defend + *
knight-space | ks_knight_repair | perfect | 49 | 14.5 | 29.0 | knight + repair + *
knight-space | ks_knight_launch | perfect | 55 | 19.6 | 38.8 | knight + launch + *
knight-space | ks_knight_build | funny_fail | 41 | 14.5 | 29.0 | knight + build + *
knight-space | ks_knight_rescue | perfect | 64 | 17.7 | 35.2 | knight + rescue + *
knight-space | ks_knight_explore | funny_fail | 44 | 16.7 | 32.7 | knight + explore + *
knight-space | ks_knight_defend | perfect | 78 | 18.7 | 37.4 | knight + defend + *
knight-space | ks_everyone_repair | perfect | 83 | 15.6 | 31.7 | everyone + repair + *
knight-space | ks_everyone_launch | perfect | 136 | 16.2 | 33.7 | everyone + launch + *
knight-space | ks_everyone_build | perfect | 71 | 14.2 | 28.6 | everyone + build + *
knight-space | ks_everyone_rescue | perfect | 56 | 9 | 18.7 | everyone + rescue + *
knight-space | ks_everyone_explore | perfect | 51 | 9 | 18.7 | everyone + explore + *
knight-space | ks_everyone_defend | perfect | 73 | 9.6 | 19.9 | everyone + defend + *
knight-space | knight_space_1_partial_laser | partial | 47 | 2.5 | 7.6 | * + * + laser
knight-space | knight_space_default | partial | 26 | 3.3 | 9.1 | * + * + *

--- STAGE 2 (Mad Libs L2) (25 vignettes) ---
knight-space | ks2_routine_careful | partial | 28 | 2 | 6.4 | routine + careful
knight-space | ks2_routine_teamwork | partial | 33 | 2 | 6.4 | everyone + routine + teamwork
knight-space | ks2_routine_creative | partial | 43 | 2.5 | 7.6 | robot + routine + creative
knight-space | ks2_critical_careful | perfect | 56 | 3 | 8.7 | critical + repair + careful
knight-space | ks2_critical_fast | perfect | 51 | 2.5 | 7.6 | critical + launch + fast
knight-space | ks2_catastrophic_teamwork | perfect | 68 | 3 | 8.7 | catastrophic + rescue + teamwork
knight-space | ks2_catastrophic_any | partial | 21 | 1.5 | 5.7 | catastrophic
knight-space | ks2_urgent_fast | partial | 32 | 2 | 6.4 | urgent + fast
knight-space | ks2_creative_wild | partial | 42 | 2.5 | 7.6 | creative + flag
knight-space | ks2_fast_any | partial | 25 | 2 | 6.4 | fast
knight-space | ks2_careful_catastrophic | perfect | 42 | 2 | 6.4 | catastrophic + careful
knight-space | ks2_teamwork_solo | perfect | 32 | 2 | 6.4 | teamwork + robot
knight-space | ks2_routine_fast | partial | 49 | 2.5 | 7.6 | ranger + routine + fast
knight-space | ks2_urgent_careful | partial | 37 | 2.5 | 7.6 | engineer + urgent + careful + repair
knight-space | ks2_urgent_creative | partial | 40 | 2 | 6.4 | robot + urgent + creative + build
knight-space | ks2_urgent_teamwork | partial | 41 | 2 | 6.4 | everyone + urgent + teamwork + launch
knight-space | ks2_critical_creative | partial | 34 | 2 | 6.4 | knight + critical + creative + defend
knight-space | ks2_critical_teamwork | partial | 40 | 2 | 6.4 | everyone + critical + teamwork + repair
knight-space | ks2_catastrophic_creative | partial | 36 | 2 | 6.4 | ranger + catastrophic + creative + rescue
knight-space | ks2_catastrophic_fast | perfect | 44 | 2 | 6.4 | engineer + catastrophic + fast + repair
knight-space | ks2_critical_build_creative | partial | 34 | 2 | 6.4 | robot + critical + creative + build
knight-space | ks2_urgent_explore_fast | partial | 43 | 2.5 | 7.6 | knight + urgent + fast + explore
knight-space | ks2_routine_defend_creative | partial | 38 | 2 | 6.4 | ranger + routine + creative + defend
knight-space | ks2_critical_launch_teamwork | partial | 42 | 2 | 6.4 | everyone + critical + teamwork + launch
knight-space | knight_space_default_2 | partial | 18 | 1.5 | 5.7 | * + * + * + * + *

--- STAGE 3 (Mad Libs L3 — Combo) (7 vignettes) ---
knight-space | ks3_combo_solar_laser | perfect | 71 | 3 | 8.7 | solar_panel + laser
knight-space | ks3_combo_escape_pod | perfect | 59 | 3 | 8.7 | rocket + dome
knight-space | ks3_combo_signal_beacon | perfect | 62 | 3 | 8.7 | cargo + flag
knight-space | ks3_combo_force_shield | perfect | 66 | 3 | 8.7 | laser + dome
knight-space | ks3_combo_solar_sail | perfect | 71 | 3 | 8.7 | solar_panel + rocket
knight-space | ks3_combo_cargo_cannon | perfect | 67 | 3 | 8.7 | cargo + rocket
knight-space | knight_space_default_3 | partial | 22 | 1.5 | 5.7 | * + * + * + *
```

**Zone Summary:**
| Metric | Value |
|--------|-------|
| Total vignettes | 64 |
| Avg actions/vignette | 49.5 |
| Avg pre-amp time | 8.5s |
| Avg post-amp time | 18.4s |
| Longest (pre-amp) | ks_ranger_defend (21.8s pre / 43.1s post) |
| Shortest (pre-amp) | ks2_catastrophic_any (1.5s pre / 5.7s post) |
| Most actions | ks_everyone_launch (136 actions) |
| Fewest actions | knight_space_default_2 (18 actions) |
| Score distribution | perfect: 40, partial: 22, funny_fail: 2 |

---

## T3 — Mage vs. Kitchen

**File:** `frontend/src/data/vignettes/mage-kitchen.ts`
**Total vignettes:** 69 (Stage 1: 37, Stage 2: 24+1, Stage 3: 7)

```
zone | vignette_id | promptScore | actions | pre_amp_s | post_amp_s | trigger
---- | ----------- | ----------- | ------- | --------- | ---------- | -------

--- STAGE 1 (Mad Libs L1) (37 vignettes) ---
mage-kitchen | mk_fire_cook | perfect | 48 | 20.2 | 40.0 | fire_spell + * + cook_perfectly
mage-kitchen | mk_fire_explode | perfect | 55 | 24.5 | 47.9 | fire_spell + * + explode
mage-kitchen | mk_fire_dance | funny_fail | 50 | 24.1 | 47.7 | fire_spell + * + dance
mage-kitchen | mk_fire_multiply | perfect | 43 | 15.4 | 31.4 | fire_spell + * + multiply
mage-kitchen | mk_fire_calm | perfect | 33 | 16.1 | 31.8 | fire_spell + * + calm_down
mage-kitchen | mk_fire_wild | perfect | 43 | 19.7 | 38.9 | fire_spell + * + go_wild
mage-kitchen | mk_ice_cook | perfect | 45 | 18.4 | 37.0 | ice_spell + * + cook_perfectly
mage-kitchen | mk_ice_explode | perfect | 39 | 17.9 | 35.2 | ice_spell + * + explode
mage-kitchen | mk_ice_dance | funny_fail | 39 | 14.8 | 29.9 | ice_spell + * + dance
mage-kitchen | mk_ice_multiply | perfect | 37 | 16.4 | 32.6 | ice_spell + * + multiply
mage-kitchen | mk_ice_calm | perfect | 32 | 16.2 | 31.9 | ice_spell + * + calm_down
mage-kitchen | mk_ice_wild | perfect | 43 | 17.3 | 35.4 | ice_spell + * + go_wild
mage-kitchen | mk_grow_cook | perfect | 51 | 22.4 | 44.7 | grow_spell + * + cook_perfectly
mage-kitchen | mk_grow_explode | perfect | 40 | 20.9 | 40.4 | grow_spell + * + explode
mage-kitchen | mk_grow_dance | funny_fail | 38 | 17 | 34.2 | grow_spell + * + dance
mage-kitchen | mk_grow_multiply | perfect | 37 | 16.6 | 32.9 | grow_spell + * + multiply
mage-kitchen | mk_grow_calm | perfect | 31 | 16 | 31.3 | grow_spell + * + calm_down
mage-kitchen | mk_grow_wild | perfect | 47 | 18.9 | 37.4 | grow_spell + * + go_wild
mage-kitchen | mk_shrink_cook | perfect | 39 | 16 | 32.4 | shrink_spell + * + cook_perfectly
mage-kitchen | mk_shrink_explode | perfect | 38 | 17.9 | 34.8 | shrink_spell + * + explode
mage-kitchen | mk_shrink_dance | funny_fail | 31 | 16.1 | 31.8 | shrink_spell + * + dance
mage-kitchen | mk_shrink_multiply | perfect | 35 | 15.9 | 31.5 | shrink_spell + * + multiply
mage-kitchen | mk_shrink_calm | perfect | 32 | 15.2 | 30.1 | shrink_spell + * + calm_down
mage-kitchen | mk_shrink_wild | perfect | 37 | 14.1 | 28.4 | shrink_spell + * + go_wild
mage-kitchen | mk_lev_cook | perfect | 47 | 22 | 42.8 | levitate + * + cook_perfectly
mage-kitchen | mk_lev_explode | perfect | 45 | 19.2 | 38.2 | levitate + * + explode
mage-kitchen | mk_lev_dance | funny_fail | 37 | 18.4 | 35.6 | levitate + * + dance
mage-kitchen | mk_lev_multiply | perfect | 50 | 17.2 | 33.8 | levitate + * + multiply
mage-kitchen | mk_lev_calm | perfect | 34 | 15.2 | 30.1 | levitate + * + calm_down
mage-kitchen | mk_lev_wild | perfect | 42 | 16.3 | 33.2 | levitate + * + go_wild
mage-kitchen | mk_trans_cook | perfect | 47 | 18.2 | 36.7 | transform + * + cook_perfectly
mage-kitchen | mk_trans_explode | perfect | 41 | 18.8 | 36.6 | transform + * + explode
mage-kitchen | mk_trans_dance | funny_fail | 47 | 20.3 | 40.6 | transform + * + dance
mage-kitchen | mk_trans_multiply | perfect | 49 | 17.2 | 34.8 | transform + * + multiply
mage-kitchen | mk_trans_calm | perfect | 41 | 16.9 | 33.3 | transform + * + calm_down
mage-kitchen | mk_trans_wild | perfect | 42 | 16.9 | 33.7 | transform + * + go_wild
mage-kitchen | mage_kitchen_default | partial | 23 | 10 | 20.5 | * + * + *

--- STAGE 2 (Mad Libs L2) (25 vignettes) ---
mage-kitchen | mk2_tiny_fire_cook | perfect | 24 | 10.3 | 21.7 | tiny + fire_spell + * + cook_perfectly + *
mage-kitchen | mk2_mega_fire_explode | perfect | 30 | 13 | 25.8 | mega + fire_spell + * + explode + *
mage-kitchen | mk2_any_explode | perfect | 36 | 14.2 | 28.6 | * + * + * + explode + *
mage-kitchen | mk2_any_dance | perfect | 37 | 16.1 | 31.8 | * + * + * + dance + *
mage-kitchen | mk2_any_multiply | perfect | 31 | 14.4 | 28.9 | * + * + * + multiply + *
mage-kitchen | mk2_any_calm | perfect | 30 | 15 | 29.8 | * + * + * + calm_down + *
mage-kitchen | mk2_any_wild | perfect | 43 | 15.4 | 31.1 | * + * + * + go_wild + *
mage-kitchen | mk2_any_cook | perfect | 32 | 12 | 25.3 | * + * + * + cook_perfectly + *
mage-kitchen | mk2_medium_any | partial | 23 | 10.0 | 16.5 | medium + * + * + * + *
mage-kitchen | mk2_unstable_any | partial | 35 | 9.9 | 17.9 | unstable + * + * + * + *
mage-kitchen | mk2_any_one | partial | 22 | 9.8 | 16.1 | * + * + * + * + one
mage-kitchen | mk2_any_few | partial | 24 | 9.8 | 16.8 | * + * + * + * + a_few
mage-kitchen | mk2_any_dozen | partial | 36 | 10.6 | 18.4 | * + * + * + * + a_dozen
mage-kitchen | mk2_any_too_many | partial | 43 | 10.8 | 19.8 | * + * + * + * + way_too_many
mage-kitchen | mk2_mega_too_many | perfect | 57 | 13.5 | 23.0 | mega + * + * + * + way_too_many
mage-kitchen | mk2_tiny_one | perfect | 26 | 10.4 | 17.5 | tiny + * + * + * + one
mage-kitchen | mk2_unstable_dozen | perfect | 40 | 11.2 | 19.2 | unstable + * + * + * + a_dozen
mage-kitchen | mk2_medium_few | perfect | 25 | 10.3 | 17.3 | medium + * + * + * + a_few
mage-kitchen | mk2_mega_ice | perfect | 39 | 12.0 | 19.4 | mega + ice_spell + * + * + *
mage-kitchen | mk2_unstable_grow | perfect | 36 | 10.6 | 18.4 | unstable + grow_spell + * + * + *
mage-kitchen | mk2_tiny_levitate | perfect | 27 | 10.1 | 17.0 | tiny + levitate + * + * + *
mage-kitchen | mk2_mega_transform | perfect | 44 | 11.5 | 19.9 | mega + transform + * + * + *
mage-kitchen | mk2_unstable_explode | perfect | 39 | 10.8 | 18.7 | unstable + * + * + explode + *
mage-kitchen | mk2_tiny_wild | funny_fail | 32 | 10.6 | 17.8 | tiny + * + * + go_wild + *
mage-kitchen | mage_kitchen_default_2 | partial | 24 | 11.6 | 24.0 | * + * + * + * + *

--- STAGE 3 (Mad Libs L3 — Combo) (7 vignettes) ---
mage-kitchen | mk3_fire_ice | perfect | 27 | 12.8 | 25.8 | fire_spell + ice_spell + * + *
mage-kitchen | mk3_grow_shrink | perfect | 32 | 13.6 | 27.7 | grow_spell + shrink_spell + * + *
mage-kitchen | mk3_levitate_transform | perfect | 34 | 14.8 | 29.9 | levitate + transform + * + *
mage-kitchen | mk3_fire_stove | perfect | 28 | 10.7 | 22.3 | fire_spell + * + stove + *
mage-kitchen | mk3_ice_oven | perfect | 25 | 12.3 | 25.1 | ice_spell + * + oven + *
mage-kitchen | mk3_transform_sink | perfect | 27 | 13 | 26.1 | transform + * + sink + *
mage-kitchen | mage_kitchen_default_3 | partial | 17 | 9.3 | 19.1 | * + * + * + *
```

**Zone Summary:**
| Metric | Value |
|--------|-------|
| Total vignettes | 69 |
| Avg actions/vignette | 34.8 |
| Avg pre-amp time | 13.6s |
| Avg post-amp time | 26.1s |
| Longest (pre-amp) | mk_fire_explode (24.5s pre / 47.9s post) |
| Shortest (pre-amp) | mage_kitchen_default_3 (9.3s pre / 19.1s post) |
| Most actions | mk2_mega_too_many (57 actions) |
| Fewest actions | mage_kitchen_default_3 (17 actions) |
| Score distribution | perfect: 54, partial: 10, funny_fail: 7 |

---

## T4 — Barbarian's School

**File:** `frontend/src/data/vignettes/barbarian-school.ts`
**Total vignettes:** 69 (Stage 1: 36, Stage 2: 24+1, Stage 3: 8)

```
zone | vignette_id | promptScore | actions | pre_amp_s | post_amp_s | trigger
---- | ----------- | ----------- | ------- | --------- | ---------- | -------

--- STAGE 1 (Mad Libs L1) (36 vignettes) ---
barbarian-school | bs_barbarian_tag | perfect | 43 | 16.9 | 34.0 | barbarian + * + tag
barbarian-school | bs_barbarian_wrestling | perfect | 39 | 13.7 | 27.8 | barbarian + * + wrestling
barbarian-school | bs_barbarian_hide_seek | funny_fail | 34 | 18.6 | 35.9 | barbarian + * + hide_seek
barbarian-school | bs_barbarian_race | perfect | 39 | 13.2 | 27.8 | barbarian + * + race
barbarian-school | bs_barbarian_jumping | partial | 35 | 15 | 29.8 | barbarian + * + jumping
barbarian-school | bs_barbarian_climbing | perfect | 20 | 10.5 | 21.6 | barbarian + * + climbing
barbarian-school | bs_clown_tag | perfect | 36 | 16.5 | 33.1 | clown + * + tag
barbarian-school | bs_clown_wrestling | perfect | 30 | 9.8 | 21.3 | clown + * + wrestling
barbarian-school | bs_clown_hide_seek | funny_fail | 25 | 11.4 | 23.7 | clown + * + hide_seek
barbarian-school | bs_clown_race | funny_fail | 24 | 8.9 | 18.9 | clown + * + race
barbarian-school | bs_clown_jumping | perfect | 25 | 12.9 | 25.6 | clown + * + jumping
barbarian-school | bs_clown_climbing | partial | 23 | 12.2 | 24.9 | clown + * + climbing
barbarian-school | bs_ninja_tag | perfect | 41 | 14.5 | 31.1 | ninja + * + tag
barbarian-school | bs_ninja_wrestling | perfect | 38 | 13.5 | 27.9 | ninja + * + wrestling
barbarian-school | bs_ninja_hide_seek | perfect | 37 | 16.8 | 33.2 | ninja + * + hide_seek
barbarian-school | bs_ninja_race | perfect | 32 | 11.7 | 24.1 | ninja + * + race
barbarian-school | bs_ninja_jumping | perfect | 25 | 13.8 | 27.3 | ninja + * + jumping
barbarian-school | bs_ninja_climbing | perfect | 25 | 11.7 | 23.8 | ninja + * + climbing
barbarian-school | bs_robot_tag | funny_fail | 33 | 16.3 | 31.8 | robot + * + tag
barbarian-school | bs_robot_wrestling | perfect | 29 | 9.8 | 21.3 | robot + * + wrestling
barbarian-school | bs_robot_hide_seek | funny_fail | 33 | 16.1 | 31.8 | robot + * + hide_seek
barbarian-school | bs_robot_race | perfect | 31 | 15.4 | 30.4 | robot + * + race
barbarian-school | bs_robot_jumping | perfect | 25 | 14 | 27.9 | robot + * + jumping
barbarian-school | bs_robot_climbing | partial | 20 | 9.8 | 20.6 | robot + * + climbing
barbarian-school | bs_caveman_tag | perfect | 33 | 13.7 | 28.2 | caveman + * + tag
barbarian-school | bs_caveman_wrestling | perfect | 35 | 13.1 | 26.9 | caveman + * + wrestling
barbarian-school | bs_caveman_hide_seek | perfect | 36 | 16.4 | 32.6 | caveman + * + hide_seek
barbarian-school | bs_caveman_race | perfect | 35 | 16.2 | 32.3 | caveman + * + race
barbarian-school | bs_caveman_jumping | partial | 27 | 14.2 | 28.6 | caveman + * + jumping
barbarian-school | bs_caveman_climbing | perfect | 24 | 11.7 | 23.8 | caveman + * + climbing
barbarian-school | bs_everyone_tag | perfect | 24 | 8.9 | 18.9 | everyone + * + tag
barbarian-school | bs_everyone_wrestling | perfect | 25 | 10.5 | 21.6 | everyone + * + wrestling
barbarian-school | bs_everyone_hide_seek | funny_fail | 30 | 12 | 24.9 | everyone + * + hide_seek
barbarian-school | bs_everyone_race | perfect | 37 | 12.3 | 24.7 | everyone + * + race
barbarian-school | bs_everyone_jumping | perfect | 33 | 9.1 | 19.2 | everyone + * + jumping
barbarian-school | bs_everyone_climbing | perfect | 21 | 5.7 | 13.4 | everyone + * + climbing
barbarian-school | bs_default | partial | 17 | 7.7 | 16.8 | * + * + *

--- STAGE 2 (Mad Libs L2) (25 vignettes) ---
barbarian-school | bs2_sleepy_any | partial | 40 | 12.7 | 18.5 | sleepy + * + * + * + *
barbarian-school | bs2_normal_any | partial | 32 | 10.8 | 18.0 | normal + * + * + * + *
barbarian-school | bs2_hyper_any | partial | 36 | 10.4 | 17.4 | hyper + * + * + * + *
barbarian-school | bs2_mega_hyper_any | partial | 39 | 10.1 | 18.1 | MEGA_hyper + * + * + * + *
barbarian-school | bs2_any_sunny | partial | 24 | 8.6 | 14.8 | * + * + * + * + sunny
barbarian-school | bs2_any_rainy | partial | 28 | 8.8 | 15.6 | * + * + * + * + rainy
barbarian-school | bs2_any_snowy | partial | 31 | 9.3 | 16.3 | * + * + * + * + snowy
barbarian-school | bs2_any_windy | partial | 29 | 9.4 | 16.0 | * + * + * + * + windy
barbarian-school | bs2_sleepy_rainy | perfect | 39 | 12.3 | 18.4 | sleepy + * + * + * + rainy
barbarian-school | bs2_sleepy_sunny | perfect | 32 | 11.2 | 17.8 | sleepy + * + * + * + sunny
barbarian-school | bs2_hyper_snowy | perfect | 49 | 13.5 | 21.1 | hyper + * + * + * + snowy
barbarian-school | bs2_hyper_windy | perfect | 42 | 12.3 | 19.5 | hyper + * + * + * + windy
barbarian-school | bs2_mega_rainy | perfect | 49 | 11.3 | 19.8 | MEGA_hyper + * + * + * + rainy
barbarian-school | bs2_mega_snowy | perfect | 43 | 10.4 | 18.9 | MEGA_hyper + * + * + * + snowy
barbarian-school | bs2_normal_sunny | perfect | 36 | 10.4 | 17.4 | normal + * + * + * + sunny
barbarian-school | bs2_normal_snowy | perfect | 40 | 11.4 | 18.8 | normal + * + * + * + snowy
barbarian-school | bs2_mega_barbarian | perfect | 52 | 11.8 | 20.8 | MEGA_hyper + barbarian + * + * + *
barbarian-school | bs2_sleepy_robot | funny_fail | 37 | 11.4 | 18.6 | sleepy + robot + * + * + *
barbarian-school | bs2_hyper_clown | perfect | 43 | 11.9 | 19.7 | hyper + clown + * + * + *
barbarian-school | bs2_sleepy_ninja | funny_fail | 34 | 10.6 | 17.5 | sleepy + ninja + * + * + *
barbarian-school | bs2_snowy_tag | perfect | 54 | 13.9 | 21.9 | * + * + tag + * + snowy
barbarian-school | bs2_rainy_hide_seek | perfect | 46 | 12.6 | 20.1 | * + * + hide_seek + * + rainy
barbarian-school | bs2_windy_race | perfect | 39 | 11.0 | 18.4 | * + * + race + * + windy
barbarian-school | bs2_rainy_climbing | funny_fail | 37 | 10.6 | 18.0 | * + * + climbing + * + rainy
barbarian-school | bs_default_2 | partial | 18 | 7.7 | 16.8 | * + * + * + * + *

--- STAGE 3 (Mad Libs L3 — Combo) (9 vignettes) ---
barbarian-school | bs_tag_wrestling | perfect | 28 | 9.3 | 19.9 | tag + wrestling + * + *
barbarian-school | bs_hide_race | perfect | 36 | 13.1 | 27.3 | hide_seek + race + * + *
barbarian-school | bs_wrestling_jumping | perfect | 32 | 10.8 | 22.8 | wrestling + jumping + * + *
barbarian-school | bs_race_climbing | perfect | 41 | 13.5 | 28.6 | race + climbing + * + *
barbarian-school | bs_tag_race | perfect | 39 | 11.5 | 24.5 | tag + race + * + *
barbarian-school | bs_hide_climbing | perfect | 36 | 13.4 | 27.4 | hide_seek + climbing + * + *
barbarian-school | bs_wrestling_race | perfect | 34 | 11.3 | 23.9 | wrestling + race + * + *
barbarian-school | bs_default_3 | partial | 23 | 7.9 | 17.1 | * + * + * + *
```

**Zone Summary:**
| Metric | Value |
|--------|-------|
| Total vignettes | 69 |
| Avg actions/vignette | 34.2 |
| Avg pre-amp time | 11.3s |
| Avg post-amp time | 20.8s |
| Longest (pre-amp) | bs_barbarian_hide_seek (18.6s pre / 35.9s post) |
| Shortest (pre-amp) | bs_everyone_climbing (5.7s pre / 13.4s post) |
| Most actions | bs2_snowy_tag (54 actions) |
| Fewest actions | bs_default (17 actions) |
| Score distribution | perfect: 46, partial: 16, funny_fail: 9 |

---

## T5 — Dungeon Rock Concert

**File:** `frontend/src/data/vignettes/dungeon-concert.ts`
**Total vignettes:** 69 (Stage 1: 37, Stage 2: 25, Stage 3: 7)

```
zone | vignette_id | promptScore | actions | pre_amp_s | post_amp_s | trigger
---- | ----------- | ----------- | ------- | --------- | ---------- | -------

--- STAGE 1 (Mad Libs L1) (37 vignettes) ---
dungeon-concert | dc_knight_sneak | funny_fail | 29 | 14.7 | 29.0 | knight + sneak + *
dungeon-concert | dc_knight_fight | perfect | 35 | 14.7 | 29.3 | knight + fight + *
dungeon-concert | dc_knight_magic | funny_fail | 26 | 14.1 | 28.1 | knight + magic + *
dungeon-concert | dc_knight_lockpick | funny_fail | 32 | 14.1 | 28.1 | knight + lockpick + *
dungeon-concert | dc_knight_distract | partial | 28 | 13.7 | 27.5 | knight + distract + *
dungeon-concert | dc_knight_smash | perfect | 34 | 13.3 | 26.9 | knight + smash + *
dungeon-concert | dc_mage_sneak | funny_fail | 21 | 9.6 | 19.9 | mage + sneak + *
dungeon-concert | dc_mage_fight | funny_fail | 20 | 9.6 | 19.9 | mage + fight + *
dungeon-concert | dc_mage_magic | perfect | 34 | 11 | 22.4 | mage + magic + *
dungeon-concert | dc_mage_lockpick | funny_fail | 20 | 7.3 | 15.8 | mage + lockpick + *
dungeon-concert | dc_mage_distract | perfect | 30 | 11 | 22.4 | mage + distract + *
dungeon-concert | dc_mage_smash | funny_fail | 16 | 7.3 | 15.8 | mage + smash + *
dungeon-concert | dc_rogue_sneak | perfect | 21 | 9.6 | 19.9 | rogue + sneak + *
dungeon-concert | dc_rogue_fight | partial | 18 | 6.9 | 15.2 | rogue + fight + *
dungeon-concert | dc_rogue_magic | funny_fail | 18 | 9.6 | 19.9 | rogue + magic + *
dungeon-concert | dc_rogue_lockpick | perfect | 23 | 9.6 | 19.9 | rogue + lockpick + *
dungeon-concert | dc_rogue_distract | perfect | 25 | 9.6 | 19.9 | rogue + distract + *
dungeon-concert | dc_rogue_smash | funny_fail | 16 | 7.3 | 15.8 | rogue + smash + *
dungeon-concert | dc_skeleton_sneak | funny_fail | 19 | 9.6 | 19.9 | skeleton + sneak + *
dungeon-concert | dc_skeleton_fight | perfect | 32 | 12 | 24.6 | skeleton + fight + *
dungeon-concert | dc_skeleton_magic | perfect | 27 | 9.6 | 19.9 | skeleton + magic + *
dungeon-concert | dc_skeleton_lockpick | perfect | 22 | 9.6 | 19.9 | skeleton + lockpick + *
dungeon-concert | dc_skeleton_distract | perfect | 19 | 7.3 | 15.8 | skeleton + distract + *
dungeon-concert | dc_skeleton_smash | perfect | 22 | 6.9 | 15.2 | skeleton + smash + *
dungeon-concert | dc_necromancer_sneak | funny_fail | 17 | 7.3 | 15.8 | necromancer + sneak + *
dungeon-concert | dc_necromancer_fight | perfect | 23 | 7.3 | 15.8 | necromancer + fight + *
dungeon-concert | dc_necromancer_magic | perfect | 20 | 7.3 | 15.8 | necromancer + magic + *
dungeon-concert | dc_necromancer_lockpick | perfect | 19 | 7.3 | 15.8 | necromancer + lockpick + *
dungeon-concert | dc_necromancer_distract | perfect | 22 | 7.3 | 15.8 | necromancer + distract + *
dungeon-concert | dc_necromancer_smash | funny_fail | 16 | 7.3 | 15.8 | necromancer + smash + *
dungeon-concert | dc_team_sneak | funny_fail | 14 | 6 | 13.2 | team + sneak + *
dungeon-concert | dc_team_fight | perfect | 23 | 7 | 15.0 | team + fight + *
dungeon-concert | dc_team_magic | funny_fail | 14 | 6 | 13.2 | team + magic + *
dungeon-concert | dc_team_lockpick | partial | 17 | 6 | 13.2 | team + lockpick + *
dungeon-concert | dc_team_distract | perfect | 20 | 6 | 13.2 | team + distract + *
dungeon-concert | dc_team_smash | perfect | 22 | 6 | 13.2 | team + smash + *
dungeon-concert | dungeon_concert_default | partial | 15 | 1.5 | 5.7 | * + * + *

--- STAGE 2 (Mad Libs L2) (25 vignettes) ---
dungeon-concert | dc2_loud_sneak_guard_fast | perfect | 57 | 2.5 | 7.6 | knight + loud + sneak + guard + fast
dungeon-concert | dc2_loud_fight_skeleton_army_normal | perfect | 84 | 3 | 8.7 | barbarian + loud + fight + skeleton_army + normal
dungeon-concert | dc2_loud_distract_trap_slow | perfect | 57 | 2.5 | 7.6 | clown + loud + distract + trap + slow
dungeon-concert | dc2_invisible_sneak_guard_quiet | perfect | 58 | 3 | 8.7 | rogue + invisible + sneak + guard + normal
dungeon-concert | dc2_disguised_lockpick_locked_door_slow | perfect | 65 | 3 | 8.7 | mage + disguised + lockpick + locked_door + slow
dungeon-concert | dc2_invisible_magic_darkness_instant | perfect | 70 | 3 | 8.7 | necromancer + invisible + magic + darkness + instant
dungeon-concert | dc2_knight_smash_locked_door_fast | perfect | 57 | 3.4 | 9.6 | knight + smash + locked_door + fast
dungeon-concert | dc2_rogue_sneak_trap_slow | perfect | 46 | 2.5 | 7.6 | rogue + sneak + trap + slow
dungeon-concert | dc2_mage_magic_puzzle_instant | perfect | 50 | 2.5 | 7.6 | mage + magic + puzzle + instant
dungeon-concert | dc2_team_quiet_fight_skeleton_army_normal | perfect | 93 | 3 | 8.7 | team + quiet + fight + skeleton_army + normal
dungeon-concert | dc2_skeleton_disguised_distract_guard_fast | perfect | 72 | 3 | 8.7 | skeleton + disguised + distract + guard + fast
dungeon-concert | dc2_necromancer_quiet_magic_darkness_slow | perfect | 47 | 2.5 | 7.6 | necromancer + quiet + magic + darkness + slow
dungeon-concert | dc2_quiet_lockpick_locked_door_fast | perfect | 45 | 2.5 | 7.6 | rogue + quiet + lockpick + locked_door + fast
dungeon-concert | dc2_loud_magic_puzzle_instant | perfect | 55 | 2.5 | 7.6 | barbarian + loud + magic + puzzle + instant
dungeon-concert | dc2_invisible_fight_trap_normal | perfect | 48 | 2.5 | 7.6 | knight + invisible + fight + trap + normal
dungeon-concert | dc2_disguised_smash_wall_slow | perfect | 61 | 3 | 8.7 | skeleton + disguised + smash + wall + slow
dungeon-concert | dc2_quiet_sneak_darkness_instant | perfect | 53 | 3 | 8.7 | mage + quiet + sneak + darkness + instant
dungeon-concert | dc2_loud_lockpick_chest_instant | perfect | 56 | 2.5 | 7.6 | barbarian + loud + lockpick + chest + instant
dungeon-concert | dc2_invisible_distract_skeleton_army_slow | perfect | 72 | 3 | 8.7 | necromancer + invisible + distract + skeleton_army + slow
dungeon-concert | dc2_disguised_magic_trap_fast | perfect | 52 | 2.5 | 7.6 | mage + disguised + magic + trap + fast
dungeon-concert | dc2_quiet_smash_puzzle_normal | perfect | 48 | 2.5 | 7.6 | knight + quiet + smash + puzzle + normal
dungeon-concert | dc2_invisible_smash_guard_instant | perfect | 80 | 3 | 8.7 | barbarian + invisible + smash + guard + instant
dungeon-concert | dc2_loud_sneak_locked_door_normal | perfect | 52 | 2.5 | 7.6 | skeleton + loud + sneak + locked_door + normal
dungeon-concert | dc2_disguised_fight_locked_door_instant | perfect | 78 | 3 | 8.7 | rogue + disguised + fight + locked_door + instant
dungeon-concert | dc2_default | partial | 14 | 1.5 | 5.7 | * + * + * + * + *

--- STAGE 3 (Mad Libs L3 — Combo) (7 vignettes) ---
dungeon-concert | dc3_shadow_strike | perfect | 97 | 3.5 | 9.8 | sneak + fight + shadow + throne_room
dungeon-concert | dc3_arcane_locksmith | perfect | 73 | 3 | 8.7 | magic + lockpick + fire + treasury
dungeon-concert | dc3_chaos_exit | perfect | 116 | 3.5 | 9.8 | distract + smash + music + armory
dungeon-concert | dc3_spell_blade | perfect | 110 | 3.5 | 9.8 | fight + magic + ice + library
dungeon-concert | dc3_ghost_trick | perfect | 88 | 3.5 | 9.8 | sneak + distract + shadow + treasury
dungeon-concert | dc3_pick_or_smash | perfect | 113 | 3.5 | 9.8 | lockpick + smash + fire + armory
dungeon-concert | dc3_default | partial | 26 | 2 | 6.4 | * + * + * + *
```

**Zone Summary:**
| Metric | Value |
|--------|-------|
| Total vignettes | 69 |
| Avg actions/vignette | 42.3 |
| Avg pre-amp time | 6.1s |
| Avg post-amp time | 13.9s |
| Longest (pre-amp) | dc_knight_sneak (14.7s pre / 29.0s post) |
| Shortest (pre-amp) | dungeon_concert_default (1.5s pre / 5.7s post) |
| Most actions | dc3_chaos_exit (116 actions) |
| Fewest actions | dc_team_sneak (14 actions) |
| Score distribution | perfect: 49, partial: 6, funny_fail: 14 |

---

## T6 — Skeleton Pizza Delivery

**File:** `frontend/src/data/vignettes/skeleton-pizza.ts`
**Total vignettes:** 64 (Stage 1: 31, Stage 2: 26, Stage 3: 7)

```
zone | vignette_id | promptScore | actions | pre_amp_s | post_amp_s | trigger
---- | ----------- | ----------- | ------- | --------- | ---------- | -------

--- STAGE 1 (Mad Libs L1) (31 vignettes) ---
skeleton-pizza | sp_skeleton_pizza | perfect | 59 | 23.6 | 46.6 | skeleton + pizza + *
skeleton-pizza | sp_skeleton_pepperoni | perfect | 60 | 22.4 | 44.7 | skeleton + pepperoni + *
skeleton-pizza | sp_skeleton_pasta | funny_fail | 59 | 20.3 | 40.9 | skeleton + pasta + *
skeleton-pizza | sp_skeleton_soup | perfect | 64 | 24.5 | 47.9 | skeleton + soup + *
skeleton-pizza | sp_skeleton_cake | funny_fail | 64 | 19.7 | 38.9 | skeleton + cake + *
skeleton-pizza | sp_skeleton_mystery | partial | 51 | 22.4 | 43.3 | skeleton + mystery + *
skeleton-pizza | sp_clown_pizza | perfect | 60 | 24.4 | 48.1 | clown + pizza + *
skeleton-pizza | sp_clown_pepperoni | perfect | 62 | 24.2 | 47.8 | clown + pepperoni + *
skeleton-pizza | sp_clown_pasta | perfect | 62 | 22.5 | 44.9 | clown + pasta + *
skeleton-pizza | sp_clown_soup | perfect | 63 | 20.3 | 40.6 | clown + soup + *
skeleton-pizza | sp_clown_cake | perfect | 69 | 23.8 | 47.2 | clown + cake + *
skeleton-pizza | sp_clown_mystery | perfect | 72 | 22.5 | 45.3 | clown + mystery + *
skeleton-pizza | sp_superhero_pizza | perfect | 67 | 24.1 | 47.7 | superhero + pizza + *
skeleton-pizza | sp_superhero_pepperoni | perfect | 16 | 3.5 | 9.1 | superhero + pepperoni + *
skeleton-pizza | sp_superhero_pasta | perfect | 13 | 3.5 | 9.1 | superhero + pasta + *
skeleton-pizza | sp_superhero_soup | perfect | 13 | 3.4 | 8.9 | superhero + soup + *
skeleton-pizza | sp_superhero_cake | perfect | 16 | 3.4 | 8.9 | superhero + cake + *
skeleton-pizza | sp_superhero_mystery | perfect | 16 | 3.9 | 10.0 | superhero + mystery + *
skeleton-pizza | sp_survivalist_pizza | perfect | 15 | 3.5 | 9.1 | survivalist + pizza + *
skeleton-pizza | sp_survivalist_pepperoni | perfect | 13 | 3.5 | 9.1 | survivalist + pepperoni + *
skeleton-pizza | sp_survivalist_pasta | perfect | 12 | 3.5 | 9.1 | survivalist + pasta + *
skeleton-pizza | sp_survivalist_soup | perfect | 12 | 3.5 | 9.1 | survivalist + soup + *
skeleton-pizza | sp_survivalist_cake | perfect | 12 | 3.5 | 9.1 | survivalist + cake + *
skeleton-pizza | sp_survivalist_mystery | perfect | 16 | 3.9 | 10.0 | survivalist + mystery + *
skeleton-pizza | sp_everyone_pizza | perfect | 19 | 3.5 | 9.1 | everyone + pizza + *
skeleton-pizza | sp_everyone_pepperoni | perfect | 17 | 3.5 | 9.1 | everyone + pepperoni + *
skeleton-pizza | sp_everyone_pasta | perfect | 14 | 3.5 | 9.1 | everyone + pasta + *
skeleton-pizza | sp_everyone_soup | perfect | 15 | 3.5 | 9.1 | everyone + soup + *
skeleton-pizza | sp_everyone_cake | perfect | 18 | 3.5 | 9.1 | everyone + cake + *
skeleton-pizza | sp_everyone_mystery | perfect | 23 | 4.3 | 10.6 | everyone + mystery + *
skeleton-pizza | skeleton_pizza_default | partial | 21 | 2.3 | 7.6 | * + * + *

--- STAGE 2 (Mad Libs L2) (26 vignettes) ---
skeleton-pizza | sp2_cold_frozen_confusion | perfect | 43 | 2.5 | 7.6 | skeleton + pizza + cold + single
skeleton-pizza | sp2_cold_ice_sculpture | perfect | 46 | 2.5 | 7.6 | clown + cake + cold + mountain
skeleton-pizza | sp2_cold_ice_crystals | perfect | 43 | 2.5 | 7.6 | survivalist + soup + cold + family_size
skeleton-pizza | sp2_blazing_fire_tower | perfect | 53 | 2.5 | 7.6 | skeleton + pizza + blazing + mountain
skeleton-pizza | sp2_volcanic_endless_explosion | perfect | 51 | 2.5 | 7.6 | superhero + cake + volcanic + infinite
skeleton-pizza | sp2_blazing_pepperoni_feast | perfect | 43 | 2.5 | 7.6 | clown + pepperoni + blazing + family_size
skeleton-pizza | sp2_amount_tiny_plate | partial | 35 | 2.5 | 7.6 | skeleton + cake + * + single
skeleton-pizza | sp2_amount_tower_of_food | partial | 42 | 2.5 | 7.6 | superhero + pizza + * + mountain
skeleton-pizza | sp2_amount_flooding | perfect | 43 | 2.5 | 7.6 | clown + pasta + * + infinite
skeleton-pizza | sp2_cross_perfect_soup | perfect | 39 | 2.5 | 7.6 | survivalist + soup + warm + family_size
skeleton-pizza | sp2_cross_mystery_chaos | perfect | 54 | 2.5 | 7.6 | skeleton + mystery + volcanic + infinite
skeleton-pizza | sp2_cross_team_cooking | perfect | 70 | 2.5 | 7.6 | everyone + cake + blazing + mountain
skeleton-pizza | sp2_cold_frozen_avalanche | perfect | 51 | 2.5 | 7.6 | superhero + pizza + cold + infinite
skeleton-pizza | sp2_warm_cozy_treat | perfect | 42 | 2.5 | 7.6 | knight + cake + warm + single
skeleton-pizza | sp2_warm_feast_pile | perfect | 46 | 2.5 | 7.6 | barbarian + pepperoni + warm + mountain
skeleton-pizza | sp2_warm_endless_noodles | perfect | 46 | 2.5 | 7.6 | mage + pasta + warm + infinite
skeleton-pizza | sp2_blazing_fire_bowl | perfect | 42 | 2.5 | 7.6 | clown + soup + blazing + single
skeleton-pizza | sp2_blazing_inferno_chaos | perfect | 54 | 2.5 | 7.6 | skeleton + mystery + blazing + infinite
skeleton-pizza | sp2_volcanic_lava_slice | perfect | 50 | 2.5 | 7.6 | survivalist + pizza + volcanic + single
skeleton-pizza | sp2_volcanic_erupting_cauldron | perfect | 54 | 2.5 | 7.6 | knight + soup + volcanic + family_size
skeleton-pizza | sp2_volcanic_fire_mountain | perfect | 51 | 2.5 | 7.6 | barbarian + pepperoni + volcanic + mountain
skeleton-pizza | sp2_warm_party_ready | perfect | 43 | 2.5 | 7.6 | clown + cake + warm + family_size
skeleton-pizza | sp2_cold_frozen_noodles | perfect | 43 | 2.5 | 7.6 | mage + pasta + cold + family_size
skeleton-pizza | sp2_blazing_flame_feast | perfect | 50 | 2.5 | 7.6 | superhero + cake + blazing + family_size
skeleton-pizza | sp2_cold_ice_tower | perfect | 49 | 2.5 | 7.6 | knight + pepperoni + cold + mountain
skeleton-pizza | skeleton_pizza_default_2 | partial | 31 | 2.5 | 7.6 | * + * + * + *

--- STAGE 3 (Mad Libs L3 — Combo) (7 vignettes) ---
skeleton-pizza | sp3_combo_baked_alaska | perfect | 71 | 3 | 8.7 | grill + freeze + * + *
skeleton-pizza | sp3_combo_aerial_kitchen | perfect | 65 | 3 | 8.7 | juggle + launch + * + *
skeleton-pizza | sp3_combo_magic_crumble | perfect | 97 | 3.5 | 9.8 | smash + enchant + * + *
skeleton-pizza | sp3_combo_ice_rocket | perfect | 93 | 3.5 | 9.8 | freeze + launch + * + *
skeleton-pizza | sp3_combo_flame_smash | perfect | 100 | 3.5 | 9.8 | grill + smash + * + *
skeleton-pizza | sp3_combo_enchanted_juggle | perfect | 90 | 3.5 | 9.8 | juggle + enchant + * + *
skeleton-pizza | skeleton_pizza_default_3 | partial | 40 | 2.5 | 7.6 | * + * + * + *
```

**Zone Summary:**
| Metric | Value |
|--------|-------|
| Total vignettes | 64 |
| Avg actions/vignette | 44.7 |
| Avg pre-amp time | 7.0s |
| Avg post-amp time | 15.8s |
| Longest (pre-amp) | sp_skeleton_soup (24.5s pre / 47.9s post) |
| Shortest (pre-amp) | skeleton_pizza_default (2.3s pre / 7.6s post) |
| Most actions | sp3_combo_flame_smash (100 actions) |
| Fewest actions | sp_survivalist_pasta (12 actions) |
| Score distribution | perfect: 56, partial: 6, funny_fail: 2 |

---

## T7 — Adventurers' Picnic

**File:** `frontend/src/data/vignettes/adventurers-picnic.ts`
**Total vignettes:** 69 (Stage 1: 37, Stage 2: 25, Stage 3: 7)

```
zone | vignette_id | promptScore | actions | pre_amp_s | post_amp_s | trigger
---- | ----------- | ----------- | ------- | --------- | ---------- | -------

--- STAGE 1 (Mad Libs L1) (37 vignettes) ---
adventurers-picnic | ap_ranger_investigate | perfect | 36 | 17 | 33.1 | ranger + * + investigate
adventurers-picnic | ap_ranger_celebrate | perfect | 43 | 20.2 | 39.7 | ranger + * + celebrate
adventurers-picnic | ap_ranger_panic | funny_fail | 28 | 13.2 | 26.4 | ranger + * + panic
adventurers-picnic | ap_ranger_cast_spell | funny_fail | 24 | 13.3 | 26.6 | ranger + * + cast_spell
adventurers-picnic | ap_ranger_set_trap | perfect | 41 | 18.2 | 36.0 | ranger + * + set_trap
adventurers-picnic | ap_ranger_have_picnic | perfect | 50 | 22.3 | 43.9 | ranger + * + have_picnic
adventurers-picnic | ap_druid_investigate | perfect | 38 | 17.3 | 33.6 | druid + * + investigate
adventurers-picnic | ap_druid_celebrate | perfect | 43 | 18.3 | 36.1 | druid + * + celebrate
adventurers-picnic | ap_druid_panic | funny_fail | 29 | 14.4 | 28.6 | druid + * + panic
adventurers-picnic | ap_druid_cast_spell | perfect | 37 | 16.9 | 33.7 | druid + * + cast_spell
adventurers-picnic | ap_druid_set_trap | perfect | 34 | 15.4 | 30.4 | druid + * + set_trap
adventurers-picnic | ap_druid_have_picnic | perfect | 52 | 20.6 | 41.7 | druid + * + have_picnic
adventurers-picnic | ap_barbarian_investigate | perfect | 18 | 5.7 | 13.1 | barbarian + * + investigate
adventurers-picnic | ap_barbarian_celebrate | perfect | 24 | 10.2 | 21.2 | barbarian + * + celebrate
adventurers-picnic | ap_barbarian_panic | perfect | 15 | 3.7 | 9.4 | barbarian + * + panic
adventurers-picnic | ap_barbarian_cast_spell | funny_fail | 11 | 3.1 | 8.1 | barbarian + * + cast_spell
adventurers-picnic | ap_barbarian_set_trap | perfect | 19 | 5.9 | 14.1 | barbarian + * + set_trap
adventurers-picnic | ap_barbarian_have_picnic | perfect | 40 | 15 | 31.2 | barbarian + * + have_picnic
adventurers-picnic | ap_ninja_investigate | perfect | 18 | 6.2 | 14.2 | ninja + * + investigate
adventurers-picnic | ap_ninja_celebrate | perfect | 20 | 8.7 | 18.6 | ninja + * + celebrate
adventurers-picnic | ap_ninja_panic | perfect | 15 | 3.3 | 8.4 | ninja + * + panic
adventurers-picnic | ap_ninja_cast_spell | funny_fail | 9 | 3.1 | 8.1 | ninja + * + cast_spell
adventurers-picnic | ap_ninja_set_trap | perfect | 22 | 5.9 | 14.1 | ninja + * + set_trap
adventurers-picnic | ap_ninja_have_picnic | perfect | 27 | 9.1 | 20.2 | ninja + * + have_picnic
adventurers-picnic | ap_rogue_investigate | perfect | 16 | 5.7 | 13.1 | rogue + * + investigate
adventurers-picnic | ap_rogue_celebrate | perfect | 22 | 9.6 | 19.9 | rogue + * + celebrate
adventurers-picnic | ap_rogue_panic | funny_fail | 11 | 3.1 | 8.1 | rogue + * + panic
adventurers-picnic | ap_rogue_cast_spell | funny_fail | 9 | 3.1 | 8.1 | rogue + * + cast_spell
adventurers-picnic | ap_rogue_set_trap | perfect | 18 | 5.9 | 14.1 | rogue + * + set_trap
adventurers-picnic | ap_rogue_have_picnic | perfect | 28 | 8.2 | 18.5 | rogue + * + have_picnic
adventurers-picnic | ap_whole_party_investigate | perfect | 16 | 3.6 | 9.2 | whole_party + * + investigate
adventurers-picnic | ap_whole_party_celebrate | perfect | 28 | 11.5 | 23.8 | whole_party + * + celebrate
adventurers-picnic | ap_whole_party_panic | perfect | 16 | 3.9 | 9.7 | whole_party + * + panic
adventurers-picnic | ap_whole_party_cast_spell | funny_fail | 13 | 3.6 | 9.2 | whole_party + * + cast_spell
adventurers-picnic | ap_whole_party_set_trap | perfect | 17 | 3.6 | 9.2 | whole_party + * + set_trap
adventurers-picnic | ap_whole_party_have_picnic | perfect | 50 | 18.7 | 38.5 | whole_party + * + have_picnic
adventurers-picnic | adventurers_picnic_default | partial | 18 | 1.5 | 5.7 | * + * + *

--- STAGE 2 (Mad Libs L2) (25 vignettes) ---
adventurers-picnic | ap2_reckless_barbarian_portal | perfect | 49 | 2.5 | 7.6 | reckless + noon + barbarian + magic_portal + *
adventurers-picnic | ap2_reckless_ranger_treasure | funny_fail | 53 | 2.5 | 7.6 | reckless + dawn + ranger + treasure + *
adventurers-picnic | ap2_reckless_ninja_creature | perfect | 39 | 2.5 | 7.6 | reckless + dusk + ninja + creature + *
adventurers-picnic | ap2_stealthy_rogue_midnight | perfect | 42 | 2.5 | 7.6 | stealthy + midnight + rogue + treasure + investigate
adventurers-picnic | ap2_stealthy_druid_plant | perfect | 39 | 2.5 | 7.6 | stealthy + dawn + druid + glowing_plant + investigate
adventurers-picnic | ap2_cautious_ranger_ruin | perfect | 59 | 3 | 8.7 | cautious + * + ranger + ancient_ruin + set_trap
adventurers-picnic | ap2_dawn_druid_plant | perfect | 51 | 2.5 | 7.6 | * + dawn + druid + glowing_plant + cast_spell
adventurers-picnic | ap2_midnight_portal | partial | 35 | 2.5 | 7.6 | * + midnight + * + magic_portal + *
adventurers-picnic | ap2_dusk_treasure | partial | 36 | 2.5 | 7.6 | * + dusk + * + treasure + *
adventurers-picnic | ap2_bold_barbarian_ruin | perfect | 46 | 2.5 | 7.6 | bold + noon + barbarian + ancient_ruin + *
adventurers-picnic | ap2_cautious_ninja_food | perfect | 42 | 2.5 | 7.6 | cautious + dusk + ninja + enchanted_food + investigate
adventurers-picnic | ap2_stealthy_party_creature | perfect | 43 | 2.5 | 7.6 | stealthy + midnight + whole_party + creature + investigate
adventurers-picnic | ap2_bold_ranger_dawn_treasure | perfect | 31 | 2 | 6.4 | bold + dawn + ranger + treasure + celebrate
adventurers-picnic | ap2_bold_ninja_dusk_panic | funny_fail | 43 | 2.5 | 7.6 | bold + dusk + ninja + creature + panic
adventurers-picnic | ap2_bold_druid_midnight_portal | perfect | 47 | 2.5 | 7.6 | bold + midnight + druid + magic_portal + cast_spell
adventurers-picnic | ap2_cautious_barbarian_noon_trap | perfect | 60 | 3 | 8.7 | cautious + noon + barbarian + treasure + set_trap
adventurers-picnic | ap2_cautious_rogue_midnight_ruin | perfect | 45 | 2.5 | 7.6 | cautious + midnight + rogue + ancient_ruin + investigate
adventurers-picnic | ap2_cautious_party_dawn_picnic | perfect | 49 | 2.5 | 7.6 | cautious + dawn + whole_party + enchanted_food + have_picnic
adventurers-picnic | ap2_stealthy_ranger_noon_plant | partial | 37 | 2.5 | 7.6 | stealthy + noon + ranger + glowing_plant + investigate
adventurers-picnic | ap2_reckless_rogue_midnight_creature | perfect | 50 | 2.5 | 7.6 | reckless + midnight + rogue + creature + celebrate
adventurers-picnic | ap2_bold_party_dawn_portal | perfect | 56 | 2.5 | 7.6 | bold + dawn + whole_party + magic_portal + investigate
adventurers-picnic | ap2_stealthy_barbarian_dusk_trap | perfect | 65 | 3 | 8.7 | stealthy + dusk + barbarian + ancient_ruin + set_trap
adventurers-picnic | ap2_reckless_druid_noon_plant | perfect | 48 | 2.5 | 7.6 | reckless + noon + druid + glowing_plant + celebrate
adventurers-picnic | ap2_bold_rogue_dusk_food | perfect | 45 | 2.5 | 7.6 | bold + dusk + rogue + enchanted_food + investigate
adventurers-picnic | adventurers_picnic_default_2 | partial | 23 | 2 | 6.4 | * + * + * + * + *

--- STAGE 3 (Mad Libs L3 — Combo) (7 vignettes) ---
adventurers-picnic | ap3_investigate_spell_discovery | perfect | 63 | 3 | 8.7 | investigate + cast_spell + * + *
adventurers-picnic | ap3_trap_celebrate_party | perfect | 62 | 3 | 8.7 | set_trap + celebrate + * + *
adventurers-picnic | ap3_panic_picnic_chaos | perfect | 46 | 2.5 | 7.6 | panic + have_picnic + * + *
adventurers-picnic | ap3_spell_trap_enchanted | perfect | 59 | 3 | 8.7 | cast_spell + set_trap + * + *
adventurers-picnic | ap3_investigate_picnic_feast | perfect | 36 | 2.5 | 7.6 | investigate + have_picnic + * + *
adventurers-picnic | ap3_celebrate_panic_chaos | perfect | 56 | 2.5 | 7.6 | celebrate + panic + * + *
adventurers-picnic | adventurers_picnic_default_3 | partial | 21 | 2 | 6.4 | * + * + * + *
```

**Zone Summary:**
| Metric | Value |
|--------|-------|
| Total vignettes | 69 |
| Avg actions/vignette | 35.2 |
| Avg pre-amp time | 6.5s |
| Avg post-amp time | 14.8s |
| Longest (pre-amp) | ap_ranger_have_picnic (22.3s pre / 43.9s post) |
| Shortest (pre-amp) | adventurers_picnic_default (1.5s pre / 5.7s post) |
| Most actions | ap2_stealthy_barbarian_dusk_trap (65 actions) |
| Fewest actions | ap_ninja_cast_spell (9 actions) |
| Score distribution | perfect: 53, partial: 6, funny_fail: 10 |

---

## Grand Summary

| Zone | Count | Avg Actions | Avg Pre-Amp | Avg Post-Amp | Longest Pre | Shortest Pre |
|------|-------|-------------|-------------|--------------|-------------|-------------|
| skeleton-birthday | 72 | 33.0 | 12.1s | 25.0s | 33.2s | 2.9s |
| knight-space | 64 | 49.5 | 8.5s | 18.4s | 21.8s | 1.5s |
| mage-kitchen | 69 | 34.8 | 13.6s | 26.1s | 24.5s | 9.3s |
| barbarian-school | 69 | 34.2 | 11.3s | 20.8s | 18.6s | 5.7s |
| dungeon-concert | 69 | 42.3 | 6.1s | 13.9s | 14.7s | 1.5s |
| skeleton-pizza | 64 | 44.7 | 7.0s | 15.8s | 24.5s | 2.3s |
| adventurers-picnic | 69 | 35.2 | 6.5s | 14.8s | 22.3s | 1.5s |
| **TOTAL** | **476** | **38.7** | **9.2s** | **19.2s** | | |

### By Stage

| Stage | Count | Avg Actions | Avg Pre-Amp | Avg Post-Amp |
|-------|-------|-------------|-------------|-------------|
| Stage 1 | 250 | 35.6 | 14.3s | 29.1s |
| Stage 2 | 176 | 37.8 | 8.6s | 16.1s |
| Stage 3 | 51 | 50.8 | 5.5s | 13.0s |

### By Prompt Score

| Score | Count | Pct | Avg Pre-Amp | Avg Post-Amp |
|-------|-------|-----|-------------|-------------|
| perfect | 361 | 75.8% | 10.0s | 20.8s |
| partial | 70 | 14.7% | 6.6s | 13.8s |
| funny_fail | 46 | 9.7% | 10.8s | 21.6s |

### Outlier Analysis

**Top 10 Longest Vignettes (pre-amplification):**

| # | Zone | ID | Pre-Amp | Post-Amp | Actions |
|---|------|----|---------|----------|--------|
| 1 | skeleton-birthday | sb_feast_fireworks | 33.2s | 65.2s | 93 |
| 2 | skeleton-birthday | sb_feast_magic_show | 32.9s | 62.6s | 72 |
| 3 | skeleton-birthday | sb_pizza_music | 31.2s | 58.6s | 64 |
| 4 | skeleton-birthday | sb_feast_dance | 27.7s | 53.0s | 53 |
| 5 | skeleton-birthday | sb_cake_music | 27.3s | 53.1s | 59 |
| 6 | skeleton-birthday | sb_feast_music | 25.6s | 49.2s | 55 |
| 7 | skeleton-birthday | sb_cake_combat | 25.3s | 48.8s | 59 |
| 8 | skeleton-birthday | sb_cake_dance | 24.8s | 47.3s | 47 |
| 9 | skeleton-birthday | sb_feast_games | 24.5s | 47.9s | 55 |
| 10 | mage-kitchen | mk_fire_explode | 24.5s | 47.9s | 55 |

**Top 10 Most Actions:**

| # | Zone | ID | Actions | Pre-Amp | Post-Amp |
|---|------|----|---------|---------|----------|
| 1 | knight-space | ks_everyone_launch | 136 | 16.2s | 33.7s |
| 2 | dungeon-concert | dc3_chaos_exit | 116 | 3.5s | 9.8s |
| 3 | dungeon-concert | dc3_pick_or_smash | 113 | 3.5s | 9.8s |
| 4 | dungeon-concert | dc3_spell_blade | 110 | 3.5s | 9.8s |
| 5 | skeleton-pizza | sp3_combo_flame_smash | 100 | 3.5s | 9.8s |
| 6 | dungeon-concert | dc3_shadow_strike | 97 | 3.5s | 9.8s |
| 7 | skeleton-pizza | sp3_combo_magic_crumble | 97 | 3.5s | 9.8s |
| 8 | skeleton-birthday | sb_feast_fireworks | 93 | 33.2s | 65.2s |
| 9 | dungeon-concert | dc2_team_quiet_fight_skeleton_army_normal | 93 | 3s | 8.7s |
| 10 | skeleton-pizza | sp3_combo_ice_rocket | 93 | 3.5s | 9.8s |

**Bottom 10 Shortest Vignettes (pre-amplification):**

| # | Zone | ID | Pre-Amp | Post-Amp | Actions | Score |
|---|------|----|---------|----------|---------|-------|
| 1 | knight-space | ks2_catastrophic_any | 1.5s | 5.7s | 21 | partial |
| 2 | knight-space | knight_space_default_2 | 1.5s | 5.7s | 18 | partial |
| 3 | knight-space | knight_space_default_3 | 1.5s | 5.7s | 22 | partial |
| 4 | dungeon-concert | dungeon_concert_default | 1.5s | 5.7s | 15 | partial |
| 5 | dungeon-concert | dc2_default | 1.5s | 5.7s | 14 | partial |
| 6 | adventurers-picnic | adventurers_picnic_default | 1.5s | 5.7s | 18 | partial |
| 7 | knight-space | ks2_routine_careful | 2s | 6.4s | 28 | partial |
| 8 | knight-space | ks2_routine_teamwork | 2s | 6.4s | 33 | partial |
| 9 | knight-space | ks2_urgent_fast | 2s | 6.4s | 32 | partial |
| 10 | knight-space | ks2_fast_any | 2s | 6.4s | 25 | partial |

### Timing Distribution

**Pre-amplification time distribution:**

| Range | Count | Bar |
|-------|-------|-----|
| 0-5s | 191 | ################################################################ |
| 5-10s | 57 | ################### |
| 10-15s | 79 | ########################### |
| 15-20s | 69 | ####################### |
| 20-25s | 34 | ############ |
| 25-30s | 4 | ## |
| 30+s | 3 | # |

**Post-amplification time distribution:**

| Range | Count | Bar |
|-------|-------|-----|
| 5-10s | 180 | ############################################################ |
| 10-15s | 25 | ######### |
| 15-20s | 37 | ############# |
| 20-25s | 30 | ########## |
| 25-30s | 55 | ################### |
| 30-40s | 71 | ######################## |
| 40-50s | 34 | ############ |
| 50+s | 5 | ## |


