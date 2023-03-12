import { Dark, LocalStorage, Quasar } from 'quasar'
import { i18n } from '../../boot/i18n'
import {
  DARK_MODE_CACHE_KEY,
  LOCALE_CACHE_KEY,
  MENU_OPEN_CACHE_KEY,
  PAR_INDENT_FIRST_LINE_CACHE_KEY,
  PAR_SPACE_BETWEEN_CACHE_KEY
} from '../../config'

export function toggleMenu (state) {
  const value = !state.menuOpen
  LocalStorage.set(MENU_OPEN_CACHE_KEY, value)
  state.menuOpen = value
}

export function setLocale (state, value) {
  i18n.global.locale = value
  Quasar.lang.set(value)
  LocalStorage.set(LOCALE_CACHE_KEY, value)
  state.locale = value
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
