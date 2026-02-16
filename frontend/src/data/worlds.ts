/**
 * World Definitions — sandbox world configs for all 8 quest zones.
 *
 * Each world defines its characters, props, animations, effects, sounds,
 * and the system prompt template used to call Claude for sandbox play.
 * Replaces the old per-task prompt files and story/stage system.
 */

export interface WorldConfig {
  id: string;
  label: string;
  emoji: string;
  color: string;
  hook: string;
  placeholder: string;
  flavor: string;
  characters: string[];
  props: string[];
  animations: string[];
  effects: string[];
  sounds: string[];
}

export const WORLDS: Record<string, WorldConfig> = {
  'skeleton-birthday': {
    id: 'skeleton-birthday',
    label: "Skeleton's Birthday Bash",
    emoji: '\u{1F480}',
    color: '#4A90D9',
    hook: "It's the Skeleton's birthday and nobody knows what to do! You're in charge!",
    placeholder: "What should happen at the skeleton's birthday party?",
    flavor: "Skeletons keep losing bones at the worst moment, presents explode, the cake is always in danger. Physical comedy!",
    characters: ['skeleton_warrior', 'skeleton_mage', 'knight', 'mage', 'clown', 'robot'],
    props: ['cake', 'present_A_red', 'present_B_blue', 'table_long', 'chair', 'balloon', 'torch', 'barrel', 'banner_blue', 'banner_red'],
    animations: [
      'Idle_A', 'Idle_B', 'Walking_A', 'Running_A', 'Cheering', 'Waving',
      'Sit_Chair_Down', 'Sit_Chair_Idle', 'Sit_Floor_Down', 'Sit_Floor_Idle',
      'Hit_A', 'Interact', 'PickUp', 'Throw', 'Death_A',
      'Skeletons_Taunt', 'Skeletons_Taunt_Longer', 'Skeletons_Idle', 'Skeletons_Awaken_Floor', 'Skeletons_Death_Resurrect',
      'Jump_Full_Short', 'Jump_Full_Long', 'Push_Ups', 'Headbutt',
      'Lie_Down', 'Lie_Idle', 'Dodge_Backward', 'Spawn_Air',
      'Ranged_Magic_Spellcasting', 'Ranged_Magic_Summon',
    ],
    effects: ['confetti-burst', 'explosion-cartoon', 'hearts-float', 'stars-spin', 'question-marks', 'laugh-tears', 'sparkle-magic', 'sad-cloud'],
    sounds: ['spawn', 'move', 'react', 'success', 'partial', 'fail'],
  },

  'knight-space': {
    id: 'knight-space',
    label: 'Space Station Emergency',
    emoji: '\u{1F680}',
    color: '#3B82F6',
    hook: "The space station is drifting and the robots are floating around doing nothing! Fix this mess!",
    placeholder: "How do you fix the space station? Who does what?",
    flavor: "Zero-gravity mishaps, robots malfunction at the worst time, dramatic countdowns that go wrong. Sci-fi slapstick!",
    characters: ['space_ranger', 'robot', 'robot_two', 'engineer', 'knight'],
    props: ['rocket', 'basemodule_A', 'cargo_A', 'solarpanel', 'dome', 'flag'],
    animations: [
      'Idle_A', 'Idle_B', 'Walking_A', 'Running_A', 'Running_B', 'Cheering', 'Waving',
      'Interact', 'PickUp', 'Throw', 'Hammer', 'Hammering',
      'Jump_Full_Short', 'Jump_Idle', 'Jump_Full_Long', 'Jump_Start', 'Jump_Land',
      'Work_A', 'Work_B', 'Working_A', 'Working_B',
      'Hit_A', 'Death_A', 'Dodge_Backward', 'Dodge_Forward',
      'Push_Ups', 'Sit_Chair_Down', 'Sit_Chair_Idle',
      'Ranged_2H_Shoot', 'Ranged_2H_Aiming',
    ],
    effects: ['confetti-burst', 'explosion-cartoon', 'stars-spin', 'question-marks', 'sparkle-magic', 'fire-sneeze'],
    sounds: ['spawn', 'move', 'react', 'success', 'partial', 'fail'],
  },

  'barbarian-school': {
    id: 'barbarian-school',
    label: 'Monster Recess',
    emoji: '\u{1F3C3}',
    color: '#EF4444',
    hook: "The monsters got to the playground and recess is WILD! What happens?",
    placeholder: "What happens at monster recess? Who plays what?",
    flavor: "Over-the-top competitive energy, monsters WAY too intense about playground games, things break. Sports comedy!",
    characters: ['barbarian', 'clown', 'ninja', 'robot', 'caveman'],
    props: ['slide', 'swing', 'seesaw', 'sandbox', 'merry_go_round', 'fence', 'tree'],
    animations: [
      'Idle_A', 'Idle_B', 'Walking_A', 'Running_A', 'Running_B', 'Cheering', 'Waving',
      'Jump_Full_Short', 'Jump_Full_Long', 'Jump_Start', 'Jump_Land',
      'Interact', 'PickUp', 'Throw', 'Push_Ups', 'Headbutt', 'Sit_Ups',
      'Sit_Floor_Down', 'Sit_Floor_Idle', 'Lie_Down', 'Lie_Idle',
      'Hit_A', 'Hit_B', 'Death_A', 'Dodge_Backward', 'Dodge_Forward',
      'Melee_Unarmed_Attack_Kick', 'Melee_Unarmed_Attack_Punch_A',
      'Crawling', 'Sneaking',
    ],
    effects: ['confetti-burst', 'explosion-cartoon', 'laugh-tears', 'question-marks', 'stars-spin', 'hearts-float'],
    sounds: ['spawn', 'move', 'react', 'success', 'partial', 'fail'],
  },

  'skeleton-pizza': {
    id: 'skeleton-pizza',
    label: 'Pizza Pandemonium',
    emoji: '\u{1F355}',
    color: '#F5C842',
    hook: "Orders are flying in and nobody can cook! Run this restaurant before it burns down!",
    placeholder: "How do you save the restaurant? Who cooks what?",
    flavor: "Kitchen disasters, dough flying everywhere, wrong ingredients, orders getting mixed up. Cooking show chaos!",
    characters: ['skeleton_warrior', 'clown', 'superhero', 'survivalist'],
    props: ['pizza', 'pizza_pepperoni', 'oven', 'plate', 'pan', 'pot', 'stove', 'chair_A'],
    animations: [
      'Idle_A', 'Idle_B', 'Walking_A', 'Running_A', 'Running_B', 'Cheering', 'Waving',
      'Interact', 'PickUp', 'Throw', 'Work_A', 'Work_B', 'Working_A', 'Working_B',
      'Skeletons_Taunt', 'Skeletons_Idle', 'Skeletons_Awaken_Floor',
      'Hit_A', 'Hit_B', 'Jump_Full_Short', 'Death_A',
      'Dodge_Backward', 'Dodge_Forward', 'Headbutt',
      'Sit_Chair_Down', 'Sit_Chair_Idle',
    ],
    effects: ['confetti-burst', 'explosion-cartoon', 'fire-sneeze', 'laugh-tears', 'question-marks', 'stars-spin'],
    sounds: ['spawn', 'move', 'react', 'success', 'partial', 'fail'],
  },

  'adventurers-picnic': {
    id: 'adventurers-picnic',
    label: 'Forest Mystery',
    emoji: '\u{1F332}',
    color: '#22C55E',
    hook: "The adventurers found a strange clearing in the forest! Something magical is happening...",
    placeholder: "What magical thing is happening in the forest? What do the adventurers do?",
    flavor: "Nature comes alive unexpectedly, magical surprises, animals join in, mysterious glowing things. Wonder + comedy!",
    characters: ['ranger', 'druid', 'barbarian', 'ninja', 'rogue'],
    props: ['tree', 'rock', 'bush', 'torch', 'bench', 'picnic_blanket', 'apple', 'basket'],
    animations: [
      'Idle_A', 'Idle_B', 'Walking_A', 'Running_A', 'Cheering', 'Waving',
      'Interact', 'PickUp', 'Throw', 'Sneaking', 'Crouching', 'Crawling',
      'Ranged_Bow_Draw', 'Ranged_Bow_Release', 'Ranged_Bow_Aiming_Idle',
      'Ranged_Magic_Spellcasting', 'Ranged_Magic_Summon',
      'Sit_Floor_Down', 'Sit_Floor_Idle', 'Lie_Down', 'Lie_Idle', 'Lie_StandUp',
      'Fishing_Cast', 'Fishing_Idle', 'Fishing_Catch',
      'Jump_Full_Short', 'Hit_A', 'Death_A', 'Dodge_Backward',
    ],
    effects: ['confetti-burst', 'sparkle-magic', 'hearts-float', 'stars-spin', 'question-marks', 'splash', 'sad-cloud'],
    sounds: ['spawn', 'move', 'react', 'success', 'partial', 'fail'],
  },

  'dungeon-concert': {
    id: 'dungeon-concert',
    label: 'Dungeon Escape',
    emoji: '\u{1F5DD}',
    color: '#F97316',
    hook: "You're trapped in a dungeon! There's a locked chest, a sleeping guard, and a secret door. What do you do?",
    placeholder: "How do you escape the dungeon? What's your plan?",
    flavor: "Plans go hilariously wrong, traps backfire, the sleeping guard keeps almost waking up. Heist comedy!",
    characters: ['knight', 'mage', 'rogue', 'skeleton_warrior', 'necromancer'],
    props: ['chest', 'barrel', 'torch', 'banner_blue', 'banner_red', 'table_long', 'bone', 'book', 'potion'],
    animations: [
      'Idle_A', 'Idle_B', 'Walking_A', 'Running_A', 'Running_B', 'Cheering', 'Waving',
      'Interact', 'PickUp', 'Throw', 'Sneaking', 'Crouching', 'Crawling',
      'Melee_1H_Attack_Chop', 'Melee_1H_Attack_Stab', 'Melee_1H_Attack_Spin',
      'Melee_Block', 'Melee_Block_Hit',
      'Ranged_Magic_Spellcasting', 'Ranged_Magic_Spellcasting_Long', 'Ranged_Magic_Shoot', 'Ranged_Magic_Summon',
      'Lockpick', 'Lockpicking',
      'Skeletons_Awaken_Floor', 'Skeletons_Taunt', 'Skeletons_Death_Resurrect',
      'Hit_A', 'Hit_B', 'Death_A', 'Dodge_Backward', 'Dodge_Forward',
      'Jump_Full_Short', 'Sit_Floor_Down',
    ],
    effects: ['confetti-burst', 'explosion-cartoon', 'sparkle-magic', 'stars-spin', 'question-marks', 'fire-sneeze', 'sad-cloud'],
    sounds: ['spawn', 'move', 'react', 'success', 'partial', 'fail'],
  },

  'mage-kitchen': {
    id: 'mage-kitchen',
    label: 'Cooking Catastrophe',
    emoji: '\u{1F9D9}',
    color: '#A855F7',
    hook: "The mage tried to cook with magic and now the kitchen is ALIVE! Tame it!",
    placeholder: "How does the mage tame the wild kitchen? What spells help?",
    flavor: "Spells backfire in funny ways, kitchen appliances rebel, food comes alive and fights back. Magical slapstick!",
    characters: ['mage', 'witch', 'caveman', 'superhero', 'skeleton_minion'],
    props: ['stove', 'sink', 'fridge', 'pot', 'pan', 'cake', 'pie', 'bread', 'plate'],
    animations: [
      'Idle_A', 'Idle_B', 'Walking_A', 'Running_A', 'Running_B', 'Cheering', 'Waving',
      'Interact', 'PickUp', 'Throw', 'Work_A', 'Working_A',
      'Ranged_Magic_Spellcasting', 'Ranged_Magic_Spellcasting_Long', 'Ranged_Magic_Shoot', 'Ranged_Magic_Summon', 'Ranged_Magic_Raise',
      'Hit_A', 'Hit_B', 'Death_A', 'Jump_Full_Short',
      'Dodge_Backward', 'Dodge_Forward', 'Headbutt',
      'Skeletons_Idle', 'Skeletons_Awaken_Floor',
      'Sit_Floor_Down', 'Lie_Down',
    ],
    effects: ['confetti-burst', 'explosion-cartoon', 'sparkle-magic', 'fire-sneeze', 'stars-spin', 'question-marks', 'laugh-tears', 'splash'],
    sounds: ['spawn', 'move', 'react', 'success', 'partial', 'fail'],
  },

  'free-play': {
    id: 'free-play',
    label: 'Creative Playground',
    emoji: '\u{1F3A8}',
    color: '#F59E0B',
    hook: "Welcome to the Creative Playground! Every character, every prop, every effect — it's ALL yours!",
    placeholder: 'Describe any scene you can imagine — anything goes!',
    flavor: "Pure chaos encouraged. Mix characters from all zones. The weirder, the better!",
    characters: [
      'knight', 'barbarian', 'mage', 'ranger', 'rogue', 'rogue_hooded', 'druid', 'engineer',
      'skeleton_warrior', 'skeleton_mage', 'skeleton_rogue', 'skeleton_minion', 'skeleton_golem', 'necromancer',
      'space_ranger', 'ninja', 'clown', 'robot', 'robot_two', 'survivalist',
      'witch', 'vampire', 'black_knight', 'superhero', 'caveman', 'frost_golem',
    ],
    props: [
      'cake', 'present_A_red', 'present_B_blue', 'table_long', 'chair', 'torch', 'barrel',
      'pizza_pepperoni', 'stove', 'pot', 'pan', 'chest', 'banner_blue', 'banner_red',
      'tree', 'rock', 'bench', 'slide', 'guitar', 'drums', 'microphone',
    ],
    animations: [
      'Idle_A', 'Idle_B', 'Walking_A', 'Running_A', 'Running_B', 'Cheering', 'Waving',
      'Interact', 'PickUp', 'Throw', 'Hit_A', 'Hit_B', 'Death_A',
      'Jump_Full_Short', 'Jump_Full_Long', 'Dodge_Backward', 'Dodge_Forward',
      'Sit_Chair_Down', 'Sit_Chair_Idle', 'Sit_Floor_Down', 'Sit_Floor_Idle',
      'Lie_Down', 'Lie_Idle', 'Push_Ups', 'Headbutt', 'Sneaking', 'Crawling',
      'Ranged_Magic_Spellcasting', 'Ranged_Magic_Shoot', 'Ranged_Magic_Summon',
      'Melee_1H_Attack_Chop', 'Melee_2H_Attack_Spin', 'Melee_Block',
      'Skeletons_Taunt', 'Skeletons_Idle', 'Skeletons_Awaken_Floor', 'Skeletons_Death_Resurrect',
      'Work_A', 'Hammer', 'Lockpicking', 'Fishing_Cast',
    ],
    effects: ['confetti-burst', 'explosion-cartoon', 'hearts-float', 'stars-spin', 'question-marks', 'laugh-tears', 'sparkle-magic', 'sad-cloud', 'fire-sneeze', 'splash'],
    sounds: ['spawn', 'move', 'react', 'success', 'partial', 'fail'],
  },
};

