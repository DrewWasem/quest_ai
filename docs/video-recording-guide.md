# Video Recording Guide — Quest AI Demo

> **Target:** 3:00-3:15 video for hackathon submission
> **Format:** Daughter plays the game (picture-in-picture webcam), Drew narrates via voiceover
> **Result:** Upload to YouTube (unlisted) or Loom, paste link in submission form

---

## Part 1: Setup (15 min)

### Software

1. **Download OBS Studio** — [obsproject.com](https://obsproject.com) (free, macOS)
2. **Grant macOS permissions** — System Settings > Privacy & Security:
   - Screen Recording > enable OBS
   - Camera > enable OBS
   - Microphone > enable OBS
3. **Restart OBS** after granting permissions

### OBS Configuration

**Sources panel (bottom-left, add in this order):**

| # | Type | Name | Settings |
|---|------|------|----------|
| 1 | Display Capture | `Game Screen` | Select your main display |
| 2 | Video Capture Device | `Webcam` | Select FaceTime HD camera (or external) |

**Position the webcam overlay:**
- Drag the webcam source to the **bottom-right corner**
- Resize to about **20-25% of screen** (small enough to not cover the game, big enough to see her reactions)
- Right-click webcam > Transform > Edit Transform > round to clean numbers if needed

**Audio settings (OBS > Settings > Audio):**
- **Desktop Audio:** Default (captures game sounds from speakers)
- **Mic/Auxiliary Audio:** Select the Razer Hello Kitty headset mic
- **Tip:** Game audio should play through **Mac speakers** (not the headset), so OBS picks it up via Desktop Audio. She wears the headset for the mic only, or skip the headset entirely and use speakers + Mac built-in mic.

**Output settings (OBS > Settings > Output):**
- Recording Format: **mp4**
- Recording Quality: **High Quality, Medium File Size**
- Recording Path: Desktop or Downloads (somewhere easy to find)

### Browser Setup

1. Open Chrome (clean — no bookmarks bar, no extensions visible)
2. Navigate to **http://localhost:5174/** (or https://quest-ai-smoky.vercel.app/)
3. Resize browser to fill the screen (Cmd+Ctrl+F for full screen, or manually ~1280x800)
4. Refresh the page to clean state
5. Verify audio works — click a zone marker, confirm you hear music/SFX through speakers

### Prompt Clipboard

Open a Notes/TextEdit window (off-screen or on a second display) with these three prompts ready to copy-paste:

```
skeleton eats pizza
```

```
skeleton gets the best birthday ever
```

```
adventurers have picnic with blanket basket food and nature
```

All three are pre-cached — they respond **instantly** (no API wait).

---

## Part 2: Practice Run (10 min)

Do one practice run **without recording** so your daughter knows the flow:

1. Show her the village — "See the glowing pillars? Those are quests. Click one."
2. She clicks a zone marker — camera flies in
3. Show her the input box — "Type what you want to happen"
4. She types something (or you paste a prompt for her)
5. Scene plays — let her react
6. Show her the feedback — "See what it says? Try again with that hint"

**What to tell her:**
- "We're making a video of you playing this game Dad built"
- "You're planning a birthday party for a skeleton — type what should happen"
- "There are no wrong answers — if it's funny, that's the best part"

**Do NOT tell her:**
- What to say or how to react
- That she needs to be loud or enthusiastic
- Specific prompts to type (let her try her own first, paste the cached ones if needed)

---

## Part 3: Recording (15-20 min, 2 takes max)

### Pre-Flight Checklist

- [ ] OBS open with Display Capture + Webcam sources visible
- [ ] Audio levels checked — speak into mic, verify the meter moves in OBS
- [ ] Browser full-screen on the game, refreshed to clean village state
- [ ] Prompts ready in Notes/TextEdit (off-screen)
- [ ] Daughter seated, headset mic on (or just using speakers + built-in mic)
- [ ] All notifications silenced (Focus mode / Do Not Disturb)
- [ ] Phone on silent
- [ ] OBS > Start Recording

### The Recording — Scene by Scene

**Print this section or keep it on a second screen. Drew reads from this; daughter just plays.**

---

#### SCENE 1 — THE HOOK (0:00 - 0:10)

**[Game is on the village overview screen. Daughter is visible in PiP.]**

**DREW (voiceover):**
> "What happens when a kid describes a scene to an AI?"

**ACTION:** Daughter clicks the skeleton-birthday zone marker. Camera flies in.

---

#### SCENE 2 — THE SETUP (0:10 - 0:30)

**[Camera has landed in the skeleton-birthday zone. Input box is visible.]**

**DREW (voiceover):**
> "This is my daughter playing Quest AI — a game I built with Claude Opus 4.6. She types a description and the AI builds a 3D animated scene with characters, props, animations, and sound. But here's the twist — vague descriptions don't get error messages. They get something way better."

**ACTION:** While Drew talks, daughter looks at the zone. She can explore or wait for the cue to type.

---

#### SCENE 3 — THE FUNNY FAIL (0:30 - 1:30)

**[This is the most important scene. Her reaction is the pitch.]**

**DREW (voiceover, brief):**
> "She needs to plan a birthday party for a skeleton. Let's see what she tries."

**ACTION:** Daughter types her own idea OR Drew pastes `skeleton eats pizza` for her.

**[Scene plays — skeleton spawns, taunts, pizza appears, laugh-tears float around. ~15 seconds of scene playback.]**

**[CAPTURE HER REACTION. Do not talk over it. Let the moment breathe for 3-5 seconds.]**

**DREW (voiceover, after scene finishes):**
> "No wrong answer. No red X. The skeleton got pizza instead of cake — and the game tells her why."

**[Point out or let her read the feedback panel.]**

**DREW:**
> "She wants to try again — not because she's told to, but because the failure was hilarious."

---

#### SCENE 4 — THE SUCCESS (1:30 - 2:15)

**DREW (voiceover, brief):**
> "Now watch what happens with a better description."

**ACTION:** Daughter types her own improved version OR Drew pastes `skeleton gets the best birthday ever`.

**[Scene plays — table, cake, presents, skeleton cheering, confetti, hearts. ~15 seconds of scene playback.]**

**[CAPTURE HER REACTION AGAIN.]**

**DREW (voiceover):**
> "Cake, presents, decorations — all generated by Opus 4.6 from one sentence. The AI produces a JSON scene script referencing only the 1,686 3D models in our vocabulary contract. It literally cannot hallucinate a prop that doesn't exist."

---

#### SCENE 5 — SHOW VARIETY (2:15 - 2:40)

**ACTION:** Daughter clicks "Back to Village" (or Drew navigates). She picks a different zone — adventurers-picnic.

**DREW (voiceover):**
> "Eight quest zones, each with their own characters and props."

**ACTION:** Paste `adventurers have picnic with blanket basket food and nature` or let her type.

**[Picnic scene plays.]**

**DREW:**
> "Different zone, different characters, same engine."

---

#### SCENE 6 — THE CLOSE (2:40 - 3:15)

**ACTION:** Navigate back to village overview. Daughter can keep clicking around — her background exploration is fine.

**DREW (voiceover):**
> "Twenty-seven animated characters. Over four thousand 3D models. 166 pre-cached responses. 665 audio files. All open source."

> "I built this solo in seven days — entirely with Claude Code and Opus 4.6."

> "The Claude Code setup includes seven domain-expert AI personas, a conductor workflow, and a persistent memory system that survived across 30 development sessions."

**[Pause 2 seconds.]**

> "This is Quest AI."

**[Hold on village for 3 seconds. Stop recording.]**

---

### After the Take

1. **Stop recording in OBS** (bottom-right > Stop Recording)
2. **Watch it back.** If her reaction to the funny fail landed, you're done. If not, do ONE more take.
3. **Don't do more than 2 takes** — the first genuine reaction is almost always the best.

---

## Part 4: Editing (optional, 10 min)

**If the take is clean (no major stumbles), skip editing entirely.** One continuous take is more authentic.

**If you need to trim:**

1. Open the .mp4 in **QuickTime Player**
2. Edit > Trim (Cmd+T)
3. Drag the yellow handles to cut dead air from the start/end
4. File > Export As > 1080p
5. Done

**Optional overlays (only if you have time):**

- Title card at the start (first 3 seconds): `PROMPT QUEST — Built with Claude Code + Opus 4.6`
- End card (last 3 seconds): `github.com/DrewWasem/kids_ai_game`
- You can add these in iMovie (free, pre-installed) in about 5 minutes

---

## Part 5: Upload & Submit (10 min)

### Option A: YouTube (recommended)

1. Go to [studio.youtube.com](https://studio.youtube.com)
2. Click **Create > Upload video**
3. Title: `Quest AI — AI Game for Kids (Claude Code Hackathon Demo)`
4. Visibility: **Unlisted** (only people with the link can see it)
5. Wait for processing (usually 2-5 minutes for a 3-min video)
6. Copy the link

### Option B: Loom

1. Go to [loom.com](https://loom.com) — create free account if needed
2. Upload the .mp4 file
3. Copy the share link

### Submit

1. Paste the video link into the hackathon submission form
2. Paste the project description from `docs/project-description.md`
3. Paste the GitHub repo link: `https://github.com/DrewWasem/kids_ai_game`
4. Submit

---

## Full Transcript (copy-paste reference)

This is every word Drew says in the video, in order. Print this or keep it on a second screen.

```
What happens when a kid describes a scene to an AI?

This is my daughter playing Quest AI — a game I built with Claude
Opus 4.6. She types a description and the AI builds a 3D animated scene
with characters, props, animations, and sound. But here's the twist —
vague descriptions don't get error messages. They get something way better.

She needs to plan a birthday party for a skeleton. Let's see what she tries.

[PAUSE — let the scene play and capture her reaction]

No wrong answer. No red X. The skeleton got pizza instead of cake — and
the game tells her why. She wants to try again — not because she's told
to, but because the failure was hilarious.

Now watch what happens with a better description.

[PAUSE — let the scene play and capture her reaction]

Cake, presents, decorations — all generated by Opus 4.6 from one sentence.
The AI produces a JSON scene script referencing only the 1,686 3D models
in our vocabulary contract. It literally cannot hallucinate a prop that
doesn't exist.

Eight quest zones, each with their own characters and props.

Different zone, different characters, same engine.

Twenty-seven animated characters. Over four thousand 3D models. 166
pre-cached responses. 665 audio files. All open source.

I built this solo in seven days — entirely with Claude Code and Opus 4.6.

The Claude Code setup includes seven domain-expert AI personas, a conductor
workflow, and a persistent memory system that survived across 30 development
sessions.

This is Quest AI.
```

**Total voiceover: ~220 words. At natural speaking pace, that's about 1:45 of Drew talking. The remaining ~1:30 is scene playback and daughter's reactions. Total: ~3:15.**

---

## If Something Goes Wrong

| Problem | Fix |
|---------|-----|
| Scene doesn't play | All 3 demo prompts are pre-cached — they always work. Refresh and retry. |
| No game audio | Check Mac sound output is set to speakers (not headset). Turn up volume. |
| OBS not capturing screen | Re-grant Screen Recording permission in System Settings, restart OBS. |
| Webcam not showing | Check Camera permission. Try unplugging/replugging external webcam. |
| She gets bored/distracted | Switch to Mad Libs mode (Stages 1-3) — fill-in-the-blank is faster and more structured. |
| She types something not cached | That's fine! Tier 2 (live API) will generate a response in 1-8 seconds. Or just paste a cached prompt. |
| OBS recording is huge | 3 min at 1080p should be ~200-500 MB. YouTube handles files up to 256 GB. |
| Video stutters on playback | Lower OBS output to 720p. Still looks great for a demo. |

---

## Time Budget

| Step | Time |
|------|------|
| OBS setup + permissions | 15 min |
| Browser + audio check | 5 min |
| Practice run with daughter | 10 min |
| Recording (2 takes max) | 15-20 min |
| Watch back + trim | 10 min |
| Upload + submit | 10 min |
| **Total** | **~65-70 min** |
