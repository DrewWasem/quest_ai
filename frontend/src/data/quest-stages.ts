/**
 * Quest Stage Definitions — template sentences, slots, default options, and vignette links.
 *
 * Each quest zone has 1-3 stages. Stage 1 is always defined; stages 2-3 added as content grows.
 * Claude generates fresh options on stage entry; defaultOptions are the static fallback.
 */

import type { QuestStage } from '../types/madlibs';
import { SKELETON_BIRTHDAY_STAGE_1, SKELETON_BIRTHDAY_DEFAULT, SKELETON_BIRTHDAY_STAGE_2, SKELETON_BIRTHDAY_DEFAULT_2, SKELETON_BIRTHDAY_STAGE_3, SKELETON_BIRTHDAY_DEFAULT_3 } from './vignettes/skeleton-birthday';
import { KNIGHT_SPACE_STAGE_1, KNIGHT_SPACE_DEFAULT, KNIGHT_SPACE_STAGE_2, KNIGHT_SPACE_DEFAULT_2, KNIGHT_SPACE_STAGE_3, KNIGHT_SPACE_DEFAULT_3 } from './vignettes/knight-space';
import { BARBARIAN_SCHOOL_STAGE_1, BARBARIAN_SCHOOL_DEFAULT, BARBARIAN_SCHOOL_STAGE_2, BARBARIAN_SCHOOL_DEFAULT_2, BARBARIAN_SCHOOL_STAGE_3, BARBARIAN_SCHOOL_DEFAULT_3 } from './vignettes/barbarian-school';
import { SKELETON_PIZZA_STAGE_1, SKELETON_PIZZA_DEFAULT, SKELETON_PIZZA_STAGE_2, SKELETON_PIZZA_DEFAULT_2, SKELETON_PIZZA_STAGE_3, SKELETON_PIZZA_DEFAULT_3 } from './vignettes/skeleton-pizza';
import { ADVENTURERS_PICNIC_STAGE_1, ADVENTURERS_PICNIC_DEFAULT, ADVENTURERS_PICNIC_STAGE_2, ADVENTURERS_PICNIC_DEFAULT_2, ADVENTURERS_PICNIC_STAGE_3, ADVENTURERS_PICNIC_DEFAULT_3 } from './vignettes/adventurers-picnic';
import { DUNGEON_CONCERT_STAGE_1, DUNGEON_CONCERT_DEFAULT, DUNGEON_CONCERT_STAGE_2, DUNGEON_CONCERT_DEFAULT_2, DUNGEON_CONCERT_STAGE_3, DUNGEON_CONCERT_DEFAULT_3 } from './vignettes/dungeon-concert';
import { MAGE_KITCHEN_STAGE_1, MAGE_KITCHEN_DEFAULT, MAGE_KITCHEN_STAGE_2, MAGE_KITCHEN_DEFAULT_2, MAGE_KITCHEN_STAGE_3, MAGE_KITCHEN_DEFAULT_3 } from './vignettes/mage-kitchen';

// ─── SKELETON BIRTHDAY ──────────────────────────────────────────────────────

export const SKELETON_BIRTHDAY_STAGES: QuestStage[] = [
  {
    id: 'skeleton-birthday-1',
    questId: 'skeleton-birthday',
    stageNumber: 1,
    title: "The Skeleton's Birthday Bash",
    intro: "It's the Skeleton's birthday and nobody knows what to do! You're in charge of planning the party!",
    template: {
      sentence: "Plan a party with {FOOD} and {ENTERTAINMENT} for a {VIBE} birthday",
      slots: [
        {
          id: 'FOOD',
          label: 'Party Food',
          icon: '🍽️',
          allowedTags: ['cake', 'pizza', 'feast', 'fruit', 'candy', 'soup'],
          defaultOptions: [
            { label: 'Birthday Cake', tag: 'cake', icon: '🎂' },
            { label: 'Pizza Party', tag: 'pizza', icon: '🍕' },
            { label: 'Royal Feast', tag: 'feast', icon: '🍖' },
            { label: 'Fruit Platter', tag: 'fruit', icon: '🍎' },
            { label: 'Candy Mountain', tag: 'candy', icon: '🍬' },
            { label: 'Bone Soup', tag: 'soup', icon: '🍲' },
          ],
        },
        {
          id: 'ENTERTAINMENT',
          label: 'Entertainment',
          icon: '🎪',
          allowedTags: ['magic_show', 'fireworks', 'music', 'combat', 'dance', 'games'],
          defaultOptions: [
            { label: 'Magic Show', tag: 'magic_show', icon: '🪄' },
            { label: 'Fireworks', tag: 'fireworks', icon: '🎆' },
            { label: 'Live Music', tag: 'music', icon: '🎵' },
            { label: 'Arena Combat', tag: 'combat', icon: '⚔️' },
            { label: 'Dance-Off', tag: 'dance', icon: '💃' },
            { label: 'Party Games', tag: 'games', icon: '🎯' },
          ],
        },
        {
          id: 'VIBE',
          label: 'Party Vibe',
          icon: '✨',
          allowedTags: ['spooky', 'epic', 'wild', 'silly', 'fancy', 'chill'],
          defaultOptions: [
            { label: 'Spooky', tag: 'spooky', icon: '👻' },
            { label: 'Epic', tag: 'epic', icon: '⚡' },
            { label: 'Wild', tag: 'wild', icon: '🔥' },
            { label: 'Silly', tag: 'silly', icon: '🤪' },
            { label: 'Fancy', tag: 'fancy', icon: '🎩' },
            { label: 'Chill', tag: 'chill', icon: '😎' },
          ],
        },
      ],
    },
    vignettes: SKELETON_BIRTHDAY_STAGE_1,
    defaultVignette: SKELETON_BIRTHDAY_DEFAULT,
    successTags: [['cake', 'magic_show', 'spooky'], ['feast', 'fireworks', 'epic']],
  },
  {
    id: 'skeleton-birthday-2',
    questId: 'skeleton-birthday',
    stageNumber: 2,
    title: "Party Planning Pro",
    intro: "The skeleton loved the first party! But now it wants something MORE specific. How BIG? What MOOD?",
    template: {
      sentence: "Plan a {SIZE} party with {FOOD} and {ENTERTAINMENT} for a {VIBE} birthday where the skeleton feels {MOOD}",
      slots: [
        {
          id: 'SIZE',
          label: 'Party Size',
          icon: '📏',
          allowedTags: ['tiny', 'normal', 'giant', 'enormous'],
          defaultOptions: [
            { label: 'Tiny', tag: 'tiny', icon: '🔍' },
            { label: 'Normal', tag: 'normal', icon: '👥' },
            { label: 'Giant', tag: 'giant', icon: '🦖' },
            { label: 'ENORMOUS', tag: 'enormous', icon: '🌍' },
          ],
        },
        {
          id: 'FOOD',
          label: 'Party Food',
          icon: '🍽️',
          allowedTags: ['cake', 'pizza', 'feast', 'fruit', 'candy', 'soup'],
          defaultOptions: [
            { label: 'Birthday Cake', tag: 'cake', icon: '🎂' },
            { label: 'Pizza Party', tag: 'pizza', icon: '🍕' },
            { label: 'Royal Feast', tag: 'feast', icon: '🍖' },
            { label: 'Fruit Platter', tag: 'fruit', icon: '🍎' },
            { label: 'Candy Mountain', tag: 'candy', icon: '🍬' },
            { label: 'Bone Soup', tag: 'soup', icon: '🍲' },
          ],
        },
        {
          id: 'ENTERTAINMENT',
          label: 'Entertainment',
          icon: '🎪',
          allowedTags: ['magic_show', 'fireworks', 'music', 'combat', 'dance', 'games'],
          defaultOptions: [
            { label: 'Magic Show', tag: 'magic_show', icon: '🪄' },
            { label: 'Fireworks', tag: 'fireworks', icon: '🎆' },
            { label: 'Live Music', tag: 'music', icon: '🎵' },
            { label: 'Arena Combat', tag: 'combat', icon: '⚔️' },
            { label: 'Dance-Off', tag: 'dance', icon: '💃' },
            { label: 'Party Games', tag: 'games', icon: '🎯' },
          ],
        },
        {
          id: 'VIBE',
          label: 'Party Vibe',
          icon: '✨',
          allowedTags: ['spooky', 'epic', 'wild', 'silly', 'fancy', 'chill'],
          defaultOptions: [
            { label: 'Spooky', tag: 'spooky', icon: '👻' },
            { label: 'Epic', tag: 'epic', icon: '⚡' },
            { label: 'Wild', tag: 'wild', icon: '🔥' },
            { label: 'Silly', tag: 'silly', icon: '🤪' },
            { label: 'Fancy', tag: 'fancy', icon: '🎩' },
            { label: 'Chill', tag: 'chill', icon: '😎' },
          ],
        },
        {
          id: 'MOOD',
          label: 'Skeleton Mood',
          icon: '😊',
          allowedTags: ['excited', 'shy', 'chaotic', 'mysterious'],
          defaultOptions: [
            { label: 'Excited!', tag: 'excited', icon: '🎉' },
            { label: 'Shy', tag: 'shy', icon: '😊' },
            { label: 'Chaotic', tag: 'chaotic', icon: '🌪️' },
            { label: 'Mysterious', tag: 'mysterious', icon: '🎩' },
          ],
        },
      ],
    },
    vignettes: SKELETON_BIRTHDAY_STAGE_2,
    defaultVignette: SKELETON_BIRTHDAY_DEFAULT_2,
    successTags: [['giant', 'cake', 'magic_show'], ['tiny', 'candy', 'silly']],
  },
  {
    id: 'skeleton-birthday-3',
    questId: 'skeleton-birthday',
    stageNumber: 3,
    title: "Ultimate Party Combo",
    intro: "The skeleton wants the ULTIMATE party! Combine TWO activities to unlock SECRET combos!",
    template: {
      sentence: "Combine {ACTIVITY1} with {ACTIVITY2} in a {SPIRIT} way at {LOCATION}",
      slots: [
        {
          id: 'ACTIVITY1',
          label: 'First Activity',
          icon: '🎪',
          allowedTags: ['magic_show', 'fireworks', 'music', 'combat', 'dance', 'games'],
          defaultOptions: [
            { label: 'Magic Show', tag: 'magic_show', icon: '🪄' },
            { label: 'Fireworks', tag: 'fireworks', icon: '🎆' },
            { label: 'Live Music', tag: 'music', icon: '🎵' },
            { label: 'Arena Combat', tag: 'combat', icon: '⚔️' },
            { label: 'Dance-Off', tag: 'dance', icon: '💃' },
            { label: 'Party Games', tag: 'games', icon: '🎯' },
          ],
        },
        {
          id: 'ACTIVITY2',
          label: 'Second Activity',
          icon: '🎊',
          allowedTags: ['magic_show', 'fireworks', 'music', 'combat', 'dance', 'games'],
          defaultOptions: [
            { label: 'Magic Show', tag: 'magic_show', icon: '🪄' },
            { label: 'Fireworks', tag: 'fireworks', icon: '🎆' },
            { label: 'Live Music', tag: 'music', icon: '🎵' },
            { label: 'Arena Combat', tag: 'combat', icon: '⚔️' },
            { label: 'Dance-Off', tag: 'dance', icon: '💃' },
            { label: 'Party Games', tag: 'games', icon: '🎯' },
          ],
        },
        {
          id: 'SPIRIT',
          label: 'Party Spirit',
          icon: '✨',
          allowedTags: ['spooky', 'wild', 'silly', 'fancy'],
          defaultOptions: [
            { label: 'Spooky', tag: 'spooky', icon: '👻' },
            { label: 'Wild', tag: 'wild', icon: '🔥' },
            { label: 'Silly', tag: 'silly', icon: '🤪' },
            { label: 'Fancy', tag: 'fancy', icon: '🎩' },
          ],
        },
        {
          id: 'LOCATION',
          label: 'Party Location',
          icon: '📍',
          allowedTags: ['graveyard', 'castle', 'dungeon', 'rooftop'],
          defaultOptions: [
            { label: 'Graveyard', tag: 'graveyard', icon: '⚰️' },
            { label: 'Castle Hall', tag: 'castle', icon: '🏰' },
            { label: 'Dark Dungeon', tag: 'dungeon', icon: '🗝️' },
            { label: 'Castle Rooftop', tag: 'rooftop', icon: '🌙' },
          ],
        },
      ],
    },
    vignettes: SKELETON_BIRTHDAY_STAGE_3,
    defaultVignette: SKELETON_BIRTHDAY_DEFAULT_3,
    comboRequired: 4,
    comboHints: [
      {
        comboTags: ['magic_show', 'fireworks'],
        hints: [
          'What happens when magic meets explosions?',
          'Magic tricks that go BOOM...',
          'Try Magic + Fireworks = Spell Explosions!',
        ],
      },
      {
        comboTags: ['combat', 'dance'],
        hints: [
          'What if fighting becomes a performance?',
          'Warriors moving in perfect rhythm...',
          'Try Combat + Dance = Battle Dance!',
        ],
      },
      {
        comboTags: ['music', 'magic_show'],
        hints: [
          'What if instruments play themselves?',
          'Music that is alive with magic...',
          'Try Music + Magic = Musical Enchantment!',
        ],
      },
      {
        comboTags: ['fireworks', 'games'],
        hints: [
          'What if party games explode?',
          'Every action goes BOOM...',
          'Try Fireworks + Games = Explosive Fun!',
        ],
      },
      {
        comboTags: ['games', 'music'],
        hints: [
          'Musical chairs but... the chairs run away?',
          'Games with a musical twist...',
          'Try Games + Music = Living Furniture!',
        ],
      },
    ],
  },

];

