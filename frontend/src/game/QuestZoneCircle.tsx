/**
 * QuestZoneCircle — Glowing ground circle marking a quest zone entrance.
 *
 * - RingGeometry (inner 2.0, outer 3.0) flat on ground at y=0.05
 * - Inner CircleGeometry r=2.0 at y=0.03, semi-transparent fill
 * - Emissive material with pulsing opacity (sine wave, 2s period)
 * - PointLight at y=1 for glow
 * - Html label floating at y=4 (emoji + name)
 * - Hidden when player is inside this zone
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore, isZoneLocked } from '../stores/gameStore'

interface QuestZoneCircleProps {
  zoneId: string
  position: [number, number, number]
  label: string
  emoji: string
  color: string
}

export function QuestZoneCircle({ zoneId, position, color }: QuestZoneCircleProps) {
  const currentZone = useGameStore((s) => s.currentZone)
  const stageNumbers = useGameStore((s) => s.stageNumbers)
  const locked = isZoneLocked(zoneId, stageNumbers)
  const ringRef = useRef<THREE.Mesh>(null!)
  const fillRef = useRef<THREE.Mesh>(null!)
  const lightRef = useRef<THREE.PointLight>(null!)

  const displayColor = locked ? '#666666' : color

  // Pulse opacity
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pulse = locked
      ? 0.3 + 0.1 * Math.sin(t * Math.PI) // Dimmer pulse when locked
      : 0.5 + 0.4 * Math.sin(t * Math.PI)  // 2s period, range 0.1-0.9

    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = pulse
      mat.emissiveIntensity = locked ? 0.2 : 0.5 + 0.5 * pulse
    }
    if (fillRef.current) {
      const mat = fillRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = pulse * (locked ? 0.1 : 0.25)
    }
    if (lightRef.current) {
      lightRef.current.intensity = locked ? 1 : 2 + 2 * pulse
    }
  })

  // Hide when inside this zone
  if (currentZone === zoneId) return null

  return (
    <group position={position}>
      {/* Outer glowing ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[2.0, 3.0, 48]} />
        <meshStandardMaterial
          color={displayColor}
          emissive={displayColor}
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Inner semi-transparent fill */}
      <mesh ref={fillRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <circleGeometry args={[2.0, 48]} />
        <meshStandardMaterial
          color={displayColor}
          emissive={displayColor}
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Glow light */}
      <pointLight
        ref={lightRef}
        color={displayColor}
        intensity={3}
        distance={10}
        decay={2}
        position={[0, 1, 0]}
      />

      {/* Lock icon for locked zones */}
      {locked && (
        <Html position={[0, 3, 0]} center distanceFactor={20} sprite>
          <div style={{
            fontSize: '28px',
            textAlign: 'center',
            userSelect: 'none',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
          }}>
            🔒
            <div style={{
              fontSize: '10px',
              color: '#999',
              fontFamily: 'Baloo 2, Fredoka, sans-serif',
              marginTop: '2px',
            }}>
              Complete 3 zones
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
