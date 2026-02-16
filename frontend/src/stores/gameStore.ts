import { create } from 'zustand';
import type { SceneScript } from '../types/scene-script';
import type { VignetteStep } from '../types/madlibs';
import type { ResponseSource } from '../services/resolver';
import type { CharacterKey } from '../data/asset-manifest';
import { resolveResponse } from '../services/resolver';
import { WORLDS } from '../data/worlds';
import { checkBadges, loadBadges, saveBadges, countSkills } from '../services/badge-system';
import { getQuestStages } from '../data/quest-stages';

// ─── LEVEL PERSISTENCE ──────────────────────────────────────────────────────

const LEVELS_KEY = 'quest-ai-levels';

interface LevelData {
  stageNumbers: Record<string, number>;
  stageCompleted: Record<string, number[]>;
  discoveredVignettes: Record<string, string[]>;
  level4Successes: Record<string, number>;
  level5Unlocked: Record<string, boolean>;
}

function loadLevels(): LevelData {
  try {
    const raw = localStorage.getItem(LEVELS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        stageNumbers: parsed.stageNumbers ?? {},
        stageCompleted: parsed.stageCompleted ?? {},
        discoveredVignettes: parsed.discoveredVignettes ?? {},
        level4Successes: parsed.level4Successes ?? {},
        level5Unlocked: parsed.level5Unlocked ?? {},
      };
    }
  } catch { /* corrupt data, start fresh */ }
  return { stageNumbers: {}, stageCompleted: {}, discoveredVignettes: {}, level4Successes: {}, level5Unlocked: {} };
}

function saveLevels(data: LevelData): void {
  try {
    localStorage.setItem(LEVELS_KEY, JSON.stringify(data));
  } catch { /* storage full, best-effort */ }
}

interface HistoryEntry {
  input: string;
  script: SceneScript;
  source: ResponseSource;
  latencyMs: number;
}

interface GameState {
  // State
  currentTask: string;
  userInput: string;
  isLoading: boolean;
  lastScript: SceneScript | null;
  lastSource: ResponseSource | null;
  error: string | null;
  history: HistoryEntry[];
  isMuted: boolean;

  // Mad Libs state
  vignetteSteps: VignetteStep[] | null;

  // Badge system
  badges: Record<string, boolean>;
  badgeUnlocks: string[]; // newly unlocked badges to animate

  // Level progression (per-zone)
  stageNumbers: Record<string, number>;    // { 'mage-kitchen': 1, 'skeleton-birthday': 2, ... }
  stageCompleted: Record<string, number[]>; // { 'mage-kitchen': [1], ... } — which stages are done
  discoveredVignettes: Record<string, string[]>; // { 'mage-kitchen-2': ['id1','id2'], ... }

  // Level 4/5 progression
  level4Successes: Record<string, number>;   // { 'skeleton-birthday': 2, ... }
  level5Unlocked: Record<string, boolean>;   // { 'skeleton-birthday': true, ... }

  // Village navigation
  currentZone: string | null;
  cameraTarget: [number, number, number];
  isTransitioning: boolean;
  playerPosition: [number, number, number];
  cameraYaw: number;
  cameraZoom: number;

  // Character selection
  selectedCharacter: CharacterKey;

  // Cinematic intro animation override for the player character
  introAnimation: string | null;
  introPlayerYaw: number | null;
  introPlayerPosition: [number, number, number] | null;
  introSpeedMultiplier: number;

  // Actions
  setInput: (input: string) => void;
  submitInput: () => Promise<void>;
  setLastScript: (script: SceneScript) => void;
  setVignetteSteps: (steps: VignetteStep[] | null) => void;
  clearScript: () => void;
  clearError: () => void;
  toggleMute: () => void;
  enterZone: (zoneId: string) => void;
  exitZone: () => void;
  updatePlayerPosition: (pos: [number, number, number]) => void;
  rotateCameraYaw: (deltaYaw: number) => void;
  adjustCameraZoom: (delta: number) => void;
  clearBadgeUnlocks: () => void;
  setSelectedCharacter: (id: CharacterKey) => void;
  setIntroAnimation: (anim: string | null, yaw?: number | null) => void;
  setIntroPlayerPosition: (pos: [number, number, number] | null) => void;
  setIntroSpeedMultiplier: (speed: number) => void;
  advanceStage: (zoneId: string) => void;
  setStage: (zoneId: string, stage: number) => void;
  completeStage: (zoneId: string, stageNumber: number) => void;
  recordDiscovery: (stageKey: string, vignetteId: string) => void;
  recordLevel4Success: (zoneId: string) => void;
  unlockLevel5: (zoneId: string) => void;
}

