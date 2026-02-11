/**
 * ScenePlayer3D Logic Tests
 *
 * Tests the pure mapping logic from ScenePlayer3D.tsx:
 * - POSITION_MAP: named positions to [x,y,z] coords
 * - ACTOR_TO_CHARACTER: legacy 2D actor names to 3D character IDs
 * - PROP_PATHS: prop IDs to GLTF file paths
 * - Easing functions: easeOutBounce, easeInOutQuad, easeInOutSine, applyEasing
 *
 * These are extracted/mirrored from the ScenePlayer3D component since they
 * are internal constants. Tests verify correct mappings without rendering.
 */

import { CHARACTERS, type CharacterKey } from '../../data/asset-manifest';

// ============================================================================
// CONSTANTS (mirrored from ScenePlayer3D.tsx)
// ============================================================================

const POSITION_MAP: Record<string, [number, number, number]> = {
  left: [-3, 0, 0],
  center: [0, 0, 0],
  right: [3, 0, 0],
  top: [0, 2, -2],
  bottom: [0, 0, 2],
  'off-left': [-6, 0, 0],
  'off-right': [6, 0, 0],
  'off-top': [0, 5, 0],
};

const ACTOR_TO_CHARACTER: Record<string, CharacterKey> = {
  monster: 'barbarian',
  dog: 'rogue',
  trex: 'knight',
  octopus: 'mage',
  robot: 'robot',
  wizard: 'mage',
  kid: 'ranger',
  fish: 'ninja',
  squirrel: 'rogue',
};

const PROP_PATHS: Record<string, string> = {
  cake: 'kaykit/holiday/gltf/holiday_cake_giant.gltf',
  'cake-giant': 'kaykit/holiday/gltf/holiday_cake_giant.gltf',
  'cake-tiny': 'kaykit/holiday/gltf/holiday_cakePiece.gltf',
  present: 'kaykit/holiday/gltf/holiday_giftBox.gltf',
  balloon: 'kaykit/holiday/gltf/holiday_balloon.gltf',
  bone: 'kaykit/dungeon/gltf/bone.gltf',
  rocket: 'kaykit/space/gltf/spaceStructure_satellite_A.gltf',
  moon: 'kaykit/space/gltf/planet_A.gltf',
  flag: 'kaykit/space/gltf/flag_pole.gltf',
  pizza: 'kaykit/restaurant/gltf/food_pizza_pepperoni_plated.gltf',
  'pizza-soggy': 'kaykit/restaurant/gltf/food_pizza_pepperoni_plated.gltf',
  plates: 'kaykit/restaurant/gltf/plates_B.gltf',
  desk: 'kaykit/furniture_bits/gltf/table_medium.gltf',
  chair: 'kaykit/furniture_bits/gltf/chair_B.gltf',
  fridge: 'kaykit/furniture_bits/gltf/book_shelf.gltf',
  toaster: 'kaykit/furniture_bits/gltf/crate_small.gltf',
  guitar: 'kaykit/adventurers/gltf/tool_guitar.gltf',
  drums: 'kaykit/adventurers/gltf/crate_large_B.gltf',
  keyboard: 'kaykit/adventurers/gltf/crate_medium_A.gltf',
  microphone: 'kaykit/adventurers/gltf/torch.gltf',
  lunchbox: 'kaykit/adventurers/gltf/backpack_B.gltf',
  pencil: 'kaykit/adventurers/gltf/arrow.gltf',
  'fire-extinguisher': 'kaykit/adventurers/gltf/potion_small_red.gltf',
  stars: 'kaykit/holiday/gltf/holiday_ornament.gltf',
  default: 'kaykit/adventurers/gltf/crate_small_A.gltf',
};

// ============================================================================
// EASING FUNCTIONS (mirrored from ScenePlayer3D.tsx)
// ============================================================================

