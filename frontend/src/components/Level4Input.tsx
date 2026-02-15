/**
 * Level4Input — Hybrid guided free text input.
 * Character dropdown + free text action field with ghost examples.
 * Parses text via Haiku, matches to existing vignettes.
 */

import { useState, useCallback } from 'react';
import { useGameStore } from '../stores/gameStore';
import { useTTS } from '../hooks/useTTS';
import type { Level4Stage, Vignette } from '../types/madlibs';
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
    advanceStage,
  } = useGameStore();

  const { speak } = useTTS();

  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [actionText, setActionText] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [feedback, setFeedback] = useState<{
    vignette: Vignette;
    filledSentence: string;
  } | null>(null);

  const currentSuccesses = level4Successes[stage.questId] ?? 0;
  const isLevel5Ready = currentSuccesses >= stage.requiredSuccesses && !level5Unlocked[stage.questId];

  const handleGo = useCallback(async () => {
    if (!selectedCharacter || !actionText.trim()) return;

    setIsPlaying(true);
    setIsParsing(true);
    setFeedback(null);

    try {
      // Parse free text into tags via Haiku
      const parsed = await parseLevel4Text(actionText, selectedCharacter);
      setIsParsing(false);

      // Match to existing vignette
      const vignette = resolveLevel4Vignette(parsed, stage);
      const script = buildVignetteScript(vignette, { character: parsed.character });

      // Track success for non-default vignettes
      if (vignette.id !== stage.defaultVignette.id) {
        recordLevel4Success(stage.questId);
      }

      // Send to playback engine
      setLastScript(script);
      setVignetteSteps(vignette.steps);

      if (script.narration) {
        speak(script.narration);
      }

      // Build filled sentence for feedback
      const filledSentence = `${stage.characterSlot.defaultOptions.find(o => o.tag === selectedCharacter)?.label ?? selectedCharacter}: "${parsed.rawText}"`;

      // Show feedback after vignette plays
      const totalDuration = vignette.steps.reduce(
        (sum, step) => sum + (step.delayAfter ?? 0.5) * 1000 + 800,
        0
      );
      setTimeout(() => {
        setFeedback({ vignette, filledSentence });
        setIsPlaying(false);
      }, Math.min(totalDuration + 500, 8000));
    } catch (error) {
      console.error('[Level4Input] Error:', error);
      setIsPlaying(false);
      setIsParsing(false);
    }
  }, [selectedCharacter, actionText, stage, recordLevel4Success, setLastScript, setVignetteSteps, speak]);

  const handleTryAgain = useCallback(() => {
    setFeedback(null);
    setActionText('');
    setVignetteSteps(null);
  }, [setVignetteSteps]);

  return (
    <div className="relative px-5 py-4 bg-quest-panel-bg/90 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-quest-purple/30 to-transparent" />

      {/* Feedback card (shown after vignette) */}
      {feedback && (
        <div className="mb-4">
          <FeedbackCard
            feedback={feedback.vignette.feedback}
            promptScore={feedback.vignette.promptScore}
            filledSentence={feedback.filledSentence}
            discoveredCount={currentSuccesses}
            totalVignettes={stage.requiredSuccesses}
            onTryAgain={handleTryAgain}
            onNextStage={
              isLevel5Ready
                ? () => advanceStage(stage.questId)
                : undefined
            }
            vagueComparison={feedback.vignette.vagueComparison}
          />
          {isLevel5Ready && (
            <div className="mt-3 p-3 bg-quest-yellow/20 border-2 border-quest-yellow rounded-xl text-center">
              <p className="font-heading font-bold text-quest-text-dark">
                {'\u{1F393}'} Level 5 Unlocked! You can now write full prompts!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Input form */}
      {!feedback && (
        <>
          {/* Stage intro */}
          <div className="mb-3 text-center">
            <span className="text-xs font-heading font-bold text-quest-purple bg-quest-purple/10 px-3 py-1 rounded-full">
              Level 4: Free Text Mode
            </span>
          </div>

          {/* Character selector */}
          <div className="mb-4">
            <label className="block font-heading font-bold text-sm text-quest-text-dark mb-2">
              {stage.characterSlot.icon} {stage.characterSlot.label}
            </label>
            <div className="flex flex-wrap gap-2">
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

          {/* Free text input */}
          <div className="mb-4">
            <label className="block font-heading font-bold text-sm text-quest-text-dark mb-2">
              {'\u{270D}\u{FE0F}'} {stage.freeTextFields[0].label}
            </label>
            <input
              type="text"
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && selectedCharacter && actionText.trim()) {
                  handleGo();
                }
              }}
              placeholder={stage.freeTextFields[0].placeholder}
              maxLength={stage.freeTextFields[0].maxLength}
              disabled={isPlaying}
              className="input-magic w-full px-4 py-3 rounded-xl border-2 border-quest-border
                bg-white/80 font-body text-base text-quest-text-dark
                focus:border-quest-purple focus:ring-2 focus:ring-quest-purple/20
                disabled:opacity-60 disabled:cursor-not-allowed"
            />
            {/* Ghost example chips */}
            <div className="mt-2 flex flex-wrap gap-2">
              {stage.freeTextFields[0].ghostExamples.slice(0, 4).map((example, i) => (
                <button
                  key={i}
                  onClick={() => setActionText(example)}
                  disabled={isPlaying}
                  className="text-xs px-2.5 py-1 rounded-lg bg-quest-purple/10 text-quest-purple
                    hover:bg-quest-purple/20 border border-quest-purple/30 font-heading
                    disabled:opacity-50"
                >
                  {'\u{1F4A1}'} {example}
                </button>
              ))}
            </div>
          </div>

          {/* Action row */}
          <div className="flex items-center gap-3">
            <div className="flex-1 text-sm text-quest-text-mid font-heading">
              {'\u{2B50}'} Successes: {currentSuccesses} / {stage.requiredSuccesses}
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
                <>{'\u{25B6}\u{FE0F}'} GO!</>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
