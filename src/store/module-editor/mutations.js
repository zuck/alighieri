import { LocalStorage } from 'quasar'
import {
  FILENAME_CACHE_KEY,
  CONTENT_CACHE_KEY,
  DEFAULT_CONTENT
} from '../../config'

export function updateStats (state, text) {
  state.charCount = text.length
  state.wordCount = text.split(/\s+/).filter(Boolean).length
  state.sentenceCount = text
    .split(/[.+|:+|;+|?+|!+|\n+]/)
    .map(val => val.trim())
    .filter(Boolean).length
  state.paragraphCount = text.split(/\n\n/).filter(Boolean).length
}

export function reloadContent (state) {
  const filename = LocalStorage.getItem(FILENAME_CACHE_KEY) || ''
  const content = LocalStorage.getItem(CONTENT_CACHE_KEY) || DEFAULT_CONTENT
  state.filename = filename
  state.content = content
  state.lastChange = new Date()
}

export function setFilename (state, filename) {
  state.filename = filename
  state.lastChange = new Date()
  LocalStorage.set(FILENAME_CACHE_KEY, filename)
}

export function setContent (state, content) {
  state.content = content
  state.lastChange = new Date()
  LocalStorage.set(CONTENT_CACHE_KEY, content)
}
