# Plan: Level 4 (Hybrid Guided Free Text) and Level 5 (Full Prompt Graduation)

**Created:** 2026-02-14
**Status:** draft
**Research:** Current Mad Libs system (Stages 1-3 complete, 455 props, 30+ characters, 139 animations)

## Goal

Add two new progression levels after Stage 3 completion:
- Level 4 (Hybrid): Character dropdown + free text action/modifier fields, matched against existing vignettes
- Level 5 (Full Prompt): Single text field + live Claude API, generates custom SceneScript dynamically

## Approach

### Level 4 Architecture
- Reuse existing vignette matching system (resolveVignette with 5-priority matching)
- Use Haiku/Sonnet to parse free text → tag extraction (action, modifier, vibe)
- Keep character as dropdown to constrain scope
- Ghost text examples to guide kids
- Falls back to closest vignette match (no hard failures)
- Teaching moment: show kids that specific text gets better results

### Level 5 Architecture
- Full free text prompt in single field
- Live Claude API call with asset vocabulary system prompt
- Generate SceneScript directly (same format as existing system)
- Uses existing ScenePlayer3D (no changes needed)
- Two-tier fallback: API timeout → generic fallback script
- Track Level 5 completions separately (no vignette discovery)

### Progression Gates
- Level 4 unlocks after completing any Stage 3 (comboRequired >= 4)
- Level 5 unlocks after 3 successful Level 4 submissions
- Both levels available per zone (each zone has L4 + L5)

## Phase 1: Type Definitions and Data Structures

### Task 1.1: Add Level 4/5 types to madlibs.ts
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/types/madlibs.ts`
**Action:** Add new interfaces after existing types (line 233+):
```typescript
// ─── LEVEL 4/5 TYPES ─────────────────────────────────────────────────────────

export interface Level4Stage extends Omit<QuestStage, 'template' | 'vignettes' | 'defaultVignette'> {
  stageNumber: 4;
  characterSlot: TemplateSlot;  // Reuse existing character slot
  freeTextFields: Array<{
    id: string;              // 'ACTION', 'MODIFIER'
    label: string;           // 'What should they do?'
    placeholder: string;     // 'dance with a pizza'
    maxLength: number;       // 40
    ghostExamples: string[]; // ['eat a giant cake', 'dance', 'throw confetti']
  }>;
  vignettes: Vignette[];     // Same vignettes as Stage 1-3
  defaultVignette: Vignette;
  requiredSuccesses?: number; // How many to unlock Level 5 (default: 3)
}

export interface Level5Stage {
  id: string;
  questId: string;
  stageNumber: 5;
  title: string;
  intro: string;
  promptPlaceholder: string;  // "Make the knight dance with a pizza"
  sentenceStarters: string[]; // ["Make the", "Tell the", "Have the"]
  systemPromptKey: string;    // Maps to prompts/{zone}-level5.ts
}

export interface Level4ParsedTags {
  character: string;    // From dropdown
  action?: string;      // Extracted from free text
  modifier?: string;    // Extracted from free text
  vibe?: string;        // Extracted from free text
  rawText: string;      // Original text for feedback
}
```
**Verify:**
- [ ] Automated: `npm run build` → no TypeScript errors
- [ ] Manual: Interfaces compile, no conflicts with existing QuestStage

### Task 1.2: Add Level 4/5 state to gameStore.ts
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/stores/gameStore.ts`
**Action:** Add state fields after `discoveredVignettes` (line 63):
```typescript
  level4Successes: Record<string, number>;  // { 'skeleton-birthday': 2, ... }
  level5Unlocked: Record<string, boolean>;  // { 'skeleton-birthday': true, ... }
  level4ParseCache: Record<string, Level4ParsedTags>;  // Cache Haiku parses
```
Add to LevelData interface (line 18):
```typescript
  level4Successes: Record<string, number>;
  level5Unlocked: Record<string, boolean>;
```
Add actions before `advanceStage` (line 98):
```typescript
  recordLevel4Success: (zoneId: string) => void;
  unlockLevel5: (zoneId: string) => void;
  cacheLevel4Parse: (key: string, tags: Level4ParsedTags) => void;
```
**Verify:**
- [ ] Automated: `npm run build` → no errors
- [ ] Manual: Open DevTools → `__gameStore.getState()` shows new fields

### Task 1.3: Implement Level 4/5 persistence in gameStore
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/stores/gameStore.ts`
**Action:** Update loadLevels (line 21-27):
```typescript
  return {
    stageNumbers: {},
    stageCompleted: {},
    discoveredVignettes: {},
    level4Successes: {},
    level5Unlocked: {},
  };
