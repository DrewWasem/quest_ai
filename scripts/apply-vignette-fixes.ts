#!/usr/bin/env npx tsx
/**
 * apply-vignette-fixes.ts
 *
 * Reads the vignette-audit.csv and applies fixes to the vignette source files.
 * Focus: Adding CHARACTER_SPEAK dialogue for silent characters (80% of fixes).
 *
 * Usage: npx tsx scripts/apply-vignette-fixes.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const CSV_PATH = path.resolve(__dirname, '../docs/vignette-audit.csv');
const VIGNETTES_DIR = path.resolve(__dirname, '../frontend/src/data/vignettes');

// Zone → source file mapping
const ZONE_FILES: Record<string, string> = {
  'skeleton-birthday': 'skeleton-birthday.ts',
  'knight-space': 'knight-space.ts',
  'mage-kitchen': 'mage-kitchen.ts',
  'barbarian-school': 'barbarian-school.ts',
  'dungeon-concert': 'dungeon-concert.ts',
  'skeleton-pizza': 'skeleton-pizza.ts',
  'adventurers-picnic': 'adventurers-picnic.ts',
};

// ── CSV Parsing ──────────────────────────────────────────────────────────────

interface VignetteFix {
  zone: string;
  vignetteId: string;
  qualityScore: string;
  changesNeeded: string;
  dialogueFixes: DialogueFix[];
  openingEmote: EmoteFix | null;
  closingEmote: EmoteFix | null;
}

interface DialogueFix {
  character: string;
  emoji: string;
  text: string;
}

interface EmoteFix {
  character: string;
  emoji: string;
  text: string;
}

function parseCSV(csvText: string): string[][] {
  const lines = csvText.split('\n');
  const rows: string[][] = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const parts: string[] = [];
    let current = '';
    let inQuote = false;

    for (const char of line) {
      if (char === '"') { inQuote = !inQuote; continue; }
      if (char === ',' && !inQuote) { parts.push(current); current = ''; continue; }
      current += char;
    }
    parts.push(current);
    rows.push(parts);
  }

  return rows;
}

function extractDialogueFixes(changesNeeded: string): DialogueFix[] {
  const fixes: DialogueFix[] = [];
  const parts = changesNeeded.split(' | ');

  for (const part of parts) {
    // Match: "Add dialogue for X: { action: 'emote', character: 'Y', emoji: 'Z', text: 'T' }"
    const match = part.match(/Add dialogue for [^:]+:\s*\{[^}]*character:\s*'([^']+)',\s*emoji:\s*'([^']+)',\s*text:\s*'([^']*(?:\\.[^']*)*)'\s*\}/);
    if (match) {
      fixes.push({ character: match[1], emoji: match[2], text: match[3] });
    }
  }

  return fixes;
}

function extractOpeningEmote(changesNeeded: string): EmoteFix | null {
  const parts = changesNeeded.split(' | ');

  for (const part of parts) {
    // Match: "Scene is silent — add opening emote after X enters: { emoji: 'Y', text: 'T' }"
    const match = part.match(/add opening emote after\s+(\S+)\s+enters:\s*\{[^}]*emoji:\s*'([^']+)',\s*text:\s*'([^']*(?:\\.[^']*)*)'\s*\}/);
    if (match) {
      // The character name is in the "after X enters" part — convert display name to ID
      const charDisplay = match[1];
      return { character: charDisplay, emoji: match[2], text: match[3] };
    }
  }

  return null;
}

function extractClosingEmote(changesNeeded: string): EmoteFix | null {
  const parts = changesNeeded.split(' | ');

  for (const part of parts) {
    // Match: "Add closing emote before celebration: { character: 'X', emoji: 'Y', text: 'T' }"
    const match = part.match(/Add closing emote before celebration:\s*\{[^}]*character:\s*'([^']+)',\s*emoji:\s*'([^']+)',\s*text:\s*'([^']*(?:\\.[^']*)*)'\s*\}/);
    if (match) {
      return { character: match[1], emoji: match[2], text: match[3] };
    }
  }

  return null;
}

function loadFixes(): VignetteFix[] {
  const csv = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = parseCSV(csv);
  const headers = rows[0];

  const zoneIdx = headers.indexOf('zone');
  const idIdx = headers.indexOf('vignette_id');
  const scoreIdx = headers.indexOf('quality_score');
  const changesIdx = headers.indexOf('changes_needed');

  const fixes: VignetteFix[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const score = row[scoreIdx];
    if (score !== 'NEEDS_FIXES' && score !== 'NEEDS_REWORK') continue;

    const changesNeeded = row[changesIdx] || '';
    const dialogueFixes = extractDialogueFixes(changesNeeded);
    const openingEmote = extractOpeningEmote(changesNeeded);
    const closingEmote = extractClosingEmote(changesNeeded);

    // Only include if there's something to fix (dialogue-wise)
    if (dialogueFixes.length > 0 || openingEmote || closingEmote) {
      fixes.push({
        zone: row[zoneIdx],
        vignetteId: row[idIdx],
        qualityScore: score,
        changesNeeded,
        dialogueFixes,
        openingEmote,
        closingEmote,
      });
    }
  }

  return fixes;
}

// ── Source File Manipulation ─────────────────────────────────────────────────

function escapeForTS(text: string): string {
  // Escape single quotes and backslashes for TypeScript string literals
  return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function buildCharacterSpeakLine(fix: DialogueFix | EmoteFix): string {
  const char = fix.character;
  const emoji = fix.emoji;
  const text = escapeForTS(fix.text);
  return `    ...CHARACTER_SPEAK('${char}', '${emoji}', '${text}'),`;
}

/**
 * Find the line range of a vignette in the source text.
 * Returns [startLine, endLine] (0-indexed, inclusive).
 */
