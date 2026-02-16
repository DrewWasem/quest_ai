# Quest AI — Roadmap v3

**Builder:** Drew (solo)
**Started:** Feb 10, 2026 (Hackathon)
**Current Phase:** Phases 1-4 Complete — Final Polish
**Goal:** Make every zone a joy to play — vignettes that wow kids, stages that work end-to-end, and a free play zone to tie it all together.

> Previous roadmaps archived at `docs/archive/ROADMAP-hackathon-v1.md`
> Vignette overhaul detail at `docs/vignette-overhaul-roadmap.md` (phases 1-13 now complete)

---

## Current State (Feb 16)

- 8 quest zones on a medieval village circle (7 quest + 1 free-play sandbox)
- 421 vignettes across 7 zone files
- 53 movement templates, 588 zone props — all zones at 100% template adoption
- 1,500+ template spreads across all vignettes (630+ added today)
- 5-stage progression per zone: 3 mad-lib stages + free text (Lv4) + full prompt (Lv5)
- 3-tier response system: Vignette (instant) -> Live API (1-8s) -> Fallback (instant)
- blocking-templates.ts fully decoupled — zero imports from any vignette file
- 24 SFX categories + auto-trigger SFX, 61 named emotions, 139 character animations
- ~380 unique props used in vignettes (up from ~200), 227+ semantic emotion emotes
- Engine auto-SFX: footsteps, magic, cooking, impact, attack sounds fire automatically

### Quality Snapshot

| Zone | Vignettes | Templates | Action Variety | Grade |
|------|-----------|-----------|---------------|-------|
| knight-space | 64 | 100% | move:50, grow:13, crowd:25, flash:18 | A+ |
| dungeon-concert | 69 | 100% | move:34, grow:6, crowd:7, flash:16 | A |
| adventurers-picnic | 69 | 100% | move:62, grow:34, crowd:24, flash:30 | A+ |
| mage-kitchen | 42 | 100% | move:18, grow:23, crowd:29, flash:19, spell:37 | A |
| barbarian-school | 41 | 100% | move:74, grow:10, crowd:28, flash:20, emote:49 | A |
| skeleton-birthday | 72 | 100% | move:45, grow:16, crowd:26, flash:31, dance:19 | A- |
| skeleton-pizza | 64 | 100% | move:30, grow:10, crowd:15, flash:12, dance:7 | B+ |

---

## Phase 1: Vignette Wow Factor — COMPLETE

### 1A-1E. Movement Template Migration — COMPLETE

All 7 zones migrated to movement templates (Feb 14-15). Key changes:
- skeleton-pizza: full rewrite, setupProps/crossStage inlined, 28 MARK refs removed
- mage-kitchen: 34+ vignettes migrated, grow action fixes, MARK refs removed
- skeleton-birthday: 22 composeBlocking vignettes converted to template spreads
- barbarian-school: full rewrite (66 vignettes, 0% -> 100%)
- dungeon-concert: NARRATOR added to 30 vignettes, IMPACT fixes
- adventurers-picnic: 4 DRUID vignettes migrated
- knight-space: minor polish (already at 97%)

blocking-templates.ts is no longer imported by any vignette file.

### 1F. Cross-Zone Quality Polish — COMPLETE

SFX uplift (Feb 15 AM):
- SFX count: 948 -> 1,197 (+26%)
- Zero-SFX vignettes eliminated (was 8)
- CHARACTER_SPEAK: 100 -> 143 (+43%)
- 6 asset bugs fixed (snowman, tree, tree_magic -> valid props)

### 1G. Action Variety Uplift — COMPLETE

12 new templates added, 630+ new template calls across all 7 zones (Feb 15 PM):

| New Template | Total Uses | Purpose |
|-------------|-----------|---------|
| WALK_TO | 70 | Character walks to position |
| RUN_TO | 53 | Character runs to position |
| JUMP_TO | 14 | Character leaps with arc |
| BOUNCE_ENTRANCE | 26 | Bouncy arc entrance |
| EMOTE | 59 | Emoji bubble reaction |
| ANNOUNCE | 77 | Text popup announcement |
| FLASH | 66 | Screen flash effect |
| CROWD_CHEER | 49 | Everyone cheers |
| CROWD_GASP | 38 | Everyone gasps |
| OBJECT_GROW_REVEAL | 91 | Dramatic object reveal |
| SPELL_CAST | 40 | Magic casting + effects |
| DANCE | 47 | Celebration dance |

