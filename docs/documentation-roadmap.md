# Documentation Roadmap

**Purpose:** Plan all documents needed for the Claude Code Hackathon submission.
**Deadline:** Monday, Feb 16, 2026, 3:00 PM ET — NO EXTENSIONS

---

## Submission Requirements (from hackathon rules)

Judges evaluate **three things** in this order:

```
 #1 VIDEO  ──────────►  #2 GITHUB REPO  ──────────►  #3 DESCRIPTION
 (most important)        (README first)               (submission form)
```

---

## Document Inventory

### Status Key
- `DONE` — exists and ready
- `NEEDS REWRITE` — exists but not submission-quality
- `TODO` — doesn't exist yet
- `OPTIONAL` — nice-to-have if time permits

---

### Phase 1: Critical Path (must ship)

| # | Document | Status | Owner | Est. Time | Deadline |
|---|----------|--------|-------|-----------|----------|
| 1 | **Demo Video** (2-4 min) | TODO | Drew | 2-3 hrs | Sun AM |
| 2 | **README.md** (root-level, for judges) | TODO | Claude + Drew | 30 min | Sat PM |
| 3 | **Project Description** (submission form text) | TODO | Claude + Drew | 15 min | Sun midday |
| 4 | **LICENSE** (MIT) | TODO | Claude | 2 min | Sat PM |

#### 1. Demo Video
**Format:** Screen recording with voiceover, 2-4 minutes
**Tool:** QuickTime (Mac) or OBS Studio
**This is the #1 thing judges watch.** The organizers said: "Dedicate real time to making this."

