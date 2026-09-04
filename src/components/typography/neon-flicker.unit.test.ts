import { afterEach, describe, expect, it, vi } from 'vitest'
import { runNeonBurst } from './neon-flicker'

afterEach(() => vi.useRealTimers())

describe('neon burst', () => {
  it('makes four discrete strikes and finishes off before the cooldown', () => {
    vi.useFakeTimers()
    const states: boolean[] = []
    const complete = vi.fn()
    runNeonBurst(lit => states.push(lit), complete)
    expect(states).toEqual([true])
    for (const [ms, expected] of [[90, false], [260, true], [120, false], [290, true], [160, false], [270, true], [340, false]] as const) {
      vi.advanceTimersByTime(ms - 1)
      expect(states.at(-1)).toBe(!expected)
      vi.advanceTimersByTime(1)
      expect(states.at(-1)).toBe(expected)
    }
    expect(complete).toHaveBeenCalledTimes(1)
    expect(vi.getTimerCount()).toBe(0)
  })
  it('immediately clears the highlight and cancels pending beats on pause or unmount', () => {
    vi.useFakeTimers()
    const setLit = vi.fn()
    const complete = vi.fn()
    const cancel = runNeonBurst(setLit, complete)
    cancel()
    expect(setLit).toHaveBeenLastCalledWith(false)
    vi.runAllTimers()
    expect(setLit).toHaveBeenCalledTimes(2)
    expect(complete).not.toHaveBeenCalled()
  })
})
