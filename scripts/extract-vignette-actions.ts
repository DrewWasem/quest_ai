#!/usr/bin/env npx tsx
/**
 * Extract all actions from every vignette and output a CSV with:
 *   - Metadata columns (zone, stage, id, score, slots)
 *   - description (author's intent)
 *   - story_summary (generated from actions — human-readable narrative)
 *   - feedback_message (what the kid sees after)
 *   - Action1-Action100 columns
 *
 * Run: npx tsx scripts/extract-vignette-actions.ts
 */
import * as fs from 'fs';
import * as path from 'path';

import {
  SKELETON_BIRTHDAY_STAGE_1, SKELETON_BIRTHDAY_DEFAULT,
  SKELETON_BIRTHDAY_STAGE_2, SKELETON_BIRTHDAY_DEFAULT_2,
  SKELETON_BIRTHDAY_STAGE_3, SKELETON_BIRTHDAY_DEFAULT_3,
} from '../frontend/src/data/vignettes/skeleton-birthday';
import {
  KNIGHT_SPACE_STAGE_1, KNIGHT_SPACE_DEFAULT,
  KNIGHT_SPACE_STAGE_2, KNIGHT_SPACE_DEFAULT_2,
  KNIGHT_SPACE_STAGE_3, KNIGHT_SPACE_DEFAULT_3,
} from '../frontend/src/data/vignettes/knight-space';
import {
  MAGE_KITCHEN_STAGE_1, MAGE_KITCHEN_DEFAULT,
  MAGE_KITCHEN_STAGE_2, MAGE_KITCHEN_DEFAULT_2,
  MAGE_KITCHEN_STAGE_3, MAGE_KITCHEN_DEFAULT_3,
} from '../frontend/src/data/vignettes/mage-kitchen';
import {
  BARBARIAN_SCHOOL_STAGE_1, BARBARIAN_SCHOOL_DEFAULT,
  BARBARIAN_SCHOOL_STAGE_2, BARBARIAN_SCHOOL_DEFAULT_2,
  BARBARIAN_SCHOOL_STAGE_3, BARBARIAN_SCHOOL_DEFAULT_3,
} from '../frontend/src/data/vignettes/barbarian-school';
import {
  DUNGEON_CONCERT_STAGE_1, DUNGEON_CONCERT_DEFAULT,
  DUNGEON_CONCERT_STAGE_2, DUNGEON_CONCERT_DEFAULT_2,
  DUNGEON_CONCERT_STAGE_3, DUNGEON_CONCERT_DEFAULT_3,
} from '../frontend/src/data/vignettes/dungeon-concert';
import {
  SKELETON_PIZZA_STAGE_1, SKELETON_PIZZA_DEFAULT,
  SKELETON_PIZZA_STAGE_2, SKELETON_PIZZA_DEFAULT_2,
  SKELETON_PIZZA_STAGE_3, SKELETON_PIZZA_DEFAULT_3,
} from '../frontend/src/data/vignettes/skeleton-pizza';
import {
  ADVENTURERS_PICNIC_STAGE_1, ADVENTURERS_PICNIC_DEFAULT,
  ADVENTURERS_PICNIC_STAGE_2, ADVENTURERS_PICNIC_DEFAULT_2,
  ADVENTURERS_PICNIC_STAGE_3, ADVENTURERS_PICNIC_DEFAULT_3,
} from '../frontend/src/data/vignettes/adventurers-picnic';

import type { Vignette, VignetteAction, VignetteStep } from '../frontend/src/types/madlibs';

// ─── Zone config ──────────────────────────────────────────────────────────────

