# Ontology — Domain Model

## Cognitive Development (Piaget)

### Concrete Operational Stage (Ages 7-11)
- **Can do:** Logical thinking about concrete objects, cause-and-effect reasoning, conservation, reversibility, decentering (considering multiple perspectives), basic metacognition
- **Cannot do:** Abstract reasoning, hypothetical-deductive thinking, pure conceptual analysis
- **Implication for game design:** Kids must SEE the results of their words. "Be more specific" is abstract and useless. "The monster didn't know which cake to eat" is concrete and actionable.

### Key Developmental Characteristics
- **Centration → Decentering:** Younger kids (7-8) focus on one dimension at a time. Older kids (10-11) can juggle 2-3 dimensions. Task difficulty should scale accordingly.
- **Metacognition emerging:** Kids are beginning to think about their own thinking. Feedback that says "you forgot to describe the walls" helps them reflect on what they DIDN'T think about — this is metacognition practice disguised as game advice.
- **Sensitivity to age-appropriateness:** A 9-year-old will reject content they perceive as "for little kids." Visual design, language, and tone must feel peer-appropriate, never babyish.

## The Quest AI Game Model

### Core Loop
```
Kid types description → Claude generates scene script → 3D engine renders it → Kid sees result → Feedback tip → Retry
```

### Success Levels
| Level | Meaning | Emotion | Color | Sound |
|-------|---------|---------|-------|-------|
| FULL_SUCCESS | Kid's description covered all key elements | Pride, celebration | Green #22C55E | Ascending chime + confetti |
| PARTIAL_SUCCESS | Some elements covered, some missing | Curiosity, "almost!" | Orange #FF8C42 | Partial fanfare |
| FUNNY_FAIL | Vague/incomplete description → hilarious chaos | Laughter, surprise | Yellow #FBBF24 | Trombone wah-wah / cartoon boing |

### The Comedy Formula
Every task follows: **Wrong character + Wrong place = Maximum comedy potential**
- A skeleton at a birthday party (doesn't know what candles are)
- A knight accidentally in space (swings sword at control panel)
- A barbarian at school (too big for the chair)
- The SCENARIO is funny before the kid even types anything

### Feedback Model
- **What it references:** The game world (characters, props, scenes)
- **What it NEVER references:** The child's input, "prompts", abstract skills
- **Structure:** [What went wrong in the scene] + [What to try next time]
- **Example:** "The robot didn't know how to cross the river! Try telling it what to use — a bridge? A jetpack? A really long pizza?"

## The Brand

### Visual Identity
- **UI wrapper:** Light lavender (#FAF7FF) — bright, welcoming
- **Game canvas:** Dark magic (#0F0A1A to #1A0F2E) — mysterious, adventure
- **This creates:** A "window into another world" — the light UI frames the dark magical game
- **3D style:** KayKit/Tiny Treats low-poly — charming miniature diorama aesthetic
- **Fonts:** Fredoka (display), Nunito (body) — rounded, friendly, never childish

### Voice Pillars
1. **Playfully Encouraging** — every attempt celebrated, never judged
2. **Genuinely Funny** — humor through absurdity, never mockery
3. **Concretely Helpful** — game-specific tips, never abstract theory
4. **Never Condescending** — no baby talk, no false enthusiasm, no "good job buddy"

### The Voice Test
"Would a funny, encouraging older sibling say this?"
- If it sounds like a teacher → rewrite
- If it sounds like a textbook → rewrite
- If it sounds like a children's TV host → rewrite
- If it sounds like the coolest babysitter who turns everything into an adventure → ship it
