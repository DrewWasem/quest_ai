/**
 * VillageWorld — Persistent medieval village with quest zones.
 *
 * Renders a hex-tile village connecting quest zones. The village is always
 * visible. Zones are areas within it hosting different quests.
 *
 * Layout (top-down, Z axis):
 *   North (Z=-16): Dungeon Zone (skeleton-birthday)
 *   Center (Z=0):  Village Center (tavern, market, well, etc.)
 *   South (Z=+16): Park Zone (adventurers-picnic)
 *   Roads connect all three areas.
 *
 * Uses KayKit Medieval Hexagon Pack for terrain + buildings,
 * plus existing task environment pieces offset to zone positions.
 */

import { memo, useMemo, useCallback, Suspense } from 'react'
import { useGLTF, Html, Sky, Cloud, Clouds } from '@react-three/drei'
import * as THREE from 'three'
import { ASSET_BASE } from '../data/asset-manifest'
import { useGameStore, ZONE_CENTERS } from '../stores/gameStore'

// ============================================================================
// HEX GRID HELPERS
// ============================================================================

const HEX_SIZE = 2 // KayKit hex tiles are ~2 units wide (flat-top)
const HEX_HEIGHT = HEX_SIZE * Math.sqrt(3) / 2

/** Convert hex grid coords (col, row) to world position (flat-top hex layout) */
function hexToWorld(col: number, row: number): [number, number, number] {
  const x = col * HEX_SIZE * 0.75
  const z = row * HEX_HEIGHT + (col % 2 !== 0 ? HEX_HEIGHT / 2 : 0)
  return [x, 0, z]
}

// ============================================================================
// MEDIEVAL HEX ASSET PATHS
// ============================================================================

const HEX = 'kaykit/packs/medieval_hex/'

const TILES = {
  grass: HEX + 'tiles/base/hex_grass.gltf',
  road_A: HEX + 'tiles/roads/hex_road_A.gltf',
  road_B: HEX + 'tiles/roads/hex_road_B.gltf',
  road_C: HEX + 'tiles/roads/hex_road_C.gltf',
  road_D: HEX + 'tiles/roads/hex_road_D.gltf',
  water: HEX + 'tiles/base/hex_water.gltf',
  coast_A: HEX + 'tiles/coast/hex_coast_A.gltf',
  coast_B: HEX + 'tiles/coast/hex_coast_B.gltf',
  transition: HEX + 'tiles/base/hex_transition.gltf',
}

const BUILDINGS = {
  tavern: HEX + 'buildings/blue/building_tavern_blue.gltf',
  market: HEX + 'buildings/blue/building_market_blue.gltf',
  townhall: HEX + 'buildings/blue/building_townhall_blue.gltf',
  well: HEX + 'buildings/blue/building_well_blue.gltf',
  blacksmith: HEX + 'buildings/blue/building_blacksmith_blue.gltf',
  home_A: HEX + 'buildings/blue/building_home_A_blue.gltf',
  home_B: HEX + 'buildings/blue/building_home_B_blue.gltf',
  church: HEX + 'buildings/blue/building_church_blue.gltf',
  windmill: HEX + 'buildings/blue/building_windmill_blue.gltf',
  watchtower: HEX + 'buildings/blue/building_watchtower_blue.gltf',
  stables: HEX + 'buildings/blue/building_stables_blue.gltf',
  // Neutral
  bridge_A: HEX + 'buildings/neutral/building_bridge_A.gltf',
  stage_A: HEX + 'buildings/neutral/building_stage_A.gltf',
  fence_stone: HEX + 'buildings/neutral/fence_stone_straight.gltf',
  fence_stone_gate: HEX + 'buildings/neutral/fence_stone_straight_gate.gltf',
  wall_straight: HEX + 'buildings/neutral/wall_straight.gltf',
  wall_corner_outside: HEX + 'buildings/neutral/wall_corner_A_outside.gltf',
  wall_gate: HEX + 'buildings/neutral/wall_straight_gate.gltf',
}

