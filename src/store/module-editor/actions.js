import { debounce } from 'quasar'
import { calculateStats } from '../../utils/counter'
import { convertHtmlToTxt } from '../../utils/conversion'
import { UPDATE_STATS_DEBOUNCE_TIME } from '../../config'

export function updateContent ({ commit, dispatch }, html) {
  commit('setContentHTML', html)
  commit('setLastChange', new Date())
  dispatch('updateStats')
}

function _updateStats ({ state, commit }) {
  const txt = convertHtmlToTxt(state.contentHTML)
  const { charCount, wordCount, sentenceCount, paragraphCount } = calculateStats(txt)
  commit('setCharCount', charCount)
  commit('setWordCount', wordCount)
  commit('setSentenceCount', sentenceCount)
  commit('setParagraphCount', paragraphCount)
}

export const updateStats = debounce(_updateStats, UPDATE_STATS_DEBOUNCE_TIME)

export function newFile ({ commit, dispatch }) {
  dispatch('updateContent', '')
  commit('setLastSave')
}

export function openFile ({ commit }) {
  // TODO: ...
}

export function saveFile ({ commit }) {
  commit('saveContentHTML')
  commit('setLastSave')
}

export function saveFileAs ({ commit }) {
  // TODO: ...
}

export function importFile ({ commit }) {
  // TODO: ...
}

export function exportFileAs ({ commit }) {
  // TODO: ...
}

export function printFile ({ commit }) {
  window.print()
}
