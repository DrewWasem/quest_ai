# Hackathon Submission Checklist

**Event:** Built with Opus 4.6 — Claude Code Hackathon
**Deadline:** Monday, February 16, 2026, 3:00 PM ET (NO extensions)
**Judging:** Tue Feb 17 (async, top 6 selected) → Wed Feb 18 (live panel)

Sources: [Kickoff Page](https://hackathon-kickoff.vercel.app/) | [Cerebral Valley](https://cerebralvalley.ai/e/claude-code-hackathon) | [Algo-Mania](https://algo-mania.com/en/blog/hackathons-coding/built-with-opus-4-6-the-claude-code-hackathon/)

---

## Required Deliverables (3 items)

### 1. Video Submission (MOST IMPORTANT)

Judges review your **video first**. The organizers explicitly said: "Dedicate real time to making this."

- [ ] **Record a demo video** showing Prompt Quest in action
- [ ] Show the full player journey: title screen → village → enter zone → type description → watch scene play out
- [ ] Show at least 2 different outcomes (FULL_SUCCESS + FUNNY_FAIL) to demonstrate AI-driven variety
- [ ] Explain what it is and why it matters (kids learning descriptive thinking through play)
- [ ] Show the 3D village world, camera transitions, animations, audio
- [ ] Highlight Claude integration: how Opus 4.6 generates scene scripts from kid descriptions
- [ ] Keep it concise — aim for 2-4 minutes
- [ ] Show it working live (not just slides)

### 2. GitHub Repository (OPEN SOURCE)

- [ ] **Repository must be public** — all code visible
- [x] Clean README with project overview, screenshots, how to run
- [x] No secrets committed (.env excluded via .gitignore)
- [x] All code must be from the hackathon period (Feb 10-16)
- [x] Build must pass with 0 errors

### 3. Project Description

- [x] Written overview submitted via the platform (`docs/project-description.md`)
- [x] Clear problem statement: what does this solve?
- [x] How Claude Opus 4.6 is used (scene script generation, vocabulary contract, three-tier response system)
- [x] Target audience (kids 7-11)
- [x] What makes it technically interesting

---

## Rules to Verify

- [x] All projects must start fresh during hackathon (Feb 10-16) ✓ (started Feb 10)
- [x] Max 2 team members ✓ (solo)
- [x] Must be open source ✓
- [x] Built with Claude Code ✓
- [x] No code/data/assets used without rights — all CC0/CC-BY (see README credits)
- [x] Uses Opus 4.6 ✓

---

## Judging Criteria

**Six judges from Anthropic's Claude Code team:**
Boris Cherny, Cat Wu, Thariq Shihpar, Lydia Hallie, Ado Kukic, Jason Bigman

**What they evaluate (in priority order):**
1. **Video** — does it show something compelling?
2. **GitHub repo** — code quality, does it work?
3. **Project description** — clear purpose?

**What scores highest:**
- Technical creativity and concrete applications
- Original use of Claude's capabilities (especially the 1M token context window)
- Clear, functional objectives
- Functional prototypes > extensive documentation
- Innovation in solving real problems

**Prize tracks to target:**
| Prize | Amount | Fit |
|-------|--------|-----|
| 1st Place | $50,000 | Main target |
| Most Creative Opus 4.6 Exploration | $5,000 | Strong fit — 7 SMEs, 32 skills, conductor workflow |
| Keep Thinking Prize | $5,000 | If extended thinking is highlighted |

---

## Recommended Documents to Create

### Must-Have (before submission)

#### A. README.md (rewrite for judges) -- DONE
- [x] Hero screenshot or GIF of the game in action (placeholder, needs screenshot)
- [x] One-line pitch: "AI-powered 3D game that teaches kids descriptive thinking through play"
- [x] How it works (3-4 sentences + diagram)
- [x] How to run locally (`git clone` → `npm install` → `npm run dev`)
- [x] Tech stack badges
- [x] Claude integration section (how Opus 4.6 is used)
- [x] Architecture overview (village world, scene scripts, three-tier cache)
- [ ] Screenshots: title screen, village, zone gameplay, funny fail, success (Drew to capture)
- [x] License (MIT)
- [x] "Built for the Claude Code Hackathon" badge/note

#### B. Demo Video (2-4 min)
- [ ] Screen recording with voiceover
- [ ] Script the walkthrough (don't wing it)
- [ ] Show: title → character select → village exploration → enter quest → type description → AI generates scene → 3D animation plays → feedback
- [ ] Show a FUNNY_FAIL (comedy is the hook — skeleton drops birthday cake, etc.)
- [ ] Show a FULL_SUCCESS (satisfying moment)
- [ ] Briefly explain: "Opus 4.6 reads the kid's description, generates a scene script with characters, props, animations, and a funny narration"
- [ ] End with: "7 quests, 166 cached responses, 2,186 props, 28 animated characters, all running in the browser"
- [ ] Tools: OBS Studio, QuickTime, or Loom

#### C. Project Description (for submission form) -- DONE (`docs/project-description.md`)
- [x] 200-400 words
- [x] Problem: Kids learn prompt engineering / descriptive thinking but existing tools are boring text-in-text-out
- [x] Solution: 3D game world where descriptions come alive
- [x] How Claude is used: vocabulary contract, comedy calibration, three-tier response
- [x] Technical highlights: R3F, 4,270+ models, 139 animations, OGG audio, village world, Mad Libs
- [x] What makes it special: failure is funnier than success (comedy-first design)

### Nice-to-Have (if time permits)

#### D. Architecture Diagram
- [ ] Visual showing: User Input → Cache/API/Fallback → Scene Script → ScenePlayer3D → 3D World
- [ ] Include: village world, zone system, character system, audio system
- [ ] Can be a simple SVG or draw.io export

#### E. Asset License Audit -- DONE
- [x] Verify all 3D asset packs are CC0/MIT/open source compatible
- [x] KayKit: CC0
- [x] Kenney: CC0
- [x] Tiny Treats: CC0
- [x] Quaternius: CC0
- [x] FoodMegaPack: CC0
- [x] Poly Pizza: CC-BY (attribution in README credits)
- [x] Documented in README "3D asset credits" section

#### F. Technical Writeup (optional, for "Most Creative" prize)
- [ ] How we built the SME system (7 domain experts as subagents)
- [ ] How the Conductor workflow orchestrates complex tasks
- [ ] How the memory tree persists knowledge across sessions
- [ ] How the vocabulary contract prevents asset hallucination
- [ ] How the three-tier cache system ensures zero-error demos

---

## Timeline (Feb 15-16)

### Saturday Feb 15 (Today)
- [ ] Final code polish and bug fixes
- [x] Verify build passes: `cd frontend && npm run build` (678 modules, 0 errors)
- [ ] Test full demo flow end-to-end
- [ ] Take screenshots for README (Drew)
- [x] Write README.md (rewritten for judges)
- [x] Draft project description (`docs/project-description.md`)
- [x] Asset license audit (all CC0 except Poly Pizza CC-BY)

### Sunday Feb 16 (Submission Day)
- [ ] **Morning:** Record demo video (allow 2-3 takes)
- [ ] **Morning:** Finalize README with screenshots
- [ ] **Midday:** Verify repo is public, clean, builds
- [ ] **1:00 PM ET:** Final review of video + description
- [ ] **2:00 PM ET:** Submit on platform (1 hour buffer)
- [ ] **3:00 PM ET:** DEADLINE (no extensions)

---

## What Judges See (optimize for this)

```
1. Video (autoplay?) — 30 seconds to hook them
2. GitHub repo — README renders first, then they may browse code
3. Project description — short text on submission platform
```

**First impression matters:** The video thumbnail and first 10 seconds of the video determine if judges watch the whole thing. Open with the most impressive visual — a 3D scene animating from a kid's description.

**README is your landing page:** Judges clicking the GitHub link see the README. Lead with a screenshot/GIF, not a wall of text.

**Code quality signals:** Clean TypeScript (0 errors), organized file structure, meaningful commit messages (you have these), no commented-out code.
