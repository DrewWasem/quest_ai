/**
 * Skeleton Pizza Quest — Vignettes for Stage 1.
 *
 * Stage 1: "Have {CHEF} cook {DISH} in the most {STYLE} way possible"
 * Slots: CHEF (skeleton/clown/superhero/survivalist/everyone), DISH (pizza/pepperoni/pasta/soup/cake/mystery), STYLE (fast/fancy/chaotic/explosive/sneaky/dramatic)
 */

import type { Vignette } from '../../types/madlibs';
import {
  ENTER_FROM_LEFT, CHARGE_IN_LEFT,
  DROP_IN, TELEPORT_IN,
  OBJECT_DROP, OBJECT_GROW_REVEAL,
  OBJECT_RAIN,
  CHARACTER_SPEAK, CHARACTER_THINK, EMOTIONAL_REACT, CHARACTER_EXCLAIM,
  NARRATOR, IMPACT, CELEBRATION, DISAPPOINTMENT, DRAMATIC_PAUSE,
  WALK_TO, RUN_TO, JUMP_TO, CROWD_CHEER, CROWD_GASP,
  BOUNCE_ENTRANCE, DANCE,
} from '../movement-templates';

// ─── STAGE 1 VIGNETTES ──────────────────────────────────────────────────────

// ─── SKELETON CHEF VIGNETTES (5 dishes) ────────────────────────────────────

const SKELETON_VIGNETTES: Vignette[] = [
  {
    id: 'sp_skeleton_pizza',
    description: 'Skeleton chef tosses pizza dough and his arm flies off mid-toss.',
    trigger: { chef: 'skeleton', dish: 'pizza', style: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Kitchen scene + narrator intro
      ...NARRATOR("Chef Skeleton enters the pizzeria, ready to toss some dough!"),
      {
        parallel: [
          { action: 'spawn', asset: 'stove', position: 'cs-center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'cs-left' },
          { action: 'spawn', asset: 'rolling_pin', position: 'cs-right' },
          { action: 'spawn', asset: 'flour_sack', position: 'cs-left' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [{ action: 'sfx', sound: 'cooking' }], delayAfter: 0.3 },
      ...ENTER_FROM_LEFT('skeleton_warrior'),
      ...WALK_TO('skeleton_warrior', 'cs-left'),

      // INTENT: Skeleton announces the plan
      ...CHARACTER_SPEAK('skeleton_warrior', 'excited', "Watch THIS! The legendary dough toss!"),
      { parallel: [{ action: 'sfx', sound: 'whoosh' }], delayAfter: 0.3 },

      // ACTION: Tossing dough... but disaster strikes
      { parallel: [{ action: 'animate', character: 'skeleton_warrior', anim: 'throw' }], delayAfter: 0.5 },
      ...IMPACT(),
      { parallel: [
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-center' },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.4 },

      // CONSEQUENCE: Arm flies off!
      ...EMOTIONAL_REACT('skeleton_warrior', 'shocked', 'cs-left'),
      ...CHARACTER_EXCLAIM('skeleton_warrior', 'shocked', "My ARM! It flew off!"),
      { parallel: [{ action: 'camera_shake', intensity: 0.3, duration: 0.4 }], delayAfter: 0.3 },
      ...WALK_TO('skeleton_warrior', 'cs-center'),

      // RESOLUTION: But pizza is perfect!
      ...OBJECT_GROW_REVEAL('pizza_whole', 'cs-center', 1.2),
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.4 },
      ...CROWD_CHEER([]),
      ...DANCE('skeleton_warrior'),
      ...NARRATOR("The arm flew off, but the pizza landed perfectly! That's skeleton physics for you!"),
    ],
    feedback: { title: 'Bone-Toss Pizza!', message: "The skeleton's arm flew off while tossing dough! But hey, the pizza still landed perfectly!", skillTaught: 'Specificity', tip: 'Skeleton chefs have a unique... falling-apart style!' },
  },
  {
    id: 'sp_skeleton_pepperoni',
    description: 'Skeleton arranges pepperoni on pizza but uses its own ribs as toppings.',
    trigger: { chef: 'skeleton', dish: 'pepperoni', style: '*' },
    tier: 'moderate',
    promptScore: 'chaotic',
    steps: [
      // SETUP: Kitchen with oven + narrator
      ...NARRATOR("Time to make a delicious pepperoni pizza!"),
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'cs-center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'cs-right' },
          { action: 'spawn', asset: 'cutting_board', position: 'cs-right' },
          { action: 'spawn', asset: 'tomato_fmp', position: 'cs-left' },
          { action: 'spawn', asset: 'mushroom', position: 'cs-left' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [{ action: 'sfx', sound: 'cooking' }], delayAfter: 0.3 },
      ...ENTER_FROM_LEFT('skeleton_warrior'),
      ...RUN_TO('skeleton_warrior', 'cs-right'),

      // INTENT: Skeleton plans to add toppings
      ...CHARACTER_SPEAK('skeleton_warrior', 'proud', "Now for the BEST pepperoni in town!"),
      ...OBJECT_DROP('dough_ball', 'cs-right'),
      { parallel: [{ action: 'sfx', sound: 'chop' }], delayAfter: 0.3 },

      // ACTION: Adding "toppings"
      { parallel: [{ action: 'animate', character: 'skeleton_warrior', anim: 'interact' }], delayAfter: 0.5 },
      { parallel: [
        { action: 'react', effect: 'question-marks', position: 'cs-center' },
        { action: 'sfx', sound: 'chop' },
      ], delayAfter: 0.4 },

      // CONSEQUENCE: Wait... those are RIBS!
      ...JUMP_TO('skeleton_warrior', 'cs-left'),
      ...EMOTIONAL_REACT('skeleton_warrior', 'shocked', 'cs-left'),
      ...CHARACTER_EXCLAIM('skeleton_warrior', 'shocked', "Oh no! I used my OWN RIBS as toppings!"),
      ...DRAMATIC_PAUSE(),

      // RESOLUTION: Rib pizza complete!
      ...OBJECT_GROW_REVEAL('pizza_whole', 'cs-center'),
      { parallel: [
        { action: 'react', effect: 'laugh-tears', position: 'cs-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.4 },
      ...CROWD_GASP([]),
      ...DISAPPOINTMENT(['skeleton_warrior']),
      ...NARRATOR("You got a rib pizza! Skeletons make creative ingredient choices when supplies run low."),
    ],
    feedback: { title: 'Rib Pizza!', message: "The skeleton got confused and used its OWN RIBS as pepperoni! That's... creative cooking?", skillTaught: 'Specificity', tip: 'Skeleton chefs have limited ingredients (mostly bones).' },
  },
  {
    id: 'sp_skeleton_pasta',
    description: 'Skeleton stirs pasta but gets tangled in the noodles.',
    trigger: { chef: 'skeleton', dish: 'pasta', style: '*' },
    tier: 'moderate',
    promptScore: 'funny_fail',
    steps: [
      // SETUP: Cauldron bubbling + narrator
      ...NARRATOR("Chef Skeleton prepares to make perfect pasta!"),
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'cs-center' },
          { action: 'spawn', asset: 'ladle', position: 'cs-right' },
          { action: 'spawn', asset: 'big_spoon', position: 'cs-left' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [
        { action: 'react', effect: 'steam', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.3 },
      ...ENTER_FROM_LEFT('skeleton_warrior'),
      ...WALK_TO('skeleton_warrior', 'cs-center'),

      // INTENT: Ready to stir
      ...CHARACTER_SPEAK('skeleton_warrior', 'excited', "Time to stir this pasta to perfection!"),
      { parallel: [{ action: 'sfx', sound: 'chop' }], delayAfter: 0.3 },

      // ACTION: Stirring the pot
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'cast_spell' },
        { action: 'react', effect: 'steam', position: 'cs-center' },
      ], delayAfter: 0.6 },
      { parallel: [{ action: 'sfx', sound: 'cooking' }], delayAfter: 0.3 },

      // CONSEQUENCE: Tangled in noodles!
      ...IMPACT(),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'get_bonked' },
        { action: 'react', effect: 'stars-spin', position: 'cs-center' },
      ], delayAfter: 0.4 },
      ...JUMP_TO('skeleton_warrior', 'cs-left'),
      ...EMOTIONAL_REACT('skeleton_warrior', 'exhausted', 'cs-left'),
      ...CHARACTER_EXCLAIM('skeleton_warrior', 'shocked', "I'm tangled! These noodles are everywhere!"),
      { parallel: [{ action: 'camera_shake', intensity: 0.3, duration: 0.4 }], delayAfter: 0.3 },

      // RESOLUTION: Pasta fail
      ...CROWD_GASP([]),
      ...DISAPPOINTMENT(['skeleton_warrior']),
      { parallel: [{ action: 'sfx', sound: 'impact' }], delayAfter: 0.3 },
      ...NARRATOR("The skeleton got wrapped in pasta! Without muscles, noodles are impossible to control!"),
    ],
    feedback: { title: 'Noodle Tangle!', message: "The skeleton got WRAPPED in pasta! It can't untangle itself from all those noodles!", skillTaught: 'Specificity', tip: 'Pasta is tricky for chefs without muscles to hold it!' },
  },
  {
    id: 'sp_skeleton_soup',
    description: 'Skeleton makes soup but accidentally drops its skull into the pot as a bowl.',
    trigger: { chef: 'skeleton', dish: 'soup', style: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      // SETUP: Soup kitchen scene + narrator
      ...NARRATOR("Chef Skeleton is making the perfect soup!"),
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'cs-center' },
          { action: 'spawn', asset: 'pot', position: 'cs-left' },
          { action: 'spawn', asset: 'bell_pepper', position: 'cs-right' },
          { action: 'spawn', asset: 'onion_fmp', position: 'cs-right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [
        { action: 'react', effect: 'steam', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.3 },
      ...ENTER_FROM_LEFT('skeleton_warrior'),
      ...RUN_TO('skeleton_warrior', 'cs-center'),

      // INTENT: Soup is ready!
      ...CHARACTER_SPEAK('skeleton_warrior', 'proud', "My PERFECT soup is ready! Just need a bowl!"),
      { parallel: [{ action: 'sfx', sound: 'cooking' }], delayAfter: 0.3 },

      // ACTION: Looking for a bowl
      ...WALK_TO('skeleton_warrior', 'cs-left'),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'interact' },
        { action: 'react', effect: 'steam', position: 'cs-center' },
      ], delayAfter: 0.5 },

      // CONSEQUENCE: Skull falls into soup!
      ...IMPACT(),
      { parallel: [
        { action: 'react', effect: 'splash', position: 'cs-center' },
        { action: 'camera_shake', intensity: 0.4, duration: 0.5 },
        { action: 'sfx', sound: 'glass' },
      ], delayAfter: 0.4 },
      ...EMOTIONAL_REACT('skeleton_warrior', 'shocked', 'cs-left'),
      ...CHARACTER_EXCLAIM('skeleton_warrior', 'shocked', "My HEAD! It fell in as the BOWL!"),
      ...DRAMATIC_PAUSE(),

      // RESOLUTION: Skull-bowl soup success?
      { parallel: [
        { action: 'react', effect: 'glow-pulse', position: 'cs-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.4 },
      ...CROWD_CHEER([]),
      ...DANCE('skeleton_warrior'),
      ...CELEBRATION(['skeleton_warrior']),
      ...NARRATOR("The skull made a perfect bowl! Sometimes accidents create brilliant solutions!"),
    ],
    feedback: { title: 'Skull Bowl Soup!', message: "The skeleton's head FELL OFF into the soup pot! Well... at least it's a good bowl?", skillTaught: 'Specificity', tip: 'Skeleton chefs sometimes lose their heads!' },
  },
  {
    id: 'sp_skeleton_cake',
    description: 'Skeleton bakes a cake but its bones rattle so hard the layers fall apart.',
    trigger: { chef: 'skeleton', dish: 'cake', style: '*' },
    tier: 'moderate',
    promptScore: 'funny_fail',
    steps: [
      // SETUP: Bakery scene + narrator
      ...NARRATOR("Chef Skeleton fires up the oven for a fancy cake!"),
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'cs-center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'cs-right' },
          { action: 'spawn', asset: 'stand_mixer', position: 'cs-left' },
          { action: 'spawn', asset: 'mixing_bowl', position: 'cs-right' },
          { action: 'spawn', asset: 'whisk', position: 'cs-right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [{ action: 'sfx', sound: 'cooking' }], delayAfter: 0.3 },
      ...BOUNCE_ENTRANCE('skeleton_warrior', 'cs-left', 'left'),

      // INTENT: Baking a masterpiece
      ...CHARACTER_SPEAK('skeleton_warrior', 'excited', "I'll bake the TALLEST, most beautiful cake!"),
      ...WALK_TO('skeleton_warrior', 'cs-right'),
      { parallel: [
        { action: 'react', effect: 'fire', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.3 },

      // ACTION: Baking the cake
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'cast_spell' },
        { action: 'react', effect: 'fire', position: 'cs-center' },
      ], delayAfter: 0.6 },
      ...OBJECT_GROW_REVEAL('cake_giant', 'cs-center'),
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.4 },

      // CONSEQUENCE: Bones rattle, cake collapses!
      ...EMOTIONAL_REACT('skeleton_warrior', 'excited', 'cs-left'),
      { parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'get_hit' },
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-center' },
        { action: 'camera_shake', intensity: 0.6, duration: 0.5 },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.5 },
      ...CHARACTER_EXCLAIM('skeleton_warrior', 'shocked', "My bones are rattling! The cake!"),

      // RESOLUTION: Cake disaster
      { parallel: [
        { action: 'react', effect: 'dust', position: 'cs-center' },
        { action: 'sfx', sound: 'impact' },
      ], delayAfter: 0.4 },
      ...CROWD_GASP([]),
      ...DISAPPOINTMENT(['skeleton_warrior']),
      ...NARRATOR("The skeleton's bones rattled with excitement and shook the cake apart! Delicate baking needs steady hands!"),
    ],
    feedback: { title: 'Rattle Cake!', message: "The skeleton's bones rattled so hard the cake layers FELL APART! Maybe less shaking next time?", skillTaught: 'Specificity', tip: 'Skeleton chefs vibrate when excited (not great for delicate baking).' },
  },
  {
    id: 'sp_skeleton_mystery',
    description: 'Skeleton tries to cook a mystery dish but forgets what it was making.',
    trigger: { chef: 'skeleton', dish: 'mystery', style: '*' },
    tier: 'subtle',
    promptScore: 'partial',
    steps: [
      // SETUP: Mysterious kitchen + narrator
      ...NARRATOR("Chef Skeleton is about to cook... something mysterious!"),
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'cs-center' },
          { action: 'spawn', asset: 'pot', position: 'cs-left' },
          { action: 'spawn', asset: 'spatula', position: 'cs-right' },
          { action: 'spawn', asset: 'knife_block', position: 'cs-left' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [{ action: 'sfx', sound: 'cooking' }], delayAfter: 0.3 },
      ...ENTER_FROM_LEFT('skeleton_warrior'),
      ...WALK_TO('skeleton_warrior', 'cs-center'),

      // INTENT: What was the recipe?
      ...CHARACTER_THINK('skeleton_warrior', 'thinking'),
      ...CHARACTER_SPEAK('skeleton_warrior', 'annoyed', "Wait... what was I supposed to make again?"),
      { parallel: [
        { action: 'react', effect: 'question-marks', position: 'cs-center' },
        { action: 'sfx', sound: 'chop' },
      ], delayAfter: 0.3 },

      // ACTION: Trying to remember
      { parallel: [{ action: 'animate', character: 'skeleton_warrior', anim: 'interact' }], delayAfter: 0.5 },
      { parallel: [{ action: 'react', effect: 'question-marks', position: 'cs-center' }], delayAfter: 0.4 },

      // CONSEQUENCE: No brain = no memory!
      ...EMOTIONAL_REACT('skeleton_warrior', 'annoyed', 'cs-left'),
      ...CHARACTER_EXCLAIM('skeleton_warrior', 'shocked', "I can't remember! I have NO BRAIN!"),
      ...DRAMATIC_PAUSE(),

      // RESOLUTION: Mystery potion appears
      ...OBJECT_GROW_REVEAL('potion_mystery', 'cs-center'),
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.4 },
      ...CROWD_GASP([]),
      ...DISAPPOINTMENT(['skeleton_warrior']),
      ...NARRATOR("Skeletons have no brains! Without memory, mystery dishes are impossible. Be specific!"),
    ],
    feedback: { title: 'Bonehead Chef!', message: "The skeleton forgot what it was cooking! Skeletons have no brains, remember? Pick a specific dish!", skillTaught: 'Specificity', tip: 'Mystery dishes need specific chefs with good memory!' },
  },
];

