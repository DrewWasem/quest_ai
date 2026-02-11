/**
 * ScenePlayer3D Features Tests
 *
 * Tests the NEW Phase 5 features exported from ScenePlayer3D:
 * - Easing functions: easeOutBounce, easeInOutQuad, easeInOutSine
 * - Easing dispatcher: applyEasing
 *
 * Focus on pure function logic (boundary values, monotonicity, style routing).
 */

import { describe, it, expect } from 'vitest'
import {
  easeOutBounce,
  easeInOutQuad,
  easeInOutSine,
  applyEasing,
} from '../ScenePlayer3D'

describe('ScenePlayer3D Easing Functions', () => {
  describe('easeOutBounce', () => {
    it('should return 0 at t=0', () => {
      expect(easeOutBounce(0)).toBeCloseTo(0, 5)
    })

    it('should return 1 at t=1', () => {
      expect(easeOutBounce(1)).toBeCloseTo(1, 5)
    })

    it('should return values between 0 and 1 for all inputs in [0, 1]', () => {
      for (let t = 0; t <= 1; t += 0.05) {
        const result = easeOutBounce(t)
        expect(result).toBeGreaterThanOrEqual(0)
        expect(result).toBeLessThanOrEqual(1.01) // slight tolerance for float precision
      }
    })

    it('should produce bounce effect (overshoot and settle)', () => {
      // Bounce easing should approach 1 quickly and oscillate slightly
      const t05 = easeOutBounce(0.5)
      const t07 = easeOutBounce(0.7)
      const t09 = easeOutBounce(0.9)

      expect(t05).toBeGreaterThan(0.5) // Fast initial rise
      expect(t07).toBeGreaterThan(0.7)
      expect(t09).toBeGreaterThan(0.9) // Settles near 1
    })

    it('should be a valid easing function (continuous)', () => {
      // Check that small changes in t produce small changes in output
      const step = 0.01
      for (let t = 0; t < 1; t += step) {
        const v1 = easeOutBounce(t)
        const v2 = easeOutBounce(t + step)
        const delta = Math.abs(v2 - v1)
        expect(delta).toBeLessThan(0.5) // No huge discontinuities
      }
    })

    it('should handle multiple bounce phases', () => {
      // The easeOutBounce function has 4 bounce phases based on divisions of d1=2.75
      const phase1 = easeOutBounce(0.2) // Early bounce
      const phase2 = easeOutBounce(0.5)
      const phase3 = easeOutBounce(0.8)
      const phase4 = easeOutBounce(0.95)

      // All should be within valid range
      expect(phase1).toBeGreaterThan(0)
      expect(phase2).toBeGreaterThan(phase1)
      expect(phase3).toBeGreaterThan(phase2)
      expect(phase4).toBeGreaterThan(phase3)
    })
  })

  describe('easeInOutQuad', () => {
    it('should return 0 at t=0', () => {
      expect(easeInOutQuad(0)).toBeCloseTo(0, 5)
    })

    it('should return 1 at t=1', () => {
      expect(easeInOutQuad(1)).toBeCloseTo(1, 5)
    })

    it('should return 0.5 at t=0.5 (midpoint)', () => {
      expect(easeInOutQuad(0.5)).toBeCloseTo(0.5, 5)
    })

    it('should be monotonically increasing', () => {
      let prev = 0
      for (let t = 0; t <= 1; t += 0.05) {
        const result = easeInOutQuad(t)
        expect(result).toBeGreaterThanOrEqual(prev - 0.001) // Allow tiny float errors
        prev = result
      }
    })

    it('should ease in (start slow)', () => {
      // Early phase should be below linear
      expect(easeInOutQuad(0.1)).toBeLessThan(0.1)
      expect(easeInOutQuad(0.2)).toBeLessThan(0.2)
    })

    it('should ease out (end slow)', () => {
      // Late phase should be above linear
      expect(easeInOutQuad(0.8)).toBeGreaterThan(0.8)
      expect(easeInOutQuad(0.9)).toBeGreaterThan(0.9)
    })

    it('should be symmetric around midpoint', () => {
      // easeInOutQuad should mirror: f(0.3) + f(0.7) ≈ 1
      const v03 = easeInOutQuad(0.3)
      const v07 = easeInOutQuad(0.7)
      expect(v03 + v07).toBeCloseTo(1.0, 2)
    })

    it('should return values in [0, 1] for all inputs in [0, 1]', () => {
      for (let t = 0; t <= 1; t += 0.05) {
        const result = easeInOutQuad(t)
        expect(result).toBeGreaterThanOrEqual(0)
        expect(result).toBeLessThanOrEqual(1)
      }
    })
  })

  describe('easeInOutSine', () => {
    it('should return 0 at t=0', () => {
      expect(easeInOutSine(0)).toBeCloseTo(0, 5)
    })

    it('should return 1 at t=1', () => {
      expect(easeInOutSine(1)).toBeCloseTo(1, 5)
    })

    it('should return 0.5 at t=0.5 (midpoint)', () => {
      expect(easeInOutSine(0.5)).toBeCloseTo(0.5, 5)
    })

    it('should be monotonically increasing', () => {
      let prev = 0
      for (let t = 0; t <= 1; t += 0.05) {
        const result = easeInOutSine(t)
        expect(result).toBeGreaterThanOrEqual(prev - 0.001)
        prev = result
      }
    })

    it('should ease in (start slow)', () => {
      expect(easeInOutSine(0.1)).toBeLessThan(0.1)
      expect(easeInOutSine(0.2)).toBeLessThan(0.2)
    })

    it('should ease out (end slow)', () => {
      expect(easeInOutSine(0.8)).toBeGreaterThan(0.8)
      expect(easeInOutSine(0.9)).toBeGreaterThan(0.9)
    })

    it('should be symmetric around midpoint', () => {
      const v03 = easeInOutSine(0.3)
      const v07 = easeInOutSine(0.7)
      expect(v03 + v07).toBeCloseTo(1.0, 2)
    })

    it('should return values in [0, 1] for all inputs in [0, 1]', () => {
      for (let t = 0; t <= 1; t += 0.05) {
        const result = easeInOutSine(t)
        expect(result).toBeGreaterThanOrEqual(0)
        expect(result).toBeLessThanOrEqual(1)
      }
    })

    it('should use sine wave (smooth acceleration)', () => {
      // Sine easing should be smoother than quad at edges
      const sineEarly = easeInOutSine(0.1)
      const quadEarly = easeInOutQuad(0.1)

      const sineLate = easeInOutSine(0.9)
      const quadLate = easeInOutQuad(0.9)

      // Both should be slow at edges, but sine is smoother (closer to linear)
      expect(sineEarly).toBeGreaterThan(quadEarly - 0.05)
      expect(sineLate).toBeLessThan(quadLate + 0.05)
    })
  })

  describe('applyEasing', () => {
    it('should dispatch to easeOutBounce for "bounce" style', () => {
      const t = 0.5
      expect(applyEasing(t, 'bounce')).toBeCloseTo(easeOutBounce(t), 5)
    })

    it('should dispatch to easeInOutQuad for "arc" style', () => {
      const t = 0.5
      expect(applyEasing(t, 'arc')).toBeCloseTo(easeInOutQuad(t), 5)
    })

    it('should dispatch to easeInOutSine for "float" style', () => {
      const t = 0.5
      expect(applyEasing(t, 'float')).toBeCloseTo(easeInOutSine(t), 5)
    })

    it('should return linear (identity) for "linear" style', () => {
      expect(applyEasing(0.3, 'linear')).toBeCloseTo(0.3, 5)
      expect(applyEasing(0.7, 'linear')).toBeCloseTo(0.7, 5)
    })

    it('should default to linear for unknown styles', () => {
      expect(applyEasing(0.5, 'teleport')).toBeCloseTo(0.5, 5)
      expect(applyEasing(0.5, '')).toBeCloseTo(0.5, 5)
      expect(applyEasing(0.5, 'zigzag')).toBeCloseTo(0.5, 5)
    })

    it('should return 0 at t=0 for all styles', () => {
      const styles = ['linear', 'bounce', 'arc', 'float', 'unknown']
      for (const style of styles) {
        expect(applyEasing(0, style)).toBeCloseTo(0, 3)
      }
    })

    it('should return 1 at t=1 for all styles', () => {
      const styles = ['linear', 'bounce', 'arc', 'float', 'unknown']
      for (const style of styles) {
        expect(applyEasing(1, style)).toBeCloseTo(1, 3)
      }
    })

    it('should handle edge cases gracefully', () => {
      // Should not throw for edge inputs
      expect(() => applyEasing(0, 'bounce')).not.toThrow()
      expect(() => applyEasing(1, 'bounce')).not.toThrow()
      expect(() => applyEasing(0.5, '')).not.toThrow()
    })
  })

  describe('Easing Function Comparison', () => {
    it('should have distinct behaviors for different easing functions', () => {
      const t = 0.3

      const linear = t
      const bounce = easeOutBounce(t)
      const arc = easeInOutQuad(t)
      const float = easeInOutSine(t)

      // Bounce should be faster than linear at early phase
      expect(bounce).toBeGreaterThan(linear)

      // Arc and float should be slower than linear at early phase (easing in)
      expect(arc).toBeLessThan(linear)
      expect(float).toBeLessThan(linear)

      // Arc and float should be close but not identical
      expect(Math.abs(arc - float)).toBeGreaterThan(0.01)
    })

    it('should have different curvature at t=0.5', () => {
      const t = 0.5

      const linear = t
      const bounce = easeOutBounce(t)
      const arc = easeInOutQuad(t)
      const float = easeInOutSine(t)

      // Linear and arc/float should all hit 0.5 at midpoint
      expect(linear).toBe(0.5)
      expect(arc).toBeCloseTo(0.5, 3)
      expect(float).toBeCloseTo(0.5, 3)

      // Bounce should overshoot
      expect(bounce).toBeGreaterThan(0.5)
    })

    it('should all converge to 1 at t=1', () => {
      const t = 1

      expect(t).toBeCloseTo(1, 5)
      expect(easeOutBounce(t)).toBeCloseTo(1, 3)
      expect(easeInOutQuad(t)).toBeCloseTo(1, 5)
      expect(easeInOutSine(t)).toBeCloseTo(1, 5)
    })
  })

  describe('Animation Style Mapping', () => {
    it('should map "bounce" style for props landing', () => {
      // Bounce easing gives playful landing effect
      const progress = 0.8
      const eased = applyEasing(progress, 'bounce')
      expect(eased).toBeGreaterThan(progress) // Fast approach
    })

    it('should map "arc" style for character movement', () => {
      // Arc easing gives smooth acceleration/deceleration
      const progress = 0.5
      const eased = applyEasing(progress, 'arc')
      expect(eased).toBeCloseTo(0.5, 3) // Smooth midpoint
    })

    it('should map "float" style for gentle hover effects', () => {
      // Float easing gives sinusoidal smooth motion
      const progress = 0.25
      const eased = applyEasing(progress, 'float')
      expect(eased).toBeLessThan(progress) // Gentle start
    })

    it('should map "linear" for direct motion', () => {
      // Linear gives constant speed
      const progress = 0.6
      const eased = applyEasing(progress, 'linear')
      expect(eased).toBe(progress)
    })
  })

  describe('Edge Case Handling', () => {
    it('should handle t < 0 gracefully', () => {
      // Though not typical, functions should not crash
      expect(() => easeOutBounce(-0.1)).not.toThrow()
      expect(() => easeInOutQuad(-0.1)).not.toThrow()
      expect(() => easeInOutSine(-0.1)).not.toThrow()
    })

    it('should handle t > 1 gracefully', () => {
      expect(() => easeOutBounce(1.5)).not.toThrow()
      expect(() => easeInOutQuad(1.5)).not.toThrow()
      expect(() => easeInOutSine(1.5)).not.toThrow()
    })

    it('should return finite values for all valid inputs', () => {
      for (let t = 0; t <= 1; t += 0.1) {
        expect(Number.isFinite(easeOutBounce(t))).toBe(true)
        expect(Number.isFinite(easeInOutQuad(t))).toBe(true)
        expect(Number.isFinite(easeInOutSine(t))).toBe(true)
      }
    })
  })
})