---

## Phase 2: Asset Utilization — COMPLETE

Expanded use of the massive asset library across all zones.

### 2A. Emotion Expansion — COMPLETE

| Metric | Before | After |
|--------|--------|-------|
| Named emotions in emoji-map.ts | 41 | 61 (+20 new) |
| Unicode emojis in vignettes | 287 | ~136 (contextual only) |
| Semantic emotion names in vignettes | 76 (barbarian-school only) | 227+ (all 7 zones) |

151 Unicode face emojis migrated to semantic names across 6 zone files. Remaining Unicode emojis are all contextual/object emojis (⚔️, 🔧, 🔥, etc.) that have no semantic equivalent.

### 2B. Prop Utilization — COMPLETE

| Zone | Before | After | Utilization |
|------|--------|-------|------------|
| mage-kitchen | 17 | 57 | 56.4% |
| knight-space | 14 | 34 | 75.6% |
| adventurers-picnic | 19 | 50 | 58.8% |
| barbarian-school | 15 | 48 | 76.2% |
| skeleton-pizza | 18 | 59 | 79.0% |
| dungeon-concert | 21 | 75 | 81.5% |
| skeleton-birthday | 33 | 57 | 96.6% |

Total unique props in vignettes: ~200 -> ~380 (+90%).

### 2C. Auto-Trigger Sounds — COMPLETE

Engine-level auto-SFX added to ScenePlayer3D.tsx and SoundManager3D.ts:
- Walking/running animations → footstep SFX (with interval throttle)
- Magic/casting animations → magic SFX
- Cooking animations → cooking SFX
- Impact/hit animations → impact SFX
- Attack animations → sword/combat SFX

---

## Phase 3: Stage Verification — COMPLETE

Every stage at every zone verified to work end-to-end.

### 3A. Stage Progression Audit — COMPLETE

Code analysis verified all checks pass:

| Check | Status | Notes |
|-------|--------|-------|
| Stage 1-3 mad-libs | PASS | 5-tier resolver guarantees vignette match (default fallback) |
| Stage 4 (Free Text) | PASS | Haiku parsing + vignette scoring, all 7 zones configured |
| Stage 5 (Full Prompt) | PASS | Sonnet 4.5 generation, all 7 zones have prompts + fallback scripts |
| Stage completion | PASS | successTags (S1-2), comboRequired (S3), 3 successes (S4→S5) |
| Zone unlock | N/A | All zones accessible from start (no unlock gating) |
| Vignette discovery | PASS | Per-stage tracking via discoveredVignettes |

### 3B. Missing/Broken Stage Fixes — COMPLETE

| Issue | Fix |
|-------|-----|
| Text parser stop-word bug | Filter stop words in fallback (text-parser.ts) |
| No empty scenes possible | 5-tier resolver always returns default vignette |
| All Level 5 fallback scripts present | Verified all 7 zones have entries |
| All Level 5 system prompts present | Verified all 7 zones + dynamic prompt builder |

### 3C. Visual + Audio QA — DEFERRED

Requires manual playtest (not automatable via code analysis).

### 3D. Educational Effectiveness Check — COMPLETE

ECE Professor review completed across all 7 zones. Results:

| Zone | Grade | Critical Fixes | Recommended Fixes |
|------|-------|---------------|-------------------|
| skeleton-birthday | A- | 0 | weapons→projectiles, warfare→chaos |
| knight-space | A- | deadly→unstoppable | reconnaissance→scouting |
| barbarian-school | A | 0 | deadly→lightning-fast |
| skeleton-pizza | A | 0 | surgical precision→perfect aim, overkill→chaos |
| adventurers-picnic | A | deadly→sneaky | weapon→wild |
| dungeon-concert | B+ | assassination→silent victory | TOO WEAK→WRONG SKILL, warfare→mind tricks |
| mage-kitchen | A | nuclear→SUPER MEGA KABOOM | (none) |

All 4 critical and 10+ recommended content safety fixes applied. Zero remaining flagged terms.

### 3E. Automated Stage Tests — DEFERRED

Puppeteer tests deferred (requires browser automation setup).

---

## Phase 4: Free Play Zone — COMPLETE

