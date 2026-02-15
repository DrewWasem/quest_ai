/**
 * Level 4 Text Parser — extracts tags from free text using Haiku.
 *
 * Input: short text describing an action (1-6 words)
 * Output: Level4ParsedTags with action, modifier, vibe extracted
 * Fallback: if Haiku times out, uses first word as action tag
 */

import type { Level4ParsedTags } from '../types/madlibs';
import { callClaude } from './claude';

const PARSE_SYSTEM_PROMPT = `You extract tags from children's free text for a game.

Input: Short text describing an action (1-6 words)
Output: ONLY valid JSON, no markdown, no explanation:

{
  "action": "action_tag",
  "modifier": "modifier_tag",
  "vibe": "vibe_tag"
}

Rules:
- action, modifier, vibe are all OPTIONAL (can be null)
- Use simple lowercase single-word tags only
- If text is vague ("do something"), set all to null
- NEVER invent tags not implied by the text

Examples:
"dance with a pizza" -> {"action": "dance", "modifier": null, "vibe": "silly"}
"eat a GIANT cake" -> {"action": "eat", "modifier": "giant", "vibe": null}
"jump around happily" -> {"action": "jump", "modifier": null, "vibe": "happy"}
"do magic" -> {"action": "magic", "modifier": "magical", "vibe": null}
"throw confetti everywhere" -> {"action": "throw", "modifier": null, "vibe": "excited"}
"cook a spooky soup" -> {"action": "cook", "modifier": "spooky", "vibe": null}`;

export async function parseLevel4Text(
  rawText: string,
  character: string,
): Promise<Level4ParsedTags> {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return { character, rawText: trimmed };
  }

  try {
    const raw = await callClaude(PARSE_SYSTEM_PROMPT, trimmed, {
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
    console.warn('[TextParser] Parse failed, using literal text:', error);
    // Fallback: treat first content word as action (skip stop words)
    const STOP_WORDS = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'my', 'your', 'his', 'her', 'its', 'i', 'we', 'they', 'it', 'to', 'and', 'or', 'but', 'in', 'on', 'at', 'of', 'for', 'with', 'then', 'so', 'just', 'very', 'really']);
    const words = trimmed.toLowerCase().split(/\s+/);
    const contentWord = words.find(w => !STOP_WORDS.has(w)) ?? words[0];
    return {
      character,
      rawText: trimmed,
      action: contentWord,
    };
  }
}
