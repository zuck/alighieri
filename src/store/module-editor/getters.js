export function hasUnsavedChanges (state) {
  const lastChange = state.lastChange ? state.lastChange.toISOString() : ''
  const lastSave = state.lastSave ? state.lastSave.toISOString() : ''
  return lastChange > lastSave
}
