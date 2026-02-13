/**
 * Theater Scene Blocking Templates
 *
 * Pure-data functions that return VignetteStep[] arrays for theatrical
 * character entrances and blocking patterns. No engine dependencies.
 *
 * Usage:
 *   import { enterFromWing, setupProps, composeBlocking, MARK } from './blocking-templates'
 *   const scene = composeBlocking(
 *     setupProps([{ asset: 'table_long', mark: MARK.US_CENTER }]),
 *     enterFromWing('knight', 'left', MARK.DS_LEFT),
 *   )
 */

import type { VignetteStep, VignetteAction } from '../types/madlibs'

// ============================================================================
// STAGE MARK CONSTANTS
// ============================================================================

export const MARK = {
  // Downstage (front — closest to camera)
  DS_FAR_LEFT:  'ds-far-left',
  DS_LEFT:      'ds-left',
  DS_CENTER:    'ds-center',
  DS_RIGHT:     'ds-right',
  DS_FAR_RIGHT: 'ds-far-right',
  // Center stage
  CS_FAR_LEFT:  'cs-far-left',
  CS_LEFT:      'cs-left',
  CS_CENTER:    'cs-center',
  CS_RIGHT:     'cs-right',
  CS_FAR_RIGHT: 'cs-far-right',
  // Upstage (back — furthest from camera)
  US_FAR_LEFT:  'us-far-left',
  US_LEFT:      'us-left',
  US_CENTER:    'us-center',
  US_RIGHT:     'us-right',
  US_FAR_RIGHT: 'us-far-right',
  // Wings (off-stage entrances)
  WING_LEFT:    'off-left',
  WING_RIGHT:   'off-right',
  FLY_SPACE:    'off-top',
  // Legacy positions
  LEFT:         'left',
  CENTER:       'center',
  RIGHT:        'right',
  TOP:          'top',
  BOTTOM:       'bottom',
} as const

export type Mark = typeof MARK[keyof typeof MARK]

// ============================================================================
// 1. enterFromWing — Solo entrance from wing to mark
// ============================================================================

export function enterFromWing(
  character: string,
  wing: 'left' | 'right',
  mark: Mark,
  opts?: { walkStyle?: string; arrivalAnim?: string; entranceAnim?: string; emote?: string }
): VignetteStep[] {
  const wingPos = wing === 'left' ? MARK.WING_LEFT : MARK.WING_RIGHT
  const steps: VignetteStep[] = []

  // Step 1: Spawn at wing
  const spawnActions: VignetteAction[] = [
    { action: 'spawn_character', character, position: wingPos },
    { action: 'sfx', sound: 'spawn' },
  ]
  if (opts?.entranceAnim) {
    spawnActions.push({ action: 'animate', character, anim: opts.entranceAnim })
  }
  steps.push({ parallel: spawnActions, delayAfter: 0.2 })

  // Step 2: Walk to mark
  steps.push({
    parallel: [
      { action: 'move', character, to: mark, style: opts?.walkStyle ?? 'linear' },
    ],
    delayAfter: 0.3,
  })

  // Step 3: Arrival animation/emote (optional)
  if (opts?.arrivalAnim || opts?.emote) {
    const arrivalActions: VignetteAction[] = []
    if (opts?.arrivalAnim) arrivalActions.push({ action: 'animate', character, anim: opts.arrivalAnim })
    if (opts?.emote) arrivalActions.push({ action: 'emote', character, emoji: opts.emote })
    steps.push({ parallel: arrivalActions, delayAfter: 0.4 })
  }

  return steps
}

// ============================================================================
// 2. enterDuo — Two characters enter from opposite wings
// ============================================================================

export function enterDuo(
  char1: string, mark1: Mark,
  char2: string, mark2: Mark,
  opts?: { staggerMs?: number; arrivalAnim?: string }
): VignetteStep[] {
  const steps: VignetteStep[] = []

  // Step 1: Spawn both at opposite wings
  steps.push({
    parallel: [
      { action: 'spawn_character', character: char1, position: MARK.WING_LEFT },
      { action: 'spawn_character', character: char2, position: MARK.WING_RIGHT },
      { action: 'sfx', sound: 'spawn' },
    ],
    delayAfter: 0.2,
  })

  // Step 2: Both walk to their marks
  steps.push({
    parallel: [
      { action: 'move', character: char1, to: mark1, style: 'linear' },
      { action: 'move', character: char2, to: mark2, style: 'linear' },
    ],
    delayAfter: 0.3,
  })

  // Step 3: Arrival animation (optional)
  if (opts?.arrivalAnim) {
    steps.push({
      parallel: [
        { action: 'animate', character: char1, anim: opts.arrivalAnim },
        { action: 'animate', character: char2, anim: opts.arrivalAnim },
      ],
      delayAfter: 0.4,
    })
  }

  return steps
}

