/**
 * Movement Templates — reusable building blocks for character and object choreography.
 *
 * Usage: spread into a vignette's steps array:
 *   steps: [
 *     ...ENTER_FROM_LEFT('knight'),
 *     ...OBJECT_GROW_REVEAL('cake_birthday', 'cs-center'),
 *     ...CHARACTER_SPEAK('knight', 'excited', "Is that for me?!"),
 *     ...CELEBRATION(['knight', 'mage']),
 *   ]
 */
import type { VignetteStep } from '../types/madlibs'

// ─── CHARACTER ENTRANCE PATTERNS ────────────────────────────────────────────

/** Character walks in from stage left */
export function ENTER_FROM_LEFT(character: string, targetPos = 'cs-left'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn_character', character, position: 'off-left' },
      { action: 'animate', character, anim: 'Walking_A' },
      { action: 'sfx', sound: 'footstep' },
    ], delayAfter: 0.3 },
    { parallel: [
      { action: 'move', character, to: targetPos, style: 'linear' },
    ], delayAfter: 1.0 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

/** Character walks in from stage right */
export function ENTER_FROM_RIGHT(character: string, targetPos = 'cs-right'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn_character', character, position: 'off-right' },
      { action: 'animate', character, anim: 'Walking_A' },
      { action: 'sfx', sound: 'footstep' },
    ], delayAfter: 0.3 },
    { parallel: [
      { action: 'move', character, to: targetPos, style: 'linear' },
    ], delayAfter: 1.0 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

/** Multiple characters walk in together from stage left (saves steps vs individual ENTER_FROM_LEFT) */
export function GROUP_ENTER_LEFT(chars: Array<[string, string?]>): VignetteStep[] {
  return [
    { parallel: [
      ...chars.map(([c]) => ({ action: 'spawn_character' as const, character: c, position: 'off-left' })),
      ...chars.map(([c]) => ({ action: 'animate' as const, character: c, anim: 'Walking_A' })),
      { action: 'sfx', sound: 'footstep' },
    ], delayAfter: 0.3 },
    { parallel: [
      ...chars.map(([c, pos]) => ({ action: 'move' as const, character: c, to: pos ?? 'cs-left', style: 'linear' })),
    ], delayAfter: 1.0 },
    { parallel: [
      ...chars.map(([c]) => ({ action: 'animate' as const, character: c, anim: 'Idle_A' })),
    ], delayAfter: 0.3 },
  ]
}

/** Multiple characters walk in together from stage right (saves steps vs individual ENTER_FROM_RIGHT) */
export function GROUP_ENTER_RIGHT(chars: Array<[string, string?]>): VignetteStep[] {
  return [
    { parallel: [
      ...chars.map(([c]) => ({ action: 'spawn_character' as const, character: c, position: 'off-right' })),
      ...chars.map(([c]) => ({ action: 'animate' as const, character: c, anim: 'Walking_A' })),
      { action: 'sfx', sound: 'footstep' },
    ], delayAfter: 0.3 },
    { parallel: [
      ...chars.map(([c, pos]) => ({ action: 'move' as const, character: c, to: pos ?? 'cs-right', style: 'linear' })),
    ], delayAfter: 1.0 },
    { parallel: [
      ...chars.map(([c]) => ({ action: 'animate' as const, character: c, anim: 'Idle_A' })),
    ], delayAfter: 0.3 },
  ]
}

/** Character sneaks in quietly from left */
export function SNEAK_IN_LEFT(character: string, targetPos = 'cs-left'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn_character', character, position: 'off-left' },
      { action: 'animate', character, anim: 'Walking_B' },
    ], delayAfter: 0.3 },
    { parallel: [
      { action: 'move', character, to: targetPos, style: 'linear' },
      { action: 'emote', character, emoji: 'sneaky' },
    ], delayAfter: 1.5 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

/** Character charges in running from left */
export function CHARGE_IN_LEFT(character: string, targetPos = 'cs-center'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn_character', character, position: 'off-left' },
      { action: 'animate', character, anim: 'Running_A' },
      { action: 'sfx', sound: 'whoosh' },
    ], delayAfter: 0.2 },
    { parallel: [
      { action: 'move', character, to: targetPos, style: 'linear' },
    ], delayAfter: 0.8 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.2 },
  ]
}

