/**
 * fix-sb-positions.ts — Move table/food objects from cs-* to us-* in skeleton-birthday.
 *
 * Usage:
 *   npx tsx scripts/fix-sb-positions.ts          # dry run
 *   npx tsx scripts/fix-sb-positions.ts --apply   # apply changes
 *
 * Rules:
 * - Only moves TABLE_FOOD assets (not characters, decorations, effects)
 * - cs-center → us-center, cs-left → us-left, etc.
 * - Does NOT move assets already at us-* or ds-*
 * - Does NOT touch 'center', 'top', 'wide', or other special positions
 * - Also fixes OBJECT_GROW_REVEAL calls at cs-* for food items
 * - Fixes pie at ds-left → us-left (the one audit warning)
 */

import * as fs from 'fs';
import * as path from 'path';

const FILE = path.join(__dirname, '../frontend/src/data/vignettes/skeleton-birthday.ts');
const apply = process.argv.includes('--apply');

const TABLE_FOOD_ASSETS = new Set([
  'table_long', 'table', 'counter_table', 'pastry_stand', 'display_case',
  'cake_birthday', 'cake_chocolate', 'pizza', 'pie', 'pie_apple',
  'cupcake', 'muffin', 'donut_sprinkles', 'donut_chocolate', 'cookie',
  'cream_puff', 'pretzel', 'pancakes', 'bread', 'ice_cream',
  'macaron_blue', 'macaron_yellow',
]);

const CS_TO_US: Record<string, string> = {
  'cs-far-left': 'us-far-left',
  'cs-left': 'us-left',
  'cs-center': 'us-center',
  'cs-right': 'us-right',
  'cs-far-right': 'us-far-right',
};

// Also fix ds-* food to us-*
const DS_TO_US: Record<string, string> = {
  'ds-far-left': 'us-far-left',
  'ds-left': 'us-left',
  'ds-center': 'us-center',
  'ds-right': 'us-right',
  'ds-far-right': 'us-far-right',
};

const content = fs.readFileSync(FILE, 'utf-8');
const lines = content.split('\n');
let changeCount = 0;
const changes: string[] = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lineNum = i + 1;

  // Pattern 1: spawn action with asset and position
  const spawnMatch = line.match(/(action:\s*'spawn'.*?asset:\s*')([^']+)('.*?position:\s*')([^']+)(')/);
  if (spawnMatch) {
    const asset = spawnMatch[2];
    const position = spawnMatch[4];

    if (TABLE_FOOD_ASSETS.has(asset)) {
      const newPos = CS_TO_US[position] || DS_TO_US[position];
      if (newPos) {
        const oldLine = lines[i];
        lines[i] = line.replace(`position: '${position}'`, `position: '${newPos}'`);
        changeCount++;
        changes.push(`  L${lineNum}: spawn "${asset}" ${position} → ${newPos}`);
      }
    }
  }

  // Pattern 2: OBJECT_GROW_REVEAL('asset', 'position'...)
  const growMatch = line.match(/(OBJECT_GROW_REVEAL\(')([^']+)(',\s*')([^']+)(')/);
  if (growMatch) {
    const asset = growMatch[2];
    const position = growMatch[4];

    if (TABLE_FOOD_ASSETS.has(asset)) {
      const newPos = CS_TO_US[position] || DS_TO_US[position];
      if (newPos) {
        lines[i] = line.replace(`'${position}'`, `'${newPos}'`);
        changeCount++;
        changes.push(`  L${lineNum}: OBJECT_GROW_REVEAL("${asset}") ${position} → ${newPos}`);
      }
    }
  }
}

console.log('='.repeat(60));
console.log(`  SKELETON-BIRTHDAY POSITION FIX ${apply ? '(APPLYING)' : '(DRY RUN)'}`);
console.log('='.repeat(60));
console.log(`  Changes: ${changeCount}`);
console.log('');

for (const c of changes) {
  console.log(c);
}

if (apply && changeCount > 0) {
  fs.writeFileSync(FILE, lines.join('\n'), 'utf-8');
  console.log(`\n  Written to ${path.basename(FILE)}`);
} else if (!apply && changeCount > 0) {
  console.log(`\n  DRY RUN — use --apply to write changes`);
}

console.log('='.repeat(60));
