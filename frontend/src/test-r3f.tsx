import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const BASE = '/assets/3d/living-room/'

// --- Furniture piece component ---
function Piece({ model, position, rotY = 0 }: { model: string; position: [number, number, number]; rotY?: number }) {
  const { scene } = useGLTF(`${BASE}${model}.gltf`)
  const clone = useMemo(() => scene.clone(true), [scene])
  return (
    <primitive
      object={clone}
      position={position}
      rotation={[0, rotY, 0]}
    />
  )
}

// --- Ceiling tile (white material override) ---
function CeilingTile({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF(`${BASE}floor_wood.gltf`)
  const clone = useMemo(() => {
    const c = scene.clone(true)
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = new THREE.MeshStandardMaterial({ color: '#f0ece6', roughness: 0.9 })
      }
    })
    return c
  }, [scene])
  return <primitive object={clone} position={position} />
}

// --- Convert Blender coords (X, Y, Z-up) to Three.js (X, Y-up, -Z) ---
// Blender: X=right, Y=back, Z=up  →  Three.js: X=right, Y=up, Z=-back
function b2t(bx: number, by: number, bz: number): [number, number, number] {
  return [bx, bz, -by]
}

// Convert Blender rot_z (degrees) to Three.js rotation around Y (radians)
function rotZ(deg: number): number {
  return (deg * Math.PI) / 180
}

// --- Room layout data (from Blender build_party_room.py) ---
type FurnitureItem = { model: string; pos: [number, number, number]; rot?: number }

function getRoomLayout(): FurnitureItem[] {
  const items: FurnitureItem[] = []

  // FLOOR (6x4 grid)
  for (let ix = 0; ix < 6; ix++) {
    for (let iy = 0; iy < 4; iy++) {
      const x = -5 + ix * 2
      const y = -1 - iy * 2
      const model = (ix + iy) % 3 === 0 ? 'floor_carpet' : 'floor_wood'
      items.push({ model, pos: [x, y, -0.5] })
    }
  }

  // BACK WALL (Y=0)
  items.push({ model: 'wall_panelled_living_room_corner_inner', pos: [-6, 0, -0.5] })
  items.push({ model: 'wall_panelled_living_room_straight', pos: [-4, 0, -0.5] })
  items.push({ model: 'wall_panelled_living_room_window', pos: [-2, 0, -0.5] })
  items.push({ model: 'wall_panelled_living_room_straight', pos: [0, 0, -0.5] })
  items.push({ model: 'wall_panelled_living_room_window', pos: [2, 0, -0.5] })
  items.push({ model: 'wall_panelled_living_room_straight', pos: [4, 0, -0.5] })
  items.push({ model: 'wall_panelled_living_room_corner_inner', pos: [6, 0, -0.5], rot: -90 })

  // LEFT WALL (X=-6)
  items.push({ model: 'wall_panelled_living_room_window_large_left', pos: [-6, -2, -0.5], rot: 90 })
  items.push({ model: 'wall_panelled_living_room_window_large_center', pos: [-6, -4, -0.5], rot: 90 })
  items.push({ model: 'wall_panelled_living_room_window_large_right', pos: [-6, -6, -0.5], rot: 90 })

  // RIGHT WALL (X=6)
  items.push({ model: 'wall_panelled_living_room_straight', pos: [6, -2, -0.5], rot: -90 })
  items.push({ model: 'wall_panelled_living_room_doorway', pos: [6, -4, -0.5], rot: -90 })
  items.push({ model: 'wall_panelled_living_room_straight', pos: [6, -6, -0.5], rot: -90 })

  // CURTAINS
  items.push({ model: 'curtain', pos: [-2, -0.1, -0.5] })
  items.push({ model: 'curtain', pos: [2, -0.1, -0.5] })
  items.push({ model: 'curtain_end_left', pos: [-5.7, -2, -0.5], rot: 90 })
  items.push({ model: 'curtain_center_empty', pos: [-5.7, -4, -0.5], rot: 90 })
  items.push({ model: 'curtain_end_right', pos: [-5.7, -6, -0.5], rot: 90 })

  // RUGS
  items.push({ model: 'rug_A_large', pos: [0, -4, -0.5] })
  items.push({ model: 'rug_B_small_orange', pos: [4, -2, -0.5] })

  // COUCH + PILLOWS
  items.push({ model: 'couch_B_blue', pos: [0, -1.2, -0.5] })
  items.push({ model: 'pillow_A_orange', pos: [-1.2, -1.0, 0.3] })
  items.push({ model: 'pillow_B_blue', pos: [1.2, -1.0, 0.3] })
  items.push({ model: 'pillow_flower', pos: [0, -0.9, 0.3] })

  // CHAIRS
  items.push({ model: 'chair_A_orange', pos: [4.2, -2.5, -0.5], rot: 45 })
  items.push({ model: 'pillow_A_white', pos: [4.2, -2.3, 0.3] })
  items.push({ model: 'rocking_chair_blue', pos: [-4.5, -2.5, -0.5], rot: -30 })

  // COFFEE TABLE + ITEMS
  items.push({ model: 'table_C_brown', pos: [0, -3.5, -0.5] })
  items.push({ model: 'tray_decorated', pos: [0, -3.5, 0.05] })
  items.push({ model: 'mug_duck', pos: [-0.4, -3.3, 0.05] })
  items.push({ model: 'mug_blue', pos: [0.5, -3.7, 0.05] })
  items.push({ model: 'candles', pos: [0, -3.2, 0.05] })

  // TV AREA
  items.push({ model: 'tv_cabinet_A', pos: [4.8, -6, -0.5], rot: -90 })
  items.push({ model: 'tv_C_brown', pos: [4.9, -6, 0.7], rot: -90 })
  items.push({ model: 'record_player_red', pos: [4.5, -5, -0.5] })

  // FIREPLACE
  items.push({ model: 'fireplace_A', pos: [-3.5, -0.4, -0.5] })
  items.push({ model: 'firewood_stack', pos: [-4.8, -0.6, -0.5] })

  // DECORATIONS
  items.push({ model: 'lamp_standing_B_orange', pos: [-4.8, -0.5, -0.5] })
  items.push({ model: 'lamp_table_orange', pos: [4.5, -5.5, 1.2] })
  items.push({ model: 'flower_vase_orange_decorated', pos: [-3.5, -0.3, 1.6] })
  items.push({ model: 'flower_vase_blue_decorated', pos: [2, -0.5, -0.5] })
  items.push({ model: 'fishing_bowl_inside', pos: [3, -1, -0.5] })
  items.push({ model: 'book_stack', pos: [-1, -1, -0.5] })

  // WALL SHELF + ITEMS
  items.push({ model: 'wall_shelf_brown', pos: [3, -0.15, 2.0] })
  items.push({ model: 'picture_frame_standing_A_blue', pos: [2.6, -0.15, 2.4] })
  items.push({ model: 'picture_frame_standing_B_brown', pos: [3.4, -0.15, 2.4] })

  // PICTURE FRAMES
  items.push({ model: 'picture_frame_D_brown', pos: [-1, -0.1, 2.5] })
  items.push({ model: 'picture_frame_E_blue', pos: [1, -0.1, 2.2] })

  // CLOCKS
  items.push({ model: 'clock_wall_A', pos: [4.5, -0.1, 2.8] })
  items.push({ model: 'clock_standing', pos: [5.2, -0.6, -0.5] })

  // MISC
  items.push({ model: 'stool_B_orange', pos: [-2, -2, -0.5] })
  items.push({ model: 'table_B_brown', pos: [-4.5, -5, -0.5] })
  items.push({ model: 'lamp_table_white', pos: [-4.5, -5, 0.35] })
  items.push({ model: 'radio_red', pos: [-4.3, -4.7, 0.35] })

  // PRESENTS
  items.push({ model: 'box_A_blue', pos: [1, -5, -0.5] })
  items.push({ model: 'box_B_brown', pos: [1.5, -5.2, -0.5] })
  items.push({ model: 'box_A_white', pos: [1.2, -5.3, -0.2] })

  // AQUARIUM
  items.push({ model: 'aquarium', pos: [-4.5, -7, -0.5] })

  return items
}

