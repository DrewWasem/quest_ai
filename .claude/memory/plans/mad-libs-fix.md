# Plan: Fix Mad Libs Game Loop

**Created:** 2026-02-15
**Status:** draft
**Research:** User-provided context (resolver issues, stage completion, vignette coverage, tip violations)

## Goal
Fix the broken Mad Libs game loop in Quest AI so kids can actually complete stages, get deterministic quality matches, and receive actionable feedback that references what they picked.

## Approach
Five pragmatic fixes executed in dependency order:

1. **Resolver logic** — Treat `undefined` trigger values as wildcards, rank pair matches by quality instead of randomizing
2. **Stage completion** — Add `promptScore === 'perfect'` as a completion trigger alongside successTags
3. **Brand + tip fixes** — Eliminate all "prompt" violations, make tips reference actual mad libs slot names
4. **Match explanation** — Add dynamic feedback showing which player choices triggered the scene
5. **Build verification** — Confirm 0 TS errors, production build passes

## Phase 1: Fix Resolver Logic (P0)

### Task 1.1: Treat undefined triggers as wildcards
**File:** `frontend/src/services/vignette-resolver.ts`
**Action:** In `resolveVignette()` Priority 1 (lines 26-33), change the EXACT match logic to treat `undefined` trigger values as wildcards.

Currently the code is:
```typescript
const exact = vignettes.find(v => {
  return slotIds.every(id => {
    const triggerVal = v.trigger[id.toLowerCase()];
    return triggerVal === selectedTags[id] || triggerVal === '*';
  });
});
```

Problem: If a vignette has 3 triggers but the stage has 5 slots, the 2 missing triggers will be `undefined`. The current logic checks `undefined === selectedTags[id]` which will always be false.

Fix: Treat `undefined` as equivalent to `'*'` (wildcard):
```typescript
const exact = vignettes.find(v => {
  return slotIds.every(id => {
    const triggerVal = v.trigger[id.toLowerCase()];
    return triggerVal === selectedTags[id] || triggerVal === '*' || triggerVal === undefined;
  });
});
```

**Verify:**
- [ ] Manual: After fix, a Stage 2 barbarian-school input with 5 slots should match a Stage 1 vignette with 3 matching keys (EXACT priority, not PAIR)
- [ ] Automated: `npm run build` in `frontend/` → 0 TS errors

### Task 1.2: Rank pair matches instead of random selection
**File:** `frontend/src/services/vignette-resolver.ts`
**Action:** In `resolveVignette()` Priority 2 (lines 35-46), replace random selection with ranked selection based on match quality.

Currently the code picks a random vignette from `pairMatches`:
```typescript
if (pairMatches.length > 0) {
  return pairMatches[Math.floor(Math.random() * pairMatches.length)];
}
```

Problem: This mixes perfect and chaotic outcomes randomly. A kid filling in 4 out of 5 slots correctly gets a 50/50 coin toss between success and chaos.

Fix: Sort by match count descending, then by `promptScore` quality (perfect > partial > chaotic > funny_fail), then pick the top one:
```typescript
if (pairMatches.length > 0) {
  // Calculate match counts
  const scored = pairMatches.map(v => {
    let matchCount = 0;
    for (const id of slotIds) {
      const triggerVal = v.trigger[id.toLowerCase()];
      if (triggerVal === selectedTags[id] || triggerVal === '*' || triggerVal === undefined) {
        matchCount++;
      }
    }
    return { vignette: v, matchCount };
  });

  // Sort by match count desc, then by promptScore quality
  const scoreOrder: Record<string, number> = {
    perfect: 4,
    partial: 3,
    chaotic: 2,
    funny_fail: 1,
  };
  scored.sort((a, b) => {
    if (a.matchCount !== b.matchCount) return b.matchCount - a.matchCount;
    const aScore = scoreOrder[a.vignette.promptScore] ?? 0;
    const bScore = scoreOrder[b.vignette.promptScore] ?? 0;
    return bScore - aScore;
  });

  return scored[0].vignette;
}
```

**Verify:**
- [ ] Manual: After fix, a Stage 2 input matching 4 out of 5 slots should deterministically get the highest-quality vignette (not random)
- [ ] Automated: `npm run build` → 0 TS errors

### Task 1.3: Apply wildcard fix to Priority 2
**File:** `frontend/src/services/vignette-resolver.ts`
**Action:** In the match count calculation inside the new Priority 2 logic (from Task 1.2), ensure `undefined` is also treated as a wildcard.

