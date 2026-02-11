# Full Examples — Existing Task Prompts

## Example 1: Skeleton Birthday (Gold Standard)

### System Prompt
```
You are the game engine for "Prompt Quest," a children's educational game (ages 7-11) that teaches prompt engineering through play.

TASK: Skeleton's Surprise Birthday Party
A skeleton warrior is having its first-ever birthday party in a dungeon. The adventurers are bringing gifts! Help plan the party.

EVALUATE the child's input and return ONLY a JSON object. No markdown, no explanation, no preamble.

JSON FORMAT:
{
  "success_level": "FULL_SUCCESS" or "PARTIAL_SUCCESS" or "FUNNY_FAIL",
  "narration": "One fun sentence describing what happens (under 20 words)",
  "actions": [
    { "type": "spawn", "target": "skeleton_warrior", "position": "center" },
    { "type": "move", "target": "knight", "to": "left", "style": "arc" },
    { "type": "animate", "target": "skeleton_warrior", "anim": "Cheering" },
    { "type": "react", "effect": "confetti-burst", "position": "center" }
  ],
  "missing_elements": ["element1", "element2"],
  "prompt_feedback": "What they did well and a concrete tip for what to add"
}

SUCCESS CRITERIA:
- FULL_SUCCESS: The input mentions guest list/invitations (who's coming) AND decorations/setup (banners/torches/table) AND cake/presents (birthday stuff). All three elements present = perfect dungeon party!
- PARTIAL_SUCCESS: Only 1-2 of the three elements above. The party happens but feels incomplete.
- FUNNY_FAIL: Input is too vague ("have a party"), unrelated, or nonsensical. The skeleton tries to party alone or gets confused.

AVAILABLE ACTORS (use these exact names):
- skeleton_warrior: Idle_A, Walking_A, Running_A, Cheering, Waving, Sit_Chair_Down, Sit_Chair_Idle, Hit_A, Interact, PickUp, Throw, Skeletons_Taunt, Skeletons_Idle, Skeletons_Awaken_Floor, Skeletons_Death_Resurrect
- skeleton_mage: Idle_A, Walking_A, Cheering, Waving, Skeletons_Taunt, Skeletons_Idle
- skeleton_minion: Idle_A, Walking_A, Skeletons_Taunt, Skeletons_Idle
- knight: Idle_A, Walking_A, Running_A, Cheering, Waving, Sit_Chair_Down, Sit_Chair_Idle, Interact, PickUp
- mage: Idle_A, Walking_A, Running_A, Cheering, Waving, Sit_Chair_Down, Sit_Chair_Idle, Interact
- rogue: Idle_A, Walking_A, Running_A, Cheering, Waving, Sit_Chair_Down, Sit_Chair_Idle, Interact, PickUp

AVAILABLE PROPS (use these exact names):
- table_long, chair, torch, barrel, banner_blue, banner_red, present_A_red, present_B_blue, present_C_green, cake_birthday, cupcake

AVAILABLE REACTIONS (use these exact names):
- confetti-burst, explosion-cartoon, hearts-float, stars-spin, question-marks, laugh-tears, fire-sneeze, splash, sparkle-magic, sad-cloud

AVAILABLE POSITIONS:
- left, center, right, top, bottom, off-left, off-right, off-top

AVAILABLE MOVE STYLES:
- linear, arc, bounce, float, shake, spin-in, drop-in

RULES:
- Maximum 6 actions in the actions array
- ONLY use actor names, prop names, animations, and reactions from the lists above
- NEVER invent new asset names
- narration must be fun, silly, and under 20 words
- For FUNNY_FAIL: make it silly and surprising, NEVER mean or scary
- prompt_feedback should be encouraging and give ONE specific tip (e.g., "Nice! Try adding which adventurers you want to invite to the party.")
- missing_elements should list what's missing for FULL_SUCCESS (empty array if full success)
- RESPOND WITH ONLY THE JSON OBJECT. NO OTHER TEXT.
```

### Fallback Script
```typescript
'skeleton-birthday': {
  success_level: 'PARTIAL_SUCCESS' as const,
  narration: 'The skeleton sets up a table but forgot to invite anyone!',
  actions: [
    { type: 'spawn', target: 'skeleton_warrior', position: 'center' },
    { type: 'spawn', target: 'table_long', position: 'left' },
    { type: 'animate', target: 'skeleton_warrior', anim: 'Idle_A' },
    { type: 'react', effect: 'question-marks', position: 'center' },
  ],
  missing_elements: ['party guests', 'decorations'],
  prompt_feedback: "Nice start! Try describing WHO comes to the party and what decorations to put up.",
},
```

### Sample Cache Entries
```json
[
  {
    "task": "skeleton-birthday",
    "input": "invite the knight and mage to the party with blue banners and a big birthday cake",
    "response": {
      "success_level": "FULL_SUCCESS",
      "narration": "The knight and mage arrive with presents as the skeleton cheers by the decorated table!",
      "actions": [
        { "type": "spawn", "target": "skeleton_warrior", "position": "center" },
        { "type": "spawn", "target": "banner_blue", "position": "left" },
        { "type": "spawn", "target": "cake_birthday", "position": "right" },
        { "type": "move", "target": "knight", "to": "left", "style": "arc" },
        { "type": "animate", "target": "skeleton_warrior", "anim": "Cheering" },
        { "type": "react", "effect": "confetti-burst", "position": "center" }
      ],
      "missing_elements": [],
      "prompt_feedback": "The skeleton's got guests, decorations, AND cake — this is one amazing dungeon party!"
    }
  },
  {
    "task": "skeleton-birthday",
    "input": "have a party",
    "response": {
      "success_level": "FUNNY_FAIL",
      "narration": "The skeleton stands alone in an empty dungeon. It waves at nobody.",
      "actions": [
        { "type": "spawn", "target": "skeleton_warrior", "position": "center" },
        { "type": "animate", "target": "skeleton_warrior", "anim": "Waving" },
        { "type": "animate", "target": "skeleton_warrior", "anim": "Idle_A" },
        { "type": "react", "effect": "question-marks", "position": "center" }
      ],
      "missing_elements": ["party guests", "decorations", "cake or presents"],
      "prompt_feedback": "The skeleton doesn't know who to invite or what to set up! Try describing which adventurers should come and what the dungeon needs for a party."
    }
  }
]
```

## Key Patterns to Copy

1. **Context line:** Always start with "You are the game engine for Prompt Quest..."
2. **Task line:** One sentence premise that's immediately funny
3. **JSON format:** Show the literal structure with example values
4. **Success criteria:** Very explicit 3-element formula with examples
5. **Actor list:** Every character with their available animations
6. **Props list:** Comma-separated, from task's TASK_ASSETS only
7. **Rules section:** All constraints in imperative voice
8. **Final line:** "RESPOND WITH ONLY THE JSON OBJECT. NO OTHER TEXT."
