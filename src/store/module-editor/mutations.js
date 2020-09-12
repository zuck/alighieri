import { LocalStorage } from 'quasar'
import { CONTENT_CACHE_KEY } from '../../config'

export function setContentHTML (state, html) {
  state.contentHTML = html
  LocalStorage.set(CONTENT_CACHE_KEY, html)
}

export function setLastChange (state, lastChange) {
  state.lastChange = lastChange
}

export function setParagraphCount (state, count) {
  state.paragraphCount = count
}

export function setWordCount (state, count) {
  state.wordCount = count
}

export function setSentenceCount (state, count) {
  state.sentenceCount = count
}

export function setCharCount (state, count) {
  state.charCount = count
}
