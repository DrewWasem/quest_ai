#!/usr/bin/env npx tsx
/**
 * apply-structural-fixes.ts
 *
 * Applies structural fixes to vignette source files:
 * 1. Remove CROWD_CHEER after CELEBRATION (redundant)
 * 2. Remove standalone raw Cheering blocks before CELEBRATION
 * 3. Remove standalone Idle_A blocks (not part of entrance/speak templates)
 * 4. Remove duplicate consecutive template calls
 * 5. Remove excess camera_shake (keep only climax shake)
 *
 * Usage: npx tsx scripts/apply-structural-fixes.ts [--dry-run]
 */

import * as fs from 'fs';
import * as path from 'path';

const VIGNETTES_DIR = path.resolve(__dirname, '../frontend/src/data/vignettes');
const DRY_RUN = process.argv.includes('--dry-run');

const ZONE_FILES = [
  'skeleton-birthday.ts',
  'knight-space.ts',
  'mage-kitchen.ts',
  'barbarian-school.ts',
  'dungeon-concert.ts',
  'skeleton-pizza.ts',
  'adventurers-picnic.ts',
];

interface RemovalResult {
  file: string;
  crowdCheerRemoved: number;
  cheerBlocksRemoved: number;
  idleBlocksRemoved: number;
  duplicatesRemoved: number;
  cameraShakeRemoved: number;
}

// ── Bracket Depth Tracking ───────────────────────────────────────────────────

/**
 * Track bracket depth ([ and ]) from a given starting line.
 * Returns the depth at the END of the target line.
 */
function bracketDepthAt(lines: string[], fromLine: number, toLine: number): number {
  let depth = 0;
  for (let i = fromLine; i <= toLine; i++) {
    for (const ch of lines[i]) {
      if (ch === '[') depth++;
      if (ch === ']') depth--;
    }
  }
  return depth;
}

/**
 * Find the `steps: [` line for a vignette starting at or after `startLine`.
 * Returns the line number or -1.
 */
function findStepsOpen(lines: string[], startLine: number, maxLine: number): number {
  for (let i = startLine; i <= maxLine; i++) {
    if (/^\s*steps:\s*\[/.test(lines[i])) return i;
  }
  return -1;
}

/**
 * Find the matching `],` for the `steps: [` at stepsOpenLine.
 */
function findStepsClose(lines: string[], stepsOpenLine: number, maxLine: number): number {
  let depth = 0;
  for (let i = stepsOpenLine; i <= maxLine; i++) {
    for (const ch of lines[i]) {
      if (ch === '[') depth++;
      if (ch === ']') depth--;
    }
    if (depth === 0) return i;
  }
  return maxLine;
}

/**
 * Check if line `targetLine` is at the steps array level (depth=1 from steps opening).
 */
function isStepsLevel(lines: string[], stepsOpenLine: number, targetLine: number): boolean {
  let depth = 0;
  for (let i = stepsOpenLine; i < targetLine; i++) {
    for (const ch of lines[i]) {
      if (ch === '[') depth++;
      if (ch === ']') depth--;
    }
  }
  // At the start of targetLine, we should be at depth 1 (inside steps array)
  return depth === 1;
}

// ── Vignette Finding ─────────────────────────────────────────────────────────

interface VignetteLoc {
  id: string;
  idLine: number;
  stepsOpen: number;
  stepsClose: number;
}

function findAllVignettes(lines: string[]): VignetteLoc[] {
  const vignettes: VignetteLoc[] = [];
  const idRegex = /id:\s*'([^']+)'/;

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(idRegex);
    if (!match) continue;

    const id = match[1];
    const maxSearch = Math.min(i + 200, lines.length - 1);
    const stepsOpen = findStepsOpen(lines, i, maxSearch);
    if (stepsOpen === -1) continue;

    const stepsClose = findStepsClose(lines, stepsOpen, Math.min(stepsOpen + 500, lines.length - 1));
    vignettes.push({ id, idLine: i, stepsOpen, stepsClose });
  }

  return vignettes;
}

// ── Fix 1: Remove CROWD_CHEER after CELEBRATION ─────────────────────────────

