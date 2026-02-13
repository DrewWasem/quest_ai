#!/usr/bin/env node
/**
 * Vignette Generation Script — dev-time tool for bulk-generating vignettes.
 *
 * Uses Claude (Opus/Sonnet) to generate vignettes from a zone's slot definitions.
 * Prints TypeScript to stdout for review and manual integration.
 *
 * Usage:
 *   node frontend/scripts/generate-vignettes.mjs <zone-id> [count]
 *
 * Examples:
 *   node frontend/scripts/generate-vignettes.mjs skeleton-birthday 4
 *   node frontend/scripts/generate-vignettes.mjs mage-kitchen 6
 *
 * Requires: ANTHROPIC_API_KEY or VITE_ANTHROPIC_API_KEY env var
 */

const ZONE_CONFIGS = {
  'skeleton-birthday': {
    title: "The Skeleton's Birthday Bash",
    sentence: 'Plan a party with {FOOD} and {ENTERTAINMENT} for a {VIBE} birthday',
    slots: [
      { id: 'FOOD', label: 'Party Food', tags: ['cake', 'pizza', 'feast', 'fruit', 'candy', 'soup'] },
      { id: 'ENTERTAINMENT', label: 'Entertainment', tags: ['magic_show', 'fireworks', 'music', 'combat', 'dance', 'games'] },
      { id: 'VIBE', label: 'Party Vibe', tags: ['spooky', 'fancy', 'wild', 'epic', 'silly', 'chill'] },
    ],
    characters: ['skeleton_warrior', 'skeleton_mage', 'skeleton_minion', 'knight', 'mage', 'clown', 'necromancer'],
    props: ['table_long', 'candle_triple', 'skull', 'banner_red', 'cookie', 'pizza_slice', 'barrel', 'present_red', 'present_blue', 'pumpkin_jackolantern'],
  },
  'knight-space': {
    title: 'Space Station Rescue',
    sentence: 'Fix the station by having {CREW} do {TASK} using the {TOOL}',
    slots: [
      { id: 'CREW', label: 'Crew Member', tags: ['ranger', 'robot', 'engineer', 'knight', 'everyone'] },
      { id: 'TASK', label: 'Mission Task', tags: ['repair', 'launch', 'build', 'rescue', 'explore', 'defend'] },
      { id: 'TOOL', label: 'Equipment', tags: ['solar_panel', 'cargo', 'dome', 'rocket', 'flag', 'laser'] },
    ],
    characters: ['space_ranger', 'robot', 'engineer', 'knight'],
    props: ['space_station', 'satellite_dish', 'solar_panel', 'rocket', 'cargo_crate', 'laser_gun'],
  },
  'skeleton-pizza': {
    title: 'Pizza Kitchen Chaos',
    sentence: 'Have {CHEF} cook {DISH} in the most {STYLE} way possible',
    slots: [
      { id: 'CHEF', label: 'Chef', tags: ['skeleton', 'clown', 'superhero', 'survivalist', 'everyone'] },
      { id: 'DISH', label: 'Dish', tags: ['pizza', 'pepperoni', 'pasta', 'soup', 'cake', 'mystery'] },
      { id: 'STYLE', label: 'Cooking Style', tags: ['fast', 'fancy', 'chaotic', 'explosive', 'sneaky', 'dramatic'] },
    ],
    characters: ['skeleton_warrior', 'clown', 'superhero', 'skeleton_mage'],
    props: ['stove', 'table_kitchen', 'barrel', 'pot', 'pizza_slice', 'pizza_whole', 'tomato', 'cauldron', 'oven'],
  },
  'adventurers-picnic': {
    title: 'Forest Mystery Discovery',
    sentence: 'The {ADVENTURER} discovers a {DISCOVERY} and reacts by {REACTION}',
    slots: [
      { id: 'ADVENTURER', label: 'Adventurer', tags: ['ranger', 'druid', 'barbarian', 'ninja', 'rogue', 'whole_party'] },
      { id: 'DISCOVERY', label: 'Discovery', tags: ['magic_portal', 'treasure', 'creature', 'enchanted_food', 'ancient_ruin', 'glowing_plant'] },
      { id: 'REACTION', label: 'Reaction', tags: ['investigate', 'celebrate', 'panic', 'cast_spell', 'set_trap', 'have_picnic'] },
    ],
    characters: ['ranger', 'druid', 'barbarian', 'ninja', 'rogue', 'mage'],
    props: ['tree_oak', 'tree_pine', 'grass_patch', 'mushroom_glowing', 'chest_gold', 'rock_boulder', 'stone_circle', 'portal', 'picnic_blanket', 'bunny'],
  },
  'mage-kitchen': {
    title: 'Cooking Catastrophe',
    sentence: 'Cast {SPELL} on the {APPLIANCE} to make it {RESULT}',
    slots: [
      { id: 'SPELL', label: 'Spell', tags: ['fire_spell', 'ice_spell', 'grow_spell', 'shrink_spell', 'levitate', 'transform'] },
      { id: 'APPLIANCE', label: 'Appliance', tags: ['stove', 'fridge', 'pot', 'pan', 'sink', 'oven'] },
      { id: 'RESULT', label: 'Result', tags: ['cook_perfectly', 'explode', 'dance', 'multiply', 'calm_down', 'go_wild'] },
    ],
    characters: ['mage', 'skeleton_mage'],
    props: ['stove', 'counter', 'pot', 'fridge', 'pan', 'plate', 'cauldron', 'stew_pot'],
  },
  'barbarian-school': {
    title: 'Monster Recess',
    sentence: 'At recess, {MONSTER} plays {ACTIVITY} on the {EQUIPMENT}',
    slots: [
      { id: 'MONSTER', label: 'Monster', tags: ['barbarian', 'clown', 'ninja', 'robot', 'caveman', 'everyone'] },
      { id: 'ACTIVITY', label: 'Activity', tags: ['tag', 'wrestling', 'hide_seek', 'race', 'jumping', 'climbing'] },
      { id: 'EQUIPMENT', label: 'Equipment', tags: ['slide', 'swing', 'seesaw', 'sandbox', 'merry_go_round', 'field'] },
    ],
    characters: ['barbarian', 'clown', 'ninja', 'robot', 'caveman'],
    props: ['seesaw', 'swing_set', 'sandbox', 'grass_patch', 'cone_traffic', 'fence_wood', 'tree_cartoon', 'playground'],
  },
  'dungeon-concert': {
    title: 'Dungeon Escape',
    sentence: 'The {HERO} tries to {ESCAPE_METHOD} past the {OBSTACLE}',
    slots: [
      { id: 'HERO', label: 'Hero', tags: ['knight', 'mage', 'rogue', 'skeleton', 'necromancer', 'team'] },
      { id: 'ESCAPE_METHOD', label: 'Escape Method', tags: ['sneak', 'fight', 'magic', 'lockpick', 'distract', 'smash'] },
      { id: 'OBSTACLE', label: 'Obstacle', tags: ['guard', 'locked_door', 'trap', 'darkness', 'puzzle', 'skeleton_army'] },
    ],
    characters: ['knight', 'mage', 'rogue', 'skeleton_warrior', 'skeleton_mage', 'skeleton_minion', 'necromancer', 'barbarian'],
    props: ['wall_stone', 'torch_wall', 'door_iron', 'lock', 'pillar_stone', 'crate_wood', 'barrel', 'dungeon_wall'],
  },
};