// ─── KNIGHT SPACE ───────────────────────────────────────────────────────────

export const KNIGHT_SPACE_STAGES: QuestStage[] = [
  {
    id: 'knight-space-1',
    questId: 'knight-space',
    stageNumber: 1,
    title: 'Space Station Emergency',
    intro: "The space station is drifting and the robots are floating around doing nothing! Fix this mess!",
    template: {
      sentence: "Fix the station by having {CREW} do {TASK} using the {TOOL}",
      slots: [
        {
          id: 'CREW',
          label: 'Crew Member',
          icon: '🧑‍🚀',
          allowedTags: ['ranger', 'robot', 'engineer', 'knight', 'everyone'],
          defaultOptions: [
            { label: 'Space Ranger', tag: 'ranger', icon: '🚀' },
            { label: 'Robot Helper', tag: 'robot', icon: '🤖' },
            { label: 'Engineer', tag: 'engineer', icon: '🔧' },
            { label: 'Knight', tag: 'knight', icon: '🛡️' },
            { label: 'Everyone!', tag: 'everyone', icon: '👥' },
          ],
        },
        {
          id: 'TASK',
          label: 'Emergency Task',
          icon: '⚠️',
          allowedTags: ['repair', 'launch', 'build', 'rescue', 'explore', 'defend'],
          defaultOptions: [
            { label: 'Repair Hull', tag: 'repair', icon: '🔩' },
            { label: 'Launch Rocket', tag: 'launch', icon: '🚀' },
            { label: 'Build Module', tag: 'build', icon: '🏗️' },
            { label: 'Rescue Crew', tag: 'rescue', icon: '🆘' },
            { label: 'Explore Outside', tag: 'explore', icon: '🔭' },
            { label: 'Defend Station', tag: 'defend', icon: '🛡️' },
          ],
        },
        {
          id: 'TOOL',
          label: 'Equipment',
          icon: '🛠️',
          allowedTags: ['solar_panel', 'cargo', 'dome', 'rocket', 'flag', 'laser'],
          defaultOptions: [
            { label: 'Solar Panel', tag: 'solar_panel', icon: '☀️' },
            { label: 'Cargo Crate', tag: 'cargo', icon: '📦' },
            { label: 'Space Dome', tag: 'dome', icon: '🔮' },
            { label: 'Rocket Booster', tag: 'rocket', icon: '🚀' },
            { label: 'Space Flag', tag: 'flag', icon: '🚩' },
            { label: 'Laser Beam', tag: 'laser', icon: '⚡' },
          ],
        },
      ],
    },
    vignettes: KNIGHT_SPACE_STAGE_1,
    defaultVignette: KNIGHT_SPACE_DEFAULT,
    successTags: [['engineer', 'repair', 'solar_panel'], ['knight', 'defend', 'laser']],
  },
  {
    id: 'knight-space-2',
    questId: 'knight-space',
    stageNumber: 2,
    title: 'Precision Mission Control',
    intro: "Now you know WHO and WHAT — but HOW urgent is it? And HOW should they approach it? Details matter in space!",
    template: {
      sentence: "Have {CREW} do a {URGENCY} {TASK} using the {TOOL} in a {APPROACH} way",
      slots: [
        {
          id: 'CREW',
          label: 'Crew Member',
          icon: '🧑‍🚀',
          allowedTags: ['ranger', 'robot', 'engineer', 'knight', 'everyone'],
          defaultOptions: [
            { label: 'Space Ranger', tag: 'ranger', icon: '🚀' },
            { label: 'Robot Helper', tag: 'robot', icon: '🤖' },
            { label: 'Engineer', tag: 'engineer', icon: '🔧' },
            { label: 'Knight', tag: 'knight', icon: '🛡️' },
            { label: 'Everyone!', tag: 'everyone', icon: '👥' },
          ],
        },
        {
          id: 'URGENCY',
          label: 'Urgency Level',
          icon: '⏰',
          allowedTags: ['routine', 'urgent', 'critical', 'catastrophic'],
          defaultOptions: [
            { label: 'Routine Check', tag: 'routine', icon: '✅' },
            { label: 'Urgent', tag: 'urgent', icon: '⚠️' },
            { label: 'Critical!', tag: 'critical', icon: '🚨' },
            { label: 'CATASTROPHIC!', tag: 'catastrophic', icon: '💥' },
          ],
        },
        {
          id: 'TASK',
          label: 'Emergency Task',
          icon: '⚠️',
          allowedTags: ['repair', 'launch', 'build', 'rescue', 'explore', 'defend'],
          defaultOptions: [
            { label: 'Repair Hull', tag: 'repair', icon: '🔩' },
            { label: 'Launch Rocket', tag: 'launch', icon: '🚀' },
            { label: 'Build Module', tag: 'build', icon: '🏗️' },
            { label: 'Rescue Crew', tag: 'rescue', icon: '🆘' },
            { label: 'Explore Outside', tag: 'explore', icon: '🔭' },
            { label: 'Defend Station', tag: 'defend', icon: '🛡️' },
          ],
        },
        {
          id: 'TOOL',
          label: 'Equipment',
          icon: '🛠️',
          allowedTags: ['solar_panel', 'cargo', 'dome', 'rocket', 'flag', 'laser'],
          defaultOptions: [
            { label: 'Solar Panel', tag: 'solar_panel', icon: '☀️' },
            { label: 'Cargo Crate', tag: 'cargo', icon: '📦' },
            { label: 'Space Dome', tag: 'dome', icon: '🔮' },
            { label: 'Rocket Booster', tag: 'rocket', icon: '🚀' },
            { label: 'Space Flag', tag: 'flag', icon: '🚩' },
            { label: 'Laser Beam', tag: 'laser', icon: '⚡' },
          ],
        },
        {
          id: 'APPROACH',
          label: 'Approach',
          icon: '🎯',
          allowedTags: ['careful', 'fast', 'creative', 'teamwork'],
          defaultOptions: [
            { label: 'Careful & Precise', tag: 'careful', icon: '🔬' },
            { label: 'Fast & Urgent', tag: 'fast', icon: '💨' },
            { label: 'Creative Solution', tag: 'creative', icon: '💡' },
            { label: 'Teamwork', tag: 'teamwork', icon: '🤝' },
          ],
        },
      ],
    },
    vignettes: KNIGHT_SPACE_STAGE_2,
    defaultVignette: KNIGHT_SPACE_DEFAULT_2,
    successTags: [['critical', 'repair', 'careful'], ['catastrophic', 'rescue', 'teamwork']],
  },
  {
    id: 'knight-space-3',
    questId: 'knight-space',
    stageNumber: 3,
    title: 'Secret Tech Combos',
    intro: "You've mastered the basics — now discover SECRET TECH COMBOS! Some equipment pairs create brand new inventions!",
    template: {
      sentence: "Combine {TECH1} with {TECH2} to solve the {CRISIS} at the {LOCATION}",
      slots: [
        {
          id: 'TECH1',
          label: 'First Tech',
          icon: '🔧',
          allowedTags: ['solar_panel', 'laser', 'rocket', 'dome', 'cargo', 'flag'],
          defaultOptions: [
            { label: 'Solar Panel', tag: 'solar_panel', icon: '☀️' },
            { label: 'Laser Beam', tag: 'laser', icon: '⚡' },
            { label: 'Rocket Booster', tag: 'rocket', icon: '🚀' },
            { label: 'Space Dome', tag: 'dome', icon: '🔮' },
            { label: 'Cargo Crate', tag: 'cargo', icon: '📦' },
            { label: 'Space Flag', tag: 'flag', icon: '🚩' },
          ],
        },
        {
          id: 'TECH2',
          label: 'Second Tech',
          icon: '⚙️',
          allowedTags: ['solar_panel', 'laser', 'rocket', 'dome', 'cargo', 'flag'],
          defaultOptions: [
            { label: 'Solar Panel', tag: 'solar_panel', icon: '☀️' },
            { label: 'Laser Beam', tag: 'laser', icon: '⚡' },
            { label: 'Rocket Booster', tag: 'rocket', icon: '🚀' },
            { label: 'Space Dome', tag: 'dome', icon: '🔮' },
            { label: 'Cargo Crate', tag: 'cargo', icon: '📦' },
            { label: 'Space Flag', tag: 'flag', icon: '🚩' },
          ],
        },
        {
          id: 'CRISIS',
          label: 'Crisis Type',
          icon: '🚨',
          allowedTags: ['meteor', 'blackout', 'breach', 'alien'],
          defaultOptions: [
            { label: 'Meteor Storm', tag: 'meteor', icon: '☄️' },
            { label: 'Power Blackout', tag: 'blackout', icon: '🔌' },
            { label: 'Hull Breach', tag: 'breach', icon: '💨' },
            { label: 'Alien Encounter', tag: 'alien', icon: '👽' },
          ],
        },
        {
          id: 'LOCATION',
          label: 'Location',
          icon: '📍',
          allowedTags: ['bridge', 'engine_room', 'airlock', 'observatory'],
          defaultOptions: [
            { label: 'Command Bridge', tag: 'bridge', icon: '🎛️' },
            { label: 'Engine Room', tag: 'engine_room', icon: '⚙️' },
            { label: 'Airlock', tag: 'airlock', icon: '🚪' },
            { label: 'Observatory', tag: 'observatory', icon: '🔭' },
          ],
        },
      ],
    },
    vignettes: KNIGHT_SPACE_STAGE_3,
    defaultVignette: KNIGHT_SPACE_DEFAULT_3,
    comboRequired: 4,
    comboHints: [
      {
        comboTags: ['solar_panel', 'laser'],
        hints: [
          'What if you focused sunlight through a laser?',
          'Solar power plus laser technology...',
          'Try Solar Panel + Laser = Solar Laser!',
        ],
      },
      {
        comboTags: ['rocket', 'dome'],
        hints: [
          'What if you needed to evacuate quickly?',
          'Rocket propulsion plus protective dome...',
          'Try Rocket + Dome = Escape Pod!',
        ],
      },
      {
        comboTags: ['cargo', 'flag'],
        hints: [
          'How do you call for help in space?',
          'Cargo crate as a tower, flag as a signal...',
          'Try Cargo + Flag = Signal Beacon!',
        ],
      },
      {
        comboTags: ['laser', 'dome'],
        hints: [
          'What if laser light refracted through a dome?',
          'Laser energy plus dome optics...',
          'Try Laser + Dome = Force Shield!',
        ],
      },
      {
        comboTags: ['solar_panel', 'rocket'],
        hints: [
          'How do you power a rocket with the sun?',
          'Solar panels for energy, rocket for propulsion...',
          'Try Solar Panel + Rocket = Solar Sail!',
        ],
      },
      {
        comboTags: ['cargo', 'rocket'],
        hints: [
          'How do you deliver supplies instantly?',
          'Cargo for supplies, rocket for launch...',
          'Try Cargo + Rocket = Cargo Cannon!',
        ],
      },
    ],
  },
];

