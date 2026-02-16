# The Making of Quest AI

> One developer. Seven days. 125 commits. An AI collaborator that never slept.
>
> This is the story of how a solo hackathon sprint became a 3D game with 9,500+ models, 27 animated characters, and a skeleton who drops birthday cakes when you forget to say "candles."

---

## The Frustration

Every "AI tool for kids" is the same thing: ChatGPT with a cartoon skin. Kids chat with AI. They don't learn how to *think* with it.

The hackathon prompt landed on February 10, 2026: *Build something with Claude Code and Opus 4.6.* The idea came fast — what if the AI was invisible? What if it was the game engine itself?

A kid types "the skeleton juggles three birthday cakes while riding a unicycle." Claude reads that, decides it's specific enough, and generates a scene script. A 3D skeleton spawns on a medieval village stage, grabs three cakes, and starts juggling. Confetti bursts. A narration pops up: *"The skeleton nails the triple-cake juggle — frosting everywhere!"*

But if the kid types something vague — "have a party" — the skeleton spawns alone, taunts the camera, and the narration reads: *"The skeleton starts a party... for one. It's awkward."* Pizza emojis rain from the sky. Laugh-tears float around.

The funny version is better. That's the whole trick. Kids retry not because they're told to, but because they want to see what happens with a better description.

No grades. No "wrong answers." No one says the word "learning."

---

## Day 1 — The Foundation Nobody Would Recognize

**4 commits. The entire core loop.**

Before writing a line of code, a 1,049-line design guide was compiled. Piaget's Concrete Operational Stage. Dweck's growth mindset. Vygotsky's Zone of Proximal Development. The research set three rules that would survive all seven days:

1. **The voice is a funny older sibling** — not a teacher, not a parent.
2. **Failure is always funnier than success** — FUNNY_FAIL scenes must be more entertaining than FULL_SUCCESS.
3. **Never say "wrong," "failed," "error," "prompt," or "learning"** in anything a kid reads.

The project started from an open source SaaS template — FastAPI, React, PostgreSQL. By midnight, it was unrecognizable.

The first architecture was Phaser 2D for rendering, React for UI, Zustand for state, and direct `fetch()` calls to Claude. The Anthropic SDK was skipped immediately — Node polyfills in the browser caused more problems than they solved. A 6-second timeout on every API call kept the game responsive.

Two inventions from Day 1 survived unchanged to the final build:

**The three-tier response system.** Cache hits are instant. API calls take 1-8 seconds. If both miss, a pre-written fallback fires. The game never shows an error screen. Ever. This was the most important architectural decision of the entire project — it meant the demo would always work, even when the API didn't.

**The vocabulary contract.** Claude might say "spawn a dragon," but there's no dragon model. Every system prompt includes an exhaustive list of exactly which characters, props, animations, and effects exist. Claude cannot hallucinate an asset outside the contract.

By midnight: 0 TypeScript errors, 44 modules, 53 assets, 4 playable tasks. A skeleton could spawn at center stage and wave at the camera. It wasn't much. It was everything.

---

## Day 2 — The Scariest Decision

**31 commits. The most intense day.**

The morning started with a re-read of the hackathon requirements. Colored rectangles sliding across a 2D canvas weren't going to cut it.

The game needed to be 3D. With five days left.

Throwing away all the Phaser rendering code was terrifying. But one discovery made it worth the risk: **KayKit** — a CC0 asset pack with 27 animated character models sharing a single skeleton rig, and 139 animation clips that worked across all of them. Combined with Tiny Treats for food and furniture, the library was 9,500+ GLTF models. Professional 3D characters with skeletal animations, not colored rectangles.

The village world was built in a single session. Not isolated screens — a persistent medieval village on hex tiles. A thousand tiles forming grass terrain and a stone road. KayKit buildings lining the streets. Glowing pillars with golden orbs marking quest zones. Mountains ringing the horizon. The camera flies smoothly to each zone in two seconds — no loading screens, no scene swaps. The village is always there.

Then the first real bug: KayKit hex buildings are designed for strategy games. They're 0.5 to 2.1 units tall. Characters are 2.61 units tall. The town hall looked like a dollhouse.

This led to the project's first Subject Matter Expert — a `3d-scale-tester`, an isolated AI persona that knew about 3D proportions. A measurement tool was built (`window.__measureScene()`) to inspect every model. The fix: multiply all hex buildings by 3.0x. The town hall went from 2.1 to 6.3 units — 2.7 times character height, which finally looked like a real building.

By midnight: 27 characters with skeletal animations, 139 animation clips, a persistent hex-tile village, camera fly-throughs, and a walkable player character. The game looked like a game.

---

## Day 3 — The Mad Libs Breakthrough

**37 commits. The most pivots in a single day.**

