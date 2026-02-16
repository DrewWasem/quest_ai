/**
 * Mage Kitchen Quest — Vignettes for Stage 1.
 *
 * Stage 1: "Cast {SPELL} on the {APPLIANCE} to make it {RESULT}"
 * Slots: SPELL (fire_spell/ice_spell/grow_spell/shrink_spell/levitate/transform),
 *        APPLIANCE (stove/fridge/pot/pan/sink/oven),
 *        RESULT (cook_perfectly/explode/dance/multiply/calm_down/go_wild)
 *
 * 36 PAIR vignettes (spell×result, wildcard appliance) + 1 DEFAULT = 37 total.
 * Every vignette has unique characters, movement, and comedy.
 */

import type { Vignette } from '../../types/madlibs';
import {
  ENTER_FROM_LEFT,
  ENTER_FROM_RIGHT,
  SNEAK_IN_LEFT,
  CHARGE_IN_LEFT,
  CHARGE_IN_RIGHT,
  DROP_IN,
  TELEPORT_IN,
  FLEE_LEFT,
  FLEE_RIGHT,
  CHASE,
  OBJECT_DROP,
  OBJECT_GROW_REVEAL,
  OBJECT_SPIN_IN,
  OBJECT_RAIN,
  OBJECT_FLOAT_UP,
  OBJECT_SERVE,
  CHARACTER_SPEAK,
  CHARACTER_THINK,
  CHARACTER_EXCLAIM,
  EMOTIONAL_REACT,
  NARRATOR,
  IMPACT,
  CELEBRATION,
  DRAMATIC_PAUSE,
  CROWD_CHEER,
  CROWD_GASP,
  SPELL_CAST,
  ANNOUNCE,
  FLASH,
  EMOTE,
  DANCE,
} from '../movement-templates';

// ─── FIRE SPELL VIGNETTES ────────────────────────────────────────────────────

