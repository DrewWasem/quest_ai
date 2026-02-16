# Plan: Quest AI Production Company — SME Agent System

**Status:** COMPLETE — All 4 hackathon SMEs built + validated
**Created:** 2026-02-11
**Deadline:** Feb 16 (hackathon), post-hackathon for full vision

---

## Vision

Model Quest AI's content creation pipeline as a **theater production company**. Each agent is a specialist role in the company. Together they create, review, and iterate on game content — stories, characters, scenes, prompts, and educational scaffolding.

**Theater ≠ Film**: The game is live, interactive, and repeatable. The audience (player) changes what happens on stage. Background actors exist independently of the plot. The set lives and breathes.

---

## The Production Company — Full Agent Roster

### Creative Department

| # | SME | Theater Role | Domain | Build Priority |
|---|-----|-------------|--------|----------------|
| 1 | **story-writer** | Playwright | Story arcs, module design, narrative structure | **HACKATHON** |
| 2 | **prompt-writer** | Director | System prompts, success criteria, vocabulary selection | HACKATHON |
| 3 | **character-director** | Casting + Acting Coach | Characters, personalities, development arcs, progression | **HACKATHON** |

### Design Department

| # | SME | Theater Role | Domain | Build Priority |
|---|-----|-------------|--------|----------------|
| 4 | **set-designer** | Set Design + Props Master | Environments, props, atmosphere configs | Post-hackathon |
| 5 | **visual-designer** | Costume + Lighting | Look & feel, brand alignment, color, mood | Post-hackathon |
| 6 | **background-director** | Choreographer for Extras | Ambient actor behaviors, background scene scripts | Post-hackathon |

### Review Board

| # | SME | Theater Role | Domain | Build Priority |
|---|-----|-------------|--------|----------------|
| 7 | **ece-professor** | Educational Consultant #1 | Early childhood development (Piaget, ZPD, NAEYC) | **HACKATHON** |
| 8 | **digital-literacy-sme** | Educational Consultant #2 | Digital literacy, COPPA, AAP guidelines, screen design | Post-hackathon |

---

## Two Skill Types

### Build Skills (Developer Tools)
These help developers create game content. They run at authoring time, not gameplay time.

| Skill | Purpose | Exists? |
|-------|---------|---------|
| `asset-creator` | SVG/visual asset creation | ✅ Yes |
| `sme` | Invoke any SME agent | ✅ Yes |
| `build-cache` | Generate golden response cache | ✅ Yes |
| `test-prompt` | Test system prompts against inputs | ✅ Yes |
| `recall-context` | Load vocabulary contract before writing | ✅ Yes |
| **`compose-task`** | NEW — Orchestrate all SMEs to create a new task | ❌ Build |
| **`review-content`** | NEW — Run edu SMEs on content for approval | ❌ Build |

### Gameplay Skills (In-World)
These affect what happens during gameplay. Attached to characters, actions, and agents.

| Skill | Purpose | Exists? |
|-------|---------|---------|
| **Character Personalities** | Per-character behavior tendencies in scene scripts | ❌ Design |
| **Background Scripts** | Ambient actor behavior loops (idle, interact, wander) | ❌ Design |
| **Character Evolution** | Cross-task state persistence and growth | ❌ Design |
| **Scene Transitions** | How characters enter/exit between scenes | ✅ Partial (TaskIntro) |

---

## Phase 1: HACKATHON BUILD (Feb 11-13)

Build 4 core SMEs that demonstrate the pipeline.

### 1.1 — Story Writer SME (`story-writer`)

**Theater Role:** The Playwright
**Capabilities:**
- Design a complete story arc for a game module (task)
- Define the 3-element narrative formula (FULL_SUCCESS criteria)
- Create the comedy hierarchy (FUNNY_FAIL must be funnier than success)
- Plan interaction points where players make choices / give descriptions
- Map the story to available asset vocabulary

**Knowledge Base:**
- `constraints.md` — Brand voice rules, narration limits, word bans
- `heuristics.md` — Story structure patterns, comedy formulas, age-appropriate themes
- `ontology.md` — Module structure (act/scene/beat), success tiers, story arc types
- `taste.md` — Good/bad story examples from existing 7 tasks
- `references.md` — Links to brand brief, existing prompts

