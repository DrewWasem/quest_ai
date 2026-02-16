/**
 * Demo Runner — Plays 21 best vignettes (3 per zone) for video recording.
 * Grouped by zone: plays all 3 in a zone, then transitions to the next.
 *
 * Usage:
 *   ?demo=showcase            Auto-start from vignette 1
 *   ?demo=showcase&start=10   Auto-start from vignette 10
 *   window.__runDemo()        Console trigger
 *   window.__runDemo(10)      Start from vignette 10
 *   window.__skipTo(5)        Skip to vignette 5 during playback
 *   window.__stopDemo()       Stop after current vignette
 *   window.__demoList()       Print the numbered playlist
 */

import { useGameStore } from '../stores/gameStore';
import { QUEST_STAGES } from '../data/quest-stages';
import { buildVignetteScript } from '../services/vignette-resolver';
import type { Vignette } from '../types/madlibs';

// ─── SHOWCASE PLAYLIST ──────────────────────────────────────────────────────
// 3 best per zone, selected for multi-character + multi-prop spectacle.
// Grouped by zone in clockwise village tour order.

interface DemoEntry {
  zone: string;
  vignetteId: string;
  stageNumber: number;
  label: string;
}

const DEMO_PLAYLIST: DemoEntry[] = [
  // ── SKELETON BIRTHDAY (5 actors + 10 props, 3 actors + 11 props, 3 actors + 3 giant props) ──
  { zone: 'skeleton-birthday', vignetteId: 'sb_feast_fireworks', stageNumber: 1,
    label: 'Skeleton Birthday: Royal Feast + Fireworks (5 chars, 10 props)' },
  { zone: 'skeleton-birthday', vignetteId: 'sb_feast_magic_show', stageNumber: 1,
    label: 'Skeleton Birthday: Infinite Feast Magic Show (3 chars, 11 props)' },
  { zone: 'skeleton-birthday', vignetteId: 'sb2_giant_feast_wild', stageNumber: 2,
    label: 'Skeleton Birthday: Giant Wild Feast Chaos (3 chars, giant scale)' },

  // ── KNIGHT SPACE (4 actors each, rocket launch + station repair + teamwork) ──
  { zone: 'knight-space', vignetteId: 'ks_everyone_launch', stageNumber: 1,
    label: 'Knight Space: Full Crew Rocket Launch (4 chars, 5 props)' },
  { zone: 'knight-space', vignetteId: 'ks2_critical_teamwork', stageNumber: 2,
    label: 'Knight Space: Critical Systems Teamwork (4 chars, 3 props)' },
  { zone: 'knight-space', vignetteId: 'ks_everyone_repair', stageNumber: 1,
    label: 'Knight Space: All Hands Repair Mission (4 chars, 2 props)' },

  // ── BARBARIAN SCHOOL (mud tsunami, everyone races, playground demolition) ──
  { zone: 'barbarian-school', vignetteId: 'bs2_mega_rainy', stageNumber: 2,
    label: 'Barbarian School: Mud Tsunami (3 chars, 3 props)' },
  { zone: 'barbarian-school', vignetteId: 'bs_everyone_race', stageNumber: 1,
    label: 'Barbarian School: Everyone Races (4 chars, pileup)' },
  { zone: 'barbarian-school', vignetteId: 'bs2_mega_barbarian', stageNumber: 2,
    label: 'Barbarian School: Playground Demolition (4 props launched)' },

  // ── SKELETON PIZZA (mystery cooking, pizza chaos, cross-team cake mountain) ──
  { zone: 'skeleton-pizza', vignetteId: 'sp_everyone_mystery', stageNumber: 1,
    label: 'Skeleton Pizza: Mystery Kitchen Chaos (4 chars, 4 props)' },
  { zone: 'skeleton-pizza', vignetteId: 'sp_everyone_pizza', stageNumber: 1,
    label: 'Skeleton Pizza: Too Many Chefs (3 chars, 6 props)' },
  { zone: 'skeleton-pizza', vignetteId: 'sp2_cross_team_cooking', stageNumber: 2,
    label: 'Skeleton Pizza: Cross-Team Cake Mountain (3 chars, 4 props)' },

  // ── ADVENTURERS PICNIC (whole party picnic, gold celebration, mega trap) ──
  { zone: 'adventurers-picnic', vignetteId: 'ap_whole_party_have_picnic', stageNumber: 1,
    label: 'Adventurers Picnic: Whole Party Feast (5 chars, 5 props)' },
  { zone: 'adventurers-picnic', vignetteId: 'ap_whole_party_celebrate', stageNumber: 1,
    label: 'Adventurers Picnic: Gold Chest Celebration (4 chars, coin rain)' },
  { zone: 'adventurers-picnic', vignetteId: 'ap_whole_party_set_trap', stageNumber: 1,
    label: 'Adventurers Picnic: Mega Trap Setup (3 chars, 5 props)' },

  // ── DUNGEON CONCERT (skeleton army battle, team smash, trap chaos) ──
  { zone: 'dungeon-concert', vignetteId: 'dc2_loud_fight_skeleton_army_normal', stageNumber: 2,
    label: 'Dungeon Concert: Skeleton Army Battle (4 chars, 2 props)' },
  { zone: 'dungeon-concert', vignetteId: 'dc_team_smash', stageNumber: 1,
    label: 'Dungeon Concert: Team Obstacle Smash (3 chars, 3 props)' },
  { zone: 'dungeon-concert', vignetteId: 'dc2_loud_distract_trap_slow', stageNumber: 2,
    label: 'Dungeon Concert: Clown Trap Chaos (5 props, explosions)' },

  // ── MAGE KITCHEN (giant feast, grill master, spinning pot tornado) ──
  { zone: 'mage-kitchen', vignetteId: 'mk_grow_cook', stageNumber: 1,
    label: 'Mage Kitchen: Giant Feast Grow Spell (2 chars, 9 props)' },
  { zone: 'mage-kitchen', vignetteId: 'mk_fire_cook', stageNumber: 1,
    label: 'Mage Kitchen: Barbarian Grill Master (2 chars, 6 props)' },
  { zone: 'mage-kitchen', vignetteId: 'mk_lev_multiply', stageNumber: 1,
    label: 'Mage Kitchen: Spinning Pot Tornado (8 pots, Grand Finale!)' },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function findVignette(zone: string, vignetteId: string, stageNumber: number): Vignette | null {
  const stages = QUEST_STAGES[zone];
  if (!stages) return null;

  const stage = stages.find(s => s.stageNumber === stageNumber);
  if (!stage) return null;

  const found = stage.vignettes.find(v => v.id === vignetteId);
  if (found) return found;

  if (stage.defaultVignette?.id === vignetteId) return stage.defaultVignette;

  return null;
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
export function signalShowcaseVignetteComplete(): void {
  if (running) interruptSleep();
}
(window as any).__signalShowcaseComplete = signalShowcaseVignetteComplete;

// ─── PRINT PLAYLIST ──────────────────────────────────────────────────────────

function printPlaylist(): void {
  console.log('%c[Demo] Showcase Playlist:', 'color: #7C3AED; font-size: 14px; font-weight: bold');
  DEMO_PLAYLIST.forEach((entry, i) => {
    console.log(`  %c${String(i + 1).padStart(2)}  ${entry.label}`, 'color: #FF8C42');
  });
  console.log('%c[Demo] Skip to any: window.__skipTo(N)', 'color: #7C3AED; font-style: italic');
}

// ─── MAIN RUNNER ──────────────────────────────────────────────────────────────

let running = false;
let pendingSkip = -1;

export async function runDemo(startFrom = 1): Promise<void> {
  if (running) {
    console.log('[Demo] Already running — call window.__stopDemo() to stop');
    return;
  }
  running = true;
  pendingSkip = -1;

  const store = useGameStore.getState;
  const setState = useGameStore.setState;

  console.log('%c[QuestAI Demo] Starting 21-vignette showcase (3 per zone)...', 'color: #4A90D9; font-size: 16px; font-weight: bold');
  printPlaylist();

  const startIndex = Math.max(0, Math.min(startFrom - 1, DEMO_PLAYLIST.length - 1));
  if (startIndex > 0) {
    console.log(`%c[Demo] Skipping to vignette ${startIndex + 1}`, 'color: #38BDF8; font-size: 14px; font-weight: bold');
  }

  let currentZone: string | null = null;

  for (let i = startIndex; i < DEMO_PLAYLIST.length; i++) {
    // Check for skip request
    if (pendingSkip >= 0) {
      const target = pendingSkip;
      pendingSkip = -1;
      i = target - 1; // loop will i++ to target
      console.log(`%c[Demo] Skipping to vignette ${target + 1}`, 'color: #38BDF8; font-size: 14px; font-weight: bold');
      setState({ lastScript: null, vignetteSteps: null });
      await sleep(300);
      continue;
    }

    if (!running) {
      console.log('[Demo] Stopped by user');
      return;
    }

    const entry = DEMO_PLAYLIST[i];
    console.log(`%c[Demo] ${i + 1}/${DEMO_PLAYLIST.length}  ${entry.label}`, 'color: #FF8C42; font-size: 14px; font-weight: bold');

    const vignette = findVignette(entry.zone, entry.vignetteId, entry.stageNumber);
    if (!vignette) {
      console.warn(`[Demo] Vignette not found: ${entry.vignetteId} in ${entry.zone} stage ${entry.stageNumber}`);
      continue;
    }

    // Enter zone if needed
    if (currentZone !== entry.zone) {
      if (currentZone) {
        store().exitZone();
        await sleep(500);
      }
      store().enterZone(entry.zone);
      currentZone = entry.zone;
      await sleep(2500);
    }

    // Check again after zone transition sleep
    if (pendingSkip >= 0) continue;

    // Clear and play
    setState({ lastScript: null, vignetteSteps: null });
    await sleep(300);

    const dummyTags: Record<string, string> = {};
    if (vignette.trigger) {
      for (const [key, val] of Object.entries(vignette.trigger)) {
        if (val && val !== '*') dummyTags[key] = val;
      }
    }
    const script = buildVignetteScript(vignette, dummyTags);

    setState({ lastScript: script, vignetteSteps: vignette.steps });

    const duration = estimateDuration(vignette);
    console.log(`[Demo]   Playing ${vignette.steps.length} steps, ~${Math.round(duration / 1000)}s estimated`);
    await sleep(duration);

    // Check again after playback sleep
    if (pendingSkip >= 0) continue;

    // Pause between vignettes
    if (i < DEMO_PLAYLIST.length - 1) {
      setState({ lastScript: null, vignetteSteps: null });
      await sleep(2000);
    }
  }

  console.log('%c[QuestAI Demo] Showcase complete!', 'color: #22C55E; font-size: 16px; font-weight: bold');
  running = false;
}

export function stopDemo(): void {
  running = false;
  pendingSkip = -1;
  interruptSleep();
  console.log('[Demo] Stopping after current vignette...');
}

export function skipTo(n: number): void {
  if (!running) {
    console.log(`[Demo] Not running. Start with window.__runDemo(${n}) to begin from vignette ${n}`);
    return;
  }
  if (n < 1 || n > DEMO_PLAYLIST.length) {
    console.error(`[Demo] Invalid vignette number. Must be 1-${DEMO_PLAYLIST.length}`);
    return;
  }
  console.log(`[Demo] Skip requested → vignette ${n}: ${DEMO_PLAYLIST[n - 1].label}`);
  pendingSkip = n - 1;
  interruptSleep();
}

// ─── EXPOSE TO WINDOW ─────────────────────────────────────────────────────────

(window as any).__runDemo = runDemo;
(window as any).__stopDemo = stopDemo;
(window as any).__skipTo = skipTo;
(window as any).__demoList = printPlaylist;

// ─── AUTO-START ON URL PARAM ──────────────────────────────────────────────────

export function checkAutoDemo(): void {
  const params = new URLSearchParams(window.location.search);
  if (params.get('demo') === 'showcase') {
    const listOnly = params.has('list');
    if (listOnly) {
      setTimeout(() => {
        printPlaylist();
        console.log('%c[Demo] List-only mode. To play: remove &list from URL, or run window.__runDemo()', 'color: #7C3AED; font-style: italic');
      }, 3000);
    }
    // Non-list demos wait for startPendingDemo() call (triggered by click overlay in App.tsx)
  }
}

/** Called after user click unlocks audio — starts the pending demo */
export function startPendingDemo(): void {
  const params = new URLSearchParams(window.location.search);
  if (params.get('demo') === 'showcase' && !params.has('list')) {
    const start = parseInt(params.get('start') || '1', 10) || 1;
    console.log(`[Demo] Starting showcase from user click${start > 1 ? ` (vignette ${start})` : ''}`);
    setTimeout(() => runDemo(start), 500);
  }
}
