/**
 * AnimationController — Shared skeletal animation system for KayKit characters.
 *
 * All KayKit characters use the Rig_Medium skeleton with NO embedded animations.
 * Animations come from 8 shared GLB packs (139 clips total).
 *
 * Usage:
 *   const { play, stop, current } = useCharacterAnimation(groupRef, animationPacks)
 *   play('Cheering', 0.3) // crossfade to Cheering over 0.3s
 */

import { useEffect, useMemo, useRef, useCallback } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import {
  ANIMATION_PACKS,
  ANIMATION_CLIPS,
  ASSET_BASE,
  type AnimationPackKey,
  type AnimationClipName,
} from '../data/asset-manifest'

const DEFAULT_FADE_DURATION = 0.25
const FALLBACK_ANIM = 'Idle_A'

/** Determine which animation packs are needed for a set of clip names */
export function getRequiredPacks(clipNames: AnimationClipName[]): AnimationPackKey[] {
  const packs = new Set<AnimationPackKey>()
  for (const clip of clipNames) {
    const pack = ANIMATION_CLIPS[clip]
    if (pack) packs.add(pack as AnimationPackKey)
  }
  return Array.from(packs)
}

/** Preload animation pack GLBs */
export function preloadAnimationPacks(packs: AnimationPackKey[]) {
  for (const pack of packs) {
    const path = ANIMATION_PACKS[pack]
    if (path) useGLTF.preload(`${ASSET_BASE}${path}`)
  }
}

/** Preload ALL animation packs (used during initial load) */
export function preloadAllAnimations() {
  preloadAnimationPacks(Object.keys(ANIMATION_PACKS) as AnimationPackKey[])
}

/**
 * Load all animation clips from specified packs.
 * Returns a flat array of AnimationClips (T-Pose filtered out).
 */
export function useAnimationClips(packs: AnimationPackKey[]): THREE.AnimationClip[] {
  // Load each pack GLB — hooks must be called unconditionally
  // We load all 8 packs but only use the ones specified
  const general = useGLTF(`${ASSET_BASE}${ANIMATION_PACKS.general}`)
  const movementBasic = useGLTF(`${ASSET_BASE}${ANIMATION_PACKS.movement_basic}`)
  const movementAdvanced = useGLTF(`${ASSET_BASE}${ANIMATION_PACKS.movement_advanced}`)
  const combatMelee = useGLTF(`${ASSET_BASE}${ANIMATION_PACKS.combat_melee}`)
  const combatRanged = useGLTF(`${ASSET_BASE}${ANIMATION_PACKS.combat_ranged}`)
  const simulation = useGLTF(`${ASSET_BASE}${ANIMATION_PACKS.simulation}`)
  const special = useGLTF(`${ASSET_BASE}${ANIMATION_PACKS.special}`)
  const tools = useGLTF(`${ASSET_BASE}${ANIMATION_PACKS.tools}`)

  const packMap: Record<AnimationPackKey, { animations: THREE.AnimationClip[] }> = {
    general,
    movement_basic: movementBasic,
    movement_advanced: movementAdvanced,
    combat_melee: combatMelee,
    combat_ranged: combatRanged,
    simulation,
    special,
    tools,
  }

  return useMemo(() => {
    const clips: THREE.AnimationClip[] = []
    for (const packKey of packs) {
      const gltf = packMap[packKey]
      if (!gltf) continue
      for (const clip of gltf.animations) {
        if (clip.name === 'T-Pose') continue
        clips.push(clip)
      }
    }
    return clips
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packs.join(',')])
}

export interface CharacterAnimationApi {
  /** Play a named animation with optional crossfade duration */
  play: (clipName: string, fadeDuration?: number) => void
  /** Stop all animations */
  stop: () => void
  /** Currently playing animation name */
  current: string | null
  /** All available animation names */
  available: string[]
  /** The underlying AnimationMixer */
  mixer: THREE.AnimationMixer | null
}

/**
 * Hook: manages animations for a character group ref.
 *
 * @param groupRef - ref to the THREE.Group containing the character
 * @param packs - which animation packs to load
 * @param initialAnim - animation to play on mount (default: 'Idle_A')
 */
export function useCharacterAnimation(
  groupRef: React.RefObject<THREE.Group>,
  packs: AnimationPackKey[],
  initialAnim: string = FALLBACK_ANIM,
): CharacterAnimationApi {
  const clips = useAnimationClips(packs)
  const { actions, mixer } = useAnimations(clips, groupRef)
  const currentRef = useRef<string | null>(null)

  // Play initial animation on mount
  useEffect(() => {
    if (actions[initialAnim]) {
      actions[initialAnim]!.reset().fadeIn(DEFAULT_FADE_DURATION).play()
      currentRef.current = initialAnim
    } else if (actions[FALLBACK_ANIM]) {
      actions[FALLBACK_ANIM]!.reset().fadeIn(DEFAULT_FADE_DURATION).play()
      currentRef.current = FALLBACK_ANIM
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const play = useCallback((clipName: string, fadeDuration = DEFAULT_FADE_DURATION) => {
    const target = actions[clipName]
    if (!target) {
      console.warn(`[AnimationController] Clip "${clipName}" not found. Available:`, Object.keys(actions).slice(0, 10), '...')
      // Try fallback
      if (clipName !== FALLBACK_ANIM && actions[FALLBACK_ANIM]) {
        play(FALLBACK_ANIM, fadeDuration)
      }
      return
    }

    // Crossfade from current to target
    const currentName = currentRef.current
    if (currentName && currentName !== clipName && actions[currentName]) {
      actions[currentName]!.fadeOut(fadeDuration)
    }

    target.reset().fadeIn(fadeDuration).play()
    currentRef.current = clipName
  }, [actions])

  const stop = useCallback(() => {
    if (mixer) mixer.stopAllAction()
    currentRef.current = null
  }, [mixer])

  const available = useMemo(() => Object.keys(actions), [actions])

  return {
    play,
    stop,
    current: currentRef.current,
    available,
    mixer: mixer || null,
  }
}
