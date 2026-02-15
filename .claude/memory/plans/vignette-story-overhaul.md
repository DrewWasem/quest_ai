# Plan: Vignette Story Overhaul — Full Asset Integration

**Created:** 2026-02-14
**Last Updated:** 2026-02-14
**Status:** ✅ COMPLETED (all 13 phases implemented and verified)
**Research:** 476 vignettes across 7 zones; 3,278 new assets added; engine utilizes <15% of available assets

## Goal

Transform all vignettes from static "tech demos" into mini comic strips while integrating the full asset expansion (emojis, audio, 3D props, Kenney packs). Strengthen the educational feedback loop so kids viscerally learn that **better prompts produce richer scenes**.

### Design Principles
1. **Show, don't tell** — Scene complexity IS the feedback (not just text)
2. **Emotion = vocabulary** — Named emotions teach kids to describe feelings precisely
3. **Sound = immersion** — Multi-sensory scenes are more memorable than silent ones
4. **Movement = story** — Characters who walk, chase, and flee tell stories statically-posed ones can't
5. **Props = specificity** — More detailed prompts should produce more detailed scenes

---

## Phase 1: Emotion Expansion (emoji-map.ts + ScenePlayer3D)

### Task 1.1: Expand EMOJI_MAP with 15+ new emotions
**File:** `frontend/src/data/emoji-map.ts`
**Action:** Add new named emotions from the 86 unmapped JoyQuest PNGs (127 total, 41 currently mapped):

```typescript
// ─── NEW EMOTIONS (visually verified against PNGs) ───
nervous: ??,        // sweating, anxious face
pleading: ??,       // puppy eyes / begging
suspicious: ??,     // side-eye, narrowed
triumphant: ??,     // fist pump / victory
exhausted: ??,      // drooping, tired
hungry: ??,         // drooling variant
musical: ??,        // notes around face
sneaky: ??,         // shifty eyes
embarrassed: ??,    // red face, hiding
annoyed: ??,        // eye-roll
hopeful: ??,        // looking up, slight smile
jealous: ??,        // green-tinted envy
grateful: ??,       // hands together, warm
stubborn: ??,       // crossed arms / pouty
playful: ??,        // tongue out + wink
```

**Note:** Exact PNG numbers need visual verification against the 86 unmapped images. Run `open frontend/public/assets/2d/emojis/bubble/` and map each face to a semantic name.

**Verify:**
- [ ] All new names resolve to valid PNG files
- [ ] `getEmojiBubblePath()` and `getEmojiOutlinePath()` return correct paths
- [ ] `npm run build` passes

### Task 1.2: Add 20 emotion-themed particle effects to ScenePlayer3D
**File:** `frontend/src/game/ScenePlayer3D.tsx`
**Action:** Add to EFFECT_EMOJIS map:

```typescript
// ─── EMOTION EFFECTS (use pixel-art where mapped, Unicode fallback) ───
'angry':        → pixel-art: [angry, mad, grumpy] + Unicode: ['💢']
'scared':       → pixel-art: [scared, ghost, worried] + Unicode: ['💦']
'love':         → pixel-art: [love_eyes, blushing, happy] + Unicode: ['💕']
'thinking':     → pixel-art: [thinking, confused] + Unicode: ['💭', '❓']
'excited':      → pixel-art: [excited, star_eyes, happy] + Unicode: ['⚡']
'sleepy':       → pixel-art: [sleeping, dizzy] + Unicode: ['💤']
'proud':        → pixel-art: [proud, cool, determined] + Unicode: ['💪']
'confused':     → pixel-art: [confused, dizzy, surprised] + Unicode: ['❓', '🌀']
'nervous':      → pixel-art: [nervous, worried, scared] + Unicode: ['💦']
'shocked':      → pixel-art: [shocked, mind_blown, surprised] + Unicode: ['⚡']
'crying':       → pixel-art: [crying, sad] + Unicode: ['💧']
'mischievous':  → pixel-art: [mischievous, smirk, wink] + Unicode: ['💜']
'celebrating':  → pixel-art: [party, happy, excited] + Unicode: ['🎉', '🎊']
'hungry':       → pixel-art: [hungry, yummy, drooling] + Unicode: ['🍽️']
'sick':         → pixel-art: [sick, disgusted, dizzy] + Unicode: ['💚']
'musical':      → Unicode only: ['🎵', '🎶', '🎵', '🎶', '🎵', '🎶', '🎵']
'frozen':       → pixel-art: [frozen] + Unicode: ['❄️', '🧊']
'hot':          → Unicode only: ['🥵', '🔥', '♨️']
'dizzy':        → pixel-art: [dizzy] + Unicode: ['💫', '🌀']
'sneaky':       → pixel-art: [sneaky, mischievous] + Unicode: ['👀']
```