const DECORATION = {
  // Nature
  tree_A: HEX + 'decoration/nature/tree_single_A.gltf',
  tree_B: HEX + 'decoration/nature/tree_single_B.gltf',
  trees_large: HEX + 'decoration/nature/trees_A_large.gltf',
  trees_medium: HEX + 'decoration/nature/trees_A_medium.gltf',
  trees_small: HEX + 'decoration/nature/trees_A_small.gltf',
  trees_B_large: HEX + 'decoration/nature/trees_B_large.gltf',
  mountain_A: HEX + 'decoration/nature/mountain_A_grass_trees.gltf',
  mountain_B: HEX + 'decoration/nature/mountain_B_grass.gltf',
  hill_A: HEX + 'decoration/nature/hill_single_A.gltf',
  hill_B: HEX + 'decoration/nature/hill_single_B.gltf',
  hills_trees: HEX + 'decoration/nature/hills_A_trees.gltf',
  rock_A: HEX + 'decoration/nature/rock_single_A.gltf',
  rock_B: HEX + 'decoration/nature/rock_single_B.gltf',
  // Props
  barrel: HEX + 'decoration/props/barrel.gltf',
  crate_A: HEX + 'decoration/props/crate_A_big.gltf',
  crate_B: HEX + 'decoration/props/crate_B_small.gltf',
  haybale: HEX + 'decoration/props/haybale.gltf',
  flag_blue: HEX + 'decoration/props/flag_blue.gltf',
  flag_red: HEX + 'decoration/props/flag_red.gltf',
  weaponrack: HEX + 'decoration/props/weaponrack.gltf',
  wheelbarrow: HEX + 'decoration/props/wheelbarrow.gltf',
  sack: HEX + 'decoration/props/sack.gltf',
  bucket_water: HEX + 'decoration/props/bucket_water.gltf',
  trough: HEX + 'decoration/props/trough.gltf',
  target: HEX + 'decoration/props/target.gltf',
}

// ============================================================================
// REUSABLE PIECE COMPONENT
// ============================================================================

interface PieceProps {
  model: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
}

const Piece = memo(({ model, position, rotation, scale = 1 }: PieceProps) => {
  const { scene } = useGLTF(ASSET_BASE + model)

  const cloned = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return clone
  }, [scene])

  const scaleArr: [number, number, number] = Array.isArray(scale)
    ? scale
    : [scale, scale, scale]

  return (
    <group position={position} rotation={rotation || [0, 0, 0]} scale={scaleArr}>
      <primitive object={cloned} />
    </group>
  )
})
Piece.displayName = 'Piece'

// ============================================================================
// ZONE MARKER — Clickable portal/signpost at zone entrance
// ============================================================================

interface ZoneMarkerProps {
  zoneId: string
  position: [number, number, number]
  label: string
  emoji: string
}

function ZoneMarker({ zoneId, position, label, emoji }: ZoneMarkerProps) {
  const enterZone = useGameStore((s) => s.enterZone)
  const currentZone = useGameStore((s) => s.currentZone)
  const isTransitioning = useGameStore((s) => s.isTransitioning)

  const handleClick = useCallback(() => {
    if (isTransitioning) return
    if (currentZone === zoneId) return
    enterZone(zoneId)
  }, [enterZone, zoneId, currentZone, isTransitioning])

  // Hide marker when already in this zone
  if (currentZone === zoneId) return null

  return (
    <group position={position}>
      {/* Glowing pillar */}
      <mesh position={[0, 1.5, 0]} onClick={handleClick}>
        <cylinderGeometry args={[0.3, 0.4, 3, 8]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Glowing orb on top */}
      <mesh position={[0, 3.2, 0]} onClick={handleClick}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#FBBF24"
          emissive="#FF8C42"
          emissiveIntensity={1.0}
        />
      </mesh>
      {/* Point light glow */}
      <pointLight
        color="#7C3AED"
        intensity={3}
        distance={8}
        decay={2}
        position={[0, 3, 0]}
      />
      {/* Label */}
      <Html position={[0, 4.5, 0]} center>
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-2 border-quest-purple/30
                     font-heading font-bold text-sm text-quest-text-dark whitespace-nowrap
                     hover:border-quest-purple hover:shadow-glow-purple transition-all cursor-pointer
                     select-none"
        >
          <span className="mr-1.5">{emoji}</span>
          {label}
        </button>
      </Html>
    </group>
  )
}

