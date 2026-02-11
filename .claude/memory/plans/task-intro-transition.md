# Task Intro Transition — Implementation Plan

**Goal:** When a user selects a task, play a seamless 3D "walk through fog" intro that reveals the scene.
**Research:** Agent findings on fog animation, camera dolly, text effects, silhouettes.

## Architecture

Create `TaskIntro.tsx` — a component rendered inside the R3F Canvas that manages the intro animation lifecycle. It sits alongside `TaskAtmosphere` and `ScenePlayer3D`.

```
R3FGame.tsx
  └── <Canvas>
        ├── <TaskAtmosphere taskId={taskId} />
        ├── <TaskIntro taskId={taskId} onComplete={onIntroComplete} />  ← NEW
        ├── <ScenePlayer3D ... />
        └── <OrbitControls />
```

### Intro Animation Sequence (5 seconds total)

| Time | Phase | What Happens |
|------|-------|-------------|
| 0-0.5s | **Fog wall** | Scene starts with extremely dense fog (near=0, far=3). Background color matches fog. Nothing visible. |
| 0.5-2s | **Title** | "Prompt Quest" text fades in at center, semi-transparent white, floating in fog. Sparkles swirl around it. |
| 2-3s | **Dissolve** | Text scales up 1.5x while opacity drops to 0 (disperses into fog). Camera begins pushing forward. |
| 3-4.5s | **Reveal** | Fog clears (near→task_near, far→task_far). Camera moves from z=20 to z=8. Silhouette characters and env props become visible through thinning fog. |
| 4.5-5s | **Settle** | Camera reaches final position. Fog at task-configured values. Characters visible in idle animation. Intro component unmounts. |

### Default Characters (Visible Before Prompt)

Each task has 1-2 "hero" characters that spawn in idle animation when the task loads, even before the user types anything. This gives the scene life immediately.

```typescript
const TASK_HERO_CHARACTERS: Record<string, Array<{ id: string; characterId: CharacterKey; position: Position }>> = {
  'skeleton-birthday': [{ id: 'hero-skeleton', characterId: 'skeleton', position: 'center' }],
  'knight-space':      [{ id: 'hero-knight', characterId: 'knight', position: 'center' }],
  'mage-kitchen':      [{ id: 'hero-mage', characterId: 'mage', position: 'center' }],
  'barbarian-school':  [{ id: 'hero-barbarian', characterId: 'barbarian', position: 'center' }],
  'dungeon-concert':   [{ id: 'hero-skeleton', characterId: 'skeleton', position: 'left' }, { id: 'hero-knight', characterId: 'knight', position: 'right' }],
  'skeleton-pizza':    [{ id: 'hero-skeleton', characterId: 'skeleton', position: 'center' }],
  'adventurers-picnic':[{ id: 'hero-knight', characterId: 'knight', position: 'left' }, { id: 'hero-ranger', characterId: 'ranger', position: 'right' }],
}
```

## Phase 1: TaskIntro Component (Core Animation) — 20 min

**File: `frontend/src/game/TaskIntro.tsx` (NEW)**

### Task 1.1: Create TaskIntro component shell
- Accept props: `taskId: string`, `onComplete: () => void`
- Internal state: `phase: 'fog' | 'title' | 'dissolve' | 'reveal' | 'done'`
- `progressRef` (0 to 1) animated in `useFrame`
- When progress reaches 1.0, call `onComplete()` and render null

### Task 1.2: Fog animation
- Access `scene.fog` via `useThree()` or `useFrame(({scene}) => ...)`
- Override fog near/far at start: near=0, far=3 (extremely dense)
- Animate toward task-configured values from TaskAtmosphere config
- Import `getConfig` from TaskAtmosphere to know target fog values

### Task 1.3: Camera dolly
- Access `camera` via `useFrame(({camera}) => ...)`
- Start position: [0, 4, 20] (far back)
- End position: [0, 4, 8] (normal game position)
- Ease-out cubic: `1 - Math.pow(1 - t, 3)`
- Only animate during 'reveal' phase (t = 0.4 to 1.0)

### Task 1.4: Title text
- Use drei `<Text>` with Nunito Bold font
- Position: [0, 3, 5] (in front of camera start, visible through light fog)
- White color, semi-transparent
- Animate: fade in (t=0.1-0.3), hold (t=0.3-0.4), scale up 1.5x + fade out (t=0.4-0.6)
- After fade: remove from render

### Task 1.5: Fog sparkles during intro
- Extra `<Sparkles>` with high count (200) and fast speed during intro
- Fade sparkle opacity as fog clears
- Use task-specific sparkle color

**Verify:** Task intro plays fog → title → dissolve → reveal sequence on task selection.

## Phase 2: Wire Into App Flow — 10 min

### Task 2.1: Add intro state to R3FGame
- Add `introPlaying: boolean` state
- Set to `true` when `taskId` changes
- Set to `false` when `TaskIntro.onComplete()` fires
- Pass `introPlaying` to TaskIntro

### Task 2.2: Disable OrbitControls during intro
- When `introPlaying === true`, don't render OrbitControls
- Prevents user from rotating camera during the animation

### Task 2.3: Disable prompt input during intro
- Pass `introPlaying` state up to App.tsx (or via Zustand)
- PromptInput disabled while intro plays

**Verify:** Full flow: click task → intro plays → intro completes → scene ready for input.

## Phase 3: Default Hero Characters — 10 min

### Task 3.1: Add TASK_HERO_CHARACTERS config to ScenePlayer3D
- Define hero characters per task (see Architecture section above)
- Spawn hero characters when task loads (in the env setup useEffect)
- Use `Idle_A` animation as default
- Hero characters should be cleared when a script plays (new actors replace them)

### Task 3.2: Silhouette characters during intro
- During intro, hero characters are already spawned but hidden by fog
- As fog clears, they emerge naturally (Three.js fog handles this automatically)
- No extra code needed — just ensure heroes spawn before fog clears

**Verify:** Characters visible in idle after intro, replaced by script actors on prompt submit.

## Phase 4: Polish — 10 min

### Task 4.1: Sound during intro
- Play a soft "whoosh" or "magical reveal" sound using SoundManager3D
- Use existing Web Audio API synth (no audio files needed)

### Task 4.2: Skip intro on repeat
- If user clicks "All Tasks" and returns to the same task, play a shortened intro (2s)
- Or allow clicking/tapping to skip the intro

### Task 4.3: Transition from task grid
- Add fade-out on the task grid when a task is selected
- CSS transition: opacity 0 over 0.3s, then switch to game view

**Verify:** Smooth end-to-end experience from grid → intro → scene.

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `game/TaskIntro.tsx` | CREATE | Fog walk-through intro animation |
| `game/R3FGame.tsx` | MODIFY | Add TaskIntro, intro state management |
| `game/ScenePlayer3D.tsx` | MODIFY | Add TASK_HERO_CHARACTERS default spawn |
| `App.tsx` | MODIFY | Fade-out on task grid, intro state |

## Success Criteria

- [x] Clicking a task card triggers fog intro animation (not instant switch)
- [x] "Prompt Quest" text appears in fog, then disperses
- [x] Camera pushes forward through thinning fog
- [x] Characters emerge as silhouettes from the fog
- [x] After intro, hero characters visible in idle animation (before prompt)
- [x] Submitting a prompt clears hero characters and plays script
- [x] Build passes with 0 TS errors
- [x] 60fps maintained during intro animation
- [x] Intro can be skipped by clicking

## COMPLETED — 2026-02-10