// ─── CLOWN CHEF VIGNETTES (5 dishes) ───────────────────────────────────────

const CLOWN_VIGNETTES: Vignette[] = [
  {
    id: 'sp_clown_pizza',
    description: 'Clown spins pizza dough and throws it like a frisbee across the kitchen.',
    trigger: { chef: 'clown', dish: 'pizza', style: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      // SETUP: Kitchen scene + narrator
      ...NARRATOR("Chef Clown bounces into the pizzeria with circus energy!"),
      {
        parallel: [
          { action: 'spawn', asset: 'stove', position: 'cs-center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'cs-left' },
          { action: 'spawn', asset: 'pizza_box', position: 'cs-right' },
          { action: 'spawn', asset: 'dough_roller', position: 'cs-left' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [{ action: 'sfx', sound: 'cooking' }], delayAfter: 0.3 },
      ...CHARGE_IN_LEFT('clown'),
      ...JUMP_TO('clown', 'cs-left'),

      // INTENT: Clown announces the plan
      ...CHARACTER_SPEAK('clown', 'mischievous', "Watch me spin this dough like a FRISBEE!"),
      { parallel: [{ action: 'sfx', sound: 'whoosh' }], delayAfter: 0.3 },

      // ACTION: Spinning and throwing
      ...RUN_TO('clown', 'cs-center'),
      { parallel: [{ action: 'animate', character: 'clown', anim: 'throw' }], delayAfter: 0.5 },
      ...IMPACT(),
      { parallel: [
        { action: 'camera_shake', intensity: 0.5, duration: 0.8 },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.4 },

      // CONSEQUENCE: Pizza rains everywhere!
      ...OBJECT_RAIN('pizza_slice', 8, 'wide'),
      ...EMOTIONAL_REACT('clown', 'triumphant', 'cs-left'),
      ...CHARACTER_EXCLAIM('clown', 'shocked', "It's RAINING PIZZA!"),

      // RESOLUTION: Clown celebrates chaos
      ...CROWD_CHEER([]),
      ...DANCE('clown'),
      ...CELEBRATION(['clown']),
      { parallel: [
        { action: 'react', effect: 'laugh-tears', position: 'cs-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.4 },
      ...NARRATOR("The clown turned dough-tossing into a PIZZA EXPLOSION! That's circus cooking!"),
    ],
    feedback: { title: 'Frisbee Pizza!', message: "The clown turned pizza dough into a FLYING DISC! It's raining pizza slices everywhere!", skillTaught: 'Specificity', tip: 'Clowns turn cooking into a circus act!' },
  },
  {
    id: 'sp_clown_pepperoni',
    description: 'Clown juggles pepperoni slices and they land perfectly on the pizza.',
    trigger: { chef: 'clown', dish: 'pepperoni', style: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // SETUP: Kitchen stage + narrator
      ...NARRATOR("Chef Clown prepares for a juggling performance!"),
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'cs-center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'cs-right' },
          { action: 'spawn', asset: 'pizza_pepperoni', position: 'cs-center' },
          { action: 'spawn', asset: 'bacon_fmp', position: 'cs-left' },
          { action: 'spawn', asset: 'sausage', position: 'cs-right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [{ action: 'sfx', sound: 'cooking' }], delayAfter: 0.3 },
      ...DROP_IN('clown'),
      ...WALK_TO('clown', 'cs-center'),

      // INTENT: The juggling act begins
      ...CHARACTER_SPEAK('clown', 'excited', "Ladies and gentlemen... PEPPERONI JUGGLING!"),
      ...OBJECT_DROP('dough_ball', 'cs-right'),
      { parallel: [{ action: 'sfx', sound: 'whoosh' }], delayAfter: 0.3 },

      // ACTION: Juggling pepperoni
      ...RUN_TO('clown', 'cs-right'),
      { parallel: [{ action: 'animate', character: 'clown', anim: 'throw' }], delayAfter: 0.6 },
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.4 },

      // CONSEQUENCE: Perfect landing!
      ...OBJECT_GROW_REVEAL('pizza_whole', 'cs-center'),
      { parallel: [
        { action: 'react', effect: 'hearts-float', position: 'cs-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.4 },
      ...EMOTIONAL_REACT('clown', 'triumphant', 'cs-left'),
      ...CHARACTER_EXCLAIM('clown', 'shocked', "Perfect pattern! Every pepperoni in place!"),

      // RESOLUTION: The crowd goes wild
      ...CROWD_CHEER([]),
      ...DANCE('clown'),
      ...CELEBRATION(['clown']),
      ...NARRATOR("The clown juggled every topping perfectly! That's what happens when cooking meets circus!"),
    ],
    feedback: { title: 'Juggle-roni!', message: "The clown JUGGLED all the pepperoni and they landed in a perfect pattern! That's skill!", skillTaught: 'Specificity', tip: 'Clowns make everything a performance!' },
  },
  {
    id: 'sp_clown_pasta',
    description: 'Clown makes pasta and gets it tangled into balloon animals.',
    trigger: { chef: 'clown', dish: 'pasta', style: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      // SETUP: Kitchen scene + narrator
      ...NARRATOR("Chef Clown approaches the pasta station!"),
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'cs-center' },
          { action: 'spawn', asset: 'frying_pan', position: 'cs-right' },
          { action: 'spawn', asset: 'cheese', position: 'cs-left' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [
        { action: 'react', effect: 'steam', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.3 },
      ...CHARGE_IN_LEFT('clown'),
      ...RUN_TO('clown', 'cs-center'),

      // INTENT: Balloon animals from noodles?
      ...CHARACTER_SPEAK('clown', 'mischievous', "These noodles look like balloon-making material!"),
      { parallel: [{ action: 'sfx', sound: 'chop' }], delayAfter: 0.3 },

      // ACTION: Twisting noodles
      { parallel: [
        { action: 'animate', character: 'clown', anim: 'cast_long' },
        { action: 'react', effect: 'steam', position: 'cs-center' },
      ], delayAfter: 0.6 },

      // CONSEQUENCE: Balloon animals appear!
      ...IMPACT(),
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.4 },
      ...JUMP_TO('clown', 'cs-left'),
      ...EMOTIONAL_REACT('clown', 'proud', 'cs-left'),
      ...CHARACTER_EXCLAIM('clown', 'shocked', "Behold! Edible balloon noodle animals!"),

      // RESOLUTION: Art or food?
      ...CROWD_CHEER([]),
      ...DANCE('clown'),
      ...CELEBRATION(['clown']),
      { parallel: [
        { action: 'react', effect: 'stars-spin', position: 'cs-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.4 },
      ...NARRATOR("The clown turned pasta into balloon animals! Edible? Yes. Normal? Not even close!"),
    ],
    feedback: { title: 'Balloon Noodles!', message: "The clown twisted pasta into BALLOON ANIMALS! Edible art? Sure, why not!", skillTaught: 'Specificity', tip: 'Clowns cannot resist making shapes out of everything!' },
  },
  {
    id: 'sp_clown_soup',
    description: 'Clown makes soup but honks a horn into it for flavor.',
    trigger: { chef: 'clown', dish: 'soup', style: '*' },
    tier: 'moderate',
    promptScore: 'chaotic',
    steps: [
      // SETUP: Soup kitchen + narrator
      ...NARRATOR("Chef Clown prepares a special soup recipe!"),
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'cs-center' },
          { action: 'spawn', asset: 'pot', position: 'cs-left' },
          { action: 'spawn', asset: 'corn', position: 'cs-right' },
          { action: 'spawn', asset: 'pepper', position: 'cs-right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [
        { action: 'react', effect: 'steam', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.3 },
      ...DROP_IN('clown'),
      ...BOUNCE_ENTRANCE('clown', 'cs-center', 'left'),

      // INTENT: Soup needs special seasoning
      ...CHARACTER_SPEAK('clown', 'mischievous', "This soup needs my SECRET ingredient!"),
      { parallel: [{ action: 'sfx', sound: 'cooking' }], delayAfter: 0.3 },

      // ACTION: Adding honks!
      ...WALK_TO('clown', 'cs-left'),
      { parallel: [
        { action: 'animate', character: 'clown', anim: 'interact' },
        { action: 'react', effect: 'steam', position: 'cs-center' },
      ], delayAfter: 0.5 },
      ...RUN_TO('clown', 'cs-center'),
      { parallel: [
        { action: 'animate', character: 'clown', anim: 'throw' },
        { action: 'sfx', sound: 'chop' },
      ], delayAfter: 0.4 },

      // CONSEQUENCE: HONK HONK!
      ...IMPACT(),
      ...EMOTIONAL_REACT('clown', 'mischievous', 'cs-left'),
      ...CHARACTER_EXCLAIM('clown', 'shocked', "HONK HONK! The perfect seasoning!"),

      // RESOLUTION: Honk soup complete
      { parallel: [
        { action: 'react', effect: 'laugh-tears', position: 'cs-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.4 },
      ...CROWD_GASP([]),
      ...CELEBRATION(['clown']),
      ...NARRATOR("The clown honked INTO the soup! Clown cuisine uses very... unusual spices!"),
    ],
    feedback: { title: 'Honk Soup!', message: "The clown HONKED into the soup pot! Does it taste like honks? We'll never know!", skillTaught: 'Specificity', tip: 'Clowns add... unusual seasonings to their dishes.' },
  },
  {
    id: 'sp_clown_cake',
    description: 'Clown bakes a cake but it has a PIE inside as a surprise filling.',
    trigger: { chef: 'clown', dish: 'cake', style: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      // SETUP: Bakery scene + narrator
      ...NARRATOR("Chef Clown prepares a cake with a BIG surprise!"),
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'cs-center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'cs-right' },
          { action: 'spawn', asset: 'bread_oven', position: 'cs-left' },
          { action: 'spawn', asset: 'toaster', position: 'cs-right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [{ action: 'sfx', sound: 'cooking' }], delayAfter: 0.3 },
      ...DROP_IN('clown'),
      ...JUMP_TO('clown', 'cs-right'),

      // INTENT: Secret surprise inside
      ...CHARACTER_SPEAK('clown', 'mischievous', "This cake will have a SURPRISE inside!"),
      { parallel: [
        { action: 'react', effect: 'fire', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.3 },

      // ACTION: Baking with hidden pie
      ...RUN_TO('clown', 'cs-center'),
      { parallel: [
        { action: 'animate', character: 'clown', anim: 'cast_spell' },
        { action: 'react', effect: 'fire', position: 'cs-center' },
      ], delayAfter: 0.6 },
      ...OBJECT_GROW_REVEAL('cake_giant', 'cs-center'),
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.4 },

      // CONSEQUENCE: PIE REVEAL!
      ...IMPACT(),
      { parallel: [
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-center' },
        { action: 'camera_shake', intensity: 0.5, duration: 0.5 },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.4 },
      ...EMOTIONAL_REACT('clown', 'triumphant', 'cs-left'),
      ...CHARACTER_EXCLAIM('clown', 'shocked', "SURPRISE! A PIE baked INSIDE the cake!"),

      // RESOLUTION: Dessert inception!
      ...CROWD_CHEER([]),
      ...DANCE('clown'),
      ...CELEBRATION(['clown']),
      ...NARRATOR("The clown hid a pie inside a cake! Double dessert means double fun!"),
    ],
    feedback: { title: 'Pie-Cake!', message: "The clown baked a PIE INSIDE THE CAKE! It's a dessert inside a dessert! Genius or chaos?", skillTaught: 'Specificity', tip: 'Clown cooking is full of surprises (and pranks)!' },
  },
  {
    id: 'sp_clown_mystery',
    description: 'Clown makes a mystery dish that turns out to be a prank pie that explodes in confetti.',
    trigger: { chef: 'clown', dish: 'mystery', style: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      // SETUP: Kitchen scene + narrator
      ...NARRATOR("Chef Clown is cooking something mysterious!"),
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'cs-center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'cs-left' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [{ action: 'sfx', sound: 'cooking' }], delayAfter: 0.3 },
      ...CHARGE_IN_LEFT('clown'),
      ...JUMP_TO('clown', 'cs-center'),

      // INTENT: Mystery prank time
      ...CHARACTER_SPEAK('clown', 'mischievous', "Let's make the ULTIMATE mystery dish!"),
      { parallel: [
        { action: 'react', effect: 'question-marks', position: 'cs-center' },
        { action: 'sfx', sound: 'chop' },
      ], delayAfter: 0.3 },

      // ACTION: Creating mystery pie
      ...WALK_TO('clown', 'cs-left'),
      { parallel: [{ action: 'animate', character: 'clown', anim: 'interact' }], delayAfter: 0.5 },
      ...OBJECT_GROW_REVEAL('pie', 'cs-center'),
      ...JUMP_TO('clown', 'cs-right'),
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'cooking' },
      ], delayAfter: 0.4 },

      // CONSEQUENCE: CONFETTI EXPLOSION!
      ...IMPACT(),
      { parallel: [
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-center' },
        { action: 'react', effect: 'confetti-burst', position: 'cs-center' },
        { action: 'camera_shake', intensity: 0.6, duration: 0.6 },
        { action: 'sfx', sound: 'explosion' },
      ], delayAfter: 0.5 },
      ...EMOTIONAL_REACT('clown', 'triumphant', 'cs-left'),
      ...CHARACTER_EXCLAIM('clown', 'shocked', "SURPRISE! It's a CONFETTI PRANK PIE!"),

      // RESOLUTION: The ultimate prank
      ...CROWD_CHEER([]),
      ...CELEBRATION(['clown']),
      { parallel: [
        { action: 'react', effect: 'laugh-tears', position: 'cs-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.4 },
      ...NARRATOR("The clown made a prank pie full of confetti! Clowns LOVE mystery dishes for hiding pranks!"),
    ],
    feedback: { title: 'Prank Pie!', message: "The clown made a PRANK PIE that explodes in confetti! It was a surprise... but not edible!", skillTaught: 'Specificity', tip: 'Clowns love mystery dishes because they can hide pranks!' },
  },
];

// ─── SUPERHERO CHEF VIGNETTES (5 dishes) ───────────────────────────────────

const SUPERHERO_VIGNETTES: Vignette[] = [
  {
    id: 'sp_superhero_pizza',
    description: 'Superhero uses super-speed to spin pizza dough faster than sound.',
    trigger: { chef: 'superhero', dish: 'pizza', style: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // SETUP: Kitchen scene + narrator
      ...NARRATOR("Captain Cuisine arrives with super-speed!"),
      {
        parallel: [
          { action: 'spawn', asset: 'stove', position: 'cs-center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'cs-left' },
          { action: 'spawn', asset: 'display_case', position: 'cs-right' },
          { action: 'spawn', asset: 'pizza_cheese', position: 'cs-right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      { parallel: [{ action: 'sfx', sound: 'cooking' }], delayAfter: 0.3 },
      ...TELEPORT_IN('superhero'),
      { parallel: [
        { action: 'react', effect: 'explosion-cartoon', position: 'cs-left' },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.3 },
      ...RUN_TO('superhero', 'cs-center'),

      // INTENT: Super-speed dough toss
      ...CHARACTER_SPEAK('superhero', 'proud', "Time to use SUPER-SPEED on this dough!"),
      ...OBJECT_GROW_REVEAL('dough_ball', 'cs-center'),

      // ACTION: Spinning faster than sound
      { parallel: [
        { action: 'animate', character: 'superhero', anim: 'spin_attack' },
        { action: 'camera_shake', intensity: 0.7, duration: 0.8 },
        { action: 'sfx', sound: 'whoosh' },
      ], delayAfter: 0.6 },
      ...IMPACT(),
      { parallel: [{ action: 'screen_flash', color: 'gold', duration: 0.2 }], delayAfter: 0.2 },

      // CONSEQUENCE: Instant perfect pizza!
      ...OBJECT_GROW_REVEAL('pizza_whole', 'cs-center'),
      { parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'bell' },
      ], delayAfter: 0.4 },
      ...EMOTIONAL_REACT('superhero', 'triumphant', 'cs-left'),
      ...CHARACTER_EXCLAIM('superhero', 'shocked', "Done in 0.5 seconds! Super-speed works!"),

      // RESOLUTION: Superhero efficiency
      ...CROWD_CHEER([]),
      ...DANCE('superhero'),
      ...CELEBRATION(['superhero']),
      { parallel: [{ action: 'react', effect: 'glow-pulse', position: 'cs-center' }], delayAfter: 0.3 },
      ...NARRATOR("The dough spun so fast it cooked from friction! That's superhero physics!"),
    ],
    feedback: { title: 'Super-Speed Pizza!', message: "The superhero spun the dough SO FAST it cooked instantly! That's the power of super-speed!", skillTaught: 'Specificity', tip: 'Superhero chefs use their powers to cook faster than anyone!' },
  },
  {
    id: 'sp_superhero_pepperoni',
    description: 'Superhero uses laser vision to perfectly arrange pepperoni.',
    trigger: { chef: 'superhero', dish: 'pepperoni', style: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'oven', position: 'cs-center' }, { action: 'spawn', asset: 'table_kitchen', position: 'cs-right' }, { action: 'spawn', asset: 'pineapple_fmp', position: 'cs-left' }, { action: 'spawn', asset: 'broccoli_fmp', position: 'cs-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'superhero', position: 'off-left', anim: 'spawn_air' }, { action: 'emote', character: 'superhero', emoji: '👁️' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'superhero', anim: 'cast_spell' }, { action: 'react', effect: 'fire', position: 'cs-center' }, { action: 'text_popup', text: '👁️ LASER VISION! 👁️', position: 'top', size: 'huge' }], delayAfter: 0.6 },
      { parallel: [{ action: 'spawn', asset: 'pizza_whole', position: 'cs-center' }, { action: 'react', effect: 'sparkle-magic', position: 'cs-center' }], delayAfter: 0.5 },
      { parallel: [{ action: 'animate', character: 'superhero', anim: 'taunt' }, { action: 'react', effect: 'stars-spin', position: 'cs-center' }, { action: 'text_popup', text: '🍕 PERFECT PATTERN! 🍕', position: 'center', size: 'huge' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '👁️ Laser Pepperoni!', message: "The superhero used LASER VISION to place each pepperoni with perfect aim! Perfect!", skillTaught: 'Specificity', tip: 'Superhero precision = perfect cooking every time!' },
  },
  {
    id: 'sp_superhero_pasta',
    description: 'Superhero lifts a giant pot of pasta with super-strength.',
    trigger: { chef: 'superhero', dish: 'pasta', style: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'cauldron', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'superhero', position: 'off-left', anim: 'spawn_air' }, { action: 'emote', character: 'superhero', emoji: 'heroic' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'superhero', anim: 'cast_long' }, { action: 'react', effect: 'steam', position: 'cs-center' }, { action: 'text_popup', text: '💪 SUPER STRENGTH STIR! 💪', position: 'top', size: 'huge' }], delayAfter: 0.6 },
      { parallel: [{ action: 'animate', character: 'superhero', anim: 'jump_idle' }, { action: 'camera_shake', intensity: 0.6, duration: 0.8 }, { action: 'text_popup', text: '🍝 LIFTING THE WHOLE POT! 🍝', position: 'center', size: 'huge' }], delayAfter: 0.5 },
      { parallel: [{ action: 'animate', character: 'superhero', anim: 'jump_big' }, { action: 'react', effect: 'hearts-float', position: 'cs-center' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '💪 Super-Pasta!', message: "The superhero lifted the ENTIRE CAULDRON with one hand! That's super-strength cooking!", skillTaught: 'Specificity', tip: 'Superhero strength = no task is too heavy!' },
  },
  {
    id: 'sp_superhero_soup',
    description: 'Superhero uses super-breath to cool down boiling soup instantly.',
    trigger: { chef: 'superhero', dish: 'soup', style: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'cauldron', position: 'cs-center' }, { action: 'spawn', asset: 'pot', position: 'cs-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'superhero', position: 'off-left', anim: 'spawn_air' }, { action: 'emote', character: 'superhero', emoji: '💨' }], delayAfter: 0.4 },
      { parallel: [{ action: 'react', effect: 'fire', position: 'cs-center' }, { action: 'text_popup', text: '🔥 BOILING HOT! 🔥', position: 'top', size: 'large' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'superhero', anim: 'cast_spell' }, { action: 'react', effect: 'snowflakes', position: 'cs-center' }, { action: 'text_popup', text: '💨 SUPER BREATH! 💨', position: 'center', size: 'huge' }], delayAfter: 0.6 },
      { parallel: [{ action: 'animate', character: 'superhero', anim: 'Cheering' }, { action: 'react', effect: 'sparkle-magic', position: 'cs-center' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '💨 Super-Breath Soup!', message: "The superhero blew on the soup with SUPER-BREATH and cooled it instantly! Perfect temperature!", skillTaught: 'Specificity', tip: 'Superhero breath control = instant temperature adjustment!' },
  },
  {
    id: 'sp_superhero_cake',
    description: 'Superhero flies around the oven at super-speed to bake a cake perfectly.',
    trigger: { chef: 'superhero', dish: 'cake', style: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'oven', position: 'cs-center' }, { action: 'spawn', asset: 'table_kitchen', position: 'cs-right' }, { action: 'spawn', asset: 'pickup_truck', position: 'us-right' }, { action: 'spawn', asset: 'cheddar', position: 'cs-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'superhero', position: 'off-left', anim: 'spawn_air' }, { action: 'emote', character: 'superhero', emoji: 'heroic' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'superhero', anim: 'jump_idle' }, { action: 'text_popup', text: '🦸 FLYING AROUND! 🦸', position: 'top', size: 'huge' }, { action: 'camera_shake', intensity: 0.5, duration: 0.8 }], delayAfter: 0.6 },
      { parallel: [{ action: 'react', effect: 'fire', position: 'cs-center' }, { action: 'spawn', asset: 'cake_giant', position: 'cs-center' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'superhero', anim: 'wave' }, { action: 'react', effect: 'stars-spin', position: 'cs-center' }, { action: 'text_popup', text: '🎂 PERFECT BAKE! 🎂', position: 'center', size: 'huge' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '🦸 Flight-Baked Cake!', message: "The superhero FLEW around the oven to create perfect heat distribution! That's super-baking!", skillTaught: 'Specificity', tip: 'Superhero flight = even heat for perfect baking!' },
  },
  {
    id: 'sp_superhero_mystery',
    description: 'Superhero uses X-ray vision to see inside a mystery dish and cooks it perfectly.',
    trigger: { chef: 'superhero', dish: 'mystery', style: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'cauldron', position: 'cs-center' }, { action: 'spawn', asset: 'pot', position: 'cs-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'superhero', position: 'off-left', anim: 'spawn_air' }, { action: 'emote', character: 'superhero', emoji: '👁️' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'superhero', anim: 'cast_spell' }, { action: 'react', effect: 'sparkle-magic', position: 'cs-center' }, { action: 'text_popup', text: '👁️ X-RAY VISION! 👁️', position: 'top', size: 'huge' }], delayAfter: 0.6 },
      { parallel: [{ action: 'react', effect: 'glow-pulse', position: 'cs-center' }, { action: 'text_popup', text: '🔍 REVEALING THE MYSTERY! 🔍', position: 'center', size: 'large' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'potion_mystery', position: 'cs-center' }, { action: 'react', effect: 'stars-spin', position: 'cs-center' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'superhero', anim: 'taunt' }, { action: 'react', effect: 'glow-pulse', position: 'cs-center' }, { action: 'text_popup', text: '🦸 MYSTERY SOLVED! 🦸', position: 'center', size: 'huge' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '🔍 X-Ray Chef!', message: "The superhero used X-RAY VISION to see what the mystery dish was! Superpowers solve everything!", skillTaught: 'Specificity', tip: 'Superhero powers can even solve mystery dishes!' },
  },
];

// ─── SURVIVALIST CHEF VIGNETTES (5 dishes) ─────────────────────────────────

const SURVIVALIST_VIGNETTES: Vignette[] = [
  {
    id: 'sp_survivalist_pizza',
    description: 'Survivalist cooks pizza over a campfire using primitive tools.',
    trigger: { chef: 'survivalist', dish: 'pizza', style: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'barrel', position: 'cs-center' }, { action: 'spawn', asset: 'crate', position: 'cs-left' }, { action: 'spawn', asset: 'truck', position: 'us-right' }, { action: 'spawn', asset: 'ham', position: 'cs-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'survivalist', position: 'off-left', anim: 'spawn_ground' }, { action: 'emote', character: 'survivalist', emoji: '🏕️' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'survivalist', anim: 'interact' }, { action: 'react', effect: 'fire', position: 'cs-center' }, { action: 'text_popup', text: '🔥 CAMPFIRE COOKING! 🔥', position: 'top', size: 'large' }], delayAfter: 0.6 },
      { parallel: [{ action: 'react', effect: 'smoke', position: 'cs-center' }, { action: 'text_popup', text: '🍕 PRIMITIVE PIZZA! 🍕', position: 'center', size: 'huge' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'pizza_whole', position: 'cs-center' }, { action: 'react', effect: 'hearts-float', position: 'cs-center' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '🏕️ Campfire Pizza!', message: "The survivalist cooked pizza over a CAMPFIRE! No oven needed, just wilderness skills!", skillTaught: 'Specificity', tip: 'Survivalists use primitive methods for everything!' },
  },
  {
    id: 'sp_survivalist_pepperoni',
    description: 'Survivalist hunts wild pepperoni (somehow) and roasts it on a stick.',
    trigger: { chef: 'survivalist', dish: 'pepperoni', style: '*' },
    tier: 'moderate',
    promptScore: 'chaotic',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'barrel', position: 'cs-center' }, { action: 'spawn', asset: 'cart', position: 'us-left' }, { action: 'spawn', asset: 'olive', position: 'cs-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'survivalist', position: 'off-left', anim: 'spawn_ground' }, { action: 'emote', character: 'survivalist', emoji: '🎯' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'survivalist', anim: 'throw' }, { action: 'text_popup', text: '🎯 HUNTING PEPPERONI! 🎯', position: 'top', size: 'large' }], delayAfter: 0.6 },
      { parallel: [{ action: 'react', effect: 'question-marks', position: 'cs-center' }, { action: 'text_popup', text: '❓ WILD PEPPERONI?! ❓', position: 'center', size: 'huge' }], delayAfter: 0.5 },
      { parallel: [{ action: 'react', effect: 'fire', position: 'cs-center' }, { action: 'spawn', asset: 'pizza_whole', position: 'cs-center' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '🎯 Wild Pepperoni!', message: "The survivalist HUNTED wild pepperoni (somehow) and cooked it! Nature is weird!", skillTaught: 'Specificity', tip: 'Survivalists find ingredients in... creative ways.' },
  },
  {
    id: 'sp_survivalist_pasta',
    description: 'Survivalist makes pasta by weaving wild grass into noodles.',
    trigger: { chef: 'survivalist', dish: 'pasta', style: '*' },
    tier: 'moderate',
    promptScore: 'chaotic',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'cauldron', position: 'cs-center' }, { action: 'spawn', asset: 'garlic', position: 'cs-left' }, { action: 'spawn', asset: 'chili_pepper', position: 'cs-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'survivalist', position: 'off-left', anim: 'spawn_ground' }, { action: 'emote', character: 'survivalist', emoji: '🌾' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'survivalist', anim: 'interact' }, { action: 'text_popup', text: '🌾 WEAVING GRASS! 🌾', position: 'top', size: 'large' }], delayAfter: 0.6 },
      { parallel: [{ action: 'react', effect: 'steam', position: 'cs-center' }, { action: 'text_popup', text: '🍝 GRASS NOODLES?! 🍝', position: 'center', size: 'huge' }], delayAfter: 0.5 },
      { parallel: [{ action: 'react', effect: 'stars-spin', position: 'cs-center' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '🌾 Grass Pasta!', message: "The survivalist wove WILD GRASS into pasta noodles! Is it edible? Probably!", skillTaught: 'Specificity', tip: 'Survivalists improvise with natural ingredients!' },
  },
  {
    id: 'sp_survivalist_soup',
    description: 'Survivalist makes soup by boiling water in a hollowed-out log.',
    trigger: { chef: 'survivalist', dish: 'soup', style: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'barrel', position: 'cs-center' }, { action: 'spawn', asset: 'crate', position: 'cs-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'survivalist', position: 'off-left', anim: 'spawn_ground' }, { action: 'emote', character: 'survivalist', emoji: '🪵' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'survivalist', anim: 'interact' }, { action: 'react', effect: 'fire', position: 'cs-center' }, { action: 'text_popup', text: '🪵 LOG POT SOUP! 🪵', position: 'top', size: 'large' }], delayAfter: 0.6 },
      { parallel: [{ action: 'react', effect: 'steam', position: 'cs-center' }, { action: 'text_popup', text: '🍲 WILDERNESS SOUP! 🍲', position: 'center', size: 'huge' }], delayAfter: 0.5 },
      { parallel: [{ action: 'react', effect: 'sparkle-magic', position: 'cs-center' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '🪵 Log Soup!', message: "The survivalist boiled soup in a HOLLOWED LOG! No pots needed in the wilderness!", skillTaught: 'Specificity', tip: 'Survivalists turn anything into cooking tools!' },
  },
  {
    id: 'sp_survivalist_cake',
    description: 'Survivalist bakes a cake by burying it underground with hot stones.',
    trigger: { chef: 'survivalist', dish: 'cake', style: '*' },
    tier: 'moderate',
    promptScore: 'chaotic',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'barrel', position: 'cs-center' }, { action: 'spawn', asset: 'sack', position: 'cs-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'survivalist', position: 'off-left', anim: 'spawn_ground' }, { action: 'emote', character: 'survivalist', emoji: '🔥' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'survivalist', anim: 'interact' }, { action: 'text_popup', text: '🔥 UNDERGROUND BAKING! 🔥', position: 'top', size: 'large' }], delayAfter: 0.6 },
      { parallel: [{ action: 'react', effect: 'smoke', position: 'cs-center' }, { action: 'text_popup', text: '🎂 BURIED CAKE?! 🎂', position: 'center', size: 'huge' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'cake_giant', position: 'cs-center' }, { action: 'react', effect: 'glow-pulse', position: 'cs-center' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '🔥 Earth-Baked Cake!', message: "The survivalist BURIED the cake with hot stones! Ancient baking techniques work!", skillTaught: 'Specificity', tip: 'Survivalists know every primitive cooking method!' },
  },
  {
    id: 'sp_survivalist_mystery',
    description: 'Survivalist forages for mystery ingredients in the wild and creates an unknown dish.',
    trigger: { chef: 'survivalist', dish: 'mystery', style: '*' },
    tier: 'moderate',
    promptScore: 'chaotic',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'barrel', position: 'cs-center' }, { action: 'spawn', asset: 'crate', position: 'cs-left' }, { action: 'spawn', asset: 'sack', position: 'cs-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'survivalist', position: 'off-left', anim: 'spawn_ground' }, { action: 'emote', character: 'survivalist', emoji: '🌿' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'survivalist', anim: 'interact' }, { action: 'react', effect: 'question-marks', position: 'cs-center' }, { action: 'text_popup', text: '🌿 WILD FORAGING! 🌿', position: 'top', size: 'large' }], delayAfter: 0.6 },
      { parallel: [{ action: 'react', effect: 'fire', position: 'cs-center' }, { action: 'text_popup', text: '❓ MYSTERY STEW! ❓', position: 'center', size: 'huge' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn', asset: 'potion_mystery', position: 'cs-center' }, { action: 'react', effect: 'steam', position: 'cs-center' }], delayAfter: 0.4 },
      { parallel: [{ action: 'emote', character: 'survivalist', emoji: 'confused' }, { action: 'text_popup', text: '🏕️ WILDERNESS SURPRISE! 🏕️', position: 'center', size: 'huge' }, { action: 'sfx', sound: 'partial' }], delayAfter: 1.5 },
    ],
    feedback: { title: '🌿 Wild Mystery!', message: "The survivalist foraged mystery ingredients from the wild! Nobody knows what's in it... but it's edible!", skillTaught: 'Specificity', tip: 'Survivalists make do with whatever nature provides!' },
  },
];

// ─── EVERYONE CHEF VIGNETTES (5 dishes) ────────────────────────────────────

const EVERYONE_VIGNETTES: Vignette[] = [
  {
    id: 'sp_everyone_pizza',
    description: 'All chefs try to cook pizza at once and create total kitchen chaos.',
    trigger: { chef: 'everyone', dish: 'pizza', style: '*' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'stove', position: 'cs-center' }, { action: 'spawn', asset: 'oven', position: 'cs-left' }, { action: 'spawn', asset: 'table_kitchen', position: 'cs-right' }, { action: 'spawn', asset: 'counter_table', position: 'ds-left' }, { action: 'spawn', asset: 'cash_register', position: 'ds-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-left', anim: 'spawn_ground' }, { action: 'spawn_character', character: 'clown', position: 'ds-right', anim: 'spawn_air' }, { action: 'spawn_character', character: 'superhero', position: 'us-left', anim: 'spawn_air' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'skeleton_warrior', anim: 'throw' }, { action: 'animate', character: 'clown', anim: 'throw' }, { action: 'animate', character: 'superhero', anim: 'spin_attack' }, { action: 'text_popup', text: '🍕 TOO MANY CHEFS! 🍕', position: 'top', size: 'huge' }, { action: 'camera_shake', intensity: 0.8, duration: 1.0 }], delayAfter: 0.6 },
      { parallel: [{ action: 'spawn_rain', asset: 'pizza_slice', quantity: 8, position: 'wide' }, { action: 'react', effect: 'explosion-cartoon', position: 'center' }], delayAfter: 0.5 },
      { parallel: [{ action: 'react', effect: 'laugh-tears', position: 'center' }, { action: 'text_popup', text: '🌪️ KITCHEN CHAOS! 🌪️', position: 'center', size: 'huge' }, { action: 'sfx', sound: 'fail' }], delayAfter: 1.5 },
    ],
    feedback: { title: '🌪️ Too Many Chefs!', message: "ALL the chefs tried to cook pizza at once! It's CHAOS! Maybe coordinate next time?", skillTaught: 'Specificity', tip: 'Too many chefs = kitchen chaos! Pick one chef for clearer results!' },
  },
  {
    id: 'sp_everyone_pepperoni',
    description: 'Every chef adds their own style of pepperoni creating a bizarre pizza.',
    trigger: { chef: 'everyone', dish: 'pepperoni', style: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'oven', position: 'cs-center' }, { action: 'spawn', asset: 'table_kitchen', position: 'cs-right' }, { action: 'spawn', asset: 'pizza_food', position: 'cs-center' }, { action: 'spawn', asset: 'sink', position: 'cs-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-left', anim: 'spawn_ground' }, { action: 'spawn_character', character: 'clown', position: 'ds-right', anim: 'spawn_air' }, { action: 'spawn_character', character: 'superhero', position: 'us-left', anim: 'spawn_air' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'skeleton_warrior', anim: 'interact' }, { action: 'animate', character: 'clown', anim: 'throw' }, { action: 'animate', character: 'superhero', anim: 'cast_spell' }, { action: 'text_popup', text: '🍕 EVERYONE ADDING TOPPINGS! 🍕', position: 'top', size: 'large' }], delayAfter: 0.6 },
      { parallel: [{ action: 'spawn', asset: 'pizza_whole', position: 'cs-center' }, { action: 'react', effect: 'question-marks', position: 'cs-center' }, { action: 'text_popup', text: '❓ WEIRD COMBO! ❓', position: 'center', size: 'huge' }], delayAfter: 0.5 },
      { parallel: [{ action: 'react', effect: 'hearts-float', position: 'cs-center' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '🍕 Combo Pizza!', message: "Every chef added their OWN toppings! It's a weird mix but... it works?", skillTaught: 'Specificity', tip: 'Multiple chefs = unpredictable results!' },
  },
  {
    id: 'sp_everyone_pasta',
    description: 'All chefs stir the pasta pot together and make a giant whirlpool.',
    trigger: { chef: 'everyone', dish: 'pasta', style: '*' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'cauldron', position: 'cs-center' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-left', anim: 'spawn_ground' }, { action: 'spawn_character', character: 'clown', position: 'ds-right', anim: 'spawn_air' }, { action: 'spawn_character', character: 'superhero', position: 'us-left', anim: 'spawn_air' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'skeleton_warrior', anim: 'cast_spell' }, { action: 'animate', character: 'clown', anim: 'cast_long' }, { action: 'animate', character: 'superhero', anim: 'spin_attack' }, { action: 'text_popup', text: '🌊 EVERYONE STIRRING! 🌊', position: 'top', size: 'huge' }], delayAfter: 0.6 },
      { parallel: [{ action: 'react', effect: 'splash', position: 'cs-center' }, { action: 'camera_shake', intensity: 0.7, duration: 0.8 }, { action: 'text_popup', text: '🌀 PASTA WHIRLPOOL! 🌀', position: 'center', size: 'huge' }], delayAfter: 0.5 },
      { parallel: [{ action: 'react', effect: 'stars-spin', position: 'cs-center' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '🌀 Pasta Whirlpool!', message: "All the chefs stirred together and made a PASTA TORNADO! Teamwork... sort of!", skillTaught: 'Specificity', tip: 'Everyone working together = big effects (and big mess)!' },
  },
  {
    id: 'sp_everyone_soup',
    description: 'Each chef adds their own weird ingredient to the soup creating mystery flavor.',
    trigger: { chef: 'everyone', dish: 'soup', style: '*' },
    tier: 'moderate',
    promptScore: 'chaotic',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'cauldron', position: 'cs-center' }, { action: 'spawn', asset: 'pot', position: 'cs-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-left', anim: 'spawn_ground' }, { action: 'spawn_character', character: 'clown', position: 'ds-right', anim: 'spawn_air' }, { action: 'spawn_character', character: 'survivalist', position: 'us-left', anim: 'spawn_ground' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'skeleton_warrior', anim: 'throw' }, { action: 'animate', character: 'clown', anim: 'throw' }, { action: 'animate', character: 'survivalist', anim: 'throw' }, { action: 'text_popup', text: '🍲 EVERYONE ADDING STUFF! 🍲', position: 'top', size: 'large' }], delayAfter: 0.6 },
      { parallel: [{ action: 'react', effect: 'steam', position: 'cs-center' }, { action: 'react', effect: 'question-marks', position: 'cs-center' }, { action: 'text_popup', text: '❓ MYSTERY SOUP! ❓', position: 'center', size: 'huge' }], delayAfter: 0.5 },
      { parallel: [{ action: 'react', effect: 'sparkle-magic', position: 'cs-center' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '❓ Mystery Soup!', message: "Every chef added something DIFFERENT! Nobody knows what's in this soup!", skillTaught: 'Specificity', tip: 'Too many ingredients = mystery flavor!' },
  },
  {
    id: 'sp_everyone_cake',
    description: 'All chefs bake cake layers separately then stack them into a giant tower.',
    trigger: { chef: 'everyone', dish: 'cake', style: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'oven', position: 'cs-center' }, { action: 'spawn', asset: 'table_kitchen', position: 'cs-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-left', anim: 'spawn_ground' }, { action: 'spawn_character', character: 'clown', position: 'ds-right', anim: 'spawn_air' }, { action: 'spawn_character', character: 'superhero', position: 'us-left', anim: 'spawn_air' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'skeleton_warrior', anim: 'interact' }, { action: 'animate', character: 'clown', anim: 'cast_spell' }, { action: 'animate', character: 'superhero', anim: 'cast_long' }, { action: 'react', effect: 'fire', position: 'cs-center' }, { action: 'text_popup', text: '🎂 TEAM BAKING! 🎂', position: 'top', size: 'large' }], delayAfter: 0.6 },
      { parallel: [{ action: 'spawn_rain', asset: 'cake_giant', quantity: 5, position: 'center' }, { action: 'text_popup', text: '🏔️ CAKE TOWER! 🏔️', position: 'center', size: 'huge' }], delayAfter: 0.5 },
      { parallel: [{ action: 'animate', character: 'skeleton_warrior', anim: 'Cheering' }, { action: 'animate', character: 'clown', anim: 'wave' }, { action: 'animate', character: 'superhero', anim: 'jump_big' }, { action: 'react', effect: 'glow-pulse', position: 'cs-center' }, { action: 'sfx', sound: 'success' }], delayAfter: 1.5 },
    ],
    feedback: { title: '🏔️ Cake Tower!', message: "Every chef made a layer and STACKED them! It's a giant cake tower! Perfect teamwork!", skillTaught: 'Specificity', tip: 'Everyone working together can create something HUGE!' },
  },
  {
    id: 'sp_everyone_mystery',
    description: 'All chefs cook mystery dishes at once creating complete kitchen chaos.',
    trigger: { chef: 'everyone', dish: 'mystery', style: '*' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      { parallel: [{ action: 'spawn', asset: 'stove', position: 'cs-center' }, { action: 'spawn', asset: 'oven', position: 'cs-left' }, { action: 'spawn', asset: 'cauldron', position: 'cs-right' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.5 },
      { parallel: [{ action: 'spawn_character', character: 'skeleton_warrior', position: 'ds-left', anim: 'spawn_ground' }, { action: 'spawn_character', character: 'clown', position: 'ds-right', anim: 'spawn_air' }, { action: 'spawn_character', character: 'superhero', position: 'us-left', anim: 'spawn_air' }, { action: 'spawn_character', character: 'survivalist', position: 'us-right', anim: 'spawn_ground' }], delayAfter: 0.4 },
      { parallel: [{ action: 'animate', character: 'skeleton_warrior', anim: 'interact' }, { action: 'animate', character: 'clown', anim: 'throw' }, { action: 'animate', character: 'superhero', anim: 'cast_spell' }, { action: 'animate', character: 'survivalist', anim: 'interact' }, { action: 'react', effect: 'question-marks', position: 'wide' }, { action: 'text_popup', text: '❓ EVERYONE COOKING MYSTERY! ❓', position: 'top', size: 'huge' }], delayAfter: 0.6 },
      { parallel: [{ action: 'react', effect: 'explosion-cartoon', position: 'cs-center' }, { action: 'react', effect: 'smoke', position: 'cs-left' }, { action: 'react', effect: 'fire', position: 'cs-right' }, { action: 'camera_shake', intensity: 0.9, duration: 1.2 }], delayAfter: 0.8 },
      { parallel: [{ action: 'spawn_rain', asset: 'potion_mystery', quantity: 8, position: 'wide' }, { action: 'text_popup', text: '🌪️ TOTAL MYSTERY CHAOS! 🌪️', position: 'center', size: 'huge' }], delayAfter: 0.5 },
      { parallel: [{ action: 'react', effect: 'laugh-tears', position: 'center' }, { action: 'text_popup', text: '❓ NOBODY KNOWS WHAT HAPPENED! ❓', position: 'center', size: 'huge' }, { action: 'sfx', sound: 'fail' }], delayAfter: 1.5 },
    ],
    feedback: { title: '❓ Mystery Chaos!', message: "ALL chefs made MYSTERY dishes! The kitchen is total chaos! Nobody knows what ANY of it is!", skillTaught: 'Specificity', tip: 'Everyone + mystery = maximum chaos! Pick specific chefs and dishes!' },
  },
];

// ─── PAIR VIGNETTES (already exist, keeping them) ──────────────────────────

const PAIR_VIGNETTES: Vignette[] = [
  ...SKELETON_VIGNETTES,
  ...CLOWN_VIGNETTES,
  ...SUPERHERO_VIGNETTES,
  ...SURVIVALIST_VIGNETTES,
  ...EVERYONE_VIGNETTES,
];

export const SKELETON_PIZZA_STAGE_1: Vignette[] = PAIR_VIGNETTES;

// ─── DEFAULT VIGNETTE (always works) ────────────────────────────────────────

export const SKELETON_PIZZA_DEFAULT: Vignette = {
  id: 'skeleton_pizza_default',
  description: 'A skeleton walks across the kitchen, grabs a pizza, and starts cooking.',
  trigger: { chef: '*', dish: '*', style: '*' },
  tier: 'subtle',
  promptScore: 'partial',
  steps: [
    // Kitchen props
    {
      parallel: [
        { action: 'spawn', asset: 'stove', position: 'us-center' },
        { action: 'spawn', asset: 'pot', position: 'us-left' },
        { action: 'sfx', sound: 'spawn' },
      ],
      delayAfter: 0.5,
    },
    // Skeleton crosses the kitchen left-to-right, stops at stove
    { parallel: [{ action: 'spawn_character', character: 'skeleton_warrior', position: 'off-left' }, { action: 'sfx', sound: 'spawn' }], delayAfter: 0.2 },
    { parallel: [{ action: 'move', character: 'skeleton_warrior', to: 'cs-center', style: 'linear' }], delayAfter: 0.3 },
    { parallel: [{ action: 'emote', character: 'skeleton_warrior', emoji: '👨‍🍳' }], delayAfter: 0.5 },
    { parallel: [{ action: 'move', character: 'skeleton_warrior', to: 'cs-center', style: 'linear' }], delayAfter: 0.3 },
    // Skeleton cooks
    {
      parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'interact' },
        { action: 'spawn', asset: 'pizza', position: 'cs-center' },
        { action: 'sfx', sound: 'success' },
        { action: 'text_popup', text: '🍕 COOKING! 🍕', position: 'center', size: 'large' },
      ],
      delayAfter: 2.0,
    },
  ],
  feedback: {
    title: '🍳 Kitchen Time!',
    message: "Someone cooked something! But WHO was the chef? WHAT did they cook? HOW did they cook it? Fill in the details!",
    skillTaught: 'Specificity',
    tip: "Try picking a chef, a dish, and a cooking style. Each detail makes it better!",
  },
};

// ─── STAGE 2 VIGNETTES ──────────────────────────────────────────────────────

export const SKELETON_PIZZA_STAGE_2: Vignette[] = [

  // ── COLD: skeleton + pizza + cold + single ──────────────────────────────────
  {
    id: 'sp2_cold_frozen_confusion',
    description: 'Skeleton tries to cook a pizza at cold temperature and ends up with a frozen disaster.',
    trigger: { chef: 'skeleton', dish: 'pizza', heat: 'cold', amount: 'single' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'stove', position: 'center' },
          { action: 'spawn', asset: 'fridge', position: 'left' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'skeleton_warrior', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'skeleton_warrior', emoji: '👨‍🍳' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'cast_spell' },
          { action: 'react', effect: 'snowflakes', position: 'center' },
          { action: 'text_popup', text: '❄️ COLD COOKING? ❄️', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'pizza_whole', position: 'center' },
          { action: 'react', effect: 'snowflakes', position: 'center' },
          { action: 'sfx', sound: 'partial' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'idle' },
          { action: 'emote', character: 'skeleton_warrior', emoji: 'thinking' },
          { action: 'text_popup', text: '🧊 FROZEN SOLID! 🧊', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '❄️ Ice Pizza?',
      message: "Cold temperature = frozen food! Try 'warm' or 'blazing' instead of 'cold' for actual cooking.",
      skillTaught: 'Specificity',
      tip: "Temperature matters! Cold freezes, warm cooks normally, blazing makes it dramatic!",
      vagueComparison: {
        vagueInput: "Cook a dish",
        vagueResult: "Someone cooks... but is it hot or cold? Who knows!",
      },
    },
  },

  // ── COLD: clown + cake + cold + mountain ────────────────────────────────────
  {
    id: 'sp2_cold_ice_sculpture',
    description: 'Clown creates a mountain of frozen cake that turns into an ice sculpture.',
    trigger: { chef: 'clown', dish: 'cake', heat: 'cold', amount: 'mountain' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'fridge', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'clown', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'clown', emoji: 'silly' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'cast_long' },
          { action: 'react', effect: 'snowflakes', position: 'center' },
          { action: 'text_popup', text: '🏔️ MOUNTAIN OF CAKE! 🏔️', position: 'top', size: 'huge' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'cake_giant', quantity: 7, position: 'wide' },
          { action: 'react', effect: 'snowflakes', position: 'wide' },
          { action: 'camera_shake', intensity: 0.5, duration: 1.0 },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'taunt' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'text_popup', text: '🧊 ICE SCULPTURE! 🧊', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🏔️ Frozen Mountain!',
      message: "You made a MOUNTAIN of FROZEN CAKE! Cold + mountain = giant ice sculpture! Very specific combo!",
      skillTaught: 'Specificity',
      tip: "Combining amount + temperature creates unique results!",
      vagueComparison: {
        vagueInput: "Make lots of cake",
        vagueResult: "Cake appears... is it frozen? Is it a lot? Unclear!",
      },
    },
  },

  // ── COLD: survivalist + soup + cold + family_size ───────────────────────────
  {
    id: 'sp2_cold_ice_crystals',
    description: 'Survivalist makes family-size soup at cold temperature and gets ice crystals instead.',
    trigger: { chef: 'survivalist', dish: 'soup', heat: 'cold', amount: 'family_size' },
    tier: 'moderate',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'survivalist', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'survivalist', emoji: '🏕️' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'survivalist', anim: 'throw' },
          { action: 'react', effect: 'snowflakes', position: 'center' },
          { action: 'text_popup', text: '🥶 COLD SOUP? 🥶', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'react', effect: 'snowflakes', position: 'center' },
          { action: 'sfx', sound: 'partial' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'survivalist', anim: 'get_bonked' },
          { action: 'emote', character: 'survivalist', emoji: 'worried' },
          { action: 'text_popup', text: '🧊 FROZEN CHUNKS! 🧊', position: 'center', size: 'huge' },
          { action: 'react', effect: 'question-marks', position: 'center' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🧊 Ice Soup!',
      message: "Cold soup for the whole family... but it turned into ice! Try warm or blazing for actual soup.",
      skillTaught: 'Specificity',
      tip: "Heat level changes everything. Cold = frozen, warm = normal, blazing = fire!",
      vagueComparison: {
        vagueInput: "Cook family soup",
        vagueResult: "Soup for everyone... but what temperature? Nobody knows!",
      },
    },
  },

  // ── BLAZING: skeleton + pizza + blazing + mountain ─────────────────────────
  {
    id: 'sp2_blazing_fire_tower',
    description: 'Skeleton cooks a mountain of pizza at blazing heat and creates a tower of fire.',
    trigger: { chef: 'skeleton', dish: 'pizza', heat: 'blazing', amount: 'mountain' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'skeleton_warrior', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'skeleton_warrior', emoji: '🔥' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'cast_long' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'text_popup', text: '🔥 BLAZING HOT! 🔥', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pizza_whole', quantity: 8, position: 'wide' },
          { action: 'react', effect: 'fire-sneeze', position: 'wide' },
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'screen_flash', color: 'orange', duration: 0.3 },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'jump_big' },
          { action: 'react', effect: 'hearts-float', position: 'center' },
          { action: 'text_popup', text: '🍕 PIZZA VOLCANO! 🍕', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🔥 Blazing Mountain!',
      message: "Blazing heat + mountain size = FIRE TOWER! The kitchen is on fire (in a good way)! Perfect details!",
      skillTaught: 'Specificity',
      tip: "Blazing + mountain creates the most dramatic cooking ever!",
      vagueComparison: {
        vagueInput: "Make lots of pizza",
        vagueResult: "Pizza appears... but is it on fire? Is it huge? Mystery!",
      },
    },
  },

  // ── VOLCANIC: superhero + cake + volcanic + infinite ────────────────────────
  {
    id: 'sp2_volcanic_endless_explosion',
    description: 'Superhero creates infinite cake at volcanic heat and the kitchen explodes with dessert.',
    trigger: { chef: 'superhero', dish: 'cake', heat: 'volcanic', amount: 'infinite' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'superhero', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'superhero', emoji: 'heroic' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'superhero', anim: 'cast_long' },
          { action: 'text_popup', text: '🌋 VOLCANIC CAKE! 🌋', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.8, duration: 1.5 },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'cake_giant', quantity: 12, position: 'wide' },
          { action: 'react', effect: 'fire-sneeze', position: 'wide' },
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'screen_flash', color: 'red', duration: 0.4 },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'superhero', anim: 'get_bonked' },
          { action: 'react', effect: 'stars-spin', position: 'left' },
          { action: 'text_popup', text: '🎂 TOO MUCH CAKE! 🎂', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🌋 VOLCANIC CHAOS!',
      message: "VOLCANIC + INFINITE = TOO MUCH! The kitchen can't handle it! Maybe try 'blazing' instead of 'volcanic'?",
      skillTaught: 'Specificity',
      tip: "Some combinations are TOO specific — volcanic + infinite creates too much chaos!",
      vagueComparison: {
        vagueInput: "Make cake at volcanic heat",
        vagueResult: "The kitchen erupts! Maybe be less specific next time?",
      },
    },
  },

  // ── BLAZING: clown + pepperoni + blazing + family_size ─────────────────────
  {
    id: 'sp2_blazing_pepperoni_feast',
    description: 'Clown makes a family-size pepperoni pizza at blazing heat with spectacular results.',
    trigger: { chef: 'clown', dish: 'pepperoni', heat: 'blazing', amount: 'family_size' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'clown', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'clown', emoji: 'silly' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'throw' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'text_popup', text: '🔥 BLAZING PEPPERONI! 🔥', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pizza_whole', quantity: 4, position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'Cheering' },
          { action: 'react', effect: 'stars-spin', position: 'center' },
          { action: 'text_popup', text: '🍕 FAMILY FEAST! 🍕', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🔥 Perfect Pizza Party!',
      message: "Blazing heat + family size pepperoni = the perfect feast! Great combo of temperature and amount!",
      skillTaught: 'Specificity',
      tip: "Specific details create specific results! You nailed it!",
      vagueComparison: {
        vagueInput: "Cook pepperoni",
        vagueResult: "Pepperoni appears... one slice? A feast? Who knows!",
      },
    },
  },

  // ── AMOUNT: skeleton + cake + single ────────────────────────────────────────
  {
    id: 'sp2_amount_tiny_plate',
    description: 'Skeleton makes a single tiny cake that fits on one small plate.',
    trigger: { chef: 'skeleton', dish: 'cake', heat: '*', amount: 'single' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'stove', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'skeleton_warrior', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'skeleton_warrior', emoji: '👨‍🍳' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'interact' },
          { action: 'text_popup', text: '🎂 Just one... 🎂', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'cake_small', position: 'center' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'idle' },
          { action: 'emote', character: 'skeleton_warrior', emoji: '🍰' },
          { action: 'text_popup', text: '🍰 Tiny treat! 🍰', position: 'center', size: 'large' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🍰 Just One!',
      message: "Single = one tiny cake! Try 'mountain' or 'infinite' for more! Also add heat level for more fun.",
      skillTaught: 'Specificity',
      tip: "Amount changes the portion size. Try all the options!",
      vagueComparison: {
        vagueInput: "Cook a cake",
        vagueResult: "Cake! But how much? One cupcake or a tower? Mystery!",
      },
    },
  },

  // ── AMOUNT: superhero + pizza + mountain ────────────────────────────────────
  {
    id: 'sp2_amount_tower_of_food',
    description: 'Superhero creates a massive mountain of pizzas that towers over the kitchen.',
    trigger: { chef: 'superhero', dish: 'pizza', heat: '*', amount: 'mountain' },
    tier: 'spectacular',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'stove', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'superhero', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'superhero', emoji: 'heroic' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'superhero', anim: 'cast_long' },
          { action: 'text_popup', text: '🏔️ MOUNTAIN MODE! 🏔️', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.5, duration: 1.0 },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pizza_whole', quantity: 10, position: 'wide' },
          { action: 'react', effect: 'sparkle-magic', position: 'wide' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'superhero', anim: 'wave' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'text_popup', text: '🍕 PIZZA TOWER! 🍕', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🏔️ Mountain of Pizza!',
      message: "Mountain = TONS of food! Add a heat level (cold/warm/blazing) to make it even better!",
      skillTaught: 'Specificity',
      tip: "Try combining amount + heat for the best results!",
      vagueComparison: {
        vagueInput: "Make pizza",
        vagueResult: "Pizza appears! Is it one or many? The chef shrugs.",
      },
    },
  },

  // ── AMOUNT: clown + pasta + infinite ────────────────────────────────────────
  {
    id: 'sp2_amount_flooding',
    description: 'Clown makes infinite pasta and the kitchen floods with noodles.',
    trigger: { chef: 'clown', dish: 'pasta', heat: '*', amount: 'infinite' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'clown', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'clown', emoji: 'silly' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'cast_long' },
          { action: 'text_popup', text: '🍝 INFINITE PASTA! 🍝', position: 'top', size: 'huge' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pasta', quantity: 15, position: 'wide' },
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'camera_shake', intensity: 0.9, duration: 1.5 },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'get_bonked' },
          { action: 'react', effect: 'stars-spin', position: 'left' },
          { action: 'text_popup', text: '🌊 PASTA FLOOD! 🌊', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🌊 Too Much Pasta!',
      message: "Infinite = TOO MUCH! The kitchen flooded! Try 'family_size' or 'mountain' for safer amounts.",
      skillTaught: 'Specificity',
      tip: "Infinite is the chaos option — use it for maximum fun (and mess)!",
      vagueComparison: {
        vagueInput: "Make pasta",
        vagueResult: "Pasta... but how much? A bite? A flood? Unclear!",
      },
    },
  },

  // ── CROSS: survivalist + soup + warm + family_size ─────────────────────────
  {
    id: 'sp2_cross_perfect_soup',
    description: 'Survivalist makes a perfect family-size soup at warm temperature.',
    trigger: { chef: 'survivalist', dish: 'soup', heat: 'warm', amount: 'family_size' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'survivalist', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'survivalist', emoji: '🏕️' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'survivalist', anim: 'throw' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'text_popup', text: '🍲 PERFECT SOUP! 🍲', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'react', effect: 'hearts-float', position: 'center' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'survivalist', anim: 'taunt' },
          { action: 'react', effect: 'glow-pulse', position: 'center' },
          { action: 'text_popup', text: '🍲 FAMILY MEAL! 🍲', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🍲 Perfect Combo!',
      message: "Warm + family size = perfect soup for everyone! You nailed the temperature AND the portion!",
      skillTaught: 'Specificity',
      tip: "Combining heat + amount creates the best results!",
      vagueComparison: {
        vagueInput: "Make soup",
        vagueResult: "Soup appears! Hot? Cold? For one? For many? ???",
      },
    },
  },

  // ── CROSS: skeleton + mystery + volcanic + infinite ─────────────────────────
  {
    id: 'sp2_cross_mystery_chaos',
    description: 'Skeleton tries to cook infinite mystery food at volcanic heat and creates total chaos.',
    trigger: { chef: 'skeleton', dish: 'mystery', heat: 'volcanic', amount: 'infinite' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'skeleton_warrior', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'skeleton_warrior', emoji: 'confused' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'cast_long' },
          { action: 'react', effect: 'question-marks', position: 'center' },
          { action: 'text_popup', text: '❓🌋 MYSTERY VOLCANO! 🌋❓', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 1.0, duration: 2.0 },
        ],
        delayAfter: 1.5,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'potion_mystery', quantity: 12, position: 'wide' },
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'wide' },
          { action: 'screen_flash', color: 'purple', duration: 0.5 },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'die_dramatic' },
          { action: 'react', effect: 'stars-spin', position: 'left' },
          { action: 'text_popup', text: '💥 CHAOS! 💥', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '💥 TOTAL CHAOS!',
      message: "Mystery + volcanic + infinite = you don't know WHAT happened! Try being more specific!",
      skillTaught: 'Specificity',
      tip: "Too many wildcards create chaos. Try picking specific ingredients!",
      vagueComparison: {
        vagueInput: "Cook mystery food at high heat",
        vagueResult: "Something explodes! What was it? Nobody will ever know.",
      },
    },
  },

  // ── CROSS: everyone + cake + blazing + mountain ─────────────────────────────
  {
    id: 'sp2_cross_team_cooking',
    description: 'Everyone works together to cook a mountain of cake at blazing heat.',
    trigger: { chef: 'everyone', dish: 'cake', heat: 'blazing', amount: 'mountain' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'center' },
          { action: 'spawn', asset: 'stove', position: 'left' },
          { action: 'spawn', asset: 'table_kitchen', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'skeleton_warrior', position: 'left', anim: 'spawn_air' },
          { action: 'spawn_character', character: 'clown', position: 'center', anim: 'spawn_air' },
          { action: 'spawn_character', character: 'superhero', position: 'right', anim: 'spawn_air' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'interact' },
          { action: 'animate', character: 'clown', anim: 'throw' },
          { action: 'animate', character: 'superhero', anim: 'cast_spell' },
          { action: 'text_popup', text: '🔥 TEAM COOKING! 🔥', position: 'top', size: 'huge' },
          { action: 'react', effect: 'fire-sneeze', position: 'wide' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'cake_giant', quantity: 9, position: 'wide' },
          { action: 'react', effect: 'fire-sneeze', position: 'wide' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'camera_shake', intensity: 0.7, duration: 1.0 },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'jump_big' },
          { action: 'animate', character: 'clown', anim: 'Cheering' },
          { action: 'animate', character: 'superhero', anim: 'wave' },
          { action: 'react', effect: 'hearts-float', position: 'center' },
          { action: 'text_popup', text: '🎂 CAKE MOUNTAIN! 🎂', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🎂 Team Success!',
      message: "Everyone + blazing + mountain = EPIC TEAMWORK! All the chefs worked together for the biggest cake ever!",
      skillTaught: 'Specificity',
      tip: "Everyone is powerful when combined with big amounts and high heat!",
      vagueComparison: {
        vagueInput: "Make a big cake",
        vagueResult: "Cake appears! But is it on fire? Are there many chefs? Hmm.",
      },
    },
  },

  // ── COLD: superhero + pizza + cold + infinite ───────────────────────────────
  {
    id: 'sp2_cold_frozen_avalanche',
    description: 'Superhero creates infinite frozen pizzas and triggers an ice avalanche.',
    trigger: { chef: 'superhero', dish: 'pizza', heat: 'cold', amount: 'infinite' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'fridge', position: 'center' },
          { action: 'react', effect: 'snowflakes', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'superhero', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'superhero', emoji: 'heroic' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'superhero', anim: 'cast_long' },
          { action: 'text_popup', text: '❄️ INFINITE ICE! ❄️', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.9, duration: 1.5 },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pizza_whole', quantity: 15, position: 'wide' },
          { action: 'react', effect: 'snowflakes', position: 'wide' },
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'screen_flash', color: 'blue', duration: 0.4 },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'superhero', anim: 'get_bonked' },
          { action: 'react', effect: 'stars-spin', position: 'left' },
          { action: 'text_popup', text: '🧊 FROZEN AVALANCHE! 🧊', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '❄️ Ice Avalanche!',
      message: "Cold + infinite = frozen pizza avalanche! The kitchen is buried in ice! Maybe try 'warm' temperature instead?",
      skillTaught: 'Specificity',
      tip: "Cold + infinite creates maximum freeze! Try different temperature levels!",
      vagueComparison: {
        vagueInput: "Make lots of pizza",
        vagueResult: "Pizza appears... temperature unknown!",
      },
    },
  },

  // ── WARM: knight + cake + warm + single ─────────────────────────────────────
  {
    id: 'sp2_warm_cozy_treat',
    description: 'Knight bakes a single warm cake that fills the kitchen with cozy warmth.',
    trigger: { chef: 'knight', dish: 'cake', heat: 'warm', amount: 'single' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'knight', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'knight', emoji: '⚔️' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'interact' },
          { action: 'react', effect: 'steam', position: 'center' },
          { action: 'text_popup', text: '🔥 WARM BAKING! 🔥', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'cake_small', position: 'center' },
          { action: 'react', effect: 'hearts-float', position: 'center' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'taunt' },
          { action: 'emote', character: 'knight', emoji: '🎂' },
          { action: 'text_popup', text: '🍰 COZY TREAT! 🍰', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🍰 Perfect Warmth!',
      message: "Warm temperature + single portion = perfectly cooked treat! Just the right amount and heat!",
      skillTaught: 'Specificity',
      tip: "Warm is the normal cooking temperature — perfect for most dishes!",
      vagueComparison: {
        vagueInput: "Bake a cake",
        vagueResult: "Cake appears... is it warm? Cold? Burning? Mystery!",
      },
    },
  },

  // ── WARM: barbarian + pepperoni + warm + mountain ───────────────────────────
  {
    id: 'sp2_warm_feast_pile',
    description: 'Barbarian cooks a mountain of warm pepperoni pizza for a huge feast.',
    trigger: { chef: 'barbarian', dish: 'pepperoni', heat: 'warm', amount: 'mountain' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'barbarian', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'barbarian', emoji: '🪓' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'barbarian', anim: 'throw' },
          { action: 'react', effect: 'steam', position: 'center' },
          { action: 'text_popup', text: '🏔️ MOUNTAIN FEAST! 🏔️', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.5, duration: 1.0 },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pizza_whole', quantity: 9, position: 'wide' },
          { action: 'react', effect: 'steam', position: 'wide' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'barbarian', anim: 'jump_big' },
          { action: 'react', effect: 'stars-spin', position: 'center' },
          { action: 'text_popup', text: '🍕 WARRIOR FEAST! 🍕', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🏔️ Mountain of Food!',
      message: "Warm + mountain = a HUGE pile of perfectly cooked food! Great combo for feeding an army!",
      skillTaught: 'Specificity',
      tip: "Warm temperature works great with big amounts — no freezing, no burning!",
      vagueComparison: {
        vagueInput: "Cook pepperoni pizza",
        vagueResult: "Some pizza... one slice? A pile? Who can say!",
      },
    },
  },

  // ── WARM: mage + pasta + warm + infinite ────────────────────────────────────
  {
    id: 'sp2_warm_endless_noodles',
    description: 'Mage conjures infinite warm pasta that never stops appearing.',
    trigger: { chef: 'mage', dish: 'pasta', heat: 'warm', amount: 'infinite' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'mage', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'mage', emoji: '🧙' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'mage', anim: 'cast_long' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'text_popup', text: '🍝 INFINITE PASTA! 🍝', position: 'top', size: 'huge' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pasta', quantity: 18, position: 'wide' },
          { action: 'react', effect: 'steam', position: 'wide' },
          { action: 'camera_shake', intensity: 0.8, duration: 1.5 },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'mage', anim: 'get_bonked' },
          { action: 'react', effect: 'stars-spin', position: 'left' },
          { action: 'text_popup', text: '🌊 NOODLE FLOOD! 🌊', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🌊 Endless Noodles!',
      message: "Warm + infinite = never-ending pasta flood! The kitchen is drowning in noodles! Try 'mountain' for a safer amount.",
      skillTaught: 'Specificity',
      tip: "Infinite is always chaos — even with warm temperature!",
      vagueComparison: {
        vagueInput: "Make pasta",
        vagueResult: "Pasta... how much? The mystery continues!",
      },
    },
  },

  // ── BLAZING: clown + soup + blazing + single ────────────────────────────────
  {
    id: 'sp2_blazing_fire_bowl',
    description: 'Clown makes a single bowl of blazing hot soup that catches fire.',
    trigger: { chef: 'clown', dish: 'soup', heat: 'blazing', amount: 'single' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'clown', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'clown', emoji: 'silly' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'throw' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'text_popup', text: '🔥 BLAZING SOUP! 🔥', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'react', effect: 'smoke', position: 'center' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'Cheering' },
          { action: 'emote', character: 'clown', emoji: '🍲' },
          { action: 'text_popup', text: '🔥 FIRE BOWL! 🔥', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🔥 Blazing Bowl!',
      message: "Blazing + single = one SUPER HOT bowl! It's on fire! Maybe try 'warm' for safer soup?",
      skillTaught: 'Specificity',
      tip: "Blazing makes everything dramatic — even a single bowl!",
      vagueComparison: {
        vagueInput: "Make soup",
        vagueResult: "Soup appears... is it hot? How hot? Unknown!",
      },
    },
  },

  // ── BLAZING: skeleton + mystery + blazing + infinite ────────────────────────
  {
    id: 'sp2_blazing_inferno_chaos',
    description: 'Skeleton tries to cook infinite mystery food at blazing heat and creates an inferno.',
    trigger: { chef: 'skeleton', dish: 'mystery', heat: 'blazing', amount: 'infinite' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'skeleton_warrior', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'skeleton_warrior', emoji: 'confused' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'cast_long' },
          { action: 'react', effect: 'question-marks', position: 'center' },
          { action: 'text_popup', text: '🔥❓ BLAZING MYSTERY! ❓🔥', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 1.0, duration: 2.0 },
        ],
        delayAfter: 1.5,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'potion_mystery', quantity: 15, position: 'wide' },
          { action: 'react', effect: 'fire-sneeze', position: 'wide' },
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'screen_flash', color: 'orange', duration: 0.5 },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'die_dramatic' },
          { action: 'react', effect: 'stars-spin', position: 'left' },
          { action: 'text_popup', text: '💥 INFERNO! 💥', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '💥 Blazing Chaos!',
      message: "Blazing + infinite + mystery = you created an INFERNO! Nobody knows what's cooking! Too many wild cards!",
      skillTaught: 'Specificity',
      tip: "Mystery + blazing + infinite = maximum chaos! Try being more specific!",
      vagueComparison: {
        vagueInput: "Cook lots of mystery food",
        vagueResult: "Something explodes... what was it? Forever unknown!",
      },
    },
  },

  // ── VOLCANIC: survivalist + pizza + volcanic + single ───────────────────────
  {
    id: 'sp2_volcanic_lava_slice',
    description: 'Survivalist cooks a single pizza at volcanic heat and it becomes molten lava.',
    trigger: { chef: 'survivalist', dish: 'pizza', heat: 'volcanic', amount: 'single' },
    tier: 'moderate',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'survivalist', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'survivalist', emoji: '🏕️' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'survivalist', anim: 'interact' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'text_popup', text: '🌋 VOLCANIC HEAT! 🌋', position: 'top', size: 'large' },
          { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'pizza_whole', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'react', effect: 'smoke', position: 'center' },
          { action: 'sfx', sound: 'partial' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'survivalist', anim: 'get_bonked' },
          { action: 'emote', character: 'survivalist', emoji: 'worried' },
          { action: 'text_popup', text: '🔥 LAVA PIZZA! 🔥', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🌋 Too Hot!',
      message: "Volcanic heat on one pizza = molten lava! Way too hot! Try 'blazing' or 'warm' instead.",
      skillTaught: 'Specificity',
      tip: "Volcanic is the HOTTEST setting — usually too hot for normal cooking!",
      vagueComparison: {
        vagueInput: "Make pizza at high heat",
        vagueResult: "Hot pizza... but how hot? Hard to say!",
      },
    },
  },

  // ── VOLCANIC: knight + soup + volcanic + family_size ────────────────────────
  {
    id: 'sp2_volcanic_erupting_cauldron',
    description: 'Knight makes family-size soup at volcanic heat and the cauldron erupts.',
    trigger: { chef: 'knight', dish: 'soup', heat: 'volcanic', amount: 'family_size' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'knight', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'knight', emoji: '⚔️' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'throw' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'text_popup', text: '🌋 VOLCANIC SOUP! 🌋', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.7, duration: 1.2 },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'react', effect: 'smoke', position: 'wide' },
          { action: 'screen_flash', color: 'red', duration: 0.3 },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'get_bonked' },
          { action: 'react', effect: 'stars-spin', position: 'left' },
          { action: 'text_popup', text: '💥 SOUP ERUPTION! 💥', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🌋 Soup Volcano!',
      message: "Volcanic + family size = erupting cauldron! The soup exploded! Try 'warm' or 'blazing' for safer cooking!",
      skillTaught: 'Specificity',
      tip: "Volcanic heat is extreme — it makes things explode!",
      vagueComparison: {
        vagueInput: "Make soup for the family",
        vagueResult: "Soup for everyone... but what temperature? Mystery!",
      },
    },
  },

  // ── VOLCANIC: barbarian + pepperoni + volcanic + mountain ───────────────────
  {
    id: 'sp2_volcanic_fire_mountain',
    description: 'Barbarian creates a mountain of volcanic pepperoni and the kitchen becomes a fire zone.',
    trigger: { chef: 'barbarian', dish: 'pepperoni', heat: 'volcanic', amount: 'mountain' },
    tier: 'spectacular',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'wide' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'barbarian', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'barbarian', emoji: '🪓' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'barbarian', anim: 'cast_long' },
          { action: 'text_popup', text: '🌋 FIRE MOUNTAIN! 🌋', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.9, duration: 1.5 },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pizza_whole', quantity: 11, position: 'wide' },
          { action: 'react', effect: 'fire-sneeze', position: 'wide' },
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'screen_flash', color: 'red', duration: 0.4 },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'barbarian', anim: 'wave' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'text_popup', text: '🔥 PEPPERONI VOLCANO! 🔥', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🌋 Volcanic Mountain!',
      message: "Volcanic + mountain = FIRE EVERYWHERE! A massive pile of burning pepperoni! Super extreme combo!",
      skillTaught: 'Specificity',
      tip: "Volcanic + mountain creates the most extreme cooking scenario!",
      vagueComparison: {
        vagueInput: "Make lots of pepperoni",
        vagueResult: "Pepperoni appears... lots? A bit? Temperature? Who knows!",
      },
    },
  },

  // ── WARM: clown + cake + warm + family_size ─────────────────────────────────
  {
    id: 'sp2_warm_party_ready',
    description: 'Clown bakes family-size cake at warm heat, perfect for a party.',
    trigger: { chef: 'clown', dish: 'cake', heat: 'warm', amount: 'family_size' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'clown', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'clown', emoji: 'silly' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'cast_spell' },
          { action: 'react', effect: 'steam', position: 'center' },
          { action: 'text_popup', text: '🎂 PARTY CAKE! 🎂', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'cake_giant', quantity: 4, position: 'center' },
          { action: 'react', effect: 'hearts-float', position: 'center' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'taunt' },
          { action: 'react', effect: 'glow-pulse', position: 'center' },
          { action: 'text_popup', text: '🎉 PERFECT PARTY! 🎉', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🎉 Party Perfect!',
      message: "Warm + family size cake = perfect for a party! Just the right heat and amount for everyone!",
      skillTaught: 'Specificity',
      tip: "Warm + family_size is a great combo for feeding a group!",
      vagueComparison: {
        vagueInput: "Bake cake for a party",
        vagueResult: "Cake appears... enough for everyone? Maybe?",
      },
    },
  },

  // ── COLD: mage + pasta + cold + family_size ─────────────────────────────────
  {
    id: 'sp2_cold_frozen_noodles',
    description: 'Mage makes family-size pasta at cold temperature and gets frozen noodles.',
    trigger: { chef: 'mage', dish: 'pasta', heat: 'cold', amount: 'family_size' },
    tier: 'moderate',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'cauldron', position: 'center' },
          { action: 'spawn', asset: 'fridge', position: 'left' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'mage', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'mage', emoji: '🧙' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'mage', anim: 'cast_spell' },
          { action: 'react', effect: 'snowflakes', position: 'center' },
          { action: 'text_popup', text: '❄️ COLD PASTA? ❄️', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pasta', quantity: 5, position: 'center' },
          { action: 'react', effect: 'snowflakes', position: 'center' },
          { action: 'sfx', sound: 'partial' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'mage', anim: 'idle' },
          { action: 'emote', character: 'mage', emoji: 'worried' },
          { action: 'text_popup', text: '🧊 FROZEN NOODLES! 🧊', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🧊 Frozen Pasta!',
      message: "Cold + family_size = frozen noodles for everyone! Not very tasty! Try 'warm' for actual cooked pasta.",
      skillTaught: 'Specificity',
      tip: "Cold temperature freezes everything, even large amounts!",
      vagueComparison: {
        vagueInput: "Make pasta for the family",
        vagueResult: "Pasta for everyone... but is it warm or frozen? Mystery!",
      },
    },
  },

  // ── BLAZING: superhero + cake + blazing + family_size ───────────────────────
  {
    id: 'sp2_blazing_flame_feast',
    description: 'Superhero creates family-size cake at blazing heat with impressive fire effects.',
    trigger: { chef: 'superhero', dish: 'cake', heat: 'blazing', amount: 'family_size' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'center' },
          { action: 'spawn', asset: 'table_kitchen', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'superhero', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'superhero', emoji: 'heroic' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'superhero', anim: 'cast_long' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'text_popup', text: '🔥 BLAZING FEAST! 🔥', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'cake_giant', quantity: 5, position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'superhero', anim: 'jump_big' },
          { action: 'react', effect: 'hearts-float', position: 'center' },
          { action: 'text_popup', text: '🎂 FLAME CAKES! 🎂', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🔥 Blazing Success!',
      message: "Blazing + family_size = dramatic fire cakes for everyone! Hot and impressive! Great combo!",
      skillTaught: 'Specificity',
      tip: "Blazing heat + family_size creates spectacular results!",
      vagueComparison: {
        vagueInput: "Make cakes for everyone",
        vagueResult: "Cakes appear... are they on fire? How many? Unknown!",
      },
    },
  },

  // ── COLD: knight + pepperoni + cold + mountain ──────────────────────────────
  {
    id: 'sp2_cold_ice_tower',
    description: 'Knight creates a mountain of frozen pepperoni that becomes an ice tower.',
    trigger: { chef: 'knight', dish: 'pepperoni', heat: 'cold', amount: 'mountain' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'fridge', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'knight', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'knight', emoji: '⚔️' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'cast_long' },
          { action: 'react', effect: 'snowflakes', position: 'center' },
          { action: 'text_popup', text: '🏔️ ICE MOUNTAIN! 🏔️', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.5, duration: 1.0 },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pizza_whole', quantity: 8, position: 'wide' },
          { action: 'react', effect: 'snowflakes', position: 'wide' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'Cheering' },
          { action: 'react', effect: 'stars-spin', position: 'center' },
          { action: 'text_popup', text: '🧊 FROZEN TOWER! 🧊', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🧊 Ice Tower!',
      message: "Cold + mountain of pepperoni = frozen tower! A huge icy sculpture! Very dramatic, but not edible!",
      skillTaught: 'Specificity',
      tip: "Cold + mountain creates impressive frozen structures!",
      vagueComparison: {
        vagueInput: "Make lots of pepperoni",
        vagueResult: "Pepperoni appears... frozen? Cooked? How much? Mystery!",
      },
    },
  },

];

// ─── STAGE 2 DEFAULT VIGNETTE ───────────────────────────────────────────────

export const SKELETON_PIZZA_DEFAULT_2: Vignette = {
  id: 'skeleton_pizza_default_2',
  description: 'A chef cooks some food at a temperature in the kitchen.',
  trigger: { chef: '*', dish: '*', heat: '*', amount: '*' },
  tier: 'subtle',
  promptScore: 'partial',
  steps: [
    {
      parallel: [
        { action: 'spawn', asset: 'stove', position: 'center' },
        { action: 'spawn', asset: 'oven', position: 'right' },
        { action: 'sfx', sound: 'spawn' },
      ],
      delayAfter: 0.3,
    },
    {
      parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'left', anim: 'spawn_air' },
        { action: 'emote', character: 'skeleton_warrior', emoji: '👨‍🍳' },
      ],
      delayAfter: 0.5,
    },
    {
      parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'interact' },
        { action: 'text_popup', text: '🍽️ Cooking... 🍽️', position: 'center', size: 'large' },
      ],
      delayAfter: 0.8,
    },
    {
      parallel: [
        { action: 'spawn', asset: 'pizza', position: 'center' },
        { action: 'sfx', sound: 'success' },
      ],
      delayAfter: 0.5,
    },
    {
      parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'idle' },
        { action: 'emote', character: 'skeleton_warrior', emoji: '🍕' },
      ],
      delayAfter: 2.0,
    },
  ],
  feedback: {
    title: '🍳 Basic Cooking!',
    message: "Someone cooked something! But what HEAT? How much (AMOUNT)? Add those details for better results!",
    skillTaught: 'Specificity',
    tip: "Stage 2 adds temperature and portion size. Try 'blazing' heat or 'mountain' amount!",
    vagueComparison: {
      vagueInput: "Cook something",
      vagueResult: "Food appears... maybe? The kitchen looks confused.",
    },
  },
};

// ─── STAGE 3 VIGNETTES ──────────────────────────────────────────────────────

export const SKELETON_PIZZA_STAGE_3: Vignette[] = [

  // ── SECRET COMBO 1: grill + freeze = Baked Alaska ───────────────────────────
  {
    id: 'sp3_combo_baked_alaska',
    description: 'Grill and freeze combine to create a hot-outside, frozen-inside masterpiece.',
    trigger: { technique1: 'grill', technique2: 'freeze', presentation: '*', delivery: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'left' },
          { action: 'spawn', asset: 'fridge', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'skeleton_warrior', position: 'center', anim: 'spawn_air' },
          { action: 'emote', character: 'skeleton_warrior', emoji: '👨‍🍳' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'cast_spell' },
          { action: 'react', effect: 'fire-sneeze', position: 'left' },
          { action: 'text_popup', text: '🔥 GRILLING! 🔥', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'cast_spell' },
          { action: 'react', effect: 'snowflakes', position: 'right' },
          { action: 'text_popup', text: '❄️ FREEZING! ❄️', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'cake_giant', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'react', effect: 'snowflakes', position: 'center' },
          { action: 'screen_flash', color: 'blue', duration: 0.3 },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'wave' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'text_popup', text: '🔥❄️ BAKED ALASKA! 🔥❄️', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🔥❄️ SECRET COMBO!',
      message: "Grill + Freeze = BAKED ALASKA! Hot outside, frozen inside! You discovered a secret combo!",
      skillTaught: 'Combo Thinking',
      tip: "Some technique pairs unlock special results! Keep experimenting!",
    },
  },

  // ── SECRET COMBO 2: juggle + launch = Aerial Kitchen ────────────────────────
  {
    id: 'sp3_combo_aerial_kitchen',
    description: 'Juggle and launch combine for food tossed and caught mid-air.',
    trigger: { technique1: 'juggle', technique2: 'launch', presentation: '*', delivery: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'table_kitchen', position: 'left' },
          { action: 'spawn', asset: 'catapult', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'clown', position: 'center', anim: 'spawn_air' },
          { action: 'emote', character: 'clown', emoji: 'silly' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'throw' },
          { action: 'spawn_rain', asset: 'pizza_slice', quantity: 5, position: 'wide' },
          { action: 'text_popup', text: '🤹 JUGGLING! 🤹', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'cast_spell' },
          { action: 'react', effect: 'explosion-cartoon', position: 'right' },
          { action: 'text_popup', text: '🚀 LAUNCHING! 🚀', position: 'top', size: 'large' },
          { action: 'camera_shake', intensity: 0.5, duration: 0.8 },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pizza_whole', quantity: 7, position: 'wide' },
          { action: 'react', effect: 'sparkle-magic', position: 'wide' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'taunt' },
          { action: 'react', effect: 'glow-pulse', position: 'center' },
          { action: 'text_popup', text: '🎪 AERIAL KITCHEN! 🎪', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🤹 SECRET COMBO!',
      message: "Juggle + Launch = AERIAL KITCHEN! Food flying everywhere and caught perfectly! Amazing combo!",
      skillTaught: 'Combo Thinking',
      tip: "Mixing movement techniques creates spectacular results!",
    },
  },

  // ── SECRET COMBO 3: smash + enchant = Magic Crumble ─────────────────────────
  {
    id: 'sp3_combo_magic_crumble',
    description: 'Smash food then enchant it to reform magically.',
    trigger: { technique1: 'smash', technique2: 'enchant', presentation: '*', delivery: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'table_kitchen', position: 'center' },
          { action: 'spawn', asset: 'cake_giant', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'barbarian', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'barbarian', emoji: '🪓' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'barbarian', anim: 'spin_attack' },
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'text_popup', text: '💥 SMASH! 💥', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.8, duration: 0.8 },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'skeleton_mage', position: 'right', anim: 'spawn_air' },
          { action: 'emote', character: 'skeleton_mage', emoji: '✨' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_mage', anim: 'cast_long' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'text_popup', text: '✨ ENCHANTING! ✨', position: 'top', size: 'large' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'cake_giant', position: 'center' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'screen_flash', color: 'purple', duration: 0.3 },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'barbarian', anim: 'jump_big' },
          { action: 'animate', character: 'skeleton_mage', anim: 'Cheering' },
          { action: 'react', effect: 'hearts-float', position: 'center' },
          { action: 'text_popup', text: '✨ MAGIC CRUMBLE! ✨', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '✨ SECRET COMBO!',
      message: "Smash + Enchant = MAGIC CRUMBLE! Destroy it, then magically rebuild it! Perfect teamwork!",
      skillTaught: 'Combo Thinking',
      tip: "Destruction + magic = reformation! Keep finding combos!",
    },
  },

  // ── SECRET COMBO 4: freeze + launch = Ice Rocket ────────────────────────────
  {
    id: 'sp3_combo_ice_rocket',
    description: 'Freeze food solid then launch it like a frozen projectile.',
    trigger: { technique1: 'freeze', technique2: 'launch', presentation: '*', delivery: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'fridge', position: 'left' },
          { action: 'spawn', asset: 'catapult', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'skeleton_mage', position: 'center', anim: 'spawn_air' },
          { action: 'emote', character: 'skeleton_mage', emoji: '🧙' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_mage', anim: 'cast_spell' },
          { action: 'react', effect: 'snowflakes', position: 'left' },
          { action: 'text_popup', text: '❄️ FREEZING! ❄️', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'pizza_whole', position: 'center' },
          { action: 'react', effect: 'snowflakes', position: 'center' },
          { action: 'sfx', sound: 'partial' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_mage', anim: 'cast_long' },
          { action: 'react', effect: 'explosion-cartoon', position: 'right' },
          { action: 'text_popup', text: '🚀 LAUNCH! 🚀', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.7, duration: 1.0 },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pizza_whole', quantity: 6, position: 'wide' },
          { action: 'react', effect: 'snowflakes', position: 'wide' },
          { action: 'react', effect: 'explosion-cartoon', position: 'wide' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_mage', anim: 'wave' },
          { action: 'react', effect: 'stars-spin', position: 'center' },
          { action: 'text_popup', text: '🚀❄️ ICE ROCKET! 🚀❄️', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🚀❄️ SECRET COMBO!',
      message: "Freeze + Launch = ICE ROCKET! Frozen food launched as projectiles! Cool combo!",
      skillTaught: 'Combo Thinking',
      tip: "Freeze makes it solid, launch makes it fly!",
    },
  },

  // ── SECRET COMBO 5: grill + smash = Flame Smash ─────────────────────────────
  {
    id: 'sp3_combo_flame_smash',
    description: 'Grill food to fiery perfection then smash it dramatically.',
    trigger: { technique1: 'grill', technique2: 'smash', presentation: '*', delivery: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'oven', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'skeleton_warrior', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'skeleton_warrior', emoji: '🔥' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'cast_spell' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'text_popup', text: '🔥 GRILLING! 🔥', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'burger', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'barbarian', position: 'right', anim: 'spawn_air' },
          { action: 'emote', character: 'barbarian', emoji: '🪓' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'animate', character: 'barbarian', anim: 'spin_attack' },
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'text_popup', text: '💥🔥 FLAME SMASH! 💥🔥', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.9, duration: 1.0 },
          { action: 'screen_flash', color: 'orange', duration: 0.3 },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_warrior', anim: 'taunt' },
          { action: 'animate', character: 'barbarian', anim: 'jump_big' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '💥🔥 SECRET COMBO!',
      message: "Grill + Smash = FLAME SMASH! Fiery food + dramatic smashing = epic result!",
      skillTaught: 'Combo Thinking',
      tip: "Heat + destruction = explosive combo!",
    },
  },

  // ── SECRET COMBO 6: juggle + enchant = Enchanted Juggle ────────────────────
  {
    id: 'sp3_combo_enchanted_juggle',
    description: 'Enchant juggling food so it juggles itself magically.',
    trigger: { technique1: 'juggle', technique2: 'enchant', presentation: '*', delivery: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'table_kitchen', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'clown', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'clown', emoji: 'silly' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'throw' },
          { action: 'spawn_rain', asset: 'pizza_slice', quantity: 5, position: 'center' },
          { action: 'text_popup', text: '🤹 JUGGLING! 🤹', position: 'top', size: 'large' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'skeleton_mage', position: 'right', anim: 'spawn_air' },
          { action: 'emote', character: 'skeleton_mage', emoji: '✨' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'skeleton_mage', anim: 'cast_long' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'text_popup', text: '✨ ENCHANTING! ✨', position: 'top', size: 'large' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_rain', asset: 'pizza_whole', quantity: 8, position: 'wide' },
          { action: 'react', effect: 'sparkle-magic', position: 'wide' },
          { action: 'screen_flash', color: 'purple', duration: 0.3 },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'clown', anim: 'Cheering' },
          { action: 'animate', character: 'skeleton_mage', anim: 'wave' },
          { action: 'react', effect: 'glow-pulse', position: 'center' },
          { action: 'text_popup', text: '✨🤹 ENCHANTED JUGGLE! 🤹✨', position: 'center', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '✨🤹 SECRET COMBO!',
      message: "Juggle + Enchant = ENCHANTED JUGGLE! The food juggles itself with magic! Beautiful combo!",
      skillTaught: 'Combo Thinking',
      tip: "Magic can make anything automatic! Keep experimenting!",
    },
  },

];

// ─── STAGE 3 DEFAULT VIGNETTE ───────────────────────────────────────────────

export const SKELETON_PIZZA_DEFAULT_3: Vignette = {
  id: 'skeleton_pizza_default_3',
  description: 'A chef tries combining techniques in the kitchen.',
  trigger: { technique1: '*', technique2: '*', presentation: '*', delivery: '*' },
  tier: 'subtle',
  promptScore: 'partial',
  steps: [
    {
      parallel: [
        { action: 'spawn', asset: 'stove', position: 'center' },
        { action: 'spawn', asset: 'table_kitchen', position: 'left' },
        { action: 'sfx', sound: 'spawn' },
      ],
      delayAfter: 0.3,
    },
    {
      parallel: [
        { action: 'spawn_character', character: 'skeleton_warrior', position: 'left', anim: 'spawn_air' },
        { action: 'emote', character: 'skeleton_warrior', emoji: '👨‍🍳' },
      ],
      delayAfter: 0.5,
    },
    {
      parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'interact' },
        { action: 'text_popup', text: '🍽️ Experimenting... 🍽️', position: 'center', size: 'large' },
      ],
      delayAfter: 0.8,
    },
    {
      parallel: [
        { action: 'spawn', asset: 'pizza', position: 'center' },
        { action: 'react', effect: 'question-marks', position: 'center' },
        { action: 'sfx', sound: 'partial' },
      ],
      delayAfter: 0.5,
    },
    {
      parallel: [
        { action: 'animate', character: 'skeleton_warrior', anim: 'idle' },
        { action: 'emote', character: 'skeleton_warrior', emoji: 'thinking' },
        { action: 'text_popup', text: '❓ Try a combo! ❓', position: 'center', size: 'large' },
      ],
      delayAfter: 2.0,
    },
  ],
  feedback: {
    title: '🍳 Keep Trying!',
    message: "You tried a combination, but it didn't unlock a secret! Try pairing techniques like grill+freeze or juggle+launch!",
    skillTaught: 'Combo Thinking',
    tip: "Stage 3 is all about SECRET COMBOS! Experiment with different technique pairs!",
  },
};