const MODEL = 'claude-sonnet-4-5-20250929';

async function main() {
  const [,, zoneId, countStr] = process.argv;

  if (!zoneId || !ZONE_CONFIGS[zoneId]) {
    console.error('Usage: node generate-vignettes.mjs <zone-id> [count]');
    console.error('Available zones:', Object.keys(ZONE_CONFIGS).join(', '));
    process.exit(1);
  }

  const count = parseInt(countStr ?? '4', 10);
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error('Error: Set ANTHROPIC_API_KEY or VITE_ANTHROPIC_API_KEY');
    process.exit(1);
  }

  const zone = ZONE_CONFIGS[zoneId];
  const prefix = zoneId.replace(/-/g, '_');

  const slotsDesc = zone.slots.map(s =>
    `  - ${s.id} (${s.label}): [${s.tags.join(', ')}]`
  ).join('\n');

  const systemPrompt = `You generate pre-built vignette data for a kids' game (ages 8-10).

ZONE: ${zone.title}
TEMPLATE: "${zone.sentence}"

SLOTS:
${slotsDesc}

AVAILABLE CHARACTERS: ${zone.characters.join(', ')}
AVAILABLE PROPS: ${zone.props.join(', ')}

AVAILABLE ACTIONS: spawn, spawn_character, move, animate, react, emote, sfx, camera_shake, camera_zoom, text_popup, screen_flash, crowd_react, spawn_rain, delay

AVAILABLE ANIMATIONS: idle, walk, celebrate, taunt, cast_spell, cast_long, spin_attack, sword_slash, get_hit, die_flop, die_dramatic, jump_idle, dodge_back, wave, throw, interact, pushups, sit_down, skel_spawn, spawn_air, spawn_ground
AVAILABLE EFFECTS: confetti-burst, explosion-cartoon, sparkle-magic, stars-spin, fire-sneeze, hearts-float, sad-cloud, laugh-tears, question-marks
AVAILABLE SFX: spawn, react, success, fail, move

Generate ${count} vignettes as a JSON array. Each vignette:
{
  "id": "${prefix}_1_<type>_<tag1>_<tag2>",
  "description": "1-sentence summary of what happens",
  "trigger": { "<slot_id_lowercase>": "<tag_or_*>" },
  "tier": "subtle|moderate|spectacular|absolute_chaos",
  "promptScore": "perfect|partial|chaotic|funny_fail",
  "steps": [
    { "parallel": [<actions>], "delayAfter": 0.5 }
  ],
  "feedback": {
    "title": "emoji TITLE emoji",
    "message": "Why this combo worked or didn't (2 sentences max)",
    "skillTaught": "Specificity|Detail|Creativity|Context|Focus",
    "tip": "1 sentence game advice"
  }
}

RULES:
- Mix: 1-2 perfect (exact 3-tag match), 1 chaotic (2-tag with *), 1 partial (1-tag with *)
- Use ONLY characters and props from the available lists above
- Each vignette: 4-9 steps, 2-6 parallel actions per step
- Perfect vignettes: spectacular tier, 7-9 steps
- Chaotic: absolute_chaos tier, 6-8 steps
- Partial: moderate tier, 4-5 steps
- Return ONLY the JSON array, no markdown fences`;

  const userMessage = `Generate ${count} vignettes for the ${zone.title} zone now.`;

  console.error(`Generating ${count} vignettes for ${zoneId}...`);

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8192,
      messages: [{ role: 'user', content: userMessage }],
      system: systemPrompt,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    console.error(`API error ${resp.status}:`, err);
    process.exit(1);
  }

  const data = await resp.json();
  const text = data.content?.[0]?.text ?? '';

  // Extract JSON array
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    console.error('Failed to parse JSON from response:');
    console.error(text);
    process.exit(1);
  }

  let vignettes;
  try {
    vignettes = JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error('JSON parse error:', e.message);
    console.error(text);
    process.exit(1);
  }

  // Output as TypeScript
  console.log(`// Generated vignettes for ${zoneId} (${new Date().toISOString()})`);
  console.log(`// Review and integrate into frontend/src/data/vignettes/${zoneId}.ts`);
  console.log('');
  console.log("import type { Vignette } from '../../types/madlibs';");
  console.log('');
  console.log(`export const GENERATED_${prefix.toUpperCase()}: Vignette[] = ${JSON.stringify(vignettes, null, 2)};`);

  console.error(`Done! Generated ${vignettes.length} vignettes.`);
  console.error(`Usage: ${data.usage?.input_tokens ?? '?'} input + ${data.usage?.output_tokens ?? '?'} output tokens`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
