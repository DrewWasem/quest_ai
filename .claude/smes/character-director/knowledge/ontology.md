# Character System — Domain Model

## Character Architecture

```
Character
├── Identity
│   ├── character_id (asset key — e.g., "knight", "skeleton_warrior")
│   ├── display_name (kid-facing — e.g., "the Knight", "Skeleton")
│   └── model_path (GLB file path)
├── Personality
│   ├── traits[] (2-3 adjective words)
│   ├── comedy_type (physical / fish-out-of-water / straight-man / chaos)
│   ├── speech_style (how they'd talk if they could — informs emotes)
│   └── signature_move (their go-to funny animation)
├── Animation Vocabulary
│   ├── idle (default waiting animation)
│   ├── happy[] (success celebration clips)
│   ├── confused[] (failure reaction clips)
│   ├── working[] (attempting task clips)
│   └── special[] (character-specific signature clips)
├── Task Contexts
│   ├── [task_id]
│   │   ├── role (their purpose in this story)
│   │   ├── arc (emotional journey: start → middle → end)
│   │   ├── special_behaviors (task-specific funny moments)
│   │   └── relationships (how they interact with others)
│   └── ...
└── Evolution
    ├── stage (1-4: uncertain → growing → enthusiastic → confident)
    ├── tasks_completed[] (which tasks they've been in)
    ├── unlocked_traits[] (new behaviors gained through play)
    └── memory_snippets[] (references to past events)
```

## Evolution Stages

```
Stage 1: UNCERTAIN        Stage 2: GROWING         Stage 3: ENTHUSIASTIC      Stage 4: CONFIDENT
─────────────────         ────────────────         ──────────────────         ────────────────
Nervous idle              Slightly more             Eager animation            Natural animation
Hesitant movement         confident                 Tries new things           Leads activities
Looks to others           Starting to help          Makes jokes (emotes)       Helps others
Minimal emotes            Some new emotes           Full emote range           Signature moves
                                                                               References past
```

### Evolution Triggers
| Trigger | Growth Amount | Notes |
|---------|-------------|-------|
| FULL_SUCCESS in a task | +1 stage point | Character was part of a success |
| PARTIAL_SUCCESS | +0.5 stage point | Still learning |
| FUNNY_FAIL | +0.25 stage point | Even failure teaches (but slowly) |
| 3 tasks completed | +1 bonus point | Experience accumulates |

### Stage Thresholds
| Stage | Points Needed | Key Change |
|-------|--------------|------------|
| 1 → 2 | 2 points | New idle animation variant |
| 2 → 3 | 5 points | New emote options, more confident animations |
| 3 → 4 | 10 points | Signature moves, references past events in narration |

## Staging Positions

```
Stage Layout (top view):

  off-left    top     off-right
     ↓         ↓         ↓
  [-6,0,0]  [0,2,-2]  [6,0,0]

  left      center     right
  [-3,0,0]  [0,0,0]   [3,0,0]

            bottom
            [0,0,2]

            off-top
            [0,5,0]
```

### Position Semantics
| Position | Use For |
|----------|---------|
| center | Lead character, main action |
| left | Secondary character, entrance side |
| right | Supporting character, observer side |
| top | Elevated character, background character |
| bottom | Foreground character, close-up |
| off-left | Character entering scene |
| off-right | Character entering scene (from right) |
| off-top | Character dropping in from above |

## Character Relationships

### Relationship Types
| Type | Dynamic | Comedy Source |
|------|---------|--------------|
| Allies | Work together, complementary skills | Joint success / joint failure |
| Opposites | Clashing approaches to same problem | Contrast comedy |
| Mentor/Student | One teaches, other learns wrong lesson | Miscommunication |
| Rivals-to-Friends | Start competitive, end cooperative | Unexpected teamwork |
| Fish/Water | One character completely out of their element | Everything they do is wrong |

### Established Relationships (from existing tasks)
- Skeleton ↔ Adventurers: Fish/Water + Rivals-to-Friends (birthday party bonding)
- Knight ↔ Space Ranger: Opposites (medieval meets future)
- Mage ↔ Witch: Allies (magic users with different styles)
- Barbarian ↔ Everyone: Chaos Agent (helps by making things worse)
- 5 Adventurers: Ensemble (each fills a different role)

## Background Actor Behavior Model

```
BackgroundActor
├── character_id (from roster)
├── personality (one-line description)
├── position (stage position — usually back/sides)
├── idle_loop
│   ├── animations[] (cycle through these)
│   ├── durations[] (seconds per animation)
│   └── loop_mode (repeat / ping-pong / random)
└── reactions (Phase 2 — post-hackathon)
    ├── on_spawn: [animation, emote, delay]
    ├── on_success: [animation, emote, delay]
    └── on_fail: [animation, emote, delay]
```

### Background Actor Design Principles
1. They add LIFE to the scene without stealing focus
2. Their behavior is RELATED to the setting (guard in dungeon, shopper at market)
3. They NEVER interact with the main cast unless triggered (Phase 2)
4. They run on a timer loop, cycling through 2-4 idle animations
5. They're placed at edges of the stage (back-left, back-right, far positions)
