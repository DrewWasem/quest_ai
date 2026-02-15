<p align="center">
  <img src="docs/screenshots/hero.png" alt="Prompt Quest — A kid types a description and a 3D scene comes alive" width="720" />
</p>

<h1 align="center">Prompt Quest</h1>

<p align="center">
  <strong>AI-powered 3D game that teaches kids descriptive thinking through play.</strong><br/>
  Built solo in 7 days for the <a href="https://cerebralvalley.ai/e/claude-code-hackathon">Built with Opus 4.6 — Claude Code Hackathon</a> (Feb 10-16, 2026).
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Three.js-r170-000000?logo=threedotjs" alt="Three.js" />
  <img src="https://img.shields.io/badge/Claude-Opus_4.6-7C3AED?logo=anthropic" alt="Claude Opus 4.6" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</p>

---

## What is this?

Kids ages 7-11 type a description like *"the skeleton juggles birthday cakes while riding a unicycle"* and Claude Opus 4.6 builds a 3D animated scene in real time — characters spawn, props appear, animations play, and a funny narration reads aloud. Vague descriptions produce hilarious failures (the skeleton drops everything and slips on frosting), making kids *want* to try again with better descriptions. No grades, no "wrong answers" — just comedy and concrete hints.

<!-- ## See it in action -->