**Full video script below** — see [Appendix A: Demo Video Script](#appendix-a-demo-video-script).

**Recording Tips:**
- Use 1920x1080 resolution, browser at ~1280x800 (centered, no chrome clutter)
- Close all notifications, other windows, bookmarks bar
- Record audio separately if needed (better quality mic)
- Do 2-3 full takes, pick the best — don't try to Frankenstein takes together
- Keep mouse movements smooth and deliberate
- Rehearse the walkthrough 2 times before recording
- Have all demo prompts ready to paste (don't type live, it's slow and error-prone)

#### 2. README.md (root-level)
**Audience:** Hackathon judges scanning GitHub repos. They see the README first.

**Structure:**
```markdown
# Prompt Quest

> AI-powered 3D game that teaches kids descriptive thinking through play.
> Built solo in 7 days for the Claude Code Hackathon.

[Hero screenshot or GIF]

## What is this?

[3 sentences: problem, solution, what makes it special]

## See it in action

[Embedded video or link to video]
[3-4 screenshots: village, quest, funny fail, success]

## How it works

[Architecture diagram or text description]
1. Kid types a description ("a giant cake falls from the sky")
2. Opus 4.6 generates a scene script (characters, props, animations)
3. React Three Fiber renders it as a 3D animated scene
4. Kid gets funny, concrete feedback and tries again

## Tech Stack

[Badges: React, TypeScript, Three.js, Claude API, Vite, Vercel]

## Claude Integration

[How Opus 4.6 is used: scene script generation, vocabulary contract,
 three-tier cache, comedy calibration]

## Run Locally

git clone ... && cd frontend && npm install && npm run dev

## Stats

- 7 quest tasks, 2 explorable zones
- 166 golden cache entries (instant demo responses)
- 4,270+ 3D models, 28 animated characters, 139 animation clips
- 665 audio files, real-time SFX + background music
- 2,186 registered props with fuzzy name resolution
- 0 TypeScript errors, production build passes

## Architecture

[Brief: Village World → Zone System → ScenePlayer3D → Three-Tier Response]

## License

MIT
```

#### 3. Project Description (submission form)
**Length:** 200-400 words
**Audience:** Judges reading alongside your video

```
Draft:

Prompt Quest is an AI-powered 3D game that teaches kids (ages 7-11)
descriptive thinking through play. Instead of typing into a chatbot,
kids describe scenes and watch them come alive in a medieval village
world with 28 animated characters and thousands of 3D props.

[Problem] Existing AI tools for kids are text-in, text-out — boring
and abstract. Kids learn by doing, not by reading feedback about their
"prompts."

[Solution] In Prompt Quest, a kid might type "the skeleton tries to
juggle three birthday cakes while riding a unicycle" and Claude Opus
4.6 generates a scene script — spawning characters, placing props,
triggering animations, and writing a funny narration. The 3D scene
plays out in the browser with real audio and particle effects.

[How Claude is used] Every player description goes through a three-tier
response system: (1) instant cache lookup against 166 pre-computed
golden responses, (2) live Opus 4.6 API call with a vocabulary-contract
system prompt that constrains output to valid assets, (3) pre-written
fallback scripts so the demo never shows an error. Claude generates
JSON scene scripts with spawn, move, animate, emote, and react actions.

[Comedy-first pedagogy] Failure is always funnier than success. When a
kid's description is vague, the skeleton drops all three cakes and
slips on frosting. This makes kids WANT to try again with more specific
descriptions — teaching descriptive precision without ever saying the
word "learning."

[Technical scope] Built solo in 7 days: React Three Fiber for 3D
rendering, 4,270+ GLTF models (KayKit, Kenney CC0 assets), 139
skeletal animation clips, real OGG audio with synthesized fallbacks,
Zustand state management, persistent hex-tile village world with
camera-fly zone transitions, and a Mad Libs progression system
(5 difficulty levels per quest).

Built entirely with Claude Code and Opus 4.6.
```

#### 4. LICENSE
Standard MIT license file at project root.

---

### Phase 2: Repo Polish (should ship)

| # | Document | Status | Owner | Est. Time |
|---|----------|--------|-------|-----------|
| 5 | **Screenshots** (4-6 PNGs for README) | TODO | Drew | 20 min |
| 6 | **CLAUDE.md** (updated) | DONE | Claude | already done |
| 7 | **.env.example** | NEEDS CHECK | Claude | 5 min |
| 8 | **Asset license verification** | TODO | Claude | 15 min |

#### 5. Screenshots
Capture with Puppeteer or browser dev tools at 1920x1080:
- [ ] Title screen with character selection
- [ ] Village overview (hex terrain, buildings, zone markers)
- [ ] Inside skeleton-birthday zone (dungeon, characters)
- [ ] FUNNY_FAIL scene playing (comedy moment)
- [ ] FULL_SUCCESS scene playing (celebration)
- [ ] Mad Libs input interface

Save to `docs/screenshots/` and reference in README.

#### 8. Asset License Verification
| Pack | Expected License | Verified? |
|------|-----------------|-----------|
| KayKit (all packs) | CC0 | [ ] |
| Kenney All-in-1 | CC0 | [ ] |
| Tiny Treats | CC0 | [ ] |
| Poly Pizza | CC-BY 4.0 | [ ] |
| FoodMegaPack | Check | [ ] |
| JoyQuest Emojis | Check | [ ] |

If any pack requires attribution, add to README credits section.

---

### Phase 3: Bonus Points (if time permits)

| # | Document | Status | Owner | Est. Time | Prize Track |
|---|----------|--------|-------|-----------|-------------|
| 9 | **Architecture Diagram** (SVG) | OPTIONAL | Claude | 20 min | Visual for README |
| 10 | **Technical Deep Dive** (blog-style) | OPTIONAL | Claude | 45 min | "Most Creative" $5K |
| 11 | **Claude Code Setup Showcase** | OPTIONAL | Claude | 30 min | "Most Creative" $5K |

#### 10. Technical Deep Dive
A `docs/how-it-works.md` or blog post covering:
- The SME system (7 domain experts as isolated subagents)
- Conductor workflow (Research → Plan → Implement → Validate)
- Memory tree (51 files persisting across sessions)
- Vocabulary contract (preventing 3D asset hallucination)
- Three-tier cache (zero-error demo guarantee)
- Comedy calibration in system prompts

This targets the **"Most Creative Opus 4.6 Exploration"** $5,000 prize.

#### 11. Claude Code Setup Showcase
Highlight the `.claude/` configuration as a feature:
- 7 SMEs, 32 skills, 15 commands
- Custom hooks (context guardian, typecheck, session management)
- Memory tree with dedup, auto-recall, session summaries
- Modular rules with path-scoped frontmatter
- Custom subagents (explore-assets)

This is unusual for a hackathon project and shows deep Claude Code expertise.

---

## Execution Timeline

### Saturday Feb 15 (Prep Day)

| Time | Task | Document |
|------|------|----------|
| Now | Verify build passes, fix any bugs | — |
| +30 min | Take 6 screenshots via Puppeteer | #5 Screenshots |
| +1 hr | Write README.md with screenshots | #2 README |
| +1.5 hr | Create LICENSE file | #4 LICENSE |
| +1.5 hr | Verify asset licenses | #8 License Audit |
| +2 hr | Draft project description | #3 Description |
| +2.5 hr | Write video script | #1 Video prep |
| +3 hr | (Optional) Architecture diagram | #9 Diagram |
| +3.5 hr | (Optional) Technical deep dive | #10 Writeup |
| Evening | Practice video walkthrough 1-2 times | #1 Video rehearsal |

### Sunday Feb 16 (Submission Day)

| Time (ET) | Task | Document |
|-----------|------|----------|
| 9:00 AM | Record demo video (2-3 takes) | #1 Video |
| 10:30 AM | Edit video (trim, add title cards if needed) | #1 Video |
| 11:30 AM | Finalize README, commit screenshots | #2 README |
| 12:00 PM | Final build verify, push to GitHub | — |
| 12:30 PM | Make repo public if not already | — |
| 1:00 PM | Write final project description | #3 Description |
| 1:30 PM | Upload video, fill submission form | All |
| 2:00 PM | **SUBMIT** (1 hour buffer before deadline) | All |
| 3:00 PM | **DEADLINE** | — |

---

## What NOT to Waste Time On

- Extensive API documentation (judges don't care)
- Backend docs (game runs client-side)
- Test coverage reports (functional prototype > docs)
- Changelog or version history
- Deployment guides (just need "npm run dev")
- Over-polishing code comments (judges watch the video first)

**Remember:** "Functional prototypes take precedence over extensive documentation." — hackathon rules

---

## Appendix A: Demo Video Script

**Total runtime target:** 3:00-3:30
**Format:** Screen recording (1920x1080) with live voiceover
**Tone:** Enthusiastic but not breathless. Like showing a friend something cool you built.

### Pre-Recording Setup

1. Open browser to `http://localhost:5175` (or deployed Vercel URL)
2. Resize browser to ~1280x800, centered on screen
3. Close all other windows, notifications, bookmarks bar
4. Have these prompts ready to paste (Cmd+V, don't type live):
   - `skeleton eats pizza` (FUNNY_FAIL)
   - `skeleton gets the best birthday ever` (FULL_SUCCESS)
   - `adventurers have picnic with blanket basket food and nature` (FULL_SUCCESS, different zone)
5. Clear any previous game state (refresh the page)
6. Test audio is working (SFX + music should play)

---

### SCENE 1: THE HOOK (0:00 - 0:20)

**Screen:** Start already inside the skeleton-birthday zone with a scene playing — the FULL_SUCCESS birthday scene. Characters celebrating, confetti, music.

**Voiceover:**
> "What happens when a kid types 'skeleton gets the best birthday ever' into an AI game?"
>
> *[Scene finishes playing — cake, presents, cheering skeleton]*
>
> "This. Claude Opus 4.6 reads their description and builds a 3D animated scene — characters, props, animations, sound — all in real time."

**Why this works:** Opens with the most visually impressive moment. No preamble, no title cards, no "hi my name is." Judges are hooked in 5 seconds.

---

### SCENE 2: THE PROBLEM (0:20 - 0:40)

**Screen:** Quick cut to a text-only chatbot interface (could show a generic ChatGPT-style screenshot, or just describe it).

**Voiceover:**
> "Most AI tools for kids look like this — type something, read a wall of text back. But kids ages 7 to 11 don't learn from text. They learn from *doing* — from seeing their ideas come alive and trying again when something funny happens."
>
> "So I built Prompt Quest."

**Screen:** Cut to the Prompt Quest title screen — character selection visible.

---

### SCENE 3: THE JOURNEY (0:40 - 1:30)

**Screen:** Live walkthrough, no cuts. Show the real player experience.

**Action sequence:**

1. **Title screen** — click a character (knight or skeleton)

**Voiceover:**
> "You pick your character..."

2. **Cinematic intro** — camera flies into the village, music plays

> "...and fly into a medieval village."

3. **Village exploration** — WASD to walk around briefly, show hex terrain, buildings, mountains

> "This is a persistent 3D world built with React Three Fiber. Hex terrain, KayKit medieval buildings, background music. There are quest zones scattered around the village."

4. **Walk toward a glowing zone marker** — the purple pillar with golden orb

> "These glowing markers are quests. Let's try the Skeleton Birthday Party."

5. **Click the marker** — camera transitions smoothly into the zone

> "The camera flies you into the zone. Now this is where it gets interesting."

---

### SCENE 4: THE FUNNY FAIL (1:30 - 2:10)

**Screen:** Inside skeleton-birthday zone. Input panel visible at bottom.

**Voiceover:**
> "A kid needs to plan a birthday party for a skeleton. Let's see what happens when they're... not very specific."

**Action:** Paste `skeleton eats pizza` into the input. Hit enter.

> *[Wait for scene to play — skeleton spawns, taunts, pizza emoji appears, laugh-tears effect]*

> "Ha! The skeleton gets pizza... but it's a *birthday* party, not a pizza party. The AI knows the difference. Watch the feedback —"

**Screen:** Point to the feedback panel.

> "It says: 'Skeletons love pizza, but birthdays need cake! Try again with party foods.' No grade, no 'wrong answer.' Just a funny moment and a concrete hint. The kid *wants* to try again because the failure was hilarious."

---

### SCENE 5: THE SUCCESS (2:10 - 2:50)

**Voiceover:**
> "Okay, let's try a better description."

**Action:** Paste `skeleton gets the best birthday ever` into the input. Hit enter.

> *[Wait for scene — table, cake, presents, banner spawn. Skeleton cheers. Hearts float.]*

> "Now we get the full party — cake, presents, decorations, and the skeleton is cheering. The narration, the props, the animations — all generated by Opus 4.6 from a single sentence."

**Screen:** Let the celebration play out for a moment. Then:

> "Under the hood, Claude generates a JSON scene script with spawn, move, animate, and react actions. Every prop name is constrained to our vocabulary contract — 2,186 registered 3D models. The AI literally cannot hallucinate an asset that doesn't exist."

---

### SCENE 6: SHOW VARIETY (2:50 - 3:10)

**Action:** Exit the zone (click Leave Quest). Walk to the other zone marker. Enter adventurers-picnic.

**Voiceover:**
> "And it's not just one quest. There are 7 different tasks across the village."

**Action:** Paste `adventurers have picnic with blanket basket food and nature` — let the outdoor picnic scene play.

> "Different zone, different characters, different vibe. Five adventurers sitting on a blanket under a tree with a picnic basket. Same engine, completely different scene."

---

### SCENE 7: THE NUMBERS + CLOSE (3:10 - 3:30)

**Screen:** Exit zone, show village overview (pull camera back to wide shot).

**Voiceover:**
> "Seven quests. Twenty-eight animated characters. Over four thousand 3D models. A hundred and sixty-six pre-cached responses for instant demos. A hundred and thirty-nine animation clips. Real audio — sound effects and background music per zone."
>
> "I built this solo in seven days — entirely with Claude Code and Opus 4.6."
>
> *[Beat]*
>
> "This is Prompt Quest."

**Screen:** Hold on the village overview for 2-3 seconds. End.

---

### POST-PRODUCTION (optional)

- **Title card at the very start** (over the hook scene, not before it):
  `PROMPT QUEST — Built with Claude Code + Opus 4.6`
- **End card** (last 3 seconds):
  `github.com/DrewWasem/kids_ai_game`
  `Built solo by Drew — Feb 10-16, 2026`
- **No background music in the recording** — the game's own music is enough
- **No fancy editing** — one continuous take is more authentic and impressive

---

### Backup Plan (if something breaks during recording)

- If the live API call takes too long: all demo prompts are pre-cached (166 entries), so they respond instantly
- If audio doesn't work: the game has synthesized fallbacks, it will still make sound
- If a model fails to load: SafeModel error boundary skips it, scene continues
- If the scene looks wrong: use a different cached prompt — there are 166 to choose from
- **The three-tier system guarantees the demo never shows an error screen**

---

### Key Prompts to Have Ready (copy-paste)

| Prompt | Expected Result | Zone |
|--------|----------------|------|
| `skeleton eats pizza` | FUNNY_FAIL — skeleton taunts, pizza appears, laugh-tears | skeleton-birthday |
| `skeleton gets the best birthday ever` | FULL_SUCCESS — table, cake, presents, cheering, hearts | skeleton-birthday |
| `adventurers have picnic with blanket basket food and nature` | FULL_SUCCESS — blanket, basket, tree, sitting animation | adventurers-picnic |
| `skeleton delivers pizza to knight and ranger with plates` | FULL_SUCCESS — movement action, pepperoni pizza, confetti | skeleton-pizza (backup) |
| `skeleton band plays music with adventurers and dungeon decorations` | FULL_SUCCESS — dual animations, torches, confetti | dungeon-concert (backup) |

All of these are pre-cached and will respond **instantly** (no API wait time).
