# How Claude Code Built Quest AI

> A solo developer, 7 days, and 100+ hours of accumulated AI-developer collaboration — here's how Claude Code's extensibility features turned a hackathon sprint into a production-quality 3D game.

## The Challenge

Build an AI-powered 3D game for kids — in one week — that connects Claude Opus 4.6 to a real-time 3D renderer with 9,500+ models, 27 animated characters, and 139 animation clips. The game needs to be educational, age-appropriate, and genuinely fun.

One person. Seven days. No team.

## The Solution: Claude Code as a Development Platform

Instead of using Claude Code as a simple coding assistant, I built an **orchestration layer** on top of it — treating the `.claude/` directory as a programmable development environment with domain experts, workflow automation, persistent memory, and quality gates.

The result: **69 memory files, 7 specialized AI experts, 15 automated commands, 12 backend agents, 6 lifecycle hooks, and 3 rule files** — all working together to ship a game that would normally take a team of 5+ developers weeks to build.

---

## 1. Subject Matter Experts: AI Specialists On Demand

The most unusual part of this setup: **7 domain-expert AI personas** that can be summoned as isolated subagents. Each has its own system prompt, knowledge files, constraints, and heuristics.

```
.claude/smes/
├── story-writer/          # Narrative design for children's games
├── character-director/    # Character casting + animation mapping
├── ece-professor/         # Early childhood education psychologist
├── prompt-writer/         # Claude API prompt engineering
├── child-game-design/     # Kid-facing UX + brand voice
├── 3d-game-development/   # React Three Fiber + Three.js
└── 3d-scale-tester/       # 3D model proportion measurement
```

**Why this matters:** When creating a quest where a skeleton throws a birthday party, I don't just write code — I orchestrate a pipeline:

1. `story-writer` designs the story arc (setup, escalation, climax, resolution)
2. `character-director` casts characters from the 28-model KayKit roster
3. `prompt-writer` engineers the Claude system prompt with vocabulary constraints
4. `ece-professor` reviews everything for developmental appropriateness (Piaget stages, COPPA compliance)
5. `child-game-design` audits all kid-facing text (no "wrong," no "failed," no "learning")

Each SME runs in isolated context — they don't pollute the main conversation, and they can run in parallel.

**Example:**
```bash
/sme ece-professor "Review this narration for ages 7-11:
  'You did such a great job learning to be specific!'"

# Response: "Flagged. 'Great job' is generic praise (Dweck, 2006).
# 'Learning' is meta-cognitive for age 7. Replace with concrete
# game feedback: 'The skeleton loved that cake — try adding candles!'"
```

---

## 2. The Conductor: Orchestrated Development Workflow

Complex tasks don't start with code. They follow a structured **Research → Plan → Implement → Validate** cycle, managed by the Conductor skill.

```
/conductor "Add zone transitions to the village world"

Step 1: RESEARCH
  ├── Agent 1: codebase-researcher → find all camera/zone files
  ├── Agent 2: codebase-analyzer → trace camera state flow
  └── Agent 3: memory-locator → check prior decisions about zones

Step 2: PLAN
  └── plan-architect → design phased approach with exact file paths

Step 3: IMPLEMENT (human approves before each phase)
  └── implementer → execute tasks with verification steps

Step 4: VALIDATE
  └── reviewer → two-pass check (spec compliance + code quality)
```

**Anti-rationalization rules** are baked in:

| Tempting Thought | Rule |
|-----------------|------|
| "This is simple, I'll just..." | If it touches 3+ files, orchestrate. |
| "I know how to do this" | In unfamiliar code, research first. |
| "Let me just try something" | Code without reading = rework. |
| "The user wants it fast" | Building wrong is the slowest path. |

This prevented dozens of false starts during the 7-day sprint.

---

## 3. Persistent Memory: Knowledge That Survives Context Windows

Claude Code's context window fills up. With a 4,650-line scene executor, 1,694 prop registrations, and 8 quest zones, a single conversation can't hold everything.

The memory system solves this with **69 files across 10 domains**:

```
.claude/memory/
├── decisions/     # "Use hex tiles, not square" (5 files)
├── patterns/      # "Movement template library" (10 files)
├── bugs/          # "SkeletonUtils clone fails on..." (1 file)
├── preferences/   # "Always port 5175, never yarn" (1 file)
├── context/       # Brand brief, scale reference (10 files)
├── sessions/      # 30+ daily session summaries
├── research/      # Codebase findings (4 files)
└── plans/         # Active implementation plans (5+ files)
```

**Critical memories are auto-loaded.** The `MEMORY.md` file (200-line cap) is injected into every conversation, containing:
- Brand voice rules (never say "prompt" to kids — say "description")
- KayKit scale reference (characters = 2.61 units, buildings need 3.0x multiplier)
- Architecture overview (village world, zone system, three-tier response)
- Audio system design (OGG playback + synthesized fallbacks)

