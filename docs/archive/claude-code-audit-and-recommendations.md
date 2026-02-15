# Claude Code Configuration Audit & Recommendations

**Date:** 2026-02-15
**Project:** Prompt Quest (Kids AI Game)
**Author:** Claude Code (Conductor workflow)

---

## Executive Summary

Your Claude Code setup is **significantly more advanced than 95% of projects**. You have 7 SMEs, 32 skills, 15 commands, 5 active hooks, a persistent memory tree with 51 files, and a full orchestration workflow. This audit found **no critical gaps** but identified **12 actionable improvements** across dead code cleanup, missing features, and configuration optimizations.

---

## Table of Contents

1. [What You Have](#1-inventory)
2. [What's Working Well](#2-strengths)
3. [Issues Found](#3-issues)
4. [Recommendations](#4-recommendations)
5. [Quick Wins (< 5 min each)](#5-quick-wins)
6. [Feature Gaps vs. Claude Code Capabilities](#6-feature-gaps)

---

## 1. Inventory

### Settings

| Layer | File | Key Config |
|-------|------|------------|
| Global | `~/.claude/settings.json` | 42 allow rules, 9 deny rules, model=opus, status line with context %, UserPromptSubmit hook |
| Project | `.claude/settings.local.json` | Puppeteer MCP permissions, SessionStart/PreCompact hooks |
| Project instructions | `CLAUDE.md` | Architecture, commands, scene script format, rules |

### Hooks (5 active, 1 dead, 1 utility)

| Hook | Event | Status | Purpose |
|------|-------|--------|---------|
| `session_start_recall.sh` | SessionStart (startup/resume) | ACTIVE | Load memory on session start |
| `post_compact_recall.sh` | SessionStart (compact/clear) | ACTIVE | Re-inject context after compaction |
| `pre_compact_remember.sh` | PreCompact | ACTIVE | Save state before compaction |
| `context_guardian.sh` | UserPromptSubmit (project) | ACTIVE | Block at ~65% context used (900KB) |
| `context_monitor.sh` | UserPromptSubmit (global) | ACTIVE | Block at ~70% context used |
| `stop_remember_nudge.sh` | Stop | **DEAD** | Removed from settings this session |
| `session_cleanup.sh` | Manual | UTILITY | Archive old transfer files |

### SMEs (7 installed)

| SME | Domain | Knowledge Files |
|-----|--------|----------------|
| `story-writer` | Narrative design, comedy | 4 |
| `prompt-writer` | System prompts, cache, API | 5 |
| `character-director` | Casting, animation, personality | 5 |
| `ece-professor` | Child development, safety | 5 |
| `child-game-design` | Brand voice, UX, accessibility | 5 |
| `3d-game-development` | Three.js, R3F, GLTF | 3 |
| `3d-scale-tester` | Model proportions, measurement | 2 |

### Skills (32 total)

- **9 workflow**: conductor, research, planning, memory, remember, recall, recall-context, sme, asset-creator
- **12 R3F**: fundamentals, animation, geometry, interaction, lighting, loaders, materials, physics, postprocessing, shaders, textures, best-practices
- **11 Three.js**: fundamentals, animation, geometry, interaction, lighting, loaders, materials, postprocessing, shaders, textures, best-practices

### Memory Tree (51 files, 372 KB)

| Domain | Files | Status |
|--------|-------|--------|
| context/ | 9 | Current |
| sessions/ | 12 | Current |
| patterns/ | 6 | Current |
| plans/ | 15 | Stale (many completed) |
| research/ | 5 | Stale (all Feb 10) |
| decisions/ | 3 | Current |
| bugs/ | 1 | Current |
| preferences/ | 0 | Empty |
| files/ | 0 | Empty |

---

## 2. Strengths

**Your setup does several things exceptionally well:**

1. **Orchestration discipline** -- The Conductor skill enforces Research > Plan > Implement > Validate with human gates. This prevents the #1 failure mode (diving into code without understanding it).

2. **SME isolation** -- Domain experts run in subagent context with zero overhead when dormant. The theater-company metaphor (playwright, director, casting) is intuitive and well-scoped.

3. **Context survival** -- PreCompact + PostCompact hooks preserve and restore state across compaction. Most projects lose all context on compaction. Yours doesn't.

4. **Memory persistence** -- 51 files across 9 domains with dedup checking, session summaries, and auto-recall. This is rare. Most projects have zero persistent memory.

5. **Asset vocabulary enforcement** -- The `recall-context` skill prevents hallucinating 3D model names. Critical for a project with 2,186 registered props.

6. **Dual context guards** -- Two layers of protection against context overflow (65% project, 70% global). Aggressive but effective for long sessions.

7. **23 3D reference skills** -- Complete coverage of Three.js and R3F APIs loaded on-demand. No wasted context when not doing 3D work.

---

## 3. Issues Found

### 3a. Dead Code

| Item | Location | Impact |
|------|----------|--------|
| `stop_remember_nudge.sh` | `.claude/hooks/` | Dead file, removed from settings but still on disk |
| `.message-counter` | `.claude/memory/` | Orphaned -- no hook increments it anymore |
| `.last-remember-time` | `.claude/memory/` | Orphaned -- only written by dead stop hook |
| `.session-start` | `.claude/memory/` | Orphaned -- only written by dead stop hook |

**Recommendation:** Delete all 4 files. The counter is read by `session_start_recall.sh` (reset) and `pre_compact_remember.sh` (read) but never incremented, so it's misleading.

### 3b. Redundant Context Guards

You have **two overlapping context guards** that both block on UserPromptSubmit:

| Guard | Level | Threshold | Fires Once? |
|-------|-------|-----------|-------------|
| `context_guardian.sh` | Project | ~65% used (900KB transcript) | Yes |
| `context_monitor.sh` | Global | ~70% used (30% remaining) | Yes |

**Problem:** The project guard fires first (at 65%), saves state, and instructs Claude to act. Then the global guard fires later (at 70%) with a different instruction (save to MEMORY.md + /clear). The two guards give conflicting instructions.

**Recommendation:** Pick one strategy. The project-level `context_guardian.sh` is more sophisticated (saves git state, plan progress, creates recovery files). Consider removing the global `context_monitor.sh` for this project, or raising its threshold so it only fires as a last resort.

### 3c. Memory Tree Staleness

| Domain | Issue |
|--------|-------|
| `plans/` | 15 files, ~112KB. Day 1-7 plans are completed. `three-js-migration.md` (25KB) covers Phase 9 (done). `production-company-smes.md` (23KB) is an architecture doc, not an active plan. |
| `research/` | All 4 files dated Feb 10. Project has advanced through Phases 5-9 since then. |
| `preferences/` | Empty. Your workflow preferences (port 5175, opus model, Conductor workflow) exist only in MEMORY.md. |
| `files/` | Empty. Was designed as a file directory index but never populated. |

### 3d. CLAUDE.md Drift

Your project `CLAUDE.md` has drifted from reality:

| CLAUDE.md Says | Reality |
|----------------|---------|
| "Phaser 3 (game engine)" | Phaser is legacy; R3F is the active engine |
| "1 core task: Monster Birthday Party" | 7 tasks with village world |
| "1 stretch task: Robot Pizza Delivery" | Not applicable anymore |
| "Golden Response Cache (20-30)" | 166 cache entries |
| "shadcn/ui (component library)" | Not actively used |
| Port 5174 | Port 5175 |
| "Explorer Mode only" | Has Mad Libs mode, voice input, quest stages |

This drift means Claude starts every session with stale context, wasting tokens on outdated instructions.

### 3e. Missing Hook Events

Claude Code supports **14 hook events**. You use 4:

| Event | Used? | Potential Value |
|-------|-------|----------------|
| SessionStart | Yes | -- |
| UserPromptSubmit | Yes | -- |
| PreCompact | Yes | -- |
| Stop | No (removed) | Could verify tests pass before stopping |
| PreToolUse | No | Could block destructive commands project-specifically |
| PostToolUse | No | Could auto-format on Write/Edit, or auto-run tests |
| SubagentStart | No | Could inject project context into all subagents |
| SubagentStop | No | Could log subagent outcomes |
| SessionEnd | No | Could auto-save session summary |
| TaskCompleted | No | Could auto-verify task results |

---

## 4. Recommendations

### R1: Update CLAUDE.md to Match Reality (HIGH)

Your CLAUDE.md is the first thing loaded every session. Stale instructions waste context and can cause Claude to make wrong assumptions. Update:

- Tech stack: React + TypeScript + Three.js (R3F) + Zustand + Vite
- Remove Phaser references (or mark as legacy)
- Update task count (7 tasks, village world, 2 quest zones)
- Update cache count (166 entries)
- Update port (5175)
- Add current architecture (VillageWorld, zone system, hex terrain)
- Add key file paths (VillageWorld.tsx, ScenePlayer3D.tsx, etc.)

### R2: Clean Up Dead Files (LOW)

```bash
rm .claude/hooks/stop_remember_nudge.sh
rm .claude/memory/.message-counter
rm .claude/memory/.last-remember-time
rm .claude/memory/.session-start
```

Also update `session_start_recall.sh` and `pre_compact_remember.sh` to remove references to these files.

### R3: Unify Context Guards (MEDIUM)

**Option A (recommended):** Keep `context_guardian.sh` (project), remove `context_monitor.sh` from global settings for this project by adding a project-level UserPromptSubmit hook that replaces it.

**Option B:** Keep both but align their instructions. Make the global guard a "last resort" that only fires if the project guard somehow didn't.

### R4: Archive Completed Plans (LOW)

Move completed plans to `plans/archive/`:
- `day1-foundation.md` through `day7-demo-prep.md` (all 5 day plans)
- `three-js-migration.md` (Phase 9 complete)
- `scene-atmosphere.md` (Phase 6 complete)
- `task-intro-transition.md` (Phase 7 complete)
- `visual-wow-overhaul.md` (completed)

This reduces `plans/` from 15 to ~5 active files and makes it easier to find what's current.

### R5: Set CLAUDE_AUTOCOMPACT_PCT_OVERRIDE (MEDIUM)

Add to your shell profile (`~/.zshrc`):
```bash
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80
```

Default compaction fires at ~95% capacity, which is often too late for quality output. Setting it to 80% gives Claude more working memory when generating the compaction summary and subsequent responses.

### R6: Add Context7 MCP Server (MEDIUM)

Fetch up-to-date Three.js/R3F/Zustand docs on demand instead of relying on Claude's training data:

```bash
claude mcp add context7 -- npx -y @upstash/context7-mcp@latest
```

This is especially valuable for R3F which evolves rapidly. Your 23 3D reference skills are good but static -- Context7 would provide live documentation.

### R7: Add a PostToolUse Hook for Auto-Testing (LOW)

Run a quick typecheck after every Edit/Write to catch errors immediately rather than discovering them at build time:

```json
{
  "PostToolUse": [{
    "matcher": "Edit|Write",
    "hooks": [{
      "type": "command",
      "command": "cd ${CLAUDE_PROJECT_DIR}/frontend && npx tsc --noEmit --pretty 2>&1 | tail -5",
      "timeout": 15
    }]
  }]
}
```

**Trade-off:** Adds ~3-5 seconds per edit. May be too slow for rapid iteration. Consider making it async or limiting to `.tsx` files only.

### R8: Create a `/deploy` Skill (LOW)

For the hackathon deadline, a one-command deploy would be valuable:

```yaml
---
name: deploy
description: Build and deploy to Vercel
disable-model-invocation: true
---
1. Run `cd frontend && npm run build`
2. Verify build succeeds with 0 errors
3. Run `vercel --prod`
4. Report the deployment URL
```

### R9: Populate preferences/ Domain (LOW)

Document your workflow preferences in memory so they survive across sessions:
- Preferred model: Opus 4.6
- Dev server port: 5175
- Commit convention: FEAT/FIX/ENH/etc. prefix
- Workflow: Conductor for non-trivial tasks
- No emojis unless requested
- Brand voice: "funny encouraging older sibling"

### R10: Add SessionEnd Hook (LOW)

Auto-save a lightweight session summary when the session ends:

```json
{
  "SessionEnd": [{
    "hooks": [{
      "type": "command",
      "command": "echo \"Session ended at $(date)\" >> ${CLAUDE_PROJECT_DIR}/.claude/memory/sessions/.session-log"
    }]
  }]
}
```

### R11: Create Custom Subagents (MEDIUM)

Claude Code now supports `.claude/agents/<name>.md` for custom agent definitions. Your SME system is more sophisticated, but lightweight agents could help:

**`explore-assets` agent** (read-only, Haiku):
```yaml
---
name: explore-assets
description: Search the 2,186 registered props and 4,270+ 3D models
tools: Read, Grep, Glob
model: haiku
---
You are an asset search specialist for Prompt Quest. Search PROP_PATHS in ScenePlayer3D.tsx
and the assets/3d/ directory to find models matching the user's query.
```

This keeps large search results out of the main context.

### R12: Use .claude/rules/ for Modular Instructions (LOW)

Instead of one large CLAUDE.md, split into:
```
.claude/rules/
  brand-voice.md      # Kid-facing text rules (from brand-brief-v2)
  scene-scripts.md    # Script format, vocabulary contract
  3d-conventions.md   # Scale, camera, fog, lighting rules
  git-workflow.md     # Commit convention, PR process
```

CLAUDE.md stays as a concise overview. Rules files can use path-scoped frontmatter:
```yaml
---
paths:
  - "frontend/src/prompts/**"
  - "frontend/src/data/demo-cache.json"
---
# Scene Script Rules (only loaded when editing these files)
```

---

## 5. Quick Wins (< 5 min each)

| # | Action | Time | Impact |
|---|--------|------|--------|
| 1 | Delete 4 dead files (stop hook + trackers) | 1 min | Clean |
| 2 | Set `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80` in ~/.zshrc | 1 min | Better compaction |
| 3 | Install Context7 MCP | 1 min | Live docs |
| 4 | Update CLAUDE.md port from 5174 to 5175 | 1 min | Accuracy |
| 5 | Remove Phaser from CLAUDE.md tech stack | 2 min | Less confusion |

---

## 6. Feature Gaps vs. Claude Code Capabilities

### Hook Events You're Not Using

| Event | What It Does | Your Benefit |
|-------|-------------|-------------|
| `PreToolUse` | Intercept before any tool runs | Block accidental `rm -rf` on asset dirs, enforce edit patterns |
| `PostToolUse` | React after tool completes | Auto-typecheck on Edit/Write, log file changes |
| `SubagentStart` | Inject context into spawned agents | Give all subagents your brand rules automatically |
| `SessionEnd` | Fires when session terminates | Auto-save session summary without `/remember` |
| `TaskCompleted` | Fires when a task is marked done | Auto-verify with tests |
| `Stop` | Before Claude stops responding | Verify tests pass, verify no TS errors |

### Features You Haven't Adopted

| Feature | What It Is | Your Benefit |
|---------|-----------|-------------|
| `.claude/agents/*.md` | Custom subagent definitions | Lighter than SMEs for simple specialists |
| `.claude/rules/*.md` | Modular, path-scoped instructions | Reduce CLAUDE.md size, scope rules to relevant files |
| Path-scoped rules | YAML frontmatter restricts rules to matching paths | Brand rules only load when editing kid-facing text |
| `CLAUDE.local.md` | Personal overrides (gitignored) | Your preferences without polluting team config |
| Plan Mode (Shift+Tab x2) | Read-only analysis before execution | Built-in alternative to your EnterPlanMode |
| Agent hooks (`type: "agent"`) | Multi-turn verification hooks | Smarter than shell scripts for complex checks |

---

## Appendix: Hook Lifecycle Diagram

```
SESSION START
  |
  +---> session_start_recall.sh
  |       Load: preferences, decisions, active plans, SME gaps
  |       Reset: context guard flag, message counter
  |
  v
USER PROMPT
  |
  +---> context_guardian.sh (project, 65% threshold)
  |       IF fired: save state, instruct Claude to save WIP
  |
  +---> context_monitor.sh (global, 70% threshold)
  |       IF fired: instruct save to MEMORY.md + /clear
  |
  v
CLAUDE RESPONDS
  |
  +---> (no Stop hook currently)
  |
  v
COMPACTION TRIGGERED
  |
  +---> pre_compact_remember.sh
  |       Save: compaction summary, plan progress, SME state
  |
  +---> post_compact_recall.sh
          Re-inject: preferences, decisions, plans, SME state
          Reset: guard flags
```

---

*Generated by Claude Code Conductor workflow. 5 parallel research agents, ~12 minutes total.*
