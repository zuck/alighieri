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
  dispatch('updateContent', 'Type your masterpiece here...')
  commit('setFilename', 'masterpiece.html')
  commit('setLastSave')
}

export function loadFile ({ commit, dispatch }, file = {}) {
  commit('setFilename', file.name)
  dispatch('updateContent', file.html)
  dispatch('saveFile')
}

export function saveFile ({ commit }) {
  commit('saveContentHTML')
  commit('setLastSave')
}

export function printFile ({ commit }) {
  window.print()
}