**Inputs:** Task concept (e.g., "A knight tries to run a space station but keeps pressing wrong buttons")
**Outputs:**
```markdown
## Story Arc: [Task Name]
### Premise
[1-2 sentences]
### Success Formula
- FULL_SUCCESS: [3 elements]
- PARTIAL_SUCCESS: [1-2 elements]
- FUNNY_FAIL: [comedy scenario]
### Key Beats
1. [Setup] — What's the situation?
2. [Complication] — What makes it funny/challenging?
3. [Resolution variations] — Success vs. fail paths
### Characters Needed
- [Lead]: personality, role
- [Supporting]: personality, role
### Props/Set Needed
- [List from vocabulary]
### Educational Angle
- [What kids practice: specificity, cause-effect, planning, etc.]
```

### 1.2 — Character Director SME (`character-director`)

**Theater Role:** Casting Director + Acting Coach
**Capabilities:**
- Define character personalities for each task context
- Plan character development arcs across tasks (cross-task evolution)
- Select appropriate characters from the 28-character roster
- Map personality to animation vocabulary (which anims express this personality?)
- Design "character skills" — recurring behaviors tied to personality
- Define hero character staging (who stands where before prompt)

**Knowledge Base:**
- `constraints.md` — Character count limits, animation compatibility, brand alignment
- `heuristics.md` — Casting patterns (skeleton = comedy, knight = earnest, barbarian = chaos)
- `ontology.md` — Character model (personality traits, skill tree, evolution stages, relationships)
- `roster.md` — Full 28-character roster with animation capabilities
- `evolution.md` — Cross-task development framework

**Character Personality Schema:**
```yaml
character: skeleton_warrior
default_personality:
  traits: [nervous, enthusiastic, clumsy, lovable]
  speech_style: "Overly formal, uses big words incorrectly"
  comedy_type: "physical + fish-out-of-water"
  signature_animation: Skeletons_Taunt

task_contexts:
  skeleton-birthday:
    role: "Birthday host (never had a party before)"
    arc: "nervous → excited → overwhelmed → grateful"
    special_behaviors:
      - "Jumps at loud noises"
      - "Tries to blow out candles (no lungs)"
    evolution_unlock: "Confidence +1 (learns parties are fun)"

  skeleton-pizza:
    role: "Delivery skeleton (first job ever)"
    arc: "eager → confused → creative → proud"
    requires_prior: null  # or "skeleton-birthday" for evolved version

evolution_track:
  stage_1: "Shy and uncertain"
  stage_2: "Gaining confidence through silly successes"
  stage_3: "Enthusiastic but still clumsy"
  stage_4: "Confident leader who embraces being different"
```

**Cross-Task Evolution System Design:**
```
Task Completion → Character State Update → Personality Shift
     │                    │                       │
     ▼                    ▼                       ▼
  success_level     localStorage or          Subtle changes:
  determines         Zustand persist        - Different idle anim
  growth amount                             - New emote options
                                            - Narration references
                                              past events
```

### 1.3 — ECE Professor SME (`ece-professor`)

**Theater Role:** Educational Consultant #1
**Capabilities:**
- Review story arcs for developmental appropriateness (ages 7-11)
- Identify learning objectives within storylines
- Recommend where to insert educational scaffolding
- Evaluate difficulty progression across tasks
- Flag content that's too abstract, too scary, or too condescending
- Apply Piaget's Concrete Operational Stage principles
- Use Vygotsky's ZPD to calibrate challenge level

**Knowledge Base:**
- `constraints.md` — Hard developmental rules (NAEYC, age limits, safety)
- `heuristics.md` — ZPD application patterns, scaffolding techniques, age-band differences (7-8 vs 9-11)
- `ontology.md` — Developmental framework (Piaget stages, ZPD, NAEYC standards, learning domains)
- `guidelines.md` — AAP 5 Cs framework, COPPA compliance checklist
- `rubric.md` — Content review rubric with pass/needs-work/fail criteria

**Review Output Format:**
```markdown
## Educational Review: [Task Name]

### Developmental Alignment
- **Age Band:** 7-8 / 9-11 / Both
- **Piaget Stage Fit:** [Concrete operational alignment]
- **ZPD Calibration:** [Is the challenge in the growth zone?]

### Learning Objectives Identified
1. [Objective] — [How the story teaches it]
2. [Objective] — [How the story teaches it]

### Scaffolding Recommendations
- [Where to add hints/examples]
- [Where to reduce complexity for 7-8]
- [Where to increase depth for 9-11]

### Content Flags
- ⚠️ [Any concerns: too abstract, scary, condescending]

### Verdict: PASS / NEEDS WORK / FAILS
```