/** Character charges in running from right */
export function CHARGE_IN_RIGHT(character: string, targetPos = 'cs-center'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn_character', character, position: 'off-right' },
      { action: 'animate', character, anim: 'Running_A' },
      { action: 'sfx', sound: 'whoosh' },
    ], delayAfter: 0.2 },
    { parallel: [
      { action: 'move', character, to: targetPos, style: 'linear' },
    ], delayAfter: 0.8 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.2 },
  ]
}

/** Character drops in from above with bounce */
export function DROP_IN(character: string, targetPos = 'cs-center'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn_character', character, position: targetPos },
      { action: 'animate', character, anim: 'Spawn_Air' },
      { action: 'react', effect: 'dust', position: targetPos },
      { action: 'sfx', sound: 'thud' },
    ], delayAfter: 0.8 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

/** Character appears with magic flash */
export function TELEPORT_IN(character: string, targetPos = 'cs-center'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'screen_flash', color: 'white', duration: 0.15 },
      { action: 'sfx', sound: 'magic' },
    ], delayAfter: 0.2 },
    { parallel: [
      { action: 'spawn_character', character, position: targetPos },
      { action: 'react', effect: 'sparkle-magic', position: targetPos },
    ], delayAfter: 0.5 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

// ─── CHARACTER MOVEMENT ─────────────────────────────────────────────────────

/** Character walks casually to new position */
export function WALK_TO(character: string, targetPos: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Walking_A' },
      { action: 'move', character, to: targetPos, style: 'linear' },
      { action: 'sfx', sound: 'footstep' },
    ], delayAfter: 1.0 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

/** Character runs to new position */
export function RUN_TO(character: string, targetPos: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Running_A' },
      { action: 'move', character, to: targetPos, style: 'linear' },
      { action: 'sfx', sound: 'whoosh' },
    ], delayAfter: 0.7 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.2 },
  ]
}

/** Character leaps/jumps to a new position */
export function JUMP_TO(character: string, targetPos: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Running_A' },
    ], delayAfter: 0.2 },
    { parallel: [
      { action: 'move', character, to: targetPos, style: 'arc' },
      { action: 'sfx', sound: 'whoosh' },
    ], delayAfter: 0.6 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
      { action: 'react', effect: 'dust', position: targetPos },
      { action: 'sfx', sound: 'thud' },
    ], delayAfter: 0.3 },
  ]
}

/** Character dodges sideways quickly */
export function DODGE(character: string, direction: 'left' | 'right'): VignetteStep[] {
  const target = direction === 'left' ? 'cs-left' : 'cs-right'
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Running_A' },
      { action: 'move', character, to: target, style: 'linear' },
      { action: 'sfx', sound: 'whoosh' },
    ], delayAfter: 0.5 },
  ]
}

/** Character runs in arc pattern around stage */
export function CIRCLE_AROUND(character: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Running_A' },
      { action: 'move', character, to: 'cs-right', style: 'arc' },
      { action: 'sfx', sound: 'footstep' },
    ], delayAfter: 0.8 },
    { parallel: [
      { action: 'move', character, to: 'ds-center', style: 'arc' },
    ], delayAfter: 0.6 },
    { parallel: [
      { action: 'move', character, to: 'cs-left', style: 'arc' },
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.8 },
  ]
}

/** Character paces nervously back and forth */
export function PACE(character: string, pos1 = 'cs-left', pos2 = 'cs-right'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Walking_A' },
      { action: 'move', character, to: pos2, style: 'linear' },
    ], delayAfter: 0.8 },
    { parallel: [
      { action: 'move', character, to: pos1, style: 'linear' },
    ], delayAfter: 0.8 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

// ─── CHARACTER EXITS ────────────────────────────────────────────────────────

/** Character flees off-stage left in panic */
export function FLEE_LEFT(character: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Running_A' },
      { action: 'react', effect: 'scared', position: 'cs-center' },
      { action: 'sfx', sound: 'whoosh' },
    ], delayAfter: 0.2 },
    { parallel: [
      { action: 'move', character, to: 'off-left', style: 'linear' },
      { action: 'emote', character, emoji: 'scared', text: 'AHHHH!' },
    ], delayAfter: 1.0 },
  ]
}

/** Character flees off-stage right in panic */
export function FLEE_RIGHT(character: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Running_A' },
      { action: 'react', effect: 'scared', position: 'cs-center' },
      { action: 'sfx', sound: 'whoosh' },
    ], delayAfter: 0.2 },
    { parallel: [
      { action: 'move', character, to: 'off-right', style: 'linear' },
      { action: 'emote', character, emoji: 'scared', text: 'RUN!' },
    ], delayAfter: 1.0 },
  ]
}

