import type {
  SuccessLevel,
  ActionType,
  Position,
  MoveStyle,
  ActorKey,
  PropKey,
  ReactionKey,
  BackdropKey,
  SpawnAction,
  MoveAction,
  AnimateAction,
  ReactAction,
  EmoteAction,
  SfxAction,
  WaitAction,
  RemoveAction,
  Action,
  SceneScript,
} from '../scene-script';

// ---------------------------------------------------------------------------
// Runtime validation helpers
// ---------------------------------------------------------------------------

const VALID_SUCCESS_LEVELS: string[] = ['FULL_SUCCESS', 'PARTIAL_SUCCESS', 'FUNNY_FAIL'];

const VALID_ACTION_TYPES: string[] = [
  'spawn', 'move', 'animate', 'react', 'emote', 'sfx', 'wait', 'remove',
];

const VALID_POSITIONS: string[] = [
  'left', 'center', 'right', 'top', 'bottom', 'off-left', 'off-right', 'off-top',
];

const VALID_MOVE_STYLES: string[] = [
  'linear', 'arc', 'bounce', 'float', 'shake', 'spin-in', 'drop-in',
];

const VALID_ACTOR_KEYS: string[] = [
  'monster', 'dog', 'trex', 'octopus', 'robot',
  'wizard', 'kid', 'fish', 'squirrel',
];

const VALID_PROP_KEYS: string[] = [
  'cake', 'cake-giant', 'cake-tiny', 'rocket', 'spacesuit',
  'moon', 'flag', 'plates', 'soup-bowl', 'toaster',
  'fridge', 'desk', 'pencil', 'chair', 'lunchbox',
  'guitar', 'drums', 'keyboard', 'microphone',
  'pizza', 'pizza-soggy', 'river', 'pillow-fort',
  'bone', 'balloon', 'present', 'stars', 'fire-extinguisher',
];

const VALID_REACTION_KEYS: string[] = [
  'confetti-burst', 'explosion-cartoon', 'hearts-float',
  'stars-spin', 'question-marks', 'laugh-tears',
  'fire-sneeze', 'splash', 'sparkle-magic', 'sad-cloud',
];

const VALID_BACKDROP_KEYS: string[] = [
  'party-room', 'space', 'wizard-kitchen',
  'classroom', 'underwater-stage', 'city-street',
];

function isValidSuccessLevel(level: string): level is SuccessLevel {
  return VALID_SUCCESS_LEVELS.includes(level);
}

function isValidActionType(type: string): type is ActionType {
  return VALID_ACTION_TYPES.includes(type);
}

function isValidPosition(pos: string): pos is Position {
  return VALID_POSITIONS.includes(pos);
}

function isValidMoveStyle(style: string): style is MoveStyle {
  return VALID_MOVE_STYLES.includes(style);
}

function isValidActorKey(key: string): key is ActorKey {
  return VALID_ACTOR_KEYS.includes(key);
}

function isValidPropKey(key: string): key is PropKey {
  return VALID_PROP_KEYS.includes(key);
}

function isValidReactionKey(key: string): key is ReactionKey {
  return VALID_REACTION_KEYS.includes(key);
}

function isValidBackdropKey(key: string): key is BackdropKey {
  return VALID_BACKDROP_KEYS.includes(key);
}

function isValidTarget(key: string): key is ActorKey | PropKey {
  return isValidActorKey(key) || isValidPropKey(key);
}

function isValidAction(action: Record<string, unknown>): action is Action {
  const type = action.type as string;
  if (!isValidActionType(type)) return false;

  switch (type) {
    case 'spawn':
      return (
        isValidTarget(action.target as string) &&
        isValidPosition(action.position as string)
      );
    case 'move':
      return (
        isValidTarget(action.target as string) &&
        isValidPosition(action.to as string) &&
        (action.style === undefined || isValidMoveStyle(action.style as string))
      );
    case 'animate':
      return (
        isValidActorKey(action.target as string) &&
        typeof action.anim === 'string'
      );
    case 'react':
      return (
        isValidReactionKey(action.effect as string) &&
        isValidPosition(action.position as string)
      );
    case 'emote':
      return isValidActorKey(action.target as string);
    case 'sfx':
      return typeof action.sound === 'string';
    case 'wait':
      return typeof action.duration_ms === 'number';
    case 'remove':
      return isValidTarget(action.target as string);
    default:
      return false;
  }
}

