import { LocalStorage } from 'quasar'
import {
  MENU_OPEN_CACHE_KEY,
  DARK_MODE_CACHE_KEY
} from '../../config'

export default function () {
  return {
    menuOpen: LocalStorage.getItem(MENU_OPEN_CACHE_KEY),
    darkMode: LocalStorage.getItem(DARK_MODE_CACHE_KEY)
  }
}
