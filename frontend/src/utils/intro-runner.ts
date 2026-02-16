/**
 * Intro Runner — Replays the cinematic intro at configurable speed.
 *
 * Usage:
 *   ?intro=witch              Auto-start intro with Witch at half speed
 *   ?intro=witch&speed=0.3    Custom speed multiplier (0.5 = half speed)
 *   window.__runIntro('witch')           Console trigger (half speed)
 *   window.__runIntro('witch', 0.3)      Console trigger with custom speed
 *   window.__stopIntro()                 Stop and skip to gameplay
 */

import { useGameStore } from '../stores/gameStore';
import type { CharacterKey } from '../data/asset-manifest';

const VALID_CHARACTERS: CharacterKey[] = [
  'knight', 'mage', 'barbarian', 'rogue', 'witch',
  'skeleton_warrior', 'skeleton_mage', 'clown', 'ranger',
];

/**
 * Triggers the intro by setting the character and restarting the app flow.
 * The speed multiplier is applied via a global that CinematicIntro reads.
 */
export function runIntro(character: string = 'witch', speed: number = 0.5): void {
  if (!VALID_CHARACTERS.includes(character as CharacterKey)) {
    console.error(`[Intro] Invalid character: "${character}". Valid: ${VALID_CHARACTERS.join(', ')}`);
    return;
  }

  // Set the speed multiplier in store (and window for backward compat)
  const store = useGameStore.getState();
  store.setIntroSpeedMultiplier(speed);
  (window as any).__introSpeedMultiplier = speed;

  // Set character
  store.setSelectedCharacter(character as CharacterKey);

  console.log(
    `%c[Intro] Starting cinematic with ${character} at ${speed}x speed (~${Math.round(22 / speed)}s)`,
    'color: #7C3AED; font-size: 14px; font-weight: bold'
  );

  // Dispatch a custom event that App.tsx listens for to restart the intro
  window.dispatchEvent(new CustomEvent('restart-intro'));
}

export function stopIntro(): void {
  useGameStore.getState().setIntroSpeedMultiplier(1.0);
  (window as any).__introSpeedMultiplier = undefined;
  window.dispatchEvent(new CustomEvent('skip-intro'));
  console.log('[Intro] Stopped.');
}

// ─── EXPOSE TO WINDOW ─────────────────────────────────────────────────────────

(window as any).__runIntro = runIntro;
(window as any).__stopIntro = stopIntro;

// ─── AUTO-START ON URL PARAM ──────────────────────────────────────────────────
// ?intro=witch           → half speed with Witch
// ?intro=witch&speed=0.3 → 0.3x speed with Witch

export function checkIntroRunner(): void {
  const params = new URLSearchParams(window.location.search);
  const character = params.get('intro');
  if (character) {
    const speed = parseFloat(params.get('speed') || '0.5') || 0.5;
    setTimeout(() => {
      runIntro(character, speed);
    }, 2000);
  }
}