// ============================================================================
// HEX TERRAIN — Grass tiles covering the village area
// ============================================================================

function HexTerrain() {
  // Generate a grid of hex tiles covering the village area
  const tiles = useMemo(() => {
    const result: { model: string; position: [number, number, number]; rotation?: [number, number, number] }[] = []

    // Road tiles — 3 columns wide (col -1, 0, +1) for a visible road
    const roadCols = new Set([-1, 0, 1])
    const roadRows = new Set<string>()
    for (let row = -10; row <= 10; row++) {
      for (const col of roadCols) {
        roadRows.add(`${col},${row}`)
        const pos = hexToWorld(col, row)
        // Use different road pieces for variety
        const model = col === 0 ? TILES.road_A : TILES.road_B
        result.push({ model, position: pos })
      }
    }

    // Wide grass area — col -14 to +14 for the larger-scale buildings
    for (let col = -14; col <= 14; col++) {
      for (let row = -16; row <= 16; row++) {
        if (roadRows.has(`${col},${row}`)) continue // Road already placed
        const pos = hexToWorld(col, row)
        result.push({ model: TILES.grass, position: pos })
      }
    }

    return result
  }, [])

  return (
    <group name="hex-terrain">
      {tiles.map((tile, i) => (
        <Piece key={`tile-${i}`} model={tile.model} position={tile.position} rotation={tile.rotation} />
      ))}
    </group>
  )
}

// ============================================================================
// VILLAGE CENTER — Buildings, decoration, atmosphere
// ============================================================================

