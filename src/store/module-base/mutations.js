import { LocalStorage, Dark } from 'quasar'
import {
  MENU_OPEN_CACHE_KEY,
  MENU_MINI_CACHE_KEY,
  DARK_MODE_CACHE_KEY,
  PAR_SPACE_BETWEEN_CACHE_KEY,
  PAR_INDENT_FIRST_LINE_CACHE_KEY
} from '../../config'

export function toggleMenu (state) {
  const value = !state.menuOpen
  LocalStorage.set(MENU_OPEN_CACHE_KEY, value)
  state.menuOpen = value
}

export function setMenuMini (state, value) {
  LocalStorage.set(MENU_MINI_CACHE_KEY, value)
  state.menuMini = value
}

export function setDarkMode (state, value) {
  Dark.set(value)
  LocalStorage.set(DARK_MODE_CACHE_KEY, value)
  state.darkMode = value
}

export function setParagraphSpaceBetween (state, value) {
  LocalStorage.set(PAR_SPACE_BETWEEN_CACHE_KEY, value)
  state.parSpaceBetween = value
}

export function setParagraphIndentFirstLine (state, value) {
  LocalStorage.set(PAR_INDENT_FIRST_LINE_CACHE_KEY, value)
  state.parIndentFirstLine = value
}