export const BARBARIAN_SCHOOL_STAGES: QuestStage[] = [
  {
    id: 'barbarian-school-1',
    questId: 'barbarian-school',
    stageNumber: 1,
    title: 'Monster Recess',
    intro: "The monsters got to the playground and recess is WILD! What happens?",
    template: {
      sentence: "At recess, {MONSTER} plays {ACTIVITY} on the {EQUIPMENT}",
      slots: [
        {
          id: 'MONSTER',
          label: 'Monster',
          icon: '👹',
          allowedTags: ['barbarian', 'clown', 'ninja', 'robot', 'caveman', 'everyone'],
          defaultOptions: [
            { label: 'Barbarian', tag: 'barbarian', icon: '🪓' },
            { label: 'Clown', tag: 'clown', icon: '🤡' },
            { label: 'Ninja', tag: 'ninja', icon: '🥷' },
            { label: 'Robot', tag: 'robot', icon: '🤖' },
            { label: 'Caveman', tag: 'caveman', icon: '🦴' },
            { label: 'All of Them!', tag: 'everyone', icon: '👥' },
          ],
        },
        {
          id: 'ACTIVITY',
          label: 'Game',
          icon: '🏃',
          allowedTags: ['tag', 'wrestling', 'hide_seek', 'race', 'jumping', 'climbing'],
          defaultOptions: [
            { label: 'Tag', tag: 'tag', icon: '🏷️' },
            { label: 'Wrestling', tag: 'wrestling', icon: '🤼' },
            { label: 'Hide & Seek', tag: 'hide_seek', icon: '🙈' },
            { label: 'Racing', tag: 'race', icon: '🏁' },
            { label: 'Jumping Contest', tag: 'jumping', icon: '🦘' },
            { label: 'Climbing', tag: 'climbing', icon: '🧗' },
          ],
        },
        {
          id: 'EQUIPMENT',
          label: 'Playground',
          icon: '🎢',
          allowedTags: ['slide', 'swing', 'seesaw', 'sandbox', 'merry_go_round', 'field'],
          defaultOptions: [
            { label: 'Giant Slide', tag: 'slide', icon: '🛝' },
            { label: 'Swing Set', tag: 'swing', icon: '🎐' },
            { label: 'Seesaw', tag: 'seesaw', icon: '⚖️' },
            { label: 'Sandbox', tag: 'sandbox', icon: '🏖️' },
            { label: 'Merry-Go-Round', tag: 'merry_go_round', icon: '🎠' },
            { label: 'Open Field', tag: 'field', icon: '🌿' },
          ],
        },
      ],
    },
    vignettes: BARBARIAN_SCHOOL_STAGE_1,
    defaultVignette: BARBARIAN_SCHOOL_DEFAULT,
    successTags: [['barbarian', 'wrestling', 'field'], ['ninja', 'hide_seek', 'sandbox']],
  },
  {
    id: 'barbarian-school-2',
    questId: 'barbarian-school',
    stageNumber: 2,
    title: 'Energy & Weather',
    intro: "Now you control energy levels and weather! See how they change the playground!",
    template: {
      sentence: "At recess, a {ENERGY} {MONSTER} plays {ACTIVITY} on the {EQUIPMENT} during {WEATHER} weather",
      slots: [
        {
          id: 'ENERGY',
          label: 'Energy Level',
          icon: '⚡',
          allowedTags: ['sleepy', 'normal', 'hyper', 'MEGA_hyper'],
          defaultOptions: [
            { label: 'Sleepy', tag: 'sleepy', icon: '😴' },
            { label: 'Normal', tag: 'normal', icon: '😊' },
            { label: 'Hyper', tag: 'hyper', icon: '⚡' },
            { label: 'MEGA Hyper', tag: 'MEGA_hyper', icon: '💥' },
          ],
        },
        {
          id: 'MONSTER',
          label: 'Monster',
          icon: '👹',
          allowedTags: ['barbarian', 'clown', 'ninja', 'robot', 'caveman', 'everyone'],
          defaultOptions: [
            { label: 'Barbarian', tag: 'barbarian', icon: '🪓' },
            { label: 'Clown', tag: 'clown', icon: '🤡' },
            { label: 'Ninja', tag: 'ninja', icon: '🥷' },
            { label: 'Robot', tag: 'robot', icon: '🤖' },
            { label: 'Caveman', tag: 'caveman', icon: '🦴' },
            { label: 'All of Them!', tag: 'everyone', icon: '👥' },
          ],
        },
        {
          id: 'ACTIVITY',
          label: 'Game',
          icon: '🏃',
          allowedTags: ['tag', 'wrestling', 'hide_seek', 'race', 'jumping', 'climbing'],
          defaultOptions: [
            { label: 'Tag', tag: 'tag', icon: '🏷️' },
            { label: 'Wrestling', tag: 'wrestling', icon: '🤼' },
            { label: 'Hide & Seek', tag: 'hide_seek', icon: '🙈' },
            { label: 'Racing', tag: 'race', icon: '🏁' },
            { label: 'Jumping Contest', tag: 'jumping', icon: '🦘' },
            { label: 'Climbing', tag: 'climbing', icon: '🧗' },
          ],
        },
        {
          id: 'EQUIPMENT',
          label: 'Playground',
          icon: '🎢',
          allowedTags: ['slide', 'swing', 'seesaw', 'sandbox', 'merry_go_round', 'field'],
          defaultOptions: [
            { label: 'Giant Slide', tag: 'slide', icon: '🛝' },
            { label: 'Swing Set', tag: 'swing', icon: '🎐' },
            { label: 'Seesaw', tag: 'seesaw', icon: '⚖️' },
            { label: 'Sandbox', tag: 'sandbox', icon: '🏖️' },
            { label: 'Merry-Go-Round', tag: 'merry_go_round', icon: '🎠' },
            { label: 'Open Field', tag: 'field', icon: '🌿' },
          ],
        },
        {
          id: 'WEATHER',
          label: 'Weather',
          icon: '🌤️',
          allowedTags: ['sunny', 'rainy', 'snowy', 'windy'],
          defaultOptions: [
            { label: 'Sunny', tag: 'sunny', icon: '☀️' },
            { label: 'Rainy', tag: 'rainy', icon: '🌧️' },
            { label: 'Snowy', tag: 'snowy', icon: '❄️' },
            { label: 'Windy', tag: 'windy', icon: '🌪️' },
          ],
        },
      ],
    },
    vignettes: BARBARIAN_SCHOOL_STAGE_2,
    defaultVignette: BARBARIAN_SCHOOL_DEFAULT_2,
    successTags: [['MEGA_hyper', 'race', 'field'], ['sleepy', 'hide_seek', 'sandbox']],
  },
  {
    id: 'barbarian-school-3',
    questId: 'barbarian-school',
    stageNumber: 3,
    title: 'Playground Combos',
    intro: "Discover SECRET COMBOS by mixing different playground games together!",
    template: {
      sentence: "Combine {GAME1} with {GAME2} in {STYLE} style on the {PLAYGROUND}",
      slots: [
        {
          id: 'GAME1',
          label: 'First Game',
          icon: '🎮',
          allowedTags: ['tag', 'wrestling', 'hide_seek', 'race', 'jumping', 'climbing'],
          defaultOptions: [
            { label: 'Tag', tag: 'tag', icon: '🏷️' },
            { label: 'Wrestling', tag: 'wrestling', icon: '🤼' },
            { label: 'Hide & Seek', tag: 'hide_seek', icon: '🙈' },
            { label: 'Racing', tag: 'race', icon: '🏁' },
            { label: 'Jumping', tag: 'jumping', icon: '🦘' },
            { label: 'Climbing', tag: 'climbing', icon: '🧗' },
          ],
        },
        {
          id: 'GAME2',
          label: 'Second Game',
          icon: '🎯',
          allowedTags: ['tag', 'wrestling', 'hide_seek', 'race', 'jumping', 'climbing'],
          defaultOptions: [
            { label: 'Tag', tag: 'tag', icon: '🏷️' },
            { label: 'Wrestling', tag: 'wrestling', icon: '🤼' },
            { label: 'Hide & Seek', tag: 'hide_seek', icon: '🙈' },
            { label: 'Racing', tag: 'race', icon: '🏁' },
            { label: 'Jumping', tag: 'jumping', icon: '🦘' },
            { label: 'Climbing', tag: 'climbing', icon: '🧗' },
          ],
        },
        {
          id: 'STYLE',
          label: 'Play Style',
          icon: '🎭',
          allowedTags: ['ninja', 'clown', 'robot', 'caveman'],
          defaultOptions: [
            { label: 'Ninja Style', tag: 'ninja', icon: '🥷' },
            { label: 'Clown Style', tag: 'clown', icon: '🤡' },
            { label: 'Robot Style', tag: 'robot', icon: '🤖' },
            { label: 'Caveman Style', tag: 'caveman', icon: '🦴' },
          ],
        },
        {
          id: 'PLAYGROUND',
          label: 'Location',
          icon: '🎢',
          allowedTags: ['slide', 'swing', 'sandbox', 'field'],
          defaultOptions: [
            { label: 'Slide', tag: 'slide', icon: '🛝' },
            { label: 'Swings', tag: 'swing', icon: '🎐' },
            { label: 'Sandbox', tag: 'sandbox', icon: '🏖️' },
            { label: 'Field', tag: 'field', icon: '🌿' },
          ],
        },
      ],
    },
    vignettes: BARBARIAN_SCHOOL_STAGE_3,
    defaultVignette: BARBARIAN_SCHOOL_DEFAULT_3,
    comboRequired: 4,
    comboHints: [
      {
        comboTags: ['tag', 'hide_seek'],
        hints: [
          'What if you hide AND tag?',
          'Invisible tag game...',
          'Try Tag + Hide-and-Seek = Stealth Tag!',
        ],
      },
      {
        comboTags: ['wrestling', 'jumping'],
        hints: [
          'Wrestling while bouncing?',
          'Combat in mid-air...',
          'Try Wrestling + Jumping = Trampoline Wrestling!',
        ],
      },
      {
        comboTags: ['race', 'climbing'],
        hints: [
          'What if you race UP things?',
          'Parkour race...',
          'Try Race + Climbing = Obstacle Course!',
        ],
      },
      {
        comboTags: ['tag', 'race'],
        hints: [
          'Super fast tag?',
          'Chase at lightning speed...',
          'Try Tag + Race = Speed Tag!',
        ],
      },
      {
        comboTags: ['hide_seek', 'climbing'],
        hints: [
          'What if you hide UP high?',
          'Vertical hiding spots...',
          'Try Hide-and-Seek + Climbing = Vertical Hide & Seek!',
        ],
      },
      {
        comboTags: ['wrestling', 'race'],
        hints: [
          'Grab them while running?',
          'Combat chase...',
          'Try Wrestling + Race = Chase Wrestling!',
        ],
      },
    ],
  },
];

