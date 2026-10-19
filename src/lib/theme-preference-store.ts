import { DEFAULT_THEME_PREFERENCE, THEME_STORAGE_KEY, isThemePreference, type ThemePreference } from './theme'

const THEME_CHANGE_EVENT = 'theme-preference-change'
let sessionPreference = DEFAULT_THEME_PREFERENCE
let storageUnavailable = false

export function readPreference(): ThemePreference {
  if (storageUnavailable) return sessionPreference
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isThemePreference(stored) ? stored : DEFAULT_THEME_PREFERENCE
  } catch (err) {
    console.warn('[theme] Unable to read the stored theme preference:', err)
    return sessionPreference
  }
}

export function writePreference(next: ThemePreference) {
  sessionPreference = next
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next)
  } catch (err) {
    storageUnavailable = true
    console.warn('[theme] Unable to persist the theme preference:', err)
  }
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
}

export function subscribeToPreference(onChange: () => void) {
  window.addEventListener('storage', onChange)
  window.addEventListener(THEME_CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener(THEME_CHANGE_EVENT, onChange)
  }
}
