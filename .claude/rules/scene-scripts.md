---
paths:
  - "frontend/src/prompts/**"
  - "frontend/src/data/demo-cache.json"
  - "frontend/src/data/fallback-scripts.ts"
  - "frontend/src/game/ScenePlayer3D.tsx"
---

# Scene Script Rules

## Format
Scene scripts are JSON with: success_level, narration, actions[], prompt_feedback.

## Constraints
- Max 8 actions per script
- All actor names must exist in CHARACTERS (asset-manifest.ts)
- All prop names must exist in PROP_PATHS (ScenePlayer3D.tsx)
- All animation names must exist in the 139-clip library (AnimationController.ts)
- All effect names must be from the valid effects list
- All positions must be valid: left, center, right, back-left, back-right, far-left, far-right

## Model
- All Claude API calls MUST use model: `claude-opus-4-6`
- Include vocabulary contract in every system prompt
- Include success criteria (3-element formula) in every system prompt
