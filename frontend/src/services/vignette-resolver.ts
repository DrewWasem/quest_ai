/**
 * Vignette Resolver — maps tag combinations to pre-built vignettes.
 *
 * 5-priority matching:
 * 1. EXACT (all tags match)
 * 2. PAIR (2+ tags match, including wildcards)
 * 3. VIBE match (just the vibe/mood slot)
 * 4. CATEGORY match (any wildcard combos)
 * 5. DEFAULT fallback
 */

import type { Vignette, VignetteStep, VignetteAction, QuestStage, Level4Stage, Level4ParsedTags } from '../types/madlibs';
import type { Action, SceneScript } from '../types/scene-script';
import { resolveAnimationVerb } from '../data/animation-verbs';

/**
 * Resolve which vignette to play based on selected tags.
 */
export function resolveVignette(
  selectedTags: Record<string, string>,
  stage: QuestStage,
): Vignette {
  const vignettes = stage.vignettes;
  const slotIds = stage.template.slots.map(s => s.id);

  // Priority 1: EXACT match (all tags)
  const exact = vignettes.find(v => {
    return slotIds.every(id => {
      const triggerVal = v.trigger[id.toLowerCase()];
      return triggerVal === selectedTags[id] || triggerVal === '*';
    });
  });
  if (exact && !isAllWildcard(exact, slotIds)) return exact;

  // Priority 2: PAIR match (2+ of N tags match)
  const pairMatches = vignettes.filter(v => {
    let matchCount = 0;
    for (const id of slotIds) {
      const triggerVal = v.trigger[id.toLowerCase()];
      if (triggerVal === selectedTags[id] || triggerVal === '*') matchCount++;
    }
    return matchCount >= 2 && matchCount < slotIds.length;
  });
  if (pairMatches.length > 0) {
    return pairMatches[Math.floor(Math.random() * pairMatches.length)];
  }

  // Priority 3: VIBE match — match the last slot (usually vibe/mood)
  const vibeSlotId = slotIds[slotIds.length - 1];
  const vibeMatch = vignettes.find(v => {
    const triggerVal = v.trigger[vibeSlotId.toLowerCase()];
    return triggerVal === selectedTags[vibeSlotId];
  });
  if (vibeMatch) return vibeMatch;

  // Priority 4: CATEGORY match — any single non-wildcard tag match
  const categoryMatch = vignettes.find(v => {
    return slotIds.some(id => {
      const triggerVal = v.trigger[id.toLowerCase()];
      return triggerVal === selectedTags[id] && triggerVal !== '*';
    });
  });
  if (categoryMatch) return categoryMatch;

  // Priority 5: DEFAULT
  return stage.defaultVignette;
}

function isAllWildcard(v: Vignette, slotIds: string[]): boolean {
  return slotIds.every(id => v.trigger[id.toLowerCase()] === '*');
}

/**
 * Match Level 4 parsed tags to existing vignettes.
 * Builds a pseudo-selectedTags from parsed free text and runs
 * through the standard vignette matching pipeline.
 */
export function resolveLevel4Vignette(
  parsed: Level4ParsedTags,
  stage: Level4Stage,
): Vignette {
  // Build selectedTags mapping parsed fields to slot-like keys
  const selectedTags: Record<string, string> = {};
  if (parsed.character) selectedTags.CHARACTER = parsed.character;
  if (parsed.action) selectedTags.ENTERTAINMENT = parsed.action;
  if (parsed.modifier) selectedTags.FOOD = parsed.modifier;
  if (parsed.vibe) selectedTags.VIBE = parsed.vibe;

  // Use ranking to find best match across all vignettes
  const allVignettes = [...stage.vignettes, stage.defaultVignette];

  // Score each vignette by tag overlap
  let best: Vignette = stage.defaultVignette;
  let bestScore = -1;

  for (const v of allVignettes) {
    let score = 0;
    const triggerValues = Object.values(v.trigger).map(t => t.toLowerCase());

    if (parsed.action && triggerValues.includes(parsed.action)) score += 3;
    if (parsed.modifier && triggerValues.includes(parsed.modifier)) score += 2;
    if (parsed.vibe && triggerValues.includes(parsed.vibe)) score += 2;
    if (parsed.character && triggerValues.includes(parsed.character)) score += 1;

    // Bonus for non-default, non-wildcard matches
    if (v.promptScore === 'perfect') score += 1;
    if (v.id === stage.defaultVignette.id) score -= 3;

    if (score > bestScore) {
      bestScore = score;
      best = v;
    }
  }

  return best;
}

/**
 * Rank all vignettes by tag-match score for Haiku-assisted selection.
 * Scoring: +3 exact tag match, +1 wildcard match, +2 bonus for 'perfect', -5 for default.
 * Returns sorted descending. Always non-empty (default always included).
 */
