import { LocalStorage } from 'quasar'
import {
  FILENAME_CACHE_KEY,
  CONTENT_CACHE_KEY,
  DEFAULT_CONTENT
} from '../../config'

export function updateContent ({ commit, state }, content) {
  if (content !== state.content) {
    commit('setContent', content)
    commit('setLastChange', new Date())
  }
}

export function resetFile ({ commit }) {
  commit('setFilename', '')
  commit('setContent', DEFAULT_CONTENT)
  commit('setLastSave', null)
  commit('setLastChange', null)
}

export function reloadFile ({ commit }) {
  const now = new Date()
  const filename = LocalStorage.getItem(FILENAME_CACHE_KEY) || ''
  const content = LocalStorage.getItem(CONTENT_CACHE_KEY) || DEFAULT_CONTENT
  commit('setFilename', filename)
  commit('setContent', content)
  commit('setLastSave', now)
  commit('setLastChange', now)
}

export function saveFile ({ commit, state }) {
  const now = new Date()
  LocalStorage.set(CONTENT_CACHE_KEY, state.content)
  LocalStorage.set(FILENAME_CACHE_KEY, state.filename)
  commit('setLastSave', now)
  commit('setLastChange', now)
}

export function printFile ({ commit }) {
  window.print()
}
