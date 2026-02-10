import { useRef, useCallback, useState } from 'react';
import PhaserGame from './game/PhaserGame';
import type { PhaserGameRef } from './game/PhaserGame';
import PromptInput from './components/PromptInput';
import ErrorBoundary from './components/ErrorBoundary';
import { useGameStore } from './stores/gameStore';

const TASKS: Record<string, { label: string; emoji: string; scene: string; desc: string }> = {
  'monster-party': { label: 'Monster Birthday Party', emoji: '🎂', scene: 'MonsterPartyScene', desc: 'Plan the perfect party for a monster who has never had one!' },
  'robot-pizza': { label: 'Robot Pizza Delivery', emoji: '🤖', scene: 'RobotPizzaScene', desc: 'Help a robot navigate the city to deliver a pizza!' },
  'wizard-kitchen': { label: "Wizard's Kitchen", emoji: '🧙‍♂️', scene: 'WizardKitchenScene', desc: 'A spell went wrong — the kitchen appliances are alive!' },
  'dinosaur-school': { label: "Dinosaur's First Day", emoji: '🦕', scene: 'DinosaurSchoolScene', desc: 'Help a T-Rex survive kindergarten when everything is too small!' },
  'dog-space': { label: 'Dog Space Mission', emoji: '🐕', scene: 'DogSpaceScene', desc: 'Launch a brave dog to the moon — plan the whole mission!' },
  'octopus-band': { label: 'Octopus Rock Band', emoji: '🐙', scene: 'OctopusBandScene', desc: 'An octopus with 8 arms wants to start a band underwater!' },
};

export default function App() {
  const phaserRef = useRef<PhaserGameRef>(null);
  const currentTask = useGameStore((s) => s.currentTask);
  const isMuted = useGameStore((s) => s.isMuted);
  const toggleMute = useGameStore((s) => s.toggleMute);
  const [showGrid, setShowGrid] = useState(true);

  const switchTask = useCallback((taskId: string) => {
    const store = useGameStore.getState();

    // Update store
    useGameStore.setState({ currentTask: taskId, lastScript: null, lastSource: null, error: null, userInput: '' });

    // Switch Phaser scene
    const game = phaserRef.current?.game;
    const info = TASKS[taskId];
    if (game && info) {
      game.scene.start(info.scene);
      const oldInfo = TASKS[store.currentTask];
      if (oldInfo && oldInfo.scene !== info.scene) {
        game.scene.stop(oldInfo.scene);
      }
    }

    setShowGrid(false);
  }, []);

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen bg-quest-bg stars-bg">
        {/* Header */}
        <header className="relative px-5 py-3 flex items-center justify-between z-10">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-quest-accent/40 to-transparent" />

          <button
            onClick={() => setShowGrid(true)}
            className="font-heading text-2xl font-extrabold bg-gradient-to-r from-quest-gold via-quest-accent to-quest-blue bg-clip-text text-transparent drop-shadow-lg hover:opacity-80 transition-opacity"
          >
            Prompt Quest
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="btn-game text-sm px-3 py-2 rounded-xl border-2
                         bg-quest-card/60 text-quest-text-secondary border-quest-border
                         hover:border-quest-accent/50 hover:text-white"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            {!showGrid && (
              <button
                onClick={() => setShowGrid(true)}
                className="btn-game text-sm px-4 py-2 rounded-xl border-2
                           bg-quest-card/60 text-quest-text-secondary border-quest-border
                           hover:border-quest-orange/50 hover:text-white"
              >
                All Tasks
              </button>
            )}
          </div>
        </header>

        {showGrid ? (
          /* Task Selector Grid */
          <div className="flex-1 min-h-0 flex items-center justify-center p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl w-full">
              {Object.entries(TASKS).map(([id, info]) => (
                <button
                  key={id}
                  onClick={() => switchTask(id)}
                  className={`group relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2
                    transition-all duration-200 cursor-pointer
                    ${id === currentTask
                      ? 'bg-gradient-to-b from-quest-surface to-quest-card border-quest-accent shadow-glow-purple'
                      : 'bg-quest-card/60 border-quest-border hover:border-quest-accent/50 hover:shadow-glow-purple/30'
                    }
                    active:scale-[0.97]`}
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
                    {info.emoji}
                  </span>
                  <span className="font-heading font-bold text-sm text-quest-text-primary text-center leading-tight">
                    {info.label}
                  </span>
                  <span className="text-xs text-quest-text-dim text-center leading-snug">
                    {info.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Phaser Game Canvas */}
            <div className="flex-1 min-h-0 flex items-center justify-center">
              <PhaserGame ref={phaserRef} />
            </div>

            {/* Prompt Input */}
            <PromptInput />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