// ─── SKELETON PIZZA ─────────────────────────────────────────────────────────

export const SKELETON_PIZZA_STAGES: QuestStage[] = [
  {
    id: 'skeleton-pizza-1',
    questId: 'skeleton-pizza',
    stageNumber: 1,
    title: 'Pizza Pandemonium',
    intro: "Orders are flying in and nobody can cook! Run this restaurant before it burns down!",
    template: {
      sentence: "Have {CHEF} cook {DISH} in the most {STYLE} way possible",
      slots: [
        {
          id: 'CHEF',
          label: 'Chef',
          icon: '👨‍🍳',
          allowedTags: ['skeleton', 'clown', 'superhero', 'survivalist', 'everyone'],
          defaultOptions: [
            { label: 'Skeleton Chef', tag: 'skeleton', icon: '💀' },
            { label: 'Clown Cook', tag: 'clown', icon: '🤡' },
            { label: 'Super Chef', tag: 'superhero', icon: '🦸' },
            { label: 'Survivalist', tag: 'survivalist', icon: '🏕️' },
            { label: 'All Chefs!', tag: 'everyone', icon: '👥' },
          ],
        },
        {
          id: 'DISH',
          label: 'Dish',
          icon: '🍽️',
          allowedTags: ['pizza', 'pepperoni', 'pasta', 'soup', 'cake', 'mystery'],
          defaultOptions: [
            { label: 'Classic Pizza', tag: 'pizza', icon: '🍕' },
            { label: 'Pepperoni Deluxe', tag: 'pepperoni', icon: '🍕' },
            { label: 'Spaghetti Tower', tag: 'pasta', icon: '🍝' },
            { label: 'Cauldron Soup', tag: 'soup', icon: '🍲' },
            { label: 'Layer Cake', tag: 'cake', icon: '🎂' },
            { label: 'Mystery Dish', tag: 'mystery', icon: '❓' },
          ],
        },
        {
          id: 'STYLE',
          label: 'Style',
          icon: '🎨',
          allowedTags: ['fast', 'fancy', 'chaotic', 'explosive', 'sneaky', 'dramatic'],
          defaultOptions: [
            { label: 'Speed Run', tag: 'fast', icon: '⚡' },
            { label: 'Fancy Plating', tag: 'fancy', icon: '✨' },
            { label: 'Total Chaos', tag: 'chaotic', icon: '🌪️' },
            { label: 'Explosive', tag: 'explosive', icon: '💥' },
            { label: 'Sneaky', tag: 'sneaky', icon: '🤫' },
            { label: 'Dramatic', tag: 'dramatic', icon: '🎭' },
          ],
        },
      ],
    },
    vignettes: SKELETON_PIZZA_STAGE_1,
    defaultVignette: SKELETON_PIZZA_DEFAULT,
    successTags: [['skeleton', 'pizza', 'fast'], ['superhero', 'cake', 'dramatic']],
  },
  {
    id: 'skeleton-pizza-2',
    questId: 'skeleton-pizza',
    stageNumber: 2,
    title: 'Temperature Matters',
    intro: "The kitchen is heating up! Now you need to control the HEAT and the AMOUNT. Get specific or things will melt (or freeze)!",
    template: {
      sentence: "Have {CHEF} cook a {AMOUNT} {DISH} at {HEAT} temperature in the most {STYLE} way",
      slots: [
        {
          id: 'CHEF',
          label: 'Chef',
          icon: '👨‍🍳',
          allowedTags: ['skeleton', 'clown', 'superhero', 'survivalist', 'everyone'],
          defaultOptions: [
            { label: 'Skeleton Chef', tag: 'skeleton', icon: '💀' },
            { label: 'Clown Cook', tag: 'clown', icon: '🤡' },
            { label: 'Super Chef', tag: 'superhero', icon: '🦸' },
            { label: 'Survivalist', tag: 'survivalist', icon: '🏕️' },
            { label: 'All Chefs!', tag: 'everyone', icon: '👥' },
          ],
        },
        {
          id: 'AMOUNT',
          label: 'Portion Size',
          icon: '🔢',
          allowedTags: ['single', 'family_size', 'mountain', 'infinite'],
          defaultOptions: [
            { label: 'Just One', tag: 'single', icon: '1️⃣' },
            { label: 'Family Size', tag: 'family_size', icon: '👨‍👩‍👧‍👦' },
            { label: 'Mountain!', tag: 'mountain', icon: '🏔️' },
            { label: 'Infinite!', tag: 'infinite', icon: '♾️' },
          ],
        },
        {
          id: 'DISH',
          label: 'Dish',
          icon: '🍽️',
          allowedTags: ['pizza', 'pepperoni', 'pasta', 'soup', 'cake', 'mystery'],
          defaultOptions: [
            { label: 'Classic Pizza', tag: 'pizza', icon: '🍕' },
            { label: 'Pepperoni Deluxe', tag: 'pepperoni', icon: '🍕' },
            { label: 'Spaghetti Tower', tag: 'pasta', icon: '🍝' },
            { label: 'Cauldron Soup', tag: 'soup', icon: '🍲' },
            { label: 'Layer Cake', tag: 'cake', icon: '🎂' },
            { label: 'Mystery Dish', tag: 'mystery', icon: '❓' },
          ],
        },
        {
          id: 'HEAT',
          label: 'Heat Level',
          icon: '🌡️',
          allowedTags: ['cold', 'warm', 'blazing', 'volcanic'],
          defaultOptions: [
            { label: 'Cold', tag: 'cold', icon: '❄️' },
            { label: 'Warm', tag: 'warm', icon: '🔥' },
            { label: 'Blazing', tag: 'blazing', icon: '🔥🔥' },
            { label: 'Volcanic!', tag: 'volcanic', icon: '🌋' },
          ],
        },
        {
          id: 'STYLE',
          label: 'Style',
          icon: '🎨',
          allowedTags: ['fast', 'fancy', 'chaotic', 'explosive', 'sneaky', 'dramatic'],
          defaultOptions: [
            { label: 'Speed Run', tag: 'fast', icon: '⚡' },
            { label: 'Fancy Plating', tag: 'fancy', icon: '✨' },
            { label: 'Total Chaos', tag: 'chaotic', icon: '🌪️' },
            { label: 'Explosive', tag: 'explosive', icon: '💥' },
            { label: 'Sneaky', tag: 'sneaky', icon: '🤫' },
            { label: 'Dramatic', tag: 'dramatic', icon: '🎭' },
          ],
        },
      ],
    },
    vignettes: SKELETON_PIZZA_STAGE_2,
    defaultVignette: SKELETON_PIZZA_DEFAULT_2,
    successTags: [['blazing', 'pizza', 'mountain'], ['cold', 'cake', 'single']],
  },
  {
    id: 'skeleton-pizza-3',
    questId: 'skeleton-pizza',
    stageNumber: 3,
    title: 'Secret Kitchen Combos',
    intro: "You've mastered the basics! Now discover SECRET TECHNIQUE COMBOS! Some cooking techniques unlock special magic when combined!",
    template: {
      sentence: "Combine {TECHNIQUE1} with {TECHNIQUE2} for a {PRESENTATION} dish served {DELIVERY}",
      slots: [
        {
          id: 'TECHNIQUE1',
          label: 'First Technique',
          icon: '🔪',
          allowedTags: ['grill', 'freeze', 'juggle', 'launch', 'smash', 'enchant'],
          defaultOptions: [
            { label: 'Grill', tag: 'grill', icon: '🔥' },
            { label: 'Freeze', tag: 'freeze', icon: '❄️' },
            { label: 'Juggle', tag: 'juggle', icon: '🤹' },
            { label: 'Launch', tag: 'launch', icon: '🚀' },
            { label: 'Smash', tag: 'smash', icon: '💥' },
            { label: 'Enchant', tag: 'enchant', icon: '✨' },
          ],
        },
        {
          id: 'TECHNIQUE2',
          label: 'Second Technique',
          icon: '🍴',
          allowedTags: ['grill', 'freeze', 'juggle', 'launch', 'smash', 'enchant'],
          defaultOptions: [
            { label: 'Grill', tag: 'grill', icon: '🔥' },
            { label: 'Freeze', tag: 'freeze', icon: '❄️' },
            { label: 'Juggle', tag: 'juggle', icon: '🤹' },
            { label: 'Launch', tag: 'launch', icon: '🚀' },
            { label: 'Smash', tag: 'smash', icon: '💥' },
            { label: 'Enchant', tag: 'enchant', icon: '✨' },
          ],
        },
        {
          id: 'PRESENTATION',
          label: 'Presentation',
          icon: '🎭',
          allowedTags: ['tower', 'art', 'surprise', 'chaos'],
          defaultOptions: [
            { label: 'Tower', tag: 'tower', icon: '🏗️' },
            { label: 'Art Piece', tag: 'art', icon: '🎨' },
            { label: 'Surprise!', tag: 'surprise', icon: '🎁' },
            { label: 'Total Chaos', tag: 'chaos', icon: '🌪️' },
          ],
        },
        {
          id: 'DELIVERY',
          label: 'Delivery Method',
          icon: '🚚',
          allowedTags: ['catapult', 'slide', 'parade', 'explosion'],
          defaultOptions: [
            { label: 'Catapult', tag: 'catapult', icon: '🏹' },
            { label: 'Slide', tag: 'slide', icon: '🛝' },
            { label: 'Parade', tag: 'parade', icon: '🎪' },
            { label: 'Explosion!', tag: 'explosion', icon: '💥' },
          ],
        },
      ],
    },
    vignettes: SKELETON_PIZZA_STAGE_3,
    defaultVignette: SKELETON_PIZZA_DEFAULT_3,
    comboRequired: 4,
    comboHints: [
      {
        comboTags: ['grill', 'freeze'],
        hints: [
          'What happens when hot meets cold?',
          'Grill it hot, then freeze it fast...',
          'Try Grill + Freeze = Baked Alaska!',
        ],
      },
      {
        comboTags: ['juggle', 'launch'],
        hints: [
          'What if you juggle while launching?',
          'Food in the air... launching and catching...',
          'Try Juggle + Launch = Aerial Kitchen!',
        ],
      },
      {
        comboTags: ['smash', 'enchant'],
        hints: [
          'Destroy it, then magic it back?',
          'Smash it to pieces, then enchant...',
          'Try Smash + Enchant = Magic Crumble!',
        ],
      },
      {
        comboTags: ['freeze', 'launch'],
        hints: [
          'Frozen food makes great projectiles...',
          'Freeze it solid, then launch it...',
          'Try Freeze + Launch = Ice Rocket!',
        ],
      },
      {
        comboTags: ['grill', 'smash'],
        hints: [
          'Hot food + smashing = explosive!',
          'Grill until fiery, then smash...',
          'Try Grill + Smash = Flame Smash!',
        ],
      },
      {
        comboTags: ['juggle', 'enchant'],
        hints: [
          'What if the food juggles itself?',
          'Juggle, then add magic...',
          'Try Juggle + Enchant = Enchanted Juggle!',
        ],
      },
    ],
  },
];