The match count logic should already include `|| triggerVal === undefined` from Task 1.2. Double-check this is present.

**Verify:**
- [ ] Manual: Code review — confirm `|| triggerVal === undefined` is in the Priority 2 match count loop
- [ ] Automated: `npm run build` → 0 TS errors

## Phase 2: Fix Stage Completion (P1)

### Task 2.1: Add perfect-score completion trigger
**File:** `frontend/src/components/MadLibsInput.tsx`
**Action:** In `handleGo()` stage completion logic (lines 148-166), add an additional completion path: if the matched vignette has `promptScore === 'perfect'`, auto-complete the stage.

Currently the code only checks `stage.comboRequired` (Level 3) or `stage.successTags` (Levels 1-2):
```typescript
// Check stage completion
if (stage.comboRequired) {
  // Level 3 logic...
} else if (stage.successTags) {
  const selectedValues = Object.values(selectedTags);
  const isSuccess = stage.successTags.some(combo =>
    combo.every(tag => selectedValues.includes(tag))
  );
  if (isSuccess) {
    completeStage(stage.questId, stage.stageNumber);
  }
}
```

Fix: Add a third condition after both blocks:
```typescript
// Check stage completion
if (stage.comboRequired) {
  // Level 3 logic (unchanged)
  const newDiscovered = new Set([...discoveredIds, vignette.id]);
  const nonDefault = [...newDiscovered].filter(id => id !== stage.defaultVignette.id);
  if (nonDefault.length >= stage.comboRequired) {
    completeStage(stage.questId, stage.stageNumber);
  }
} else if (stage.successTags) {
  // Level 1/2 tag-based logic (unchanged)
  const selectedValues = Object.values(selectedTags);
  const isSuccess = stage.successTags.some(combo =>
    combo.every(tag => selectedValues.includes(tag))
  );
  if (isSuccess) {
    completeStage(stage.questId, stage.stageNumber);
  }
}

// NEW: Also complete if the vignette is perfect quality
if (vignette.promptScore === 'perfect') {
  completeStage(stage.questId, stage.stageNumber);
}
```

**Verify:**
- [ ] Manual: Load barbarian-school Stage 2, fill in a combination that triggers a `perfect` vignette (not one of the 2 successTag combos). After the vignette plays, confirm "Next Stage" button appears.
- [ ] Automated: `npm run build` → 0 TS errors

## Phase 3: Fix Tips (P2)

### Task 3.1: Fix 3 "prompt" brand violations
**File:** `frontend/src/data/vignettes/barbarian-school.ts`
**Action:** Replace all instances of word "prompt" in kid-facing tips with brand-approved alternatives.

Lines to fix:
- **Line 97**: `'Adding gentle or careful to your prompt could prevent playground chaos!'`
  - Replace with: `'Try the Sleepy energy level to calm things down!'`
- **Line 186**: `'Adding where or how to hide in your prompt helps your monster make smarter choices!'`
  - Replace with: `'Pick different hiding spots to see how your monster adapts!'`

**File:** `frontend/src/data/vignettes/skeleton-birthday.ts`
**Action:**
- **Line 792**: `"You're a natural prompt engineer! Try the other quests to test your skills!"`
  - Replace with: `"You're a natural scene creator! Try the other quests to test your skills!"`

**Verify:**
- [ ] Automated: `npm run grep '\bprompt\b' frontend/src/data/vignettes/*.ts` → 0 matches (excluding code comments, only check tip/feedback strings)
- [ ] Automated: `npm run build` → 0 TS errors

### Task 3.2: Fix 9 "Adding..." tips to reference slot names
**File:** `frontend/src/data/vignettes/barbarian-school.ts`
**Action:** Replace all tips that say "Adding X to your description..." with slot-specific actionable advice.

Strategy: The barbarian-school Stage 1 slots are:
- `CHARACTER` (Monster, Clown, Skeleton, Knight, Mage, Adventurer)
- `ACTIVITY` (Jumping, Hiding, Sleeping, Reading, Dancing, Running)
- `EQUIPMENT` (Swings, Slide, Sandbox, Seesaw, Desk)

Instead of "Adding X to your description", say "Try picking [SPECIFIC_OPTION] for [SLOT_NAME]!" or "See what happens when [CHARACTER] tries [ACTIVITY]!"

