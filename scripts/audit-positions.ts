/**
 * audit-positions.ts — Analyze vignette positioning for character/object overlap issues.
 *
 * Usage:
 *   npx tsx scripts/audit-positions.ts [zone-name]
 *
 * Checks:
 * 1. Characters and objects at the same position (potential overlap)
 * 2. Objects in downstage (ds-*) where they block characters
 * 3. Characters in upstage (us-*) where they're hidden behind objects
 *
 * Rules:
 * - Objects CAN layer with other objects (tables + food = fine)
 * - Characters CANNOT overlap with other characters
 * - Objects in ds-* positions will block character view
 */

import * as fs from 'fs';
import * as path from 'path';

const VIGNETTE_DIR = path.join(__dirname, '../frontend/src/data/vignettes');

// Known food/table/prop assets that should be upstage or center, not downstage
const TABLE_FOOD_ASSETS = new Set([
  'table_long', 'table', 'counter_table', 'pastry_stand', 'display_case',
  'cake_birthday', 'cake_chocolate', 'pizza', 'pie', 'pie_apple',
  'cupcake', 'muffin', 'donut_sprinkles', 'donut_chocolate', 'cookie',
  'cream_puff', 'pretzel', 'pancakes', 'bread', 'ice_cream',
  'macaron_blue', 'macaron_yellow', 'present', 'present_A_red', 'present_B_blue',
]);

// Position zones
const DS_POSITIONS = ['ds-far-left', 'ds-left', 'ds-center', 'ds-right', 'ds-far-right'];
const CS_POSITIONS = ['cs-far-left', 'cs-left', 'cs-center', 'cs-right', 'cs-far-right'];
const US_POSITIONS = ['us-far-left', 'us-left', 'us-center', 'us-right', 'us-far-right'];

interface PositionIssue {
  file: string;
  line: number;
  vignetteId: string;
  issue: string;
  severity: 'error' | 'warning' | 'info';
  detail: string;
}

function analyzeFile(filePath: string): PositionIssue[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const fileName = path.basename(filePath);
  const issues: PositionIssue[] = [];

  let currentVignetteId = '';
  // Track spawned positions per vignette
  const characterPositions: Map<string, { pos: string; line: number }> = new Map();
  const objectPositions: Map<string, { pos: string; line: number; asset: string }> = new Map();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Track vignette ID
    const idMatch = line.match(/id:\s*'([^']+)'/);
    if (idMatch) {
      currentVignetteId = idMatch[1];
      characterPositions.clear();
      objectPositions.clear();
    }

    // Check spawn actions
    const spawnMatch = line.match(/action:\s*'spawn'.*?asset:\s*'([^']+)'.*?position:\s*'([^']+)'/);
    if (spawnMatch) {
      const [, asset, position] = spawnMatch;
      const isTableFood = TABLE_FOOD_ASSETS.has(asset);

      if (isTableFood) {
        // Food/table in downstage = blocks characters
        if (DS_POSITIONS.includes(position)) {
          issues.push({
            file: fileName, line: lineNum, vignetteId: currentVignetteId,
            issue: 'OBJECT_IN_DOWNSTAGE',
            severity: 'error',
            detail: `"${asset}" spawned at ${position} (downstage) — will block characters`,
          });
        }
        objectPositions.set(`${asset}-${lineNum}`, { pos: position, line: lineNum, asset });
      } else {
        // It's a character-like asset or decoration
        characterPositions.set(asset, { pos: position, line: lineNum });
      }
    }

    // Check OBJECT_GROW_REVEAL calls (these also spawn objects)
    const growMatch = line.match(/OBJECT_GROW_REVEAL\('([^']+)',\s*'([^']+)'/);
    if (growMatch) {
      const [, asset, position] = growMatch;

      if (DS_POSITIONS.includes(position)) {
        issues.push({
          file: fileName, line: lineNum, vignetteId: currentVignetteId,
          issue: 'GROW_REVEAL_IN_DOWNSTAGE',
          severity: 'warning',
          detail: `OBJECT_GROW_REVEAL("${asset}") at ${position} (downstage) — may block view`,
        });
      }
    }

    // Check character spawn/enter at same positions as objects
    const enterMatch = line.match(/(?:ENTER_FROM_LEFT|ENTER_FROM_RIGHT|CHARGE_IN_LEFT|CHARGE_IN_RIGHT|DROP_IN|TELEPORT_IN|SNEAK_IN_LEFT|BOUNCE_ENTRANCE|GROUP_ENTER_LEFT|GROUP_ENTER_RIGHT)\('([^']+)',\s*'([^']+)'/);
    if (enterMatch) {
      const [, character, position] = enterMatch;
      characterPositions.set(character, { pos: position, line: lineNum });

      // Check if any object is at the same position
      for (const [, obj] of objectPositions) {
        if (obj.pos === position) {
          issues.push({
            file: fileName, line: lineNum, vignetteId: currentVignetteId,
            issue: 'CHARACTER_OBJECT_OVERLAP',
            severity: 'error',
            detail: `Character "${character}" enters at ${position} where "${obj.asset}" is already spawned (line ${obj.line})`,
          });
        }
      }
    }
  }

  return issues;
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

const zoneFilter = process.argv[2];

const files = fs.readdirSync(VIGNETTE_DIR)
  .filter(f => f.endsWith('.ts') && !f.startsWith('index'))
  .filter(f => !zoneFilter || f.includes(zoneFilter));

let totalIssues = 0;
const allIssues: PositionIssue[] = [];

for (const file of files) {
  const issues = analyzeFile(path.join(VIGNETTE_DIR, file));
  allIssues.push(...issues);
  totalIssues += issues.length;
}

// ─── REPORT ──────────────────────────────────────────────────────────────────

console.log('='.repeat(70));
console.log('  VIGNETTE POSITION AUDIT');
console.log('='.repeat(70));
console.log(`  Files scanned: ${files.length}`);
console.log(`  Total issues:  ${totalIssues}`);
console.log('='.repeat(70));

if (allIssues.length === 0) {
  console.log('\n  No positioning issues found.\n');
  process.exit(0);
}

// Group by file
const byFile = new Map<string, PositionIssue[]>();
for (const issue of allIssues) {
  const list = byFile.get(issue.file) || [];
  list.push(issue);
  byFile.set(issue.file, list);
}

for (const [file, issues] of byFile) {
  console.log(`\n── ${file} (${issues.length} issues) ──`);
  for (const issue of issues) {
    const icon = issue.severity === 'error' ? 'X' : issue.severity === 'warning' ? '!' : 'i';
    console.log(`  [${icon}] L${issue.line} (${issue.vignetteId}): ${issue.issue}`);
    console.log(`      ${issue.detail}`);
  }
}

// Summary
const errors = allIssues.filter(i => i.severity === 'error').length;
const warnings = allIssues.filter(i => i.severity === 'warning').length;
console.log('\n' + '='.repeat(70));
console.log(`  SUMMARY: ${errors} errors, ${warnings} warnings`);
console.log('='.repeat(70));

process.exit(errors > 0 ? 1 : 0);