// ============================================================================
// 3. enterGroup — N characters stagger-enter from a wing
// ============================================================================

export function enterGroup(
  entries: Array<{ character: string; mark: Mark }>,
  wing: 'left' | 'right',
  opts?: { staggerSec?: number; arrivalAnim?: string }
): VignetteStep[] {
  const wingPos = wing === 'left' ? MARK.WING_LEFT : MARK.WING_RIGHT
  const stagger = opts?.staggerSec ?? 0.3
  const steps: VignetteStep[] = []

  // Each character gets their own spawn+move step (staggered)
  for (const entry of entries) {
    steps.push({
      parallel: [
        { action: 'spawn_character', character: entry.character, position: wingPos },
        { action: 'sfx', sound: 'spawn' },
      ],
      delayAfter: 0.1,
    })
    steps.push({
      parallel: [
        { action: 'move', character: entry.character, to: entry.mark, style: 'linear' },
      ],
      delayAfter: stagger,
    })
  }

  // Final arrival animation for all
  if (opts?.arrivalAnim) {
    steps.push({
      parallel: entries.map(e => ({
        action: 'animate' as const,
        character: e.character,
        anim: opts.arrivalAnim!,
      })),
      delayAfter: 0.4,
    })
  }

  return steps
}

// ============================================================================
// 4. crossStage — Character walks across the stage
// ============================================================================

export function crossStage(
  character: string,
  direction: 'left-to-right' | 'right-to-left',
  opts?: { walkAnim?: string; stopAt?: Mark; midAction?: VignetteAction }
): VignetteStep[] {
  const entryWing = direction === 'left-to-right' ? MARK.WING_LEFT : MARK.WING_RIGHT
  const exitWing = direction === 'left-to-right' ? MARK.WING_RIGHT : MARK.WING_LEFT
  const destination = opts?.stopAt ?? exitWing
  const steps: VignetteStep[] = []

  // Spawn at entry wing
  steps.push({
    parallel: [
      { action: 'spawn_character', character, position: entryWing },
      { action: 'sfx', sound: 'spawn' },
    ],
    delayAfter: 0.2,
  })

  // Optional mid-stage action
  if (opts?.midAction) {
    steps.push({
      parallel: [
        { action: 'move', character, to: MARK.CS_CENTER, style: 'linear' },
      ],
      delayAfter: 0.3,
    })
    steps.push({
      parallel: [opts.midAction],
      delayAfter: 0.5,
    })
    steps.push({
      parallel: [
        { action: 'move', character, to: destination, style: 'linear' },
      ],
      delayAfter: 0.3,
    })
  } else {
    // Straight walk across
    steps.push({
      parallel: [
        { action: 'move', character, to: destination, style: 'linear' },
      ],
      delayAfter: 0.3,
    })
  }

  return steps
}

// ============================================================================
// 5. setupProps — Place props on marks before characters enter
// ============================================================================

export function setupProps(
  props: Array<{ asset: string; mark: Mark }>
): VignetteStep[] {
  return [{
    parallel: [
      ...props.map(p => ({
        action: 'spawn' as const,
        asset: p.asset,
        position: p.mark,
      })),
      { action: 'sfx', sound: 'spawn' } as VignetteAction,
    ],
    delayAfter: 0.5,
  }]
}

// ============================================================================
// 6. interactWithProp — Character walks to a prop and acts
// ============================================================================

export function interactWithProp(
  character: string,
  propMark: Mark,
  anim: string,
  opts?: { emote?: string; effect?: string; approachFrom?: Mark }
): VignetteStep[] {
  const steps: VignetteStep[] = []

  // Move character to prop mark
  if (opts?.approachFrom) {
    steps.push({
      parallel: [
        { action: 'move', character, to: propMark, style: 'linear' },
      ],
      delayAfter: 0.3,
    })
  } else {
    steps.push({
      parallel: [
        { action: 'move', character, to: propMark, style: 'linear' },
      ],
      delayAfter: 0.3,
    })
  }

  // Perform animation + optional emote/effect
  const interactActions: VignetteAction[] = [
    { action: 'animate', character, anim },
  ]
  if (opts?.emote) interactActions.push({ action: 'emote', character, emoji: opts.emote })
  if (opts?.effect) interactActions.push({ action: 'react', effect: opts.effect, position: propMark })
  steps.push({ parallel: interactActions, delayAfter: 0.5 })

  return steps
}

// ============================================================================
// 7. dramaticReveal — Buildup effects, then character drops from fly space
// ============================================================================

