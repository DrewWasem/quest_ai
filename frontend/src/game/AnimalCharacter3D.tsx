/**
 * AnimalCharacter3D — Loads Quaternius animal GLB models with embedded animations.
 *
 * Unlike KayKit characters (shared Rig_Medium), Quaternius animals have
 * embedded rigs and animations baked into each GLB file. Uses useGLTF + useAnimations
 * from drei directly.
 *
 * Usage:
 *   <AnimalCharacter3D
 *     modelPath="quaternius/animals/kitty_001.glb"
 *     position={[0, 0, 0]}
 *     scale={0.8}
 *     animation="Idle"
 *   />
 */

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import { ASSET_BASE } from '../data/asset-manifest'

export interface AnimalCharacter3DProps {
  modelPath: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  animation?: string  // animation name to play, defaults to first available
}

export default function AnimalCharacter3D({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  animation,
}: AnimalCharacter3DProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const fullPath = `${ASSET_BASE}${modelPath}`

  // Load the GLB (animations are embedded)
  const { scene: originalScene, animations } = useGLTF(fullPath)

  // Clone scene for independent instances
  const clonedScene = useMemo(() => {
    const clone = SkeletonUtils.clone(originalScene) as THREE.Group
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return clone
  }, [originalScene])

  // Apply animations from the GLB
  const { actions, mixer } = useAnimations(animations, groupRef)

  // Play the requested or first available animation
  useEffect(() => {
    const animNames = Object.keys(actions)
    if (animNames.length === 0) return

    // Try the requested animation name first
    let targetName = animation
    if (!targetName || !actions[targetName]) {
      // Try common names: Idle, Walk, idle, walk
      const tryNames = ['Idle', 'Walk', 'idle', 'walk']
      targetName = tryNames.find(n => actions[n]) || animNames[0]
    }

    const action = actions[targetName]
    if (action) {
      action.reset().fadeIn(0.2).play()
    }

    return () => {
      if (action) action.fadeOut(0.2)
    }
  }, [actions, animation])

  // Update mixer each frame
  useFrame((_state, delta) => {
    if (mixer) mixer.update(delta)
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  )
}
