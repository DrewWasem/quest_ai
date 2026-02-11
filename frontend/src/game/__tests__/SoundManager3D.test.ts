/**
 * SoundManager3D Tests
 *
 * Tests the synthesized sound effect manager using Web Audio API.
 * Ensures it never crashes even when AudioContext is unavailable (jsdom).
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { SoundManager3D } from '../SoundManager3D'

describe('SoundManager3D', () => {
  let mockAudioContext: {
    state: string
    currentTime: number
    destination: object
    sampleRate: number
    resume: ReturnType<typeof vi.fn>
    createOscillator: ReturnType<typeof vi.fn>
    createGain: ReturnType<typeof vi.fn>
    createBiquadFilter: ReturnType<typeof vi.fn>
    createBuffer: ReturnType<typeof vi.fn>
    createBufferSource: ReturnType<typeof vi.fn>
  }

  let mockOscillator: {
    type: string
    frequency: {
      value: number
      setValueAtTime: ReturnType<typeof vi.fn>
      exponentialRampToValueAtTime: ReturnType<typeof vi.fn>
      linearRampToValueAtTime: ReturnType<typeof vi.fn>
    }
    connect: ReturnType<typeof vi.fn>
    start: ReturnType<typeof vi.fn>
    stop: ReturnType<typeof vi.fn>
  }

  let mockGain: {
    gain: {
      value: number
      setValueAtTime: ReturnType<typeof vi.fn>
      exponentialRampToValueAtTime: ReturnType<typeof vi.fn>
      linearRampToValueAtTime: ReturnType<typeof vi.fn>
    }
    connect: ReturnType<typeof vi.fn>
  }

  let mockFilter: {
    type: string
    frequency: {
      value: number
      setValueAtTime: ReturnType<typeof vi.fn>
      exponentialRampToValueAtTime: ReturnType<typeof vi.fn>
    }
    Q: { value: number }
    connect: ReturnType<typeof vi.fn>
  }

  let mockBuffer: {
    getChannelData: ReturnType<typeof vi.fn>
  }

  let mockBufferSource: {
    buffer: object | null
    connect: ReturnType<typeof vi.fn>
    start: ReturnType<typeof vi.fn>
    stop: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    // Reset singleton state by accessing private property (test-only hack)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(SoundManager3D as any).ctx = null
    // Reset mute state before each test
    SoundManager3D.setMuted(false)

    // Create mock Web Audio API objects
    mockOscillator = {
      type: 'sine',
      frequency: {
        value: 0,
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn().mockReturnThis(),
      start: vi.fn(),
      stop: vi.fn(),
    }

    mockGain = {
      gain: {
        value: 0,
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn().mockReturnThis(),
    }

    mockFilter = {
      type: 'bandpass',
      frequency: {
        value: 0,
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      Q: { value: 0 },
      connect: vi.fn().mockReturnThis(),
    }

    mockBuffer = {
      getChannelData: vi.fn(() => new Float32Array(1024)),
    }

    mockBufferSource = {
      buffer: null,
      connect: vi.fn().mockReturnThis(),
      start: vi.fn(),
      stop: vi.fn(),
    }

    mockAudioContext = {
      state: 'running',
      currentTime: 0,
      destination: {},
      sampleRate: 44100,
      resume: vi.fn().mockResolvedValue(undefined),
      createOscillator: vi.fn(() => mockOscillator),
      createGain: vi.fn(() => mockGain),
      createBiquadFilter: vi.fn(() => mockFilter),
      createBuffer: vi.fn(() => mockBuffer),
      createBufferSource: vi.fn(() => mockBufferSource),
    }

    // Mock AudioContext constructor
    global.AudioContext = vi.fn(() => mockAudioContext) as unknown as typeof AudioContext
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Singleton Pattern', () => {
    it('should export a singleton instance', () => {
      expect(SoundManager3D).toBeDefined()
      expect(typeof SoundManager3D.play).toBe('function')
      expect(typeof SoundManager3D.setMuted).toBe('function')
    })
  })

  describe('Mute Toggle', () => {
    it('should prevent sounds from playing when muted', () => {
      SoundManager3D.setMuted(true)
      SoundManager3D.play('spawn')

      // AudioContext should not be created when muted
      expect(mockAudioContext.createOscillator).not.toHaveBeenCalled()
    })

    it('should allow sounds to play when unmuted', () => {
      SoundManager3D.setMuted(false)
      SoundManager3D.play('spawn')

      // Should attempt to create oscillator for spawn sound
      expect(mockAudioContext.createOscillator).toHaveBeenCalled()
    })

    it('should toggle mute state correctly', () => {
      SoundManager3D.setMuted(true)
      SoundManager3D.play('click')
      expect(mockAudioContext.createOscillator).not.toHaveBeenCalled()

      SoundManager3D.setMuted(false)
      SoundManager3D.play('click')
      expect(mockAudioContext.createOscillator).toHaveBeenCalled()
    })
  })

  describe('Sound Playback', () => {
    it('should not throw for "spawn" sound', () => {
      expect(() => SoundManager3D.play('spawn')).not.toThrow()
    })

    it('should not throw for "move" sound', () => {
      expect(() => SoundManager3D.play('move')).not.toThrow()
    })

    it('should not throw for "react" sound', () => {
      expect(() => SoundManager3D.play('react')).not.toThrow()
    })

    it('should not throw for "success" sound', () => {
      expect(() => SoundManager3D.play('success')).not.toThrow()
    })

    it('should not throw for "partial" sound', () => {
      expect(() => SoundManager3D.play('partial')).not.toThrow()
    })

    it('should not throw for "fail" sound', () => {
      expect(() => SoundManager3D.play('fail')).not.toThrow()
    })

    it('should not throw for "click" sound', () => {
      expect(() => SoundManager3D.play('click')).not.toThrow()
    })

    it('should not throw for "remove" sound', () => {
      expect(() => SoundManager3D.play('remove')).not.toThrow()
    })
  })

  describe('Oscillator Sounds (spawn, success, partial, fail, click, remove)', () => {
    it('should create oscillator for spawn sound', () => {
      SoundManager3D.play('spawn')
      expect(mockAudioContext.createOscillator).toHaveBeenCalled()
      expect(mockAudioContext.createGain).toHaveBeenCalled()
      expect(mockOscillator.connect).toHaveBeenCalledWith(mockGain)
    })

    it('should create oscillator for success sound', () => {
      SoundManager3D.play('success')
      // Success plays 4 notes (major chord arpeggio)
      expect(mockAudioContext.createOscillator).toHaveBeenCalledTimes(4)
      expect(mockAudioContext.createGain).toHaveBeenCalledTimes(4)
    })

    it('should create oscillator for partial sound', () => {
      SoundManager3D.play('partial')
      // Partial plays 2 notes
      expect(mockAudioContext.createOscillator).toHaveBeenCalledTimes(2)
      expect(mockAudioContext.createGain).toHaveBeenCalledTimes(2)
    })

    it('should create oscillator for fail sound', () => {
      SoundManager3D.play('fail')
      expect(mockAudioContext.createOscillator).toHaveBeenCalled()
      expect(mockOscillator.type).toBe('sawtooth')
    })

    it('should create oscillator for click sound', () => {
      SoundManager3D.play('click')
      expect(mockAudioContext.createOscillator).toHaveBeenCalled()
      expect(mockOscillator.type).toBe('square')
    })

    it('should create oscillator for remove sound', () => {
      SoundManager3D.play('remove')
      expect(mockAudioContext.createOscillator).toHaveBeenCalled()
      expect(mockOscillator.connect).toHaveBeenCalledWith(mockGain)
    })
  })

  describe('Buffer Sounds (move, react)', () => {
    it('should create buffer source for move (whoosh) sound', () => {
      SoundManager3D.play('move')
      expect(mockAudioContext.createBuffer).toHaveBeenCalled()
      expect(mockAudioContext.createBufferSource).toHaveBeenCalled()
      expect(mockAudioContext.createBiquadFilter).toHaveBeenCalled()
    })

    it('should create oscillators for react (sparkle) sound', () => {
      SoundManager3D.play('react')
      // Sparkle plays 4 rapid ascending tones
      expect(mockAudioContext.createOscillator).toHaveBeenCalledTimes(4)
      expect(mockAudioContext.createGain).toHaveBeenCalledTimes(4)
    })
  })

  describe('Error Handling', () => {
    it('should not throw when AudioContext is unavailable', () => {
      // Remove AudioContext from global
      const originalAudioContext = global.AudioContext
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).AudioContext

      expect(() => SoundManager3D.play('spawn')).not.toThrow()

      // Restore
      global.AudioContext = originalAudioContext
    })

    it('should not throw when AudioContext constructor throws', () => {
      global.AudioContext = vi.fn(() => {
        throw new Error('AudioContext not supported')
      }) as unknown as typeof AudioContext

      expect(() => SoundManager3D.play('spawn')).not.toThrow()
    })

    it('should not throw when createOscillator throws', () => {
      mockAudioContext.createOscillator = vi.fn(() => {
        throw new Error('Oscillator creation failed')
      })

      expect(() => SoundManager3D.play('spawn')).not.toThrow()
    })

    it('should not throw when createBuffer throws', () => {
      mockAudioContext.createBuffer = vi.fn(() => {
        throw new Error('Buffer creation failed')
      })

      expect(() => SoundManager3D.play('move')).not.toThrow()
    })
  })

  describe('AudioContext State Management', () => {
    it('should resume suspended AudioContext', () => {
      mockAudioContext.state = 'suspended'
      SoundManager3D.play('spawn')

      expect(mockAudioContext.resume).toHaveBeenCalled()
    })

    it('should not throw if resume fails', () => {
      mockAudioContext.state = 'suspended'
      mockAudioContext.resume = vi.fn().mockRejectedValue(new Error('Resume failed'))

      expect(() => SoundManager3D.play('spawn')).not.toThrow()
    })

    it('should create AudioContext only once (lazy initialization)', () => {
      const ctxConstructor = global.AudioContext as ReturnType<typeof vi.fn>
      ctxConstructor.mockClear()

      SoundManager3D.play('spawn')
      SoundManager3D.play('click')
      SoundManager3D.play('success')

      // Should only construct once (reused)
      expect(ctxConstructor).toHaveBeenCalledTimes(1)
    })
  })

  describe('Sound Properties', () => {
    it('should set frequency for spawn sound', () => {
      SoundManager3D.play('spawn')
      expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalled()
      expect(mockOscillator.frequency.exponentialRampToValueAtTime).toHaveBeenCalled()
    })

    it('should set gain envelope for spawn sound', () => {
      SoundManager3D.play('spawn')
      expect(mockGain.gain.setValueAtTime).toHaveBeenCalled()
      expect(mockGain.gain.exponentialRampToValueAtTime).toHaveBeenCalled()
    })

    it('should start and stop oscillator for spawn sound', () => {
      SoundManager3D.play('spawn')
      expect(mockOscillator.start).toHaveBeenCalled()
      expect(mockOscillator.stop).toHaveBeenCalled()
    })

    it('should use triangle wave for success sound', () => {
      SoundManager3D.play('success')
      expect(mockOscillator.type).toBe('triangle')
    })

    it('should use sawtooth wave for fail sound', () => {
      SoundManager3D.play('fail')
      expect(mockOscillator.type).toBe('sawtooth')
    })

    it('should use square wave for click sound', () => {
      SoundManager3D.play('click')
      expect(mockOscillator.type).toBe('square')
    })

    it('should apply bandpass filter to move sound', () => {
      SoundManager3D.play('move')
      expect(mockAudioContext.createBiquadFilter).toHaveBeenCalled()
      expect(mockFilter.type).toBe('bandpass')
    })
  })
})
