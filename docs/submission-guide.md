# Submission Guide (Internal — For Drew)

> Last updated: Feb 15, 2026
> Deadline: **Feb 16, 3:00 PM ET** — no extensions

---

## Status Dashboard

### Submission Deliverables

| # | Deliverable | Status | Priority |
|---|------------|--------|----------|
| 1 | **Demo Video** (2-4 min) | NOT DONE | CRITICAL — judges watch this FIRST |
| 2 | **GitHub Repo** (public) | DONE | Verified public, builds clean |
| 3 | **Project Description** (200-400 words) | DONE | `docs/project-description.md` |

### Supporting Materials

| Item | Status | Notes |
|------|--------|-------|
| README.md | DONE | Badges, tech stack, architecture, credits, live demo link |
| Screenshots | NOT DONE | `docs/screenshots/` is empty — README references hero.png |
| Live demo | DONE | https://quest-ai-smoky.vercel.app/ |
| LICENSE | DONE | MIT |
| CLAUDE.md | DONE | Updated with current stats |
| Judges guide | DONE | `docs/judges-guide.md` |
| How it works | DONE | `docs/how-it-works.md` |
| Architecture | DONE | `docs/architecture-overview.md` |
| Claude Code showcase | DONE | `docs/claude-code-showcase.md` |
| Open source compliance | DONE | All CC0/CC-BY, non-open assets removed |
| Security & privacy | DONE | `SECURITY.md` at repo root |
| Build passes | DONE | 0 TS errors, 679 modules |

---

## Action Plan (Priority Order)

### 1. Screenshots (20 min)

Open `https://quest-ai-smoky.vercel.app/` or `localhost:5175` and capture:

| Screenshot | What to capture | Save as |
|-----------|----------------|---------|
| **Hero** | Village overview with buildings, road, zone markers visible | `docs/screenshots/hero.png` |
| **Village** | Close-up of village center — buildings, hex terrain, mountains | `docs/screenshots/village.png` |
| **Quest** | Inside a zone with a scene playing (characters + props visible) | `docs/screenshots/quest.png` |
| **Funny Fail** | A FUNNY_FAIL scene (skeleton taunting, pizza emojis) | `docs/screenshots/funny-fail.png` |
| **Success** | A FULL_SUCCESS scene (celebration, confetti, cheering) | `docs/screenshots/success.png` |
| **Mad Libs** | The Mad Libs input UI (Stage 1-3 fill-in-the-blank) | `docs/screenshots/madlibs.png` |

After capturing, uncomment the screenshot sections in README.md (lines 32-41) and update paths.

**Tools:** macOS: Cmd+Shift+4 (area select). Resize browser to 1280x800 first.

### 2. Record Demo Video (1-2 hours)

See **Video Script** below. This is the most important deliverable.

