# Stage Coverage Audit

**Generated:** 2026-02-15
**Source:** `frontend/src/data/quest-stages.ts` + `frontend/src/data/vignettes/*.ts`
**Purpose:** Verify every stage across all 7 zones has adequate vignette coverage

---

## Coverage Summary

| Zone | S1 Vignettes | S1 Pair Coverage | S2 Vignettes | S2 Status | S3 Vignettes | S3 Status |
|------|-------------|------------------|-------------|-----------|-------------|-----------|
| skeleton-birthday | 40 (36+4) | 36/36 (100%) | 25 (24+1) | Good | 7 (6+1) | Good |
| knight-space | 32 (30+2) | 30/30 (100%) | 25 (24+1) | Good | 7 (6+1) | Good |
| mage-kitchen | 37 (36+1) | 36/36 (100%) | 25 (24+1) | Good | 7 (6+1) | Good |
| barbarian-school | 36 (35+1) | 35/36 (97%) | 25 (24+1) | Good | 8 (7+1) | Good |
| dungeon-concert | 37 (36+1) | 36/36 (100%) | 25 (24+1) | Good | 7 (6+1) | Good |
| skeleton-pizza | 31 (30+1) | 30/30 (100%) | 26 (25+1) | Good | 7 (6+1) | Good |
| adventurers-picnic | 37 (36+1) | 36/36 (100%) | 25 (24+1) | Good | 7 (6+1) | Good |
| **TOTAL** | **250** | **~100%** | **176** | **All good** | **51** | **All good** |

Format: `total (specific + defaults/partials)`

---

## Stage 1 — Detailed Coverage

Stage 1 uses 3 slots. Most vignettes match on the first 2 slots (slot1 x slot2) with the third wildcarded.

### T1 — Skeleton's Surprise Birthday (40 vignettes)
- **Slots:** FOOD(6) x ENTERTAINMENT(6) x VIBE(6) = 216 full combos
- **Strategy:** 36 vignettes cover all FOOD x ENTERTAINMENT pairs (VIBE wildcarded)
- **Extras:** 2 vibe-only (spooky, fancy), 1 category (magic_show), 1 default
- **Missing:** None. 100% pair coverage.

### T2 — Knight's Space Mission (32 vignettes)
- **Slots:** CREW(5) x TASK(6) x TOOL(6) = 180 full combos
- **Strategy:** 30 vignettes cover all CREW x TASK pairs (TOOL wildcarded)
- **Extras:** 1 partial (laser tool match), 1 default
- **Missing:** None. 100% pair coverage.

### T3 — Mage vs. Kitchen (37 vignettes)
- **Slots:** SPELL(6) x INGREDIENT(6) x RESULT(6) = 216 full combos
- **Strategy:** 36 vignettes cover all SPELL x RESULT pairs (INGREDIENT wildcarded)
- **Extras:** 1 default
- **Missing:** None. 100% pair coverage.

### T4 — Barbarian's School (36 vignettes)
- **Slots:** MONSTER(6) x ACTIVITY(6) x EQUIPMENT(6) = 216 full combos
- **Strategy:** 35 vignettes cover MONSTER x ACTIVITY pairs (EQUIPMENT wildcarded)
- **Extras:** 1 default
- **Missing:** 1 MONSTER x ACTIVITY pair (everyone x climbing has fewer actions but exists). 97% pair coverage.

### T5 — Dungeon Rock Concert (37 vignettes)
- **Slots:** CHARACTER(6) x METHOD(6) x INSTRUMENT(6) = 216 full combos
- **Strategy:** 36 vignettes cover all CHARACTER x METHOD pairs (INSTRUMENT wildcarded)
- **Extras:** 1 default
- **Missing:** None. 100% pair coverage.

### T6 — Skeleton Pizza Delivery (31 vignettes)
- **Slots:** CHEF(6) x DISH(6) x STYLE(6) = 216 full combos
- **Strategy:** 30 vignettes cover all CHEF x DISH pairs (STYLE wildcarded)
- **Note:** 5 chefs x 6 dishes = 30 (6th chef slot covers "everyone")
- **Extras:** 1 default
- **Missing:** None. 100% pair coverage.

### T7 — Adventurers' Picnic (37 vignettes)
- **Slots:** ADVENTURER(6) x DISCOVERY(6) x REACTION(6) = 216 full combos
- **Strategy:** 36 vignettes cover all ADVENTURER x REACTION pairs (DISCOVERY wildcarded)
- **Extras:** 1 default
- **Missing:** None. 100% pair coverage.