<!-- Replace with your actual video link after recording -->
<!-- [![Demo Video](docs/screenshots/video-thumbnail.png)](https://your-video-link-here) -->

<!--
<p align="center">
  <img src="docs/screenshots/village.png" alt="Medieval village world" width="380" />
  <img src="docs/screenshots/quest.png" alt="Quest zone gameplay" width="380" />
</p>
<p align="center">
  <img src="docs/screenshots/funny-fail.png" alt="Funny fail — comedy moment" width="380" />
  <img src="docs/screenshots/success.png" alt="Full success — celebration" width="380" />
</p>
-->

## How it works

```
Kid types a description
        |
        v
+-------------------+     +------------------+     +------------------+
|  1. Cache Lookup   |---->|  2. Claude API   |---->|  3. Fallback     |
|  166 pre-computed  |     |  Opus 4.6 live   |     |  Never shows an  |
|  instant responses |     |  6s timeout      |     |  error screen    |
+-------------------+     +------------------+     +------------------+
        |                         |                         |
        +-------------+-----------+-------------------------+
                      |
                      v
            JSON Scene Script
        { spawn, move, animate, emote, react }
                      |
                      v
         React Three Fiber renders
         3D scene with audio + effects
```

1. A kid types a description ("a giant cake falls from the sky")
2. The three-tier system finds the best response — cache, live API, or fallback
3. Claude Opus 4.6 generates a JSON scene script with characters, props, animations, and narration
4. React Three Fiber renders it as a 3D animated scene with real audio and particle effects
5. The kid gets funny, concrete feedback and tries again

## Tech stack

| Layer | Technology |
|-------|-----------|
| UI | React 18 + TypeScript + Tailwind CSS |
| 3D Engine | React Three Fiber + Drei + Three.js r170 |
| State | Zustand |
| AI | Claude Opus 4.6 (scene script generation) |
| Audio | Web Audio API + 665 OGG files (Kenney) |
| Build | Vite 5 |
| Deployment | Vercel |

## Claude integration

Every player description flows through a **vocabulary-contract system** that constrains Claude's output to valid assets:

- **Scene scripts** — Claude generates JSON with `spawn`, `move`, `animate`, `emote`, and `react` actions, each referencing only assets from the 1,686-entry prop registry and 27 character models
- **Comedy calibration** — The system prompt instructs Claude to make failures funnier than successes. A vague description about a birthday party produces a skeleton slipping on frosting, not a generic error
- **Three-tier response** — (1) Instant cache lookup against 166 pre-computed golden responses, (2) live Opus 4.6 API call with vocabulary enforcement, (3) pre-written fallback scripts so the demo never shows an error
- **Five difficulty levels** — Mad Libs fill-in-the-blank (levels 1-3) progresses to free-text description (levels 4-5), scaffolding kids from structured to open-ended thinking
- **Loading vignettes** — While the AI thinks, characters act out "thinking" animations on stage so the 3D world stays alive during API calls
- **Serverless proxy** — API key stays server-side via Vercel serverless function; the game works without any key using the built-in cache

## Run locally

```bash
git clone https://github.com/DrewWasem/kids_ai_game.git
cd kids_ai_game/frontend
npm install
npm run dev
```

Open [http://localhost:5175](http://localhost:5175). The game works immediately using the built-in cache of 166 pre-computed responses — no API key needed for the demo.

To enable live AI generation for any description:

```bash
cp ../.env.example .env
# Add your VITE_ANTHROPIC_API_KEY to .env
```

## By the numbers

| Metric | Count |
|--------|-------|
| Quest zones | 8 (7 themed + 1 sandbox) on a medieval village circle |
| Hand-crafted vignettes | 421 across 7 zone files |
| Movement templates | 53 reusable choreography patterns |
| Golden cache entries | 166 instant demo responses |
| 3D models | 4,270+ GLTF assets |
| Animated characters | 27 with shared skeleton rig |
| Animation clips | 139 (idle, walk, run, attack, dance, cheer...) |
| Registered props | 1,686 with fuzzy name resolution |
| Audio files | 665 OGGs + synthesized fallbacks |
| Named emotions | 61 semantic mappings to pixel-art emotes |
| TypeScript errors | 0 |

## Architecture

```
+-------------------------------------------------------------+
|                    React App (Zustand)                        |
+------------------+------------------+-----------------------+
|   Village World  |  Scene Player 3D |   Prompt Input        |
|   Hex terrain    |  Action executor |   Mad Libs + Free     |
|   Zone markers   |  1000+ lines     |   Voice input         |
|   Camera fly     |  Zone-relative   |   TTS narration       |
+------------------+------------------+-----------------------+
|              React Three Fiber Canvas                        |
|  Characters (27) | Props (1,686) | Atmosphere | Audio       |
+-------------------------------------------------------------+
|           Three-Tier Response System                         |
|  Cache (166) --> Claude Opus 4.6 --> Fallback (8)           |
+-------------------------------------------------------------+
```

**Village World** — A persistent medieval hex-tile village with buildings, roads, mountains, and glowing quest markers. The camera smoothly flies between village overview and quest zones.

**Scene Player 3D** — Executes scene scripts action-by-action: spawning characters with skeletal animations, placing props with bounce entrances, triggering movement along arc/linear paths, playing emotes as pixel-art emoji bubbles, and firing particle effects with sound.

**Eight Quest Zones** — Each quest has its own atmosphere (fog, lighting, particles, music), environment props, and cast of characters:

| # | Quest | What the kid does |
|---|-------|----|
| 1 | Skeleton's Surprise Birthday | Plan a party in the dungeon |
| 2 | Knight's Space Mission | Launch a knight into orbit |
| 3 | Mage vs. Kitchen | Cook a meal with magic |
| 4 | Barbarian's School | Teach a barbarian to sit still |
| 5 | Dungeon Rock Concert | Stage a concert underground |
| 6 | Skeleton Pizza Delivery | Deliver pizza across the village |
| 7 | Adventurers' Picnic | Set up an outdoor feast |
| 8 | Creative Playground | Sandbox — all characters, all props, no wrong answers (unlocks after 3 zones) |

## 3D asset credits

All 3D assets are open-source and free for commercial use:

| Pack | Models | License | Author |
|------|--------|---------|--------|
| [Kenney](https://kenney.nl) | 1,636 GLBs + 665 OGGs | CC0 | Kenney |
| [KayKit](https://kaylousberg.itch.io/) | Characters, animations, buildings | CC0 | Kay Lousberg |
| [Tiny Treats](https://tinytreats.itch.io/) | 96 props (kitchen, park, furniture) | CC0 | Tiny Treats |
| [Quaternius](https://quaternius.com/) | 150 props | CC0 | Quaternius |
| [FoodMegaPack](https://binbun3d.itch.io/food-mega-pack) | 91 food models | CC0 | Binbun |
| [Poly Pizza](https://poly.pizza/) | 95 assorted props | CC-BY | Various artists |

## Built with Claude Code

This entire project — every line of code, every system prompt, every cache entry — was built using [Claude Code](https://claude.ai/code) and Claude Opus 4.6 over 7 days. The `.claude/` directory contains the orchestration setup:

- **7 domain-expert SMEs** — story-writer, character-director, ece-professor, prompt-writer, child-game-design, 3d-game-development, 3d-scale-tester
- **32 workflow skills** — conductor orchestration, research, planning, implementation, validation, content review, memory management
- **Persistent memory tree** — cross-session knowledge storage for decisions, patterns, bugs, and preferences
- **Custom hooks** — automatic TypeScript checking, context management, pre-commit validation

## License

[MIT](LICENSE)

---

<p align="center">
  Built solo by Drew for the <strong>Built with Opus 4.6 — Claude Code Hackathon</strong> (Feb 10-16, 2026)
</p>
