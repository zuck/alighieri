export function exit({ commit }) {
  // ...
}

export function toggleDarkMode({ dispatch, state }) {
  const value = !state.darkMode;
  dispatch("updateSettings", {
    darkMode: value,
  });
}

export function updateSettings({ commit }, value) {
  if ("locale" in value) {
    commit("setLocale", value.locale);
  }
  if ("darkMode" in value) {
    commit("setDarkMode", value.darkMode);
  }
  if ("parSpaceBetween" in value) {
    commit("setParagraphSpaceBetween", value.parSpaceBetween);
  }
  if ("parIndentFirstLine" in value) {
    commit("setParagraphIndentFirstLine", value.parIndentFirstLine);
  }
}
