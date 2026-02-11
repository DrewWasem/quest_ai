/**
 * SoundManager3D — Synthesized SFX using Web Audio API.
 *
 * No external audio files needed — all sounds generated procedurally.
 * Sounds are kid-friendly, short, and fun.
 *
 * Usage:
 *   const sound = SoundManager3D.getInstance();
 *   sound.play('spawn');
 *   sound.play('success');
 */

type SoundName =
  | 'spawn'      // Pop sound when character/prop appears
  | 'move'       // Whoosh during movement
  | 'react'      // Sparkle/twinkle for reactions
  | 'success'    // Ascending chime for FULL_SUCCESS
  | 'partial'    // Single chime for PARTIAL_SUCCESS
  | 'fail'       // Descending wah-wah for FUNNY_FAIL
  | 'click'      // UI click
  | 'remove'     // Pop-out sound
  | 'intro'      // Magical reveal whoosh for task intro

class SoundManager3DClass {
  private ctx: AudioContext | null = null
  private muted = false

  private getCtx(): AudioContext | null {
    if (!this.ctx) {
      try {
        this.ctx = new AudioContext()
      } catch {
        console.warn('[SoundManager3D] Web Audio API not available')
        return null
      }
    }
    // Resume if suspended (browser autoplay policy)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  setMuted(muted: boolean) {
    this.muted = muted
  }

  play(name: SoundName) {
    if (this.muted) return
    const ctx = this.getCtx()
    if (!ctx) return

    try {
      switch (name) {
        case 'spawn': this.playSpawn(ctx); break
        case 'move': this.playWhoosh(ctx); break
        case 'react': this.playSparkle(ctx); break
        case 'success': this.playSuccess(ctx); break
        case 'partial': this.playPartial(ctx); break
        case 'fail': this.playFail(ctx); break
        case 'click': this.playClick(ctx); break
        case 'remove': this.playRemove(ctx); break
        case 'intro': this.playIntro(ctx); break
      }
    } catch {
      // Never crash on sound failure
    }
  }

  // Pop sound — short sine with pitch bend
  private playSpawn(ctx: AudioContext) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(300, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08)
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15)
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
    osc.connect(gain).connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.2)
  }

  // Whoosh — filtered noise sweep
  private playWhoosh(ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 0.3
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(200, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.15)
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3)
    filter.Q.value = 2
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
    source.connect(filter).connect(gain).connect(ctx.destination)
    source.start(ctx.currentTime)
    source.stop(ctx.currentTime + 0.3)
  }

  // Sparkle — rapid ascending arpeggiated tones
  private playSparkle(ctx: AudioContext) {
    const notes = [800, 1000, 1200, 1500]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      const start = ctx.currentTime + i * 0.06
      gain.gain.setValueAtTime(0.15, start)
      gain.gain.exponentialRampToValueAtTime(0.01, start + 0.12)
      osc.connect(gain).connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.12)
    })
  }

  // Success — ascending major chord arpeggio
  private playSuccess(ctx: AudioContext) {
    const notes = [523, 659, 784, 1047] // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = freq
      const start = ctx.currentTime + i * 0.1
      gain.gain.setValueAtTime(0.2, start)
      gain.gain.linearRampToValueAtTime(0.15, start + 0.1)
      gain.gain.exponentialRampToValueAtTime(0.01, start + 0.4)
      osc.connect(gain).connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.4)
    })
  }

  // Partial success — two-note chime
  private playPartial(ctx: AudioContext) {
    const notes = [523, 659] // C5, E5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = freq
      const start = ctx.currentTime + i * 0.15
      gain.gain.setValueAtTime(0.2, start)
      gain.gain.exponentialRampToValueAtTime(0.01, start + 0.3)
      osc.connect(gain).connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.3)
    })
  }

  // Funny fail — descending wah-wah
  private playFail(ctx: AudioContext) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.4)
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.2)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
    osc.connect(gain).connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.5)
  }

  // UI click — short high click
  private playClick(ctx: AudioContext) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 1000
    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
    osc.connect(gain).connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.05)
  }

  // Intro — magical sweeping reveal (filtered noise + ascending tone)
  private playIntro(ctx: AudioContext) {
    // Filtered noise sweep (whoosh)
    const bufferSize = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(100, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 1.5)
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 2.0)
    filter.Q.value = 3
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.08, ctx.currentTime)
    noiseGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.0)
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.0)
    noise.connect(filter).connect(noiseGain).connect(ctx.destination)
    noise.start(ctx.currentTime)
    noise.stop(ctx.currentTime + 2.0)

    // Ascending shimmer tones
    const notes = [262, 330, 392, 523] // C4, E4, G4, C5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      const start = ctx.currentTime + 0.8 + i * 0.3
      gain.gain.setValueAtTime(0.08, start)
      gain.gain.linearRampToValueAtTime(0.06, start + 0.2)
      gain.gain.exponentialRampToValueAtTime(0.01, start + 0.5)
      osc.connect(gain).connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.5)
    })
  }

  // Remove — reverse pop
  private playRemove(ctx: AudioContext) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(500, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15)
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    osc.connect(gain).connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  }
}

// Singleton
export const SoundManager3D = new SoundManager3DClass()
