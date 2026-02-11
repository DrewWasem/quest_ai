/**
 * ProceduralBalloon — Pure Three.js geometry balloon with bobbing animation.
 *
 * No external model required — generates a balloon from basic geometries:
 * - SphereGeometry for the balloon body
 * - Small sphere for the knot
 * - CylinderGeometry for the string
 * - MeshStandardMaterial with configurable color
 * - useFrame bobbing animation with random phase offset
 *
 * Usage:
 *   <ProceduralBalloon position={[0, 0, 0]} color="#FF4444" />
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BALLOON_COLORS = [
  '#FF4444', // red
  '#4488FF', // blue
  '#44DD44', // green
  '#FFDD44', // yellow
  '#FF44DD', // pink
  '#44DDDD', // cyan
  '#FF8844', // orange
  '#AA44FF', // purple
]

export interface ProceduralBalloonProps {
  position?: [number, number, number]
  color?: string
  scale?: number
}

export default function ProceduralBalloon({
  position = [0, 0, 0],
  color,
  scale = 1,
}: ProceduralBalloonProps) {
  const groupRef = useRef<THREE.Group>(null!)

  // Random phase offset so grouped balloons bob independently
  const phaseOffset = useMemo(() => Math.random() * Math.PI * 2, [])

  // Pick a random color if none specified
  const balloonColor = useMemo(() => {
    return color || BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)]
  }, [color])

  // Bobbing animation
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime + phaseOffset
    // Gentle bob up/down
    groupRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.15
    // Slight rotation sway
    groupRef.current.rotation.z = Math.sin(time * 0.7) * 0.05
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Balloon body */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={balloonColor} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Knot */}
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={balloonColor} roughness={0.5} />
      </mesh>

      {/* String */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 1.3, 4]} />
        <meshStandardMaterial color="#999999" roughness={0.8} />
      </mesh>
    </group>
  )
}