// Zone center positions in world space — ring at R~48-53, dungeon at Z=-70
export const ZONE_CENTERS: Record<string, [number, number, number]> = {
  'skeleton-birthday': [0, 0, -70],
  'knight-space':      [38, 0, -38],
  'barbarian-school':  [48, 0, 5],
  'skeleton-pizza':    [38, 0, 38],
  'adventurers-picnic':[0, 0, 48],
  'dungeon-concert':   [-35, 0, 35],
  'mage-kitchen':      [-48, 0, 5],
  'free-play':         [-38, 0, -38],
};

// Zone metadata derived from WORLDS config
export const ZONE_META: Record<string, { label: string; emoji: string; color: string }> = Object.fromEntries(
  Object.entries(WORLDS).map(([id, w]) => [id, { label: w.label, emoji: w.emoji, color: w.color }])
);

// Village center camera position
export const VILLAGE_CENTER: [number, number, number] = [0, 0, 0];

/** Count how many quest zones have completed all 3 mad-lib stages (stageNumber >= 4). */
export function getCompletedZoneCount(stageNumbers: Record<string, number>): number {
  return Object.entries(stageNumbers)
    .filter(([zoneId, stage]) => zoneId !== 'free-play' && stage >= 4)
    .length;
}

/** Check if a zone is locked — all zones are unlocked. */
export function isZoneLocked(_zoneId: string, _stageNumbers: Record<string, number>): boolean {
  return false;
}

// Intro scripts shown (and read aloud) when first entering a zone — derived from WORLDS hook
function getZoneIntro(zoneId: string): SceneScript | null {
  const world = WORLDS[zoneId];
  if (!world) return null;
  return {
    success_level: 'PARTIAL_SUCCESS',
    narration: world.hook,
    actions: [],
    prompt_feedback: world.placeholder,
    guide_hint: `Try describing WHO should do something, WHAT they do, and HOW they do it!`,
  };
}

// Cooldown: prevent re-entering a zone immediately after exiting
let lastExitTime = 0;
const ZONE_REENTRY_COOLDOWN = 1500;
const ZONE_TRIGGER_DISTANCE = 3.0;

const _savedLevels = loadLevels();

