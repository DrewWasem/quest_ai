import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act } from '@testing-library/react';
import type { SceneScript } from '../../types/scene-script';
import type { ResolvedResponse } from '../../services/resolver';

vi.mock('../../services/resolver', () => ({
  resolveResponse: vi.fn(),
}));

// Import after mocks are declared so the module picks up mocked dependencies
import { useGameStore } from '../gameStore';
import { resolveResponse } from '../../services/resolver';

const mockResolveResponse = vi.mocked(resolveResponse);

const MOCK_SCRIPT: SceneScript = {
  success_level: 'FULL_SUCCESS',
  narration: 'The skeleton loves the birthday cake!',
  actions: [
    { type: 'spawn', target: 'skeleton_warrior', position: 'center' },
    { type: 'spawn', target: 'cake-giant', position: 'left' },
    { type: 'move', target: 'cake-giant', to: 'center', style: 'arc' },
    { type: 'react', effect: 'confetti-burst', position: 'center' },
  ],
  prompt_feedback: 'Great job planning the party!',
};

const MOCK_RESOLVED: ResolvedResponse = {
  script: MOCK_SCRIPT,
  source: 'live',
  latencyMs: 42,
};

describe('useGameStore', () => {
  beforeEach(() => {
    useGameStore.setState({
      currentTask: 'skeleton-birthday',
      userInput: '',
      isLoading: false,
      lastScript: null,
      lastSource: null,
      error: null,
      history: [],
    });
    vi.clearAllMocks();
  });

  // ---- 1. Initial state ----
  it('has correct initial state', () => {
    const state = useGameStore.getState();
    expect(state.currentTask).toBe('skeleton-birthday');
    expect(state.userInput).toBe('');
    expect(state.isLoading).toBe(false);
    expect(state.lastScript).toBeNull();
    expect(state.lastSource).toBeNull();
    expect(state.error).toBeNull();
    expect(state.history).toEqual([]);
  });

  // ---- 2. setInput ----
  it('setInput updates userInput', () => {
    act(() => {
      useGameStore.getState().setInput('Invite the knight and mage to a party');
    });
    expect(useGameStore.getState().userInput).toBe('Invite the knight and mage to a party');
  });

  // ---- 3. clearScript ----
  it('clearScript sets lastScript and lastSource to null', () => {
    useGameStore.setState({ lastScript: MOCK_SCRIPT, lastSource: 'live' });
    expect(useGameStore.getState().lastScript).not.toBeNull();

    act(() => {
      useGameStore.getState().clearScript();
    });
    expect(useGameStore.getState().lastScript).toBeNull();
    expect(useGameStore.getState().lastSource).toBeNull();
  });

  // ---- 4. clearError ----
  it('clearError sets error to null', () => {
    useGameStore.setState({ error: 'Something failed' });
    expect(useGameStore.getState().error).toBe('Something failed');

    act(() => {
      useGameStore.getState().clearError();
    });
    expect(useGameStore.getState().error).toBeNull();
  });

  // ---- 5. submitInput with empty input ----
  it('submitInput with empty input does nothing', async () => {
    useGameStore.setState({ userInput: '   ' });

    await act(async () => {
      await useGameStore.getState().submitInput();
    });

    expect(useGameStore.getState().isLoading).toBe(false);
    expect(mockResolveResponse).not.toHaveBeenCalled();
  });

  // ---- 6. submitInput with valid input (3D pipeline, no EventBus) ----
  it('submitInput calls resolveResponse, sets lastScript/lastSource, adds to history', async () => {
    mockResolveResponse.mockResolvedValueOnce(MOCK_RESOLVED);
    useGameStore.setState({ userInput: 'Invite knight and mage with cake and banners' });

    await act(async () => {
      await useGameStore.getState().submitInput();
    });

    const state = useGameStore.getState();

    // resolveResponse was called with the task, system prompt, and trimmed user input
    expect(mockResolveResponse).toHaveBeenCalledOnce();
    expect(mockResolveResponse).toHaveBeenCalledWith(
      'skeleton-birthday',
      expect.any(String),
      'Invite knight and mage with cake and banners',
    );

    // State updated correctly
    expect(state.isLoading).toBe(false);
    expect(state.lastScript).toEqual(MOCK_SCRIPT);
    expect(state.lastSource).toBe('live');
    expect(state.error).toBeNull();

    // History appended with source and latency
    expect(state.history).toHaveLength(1);
    expect(state.history[0]).toEqual({
      input: 'Invite knight and mage with cake and banners',
      script: MOCK_SCRIPT,
      source: 'live',
      latencyMs: 42,
    });

    // 3D pipeline: ScenePlayer3D reads lastScript from Zustand — no EventBus emit
  });

  // ---- 7. submitInput with cache hit ----
  it('submitInput with cache source tracks source correctly', async () => {
    const cachedResponse: ResolvedResponse = {
      script: MOCK_SCRIPT,
      source: 'cache',
      latencyMs: 1,
    };
    mockResolveResponse.mockResolvedValueOnce(cachedResponse);
    useGameStore.setState({ userInput: 'throw a huge birthday party for the skeleton' });

    await act(async () => {
      await useGameStore.getState().submitInput();
    });

    const state = useGameStore.getState();
    expect(state.lastSource).toBe('cache');
    expect(state.history[0].source).toBe('cache');
    expect(state.history[0].latencyMs).toBe(1);
  });

  // ---- 8. submitInput with resolver error (should never happen, but handled) ----
  it('submitInput sets error if resolver throws unexpectedly', async () => {
    mockResolveResponse.mockRejectedValueOnce(new Error('Unexpected resolver crash'));
    useGameStore.setState({ userInput: 'Do something cool' });

    await act(async () => {
      await useGameStore.getState().submitInput();
    });

    const state = useGameStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Unexpected resolver crash');
    expect(state.lastScript).toBeNull();
    expect(state.history).toEqual([]);
  });

  // ---- 9. submitInput with unknown task ----
  it('submitInput with unknown task sets error', async () => {
    useGameStore.setState({ userInput: 'Build a rocket', currentTask: 'rocket-launch' });

    await act(async () => {
      await useGameStore.getState().submitInput();
    });

    const state = useGameStore.getState();
    expect(state.error).toBe('Unknown task: rocket-launch');
    expect(state.isLoading).toBe(false);
    expect(mockResolveResponse).not.toHaveBeenCalled();
  });

  // ---- 10. All 7 3D tasks are registered ----
  it('has system prompts for all 7 3D tasks', async () => {
    const tasks3D = [
      'skeleton-birthday', 'knight-space', 'mage-kitchen',
      'barbarian-school', 'dungeon-concert', 'skeleton-pizza', 'adventurers-picnic',
    ];

    for (const taskId of tasks3D) {
      mockResolveResponse.mockResolvedValueOnce(MOCK_RESOLVED);
      useGameStore.setState({ userInput: 'test input', currentTask: taskId, error: null });

      await act(async () => {
        await useGameStore.getState().submitInput();
      });

      // Should NOT get "Unknown task" error
      expect(useGameStore.getState().error).toBeNull();
    }
  });

  // ---- 11. Legacy 2D tasks still work ----
  it('has system prompts for legacy 2D tasks', async () => {
    const legacyTasks = [
      'monster-party', 'robot-pizza', 'wizard-kitchen',
      'dinosaur-school', 'dog-space', 'octopus-band',
    ];

    for (const taskId of legacyTasks) {
      mockResolveResponse.mockResolvedValueOnce(MOCK_RESOLVED);
      useGameStore.setState({ userInput: 'test input', currentTask: taskId, error: null });

      await act(async () => {
        await useGameStore.getState().submitInput();
      });

      expect(useGameStore.getState().error).toBeNull();
    }
  });

  // ---- 12. toggleMute ----
  it('toggleMute flips isMuted state', () => {
    expect(useGameStore.getState().isMuted).toBe(false);

    act(() => {
      useGameStore.getState().toggleMute();
    });
    expect(useGameStore.getState().isMuted).toBe(true);

    act(() => {
      useGameStore.getState().toggleMute();
    });
    expect(useGameStore.getState().isMuted).toBe(false);
  });
});
