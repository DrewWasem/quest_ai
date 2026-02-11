/**
 * useTTS — Text-to-Speech hook using browser-native SpeechSynthesis.
 *
 * Reads narration text aloud with kid-friendly pacing.
 * Respects mute toggle from Zustand store.
 *
 * Usage:
 *   const { speak, stop, isSpeaking } = useTTS();
 *   speak("The knight found the treasure!");
 */

import { useRef, useState, useCallback, useEffect } from 'react'
import { useGameStore } from '../stores/gameStore'

export function useTTS() {
  const isMuted = useGameStore((s) => s.isMuted)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const stop = useCallback(() => {
    if (typeof window === 'undefined') return
    try {
      window.speechSynthesis?.cancel()
    } catch {
      // SpeechSynthesis may not be available
    }
    setIsSpeaking(false)
    utteranceRef.current = null
  }, [])

  const speak = useCallback(
    (text: string) => {
      if (!text || isMuted) return
      if (typeof window === 'undefined' || !window.speechSynthesis) return

      // Cancel any current speech
      stop()

      try {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.9 // Slightly slower for kids
        utterance.pitch = 1.1 // Slightly higher, friendlier
        utterance.volume = 0.8

        // Try to find a friendly English voice
        const voices = window.speechSynthesis.getVoices()
        const englishVoice = voices.find(
          (v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('samantha'),
        ) || voices.find((v) => v.lang.startsWith('en-US'))
        if (englishVoice) {
          utterance.voice = englishVoice
        }

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => {
          setIsSpeaking(false)
          utteranceRef.current = null
        }
        utterance.onerror = () => {
          setIsSpeaking(false)
          utteranceRef.current = null
        }

        utteranceRef.current = utterance
        window.speechSynthesis.speak(utterance)
      } catch {
        // SpeechSynthesis not supported — fail silently
      }
    },
    [isMuted, stop],
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop()
    }
  }, [stop])

  return { speak, stop, isSpeaking }
}