/** Character walks calmly off-stage */
export function EXIT_WALK(character: string, direction: 'left' | 'right' = 'right'): VignetteStep[] {
  const target = direction === 'left' ? 'off-left' : 'off-right'
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Walking_A' },
      { action: 'move', character, to: target, style: 'linear' },
      { action: 'sfx', sound: 'footstep' },
    ], delayAfter: 1.2 },
  ]
}

// ─── MULTI-CHARACTER PATTERNS ───────────────────────────────────────────────

/** Two characters approach each other from opposite sides and meet center */
export function CONVERGE_MEET(charLeft: string, charRight: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn_character', character: charLeft, position: 'off-left' },
      { action: 'spawn_character', character: charRight, position: 'off-right' },
      { action: 'animate', character: charLeft, anim: 'Walking_A' },
      { action: 'animate', character: charRight, anim: 'Walking_A' },
      { action: 'sfx', sound: 'footstep' },
    ], delayAfter: 0.3 },
    { parallel: [
      { action: 'move', character: charLeft, to: 'cs-left', style: 'linear' },
      { action: 'move', character: charRight, to: 'cs-right', style: 'linear' },
    ], delayAfter: 1.2 },
    { parallel: [
      { action: 'animate', character: charLeft, anim: 'Idle_A' },
      { action: 'animate', character: charRight, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

/** Character A chases character B across stage */
export function CHASE(chaser: string, runner: string, toPos = 'cs-right'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character: runner, anim: 'Running_A' },
      { action: 'emote', character: runner, emoji: 'scared', text: 'Oh no!' },
      { action: 'sfx', sound: 'whoosh' },
    ], delayAfter: 0.3 },
    { parallel: [
      { action: 'move', character: runner, to: toPos, style: 'linear' },
      { action: 'animate', character: chaser, anim: 'Running_A' },
      { action: 'emote', character: chaser, emoji: 'angry', text: 'Get back here!' },
    ], delayAfter: 0.4 },
    { parallel: [
      { action: 'move', character: chaser, to: toPos, style: 'linear' },
    ], delayAfter: 0.8 },
  ]
}

/** Multiple characters scatter to different positions */
export function SCATTER(characters: string[], positions: string[]): VignetteStep[] {
  return [
    { parallel: [
      ...characters.map(c => ({ action: 'animate' as const, character: c, anim: 'Running_A' })),
      { action: 'sfx', sound: 'whoosh' },
    ], delayAfter: 0.2 },
    { parallel: characters.map((c, i) => ({
      action: 'move' as const, character: c,
      to: positions[i % positions.length], style: 'linear',
    })), delayAfter: 0.8 },
  ]
}

/** Multiple characters walk toward a center point */
export function GATHER(characters: string[], centerPos = 'cs-center'): VignetteStep[] {
  return [
    { parallel: [
      ...characters.map(c => ({ action: 'animate' as const, character: c, anim: 'Walking_A' })),
      { action: 'sfx', sound: 'footstep' },
    ], delayAfter: 0.2 },
    { parallel: characters.map(c => ({
      action: 'move' as const, character: c,
      to: centerPos, style: 'linear',
    })), delayAfter: 1.0 },
    { parallel: characters.map(c => ({
      action: 'animate' as const, character: c, anim: 'Idle_A',
    })), delayAfter: 0.3 },
  ]
}

// ─── OBJECT MOVEMENT PATTERNS ───────────────────────────────────────────────

/** Object drops from sky and lands with impact */
export function OBJECT_DROP(asset: string, position: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn', asset, position, spawnStyle: 'drop' },
      { action: 'sfx', sound: 'thud' },
    ], delayAfter: 0.5 },
    { parallel: [
      { action: 'react', effect: 'dust', position },
    ], delayAfter: 0.3 },
  ]
}

/** Object slides in from off-stage */
export function OBJECT_SLIDE_IN(asset: string, from: string, to: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn', asset, position: from },
      { action: 'sfx', sound: 'move' },
    ], delayAfter: 0.2 },
    { parallel: [
      { action: 'move', asset, to, style: 'linear' },
    ], delayAfter: 0.8 },
  ]
}

