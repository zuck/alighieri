export function about ({ commit }) {
  commit('setAboutVisible', true)
}

export function settings ({ commit }) {
  commit('setSettingsVisible', true)
}

export function exit ({ commit }) {
  // ...
}
