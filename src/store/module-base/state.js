import { LocalStorage } from 'quasar'
import {
  MENU_OPEN_CACHE_KEY,
  DARK_MODE_CACHE_KEY,
  PAR_SPACE_BETWEEN_CACHE_KEY,
  PAR_INDENT_FIRST_LINE_CACHE_KEY
} from '../../config'

export default function () {
  return {
    menuOpen: LocalStorage.getItem(MENU_OPEN_CACHE_KEY),
    darkMode: LocalStorage.getItem(DARK_MODE_CACHE_KEY),
    parSpaceBetween: LocalStorage.getItem(PAR_SPACE_BETWEEN_CACHE_KEY),
    parIndentFirstLine: LocalStorage.getItem(PAR_INDENT_FIRST_LINE_CACHE_KEY)
  }
}