**Recording setup:**
- **Tool:** QuickTime (File > New Screen Recording) or OBS Studio or Loom
- **Resolution:** 1920x1080 or 1280x720
- **Audio:** Built-in mic for voiceover + game audio (make sure both are captured)
- **Browser:** Chrome, 1280x800 window, clean (no bookmarks bar, no extensions visible)
- **URL:** Use the live demo (https://quest-ai-smoky.vercel.app/) or localhost:5175

**Tips for speed:**
- Do 2-3 takes max — don't chase perfection
- One continuous take is more authentic than edited cuts
- The game's own music and SFX provide ambiance — don't add background music
- All demo prompts are pre-cached: they respond INSTANTLY (no API wait)
- If something glitches, just keep talking — judges respect real software

### 3. Submit (30 min buffer)

1. Push final screenshots + any README updates
2. Verify repo is public: `gh repo view --json isPrivate`
3. Upload video to YouTube (unlisted) or Loom
4. Copy project description from `docs/project-description.md`
5. Fill out submission form with video link + repo link + description
6. Submit by **2:00 PM ET** (1 hour buffer)

---

## Video Script (3:00-3:30)

### Approach: Daughter Plays, Drew Narrates

**Why this works:** Judges see dozens of screen-recorded demos. A real kid in the target age range (7-11) genuinely reacting to the game is unforgettable. Her laughter at a funny fail proves the product better than any slide deck.

**Format:** Screen recording + audio (her voice/reactions + Drew's voiceover). Screen-only is fine — no face on camera needed.

**Key principle:** Don't script her reactions. Let her genuinely respond. The funny fails are designed to land with kids — trust the product. If she laughs, that's your demo.

### Pre-Recording Checklist

- [ ] Browser open to game (deployed URL or localhost)
- [ ] Browser resized to ~1280x800, centered
- [ ] All other windows/notifications closed
- [ ] These prompts ready (she can type them OR you pre-paste with Cmd+V):
  - `skeleton eats pizza` (FUNNY_FAIL)
  - `skeleton gets the best birthday ever` (FULL_SUCCESS)
  - `adventurers have picnic with blanket basket food and nature` (FULL_SUCCESS)
- [ ] **Alt: Use Mad Libs mode** (Stages 1-3) — she fills in blanks, no typing pressure
- [ ] Game refreshed to clean state
- [ ] Audio working (SFX + music should play when entering a zone)
- [ ] Screen recording started with mic capturing both voices
- [ ] Do a 30-second practice run so she knows the basic flow (click pillar → type → watch)

### SCENE 1: THE HOOK (0:00 - 0:10)

**Start with a scene already playing (pre-record or live).**

> **Drew (voiceover):** "What happens when a kid describes a scene to an AI?"

*[Cut to or hold on: daughter watching the scene play out, her audio reaction]*

**Why:** Opens with the real thing. No intro, no setup. A kid + the game = instant hook.

### SCENE 2: THE SETUP (0:10 - 0:30)

> **Drew (voiceover):** "This is my daughter playing Prompt Quest — a game I built with Claude Opus 4.6. She types a description and the AI builds a 3D animated scene. But here's the twist — vague descriptions don't get error messages. They get something way better."

*[She navigates to the village, clicks a glowing quest marker, camera flies in]*

### SCENE 3: THE FUNNY FAIL (0:30 - 1:30)

**She's in skeleton-birthday zone. She types or you paste `skeleton eats pizza`.**

> **Drew (voiceover, brief):** "She needs to plan a birthday party for a skeleton. Let's see what she tries."

*[Let her type or dictate. Don't rush.]*

*[Scene plays — skeleton spawns, taunts, pizza appears, laugh-tears float around]*

**KEY MOMENT: Capture her genuine reaction.** The skeleton eating pizza at its own birthday party is designed to be funny. If she laughs — that's your entire pitch.

> **Drew (voiceover, after scene):** "No wrong answer. No red X. The skeleton got pizza instead of cake — and the game tells her why. She wants to try again because the failure was hilarious."

*[Point to feedback panel briefly]*

### SCENE 4: THE SUCCESS (1:30 - 2:15)

**She types or you paste `skeleton gets the best birthday ever`.**

> **Drew (voiceover, brief):** "Now watch what happens with a better description."

*[Scene plays — table, cake, presents, skeleton cheering, confetti, hearts]*

*[Capture her reaction to the celebration]*

> **Drew (voiceover):** "Cake, presents, decorations — all generated by Opus 4.6 from one sentence. The AI produces a JSON scene script referencing only the 1,686 3D models in our vocabulary contract. It literally cannot hallucinate a prop that doesn't exist."

### SCENE 5: SHOW VARIETY (2:15 - 2:40)

**She picks another quest (adventurers-picnic). Types or you paste the picnic prompt.**

> **Drew (voiceover):** "Eight quest zones, each with their own characters and props."

*[Picnic scene plays — adventurers, blanket, trees, basket]*

> **Drew:** "Different zone, different characters, same engine."

### SCENE 6: THE CLOSE (2:40 - 3:15)

**Pull camera back to village overview. Daughter can keep exploring if she wants — her background audio is fine.**

> **Drew (voiceover):** "Twenty-seven animated characters. Over four thousand 3D models. 166 pre-cached responses. 665 audio files. All open source."
>
> "I built this solo in seven days — entirely with Claude Code and Opus 4.6."
>
> "The Claude Code setup includes seven domain-expert AI personas, a conductor workflow, and a persistent memory system that survived across 30 development sessions."
>
> *[Beat]*
>
> "This is Prompt Quest."

**Hold on village overview for 2-3 seconds. End.**

### Post-Production (optional, skip if short on time)

- Title overlay on the opening scene: `PROMPT QUEST — Built with Claude Code + Opus 4.6`
- End card (last 3s): `github.com/DrewWasem/kids_ai_game | Built solo by Drew`
- No background music needed — game provides its own
- One continuous take > fancy editing

### Tips for Recording With Your Daughter

1. **Don't over-direct.** Tell her "you're planning a party for a skeleton — type what you think should happen." Her natural language IS the demo.
2. **Mad Libs mode is your safety net.** If typing is slow or stressful, switch to Mad Libs (Stages 1-3) — she fills in blanks like "The skeleton _____ the _____." This IS a feature, not a workaround.
3. **Let her pick the quest.** If she gravitates to a different zone than skeleton-birthday, go with it. All zones have cached responses.
4. **Two takes max.** The first take with genuine reactions is almost always the best one. Don't chase perfection.
5. **Her commentary > your script.** If she says something funny or insightful about the game, keep it in. Authentic kid reactions beat polished voiceover every time.
6. **Privacy:** Screen + audio only (no face) is completely fine and keeps the focus on the game.

### If Something Breaks

- All demo prompts are pre-cached (166 entries) — they respond instantly
- Audio has synthesized fallbacks — sound always works
- SafeModel error boundary skips broken models — scene continues
- Three-tier system guarantees **the demo never shows an error screen**

---

## Recording The Video Fast With Claude

You can use Claude Code to help with video prep:

1. **Practice run:** Play through the script once without recording. Note any timing issues.
2. **Prompt prep:** Copy the 3 demo prompts to a text file. During recording, just Cmd+V to paste.
3. **If you stumble:** Keep going. Judges prefer authentic over polished. One take is fine.
4. **Quick edit (if needed):** Use QuickTime to trim start/end — don't spend time on transitions.
5. **Upload:** YouTube (unlisted) gives you a shareable link instantly. Loom also works.

**Total recording time estimate:** 30-45 min (including 2-3 practice runs + 1-2 real takes)

---

## What Judges See (In This Order)

```
1. VIDEO (autoplay) ─── 30 seconds to hook them
       │
2. GITHUB REPO ──────── README.md renders first
       │                 └── They may click docs/judges-guide.md
       │
3. DESCRIPTION ──────── Short text on submission platform
```

**Key insight from organizers:** "Functional prototypes take precedence over extensive documentation."

Judges care about:
1. Does it work? (video proves this)
2. Is it creative? (the app concept + Claude Code setup)
3. Is it technically interesting? (vocabulary contract, three-tier system, SME pipeline)
4. Does it use Opus 4.6 well? (scene generation, comedy calibration)

Judges do NOT care about:
- Extensive API docs
- Test coverage reports
- Deployment guides
- Changelogs

---

## Prize Track Strategy

| Prize | Amount | Your Angle |
|-------|--------|-----------|
| **1st Place** | $50,000 | Full-featured 3D game, solo in 7 days, Opus 4.6 at the core |
| **Most Creative Opus 4.6 Exploration** | $5,000 | The `.claude/` orchestration system — 7 SMEs, conductor workflow, persistent memory, 32 skills. No one else built an AI development platform on top of Claude Code. |
| **Keep Thinking** | $5,000 | If extended thinking was used — check if any prompts use extended thinking mode |

**Strongest angle:** The `.claude/` directory IS the story. You didn't just build a game with Claude — you built a development platform that made it possible for one person to ship what would normally take a team.

---

## Final Checklist (Day Of)

- [ ] Screenshots captured and added to README
- [ ] Video recorded and uploaded
- [ ] Final `git push`
- [ ] Verify repo is public
- [ ] Verify build passes (`cd frontend && npm run build`)
- [ ] Verify live demo works (https://quest-ai-smoky.vercel.app/)
- [ ] Copy project description from `docs/project-description.md`
- [ ] Submit form: video link + repo link + description
- [ ] Submit by 2:00 PM ET (1 hour buffer before 3:00 PM deadline)