**Verify:**
- [ ] `npm run build` passes
- [ ] Each effect renders pixel-art emoji faces (not just Unicode)

---

## Phase 2: Sound Expansion (SoundManager3D)

### Task 2.1: Add zone-specific SFX categories
**File:** `frontend/src/game/SoundManager3D.ts`
**Action:** Extend `SoundName` type and `SOUND_FILES` map with new categories:

```typescript
// ─── NEW SFX CATEGORIES ───
type SoundName =
  | 'spawn' | 'move' | 'react' | 'success' | 'partial' | 'fail'
  | 'click' | 'remove' | 'intro'
  // ─── NEW: Context-specific sounds ───
  | 'footstep'    // Character walking (variety by surface)
  | 'impact'      // Object collision, landing, punch
  | 'magic'       // Spell casting, enchantment
  | 'cooking'     // Sizzle, chop, pot clang
  | 'door'        // Dungeon doors creaking
  | 'coin'        // Treasure/reward discovery
  | 'explosion'   // Barbarian chaos, rocket launch
  | 'laser'       // Space weapons, sci-fi beams
  | 'engine'      // Rocket/space ship engines
  | 'book'        // School page flip, reading
  | 'bell'        // School bell, dinner bell
  | 'glass'       // Potion breaking, glass shatter
  | 'chop'        // Kitchen knife, food prep
  | 'whoosh'      // Fast movement, dodging
  | 'thud'        // Heavy object landing

const SOUND_FILES: Record<SoundName, string[]> = {
  // ... existing ...
  footstep:  ['/assets/audio/impact/footstep_wood_000.ogg', '/assets/audio/impact/footstep_wood_001.ogg', '/assets/audio/impact/footstep_wood_002.ogg'],
  impact:    ['/assets/audio/impact/impactGeneric_light_000.ogg', '/assets/audio/impact/impactGeneric_light_001.ogg', '/assets/audio/impact/impactGeneric_light_002.ogg'],
  magic:     ['/assets/audio/sfx/powerUp1.ogg', '/assets/audio/sfx/powerUp2.ogg', '/assets/audio/sfx/powerUp3.ogg'], // reuse react as base
  cooking:   ['/assets/audio/rpg/metalPot1.ogg', '/assets/audio/rpg/metalPot2.ogg', '/assets/audio/rpg/metalPot3.ogg'],
  door:      ['/assets/audio/rpg/doorOpen_1.ogg', '/assets/audio/rpg/doorOpen_2.ogg', '/assets/audio/rpg/doorClose_1.ogg'],
  coin:      ['/assets/audio/retro/coin1.ogg', '/assets/audio/retro/coin2.ogg', '/assets/audio/retro/coin3.ogg'],
  explosion: ['/assets/audio/scifi/explosionCrunch_000.ogg', '/assets/audio/scifi/explosionCrunch_001.ogg', '/assets/audio/scifi/explosionCrunch_002.ogg'],
  laser:     ['/assets/audio/scifi/laserSmall_000.ogg', '/assets/audio/scifi/laserSmall_001.ogg', '/assets/audio/scifi/laserSmall_002.ogg'],
  engine:    ['/assets/audio/scifi/spaceEngine_000.ogg', '/assets/audio/scifi/spaceEngine_001.ogg', '/assets/audio/scifi/spaceEngine_002.ogg'],
  book:      ['/assets/audio/rpg/bookFlip1.ogg', '/assets/audio/rpg/bookFlip2.ogg', '/assets/audio/rpg/bookFlip3.ogg'],
  bell:      ['/assets/audio/impact/impactBell_heavy_000.ogg', '/assets/audio/impact/impactBell_heavy_001.ogg', '/assets/audio/impact/impactBell_heavy_002.ogg'],
  glass:     ['/assets/audio/impact/impactGlass_light_000.ogg', '/assets/audio/impact/impactGlass_light_001.ogg', '/assets/audio/impact/impactGlass_light_002.ogg'],
  chop:      ['/assets/audio/rpg/chop.ogg', '/assets/audio/rpg/knifeSlice.ogg', '/assets/audio/rpg/knifeSlice2.ogg'],
  whoosh:    ['/assets/audio/sfx/phaseJump1.ogg', '/assets/audio/sfx/phaseJump2.ogg', '/assets/audio/sfx/phaseJump3.ogg'], // alias of move
  thud:      ['/assets/audio/impact/impactSoft_heavy_000.ogg', '/assets/audio/impact/impactSoft_heavy_001.ogg', '/assets/audio/impact/impactSoft_heavy_002.ogg'],
}
```

