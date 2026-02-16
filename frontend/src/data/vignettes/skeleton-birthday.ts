/**
 * Skeleton Birthday Quest — Vignettes for all 3 stages.
 *
 * Stage 1: "Plan a party with {FOOD} and {ENTERTAINMENT} for a {VIBE} birthday"
 * Stage 2: "Plan a {SIZE} party with {FOOD} and {ENTERTAINMENT} for a {VIBE} birthday where the skeleton feels {MOOD}"
 * Stage 3: "Combine {ACTIVITY1} with {ACTIVITY2} in a {SPIRIT} way at {LOCATION}"
 */

import type { Vignette } from '../../types/madlibs';
import {
  ENTER_FROM_LEFT, ENTER_FROM_RIGHT, CHARGE_IN_LEFT, CHARGE_IN_RIGHT,
  DROP_IN, TELEPORT_IN, SNEAK_IN_LEFT,
  RUN_TO, WALK_TO,
  CONVERGE_MEET, CHASE,
  OBJECT_GROW_REVEAL, OBJECT_SLIDE_IN, OBJECT_RAIN,
  CHARACTER_SPEAK, CHARACTER_THINK, DIALOGUE, EMOTIONAL_REACT, CHARACTER_EXCLAIM,
  NARRATOR, IMPACT, CELEBRATION, DISAPPOINTMENT, DRAMATIC_PAUSE,
  DANCE, ANNOUNCE, FLASH, BOUNCE_ENTRANCE, CROWD_CHEER,
GROUP_ENTER_LEFT, GROUP_ENTER_RIGHT, } from '../movement-templates';

// ─── STAGE 1 VIGNETTES ──────────────────────────────────────────────────────

// ── CAKE VIGNETTES ──────────────────────────────────────────────────────────

