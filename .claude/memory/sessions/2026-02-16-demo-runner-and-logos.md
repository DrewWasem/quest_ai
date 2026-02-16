# Demo Runner & Logo Processing

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** session, demo, logo, image-processing, automation, video-recording

## Summary
Session focused on four main tasks: (1) Demo showcase runner (21 vignettes), (2) Zone demo runner (250 stage 1 vignettes), (3) Logo processing with transparent backgrounds, (4) Open source compliance planning.

## Details

### Demo Runner System — COMPLETED
**Showcase Runner (`demo-runner.ts`):**
- 21-vignette playlist (3 per zone), grouped by zone in clockwise village tour
- URL trigger: `?demo=showcase` or console `window.__runDemo()`
- Shell launcher: `run-demo.sh` for Chrome full-screen
- Timing: 5s pause between vignettes, ~10-12 min total runtime

**Zone Demo Runner (`zone-demo-runner.ts`):**
- Plays ALL stage 1 vignettes for a single zone (250 total across 7 zones)
- URL trigger: `?demo={zone-name}` or console `window.__runZone('zone-name')`
- Per-zone counts: skeleton-birthday (40), knight-space (31), mage-kitchen (37), barbarian-school (37), dungeon-concert (37), skeleton-pizza (31), adventurers-picnic (37)
- Playback: enterZone → buildVignetteScript → setState → ScenePlayer3D executes
- Timing: 3s zone entry delay, 5s pause between vignettes, 45s max per vignette

**Integration:**
- Wired via `frontend/src/main.tsx` imports of `checkAutoDemo()` and `checkZoneDemo()`
- Fixed: Unused import TS error in main.tsx

### Logo Processing
- **Processed 3 logo files:** Removed white backgrounds, rearranged icon-left-of-text layout
- **Conservative approach:** Pillow with `min(R,G,B) > 248` preserves yellow outlines
- **Rolled back:** Aggressive scipy erosion (too much content loss)
- **Key files:**
  - `QuestAI Logo.png` (stacked, transparent, 907×624)
  - `questai-logo.png` (horizontal, transparent, 1552×317)
  - `frontend/public/assets/questai-logo.png` (app logo)
  - `Gemini_Generated_Image_h9ypv8h9ypv8h9yp.png` (alternate horizontal)

### Build Status
- **TypeScript:** 0 errors
- **Production build:** Passes

### Open Source Compliance Planning
- **Plan created:** `.claude/plans/open-source-compliance.md`
- **Key finding:** JoyQuest emojis (254 PNGs) and Cartoon City (45 GLBs, 138 MB) have unclear/commercial licenses
- **Impact:** ZERO — neither pack is referenced in any demo cache entries
- **Solution:** Delete both packs, replace with Kenney Emotes Pack (CC0, already in raw-packs/)
- **Status:** Plan documented, NOT YET IMPLEMENTED

### Open Items
1. Record demo video using demo runner (showcase or zone runner)
2. Make repository public
3. **EXECUTE** open source compliance plan (delete JoyQuest + Cartoon City)
4. Capture screenshots for README
5. Submit to hackathon before 3PM ET deadline

## Related
- `.claude/memory/context/demo-runner-system.md`
- `.claude/memory/context/logo-files.md`
- `.claude/memory/patterns/image-white-removal.md`
- `.claude/plans/open-source-compliance.md`
- `frontend/src/utils/demo-runner.ts`
- `frontend/src/utils/zone-demo-runner.ts`
- `frontend/src/main.tsx`
- `run-demo.sh`