### Task 2.2: Auto-trigger sounds on vignette actions
**File:** `frontend/src/game/ScenePlayer3D.tsx`
**Action:** Add automatic SFX triggers in action handlers:
- `handleMove()` — play `footstep` when character walks, `whoosh` when character runs
- `handleReact()` — play `magic` for sparkle-magic/magic_circle effects
- `handleSpawn()` — play zone-specific sound (e.g., `door` in dungeon, `engine` in space)
- Movement templates should include `sfx` actions at key beats

**Verify:**
- [ ] `npm run build` passes
- [ ] Walking characters produce footstep sounds
- [ ] Zone-specific sounds play at appropriate moments
- [ ] Synth fallbacks work for all new sounds

---

## Phase 3: Movement Template Library

### Task 3.1: Create movement template helpers
**File:** `frontend/src/data/movement-templates.ts` (NEW)
**Action:** Create library of reusable VignetteStep[] building blocks.

#### Character Entrance Patterns (7)
| Template | Description | SFX |
|----------|-------------|-----|
| `ENTER_FROM_LEFT(char, pos)` | Walk in from stage left | footstep |
| `ENTER_FROM_RIGHT(char, pos)` | Walk in from stage right | footstep |
| `SNEAK_IN_LEFT(char, pos)` | Sneak in quietly | — |
| `CHARGE_IN_LEFT(char, pos)` | Run in from left | whoosh |
| `CHARGE_IN_RIGHT(char, pos)` | Run in from right | whoosh |
| `DROP_IN(char, pos)` | Fall from above with dust | thud |
| `TELEPORT_IN(char, pos)` | Flash + appear (magic) | magic |

#### Character Movement (6)
| Template | Description | SFX |
|----------|-------------|-----|
| `WALK_TO(char, pos)` | Casual walk | footstep |
| `RUN_TO(char, pos)` | Sprint to position | whoosh |
| `JUMP_TO(char, pos)` | Leap with arc | thud |
| `DODGE(char, direction)` | Quick sidestep | whoosh |
| `CIRCLE_AROUND(char)` | Run in arc pattern | footstep |
| `PACE(char, pos1, pos2)` | Walk back and forth (nervous) | footstep |

#### Character Exit (3)
| Template | Description | SFX |
|----------|-------------|-----|
| `FLEE_LEFT(char)` | Panic run off-stage left | whoosh |
| `FLEE_RIGHT(char)` | Panic run off-stage right | whoosh |
| `EXIT_WALK(char, direction)` | Calm exit walk | footstep |

