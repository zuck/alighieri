import info from "../../../package.json";

export function appInfo() {
  return {
    name: info.name,
    version: info.version,
    description: info.description,
    productName: info.productName,
    author: info.author,
    repository: info.repository,
    license: info.license,
  };
}

export function settings(state) {
  return {
    locale: state.locale,
    darkMode: state.darkMode,
    parSpaceBetween: state.parSpaceBetween,
    parIndentFirstLine: state.parIndentFirstLine,
  };
}
