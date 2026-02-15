# Scene Atmosphere Implementation Plan

**Goal:** Transform bland dark-void scenes into immersive, per-task themed environments.
**Research:** `.claude/memory/research/scene-atmosphere.md`
**Deadline:** Feb 16 (hackathon), atmosphere should be done by Feb 11 evening.

## Architecture Decision

Create a new `TaskAtmosphere.tsx` component that encapsulates ALL atmosphere elements and is configured per-task. R3FGame.tsx renders it inside the Canvas based on the active `taskId`. This keeps R3FGame.tsx clean and atmosphere fully data-driven.

```
R3FGame.tsx
  └── <Canvas>
        ├── <TaskAtmosphere taskId={taskId} />  ← NEW
        ├── <ScenePlayer3D ... />               ← existing
        └── <OrbitControls />                   ← existing
```

## Phase 1: Foundation — Fog, Hemisphere Light, Sparkles, Ground (15 min)

**File: `frontend/src/game/TaskAtmosphere.tsx` (NEW)**

### Task 1.1: Create TaskAtmosphere component
- Create `TASK_ATMOSPHERE` config object with per-task settings:
  - `background` color
  - `fog` { color, near, far }
  - `hemisphere` { sky, ground, intensity }
  - `sparkles` { count, color, size, speed, scale }
  - `contactShadows` { opacity, blur }
- Render: `<color>`, `<fog>`, `<hemisphereLight>`, `<Sparkles>`, `<ContactShadows>`
- Export default ATMOSPHERE_DEFAULTS for unlisted tasks

### Task 1.2: Wire into R3FGame.tsx
- Import TaskAtmosphere
- Remove existing `ambientLight` (replaced by hemisphereLight)
- Remove existing ground `<mesh>` (will be in TaskAtmosphere)
- Remove `style={{ background: '#1A0533' }}` (replaced by `<color>`)
- Add `<TaskAtmosphere taskId={taskId} />` inside Canvas

### Task 1.3: Improve ground plane
- Replace rectangular 20x20 plane with circular geometry (`circleGeometry args={[12, 64]}`)
- Add slight transparency at edges (or just let fog handle it)
- Keep `receiveShadow`

**Verify:** Dev server shows fog, colored ambient, sparkles, soft ground shadows for any task.

## Phase 2: Sky, Environment, Backdrop (15 min)

### Task 2.1: Add Environment presets to config
- Extend `TASK_ATMOSPHERE` with `environment` { preset, background?, backgroundBlurriness? }
- Render `<Environment>` when configured
- Indoor scenes: preset only (no bg) — e.g., `apartment` for kitchen
- Night scenes: preset with blurred bg — e.g., `night` with blurriness 0.9
- Outdoor scenes: preset with medium blur — e.g., `park` with blurriness 0.5

### Task 2.2: Add Sky for outdoor tasks
- Extend config with `sky` { sunPosition, turbidity, rayleigh }
- Render `<Sky>` when configured
- Only for `barbarian-school` and `adventurers-picnic`

### Task 2.3: Add GradientTexture backdrop for indoor tasks
- Large plane at z=-12, scale=[30, 15, 1]
- GradientTexture with task-specific colors
- depthWrite={false} so it doesn't interfere with scene
- Only for tasks WITHOUT Sky or Environment bg

**Verify:** Outdoor tasks show sky + clouds, indoor tasks show gradient/environment backdrop. No more black void.

## Phase 3: Post-Processing (10 min)

### Task 3.1: Install @react-three/postprocessing
- `cd frontend && npm install @react-three/postprocessing`
- Verify build still passes

### Task 3.2: Add EffectComposer to TaskAtmosphere
- Extend config with `postprocessing` { bloom?, vignette?, noise? }
- Render `<EffectComposer>` with configured effects
- Default: Bloom(threshold=0.9, intensity=0.6) + Vignette(darkness=0.4)
- Dungeon concert: strong bloom (1.2), strong vignette (0.7)
- Outdoor: subtle bloom (0.2), minimal vignette (0.15)

