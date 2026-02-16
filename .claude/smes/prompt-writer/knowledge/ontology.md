# Prompt Architecture — Domain Model

## System Prompt Anatomy

```
System Prompt
├── 1. Game Context (2-3 lines)
│   ├── "You are the game engine for Quest AI"
│   ├── Task name and premise
│   └── Evaluation instruction
├── 2. JSON Format (exact schema with example)
│   ├── success_level field
│   ├── narration field
│   ├── actions array
│   ├── missing_elements array
│   └── prompt_feedback field
├── 3. Success Criteria (3 tiers)
│   ├── FULL_SUCCESS: all 3 elements
│   ├── PARTIAL_SUCCESS: 1-2 elements
│   └── FUNNY_FAIL: vague/unrelated
├── 4. Vocabulary Sections
│   ├── AVAILABLE ACTORS (name: animations)
│   ├── AVAILABLE PROPS (names)
│   ├── AVAILABLE REACTIONS (names)
│   ├── AVAILABLE POSITIONS (names)
│   └── AVAILABLE MOVE STYLES (names)
└── 5. Rules (constraints)
    ├── Max 6 actions
    ├── Only use listed assets
    ├── Narration rules
    ├── Comedy rules
    ├── Feedback rules
    └── JSON-only response
```

## Three-Tier Response System

```
Player Input
     │
     ▼
┌─────────┐     ┌──────────┐     ┌──────────────┐
│ Tier 1   │────▶│ Tier 2    │────▶│ Tier 3        │
│ CACHE    │ miss│ LIVE API  │ fail│ FALLBACK      │
│ (0ms)    │     │ (1-8s)    │     │ (0ms)         │
│          │     │ 6s timeout│     │               │
│ Exact or │     │ Claude    │     │ Pre-written   │
│ fuzzy    │     │ Opus 4.6  │     │ PARTIAL_      │
│ match    │     │           │     │ SUCCESS       │
└──────────┘     └──────────┘     └───────────────┘
```

### Cache Matching Strategy
1. **Exact match:** normalize input (lowercase, trim, collapse whitespace)
2. **Fuzzy match:** token overlap scoring (threshold: 0.7)
3. **Miss:** proceed to Tier 2

### Cache Entry Format (demo-cache.json)
```json
[
  {
    "task": "skeleton-birthday",
    "input": "invite the knight and set up banners and a cake",
    "response": {
      "success_level": "FULL_SUCCESS",
      "narration": "The knight bursts through the door with presents as the skeleton cheers!",
      "actions": [
        { "type": "spawn", "target": "skeleton_warrior", "position": "center" },
        { "type": "spawn", "target": "banner_blue", "position": "left" },
        { "type": "spawn", "target": "cake_birthday", "position": "right" },
        { "type": "move", "target": "knight", "to": "left", "style": "arc" },
        { "type": "animate", "target": "skeleton_warrior", "anim": "Cheering" },
        { "type": "react", "effect": "confetti-burst", "position": "center" }
      ],
      "missing_elements": [],
      "prompt_feedback": "The skeleton's got guests, decorations, AND cake — this party is perfect!"
    }
  }
]
```

## Scene Script Action Reference

### Action Types

| Type | Required Fields | Optional Fields | Effect |
|------|----------------|-----------------|--------|
| spawn | target, position | — | Place actor/prop on stage |
| move | target, to, style | — | Animate movement to position |
| animate | target, anim | — | Play animation clip |
| react | effect, position | — | Spawn particle effect |
| emote | target, emoji | — | Show emoji above character |
| sfx | sound | — | Play synthesized sound |
| wait | duration | — | Pause between actions |
| remove | target | — | Remove actor from stage |

### Available Positions
left, center, right, top, bottom, off-left, off-right, off-top

### Available Move Styles
linear, arc, bounce, float, shake, spin-in, drop-in

### Available Reactions
confetti-burst, explosion-cartoon, hearts-float, stars-spin, question-marks, laugh-tears, fire-sneeze, splash, sparkle-magic, sad-cloud

### Available Sound Types
spawn, move, animate, react, success, partial, fail, emote, intro

## Prompt Performance Metrics

### Target Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Valid JSON rate | >99% | % of responses that parse as valid JSON |
| Schema compliance | >98% | % of responses matching exact schema |
| Vocabulary compliance | >99% | % of responses using only listed assets |
| Narration length | 100% under 20 words | Word count check |
| Action count | 100% ≤ 6 | Array length check |
| Comedy quality | Subjective | "Would a kid show this to a friend?" |
| Response latency | <6s (p95) | API call timing |

### Common Failure Modes
| Failure | Cause | Fix |
|---------|-------|-----|
| Markdown wrapping | Claude adds ``` around JSON | Add "NO OTHER TEXT" instruction |
| Extra fields | Claude adds helpful but unwanted fields | List exact fields in schema |
| Long narrations | Claude loves to describe | Add "under 20 words" + examples |
| Too generous | Claude gives FULL_SUCCESS for partial | Make criteria very explicit |
| Invented assets | Claude hallucinates prop names | List available assets exhaustively |
| Preachy feedback | Claude gives teaching advice | "game-specific, not abstract theory" |
