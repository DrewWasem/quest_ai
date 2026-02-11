/**
 * Block Resolver — converts a BlockResponse into a full SceneScript.
 *
 * Pure function: no side effects, no network calls, fully testable.
 *
 * Flow:
 * 1. For each element in response.elements:
 *    - Lookup block keyword in library (case-insensitive)
 *    - If count > 1 and block supports groups → generate spawn_group action
 *    - If count === 1 → generate single spawn action
 *    - Map choreography hints to positions/styles
 * 2. For each response.reactions → generate react action
 * 3. Append associatedReactions from blocks (if not already included)
 * 4. Return full SceneScript compatible with ScenePlayer3D
 */

import type { BlockResponse, BlockLibrary, ActionBlock } from '../types/block-types';
import type { SceneScript, Action, Position, MoveStyle, ActorKey, PropKey, ReactionKey } from '../types/scene-script';

// ─── CHOREOGRAPHY HINT MAPPING ──────────────────────────────────────────────

interface ChoreographyResult {
  spawnPosition: Position;
  moveToPosition?: Position;
  moveStyle?: MoveStyle;
}

const CHOREOGRAPHY_MAP: Record<string, ChoreographyResult> = {
  'enter-left':    { spawnPosition: 'off-left',  moveToPosition: 'left',   moveStyle: 'linear' },
  'enter-right':   { spawnPosition: 'off-right', moveToPosition: 'right',  moveStyle: 'linear' },
  'drop-center':   { spawnPosition: 'off-top',   moveToPosition: 'center', moveStyle: 'drop-in' },
  'float-above':   { spawnPosition: 'top',       moveStyle: 'float' },
  'bounce-in':     { spawnPosition: 'off-left',  moveToPosition: 'center', moveStyle: 'bounce' },
  'appear-center': { spawnPosition: 'center' },
  'appear-left':   { spawnPosition: 'left' },
  'appear-right':  { spawnPosition: 'right' },
  'spin-in':       { spawnPosition: 'off-left',  moveToPosition: 'center', moveStyle: 'spin-in' },
};

/** Resolve a choreography hint string to spawn/move positions */
function resolveChoreography(hint?: string, block?: ActionBlock): ChoreographyResult {
  if (hint && CHOREOGRAPHY_MAP[hint]) {
    return CHOREOGRAPHY_MAP[hint];
  }
  // Default based on block's enterStyle
  const enterStyle = block?.enterStyle || 'appear';
  switch (enterStyle) {
    case 'walk':     return { spawnPosition: 'off-left', moveToPosition: 'center', moveStyle: 'linear' };
    case 'drop-in':  return { spawnPosition: 'off-top',  moveToPosition: 'center', moveStyle: 'drop-in' };
    case 'bounce':   return { spawnPosition: 'off-left', moveToPosition: 'center', moveStyle: 'bounce' };
    case 'float':    return { spawnPosition: 'top' };
    default:         return { spawnPosition: 'center' };
  }
}

// ─── POSITION CYCLING ───────────────────────────────────────────────────────

// ─── GROUP SPREAD POSITIONING ───────────────────────────────────────────────

/**
 * For N items, distribute in a line around a center position.
 * Returns offsets as [x, 0, 0] arrays.
 */
function computeGroupOffsets(count: number, spreadDistance: number): [number, number, number][] {
  const offsets: [number, number, number][] = [];
  const halfWidth = (count - 1) * spreadDistance / 2;
  for (let i = 0; i < count; i++) {
    const x = -halfWidth + i * spreadDistance;
    offsets.push([x, 0, 0]);
  }
  return offsets;
}

// ─── MAIN RESOLVER ──────────────────────────────────────────────────────────

export function resolveBlocks(
  response: BlockResponse,
  library: BlockLibrary,
  _zoneId?: string,
): SceneScript {
  const actions: Action[] = [];
  const missingElements: string[] = [...(response.missing_elements || [])];
  const includedReactions = new Set<string>();

  for (const element of response.elements) {
    const blockKey = element.block.toLowerCase().trim();
    const block = library.get(blockKey);

    if (!block) {
      console.warn(`[BlockResolver] Unknown block "${element.block}" — skipping`);
      missingElements.push(element.block);
      continue;
    }

    const count = Math.min(element.count || 1, block.maxCount);
    const choreo = resolveChoreography(element.action, block);

    // ── Reaction combos: emit react actions, no spawn ──
    if (block.category === 'reaction_combo') {
      const reactions = block.associatedReactions || [];
      for (const effect of reactions) {
        if (!includedReactions.has(effect)) {
          actions.push({
            type: 'react',
            effect: effect as ReactionKey,
            position: 'center',
          });
          includedReactions.add(effect);
        }
      }
      continue;
    }

    // ── Group spawn (count > 1 and block supports it) ──
    if (count > 1 && block.supportsGroup) {
      const basePos = choreo.moveToPosition || choreo.spawnPosition;
      const offsets = computeGroupOffsets(count, block.spreadDistance);

      actions.push({
        type: 'spawn_group',
        targets: offsets.map((offset, i) => ({
          id: `${block.id}-${i}`,
          target: block.id,
          position: basePos,
          offset,
        })),
        stagger_ms: 150,
      });
    }
    // ── Single spawn ──
    else {
      const targetId = block.characterId || block.propId || block.id;
      const spawnPos = choreo.spawnPosition;

      actions.push({
        type: 'spawn',
        target: targetId as ActorKey | PropKey,
        position: spawnPos,
      });

      // Add move action if choreography requires it
      if (choreo.moveToPosition) {
        actions.push({
          type: 'move',
          target: targetId as ActorKey | PropKey,
          to: choreo.moveToPosition,
          style: choreo.moveStyle || 'linear',
        });
      }

      // Add idle animation for characters
      if (block.category === 'character' && block.idleAnimation) {
        actions.push({
          type: 'animate',
          target: targetId as ActorKey,
          anim: block.idleAnimation,
        });
      }
    }

    // Collect associated reactions
    if (block.associatedReactions) {
      for (const r of block.associatedReactions) {
        if (!includedReactions.has(r)) {
          includedReactions.add(r);
        }
      }
    }
  }

  // ── Collect explicit reactions from response ──
  for (const reaction of (response.reactions || [])) {
    includedReactions.add(reaction);
  }

  // ── Emit all collected reactions (associated + explicit) as react actions ──
  for (const reaction of includedReactions) {
    const alreadyInActions = actions.some(
      a => a.type === 'react' && 'effect' in a && a.effect === reaction
    );
    if (!alreadyInActions) {
      actions.push({
        type: 'react',
        effect: reaction as ReactionKey,
        position: 'center',
      });
    }
  }

  return {
    success_level: response.success_level,
    narration: response.narration,
    actions,
    missing_elements: missingElements.length > 0 ? missingElements : undefined,
    prompt_feedback: response.prompt_feedback,
  };
}
