/**
 * Loading Vignettes — short "thinking" animations that play on the 3D stage
 * while waiting for the Claude API to return a Level 4/5 response.
 *
 * Each zone gets a signature character who spawns, paces, thinks, and builds
 * anticipation. Covers ~6-8 seconds of content (typical Sonnet latency).
 * When the real API response arrives, the loading vignette is replaced.
 */

import type { VignetteStep } from '../types/madlibs';
import type { SceneScript } from '../types/scene-script';
import {
  BOUNCE_ENTRANCE,
  CHARACTER_THINK,
  CHARACTER_SPEAK,
  PACE,
  EMOTE,
} from './movement-templates';

interface LoadingVignette {
  steps: VignetteStep[];
  script: SceneScript;
}

/** Character + personality for each zone's loading animation */
const ZONE_THINKERS: Record<string, { character: string; thinkEmoji: string; thinkText: string; readyText: string }> = {
  'skeleton-birthday':  { character: 'skeleton_warrior', thinkEmoji: 'thinking',   thinkText: 'Planning the party...', readyText: 'This is gonna be good!' },
  'knight-space':       { character: 'space_ranger',     thinkEmoji: 'thinking',   thinkText: 'Scanning the signal...', readyText: 'Almost there!' },
  'barbarian-school':   { character: 'barbarian',        thinkEmoji: 'thinking',   thinkText: 'Hmm, what to play...', readyText: 'Oh yeah!' },
  'skeleton-pizza':     { character: 'skeleton_warrior', thinkEmoji: 'thinking',   thinkText: 'Checking the order...', readyText: 'Coming right up!' },
  'adventurers-picnic': { character: 'ranger',           thinkEmoji: 'thinking',   thinkText: 'Reading the signs...', readyText: 'I see something!' },
  'dungeon-concert':    { character: 'rogue',            thinkEmoji: 'thinking',   thinkText: 'Scouting ahead...', readyText: 'Got a plan!' },
  'mage-kitchen':       { character: 'mage',             thinkEmoji: 'thinking',   thinkText: 'Mixing the spell...', readyText: 'Magic incoming!' },
  'free-play':          { character: 'knight',           thinkEmoji: 'thinking',   thinkText: 'So many options...', readyText: 'Here we go!' },
};

function buildLoadingVignette(zoneId: string): LoadingVignette {
  const thinker = ZONE_THINKERS[zoneId] ?? ZONE_THINKERS['skeleton-birthday'];
  const { character, thinkEmoji, thinkText, readyText } = thinker;

  const steps: VignetteStep[] = [
    // Entrance (~1s)
    ...BOUNCE_ENTRANCE(character, 'cs-center', 'left'),
    // Think (~1.5s)
    ...CHARACTER_THINK(character, thinkEmoji),
    // Pace nervously (~2.4s)
    ...PACE(character, 'cs-left', 'cs-right'),
    // Thinking speech (~2s)
    ...CHARACTER_SPEAK(character, thinkEmoji, thinkText),
    // Another think beat (~1.5s)
    ...EMOTE(character, 'excited'),
    // Ready speech (~2s) — by now API should have returned
    ...CHARACTER_SPEAK(character, 'excited', readyText),
    // Loop buffer: pace again in case API is slow (~2.4s)
    ...PACE(character, 'cs-right', 'cs-left'),
    ...CHARACTER_THINK(character, thinkEmoji),
  ];

  const script: SceneScript = {
    success_level: 'PARTIAL_SUCCESS',
    narration: thinkText,
    actions: [],
    prompt_feedback: '',
  };

  return { steps, script };
}

/** Get a loading vignette for the given zone. */
export function getLoadingVignette(zoneId: string): LoadingVignette {
  return buildLoadingVignette(zoneId);
}