The world was getting richer — collision detection, wider roads, three rows of background trees beyond the world edge, an asset library that expanded to 7,834 models. But the gameplay had a problem.

Free-text input was too hard for 7-year-olds.

Picture a kid staring at a blank text box. What do you type? "Make the skeleton do something"? That's not a description. That's a cry for help.

The solution was **Mad Libs** — structured fill-in-the-blank sentences:

> "The skeleton _____(action) the _____(object) with _____(style)"

Each blank is a grid of options. Kids pick from choices instead of staring at nothing. Three Mad Libs levels progressively remove training wheels until Levels 4-5 let kids write open-ended descriptions. Scaffolding from structured to open-ended — exactly what the Vygotsky research predicted.

The **vignette system** was born alongside Mad Libs. Instead of calling Claude for every dropdown combination, pre-authored vignettes — small scene scripts tied to specific tag combos — fire instantly. Every possible combination maps to a crafted scene. No API call. No waiting. No errors.

---

## Day 4 — Scenes That Feel Like Theater

**9 commits. Quality over quantity.**

The scene player got an upgrade from "spawn at position" to theater-style blocking. Characters walked in from offstage. They hit predefined stage marks. Crowd scenes used multi-instance spawns. Scenes went from static tableaux to dynamic performances.

A cinematic title sequence appeared — fog rolls in, "Quest AI" fades up and disperses, fog clears, the camera dollies forward over the village. It felt like a movie opening.

And then the content push: **476 vignettes** across all 7 zones. Each one a hand-crafted mini-scene tied to specific Mad Libs tag combinations. The game was playable without a single API call.

---

## Day 5 — "We're Using 15% of What We Have"

**18 commits. The day everything got richer.**

A sobering analysis: 9,500+ 3D models on disk. Only 1,389 used initially. The audio was worse — 666 OGG files available, only 10 wired up. 1,694 props registered in the vocabulary contract, but only ~175 appeared in scenes initially.

This triggered the most ambitious operation of the project: a **13-phase vignette overhaul** run through parallel AI agents. Emotions expanded from 41 to 61. Sound effects went from 9 categories to 24. A movement template library — 40 reusable choreography patterns — was created, and every vignette was restructured into a 5-beat comic strip: Setup, Intent, Action, Consequence, Resolution.

All 7 zones were rewritten. 476 vignettes enhanced or rebuilt from scratch.

The **movement templates** were the breakthrough. Instead of writing individual actions for each scene, composable patterns like `ENTER_FROM_LEFT('knight')`, `CROWD_CHEER(['skeleton', 'mage'])`, and `OBJECT_GROW_REVEAL('cake')` let complex choreography be assembled in a few lines. The next day's quality audit would prove it: vignettes using templates scored a full letter grade higher than static ones.

**666 OGG files** from Kenney went live. The audio system used a clever trick: first play uses Web Audio API synthesis (instant, always works), while the real audio file loads asynchronously for next time. Zero perceived latency.

Level 4 (Hybrid Free Text) and Level 5 (Full Prompt) were implemented. Level 5 calls Claude Opus 4.6 live — the vocabulary contract ensuring it only references assets that actually exist as loaded models.

---

## Day 6 — Quality Day

**26 commits. The most diverse day — quality, content, infrastructure, docs.**

The morning started with a quality audit. Seven AI agents were dispatched in parallel — one per zone — to deep-read and score every vignette on story arc, choreography, emotion, sound design, prop variety, dialogue, and visual spectacle.

The correlation was undeniable: zones at 100% movement template adoption scored a full letter grade higher. Zones with old-style static actions scored lower.

Seven more parallel agents were dispatched to migrate every remaining vignette. Old `composeBlocking` calls became inline template spreads. 12 new templates were created to fill variety gaps — `WALK_TO`, `BOUNCE_ENTRANCE`, `SPELL_CAST`, `CROWD_GASP`. 630+ new template calls woven across all zone files. Total template usage across all vignettes: 1,500+.

Unique props in scenes jumped from ~200 to ~380. Dungeon-concert went from 21 to 75 unique props. 151 Unicode face emojis were replaced with semantic names that map to pixel-art frames.

The engine got auto-trigger SFX — walking animations play footstep sounds, magic spells play sparkle sounds, cooking animations play sizzle sounds. No vignette author writes SFX calls; the engine infers them.

An `ece-professor` SME — modeled after an Early Childhood Education psychologist — reviewed every piece of kid-facing text. 14 instances flagged: "deadly" became "unstoppable," "nuclear" became "SUPER MEGA KABOOM," "assassination" became "silent victory." Zero flagged terms after the review.

The 8th zone was added — Creative Playground, a sandbox that unlocks after completing 3 quests. All characters, all props, all animations. The system prompt always returns FULL_SUCCESS. No wrong answers.

