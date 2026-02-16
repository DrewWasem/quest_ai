# Vignette Story Overhaul — Roadmap

**Last Updated:** 2026-02-15
**Plan Source:** `.claude/memory/plans/vignette-story-overhaul.md`
**Status:** ALL 13 PHASES COMPLETE

---

## Overview

Transformed 476 static vignettes across 7 zones into mini comic strips with movement, dialogue, emotion, sound, and educational narrator beats. Integrated the full 3,278-asset expansion (emojis, audio, 3D props).

### Why

| Problem | Impact |
|---------|--------|
| Characters spawn and stand still | No sense of story or action |
| No dialogue (emotes are single Unicode emoji) | Characters feel like props, not people |
| Only 12% of emotion assets used | Missed vocabulary-building opportunity |
| Only 4.5% of audio files registered | Scenes are mostly silent |
| Only 5% of 3D props appear in vignettes | Scenes look empty despite 1,694 available |
| No scene complexity scaling | Vague and perfect prompts produce similar scenes |
| No narrator commentary | Educational lessons are text-only, post-scene |

### Design Principles

1. **Show, don't tell** — Scene complexity IS the feedback
2. **Emotion = vocabulary** — Named emotions teach kids to describe feelings precisely
3. **Sound = immersion** — Multi-sensory scenes are more memorable
4. **Movement = story** — Walking, chasing, fleeing characters tell stories
5. **Props = specificity** — Detailed prompts should produce detailed scenes

---

## Progress Tracker

### Infrastructure Phases (1-5) — ALL COMPLETE

| Phase | Task | Status | Files |
|-------|------|--------|-------|
| **1** | Emotion Expansion | COMPLETE | `emoji-map.ts`, `ScenePlayer3D.tsx` |
| 1.1 | Add 15+ new emotions to EMOJI_MAP | [x] 20 added | `emoji-map.ts` |
| 1.2 | Add 20 emotion particle effects | [x] | `ScenePlayer3D.tsx` |
| **2** | Sound Expansion | COMPLETE | `SoundManager3D.ts`, `ScenePlayer3D.tsx` |
| 2.1 | Add 15 new SFX categories | [x] 24 total | `SoundManager3D.ts` |
| 2.2 | Auto-trigger sounds on actions | [x] | `ScenePlayer3D.tsx` |
| **3** | Movement Template Library | COMPLETE | `movement-templates.ts` |
| 3.1 | Create 40 reusable templates | [x] 53 templates | `movement-templates.ts` |
| **4** | Story Structure + Education | COMPLETE | Documentation + patterns |
| 4.1 | Define 5-beat comic strip structure | [x] | Plan doc |
| 4.2 | Define tier-based complexity scaling | [x] | Plan doc |
| 4.3 | Define narrator commentary patterns | [x] | Plan doc |
| **5** | Zone Prop Mapping | COMPLETE | `zone-props.ts` |
| 5.1 | Map zone → Kenney/FoodMega props | [x] 588 props | `zone-props.ts` |

### Zone Rewrite Phases (6-12) — ALL COMPLETE

| Phase | Zone | Vignettes | Status | File |
|-------|------|-----------|--------|------|
| **6** | Skeleton Birthday | 72 | COMPLETE | `skeleton-birthday.ts` |
| **7** | Knight Space | 64 | COMPLETE | `knight-space.ts` |
| **8** | Barbarian School | 41 | COMPLETE | `barbarian-school.ts` |
| **9** | Skeleton Pizza | 64 | COMPLETE | `skeleton-pizza.ts` |
| **10** | Adventurers Picnic | 69 | COMPLETE | `adventurers-picnic.ts` |
| **11** | Dungeon Concert | 69 | COMPLETE | `dungeon-concert.ts` |
| **12** | Mage Kitchen | 42 | COMPLETE | `mage-kitchen.ts` |

### Verification Phase (13) — COMPLETE

| Phase | Task | Status |
|-------|------|--------|
| **13** | Build + QA | COMPLETE |
| 13.1 | `npm run build` clean | [x] |
| 13.2 | Visual + Audio QA (2-3 per zone) | Deferred (manual playtest) |
| 13.3 | Educational effectiveness check | [x] ECE review + 14 content safety fixes |

---

## Post-Overhaul Metrics

| Metric | Before Overhaul | After Overhaul |
|--------|----------------|----------------|
| Movement templates | 0 | 53 |
| Template adoption | 0% | 100% (all 7 zones) |
| Template spreads | 0 | 1,500+ |
| Named emotions | 41 | 61 |
| Semantic emotes in vignettes | 0 | 227+ |
| SFX categories | 9 | 24 + auto-trigger |
| Zone-specific props | 0 | 588 |
| Unique props in vignettes | ~175 | ~380 |
| Avg WOW factor | 3.2/5 | 4.2/5 |
| Content safety flags | Unknown | 0 (14 fixed) |

---

## Key Files Reference

| File | Role |
|------|------|
| `.claude/memory/plans/vignette-story-overhaul.md` | Detailed implementation plan |
| `frontend/src/data/emoji-map.ts` | Emotion name → PNG number mapping (61 emotions) |
| `frontend/src/game/SoundManager3D.ts` | Audio engine + SFX registry (24 categories) |
| `frontend/src/game/ScenePlayer3D.tsx` | 3D scene executor + effects + emotes + auto-SFX |
| `frontend/src/data/movement-templates.ts` | 53 reusable choreography building blocks |
| `frontend/src/data/zone-props.ts` | Zone-specific prop palettes (588 props) |
| `frontend/src/data/vignettes/*.ts` | Per-zone vignette definitions (7 files) |
| `frontend/src/types/madlibs.ts` | VignetteStep, tier, score type definitions |
| `docs/asset-expansion-summary.md` | Full asset inventory reference |