function removeCrowdCheerAfterCelebration(lines: string[], v: VignetteLoc): number {
  let removed = 0;
  const toRemove: number[] = [];

  for (let i = v.stepsOpen + 1; i < v.stepsClose; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed.startsWith('...CROWD_CHEER(')) continue;
    if (!isStepsLevel(lines, v.stepsOpen, i)) continue;

    // Check if there's a CELEBRATION before this CROWD_CHEER
    let hasCelebrationBefore = false;
    for (let j = i - 1; j > v.stepsOpen; j--) {
      const prevTrimmed = lines[j].trim();
      if (prevTrimmed.startsWith('...CELEBRATION(') && isStepsLevel(lines, v.stepsOpen, j)) {
        hasCelebrationBefore = true;
        break;
      }
      // Stop searching if we hit a significant non-comment line
      if (prevTrimmed && !prevTrimmed.startsWith('//') && !prevTrimmed.startsWith('...CHARACTER_SPEAK')) break;
    }

    if (hasCelebrationBefore) {
      toRemove.push(i);
    }
  }

  // Remove in reverse order
  for (const lineNum of toRemove.reverse()) {
    lines.splice(lineNum, 1);
    removed++;
    // Adjust stepsClose
    v.stepsClose--;
  }

  return removed;
}

// ── Fix 2: Remove standalone Cheering blocks before CELEBRATION ──────────────

/**
 * Find raw { parallel: [...] } blocks at the steps level that contain
 * ONLY Cheering animations (+ optional sfx/react), and where a CELEBRATION
 * exists later in the same vignette. Remove them.
 */
function removeCheerBlocks(lines: string[], v: VignetteLoc): number {
  let removed = 0;

  // First, check if there's a CELEBRATION in this vignette
  let hasCelebration = false;
  for (let i = v.stepsOpen + 1; i < v.stepsClose; i++) {
    if (lines[i].trim().startsWith('...CELEBRATION(') && isStepsLevel(lines, v.stepsOpen, i)) {
      hasCelebration = true;
      break;
    }
  }
  if (!hasCelebration) return 0;

  // Find raw { parallel: [...] } blocks at steps level
  const blocksToRemove: [number, number][] = [];

  for (let i = v.stepsOpen + 1; i < v.stepsClose; i++) {
    const trimmed = lines[i].trim();

    // Look for opening of a raw parallel block: `{` or `{ parallel: [`
    if (!(trimmed === '{' || trimmed.startsWith('{ parallel:')) ) continue;
    if (!isStepsLevel(lines, v.stepsOpen, i)) continue;

    // Find the end of this block (matching `},`)
    let depth = 0;
    let blockEnd = i;
    for (let j = i; j < v.stepsClose; j++) {
      for (const ch of lines[j]) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
      }
      if (depth === 0) {
        blockEnd = j;
        break;
      }
    }

    // Extract block content
    const blockLines = lines.slice(i, blockEnd + 1);
    const blockText = blockLines.join('\n');

    // Check if this block is ALL Cheering animations (+ optional sfx/react/confetti)
    const hasAnimateCheering = /anim:\s*'Cheering'/.test(blockText);
    if (!hasAnimateCheering) continue;

    // Check that EVERY animate action is Cheering
    const animateMatches = blockText.match(/anim:\s*'([^']+)'/g) || [];
    const allCheering = animateMatches.every(m => m.includes("'Cheering'"));
    if (!allCheering) continue;

    // Ensure this is BEFORE the CELEBRATION (not after)
    let celebrationLine = v.stepsClose;
    for (let j = v.stepsOpen + 1; j < v.stepsClose; j++) {
      if (lines[j].trim().startsWith('...CELEBRATION(') && isStepsLevel(lines, v.stepsOpen, j)) {
        celebrationLine = j;
        break;
      }
    }
    if (i >= celebrationLine) continue;

    // This is a redundant Cheering block — mark for removal
    blocksToRemove.push([i, blockEnd]);
  }

  // Remove in reverse order to preserve line numbers
  for (const [start, end] of blocksToRemove.reverse()) {
    const count = end - start + 1;
    lines.splice(start, count);
    removed += count;
    v.stepsClose -= count;
  }

  return blocksToRemove.length;
}

// ── Fix 3: Remove standalone Idle_A blocks ───────────────────────────────────

/**
 * Remove raw { parallel: [{ action: 'animate', character: 'X', anim: 'Idle_A' }] }
 * blocks that are at the steps level and only contain an Idle_A animation.
 * These are NOT part of entrance or speech templates (those are inside spreads).
 */
