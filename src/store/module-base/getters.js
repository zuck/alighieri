import { name, version, description, productName, author, repository, license } from '../../../package.json'

export function appInfo () {
  return {
    name,
    version,
    description,
    productName,
    author,
    repository,
    license
  }
}

export function settings (state) {
  return {
    darkMode: state.darkMode,
    parSpaceBetween: state.parSpaceBetween,
    parIndentFirstLine: state.parIndentFirstLine
  }
}