function VillageCenter() {
  // Scale 3.0 = buildings 3-5x character height (measured: char=2.61, townhall native=2.08 → 6.24 = 2.4x char)
  const s = 3.0
  // Decoration props need same scale to match buildings (hex props are strategy-game scale)
  const d = 3.0
  return (
    <group name="village-center" position={[0, 0, 0]}>
      {/* Town hall — center-right, biggest building and focal point */}
      <Piece model={BUILDINGS.townhall} position={[8, 0, -2]} rotation={[0, -Math.PI / 2, 0]} scale={s * 1.1} />

      {/* Tavern — left of center */}
      <Piece model={BUILDINGS.tavern} position={[-8, 0, -3]} rotation={[0, Math.PI / 4, 0]} scale={s} />

      {/* Market stall — right side, facing road */}
      <Piece model={BUILDINGS.market} position={[6, 0, 4]} rotation={[0, -Math.PI / 3, 0]} scale={s} />

      {/* Well — village square center */}
      <Piece model={BUILDINGS.well} position={[-4, 0, 1]} scale={s} />

      {/* Blacksmith — left side */}
      <Piece model={BUILDINGS.blacksmith} position={[-10, 0, 3]} rotation={[0, Math.PI / 2, 0]} scale={s} />

      {/* Homes — spread around the village */}
      <Piece model={BUILDINGS.home_A} position={[10, 0, -5]} rotation={[0, -Math.PI / 2, 0]} scale={s} />
      <Piece model={BUILDINGS.home_B} position={[-10, 0, -4]} rotation={[0, Math.PI / 3, 0]} scale={s} />
      <Piece model={BUILDINGS.home_A} position={[-12, 0, 6]} rotation={[0, Math.PI / 6, 0]} scale={s * 0.9} />
      <Piece model={BUILDINGS.home_B} position={[12, 0, 5]} rotation={[0, -Math.PI / 6, 0]} scale={s * 0.9} />

      {/* Church — right side, tall spire visible from afar */}
      <Piece model={BUILDINGS.church} position={[12, 0, 1]} rotation={[0, -Math.PI / 2, 0]} scale={s * 1.1} />

      {/* Windmill — left, tall and distinctive */}
      <Piece model={BUILDINGS.windmill} position={[-13, 0, 0]} rotation={[0, Math.PI / 6, 0]} scale={s * 1.1} />

      {/* Stables — near the road */}
      <Piece model={BUILDINGS.stables} position={[5, 0, -5]} rotation={[0, 0, 0]} scale={s} />

      {/* Decoration props at matching scale */}
      <Piece model={DECORATION.barrel} position={[-5, 0, -1]} scale={d} />
      <Piece model={DECORATION.crate_A} position={[4, 0, 1]} scale={d} />
      <Piece model={DECORATION.haybale} position={[-5, 0, 5]} scale={d} />
      <Piece model={DECORATION.wheelbarrow} position={[3, 0, -3]} scale={d} />
      <Piece model={DECORATION.sack} position={[-4, 0, 3]} scale={d} />
      <Piece model={DECORATION.bucket_water} position={[-3, 0, 0.5]} scale={d} />
      <Piece model={DECORATION.trough} position={[3, 0, 2.5]} scale={d} />
      <Piece model={DECORATION.flag_blue} position={[1, 0, -5]} scale={d} />

      {/* Trees around the village edges — also scaled up */}
      <Piece model={DECORATION.tree_A} position={[-14, 0, -1]} scale={d} />
      <Piece model={DECORATION.tree_B} position={[14, 0, -1]} scale={d} />
      <Piece model={DECORATION.trees_small} position={[-13, 0, 5]} scale={d * 0.8} />
      <Piece model={DECORATION.trees_small} position={[13, 0, -4]} scale={d * 0.8} />
      <Piece model={DECORATION.tree_A} position={[-5, 0, -6]} scale={d * 0.9} />
      <Piece model={DECORATION.tree_B} position={[9, 0, 6.5]} scale={d * 0.9} />
    </group>
  )
}

// ============================================================================
// PERIMETER — Mountains, trees, hills around the village edges
// ============================================================================