const ZONES = [
  {
    zone: 'skeleton-birthday',
    stages: [
      { stage: 1, vignettes: SKELETON_BIRTHDAY_STAGE_1, defaultVignette: SKELETON_BIRTHDAY_DEFAULT },
      { stage: 2, vignettes: SKELETON_BIRTHDAY_STAGE_2, defaultVignette: SKELETON_BIRTHDAY_DEFAULT_2 },
      { stage: 3, vignettes: SKELETON_BIRTHDAY_STAGE_3, defaultVignette: SKELETON_BIRTHDAY_DEFAULT_3 },
    ],
  },
  {
    zone: 'knight-space',
    stages: [
      { stage: 1, vignettes: KNIGHT_SPACE_STAGE_1, defaultVignette: KNIGHT_SPACE_DEFAULT },
      { stage: 2, vignettes: KNIGHT_SPACE_STAGE_2, defaultVignette: KNIGHT_SPACE_DEFAULT_2 },
      { stage: 3, vignettes: KNIGHT_SPACE_STAGE_3, defaultVignette: KNIGHT_SPACE_DEFAULT_3 },
    ],
  },
  {
    zone: 'mage-kitchen',
    stages: [
      { stage: 1, vignettes: MAGE_KITCHEN_STAGE_1, defaultVignette: MAGE_KITCHEN_DEFAULT },
      { stage: 2, vignettes: MAGE_KITCHEN_STAGE_2, defaultVignette: MAGE_KITCHEN_DEFAULT_2 },
      { stage: 3, vignettes: MAGE_KITCHEN_STAGE_3, defaultVignette: MAGE_KITCHEN_DEFAULT_3 },
    ],
  },
  {
    zone: 'barbarian-school',
    stages: [
      { stage: 1, vignettes: BARBARIAN_SCHOOL_STAGE_1, defaultVignette: BARBARIAN_SCHOOL_DEFAULT },
      { stage: 2, vignettes: BARBARIAN_SCHOOL_STAGE_2, defaultVignette: BARBARIAN_SCHOOL_DEFAULT_2 },
      { stage: 3, vignettes: BARBARIAN_SCHOOL_STAGE_3, defaultVignette: BARBARIAN_SCHOOL_DEFAULT_3 },
    ],
  },
  {
    zone: 'dungeon-concert',
    stages: [
      { stage: 1, vignettes: DUNGEON_CONCERT_STAGE_1, defaultVignette: DUNGEON_CONCERT_DEFAULT },
      { stage: 2, vignettes: DUNGEON_CONCERT_STAGE_2, defaultVignette: DUNGEON_CONCERT_DEFAULT_2 },
      { stage: 3, vignettes: DUNGEON_CONCERT_STAGE_3, defaultVignette: DUNGEON_CONCERT_DEFAULT_3 },
    ],
  },
  {
    zone: 'skeleton-pizza',
    stages: [
      { stage: 1, vignettes: SKELETON_PIZZA_STAGE_1, defaultVignette: SKELETON_PIZZA_DEFAULT },
      { stage: 2, vignettes: SKELETON_PIZZA_STAGE_2, defaultVignette: SKELETON_PIZZA_DEFAULT_2 },
      { stage: 3, vignettes: SKELETON_PIZZA_STAGE_3, defaultVignette: SKELETON_PIZZA_DEFAULT_3 },
    ],
  },
  {
    zone: 'adventurers-picnic',
    stages: [
      { stage: 1, vignettes: ADVENTURERS_PICNIC_STAGE_1, defaultVignette: ADVENTURERS_PICNIC_DEFAULT },
      { stage: 2, vignettes: ADVENTURERS_PICNIC_STAGE_2, defaultVignette: ADVENTURERS_PICNIC_DEFAULT_2 },
      { stage: 3, vignettes: ADVENTURERS_PICNIC_STAGE_3, defaultVignette: ADVENTURERS_PICNIC_DEFAULT_3 },
    ],
  },
];

// ─── Action formatting (compact for CSV cells) ───────────────────────────────

