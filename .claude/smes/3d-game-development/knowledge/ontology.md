# Ontology — 3D Game Development Domain Model

## The Rendering Pipeline

```
Scene Graph → Camera → Renderer → Post-Processing → Screen
     │           │         │              │
   Meshes     Projection  WebGL       EffectComposer
   Lights     FOV/Aspect  Draw Calls   Bloom, Vignette
   Groups     Near/Far    Shadow Maps   Color Grading
```

## Core Three.js Concepts

### Scene Graph
- **Scene:** Root container. Everything visible must be added to the scene.
- **Group:** Logical container for related objects. Transform applies to all children.
- **Mesh:** Geometry + Material. The visible thing.
- **Geometry:** The shape (vertices, faces, normals, UVs).
- **Material:** The surface appearance (color, texture, shininess, transparency).
- **Texture:** An image applied to a material via UV mapping.

### Lighting Types
| Light | Cost | Shadows | Use |
|-------|------|---------|-----|
| AmbientLight | Cheapest | No | Base fill, prevents pure black |
| HemisphereLight | Cheap | No | Sky/ground dual-color ambient |
| DirectionalLight | Medium | Yes (expensive) | Sun, main scene light |
| PointLight | Medium | Yes (very expensive) | Torches, lamps, effects |
| SpotLight | Expensive | Yes | Focused beams, stage lights |

### Animation System
- **AnimationMixer:** Per-object animation controller. Drives all clips for one model.
- **AnimationClip:** A single named animation (e.g., "Walk", "Wave", "Idle").
- **AnimationAction:** An instance of a clip being played. Controls play/pause/loop/weight.
- **crossFadeTo(action, duration):** Smooth transition between two actions.
- **Shared Rig:** Multiple character models sharing the same bone structure (KayKit's "Rig_Medium"). Allows one set of animation clips to work across all characters.

## React Three Fiber (R3F)

### Architecture
```
React Component Tree
    │
    └── <Canvas>              ← Creates WebGL renderer + scene + camera
         ├── <ambientLight>   ← Declarative Three.js objects
         ├── <mesh>
         │    ├── <geometry>
         │    └── <material>
         ├── <Suspense>       ← Loading boundary for async models
         │    └── <Model />   ← Custom component using useGLTF
         └── <EffectComposer> ← Post-processing pipeline
              ├── <Bloom>
              └── <Vignette>
```

### Key Hooks
| Hook | Purpose |
|------|---------|
| `useFrame(callback)` | Per-frame logic (animation, movement). Use refs, not state. |
| `useThree()` | Access renderer, scene, camera, gl context |
| `useGLTF(url)` | Load GLTF/GLB model (cached by URL) |
| `useAnimations(clips, ref)` | Bind animation clips to a model ref |
| `useTexture(url)` | Load texture (cached by URL) |

### Drei Helpers (Most Used)
| Component | Purpose |
|-----------|---------|
| `<OrbitControls>` | Camera mouse/touch controls |
| `<Environment preset="">` | IBL environment maps (night, sunset, park, etc.) |
| `<Sky>` | Procedural sky shader |
| `<Stars>` | GPU starfield particles |
| `<Sparkles>` | Floating sparkle particles |
| `<ContactShadows>` | Soft blob shadows on ground plane |
| `<SoftShadows>` | Softer shadow edges (global patch) |
| `<Float>` | Gentle floating animation wrapper |
| `<Html>` | HTML overlay positioned in 3D space |
| `<useGLTF>` | GLTF loader with caching |

## GLTF Format

### Structure
```
.gltf/.glb file
├── scenes[]        ← Named scene hierarchies
├── nodes[]         ← Transform nodes (position, rotation, scale)
├── meshes[]        ← Geometry data
├── materials[]     ← PBR material definitions
├── textures[]      ← Image references
├── images[]        ← Embedded or external image data
├── animations[]    ← Named animation clips
└── skins[]         ← Skeleton/bone data for skinned meshes
```

### KayKit Asset Convention
- **Models:** ~1000 triangles each, single 1024x1024 gradient atlas per pack
- **Rig:** Shared "Rig_Medium" bone hierarchy across all humanoid characters
- **Animations:** 161 clips in separate GLB files, applicable to any Rig_Medium model
- **Props:** Static meshes (no rig), same atlas style for visual consistency
- **Scale:** ~1 unit = ~1 character height

## Performance Metrics

| Metric | Target | How to Check |
|--------|--------|-------------|
| FPS | 60 stable | `renderer.info.render.fps` or browser devtools |
| Draw calls | <50 | `renderer.info.render.calls` |
| Triangles | <100K | `renderer.info.render.triangles` |
| Textures | <20 loaded | `renderer.info.memory.textures` |
| Geometries | <50 loaded | `renderer.info.memory.geometries` |
| JS heap | <100MB | Chrome DevTools Performance tab |
