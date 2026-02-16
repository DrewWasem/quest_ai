/**
 * Level5Input — Full prompt graduation mode.
 * Single free text field, live Claude API call, generates SceneScript dynamically.
 */

import { useState, useCallback } from 'react';
import { useGameStore } from '../stores/gameStore';
import { useTTS } from '../hooks/useTTS';
import type { Level5Stage } from '../types/madlibs';
import { callClaude, parseSceneScript } from '../services/claude';
import { getLevel5SystemPrompt } from '../prompts/level5-system';
import { FALLBACK_SCRIPTS } from '../data/fallback-scripts';
import { getLoadingVignette } from '../data/loading-vignettes';
import type { SceneScript } from '../types/scene-script';

interface Level5InputProps {
  stage: Level5Stage;
}

export default function Level5Input({ stage }: Level5InputProps) {
  const { setLastScript, setVignetteSteps } = useGameStore();
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

    // Play loading vignette immediately — character thinks while API runs
    const loading = getLoadingVignette(stage.questId);
    setLastScript(loading.script);
    setVignetteSteps(loading.steps);

    try {
      const systemPrompt = getLevel5SystemPrompt(stage.systemPromptKey);
      const raw = await callClaude(systemPrompt, trimmed, {
        model: 'claude-opus-4-6',
        maxTokens: 1500,
        timeoutMs: 12000,
      });
      const script = parseSceneScript(raw);

      // Replace loading vignette with real response
      setVignetteSteps(null);
      setLastScript(script);
      setLastResult({ script, source: 'live' });

      if (script.narration) {
        speak(script.narration);
      }
    } catch (error) {
      console.warn('[Level5Input] API failed, using fallback:', error);
      const fallback = FALLBACK_SCRIPTS[stage.questId] ?? FALLBACK_SCRIPTS['skeleton-birthday'];
      // Replace loading vignette with fallback
      setVignetteSteps(null);
      setLastScript(fallback);
      setLastResult({ script: fallback, source: 'fallback' });

      if (fallback.narration) {
        speak(fallback.narration);
      }
    } finally {
      setIsGenerating(false);
    }
  }, [userInput, stage, setLastScript, setVignetteSteps, speak]);

  const handleTryAgain = useCallback(() => {
    setLastResult(null);
    setUserInput('');
  }, []);

  return (
    <div className="relative px-5 py-4 bg-quest-panel-bg/90 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-quest-orange/30 to-transparent" />

      {/* Result card */}
      {lastResult && (
        <div className="mb-4 animate-slide-up">
          <div className={`p-4 rounded-xl border-2 ${
            lastResult.script.success_level === 'FULL_SUCCESS'
              ? 'bg-quest-success/10 border-quest-success/40'
              : lastResult.script.success_level === 'PARTIAL_SUCCESS'
              ? 'bg-quest-yellow/10 border-quest-yellow/40'
              : 'bg-quest-purple/10 border-quest-purple/40'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">
                {lastResult.script.success_level === 'FULL_SUCCESS' ? '\u{1F31F}' :
                 lastResult.script.success_level === 'PARTIAL_SUCCESS' ? '\u{2728}' : '\u{1F3AD}'}
              </span>
              <h3 className="font-heading font-bold text-lg text-quest-text-dark">
                {lastResult.script.narration}
              </h3>
            </div>

            {lastResult.script.prompt_feedback && (
              <p className="font-body text-sm text-quest-text-mid mb-3">
                {lastResult.script.prompt_feedback}
              </p>
            )}

            {lastResult.script.guide_hint && (
              <p className="font-body text-xs text-quest-purple bg-quest-purple/10 px-3 py-2 rounded-lg">
                {'\u{1F4A1}'} {lastResult.script.guide_hint}
              </p>
            )}

            <div className="mt-3 flex gap-2">
              <button
                onClick={handleTryAgain}
                className="btn-game text-sm px-5 py-2.5 rounded-xl border-2
                  bg-white/60 text-quest-text-dark border-quest-border
                  hover:border-quest-purple/50 hover:bg-quest-panel-bg font-heading font-bold"
              >
                {'\u{270F}\u{FE0F}'} Try Another
              </button>
              {lastResult.source === 'fallback' && (
                <span className="text-xs text-quest-text-muted self-center">
                  (offline mode — connect to internet for full experience)
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Input form */}
      {!lastResult && (
        <>
          {/* Stage badge */}
          <div className="mb-3 text-center">
            <span className="text-xs font-heading font-bold text-quest-orange bg-quest-orange/10 px-3 py-1 rounded-full">
              {'\u{1F393}'} Level 5: Full Prompt Mode
            </span>
          </div>

          {/* Text area */}
          <div className="mb-4">
            <label className="block font-heading font-bold text-sm text-quest-text-dark mb-2">
              {'\u{1F680}'} Write Your Full Prompt
            </label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && userInput.trim()) {
                  e.preventDefault();
                  handleGo();
                }
              }}
              placeholder={stage.promptPlaceholder}
              maxLength={500}
              rows={3}
              disabled={isGenerating}
              className="input-magic w-full px-4 py-3 rounded-xl border-2 border-quest-border
                bg-white/80 font-body text-base text-quest-text-dark resize-none
                focus:border-quest-orange focus:ring-2 focus:ring-quest-orange/20
                disabled:opacity-60"
            />
            <div className="mt-1 text-xs text-quest-text-muted text-right">
              {userInput.length} / 200
            </div>
          </div>

          {/* Sentence starters */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="text-sm font-heading text-quest-text-mid self-center">Try starting with:</span>
            {stage.sentenceStarters.map((starter, i) => (
              <button
                key={i}
                onClick={() => setUserInput(starter + ' ')}
                disabled={isGenerating}
                className="text-xs px-2.5 py-1 rounded-lg bg-quest-orange/10 text-quest-orange
                  hover:bg-quest-orange/20 border border-quest-orange/30 font-heading
                  disabled:opacity-50"
              >
                "{starter}..."
              </button>
            ))}
          </div>

          {/* Submit */}
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
                <>{'\u{1F680}'} Create Scene!</>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
