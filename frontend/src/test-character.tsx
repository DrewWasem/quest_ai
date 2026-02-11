/**
 * Test: KayKit Character + Shared Animations in React Three Fiber
 *
 * This proves the core 3D pipeline:
 * 1. Load a character GLB (mesh + skeleton, no animations)
 * 2. Load animation GLBs (clips for the shared Rig_Medium)
 * 3. Apply animations from the animation GLBs to the character
 * 4. Support animation switching via UI buttons
 */
import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'

const CHAR_BASE = '/assets/3d/kaykit/characters/'
const ANIM_BASE = '/assets/3d/kaykit/animations/'

// Available characters
const CHARACTERS = [
  'Knight', 'Barbarian', 'Mage', 'Ranger', 'Rogue',
  'Skeleton_Warrior', 'Skeleton_Mage', 'Skeleton_Minion',
  'Clown', 'SpaceRanger', 'Witch', 'Ninja', 'Robot_One',
]

// Animation packs to load
const ANIM_PACKS = [
  'Rig_Medium_General',
  'Rig_Medium_MovementBasic',
  'Rig_Medium_Simulation',
  'Rig_Medium_CombatMelee',
  'Rig_Medium_Special',
]

// --- Animated Character Component ---
function AnimatedCharacter({
  characterName,
  currentAnim,
  position = [0, 0, 0],
}: {
  characterName: string
  currentAnim: string
  position?: [number, number, number]
}) {
  const groupRef = useRef<THREE.Group>(null!)

  // Load character model
  const charGltf = useGLTF(`${CHAR_BASE}${characterName}.glb`)

  // Clone the character so we get our own skeleton instance
  const clonedScene = useMemo(() => {
    return SkeletonUtils.clone(charGltf.scene)
  }, [charGltf.scene])

  // Load all animation packs
  const animGltfs = ANIM_PACKS.map(pack => useGLTF(`${ANIM_BASE}${pack}.glb`))

  // Collect all animation clips from all packs
  const allClips = useMemo(() => {
    const clips: THREE.AnimationClip[] = []
    for (const gltf of animGltfs) {
      for (const clip of gltf.animations) {
        // Skip T-Pose (it's just a reference pose)
        if (clip.name === 'T-Pose') continue
        clips.push(clip)
      }
    }
    return clips
  }, [animGltfs])

  // Use animations hook with the cloned scene and collected clips
  const { actions, mixer: _mixer } = useAnimations(allClips, groupRef)

  // Play the requested animation
  useEffect(() => {
    if (!actions[currentAnim]) {
      console.warn(`Animation "${currentAnim}" not found. Available:`, Object.keys(actions))
      // Fallback to Idle_A
      const fallback = actions['Idle_A']
      if (fallback) {
        fallback.reset().fadeIn(0.3).play()
      }
      return
    }

    const action = actions[currentAnim]!
    action.reset().fadeIn(0.3).play()

    return () => {
      action.fadeOut(0.3)
    }
  }, [currentAnim, actions])

  return (
    <group ref={groupRef} position={position}>
      <primitive object={clonedScene} />
    </group>
  )
}

// --- Ground Plane ---
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#4a5568" />
    </mesh>
  )
}

// --- Loading indicator ---
function LoadingFallback() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 2
  })
  return (
    <mesh ref={ref} position={[0, 1, 0]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#fbbf24" wireframe />
    </mesh>
  )
}