const FIRE_VIGNETTES: Vignette[] = [
  // ── fire + cook_perfectly: Barbarian Grill Master ──
  {
    id: 'mk_fire_cook', description: 'Barbarian enters as expert grill master, catches and flips food perfectly',
    trigger: { spell: 'fire_spell', appliance: '*', result: 'cook_perfectly' },
    tier: 'moderate', promptScore: 'perfect',
    steps: [
      // SETUP: Narrator + Scene + Props
      ...NARRATOR("The mage prepares to cook with fire magic..."),
      ...OBJECT_SPIN_IN('stove', 'cs-center'),
      ...TELEPORT_IN('mage', 'ds-left'),

      // INTENT: Character speaks/thinks
      ...CHARACTER_SPEAK('mage', 'excited', 'Perfect cooking fire!'),
      ...SPELL_CAST('mage', 'cs-center'),

      // ACTION: Main movement + effects
      ...ANNOUNCE('FLAME GRILL!'),
      ...CHARGE_IN_RIGHT('barbarian', 'ds-right'),
      ...OBJECT_SERVE('pan', 'cs-left', 'ds-right'),
      { parallel: [
        { action: 'spawn', asset: 'bacon_fmp', position: 'ds-left' },
        { action: 'spawn', asset: 'sausage_fmp', position: 'ds-right' },
        { action: 'spawn', asset: 'spatula', position: 'cs-left' },
      ], delayAfter: 0.3 },
      { parallel: [
        { action: 'animate', character: 'barbarian', anim: 'throw' },
        { action: 'spawn', asset: 'burger', position: 'cs-center' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.5 },

      // CONSEQUENCE: Emotional reactions
      ...EMOTIONAL_REACT('barbarian', 'stars-twinkle', 'ds-right'),
      ...EMOTIONAL_REACT('mage', 'hearts-float', 'ds-left'),

      // RESOLUTION: Celebration + Educational narrator
      ...CROWD_CHEER(['barbarian', 'mage']),
      ...CELEBRATION(['barbarian', 'mage']),
      ...NARRATOR("Fire spell + perfect cooking = expert grill master appears!"),
    ],
    feedback: {
      title: 'BARBARIAN GRILL MASTER',
      message: 'Fire + cooking perfectly = the barbarian knows exactly what to do with flames!',
      skillTaught: 'Specificity',
      tip: 'Matching the right spell to the right result brings in the right helper!',
    },
  },

  // ── fire + explode: Pot Rocket Launch ──
  {
    id: 'mk_fire_explode', description: 'Pot launches like a rocket, food rains from sky while cat dodges',
    trigger: { spell: 'fire_spell', appliance: '*', result: 'explode' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      // SETUP: Narrator + Scene + Props
      ...NARRATOR("The mage casts fire on a bubbling pot..."),
      ...OBJECT_SPIN_IN('stove', 'cs-center'),
      ...OBJECT_DROP('pot', 'cs-center-high'),
      ...TELEPORT_IN('mage', 'ds-left'),

      // INTENT: Character speaks + fire effects
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'Cheering' },
        { action: 'emote', character: 'mage', emoji: 'nervous', text: 'Maximum heat!' },
        { action: 'react', effect: 'fire', position: 'ds-left' },
        { action: 'react', effect: 'fire', position: 'cs-center' },
        { action: 'sfx', sound: 'explosion' },
        { action: 'camera_shake', intensity: 0.3, duration: 0.4 },
      ], delayAfter: 2.0 },
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'Idle_A' },
      ], delayAfter: 0.3 },
      ...SPELL_CAST('mage', 'cs-center'),

      // ACTION: Main explosion sequence
      ...ANNOUNCE('FIRE OVERLOAD!'),
      ...DRAMATIC_PAUSE(),
      { parallel: [
        { action: 'move', asset: 'pot', to: 'off-top', style: 'arc' },
        { action: 'react', effect: 'smoke', position: 'cs-center' },
        { action: 'sfx', sound: 'explosion' },
        { action: 'camera_shake', intensity: 0.7, duration: 1.0 },
      ], delayAfter: 0.5 },
      { parallel: [{ action: 'remove', asset: 'pot' }], delayAfter: 0.1 },
      ...FLASH('orange', 0.3),
      ...IMPACT(),
      { parallel: [{ action: 'remove', asset: 'stove' }], delayAfter: 0.1 },
      ...OBJECT_RAIN('burger', 6, 'wide'),

      // CONSEQUENCE: Panic reactions
      ...CROWD_GASP([]),
      ...CHARGE_IN_RIGHT('cat', 'cs-right'),
      ...FLEE_LEFT('cat'),

      // RESOLUTION: Mage panics and runs in a circle
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'Running_A' },
        { action: 'react', effect: 'shock-lines', position: 'ds-left' },
        { action: 'emote', character: 'mage', emoji: 'scared', text: 'What did I do?!' },
      ], delayAfter: 0.3 },
      { parallel: [
        { action: 'move', character: 'mage', to: 'cs-left', style: 'linear' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'move', character: 'mage', to: 'cs-center', style: 'linear' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'move', character: 'mage', to: 'ds-right', style: 'linear' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'move', character: 'mage', to: 'ds-left', style: 'linear' },
        { action: 'react', effect: 'sad-cloud', position: 'ds-left' },
        { action: 'sfx', sound: 'fail' },
        { action: 'text_popup', text: 'Too much heat caused chaos!', position: 'center', size: 'large' },
      ], delayAfter: 0.8 },
    ],
    feedback: {
      title: 'POT ROCKET',
      message: 'Fire + explode = the pot launched into orbit! At least the cat escaped.',
      skillTaught: 'Consequence',
      tip: 'Think about what happens when you combine fire with "explode" — boom!',
    },
  },

  // ── fire + dance: Floor Is Lava Party ──
  {
    id: 'mk_fire_dance', description: 'Kitchen floor catches fire, mage hops around, chicken and dog join the dance',
    trigger: { spell: 'fire_spell', appliance: '*', result: 'dance' },
    tier: 'moderate', promptScore: 'funny_fail',
    steps: [
      ...NARRATOR("The mage casts fire... on the floor!"),
      ...TELEPORT_IN('mage', 'ds-center'),
      ...CHARACTER_EXCLAIM('mage', 'nervous', 'Hot hot hot!'),
      ...SPELL_CAST('mage'),
      ...FLASH('red', 0.2),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'jump_idle' },
        { action: 'emote', character: 'mage', emoji: '🔥' },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.6 },
      ...CHARGE_IN_RIGHT('chicken', 'ds-right'),
      ...CHARGE_IN_LEFT('dog', 'cs-left'),
      ...ANNOUNCE('FLOOR IS LAVA!', 'huge'),
      ...DANCE('mage'),
      ...DANCE('chicken'),
      ...DANCE('dog'),
      ...CROWD_CHEER(['mage', 'chicken', 'dog']),
    ],
    feedback: {
      title: '💃 FLOOR IS LAVA!',
      message: 'Fire + dancing = everyone hopping to avoid the flames! Accidental dance party!',
      skillTaught: 'Creativity',
      tip: 'Sometimes unexpected combos create the funniest scenes!',
    },
  },

  // ── fire + multiply: Infinite Birthday Candles ──
  {
    id: 'mk_fire_multiply', description: 'One candle multiplies into dozens, skeleton firefighter fails to keep up',
    trigger: { spell: 'fire_spell', appliance: '*', result: 'multiply' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("One candle... then two... then MANY!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('candle', 'cs-center'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Let there be light!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('INFINITE FLAMES!'),
      { parallel: [
        { action: 'spawn', asset: 'candle', position: 'cs-left' },
        { action: 'spawn', asset: 'candle', position: 'cs-right' },
        { action: 'spawn', asset: 'candle', position: 'ds-center' },
        { action: 'react', effect: 'fire', position: 'cs-left' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.4 },
      ...CHARGE_IN_RIGHT('skeleton_warrior', 'ds-right'),
      { parallel: [
        { action: 'spawn', asset: 'candle', position: 'us-left' },
        { action: 'spawn', asset: 'candle', position: 'us-right' },
        { action: 'react', effect: 'fire', position: 'ds-center' },
      ], delayAfter: 0.5 },
      ...CROWD_GASP([]),
      ...FLASH('orange'),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'run_panic' },
        { action: 'move', character: 'skeleton_warrior', to: 'off-right', style: 'linear' },
        { action: 'animate', character: 'mage', anim: 'run_panic' },
        { action: 'move', character: 'mage', to: 'off-left', style: 'linear' },
        { action: 'react', effect: 'smoke', position: 'center' },
        { action: 'camera_shake', intensity: 0.5, duration: 0.8 },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🕯️ CANDLE INVASION!',
      message: 'Fire + multiply = candles everywhere! Even the skeleton couldn\'t put them out!',
      skillTaught: 'Consequence',
      tip: 'Multiplying fire is a recipe for chaos — think about what gets multiplied!',
    },
  },

  // ── fire + calm_down: Cozy Kitchen Campfire ──
  {
    id: 'mk_fire_calm', description: 'Fire becomes a cozy campfire, knight and deer join for marshmallows',
    trigger: { spell: 'fire_spell', appliance: '*', result: 'calm_down' },
    tier: 'subtle', promptScore: 'perfect',
    steps: [
      ...NARRATOR("The mage creates a cozy campfire..."),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'content', 'A gentle flame...'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('COZY CAMPFIRE'),
      ...ENTER_FROM_RIGHT('knight', 'ds-right'),
      { parallel: [
        { action: 'animate', character: 'knight', anim: 'sit_floor' },
        { action: 'spawn', asset: 'cupcake', position: 'ds-right' },
      ], delayAfter: 0.5 },
      ...SNEAK_IN_LEFT('deer', 'cs-left'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'sit_floor' },
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'react', effect: 'glow-pulse', position: 'cs-center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 2.0 },
    ],
    feedback: {
      title: '🏕️ CAMPFIRE COZY!',
      message: 'Fire + calm = the perfect campfire! Even a deer wandered in for warmth.',
      skillTaught: 'Tone',
      tip: 'The same spell can be gentle or fierce — the RESULT you ask for matters!',
    },
  },

  // ── fire + go_wild: Unstoppable Penguin ──
  {
    id: 'mk_fire_wild', description: 'Everything catches fire but penguin waddles in completely unbothered',
    trigger: { spell: 'fire_spell', appliance: '*', result: 'go_wild' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Fire goes wild! Everything's ablaze!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_EXCLAIM('mage', 'panic', 'Too much fire!'),
      ...SPELL_CAST('mage'),
      ...ANNOUNCE('INFERNO!', 'huge'),
      ...FLASH('red'),
      ...OBJECT_SPIN_IN('pot', 'cs-left'),
      ...OBJECT_SPIN_IN('pan', 'cs-right'),
      { parallel: [
        { action: 'react', effect: 'fire', position: 'cs-left' },
        { action: 'react', effect: 'fire', position: 'cs-right' },
        { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_RIGHT('penguin', 'cs-center'),
      ...EMOTE('penguin', 'frozen', 'So cool here!'),
      ...CROWD_GASP([]),
      ...EMOTIONAL_REACT('mage', 'shock-lines', 'ds-left'),
      ...NARRATOR("The penguin doesn't even notice the chaos!"),
    ],
    feedback: {
      title: '🔥 INFERNO CHAOS!',
      message: 'Fire + wild = everything burns! But the penguin is totally chill.',
      skillTaught: 'Consequence',
      tip: 'Some results create chaos — but every character reacts differently!',
    },
  },
];

// ─── ICE SPELL VIGNETTES ─────────────────────────────────────────────────────

const ICE_VIGNETTES: Vignette[] = [
  // ── ice + cook_perfectly: Ice Cream Creation ──
  {
    id: 'mk_ice_cook', description: 'Flash-freeze creates ice cream, dog rushes in and steals it',
    trigger: { spell: 'ice_spell', appliance: '*', result: 'cook_perfectly' },
    tier: 'moderate', promptScore: 'perfect',
    steps: [
      ...NARRATOR("The mage creates perfect frozen treats..."),
      ...OBJECT_SPIN_IN('fridge', 'cs-center'),
      { parallel: [
        { action: 'spawn', asset: 'japanese_fridge', position: 'us-left' },
        { action: 'spawn', asset: 'banana_fmp', position: 'ds-left' },
        { action: 'spawn', asset: 'egg_fmp', position: 'ds-right' },
      ], delayAfter: 0.3 },
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Perfect ice cream!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('FROST DESSERT!'),
      ...OBJECT_DROP('cupcake', 'cs-center'),
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.3 },
      ...CHARGE_IN_RIGHT('dog', 'cs-center'),
      { parallel: [
        { action: 'animate', character: 'dog', anim: 'eat' },
        { action: 'despawn', asset: 'cupcake' },
        { action: 'emote', character: 'dog', emoji: 'yummy' },
      ], delayAfter: 0.5 },
      ...FLEE_RIGHT('dog'),
      ...EMOTIONAL_REACT('mage', 'shock-lines', 'ds-left'),
      ...NARRATOR("Perfect ice cream... stolen by the dog!"),
    ],
    feedback: {
      title: '🍦 ICE CREAM HEIST!',
      message: 'Ice + cooking perfectly = instant ice cream! But the dog was faster than you.',
      skillTaught: 'Specificity',
      tip: 'Ice magic can cook things too — by freezing them into delicious treats!',
    },
  },

  // ── ice + explode: Frozen Skeleton Bowling ──
  {
    id: 'mk_ice_explode', description: 'Skeleton gets frozen mid-walk and slides across stage like a bowling ball',
    trigger: { spell: 'ice_spell', appliance: '*', result: 'explode' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Ice spell... EXPLODES?!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'cs-center'),
      ...CHARACTER_EXCLAIM('mage', 'nervous', 'Maximum freeze!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('FREEZE BLAST!'),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'freeze' },
        { action: 'react', effect: 'frost-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'freeze' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'off-right', style: 'slide' },
        { action: 'camera_shake', intensity: 0.5, duration: 0.8 },
        { action: 'sfx', sound: 'slide' },
      ], delayAfter: 0.8 },
      ...FLASH('cyan', 0.3),
      ...IMPACT(),
      ...CROWD_GASP([]),
      ...EMOTIONAL_REACT('mage', 'shock-lines', 'ds-left'),
      ...NARRATOR("The skeleton went bowling!"),
    ],
    feedback: {
      title: '🎳 SKELETON BOWLING!',
      message: 'Ice + explode = frozen skeleton slides across the kitchen like a bowling ball!',
      skillTaught: 'Consequence',
      tip: 'Ice explosions don\'t burn — they freeze and launch!',
    },
  },

  // ── ice + dance: Ice Rink Chaos ──
  {
    id: 'mk_ice_dance', description: 'Kitchen floor freezes into ice rink, ninja and robot slide helplessly',
    trigger: { spell: 'ice_spell', appliance: '*', result: 'dance' },
    tier: 'moderate', promptScore: 'funny_fail',
    steps: [
      ...NARRATOR("The floor freezes into an ice rink!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Ice skating time!'),
      ...SPELL_CAST('mage'),
      ...FLASH('cyan', 0.2),
      ...DROP_IN('ninja', 'cs-left'),
      ...DROP_IN('robot', 'cs-right'),
      { parallel: [
        { action: 'move', character: 'ninja', to: 'cs-right', style: 'slide' },
        { action: 'move', character: 'robot', to: 'cs-left', style: 'slide' },
        { action: 'emote', character: 'ninja', emoji: 'scared' },
        { action: 'emote', character: 'robot', emoji: 'cool' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.8 },
      ...IMPACT(),
      ...ANNOUNCE('ICE SKATING!', 'huge'),
      ...CROWD_CHEER(['ninja', 'robot']),
    ],
    feedback: {
      title: '⛸️ ICE RINK!',
      message: 'Ice + dance = slippery ice rink! The ninja and robot crashed into each other!',
      skillTaught: 'Creativity',
      tip: 'Ice creates slippery chaos — perfect for accidental dancing!',
    },
  },

  // ── ice + multiply: Ice Cream Avalanche ──
  {
    id: 'mk_ice_multiply', description: 'One ice cream multiplies into dozens, filling the kitchen',
    trigger: { spell: 'ice_spell', appliance: '*', result: 'multiply' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("One scoop... then an avalanche!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'excited', 'One scoop please!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('ICE CREAM STORM!'),
      ...OBJECT_DROP('ice_cream', 'cs-center'),
      { parallel: [
        { action: 'spawn', asset: 'ice_cream', position: 'cs-left' },
        { action: 'spawn', asset: 'ice_cream', position: 'cs-right' },
        { action: 'react', effect: 'frost-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'spawn', asset: 'ice_cream', position: 'ds-left' },
        { action: 'spawn', asset: 'ice_cream', position: 'ds-right' },
        { action: 'spawn', asset: 'ice_cream', position: 'us-center' },
      ], delayAfter: 0.4 },
      ...CHARACTER_EXCLAIM('mage', 'shock', 'Too much ice cream!'),
      ...CROWD_GASP([]),
      ...FLASH('white'),
      { parallel: [
        { action: 'react', effect: 'frost-burst', position: 'center' },
        { action: 'camera_shake', intensity: 0.5, duration: 0.8 },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🍦 ICE CREAM AVALANCHE!',
      message: 'Ice + multiply = an entire avalanche of ice cream fills the kitchen!',
      skillTaught: 'Consequence',
      tip: 'Multiplying ice creates endless frozen treats!',
    },
  },

  // ── ice + calm_down: Peaceful Freeze ──
  {
    id: 'mk_ice_calm', description: 'Everything freezes into peaceful silence, cat sleeps, penguin waddles through',
    trigger: { spell: 'ice_spell', appliance: '*', result: 'calm_down' },
    tier: 'subtle', promptScore: 'perfect',
    steps: [
      ...NARRATOR("Everything freezes into peaceful stillness..."),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'content', 'Gentle frost...'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('PEACEFUL FREEZE'),
      ...SNEAK_IN_LEFT('cat', 'cs-left'),
      { parallel: [
        { action: 'animate', character: 'cat', anim: 'sleep' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-left' },
      ], delayAfter: 0.6 },
      ...ENTER_FROM_RIGHT('penguin', 'cs-right'),
      { parallel: [
        { action: 'emote', character: 'penguin', emoji: 'frozen' },
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 2.0 },
    ],
    feedback: {
      title: '❄️ FROZEN PEACE!',
      message: 'Ice + calm = everything freezes into peaceful silence. Perfect for naps!',
      skillTaught: 'Tone',
      tip: 'Ice can be gentle and calming, not just chaotic!',
    },
  },

  // ── ice + go_wild: Frost Golem Rampage ──
  {
    id: 'mk_ice_wild', description: 'Frost golem crashes in, chases mage, but penguin befriends it',
    trigger: { spell: 'ice_spell', appliance: '*', result: 'go_wild' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Ice magic goes completely wild!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_EXCLAIM('mage', 'panic', 'Too much ice!'),
      ...SPELL_CAST('mage'),
      ...ANNOUNCE('BLIZZARD!', 'huge'),
      ...FLASH('cyan'),
      ...CHARGE_IN_RIGHT('frost_golem', 'cs-center'),
      ...CROWD_GASP([]),
      { parallel: [
        { action: 'camera_shake', intensity: 0.7, duration: 1.0 },
        { action: 'sfx', sound: 'stomp' },
      ], delayAfter: 0.5 },
      ...CHASE('frost_golem', 'mage', 'off-left'),
      ...ENTER_FROM_RIGHT('penguin', 'cs-center'),
      { parallel: [
        { action: 'emote', character: 'penguin', emoji: '👋' },
        { action: 'react', effect: 'hearts-float', position: 'cs-center' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '❄️ FROST GOLEM!',
      message: 'Ice + wild = a massive frost golem appears! But the penguin made a friend.',
      skillTaught: 'Consequence',
      tip: 'Wild results create chaos — but sometimes in funny ways!',
    },
  },
];

// ─── GROW SPELL VIGNETTES ────────────────────────────────────────────────────

const GROW_VIGNETTES: Vignette[] = [
  // ── grow + cook_perfectly: Giant Feast ──
  {
    id: 'mk_grow_cook', description: 'Mage grows food into giant feast, barbarian enters drooling with hearts',
    trigger: { spell: 'grow_spell', appliance: '*', result: 'cook_perfectly' },
    tier: 'moderate', promptScore: 'perfect',
    steps: [
      ...NARRATOR("The mage grows a giant feast..."),
      ...OBJECT_SPIN_IN('stove', 'cs-center'),
      { parallel: [
        { action: 'spawn', asset: 'cutting_board', position: 'ds-left' },
        { action: 'spawn', asset: 'mixing_bowl', position: 'ds-right' },
      ], delayAfter: 0.3 },
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Grow big and delicious!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('GIANT FEAST!'),
      { parallel: [
        { action: 'spawn', asset: 'cheese_fmp', position: 'us-left' },
        { action: 'spawn', asset: 'tomato_fmp', position: 'us-right' },
        { action: 'spawn', asset: 'ham', position: 'us-center' },
      ], delayAfter: 0.3 },
      ...OBJECT_GROW_REVEAL('burger', 'cs-center', 2.5),
      ...OBJECT_DROP('pizza', 'cs-left'),
      ...OBJECT_DROP('cupcake', 'cs-right'),
      { parallel: [
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.3 },
      ...CHARGE_IN_RIGHT('barbarian', 'cs-right'),
      ...EMOTE('barbarian', '🤤', 'SO HUNGRY!'),
      ...CROWD_CHEER(['barbarian', 'mage']),
      ...CELEBRATION(['barbarian', 'mage']),
      ...NARRATOR("Grow + perfect cooking = a feast for heroes!"),
    ],
    feedback: {
      title: '🍔 GIANT FEAST!',
      message: 'Grow + cooking perfectly = massive delicious food! The barbarian is thrilled!',
      skillTaught: 'Specificity',
      tip: 'Grow spell makes things BIGGER — combined with perfect cooking, you get a feast!',
    },
  },

  // ── grow + explode: Giant Apple Pop ──
  {
    id: 'mk_grow_explode', description: 'Apple grows bigger and bigger until it pops, fruit rains everywhere',
    trigger: { spell: 'grow_spell', appliance: '*', result: 'explode' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("The apple grows... and grows... and..."),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('apple', 'cs-center'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Grow huge!'),
      ...SPELL_CAST('mage', 'cs-center'),
      { parallel: [
        { action: 'grow', asset: 'apple', scale: 2.0, duration: 0.6 },
        { action: 'react', effect: 'glow-pulse', position: 'cs-center' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'grow', asset: 'apple', scale: 3.0, duration: 0.4 },
        { action: 'react', effect: 'warning-flash', position: 'cs-center' },
      ], delayAfter: 0.4 },
      ...CHARACTER_EXCLAIM('mage', 'panic', 'Too big!'),
      ...ANNOUNCE('APPLE BOMB!', 'huge'),
      { parallel: [
        { action: 'despawn', asset: 'apple' },
        { action: 'react', effect: 'confetti-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'explosion' },
        { action: 'camera_shake', intensity: 0.7, duration: 1.0 },
      ], delayAfter: 0.5 },
      ...FLASH('green'),
      ...OBJECT_RAIN('apple', 8, 'wide'),
      ...CROWD_GASP([]),
      ...EMOTIONAL_REACT('mage', 'shock-lines', 'ds-left'),
      ...NARRATOR("It grew too big and exploded!"),
    ],
    feedback: {
      title: '🍎 GIANT APPLE POP!',
      message: 'Grow + explode = the apple got SO big it popped! Fruit everywhere!',
      skillTaught: 'Consequence',
      tip: 'Growing + exploding = things get bigger until they BURST!',
    },
  },

  // ── grow + dance: Giant Carrot Chase ──
  {
    id: 'mk_grow_dance', description: 'Giant carrot appears, chicken goes berserk chasing it around the stage',
    trigger: { spell: 'grow_spell', appliance: '*', result: 'dance' },
    tier: 'moderate', promptScore: 'funny_fail',
    steps: [
      ...NARRATOR("A giant dancing carrot appears!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Grow and dance!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('MEGA CARROT!'),
      ...OBJECT_GROW_REVEAL('carrot', 'cs-center', 2.5),
      { parallel: [
        { action: 'animate', asset: 'carrot', anim: 'wiggle' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
      ], delayAfter: 0.5 },
      ...CHARGE_IN_RIGHT('chicken', 'cs-right'),
      ...EMOTE('chicken', '😍', 'MINE!'),
      ...CHASE('chicken', 'carrot', 'cs-left'),
      ...CROWD_CHEER(['chicken']),
    ],
    feedback: {
      title: '🥕 CARROT CHASE!',
      message: 'Grow + dance = a giant wiggling carrot! The chicken went crazy!',
      skillTaught: 'Creativity',
      tip: 'Unexpected combos create hilarious scenes!',
    },
  },

  // ── grow + multiply: Pot Overflow ──
  {
    id: 'mk_grow_multiply', description: 'Pots keep duplicating and growing, kitchen overflows',
    trigger: { spell: 'grow_spell', appliance: '*', result: 'multiply' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Pots multiply AND grow... uh oh!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('pot', 'cs-center'),
      ...CHARACTER_SPEAK('mage', 'excited', 'More pots!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('POT STORM!'),
      { parallel: [
        { action: 'spawn', asset: 'pot', position: 'cs-left' },
        { action: 'spawn', asset: 'pot', position: 'cs-right' },
        { action: 'grow', asset: 'pot', scale: 1.5, duration: 0.4 },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn', asset: 'pot', position: 'ds-center' },
        { action: 'spawn', asset: 'pot', position: 'us-center' },
        { action: 'grow', asset: 'pot', scale: 2.0, duration: 0.4 },
      ], delayAfter: 0.5 },
      ...CHARACTER_EXCLAIM('mage', 'panic', 'Too many pots!'),
      ...CROWD_GASP([]),
      ...FLASH('yellow'),
      { parallel: [
        { action: 'react', effect: 'smoke', position: 'center' },
        { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🍲 POT OVERFLOW!',
      message: 'Grow + multiply = pots duplicate AND get bigger! Total kitchen overflow!',
      skillTaught: 'Consequence',
      tip: 'Combining two effects creates double chaos!',
    },
  },

  // ── grow + calm_down: Zen Garden ──
  {
    id: 'mk_grow_calm', description: 'Giant mushroom grows inside kitchen creating a zen garden, deer wanders in',
    trigger: { spell: 'grow_spell', appliance: '*', result: 'calm_down' },
    tier: 'subtle', promptScore: 'perfect',
    steps: [
      ...NARRATOR("A peaceful mushroom grows in the kitchen..."),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'content', 'Gentle growth...'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('ZEN GARDEN'),
      ...OBJECT_GROW_REVEAL('mushroom', 'cs-center', 2.0),
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.6 },
      ...SNEAK_IN_LEFT('deer', 'cs-left'),
      { parallel: [
        { action: 'animate', character: 'deer', anim: 'idle_calm' },
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 2.0 },
    ],
    feedback: {
      title: '🍄 ZEN GARDEN!',
      message: 'Grow + calm = a peaceful mushroom garden appears! Even a deer came to visit.',
      skillTaught: 'Tone',
      tip: 'Growth can be gentle and peaceful, not just chaotic!',
    },
  },

  // ── grow + go_wild: Kitchen Jungle ──
  {
    id: 'mk_grow_wild', description: 'Kitchen becomes a jungle with vegetables and mushrooms, tiger appears causing panic',
    trigger: { spell: 'grow_spell', appliance: '*', result: 'go_wild' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Plants grow wildly out of control!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_EXCLAIM('mage', 'panic', 'Too much growth!'),
      ...SPELL_CAST('mage'),
      ...ANNOUNCE('WILD JUNGLE!', 'huge'),
      ...FLASH('green'),
      { parallel: [
        { action: 'spawn', asset: 'mushroom', position: 'cs-left' },
        { action: 'spawn', asset: 'broccoli_fmp', position: 'cs-right' },
        { action: 'spawn', asset: 'pumpkin_fmp', position: 'cs-far-left' },
        { action: 'spawn', asset: 'watermelon_fmp', position: 'cs-far-right' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn', asset: 'carrot_fmp', position: 'ds-center' },
        { action: 'spawn', asset: 'mushroom', position: 'us-center' },
        { action: 'spawn', asset: 'corn_fmp', position: 'ds-far-left' },
        { action: 'spawn', asset: 'bell_pepper', position: 'us-left' },
        { action: 'spawn', asset: 'cucumber_fmp', position: 'us-right' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
      ], delayAfter: 0.5 },
      ...CHARGE_IN_RIGHT('tiger', 'cs-center'),
      ...CROWD_GASP([]),
      ...EMOTE('tiger', '🐅', 'ROAR!'),
      { parallel: [
        { action: 'camera_shake', intensity: 0.7, duration: 1.0 },
      ], delayAfter: 0.5 },
      ...FLEE_LEFT('mage'),
      ...NARRATOR("The kitchen turned into a jungle! A tiger moved in!"),
    ],
    feedback: {
      title: '🌴 KITCHEN JUNGLE!',
      message: 'Grow + wild = the kitchen becomes a jungle! Even a tiger showed up!',
      skillTaught: 'Consequence',
      tip: 'Wild growth creates total chaos — nature takes over!',
    },
  },
];

// ─── SHRINK SPELL VIGNETTES ──────────────────────────────────────────────────

const SHRINK_VIGNETTES: Vignette[] = [
  // ── shrink + cook_perfectly: Dollhouse Kitchen ──
  {
    id: 'mk_shrink_cook', description: 'Kitchen shrinks to dollhouse size, giant cat peers in from outside',
    trigger: { spell: 'shrink_spell', appliance: '*', result: 'cook_perfectly' },
    tier: 'moderate', promptScore: 'perfect',
    steps: [
      ...NARRATOR("Everything shrinks to dollhouse size..."),
      ...OBJECT_SPIN_IN('stove', 'cs-center'),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Tiny kitchen!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('MINI MODE!'),
      { parallel: [
        { action: 'grow', asset: 'stove', scale: 0.4, duration: 0.6 },
        { action: 'grow', character: 'mage', scale: 0.4, duration: 0.6 },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.8 },
      ...OBJECT_DROP('burger', 'cs-center'),
      { parallel: [
        { action: 'grow', asset: 'burger', scale: 0.3, duration: 0.3 },
        { action: 'react', effect: 'hearts-float', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_RIGHT('cat', 'off-right'),
      { parallel: [
        { action: 'grow', character: 'cat', scale: 3.0, duration: 0.5 },
        { action: 'emote', character: 'cat', emoji: 'suspicious' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🏠 DOLLHOUSE KITCHEN!',
      message: 'Shrink + perfect cooking = a tiny perfect meal! The cat looks like a giant!',
      skillTaught: 'Specificity',
      tip: 'Shrinking everything makes the cat seem HUGE!',
    },
  },

  // ── shrink + explode: Pressure Cooker Launch ──
  {
    id: 'mk_shrink_explode', description: 'Compressed pot builds pressure and launches mage across the stage',
    trigger: { spell: 'shrink_spell', appliance: '*', result: 'explode' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Shrinking + exploding = pressure cooker!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('pot', 'cs-center'),
      ...CHARACTER_EXCLAIM('mage', 'nervous', 'Shrink it!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('PRESSURE BUILD!'),
      { parallel: [
        { action: 'grow', asset: 'pot', scale: 0.5, duration: 0.4 },
        { action: 'react', effect: 'warning-flash', position: 'cs-center' },
        { action: 'sfx', sound: 'pressure' },
      ], delayAfter: 0.5 },
      ...DRAMATIC_PAUSE(),
      { parallel: [
        { action: 'move', asset: 'pot', to: 'off-top', style: 'arc' },
        { action: 'move', character: 'mage', to: 'off-right', style: 'arc' },
        { action: 'react', effect: 'confetti-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'explosion' },
        { action: 'camera_shake', intensity: 0.8, duration: 1.0 },
      ], delayAfter: 1.0 },
      ...FLASH('red'),
      ...CROWD_GASP([]),
      ...IMPACT(),
      ...NARRATOR("The pressure launched everything!"),
    ],
    feedback: {
      title: '💥 PRESSURE COOKER!',
      message: 'Shrink + explode = compressed pressure explosion! The mage got launched!',
      skillTaught: 'Consequence',
      tip: 'Shrinking and exploding creates HUGE pressure!',
    },
  },

  // ── shrink + dance: Godzilla Chicken ──
  {
    id: 'mk_shrink_dance', description: 'Everyone shrinks except the chicken, who struts through like Godzilla',
    trigger: { spell: 'shrink_spell', appliance: '*', result: 'dance' },
    tier: 'moderate', promptScore: 'funny_fail',
    steps: [
      ...NARRATOR("Everything shrinks... except the chicken!"),
      ...TELEPORT_IN('mage', 'ds-center'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Shrink time!'),
      ...SPELL_CAST('mage'),
      { parallel: [
        { action: 'grow', character: 'mage', scale: 0.4, duration: 0.6 },
        { action: 'react', effect: 'sparkle-magic', position: 'ds-center' },
      ], delayAfter: 0.6 },
      ...CHARGE_IN_RIGHT('chicken', 'cs-center'),
      { parallel: [
        { action: 'grow', character: 'chicken', scale: 2.5, duration: 0.6 },
        { action: 'animate', character: 'chicken', anim: 'walk_proud' },
      ], delayAfter: 0.6 },
      ...ANNOUNCE('GODZILLA CHICKEN!', 'huge'),
      ...EMOTE('chicken', '🐔', 'BOK BOK!'),
      ...CROWD_GASP([]),
      { parallel: [
        { action: 'camera_shake', intensity: 0.5, duration: 0.8 },
        { action: 'sfx', sound: 'stomp' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🐔 GODZILLA CHICKEN!',
      message: 'Shrink + dance = the chicken looks GIGANTIC now! It\'s strutting around!',
      skillTaught: 'Creativity',
      tip: 'When you shrink, everything else looks HUGE!',
    },
  },

  // ── shrink + multiply: Tiny Food Swarm ──
  {
    id: 'mk_shrink_multiply', description: 'Tiny foods scatter everywhere like ants, cat goes crazy trying to catch them',
    trigger: { spell: 'shrink_spell', appliance: '*', result: 'multiply' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Tiny food multiplies like ants!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Tiny snacks!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('MINI SWARM!'),
      { parallel: [
        { action: 'spawn', asset: 'apple', position: 'cs-left', scale: 0.3 },
        { action: 'spawn', asset: 'burger', position: 'cs-center', scale: 0.3 },
        { action: 'spawn', asset: 'pizza', position: 'cs-right', scale: 0.3 },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'spawn', asset: 'apple', position: 'ds-left', scale: 0.3 },
        { action: 'spawn', asset: 'cupcake', position: 'ds-right', scale: 0.3 },
        { action: 'spawn', asset: 'burger', position: 'us-center', scale: 0.3 },
      ], delayAfter: 0.4 },
      ...CHARGE_IN_RIGHT('cat', 'cs-right'),
      ...EMOTE('cat', '😵', 'TOO MANY!'),
      ...CROWD_CHEER(['cat']),
      { parallel: [
        { action: 'animate', character: 'cat', anim: 'run_panic' },
        { action: 'move', character: 'cat', to: 'off-right', style: 'linear' },
        { action: 'react', effect: 'chaos-lines', position: 'center' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🐜 TINY FOOD SWARM!',
      message: 'Shrink + multiply = hundreds of tiny snacks everywhere! The cat can\'t catch them!',
      skillTaught: 'Consequence',
      tip: 'Shrinking + multiplying = chaos in miniature form!',
    },
  },

  // ── shrink + calm_down: Peaceful Miniature World ──
  {
    id: 'mk_shrink_calm', description: 'Everything shrinks into a peaceful miniature world, penguin waddles through confused',
    trigger: { spell: 'shrink_spell', appliance: '*', result: 'calm_down' },
    tier: 'subtle', promptScore: 'perfect',
    steps: [
      ...NARRATOR("Everything becomes peacefully tiny..."),
      ...OBJECT_SPIN_IN('stove', 'cs-center'),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'content', 'Small and calm...'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('TINY WORLD'),
      { parallel: [
        { action: 'grow', asset: 'stove', scale: 0.5, duration: 0.8 },
        { action: 'grow', character: 'mage', scale: 0.5, duration: 0.8 },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
      ], delayAfter: 0.8 },
      ...ENTER_FROM_RIGHT('penguin', 'cs-right'),
      { parallel: [
        { action: 'emote', character: 'penguin', emoji: 'confused' },
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 2.0 },
    ],
    feedback: {
      title: '🏘️ MINIATURE WORLD!',
      message: 'Shrink + calm = a peaceful tiny world! The penguin is confused but happy.',
      skillTaught: 'Tone',
      tip: 'Shrinking can be gentle and calming, creating a tiny peaceful scene!',
    },
  },

  // ── shrink + go_wild: Size Chaos ──
  {
    id: 'mk_shrink_wild', description: 'Random things keep changing size chaotically, nothing stays stable',
    trigger: { spell: 'shrink_spell', appliance: '*', result: 'go_wild' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Sizes go completely wild!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('pot', 'cs-center'),
      ...CHARACTER_EXCLAIM('mage', 'panic', 'Shrink everything!'),
      ...SPELL_CAST('mage'),
      ...ANNOUNCE('SIZE CHAOS!', 'huge'),
      ...FLASH('purple'),
      { parallel: [
        { action: 'grow', asset: 'pot', scale: 0.3, duration: 0.3 },
        { action: 'grow', character: 'mage', scale: 1.5, duration: 0.3 },
        { action: 'react', effect: 'warning-flash', position: 'cs-center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'grow', asset: 'pot', scale: 2.0, duration: 0.3 },
        { action: 'grow', character: 'mage', scale: 0.5, duration: 0.3 },
        { action: 'react', effect: 'chaos-lines', position: 'center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.4 },
      ...CROWD_GASP([]),
      { parallel: [
        { action: 'grow', asset: 'pot', scale: 0.6, duration: 0.3 },
        { action: 'grow', character: 'mage', scale: 1.2, duration: 0.3 },
        { action: 'camera_shake', intensity: 0.7, duration: 1.0 },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '📏 SIZE CHAOS!',
      message: 'Shrink + wild = sizes change randomly! Nothing stays the same!',
      skillTaught: 'Consequence',
      tip: 'Wild shrinking creates unstable chaos — everything keeps changing!',
    },
  },
];

// ─── LEVITATE SPELL VIGNETTES ────────────────────────────────────────────────

const LEVITATE_VIGNETTES: Vignette[] = [
  // ── levitate + cook_perfectly: Zero Gravity Chef ──
  {
    id: 'mk_lev_cook', description: 'Ingredients float in zero gravity, space_ranger helps assemble a mid-air meal',
    trigger: { spell: 'levitate', appliance: '*', result: 'cook_perfectly' },
    tier: 'moderate', promptScore: 'perfect',
    steps: [
      ...NARRATOR("Ingredients float in zero gravity..."),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Floating chef mode!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('ZERO-G COOKING!'),
      ...OBJECT_FLOAT_UP('burger', 'cs-left'),
      ...OBJECT_FLOAT_UP('pizza', 'cs-center'),
      ...OBJECT_FLOAT_UP('apple', 'cs-right'),
      { parallel: [
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.3 },
      ...DROP_IN('space_ranger', 'ds-right'),
      ...EMOTE('space_ranger', '🚀', 'Space chef here!'),
      { parallel: [
        { action: 'animate', character: 'space_ranger', anim: 'assemble' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.6 },
      ...CROWD_CHEER(['space_ranger', 'mage']),
      ...CELEBRATION(['space_ranger', 'mage']),
      ...NARRATOR("Zero gravity cooking = space ranger expertise!"),
    ],
    feedback: {
      title: '🚀 ZERO GRAVITY CHEF!',
      message: 'Levitate + perfect cooking = floating meal assembly! The space ranger knows how!',
      skillTaught: 'Specificity',
      tip: 'Floating food needs a space expert to assemble it!',
    },
  },

  // ── levitate + explode: Floating Pot Collision ──
  {
    id: 'mk_lev_explode', description: 'Floating pots collide mid-air causing chain explosions, cat gets launched',
    trigger: { spell: 'levitate', appliance: '*', result: 'explode' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Pots float... then collide!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_EXCLAIM('mage', 'nervous', 'Float up!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...OBJECT_FLOAT_UP('pot', 'cs-left'),
      ...OBJECT_FLOAT_UP('pan', 'cs-right'),
      { parallel: [
        { action: 'move', asset: 'pot', to: 'cs-center', style: 'arc' },
        { action: 'move', asset: 'pan', to: 'cs-center', style: 'arc' },
      ], delayAfter: 0.6 },
      ...ANNOUNCE('COLLISION!', 'huge'),
      { parallel: [
        { action: 'despawn', asset: 'pot' },
        { action: 'despawn', asset: 'pan' },
        { action: 'react', effect: 'confetti-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'explosion' },
        { action: 'camera_shake', intensity: 0.8, duration: 1.0 },
      ], delayAfter: 0.5 },
      ...FLASH('yellow'),
      ...CROWD_GASP([]),
      ...CHARGE_IN_RIGHT('cat', 'cs-right'),
      { parallel: [
        { action: 'move', character: 'cat', to: 'off-left', style: 'arc' },
        { action: 'emote', character: 'cat', emoji: 'scared' },
      ], delayAfter: 1.0 },
      ...NARRATOR("The pots exploded mid-air!"),
    ],
    feedback: {
      title: '💥 MID-AIR EXPLOSION!',
      message: 'Levitate + explode = floating pots crashed into each other! KABOOM!',
      skillTaught: 'Consequence',
      tip: 'Floating explosions create mid-air chaos!',
    },
  },

  // ── levitate + dance: Floating Animals ──
  {
    id: 'mk_lev_dance', description: 'Cat and dog float helplessly paddling in mid-air while mage laughs',
    trigger: { spell: 'levitate', appliance: '*', result: 'dance' },
    tier: 'moderate', promptScore: 'funny_fail',
    steps: [
      ...NARRATOR("Everyone starts floating!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Float and dance!'),
      ...SPELL_CAST('mage'),
      ...DROP_IN('cat', 'cs-left'),
      ...DROP_IN('dog', 'cs-right'),
      ...ANNOUNCE('FLOATING DANCE!', 'huge'),
      ...EMOTE('cat', '😵', 'Help!'),
      ...EMOTE('dog', '🤪', 'Wheee!'),
      { parallel: [
        { action: 'animate', character: 'cat', anim: 'float_paddle' },
        { action: 'animate', character: 'dog', anim: 'float_paddle' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.8 },
      ...CROWD_CHEER(['cat', 'dog']),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'laugh' },
        { action: 'react', effect: 'laugh-tears', position: 'top' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🎈 FLOATING DANCE!',
      message: 'Levitate + dance = the animals paddle helplessly in mid-air! So funny!',
      skillTaught: 'Creativity',
      tip: 'Floating creates accidental chaos when things try to move!',
    },
  },

  // ── levitate + multiply: Spinning Pot Tornado ──
  {
    id: 'mk_lev_multiply', description: 'Ring of floating pots surrounds mage, spinning like a tornado',
    trigger: { spell: 'levitate', appliance: '*', result: 'multiply' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Floating pots multiply into a tornado!"),
      ...TELEPORT_IN('mage', 'ds-center'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Float and multiply!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('POT TORNADO!'),
      ...OBJECT_FLOAT_UP('pot', 'cs-center'),
      { parallel: [
        { action: 'spawn', asset: 'pot', position: 'cs-left' },
        { action: 'spawn', asset: 'pot', position: 'cs-right' },
        { action: 'move', asset: 'pot', to: 'us-center', style: 'orbit' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn', asset: 'pot', position: 'ds-left' },
        { action: 'spawn', asset: 'pot', position: 'ds-right' },
        { action: 'move', asset: 'pot', to: 'cs-center', style: 'orbit' },
      ], delayAfter: 0.5 },
      ...CHARACTER_EXCLAIM('mage', 'panic', 'Pot tornado!'),
      ...CROWD_GASP([]),
      ...FLASH('cyan'),
      { parallel: [
        { action: 'react', effect: 'tornado-swirl', position: 'center' },
        { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🌪️ POT TORNADO!',
      message: 'Levitate + multiply = floating pots spin around you like a tornado!',
      skillTaught: 'Consequence',
      tip: 'Multiplying floating objects creates orbital chaos!',
    },
  },

  // ── levitate + calm_down: Peaceful Float ──
  {
    id: 'mk_lev_calm', description: 'Everyone floats up peacefully, cat sleeps mid-air, ninja meditates',
    trigger: { spell: 'levitate', appliance: '*', result: 'calm_down' },
    tier: 'subtle', promptScore: 'perfect',
    steps: [
      ...NARRATOR("Everyone floats peacefully upward..."),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'content', 'Gentle float...'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('PEACEFUL FLOAT'),
      { parallel: [
        { action: 'move', character: 'mage', to: 'us-left', style: 'float' },
        { action: 'react', effect: 'sparkle-magic', position: 'us-left' },
      ], delayAfter: 0.6 },
      ...DROP_IN('cat', 'us-center'),
      { parallel: [
        { action: 'animate', character: 'cat', anim: 'sleep' },
        { action: 'emote', character: 'cat', emoji: 'sleeping' },
      ], delayAfter: 0.5 },
      ...DROP_IN('ninja', 'us-right'),
      { parallel: [
        { action: 'animate', character: 'ninja', anim: 'meditate' },
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 2.0 },
    ],
    feedback: {
      title: '☁️ PEACEFUL FLOAT!',
      message: 'Levitate + calm = everyone floats peacefully! The cat even sleeps mid-air!',
      skillTaught: 'Tone',
      tip: 'Floating can be calm and meditative, not just chaotic!',
    },
  },

  // ── levitate + go_wild: Anti-Gravity Chaos ──
  {
    id: 'mk_lev_wild', description: 'Knight enters and immediately levitates, tiger floats, total anti-gravity chaos',
    trigger: { spell: 'levitate', appliance: '*', result: 'go_wild' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Anti-gravity goes wild!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_EXCLAIM('mage', 'panic', 'Too much float!'),
      ...SPELL_CAST('mage'),
      ...ANNOUNCE('GRAVITY OFF!', 'huge'),
      ...FLASH('purple'),
      { parallel: [
        { action: 'move', character: 'mage', to: 'us-left', style: 'float' },
        { action: 'react', effect: 'warning-flash', position: 'cs-center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_RIGHT('knight', 'cs-right'),
      { parallel: [
        { action: 'move', character: 'knight', to: 'us-right', style: 'float' },
        { action: 'emote', character: 'knight', emoji: 'scared' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.5 },
      ...CHARGE_IN_LEFT('tiger', 'cs-left'),
      ...CROWD_GASP([]),
      { parallel: [
        { action: 'move', character: 'tiger', to: 'us-center', style: 'float' },
        { action: 'emote', character: 'tiger', emoji: '🐅' },
        { action: 'camera_shake', intensity: 0.7, duration: 1.0 },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🎪 ANTI-GRAVITY CHAOS!',
      message: 'Levitate + wild = everyone floats uncontrollably! Even the tiger!',
      skillTaught: 'Consequence',
      tip: 'Wild levitation affects EVERYTHING — total gravity chaos!',
    },
  },
];

// ─── TRANSFORM SPELL VIGNETTES ───────────────────────────────────────────────

const TRANSFORM_VIGNETTES: Vignette[] = [
  // ── transform + cook_perfectly: Gourmet Transformation ──
  {
    id: 'mk_trans_cook', description: 'Raw ingredients transform one by one into gourmet dishes, ranger celebrates',
    trigger: { spell: 'transform', appliance: '*', result: 'cook_perfectly' },
    tier: 'moderate', promptScore: 'perfect',
    steps: [
      ...NARRATOR("Ingredients transform into gourmet dishes..."),
      { parallel: [
        { action: 'spawn', asset: 'japanese_oven', position: 'us-center' },
        { action: 'spawn', asset: 'knife_block', position: 'ds-far-left' },
        { action: 'spawn', asset: 'whisk', position: 'ds-far-right' },
      ], delayAfter: 0.3 },
      ...TELEPORT_IN('mage', 'ds-left'),
      { parallel: [
        { action: 'spawn', asset: 'potato_fmp', position: 'us-left' },
        { action: 'spawn', asset: 'onion_fmp', position: 'us-right' },
      ], delayAfter: 0.2 },
      ...OBJECT_DROP('apple', 'cs-left'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Transform perfectly!'),
      ...SPELL_CAST('mage', 'cs-left'),
      ...ANNOUNCE('GOURMET MAGIC!'),
      { parallel: [
        { action: 'despawn', asset: 'apple' },
        { action: 'spawn', asset: 'pizza', position: 'cs-left' },
        { action: 'react', effect: 'transform-burst', position: 'cs-left' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.5 },
      ...OBJECT_DROP('carrot_fmp', 'cs-right'),
      { parallel: [
        { action: 'despawn', asset: 'carrot_fmp' },
        { action: 'spawn', asset: 'burger', position: 'cs-right' },
        { action: 'react', effect: 'transform-burst', position: 'cs-right' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.5 },
      ...CHARGE_IN_RIGHT('space_ranger', 'ds-right'),
      ...CELEBRATION(['space_ranger', 'mage']),
      ...NARRATOR("Perfect transformations = gourmet feast!"),
    ],
    feedback: {
      title: '✨ GOURMET TRANSFORM!',
      message: 'Transform + perfect cooking = raw food becomes gourmet dishes!',
      skillTaught: 'Specificity',
      tip: 'Transformation changes things into something better when combined with perfection!',
    },
  },

  // ── transform + explode: Rocket Stove ──
  {
    id: 'mk_trans_explode', description: 'Stove transforms into a rocket and launches through the roof',
    trigger: { spell: 'transform', appliance: '*', result: 'explode' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("The stove transforms... into a rocket?!"),
      ...OBJECT_SPIN_IN('stove', 'cs-center'),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_EXCLAIM('mage', 'nervous', 'Transform!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('ROCKET TRANSFORM!'),
      { parallel: [
        { action: 'despawn', asset: 'stove' },
        { action: 'spawn', asset: 'rocket', position: 'cs-center' },
        { action: 'react', effect: 'transform-burst', position: 'cs-center' },
        { action: 'react', effect: 'warning-flash', position: 'cs-center' },
      ], delayAfter: 0.5 },
      ...DRAMATIC_PAUSE(),
      { parallel: [
        { action: 'move', asset: 'rocket', to: 'off-top', style: 'arc' },
        { action: 'react', effect: 'fire', position: 'cs-center' },
        { action: 'sfx', sound: 'rocket_launch' },
        { action: 'camera_shake', intensity: 0.9, duration: 1.2 },
      ], delayAfter: 1.0 },
      ...FLASH('orange'),
      ...CROWD_GASP([]),
      ...IMPACT(),
      ...EMOTIONAL_REACT('mage', 'shock-lines', 'ds-left'),
      ...NARRATOR("The stove became a rocket and launched!"),
    ],
    feedback: {
      title: '🚀 ROCKET STOVE!',
      message: 'Transform + explode = the stove turned into a rocket and blasted off!',
      skillTaught: 'Consequence',
      tip: 'Transformation + explosion = things turn into explosive objects!',
    },
  },

  // ── transform + dance: Living Kitchen ──
  {
    id: 'mk_trans_dance', description: 'Kitchen items transform into living characters that dance together',
    trigger: { spell: 'transform', appliance: '*', result: 'dance' },
    tier: 'moderate', promptScore: 'funny_fail',
    steps: [
      ...NARRATOR("Kitchen items come to life!"),
      { parallel: [
        { action: 'spawn', asset: 'bread_oven', position: 'us-left' },
        { action: 'spawn', asset: 'coffee_machine', position: 'us-right' },
        { action: 'spawn', asset: 'ladle', position: 'ds-far-left' },
        { action: 'spawn', asset: 'big_spoon', position: 'ds-far-right' },
      ], delayAfter: 0.3 },
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('pot', 'cs-left'),
      ...OBJECT_DROP('pan', 'cs-right'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Dance and transform!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('COME ALIVE!'),
      { parallel: [
        { action: 'despawn', asset: 'pot' },
        { action: 'spawn_character', character: 'robot', position: 'cs-left' },
        { action: 'react', effect: 'transform-burst', position: 'cs-left' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'despawn', asset: 'pan' },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-right' },
        { action: 'react', effect: 'transform-burst', position: 'cs-right' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.5 },
      ...DANCE('robot'),
      ...DANCE('skeleton_warrior'),
      ...CROWD_CHEER(['robot', 'skeleton_warrior']),
    ],
    feedback: {
      title: '💃 LIVING KITCHEN!',
      message: 'Transform + dance = the pots turned into dancing characters!',
      skillTaught: 'Creativity',
      tip: 'Transforming + dancing brings objects to life!',
    },
  },

  // ── transform + multiply: Endless Transformation Chain ──
  {
    id: 'mk_trans_multiply', description: 'Food keeps transforming into different food endlessly, can\'t catch one',
    trigger: { spell: 'transform', appliance: '*', result: 'multiply' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Food transforms endlessly!"),
      { parallel: [
        { action: 'spawn', asset: 'stand_mixer', position: 'us-left' },
        { action: 'spawn', asset: 'scale', position: 'us-right' },
      ], delayAfter: 0.2 },
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('apple', 'cs-center'),
      { parallel: [
        { action: 'spawn', asset: 'lemon_fmp', position: 'ds-far-left' },
        { action: 'spawn', asset: 'garlic_fmp', position: 'ds-far-right' },
      ], delayAfter: 0.2 },
      ...CHARACTER_SPEAK('mage', 'excited', 'Transform and multiply!'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('ENDLESS CHANGE!'),
      { parallel: [
        { action: 'despawn', asset: 'apple' },
        { action: 'spawn', asset: 'burger', position: 'cs-center' },
        { action: 'spawn', asset: 'pizza', position: 'cs-left' },
        { action: 'spawn', asset: 'salmon_fmp', position: 'us-center' },
        { action: 'react', effect: 'transform-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'despawn', asset: 'burger' },
        { action: 'spawn', asset: 'cupcake', position: 'cs-center' },
        { action: 'spawn', asset: 'apple_fmp', position: 'cs-right' },
        { action: 'spawn', asset: 'cheese_slice', position: 'us-far-left' },
        { action: 'react', effect: 'transform-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'despawn', asset: 'cupcake' },
        { action: 'spawn', asset: 'pizza', position: 'cs-center' },
        { action: 'react', effect: 'chaos-lines', position: 'center' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.4 },
      ...CHARACTER_EXCLAIM('mage', 'panic', 'Can\'t catch it!'),
      ...CROWD_GASP([]),
      ...FLASH('rainbow'),
      { parallel: [
        { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🔄 ENDLESS TRANSFORM!',
      message: 'Transform + multiply = food keeps changing forever! You can\'t catch it!',
      skillTaught: 'Consequence',
      tip: 'Transformation + multiplication = endless chaos chain!',
    },
  },

  // ── transform + calm_down: Kitchen to Garden ──
  {
    id: 'mk_trans_calm', description: 'Kitchen transforms into a peaceful garden with cauldron, mushrooms, and a deer',
    trigger: { spell: 'transform', appliance: '*', result: 'calm_down' },
    tier: 'subtle', promptScore: 'perfect',
    steps: [
      ...NARRATOR("The kitchen transforms into a peaceful garden..."),
      ...OBJECT_SPIN_IN('stove', 'cs-center'),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'content', 'Transform calmly...'),
      ...SPELL_CAST('mage', 'cs-center'),
      ...ANNOUNCE('GARDEN MAGIC'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'react', effect: 'glow-pulse', position: 'cs-center' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'despawn', asset: 'stove' },
        { action: 'spawn', asset: 'cauldron_medieval', position: 'cs-center' },
        { action: 'react', effect: 'transform-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'spawn', asset: 'potion_bottle', position: 'cs-left' },
        { action: 'spawn', asset: 'mushroom', position: 'cs-right' },
        { action: 'spawn', asset: 'japanese_bowl', position: 'ds-left' },
        { action: 'spawn', asset: 'japanese_cabinet', position: 'us-far-left' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
      ], delayAfter: 0.6 },
      ...SNEAK_IN_LEFT('deer', 'cs-left'),
      { parallel: [
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 2.0 },
    ],
    feedback: {
      title: '🍄 GARDEN TRANSFORM!',
      message: 'Transform + calm = the kitchen became a peaceful garden! A deer moved in!',
      skillTaught: 'Tone',
      tip: 'Transformation can be gentle and create peaceful scenes!',
    },
  },

  // ── transform + go_wild: Animal Transformation Chaos ──
  {
    id: 'mk_trans_wild', description: 'Animals keep transforming into each other — cat to chicken to dog to tiger',
    trigger: { spell: 'transform', appliance: '*', result: 'go_wild' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Animals transform into each other wildly!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...ENTER_FROM_RIGHT('cat', 'cs-center'),
      ...CHARACTER_EXCLAIM('mage', 'panic', 'Wild transform!'),
      ...SPELL_CAST('mage'),
      ...ANNOUNCE('WILD SHAPESHIFTING!', 'huge'),
      ...FLASH('purple'),
      { parallel: [
        { action: 'despawn_character', character: 'cat' },
        { action: 'spawn_character', character: 'chicken', position: 'cs-center' },
        { action: 'react', effect: 'transform-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'despawn_character', character: 'chicken' },
        { action: 'spawn_character', character: 'dog', position: 'cs-center' },
        { action: 'react', effect: 'transform-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'despawn_character', character: 'dog' },
        { action: 'spawn_character', character: 'tiger', position: 'cs-center' },
        { action: 'react', effect: 'transform-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.5 },
      ...CROWD_GASP([]),
      ...EMOTE('tiger', '🐅', 'ROAR!'),
      { parallel: [
        { action: 'camera_shake', intensity: 0.8, duration: 1.0 },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🔄 ANIMAL CHAOS!',
      message: 'Transform + wild = animals keep transforming! Cat to chicken to dog to TIGER!',
      skillTaught: 'Consequence',
      tip: 'Wild transformation creates endless unpredictable changes!',
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ASSEMBLE & EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

const PAIR_VIGNETTES: Vignette[] = [
  ...FIRE_VIGNETTES,
  ...ICE_VIGNETTES,
  ...GROW_VIGNETTES,
  ...SHRINK_VIGNETTES,
  ...LEVITATE_VIGNETTES,
  ...TRANSFORM_VIGNETTES,
];

export const MAGE_KITCHEN_STAGE_1: Vignette[] = [
  ...PAIR_VIGNETTES,
];

export const MAGE_KITCHEN_DEFAULT: Vignette = {
  id: 'mage_kitchen_default',
  description: 'A mage casts a generic spell in the kitchen with some sparkles.',
  trigger: { spell: '*', appliance: '*', result: '*' },
  tier: 'subtle',
  promptScore: 'partial',
  steps: [
    ...NARRATOR("The mage casts a spell in the kitchen..."),
    { parallel: [
      { action: 'spawn', asset: 'dough_roller', position: 'us-left' },
      { action: 'spawn', asset: 'flour_sack', position: 'us-right' },
      { action: 'spawn', asset: 'rolling_pin', position: 'ds-far-right' },
    ], delayAfter: 0.3 },
    ...OBJECT_SPIN_IN('stove', 'cs-center'),
    ...ENTER_FROM_LEFT('mage', 'ds-left'),
    { parallel: [
      { action: 'spawn', asset: 'fork', position: 'ds-left' },
      { action: 'spawn', asset: 'knife_fmp', position: 'ds-right' },
      { action: 'spawn', asset: 'spoon', position: 'cs-left' },
    ], delayAfter: 0.2 },
    ...CHARACTER_THINK('mage', 'thinking'),
    { parallel: [
      { action: 'animate', character: 'mage', anim: 'cast_spell' },
      { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
      { action: 'react', effect: 'question-marks', position: 'ds-left' },
      { action: 'sfx', sound: 'magic' },
    ], delayAfter: 1.0 },
    { parallel: [
      { action: 'animate', character: 'mage', anim: 'idle_alt' },
      { action: 'emote', character: 'mage', emoji: 'thinking' },
    ], delayAfter: 2.0 },
  ],
  feedback: {
    title: '✨ Magic Kitchen!',
    message: "Some magic happened! But WHAT spell? On WHAT appliance? With WHAT result? Fill in all the details!",
    skillTaught: 'Specificity',
    tip: "Pick a spell, an appliance, and a result. Each detail makes the magic more specific!",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 2 — PRECISION SPELLCASTING (Intensity + Quantity modifiers)
// ═══════════════════════════════════════════════════════════════════════════════

// Intensity modifiers scale the reaction: tiny → subtle, medium → moderate, mega → spectacular, unstable → chaos
// Quantity modifiers scale how many props spawn

const STAGE2_TINY_VIGNETTES: Vignette[] = [
  // ── tiny + fire_spell + cook_perfectly: Tiny Ember Cook ──
  {
    id: 'mk2_tiny_fire_cook', description: 'Tiny spark barely lights the stove, one small perfectly cooked egg',
    trigger: { intensity: 'tiny', spell: 'fire_spell', appliance: '*', result: 'cook_perfectly', quantity: '*' },
    tier: 'subtle', promptScore: 'perfect',
    steps: [
      ...NARRATOR("A tiny spark lights the stove..."),
      ...OBJECT_SPIN_IN('stove', 'cs-center'),
      { parallel: [
        { action: 'spawn', asset: 'kitchen_knife', position: 'ds-left' },
        { action: 'spawn', asset: 'cutting_board', position: 'us-left' },
      ], delayAfter: 0.2 },
      ...ENTER_FROM_LEFT('mage', 'ds-left'),
      ...CHARACTER_SPEAK('mage', 'content', 'Just a tiny flame...'),
      { parallel: [
        { action: 'spawn', asset: 'egg_fmp', position: 'cs-left', scale: 0.6 },
      ], delayAfter: 0.2 },
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'spawn', asset: 'burger', position: 'cs-center', scale: 0.5 },
        { action: 'react', effect: 'hearts-float', position: 'cs-center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'celebrate' },
        { action: 'emote', character: 'mage', emoji: 'happy' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '✨ Gentle Cook!',
      message: 'A tiny spark cooked one perfect little egg. Precise and gentle!',
      skillTaught: 'Specificity',
      tip: 'Power level matters! A tiny spell gives tiny results. Try MEGA for a feast!',
      vagueComparison: {
        vagueInput: 'Cast a spell on the stove',
        vagueResult: 'The mage waves vaguely... the stove just hums.',
      },
    },
  },
];

const STAGE2_MEGA_VIGNETTES: Vignette[] = [
  // ── mega + fire_spell + explode: Nuclear Explosion ──
  {
    id: 'mk2_mega_fire_explode', description: 'MEGA fire explosion — everything launches, screen shakes violently',
    trigger: { intensity: 'mega', spell: 'fire_spell', appliance: '*', result: 'explode', quantity: '*' },
    tier: 'spectacular', promptScore: 'chaotic',
    steps: [
      ...NARRATOR("MEGA FIRE EXPLOSION incoming!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('pot', 'cs-center'),
      ...CHARACTER_EXCLAIM('mage', 'panic', 'MEGA HEAT!'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'react', effect: 'fire', position: 'cs-center' },
        { action: 'react', effect: 'warning-flash', position: 'center' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.8 },
      ...DRAMATIC_PAUSE(),
      { parallel: [
        { action: 'move', asset: 'pot', to: 'off-top', style: 'arc' },
        { action: 'move', character: 'mage', to: 'off-left', style: 'arc' },
        { action: 'react', effect: 'confetti-burst', position: 'cs-center' },
        { action: 'react', effect: 'fire', position: 'cs-left' },
        { action: 'react', effect: 'fire', position: 'cs-right' },
        { action: 'react', effect: 'smoke', position: 'center' },
        { action: 'sfx', sound: 'explosion' },
        { action: 'camera_shake', intensity: 1.0, duration: 1.5 },
      ], delayAfter: 1.0 },
      ...IMPACT(),
      ...NARRATOR("KABOOM! MEGA explosion!"),
    ],
    feedback: {
      title: '💥 MEGA KABOOM!',
      message: 'MEGA fire + explode = SUPER MEGA KABOOM! Everything launched!',
      skillTaught: 'Scale',
      tip: 'MEGA makes everything INTENSE! Use it for maximum chaos!',
    },
  },
];

const STAGE2_VIGNETTES: Vignette[] = [
  ...STAGE2_TINY_VIGNETTES,
  ...STAGE2_MEGA_VIGNETTES,
];

export const MAGE_KITCHEN_STAGE_2: Vignette[] = [
  ...STAGE2_VIGNETTES,
  ...MAGE_KITCHEN_STAGE_1,  // Stage 1 vignettes work here — undefined trigger keys act as wildcards
];

export const MAGE_KITCHEN_DEFAULT_2: Vignette = {
  id: 'mage_kitchen_default_2',
  description: 'Mage casts a spell with vague intensity.',
  trigger: { intensity: '*', spell: '*', appliance: '*', result: '*', quantity: '*' },
  tier: 'subtle',
  promptScore: 'partial',
  steps: [
    ...NARRATOR("The mage casts... something?"),
    ...ENTER_FROM_LEFT('mage', 'ds-center'),
    ...CHARACTER_THINK('mage', 'thinking'),
    { parallel: [
      { action: 'animate', character: 'mage', anim: 'cast_spell' },
      { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
      { action: 'react', effect: 'question-marks', position: 'ds-center' },
      { action: 'sfx', sound: 'magic' },
    ], delayAfter: 1.0 },
    { parallel: [
      { action: 'react', effect: 'smoke', position: 'cs-center' },
      { action: 'emote', character: 'mage', emoji: 'thinking' },
    ], delayAfter: 1.5 },
  ],
  feedback: {
    title: '🔮 Vague Spell',
    message: "Was that tiny? Mega? What spell? Be specific about INTENSITY and SPELL TYPE!",
    skillTaught: 'Precision',
    tip: "Use intensity words (tiny, mega, unstable) to control the power!",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 3 — COMBO SPELLCASTING (Multiple spells in sequence)
// ═══════════════════════════════════════════════════════════════════════════════

const STAGE3_COMBO_VIGNETTES: Vignette[] = [
  // ── fire + ice combo: Steam Explosion ──
  {
    id: 'mk3_fire_ice', description: 'Fire heats, ice cools, creates massive steam explosion',
    trigger: { spell1: 'fire_spell', spell2: 'ice_spell', appliance: '*', result: '*' },
    tier: 'spectacular', promptScore: 'perfect',
    steps: [
      ...NARRATOR("Fire meets ice... STEAM!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('pot', 'cs-center'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Fire then ice!'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'react', effect: 'fire', position: 'cs-center' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'react', effect: 'ice-sparkle', position: 'cs-center' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'react', effect: 'smoke', position: 'cs-center' },
        { action: 'react', effect: 'confetti-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'explosion' },
        { action: 'camera_shake', intensity: 0.8, duration: 1.0 },
      ], delayAfter: 1.0 },
      ...CELEBRATION(['mage']),
      ...NARRATOR("Fire + Ice = massive steam explosion!"),
    ],
    feedback: {
      title: '💨 STEAM EXPLOSION!',
      message: 'Fire heats + Ice cools = STEAM explosion! Perfect combo!',
      skillTaught: 'Combos',
      tip: 'Combining opposite spells creates powerful reactions!',
    },
  },

  // ── grow + shrink combo: Size Swap ──
  {
    id: 'mk3_grow_shrink',
    description: 'Grow and shrink spells collide, swapping sizes of everything in the kitchen',
    trigger: { spell1: 'grow_spell', spell2: 'shrink_spell', appliance: '*', result: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("Grow meets shrink — SIZE SWAP!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('pot', 'cs-left'),
      ...OBJECT_DROP('frying_pan', 'cs-right'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Big then small... or small then BIG?'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-left' },
        { action: 'sfx', sound: 'magic' },
        { action: 'text_popup', text: 'GROW!', position: 'top', size: 'large' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'react', effect: 'sparkle-burst', position: 'cs-right' },
        { action: 'sfx', sound: 'magic' },
        { action: 'text_popup', text: 'SHRINK!', position: 'bottom', size: 'large' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'react', effect: 'confetti-burst', position: 'cs-center' },
        { action: 'camera_shake', intensity: 0.5, duration: 0.8 },
        { action: 'sfx', sound: 'explosion' },
        { action: 'text_popup', text: 'SIZE SWAP!', position: 'center', size: 'huge' },
      ], delayAfter: 1.0 },
      ...CELEBRATION(['mage']),
      ...NARRATOR("Everything swapped sizes — tiny pots and giant spoons!"),
    ],
    feedback: {
      title: '🔄 SIZE SWAP!',
      message: 'Grow + Shrink at the same time = everything swaps sizes! Kitchen chaos!',
      skillTaught: 'Combos',
      tip: 'Opposite spells create the wildest combos!',
    },
  },

  // ── levitate + transform combo: Flying Parade ──
  {
    id: 'mk3_levitate_transform',
    description: 'Levitating and transforming creates a flying parade of morphing kitchen items',
    trigger: { spell1: 'levitate', spell2: 'transform', appliance: '*', result: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("Levitate plus transform — FLYING PARADE!"),
      ...TELEPORT_IN('mage', 'ds-center'),
      ...OBJECT_DROP('plate', 'cs-left'),
      ...OBJECT_DROP('cup', 'cs-center'),
      ...OBJECT_DROP('bowl', 'cs-right'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Float AND change!'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-left' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'react', effect: 'sparkle-burst', position: 'wide' },
        { action: 'sfx', sound: 'magic' },
        { action: 'text_popup', text: 'FLYING PARADE!', position: 'center', size: 'huge' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'react', effect: 'confetti-burst', position: 'wide' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.0 },
      ...CELEBRATION(['mage']),
      ...NARRATOR("A parade of floating, morphing kitchen things!"),
    ],
    feedback: {
      title: '✨ FLYING PARADE!',
      message: 'Levitate + Transform = a flying parade of shapeshifting dishes! Magical!',
      skillTaught: 'Combos',
      tip: 'Movement spells combined with change spells create the most spectacular effects!',
    },
  },

  // ── fire + stove combo: Volcano Kitchen ──
  {
    id: 'mk3_fire_stove',
    description: 'Fire spell on a stove creates a kitchen volcano',
    trigger: { spell1: 'fire_spell', spell2: '*', appliance: 'stove', result: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("Fire spell on the stove — KITCHEN VOLCANO!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('stove', 'cs-center'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Maximum heat on the stove!'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'react', effect: 'fire', position: 'cs-center' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'react', effect: 'fire', position: 'cs-center' },
        { action: 'react', effect: 'fire', position: 'cs-left' },
        { action: 'react', effect: 'fire', position: 'cs-right' },
        { action: 'camera_shake', intensity: 1.0, duration: 1.5 },
        { action: 'sfx', sound: 'explosion' },
        { action: 'text_popup', text: 'VOLCANO!', position: 'center', size: 'huge' },
      ], delayAfter: 1.0 },
      ...CELEBRATION(['mage']),
    ],
    feedback: {
      title: '🌋 KITCHEN VOLCANO!',
      message: 'Fire on the stove = a volcano eruption in the kitchen! The most dramatic cooking ever!',
      skillTaught: 'Combos',
      tip: 'Matching spells to appliances creates unique reactions!',
    },
  },

  // ── ice + oven combo: Perfect Temperature ──
  {
    id: 'mk3_ice_oven',
    description: 'Ice spell on the hot oven finds the perfect temperature',
    trigger: { spell1: 'ice_spell', spell2: '*', appliance: 'oven', result: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("Ice spell meets hot oven — PERFECT TEMPERATURE!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('oven', 'cs-center'),
      { parallel: [
        { action: 'react', effect: 'fire', position: 'cs-center' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.3 },
      ...CHARACTER_SPEAK('mage', 'thinking', 'Too hot... let me cool it down...'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'react', effect: 'ice-sparkle', position: 'cs-center' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'text_popup', text: 'PERFECT TEMP!', position: 'center', size: 'huge' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.8 },
      ...CELEBRATION(['mage']),
      ...NARRATOR("Ice on a hot oven — perfectly balanced temperature!"),
    ],
    feedback: {
      title: '🌡️ PERFECT TEMPERATURE!',
      message: 'Ice on the hot oven = perfectly balanced cooking temperature! Smart thinking!',
      skillTaught: 'Combos',
      tip: 'Using opposite elements on appliances can create balance instead of chaos!',
    },
  },

  // ── transform + sink combo: Potion Fountain ──
  {
    id: 'mk3_transform_sink',
    description: 'Transform spell on the sink turns water into a magical potion fountain',
    trigger: { spell1: 'transform', spell2: '*', appliance: 'sink', result: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("Transform spell on the sink — POTION FOUNTAIN!"),
      ...TELEPORT_IN('mage', 'ds-left'),
      ...OBJECT_DROP('sink', 'cs-center'),
      ...CHARACTER_SPEAK('mage', 'excited', 'Transform that water!'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'react', effect: 'sparkle-burst', position: 'cs-center' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-left' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
        { action: 'sfx', sound: 'magic' },
        { action: 'text_popup', text: 'POTION FOUNTAIN!', position: 'center', size: 'huge' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'react', effect: 'confetti-burst', position: 'wide' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.0 },
      ...CELEBRATION(['mage']),
      ...NARRATOR("The sink became a magical potion fountain!"),
    ],
    feedback: {
      title: '⛲ POTION FOUNTAIN!',
      message: 'Transform on the sink = water becomes magical potions! A fountain of magic!',
      skillTaught: 'Combos',
      tip: 'Transform spell works on anything with liquid — sinks, pots, cups!',
    },
  },
];

export const MAGE_KITCHEN_STAGE_3: Vignette[] = [
  ...STAGE3_COMBO_VIGNETTES,
  ...MAGE_KITCHEN_STAGE_2,  // Includes stage 1+2 vignettes as fallbacks
];

export const MAGE_KITCHEN_DEFAULT_3: Vignette = {
  id: 'mage_kitchen_default_3',
  description: 'Mage casts two random spells.',
  trigger: { spell1: '*', spell2: '*', appliance: '*', result: '*' },
  tier: 'subtle',
  promptScore: 'partial',
  steps: [
    ...NARRATOR("Two spells, but do they combine?"),
    ...ENTER_FROM_LEFT('mage', 'ds-center'),
    ...CHARACTER_THINK('mage', 'thinking'),
    { parallel: [
      { action: 'animate', character: 'mage', anim: 'cast_spell' },
      { action: 'react', effect: 'sparkle-magic', position: 'cs-left' },
      { action: 'sfx', sound: 'magic' },
    ], delayAfter: 0.6 },
    { parallel: [
      { action: 'animate', character: 'mage', anim: 'cast_spell' },
      { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
      { action: 'sfx', sound: 'magic' },
    ], delayAfter: 0.6 },
    { parallel: [
      { action: 'react', effect: 'smoke', position: 'cs-center' },
      { action: 'emote', character: 'mage', emoji: 'thinking' },
      { action: 'sfx', sound: 'react' },
    ], delayAfter: 1.5 },
    { parallel: [
      { action: 'text_popup', text: 'Keep trying...', position: 'bottom', size: 'small' },
    ], delayAfter: 1.0 },
  ],
  feedback: {
    title: '🔮 Normal Spell...',
    message: "That was a regular spell — no secret combo triggered. Try different combinations!",
    skillTaught: 'Combo Thinking',
    tip: "Think about how words RELATE to each other. Fire + Ice? Grow + Shrink? What fits together?",
  },
};
