export function exit ({ commit }) {
  // ...
}

export function toggleDarkMode ({ commit, state }) {
  const value = !state.darkMode
  commit('setDarkMode', value)
}

export function updateSettings ({ commit }, value) {
  if ('darkMode' in value) {
    commit('setDarkMode', value.darkMode)
  }
  if ('parSpaceBetween' in value) {
    commit('setParagraphSpaceBetween', value.parSpaceBetween)
  }
  if ('parIndentFirstLine' in value) {
    commit('setParagraphIndentFirstLine', value.parIndentFirstLine)
  }
}
