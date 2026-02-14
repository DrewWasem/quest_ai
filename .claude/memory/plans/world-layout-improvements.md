# World Layout Improvements — Implementation Plan

**Source**: docs/world-layout-sme-analysis.md (Section 5: Recommendations)
**Target file**: frontend/src/game/VillageWorld.tsx
**Status**: COMPLETE

## Phase 1: Widen Spoke Roads (2A) ✓
- [x] halfWidth changed to 3.5 in HexTerrain call

## Phase 2: Thicken Zone Approach Corridors (1B) ✓
- [x] ZoneApproachDecor expanded to 4+ themed props per zone

## Phase 3: Add Road-Edge Decoration (2B) ✓
- [x] Procedural road-edge props (rocks, flowers, hills) every 8u along spokes + boulevard
- [x] Seeded random for consistent placement, kitchen zone + building exclusion

## Phase 4: Add Signpost Clusters at Road Junctions (3C) ✓
- [x] JunctionPlazas component with lanterns + barrel at each spoke-ring intersection

## Phase 5: Zone-Specific Ground Material (1C) ✓
- [x] HexTerrain uses TILES.transition within 10u of zone centers instead of TILES.grass

## Phase 6: Differentiate Pizza/Kitchen Zones ✓
- [x] PizzaZone: tent landmark + warm orange pointLight
- [x] KitchenZone: Tower_B_green + purple/magic pointLight accent
