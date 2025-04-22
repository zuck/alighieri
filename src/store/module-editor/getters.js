export function hasUnsavedChanges(state) {
  const lastChange = state.lastChange?.getTime() || null;
  const lastSave = state.lastSave?.getTime() || null;
  return lastChange > lastSave;
}