export const useGameStore = create<GameState>((set, get) => ({
  currentTask: 'skeleton-birthday',
  userInput: '',
  isLoading: false,
  lastScript: null,
  lastSource: null,
  error: null,
  history: [],
  isMuted: false,
  vignetteSteps: null,
  badges: loadBadges(),
  badgeUnlocks: [],
  stageNumbers: _savedLevels.stageNumbers,
  stageCompleted: _savedLevels.stageCompleted,
  discoveredVignettes: _savedLevels.discoveredVignettes,
  level4Successes: _savedLevels.level4Successes,
  level5Unlocked: _savedLevels.level5Unlocked,
  currentZone: null,
  cameraTarget: VILLAGE_CENTER,
  isTransitioning: false,
  playerPosition: [0, 0, 5],
  cameraYaw: 0,
  cameraZoom: 12,
  selectedCharacter: 'knight',
  introAnimation: null,
  introPlayerYaw: null,
  introPlayerPosition: null,
  introSpeedMultiplier: 1.0,

  setInput: (input: string) => set({ userInput: input }),

  submitInput: async () => {
    const { userInput, currentTask } = get();
    const trimmed = userInput.trim();
    if (!trimmed) return;

    set({ isLoading: true, error: null });

    try {
      const { script, source, latencyMs } = await resolveResponse(
        currentTask,
        trimmed,
      );

      // Check for badge unlocks
      const { badges, history } = get();

      // Iterator badge: did they retry with more detail?
      let isRetryImproved = false;
      if (history.length > 0) {
        const prevAnalysis = history[history.length - 1].script.prompt_analysis;
        const prevSkills = countSkills(prevAnalysis);
        const newSkills = countSkills(script.prompt_analysis);
        if (newSkills > prevSkills) {
          isRetryImproved = true;
        }
      }

      const newBadgeIds = checkBadges(script.prompt_analysis, badges, isRetryImproved);
      const updatedBadges = { ...badges };
      for (const id of newBadgeIds) {
        updatedBadges[id] = true;
      }
      if (newBadgeIds.length > 0) {
        saveBadges(updatedBadges);
      }

      set((state) => ({
        lastScript: script,
        lastSource: source,
        isLoading: false,
        badges: newBadgeIds.length > 0 ? updatedBadges : state.badges,
        badgeUnlocks: newBadgeIds,
        history: [...state.history, { input: trimmed, script, source, latencyMs }],
      }));

      console.log(`[GameStore] Script resolved (${source}, ${latencyMs.toFixed(0)}ms):`, script);
      if (newBadgeIds.length > 0) {
        console.log(`[GameStore] Badges unlocked:`, newBadgeIds);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      console.error('[GameStore] Error:', message);
      set({ error: message, isLoading: false });
    }
  },

  setLastScript: (script: SceneScript) => set({ lastScript: script }),
  setVignetteSteps: (steps: VignetteStep[] | null) => set({ vignetteSteps: steps }),
  clearScript: () => set({ lastScript: null, lastSource: null, vignetteSteps: null }),
  clearError: () => set({ error: null }),
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
  clearBadgeUnlocks: () => set({ badgeUnlocks: [] }),
  setSelectedCharacter: (id: CharacterKey) => set({ selectedCharacter: id }),
  setIntroAnimation: (anim, yaw) => set({ introAnimation: anim, introPlayerYaw: yaw ?? null }),
  setIntroPlayerPosition: (pos) => set({ introPlayerPosition: pos }),
  setIntroSpeedMultiplier: (speed) => set({ introSpeedMultiplier: speed }),

  enterZone: (zoneId: string) => {
    const center = ZONE_CENTERS[zoneId];
    if (!center) return;

    const intro = getZoneIntro(zoneId);

    // Free-play zone always jumps to Level 5 (sandbox)
    const stateUpdate: Partial<GameState> = {
      currentZone: zoneId,
      currentTask: zoneId,
      cameraTarget: center,
      isTransitioning: true,
      lastScript: intro,
      lastSource: null,
      error: null,
      userInput: '',
      badgeUnlocks: [],
    };
    if (zoneId === 'free-play') {
      const { stageNumbers, stageCompleted, discoveredVignettes, level4Successes, level5Unlocked } = get();
      const updatedStages = { ...stageNumbers, 'free-play': 5 };
      const updatedL5 = { ...level5Unlocked, 'free-play': true };
      saveLevels({ stageNumbers: updatedStages, stageCompleted, discoveredVignettes, level4Successes, level5Unlocked: updatedL5 });
      (stateUpdate as any).stageNumbers = updatedStages;
      (stateUpdate as any).level5Unlocked = updatedL5;
    }

    set(stateUpdate as any);
  },

  exitZone: () => {
    lastExitTime = Date.now();
    const { playerPosition } = get();
    set({
      currentZone: null,
      cameraTarget: playerPosition,
      isTransitioning: true,
      lastScript: null,
      lastSource: null,
      userInput: '',
      badgeUnlocks: [],
    });
  },

  updatePlayerPosition: (pos: [number, number, number]) => {
    const { currentZone, isTransitioning, stageNumbers } = get();
    if (currentZone || isTransitioning) return;
    if (Date.now() - lastExitTime < ZONE_REENTRY_COOLDOWN) return;

    set({ playerPosition: pos });

    for (const [zoneId, center] of Object.entries(ZONE_CENTERS)) {
      const dx = pos[0] - center[0];
      const dz = pos[2] - center[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < ZONE_TRIGGER_DISTANCE) {
        // Don't enter locked zones
        if (isZoneLocked(zoneId, stageNumbers)) return;
        get().enterZone(zoneId);
        return;
      }
    }
  },

  rotateCameraYaw: (deltaYaw: number) => {
    set((s) => ({ cameraYaw: s.cameraYaw + deltaYaw }));
  },

  adjustCameraZoom: (delta: number) => {
    set((s) => ({
      cameraZoom: Math.max(5, Math.min(60, s.cameraZoom * (1 + delta * 0.08))),
    }));
  },

  advanceStage: (zoneId: string) => {
    const { stageNumbers, stageCompleted, discoveredVignettes, level4Successes, level5Unlocked } = get();
    const maxMadLibStages = getQuestStages(zoneId).length;
    const current = stageNumbers[zoneId] ?? 1;

    // Allow advancing through stages 1→2→3→4→5
    // Stages 1-3 are Mad Libs, 4 is Hybrid Free Text, 5 is Full Prompt
    const maxAllowed = level5Unlocked[zoneId] ? 5 : ((stageCompleted[zoneId] ?? []).includes(maxMadLibStages) ? 4 : maxMadLibStages);
    if (current >= maxAllowed) return;

    const next = current + 1;
    const updated = {
      stageNumbers: { ...stageNumbers, [zoneId]: next },
      stageCompleted,
      discoveredVignettes,
      level4Successes,
      level5Unlocked,
    };
    saveLevels(updated);

    // Level-up titles for stages 4 and 5
    const levelTitles: Record<number, { title: string; intro: string }> = {
      4: { title: 'Free Text Mode', intro: 'Type your own ideas! Pick a character, then describe what happens.' },
      5: { title: 'Full Prompt Mode', intro: "You've graduated! Write anything you want and watch it come to life!" },
    };

    // Show a "Level Up!" intro script via the scene engine
    const nextStage = next <= maxMadLibStages
      ? getQuestStages(zoneId).find(s => s.stageNumber === next)
      : null;
    const lt = levelTitles[next];
    const title = nextStage?.title ?? lt?.title ?? 'Next Level';
    const intro = nextStage?.intro ?? lt?.intro ?? 'New challenge unlocked!';

    const levelUpScript: SceneScript = {
      success_level: 'FULL_SUCCESS',
      narration: `Level ${next}: ${title}!`,
      actions: [
        { type: 'text_popup' as any, text: `Level ${next}!`, position: 'center', size: 'huge', delay_ms: 0, duration_ms: 2000 },
      ],
      prompt_feedback: intro,
      guide_hint: next >= 4 ? 'Be creative and specific!' : 'Try the new options!',
    };

    set({
      stageNumbers: updated.stageNumbers,
      lastScript: levelUpScript,
      vignetteSteps: null,
    });
  },

  setStage: (zoneId: string, stage: number) => {
    const { stageNumbers, stageCompleted, discoveredVignettes, level4Successes, level5Unlocked } = get();
    const updated = { ...stageNumbers, [zoneId]: stage };
    saveLevels({ stageNumbers: updated, stageCompleted, discoveredVignettes, level4Successes, level5Unlocked });
    set({ stageNumbers: updated, lastScript: null, vignetteSteps: null });
  },

  completeStage: (zoneId: string, stageNumber: number) => {
    const { stageCompleted, stageNumbers, discoveredVignettes, level4Successes, level5Unlocked } = get();
    const existing = stageCompleted[zoneId] ?? [];
    if (existing.includes(stageNumber)) return; // already completed

    const updatedCompleted = { ...stageCompleted, [zoneId]: [...existing, stageNumber] };
    const data = { stageNumbers, stageCompleted: updatedCompleted, discoveredVignettes, level4Successes, level5Unlocked };
    saveLevels(data);
    set({ stageCompleted: updatedCompleted });
  },

  recordDiscovery: (stageKey: string, vignetteId: string) => {
    const { discoveredVignettes, stageNumbers, stageCompleted, level4Successes, level5Unlocked } = get();
    const existing = discoveredVignettes[stageKey] ?? [];
    if (existing.includes(vignetteId)) return;

    const updated = { ...discoveredVignettes, [stageKey]: [...existing, vignetteId] };
    const data = { stageNumbers, stageCompleted, discoveredVignettes: updated, level4Successes, level5Unlocked };
    saveLevels(data);
    set({ discoveredVignettes: updated });
  },

  recordLevel4Success: (zoneId: string) => {
    const { level4Successes, level5Unlocked, stageNumbers, stageCompleted, discoveredVignettes } = get();
    const count = (level4Successes[zoneId] ?? 0) + 1;
    const updatedSuccesses = { ...level4Successes, [zoneId]: count };
    const data = { stageNumbers, stageCompleted, discoveredVignettes, level4Successes: updatedSuccesses, level5Unlocked };
    saveLevels(data);
    set({ level4Successes: updatedSuccesses });

    // Auto-unlock Level 5 after 3 successes
    if (count >= 3 && !level5Unlocked[zoneId]) {
      get().unlockLevel5(zoneId);
    }
  },

  unlockLevel5: (zoneId: string) => {
    const { level5Unlocked, stageNumbers, stageCompleted, discoveredVignettes, level4Successes } = get();
    const updated = { ...level5Unlocked, [zoneId]: true };
    const data = { stageNumbers, stageCompleted, discoveredVignettes, level4Successes, level5Unlocked: updated };
    saveLevels(data);
    set({ level5Unlocked: updated });
  },
}));

// Expose store to window in dev mode for E2E testing (Puppeteer)
if (import.meta.env.DEV) {
  (window as any).__gameStore = useGameStore;
}
