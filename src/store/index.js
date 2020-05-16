import Vue from 'vue'
import Vuex from 'vuex'
import { AddressbarColor, LocalStorage, SessionStorage, debounce } from 'quasar'
import { convertHtmlToTxt } from '../conversion'
import * as INFO from '../../package.json'

Vue.use(Vuex)

const CONTENT_BACKUP_KEY = INFO.name + '-content-backup'
const CONTENT_LAST_SAVED_KEY = INFO.name + '-content-last-saved'
const SETTINGS_KEY = INFO.name + '-settings'

const initialSettings = Object.assign(
  {
    darkMode: false,
    parSpaceBetween: true,
    parIndentFirstLine: false
  },
  LocalStorage.getItem(SETTINGS_KEY)
)

const updateAddressbarColor = darkMode => {
  AddressbarColor.set(darkMode ? '#1b1e25' : '#fff')
}

updateAddressbarColor(initialSettings.darkMode)

const store = new Vuex.Store({
  state: {
    filename: null,
    contentHTML: null,
    content: null,
    words: [],
    sentences: [],
    lastChange: null,
    lastSaved: null,
    settings: {
      darkMode: initialSettings.darkMode,
      parSpaceBetween: initialSettings.parSpaceBetween,
      parIndentFirstLine: initialSettings.parIndentFirstLine
    }
  },

  getters: {
    isChanged (state) {
      return (
        state.lastChange > state.lastSaved &&
        SessionStorage.getItem(CONTENT_LAST_SAVED_KEY) !== state.contentHTML
      )
    }
  },

  mutations: {
    updateFilename (state, filename) {
      state.filename = filename
    },

    updateSettings (state, settings) {
      state.settings = Object.assign({}, state.settings, settings)
      LocalStorage.set(SETTINGS_KEY, state.settings)
      updateAddressbarColor(state.settings.darkMode)
    },

    registerLastSave (state, on) {
      state.lastSaved = on || new Date()
      SessionStorage.set(CONTENT_LAST_SAVED_KEY, state.contentHTML)
    },

    updateStats: debounce(state => {
      state.content = convertHtmlToTxt(state.contentHTML)
      state.sentences = state.content
        .replace(/(\.+|:|;|\?|!)/g, '$1\n')
        .split(/\n+\s*/)
        .filter(n => n)
      state.words = state.content.split(/\s+/).filter(n => n)
      if (state.words) {
        LocalStorage.set(CONTENT_BACKUP_KEY, state.contentHTML)
      } else {
        LocalStorage.remove(CONTENT_BACKUP_KEY)
      }
    }, 100 /* Execute at most once every 100ms */)
  },

  actions: {
    updateContent ({ state, commit }, html) {
      state.contentHTML = html
      state.lastChange = new Date()
      commit('updateStats')
    }
  }
})

export default store
