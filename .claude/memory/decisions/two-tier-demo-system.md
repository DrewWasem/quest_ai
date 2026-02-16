# Two-Tier Demo System Architecture

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** demo, architecture, showcase, automation, vignettes, zone-runner

## Summary
Implemented two complementary demo runners: (1) Showcase runner for curated highlight reel (21 vignettes), (2) Zone demo runner for exhaustive per-zone playback (250 stage 1 vignettes).

## Decision

### Showcase Runner (demo-runner.ts)
**Purpose:** Video recording and public demos
- 21 hand-picked vignettes (3 per zone)
- Grouped by zone in clockwise village tour order
- 5s pause between vignettes, ~10-12 min total runtime
- Trigger: `?demo=showcase`

### Zone Demo Runner (zone-demo-runner.ts)
**Purpose:** Internal testing, asset verification, level 1 content audit
- Plays ALL stage 1 vignettes for a single zone
- 250 total vignettes across 7 zones (31-40 per zone)
- 3s zone entry delay, 5s pause, 45s max per vignette
- Trigger: `?demo={zone-name}`

## Rationale

**Why two runners instead of one configurable system?**
1. **Different use cases:** Showcase optimized for engagement (best-of), zone runner optimized for coverage (exhaustive)
2. **Different timing:** Showcase needs tighter pacing (5s), zone runner allows breathing room (3s entry + 5s pause)
3. **Different triggers:** URL param makes it easy to bookmark/share different demo modes
4. **Code simplicity:** Two focused implementations (100 lines each) vs. one complex configurable system (200+ lines)

**Why stage 1 only for zone runner?**
- Stage 1 has highest vignette density (250 total)
- Stages 2-5 have fewer vignettes per zone (20-30 per stage)
- Stage 1 showcases breadth of asset utilization and character interactions
- Running all 5 stages per zone would take 30-45 minutes per zone (too long for testing)

## Alternatives Considered

**Single configurable demo runner:**
- Rejected: Too many configuration options (stage filter, vignette count, zone order, timing)
- Would require UI controls or complex URL params
- Two focused runners easier to maintain and use

**CLI script instead of web-based:**
- Rejected: Would require headless browser or Node API
- Web-based allows real-time visual verification
- Chrome DevTools console provides easy access to window.__ commands

## Implementation Details

**Shared Patterns:**
- Both use `gameStore.enterZone()` for zone navigation
- Both use `buildVignetteScript()` to convert vignette → scene script
- Both use `setState({ lastScript, vignetteSteps })` to trigger ScenePlayer3D
- Both exposed via `window.__` commands for console access

**Integration:**
- Both wired via `frontend/src/main.tsx` on page load
- URL param detection: `new URLSearchParams(window.location.search).get('demo')`
- Shell launcher: `run-demo.sh` opens Chrome full-screen with `?demo=showcase`

## Impact

**Positive:**
- Enables rapid video recording for hackathon submission
- Provides exhaustive content verification tool
- Zero manual clicking required (fully automated)
- Easy to extend with more demo modes (stage 2-5 runners, random mode, etc.)

**Negative:**
- +200 lines of code across 2 files
- Requires manual title screen dismissal before autoplay starts
- Zone runner takes 20-30 minutes per zone (250 vignettes total)

## Related
- `.claude/memory/context/demo-runner-system.md`
- `frontend/src/utils/demo-runner.ts`
- `frontend/src/utils/zone-demo-runner.ts`
- `frontend/src/main.tsx`
- `run-demo.sh`
