# Prompt Quest — Demo Script

**Duration:** 3-4 minutes
**Arc:** Show the learning progression (vague → specific → detailed) across 2 tasks

---

## Opening (15 sec)

1. App loads with branded loading screen ("Prompt Quest" title, sparkle stars)
2. Task selector grid appears — 7 colorful task cards
3. **Talking point:** "Prompt Quest teaches kids ages 7-11 how to write better instructions — using play, not lectures."

---

## Demo Beat 1: Skeleton's Birthday Party (skeleton-birthday)

### Step 1: Vague prompt → FUNNY_FAIL
**Click:** "Skeleton's Surprise Birthday" card
**Type:** `skeleton dances in the dungeon`
**Expected:** FUNNY_FAIL — skeleton spawns, dances alone, question marks appear
**Talking point:** "A kid types a vague prompt — and gets a funny result. The skeleton dances alone with no cake, no guests, no decorations!"
**Key UI:** Orange "Oops!" badge, missing elements chips, encouraging feedback

### Step 2: Better prompt → PARTIAL_SUCCESS
**Type:** `skeleton wants cake and presents`
**Expected:** PARTIAL_SUCCESS — table, cake, present appear but still incomplete
**Talking point:** "They try again with more detail. Better! But Claude notices they forgot to invite guests and add decorations."
**Key UI:** Yellow "Almost!" badge, "Try adding:" chips

### Step 3: Detailed prompt → FULL_SUCCESS
**Type:** `skeleton throws a birthday party with cake presents and decorations`
**Expected:** FULL_SUCCESS — full party scene with characters, cake, presents, banners, confetti
**Talking point:** "Now they nail it! Specific food, decorations, AND guests. That's prompt engineering in action — and the kid learned it by playing, not studying."
**Key UI:** Green "Amazing!" badge, celebration sound, confetti burst

---

## Demo Beat 2: Skeleton Pizza Delivery (skeleton-pizza)

### Step 1: Funny fail
**Click:** "All Tasks" → "Skeleton Pizza Delivery" card
**Type:** `skeleton throws pizza at people`
**Expected:** FUNNY_FAIL — skeleton spawns, pizza flies, chaos, laugh-tears effect
**Talking point:** "Different task, same principle. A funny fail teaches them to think about what they actually want."

### Step 2: Success
**Type:** `skeleton delivers pizza to knight and ranger with plates`
**Expected:** FULL_SUCCESS — skeleton walks to knight/ranger, delivers pizza on plates, hearts-float
**Talking point:** "WHO gets the pizza, HOW it's delivered, and WHAT tools are needed. Three elements = success."

---

## Architecture Highlight (30 sec)

**Talking points while showing the result:**
1. "Powered by Claude Opus 4.6 — generates scene scripts in real-time"
2. "Three-tier system: instant cache for demos, live API for new prompts, fallback so it never breaks"
3. "3D characters from KayKit with 139 skeletal animations — all controlled by the AI"
4. "The kid never sees an error screen. Failed prompts become comedy gold."

---

## Closing

**Click:** "All Tasks" to show grid
**Talking point:** "7 tasks, 4,270 3D models, 139 animations, built solo in 7 days. Prompt Quest turns every kid into a prompt engineer — one laugh at a time."

---

## Backup Prompts (if demo needs improvisation)

| Task | Prompt | Expected |
|------|--------|----------|
| dungeon-concert | `throw a rock concert in the dungeon with band and decorations` | FULL_SUCCESS |
| adventurers-picnic | `adventurers have picnic with blanket basket food and nature` | FULL_SUCCESS |
| mage-kitchen | `mage cooks with magic spells food and kitchen tools` | FULL_SUCCESS |
| knight-space | `knight goes on space mission with spaceship equipment and space ranger` | FULL_SUCCESS |

---

## Pre-Demo Checklist

- [ ] `.env` has valid `VITE_ANTHROPIC_API_KEY`
- [ ] `npm run build` succeeds
- [ ] Cache populated (166 entries in demo-cache.json)
- [ ] Sound unmuted (check mute button)
- [ ] Browser: Chrome (for voice input + TTS + WebGL2)
- [ ] Screen: full-screen browser, zoom 100%
- [ ] Disable notifications
