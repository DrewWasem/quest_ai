/**
 * Level 4 Text Parser — extracts tags from free text using Haiku.
 *
 * Input: short text describing an action (1-6 words)
 * Output: Level4ParsedTags with action, modifier, vibe extracted
 * Fallback: if Haiku times out, uses keyword matching against valid tags
 */

import type { Level4ParsedTags } from '../types/madlibs';
import { callClaude } from './claude';

function buildParsePrompt(validTags?: Record<string, string[]>): string {
  const tagSection = validTags
    ? Object.entries(validTags)
        .map(([slot, values]) => `  ${slot}: ${values.join(', ')}`)
        .join('\n')
    : '';

  return `You extract tags from children's free text for a game.

Input: Short text describing an action (1-6 words)
Output: ONLY valid JSON, no markdown, no explanation:

{
  "action": "action_tag",
  "modifier": "modifier_tag",
  "vibe": "vibe_tag"
}

Rules:
- action, modifier, vibe are all OPTIONAL (can be null)
- If text is vague ("do something"), set all to null
${validTags ? `- You MUST use tags from this vocabulary when possible:
${tagSection}
- Map the child's words to the CLOSEST matching tag (e.g. "freeze" -> "ice_spell", "cook" -> "cook_perfectly", "grow" -> "grow_spell", "burn" -> "fire_spell", "float" -> "levitate", "change" -> "transform", "shrink" -> "shrink_spell", "dance" -> "dance", "explode" -> "explode", "calm" -> "calm_down", "wild" -> "go_wild")
- If no tag matches, set that field to null` : `- Use simple lowercase single-word tags only
- NEVER invent tags not implied by the text`}

Examples:
"freeze it with ice" -> {"action": "ice_spell", "modifier": null, "vibe": null}
"cook it perfectly" -> {"action": "cook_perfectly", "modifier": null, "vibe": null}
"make it grow giant" -> {"action": "grow_spell", "modifier": null, "vibe": null}
"set it on fire" -> {"action": "fire_spell", "modifier": null, "vibe": null}
"do something wild" -> {"action": null, "modifier": null, "vibe": "go_wild"}
"dance with a pizza" -> {"action": "dance", "modifier": null, "vibe": null}`;
}

/**
 * Extract valid tag vocabulary from a set of vignettes' triggers.
 */
export function extractValidTags(
  vignettes: Array<{ trigger: Record<string, string> }>,
): Record<string, string[]> {
  const tagSets: Record<string, Set<string>> = {};

  for (const v of vignettes) {
    for (const [key, value] of Object.entries(v.trigger)) {
      if (value === '*' || value === 'default') continue;
      if (!tagSets[key]) tagSets[key] = new Set();
      tagSets[key].add(value);
    }
  }

  const result: Record<string, string[]> = {};
  for (const [key, values] of Object.entries(tagSets)) {
    result[key] = [...values].sort();
  }
  return result;
}

export async function parseLevel4Text(
  rawText: string,
  character: string,
  validTags?: Record<string, string[]>,
): Promise<Level4ParsedTags> {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return { character, rawText: trimmed };
  }

  // Build flat list of all valid tag values for keyword fallback
  const allValidValues = validTags
    ? new Set(Object.values(validTags).flat())
    : null;

  try {
    const prompt = buildParsePrompt(validTags);
    const raw = await callClaude(prompt, trimmed, {
      model: 'claude-haiku-4-5-20251001',
      maxTokens: 200,
      timeoutMs: 4000,
    });

    // Parse JSON (strip markdown if present)
    let cleaned = raw.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }
    const parsed = JSON.parse(cleaned);

    return {
      character,
      rawText: trimmed,
      action: parsed.action || undefined,
      modifier: parsed.modifier || undefined,
      vibe: parsed.vibe || undefined,
    };
  } catch (error) {
    console.warn('[TextParser] Parse failed, using keyword matching:', error);
    // Fallback: try to match words against valid tags
    const words = trimmed.toLowerCase().split(/\s+/);

    if (allValidValues) {
      // Try direct word matches against valid tag values
      const matched = words.find(w => allValidValues.has(w));
      if (matched) {
        return { character, rawText: trimmed, action: matched };
      }

      // Try partial matches (e.g. "freeze" in "ice_spell" won't work,
      // but "fire" in "fire_spell" will)
      for (const word of words) {
        for (const tag of allValidValues) {
          if (tag.includes(word) || word.includes(tag.replace('_spell', ''))) {
            return { character, rawText: trimmed, action: tag };
          }
        }
      }
    }

    // Last resort: use first content word
    const STOP_WORDS = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'my', 'your', 'his', 'her', 'its', 'i', 'we', 'they', 'it', 'to', 'and', 'or', 'but', 'in', 'on', 'at', 'of', 'for', 'with', 'then', 'so', 'just', 'very', 'really']);
    const contentWord = words.find(w => !STOP_WORDS.has(w)) ?? words[0];
    return {
      character,
      rawText: trimmed,
      action: contentWord,
    };
  }
}
