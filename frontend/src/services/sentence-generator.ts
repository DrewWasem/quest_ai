/**
 * Sentence Template Generator — uses Haiku to create fresh Mad Libs sentences.
 *
 * Sends zone theme + slot IDs to Haiku, gets back a fresh template sentence.
 * Validates all {SLOT_ID} placeholders are present. Falls back to hardcoded template.
 */

import type { QuestStage } from '../types/madlibs';
import { callHaiku } from './haiku-client';

const SENTENCE_TIMEOUT_MS = 3000;

/**
 * Generate a fresh sentence template for a quest stage.
 * Returns a string with {SLOT_ID} placeholders for each slot.
 * Falls back to the stage's built-in template on any failure.
 */
export async function generateSentenceTemplate(stage: QuestStage): Promise<string> {
  const fallback = stage.template.sentence;

  try {
    const slotIds = stage.template.slots.map(s => s.id);
    const slotDescs = stage.template.slots
      .map(s => `{${s.id}} — ${s.label}`)
      .join(', ');

    const systemPrompt = `You write one fun sentence template for a kids' fill-in-the-blank game (ages 8-10).

RULES:
- Include ALL these placeholders exactly: ${slotIds.map(id => `{${id}}`).join(', ')}
- Use {PLACEHOLDER} format with curly braces and UPPERCASE
- Keep it under 20 words
- Make it fun, silly, and age-appropriate
- Different from: "${fallback}"
- The sentence should make sense when blanks are filled in

ZONE: ${stage.title}
SLOTS: ${slotDescs}

Reply with ONLY the sentence template, nothing else.`;

    const userMessage = 'Write a new sentence template now.';

    const result = await callHaiku(systemPrompt, userMessage, 80, SENTENCE_TIMEOUT_MS);

    if (result) {
      const template = result.trim().replace(/^["']|["']$/g, ''); // strip quotes if present

      // Validate all slot placeholders are present
      const allPresent = slotIds.every(id => template.includes(`{${id}}`));
      if (allPresent) {
        console.log('[sentence-generator] New template:', template);
        return template;
      }
      console.warn('[sentence-generator] Template missing slots:', template);
    }
  } catch (err) {
    console.warn('[sentence-generator] Generation failed:', err);
  }

  console.log('[sentence-generator] Using fallback template');
  return fallback;
}