export function dramaticReveal(
  character: string,
  mark: Mark,
  opts?: { preEffects?: string[]; revealAnim?: string; cameraShake?: number }
): VignetteStep[] {
  const steps: VignetteStep[] = []

  // Step 1: Buildup effects
  const buildupActions: VignetteAction[] = [
    { action: 'screen_flash', color: 'white', duration: 0.2 },
    { action: 'sfx', sound: 'react' },
  ]
  if (opts?.preEffects) {
    for (const effect of opts.preEffects) {
      buildupActions.push({ action: 'react', effect, position: mark })
    }
  }
  steps.push({ parallel: buildupActions, delayAfter: 0.3 })

  // Step 2: Spawn at fly space
  steps.push({
    parallel: [
      { action: 'spawn_character', character, position: MARK.FLY_SPACE },
      { action: 'sfx', sound: 'spawn' },
    ],
    delayAfter: 0.1,
  })

  // Step 3: Drop to mark with arc
  const dropActions: VignetteAction[] = [
    { action: 'move', character, to: mark, style: 'arc' },
  ]
  if (opts?.cameraShake) {
    dropActions.push({ action: 'camera_shake', intensity: opts.cameraShake, duration: 0.5 })
  }
  steps.push({ parallel: dropActions, delayAfter: 0.3 })

  // Step 4: Arrival animation
  steps.push({
    parallel: [
      { action: 'animate', character, anim: opts?.revealAnim ?? 'Cheering' },
      { action: 'react', effect: 'sparkle-magic', position: mark },
    ],
    delayAfter: 0.5,
  })

  return steps
}

// ============================================================================
// 8. confrontation — Two characters meet from opposite sides
// ============================================================================

export function confrontation(
  char1: string, anim1: string,
  char2: string, anim2: string,
  opts?: { mark1?: Mark; mark2?: Mark; effect?: string }
): VignetteStep[] {
  const m1 = opts?.mark1 ?? MARK.CS_LEFT
  const m2 = opts?.mark2 ?? MARK.CS_RIGHT
  const steps: VignetteStep[] = []

  // Spawn at opposite wings
  steps.push({
    parallel: [
      { action: 'spawn_character', character: char1, position: MARK.WING_LEFT },
      { action: 'spawn_character', character: char2, position: MARK.WING_RIGHT },
      { action: 'sfx', sound: 'spawn' },
    ],
    delayAfter: 0.2,
  })

  // Walk to face each other
  steps.push({
    parallel: [
      { action: 'move', character: char1, to: m1, style: 'linear' },
      { action: 'move', character: char2, to: m2, style: 'linear' },
    ],
    delayAfter: 0.4,
  })

  // Both animate + optional effect
  const faceOffActions: VignetteAction[] = [
    { action: 'animate', character: char1, anim: anim1 },
    { action: 'animate', character: char2, anim: anim2 },
  ]
  if (opts?.effect) {
    faceOffActions.push({ action: 'react', effect: opts.effect, position: MARK.CS_CENTER })
  }
  steps.push({ parallel: faceOffActions, delayAfter: 0.6 })

  return steps
}

// ============================================================================
// 9. jugglingEntrance — Character walks on carrying items that arc through air
// ============================================================================

export function jugglingEntrance(
  character: string,
  wing: 'left' | 'right',
  mark: Mark,
  items: string[],
  _itemBase: string,
  opts?: { charAnim?: string; arcHeight?: number }
): VignetteStep[] {
  const wingPos = wing === 'left' ? MARK.WING_LEFT : MARK.WING_RIGHT
  const steps: VignetteStep[] = []

  // Spread items to positions around the destination mark
  const itemMarks = getSpreadMarks(mark, items.length)

  // Step 1: Spawn character + items at wing
  steps.push({
    parallel: [
      { action: 'spawn_character', character, position: wingPos },
      ...items.map(id => ({
        action: 'spawn' as const,
        asset: id,
        position: wingPos,
      })),
      { action: 'sfx', sound: 'spawn' },
    ],
    delayAfter: 0.2,
  })

  // Step 2: Character walks to mark + first item arcs to position
  steps.push({
    parallel: [
      { action: 'move', character, to: mark, style: 'linear' },
      ...(items.length > 0 ? [{
        action: 'move' as const,
        asset: items[0],
        to: itemMarks[0],
        style: 'arc' as const,
      }] : []),
    ],
    delayAfter: 0.3,
  })

  // Step 3: Remaining items arc to their positions (staggered)
  if (items.length > 1) {
    steps.push({
      parallel: items.slice(1).map((id, i) => ({
        action: 'move' as const,
        asset: id,
        to: itemMarks[i + 1],
        style: 'arc' as const,
      })),
      delayAfter: 0.4,
    })
  }

  // Step 4: Character celebrates
  steps.push({
    parallel: [
      { action: 'animate', character, anim: opts?.charAnim ?? 'Cheering' },
    ],
    delayAfter: 0.3,
  })

  // Steps 5-7: Juggling cycle — items rotate positions in arcs
  const cycleCount = 2
  for (let cycle = 0; cycle < cycleCount; cycle++) {
    // Rotate marks: each item moves to the next item's position
    const rotatedMarks = rotateArray(itemMarks, cycle + 1)
    steps.push({
      parallel: items.map((id, i) => ({
        action: 'move' as const,
        asset: id,
        to: rotatedMarks[i],
        style: 'arc' as const,
      })),
      delayAfter: 0.4,
    })
  }

  // Step 8: Emote
  steps.push({
    parallel: [
      { action: 'animate', character, anim: opts?.charAnim ?? 'Cheering' },
      { action: 'emote', character, emoji: '🤹' },
    ],
    delayAfter: 0.3,
  })

  // Step 9: Items land in final positions around character
  steps.push({
    parallel: items.map((id, i) => ({
      action: 'move' as const,
      asset: id,
      to: itemMarks[i],
      style: 'arc' as const,
    })),
    delayAfter: 0.5,
  })

  return steps
}