**Session summaries bridge conversations.** When a new session starts, the hook injects the last session's summary so Claude picks up where it left off — even after days of work.

---

## 4. Lifecycle Hooks: Automation at Every Stage

Six shell scripts run automatically at key moments:

| Hook | Trigger | What It Does |
|------|---------|--------------|
| `session_start_recall` | Session opens | Load memories, active plans, available commands |
| `pre_compact_remember` | Before compaction | Save active plans + SME state to memory |
| `post_compact_recall` | After compaction | Re-inject critical context that was compressed |
| `post_edit_typecheck` | After file edits | Run TypeScript type checking (0-error policy) |
| `session_end_log` | Session closes | Log session timestamp and status |

**The compaction hooks are essential.** When the context window fills up, Claude Code compresses the conversation. Without hooks, it would lose track of the current plan, which SMEs were consulted, and what decisions were already made. The pre/post compact hooks preserve this state automatically.

---

## 5. Custom Commands: One-Line Workflows

15 commands reduce complex multi-step workflows to single invocations:

```bash
# Create a complete new quest (7-stage SME pipeline)
/compose-task "Wizard's Library Organization Quest"

# Pre-demo verification (build, cache, content audit)
/pre-demo

# Generate 166 golden cache entries for instant demos
/build-cache

# Test a system prompt with varied inputs
/test-prompt skeleton-birthday

# Review all kid-facing content for brand compliance
/review-content all
```

The `/compose-task` command is the most complex — it orchestrates 7 SMEs in sequence to go from a one-line concept to a fully implemented quest zone with system prompts, cached responses, fallback scripts, and 3D environment configurations.

---

## 6. Rule Files: Guardrails That Never Sleep

Three rule files enforce constraints automatically — Claude Code checks them before every response:

**Brand Voice** (`brand-voice.md`):
- Never say "prompt" to kids — say "description" or "plan"
- Never say "Great job!" — use concrete, game-specific feedback
- Narrations: max 20 words, present tense, 1 exclamation max
- Failure = comedy, never judgment

**Scene Scripts** (`scene-scripts.md`):
- Max 8 actions per script
- All actor/prop/animation names must exist in vocabulary contract
- Model must be `claude-opus-4-6`
- JSON schema enforced

**3D Conventions** (`3d-conventions.md`):
- Character reference height: 2.61 units
- Hex buildings at 3.0x scale (strategy-game models scaled to adventure-game)
- Camera FOV: 45 degrees
- Village overview: [0, 18, 28], zone view: [0, 9, 14]

---

## 7. Specialized Agents: Parallel Research Power

12 backend agents handle specific tasks without polluting the main conversation:

| Agent | Purpose |
|-------|---------|
| `codebase-researcher` | Find files, components, structure |
| `codebase-analyzer` | Trace data flow and dependencies |
| `memory-locator` | Search 69 memory files for relevant context |
| `memory-writer` | Write new entries with dedup checking |
| `plan-architect` | Design phased implementation plans |
| `implementer` | Execute plan tasks with verification |
| `reviewer` | Two-pass code review (spec + quality) |
| `content-auditor` | Scan for brand voice violations |
| `explore-assets` | Navigate 9,500+ 3D model library |

**These run in parallel.** When researching a new feature, I typically dispatch 3 agents simultaneously — one searching the codebase, one checking memory, one analyzing code paths. Results converge in the parent context without the token cost of doing it all sequentially.

---

## The Impact: What This Setup Made Possible

### Without this setup (traditional hackathon):
- Write code, hope it works
- Forget decisions from yesterday
- Miss brand voice violations until demo
- No quality gates — ship and pray
- Context window fills up, lose track of progress

### With this setup:
- **30+ sessions** of accumulated knowledge persist across conversations
- **Zero brand voice violations** in production (ece-professor + child-game-design review)
- **Zero 3D scale bugs** in final build (3d-scale-tester measurements)
- **166 golden cache entries** generated via automated pipeline
- **8 quest zones** created through systematic SME orchestration
- **0 TypeScript errors** maintained throughout (post-edit hook)

### Stats

| Metric | Value |
|--------|-------|
| SMEs (domain experts) | 7 |
| Custom commands | 15 |
| Custom agents | 12 |
| Lifecycle hooks | 6 |
| Rule files | 3 |
| Memory files | 69 |
| Memory domains | 10 |
| Session summaries | 30+ |
| Development sessions | 30+ over 7 days |

---

## Key Insight

The `.claude/` directory isn't configuration — it's **infrastructure**. SMEs provide domain expertise. Memory provides institutional knowledge. Hooks provide automation. Commands provide workflow. Rules provide guardrails.

Together, they turn Claude Code from a coding assistant into a **development platform** — one capable of helping a solo developer ship a production-quality 3D game in 7 days.
