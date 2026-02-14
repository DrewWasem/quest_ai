# Vignette Population Plan

**Goal:** Bring all 7 zones to full vignette coverage across all 3 stages.
**Strategy:** Use mage-kitchen as the gold-standard template; adapt per zone via mapping tables.

## Current State

| Zone               | S1  | S2  | S3  | Target S1 | Target S2 | Target S3 |
|--------------------|-----|-----|-----|-----------|-----------|-----------|
| mage-kitchen       | 36  | 11  |  6  | 36 (done) | 24        | 6 (done)  |
| skeleton-birthday  |  8  | 13  |  6  | 36        | 24        | 6 (done)  |
| knight-space       |  4  | 12  |  6  | 30        | 24        | 6 (done)  |
| barbarian-school   |  4  | 13  |  6  | 36        | 24        | 6 (done)  |
| skeleton-pizza     |  4  | 12  |  6  | 30        | 24        | 6 (done)  |
| adventurers-picnic |  4  | 12  |  6  | 36        | 24        | 6 (done)  |
| dungeon-concert    |  4  | 12  |  6  | 36        | 24        | 6 (done)  |

**S1 targets:** SlotA(6) × SlotB(6) = 36, or SlotA(5) × SlotB(6) = 30 if a slot has 5 tags.
**S2 targets:** 4 modifier values × 6 base variations = 24 (matching mage-kitchen pattern).
**S3:** Already at 6 per zone with comboRequired=4. Done.

## Context Management: Temp Table Approach

Each vignette file is 1000-2700 lines. We CANNOT hold multiple files in context simultaneously.

**Approach:**
1. Write a **zone mapping table** (temp file) that maps mage-kitchen concepts → zone concepts
2. One implementer agent per zone, reading ONLY the mapping + mage-kitchen patterns
3. Each agent writes to the zone's vignette file, appending new vignettes
4. Verify with `tsc --noEmit` after each zone

**Temp file:** `frontend/src/data/vignettes/_vignette-template.ts` — shared constants/patterns

---

## Phase 0: Zone Mapping Table (5 min)

Create `frontend/src/data/vignettes/_zone-mappings.json` defining how each zone maps to the mage-kitchen pattern.

```
mage-kitchen Stage 1 Pattern:
  Primary slot: SPELL (6 tags) — drives the vignette theme
  Wildcarded slot: APPLIANCE (*) — doesn't affect vignette selection
  Result slot: RESULT (6 tags) — drives the outcome/comedy
  Grid: 6×6 = 36 vignettes
```

Zone Mapping:

| Zone | Primary Slot (→SPELL) | Wildcard (→APPLIANCE) | Result Slot (→RESULT) | Grid |
|------|----------------------|----------------------|----------------------|------|
| mage-kitchen | SPELL(6) | APPLIANCE(*) | RESULT(6) | 6×6=36 |
| skeleton-birthday | FOOD(6) | VIBE(*) | ENTERTAINMENT(6) | 6×6=36 |
| knight-space | CREW(5) | TOOL(*) | TASK(6) | 5×6=30 |
| barbarian-school | MONSTER(6) | EQUIPMENT(*) | ACTIVITY(6) | 6×6=36 |
| skeleton-pizza | CHEF(5) | STYLE(*) | DISH(6) | 5×6=30 |
| adventurers-picnic | ADVENTURER(6) | DISCOVERY(*) | REACTION(6) | 6×6=36 |
| dungeon-concert | HERO(6) | OBSTACLE(*) | ESCAPE_METHOD(6) | 6×6=36 |

Stage 2 Mapping (modifier added):