function VillagePerimeter() {
  // Perimeter elements pushed further out for the larger-scale village
  return (
    <group name="village-perimeter">
      {/* Mountains — large backdrop ring */}
      <Piece model={DECORATION.mountain_A} position={[-24, 0, -24]} scale={4.0} />
      <Piece model={DECORATION.mountain_B} position={[24, 0, -26]} scale={3.5} />
      <Piece model={DECORATION.mountain_A} position={[-24, 0, 14]} scale={3.0} />
      <Piece model={DECORATION.mountain_B} position={[24, 0, 18]} scale={3.5} />
      <Piece model={DECORATION.mountain_A} position={[0, 0, -34]} scale={4.5} />
      <Piece model={DECORATION.mountain_B} position={[-14, 0, -30]} scale={3.0} />
      <Piece model={DECORATION.mountain_A} position={[14, 0, -30]} scale={3.5} />
      <Piece model={DECORATION.mountain_B} position={[-22, 0, 30]} scale={3.0} />
      <Piece model={DECORATION.mountain_A} position={[22, 0, 32]} scale={3.5} />
      <Piece model={DECORATION.mountain_B} position={[0, 0, 36]} scale={4.0} />

      {/* Hills — medium distance ring */}
      <Piece model={DECORATION.hills_trees} position={[-16, 0, -12]} scale={2.5} />
      <Piece model={DECORATION.hills_trees} position={[16, 0, 10]} scale={2.5} />
      <Piece model={DECORATION.hill_A} position={[-16, 0, 20]} scale={2.0} />
      <Piece model={DECORATION.hill_B} position={[16, 0, -14]} scale={2.0} />
      <Piece model={DECORATION.hills_trees} position={[-18, 0, 2]} scale={2.5} />
      <Piece model={DECORATION.hill_A} position={[18, 0, -2]} scale={2.0} />

      {/* Dense tree clusters along the edges — scaled up */}
      <Piece model={DECORATION.trees_large} position={[-15, 0, -16]} scale={2.5} />
      <Piece model={DECORATION.trees_medium} position={[15, 0, 20]} scale={2.5} />
      <Piece model={DECORATION.trees_B_large} position={[-15, 0, 8]} scale={2.5} />
      <Piece model={DECORATION.trees_medium} position={[15, 0, -8]} scale={2.5} />
      <Piece model={DECORATION.trees_large} position={[-17, 0, -4]} scale={2.5} />
      <Piece model={DECORATION.trees_B_large} position={[17, 0, 4]} scale={2.5} />
      <Piece model={DECORATION.trees_large} position={[-14, 0, 24]} scale={2.0} />
      <Piece model={DECORATION.trees_B_large} position={[14, 0, -20]} scale={2.0} />

      {/* Rocks scattered around edges */}
      <Piece model={DECORATION.rock_A} position={[-12, 0, -14]} scale={3.0} />
      <Piece model={DECORATION.rock_B} position={[12, 0, 14]} scale={3.0} />
      <Piece model={DECORATION.rock_A} position={[-14, 0, 26]} scale={2.5} />
      <Piece model={DECORATION.rock_B} position={[14, 0, -22]} scale={2.5} />
    </group>
  )
}

// ============================================================================
// DUNGEON ZONE — Northern area (skeleton-birthday quest)
// ============================================================================

