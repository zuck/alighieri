import { LocalStorage } from 'quasar'
import { boot } from 'quasar/wrappers'
import { LOCALE_CACHE_KEY } from 'src/config'
import messages from 'src/i18n'
import { createI18n } from 'vue-i18n'

const DEFAULT_LOCALE = 'en-US'

export const i18n = createI18n({
  locale: LocalStorage.getItem(LOCALE_CACHE_KEY) || DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages
})

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
})