// --- UI Panel (HTML overlay) ---
function AnimationPanel({
  animations,
  current,
  onSelect,
  character,
  onCharacterChange,
}: {
  animations: string[]
  current: string
  onSelect: (name: string) => void
  character: string
  onCharacterChange: (name: string) => void
}) {
  return (
    <div style={{
      position: 'absolute', top: 10, left: 10, padding: '12px',
      background: 'rgba(0,0,0,0.85)', color: '#fff', borderRadius: '12px',
      maxHeight: '556px', overflowY: 'auto', fontSize: '12px', width: '220px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ marginBottom: '8px', fontWeight: 700, fontSize: '14px' }}>
        Character
      </div>
      <select
        value={character}
        onChange={(e) => onCharacterChange(e.target.value)}
        style={{
          width: '100%', padding: '4px', borderRadius: '6px',
          background: '#2d3748', color: '#fff', border: '1px solid #4a5568',
          marginBottom: '12px', fontSize: '12px',
        }}
      >
        {CHARACTERS.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <div style={{ marginBottom: '8px', fontWeight: 700, fontSize: '14px' }}>
        Animations ({animations.length})
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {animations.map(name => (
          <button
            key={name}
            onClick={() => onSelect(name)}
            style={{
              padding: '3px 8px', borderRadius: '6px', border: 'none',
              background: name === current ? '#805ad5' : '#4a5568',
              color: '#fff', cursor: 'pointer', fontSize: '11px',
              transition: 'background 0.15s',
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}

// --- All animation names (hardcoded from audit) ---
const ALL_ANIMATIONS = [
  // General
  'Idle_A', 'Idle_B', 'Death_A', 'Death_B', 'Hit_A', 'Hit_B',
  'Interact', 'PickUp', 'Spawn_Air', 'Spawn_Ground', 'Throw', 'Use_Item',
  // Movement Basic
  'Walking_A', 'Walking_B', 'Walking_C', 'Running_A', 'Running_B',
  'Jump_Full_Long', 'Jump_Full_Short', 'Jump_Idle', 'Jump_Land', 'Jump_Start',
  // Simulation
  'Cheering', 'Waving', 'Sit_Chair_Down', 'Sit_Chair_Idle', 'Sit_Floor_Down',
  'Sit_Floor_Idle', 'Lie_Down', 'Lie_Idle', 'Push_Ups', 'Sit_Ups',
  // Combat Melee
  'Melee_1H_Attack_Chop', 'Melee_2H_Attack_Spin', 'Melee_Block',
  'Melee_Unarmed_Attack_Kick', 'Melee_Unarmed_Attack_Punch_A',
  // Skeleton Special
  'Skeletons_Awaken_Floor', 'Skeletons_Idle', 'Skeletons_Taunt',
  'Skeletons_Walking', 'Skeletons_Death_Resurrect',
]

// --- Main component ---
export default function TestCharacter() {
  const [character, setCharacter] = useState('Knight')
  const [anim, setAnim] = useState('Idle_A')

  return (
    <div style={{ position: 'relative', width: '1024px', height: '576px', background: '#1a0533', margin: '20px auto', borderRadius: '16px', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 2.5, 5], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        shadows
      >
        <color attach="background" args={['#1a0533']} />

        {/* Lighting */}
        <ambientLight intensity={0.6} color="#ffeedd" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-3, 5, -3]} intensity={0.5} color="#aaccff" />

        {/* Subtle purple rim light from behind */}
        <pointLight position={[0, 3, -4]} intensity={15} color="#9b59b6" distance={10} />

        <Suspense fallback={<LoadingFallback />}>
          <AnimatedCharacter
            key={character} // Force remount on character change
            characterName={character}
            currentAnim={anim}
            position={[0, 0, 0]}
          />
        </Suspense>

        <Ground />
        <OrbitControls target={[0, 1, 0]} />
      </Canvas>

      <AnimationPanel
        animations={ALL_ANIMATIONS}
        current={anim}
        onSelect={setAnim}
        character={character}
        onCharacterChange={(c) => { setCharacter(c); setAnim('Idle_A'); }}
      />
    </div>
  )
}

// Preload the first character + animation packs
useGLTF.preload(`${CHAR_BASE}Knight.glb`)
ANIM_PACKS.forEach(pack => useGLTF.preload(`${ANIM_BASE}${pack}.glb`))