Find all lines matching pattern `Adding .* to your (description|prompt)` in barbarian-school.ts tips. There should be approximately 11 instances based on the research findings. Replace each with slot-specific advice.

Example replacements (adapt based on actual vignette context):
- "Adding how your monster jumps..." → "Try different Equipment — the sandbox and swing make every jump unique!"
- "Adding gentle or careful..." → (already fixed in Task 3.1)
- "Adding where or how to hide..." → (already fixed in Task 3.1)

I'll need to read the full barbarian-school.ts file to identify all 11 instances and fix them in context.

**Verify:**
- [ ] Automated: `npm run grep 'Adding .* to your (description|prompt)' frontend/src/data/vignettes/barbarian-school.ts` → 0 matches
- [ ] Manual: Spot-check 3 random barbarian-school vignettes — tips reference actual slot names (CHARACTER, ACTIVITY, EQUIPMENT)
- [ ] Automated: `npm run build` → 0 TS errors

### Task 3.3: Read and fix all barbarian-school.ts tips
**File:** `frontend/src/data/vignettes/barbarian-school.ts`
**Action:** Use the Read tool to load the full file, identify all tips with "Adding..." pattern or other free-text references, and replace with slot-specific advice. Execute all replacements via the Edit tool.

This is a subtask of 3.2 broken out for implementation clarity. The actual edits will be made using Edit tool with exact old_string/new_string pairs after reading the file.

**Verify:**
- [ ] Manual: Read the modified file, confirm all tips are slot-specific
- [ ] Automated: `npm run build` → 0 TS errors

## Phase 4: Dynamic Match Explanation (P3)

### Task 4.1: Add matchExplanation to SceneScript type
**File:** `frontend/src/types/scene-script.ts`
**Action:** Add optional `matchExplanation` field to `SceneScript` interface (line 234-242).

Current interface:
```typescript
export interface SceneScript {
  success_level: SuccessLevel;
  narration: string;
  actions: Action[];
  missing_elements?: string[];
  prompt_feedback: string;
  guide_hint?: string;
  prompt_analysis?: PromptAnalysis;
}
```

Add new field:
```typescript
export interface SceneScript {
  success_level: SuccessLevel;
  narration: string;
  actions: Action[];
  missing_elements?: string[];
  prompt_feedback: string;
  guide_hint?: string;
  prompt_analysis?: PromptAnalysis;
  matchExplanation?: string; // NEW: explains which choices triggered the vignette
}
```

**Verify:**
- [ ] Automated: `npm run build` → 0 TS errors (type change only, no runtime impact)

### Task 4.2: Generate matchExplanation in buildVignetteScript
**File:** `frontend/src/services/vignette-resolver.ts`
**Action:** In `buildVignetteScript()` (lines 152-176), generate a dynamic `matchExplanation` that shows which of the player's choices matched the vignette trigger.

Current function:
```typescript
export function buildVignetteScript(
  vignette: Vignette,
  _selectedTags: Record<string, string>,
): SceneScript {
  const actions = vignetteStepsToActions(vignette.steps);
  // ... rest of function
  return {
    success_level: successMap[vignette.promptScore] ?? 'PARTIAL_SUCCESS',
    narration: vignette.feedback.title,
    actions,
    prompt_feedback: vignette.feedback.message,
    guide_hint: vignette.feedback.tip,
  };
}
```