function DungeonZone() {
  const center = ZONE_CENTERS['skeleton-birthday']

  return (
    <group name="dungeon-zone" position={center}>
      {/* Dungeon courtyard built from character-scale dungeon pack pieces */}

      {/* Stone walls (dungeon pack — properly scaled for characters) */}
      <Piece model="kaykit/packs/dungeon/wall_half.gltf" position={[-4, 0, -5]} />
      <Piece model="kaykit/packs/dungeon/wall_half.gltf" position={[-2, 0, -5]} />
      <Piece model="kaykit/packs/dungeon/wall_doorway.gltf" position={[0, 0, -5]} />
      <Piece model="kaykit/packs/dungeon/wall_half.gltf" position={[2, 0, -5]} />
      <Piece model="kaykit/packs/dungeon/wall_half.gltf" position={[4, 0, -5]} />

      {/* Side walls */}
      <Piece model="kaykit/packs/dungeon/wall_half.gltf" position={[-5, 0, -3]} rotation={[0, Math.PI / 2, 0]} />
      <Piece model="kaykit/packs/dungeon/wall_half.gltf" position={[-5, 0, -1]} rotation={[0, Math.PI / 2, 0]} />
      <Piece model="kaykit/packs/dungeon/wall_half.gltf" position={[5, 0, -3]} rotation={[0, Math.PI / 2, 0]} />
      <Piece model="kaykit/packs/dungeon/wall_half.gltf" position={[5, 0, -1]} rotation={[0, Math.PI / 2, 0]} />

      {/* Decorated pillars at entrance and inside */}
      <Piece model="kaykit/packs/dungeon/pillar_decorated.gltf" position={[-5, 0, 1]} scale={1.2} />
      <Piece model="kaykit/packs/dungeon/pillar_decorated.gltf" position={[5, 0, 1]} scale={1.2} />
      <Piece model="kaykit/packs/dungeon/pillar_decorated.gltf" position={[-3, 0, -1]} scale={1.0} />
      <Piece model="kaykit/packs/dungeon/pillar_decorated.gltf" position={[3, 0, -1]} scale={1.0} />

      {/* Dungeon floor covering the courtyard */}
      <Piece model="kaykit/packs/dungeon/floor_tile_large.gltf" position={[0, 0.01, -2]} />
      <Piece model="kaykit/packs/dungeon/floor_tile_large.gltf" position={[-2, 0.01, -2]} />
      <Piece model="kaykit/packs/dungeon/floor_tile_large.gltf" position={[2, 0.01, -2]} />
      <Piece model="kaykit/packs/dungeon/floor_tile_large.gltf" position={[0, 0.01, 0]} />
      <Piece model="kaykit/packs/dungeon/floor_tile_large.gltf" position={[-2, 0.01, 0]} />
      <Piece model="kaykit/packs/dungeon/floor_tile_large.gltf" position={[2, 0.01, 0]} />

      {/* Torches on the walls */}
      <Piece model="kaykit/packs/dungeon/torch_lit.gltf" position={[-4, 0, -3]} />
      <Piece model="kaykit/packs/dungeon/torch_lit.gltf" position={[4, 0, -3]} />
      <Piece model="kaykit/packs/dungeon/torch_lit.gltf" position={[-4, 0, -1]} />
      <Piece model="kaykit/packs/dungeon/torch_lit.gltf" position={[4, 0, -1]} />

      {/* Props — scaled down (dungeon barrel_large=2.0 native, target ~0.8 = 0.4 scale) */}
      <Piece model="kaykit/packs/dungeon/barrel_large.gltf" position={[-4.5, 0, 0]} scale={0.4} />
      <Piece model="kaykit/packs/dungeon/barrel_small.gltf" position={[-4.2, 0, 0.6]} scale={0.5} />
      <Piece model="kaykit/packs/dungeon/barrel_small.gltf" position={[-3.8, 0, 0.3]} scale={0.5} />
      <Piece model="kaykit/packs/dungeon/chest_large_gold.gltf" position={[4, 0, -4]} rotation={[0, Math.PI, 0]} scale={0.35} />
      <Piece model="kaykit/packs/dungeon/chest_gold.gltf" position={[3.5, 0, 0]} scale={0.4} />

      {/* Banners on the back wall (scale 0.8 — slightly smaller for proportion) */}
      <Piece model="kaykit/packs/dungeon/banner_patternA_blue.gltf" position={[-2, 1.5, -4.8]} scale={0.7} />
      <Piece model="kaykit/packs/dungeon/banner_patternB_red.gltf" position={[0, 1.5, -4.8]} scale={0.7} />
      <Piece model="kaykit/packs/dungeon/banner_patternA_green.gltf" position={[2, 1.5, -4.8]} scale={0.7} />

      {/* Torch glow — warm orange light */}
      <pointLight color="#ff6600" intensity={3} distance={10} decay={2} position={[-4, 3, -3]} />
      <pointLight color="#ff6600" intensity={3} distance={10} decay={2} position={[4, 3, -3]} />
      <pointLight color="#ff4400" intensity={2} distance={8} decay={2} position={[0, 2, -4]} />

      {/* Approach decoration (hex props scaled up to match character world) */}
      <Piece model={DECORATION.flag_red} position={[-5, 0, 3]} scale={3.0} />
      <Piece model={DECORATION.flag_red} position={[5, 0, 3]} scale={3.0} />
      <Piece model={DECORATION.weaponrack} position={[-3, 0, 2]} scale={3.0} />
      <Piece model={DECORATION.target} position={[3, 0, 2]} scale={3.0} />
    </group>
  )
}

// ============================================================================
// PARK ZONE — Southern area (adventurers-picnic quest)
// ============================================================================