**Both Layers Implementation:**
1. **Design-time:** Full review of story arcs and system prompts before they ship
2. **Runtime guardrails:** Lightweight pattern checks on Claude-generated scene scripts:
   - Narration word count ≤ 20
   - No banned words ("wrong", "failed", "error", "skills", "learning")
   - Success level matches action count (FULL_SUCCESS should have 4+ actions)
   - FUNNY_FAIL has comedy indicators (emotes, silly animations, question-marks)
   - No scary content (no combat animations in non-combat tasks)

### 1.4 — Prompt Writer SME (`prompt-writer`)

**Theater Role:** The Director
**Capabilities:**
- Convert a Story Writer's arc into a Claude system prompt
- Select the exact actor/prop vocabulary for the task
- Write success criteria that map to story beats
- Calibrate FUNNY_FAIL comedy (must be funnier than success)
- Write the prompt_feedback templates (concrete, game-specific, encouraging)
- Generate golden cache entries (demo responses)
- Generate fallback scripts (Tier 3 safety net)

**Knowledge Base:**
- `constraints.md` — Prompt format rules, vocabulary contract, max actions, JSON schema
- `heuristics.md` — Prompt engineering patterns for Claude, comedy calibration, feedback writing
- `ontology.md` — Prompt anatomy (sections: context, criteria, vocabulary, constraints, format)
- `templates.md` — System prompt template with fill-in sections
- `examples.md` — Full examples from existing 7 task prompts

**Workflow:**
```
Story Writer Output → Prompt Writer → System Prompt (.ts file)
                                    → Fallback Script (fallback-scripts.ts entry)
                                    → Demo Cache Entries (demo-cache.json entries)
```

---

## Phase 2: POST-HACKATHON

### 2.1 — Set Designer SME (`set-designer`)

**Capabilities:**
- Design environment layouts using available props
- Create TaskAtmosphere configs (fog, lights, sky, sparkles)
- Plan environment backdrop prop placement
- Select appropriate props from the 87-entry PROP_PATHS manifest
- Design props placement for storytelling (table center for birthday, blanket for picnic)

### 2.2 — Visual Designer SME (`visual-designer`)

**Capabilities:**
- Inform color palette per task (within brand guidelines)
- Design mood/atmosphere (lighting, fog color, time of day)
- Work with set designer on prop visual coherence
- Ensure WCAG AA compliance in UI elements
- Design character staging (hero placement, entrance choreography)

### 2.3 — Background Director SME (`background-director`)

**Capabilities:**
- Design ambient actor behaviors (idle loops, wandering paths, interaction scripts)
- Script background "extras" that add life to scenes
- Define how background actors subtly react to player events (phase 2: reactive)
- Create "background scripts" — pre-authored behavior sequences

**Background Actor System Design:**
```typescript
interface BackgroundActor {
  characterId: ActorKey;
  personality: string;  // "cheerful shopkeeper", "grumpy guard"
  position: Position;

  // Phase 1: Ambient behaviors (pre-scripted loops)
  idleBehaviors: {
    animation: AnimationName;
    duration: number;  // seconds
    nextAnimation: AnimationName;
  }[];

  // Phase 2: Reactive behaviors (respond to scene events)
  reactions?: {
    trigger: 'spawn' | 'success' | 'fail' | 'any-action';
    response: {
      animation: AnimationName;
      emote?: string;
      delay?: number;  // seconds after trigger
    };
  }[];
}

// Example: Christmas Carol shopkeeper
const shopkeeper: BackgroundActor = {
  characterId: 'rogue',
  personality: 'busy merchant, always arranging things',
  position: 'right',
  idleBehaviors: [
    { animation: 'Idle_A', duration: 3, nextAnimation: 'PickUp' },
    { animation: 'PickUp', duration: 2, nextAnimation: 'Walking_A' },
    { animation: 'Walking_A', duration: 2, nextAnimation: 'Idle_A' },
  ],
  reactions: [
    { trigger: 'success', response: { animation: 'Cheering', emote: '🎉', delay: 0.5 } },
    { trigger: 'fail', response: { animation: 'Idle_A', emote: '🤔', delay: 1 } },
  ]
};
```

### 2.4 — Digital Literacy SME (`digital-literacy-sme`)

**Capabilities:**
- Review content for digital literacy pedagogy
- Ensure COPPA compliance in design decisions
- Apply AAP 5 Cs framework to content review
- Evaluate prompt engineering teaching approach (no jargon)
- Assess screen interaction patterns for age-appropriateness
- Review for Common Sense Media alignment

---

## The Production Pipeline

### Content Creation Flow