/** Object grows from tiny to dramatic reveal */
export function OBJECT_GROW_REVEAL(asset: string, position: string, finalScale = 2.0): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn', asset, position, scale: 0.1 },
    ], delayAfter: 0.2 },
    { parallel: [
      { action: 'grow', asset, scale: finalScale, duration: 1000 },
      { action: 'react', effect: 'sparkle-magic', position },
      { action: 'sfx', sound: 'magic' },
    ], delayAfter: 1.2 },
  ]
}

/** Object launches upward (like a rocket) */
export function OBJECT_LAUNCH(asset: string, fromPos: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'react', effect: 'fire', position: fromPos },
      { action: 'camera_shake', intensity: 0.3, duration: 0.5 },
      { action: 'sfx', sound: 'engine' },
    ], delayAfter: 0.3 },
    { parallel: [
      { action: 'move', asset, to: 'off-right', style: 'arc' },
      { action: 'react', effect: 'smoke', position: fromPos },
    ], delayAfter: 1.0 },
  ]
}

/** Object spins in from off-stage dramatically */
export function OBJECT_SPIN_IN(asset: string, position: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn', asset, position: 'off-left' },
      { action: 'sfx', sound: 'whoosh' },
    ], delayAfter: 0.1 },
    { parallel: [
      { action: 'move', asset, to: position, style: 'arc' },
      { action: 'react', effect: 'sparkle-magic', position },
    ], delayAfter: 0.8 },
  ]
}

/** Rain of objects from sky */
export function OBJECT_RAIN(asset: string, count = 8, area: 'wide' | 'center' = 'wide'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn_rain', asset, quantity: count, position: area },
    ], delayAfter: 2.0 },
  ]
}

/** Object shrinks and pops away */
export function OBJECT_SHRINK_POP(asset: string, effect = 'confetti-burst'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'shrink_pop', asset, effect, duration: 500 },
      { action: 'sfx', sound: 'react' },
    ], delayAfter: 0.7 },
  ]
}

/** Object floats up gently (like magic) */
export function OBJECT_FLOAT_UP(asset: string, position: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn', asset, position },
      { action: 'sfx', sound: 'magic' },
    ], delayAfter: 0.2 },
    { parallel: [
      { action: 'move', asset, to: position, style: 'arc' },
      { action: 'react', effect: 'sparkle-magic', position },
    ], delayAfter: 1.0 },
  ]
}

/** Pile of objects spawning in quick succession */
export function OBJECT_PILE(assets: string[], position: string): VignetteStep[] {
  return assets.map((asset, i) => ({
    parallel: [
      { action: 'spawn' as const, asset, position, spawnStyle: 'drop' as const },
      ...(i > 0 ? [{ action: 'sfx' as const, sound: 'thud' }] : []),
    ],
    delayAfter: 0.3,
  }))
}

/** Object slides from one character to another (serving/passing) */
export function OBJECT_SERVE(asset: string, fromPos: string, toPos: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn', asset, position: fromPos },
      { action: 'sfx', sound: 'move' },
    ], delayAfter: 0.2 },
    { parallel: [
      { action: 'move', asset, to: toPos, style: 'linear' },
    ], delayAfter: 0.6 },
  ]
}

// ─── DIALOGUE PATTERNS ──────────────────────────────────────────────────────

/** Single character speaks with talking animation */
export function CHARACTER_SPEAK(character: string, emoji: string, text: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Waving' },
      { action: 'emote', character, emoji, text },
    ], delayAfter: 2.0 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

/** Character thinks/reacts silently */
export function CHARACTER_THINK(character: string, emoji: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'emote', character, emoji },
    ], delayAfter: 1.5 },
  ]
}

/** Two characters have a conversation (back-and-forth) */
export function DIALOGUE(
  char1: string, char1Emoji: string, char1Text: string,
  char2: string, char2Emoji: string, char2Text: string,
): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character: char1, anim: 'Waving' },
      { action: 'emote', character: char1, emoji: char1Emoji, text: char1Text },
    ], delayAfter: 2.2 },
    { parallel: [
      { action: 'animate', character: char1, anim: 'Idle_A' },
      { action: 'animate', character: char2, anim: 'Waving' },
      { action: 'emote', character: char2, emoji: char2Emoji, text: char2Text },
    ], delayAfter: 2.2 },
    { parallel: [
      { action: 'animate', character: char2, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

/** Character reacts with emotion effect */
export function EMOTIONAL_REACT(character: string, emotion: string, position: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'react', effect: emotion, position },
      { action: 'animate', character, anim: 'Hit_A' },
    ], delayAfter: 0.8 },
  ]
}