#### Multi-Character (4)
| Template | Description | SFX |
|----------|-------------|-----|
| `CONVERGE_MEET(char1, char2)` | Both walk to center | footstep |
| `CHASE(chaser, runner, from, to)` | One chases the other | whoosh |
| `SCATTER(chars[], positions[])` | Everyone runs apart | whoosh |
| `GATHER(chars[], centerPos)` | Everyone converges | footstep |

#### Object Patterns (10)
| Template | Description | SFX |
|----------|-------------|-----|
| `OBJECT_DROP(asset, pos)` | Fall from sky + dust | thud |
| `OBJECT_SLIDE_IN(asset, from, to)` | Slide from off-stage | move |
| `OBJECT_GROW_REVEAL(asset, pos, scale)` | Grow from tiny | magic |
| `OBJECT_LAUNCH(asset, pos)` | Rocket upward | engine |
| `OBJECT_SPIN_IN(asset, pos)` | Spin from off-stage | whoosh |
| `OBJECT_RAIN(asset, count, area)` | Rain from sky | — |
| `OBJECT_SHRINK_POP(asset, effect)` | Shrink + burst | react |
| `OBJECT_FLOAT_UP(asset, pos)` | Float upward gently | magic |
| `OBJECT_PILE(assets[], pos)` | Stack objects rapidly | thud |
| `OBJECT_SERVE(asset, from, to)` | Slide from char to char | move |

#### Dialogue Patterns (5)
| Template | Description |
|----------|-------------|
| `CHARACTER_SPEAK(char, emoji, text)` | Speak with talk animation |
| `CHARACTER_THINK(char, emoji)` | Silent thought bubble |
| `DIALOGUE(char1, e1, t1, char2, e2, t2)` | Back-and-forth conversation |
| `EMOTIONAL_REACT(char, emotion, pos)` | React with emotion effect |
| `CHARACTER_EXCLAIM(char, emoji, text)` | Excited speak + camera shake |

#### Scene Transitions (5)
| Template | Description | SFX |
|----------|-------------|-----|
| `NARRATOR(text, size)` | Narrator text overlay | — |
| `IMPACT(color, intensity)` | Flash + shake | impact |
| `CELEBRATION(chars[], pos)` | Everyone cheers + confetti | success |
| `DISAPPOINTMENT(chars[], pos)` | Everyone sad + cloud | fail |
| `DRAMATIC_PAUSE(duration)` | Silence before payoff | — |

**Total: 40 templates** (up from 30 in original plan)

**Verify:**
- [ ] `npm run build` passes
- [ ] Templates export correctly and can be spread into steps arrays

---

## Phase 4: Story Structure + Educational Framework

### Task 4.1: Define 5-beat mini comic strip structure

Every vignette follows this pattern (with variation):

```
Beat 1: SETUP (who + where + what's at stake)
  - NARRATOR text sets the scene
  - Characters ENTER via movement templates
  - Zone-specific SFX establish atmosphere
  - Props placed to set the stage

Beat 2: INTENT (character voices their plan/desire)
  - Main character SPEAKS via emote (pixel-art emoji + text)
  - Other characters REACT or RESPOND
  - Educational tie-in: the kid's prompt choices determine WHAT is said

Beat 3: ACTION (the plan executes)
  - Characters MOVE to do the thing
  - Objects APPEAR, TRANSFORM, or MOVE
  - Zone-specific SFX at key moments
  - IMPACT effects for drama (flash, shake)

Beat 4: CONSEQUENCE (what happened — comedy or drama)
  - Characters REACT with EMOTION EFFECTS
  - DIALOGUE reveals how they feel
  - Crowd reacts if others are present
  - THIS is where promptScore shows:
    - perfect: everything works beautifully
    - partial: something goes wrong but it's salvageable
    - funny_fail: spectacular hilarious failure
    - chaotic: everything goes maximum wrong

Beat 5: RESOLUTION (payoff + teaching moment)
  - CELEBRATION or DISAPPOINTMENT template
  - Final character quip (the punchline)
  - Narrator commentary: WHY the prompt worked or didn't
  - spawn_rain for perfect (reward escalation)
```

### Task 4.2: Define tier-based scene complexity scaling

