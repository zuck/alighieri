import { LocalStorage } from 'quasar'
import { FILENAME_CACHE_KEY, CONTENT_CACHE_KEY } from '../../config'

export function updateStats (state, text) {
  state.charCount = text.length
  state.wordCount = text.split(/\s+/).filter(Boolean).length
  state.sentenceCount = text
    .split(/[.+|:+|;+|?+|!+|\n+]/)
    .map(val => val.trim())
    .filter(Boolean).length
  state.paragraphCount = text.split(/\n\n/).filter(Boolean).length
}

export function setLastSave (state, lastSave) {
  state.lastSave = lastSave
}

export function setLastChange (state, lastChange) {
  state.lastChange = lastChange
}

export function setFilename (state, filename) {
  state.filename = filename
  LocalStorage.set(FILENAME_CACHE_KEY, filename)
}

export function setContent (state, content) {
  state.content = content
  LocalStorage.set(CONTENT_CACHE_KEY, content)
}