```
┌──────────────┐
│ Task Concept  │  "A skeleton tries to deliver pizza in a dungeon"
│  (human)      │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────────┐
│  /sme story-writer "Create story arc for..."     │
│  Outputs: Story Arc document                      │
└──────┬───────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────┐
│  /sme ece-professor "Review this story arc..."   │
│  Outputs: Educational Review with verdict         │
│  + Learning objectives + Scaffolding recs         │
└──────┬───────────────────────────────────────────┘
       │ (iterate if NEEDS WORK)
       ▼
┌──────────────────────────────────────────────────┐
│  /sme character-director "Cast and develop..."   │
│  Outputs: Character profiles, personalities,      │
│  hero staging, evolution tracking                 │
└──────┬───────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────┐
│  /sme prompt-writer "Convert to system prompt..." │
│  Outputs: .ts prompt file + fallback script       │
│  + demo cache entries                             │
└──────┬───────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────┐
│  /sme ece-professor "Runtime guardrail review..." │
│  Outputs: Guardrail rules for this task           │
└──────────────────────────────────────────────────┘
```

### Orchestration Skill: `compose-task`

A meta-skill that runs the full pipeline:

```
/compose-task "A skeleton tries to deliver pizza in a dungeon"

→ Invokes story-writer → gets story arc
→ Invokes ece-professor → gets educational review
→ If NEEDS WORK, feeds back to story-writer
→ Invokes character-director → gets cast + personalities
→ Invokes prompt-writer → gets system prompt + cache + fallback
→ Produces complete task package:
   - frontend/src/prompts/{task-id}.ts
   - Addition to fallback-scripts.ts
   - Additions to demo-cache.json
   - Character personality configs
   - Hero character staging config
```

---

## Character Evolution System (Cross-Task)

### Architecture

```
Player completes task
        │
        ▼
┌───────────────────┐
│ Evolution Engine   │
│ (Zustand + local)  │
│                    │
│ character_id       │
│ tasks_completed[]  │
│ personality_stage  │  ← 1-4 (growing confidence)
│ unlocked_traits[]  │
│ memory_snippets[]  │  ← "Remember your birthday?"
└────────┬──────────┘
         │
         ▼
  System Prompt Injection:
  "Note: Skeleton has completed 2 tasks.
   Current stage: Gaining confidence.
   May reference: 'that time at the birthday party'"
```

### Persistence Strategy
- **Zustand store** with `persist` middleware → localStorage
- Each character tracks: `taskHistory`, `personalityStage`, `unlockedTraits`
- System prompts get injected with character context before API call
- Narration can reference past events ("Remember when you delivered that pizza?")

---

## Background Actors System (Ambient Phase)

### Implementation Plan

1. **Define `TASK_BACKGROUND_ACTORS`** config (similar to `TASK_HERO_CHARACTERS`)
2. **Add to ScenePlayer3D** — spawn alongside heroes, but with behavior loops
3. **Create `useBackgroundLoop` hook** — cycles through idle behaviors on a timer
4. **Integrate with TaskAtmosphere** — background actors feel like part of the environment

```typescript
// New config in ScenePlayer3D.tsx
const TASK_BACKGROUND_ACTORS: Record<string, BackgroundActorConfig[]> = {
  'skeleton-birthday': [
    {
      id: 'bg-guard',
      characterId: 'skeleton_minion',
      position: [-5, 0, -2],  // back-left, near wall
      idleLoop: ['Idle_A', 'LookAround', 'Idle_A', 'Skeletons_Taunt'],
      loopTiming: [3, 2, 3, 2],  // seconds per animation
    },
    {
      id: 'bg-torch-lighter',
      characterId: 'skeleton_rogue',
      position: [5, 0, -2],  // back-right, near torch
      idleLoop: ['Walking_A', 'PickUp', 'Idle_A'],
      loopTiming: [2, 1.5, 4],
    }
  ],
  // ... other tasks
};
```

---

## Implementation Order (Hackathon)

### Task 1: Create story-writer SME (45 min) ✅ COMPLETE
- [x] Create `.claude/smes/story-writer/sme.yaml`
- [x] Create `.claude/smes/story-writer/system-prompt.md`
- [x] Create `.claude/smes/story-writer/knowledge/constraints.md`
- [x] Create `.claude/smes/story-writer/knowledge/heuristics.md`
- [x] Create `.claude/smes/story-writer/knowledge/ontology.md`
- [x] Create `.claude/smes/story-writer/knowledge/taste.md`

