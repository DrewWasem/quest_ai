/**
 * useTTS Hook Tests
 *
 * Tests the Text-to-Speech hook using browser-native SpeechSynthesis API.
 * Ensures it respects mute state, handles missing APIs gracefully.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useTTS } from '../useTTS'

// Mock Zustand store
const mockStoreState = { isMuted: false }

vi.mock('../../stores/gameStore', () => ({
  useGameStore: vi.fn((selector) => selector(mockStoreState)),
}))

describe('useTTS Hook', () => {
  let mockUtterance: {
    text: string
    rate: number
    pitch: number
    volume: number
    voice: object | null
    onstart: (() => void) | null
    onend: (() => void) | null
    onerror: (() => void) | null
  }

  let mockSpeechSynthesis: {
    speak: ReturnType<typeof vi.fn>
    cancel: ReturnType<typeof vi.fn>
    getVoices: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    // Reset mock store state
    mockStoreState.isMuted = false

    // Create mock SpeechSynthesisUtterance
    mockUtterance = {
      text: '',
      rate: 1,
      pitch: 1,
      volume: 1,
      voice: null,
      onstart: null,
      onend: null,
      onerror: null,
    }

    // Mock SpeechSynthesisUtterance constructor
    global.SpeechSynthesisUtterance = vi.fn((text: string) => {
      mockUtterance.text = text
      return mockUtterance as SpeechSynthesisUtterance
    }) as unknown as typeof SpeechSynthesisUtterance

    // Create mock speechSynthesis
    mockSpeechSynthesis = {
      speak: vi.fn(),
      cancel: vi.fn(),
      getVoices: vi.fn(() => [
        { name: 'Samantha', lang: 'en-US', default: true, localService: true, voiceURI: 'Samantha' },
        { name: 'Alex', lang: 'en-US', default: false, localService: true, voiceURI: 'Alex' },
      ] as SpeechSynthesisVoice[]),
    }

    // Mock window.speechSynthesis
    Object.defineProperty(window, 'speechSynthesis', {
      writable: true,
      configurable: true,
      value: mockSpeechSynthesis,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    // Restore speechSynthesis if we modified it
    if (!window.speechSynthesis) {
      Object.defineProperty(window, 'speechSynthesis', {
        writable: true,
        configurable: true,
        value: mockSpeechSynthesis,
      })
    }
  })

  describe('Hook Initialization', () => {
    it('should return speak, stop, and isSpeaking', () => {
      const { result } = renderHook(() => useTTS())

      expect(result.current).toHaveProperty('speak')
      expect(result.current).toHaveProperty('stop')
      expect(result.current).toHaveProperty('isSpeaking')

      expect(typeof result.current.speak).toBe('function')
      expect(typeof result.current.stop).toBe('function')
      expect(typeof result.current.isSpeaking).toBe('boolean')
    })

    it('should initialize with isSpeaking=false', () => {
      const { result } = renderHook(() => useTTS())
      expect(result.current.isSpeaking).toBe(false)
    })
  })

  describe('Mute State Respect', () => {
    it('should NOT call speechSynthesis.speak when muted', () => {
      mockStoreState.isMuted = true
      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Hello')
      })

      expect(mockSpeechSynthesis.speak).not.toHaveBeenCalled()
    })

    it('should call speechSynthesis.speak when not muted', () => {
      mockStoreState.isMuted = false
      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Hello')
      })

      expect(mockSpeechSynthesis.speak).toHaveBeenCalled()
    })

    it('should respect mute toggle dynamically', () => {
      mockStoreState.isMuted = false
      const { result, rerender } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Test 1')
      })
      expect(mockSpeechSynthesis.speak).toHaveBeenCalledTimes(1)

      // Mute and try again
      mockStoreState.isMuted = true
      rerender()

      act(() => {
        result.current.speak('Test 2')
      })
      expect(mockSpeechSynthesis.speak).toHaveBeenCalledTimes(1) // Still 1, not 2
    })
  })

  describe('Speech Playback', () => {
    it('should create utterance with correct text', () => {
      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('The knight found treasure')
      })

      expect(mockUtterance.text).toBe('The knight found treasure')
      expect(mockSpeechSynthesis.speak).toHaveBeenCalledWith(mockUtterance)
    })

    it('should set kid-friendly speech parameters', () => {
      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Hello')
      })

      expect(mockUtterance.rate).toBe(0.9) // Slower for kids
      expect(mockUtterance.pitch).toBe(1.1) // Slightly higher
      expect(mockUtterance.volume).toBe(0.8)
    })

    it('should select a friendly English voice if available', () => {
      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Hello')
      })

      expect(mockSpeechSynthesis.getVoices).toHaveBeenCalled()
      expect(mockUtterance.voice).toBeTruthy()
    })

    it('should not throw if no voices available', () => {
      mockSpeechSynthesis.getVoices = vi.fn(() => [])

      const { result } = renderHook(() => useTTS())

      expect(() => {
        act(() => {
          result.current.speak('Hello')
        })
      }).not.toThrow()
    })

    it('should not speak empty text', () => {
      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('')
      })

      expect(mockSpeechSynthesis.speak).not.toHaveBeenCalled()
    })

    it('should update isSpeaking state on start', async () => {
      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Hello')
      })

      // Trigger onstart callback
      act(() => {
        mockUtterance.onstart?.()
      })

      await waitFor(() => {
        expect(result.current.isSpeaking).toBe(true)
      })
    })

    it('should reset isSpeaking state on end', async () => {
      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Hello')
      })

      act(() => {
        mockUtterance.onstart?.()
      })

      await waitFor(() => {
        expect(result.current.isSpeaking).toBe(true)
      })

      act(() => {
        mockUtterance.onend?.()
      })

      await waitFor(() => {
        expect(result.current.isSpeaking).toBe(false)
      })
    })

    it('should reset isSpeaking state on error', async () => {
      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Hello')
      })

      act(() => {
        mockUtterance.onstart?.()
      })

      await waitFor(() => {
        expect(result.current.isSpeaking).toBe(true)
      })

      act(() => {
        mockUtterance.onerror?.()
      })

      await waitFor(() => {
        expect(result.current.isSpeaking).toBe(false)
      })
    })
  })

  describe('Stop Functionality', () => {
    it('should call speechSynthesis.cancel when stop is called', () => {
      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.stop()
      })

      expect(mockSpeechSynthesis.cancel).toHaveBeenCalled()
    })

    it('should reset isSpeaking state when stopped', async () => {
      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Hello')
        mockUtterance.onstart?.()
      })

      await waitFor(() => {
        expect(result.current.isSpeaking).toBe(true)
      })

      act(() => {
        result.current.stop()
      })

      await waitFor(() => {
        expect(result.current.isSpeaking).toBe(false)
      })
    })

    it('should cancel previous speech when starting new speech', () => {
      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('First')
      })

      expect(mockSpeechSynthesis.cancel).toHaveBeenCalledTimes(1) // Called once in stop()

      act(() => {
        result.current.speak('Second')
      })

      expect(mockSpeechSynthesis.cancel).toHaveBeenCalledTimes(2) // Called again before new speak
    })
  })

  describe('Error Handling', () => {
    it('should handle missing SpeechSynthesis gracefully', () => {
      Object.defineProperty(window, 'speechSynthesis', {
        writable: true,
        configurable: true,
        value: undefined,
      })

      const { result } = renderHook(() => useTTS())

      expect(() => {
        act(() => {
          result.current.speak('Hello')
        })
      }).not.toThrow()

      expect(() => {
        act(() => {
          result.current.stop()
        })
      }).not.toThrow()
    })

    it('should handle SpeechSynthesisUtterance constructor error', () => {
      global.SpeechSynthesisUtterance = vi.fn(() => {
        throw new Error('SpeechSynthesisUtterance not supported')
      }) as unknown as typeof SpeechSynthesisUtterance

      const { result } = renderHook(() => useTTS())

      expect(() => {
        act(() => {
          result.current.speak('Hello')
        })
      }).not.toThrow()

      expect(mockSpeechSynthesis.speak).not.toHaveBeenCalled()
    })

    it('should handle speechSynthesis.speak error', () => {
      mockSpeechSynthesis.speak = vi.fn(() => {
        throw new Error('speak() failed')
      })

      const { result } = renderHook(() => useTTS())

      expect(() => {
        act(() => {
          result.current.speak('Hello')
        })
      }).not.toThrow()
    })

    it('should handle speechSynthesis.cancel error', () => {
      mockSpeechSynthesis.cancel = vi.fn(() => {
        throw new Error('cancel() failed')
      })

      const { result } = renderHook(() => useTTS())

      expect(() => {
        act(() => {
          result.current.stop()
        })
      }).not.toThrow()
    })

    it('should handle missing window object (SSR)', () => {
      // Instead of deleting window (which breaks React testing library),
      // just set speechSynthesis to undefined
      Object.defineProperty(window, 'speechSynthesis', {
        writable: true,
        configurable: true,
        value: undefined,
      })

      const { result } = renderHook(() => useTTS())

      expect(() => {
        act(() => {
          result.current.speak('Hello')
        })
      }).not.toThrow()

      expect(() => {
        act(() => {
          result.current.stop()
        })
      }).not.toThrow()
    })
  })

  describe('Cleanup', () => {
    it('should cancel speech on unmount', () => {
      const { result, unmount } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Hello')
      })

      unmount()

      // Cancel should have been called during cleanup
      expect(mockSpeechSynthesis.cancel).toHaveBeenCalled()
    })

    it('should not throw on unmount if speechSynthesis is unavailable', () => {
      const { unmount } = renderHook(() => useTTS())

      Object.defineProperty(window, 'speechSynthesis', {
        writable: true,
        configurable: true,
        value: undefined,
      })

      expect(() => unmount()).not.toThrow()
    })
  })

  describe('Voice Selection', () => {
    it('should prefer "Samantha" voice if available', () => {
      const samanVoice = {
        name: 'Samantha',
        lang: 'en-US',
        default: false,
        localService: true,
        voiceURI: 'Samantha',
      } as SpeechSynthesisVoice

      mockSpeechSynthesis.getVoices = vi.fn(() => [
        samanVoice,
        { name: 'Alex', lang: 'en-US', default: true, localService: true, voiceURI: 'Alex' },
      ] as SpeechSynthesisVoice[])

      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Hello')
      })

      expect(mockUtterance.voice).toBe(samanVoice)
    })

    it('should fallback to en-US voice if Samantha not found', () => {
      const enUSVoice = {
        name: 'Alex',
        lang: 'en-US',
        default: true,
        localService: true,
        voiceURI: 'Alex',
      } as SpeechSynthesisVoice

      mockSpeechSynthesis.getVoices = vi.fn(() => [
        enUSVoice,
        { name: 'Karen', lang: 'en-AU', default: false, localService: true, voiceURI: 'Karen' },
      ] as SpeechSynthesisVoice[])

      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Hello')
      })

      expect(mockUtterance.voice).toBe(enUSVoice)
    })

    it('should work without setting voice if none found', () => {
      mockSpeechSynthesis.getVoices = vi.fn(() => [])

      const { result } = renderHook(() => useTTS())

      act(() => {
        result.current.speak('Hello')
      })

      expect(mockUtterance.voice).toBeNull()
      expect(mockSpeechSynthesis.speak).toHaveBeenCalled()
    })
  })
})
