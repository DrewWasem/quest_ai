# Story Architecture — Domain Model

## Module Structure

```
Module (Story Arc)
├── Premise (1-2 sentences — the funny situation)
├── Three-Element Formula
│   ├── Element A (most natural — kids say this first)
│   ├── Element B (requires thought)
│   └── Element C (creative twist)
├── Success Tiers
│   ├── FULL_SUCCESS (all 3 elements → satisfying payoff)
│   ├── PARTIAL_SUCCESS (1-2 elements → incomplete but charming)
│   └── FUNNY_FAIL (0 elements / vague → maximum comedy)
├── Cast
│   ├── Lead (1 protagonist)
│   ├── Supporting (1-4 additional characters)
│   ├── Heroes (visible on stage before player input)
│   └── Background (ambient extras — post-hackathon)
├── Set
│   ├── Environment Props (always present)
│   ├── Scene Props (spawned by actions)
│   └── Atmosphere (fog, sky, lights, particles)
└── Interaction Points
    ├── Input Prompt (what the player types)
    ├── Feedback (concrete tip after result)
    └── Retry Loop (player can always try again)
```

## Success Tier Psychology

| Tier | Player Emotion | Design Goal |
|------|---------------|-------------|
| FULL_SUCCESS | Pride + "Look what I made!" | Confetti, cheering, everything works beautifully |
| PARTIAL_SUCCESS | "Almost! I know what to add!" | Encouraging, shows what worked + hints at what's missing |
| FUNNY_FAIL | Laughter + "Let me try that again!" | SO FUNNY they show a friend. Failure = best moment. |

## Scene Script Actions

The story arc must be expressible through these 6 action types:

| Action | What It Does | Example |
|--------|-------------|---------|
| spawn | Place actor/prop on stage | `spawn skeleton_warrior center` |
| move | Move actor to position with style | `move knight right arc` |
| animate | Play animation clip | `animate skeleton_warrior Cheering` |
| react | Particle effect | `react confetti-burst center` |
| emote | Emoji bubble above character | `emote skeleton_warrior 🎂` |
| sfx | Play sound | `sfx success` |

**Max 6 actions per script.** Stories must be tellable in 6 moves or fewer.

## Available Reactions (Particle Effects)
1. confetti-burst — celebration, success
2. explosion-cartoon — dramatic comedy
3. hearts-float — love, appreciation
4. stars-spin — magic, wonder
5. question-marks — confusion, comedy
6. laugh-tears — hilarity
7. fire-sneeze — accidental fire/chaos
8. splash — water/mess
9. sparkle-magic — magical moment
10. sad-cloud — disappointment (never harsh)

## Positions on Stage
```
         off-top
           │
off-left ← top → off-right
           │
  left ← center → right
           │
         bottom
```

## Comedy Hierarchy (most important design principle)

```
FUNNY_FAIL comedy level: ████████████████████ (100%)
PARTIAL_SUCCESS charm:   ████████████ (60%)
FULL_SUCCESS satisfaction: ██████████████ (70%)
```

The FUNNY_FAIL must be the MOST entertaining outcome. This is what makes kids want to experiment. If success is more fun than failure, kids will try to "get it right" instead of exploring.

## Educational Embedding

Learning is NEVER explicit. It's embedded in the comedy:

| What Kids Learn | How the Story Teaches It |
|----------------|------------------------|
| Specificity matters | Vague instructions → hilariously literal interpretation |
| Details change outcomes | "Big cake" vs "big chocolate cake with candles" → different results |
| Planning helps | "invite friends AND set up chairs" → better party than just "party" |
| Iteration improves | Retry after funny fail → better result → intrinsic motivation |
| Cause and effect | "I said X, and Y happened" → concrete feedback loop |
