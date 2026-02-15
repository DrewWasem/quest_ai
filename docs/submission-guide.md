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

### Pre-Recording Checklist

- [ ] Browser open to game (deployed URL or localhost)
- [ ] Browser resized to ~1280x800, centered
- [ ] All other windows/notifications closed
- [ ] These prompts copied and ready to paste (Cmd+V):
  - `skeleton eats pizza` (FUNNY_FAIL)
  - `skeleton gets the best birthday ever` (FULL_SUCCESS)
  - `adventurers have picnic with blanket basket food and nature` (FULL_SUCCESS)
- [ ] Game refreshed to clean state
- [ ] Audio working (SFX + music should play when entering a zone)
- [ ] Screen recording started with mic audio

### SCENE 1: THE HOOK (0:00 - 0:15)

**Start already inside skeleton-birthday zone with a scene playing.**

> "What happens when a kid types 'skeleton gets the best birthday ever' into an AI game?"
>
> *[Scene plays — cake, presents, skeleton cheering, confetti]*
>
> "This. Opus 4.6 reads their description and builds a 3D animated scene — characters, props, animations, sound — all in real time."

**Why:** Opens with the most impressive visual. No intro, no "hi I'm Drew." Hook in 5 seconds.

### SCENE 2: THE PROBLEM (0:15 - 0:30)

> "Most AI tools for kids are text-in, text-out. But kids ages 7 to 11 don't learn from reading walls of text. They learn by doing — by seeing their ideas come alive."
>
> "So I built Prompt Quest."

### SCENE 3: THE VILLAGE (0:30 - 1:15)

**Navigate the village. Show the world.**

> "You enter a medieval village — hex terrain, buildings, mountains in the background. It's a persistent 3D world built with React Three Fiber."

**Walk toward a glowing zone marker.**

> "These glowing pillars are quests. There are eight zones scattered around the village — seven themed quests plus a sandbox that unlocks after you complete three."

**Click the marker. Camera flies into the zone.**

> "The camera flies you in. Now here's where the AI comes in."

### SCENE 4: THE FUNNY FAIL (1:15 - 2:00)

**Inside skeleton-birthday zone. Paste `skeleton eats pizza`.**

> "A kid needs to plan a birthday party for a skeleton. Let's see what happens with a vague description."

*[Scene plays — skeleton spawns, taunts, pizza emoji, laugh-tears]*

> "Ha — the skeleton gets pizza, but it's a birthday party, not a pizza party. Watch the feedback..."

**Point to the feedback panel.**

> "It says 'Skeletons love pizza, but birthdays need cake!' No grade, no wrong answer. Just a funny moment and a hint. The kid wants to try again because the failure was hilarious."

> "That's the core insight — failure is funnier than success. Kids retry because they want to see what happens next, not because they're told to."

### SCENE 5: THE SUCCESS (2:00 - 2:30)

**Paste `skeleton gets the best birthday ever`.**

> "Now with a better description..."

*[Scene plays — table, cake, presents, banner, skeleton cheering, hearts]*

> "Full party — cake, presents, decorations, and the skeleton is celebrating. The narration, the props, the animations — all generated by Opus 4.6 from one sentence."

> "Under the hood, Claude generates a JSON scene script. Every asset name is constrained to a vocabulary contract — 1,686 registered 3D models. The AI literally cannot hallucinate a prop that doesn't exist."

### SCENE 6: SHOW VARIETY (2:30 - 2:50)

**Exit zone. Navigate to adventurers-picnic. Paste the picnic prompt.**

> "Seven different quests, each with their own characters, props, and atmosphere."

*[Picnic scene plays]*

> "Different zone, different characters, same engine. Five adventurers on a blanket under a tree with a picnic basket."

### SCENE 7: THE CLOSE (2:50 - 3:15)

**Pull camera back to village overview.**

> "Eight quest zones. Twenty-seven animated characters sharing a skeleton rig with 139 animation clips. Over four thousand 3D models. 166 pre-cached responses for instant demos. 665 audio files. All open source, all CC0."
>
> "I built this solo in seven days — entirely with Claude Code and Opus 4.6."
>
> "The Claude Code setup behind this includes seven domain-expert AI personas, a conductor workflow that orchestrates research, planning, and implementation, and a persistent memory system with 60 files that survived across 30 development sessions."
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