| Zone | Modifier Slot (→INTENSITY) | Tags |
|------|---------------------------|------|
| mage-kitchen | INTENSITY | tiny, medium, mega, unstable |
| skeleton-birthday | SIZE | tiny, normal, giant, enormous |
| knight-space | URGENCY | routine, urgent, critical, catastrophic |
| barbarian-school | ENERGY | sleepy, normal, hyper, MEGA_hyper |
| skeleton-pizza | HEAT | cold, warm, blazing, volcanic |
| adventurers-picnic | CAUTION | reckless, cautious, stealthy, bold |
| dungeon-concert | STEALTH | loud, quiet, invisible, disguised |

**Verification:** File parses as valid JSON.

---

## Phase 1: Complete Mage-Kitchen Stage 2 (10 min)

Currently 11 vignettes. Need 13 more to reach 24.

**Current coverage:** tiny(3), mega(3), medium(2), unstable(2), quantity(1) = 11
**Target:** 4 intensity × 6 results = 24

**Gap:** Add medium variants for remaining results, unstable variants, and quantity-scaled variants.

**Steps:**
- [ ] Read current Stage 2 vignettes to identify exact coverage gaps
- [ ] Write 13 new vignettes following existing patterns (tiny=subtle, mega=spectacular, medium=moderate, unstable=absolute_chaos)
- [ ] Each vignette: 5-7 steps, feedback with vagueComparison
- [ ] Append to existing intermediate arrays in mage-kitchen.ts
- [ ] `npx tsc --noEmit` — 0 errors

---

## Phase 2: Stage 1 — Skeleton Birthday (10 min)

Currently 8 vignettes. Need 28 more for 36.

**Slot mapping:**
- Primary: FOOD → {cake, pizza, feast, fruit, candy, soup}
- Wildcard: VIBE → *
- Result: ENTERTAINMENT → {magic_show, fireworks, music, combat, dance, games}

**Vignette pattern per FOOD type:**
- cake + magic_show → Wizard makes cake float and slice itself (perfect)
- cake + fireworks → Cake explodes into firework candles (chaotic)
- cake + music → Musical cake layers stack to rhythm (funny_fail)
- cake + combat → Knights joust with cake swords (chaotic)
- cake + dance → Cake tiers dance in formation (perfect)
- cake + games → Pin-the-tail on the cake (funny_fail)

Repeat for all 6 FOOD × 6 ENTERTAINMENT = 36 total.

**Steps:**
- [ ] Reorganize existing 8 vignettes into the 6×6 grid
- [ ] Write 28 new vignettes
- [ ] Group into FOOD_VIGNETTES arrays (CAKE_VIGNETTES, PIZZA_VIGNETTES, etc.)
- [ ] Assemble into PAIR_VIGNETTES → SKELETON_BIRTHDAY_STAGE_1
- [ ] `npx tsc --noEmit` — 0 errors

---

## Phase 3: Stage 1 — Knight Space (10 min)

Currently 4 vignettes. Need 26 more for 30.

**Slot mapping:**
- Primary: CREW → {ranger, robot, engineer, knight, everyone} (5 tags)
- Wildcard: TOOL → *
- Result: TASK → {repair, launch, build, rescue, explore, defend}

5×6 = 30 vignettes.

**Steps:**
- [ ] Keep existing 4, fill remaining 26
- [ ] Group by CREW member (RANGER_VIGNETTES, ROBOT_VIGNETTES, etc.)
- [ ] `npx tsc --noEmit`

---

## Phase 4: Stage 1 — Barbarian School (10 min)

Currently 4. Need 32 more for 36.

**Slot mapping:**
- Primary: MONSTER → {barbarian, clown, ninja, robot, caveman, everyone}
- Wildcard: EQUIPMENT → *
- Result: ACTIVITY → {tag, wrestling, hide_seek, race, jumping, climbing}

6×6 = 36.

**Steps:**
- [ ] Fill 32 new vignettes grouped by MONSTER
- [ ] `npx tsc --noEmit`

---

## Phase 5: Stage 1 — Skeleton Pizza (10 min)

Currently 4. Need 26 more for 30.