8th zone added at Northwest `[-38, 0, -38]` — Creative Playground sandbox.

| Component | Implementation |
|-----------|---------------|
| Zone config | worlds.ts, gameStore.ts, asset-manifest.ts — all 26 characters, 21 curated props, all animation packs |
| 3D environment | VillageWorld.tsx — stage platform, presents, candy canes, crystals, gingerbread house, amber/pink/purple lighting |
| Unlock gate | Requires 3 zones at stage ≥ 4; lock indicator (gray glow + 🔒) on QuestZoneCircle |
| Stage routing | enterZone forces stageNumbers['free-play'] = 5, routes to Level5Input |
| System prompt | Sandbox override: always FULL_SUCCESS, celebrates creativity |
| Fallback script | Multi-character party scene (knight + skeleton + mage) |
| Landmark | Yellow shrine at [-44, 0, -44], NW spoke road + approach decor |

---

## Phase 5: Game Engine Evolution (Post-Hackathon)

> **Design note:** The game is intentionally easy right now — every kid should feel like a wizard on their first try. The focus going forward is making the engine more dynamic and expressive so all stages (Mad Libs, free text, full prompt) feel alive and responsive.

### 5A. Physics & Navigation

| Task | Notes |
|------|-------|
| Object avoidance / collision | Characters should walk around props, not through them. Basic navmesh or steering behavior so movement feels physical. |
| Jump mechanic | Let characters jump — enables vertical exploration (stairs, platforms, rooftops). Triggered by movement templates or player-created scenes. |
| Terrain interaction | Characters react to terrain type (splash in water, slip on ice, slow in sand). |

### 5B. Dynamic Scene Engine

| Task | Notes |
|------|-------|
| Procedural choreography | Engine generates movement patterns (circle, parade, chase) instead of only point-to-point moves. |
| Multi-phase scenes | Scenes with branching moments — "what happens next?" choices mid-scene. |
| Persistent scene state | Props and characters stay between prompts so kids can build up complex scenes iteratively. |
| Difficulty scaling | Gradually raise the bar — more slots in Mad Libs, stricter matching, richer feedback — as kids demonstrate mastery. |

### 5C. Polish & Platform

| Task | Notes |
|------|-------|
| Performance audit | Bundle size, load times, memory |
| Mobile layout check | Touch controls, responsive canvas |
| Accessibility pass | Screen reader labels, color contrast |
| README update | Screenshots, new zone count, updated pitch |
| Built-in TTS voice | Replace browser SpeechSynthesis with a neural TTS API (ElevenLabs or OpenAI) for consistent, high-quality narration across all browsers |

---

## Completed Work Log

| Date | Work | Impact |
|------|------|--------|
| Feb 10 | Project scaffold, Claude API, first scene | Foundation |
| Feb 11 | 3D pivot (Phaser → R3F), village world | Architecture |
| Feb 12 | Game juice, atmosphere, TTS, SFX | Polish |
| Feb 13 | Asset mega-integration (9,500+ models) | Content |
| Feb 14 | Mad-libs pivot, Level 4/5, 13-phase vignette overhaul | Core gameplay |
| Feb 15 AM | Wow-factor audit, SFX uplift, dialogue density | Quality |
| Feb 15 PM | 12 new templates, 630+ action variety calls across all zones | Quality |
| Feb 15 EVE | Phase 2: auto-SFX engine, prop diversification (200→380), emoji migration (151 → semantic) | Asset utilization |
| Feb 15 LATE | Phase 3: stage audit, text-parser fix, ECE review, 14 content safety fixes | Stage verification |
| Feb 16 AM | Phase 4: Free Play Zone — 8th zone, unlock gating, sandbox prompt, 3D environment | Free play |

---

## Success Metric

**Every zone scores 4.0+ WOW factor. Every stage works. Kids can free-play after beating 3 zones.**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React + TypeScript + Vite |
| 3D Engine | React Three Fiber + Drei |
| State | Zustand |
| AI | Claude Opus 4.6 |
| Assets | KayKit + Tiny Treats + FoodMegaPack (9,500+ GLTF models) |
| Audio | Web Audio API (synthesized) + Kenney Audio (666 OGGs) + SpeechSynthesis (TTS) |
| Styling | Tailwind CSS + Fredoka/Nunito fonts |
| Deploy | Vercel |
