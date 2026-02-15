---
paths:
  - "frontend/src/game/**"
---

# 3D Conventions

## Scale Reference
- Character (Rig_Medium): 2.61 units tall (THE reference unit)
- Hex buildings: 3.0x scale (strategy-game models are tiny natively)
- Dungeon props: barrels 0.4x, chests 0.35x, walls 1.0x
- Hex decorations: 3.0x (same as buildings)
- Tiny Treats park: 0.8-1.0x (already character-scale)
- Kenney packs: use KENNEY_PACK_SCALE lookup in ScenePlayer3D.tsx

## Camera
- FOV: 45 degrees
- Village overview: position [0, 18, 28]
- Zone view: position [0, 9, 14]
- Zone transitions: 2s ease-out cubic

## Canvas
- Size: 1024x576
- Background: sky-blue (#87CEEB)
- Fog: near=40, far=180 (village), tuned per-zone

## Zone Centers
- skeleton-birthday: [0, 0, -16]
- adventurers-picnic: [0, 0, 16]
- Village center: [0, 0, 0]

## Performance
- Shadow camera: +-50 units
- Use castShadow on characters and props
- Use receiveShadow on ground
- Clone GLTFs with SkeletonUtils for animated models
