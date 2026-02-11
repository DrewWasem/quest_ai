/**
 * Asset Manifest Tests
 *
 * Tests the 3D asset registry in data/asset-manifest.ts:
 * - CHARACTERS: characterId → GLB path
 * - ANIMATION_PACKS: packId → GLB path
 * - ANIMATION_CLIPS: clipName → packId
 * - TASK_ASSETS: taskId → { characters, animationPacks, props, description }
 * - ASSET_BASE: base path for all assets
 *
 * Validates the vocabulary contract and ensures all 7 new tasks are covered.
 */

import {
  CHARACTERS,
  ANIMATION_PACKS,
  ANIMATION_CLIPS,
  TASK_ASSETS,
  ASSET_BASE,
  type CharacterKey,
  type AnimationPackKey,
  type AnimationClipName,
  resolveAssetPath,
} from '../asset-manifest';

describe('Asset Manifest', () => {
  // ═══════════════════════════════════════════════════════════════════════════
  // CHARACTERS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('CHARACTERS', () => {
    it('should map all character IDs to GLB paths', () => {
      for (const [characterId, path] of Object.entries(CHARACTERS)) {
        expect(path).toBeDefined();
        expect(path.endsWith('.glb')).toBe(true);
      }
    });

    it('should have at least 20 characters', () => {
      expect(Object.keys(CHARACTERS).length).toBeGreaterThanOrEqual(20);
    });

    it('should include core adventurer characters', () => {
      const requiredCharacters: CharacterKey[] = [
        'knight',
        'barbarian',
        'mage',
        'ranger',
        'rogue',
      ];

      requiredCharacters.forEach((charId) => {
        expect(CHARACTERS[charId]).toBeDefined();
        expect(CHARACTERS[charId]).toContain('.glb');
      });
    });

    it('should include skeleton characters for skeleton tasks', () => {
      expect(CHARACTERS.skeleton_warrior).toBeDefined();
      expect(CHARACTERS.skeleton_mage).toBeDefined();
      expect(CHARACTERS.skeleton_rogue).toBeDefined();
      expect(CHARACTERS.skeleton_minion).toBeDefined();
    });

    it('should include bonus characters for new tasks', () => {
      expect(CHARACTERS.space_ranger).toBeDefined();
      expect(CHARACTERS.ninja).toBeDefined();
      expect(CHARACTERS.clown).toBeDefined();
      expect(CHARACTERS.robot).toBeDefined();
      expect(CHARACTERS.witch).toBeDefined();
    });

    it('should have all paths under kaykit/characters/', () => {
      for (const path of Object.values(CHARACTERS)) {
        expect(path).toMatch(/^kaykit\/characters\//);
      }
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // ANIMATION PACKS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('ANIMATION_PACKS', () => {
    it('should map all animation pack IDs to GLB paths', () => {
      for (const [packId, path] of Object.entries(ANIMATION_PACKS)) {
        expect(path).toBeDefined();
        expect(path.endsWith('.glb')).toBe(true);
      }
    });

    it('should have exactly 8 animation packs', () => {
      expect(Object.keys(ANIMATION_PACKS)).toHaveLength(8);
    });

    it('should include all expected animation packs', () => {
      const expectedPacks: AnimationPackKey[] = [
        'general',
        'movement_basic',
        'movement_advanced',
        'combat_melee',
        'combat_ranged',
        'simulation',
        'special',
        'tools',
      ];

      expectedPacks.forEach((packId) => {
        expect(ANIMATION_PACKS[packId]).toBeDefined();
      });
    });

    it('should have all paths under kaykit/animations/', () => {
      for (const path of Object.values(ANIMATION_PACKS)) {
        expect(path).toMatch(/^kaykit\/animations\//);
      }
    });

    it('should use Rig_Medium naming convention', () => {
      for (const path of Object.values(ANIMATION_PACKS)) {
        expect(path).toContain('Rig_Medium');
      }
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // ANIMATION CLIPS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('ANIMATION_CLIPS', () => {
    it('should map all animation clip names to valid pack keys', () => {
      for (const [clipName, packId] of Object.entries(ANIMATION_CLIPS)) {
        expect(packId in ANIMATION_PACKS).toBe(true);
      }
    });

    it('should have at least 100 animation clips', () => {
      expect(Object.keys(ANIMATION_CLIPS).length).toBeGreaterThanOrEqual(100);
    });

    it('should include essential idle animations', () => {
      expect(ANIMATION_CLIPS.Idle_A).toBe('general');
      expect(ANIMATION_CLIPS.Idle_B).toBe('general');
      expect(ANIMATION_CLIPS.Skeletons_Idle).toBe('special');
    });

    it('should include walking and running animations', () => {
      expect(ANIMATION_CLIPS.Walking_A).toBe('movement_basic');
      expect(ANIMATION_CLIPS.Running_A).toBe('movement_basic');
    });

    it('should include combat animations', () => {
      expect(ANIMATION_CLIPS.Melee_1H_Attack_Chop).toBe('combat_melee');
      expect(ANIMATION_CLIPS.Ranged_Magic_Shoot).toBe('combat_ranged');
    });

    it('should include simulation animations for comedy scenes', () => {
      expect(ANIMATION_CLIPS.Cheering).toBe('simulation');
      expect(ANIMATION_CLIPS.Sit_Chair_Down).toBe('simulation');
      expect(ANIMATION_CLIPS.Waving).toBe('simulation');
    });

    it('should include skeleton-specific animations', () => {
      expect(ANIMATION_CLIPS.Skeletons_Awaken_Floor).toBe('special');
      expect(ANIMATION_CLIPS.Skeletons_Taunt).toBe('special');
      expect(ANIMATION_CLIPS.Skeletons_Walking).toBe('special');
    });

    it('should include tool animations for tasks', () => {
      expect(ANIMATION_CLIPS.Chop).toBe('tools');
      expect(ANIMATION_CLIPS.Hammer).toBe('tools');
      expect(ANIMATION_CLIPS.Fishing_Cast).toBe('tools');
    });

    it('should have no duplicate clip names', () => {
      const clipNames = Object.keys(ANIMATION_CLIPS);
      const uniqueNames = new Set(clipNames);
      expect(clipNames.length).toBe(uniqueNames.size);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TASK_ASSETS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('TASK_ASSETS', () => {
    it('should have all 7 new tasks', () => {
      const expectedTasks = [
        'adventurers-picnic',
        'skeleton-birthday',
        'knight-space',
        'mage-kitchen',
        'barbarian-school',
        'dungeon-concert',
        'skeleton-pizza',
      ];

      expectedTasks.forEach((taskId) => {
        expect(TASK_ASSETS[taskId]).toBeDefined();
      });

      expect(Object.keys(TASK_ASSETS).length).toBe(7);
    });

    it('should have all tasks with at least 1 character', () => {
      for (const [taskId, assets] of Object.entries(TASK_ASSETS)) {
        expect(assets.characters.length).toBeGreaterThanOrEqual(1);
      }
    });

    it('should have all tasks with at least 1 animation pack', () => {
      for (const [taskId, assets] of Object.entries(TASK_ASSETS)) {
        expect(assets.animationPacks.length).toBeGreaterThanOrEqual(1);
      }
    });

    it('should have all tasks with valid character IDs', () => {
      for (const [taskId, assets] of Object.entries(TASK_ASSETS)) {
        assets.characters.forEach((charId) => {
          expect(charId in CHARACTERS).toBe(true);
        });
      }
    });

    it('should have all tasks with valid animation pack IDs', () => {
      for (const [taskId, assets] of Object.entries(TASK_ASSETS)) {
        assets.animationPacks.forEach((packId) => {
          expect(packId in ANIMATION_PACKS).toBe(true);
        });
      }
    });

    it('should have all tasks with props array', () => {
      for (const [taskId, assets] of Object.entries(TASK_ASSETS)) {
        expect(Array.isArray(assets.props)).toBe(true);
      }
    });

    it('should have all props with key and path', () => {
      for (const [taskId, assets] of Object.entries(TASK_ASSETS)) {
        assets.props.forEach((prop) => {
          expect(prop.key).toBeDefined();
          expect(typeof prop.key).toBe('string');
          expect(prop.path).toBeDefined();
          expect(typeof prop.path).toBe('string');
          expect(prop.path.endsWith('.gltf') || prop.path.endsWith('.glb')).toBe(true);
        });
      }
    });

    it('should have all tasks with description', () => {
      for (const [taskId, assets] of Object.entries(TASK_ASSETS)) {
        expect(assets.description).toBeDefined();
        expect(typeof assets.description).toBe('string');
        expect(assets.description.length).toBeGreaterThan(0);
      }
    });

    it('should include skeleton_warrior in skeleton-birthday task', () => {
      const task = TASK_ASSETS['skeleton-birthday'];
      expect(task.characters).toContain('skeleton_warrior');
    });

    it('should include knight and space_ranger in knight-space task', () => {
      const task = TASK_ASSETS['knight-space'];
      expect(task.characters).toContain('knight');
      expect(task.characters).toContain('space_ranger');
    });

    it('should include mage and witch in mage-kitchen task', () => {
      const task = TASK_ASSETS['mage-kitchen'];
      expect(task.characters).toContain('mage');
      expect(task.characters).toContain('witch');
    });

    it('should include all 5 core adventurers in adventurers-picnic', () => {
      const task = TASK_ASSETS['adventurers-picnic'];
      expect(task.characters).toContain('knight');
      expect(task.characters).toContain('barbarian');
      expect(task.characters).toContain('mage');
      expect(task.characters).toContain('ranger');
      expect(task.characters).toContain('rogue');
    });

    it('should have pizza prop in skeleton-pizza task', () => {
      const task = TASK_ASSETS['skeleton-pizza'];
      const hasPizza = task.props.some((prop) => prop.key.includes('pizza'));
      expect(hasPizza).toBe(true);
    });

    it('should have general animation pack in all tasks', () => {
      for (const [taskId, assets] of Object.entries(TASK_ASSETS)) {
        expect(assets.animationPacks).toContain('general');
      }
    });

    it('should have special animation pack in skeleton tasks', () => {
      const skeletonTasks = ['skeleton-birthday', 'skeleton-pizza'];
      skeletonTasks.forEach((taskId) => {
        expect(TASK_ASSETS[taskId].animationPacks).toContain('special');
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // ASSET_BASE and resolveAssetPath
  // ═══════════════════════════════════════════════════════════════════════════

  describe('ASSET_BASE', () => {
    it('should be set to /assets/3d/', () => {
      expect(ASSET_BASE).toBe('/assets/3d/');
    });

    it('should end with a trailing slash', () => {
      expect(ASSET_BASE.endsWith('/')).toBe(true);
    });
  });

  describe('resolveAssetPath', () => {
    it('should prepend ASSET_BASE to manifest paths', () => {
      const manifestPath = 'kaykit/characters/Knight.glb';
      const resolved = resolveAssetPath(manifestPath);
      expect(resolved).toBe('/assets/3d/kaykit/characters/Knight.glb');
    });

    it('should resolve character paths correctly', () => {
      const knightPath = CHARACTERS.knight;
      const resolved = resolveAssetPath(knightPath);
      expect(resolved).toMatch(/^\/assets\/3d\//);
      expect(resolved).toContain('Knight.glb');
    });

    it('should resolve animation pack paths correctly', () => {
      const generalPath = ANIMATION_PACKS.general;
      const resolved = resolveAssetPath(generalPath);
      expect(resolved).toMatch(/^\/assets\/3d\//);
      expect(resolved).toContain('Rig_Medium_General.glb');
    });

    it('should resolve task prop paths correctly', () => {
      const picnicTask = TASK_ASSETS['adventurers-picnic'];
      const firstProp = picnicTask.props[0];
      const resolved = resolveAssetPath(firstProp.path);
      expect(resolved).toMatch(/^\/assets\/3d\//);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // INTEGRATION CHECKS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Integration — Complete vocabulary contract', () => {
    it('should have required characters exist in manifest', () => {
      const requiredCharacters: CharacterKey[] = [
        'knight',
        'barbarian',
        'mage',
        'ranger',
        'rogue',
        'skeleton_warrior',
      ];

      requiredCharacters.forEach((charId) => {
        expect(CHARACTERS[charId]).toBeDefined();
        expect(CHARACTERS[charId]).toContain('.glb');
      });
    });

    it('should have no broken references in TASK_ASSETS', () => {
      for (const [taskId, assets] of Object.entries(TASK_ASSETS)) {
        // Check characters
        assets.characters.forEach((charId) => {
          expect(CHARACTERS[charId]).toBeDefined();
        });

        // Check animation packs
        assets.animationPacks.forEach((packId) => {
          expect(ANIMATION_PACKS[packId]).toBeDefined();
        });

        // Check props have valid paths
        assets.props.forEach((prop) => {
          expect(prop.path).toMatch(/\.(gltf|glb)$/);
        });
      }
    });

    it('should support a full scene script workflow', () => {
      // Simulate: pick a task, spawn a character, play an animation
      const taskId = 'skeleton-birthday';
      const task = TASK_ASSETS[taskId];

      // Get first character
      const characterId = task.characters[0];
      expect(CHARACTERS[characterId]).toBeDefined();

      // Get first animation pack
      const packId = task.animationPacks[0];
      expect(ANIMATION_PACKS[packId]).toBeDefined();

      // Find an animation from that pack
      const clipName = Object.keys(ANIMATION_CLIPS).find(
        (name) => ANIMATION_CLIPS[name as AnimationClipName] === packId,
      );
      expect(clipName).toBeDefined();

      // Get first prop
      const prop = task.props[0];
      expect(prop.key).toBeDefined();
      expect(prop.path).toContain('.gltf');
    });

    it('should have all character paths resolvable', () => {
      for (const [charId, path] of Object.entries(CHARACTERS)) {
        const resolved = resolveAssetPath(path);
        expect(resolved).toMatch(/^\/assets\/3d\/kaykit\/characters\/.+\.glb$/);
      }
    });

    it('should have all animation pack paths resolvable', () => {
      for (const [packId, path] of Object.entries(ANIMATION_PACKS)) {
        const resolved = resolveAssetPath(path);
        expect(resolved).toMatch(/^\/assets\/3d\/kaykit\/animations\/.+\.glb$/);
      }
    });
  });
});
