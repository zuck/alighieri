import { LocalStorage } from 'quasar'
import {
  FILENAME_CACHE_KEY,
  CONTENT_CACHE_KEY,
  CONTENT_LAST_SAVE_CACHE_KEY,
  CONTENT_LAST_SAVE_DATETIME_CACHE_KEY
} from '../../config'

export function setFilename (state, filename) {
  state.filename = filename || ''
  LocalStorage.set(FILENAME_CACHE_KEY, filename)
}

export function setContentHTML (state, html) {
  state.contentHTML = html || ''
  LocalStorage.set(CONTENT_CACHE_KEY, html)
}

export function saveContentHTML (state, html) {
  LocalStorage.set(CONTENT_LAST_SAVE_CACHE_KEY, state.contentHTML)
}

export function setLastSave (state, lastSave) {
  const value = lastSave || new Date()
  state.lastSave = value
  LocalStorage.set(CONTENT_LAST_SAVE_DATETIME_CACHE_KEY, value)
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