// ============================================================================
// 10. crowdEntrance — Multiple characters file in from both wings
// ============================================================================

export function crowdEntrance(
  characters: string[],
  marks: Mark[],
  opts?: { groupAnim?: string; staggerSec?: number }
): VignetteStep[] {
  const stagger = opts?.staggerSec ?? 0.3
  const steps: VignetteStep[] = []

  // Alternate characters between left and right wings
  for (let i = 0; i < characters.length; i++) {
    const wing = i % 2 === 0 ? MARK.WING_LEFT : MARK.WING_RIGHT
    const mark = marks[i] ?? MARK.CS_CENTER

    steps.push({
      parallel: [
        { action: 'spawn_character', character: characters[i], position: wing },
        { action: 'sfx', sound: 'spawn' },
      ],
      delayAfter: 0.1,
    })
    steps.push({
      parallel: [
        { action: 'move', character: characters[i], to: mark, style: 'linear' },
      ],
      delayAfter: stagger,
    })
  }

  // All play group animation at end
  if (opts?.groupAnim) {
    steps.push({
      parallel: characters.map(c => ({
        action: 'animate' as const,
        character: c,
        anim: opts.groupAnim!,
      })),
      delayAfter: 0.5,
    })
  }

  return steps
}

// ============================================================================
// COMPOSE UTILITY
// ============================================================================

/**
 * Concatenate multiple template arrays into a single VignetteStep sequence.
 * Each template block plays in order.
 */
export function composeBlocking(
  ...templates: VignetteStep[][]
): VignetteStep[] {
  return templates.flat()
}

// ============================================================================
// HELPERS (internal)
// ============================================================================

/** Get spread marks around a center mark for item placement */
function getSpreadMarks(centerMark: Mark, count: number): Mark[] {
  // Map center mark to a spread of nearby marks
  const spreadMap: Record<string, Mark[]> = {
    'ds-center': [MARK.DS_LEFT, MARK.DS_CENTER, MARK.DS_RIGHT, MARK.DS_FAR_LEFT, MARK.DS_FAR_RIGHT],
    'cs-center': [MARK.CS_LEFT, MARK.CS_CENTER, MARK.CS_RIGHT, MARK.CS_FAR_LEFT, MARK.CS_FAR_RIGHT],
    'us-center': [MARK.US_LEFT, MARK.US_CENTER, MARK.US_RIGHT, MARK.US_FAR_LEFT, MARK.US_FAR_RIGHT],
    'ds-left': [MARK.DS_FAR_LEFT, MARK.DS_LEFT, MARK.DS_CENTER],
    'ds-right': [MARK.DS_CENTER, MARK.DS_RIGHT, MARK.DS_FAR_RIGHT],
    'cs-left': [MARK.CS_FAR_LEFT, MARK.CS_LEFT, MARK.CS_CENTER],
    'cs-right': [MARK.CS_CENTER, MARK.CS_RIGHT, MARK.CS_FAR_RIGHT],
    'center': [MARK.DS_LEFT, MARK.DS_CENTER, MARK.DS_RIGHT, MARK.CS_LEFT, MARK.CS_RIGHT],
    'left': [MARK.DS_FAR_LEFT, MARK.DS_LEFT, MARK.CS_FAR_LEFT],
    'right': [MARK.DS_RIGHT, MARK.DS_FAR_RIGHT, MARK.CS_FAR_RIGHT],
  }

  const available = spreadMap[centerMark] ?? [MARK.DS_LEFT, MARK.DS_CENTER, MARK.DS_RIGHT]
  return available.slice(0, count)
}

/** Rotate an array by n positions */
function rotateArray<T>(arr: T[], n: number): T[] {
  const len = arr.length
  if (len === 0) return arr
  const shift = ((n % len) + len) % len
  return [...arr.slice(shift), ...arr.slice(0, shift)]
}