const CAKE_VIGNETTES: Vignette[] = [
  // ── cake + magic_show ── (5-beat: setup → intent → action → consequence → resolution)
  {
    id: 'sb_cake_magic_show',
    description: 'A wizard conjures a magic cake for the skeleton birthday — full 5-beat story with dialogue.',
    trigger: { food: 'cake', entertainment: 'magic_show', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP — narrator + entrances
      ...NARRATOR("It's the skeleton's birthday! A wizard has a MAGICAL surprise..."),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'cs-left'),
      ...CHARACTER_SPEAK('skeleton_warrior', 'excited', "It's my BONE-day! Where's my cake?!"),
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'present_A_red', position: 'us-left' },
        { action: 'spawn', asset: 'present_B_blue', position: 'us-right' },
        { action: 'spawn', asset: 'balloon', position: 'us-far-left' },
        { action: 'spawn', asset: 'balloon', position: 'us-far-right' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_RIGHT('mage', 'cs-right'),
      // Beat 2: INTENT — character voices plan
      ...CHARACTER_SPEAK('mage', 'mischievous', "Stand back... I'll CONJURE one!"),
      ...DRAMATIC_PAUSE(0.8),
      // Beat 3: ACTION — the magic happens
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'magic' },
        { action: 'camera_shake', intensity: 0.3, duration: 1.5 },
      ], delayAfter: 1.2 },
      ...OBJECT_GROW_REVEAL('cake_birthday', 'us-center'),
      ...IMPACT('white', 0.6),
      { parallel: [
        { action: 'text_popup', text: 'MAGIC CAKE!', position: 'top', size: 'huge' },
        { action: 'sfx', sound: 'coin' },
      ], delayAfter: 0.5 },
      // Beat 4: CONSEQUENCE — reactions
      ...EMOTIONAL_REACT('skeleton_warrior', 'celebrating', 'cs-left'),
      ...GROUP_ENTER_RIGHT([['skeleton_minion', 'ds-right'], ['knight', 'ds-far-right']]),
      // Beat 5: RESOLUTION — celebration + narrator
      ...CELEBRATION(['skeleton_warrior', 'mage', 'skeleton_minion', 'knight'], 'cs-center'),
      ...NARRATOR("You said CAKE and MAGIC SHOW — both details made this scene spectacular!"),
    ],
    feedback: {
      title: 'PERFECT PARTY!',
      message: "You planned an amazing birthday! You said WHAT food (cake) and WHAT entertainment (magic show). When you're specific about all the details, everything comes together perfectly!",
      skillTaught: 'Specificity',
      tip: 'You nailed every choice — the right Food, Entertainment, and Vibe make magic!',
    },
  },

  // ── cake + fireworks ──
  {
    id: 'sb_cake_fireworks',
    description: 'Birthday cake candles are actually fireworks — explosive celebration.',
    trigger: { food: 'cake', entertainment: 'fireworks', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("Time to light the candles... but these aren't ordinary candles!"),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'cake_birthday', position: 'us-center' },
        { action: 'spawn', asset: 'stars', position: 'top' },
        { action: 'spawn', asset: 'heart', position: 'us-left' },
        { action: 'spawn', asset: 'heart', position: 'us-right' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.5 },
      // Beat 2: INTENT
      ...ENTER_FROM_RIGHT('mage', 'ds-right'),
      ...DIALOGUE('skeleton_warrior', 'excited', "Light the candles!", 'mage', 'mischievous', "These candles are... special!"),
      // Beat 3: ACTION — fireworks!
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'react', effect: 'fire-sneeze', position: 'top' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-left' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-right' },
        { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
        { action: 'sfx', sound: 'explosion' },
        { action: 'screen_flash', color: 'yellow', duration: 0.2 },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'text_popup', text: 'FIREWORK CANDLES!', position: 'center', size: 'huge' },
      ], delayAfter: 0.5 },
      // Beat 4: CONSEQUENCE
      ...EMOTIONAL_REACT('skeleton_warrior', 'shocked', 'ds-center'),
      ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', "THAT WAS AMAZING!"),
      ...BOUNCE_ENTRANCE('skeleton_minion', 'ds-left', 'left'),
      ...ANNOUNCE('WOW!', 'large'),
      // Beat 5: RESOLUTION
      ...FLASH('yellow', 0.3),
      ...CELEBRATION(['skeleton_warrior', 'mage'], 'cs-center'),
      ...NARRATOR("Cake + Fireworks = explosive fun! Both details combined into something wild!"),
    ],
    feedback: {
      title: 'Firework Cake!',
      message: 'The birthday candles are FIREWORKS! Each one explodes when you blow it out!',
      skillTaught: 'Specificity',
      tip: 'Cake + Fireworks = explosive birthday celebration! Mix and match for creativity!',
    },
  },

  // ── cake + music ──
  {
    id: 'sb_cake_music',
    description: 'Singing cake layers harmonize while the skeleton dances with friends.',
    trigger: { food: 'cake', entertainment: 'music', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("The birthday cake has a special talent..."),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'cs-center'),
      ...OBJECT_GROW_REVEAL('cake_birthday', 'us-center', 1.3),
      ...OBJECT_GROW_REVEAL('present', 'cs-left'),
      ...OBJECT_GROW_REVEAL('muffin', 'us-right'),
      ...OBJECT_GROW_REVEAL('macaron_blue', 'us-far-left'),
      ...OBJECT_GROW_REVEAL('macaron_yellow', 'us-far-right'),
      { parallel: [
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.5 },
      // Beat 2: INTENT
      ...GROUP_ENTER_RIGHT([['skeleton_mage', 'ds-left'], ['skeleton_minion', 'ds-right']]),
      ...CHARACTER_SPEAK('skeleton_mage', 'musical', "Listen... the cake is SINGING!"),
      // Beat 3: ACTION
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'text_popup', text: 'The cake SINGS!', position: 'top', size: 'large' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.8 },
      ...ANNOUNCE('MUSICAL CAKE!', 'large'),
      ...FLASH('yellow', 0.3),
      // Beat 4: CONSEQUENCE
      ...EMOTIONAL_REACT('skeleton_warrior', 'celebrating', 'cs-center'),
      ...DANCE('skeleton_warrior'),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'Cheering' },
        { action: 'animate', character: 'skeleton_mage', anim: 'wave' },
        { action: 'animate', character: 'skeleton_minion', anim: 'Cheering' },
      ], delayAfter: 1.0 },
      // Beat 5: RESOLUTION
      { parallel: [
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: 'Singing Cake!',
      message: 'The cake sings Happy Birthday in perfect harmony! Everyone dances along!',
      skillTaught: 'Specificity',
      tip: 'Cake + Music = singing dessert! Each combo creates something unique!',
    },
  },

  // ── cake + combat ──
  {
    id: 'sb_cake_combat',
    description: 'Warriors battle over the last slice of birthday cake — epic food fight.',
    trigger: { food: 'cake', entertainment: 'combat', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("There's only ONE slice left... who gets it?!"),
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'cake_birthday', position: 'us-center' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'cs-left'),
      ...ENTER_FROM_RIGHT('knight', 'cs-right'),
      // Beat 2: INTENT
      ...DIALOGUE('skeleton_warrior', 'hungry', "That last slice is MINE!", 'knight', 'determined', "I don't think so, bone-boy!"),
      // Beat 3: ACTION — battle!
      ...CHASE('skeleton_warrior', 'knight', 'cs-right'),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'animate', character: 'knight', anim: 'taunt' },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.5 },
      ...IMPACT('white', 0.5),
      // Beat 4: CONSEQUENCE — cake destroyed
      { parallel: [
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-center' },
        { action: 'camera_shake', intensity: 0.5, duration: 0.8 },
        { action: 'sfx', sound: 'explosion' },
        { action: 'text_popup', text: 'CAKE BATTLE!', position: 'center', size: 'huge' },
      ], delayAfter: 0.6 },
      ...FLASH('red', 0.4),
      ...ANNOUNCE('FOOD FIGHT!', 'huge'),
      ...EMOTIONAL_REACT('skeleton_warrior', 'shocked', 'cs-left'),
      ...CHARACTER_SPEAK('knight', 'sad', "The cake... it's gone!"),
      ...BOUNCE_ENTRANCE('skeleton_minion', 'ds-far-left', 'left'),
      // Beat 5: RESOLUTION
      ...DISAPPOINTMENT(['skeleton_warrior', 'knight'], 'cs-center'),
      ...NARRATOR("Combat + Cake = chaos! The battle destroyed the dessert!"),
    ],
    feedback: {
      title: 'Cake War!',
      message: 'A cake battle broke out! The warriors fought so hard they destroyed the cake!',
      skillTaught: 'Specificity',
      tip: 'Cake + Combat = competitive chaos! Not all combos are peaceful!',
    },
  },

  // ── cake + dance ──
  {
    id: 'sb_cake_dance',
    description: 'The birthday cake wobbles and dances on the table while everyone cheers.',
    trigger: { food: 'cake', entertainment: 'dance', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("The DJ puts on a beat and something magical happens..."),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-left'),
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'cake_birthday', position: 'us-center' },
        { action: 'spawn', asset: 'chair', position: 'cs-left' },
        { action: 'spawn', asset: 'chair', position: 'cs-right' },
        { action: 'spawn', asset: 'banner_blue', position: 'top' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_RIGHT('clown', 'ds-center'),
      // Beat 2: INTENT
      ...CHARACTER_SPEAK('clown', 'playful', "Watch this — the cake can DANCE!"),
      // Beat 3: ACTION
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'text_popup', text: 'The cake DANCES!', position: 'top', size: 'large' },
        { action: 'camera_shake', intensity: 0.3, duration: 0.8 },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.8 },
      ...DANCE('clown'),
      ...ANNOUNCE('DANCE PARTY!', 'large'),
      // Beat 4: CONSEQUENCE
      ...EMOTIONAL_REACT('skeleton_warrior', 'celebrating', 'ds-left'),
      ...ENTER_FROM_RIGHT('skeleton_minion', 'ds-right'),
      ...DANCE('skeleton_warrior'),
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
      // Beat 5: RESOLUTION
      ...NARRATOR("Cake + Dance = a dessert that moves! Two details made this party special!"),
    ],
    feedback: {
      title: 'Dancing Dessert!',
      message: 'The cake is ALIVE and dancing on the table! Everyone joins in the celebration!',
      skillTaught: 'Specificity',
      tip: 'Cake + Dance = living dessert party! Objects can become performers!',
    },
  },

  // ── cake + games ──
  {
    id: 'sb_cake_games',
    description: 'Pin the candle on the cake game ends with frosting everywhere.',
    trigger: { food: 'cake', entertainment: 'games', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("Time for party games! But this one involves the CAKE..."),
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'cake_birthday', position: 'us-center' },
        { action: 'spawn', asset: 'gem_blue', position: 'us-left' },
        { action: 'spawn', asset: 'gem_green', position: 'us-center' },
        { action: 'spawn', asset: 'gem_pink', position: 'us-right' },
        { action: 'spawn', asset: 'bench', position: 'ds-far-left' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      ...GROUP_ENTER_RIGHT([['skeleton_minion', 'ds-left'], ['rogue', 'ds-right']]),
      // Beat 2: INTENT
      ...CHARACTER_SPEAK('skeleton_warrior', 'excited', "Pin the candle on the cake!"),
      ...CHARACTER_THINK('rogue', 'sneaky'),
      // Beat 3: ACTION — candle throw
      { parallel: [
        { action: 'animate', character: 'skeleton_minion', anim: 'taunt' },
        { action: 'spawn', asset: 'lollipop', position: 'cs-center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'react', effect: 'splash', position: 'cs-center' },
        { action: 'text_popup', text: 'SPLAT!', position: 'center', size: 'large' },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.6 },
      ...FLASH('pink', 0.3),
      ...ANNOUNCE('MISS!', 'large'),
      // Beat 4: CONSEQUENCE
      ...EMOTIONAL_REACT('skeleton_warrior', 'laughing', 'ds-center'),
      ...CHARACTER_SPEAK('rogue', 'cheeky', "Missed! Frosting everywhere!"),
      ...BOUNCE_ENTRANCE('knight', 'ds-far-right', 'right'),
      // Beat 5: RESOLUTION
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: 'Cake Games!',
      message: 'Pin the candle on the cake turned messy! Frosting flew everywhere!',
      skillTaught: 'Specificity',
      tip: 'Cake + Games = party game mayhem! Competitive fun with dessert!',
    },
  },
];

// ── PIZZA VIGNETTES ────────────────────────────────────────────────────────

const PIZZA_VIGNETTES: Vignette[] = [
  // ── pizza + magic_show ── (5-beat: setup → intent → action → consequence → resolution)
  {
    id: 'sb_pizza_magic_show',
    description: 'A wizard makes pizza slices multiply endlessly from a single pie.',
    trigger: { food: 'pizza', entertainment: 'magic_show', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP — narrator + entrances
      ...NARRATOR("The birthday skeleton is hungry... but there's only ONE pizza!"),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'pizza', position: 'us-center' },
        { action: 'spawn', asset: 'pancakes', position: 'us-left' },
        { action: 'spawn', asset: 'donut_sprinkles', position: 'us-right' },
        { action: 'spawn', asset: 'candy_pink', position: 'us-far-left' },
        { action: 'spawn', asset: 'candycorn', position: 'us-far-right' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.5 },
      ...CHARACTER_SPEAK('skeleton_warrior', 'sad', "One pizza for the whole party? We need MORE!"),
      // Beat 2: INTENT — wizard arrives with plan
      ...ENTER_FROM_RIGHT('mage', 'cs-right'),
      ...CHARACTER_SPEAK('mage', 'mischievous', "Stand back... I'll MULTIPLY it!"),
      // Beat 3: ACTION — magic happens
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'magic' },
        { action: 'camera_shake', intensity: 0.4, duration: 1.2 },
      ], delayAfter: 1.0 },
      ...OBJECT_RAIN('pizza', 8, 'wide'),
      { parallel: [
        { action: 'text_popup', text: 'INFINITE PIZZA!', position: 'top', size: 'huge' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.6 },
      // Beat 4: CONSEQUENCE — reactions
      ...EMOTIONAL_REACT('skeleton_warrior', 'star_eyes', 'ds-center'),
      ...CHARACTER_EXCLAIM('skeleton_warrior', 'excited', "PIZZA EVERYWHERE!"),
      // Beat 5: RESOLUTION — celebration + narrator
      ...CELEBRATION(['skeleton_warrior', 'mage'], 'cs-center'),
      ...NARRATOR("Pizza + Magic Show = endless food! You named BOTH details — perfect combo!"),
    ],
    feedback: {
      title: 'Infinite Pizza Magic!',
      message: 'The wizard multiplied one pizza into hundreds! Magic makes MORE food!',
      skillTaught: 'Specificity',
      tip: 'Pizza + Magic Show = endless food magic! Wizards love pizza tricks!',
    },
  },

  // ── pizza + fireworks ──
  {
    id: 'sb_pizza_fireworks',
    description: 'Pepperoni slices shoot into the air like pizza-flavored rockets.',
    trigger: { food: 'pizza', entertainment: 'fireworks', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("The knight brought a VERY special pizza... with explosive toppings!"),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [
        { action: 'spawn', asset: 'pizza', position: 'us-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.5 },
      // Beat 2: INTENT
      ...CHARGE_IN_RIGHT('knight', 'ds-right'),
      ...DIALOGUE('knight', 'mischievous', "This pizza has FIREWORK pepperoni!", 'skeleton_warrior', 'confused', "Wait... WHAT?!"),
      // Beat 3: ACTION — fireworks launch
      { parallel: [
        { action: 'animate', character: 'knight', anim: 'cast_spell' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'react', effect: 'fire-sneeze', position: 'top' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-left' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-right' },
        { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
        { action: 'screen_flash', color: 'orange', duration: 0.2 },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'text_popup', text: 'PIZZA ROCKETS!', position: 'center', size: 'huge' },
      ], delayAfter: 0.5 },
      // Beat 4: CONSEQUENCE
      ...EMOTIONAL_REACT('skeleton_warrior', 'shocked', 'ds-center'),
      ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', "That was INSANE!"),
      ...BOUNCE_ENTRANCE('clown', 'ds-left', 'left'),
      ...ANNOUNCE('PARTY EXPLOSION!', 'huge'),
      // Beat 5: RESOLUTION
      ...FLASH('orange', 0.4),
      ...CROWD_CHEER([]),
      ...CELEBRATION(['skeleton_warrior', 'knight'], 'cs-center'),
      ...NARRATOR("Pizza + Fireworks = explosive toppings! Wild combos make wild parties!"),
    ],
    feedback: {
      title: 'Pizza Rockets!',
      message: 'The pizza slices launched like fireworks! Pepperoni explosions in the sky!',
      skillTaught: 'Specificity',
      tip: 'Pizza + Fireworks = food explosions! Wild combo creates chaos!',
    },
  },

  // ── pizza + music ──
  {
    id: 'sb_pizza_music',
    description: 'DJ skeleton hosts a pizza party with pounding beats and food storm.',
    trigger: { food: 'pizza', entertainment: 'music', vibe: '*' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("The DJ cranks up the bass... and the pizzas start FLYING!"),
      ...DROP_IN('skeleton_warrior', 'ds-center'),
      ...CHARACTER_SPEAK('skeleton_warrior', 'playful', "TIME TO PARTY HARD!"),
      // Beat 2: INTENT
      { parallel: [
        { action: 'spawn', asset: 'drums', position: 'us-left' },
        { action: 'spawn', asset: 'guitar', position: 'us-right' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.5 },
      ...CHARACTER_EXCLAIM('skeleton_warrior', 'excited', "TURN IT UP!"),
      // Beat 3: ACTION — chaos erupts
      ...OBJECT_RAIN('pizza', 10, 'wide'),
      { parallel: [
        { action: 'camera_shake', intensity: 0.5, duration: 2.0 },
        { action: 'text_popup', text: 'PIZZA STORM!', position: 'top', size: 'huge' },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.8 },
      ...ENTER_FROM_LEFT('skeleton_mage', 'ds-left'),
      ...ENTER_FROM_RIGHT('skeleton_minion', 'ds-right'),
      ...DROP_IN('clown', 'cs-center'),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'spin_attack' },
        { action: 'animate', character: 'skeleton_mage', anim: 'jump_idle' },
        { action: 'animate', character: 'skeleton_minion', anim: 'Cheering' },
        { action: 'animate', character: 'clown', anim: 'Cheering' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.2 },
      ...DANCE('skeleton_warrior'),
      ...DANCE('clown'),
      ...ANNOUNCE('CHAOS PARTY!', 'huge'),
      ...FLASH('orange', 0.4),
      // Beat 4: CONSEQUENCE — exhaustion
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'lie_idle' },
        { action: 'animate', character: 'skeleton_mage', anim: 'sit_floor' },
        { action: 'animate', character: 'skeleton_minion', anim: 'die_flop' },
        { action: 'animate', character: 'clown', anim: 'die_dramatic' },
        { action: 'react', effect: 'stars-spin', position: 'center' },
      ], delayAfter: 0.8 },
      // Beat 5: RESOLUTION
      { parallel: [
        { action: 'text_popup', text: 'BEST. PARTY. EVER.', position: 'center', size: 'huge' },
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_minion', 'excited', 'Me too me too!'),
    ...CHARACTER_SPEAK('clown', 'excited', 'Comedy GOLD!'),
      ...NARRATOR("Pizza + Music = total chaos! Sometimes wild combos create memorable madness!"),
    ],
    feedback: {
      title: 'Total Pizza Chaos!',
      message: "Well... that was WILD! Pizza rain + wild music = absolute madness. Your choices were fun but didn't work TOGETHER — that's why the party went bonkers!",
      skillTaught: 'Specificity',
      tip: "Try picking a food and entertainment that go together — like cake + magic show. Matching details = better results!",
    },
  },

  // ── pizza + combat ──
  {
    id: 'sb_pizza_combat',
    description: 'Food fight with pizza slices flying everywhere.',
    trigger: { food: 'pizza', entertainment: 'combat', vibe: '*' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("Two warriors face off... and pizza starts flying!"),
      { parallel: [
        { action: 'spawn', asset: 'pizza', position: 'us-center' },
        { action: 'spawn', asset: 'pizza', position: 'us-left' },
        { action: 'spawn', asset: 'pizza', position: 'us-right' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-left'),
      ...ENTER_FROM_RIGHT('knight', 'ds-right'),
      // Beat 2: INTENT
      ...DIALOGUE('skeleton_warrior', 'angry', "Food fight time!", 'knight', 'determined', "Bring it on, bone-boy!"),
      // Beat 3: ACTION — battle begins
      ...CONVERGE_MEET('skeleton_warrior', 'knight'),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'throw' },
        { action: 'animate', character: 'knight', anim: 'throw' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.4 },
      ...IMPACT('white', 0.6),
      { parallel: [
        { action: 'react', effect: 'splash', position: 'cs-center' },
        { action: 'react', effect: 'splash', position: 'cs-left' },
        { action: 'react', effect: 'splash', position: 'cs-right' },
        { action: 'camera_shake', intensity: 0.5, duration: 0.8 },
        { action: 'text_popup', text: 'PIZZA FIGHT!', position: 'center', size: 'huge' },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.8 },
      ...FLASH('red', 0.4),
      ...ANNOUNCE('FOOD WAR!', 'huge'),
      ...BOUNCE_ENTRANCE('clown', 'ds-far-left', 'left'),
      // Beat 4: CONSEQUENCE
      ...EMOTIONAL_REACT('skeleton_warrior', 'laughing', 'ds-left'),
      ...EMOTIONAL_REACT('knight', 'laughing', 'ds-right'),
      // Beat 5: RESOLUTION
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
        { action: 'react', effect: 'laugh-tears', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('clown', 'excited', 'Time for the big show!'),
      ...NARRATOR("Pizza + Combat = messy food war! Not every combo is elegant!"),
    ],
    feedback: {
      title: 'Food Fight!',
      message: 'Pizza slices went flying! The combat turned into a messy food fight!',
      skillTaught: 'Specificity',
      tip: 'Pizza + Combat = food fight chaos! Messy but hilarious!',
    },
  },

  // ── pizza + dance ──
  {
    id: 'sb_pizza_dance',
    description: 'Pizza boxes spin like dance partners while everyone does the pizza shuffle.',
    trigger: { food: 'pizza', entertainment: 'dance', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("The DJ spins a beat... time for the legendary PIZZA SHUFFLE!"),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'cs-center'),
      { parallel: [
        { action: 'spawn', asset: 'pizza', position: 'us-left' },
        { action: 'spawn', asset: 'pizza', position: 'us-right' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.5 },
      // Beat 2: INTENT
      ...ENTER_FROM_LEFT('skeleton_minion', 'ds-left'),
      ...CHARGE_IN_RIGHT('clown', 'ds-right'),
      ...CHARACTER_SPEAK('clown', 'playful', "Everyone grab a pizza box and DANCE!"),
      // Beat 3: ACTION — dancing
      { parallel: [
        { action: 'animate', character: 'skeleton_minion', anim: 'spin_attack' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'text_popup', text: 'PIZZA SHUFFLE!', position: 'top', size: 'large' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 1.0 },
      ...DANCE('skeleton_warrior'),
      ...DANCE('skeleton_minion'),
      ...FLASH('yellow', 0.3),
      // Beat 4: CONSEQUENCE
      ...EMOTIONAL_REACT('skeleton_warrior', 'celebrating', 'cs-center'),
      // Beat 5: RESOLUTION
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'My bones are rattling with excitement!'),
    ...CHARACTER_SPEAK('skeleton_minion', 'excited', 'Rattle rattle!'),
      ...CELEBRATION(['skeleton_warrior', 'skeleton_minion', 'clown'], 'cs-center'),
      ...NARRATOR("Pizza + Dance = the ultimate food dance party! Mix creativity with fun!"),
    ],
    feedback: {
      title: 'Pizza Dance!',
      message: 'Everyone dances with pizza boxes! The pizza shuffle is the hottest move!',
      skillTaught: 'Specificity',
      tip: 'Pizza + Dance = delicious dance party! Food becomes part of the fun!',
    },
  },

  // ── pizza + games ──
  {
    id: 'sb_pizza_games',
    description: 'Pizza toss game where slices land perfectly in mouths.',
    trigger: { food: 'pizza', entertainment: 'games', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("Time for the classic party game... PIZZA TOSS!"),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-left'),
      ...ENTER_FROM_RIGHT('skeleton_mage', 'ds-right'),
      // Beat 2: INTENT
      ...CHARACTER_SPEAK('skeleton_warrior', 'excited', "I bet I can toss this pizza into your mouth!"),
      ...CHARACTER_SPEAK('skeleton_mage', 'confident', "Let's see you try!"),
      // Beat 3: ACTION — the toss
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'throw' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.4 },
      ...OBJECT_SLIDE_IN('pizza', 'ds-left', 'ds-right'),
      { parallel: [
        { action: 'react', effect: 'stars-spin', position: 'ds-right' },
        { action: 'text_popup', text: 'PERFECT CATCH!', position: 'center', size: 'large' },
        { action: 'sfx', sound: 'coin' },
      ], delayAfter: 0.6 },
      // Beat 4: CONSEQUENCE
      ...EMOTIONAL_REACT('skeleton_warrior', 'proud', 'ds-left'),
      ...EMOTIONAL_REACT('skeleton_mage', 'happy', 'ds-right'),
      // Beat 5: RESOLUTION
      ...CELEBRATION(['skeleton_warrior', 'skeleton_mage'], 'center'),
      ...NARRATOR("Pizza + Games = competitive snacking! Turn food into a skillful challenge!"),
    ],
    feedback: {
      title: 'Pizza Toss!',
      message: 'Pizza toss game is a hit! Everyone catches slices perfectly!',
      skillTaught: 'Specificity',
      tip: 'Pizza + Games = competitive snacking! Turn food into a game!',
    },
  },
];

// ── FEAST VIGNETTES ─────────────────────────────────────────────────────────

const FEAST_VIGNETTES: Vignette[] = [
  // ── feast + magic_show ── (5-beat: setup → intent → action → consequence → resolution)
  {
    id: 'sb_feast_magic_show',
    description: 'A wizard conjures an endless feast that keeps appearing on the table.',
    trigger: { food: 'feast', entertainment: 'magic_show', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP — narrator + entrances
      ...NARRATOR("The birthday skeleton wants a FEAST... the wizard will make it happen!"),
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'christmas_tree', position: 'us-far-left' },
        { action: 'spawn', asset: 'present_xmas', position: 'us-left' },
        { action: 'spawn', asset: 'serving_tray', position: 'us-right' },
        { action: 'spawn', asset: 'counter_table', position: 'us-far-right' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      ...CHARACTER_SPEAK('skeleton_warrior', 'hungry', "I want a FEAST fit for a king!"),
      // Beat 2: INTENT — wizard arrives
      ...TELEPORT_IN('mage', 'cs-right'),
      ...CHARACTER_SPEAK('mage', 'mischievous', "Watch this... INFINITE BANQUET!"),
      ...DRAMATIC_PAUSE(0.6),
      // Beat 3: ACTION — magic feast appears
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'camera_shake', intensity: 0.4, duration: 1.2 },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 1.0 },
      ...OBJECT_RAIN('cake_birthday', 2, 'center'),
      ...OBJECT_RAIN('pizza', 3, 'wide'),
      ...OBJECT_GROW_REVEAL('cupcake', 'us-left', 1.2),
      ...OBJECT_GROW_REVEAL('cupcake', 'us-right', 1.2),
      ...OBJECT_GROW_REVEAL('pie', 'us-left'),
      { parallel: [
        { action: 'text_popup', text: 'ENDLESS FEAST!', position: 'top', size: 'huge' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.8 },
      ...ANNOUNCE('MAGICAL BANQUET!', 'huge'),
      ...FLASH('white', 0.5),
      // Beat 4: CONSEQUENCE — reactions
      ...RUN_TO('skeleton_warrior', 'cs-left'),
      ...EMOTIONAL_REACT('skeleton_warrior', 'love_eyes', 'cs-left'),
      ...CHARACTER_EXCLAIM('skeleton_warrior', 'excited', "SO MUCH FOOD!"),
      ...BOUNCE_ENTRANCE('skeleton_minion', 'ds-right', 'right'),
      // Beat 5: RESOLUTION — celebration + narrator
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_minion', 'excited', 'Me too me too!'),
      ...CELEBRATION(['skeleton_warrior', 'mage'], 'cs-center'),
      ...NARRATOR("Feast + Magic Show = infinite food! Perfect details make perfect parties!"),
    ],
    feedback: {
      title: 'Magic Feast!',
      message: 'The wizard conjured an endless stream of food! The table overflows with magical dishes!',
      skillTaught: 'Specificity',
      tip: 'Feast + Magic Show = infinite food! Magic makes everything bigger!',
    },
  },

  // ── feast + fireworks ──
  {
    id: 'sb_feast_fireworks',
    description: 'An epic feast with fireworks launched by a wizard creates a legendary skeleton celebration.',
    trigger: { food: 'feast', entertainment: 'fireworks', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP — narrator + setup
      ...NARRATOR("The ULTIMATE birthday party... with a feast AND fireworks!"),
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'table_long', position: 'us-left' },
        { action: 'spawn', asset: 'table_long', position: 'us-right' },
        { action: 'spawn', asset: 'pastry_stand', position: 'us-left' },
        { action: 'spawn', asset: 'display_case', position: 'us-right' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.6 },
      ...GROUP_ENTER_LEFT([['skeleton_warrior', 'ds-center'], ['skeleton_mage', 'ds-left']]),
      ...CHARGE_IN_LEFT('knight', 'ds-right'),
      // Beat 2: INTENT — wizard prepares
      ...DROP_IN('mage', 'ds-far-right'),
      ...CHARACTER_SPEAK('mage', 'heroic', "Prepare for the LEGENDARY celebration!"),
      // Beat 3: ACTION — feast and fireworks
      ...OBJECT_GROW_REVEAL('cake_birthday', 'us-center', 1.5),
      ...OBJECT_GROW_REVEAL('pizza', 'us-left'),
      ...OBJECT_GROW_REVEAL('pie', 'us-right'),
      ...OBJECT_GROW_REVEAL('cream_puff', 'us-far-left'),
      ...OBJECT_GROW_REVEAL('pretzel', 'us-far-right'),
      { parallel: [
        { action: 'text_popup', text: 'EPIC FEAST!', position: 'top', size: 'huge' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.6 },
      ...ANNOUNCE('SURPRISE!', 'huge'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'react', effect: 'explosion-cartoon', position: 'top' },
        { action: 'react', effect: 'fire-sneeze', position: 'cs-left' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
        { action: 'camera_shake', intensity: 0.5, duration: 1.0 },
        { action: 'screen_flash', color: 'gold', duration: 0.2 },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.8 },
      // Beat 4: CONSEQUENCE — amazement
      ...OBJECT_GROW_REVEAL('banner_red', 'top', 1.8),
      { parallel: [
        { action: 'text_popup', text: 'LEGENDARY BIRTHDAY!', position: 'center', size: 'huge' },
      ], delayAfter: 0.6 },
      ...EMOTIONAL_REACT('skeleton_warrior', 'star_eyes', 'ds-center'),
      ...EMOTIONAL_REACT('skeleton_mage', 'celebrating', 'ds-left'),
      ...EMOTIONAL_REACT('knight', 'proud', 'ds-right'),
      ...FLASH('gold', 0.5),
      ...BOUNCE_ENTRANCE('clown', 'ds-far-left', 'left'),
      // Beat 5: RESOLUTION — ultimate celebration
      ...CROWD_CHEER([]),
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'My bones are rattling with excitement!'),
    ...CHARACTER_SPEAK('knight', 'excited', 'A knight never gives up!'),
    ...CHARACTER_SPEAK('clown', 'excited', 'Time for the big show!'),
      ...CELEBRATION(['skeleton_warrior', 'skeleton_mage', 'knight', 'mage', 'clown'], 'center'),
      ...NARRATOR("Feast + Fireworks = LEGENDARY! You mastered specificity — this is perfection!"),
    ],
    feedback: {
      title: 'LEGENDARY!',
      message: "An epic feast with fireworks?! That's EXACTLY how a legendary skeleton celebrates! You nailed every detail.",
      skillTaught: 'Specificity',
      tip: "You're a natural scene creator! Try the other quests for more adventures!",
    },
  },

  // ── feast + music ──
  {
    id: 'sb_feast_music',
    description: 'A grand banquet where plates clink in rhythm to create music.',
    trigger: { food: 'feast', entertainment: 'music', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("The feast table is set... and it's about to become an ORCHESTRA!"),
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'cupcake', position: 'us-left' },
        { action: 'spawn', asset: 'pie', position: 'us-right' },
        { action: 'spawn', asset: 'ice_cream', position: 'us-far-left' },
        { action: 'spawn', asset: 'sundae', position: 'cs-far-right' },
        { action: 'spawn', asset: 'guitar', position: 'us-left' },
        { action: 'spawn', asset: 'drums', position: 'us-right' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.6 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      // Beat 2: INTENT — musicians arrive
      ...ENTER_FROM_RIGHT('skeleton_mage', 'ds-left'),
      ...CHARGE_IN_RIGHT('knight', 'ds-right'),
      ...CHARACTER_SPEAK('skeleton_mage', 'musical', "Let's make this feast SING!"),
      // Beat 3: ACTION — musical feast
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'interact' },
        { action: 'animate', character: 'skeleton_mage', anim: 'interact' },
        { action: 'animate', character: 'knight', anim: 'interact' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'text_popup', text: 'DINNER SYMPHONY!', position: 'top', size: 'large' },
        { action: 'react', effect: 'glow-pulse', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.6 },
      ...ANNOUNCE('MUSICAL FEAST!', 'large'),
      ...FLASH('gold', 0.3),
      // Beat 4: CONSEQUENCE — dancing
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'Cheering' },
        { action: 'animate', character: 'skeleton_mage', anim: 'wave' },
        { action: 'animate', character: 'knight', anim: 'Cheering' },
      ], delayAfter: 1.0 },
      ...DANCE('skeleton_warrior'),
      ...DANCE('knight'),
      // Beat 5: RESOLUTION
      { parallel: [
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
      ...NARRATOR("Feast + Music = dining concert! Everything becomes an instrument!"),
    ],
    feedback: {
      title: 'Musical Feast!',
      message: 'The skeletons drum on plates and strum guitars! The whole feast becomes a concert!',
      skillTaught: 'Specificity',
      tip: 'Feast + Music = dining becomes a concert! Everything makes sound!',
    },
  },

  // ── feast + combat ──
  {
    id: 'sb_feast_combat',
    description: 'Warriors compete in an eating contest, turning the feast into a battle.',
    trigger: { food: 'feast', entertainment: 'combat', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("Two hungry warriors face off... this feast is now a BATTLEGROUND!"),
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'pizza', position: 'us-left' },
        { action: 'spawn', asset: 'cake_birthday', position: 'us-right' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.6 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-left'),
      ...ENTER_FROM_RIGHT('knight', 'ds-right'),
      // Beat 2: INTENT — challenge issued
      ...DIALOGUE('skeleton_warrior', 'determined', "Eating contest — NOW!", 'knight', 'confident', "You're going DOWN!"),
      // Beat 3: ACTION — eating battle
      { parallel: [
        { action: 'text_popup', text: 'EATING CONTEST!', position: 'center', size: 'huge' },
      ], delayAfter: 0.4 },
      ...RUN_TO('skeleton_warrior', 'cs-left'),
      ...RUN_TO('knight', 'cs-right'),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'interact' },
        { action: 'animate', character: 'knight', anim: 'interact' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-center' },
        { action: 'camera_shake', intensity: 0.5, duration: 1.0 },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 1.0 },
      // Beat 4: CONSEQUENCE — winner emerges
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'Cheering' },
        { action: 'animate', character: 'knight', anim: 'die_flop' },
        { action: 'react', effect: 'stars-spin', position: 'cs-left' },
        { action: 'react', effect: 'laugh-tears', position: 'cs-right' },
      ], delayAfter: 0.8 },
      // Beat 5: RESOLUTION
      { parallel: [
        { action: 'text_popup', text: 'WINNER!', position: 'cs-left', size: 'huge' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
      ...NARRATOR("Feast + Combat = eating competition! Sometimes food IS the challenge!"),
    ],
    feedback: {
      title: 'Food Battle!',
      message: 'The feast became a competitive eating contest! The skeleton warrior wins by a mile!',
      skillTaught: 'Specificity',
      tip: 'Feast + Combat = eating competition! Turn dinner into a challenge!',
    },
  },

  // ── feast + dance ──
  {
    id: 'sb_feast_dance',
    description: 'Everyone dances around the feast table in a celebratory circle.',
    trigger: { food: 'feast', entertainment: 'dance', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("The feast is ready... now it's time to DANCE around it!"),
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'cake_birthday', position: 'us-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-left'),
      // Beat 2: INTENT — dancers arrive
      ...ENTER_FROM_RIGHT('skeleton_mage', 'ds-right'),
      ...CHARGE_IN_RIGHT('clown', 'ds-center'),
      ...CHARACTER_SPEAK('clown', 'playful', "Circle the feast and DANCE!"),
      // Beat 3: ACTION — feast dance
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'spin_attack' },
        { action: 'animate', character: 'skeleton_mage', anim: 'jump_big' },
        { action: 'animate', character: 'clown', anim: 'Cheering' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'text_popup', text: 'FEAST DANCE!', position: 'top', size: 'large' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 1.0 },
      ...DANCE('skeleton_warrior'),
      ...DANCE('skeleton_mage'),
      ...DANCE('clown'),
      ...ANNOUNCE('PARTY TIME!', 'huge'),
      // Beat 4: CONSEQUENCE — moving celebration
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-left', style: 'arc', duration: 0.6 },
        { action: 'move', character: 'skeleton_mage', to: 'cs-right', style: 'arc', duration: 0.6 },
        { action: 'move', character: 'clown', to: 'ds-far-left', style: 'arc', duration: 0.6 },
        { action: 'react', effect: 'glow-pulse', position: 'center' },
      ], delayAfter: 0.6 },
      // Beat 5: RESOLUTION
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'SKULL-tastic!'),
      ...NARRATOR("Feast + Dance = celebration around food! The party surrounds the feast!"),
    ],
    feedback: {
      title: 'Dancing Dinner!',
      message: 'Everyone dances around the feast table! Spinning, jumping, and cheering!',
      skillTaught: 'Specificity',
      tip: 'Feast + Dance = celebration around food! The party surrounds the meal!',
    },
  },

  // ── feast + games ──
  {
    id: 'sb_feast_games',
    description: 'Feast becomes a treasure hunt where guests search for hidden treats.',
    trigger: { food: 'feast', entertainment: 'games', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // Beat 1: SETUP
      ...NARRATOR("The feast is hidden... time for a TREASURE HUNT!"),
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'chest', position: 'cs-left' },
        { action: 'spawn', asset: 'chest', position: 'cs-right' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      ...CHARACTER_SPEAK('skeleton_warrior', 'excited', "Find the hidden feast!"),
      // Beat 2: INTENT — rogue appears
      ...SNEAK_IN_LEFT('rogue', 'ds-right'),
      ...CHARACTER_THINK('rogue', 'sneaky'),
      ...CHARACTER_SPEAK('rogue', 'confident', "I'll find EVERYTHING!"),
      // Beat 3: ACTION — searching
      { parallel: [
        { action: 'text_popup', text: 'SEARCHING...', position: 'top', size: 'large' },
      ], delayAfter: 0.4 },
      ...RUN_TO('rogue', 'cs-left'),
      { parallel: [
        { action: 'animate', character: 'rogue', anim: 'interact' },
        { action: 'sfx', sound: 'click' },
      ], delayAfter: 0.4 },
      ...OBJECT_GROW_REVEAL('pizza', 'us-left'),
      { parallel: [
        { action: 'react', effect: 'stars-spin', position: 'cs-left' },
        { action: 'sfx', sound: 'coin' },
      ], delayAfter: 0.5 },
      ...RUN_TO('rogue', 'cs-right'),
      { parallel: [
        { action: 'animate', character: 'rogue', anim: 'interact' },
        { action: 'sfx', sound: 'click' },
      ], delayAfter: 0.4 },
      ...OBJECT_GROW_REVEAL('cake_birthday', 'us-right'),
      // Beat 4: CONSEQUENCE — jackpot!
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
        { action: 'text_popup', text: 'JACKPOT!', position: 'center', size: 'huge' },
        { action: 'sfx', sound: 'coin' },
      ], delayAfter: 0.6 },
      ...EMOTIONAL_REACT('rogue', 'proud', 'cs-right'),
      // Beat 5: RESOLUTION
      { parallel: [
        { action: 'animate', character: 'rogue', anim: 'Cheering' },
        { action: 'animate', character: 'skeleton_warrior', anim: 'wave' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
      ...NARRATOR("Feast + Games = treasure hunt for food! Turn eating into adventure!"),
    ],
    feedback: {
      title: 'Feast Hunt!',
      message: 'The rogue found all the hidden feast treats! Every chest had delicious food!',
      skillTaught: 'Specificity',
      tip: 'Feast + Games = treasure hunt for food! Turn eating into adventure!',
    },
  },
];