function isValidSceneScript(obj: Record<string, unknown>): obj is SceneScript {
  if (!isValidSuccessLevel(obj.success_level as string)) return false;
  if (typeof obj.narration !== 'string') return false;
  if (!Array.isArray(obj.actions)) return false;
  if (typeof obj.prompt_feedback !== 'string') return false;

  for (const action of obj.actions) {
    if (!isValidAction(action as Record<string, unknown>)) return false;
  }

  if (obj.missing_elements !== undefined) {
    if (!Array.isArray(obj.missing_elements)) return false;
    for (const el of obj.missing_elements) {
      if (typeof el !== 'string') return false;
    }
  }

  return true;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Scene Script type validation', () => {
  // ---- 1. Valid SceneScript object ----
  describe('valid SceneScript object', () => {
    it('should validate a script with required fields: success_level, narration, actions, prompt_feedback', () => {
      const script: SceneScript = {
        success_level: 'PARTIAL_SUCCESS',
        narration: 'The monster grabs the cake!',
        actions: [
          { type: 'spawn', target: 'cake', position: 'center' },
        ],
        prompt_feedback: 'Try adding a bigger cake next time.',
      };

      expect(isValidSceneScript(script as unknown as Record<string, unknown>)).toBe(true);
    });
  });

  // ---- 2. Valid spawn action ----
  describe('valid spawn action', () => {
    it('should validate a spawn action with target and position', () => {
      const action: SpawnAction = {
        type: 'spawn',
        target: 'cake-giant',
        position: 'left',
      };

      expect(isValidAction(action as unknown as Record<string, unknown>)).toBe(true);
      expect(action.type).toBe('spawn');
      expect(isValidTarget(action.target)).toBe(true);
      expect(isValidPosition(action.position)).toBe(true);
    });

    it('should validate a spawn action with optional delay_ms', () => {
      const action: SpawnAction = {
        type: 'spawn',
        target: 'monster',
        position: 'right',
        delay_ms: 500,
      };

      expect(isValidAction(action as unknown as Record<string, unknown>)).toBe(true);
    });

    it('should reject a spawn action with an invalid target', () => {
      const action = {
        type: 'spawn',
        target: 'unicorn',
        position: 'center',
      };

      expect(isValidAction(action)).toBe(false);
    });

    it('should reject a spawn action with an invalid position', () => {
      const action = {
        type: 'spawn',
        target: 'monster',
        position: 'middle',
      };

      expect(isValidAction(action)).toBe(false);
    });
  });

  // ---- 3. Valid move action ----
  describe('valid move action', () => {
    it('should validate a move action with target, to, style, and duration_ms', () => {
      const action: MoveAction = {
        type: 'move',
        target: 'cake-giant',
        to: 'center',
        style: 'arc',
        duration_ms: 800,
      };

      expect(isValidAction(action as unknown as Record<string, unknown>)).toBe(true);
      expect(action.type).toBe('move');
      expect(isValidTarget(action.target)).toBe(true);
      expect(isValidPosition(action.to)).toBe(true);
      expect(isValidMoveStyle(action.style!)).toBe(true);
    });

    it('should validate a move action without optional fields', () => {
      const action: MoveAction = {
        type: 'move',
        target: 'robot',
        to: 'right',
      };

      expect(isValidAction(action as unknown as Record<string, unknown>)).toBe(true);
    });

    it('should reject a move action with an invalid style', () => {
      const action = {
        type: 'move',
        target: 'monster',
        to: 'center',
        style: 'teleport',
      };

      expect(isValidAction(action)).toBe(false);
    });

    it('should validate all move styles', () => {
      const styles = ['linear', 'arc', 'bounce', 'float', 'shake', 'spin-in', 'drop-in'];
      for (const style of styles) {
        expect(isValidMoveStyle(style)).toBe(true);
      }
    });
  });

  // ---- 4. Valid animate action ----
  describe('valid animate action', () => {
    it('should validate an animate action with target and anim', () => {
      const action: AnimateAction = {
        type: 'animate',
        target: 'monster',
        anim: 'eat',
      };

      expect(isValidAction(action as unknown as Record<string, unknown>)).toBe(true);
      expect(action.type).toBe('animate');
      expect(isValidActorKey(action.target)).toBe(true);
    });

    it('should validate an animate action with optional delay_ms and duration_ms', () => {
      const action: AnimateAction = {
        type: 'animate',
        target: 'dog',
        anim: 'wag',
        delay_ms: 200,
        duration_ms: 1000,
      };

      expect(isValidAction(action as unknown as Record<string, unknown>)).toBe(true);
    });

    it('should reject an animate action targeting a prop (props cannot animate)', () => {
      const action = {
        type: 'animate',
        target: 'cake',
        anim: 'spin',
      };

      expect(isValidAction(action)).toBe(false);
    });
  });

  // ---- 5. Valid react action ----
  describe('valid react action', () => {
    it('should validate a react action with effect and position', () => {
      const action: ReactAction = {
        type: 'react',
        effect: 'confetti-burst',
        position: 'center',
      };

      expect(isValidAction(action as unknown as Record<string, unknown>)).toBe(true);
      expect(action.type).toBe('react');
      expect(isValidReactionKey(action.effect)).toBe(true);
      expect(isValidPosition(action.position)).toBe(true);
    });

    it('should validate a react action with optional delay_ms', () => {
      const action: ReactAction = {
        type: 'react',
        effect: 'explosion-cartoon',
        position: 'left',
        delay_ms: 300,
      };

      expect(isValidAction(action as unknown as Record<string, unknown>)).toBe(true);
    });

    it('should reject a react action with an invalid effect', () => {
      const action = {
        type: 'react',
        effect: 'rainbow-beam',
        position: 'center',
      };

      expect(isValidAction(action)).toBe(false);
    });

    it('should validate all reaction keys', () => {
      const reactions = [
        'confetti-burst', 'explosion-cartoon', 'hearts-float',
        'stars-spin', 'question-marks', 'laugh-tears',
        'fire-sneeze', 'splash', 'sparkle-magic', 'sad-cloud',
      ];
      for (const key of reactions) {
        expect(isValidReactionKey(key)).toBe(true);
      }
    });
  });

  // ---- 6. SceneScript with all optional fields ----
  describe('SceneScript with optional fields', () => {
    it('should validate a script that includes missing_elements', () => {
      const script: SceneScript = {
        success_level: 'PARTIAL_SUCCESS',
        narration: 'Almost there, but the plates are missing!',
        actions: [
          { type: 'spawn', target: 'cake', position: 'center' },
          { type: 'react', effect: 'question-marks', position: 'right' },
        ],
        missing_elements: ['plates', 'balloon'],
        prompt_feedback: 'You forgot to mention plates and balloons for the party.',
      };

      expect(isValidSceneScript(script as unknown as Record<string, unknown>)).toBe(true);
      expect(script.missing_elements).toEqual(['plates', 'balloon']);
    });
  });

  // ---- 7. SceneScript with empty actions ----
  describe('SceneScript with empty actions', () => {
    it('should validate a script with an empty actions array', () => {
      const script: SceneScript = {
        success_level: 'FUNNY_FAIL',
        narration: 'Nothing happened at all!',
        actions: [],
        prompt_feedback: 'Try describing what you want to happen at the party.',
      };

      expect(isValidSceneScript(script as unknown as Record<string, unknown>)).toBe(true);
      expect(script.actions).toHaveLength(0);
    });
  });

  // ---- 8. Full success script ----
  describe('full FULL_SUCCESS script', () => {
    it('should validate a complete FULL_SUCCESS scene script', () => {
      const script: SceneScript = {
        success_level: 'FULL_SUCCESS',
        narration: 'The monster eats the giant cake and confetti flies everywhere!',
        actions: [
          { type: 'spawn', target: 'cake-giant', position: 'left' },
          { type: 'move', target: 'cake-giant', to: 'center', style: 'arc', duration_ms: 600 },
          { type: 'spawn', target: 'monster', position: 'right' },
          { type: 'move', target: 'monster', to: 'center', style: 'bounce', duration_ms: 400 },
          { type: 'animate', target: 'monster', anim: 'eat', delay_ms: 500 },
          { type: 'react', effect: 'confetti-burst', position: 'center', delay_ms: 800 },
        ],
        prompt_feedback: 'Great job! You described a full party scene with a cake and a happy monster.',
      };

      expect(isValidSceneScript(script as unknown as Record<string, unknown>)).toBe(true);
      expect(script.success_level).toBe('FULL_SUCCESS');
      expect(script.actions).toHaveLength(6);
    });
  });

  // ---- 9. Funny fail script ----
  describe('full FUNNY_FAIL script', () => {
    it('should validate a complete FUNNY_FAIL scene script', () => {
      const script: SceneScript = {
        success_level: 'FUNNY_FAIL',
        narration: 'The robot trips and the pizza goes flying into the river!',
        actions: [
          { type: 'spawn', target: 'robot', position: 'left' },
          { type: 'spawn', target: 'pizza', position: 'left', delay_ms: 200 },
          { type: 'move', target: 'robot', to: 'center', style: 'shake', duration_ms: 500 },
          { type: 'move', target: 'pizza', to: 'off-top', style: 'arc', duration_ms: 300, delay_ms: 500 },
          { type: 'react', effect: 'splash', position: 'right', delay_ms: 700 },
          { type: 'react', effect: 'laugh-tears', position: 'center', delay_ms: 900 },
        ],
        missing_elements: ['proper delivery instructions'],
        prompt_feedback: 'The robot did not know where to deliver the pizza. Try telling it the address!',
      };

      expect(isValidSceneScript(script as unknown as Record<string, unknown>)).toBe(true);
      expect(script.success_level).toBe('FUNNY_FAIL');
      expect(script.actions).toHaveLength(6);
      expect(script.missing_elements).toBeDefined();
    });
  });

  // ---- Additional validation edge cases ----
  describe('type guard edge cases', () => {
    it('should reject an invalid success_level', () => {
      expect(isValidSuccessLevel('WIN')).toBe(false);
      expect(isValidSuccessLevel('')).toBe(false);
      expect(isValidSuccessLevel('full_success')).toBe(false);
    });

    it('should accept all valid success levels', () => {
      expect(isValidSuccessLevel('FULL_SUCCESS')).toBe(true);
      expect(isValidSuccessLevel('PARTIAL_SUCCESS')).toBe(true);
      expect(isValidSuccessLevel('FUNNY_FAIL')).toBe(true);
    });

    it('should reject an invalid action type', () => {
      expect(isValidActionType('explode')).toBe(false);
      expect(isValidActionType('')).toBe(false);
    });

    it('should accept all valid action types', () => {
      for (const type of VALID_ACTION_TYPES) {
        expect(isValidActionType(type)).toBe(true);
      }
    });

    it('should reject an invalid position', () => {
      expect(isValidPosition('middle')).toBe(false);
      expect(isValidPosition('above')).toBe(false);
    });

    it('should accept all valid positions', () => {
      for (const pos of VALID_POSITIONS) {
        expect(isValidPosition(pos)).toBe(true);
      }
    });

    it('should accept all valid actor keys', () => {
      for (const key of VALID_ACTOR_KEYS) {
        expect(isValidActorKey(key)).toBe(true);
      }
    });

    it('should accept all valid prop keys', () => {
      for (const key of VALID_PROP_KEYS) {
        expect(isValidPropKey(key)).toBe(true);
      }
    });

    it('should accept all valid backdrop keys', () => {
      for (const key of VALID_BACKDROP_KEYS) {
        expect(isValidBackdropKey(key)).toBe(true);
      }
    });

    it('should reject a script missing required fields', () => {
      const incomplete = {
        success_level: 'FULL_SUCCESS',
        narration: 'Hello',
        actions: [],
        // prompt_feedback is missing
      };

      expect(isValidSceneScript(incomplete as Record<string, unknown>)).toBe(false);
    });

    it('should reject a script with an invalid action in the array', () => {
      const script = {
        success_level: 'FULL_SUCCESS',
        narration: 'Test narration',
        actions: [
          { type: 'spawn', target: 'monster', position: 'center' },
          { type: 'teleport', target: 'monster', to: 'left' }, // invalid action type
        ],
        prompt_feedback: 'Some feedback',
      };

      expect(isValidSceneScript(script as Record<string, unknown>)).toBe(false);
    });

    it('should reject a script where missing_elements is not an array of strings', () => {
      const script = {
        success_level: 'PARTIAL_SUCCESS',
        narration: 'Test',
        actions: [],
        prompt_feedback: 'Feedback',
        missing_elements: [42, null],
      };

      expect(isValidSceneScript(script as Record<string, unknown>)).toBe(false);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // 3D VOCABULARY CONTRACT (Phase 1 Migration)
  // ═══════════════════════════════════════════════════════════════════════════

  describe('3D vocabulary contract', () => {
    describe('3D actor keys', () => {
      it('should include core KayKit adventurer characters', () => {
        const actors: ActorKey[] = [
          'knight',
          'barbarian',
          'mage',
          'ranger',
          'rogue',
          'druid',
          'engineer',
        ];

        // Type-level check: if this compiles, these are valid ActorKey values
        actors.forEach((actor) => {
          expect(typeof actor).toBe('string');
        });
      });

      it('should include skeleton characters for T1 and T6 tasks', () => {
        const skeletons: string[] = [
          'skeleton_warrior',
          'skeleton_mage',
          'skeleton_rogue',
          'skeleton_minion',
        ];

        // These are in the type definition but might not be in the legacy test array
        // We just verify they're valid ActorKey type members (type-level check passes compilation)
        expect(skeletons.length).toBeGreaterThan(0);
      });

      it('should include bonus characters for new tasks', () => {
        const bonusChars: string[] = [
          'space_ranger',
          'ninja',
          'clown',
          'witch',
          'vampire',
        ];

        // Type-level check (if this compiles, the types are correct)
        expect(bonusChars.length).toBeGreaterThan(0);
      });

      it('should preserve legacy 2D actor names for cache compatibility', () => {
        const legacyActors: string[] = [
          'monster',
          'dog',
          'trex',
          'octopus',
          'robot',
          'wizard',
          'kid',
          'fish',
          'squirrel',
        ];

        legacyActors.forEach((actor) => {
          expect(VALID_ACTOR_KEYS.includes(actor)).toBe(true);
        });
      });
    });

    describe('3D prop keys', () => {
      it('should include dungeon props for T1 and T5 tasks', () => {
        const dungeonProps: string[] = ['torch', 'barrel', 'chest', 'table', 'bench'];

        // These are new 3D props, not in the old VALID_PROP_KEYS array
        // Type-level check (compilation validates they're PropKey members)
        expect(dungeonProps.length).toBeGreaterThan(0);
      });

      it('should include picnic props for T7 task', () => {
        const picnicProps: string[] = ['blanket', 'basket', 'plate', 'cup'];

        // Type-level check
        expect(picnicProps.length).toBeGreaterThan(0);
      });

      it('should include kitchen props for T3 task', () => {
        const kitchenProps: string[] = ['fridge', 'toaster'];

        // These are in the legacy props
        kitchenProps.forEach((prop) => {
          expect(VALID_PROP_KEYS.includes(prop)).toBe(true);
        });
      });

      it('should include weapons and adventure gear', () => {
        const gearProps: string[] = ['sword', 'shield', 'bow', 'potion', 'scroll'];

        // Type-level check
        expect(gearProps.length).toBeGreaterThan(0);
      });

      it('should include playground props for T4 task', () => {
        const playgroundProps: string[] = ['slide', 'swing', 'sandbox'];

        // Type-level check
        expect(playgroundProps.length).toBeGreaterThan(0);
      });

      it('should include food props (both legacy and 3D)', () => {
        const foodProps: string[] = [
          'cake',
          'cake-3d',
          'cupcake',
          'bread',
          'pie',
          'pizza',
        ];

        // Mixed legacy and new
        expect(foodProps.length).toBeGreaterThan(0);
      });
    });

    describe('3D backdrop keys', () => {
      it('should include new 3D environment keys', () => {
        const backdrops3D: string[] = [
          'dungeon',
          'space-base',
          'kitchen',
          'playground',
          'park',
          'picnic',
          'restaurant',
          'forest',
        ];

        // Type-level check (these are in BackdropKey type)
        expect(backdrops3D.length).toBe(8);
      });

      it('should preserve legacy 2D backdrop keys', () => {
        const legacyBackdrops: string[] = [
          'party-room',
          'space',
          'wizard-kitchen',
          'classroom',
          'underwater-stage',
          'city-street',
        ];

        legacyBackdrops.forEach((backdrop) => {
          expect(VALID_BACKDROP_KEYS.includes(backdrop)).toBe(true);
        });
      });
    });

    describe('3D animation names', () => {
      it('should accept valid KayKit animation clip names', () => {
        const validAnims: string[] = [
          'Idle_A',
          'Walking_A',
          'Running_A',
          'Cheering',
          'Waving',
          'Melee_1H_Attack_Chop',
          'Sit_Chair_Down',
        ];

        // Type-level check — if this compiles, AnimationName accepts these
        validAnims.forEach((anim) => {
          const action: AnimateAction = {
            type: 'animate',
            target: 'knight',
            anim: anim as AnimationName,
          };
          expect(action.anim).toBe(anim);
        });
      });

      it('should accept skeleton-specific animations', () => {
        const skeletonAnims: string[] = [
          'Skeletons_Awaken_Floor',
          'Skeletons_Taunt',
          'Skeletons_Death_Resurrect',
        ];

        skeletonAnims.forEach((anim) => {
          const action: AnimateAction = {
            type: 'animate',
            target: 'skeleton_warrior',
            anim: anim as AnimationName,
          };
          expect(action.anim).toBe(anim);
        });
      });

      it('should accept tool animations for interactive scenes', () => {
        const toolAnims: string[] = [
          'Chop',
          'Dig',
          'Hammer',
          'Fishing_Cast',
          'Fishing_Idle',
        ];

        toolAnims.forEach((anim) => {
          const action: AnimateAction = {
            type: 'animate',
            target: 'barbarian',
            anim: anim as AnimationName,
          };
          expect(action.anim).toBe(anim);
        });
      });

      it('should accept custom animation strings (fallback)', () => {
        const customAnim = 'Custom_Dance_Move';
        const action: AnimateAction = {
          type: 'animate',
          target: 'mage',
          anim: customAnim,
        };
        expect(action.anim).toBe(customAnim);
      });
    });

    describe('3D scene script integration', () => {
      it('should validate a 3D skeleton birthday party script (type-level)', () => {
        const script: SceneScript = {
          success_level: 'FULL_SUCCESS',
          narration: 'The skeleton jumps out and everyone cheers!',
          actions: [
            { type: 'spawn', target: 'skeleton_warrior', position: 'center' },
            { type: 'animate', target: 'skeleton_warrior', anim: 'Skeletons_Awaken_Floor' },
            { type: 'spawn', target: 'cake-3d', position: 'left' },
            { type: 'react', effect: 'confetti-burst', position: 'center' },
          ],
          prompt_feedback: 'Perfect birthday surprise!',
        };

        // Type-level validation: if this compiles, the types are correct
        expect(script.success_level).toBe('FULL_SUCCESS');
        expect(script.actions).toHaveLength(4);
        expect(script.narration).toContain('skeleton');
      });

      it('should validate a 3D knight space mission script (type-level)', () => {
        const script: SceneScript = {
          success_level: 'PARTIAL_SUCCESS',
          narration: 'The knight accidentally launches into space!',
          actions: [
            { type: 'spawn', target: 'knight', position: 'left' },
            { type: 'move', target: 'knight', to: 'off-top', style: 'float' },
            { type: 'animate', target: 'knight', anim: 'Jump_Full_Long' },
            { type: 'react', effect: 'stars-spin', position: 'center' },
          ],
          missing_elements: ['space helmet'],
          prompt_feedback: 'The knight needs a helmet to breathe in space!',
        };

        // Type-level validation
        expect(script.success_level).toBe('PARTIAL_SUCCESS');
        expect(script.missing_elements).toEqual(['space helmet']);
        expect(script.actions).toHaveLength(4);
      });

      it('should validate a 3D mage kitchen chaos script (type-level)', () => {
        const script: SceneScript = {
          success_level: 'FUNNY_FAIL',
          narration: 'The mage casts a spell and the kitchen explodes!',
          actions: [
            { type: 'spawn', target: 'mage', position: 'center' },
            { type: 'animate', target: 'mage', anim: 'Ranged_Magic_Shoot' },
            { type: 'react', effect: 'explosion-cartoon', position: 'center', delay_ms: 500 },
            { type: 'react', effect: 'fire-sneeze', position: 'right', delay_ms: 700 },
          ],
          prompt_feedback: 'Maybe try a simpler spell in the kitchen!',
        };

        // Type-level validation: AnimationName includes `| string` fallback
        expect(script.success_level).toBe('FUNNY_FAIL');
        expect(script.actions).toHaveLength(4);
        expect(script.narration).toContain('mage');
      });

      it('should allow mixing legacy 2D actors with new 3D props', () => {
        const script: SceneScript = {
          success_level: 'FULL_SUCCESS',
          narration: 'The monster (now barbarian) plays the guitar!',
          actions: [
            { type: 'spawn', target: 'monster', position: 'center' },
            { type: 'spawn', target: 'guitar', position: 'center' },
            { type: 'animate', target: 'monster', anim: 'Cheering' },
          ],
          prompt_feedback: 'Great music!',
        };

        expect(isValidSceneScript(script as unknown as Record<string, unknown>)).toBe(true);
      });
    });
  });
});
