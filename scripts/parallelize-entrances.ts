#!/usr/bin/env npx tsx
/**
 * parallelize-entrances.ts
 *
 * Finds consecutive same-direction ENTER_FROM_LEFT/RIGHT calls in vignettes
 * and replaces them with GROUP_ENTER_LEFT/RIGHT calls.
 *
 * Before:
 *   ...ENTER_FROM_LEFT('knight', 'cs-left'),
 *   ...ENTER_FROM_LEFT('mage', 'ds-left'),
 *
 * After:
 *   ...GROUP_ENTER_LEFT([['knight', 'cs-left'], ['mage', 'ds-left']]),
 *
 * This saves (N-1)*3 expanded steps per group of N same-direction entrances.
 *
 * Usage: npx tsx scripts/parallelize-entrances.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const VIGNETTES_DIR = path.resolve(__dirname, '../frontend/src/data/vignettes');
const ZONE_FILES = [
  'skeleton-birthday.ts',
  'knight-space.ts',
  'mage-kitchen.ts',
  'barbarian-school.ts',
  'dungeon-concert.ts',
  'skeleton-pizza.ts',
  'adventurers-picnic.ts',
];

// Regex to match ENTER_FROM_LEFT/RIGHT with arguments
const ENTER_LEFT_RE = /^\s*\.\.\.ENTER_FROM_LEFT\(\s*'([^']+)'(?:\s*,\s*'([^']+)')?\s*\)\s*,?\s*$/;
const ENTER_RIGHT_RE = /^\s*\.\.\.ENTER_FROM_RIGHT\(\s*'([^']+)'(?:\s*,\s*'([^']+)')?\s*\)\s*,?\s*$/;

interface EntranceCall {
  line: number;
  direction: 'left' | 'right';
  character: string;
  targetPos: string;
}

function processFile(fileName: string): number {
  const filePath = path.join(VIGNETTES_DIR, fileName);
  let source = fs.readFileSync(filePath, 'utf8');
  const lines = source.split('\n');

  // Find all entrance calls at any position
  const entrances: EntranceCall[] = [];
  for (let i = 0; i < lines.length; i++) {
    const leftMatch = lines[i].match(ENTER_LEFT_RE);
    if (leftMatch) {
      entrances.push({
        line: i,
        direction: 'left',
        character: leftMatch[1],
        targetPos: leftMatch[2] || 'cs-left',
      });
      continue;
    }
    const rightMatch = lines[i].match(ENTER_RIGHT_RE);
    if (rightMatch) {
      entrances.push({
        line: i,
        direction: 'right',
        character: rightMatch[1],
        targetPos: rightMatch[2] || 'cs-right',
      });
    }
  }

  // Group consecutive same-direction entrances
  interface EntranceGroup {
    direction: 'left' | 'right';
    entries: EntranceCall[];
    startLine: number;
    endLine: number;
  }

  const groups: EntranceGroup[] = [];
  let currentGroup: EntranceCall[] = [];

  for (let i = 0; i < entrances.length; i++) {
    if (currentGroup.length === 0) {
      currentGroup.push(entrances[i]);
    } else {
      const prev = currentGroup[currentGroup.length - 1];
      // Consecutive: same direction, adjacent lines (allow 1 blank/comment line between)
      if (
        entrances[i].direction === prev.direction &&
        entrances[i].line - prev.line <= 2
      ) {
        currentGroup.push(entrances[i]);
      } else {
        if (currentGroup.length >= 2) {
          groups.push({
            direction: currentGroup[0].direction,
            entries: [...currentGroup],
            startLine: currentGroup[0].line,
            endLine: currentGroup[currentGroup.length - 1].line,
          });
        }
        currentGroup = [entrances[i]];
      }
    }
  }
  // Flush last group
  if (currentGroup.length >= 2) {
    groups.push({
      direction: currentGroup[0].direction,
      entries: [...currentGroup],
      startLine: currentGroup[0].line,
      endLine: currentGroup[currentGroup.length - 1].line,
    });
  }

  if (groups.length === 0) return 0;

  // Build replacement lines for each group
  // Process in reverse to preserve line numbers
  let totalReplacements = 0;

  for (const group of groups.reverse()) {
    const templateName = group.direction === 'left' ? 'GROUP_ENTER_LEFT' : 'GROUP_ENTER_RIGHT';
    const indent = lines[group.startLine].match(/^(\s*)/)?.[1] || '    ';

    // Build the GROUP_ENTER call
    const charEntries = group.entries.map(e => {
      const defaultPos = group.direction === 'left' ? 'cs-left' : 'cs-right';
      if (e.targetPos === defaultPos) {
        return `['${e.character}']`;
      }
      return `['${e.character}', '${e.targetPos}']`;
    });

    const replacement = `${indent}...${templateName}([${charEntries.join(', ')}]),`;

    // Replace the range of lines with the single GROUP_ENTER line
    const rangeStart = group.startLine;
    const rangeEnd = group.endLine;
    const removeCount = rangeEnd - rangeStart + 1;

    lines.splice(rangeStart, removeCount, replacement);
    totalReplacements++;
  }

  // Ensure GROUP_ENTER imports exist
  const hasGroupLeft = lines.some(l => l.includes('GROUP_ENTER_LEFT'));
  const hasGroupRight = lines.some(l => l.includes('GROUP_ENTER_RIGHT'));
  const needsImport = (hasGroupLeft || hasGroupRight);

  if (needsImport) {
    // Check if already imported
    const importLine = lines.findIndex(l => l.includes("from '../movement-templates'") || l.includes("from '../../data/movement-templates'") || l.includes("from '../movement-templates'"));
    if (importLine >= 0) {
      const importText = lines[importLine];
      if (hasGroupLeft && !importText.includes('GROUP_ENTER_LEFT')) {
        // Add GROUP_ENTER_LEFT to the import
        lines[importLine] = importText.replace(
          /}\s*from/,
          'GROUP_ENTER_LEFT, } from'
        );
      }
      // Re-read the line in case it changed
      if (hasGroupRight && !lines[importLine].includes('GROUP_ENTER_RIGHT')) {
        lines[importLine] = lines[importLine].replace(
          /}\s*from/,
          'GROUP_ENTER_RIGHT, } from'
        );
      }
    } else {
      // Find the import block (search for movement-templates import across multiple lines)
      for (let i = 0; i < Math.min(30, lines.length); i++) {
        if (lines[i].includes('movement-templates')) {
          // Multi-line import — find the closing `} from`
          let endImport = i;
          for (let j = i; j < Math.min(i + 20, lines.length); j++) {
            if (lines[j].includes("from '")) {
              endImport = j;
              break;
            }
          }

          if (hasGroupLeft && !lines.slice(i, endImport + 1).join(' ').includes('GROUP_ENTER_LEFT')) {
            lines[endImport] = lines[endImport].replace(
              /}\s*from/,
              '  GROUP_ENTER_LEFT,\n} from'
            );
          }
          if (hasGroupRight && !lines.slice(i, endImport + 1).join(' ').includes('GROUP_ENTER_RIGHT')) {
            const curLine = lines[endImport];
            lines[endImport] = curLine.replace(
              /}\s*from/,
              '  GROUP_ENTER_RIGHT,\n} from'
            );
          }
          break;
        }
      }
    }
  }

  fs.writeFileSync(filePath, lines.join('\n'));

  const stepsSaved = groups.reduce((sum, g) => sum + (g.entries.length - 1) * 3, 0);
  console.log(`── ${fileName}: ${totalReplacements} groups parallelized (${stepsSaved} expanded steps saved)`);
  for (const g of groups.reverse()) {
    const chars = g.entries.map(e => e.character).join(', ');
    console.log(`  ${g.direction}: [${chars}] → GROUP_ENTER_${g.direction.toUpperCase()}`);
  }

  return totalReplacements;
}

function main() {
  console.log('Parallelizing consecutive entrance calls...\n');

  let total = 0;
  for (const fileName of ZONE_FILES) {
    total += processFile(fileName);
  }

  console.log(`\n✅ ${total} entrance groups parallelized`);
}

main();
