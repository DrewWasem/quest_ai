# Heuristics — Pattern-Matched Judgment

## Prompt Engineering for Claude

### Getting Claude to Be Funny
Claude's default mode is HELPFUL. For comedy, you must:
1. Give SPECIFIC funny examples in the prompt (not abstract instructions)
2. Use phrases like "silly and surprising" not "humorous"
3. Describe the VISUAL comedy: "the skeleton sits alone in an empty room looking confused"
4. NEVER say "be funny" — show it through examples

### Getting Consistent JSON
Claude sometimes wraps JSON in markdown code blocks. Prevent this:
1. "RESPOND WITH ONLY THE JSON OBJECT. NO OTHER TEXT."
2. "No markdown, no explanation, no preamble."
3. Start the format section with the literal JSON structure
4. End the prompt with the constraint reminder

### Controlling Verbosity
Claude wants to write long narrations. Constrain:
1. "narration must be fun, silly, and under 20 words"
2. Give 3-4 example narrations that ARE under 20 words
3. "One sentence only"

### Success Level Calibration
Claude tends to be generous (FULL_SUCCESS for partial inputs). Counter:
1. Make success criteria VERY explicit (list the 3 elements)
2. "All three elements present = FULL_SUCCESS"
3. "Only 1-2 of the three = PARTIAL_SUCCESS"
4. "Too vague, unrelated, or nonsensical = FUNNY_FAIL"
5. Give examples of borderline inputs and their correct classification

## Vocabulary Section Design

### Actors Section Pattern
```
AVAILABLE ACTORS (use these exact names):
- [actor_id]: [comma-separated animation list]
```
- List 10-15 animations per character (not all 139)
- Choose animations relevant to THIS task's theme
- Always include: Idle_A, Walking_A, Cheering (essential for any scene)
- Add character-specific: Skeletons_Taunt for skeletons, Ranged_Magic_* for mages

### Props Section Pattern
```
AVAILABLE PROPS (use these exact names):
- [comma-separated prop list]
```
- Only list props from THIS task's TASK_ASSETS
- Keep it to 8-15 props (too many = Claude gets choice paralysis)
- Group by type if helpful (furniture, food, decorations)

### Reactions Section (same for all tasks)
```
AVAILABLE REACTIONS (use these exact names):
- confetti-burst, explosion-cartoon, hearts-float, stars-spin, question-marks, laugh-tears, fire-sneeze, splash, sparkle-magic, sad-cloud
```

## Fallback Script Design

### The "Safe Partial" Pattern
Every fallback should:
1. Spawn the lead character at center
2. Spawn 1 prop that always fits the theme
3. Play the lead character's idle animation
4. Show question-marks reaction (universal "needs more info" signal)
5. List 2-3 missing elements
6. Give a concrete tip that works for ANY vague input

### Example Fallback Quality
GOOD:
```json
{
  "success_level": "PARTIAL_SUCCESS",
  "narration": "The skeleton sets up a table but forgot to invite anyone!",
  "actions": [
    { "type": "spawn", "target": "skeleton_warrior", "position": "center" },
    { "type": "spawn", "target": "table_long", "position": "left" },
    { "type": "animate", "target": "skeleton_warrior", "anim": "Idle_A" },
    { "type": "react", "effect": "question-marks", "position": "center" }
  ],
  "missing_elements": ["party guests", "decorations"],
  "prompt_feedback": "Nice start! Try describing WHO comes to the party and what decorations to put up."
}
```

BAD:
```json
{
  "success_level": "PARTIAL_SUCCESS",
  "narration": "Something happened.",
  "actions": [
    { "type": "spawn", "target": "skeleton_warrior", "position": "center" }
  ],
  "missing_elements": ["everything"],
  "prompt_feedback": "Try to be more specific."
}
```

## Cache Entry Design

### Coverage Matrix
For each task, generate entries covering:

| Category | Count | Input Style |
|----------|-------|------------|
| FULL_SUCCESS | 3-5 | Detailed, mentions all 3 elements |
| PARTIAL_SUCCESS (2 elements) | 2-3 | Mentions 2 of 3 elements |
| PARTIAL_SUCCESS (1 element) | 2-3 | Mentions only 1 element |
| FUNNY_FAIL (vague) | 2-3 | "have a party", "do something" |
| FUNNY_FAIL (off-topic) | 1-2 | "i like pizza", random words |
| FUNNY_FAIL (nonsensical) | 1-2 | "asdfgh", "!!!", random characters |

### Input Prediction
Think about what KIDS would actually type:
- Short sentences (5-15 words typical)
- Misspellings are OK (Claude handles them)
- References to characters by common names ("the knight", "skeleton")
- Direct instructions ("make the skeleton dance")
- Descriptions ("there should be a big cake and presents")

### Cache Key Format
```json
{
  "task": "skeleton-birthday",
  "input": "invite the knight and mage and put up blue banners and a big cake",
  "response": { ... scene script ... }
}
```
- Input should be lowercase normalized for matching
- Include common misspellings as separate entries
- Include both "invite the knight" and "the knight should come" styles

## Testing Edge Cases

### Must-Handle Inputs
1. Empty string → FUNNY_FAIL
2. Single word → FUNNY_FAIL (usually)
3. Off-topic → FUNNY_FAIL with comedy
4. Extremely detailed → FULL_SUCCESS (don't penalize verbosity)
5. References wrong characters → Ignore wrong ones, use available ones
6. Misspelled character names → Claude should still understand
7. Multiple sentences → Claude should parse the whole thing
8. Questions instead of instructions → FUNNY_FAIL with helpful redirect