### Stage 1 Verdict: EXCELLENT
All zones have 97-100% pair coverage. Every meaningful slot1 x slot2 combination triggers a unique vignette.

---

## Stage 2 — Detailed Coverage

Stage 2 adds 2 new slots (5 total). The full Cartesian product is 2,880-3,456 combos per zone, so vignettes must use wildcards strategically.

### T1 — Skeleton's Surprise Birthday (25 vignettes)
- **Slots:** SIZE(4) x FOOD(6) x ENTERTAINMENT(6) x VIBE(6) x MOOD(4) = 3,456 combos
- **Strategy:** Mix of exact 3-4 tag matches and partial matches
- **Pattern types:**
  - SIZE + FOOD + ENTERTAINMENT: 6 vignettes (e.g., `tiny + cake + magic_show`)
  - SIZE + FOOD: 4 vignettes (e.g., `giant + pizza`)
  - SIZE + VIBE: 3 vignettes (e.g., `enormous + fireworks + epic`)
  - ENTERTAINMENT + MOOD: 4 vignettes (e.g., `fireworks + excited`)
  - SIZE + FOOD + VIBE/MOOD: 7 vignettes (various combos)
- **1 default** for unmatched combos
- **Status: GOOD** — 24 specific patterns with strategic wildcard coverage

### T2 — Knight's Space Mission (25 vignettes)
- **Slots:** CREW(5) x URGENCY(4) x TASK(6) x TOOL(6) x APPROACH(4) = 2,880 combos
- **Strategy:** Mix of URGENCY + APPROACH + optional CREW/TASK
- **Pattern types:**
  - URGENCY + APPROACH: 5 core vignettes
  - URGENCY + TASK + APPROACH: 5 vignettes (critical/catastrophic combos)
  - URGENCY only: 3 vignettes (catastrophic, fast, creative fallbacks)
  - CREW + URGENCY + APPROACH + TASK: 11 character-specific combos
- **1 default** for unmatched combos
- **Status: GOOD** — 24 specific patterns spanning all urgency levels

### T3 — Mage vs. Kitchen (25 vignettes)
- **Slots:** POWER(4) x SPELL(6) x INGREDIENT(6) x RESULT(6) x CHAOS(4) = 3,456 combos
- **Strategy:** Mix of INTENSITY-focused, QUANTITY-focused, INTENSITY×QUANTITY combos, INTENSITY×SPELL combos, and INTENSITY×RESULT cross-combos
- **Pattern types:**
  - INTENSITY-focused (wildcarded rest): 4 vignettes (tiny, mega, medium, unstable)
  - RESULT-only matches: 6 vignettes (explode, dance, multiply, calm_down, go_wild, cook_perfectly)
  - INTENSITY + SPELL: 4 vignettes (mega+ice, unstable+grow, tiny+levitate, mega+transform)
  - INTENSITY + QUANTITY: 4 vignettes (mega+way_too_many, tiny+one, unstable+dozen, medium+few)
  - QUANTITY-focused: 4 vignettes (one, a_few, a_dozen, way_too_many)
  - INTENSITY + RESULT: 2 vignettes (unstable+explode, tiny+go_wild)
- **1 default** for unmatched combos
- **Status: GOOD** — 24 specific patterns with strategic coverage across INTENSITY and QUANTITY dimensions

### T4 — Barbarian's School (25 vignettes)
- **Slots:** ENERGY(4) x MONSTER(6) x ACTIVITY(6) x EQUIPMENT(6) x WEATHER(4) = 3,456 combos
- **Strategy:** Mix of ENERGY-focused, WEATHER-focused, ENERGY×WEATHER combos, ENERGY×MONSTER character-driven, and WEATHER×ACTIVITY environmental comedy
- **Pattern types:**
  - ENERGY-focused (wildcarded rest): 4 vignettes (sleepy, normal, hyper, MEGA_hyper)
  - WEATHER-focused (wildcarded rest): 4 vignettes (sunny, rainy, snowy, windy)
  - ENERGY × WEATHER combos: 8 vignettes (sleepy+rainy, sleepy+sunny, hyper+snowy, hyper+windy, MEGA+rainy, MEGA+snowy, normal+sunny, normal+snowy)
  - ENERGY × MONSTER: 4 vignettes (MEGA+barbarian, sleepy+robot, hyper+clown, sleepy+ninja)
  - WEATHER × ACTIVITY: 4 vignettes (snowy+tag, rainy+hide_seek, windy+race, rainy+climbing)
