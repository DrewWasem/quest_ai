# How Prompt Quest Works: A Technical Deep Dive

> Built solo in 7 days with Claude Code + Opus 4.6 for the Claude Code Hackathon (Feb 10-16, 2026)

## The Core Idea

Prompt Quest teaches kids (ages 7-11) descriptive thinking through play. A child types a description like *"the skeleton juggles three birthday cakes while riding a unicycle"* and Claude Opus 4.6 generates a 3D animated scene that plays out in the browser. The twist: vague descriptions produce hilarious failures, making kids *want* to try again with more detail.

No chatbot. No text walls. Just a medieval village, 28 animated characters, and thousands of props waiting to be described into existence.

## The Vocabulary Contract: How We Prevent AI Hallucination

The biggest technical challenge in connecting an LLM to a 3D renderer: Claude might reference assets that don't exist. "Spawn a dragon" sounds great, but if there's no dragon model, the scene breaks.

**Solution: The Vocabulary Contract.** Every system prompt sent to Claude includes an exhaustive list of *exactly* which assets are available:

```
AVAILABLE CHARACTERS (use exact names):
skeleton_warrior, skeleton_mage, knight, mage, clown, robot

AVAILABLE PROPS (use exact names):
cake, present_A_red, table_long, chair, balloon, torch, barrel...

AVAILABLE ANIMATIONS (use exact names):
Idle_A, Cheering, Waving, Death_A, Skeletons_Taunt...

RULE: ONLY use assets from the lists above — NEVER invent asset names
```

This is dynamically generated per quest zone from `worlds.ts` — each zone has its own curated set of characters, props, and animations. Claude physically cannot reference an asset outside the contract.

**The result:** 2,186 registered props, 28 characters, 139 animation clips — all addressable by name, all guaranteed to exist as loaded GLTF models.

## The Three-Tier Response System: Zero-Error Demos

Live API calls to Claude take 1-8 seconds and can fail. For a kids' game — and especially for a hackathon demo — that's unacceptable. The three-tier system ensures the game *always* responds:

```
Kid types description
        │
        ▼
┌─────────────────┐
│  Tier 1: Cache  │◄── 166 pre-computed "golden" responses
│  (instant)      │    Exact + fuzzy string matching
└────────┬────────┘
         │ miss
         ▼
┌─────────────────┐
│  Tier 2: API    │◄── Live call to Claude Opus 4.6
│  (1-8 seconds)  │    6-second timeout, result cached
└────────┬────────┘
         │ timeout/error
         ▼
┌─────────────────┐
│  Tier 3: Fallback│◄── Pre-written generic scene scripts
│  (instant)       │    13 fallbacks covering all 7 tasks
└──────────────────┘
```

**Tier 1 — Cache:** 166 hand-tuned responses stored in `demo-cache.json`. During the demo, every prompt the presenter types hits the cache instantly. Fuzzy matching handles minor variations ("skeleton birthday" matches "skeleton's birthday").

**Tier 2 — Live API:** For novel inputs, Claude generates a fresh scene script. The response is validated (JSON parse, schema check, asset name verification) and cached for future use.

**Tier 3 — Fallback:** If the API times out or returns invalid JSON, a pre-written generic script plays. The game *never* shows an error screen. Ever.

## Scene Script Format: Claude's Output Language

Claude doesn't generate 3D code. It generates a simple JSON "scene script" — a sequence of actions that the client-side engine executes:

```json
{
  "success_level": "FULL_SUCCESS",
  "narration": "The skeleton opens a present and a cake launches into space!",
  "actions": [
    { "type": "spawn", "target": "skeleton_warrior", "position": "cs-center" },
    { "type": "spawn", "target": "cake", "position": "cs-right" },
    { "type": "animate", "target": "skeleton_warrior", "anim": "Cheering" },
    { "type": "move", "target": "cake", "to": "us-center", "style": "arc" },
    { "type": "react", "effect": "confetti-burst", "position": "cs-center" },
    { "type": "emote", "target": "skeleton_warrior", "emoji": "happy" }
  ],
  "prompt_feedback": "You nailed the birthday theme! Try adding WHO is invited."
}
```

**Six action types:**
- `spawn` — Place a character or prop on stage
- `move` — Animate movement with style (linear, arc, bounce)
- `animate` — Play a skeletal animation (Cheering, Death_A, etc.)
- `emote` — Show a pixel-art emote bubble above a character
- `react` — Trigger a particle effect (confetti, explosions, hearts)
- `sfx` — Play a sound effect

