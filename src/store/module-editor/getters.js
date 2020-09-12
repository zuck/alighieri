export function isChanged (state) {
  return state.lastChange !== state.lastSave
}
