/**
 * Zone Demo Runner — Plays EVERY stage 1 vignette for a single zone.
 *
 * Usage:
 *   ?demo=skeleton-birthday            Auto-start from vignette 1
 *   ?demo=mage-kitchen&start=5         Auto-start from vignette 5
 *   window.__runZone('knight-space')    Console trigger
 *   window.__runZone('knight-space', 8) Start from vignette 8
 *   window.__zoneSkipTo(5)             Skip to vignette 5 during playback
 *   window.__stopZone()                Stop after current vignette
 *   window.__zoneList()                Print the numbered vignette list
 */

import { useGameStore } from '../stores/gameStore';
import { QUEST_STAGES } from '../data/quest-stages';
import { buildVignetteScript } from '../services/vignette-resolver';
import type { Vignette } from '../types/madlibs';

// ─── ZONE IDS ────────────────────────────────────────────────────────────────

const VALID_ZONES = [
  'skeleton-birthday',
  'knight-space',
  'mage-kitchen',
  'barbarian-school',
  'dungeon-concert',
  'skeleton-pizza',
  'adventurers-picnic',
] as const;

type ZoneId = typeof VALID_ZONES[number];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getAllStage1Vignettes(zone: string): Vignette[] {
  const stages = QUEST_STAGES[zone];
  if (!stages) return [];

  const stage1 = stages.find(s => s.stageNumber === 1);
  if (!stage1) return [];

  const vignettes: Vignette[] = [...stage1.vignettes];
  if (stage1.defaultVignette) {
    vignettes.push(stage1.defaultVignette);
  }
  return vignettes;
}

function estimateDuration(vignette: Vignette): number {
  // Max timeout safety net — actual completion uses signalVignetteComplete()
  // delayAfter is divided by VIGNETTE_GAP_SPEED=2 at runtime, plus ~800ms per step for actions
  const baseTime = vignette.steps.reduce(
    (sum, step) => sum + (step.delayAfter ?? 0.5) * 500 + 800,
    0
  );
  return Math.min(baseTime + 3000, 60000);
}

// ─── INTERRUPTIBLE SLEEP ─────────────────────────────────────────────────────

let sleepResolve: (() => void) | null = null;

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    sleepResolve = () => { sleepResolve = null; resolve(); };
    setTimeout(() => { sleepResolve = null; resolve(); }, ms);
  });
}

function interruptSleep(): void {
  if (sleepResolve) sleepResolve();
}

/** Called by App.tsx onComplete — wakes the runner immediately after vignette finishes */
export function signalVignetteComplete(): void {
  if (running) interruptSleep();
}
(window as any).__signalVignetteComplete = signalVignetteComplete;

// ─── PRINT VIGNETTE LIST ─────────────────────────────────────────────────────

let lastVignetteList: Vignette[] = [];

function printVignetteList(zone: string, vignettes: Vignette[]): void {
  console.log(`%c[ZoneDemo] ${zone} — ${vignettes.length} vignettes:`, 'color: #7C3AED; font-size: 14px; font-weight: bold');
  vignettes.forEach((v, i) => {
    const tier = v.tier ? ` [${v.tier}]` : '';
    console.log(`  %c${String(i + 1).padStart(2)}  ${v.id}${tier}`, 'color: #FF8C42');
  });
  console.log('%c[ZoneDemo] Skip to any: window.__zoneSkipTo(N)', 'color: #7C3AED; font-style: italic');
}

// ─── ZONE RUNNER ─────────────────────────────────────────────────────────────

let running = false;
let pendingSkip = -1;

