import { LocalStorage } from 'quasar'
import {
  CONTENT_CACHE_KEY,
  DEFAULT_CONTENT,
  FILENAME_CACHE_KEY
} from '../../config'
import { parseContent } from '../../conversion'

export function updateContent ({ commit, state }, content) {
  if (content !== state.content) {
    commit('setContent', content)
    commit('setLastChange', new Date())
  }
}

export function resetFile ({ commit }) {
  commit('setFilename', 'untitled.html')
  commit('setContent', DEFAULT_CONTENT)
  commit('setLastSave', null)
  commit('setLastChange', null)
}

export function loadFile ({ commit }, { filename, content }) {
  const now = new Date()
  commit('setFilename', filename)
  commit('setContent', parseContent(content, filename))
  commit('setLastSave', now)
  commit('setLastChange', now)
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

export function saveFile ({ commit, state }, filename = null) {
  const now = new Date()
  const fname = filename || state.filename
  LocalStorage.set(CONTENT_CACHE_KEY, state.content)
  LocalStorage.set(FILENAME_CACHE_KEY, fname)
  commit('setFilename', fname)
  commit('setLastSave', now)
  commit('setLastChange', now)
}

export function printFile ({ commit }) {
  window.print()
}