```
Implement new actions before closing `}))` (line 350):
```typescript
  recordLevel4Success: (zoneId: string) => {
    const { level4Successes, level5Unlocked, stageNumbers, stageCompleted, discoveredVignettes } = get();
    const count = (level4Successes[zoneId] ?? 0) + 1;
    const updated = { ...level4Successes, [zoneId]: count };
    const data = { stageNumbers, stageCompleted, discoveredVignettes, level4Successes: updated, level5Unlocked };
    saveLevels(data);
    set({ level4Successes: updated });

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

  cacheLevel4Parse: (key: string, tags: Level4ParsedTags) => {
    set((s) => ({ level4ParseCache: { ...s.level4ParseCache, [key]: tags } }));
  },
```
Initialize state fields after line 165:
```typescript
  level4Successes: _savedLevels.level4Successes ?? {},
  level5Unlocked: _savedLevels.level5Unlocked ?? {},
  level4ParseCache: {},
```
**Verify:**
- [ ] Automated: `npm run build` → compiles
- [ ] Manual: Call `recordLevel4Success('skeleton-birthday')` 3x in console → check localStorage

## Phase 2: Level 4 Text Parser Service

### Task 2.1: Create text-parser service with Haiku
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/services/text-parser.ts`
**Action:** Create new file with Haiku-based parsing:
```typescript
import type { Level4ParsedTags } from '../types/madlibs';
import { callClaude } from './claude';

const TIMEOUT_MS = 4000; // Faster timeout for Haiku

const PARSE_SYSTEM_PROMPT = `You extract tags from children's free text for a game.

Input: Short text describing an action (1-6 words)
Output: ONLY valid JSON, no markdown, no explanation:

{
  "action": "action_tag",    // eat, throw, dance, jump, sing, fight, sleep, cook, build, etc.
  "modifier": "modifier_tag", // giant, tiny, fast, slow, spooky, silly, magical, etc.
  "vibe": "vibe_tag"         // happy, sad, angry, excited, scared, calm, etc.
}

Rules:
- action, modifier, vibe are all OPTIONAL (can be null)
- Use simple lowercase tags only
- If text is vague ("do something"), set all to null
- NEVER invent tags not implied by the text

Examples:
"dance with a pizza" → {"action": "dance", "modifier": null, "vibe": "silly"}
"eat a GIANT cake" → {"action": "eat", "modifier": "giant", "vibe": null}
"jump around happily" → {"action": "jump", "modifier": null, "vibe": "happy"}
"do magic" → {"action": "magic", "modifier": "magical", "vibe": null}`;

export async function parseLevel4Text(
  rawText: string,
  character: string,
): Promise<Level4ParsedTags> {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return { character, rawText, action: undefined, modifier: undefined, vibe: undefined };
  }

  try {
    const raw = await Promise.race([
      callClaude(PARSE_SYSTEM_PROMPT, trimmed),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS)),
    ]);

    // Parse JSON (strip markdown if present)
    let cleaned = raw.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }
    const parsed = JSON.parse(cleaned);

    return {
      character,
      rawText,
      action: parsed.action || undefined,
      modifier: parsed.modifier || undefined,
      vibe: parsed.vibe || undefined,
    };
  } catch (error) {
    console.warn('[TextParser] Parse failed, using literal text:', error);
    // Fallback: treat entire text as action
    return {
      character,
      rawText,
      action: trimmed.toLowerCase().split(' ')[0], // First word as action
      modifier: undefined,
      vibe: undefined,
    };
  }
}
```
**Verify:**
- [ ] Automated: `npm run build` → compiles
- [ ] Manual: Import in console → test `parseLevel4Text('dance with pizza', 'knight')` → check output

### Task 2.2: Add Level 4 vignette matcher
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/services/vignette-resolver.ts`
**Action:** Add new function after `rankVignettes` (line 105):
```typescript
/**
 * Match Level 4 parsed tags to existing vignettes.
 * Converts Level4ParsedTags → Record<string, string> for resolveVignette.
 */
export function resolveLevel4Vignette(
  parsed: import('../types/madlibs').Level4ParsedTags,
  stage: import('../types/madlibs').Level4Stage,
): Vignette {
  // Build selectedTags from parsed fields
  const selectedTags: Record<string, string> = {
    character: parsed.character,
  };

  if (parsed.action) selectedTags.action = parsed.action;
  if (parsed.modifier) selectedTags.modifier = parsed.modifier;
  if (parsed.vibe) selectedTags.vibe = parsed.vibe;

  // Use existing 5-priority matching
  // Cast stage to QuestStage (compatible structure)
  const vignette = resolveVignette(selectedTags, stage as any);

  return vignette;
}
```
**Verify:**
- [ ] Automated: `npm run build` → no errors
- [ ] Manual: Test in console with mock parsed tags and Stage 1 data

## Phase 3: Level 4 Data and UI

### Task 3.1: Define Level 4 stage data for skeleton-birthday
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/data/quest-stages.ts`
**Action:** Add Level 4 stage after Stage 3 (insert after skeleton-birthday Stage 3, around line 200):
```typescript
  {
    id: 'skeleton-birthday-4',
    questId: 'skeleton-birthday',
    stageNumber: 4,
    title: "Party Mastermind",
    intro: "You're getting really good at this! Now try describing the party in your own words.",
    characterSlot: {
      id: 'CHARACTER',
      label: 'Party Guest',
      icon: '🎭',
      allowedTags: ['skeleton_warrior', 'skeleton_mage', 'knight', 'mage', 'rogue'],
      defaultOptions: [
        { label: 'Skeleton', tag: 'skeleton_warrior', icon: '💀' },
        { label: 'Skeleton Mage', tag: 'skeleton_mage', icon: '🧙‍♂️' },
        { label: 'Knight', tag: 'knight', icon: '🛡️' },
        { label: 'Mage', tag: 'mage', icon: '🪄' },
        { label: 'Rogue', tag: 'rogue', icon: '🗡️' },
      ],
    },
    freeTextFields: [
      {
        id: 'ACTION',
        label: 'What should they do?',
        placeholder: 'Type what happens...',
        maxLength: 50,
        ghostExamples: ['eat a giant cake', 'dance with a pizza', 'throw confetti', 'do magic tricks'],
      },
    ],
    vignettes: SKELETON_BIRTHDAY_STAGE_1, // Reuse Stage 1 vignettes
    defaultVignette: SKELETON_BIRTHDAY_DEFAULT,
    requiredSuccesses: 3,
  } as Level4Stage,
```
Import Level4Stage at top:
```typescript
import type { QuestStage, Level4Stage } from '../types/madlibs';
```
**Verify:**
- [ ] Automated: `npm run build` → compiles
- [ ] Manual: Check SKELETON_BIRTHDAY_STAGES array length increases by 1

### Task 3.2: Create Level4Input component
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/components/Level4Input.tsx`
**Action:** Create new component based on MadLibsInput structure:
```typescript
/**
 * Level4Input — Hybrid guided free text input.
 * Character dropdown + free text action field.
 */

import { useState, useCallback } from 'react';
import { useGameStore } from '../stores/gameStore';
import { useTTS } from '../hooks/useTTS';
import type { Level4Stage, Level4ParsedTags, Vignette } from '../types/madlibs';
import { buildVignetteScript, resolveLevel4Vignette } from '../services/vignette-resolver';
import { parseLevel4Text } from '../services/text-parser';
import FeedbackCard from './FeedbackCard';

interface Level4InputProps {
  stage: Level4Stage;
}

export default function Level4Input({ stage }: Level4InputProps) {
  const {
    setLastScript,
    setVignetteSteps,
    recordLevel4Success,
    level4Successes,
    level5Unlocked,
    cacheLevel4Parse,
  } = useGameStore();

  const { speak } = useTTS();

  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [actionText, setActionText] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [feedback, setFeedback] = useState<{
    vignette: Vignette;
    parsedTags: Level4ParsedTags;
  } | null>(null);

  const currentSuccesses = level4Successes[stage.questId] ?? 0;
  const isLevel5Unlocked = level5Unlocked[stage.questId] ?? false;

  const handleGo = useCallback(async () => {
    if (!selectedCharacter || !actionText.trim()) return;

    setIsPlaying(true);
    setIsParsing(true);
    setFeedback(null);

    try {
      // Parse free text → tags
      const parsed = await parseLevel4Text(actionText, selectedCharacter);
      cacheLevel4Parse(`${stage.questId}-${actionText}`, parsed);

      setIsParsing(false);

      // Match to vignette
      const vignette = resolveLevel4Vignette(parsed, stage);
      const script = buildVignetteScript(vignette, { character: parsed.character });

      // Track success if not default vignette
      if (vignette.id !== stage.defaultVignette.id && vignette.promptScore === 'perfect') {
        recordLevel4Success(stage.questId);
      }

      // Send to playback
      setLastScript(script);
      setVignetteSteps(vignette.steps);

      if (script.narration) {
        speak(script.narration);
      }

      // Show feedback after playback
      setTimeout(() => {
        setFeedback({ vignette, parsedTags: parsed });
        setIsPlaying(false);
      }, 5000);
    } catch (error) {
      console.error('[Level4Input] Error:', error);
      setIsPlaying(false);
      setIsParsing(false);
    }
  }, [selectedCharacter, actionText, stage, recordLevel4Success, setLastScript, setVignetteSteps, speak, cacheLevel4Parse]);

  const handleTryAgain = useCallback(() => {
    setFeedback(null);
    setActionText('');
    setVignetteSteps(null);
  }, [setVignetteSteps]);

  return (
    <div className="relative px-5 py-4 bg-quest-panel-bg/90 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-quest-purple/30 to-transparent" />

      {feedback && (
        <div className="mb-4">
          <FeedbackCard
            feedback={feedback.vignette.feedback}
            promptScore={feedback.vignette.promptScore}
            filledSentence={`${feedback.parsedTags.character}: ${feedback.parsedTags.rawText}`}
            discoveredCount={currentSuccesses}
            totalVignettes={stage.requiredSuccesses ?? 3}
            onTryAgain={handleTryAgain}
            onNextStage={isLevel5Unlocked ? undefined : undefined}
            vagueComparison={feedback.vignette.vagueComparison}
          />
          {currentSuccesses >= (stage.requiredSuccesses ?? 3) && !isLevel5Unlocked && (
            <div className="mt-3 p-3 bg-quest-yellow/20 border-2 border-quest-yellow rounded-xl">
              <p className="font-heading font-bold text-quest-text-dark">
                🎓 Level 5 Unlocked! You can now write full prompts!
              </p>
            </div>
          )}
        </div>
      )}

      {!feedback && (
        <>
          <div className="mb-4">
            <label className="block font-heading font-bold text-sm text-quest-text-dark mb-2">
              {stage.characterSlot.icon} {stage.characterSlot.label}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {stage.characterSlot.defaultOptions.map((opt) => (
                <button
                  key={opt.tag}
                  onClick={() => setSelectedCharacter(opt.tag)}
                  disabled={isPlaying}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all
                    font-heading font-semibold text-sm
                    ${selectedCharacter === opt.tag
                      ? 'bg-quest-purple/15 border-quest-purple text-quest-purple shadow-md'
                      : 'bg-white/70 border-quest-border text-quest-text-dark hover:border-quest-purple/40'
                    }
                    ${isPlaying ? 'opacity-60 cursor-not-allowed' : ''}
                  `}
                >
                  <span className="text-lg">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-heading font-bold text-sm text-quest-text-dark mb-2">
              ✍️ {stage.freeTextFields[0].label}
            </label>
            <input
              type="text"
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
              placeholder={stage.freeTextFields[0].placeholder}
              maxLength={stage.freeTextFields[0].maxLength}
              disabled={isPlaying}
              className="input-magic w-full px-4 py-3 rounded-xl border-2 border-quest-border
                bg-white/80 font-body text-base text-quest-text-dark
                focus:border-quest-purple focus:ring-2 focus:ring-quest-purple/20
                disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {stage.freeTextFields[0].ghostExamples.slice(0, 3).map((example, i) => (
                <button
                  key={i}
                  onClick={() => setActionText(example)}
                  disabled={isPlaying}
                  className="text-xs px-2 py-1 rounded-lg bg-quest-purple/10 text-quest-purple
                    hover:bg-quest-purple/20 border border-quest-purple/30 font-heading"
                >
                  💡 {example}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 text-sm text-quest-text-mid font-body">
              Progress: {currentSuccesses} / {stage.requiredSuccesses ?? 3}
            </div>
            <button
              onClick={handleGo}
              disabled={!selectedCharacter || !actionText.trim() || isPlaying}
              className="btn-primary text-lg px-8 py-3 min-w-[140px] rounded-xl font-heading font-bold
                disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isParsing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Thinking...
                </span>
              ) : isPlaying ? (
                'Playing...'
              ) : (
                '▶️ GO!'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
```
**Verify:**
- [ ] Automated: `npm run build` → compiles
- [ ] Manual: Import and render in App.tsx temporarily → visual check

## Phase 4: Level 5 Full Prompt System

### Task 4.1: Create Level 5 system prompt with asset vocabulary
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/prompts/skeleton-birthday-level5.ts`
**Action:** Create new prompt file:
```typescript
export const SKELETON_BIRTHDAY_LEVEL5_PROMPT = `You are the game engine for "Quest AI" Level 5 — Full Prompt Graduation.

TASK: Skeleton's Birthday Party (Full Creative Mode)
The child has mastered guided prompts. Now they can write anything they want!

EVALUATE the child's full creative prompt and return ONLY a JSON SceneScript. No markdown, no explanation.

JSON FORMAT:
{
  "success_level": "FULL_SUCCESS" | "PARTIAL_SUCCESS" | "FUNNY_FAIL",
  "narration": "One fun sentence (under 20 words)",
  "actions": [
    { "type": "spawn", "target": "skeleton_warrior", "position": "center" },
    { "type": "animate", "target": "skeleton_warrior", "anim": "Cheering" },
    { "type": "react", "effect": "confetti-burst", "position": "center" }
  ],
  "prompt_feedback": "Celebrate their creativity + ONE concrete improvement tip",
  "guide_hint": "Optional advanced technique suggestion"
}

AVAILABLE CHARACTERS (use exact names):
skeleton_warrior, skeleton_mage, skeleton_minion, knight, mage, rogue, ranger, barbarian, druid, ninja, witch, vampire

AVAILABLE PROPS (use exact names):
cake_birthday, cupcake, present_A_red, present_B_blue, present_C_green, table_long, chair_A, banner_blue, banner_red, torch, barrel, chest, balloon

AVAILABLE ANIMATIONS (use exact names):
Idle_A, Walking_A, Running_A, Cheering, Waving, Sit_Chair_Down, Sit_Chair_Idle, Interact, PickUp, Throw, Skeletons_Taunt, Skeletons_Awaken_Floor

AVAILABLE EFFECTS (use exact names):
confetti-burst, explosion-cartoon, hearts-float, stars-spin, sparkle-magic, fire-sneeze, laugh-tears, splash

AVAILABLE POSITIONS:
ds-left, ds-center, ds-right, cs-left, cs-center, cs-right, us-left, us-center, us-right, off-left, off-right

RULES:
- Max 8 actions
- ONLY use assets from the lists above
- NEVER invent asset names
- narration must be fun and under 20 words
- For vague prompts ("have a party"), create a simple default scene + suggest more detail
- For creative prompts, reward specificity with richer scenes
- prompt_feedback should celebrate what they did well + suggest ONE next step
- RESPOND WITH ONLY THE JSON OBJECT`;
```
**Verify:**
- [ ] Automated: `npm run build` → compiles
- [ ] Manual: Check prompt includes all current PROP_PATHS keys

### Task 4.2: Add Level 5 prompt getter to worlds.ts
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/data/worlds.ts`
**Action:** Add import at top:
```typescript
import { SKELETON_BIRTHDAY_LEVEL5_PROMPT } from '../prompts/skeleton-birthday-level5';
```
Add new export after `getWorldPrompt`:
```typescript
export function getLevel5Prompt(zoneId: string): string {
  const prompts: Record<string, string> = {
    'skeleton-birthday': SKELETON_BIRTHDAY_LEVEL5_PROMPT,
    // Add others as needed
  };
  return prompts[zoneId] ?? SKELETON_BIRTHDAY_LEVEL5_PROMPT;
}
```
**Verify:**
- [ ] Automated: `npm run build` → no errors
- [ ] Manual: Import in console → test `getLevel5Prompt('skeleton-birthday')` → returns string

### Task 4.3: Create Level 5 data structure
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/data/quest-stages.ts`
**Action:** Add Level 5 stage after Level 4 (around line 250):
```typescript
// Level 5 stages stored separately (not in QuestStage array)
export const LEVEL_5_STAGES: Record<string, import('../types/madlibs').Level5Stage> = {
  'skeleton-birthday': {
    id: 'skeleton-birthday-5',
    questId: 'skeleton-birthday',
    stageNumber: 5,
    title: "Party Genius (Full Creative Mode)",
    intro: "You've mastered the basics! Now you can write ANYTHING you want. No more dropdowns!",
    promptPlaceholder: "Make the skeleton throw an epic party with cake and fireworks",
    sentenceStarters: ["Make the", "Tell the", "Have the", "Create a scene where"],
    systemPromptKey: 'skeleton-birthday',
  },
};

export function getLevel5Stage(zoneId: string): import('../types/madlibs').Level5Stage | null {
  return LEVEL_5_STAGES[zoneId] ?? null;
}
```
**Verify:**
- [ ] Automated: `npm run build` → compiles
- [ ] Manual: Import `getLevel5Stage` in console → test with 'skeleton-birthday'

### Task 4.4: Create Level5Input component
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/components/Level5Input.tsx`
**Action:** Create new component:
```typescript
/**
 * Level5Input — Full prompt graduation mode.
 * Single free text field, live Claude API call.
 */

import { useState, useCallback } from 'react';
import { useGameStore } from '../stores/gameStore';
import { useTTS } from '../hooks/useTTS';
import type { Level5Stage } from '../types/madlibs';
import { callClaude, parseSceneScript } from '../services/claude';
import { getLevel5Prompt } from '../data/worlds';
import { FALLBACK_SCRIPTS } from '../data/fallback-scripts';
import type { SceneScript } from '../types/scene-script';

interface Level5InputProps {
  stage: Level5Stage;
}

export default function Level5Input({ stage }: Level5InputProps) {
  const { setLastScript, isLoading } = useGameStore();
  const { speak } = useTTS();

  const [userInput, setUserInput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastResult, setLastResult] = useState<{
    script: SceneScript;
    source: 'live' | 'fallback';
  } | null>(null);

  const handleGo = useCallback(async () => {
    const trimmed = userInput.trim();
    if (!trimmed) return;

    setIsGenerating(true);
    setLastResult(null);

    try {
      const systemPrompt = getLevel5Prompt(stage.systemPromptKey);
      const raw = await callClaude(systemPrompt, trimmed);
      const script = parseSceneScript(raw);

      setLastScript(script);
      setLastResult({ script, source: 'live' });

      if (script.narration) {
        speak(script.narration);
      }
    } catch (error) {
      console.warn('[Level5Input] API failed, using fallback:', error);
      const fallback = FALLBACK_SCRIPTS[stage.questId] ?? FALLBACK_SCRIPTS['skeleton-birthday'];
      setLastScript(fallback);
      setLastResult({ script: fallback, source: 'fallback' });

      if (fallback.narration) {
        speak(fallback.narration);
      }
    } finally {
      setIsGenerating(false);
    }
  }, [userInput, stage, setLastScript, speak]);

  const handleTryAgain = useCallback(() => {
    setLastResult(null);
    setUserInput('');
  }, []);

  return (
    <div className="relative px-5 py-4 bg-quest-panel-bg/90 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-quest-purple/30 to-transparent" />

      {lastResult && (
        <div className="mb-4 p-4 bg-white/70 rounded-xl border-2 border-quest-border">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">
              {lastResult.script.success_level === 'FULL_SUCCESS' ? '🌟' :
               lastResult.script.success_level === 'PARTIAL_SUCCESS' ? '✨' : '🎭'}
            </span>
            <h3 className="font-heading font-bold text-quest-text-dark">
              {lastResult.script.narration}
            </h3>
          </div>
          <p className="font-body text-sm text-quest-text-mid mb-3">
            {lastResult.script.prompt_feedback}
          </p>
          {lastResult.script.guide_hint && (
            <p className="font-body text-xs text-quest-purple bg-quest-purple/10 px-3 py-2 rounded-lg">
              💡 {lastResult.script.guide_hint}
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleTryAgain}
              className="btn-game text-sm px-4 py-2 rounded-xl"
            >
              ✏️ Try Another
            </button>
            {lastResult.source === 'fallback' && (
              <span className="text-xs text-quest-text-muted self-center">
                (offline mode)
              </span>
            )}
          </div>
        </div>
      )}

      {!lastResult && (
        <>
          <div className="mb-4">
            <label className="block font-heading font-bold text-sm text-quest-text-dark mb-2">
              🎓 Write Your Full Prompt
            </label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={stage.promptPlaceholder}
              maxLength={200}
              rows={3}
              disabled={isGenerating}
              className="input-magic w-full px-4 py-3 rounded-xl border-2 border-quest-border
                bg-white/80 font-body text-base text-quest-text-dark resize-none
                focus:border-quest-purple focus:ring-2 focus:ring-quest-purple/20
                disabled:opacity-60"
            />
            <div className="mt-2 text-xs text-quest-text-muted text-right">
              {userInput.length} / 200
            </div>
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            <span className="text-sm font-heading text-quest-text-mid">Try starting with:</span>
            {stage.sentenceStarters.map((starter, i) => (
              <button
                key={i}
                onClick={() => setUserInput(starter + ' ')}
                disabled={isGenerating}
                className="text-xs px-2 py-1 rounded-lg bg-quest-orange/10 text-quest-orange
                  hover:bg-quest-orange/20 border border-quest-orange/30 font-heading"
              >
                "{starter}..."
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGo}
              disabled={!userInput.trim() || isGenerating}
              className="btn-primary text-lg px-8 py-3 rounded-xl font-heading font-bold
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating...
                </span>
              ) : (
                '🚀 Create Scene!'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
```
**Verify:**
- [ ] Automated: `npm run build` → compiles
- [ ] Manual: Render temporarily in App.tsx → test with mock data

## Phase 5: Quest Navigation Integration

### Task 5.1: Update QuestPanel to show Level 4/5 buttons
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/components/QuestPanel.tsx`
**Action:** Find stage selection UI and add Level 4/5 buttons after Stage 3 button. Import `getLevel5Stage` and check unlock status:
```typescript
import { getQuestStages, getLevel5Stage } from '../data/quest-stages';
import type { Level4Stage, Level5Stage } from '../types/madlibs';

// After Stage 3 button rendering:
{currentStage === 3 && stageCompleted && (
  <>
    <button
      onClick={() => setCurrentStage(4)}
      className="btn-game text-sm px-4 py-2 rounded-xl"
    >
      🎯 Level 4: Free Text
    </button>
    {level5Unlocked[currentZone] && (
      <button
        onClick={() => setCurrentStage(5)}
        className="btn-game text-sm px-4 py-2 rounded-xl bg-quest-yellow/20"
      >
        🎓 Level 5: Full Prompt
      </button>
    )}
  </>
)}
```
**Verify:**
- [ ] Automated: `npm run build` → compiles
- [ ] Manual: Complete Stage 3 → check Level 4 button appears

### Task 5.2: Wire Level4Input into QuestPanel
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/components/QuestPanel.tsx`
**Action:** Import Level4Input and conditionally render:
```typescript
import Level4Input from './Level4Input';

// In render logic where MadLibsInput is rendered:
{currentStage === 4 ? (
  <Level4Input stage={stages[3] as Level4Stage} />
) : currentStage === 5 ? (
  <Level5Input stage={getLevel5Stage(currentZone)!} />
) : (
  <MadLibsInput stage={stages[currentStage - 1]} />
)}
```
**Verify:**
- [ ] Automated: `npm run build` → compiles
- [ ] Manual: Click Level 4 button → Level4Input renders

### Task 5.3: Wire Level5Input into QuestPanel
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/components/QuestPanel.tsx`
**Action:** Import Level5Input (already done in 5.2). Verify conditional rendering works.
**Verify:**
- [ ] Automated: `npm run build` → compiles
- [ ] Manual: Unlock Level 5 → click button → Level5Input renders

## Phase 6: Testing and Polish

### Task 6.1: Test Level 4 end-to-end
**File:** N/A (manual testing)
**Action:**
1. Complete Stage 3 in skeleton-birthday
2. Click "Level 4: Free Text" button
3. Select character: Knight
4. Type action: "dance with a pizza"
5. Click GO
6. Verify: scene plays, feedback shows parsed tags, success counter increments
7. Repeat 3 times to unlock Level 5
**Verify:**
- [ ] Manual: All 7 steps complete successfully
- [ ] Manual: Level 5 unlock notification appears after 3rd success

### Task 6.2: Test Level 5 end-to-end
**File:** N/A (manual testing)
**Action:**
1. Unlock Level 5 (via Level 4 or manual state change)
2. Click "Level 5: Full Prompt" button
3. Type prompt: "Make the skeleton throw a huge party with cake and fireworks"
4. Click "Create Scene!"
5. Verify: API call happens, scene plays, feedback shows
6. Test fallback: disconnect internet → submit prompt → fallback script plays
**Verify:**
- [ ] Manual: Live API path works
- [ ] Manual: Fallback path works (offline mode indicator shows)
- [ ] Manual: Narration reads aloud
- [ ] Manual: "Try Another" clears form

### Task 6.3: Test progression persistence
**File:** N/A (manual testing)
**Action:**
1. Complete 2 Level 4 successes
2. Refresh page
3. Verify: Level 4 success count = 2
4. Complete 1 more → Level 5 unlocks
5. Refresh page
6. Verify: Level 5 still unlocked
**Verify:**
- [ ] Manual: localStorage persists level4Successes
- [ ] Manual: localStorage persists level5Unlocked
- [ ] Manual: State restored on page refresh

### Task 6.4: Add Level 4/5 to other zones (skeleton-pizza, knight-space)
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/data/quest-stages.ts`
**Action:** Copy Level 4/5 stage definitions from skeleton-birthday to skeleton-pizza and knight-space, adjusting character options and vignette references.
**Verify:**
- [ ] Automated: `npm run build` → compiles
- [ ] Manual: Test Level 4/5 in skeleton-pizza zone

### Task 6.5: Create Level 5 prompts for other zones
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/prompts/skeleton-pizza-level5.ts`
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/prompts/knight-space-level5.ts`
**Action:** Duplicate skeleton-birthday-level5.ts, adjust task description and asset vocabulary per zone.
**Verify:**
- [ ] Automated: `npm run build` → compiles
- [ ] Manual: Test Level 5 in skeleton-pizza and knight-space

### Task 6.6: Polish UI transitions and animations
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/components/Level4Input.tsx`
**File:** `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/components/Level5Input.tsx`
**Action:** Add `animate-slide-up` class to feedback cards, smooth transitions on button states.
**Verify:**
- [ ] Manual: Feedback cards slide up smoothly
- [ ] Manual: Button disabled states are clear
- [ ] Manual: Loading spinners are visible

## Success Criteria

### Automated
- [ ] `npm run build` passes with no TypeScript errors
- [ ] `npm run dev` starts without errors
- [ ] All imports resolve correctly

### Manual
- [ ] Level 4 unlocks after completing any Stage 3
- [ ] Level 4 parses free text into tags using Haiku
- [ ] Level 4 matches tags to existing vignettes (5-priority system)
- [ ] Level 4 tracks success count and persists in localStorage
- [ ] Level 5 unlocks after 3 Level 4 successes
- [ ] Level 5 calls Claude API with asset vocabulary
- [ ] Level 5 generates custom SceneScript dynamically
- [ ] Level 5 falls back gracefully on API timeout
- [ ] Both levels reuse existing ScenePlayer3D without changes
- [ ] Feedback cards show appropriate tips for each level
- [ ] Progression persists across page refreshes
- [ ] UI feels like natural progression from dropdowns → free text

## Rollback

If Level 4/5 breaks existing Stage 1-3 functionality:
1. Revert `quest-stages.ts` to remove Level 4/5 entries
2. Revert `gameStore.ts` to remove Level 4/5 state
3. Revert `QuestPanel.tsx` to hide Level 4/5 buttons
4. Delete `Level4Input.tsx` and `Level5Input.tsx`
5. Delete `text-parser.ts`
6. Keep type definitions (no harm, tree-shaken if unused)

If Level 5 API costs too much:
1. Add feature flag `VITE_ENABLE_LEVEL5=false` in `.env`
2. Gate Level5Input render behind flag check
3. Show "Coming Soon" message instead

## Open Questions → Resolved Assumptions

**Q: Should Level 4 use Haiku or Sonnet for parsing?**
A: Use Haiku (faster, cheaper, sufficient for simple tag extraction). Fallback to literal text parsing if Haiku times out.

**Q: How many Level 4 successes to unlock Level 5?**
A: 3 successes (non-default vignettes with 'perfect' score). Adjustable via `requiredSuccesses` field.

**Q: Should Level 5 have a separate success tracker?**
A: No. Level 5 is "graduation" mode — no progression gating. Kids can use it freely once unlocked.

**Q: What if a kid writes something inappropriate in Level 5?**
A: Claude's built-in safety filters handle this. If needed, add a client-side profanity filter pre-API call.

**Q: Should Level 4 reuse ALL vignettes or just Stage 1?**
A: Start with Stage 1 vignettes (simpler matching). Can expand to multi-stage vignette pool in future.

---

## File Summary

**New Files:**
- `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/services/text-parser.ts`
- `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/components/Level4Input.tsx`
- `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/components/Level5Input.tsx`
- `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/prompts/skeleton-birthday-level5.ts`
- `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/prompts/skeleton-pizza-level5.ts` (Task 6.5)
- `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/prompts/knight-space-level5.ts` (Task 6.5)

**Modified Files:**
- `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/types/madlibs.ts` (add Level4Stage, Level5Stage, Level4ParsedTags)
- `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/stores/gameStore.ts` (add level4Successes, level5Unlocked, actions)
- `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/services/vignette-resolver.ts` (add resolveLevel4Vignette)
- `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/data/quest-stages.ts` (add Level 4/5 stages)
- `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/data/worlds.ts` (add getLevel5Prompt)
- `/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/src/components/QuestPanel.tsx` (add Level 4/5 buttons and routing)

**Key Code Snippets:**
- Text parser: Haiku-based tag extraction with literal fallback (Task 2.1)
- Level 4 vignette matching: converts parsed tags → resolveVignette (Task 2.2)
- Level 5 prompt: includes full asset vocabulary (characters, props, animations, effects) (Task 4.1)
- Progression tracking: recordLevel4Success, unlockLevel5 with localStorage persistence (Task 1.3)