/** Character exclaims with excitement + camera shake */
export function CHARACTER_EXCLAIM(character: string, emoji: string, text: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Cheering' },
      { action: 'emote', character, emoji, text },
      { action: 'camera_shake', intensity: 0.2, duration: 0.3 },
    ], delayAfter: 2.0 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

// ─── SCENE TRANSITIONS ──────────────────────────────────────────────────────

/** Narrator announces scene with dramatic text */
export function NARRATOR(text: string, size: 'small' | 'large' | 'huge' = 'large'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'text_popup', text, position: 'center', size },
    ], delayAfter: 1.5 },
  ]
}

/** Dramatic flash + screen shake for impact */
export function IMPACT(color = 'white', shakeIntensity = 0.5): VignetteStep[] {
  return [
    { parallel: [
      { action: 'screen_flash', color, duration: 0.2 },
      { action: 'camera_shake', intensity: shakeIntensity, duration: 0.5 },
      { action: 'sfx', sound: 'impact' },
    ], delayAfter: 0.6 },
  ]
}

/** Everyone celebrates */
export function CELEBRATION(characters: string[], effectPos = 'cs-center'): VignetteStep[] {
  return [
    { parallel: [
      ...characters.map(c => ({ action: 'animate' as const, character: c, anim: 'Cheering' })),
      { action: 'react', effect: 'confetti-burst', position: effectPos },
      { action: 'sfx', sound: 'success' },
    ], delayAfter: 0.5 },
    { parallel: [
      { action: 'react', effect: 'celebrating', position: effectPos },
    ], delayAfter: 1.0 },
  ]
}

/** Everyone fails / disappointment */
export function DISAPPOINTMENT(characters: string[], effectPos = 'cs-center'): VignetteStep[] {
  return [
    { parallel: [
      ...characters.map(c => ({ action: 'animate' as const, character: c, anim: 'Hit_A' })),
      { action: 'react', effect: 'sad-cloud', position: effectPos },
      { action: 'sfx', sound: 'fail' },
    ], delayAfter: 0.5 },
    { parallel: [
      { action: 'react', effect: 'question-marks', position: effectPos },
    ], delayAfter: 1.0 },
  ]
}

/** Dramatic pause — silence before a payoff */
export function DRAMATIC_PAUSE(duration = 1.5): VignetteStep[] {
  return [
    { parallel: [
      { action: 'delay', duration: duration * 1000 },
    ], delayAfter: duration },
  ]
}

// ─── CROWD REACTIONS ─────────────────────────────────────────────────────────

/** All characters on stage cheer together */
export function CROWD_CHEER(characters: string[] = []): VignetteStep[] {
  return [
    { parallel: [
      { action: 'crowd_react', characters: characters.length ? characters : 'all', anim: 'Cheering' },
      { action: 'sfx', sound: 'success' },
    ], delayAfter: 1.0 },
  ]
}

/** All characters gasp in shock */
export function CROWD_GASP(characters: string[] = []): VignetteStep[] {
  return [
    { parallel: [
      { action: 'crowd_react', characters: characters.length ? characters : 'all', anim: 'Hit_A' },
      { action: 'sfx', sound: 'react' },
    ], delayAfter: 0.8 },
  ]
}

// ─── SPECIAL ACTIONS ─────────────────────────────────────────────────────────

/** Character casts a spell with magic effects */
export function SPELL_CAST(character: string, targetPos = 'cs-center'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Casting_Long' },
      { action: 'sfx', sound: 'magic' },
    ], delayAfter: 0.5 },
    { parallel: [
      { action: 'react', effect: 'sparkle-magic', position: targetPos },
      { action: 'react', effect: 'magic_circle', position: targetPos },
      { action: 'screen_flash', color: 'purple', duration: 0.15 },
    ], delayAfter: 0.8 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

/** Character performs a work action (hammering, chopping, etc.) */
export function WORK_ACTION(character: string, anim: string, sfx = 'impact'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim },
      { action: 'sfx', sound: sfx },
    ], delayAfter: 1.0 },
    { parallel: [
      { action: 'animate', character, anim },
      { action: 'sfx', sound: sfx },
    ], delayAfter: 1.0 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

/** Object transforms — shrink old object, grow new one in its place */
export function OBJECT_TRANSFORM(oldAsset: string, newAsset: string, position: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'shrink_pop', asset: oldAsset, effect: 'sparkle-magic', duration: 500 },
      { action: 'sfx', sound: 'magic' },
    ], delayAfter: 0.5 },
    { parallel: [
      { action: 'spawn', asset: newAsset, position, scale: 0.1 },
    ], delayAfter: 0.1 },
    { parallel: [
      { action: 'grow', asset: newAsset, scale: 1.5, duration: 800 },
      { action: 'react', effect: 'sparkle-magic', position },
      { action: 'sfx', sound: 'react' },
    ], delayAfter: 1.0 },
  ]
}

