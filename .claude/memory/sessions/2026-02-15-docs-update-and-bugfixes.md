# Docs Update & Critical Bug Fixes

**Created:** 2026-02-15
**Last Updated:** 2026-02-15
**Source:** session
**Confidence:** high
**Tags:** bug-fixes, documentation, badges, emotes, stale-closure, mad-libs, roadmap

## Summary

Fixed three critical bugs (emote bubble overflow, barbarian stale closure, badge system bypassed in Mad Libs), updated roadmap to Phase 5 "Game Engine Evolution", and refreshed 6 documentation files to reflect current state.

## Details

### Bug Fixes

**1. Emote bubble text overflow**
- **Problem:** Text rendering outside speech bubble bounds
- **Root cause:** maxWidth 220px too narrow for longer dialogue, short fade/timeout didn't match bubble size
- **Fix:** Increased maxWidth 220px→340px, added minWidth 120px, extended CSS fade 3s→6s, auto-remove timeout 3500ms→6500ms
- **File:** `frontend/src/game/ScenePlayer3D.tsx`

**2. Barbarian stale closure bug** (HIGH VALUE PATTERN)
- **Problem:** Characters spawned via movement templates (like CHARGE_IN_RIGHT) wouldn't appear
- **Root cause:** `handleMove` used closure-captured `actors` state (stale/async) while `spawnedIds.current` ref was already updated (synchronous). Actor in spawnedIds but not in closure state → skipped auto-spawn path → move silently aborted
- **Fix:** Added fallback that builds synthetic actor from `actorPositionsRef.current` (also a ref, synchronous) when actor is in spawnedIds but not in closure state
- **Note:** `handleAnimate` uses `setActors(prev => prev.map(...))` functional updater which reads latest state — doesn't have this bug
- **File:** `frontend/src/game/ScenePlayer3D.tsx`
- **Related memory:** `bugs/react-stale-closure-in-scene-player.md`

**3. Badge system not working in Mad Libs**
- **Problem:** `checkBadges()` only called from free-text `submitPrompt` flow (which gets `prompt_analysis` from Claude API). Mad Libs vignettes bypassed badges entirely.
- **Fix:** (1) Synthesized `prompt_analysis` in `buildVignetteScript` from vignette content (character count, tag count, prompt score). (2) Called `checkBadges()` in MadLibsInput's `handleGo`.
- **Files:** `frontend/src/services/vignette-resolver.ts`, `frontend/src/components/MadLibsInput.tsx`

### Roadmap Update

Updated `docs/ROADMAP.md` Phase 5 from "Final Polish" to "Game Engine Evolution":
- **5A: Physics & Navigation** — object avoidance, jump mechanic, terrain interaction
- **5B: Dynamic Scene Engine** — procedural choreography, multi-phase scenes, persistent state, difficulty scaling
- **5C: Polish & Platform** — performance, mobile, TTS, accessibility
- **Design note:** Game is intentionally easy — every kid should feel like a wizard on first try. Focus post-hackathon is on engine dynamism, not difficulty.

### Documentation Update

Updated 6 docs to reflect current state:
1. `docs/how-it-works.md` — Village 2 zones→8 zones circle, added vignettes/templates/badges/emotions to stats, updated build size
2. `docs/architecture-overview.md` — ASCII diagram and zone table updated to 8 zones with positions, fallback count 13→8
3. `CLAUDE.md` — Roadmap reference updated to "Phases 1-4 complete, Game Engine Evolution next"
4. `docs/judges-guide.md` — Roadmap replaced with Phase 5 engine evolution, stats updated with badges/SFX, intrinsic motivation bullet updated
5. `docs/project-description.md` — Added badges and SFX engine to technical scope
6. `docs/submission-guide.md` — Build stats updated to 676 modules, ~497 kB gzipped

### Build Status
- 0 TS errors, production build passes
- ~2,158 kB JS (~497 kB gzipped), 676 modules

## Bugs to Remember

**React Stale Closure Pattern** (documented in `bugs/react-stale-closure-in-scene-player.md`):
- `handleSpawn` updates `spawnedIds.current` (ref = synchronous) + `setActors` (state = async/batched)
- `handleMove` shortly after via setTimeout → `actors.find()` uses closure-captured state that doesn't include new actor
- `spawnedIds.current.has(target)` returns true → skips auto-spawn → but actor is null → move silently aborted
- Fix: fallback to `actorPositionsRef.current` (also a ref, synchronous) to build synthetic actor

**Badge System Integration Pattern**:
- Badges require `prompt_analysis` (PromptAnalysis type from scene-script.ts)
- Free-text flow gets this from Claude API response
- Mad Libs flow must synthesize it from vignette content (character count, tag count, prompt score)
- Badge checking: `checkBadges(prompt_analysis, existingBadges)` → returns new badge IDs → save to store + localStorage

## Related
- `frontend/src/game/ScenePlayer3D.tsx`
- `frontend/src/services/vignette-resolver.ts`
- `frontend/src/components/MadLibsInput.tsx`
- `docs/ROADMAP.md`
- `docs/how-it-works.md`
- `docs/architecture-overview.md`
- `CLAUDE.md`
- `docs/judges-guide.md`
- `docs/project-description.md`
- `docs/submission-guide.md`