// ─── ADVENTURERS PICNIC ─────────────────────────────────────────────────────

export const ADVENTURERS_PICNIC_STAGES: QuestStage[] = [
  {
    id: 'adventurers-picnic-1',
    questId: 'adventurers-picnic',
    stageNumber: 1,
    title: 'Forest Mystery',
    intro: "The adventurers found a strange clearing in the forest! Something magical is happening...",
    template: {
      sentence: "The {ADVENTURER} discovers a {DISCOVERY} and reacts by {REACTION}",
      slots: [
        {
          id: 'ADVENTURER',
          label: 'Adventurer',
          icon: '🧝',
          allowedTags: ['ranger', 'druid', 'barbarian', 'ninja', 'rogue', 'whole_party'],
          defaultOptions: [
            { label: 'Ranger', tag: 'ranger', icon: '🏹' },
            { label: 'Druid', tag: 'druid', icon: '🌿' },
            { label: 'Barbarian', tag: 'barbarian', icon: '🪓' },
            { label: 'Ninja', tag: 'ninja', icon: '🥷' },
            { label: 'Rogue', tag: 'rogue', icon: '🗡️' },
            { label: 'Whole Party', tag: 'whole_party', icon: '👥' },
          ],
        },
        {
          id: 'DISCOVERY',
          label: 'Discovery',
          icon: '🔮',
          allowedTags: ['magic_portal', 'treasure', 'creature', 'enchanted_food', 'ancient_ruin', 'glowing_plant'],
          defaultOptions: [
            { label: 'Magic Portal', tag: 'magic_portal', icon: '🌀' },
            { label: 'Hidden Treasure', tag: 'treasure', icon: '💎' },
            { label: 'Forest Creature', tag: 'creature', icon: '🦊' },
            { label: 'Enchanted Feast', tag: 'enchanted_food', icon: '🍎' },
            { label: 'Ancient Ruin', tag: 'ancient_ruin', icon: '🏛️' },
            { label: 'Glowing Plant', tag: 'glowing_plant', icon: '🌱' },
          ],
        },
        {
          id: 'REACTION',
          label: 'Reaction',
          icon: '😲',
          allowedTags: ['investigate', 'celebrate', 'panic', 'cast_spell', 'set_trap', 'have_picnic'],
          defaultOptions: [
            { label: 'Investigating', tag: 'investigate', icon: '🔍' },
            { label: 'Celebrating', tag: 'celebrate', icon: '🎉' },
            { label: 'Panicking', tag: 'panic', icon: '😱' },
            { label: 'Casting Spells', tag: 'cast_spell', icon: '✨' },
            { label: 'Setting Traps', tag: 'set_trap', icon: '🪤' },
            { label: 'Having a Picnic', tag: 'have_picnic', icon: '🧺' },
          ],
        },
      ],
    },
    vignettes: ADVENTURERS_PICNIC_STAGE_1,
    defaultVignette: ADVENTURERS_PICNIC_DEFAULT,
    successTags: [['ranger', 'treasure', 'investigate'], ['druid', 'glowing_plant', 'cast_spell']],
  },
  {
    id: 'adventurers-picnic-2',
    questId: 'adventurers-picnic',
    stageNumber: 2,
    title: 'Timing & Caution',
    intro: "Now the adventurers need to be SPECIFIC! When you act and how careful you are changes EVERYTHING!",
    template: {
      sentence: "At {TIME}, the {CAUTION} {ADVENTURER} discovers a {DISCOVERY} and reacts by {REACTION}",
      slots: [
        {
          id: 'TIME',
          label: 'Time of Day',
          icon: '🌅',
          allowedTags: ['dawn', 'noon', 'dusk', 'midnight'],
          defaultOptions: [
            { label: 'Dawn', tag: 'dawn', icon: '🌅' },
            { label: 'Noon', tag: 'noon', icon: '☀️' },
            { label: 'Dusk', tag: 'dusk', icon: '🌆' },
            { label: 'Midnight', tag: 'midnight', icon: '🌙' },
          ],
        },
        {
          id: 'CAUTION',
          label: 'Caution Level',
          icon: '⚠️',
          allowedTags: ['reckless', 'cautious', 'stealthy', 'bold'],
          defaultOptions: [
            { label: 'Reckless', tag: 'reckless', icon: '💥' },
            { label: 'Cautious', tag: 'cautious', icon: '🤔' },
            { label: 'Stealthy', tag: 'stealthy', icon: '🤫' },
            { label: 'Bold', tag: 'bold', icon: '💪' },
          ],
        },
        {
          id: 'ADVENTURER',
          label: 'Adventurer',
          icon: '🧝',
          allowedTags: ['ranger', 'druid', 'barbarian', 'ninja', 'rogue', 'whole_party'],
          defaultOptions: [
            { label: 'Ranger', tag: 'ranger', icon: '🏹' },
            { label: 'Druid', tag: 'druid', icon: '🌿' },
            { label: 'Barbarian', tag: 'barbarian', icon: '🪓' },
            { label: 'Ninja', tag: 'ninja', icon: '🥷' },
            { label: 'Rogue', tag: 'rogue', icon: '🗡️' },
            { label: 'Whole Party', tag: 'whole_party', icon: '👥' },
          ],
        },
        {
          id: 'DISCOVERY',
          label: 'Discovery',
          icon: '🔮',
          allowedTags: ['magic_portal', 'treasure', 'creature', 'enchanted_food', 'ancient_ruin', 'glowing_plant'],
          defaultOptions: [
            { label: 'Magic Portal', tag: 'magic_portal', icon: '🌀' },
            { label: 'Hidden Treasure', tag: 'treasure', icon: '💎' },
            { label: 'Forest Creature', tag: 'creature', icon: '🦊' },
            { label: 'Enchanted Feast', tag: 'enchanted_food', icon: '🍎' },
            { label: 'Ancient Ruin', tag: 'ancient_ruin', icon: '🏛️' },
            { label: 'Glowing Plant', tag: 'glowing_plant', icon: '🌱' },
          ],
        },
        {
          id: 'REACTION',
          label: 'Reaction',
          icon: '😲',
          allowedTags: ['investigate', 'celebrate', 'panic', 'cast_spell', 'set_trap', 'have_picnic'],
          defaultOptions: [
            { label: 'Investigating', tag: 'investigate', icon: '🔍' },
            { label: 'Celebrating', tag: 'celebrate', icon: '🎉' },
            { label: 'Panicking', tag: 'panic', icon: '😱' },
            { label: 'Casting Spells', tag: 'cast_spell', icon: '✨' },
            { label: 'Setting Traps', tag: 'set_trap', icon: '🪤' },
            { label: 'Having a Picnic', tag: 'have_picnic', icon: '🧺' },
          ],
        },
      ],
    },
    vignettes: ADVENTURERS_PICNIC_STAGE_2,
    defaultVignette: ADVENTURERS_PICNIC_DEFAULT_2,
    successTags: [['stealthy', 'midnight', 'treasure'], ['reckless', 'dawn', 'magic_portal']],
  },
  {
    id: 'adventurers-picnic-3',
    questId: 'adventurers-picnic',
    stageNumber: 3,
    title: 'Secret Combos',
    intro: "You've mastered the basics — now discover SECRET COMBOS! Some skills create brand new magic when combined!",
    template: {
      sentence: "The party uses {SKILL1} and {SKILL2} together in the {TERRAIN} with {WEATHER}",
      slots: [
        {
          id: 'SKILL1',
          label: 'First Skill',
          icon: '🎯',
          allowedTags: ['investigate', 'cast_spell', 'set_trap', 'celebrate', 'panic', 'have_picnic'],
          defaultOptions: [
            { label: 'Investigate', tag: 'investigate', icon: '🔍' },
            { label: 'Cast Spell', tag: 'cast_spell', icon: '✨' },
            { label: 'Set Trap', tag: 'set_trap', icon: '🪤' },
            { label: 'Celebrate', tag: 'celebrate', icon: '🎉' },
            { label: 'Panic', tag: 'panic', icon: '😱' },
            { label: 'Have Picnic', tag: 'have_picnic', icon: '🧺' },
          ],
        },
        {
          id: 'SKILL2',
          label: 'Second Skill',
          icon: '🎲',
          allowedTags: ['investigate', 'cast_spell', 'set_trap', 'celebrate', 'panic', 'have_picnic'],
          defaultOptions: [
            { label: 'Investigate', tag: 'investigate', icon: '🔍' },
            { label: 'Cast Spell', tag: 'cast_spell', icon: '✨' },
            { label: 'Set Trap', tag: 'set_trap', icon: '🪤' },
            { label: 'Celebrate', tag: 'celebrate', icon: '🎉' },
            { label: 'Panic', tag: 'panic', icon: '😱' },
            { label: 'Have Picnic', tag: 'have_picnic', icon: '🧺' },
          ],
        },
        {
          id: 'TERRAIN',
          label: 'Terrain',
          icon: '🏞️',
          allowedTags: ['forest', 'river', 'cave', 'hilltop'],
          defaultOptions: [
            { label: 'Deep Forest', tag: 'forest', icon: '🌲' },
            { label: 'Rushing River', tag: 'river', icon: '🌊' },
            { label: 'Dark Cave', tag: 'cave', icon: '🕳️' },
            { label: 'Windy Hilltop', tag: 'hilltop', icon: '⛰️' },
          ],
        },
        {
          id: 'WEATHER',
          label: 'Weather',
          icon: '🌤️',
          allowedTags: ['foggy', 'starry', 'stormy', 'magical'],
          defaultOptions: [
            { label: 'Foggy', tag: 'foggy', icon: '🌫️' },
            { label: 'Starry Night', tag: 'starry', icon: '⭐' },
            { label: 'Stormy', tag: 'stormy', icon: '⛈️' },
            { label: 'Magical Glow', tag: 'magical', icon: '✨' },
          ],
        },
      ],
    },
    vignettes: ADVENTURERS_PICNIC_STAGE_3,
    defaultVignette: ADVENTURERS_PICNIC_DEFAULT_3,
    comboRequired: 4,
    comboHints: [
      {
        comboTags: ['investigate', 'cast_spell'],
        hints: [
          'What happens when you study something AND cast a spell?',
          'Research plus magic...',
          'Try Investigate + Cast Spell = Arcane Discovery!',
        ],
      },
      {
        comboTags: ['set_trap', 'celebrate'],
        hints: [
          'What if traps go off during a party?',
          'Setting traps while celebrating...',
          'Try Set Trap + Celebrate = Party Trap!',
        ],
      },
      {
        comboTags: ['panic', 'have_picnic'],
        hints: [
          'What if you eat while panicking?',
          'Food and fear at the same time...',
          'Try Panic + Have Picnic = Panic Picnic!',
        ],
      },
      {
        comboTags: ['cast_spell', 'set_trap'],
        hints: [
          'What if you enchant a trap?',
          'Magic traps with sparkles...',
          'Try Cast Spell + Set Trap = Enchanted Trap!',
        ],
      },
      {
        comboTags: ['investigate', 'have_picnic'],
        hints: [
          'What if you study while eating?',
          'Food and research together...',
          'Try Investigate + Have Picnic = Scholarly Feast!',
        ],
      },
      {
        comboTags: ['celebrate', 'panic'],
        hints: [
          'What if you celebrate and panic at the same time?',
          'Joy and terror together...',
          'Try Celebrate + Panic = Celebration Panic!',
        ],
      },
    ],
  },
];