/** Character bounces in from side with arc movement */
export function BOUNCE_ENTRANCE(character: string, targetPos = 'cs-center', from: 'left' | 'right' = 'left'): VignetteStep[] {
  const offStage = from === 'left' ? 'off-left' : 'off-right'
  return [
    { parallel: [
      { action: 'spawn_character', character, position: offStage },
      { action: 'animate', character, anim: 'Running_A' },
      { action: 'sfx', sound: 'whoosh' },
    ], delayAfter: 0.2 },
    { parallel: [
      { action: 'move', character, to: targetPos, style: 'bounce' },
    ], delayAfter: 0.8 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
      { action: 'react', effect: 'dust', position: targetPos },
      { action: 'sfx', sound: 'thud' },
    ], delayAfter: 0.3 },
  ]
}

/** Character gets hit and reacts dramatically */
export function HIT_REACT(character: string, effectPos?: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Hit_A' },
      { action: 'react', effect: 'explosion-cartoon', position: effectPos ?? 'cs-center' },
      { action: 'camera_shake', intensity: 0.3, duration: 0.3 },
      { action: 'sfx', sound: 'impact' },
    ], delayAfter: 0.8 },
    { parallel: [
      { action: 'emote', character, emoji: 'hurt' },
    ], delayAfter: 1.0 },
  ]
}

/** Character dances with celebration animation */
export function DANCE(character: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'animate', character, anim: 'Cheering' },
      { action: 'sfx', sound: 'success' },
    ], delayAfter: 1.0 },
    { parallel: [
      { action: 'animate', character, anim: 'Waving' },
    ], delayAfter: 1.0 },
    { parallel: [
      { action: 'animate', character, anim: 'Cheering' },
    ], delayAfter: 1.0 },
    { parallel: [
      { action: 'animate', character, anim: 'Idle_A' },
    ], delayAfter: 0.3 },
  ]
}

/** Object bounces from one position to another */
export function OBJECT_BOUNCE_TO(asset: string, fromPos: string, toPos: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'spawn', asset, position: fromPos },
      { action: 'sfx', sound: 'spawn' },
    ], delayAfter: 0.2 },
    { parallel: [
      { action: 'move', asset, to: toPos, style: 'bounce' },
      { action: 'sfx', sound: 'whoosh' },
    ], delayAfter: 0.8 },
  ]
}

/** Screen flash effect — dramatic color flash */
export function FLASH(color = 'white', duration = 0.2): VignetteStep[] {
  return [
    { parallel: [
      { action: 'screen_flash', color, duration },
      { action: 'sfx', sound: 'impact' },
    ], delayAfter: 0.3 },
  ]
}

/** Text popup announcement — show text on screen */
export function ANNOUNCE(text: string, size: 'small' | 'large' | 'huge' = 'huge'): VignetteStep[] {
  return [
    { parallel: [
      { action: 'text_popup', text, position: 'center', size },
      { action: 'sfx', sound: 'react' },
    ], delayAfter: 1.5 },
  ]
}

/** Character emotes silently with emoji bubble */
export function EMOTE(character: string, emoji: string, text?: string): VignetteStep[] {
  return [
    { parallel: [
      { action: 'emote', character, emoji, ...(text ? { text } : {}) },
    ], delayAfter: 1.5 },
  ]
}

// ─── VIGNETTE OUTRO (auto-appended to short vignettes) ─────────────────────

/** Celebration outro — confetti burst + crowd cheer. Auto-appended to vignettes with <6 steps. */
export function VIGNETTE_OUTRO(): VignetteStep[] {
  return [
    { parallel: [
      { action: 'react', effect: 'confetti-burst', position: 'cs-center' },
      { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
      { action: 'sfx', sound: 'success' },
    ], delayAfter: 0.5 },
    { parallel: [
      { action: 'react', effect: 'celebrating', position: 'cs-center' },
    ], delayAfter: 1.5 },
  ]
}
