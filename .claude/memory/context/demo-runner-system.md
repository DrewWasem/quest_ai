# Demo Runner System

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** demo, vignettes, showcase, playback, automation, video-recording

## Summary
Two-tier automated demo system: (1) Showcase runner plays 21 best vignettes across all 7 zones, (2) Zone demo runner plays all stage 1 vignettes for a single zone (250 total across all zones).

## Details

### Showcase Runner (demo-runner.ts)
- **File:** `frontend/src/utils/demo-runner.ts`
- **Integration:** Wired via `frontend/src/main.tsx` import of `checkAutoDemo()`
- **Shell Launcher:** `run-demo.sh` opens Chrome full-screen at `http://localhost:5175?demo=showcase`
- **Trigger:** `?demo=showcase` or console `window.__runDemo()` / `window.__stopDemo()`
- **Playlist:** 21 vignettes (3 per zone), grouped by zone in clockwise village tour order
- **Timing:** 5s pause between vignettes, estimated 10-12 min total runtime

**Showcase Playlist (21 vignettes):**
```
skeleton-birthday (Z=-70): sb_feast_fireworks, sb2_enormous_candy_chaotic, sb3_magic_fireworks
knight-space (Z=-38,X=38): ks_ranger_defend, ks2_catastrophic_teamwork, ks3_combo_solar_laser
mage-kitchen (X=-48,Z=5): mk_fire_explode, mk2_mega_too_many, mk3_fire_ice
barbarian-school (X=48,Z=5): bs_barbarian_hide_seek, bs2_snowy_tag, bs_race_climbing
dungeon-concert (X=-35,Z=35): dc_knight_sneak, dc2_loud_fight_skeleton_army_normal, dc3_chaos_exit
skeleton-pizza (Z=38,X=38): sp_quiet_late_night, sp2_pile, sp3_emergency_huge
adventurers-picnic (Z=48): ap_basket_feast, ap2_peaceful_feast, ap3_moonlight_concert
```

### Zone Demo Runner (zone-demo-runner.ts)
- **File:** `frontend/src/utils/zone-demo-runner.ts`
- **Integration:** Wired via `frontend/src/main.tsx` import of `checkZoneDemo()`
- **Trigger:** `?demo={zone-name}` or console `window.__runZone('zone-name')` / `window.__stopZone()`
- **Behavior:** Plays ALL stage 1 vignettes for a single zone
- **Timing:** 3s zone entry delay, 5s pause between vignettes, 45s max per vignette

**Zone Coverage (250 stage 1 vignettes total):**
- skeleton-birthday: 40 vignettes
- knight-space: 31 vignettes
- mage-kitchen: 37 vignettes
- barbarian-school: 37 vignettes
- dungeon-concert: 37 vignettes
- skeleton-pizza: 31 vignettes
- adventurers-picnic: 37 vignettes

### Playback Mechanism
1. `enterZone(zone)` — triggers zone transition
2. `buildVignetteScript(vignette)` — converts vignette → scene script
3. `setState({ lastScript, vignetteSteps })` — queues for ScenePlayer3D
4. ScenePlayer3D executes actions via zone-relative positioning

## Related
- `frontend/src/utils/demo-runner.ts` — Showcase playlist (21 vignettes)
- `frontend/src/utils/zone-demo-runner.ts` — Per-zone runner (250 total vignettes)
- `frontend/src/main.tsx` — Integration via checkAutoDemo() and checkZoneDemo()
- `run-demo.sh` — Shell launcher for Chrome full-screen
- `frontend/src/data/vignettes/*.ts` — Vignette definitions
- `frontend/src/stores/gameStore.ts` — enterZone(), exitZone(), currentZone state