// ── FRUIT VIGNETTES ─────────────────────────────────────────────────────────

const FRUIT_VIGNETTES: Vignette[] = [
  // ── fruit + magic_show ──
  {
    id: 'sb_fruit_magic_show',
    description: 'A wizard juggles fruit that transforms into different animals.',
    trigger: { food: 'fruit', entertainment: 'magic_show', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("The skeleton discovers magical fruit magic!"),
      { parallel: [
        { action: 'spawn', asset: 'apple', position: 'ds-left' },
        { action: 'spawn', asset: 'banana', position: 'ds-right' },
        { action: 'spawn', asset: 'peach', position: 'ds-far-right' },
        { action: 'spawn', asset: 'cake_chocolate', position: 'us-left' },
        { action: 'spawn', asset: 'candle', position: 'us-right' },
        { action: 'spawn', asset: 'rubber_duck', position: 'us-far-left' },
        { action: 'spawn', asset: 'piggybank', position: 'us-far-right' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'cs-left'),
      ...CHARACTER_SPEAK('skeleton_warrior', 'excited', "Magical fruit!"),
      ...TELEPORT_IN('mage', 'cs-right'),
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
        { action: 'camera_shake', intensity: 0.3, duration: 0.8 },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
      ], delayAfter: 0.8 },
      ...WALK_TO('mage', 'cs-center'),
      { parallel: [
        { action: 'grow', asset: 'apple', scale: 3.0, duration: 1.0 },
        { action: 'react', effect: 'sparkle-magic', position: 'ds-left' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.6 },
      ...OBJECT_RAIN('banana', 5, 'center'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'react', effect: 'stars-spin', position: 'center' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'text_popup', text: '✨ FRUIT MAGIC! ✨', position: 'top', size: 'huge' },
        { action: 'react', effect: 'glow-pulse', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.8 },
      ...FLASH('green', 0.4),
      ...ANNOUNCE('MAGICAL FRUIT!', 'large'),
      ...BOUNCE_ENTRANCE('skeleton_minion', 'ds-far-left', 'left'),
      ...CELEBRATION(['skeleton_warrior', 'mage'], 'center'),
    ],
    feedback: {
      title: '✨ Fruit Transformation!',
      message: 'The wizard made giant fruit appear and rain from the sky! Magic produce everywhere!',
      skillTaught: 'Specificity',
      tip: 'Fruit + Magic Show = enchanted produce! Fruit becomes magical!',
    },
  },

  // ── fruit + fireworks ──
  {
    id: 'sb_fruit_fireworks',
    description: 'Fruit explodes in the air creating juice fireworks.',
    trigger: { food: 'fruit', entertainment: 'fireworks', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Fruit fireworks are about to light up the party!"),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      ...CHARACTER_EXCLAIM('skeleton_warrior', 'excited', "FIREWORKS!"),
      ...ENTER_FROM_RIGHT('mage', 'ds-right'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
      ], delayAfter: 0.5 },
      ...RUN_TO('mage', 'cs-center'),
      ...OBJECT_RAIN('apple', 6, 'wide'),
      { parallel: [
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'react', effect: 'fire-sneeze', position: 'top' },
        { action: 'react', effect: 'splash', position: 'cs-left' },
        { action: 'react', effect: 'splash', position: 'cs-right' },
        { action: 'camera_shake', intensity: 0.5, duration: 1.0 },
        { action: 'text_popup', text: '🍎 FRUIT BOOM! 🍎', position: 'center', size: 'huge' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.8 },
      ...FLASH('red', 0.4),
      ...BOUNCE_ENTRANCE('knight', 'ds-far-left', 'left'),
      ...CROWD_CHEER([]),
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('mage', 'excited', 'Spell-tacular!'),
    ...CHARACTER_SPEAK('knight', 'excited', 'A knight never gives up!'),
      ...CELEBRATION(['skeleton_warrior', 'mage'], 'center'),
    ],
    feedback: {
      title: '🍎 Juice Explosion!',
      message: 'The wizard launched fruit fireworks! Juice spray everywhere like colorful explosions!',
      skillTaught: 'Specificity',
      tip: 'Fruit + Fireworks = juicy explosions! Messy but spectacular!',
    },
  },

  // ── fruit + music ──
  {
    id: 'sb_fruit_music',
    description: 'Fruit bounces to the beat, creating a percussion orchestra.',
    trigger: { food: 'fruit', entertainment: 'music', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("The fruit becomes musical instruments in a bouncing beat!"),
      { parallel: [{ action: 'spawn', asset: 'apple', position: 'cs-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'apple', position: 'cs-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'banana', position: 'cs-far-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'peach', position: 'cs-far-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: 'musical' }], delayAfter: 0.3 },
      ...GROUP_ENTER_RIGHT([['skeleton_mage', 'ds-left'], ['skeleton_minion', 'ds-right']]),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'Hammering' },
        { action: 'animate', character: 'skeleton_mage', anim: 'interact' },
        { action: 'animate', character: 'skeleton_minion', anim: 'interact' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-left' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-center', style: 'arc', duration: 0.6 },
        { action: 'text_popup', text: '🎵 FRUIT BEATS! 🎵', position: 'top', size: 'large' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
        { action: 'react', effect: 'glow-pulse', position: 'center' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_minion', 'excited', 'Me too me too!'),
    ],
    feedback: {
      title: '🎵 Fruit Orchestra!',
      message: 'The skeletons drum on fruit to make music! Apples and bananas play percussion!',
      skillTaught: 'Specificity',
      tip: 'Fruit + Music = fruity rhythms! Food becomes instruments!',
    },
  },

  // ── fruit + combat ──
  {
    id: 'sb_fruit_combat',
    description: 'Fruit rains down, a knight slips on a banana, and a clown laughs at the silly birthday brawl.',
    trigger: { food: 'fruit', entertainment: 'combat', vibe: '*' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Combat training with fruit? This is going to get messy!"),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'cs-center'),
      ...CHARACTER_THINK('skeleton_warrior', 'thinking'),
      { parallel: [
        { action: 'spawn_rain', asset: 'apple', quantity: 8, position: 'wide' },
        { action: 'sfx', sound: 'react' },
        { action: 'text_popup', text: '🍎 FRUIT STORM! 🍎', position: 'top', size: 'huge' },
        { action: 'camera_shake', intensity: 0.3, duration: 1.5 },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_RIGHT('knight', 'ds-right'),
      { parallel: [
        { action: 'move', character: 'knight', to: 'ds-center', style: 'straight', duration: 0.4 },
        { action: 'animate', character: 'knight', anim: 'die_flop' },
        { action: 'sfx', sound: 'fail' },
        { action: 'react', effect: 'stars-spin', position: 'ds-center' },
        { action: 'emote', character: 'knight', emoji: '🍌' },
      ], delayAfter: 0.5 },
      ...ENTER_FROM_RIGHT('clown', 'ds-far-right'),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt_long' },
        { action: 'animate', character: 'clown', anim: 'Cheering' },
        { action: 'react', effect: 'laugh-tears', position: 'cs-center' },
        { action: 'react', effect: 'laugh-tears', position: 'ds-far-right' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'text_popup', text: '🎪 SILLY BRAWL! 🎪', position: 'center', size: 'huge' },
        { action: 'animate', character: 'knight', anim: 'lie_idle' },
        { action: 'react', effect: 'dust', position: 'ds-center' },
      ], delayAfter: 2.0 },
    ],
    feedback: {
      title: '🤪 SILLY CHAOS!',
      message: "A fruit fight at a birthday party? The knight slipped on a banana and the clown loved it! Your wild combo made everyone laugh.",
      skillTaught: 'Creativity',
      tip: "Wild combos are hilarious! But for a 'perfect' party, try picking things that work together.",
    },
  },

  // ── fruit + dance ──
  {
    id: 'sb_fruit_dance',
    description: 'Fruits dance in mid-air while everyone catches them with their mouths.',
    trigger: { food: 'fruit', entertainment: 'dance', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("Time for a fruity dance party!"),
      { parallel: [{ action: 'spawn', asset: 'apple', position: 'us-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'apple', position: 'us-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'banana', position: 'us-far-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'cs-center'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '💃' }], delayAfter: 0.3 },
      ...GROUP_ENTER_RIGHT([['clown', 'ds-left'], ['ninja', 'ds-right']]),
      ...DANCE('skeleton_warrior'),
      ...DANCE('clown'),
      { parallel: [
        { action: 'move', character: 'clown', to: 'cs-left', style: 'arc', duration: 0.6 },
        { action: 'move', character: 'ninja', to: 'cs-right', style: 'arc', duration: 0.6 },
        { action: 'spawn_rain', asset: 'peach', quantity: 4, position: 'center' },
        { action: 'text_popup', text: '💃 DANCING FRUIT! 💃', position: 'top', size: 'large' },
      ], delayAfter: 0.5 },
      ...FLASH('green', 0.3),
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('clown', 'excited', 'Comedy GOLD!'),
    ...CHARACTER_SPEAK('ninja', 'excited', 'Shadow strike ready!'),
      ...CELEBRATION(['skeleton_warrior', 'clown', 'ninja'], 'center'),
    ],
    feedback: {
      title: '💃 Fruit Ballet!',
      message: 'Everyone dances with fruit in the air! They catch dancing apples while performing!',
      skillTaught: 'Specificity',
      tip: 'Fruit + Dance = floating fruit ballet! Snacks become performers!',
    },
  },

  // ── fruit + games ──
  {
    id: 'sb_fruit_games',
    description: 'Bobbing for apples game where the apples try to escape.',
    trigger: { food: 'fruit', entertainment: 'games', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("Apple bobbing time!"),
      { parallel: [{ action: 'spawn', asset: 'barrel', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'apple', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '🎯' }], delayAfter: 0.3 },
      ...GROUP_ENTER_RIGHT([['skeleton_minion', 'ds-left'], ['skeleton_mage', 'ds-right']]),
      { parallel: [
        { action: 'move', character: 'skeleton_minion', to: 'cs-left', style: 'straight', duration: 0.5 },
        { action: 'animate', character: 'skeleton_minion', anim: 'interact' },
        { action: 'react', effect: 'splash', position: 'cs-center' },
      ], delayAfter: 0.5 },
      ...CELEBRATION(['skeleton_warrior', 'skeleton_mage', 'skeleton_minion'], 'cs-center'),
    ],
    feedback: {
      title: '🎯 Apple Bobbing!',
      message: 'Apple bobbing game is on! The minion got one! The apples are fast but the skeletons are faster!',
      skillTaught: 'Specificity',
      tip: 'Fruit + Games = classic party game! Tradition meets fun!',
    },
  },
];

// ── CANDY VIGNETTES ─────────────────────────────────────────────────────────

const CANDY_VIGNETTES: Vignette[] = [
  // ── candy + magic_show ──
  {
    id: 'sb_candy_magic_show',
    description: 'A wizard makes candy appear from thin air and float around.',
    trigger: { food: 'candy', entertainment: 'magic_show', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("The wizard prepares a sweet magical spell!"),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '🍬' }], delayAfter: 0.3 },
      { parallel: [{ action: 'react', effect: 'sparkle-magic', position: 'cs-right' }, { action: 'sfx', sound: 'react' }], delayAfter: 0.3 },
      ...DROP_IN('mage', 'cs-right'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'spawn_rain', asset: 'cookie', quantity: 6, position: 'wide' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'grow', asset: 'cookie', scale: 3.0, duration: 1.0 },
        { action: 'text_popup', text: '✨ CANDY MAGIC! ✨', position: 'top', size: 'huge' },
        { action: 'react', effect: 'glow-pulse', position: 'cs-center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.8 },
      ...FLASH('pink', 0.3),
      ...ANNOUNCE('GIANT CANDY!', 'large'),
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-left', speed: 'fast', style: 'arc' },
      ], delayAfter: 0.4 },
      ...BOUNCE_ENTRANCE('skeleton_minion', 'ds-far-right', 'right'),
      ...CELEBRATION(['skeleton_warrior', 'mage'], 'center'),
    ],
    feedback: {
      title: '✨ Sweet Magic!',
      message: 'The wizard conjured a rain of candy that grew to giant size! Sweet treats everywhere!',
      skillTaught: 'Specificity',
      tip: 'Candy + Magic Show = sugary spells! Magic makes candy appear!',
    },
  },

  // ── candy + fireworks ──
  {
    id: 'sb_candy_fireworks',
    description: 'Candy explodes in the sky like sweet colorful fireworks.',
    trigger: { food: 'candy', entertainment: 'fireworks', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      ...NARRATOR("Candy fireworks incoming!"),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-left'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '🎆' }], delayAfter: 0.3 },
      ...ENTER_FROM_RIGHT('mage', 'ds-right'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'spawn_rain', asset: 'cookie', quantity: 8, position: 'wide' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'react', effect: 'fire-sneeze', position: 'off-top' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-left' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-right' },
        { action: 'react', effect: 'stars-spin', position: 'cs-center' },
        { action: 'camera_shake', intensity: 0.5, duration: 1.0 },
        { action: 'screen_flash', color: 'pink', duration: 0.2 },
        { action: 'text_popup', text: '🍬 CANDY BOOM! 🍬', position: 'center', size: 'huge' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'get_hit' },
        { action: 'animate', character: 'mage', anim: 'dodge_back' },
        { action: 'react', effect: 'dust', position: 'ds-left' },
      ], delayAfter: 0.5 },
      ...FLASH('pink', 0.4),
      ...BOUNCE_ENTRANCE('clown', 'ds-far-left', 'left'),
      ...ANNOUNCE('SWEET BOOM!', 'huge'),
      ...CROWD_CHEER([]),
      ...CELEBRATION(['skeleton_warrior', 'mage'], 'center'),
    ],
    feedback: {
      title: '🍬 Sugar Explosion!',
      message: 'The wizard launched candy fireworks! Sweet treats exploded across the sky!',
      skillTaught: 'Specificity',
      tip: 'Candy + Fireworks = sugar bombs! Sweet and explosive!',
    },
  },

  // ── candy + music ──
  {
    id: 'sb_candy_music',
    description: 'Candy wrappers crinkle in rhythm to create sweet music.',
    trigger: { food: 'candy', entertainment: 'music', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("Candy wrappers make the sweetest music!"),
      { parallel: [{ action: 'spawn', asset: 'cookie', position: 'us-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'cookie', position: 'us-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'candy_bucket', position: 'cs-far-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'macaron', position: 'cs-far-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'guitar', position: 'us-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: 'musical' }], delayAfter: 0.3 },
      ...GROUP_ENTER_RIGHT([['skeleton_minion', 'ds-left'], ['clown', 'ds-right']]),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'Hammering' },
        { action: 'animate', character: 'skeleton_minion', anim: 'interact' },
        { action: 'animate', character: 'clown', anim: 'interact' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-left' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-center', style: 'arc', duration: 0.6 },
        { action: 'text_popup', text: '🎵 CANDY CHORUS! 🎵', position: 'top', size: 'large' },
        { action: 'react', effect: 'glow-pulse', position: 'center' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_minion', 'excited', 'Rattle rattle!'),
    ...CHARACTER_SPEAK('clown', 'excited', 'HONK HONK! This is hilarious!'),
      ...CELEBRATION(['skeleton_warrior', 'skeleton_minion', 'clown'], 'center'),
    ],
    feedback: {
      title: '🎵 Sweet Symphony!',
      message: 'The skeletons play candy wrapper percussion! Crinkles create a sweet melody!',
      skillTaught: 'Specificity',
      tip: 'Candy + Music = wrapper orchestra! Sweets make sound!',
    },
  },

  // ── candy + combat ──
  {
    id: 'sb_candy_combat',
    description: 'Candy cane swords and lollipop shields in a sweet sugar battle.',
    trigger: { food: 'candy', entertainment: 'combat', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      ...NARRATOR("A candy combat challenge!"),
      { parallel: [{ action: 'spawn', asset: 'sword', position: 'cs-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'shield', position: 'cs-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-far-left'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '🍭' }], delayAfter: 0.3 },
      ...ENTER_FROM_RIGHT('knight', 'ds-far-right'),
      { parallel: [{ action: 'emote', character: 'knight', emoji: '⚔️' }], delayAfter: 0.3 },
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-left', speed: 'fast', style: 'straight' },
        { action: 'move', character: 'knight', to: 'cs-right', speed: 'fast', style: 'straight' },
        { action: 'text_popup', text: '⚔️ CANDY CLASH! ⚔️', position: 'center', size: 'huge' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'sword_slash' },
        { action: 'animate', character: 'knight', anim: 'block' },
        { action: 'react', effect: 'stars-spin', position: 'cs-center' },
        { action: 'camera_shake', intensity: 0.4, duration: 0.8 },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'knight', anim: 'sword_slash' },
        { action: 'animate', character: 'skeleton_warrior', anim: 'get_hit' },
        { action: 'spawn_rain', asset: 'cookie', quantity: 5, position: 'cs-center' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'die_dramatic' },
        { action: 'animate', character: 'knight', anim: 'Cheering' },
        { action: 'react', effect: 'laugh-tears', position: 'cs-left' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '⚔️ Sweet Battle!',
      message: 'A candy combat! They fought with swords and candy rained from every hit!',
      skillTaught: 'Specificity',
      tip: 'Candy + Combat = sugary chaos! Sweet treats go flying!',
    },
  },

  // ── candy + dance ──
  {
    id: 'sb_candy_dance',
    description: 'Sugar rush hits and everyone dances wildly with candy.',
    trigger: { food: 'candy', entertainment: 'dance', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      ...NARRATOR("The candy gives everyone a wild sugar rush!"),
      { parallel: [{ action: 'spawn', asset: 'cookie', position: 'us-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-left'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '💃' }, { action: 'sfx', sound: 'react' }], delayAfter: 0.3 },
      ...GROUP_ENTER_RIGHT([['clown', 'ds-center'], ['skeleton_minion', 'ds-right']]),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'spin_attack' },
        { action: 'animate', character: 'clown', anim: 'jump_big' },
        { action: 'animate', character: 'skeleton_minion', anim: 'spin_attack' },
        { action: 'react', effect: 'stars-spin', position: 'cs-center' },
        { action: 'camera_shake', intensity: 0.3, duration: 1.0 },
        { action: 'text_popup', text: '💃 SUGAR RUSH! 💃', position: 'top', size: 'huge' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.6 },
      ...DANCE('skeleton_warrior'),
      ...DANCE('clown'),
      ...DANCE('skeleton_minion'),
      ...ANNOUNCE('DANCE MADNESS!', 'huge'),
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-left', style: 'arc', duration: 0.5 },
        { action: 'move', character: 'clown', to: 'cs-right', style: 'arc', duration: 0.5 },
        { action: 'move', character: 'skeleton_minion', to: 'cs-far-right', style: 'arc', duration: 0.5 },
        { action: 'spawn_rain', asset: 'cookie', quantity: 4, position: 'center' },
        { action: 'sfx', sound: 'move' },
      ], delayAfter: 0.5 },
      ...FLASH('pink', 0.4),
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('clown', 'excited', 'Comedy GOLD!'),
    ...CHARACTER_SPEAK('skeleton_minion', 'excited', 'Rattle rattle!'),
      ...CELEBRATION(['skeleton_warrior', 'clown', 'skeleton_minion'], 'center'),
    ],
    feedback: {
      title: '💃 Sugar Rush Dance!',
      message: 'The candy gave everyone a sugar rush! They spin and jump nonstop!',
      skillTaught: 'Specificity',
      tip: 'Candy + Dance = hyperactive party! Sugar makes everyone energetic!',
    },
  },

  // ── candy + games ──
  {
    id: 'sb_candy_games',
    description: 'Pin the wrapper on the candy game turns sticky and sweet.',
    trigger: { food: 'candy', entertainment: 'games', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("Pin the wrapper on the candy — but watch out, it's sticky!"),
      { parallel: [{ action: 'spawn', asset: 'cookie', position: 'us-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'cookie', position: 'us-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'cookie', position: 'us-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '🎯' }], delayAfter: 0.3 },
      ...SNEAK_IN_LEFT('skeleton_minion', 'ds-left'),
      ...SNEAK_IN_LEFT('rogue', 'ds-right'),
      { parallel: [
        { action: 'move', character: 'skeleton_minion', to: 'cs-left', speed: 'fast', style: 'straight' },
        { action: 'animate', character: 'skeleton_minion', anim: 'interact' },
        { action: 'text_popup', text: '🔍 SEARCHING... 🔍', position: 'top', size: 'large' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_minion', anim: 'die_flop' },
        { action: 'react', effect: 'stars-spin', position: 'cs-left' },
        { action: 'text_popup', text: '🎯 STUCK! 🎯', position: 'cs-left', size: 'large' },
        { action: 'sfx', sound: 'fail' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'move', character: 'rogue', to: 'cs-right', speed: 'fast', style: 'direct' },
        { action: 'animate', character: 'rogue', anim: 'interact' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'rogue', anim: 'Cheering' },
        { action: 'animate', character: 'skeleton_warrior', anim: 'wave' },
        { action: 'react', effect: 'laugh-tears', position: 'center' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🎯 Sticky Games!',
      message: 'The minion got stuck to the candy! But the rogue found the prize!',
      skillTaught: 'Specificity',
      tip: 'Candy + Games = sticky fun! Sweet treats make games messy!',
    },
  },
];

// ── SOUP VIGNETTES ──────────────────────────────────────────────────────────

const SOUP_VIGNETTES: Vignette[] = [
  // ── soup + magic_show ──
  {
    id: 'sb_soup_magic_show',
    description: 'A wizard stirs a cauldron making magical soup appear.',
    trigger: { food: 'soup', entertainment: 'magic_show', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("The wizard brews a magical soup spell!"),
      { parallel: [{ action: 'spawn', asset: 'barrel', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '🍲' }], delayAfter: 0.3 },
      { parallel: [{ action: 'react', effect: 'sparkle-magic', position: 'cs-right' }, { action: 'sfx', sound: 'react' }], delayAfter: 0.3 },
      ...DROP_IN('mage', 'cs-right'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'react', effect: 'smoke', position: 'cs-center' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'grow', asset: 'barrel', scale: 2.0, duration: 1.0 },
        { action: 'react', effect: 'glow-pulse', position: 'cs-center' },
        { action: 'text_popup', text: '✨ MAGIC SOUP! ✨', position: 'top', size: 'huge' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.8 },
      ...FLASH('purple', 0.3),
      ...ANNOUNCE('BUBBLING MAGIC!', 'large'),
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-left', speed: 'fast', style: 'arc' },
      ], delayAfter: 0.4 },
      ...BOUNCE_ENTRANCE('skeleton_minion', 'ds-far-right', 'right'),
      ...CELEBRATION(['skeleton_warrior', 'mage'], 'center'),
    ],
    feedback: {
      title: '✨ Enchanted Soup!',
      message: 'The wizard brewed magical soup! The cauldron grew and bubbles with enchantment!',
      skillTaught: 'Specificity',
      tip: 'Soup + Magic Show = potion brewing! Soup becomes a magic spell!',
    },
  },

  // ── soup + fireworks ──
  {
    id: 'sb_soup_fireworks',
    description: 'Soup bubbles over and explodes like a volcano firework.',
    trigger: { food: 'soup', entertainment: 'fireworks', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      ...NARRATOR("The soup is about to blow like a volcano!"),
      { parallel: [{ action: 'spawn', asset: 'barrel', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-left'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '🎆' }], delayAfter: 0.3 },
      ...ENTER_FROM_RIGHT('mage', 'ds-right'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'react', effect: 'smoke', position: 'cs-center' },
        { action: 'react', effect: 'glow-pulse', position: 'cs-center' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'react', effect: 'fire-sneeze', position: 'off-top' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-center' },
        { action: 'react', effect: 'splash', position: 'cs-left' },
        { action: 'react', effect: 'splash', position: 'cs-right' },
        { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
        { action: 'screen_flash', color: 'orange', duration: 0.2 },
        { action: 'text_popup', text: '🍲 SOUP VOLCANO! 🍲', position: 'center', size: 'huge' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.8 },
      ...FLASH('orange', 0.5),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'get_hit' },
        { action: 'animate', character: 'mage', anim: 'dodge_back' },
        { action: 'react', effect: 'dust', position: 'ds-left' },
      ], delayAfter: 0.5 },
      ...ANNOUNCE('ERUPTION!', 'huge'),
      ...BOUNCE_ENTRANCE('knight', 'ds-far-right', 'right'),
      ...CROWD_CHEER([]),
      ...CELEBRATION(['skeleton_warrior', 'mage'], 'center'),
    ],
    feedback: {
      title: '🍲 Soup Eruption!',
      message: 'The soup boiled over like a volcano! Broth exploded and splashed everyone!',
      skillTaught: 'Specificity',
      tip: 'Soup + Fireworks = explosive cooking! Hot soup becomes volcanic!',
    },
  },

  // ── soup + music ──
  {
    id: 'sb_soup_music',
    description: 'Soup bubbles in rhythm creating a gurgling melody.',
    trigger: { food: 'soup', entertainment: 'music', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("Soup bubbles create a delicious melody!"),
      { parallel: [{ action: 'spawn', asset: 'barrel', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'guitar', position: 'us-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'drums', position: 'us-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: 'musical' }], delayAfter: 0.3 },
      ...GROUP_ENTER_RIGHT([['skeleton_mage', 'ds-left'], ['skeleton_minion', 'ds-right']]),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'Hammering' },
        { action: 'animate', character: 'skeleton_mage', anim: 'interact' },
        { action: 'animate', character: 'skeleton_minion', anim: 'interact' },
        { action: 'react', effect: 'smoke', position: 'cs-center' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-center', style: 'arc', duration: 0.6 },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'text_popup', text: '🎵 SOUP SONG! 🎵', position: 'top', size: 'large' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      ...CELEBRATION(['skeleton_warrior', 'skeleton_mage', 'skeleton_minion'], 'center'),
    ],
    feedback: {
      title: '🎵 Bubbling Beat!',
      message: 'The soup bubbles in rhythm while the skeletons play instruments! A cooking concert!',
      skillTaught: 'Specificity',
      tip: 'Soup + Music = cooking concert! Bubbles become beats!',
    },
  },

  // ── soup + combat ──
  {
    id: 'sb_soup_combat',
    description: 'Ladle dueling contest with soup splashing everywhere.',
    trigger: { food: 'soup', entertainment: 'combat', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      ...NARRATOR("It's a ladle duel! Soup is about to fly!"),
      { parallel: [{ action: 'spawn', asset: 'barrel', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-far-left'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '🍲' }], delayAfter: 0.3 },
      ...ENTER_FROM_RIGHT('knight', 'ds-far-right'),
      { parallel: [{ action: 'emote', character: 'knight', emoji: '⚔️' }], delayAfter: 0.3 },
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-left', speed: 'fast', style: 'straight' },
        { action: 'move', character: 'knight', to: 'cs-right', speed: 'fast', style: 'straight' },
        { action: 'text_popup', text: '⚔️ LADLE DUEL! ⚔️', position: 'center', size: 'huge' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'sword_slash' },
        { action: 'animate', character: 'knight', anim: 'sword_slash' },
        { action: 'react', effect: 'splash', position: 'cs-center' },
        { action: 'react', effect: 'splash', position: 'cs-left' },
        { action: 'react', effect: 'splash', position: 'cs-right' },
        { action: 'camera_shake', intensity: 0.4, duration: 0.8 },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'get_hit' },
        { action: 'animate', character: 'knight', anim: 'get_hit' },
        { action: 'react', effect: 'dust', position: 'cs-left' },
        { action: 'react', effect: 'dust', position: 'cs-right' },
        { action: 'sfx', sound: 'fail' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'die_flop' },
        { action: 'animate', character: 'knight', anim: 'die_flop' },
        { action: 'react', effect: 'laugh-tears', position: 'center' },
        { action: 'text_popup', text: '🍲 BOTH SOAKED! 🍲', position: 'center', size: 'huge' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '⚔️ Soup Fight!',
      message: 'A ladle duel! Both warriors ended up soaked in soup — nobody wins a food fight!',
      skillTaught: 'Specificity',
      tip: 'Soup + Combat = messy food fight! Liquid chaos!',
    },
  },

  // ── soup + dance ──
  {
    id: 'sb_soup_dance',
    description: 'Everyone dances around the soup pot in a swirling circle.',
    trigger: { food: 'soup', entertainment: 'dance', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("Dancing around the soup pot creates a magical swirl!"),
      { parallel: [{ action: 'spawn', asset: 'barrel', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-left'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '💃' }, { action: 'sfx', sound: 'react' }], delayAfter: 0.3 },
      ...GROUP_ENTER_RIGHT([['skeleton_mage', 'ds-right'], ['clown', 'ds-center']]),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'spin_attack' },
        { action: 'animate', character: 'skeleton_mage', anim: 'jump_big' },
        { action: 'animate', character: 'clown', anim: 'spin_attack' },
        { action: 'react', effect: 'smoke', position: 'cs-center' },
        { action: 'text_popup', text: '💃 SOUP SWIRL! 💃', position: 'top', size: 'large' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.6 },
      ...DANCE('skeleton_warrior'),
      ...DANCE('skeleton_mage'),
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-left', style: 'arc', duration: 0.6 },
        { action: 'move', character: 'skeleton_mage', to: 'cs-right', style: 'arc', duration: 0.6 },
        { action: 'move', character: 'clown', to: 'cs-far-left', style: 'arc', duration: 0.6 },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'move' },
      ], delayAfter: 0.5 },
      ...FLASH('orange', 0.3),
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('clown', 'excited', 'HONK HONK! This is hilarious!'),
      ...CELEBRATION(['skeleton_warrior', 'skeleton_mage', 'clown'], 'center'),
    ],
    feedback: {
      title: '💃 Soup Swirl!',
      message: 'Everyone dances around the soup pot! Spinning and jumping makes the soup swirl too!',
      skillTaught: 'Specificity',
      tip: 'Soup + Dance = stirring party! Movement makes the soup swirl!',
    },
  },

  // ── soup + games ──
  {
    id: 'sb_soup_games',
    description: 'Hot soup relay race where skeletons carefully carry bowls.',
    trigger: { food: 'soup', entertainment: 'games', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      ...NARRATOR("It's a hot soup relay race! Don't spill!"),
      { parallel: [{ action: 'spawn', asset: 'barrel', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'dinner_plate', position: 'cs-far-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-far-left'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '🍲' }], delayAfter: 0.3 },
      ...ENTER_FROM_RIGHT('skeleton_minion', 'ds-far-right'),
      { parallel: [{ action: 'emote', character: 'skeleton_minion', emoji: '🎯' }], delayAfter: 0.3 },
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-left', speed: 'medium', style: 'straight' },
        { action: 'animate', character: 'skeleton_warrior', anim: 'walk' },
        { action: 'react', effect: 'smoke', position: 'cs-left' },
        { action: 'text_popup', text: '🍲 CAREFUL! 🍲', position: 'top', size: 'large' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'die_flop' },
        { action: 'react', effect: 'splash', position: 'cs-left' },
        { action: 'react', effect: 'stars-spin', position: 'cs-left' },
        { action: 'sfx', sound: 'fail' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'move', character: 'skeleton_minion', to: 'cs-right', speed: 'medium', style: 'straight' },
        { action: 'animate', character: 'skeleton_minion', anim: 'walk' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_minion', anim: 'Cheering' },
        { action: 'text_popup', text: '🏆 MADE IT! 🏆', position: 'cs-right', size: 'huge' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
        { action: 'react', effect: 'laugh-tears', position: 'cs-left' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🎯 Soup Relay!',
      message: 'Hot soup relay race! The warrior spilled but the minion made it! Balance and speed!',
      skillTaught: 'Specificity',
      tip: 'Soup + Games = careful competition! Balance and speed!',
    },
  },
];

// ── ASSEMBLE ALL STAGE 1 VIGNETTES ─────────────────────────────────────────

const PAIR_VIGNETTES: Vignette[] = [
  ...CAKE_VIGNETTES,
  ...PIZZA_VIGNETTES,
  ...FEAST_VIGNETTES,
  ...FRUIT_VIGNETTES,
  ...CANDY_VIGNETTES,
  ...SOUP_VIGNETTES,
];

export const SKELETON_BIRTHDAY_STAGE_1: Vignette[] = [
  ...PAIR_VIGNETTES,

  // ── VIBE MATCH: any + any + spooky ─────────────────────────────────────────
  {
    id: 'skel_bday_1_vibe_spooky',
    description: 'Candles flicker and skulls appear as spooky vibes set the mood for the skeleton party.',
    trigger: { food: '*', entertainment: '*', vibe: 'spooky' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      ...NARRATOR("The spooky atmosphere takes over!"),
      { parallel: [{ action: 'spawn', asset: 'candle_triple', position: 'us-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'candle_triple', position: 'us-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'skull', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'pumpkin_jackolantern', position: 'cs-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: 'ghost' }], delayAfter: 0.3 },
      ...SNEAK_IN_LEFT('skeleton_mage', 'ds-left'),
      ...SNEAK_IN_LEFT('necromancer', 'ds-right'),
      { parallel: [
        { action: 'react', effect: 'fire-sneeze', position: 'cs-center' },
        { action: 'react', effect: 'skull-burst', position: 'cs-left' },
        { action: 'camera_shake', intensity: 0.2, duration: 0.5 },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'animate', character: 'necromancer', anim: 'cast_spell' },
        { action: 'react', effect: 'sparkle-magic', position: 'ds-right' },
        { action: 'text_popup', text: '👻 SPOOKY PARTY! 👻', position: 'center', size: 'large' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 2.0 },
    ],
    feedback: {
      title: '👻 Spooky Vibes!',
      message: "The spooky atmosphere was great! The candles and skulls set the mood. Try adding specific food and entertainment to make it even more epic!",
      skillTaught: 'Detail',
      tip: "You got the vibe right! Now try being specific about the food and entertainment too.",
    },
  },

  // ── VIBE MATCH: any + any + fancy ──────────────────────────────────────────
  {
    id: 'skel_bday_1_vibe_fancy',
    description: 'Pillars, a gold chest, and a red carpet create a fancy elegant skeleton celebration.',
    trigger: { food: '*', entertainment: '*', vibe: 'fancy' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      ...NARRATOR("A fancy party with elegant decorations!"),
      { parallel: [{ action: 'spawn', asset: 'pillar', position: 'us-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'pillar', position: 'us-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'rug', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'chest_gold', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '🎩' }], delayAfter: 0.3 },
      ...GROUP_ENTER_RIGHT([['knight', 'ds-left'], ['mage', 'ds-right']]),
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'react', effect: 'glow-pulse', position: 'cs-center' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'wave' },
        { action: 'crowd_react', characters: 'all', anim: 'wave' },
        { action: 'text_popup', text: '🎩 FANCY! 🎩', position: 'center', size: 'large' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 2.0 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('knight', 'excited', 'By my sword — incredible!'),
    ...CHARACTER_SPEAK('mage', 'excited', 'Spell-tacular!'),
    ],
    feedback: {
      title: '🎩 Fancy Vibes!',
      message: "What an elegant party! The pillars and gold set the scene. Now add specific food and entertainment to really complete the picture.",
      skillTaught: 'Detail',
      tip: "The fancy vibe is working! Try adding 'a feast' or 'a magic show' to fill in the blanks.",
    },
  },

  // ── CATEGORY: any + magic_show + any ───────────────────────────────────────
  {
    id: 'skel_bday_1_cat_magic',
    description: 'A wizard performs a magic show with sparkles and a potion for the skeleton birthday.',
    trigger: { food: '*', entertainment: 'magic_show', vibe: '*' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      ...NARRATOR("The wizard prepares a magical trick!"),
      ...ENTER_FROM_LEFT('skeleton_warrior', 'ds-center'),
      { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '✨' }], delayAfter: 0.3 },
      { parallel: [{ action: 'react', effect: 'sparkle-magic', position: 'cs-right' }, { action: 'sfx', sound: 'react' }], delayAfter: 0.3 },
      ...DROP_IN('mage', 'cs-right'),
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'spawn', asset: 'potion_red', position: 'cs-center' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-left', style: 'arc', duration: 0.5 },
      ], delayAfter: 0.4 },
      ...CELEBRATION(['skeleton_warrior', 'mage'], 'center'),
    ],
    feedback: {
      title: '✨ Magic Show!',
      message: "The magic show was great! The wizard pulled off some tricks. Try adding specific food and a party vibe for a full combo.",
      skillTaught: 'Detail',
      tip: "Good entertainment choice! Now pick food and a vibe to complete the party.",
    },
  },
];

// ─── DEFAULT VIGNETTE (always works) ────────────────────────────────────────

export const SKELETON_BIRTHDAY_DEFAULT: Vignette = {
  id: 'skel_bday_default',
  description: 'A clown walks in juggling 3 cats, then guests arrive for a chaotic birthday party.',
  trigger: { food: '*', entertainment: '*', vibe: '*' },
  tier: 'subtle',
  promptScore: 'partial',
  steps: [
    ...NARRATOR("It's party time! Let's see what happens..."),
    // Props: party table
    { parallel: [{ action: 'spawn', asset: 'table_long', position: 'us-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
    { parallel: [{ action: 'spawn', asset: 'present', position: 'us-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
    { parallel: [{ action: 'spawn', asset: 'present_C_green', position: 'us-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
    { parallel: [{ action: 'spawn', asset: 'teddy_bear', position: 'cs-far-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
    { parallel: [{ action: 'spawn', asset: 'play_blocks', position: 'cs-far-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
    // Cat juggling entrance!
    ...ENTER_FROM_LEFT('clown', 'ds-center'),
    { parallel: [{ action: 'spawn', asset: 'cat_1', position: 'cs-left' }, { action: 'spawn', asset: 'cat_2', position: 'cs-center' }, { action: 'spawn', asset: 'cat_3', position: 'cs-right' }], delayAfter: 0.4 },
    { parallel: [{ action: 'animate', character: 'clown', anim: 'Cheering' }, { action: 'emote', character: 'clown', emoji: 'playful' }], delayAfter: 0.3 },
    // Skeleton walks in from right
    ...ENTER_FROM_RIGHT('skeleton_warrior', 'ds-right'),
    { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: 'party' }], delayAfter: 0.3 },
    // Final celebration
    {
      parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'celebrate' },
        { action: 'react', effect: 'confetti-burst', position: 'cs-center' },
        { action: 'sfx', sound: 'success' },
        { action: 'text_popup', text: '🎉 HAPPY BIRTHDAY! 🎉', position: 'center', size: 'large' },
      ],
      delayAfter: 2.0,
    },
  ],
  feedback: {
    title: '🎂 Party Time!',
    message: "A birthday party happened! It was... fine. But imagine how much MORE fun it would be if you picked specific food, entertainment, and a vibe!",
    skillTaught: 'Specificity',
    tip: "Try filling in all three blanks with specific choices. Each detail you add makes the party crazier!",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 2 — SIZE + MOOD MODIFIERS (Teaching specificity through scale and emotion)
// ═══════════════════════════════════════════════════════════════════════════════

const STAGE2_SIZE_MOOD_VIGNETTES: Vignette[] = [
  // ── TINY PARTY: tiny + cake + magic_show ──
  {
    id: 'sb2_tiny_cake_magic',
    description: 'A tiny birthday party with a miniature cake and pocket-sized magic tricks',
    trigger: { size: 'tiny', food: 'cake', entertainment: 'magic_show', vibe: '*', mood: '*' },
    tier: 'subtle',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center', scale: 0.3 },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'off-left', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-center', style: 'linear' },
        { action: 'sfx', sound: 'move' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'spawn_character', character: 'mage', position: 'off-right', anim: 'spawn_air', scale: 0.5 },
      ], delayAfter: 0.3 },
      { parallel: [
        { action: 'move', character: 'mage', to: 'ds-right', style: 'linear' },
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'spawn', asset: 'cake_birthday', position: 'us-center', scale: 0.2 },
        { action: 'text_popup', text: 'tiny cake!', position: 'top', size: 'small' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'Cheering' },
        { action: 'emote', character: 'skeleton_warrior', emoji: '🎂' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🔍 Tiny Party!',
      message: 'A pocket-sized party! The cake is so small you need a magnifying glass to see it!',
      skillTaught: 'Specificity',
      tip: 'SIZE changes EVERYTHING. Tiny = cute and small. Try GIANT for mega chaos!',
      vagueComparison: {
        vagueInput: 'Have a party',
        vagueResult: 'A party happens... but how big? Who knows!',
      },
    },
  },

  // ── TINY PARTY: tiny + candy + silly ──
  {
    id: 'sb2_tiny_candy_silly',
    description: 'Tiny candy scattered around for a silly microscopic celebration',
    trigger: { size: 'tiny', food: 'candy', entertainment: '*', vibe: 'silly', mood: '*' },
    tier: 'subtle',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'present', position: 'cs-left', scale: 0.2 },
        { action: 'spawn', asset: 'present', position: 'cs-right', scale: 0.2 },
        { action: 'spawn', asset: 'donut_chocolate', position: 'us-far-left', scale: 0.2 },
        { action: 'spawn', asset: 'popsicle', position: 'cs-far-right', scale: 0.2 },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'off-left', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'move', character: 'skeleton_warrior', to: 'cs-center', style: 'bounce' },
        { action: 'sfx', sound: 'move' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'react', effect: 'hearts-float', position: 'cs-left' },
        { action: 'react', effect: 'hearts-float', position: 'cs-right' },
        { action: 'text_popup', text: 'itty bitty candy!', position: 'center', size: 'small' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'emote', character: 'skeleton_warrior', emoji: '🍬' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🍬 Miniature Madness!',
      message: 'The candy is so tiny, the skeleton can barely see it! But the silly vibes are huge!',
      skillTaught: 'Specificity',
      tip: 'Tiny + silly = small but fun! SIZE and VIBE work together to create unique scenes!',
      vagueComparison: {
        vagueInput: 'Get some candy',
        vagueResult: 'Candy appears... somewhere. Normal size. Normal vibes. Boring.',
      },
    },
  },

  // ── TINY PARTY: tiny + pizza + music ──
  {
    id: 'sb2_tiny_pizza_music',
    description: 'A miniature pizza party with a tiny band playing tiny tunes',
    trigger: { size: 'tiny', food: 'pizza', entertainment: 'music', vibe: '*', mood: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center', scale: 0.3 },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-center', anim: 'spawn_ground' },
        { action: 'spawn_character', character: 'skeleton_mage', position: 'ds-left', anim: 'spawn_ground', scale: 0.4 },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_mage', anim: 'cast_spell' },
        { action: 'react', effect: 'sparkle-magic', position: 'ds-left' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'spawn', asset: 'pizza', position: 'us-center', scale: 0.2 },
        { action: 'text_popup', text: '🎵 tiny pizza 🎵', position: 'top', size: 'small' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'wave' },
        { action: 'animate', character: 'skeleton_mage', anim: 'taunt' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'This is BONE-credible!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'That was un-BONE-lievably cool!'),
    ],
    feedback: {
      title: '🎵 Pocket Concert!',
      message: 'The band is so tiny they fit in your hand! The pizza is bite-sized!',
      skillTaught: 'Specificity',
      tip: 'Tiny size makes EVERYTHING small. Try GIANT for the opposite effect!',
      vagueComparison: {
        vagueInput: 'Play music and serve pizza',
        vagueResult: 'Music plays. Pizza appears. Normal everything. Yawn.',
      },
    },
  },

  // ── GIANT PARTY: giant + cake + magic_show ──
  {
    id: 'sb2_giant_cake_magic',
    description: 'A massive cake towers over everyone while a giant wizard performs enormous magic',
    trigger: { size: 'giant', food: 'cake', entertainment: 'magic_show', vibe: '*', mood: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center', scale: 2.0 },
        { action: 'spawn', asset: 'waffle', position: 'cs-left', scale: 1.5 },
        { action: 'spawn', asset: 'pudding', position: 'cs-right', scale: 1.5 },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-left', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'mage', position: 'off-right', anim: 'spawn_air', scale: 2.5 },
        { action: 'camera_shake', intensity: 0.4, duration: 0.8 },
        { action: 'sfx', sound: 'thud' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'move', character: 'mage', to: 'cs-right', style: 'stomp' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'spawn', asset: 'cake_birthday', position: 'center', scale: 3.0 },
        { action: 'react', effect: 'explosion-cartoon', position: 'center' },
        { action: 'text_popup', text: 'MEGA CAKE!', position: 'top', size: 'huge' },
        { action: 'screen_flash', color: 'white', duration: 0.2 },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt_long' },
        { action: 'animate', character: 'mage', anim: 'taunt' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'SKULL-tastic!'),
    ...CHARACTER_SPEAK('mage', 'excited', 'Spell-tacular!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'No-BODY does it better!'),
    ],
    feedback: {
      title: '🎂 MEGA CAKE PARTY!',
      message: 'The cake is MASSIVE! The wizard is HUGE! Everything is GIANT!',
      skillTaught: 'Specificity',
      tip: 'GIANT makes everything ENORMOUS and CHAOTIC! Size = scale = drama!',
      vagueComparison: {
        vagueInput: 'Make a cake appear',
        vagueResult: 'A normal cake appears. No drama, no size, no WOW.',
      },
    },
  },

  // ── GIANT PARTY: enormous + fireworks + epic ──
  {
    id: 'sb2_enormous_fireworks_epic',
    description: 'Sky-filling fireworks explode at an enormous epic celebration',
    trigger: { size: 'enormous', food: '*', entertainment: 'fireworks', vibe: 'epic', mood: '*' },
    tier: 'absolute_chaos',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'banner_red', position: 'top', scale: 3.0 },
        { action: 'spawn', asset: 'garland', position: 'us-left', scale: 2.0 },
        { action: 'spawn', asset: 'wreath', position: 'us-right', scale: 2.0 },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-center', anim: 'spawn_ground', scale: 2.0 },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'knight', position: 'ds-left', anim: 'spawn_ground', scale: 2.0 },
        { action: 'spawn_character', character: 'mage', position: 'ds-right', anim: 'spawn_air', scale: 2.0 },
        { action: 'sfx', sound: 'thud' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'react', effect: 'fire-sneeze', position: 'top' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-left' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-right' },
        { action: 'camera_shake', intensity: 0.8, duration: 1.5 },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 1.0 },
      { parallel: [
        { action: 'text_popup', text: 'ENORMOUS EPIC PARTY!', position: 'center', size: 'huge' },
        { action: 'screen_flash', color: 'yellow', duration: 0.3 },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'react', effect: 'sparkle-magic', position: 'top' },
      ], delayAfter: 2.0 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'My bones are rattling with excitement!'),
    ...CHARACTER_SPEAK('knight', 'excited', 'For glory!'),
    ...CHARACTER_SPEAK('mage', 'excited', 'Spell-tacular!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'That was un-BONE-lievably cool!'),
    ],
    feedback: {
      title: '🎆 ENORMOUS EPIC EXPLOSION!',
      message: 'The fireworks fill the ENTIRE SKY! The party is so big it needs its own ZIP CODE!',
      skillTaught: 'Specificity',
      tip: 'ENORMOUS + EPIC = maximum drama! Stack modifiers for HUGE results!',
      vagueComparison: {
        vagueInput: 'Set off fireworks',
        vagueResult: 'A single firework goes off. Meh. Where is the SCALE?',
      },
    },
  },

  // ── GIANT PARTY: giant + feast + wild ──
  {
    id: 'sb2_giant_feast_wild',
    description: 'A chaotic giant feast where food is everywhere and everyone goes wild',
    trigger: { size: 'giant', food: 'feast', entertainment: '*', vibe: 'wild', mood: '*' },
    tier: 'absolute_chaos',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center', scale: 2.5 },
        { action: 'spawn', asset: 'burger', position: 'cs-left', scale: 2.0 },
        { action: 'spawn', asset: 'cake_birthday', position: 'us-right', scale: 2.0 },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-center', anim: 'spawn_ground', scale: 1.5 },
        { action: 'spawn_character', character: 'barbarian', position: 'ds-left', anim: 'spawn_ground', scale: 1.5 },
        { action: 'spawn_character', character: 'clown', position: 'ds-right', anim: 'spawn_ground', scale: 1.5 },
        { action: 'sfx', sound: 'thud' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'animate', character: 'barbarian', anim: 'taunt' },
        { action: 'animate', character: 'clown', anim: 'Cheering' },
        { action: 'camera_shake', intensity: 0.5, duration: 1.0 },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'react', effect: 'fire-sneeze', position: 'cs-left' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-right' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'text_popup', text: 'WILD FEAST!', position: 'center', size: 'huge' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'jump_big' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'My bones are rattling with excitement!'),
    ...CHARACTER_SPEAK('barbarian', 'excited', 'BARBARIAN SMASH!'),
    ...CHARACTER_SPEAK('clown', 'excited', 'Comedy GOLD!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'That was un-BONE-lievably cool!'),
    ],
    feedback: {
      title: '🍖 GIANT WILD FEAST!',
      message: 'The food is HUGE! The party is WILD! Everything is OUT OF CONTROL!',
      skillTaught: 'Specificity',
      tip: 'GIANT + WILD = maximum chaos! Size and vibe multiply the madness!',
      vagueComparison: {
        vagueInput: 'Serve food',
        vagueResult: 'Some food appears on a table. Everyone politely eats. Boring.',
      },
    },
  },

  // ── MOOD: excited + fireworks ──
  {
    id: 'sb2_excited_fireworks',
    description: 'An excited skeleton bounces around while fireworks explode rapidly',
    trigger: { size: '*', food: '*', entertainment: 'fireworks', vibe: '*', mood: 'excited' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-center', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.3 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'jump_big' },
        { action: 'emote', character: 'skeleton_warrior', emoji: 'party' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'react', effect: 'fire-sneeze', position: 'cs-left' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-right' },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.3 },
      { parallel: [
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'text_popup', text: '🎆 SO EXCITED! 🎆', position: 'center', size: 'large' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🎆 Bouncing Bones!',
      message: 'The skeleton is SO EXCITED the fireworks go off in rapid bursts! Energy everywhere!',
      skillTaught: 'Specificity',
      tip: 'MOOD changes how characters REACT! Excited = fast and bouncy!',
      vagueComparison: {
        vagueInput: 'Have fireworks',
        vagueResult: 'Fireworks happen. The skeleton stands there. No emotion. No energy.',
      },
    },
  },

  // ── MOOD: shy + music ──
  {
    id: 'sb2_shy_music',
    description: 'A shy skeleton peeks out while gentle music plays softly',
    trigger: { size: '*', food: '*', entertainment: 'music', vibe: '*', mood: 'shy' },
    tier: 'subtle',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-left', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_mage', position: 'ds-right', anim: 'spawn_ground' },
        { action: 'animate', character: 'skeleton_mage', anim: 'idle_alt' },
        { action: 'sfx', sound: 'move' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'text_popup', text: '🎵 gentle music 🎵', position: 'top', size: 'small' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'idle_alt' },
        { action: 'emote', character: 'skeleton_warrior', emoji: 'happy' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🎵 Quiet Celebration',
      message: 'The skeleton feels shy, so the music is soft and gentle. A calm, sweet party.',
      skillTaught: 'Specificity',
      tip: 'SHY mood = quiet and gentle. Different moods create different party vibes!',
      vagueComparison: {
        vagueInput: 'Play music',
        vagueResult: 'Music plays at normal volume. The skeleton has no feelings about it.',
      },
    },
  },

  // ── MOOD: chaotic + dance ──
  {
    id: 'sb2_chaotic_dance',
    description: 'Chaotic dancing with characters spinning wildly everywhere',
    trigger: { size: '*', food: '*', entertainment: 'dance', vibe: '*', mood: 'chaotic' },
    tier: 'absolute_chaos',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-center', anim: 'spawn_ground' },
        { action: 'spawn_character', character: 'clown', position: 'ds-left', anim: 'spawn_ground' },
        { action: 'spawn_character', character: 'ninja', position: 'ds-right', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'animate', character: 'clown', anim: 'Cheering' },
        { action: 'animate', character: 'ninja', anim: 'taunt' },
        { action: 'camera_shake', intensity: 0.6, duration: 1.5 },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-left' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
        { action: 'text_popup', text: 'CHAOS DANCE!', position: 'center', size: 'huge' },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'taunt_long' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'My bones are rattling with excitement!'),
    ...CHARACTER_SPEAK('clown', 'excited', 'Time for the big show!'),
    ...CHARACTER_SPEAK('ninja', 'excited', 'Shadow strike ready!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'That was un-BONE-lievably cool!'),
    ],
    feedback: {
      title: '💃 CHAOS DANCE!',
      message: 'The skeleton feels CHAOTIC! Everyone dances in random directions! Total mayhem!',
      skillTaught: 'Specificity',
      tip: 'CHAOTIC mood = everything goes wild! Mood controls the energy level!',
      vagueComparison: {
        vagueInput: 'Have a dance',
        vagueResult: 'Characters sway gently. No chaos, no energy, no fun.',
      },
    },
  },

  // ── MOOD: mysterious + magic_show ──
  {
    id: 'sb2_mysterious_magic',
    description: 'A mysterious magic show with dark smoke and hidden reveals',
    trigger: { size: '*', food: '*', entertainment: 'magic_show', vibe: '*', mood: 'mysterious' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'candle_triple', position: 'cs-left' },
        { action: 'spawn', asset: 'candle_triple', position: 'cs-right' },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-center', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'mage', position: 'off-right', anim: 'spawn_air' },
        { action: 'react', effect: 'smoke', position: 'cs-center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'move', character: 'mage', to: 'cs-center', style: 'linear' },
        { action: 'react', effect: 'smoke', position: 'center' },
        { action: 'sfx', sound: 'move' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'text_popup', text: '✨ mystery magic ✨', position: 'top', size: 'large' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'idle_alt' },
        { action: 'emote', character: 'skeleton_warrior', emoji: 'thinking' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🎩 Mysterious Magic!',
      message: 'The skeleton feels MYSTERIOUS, so the magic is dark and secretive. What will appear?',
      skillTaught: 'Specificity',
      tip: 'MYSTERIOUS mood = suspense and shadows! Mood sets the TONE of the scene!',
      vagueComparison: {
        vagueInput: 'Do magic',
        vagueResult: 'A wizard waves a wand. Magic happens. No mystery, no mood.',
      },
    },
  },

  // ── SIZE + FOOD: giant + pizza ──
  {
    id: 'sb2_giant_pizza',
    description: 'A pizza so giant it needs multiple characters to carry it',
    trigger: { size: 'giant', food: 'pizza', entertainment: '*', vibe: '*', mood: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center', scale: 2.0 },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-left', anim: 'spawn_ground' },
        { action: 'spawn_character', character: 'barbarian', position: 'ds-right', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn', asset: 'pizza', position: 'us-center', scale: 3.0 },
        { action: 'camera_shake', intensity: 0.5, duration: 0.8 },
        { action: 'sfx', sound: 'thud' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'text_popup', text: 'MEGA PIZZA!', position: 'center', size: 'huge' },
        { action: 'react', effect: 'explosion-cartoon', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'wave' },
        { action: 'animate', character: 'barbarian', anim: 'Cheering' },
        { action: 'emote', character: 'skeleton_warrior', emoji: '🍕' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🍕 MEGA PIZZA MOUNTAIN!',
      message: 'The pizza is SO BIG it barely fits on the table! Everyone needs to help carry it!',
      skillTaught: 'Specificity',
      tip: 'GIANT size + specific food = huge versions! Try TINY for the opposite!',
      vagueComparison: {
        vagueInput: 'Bring pizza',
        vagueResult: 'A normal pizza appears. Normal size. No one is impressed.',
      },
    },
  },

  // ── SIZE + FOOD: tiny + pizza ──
  {
    id: 'sb2_tiny_pizza',
    description: 'A pizza so tiny it fits on a single finger',
    trigger: { size: 'tiny', food: 'pizza', entertainment: '*', vibe: '*', mood: '*' },
    tier: 'subtle',
    promptScore: 'funny_fail',
    steps: [
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-center', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn', asset: 'pizza', position: 'us-center', scale: 0.1 },
        { action: 'text_popup', text: 'tiny pizza?', position: 'center', size: 'small' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'idle_alt' },
        { action: 'emote', character: 'skeleton_warrior', emoji: '🔍' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'react', effect: 'question-marks', position: 'cs-center' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🔍 Where IS it?',
      message: 'The pizza is SO TINY the skeleton needs a magnifying glass to find it! Adorable but not filling!',
      skillTaught: 'Specificity',
      tip: 'TINY + pizza = microscopic meal! SIZE matters when planning a party!',
      vagueComparison: {
        vagueInput: 'Get pizza',
        vagueResult: 'A regular pizza shows up. No size specified, no surprise.',
      },
    },
  },

  // ── SIZE + FOOD: enormous + cake ──
  {
    id: 'sb2_enormous_cake',
    description: 'A cake so enormous it towers into the sky',
    trigger: { size: 'enormous', food: 'cake', entertainment: '*', vibe: '*', mood: '*' },
    tier: 'absolute_chaos',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-left', anim: 'spawn_ground', scale: 0.8 },
        { action: 'spawn_character', character: 'mage', position: 'ds-right', anim: 'spawn_air', scale: 0.8 },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'camera_shake', intensity: 0.7, duration: 1.2 },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 1.0 },
      { parallel: [
        { action: 'spawn', asset: 'cake_birthday', position: 'center', scale: 4.0 },
        { action: 'react', effect: 'explosion-cartoon', position: 'center' },
        { action: 'screen_flash', color: 'white', duration: 0.3 },
        { action: 'sfx', sound: 'thud' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'text_popup', text: 'CAKE TOWER!', position: 'top', size: 'huge' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'wave' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'SKULL-tastic!'),
    ...CHARACTER_SPEAK('mage', 'excited', 'Spell-tacular!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'No-BODY does it better!'),
    ],
    feedback: {
      title: '🎂 CAKE SKYSCRAPER!',
      message: 'The cake is SO ENORMOUS it touches the clouds! You will need a ladder to eat the top!',
      skillTaught: 'Specificity',
      tip: 'ENORMOUS is even BIGGER than GIANT! Choose your size carefully!',
      vagueComparison: {
        vagueInput: 'Make a cake',
        vagueResult: 'A normal birthday cake appears. One layer. Boring.',
      },
    },
  },

  // ── NORMAL SIZE + MOOD: normal + excited + games ──
  {
    id: 'sb2_normal_excited_games',
    description: 'A normal-sized party where excited skeleton plays energetic party games',
    trigger: { size: 'normal', food: '*', entertainment: 'games', mood: 'excited', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'present', position: 'cs-left' },
        { action: 'spawn', asset: 'present', position: 'cs-right' },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-center', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'clown', position: 'cs-left', anim: 'spawn_ground' },
        { action: 'animate', character: 'skeleton_warrior', anim: 'jump_big' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'clown', anim: 'Cheering' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'text_popup', text: 'PARTY GAMES!', position: 'center', size: 'large' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'emote', character: 'skeleton_warrior', emoji: 'party' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🎮 Excited Game Time!',
      message: 'The skeleton is SO EXCITED for games! Normal size, but maximum energy!',
      skillTaught: 'Specificity',
      tip: 'NORMAL size + EXCITED mood = balanced but energetic! Mood adds personality!',
      vagueComparison: {
        vagueInput: 'Play party games',
        vagueResult: 'Games happen with no emotion or energy',
      },
    },
  },

  // ── TINY + MOOD: tiny + mysterious + combat ──
  {
    id: 'sb2_tiny_mysterious_combat',
    description: 'Tiny mysterious combat with miniature warriors fighting in shadows',
    trigger: { size: 'tiny', food: '*', entertainment: 'combat', mood: 'mysterious', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'candle_triple', position: 'cs-left', scale: 0.3 },
        { action: 'spawn', asset: 'candle_triple', position: 'cs-right', scale: 0.3 },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-left', anim: 'spawn_ground', scale: 0.5 },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'knight', position: 'cs-right', anim: 'spawn_ground', scale: 0.5 },
        { action: 'react', effect: 'smoke', position: 'center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'animate', character: 'knight', anim: 'taunt' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'text_popup', text: 'tiny secret duel', position: 'center', size: 'small' },
        { action: 'emote', character: 'skeleton_warrior', emoji: '⚔️' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '⚔️ Secret Tiny Duel!',
      message: 'TINY warriors fight in MYSTERIOUS shadows! A secret miniature battle!',
      skillTaught: 'Specificity',
      tip: 'TINY + MYSTERIOUS = small and secretive! Size and mood work together!',
      vagueComparison: {
        vagueInput: 'Have a fight',
        vagueResult: 'Normal-sized warriors battle with no atmosphere',
      },
    },
  },

  // ── GIANT + MOOD: giant + shy + music ──
  {
    id: 'sb2_giant_shy_music',
    description: 'Giant skeleton feels shy despite huge size, soft gentle music plays',
    trigger: { size: 'giant', food: '*', entertainment: 'music', mood: 'shy', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-center', anim: 'spawn_ground', scale: 2.0 },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_mage', position: 'ds-left', anim: 'spawn_ground', scale: 0.8 },
        { action: 'animate', character: 'skeleton_warrior', anim: 'idle_alt' },
        { action: 'sfx', sound: 'move' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'text_popup', text: '🎵 gentle giant 🎵', position: 'top', size: 'large' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'emote', character: 'skeleton_warrior', emoji: 'happy' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🎵 Gentle Giant!',
      message: 'The skeleton is GIANT but feels SHY! Soft music for a sweet giant!',
      skillTaught: 'Specificity',
      tip: 'GIANT + SHY = big but gentle! Mood can contrast with size for surprises!',
      vagueComparison: {
        vagueInput: 'Play music',
        vagueResult: 'Music plays at normal volume with no personality',
      },
    },
  },

  // ── NORMAL + FOOD: normal + soup + dance ──
  {
    id: 'sb2_normal_soup_dance',
    description: 'Normal-sized soup party with dancing and warm celebration',
    trigger: { size: 'normal', food: 'soup', entertainment: 'dance', mood: '*', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'bowl', position: 'cs-center' },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-left', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'clown', position: 'ds-right', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'move' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'wave' },
        { action: 'animate', character: 'clown', anim: 'Cheering' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'text_popup', text: 'soup & dance!', position: 'center', size: 'large' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'SKULL-tastic!'),
    ...CHARACTER_SPEAK('clown', 'excited', 'HONK HONK! This is hilarious!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'That was un-BONE-lievably cool!'),
    ],
    feedback: {
      title: '🍲 Soup Dance Party!',
      message: 'Warm soup and happy dancing! A cozy celebration with movement!',
      skillTaught: 'Specificity',
      tip: 'Specific food + specific entertainment = unique combo! Soup changes the vibe!',
      vagueComparison: {
        vagueInput: 'Have food and entertainment',
        vagueResult: 'Generic party with no specific details',
      },
    },
  },

  // ── TINY + FOOD: tiny + fruit + excited ──
  {
    id: 'sb2_tiny_fruit_excited',
    description: 'Tiny fruit party where excited skeleton bounces around berry-sized treats',
    trigger: { size: 'tiny', food: 'fruit', mood: 'excited', entertainment: '*', vibe: '*' },
    tier: 'subtle',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'apple', position: 'cs-left', scale: 0.2 },
        { action: 'spawn', asset: 'apple', position: 'cs-right', scale: 0.2 },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-center', anim: 'spawn_ground', scale: 0.5 },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'emote', character: 'skeleton_warrior', emoji: '🍎' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'react', effect: 'hearts-float', position: 'cs-left' },
        { action: 'react', effect: 'hearts-float', position: 'cs-right' },
        { action: 'text_popup', text: 'berry-sized fruit!', position: 'center', size: 'small' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🍎 Berry Party!',
      message: 'TINY fruit with EXCITED skeleton! The apples are the size of berries!',
      skillTaught: 'Specificity',
      tip: 'TINY + FRUIT + EXCITED = small treats with big energy!',
      vagueComparison: {
        vagueInput: 'Bring fruit',
        vagueResult: 'Normal apples appear, no size, no emotion',
      },
    },
  },

  // ── ENORMOUS + MOOD: enormous + chaotic + combat ──
  {
    id: 'sb2_enormous_chaotic_combat',
    description: 'Enormous chaotic combat with giant warriors fighting wildly',
    trigger: { size: 'enormous', food: '*', entertainment: 'combat', mood: 'chaotic', vibe: '*' },
    tier: 'absolute_chaos',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-left', anim: 'spawn_ground', scale: 2.5 },
        { action: 'spawn_character', character: 'knight', position: 'cs-right', anim: 'spawn_ground', scale: 2.5 },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'barbarian', position: 'ds-center', anim: 'spawn_ground', scale: 2.0 },
        { action: 'camera_shake', intensity: 0.7, duration: 1.0 },
        { action: 'sfx', sound: 'thud' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'animate', character: 'knight', anim: 'taunt' },
        { action: 'animate', character: 'barbarian', anim: 'taunt' },
        { action: 'camera_shake', intensity: 0.8, duration: 1.5 },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-left' },
        { action: 'react', effect: 'fire-sneeze', position: 'cs-right' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'text_popup', text: 'MEGA BATTLE!', position: 'center', size: 'huge' },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'spin_attack' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'This is BONE-credible!'),
    ...CHARACTER_SPEAK('knight', 'excited', 'For glory!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'That was un-BONE-lievably cool!'),
    ],
    feedback: {
      title: '⚔️ ENORMOUS CHAOS BATTLE!',
      message: 'ENORMOUS warriors in CHAOTIC combat! Total mayhem at giant scale!',
      skillTaught: 'Specificity',
      tip: 'ENORMOUS + CHAOTIC = maximum wild energy! Size and mood multiply!',
      vagueComparison: {
        vagueInput: 'Have a battle',
        vagueResult: 'Normal fight with normal size and no emotion',
      },
    },
  },

  // ── NORMAL + FOOD: normal + candy + mysterious ──
  {
    id: 'sb2_normal_candy_mysterious',
    description: 'Normal candy appears mysteriously with dark magic effects',
    trigger: { size: 'normal', food: 'candy', entertainment: '*', mood: 'mysterious', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'candle_triple', position: 'cs-left' },
        { action: 'spawn', asset: 'candle_triple', position: 'cs-right' },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-center', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'mage', position: 'off-right', anim: 'spawn_air' },
        { action: 'react', effect: 'smoke', position: 'center' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'move', character: 'mage', to: 'cs-right', style: 'linear' },
        { action: 'animate', character: 'mage', anim: 'cast_spell' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn', asset: 'present', position: 'cs-center' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'text_popup', text: '🍬 mystery candy 🍬', position: 'top', size: 'large' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'emote', character: 'skeleton_warrior', emoji: 'thinking' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🍬 Mysterious Sweets!',
      message: 'MYSTERIOUS mood makes candy appear from shadows! What flavor will it be?',
      skillTaught: 'Specificity',
      tip: 'NORMAL size + MYSTERIOUS mood = suspenseful but not overwhelming!',
      vagueComparison: {
        vagueInput: 'Give candy',
        vagueResult: 'Candy appears plainly with no atmosphere',
      },
    },
  },

  // ── GIANT + FOOD: giant + feast + excited ──
  {
    id: 'sb2_giant_feast_excited',
    description: 'Giant excited feast with massive food and bouncing energy',
    trigger: { size: 'giant', food: 'feast', mood: 'excited', entertainment: '*', vibe: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center', scale: 2.5 },
        { action: 'spawn', asset: 'burger', position: 'cs-left', scale: 2.0 },
        { action: 'spawn', asset: 'cookie', position: 'us-right', scale: 2.0 },
        { action: 'spawn', asset: 'bowl', position: 'cs-center', scale: 1.8 },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-center', anim: 'spawn_ground', scale: 1.5 },
        { action: 'sfx', sound: 'thud' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'jump_big' },
        { action: 'emote', character: 'skeleton_warrior', emoji: 'party' },
        { action: 'camera_shake', intensity: 0.5, duration: 0.8 },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-left' },
        { action: 'react', effect: 'hearts-float', position: 'cs-right' },
        { action: 'text_popup', text: 'MEGA FEAST!', position: 'center', size: 'huge' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '🍖 GIANT EXCITED FEAST!',
      message: 'GIANT food with EXCITED skeleton! The feast is huge and the energy is through the roof!',
      skillTaught: 'Specificity',
      tip: 'GIANT + FEAST + EXCITED = maximum party energy! All three modifiers stack!',
      vagueComparison: {
        vagueInput: 'Serve a feast',
        vagueResult: 'Normal buffet with no size or emotion',
      },
    },
  },

  // ── TINY + ENTERTAINMENT: tiny + combat + shy ──
  {
    id: 'sb2_tiny_combat_shy',
    description: 'Tiny shy warriors barely tap each other in polite miniature combat',
    trigger: { size: 'tiny', food: '*', entertainment: 'combat', mood: 'shy', vibe: '*' },
    tier: 'subtle',
    promptScore: 'funny_fail',
    steps: [
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-left', anim: 'spawn_ground', scale: 0.4 },
        { action: 'spawn_character', character: 'knight', position: 'cs-right', anim: 'spawn_ground', scale: 0.4 },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'idle_alt' },
        { action: 'animate', character: 'knight', anim: 'idle_alt' },
        { action: 'sfx', sound: 'move' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'react', effect: 'question-marks', position: 'center' },
        { action: 'text_popup', text: 'gentle tap?', position: 'center', size: 'small' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'emote', character: 'skeleton_warrior', emoji: 'happy' },
        { action: 'emote', character: 'knight', emoji: 'happy' },
      ], delayAfter: 1.5 },
    ],
    feedback: {
      title: '⚔️ Polite Tiny Battle!',
      message: 'TINY + SHY = the warriors barely touch! They are too polite to really fight!',
      skillTaught: 'Specificity',
      tip: 'TINY + SHY = gentle and sweet! Sometimes combos create funny fails!',
      vagueComparison: {
        vagueInput: 'Have a fight',
        vagueResult: 'Normal warriors clash with normal intensity',
      },
    },
  },

  // ── ENORMOUS + FOOD: enormous + candy + chaotic ──
  {
    id: 'sb2_enormous_candy_chaotic',
    description: 'Enormous chaotic candy explosion with massive sweets everywhere',
    trigger: { size: 'enormous', food: 'candy', mood: 'chaotic', entertainment: '*', vibe: '*' },
    tier: 'absolute_chaos',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'present', position: 'cs-left', scale: 3.0 },
        { action: 'spawn', asset: 'present', position: 'cs-right', scale: 3.0 },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-center', anim: 'spawn_ground', scale: 1.5 },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'clown', position: 'ds-left', anim: 'spawn_ground', scale: 1.5 },
        { action: 'spawn_character', character: 'ninja', position: 'ds-right', anim: 'spawn_ground', scale: 1.5 },
        { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
        { action: 'sfx', sound: 'thud' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'animate', character: 'clown', anim: 'Cheering' },
        { action: 'animate', character: 'ninja', anim: 'taunt' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'react', effect: 'confetti-burst', position: 'cs-left' },
        { action: 'react', effect: 'explosion-cartoon', position: 'center' },
        { action: 'react', effect: 'hearts-float', position: 'cs-right' },
        { action: 'text_popup', text: 'CANDY CHAOS!', position: 'center', size: 'huge' },
        { action: 'screen_flash', color: 'pink', duration: 0.2 },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'My bones are rattling with excitement!'),
    ...CHARACTER_SPEAK('clown', 'excited', 'HONK HONK! This is hilarious!'),
    ...CHARACTER_SPEAK('ninja', 'excited', 'Shadow strike ready!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'No-BODY does it better!'),
    ],
    feedback: {
      title: '🍬 CANDY EXPLOSION!',
      message: 'ENORMOUS candy with CHAOTIC mood! Giant sweets flying everywhere!',
      skillTaught: 'Specificity',
      tip: 'ENORMOUS + CANDY + CHAOTIC = sweet mayhem! Triple stack for wild results!',
      vagueComparison: {
        vagueInput: 'Get candy',
        vagueResult: 'Some candy appears on a table, no excitement',
      },
    },
  },

  // ── NORMAL + ENTERTAINMENT: normal + combat + excited ──
  {
    id: 'sb2_normal_combat_excited',
    description: 'Normal-sized excited combat with energetic warriors bouncing around',
    trigger: { size: 'normal', food: '*', entertainment: 'combat', mood: 'excited', vibe: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-left', anim: 'spawn_ground' },
        { action: 'spawn_character', character: 'knight', position: 'cs-right', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'jump_big' },
        { action: 'animate', character: 'knight', anim: 'wave' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'animate', character: 'knight', anim: 'taunt' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'text_popup', text: 'EXCITED DUEL!', position: 'center', size: 'large' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'sword_slash' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'SKULL-tastic!'),
    ...CHARACTER_SPEAK('knight', 'excited', 'A knight never gives up!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'That was un-BONE-lievably cool!'),
    ],
    feedback: {
      title: '⚔️ Energetic Battle!',
      message: 'NORMAL size but EXCITED mood! The warriors are bouncing with energy!',
      skillTaught: 'Specificity',
      tip: 'NORMAL + EXCITED = balanced size with high energy! Mood matters!',
      vagueComparison: {
        vagueInput: 'Have a battle',
        vagueResult: 'Warriors fight with no emotion or personality',
      },
    },
  },
];

export const SKELETON_BIRTHDAY_STAGE_2: Vignette[] = [
  ...STAGE2_SIZE_MOOD_VIGNETTES,
  ...SKELETON_BIRTHDAY_STAGE_1,  // Stage 1 vignettes work here — undefined trigger keys act as wildcards
];

export const SKELETON_BIRTHDAY_DEFAULT_2: Vignette = {
  id: 'skel_bday_default_2',
  description: 'A vague party happens — not enough detail about size or mood.',
  trigger: { size: '*', food: '*', entertainment: '*', vibe: '*', mood: '*' },
  tier: 'subtle',
  promptScore: 'partial',
  steps: [
    ...NARRATOR("Um... a party is happening? Maybe?"),
    { parallel: [{ action: 'spawn', asset: 'table_long', position: 'us-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
    ...ENTER_FROM_LEFT('skeleton_warrior', 'cs-center'),
    { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: 'confused' }], delayAfter: 0.3 },
    {
      parallel: [
        { action: 'react', effect: 'question-marks', position: 'cs-center' },
        { action: 'text_popup', text: '🎂 ...party?', position: 'center', size: 'small' },
        { action: 'sfx', sound: 'react' },
      ],
      delayAfter: 2.0,
    },
  ],
  feedback: {
    title: '🤷 Vague Party...',
    message: "Something sort of happened... but HOW BIG? HOW does the skeleton FEEL? Try picking a Size and Mood!",
    skillTaught: 'Specificity',
    tip: "Try setting the SIZE and MOOD — they change everything about the party!",
    vagueComparison: {
      vagueInput: 'Have a party',
      vagueResult: "That's exactly what just happened. A vague party with vague results!",
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 3 — SECRET COMBOS (Activity pairs unlock unique vignettes)
// ═══════════════════════════════════════════════════════════════════════════════

const STAGE3_SECRET_COMBOS: Vignette[] = [
  // ── SECRET 1: magic_show + fireworks = Spellwork Spectacular ──
  {
    id: 'sb3_magic_fireworks',
    description: 'Magic show meets fireworks — spell effects become firework explosions',
    trigger: { activity1: 'magic_show', activity2: 'fireworks', spirit: '*', location: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-center' },
        { action: 'spawn', asset: 'candy_cane', position: 'us-left' },
        { action: 'spawn', asset: 'lollipop_pink', position: 'us-right' },
        { action: 'spawn', asset: 'stocking', position: 'us-far-left' },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-center', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'mage', position: 'off-right', anim: 'spawn_air' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'move', character: 'mage', to: 'cs-right', style: 'linear' },
        { action: 'sfx', sound: 'move' },
      ], delayAfter: 0.3 },
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'react', effect: 'fire-sneeze', position: 'top' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-left' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-right' },
        { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
        { action: 'screen_flash', color: 'purple', duration: 0.2 },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'text_popup', text: 'SPELL FIREWORKS!', position: 'center', size: 'huge' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'This is BONE-credible!'),
    ...CHARACTER_SPEAK('mage', 'excited', 'My magic is TINGLING!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'No-BODY does it better!'),
    ],
    feedback: {
      title: '🪄 SECRET: SPELLWORK SPECTACULAR!',
      message: 'Magic + Fireworks = spell effects EXPLODE in the sky! Every spell becomes a firework!',
      skillTaught: 'Combo Thinking',
      tip: 'Some activities create NEW results when combined! Magic and fireworks make spell-explosions!',
    },
  },

  // ── SECRET 2: combat + dance = Battle Dance ──
  {
    id: 'sb3_combat_dance',
    description: 'Combat meets dance — fighters move in perfectly choreographed battle',
    trigger: { activity1: 'combat', activity2: 'dance', spirit: '*', location: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-left', anim: 'spawn_ground' },
        { action: 'spawn_character', character: 'knight', position: 'cs-right', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'animate', character: 'knight', anim: 'taunt' },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'wave' },
        { action: 'animate', character: 'knight', anim: 'wave' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'animate', character: 'knight', anim: 'taunt' },
        { action: 'camera_shake', intensity: 0.4, duration: 0.8 },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'text_popup', text: '⚔️ BATTLE DANCE! 💃', position: 'center', size: 'huge' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'spin_attack' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'This is BONE-credible!'),
    ...CHARACTER_SPEAK('knight', 'excited', 'A knight never gives up!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'No-BODY does it better!'),
    ],
    feedback: {
      title: '⚔️ SECRET: BATTLE DANCE!',
      message: 'Combat + Dance = choreographed fighting! The warriors battle in perfect rhythm!',
      skillTaught: 'Combo Thinking',
      tip: 'Fighting and dancing together create a performance! What other pairs fit?',
    },
  },

  // ── SECRET 2 REVERSE: dance + combat (same result) ──
  {
    id: 'sb3_dance_combat',
    description: 'Dance meets combat — same as combat + dance',
    trigger: { activity1: 'dance', activity2: 'combat', spirit: '*', location: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'cs-left', anim: 'spawn_ground' },
        { action: 'spawn_character', character: 'knight', position: 'cs-right', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'Cheering' },
        { action: 'animate', character: 'knight', anim: 'Cheering' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'animate', character: 'knight', anim: 'taunt' },
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'jump_big' },
        { action: 'animate', character: 'knight', anim: 'jump_big' },
        { action: 'camera_shake', intensity: 0.4, duration: 0.8 },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'text_popup', text: '💃 DANCE BATTLE! ⚔️', position: 'center', size: 'huge' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'taunt_long' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'This is BONE-credible!'),
    ...CHARACTER_SPEAK('knight', 'excited', 'A knight never gives up!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'No-BODY does it better!'),
    ],
    feedback: {
      title: '💃 SECRET: DANCE BATTLE!',
      message: 'Dance + Combat = choreographed moves! The same combo works both ways!',
      skillTaught: 'Combo Thinking',
      tip: 'Order does not matter! Dance + Combat = Combat + Dance!',
    },
  },

  // ── SECRET 3: music + magic_show = Musical Enchantment ──
  {
    id: 'sb3_music_magic',
    description: 'Music meets magic — instruments play themselves with magical enchantment',
    trigger: { activity1: 'music', activity2: 'magic_show', spirit: '*', location: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'lollipop_orange', position: 'us-left' },
        { action: 'spawn', asset: 'candy_blue', position: 'us-center' },
        { action: 'spawn', asset: 'candy_orange', position: 'us-right' },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-center', anim: 'spawn_ground' },
        { action: 'spawn_character', character: 'mage', position: 'off-right', anim: 'spawn_air' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'move', character: 'mage', to: 'cs-right', style: 'linear' },
        { action: 'sfx', sound: 'move' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'animate', character: 'mage', anim: 'cast_long' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-left' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
        { action: 'sfx', sound: 'magic' },
      ], delayAfter: 0.8 },
      { parallel: [
        { action: 'text_popup', text: '🎵 ✨ 🎵 ✨ 🎵', position: 'center', size: 'large' },
        { action: 'react', effect: 'hearts-float', position: 'center' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'text_popup', text: 'MAGIC MUSIC!', position: 'top', size: 'huge' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'wave' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'SKULL-tastic!'),
    ...CHARACTER_SPEAK('mage', 'excited', 'My magic is TINGLING!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'No-BODY does it better!'),
    ],
    feedback: {
      title: '🎵 SECRET: MUSICAL ENCHANTMENT!',
      message: 'Music + Magic = instruments play THEMSELVES! The music is alive with enchantment!',
      skillTaught: 'Combo Thinking',
      tip: 'Combining creative activities makes NEW magic! What else can you mix?',
    },
  },

  // ── SECRET 4: fireworks + games = Explosive Games ──
  {
    id: 'sb3_fireworks_games',
    description: 'Fireworks meet games — party games explode with colorful effects',
    trigger: { activity1: 'fireworks', activity2: 'games', spirit: '*', location: '*' },
    tier: 'absolute_chaos',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'present', position: 'cs-left' },
        { action: 'spawn', asset: 'present', position: 'cs-right' },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-center', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'spawn' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'clown', position: 'ds-left', anim: 'spawn_ground' },
        { action: 'spawn_character', character: 'ninja', position: 'ds-right', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'move' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.4 },
      { parallel: [
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-left' },
        { action: 'react', effect: 'fire-sneeze', position: 'cs-right' },
        { action: 'camera_shake', intensity: 0.7, duration: 1.0 },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'text_popup', text: 'BOOM GAMES!', position: 'center', size: 'huge' },
        { action: 'react', effect: 'confetti-burst', position: 'center' },
        { action: 'screen_flash', color: 'yellow', duration: 0.2 },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'jump_big' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'SKULL-tastic!'),
    ...CHARACTER_SPEAK('clown', 'excited', 'HONK HONK! This is hilarious!'),
    ...CHARACTER_SPEAK('ninja', 'excited', 'Swift like the wind!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'That was un-BONE-lievably cool!'),
    ],
    feedback: {
      title: '💥 SECRET: EXPLOSIVE GAMES!',
      message: 'Fireworks + Games = every game action explodes with fireworks! Musical chairs goes BOOM!',
      skillTaught: 'Combo Thinking',
      tip: 'Fireworks + any game = EXPLOSIVE combo! Mix different Activities for surprises!',
    },
  },

  // ── SECRET 5: games + music = Musical Chairs Chaos ──
  {
    id: 'sb3_games_music',
    description: 'Games meet music — musical chairs where the chairs run away',
    trigger: { activity1: 'games', activity2: 'music', spirit: '*', location: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [
        { action: 'spawn', asset: 'table_long', position: 'us-left' },
        { action: 'spawn', asset: 'table_long', position: 'us-right' },
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-center', anim: 'spawn_ground' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'spawn_character', character: 'clown', position: 'ds-left', anim: 'spawn_ground' },
        { action: 'spawn_character', character: 'robot', position: 'ds-right', anim: 'spawn_ground' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'center' },
        { action: 'text_popup', text: '🎵 musical chairs! 🎵', position: 'top', size: 'large' },
        { action: 'sfx', sound: 'react' },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'move', asset: 'table_long', to: 'off-left', style: 'scatter' },
        { action: 'camera_shake', intensity: 0.3, duration: 0.8 },
      ], delayAfter: 0.6 },
      { parallel: [
        { action: 'text_popup', text: 'CHAIRS RUN AWAY!', position: 'center', size: 'huge' },
        { action: 'react', effect: 'laugh-tears', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ], delayAfter: 0.5 },
      { parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
      ], delayAfter: 1.5 },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'My bones are rattling with excitement!'),
    ...CHARACTER_SPEAK('clown', 'excited', 'Time for the big show!'),
    ...CHARACTER_SPEAK('robot', 'excited', 'Processing... excitement levels MAXIMUM!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'That was un-BONE-lievably cool!'),
    ],
    feedback: {
      title: '🎵 SECRET: MUSICAL CHAIR CHASE!',
      message: 'Games + Music = the chairs RUN AWAY during musical chairs! Catch them if you can!',
      skillTaught: 'Combo Thinking',
      tip: 'Music + Games = living musical chairs! The furniture moves on its own!',
    },
  },
];

export const SKELETON_BIRTHDAY_STAGE_3: Vignette[] = [
  ...STAGE3_SECRET_COMBOS,
  ...SKELETON_BIRTHDAY_STAGE_2,  // Includes stage 1+2 vignettes as fallbacks
];

export const SKELETON_BIRTHDAY_DEFAULT_3: Vignette = {
  id: 'skel_bday_default_3',
  description: 'Two activities happen separately — no combo discovered.',
  trigger: { activity1: '*', activity2: '*', spirit: '*', location: '*' },
  tier: 'moderate',
  promptScore: 'partial',
  steps: [
    ...NARRATOR("Two activities happen... but separately."),
    { parallel: [{ action: 'spawn', asset: 'table_long', position: 'us-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
    ...ENTER_FROM_LEFT('skeleton_warrior', 'cs-center'),
    {
      parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-left' },
        { action: 'sfx', sound: 'react' },
      ],
      delayAfter: 0.5,
    },
    {
      parallel: [
        { action: 'react', effect: 'hearts-float', position: 'cs-right' },
        { action: 'sfx', sound: 'react' },
      ],
      delayAfter: 0.5,
    },
    {
      parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'celebrate' },
        { action: 'text_popup', text: '🎉 two things!', position: 'center', size: 'small' },
      ],
      delayAfter: 2.0,
    },
    // Dialogue fix: give silent characters a voice
    ...CHARACTER_SPEAK('skeleton_warrior', 'excited', 'My bones are rattling with excitement!'),
    ...CHARACTER_SPEAK('skeleton_warrior', 'star_eyes', 'No-BODY does it better!'),
  ],
  feedback: {
    title: '🤷 Two Separate Things...',
    message: "Both activities happened, but they did not COMBINE. Try finding pairs that create NEW magic together!",
    skillTaught: 'Combo Thinking',
    tip: "Some activity pairs unlock SECRET COMBOS! Try magic + fireworks, combat + dance, or music + games!",
  },
};