function formatAction(a: VignetteAction): string {
  const parts: string[] = [a.action];
  if (a.character) parts.push(a.character);
  else if (a.characters) {
    parts.push(typeof a.characters === 'string' ? a.characters : a.characters.join('+'));
  } else if (a.asset) parts.push(a.asset);

  if (a.anim) parts.push(a.anim);
  if (a.effect) parts.push(a.effect);
  if (a.sound) parts.push(a.sound);
  if (a.emoji) parts.push(a.emoji);
  if (a.text) parts.push(a.text.replace(/,/g, ';'));
  if (a.to) parts.push(`→${a.to}`);
  if (a.position && !a.to) parts.push(`@${a.position}`);
  if (a.color) parts.push(a.color);
  return parts.join(':');
}

function extractActions(v: Vignette): string[] {
  const actions: string[] = [];
  for (const step of v.steps) {
    for (const action of step.parallel) {
      actions.push(formatAction(action));
    }
  }
  return actions;
}

// ─── Pretty character name ────────────────────────────────────────────────────

function pretty(id: string | undefined): string {
  if (!id) return 'something';
  return id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ─── Story summary generator ─────────────────────────────────────────────────
// Walks through steps in order, building a human-readable narrative sentence
// by sentence. Groups parallel actions into single beats.

function generateStorySummary(v: Vignette): string {
  const sentences: string[] = [];
  const chars = new Set<string>();     // characters seen
  const props = new Set<string>();     // props/assets spawned

  for (const step of v.steps) {
    const beat = analyzeBeat(step, chars, props);
    if (beat) sentences.push(beat);
  }

  if (sentences.length === 0) return '(empty vignette)';
  return sentences.join(' ');
}

function analyzeBeat(step: VignetteStep, chars: Set<string>, props: Set<string>): string | null {
  const actions = step.parallel;
  if (!actions.length) return null;

  // Classify actions in this beat
  const spawns: VignetteAction[] = [];
  const charSpawns: VignetteAction[] = [];
  const moves: VignetteAction[] = [];
  const anims: VignetteAction[] = [];
  const emotes: VignetteAction[] = [];
  const reacts: VignetteAction[] = [];
  const sfxs: VignetteAction[] = [];
  const textPopups: VignetteAction[] = [];
  const cameraActions: VignetteAction[] = [];
  const screenFlashes: VignetteAction[] = [];
  const grows: VignetteAction[] = [];
  const crowdReacts: VignetteAction[] = [];
  const delays: VignetteAction[] = [];
  const others: VignetteAction[] = [];

  for (const a of actions) {
    switch (a.action) {
      case 'spawn': spawns.push(a); break;
      case 'spawn_character': charSpawns.push(a); break;
      case 'move': moves.push(a); break;
      case 'animate': anims.push(a); break;
      case 'emote': emotes.push(a); break;
      case 'react': reacts.push(a); break;
      case 'sfx': sfxs.push(a); break;
      case 'text_popup': textPopups.push(a); break;
      case 'camera_shake': case 'camera_zoom': cameraActions.push(a); break;
      case 'screen_flash': screenFlashes.push(a); break;
      case 'grow': grows.push(a); break;
      case 'crowd_react': crowdReacts.push(a); break;
      case 'delay': delays.push(a); break;
      default: others.push(a); break;
    }
  }

  const parts: string[] = [];

  // Narration text popups — these are the narrator voice
  for (const t of textPopups) {
    if (t.text) parts.push(`[Narrator: "${t.text}"]`);
  }

  // Character spawns → "X enters"
  for (const c of charSpawns) {
    const name = pretty(c.character!);
    const isNew = !chars.has(c.character!);
    chars.add(c.character!);
    if (isNew) {
      const from = c.position?.includes('left') ? 'from the left' :
                   c.position?.includes('right') ? 'from the right' :
                   c.position?.includes('air') ? 'from above' : '';
      parts.push(`${name} enters${from ? ' ' + from : ''}.`);
    }
  }

  // Prop spawns → "A cake appears at center"
  if (spawns.length > 0) {
    const propNames = spawns.map(s => pretty(s.asset || 'item')).filter(n => !props.has(n));
    spawns.forEach(s => { if (s.asset) props.add(pretty(s.asset)); });
    if (propNames.length === 1) {
      parts.push(`${propNames[0]} appears.`);
    } else if (propNames.length <= 3) {
      parts.push(`${propNames.join(', ')} appear.`);
    } else {
      parts.push(`${propNames.length} props appear (${propNames.slice(0, 3).join(', ')}...).`);
    }
  }

  // Grows
  for (const g of grows) {
    parts.push(`${pretty(g.character || g.asset || 'it')} grows to full size.`);
  }

  // Emotes with dialogue — most important for story
  for (const e of emotes) {
    const name = pretty(e.character!);
    const mood = e.emoji || '';
    const dialogue = e.text || '';
    if (dialogue) {
      parts.push(`${name} (${mood}): "${dialogue}"`);
    } else if (mood) {
      parts.push(`${name} feels ${mood}.`);
    }
  }

  // Moves
  if (moves.length > 0) {
    const movers = [...new Set(moves.map(m => pretty(m.character!)))];
    if (movers.length === 1) {
      const dest = moves[0].to?.replace('→', '') || 'a new position';
      parts.push(`${movers[0]} moves to ${dest}.`);
    } else {
      parts.push(`${movers.join(' and ')} move to position.`);
    }
  }

  // Animations — only interesting non-idle ones
  const interestingAnims = anims.filter(a =>
    a.anim && !a.anim.startsWith('Idle') && !a.anim.startsWith('Walking') && !a.anim.startsWith('Running')
  );
  if (interestingAnims.length > 0) {
    const animMap = new Map<string, string[]>();
    for (const a of interestingAnims) {
      const anim = a.anim!.replace(/_/g, ' ');
      if (!animMap.has(anim)) animMap.set(anim, []);
      animMap.get(anim)!.push(pretty(a.character!));
    }
    for (const [anim, charList] of animMap) {
      if (charList.length <= 2) {
        parts.push(`${charList.join(' and ')} ${animDescribe(anim)}.`);
      } else {
        parts.push(`Everyone ${animDescribe(anim)}.`);
      }
    }
  }

  // React effects
  if (reacts.length > 0) {
    const effects = [...new Set(reacts.map(r => r.effect || 'effect'))];
    parts.push(`[Effect: ${effects.join(', ')}]`);
  }

  // Camera drama
  if (cameraActions.length > 0) {
    const shakes = cameraActions.filter(c => c.action === 'camera_shake');
    const zooms = cameraActions.filter(c => c.action === 'camera_zoom');
    if (shakes.length) parts.push('[Camera shakes]');
    if (zooms.length) parts.push(`[Camera zooms to ${zooms[0].target || 'focus'}]`);
  }

  // Screen flash
  if (screenFlashes.length > 0) {
    parts.push(`[Flash: ${screenFlashes[0].color || 'white'}]`);
  }

  // Crowd reacts
  if (crowdReacts.length > 0) {
    const type = crowdReacts[0].effect || crowdReacts[0].emoji || 'cheer';
    parts.push(`[Crowd: ${type}]`);
  }

  // Delays
  if (delays.length > 0 && parts.length === 0) {
    parts.push('[Dramatic pause]');
  }

  return parts.length > 0 ? parts.join(' ') : null;
}

function animDescribe(anim: string): string {
  const lower = anim.toLowerCase();
  if (lower.includes('cheer')) return 'cheers';
  if (lower.includes('wav')) return 'waves';
  if (lower.includes('cast')) return 'casts a spell';
  if (lower.includes('hit')) return 'gets hit';
  if (lower.includes('dodge')) return 'dodges';
  if (lower.includes('interact')) return 'interacts';
  if (lower.includes('sit')) return 'sits down';
  if (lower.includes('jump')) return 'jumps';
  if (lower.includes('dance')) return 'dances';
  if (lower.includes('spin')) return 'spins around';
  if (lower.includes('throw')) return 'throws something';
  if (lower.includes('block')) return 'blocks';
  if (lower.includes('stun')) return 'is stunned';
  if (lower.includes('death') || lower.includes('defeat')) return 'falls over';
  if (lower.includes('punch') || lower.includes('slash')) return 'attacks';
  if (lower.includes('pick')) return 'picks something up';
  if (lower.includes('push')) return 'pushes';
  if (lower.includes('kick')) return 'kicks';
  return `does ${anim}`;
}

// ─── Trigger slots ────────────────────────────────────────────────────────────

function triggerSlots(v: Vignette): string[] {
  return Object.values(v.trigger);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const MAX_ACTION_COLS = 100;

interface Row {
  zone: string;
  stage: number;
  vignetteId: string;
  promptScore: string;
  description: string;
  storySummary: string;
  feedbackMessage: string;
  actionCount: number;
  slots: string[];
  actions: string[];
}

const rows: Row[] = [];

for (const zoneConfig of ZONES) {
  for (const stageConfig of zoneConfig.stages) {
    const allVignettes = [...stageConfig.vignettes, stageConfig.defaultVignette];
    for (const v of allVignettes) {
      const actions = extractActions(v);
      rows.push({
        zone: zoneConfig.zone,
        stage: stageConfig.stage,
        vignetteId: v.id,
        promptScore: v.promptScore,
        description: v.description,
        storySummary: generateStorySummary(v),
        feedbackMessage: v.feedback?.message || '',
        actionCount: actions.length,
        slots: triggerSlots(v),
        actions,
      });
    }
  }
}

const maxSlots = Math.max(...rows.map(r => r.slots.length));

const headers = [
  'zone', 'stage', 'vignette_id', 'prompt_score', 'action_count',
  'description', 'story_summary', 'feedback_message',
  ...Array.from({ length: maxSlots }, (_, i) => `Slot${i + 1}`),
  ...Array.from({ length: MAX_ACTION_COLS }, (_, i) => `Action${i + 1}`),
];

function csvEscape(val: string): string {
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

const csvLines = [headers.join(',')];

for (const row of rows) {
  const slotCells = Array.from({ length: maxSlots }, (_, i) => row.slots[i] ?? '');
  const actionCells = Array.from({ length: MAX_ACTION_COLS }, (_, i) => row.actions[i] ?? '');

  const cells = [
    row.zone,
    String(row.stage),
    row.vignetteId,
    row.promptScore,
    String(row.actionCount),
    row.description,
    row.storySummary,
    row.feedbackMessage,
    ...slotCells,
    ...actionCells,
  ];
  csvLines.push(cells.map(csvEscape).join(','));
}

const outputPath = path.resolve(__dirname, '../docs/vignette-audit.csv');
fs.writeFileSync(outputPath, csvLines.join('\n') + '\n');

const maxActions = Math.max(...rows.map(r => r.actions.length));
console.log(`Written ${rows.length} vignettes to ${outputPath}`);
console.log(`Max action count: ${maxActions}`);
console.log(`Columns: zone, stage, vignette_id, prompt_score, action_count, description, story_summary, feedback_message, Slot1-${maxSlots}, Action1-${MAX_ACTION_COLS}`);

// Sample a story summary
const sample = rows.find(r => r.vignetteId === 'sb_cake_magic_show');
if (sample) {
  console.log(`\n── Sample story_summary (${sample.vignetteId}) ──`);
  console.log(sample.storySummary);
}

const sample2 = rows.find(r => r.vignetteId === 'dc_mage_fight');
if (sample2) {
  console.log(`\n── Sample story_summary (${sample2.vignetteId}) ──`);
  console.log(sample2.storySummary);
}

const sample3 = rows.find(r => r.vignetteId === 'ap_ninja_cast_spell');
if (sample3) {
  console.log(`\n── Sample story_summary (${sample3.vignetteId}) ──`);
  console.log(sample3.storySummary);
}

console.log('\nPer-zone counts:');
const zoneCounts = new Map<string, number>();
for (const r of rows) zoneCounts.set(r.zone, (zoneCounts.get(r.zone) ?? 0) + 1);
for (const [zone, count] of zoneCounts) console.log(`  ${zone}: ${count}`);