export async function runZone(zone: string, startFrom = 1): Promise<void> {
  if (running) {
    console.log('[ZoneDemo] Already running — call window.__stopZone() to stop');
    return;
  }

  if (!VALID_ZONES.includes(zone as ZoneId)) {
    console.error(`[ZoneDemo] Invalid zone: "${zone}". Valid zones:\n  ${VALID_ZONES.join('\n  ')}`);
    return;
  }

  const vignettes = getAllStage1Vignettes(zone);
  if (vignettes.length === 0) {
    console.error(`[ZoneDemo] No stage 1 vignettes found for zone: ${zone}`);
    return;
  }

  running = true;
  pendingSkip = -1;
  lastVignetteList = vignettes;
  const store = useGameStore.getState;
  const setState = useGameStore.setState;

  console.log(
    `%c[ZoneDemo] ${zone} — Playing ALL ${vignettes.length} stage 1 vignettes`,
    'color: #7C3AED; font-size: 16px; font-weight: bold'
  );
  printVignetteList(zone, vignettes);

  const startIndex = Math.max(0, Math.min(startFrom - 1, vignettes.length - 1));
  if (startIndex > 0) {
    console.log(`%c[ZoneDemo] Skipping to vignette ${startIndex + 1}`, 'color: #38BDF8; font-size: 14px; font-weight: bold');
  }

  // Enter the zone
  store().enterZone(zone);
  await sleep(3000);

  for (let i = startIndex; i < vignettes.length; i++) {
    // Check for skip request
    if (pendingSkip >= 0) {
      const target = pendingSkip;
      pendingSkip = -1;
      i = target - 1; // loop will i++ to target
      console.log(`%c[ZoneDemo] Skipping to vignette ${target + 1}`, 'color: #38BDF8; font-size: 14px; font-weight: bold');
      setState({ lastScript: null, vignetteSteps: null });
      await sleep(300);
      continue;
    }

    if (!running) {
      console.log('[ZoneDemo] Stopped by user');
      setState({ lastScript: null, vignetteSteps: null });
      return;
    }

    const vignette = vignettes[i];
    const tier = vignette.tier ? ` [${vignette.tier}]` : '';
    console.log(
      `%c[ZoneDemo] ${i + 1}/${vignettes.length}  ${vignette.id}${tier}`,
      'color: #FF8C42; font-size: 13px; font-weight: bold'
    );

    // Clear previous
    setState({ lastScript: null, vignetteSteps: null });
    await sleep(300);

    // Check again after sleep
    if (pendingSkip >= 0) continue;

    // Build tags from trigger
    const tags: Record<string, string> = {};
    if (vignette.trigger) {
      for (const [key, val] of Object.entries(vignette.trigger)) {
        if (val && val !== '*') tags[key] = val;
      }
    }

    const script = buildVignetteScript(vignette, tags);
    setState({ lastScript: script, vignetteSteps: vignette.steps });

    const duration = estimateDuration(vignette);
    console.log(`[ZoneDemo]   ${vignette.steps.length} steps, ~${Math.round(duration / 1000)}s`);
    await sleep(duration);

    // Check again after playback sleep
    if (pendingSkip >= 0) continue;

    // Pause between vignettes
    if (i < vignettes.length - 1) {
      setState({ lastScript: null, vignetteSteps: null });
      await sleep(2000);
    }
  }

  console.log(
    `%c[ZoneDemo] ${zone} complete! Played ${vignettes.length} vignettes.`,
    'color: #22C55E; font-size: 16px; font-weight: bold'
  );
  running = false;
}

export function stopZone(): void {
  running = false;
  pendingSkip = -1;
  interruptSleep();
  console.log('[ZoneDemo] Stopping after current vignette...');
}

export function zoneSkipTo(n: number): void {
  if (!running) {
    console.log('[ZoneDemo] Not running. Start a zone first with window.__runZone("zone-name")');
    return;
  }
  if (n < 1 || n > lastVignetteList.length) {
    console.error(`[ZoneDemo] Invalid vignette number. Must be 1-${lastVignetteList.length}`);
    return;
  }
  console.log(`[ZoneDemo] Skip requested → vignette ${n}: ${lastVignetteList[n - 1].id}`);
  pendingSkip = n - 1;
  interruptSleep();
}

// ─── EXPOSE TO WINDOW ────────────────────────────────────────────────────────

(window as any).__runZone = runZone;
(window as any).__stopZone = stopZone;
(window as any).__zoneSkipTo = zoneSkipTo;
(window as any).__zoneList = () => {
  if (lastVignetteList.length === 0) {
    console.log('[ZoneDemo] No zone loaded. Start a zone first.');
    return;
  }
  printVignetteList('(current zone)', lastVignetteList);
};

// ─── AUTO-START ON URL PARAM ─────────────────────────────────────────────────
// ?demo=skeleton-birthday        → plays all S1 vignettes for that zone
// ?demo=mage-kitchen&start=5     → starts from vignette 5

export function checkZoneDemo(): void {
  const params = new URLSearchParams(window.location.search);
  const demo = params.get('demo');
  if (demo && VALID_ZONES.includes(demo as ZoneId)) {
    const listOnly = params.has('list');
    if (listOnly) {
      setTimeout(() => {
        const vignettes = getAllStage1Vignettes(demo);
        lastVignetteList = vignettes;
        printVignetteList(demo, vignettes);
        console.log('%c[ZoneDemo] List-only mode. To play: remove &list from URL, or run window.__runZone("' + demo + '")', 'color: #7C3AED; font-style: italic');
      }, 3000);
    }
    // Non-list demos wait for startPendingZoneDemo() call (triggered by click overlay in App.tsx)
  }
}

/** Called after user click unlocks audio — starts the pending zone demo */
export function startPendingZoneDemo(): void {
  const params = new URLSearchParams(window.location.search);
  const demo = params.get('demo');
  if (demo && VALID_ZONES.includes(demo as ZoneId) && !params.has('list')) {
    const start = parseInt(params.get('start') || '1', 10) || 1;
    console.log(`[ZoneDemo] Starting ${demo} from user click${start > 1 ? ` (vignette ${start})` : ''}`);
    setTimeout(() => runZone(demo, start), 500);
  }
}