/**
 * Generate the sandbox system prompt for a given zone.
 * Single parameterized template — replaces 7 separate prompt files.
 */
export function getWorldPrompt(zoneId: string): string {
  const world = WORLDS[zoneId];
  if (!world) {
    console.warn(`[worlds] Unknown zone "${zoneId}" — falling back to skeleton-birthday`);
    return getWorldPrompt('skeleton-birthday');
  }

  return `You are the game engine for "QuestAI," a children's sandbox game (ages 7-11). You direct mini-plays — little 3D theater scenes with multiple characters acting out what the kid describes.

CURRENT WORLD: ${world.label}
SCENARIO: ${world.hook}
COMEDY STYLE: ${world.flavor}

This is a SANDBOX — every input produces something. Think like a theater director:
- Vague prompts → funny chaos (characters confused, doing random silly things)
- Specific prompts → impressive choreographed scenes with multiple characters

YOUR JOB: Create an entertaining mini-play following the 3-act structure below. Make characters TALK to each other via emotes. Use timing, camera effects, and dramatic entrances. NEVER just spawn characters standing around — that's boring.

Return ONLY a JSON object. No markdown, no explanation.

JSON FORMAT:
{
  "success_level": "FULL_SUCCESS" or "PARTIAL_SUCCESS" or "FUNNY_FAIL",
  "narration": "One fun sentence (under 20 words)",
  "actions": [ ... ],
  "prompt_feedback": "Encouraging feedback with one concrete tip",
  "guide_hint": "Friendly suggestion for what to try next",
  "prompt_analysis": {
    "has_character": true, "has_action": true, "has_sequence": false,
    "has_detail": false, "has_multi_char": false, "has_environment": false
  }
}

SCENE STRUCTURE (follow this for every response):
ACT 1 — SETUP: Spawn 2-3 characters from off-stage with dramatic entrances. Give them emotes/speech bubbles to establish the scene. (3-5 actions)
ACT 2 — ACTION: The main thing happens. Characters interact, things go wrong or right. Use move, animate, grow, camera_shake, text_popup. (4-8 actions)
ACT 3 — FINALE: Big finish. Use crowd_react, confetti, spawn_rain, screen_flash. Characters celebrate or react. (3-5 actions)

ACTION REQUIREMENTS:
- FULL_SUCCESS: 12-16 actions. MUST include: 3+ emotes, 1 text_popup, 1 crowd_react, 1 camera effect (camera_shake or screen_flash or spawn_rain)
- PARTIAL_SUCCESS: 8-12 actions. MUST include: 2+ emotes, 1 text_popup
- FUNNY_FAIL: 8-12 actions. MUST include: 3+ emotes (confused/silly dialogue), question-marks react

EVERY scene MUST have:
- At least 2 emote actions (characters TALKING to each other with speech bubbles)
- At least 3 different characters
- delay_ms on most actions (scenes where everything happens at once are boring)

ACTION TYPES:

BASIC:
{ "type": "spawn", "target": "character_or_prop", "position": "left" }
{ "type": "move", "target": "actor", "to": "right", "style": "arc", "delay_ms": 500 }
{ "type": "animate", "target": "character", "anim": "Cheering", "delay_ms": 200 }
{ "type": "react", "effect": "confetti-burst", "position": "center", "delay_ms": 100 }

ADVANCED — use these to make scenes come alive:
{ "type": "emote", "target": "character", "emoji": "😱", "text": "Oh no!", "delay_ms": 300 }
{ "type": "camera_shake", "intensity": 0.5, "duration": 0.5 }
{ "type": "text_popup", "text": "BOOM!", "position": "center", "size": "huge", "delay_ms": 200 }
{ "type": "screen_flash", "color": "#F5C842", "duration": 0.3 }
{ "type": "crowd_react", "characters": "all", "anim": "Cheering" }
{ "type": "spawn_rain", "asset": "cake", "count": 6, "area": "wide" }
{ "type": "grow", "target": "actor", "scale": 2.5, "duration_ms": 600 }
{ "type": "shrink_pop", "target": "actor", "effect": "explosion-cartoon" }
{ "type": "remove", "target": "actor" }
{ "type": "wait", "duration_ms": 500 }

FULL_SUCCESS EXAMPLE (dungeon escape — "the rogue picks the lock while the mage distracts the guard"):
[
  {"type":"spawn","target":"skeleton_warrior","position":"center"},
  {"type":"animate","target":"skeleton_warrior","anim":"Skeletons_Idle"},
  {"type":"emote","target":"skeleton_warrior","emoji":"😴","text":"Zzzzz...","delay_ms":300},
  {"type":"spawn","target":"rogue","position":"off-left","delay_ms":600},
  {"type":"move","target":"rogue","to":"left","style":"linear","delay_ms":200},
  {"type":"emote","target":"rogue","emoji":"🤫","text":"I'll pick the lock...","delay_ms":400},
  {"type":"spawn","target":"mage","position":"off-right","delay_ms":500},
  {"type":"move","target":"mage","to":"right","style":"linear","delay_ms":200},
  {"type":"animate","target":"mage","anim":"Ranged_Magic_Spellcasting","delay_ms":300},
  {"type":"emote","target":"mage","emoji":"✨","text":"Look over here, guard!","delay_ms":400},
  {"type":"screen_flash","color":"#A855F7","duration":0.3,"delay_ms":200},
  {"type":"animate","target":"skeleton_warrior","anim":"Skeletons_Awaken_Floor","delay_ms":300},
  {"type":"camera_shake","intensity":0.4,"duration":0.4,"delay_ms":100},
  {"type":"animate","target":"rogue","anim":"Lockpicking","delay_ms":400},
  {"type":"text_popup","text":"FREEDOM!","position":"center","size":"huge","delay_ms":500},
  {"type":"crowd_react","characters":"all","anim":"Cheering","delay_ms":300},
  {"type":"react","effect":"confetti-burst","position":"center","delay_ms":200}
]

PARTIAL_SUCCESS EXAMPLE (pizza kitchen — "make a pizza"):
[
  {"type":"spawn","target":"skeleton_warrior","position":"center"},
  {"type":"emote","target":"skeleton_warrior","emoji":"🍕","text":"A pizza? Okay...","delay_ms":400},
  {"type":"spawn","target":"clown","position":"off-left","delay_ms":600},
  {"type":"move","target":"clown","to":"left","style":"bounce","delay_ms":200},
  {"type":"emote","target":"clown","emoji":"🤔","text":"What kind of pizza?","delay_ms":400},
  {"type":"spawn","target":"superhero","position":"off-right","delay_ms":500},
  {"type":"move","target":"superhero","to":"right","style":"bounce","delay_ms":200},
  {"type":"animate","target":"skeleton_warrior","anim":"Work_A","delay_ms":300},
  {"type":"emote","target":"superhero","emoji":"😬","text":"Is it supposed to smoke?","delay_ms":500},
  {"type":"react","effect":"fire-sneeze","position":"center","delay_ms":300},
  {"type":"text_popup","text":"ORDER UP!","position":"center","size":"huge","delay_ms":400},
  {"type":"react","effect":"question-marks","position":"center","delay_ms":300}
]

CHOREOGRAPHY RULES (you MUST follow these):
1. NEVER spawn all characters at once — stagger entrances with delay_ms (400-800ms apart)
2. Characters MUST talk via emotes — at least 2 speech bubbles per scene
3. Use text_popup for dramatic moments ("SURPRISE!", "OH NO!", "VICTORY!")
4. End FULL_SUCCESS with: crowd_react Cheering + react confetti-burst + one of (spawn_rain, screen_flash)
5. FUNNY_FAIL characters should argue/be confused via emotes, NOT just stand there
6. Use grow for comedy (make a cake giant-sized), shrink_pop for exits (character shrinks and pops away)
7. camera_shake after big impacts (explosions, crashes, dramatic reveals)

CHARACTERS ON STAGE (use these exact names):
${world.characters.map(c => `- ${c}`).join('\n')}

AVAILABLE PROPS:
${world.props.map(p => `- ${p}`).join('\n')}

ANIMATIONS:
${world.animations.map(a => `- ${a}`).join('\n')}

EFFECTS:
${world.effects.map(e => `- ${e}`).join('\n')}

POSITIONS: left, center, right, top, bottom, off-left, off-right, off-top
MOVE STYLES: linear, arc, bounce, float

RULES:
- Maximum 16 actions
- Use at least 3 characters, even for vague inputs
- ONLY use exact names from the lists above
- narration: fun, under 20 words
- FUNNY_FAIL: silly chaos, NEVER mean
- RESPOND WITH ONLY THE JSON OBJECT.`;
}
