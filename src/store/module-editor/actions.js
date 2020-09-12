import { debounce } from 'quasar'
import { calculateStats } from '../../utils/counter'
import { convertHtmlToTxt } from '../../utils/conversion'

const DEBOUNCE_TIME = 150

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

export const updateStats = debounce(_updateStats, DEBOUNCE_TIME)