function ParkZone() {
  const center = ZONE_CENTERS['adventurers-picnic']
  const ts = 0.8 // tree scale — smaller than close-up view

  return (
    <group name="park-zone" position={center}>
      {/* Tree ring (scaled down from original scene - these are viewed from above now) */}
      <Piece model="tiny-treats/pretty-park/tree_large.gltf" position={[-6, 0, -4]} scale={ts} />
      <Piece model={DECORATION.tree_A} position={[-4, 0, -5]} scale={0.9} />
      <Piece model="tiny-treats/pretty-park/tree.gltf" position={[-2, 0, -6]} scale={ts} />
      <Piece model={DECORATION.tree_B} position={[0, 0, -6]} scale={0.9} />
      <Piece model="tiny-treats/pretty-park/tree_large.gltf" position={[2, 0, -5.5]} scale={ts} />
      <Piece model={DECORATION.tree_A} position={[4, 0, -5]} scale={0.9} />
      <Piece model="tiny-treats/pretty-park/tree.gltf" position={[6, 0, -3]} scale={ts} />
      <Piece model={DECORATION.tree_B} position={[7, 0, 0]} scale={0.9} />
      <Piece model="tiny-treats/pretty-park/tree_large.gltf" position={[-7, 0, 0]} scale={ts} />

      {/* Bushes */}
      <Piece model="tiny-treats/pretty-park/bush.gltf" position={[-5, 0, -3]} scale={0.8} />
      <Piece model="tiny-treats/pretty-park/bush_large.gltf" position={[5, 0, -4]} scale={0.7} />

      {/* Flowers */}
      <Piece model="tiny-treats/pretty-park/flower_A.gltf" position={[-3, 0, -2]} />
      <Piece model="tiny-treats/pretty-park/flower_B.gltf" position={[3, 0, -1.5]} />

      {/* Park bench and fountain */}
      <Piece model="tiny-treats/pretty-park/bench.gltf" position={[-4, 0, 2]} rotation={[0, Math.PI / 4, 0]} />
      <Piece model="tiny-treats/pretty-park/bench.gltf" position={[4, 0, 1]} rotation={[0, -Math.PI / 4, 0]} />
      <Piece model="tiny-treats/pretty-park/fountain.gltf" position={[0, 0, -2]} scale={0.8} />
      <Piece model="tiny-treats/pretty-park/street_lantern.gltf" position={[-5, 0, 0]} />
      <Piece model="tiny-treats/pretty-park/street_lantern.gltf" position={[5, 0, 0]} />

      {/* Hedges along sides */}
      <Piece model="tiny-treats/pretty-park/hedge_straight_long.gltf" position={[-6, 0, 3]} rotation={[0, Math.PI / 2, 0]} />
      <Piece model="tiny-treats/pretty-park/hedge_straight_long.gltf" position={[6, 0, 3]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Stone fence entrance (hex pack — scale 2.0 to match character proportions) */}
      <Piece model={BUILDINGS.fence_stone} position={[-5, 0, -6]} scale={2.0} />
      <Piece model={BUILDINGS.fence_stone} position={[-3, 0, -6]} scale={2.0} />
      <Piece model={BUILDINGS.fence_stone_gate} position={[-1, 0, -6]} scale={2.0} />
      <Piece model={BUILDINGS.fence_stone_gate} position={[1, 0, -6]} scale={2.0} />
      <Piece model={BUILDINGS.fence_stone} position={[3, 0, -6]} scale={2.0} />
      <Piece model={BUILDINGS.fence_stone} position={[5, 0, -6]} scale={2.0} />
    </group>
  )
}

// ============================================================================
// ROAD DECORATION — Props along the road between zones
// ============================================================================

