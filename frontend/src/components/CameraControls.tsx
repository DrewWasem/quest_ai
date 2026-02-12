import { useRef, useEffect, useCallback } from 'react';
import { useGameStore } from '../stores/gameStore';

const TURN_SPEED = 0.05; // radians per tick
const TURN_INTERVAL = 50; // ms between ticks while held

export default function CameraControls() {
  const rotateCameraYaw = useGameStore((s) => s.rotateCameraYaw);
  const adjustCameraZoom = useGameStore((s) => s.adjustCameraZoom);
  const turnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const zoomIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTurn = useCallback((direction: number) => {
    rotateCameraYaw(direction * TURN_SPEED);
    turnIntervalRef.current = setInterval(() => {
      rotateCameraYaw(direction * TURN_SPEED);
    }, TURN_INTERVAL);
  }, [rotateCameraYaw]);

  const stopTurn = useCallback(() => {
    if (turnIntervalRef.current) {
      clearInterval(turnIntervalRef.current);
      turnIntervalRef.current = null;
    }
  }, []);

  const startZoom = useCallback((direction: number) => {
    adjustCameraZoom(direction);
    zoomIntervalRef.current = setInterval(() => {
      adjustCameraZoom(direction);
    }, TURN_INTERVAL);
  }, [adjustCameraZoom]);

  const stopZoom = useCallback(() => {
    if (zoomIntervalRef.current) {
      clearInterval(zoomIntervalRef.current);
      zoomIntervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTurn();
      stopZoom();
    };
  }, [stopTurn, stopZoom]);

  const btnClass = `
    w-10 h-10 rounded-lg flex items-center justify-center
    bg-white/70 border-2 border-quest-border/50
    hover:bg-white/90 hover:border-quest-purple/40
    active:bg-quest-purple/20 active:scale-95
    text-quest-text-mid font-bold text-lg select-none
    transition-all duration-100 cursor-pointer
  `;

  return (
    <div className="absolute bottom-2 right-2 flex items-end gap-2 pointer-events-auto z-10">
      {/* Turn buttons */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1">
          <button
            className={btnClass}
            onPointerDown={() => startTurn(1)}
            onPointerUp={stopTurn}
            onPointerLeave={stopTurn}
            title="Turn left (Q)"
          >
            {'\u25C0'}
          </button>
          <button
            className={btnClass}
            onPointerDown={() => startTurn(-1)}
            onPointerUp={stopTurn}
            onPointerLeave={stopTurn}
            title="Turn right (E)"
          >
            {'\u25B6'}
          </button>
        </div>
      </div>

      {/* Zoom buttons */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1">
          <button
            className={btnClass}
            onPointerDown={() => startZoom(-1)}
            onPointerUp={stopZoom}
            onPointerLeave={stopZoom}
            title="Zoom in (scroll up)"
          >
            +
          </button>
          <button
            className={btnClass}
            onPointerDown={() => startZoom(1)}
            onPointerUp={stopZoom}
            onPointerLeave={stopZoom}
            title="Zoom out (scroll down)"
          >
            {'\u2212'}
          </button>
        </div>
      </div>
    </div>
  );
}