- **1 default** for unmatched combos
- **Status: GOOD** — 24 specific patterns with strategic coverage across ENERGY and WEATHER dimensions

### T5 — Dungeon Rock Concert (25 vignettes)
- **Slots:** CHARACTER(6) x STEALTH(4) x METHOD(6) x OBSTACLE(6) x SPEED(4) = 3,456 combos
- **Strategy:** CHARACTER + STEALTH + METHOD + OBSTACLE + SPEED (exact 5-slot matches)
- **24 specific** covering strategic character x stealth x method x obstacle combos
- **1 default**
- **Status: GOOD** — Best Stage 2 coverage. Every vignette uses all 5 slots for maximum differentiation.

### T6 — Skeleton Pizza Delivery (26 vignettes)
- **Slots:** CHEF(6) x DISH(6) x TEMPERATURE(5) x AMOUNT(5) = 900 combos
- **Strategy:** CHEF + DISH + TEMPERATURE + AMOUNT exact or near-exact matches
- **25 specific** with diverse temperature x amount combos
- **1 default**
- **Status: GOOD** — Excellent coverage across all Stage 2 dimensions

### T7 — Adventurers' Picnic (25 vignettes)
- **Slots:** APPROACH(4) x TIME(4) x ADVENTURER(6) x DISCOVERY(7) x REACTION(6) = 4,032 combos
- **Strategy:** APPROACH + TIME + ADVENTURER + DISCOVERY + optional REACTION
- **24 specific** covering strategic approach x time x adventurer x discovery combos
- **1 default**
- **Status: GOOD** — Broad coverage across all dimensions

### Stage 2 Verdict: ALL GOOD
- **All 7 zones: Good** (24-25 specific vignettes each)
- **mage-kitchen:** Expanded from 8 → 24 specific vignettes (added INTENSITY and QUANTITY coverage)
- **barbarian-school:** Expanded from 0 → 24 specific vignettes (added ENERGY and WEATHER coverage)

---

## Stage 3 — Detailed Coverage

Stage 3 is "Combo" mode where kids discover SECRET pairings of the first 2 slots. Each zone needs 5-8 combo vignettes + 1 default. The combo swap logic in the resolver means A+B and B+A both match the same vignette.

### All Zones (51 vignettes total)

| Zone | Combos | Hints | Default | Status |
|------|--------|-------|---------|--------|
| skeleton-birthday | 6 | 5 | 1 | Good |
| knight-space | 6 | 6 | 1 | Good |
| mage-kitchen | 6 | 6 | 1 | Good |
| barbarian-school | 7 | 6 | 1 | Best |
| dungeon-concert | 6 | 6 | 1 | Good |
| skeleton-pizza | 6 | 6 | 1 | Good |
| adventurers-picnic | 6 | 6 | 1 | Good |

### Stage 3 Verdict: ALL GOOD
Every zone has 6-7 unique combo vignettes with matching hints to guide kids to discover them. The combo swap logic ensures both orderings work. Default fallback covers undiscovered combos.

---

## Trigger Mismatch Audit: Level 4 Free Text

### Issue Reported
User typed "witch casts freeze on" in mage-kitchen Level 4 and got:
- **Matched vignette:** `mk_fire_cook` ("BARBARIAN GRILL MASTER")
- **Expected match:** `mk_ice_cook` or another freeze/ice vignette
- **Feedback shown:** "Fire + cooking perfectly = the barbarian knows exactly what to do with flames!"

### Root Cause Analysis
The Level 4 text parser (`text-parser.ts`) sends free text to Haiku for tag extraction. The parse flow:
1. User input: "casts freeze on"
2. Haiku should extract: `action: "ice_spell"` (freeze maps to ice_spell)
3. But Haiku may have returned: `action: "fire_spell"` or `result: "cook_perfectly"`
4. Level 4 resolver matched to `mk_fire_cook` (trigger: `fire_spell + * + cook_perfectly`)