**Slot mapping:**
- Primary: CHEF → {skeleton, clown, superhero, survivalist, everyone} (5 tags)
- Wildcard: STYLE → *
- Result: DISH → {pizza, pepperoni, pasta, soup, cake, mystery}

5×6 = 30.

**Steps:**
- [ ] Fill 26 new vignettes grouped by CHEF
- [ ] `npx tsc --noEmit`

---

## Phase 6: Stage 1 — Adventurers Picnic (10 min)

Currently 4. Need 32 more for 36.

**Slot mapping:**
- Primary: ADVENTURER → {ranger, druid, barbarian, ninja, rogue, whole_party}
- Wildcard: DISCOVERY → *
- Result: REACTION → {investigate, celebrate, panic, cast_spell, set_trap, have_picnic}

6×6 = 36.

**Steps:**
- [ ] Fill 32 new vignettes grouped by ADVENTURER
- [ ] `npx tsc --noEmit`

---

## Phase 7: Stage 1 — Dungeon Concert (10 min)

Currently 4. Need 32 more for 36.

**Slot mapping:**
- Primary: HERO → {knight, mage, rogue, skeleton, necromancer, team}
- Wildcard: OBSTACLE → *
- Result: ESCAPE_METHOD → {sneak, fight, magic, lockpick, distract, smash}

6×6 = 36.

**Steps:**
- [ ] Fill 32 new vignettes grouped by HERO
- [ ] `npx tsc --noEmit`

---

## Phase 8: Stage 2 — All Other Zones (20 min)

Use mage-kitchen Stage 2 (now 24 vignettes) as the template pattern. Each zone needs:
- 4 modifier values × 6 base results = 24 vignettes (per zone)
- Currently each has 12-13 → need ~11-12 more each

**Execute per zone (one agent per zone):**
- [ ] skeleton-birthday: SIZE modifier (tiny/normal/giant/enormous) × 6 entertainment results
- [ ] knight-space: URGENCY modifier (routine/urgent/critical/catastrophic) × 6 task results
- [ ] barbarian-school: ENERGY modifier (sleepy/normal/hyper/MEGA_hyper) × 6 activity results
- [ ] skeleton-pizza: HEAT modifier (cold/warm/blazing/volcanic) × 6 dish results
- [ ] adventurers-picnic: CAUTION modifier (reckless/cautious/stealthy/bold) × 6 reaction results
- [ ] dungeon-concert: STEALTH modifier (loud/quiet/invisible/disguised) × 6 escape results
- [ ] `npx tsc --noEmit` after each zone

---

## Phase 9: Final Count Verification

- [ ] Run vignette counter script across all zones
- [ ] Verify every zone has: S1≥30, S2≥24, S3=6
- [ ] `npm run build` succeeds
- [ ] Spot-check 2-3 vignettes per zone for content quality

---

## Execution Order

```
Phase 0 (mapping table)         — 5 min
Phase 1 (mage-kitchen S2)      — 10 min
Phases 2-7 (Stage 1 × 6 zones) — 60 min (can parallelize 2 at a time)
Phase 8 (Stage 2 × 6 zones)    — 20 min
Phase 9 (verification)         — 5 min
                                ─────────
                          Total: ~100 min
```

**Parallelization:** Phases 2-7 are independent and can run as parallel implementer agents (2 at a time to manage context).

**Context safety:** Each implementer agent reads ONLY:
1. The zone mapping table (Phase 0 output)
2. 1-2 mage-kitchen vignettes as exemplars (not the whole file)
3. The target zone's existing vignette file

This keeps each agent's context under 50% capacity.

---

## Verification Criteria

1. `npx tsc --noEmit` — 0 errors (not counting pre-existing)
2. `npm run build` — succeeds
3. Vignette counts: all S1≥30, all S2≥24, all S3=6
4. Every vignette has: id, description, trigger, tier, promptScore, steps(5-8), feedback
5. No duplicate IDs across the codebase
6. All Stage 2 vignettes have vagueComparison field
