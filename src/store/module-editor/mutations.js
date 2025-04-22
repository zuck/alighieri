export function updateStats(state, text) {
  state.charCount = text.length;
  state.wordCount = text.split(/\s+/).filter(Boolean).length;
  state.sentenceCount = text
    .split(/[.+|:+|;+|?+|!+|\n+]/)
    .map((val) => val.trim())
    .filter(Boolean).length;
  state.paragraphCount = text.split(/\n\n/).filter(Boolean).length;
}

export function setLastSave(state, lastSave) {
  state.lastSave = lastSave;
}

export function setLastChange(state, lastChange) {
  state.lastChange = lastChange;
}

export function setFilename(state, filename) {
  state.filename = filename;
}

export function setContent(state, content) {
  state.content = content;
}