Three bugs found and fixed. The worst was a React stale closure: a movement template spawns a character, then immediately moves it, but React hasn't flushed the state update yet. The move silently aborts. The character stays offscreen. Fixed with a synthetic actor fallback from a ref that updates synchronously.

Documentation blitz in the afternoon: README, Judge's Guide, Architecture Overview, How It Works, Claude Code Showcase, Submission Guide, SECURITY.md. Vercel serverless proxy to keep the API key off the client. Open source compliance audit — all non-CC0 assets replaced.

---

## Day 7 — Ship Day

**Final polish. Demo recording. Submission.**

The cinematic intro got a configurable speed runner for smooth video capture. The text gradient logo replaced an image file. Debug coordinates were removed. The zone camera angle was lowered 5 degrees for a better view of the action. A two-tier demo system was built — a showcase runner cycling 21 curated vignettes for highlight reels, and a zone runner that can play all 250 stage-1 vignettes for exhaustive testing.

The brand brief was updated to v4.0 — reflecting the final state: sky-blue village (not the dark void from Day 1), the text gradient wordmark, 9,500+ models, 666 audio files, the Mad Libs progression system, the village world architecture.

All documentation refreshed with final stats. The video was recorded.

---

## How Claude Code Built This

The most unusual part of the project wasn't the game. It was how it was built.

The `.claude/` directory grew into something no one planned: an orchestration layer with domain experts, workflow automation, persistent memory, and quality gates. By the end, it contained 7 specialized AI personas, 32 workflow skills, 70+ persistent memory files, 6 lifecycle hooks, and 3 rule files.

**Seven domain-expert SMEs** — story-writer, character-director, ece-professor, prompt-writer, child-game-design, 3d-game-development, 3d-scale-tester — each with their own system prompt and knowledge files. Creating a new quest meant orchestrating a pipeline: story-writer designs the arc, character-director casts characters, prompt-writer engineers the system prompt, ece-professor reviews everything.

**Persistent memory** bridged conversations. When the context window filled up (which happened multiple times during the 13-phase vignette overhaul), lifecycle hooks saved state before compaction and re-injected it after. The KayKit scale reference, the audio system design, the brand brief — always available without re-reading source files.

**Parallel agent dispatch** was the most powerful pattern. The vignette quality audit sent 7 agents simultaneously — one per zone — to deep-read and score every vignette. Results converged without the token cost of doing it sequentially. This pattern was used for template migration, SFX uplift, prop diversification, and action variety. Tasks that would take hours completed in minutes.

---

## What Shipped

| | |
|---|---|
| Quest zones | 8 (7 themed + 1 sandbox) |
| Animated characters | 27 with shared skeleton rig |
| Animation clips | 139 across 8 packs |
| Registered props | 1,694 with fuzzy name resolution |
| 3D models | 9,500+ GLTF assets |
| Audio files | 666 OGGs + synthesized fallbacks |
| Hand-crafted vignettes | 421 across 7 zone files |
| Movement templates | 53 reusable choreography patterns |
| Golden cache entries | 166 instant demo responses |
| Fallback scripts | 8 (every zone covered) |
| Difficulty levels | 5 per zone (3 Mad Libs + 2 free text) |
| Achievement badges | 8 unlockable |
| SFX categories | 24 with auto-trigger engine |
| Git commits | 125 |
| TypeScript errors | 0 |
| Build size | ~497 kB gzipped |
| Development time | 7 days, 1 developer |

---

## Five Decisions That Shaped Everything

**Day 1: The three-tier response system.** Cache, API, fallback. The game never breaks. Built first, never changed. Every feature after this could be developed without worrying about reliability.

**Day 2: The 3D pivot.** Throwing away all 2D code with five days left. KayKit's shared skeleton rig made it worth it — 27 characters with 139 animations from one asset pack.

**Day 3: The Mad Libs pivot.** Free-text input was too hard for 7-year-olds. Structured fill-in-the-blank with pre-authored vignettes made the game fast, reliable, and playable without any API calls.

**Day 5: The template revolution.** 40+ reusable movement templates turned vignette authoring from hours to minutes. The quality audit proved it — templates scored a full letter grade higher.

**Day 6: Parallel quality audit.** Seven simultaneous agents scored every vignette, revealing exactly where quality lagged and what to fix. The final push to 100% template adoption followed.

---

## The Philosophy

The game's success metric, written on Day 1 and never changed:

> **One perfect interaction that makes someone smile.**

A kid types something creative. Claude interprets it. A 3D scene comes alive. The kid laughs.

Everything else is in service of that moment.

---

<p align="center">
  Built solo by Drew for the <strong>Built with Opus 4.6 — Claude Code Hackathon</strong> (Feb 10-16, 2026)
</p>
