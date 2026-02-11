/**
 * Block Response Types — lightweight format for Claude → BlockResolver pipeline.
 *
 * Instead of Claude generating full SceneScript JSON with explicit actions,
 * it returns keywords + counts. The BlockResolver maps these to pre-built,
 * tested action sequences client-side.
 */

export interface BlockResponse {
  success_level: 'FULL_SUCCESS' | 'PARTIAL_SUCCESS' | 'FUNNY_FAIL';
  narration: string;
  elements: BlockElement[];
  reactions: string[];
  prompt_feedback: string;
  missing_elements: string[];
}

export interface BlockElement {
  block: string;        // keyword from BlockLibrary (e.g. "cat", "cake_birthday", "knight")
  count?: number;       // default 1
  action?: string;      // choreography hint: "enter-left", "drop-center", "float-above", etc.
}

export interface ActionBlock {
  id: string;
  aliases: string[];
  category: 'character' | 'prop' | 'animal' | 'procedural' | 'reaction_combo';
  characterId?: string;
  propId?: string;
  modelPath?: string;
  procedural?: string;
  enterStyle?: string;
  defaultAnimation?: string;
  idleAnimation?: string;
  supportsGroup: boolean;
  maxCount: number;
  spreadDistance: number;
  scale?: number;
  associatedReactions?: string[];
}

export type BlockLibrary = Map<string, ActionBlock>;