export function rankVignettes(
  selectedTags: Record<string, string>,
  stage: QuestStage,
): Array<{ vignette: Vignette; score: number }> {
  const slotIds = stage.template.slots.map(s => s.id);
  const allVignettes = [...stage.vignettes, stage.defaultVignette];

  const scored = allVignettes.map(v => {
    let score = 0;

    for (const id of slotIds) {
      const triggerVal = v.trigger[id.toLowerCase()];
      if (triggerVal === selectedTags[id]) {
        score += 3; // exact match
      } else if (triggerVal === '*') {
        score += 1; // wildcard match
      }
    }

    if (v.promptScore === 'perfect') score += 2;
    if (v.id === stage.defaultVignette.id) score -= 5;

    return { vignette: v, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored;
}

/**
 * Convert a Vignette into a SceneScript for the playback engine.
 */
export function buildVignetteScript(
  vignette: Vignette,
  _selectedTags: Record<string, string>,
): SceneScript {
  const actions = vignetteStepsToActions(vignette.steps);

  // Map prompt score to success level
  const successMap: Record<string, 'FULL_SUCCESS' | 'PARTIAL_SUCCESS' | 'FUNNY_FAIL'> = {
    perfect: 'FULL_SUCCESS',
    chaotic: 'FUNNY_FAIL',
    partial: 'PARTIAL_SUCCESS',
    funny_fail: 'FUNNY_FAIL',
  };

  return {
    success_level: successMap[vignette.promptScore] ?? 'PARTIAL_SUCCESS',
    narration: vignette.feedback.title,
    actions,
    prompt_feedback: vignette.feedback.message,
    guide_hint: vignette.feedback.tip,
  };
}

/**
 * Flatten VignetteSteps into sequential Actions for the existing playback engine.
 * Parallel actions within a step get staggered with small delays.
 */
function vignetteStepsToActions(steps: VignetteStep[]): Action[] {
  const result: Action[] = [];
  let cumulativeDelay = 0;

  for (const step of steps) {
    // Each action in a parallel group starts at the same time
    for (let i = 0; i < step.parallel.length; i++) {
      const va = step.parallel[i];
      const action = vignetteActionToAction(va, cumulativeDelay);
      if (action) result.push(action);
    }

    // delayAfter advances the timeline
    cumulativeDelay += (step.delayAfter ?? 0.5) * 1000;
  }

  return result;
}

/**
 * Convert a VignetteAction to a scene-script Action.
 */
function vignetteActionToAction(va: VignetteAction, delayMs: number): Action | null {
  const delay_ms = Math.round(delayMs);

  switch (va.action) {
    case 'spawn':
    case 'spawn_character':
      return {
        type: 'spawn',
        target: (va.character ?? va.asset ?? 'mystery_crate') as any,
        position: (va.position ?? 'center') as any,
        delay_ms,
      };

    case 'move':
      return {
        type: 'move',
        target: (va.character ?? va.asset ?? '') as any,
        to: (va.to ?? va.position ?? 'center') as any,
        style: (va.style as any) ?? 'linear',
        delay_ms,
      };

    case 'animate':
      return {
        type: 'animate',
        target: (va.character ?? '') as any,
        anim: resolveAnimationVerb(va.anim ?? 'idle'),
        delay_ms,
        duration_ms: 800,
      };

    case 'react':
      return {
        type: 'react',
        effect: (va.effect ?? 'confetti-burst') as any,
        position: (va.position ?? 'center') as any,
        delay_ms,
      };

    case 'emote':
      return {
        type: 'emote',
        target: (va.character ?? '') as any,
        emoji: va.emoji ?? va.text,
        text: va.text,
        delay_ms,
      };

    case 'sfx':
      return {
        type: 'sfx',
        sound: va.sound ?? 'react',
        delay_ms,
      };

    case 'camera_shake':
      return {
        type: 'camera_shake' as any,
        intensity: (typeof va.intensity === 'number' ? va.intensity : 0.5),
        duration: va.duration ?? 0.5,
        delay_ms,
      };

    case 'camera_zoom':
      return {
        type: 'camera_zoom' as any,
        target: va.target ?? 'center',
        speed: va.speed ?? 'medium',
        delay_ms,
      };

    case 'text_popup':
      return {
        type: 'text_popup' as any,
        text: va.text ?? '',
        position: (va.position ?? 'center') as 'top' | 'center' | 'bottom',
        size: va.size ?? 'large',
        delay_ms,
        duration_ms: 2000,
      };

    case 'screen_flash':
      return {
        type: 'screen_flash' as any,
        color: va.color ?? 'white',
        duration: va.duration ?? 0.2,
        delay_ms,
      };

    case 'crowd_react':
      return {
        type: 'crowd_react' as any,
        characters: va.characters ?? 'all',
        anim: resolveAnimationVerb(va.anim ?? 'celebrate'),
        delay_ms,
      };

    case 'spawn_rain':
      return {
        type: 'spawn_rain' as any,
        asset: va.asset ?? 'mystery_crate',
        count: va.quantity ?? 8,
        area: (va.position ?? 'wide') as any,
        delay_ms,
      };

    case 'delay':
      return {
        type: 'wait',
        duration_ms: (va.duration ?? 1) * 1000,
        delay_ms,
      };

    default:
      return null;
  }
}
