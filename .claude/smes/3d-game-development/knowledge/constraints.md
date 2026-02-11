# Hard Constraints — 3D Game Development

## Memory & Disposal

- **ALWAYS dispose geometries, materials, and textures** when removing objects from scene. Three.js does NOT garbage collect GPU resources.
- **NEVER create new geometries/materials inside useFrame** — this runs 60x/second and will leak memory instantly.
- **ALWAYS use useEffect cleanup** to dispose resources when React components unmount.
- **NEVER modify geometry vertices inside render loop** without explicit need — use shaders or morph targets instead.

## Animation

- **ALWAYS use SkeletonUtils.clone()** when cloning skinned meshes — `object.clone()` shares the skeleton and causes animation cross-contamination.
- **NEVER assume animation clip names are stable** across different GLTF exports — always log available clip names and use fuzzy matching or a name map.
- **ALWAYS stop AnimationMixer** on component unmount to prevent ghost animations.
- **NEVER crossFadeTo with duration 0** — use play() directly for instant transitions.

## React Three Fiber

- **NEVER use setState inside useFrame** — this causes React re-renders at 60fps. Use refs for per-frame updates.
- **ALWAYS use useMemo or useRef for Three.js objects** created in components — prevents recreation on every render.
- **NEVER nest Canvas components** — one Canvas per application.
- **ALWAYS set frameloop="demand" or use invalidate()** for non-animated scenes to save CPU.

## GLTF Loading

- **ALWAYS preload models** with useGLTF.preload() during loading screens — never lazy-load during gameplay.
- **NEVER load the same GLB twice for unique instances** — load once, clone with SkeletonUtils.clone().
- **ALWAYS handle missing models gracefully** — show a placeholder, never crash. Use error boundaries around model components.

## Performance Budget

- **Maximum 50 draw calls per frame** for mobile compatibility
- **Maximum 100K triangles total scene** for consistent 60fps
- **Texture atlas preferred** over individual textures — fewer material swaps = fewer draw calls
- **Maximum 10 active AnimationMixers** per scene — each mixer has per-frame cost
- **Shadow maps: 1024x1024 maximum** — higher resolutions kill mobile performance

## Lighting

- **NEVER use more than 2 shadow-casting lights** — shadow maps are the most expensive GPU operation
- **ALWAYS use a hemisphere light** for ambient — it's cheaper than ambient + directional for base illumination
- **Baked lighting preferred** for static environments — real-time lights only for dynamic elements
