# SceneMeasurer API Reference

## Setup
The `SceneMeasurer` component is mounted inside `R3FGame.tsx` and exposes measurement functions on `window`.

## API

### `window.__measureScene()`
Returns all named objects in the scene with their bounding box dimensions.

```javascript
const measurements = window.__measureScene();
// Returns: { "building_townhall_blue": { height: 2.7, width: 2.24, depth: 2.05, worldY: 0 }, ... }
```

### `window.__measureByPattern(pattern)`
Searches all groups for names matching a pattern (case-insensitive). Returns top 30 by height.

```javascript
const chars = window.__measureByPattern('skeleton');
// Returns: [{ name: "Rig_Medium", height: 2.61, width: 1.57, scale: [1,1,1] }, ...]
```

## Puppeteer Usage

```javascript
// Measure from puppeteer:
await page.evaluate(() => {
  return JSON.stringify(window.__measureScene());
});

// Click a zone marker:
await page.evaluate(() => {
  const buttons = document.querySelectorAll('button');
  for (const btn of buttons) {
    if (btn.textContent.includes('Dungeon')) { btn.click(); return 'ok'; }
  }
});

// Wait for transition, then measure characters:
// (characters only spawn when inside a zone)
```

## Key Files to Edit

| File | What to Change |
|------|---------------|
| `frontend/src/game/VillageWorld.tsx` | Building `scale` values in VillageCenter, DungeonZone, ParkZone |
| `frontend/src/game/Character3D.tsx` | Character base scale (if needed) |
| `frontend/src/game/ScenePlayer3D.tsx` | Spawned actor/prop scale (if needed) |

## Testing Loop

```
1. Navigate to http://localhost:5175/
2. Wait 6s for models to load
3. Call window.__measureScene() to get all sizes
4. Compare to scale-reference.md targets
5. Edit source files with new scale values
6. Wait 4s for hot reload
7. Navigate again (or use existing page)
8. Re-measure and compare
9. Take screenshot for visual verification
10. Repeat until all ratios are within target range
```