Fix: Use `_selectedTags` (rename to `selectedTags` to indicate it's used) to build a match explanation:
```typescript
export function buildVignetteScript(
  vignette: Vignette,
  selectedTags: Record<string, string>, // removed underscore
): SceneScript {
  const actions = vignetteStepsToActions(vignette.steps);

  // Generate match explanation
  const matchedChoices: string[] = [];
  for (const [key, triggerVal] of Object.entries(vignette.trigger)) {
    const selectedVal = selectedTags[key.toUpperCase()];
    if (triggerVal === selectedVal) {
      matchedChoices.push(`**${selectedVal}**`);
    }
  }

  let matchExplanation = '';
  if (matchedChoices.length > 0) {
    matchExplanation = `Your ${matchedChoices.join(' + ')} combo unlocked this scene!`;
  }

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
    matchExplanation, // NEW
  };
}
```

**Verify:**
- [ ] Manual: Add a `console.log(script.matchExplanation)` in `MadLibsInput.tsx` handleGo before setLastScript. Run barbarian-school Stage 1, pick Clown + Jumping + Swings. Confirm console shows "Your Clown + Jumping + Swings combo unlocked this scene!"
- [ ] Automated: `npm run build` → 0 TS errors

### Task 4.3: Display matchExplanation in FeedbackCard
**File:** `frontend/src/components/FeedbackCard.tsx`
**Action:** Add `matchExplanation` to `FeedbackCardProps` and display it between the filled sentence and the feedback message.

Current props interface (lines 47-57):
```typescript
interface FeedbackCardProps {
  feedback: VignetteFeedback;
  promptScore: PromptScore;
  filledSentence: string;
  discoveredCount: number;
  totalVignettes: number;
  onTryAgain: () => void;
  onNextStage?: () => void;
  comboRequired?: number;
  vagueComparison?: VagueComparison;
}
```

Add:
```typescript
interface FeedbackCardProps {
  feedback: VignetteFeedback;
  promptScore: PromptScore;
  filledSentence: string;
  discoveredCount: number;
  totalVignettes: number;
  onTryAgain: () => void;
  onNextStage?: () => void;
  comboRequired?: number;
  vagueComparison?: VagueComparison;
  matchExplanation?: string; // NEW
}
```

Then in the JSX (around line 89-96, between filled sentence and feedback message), add:
```typescript
{/* Filled sentence */}
<p className="text-sm text-quest-text-mid italic mb-3 bg-white/50 rounded-lg px-3 py-2">
  {filledSentence}
</p>

{/* NEW: Match explanation */}
{matchExplanation && (
  <p className="text-sm font-heading font-bold text-quest-purple mb-2 bg-quest-purple/5 rounded-lg px-3 py-2">
    {'\u{1F50D}'} {matchExplanation}
  </p>
)}

{/* Feedback message */}
<p className="font-body font-bold text-base text-quest-text-dark leading-relaxed mb-2">
  {feedback.message}
</p>
```

**Verify:**
- [ ] Manual: Load barbarian-school Stage 1, pick Clown + Jumping + Swings, click GO. After vignette plays, confirm FeedbackCard shows "🔍 Your Clown + Jumping + Swings combo unlocked this scene!" above the feedback message.
- [ ] Automated: `npm run build` → 0 TS errors

### Task 4.4: Wire matchExplanation from MadLibsInput to FeedbackCard
**File:** `frontend/src/components/MadLibsInput.tsx`
**Action:** Pass `matchExplanation` from the generated script to the FeedbackCard component.

Current feedback state (lines 56-60):
```typescript
const [feedback, setFeedback] = useState<{
  vignette: Vignette;
  filledSentence: string;
} | null>(null);
```

Expand to include script:
```typescript
const [feedback, setFeedback] = useState<{
  vignette: Vignette;
  filledSentence: string;
  matchExplanation?: string; // NEW
} | null>(null);
```

In `handleGo()`, after building the script (line 143), capture `matchExplanation`:
```typescript
const script = buildVignetteScript(vignette, selectedTags);
// ... existing code ...
setTimeout(() => {
  setFeedback({
    vignette,
    filledSentence,
    matchExplanation: script.matchExplanation, // NEW
  });
  setIsPlaying(false);
}, Math.min(totalDuration + 500, 8000));
```

Then in the FeedbackCard JSX (line 202-220), pass it as a prop:
```typescript
<FeedbackCard
  feedback={feedback.vignette.feedback}
  promptScore={feedback.vignette.promptScore}
  filledSentence={feedback.filledSentence}
  matchExplanation={feedback.matchExplanation} // NEW
  discoveredCount={discoveredIds.size}
  totalVignettes={stage.vignettes.length + 1}
  onTryAgain={handleTryAgain}
  onNextStage={...}
  comboRequired={stage.comboRequired}
  vagueComparison={feedback.vignette.vagueComparison}
/>
```

**Verify:**
- [ ] Manual: Full end-to-end test — barbarian-school Stage 1, Clown + Jumping + Swings → FeedbackCard shows "Your Clown + Jumping + Swings combo unlocked this scene!"
- [ ] Automated: `npm run build` → 0 TS errors

## Phase 5: Build Verification

### Task 5.1: Run production build
**File:** N/A (command-line)
**Action:** Execute `cd frontend && npm run build`. Verify 0 TypeScript errors and successful bundle output.

**Verify:**
- [ ] Automated: `cd frontend && npm run build` → exit code 0, output shows "Build completed successfully" or similar
- [ ] Automated: Check for "0 errors" in build output

### Task 5.2: Smoke test barbarian-school Stage 1
**File:** N/A (manual browser test)
**Action:** Start dev server with `cd frontend && npm run dev`. Navigate to barbarian-school zone. Enter Stage 1. Test the following:

1. Fill all 3 slots (CHARACTER, ACTIVITY, EQUIPMENT)
2. Click GO
3. Confirm vignette plays
4. Confirm FeedbackCard shows match explanation
5. Confirm tip references slot names (not "Adding to your prompt...")
6. Try a different combo with 2 matching tags → should get deterministic quality match (not random)

**Verify:**
- [ ] Manual: All 6 smoke test steps pass
- [ ] Manual: Console shows 0 JavaScript errors

### Task 5.3: Smoke test barbarian-school Stage 2
**File:** N/A (manual browser test)
**Action:** After completing Stage 1, advance to Stage 2. Test the following:

1. Fill all 5 slots
2. Pick a combo that matches 3 out of 5 tags from a Stage 1 vignette
3. Click GO
4. Confirm vignette plays (resolver should use EXACT match via undefined→wildcard fix)
5. Confirm vignette is NOT random (should be deterministic quality-ranked)
6. If vignette has `promptScore: 'perfect'`, confirm "Next Stage" button appears (new completion trigger)

**Verify:**
- [ ] Manual: All 6 smoke test steps pass
- [ ] Manual: Stage 2 completion works with perfect-score vignettes (not just successTags)

### Task 5.4: Regex audit for "prompt" in kid-facing text
**File:** N/A (command-line)
**Action:** Run `grep -r '\bprompt\b' frontend/src/data/vignettes/` and verify 0 matches in tip/feedback/title strings (code comments are okay).

**Verify:**
- [ ] Automated: `grep -r '\bprompt\b' frontend/src/data/vignettes/*.ts | grep -v '//'` → 0 results (exclude comment lines)

## Success Criteria

### Automated
- [ ] `cd frontend && npm run build` → 0 TypeScript errors, successful bundle
- [ ] `grep -r '\bprompt\b' frontend/src/data/vignettes/*.ts | grep -v '//'` → 0 matches
- [ ] `grep 'Adding .* to your' frontend/src/data/vignettes/barbarian-school.ts` → 0 matches

### Manual
- [ ] Stage 2 inputs with 5 slots match Stage 1 vignettes with 3 matching keys via EXACT priority (not PAIR)
- [ ] Pair matching picks the highest-quality vignette deterministically (not random)
- [ ] Any `promptScore: 'perfect'` vignette triggers stage completion
- [ ] All vignette tips reference actual slot names (CHARACTER, ACTIVITY, EQUIPMENT, etc.)
- [ ] FeedbackCard shows "Your X + Y + Z combo unlocked this scene!" dynamically based on player choices
- [ ] barbarian-school Stage 1 and Stage 2 smoke tests pass (6 checks each)

## Rollback
If any phase breaks the game:
1. `git status` to see modified files
2. `git diff` to review changes
3. `git restore <file>` to undo specific file
4. `git restore .` to undo all changes (nuclear option)
5. Re-run `npm run dev` to confirm rollback worked

## Dependencies
- Phase 2 depends on Phase 1 (resolver must work before completion logic can trigger correctly)
- Phase 4 depends on Task 4.1 (type change) before Tasks 4.2-4.4 (implementation)
- Phase 5 depends on all prior phases (verification only)

## Notes
- **Brand voice:** All kid-facing text must avoid "prompt", "Great job!", "skills", "learning", "wrong", "failed", "error"
- **Target age:** 7-11 (not 8-10)
- **Failure = comedy:** Funny fails must be funnier than success
- **Narrations:** Max 20 words, present tense, 1 exclamation max
- **Hackathon deadline:** Tomorrow (Feb 16) — all fixes must be pragmatic and high-impact

## File Map
- `frontend/src/services/vignette-resolver.ts` — Phases 1, 4 (resolver + match explanation generation)
- `frontend/src/components/MadLibsInput.tsx` — Phases 2, 4 (completion + match explanation wiring)
- `frontend/src/components/FeedbackCard.tsx` — Phase 4 (display match explanation)
- `frontend/src/types/scene-script.ts` — Phase 4 (add matchExplanation type)
- `frontend/src/data/vignettes/barbarian-school.ts` — Phase 3 (fix tips)
- `frontend/src/data/vignettes/skeleton-birthday.ts` — Phase 3 (fix tips)