The `ScenePlayer3D` component (~4,500 lines) executes these actions sequentially with proper timing, tween animations, and spatial audio.

## Comedy-First Pedagogy: Why Failure is Funnier Than Success

Most educational software punishes mistakes. Prompt Quest makes them hilarious.

When a kid types something vague like "have a party," the skeleton doesn't just stand there — it **taunts the camera**, pizza emojis rain from the sky, and laugh-tears float around. The narration reads: *"The skeleton starts a party... for one. It's awkward."*

This isn't accidental. The system prompt explicitly instructs Claude:

- `FUNNY_FAIL` responses must be *more entertaining* than `FULL_SUCCESS`
- Failures use physical comedy (characters fall, props explode, things go wrong)
- Feedback is concrete and game-specific ("Skeletons love pizza, but birthdays need cake!")
- No words like "wrong," "failed," or "error" — ever

**The educational trick:** Kids retry not because they're told to, but because they want to see what happens with a better description. They're learning descriptive precision without ever hearing the word "learning."

## The Village World: Persistent 3D Environment

The game world is a persistent medieval village built with hex tiles, not a series of disconnected screens:

- **~1,000 hex tiles** form the terrain (grass + stone road)
- **Village center** with scaled KayKit buildings (town hall, church, tavern)
- **Two quest zones** at Z=-16 (dungeon) and Z=+16 (park)
- **Glowing zone markers** — clickable pillars with golden orbs
- **Mountain perimeter** at 22-36 units out for backdrop
- **Smooth camera transitions** — 2-second ease-out cubic fly-through when entering a zone

The village is always rendered. Entering a zone doesn't load a new scene — the camera flies to that part of the world while the UI switches to quest mode.

## The Asset Pipeline: 4,270+ Models, Zero Runtime Generation

Every 3D asset is pre-loaded. Nothing is generated at runtime.

| Source | Models | License |
|--------|--------|---------|
| KayKit (characters, buildings, dungeon) | 500+ | CC0 |
| Kenney All-in-1 (props, furniture, nature) | 1,636 | CC0 |
| Tiny Treats (food, park items) | 96 | CC0 |
| Quaternius (animals, vehicles) | 150 | CC0 |
| Poly Pizza (misc props) | 95 | CC-BY |
| Food Mega Pack | 91 | CC0 |
| Kenney Emotes | 30 | CC0 |

**Character system:** 28 character GLBs share a common skeleton (`Rig_Medium`), enabling 139 animation clips to work across all characters via `SkeletonUtils.clone()`.

**Prop resolution:** The `PROP_PATHS` registry maps 2,186 semantic names to GLTF file paths. Fuzzy matching strips suffixes and tries hyphenated variants, so Claude can say "birthday_cake" or "birthday-cake" and both resolve.

**Audio:** 665 OGG files from Kenney with synthesized fallbacks. First play uses Web Audio API synthesis (instant), while the real audio file loads asynchronously for subsequent plays.

## Built With Claude Code

This entire project — every line of code, every system prompt, every cached response — was built using Claude Code with Opus 4.6. The `.claude/` directory contains:

- **7 domain-expert SMEs** (story-writer, character-director, ece-professor, prompt-writer, child-game-design, 3d-game-development, 3d-scale-tester)
- **15+ custom slash commands** (/conductor, /compose-task, /build-cache, /test-prompt, /review-content, /pre-demo, etc.)
- **7 custom agents** (codebase-researcher, implementer, reviewer, plan-architect, memory-writer, memory-locator, codebase-analyzer)
- **60+ persistent memory files** organized in a hierarchical tree
- **Custom hooks** for context management and session persistence

The SME system is particularly notable: when creating a new quest task, the `/compose-task` command orchestrates a 7-stage pipeline — story-writer designs the arc, character-director casts characters, prompt-writer engineers the system prompt, and ece-professor reviews everything for age-appropriateness. Each SME runs in isolated context with domain-specific expertise.

## Stats

| Metric | Value |
|--------|-------|
| Quest tasks | 7 |
| Animated characters | 28 |
| Animation clips | 139 |
| Registered props | 2,186 |
| 3D models total | 4,270+ |
| Audio files | 665 |
| Golden cache entries | 166 |
| Fallback scripts | 13 |
| TypeScript errors | 0 |
| Build size | 2,128 kB JS (493 kB gzipped) |
| Development time | 7 days (solo) |
| Lines of ScenePlayer3D | ~4,500 |
