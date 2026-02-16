/**
 * Knight Space Quest — Vignettes for Stage 1.
 *
 * Stage 1: "Fix the station by having {CREW} do {TASK} using the {TOOL}"
 * Slots: CREW (ranger/robot/engineer/knight/everyone), TASK (repair/launch/build/rescue/explore/defend), TOOL (solar_panel/cargo/dome/rocket/flag/laser)
 */

import type { Vignette } from '../../types/madlibs';
import {
  ENTER_FROM_LEFT, ENTER_FROM_RIGHT, CHARGE_IN_LEFT,
  DROP_IN, SNEAK_IN_LEFT,
  WALK_TO, RUN_TO, JUMP_TO,
  CONVERGE_MEET,
  OBJECT_DROP, OBJECT_GROW_REVEAL,
  CHARACTER_SPEAK, EMOTIONAL_REACT,
  BOUNCE_ENTRANCE, DANCE, FLASH,
  NARRATOR, IMPACT, CELEBRATION, DISAPPOINTMENT, DRAMATIC_PAUSE,
} from '../movement-templates';

// ─── STAGE 1 VIGNETTES ──────────────────────────────────────────────────────

// ── RANGER VIGNETTES ────────────────────────────────────────────────────────

const RANGER_VIGNETTES: Vignette[] = [
  // ── EXACT: ranger + repair + solar_panel ───────────────────────────────────
  {
    id: 'ks_ranger_repair',
    description: 'The space ranger expertly repairs a broken solar panel and restores power to the station.',
    trigger: { crew: 'ranger', task: 'repair', tool: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // SETUP: Scene description + station + broken panel
      ...NARRATOR("The space station's lights flicker as the solar panel sparks dangerously!"),
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'satellite_dish', position: 'left' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.4,
      },
      ...OBJECT_DROP('solar_panel', 'right'),
      {
        parallel: [
          { action: 'react', effect: 'stars-spin', position: 'right' },
          { action: 'sfx', sound: 'explosion' },
          { action: 'text_popup', text: 'POWER CRITICAL!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Ranger arrives with mission focus
      ...ENTER_FROM_LEFT('space_ranger'),
      ...CHARACTER_SPEAK('space_ranger', 'determined', "I'll get that panel operational, stat!"),
      ...EMOTIONAL_REACT('space_ranger', 'determined', 'left'),
      // ACTION: Ranger repairs with precision
      ...WALK_TO('space_ranger', 'right'),
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 1.0,
      },
      // CONSEQUENCE: Power restored!
      ...IMPACT(),
      {
        parallel: [
          { action: 'screen_flash', color: 'yellow', duration: 0.2 },
          { action: 'text_popup', text: 'POWER RESTORED!', position: 'top', size: 'huge' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('space_ranger', 'proud', 'right'),
      // RESOLUTION: Celebration + educational narrator
      ...CELEBRATION(['space_ranger']),
      ...NARRATOR("You specified WHO (ranger), WHAT (repair), and the TOOL — that detail saved the mission!"),
    ],
    feedback: {
      title: '🌟 PERFECT REPAIR!',
      message: "The space ranger expertly fixed the solar panel! You said WHO (ranger), WHAT they do (repair), and WHAT tool (solar panel). That's exactly how space stations get saved!",
      skillTaught: 'Specificity',
      tip: 'Matching the right expert with the right job = mission success!',
    },
  },

  // ── ranger + launch ─────────────────────────────────────────────────────────
  {
    id: 'ks_ranger_launch',
    description: 'Ranger silently preps a stealth probe launch for sector scouting.',
    trigger: { crew: 'ranger', task: 'launch', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Stealth mission atmosphere
      ...NARRATOR("The ranger prepares a scouting probe for a tactical stealth launch."),
      {
        parallel: [
          { action: 'spawn', asset: 'rocket', position: 'cs-center' },
          { action: 'spawn', asset: 'satellite_dish', position: 'ds-right' },
          { action: 'spawn', asset: 'moon', position: 'far-right' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Ranger arrives with stealth focus
      ...SNEAK_IN_LEFT('space_ranger'),
      ...CHARACTER_SPEAK('space_ranger', 'calm', "Initiating silent launch protocol."),
      ...EMOTIONAL_REACT('space_ranger', 'calm', 'off-left'),
      ...WALK_TO('space_ranger', 'cs-center'),
      ...OBJECT_GROW_REVEAL('rocket', 'cs-center', 1.3),
      // ACTION: Precise launch sequence
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.6,
      },
      // CONSEQUENCE: Successful stealth launch
      {
        parallel: [
          { action: 'react', effect: 'fire', position: 'cs-center' },
          { action: 'camera_shake', intensity: 0.3, duration: 0.5 },
          { action: 'text_popup', text: 'STEALTH LAUNCH!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      ...EMOTIONAL_REACT('space_ranger', 'proud', 'off-left'),
      ...FLASH('blue', 0.2),
      // RESOLUTION: Mission success
      ...CELEBRATION(['space_ranger']),
      ...NARRATOR("You chose the ranger for a tactical launch — perfect for scouting missions!"),
    ],
    feedback: {
      title: '🔍 Stealth Launch',
      message: 'Ranger precision! A quiet, tactical probe launch to scout ahead.',
      skillTaught: 'Specificity',
      tip: 'Rangers excel at precise, tactical operations.',
    },
  },

  // ── ranger + build ──────────────────────────────────────────────────────────
  {
    id: 'ks_ranger_build',
    description: 'Ranger uses nature-inspired design to assemble a modular outpost.',
    trigger: { crew: 'ranger', task: 'build', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Building materials ready
      ...NARRATOR("The ranger plans a modular outpost with natural design principles."),
      {
        parallel: [
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-left' },
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-right' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Ranger arrives with building vision
      ...ENTER_FROM_LEFT('space_ranger'),
      ...CHARACTER_SPEAK('space_ranger', 'calm', "I'll build this with organic harmony in mind."),
      ...EMOTIONAL_REACT('space_ranger', 'calm', 'off-left'),
      // ACTION: Assembling the dome
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'spawn', asset: 'dome', position: 'cs-center' },
          { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
          { action: 'sfx', sound: 'magic' },
        ],
        delayAfter: 0.6,
      },
      // CONSEQUENCE: Outpost complete
      {
        parallel: [
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'text_popup', text: 'MODULAR OUTPOST!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('space_ranger', 'proud', 'off-left'),
      // RESOLUTION: Nature meets technology
      ...CELEBRATION(['space_ranger']),
      ...NARRATOR("The ranger brought natural harmony to space construction — perfect crew choice!"),
    ],
    feedback: {
      title: '🌿 Organic Design',
      message: 'Ranger builds with natural harmony — even in space!',
      skillTaught: 'Specificity',
      tip: 'Each crew member has unique building styles.',
    },
  },

  // ── ranger + rescue ─────────────────────────────────────────────────────────
  {
    id: 'ks_ranger_rescue',
    description: 'Ranger tracks lost crew member using survival skills in zero-g.',
    trigger: { crew: 'ranger', task: 'rescue', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Emergency situation
      ...NARRATOR("A crew member is lost in the void — time for a rescue mission!"),
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'cs-center' },
          { action: 'text_popup', text: 'CREW LOST!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Ranger on the case
      ...DROP_IN('space_ranger'),
      ...CHARACTER_SPEAK('space_ranger', 'determined', "I'll track them down. No one gets left behind."),
      ...EMOTIONAL_REACT('space_ranger', 'determined', 'off-left'),
      ...RUN_TO('space_ranger', 'cs-center'),
      ...WALK_TO('space_ranger', 'ds-right'),
      // ACTION: Tracking and searching
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'walk' },
          { action: 'react', effect: 'question-marks', position: 'ds-right' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.6,
      },
      // CONSEQUENCE: Found!
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'ds-right', anim: 'spawn_ground' },
          { action: 'react', effect: 'hearts-float', position: 'ds-right' },
          { action: 'text_popup', text: 'FOUND!', position: 'center', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'wave' },
          { action: 'animate', character: 'engineer', anim: 'wave' },
        ],
        delayAfter: 0.5,
      },
      // RESOLUTION: Rescue complete
      ...CELEBRATION(['space_ranger', 'engineer']),
      ...NARRATOR("The ranger's tracking skills saved the day — perfect crew for rescue missions!"),
    ],
    feedback: {
      title: '🔍 Tracker Supreme',
      message: 'Ranger tracking skills work even in the void of space!',
      skillTaught: 'Specificity',
      tip: 'Rangers specialize in finding and rescuing.',
    },
  },

  // ── ranger + explore ────────────────────────────────────────────────────────
  {
    id: 'ks_ranger_explore',
    description: 'Ranger scouts new sector with cautious, methodical approach.',
    trigger: { crew: 'ranger', task: 'explore', tool: '*' },
    tier: 'subtle',
    promptScore: 'perfect',
    steps: [
      // SETUP: New territory to explore
      ...NARRATOR("The ranger begins methodical exploration of an uncharted sector."),
      {
        parallel: [
          { action: 'spawn', asset: 'satellite_dish', position: 'cs-center' },
          { action: 'spawn', asset: 'compass', position: 'ds-left' },
          { action: 'spawn', asset: 'map', position: 'ds-right' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Careful approach
      ...ENTER_FROM_LEFT('space_ranger'),
      ...CHARACTER_SPEAK('space_ranger', 'curious', "Let me scout this area carefully and map everything."),
      ...EMOTIONAL_REACT('space_ranger', 'curious', 'off-left'),
      // ACTION: Exploring and mapping
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'walk' },
          { action: 'react', effect: 'sparkle-magic', position: 'ds-right' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.6,
      },
      // CONSEQUENCE: Territory mapped
      {
        parallel: [
          { action: 'spawn', asset: 'flag', position: 'ds-right' },
          { action: 'text_popup', text: 'SECTOR MAPPED!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('space_ranger', 'proud', 'off-left'),
      // RESOLUTION: Mission complete
      ...CELEBRATION(['space_ranger']),
      ...NARRATOR("The ranger's thorough scouting mapped the sector perfectly!"),
    ],
    feedback: {
      title: '🗺️ Scout Report',
      message: 'Ranger exploration is methodical and thorough!',
      skillTaught: 'Specificity',
      tip: 'Rangers map territory carefully.',
    },
  },

  // ── ranger + defend ─────────────────────────────────────────────────────────
  {
    id: 'ks_ranger_defend',
    description: 'Ranger sets up perimeter defenses with tactical precision.',
    trigger: { crew: 'ranger', task: 'defend', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Incoming threat
      ...NARRATOR("Alert! A hostile presence approaches the station!"),
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'cs-center' },
          { action: 'spawn', asset: 'basemodule_A', position: 'far-left' },
          { action: 'text_popup', text: 'THREAT DETECTED!', position: 'top', size: 'large' },
          { action: 'camera_shake', intensity: 0.2, duration: 0.5 },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Ranger tactical response
      ...DROP_IN('space_ranger'),
      ...CHARACTER_SPEAK('space_ranger', 'determined', "Setting up tactical perimeter defenses."),
      ...EMOTIONAL_REACT('space_ranger', 'determined', 'off-left'),
      ...RUN_TO('space_ranger', 'ds-left'),
      ...OBJECT_GROW_REVEAL('laser_gun', 'ds-left', 1.5),
      ...RUN_TO('space_ranger', 'ds-right'),
      ...OBJECT_GROW_REVEAL('laser_gun', 'ds-right', 1.5),
      // ACTION: Deploy defenses
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'spawn', asset: 'laser_gun', position: 'ds-left' },
          { action: 'spawn', asset: 'laser_gun', position: 'ds-right' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.6,
      },
      // CONSEQUENCE: Threat neutralized
      ...IMPACT(),
      {
        parallel: [
          { action: 'react', effect: 'explosion-cartoon', position: 'off-right' },
          { action: 'spawn', asset: 'crystal_big', position: 'far-right' },
          { action: 'spawn', asset: 'thunder', position: 'off-right' },
          { action: 'camera_shake', intensity: 0.4, duration: 0.5 },
          { action: 'text_popup', text: 'THREAT NEUTRALIZED!', position: 'center', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('space_ranger', 'heroic', 'off-left'),
      ...DANCE('space_ranger'),
      ...FLASH('red', 0.2),
      // RESOLUTION: Tactical victory
      ...CELEBRATION(['space_ranger']),
      ...NARRATOR("The ranger's tactical precision saved the station — strategy over brute force!"),
    ],
    feedback: {
      title: '🎯 Tactical Defense',
      message: 'Ranger defenses are precise and effective!',
      skillTaught: 'Specificity',
      tip: 'Rangers defend with strategy, not brute force.',
    },
  },
];

// ── ROBOT VIGNETTES ─────────────────────────────────────────────────────────

const ROBOT_VIGNETTES: Vignette[] = [
  // ── robot + repair ──────────────────────────────────────────────────────────
  {
    id: 'ks_robot_repair',
    description: 'Robot executes repair protocol with mechanical efficiency.',
    trigger: { crew: 'robot', task: 'repair', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Broken panel needs fixing
      ...NARRATOR("A damaged solar panel requires immediate mechanical repair."),
      {
        parallel: [
          { action: 'spawn', asset: 'solar_panel', position: 'cs-center' },
          { action: 'react', effect: 'smoke', position: 'cs-center' },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Robot on the job
      ...ENTER_FROM_LEFT('robot'),
      ...CHARACTER_SPEAK('robot', 'calm', "INITIATING REPAIR PROTOCOL. MALFUNCTION DETECTED."),
      ...EMOTIONAL_REACT('robot', 'calm', 'off-left'),
      // ACTION: Systematic repair
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
          { action: 'text_popup', text: 'REPAIR PROTOCOL...', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Repair successful
      {
        parallel: [
          { action: 'react', effect: 'glow-pulse', position: 'cs-center' },
          { action: 'text_popup', text: 'REPAIR COMPLETE', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('robot', 'proud', 'off-left'),
      // RESOLUTION: Efficient completion
      ...CELEBRATION(['robot']),
      ...NARRATOR("The robot's mechanical precision got the job done fast!"),
    ],
    feedback: {
      title: '⚙️ Efficient Repair',
      message: 'Robot repair protocol is fast and precise!',
      skillTaught: 'Specificity',
      tip: 'Robots excel at mechanical tasks.',
    },
  },

  // ── robot + launch ──────────────────────────────────────────────────────────
  {
    id: 'ks_robot_launch',
    description: 'Robot calculates perfect trajectory and launches with mathematical precision.',
    trigger: { crew: 'robot', task: 'launch', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Rocket ready for launch
      ...NARRATOR("The robot calculates the perfect launch trajectory with mathematical precision."),
      {
        parallel: [
          { action: 'spawn', asset: 'rocket', position: 'cs-center' },
          { action: 'spawn', asset: 'planet', position: 'far-right' },
          { action: 'spawn', asset: 'basemodule_B', position: 'far-left' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Robot's analytical approach
      ...ENTER_FROM_LEFT('robot'),
      ...CHARACTER_SPEAK('robot', 'calm', "COMPUTING OPTIMAL TRAJECTORY. STANDBY."),
      ...EMOTIONAL_REACT('robot', 'calm', 'off-left'),
      ...WALK_TO('robot', 'cs-center'),
      ...OBJECT_GROW_REVEAL('rocket', 'cs-center', 1.4),
      // ACTION: Calculation and launch
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'interact' },
          { action: 'text_popup', text: 'CALCULATING...', position: 'center', size: 'large' },
          { action: 'react', effect: 'question-marks', position: 'cs-center' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Perfect trajectory
      ...IMPACT(),
      {
        parallel: [
          { action: 'react', effect: 'explosion-cartoon', position: 'cs-center' },
          { action: 'camera_shake', intensity: 0.5, duration: 0.5 },
          { action: 'text_popup', text: 'TRAJECTORY: PERFECT!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('robot', 'proud', 'off-left'),
      ...FLASH('yellow', 0.2),
      // RESOLUTION: Mathematical success
      ...CELEBRATION(['robot']),
      ...NARRATOR("The robot's precise calculations ensured a flawless launch!"),
    ],
    feedback: {
      title: '🧮 Perfect Math',
      message: 'Robot calculated the perfect launch trajectory!',
      skillTaught: 'Specificity',
      tip: 'Robots use precision calculations.',
    },
  },

  // ── robot + build ───────────────────────────────────────────────────────────
  {
    id: 'ks_robot_build',
    description: 'Robot assembles structure with assembly-line speed.',
    trigger: { crew: 'robot', task: 'build', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Materials ready for assembly
      ...NARRATOR("The robot prepares to assemble a structure with mechanical efficiency."),
      {
        parallel: [
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-left' },
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-right' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Robot's systematic approach
      ...BOUNCE_ENTRANCE('robot', 'cs-center', 'left'),
      ...CHARACTER_SPEAK('robot', 'calm', "ASSEMBLING STRUCTURE. EFFICIENCY MODE ENGAGED."),
      ...EMOTIONAL_REACT('robot', 'calm', 'cs-center'),
      ...RUN_TO('robot', 'ds-left'),
      ...RUN_TO('robot', 'ds-right'),
      ...RUN_TO('robot', 'cs-center'),
      ...OBJECT_GROW_REVEAL('dome', 'cs-center', 1.6),
      // ACTION: Rapid assembly
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'interact' },
          { action: 'spawn', asset: 'dome', position: 'cs-center' },
          { action: 'react', effect: 'dust', position: 'cs-center' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.4,
      },
      // CONSEQUENCE: Build complete
      {
        parallel: [
          { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
          { action: 'text_popup', text: 'BUILD COMPLETE!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('robot', 'proud', 'off-left'),
      // RESOLUTION: Assembly line success
      ...CELEBRATION(['robot']),
      ...NARRATOR("The robot's assembly-line speed built the structure in record time!"),
    ],
    feedback: {
      title: '🏗️ Assembly Line',
      message: 'Robot builds fast and modular!',
      skillTaught: 'Specificity',
      tip: 'Robots are efficient builders.',
    },
  },

  // ── robot + rescue ──────────────────────────────────────────────────────────
  {
    id: 'ks_robot_rescue',
    description: 'Robot deploys search algorithm to locate stranded crew.',
    trigger: { crew: 'robot', task: 'rescue', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Rescue emergency
      ...NARRATOR("A crew member is missing — the robot deploys search algorithms!"),
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'cs-center' },
          { action: 'text_popup', text: 'RESCUE NEEDED!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Robot scanner mode
      ...BOUNCE_ENTRANCE('robot', 'cs-center', 'left'),
      ...CHARACTER_SPEAK('robot', 'calm', "DEPLOYING SEARCH ALGORITHM. SCANNING ALL SECTORS."),
      ...EMOTIONAL_REACT('robot', 'calm', 'cs-center'),
      ...WALK_TO('robot', 'ds-right'),
      // ACTION: Systematic scanning
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'interact' },
          { action: 'react', effect: 'stars-spin', position: 'ds-right' },
          { action: 'text_popup', text: 'SCANNING...', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Target located
      {
        parallel: [
          { action: 'spawn_character', character: 'knight', position: 'ds-right', anim: 'spawn_ground' },
          { action: 'react', effect: 'sparkle-magic', position: 'ds-right' },
          { action: 'text_popup', text: 'LOCATED!', position: 'center', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'taunt' },
          { action: 'animate', character: 'knight', anim: 'wave' },
        ],
        delayAfter: 0.5,
      },
      // RESOLUTION: Technological rescue
      ...CELEBRATION(['robot', 'knight']),
      ...NARRATOR("The robot's sensors found the lost crew member instantly!"),
    ],
    feedback: {
      title: '📡 Scanner Mode',
      message: 'Robot scan detected the lost crew member!',
      skillTaught: 'Specificity',
      tip: 'Robots use technology to rescue.',
    },
  },

  // ── robot + explore ─────────────────────────────────────────────────────────
  {
    id: 'ks_robot_explore',
    description: 'Robot surveys new area with sensor array sweep.',
    trigger: { crew: 'robot', task: 'explore', tool: '*' },
    tier: 'subtle',
    promptScore: 'perfect',
    steps: [
      // SETUP: Exploration zone
      ...NARRATOR("The robot begins a systematic sensor sweep of the unknown sector."),
      {
        parallel: [
          { action: 'spawn', asset: 'satellite_dish', position: 'cs-center' },
          { action: 'spawn', asset: 'rover', position: 'ds-left' },
          { action: 'spawn', asset: 'magnifying_glass', position: 'ds-right' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Robotic survey
      ...ENTER_FROM_LEFT('robot'),
      ...CHARACTER_SPEAK('robot', 'calm', "INITIATING SENSOR ARRAY. COLLECTING DATA."),
      ...EMOTIONAL_REACT('robot', 'calm', 'off-left'),
      ...WALK_TO('robot', 'cs-center'),
      // ACTION: Data collection
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'walk' },
          { action: 'react', effect: 'glow-pulse', position: 'cs-center' },
          { action: 'text_popup', text: 'SCANNING SECTOR...', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Data acquired
      {
        parallel: [
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'text_popup', text: 'DATA COLLECTED!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('robot', 'proud', 'off-left'),
      // RESOLUTION: Systematic success
      ...CELEBRATION(['robot']),
      ...NARRATOR("The robot's sensors gathered complete data on the sector!"),
    ],
    feedback: {
      title: '📊 Data Acquired',
      message: 'Robot sensors mapped the sector!',
      skillTaught: 'Specificity',
      tip: 'Robots gather data systematically.',
    },
  },

  // ── robot + defend ──────────────────────────────────────────────────────────
  {
    id: 'ks_robot_defend',
    description: 'Robot activates automated defense turrets.',
    trigger: { crew: 'robot', task: 'defend', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Intruder detected
      ...NARRATOR("Intruder alert! The robot activates automated defense systems!"),
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'cs-center' },
          { action: 'text_popup', text: 'INTRUDER ALERT!', position: 'top', size: 'large' },
          { action: 'camera_shake', intensity: 0.3, duration: 0.5 },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Robot defense mode
      ...BOUNCE_ENTRANCE('robot', 'cs-center', 'left'),
      ...CHARACTER_SPEAK('robot', 'determined', "DEFENSE MODE ACTIVATED. DEPLOYING TURRETS."),
      ...EMOTIONAL_REACT('robot', 'determined', 'cs-center'),
      ...RUN_TO('robot', 'ds-left'),
      ...RUN_TO('robot', 'ds-right'),
      // ACTION: Turret deployment
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'interact' },
          { action: 'spawn', asset: 'laser_gun', position: 'ds-left' },
          { action: 'spawn', asset: 'laser_gun', position: 'ds-right' },
          { action: 'text_popup', text: 'TURRETS ARMED!', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.6,
      },
      // CONSEQUENCE: Threat eliminated
      ...IMPACT(),
      {
        parallel: [
          { action: 'react', effect: 'explosion-cartoon', position: 'off-right' },
          { action: 'spawn', asset: 'fireball', position: 'far-right' },
          { action: 'spawn', asset: 'crystal_small', position: 'off-right' },
          { action: 'camera_shake', intensity: 0.5, duration: 0.5 },
          { action: 'text_popup', text: 'THREAT ELIMINATED!', position: 'center', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('robot', 'proud', 'off-left'),
      ...DANCE('robot'),
      ...FLASH('white', 0.2),
      // RESOLUTION: Automated success
      ...CELEBRATION(['robot']),
      ...NARRATOR("The robot's automated turrets defended the station perfectly!"),
    ],
    feedback: {
      title: '🔫 Auto-Turrets',
      message: 'Robot defense systems are automated and unstoppable!',
      skillTaught: 'Specificity',
      tip: 'Robots defend with technology.',
    },
  },
];

// ── ENGINEER VIGNETTES ──────────────────────────────────────────────────────

const ENGINEER_VIGNETTES: Vignette[] = [
  // ── engineer + repair ───────────────────────────────────────────────────────
  {
    id: 'ks_engineer_repair',
    description: 'Engineer over-engineers a simple fix with 17 backup systems.',
    trigger: { crew: 'engineer', task: 'repair', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Broken panel
      ...NARRATOR("The engineer approaches a simple repair with... excessive enthusiasm."),
      {
        parallel: [
          { action: 'spawn', asset: 'solar_panel', position: 'cs-center' },
          { action: 'react', effect: 'smoke', position: 'cs-center' },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Engineer's over-engineering mindset
      ...BOUNCE_ENTRANCE('engineer', 'cs-center', 'left'),
      ...CHARACTER_SPEAK('engineer', 'excited', "This needs 17 backup systems! Maybe 18!"),
      ...EMOTIONAL_REACT('engineer', 'excited', 'cs-center'),
      ...JUMP_TO('engineer', 'ds-left'),
      ...JUMP_TO('engineer', 'ds-right'),
      ...JUMP_TO('engineer', 'cs-center'),
      // ACTION: Adding excessive redundancy
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'interact' },
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-left' },
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-right' },
          { action: 'text_popup', text: 'ADDING REDUNDANCY...', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Overly complex success
      {
        parallel: [
          { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
          { action: 'text_popup', text: '17 BACKUPS INSTALLED!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('engineer', 'proud', 'off-left'),
      // RESOLUTION: Over-engineered victory
      ...CELEBRATION(['engineer']),
      ...NARRATOR("The engineer never does a simple fix — but it'll never break again!"),
    ],
    feedback: {
      title: '🤓 Over-Engineered',
      message: 'Engineer never does a simple fix — 17 backup systems just in case!',
      skillTaught: 'Specificity',
      tip: 'Engineers love redundancy and complexity.',
    },
  },

  // ── engineer + launch ───────────────────────────────────────────────────────
  {
    id: 'ks_engineer_launch',
    description: 'Engineer builds elaborate launch system with safety protocols.',
    trigger: { crew: 'engineer', task: 'launch', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Launch preparation
      ...NARRATOR("The engineer approaches the launch with 99 safety protocols in mind."),
      {
        parallel: [
          { action: 'spawn', asset: 'rocket', position: 'cs-center' },
          { action: 'spawn', asset: 'basemodule_garage', position: 'far-left' },
          { action: 'spawn', asset: 'planet', position: 'far-right' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Safety-first mindset
      ...ENTER_FROM_LEFT('engineer'),
      ...CHARACTER_SPEAK('engineer', 'nervous', "Running safety checks 1 through 99 first!"),
      ...EMOTIONAL_REACT('engineer', 'nervous', 'off-left'),
      ...WALK_TO('engineer', 'cs-center'),
      ...OBJECT_GROW_REVEAL('wrench', 'ds-left', 2.0),
      // ACTION: Exhaustive safety checks
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'interact' },
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-left' },
          { action: 'text_popup', text: 'SAFETY CHECK 1/99...', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: All checks passed
      ...IMPACT(),
      {
        parallel: [
          { action: 'react', effect: 'explosion-cartoon', position: 'cs-center' },
          { action: 'camera_shake', intensity: 0.6, duration: 0.5 },
          { action: 'text_popup', text: 'ALL CHECKS PASSED!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('engineer', 'proud', 'off-left'),
      // RESOLUTION: Ultra-safe launch
      ...CELEBRATION(['engineer']),
      ...NARRATOR("The engineer's excessive safety protocols ensured a perfect launch!"),
    ],
    feedback: {
      title: '📐 Safety First',
      message: 'Engineer ran 99 safety checks before launch!',
      skillTaught: 'Specificity',
      tip: 'Engineers prioritize safety and protocols.',
    },
  },

  // ── engineer + build ────────────────────────────────────────────────────────
  {
    id: 'ks_engineer_build',
    description: 'Engineer constructs unnecessarily complex modular station.',
    trigger: { crew: 'engineer', task: 'build', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Maximum building materials
      ...NARRATOR("The engineer sees a building project as an opportunity for maximum complexity."),
      {
        parallel: [
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-left' },
          { action: 'spawn', asset: 'cargo_crate', position: 'cs-center' },
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-right' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Over-complicated vision
      ...ENTER_FROM_LEFT('engineer'),
      ...CHARACTER_SPEAK('engineer', 'excited', "Let's make this REALLY intricate!"),
      ...EMOTIONAL_REACT('engineer', 'excited', 'off-left'),
      // ACTION: Complex construction
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'interact' },
          { action: 'spawn', asset: 'dome', position: 'us-center' },
          { action: 'react', effect: 'dust', position: 'center' },
          { action: 'text_popup', text: 'COMPLEXITY LEVEL: MAX!', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Masterpiece complete
      {
        parallel: [
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'text_popup', text: 'MASTERPIECE COMPLETE!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('engineer', 'proud', 'off-left'),
      // RESOLUTION: Over-engineered glory
      ...CELEBRATION(['engineer']),
      ...NARRATOR("The engineer turned a simple build into a modular masterpiece!"),
    ],
    feedback: {
      title: '🏗️ Complex Build',
      message: 'Engineer turned a simple outpost into a modular masterpiece!',
      skillTaught: 'Specificity',
      tip: 'Engineers love intricate designs.',
    },
  },

  // ── engineer + rescue ───────────────────────────────────────────────────────
  {
    id: 'ks_engineer_rescue',
    description: 'Engineer designs elaborate rescue contraption with pulleys.',
    trigger: { crew: 'engineer', task: 'rescue', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Rescue emergency
      ...NARRATOR("A crew member is lost — the engineer designs an elaborate rescue contraption!"),
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'cs-center' },
          { action: 'text_popup', text: 'RESCUE MISSION!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Engineer's gadget solution
      ...BOUNCE_ENTRANCE('engineer', 'cs-center', 'left'),
      ...CHARACTER_SPEAK('engineer', 'excited', "I'll build a multi-part pulley system!"),
      ...EMOTIONAL_REACT('engineer', 'excited', 'cs-center'),
      ...RUN_TO('engineer', 'ds-left'),
      ...RUN_TO('engineer', 'ds-right'),
      // ACTION: Deploy rescue contraption
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'interact' },
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-left' },
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-right' },
          { action: 'text_popup', text: 'PULLEY SYSTEM ENGAGED!', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Rescued!
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'us-center', anim: 'spawn_air' },
          { action: 'react', effect: 'sparkle-magic', position: 'us-center' },
          { action: 'text_popup', text: 'RESCUED!', position: 'center', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'jump_big' },
          { action: 'animate', character: 'space_ranger', anim: 'wave' },
        ],
        delayAfter: 0.5,
      },
      // RESOLUTION: Gadget success
      ...CELEBRATION(['engineer', 'space_ranger']),
      ...NARRATOR("The engineer's elaborate contraption saved the day!"),
    ],
    feedback: {
      title: '⚙️ Contraption Rescue',
      message: 'Engineer built a multi-part rescue machine!',
      skillTaught: 'Specificity',
      tip: 'Engineers solve problems with gadgets.',
    },
  },

  // ── engineer + explore ──────────────────────────────────────────────────────
  {
    id: 'ks_engineer_explore',
    description: 'Engineer deploys sensor grid to map entire sector.',
    trigger: { crew: 'engineer', task: 'explore', tool: '*' },
    tier: 'subtle',
    promptScore: 'perfect',
    steps: [
      // SETUP: Exploration zone
      ...NARRATOR("The engineer deploys a comprehensive sensor grid for exploration."),
      {
        parallel: [
          { action: 'spawn', asset: 'satellite_dish', position: 'cs-center' },
          { action: 'spawn', asset: 'blueprint', position: 'ds-left' },
          { action: 'spawn', asset: 'compass', position: 'ds-right' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Systematic survey
      ...ENTER_FROM_LEFT('engineer'),
      ...CHARACTER_SPEAK('engineer', 'excited', "Let's deploy a full sensor array!"),
      ...EMOTIONAL_REACT('engineer', 'excited', 'off-left'),
      ...WALK_TO('engineer', 'cs-center'),
      ...OBJECT_GROW_REVEAL('satellite_dish', 'ds-left', 1.8),
      ...OBJECT_GROW_REVEAL('satellite_dish', 'ds-right', 1.8),
      // ACTION: Grid deployment
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'interact' },
          { action: 'spawn', asset: 'satellite_dish', position: 'ds-left' },
          { action: 'spawn', asset: 'satellite_dish', position: 'ds-right' },
          { action: 'text_popup', text: 'SENSOR GRID ACTIVE!', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Complete mapping
      {
        parallel: [
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'text_popup', text: 'SECTOR MAPPED!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('engineer', 'proud', 'off-left'),
      // RESOLUTION: Instrumental success
      ...CELEBRATION(['engineer']),
      ...NARRATOR("The engineer's sensor grid mapped every detail of the sector!"),
    ],
    feedback: {
      title: '📡 Sensor Array',
      message: 'Engineer deployed a full sensor grid!',
      skillTaught: 'Specificity',
      tip: 'Engineers explore with instruments.',
    },
  },

  // ── engineer + defend ───────────────────────────────────────────────────────
  {
    id: 'ks_engineer_defend',
    description: 'Engineer builds elaborate defensive fortifications.',
    trigger: { crew: 'engineer', task: 'defend', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Incoming threat
      ...NARRATOR("A threat approaches — the engineer builds defensive fortifications!"),
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'cs-center' },
          { action: 'text_popup', text: 'INCOMING THREAT!', position: 'top', size: 'large' },
          { action: 'camera_shake', intensity: 0.3, duration: 0.5 },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Engineer's defensive plan
      ...BOUNCE_ENTRANCE('engineer', 'cs-center', 'left'),
      ...CHARACTER_SPEAK('engineer', 'determined', "I'll build a multi-layered fortress!"),
      ...EMOTIONAL_REACT('engineer', 'determined', 'cs-center'),
      ...RUN_TO('engineer', 'ds-left'),
      ...RUN_TO('engineer', 'ds-right'),
      ...RUN_TO('engineer', 'us-center'),
      // ACTION: Fortification construction
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'interact' },
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-left' },
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-right' },
          { action: 'spawn', asset: 'laser_gun', position: 'us-center' },
          { action: 'spawn', asset: 'cargo_A', position: 'far-left' },
          { action: 'text_popup', text: 'FORTIFYING...', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Threat repelled
      ...IMPACT(),
      {
        parallel: [
          { action: 'react', effect: 'explosion-cartoon', position: 'off-right' },
          { action: 'camera_shake', intensity: 0.4, duration: 0.5 },
          { action: 'text_popup', text: 'FORTRESS COMPLETE!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('engineer', 'proud', 'off-left'),
      // RESOLUTION: Fortified defense
      ...CELEBRATION(['engineer']),
      ...NARRATOR("The engineer's elaborate fortress stopped the threat cold!"),
    ],
    feedback: {
      title: '🛡️ Fortress Mode',
      message: 'Engineer built a multi-layered defense!',
      skillTaught: 'Specificity',
      tip: 'Engineers defend with structures.',
    },
  },
];

// ── KNIGHT VIGNETTES ────────────────────────────────────────────────────────

const KNIGHT_VIGNETTES: Vignette[] = [
  // ── knight + repair ─────────────────────────────────────────────────────────
  {
    id: 'ks_knight_repair',
    description: 'Knight tries to fix broken panel by hitting it with sword hilt.',
    trigger: { crew: 'knight', task: 'repair', tool: '*' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      // SETUP: Broken tech
      ...NARRATOR("The knight faces a broken solar panel with medieval confidence..."),
      {
        parallel: [
          { action: 'spawn', asset: 'solar_panel', position: 'cs-center' },
          { action: 'react', effect: 'smoke', position: 'cs-center' },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Knight's misguided approach
      ...CHARGE_IN_LEFT('knight'),
      ...CHARACTER_SPEAK('knight', 'confused', "I shall smite this cursed machine!"),
      ...EMOTIONAL_REACT('knight', 'confused', 'off-left'),
      ...RUN_TO('knight', 'cs-center'),
      // ACTION: Sword "repair"
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'sword_slash' },
          { action: 'react', effect: 'explosion-cartoon', position: 'cs-center' },
          { action: 'camera_shake', intensity: 0.5, duration: 0.5 },
          { action: 'text_popup', text: 'PERCUSSIVE MAINTENANCE!', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.6,
      },
      // CONSEQUENCE: Made it worse
      {
        parallel: [
          { action: 'react', effect: 'smoke', position: 'cs-center' },
          { action: 'text_popup', text: '...WORSE NOW!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'get_hit' },
          { action: 'react', effect: 'sad-cloud', position: 'off-left' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('knight', 'shocked', 'off-left'),
      // RESOLUTION: Wrong crew for the job
      ...DISAPPOINTMENT(['knight']),
      ...NARRATOR("Swords don't fix solar panels! Next time, pick an engineer or robot for repairs."),
    ],
    feedback: {
      title: '⚔️ Wrong Tool',
      message: 'Swords are NOT repair tools! Maybe ask an engineer or robot?',
      skillTaught: 'Context',
      tip: 'Knights fight, they don\'t fix tech.',
    },
  },

  // ── knight + launch ─────────────────────────────────────────────────────────
  {
    id: 'ks_knight_launch',
    description: 'Knight uses sword as lever to catapult rocket into space.',
    trigger: { crew: 'knight', task: 'launch', tool: '*' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      // SETUP: Rocket ready for launch
      ...NARRATOR("The knight approaches the rocket with... unconventional ideas."),
      {
        parallel: [
          { action: 'spawn', asset: 'rocket', position: 'cs-center' },
          { action: 'spawn', asset: 'moon', position: 'far-right' },
          { action: 'spawn', asset: 'spaceship', position: 'far-left' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Knight's absurd plan
      ...CHARGE_IN_LEFT('knight'),
      ...CHARACTER_SPEAK('knight', 'excited', "I shall use my sword as a mighty lever!"),
      ...EMOTIONAL_REACT('knight', 'excited', 'off-left'),
      ...RUN_TO('knight', 'cs-center'),
      ...OBJECT_GROW_REVEAL('sword', 'ds-left', 2.0),
      // ACTION: Sword lever technique
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'sword_thrust' },
          { action: 'text_popup', text: 'LEVER TECHNIQUE!', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.6,
      },
      // CONSEQUENCE: Somehow... it worked?!
      ...IMPACT(),
      {
        parallel: [
          { action: 'react', effect: 'explosion-cartoon', position: 'cs-center' },
          { action: 'camera_shake', intensity: 0.7, duration: 0.8 },
          { action: 'text_popup', text: 'IT WORKED?!', position: 'top', size: 'huge' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('knight', 'triumphant', 'off-left'),
      ...DANCE('knight'),
      ...FLASH('yellow', 0.3),
      // RESOLUTION: Chaotic success
      ...CELEBRATION(['knight']),
      ...NARRATOR("The knight used a SWORD as a lever! Absurd, but somehow it worked!"),
    ],
    feedback: {
      title: '⚔️ Chaotic Success',
      message: 'Knight used a SWORD as a rocket lever! Ridiculous but... it worked?!',
      skillTaught: 'Creativity',
      tip: 'Sometimes chaos succeeds, but it\'s not reliable!',
    },
  },

  // ── knight + build ──────────────────────────────────────────────────────────
  {
    id: 'ks_knight_build',
    description: 'Knight stacks crates like building a castle tower.',
    trigger: { crew: 'knight', task: 'build', tool: '*' },
    tier: 'moderate',
    promptScore: 'funny_fail',
    steps: [
      // SETUP: Building materials
      ...NARRATOR("The knight sees crates and thinks... castle tower!"),
      {
        parallel: [
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-left' },
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-right' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Medieval building approach
      ...BOUNCE_ENTRANCE('knight', 'ds-left', 'left'),
      ...CHARACTER_SPEAK('knight', 'excited', "I shall construct a mighty tower!"),
      ...EMOTIONAL_REACT('knight', 'excited', 'ds-left'),
      ...WALK_TO('knight', 'cs-center'),
      // ACTION: Castle stacking
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'interact' },
          { action: 'spawn', asset: 'cargo_crate', position: 'cs-center' },
          { action: 'text_popup', text: 'CASTLE TECHNIQUE!', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.6,
      },
      // CONSEQUENCE: Tower complete
      {
        parallel: [
          { action: 'react', effect: 'dust', position: 'center' },
          { action: 'text_popup', text: 'TOWER COMPLETE!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('knight', 'proud', 'off-left'),
      // RESOLUTION: Medieval meets space
      ...CELEBRATION(['knight']),
      ...NARRATOR("The knight built a space tower using castle techniques!"),
    ],
    feedback: {
      title: '🏰 Castle Builder',
      message: 'Knight applied castle-building skills to space construction!',
      skillTaught: 'Creativity',
      tip: 'Medieval techniques... in space?!',
    },
  },

  // ── knight + rescue ─────────────────────────────────────────────────────────
  {
    id: 'ks_knight_rescue',
    description: 'Knight heroically charges to rescue stranded crew member.',
    trigger: { crew: 'knight', task: 'rescue', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Rescue emergency
      ...NARRATOR("A crew member needs rescue — the knight's time to shine!"),
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'cs-center' },
          { action: 'text_popup', text: 'RESCUE NEEDED!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Knight's heroic charge
      ...DROP_IN('knight'),
      {
        parallel: [
          { action: 'text_popup', text: 'FOR HONOR!', position: 'center', size: 'large' },
        ],
        delayAfter: 0.2,
      },
      ...CHARACTER_SPEAK('knight', 'heroic', "No one shall be left behind!"),
      ...EMOTIONAL_REACT('knight', 'heroic', 'off-left'),
      ...RUN_TO('knight', 'ds-right'),
      // ACTION: Heroic dash
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'dash' },
          { action: 'camera_shake', intensity: 0.3, duration: 0.5 },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.6,
      },
      // CONSEQUENCE: Rescued!
      {
        parallel: [
          { action: 'spawn_character', character: 'mage', position: 'ds-right', anim: 'spawn_ground' },
          { action: 'react', effect: 'hearts-float', position: 'ds-right' },
          { action: 'text_popup', text: 'RESCUED!', position: 'center', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'jump_big' },
          { action: 'animate', character: 'mage', anim: 'wave' },
        ],
        delayAfter: 0.5,
      },
      ...DANCE('knight'),
      ...FLASH('blue', 0.2),
      // RESOLUTION: Valor succeeds
      ...CELEBRATION(['knight', 'mage']),
      ...NARRATOR("The knight's bravery works anywhere — even in space!"),
    ],
    feedback: {
      title: '🛡️ Heroic Rescue',
      message: 'Knight valor works in space too!',
      skillTaught: 'Specificity',
      tip: 'Knights excel at brave rescues.',
    },
  },

  // ── knight + explore ────────────────────────────────────────────────────────
  {
    id: 'ks_knight_explore',
    description: 'Knight wanders into new sector with shield raised.',
    trigger: { crew: 'knight', task: 'explore', tool: '*' },
    tier: 'subtle',
    promptScore: 'funny_fail',
    steps: [
      // SETUP: Unknown territory
      ...NARRATOR("The knight explores... with shield raised and extreme caution."),
      {
        parallel: [
          { action: 'spawn', asset: 'satellite_dish', position: 'cs-center' },
          { action: 'spawn', asset: 'astronaut', position: 'far-left' },
          { action: 'spawn', asset: 'spacesuit', position: 'far-right' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Defensive exploration
      ...SNEAK_IN_LEFT('knight'),
      ...CHARACTER_SPEAK('knight', 'nervous', "I shall advance... carefully!"),
      ...EMOTIONAL_REACT('knight', 'nervous', 'off-left'),
      ...WALK_TO('knight', 'cs-center'),
      ...OBJECT_GROW_REVEAL('shield', 'ds-left', 1.5),
      // ACTION: Cautious approach
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'walk' },
          { action: 'react', effect: 'question-marks', position: 'cs-center' },
          { action: 'text_popup', text: 'CAUTIOUS APPROACH...', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.6,
      },
      // CONSEQUENCE: Territory claimed
      {
        parallel: [
          { action: 'spawn', asset: 'flag', position: 'ds-right' },
          { action: 'text_popup', text: 'CLAIMED!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      ...EMOTIONAL_REACT('knight', 'proud', 'off-left'),
      // RESOLUTION: Defensive success
      ...CELEBRATION(['knight']),
      ...NARRATOR("The knight explored with shield up — very cautious!"),
    ],
    feedback: {
      title: '🛡️ Shield First',
      message: 'Knight explores... very defensively!',
      skillTaught: 'Specificity',
      tip: 'Knights are cautious explorers.',
    },
  },

  // ── knight + defend ─────────────────────────────────────────────────────────
  {
    id: 'ks_knight_defend',
    description: 'The knight defends the space station with medieval honor and unexpected effectiveness.',
    trigger: { crew: 'knight', task: 'defend', tool: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // SETUP: Space station under threat
      ...NARRATOR("The knight charges in to defend the station with honor!"),
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'geodesic_dome', position: 'far-left' },
          { action: 'spawn', asset: 'space_house', position: 'far-right' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.3,
      },
      // INTENT: Knight arrives with medieval swagger
      ...CHARGE_IN_LEFT('knight'),
      {
        parallel: [
          { action: 'text_popup', text: 'FOR HONOR!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.2,
      },
      ...CHARACTER_SPEAK('knight', 'excited', "I shall defend this station with blade and honor!"),
      ...EMOTIONAL_REACT('knight', 'excited', 'left'),
      ...RUN_TO('knight', 'cs-center'),
      ...OBJECT_GROW_REVEAL('sword', 'cs-left', 2.5),
      // ACTION: Epic sword defense
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'sword_slash' },
          { action: 'sfx', sound: 'whoosh' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
        ],
        delayAfter: 0.3,
      },
      ...DRAMATIC_PAUSE(),
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'spin_attack' },
          { action: 'sfx', sound: 'whoosh' },
          { action: 'react', effect: 'sparkle-burst', position: 'center' },
        ],
        delayAfter: 0.5,
      },
      // CONSEQUENCE: It actually works — medieval honor wins!
      ...ENTER_FROM_RIGHT('robot'),
      {
        parallel: [
          { action: 'emote', character: 'robot', emoji: 'star_eyes' },
          { action: 'text_popup', text: 'KNIGHT POWER!', position: 'center', size: 'huge' },
          { action: 'react', effect: 'confetti-burst', position: 'wide' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      ...CELEBRATION(['knight', 'robot']),
      ...NARRATOR("A knight defending a space station — nobody saw THAT coming!"),
    ],
    feedback: {
      title: '⚔️ SPACE KNIGHT!',
      message: "A knight defending a space station? Bold choice! Sometimes the unexpected hero saves the day!",
      skillTaught: 'Creativity',
      tip: "You matched the right character to the right task — defending is what knights do best, even in space!",
    },
  },
];

// ── EVERYONE VIGNETTES ──────────────────────────────────────────────────────

const EVERYONE_VIGNETTES: Vignette[] = [
  // ── everyone + repair ───────────────────────────────────────────────────────
  {
    id: 'ks_everyone_repair',
    description: 'Entire crew coordinates complex multi-stage repair.',
    trigger: { crew: 'everyone', task: 'repair', tool: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // SETUP: Major emergency
      ...NARRATOR("A major malfunction requires the entire crew working together!"),
      {
        parallel: [
          { action: 'spawn', asset: 'solar_panel', position: 'cs-center' },
          { action: 'react', effect: 'smoke', position: 'cs-center' },
          { action: 'text_popup', text: 'MAJOR MALFUNCTION!', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Full crew assembly
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'ds-left', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'robot', position: 'ds-right', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'engineer', position: 'off-left', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'knight', position: 'off-right', anim: 'spawn_ground' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'wave' },
          { action: 'text_popup', text: 'ALL HANDS ON DECK!', position: 'center', size: 'large' },
        ],
        delayAfter: 0.4,
      },
      ...WALK_TO('space_ranger', 'cs-left'),
      ...WALK_TO('robot', 'cs-right'),
      ...WALK_TO('engineer', 'cs-center'),
      ...WALK_TO('knight', 'ds-center'),
      // ACTION: Coordinated teamwork
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Perfect teamwork
      ...IMPACT(),
      {
        parallel: [
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'screen_flash', color: 'green', duration: 0.2 },
          { action: 'text_popup', text: 'TEAMWORK SUCCESS!', position: 'top', size: 'huge' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'jump_big' },
        ],
        delayAfter: 0.3,
      },
      ...FLASH('green', 0.3),
      // RESOLUTION: Group celebration
      ...CELEBRATION(['space_ranger', 'robot', 'engineer', 'knight']),
      ...NARRATOR("The entire crew working together accomplished the impossible!"),
    ],
    feedback: {
      title: '👥 Team Repair',
      message: 'Full crew coordination for a complex repair!',
      skillTaught: 'Specificity',
      tip: 'Everyone = maximum teamwork power.',
    },
  },

  // ── everyone + launch ───────────────────────────────────────────────────────
  {
    id: 'ks_everyone_launch',
    description: 'The entire crew assembles for a dramatic countdown and rocket launch from the space station.',
    trigger: { crew: 'everyone', task: 'launch', tool: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // SETUP: Launch pad ready
      ...NARRATOR("The entire crew assembles for the ultimate mission — a rocket launch!"),
      {
        parallel: [
          { action: 'spawn', asset: 'rocket', position: 'center' },
          { action: 'spawn', asset: 'cargo_crate', position: 'left' },
          { action: 'spawn', asset: 'cargo_crate', position: 'right' },
          { action: 'spawn', asset: 'planet', position: 'far-right' },
          { action: 'spawn', asset: 'moon', position: 'far-left' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Full crew coordination
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'left', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'robot', position: 'right', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'engineer', position: 'bottom', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'knight', position: 'center', anim: 'spawn_ground' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'wave' },
          { action: 'text_popup', text: 'LAUNCH SEQUENCE!', position: 'top', size: 'huge' },
        ],
        delayAfter: 0.3,
      },
      ...RUN_TO('space_ranger', 'ds-left'),
      ...RUN_TO('robot', 'ds-right'),
      ...JUMP_TO('knight', 'cs-center'),
      ...WALK_TO('engineer', 'cs-left'),
      ...OBJECT_GROW_REVEAL('rocket', 'center', 1.5),
      // ACTION: Dramatic countdown
      {
        parallel: [
          { action: 'text_popup', text: '3...', position: 'center', size: 'huge' },
          { action: 'camera_shake', intensity: 0.2, duration: 0.5 },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'text_popup', text: '2...', position: 'center', size: 'huge' },
          { action: 'camera_shake', intensity: 0.4, duration: 0.5 },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'text_popup', text: '1...', position: 'center', size: 'huge' },
          { action: 'camera_shake', intensity: 0.6, duration: 0.5 },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.5,
      },
      // CONSEQUENCE: Liftoff!
      ...IMPACT(),
      {
        parallel: [
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'screen_flash', color: 'orange', duration: 0.3 },
          { action: 'camera_shake', intensity: 0.8, duration: 1.5 },
          { action: 'text_popup', text: 'LIFTOFF!', position: 'top', size: 'huge' },
        ],
        delayAfter: 0.8,
      },
      // RESOLUTION: Legendary teamwork
      ...CELEBRATION(['space_ranger', 'robot', 'engineer', 'knight']),
      ...NARRATOR("The entire crew coordinated a perfect launch — ultimate teamwork!"),
    ],
    feedback: {
      title: '🚀 LEGENDARY LAUNCH!',
      message: "When the WHOLE CREW works together on a rocket launch, amazing things happen! Teamwork makes the dream work (in space)!",
      skillTaught: 'Specificity',
      tip: 'Everyone + launch + rocket = the perfect space mission combo!',
    },
  },

  // ── everyone + build ────────────────────────────────────────────────────────
  {
    id: 'ks_everyone_build',
    description: 'Full crew builds massive station expansion together.',
    trigger: { crew: 'everyone', task: 'build', tool: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // SETUP: Massive build project
      ...NARRATOR("The entire crew tackles a massive station expansion together!"),
      {
        parallel: [
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-left' },
          { action: 'spawn', asset: 'cargo_crate', position: 'cs-center' },
          { action: 'spawn', asset: 'cargo_crate', position: 'ds-right' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Full team assembly
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'off-left', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'robot', position: 'off-right', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'engineer', position: 'ds-left', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'knight', position: 'ds-right', anim: 'spawn_ground' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'wave' },
          { action: 'text_popup', text: 'BUILD TOGETHER!', position: 'top', size: 'huge' },
        ],
        delayAfter: 0.4,
      },
      ...WALK_TO('space_ranger', 'cs-left'),
      ...WALK_TO('robot', 'cs-right'),
      ...WALK_TO('engineer', 'cs-center'),
      ...WALK_TO('knight', 'ds-center'),
      // ACTION: Coordinated construction
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'interact' },
          { action: 'spawn', asset: 'dome', position: 'us-center' },
          { action: 'react', effect: 'dust', position: 'center' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Expansion complete
      {
        parallel: [
          { action: 'react', effect: 'hearts-float', position: 'center' },
          { action: 'text_popup', text: 'EXPANSION COMPLETE!', position: 'top', size: 'huge' },
        ],
        delayAfter: 0.3,
      },
      // RESOLUTION: Team triumph
      ...CELEBRATION(['space_ranger', 'robot', 'engineer', 'knight']),
      ...NARRATOR("The entire crew built a massive expansion with perfect teamwork!"),
    ],
    feedback: {
      title: '🏗️ Mega Build',
      message: 'Everyone working together builds FAST!',
      skillTaught: 'Specificity',
      tip: 'Team builds are efficient and spectacular.',
    },
  },

  // ── everyone + rescue ───────────────────────────────────────────────────────
  {
    id: 'ks_everyone_rescue',
    description: 'All crew members coordinate dramatic multi-stage rescue.',
    trigger: { crew: 'everyone', task: 'rescue', tool: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // SETUP: Emergency rescue
      ...NARRATOR("Emergency! The entire crew mobilizes for a dramatic rescue operation!"),
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'cs-center' },
          { action: 'text_popup', text: 'EMERGENCY RESCUE!', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.3, duration: 0.5 },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Full team deployment
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'ds-left', anim: 'spawn_air' },
          { action: 'spawn_character', character: 'robot', position: 'ds-right', anim: 'spawn_air' },
          { action: 'spawn_character', character: 'engineer', position: 'off-left', anim: 'spawn_air' },
          { action: 'spawn_character', character: 'knight', position: 'off-right', anim: 'spawn_air' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'wave' },
          { action: 'text_popup', text: 'RESCUE TEAM!', position: 'center', size: 'large' },
        ],
        delayAfter: 0.4,
      },
      // ACTION: Coordinated rescue
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'interact' },
          { action: 'spawn_character', character: 'mage', position: 'us-center', anim: 'spawn_air' },
          { action: 'react', effect: 'hearts-float', position: 'us-center' },
          { action: 'sfx', sound: 'magic' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Rescue successful
      {
        parallel: [
          { action: 'react', effect: 'stars-spin', position: 'center' },
          { action: 'text_popup', text: 'RESCUE SUCCESS!', position: 'top', size: 'huge' },
        ],
        delayAfter: 0.3,
      },
      // RESOLUTION: Team victory
      ...CELEBRATION(['space_ranger', 'robot', 'engineer', 'knight', 'mage']),
      ...NARRATOR("The entire crew coordinated a perfect rescue — teamwork saves lives!"),
    ],
    feedback: {
      title: '🆘 Team Rescue',
      message: 'Everyone coordinated the perfect rescue!',
      skillTaught: 'Specificity',
      tip: 'Complex rescues need the whole team.',
    },
  },

  // ── everyone + explore ──────────────────────────────────────────────────────
  {
    id: 'ks_everyone_explore',
    description: 'Entire crew explores unknown sector together.',
    trigger: { crew: 'everyone', task: 'explore', tool: '*' },
    tier: 'moderate',
    promptScore: 'perfect',
    steps: [
      // SETUP: Unknown territory
      ...NARRATOR("The entire crew ventures into uncharted territory together!"),
      {
        parallel: [
          { action: 'spawn', asset: 'satellite_dish', position: 'cs-center' },
          { action: 'spawn', asset: 'compass', position: 'far-left' },
          { action: 'spawn', asset: 'map', position: 'far-right' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Full team exploration
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'off-left', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'robot', position: 'off-right', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'engineer', position: 'ds-left', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'knight', position: 'ds-right', anim: 'spawn_ground' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'wave' },
          { action: 'text_popup', text: 'EXPLORE TOGETHER!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.4,
      },
      // ACTION: Coordinated exploration
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'walk' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Sector mapped
      {
        parallel: [
          { action: 'spawn', asset: 'flag', position: 'us-center' },
          { action: 'text_popup', text: 'NEW SECTOR MAPPED!', position: 'top', size: 'large' },
        ],
        delayAfter: 0.3,
      },
      // RESOLUTION: Team discovery
      ...CELEBRATION(['space_ranger', 'robot', 'engineer', 'knight']),
      ...NARRATOR("The entire crew explored and mapped the sector with perfect coordination!"),
    ],
    feedback: {
      title: '🗺️ Team Exploration',
      message: 'Everyone explored as a coordinated unit!',
      skillTaught: 'Specificity',
      tip: 'Team exploration covers more ground.',
    },
  },

  // ── everyone + defend ───────────────────────────────────────────────────────
  {
    id: 'ks_everyone_defend',
    description: 'Full crew forms defensive perimeter around station.',
    trigger: { crew: 'everyone', task: 'defend', tool: '*' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      // SETUP: Station under attack
      ...NARRATOR("The station is under attack — the entire crew forms a defensive perimeter!"),
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'cs-center' },
          { action: 'text_popup', text: 'UNDER ATTACK!', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.4, duration: 0.8 },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      // INTENT: Full team defense
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'ds-left', anim: 'spawn_air' },
          { action: 'spawn_character', character: 'robot', position: 'ds-right', anim: 'spawn_air' },
          { action: 'spawn_character', character: 'engineer', position: 'off-left', anim: 'spawn_air' },
          { action: 'spawn_character', character: 'knight', position: 'off-right', anim: 'spawn_air' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'wave' },
          { action: 'text_popup', text: 'DEFENSIVE POSITIONS!', position: 'center', size: 'large' },
        ],
        delayAfter: 0.4,
      },
      // ACTION: Coordinated defense
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'interact' },
          { action: 'spawn', asset: 'laser_gun', position: 'us-left' },
          { action: 'spawn', asset: 'laser_gun', position: 'us-right' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.8,
      },
      // CONSEQUENCE: Station secured
      ...IMPACT(),
      {
        parallel: [
          { action: 'react', effect: 'explosion-cartoon', position: 'off-top' },
          { action: 'spawn', asset: 'thunder', position: 'far-right' },
          { action: 'spawn', asset: 'crystal_big', position: 'far-left' },
          { action: 'camera_shake', intensity: 0.6, duration: 0.5 },
          { action: 'text_popup', text: 'STATION SECURE!', position: 'top', size: 'huge' },
        ],
        delayAfter: 0.3,
      },
      // RESOLUTION: United defense triumph
      ...CELEBRATION(['space_ranger', 'robot', 'engineer', 'knight']),
      ...NARRATOR("The entire crew defended the station together — unstoppable teamwork!"),
    ],
    feedback: {
      title: '🛡️ Team Defense',
      message: 'Everyone defended the station together!',
      skillTaught: 'Specificity',
      tip: 'Full crew defense is unstoppable.',
    },
  },
];

// ── ASSEMBLE STAGE 1 ────────────────────────────────────────────────────────

const PAIR_VIGNETTES: Vignette[] = [
  ...RANGER_VIGNETTES,
  ...ROBOT_VIGNETTES,
  ...ENGINEER_VIGNETTES,
  ...KNIGHT_VIGNETTES,
  ...EVERYONE_VIGNETTES,

  // ── VIBE/CATEGORY: * + * + laser ────────────────────────────────────────────
  {
    id: 'knight_space_1_partial_laser',
    description: 'A robot fires a laser at the station but nobody knows who sent it or why.',
    trigger: { crew: '*', task: '*', tool: 'laser' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      // Space station setup
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'satellite_dish', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      // Random crew member appears
      {
        parallel: [
          { action: 'spawn_character', character: 'robot', position: 'left', anim: 'spawn_ground' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      // Laser appears
      {
        parallel: [
          { action: 'spawn', asset: 'laser_gun', position: 'center' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'sfx', sound: 'react' },
        ],
        delayAfter: 0.5,
      },
      // Robot uses laser
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'throw' },
          { action: 'react', effect: 'explosion-cartoon', position: 'right' },
          { action: 'camera_shake', intensity: 0.4, duration: 0.5 },
          { action: 'sfx', sound: 'react' },
        ],
        delayAfter: 0.5,
      },
      // Confusion
      {
        parallel: [
          { action: 'emote', character: 'robot', emoji: 'confused' },
          { action: 'react', effect: 'question-marks', position: 'center' },
          { action: 'text_popup', text: '💥 PEW PEW? 💥', position: 'top', size: 'large' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🔫 Laser Shenanigans!',
      message: "You picked a laser! But WHO is using it and WHY? Add a crew member and a task to make this mission complete!",
      skillTaught: 'Detail',
      tip: "Lasers are cool, but they need a purpose! Try 'ranger + defend + laser' for a full mission.",
    },
  },
];

export const KNIGHT_SPACE_STAGE_1: Vignette[] = PAIR_VIGNETTES;

// ─── DEFAULT VIGNETTE (always works) ────────────────────────────────────────

export const KNIGHT_SPACE_DEFAULT: Vignette = {
  id: 'knight_space_default',
  description: 'Space ranger and robot walk in from opposite wings to the space station.',
  trigger: { crew: '*', task: '*', tool: '*' },
  tier: 'subtle',
  promptScore: 'partial',
  steps: [
    // Space station props
    {
      parallel: [
        { action: 'spawn', asset: 'space_station', position: 'center' },
        { action: 'sfx', sound: 'spawn' },
      ],
      delayAfter: 0.5,
    },
    // Duo entrance — ranger from left, robot from right
    ...CONVERGE_MEET('space_ranger', 'robot'),
    {
      parallel: [
        { action: 'animate', character: 'space_ranger', anim: 'wave' },
        { action: 'animate', character: 'robot', anim: 'wave' },
        { action: 'sfx', sound: 'whoosh' },
      ],
      delayAfter: 0.8,
    },
    // Final scene
    {
      parallel: [
        { action: 'react', effect: 'sparkle-magic', position: 'cs-center' },
        { action: 'sfx', sound: 'success' },
        { action: 'text_popup', text: '🛸 SPACE MISSION! 🛸', position: 'center', size: 'large' },
      ],
      delayAfter: 2.0,
    },
  ],
  feedback: {
    title: '🛸 Space Station Online!',
    message: "Something happened at the space station! But WHO fixed it? WHAT did they do? With WHAT tool? Fill in the blanks for a real mission!",
    skillTaught: 'Specificity',
    tip: "Try picking a crew member, a task, and a tool. Each detail makes the mission clearer!",
  },
};

// ─── STAGE 2 VIGNETTES ──────────────────────────────────────────────────────

export const KNIGHT_SPACE_STAGE_2: Vignette[] = [

  // ── ROUTINE: careful approach, routine urgency ─────────────────────────────
  {
    id: 'ks2_routine_careful',
    description: 'Engineer methodically repairs solar panel during routine maintenance check.',
    trigger: { urgency: 'routine', approach: 'careful' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'solar_panel', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'engineer', emoji: '🔧' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
          { action: 'sfx', sound: 'react' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'Cheering' },
          { action: 'text_popup', text: '✅ ROUTINE CHECK COMPLETE', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '✅ Smooth & Steady',
      message: "ROUTINE work with a CAREFUL approach means no drama! Compare that to a CATASTROPHIC repair — you'd see alarms, shaking, and panic!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Repair the solar panel",
        vagueResult: "Someone shows up, does... something? Was it urgent? Calm? Nobody knows!",
      },
      tip: "ROUTINE + CAREFUL = calm, methodical work. Try CRITICAL + FAST for a totally different vibe!",
    },
  },

  // ── ROUTINE: teamwork approach ─────────────────────────────────────────────
  {
    id: 'ks2_routine_teamwork',
    description: 'Everyone works together on routine station cleanup.',
    trigger: { crew: 'everyone', urgency: 'routine', approach: 'teamwork' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'cargo_crate', position: 'left' },
          { action: 'spawn', asset: 'cargo_crate', position: 'right' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'left', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'robot', position: 'right', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'space_ranger', position: 'center', anim: 'spawn_ground' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'wave' },
          { action: 'text_popup', text: '🤝 TEAMWORK TIME!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'react' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'taunt' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🤝 Team Effort',
      message: "ROUTINE + TEAMWORK = calm collaboration! Compare to CRITICAL + FAST where everyone would be scrambling solo!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Fix the station",
        vagueResult: "Someone does something. Was it teamwork? Solo? Urgent? Routine? Who knows!",
      },
      tip: "Approach changes everything! TEAMWORK = coordinated, FAST = solo rush, CREATIVE = unexpected solutions.",
    },
  },

  // ── ROUTINE: creative approach ─────────────────────────────────────────────
  {
    id: 'ks2_routine_creative',
    description: 'Robot finds an unexpected but clever solution to a routine problem.',
    trigger: { crew: 'robot', urgency: 'routine', approach: 'creative' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'satellite_dish', position: 'right' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'robot', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'robot', emoji: '💡' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'interact' },
          { action: 'react', effect: 'question-marks', position: 'center' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'throw' },
          { action: 'spawn', asset: 'mystery_crate', position: 'right' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
          { action: 'sfx', sound: 'react' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'wave' },
          { action: 'text_popup', text: '💡 CREATIVE FIX!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '💡 Clever Solution',
      message: "ROUTINE + CREATIVE = thinking outside the box, even for simple tasks! Compare to ROUTINE + CAREFUL which is by-the-book.",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Have robot fix it",
        vagueResult: "Robot shows up and... does robot things? No urgency, no approach style shown!",
      },
      tip: "CREATIVE approach = unexpected solutions. Try pairing it with CRITICAL urgency for high-stakes innovation!",
    },
  },

  // ── CRITICAL: careful approach ─────────────────────────────────────────────
  {
    id: 'ks2_critical_careful',
    description: 'Ranger carefully defuses a critical reactor situation.',
    trigger: { urgency: 'critical', task: 'repair', approach: 'careful' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'rocket', position: 'right' },
          { action: 'react', effect: 'fire-sneeze', position: 'right' },
          { action: 'text_popup', text: '⚠️ CRITICAL ALERT! ⚠️', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.3, duration: 1.0 },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'space_ranger', emoji: '🔧' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'camera_shake', intensity: 0.2, duration: 0.5 },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'react', effect: 'hearts-float', position: 'center' },
          { action: 'screen_flash', color: 'green', duration: 0.2 },
          { action: 'text_popup', text: '✅ REACTOR STABLE!', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'taunt' },
          { action: 'react', effect: 'stars-spin', position: 'center' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🎯 Precision Under Pressure',
      message: "CRITICAL + CAREFUL = high stakes but steady hands! Compare to ROUTINE + CAREFUL which has no pressure at all.",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Repair it carefully",
        vagueResult: "Someone repairs something carefully. But how urgent was it? No drama shown!",
      },
      tip: "Urgency + approach work together! CRITICAL + CAREFUL = nerve-wracking precision, CRITICAL + FAST = frantic race.",
    },
  },

  // ── CRITICAL: fast approach ────────────────────────────────────────────────
  {
    id: 'ks2_critical_fast',
    description: 'Engineer races against time to launch emergency escape pod.',
    trigger: { urgency: 'critical', task: 'launch', approach: 'fast' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'rocket', position: 'center' },
          { action: 'text_popup', text: '⏰ 10 SECONDS! ⏰', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.4, duration: 1.0 },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'engineer', emoji: '💨' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'interact' },
          { action: 'text_popup', text: '5! 4! 3!', position: 'center', size: 'large' },
          { action: 'camera_shake', intensity: 0.6, duration: 0.5 },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'bottom' },
          { action: 'screen_flash', color: 'orange', duration: 0.3 },
          { action: 'camera_shake', intensity: 0.8, duration: 1.0 },
          { action: 'text_popup', text: '🚀 LIFTOFF! 🚀', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'jump_big' },
          { action: 'react', effect: 'stars-spin', position: 'center' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '⚡ Speed Saves Lives',
      message: "CRITICAL + FAST = racing against the clock! Compare to ROUTINE + FAST which is just... unnecessarily rushed.",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Launch it fast",
        vagueResult: "Someone launches something quickly. But WHY the rush? No stakes shown!",
      },
      tip: "When urgency is CRITICAL, every second counts! FAST approach shows frantic energy.",
    },
  },

  // ── CATASTROPHIC: teamwork approach ────────────────────────────────────────
  {
    id: 'ks2_catastrophic_teamwork',
    description: 'Everyone coordinates to rescue the station from total failure.',
    trigger: { urgency: 'catastrophic', task: 'rescue', approach: 'teamwork' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'react', effect: 'explosion-cartoon', position: 'left' },
          { action: 'react', effect: 'fire-sneeze', position: 'right' },
          { action: 'camera_shake', intensity: 0.7, duration: 2.0 },
          { action: 'text_popup', text: '🚨 CATASTROPHIC FAILURE! 🚨', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'left', anim: 'spawn_air' },
          { action: 'spawn_character', character: 'engineer', position: 'right', anim: 'spawn_air' },
          { action: 'spawn_character', character: 'robot', position: 'center', anim: 'spawn_air' },
          { action: 'camera_shake', intensity: 0.5, duration: 1.0 },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'wave' },
          { action: 'text_popup', text: '👥 TEAM FORMATION!', position: 'center', size: 'large' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'left' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
          { action: 'camera_shake', intensity: 0.3, duration: 1.0 },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'screen_flash', color: 'green', duration: 0.3 },
          { action: 'text_popup', text: '✅ STATION SAVED!', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'jump_big' },
          { action: 'react', effect: 'stars-spin', position: 'center' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🦸 Heroes United',
      message: "CATASTROPHIC + TEAMWORK = all hands on deck for a disaster! Compare to ROUTINE + TEAMWORK which is just... a normal work day.",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Everyone rescue the station",
        vagueResult: "The crew shows up together. Is it calm or catastrophic? Can't tell!",
      },
      tip: "CATASTROPHIC urgency = maximum drama! Pair it with TEAMWORK to show epic coordination.",
    },
  },

  // ── CATASTROPHIC: any approach ─────────────────────────────────────────────
  {
    id: 'ks2_catastrophic_any',
    description: 'Station is exploding, total emergency mode.',
    trigger: { urgency: 'catastrophic' },
    tier: 'spectacular',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'left' },
          { action: 'react', effect: 'fire-sneeze', position: 'right' },
          { action: 'camera_shake', intensity: 0.8, duration: 2.0 },
          { action: 'text_popup', text: '💥 CATASTROPHIC! 💥', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'space_ranger', emoji: 'scared' },
          { action: 'camera_shake', intensity: 0.5, duration: 1.0 },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'react', effect: 'smoke', position: 'center' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 1.5,
      },
    ],
    feedback: {
      title: '💥 Total Chaos',
      message: "CATASTROPHIC urgency = everything is exploding! Compare to ROUTINE which is calm and boring.",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Fix the station",
        vagueResult: "Someone fixes the station. Is it exploding? Routine maintenance? No clue!",
      },
      tip: "Urgency changes EVERYTHING! Try ROUTINE, URGENT, CRITICAL, or CATASTROPHIC to see the difference.",
    },
  },

  // ── URGENT: any task + fast ────────────────────────────────────────────────
  {
    id: 'ks2_urgent_fast',
    description: 'Quick action needed but not life-or-death yet.',
    trigger: { urgency: 'urgent', approach: 'fast' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'cargo_crate', position: 'right' },
          { action: 'text_popup', text: '⚠️ URGENT TASK!', position: 'top', size: 'large' },
          { action: 'camera_shake', intensity: 0.2, duration: 0.5 },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'robot', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'robot', emoji: '💨' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'Cheering' },
          { action: 'text_popup', text: '✅ DONE!', position: 'center', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '💨 Quick Work',
      message: "URGENT + FAST = speedy action before things get worse! Compare to CATASTROPHIC + FAST which is pure panic.",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Do it fast",
        vagueResult: "Someone rushes around. But WHY the hurry? Urgency level = unknown!",
      },
      tip: "URGENT is the middle ground — not calm, not catastrophic, just 'we should hurry'!",
    },
  },

  // ── APPROACH COMBO: creative + any urgency ─────────────────────────────────
  {
    id: 'ks2_creative_wild',
    description: 'Unconventional solution surprises everyone.',
    trigger: { approach: 'creative', tool: 'flag' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'engineer', emoji: '💡' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'flag', position: 'right' },
          { action: 'animate', character: 'engineer', anim: 'throw' },
          { action: 'react', effect: 'question-marks', position: 'center' },
          { action: 'sfx', sound: 'react' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
          { action: 'text_popup', text: '💡 GENIUS IDEA!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'wave' },
          { action: 'react', effect: 'glow-pulse', position: 'center' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🎨 Creative Genius',
      message: "CREATIVE approach = thinking outside the box! Compare to CAREFUL approach which follows the manual.",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Use a flag",
        vagueResult: "Someone uses a flag. Creatively? By-the-book? Fast? Slow? No approach shown!",
      },
      tip: "Approach changes HOW the work happens! Try CAREFUL, FAST, CREATIVE, or TEAMWORK.",
    },
  },

  // ── FAST APPROACH: any urgency ─────────────────────────────────────────────
  {
    id: 'ks2_fast_any',
    description: 'Speed is the priority, precision is optional.',
    trigger: { approach: 'fast' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'rocket', position: 'center' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'left', anim: 'spawn_air' },
          { action: 'emote', character: 'space_ranger', emoji: '💨' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'text_popup', text: '⚡ FAST WORK!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '⚡ Speed Run',
      message: "FAST approach = quick action! But HOW urgent was it? Add ROUTINE, URGENT, CRITICAL, or CATASTROPHIC!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Do it fast",
        vagueResult: "Things happen quickly. But is it urgent? Critical? Just impatient? Can't tell!",
      },
      tip: "Approach + urgency work together! FAST + CATASTROPHIC = panic, FAST + ROUTINE = just... impatient.",
    },
  },

  // ── CAREFUL APPROACH: with urgency mismatch ────────────────────────────────
  {
    id: 'ks2_careful_catastrophic',
    description: 'Being too careful when everything is exploding.',
    trigger: { urgency: 'catastrophic', approach: 'careful' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'react', effect: 'fire-sneeze', position: 'left' },
          { action: 'react', effect: 'explosion-cartoon', position: 'right' },
          { action: 'camera_shake', intensity: 0.8, duration: 2.0 },
          { action: 'text_popup', text: '🚨 CATASTROPHIC! 🚨', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'explosion' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'engineer', emoji: 'thinking' },
          { action: 'camera_shake', intensity: 0.6, duration: 1.0 },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'idle' },
          { action: 'react', effect: 'question-marks', position: 'left' },
          { action: 'camera_shake', intensity: 0.7, duration: 1.0 },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'interact' },
          { action: 'react', effect: 'explosion-cartoon', position: 'center' },
          { action: 'text_popup', text: '💥 TOO SLOW!', position: 'center', size: 'huge' },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🐌 Wrong Speed',
      message: "CATASTROPHIC + CAREFUL = disaster! When everything is exploding, being careful is TOO SLOW. Try CATASTROPHIC + FAST instead!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Be careful when fixing it",
        vagueResult: "Someone is careful. But the station is EXPLODING! Wrong approach for catastrophic!",
      },
      tip: "CATASTROPHIC needs FAST or TEAMWORK. CAREFUL works for ROUTINE or URGENT tasks!",
    },
  },

  // ── TEAMWORK: without enough crew ──────────────────────────────────────────
  {
    id: 'ks2_teamwork_solo',
    description: 'Trying teamwork approach but only one person shows up.',
    trigger: { approach: 'teamwork', crew: 'robot' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'robot', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'robot', emoji: 'confused' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'wave' },
          { action: 'react', effect: 'question-marks', position: 'center' },
          { action: 'text_popup', text: '👥 WHERE IS EVERYONE?', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'react' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'idle' },
          { action: 'react', effect: 'sad-cloud', position: 'left' },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🤖 Solo Teamwork?',
      message: "TEAMWORK approach needs a TEAM! Try 'everyone' for the crew, or switch to CAREFUL or FAST for solo work.",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Use teamwork to fix it",
        vagueResult: "One robot shows up alone. Teamwork? What team? Approach mismatch!",
      },
      tip: "TEAMWORK approach works best with 'everyone' crew! Otherwise use CAREFUL, FAST, or CREATIVE.",
    },
  },

  // ── ROUTINE: fast approach ─────────────────────────────────────────────────
  {
    id: 'ks2_routine_fast',
    description: 'Ranger quickly handles routine cargo inspection without slowing down.',
    trigger: { crew: 'ranger', urgency: 'routine', approach: 'fast' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'cargo_crate', position: 'left' },
          { action: 'spawn', asset: 'cargo_crate', position: 'right' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'space_ranger', emoji: '⚡' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'move', character: 'space_ranger', to: 'center', duration: 0.5 },
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'left' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'move', character: 'space_ranger', to: 'right', duration: 0.5 },
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'taunt' },
          { action: 'text_popup', text: '⚡ QUICK CHECK DONE!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '⚡ Speed Run',
      message: "ROUTINE + FAST = efficient, no-nonsense work! Compare to CATASTROPHIC + FAST where speed becomes frantic panic!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Check the cargo",
        vagueResult: "Someone checks cargo. Fast? Slow? Routine? Emergency? Total mystery!",
      },
      tip: "FAST approach works great for ROUTINE tasks. Try CATASTROPHIC + FAST for a totally different energy!",
    },
  },

  // ── URGENT: careful approach ───────────────────────────────────────────────
  {
    id: 'ks2_urgent_careful',
    description: 'Engineer carefully fixes urgent antenna malfunction to avoid making it worse.',
    trigger: { crew: 'engineer', urgency: 'urgent', approach: 'careful', task: 'repair' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'satellite_dish', position: 'right' },
          { action: 'react', effect: 'smoke', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'left', anim: 'spawn_ground' },
          { action: 'text_popup', text: '⚠️ URGENT REPAIR NEEDED', position: 'top', size: 'large' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'move', character: 'engineer', to: 'right', duration: 1.0 },
          { action: 'emote', character: 'engineer', emoji: '🔧' },
        ],
        delayAfter: 0.8,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'jump_big' },
          { action: 'text_popup', text: '✅ CAREFUL FIX COMPLETE', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🔧 Steady Under Pressure',
      message: "URGENT + CAREFUL = focused precision under time pressure! Compare to URGENT + FAST where you'd see rushing and shortcuts!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Fix the antenna",
        vagueResult: "Someone fixes something. Urgent? Calm? Careful? Rushed? Who can tell!",
      },
      tip: "URGENT situations need an approach! CAREFUL = methodical, FAST = rushing, TEAMWORK = coordinated response.",
    },
  },

  // ── URGENT: creative approach ──────────────────────────────────────────────
  {
    id: 'ks2_urgent_creative',
    description: 'Robot improvises clever workaround for urgent power shortage.',
    trigger: { crew: 'robot', urgency: 'urgent', approach: 'creative', task: 'build' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'solar_panel', position: 'left' },
          { action: 'react', effect: 'question-marks', position: 'center' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'robot', position: 'right', anim: 'spawn_ground' },
          { action: 'emote', character: 'robot', emoji: '💡' },
          { action: 'text_popup', text: '⚠️ URGENT: POWER NEEDED', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'interact' },
          { action: 'spawn', asset: 'battery', position: 'center' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'Cheering' },
          { action: 'react', effect: 'stars-spin', position: 'center' },
          { action: 'text_popup', text: '💡 CLEVER WORKAROUND!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '💡 Innovation Under Pressure',
      message: "URGENT + CREATIVE = thinking fast with unconventional solutions! Compare to ROUTINE + CREATIVE which would be way more relaxed!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Get power working",
        vagueResult: "Someone does something with power. Creative? Standard? Urgent? Routine? Mystery!",
      },
      tip: "CREATIVE approach shines in unexpected situations! Try CATASTROPHIC + CREATIVE for absolute chaos!",
    },
  },

  // ── URGENT: teamwork approach ──────────────────────────────────────────────
  {
    id: 'ks2_urgent_teamwork',
    description: 'Everyone coordinates to handle urgent launch window timing.',
    trigger: { crew: 'everyone', urgency: 'urgent', approach: 'teamwork', task: 'launch' },
    tier: 'spectacular',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'rocket', position: 'right' },
          { action: 'text_popup', text: '⚠️ LAUNCH WINDOW: 2 MIN!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'left', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'robot', position: 'center', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'space_ranger', position: 'right', anim: 'spawn_ground' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'emote', character: 'engineer', emoji: '🔧' },
          { action: 'emote', character: 'robot', emoji: '⚡' },
          { action: 'emote', character: 'space_ranger', emoji: '🚀' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
          { action: 'react', effect: 'hearts-float', position: 'right' },
          { action: 'text_popup', text: '🚀 COORDINATED LAUNCH!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🚀 Team Coordination',
      message: "URGENT + TEAMWORK = synchronized response under time pressure! Compare to ROUTINE + TEAMWORK which is calm and relaxed!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Launch the rocket",
        vagueResult: "Someone launches something. Teamwork? Solo? Urgent? Routine? No idea!",
      },
      tip: "Urgency changes team dynamics! URGENT = coordinated rush, ROUTINE = casual collaboration.",
    },
  },

  // ── CRITICAL: creative approach ────────────────────────────────────────────
  {
    id: 'ks2_critical_creative',
    description: 'Knight uses completely unexpected solution to critical station breach.',
    trigger: { crew: 'knight', urgency: 'critical', approach: 'creative', task: 'defend' },
    tier: 'spectacular',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'camera_shake', intensity: 'medium', duration: 0.5 },
          { action: 'react', effect: 'explosion-cartoon', position: 'right' },
          { action: 'text_popup', text: '🚨 CRITICAL BREACH!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'knight', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'knight', emoji: '🛡️' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'move', character: 'knight', to: 'right', duration: 0.8 },
          { action: 'spawn', asset: 'shield', position: 'right' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'wave' },
          { action: 'react', effect: 'glow-pulse', position: 'right' },
          { action: 'text_popup', text: '🛡️ SHIELD PATCH WORKS!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🛡️ Unconventional Save',
      message: "CRITICAL + CREATIVE = thinking outside the box when stakes are high! A knight using a shield as a hull patch? That's CREATIVE!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Defend the station",
        vagueResult: "Someone defends. Standard procedure? Creative improvisation? Critical emergency? Routine drill? Unknown!",
      },
      tip: "CREATIVE approach means unexpected solutions! Combine with different urgencies for wildly different results!",
    },
  },

  // ── CRITICAL: teamwork approach ────────────────────────────────────────────
  {
    id: 'ks2_critical_teamwork',
    description: 'Everyone coordinates precise response to critical systems failure.',
    trigger: { crew: 'everyone', urgency: 'critical', approach: 'teamwork', task: 'repair' },
    tier: 'spectacular',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'solar_panel', position: 'left' },
          { action: 'spawn', asset: 'satellite_dish', position: 'right' },
          { action: 'react', effect: 'smoke', position: 'center' },
          { action: 'camera_shake', intensity: 'medium', duration: 0.5 },
          { action: 'text_popup', text: '🚨 CRITICAL SYSTEMS DOWN!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'left', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'robot', position: 'center', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'space_ranger', position: 'right', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'knight', position: 'far-right', anim: 'spawn_ground' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'left' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
        ],
        delayAfter: 1.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'wave' },
          { action: 'react', effect: 'stars-spin', position: 'center' },
          { action: 'text_popup', text: '✅ TEAM SAVES THE DAY!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🤝 Critical Coordination',
      message: "CRITICAL + TEAMWORK = coordinated emergency response! Everyone has a role when the stakes are this high!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Fix the systems",
        vagueResult: "Someone fixes something. Team effort? Solo work? Critical? Routine? Mystery!",
      },
      tip: "CRITICAL urgency with TEAMWORK means every crew member matters! Try CATASTROPHIC for even more chaos!",
    },
  },

  // ── CATASTROPHIC: creative approach ────────────────────────────────────────
  {
    id: 'ks2_catastrophic_creative',
    description: 'Ranger improvises desperate last-ditch save during station evacuation.',
    trigger: { crew: 'ranger', urgency: 'catastrophic', approach: 'creative', task: 'rescue' },
    tier: 'spectacular',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'camera_shake', intensity: 'high', duration: 1.0 },
          { action: 'react', effect: 'explosion-cartoon', position: 'left' },
          { action: 'react', effect: 'explosion-cartoon', position: 'right' },
          { action: 'react', effect: 'smoke', position: 'center' },
          { action: 'text_popup', text: '💥 CATASTROPHIC FAILURE!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'space_ranger', emoji: '💡' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'cargo_crate', position: 'right' },
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'taunt' },
          { action: 'react', effect: 'hearts-float', position: 'center' },
          { action: 'text_popup', text: '🚀 ESCAPE POD IMPROVISED!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🚀 Desperate Innovation',
      message: "CATASTROPHIC + CREATIVE = wild improvisation when everything is falling apart! Using a cargo crate as an escape pod? That's CATASTROPHIC creativity!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Rescue everyone",
        vagueResult: "Someone rescues people. Standard procedure? Desperate improvisation? Calm? Chaotic? No clue!",
      },
      tip: "CATASTROPHIC urgency means everything is failing! Add CREATIVE for absolute desperation moves!",
    },
  },

  // ── CATASTROPHIC: fast approach (impossible) ───────────────────────────────
  {
    id: 'ks2_catastrophic_fast',
    description: 'Engineer rushes catastrophic reactor repair — too fast, causes meltdown.',
    trigger: { crew: 'engineer', urgency: 'catastrophic', approach: 'fast', task: 'repair' },
    tier: 'absolute_chaos',
    promptScore: 'chaotic',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'reactor_core', position: 'right' },
          { action: 'camera_shake', intensity: 'high', duration: 1.0 },
          { action: 'react', effect: 'explosion-cartoon', position: 'right' },
          { action: 'text_popup', text: '💥 REACTOR CRITICAL!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'engineer', emoji: '⚡' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'move', character: 'engineer', to: 'right', duration: 0.3 },
          { action: 'animate', character: 'engineer', anim: 'interact' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'react', effect: 'explosion-cartoon', position: 'right' },
          { action: 'react', effect: 'smoke', position: 'center' },
          { action: 'camera_shake', intensity: 'high', duration: 1.0 },
          { action: 'animate', character: 'engineer', anim: 'idle' },
          { action: 'emote', character: 'engineer', emoji: 'scared' },
          { action: 'text_popup', text: '💥 TOO FAST = MELTDOWN!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '💥 Speed vs Safety',
      message: "CATASTROPHIC + FAST = disaster! When everything is failing, rushing makes it WORSE! This needed CAREFUL or TEAMWORK approach!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Fix the reactor",
        vagueResult: "Someone does something. Fast? Careful? Catastrophic emergency? Routine check? Unknown!",
      },
      tip: "CATASTROPHIC situations need careful thought! FAST approach here = game over. Try TEAMWORK or CAREFUL instead!",
    },
  },

  // ── CRITICAL: build task with creative flair ──────────────────────────────
  {
    id: 'ks2_critical_build_creative',
    description: 'Robot creatively assembles emergency dome during critical oxygen leak.',
    trigger: { crew: 'robot', urgency: 'critical', approach: 'creative', task: 'build' },
    tier: 'spectacular',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'react', effect: 'smoke', position: 'right' },
          { action: 'camera_shake', intensity: 'medium', duration: 0.5 },
          { action: 'text_popup', text: '🚨 OXYGEN LEAK!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'robot', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'robot', emoji: '💡' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'interact' },
          { action: 'spawn', asset: 'dome', position: 'right' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'jump_big' },
          { action: 'react', effect: 'glow-pulse', position: 'right' },
          { action: 'text_popup', text: '✅ EMERGENCY DOME UP!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '💡 Critical Creativity',
      message: "CRITICAL + CREATIVE + BUILD = innovative construction under pressure! Robot built an emergency dome on the fly!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Build something",
        vagueResult: "Someone builds. What? Why? How urgent? Creative or standard? Mystery!",
      },
      tip: "Combining CREW + TASK + URGENCY + APPROACH creates unique scenes! Experiment with different combos!",
    },
  },

  // ── URGENT: explore with fast approach ────────────────────────────────────
  {
    id: 'ks2_urgent_explore_fast',
    description: 'Knight rapidly scouts unstable sector before collapse window.',
    trigger: { crew: 'knight', urgency: 'urgent', approach: 'fast', task: 'explore' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'satellite_dish', position: 'far-right' },
          { action: 'react', effect: 'question-marks', position: 'right' },
          { action: 'text_popup', text: '⚠️ SCOUT BEFORE COLLAPSE!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'knight', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'knight', emoji: '⚡' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.3,
      },
      {
        parallel: [
          { action: 'move', character: 'knight', to: 'center', duration: 0.5 },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'sfx', sound: 'react' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'move', character: 'knight', to: 'right', duration: 0.5 },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'knight', anim: 'Cheering' },
          { action: 'text_popup', text: '⚡ RAPID RECON DONE!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '⚡ Speed Scout',
      message: "URGENT + FAST + EXPLORE = rapid scouting under time pressure! Compare to ROUTINE + CAREFUL + EXPLORE which would be leisurely!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Explore the sector",
        vagueResult: "Someone explores. Rushed? Careful? Urgent deadline? Casual survey? Who knows!",
      },
      tip: "TASK + URGENCY + APPROACH all matter! EXPLORE can be calm or frantic depending on your choices!",
    },
  },

  // ── ROUTINE: defend with creative approach ────────────────────────────────
  {
    id: 'ks2_routine_defend_creative',
    description: 'Ranger creatively sets up amusing defense drill during routine training.',
    trigger: { crew: 'ranger', urgency: 'routine', approach: 'creative', task: 'defend' },
    tier: 'moderate',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'turret', position: 'left' },
          { action: 'spawn', asset: 'turret', position: 'right' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'center', anim: 'spawn_ground' },
          { action: 'emote', character: 'space_ranger', emoji: '🎯' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'spawn', asset: 'target_dummy', position: 'far-right' },
          { action: 'react', effect: 'sparkle-magic', position: 'far-right' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'wave' },
          { action: 'react', effect: 'stars-spin', position: 'center' },
          { action: 'text_popup', text: '🎯 CREATIVE DRILL READY!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🎯 Training Innovation',
      message: "ROUTINE + CREATIVE + DEFEND = fun training setup! Compare to CATASTROPHIC + DEFEND which would be actual combat!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Set up defenses",
        vagueResult: "Someone sets up something. Training? Real threat? Creative? Standard? Mystery!",
      },
      tip: "ROUTINE urgency = low stakes! Perfect for trying CREATIVE approaches without risk!",
    },
  },

  // ── CRITICAL: launch with teamwork ────────────────────────────────────────
  {
    id: 'ks2_critical_launch_teamwork',
    description: 'Everyone coordinates emergency satellite launch before communication blackout.',
    trigger: { crew: 'everyone', urgency: 'critical', approach: 'teamwork', task: 'launch' },
    tier: 'spectacular',
    promptScore: 'partial',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'rocket', position: 'right' },
          { action: 'camera_shake', intensity: 'medium', duration: 0.5 },
          { action: 'text_popup', text: '🚨 BLACKOUT IN 90 SEC!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'fail' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'left', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'robot', position: 'center', anim: 'spawn_ground' },
          { action: 'spawn_character', character: 'space_ranger', position: 'right', anim: 'spawn_ground' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'interact' },
          { action: 'emote', character: 'engineer', emoji: '🔧' },
          { action: 'emote', character: 'robot', emoji: '⚡' },
          { action: 'emote', character: 'space_ranger', emoji: '🚀' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
        ],
        delayAfter: 1.2,
      },
      {
        parallel: [
          { action: 'crowd_react', characters: 'all', anim: 'taunt' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
          { action: 'text_popup', text: '🚀 EMERGENCY LAUNCH GO!', position: 'top', size: 'large' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🚀 Emergency Team Launch',
      message: "CRITICAL + TEAMWORK + LAUNCH = coordinated emergency deployment! Every crew member had a vital role in beating the deadline!",
      skillTaught: 'Specificity',
      vagueComparison: {
        vagueInput: "Launch the satellite",
        vagueResult: "Someone launches something. Team? Solo? Critical emergency? Routine test? Unknown!",
      },
      tip: "CREW + TASK + URGENCY + APPROACH = rich storytelling! More details = better scenes!",
    },
  },

];

// ─── STAGE 2 DEFAULT ────────────────────────────────────────────────────────

export const KNIGHT_SPACE_DEFAULT_2: Vignette = {
  id: 'knight_space_default_2',
  description: 'Generic space task with some urgency.',
  trigger: { crew: '*', task: '*', tool: '*', urgency: '*', approach: '*' },
  tier: 'subtle',
  promptScore: 'partial',
  steps: [
    {
      parallel: [
        { action: 'spawn', asset: 'space_station', position: 'center' },
        { action: 'spawn', asset: 'satellite_dish', position: 'right' },
        { action: 'sfx', sound: 'spawn' },
      ],
      delayAfter: 0.5,
    },
    {
      parallel: [
        { action: 'spawn_character', character: 'space_ranger', position: 'left', anim: 'spawn_ground' },
        { action: 'spawn_character', character: 'robot', position: 'right', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'engine' },
      ],
      delayAfter: 0.5,
    },
    {
      parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'wave' },
        { action: 'text_popup', text: '🛸 MISSION START!', position: 'center', size: 'large' },
        { action: 'sfx', sound: 'whoosh' },
      ],
      delayAfter: 2.0,
    },
  ],
  feedback: {
    title: '🛸 Generic Mission',
    message: "Something happened! But HOW urgent was it? ROUTINE, URGENT, CRITICAL, or CATASTROPHIC? And WHAT approach? CAREFUL, FAST, CREATIVE, or TEAMWORK?",
    skillTaught: 'Specificity',
    vagueComparison: {
      vagueInput: "Do the space mission",
      vagueResult: "Crew shows up. Things happen. Calm? Urgent? Careful? Fast? Total mystery!",
    },
    tip: "Stage 2 needs MORE details! Pick urgency (how serious) AND approach (how to handle it).",
  },
};

// ─── STAGE 3 VIGNETTES ──────────────────────────────────────────────────────

export const KNIGHT_SPACE_STAGE_3: Vignette[] = [

  // ── COMBO: solar_panel + laser = Solar Laser ───────────────────────────────
  {
    id: 'ks3_combo_solar_laser',
    description: 'Redirect solar power into a focused laser beam.',
    trigger: { tech1: 'solar_panel', tech2: 'laser' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'spawn', asset: 'solar_panel', position: 'left' },
          { action: 'text_popup', text: '☀️ SOLAR LASER COMBO!', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'engineer', emoji: '🔬' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'laser_gun', position: 'right' },
          { action: 'animate', character: 'engineer', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'left' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
          { action: 'screen_flash', color: 'yellow', duration: 0.3 },
          { action: 'text_popup', text: '⚡ SOLAR BEAM!', position: 'center', size: 'huge' },
          { action: 'sfx', sound: 'magic' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'react', effect: 'explosion-cartoon', position: 'right' },
          { action: 'camera_shake', intensity: 0.5, duration: 0.5 },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'taunt' },
          { action: 'react', effect: 'glow-pulse', position: 'center' },
          { action: 'text_popup', text: '🌟 SOLAR LASER SUCCESS!', position: 'top', size: 'huge' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '⚡ SOLAR LASER!',
      message: "SECRET COMBO UNLOCKED! Solar panel + laser = super-powered solar beam! You combined TWO techs to make something NEW!",
      skillTaught: 'Combo Thinking',
      tip: "Some tech pairs create unique combos! Try mixing different tools to discover more secrets!",
    },
  },

  // ── COMBO: rocket + dome = Escape Pod ──────────────────────────────────────
  {
    id: 'ks3_combo_escape_pod',
    description: 'Build an emergency escape pod from rocket and dome.',
    trigger: { tech1: 'rocket', tech2: 'dome' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'text_popup', text: '🚨 ESCAPE POD COMBO!', position: 'top', size: 'huge' },
          { action: 'camera_shake', intensity: 0.3, duration: 1.0 },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'rocket', position: 'left' },
          { action: 'spawn', asset: 'mystery_crate', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'center', anim: 'spawn_ground' },
          { action: 'emote', character: 'space_ranger', emoji: '🔧' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'left' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
        ],
        delayAfter: 1.0,
      },
      {
        parallel: [
          { action: 'react', effect: 'hearts-float', position: 'center' },
          { action: 'screen_flash', color: 'green', duration: 0.2 },
          { action: 'text_popup', text: '🛸 ESCAPE POD READY!', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'jump_big' },
          { action: 'react', effect: 'stars-spin', position: 'center' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🛸 ESCAPE POD!',
      message: "SECRET COMBO! Rocket + dome = emergency escape pod! Perfect for evacuations!",
      skillTaught: 'Combo Thinking',
      tip: "Rocket gives propulsion, dome gives protection. Together = escape pod! Try more combos!",
    },
  },

  // ── COMBO: cargo + flag = Signal Beacon ────────────────────────────────────
  {
    id: 'ks3_combo_signal_beacon',
    description: 'Turn cargo crate into a signal tower with flag.',
    trigger: { tech1: 'cargo', tech2: 'flag' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'text_popup', text: '🚩 SIGNAL BEACON COMBO!', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'cargo_crate', position: 'center' },
          { action: 'spawn', asset: 'flag', position: 'right' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'robot', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'robot', emoji: '📡' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'throw' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'react', effect: 'stars-spin', position: 'top' },
          { action: 'screen_flash', color: 'blue', duration: 0.2 },
          { action: 'text_popup', text: '📡 SIGNAL BROADCASTING!', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'Cheering' },
          { action: 'react', effect: 'stars-spin', position: 'center' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '📡 SIGNAL BEACON!',
      message: "SECRET COMBO! Cargo crate + flag = emergency signal tower! Perfect for calling help!",
      skillTaught: 'Combo Thinking',
      tip: "Cargo crate is tall, flag is visible. Together = beacon! Try more creative combos!",
    },
  },

  // ── COMBO: laser + dome = Force Shield ─────────────────────────────────────
  {
    id: 'ks3_combo_force_shield',
    description: 'Refract laser through dome to create energy shield.',
    trigger: { tech1: 'laser', tech2: 'dome' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'text_popup', text: '🛡️ FORCE SHIELD COMBO!', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'laser_gun', position: 'left' },
          { action: 'spawn', asset: 'mystery_crate', position: 'right' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'engineer', position: 'center', anim: 'spawn_ground' },
          { action: 'emote', character: 'engineer', emoji: '🔬' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'left' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'react', effect: 'stars-spin', position: 'center' },
          { action: 'screen_flash', color: 'cyan', duration: 0.3 },
          { action: 'text_popup', text: '✨ SHIELD ACTIVATED!', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'engineer', anim: 'wave' },
          { action: 'react', effect: 'sparkle-magic', position: 'center' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🛡️ FORCE SHIELD!',
      message: "SECRET COMBO! Laser + dome = energy shield! Laser refracts through dome to create protection!",
      skillTaught: 'Combo Thinking',
      tip: "Laser for energy, dome for refraction. Together = force field! Science!",
    },
  },

  // ── COMBO: solar_panel + rocket = Solar Sail ───────────────────────────────
  {
    id: 'ks3_combo_solar_sail',
    description: 'Use solar panels to power rocket boost.',
    trigger: { tech1: 'solar_panel', tech2: 'rocket' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'rocket', position: 'center' },
          { action: 'text_popup', text: '🚀 SOLAR SAIL COMBO!', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'engine' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'solar_panel', position: 'left' },
          { action: 'spawn', asset: 'solar_panel', position: 'right' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'space_ranger', position: 'left', anim: 'spawn_ground' },
          { action: 'emote', character: 'space_ranger', emoji: '☀️' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'left' },
          { action: 'react', effect: 'sparkle-magic', position: 'right' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'react', effect: 'fire-sneeze', position: 'center' },
          { action: 'screen_flash', color: 'orange', duration: 0.3 },
          { action: 'camera_shake', intensity: 0.4, duration: 0.5 },
          { action: 'text_popup', text: '🌟 SOLAR BOOST!', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'space_ranger', anim: 'taunt' },
          { action: 'react', effect: 'glow-pulse', position: 'center' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '☀️ SOLAR SAIL!',
      message: "SECRET COMBO! Solar panel + rocket = solar-powered propulsion! Unlimited fuel from the sun!",
      skillTaught: 'Combo Thinking',
      tip: "Solar panels generate power, rocket needs power. Together = infinite range!",
    },
  },

  // ── COMBO: cargo + rocket = Cargo Cannon ───────────────────────────────────
  {
    id: 'ks3_combo_cargo_cannon',
    description: 'Launch supplies using rocket-powered cargo system.',
    trigger: { tech1: 'cargo', tech2: 'rocket' },
    tier: 'spectacular',
    promptScore: 'perfect',
    steps: [
      {
        parallel: [
          { action: 'spawn', asset: 'space_station', position: 'center' },
          { action: 'text_popup', text: '📦 CARGO CANNON COMBO!', position: 'top', size: 'huge' },
          { action: 'sfx', sound: 'spawn' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn', asset: 'cargo_crate', position: 'left' },
          { action: 'spawn', asset: 'rocket', position: 'right' },
          { action: 'sfx', sound: 'impact' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'spawn_character', character: 'robot', position: 'center', anim: 'spawn_ground' },
          { action: 'emote', character: 'robot', emoji: '🚀' },
          { action: 'sfx', sound: 'whoosh' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'interact' },
          { action: 'react', effect: 'sparkle-magic', position: 'left' },
          { action: 'sfx', sound: 'laser' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'react', effect: 'explosion-cartoon', position: 'right' },
          { action: 'react', effect: 'fire-sneeze', position: 'bottom' },
          { action: 'camera_shake', intensity: 0.6, duration: 0.5 },
          { action: 'text_popup', text: '💥 LAUNCHING CARGO!', position: 'center', size: 'huge' },
          { action: 'sfx', sound: 'success' },
        ],
        delayAfter: 0.5,
      },
      {
        parallel: [
          { action: 'animate', character: 'robot', anim: 'jump_big' },
          { action: 'react', effect: 'hearts-float', position: 'center' },
        ],
        delayAfter: 2.0,
      },
    ],
    feedback: {
      title: '🚀 CARGO CANNON!',
      message: "SECRET COMBO! Cargo + rocket = supply launcher! Deliver supplies anywhere instantly!",
      skillTaught: 'Combo Thinking',
      tip: "Cargo holds supplies, rocket launches them. Together = rescue missions!",
    },
  },

];

// ─── STAGE 3 DEFAULT ────────────────────────────────────────────────────────

export const KNIGHT_SPACE_DEFAULT_3: Vignette = {
  id: 'knight_space_default_3',
  description: 'Generic tech combination without a special combo.',
  trigger: { tech1: '*', tech2: '*', crisis: '*', location: '*' },
  tier: 'subtle',
  promptScore: 'partial',
  steps: [
    {
      parallel: [
        { action: 'spawn', asset: 'space_station', position: 'center' },
        { action: 'spawn', asset: 'cargo_crate', position: 'left' },
        { action: 'spawn', asset: 'mystery_crate', position: 'right' },
        { action: 'sfx', sound: 'impact' },
      ],
      delayAfter: 0.5,
    },
    {
      parallel: [
        { action: 'spawn_character', character: 'engineer', position: 'left', anim: 'spawn_ground' },
        { action: 'spawn_character', character: 'robot', position: 'right', anim: 'spawn_ground' },
        { action: 'sfx', sound: 'whoosh' },
      ],
      delayAfter: 0.5,
    },
    {
      parallel: [
        { action: 'crowd_react', characters: 'all', anim: 'wave' },
        { action: 'react', effect: 'question-marks', position: 'center' },
        { action: 'text_popup', text: '🤔 COMBO?', position: 'center', size: 'large' },
        { action: 'sfx', sound: 'react' },
      ],
      delayAfter: 2.0,
    },
  ],
  feedback: {
    title: '🤔 Not a Secret Combo',
    message: "Those two techs don't create a special combo... YET! Try different pairs like solar_panel + laser, or rocket + dome!",
    skillTaught: 'Combo Thinking',
    tip: "Only CERTAIN tech pairs unlock secret combos! Experiment to find the 6 hidden combinations!",
  },
};
