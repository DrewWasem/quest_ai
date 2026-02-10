import type { SceneScript } from '../types/scene-script';

/**
 * Hardcoded fallback scripts — used as Tier 3 when cache misses AND API fails.
 * These guarantee the demo NEVER shows an error screen.
 */
export const FALLBACK_SCRIPTS: Record<string, SceneScript> = {
  'monster-party': {
    success_level: 'PARTIAL_SUCCESS',
    narration: 'The monster tries to party, but something feels incomplete!',
    actions: [
      { type: 'spawn', target: 'cake', position: 'left' },
      { type: 'move', target: 'cake', to: 'center', style: 'arc' },
      { type: 'animate', target: 'monster', anim: 'confused', duration_ms: 600 },
      { type: 'react', effect: 'question-marks', position: 'center' },
    ],
    missing_elements: ['decorations', 'entertainment'],
    prompt_feedback: 'Good start! Try describing what KIND of party the monster should have — what decorations, food, and fun activities?',
  },

  'robot-pizza': {
    success_level: 'PARTIAL_SUCCESS',
    narration: 'The robot picks up the pizza but looks lost!',
    actions: [
      { type: 'spawn', target: 'robot', position: 'left' },
      { type: 'spawn', target: 'pizza', position: 'center' },
      { type: 'move', target: 'robot', to: 'center', style: 'linear' },
      { type: 'animate', target: 'robot', anim: 'confused', duration_ms: 600 },
    ],
    missing_elements: ['delivery destination', 'obstacles to avoid'],
    prompt_feedback: 'Nice try! Tell the robot WHERE to deliver the pizza and what to watch out for on the way.',
  },

  'wizard-kitchen': {
    success_level: 'PARTIAL_SUCCESS',
    narration: 'The wizard zaps the toaster, but the plates keep flying!',
    actions: [
      { type: 'spawn', target: 'toaster', position: 'right' },
      { type: 'spawn', target: 'plates', position: 'top' },
      { type: 'animate', target: 'wizard', anim: 'wave', duration_ms: 600 },
      { type: 'react', effect: 'sparkle-magic', position: 'right' },
    ],
    missing_elements: ['soup solution', 'fridge solution', 'plates solution'],
    prompt_feedback: 'Good start! Try describing HOW to fix each appliance — the plates, the soup, the toaster, and the fridge.',
  },

  'dinosaur-school': {
    success_level: 'PARTIAL_SUCCESS',
    narration: 'The T-Rex squeezes through the door but breaks the desk!',
    actions: [
      { type: 'spawn', target: 'desk', position: 'center' },
      { type: 'move', target: 'trex', to: 'center', style: 'bounce' },
      { type: 'react', effect: 'explosion-cartoon', position: 'center' },
      { type: 'animate', target: 'trex', anim: 'sad', duration_ms: 600 },
    ],
    missing_elements: ['writing solution', 'sitting solution', 'eating solution'],
    prompt_feedback: 'Nice try! Think about each problem the T-Rex faces: the door, the desk, the pencil, and lunch.',
  },

  'dog-space': {
    success_level: 'PARTIAL_SUCCESS',
    narration: 'The dog hops in the rocket but forgot the snacks!',
    actions: [
      { type: 'spawn', target: 'rocket', position: 'center' },
      { type: 'move', target: 'dog', to: 'center', style: 'bounce' },
      { type: 'animate', target: 'dog', anim: 'happy', duration_ms: 600 },
      { type: 'react', effect: 'question-marks', position: 'right' },
    ],
    missing_elements: ['safety gear', 'supplies', 'mission goal'],
    prompt_feedback: 'Great start! Think about what the dog needs: a rocket, a spacesuit, food, and a goal for the trip.',
  },

  'octopus-band': {
    success_level: 'PARTIAL_SUCCESS',
    narration: 'The octopus grabs a guitar but has no stage!',
    actions: [
      { type: 'spawn', target: 'guitar', position: 'left' },
      { type: 'move', target: 'octopus', to: 'left', style: 'float' },
      { type: 'animate', target: 'octopus', anim: 'dance', duration_ms: 600 },
      { type: 'react', effect: 'stars-spin', position: 'center' },
    ],
    missing_elements: ['more instruments', 'venue/stage', 'audience'],
    prompt_feedback: 'Good start! Try describing which instruments, where the concert happens, what song they play, and who watches.',
  },
};
