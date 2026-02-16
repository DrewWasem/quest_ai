import { useState, useEffect, useMemo, useCallback } from 'react';
import R3FGame from './game/R3FGame';
import ScenePlayer3D from './game/ScenePlayer3D';
import PromptInput from './components/PromptInput';
import MadLibsInput from './components/MadLibsInput';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import TitleScreen from './components/TitleScreen';
import { useGameStore } from './stores/gameStore';
import { preloadAllAnimations } from './game/AnimationController';
import { SoundManager3D } from './game/SoundManager3D';
import { signalVignetteComplete } from './utils/zone-demo-runner';
import { signalShowcaseVignetteComplete } from './utils/demo-runner';
import { useGLTF } from '@react-three/drei';
import { CHARACTERS, ASSET_BASE } from './data/asset-manifest';
import { PLAYER_CHARACTERS } from './data/player-characters';
import { WORLDS } from './data/worlds';
import { startPendingDemo } from './utils/demo-runner';
import { startPendingZoneDemo } from './utils/zone-demo-runner';
import { BADGES } from './services/badge-system';
import { getQuestStage, getQuestStages, getLevel4Stage, getLevel5Stage } from './data/quest-stages';
import Level4Input from './components/Level4Input';
import Level5Input from './components/Level5Input';
import CameraControls from './components/CameraControls';
import { Minimap } from './game/Minimap';
import ControlsOverlay from './components/ControlsOverlay';
import BadgeToast from './components/BadgeToast';
import ScreenshotButton from './components/ScreenshotButton';
import SettingsPanel from './components/SettingsPanel';

