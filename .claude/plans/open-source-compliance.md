# Plan: Open Source Compliance — Replace Non-CC0 Assets

## Context
Hackathon rule: "Everything shown in the demo must be fully open source."
Two asset packs have unclear/commercial licenses: JoyQuest emojis and Cartoon City.
All other assets (KayKit, Kenney, Tiny Treats, Quaternius, FoodMegaPack, Poly Pizza) are CC0/CC-BY.

## Key Finding: ZERO IMPACT
- JoyQuest emojis: defined in emoji-map.ts but **no demo cache entries use them** (all use Unicode fallback)
- JoyQuest UI icons: **zero code references** — completely orphaned
- Cartoon City: 10 props registered in PROP_PATHS but **zero demo cache entries reference them**
- Kenney Emotes Pack (CC0) already in raw-packs with 240 pixel-art emotes

## Phase 1: Remove Non-Open-Source Assets (~2 min)

### Task 1.1: Delete JoyQuest emoji images
- [ ] Delete `frontend/public/assets/2d/emojis/` (254 PNGs, ~1 MB)
- [ ] Delete `frontend/public/assets/ui/` (9 PNGs, 144 KB — zero code refs)
- [ ] Verify: Unicode emoji fallback still renders in emote/react code

### Task 1.2: Delete Cartoon City models
- [ ] Delete `frontend/public/assets/3d/cartoon-city/` (45 GLBs, 138 MB)
- [ ] Remove 10 PROP_PATHS entries from ScenePlayer3D.tsx (lines 842-851)
- [ ] Remove cartoon-city entries from asset-dimensions.json
- [ ] Verify: `npm run build` passes with 0 errors

## Phase 2: Deploy Kenney Emotes as CC0 Replacement (~5 min)

### Task 2.1: Extract Kenney emotes from raw-packs
- [ ] Copy `raw-packs/kenney_emotes-pack/PNG/Pixel/Style 1/` → `assets/2d/emojis/kenney/`
- [ ] 30 emote PNGs: faceHappy, faceAngry, faceSad, laugh, heart, stars, sleep, music, etc.

### Task 2.2: Update emoji-map.ts to use Kenney emotes
- [ ] Map semantic names (happy, angry, sad, etc.) → Kenney emote filenames
- [ ] Update `getEmojiBubblePath()` and `getEmojiOutlinePath()` to use new paths
- [ ] Keep Unicode fallback for unmapped emojis

### Task 2.3: Replace Cartoon City prop keys with Kenney equivalents
- [ ] Map: car→vehicle_*, van→vehicle_*, fountain→fountain_*, palm→tree_palm_*, etc.
- [ ] Point to existing Kenney models already in `assets/3d/kenney/`
- [ ] Keep same prop key names so any future cache entries still work

## Phase 3: Verify (~2 min)

- [ ] `npm run build` — 0 TS errors
- [ ] Dev server: emotes render (Kenney pixel art or Unicode fallback)
- [ ] Dev server: enter zone, trigger cached scene — plays correctly
- [ ] No references to JoyQuest or cartoon-city remain in codebase
- [ ] All remaining assets are CC0 or CC-BY with attribution

## Files Modified
- `frontend/src/game/ScenePlayer3D.tsx` — PROP_PATHS (remove cartoon-city, add Kenney replacements)
- `frontend/src/data/emoji-map.ts` — Update paths to Kenney emotes
- `frontend/src/data/asset-dimensions.json` — Remove cartoon-city entries
- `frontend/public/assets/2d/emojis/` — Replace JoyQuest with Kenney
- `frontend/public/assets/3d/cartoon-city/` — DELETE
- `frontend/public/assets/ui/` — DELETE