Scene richness should scale with prompt quality to teach kids viscerally:

| Prompt Quality | Tier | Characters | Props | Movement | Effects | Sound | Duration |
|---------------|------|-----------|-------|----------|---------|-------|----------|
| Default/vague | `subtle` | 1-2 | 1-2 | Spawn in place | 1 basic | spawn only | ~5s |
| Partial match | `moderate` | 2-3 | 2-4 | Walk on + 1 move | 2-3 effects | +react | ~8s |
| Perfect match | `spectacular` | 3-4 | 3-6 | Full entrances + dialogue + movement | 4+ effects + IMPACT | +zone SFX | ~12s |
| Chaotic combo | `absolute_chaos` | 4+ | 5+ | Chase + scatter + flee | 5+ cascading effects | everything | ~15s |

**Educational lesson:** Kids SEE that more specific prompts produce more elaborate, longer, richer scenes. No text explanation needed — the difference is visceral.

### Task 4.3: Add narrator "Director's Commentary" beats

For educational zones, add `text_popup` narrator commentary that teaches prompt engineering DURING the scene:

```typescript
// Perfect prompt — narrator celebrates specificity
NARRATOR("Great detail! You said 'giant' so look how BIG it is!", 'small')

// Partial prompt — narrator hints at what's missing
NARRATOR("Hmm, the skeleton doesn't know HOW to cook it...", 'small')

// Funny fail — narrator explains what went wrong
NARRATOR("'Stuff' isn't specific enough for a magic spell!", 'small')
```

**Only in Stages 1-2** (teaching levels). Stage 3+ removes narrator for pure play.

---

## Phase 5: Zone-Specific Prop Mapping

### Task 5.1: Create zone prop palettes
**File:** `frontend/src/data/zone-props.ts` (NEW)
**Action:** Map each zone to its ideal subset of the 2,186 available props.

```typescript
export const ZONE_PROPS: Record<string, string[]> = {
  'skeleton-birthday': [
    // Kenney holiday-kit (99 items)
    'present', 'present_round', 'candy_cane', 'stocking', 'wreath',
    'gingerbread_man', 'snowman', 'tree_decorated',
    // Tiny Treats celebration
    'cake_birthday', 'balloon', 'candle', 'candy',
    // KayKit holiday
    'present_a', 'present_b', 'banner',
  ],
  'knight-space': [
    // Kenney space-station (177) + space-kit (153)
    'satellite_dish', 'rocket', 'meteor', 'astronaut', 'panel_control',
    'space_station_module', 'antenna', 'solar_panel', 'radar',
    // Existing
    'laser_gun', 'robot_parts', 'toolbox',
  ],
  'mage-kitchen': [
    // Kenney food-kit (200)
    'pot', 'pan', 'plate', 'cup', 'knife_kitchen', 'cutting_board',
    // FoodMegaPack (91)
    'apple_fmp', 'banana_fmp', 'bread', 'cheese_wheel', 'mushroom_fmp',
    // Tiny Treats kitchen
    'bowl', 'mug', 'rolling_pin', 'oven_mitt',
  ],
  'barbarian-school': [
    // Kenney furniture-kit (140)
    'desk', 'chair', 'bookshelf', 'chalkboard', 'globe', 'lamp_desk',
    'cabinet', 'clock', 'table_round',
    // KayKit school/rpg
    'book_open', 'scroll', 'quill',
  ],
  'dungeon-concert': [
    // Kenney castle-kit (76) + graveyard-kit (91)
    'wall_stone', 'door_heavy', 'torch_wall', 'gate_iron', 'coffin',
    'tombstone', 'skull', 'chains', 'barrel_old',
    // KayKit dungeon
    'chest', 'key', 'lock', 'spider_web',
  ],
  'skeleton-pizza': [
    // Kenney food-kit + FoodMegaPack
    'pizza_slice', 'dough', 'tomato', 'cheese_slice', 'pepper',
    'oven', 'counter', 'apron', 'hat_chef',
    // Existing
    'pizza_whole', 'ingredient_rack',
  ],
  'adventurers-picnic': [
    // Kenney nature-kit (329)
    'tree_oak', 'rock_large', 'flower_red', 'bush', 'log',
    'campfire', 'tent', 'mushroom', 'grass_patch', 'river',
    // Kenney survival-kit (80)
    'backpack', 'compass', 'lantern', 'fishing_rod', 'axe',
  ],
}
```