// ─── DUNGEON CONCERT ────────────────────────────────────────────────────────

export const DUNGEON_CONCERT_STAGES: QuestStage[] = [
  {
    id: 'dungeon-concert-1',
    questId: 'dungeon-concert',
    stageNumber: 1,
    title: 'Dungeon Escape',
    intro: "You're trapped in a dungeon! There's a locked chest, a sleeping guard, and a secret door. What do you do?",
    template: {
      sentence: "The {HERO} tries to {ESCAPE_METHOD} past the {OBSTACLE}",
      slots: [
        {
          id: 'HERO',
          label: 'Hero',
          icon: '⚔️',
          allowedTags: ['knight', 'mage', 'rogue', 'skeleton', 'necromancer', 'team'],
          defaultOptions: [
            { label: 'Knight', tag: 'knight', icon: '🛡️' },
            { label: 'Mage', tag: 'mage', icon: '🧙' },
            { label: 'Rogue', tag: 'rogue', icon: '🗡️' },
            { label: 'Skeleton', tag: 'skeleton', icon: '💀' },
            { label: 'Necromancer', tag: 'necromancer', icon: '☠️' },
            { label: 'The Team', tag: 'team', icon: '👥' },
          ],
        },
        {
          id: 'ESCAPE_METHOD',
          label: 'Escape Plan',
          icon: '🗝️',
          allowedTags: ['sneak', 'fight', 'magic', 'lockpick', 'distract', 'smash'],
          defaultOptions: [
            { label: 'Sneak Past', tag: 'sneak', icon: '🤫' },
            { label: 'Fight Through', tag: 'fight', icon: '⚔️' },
            { label: 'Use Magic', tag: 'magic', icon: '✨' },
            { label: 'Pick the Lock', tag: 'lockpick', icon: '🔑' },
            { label: 'Create Distraction', tag: 'distract', icon: '💨' },
            { label: 'Smash Everything', tag: 'smash', icon: '💥' },
          ],
        },
        {
          id: 'OBSTACLE',
          label: 'Obstacle',
          icon: '🚧',
          allowedTags: ['guard', 'locked_door', 'trap', 'darkness', 'puzzle', 'skeleton_army'],
          defaultOptions: [
            { label: 'Sleeping Guard', tag: 'guard', icon: '💤' },
            { label: 'Locked Door', tag: 'locked_door', icon: '🚪' },
            { label: 'Booby Trap', tag: 'trap', icon: '⚠️' },
            { label: 'Total Darkness', tag: 'darkness', icon: '🌑' },
            { label: 'Ancient Puzzle', tag: 'puzzle', icon: '🧩' },
            { label: 'Skeleton Army', tag: 'skeleton_army', icon: '💀' },
          ],
        },
      ],
    },
    vignettes: DUNGEON_CONCERT_STAGE_1,
    defaultVignette: DUNGEON_CONCERT_DEFAULT,
  },
  {
    id: 'dungeon-concert-2',
    questId: 'dungeon-concert',
    stageNumber: 2,
    title: 'Stealthy Escape',
    intro: "You know the dungeon now. But HOW you escape matters — loud or quiet? Fast or slow? Details change everything!",
    template: {
      sentence: "The {HERO} tries a {STEALTH} {ESCAPE_METHOD} past the {OBSTACLE} at {SPEED} speed",
      slots: [
        {
          id: 'HERO',
          label: 'Hero',
          icon: '⚔️',
          allowedTags: ['knight', 'mage', 'rogue', 'skeleton', 'necromancer', 'team', 'barbarian', 'clown'],
          defaultOptions: [
            { label: 'Knight', tag: 'knight', icon: '🛡️' },
            { label: 'Mage', tag: 'mage', icon: '🧙' },
            { label: 'Rogue', tag: 'rogue', icon: '🗡️' },
            { label: 'Skeleton', tag: 'skeleton', icon: '💀' },
            { label: 'Necromancer', tag: 'necromancer', icon: '☠️' },
            { label: 'Barbarian', tag: 'barbarian', icon: '🪓' },
          ],
        },
        {
          id: 'STEALTH',
          label: 'Stealth Style',
          icon: '🤫',
          allowedTags: ['loud', 'quiet', 'invisible', 'disguised'],
          defaultOptions: [
            { label: 'LOUD!', tag: 'loud', icon: '📢' },
            { label: 'Quiet', tag: 'quiet', icon: '🤫' },
            { label: 'Invisible', tag: 'invisible', icon: '👻' },
            { label: 'Disguised', tag: 'disguised', icon: '🎭' },
          ],
        },
        {
          id: 'ESCAPE_METHOD',
          label: 'Escape Plan',
          icon: '🗝️',
          allowedTags: ['sneak', 'fight', 'magic', 'lockpick', 'distract', 'smash'],
          defaultOptions: [
            { label: 'Sneak Past', tag: 'sneak', icon: '🤫' },
            { label: 'Fight Through', tag: 'fight', icon: '⚔️' },
            { label: 'Use Magic', tag: 'magic', icon: '✨' },
            { label: 'Pick the Lock', tag: 'lockpick', icon: '🔑' },
            { label: 'Create Distraction', tag: 'distract', icon: '💨' },
            { label: 'Smash Everything', tag: 'smash', icon: '💥' },
          ],
        },
        {
          id: 'OBSTACLE',
          label: 'Obstacle',
          icon: '🚧',
          allowedTags: ['guard', 'locked_door', 'trap', 'darkness', 'puzzle', 'skeleton_army'],
          defaultOptions: [
            { label: 'Sleeping Guard', tag: 'guard', icon: '💤' },
            { label: 'Locked Door', tag: 'locked_door', icon: '🚪' },
            { label: 'Booby Trap', tag: 'trap', icon: '⚠️' },
            { label: 'Total Darkness', tag: 'darkness', icon: '🌑' },
            { label: 'Ancient Puzzle', tag: 'puzzle', icon: '🧩' },
            { label: 'Skeleton Army', tag: 'skeleton_army', icon: '💀' },
          ],
        },
        {
          id: 'SPEED',
          label: 'Speed',
          icon: '⏱️',
          allowedTags: ['slow', 'normal', 'fast', 'instant'],
          defaultOptions: [
            { label: 'Slow & Careful', tag: 'slow', icon: '🐢' },
            { label: 'Normal Pace', tag: 'normal', icon: '🚶' },
            { label: 'Fast!', tag: 'fast', icon: '🏃' },
            { label: 'INSTANT', tag: 'instant', icon: '⚡' },
          ],
        },
      ],
    },
    vignettes: DUNGEON_CONCERT_STAGE_2,
    defaultVignette: DUNGEON_CONCERT_DEFAULT_2,
    successTags: [['rogue', 'invisible', 'sneak'], ['necromancer', 'quiet', 'magic']],
  },
  {
    id: 'dungeon-concert-3',
    questId: 'dungeon-concert',
    stageNumber: 3,
    title: 'Combo Escape Artist',
    intro: "The dungeon has new defenses! Combine TWO escape methods with an element to find SECRET escape combos!",
    template: {
      sentence: "Combine {METHOD1} with {METHOD2} using {ELEMENT} power in the {ROOM}",
      slots: [
        {
          id: 'METHOD1',
          label: 'First Method',
          icon: '🗝️',
          allowedTags: ['sneak', 'fight', 'magic', 'lockpick', 'distract', 'smash'],
          defaultOptions: [
            { label: 'Sneak', tag: 'sneak', icon: '🤫' },
            { label: 'Fight', tag: 'fight', icon: '⚔️' },
            { label: 'Magic', tag: 'magic', icon: '✨' },
            { label: 'Lockpick', tag: 'lockpick', icon: '🔑' },
            { label: 'Distract', tag: 'distract', icon: '💨' },
            { label: 'Smash', tag: 'smash', icon: '💥' },
          ],
        },
        {
          id: 'METHOD2',
          label: 'Second Method',
          icon: '🎯',
          allowedTags: ['sneak', 'fight', 'magic', 'lockpick', 'distract', 'smash'],
          defaultOptions: [
            { label: 'Sneak', tag: 'sneak', icon: '🤫' },
            { label: 'Fight', tag: 'fight', icon: '⚔️' },
            { label: 'Magic', tag: 'magic', icon: '✨' },
            { label: 'Lockpick', tag: 'lockpick', icon: '🔑' },
            { label: 'Distract', tag: 'distract', icon: '💨' },
            { label: 'Smash', tag: 'smash', icon: '💥' },
          ],
        },
        {
          id: 'ELEMENT',
          label: 'Element',
          icon: '🔮',
          allowedTags: ['shadow', 'fire', 'ice', 'music'],
          defaultOptions: [
            { label: 'Shadow', tag: 'shadow', icon: '🌑' },
            { label: 'Fire', tag: 'fire', icon: '🔥' },
            { label: 'Ice', tag: 'ice', icon: '❄️' },
            { label: 'Music', tag: 'music', icon: '🎵' },
          ],
        },
        {
          id: 'ROOM',
          label: 'Location',
          icon: '📍',
          allowedTags: ['throne_room', 'treasury', 'armory', 'library'],
          defaultOptions: [
            { label: 'Throne Room', tag: 'throne_room', icon: '👑' },
            { label: 'Treasury', tag: 'treasury', icon: '💰' },
            { label: 'Armory', tag: 'armory', icon: '🛡️' },
            { label: 'Library', tag: 'library', icon: '📚' },
          ],
        },
      ],
    },
    vignettes: DUNGEON_CONCERT_STAGE_3,
    defaultVignette: DUNGEON_CONCERT_DEFAULT_3,
    comboRequired: 4,
    comboHints: [
      {
        comboTags: ['sneak', 'fight'],
        hints: [
          'What if you could be sneaky AND strong?',
          'Hide in the shadows, then... STRIKE!',
          'Try Sneak + Fight = Shadow Strike!',
        ],
      },
      {
        comboTags: ['magic', 'lockpick'],
        hints: [
          'What if your lockpick was enchanted?',
          'Magic that opens any lock...',
          'Try Magic + Lockpick with Fire!',
        ],
      },
      {
        comboTags: ['distract', 'smash'],
        hints: [
          'Make noise HERE, then break through THERE...',
          'A musical distraction while walls crumble...',
          'Try Distract + Smash with Music!',
        ],
      },
      {
        comboTags: ['fight', 'magic'],
        hints: [
          'What if your sword was made of ice?',
          'Frozen weapons hit harder...',
          'Try Fight + Magic with Ice!',
        ],
      },
      {
        comboTags: ['sneak', 'distract'],
        hints: [
          'Send a shadow clone to distract them...',
          'They look one way while you go the other...',
          'Try Sneak + Distract with Shadow!',
        ],
      },
      {
        comboTags: ['lockpick', 'smash'],
        hints: [
          'Pick the lock... then kick the door open anyway!',
          'Precision meets brute force...',
          'Try Lockpick + Smash with Fire!',
        ],
      },
    ],
  },
];