### Possible Causes
1. **Haiku misparse:** The word "on" may have triggered "cook" associations, or Haiku conflated "freeze" with generic spell action
2. **Fallback keyword matching:** If Haiku timed out, the keyword fallback in `text-parser.ts` does partial matching — "freeze" might not match exactly, falling through to a different tag
3. **Vignette resolver default:** If all parsed tags were null, the resolver picks the first non-default vignette

### Recommendation
- Add explicit "freeze" → "ice_spell" mapping in the Haiku prompt examples
- Add "cast" → action verb recognition
- Consider adding a local keyword map as a pre-check before calling Haiku

---

## Priority Actions

### DONE: Barbarian-School Stage 2
Added 24 vignettes covering ENERGY × WEATHER combinations with MONSTER/ACTIVITY wildcards.

### DONE: Mage-Kitchen Stage 2
Added 16 vignettes using INTENSITY × QUANTITY × SPELL combos (total now 24 specific).

### MEDIUM: Level 4 Text Parser
Fix "freeze" → "ice_spell" mapping accuracy in Haiku prompt and keyword fallback.

### LOW: Barbarian-School Stage 1
Add 1 missing MONSTER x ACTIVITY pair (if identified) to reach 100% pair coverage.

---

## Appendix: Slot Definitions per Zone per Stage

### T1 — Skeleton's Surprise Birthday
| Stage | Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 |
|-------|--------|--------|--------|--------|--------|
| S1 | FOOD(6) | ENTERTAINMENT(6) | VIBE(6) | — | — |
| S2 | SIZE(4) | FOOD(6) | ENTERTAINMENT(6) | VIBE(6) | MOOD(4) |
| S3 | ACTIVITY1(6) | ACTIVITY2(6) | SPIRIT(4) | LOCATION(4) | — |

### T2 — Knight's Space Mission
| Stage | Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 |
|-------|--------|--------|--------|--------|--------|
| S1 | CREW(5) | TASK(6) | TOOL(6) | — | — |
| S2 | CREW(5) | URGENCY(4) | TASK(6) | TOOL(6) | APPROACH(4) |
| S3 | TECH1(6) | TECH2(6) | CRISIS(4) | LOCATION(4) | — |

### T3 — Mage vs. Kitchen
| Stage | Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 |
|-------|--------|--------|--------|--------|--------|
| S1 | SPELL(6) | INGREDIENT(6) | RESULT(6) | — | — |
| S2 | POWER(4) | SPELL(6) | INGREDIENT(6) | RESULT(6) | CHAOS(4) |
| S3 | SPELL1(6) | SPELL2(6) | TARGET(varies) | LOCATION(varies) | — |

### T4 — Barbarian's School
| Stage | Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 |
|-------|--------|--------|--------|--------|--------|
| S1 | MONSTER(6) | ACTIVITY(6) | EQUIPMENT(6) | — | — |
| S2 | ENERGY(4) | MONSTER(6) | ACTIVITY(6) | EQUIPMENT(6) | WEATHER(4) |
| S3 | GAME1(6) | GAME2(6) | STYLE(4) | PLAYGROUND(4) | — |

### T5 — Dungeon Rock Concert
| Stage | Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 |
|-------|--------|--------|--------|--------|--------|
| S1 | CHARACTER(6) | METHOD(6) | INSTRUMENT(6) | — | — |
| S2 | CHARACTER(6) | STEALTH(4) | METHOD(6) | OBSTACLE(6) | SPEED(4) |
| S3 | METHOD1(6) | METHOD2(6) | ELEMENT(varies) | LOCATION(varies) | — |

### T6 — Skeleton Pizza Delivery
| Stage | Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 |
|-------|--------|--------|--------|--------|--------|
| S1 | CHEF(6) | DISH(6) | STYLE(6) | — | — |
| S2 | CHEF(6) | DISH(6) | TEMPERATURE(5) | AMOUNT(5) | — |
| S3 | TECHNIQUE1(varies) | TECHNIQUE2(varies) | TARGET(varies) | LOCATION(varies) | — |

### T7 — Adventurers' Picnic
| Stage | Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 |
|-------|--------|--------|--------|--------|--------|
| S1 | ADVENTURER(6) | DISCOVERY(6) | REACTION(6) | — | — |
| S2 | APPROACH(4) | TIME(4) | ADVENTURER(6) | DISCOVERY(7) | REACTION(6) |
| S3 | REACTION1(6) | REACTION2(6) | ELEMENT(varies) | LOCATION(varies) | — |
