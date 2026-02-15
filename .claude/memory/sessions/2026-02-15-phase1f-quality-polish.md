# Phase 1F - Quality Polish Launch

**Created:** 2026-02-15
**Last Updated:** 2026-02-15
**Source:** session
**Confidence:** high
**Tags:** vignettes, quality-polish, sfx, dialogue, props, parallel-agents, phase-1f

## Summary
Launched Phase 1F cross-zone quality polish after completing movement template migration. Executed comprehensive quality gap audit across all 7 zones, identifying SFX, dialogue, and prop variety gaps. Dispatched 5 parallel uplift agents targeting barbarian-school, skeleton-birthday, knight-space, mage-kitchen, and dungeon-concert + adventurers-picnic with specific improvements.

## Details

### 1. ROADMAP Updates
- Marked Phase 1A-1E (movement template migration) as COMPLETE
- Updated quality snapshot showing all 7 zones at 100% movement template usage
- Consolidated remaining work under Phase 1F (Cross-Zone Quality Polish)
- Identified 5 discrete uplift targets with clear task IDs

### 2. Quality Gap Audit Results

#### SFX Audit (8 vignettes at zero SFX, 80 with only 1 SFX)
- **6 barbarian-school vignettes:** 0 SFX (target for immediate uplift)
- **2 knight-space vignettes:** 0 SFX (included in knight-space task)
- **80 additional vignettes:** 1 SFX only (below 2.25 overall avg)
- Overall average: 2.25 SFX/vignette across all 421 vignettes

#### Dialogue Audit (CHARACTER_SPEAK gaps)
- **barbarian-school:** ZERO CHARACTER_SPEAK, ZERO camera_shake (critical gap)
- **dungeon-concert:** Only 4 CHARACTER_SPEAK (low interaction)
- **All 421 vignettes:** Have at least NARRATOR (baseline met)
- Gap indicates opportunity for richer character interaction

#### Prop Variety Audit (below 15% utilization)
- **barbarian-school:** 12.7% (8/63 props used)
- **mage-kitchen:** 13.9% (14/101 props used)
- **dungeon-concert:** 14.5% (12/83 props used)
- Asset bugs identified: snowman, tree, tree_magic missing from zone palettes

### 3. Available SFX Vocabulary
From SoundManager3D.ts:
spawn, move, react, success, partial, fail, click, remove, intro, footstep, impact, magic, cooking, door, coin, explosion, laser, engine, book, bell, glass, chop, whoosh, thud

### 4. Parallel Uplift Agents Dispatched

#### Task #10: barbarian-school uplift (in_progress, a1aabcb)
- Add SFX to 6 zero-SFX vignettes (priority: high)
- Add CHARACTER_SPEAK to all vignettes (replace NARRATOR-only)
- Add camera_shake for impact moments
- Increase prop variety from 12.7% to 25%+

#### Task #11: skeleton-birthday SFX (in_progress, a2a0731)
- 31 vignettes with 1 SFX need 2+ more each
- Thematic audio: bone clinks, magical bells, ghostly whooshes
- Maintain current dialogue + movement template quality

#### Task #12: knight-space SFX (in_progress, a7b3ebf)
- Fix 2 zero-SFX vignettes
- Upgrade 17 one-SFX vignettes to 3+ each
- Thematic: laser, engine, impact, metal whoosh sounds

#### Task #13: mage-kitchen SFX + props (in_progress, a4d95e4)
- Upgrade 15 one-SFX vignettes
- Fix asset bugs: add snowman, tree, tree_magic to zone palette
- Increase prop variety from 13.9% to 25%+

#### Task #14: dungeon-concert + adventurers-picnic (in_progress, a2ca4bf)
- Add CHARACTER_SPEAK to dungeon-concert (only 4 currently)
- Fix asset bug: tree_magic missing from both zones
- Increase prop variety in both zones (14.5% → 25%+)

#### Task #15: Final build verification (blocked by 10-14)
- TypeScript linting pass
- Audio crossfade verification
- Prop variation spot-check
- Deploy to staging for final QA

### 5. Quality Metrics Targets
- **SFX:** All vignettes ≥2 SFX (up from 2.25 avg with 80 at 1)
- **Dialogue:** All zones ≥50% CHARACTER_SPEAK (barbarian-school currently 0%)
- **Props:** All zones ≥20% variety (up from 12.7-14.5%)
- **Camera shake:** Added to impact moments (barbarian-school priority)

## Related
- `.claude/memory/sessions/2026-02-15-vignette-migration-completion.md` — previous session (templates complete)
- `.claude/memory/sessions/2026-02-15-vignette-wow-factor-audit.md` — detailed audit methodology
- `ROADMAP.md` — Phase 1F planning and daily gates
- `frontend/src/services/SoundManager3D.ts` — SFX vocabulary reference
- `frontend/src/data/vignettes/*.ts` — target files for parallel agents