**Note:** Exact prop names need verification against PROP_PATHS. This is a reference palette, not exhaustive — vignettes can use any registered prop.

---

## Phase 6-12: Vignette Rewrites (Per Zone)

Each zone follows the same process:
1. Read ALL existing vignettes
2. Apply 5-beat mini comic strip structure
3. Add character movement (entrances, crosses, chases, exits)
4. Add character dialogue (pixel-art emotes with text)
5. Add emotion effects (named emotions, not just Unicode)
6. Add zone-specific SFX at key beats
7. Add narrator text_popup in stages 1-2 (educational commentary)
8. Scale scene complexity to tier (subtle → spectacular)
9. Use zone-specific props from Kenney/FoodMega packs
10. Vary structure — not every vignette follows the same beat order

### Phase 6: Rewrite skeleton-birthday vignettes
**File:** `frontend/src/data/vignettes/skeleton-birthday.ts`
**Vignettes:** ~72 across 3 stages
**Theme guide:**
- Characters: skeleton_warrior (birthday boy — excited, grateful), skeleton_mage (party planner — dramatic), skeleton_minion (helper — eager), knight (guest — formal), mage (guest — magical), rogue (guest — sneaky)
- Tone: Comedic warmth, surprise, celebration
- Key emotions: `excited`, `grateful`, `surprised`, `happy`, `proud`, `crying` (happy tears)
- Key SFX: `bell` (party horn), `coin` (present opening), `impact` (surprise)
- Key props: Kenney holiday-kit (presents, decorations), Tiny Treats (cake, candles, balloons)
- Movement: Characters ARRIVE at party, bring gifts, interact with decorations
- Dialogue: Birthday wishes, gift-giving commentary, party chaos narration
- Educational narrator (stages 1-2): "You picked 'cake AND music' — that's two details! See how much more happened?"

### Phase 7: Rewrite knight-space vignettes
**File:** `frontend/src/data/vignettes/knight-space.ts`
**Vignettes:** ~64 across 3 stages
**Theme guide:**
- Characters: ranger (mission leader — calm/brave), robot (helper — literal), engineer (practical), knight (fish out of water — confused)
- Tone: Space adventure, mission urgency, teamwork
- Key emotions: `determined`, `nervous`, `shocked`, `proud`, `confused`, `excited`
- Key SFX: `laser`, `engine`, `explosion`, `whoosh`
- Key props: Kenney space-station + space-kit (consoles, rockets, satellites)
- Movement: Rush to repair stations, dodge debris, launch rockets, float in zero-g
- Dialogue: Mission briefings, "Houston we have a problem", technical jargon comedy
- Educational narrator: "You said 'fix the engine WITH a wrench' — the extra detail made the repair scene work!"

### Phase 8: Rewrite barbarian-school vignettes
**File:** `frontend/src/data/vignettes/barbarian-school.ts`
**Vignettes:** ~69 across 3 stages
**Theme guide:**
- Characters: barbarian (powerful but clumsy), clown (silly chaos), ninja (stealthy), robot (literal), caveman (confused by modern things)
- Tone: Slapstick comedy, playground chaos, physical humor
- Key emotions: `confused`, `angry`, `mischievous`, `exhausted`, `proud`, `stubborn`
- Key SFX: `bell` (school bell), `book` (reading), `impact` (crash/smash), `thud`
- Key props: Kenney furniture-kit (desks, chairs, blackboards, bookshelves)
- Movement: Wrestling, chasing, climbing, jumping, racing, dodging
- Dialogue: Trash talk, playground arguments, silly insults, teacher corrections
- Educational narrator: "You described the barbarian as 'confused' — that changed the whole scene!"

