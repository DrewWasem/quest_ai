# Cross-Task Character Evolution Framework

## Philosophy

Characters GROW through the game, not just across it. Each task a character participates in leaves a mark — a slight shift in personality, a new behavior, a memory. This makes the game feel alive and rewards players who return to characters they've played with before.

**Key principle:** Evolution is a BONUS, never a requirement. Players can do tasks in any order. Evolution adds depth for repeat players without gating content.

## Evolution State Schema

```typescript
interface CharacterEvolution {
  characterId: string;
  stage: 1 | 2 | 3 | 4;
  points: number;
  tasksCompleted: {
    taskId: string;
    successLevel: 'FULL_SUCCESS' | 'PARTIAL_SUCCESS' | 'FUNNY_FAIL';
    timestamp: number;
  }[];
  unlockedTraits: string[];
  memorySnippets: string[];
}
```

## Stage Definitions

### Stage 1: The Newcomer
**Points:** 0-1.99
**Character feels:** Uncertain, nervous, following others
**Visual cues:**
- Default Idle_A animation only
- Minimal emote options (😊, 😮)
- Positioned off-center (following the lead)

### Stage 2: Finding Their Feet
**Points:** 2-4.99
**Character feels:** Starting to contribute, occasionally confident
**Visual cues:**
- Idle_A + Idle_B (slight variation)
- More emote options (😊, 😮, 🎉, 💪)
- Can be positioned center-stage
**New behaviors:**
- Occasionally references past task ("That was like the birthday party!")
- Slightly faster/more confident walking animation

### Stage 3: Coming Into Their Own
**Points:** 5-9.99
**Character feels:** Enthusiastic, takes initiative, makes jokes
**Visual cues:**
- Character-specific idle (e.g., Skeletons_Idle for skeletons)
- Full emote range
- Can be hero character for any task
**New behaviors:**
- References past events in narration
- Has "signature moves" (unique animation combos)
- Occasionally helps other characters in scene scripts

### Stage 4: The Veteran
**Points:** 10+
**Character feels:** Confident leader, still clumsy/funny, mentors others
**Visual cues:**
- Unique entrance animation (Spawn_Air or character-specific)
- All animations unlocked
- Premium emote options
**New behaviors:**
- Narration references multiple past events
- Can "teach" Stage 1 characters (mentor dynamic)
- Signature celebration (unique animation + emote + reaction combo)

## Established Character Arcs

### Skeleton Warrior — "The Lovable Outsider"
```
Stage 1: "A skeleton who's never been to a party, a job interview, or... anywhere really."
  → Birthday party (T1): First social experience. Nervous about everything.
  → Pizza delivery (T6): First job. Eager but confused by human customs.

Stage 2: "Starting to understand how this 'being social' thing works."
  → Dungeon concert (T5): Attending a concert. Gets really into the music.
  → Narration bonus: "The skeleton waves at everyone — it's getting better at that!"

Stage 3: "Enthusiastic about EVERYTHING. Still accidentally loses bones."
  → Any task: Volunteers for things. Makes skeleton puns.
  → Narration bonus: "Remember when it tried to blow out candles? Classic."

Stage 4: "The skeleton that everyone likes. Still can't blow out candles."
  → Leader in group tasks. References past adventures.
  → Narration bonus: "From first birthday to headlining a rock concert — what a journey."
```

### Knight — "The Earnest Organizer"
```
Stage 1: "A knight who takes EVERYTHING literally and follows rules to the letter."
  → Space mission (T2): Pushes every button because someone said "explore."
  → Birthday (T1): Arrives in full armor with a gift-wrapped sword.

Stage 2: "Learning that rules don't cover every situation."
  → School (T4): Tries to teach barbarian manners. Fails beautifully.
  → Narration bonus: "The knight pulls out a checklist. There's always a checklist."

Stage 3: "Adapting! Still has the checklist, but now improvises."
  → Concert (T5): Plays air guitar in full armor.
  → Narration bonus: "Remember the space station incident? The knight does."

Stage 4: "The knight everyone trusts to organize the chaos."
  → Natural leader in group tasks. Comedy = still over-prepared.
```

### Barbarian — "The Enthusiastic Destroyer"
```
Stage 1: "Maximum enthusiasm, zero finesse. Treats everything like a battle."
  → School (T4): Arrives with battle axe. Tries to "defeat" math.
  → Picnic (T7): "EATING IS A COMPETITIVE SPORT"

Stage 2: "Discovering that some things don't need smashing."
  → Learning to use indoor voice (still loud).
  → Narration bonus: "The barbarian is trying SO HARD to be gentle."

Stage 3: "Gentle-ish. Can hold a teacup. Sometimes."
  → Helps with setup instead of destroying it.
  → Narration bonus: "The barbarian hasn't broken anything in 5 whole minutes!"

Stage 4: "The barbarian everyone invites because things are boring without them."
  → Controlled chaos. Strategic destruction for comedy.
```

## Persistence Architecture

### Storage
```typescript
// In Zustand store with persist middleware
interface CharacterStore {
  characters: Record<string, CharacterEvolution>;
  updateEvolution: (characterId: string, taskId: string, successLevel: SuccessLevel) => void;
  getStage: (characterId: string) => number;
  getMemories: (characterId: string) => string[];
}
```

### System Prompt Injection
When a character has evolution data, inject it into the system prompt:

```
CHARACTER CONTEXT (bonus — use if it fits naturally):
- skeleton_warrior is at Stage 2 (Finding Their Feet).
- Completed tasks: skeleton-birthday (FULL_SUCCESS), skeleton-pizza (PARTIAL_SUCCESS).
- Personality shift: More confident than before, occasionally references past events.
- Optional narration flavor: The skeleton waves — it's getting better at that!
```

**Rules for injection:**
- Only inject if character has Stage 2+
- Keep injection to 3-4 lines maximum
- Label as "bonus" — Claude should use it naturally, not force it
- Never inject information that would confuse a first-time player

## Cross-Task Relationship Evolution

Characters who appear in multiple tasks together develop relationships:

| Characters | Starting Dynamic | After 2+ Tasks Together |
|-----------|-----------------|------------------------|
| skeleton + knight | Nervous outsider + orderly leader | Unlikely friends |
| barbarian + mage | Chaos + order | Grudging respect |
| knight + ranger | Both competent, different styles | Trusted partners |
| skeleton + all adventurers | Outsider joining a group | Part of the team |

### Relationship Memory
When two characters appear in a new task after sharing a previous one:
- Optional narration reference: "The knight and skeleton high-five. They've done this before."
- Optional emote: Both characters do a shared emote (🤝 or 🎉)
