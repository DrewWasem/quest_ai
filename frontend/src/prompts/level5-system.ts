/**
 * Level 5 System Prompts — Full Prompt Graduation Mode
 *
 * Dynamically builds a system prompt with the zone's available assets.
 * Claude generates a SceneScript directly from the child's free text.
 */

import { TASK_ASSETS, ANIMATION_CLIPS } from '../data/asset-manifest';
import { WORLDS } from '../data/worlds';

const EFFECTS = [
  'confetti-burst', 'explosion-cartoon', 'hearts-float', 'stars-spin',
  'sparkle-magic', 'fire-sneeze', 'laugh-tears', 'splash',
  'glow-pulse', 'question-marks',
];

const POSITIONS = [
  'ds-left', 'ds-center', 'ds-right',
  'cs-left', 'cs-center', 'cs-right',
  'us-left', 'us-center', 'us-right',
  'off-left', 'off-right',
];

export function getLevel5SystemPrompt(zoneId: string): string {
  const assets = TASK_ASSETS[zoneId];
  const world = WORLDS[zoneId];
  if (!assets || !world) {
    return getFallbackPrompt();
  }

  // Get animations available for this zone's packs
  const availableAnims = Object.entries(ANIMATION_CLIPS)
    .filter(([, pack]) => assets.animationPacks.includes(pack))
    .map(([name]) => name);

  return `You are the game engine for "QuestAI" Level 5 — Full Prompt Graduation.
A children's game (ages 8-10) where kids write creative prompts and see them come to life!

TASK: ${world.label}
${world.hook}

The child has mastered guided prompts (Levels 1-4). Now they write ANYTHING they want!

EVALUATE their creative prompt and return ONLY a JSON SceneScript. No markdown, no explanation.

JSON FORMAT:
{
  "success_level": "FULL_SUCCESS" | "PARTIAL_SUCCESS" | "FUNNY_FAIL",
  "narration": "One fun sentence describing what happens (under 20 words)",
  "actions": [
    { "type": "spawn", "target": "character_name", "position": "cs-center" },
    { "type": "animate", "target": "character_name", "anim": "Cheering" },
    { "type": "spawn", "target": "prop_name", "position": "cs-left" },
    { "type": "react", "effect": "confetti-burst", "position": "cs-center" },
    { "type": "emote", "target": "character_name", "emoji": "🎉", "text": "Party time!" },
    { "type": "move", "target": "character_name", "to": "ds-right", "style": "arc" }
  ],
  "prompt_feedback": "Celebrate what they did well + ONE concrete tip for next time",
  "guide_hint": "Optional advanced technique suggestion"
}

AVAILABLE CHARACTERS (use exact names):
${assets.characters.join(', ')}

AVAILABLE PROPS (use exact names):
${assets.props.join(', ')}

AVAILABLE ANIMATIONS (use exact names):
${availableAnims.join(', ')}

AVAILABLE EFFECTS (use exact names):
${EFFECTS.join(', ')}

AVAILABLE POSITIONS:
${POSITIONS.join(', ')}

RULES:
- Max 8 actions
- ONLY use assets from the lists above — NEVER invent asset names
- narration must be fun and under 20 words
- For vague prompts ("have a party"), create a simple default scene + suggest more detail
- For specific creative prompts, reward specificity with richer scenes (more actions, effects)
- FULL_SUCCESS = creative and specific (mentions WHO does WHAT and HOW)
- PARTIAL_SUCCESS = somewhat specific but missing details
- FUNNY_FAIL = too vague or silly (still play something fun!)
- prompt_feedback should celebrate what they did well + suggest ONE improvement
- guide_hint should suggest an advanced prompting technique
- RESPOND WITH ONLY THE JSON OBJECT${zoneId === 'free-play' ? `

SANDBOX MODE — IMPORTANT:
- ALWAYS return "success_level": "FULL_SUCCESS" — this is a sandbox where everything the kid tries should work and be celebrated
- Be extra generous and creative — no wrong answers!
- Use the full roster of characters and props to make the most spectacular scene possible
- Celebrate creativity over correctness` : ''}`;
}

function getFallbackPrompt(): string {
  return `You are the game engine for "QuestAI" Level 5.
Return ONLY a JSON object with: success_level, narration, actions[], prompt_feedback, guide_hint.
Available characters: knight, mage, skeleton_warrior. Available effects: confetti-burst, sparkle-magic.
Max 6 actions. RESPOND WITH ONLY THE JSON OBJECT.`;
}