### Phase 9: Rewrite skeleton-pizza vignettes
**File:** `frontend/src/data/vignettes/skeleton-pizza.ts`
**Vignettes:** ~64 across 3 stages
**Theme guide:**
- Characters: skeleton (head chef — passionate), clown (sous chef — messy), superhero (line cook — overpowered), survivalist (prep cook — resourceful)
- Tone: Kitchen comedy, cooking disasters, food fights
- Key emotions: `hungry`, `sick`, `proud`, `shocked`, `mischievous`, `exhausted`
- Key SFX: `cooking` (sizzle, chop), `glass` (breaking), `bell` (order up), `explosion`
- Key props: Kenney food-kit + FoodMegaPack (ingredients, utensils, plates)
- Movement: Running between stations, tossing ingredients, diving from explosions
- Dialogue: "Order up!", recipe arguments, kitchen panic, taste-testing reactions
- Educational narrator: "You said HOW to cook it — 'bake slowly' makes a different pizza than 'throw in fire'!"

### Phase 10: Rewrite adventurers-picnic vignettes
**File:** `frontend/src/data/vignettes/adventurers-picnic.ts`
**Vignettes:** ~69 across 3 stages
**Theme guide:**
- Characters: ranger (tracker — observant), druid (nature-whisperer), barbarian (loud/hungry), ninja (silent scout), rogue (treasure-hunter)
- Tone: Nature wonder, mystery discovery, camping comedy
- Key emotions: `excited`, `nervous`, `hopeful`, `suspicious`, `happy`, `scared`
- Key SFX: `footstep` (grass), `whoosh` (wind), `coin` (discovery), `thud` (falling)
- Key props: Kenney nature-kit (329 items — trees, rocks, flowers), survival-kit (80 — camping gear)
- Movement: Exploring, tracking, discovering, gathering around finds, climbing
- Dialogue: "Look at this!", nature commentary, campfire stories, foraging finds
- Educational narrator: "Adding WHERE you explore changes what you find — 'under the rocks' vs 'up the tree'!"

### Phase 11: Rewrite dungeon-concert vignettes
**File:** `frontend/src/data/vignettes/dungeon-concert.ts`
**Vignettes:** ~69 across 3 stages
**Theme guide:**
- Characters: knight (brave but noisy), mage (magical solutions), rogue (lock-picker), skeleton (guard — lazy), necromancer (dramatic villain)
- Tone: Heist/escape comedy, tension + slapstick, dungeon atmosphere
- Key emotions: `scared`, `nervous`, `mischievous`, `sneaky`, `shocked`, `triumphant`
- Key SFX: `door` (creaking), `footstep` (echoing), `glass` (shattering), `impact` (fighting)
- Key props: Kenney castle-kit + graveyard-kit (walls, doors, torches, coffins, chains)
- Movement: Sneaking, fighting, fleeing, lock-picking, spell-casting
- Dialogue: Whispered plans, "Did you hear that?!", guard threats, escape banter
- Educational narrator: "You said to 'sneak quietly' — that's a specific ACTION that changed the whole approach!"

### Phase 12: Rewrite mage-kitchen vignettes
**File:** `frontend/src/data/vignettes/mage-kitchen.ts`
**Vignettes:** ~69 across 3 stages
**Theme guide:**
- Characters: mage (spell-caster — experimental), witch (potion-maker — expert), skeleton_minion (assistant — clumsy)
- Tone: Magical chaos, science experiments gone wrong, potion comedy
- Key emotions: `excited`, `shocked`, `confused`, `scared`, `proud`, `mischievous`
- Key SFX: `magic`, `glass` (potion breaking), `cooking` (bubbling), `explosion`
- Key props: Kenney food-kit (pots, utensils), FoodMegaPack (ingredients), KayKit (magic items)
- Movement: Dodging exploding pots, chasing enchanted objects, casting spells
- Dialogue: Spell incantations, "That's not supposed to happen!", magical commentary
- Educational narrator: "You combined 'fire spell' WITH 'ice potion' — mixing opposites creates chaos!"

