/**
 * Vignette Selector — Haiku-assisted vignette selection.
 *
 * Flow: rankVignettes() → top 5 → send descriptions to Haiku → parse pick → return vignette.
 * Fallback: rank #1 (always works, no API needed).
 */

import type { Vignette, QuestStage } from '../types/madlibs';
import { rankVignettes } from './vignette-resolver';
import { callHaiku } from './haiku-client';

const SELECTION_TIMEOUT_MS = 4000;

/**
 * Select the best vignette for a given tag combination.
 * Uses Haiku to pick from the top 5 pre-filtered candidates.
 * Falls back to the highest-ranked vignette on any failure.
 */
export async function selectVignette(
  selectedTags: Record<string, string>,
  filledSentence: string,
  stage: QuestStage,
): Promise<Vignette> {
  const ranked = rankVignettes(selectedTags, stage);
  const topN = ranked.slice(0, 5);
  const fallback = topN[0].vignette;

  // If only 1 candidate or top score is way ahead, skip API call
  if (topN.length <= 1 || topN[0].score >= topN[1].score + 5) {
    console.log('[vignette-selector] Clear winner, skipping Haiku:', fallback.id);
    return fallback;
  }

  try {
    const systemPrompt = `You pick the best scene for a kids' game (ages 8-10).
Given the player's filled-in sentence and a numbered list of scene descriptions,
reply with ONLY the number (1-${topN.length}) of the scene that best matches.
Pick the scene whose description most closely fits what the player wrote.
Reply with just the number, nothing else.`;

    const descriptions = topN
      .map((entry, i) => `${i + 1}. ${entry.vignette.description}`)
      .join('\n');

    const userMessage = `Player wrote: "${filledSentence}"

Scenes:
${descriptions}

Which scene number best matches?`;

    const result = await callHaiku(systemPrompt, userMessage, 8, SELECTION_TIMEOUT_MS);

    if (result) {
      const num = parseInt(result.trim(), 10);
      if (num >= 1 && num <= topN.length) {
        const picked = topN[num - 1].vignette;
        console.log(`[vignette-selector] Haiku picked #${num}: ${picked.id}`);
        return picked;
      }
      console.warn('[vignette-selector] Haiku returned invalid number:', result);
    }
  } catch (err) {
    console.warn('[vignette-selector] Haiku selection failed:', err);
  }

  console.log('[vignette-selector] Falling back to rank #1:', fallback.id);
  return fallback;
}