function removeStandaloneIdleA(lines: string[], v: VignetteLoc): number {
  let removed = 0;
  const blocksToRemove: [number, number][] = [];

  for (let i = v.stepsOpen + 1; i < v.stepsClose; i++) {
    const trimmed = lines[i].trim();
    if (!(trimmed === '{' || trimmed.startsWith('{ parallel:'))) continue;
    if (!isStepsLevel(lines, v.stepsOpen, i)) continue;

    // Find block end
    let depth = 0;
    let blockEnd = i;
    for (let j = i; j < v.stepsClose; j++) {
      for (const ch of lines[j]) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
      }
      if (depth === 0) {
        blockEnd = j;
        break;
      }
    }

    // Check if this block contains ONLY Idle_A animate actions
    const blockText = lines.slice(i, blockEnd + 1).join('\n');
    const animateMatches = blockText.match(/anim:\s*'([^']+)'/g) || [];
    if (animateMatches.length === 0) continue;

    const allIdleA = animateMatches.every(m => m.includes("'Idle_A'"));
    if (!allIdleA) continue;

    // Make sure there are no other significant actions (emote, react, text_popup, etc.)
    const hasOtherActions = /action:\s*'(?:emote|react|text_popup|spawn|move|camera_shake|screen_flash)'/.test(blockText);
    if (hasOtherActions) continue;

    blocksToRemove.push([i, blockEnd]);
  }

  // Remove in reverse
  for (const [start, end] of blocksToRemove.reverse()) {
    const count = end - start + 1;
    lines.splice(start, count);
    removed += count;
    v.stepsClose -= count;
  }

  return blocksToRemove.length;
}

// ── Fix 4: Remove duplicate consecutive template spreads ─────────────────────

function removeDuplicateTemplates(lines: string[], v: VignetteLoc): number {
  let removed = 0;
  const toRemove: number[] = [];

  let prevSpreadLine = '';
  let prevSpreadIdx = -1;

  for (let i = v.stepsOpen + 1; i < v.stepsClose; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed.startsWith('...')) continue;
    if (!isStepsLevel(lines, v.stepsOpen, i)) continue;

    // Compare with previous spread line
    if (trimmed === prevSpreadLine && prevSpreadIdx >= 0) {
      toRemove.push(i);
    }

    prevSpreadLine = trimmed;
    prevSpreadIdx = i;
  }

  for (const lineNum of toRemove.reverse()) {
    lines.splice(lineNum, 1);
    removed++;
    v.stepsClose--;
  }

  return removed;
}

// ── Fix 5: Remove excess camera_shake ────────────────────────────────────────

/**
 * Find sequences of 3+ raw parallel blocks that all contain camera_shake.
 * Keep only the one with the highest intensity; remove the rest.
 */
function removeExcessCameraShake(lines: string[], v: VignetteLoc): number {
  let removed = 0;

  // Find all raw parallel blocks at steps level that contain camera_shake
  interface ShakeBlock {
    start: number;
    end: number;
    intensity: number;
  }

  const shakeBlocks: ShakeBlock[] = [];

  for (let i = v.stepsOpen + 1; i < v.stepsClose; i++) {
    const trimmed = lines[i].trim();
    if (!(trimmed === '{' || trimmed.startsWith('{ parallel:'))) continue;
    if (!isStepsLevel(lines, v.stepsOpen, i)) continue;

    let depth = 0;
    let blockEnd = i;
    for (let j = i; j < v.stepsClose; j++) {
      for (const ch of lines[j]) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
      }
      if (depth === 0) { blockEnd = j; break; }
    }

    const blockText = lines.slice(i, blockEnd + 1).join('\n');
    if (!/camera_shake/.test(blockText)) continue;

    // Extract intensity
    const intensityMatch = blockText.match(/intensity:\s*([\d.]+)/);
    const intensity = intensityMatch ? parseFloat(intensityMatch[1]) : 0;

    shakeBlocks.push({ start: i, end: blockEnd, intensity });
  }

  // Find runs of 3+ consecutive shake blocks (within 3 lines of each other)
  const runs: ShakeBlock[][] = [];
  let currentRun: ShakeBlock[] = [];

  for (let i = 0; i < shakeBlocks.length; i++) {
    if (currentRun.length === 0) {
      currentRun.push(shakeBlocks[i]);
    } else {
      const lastBlock = currentRun[currentRun.length - 1];
      // Consecutive if next block starts within 3 lines of previous block's end
      if (shakeBlocks[i].start - lastBlock.end <= 3) {
        currentRun.push(shakeBlocks[i]);
      } else {
        if (currentRun.length >= 3) runs.push([...currentRun]);
        currentRun = [shakeBlocks[i]];
      }
    }
  }
  if (currentRun.length >= 3) runs.push([...currentRun]);

  // For each run, keep the highest intensity block, remove the rest
  const blocksToRemove: [number, number][] = [];
  for (const run of runs) {
    const maxIntensity = Math.max(...run.map(b => b.intensity));
    const keepIdx = run.findIndex(b => b.intensity === maxIntensity);
    for (let i = 0; i < run.length; i++) {
      if (i !== keepIdx) {
        blocksToRemove.push([run[i].start, run[i].end]);
      }
    }
  }

  // Remove in reverse
  for (const [start, end] of blocksToRemove.sort((a, b) => b[0] - a[0])) {
    const count = end - start + 1;
    lines.splice(start, count);
    removed += count;
    v.stepsClose -= count;
  }

  return blocksToRemove.length;
}

