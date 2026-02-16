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
import type { Action, SceneScript, PromptAnalysis } from '../types/scene-script';
import { resolveAnimationVerb } from '../data/animation-verbs';
// VIGNETTE_OUTRO replaced by amplifyVignetteSteps' built-in celebration outro

/**
 * Resolve which vignette to play based on selected tags.
 */
export function resolveVignette(
  selectedTags: Record<string, string>,
  stage: QuestStage,
): Vignette {
  const vignettes = stage.vignettes;
  const slotIds = stage.template.slots.map(s => s.id);

  // For combo stages, also try matching with the first two slots swapped
  // so "Grow + Shrink" and "Shrink + Grow" both find the same combo vignette.
  const isCombo = !!stage.comboRequired && slotIds.length >= 2;
  const swappedTags = isCombo
    ? { ...selectedTags, [slotIds[0]]: selectedTags[slotIds[1]], [slotIds[1]]: selectedTags[slotIds[0]] }
    : selectedTags;

  // Priority 1: EXACT match (all tags)
  // undefined trigger keys are treated as wildcards so Stage 1 vignettes
  // can match in Stage 2 (which adds extra slots like ENERGY/WEATHER).
  const exact = vignettes.find(v => {
    return slotIds.every(id => {
      const triggerVal = v.trigger[id.toLowerCase()];
      return triggerVal === undefined || triggerVal === selectedTags[id] || triggerVal === '*';
    });
  });
  if (exact && !isAllWildcard(exact, slotIds)) return exact;

  // Priority 1b: EXACT match with swapped combo slots
  if (isCombo) {
    const swapExact = vignettes.find(v => {
      return slotIds.every(id => {
        const triggerVal = v.trigger[id.toLowerCase()];
        return triggerVal === undefined || triggerVal === swappedTags[id] || triggerVal === '*';
      });
    });
    if (swapExact && !isAllWildcard(swapExact, slotIds)) return swapExact;
  }

  // Priority 2: PAIR match (2+ EXACT tag matches, wildcards don't count)
  // Ranked by match count (best first), then by prompt quality on ties,
  // so good input reliably produces good scenes instead of random chaos.
  const SCORE_ORDER: Record<string, number> = { perfect: 3, partial: 2, chaotic: 1, funny_fail: 0 };
  const pairMatches: Array<{ v: Vignette; matchCount: number }> = [];
  for (const v of vignettes) {
    let matchCount = 0;
    for (const id of slotIds) {
      const triggerVal = v.trigger[id.toLowerCase()];
      // Only count exact tag matches — wildcards and undefined mean "don't care"
      if (triggerVal === selectedTags[id]) matchCount++;
    }
    // Also try swapped tags for combo stages
    if (isCombo) {
      let swapCount = 0;
      for (const id of slotIds) {
        const triggerVal = v.trigger[id.toLowerCase()];
        if (triggerVal === swappedTags[id]) swapCount++;
      }
      matchCount = Math.max(matchCount, swapCount);
    }
    if (matchCount >= 2 && matchCount < slotIds.length) {
      pairMatches.push({ v, matchCount });
    }
  }
  if (pairMatches.length > 0) {
    pairMatches.sort((a, b) => {
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      return (SCORE_ORDER[b.v.promptScore] ?? 1) - (SCORE_ORDER[a.v.promptScore] ?? 1);
    });
    return pairMatches[0].v;
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
  return slotIds.every(id => {
    const val = v.trigger[id.toLowerCase()];
    return val === '*' || val === undefined;
  });
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
 * Pad vignette steps to ensure minimum action count for engaging scenes.
 * Adds contextual reactions/effects based on prompt score and existing characters.
 * Called BEFORE amplification so both systems compound.
 */
function padVignetteSteps(steps: VignetteStep[], promptScore: string, minActions = 30): VignetteStep[] {
  const actionCount = steps.reduce((sum, s) => sum + s.parallel.length, 0);
  if (actionCount >= minActions) return steps;

  // Extract character names from existing steps
  const chars = new Set<string>();
  for (const step of steps) {
    for (const a of step.parallel) {
      if (a.character && typeof a.character === 'string') {
        chars.add(a.character);
      }
    }
  }
  const charList = [...chars];
  const main = charList[0] || 'skeleton';
  const isFail = promptScore === 'funny_fail' || promptScore === 'chaotic';

  const extra: VignetteStep[] = [];
  let count = actionCount;

  // Block A: Main character reacts (+3)
  if (count < minActions) {
    extra.push({ parallel: [
      { action: 'animate', character: main, anim: isFail ? 'Hit_A' : 'Cheering' },
      { action: 'emote', character: main, emoji: isFail ? 'dizzy' : 'star_eyes', text: isFail ? 'Whoa!' : 'WOW!' },
      { action: 'sfx', sound: isFail ? 'fail' : 'react' },
    ], delayAfter: 1.5 });
    count += 3;
  }

  // Block B: Scene sparkle (+2)
  if (count < minActions) {
    extra.push({ parallel: [
      { action: 'react', effect: isFail ? 'explosion-cartoon' : 'sparkle-magic', position: 'cs-center' },
      { action: 'sfx', sound: 'react' },
    ], delayAfter: 0.8 });
    count += 2;
  }

  // Block C: Second character reacts (+2)
  if (count < minActions && charList[1]) {
    extra.push({ parallel: [
      { action: 'animate', character: charList[1], anim: 'Waving' },
      { action: 'emote', character: charList[1], emoji: isFail ? 'confused' : 'excited' },
    ], delayAfter: 1.2 });
    count += 2;
  }

  // Block D: Crowd reaction (+2)
  if (count < minActions) {
    extra.push({ parallel: [
      { action: 'crowd_react', characters: 'all', anim: isFail ? 'Hit_A' : 'Cheering' },
      { action: 'sfx', sound: isFail ? 'react' : 'success' },
    ], delayAfter: 1.0 });
    count += 2;
  }

  // Block E: Main speaks (+3)
  if (count < minActions) {
    extra.push(
      { parallel: [
        { action: 'animate', character: main, anim: 'Waving' },
        { action: 'emote', character: main, emoji: isFail ? 'laughing' : 'happy', text: isFail ? 'Well THAT happened!' : 'That was amazing!' },
      ], delayAfter: 2.0 },
      { parallel: [
        { action: 'animate', character: main, anim: 'Idle_A' },
      ], delayAfter: 0.3 },
    );
    count += 3;
  }

  // Block F: Camera shake + effects (+3)
  if (count < minActions) {
    extra.push({ parallel: [
      { action: 'react', effect: isFail ? 'sad-cloud' : 'confetti-burst', position: 'cs-center' },
      { action: 'camera_shake', intensity: 0.2, duration: 0.3 },
      { action: 'sfx', sound: 'impact' },
    ], delayAfter: 0.6 });
    count += 3;
  }

  // Block G: Multi-character emotes (+varies)
  if (count < minActions) {
    const emojis = isFail ? ['surprised', 'confused', 'laughing'] : ['love', 'happy', 'star_eyes'];
    extra.push({ parallel: [
      ...charList.slice(0, 3).map((c, i) => ({ action: 'emote', character: c, emoji: emojis[i % emojis.length] })),
      { action: 'react', effect: 'sparkle-magic', position: 'cs-left' },
      { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
    ], delayAfter: 1.0 });
    count += Math.min(charList.length, 3) + 2;
  }

  // Block H: Finale celebration/disappointment (+varies)
  if (count < minActions) {
    if (isFail) {
      extra.push(
        { parallel: [
          ...charList.slice(0, 3).map(c => ({ action: 'animate', character: c, anim: 'Hit_A' })),
          { action: 'react', effect: 'question-marks', position: 'cs-center' },
          { action: 'sfx', sound: 'fail' },
        ], delayAfter: 0.5 },
        { parallel: [
          { action: 'react', effect: 'sad-cloud', position: 'cs-center' },
        ], delayAfter: 1.0 },
      );
    } else {
      extra.push(
        { parallel: [
          ...charList.slice(0, 3).map(c => ({ action: 'animate', character: c, anim: 'Cheering' })),
          { action: 'react', effect: 'confetti-burst', position: 'cs-center' },
          { action: 'sfx', sound: 'success' },
        ], delayAfter: 0.5 },
        { parallel: [
          { action: 'react', effect: 'celebrating', position: 'cs-center' },
        ], delayAfter: 1.0 },
      );
    }
    count += Math.min(charList.length, 3) + 3;
  }

  // Block I: Extra emotes if still short (+1 each)
  const extraEmojis = isFail
    ? ['laughing', 'dizzy', 'confused', 'surprised', 'angry']
    : ['happy', 'love', 'star_eyes', 'excited', 'music'];
  let ei = 0;
  while (count < minActions && ei < extraEmojis.length) {
    extra.push({ parallel: [
      { action: 'emote', character: charList[ei % (charList.length || 1)] || main, emoji: extraEmojis[ei] },
    ], delayAfter: 1.0 });
    count += 1;
    ei++;
  }

  // Block J: Trailing sparkle effects as last resort (+2 each)
  while (count < minActions) {
    extra.push({ parallel: [
      { action: 'react', effect: 'sparkle-magic', position: ['cs-left', 'cs-center', 'cs-right'][count % 3] },
      { action: 'sfx', sound: 'react' },
    ], delayAfter: 0.5 });
    count += 2;
  }

  return [...steps, ...extra];
}

/**
 * Amplify vignette steps to ~3x length for spectacular scenes.
 * After each step, inserts a contextual reaction/effect step.
 * Adds a rich 3-step celebration outro.
 */
function amplifyVignetteSteps(steps: VignetteStep[]): VignetteStep[] {
  const EFFECTS: VignetteAction['effect'][] = ['sparkle-magic', 'confetti-burst', 'celebrating'];
  const POSITIONS = ['cs-center', 'cs-left', 'cs-right'];
  const result: VignetteStep[] = [];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    // Push original step with original delay (keeping natural pacing)
    result.push({ ...step, delayAfter: step.delayAfter ?? 0.5 });

    const actions = step.parallel;
    const hasCharSpawn = actions.some(a => a.action === 'spawn_character');
    const hasPropSpawn = actions.some(a => a.action === 'spawn' && !a.character);
    const hasAnimate = actions.some(a => a.action === 'animate');
    const hasMove = actions.some(a => a.action === 'move');
    const hasEmote = actions.some(a => a.action === 'emote');
    const hasPopup = actions.some(a => a.action === 'text_popup');
    const hasReact = actions.some(a => a.action === 'react');
    const hasCrowd = actions.some(a => a.action === 'crowd_react');

    // Insert contextual amplification step after each original step
    if (hasCharSpawn) {
      // Character entrance sparkle
      const chars = actions.filter(a => a.action === 'spawn_character');
      result.push({
        parallel: [
          ...chars.map(c => ({ action: 'emote' as const, character: c.character!, emoji: '✨' })),
          { action: 'react' as const, effect: 'sparkle-magic', position: POSITIONS[i % 3] },
          { action: 'sfx' as const, sound: 'spawn' },
        ],
        delayAfter: 0.4,
      });
    } else if (hasPropSpawn) {
      // Prop reveal sparkle
      result.push({
        parallel: [
          { action: 'react' as const, effect: 'sparkle-magic', position: POSITIONS[i % 3] },
          { action: 'sfx' as const, sound: 'react' },
        ],
        delayAfter: 0.3,
      });
    } else if (hasMove) {
      // Movement trail
      result.push({
        parallel: [
          { action: 'sfx' as const, sound: 'whoosh' },
          { action: 'react' as const, effect: 'sparkle-magic', position: POSITIONS[(i + 1) % 3] },
        ],
        delayAfter: 0.3,
      });
    } else if (hasAnimate && !hasCrowd) {
      // Animation reaction burst
      result.push({
        parallel: [
          { action: 'react' as const, effect: EFFECTS[i % EFFECTS.length], position: POSITIONS[i % 3] },
          { action: 'sfx' as const, sound: 'react' },
        ],
        delayAfter: 0.4,
      });
    } else if (hasEmote || hasPopup) {
      // Emphasis effect
      result.push({
        parallel: [
          { action: 'react' as const, effect: 'celebrating', position: 'cs-center' },
          { action: 'sfx' as const, sound: 'react' },
        ],
        delayAfter: 0.4,
      });
    } else if (hasReact && !hasCrowd) {
      // Echo reaction at different position
      result.push({
        parallel: [
          { action: 'react' as const, effect: 'sparkle-magic', position: POSITIONS[(i + 1) % 3] },
        ],
        delayAfter: 0.3,
      });
    }
    // Skip amplification for SFX-only or crowd-react steps (already dramatic)
  }

  // Rich 3-step celebration outro
  result.push(
    { parallel: [
      { action: 'crowd_react', characters: 'all', anim: 'Cheering' },
      { action: 'sfx', sound: 'success' },
    ], delayAfter: 0.6 },
    { parallel: [
      { action: 'react', effect: 'confetti-burst', position: 'cs-center' },
      { action: 'react', effect: 'sparkle-magic', position: 'cs-left' },
      { action: 'react', effect: 'sparkle-magic', position: 'cs-right' },
      { action: 'sfx', sound: 'react' },
    ], delayAfter: 0.8 },
    { parallel: [
      { action: 'react', effect: 'celebrating', position: 'cs-center' },
      { action: 'crowd_react', characters: 'all', anim: 'wave' },
    ], delayAfter: 1.0 },
  );

  return result;
}

/**
 * Convert a Vignette into a SceneScript for the playback engine.
 */
export function buildVignetteScript(
  vignette: Vignette,
  _selectedTags: Record<string, string>,
): SceneScript {
  // Pad short vignettes to 30+ actions, then amplify for spectacular scenes
  const padded = padVignetteSteps(vignette.steps, vignette.promptScore);
  const amplified = amplifyVignetteSteps(padded);
  const actions = vignetteStepsToActions(amplified);

  // Map prompt score to success level
  const successMap: Record<string, 'FULL_SUCCESS' | 'PARTIAL_SUCCESS' | 'FUNNY_FAIL'> = {
    perfect: 'FULL_SUCCESS',
    chaotic: 'FUNNY_FAIL',
    partial: 'PARTIAL_SUCCESS',
    funny_fail: 'FUNNY_FAIL',
  };

  // Synthesize prompt_analysis from vignette content so badges work in Mad Libs mode
  const tagCount = Object.keys(_selectedTags).length;
  const charActions = vignette.steps.flatMap(s => s.parallel).filter(a => a.action === 'spawn_character');
  const uniqueChars = new Set(charActions.map(a => a.character).filter(Boolean));
  const hasEnvProps = vignette.steps.some(s => s.parallel.some(a => a.action === 'spawn' && !a.character));

  const prompt_analysis: PromptAnalysis = {
    has_character: uniqueChars.size > 0,
    has_action: tagCount >= 2,
    has_sequence: tagCount >= 3 || vignette.steps.length >= 4,
    has_detail: vignette.promptScore === 'perfect',
    has_multi_char: uniqueChars.size >= 2,
    has_environment: hasEnvProps,
  };

  return {
    success_level: successMap[vignette.promptScore] ?? 'PARTIAL_SUCCESS',
    narration: vignette.feedback.title,
    actions,
    prompt_feedback: vignette.feedback.message,
    guide_hint: vignette.feedback.tip,
    prompt_analysis,
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
        duration_ms: va.duration ?? 1000,  // Already in ms from DRAMATIC_PAUSE macro
        delay_ms,
      };

    case 'remove':
      return {
        type: 'remove',
        target: (va.asset ?? va.character ?? '') as any,
        delay_ms,
      };

    default:
      return null;
  }
}
