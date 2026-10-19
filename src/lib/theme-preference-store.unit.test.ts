import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('theme preference store', () => {
  let events: EventTarget
  let storage: Map<string, string>

  beforeEach(() => {
    vi.resetModules()
    events = new EventTarget()
    storage = new Map()
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
      addEventListener: events.addEventListener.bind(events),
      removeEventListener: events.removeEventListener.bind(events),
      dispatchEvent: events.dispatchEvent.bind(events),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('reads saved preferences and falls back to auto for invalid values', async () => {
    const { readPreference } = await import('./theme-preference-store')
    expect(readPreference()).toBe('auto')
    storage.set('theme', 'dark')
    expect(readPreference()).toBe('dark')
    storage.set('theme', 'invalid')
    expect(readPreference()).toBe('auto')
  })

  it('notifies subscribers for a choice and storage events, and cleans up', async () => {
    const { readPreference, writePreference, subscribeToPreference } = await import('./theme-preference-store')
    const onChange = vi.fn()
    const unsubscribe = subscribeToPreference(onChange)
    writePreference('dark')
    expect(readPreference()).toBe('dark')
    expect(storage.get('theme')).toBe('dark')
    expect(onChange).toHaveBeenCalledTimes(1)
    storage.set('theme', 'light')
    events.dispatchEvent(new Event('storage'))
    expect(readPreference()).toBe('light')
    expect(onChange).toHaveBeenCalledTimes(2)
    unsubscribe()
    writePreference('auto')
    events.dispatchEvent(new Event('storage'))
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('keeps choices usable when storage writes are blocked', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    const { readPreference, writePreference, subscribeToPreference } = await import('./theme-preference-store')
    const onChange = vi.fn()
    subscribeToPreference(onChange)
    writePreference('dark')
    expect(readPreference()).toBe('dark')
    writePreference('light')
    expect(readPreference()).toBe('light')
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('uses auto when storage reads are blocked', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    const { readPreference } = await import('./theme-preference-store')
    expect(readPreference()).toBe('auto')
  })
})