function findVignetteBounds(lines: string[], vignetteId: string): [number, number] | null {
  // Find the line with id: 'vignetteId'
  const idPattern = new RegExp(`id:\\s*'${vignetteId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`);
  let startLine = -1;

  for (let i = 0; i < lines.length; i++) {
    if (idPattern.test(lines[i])) {
      startLine = i;
      break;
    }
  }

  if (startLine === -1) return null;

  // Search backward (max 5 lines) to find the opening `{` of this vignette object
  // Handles both array items (`  {`) and exports (`export const X: Vignette = {`)
  let braceStart = startLine;
  for (let i = startLine; i >= Math.max(0, startLine - 5); i--) {
    const trimmed = lines[i].trim();
    if (trimmed === '{' || trimmed.endsWith('= {') || trimmed.endsWith(': Vignette = {')) {
      braceStart = i;
      break;
    }
  }

  // Search forward to find the closing `},` of this vignette object
  // Track brace depth
  let depth = 0;
  let endLine = startLine;
  for (let i = braceStart; i < lines.length; i++) {
    const line = lines[i];
    for (const char of line) {
      if (char === '{') depth++;
      if (char === '}') depth--;
    }
    if (depth === 0) {
      endLine = i;
      break;
    }
  }

  return [braceStart, endLine];
}

/**
 * Find the steps array bounds within a vignette.
 * Returns [stepsOpenLine, stepsCloseLine] or null.
 */