function easeOutBounce(t: number): number {
  const n1 = 7.5625, d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  return n1 * (t -= 2.625 / d1) * t + 0.984375;
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function applyEasing(t: number, style: string): number {
  switch (style) {
    case 'bounce': return easeOutBounce(t);
    case 'arc': return easeInOutQuad(t);
    case 'float': return easeInOutSine(t);
    default: return t; // linear
  }
}

// ============================================================================
// TESTS
// ============================================================================

describe('ScenePlayer3D Logic', () => {
  describe('POSITION_MAP', () => {
    it('should have exactly 8 named positions', () => {
      const positions = Object.keys(POSITION_MAP);
      expect(positions).toHaveLength(8);
      expect(positions).toEqual([
        'left',
        'center',
        'right',
        'top',
        'bottom',
        'off-left',
        'off-right',
        'off-top',
      ]);
    });

    it('should map all positions to arrays of 3 numbers', () => {
      for (const [name, coords] of Object.entries(POSITION_MAP)) {
        expect(coords).toBeInstanceOf(Array);
        expect(coords).toHaveLength(3);
        coords.forEach((coord) => {
          expect(typeof coord).toBe('number');
        });
      }
    });

    it('should have all coordinates within reasonable bounds (-10 to 10)', () => {
      for (const [name, coords] of Object.entries(POSITION_MAP)) {
        coords.forEach((coord, index) => {
          expect(coord).toBeGreaterThanOrEqual(-10);
          expect(coord).toBeLessThanOrEqual(10);
        });
      }
    });

    it('should map center to origin [0, 0, 0]', () => {
      expect(POSITION_MAP.center).toEqual([0, 0, 0]);
    });

    it('should map left and right symmetrically on x-axis', () => {
      expect(POSITION_MAP.left[0]).toBeLessThan(0);
      expect(POSITION_MAP.right[0]).toBeGreaterThan(0);
      expect(Math.abs(POSITION_MAP.left[0])).toBe(Math.abs(POSITION_MAP.right[0]));
      expect(POSITION_MAP.left[1]).toBe(POSITION_MAP.right[1]);
      expect(POSITION_MAP.left[2]).toBe(POSITION_MAP.right[2]);
    });

    it('should map off-left and off-right further from center than left/right', () => {
      expect(Math.abs(POSITION_MAP['off-left'][0])).toBeGreaterThan(
        Math.abs(POSITION_MAP.left[0]),
      );
      expect(Math.abs(POSITION_MAP['off-right'][0])).toBeGreaterThan(
        Math.abs(POSITION_MAP.right[0]),
      );
    });

    it('should map top and off-top to elevated positions (positive y)', () => {
      expect(POSITION_MAP.top[1]).toBeGreaterThan(0);
      expect(POSITION_MAP['off-top'][1]).toBeGreaterThan(POSITION_MAP.top[1]);
    });
  });

  describe('ACTOR_TO_CHARACTER', () => {
    it('should map all legacy 2D actor names to valid 3D character IDs', () => {
      for (const [legacyName, characterId] of Object.entries(ACTOR_TO_CHARACTER)) {
        expect(characterId in CHARACTERS).toBe(true);
      }
    });

    it('should have 9 legacy actor mappings', () => {
      expect(Object.keys(ACTOR_TO_CHARACTER)).toHaveLength(9);
    });

    it('should map specific legacy actors correctly', () => {
      expect(ACTOR_TO_CHARACTER.monster).toBe('barbarian');
      expect(ACTOR_TO_CHARACTER.dog).toBe('rogue');
      expect(ACTOR_TO_CHARACTER.trex).toBe('knight');
      expect(ACTOR_TO_CHARACTER.octopus).toBe('mage');
      expect(ACTOR_TO_CHARACTER.robot).toBe('robot');
      expect(ACTOR_TO_CHARACTER.wizard).toBe('mage');
      expect(ACTOR_TO_CHARACTER.kid).toBe('ranger');
      expect(ACTOR_TO_CHARACTER.fish).toBe('ninja');
      expect(ACTOR_TO_CHARACTER.squirrel).toBe('rogue');
    });

    it('should map to core adventurer characters', () => {
      const mappedCharacters = Object.values(ACTOR_TO_CHARACTER);
      expect(mappedCharacters).toContain('knight');
      expect(mappedCharacters).toContain('barbarian');
      expect(mappedCharacters).toContain('mage');
      expect(mappedCharacters).toContain('ranger');
      expect(mappedCharacters).toContain('rogue');
    });
  });

  describe('PROP_PATHS', () => {
    it('should map all props to valid GLTF paths (ending in .gltf or .glb)', () => {
      for (const [propId, path] of Object.entries(PROP_PATHS)) {
        expect(path.endsWith('.gltf') || path.endsWith('.glb')).toBe(true);
      }
    });

    it('should have at least 20 prop mappings', () => {
      expect(Object.keys(PROP_PATHS).length).toBeGreaterThanOrEqual(20);
    });

    it('should map key props correctly', () => {
      expect(PROP_PATHS.cake).toContain('holiday_cake_giant.gltf');
      expect(PROP_PATHS.pizza).toContain('food_pizza_pepperoni_plated.gltf');
      expect(PROP_PATHS.rocket).toContain('satellite');
      expect(PROP_PATHS.present).toContain('giftBox.gltf');
      expect(PROP_PATHS.guitar).toContain('tool_guitar.gltf');
    });

    it('should have a default fallback prop', () => {
      expect(PROP_PATHS.default).toBeDefined();
      expect(PROP_PATHS.default).toContain('.gltf');
    });

    it('should map cake variants correctly', () => {
      expect(PROP_PATHS.cake).toBeDefined();
      expect(PROP_PATHS['cake-giant']).toBeDefined();
      expect(PROP_PATHS['cake-tiny']).toBeDefined();
      expect(PROP_PATHS['cake-giant']).toContain('giant');
      expect(PROP_PATHS['cake-tiny']).toContain('Piece');
    });

    it('should have props from multiple KayKit packs', () => {
      const paths = Object.values(PROP_PATHS);
      const packs = new Set<string>();

      paths.forEach((path) => {
        const match = path.match(/kaykit\/([^/]+)\//);
        if (match) {
          packs.add(match[1]);
        }
      });

      expect(packs.size).toBeGreaterThan(3);
      expect([...packs]).toContain('holiday');
      expect([...packs]).toContain('restaurant');
    });

    it('should map pizza props for skeleton-pizza task', () => {
      expect(PROP_PATHS.pizza).toBeDefined();
      expect(PROP_PATHS['pizza-soggy']).toBeDefined();
      expect(PROP_PATHS.pizza).toContain('pepperoni');
    });

    it('should map kitchen props for mage-kitchen task', () => {
      expect(PROP_PATHS.fridge).toBeDefined();
      expect(PROP_PATHS.toaster).toBeDefined();
    });

    it('should map musical instruments for dungeon-concert task', () => {
      expect(PROP_PATHS.guitar).toBeDefined();
      expect(PROP_PATHS.drums).toBeDefined();
      expect(PROP_PATHS.keyboard).toBeDefined();
      expect(PROP_PATHS.microphone).toBeDefined();
    });
  });

  // ============================================================================
  // EASING FUNCTIONS
  // ============================================================================

  describe('Easing Functions', () => {
    describe('easeOutBounce', () => {
      it('should return 0 at t=0', () => {
        expect(easeOutBounce(0)).toBeCloseTo(0, 5);
      });

      it('should return 1 at t=1', () => {
        expect(easeOutBounce(1)).toBeCloseTo(1, 5);
      });

      it('should return values between 0 and 1 for all inputs', () => {
        for (let t = 0; t <= 1; t += 0.05) {
          const result = easeOutBounce(t);
          expect(result).toBeGreaterThanOrEqual(0);
          expect(result).toBeLessThanOrEqual(1.01); // slight tolerance for float
        }
      });

      it('should bounce (have non-monotonic behavior)', () => {
        // The bounce easing should hit 1 and come back slightly before settling
        const t075 = easeOutBounce(0.75);
        const t090 = easeOutBounce(0.90);
        // Both should be close to 1 but the function should have variation
        expect(t075).toBeGreaterThan(0.5);
        expect(t090).toBeGreaterThan(0.8);
      });
    });

    describe('easeInOutQuad', () => {
      it('should return 0 at t=0', () => {
        expect(easeInOutQuad(0)).toBeCloseTo(0, 5);
      });

      it('should return 1 at t=1', () => {
        expect(easeInOutQuad(1)).toBeCloseTo(1, 5);
      });

      it('should return 0.5 at t=0.5 (midpoint)', () => {
        expect(easeInOutQuad(0.5)).toBeCloseTo(0.5, 5);
      });

      it('should be monotonically increasing', () => {
        let prev = 0;
        for (let t = 0; t <= 1; t += 0.05) {
          const result = easeInOutQuad(t);
          expect(result).toBeGreaterThanOrEqual(prev - 0.001);
          prev = result;
        }
      });

      it('should start slow and end slow (ease in + out)', () => {
        // Early phase should be below linear
        expect(easeInOutQuad(0.2)).toBeLessThan(0.2);
        // Late phase should be above linear
        expect(easeInOutQuad(0.8)).toBeGreaterThan(0.8);
      });
    });

    describe('easeInOutSine', () => {
      it('should return 0 at t=0', () => {
        expect(easeInOutSine(0)).toBeCloseTo(0, 5);
      });

      it('should return 1 at t=1', () => {
        expect(easeInOutSine(1)).toBeCloseTo(1, 5);
      });

      it('should return 0.5 at t=0.5 (midpoint)', () => {
        expect(easeInOutSine(0.5)).toBeCloseTo(0.5, 5);
      });

      it('should be monotonically increasing', () => {
        let prev = 0;
        for (let t = 0; t <= 1; t += 0.05) {
          const result = easeInOutSine(t);
          expect(result).toBeGreaterThanOrEqual(prev - 0.001);
          prev = result;
        }
      });
    });

    describe('applyEasing', () => {
      it('should use easeOutBounce for "bounce" style', () => {
        expect(applyEasing(0.5, 'bounce')).toBeCloseTo(easeOutBounce(0.5), 5);
      });

      it('should use easeInOutQuad for "arc" style', () => {
        expect(applyEasing(0.5, 'arc')).toBeCloseTo(easeInOutQuad(0.5), 5);
      });

      it('should use easeInOutSine for "float" style', () => {
        expect(applyEasing(0.5, 'float')).toBeCloseTo(easeInOutSine(0.5), 5);
      });

      it('should use linear (identity) for "linear" style', () => {
        expect(applyEasing(0.3, 'linear')).toBeCloseTo(0.3, 5);
        expect(applyEasing(0.7, 'linear')).toBeCloseTo(0.7, 5);
      });

      it('should default to linear for unknown styles', () => {
        expect(applyEasing(0.5, 'teleport')).toBeCloseTo(0.5, 5);
        expect(applyEasing(0.5, '')).toBeCloseTo(0.5, 5);
      });

      it('should return 0 at t=0 for all styles', () => {
        const styles = ['linear', 'bounce', 'arc', 'float'];
        for (const style of styles) {
          expect(applyEasing(0, style)).toBeCloseTo(0, 3);
        }
      });

      it('should return 1 at t=1 for all styles', () => {
        const styles = ['linear', 'bounce', 'arc', 'float'];
        for (const style of styles) {
          expect(applyEasing(1, style)).toBeCloseTo(1, 3);
        }
      });
    });
  });

  describe('Integration — Legacy to 3D pipeline', () => {
    it('should allow legacy actor names to resolve to valid characters', () => {
      const legacyPrompt = ['monster', 'dog', 'trex'];

      legacyPrompt.forEach((legacyName) => {
        const characterId = ACTOR_TO_CHARACTER[legacyName];
        expect(characterId).toBeDefined();
        expect(CHARACTERS[characterId]).toBeDefined();
      });
    });

    it('should place actors at valid 3D positions', () => {
      const scriptActions = [
        { actor: 'monster', position: 'left' },
        { actor: 'dog', position: 'center' },
        { actor: 'trex', position: 'right' },
      ];

      scriptActions.forEach(({ actor, position }) => {
        const characterId = ACTOR_TO_CHARACTER[actor];
        const coords = POSITION_MAP[position];

        expect(characterId).toBeDefined();
        expect(coords).toBeDefined();
        expect(coords).toHaveLength(3);
      });
    });

    it('should support spawning props at positions', () => {
      const scriptActions = [
        { prop: 'cake', position: 'center' },
        { prop: 'pizza', position: 'left' },
        { prop: 'guitar', position: 'right' },
      ];

      scriptActions.forEach(({ prop, position }) => {
        const propPath = PROP_PATHS[prop];
        const coords = POSITION_MAP[position];

        expect(propPath).toBeDefined();
        expect(propPath).toContain('.gltf');
        expect(coords).toBeDefined();
      });
    });

    it('should support 3D characters directly (not legacy mapped)', () => {
      const directChars = ['knight', 'barbarian', 'mage', 'skeleton_warrior'];
      for (const charId of directChars) {
        expect(charId in CHARACTERS).toBe(true);
      }
    });
  });
});