function RoadDecoration() {
  const d = 3.0 // Scale hex decoration to match building scale
  return (
    <group name="road-decoration">
      {/* Signposts along the road */}
      <Piece model={DECORATION.flag_blue} position={[3, 0, -6]} scale={d} />
      <Piece model={DECORATION.flag_blue} position={[3, 0, -12]} scale={d} />
      <Piece model={DECORATION.flag_blue} position={[3, 0, 6]} scale={d} />
      <Piece model={DECORATION.flag_blue} position={[3, 0, 12]} scale={d} />

      {/* Props along the road */}
      <Piece model={DECORATION.barrel} position={[-3, 0, -8]} scale={d} />
      <Piece model={DECORATION.crate_B} position={[-3, 0, 8]} scale={d} />
      <Piece model={DECORATION.haybale} position={[3, 0, -4]} scale={d} />
      <Piece model={DECORATION.trough} position={[-3, 0, 4]} scale={d} />

      {/* Trees along the road */}
      <Piece model={DECORATION.tree_A} position={[-5, 0, -8]} scale={d} />
      <Piece model={DECORATION.tree_B} position={[5, 0, -10]} scale={d} />
      <Piece model={DECORATION.tree_A} position={[-5, 0, 8]} scale={d} />
      <Piece model={DECORATION.tree_B} position={[5, 0, 10]} scale={d} />
    </group>
  )
}

// ============================================================================
// VILLAGE ATMOSPHERE — Global lighting and effects
// ============================================================================

function VillageAtmosphere() {
  return (
    <>
      {/* Procedural sky — eliminates black void */}
      <Sky
        distance={450000}
        sunPosition={[8, 15, 5]}
        turbidity={6}
        rayleigh={1.5}
      />

      {/* Global fog — soft edges, pushes far for the larger village */}
      <fog attach="fog" args={['#b8d8e8', 40, 180]} />

      {/* Hemisphere light — warm village afternoon */}
      <hemisphereLight
        color="#87CEEB"
        groundColor="#556B2F"
        intensity={0.8}
      />

      {/* Main directional light (sun) */}
      <directionalLight
        color="#fff8e0"
        intensity={1.5}
        position={[10, 15, 8]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-far={120}
      />

      {/* Fill light from opposite side */}
      <directionalLight
        color="#aaccff"
        intensity={0.3}
        position={[-8, 5, -5]}
      />

      {/* Clouds */}
      <Clouds limit={200} material={THREE.MeshLambertMaterial}>
        <Cloud
          segments={20}
          bounds={[15, 2, 8] as [number, number, number]}
          volume={8}
          color="#ffffff"
          opacity={0.4}
          speed={0.15}
          position={[-8, 14, -25] as [number, number, number]}
        />
        <Cloud
          segments={15}
          bounds={[10, 2, 5] as [number, number, number]}
          volume={6}
          color="#ffffff"
          opacity={0.35}
          speed={0.1}
          position={[10, 16, -20] as [number, number, number]}
        />
      </Clouds>
    </>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function VillageWorld() {
  return (
    <group name="village-world">
      {/* Global atmosphere (replaces per-task TaskAtmosphere) */}
      <VillageAtmosphere />

      {/* Hex tile terrain */}
      <Suspense fallback={null}>
        <HexTerrain />
      </Suspense>

      {/* Village center buildings */}
      <Suspense fallback={null}>
        <VillageCenter />
      </Suspense>

      {/* Perimeter mountains and trees */}
      <Suspense fallback={null}>
        <VillagePerimeter />
      </Suspense>

      {/* Road decoration */}
      <Suspense fallback={null}>
        <RoadDecoration />
      </Suspense>

      {/* Quest zone: Dungeon (north) */}
      <Suspense fallback={null}>
        <DungeonZone />
      </Suspense>

      {/* Quest zone: Park (south) */}
      <Suspense fallback={null}>
        <ParkZone />
      </Suspense>

      {/* Zone markers (clickable portals) */}
      <ZoneMarker
        zoneId="skeleton-birthday"
        position={[0, 0, -8]}
        label="Dungeon"
        emoji="💀"
      />
      <ZoneMarker
        zoneId="adventurers-picnic"
        position={[0, 0, 8]}
        label="The Park"
        emoji="🧺"
      />
    </group>
  )
}