### Task 2: Create ece-professor SME (45 min) ✅ COMPLETE
- [x] Create `.claude/smes/ece-professor/sme.yaml`
- [x] Create `.claude/smes/ece-professor/system-prompt.md`
- [x] Create `.claude/smes/ece-professor/knowledge/constraints.md`
- [x] Create `.claude/smes/ece-professor/knowledge/heuristics.md`
- [x] Create `.claude/smes/ece-professor/knowledge/ontology.md`
- [x] Create `.claude/smes/ece-professor/knowledge/guidelines.md`
- [x] Create `.claude/smes/ece-professor/knowledge/rubric.md`

### Task 3: Create character-director SME (45 min) ✅ COMPLETE
- [x] Create `.claude/smes/character-director/sme.yaml`
- [x] Create `.claude/smes/character-director/system-prompt.md`
- [x] Create `.claude/smes/character-director/knowledge/constraints.md`
- [x] Create `.claude/smes/character-director/knowledge/heuristics.md`
- [x] Create `.claude/smes/character-director/knowledge/ontology.md`
- [x] Create `.claude/smes/character-director/knowledge/roster.md`
- [x] Create `.claude/smes/character-director/knowledge/evolution.md`

### Task 4: Create prompt-writer SME (45 min) ✅ COMPLETE
- [x] Create `.claude/smes/prompt-writer/sme.yaml`
- [x] Create `.claude/smes/prompt-writer/system-prompt.md`
- [x] Create `.claude/smes/prompt-writer/knowledge/constraints.md`
- [x] Create `.claude/smes/prompt-writer/knowledge/heuristics.md`
- [x] Create `.claude/smes/prompt-writer/knowledge/ontology.md`
- [x] Create `.claude/smes/prompt-writer/knowledge/templates.md`
- [x] Create `.claude/smes/prompt-writer/knowledge/examples.md`

### Task 5: Validation — Full pipeline test (30 min) ✅ COMPLETE
- [x] Run structural consistency check across all 4 SMEs
- [x] Verify cross-references: asset manifest ↔ roster ↔ prompts ↔ templates
- [x] Verify brand compliance: no banned words, comedy hierarchy preserved
- [x] Verify educational accuracy: Piaget, COPPA 2025, AAP 2026, NAEYC
- [x] Fix age inconsistency: "ages 8-10" → "ages 7-11" in 16 files (2 SME + 13 prompts + 1 test)
- [x] All 156 system prompt tests pass
- [x] 0 TypeScript errors

---

## File Structure

```
.claude/smes/
├── child-game-design/     # ✅ Exists (v2.0.0)
├── 3d-game-development/   # ✅ Exists (v1.0.0)
├── story-writer/          # 🆕 Build
│   ├── sme.yaml
│   ├── system-prompt.md
│   └── knowledge/
│       ├── constraints.md
│       ├── heuristics.md
│       ├── ontology.md
│       └── taste.md
├── character-director/    # 🆕 Build
│   ├── sme.yaml
│   ├── system-prompt.md
│   └── knowledge/
│       ├── constraints.md
│       ├── heuristics.md
│       ├── ontology.md
│       ├── roster.md
│       └── evolution.md
├── ece-professor/         # 🆕 Build
│   ├── sme.yaml
│   ├── system-prompt.md
│   └── knowledge/
│       ├── constraints.md
│       ├── heuristics.md
│       ├── ontology.md
│       ├── guidelines.md
│       └── rubric.md
├── prompt-writer/         # 🆕 Build
│   ├── sme.yaml
│   ├── system-prompt.md
│   └── knowledge/
│       ├── constraints.md
│       ├── heuristics.md
│       ├── ontology.md
│       ├── templates.md
│       └── examples.md
├── set-designer/          # 📋 Designed (post-hackathon)
├── visual-designer/       # 📋 Designed (post-hackathon)
├── background-director/   # 📋 Designed (post-hackathon)
└── digital-literacy-sme/  # 📋 Designed (post-hackathon)
```

---

## Success Criteria

### Hackathon (Feb 16)
- [x] 4 new SMEs created and functional (27 files total)
- [x] Pipeline designed: story-writer → ece-professor → character-director → prompt-writer
- [x] SMEs respect brand voice, vocabulary contract, and educational standards
- [x] All cross-references validated against asset-manifest.ts (28 chars, 139 anims, 87 props)

### Post-Hackathon
- [ ] Full 8-SME production company
- [ ] `compose-task` orchestration skill
- [ ] Background actor ambient system
- [ ] Character evolution persistence
- [ ] Runtime educational guardrails
- [ ] Digital literacy review layer
