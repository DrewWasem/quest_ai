#!/usr/bin/env node
/**
 * Parse vignette-timing-audit.md and generate a CSV with individual action columns.
 */
const fs = require('fs');
const path = require('path');

const auditPath = path.resolve(__dirname, '../docs/vignette-timing-audit.md');
const outputPath = path.resolve(__dirname, '../docs/vignette-audit.csv');

const content = fs.readFileSync(auditPath, 'utf8');

// Parse all vignette data rows from the code blocks
const rows = [];
let currentZone = '';
let currentStage = '';

for (const line of content.split('\n')) {
  // Detect zone headers
  if (line.startsWith('## T1')) currentZone = 'skeleton-birthday';
  else if (line.startsWith('## T2')) currentZone = 'knight-space';
  else if (line.startsWith('## T3')) currentZone = 'mage-kitchen';
  else if (line.startsWith('## T4')) currentZone = 'barbarian-school';
  else if (line.startsWith('## T5')) currentZone = 'dungeon-concert';
  else if (line.startsWith('## T6')) currentZone = 'skeleton-pizza';
  else if (line.startsWith('## T7')) currentZone = 'adventurers-picnic';

  // Detect stage markers
  if (line.includes('--- STAGE 1')) currentStage = '1';
  else if (line.includes('--- STAGE 2')) currentStage = '2';
  else if (line.includes('--- STAGE 3')) currentStage = '3';

  // Skip non-data lines
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('zone') || trimmed.startsWith('----') || trimmed.startsWith('---') || trimmed.startsWith('```') || trimmed.startsWith('**') || trimmed.startsWith('|') || trimmed.startsWith('#')) continue;

  // Parse data rows: zone | vignette_id | promptScore | actions | pre_amp_s | post_amp_s | trigger
  const parts = trimmed.split('|').map(s => s.trim());
  if (parts.length >= 7 && parts[0] === currentZone) {
    const [zone, vignetteId, promptScore, actions, preAmp, postAmp, ...triggerParts] = parts;
    const trigger = triggerParts.join('|').trim(); // rejoin in case trigger has |
    const slots = trigger.split('+').map(s => s.trim());

    rows.push({
      zone,
      stage: currentStage,
      vignetteId,
      promptScore,
      actions: parseInt(actions),
      preAmpS: parseFloat(preAmp),
      postAmpS: parseFloat(postAmp),
      slots,
    });
  }
}

// Find max number of slots
const maxSlots = Math.max(...rows.map(r => r.slots.length));

// Build CSV
const headers = [
  'zone', 'stage', 'vignette_id', 'prompt_score', 'action_count', 'pre_amp_s', 'post_amp_s',
  ...Array.from({ length: maxSlots }, (_, i) => `Slot${i + 1}`),
];

const csvLines = [headers.join(',')];

for (const row of rows) {
  const slotCells = Array.from({ length: maxSlots }, (_, i) => row.slots[i] ?? '');
  const cells = [
    row.zone,
    row.stage,
    row.vignetteId,
    row.promptScore,
    row.actions,
    row.preAmpS,
    row.postAmpS,
    ...slotCells,
  ];
  csvLines.push(cells.map(c => `${c}`.includes(',') ? `"${c}"` : c).join(','));
}

fs.writeFileSync(outputPath, csvLines.join('\n') + '\n');
console.log(`Written ${rows.length} vignettes to ${outputPath}`);
console.log(`Max slots: ${maxSlots}`);
console.log(`Columns: ${headers.join(', ')}`);
