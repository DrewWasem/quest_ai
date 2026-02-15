# Level 4/5 Architecture — Hybrid Free Text + Full Prompt Graduation

**Created:** 2026-02-14
**Last Updated:** 2026-02-14
**Source:** session
**Confidence:** high
**Tags:** architecture, levels, progression, free-text, api, haiku, sonnet, level-4, level-5

## Summary

Added two new progression levels after Stage 3 (Mad Libs dropdowns): Level 4 (Hybrid — character dropdown + free text) and Level 5 (Full Prompt — live Claude API). Both reuse existing ScenePlayer3D with zero 3D changes.

## Details

### Progression Flow
Stage 1→2→3 (Mad Libs dropdowns) → Complete Stage 3 → Stage 4 (character dropdown + free text) → 3 non-default vignette matches → Stage 5 (full prompt, live API)

### Level 4 Architecture
- Character dropdown + free text field with ghost example chips
- Haiku (`claude-haiku-4-5-20251001`, 4s timeout) parses text → `{action, modifier, vibe}` tags
- Tags scored against existing vignette triggers via `resolveLevel4Vignette()`
- Reuses existing vignettes — no new content needed
- Fallback: first word of text as action tag if Haiku times out
- 3 non-default matches required to unlock Level 5

### Level 5 Architecture
- Full textarea + live Claude API call
- Uses Sonnet (`claude-sonnet-4-5-20250929`, 12s timeout) — not Opus (cost)
- Dynamic system prompt built from zone's TASK_ASSETS (characters, props, animations, effects)
- Generates SceneScript JSON directly → plays in ScenePlayer3D
- Fallback: zone-specific FALLBACK_SCRIPTS if API fails
- No progression gating — once unlocked, freely available

### Key Files
- `frontend/src/services/text-parser.ts` — Haiku tag parser
- `frontend/src/components/Level4Input.tsx` — Hybrid input component
- `frontend/src/components/Level5Input.tsx` — Full prompt component
- `frontend/src/prompts/level5-system.ts` — Dynamic prompt builder
- `frontend/src/data/quest-stages.ts` — LEVEL_4_STAGES and LEVEL_5_STAGES records

### Routing
- All routing is in `App.tsx` (no QuestPanel.tsx exists)
- stageNumber >= 5 → Level5Input
- stageNumber === 4 → Level4Input
- stageNumber 1-3 → MadLibsInput
- Header dots show 5 levels with color coding (purple/orange/yellow)

### State Management
- `gameStore.ts` LevelData extended with `level4Successes` and `level5Unlocked`
- `recordLevel4Success(zoneId)` auto-unlocks L5 after 3 successes
- `advanceStage` checks `stageCompleted` and `level5Unlocked` to determine max allowed stage
- All persisted to localStorage

### callClaude Extension
- `callClaude()` now accepts optional `{model, maxTokens, timeoutMs}` parameter
- Default model still `claude-opus-4-6` for backward compatibility

## Related
- `frontend/src/types/madlibs.ts` — Level4Stage, Level5Stage, Level4ParsedTags types
- `frontend/src/services/vignette-resolver.ts` — resolveLevel4Vignette()
- `frontend/src/services/claude.ts` — Extended callClaude()
- `.claude/memory/plans/level-4-5-implementation.md` — Original plan
