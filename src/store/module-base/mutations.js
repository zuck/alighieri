import { LocalStorage, Dark } from 'quasar'
import {
  MENU_OPEN_CACHE_KEY,
  DARK_MODE_CACHE_KEY
} from '../../config'

export function toggleMenu (state) {
  const value = !state.menuOpen
  state.menuOpen = value
  LocalStorage.set(MENU_OPEN_CACHE_KEY, value)
}

export function toggleDarkMode (state) {
  const value = !state.darkMode
  state.darkMode = value
  Dark.set(value)
  LocalStorage.set(DARK_MODE_CACHE_KEY, value)
}