---

## Phase 13: Build Verification + Polish

### Task 13.1: Full build check
- [ ] `npm run build` passes with zero errors
- [ ] All vignette imports resolve correctly
- [ ] Movement template imports work in all vignette files
- [ ] New SFX files load without errors
- [ ] New emoji mappings resolve to valid PNGs

### Task 13.2: Visual + Audio QA
- [ ] Test 2-3 vignettes per zone in browser
- [ ] Verify character movement feels natural (not too fast/slow)
- [ ] Verify emote text is readable
- [ ] Verify pixel-art emojis render (not just Unicode fallback)
- [ ] Verify zone-specific sounds play at appropriate moments
- [ ] Verify emotion effects use pixel-art faces
- [ ] Verify tier scaling: subtle scenes are visibly simpler than spectacular ones
- [ ] Verify narrator commentary appears in stages 1-2 only

### Task 13.3: Educational effectiveness check
- [ ] Default/vague prompts produce visibly boring scenes (1-2 actors, no movement)
- [ ] Perfect prompts produce visibly rich scenes (3+ actors, full story, effects)
- [ ] Narrator explains WHY in stages 1-2
- [ ] Emotion vocabulary is reinforced through character reactions
- [ ] Scene complexity differences are obvious to a 8-year-old

---

## Success Criteria

### Automated
- [ ] `npm run build` passes
- [ ] All imports resolve
- [ ] No TypeScript errors
- [ ] All new SFX file paths are valid

### Manual (Per Zone)
- [ ] Characters ENTER and EXIT the stage (not spawn in place)
- [ ] Characters SPEAK to each other (pixel-art emotes + text)
- [ ] Characters MOVE during scenes (walk, run, chase, dodge)
- [ ] Narrator text_popup sets scenes and comments on action (stages 1-2)
- [ ] Emotion effects show character feelings (pixel-art, not Unicode)
- [ ] Zone-specific sounds play at key beats
- [ ] Objects move, grow, fall, spin — not just appear
- [ ] Each vignette tells a mini story (setup → action → payoff)
- [ ] Scene complexity visually scales with prompt quality
- [ ] 'perfect' vignettes feel earned and dramatic
- [ ] 'funny_fail' vignettes are genuinely funny
- [ ] Variety in story structure across vignettes

### Educational
- [ ] Kids can SEE the difference between vague and specific prompts
- [ ] Emotion words in prompts produce matching character reactions
- [ ] Narrator explains prompt engineering concepts during play
- [ ] Better prompts = longer, richer, more fun scenes

---

## File Summary

**New Files (3):**
- `frontend/src/data/movement-templates.ts` — 40 reusable VignetteStep[] building blocks
- `frontend/src/data/zone-props.ts` — Zone-specific prop palettes from expanded asset library
- `docs/vignette-overhaul-roadmap.md` — Tracking document for implementation progress

**Modified Files (10):**
- `frontend/src/data/emoji-map.ts` — Add 15+ new emotion names
- `frontend/src/game/SoundManager3D.ts` — Add 15 new SFX categories
- `frontend/src/game/ScenePlayer3D.tsx` — Add 20 emotion effects + auto-SFX triggers
- `frontend/src/data/vignettes/skeleton-birthday.ts` — Rewrite ~72 vignettes
- `frontend/src/data/vignettes/knight-space.ts` — Rewrite ~64 vignettes
- `frontend/src/data/vignettes/barbarian-school.ts` — Rewrite ~69 vignettes
- `frontend/src/data/vignettes/skeleton-pizza.ts` — Rewrite ~64 vignettes
- `frontend/src/data/vignettes/adventurers-picnic.ts` — Rewrite ~69 vignettes
- `frontend/src/data/vignettes/dungeon-concert.ts` — Rewrite ~69 vignettes
- `frontend/src/data/vignettes/mage-kitchen.ts` — Rewrite ~69 vignettes

**Estimated Effort:** Very large — 13 phases, ~476 vignettes rewritten with stories + dialogue + choreography + sound + educational narrator beats.