**Verify:** Torch glows bloom, screen edges darken slightly. No performance issues.

## Phase 4: Atmospheric Details (15 min)

### Task 4.1: Add Stars for night/indoor scenes
- Extend config with `stars` { count, radius, factor, speed }
- Render `<Stars>` when configured
- Dense for space (5000), sparse for dungeon (200-300)

### Task 4.2: Add point lights for torches
- Extend config with `pointLights` array of { color, intensity, distance, position }
- Dungeon tasks: warm orange at torch positions
- Concert: colored stage lights (red, blue, magenta)

### Task 4.3: Add Cloud wisps for dungeon/outdoor
- Extend config with `clouds` array of { bounds, color, opacity, speed, position }
- Dungeon concert: purple fog near ground
- Outdoor tasks: white fluffy clouds at y=10-14

### Task 4.4: Add SoftShadows
- Add `<SoftShadows size={25} samples={10} focus={0} />` in R3FGame.tsx
- One-line upgrade, improves all shadow edges

### Task 4.5: Enable castShadow on characters
- Add `castShadow` to the `<primitive>` in Character3D.tsx (traverse mesh children)
- Add `castShadow` to the `<primitive>` in Prop3D.tsx
- This makes ContactShadows and directional shadows actually work

**Verify:** Full atmosphere for all 7 tasks. Stars in dungeons, clouds outdoors, torch glow in dark scenes.

## Phase 5: Polish & Tuning (10 min)

### Task 5.1: Visual QA per task
- Navigate to each of 7 tasks
- Screenshot and compare
- Adjust fog distances, sparkle counts, light intensities as needed

### Task 5.2: Performance check
- Verify 60fps on dev machine
- Check draw calls via browser dev tools (target <100)
- Reduce ContactShadows resolution or Stars count if needed

### Task 5.3: Update demo cache
- If any task environments changed, re-test demo script prompts
- Verify all cache entries still produce good scenes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `game/TaskAtmosphere.tsx` | CREATE | Per-task atmosphere component |
| `game/R3FGame.tsx` | MODIFY | Remove old lighting/ground, add TaskAtmosphere |
| `game/Character3D.tsx` | MODIFY | Enable castShadow on meshes |
| `game/Prop3D.tsx` | MODIFY | Enable castShadow on meshes |
| `package.json` | MODIFY | Add @react-three/postprocessing |

## Config Structure (TypeScript)

```typescript
interface TaskAtmosphereConfig {
  background: string
  fog: { color: string; near: number; far: number }
  hemisphere: { sky: string; ground: string; intensity: number }
  directionalLight: { color: string; intensity: number; position: [number, number, number] }
  sparkles: { count: number; color: string; size: number; speed: number; scale: number | [number, number, number] }
  contactShadows: { opacity: number; blur: number; far: number }
  environment?: { preset: string; background?: boolean; backgroundBlurriness?: number }
  sky?: { sunPosition: [number, number, number]; turbidity: number; rayleigh: number }
  stars?: { count: number; radius: number; factor: number; speed: number }
  pointLights?: Array<{ color: string; intensity: number; distance: number; position: [number, number, number] }>
  clouds?: Array<{ bounds: [number, number, number]; color: string; opacity: number; speed: number; position: [number, number, number] }>
  bloom?: { luminanceThreshold: number; intensity: number }
  vignette?: { offset: number; darkness: number }
}
```

## Success Criteria

- [ ] No task renders in a black/dark void
- [ ] Each task has a unique atmospheric mood
- [ ] Characters and props have visible shadows
- [ ] At least 2 tasks have sky/clouds (outdoor)
- [ ] At least 2 tasks have stars (dungeon/space)
- [ ] Sparkles visible in every task
- [ ] Bloom makes torch/magic effects glow
- [ ] 60fps maintained on dev machine
- [ ] Build passes with 0 TS errors
