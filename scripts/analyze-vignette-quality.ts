#!/usr/bin/env npx tsx
/**
 * Analyze vignette quality and generate specific fix instructions per vignette.
 * Run: npx tsx scripts/analyze-vignette-quality.ts
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
  { zone: 'skeleton-birthday', stages: [
    { stage: 1, vignettes: SKELETON_BIRTHDAY_STAGE_1, defaultVignette: SKELETON_BIRTHDAY_DEFAULT },
    { stage: 2, vignettes: SKELETON_BIRTHDAY_STAGE_2, defaultVignette: SKELETON_BIRTHDAY_DEFAULT_2 },
    { stage: 3, vignettes: SKELETON_BIRTHDAY_STAGE_3, defaultVignette: SKELETON_BIRTHDAY_DEFAULT_3 },
  ]},
  { zone: 'knight-space', stages: [
    { stage: 1, vignettes: KNIGHT_SPACE_STAGE_1, defaultVignette: KNIGHT_SPACE_DEFAULT },
    { stage: 2, vignettes: KNIGHT_SPACE_STAGE_2, defaultVignette: KNIGHT_SPACE_DEFAULT_2 },
    { stage: 3, vignettes: KNIGHT_SPACE_STAGE_3, defaultVignette: KNIGHT_SPACE_DEFAULT_3 },
  ]},
  { zone: 'mage-kitchen', stages: [
    { stage: 1, vignettes: MAGE_KITCHEN_STAGE_1, defaultVignette: MAGE_KITCHEN_DEFAULT },
    { stage: 2, vignettes: MAGE_KITCHEN_STAGE_2, defaultVignette: MAGE_KITCHEN_DEFAULT_2 },
    { stage: 3, vignettes: MAGE_KITCHEN_STAGE_3, defaultVignette: MAGE_KITCHEN_DEFAULT_3 },
  ]},
  { zone: 'barbarian-school', stages: [
    { stage: 1, vignettes: BARBARIAN_SCHOOL_STAGE_1, defaultVignette: BARBARIAN_SCHOOL_DEFAULT },
    { stage: 2, vignettes: BARBARIAN_SCHOOL_STAGE_2, defaultVignette: BARBARIAN_SCHOOL_DEFAULT_2 },
    { stage: 3, vignettes: BARBARIAN_SCHOOL_STAGE_3, defaultVignette: BARBARIAN_SCHOOL_DEFAULT_3 },
  ]},
  { zone: 'dungeon-concert', stages: [
    { stage: 1, vignettes: DUNGEON_CONCERT_STAGE_1, defaultVignette: DUNGEON_CONCERT_DEFAULT },
    { stage: 2, vignettes: DUNGEON_CONCERT_STAGE_2, defaultVignette: DUNGEON_CONCERT_DEFAULT_2 },
    { stage: 3, vignettes: DUNGEON_CONCERT_STAGE_3, defaultVignette: DUNGEON_CONCERT_DEFAULT_3 },
  ]},
  { zone: 'skeleton-pizza', stages: [
    { stage: 1, vignettes: SKELETON_PIZZA_STAGE_1, defaultVignette: SKELETON_PIZZA_DEFAULT },
    { stage: 2, vignettes: SKELETON_PIZZA_STAGE_2, defaultVignette: SKELETON_PIZZA_DEFAULT_2 },
    { stage: 3, vignettes: SKELETON_PIZZA_STAGE_3, defaultVignette: SKELETON_PIZZA_DEFAULT_3 },
  ]},
  { zone: 'adventurers-picnic', stages: [
    { stage: 1, vignettes: ADVENTURERS_PICNIC_STAGE_1, defaultVignette: ADVENTURERS_PICNIC_DEFAULT },
    { stage: 2, vignettes: ADVENTURERS_PICNIC_STAGE_2, defaultVignette: ADVENTURERS_PICNIC_DEFAULT_2 },
    { stage: 3, vignettes: ADVENTURERS_PICNIC_STAGE_3, defaultVignette: ADVENTURERS_PICNIC_DEFAULT_3 },
  ]},
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatAction(a: VignetteAction): string {
  const parts: string[] = [a.action];
  if (a.character) parts.push(a.character);
  else if (a.characters) parts.push(typeof a.characters === 'string' ? a.characters : a.characters.join('+'));
  else if (a.asset) parts.push(a.asset);
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
  const out: string[] = [];
  for (const step of v.steps) for (const a of step.parallel) out.push(formatAction(a));
  return out;
}

function pretty(id: string | undefined): string {
  if (!id) return '?';
  return id.replace(/_/g, ' ');
}

// ─── Character personality for dialogue suggestions ─────────────────────────

const CHAR_LINES: Record<string, Record<string, string[]>> = {
  skeleton_warrior: {
    excited: ["This is BONE-credible!", "My bones are rattling with excitement!", "SKULL-tastic!"],
    nervous: ["My knees are literally knocking!", "I can feel it in my bones..."],
    victory: ["No-BODY does it better!", "That was un-BONE-lievably cool!"],
  },
  knight: {
    excited: ["For glory!", "By my sword — incredible!", "A knight never gives up!"],
    nervous: ["This armor feels heavy...", "Perhaps I should have trained more..."],
    victory: ["Victory is ours!", "A noble triumph!"],
  },
  mage: {
    excited: ["My magic is TINGLING!", "Ooh — powerful energy here!", "Spell-tacular!"],
    nervous: ["My wand is sparking... that's not normal", "Too much magic!"],
    victory: ["Magic saves the day again!", "That was enchanting!"],
  },
  barbarian: {
    excited: ["BARBARIAN SMASH!", "RAAAAH! Let's GO!", "Strongest move EVER!"],
    nervous: ["Even barbarians get nervous...", "That looks... scary"],
    victory: ["VICTORY SMASH!", "Barbarian power wins AGAIN!"],
  },
  rogue: {
    excited: ["Nobody saw THAT coming!", "Sneaky and stylish!", "Quick fingers FTW!"],
    nervous: ["Stay in the shadows...", "Gotta be careful here..."],
    victory: ["Swiped the win!", "Too fast for you!"],
  },
  clown: {
    excited: ["HONK HONK! This is hilarious!", "Time for the big show!", "Comedy GOLD!"],
    nervous: ["My rubber chicken is sweating...", "Uh oh — pie incoming!"],
    victory: ["TA-DAAAA!", "The crowd goes wild!"],
  },
  skeleton_minion: {
    excited: ["Rattle rattle!", "Me too me too!"],
    victory: ["We did it boss!", "Bones for everyone!"],
  },
  ninja: {
    excited: ["Swift like the wind!", "Shadow strike ready!"],
    nervous: ["Even ninjas hesitate sometimes...", "Too exposed..."],
    victory: ["Silent but deadly!", "The way of the ninja!"],
  },
  robot: {
    excited: ["BEEP BOOP — engaging fun mode!", "Processing... excitement levels MAXIMUM!"],
    nervous: ["Error 404: confidence not found", "Systems overloading..."],
    victory: ["Mission accomplished!", "Optimal outcome achieved!"],
  },
  engineer: {
    excited: ["The calculations are perfect!", "Science is amazing!"],
    nervous: ["The readings are off the charts...", "This wasn't in the manual..."],
    victory: ["Engineering excellence!", "Blueprints to brilliance!"],
  },
  space_ranger: {
    excited: ["To infinity!", "Space ranger reporting for awesomeness!"],
    victory: ["Mission complete, space cadet!", "Stars and stripes forever!"],
  },
  ranger: {
    excited: ["Nature calls!", "Into the wild!"],
    victory: ["The forest provides!", "Ranger's honor!"],
  },
  druid: {
    excited: ["The earth speaks!", "Nature's power flows!"],
    victory: ["Balance is restored!", "The grove celebrates!"],
  },
};

function suggestLine(char: string, mood: string): string {
  const charLines = CHAR_LINES[char];
  if (!charLines) return `"Let's do this!"`;
  const moodLines = charLines[mood] || charLines['excited'] || ["Let's go!"];
  return moodLines[Math.floor(Math.random() * moodLines.length)];
}

// ─── Specific fix generator ─────────────────────────────────────────────────

function generateFixes(v: Vignette): string {
  const fixes: string[] = [];
  const allActions = v.steps.flatMap(s => s.parallel);
  const totalSteps = v.steps.length;
  const totalActions = allActions.length;

  // Track characters and their roles
  const spawnedChars = allActions.filter(a => a.action === 'spawn_character').map(a => a.character!);
  const uniqueChars = [...new Set(spawnedChars)];
  const emoteChars = new Set(allActions.filter(a => a.action === 'emote').map(a => a.character));
  const emoteCount = allActions.filter(a => a.action === 'emote').length;

  // ─── FIX 1: Silent characters need dialogue ────────────────────────────────
  const silentChars = uniqueChars.filter(c => !emoteChars.has(c));
  if (silentChars.length > 0 && totalActions > 5) {
    for (const char of silentChars) {
      const line = suggestLine(char, 'excited');
      fixes.push(`Add dialogue for ${pretty(char)}: { action: 'emote', character: '${char}', emoji: 'excited', text: '${line}' }`);
    }
  }

  // If no emotes at all and >10 actions, suggest specific dialogue for lead character
  if (emoteCount === 0 && totalActions > 10 && uniqueChars.length > 0) {
    const lead = uniqueChars[0];
    const openLine = suggestLine(lead, 'excited');
    const closeLine = suggestLine(lead, 'victory');
    fixes.push(`Scene is silent — add opening emote after ${pretty(lead)} enters: { emoji: 'excited', text: '${openLine}' }`);
    fixes.push(`Add closing emote before celebration: { character: '${lead}', emoji: 'star_eyes', text: '${closeLine}' }`);
  }

  // ─── FIX 2: Entrance bloat — group spawns ─────────────────────────────────
  const entranceSteps = spawnedChars.length * 3;
  const entrancePct = totalSteps > 0 ? (entranceSteps / totalSteps) * 100 : 0;
  if (entrancePct > 50 && spawnedChars.length > 3) {
    // Find which chars enter from same side
    const leftEntrants = allActions.filter(a => a.action === 'spawn_character' && a.position?.includes('left')).map(a => a.character!);
    const rightEntrants = allActions.filter(a => a.action === 'spawn_character' && a.position?.includes('right')).map(a => a.character!);

    if (leftEntrants.length >= 2) {
      fixes.push(`Replace ${leftEntrants.length} individual ENTER_FROM_LEFT calls for [${leftEntrants.map(pretty).join(', ')}] with single group step: { parallel: [${leftEntrants.map(c => `{ action: 'spawn_character', character: '${c}', position: 'off-left' }`).join(', ')}] } then one shared move step`);
    }
    if (rightEntrants.length >= 2) {
      fixes.push(`Replace ${rightEntrants.length} individual ENTER_FROM_RIGHT calls for [${rightEntrants.map(pretty).join(', ')}] with single group step`);
    }
    const saved = (spawnedChars.length - 2) * 2;  // save ~2 steps per grouped char
    fixes.push(`This saves ~${saved} steps (${Math.round(saved / totalSteps * 100)}% of vignette)`);
  }

  // ─── FIX 3: All from same side ────────────────────────────────────────────
  const spawnPositions = allActions.filter(a => a.action === 'spawn_character').map(a => a.position || '');
  const leftCount = spawnPositions.filter(p => p.includes('left')).length;
  const rightCount = spawnPositions.filter(p => p.includes('right')).length;
  if (spawnedChars.length >= 3 && (leftCount === 0 || rightCount === 0) && entrancePct <= 50) {
    const side = leftCount > 0 ? 'left' : 'right';
    const otherSide = side === 'left' ? 'right' : 'left';
    const charsToFlip = uniqueChars.slice(Math.ceil(uniqueChars.length / 2));
    fixes.push(`Move entrances for [${charsToFlip.map(pretty).join(', ')}] to ${otherSide} side — currently all ${spawnedChars.length} enter from ${side}`);
  }

  // ─── FIX 4: Consecutive duplicate steps ────────────────────────────────────
  for (let i = 1; i < v.steps.length; i++) {
    const prev = v.steps[i - 1].parallel.map(a => `${a.action}:${a.character || a.asset}:${a.anim || a.effect}`).sort().join('|');
    const curr = v.steps[i].parallel.map(a => `${a.action}:${a.character || a.asset}:${a.anim || a.effect}`).sort().join('|');
    if (prev === curr && prev !== '') {
      const desc = v.steps[i].parallel.map(a => `${a.action}:${pretty(a.character || a.asset)}`).join(' + ');
      fixes.push(`Remove duplicate step ${i + 1} (same as step ${i}): [${desc}]`);
    }
  }

  // ─── FIX 5: Excess Idle_A ─────────────────────────────────────────────────
  const idleSteps: number[] = [];
  for (let i = 0; i < v.steps.length; i++) {
    const step = v.steps[i];
    if (step.parallel.length === 1 && step.parallel[0].action === 'animate' && step.parallel[0].anim === 'Idle_A') {
      // Check if previous step was also idle or walking (=template ending)
      const prevStep = i > 0 ? v.steps[i - 1] : null;
      const prevIsMove = prevStep?.parallel.some(a => a.action === 'move');
      const prevIsEmote = prevStep?.parallel.some(a => a.action === 'emote');
      // Template-expected idles come right after move (entrance) or emote (speech)
      if (!prevIsMove && !prevIsEmote) {
        idleSteps.push(i + 1);
      }
    }
  }
  if (idleSteps.length > 2) {
    fixes.push(`Remove ${idleSteps.length} standalone Idle_A steps at positions [${idleSteps.join(', ')}] — these are outside entrance/speech templates and just show characters standing still`);
  }

  // ─── FIX 6: Waving before every emote ─────────────────────────────────────
  const wavingCount = allActions.filter(a => a.action === 'animate' && a.anim === 'Waving').length;
  if (wavingCount > 3 && wavingCount > emoteCount) {
    const alternatives = ['Interact', 'Pointing', 'cast_spell', 'Cheering', 'Jump'];
    fixes.push(`${wavingCount} Waving anims before dialogue — replace some with varied anims: ${alternatives.map((a, i) => `speech ${i + 1} → ${a}`).join(', ')}`);
  }

  // ─── FIX 7: Same effect at same position 3+ times ─────────────────────────
  const effectKeys = allActions.filter(a => a.action === 'react').map(a => `${a.effect}@${a.position}`);
  const effectCounts = new Map<string, number>();
  for (const k of effectKeys) effectCounts.set(k, (effectCounts.get(k) ?? 0) + 1);
  for (const [key, count] of effectCounts) {
    if (count >= 3) {
      const [effect, pos] = key.split('@');
      const alts = getAlternativeEffects(effect);
      fixes.push(`${effect} at ${pos || 'center'} fires ${count}x — replace occurrences 2+ with: ${alts.join(', ')}`);
    }
  }

  // ─── FIX 8: Cheer spam ────────────────────────────────────────────────────
  const cheerActions = allActions.filter(a => a.action === 'animate' && a.anim?.includes('Cheer'));
  const cheerByChar = new Map<string, number>();
  for (const a of cheerActions) cheerByChar.set(a.character!, (cheerByChar.get(a.character!) ?? 0) + 1);
  const multiCheerers = [...cheerByChar.entries()].filter(([, c]) => c >= 2);
  if (multiCheerers.length > 0) {
    const names = multiCheerers.map(([c, n]) => `${pretty(c)} (${n}x)`).join(', ');
    fixes.push(`Characters cheer multiple times: ${names} — keep only the final CELEBRATION call; remove earlier manual Cheering anims`);
  }

  // ─── FIX 9: Too many camera shakes ────────────────────────────────────────
  const shakeCount = allActions.filter(a => a.action === 'camera_shake').length;
  if (shakeCount > 3) {
    // Find which steps have shakes
    const shakeStepIdxs: number[] = [];
    for (let i = 0; i < v.steps.length; i++) {
      if (v.steps[i].parallel.some(a => a.action === 'camera_shake')) shakeStepIdxs.push(i + 1);
    }
    fixes.push(`${shakeCount} camera shakes at steps [${shakeStepIdxs.join(', ')}] — keep only the climax shake (step ${shakeStepIdxs[shakeStepIdxs.length - 2] || shakeStepIdxs[0]}); remove the rest`);
  }

  // ─── FIX 10: Mechanical bloat ratio ───────────────────────────────────────
  const narrativeCount = allActions.filter(a => ['emote', 'text_popup', 'spawn', 'grow', 'react'].includes(a.action)).length;
  const mechanicalCount = allActions.filter(a => ['animate', 'sfx', 'move', 'spawn_character'].includes(a.action)).length;
  if (totalActions > 30 && mechanicalCount > narrativeCount * 3) {
    const excess = mechanicalCount - (narrativeCount * 2);
    fixes.push(`Mechanical:story ratio is ${(mechanicalCount / Math.max(narrativeCount, 1)).toFixed(1)}:1 (target <2:1) — cut ~${excess} animate/move/sfx actions and add ~${Math.ceil(excess / 3)} emotes or react effects`);
  }

  // ─── FIX 11: Move to same position ────────────────────────────────────────
  const moveTargets = allActions.filter(a => a.action === 'move');
  const moveCounts = new Map<string, { count: number; char: string; pos: string }>();
  for (const m of moveTargets) {
    const key = `${m.character}→${m.to}`;
    if (!moveCounts.has(key)) moveCounts.set(key, { count: 0, char: m.character!, pos: m.to! });
    moveCounts.get(key)!.count++;
  }
  for (const [, info] of moveCounts) {
    if (info.count >= 3) {
      fixes.push(`${pretty(info.char)} walks to ${info.pos} ${info.count} times — keep first move; replace later ones with moves to different positions (cs-left, ds-right, etc.)`);
    }
  }

  // ─── FIX 12: No visual effects in long scene ─────────────────────────────
  const reactCount = allActions.filter(a => a.action === 'react').length;
  if (totalActions > 20 && reactCount === 0) {
    fixes.push(`No visual effects in ${totalActions}-action scene — add: { action: 'react', effect: 'sparkle-magic', position: 'cs-center' } at the climax and { action: 'react', effect: 'confetti-burst', position: 'cs-center' } at the end`);
  }

  // ─── FIX 13: No opening narrator ──────────────────────────────────────────
  const hasNarrator = allActions.some(a => a.action === 'text_popup');
  if (!hasNarrator && totalActions > 10) {
    fixes.push(`No narrator text — add opening: { action: 'text_popup', text: '${suggestNarrator(v)}', position: 'center' }`);
  }

  if (fixes.length === 0) return '';
  return fixes.join(' | ');
}

function getAlternativeEffects(effect: string): string[] {
  const map: Record<string, string[]> = {
    'sparkle-magic': ['glow-pulse', 'stars-spin', 'confetti-burst'],
    'fire': ['fire-sneeze', 'hot', 'dust'],
    'dust': ['smoke', 'steam', 'sparkle-magic'],
    'confetti-burst': ['celebrating', 'sparkle-magic', 'stars-spin'],
    'lightning-burst': ['sparkle-magic', 'glow-pulse', 'fire'],
    'smoke': ['dust', 'steam', 'sparkle-magic'],
    'celebrating': ['confetti-burst', 'hearts-float', 'stars-spin'],
  };
  return map[effect] || ['sparkle-magic', 'dust', 'confetti-burst'];
}

function suggestNarrator(v: Vignette): string {
  // Use the description field to generate a short narrator opening
  const desc = v.description;
  if (desc.length < 60) return desc;
  // Trim to first sentence
  const first = desc.split(/[.!?]/)[0];
  return first.length < 80 ? first + '!' : first.slice(0, 77) + '...';
}

// ─── Quality score ──────────────────────────────────────────────────────────

function computeScore(v: Vignette): string {
  const allActions = v.steps.flatMap(s => s.parallel);
  const totalActions = allActions.length;
  const totalSteps = v.steps.length;
  let highIssues = 0;
  let medIssues = 0;

  const spawnedChars = allActions.filter(a => a.action === 'spawn_character');
  const emoteCount = allActions.filter(a => a.action === 'emote').length;
  const idleCount = allActions.filter(a => a.action === 'animate' && a.anim === 'Idle_A').length;
  const expectedIdles = spawnedChars.length + emoteCount;
  const entranceSteps = spawnedChars.length * 3;
  const entrancePct = totalSteps > 0 ? (entranceSteps / totalSteps) * 100 : 0;
  const narrativeCount = allActions.filter(a => ['emote', 'text_popup', 'spawn', 'grow', 'react'].includes(a.action)).length;
  const mechanicalCount = allActions.filter(a => ['animate', 'sfx', 'move', 'spawn_character'].includes(a.action)).length;

  // Consecutive dupes
  let dupeSteps = 0;
  for (let i = 1; i < v.steps.length; i++) {
    const prev = v.steps[i - 1].parallel.map(a => `${a.action}:${a.character || a.asset}:${a.anim || a.effect}`).sort().join('|');
    const curr = v.steps[i].parallel.map(a => `${a.action}:${a.character || a.asset}:${a.anim || a.effect}`).sort().join('|');
    if (prev === curr && prev !== '') dupeSteps++;
  }

  if (emoteCount === 0 && totalActions > 5) highIssues++;
  if (entrancePct > 50 && spawnedChars.length > 3) highIssues++;
  if (dupeSteps > 0) highIssues++;
  if (totalActions > 30 && mechanicalCount > narrativeCount * 3) highIssues++;

  if (idleCount - expectedIdles > 2) medIssues++;
  const wavingCount = allActions.filter(a => a.action === 'animate' && a.anim === 'Waving').length;
  if (wavingCount > emoteCount + 1) medIssues++;
  const cheerCount = allActions.filter(a => a.action === 'animate' && a.anim?.includes('Cheer')).length;
  const uniqueCheerChars = new Set(allActions.filter(a => a.action === 'animate' && a.anim?.includes('Cheer')).map(a => a.character)).size;
  if (cheerCount > uniqueCheerChars + 2) medIssues++;

  const effectKeys = allActions.filter(a => a.action === 'react').map(a => `${a.effect}@${a.position}`);
  const effectCounts = new Map<string, number>();
  for (const k of effectKeys) effectCounts.set(k, (effectCounts.get(k) ?? 0) + 1);
  if ([...effectCounts.values()].some(c => c >= 3)) medIssues++;

  const moveTargets = allActions.filter(a => a.action === 'move').map(a => `${a.character}→${a.to}`);
  const moveCounts = new Map<string, number>();
  for (const m of moveTargets) moveCounts.set(m, (moveCounts.get(m) ?? 0) + 1);
  if ([...moveCounts.values()].some(c => c >= 3)) medIssues++;

  const reactCount = allActions.filter(a => a.action === 'react').length;
  if (totalActions > 20 && reactCount === 0) medIssues++;

  if (highIssues >= 2) return 'NEEDS_REWORK';
  if (highIssues === 1 || medIssues >= 3) return 'NEEDS_FIXES';
  if (medIssues >= 1) return 'MINOR_ISSUES';
  return 'GOOD';
}

// ─── Story summary (compact) ────────────────────────────────────────────────

function generateStorySummary(v: Vignette): string {
  const sentences: string[] = [];
  const chars = new Set<string>();
  const props = new Set<string>();
  for (const step of v.steps) {
    const beat = analyzeBeat(step, chars, props);
    if (beat) sentences.push(beat);
  }
  return sentences.length > 0 ? sentences.join(' ') : '(empty)';
}

function analyzeBeat(step: VignetteStep, chars: Set<string>, props: Set<string>): string | null {
  const actions = step.parallel;
  if (!actions.length) return null;
  const parts: string[] = [];

  const spawns = actions.filter(a => a.action === 'spawn');
  const charSpawns = actions.filter(a => a.action === 'spawn_character');
  const moves = actions.filter(a => a.action === 'move');
  const anims = actions.filter(a => a.action === 'animate');
  const emotes = actions.filter(a => a.action === 'emote');
  const reacts = actions.filter(a => a.action === 'react');
  const textPopups = actions.filter(a => a.action === 'text_popup');
  const cameraActions = actions.filter(a => a.action === 'camera_shake' || a.action === 'camera_zoom');
  const screenFlashes = actions.filter(a => a.action === 'screen_flash');
  const grows = actions.filter(a => a.action === 'grow');
  const crowdReacts = actions.filter(a => a.action === 'crowd_react');
  const delays = actions.filter(a => a.action === 'delay');

  for (const t of textPopups) { if (t.text) parts.push(`[${t.text}]`); }
  for (const c of charSpawns) {
    if (!chars.has(c.character!)) { chars.add(c.character!); parts.push(`${pretty(c.character)} enters.`); }
  }
  if (spawns.length > 0) {
    const names = spawns.map(s => pretty(s.asset)).filter(n => !props.has(n));
    spawns.forEach(s => { if (s.asset) props.add(pretty(s.asset)); });
    if (names.length >= 1 && names.length <= 3) parts.push(`${names.join(', ')} appear.`);
    else if (names.length > 3) parts.push(`${names.length} props appear.`);
  }
  for (const g of grows) parts.push(`${pretty(g.character || g.asset)} grows.`);
  for (const e of emotes) {
    if (e.text) parts.push(`${pretty(e.character)} (${e.emoji}): "${e.text}"`);
    else if (e.emoji) parts.push(`${pretty(e.character)} feels ${e.emoji}.`);
  }
  if (moves.length > 0) { parts.push(`${[...new Set(moves.map(m => pretty(m.character)))].join(' & ')} move.`); }
  const interesting = anims.filter(a => a.anim && !a.anim.startsWith('Idle') && !a.anim.startsWith('Walking') && !a.anim.startsWith('Running'));
  if (interesting.length > 0) {
    const grouped = new Map<string, string[]>();
    for (const a of interesting) {
      const key = a.anim!;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(pretty(a.character));
    }
    for (const [anim, chars] of grouped) {
      if (chars.length <= 2) parts.push(`${chars.join(' & ')} do ${anim.replace(/_/g, ' ')}.`);
      else parts.push(`Everyone does ${anim.replace(/_/g, ' ')}.`);
    }
  }
  if (reacts.length > 0) parts.push(`[FX: ${[...new Set(reacts.map(r => r.effect))].join(', ')}]`);
  if (cameraActions.length > 0) parts.push('[shake]');
  if (screenFlashes.length > 0) parts.push(`[flash ${screenFlashes[0].color}]`);
  if (crowdReacts.length > 0) parts.push('[crowd reacts]');
  if (delays.length > 0 && parts.length === 0) parts.push('[pause]');

  return parts.length > 0 ? parts.join(' ') : null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const MAX_ACTION_COLS = 100;

const rows: Array<{
  zone: string; stage: number; vignetteId: string; promptScore: string;
  description: string; storySummary: string; feedbackMessage: string;
  qualityScore: string; changesNeeded: string;
  actionCount: number; slots: string[]; actions: string[];
}> = [];

const tally = { GOOD: 0, MINOR_ISSUES: 0, NEEDS_FIXES: 0, NEEDS_REWORK: 0 };

for (const zoneConfig of ZONES) {
  for (const stageConfig of zoneConfig.stages) {
    const allVignettes = [...stageConfig.vignettes, stageConfig.defaultVignette];
    for (const v of allVignettes) {
      const actions = extractActions(v);
      const score = computeScore(v);
      const fixes = generateFixes(v);
      tally[score as keyof typeof tally]++;

      rows.push({
        zone: zoneConfig.zone,
        stage: stageConfig.stage,
        vignetteId: v.id,
        promptScore: v.promptScore,
        description: v.description,
        storySummary: generateStorySummary(v),
        feedbackMessage: v.feedback?.message || '',
        qualityScore: score,
        changesNeeded: fixes,
        actionCount: actions.length,
        slots: Object.values(v.trigger),
        actions,
      });
    }
  }
}

const maxSlots = Math.max(...rows.map(r => r.slots.length));

const headers = [
  'zone', 'stage', 'vignette_id', 'prompt_score', 'action_count',
  'quality_score', 'changes_needed',
  'description', 'story_summary', 'feedback_message',
  ...Array.from({ length: maxSlots }, (_, i) => `Slot${i + 1}`),
  ...Array.from({ length: MAX_ACTION_COLS }, (_, i) => `Action${i + 1}`),
];

function csvEscape(val: string): string {
  if (val.includes(',') || val.includes('"') || val.includes('\n')) return `"${val.replace(/"/g, '""')}"`;
  return val;
}

const csvLines = [headers.join(',')];
for (const row of rows) {
  const slotCells = Array.from({ length: maxSlots }, (_, i) => row.slots[i] ?? '');
  const actionCells = Array.from({ length: MAX_ACTION_COLS }, (_, i) => row.actions[i] ?? '');
  csvLines.push([
    row.zone, String(row.stage), row.vignetteId, row.promptScore, String(row.actionCount),
    row.qualityScore, row.changesNeeded,
    row.description, row.storySummary, row.feedbackMessage,
    ...slotCells, ...actionCells,
  ].map(csvEscape).join(','));
}

const outputPath = path.resolve(__dirname, '../docs/vignette-audit.csv');
fs.writeFileSync(outputPath, csvLines.join('\n') + '\n');

console.log(`Written ${rows.length} vignettes → ${outputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(0)} KB)\n`);
console.log('QUALITY:  GOOD=' + tally.GOOD + '  MINOR=' + tally.MINOR_ISSUES + '  FIXES=' + tally.NEEDS_FIXES + '  REWORK=' + tally.NEEDS_REWORK);

// Show 3 sample fixes
console.log('\n── SAMPLE FIXES ──');
for (const id of ['ks_everyone_launch', 'bs_everyone_tag', 'sb_fruit_dance']) {
  const r = rows.find(r => r.vignetteId === id);
  if (r) {
    console.log(`\n${r.vignetteId} [${r.qualityScore}]:`);
    for (const fix of r.changesNeeded.split(' | ')) console.log(`  → ${fix}`);
  }
}