// ── Main ─────────────────────────────────────────────────────────────────────

function processFile(fileName: string): RemovalResult {
  const filePath = path.join(VIGNETTES_DIR, fileName);
  const source = fs.readFileSync(filePath, 'utf8');
  const lines = source.split('\n');

  const vignettes = findAllVignettes(lines);
  const result: RemovalResult = {
    file: fileName,
    crowdCheerRemoved: 0,
    cheerBlocksRemoved: 0,
    idleBlocksRemoved: 0,
    duplicatesRemoved: 0,
    cameraShakeRemoved: 0,
  };

  // Process vignettes in REVERSE order to preserve line numbers
  for (const v of [...vignettes].reverse()) {
    result.cameraShakeRemoved += removeExcessCameraShake(lines, v);
    result.duplicatesRemoved += removeDuplicateTemplates(lines, v);
    result.idleBlocksRemoved += removeStandaloneIdleA(lines, v);
    result.cheerBlocksRemoved += removeCheerBlocks(lines, v);
    result.crowdCheerRemoved += removeCrowdCheerAfterCelebration(lines, v);
  }

  const totalChanges =
    result.crowdCheerRemoved +
    result.cheerBlocksRemoved +
    result.idleBlocksRemoved +
    result.duplicatesRemoved +
    result.cameraShakeRemoved;

  if (totalChanges > 0 && !DRY_RUN) {
    fs.writeFileSync(filePath, lines.join('\n'));
  }

  return result;
}

function main() {
  console.log(`Structural fixes ${DRY_RUN ? '(DRY RUN)' : ''}\n`);

  let totalCrowdCheer = 0;
  let totalCheerBlocks = 0;
  let totalIdle = 0;
  let totalDuplicates = 0;
  let totalCameraShake = 0;

  for (const fileName of ZONE_FILES) {
    const result = processFile(fileName);
    const total =
      result.crowdCheerRemoved +
      result.cheerBlocksRemoved +
      result.idleBlocksRemoved +
      result.duplicatesRemoved +
      result.cameraShakeRemoved;

    if (total > 0) {
      console.log(`── ${result.file} ──`);
      if (result.crowdCheerRemoved > 0) console.log(`  CROWD_CHEER after CELEBRATION: -${result.crowdCheerRemoved}`);
      if (result.cheerBlocksRemoved > 0) console.log(`  Standalone Cheering blocks: -${result.cheerBlocksRemoved}`);
      if (result.idleBlocksRemoved > 0) console.log(`  Standalone Idle_A blocks: -${result.idleBlocksRemoved}`);
      if (result.duplicatesRemoved > 0) console.log(`  Duplicate template spreads: -${result.duplicatesRemoved}`);
      if (result.cameraShakeRemoved > 0) console.log(`  Excess camera shakes: -${result.cameraShakeRemoved}`);
      console.log('');
    } else {
      console.log(`── ${result.file} ── (no structural fixes needed)`);
    }

    totalCrowdCheer += result.crowdCheerRemoved;
    totalCheerBlocks += result.cheerBlocksRemoved;
    totalIdle += result.idleBlocksRemoved;
    totalDuplicates += result.duplicatesRemoved;
    totalCameraShake += result.cameraShakeRemoved;
  }

  const grandTotal = totalCrowdCheer + totalCheerBlocks + totalIdle + totalDuplicates + totalCameraShake;
  console.log(`\n✅ Total structural fixes: ${grandTotal}`);
  console.log(`  CROWD_CHEER removed: ${totalCrowdCheer}`);
  console.log(`  Cheering blocks removed: ${totalCheerBlocks}`);
  console.log(`  Idle_A blocks removed: ${totalIdle}`);
  console.log(`  Duplicate templates removed: ${totalDuplicates}`);
  console.log(`  Camera shake runs removed: ${totalCameraShake}`);
}

main();
