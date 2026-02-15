---
paths:
  - "frontend/src/prompts/**"
  - "frontend/src/data/demo-cache.json"
  - "frontend/src/data/quest-stages.ts"
  - "frontend/src/data/fallback-scripts.ts"
  - "frontend/src/components/PromptInput.tsx"
  - "frontend/src/components/MadLibsInput.tsx"
---

# Brand Voice Rules (Kid-Facing Content)

These rules apply to ALL text that children will see.

## Forbidden Words
NEVER use: "prompt", "skills", "learning", "wrong", "failed", "error", "mistake", "challenge", "practice"
NEVER use empty praise: "Great job!", "Well done!", "Good try!", "Awesome work!"

## Replacements
- "prompt" -> "description" or "plan"
- "challenge" -> "quest" or "adventure"
- "learning" -> (just don't say it, show through gameplay)

## Writing Rules
- Narrations: max 20 words, present tense, 1 exclamation max
- Voice test: "Would a funny, encouraging older sibling say this?"
- Failure = comedy (FUNNY_FAIL must be funnier than FULL_SUCCESS)
- Feedback must be concrete and game-specific (not abstract prompting theory)

## Visual Rules
- NEVER use red (#FF0000) for failure
- Use yellow (#FBBF24) for funny fails, orange (#FF8C42) for try-again
- Glow effects, not flat fills
- Max 3 accent colors per screen
- WCAG AA contrast (4.5:1) required