function findStepsBounds(lines: string[], start: number, end: number): [number, number] | null {
  // Find `steps: [` line
  let stepsStart = -1;
  for (let i = start; i <= end; i++) {
    if (/^\s*steps:\s*\[/.test(lines[i])) {
      stepsStart = i;
      break;
    }
  }
  if (stepsStart === -1) return null;

  // Track bracket depth from the opening [ to find matching ]
  let depth = 0;
  for (let i = stepsStart; i <= end; i++) {
    for (const char of lines[i]) {
      if (char === '[') depth++;
      if (char === ']') depth--;
    }
    if (depth === 0) {
      return [stepsStart, i];
    }
  }
  return null;
}

/**
 * Check if a line is at the "steps array level" — i.e., directly inside
 * the steps array, not nested inside a { parallel: [...] } block.
 * We track [ ] depth from the steps opening.
 */
function isAtStepsLevel(lines: string[], stepsStart: number, targetLine: number): boolean {
  let depth = 0;
  for (let i = stepsStart; i <= targetLine; i++) {
    for (const char of lines[i]) {
      if (char === '[') depth++;
      if (char === ']') depth--;
    }
  }
  // depth=1 means we're inside the steps array (the [ from `steps: [`)
  // depth>1 means we're inside a nested array (parallel, etc.)
  return depth === 1;
}

/**
 * Find insertion point within a vignette for dialogue additions.
 * ONLY considers lines at the steps array level (not inside parallel blocks).
 * Priority: before ...CELEBRATION( > before last ...NARRATOR( > before steps closing ],
 */
function findInsertionPoint(lines: string[], start: number, end: number): number {
  const stepsBounds = findStepsBounds(lines, start, end);
  if (!stepsBounds) return end - 2; // fallback

  const [stepsStart, stepsEnd] = stepsBounds;

  let celebrationLine = -1;
  let lastNarratorLine = -1;
  let lastCrowdCheerLine = -1;

  for (let i = stepsStart + 1; i < stepsEnd; i++) {
    const trimmed = lines[i].trim();

    // Only consider template spread lines (start with ...)
    if (!trimmed.startsWith('...')) continue;

    // Verify this line is at the steps level (depth=1), not inside parallel
    if (!isAtStepsLevel(lines, stepsStart, i)) continue;

    if (trimmed.startsWith('...CELEBRATION(')) {
      celebrationLine = i;
    }
    if (trimmed.startsWith('...CROWD_CHEER(')) {
      lastCrowdCheerLine = i;
    }
    if (trimmed.startsWith('...NARRATOR(') && i > stepsStart + 5) {
      lastNarratorLine = i;
    }
  }

  // Before CELEBRATION
  if (celebrationLine !== -1) return celebrationLine;

  // Before CROWD_CHEER
  if (lastCrowdCheerLine !== -1) return lastCrowdCheerLine;

  // Before last NARRATOR (resolution beat)
  if (lastNarratorLine !== -1) return lastNarratorLine;

  // Before steps closing bracket
  return stepsEnd;
}

/**
 * Find the line after the first entrance in a vignette for opening emotes.
 * Looks for ENTER_FROM_LEFT, ENTER_FROM_RIGHT, DROP_IN, CHARGE_IN patterns.
 * ONLY considers lines at the steps array level.
 */
function findFirstEntranceLine(lines: string[], start: number, end: number): number | null {
  const stepsBounds = findStepsBounds(lines, start, end);
  if (!stepsBounds) return null;

  const [stepsStart, stepsEnd] = stepsBounds;

  for (let i = stepsStart + 1; i < stepsEnd; i++) {
    const trimmed = lines[i].trim();
    if (
      trimmed.startsWith('...ENTER_FROM_LEFT(') ||
      trimmed.startsWith('...ENTER_FROM_RIGHT(') ||
      trimmed.startsWith('...DROP_IN(') ||
      trimmed.startsWith('...CHARGE_IN_LEFT(') ||
      trimmed.startsWith('...CHARGE_IN_RIGHT(')
    ) {
      // Verify at steps level
      if (isAtStepsLevel(lines, stepsStart, i)) {
        return i + 1; // Insert AFTER this entrance line
      }
    }
  }
  return null;
}

/**
 * Check if a CHARACTER_SPEAK line already exists within a range for the given character.
 */
function hasDialogueForCharacter(lines: string[], start: number, end: number, character: string): boolean {
  const pattern = new RegExp(`CHARACTER_SPEAK\\s*\\(\\s*'${character}'`);
  for (let i = start; i <= end; i++) {
    if (pattern.test(lines[i])) return true;
  }
  return false;
}

/**
 * Check if CHARACTER_SPEAK is already imported in the file.
 */
function hasCharacterSpeakImport(source: string): boolean {
  return source.includes('CHARACTER_SPEAK');
}

function applyFixesToFile(filePath: string, fixes: VignetteFix[]): number {
  let source = fs.readFileSync(filePath, 'utf8');
  let lines = source.split('\n');
  let totalInsertions = 0;

  // Ensure CHARACTER_SPEAK is imported
  if (!hasCharacterSpeakImport(source)) {
    // Find the import from movement-templates and add CHARACTER_SPEAK
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('movement-templates')) {
        // Check if CHARACTER_SPEAK is in the import block
        let importEnd = i;
        while (importEnd < lines.length && !lines[importEnd].includes("from '")) {
          importEnd++;
        }
        // Add CHARACTER_SPEAK to the import
        const importBlock = lines.slice(i, importEnd + 1).join('\n');
        if (!importBlock.includes('CHARACTER_SPEAK')) {
          // Insert before the closing }
          for (let j = importEnd; j >= i; j--) {
            if (lines[j].includes('}')) {
              lines[j] = lines[j].replace('}', 'CHARACTER_SPEAK, }');
              break;
            }
          }
        }
        break;
      }
    }
  }

  // Process fixes in reverse order (to preserve line numbers)
  const sortedFixes = [...fixes].sort((a, b) => {
    const boundsA = findVignetteBounds(lines, a.vignetteId);
    const boundsB = findVignetteBounds(lines, b.vignetteId);
    if (!boundsA || !boundsB) return 0;
    return boundsB[0] - boundsA[0]; // Reverse order (process from bottom up)
  });

  for (const fix of sortedFixes) {
    const bounds = findVignetteBounds(lines, fix.vignetteId);
    if (!bounds) {
      console.warn(`  ⚠ Could not find vignette: ${fix.vignetteId}`);
      continue;
    }

    const [start, end] = bounds;
    const linesToInsert: string[] = [];

    // 1. Collect dialogue fixes (filter out characters that already have dialogue)
    for (const df of fix.dialogueFixes) {
      if (!hasDialogueForCharacter(lines, start, end, df.character)) {
        linesToInsert.push(buildCharacterSpeakLine(df));
      }
    }

    // 2. Closing emote
    if (fix.closingEmote && !hasDialogueForCharacter(lines, start, end, fix.closingEmote.character)) {
      linesToInsert.push(buildCharacterSpeakLine(fix.closingEmote));
    }

    if (linesToInsert.length > 0) {
      // Find insertion point (before CELEBRATION or last NARRATOR)
      const insertAt = findInsertionPoint(lines, start, end);

      // Add a comment
      const comment = `    // Dialogue fix: give silent characters a voice`;
      lines.splice(insertAt, 0, comment, ...linesToInsert);
      totalInsertions += linesToInsert.length;
    }

    // 3. Opening emote (insert after first entrance, separate from dialogue group)
    if (fix.openingEmote) {
      // Re-find bounds since we may have inserted lines above
      const newBounds = findVignetteBounds(lines, fix.vignetteId);
      if (newBounds) {
        const [newStart, newEnd] = newBounds;
        const entranceLine = findFirstEntranceLine(lines, newStart, newEnd);
        if (entranceLine !== null) {
          const openingLine = buildCharacterSpeakLine(fix.openingEmote);
          lines.splice(entranceLine, 0, openingLine);
          totalInsertions++;
        }
      }
    }
  }

  // Write the modified file
  fs.writeFileSync(filePath, lines.join('\n'));
  return totalInsertions;
}

// ── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log('Loading fixes from CSV...');
  const allFixes = loadFixes();
  console.log(`Found ${allFixes.length} vignettes with dialogue fixes\n`);

  // Group by zone
  const byZone: Record<string, VignetteFix[]> = {};
  for (const fix of allFixes) {
    if (!byZone[fix.zone]) byZone[fix.zone] = [];
    byZone[fix.zone].push(fix);
  }

  let totalChanges = 0;

  for (const [zone, fixes] of Object.entries(byZone).sort()) {
    const fileName = ZONE_FILES[zone];
    if (!fileName) {
      console.warn(`Unknown zone: ${zone}`);
      continue;
    }

    const filePath = path.join(VIGNETTES_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    console.log(`── ${zone} (${fixes.length} vignettes) ──`);

    for (const fix of fixes) {
      const dialogueCount = fix.dialogueFixes.length;
      const hasOpening = fix.openingEmote ? 1 : 0;
      const hasClosing = fix.closingEmote ? 1 : 0;
      console.log(`  ${fix.vignetteId}: +${dialogueCount} dialogue, +${hasOpening} opening, +${hasClosing} closing`);
    }

    const insertions = applyFixesToFile(filePath, fixes);
    totalChanges += insertions;
    console.log(`  → ${insertions} CHARACTER_SPEAK lines inserted\n`);
  }

  console.log(`\n✅ Total: ${totalChanges} CHARACTER_SPEAK insertions across ${Object.keys(byZone).length} zone files`);
}

main();