// ─── MAGE KITCHEN ───────────────────────────────────────────────────────────

export const MAGE_KITCHEN_STAGES: QuestStage[] = [
  {
    id: 'mage-kitchen-1',
    questId: 'mage-kitchen',
    stageNumber: 1,
    title: 'Cooking Catastrophe',
    intro: "The mage tried to cook with magic and now the kitchen is ALIVE! Tame it!",
    template: {
      sentence: "Cast {SPELL} on the {APPLIANCE} to make it {RESULT}",
      slots: [
        {
          id: 'SPELL',
          label: 'Spell',
          icon: '🪄',
          allowedTags: ['fire_spell', 'ice_spell', 'grow_spell', 'shrink_spell', 'levitate', 'transform'],
          defaultOptions: [
            { label: 'Fireball', tag: 'fire_spell', icon: '🔥' },
            { label: 'Ice Blast', tag: 'ice_spell', icon: '❄️' },
            { label: 'Grow Big', tag: 'grow_spell', icon: '📈' },
            { label: 'Shrink Down', tag: 'shrink_spell', icon: '📉' },
            { label: 'Levitate', tag: 'levitate', icon: '🪶' },
            { label: 'Transform', tag: 'transform', icon: '🔄' },
          ],
        },
        {
          id: 'APPLIANCE',
          label: 'Target',
          icon: '🍳',
          allowedTags: ['stove', 'fridge', 'pot', 'pan', 'sink', 'oven'],
          defaultOptions: [
            { label: 'Wild Stove', tag: 'stove', icon: '🔥' },
            { label: 'Angry Fridge', tag: 'fridge', icon: '🧊' },
            { label: 'Bubbling Pot', tag: 'pot', icon: '🍲' },
            { label: 'Flying Pan', tag: 'pan', icon: '🍳' },
            { label: 'Leaky Sink', tag: 'sink', icon: '🚰' },
            { label: 'Haunted Oven', tag: 'oven', icon: '♨️' },
          ],
        },
        {
          id: 'RESULT',
          label: 'Result',
          icon: '✨',
          allowedTags: ['cook_perfectly', 'explode', 'dance', 'multiply', 'calm_down', 'go_wild'],
          defaultOptions: [
            { label: 'Cook Perfectly', tag: 'cook_perfectly', icon: '👨‍🍳' },
            { label: 'Explode!', tag: 'explode', icon: '💥' },
            { label: 'Dance Around', tag: 'dance', icon: '💃' },
            { label: 'Multiply', tag: 'multiply', icon: '✖️' },
            { label: 'Calm Down', tag: 'calm_down', icon: '😌' },
            { label: 'Go Even Wilder', tag: 'go_wild', icon: '🌪️' },
          ],
        },
      ],
    },
    vignettes: MAGE_KITCHEN_STAGE_1,
    defaultVignette: MAGE_KITCHEN_DEFAULT,
    successTags: [['fire_spell', 'stove', 'cook_perfectly'], ['ice_spell', 'fridge', 'calm_down']],
  },
  {
    id: 'mage-kitchen-2',
    questId: 'mage-kitchen',
    stageNumber: 2,
    title: 'Precision Spellcasting',
    intro: "The kitchen is getting used to magic — but now the spells need to be PRECISE. Sloppy magic makes sloppy food!",
    template: {
      sentence: "Cast a {INTENSITY} {SPELL} on the {APPLIANCE} to make {QUANTITY} of them {RESULT}",
      slots: [
        {
          id: 'INTENSITY',
          label: 'Power Level',
          icon: '⚡',
          allowedTags: ['tiny', 'medium', 'mega', 'unstable'],
          defaultOptions: [
            { label: 'Tiny Spark', tag: 'tiny', icon: '✨' },
            { label: 'Medium Blast', tag: 'medium', icon: '💫' },
            { label: 'MEGA Surge', tag: 'mega', icon: '⚡' },
            { label: 'Unstable!', tag: 'unstable', icon: '💥' },
          ],
        },
        {
          id: 'SPELL',
          label: 'Spell',
          icon: '🪄',
          allowedTags: ['fire_spell', 'ice_spell', 'grow_spell', 'shrink_spell', 'levitate', 'transform'],
          defaultOptions: [
            { label: 'Fireball', tag: 'fire_spell', icon: '🔥' },
            { label: 'Ice Blast', tag: 'ice_spell', icon: '❄️' },
            { label: 'Grow Big', tag: 'grow_spell', icon: '📈' },
            { label: 'Shrink Down', tag: 'shrink_spell', icon: '📉' },
            { label: 'Levitate', tag: 'levitate', icon: '🪶' },
            { label: 'Transform', tag: 'transform', icon: '🔄' },
          ],
        },
        {
          id: 'APPLIANCE',
          label: 'Target',
          icon: '🍳',
          allowedTags: ['stove', 'fridge', 'pot', 'pan', 'sink', 'oven'],
          defaultOptions: [
            { label: 'Wild Stove', tag: 'stove', icon: '🔥' },
            { label: 'Angry Fridge', tag: 'fridge', icon: '🧊' },
            { label: 'Bubbling Pot', tag: 'pot', icon: '🍲' },
            { label: 'Flying Pan', tag: 'pan', icon: '🍳' },
            { label: 'Leaky Sink', tag: 'sink', icon: '🚰' },
            { label: 'Haunted Oven', tag: 'oven', icon: '♨️' },
          ],
        },
        {
          id: 'QUANTITY',
          label: 'How Many?',
          icon: '🔢',
          allowedTags: ['one', 'a_few', 'a_dozen', 'way_too_many'],
          defaultOptions: [
            { label: 'Just One', tag: 'one', icon: '1️⃣' },
            { label: 'A Few', tag: 'a_few', icon: '🔢' },
            { label: 'A Dozen', tag: 'a_dozen', icon: '📦' },
            { label: 'WAY Too Many', tag: 'way_too_many', icon: '🌊' },
          ],
        },
        {
          id: 'RESULT',
          label: 'Result',
          icon: '✨',
          allowedTags: ['cook_perfectly', 'explode', 'dance', 'multiply', 'calm_down', 'go_wild'],
          defaultOptions: [
            { label: 'Cook Perfectly', tag: 'cook_perfectly', icon: '👨‍🍳' },
            { label: 'Explode!', tag: 'explode', icon: '💥' },
            { label: 'Dance Around', tag: 'dance', icon: '💃' },
            { label: 'Multiply', tag: 'multiply', icon: '✖️' },
            { label: 'Calm Down', tag: 'calm_down', icon: '😌' },
            { label: 'Go Even Wilder', tag: 'go_wild', icon: '🌪️' },
          ],
        },
      ],
    },
    vignettes: MAGE_KITCHEN_STAGE_2,
    defaultVignette: MAGE_KITCHEN_DEFAULT_2,
    successTags: [['mega', 'fire_spell', 'cook_perfectly'], ['tiny', 'ice_spell', 'calm_down']],
  },
  {
    id: 'mage-kitchen-3',
    questId: 'mage-kitchen',
    stageNumber: 3,
    title: 'Combo Master',
    intro: "You know spells, you know power levels — now discover SECRET COMBOS! Some spell pairs create brand new magic!",
    template: {
      sentence: "Mix {SPELL} with {SPELL2} in a {MOOD} way on the {TARGET}",
      slots: [
        {
          id: 'SPELL',
          label: 'First Spell',
          icon: '🪄',
          allowedTags: ['fire_spell', 'ice_spell', 'grow_spell', 'shrink_spell', 'levitate', 'transform'],
          defaultOptions: [
            { label: 'Fireball', tag: 'fire_spell', icon: '🔥' },
            { label: 'Ice Blast', tag: 'ice_spell', icon: '❄️' },
            { label: 'Grow Big', tag: 'grow_spell', icon: '📈' },
            { label: 'Shrink Down', tag: 'shrink_spell', icon: '📉' },
            { label: 'Levitate', tag: 'levitate', icon: '🪶' },
            { label: 'Transform', tag: 'transform', icon: '🔄' },
          ],
        },
        {
          id: 'SPELL2',
          label: 'Second Spell',
          icon: '✨',
          allowedTags: ['fire_spell', 'ice_spell', 'grow_spell', 'shrink_spell', 'levitate', 'transform'],
          defaultOptions: [
            { label: 'Fireball', tag: 'fire_spell', icon: '🔥' },
            { label: 'Ice Blast', tag: 'ice_spell', icon: '❄️' },
            { label: 'Grow Big', tag: 'grow_spell', icon: '📈' },
            { label: 'Shrink Down', tag: 'shrink_spell', icon: '📉' },
            { label: 'Levitate', tag: 'levitate', icon: '🪶' },
            { label: 'Transform', tag: 'transform', icon: '🔄' },
          ],
        },
        {
          id: 'MOOD',
          label: 'Mood',
          icon: '😊',
          allowedTags: ['wild', 'calm', 'curious', 'dramatic'],
          defaultOptions: [
            { label: 'Wild!', tag: 'wild', icon: '🔥' },
            { label: 'Calm', tag: 'calm', icon: '😌' },
            { label: 'Curious', tag: 'curious', icon: '🤔' },
            { label: 'Dramatic', tag: 'dramatic', icon: '🎭' },
          ],
        },
        {
          id: 'TARGET',
          label: 'Target',
          icon: '🎯',
          allowedTags: ['stove', 'fridge', 'pot', 'pan', 'sink', 'oven'],
          defaultOptions: [
            { label: 'Wild Stove', tag: 'stove', icon: '🔥' },
            { label: 'Angry Fridge', tag: 'fridge', icon: '🧊' },
            { label: 'Bubbling Pot', tag: 'pot', icon: '🍲' },
            { label: 'Flying Pan', tag: 'pan', icon: '🍳' },
            { label: 'Leaky Sink', tag: 'sink', icon: '🚰' },
            { label: 'Haunted Oven', tag: 'oven', icon: '♨️' },
          ],
        },
      ],
    },
    vignettes: MAGE_KITCHEN_STAGE_3,
    defaultVignette: MAGE_KITCHEN_DEFAULT_3,
    comboRequired: 4,
    comboHints: [
      {
        comboTags: ['fire_spell', 'ice_spell'],
        hints: [
          'What happens when hot meets cold?',
          'Fire and ice together make...',
          'Try Fire + Ice = Steam!',
        ],
      },
      {
        comboTags: ['grow_spell', 'shrink_spell'],
        hints: [
          'What if you cast two opposite spells?',
          'Grow and shrink at the same time...',
          'Try Grow + Shrink = Size Swap!',
        ],
      },
      {
        comboTags: ['levitate', 'transform'],
        hints: [
          'What if things float AND change?',
          'Levitate plus transformation...',
          'Try Levitate + Transform = Flying Parade!',
        ],
      },
      {
        comboTags: ['fire_spell', 'stove'],
        hints: [
          'Fire on something already hot + wild mood...',
          'What happens if you set the stove on fire when it is wild?',
          'Try Fire + Wild + Stove = Volcano!',
        ],
      },
      {
        comboTags: ['ice_spell', 'oven'],
        hints: [
          'The oven is too hot... what would cool it?',
          'Ice on the haunted oven, calmly...',
          'Try Ice + Calm + Oven = Perfect Temp!',
        ],
      },
      {
        comboTags: ['transform', 'sink'],
        hints: [
          'The sink has water... what if you transform it?',
          'Transform the water with curiosity...',
          'Try Transform + Curious + Sink = Potion Fountain!',
        ],
      },
    ],
  },
];

// ─── MASTER REGISTRY ────────────────────────────────────────────────────────

/** All quest stages indexed by zone ID. */
export const QUEST_STAGES: Record<string, QuestStage[]> = {
  'skeleton-birthday': SKELETON_BIRTHDAY_STAGES,
  'knight-space': KNIGHT_SPACE_STAGES,
  'barbarian-school': BARBARIAN_SCHOOL_STAGES,
  'skeleton-pizza': SKELETON_PIZZA_STAGES,
  'adventurers-picnic': ADVENTURERS_PICNIC_STAGES,
  'dungeon-concert': DUNGEON_CONCERT_STAGES,
  'mage-kitchen': MAGE_KITCHEN_STAGES,
};

/** Get a specific stage, or the first stage for a quest zone. */
export function getQuestStage(questId: string, stageNumber = 1): QuestStage | null {
  const stages = QUEST_STAGES[questId];
  if (!stages) return null;
  return stages.find(s => s.stageNumber === stageNumber) ?? stages[0] ?? null;
}

/** Get all stages for a quest zone. */
export function getQuestStages(questId: string): QuestStage[] {
  return QUEST_STAGES[questId] ?? [];
}
