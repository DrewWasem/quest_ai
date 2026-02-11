# Scene Atmosphere Research — Findings

**Date:** 2026-02-10
**Sources:** 3 parallel research agents (R3F techniques, codebase analysis, game engine patterns)

## Current State (What's Wrong)

The 3D scenes render in a dark void. Root causes identified in `R3FGame.tsx`:

1. **Background:** `style={{ background: '#1A0533' }}` — flat CSS color, no 3D sky/backdrop
2. **Ground:** 20x20 `planeGeometry` with `#2a1a4a` flat color — hard rectangular edge, no fade
3. **Lighting:** Single `ambientLight(#ffeedd, 0.6)` + single `directionalLight(#fff, 1.0)` — flat, uniform
4. **No fog** — objects have hard silhouettes against the void
5. **No particles** — no ambient sparkles, dust, or magical motes
6. **No post-processing** — no bloom, vignette, or color grading
7. **No shadows on characters/props** — `castShadow`/`receiveShadow` not set on Character3D or Prop3D
8. **No environment map** — MeshStandardMaterial looks flat without IBL reflections
9. **`@react-three/postprocessing` not installed**

## Techniques Researched (Ranked by Impact/Effort)

### Tier 1: Immediate Impact (1-2 lines each)

| Technique | What It Does | GPU Cost | Lines |
|-----------|-------------|----------|-------|
| `<color>` + `<fog>` | Eliminates the void, blends ground edge | Negligible | 2 |
| `<hemisphereLight>` | Sky+ground dual-color ambient, replaces flat ambient | Negligible | 1 |
| `<Sparkles>` | GPU-shader floating magic particles | Low (1 draw call) | 1 |
| `<ContactShadows>` | Soft blob shadows under all objects | Medium | 1 |

### Tier 2: Environment & Sky (1 component each)

| Technique | What It Does | GPU Cost |
|-----------|-------------|----------|
| `<Environment preset="...">` | HDR environment map for IBL + optional blurred bg | Low |
| `<Sky>` | Procedural sky shader (outdoor scenes) | Low |
| GradientTexture backdrop | Painted gradient wall behind scene (indoor scenes) | Negligible |
| Circular ground + fade | Eliminates hard rectangular ground edge | Negligible |

### Tier 3: Post-Processing (requires npm install)

| Effect | What It Does | GPU Cost |
|--------|-------------|----------|
| Bloom | Makes emissive objects glow | Medium |
| Vignette | Darkens screen edges, cinematic focus | Low (merged) |
| Noise | Subtle film grain, storybook texture | Low (merged) |
| DepthOfField | Toybox/miniature tilt-shift look | Medium-High |

### Tier 4: Atmospheric Details

| Technique | What It Does | GPU Cost |
|-----------|-------------|----------|
| `<Stars>` | Shader starfield for night/space | Low |
| `<Cloud>` | Billboard cloud clusters | Low-Medium |
| `<Float>` | Gentle bobbing for magical props | Negligible |
| `<SoftShadows>` | Global soft shadow patch | Low |
| `<pointLight>` | Localized light pools (torches) | Low per light |
| `<Grid>` | Infinite fading floor grid (space scene) | Low |

## Per-Task Atmosphere Stacks

### T1: Skeleton's Surprise Birthday (Magical Dungeon)
- Background: `#0a0015` (near black purple)
- Fog: `['#0a0015', 8, 22]`
- Hemisphere: sky `#6633aa`, ground `#331155`
- Environment: `night` preset, bg blurriness 0.9
- Point lights: 2x warm orange torch glow
- Sparkles: 80, purple `#aa88ff`
- Stars: 300, sparse dungeon ceiling
- Vignette: darkness 0.5

### T2: Knight's Space Mission (Space Station)
- Background: `#020208` (near black)
- Fog: `['#020208', 15, 40]`
- Hemisphere: sky `#000033`, ground `#111122`
- Environment: `night` preset, bg blurriness 0.5
- Stars: 5000, dense space
- Sparkles: 40, blue stardust
- Grid: infinite holographic floor
- Bloom: intensity 1.0 (bright tech glow)

### T3: Mage vs. Kitchen (Warm Interior)
- Background: `#1a1008` (dark warm)
- Fog: `['#1a1008', 10, 25]`
- Hemisphere: sky `#ffcc88`, ground `#664422`
- Environment: `apartment` preset (no bg)
- Point light: warm orange kitchen glow
- Sparkles: 60, golden magical `#ffaa44`
- Bloom: intensity 0.5

### T4: Barbarian's School (Outdoor Playground)
- Sky: `sunPosition={[5, 10, 8]}`, turbidity 8
- Fog: `['#87CEEB', 20, 45]`
- Hemisphere: sky `#87CEEB`, ground `#556B2F`
- Environment: `park` preset
- Clouds: white fluffy at y=10
- Sparkles: 30, green `#88ff88`
- Directional light intensity: 1.5 (bright sun)

### T5: Dungeon Rock Concert (Smoky Dungeon)
- Background: `#080410` (very dark)
- Fog: `['#080410', 5, 18]` (thick!)
- Hemisphere: sky `#4422aa`, ground `#221133`
- Point lights: 3x colored concert (red, blue, magenta)
- Stars: 200 sparse
- Sparkles: 150, magenta `#ff44ff`
- Cloud wisps: purple fog near ground
- Bloom: intensity 1.2 (strong concert glow)
- Vignette: darkness 0.7

### T6: Skeleton Pizza Delivery (Evening Street)
- Environment: `sunset` preset, bg blurriness 0.7
- Fog: `['#1a2a40', 12, 30]`
- Hemisphere: sky `#ff9966`, ground `#553322`
- Directional light: warm `#ffddaa`
- Sparkles: 40, warm gold `#ffcc66`
- Vignette: darkness 0.35

### T7: Adventurers' Picnic (Bright Outdoor)
- Sky: `sunPosition={[8, 15, 5]}`, turbidity 6
- Fog: `['#d4e8f0', 25, 55]`
- Environment: `park` preset
- Hemisphere: sky `#87CEEB`, ground `#7CFC00`
- Clouds: 2x white fluffy
- Sparkles: 50, warm gold `#ffdd44`
- Directional light intensity: 1.8 (bright sun)
- Bloom: low 0.2

## Performance Budget

Target: <100 draw calls total, <5ms GPU time for atmosphere.
All recommended stacks stay well within budget.

## Key Insight: drei Already Installed

`@react-three/drei@^9.122.0` is already in dependencies — ALL Tier 1-2 and Tier 4 components are available immediately. Only post-processing (Tier 3) needs an `npm install`.
