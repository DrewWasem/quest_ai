# Hard Constraints — NEVER Violate

## Prompt Format
- Every prompt is a single exported TypeScript string constant
- File name: `frontend/src/prompts/[task-id].ts`
- Export name: `[TASK_ID_UPPER]_PROMPT` (e.g., `SKELETON_BIRTHDAY_PROMPT`)
- Claude model: MUST be claude-opus-4-6 (hackathon rule)
- Response format: JSON ONLY — no markdown, no explanation, no preamble
- Final instruction: "RESPOND WITH ONLY THE JSON OBJECT. NO OTHER TEXT."

## JSON Schema (Scene Script)
Every Claude response MUST match this exact schema:
```json
{
  "success_level": "FULL_SUCCESS" | "PARTIAL_SUCCESS" | "FUNNY_FAIL",
  "narration": "string (max 20 words, present tense)",
  "actions": [
    { "type": "spawn", "target": "actor_id", "position": "position_id" },
    { "type": "move", "target": "actor_id", "to": "position_id", "style": "move_style" },
    { "type": "animate", "target": "actor_id", "anim": "AnimationClipName" },
    { "type": "react", "effect": "effect_name", "position": "position_id" },
    { "type": "emote", "target": "actor_id", "emoji": "emoji" },
    { "type": "sfx", "sound": "sound_type" }
  ],
  "missing_elements": ["string"],
  "prompt_feedback": "string (max 2 sentences)"
}
```

## Vocabulary Contract
- ONLY reference characters from the CHARACTERS manifest (28 entries)
- ONLY reference animation clips from ANIMATION_CLIPS (139 entries)
- ONLY reference props listed in the task's TASK_ASSETS entry
- ONLY reference the 10 reaction effects
- ONLY reference the 8 stage positions
- ONLY reference the 7 move styles
- NEVER allow Claude to invent asset names
- EVERY prompt MUST list available assets explicitly

## Action Limits
- Maximum 6 actions per script
- Actions are sequential (spawn before move, move before animate)
- At least 1 spawn action in every script
- FUNNY_FAIL scripts can have fewer actions (1-3 is fine — comedy in brevity)
- FULL_SUCCESS scripts should have 4-6 actions

## Narration Rules
- Maximum 20 words
- Present tense ("The skeleton catches..." not "The skeleton caught...")
- Maximum 1 exclamation mark
- Must be concrete and visual (describe what's happening on stage)
- NEVER address the player ("You did great!" ✗)
- NEVER use banned words: "prompt", "skills", "learning", "wrong", "failed", "error"

## Feedback Rules
- Maximum 2 sentences
- Must be game-specific ("the skeleton didn't know who to invite")
- NEVER abstract theory ("try to be more specific")
- NEVER empty praise ("Great job!")
- NEVER use banned words
- For FUNNY_FAIL: observation about the comedy + concrete suggestion
- For PARTIAL_SUCCESS: what worked + what's missing (in game terms)
- For FULL_SUCCESS: specific celebration of what they described

## Fallback Script Rules
- Must be PARTIAL_SUCCESS level
- Must use only core safe actions (spawn, simple move, idle anim)
- Must work for ANY input (generic enough to always make sense)
- Must include missing_elements (guides the player)
- Must include feedback tip (concrete suggestion)

## Cache Entry Rules
- Each entry: { "task": "task-id", "input": "user text", "response": SceneScript }
- Minimum 10 entries per task (ideally 15-20)
- Must cover: 3+ FULL_SUCCESS, 3+ PARTIAL_SUCCESS, 3+ FUNNY_FAIL
- Inputs should match common things kids would type
- FUNNY_FAIL inputs: vague ("have a party"), off-topic ("i like pizza"), nonsensical ("asdfgh")
- Cache matching: exact string match first, then fuzzy (normalized lowercase)