export default function App() {
  const currentZone = useGameStore((s) => s.currentZone);
  const currentTask = useGameStore((s) => s.currentTask);
  const lastScript = useGameStore((s) => s.lastScript);
  const vignetteSteps = useGameStore((s) => s.vignetteSteps);
  const exitZone = useGameStore((s) => s.exitZone);
  const isTransitioning = useGameStore((s) => s.isTransitioning);
  const badges = useGameStore((s) => s.badges);
  const [loading3D, setLoading3D] = useState(true);
  const [expanded] = useState(false);
  const setSelectedCharacter = useGameStore((s) => s.setSelectedCharacter);

  // Auto-skip title screen and intro for any demo mode (?demo=showcase or ?demo=zone-name)
  const isDemoMode = useMemo(() => !!new URLSearchParams(window.location.search).get('demo'), []);
  const [started, setStarted] = useState(isDemoMode);
  const [playingIntro, setPlayingIntro] = useState(false);
  const [demoWaitingForClick, setDemoWaitingForClick] = useState(isDemoMode);

  const handleDemoStart = useCallback(() => {
    SoundManager3D.unlockAudio();
    setDemoWaitingForClick(false);
    startPendingDemo();
    startPendingZoneDemo();
  }, []);

  // Get the current quest stage (if any) for Mad Libs mode
  const stageNumber = useGameStore(s => s.stageNumbers[s.currentZone ?? ''] ?? 1);
  const questStage = useMemo(() => {
    if (!currentZone) return null;
    return getQuestStage(currentZone, stageNumber);
  }, [currentZone, stageNumber]);

  // Preload shared animations + selectable character GLBs + audio on mount
  useEffect(() => {
    try {
      preloadAllAnimations();
      for (const char of PLAYER_CHARACTERS) {
        useGLTF.preload(`${ASSET_BASE}${CHARACTERS[char.id]}`);
      }
      SoundManager3D.preload();
    } catch {
      // Preload is best-effort
    }
    // Demo mode: pick default character so village renders immediately
    if (isDemoMode) {
      setSelectedCharacter(PLAYER_CHARACTERS[0].id);
    }
    const timer = setTimeout(() => setLoading3D(false), 2000);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for intro restart (from intro-runner.ts)
  useEffect(() => {
    const handleRestart = () => { setStarted(true); setPlayingIntro(true); };
    const handleSkip = () => setPlayingIntro(false);
    window.addEventListener('restart-intro', handleRestart);
    window.addEventListener('skip-intro', handleSkip);
    return () => {
      window.removeEventListener('restart-intro', handleRestart);
      window.removeEventListener('skip-intro', handleSkip);
    };
  }, []);

  // Background music — play in village, stop in zones so SFX are clear
  useEffect(() => {
    if (!started) return;
    if (currentZone) {
      SoundManager3D.stopMusic();
    } else {
      SoundManager3D.playMusic('village');
    }
  }, [currentZone, started]);

  const world = currentZone ? WORLDS[currentZone] : null;
  const earnedBadges = BADGES.filter(b => badges[b.id]);

  return (
    <ErrorBoundary>
      {/* Demo mode: click-to-start overlay (unlocks browser audio) */}
      {demoWaitingForClick && (
        <div
          onClick={handleDemoStart}
          className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
          style={{ background: 'rgba(15, 10, 26, 0.7)', backdropFilter: 'blur(4px)' }}
        >
          <div className="text-center">
            <div className="text-5xl mb-4" style={{
              background: 'linear-gradient(to right, #4A90D9, #FF8C42, #F5C842)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Fredoka, sans-serif',
              fontWeight: 700,
            }}>QuestAI</div>
            <div className="text-white/90 text-xl font-heading animate-pulse">Click anywhere to start demo</div>
          </div>
        </div>
      )}

      {/* TitleScreen overlays the canvas while world preloads behind it */}
      {!started && (
        <TitleScreen onSelectCharacter={(id) => {
          setSelectedCharacter(id);
          // Wait a frame so the character model swaps before the screen becomes visible
          requestAnimationFrame(() => { setStarted(true); setPlayingIntro(true); });
        }} />
      )}

      <div className={`flex flex-col h-screen bg-quest-page-bg stars-bg-light ${!started ? 'invisible' : ''}`}>
        {/* Header */}
        <header className={`relative px-5 py-3 flex items-center justify-between z-10 ${expanded || playingIntro ? 'hidden' : ''}`}>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-quest-purple/30 to-transparent" />

          <span className="font-heading font-bold text-2xl" style={{
            background: 'linear-gradient(to right, #4A90D9, #FF8C42, #F5C842)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>QuestAI</span>

          <div className="flex items-center gap-3">
            {/* Badge tray — small icons showing earned badges */}
            {earnedBadges.length > 0 && (
              <div className="flex items-center gap-1 bg-white/60 px-2.5 py-1.5 rounded-xl border border-quest-purple/20" title={earnedBadges.map(b => b.label).join(', ')}>
                {earnedBadges.map(b => (
                  <span key={b.id} className="text-sm" title={`${b.label}: ${b.description}`}>
                    {b.emoji}
                  </span>
                ))}
                <span className="text-[10px] font-bold text-quest-text-muted ml-1">
                  {earnedBadges.length}/{BADGES.length}
                </span>
              </div>
            )}

            <SettingsPanel />

            {currentZone && !isTransitioning && (
              <button
                onClick={exitZone}
                className="btn-game text-sm px-4 py-2 rounded-xl border-2
                  bg-white/60 text-quest-text-mid border-quest-border hover:border-quest-orange/50 hover:text-quest-text-dark hover:bg-quest-panel-bg"
              >
                {'\u{1F6AA}'} Leave Quest
              </button>
            )}

            {world && (
              <span className="text-sm font-heading font-bold text-quest-text-dark bg-white/80 px-3 py-1.5 rounded-xl border border-quest-purple/20 flex items-center gap-2">
                <span>{world.emoji} {world.label}</span>
                {currentZone && (() => {
                  const madLibStages = getQuestStages(currentZone).length;
                  const totalStages = madLibStages + 2;
                  const labels = [
                    ...Array.from({ length: madLibStages }, (_, i) => `Lv${i + 1}`),
                    'Free Text',
                    'Full Prompt',
                  ];
                  return (
                    <select
                      value={stageNumber}
                      onChange={(e) => useGameStore.getState().setStage(currentZone, Number(e.target.value))}
                      className="text-xs bg-quest-purple/10 border border-quest-purple/30 rounded-lg px-2 py-0.5 text-quest-text-dark font-heading font-bold cursor-pointer hover:bg-quest-purple/20 focus:outline-none focus:ring-1 focus:ring-quest-purple/50"
                    >
                      {Array.from({ length: totalStages }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {labels[i]} {i + 1 === stageNumber ? '\u2022' : ''}
                        </option>
                      ))}
                    </select>
                  );
                })()}
              </span>
            )}
          </div>
        </header>

        <div className="flex-1 min-h-0 flex flex-col">
          {/* Game Canvas */}
          <div className={`flex-1 min-h-0 flex items-center justify-center ${expanded || playingIntro || !started ? 'px-0 py-0' : 'px-4 py-2'}`}>
            <div className={`relative overflow-hidden border-2 border-quest-canvas-border/50 shadow-glow-purple/30 ${expanded || playingIntro || !started ? 'rounded-none' : 'rounded-game-lg'}`}
                 style={expanded || playingIntro || !started
                   ? { width: '100%', height: '100%' }
                   : { width: 1024, height: 576, maxWidth: '100%', maxHeight: '60vh' }
                 }>
              <R3FGame playingIntro={playingIntro} onIntroComplete={() => setPlayingIntro(false)}>
                <ScenePlayer3D
                  script={lastScript}
                  vignetteSteps={vignetteSteps}
                  taskId={currentTask}
                  onComplete={() => { console.log('[App] Scene complete'); signalVignetteComplete(); signalShowcaseVignetteComplete(); }}
                />
              </R3FGame>
              {!currentZone && !isTransitioning && !playingIntro && <CameraControls />}
              {!playingIntro && <Minimap />}
              {!currentZone && !playingIntro && <ControlsOverlay />}

              {!playingIntro && <ScreenshotButton />}
            </div>
          </div>

          {/* Input Panel — routes to Mad Libs (L1-3), Level4Input (L4), Level5Input (L5), or free-text */}
          {!expanded && !playingIntro && (
            currentZone ? (
              <div className="transition-opacity duration-500">
                {stageNumber >= 5 && getLevel5Stage(currentZone) ? (
                  <Level5Input stage={getLevel5Stage(currentZone)!} />
                ) : stageNumber === 4 && getLevel4Stage(currentZone) ? (
                  <Level4Input stage={getLevel4Stage(currentZone)!} />
                ) : questStage ? (
                  <MadLibsInput stage={questStage} />
                ) : (
                  <PromptInput />
                )}
              </div>
            ) : (
              <div className="px-5 py-4 text-center">
                <p className="font-heading font-bold text-lg text-quest-text-dark">
                  {isTransitioning ? 'Traveling...' : 'Walk to a glowing circle to start a quest!'}
                </p>
                <p className="text-sm text-quest-text-light mt-1">
                  {isTransitioning ? '' : 'WASD to move \u2022 Shift to run \u2022 Drag or Q/E to turn \u2022 Scroll or +/\u2212 to zoom'}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Badge unlock toast — always rendered, self-hides when empty */}
      <BadgeToast />

      {/* "Click to skip" hint during cinematic */}
      {playingIntro && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <span className="text-white/70 text-sm font-heading bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
            Click anywhere to skip
          </span>
        </div>
      )}

      {/* Loading overlay */}
      {loading3D && <LoadingScreen />}
    </ErrorBoundary>
  );
}
