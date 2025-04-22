import { LocalStorage } from "quasar";
import {
  DARK_MODE_CACHE_KEY,
  LOCALE_CACHE_KEY,
  MENU_OPEN_CACHE_KEY,
  PAR_INDENT_FIRST_LINE_CACHE_KEY,
  PAR_SPACE_BETWEEN_CACHE_KEY,
} from "../../config";

export default function () {
  return {
    menuOpen: LocalStorage.getItem(MENU_OPEN_CACHE_KEY) || false,
    locale: LocalStorage.getItem(LOCALE_CACHE_KEY) || "en-US",
    darkMode: LocalStorage.getItem(DARK_MODE_CACHE_KEY) || false,
    parSpaceBetween: LocalStorage.getItem(PAR_SPACE_BETWEEN_CACHE_KEY) || false,
    parIndentFirstLine:
      LocalStorage.getItem(PAR_INDENT_FIRST_LINE_CACHE_KEY) || false,
  };
}