// --- Loading indicator ---
function LoadingFallback() {
  return (
    <mesh position={[0, 1, 0]}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#fbbf24" wireframe />
    </mesh>
  )
}

// --- Room component ---
function LivingRoom() {
  const layout = useMemo(() => getRoomLayout(), [])

  // Ceiling tiles
  const ceilingPositions = useMemo(() => {
    const positions: [number, number, number][] = []
    for (let ix = 0; ix < 6; ix++) {
      for (let iy = 0; iy < 4; iy++) {
        const x = -5 + ix * 2
        const y = -1 - iy * 2
        positions.push(b2t(x, y, 4.0))
      }
    }
    return positions
  }, [])

  return (
    <group>
      {layout.map((item, i) => (
        <Suspense key={i} fallback={<LoadingFallback />}>
          <Piece
            model={item.model}
            position={b2t(...item.pos)}
            rotY={item.rot ? rotZ(item.rot) : 0}
          />
        </Suspense>
      ))}
      {ceilingPositions.map((pos, i) => (
        <Suspense key={`ceil-${i}`} fallback={null}>
          <CeilingTile position={pos} />
        </Suspense>
      ))}
    </group>
  )
}

// --- Main component ---
export default function TestR3F() {
  return (
    <div style={{ width: '1024px', height: '576px', background: '#1a0533', margin: '20px auto', borderRadius: '16px', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0.2, 1.5, 9.5], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        <color attach="background" args={['#c8bfb0']} />

        {/* Lighting — warm cozy room */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 10, 8]} intensity={2.5} color="#fff5e0" castShadow />
        <directionalLight position={[-6, 8, -2]} intensity={1.2} color="#e6eeff" />
        <directionalLight position={[0, 5, 10]} intensity={1} color="#fff8f0" />
        {/* Window lights */}
        <pointLight position={[-6, 2.5, 4]} intensity={30} color="#e8f0ff" distance={12} />
        <pointLight position={[-2, 2.5, 0]} intensity={20} color="#f0f4ff" distance={10} />
        <pointLight position={[2, 2.5, 0]} intensity={20} color="#f0f4ff" distance={10} />

        <Suspense fallback={<LoadingFallback />}>
          <LivingRoom />
        </Suspense>

        <OrbitControls target={[0, 0.3, 2.5]} />
      </Canvas>
    </div>
  )
}
